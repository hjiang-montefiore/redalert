/* ==================== js/hero/pla_houbei.js ============================
   HERO MODEL -- Type 022 "Houbei" wave-piercing catamaran missile boat (PLAN, prototype launched April
   2004, about 83 built to 2009).  Key: pla_e00_missileboat (eras.js "Type 022 Houbei", service 2004, e00
   only; warship_specs len 42.6, beam 12.2, super "faceted", guns 1 x 30 mm fore, launchers "box").
   The row is NOT turret:true: the AK-630 is baked and nothing is named "turret" (render3d trains a
   "turret" by -(tang - ang), and a row without turret:true never moves tang, so a named mount on this row
   would swing with every turn of the hull; the house convention, as js/hero/ru_osa_boat.js, is no
   "turret" unless the row has turret:true).

   PUBLISHED FIGURES (en.wikipedia "Type 022 missile boat", citing Saunders 2015 p.151): length 42.6 m,
   beam 12.2 m, draught 1.5 m, 224 t full load; 2 diesels, 4 Kamewa waterjets; 8 x YJ-83, 1 x 30 mm AK-630
   (in "a stealthy turret"), later boats a FLS-1 MANPADS launcher on the bridge; aluminium wave-piercing
   catamaran hull (AMD 350 derived).  The game's figures (42.6 m, 12.2 m) agree; drawn to them.

   REFERENCES (Wikimedia Commons, width 960, in the scratchpad q_pla_e00_missileboat_ref):
     [D]  "Type 22 PLAN FAC.svg" (the en.wikipedia infobox drawing, boat 2208): starboard profile and plan
          with a 0-10 m scale bar.  The master for every station below.  The bar reads 21.7 px/m and the
          profile measures 915 px stem to stern = 42.2 m: scaled to the published 42.6 m (21.48 px/m),
          d = metres forward of the stern, z off the demihull keel set 1.5 m under the waterline (the
          published draught).  Its PLAN is narrow: 226 px = 10.5 m against the published 12.2 m, so every
          plan half-breadth is stretched by 12.2 / 10.5 = 1.162 (the published figure wins).
     [D2] "Type 22.png": an earlier issue of the same drawing (identical stations), used for the waterline
          marker (it puts the waterline about 1.0 m over the keel: see NOT CONFIRMED).
     [P1] "Houbei (Type 022) Class Fast Attack Craft.JPG" (PLAN photograph, port bow quarter at speed):
          the paint, the knuckle and recessed side under it at the bow, the AK-630 stealth housing, the
          tube cluster ahead of the bridge, four knobbed posts on the bridge roof, the swept faceted mast
          with its platform and pole, the aft deckhouse (raked front face, roof rising toward the bow,
          raked rear face, two dark louvre panels on its side), the railed aft deck.

   RECOGNITION LIST (each must read at game zoom; where it shows in the model):
     1. Two slender demihulls, keel 1.5 m down, the full 12.2 m beam, their noses running out ahead and
        outboard of the deck to d 40.3 [D plan and profile]: demihull().
     2. The CUTAWAY BOW: a narrow V centre bow carrying the triangular forecastle to the stem at d 42.6, a
        knuckle under the deck edge and the side recessed below it, the bare demihull tops (z 2.4) under the
        overhang [D][P1]: bow loft, demihull top table ZT.
     3. The wide faceted superstructure: side walls with a knuckle at 2.6 m and tumblehome above it; a
        U-shaped aft deck at 3.2 m with the open well between the sponsons (d 0.6 - 4.0) [D plan].
     4. The AK-630 in its faceted stealth housing on the forecastle at d 34.9, the gun ahead [D][P1][W].
     5. The bridge: a CHEVRON (V in plan) sloped front with a window band, roof at 6.05 m, d 25.2 - 31.3
        [D plan and profile][P1].
     6. The short faceted mast swept back from the bridge, the platform at 9.0 m with its cross arms and
        domes, a box and dish on top, a pole leaning aft to 13.6 m [D][P1].
     7. The aft deckhouse (d 6.6 - 17.0): raked rear face, roof rising from 5.6 to 7.3 m toward the bow,
        raked front face [D][P1]; the two YJ-83 launchers inside it, four cells each, their roof hatches
        toed out toward the bow and their front doors on the raked front face [D plan: one hatch drawn
        open with the canisters' arrows pointing forward]: launcherHatch().
     8. Waterjets at the foot of each demihull transom [D profile][W: four].
     9. Paint: the PLAN "sea" disruptive camouflage sampled off [P1]: blue ground (sunlit 45,78,175), khaki-
        grey (175,175,160), off-white (225,230,235) and black (12,14,25) patches, taken to about 0.8 for the
        ACES pass: 0x243e8c, 0x8c8c80, 0xb4b8bc, 0x161820, painted as a tiling canvas texture (camo());
        mean colour 0x55607e where no canvas exists.  Boot topping dark brown-grey as [D] (71,59,59).
   NOT CONFIRMED and drawn only as marked: the wet-deck (tunnel roof) height, 1.2 m (no view shows it); the
   demihull sections and the centre-bow V below the knuckle (drawn to the outlines in [D], shapes between
   them estimated); the waterline: [D2]'s marker gives about 1.0 m draught, the published 1.5 m is used;
   the launcher hatch outlines (from [D]'s plan, which is a cutaway illustration, toe-out about 8 deg);
   the tube cluster ahead of the bridge (drawn as [D][P1] show it, a decoy launcher by its look, not
   named in any source); the four posts on the bridge roof ([P1]: their positions estimated, no source says
   which, if any, is the FLS-1/QW launcher, so no launcher is drawn); the canister and davit on the main
   deck; the waterjet shape (two per demihull per [W], their detail estimated).  Not drawn because no
   reference shows them clearly: the small mount on the stern in [P1] (unidentified), any interior of
   the launchers.  No pennant numbers, flags or ensigns.
   NOTE on the launch direction: [D]'s plan draws the starboard launcher with its roof hatch removed
   and the canisters' arrows (its missile icon: nose left = forward) pointing to the BOW, the front
   face doors drawn on the raked front face, and the hatches toed out forward to clear the bridge; the
   model follows [D].  Nothing found shows them firing aft.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  Everything baked, one mesh per
   material (7 draw calls).  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHoubei = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, L = 42.6, X0 = -21.3;
  function X(d) { return X0 + d; }            /* x at d metres forward of the stern */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerp3(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
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
  /* loft through rings of equal point count, flat-capped; pick(a,b,c) may choose the bin per triangle */
  function loft(bin, rings, noCap, pick) {
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
      (pick ? pick(p, q, s2) : bin).tri(p, q, s2);
    }
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
  /* a convex (d, z) outline extruded across the ship, each vertex at half-breadth hw(z) (tumblehome) */
  function prismY(bin, poly, hw) {
    var V = [], F = [], n = poly.length, i;
    for (i = 0; i < n; i++) V.push([X(poly[i][0]), hw(poly[i][1]), poly[i][1]]);
    for (i = 0; i < n; i++) V.push([X(poly[i][0]), -hw(poly[i][1]), poly[i][1]]);
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, j, n + j]); F.push([i, n + j, n + i]); }
    csolid(bin, V, F);
  }
  /* a flat quad laid on a face, lifted 4 cm along its outward normal (out = a point outside the face) */
  function pane(bin, a, b, c, d, out) {
    var n = unit(cross(sub(b, a), sub(c, a)));
    if (dot(n, sub(out, a)) < 0) { var t = b; b = d; d = t; n = mul(n, -1); }
    var o = mul(n, 0.04);
    a = add(a, o); b = add(b, o); c = add(c, o); d = add(d, o);
    bin.tri(a, b, c); bin.tri(a, c, d);
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

  /* ------------------------------------------------------------ canvas paint */
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
  /* the PLAN "sea" disruptive scheme [P1], 16 m square (32 px/m): blue ground, big khaki-grey patches,
     off-white and black splotches, each patch a cluster of overlapping ellipses drawn wrapped so the
     texture tiles; panel seams every 2 m and a little weathering over it */
  function drawCamo(g, S) {
    var R = rng(2208), m = S / 16, i, k;
    g.fillStyle = "#243e8c"; g.fillRect(0, 0, S, S);
    function blob(col, n, rmin, rmax, spread) {
      for (i = 0; i < n; i++) {
        var cx = R() * S, cy = R() * S, parts = 4 + Math.floor(R() * 5), q;
        g.fillStyle = col;
        for (q = 0; q < parts; q++) {
          var px = cx + (R() - 0.5) * spread * m, py = cy + (R() - 0.5) * spread * 0.6 * m;
          var rx = (rmin + R() * (rmax - rmin)) * m, ry = rx * (0.45 + R() * 0.35), ox, oy;
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
            g.beginPath(); g.ellipse(px + ox, py + oy, rx, ry, 0, 0, TAU); g.fill();
          }
        }
      }
    }
    blob("#8c8c80", 7, 0.9, 1.8, 4.0);      /* khaki-grey */
    blob("#b4b8bc", 9, 0.35, 0.8, 1.6);     /* off-white */
    blob("#161820", 5, 0.4, 0.9, 1.8);      /* black */
    for (k = 0; k < 8; k++) {
      g.fillStyle = "rgba(10,14,30,0.10)"; g.fillRect(0, Math.round(k * 2 * m), S, 1);
      g.fillRect(Math.round(k * 2 * m), 0, 1, S);
    }
    for (i = 0; i < 60; i++) {
      g.globalAlpha = 0.03 + R() * 0.04; g.fillStyle = R() < 0.5 ? "#000000" : "#ffffff";
      g.fillRect(R() * S, R() * S, (0.5 + R() * 2) * m, (0.1 + R() * 0.4) * m);
    }
    g.globalAlpha = 1;
  }

  function materials(THREE, C) {
    var camo = canvasTex(THREE, "houbeiCamo", drawCamo);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: camo ? mk(0xffffff, 0.8, 0.08, camo) : mk(0x55607e, 0.8, 0.08),   /* camouflage (item 9) */
      boot: mk(0x3e3434, 0.86, 0.04),            /* boot topping and bottom [D] */
      fit: mk(0xb4b8bc, 0.7, 0.15),              /* the off-white fittings: dish, domes, posts, director */
      dark: mk(0x1c2026, 0.75, 0.3),             /* louvres, slots, seams, waterjets */
      metal: mk(0x5a6066, 0.5, 0.55),            /* rails, barrels, poles */
      glass: mk(0x10161c, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ station tables, all off [D] (d from the
     stern, plan half-breadths x 1.162).  Demihull: KZ keel, ZT top (the wet deck 1.2 m aft, NOT CONFIRMED;
     the bare tops forward under the cutaway, the "pod" outline in [D]'s profile), HW half-breadth, YC centre.
     Bow: HB forecastle deck-edge half-breadth, ZDK deck edge, KB centre-bow keel, BW its bottom half-width. */
  var ZW = 1.2;
  var KZ = [[1.0, -1.3], [2.2, -1.5], [34, -1.5], [37, -1.32], [38.8, -1.08], [39.8, -0.85], [40.3, -0.62]];
  var ZT = [[1.0, ZW], [30.6, ZW], [31.2, 2.4], [37.0, 2.3], [38.2, 1.95], [38.9, 1.15], [39.6, 0.25], [40.3, -0.5]];
  var HW = [[1.0, 1.3], [3.0, 1.4], [33, 1.4], [36, 1.22], [38, 0.95], [39.5, 0.55], [40.3, 0.1]];
  var YC = [[0, 4.7], [34, 4.7], [40.3, 5.2]];
  var HB = [[31, 5.64], [33, 5.11], [36, 3.72], [40, 1.51], [42.6, 0.02]];
  var ZDK = [[31, 4.15], [42.6, 3.75]];
  var KB = [[31, ZW], [36, 1.4], [39, 1.75], [40.6, 2.05], [41.6, 2.75], [42.6, 3.55]];
  var BW = [[31, 3.25], [36, 2.0], [40, 0.6], [42.6, 0.01]];
  function zDeck(d) { return tbl(ZDK, d); }
  /* superstructure side half-breadth: 5.85 m at the 3.2 m deck, leaning in 0.085 per metre above it */
  function hwU(z) { return 5.85 - 0.085 * Math.max(0, z - 3.2); }

  function hullPick(B) {
    return function (a, b, c) { return (a[2] + b[2] + c[2]) / 3 < -0.03 ? B.boot : B.hull; };
  }

  /* ---- 1. the demihulls [D plan and profile] */
  function demihull(B, s) {
    var ds = [1.0, 1.6, 2.2, 4, 8, 14, 20, 26, 30.6, 31.2, 33, 34.5, 36, 37, 37.6, 38.2, 38.6, 38.9, 39.2, 39.6, 39.9, 40.15, 40.3];
    var rings = ds.map(function (d) {
      var kz = tbl(KZ, d), zt = tbl(ZT, d), hw = tbl(HW, d), yc = tbl(YC, d), zm = Math.min(0.1, zt - 0.05);
      if (zt < kz + 0.08) zt = kz + 0.08;
      var x = X(d), P = [[yc + hw, zt], [yc + hw, Math.max(zm, kz + 0.06)], [yc + 0.82 * hw, kz + 0.42 * Math.min(1, hw)], [yc, kz],
                         [yc - 0.82 * hw, kz + 0.42 * Math.min(1, hw)], [yc - hw, Math.max(zm, kz + 0.06)], [yc - hw, zt]];
      return P.map(function (p) { return [x, s * p[0], p[1]]; });
    });
    loft(B.hull, rings, false, hullPick(B));
  }

  /* ---- 2. the centre bow and forecastle, d 31 - 42.6 [D][P1]: deck edge, knuckle 0.5 m down, the side
     stepping in under it (the cutaway), V bottom to the centre keel */
  function bow(B) {
    var ds = [31, 32, 33, 34.5, 36, 37.5, 39, 40, 40.8, 41.5, 42.1, 42.6];
    var rings = ds.map(function (d) {
      var hb = tbl(HB, d), zd = zDeck(d), kb = tbl(KB, d), bw = Math.min(tbl(BW, d), hb * 0.7), x = X(d);
      var zk = Math.max(kb + 0.05, zd - 0.5), zr = Math.max(kb + 0.04, zd - 0.8), zb = Math.min(zr - 0.02, kb + 0.25);
      var P = [[0, zd + 0.05], [hb, zd], [hb * 0.97, zk], [hb * 0.8, zr], [bw, zb], [0, kb],
               [-bw, zb], [-hb * 0.8, zr], [-hb * 0.97, zk], [-hb, zd]];
      return P.map(function (p) { return [x, p[0], p[1]]; });
    });
    loft(B.hull, rings);
  }

  /* ---- 7. a launcher roof hatch on the aft deckhouse roof [D plan]: an outline of dark seams toed out
     8 deg toward the bow, the cell divider along it */
  function roofZ(d) { return 5.6 + (d - 7.5) * (1.7 / 7.5); }
  function launcherHatch(B, s) {
    var th = s * 0.14, ca = Math.cos(th), sa = Math.sin(th), cx = 11.4, cy = s * 2.65, hl = 3.9, hw = 1.45;
    function P(a, b) {
      var d = cx + a * ca - b * sa, y = cy + a * sa + b * ca;
      return [X(d), y, roofZ(d) + 0.03];
    }
    var C4 = [P(-hl, -hw), P(hl, -hw), P(hl, hw), P(-hl, hw)], k;
    for (k = 0; k < 4; k++) cyl(B.dark, C4[k], C4[(k + 1) % 4], 0.04, 0.04, 4);
    cyl(B.dark, P(-hl, 0), P(hl, 0), 0.025, 0.025, 3);
    for (k = -1; k <= 1; k += 2) cylZ(B.metal, P(k * 2.6, s * hw * 0.7)[0], P(k * 2.6, s * hw * 0.7)[1], P(k * 2.6, 0)[2] - 0.03, P(k * 2.6, 0)[2] + 0.05, 0.09, 6);
  }

  /* ---- 4. AK-630 in its faceted stealth housing [D][P1][W] */
  function ak630(B, d) {
    var zd = zDeck(d), x = X(d) - 0.85;     /* housing from x .. x+1.75 */
    cylZ(B.hull, X(d), 0, zd - 0.05, zd + 0.1, 1.05, 20);
    function ring(z, k, a0, a1, w, f) {
      return [[x + a0 + k, -w * 0.75, z], [x + a0 + 0.25 + k, -w, z], [x + a1 - 0.3 - k * f, -w, z], [x + a1 - k * f, -w * 0.5, z],
              [x + a1 - k * f, w * 0.5, z], [x + a1 - 0.3 - k * f, w, z], [x + a0 + 0.25 + k, w, z], [x + a0 + k, w * 0.75, z]];
    }
    loft(B.hull, [ring(zd + 0.1, 0, 0, 1.75, 0.85, 1), ring(zd + 0.55, 0.05, 0, 1.75, 0.82, 1.6), ring(zd + 0.98, 0.3, 0, 1.75, 0.55, 2.4)]);
    box(B.dark, x + 1.35, x + 1.62, -0.2, 0.2, zd + 0.42, zd + 0.78);   /* the gun slot */
    var zg = zd + 0.6;
    cyl(B.metal, [x + 1.3, 0, zg], [X(37.0), 0, zg + 0.04], 0.11, 0.1, 8);
    cyl(B.dark, [X(36.8), 0, zg + 0.035], [X(37.0), 0, zg + 0.04], 0.12, 0.12, 8);
    obox(B.hull, [x + 0.3, 0, zd + 0.98], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0, 0.45, -0.2, 0.2, 0, 0.14);   /* sight hood */
  }

  /* ---- straight rail run: stanchions about every 1.2 m, top and mid wires */
  function rail(B, A, Bp, h) {
    var n = Math.max(1, Math.round(Math.sqrt(dot(sub(Bp, A), sub(Bp, A))) / 1.2)), i;
    var up = [0, 0, h], mid = [0, 0, h * 0.5];
    cyl(B.metal, add(A, up), add(Bp, up), 0.02, 0.02, 4);
    cyl(B.metal, add(A, mid), add(Bp, mid), 0.013, 0.013, 3);
    for (i = 0; i <= n; i++) {
      var p = lerp3(A, Bp, i / n);
      box(B.metal, p[0] - 0.022, p[0] + 0.022, p[1] - 0.022, p[1] + 0.022, p[2], p[2] + h);
    }
  }

  /* ------------------------------------------------------------ the boat */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var B = {};
    ["hull", "boot", "fit", "dark", "metal", "glass", "team"].forEach(function (n) { B[n] = new Bin(T[n]); });
    var s, i, j, k;

    /* --- hull: demihulls, the side bodies (sponsons) and the centre body, the bow --- */
    for (s = -1; s <= 1; s += 2) demihull(B, s);
    /* side bodies d 0.6 - 31, y 3.3 - 6.1: knuckle 2.6 m, tumblehome to 5.85 at the 3.2 m deck; their after
       ends raked from the deck at d 2.0 to 1.0 m at d 0.6 [D profile] */
    var SZ = [[0.6, 1.0], [2.0, 3.2], [31, 3.2]];
    for (s = -1; s <= 1; s += 2) {
      var sr = [0.6, 1.3, 2.0, 4, 31].map(function (d) {
        var zt = tbl(SZ, d), kn = Math.min(2.6, zt - 0.25), x = X(d);
        return [[3.3, 0.0], [6.1, 0.0], [6.1, kn], [5.85, zt], [3.3, zt]].map(function (p) { return [x, s * p[0], p[1]]; });
      });
      loft(B.hull, sr, false, hullPick(B));
    }
    /* centre body between them, wet deck to the 3.2 m deck, d 4.0 - 31 (the well aft of it is open [D plan]) */
    box(B.hull, X(4.0), X(31.0), -3.35, 3.35, ZW, 3.2);
    bow(B);

    /* --- superstructure [D profile and plan] --- */
    /* aft deckhouse d 6.6 - 17.0: raked rear face, roof 5.6 rising to 7.3 m at d 15.0, raked front face */
    prismY(B.hull, [[6.6, 3.2], [17.0, 3.2], [17.0, 4.85], [15.0, 7.3], [7.5, 5.6]], hwU);
    /* main deck block d 17 - 27.8 (deck 4.85 m) and the forward block d 27.8 - 31 (4.15 m) */
    prismY(B.hull, [[17.0, 3.2], [27.8, 3.2], [27.8, 4.85], [17.0, 4.85]], hwU);
    prismY(B.hull, [[27.8, 3.2], [31.05, 3.2], [31.05, 4.15], [27.8, 4.15]], hwU);

    /* the bridge: chevron front sloping from the foot (d 31.3 on the centre line, 27.8 at the sides) to the
       roof edge (28.6 / 26.5) at 6.05 m, roof to d 25.2 [D] */
    var RF = 6.05, ZF = 4.15, ZM = 5.2, wF = hwU(ZF), wM = hwU(ZM), wR = hwU(RF);
    /* the lower (window) facets are planar: the window-band top chevron runs parallel to the foot, from
       d 29.9 on the centre line (the inner chevron of [D] plan); the upper facets rise to the roof edge */
    var tM = wM / wF, dMe = 29.9 - 3.5 * tM;
    var BV = [[X(31.3), 0, ZF], [X(27.8), wF, ZF], [X(27.8), -wF, ZF],
              [X(29.9), 0, ZM], [X(dMe), wM, ZM], [X(dMe), -wM, ZM],
              [X(28.6), 0, RF], [X(26.1), wR, RF], [X(26.1), -wR, RF],
              [X(25.2), wR, RF], [X(25.2), -wR, RF], [X(25.2), wF, ZF], [X(25.2), -wF, ZF]];
    csolid(B.hull, BV, [[0, 1, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [3, 4, 7], [3, 7, 6], [3, 6, 8], [3, 8, 5],
                        [6, 7, 9], [6, 9, 10], [6, 10, 8], [1, 11, 9], [1, 9, 7], [1, 7, 4], [2, 5, 8], [2, 8, 10], [2, 10, 12],
                        [11, 12, 10], [11, 10, 9], [0, 2, 12], [0, 12, 11], [0, 11, 1]]);
    /* window band on each lower facet: five panes [D plan][P1] */
    for (s = -1; s <= 1; s += 2) {
      var F0 = BV[0], Fe = BV[s > 0 ? 1 : 2], T0 = BV[3], Te = BV[s > 0 ? 4 : 5];
      var fp = function (u, v) { return lerp3(lerp3(F0, Fe, u), lerp3(T0, Te, u), v); };
      for (k = 0; k < 5; k++) {
        var u0 = 0.05 + k * 0.18, u1 = u0 + 0.14;
        pane(B.glass, fp(u0, 0.3), fp(u1, 0.3), fp(u1, 0.85), fp(u0, 0.85), [X(40), s * 8, 8]);
      }
      /* side windows [D profile][P1] */
      for (k = 0; k < 2; k++) {
        var dw = 25.4 + k * 0.6;
        pane(B.glass, [X(dw), s * hwU(5.3), 5.3], [X(dw + 0.45), s * hwU(5.3), 5.3], [X(dw + 0.45), s * hwU(5.8), 5.8], [X(dw), s * hwU(5.8), 5.8], [X(dw), s * 9, 5.5]);
      }
    }
    /* bridge roof: the optronic director on its pedestal at the front [D], four knobbed posts [P1] */
    cylZ(B.hull, X(28.0), 0, RF, RF + 0.45, 0.2, 10);
    box(B.fit, X(27.75), X(28.3), -0.3, 0.3, RF + 0.45, RF + 0.82);
    box(B.dark, X(28.3), X(28.33), -0.12, 0.12, RF + 0.55, RF + 0.72);
    [[27.0, 1.3], [26.1, 1.9]].forEach(function (p) {
      for (s = -1; s <= 1; s += 2) {
        cylZ(B.fit, X(p[0]), s * p[1], RF, RF + 0.6, 0.08, 6);
        ellipsoid(B.fit, [X(p[0]), s * p[1], RF + 0.68], 0.14, 0.14, 0.16, 4, 8);
      }
    });

    /* --- the mast [D][P1]: a faceted trunk swept back off the bridge, the platform at 9.0 m with cross
       arms and two domes, a box with the dish on top, a pole leaning aft --- */
    var ZP = 9.0;
    csolid(B.hull, [[X(21.8), 1.9, 4.85], [X(25.2), 1.9, 4.85], [X(25.2), -1.9, 4.85], [X(21.8), -1.9, 4.85],
                    [X(23.4), 1.0, ZP], [X(24.6), 1.0, ZP], [X(24.6), -1.0, ZP], [X(23.4), -1.0, ZP]], HEXF);
    prismY(B.hull, [[24.4, 7.5], [25.65, ZP], [23.9, ZP]], function () { return 0.8; });   /* the swept front lip */
    box(B.hull, X(22.0), X(25.65), -0.9, 0.9, ZP, ZP + 0.18);
    box(B.hull, X(23.6), X(24.6), -2.6, 2.6, ZP + 0.02, ZP + 0.16);
    for (s = -1; s <= 1; s += 2) ellipsoid(B.fit, [X(24.1), s * 2.35, ZP + 0.16], 0.24, 0.24, 0.3, 4, 10, 0, PI / 2);
    csolid(B.hull, [[X(23.6), 0.6, ZP + 0.18], [X(24.8), 0.6, ZP + 0.18], [X(24.8), -0.6, ZP + 0.18], [X(23.6), -0.6, ZP + 0.18],
                    [X(23.8), 0.45, 10.0], [X(24.6), 0.45, 10.0], [X(24.6), -0.45, 10.0], [X(23.8), -0.45, 10.0]], HEXF);
    cylZ(B.metal, X(24.25), 0, 10.0, 10.25, 0.06, 6);
    cyl(B.fit, [X(24.2), 0, 10.6], [X(24.4), 0, 10.6], 0.42, 0.42, 16);                    /* the dish, facing ahead */
    cyl(B.dark, [X(24.4), 0, 10.6], [X(24.42), 0, 10.6], 0.34, 0.34, 16);
    cyl(B.metal, [X(23.35), 0, ZP + 0.18], [X(22.75), 0, 13.6], 0.07, 0.035, 6);           /* the pole */
    cyl(B.metal, [X(23.0), -0.9, 11.9], [X(23.0), 0.9, 11.9], 0.025, 0.025, 4);             /* yard */
    cyl(B.metal, [X(22.95), 0, 12.3], [X(22.3), 0, 12.0], 0.025, 0.02, 4);                  /* gaff */

    /* --- the aft deckhouse fittings [D][P1] --- */
    for (s = -1; s <= 1; s += 2) launcherHatch(B, s);
    /* the launcher doors on the raked front face: a dark frame each side of the centre line [D] */
    for (s = -1; s <= 1; s += 2) {
      var fA = [17.0, 4.85], fB = [15.0, 7.3];
      var fq = function (v, y) { var d = lerp(fA[0], fB[0], v), z = lerp(fA[1], fB[1], v); return [X(d) + 0.03, y, z]; };
      var ya = s * 0.6, yb = s * (hwU(6.8) - 0.35);
      var Q = [fq(0.12, ya), fq(0.12, yb), fq(0.9, yb), fq(0.9, ya)];
      for (k = 0; k < 4; k++) cyl(B.dark, Q[k], Q[(k + 1) % 4], 0.05, 0.05, 4);
      cyl(B.dark, fq(0.51, ya), fq(0.51, yb), 0.03, 0.03, 4);
    }
    /* louvres on the side [D profile][P1]: two dark panels d 11.4 - 12.5 and 10.6 - 11.2, small one d 18.5 - 19.0 */
    for (s = -1; s <= 1; s += 2) {
      [[10.6, 11.2, 3.15, 4.25], [11.4, 12.5, 3.15, 4.25], [18.5, 19.0, 3.7, 4.4]].forEach(function (p) {
        var y0 = s * (hwU(p[3]) - 0.08), y1 = s * 5.92;
        box(B.dark, X(p[0]), X(p[1]), Math.min(y0, y1), Math.max(y0, y1), p[2], p[3]);
      });
      box(B.dark, X(7.6), X(8.5), s * 5.82 - 0.04, s * 5.82 + 0.04, 3.25, 3.85);          /* hatch outline on the rear */
    }
    /* roof: a lamp post with a box, whips [D][P1] */
    cylZ(B.metal, X(12.9), 0, roofZ(12.9), roofZ(12.9) + 0.7, 0.05, 6);
    box(B.fit, X(12.75), X(13.1), -0.14, 0.14, roofZ(12.9) + 0.7, roofZ(12.9) + 0.98);
    cyl(B.metal, [X(13.7), 0.5, roofZ(13.7)], [X(14.0), 0.5, roofZ(13.7) + 1.8], 0.03, 0.012, 4);
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(10.4), s * 0.6, roofZ(10.4)], [X(9.8), s * 0.65, roofZ(10.4) + 3.0], 0.035, 0.012, 4);

    /* --- main deck aft of the mast [D]: canister, davit, vents; rails d 16.9 - 21.2 --- */
    cylZ(B.fit, X(19.35), 0, 4.85, 5.5, 0.34, 12);
    for (j = 0; j < 3; j++) cylZ(B.dark, X(19.35), 0, 4.98 + j * 0.2, 5.0 + j * 0.2, 0.35, 12);
    cyl(B.metal, [X(18.9), -1.6, 4.85], [X(18.45), -1.6, 6.7], 0.05, 0.035, 5);
    cyl(B.metal, [X(18.45), -1.6, 6.7], [X(18.9), -1.6, 6.45], 0.03, 0.03, 4);
    for (s = -1; s <= 1; s += 2) {
      box(B.hull, X(24.3), X(24.75), s * 5.0 - 0.22, s * 5.0 + 0.22, 4.85, 5.05);
      box(B.hull, X(23.4), X(23.75), s * 5.0 - 0.17, s * 5.0 + 0.17, 4.85, 5.0);
      rail(B, [X(16.9), s * 5.55, 4.85], [X(21.2), s * 5.55, 4.85], 0.95);
    }

    /* --- forecastle [D][P1] --- */
    ak630(B, 34.9);
    /* the tube cluster each side ahead of the bridge (d 31.9) [D][P1]: a base and four tubes */
    for (s = -1; s <= 1; s += 2) {
      var yt = s * 4.65, zt0 = 4.15 + 0.02;
      box(B.hull, X(31.65), X(32.2), yt - 0.28, yt + 0.28, 4.12, zt0 + 0.22);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        var bx = X(31.8 + i * 0.25), by = yt + (j - 0.5) * 0.24;
        cyl(B.metal, [bx, by, zt0 + 0.2], [bx + 0.3, by + s * 0.12, zt0 + 0.95], 0.08, 0.08, 6);
      }
    }
    /* windlass housing, bollards, hatches, anchor pockets, jack staff */
    var zw = zDeck(38.3);
    box(B.hull, X(37.4), X(39.2), -0.9, 0.9, zw, zw + 0.18);
    obox(B.hull, [X(38.3), 0, zw + 0.18], [1, 0, 0], [0, 1, 0], [0, 0, 1], -0.75, 0.75, -0.75, 0.75, 0, 0.14);
    box(B.dark, X(32.9), X(33.6), 2.0, 2.7, zDeck(33.2) - 0.02, zDeck(33.2) + 0.04);
    box(B.dark, X(31.75), X(32.05), -0.15, 0.15, zDeck(31.9) - 0.02, zDeck(31.9) + 0.05);
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) cylZ(B.metal, X(36.0 + j * 0.35), s * 2.3, zDeck(36), zDeck(36) + 0.28, 0.1, 8);
      var ha = tbl(HB, 40.6);
      box(B.dark, X(40.35), X(40.85), s * ha * 0.9 - 0.06, s * ha * 0.9 + 0.06, 2.05, 2.45);
    }
    cyl(B.metal, [X(42.3), 0, zDeck(42.3)], [X(42.3), 0, zDeck(42.3) + 0.9], 0.03, 0.015, 4);

    /* --- aft deck [D]: rails round the sponsons and across the well, the waterjets --- */
    for (s = -1; s <= 1; s += 2) {
      rail(B, [X(2.0), s * 5.75, 3.2], [X(6.55), s * 5.75, 3.2], 0.9);
      rail(B, [X(2.0), s * 3.45, 3.2], [X(4.0), s * 3.45, 3.2], 0.9);
      box(B.dark, X(4.0), X(4.12), -3.3, 3.3, 3.2, 3.3);
      /* two waterjets per demihull [W], nozzles and reversing buckets at the transom [D profile] */
      for (j = -1; j <= 1; j += 2) {
        var yj = s * 4.7 + j * 0.62;
        cyl(B.dark, [X(1.1), yj, -0.7], [X(0.35), yj, -0.66], 0.36, 0.3, 10);
        obox(B.dark, [X(0.35), yj, -0.66], [1, 0, 0], [0, 1, 0], [0, 0, 1], -0.35, 0.0, -0.36, 0.36, -0.45, 0.35);
      }
    }
    rail(B, [X(4.06), -3.3, 3.3], [X(4.06), 3.3, 3.3], 0.8);

    /* --- team: two small strips on up-facing surfaces (the deckhouse roof aft, the main deck) --- */
    var tu = unit([7.5, 0, 1.7]);
    obox(B.team, [X(8.2), 0, roofZ(8.2) + 0.01], tu, [0, 1, 0], cross(tu, [0, 1, 0]), 0, 0.8, -0.8, 0.8, 0, 0.04);
    box(B.team, X(20.0), X(20.7), -0.7, 0.7, 4.85, 4.89);

    flush(THREE, g, B);
    return g;
  }
  return { build: build };
})();

/* Registration: len is the overall length of the Type 022, 42.6 m (published, and the drawing's own
   915 px stem to stern). */
UNIT_MODELS["pla_e00_missileboat"] = {
  len: 42.6,
  build: function (THREE, M, C) { return HeroHoubei.build(THREE, M, C); }
};
