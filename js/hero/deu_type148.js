/* ==================== js/hero/deu_type148.js ===========================
   HERO MODEL -- Type 148 "Tiger"-class fast attack craft (Bundesmarine, 20 boats, CMN Cherbourg and
   Luerssen, 1972-75; the La Combattante IIa design).  Key: deu_e60_missileboat (eras.js "Type 148 Tiger",
   service 1972, e60 only; weapon w_e60_nato_missileboat; generations.js gun row "76mm OTO Melara Compact";
   warship_specs.js row len 47, beam 7, mast "lattice", gunPos "foreaft", launchers "box").  The row is NOT
   turret:true: every gun is baked and nothing is named "turret" (render3d trains a "turret" by
   -(tang - ang), and a row without turret:true never moves tang, so a named mount would swing with every
   turn of the hull; the house convention, as js/hero/pla_houjian.js and pla_houbei.js).
   Other La Combattante rows in js/eras.js: fra_e60_patrol "La Combattante (P730)" is the 1964 French
   prototype patrol boat (45 m, laminated hull, 40 mm and SS.11, a different boat): NOT registered here.
   France commissioned no La Combattante II/III (eras.js says so); no other navy's row names the class.

   PUBLISHED FIGURES: en.wikipedia "Tiger-class fast attack craft" (infobox "after last refit"): 265 t,
   length 47 m, beam 7 m, draught 2.70 m; 4 MTU diesels, 4 shafts; 36 kn; 1 x OTO Melara 76 mm, 1 x Bofors
   L/70 40 mm, 4 x MM38 Exocet; sensors SMA 3RM 20 navigation radar, Triton G surveillance radar, CASTOR II
   fire-control radar.  The brief's figures 47.0 x 7.1 x 2.5 m, about 265 t (the handbook figures, as
   built) are used: beam 7.1 (Wikipedia's "7 m" is the same figure rounded by its convert template),
   draught 2.5 m to the screw tips (the 2.70 m is after the last refit; NOT CONFIRMED which point either
   figure is taken to).  CHECK: [P2] scaled to 47.0 m transom to stem head gives 33.15 px/m and the
   crew members on the forecastle 1.6-1.75 m tall, so the length agrees.
   The brief names a "WM27 fire-control radome" on the bridge.  No photograph shows a radome on a Type 148:
   every one ([P1][P2][P4][P5]) shows an OPEN DISH director on a column over the wheelhouse, ahead of the
   mast, and the published fit is the Thomson-CSF CASTOR (the WM27 radome is the Type 143's).  The
   photographs and the published fit agree, so the dish director is drawn and no radome.

   REFERENCES (Wikimedia Commons, width 960 unless given, in the scratchpad q_type148_ref):
     [P1] "Elster P6154.jpg" (S54 Elster from port, bow left, 1990s fit: the 40 mm in its later cupola).
          Used for the layout check (forward launcher pair side-on, the after pair showing its end faces
          to port, the arched-door box, the 40 mm house) and nothing measured.
     [P2] "German fast attack craft S57 Weihe (P6157) in the Baltic Sea on 28 August 1985.jpg" (2000 px wide):
          the MASTER, broadside from starboard, bow right, the 1985 fit.  1558 px transom (x 42) to stem
          head (x 1600) = 47.0 m, 33.15 px/m; d = metres forward of the transom; heights from the
          waterline traced along the hull (the boat is trimmed or the camera rolled about 20 px over the
          length, so every height is read against the waterline at its own station).
     [P3] "Afterdeck of the German fast attack craft S55 Alk (P6155) in the Baltic Sea on 28 August 1985.jpg":
          from the bridge looking aft along the starboard walkway: the ribbed MM38 containers with their
          framed end doors, their stands, the walkway and lifelines, the locker.
     [P4] "Forecastle of the German fast attack craft S55 Alk (P6155) in the Baltic Sea on 28 August 1985.jpg":
          the wheelhouse front (seven windows), the OTO 76 mm compact gunhouse and its ribbed skirt, the
          director dish, the four-leg lattice mast, its yard and the search antenna on top.
     [P5] "German fast attack craft S55 Alk (P6155) at Olpenitz, Germany, on 28 August 1985.jpg" (1600 px):
          port bow quarter: the hull form and flare, the after launcher pair's end faces, the arched-door
          box and the 40 mm house, the stern lockers, the raft canisters.

   MEASURED AT ONE STATION (ratios, so no scale is needed):
     - wheelhouse width: [P4] the house front is 723 px wide and 550 px tall (deck to roof) on the same
       face; [P2] gives the height 4.2 m (roof 6.4 m, deck 2.2 m), so the width is 5.5 m: half-breadth
       2.75, which leaves 0.8 m walkways inside the 7.1 m beam, as [P4] shows.
     - 76 mm gunhouse width: [P4] 525 px wide and 400 px from its base ring to the crown on its own
       face; [P2] gives 2.2 m ring to crown, so 2.9 m wide, against 3.0 m long in [P2].

   RECOGNITION LIST (each must read at game zoom; where it shows in the model):
     1. The flush-deck hull, freeboard 2.2 m almost all the way (2.38 m at the stem head [P2]), the raked
        stem meeting the waterline at d 46.1, the flared bow [P2][P5]: tables ZD/HD/CH/CZ/KZ, addHull().
     2. The OTO Melara 76/62 Compact on the forecastle, d 33.9 - 36.9, crown 4.9 m, on a ribbed skirt,
        trained ahead, the muzzle at d 40.5 [P2][P4]: oto76().
     3. The wheelhouse d 26.2 - 33.3, deck to 6.4 m, a vertical front with a rounded top edge and seven
        windows high up [P4], the after face raked in two slopes [P2]: prismY in build().
     4. The fire-control director: a column on the wheelhouse roof at d 30.3, a railed platform at 8.6 m,
        the head and the 1.2 m dish at 9.45 m, facing ahead [P2][P4][P5].
     5. The four-leg lattice mast: after legs on the deck at d 24.4, forward legs on the raked after face
        at 4.9 m (d 27.0), platform 12.3 m (d 23.8 - 26.5), the search antenna on top to 13.6 m, the
        topmast to 15.9 m; a yard at 10.4 m; the navigation radar bar at 11.1 m on an arm ahead; a separate
        pole mast just aft at d 23.4 to 15.3 m [P2][P4].
     6. FOUR MM38 CONTAINERS in two pairs, ribbed, elevated 8.5 deg (measured on [P2]), the forward pair
        (d 17.5 - 24) trained to starboard and the after pair (d 10.5 - 16) trained to port: the two pairs
        aim across each other.  [P2] (from starboard) shows the forward pair's end faces, [P1] and [P5] (from
        port) show the after pair's end faces: mm38pair().
     7. The Bofors 40 mm L/70 aft in an enclosed house with an arched roof, d 4.6 - 7.2, crown 5.0 m, the
        barrel trained astern and elevated 27 deg [P2][P1][P5]: bofors40().
     8. The box with arched doors just forward of the 40 mm, d 8.6 - 10.4 [P1][P2][P5].
     9. The stern casing d 0.6 - 10.4 (top 3.25 m) carrying both, raft canisters at d 18 - 19.6 [P2][P5],
        hull exhaust outlets at d 15.4 and 22.5 just over the waterline [P2][P5], the white strip on the
        quarter d 0.3 - 11.2 at 1.35 m [P2][P5].
    10. Paint: Bundesmarine light grey (hull and house sampled off [P2] in shade, the gunhouse and the
        launchers the lightest in [P4]); deck a warm dark grey off [P4] (132,128,117 in sun), all taken to
        about 0.8 for the ACES pass: hull 0x969b9e, guns and containers 0xb0b4b6, deck 0x6c6a62.
   NOT CONFIRMED and drawn only as marked: every half-breadth but the house and gunhouse (no plan view on
   Commons: the 7.1 m beam is held d 8 - 30, the run and entrance estimated from [P5]); the underwater body
   (keel 1.7 m, bilge and sections estimated) and its colour (dark grey; never seen); the four screws
   (published 4 shafts, positions estimated, tips at the published 2.5 m draught; no rudders drawn, none
   seen); the MM38 training angles (15 deg to starboard forward, 30 deg to port aft: the photographs show
   which way each pair faces but not the angle), the container section (1.0 x 0.95 m) and length (5.8 m)
   and their stands; the 40 mm house width (1.8 m) and the arched box width (2.0 m); the casing width
   (4.6 m); the identity of the arched-door box.  Not drawn: flags, the fender at the stem (hung only in
   [P2]), the life rings, the cable reels, the small domes on the mast, whips other than three.
   No pennant numbers, no ensign, no crest (the house front carries one in [P4]: not drawn).
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  Everything baked, one mesh per material.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType148 = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, L = 47.0, X0 = -23.5;
  function X(d) { return X0 + d; }            /* x at d metres forward of the transom */

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

  /* ------------------------------------------------------- FITTINGS KIT
     (detail pass) the small deck fittings every photograph shows and a
     profile drawing leaves out: rails and lifelines, bollards, fairleads,
     hatches, vents, raft canisters, ladders, the anchor in its hawse,
     scuttles, whips, davits and boats.  Each one is emitted as outward-
     wound triangles into a SINK, anything with a tri(a, b, c) method, so it
     merges into the material bins already here and costs no draw call.
     FK.Sink() is a sink of its own whose geo(THREE) gives a flat-shaded
     BufferGeometry for the kit's mesh batches.  All sizes in metres.    */
  var FK = (function () {
    var TW = Math.PI * 2;
    function sb(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function dt(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    function nz(v) { var l = Math.sqrt(dt(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
    function ad(a, b, k) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }
    /* a triangle; with ref given it is turned to face away from ref     */
    function tri(s, a, b, c, ref) {
      var n = cr(sb(b, a), sb(c, a));
      if (dt(n, n) < 1e-14) return;
      if (ref) {
        var m = [(a[0] + b[0] + c[0]) / 3 - ref[0], (a[1] + b[1] + c[1]) / 3 - ref[1], (a[2] + b[2] + c[2]) / 3 - ref[2]];
        if (dt(n, m) < 0) { s.tri(a, c, b); return; }
      }
      s.tri(a, b, c);
    }
    function quad(s, a, b, c, d, ref) { tri(s, a, b, c, ref); tri(s, a, c, d, ref); }
    /* a tube A -> B, radius ra at A and rb at B, n sides, optional caps */
    function tube(s, A, B, ra, rb, n, caps) {
      var d = sb(B, A); if (dt(d, d) < 1e-10) return;
      var ax = nz(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
      var u = nz(cr(ax, t)), v = cr(ax, u), RA = [], RB = [], i, j;
      for (i = 0; i < n; i++) {
        var c = Math.cos(i / n * TW + 0.5), sn = Math.sin(i / n * TW + 0.5);
        var r = [u[0] * c + v[0] * sn, u[1] * c + v[1] * sn, u[2] * c + v[2] * sn];
        RA.push(ad(A, r, ra)); RB.push(ad(B, r, rb));
      }
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        if (ra > 0) tri(s, RA[i], RA[j], RB[j]);
        if (rb > 0) tri(s, RA[i], RB[j], RB[i]);
        if (caps) { if (rb > 0) tri(s, B, RB[i], RB[j]); if (ra > 0) tri(s, A, RA[j], RA[i]); }
      }
    }
    /* an oriented box: centre c, the frame (ex along, ey across, ez up)  */
    function obox(s, c, ex, ey, ez, lx, ly, lz) {
      var V = [], i, F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
      for (i = 0; i < 8; i++) {
        var a = (i & 1 ? 0.5 : -0.5) * lx, b = (i & 2 ? 0.5 : -0.5) * ly, e = (i & 4 ? 0.5 : -0.5) * lz;
        V.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
      }
      F.forEach(function (f) { quad(s, V[f[0]], V[f[1]], V[f[2]], V[f[3]], c); });
    }
    /* a box standing on z0, yawed about Z                               */
    function boxZ(s, x, y, z0, lx, ly, lz, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      obox(s, [x, y, z0 + lz / 2], [c, sn, 0], [-sn, c, 0], [0, 0, 1], lx, ly, lz);
    }
    function cylZ(s, x, y, z0, h, r, n, r2) { tube(s, [x, y, z0], [x, y, z0 + h], r, r2 === undefined ? r : r2, n, true); }
    /* a flat disc (scuttle, port, hawse mouth) facing nrm               */
    function disc(s, c, nrm, r, n) {
      var a = nz(nrm), t = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = nz(cr(a, t)), v = cr(a, u), P = [], i;
      for (i = 0; i < n; i++) P.push(ad(ad(c, u, Math.cos(i / n * TW) * r), v, Math.sin(i / n * TW) * r));
      var back = ad(c, a, -1);
      for (i = 1; i < n - 1; i++) tri(s, P[0], P[i], P[i + 1], back);
    }
    /* guard rail along a polyline of deck points [x, y, z]: stanchions
       every `step`, a top rail at h and a lifeline at h / 2              */
    function rail(s, pts, h, step, rp) {
      var i, k, carry = 0; rp = rp || 0.024; h = h || 1.0; step = step || 1.5;
      function post(p) { tube(s, p, [p[0], p[1], p[2] + h], rp, rp, 4, false); }
      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], d = sb(b, a), L = Math.sqrt(dt(d, d));
        if (L < 1e-3) continue;
        tube(s, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], rp * 0.8, rp * 0.8, 3, false);
        tube(s, [a[0], a[1], a[2] + h * 0.5], [b[0], b[1], b[2] + h * 0.5], rp * 0.55, rp * 0.55, 3, false);
        for (k = carry; k < L; k += step) post(ad(a, d, k / L));
        carry = k - L;
      }
      post(pts[pts.length - 1]);
    }
    /* a toe-rail / deck-edge gutter: a low bar along the deck edge       */
    function toe(s, pts, r) {
      for (var i = 0; i < pts.length - 1; i++) tube(s, pts[i], pts[i + 1], r || 0.04, r || 0.04, 3, false);
    }
    /* double bollard on its base plate, k = scale (1 = a 1.2 m frigate pair) */
    function bollard(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, 0.9 * k, 0.36 * k, 0.05 * k, yaw);
      [-1, 1].forEach(function (e) {
        var px = x + c * e * 0.26 * k, py = y + sn * e * 0.26 * k;
        cylZ(s, px, py, z + 0.05 * k, 0.36 * k, 0.12 * k, 8);
        cylZ(s, px, py, z + 0.41 * k, 0.05 * k, 0.15 * k, 8);
      });
    }
    function cleat(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.09 * k, y + sn * e * 0.09 * k, z, 0.1 * k, 0.035 * k, 4); });
      boxZ(s, x, y, z + 0.1 * k, 0.42 * k, 0.07 * k, 0.05 * k, yaw);
    }
    /* a roller fairlead at the deck edge, yaw = the line of the edge     */
    function fairlead(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, 0.8 * k, 0.32 * k, 0.07 * k, yaw);
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.22 * k, y + sn * e * 0.22 * k, z + 0.07 * k, 0.26 * k, 0.09 * k, 8); });
    }
    /* a deck hatch: coaming, lid, hinge bar and dogs                     */
    function hatch(s, x, y, z, lx, ly, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, lx, ly, 0.10, yaw);
      boxZ(s, x, y, z + 0.10, lx - 0.08, ly - 0.08, 0.04, yaw);
      var hx = x - c * lx * 0.5, hy = y - sn * lx * 0.5;
      tube(s, [hx + sn * ly * 0.4, hy - c * ly * 0.4, z + 0.12], [hx - sn * ly * 0.4, hy + c * ly * 0.4, z + 0.12], 0.035, 0.035, 4, true);
      [-1, 1].forEach(function (e) {
        boxZ(s, x + c * lx * 0.5 - sn * e * ly * 0.3, y + sn * lx * 0.5 + c * e * ly * 0.3, z + 0.03, 0.08, 0.06, 0.1, yaw);
      });
    }
    /* a mushroom vent and a gooseneck vent                               */
    function mushroom(s, x, y, z, r, h) {
      cylZ(s, x, y, z, h, r, 8);
      cylZ(s, x, y, z + h, r * 0.5, r * 1.7, 8, r * 0.6);
    }
    function goose(s, x, y, z, r, h, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      tube(s, [x, y, z], [x, y, z + h], r, r, 6, false);
      tube(s, [x, y, z + h - r], [x + c * r * 2.4, y + sn * r * 2.4, z + h - r * 2.2], r * 1.05, r * 1.15, 6, true);
    }
    /* a life-raft canister on its cradle, axis along yaw: shell to sW,
       the cradle and bands to sM                                         */
    function raft(sW, sM, x, y, z, yaw, L, r) {
      L = L || 1.25; r = r || 0.32;
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), zc = z + r + 0.08;
      tube(sW, [x - c * L / 2, y - sn * L / 2, zc], [x + c * L / 2, y + sn * L / 2, zc], r, r, 10, true);
      [-0.3, 0.3].forEach(function (f) {
        var px = x + c * L * f, py = y + sn * L * f;
        tube(sM, [px - c * 0.04, py - sn * 0.04, zc], [px + c * 0.04, py + sn * 0.04, zc], r * 1.06, r * 1.06, 10, false);
        boxZ(sM, px, py, z, 0.1, r * 1.8, 0.22, yaw);
      });
    }
    /* an inclined or vertical ladder from foot A to head B; side = the
       horizontal unit vector across it                                  */
    function ladder(s, A, B, side, w, step) {
      w = (w || 0.5) / 2; step = step || 0.3;
      var e = [side[0] * w, side[1] * w, 0], d = sb(B, A), L = Math.sqrt(dt(d, d)), n = Math.max(1, Math.floor(L / step)), i;
      tube(s, ad(A, e, 1), ad(B, e, 1), 0.025, 0.025, 4, false);
      tube(s, ad(A, e, -1), ad(B, e, -1), 0.025, 0.025, 4, false);
      for (i = 1; i <= n; i++) { var p = ad(A, d, i / (n + 0.5)); tube(s, ad(p, e, 1), ad(p, e, -1), 0.016, 0.016, 3, false); }
    }
    /* a stockless anchor stowed in its hawse on a hull side; (x, y, z) the
       hawse mouth on the plating, out = outward unit normal [nx, ny, nz] */
    function anchor(s, x, y, z, out, k) {
      k = k || 1;
      var o = nz(out), ez = [0, 0, 1], ex = nz(cr(ez, o)), p = ad([x, y, z], o, 0.10 * k);
      tube(s, [x, y, z], ad([x, y, z], o, 0.14 * k), 0.30 * k, 0.34 * k, 10, true);       /* hawse lip */
      obox(s, ad(p, ez, -0.62 * k), ex, o, ez, 0.17 * k, 0.12 * k, 1.0 * k);             /* shank     */
      obox(s, ad(p, ez, -1.12 * k), ex, o, ez, 0.75 * k, 0.16 * k, 0.16 * k);            /* crown     */
      [-1, 1].forEach(function (e) {
        tube(s, ad(ad(p, ez, -1.12 * k), ex, e * 0.36 * k), ad(ad(p, ez, -0.72 * k), ex, e * 0.24 * k), 0.09 * k, 0.04 * k, 4, true);
      });
    }
    /* a whip aerial, tapering, with a small base insulator               */
    function whip(s, x, y, z, h, r) {
      r = r || 0.03;
      cylZ(s, x, y, z, 0.3, r * 2.5, 6);
      tube(s, [x, y, z + 0.3], [x, y, z + h], r, r * 0.3, 4, false);
    }
    /* a boat davit: post, curved arm reaching out along yaw, the fall    */
    function davit(s, x, y, z, yaw, h, reach) {
      var c = Math.cos(yaw), sn = Math.sin(yaw), t = [x, y, z + h], e = [x + c * reach, y + sn * reach, z + h - 0.2];
      tube(s, [x, y, z], t, 0.07, 0.06, 6, false);
      tube(s, t, [x + c * reach * 0.55, y + sn * reach * 0.55, z + h + 0.2], 0.06, 0.05, 6, false);
      tube(s, [x + c * reach * 0.55, y + sn * reach * 0.55, z + h + 0.2], e, 0.05, 0.045, 6, true);
      tube(s, e, [e[0], e[1], e[2] - 0.9], 0.012, 0.012, 3, false);
    }
    /* a rigid-hull inflatable: grey sponson tubes to sT, floor/console to sH */
    function rib(sT, sH, x, y, z, yaw, L, B) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), r = B * 0.2;
      function P(a, b, h) { return [x + c * a - sn * b, y + sn * a + c * b, z + h]; }
      [-1, 1].forEach(function (e) {
        tube(sT, P(-L / 2, e * (B / 2 - r), r), P(L * 0.22, e * (B / 2 - r), r), r, r, 7, true);
        tube(sT, P(L * 0.22, e * (B / 2 - r), r), P(L / 2, e * r * 0.3, r * 1.4), r, r * 0.6, 7, true);
      });
      obox(sH, P(-L * 0.04, 0, r * 0.5), [c, sn, 0], [-sn, c, 0], [0, 0, 1], L * 0.86, B - 2 * r, r * 0.9);
      boxZ(sH, x - c * L * 0.08, y - sn * L * 0.08, z + r, L * 0.16, B * 0.35, r * 2.2, yaw);
    }
    /* a sink of the kit's own                                            */
    function Sink() { this.p = []; }
    Sink.prototype.tri = function (a, b, c) { this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); };
    Sink.prototype.geo = function (THREE, tile) {
      if (!this.p.length) return null;
      var P = this.p, U = [], i, q = 1 / (tile || 4);
      for (i = 0; i < P.length; i += 9) {
        var n = cr(sb([P[i + 3], P[i + 4], P[i + 5]], [P[i], P[i + 1], P[i + 2]]), sb([P[i + 6], P[i + 7], P[i + 8]], [P[i], P[i + 1], P[i + 2]]));
        var ax = Math.abs(n[0]), ay = Math.abs(n[1]), az = Math.abs(n[2]);
        for (var k = 0; k < 9; k += 3) {
          if (az >= ax && az >= ay) U.push(P[i + k] * q, P[i + k + 1] * q);
          else if (ay >= ax) U.push(P[i + k] * q, P[i + k + 2] * q);
          else U.push(P[i + k + 1] * q, P[i + k + 2] * q);
        }
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
      g.computeVertexNormals();
      return g;
    };
    /* weathering laid over a painted canvas: rust runs from fittings,
       salt bloom, grime patches, drips.  w x h the canvas, n the density */
    function weather(g, w, h, seed, n, strength) {
      var s = (seed >>> 0) || 11, i, a = strength || 1;
      function R() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
      n = n || 30;
      for (i = 0; i < n; i++) {
        var x = R() * w, y = R() * h, l = h * (0.05 + R() * 0.22), gr = g.createLinearGradient(0, y, 0, y + l);
        gr.addColorStop(0, "rgba(92,52,30," + (0.30 * a).toFixed(3) + ")"); gr.addColorStop(1, "rgba(92,52,30,0)");
        g.fillStyle = gr; g.fillRect(x, y, 1 + R() * 2.2, l);
      }
      for (i = 0; i < n * 0.6; i++) {
        var x2 = R() * w, y2 = R() * h, l2 = h * (0.04 + R() * 0.14), g2 = g.createLinearGradient(0, y2, 0, y2 + l2);
        g2.addColorStop(0, "rgba(20,22,24," + (0.22 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(20,22,24,0)");
        g.fillStyle = g2; g.fillRect(x2, y2, 1 + R() * 3, l2);
      }
      g.fillStyle = "#ffffff";
      for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.04 * a; g.fillRect(R() * w, R() * h, w * (0.03 + R() * 0.08), h * (0.02 + R() * 0.06)); }
      g.fillStyle = "#1a1c1e";
      for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.05 * a; g.fillRect(R() * w, R() * h, w * (0.04 + R() * 0.1), h * (0.01 + R() * 0.04)); }
      g.globalAlpha = 1;
    }
    return { tri: tri, quad: quad, tube: tube, obox: obox, boxZ: boxZ, cylZ: cylZ, disc: disc, rail: rail, toe: toe,
             bollard: bollard, cleat: cleat, fairlead: fairlead, hatch: hatch, mushroom: mushroom, goose: goose,
             raft: raft, ladder: ladder, anchor: anchor, whip: whip, davit: davit, rib: rib, Sink: Sink, weather: weather };
  })();

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

  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }

  /* ------------------------------------------------------------ paint: plate with faint seams (Bundesmarine light grey
     is applied as the material colour; the canvas only adds plating and weathering) */
  function drawPlate(g, S) {
    var R = rng(148), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#7c8488" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 8; k++) {
      var y = Math.round(k * 2 * m);
      g.fillStyle = "rgba(70,80,86,0.22)"; g.fillRect(0, y, S, 1.5);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 4 + (k % 2) * 2) % 16) * m); g.fillStyle = "rgba(70,80,86,0.18)"; g.fillRect(x, y, 1.5, 2 * m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
    /* detail pass: weld lines between the strakes, rust runs and grime */
    g.fillStyle = "rgba(40,46,50,0.16)";
    for (k = 0; k < 16; k++) for (i = 0; i < 64; i++) g.fillRect(i * m / 4 + 1, Math.round(k * m) + 2, 1, 1);
    FK.weather(g, S, S, 1481, 40, 0.8);
  }
  function drawDeck(g, S) {
    var R = rng(1480), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(30,34,36,0.28)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    g.globalAlpha = 1;
    FK.weather(g, S, S, 1482, 18, 0.6);
  }

  function materials(THREE, C) {
    var plate = canvasTex(THREE, "type148Plate", drawPlate), deckT = canvasTex(THREE, "type148Deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x969b9e, 0.8, 0.08, plate),       /* hull and superstructure, Bundesmarine light grey (item 10) */
      lt: mk(0xb0b4b6, 0.78, 0.08, plate),        /* gunhouses and the MM38 containers, the lightest [P4] */
      deck: mk(0x6c6a62, 0.92, 0.04, deckT),      /* weather deck [P4] */
      boot: mk(0x3c3f40, 0.86, 0.04),             /* underbody (colour NOT CONFIRMED, never seen) */
      dark: mk(0x23282b, 0.75, 0.3),              /* outlets, doors, gun ports, slots */
      metal: mk(0x4e555a, 0.5, 0.55),             /* rails, barrels, mast lattice, screws */
      glass: mk(0x141c22, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ hull station tables, d from the transom.
     ZD deck-edge z and the stem line read off [P2] (33.15 px/m, each height against the waterline at its
     own station: 73 px aft, 72 px at d 33, 73 px at d 42.5, 78 px at the stem head); the stem raked from
     the waterline at d 46.1 to the stem head at 47.0 [P2].  HD deck half-breadth, CH / CZ the turn of the
     bilge, KZ keel: NOT CONFIRMED (no plan view or body plan), held to the published 7.1 m beam. */
  var ZD = [[0, 2.2], [33, 2.17], [40, 2.2], [44, 2.27], [47, 2.38]];
  var HD = [[0, 3.3], [3, 3.45], [8, 3.55], [30, 3.55], [34, 3.42], [37, 3.15], [40, 2.7], [42.5, 2.1], [44.5, 1.45],
            [46, 0.75], [46.7, 0.3], [47, 0.03]];
  var CH = [[0, 3.1], [8, 3.3], [30, 3.3], [34, 3.0], [38, 2.3], [41, 1.5], [43.5, 0.8], [45.5, 0.3], [47, 0.01]];
  var CZ = [[0, -0.55], [8, -0.95], [30, -1.0], [34, -0.85], [38, -0.45], [41, 0.0], [43.5, 0.6], [45.5, 1.3], [47, 2.38]];
  var KZ = [[0, -0.75], [2, -1.1], [6, -1.45], [10, -1.7], [30, -1.7], [34, -1.55], [38, -1.15], [41, -0.65], [44, -0.2],
            [46.1, 0.0], [46.5, 0.85], [46.8, 1.65], [47, 2.38]];
  function zD(d) { return tbl(ZD, d); }
  function hD(d) { return tbl(HD, d); }
  /* one half section, deck edge to keel (deck edge, flare, bilge, bottom, keel); a waterline point is
     inserted so the underbody colour starts at z = 0 */
  function half(d) {
    var zd = zD(d), hd = hD(d), hc = Math.min(tbl(CH, d), hd), zc = tbl(CZ, d), kz = tbl(KZ, d);
    if (zc < kz + 0.02) zc = kz + 0.02;
    if (zc > zd - 0.05) zc = zd - 0.05;
    var fw = Math.max(0, Math.min(1, (d - 34) / 10));                        /* flare forward [P5] */
    var P = [[hd, zd], [lerp(hc, hd, 0.75) - 0.3 * fw, lerp(zc, zd, 0.5)], [hc, zc],
             [hc * 0.55, lerp(kz, zc, 0.45) - 0.06 * Math.min(1, hc / 3)], [0.0, kz]];
    var out = [], i;
    for (i = 0; i < P.length; i++) {
      out.push(P[i]);
      if (i + 1 < P.length && P[i][1] > 0 && P[i + 1][1] <= 0 && out.length < 6) {
        var t = P[i][1] / (P[i][1] - P[i + 1][1]);
        out.push([lerp(P[i][0], P[i + 1][0], t), 0]);
      }
    }
    while (out.length < 6) out.push(out[out.length - 1].slice());
    return out;
  }
  function addHull(B) {
    var ds = [0, 0.5, 1.5, 3, 5, 8, 11, 14, 18, 22, 26, 30, 32, 34, 36, 38, 40, 41, 42, 43, 44, 44.8, 45.5, 46.1,
              46.5, 46.8, 47.0], i, k;
    var H = ds.map(half);
    function bin(a, b, c) { return (a[2] + b[2] + c[2]) / 3 < -0.005 ? B.boot : B.hull; }
    for (i = 0; i + 1 < ds.length; i++) {
      var xa = X(ds[i]), xb = X(ds[i + 1]), A = H[i], Bq = H[i + 1], s;
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < 6; k++) {
        var p = [xa, s * A[k][0], A[k][1]], q = [xa, s * A[k + 1][0], A[k + 1][1]],
            r = [xb, s * Bq[k + 1][0], Bq[k + 1][1]], t = [xb, s * Bq[k][0], Bq[k][1]];
        var tris = s > 0 ? [[p, r, q], [p, t, r]] : [[p, q, r], [p, r, t]];
        tris.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-12) bin(T[0], T[1], T[2]).tri(T[0], T[1], T[2]);
        });
      }
      /* the deck, cambered 8 cm */
      var cA = zD(ds[i]) + 0.08 * Math.min(1, A[0][0] / 2), cB = zD(ds[i + 1]) + 0.08 * Math.min(1, Bq[0][0] / 2);
      for (s = -1; s <= 1; s += 2) {
        var e0 = [xa, s * A[0][0], A[0][1]], e1 = [xb, s * Bq[0][0], Bq[0][1]], m0 = [xa, 0, cA], m1 = [xb, 0, cB];
        var D = s > 0 ? [[e0, m1, e1], [e0, m0, m1]] : [[e0, e1, m1], [e0, m1, m0]];
        D.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-12) B.deck.tri(T[0], T[1], T[2]);
        });
      }
    }
    /* transom: the d 0 section closed as one polygon, fanned from its centroid, every triangle facing aft */
    var T0 = H[0], x0 = X(0), poly = [], zc = 0;
    for (k = 0; k < 6; k++) poly.push([x0, T0[k][0], T0[k][1]]);
    for (k = 4; k >= 1; k--) poly.push([x0, -T0[k][0], T0[k][1]]);
    poly.push([x0, -T0[0][0], T0[0][1]]);
    for (k = 0; k < poly.length; k++) zc += poly[k][2] / poly.length;
    var ctr = [x0, 0, zc];
    for (k = 0; k < poly.length; k++) {
      var a = poly[k], b = poly[(k + 1) % poly.length], cc = cross(sub(a, ctr), sub(b, ctr));
      if (dot(cc, cc) < 1e-12) continue;
      var bn = (a[2] + b[2] + ctr[2]) / 3 < -0.005 ? B.boot : B.hull;
      if (cc[0] < 0) bn.tri(ctr, a, b); else bn.tri(ctr, b, a);
    }
    /* the white strip on each quarter, d 0.3 - 11.2 at 1.35 m [P2][P5] (unidentified, perhaps a spray
       deflector), tapering out forward */
    var s3, d;
    for (s3 = -1; s3 <= 1; s3 += 2) {
      var rr = [];
      for (d = 0.3; d <= 11.21; d += 1.0) {
        var dd = Math.min(d, 11.2), w = 0.14 * (1 - Math.max(0, (dd - 8) / 3.2)) + 0.01;
        var sec = half(dd), y0 = s3 * (lerp(sec[1][0], sec[0][0], (1.35 - sec[1][1]) / (sec[0][1] - sec[1][1])) - 0.02), z0 = 1.3;
        rr.push([[X(dd), y0, z0], [X(dd), y0 + s3 * w, z0], [X(dd), y0 + s3 * w, z0 + 0.09], [X(dd), y0, z0 + 0.09]]);
      }
      loft(B.lt, rr);
    }
  }

  /* lifelines along the deck edge, stanchions ~1.3 m apart, two wires [P2][P3][P4] */
  function rails(B, da, db, inset, h) {
    var s, d, hh = h || 0.95;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.3) {
        var dn = Math.min(d + 1.3, db), y0 = s * Math.max(0.3, hD(d) - inset), y1 = s * Math.max(0.3, hD(dn) - inset);
        cyl(B.metal, [X(d), y0, zD(d) + hh], [X(dn), y1, zD(dn) + hh], 0.02, 0.02, 4);
        cyl(B.metal, [X(d), y0, zD(d) + hh * 0.5], [X(dn), y1, zD(dn) + hh * 0.5], 0.013, 0.013, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, zD(d), zD(d) + hh);
      }
      box(B.metal, X(db) - 0.022, X(db) + 0.022, s * Math.max(0.3, hD(db) - inset) - 0.022, s * Math.max(0.3, hD(db) - inset) + 0.022, zD(db), zD(db) + hh);
    }
  }

  /* ------------------------------------------------------------ OTO Melara 76/62 Compact [P2][P4]: the
     gunhouse a loaf 3.0 m long and 2.9 m wide with near-vertical sides and a rounded crown (2.2 m over
     the ring), on a ring and a ribbed conical skirt; the barrel out of a vertical slot in the front,
     trained ahead and elevated 3 deg, the muzzle at d 40.5 [P2] */
  function oto76(B, d0, d1) {
    var zb = zD((d0 + d1) / 2), zr = zb + 0.5, zt = zr + 2.2, xm = X((d0 + d1) / 2), k;
    cyl(B.hull, [xm, 0, zb], [xm, 0, zb + 0.32], 1.75, 1.45, 24);                 /* skirt [P4] */
    for (k = 0; k < 16; k++) {                                                  /* its ribs [P4] */
      var a = k / 16 * TAU, ca = Math.cos(a), sa = Math.sin(a);
      obox(B.dark, [xm, 0, zb], [ca, sa, 0], [-sa, ca, 0], [0, 0, 1], 1.42, 1.78, -0.03, 0.03, 0.0, 0.3);
    }
    cylZ(B.lt, xm, 0, zb + 0.32, zr, 1.5, 24);                                   /* base ring */
    /* the side profile is rounded fore and aft as well as across [P2]: an elliptic crown over 1.2 m of
       straight wall, the plan narrowing to 0.6 at the ends */
    var as = [0, 0.03, 0.08, 0.16, 0.3, 0.5, 0.7, 0.84, 0.92, 0.97, 1.0];
    var rings = as.map(function (a) {
      var e = Math.sqrt(Math.max(0, 1 - Math.pow(2 * a - 1, 2))), x = X(lerp(d0, d1, a)), w = 1.45 * (0.6 + 0.4 * e),
          top = zr + 1.2 + 1.0 * e, z0 = zr, r = Math.min(0.9, w * 0.62, top - z0 - 0.05), P = [], q, t;
      P.push([x, -w, z0], [x, w, z0]);
      for (q = 0; q <= 4; q++) { t = q / 4 * PI / 2; P.push([x, w - r * (1 - Math.cos(t)), top - r * (1 - Math.sin(t))]); }
      for (q = 0; q <= 4; q++) { t = q / 4 * PI / 2; P.push([x, -w + r * (1 - Math.sin(t)), top - r * (1 - Math.cos(t))]); }
      return P;
    });
    loft(B.lt, rings);
    /* the slot in the front [P4], the barrel and its muzzle brake [P2][P4] */
    var zg = zr + 1.55;
    box(B.dark, X(d1) - 0.45, X(d1) - 0.05, -0.38, 0.38, zr + 0.2, zt - 0.5);
    var el = 3 * PI / 180, ce = Math.cos(el), se = Math.sin(el), x1 = X(d1) - 0.3;
    cyl(B.metal, [x1, 0, zg], [x1 + 0.9 * ce, 0, zg + 0.9 * se], 0.2, 0.2, 10);                   /* jacket */
    cyl(B.metal, [x1 + 0.9 * ce, 0, zg + 0.9 * se], [x1 + 3.5 * ce, 0, zg + 3.5 * se], 0.1, 0.085, 8);
    cyl(B.metal, [x1 + 3.5 * ce, 0, zg + 3.5 * se], [x1 + 3.75 * ce, 0, zg + 3.75 * se], 0.13, 0.13, 8);   /* brake */
  }

  /* ------------------------------------------------------------ Bofors 40 mm L/70 [P2][P1][P5]: an enclosed
     house with an arched roof, a door in its forward face, the barrel out of the after end trained astern
     and elevated 27 deg (muzzle at d 2.9, 6.2 m [P2]); d0..d1 its length, zb its base */
  function bofors40(B, d0, d1, zb) {
    var hw = 0.9, zs = zb + 0.85, rings = [], k, t;
    function sec(d) {
      var P = [[X(d), -hw, zb], [X(d), hw, zb]];
      for (k = 0; k <= 8; k++) { t = k / 8 * PI; P.push([X(d), hw * Math.cos(t), zs + hw * Math.sin(t)]); }
      return P;
    }
    rings.push(sec(d0), sec(d1));
    loft(B.lt, rings);
    box(B.dark, X(d1) - 0.02, X(d1) + 0.03, -0.35, 0.35, zb + 0.1, zb + 1.5);           /* door [P5] */
    box(B.dark, X(d0) - 0.03, X(d0) + 0.02, -0.25, 0.25, zs - 0.1, zs + 0.75);          /* barrel slot */
    var el = 27 * PI / 180, ce = Math.cos(el), se = Math.sin(el), P0 = [X(d0) + 0.6, 0, zs + 0.3];
    cyl(B.metal, P0, [P0[0] - 0.8 * ce, 0, P0[2] + 0.8 * se], 0.13, 0.12, 8);
    cyl(B.metal, [P0[0] - 0.8 * ce, 0, P0[2] + 0.8 * se], [P0[0] - 2.95 * ce, 0, P0[2] + 2.95 * se], 0.06, 0.055, 7);
    cyl(B.metal, [P0[0] - 2.95 * ce, 0, P0[2] + 2.95 * se], [P0[0] - 3.3 * ce, 0, P0[2] + 3.3 * se], 0.09, 0.075, 7);  /* flash hider */
  }

  /* ------------------------------------------------------------ one pair of MM38 containers [P2][P3][P5]:
     two ribbed boxes side by side, elevated 8.5 deg (measured [P2]) and trained tr (rad, + to port; NOT
     CONFIRMED), the pair centred at (dc, 0); each box 5.8 x 1.0 x 0.95 m (NOT CONFIRMED), its after end
     at z zA; a framed end door at each end [P3][P5]; legs and a low stand under it [P2][P5]. */
  function mm38pair(B, dc, zA, tr) {
    var el = 8.5 * PI / 180, ce = Math.cos(el), se = Math.sin(el), ct = Math.cos(tr), st = Math.sin(tr);
    var LB = 5.8, WB = 1.0, HB = 0.95, k, j, s;
    var u = [ce * ct, ce * st, se], v = [-st, ct, 0], w = cross(u, v);
    box(B.hull, X(dc - 2.0), X(dc + 2.0), -1.0, 1.0, zD(dc), zA - 0.15);              /* the stand */
    for (s = -1; s <= 1; s += 2) {
      var O = [X(dc) - u[0] * LB / 2 + v[0] * s * 0.55, v[1] * s * 0.55 - u[1] * LB / 2, zA];
      obox(B.lt, O, u, v, w, 0, LB, -WB / 2, WB / 2, 0, HB);
      for (k = 0; k < 12; k++) {                                                  /* the ribs [P2][P3] */
        var a = 0.45 + k * (LB - 0.9) / 11;
        obox(B.hull, O, u, v, w, a - 0.05, a + 0.05, -WB / 2 - 0.035, WB / 2 + 0.035, -0.03, HB + 0.035);
      }
      for (j = 0; j < 2; j++) {                                                   /* end door frames */
        var e = j ? LB : 0, sg = j ? 1 : -1;
        obox(B.lt, O, u, v, w, e - (j ? 0.02 : 0.1) + (j ? 0 : 0), e + (j ? 0.1 : 0.02), -WB / 2 - 0.06, WB / 2 + 0.06, -0.06, HB + 0.06);
        obox(B.dark, O, u, v, w, e + sg * 0.1, e + sg * 0.12, -WB / 2 + 0.15, WB / 2 - 0.15, 0.15, HB - 0.15);
      }
      /* legs: two under the forward end, down to the stand [P5] */
      [0.6, LB - 0.8].forEach(function (a) {
        for (var q = -1; q <= 1; q += 2) {
          var p = add(add(O, mul(u, a)), mul(v, q * 0.35));
          if (p[2] > zA - 0.15 + 0.05) box(B.metal, p[0] - 0.06, p[0] + 0.06, p[1] - 0.06, p[1] + 0.06, zA - 0.16, p[2] + 0.02);
        }
      });
    }
  }

  /* ------------------------------------------------------------ the boat */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var B = {};
    ["hull", "lt", "deck", "boot", "dark", "metal", "glass", "team"].forEach(function (n) { B[n] = new Bin(T[n]); });
    var s, i, j, k;
    addHull(B);

    /* --- the wheelhouse [P2][P4]: d 26.2 (deck) - 33.3, deck to 6.4 m, vertical front with a rounded top
       edge, the after face raked from the deck at d 26.2 to 4.9 m at d 27.0, then to the roof at d 28.5;
       half-breadth 2.75 (measured, see the header) --- */
    prismY(B.hull, [[26.2, 2.1], [33.3, 2.1], [33.3, 5.85], [33.15, 6.15], [32.85, 6.34], [32.5, 6.4], [28.5, 6.4], [27.0, 4.9]],
           function () { return 2.75; });
    /* seven windows high on the front [P4], two on each side at the front [P5], a porthole [P2] */
    for (k = -3; k <= 3; k++) box(B.glass, X(33.3) - 0.02, X(33.3) + 0.04, k * 0.7 - 0.25, k * 0.7 + 0.25, 5.64, 6.12);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) box(B.glass, X(31.8 + k * 0.7), X(32.3 + k * 0.7), s * 2.75 - 0.04, s * 2.75 + 0.02 * s + 0.02, 5.64, 6.12);
      cylY(B.dark, X(32.5), s * 2.74, s * 2.79, 3.9, 0.16, 10);
    }
    box(B.dark, X(28.0), X(28.8), 2.72, 2.78, 2.3, 4.2);                                       /* door, port side [P5] */
    /* the open bridge on the roof: a screen and rail round it [P4] */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(28.6), s * 2.6, 7.4], [X(32.4), s * 2.6, 7.4], 0.025, 0.025, 4);
      for (k = 0; k < 4; k++) box(B.metal, X(28.6 + k * 1.25) - 0.02, X(28.6 + k * 1.25) + 0.02, s * 2.6 - 0.02, s * 2.6 + 0.02, 6.4, 7.4);
    }
    pane(B.glass, [X(32.6), -2.4, 6.4], [X(32.6), 2.4, 6.4], [X(32.45), 2.4, 6.95], [X(32.45), -2.4, 6.95], [X(40), 0, 6.7]);
    box(B.metal, X(32.42), X(32.62), -2.45, 2.45, 6.93, 6.99);

    /* --- fire-control director [P2][P4][P5]: column at d 30.3, railed platform at 8.6 m, head and dish --- */
    var xd = X(30.3);
    cyl(B.hull, [xd, 0, 6.38], [xd, 0, 8.6], 0.32, 0.22, 12);
    cylZ(B.hull, xd, 0, 8.55, 8.62, 0.6, 14);
    for (k = 0; k < 8; k++) {
      var a0 = k / 8 * TAU, a1 = (k + 1) / 8 * TAU;
      cyl(B.metal, [xd + 0.58 * Math.cos(a0), 0.58 * Math.sin(a0), 9.25], [xd + 0.58 * Math.cos(a1), 0.58 * Math.sin(a1), 9.25], 0.015, 0.015, 3);
      box(B.metal, xd + 0.58 * Math.cos(a0) - 0.015, xd + 0.58 * Math.cos(a0) + 0.015, 0.58 * Math.sin(a0) - 0.015, 0.58 * Math.sin(a0) + 0.015, 8.62, 9.25);
    }
    box(B.hull, xd - 0.35, xd + 0.35, -0.3, 0.3, 8.62, 9.7);
    cyl(B.lt, [xd + 0.55, 0, 9.45], [xd + 0.75, 0, 9.45], 0.6, 0.48, 18);                /* the dish, ahead */
    cyl(B.metal, [xd + 0.35, 0, 9.45], [xd + 0.55, 0, 9.45], 0.08, 0.08, 6);
    cyl(B.metal, [xd, 0, 9.7], [xd, 0, 14.0], 0.03, 0.012, 4);                            /* whip [P2] */

    /* --- lattice mast [P2][P4]: after legs on the deck at d 24.4, forward legs on the raked after face at
       d 27.0 / 4.9 m, all to a square at 12.3 m (d 24.4 - 25.6) --- */
    (function () {
      var feet = [[24.4, 1.0, 2.2], [24.4, -1.0, 2.2], [27.0, -1.0, 4.9], [27.0, 1.0, 4.9]];
      var top = [[24.4, 0.45], [24.4, -0.45], [25.6, -0.45], [25.6, 0.45]], ZT = 12.3, lg, h;
      function legAt(i, z) {
        var f = feet[i], t = (z - f[2]) / (ZT - f[2]);
        return [X(lerp(f[0], top[i][0], t)), lerp(f[1], top[i][1], t), z];
      }
      for (lg = 0; lg < 4; lg++) cyl(B.metal, [X(feet[lg][0]), feet[lg][1], feet[lg][2]], [X(top[lg][0]), top[lg][1], ZT], 0.065, 0.045, 5);
      var lev = [5.2, 6.9, 8.5, 10.0, 11.2, ZT];
      for (h = 0; h < lev.length; h++) for (lg = 0; lg < 4; lg++) {
        var n = (lg + 1) % 4, a = legAt(lg, lev[h]), b = legAt(n, lev[h]);
        cyl(B.metal, a, b, 0.028, 0.028, 4);
        if (h > 0) cyl(B.metal, legAt(lg, lev[h - 1]), b, 0.02, 0.02, 3);
      }
      for (lg = 0; lg < 2; lg++) cyl(B.metal, legAt(lg, 2.2), legAt(lg + 0, 5.2), 0.02, 0.02, 3);
      cyl(B.metal, legAt(0, 3.7), legAt(1, 3.7), 0.028, 0.028, 4);
      /* platform at 12.3 m (d 23.8 - 26.5) with a rail, the search antenna on its pedestal, the topmast */
      box(B.deck, X(23.8), X(26.5), -1.0, 1.0, ZT, ZT + 0.07);
      for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(23.8), s * 1.0, ZT + 0.55], [X(26.5), s * 1.0, ZT + 0.55], 0.015, 0.015, 3);
      cylZ(B.metal, X(25.8), 0, ZT + 0.07, 13.0, 0.12, 8);
      /* the search reflector: a curved shell 2.2 m x 0.6 m facing ahead [P2][P4] */
      for (k = 0; k < 6; k++) {
        var f0 = (k / 6 - 0.5) * 1.1, f1 = ((k + 1) / 6 - 0.5) * 1.1, R = 2.0, xm = X(25.6);
        var y0 = R * Math.sin(f0), y1 = R * Math.sin(f1), x0 = xm + R * (1 - Math.cos(f0)), x1 = xm + R * (1 - Math.cos(f1));
        hexa(B.lt, [[x0, y0, 13.0], [x1, y1, 13.0], [x1 + 0.05, y1, 13.0], [x0 + 0.05, y0, 13.0],
                    [x0, y0, 13.6], [x1, y1, 13.6], [x1 + 0.05, y1, 13.6], [x0 + 0.05, y0, 13.6]]);
      }
      cyl(B.metal, [X(24.2), 0, ZT], [X(24.2), 0, 15.9], 0.05, 0.025, 5);                  /* topmast */
      cylZ(B.lt, X(24.2), 0, 15.75, 15.95, 0.07, 6);                                        /* masthead light */
      /* yard athwartships at 10.4 m [P4], the arm ahead and the navigation radar bar at 11.1 m [P2] */
      cyl(B.metal, [X(24.9), -2.2, 10.4], [X(24.9), 2.2, 10.4], 0.035, 0.035, 4);
      cyl(B.metal, [X(25.4), 0, 10.6], [X(27.4), 0, 10.6], 0.035, 0.035, 4);
      cylZ(B.lt, X(27.4), 0, 10.6, 10.95, 0.13, 8);
      box(B.dark, X(26.45), X(28.35), -0.07, 0.07, 10.95, 11.17);
    })();
    /* the separate pole mast just aft, d 23.4, deck to 15.3 m [P2] */
    cyl(B.metal, [X(23.4), 0, zD(23.4)], [X(23.4), 0, 15.3], 0.06, 0.03, 6);
    cyl(B.metal, [X(23.4), -1.2, 13.4], [X(23.4), 1.2, 13.4], 0.025, 0.025, 4);

    /* --- the four MM38 containers in two pairs [P1][P2][P3][P5] --- */
    mm38pair(B, 20.8, 3.4, -15 * PI / 180);     /* forward pair, d 17.9 - 23.7, trained to starboard */
    mm38pair(B, 13.3, 3.55, 30 * PI / 180);     /* after pair, d 10.8 - 15.8, trained to port */
    /* raft canisters by the forward pair [P2][P5] */
    for (s = -1; s <= 1; s += 2) for (j = 0; j < 2; j++) {
      var yc = s * (2.7 - j * 0.0), zc = 2.55 + j * 0.5;
      cyl(B.lt, [X(17.9), yc, zc], [X(19.5), yc, zc], 0.25, 0.25, 12);
      ellipsoid(B.lt, [X(17.9), yc, zc], 0.18, 0.25, 0.25, 3, 12, -PI / 2, PI / 2);
      ellipsoid(B.lt, [X(19.5), yc, zc], 0.18, 0.25, 0.25, 3, 12, -PI / 2, PI / 2);
      box(B.metal, X(17.8), X(19.6), yc - 0.3, yc + 0.3, zD(18) , zD(18) + 0.08);
    }

    /* --- the stern casing d 0.6 - 10.4, top 3.25 m [P2][P5], the 40 mm and the arched-door box on it --- */
    box(B.hull, X(0.6), X(10.4), -2.3, 2.3, zD(5), 3.25);
    box(B.deck, X(0.65), X(10.35), -2.25, 2.25, 3.25, 3.27);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) box(B.dark, X(1.0 + k * 3.0), X(1.06 + k * 3.0), s * 2.3 - 0.02, s * 2.3 + 0.02, 2.3, 3.2);   /* panel seams [P2] */
    }
    bofors40(B, 4.6, 7.2, 3.25);
    /* the box with arched doors [P1][P2][P5], d 8.6 - 10.4, 1.35 m tall (identity NOT CONFIRMED) */
    (function () {
      var R = [], k2, t2, hw = 1.0, z0 = 3.25, zs = 4.25;
      function sec(d) {
        var P = [[X(d), -hw, z0], [X(d), hw, z0]];
        for (k2 = 0; k2 <= 6; k2++) { t2 = k2 / 6 * PI; P.push([X(d), hw * Math.cos(t2), zs + 0.35 * Math.sin(t2)]); }
        return P;
      }
      R.push(sec(8.6), sec(10.4));
      loft(B.hull, R);
      box(B.dark, X(10.4) - 0.02, X(10.4) + 0.03, -0.3, 0.3, 3.35, 4.3);
      for (s = -1; s <= 1; s += 2) box(B.dark, X(9.2), X(9.8), s * hw - 0.03, s * hw + 0.03, 3.35, 4.3);
    })();
    /* lockers on the stern casing [P2][P5] */
    box(B.lt, X(1.0), X(2.6), -2.1, -1.0, 3.25, 3.9);
    box(B.lt, X(1.0), X(2.6), 1.0, 2.1, 3.25, 3.9);
    /* ensign staff at the transom (no ensign) */
    cyl(B.metal, [X(0.3), 0, zD(0.3)], [X(0.3), 0, zD(0.3) + 2.4], 0.035, 0.02, 5);
    cyl(B.metal, [X(10.6), -1.8, zD(10.6)], [X(10.6), -1.8, 10.7], 0.035, 0.012, 4);         /* whip [P2] */

    /* --- the forecastle: the 76 mm, a ventilator, bollards, jack staff --- */
    oto76(B, 33.9, 36.9);
    cylZ(B.lt, X(33.8), 2.3, zD(33.8), zD(33.8) + 0.45, 0.2, 10);                          /* ventilator [P4] */
    cylZ(B.lt, X(33.8), 2.3, zD(33.8) + 0.45, zD(33.8) + 0.62, 0.42, 14);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, X(42.0), s * (hD(42) - 0.5), zD(42), zD(42) + 0.3, 0.1, 8);
      cylZ(B.metal, X(42.45), s * (hD(42.45) - 0.5), zD(42.45), zD(42.45) + 0.3, 0.1, 8);
      cylZ(B.metal, X(20.0), s * (hD(20) - 0.4), zD(20), zD(20) + 0.3, 0.1, 8);
      cylZ(B.metal, X(2.0), s * (hD(2) - 0.4), zD(2), zD(2) + 0.3, 0.1, 8);
      /* hull exhaust outlets just over the waterline [P2][P5] */
      cylY(B.dark, X(15.4), s * 3.5, s * 3.62, 0.45, 0.3, 12);
      cylY(B.dark, X(22.5), s * 3.5, s * 3.62, 0.45, 0.3, 12);
    }
    box(B.hull, X(39.0), X(40.0), -0.5, 0.5, zD(39.5), zD(39.5) + 0.3);                     /* hatch */
    cyl(B.metal, [X(46.7), 0, zD(46.7)], [X(46.7), 0, zD(46.7) + 2.6], 0.035, 0.02, 5);     /* jack staff [P2] */

    /* --- lifelines: quarterdeck and launcher deck, and the forecastle [P2][P3][P4] --- */
    rails(B, 0.25, 26.0, 0.08, 0.95);
    rails(B, 33.5, 46.3, 0.08, 0.95);
    cyl(B.metal, [X(0.12), -3.2, zD(0.1) + 0.95], [X(0.12), 3.2, zD(0.1) + 0.95], 0.02, 0.02, 4);
    for (i = 0; i < 5; i++) box(B.metal, X(0.12) - 0.02, X(0.12) + 0.02, -3.0 + i * 1.5 - 0.02, -3.0 + i * 1.5 + 0.02, zD(0.1), zD(0.1) + 0.95);

    /* --- underwater: four shafts and screws (published 4 shafts; positions NOT CONFIRMED, tips at the
       published 2.5 m draught) --- */
    var SY = [2.25, 0.8, -0.8, -2.25], SD = [3.2, 4.6, 4.6, 3.2];
    for (i = 0; i < 4; i++) {
      var yS = SY[i], dS = SD[i], zS = -1.9;
      cyl(B.metal, [X(dS + 0.25), yS, zS], [X(dS + 6.0), yS, -1.45], 0.07, 0.07, 6);
      cyl(B.metal, [X(dS - 0.1), yS, zS], [X(dS + 0.25), yS, zS], 0.08, 0.12, 8);
      for (j = 0; j < 3; j++) {
        var an = j / 3 * TAU + 0.5 * i, cy = Math.cos(an), cz = Math.sin(an);
        var tv = unit([0.5, -cz * 0.86, cy * 0.86]), tu = cross(tv, [0, cy, cz]);
        obox(B.metal, [X(dS + 0.1), yS, zS], tu, tv, [0, cy, cz], -0.025, 0.025, -0.14, 0.14, 0.1, 0.6);
      }
    }

    /* --- fittings (detail pass): what the photographs show and the old pass left out - the anchors in
       their hawses, fairleads and cleats along the deck edge, the toe rail, scuttles in the forward hull,
       hatches and vents, the ladders to the stern casing and the open bridge, eyebrows and wipers on the
       wheelhouse front, two more whips on the bridge screen, the boot-topping band.  Into the bins. --- */
    function hullY(d, z) {
      var P = half(d), q;
      for (q = 0; q + 1 < P.length; q++) if (z <= P[q][1] && z >= P[q + 1][1] && P[q][1] > P[q + 1][1]) {
        return lerp(P[q + 1][0], P[q][0], (z - P[q + 1][1]) / (P[q][1] - P[q + 1][1]));
      }
      return P[0][0];
    }
    for (s = -1; s <= 1; s += 2) {
      /* the anchor in its hawse high in the bow flare */
      var ya = hullY(43.6, 1.55), yb = hullY(43.6, 1.35);
      FK.anchor(B.metal, X(43.6), s * (ya + 0.02), 1.55, [0.35, s * 0.9, (ya - yb) * 2], 0.55);
      FK.tube(B.dark, [X(43.6), s * (ya - 0.1), zD(43.6) + 0.02], [X(41.2), s * 0.35, zD(41.2) + 0.06], 0.03, 0.03, 4, false);  /* cable */
      FK.cylZ(B.metal, X(41.2), s * 0.35, zD(41.2), 0.32, 0.22, 10);                         /* capstan */
      /* fairleads and cleats on the deck edge, the toe rail all along it */
      [[45.3, 0.9], [27.0, 0.45], [1.0, 0.5]].forEach(function (f) {
        var df = f[0], yf = s * (hD(df) - 0.22), yaw = Math.atan2(s * (hD(df + 0.5) - hD(df)), 0.5);
        FK.fairlead(B.metal, X(df), yf, zD(df), yaw, f[1]);
      });
      [6.0, 16.5, 24.5, 34.5, 38.5].forEach(function (dc) { FK.cleat(B.metal, X(dc), s * (hD(dc) - 0.3), zD(dc), 0, 1.0); });
      var tp = [], dd;
      for (dd = 0.3; dd <= 46.0; dd += 1.0) tp.push([X(dd), s * (hD(dd) - 0.04), zD(dd) + 0.04]);
      FK.toe(B.hull, tp, 0.05);
      /* scuttles in the forward hull, below the wheelhouse and the gun */
      [31.0, 32.4, 35.0, 36.4, 37.8].forEach(function (dc) {
        var yy = hullY(dc, 1.45);
        FK.disc(B.glass, [X(dc), s * (yy + 0.03), 1.45], [0, s, 0.12], 0.13, 8);
      });
      /* the ladder from the quarterdeck to the stern casing and the one up the wheelhouse side */
      FK.ladder(B.metal, [X(10.9), s * 1.4, zD(10.9)], [X(10.42), s * 1.4, 3.25], [0, 1, 0], 0.45, 0.28);
      FK.ladder(B.metal, [X(27.6), s * 2.82, zD(27.6) + 0.3], [X(27.6), s * 2.82, 6.45], [1, 0, 0], 0.4, 0.3);
      /* mushroom vents abreast the wheelhouse and gooseneck vents on the stern casing */
      FK.mushroom(B.lt, X(25.2), s * 2.3, zD(25.2), 0.13, 0.5);
      FK.goose(B.lt, X(9.6), s * 1.8, 3.25, 0.08, 0.45, s > 0 ? PI / 2 : -PI / 2);
      FK.goose(B.lt, X(0.9), s * 2.2, zD(0.9), 0.07, 0.5, PI);
      /* the door handles and hinges of the stern casing door, an eyebrow over each side window */
      for (k = 0; k < 2; k++) FK.boxZ(B.dark, X(32.05 + k * 0.7), s * 2.8, 6.14, 0.62, 0.12, 0.04, 0);
      FK.whip(B.metal, X(28.8), s * 2.6, 7.4, 3.0, 0.025);
    }
    FK.hatch(B.hull, X(37.6), 0, zD(37.6), 0.8, 0.8, 0);
    FK.hatch(B.hull, X(24.8), 1.2, zD(24.8), 0.7, 0.7, 0);
    FK.hatch(B.hull, X(3.4), 0, 3.25, 0.9, 0.9, 0);
    FK.bollard(B.metal, X(44.6), 0, zD(44.6), 0, 0.6);
    /* eyebrow across the front windows and three wipers */
    FK.boxZ(B.dark, X(33.38), 0, 6.15, 0.14, 5.0, 0.04, 0);
    for (k = -2; k <= 2; k += 2) FK.tube(B.dark, [X(33.36), k * 0.7 - 0.15, 5.68], [X(33.36), k * 0.7 + 0.1, 6.05], 0.012, 0.012, 3, false);
    /* the boot-topping band: a dark strake 0 - 0.3 m all along the hull */
    for (s = -1; s <= 1; s += 2) {
      var bt = [];
      [0, 0.5, 1.5, 3, 5, 8, 11, 14, 18, 22, 26, 30, 32, 34, 36, 38, 40, 41, 42, 43, 44, 44.8, 45.5].forEach(function (dd) { bt.push([[X(dd), s * (hullY(dd, 0.0) + 0.04), 0.0], [X(dd), s * (hullY(dd, 0.3) + 0.04), 0.3]]); });
      for (k = 0; k + 1 < bt.length; k++) FK.quad(B.boot, bt[k][0], bt[k + 1][0], bt[k + 1][1], bt[k][1], [bt[k][0][0], 0, 0.15]);
    }

    /* --- team: small strips on up-facing surfaces (the wheelhouse roof aft, the stern casing) --- */
    box(B.team, X(28.7), X(29.5), -1.2, 1.2, 6.4, 6.425);
    box(B.team, X(3.0), X(3.6), -1.6, 1.6, 3.27, 3.295);

    flush(THREE, g, B);
    return g;
  }
  return { build: build };
})();

/* Registration: len is the published overall length of the Type 148, 47.0 m (and [P2]'s own 1558 px
   transom to stem head at the scale its crew members give). */
UNIT_MODELS["deu_e60_missileboat"] = {
  len: 47.0,
  build: function (THREE, M, C) { return HeroType148.build(THREE, M, C); }
};
