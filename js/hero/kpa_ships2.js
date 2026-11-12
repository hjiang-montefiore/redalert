/* ==================== js/hero/kpa_ships2.js =============================
   HERO MODELS -- Korean People's Navy (KPA), the rows js/hero/kpa_ships.js
   held, retried with the Wikipedia / Wikimedia sources.  One file, one hull
   builder (the P-6 derived 26 m hull), two rows, each measured off its own
   line drawing named in its block below:
     boat_k      Chaho-class fire-support patrol boat (BM-21 on deck)   CHAHO
     corvette_k  Nampo-class craft (P-6 derived, bow door, 2 x 14.5)   NAMPO

   SOURCE (both rows): [HB] U.S. Marine Corps Intelligence Activity, "North
   Korea Country Handbook" (1998), public domain, Wikimedia Commons
   "File:MarinesDPRKCountryHandbook.pdf" (found through the en.wikipedia
   File search).  Its appendix of naval recognition sheets gives a profile
   line drawing, a silhouette and LOA / beam / draught for each type:
       p. A-171 (PDF page 343)  CHAHO PB   85.3 x 19 x 6.6 ft
       p. A-189 (PDF page 361)  NAMPO LCP  85.3 x 19 x 6.6 ft
   Rendered at 600 dpi (scratchpad q_kpaship2_ref/pdf).  The sheets have no
   plan view and no body plan: every breadth below the published beam is
   NOT CONFIRMED and is listed as such in each block.

   REWORK ROUND 2026-11-12 (the owner's visual review): both boats given the
   deck fittings the [HB] profiles leave out (fittings() below: rubbing
   strake, guard rails, bollards, fairleads, anchors, hatches, vents, raft
   canisters, roof rail, searchlight).  Profiles unchanged; places of the
   fittings NOT CONFIRMED.

   STILL HELD (no usable drawing or photograph, see the foot):
     kpa_e80_corvette     Soho-class catamaran frigate
     kpa_e00_sub          Sinpo / Gorae-class SSB (and Sinpo-C / Hero Kim Kun Ok)
     kpa_e00_missileboat  Nongo-class fast attack craft
     lst_k                Hantae-class landing ship

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0.  Merged one
   mesh per material (the kit of js/hero/kpa_ships.js, copied: that module
   keeps its kit private; hullLoft() here also takes a per-point x shift for
   the raked transom).  Both rows are turret:true: ONE group named "turret"
   holding the forward twin 14.5 mm mount, origin on its ring at the deck,
   guns along local +X.  No hull numbers, flags or markings.  Plain paint.
   Team colour as small strips on the deck.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaShips2 = (function () {
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
    for (i = 0; i < 40; i++) {                                  /* rust weeps (as js/hero/kpa_ships.js) */
      g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.4) * m);
    }
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
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
    return { T: T, fresh: function () { var B = {}, k; for (k in T) B[k] = new Bin(T[k]); return B; } };
  }

  /* ---------------------------------------------------------- shared hull loft
     xs: station x list (stern first).  A section point may carry a third
     element dx, which shifts it along x (the raked transom).  half(x) returns N [y, z] points from
     the deck edge (index 0) to the keel / stem (last, y = 0).  zmid(x) is a
     point inside the section, used to wind every panel outward.  Panels whose
     centroid lies under z = 0 go to B.under (the boot), the rest to B.hull.
     deckIn(x) (optional) stops the deck plate short of the centreline (an
     open trough); crown(x) is the camber at the centreline. */
  function hullLoft(B, xs, half, zmid, crown, deckIn) {
    var H = xs.map(half), n = H[0].length, i, k, s;
    function bin(a, b, c) { return (a[2] + b[2] + c[2]) / 3 < -0.005 ? B.under : B.hull; }
    for (i = 0; i + 1 < xs.length; i++) {
      var xa = xs[i], xb = xs[i + 1], A = H[i], Bq = H[i + 1];
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < n; k++) {
        var p = [xa + (A[k][2] || 0), s * A[k][0], A[k][1]], q = [xa + (A[k + 1][2] || 0), s * A[k + 1][0], A[k + 1][1]],
            r = [xb + (Bq[k + 1][2] || 0), s * Bq[k + 1][0], Bq[k + 1][1]], t = [xb + (Bq[k][2] || 0), s * Bq[k][0], Bq[k][1]];
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
        var a = [x0 + (S[k][2] || 0), s * S[k][0], S[k][1]], b = [x0 + (S[k + 1][2] || 0), s * S[k + 1][0], S[k + 1][1]], c = [x0 + (S[n - 1][2] || 0) * 0.5, 0, zc];
        triOut(bin(a, b, c), a, b, c, [dir, 0, 0]);
      }
      var top = [[x0, S[0][0], S[0][1]], [x0, -S[0][0], S[0][1]], [x0, 0, zc]];
      triOut(B.hull, top[0], top[1], top[2], [dir, 0, 0]);
    });
  }


  /* ---------------------------------------------------------- shared pieces */

  /* a side-profile block: a CONVEX polygon pts [[x, z], ...] (model x) extruded
     across y0 .. y1 */
  function prismY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (k = 1; k + 1 < n; k++) { F.push([0, k, k + 1]); F.push([n, n + k + 1, n + k]); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }

  /* The twin 14.5 mm mount as [HB] draws it on both boats: a pedestal, a
     box-shaped shielded body, two barrels from its upper front.  Local frame:
     ring centre at P on the deck, f = +1 guns forward, -1 guns aft.
       m.a   body half-length (along x)      m.z0, m.z1  body bottom / top above P
       m.rp  pedestal radius                 m.am, m.zm  muzzle reach / height
     The body half-width (0.42 m) and the barrel spacing are NOT CONFIRMED (no
     plan or front view).  */
  function mg2(B, P, f, m) {
    var x = P[0], y = P[1], z = P[2], s;
    cyl(B.sup, [x, y, z - 0.05], [x, y, z + m.z0], m.rp, m.rp * 0.85, 12);                  /* pedestal [HB] */
    box(B.sup, x - m.a, x + m.a, y - 0.42, y + 0.42, z + m.z0, z + m.z1);                   /* shielded body [HB] */
    box(B.dark, x + f * m.a, x + f * (m.a + 0.02), y - 0.3, y + 0.3, z + m.zm - 0.12, z + m.zm + 0.1);  /* embrasure */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [x + f * (m.a - 0.25), y + s * 0.13, z + m.zm], [x + f * m.am, y + s * 0.13, z + m.zm], 0.035, 0.03, 6);  /* barrel [HB] */
      cyl(B.dark, [x + f * (m.am - 0.12), y + s * 0.13, z + m.zm], [x + f * m.am, y + s * 0.13, z + m.zm], 0.045, 0.045, 6); /* flash hider */
    }
  }

  /* ---------------------------------------------------------- the P-6 derived hull
     Both [HB] sheets give 85.3 x 19 x 6.6 ft (26.0 x 5.79 x 2.01 m), the
     Soviet Project 183 (P-6) hull both types are built on.  The two profiles
     are measured separately (each block has its own tables).  The plan and
     the sections are NOT CONFIRMED: [HB] has no plan or body plan, so the
     half-breadth table (HB, below) is a beam-5.79 m planing hull with a full
     stern and a fine bow, and the section is a hard chine over a V bottom
     (the chine line [HB] draws forward is measured; aft of where it meets
     the waterline the chine is kept just above the waterline).  The keel is
     NOT CONFIRMED (under water in [HB]); it is drawn to 1.4 m, under the
     published 2.0 m draught, which is taken to be over the screws (not drawn:
     [HB] does not show them). */
  var HB = [[0, 2.45], [2, 2.65], [5, 2.85], [8, 2.9], [15, 2.9], [18, 2.78], [20, 2.55], [22, 2.15],
            [23.5, 1.7], [24.6, 1.2], [25.4, 0.65], [26.0, 0.06]];
  function makeHull(P) {
    /* P: XO (model x = d + XO), ZD deck edge table, KZ keel table, CZ chine
       table, rake (transom shift at the waterline), STATIONS */
    function zD(d) { return tbl(P.ZD, d); }
    function half(x) {
      var d = x - P.XO, zd = zD(d), hb = tbl(HB, d), zk = tbl(P.KZ, d);
      var zc = clamp(Math.max(tbl(P.CZ, d), zk + 0.05), -5, zd - 0.12);
      var hc = hb * lerp(0.94, 0.84, clamp((d - 20) / 5, 0, 1));
      var S = [[hb, zd], [hb * 0.985, lerp(zd, zc, 0.5)], [hc, zc], [hc * 0.55, lerp(zc, zk, 0.55)], [hc * 0.15, lerp(zc, zk, 0.9)], [0, Math.min(zk, zc - 0.02)]];
      if (d < 0.01) S.forEach(function (p) { p.push(P.rake * (zd - p[1]) / zd); });  /* raked transom [HB] */
      return S;
    }
    function zmid(x) { var d = x - P.XO; return (zD(d) + tbl(P.KZ, d)) / 2; }
    return { zD: zD, half: half, zmid: zmid };
  }
  function buildHull(B, P, H) {
    var xs = P.STATIONS.map(function (d) { return d + P.XO; });
    hullLoft(B, xs, H.half, H.zmid, function () { return 0.1; });
  }
  /* small flat team strips on the deck centreline, 3 cm over the crown */
  function teamStrip(B, H, XO, d0, d1, hw) {
    var z = Math.max(H.zD(d0), H.zD(d1)) + 0.13;
    box(B.team, d0 + XO, d1 + XO, -hw, hw, z - 0.02, z);
  }

  /* ---------------------------------------------------------- deck fittings
     Rework round 2026-11-12 (visual review: both boats read as a bare hull
     with blocks on it).  What every photograph of a P-6 type hull shows and
     the [HB] profiles leave out (rule 10): the rubbing strake along the
     deck edge, guard rails (stanchions with two wires) along the open deck
     edges, bollard pairs and fairleads, the anchor in its pocket at the bow,
     deck hatches and mushroom vents, the boat's life-raft canisters, the
     searchlight and the wheelhouse roof rail.  o: rails [[d0, d1], ...],
     boll [d...], hatch [[d, y, l, w]...], vents [[d, y]...], rafts [d, y, z],
     roof [x0, x1, hw, z] (model x) */
  function fittings(B, H, XO, o) {
    var s, d, i;
    function X(dd) { return dd + XO; }
    function yE(dd) { return Math.max(0.05, tbl(HB, dd)); }
    for (s = -1; s <= 1; s += 2) {
      for (d = 0.2; d < 25.4; d += 0.8) {
        var d2 = Math.min(25.6, d + 0.8);
        cyl(B.dark, [X(d), s * (yE(d) + 0.04), H.zD(d) - 0.14], [X(d2), s * (yE(d2) + 0.04), H.zD(d2) - 0.14], 0.055, 0.055, 4);
      }
      (o.rails || []).forEach(function (r) {
        var n = Math.max(2, Math.round((r[1] - r[0]) / 1.2)), prev = null, k;
        for (k = 0; k <= n; k++) {
          var dd = r[0] + (r[1] - r[0]) * k / n, y = s * (yE(dd) - 0.1), z = H.zD(dd);
          cyl(B.metal, [X(dd), y, z], [X(dd), y, z + 0.9], 0.022, 0.022, 4);
          if (prev) {
            cyl(B.metal, [prev[0], prev[1], prev[2] + 0.9], [X(dd), y, z + 0.9], 0.014, 0.014, 3);
            cyl(B.metal, [prev[0], prev[1], prev[2] + 0.45], [X(dd), y, z + 0.45], 0.012, 0.012, 3);
          }
          prev = [X(dd), y, z];
        }
      });
      (o.boll || []).forEach(function (dd) {
        var y = s * (yE(dd) - 0.45), z = H.zD(dd);
        cylZ(B.metal, X(dd) - 0.16, y, z - 0.02, z + 0.3, 0.07, 8);
        cylZ(B.metal, X(dd) + 0.16, y, z - 0.02, z + 0.3, 0.07, 8);
        box(B.metal, X(dd) - 0.26, X(dd) + 0.26, y - 0.09, y + 0.09, z - 0.02, z + 0.04);
        box(B.metal, X(dd) - 0.15, X(dd) + 0.15, s * (yE(dd) - 0.12) - 0.06, s * (yE(dd) - 0.12) + 0.06, z, z + 0.14);
      });
      /* the anchor in its pocket under the deck edge, port and starboard */
      var da = 23.0, ya = s * (yE(da) * 0.93 + 0.02), za = H.zD(da) - 0.55;
      box(B.dark, X(da) - 0.32, X(da) + 0.32, ya - 0.03, ya + 0.03, za - 0.3, za + 0.3);
      box(B.metal, X(da) - 0.2, X(da) + 0.2, ya + s * 0.03 - 0.03, ya + s * 0.03 + 0.03, za - 0.25, za + 0.15);
    }
    (o.hatch || []).forEach(function (h) {
      var z = H.zD(h[0]) + 0.08;
      box(B.sup, X(h[0]) - h[2] / 2, X(h[0]) + h[2] / 2, h[1] - h[3] / 2, h[1] + h[3] / 2, z - 0.06, z + 0.06);
      box(B.dark, X(h[0]) - h[2] / 2 + 0.06, X(h[0]) + h[2] / 2 - 0.06, h[1] - h[3] / 2 + 0.06, h[1] + h[3] / 2 - 0.06, z + 0.06, z + 0.075);
    });
    (o.vents || []).forEach(function (v) {
      var z = H.zD(v[0]);
      cylZ(B.sup, X(v[0]), v[1], z, z + 0.42, 0.09, 8);
      ellipsoid(B.sup, [X(v[0]), v[1], z + 0.42], 0.17, 0.17, 0.08, 3, 8, 0, PI / 2);
    });
    if (o.rafts) for (i = 0; i < 2; i++) {
      var R = o.rafts;
      cyl(B.metal, [X(R[0]) - 0.45 + i * 0.95, R[1] - 0.25, R[2] + 0.02], [X(R[0]) - 0.45 + i * 0.95, R[1] + 0.25, R[2] + 0.02], 0.03, 0.03, 4);
      cyl(B.sup, [X(R[0]) - 0.75 + i * 0.95, R[1], R[2] + 0.27], [X(R[0]) - 0.15 + i * 0.95, R[1], R[2] + 0.27], 0.24, 0.24, 10);
    }
    if (o.roof) {
      var q = o.roof, k;
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k <= 4; k++) cyl(B.metal, [lerp(q[0], q[1], k / 4), s * q[2], q[3]], [lerp(q[0], q[1], k / 4), s * q[2], q[3] + 0.6], 0.018, 0.018, 3);
        cyl(B.metal, [q[0], s * q[2], q[3] + 0.6], [q[1], s * q[2], q[3] + 0.6], 0.014, 0.014, 3);
      }
      cyl(B.metal, [q[0], -q[2], q[3] + 0.6], [q[0], q[2], q[3] + 0.6], 0.014, 0.014, 3);
      /* searchlight on the roof's fore end */
      cylZ(B.metal, q[1] - 0.35, 0.9, q[3], q[3] + 0.3, 0.05, 6);
      cyl(B.sup, [q[1] - 0.5, 0.9, q[3] + 0.42], [q[1] - 0.1, 0.9, q[3] + 0.42], 0.16, 0.18, 10);
      cyl(B.glass, [q[1] - 0.1, 0.9, q[3] + 0.42], [q[1] - 0.08, 0.9, q[3] + 0.42], 0.15, 0.15, 10);
    }
  }

  /* ======================================================================
     CHAHO-CLASS FIRE-SUPPORT PATROL BOAT -- boat_k
     A P-6 hull with a BM-21-type 122 mm rocket pack on a frame amidships and
     14.5 mm machine-gun mounts.  The rules row is a turret:true "hmg" boat.

     PUBLISHED [HB] p. A-171: LOA / beam / draught 85.3 x 19 x 6.6 ft
     (26.0 x 5.79 x 2.01 m); guns 2 x twin 14.5 mm; 122 mm (BM-21) MRL;
     40 kts.  (js/warship_specs.js has 27.7 x 6.1 m: not used.)

     REFERENCE: [HB] the Chaho profile line drawing (and silhouette),
       600 dpi crop "chaho_prof.png": stern (deck edge) x 57, stem top
       x 2268 -> 2211 px = 26.0 m, 85.0 px/m; waterline = the heavy bottom
       line, y 625.  d = (x - 57) / 85 m forward of the transom top,
       z = (625 - y) / 85.  The silhouette below it agrees in every outline.
     MEASURED off [HB] (published in brackets):
       length 26.0 m (scaled from it) [26.0]; beam not measurable (no plan),
       drawn 5.80 [5.79]; transom raked, 0.45 m from deck to waterline
       deck edge z 1.38 at the transom, 1.29 at d 1.7, 1.36 at d 5, 1.57 at
       d 12.3, 1.69 at d 16.4, 1.83 at d 20.6, 2.06 at d 24.1, 2.22 at the
       stem; stem from the waterline at d 25.15 straight to the top at d 26.0
       forward chine line [HB]: z 0.19 at d 22.0 rising to 1.38 at d 25.7
       aft casing (a wedge) d 0 - 4.74, rising from the deck to 2.53 at d 4.04
       aft mount: ring d 6.39, body d 5.92 - 6.86, z 2.06 - 3.12, guns aft,
         muzzles d 5.39 at z 2.79
       box d 7.56 - 8.15 to z 2.18
       rocket pack d 7.98 - 11.33, 3.41 m long, 0.48 m deep, elevated 12.7 deg,
         bottom z 3.82 at its aft end, top z 5.06 at its front; carried on a
         post at d 8.15 and on posts on the wheelhouse's after edge d 11.05
       mid mount under the pack: ring d 10.27, body d 9.56 - 10.8, z 2.41 -
         3.18, guns aft, muzzles d 9.15 at z 3.06
       wheelhouse: after wall d 11.09, roof z 3.71 to d 14.04, knee 14.27 /
         3.47, raked front to the deck at d 16.27; two side windows d 13.21 -
         13.62 and 13.92 - 14.39, z 2.94 - 3.24
       mast (pole) d 12.01 to z 6.87; dome d 12.4 - 12.7 to 4.18; lamp
         d 12.86 - 13.56 to 4.12; post d 14.1 to 4.0
       forward mount: ring d 19.27, body d 18.74 - 19.8, z 2.18 - 3.35,
         muzzles d 20.51 at z 3.21; bitts d 23.56 and 24.15
       height over the mast 6.87 m [no published figure]
     RECOGNITION LIST [HB]: 1 the low P-6 hull, raked transom, sheer rising
       to a raked stem with a chine line forward; 2 the rocket pack on its
       frame amidships, raised forward; 3 three twin MG mounts with box
       shields (aft and under the pack trained aft, forward trained ahead);
       4 the wheelhouse with a raked front and the pole mast; 5 the aft
       wedge casing.
     NOT CONFIRMED: all breadths (no plan): hull plan (HB table), wheelhouse
       3.0 m wide, the pack 1.6 m wide, the aft wedge 2.4 m wide, the box
       1.0 m, mount bodies 0.84 m; the underwater hull and keel (drawn 1.4 m);
       the number of mounts ([HB] text says 2 x twin 14.5 mm, its drawing
       shows three similar mounts: the three drawn are drawn); what the aft
       wedge is (drawn as a closed casing); the paint (KPA grey as the Najin
       photograph of js/hero/kpa_ships.js, red boot - [HB] is a line drawing).
     TURRET: the forward mount (d 19.27) is the "turret", trained ahead.  The
       two after mounts are baked, trained aft as drawn.
     ==================================================================== */
  var CHAHO = (function () {
    var XO = -13.0;
    function X(d) { return d + XO; }
    var P = {
      XO: XO, rake: 0.45,
      ZD: [[0, 1.38], [1.7, 1.29], [5.0, 1.36], [7.35, 1.40], [12.3, 1.57], [16.43, 1.69], [18.2, 1.71], [20.6, 1.83],
           [21.73, 1.95], [24.09, 2.06], [25.27, 2.11], [26.0, 2.22]],
      KZ: [[0, -0.85], [2, -1.0], [6, -1.3], [12, -1.4], [17, -1.35], [20, -1.15], [22.5, -0.7], [24.3, -0.3],
           [25.15, 0.0], [26.0, 2.1]],
      CZ: [[0, 0.12], [20.5, 0.12], [22.04, 0.19], [22.86, 0.36], [24.04, 0.65], [24.62, 0.84], [25.21, 1.02], [25.68, 1.38], [26.0, 1.9]],
      STATIONS: [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.15, 25.4, 25.7, 26.0]
    };
    var H = makeHull(P);
    function zD(d) { return H.zD(d); }

    function build(THREE, M, C) {
      var MB = makeBins(THREE, C, { hull: 0x8f9593, sup: 0x9ba19f, deck: 0x7d8280, under: 0x3a2826 });
      var B = MB.fresh(), TB = MB.fresh(), g = new THREE.Group(), s, i;
      buildHull(B, P, H);

      /* aft wedge casing [HB]: from the transom up to 2.53 at d 4.04, down to the deck at d 4.74 */
      prismY(B.sup, [[X(0.05), zD(0) - 0.05], [X(4.74), zD(4.74) - 0.05], [X(4.04), 2.53], [X(0.05), 1.48]], -1.2, 1.2);
      /* aft mount [HB], trained aft */
      mg2(B, [X(6.39), 0, zD(6.39)], -1, { a: 0.47, z0: 2.06 - zD(6.39), z1: 3.12 - zD(6.39), rp: 0.3, am: 1.0, zm: 2.79 - zD(6.39) });
      /* box [HB] */
      box(B.sup, X(7.56), X(8.15), -0.5, 0.5, zD(7.56) - 0.05, 2.18);
      /* mid mount under the pack [HB], trained aft */
      mg2(B, [X(10.27), 0, zD(10.27)], -1, { a: 0.62, z0: 2.41 - zD(10.27), z1: 3.18 - zD(10.27), rp: 0.35, am: 1.12, zm: 3.06 - zD(10.27) });

      /* wheelhouse [HB] */
      var b0 = zD(11.09) - 0.05;
      prismY(B.sup, [[X(11.09), b0], [X(16.27), zD(16.27) - 0.05], [X(14.27), 3.47], [X(14.04), 3.71], [X(11.09), 3.71]], -1.5, 1.5);
      for (s = -1; s <= 1; s += 2) {
        box(B.glass, X(13.21), X(13.62), s * 1.5 - 0.02, s * 1.5 + 0.02, 2.94, 3.24);
        box(B.glass, X(13.92), X(14.39), s * 1.5 - 0.02, s * 1.5 + 0.02, 2.94, 3.24);
        box(B.dark, X(11.6), X(12.4), s * 1.5 - 0.015, s * 1.5 + 0.015, b0 + 0.1, b0 + 1.75);   /* door line */
      }
      /* the raked front's windows (the front is raked from the knee: three panes) */
      (function () {
        var x0 = X(14.27), z0 = 3.47, x1 = X(16.27), z1 = zD(16.27), u = unit([x1 - x0, 0, z1 - z0]), w = unit([-(z1 - z0), 0, x1 - x0]);
        for (i = -1; i <= 1; i++) obox(B.glass, [x0, i * 0.85, z0], u, [0, 1, 0], [w[0], 0, w[2]], 0.15, 0.65, -0.35, 0.35, 0.0, 0.02);
      })();
      /* roof fittings [HB] */
      cyl(B.metal, [X(12.01), 0, 3.7], [X(12.01), 0, 6.87], 0.06, 0.03, 6);         /* pole mast */
      ellipsoid(B.sup, [X(12.55), 0, 3.82], 0.15, 0.15, 0.36, 4, 10, 0, PI / 2);     /* dome */
      cylZ(B.sup, X(13.2), 0, 3.7, 3.88, 0.1, 8);
      ellipsoid(B.metal, [X(13.21), 0, 3.97], 0.35, 0.16, 0.15, 4, 10);               /* lamp */
      cylZ(B.metal, X(14.1), 0, 3.7, 4.0, 0.04, 6);                                    /* post */

      /* the rocket pack [HB]: an oriented box, 12.7 deg up, 1.6 m wide (NOT CONFIRMED) */
      (function () {
        var el = 12.7 * PI / 180, u = [Math.cos(el), 0, Math.sin(el)], w = [-Math.sin(el), 0, Math.cos(el)], O = [X(7.98), 0, 3.82];
        obox(B.sup, O, u, [0, 1, 0], w, 0, 3.41, -0.8, 0.8, 0, 0.48);
        obox(B.dark, O, u, [0, 1, 0], w, 3.41, 3.43, -0.75, 0.75, 0.03, 0.45);        /* the tube mouths */
        for (i = 0; i < 3; i++) obox(B.dark, O, u, [0, 1, 0], w, 0.4 + i * 1.2, 0.45 + i * 1.2, -0.81, 0.81, 0, 0.48);  /* bands, the hatching of [HB] */
        /* supports [HB]: the post at d 8.15, posts on the wheelhouse's after edge */
        for (s = -1; s <= 1; s += 2) {
          box(B.metal, X(8.1), X(8.2), s * 0.6 - 0.05, s * 0.6 + 0.05, zD(8.15) - 0.05, 3.86);
          box(B.metal, X(11.0), X(11.1), s * 0.6 - 0.05, s * 0.6 + 0.05, 3.68, 4.55);
        }
      })();

      /* bitts [HB] */
      cylZ(B.metal, X(23.56), 0.5, zD(23.56) - 0.03, zD(23.56) + 0.14, 0.07, 6);
      cylZ(B.metal, X(23.56), -0.5, zD(23.56) - 0.03, zD(23.56) + 0.14, 0.07, 6);
      cylZ(B.metal, X(24.15), 0, zD(24.15) - 0.03, zD(24.15) + 0.14, 0.07, 6);

      fittings(B, H, XO, { rails: [[0.4, 4.6], [5.0, 11.0], [16.6, 25.0]], boll: [1.3, 17.6, 24.7],
        hatch: [[2.2, 1.6, 0.6, 0.5], [17.0, 0, 0.8, 0.8], [22.6, 0, 0.6, 0.6]], vents: [[15.0, 2.0], [15.0, -2.0], [5.4, 1.9]],
        rafts: [X(12.6) - XO, -0.95, 3.71], roof: [X(11.2), X(14.0), 1.45, 3.71] });
      /* team: two strips on the deck */
      teamStrip(B, H, XO, 21.2, 22.2, 0.6);
      for (s = -1; s <= 1; s += 2) box(B.team, X(1.6), X(2.6), s * 1.45, s * 1.85, zD(1.6) + 0.05, zD(1.6) + 0.07);  /* beside the wedge */

      /* the turret: the forward mount [HB], ring d 19.27, trained ahead */
      var zr = zD(19.27);
      var tw = new THREE.Group(); tw.name = "turret"; tw.position.set(X(19.27), 0, zr);
      mg2(TB, [0, 0, 0], 1, { a: 0.53, z0: 2.18 - zr, z1: 3.35 - zr, rp: 0.29, am: 1.24, zm: 3.21 - zr });
      flush(THREE, g, B);
      flush(THREE, tw, TB);
      g.add(tw);
      return g;
    }
    return { build: build, L: 26.0 };
  })();

  /* ======================================================================
     NAMPO-CLASS CRAFT -- corvette_k
     The KPA's P-6 derived craft with a bow door and a ramp trunk on the
     foredeck (a landing craft for about 30 troops; many reported converted
     to patrol duty with the door welded).  The game row is "Nampo-class
     corvette" in js/rules.js (navgun_57) but js/warship_specs.js gives it
     the P-6 craft's figures (27.7 m, 2 guns 14.5 mm, fore and aft) and the
     caller asked for the Nampo patrol craft: this IS that craft, drawn
     with what [HB] shows - two twin 14.5 mm, no 57 mm (no reference shows
     one on this hull).  NOT the 2010s "Nampo-class corvette" frigate of
     en.wikipedia, for which no reference exists.

     PUBLISHED [HB] p. A-189: LOA / beam / draught 85.3 x 19 x 6.6 ft
     (26.0 x 5.79 x 2.01 m); guns 2 x twin 14.5 mm; 40 kts.

     REFERENCE: [HB] the NAMPO LCP profile line drawing (labelled: latticed
       mast, wheelhouse, 14.5 mm (to stbd) aft, 14.5 mm (to port) forward,
       bow door) and silhouette, 600 dpi crop "nampo_prof.png": stern x 72,
       stem top x 1905 -> 1833 px = 26.0 m, 70.5 px/m; waterline y 626.
       d = (x - 72) / 70.5, z = (626 - y) / 70.5.
     MEASURED off [HB] (published in brackets):
       length 26.0 (scaled from it) [26.0]; beam drawn 5.80 [5.79]
       deck edge z 1.21 at the transom, 1.33 at d 1.8, 1.45 at d 6.1, 1.62 at
       d 13.2, 1.76 at d 19.6, 1.87 at d 23.8 - 25.2, 1.99 at the stem; stem
       from the waterline at d 24.87; transom raked 0.4 m
       chine line forward z 0.31 at d 21.7, 0.82 at d 23.8
       aft mount (to starboard): ring d 5.05, body d 4.65 - 5.65, z 2.57 -
         3.13, guns aft, muzzles d 3.66 at z 3.04; wide pedestal d 4.44 - 5.43
       box d 6.64 - 7.77 to z 2.21
       strut from d 7.35 / z 1.57 to the mast at d 9.55 / z 4.06
       latticed mast d 9.48 - 10.04 to z 5.48, radome d 9.26 - 10.18 to 6.40,
         pole at d 8.74 from 5.48 to 8.09 (the highest point)
       wheelhouse: after side raked from d 11.18 (deck) to 11.74 / 3.28;
         lower roof 3.28; raised cabin d 12.6 - 14.58 to 3.70 with two posts
         (d 13.3, 13.87) to 4.13; roof 3.28 again to d 15.29, raked front to
         the deck at d 15.86; a strake at z 2.43; windows d 15.0 - 15.29,
         z 2.85 - 3.07
       forward mount (to port): ring d 17.9, body d 17.42 - 18.41, z 2.50 -
         3.21, muzzles d 19.4 at z 3.21
       ramp trunk d 19.4 - 24.94, top z 2.45 aft to 2.35 forward, a seam at
         z 2.1; the bow door in the stem
       height over the pole 8.09 m [no published figure]
     RECOGNITION LIST [HB]: 1 the P-6 hull with the raked transom and stem;
       2 the long low ramp trunk on the foredeck ending in the bow door;
       3 the latticed mast with its radome, the raking strut and the pole;
       4 the wheelhouse with raked ends and a raised cabin; 5 two twin
       14.5 mm, the after one to starboard, the forward one to port.
     NOT CONFIRMED: all breadths (no plan): hull plan, wheelhouse 3.0 m wide,
       the cabin 2.6, ramp trunk 2.2, the box 1.2; how far the two mounts
       stand off the centreline (drawn 1.0 m; [HB] only says "to stbd" /
       "to port"); the lattice pattern (drawn as four posts with X braces);
       the underwater hull and keel (drawn 1.4 m); the paint (KPA grey).
     TURRET: the forward mount (d 17.9, 1.0 m to port) is the "turret",
       trained ahead.  The after mount is baked, trained aft.
     ==================================================================== */
  var NAMPO = (function () {
    var XO = -13.0;
    function X(d) { return d + XO; }
    var P = {
      XO: XO, rake: 0.4,
      ZD: [[0, 1.21], [0.54, 1.27], [1.82, 1.33], [3.94, 1.42], [6.07, 1.45], [8.91, 1.50], [13.16, 1.62], [16.7, 1.67],
           [19.55, 1.76], [21.67, 1.79], [23.8, 1.87], [25.2, 1.87], [25.65, 1.93], [26.0, 1.99]],
      KZ: [[0, -0.85], [2, -1.0], [6, -1.3], [12, -1.4], [17, -1.35], [20, -1.15], [22.5, -0.65], [24.0, -0.28],
           [24.87, 0.0], [26.0, 1.9]],
      CZ: [[0, 0.12], [20.8, 0.12], [21.67, 0.31], [23.8, 0.82], [24.9, 1.3], [26.0, 1.8]],
      STATIONS: [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 22.5, 23, 23.5, 24, 24.5, 24.87, 25.2, 25.5, 25.75, 26.0]
    };
    var H = makeHull(P);
    function zD(d) { return H.zD(d); }

    function build(THREE, M, C) {
      var MB = makeBins(THREE, C, { hull: 0x8f9593, sup: 0x9ba19f, deck: 0x7d8280, under: 0x3a2826 });
      var B = MB.fresh(), TB = MB.fresh(), g = new THREE.Group(), s, i;
      buildHull(B, P, H);

      /* aft mount [HB], to starboard, trained aft; the wide pedestal */
      var ya = -1.0, za = zD(5.05);
      box(B.sup, X(4.44), X(5.43), ya - 0.35, ya + 0.35, za - 0.05, 2.57);
      mg2(B, [X(5.05), ya, za], -1, { a: 0.5, z0: 2.57 - za, z1: 3.13 - za, rp: 0.3, am: 1.39, zm: 3.04 - za });
      /* box [HB] */
      box(B.sup, X(6.64), X(7.77), -0.6, 0.6, zD(6.64) - 0.05, 2.21);

      /* latticed mast [HB]: four posts, X braces on each face, radome, pole */
      (function () {
        var x0 = X(9.48), x1 = X(10.04), h = 0.28, zb = zD(9.48) - 0.03, zt = 5.48, k, n = 6;
        var C4 = [[x0, -h], [x1, -h], [x1, h], [x0, h]];
        for (k = 0; k < 4; k++) cyl(B.metal, [C4[k][0], C4[k][1], zb], [C4[k][0], C4[k][1], zt], 0.04, 0.04, 4);
        for (i = 0; i < n; i++) {
          var za0 = lerp(zb, zt, i / n), za1 = lerp(zb, zt, (i + 1) / n);
          for (k = 0; k < 4; k++) {
            var A = C4[k], Bk = C4[(k + 1) % 4];
            cyl(B.metal, [A[0], A[1], za0], [Bk[0], Bk[1], za1], 0.018, 0.018, 3);
          }
          box(B.metal, x0, x1, -h, h, za1 - 0.02, za1 + 0.02);
        }
        box(B.sup, x0 - 0.05, x1 + 0.05, -h - 0.05, h + 0.05, zt - 0.06, zt);          /* head platform */
        cylZ(B.sup, X(9.72), 0, zt, 5.98, 0.46, 16);                                   /* radome [HB] */
        ellipsoid(B.sup, [X(9.72), 0, 5.98], 0.46, 0.46, 0.42, 5, 16, 0, PI / 2);
        cyl(B.metal, [X(8.74), 0, 5.2], [X(8.74), 0, 8.09], 0.045, 0.025, 6);         /* pole [HB] */
        cyl(B.metal, [X(8.74), 0, 5.3], [x0, 0, 5.3], 0.03, 0.03, 4);                 /* its bracket */
        cyl(B.metal, [X(7.35), 0, zD(7.35)], [X(9.55), 0, 4.06], 0.06, 0.06, 6);       /* the raking strut [HB] */
      })();

      /* wheelhouse [HB] */
      var b0 = zD(11.18) - 0.05;
      prismY(B.sup, [[X(11.18), b0], [X(15.86), zD(15.86) - 0.05], [X(15.29), 3.28], [X(11.74), 3.28]], -1.5, 1.5);
      box(B.sup, X(12.6), X(14.58), -1.3, 1.3, 3.2, 3.70);                             /* raised cabin */
      cylZ(B.metal, X(13.3), 0.6, 3.7, 4.13, 0.05, 6);                                  /* the two posts */
      cylZ(B.metal, X(13.87), -0.6, 3.7, 4.13, 0.05, 6);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, X(11.9), X(14.58), s * 1.5 - 0.015, s * 1.5 + 0.015, 2.41, 2.45);   /* the strake [HB] */
        box(B.glass, X(15.0), X(15.29), s * 1.5 - 0.02, s * 1.5 + 0.02, 2.85, 3.07);    /* window [HB] */
        box(B.glass, X(12.9), X(14.3), s * 1.3 - 0.02, s * 1.3 + 0.02, 3.4, 3.6);       /* cabin windows */
      }
      (function () {                                                                    /* front windows on the rake */
        var x0 = X(15.29), z0 = 3.28, x1 = X(15.86), z1 = zD(15.86), u = unit([x1 - x0, 0, z1 - z0]), w = unit([-(z1 - z0), 0, x1 - x0]);
        for (i = -1; i <= 1; i++) obox(B.glass, [x0, i * 0.85, z0], u, [0, 1, 0], [w[0], 0, w[2]], 0.12, 0.55, -0.35, 0.35, 0.0, 0.02);
      })();

      /* ramp trunk [HB] and the bow door */
      prismY(B.sup, [[X(19.4), zD(19.4) - 0.05], [X(24.94), zD(24.94) - 0.05], [X(24.94), 2.35], [X(19.4), 2.45]], -1.1, 1.1);
      for (s = -1; s <= 1; s += 2) box(B.dark, X(19.4), X(24.94), s * 1.1 - 0.015, s * 1.1 + 0.015, 2.08, 2.12);   /* seam [HB] */
      (function () {                                                                    /* door split line down the stem [HB] */
        var j, N = 5;
        for (j = 0; j < N; j++) {
          var za = lerp(0.35, 1.9, j / N), zb = lerp(0.35, 1.9, (j + 1) / N);
          var xa = X(tbl([[0.0, 24.87], [1.9, 25.95]], za)), xb = X(tbl([[0.0, 24.87], [1.9, 25.95]], zb));
          cyl(B.dark, [xa + 0.02, 0, za], [xb + 0.02, 0, zb], 0.03, 0.03, 4);
        }
      })();

      fittings(B, H, XO, { rails: [[0.4, 4.2], [5.8, 10.8], [16.2, 19.2]], boll: [1.3, 16.6, 25.0],
        hatch: [[3.0, 1.2, 0.6, 0.5], [9.0, -1.4, 0.7, 0.6]], vents: [[16.4, 2.0], [16.4, -2.0], [6.2, 1.9]],
        rafts: [X(11.9) - XO, -0.9, 3.28], roof: [X(11.8), X(15.2), 1.45, 3.28] });
      /* team: two strips on the deck */
      teamStrip(B, H, XO, 1.4, 2.4, 0.6);
      box(B.team, X(21.0), X(22.6), -0.4, 0.4, 2.42, 2.45);    /* on the trunk roof */

      /* the turret: the forward mount [HB], ring d 17.9, to port, trained ahead */
      var zr = zD(17.9);
      var tw = new THREE.Group(); tw.name = "turret"; tw.position.set(X(17.9), 1.0, zr);
      mg2(TB, [0, 0, 0], 1, { a: 0.5, z0: 2.5 - zr, z1: 3.21 - zr, rp: 0.27, am: 1.5, zm: 3.1 - zr });
      flush(THREE, g, B);
      flush(THREE, tw, TB);
      g.add(tw);
      return g;
    }
    return { build: build, L: 26.0 };
  })();

  var VARIANTS = {
    boat_k: CHAHO,
    corvette_k: NAMPO
  };
  return {
    variants: VARIANTS,
    build: function (THREE, M, C, key) { return VARIANTS[key].build(THREE, M, C); },
    len: function (key) { return VARIANTS[key].L; }
  };
})();

