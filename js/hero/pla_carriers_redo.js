/* ==================== js/hero/pla_carriers_redo.js ======================
   HERO MODELS -- the PLA Navy's carriers, rebuilt from references (the owner:
   "the PLA Navy models are bad").  Two keys, one kit:

     carrier_c        Type 003 Fujian (CV-18), as commissioned in 2025.
     pla_e00_carrier  Type 001 Liaoning (CV-16), as photographed 2018-2022.
                      VARIANTS: "liaoning" (registered) and "shandong" (the
                      Type 002, CV-17, 2019; the row's second ship - built
                      by HeroPLACarriers.build(THREE, M, C, "shandong"),
                      not registered: the row has one key and names the
                      Liaoning first, commissioned 2012).

   LOAD ORDER: after js/hero/ru_kuznetsov.js and js/hero/pla_navy_modern.js
   (both register these two keys; this file overrides them).  Self-contained.

   WHY NOT REUSE: js/hero/ru_kuznetsov.js draws the same 1143 hull as the
   Liaoning, but exports only build(), which bakes the Kuznetsov's island,
   her Granit hatch field and her Kashtan sponsons into merged meshes; there
   is no hull-only entry, and the Liaoning differs in exactly those parts.
   js/hero/pla_navy_modern.js keeps its Type 003 kit private.  So both hulls
   are lofted here (policy 5: nothing callable draws them).

   PUBLISHED FIGURES (en.wikipedia raw wikitext, read 2026-11-12):
     Fujian    length 316 m, beam 76 m (CSIS estimate), 80-85,000 t; three
               electromagnetic catapults, an angled deck with arresting
               gear, two starboard deck-edge lifts; HHQ-10, Type 1130 CIWS;
               Type 346B.
     Liaoning  length 306.4 m o/a, 270 m w/l; beam 74.4 m o/a, 35 m w/l;
               3 x Type 1130 CIWS, 3 x HQ-10 (18-cell); Type 346 S-band
               AESA, Type 382; no Granit launchers (the launcher base was
               removed in the refit).
     Shandong  length 305 m (cn), beam 75 m; island 10 % smaller with a
               second glazed deck; ski-jump 12 deg (the Liaoning's 14 deg);
               sponsons extended aft to starboard; Type 346A; 3 + 3 mounts.

   REFERENCES (Wikimedia Commons; fetched, gridded with PIL and read)
     [F1] "Type 003 Aircraft Carrier Fujian (18).svg" (plan, bow up, 464 x
          1449 px; 4.58 px/m at 316 m; X = 158 - row / 4.58, Y = (266 -
          col) / 4.58): the deck outline, the island footprint (X -13.4 ..
          -46.1, Y -23.1 .. -35.8), the lifts (X 13.9 .. 35.7 and -70.2 ..
          -92.0, Y -23.1 .. -38), the angled deck (axis Y = 9.3 + 0.15 (X +
          60.3): 8.5 deg; white edge lines 22.9 m apart, red dashed foul
          lines 28.6 m apart, yellow dashed axis), the three catapults (bow
          1 at Y 8.3 from X 154.7 to 35.7; bow 2 at Y -13.3 from X 107.8 to
          33; waist at Y 31.4 from X 71.8 to -55), their jet-blast
          deflectors (X 26-29 and -59 .. -64), four arresting wires (X
          -66, -78, -90, -102), the helicopter spots, the deck-edge red line.
     [F2] "PLAN CV-18 Fujian 20250911.jpg" (Japan MoD, port broadside, 5.42
          px/m, waterline row 403, the island's depth corrected 29 px):
          flight deck 16.1 m, the deck fascia 2.4 m, the island's lower
          block to 22.9 m, the upper block to 41.3, the forward and after
          houses (23-27.5 m), the mast to 50 with its dome and pole (55.9),
          the stem raking 21 m from the deck front to the waterline, the
          lighter vertical band of the hull up to the knuckle at about 5 m
          and the darker flare above it, the black boot-top.
     [F3] "Chinese aircraft carrier Fujian flight deck.jpg" (from the port
          quarter, above): the island's chamfered corners, the window grid
          on its side, the dark exhaust square on its roof, the mast forward
          on the roof, the catapult tracks as pale slots with dark edges,
          the red/white dashed and white lines, the wire pendants, the
          sponsons and catwalks under the port deck edge.
     [F4] "PLAN J-35 on Type 003 Fujian.png" (deck level, bow): the flush,
          lowered jet-blast deflectors outlined in white, the track's pale
          slot, red-white dashed safety lines, yellow lead-in lines.
     [L1] "PLANS Liaoning (CV-16) 20200428.jpg" (Japan MoD, port broadside,
          2000 x 518; bow tip x 66, deck end x 1905: 6.0 px/m on 306.4 m;
          waterline row 436; camera about 1.8 deg up, so the far side's
          features read 0.19 px higher a metre of depth, corrected):
          flight deck 15.6 m (15.1 at the bow's far edge, 15.8 at the
          island; drawn 15.6), the ramp from X 95 rising 5.2 m by X 146.6
          (k = 0.00195, 12.7 deg at the lip; published 14), the stem at
          the waterline X 130, the transom; the island: base X 2.6 .. -53.7
          to 21.3 m, galleries 6.7 .. -61.2, forward and after houses to
          24.5 / 24.9, the forward block to 32.1, the tower to 35.7, the
          enclosed mast to 44 and the Type 382 above it to about 49, a pole
          to 50.9, the after block to 36.0 with the funnel casing to about
          39, the after block's sloped end; the domes; the knuckle at 5 m
          (the lit band under the dark flare); the forward port sponson X
          39..81 (side to 6.5 m) and the after port one X -123 .. -153.
     [L2] "Aircraft Carrier Liaoning CV-16.jpg" (starboard bow, Hong Kong
          2017): the island's starboard face (the corner array faces, the
          tower's stacked platforms, the domes, the Type 382 on the mast,
          the funnel casing's sooty top), the two hangar openings under
          the starboard lifts (lifts drawn X 9..28 and -100..-76), the red
          boot-top.
     [L3] "World Navy Aircraft carriers chart 2026.svg" (Kuznetsov's plan,
          the same 1143 hull and deck as the ex-Varyag; 1049 px = 306.4 m,
          3.424 px/m, centreline col 224): the Liaoning's deck outline
          (ramp end 23 m wide, the angled sponson to 40.0 m port, the
          island sponson to -35.3), the angled deck at 7.8 deg (red foul
          lines 31 m apart), the corner weapons sponsons below deck, the
          deck-edge lifts.  The same chart's Fujian agrees with [F1].
     [S1] "PLAN Shandong CV-17 20230406.jpg" (port broadside, 945 px; 2.94
          px/m on 305 m): flight deck about 15 m, the island X -9.1 ..
          -72.7, its forward block to 36.0 and after block to 37.4, the
          mast to about 52.
     [S2] "Chinese aircraft carrier Shandong in 2019.jpg" (port bow,
          fitting out): the island's two blocks, the sloped corner array
          faces fore and aft, the after block taller, the glazed band.

   RECOGNITION LIST (what reads at game zoom; where it is drawn)
     Fujian:  1. a flat deck, the angled deck 8.5 deg to port with its white
              edge lines and red foul lines (deck texture);  2. the three
              catapult tracks, two in the bow, one in the waist, each ending
              at a flush, lowered jet-blast deflector (texture);  3. four
              wires across the landing area (texture);  4. the single
              compact island far aft on the starboard edge with chamfered
              corners carrying the 346B faces, the mast forward on its roof,
              the exhaust square aft of it (islandFujian);  5. two starboard
              deck-edge lifts (texture outlines, hangar openings in the
              side);  6. the forward sponsons with HHQ-10, the quarter
              sponsons with Type 1130 (sponson());  7. the flared hull with
              its knuckle, the long raked stem, the blunt deck front.
     Liaoning: 1. the ski-jump (deckZ); 2. the angled deck 7.8 deg; 3. the
              long island on its starboard sponson: base, galleries, the
              forward block with its corner 346 faces, the tower and the
              enclosed mast with the Type 382, the taller after block with
              the funnel casing, the domes (islandLiaoning); 4. the four
              corner sponsons with HQ-10 and Type 1130 and no Granit cells;
              5. the concave bow flare up to the ramp's lip; 6. the red
              boot-top.

   NOT CONFIRMED (estimated, not measured):
     - everything under water (keel, bilges, forefoot), the waterline beam of
       the Fujian (drawn 40 m) and both draughts (11 m / 10 m);
     - the island plan widths except the Fujian's footprint [F1]; the
       island's fore and aft faces; which corner face carries which array
       (all four drawn on the chamfers, the side faces carry windows);
     - the mounts' types and places: Fujian - HHQ-10 on both forward
       sponsons, Type 1130 on both quarters ([F1] symbols, [F2]); Liaoning -
       HQ-10 forward port, aft port and aft starboard, Type 1130 forward
       starboard, aft port and aft starboard (3 + 3 published, places from
       [L1] and [L3]'s sponsons);
     - the Liaoning's take-off runs, wires (4) and spots: from [L3] and
       published practice, colours generic;
     - boats (two RIBs under each ship's starboard overhang), raft racks,
       anchors and scuttle rows: every carrier photograph shows them, their
       exact places are estimated;
     - the Shandong variant's island from two soft photographs; its hull
       and deck are the Liaoning's with 12 deg at the lip and the extended
       after starboard sponson.
     - The Liaoning's flight deck reads 15.6 m in [L1]; js/hero/ru_kuznetsov
       draws her sister's at 19.0 off another photograph.  Not fitted to it.
   No pennant numbers, names, flags, stars or deck lettering.

   CARRIER CONTRACT: one flat (Liaoning: flat aft of X 95, then the ramp)
   flight deck; nothing stands on it but the island.  Every marking, lift,
   catapult, deflector and wire is painted in its texture.  Catwalks, nets,
   rails, raft racks, aerials (lowered) and the sponsons' mounts are all
   below the deck's level, outboard of its edge.  No named nodes (the old
   models carried none); no "turret" (no carrier row is turret:true).
   PAINT: sRGB colours and canvases (prepModel converts), taken to ~0.85.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  One mesh
   per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPLACarriers = (function () {
  "use strict";
  var PI = Math.PI, TW = 2 * PI;

  /* ------------------------------------------------------------ vectors */
  function sb(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dt(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function nz(v) { var l = Math.sqrt(dt(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function ad(a, b, k) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  /* a table [[x, v], ...] ascending in x, clamped at its ends */
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i];
      return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return T[T.length - 1][1];
  }
  /* the same, zero outside its range (a waterline beyond its stem) */
  function tab0(T, x) {
    if (x < T[0][0] - 1e-6 || x > T[T.length - 1][0] + 1e-6) return 0;
    return tab(T, x);
  }
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* -------------------------------------------------------------- SINKS
     Every part is emitted as triangles into the sink of its material; a
     sink becomes one mesh.  UVs by mode: "box" (planar by the face's
     dominant axis, k per metre), "hull" (u along the side, v the absolute
     height: the boot-top and bottom are painted in the canvas), "deck"
     (the flight deck canvas, x0..x0+lx by y0..y0+ly).                    */
  function Sink(mode, P) { this.p = []; this.u = []; this.mode = mode || "box"; this.P = P || {}; }
  Sink.prototype.tri = function (a, b, c) {
    var n = cr(sb(b, a), sb(c, a));
    if (dt(n, n) < 1e-10) return;
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    var P = this.P, ax = Math.abs(n[0]), ay = Math.abs(n[1]), az = Math.abs(n[2]), V = [a, b, c], k, q, s;
    for (k = 0; k < 3; k++) {
      q = V[k];
      if (this.mode === "deck") this.u.push((q[0] - P.x0) / P.lx, (q[1] - P.y0) / P.ly);
      else if (this.mode === "hull") this.u.push((ax > ay && ax > az ? q[1] : q[0]) / P.tile, (q[2] - P.z0) / (P.z1 - P.z0));
      else {
        s = P.k || 0.25;
        if (az >= ax && az >= ay) this.u.push(q[0] * s, q[1] * s);
        else if (ay >= ax) this.u.push(q[0] * s, q[2] * s);
        else this.u.push(q[1] * s, q[2] * s);
      }
    }
  };
  Sink.prototype.mesh = function (THREE, m) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeVertexNormals();
    var me = new THREE.Mesh(g, m); me.castShadow = true; me.receiveShadow = true;
    return me;
  };
  /* a sink seen through a yaw and an offset (mounts built at the origin) */
  function Xf(s, x, y, z, yaw) {
    var c = Math.cos(yaw || 0), n = Math.sin(yaw || 0);
    function T(p) { return [x + p[0] * c - p[1] * n, y + p[0] * n + p[1] * c, z + p[2]]; }
    return { tri: function (a, b, d) { s.tri(T(a), T(b), T(d)); } };
  }

  /* --------------------------------------------------------- PRIMITIVES */
  function tri(s, a, b, c, ref) {
    if (ref) {
      var n = cr(sb(b, a), sb(c, a));
      var m = [(a[0] + b[0] + c[0]) / 3 - ref[0], (a[1] + b[1] + c[1]) / 3 - ref[1], (a[2] + b[2] + c[2]) / 3 - ref[2]];
      if (dt(n, m) < 0) { s.tri(a, c, b); return; }
    }
    s.tri(a, b, c);
  }
  function quad(s, a, b, c, d, ref) { tri(s, a, b, c, ref); tri(s, a, c, d, ref); }
  /* oriented so the normal has a positive part along o */
  function triO(s, a, b, c, o) { if (dt(cr(sb(b, a), sb(c, a)), o) < 0) s.tri(a, c, b); else s.tri(a, b, c); }
  function quadO(s, a, b, c, d, o) { triO(s, a, b, c, o); triO(s, a, c, d, o); }
  /* both faces (nets, thin plates) */
  function quad2(s, a, b, c, d) { s.tri(a, b, c); s.tri(a, c, d); s.tri(a, c, b); s.tri(a, d, c); }
  /* a tube A -> B, radii ra / rb, n sides, optional caps */
  function tube(s, A, B, ra, rb, n, caps) {
    var d = sb(B, A); if (dt(d, d) < 1e-10) return;
    var ax = nz(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = nz(cr(ax, t)), v = cr(ax, u), RA = [], RB = [], i, j;
    for (i = 0; i < n; i++) {
      var c = Math.cos(i / n * TW + 0.4), sn = Math.sin(i / n * TW + 0.4);
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
  /* an oriented box: centre c, frame ex (along) ey (across) ez (up) */
  function obox(s, c, ex, ey, ez, lx, ly, lz) {
    var V = [], i, F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
    for (i = 0; i < 8; i++) {
      var a = (i & 1 ? 0.5 : -0.5) * lx, b = (i & 2 ? 0.5 : -0.5) * ly, e = (i & 4 ? 0.5 : -0.5) * lz;
      V.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
    }
    F.forEach(function (f) { quad(s, V[f[0]], V[f[1]], V[f[2]], V[f[3]], c); });
  }
  function boxZ(s, x, y, z0, lx, ly, lz, yaw) {
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    obox(s, [x, y, z0 + lz / 2], [c, sn, 0], [-sn, c, 0], [0, 0, 1], lx, ly, lz);
  }
  function blk(s, x0, x1, y0, y1, z0, z1) {
    boxZ(s, (x0 + x1) / 2, (y0 + y1) / 2, z0, Math.abs(x1 - x0), Math.abs(y1 - y0), z1 - z0, 0);
  }
  function cylZ(s, x, y, z0, h, r, n, r2) { tube(s, [x, y, z0], [x, y, z0 + h], r, r2 === undefined ? r : r2, n, true); }
  function sphere(s, c, r, nw, nh, half) {
    var i, j, P = [];
    var h0 = half ? 0 : -PI / 2;
    for (j = 0; j <= nh; j++) {
      var ph = h0 + (PI / 2 - h0) * j / nh, row = [];
      for (i = 0; i < nw; i++) {
        var th = i / nw * TW;
        row.push([c[0] + r * Math.cos(ph) * Math.cos(th), c[1] + r * Math.cos(ph) * Math.sin(th), c[2] + r * Math.sin(ph)]);
      }
      P.push(row);
    }
    for (j = 0; j < nh; j++) for (i = 0; i < nw; i++) {
      var k = (i + 1) % nw;
      quad(s, P[j][i], P[j][k], P[j + 1][k], P[j + 1][i], c);
    }
    if (half) for (i = 1; i < nw - 1; i++) tri(s, P[0][0], P[0][i], P[0][i + 1], [c[0], c[1], c[2] + r]);
  }
  function disc(s, c, nrm, r, n) {
    var a = nz(nrm), t = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = nz(cr(a, t)), v = cr(a, u), P = [], i;
    for (i = 0; i < n; i++) P.push(ad(ad(c, u, Math.cos(i / n * TW) * r), v, Math.sin(i / n * TW) * r));
    for (i = 1; i < n - 1; i++) tri(s, P[0], P[i], P[i + 1], ad(c, a, -1));
  }
  /* a faceted solid between two convex plans of equal count (CCW) */
  function frustum(s, lo, z0, hi, z1, noBottom) {
    var n = lo.length, i, cx = 0, cy = 0;
    lo.forEach(function (q) { cx += q[0] / n; cy += q[1] / n; });
    var ref = [cx, cy, (z0 + z1) / 2];
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      quad(s, [lo[i][0], lo[i][1], z0], [lo[j][0], lo[j][1], z0], [hi[j][0], hi[j][1], z1], [hi[i][0], hi[i][1], z1], ref);
    }
    for (i = 1; i < n - 1; i++) {
      tri(s, [hi[0][0], hi[0][1], z1], [hi[i][0], hi[i][1], z1], [hi[i + 1][0], hi[i + 1][1], z1], ref);
      if (!noBottom) tri(s, [lo[0][0], lo[0][1], z0], [lo[i][0], lo[i][1], z0], [lo[i + 1][0], lo[i + 1][1], z0], ref);
    }
  }
  function prism(s, poly, z0, z1, noBottom) { frustum(s, poly, z0, poly, z1, noBottom); }
  /* an octagon plan x0..x1 by y0..y1 (y0 < y1), corners cut fx/fy forward
     and ax/ay aft.  Faces k: 0 stbd side, 1 fwd-stbd corner, 2 front,
     3 fwd-port corner, 4 port side, 5 aft-port corner, 6 back, 7 aft-stbd */
  function oct(x0, x1, y0, y1, fx, fy, ax, ay) {
    return [[x0 + ax, y0], [x1 - fx, y0], [x1, y0 + fy], [x1, y1 - fy], [x1 - fx, y1], [x0 + ax, y1], [x0, y1 - ay], [x0, y0 + ay]];
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  /* a panel on face k of a frustum: fraction s0..s1 along it, height za..zb,
     stood off by off (array faces, windows, louvres, doors) */
  function panel(s, lo, z0, hi, z1, k, s0, s1, za, zb, off) {
    var n = lo.length, k1 = (k + 1) % n;
    function at(f, z) {
      var t = (z - z0) / (z1 - z0);
      var ax = lerp(lo[k][0], hi[k][0], t), ay = lerp(lo[k][1], hi[k][1], t);
      var bx = lerp(lo[k1][0], hi[k1][0], t), by = lerp(lo[k1][1], hi[k1][1], t);
      return [lerp(ax, bx, f), lerp(ay, by, f), z];
    }
    var ex = lo[k1][0] - lo[k][0], ey = lo[k1][1] - lo[k][1], L = Math.hypot(ex, ey) || 1;
    var o = [ey / L, -ex / L, 0];
    var A = at(s0, za), B = at(s1, za), C = at(s1, zb), D = at(s0, zb);
    [A, B, C, D].forEach(function (P) { P[0] += o[0] * off; P[1] += o[1] * off; });
    quadO(s, A, B, C, D, o);
  }
  /* guard rail along a polyline: posts every step, top rail at h, lifeline at h/2 */
  function rail(s, pts, h, step, r) {
    var i, k, carry = 0; r = r || 0.03; h = h || 1.0; step = step || 2.0;
    function post(p) { tube(s, p, [p[0], p[1], p[2] + h], r, r, 3, false); }
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], d = sb(b, a), L = Math.sqrt(dt(d, d));
      if (L < 1e-3) continue;
      tube(s, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], r * 0.8, r * 0.8, 3, false);
      tube(s, [a[0], a[1], a[2] + h * 0.5], [b[0], b[1], b[2] + h * 0.5], r * 0.6, r * 0.6, 3, false);
      for (k = carry; k < L; k += step) post(ad(a, d, k / L));
      carry = k - L;
    }
    post(pts[pts.length - 1]);
  }
  function railBox(s, x0, x1, y0, y1, z, h) {
    rail(s, [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], [x0, y0, z]], h || 1.0, 2.0, 0.03);
  }
  function bollard(s, x, y, z, yaw) {
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    boxZ(s, x, y, z, 1.3, 0.5, 0.08, yaw);
    [-1, 1].forEach(function (e) {
      cylZ(s, x + c * e * 0.38, y + sn * e * 0.38, z + 0.08, 0.5, 0.17, 6);
      cylZ(s, x + c * e * 0.38, y + sn * e * 0.38, z + 0.58, 0.07, 0.22, 6);
    });
  }
  function mushroom(s, x, y, z, r, h) { cylZ(s, x, y, z, h, r, 6); cylZ(s, x, y, z + h, r * 0.5, r * 1.7, 6, r * 0.6); }
  /* a life-raft canister (shell to sW) on its cradle (sM), axis along yaw */
  function raft(sW, sM, x, y, z, yaw, L, r) {
    L = L || 1.4; r = r || 0.34;
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), zc = z + r + 0.08;
    tube(sW, [x - c * L / 2, y - sn * L / 2, zc], [x + c * L / 2, y + sn * L / 2, zc], r, r, 8, true);
    [-0.3, 0.3].forEach(function (f) { boxZ(sM, x + c * L * f, y + sn * L * f, z, 0.1, r * 1.8, 0.2, yaw); });
  }
  function ladder(s, A, B, side, w) {
    w = (w || 0.6) / 2;
    var e = [side[0] * w, side[1] * w, 0], d = sb(B, A), L = Math.sqrt(dt(d, d)), n = Math.max(1, Math.floor(L / 0.45)), i;
    tube(s, ad(A, e, 1), ad(B, e, 1), 0.03, 0.03, 3, false);
    tube(s, ad(A, e, -1), ad(B, e, -1), 0.03, 0.03, 3, false);
    for (i = 1; i <= n; i++) { var p = ad(A, d, i / (n + 0.5)); tube(s, ad(p, e, 1), ad(p, e, -1), 0.02, 0.02, 3, false); }
  }
  /* a stockless anchor in its hawse; out = the hull's outward normal */
  function anchor(sM, sD, x, y, z, out, k) {
    var o = nz(out), ez = [0, 0, 1], ex = nz(cr(ez, o)), p = ad([x, y, z], o, 0.2 * k);
    disc(sD, ad([x, y, z], o, 0.02), o, 0.75 * k, 10);
    tube(sM, [x, y, z], ad([x, y, z], o, 0.25 * k), 0.62 * k, 0.7 * k, 10, false);
    obox(sM, ad(p, ez, -0.9 * k), ex, o, ez, 0.3 * k, 0.24 * k, 1.6 * k);
    obox(sM, ad(p, ez, -1.75 * k), ex, o, ez, 1.4 * k, 0.3 * k, 0.3 * k);
    [-1, 1].forEach(function (e) {
      tube(sM, ad(ad(p, ez, -1.75 * k), ex, e * 0.66 * k), ad(ad(p, ez, -1.0 * k), ex, e * 0.45 * k), 0.15 * k, 0.06 * k, 4, true);
    });
  }
  /* an aerial mast hinged at its foot: lowered flat outboard (flight
     operations), or raised */
  function whip(s, A, dir, L, r) {
    r = r || 0.06;
    cylZ(s, A[0], A[1], A[2] - 0.25, 0.5, r * 3, 6);
    tube(s, A, ad(A, nz(dir), L), r, r * 0.35, 4, false);
  }
  /* a rigid-hull boat (hull to sH, tubes/canopy to sT), axis along yaw */
  function boat(sH, sT, x, y, z, yaw, L, B) {
    var c = Math.cos(yaw), sn = Math.sin(yaw);
    function P(a, b, h) { return [x + c * a - sn * b, y + sn * a + c * b, z + h]; }
    var r = B * 0.22;
    [-1, 1].forEach(function (e) {
      tube(sT, P(-L / 2, e * (B / 2 - r), r), P(L * 0.25, e * (B / 2 - r), r), r, r, 7, true);
      tube(sT, P(L * 0.25, e * (B / 2 - r), r), P(L / 2, e * r * 0.3, r * 1.3), r, r * 0.6, 7, true);
    });
    obox(sH, P(-L * 0.05, 0, r * 0.45), [c, sn, 0], [-sn, c, 0], [0, 0, 1], L * 0.85, B - 2 * r, r * 0.9);
    obox(sH, P(-L * 0.05, 0, r * 1.5), [c, sn, 0], [-sn, c, 0], [0, 0, 1], L * 0.25, B * 0.4, r * 1.6);
  }

  /* ------------------------------------------------------------- PAINT */
  var TEX = {};
  function canvasTex(THREE, key, W, H, draw, clampV) {
    if (TEX[key]) return TEX[key];
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    draw(cv.getContext("2d"), W, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = clampV ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    TEX[key] = t; return t;
  }
  /* weathering over a canvas: rust runs, grime streaks, salt, patches */
  function weather(g, w, h, seed, n, a) {
    var R = rng(seed), i;
    a = a || 1; n = n || 30;
    for (i = 0; i < n; i++) {
      var x = R() * w, y = R() * h, l = h * (0.04 + R() * 0.2), gr = g.createLinearGradient(0, y, 0, y + l);
      gr.addColorStop(0, "rgba(96,58,34," + (0.28 * a).toFixed(3) + ")"); gr.addColorStop(1, "rgba(96,58,34,0)");
      g.fillStyle = gr; g.fillRect(x, y, 1 + R() * 2, l);
    }
    for (i = 0; i < n * 0.6; i++) {
      var x2 = R() * w, y2 = R() * h, l2 = h * (0.03 + R() * 0.12), g2 = g.createLinearGradient(0, y2, 0, y2 + l2);
      g2.addColorStop(0, "rgba(22,24,26," + (0.2 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(22,24,26,0)");
      g.fillStyle = g2; g.fillRect(x2, y2, 1 + R() * 3, l2);
    }
    for (i = 0; i < n * 0.5; i++) {
      g.globalAlpha = (0.03 + R() * 0.04) * a; g.fillStyle = R() < 0.5 ? "#ffffff" : "#1a1c1e";
      g.fillRect(R() * w, R() * h, w * (0.03 + R() * 0.08), h * (0.01 + R() * 0.05));
    }
    g.globalAlpha = 1;
  }
  /* the hull side: u along (one tile = 48 m), v = height z0..z1 absolute:
     the bottom, the boot-top band at the waterline, the grey topsides with
     strakes, butts, rust runs and grime at the waterline */
  function hullTex(THREE, key, P) {
    return canvasTex(THREE, key, 512, 512, function (g, w, h) {
      var R = rng(P.seed), i;
      function Y(z) { return (1 - (z - P.z0) / (P.z1 - P.z0)) * h; }
      g.fillStyle = P.hull; g.fillRect(0, 0, w, h);
      g.fillStyle = P.bottom; g.fillRect(0, Y(P.boot0), w, h - Y(P.boot0));
      g.fillStyle = P.boot; g.fillRect(0, Y(P.boot1), w, Y(P.boot0) - Y(P.boot1));
      /* strakes every 2.5 m, butts every 8 m, staggered */
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (var z = P.z0; z < P.z1; z += 2.5) { g.beginPath(); g.moveTo(0, Y(z)); g.lineTo(w, Y(z)); g.stroke(); }
      for (i = 0; i < 6; i++) for (var r = 0; r < 14; r++) {
        var xx = (i / 6 + (r % 2) * 0.08) * w, z1 = P.z0 + r * 2.5;
        g.beginPath(); g.moveTo(xx, Y(z1)); g.lineTo(xx, Y(z1 + 2.5)); g.stroke();
      }
      g.globalAlpha = 1;
      /* grime at the waterline, rust runs down the topsides */
      var gr = g.createLinearGradient(0, Y(P.boot1 + 1.6), 0, Y(P.boot1));
      gr.addColorStop(0, "rgba(40,44,40,0)"); gr.addColorStop(1, "rgba(40,44,40,0.35)");
      g.fillStyle = gr; g.fillRect(0, Y(P.boot1 + 1.6), w, Y(P.boot1) - Y(P.boot1 + 1.6));
      for (i = 0; i < 70; i++) {
        var x = R() * w, y0 = Y(2 + R() * (P.z1 - 4)), l = 10 + R() * 60, g3 = g.createLinearGradient(0, y0, 0, y0 + l);
        g3.addColorStop(0, "rgba(98,60,36,0.30)"); g3.addColorStop(1, "rgba(98,60,36,0)");
        g.fillStyle = g3; g.fillRect(x, y0, 1 + R() * 1.6, l);
      }
      weather(g, w, Y(P.boot1), P.seed + 1, 30, 0.6);
    }, true);
  }
  /* the bottom: antifouling with fouling and streaks (same UV as the hull) */
  function underTex(THREE, col) {
    return canvasTex(THREE, "plcUnder" + col, 256, 128, function (g, w, h) {
      var R = rng(77), i;
      g.fillStyle = col; g.fillRect(0, 0, w, h);
      for (i = 0; i < 60; i++) {
        g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = R() < 0.6 ? "#000000" : "#c08070";
        g.fillRect(R() * w, R() * h, 4 + R() * 30, 1 + R() * 3);
      }
      g.globalAlpha = 0.1; g.strokeStyle = "#000000";
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(i * w / 6, 0); g.lineTo(i * w / 6, h); g.stroke(); }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plcPlate", 256, 256, function (g, w, h) {
      var i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4 + (i % 2) * 10, 0); g.lineTo(i * w / 4 + (i % 2) * 10, h); g.stroke();
      }
      g.globalAlpha = 1;
      weather(g, w, h, 4040, 26, 0.7);
    });
  }
  function grilleTex(THREE) {
    return canvasTex(THREE, "plcGrille", 64, 64, function (g, w, h) {
      var i;
      g.fillStyle = "#26292b"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#0b0c0d";
      for (i = 0; i < 8; i++) g.fillRect(2, 2 + i * 7.8, w - 4, 4);
    });
  }
  /* the 346 faces: a grid of tiles in a frame */
  function arrayTex(THREE) {
    return canvasTex(THREE, "plcArray", 128, 128, function (g, w, h) {
      var i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.strokeStyle = "rgba(0,0,0,0.12)"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) {
        g.beginPath(); g.moveTo(i * 16, 0); g.lineTo(i * 16, h); g.stroke();
        g.beginPath(); g.moveTo(0, i * 16); g.lineTo(w, i * 16); g.stroke();
      }
      j = 0;
    });
  }

  /* --------------------------------------------- the flight deck canvas */
  var DK = { x0: -160, lx: 320, y0: -46, ly: 92 };
  function deckCanvas(THREE, key, base, seed, draw) {
    return canvasTex(THREE, key, 2048, 588, function (g, w, h) {
      var R = rng(seed), i;
      function U(x) { return (x - DK.x0) / DK.lx * w; }
      function V(y) { return (DK.y0 + DK.ly - y) / DK.ly * h; }
      var m = w / DK.lx;                                  /* px a metre */
      g.fillStyle = base; g.fillRect(0, 0, w, h);
      /* non-skid: mottled patches laid in the coating's strips */
      for (i = 0; i < 900; i++) {
        g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, (3 + R() * 14) * m * 0.4, (1 + R() * 4) * m * 0.4);
      }
      g.globalAlpha = 0.06; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (var x = -160; x < 160; x += 6) { g.beginPath(); g.moveTo(U(x), 0); g.lineTo(U(x), h); g.stroke(); }
      g.globalAlpha = 1;
      var api = {
        U: U, V: V, m: m, R: R, g: g,
        line: function (x0, y0, x1, y1, col, wm) {
          g.strokeStyle = col; g.lineWidth = Math.max(1, wm * m); g.beginPath(); g.moveTo(U(x0), V(y0)); g.lineTo(U(x1), V(y1)); g.stroke();
        },
        dash: function (x0, y0, x1, y1, col, wm, on, off) {
          var L = Math.hypot(x1 - x0, y1 - y0), s;
          for (s = 0; s < L; s += on + off) {
            var a = s / L, b = Math.min(L, s + on) / L;
            api.line(lerp(x0, x1, a), lerp(y0, y1, a), lerp(x0, x1, b), lerp(y0, y1, b), col, wm);
          }
        },
        poly: function (pts, col, wm, close) {
          g.strokeStyle = col; g.lineWidth = Math.max(1, wm * m); g.beginPath();
          pts.forEach(function (p, k) { if (k) g.lineTo(U(p[0]), V(p[1])); else g.moveTo(U(p[0]), V(p[1])); });
          if (close) g.closePath(); g.stroke();
        },
        fill: function (pts, col) {
          g.fillStyle = col; g.beginPath();
          pts.forEach(function (p, k) { if (k) g.lineTo(U(p[0]), V(p[1])); else g.moveTo(U(p[0]), V(p[1])); });
          g.closePath(); g.fill();
        },
        circle: function (x, y, r, col, wm) {
          g.strokeStyle = col; g.lineWidth = Math.max(1, wm * m); g.beginPath(); g.arc(U(x), V(y), r * m, 0, TW); g.stroke();
        }
      };
      draw(api);
      weather(g, w, h, seed + 3, 80, 0.45);
    });
  }
  /* the edge lines just inside a deck chain (pts [x, y], y signed) */
  function edgeLine(api, pts, inset, col, wm) {
    var q = pts.map(function (p) { return [p[0], p[1] - Math.sign(p[1]) * inset]; });
    api.poly(q, col, wm, false);
  }
  /* tie-down pad-eyes across the deck (not on the landing area) */
  function tieDowns(api, E, skip) {
    var g = api.g, x, y;
    g.fillStyle = "rgba(18,18,18,0.45)";
    for (x = -150; x < 150; x += 4) for (y = -40; y <= 40; y += 4) {
      if (y > E.p(x) - 2 || y < E.s(x) + 2 || skip(x, y)) continue;
      g.fillRect(api.U(x) - 1, api.V(y) - 1, 2, 2);
    }
  }
  /* a lowered jet-blast deflector: flush panels outlined, x0..x1 by y0..y1 */
  function jbd(api, x0, x1, y0, y1) {
    api.fill(rect(x0, x1, y0, y1), "rgba(40,42,44,0.55)");
    var n = 6, i;
    for (i = 1; i < n; i++) api.line(x0, lerp(y0, y1, i / n), x1, lerp(y0, y1, i / n), "rgba(16,16,16,0.7)", 0.15);
    api.poly(rect(x0, x1, y0, y1), "#d8d8d2", 0.3, true);
    api.line(x1, y0, x1, y1, "#202020", 0.35);                 /* the hinge line */
  }
  /* a catapult track: a pale slot between dark edge strips, its shuttle
     start and the red/white dashed safety lines beside it */
  function catTrack(api, x0, x1, yc) {
    api.line(x0, yc + 0.55, x1, yc + 0.55, "#2a2c2e", 0.35);
    api.line(x0, yc - 0.55, x1, yc - 0.55, "#2a2c2e", 0.35);
    api.line(x0, yc, x1, yc, "#9a9c9c", 0.55);
    api.line(x0, yc, x1, yc, "#3a3c3d", 0.12);
    api.dash(x0, yc + 4.5, x1, yc + 4.5, "#b23a32", 0.3, 2.0, 2.0);
    api.dash(x0 + 2.0, yc + 4.5, x1, yc + 4.5, "#d8d8d2", 0.3, 2.0, 2.0);
    api.dash(x0, yc - 4.5, x1, yc - 4.5, "#b23a32", 0.3, 2.0, 2.0);
    api.dash(x0 + 2.0, yc - 4.5, x1, yc - 4.5, "#d8d8d2", 0.3, 2.0, 2.0);
    api.line(x0 + 1.0, yc - 1.6, x0 + 1.0, yc + 1.6, "#d6c23c", 0.4);   /* shuttle start */
    for (var k = 0; k < 6; k++) {                                       /* exhaust and tyre marks */
      var xx = x0 + api.R() * (x1 - x0) * 0.4;
      api.g.globalAlpha = 0.18; api.line(xx, yc + 1.2, xx + 8 + api.R() * 10, yc + 1.4, "#151515", 0.5);
      api.line(xx, yc - 1.2, xx + 8 + api.R() * 10, yc - 1.0, "#151515", 0.5); api.g.globalAlpha = 1;
    }
  }
  /* the arresting wires across an angled deck: frame (ax, ay, ca, sa) */
  function wires(api, A, list, half) {
    list.forEach(function (sx) {
      var a = A(sx, -half), b = A(sx, half);
      api.line(a[0], a[1], b[0], b[1], "#141414", 0.32);
      [-1, 1].forEach(function (e) {                  /* sheave dashes at the ends */
        var c0 = A(sx - 0.8, e * (half + 0.6)), c1 = A(sx + 0.8, e * (half + 0.6));
        api.line(c0[0], c0[1], c1[0], c1[1], "#141414", 0.9);
      });
      for (var k = -2; k <= 2; k++) {                  /* bow-spring supports */
        var p = A(sx, k * half / 2.6), q = A(sx + 0.5, k * half / 2.6);
        api.line(p[0], p[1], q[0], q[1], "#1c1c1c", 0.5);
      }
    });
  }

  /* ---------------------------------------------------------- MATERIALS */
  function makeMats(THREE, C, P, hullT, deckT) {
    var team = (C && C.team) || 0x3f7fd0;
    function skin(col, map, r) { return new THREE.MeshStandardMaterial({ color: col, map: map, roughness: r, metalness: 0.06 }); }
    return {
      hull:  skin(0xffffff, hullT, 0.86),
      under: skin(0xffffff, underTex(THREE, P.bottom), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.84),
      fdeck: skin(0xffffff, deckT, 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      array: skin(P.array, arrayTex(THREE), 0.7),
      white: skin(0xd6d8d6, plateTex(THREE), 0.75),
      team:  skin(team, plateTex(THREE), 0.8),
      metal: new THREE.MeshStandardMaterial({ color: P.metal, roughness: 0.55, metalness: 0.5, side: THREE.DoubleSide }),
      glass: new THREE.MeshStandardMaterial({ color: 0x0b1418, roughness: 0.15, metalness: 0.3 })
    };
  }
  var ORDER = ["hull", "under", "sup", "fdeck", "dark", "array", "white", "team", "metal", "glass"];
  function makeSinks(hullP) {
    return {
      hull: new Sink("hull", hullP), under: new Sink("hull", hullP), sup: new Sink("box", { k: 0.15 }), fdeck: new Sink("deck", DK),
      dark: new Sink("box", { k: 0.6 }), array: new Sink("box", { k: 0.12 }), white: new Sink("box", { k: 0.3 }),
      team: new Sink("box", { k: 0.3 }), metal: new Sink("box", { k: 0.3 }), glass: new Sink("box", { k: 0.3 })
    };
  }

  /* =============================================================== HULL
     H: the ship's tables.  LV, waterlines ascending in z, each a table of
     port half-breadths [x, hb] (zero outside its range: the stem and the
     run); ZB the bottom's profile (keel, forefoot, counter); XT the
     transom; ZG the hull's top under the deck overhang, from XF0 forward
     blending to the deck edge itself by XF1 (the bow flares right up to
     the flight deck).  deckZ(x), EP(x) / ES(x) (port + / starboard -),
     the deck's fascia depth fas.  The ring at a station runs from the
     keel's centre up each waterline, then three flare points concave up
     to the top.                                                          */
  function wAt(H, x, z) {
    var L = H.LV, i, zb = tab(H.ZB, x);
    if (z <= zb) return 0;
    if (z <= L[0].z) return tab0(L[0].t, x);
    for (i = 1; i < L.length; i++) if (z <= L[i].z) {
      var a = L[i - 1], b = L[i], wa = a.z < zb ? 0 : tab0(a.t, x);
      return lerp(wa, tab0(b.t, x), (z - a.z) / (b.z - a.z));
    }
    var tp = topAt(H, x, 1), wl = tab0(L[L.length - 1].t, x);
    return lerp(wl, tp[0], Math.pow(Math.min(1, (z - H.ZG) / Math.max(0.01, tp[1] - H.ZG)), 1.5));
  }
  function topAt(H, x, sg) {
    var e = sg > 0 ? H.EP(x) : -H.ES(x), hg = tab0(H.LV[H.LV.length - 1].t, x), zd = H.deckZ(x) - H.fas;
    if (x <= H.XF0) return [hg, H.ZG];
    if (x >= H.XF1) return [e, zd];
    var t = (x - H.XF0) / (H.XF1 - H.XF0);
    return [lerp(hg, e, t), lerp(H.ZG, zd, t)];
  }
  function ring(H, x, sg) {
    var zb = tab(H.ZB, x), pts = [[0, zb]], ly = 0, lz = zb;
    H.LV.forEach(function (L) {
      if (L.z <= zb + 1e-6) { pts.push([0, zb]); return; }
      var w = tab0(L.t, x); pts.push([w, L.z]); ly = w; lz = L.z;
    });
    var top = topAt(H, x, sg), e;
    if (top[1] < lz) top = [Math.max(top[0], ly), lz];
    for (e = 1; e <= 3; e++) {
      var t = e / 4;
      pts.push([ly + (top[0] - ly) * Math.pow(t, 1.5), lz + (top[1] - lz) * t]);
    }
    pts.push(top);
    return pts.map(function (p) { return [x, sg * p[0], p[1]]; });
  }
  /* the stations: dense, plus every break in the tables */
  function stations(H, x0, x1, step) {
    var xs = [x0, x1], x;
    for (x = Math.ceil(x0 / step) * step; x < x1; x += step) xs.push(x);
    H.LV.forEach(function (L) { L.t.forEach(function (q) { xs.push(q[0]); }); });
    H.PC.concat(H.SC).forEach(function (q) { xs.push(q[0]); });
    H.ZB.forEach(function (q) { xs.push(q[0]); });
    [H.XT, H.XF0, H.XF1].forEach(function (q) { xs.push(q); });
    xs = xs.filter(function (v) { return v >= x0 - 1e-6 && v <= x1 + 1e-6; }).sort(function (a, b) { return a - b; });
    var out = [];
    xs.forEach(function (v) { if (!out.length || v - out[out.length - 1] > 0.4) out.push(v); });
    out[out.length - 1] = x1; out[0] = x0;
    return out;
  }
  function buildHull(S, H) {
    var xs = stations(H, H.XS, H.XB, 4.0), hx = xs.filter(function (x) { return x >= H.XT - 1e-6; });
    var sh = S.hull, i, j;
    /* the shell's triangles below the waterline go to the bottom paint */
    var shell = { tri: function (a, b, c) { (Math.max(a[2], b[2], c[2]) <= 0.001 ? S.under : sh).tri(a, b, c); } };
    /* the shell, both sides */
    [1, -1].forEach(function (sg) {
      var prev = null;
      hx.forEach(function (x) {
        var R = ring(H, x, sg);
        if (prev) for (j = 0; j < R.length - 1; j++) {
          if (sg > 0) { shell.tri(prev[j], prev[j + 1], R[j + 1]); shell.tri(prev[j], R[j + 1], R[j]); }
          else { shell.tri(prev[j], R[j + 1], prev[j + 1]); shell.tri(prev[j], R[j], R[j + 1]); }
        }
        prev = R;
      });
    });
    /* the transom */
    var RP = ring(H, H.XT, 1), RS = ring(H, H.XT, -1), poly = RP.concat(RS.slice().reverse());
    var c = [H.XT, 0, (tab(H.ZB, H.XT) + H.ZG) / 2];
    for (i = 0; i < poly.length; i++) triO(shell, c, poly[i], poly[(i + 1) % poly.length], [-1, 0, 0]);
    /* the flight deck: top (its own canvas), fascia and the underside */
    var fd = S.fdeck;
    for (i = 0; i < xs.length - 1; i++) {
      var x0 = xs[i], x1 = xs[i + 1], z0 = H.deckZ(x0), z1 = H.deckZ(x1);
      fd.tri([x0, H.ES(x0), z0], [x1, H.ES(x1), z1], [x1, H.EP(x1), z1]);
      fd.tri([x0, H.ES(x0), z0], [x1, H.EP(x1), z1], [x0, H.EP(x0), z0]);
      /* fascia: port reads forward with the deck on its right */
      sh.tri([x0, H.EP(x0), z0], [x1, H.EP(x1), z1], [x1, H.EP(x1), z1 - H.fas]);
      sh.tri([x0, H.EP(x0), z0], [x1, H.EP(x1), z1 - H.fas], [x0, H.EP(x0), z0 - H.fas]);
      sh.tri([x0, H.ES(x0), z0], [x0, H.ES(x0), z0 - H.fas], [x1, H.ES(x1), z1 - H.fas]);
      sh.tri([x0, H.ES(x0), z0], [x1, H.ES(x1), z1 - H.fas], [x1, H.ES(x1), z1]);
      if (x1 <= H.XT + 1e-6) {
        /* aft of the transom: the deck's soffit */
        quadO(sh, [x0, H.ES(x0), z0 - H.fas], [x0, H.EP(x0), z0 - H.fas], [x1, H.EP(x1), z1 - H.fas], [x1, H.ES(x1), z1 - H.fas], [0, 0, -1]);
      } else {
        [1, -1].forEach(function (sg) {
          var tA = topAt(H, x0, sg), tB = topAt(H, x1, sg), E0 = sg > 0 ? H.EP(x0) : H.ES(x0), E1 = sg > 0 ? H.EP(x1) : H.ES(x1);
          var D0 = [x0, E0, z0 - H.fas], D1 = [x1, E1, z1 - H.fas], T1 = [x1, sg * tB[0], tB[1]], T0 = [x0, sg * tA[0], tA[1]];
          quadO(sh, D0, D1, T1, T0, [0, sg * 0.5, -1]);
        });
      }
    }
    /* ends of the deck slab, and the wall from the transom's top up to it */
    var XS = H.XS, XB = H.XB, zs = H.deckZ(XS), zbw = H.deckZ(XB);
    quadO(sh, [XS, H.ES(XS), zs], [XS, H.EP(XS), zs], [XS, H.EP(XS), zs - H.fas], [XS, H.ES(XS), zs - H.fas], [-1, 0, 0]);
    quadO(sh, [XB, H.ES(XB), zbw], [XB, H.EP(XB), zbw], [XB, H.EP(XB), zbw - H.fas], [XB, H.ES(XB), zbw - H.fas], [1, 0, 0]);
    var zt = H.deckZ(H.XT) - H.fas, tp = topAt(H, H.XT, 1), ts = topAt(H, H.XT, -1);
    quadO(sh, [H.XT, H.EP(H.XT), zt], [H.XT, tp[0], tp[1]], [H.XT, -ts[0], ts[1]], [H.XT, H.ES(H.XT), zt], [-1, 0, 0]);
    return xs;
  }
  /* a patch lying on the hull side (doors, openings): x0..x1, z0..z1 */
  function hullPatch(s, H, sg, x0, x1, z0, z1, off, nx, nzz) {
    var i, j, G = [];
    nx = nx || 4; nzz = nzz || 3;
    for (i = 0; i <= nx; i++) {
      var x = lerp(x0, x1, i / nx), row = [];
      for (j = 0; j <= nzz; j++) { var z = lerp(z0, z1, j / nzz); row.push([x, sg * (wAt(H, x, z) + off), z]); }
      G.push(row);
    }
    for (i = 0; i < nx; i++) for (j = 0; j < nzz; j++) quadO(s, G[i][j], G[i + 1][j], G[i + 1][j + 1], G[i][j + 1], [0, sg, 0]);
  }
  /* catwalks under the deck edge, with their rail and the safety net; and
     raft racks on some.  pts: the deck chain [x, y]; skip(x): no catwalk */
  function galleries(S, H, pts, sg, skip, rafts) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      if (L < 1.5) continue;
      var n = Math.ceil(L / 7);
      for (k = 0; k < n; k++) {
        var f0 = k / n, f1 = (k + 1) / n;
        var p0 = [lerp(a[0], b[0], f0), lerp(a[1], b[1], f0)], p1 = [lerp(a[0], b[0], f1), lerp(a[1], b[1], f1)];
        var xm = (p0[0] + p1[0]) / 2;
        if (skip(xm)) continue;
        var ux = dx / L, uy = dy / L, ox = sg * -uy, oy = sg * ux;    /* outward */
        if (ox * 0 + oy * sg < 0.3) continue;                          /* only the long sides */
        var z0 = H.deckZ(p0[0]), z1 = H.deckZ(p1[0]), lp = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
        var zc = (z0 + z1) / 2 - 1.35, w = 1.4;
        obox(S.sup, [xm + ox * (w / 2 + 0.05), (p0[1] + p1[1]) / 2 + oy * (w / 2 + 0.05), zc - 0.09], [ux, uy, 0], [ox, oy, 0], [0, 0, 1], lp, w, 0.18);
        var r0 = [p0[0] + ox * (w + 0.05), p0[1] + oy * (w + 0.05), z0 - 1.35], r1 = [p1[0] + ox * (w + 0.05), p1[1] + oy * (w + 0.05), z1 - 1.35];
        rail(S.metal, [r0, r1], 0.95, 2.4, 0.03);
        /* the net: from 0.3 under the edge out to the rail's top */
        quad2(S.dark, [p0[0] + ox * 0.05, p0[1] + oy * 0.05, z0 - 0.32], [p1[0] + ox * 0.05, p1[1] + oy * 0.05, z1 - 0.32],
              [r1[0], r1[1], r1[2] + 0.95], [r0[0], r0[1], r0[2] + 0.95]);
        if (rafts && rafts(xm)) {
          raft(S.white, S.metal, xm - ux * 1.0 + ox * 0.75, (p0[1] + p1[1]) / 2 - uy * 1.0 + oy * 0.75, zc, Math.atan2(uy, ux), 1.3, 0.3);
          raft(S.white, S.metal, xm + ux * 1.0 + ox * 0.75, (p0[1] + p1[1]) / 2 + uy * 1.0 + oy * 0.75, zc, Math.atan2(uy, ux), 1.3, 0.3);
        }
      }
    }
  }
  /* scuttles in a row along the side at height z */
  function scuttles(S, H, sg, x0, x1, step, z) {
    for (var x = x0; x <= x1; x += step) {
      var w = wAt(H, x, z);
      if (w > 1) disc(S.glass, [x, sg * (w + 0.04), z], [0, sg, 0], 0.22, 6);
    }
  }
  /* a weapons sponson under the deck edge: a deck at zTop from the hull
     (yIn) out to yOut, its side, the bracket under it, its rail */
  function sponson(S, x0, x1, yIn, yOut, zTop, depth) {
    var sg = yOut > 0 ? 1 : -1, c = 1.5, yo = yOut, yi = yIn - sg * 1.0;
    var top = sg > 0 ? [[x0, yi], [x1, yi], [x1, yo - c], [x1 - c, yo], [x0 + c, yo], [x0, yo - c]]
                     : [[x0, yo + c], [x0 + c, yo], [x1 - c, yo], [x1, yo + c], [x1, yi], [x0, yi]];
    var bot = top.map(function (p) { return [p[0], p[1] - (Math.abs(p[1] - yi) > 0.5 ? sg * Math.min(depth * 0.9, Math.abs(yo - yi) - 0.5) : 0)]; });
    frustum(S.hull, bot, zTop - depth, top, zTop);
    var e = sg * 0.25;
    rail(S.metal, [[x0 + 0.4, yo - e - sg * 1.1, zTop], [x0 + 1.4, yo - e, zTop], [x1 - 1.4, yo - e, zTop], [x1 - 0.4, yo - e - sg * 1.1, zTop]], 1.0, 2.0, 0.03);
  }

  /* ============================================================ WEAPONS */
  /* HHQ-10 / HQ-10 launcher: drum pedestal, trunnion yoke and the boxed
     launcher with its cells, a sensor box between the two cell banks */
  function hq10(S, x, y, z, yaw) {
    var m = Xf(S.sup, x, y, z, yaw), d = Xf(S.dark, x, y, z, yaw), mt = Xf(S.metal, x, y, z, yaw);
    cylZ(m, 0, 0, 0, 0.9, 1.15, 10);
    boxZ(m, 0, 0, 0.9, 2.2, 2.9, 0.5, 0);
    [-1, 1].forEach(function (e) { boxZ(m, -0.2, e * 1.3, 1.4, 1.0, 0.3, 1.1, 0); });
    obox(m, [0.1, 0, 2.35], [Math.cos(0.17), 0, Math.sin(0.17)], [0, 1, 0], [-Math.sin(0.17), 0, Math.cos(0.17)], 3.0, 2.3, 1.7);
    var fx = 0.1 + 1.5 * Math.cos(0.17) + 0.02, fz = 2.35 + 1.5 * Math.sin(0.17);
    [-1, 1].forEach(function (e) {
      for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++)
        disc(d, [fx - (j - 1) * 0.5 * Math.sin(0.17), e * (0.42 + i * 0.32), fz + (j - 1) * 0.5 * Math.cos(0.17)], [Math.cos(0.17), 0, Math.sin(0.17)], 0.13, 6);
    });
    boxZ(mt, fx - 0.1, 0, fz - 0.35, 0.3, 0.3, 0.7, 0);
  }
  /* Type 1130 (H/PJ-11): ring, faceted gun house, the 11-barrel cluster,
     and the radar/EO head on its roof */
  function t1130(S, x, y, z, yaw) {
    var m = Xf(S.sup, x, y, z, yaw), mt = Xf(S.metal, x, y, z, yaw), d = Xf(S.dark, x, y, z, yaw);
    cylZ(m, 0, 0, 0, 0.5, 1.6, 12);
    var lo = oct(-1.6, 1.5, -1.3, 1.3, 0.9, 0.5, 0.5, 0.4), hi = oct(-1.3, 0.9, -0.95, 0.95, 0.7, 0.4, 0.4, 0.3);
    frustum(m, lo, 0.5, hi, 2.3);
    tube(mt, [0.9, 0, 1.3], [3.8, 0, 1.55], 0.36, 0.3, 10, true);
    tube(d, [3.75, 0, 1.55], [3.95, 0, 1.57], 0.28, 0.28, 8, true);
    boxZ(mt, 1.3, 0, 0.95, 0.9, 0.9, 0.7, 0);
    cylZ(m, -0.4, 0, 2.3, 0.5, 0.5, 8);
    boxZ(d, -0.25, 0, 2.8, 0.7, 0.9, 0.55, 0);
  }

  /* ==================================================== TYPE 003 FUJIAN */
  var FJ = (function () {
    var FD = 16.1;
    /* deck chains off [F1] (X = 158 - row/4.58, Y = (266 - col)/4.58) */
    var PC = [[-158.0, 15.5], [-153.1, 22.3], [-147.7, 27.7], [-136.8, 30.1], [-125.8, 34.5], [-120.4, 39.5],
              [-82.2, 39.8], [43.4, 39.8], [48.8, 41.5], [70.7, 41.5], [76.1, 33.0], [81.6, 25.5], [87.0, 24.0],
              [92.5, 23.6], [98.0, 20.5], [103.4, 17.7], [114.3, 18.6], [136.2, 17.0], [158.0, 14.6]];
    var SC = [[-158.0, -14.0], [-155.5, -18.8], [-147.7, -28.6], [-136.8, -30.6], [-131.3, -33.8], [-125.8, -33.8],
              [-120.4, -40.6], [-87.6, -40.6], [-82.2, -38.9], [-71.3, -38.9], [-65.8, -41.0], [10.6, -41.0],
              [16.1, -39.5], [32.5, -39.5], [38.0, -41.6], [43.4, -41.6], [48.8, -38.6], [54.2, -36.2],
              [70.7, -36.2], [76.1, -32.3], [81.6, -30.6], [87.0, -25.3], [98.0, -24.0], [103.4, -19.0],
              [114.3, -19.7], [136.2, -16.8], [158.0, -14.0]];
    var H = {
      XS: -158.0, XB: 158.0, XT: -151.0, ZG: 11.0, fas: 2.4, XF0: 85.0, XF1: 100.0, PC: PC, SC: SC,
      deckZ: function () { return FD; },
      EP: function (x) { return tab(PC, x); }, ES: function (x) { return tab(SC, x); },
      /* waterlines: 40 m beam, the knuckle at 5 m, the flare above it [F2] */
      LV: [
        { z: -11, t: [[-118, 0], [-110, 6], [-90, 13], [60, 13], [90, 8], [108, 2], [112, 0]] },
        { z: -9, t: [[-128, 0], [-120, 8], [-100, 17], [-70, 18.8], [60, 18.8], [95, 12], [115, 4], [120, 0]] },
        { z: -6, t: [[-137, 0], [-130, 9], [-110, 18.5], [-80, 19.8], [60, 19.8], [95, 15], [118, 7], [124, 0]] },
        { z: -3, t: [[-143, 0], [-139, 8], [-120, 18.5], [-95, 20], [60, 20], [95, 16.5], [120, 9], [130, 0]] },
        { z: 0, t: [[-151, 10], [-140, 14.5], [-120, 19.5], [-100, 20], [55, 20], [90, 17.8], [115, 11.5], [130, 4], [136, 0]] },
        { z: 2.5, t: [[-151, 13], [-140, 17], [-120, 20.2], [55, 20.2], [90, 18.3], [115, 12.8], [132, 5], [139, 0]] },
        { z: 5, t: [[-151, 15], [-140, 18.6], [-120, 20.5], [55, 20.5], [90, 18.8], [115, 13.8], [134, 6], [142, 0]] },
        { z: 8, t: [[-151, 18], [-140, 21], [-120, 22.5], [55, 22.5], [90, 20.0], [115, 15.0], [136, 7.5], [145.5, 0]] },
        { z: 11, t: [[-151, 21], [-140, 23.5], [-120, 24.5], [50, 24.5], [75, 23], [95, 21.5], [115, 17.5], [138, 10], [149, 0]] }
      ],
      ZB: [[-151, -0.8], [-143, -3], [-137, -6], [-128, -9], [-118, -11], [108, -11], [116, -9], [122, -6],
           [129, -3], [136, 0], [139, 2.5], [142, 5], [145.5, 8], [149, 11], [153, 12.6], [158, 13.6]]
    };
    var ANG = 8.5 * PI / 180, CA = Math.cos(ANG), SA = Math.sin(ANG);
    /* the angled deck's frame: s along its axis from X -156, o across (port +) */
    function A(s, o) { var x = -156 + s * CA - o * SA; return [x, 9.3 + 0.15 * (-156 + 60.3) + s * SA + o * CA]; }
    var LIFTS = [[13.9, 35.7], [-92.0, -70.2]];
    function deckTex(THREE) {
      return deckCanvas(THREE, "plcFujianDeck", "#727578", 3003, function (api) {
        var E = { p: H.EP, s: H.ES };
        tieDowns(api, E, function (x, y) { var r = (y - (9.3 + 0.15 * (x + 60.3))); return Math.abs(r) < 15 && x < 75; });
        /* the deck-edge lines: white at the edge, red 1.5 m in [F1] */
        edgeLine(api, PC, 0.6, "#d6d6d0", 0.35); edgeLine(api, SC, 0.6, "#d6d6d0", 0.35);
        edgeLine(api, PC, 1.6, "#a5372e", 0.3); edgeLine(api, SC, 1.6, "#a5372e", 0.3);
        /* the landing area [F1]: white double edge lines at +-11.5, red dashed
           foul lines at +-14.3, the yellow dashed axis */
        [-1, 1].forEach(function (e) {
          var a = A(2, e * 11.0), b = A(232, e * 11.0), c = A(2, e * 11.9), d = A(232, e * 11.9);
          api.line(a[0], a[1], b[0], b[1], "#e2e2dc", 0.4); api.line(c[0], c[1], d[0], d[1], "#e2e2dc", 0.4);
          var f = A(2, e * 14.3), h = A(232, e * 14.3);
          api.dash(f[0], f[1], h[0], h[1], "#b23a32", 0.35, 2.5, 1.5);
        });
        var ax0 = A(4, 0), ax1 = A(232, 0);
        api.dash(ax0[0], ax0[1], ax1[0], ax1[1], "#d8c43c", 0.45, 4, 3);
        /* the ramp's end: white stripes across the round-down */
        for (var k = -6; k <= 6; k++) { var p = A(1, k * 2.0); api.line(p[0], p[1], p[0] + 2.5, p[1], "#d6d6d0", 0.5); }
        /* the four arresting wires [F1] */
        wires(api, A, [52, 64, 76, 88], 12.5);
        /* touchdown wear on the landing area: tyre streaks and stains */
        for (var i = 0; i < 90; i++) {
          var s0 = 30 + api.R() * 120, o0 = (api.R() - 0.5) * 10, q0 = A(s0, o0), q1 = A(s0 + 6 + api.R() * 20, o0 + (api.R() - 0.5));
          api.g.globalAlpha = 0.10 + api.R() * 0.14; api.line(q0[0], q0[1], q1[0], q1[1], "#141414", 0.25 + api.R() * 0.3);
        }
        api.g.globalAlpha = 1;
        /* the three catapults [F1][F3][F4] and their lowered deflectors */
        catTrack(api, 35.7, 154.7, 8.3);
        catTrack(api, 33.0, 107.8, -13.3);
        catTrack(api, -55.0, 71.8, 31.4);
        jbd(api, 26.0, 30.0, 3.6, 13.0);
        jbd(api, 26.3, 30.3, -18.5, -8.6);
        jbd(api, -63.6, -59.6, 26.9, 36.2);
        /* the bow's centreline, dashed white, to the shuttle area */
        api.dash(30, -2.5, 152, -2.5, "#d6d6d0", 0.35, 3, 3);
        /* the lifts: yellow dashed outlines, the plate's seams [F1] */
        LIFTS.forEach(function (L) {
          api.fill(rect(L[0], L[1], -38.0, -23.1), "rgba(20,22,24,0.12)");
          api.poly(rect(L[0], L[1], -38.0, -23.1), "#d6c23c", 0.3, true);
          for (var q = 1; q < 4; q++) api.line(lerp(L[0], L[1], q / 4), -38.0, lerp(L[0], L[1], q / 4), -23.1, "rgba(10,10,10,0.35)", 0.1);
        });
        /* the island's foul line (a pale frame round its foot) [F1] */
        api.poly([[-5.0, -39.5], [-5.0, -17.0], [-13.0, -21.0], [-13.0, -21.5], [-48.0, -21.5], [-48.0, -39.5]], "#c9c9c3", 0.3, false);
        /* helicopter spots with their lead-in lines [F1] */
        [[116.5, -3.1], [-29.8, 23.1], [-130.2, 6.8]].forEach(function (c) {
          api.circle(c[0], c[1], 4.5, "#d6c23c", 0.35);
          api.line(c[0] + 5.2, c[1], c[0] + 11.0, c[1], "#d6c23c", 0.35);
          api.line(c[0] + 11.0, c[1] - 1.2, c[0] + 11.0, c[1] + 1.2, "#d6c23c", 0.35);
        });
        /* the yellow taxi lines from the waist to the bow cats [F3] */
        api.dash(-20, 26, 30, 10.5, "#d6c23c", 0.25, 2, 2);
        api.dash(-10, -16, 30, -13.3, "#d6c23c", 0.25, 2, 2);
      });
    }
    var PAINT = { sup: "#9ea6aa", array: "#8a9399", metal: 0x5f666b, bottom: "#6b2a24",
                  hullP: { seed: 3101, z0: -1, z1: 20, tile: 48, hull: "#8f979c", bottom: "#6b2a24", boot: "#1e2124", boot0: -1.5, boot1: 0.7 } };

    /* the island [F1] footprint, heights [F2], faces [F3]: the lower block,
       the wider upper block with chamfered corners (the 346B faces), the
       forward and after houses, the mast forward on the roof, the exhaust */
    function island(S) {
      var Y0 = -35.8, Y1 = -23.1, YC = (Y0 + Y1) / 2, ZL = 22.9, ZU = 41.3, i;
      var low = oct(-46.1, -13.4, Y0, Y1, 1.5, 1.2, 1.5, 1.2);
      prism(S.sup, low, FD - 0.05, ZL, true);
      var uLo = oct(-46.6, -15.0, -37.4, -21.6, 4.0, 3.0, 5.0, 3.0), uHi = oct(-40.0, -19.0, -35.5, -23.5, 3.0, 2.5, 3.5, 2.5);
      frustum(S.sup, uLo, ZL, uHi, ZU);
      /* the 346B faces on the four corners */
      [1, 3, 5, 7].forEach(function (k) { panel(S.array, uLo, ZL, uHi, ZU, k, 0.06, 0.94, 29.0, 38.4, 0.08); });
      /* the side walls: two window rows, the bridge glazing near the top, the
         three tall louvre panels low in the middle [F2] */
      [0, 4].forEach(function (k) {
        panel(S.glass, uLo, ZL, uHi, ZU, k, 0.05, 0.95, 38.6, 40.0, 0.06);
        panel(S.dark, uLo, ZL, uHi, ZU, k, 0.42, 0.52, 23.8, 33.0, 0.06);
        panel(S.dark, uLo, ZL, uHi, ZU, k, 0.54, 0.64, 23.8, 33.0, 0.06);
        panel(S.dark, uLo, ZL, uHi, ZU, k, 0.66, 0.76, 23.8, 33.0, 0.06);
        for (i = 0; i < 6; i++) {
          panel(S.glass, uLo, ZL, uHi, ZU, k, 0.36 + i * 0.075, 0.41 + i * 0.075, 36.9, 37.7, 0.06);
          panel(S.glass, uLo, ZL, uHi, ZU, k, 0.36 + i * 0.075, 0.41 + i * 0.075, 34.4, 35.2, 0.06);
        }
        panel(S.glass, uLo, ZL, uHi, ZU, k, 0.1, 0.3, 31.2, 32.0, 0.06);
      });
      [2, 6].forEach(function (k) { panel(S.glass, uLo, ZL, uHi, ZU, k, 0.1, 0.9, 38.6, 40.0, 0.06); });
      /* the lower block: doors, louvres, scuttles */
      [0, 4].forEach(function (k) {
        panel(S.dark, low, FD, low, ZL, k, 0.15, 0.2, FD, FD + 2.1, 0.05);
        panel(S.dark, low, FD, low, ZL, k, 0.62, 0.67, FD, FD + 2.1, 0.05);
        panel(S.dark, low, FD, low, ZL, k, 0.3, 0.5, FD + 3.0, FD + 5.0, 0.05);
        for (i = 0; i < 8; i++) panel(S.glass, low, FD, low, ZL, k, 0.25 + i * 0.07, 0.27 + i * 0.07, FD + 3.6, FD + 4.1, 0.06);
      });
      /* forward house (flyco) on its trapezoid, glazed, railed roof [F1][F2] */
      var fh = [[-14.5, -36.5], [-5.5, -38.5], [-5.5, -19.0], [-14.5, -22.0]];
      prism(S.sup, fh, ZL - 0.4, 27.2);
      for (i = 0; i < 4; i++) panel(S.glass, fh, ZL - 0.4, fh, 27.2, i, 0.08, 0.92, 25.2, 26.4, 0.05);
      rail(S.metal, [[-14.3, -36.3, 27.2], [-5.7, -38.3, 27.2], [-5.7, -19.2, 27.2], [-14.3, -22.2, 27.2]], 1.0, 2.0, 0.03);
      /* after house */
      var ah = rect(-50.0, -45.5, -36.2, -22.6);
      prism(S.sup, ah, ZL - 0.4, 27.5);
      [0, 2, 3].forEach(function (k) { panel(S.glass, ah, ZL - 0.4, ah, 27.5, k, 0.1, 0.9, 25.6, 26.6, 0.05); });
      railBox(S.metal, -50.0, -45.5, -36.2, -22.6, 27.5, 1.0);
      /* ladders up the lower block's after face, a door on the front */
      [-1, 1].forEach(function (e) { ladder(S.metal, [-46.2, YC + e * 4, FD], [-46.2, YC + e * 4, ZL], [0, 1, 0], 0.6); });
      panel(S.dark, low, FD, low, ZL, 2, 0.4, 0.6, FD, FD + 2.2, 0.05);
      /* the roof: rail, the exhaust square (dark grille), domes [F1][F3] */
      railBox(S.metal, -39.7, -19.3, -35.2, -23.8, ZU, 1.0);
      blk(S.sup, -38.4, -27.0, -34.4, -24.6, ZU, ZU + 0.6);
      blk(S.dark, -38.0, -27.4, -34.0, -25.0, ZU + 0.6, ZU + 0.7);
      [[-35.0, -26.6], [-35.0, -32.6]].forEach(function (p) { cylZ(S.sup, p[0], p[1], ZU, 0.8, 0.5, 8); sphere(S.white, [p[0], p[1], ZU + 1.6], 1.0, 10, 4, true); });
      cylZ(S.sup, -39.0, -34.4, ZU, 0.6, 0.4, 8); sphere(S.white, [-39.0, -34.4, ZU + 1.2], 0.8, 10, 4, true);
      /* the mast: a faceted column, yard, the dome, the pole [F2] */
      var mLo = oct(-24.0, -17.4, YC - 2.8, YC + 2.8, 1.0, 1.0, 1.0, 1.0), mHi = oct(-22.6, -18.8, YC - 1.5, YC + 1.5, 0.5, 0.5, 0.5, 0.5);
      frustum(S.sup, mLo, ZU - 0.05, mHi, 50.0);
      [1, 3, 5, 7].forEach(function (k) { panel(S.array, mLo, ZU, mHi, 50.0, k, 0.1, 0.9, 43.0, 47.0, 0.05); });
      boxZ(S.metal, -20.7, YC, 46.6, 0.35, 9.0, 0.25, 0);
      [-1, 1].forEach(function (e) {
        tube(S.metal, [-20.7, YC + e * 4.4, 46.85], [-20.7, YC + e * 4.4, 48.4], 0.04, 0.03, 3, false);
        tube(S.metal, [-20.7, YC + e * 4.4, 46.85], [-20.7, YC + e * 4.4, 45.6], 0.04, 0.03, 3, false);
      });
      cylZ(S.sup, -20.7, YC, 50.0, 1.0, 0.8, 10);
      sphere(S.white, [-20.7, YC, 52.3], 1.4, 12, 6, false);
      tube(S.metal, [-22.3, YC, 50.0], [-22.3, YC, 55.9], 0.14, 0.06, 5, false);
      [-1, 1].forEach(function (e) {
        cylZ(S.sup, -17.0, YC + e * 4.6, ZU, 0.9, 0.45, 8); sphere(S.white, [-17.0, YC + e * 4.6, ZU + 1.6], 0.8, 10, 4, true);
        whip(S.metal, [-44.0, YC + e * 6.6, 27.5], [0, 0, 1], 6.5, 0.05);
        whip(S.metal, [-7.0, YC + e * 8.0, 27.2], [0, 0, 1], 6.0, 0.05);
        tube(S.metal, [-22.3, YC, 55.0], [-24.0, YC + e * 5.0, ZU + 0.1], 0.025, 0.025, 3, false);
      });
      /* team strips on the house roofs */
      blk(S.team, -12.0, -8.0, YC - 0.8, YC + 0.8, 27.2, 27.25);
      blk(S.team, -49.0, -46.5, YC - 0.8, YC + 0.8, 27.5, 27.55);
      blk(S.team, -27.0, -24.5, -34.4, -32.6, ZU, ZU + 0.05);
    }

    function build(THREE, M, C) {
      var S = makeSinks(PAINT.hullP), i;
      buildHull(S, H);
      /* lifts: the hangar openings in the starboard side under them [L2-like,
         F2 shows the dark recesses] */
      LIFTS.forEach(function (L) { hullPatch(S.dark, H, -1, Math.min(L[0], L[1]) + 1.5, Math.max(L[0], L[1]) - 1.5, 3.2, 10.6, 0.06, 4, 2); });
      /* the island */
      island(S);
      /* weapons sponsons [F1][F2]: HHQ-10 forward, Type 1130 on the quarters */
      sponson(S, 80.0, 102.0, 20.0, 29.5, 10.5, 2.4);
      sponson(S, 84.0, 100.0, -21.0, -30.0, 10.5, 2.4);
      hq10(S, 91.0, 25.0, 10.5, 0.35); hq10(S, 92.0, -25.5, 10.5, -0.35);
      sponson(S, -150.0, -134.0, 21.5, 33.0, 12.4, 2.4);
      sponson(S, -150.0, -134.0, -21.5, -34.0, 12.4, 2.4);
      t1130(S, -143.0, 29.0, 12.4, 2.5); t1130(S, -143.0, -29.6, 12.4, -2.5);
      /* the white dome on its pedestal by the port deck edge at X -112 [F2] */
      sponson(S, -115.0, -109.0, 38.0, 43.6, 14.2, 1.6);
      cylZ(S.sup, -112.0, 42.0, 14.2, 0.9, 0.7, 8);
      sphere(S.white, [-112.0, 42.0, 15.9], 1.2, 12, 6, false);
      /* galleries, nets, rails, raft racks round the deck edge */
      galleries(S, H, PC, 1, function (x) { return x > 76 || x < -150; }, function (x) { return (x > -110 && x < -90) || (x > -40 && x < -20) || (x > 10 && x < 30); });
      galleries(S, H, SC, -1, function (x) {
        return x > 100 || x < -150 || (x > -50 && x < -10) || (x > 12 && x < 37) || (x > -93 && x < -69) || (x > 82 && x < 102);
      }, function (x) { return (x > -130 && x < -105) || (x > 50 && x < 70); });
      /* aerial masts lowered outboard of the port catwalk [F1] leaders */
      [63.0, 55.4, 46.6, 39.0, -99.6].forEach(function (x) {
        var y = H.EP(x) + 1.6;
        whip(S.metal, [x, y, FD - 1.3], [-1, 0.06, 0], 9.0, 0.07);
      });
      [-60.0, -120.0].forEach(function (x) { whip(S.metal, [x, H.ES(x) - 1.6, FD - 1.3], [-1, -0.06, 0], 9.0, 0.07); });
      /* boats: two RIBs in cradles under the starboard overhang aft */
      [-104.0, -96.0].forEach(function (x) {
        var y = -(wAt(H, x, 9.2) + 1.7);
        boat(S.white, S.dark, x, y, 8.6, 0, 7.5, 2.6);
        [-2, 2].forEach(function (e) { blk(S.metal, x + e - 0.1, x + e + 0.1, y + 1.4, y - 1.4, 8.3, 8.6); });
        tube(S.metal, [x - 3.0, y, 10.8], [x + 3.0, y, 10.8], 0.08, 0.08, 4, false);
      });
      /* scuttles: two rows forward and aft; the anchors in the bow flare */
      [1, -1].forEach(function (sg) {
        scuttles(S, H, sg, -140, -96, 4.5, 6.4); scuttles(S, H, sg, 60, 126, 4.5, 7.2);
        scuttles(S, H, sg, -140, -100, 4.5, 8.6); scuttles(S, H, sg, 64, 120, 4.5, 9.4);
        var ax = 141.0, az = 9.5, w = wAt(H, ax, az);
        anchor(S.metal, S.dark, ax, sg * (w + 0.05), az, [0.45, sg, 0.2], 1.7);
        tube(S.metal, [ax - 1.0, sg * (H.EP(ax) * 0 + Math.abs(sg > 0 ? H.EP(ax) : H.ES(ax)) - 0.8), FD - H.fas - 0.1], [ax, sg * (w + 0.1), az + 0.8], 0.12, 0.12, 4, false);
        /* bollards and fairleads on the bow's catwalks */
        bollard(S.metal, 120.0, sg * (Math.abs(sg > 0 ? H.EP(120) : H.ES(120)) + 0.75), FD - 1.25, 0);
        bollard(S.metal, -140.0, sg * (Math.abs(sg > 0 ? H.EP(-140) : H.ES(-140)) + 0.75), FD - 1.25, 0);
        mushroom(S.metal, -60.0, sg * (Math.abs(sg > 0 ? H.EP(-60) : H.ES(-60)) + 0.9), FD - 1.25, 0.18, 0.55);
      });
      /* boot-topping and hull markings are in the hull canvas; team strips
         on the quarters' sponsons */
      blk(S.team, -148.0, -145.0, 29.0, 31.0, 12.4, 12.45);
      blk(S.team, -148.0, -145.0, -31.0, -29.0, 12.4, 12.45);
      var T = makeMats(THREE, C, PAINT, hullTex(THREE, "plcFujianHull", PAINT.hullP), deckTex(THREE));
      var g = new THREE.Group();
      ORDER.forEach(function (k) { var me = S[k].mesh(THREE, T[k]); if (me) g.add(me); });
      return g;
    }
    return { build: build, H: H };
  })();

  /* ============================================ TYPE 001 / 002 (1143 HULL) */
  var LN = (function () {
    var FD = 15.6, XR0 = 95.0;
    /* deck chains off [L3] (X = 153.2 - (row - 39)/3.424, Y = (224 - col)/3.424) */
    var PC0 = [[-153.2, 16.4], [-149.1, 16.6], [-144.7, 16.9], [-114.0, 19.6], [-110.0, 26.2], [-105.3, 26.3],
               [-100.9, 32.4], [0.0, 34.2], [26.0, 39.6], [52.4, 40.0], [56.8, 30.4], [59.0, 16.4], [61.2, 16.0],
               [87.5, 16.4], [109.4, 15.2], [131.3, 14.3], [148.8, 12.6], [153.2, 11.6]];
    var SC0 = [[-153.2, -21.0], [-149.1, -22.2], [-144.7, -25.4], [-114.0, -24.8], [-105.3, -31.5], [-100.9, -33.0],
               [-69.0, -33.0], [-66.5, -35.3], [3.0, -35.3], [4.5, -34.2], [26.0, -31.8], [31.0, -31.6],
               [32.0, -24.8], [48.0, -24.8], [56.8, -24.5], [61.2, -19.9], [82.7, -16.6], [87.5, -16.4],
               [109.4, -15.2], [131.3, -13.4], [148.8, -12.3], [153.2, -11.6]];
    function hullFor(V) {
      var SC = V.sc || SC0, PC = PC0;
      return {
        XS: -153.2, XB: 153.2, XT: -146.5, ZG: 12.0, fas: 1.2, XF0: 62.0, XF1: 78.0, PC: PC, SC: SC,
        deckZ: function (x) { return FD + (x > XR0 ? V.k * (x - XR0) * (x - XR0) : 0); },
        EP: function (x) { return tab(PC, x); }, ES: function (x) { return tab(SC, x); },
        /* waterlines: 35 m beam, 270 m w/l (published), the knuckle at 5 m [L1] */
        LV: [
          { z: -10, t: [[-112, 0], [-105, 5], [-90, 10], [-60, 13], [50, 13], [80, 9], [96, 3], [100, 0]] },
          { z: -8, t: [[-124, 0], [-118, 6], [-100, 14], [-70, 16.2], [55, 16.2], [85, 12], [103, 5], [109, 0]] },
          { z: -5, t: [[-133, 0], [-128, 7], [-110, 15.5], [-80, 17.2], [55, 17.2], [85, 14.5], [105, 8], [117, 1.5], [119, 0]] },
          { z: -2, t: [[-139, 0], [-136, 7], [-120, 15.5], [-95, 17.5], [50, 17.5], [85, 15.5], [108, 10], [122, 3], [125, 0]] },
          { z: 0, t: [[-141, 5], [-135, 11], [-120, 16.5], [-100, 17.5], [45, 17.5], [80, 16.2], [105, 11.5], [122, 4], [129.5, 0]] },
          { z: 2.5, t: [[-146.5, 8], [-135, 14], [-120, 17.6], [-100, 18], [45, 18], [80, 16.8], [105, 12.8], [125, 5], [133, 0]] },
          { z: 5, t: [[-146.5, 11.5], [-135, 16], [-120, 18.6], [-100, 18.8], [45, 18.8], [80, 17.0], [105, 13.6], [127, 6], [136.5, 0]] },
          { z: 8.5, t: [[-146.5, 14], [-135, 18.5], [-115, 20.2], [45, 20.2], [62, 18.5], [80, 16.6], [105, 14.4], [130, 7], [141, 0]] },
          { z: 12, t: [[-146.5, 16], [-135, 20], [-115, 21.5], [45, 21.5], [57, 19.5], [65, 17.0], [80, 16.0], [95, 15.4], [115, 14.0], [132, 10], [145, 3], [148, 0]] }
        ],
        ZB: [[-146.5, 2.5], [-141, 0], [-133, -5], [-124, -8], [-112, -10], [100, -10], [109, -8], [119, -5],
             [125, -2], [129.5, 0], [133, 2.5], [136.5, 5], [141, 8.5], [148, 12], [151, 16], [153.2, 19.4]]
      };
    }
    /* the angled deck [L3]: 7.8 deg, axis Y = 6.8 + 0.137 (X + 69.1) */
    var ANG = 7.8 * PI / 180, CA = Math.cos(ANG), SA = Math.sin(ANG);
    function A(s, o) { return [-151 + s * CA - o * SA, 6.8 + 0.137 * (-151 + 69.1) + s * SA + o * CA]; }
    var LIFTS = [[9.0, 28.0], [-100.0, -76.0]];
    function deckTex(THREE, V, H) {
      return deckCanvas(THREE, "plcDeck" + V.name, V.deck, V.seed, function (api) {
        var E = { p: H.EP, s: H.ES };
        tieDowns(api, E, function (x, y) { return Math.abs(y - (6.8 + 0.137 * (x + 69.1))) < 16 && x < 50; });
        edgeLine(api, PC0, 0.6, "#d8d8d2", 0.35); edgeLine(api, H.SC, 0.6, "#d8d8d2", 0.35);
        /* the landing area: white edge lines at +-13, red foul lines at
           +-15.5 [L3], dashed axis */
        [-1, 1].forEach(function (e) {
          var a = A(4, e * 13.0), b = A(205, e * 13.0); api.line(a[0], a[1], b[0], b[1], "#e0e0da", 0.45);
          var f = A(4, e * 15.5), h = A(205, e * 15.5); api.line(f[0], f[1], h[0], h[1], "#a8392f", 0.35);
        });
        var a0 = A(6, 0), a1 = A(205, 0);
        api.dash(a0[0], a0[1], a1[0], a1[1], "#e0e0da", 0.5, 5, 4);
        for (var k = -6; k <= 6; k++) { var p = A(1, k * 2.0); api.line(p[0], p[1], p[0] + 2.5, p[1], "#d8d8d2", 0.5); }
        wires(api, A, [50, 62, 74, 86], 13.0);
        for (var i = 0; i < 80; i++) {
          var s0 = 30 + api.R() * 110, o0 = (api.R() - 0.5) * 10, q0 = A(s0, o0), q1 = A(s0 + 6 + api.R() * 20, o0);
          api.g.globalAlpha = 0.10 + api.R() * 0.14; api.line(q0[0], q0[1], q1[0], q1[1], "#141414", 0.3);
        }
        api.g.globalAlpha = 1;
        /* the three take-off runs to the ramp, each from a lowered
           deflector [L3]; yellow dash bars along them */
        [[55.0, 6.5, 148, 1.2], [55.0, -10.0, 148, -1.2], [-38.0, 20.0, 148, 0.0]].forEach(function (r) {
          api.dash(r[0] + 5, r[1], r[2], r[3], "#d6c23c", 0.6, 2.5, 3.0);
          jbd(api, r[0] - 3.5, r[0], r[1] - 4.5, r[1] + 4.5);
        });
        /* helicopter spots along the port side [L3] */
        [[82.8, 2.0], [53.6, 19.6], [42.5, 30.0], [17.7, 30.0], [-8.3, 26.0], [-42.8, 25.0], [-139.1, 6.0]].forEach(function (c) {
          api.circle(c[0], c[1], 4.0, "#e0e0da", 0.35); api.circle(c[0], c[1], 1.2, "#e0e0da", 0.25);
        });
        /* the lifts, outlined [L3] */
        LIFTS.forEach(function (L) {
          var y0 = H.ES(lerp(L[0], L[1], 0.5));
          api.fill(rect(L[0], L[1], y0 + 0.5, y0 + 15.0), "rgba(20,22,24,0.12)");
          api.poly(rect(L[0], L[1], y0 + 0.5, y0 + 15.0), "#d6c23c", 0.3, true);
        });
        api.poly([[V.ix1 + 2, -36.0], [V.ix1 + 2, -20.0], [V.ix0 - 2, -20.0], [V.ix0 - 2, -36.0]], "#c9c9c3", 0.3, false);
        /* the ramp's lip: hatched */
        for (var y = -11; y <= 11; y += 1.2) api.line(150.5, y, 153.0, y + 1.0, "#d8d8d2", 0.35);
      });
    }

    /* the island [L1][L2] (Liaoning) / [S1][S2] (Shandong): base block,
       galleries with their houses, the forward block with its corner 346
       faces, the tower and the enclosed mast with the Type 382, the after
       block with the funnel casing and its own corner faces */
    function island(S, V) {
      var Y0 = -35.0, Y1 = -22.0, YC = -28.5, ZG = V.zg, i;
      var base = oct(V.bx0, V.bx1, Y0, Y1, 1.5, 1.2, 1.5, 1.2);
      prism(S.sup, base, FD - 0.05, ZG, true);
      [0, 4].forEach(function (k) {
        for (i = 0; i < 12; i++) panel(S.glass, base, FD, base, ZG, k, 0.08 + i * 0.075, 0.1 + i * 0.075, FD + 2.4, FD + 2.9, 0.05);
        panel(S.dark, base, FD, base, ZG, k, 0.22, 0.26, FD, FD + 2.1, 0.05);
        panel(S.dark, base, FD, base, ZG, k, 0.7, 0.74, FD, FD + 2.1, 0.05);
      });
      /* the gallery floor and its rail */
      prism(S.sup, oct(V.gx0, V.gx1, Y0 - 1.0, Y1 + 1.0, 2.0, 1.5, 2.0, 1.5), ZG, ZG + 0.4);
      rail(S.metal, [[V.gx0 + 2, Y1 + 1.0, ZG + 0.4], [V.gx1 - 2, Y1 + 1.0, ZG + 0.4]], 1.0, 2.0, 0.03);
      rail(S.metal, [[V.gx0 + 2, Y0 - 1.0, ZG + 0.4], [V.gx1 - 2, Y0 - 1.0, ZG + 0.4]], 1.0, 2.0, 0.03);
      /* forward and after houses, glazed */
      var fh = oct(V.fh[0], V.gx1 - 0.3, Y0 - 0.5, Y1 + 0.5, 1.5, 1.0, 0.1, 0.1), ah = oct(V.gx0 + 0.3, V.ah[1], Y0 - 0.5, Y1 + 0.5, 0.1, 0.1, 1.5, 1.0);
      prism(S.sup, fh, ZG + 0.4, V.fh[2]); prism(S.sup, ah, ZG + 0.4, V.ah[2]);
      [0, 1, 2, 3, 4].forEach(function (k) { panel(S.glass, fh, ZG, fh, V.fh[2], k, 0.06, 0.94, V.fh[2] - 1.8, V.fh[2] - 0.8, 0.05); });
      [0, 4, 5, 6, 7].forEach(function (k) { panel(S.glass, ah, ZG, ah, V.ah[2], k, 0.06, 0.94, V.ah[2] - 1.8, V.ah[2] - 0.8, 0.05); });
      railBox(S.metal, V.fh[0] + 0.3, V.gx1 - 0.8, Y0 - 0.3, Y1 + 0.3, V.fh[2], 1.0);
      railBox(S.metal, V.gx0 + 0.8, V.ah[1] - 0.3, Y0 - 0.3, Y1 + 0.3, V.ah[2], 1.0);
      /* the forward block: corner faces at its front carry the 346s */
      var F = V.fb, fLo = oct(F[0], F[1], YC - 6.0, YC + 6.0, 5.0, 3.8, 0.1, 0.1), fHi = oct(F[2], F[3], YC - 5.4, YC + 5.4, 4.2, 3.2, 0.1, 0.1);
      frustum(S.sup, fLo, ZG + 0.4, fHi, F[4]);
      [1, 3].forEach(function (k) { panel(S.array, fLo, ZG + 0.4, fHi, F[4], k, 0.06, 0.94, ZG + 2.6, F[4] - 1.6, 0.08); });
      [0, 4].forEach(function (k) {
        for (i = 0; i < 6; i++) panel(S.glass, fLo, ZG + 0.4, fHi, F[4], k, 0.3 + i * 0.1, 0.36 + i * 0.1, F[4] - 2.2, F[4] - 1.4, 0.05);
      });
      panel(S.glass, fLo, ZG + 0.4, fHi, F[4], 2, 0.05, 0.95, F[4] - 2.4, F[4] - 1.2, 0.05);
      /* the tower over it (with its stacked platforms) and the mast */
      var Tw = V.tw;
      blk(S.sup, Tw[0], Tw[1], YC - 4.0, YC + 4.0, F[4] - 0.05, Tw[2]);
      for (i = 0; i < 3; i++) blk(S.sup, Tw[1] - 0.2, Tw[1] + 1.4, YC - 3.0, YC + 3.0, ZG + 4.0 + i * 3.0, ZG + 4.2 + i * 3.0);
      ladder(S.metal, [Tw[1] + 0.2, YC + 2.0, ZG + 0.4], [Tw[1] + 0.2, YC + 2.0, F[4]], [0, 1, 0], 0.6);
      var mc = V.mast, mLo = oct(mc[0] - 2.5, mc[0] + 2.5, YC - 2.2, YC + 2.2, 0.8, 0.8, 0.8, 0.8), mHi = oct(mc[0] - 1.5, mc[0] + 1.5, YC - 1.3, YC + 1.3, 0.5, 0.5, 0.5, 0.5);
      frustum(S.sup, mLo, Tw[2] - 0.05, mHi, mc[1]);
      boxZ(S.metal, mc[0], YC, mc[1] - 1.0, 0.3, 8.0, 0.25, 0);
      [-1, 1].forEach(function (e) {
        tube(S.metal, [mc[0], YC + e * 3.8, mc[1] - 0.75], [mc[0], YC + e * 3.8, mc[1] + 0.6], 0.04, 0.03, 3, false);
        tube(S.metal, [mc[0], YC + e * 3.8, mc[1] - 0.75], [mc[0], YC + e * 3.8, mc[1] - 2.0], 0.04, 0.03, 3, false);
      });
      /* the Type 382 on the masthead: pedestal, the planar array tilted
         back, its back frame [L2] */
      cylZ(S.sup, mc[0], YC, mc[1], 1.2, 0.7, 10);
      obox(S.dark, [mc[0] + 0.3, YC, mc[1] + 2.9], [Math.cos(0.26), 0, Math.sin(0.26)], [0, 1, 0], [-Math.sin(0.26), 0, Math.cos(0.26)], 0.4, 4.6, 3.0);
      obox(S.metal, [mc[0] - 0.15, YC, mc[1] + 2.8], [Math.cos(0.26), 0, Math.sin(0.26)], [0, 1, 0], [-Math.sin(0.26), 0, Math.cos(0.26)], 0.5, 1.2, 2.2);
      tube(S.metal, [mc[0] - 1.8, YC + 0.8, mc[1] - 1.0], [mc[0] - 1.8, YC + 0.8, V.pole], 0.12, 0.05, 5, false);
      /* the after block, taller, the funnel casing on it; aft of it the
         lower end block with its sloped back and corner faces */
      var B = V.ab, bLo = rect(B[0], B[1], YC - 5.5, YC + 5.5), bHi = rect(B[2], B[3], YC - 5.0, YC + 5.0);
      frustum(S.sup, bLo, ZG + 0.4, bHi, B[4]);
      var Q = V.ae, eLo = oct(Q[0], Q[1], YC - 6.0, YC + 6.0, 0.1, 0.1, 4.0, 3.4), eHi = oct(Q[2], Q[1], YC - 5.4, YC + 5.4, 0.1, 0.1, 3.4, 2.9);
      frustum(S.sup, eLo, ZG + 0.4, eHi, Q[3]);
      [5, 7].forEach(function (k) { panel(S.array, eLo, ZG + 0.4, eHi, Q[3], k, 0.06, 0.94, ZG + 2.6, Q[3] - 1.6, 0.08); });
      panel(S.glass, eLo, ZG + 0.4, eHi, Q[3], 6, 0.1, 0.9, Q[3] - 2.4, Q[3] - 1.4, 0.05);
      railBox(S.metal, Q[2] + 0.4, Q[1] - 0.3, YC - 5.0, YC + 5.0, Q[3], 1.0);
      [0, 2].forEach(function (k) {
        panel(S.dark, bLo, ZG + 0.4, bHi, B[4], k, 0.3, 0.7, ZG + 1.0, ZG + 4.5, 0.05);
        for (i = 0; i < 5; i++) panel(S.glass, bLo, ZG + 0.4, bHi, B[4], k, 0.2 + i * 0.12, 0.26 + i * 0.12, B[4] - 2.4, B[4] - 1.6, 0.05);
      });
      var fc = V.fun;
      blk(S.sup, fc[0], fc[1], YC - 3.6, YC + 3.6, B[4] - 0.05, fc[2]);
      blk(S.dark, fc[0] + 0.5, fc[1] - 0.5, YC - 3.1, YC + 3.1, fc[2], fc[2] + 0.15);
      railBox(S.metal, B[2] + 0.4, B[3] - 0.4, YC - 4.6, YC + 4.6, B[4], 1.0);
      /* domes in pairs [L1][L2], the tall white cylinder aft */
      V.domes.forEach(function (d) {
        [-1, 1].forEach(function (e) {
          cylZ(S.sup, d[0], YC + e * d[1], d[2], 0.7, d[3] * 0.55, 8);
          sphere(S.white, [d[0], YC + e * d[1], d[2] + 0.7 + d[3] * 0.6], d[3], 10, 5, false);
        });
      });
      cylZ(S.white, V.cyl[0], YC + 3.8, V.cyl[1], 3.4, 1.1, 10);
      /* whips on the houses */
      [-1, 1].forEach(function (e) {
        whip(S.metal, [V.gx1 - 1.5, YC + e * 5.2, V.fh[2]], [0, 0, 1], 6.0, 0.05);
        whip(S.metal, [V.gx0 + 1.5, YC + e * 5.2, V.ah[2]], [0, 0, 1], 6.0, 0.05);
      });
      blk(S.team, V.gx1 - 4.5, V.gx1 - 1.5, YC - 0.8, YC + 0.8, V.fh[2], V.fh[2] + 0.05);
      blk(S.team, (B[2] + B[3]) / 2 - 1.5, (B[2] + B[3]) / 2 + 1.5, YC + 3.7, YC + 4.4, B[4], B[4] + 0.05);
    }

    /* VARIANTS (drawn only where the photographs differ) */
    var VARIANTS = {
      liaoning: {
        name: "Liaoning", k: 0.00195, deck: "#6c6d6e", seed: 1601, ix0: -61.2, ix1: 6.7,
        bx0: -53.7, bx1: 2.6, zg: 21.3, gx0: -61.2, gx1: 6.7,
        fh: [-2.4, 0, 24.5], ah: [0, -50.4, 24.9],
        fb: [-26.4, -4.5, -24.5, -7.4, 32.1], tw: [-26.4, -15.6, 35.7], mast: [-23.1, 44.0], pole: 50.9,
        ab: [-47.1, -26.4, -46.6, -26.4, 36.0], ae: [-55.0, -46.9, -52.0, 32.1], fun: [-44.0, -30.0, 38.8],
        domes: [[-8.5, 4.0, 32.1, 1.0], [-17.6, 3.2, 35.7, 1.3], [-44.6, 3.6, 36.0, 1.2], [-50.8, 3.0, 32.1, 1.1]],
        cyl: [-49.0, 32.1],
        sponsons: [[61, 83, 16.0, 21.5, 12.3, "hq", 74, "c", 66], [61, 83, -16.5, -25.8, 12.3, "c", 74, "", 0],
                   [-145, -118, 19.0, 26.6, 12.3, "hq", -125, "c", -136], [-145, -118, -24.8, -33.5, 12.3, "hq", -125, "c", -136]],
        hullP: { seed: 1602, z0: -1, z1: 24, tile: 48, hull: "#8b9398", bottom: "#6f2b25", boot: "#7a2d27", boot0: -1.5, boot1: 0.6 },
        sup: "#99a1a6"
      },
      shandong: {
        name: "Shandong", k: 0.001826, deck: "#6a6c6d", seed: 1701, ix0: -72.7, ix1: -9.1,
        bx0: -66.0, bx1: -13.0, zg: 21.3, gx0: -72.7, gx1: -9.1,
        fh: [-15.5, 0, 25.6], ah: [0, -64.5, 25.6],
        fb: [-42.4, -20.3, -42.4, -25.4, 36.0], tw: [-37.5, -29.5, 38.4], mast: [-33.9, 45.5], pole: 52.0,
        ab: [-61.1, -42.4, -60.5, -42.4, 37.4], ae: [-67.2, -60.9, -64.0, 33.0], fun: [-58.0, -46.0, 39.6],
        domes: [[-26.5, 4.0, 36.0, 1.1], [-31.0, 3.4, 38.4, 1.2], [-47.5, 3.8, 37.4, 1.2], [-63.0, 3.4, 33.0, 1.1]],
        cyl: [-62.0, 33.0],
        /* the after starboard sponson extended (published), the island
           sponson run aft to the island's end [S1] */
        sc: [[-153.2, -21.0], [-149.1, -22.2], [-146.0, -36.5], [-105.3, -36.5], [-100.9, -33.0], [-76.0, -33.0],
             [-73.5, -35.3], [-8.0, -35.3], [4.5, -34.2], [26.0, -31.8], [31.0, -31.6], [32.0, -24.8], [48.0, -24.8],
             [56.8, -24.5], [61.2, -19.9], [82.7, -16.6], [87.5, -16.4], [109.4, -15.2], [131.3, -13.4], [148.8, -12.3], [153.2, -11.6]],
        sponsons: [[61, 83, 16.0, 21.5, 12.3, "hq", 74, "c", 66], [61, 83, -16.5, -25.8, 12.3, "c", 74, "", 0],
                   [-145, -118, 19.0, 26.6, 12.3, "hq", -125, "c", -136], [-145, -118, -24.8, -35.5, 12.3, "hq", -125, "c", -136]],
        hullP: { seed: 1702, z0: -1, z1: 24, tile: 48, hull: "#8b9398", bottom: "#6f2b25", boot: "#7a2d27", boot0: -1.5, boot1: 0.6 },
        sup: "#99a1a6"
      }
    };

    function build(THREE, M, C, vk) {
      var V = VARIANTS[vk] || VARIANTS.liaoning, H = hullFor(V), S = makeSinks(V.hullP), i;
      buildHull(S, H);
      /* the hangar openings under the two starboard lifts [L2] */
      LIFTS.forEach(function (L) { hullPatch(S.dark, H, -1, L[0] + 2.0, L[1] - 2.0, 3.0, 11.2, 0.06, 4, 2); });
      island(S, V);
      /* the four corner sponsons below the deck [L1][L3] and their mounts */
      V.sponsons.forEach(function (q) {
        sponson(S, q[0], q[1], q[2], q[3], q[4], 2.6);
        var sg = q[3] > 0 ? 1 : -1, ym = (q[2] + q[3]) / 2 + sg * 0.8;
        [[q[5], q[6]], [q[7], q[8]]].forEach(function (w) {
          if (w[0] === "hq") hq10(S, w[1], ym, q[4], sg * (q[0] > 0 ? 0.3 : 2.6));
          else if (w[0] === "c") t1130(S, w[1], ym, q[4], sg * (q[0] > 0 ? 0.5 : 2.5));
        });
      });
      /* galleries, nets and raft racks [L1] */
      galleries(S, H, PC0, 1, function (x) { return x > 92 || x < -148; },
                function (x) { return (x > -100 && x < -60) || (x > -40 && x < -10); });
      galleries(S, H, H.SC, -1, function (x) {
        return x > 92 || x < -148 || (x > V.ix0 - 1 && x < V.ix1 + 1) || (x > 4 && x < 32) || (x > -101 && x < -68) || (x > 60 && x < 84) || (x > -146 && x < -117);
      }, function (x) { return x > 34 && x < 58; });
      /* aerial masts lowered outboard */
      [40.0, 20.0, -80.0].forEach(function (x) { whip(S.metal, [x, H.EP(x) + 1.6, FD - 1.2], [-1, 0.06, 0], 8.5, 0.07); });
      [-110.0, 45.0].forEach(function (x) { whip(S.metal, [x, H.ES(x) - 1.6, FD - 1.2], [-1, -0.06, 0], 8.5, 0.07); });
      /* the boat bay under the starboard overhang [L2], two boats */
      [-26.0, -18.0].forEach(function (x) {
        var y = -(wAt(H, x, 9.0) + 1.6);
        boat(S.white, S.dark, x, y, 8.8, 0, 7.0, 2.5);
        [-2, 2].forEach(function (e) { blk(S.metal, x + e - 0.1, x + e + 0.1, y + 1.3, y - 1.3, 8.5, 8.8); });
        tube(S.metal, [x - 3.0, y, 11.4], [x + 3.0, y, 11.4], 0.08, 0.08, 4, false);
      });
      hullPatch(S.dark, H, -1, -30.0, -14.0, 7.6, 11.6, 0.03, 4, 2);
      [1, -1].forEach(function (sg) {
        scuttles(S, H, sg, -136, -100, 4.2, 6.6); scuttles(S, H, sg, 60, 122, 4.2, 7.4);
        scuttles(S, H, sg, -132, -104, 4.2, 9.2); scuttles(S, H, sg, 64, 118, 4.2, 10.0);
        /* the anchor in the bow flare, the cable up to the deck [L1] */
        var ax = 138.5, az = 8.0, w = wAt(H, ax, az);
        anchor(S.metal, S.dark, ax, sg * (w + 0.05), az, [0.5, sg, 0.2], 1.6);
        tube(S.metal, [ax - 1.5, sg * (Math.abs(sg > 0 ? H.EP(ax - 1.5) : H.ES(ax - 1.5)) - 0.6), H.deckZ(ax) - 1.3], [ax, sg * (w + 0.1), az + 0.8], 0.12, 0.12, 4, false);
        bollard(S.metal, -138.0, sg * (Math.abs(sg > 0 ? H.EP(-138) : H.ES(-138)) + 0.75), FD - 1.35, 0);
        mushroom(S.metal, -90.0, sg * (Math.abs(sg > 0 ? H.EP(-90) : H.ES(-90)) + 0.9), FD - 1.35, 0.18, 0.55);
      });
      var P = { sup: V.sup, array: "#8a9298", metal: 0x5f666b, bottom: V.hullP.bottom };
      var T = makeMats(THREE, C, P, hullTex(THREE, "plcHull" + V.name, V.hullP), deckTex(THREE, V, H));
      var g = new THREE.Group();
      ORDER.forEach(function (k) { var me = S[k].mesh(THREE, T[k]); if (me) g.add(me); });
      return g;
    }
    return { build: build, VARIANTS: VARIANTS };
  })();

  function build(THREE, M, C, which) {
    if (which === "fujian") return FJ.build(THREE, M, C);
    return LN.build(THREE, M, C, which);
  }
  return { build: build, VARIANTS: LN.VARIANTS };
})();

UNIT_MODELS["carrier_c"] = {
  len: 316.0,
  build: function (THREE, M, C) { return HeroPLACarriers.build(THREE, M, C, "fujian"); }
};
/* the row names the Liaoning first (2012); the Shandong is the "shandong"
   variant of the same builder (see the header) */
UNIT_MODELS["pla_e00_carrier"] = {
  len: 306.4,
  build: function (THREE, M, C) { return HeroPLACarriers.build(THREE, M, C, "liaoning"); }
};