/* Registration: len is each row's measured overall length (both 26.0 m, the
   [HB] LOA the drawings were scaled from). */
(function () {
  ["boat_k", "corvette_k"].forEach(function (key) {
    UNIT_MODELS[key] = { len: HeroKpaShips2.len(key), build: function (THREE, M, C) { return HeroKpaShips2.build(THREE, M, C, key); } };
  });
})();

/* STILL HELD (review policy rule 1: no usable photograph or drawing).
   Searched for this retry, one request at a time:
   - en.wikipedia article images: "Soho-class frigate" (only a flag; the
     infobox photo "File:Soho class frigate.jpg" is deleted and is not a
     local file either), "Sinpo-class submarine", "North Korean submarine
     Hero Kim Kun Ok", "Nongo-class warship", "Nampo-class corvette",
     "Pukguksong-1" (a missile diagram only), "Pukguksong-3", "Hwasong-11S",
     "Sinpo South Shipyard", "Korean People's Navy", "List of active ships of
     the Korean People's Navy" (Najin photo, a T-class minesweeper photo,
     Chinese and Soviet types only).
   - en.wikipedia File search: "Nampo OR Chaho OR Hantae OR Kim Kun Ok"
     (led to [HB]); the other File searches were refused by rate limiting.
   - Commons searches: "Nampo class corvette", "Chaho", "Hantae", "Hero Kim
     Kun Ok", "Sinpo-C", "North Korean submarine", "North Korean warship",
     "Korean People's Navy ship" (no new ship image).
   - [HB] itself: SOHO FF and HANTAE LCU are printed "LINE DIAGRAM
     UNAVAILABLE"; it predates the Sinpo and Nongo types.
   - ko / zh / ja / de / fr Wikipedia could not be reached (the session's
     network policy refuses those hosts).
   UNIT_MODELS["kpa_e80_corvette"]    -- Soho-class frigate: no reference found
   UNIT_MODELS["kpa_e00_sub"]         -- Sinpo / Gorae SSB: no reference found
   UNIT_MODELS["kpa_e00_missileboat"] -- Nongo-class FAC: no reference found
   UNIT_MODELS["lst_k"]               -- Hantae-class LST: no reference found */
