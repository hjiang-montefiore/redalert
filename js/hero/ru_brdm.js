/* ===== ru_brdm.js - HERO models: BRDM-1, the 9P110 Malyutka carrier on it, and the BRDM-2 =====
   Full-quality redo (owner 2026-10-24, the older Soviet set).  Keys kept, each drawn as its row names it
   (js/eras.js, js/rules.js, js/armour_specs.js):
     pact_e50_recon           BRDM-1 Scout Car, service 1957, turret:true (the pintle SGMB)
     pact_e60_tankdestroyer   9P110, six 9M14 Malyutka on a BRDM-1, 1963, turret:false
     pact_e60_recon, pact_e80_recon, pact_e90_recon, pact_e00_recon (e00), recon_p (e20)
                              BRDM-2 Scout Car, service 1962, turret:true.  Every row says it is the same
                              vehicle ("Unchanged and still in universal service"); none names a later
                              variant (no BRDM-2M-97 or the like), so one BRDM-2 is drawn for all five, only
                              the paint follows the period (see Paint).
   Build names kept: HeroRuBrdm.brdm1 / .td / .brdm2 (read by nothing else); .brdm2ru added for the paint.

   Published figures (en.wikipedia infoboxes "BRDM-1", "BRDM-2", fetched today; the rest kept from the old
   header, which had them from ru.wikipedia):
     BRDM-1  5.70 x 2.25 m, 1.90 m (game row; en.wikipedia's 2.9 m is not borne out by any photograph),
             wheelbase 2.80 m, clearance 0.315 m (en.wikipedia 0.34 m); GAZ-40P engine at the FRONT, crew
             compartment behind it (en.wikipedia); the SGMB on the front pintle from the obr. 1959 (en.wikipedia).
     9P110   en.wikipedia BRDM-1 variants: "9K14M launcher for 6 x 9M14 Malyutka".
     BRDM-2  5.75 x 2.37 m, 2.31 m, clearance 0.43 m, wheelbase 3.10 m (old header); KPVT with a PKT in the
             "small conical BPU-1 turret mounted on the hull in a central position above the belly wheels",
             which "has no top hatch opening"; the water-jet at the rear "covered with an armoured shutter while
             on land"; two pairs of chain-driven belly wheels (en.wikipedia).
   Corrected against the old file: the BPU-1 had a roof hatch (it has none) and stood on the rear half of the
     roof (it is central, over the belly wheels, x -0.10 here); the BRDM-2 crew compartment had near-upright
     flanks (they lean in hard to a roof about 1.4 m wide, head-on photograph [F2]); there was no water-jet
     shutter; the 9P110 had a closed box with no launcher (the brief and [A1] give it raised).

   References (Wikimedia Commons at width 960, cached in the scratchpad q_brdm_ref; no line drawing of any of
   the three exists on Commons, so the shapes come from near-square side and head-on photographs plus the
   published figures):
     [S1] "BRDM-1 TBiU 24 3.jpg"  BRDM-1 square side, nose left: the side drawing (171 px a metre on the 2.80 m
          wheelbase; the overhangs taken to the published 5.70 m).
     [P]  "BRDM-1 on a parade in Russia.JPG"  front three-quarters: bow, lamps, paint of the present day.
     [M1] "Malyutka BRDM-1 ATM in Museum of technique 2016-08-16.JPG"  9P110 front three-quarters, travel order.
     [M2] "9P110 combat vehicle 9K14 Malyutka ATGM system ... Artillery museum, Saint-Petersburg pic1/2/3.JPG"
          head-on [F1] and both quarters, travel order: the bow, lamps, grilles, the bay boxed to roof height.
     [A1] "Soviet AT-3 Sagger missiles mounted on two BDRM-1.JPEG"  two 9P110 from above, launchers raised: the
          lid lifted clear of the bay on the launcher, the rails under it, the comb of fins on the front deck.
     [S2] "BRDM-2 on display.JPEG" (right side), "Skarzysko BRDM-2 02.jpg" [K2'] (left side, belly wheels down):
          the side drawing, scaled to the published 3.10 m wheelbase.
     [F2] "Skarzysko BRDM-2 01.jpg"  head-on (287 px a metre on the 2.35 m beam): the section.
     [K2] "BRDM-2 in the Kubinka Tank Museum.jpg"  front three-quarters: the turret, the trim vane folded flat.

   Recognition list (each shows at game zoom), what it rests on, where it is in the code:
     1. Four big cross-country tyres far apart on a short boat hull, deep round arches [S1][S2]: hull(), wheels().
     2. The boat hull: a long raked lower bow plate up to a blunt full-width beak, slab flanks [S1][F1][S2][F2]:
        H1/H2 tables, hull().
     3. The belly wheels between the axles, two a side, retracted under the belly [S1][K2'] (en.wikipedia): wheels().
     4. BRDM-1: the long front deck over the engine with the comb of louvre fins along each edge and the two
        grilles [S1][A1][F1]: brdm1Body.
     5. BRDM-1: the crew compartment behind it, raked front with the two vision hatches, leaning flanks with round
        ports [S1][F1]: brdm1Body.
     6. BRDM-1: the SGMB high on its pintle at the front of the compartment [S1]: sgmb (the "turret").
     7. 9P110: the bay boxed up to roof height behind the crew compartment [M1][M2], and the six-rail launcher
        raised out of it with the armoured lid on top, six 9M14 under it [A1]: td9p110.
     8. BRDM-2: the crew compartment with the raked two-window windscreen, its covers raised, and the flanks
        leaning in hard with vision blocks and the oval port [F2][S2][K2]: brdm2Body.
     9. BRDM-2: the low conical BPU-1 with the long KPVT, central over the belly wheels (en.wikipedia) [S2][K2]:
        bpuTurret.
    10. BRDM-2: the low engine hood on the rear deck with its louvred intakes; the water-jet's triangular shutter
        in the stern plate [S2] (en.wikipedia): brdm2Body.
    11. Lamps: on each side a headlamp and an outer lamp in a tube guard at the bow corners [F1][F2][P]: lamp().
    12. The side step ribs pressed low into the flanks between the arches [S1][S2]: ribs().

   Station tables (model x, m; +X nose).  Hull side: belly edge, arches, bow, deck edge (H1 / H2 below).
     BRDM-1: axles +1.40 / -1.40, arches r 0.66 about z 0.50; beak x 3.05 z 1.20-1.28; lower bow plate to
       (2.28, 0.44); deck 1.28 at the beak rising to 1.46 at x 1.30; stern x -2.65, plate 1.42-0.70; belly 0.33;
       crew compartment roof 1.86 from x 0.12 to -1.32 (9P110: to -0.55, then the bay to the stern, top 1.84).
     BRDM-2: axles +1.55 / -1.55, arches r 0.72 about z 0.55; beak x 2.93 z 1.04-1.10; lower bow plate to
       (2.40, 0.50), the slab stopping at the bow chine [F2]; deck 1.42; stern x -2.78, plate 1.40-0.80; belly 0.43; windscreen 2.20 / 1.46 to 1.75 /
       1.92; roof 1.92, 1.36-1.40 m wide, from x 1.75 to -1.05; rear plate to (-1.45, 1.46); engine hood 1.56.
   Paint: Soviet protective green #535b3c (the BTR-60PB / BTR-152 heroes' green; [M2] and [K2] agree in hue under
     museum light) for the BRDM-1, the 9P110 and the BRDM-2 of e60 / e80 / e90; the duller present-day Russian
     green of [P] (sampled 100, 104, 96 in sun, taken to about 0.75, #4b5143) for e00 and recon_p.  No numbers,
     stars or markings (the photographed "DE-6454", "320", "913" are not drawn).
   NOT CONFIRMED (drawn as approximations): the 9P110 launcher's lift (two columns here) and the exact rail
     spacing - [A1] is the only photograph of it raised and is taken from above, so the six rounds are drawn side
     by side under the lid as the six-rail launcher and the lid width allow; the raised height (lid at 2.39 m);
     the BRDM-1 track (1.60 m) and the BRDM-2 track (1.84 m) from memory of ru.wikipedia, not re-fetched; which
     side of the BPU-1 the KPVT sits (left here, as the BTR hero); the drum on the BRDM-1's rear deck (in [S1],
     purpose unknown).  Not drawn: antennas, stowage, the optional side pintles, the 9P111 East German fittings.
   Game data note (not edited): js/damage3d.js marks pact_e50_recon "rear" engine; the BRDM-1's engine is at
     the front (en.wikipedia).

   Nodes: "turret" (BRDM-1 SGMB, origin on its socket; BRDM-2 BPU-1, origin on the ring centre on the roof;
   none on the 9P110, turret:false), two "roadwheel" axle groups (local Y the axle, both tyres in each), as the
   BTR heroes do.  No "podelev": render3d swings a podelev about its pitch axis only, and the 9P110 launcher
   lifts straight up out of the bay; launcher3d_check and deploypose_check do not cover this row.
   Drawn (L x W x H): BRDM-1 5.72 x 2.27 x 2.27 m with the SGMB (hull 1.90; published 5.70 x 2.25 x 1.90); 9P110
   5.72 x 2.27 x 2.41 m, launcher up; BRDM-2 5.75 x 2.37 x 2.30 m (published 5.75 x 2.37 x 2.31).  Triangles 10352 / 11056 /
   10000, draw calls 10 / 8 / 11.
   Materials 6: paint (canvas texture, planar UVs), dark, glass, lamp, wheel (vertex colours), C.team (short
   strips facing up).  +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.                         */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRuBrdm = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so the paint never stretches */
  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };

  /* a closed solid.  Whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not.
     smooth: average the face normals at shared corners (cast surfaces) */
  function solid(bin, V, F, smooth) {
    var vol = 0, i, f, a, b, c, N = null, fn, k, q;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var flip = vol < 0;
    if (smooth) {
      N = [];
      for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
        q = [a, b, c];
        for (k = 0; k < 3; k++) { N[q[k]][0] += fn[0]; N[q[k]][1] += fn[1]; N[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < N.length; i++) N[i] = unit(N[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;                  /* a crease slit */
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
    }
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side.
     The faces are written outward directly, so a cap can be left off. */
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg, nocapA, nocapB) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocapA, nocapB); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }

  /* ear clipping, for the end plates of the lofts (some are not convex) */
  function inTri(p, a, b, c) {
    var d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
    var d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
    var d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
    var neg = (d1 < -1e-12) || (d2 < -1e-12) || (d3 < -1e-12), pos = (d1 > 1e-12) || (d2 > 1e-12) || (d3 > 1e-12);
    return !(neg && pos);
  }
  function earclip(P) {
    var n = P.length, idx = [], out = [], i, k, m, area = 0, a, b, c, i0, i1, i2, ok, found, guard = 0, q;
    for (i = 0; i < n; i++) { a = P[i]; b = P[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; idx.push(i); }
    if (area < 0) idx.reverse();
    while (idx.length > 3 && guard++ < 400) {
      m = idx.length; found = false;
      for (i = 0; i < m && !found; i++) {
        i0 = idx[(i + m - 1) % m]; i1 = idx[i]; i2 = idx[(i + 1) % m];
        a = P[i0]; b = P[i1]; c = P[i2];
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-12) continue;
        ok = true;
        for (k = 0; k < m; k++) {
          q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          if (inTri(P[q], a, b, c)) { ok = false; break; }
        }
        if (ok) { out.push([i0, i1, i2]); idx.splice(i, 1); found = true; }
      }
      if (!found) break;
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    else for (i = 1; i < idx.length - 1; i++) out.push([idx[0], idx[i], idx[i + 1]]);   /* give up cleanly */
    return out;
  }

  /* a skin lofted through cross-section rings (arrays of [x, y, z] with the
     same count each), capped at both ends.  Rings are re-ordered so they run
     counter-clockwise in the YZ plane, whatever the caller wrote. */
  function loft(bin, rings, smooth) {
    var m = rings.length, n = rings[0].length, V = [], F = [], i, j, k, R = [], area = 0, a, b, T, b0, ri, tr;
    for (j = 0; j < n; j++) { a = rings[0][j]; b = rings[0][(j + 1) % n]; area += a[1] * b[2] - b[1] * a[2]; }
    for (i = 0; i < m; i++) R.push(area < 0 ? rings[i].slice().reverse() : rings[i]);
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (ri = 0; ri < 2; ri++) {
      T = earclip(R[ri ? m - 1 : 0].map(function (p) { return [p[1], p[2]]; }));
      b0 = V.length;
      for (j = 0; j < n; j++) V.push(R[ri ? m - 1 : 0][j]);
      for (tr = 0; tr < T.length; tr++) {
        if (ri) F.push([b0 + T[tr][0], b0 + T[tr][1], b0 + T[tr][2]]);
        else F.push([b0 + T[tr][0], b0 + T[tr][2], b0 + T[tr][1]]);
      }
    }
    solid(bin, V, F, smooth);
  }
  /* canvas paint: one flat coat of Russian green gone patchy with weather, rain streaks down the faces and faint
     panel seams.  Planar UVs at 0.34 a metre (Bin.tri), so the 256 px tile spans about 2.9 m and repeats. */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* rain and dust streaks, running down (v is height on the side faces) */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.06)" : "rgba(214,208,180,0.05)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 18 + R() * 60);
      }
      /* faint panel seams and a few rivet rows */
      q.fillStyle = "rgba(18,18,12,0.16)";
      q.fillRect(0, 86, 256, 2); q.fillRect(0, 214, 256, 2); q.fillRect(118, 0, 2, 256);
      q.fillStyle = "rgba(18,18,12,0.12)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 2, 92, 2, 2); q.fillRect(124, i * 8 + 3, 2, 2); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var d = sub(B, A), L = Math.sqrt(dot(d, d)), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }

  /* ---------------------------------------------------------------- more kit */
  /* a vertex-coloured bin (the wheels: rubber and painted hubs in one draw call); colours are linear */
  function VBin(mat) { Bin.call(this, mat, false); this.C = []; this.col = [0.02, 0.02, 0.02]; }
  VBin.prototype.tri = function (a, b, c, na, nb, nc) {
    Bin.prototype.tri.call(this, a, b, c, na, nb, nc);
    var k = this.col;
    this.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]);
  };
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }

  function lathe(bin, prof, cx, cy, seg, smooth) {
    var V = [], F = [], i, j, k, a, m = prof.length;
    for (i = 0; i < m; i++) for (j = 0; j < seg; j++) {
      a = (j + 0.5) / seg * TAU;
      V.push([cx + prof[i][1] * Math.cos(a), cy + prof[i][1] * Math.sin(a), prof[i][0]]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % seg;
      F.push([i * seg + j, i * seg + k, (i + 1) * seg + k], [i * seg + j, (i + 1) * seg + k, (i + 1) * seg + j]);
    }
    V.push([cx, cy, prof[0][0]], [cx, cy, prof[m - 1][0]]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j], [m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F, smooth);
  }
  /* a solid between two convex plan outlines with the same corner count (bottom at z0, top at z1) */
  function frust(bin, bot, top, z0, z1) {
    var n = bot.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([bot[i][0], bot[i][1], z0]);
    for (i = 0; i < n; i++) V.push([top[i][0], top[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }

  /* ---------------------------------------------------------------- shared helpers */
  function lerp(a, b, t) { return a + (b - a) * t; }
  /* piecewise-linear lookup in a station table [[x, v], ...] sorted by x */
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) return lerp(T[i][1], T[i + 1][1], (x - T[i][0]) / (T[i + 1][0] - T[i][0]));
    return T[T.length - 1][1];
  }
  /* a flat plate: an (x, z) outline extruded across y0..y1, wound outward */
  function plateXZ(bin, poly, y0, y1) {
    var P = poly.slice(), n = P.length, area = 0, i, k, T, V = [], F = [], t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    for (i = 0; i < n; i++) { k = (i + 1) % n; area += P[i][0] * P[k][1] - P[k][0] * P[i][1]; }
    if (area < 0) P.reverse();
    T = earclip(P);
    for (i = 0; i < n; i++) V.push([P[i][0], y0, P[i][1]]);
    for (i = 0; i < n; i++) V.push([P[i][0], y1, P[i][1]]);
    for (i = 0; i < T.length; i++) { F.push([T[i][0], T[i][1], T[i][2]]); F.push([n + T[i][0], n + T[i][2], n + T[i][1]]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, n + k, k], [i, n + i, n + k]); }
    solid(bin, V, F);
  }
  /* the wheel-arch notch in a side outline: from the rear foot over the crown to the front foot */
  function arch(xc, zc, r, n) {
    var o = [], i, a;
    for (i = 0; i <= n; i++) { a = Math.PI - Math.PI * i / n; o.push([xc + r * Math.cos(a), zc + r * Math.sin(a)]); }
    return o;
  }
  /* a hull cross-section: flat belly hb wide at zb, the boat chine up to the side at zc, the side to zt */
  function coreRing(x, hw, zb, zt, ch) {
    var zc = Math.min(zb + ch * 0.55, zt - 0.03), hb = Math.max(0.15, hw - ch);
    return [[x, -hb, zb], [x, hb, zb], [x, hw, zc], [x, hw, zt], [x, -hw, zt], [x, -hw, zc]];
  }
  /* a superstructure section: base half-width bw at zb, roof half-width tw at zt */
  function trapRing(x, bw, zb, tw, zt) { return [[x, -bw, zb], [x, bw, zb], [x, tw, zt], [x, -tw, zt]]; }

  /* the hull, built as the benchmark heroes build a wheeled hull: three full-width lofted blocks (bow, belly
     between the axles, stern), a narrow core through each wheel well with a ceiling over it, and a slab side
     plate each flank with the two arches cut out of it, so the arches have depth and the tyres show. */
  function hull(B, H) {
    var s, i, x, rings, blocks = [[H.xb, H.xr0], [H.xr1, H.xf0], [H.xf1, H.xs]], wells = [[H.xr0, H.xr1], [H.xf0, H.xf1]];
    for (i = 0; i < 3; i++) {
      rings = [];
      H.stations.forEach(function (sx) { if (sx >= blocks[i][0] - 1e-6 && sx <= blocks[i][1] + 1e-6) rings.push(sx); });
      if (rings[0] > blocks[i][0] + 1e-6) rings.unshift(blocks[i][0]);
      if (rings[rings.length - 1] < blocks[i][1] - 1e-6) rings.push(blocks[i][1]);
      loft(B.paint, rings.map(function (sx) { return coreRing(sx, H.wc, tab(H.zb, sx), tab(H.zt, sx), H.chT ? tab(H.chT, sx) : H.ch); }), false);
    }
    for (i = 0; i < 2; i++) {
      x = wells[i];
      loft(B.paint, [coreRing(x[0], H.n, tab(H.zb, x[0]), tab(H.zt, x[0]), 0.16), coreRing(x[1], H.n, tab(H.zb, x[1]), tab(H.zt, x[1]), 0.16)], false);
      for (s = -1; s <= 1; s += 2) {
        box(B.paint, x[0], x[1], s * H.n, s * H.wc, H.az + H.ar - 0.01, tab(H.zt, (x[0] + x[1]) / 2) - 0.01);
        box(B.dark, x[0] + 0.02, x[1] - 0.02, s * H.n, s * (H.n + 0.012), H.zsill, H.az + H.ar);   /* the well's inner wall */
      }
    }
    /* the side plate outline: belly edge stern to bow with the arch notches, then the deck edge back */
    var P = [[H.xb, tab(H.zb, H.xb) + 0.02]];
    H.sideLow.forEach(function (p) { P.push(p); });
    P = P.concat(arch(H.xr, H.az, H.ar, 18));
    P.push([H.xr1, H.zsill], [H.xf0, H.zsill]);
    P = P.concat(arch(H.xf, H.az, H.ar, 18));
    H.sideBow.forEach(function (p) { P.push(p); });
    for (i = H.deck.length - 1; i >= 0; i--) P.push(H.deck[i]);
    /* drop points that repeat (an arch foot on the sill) */
    var Q = [];
    P.forEach(function (p) { var q = Q[Q.length - 1]; if (!q || Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) > 1e-4) Q.push(p); });
    for (s = -1; s <= 1; s += 2) plateXZ(B.paint, Q, s * (H.w - 0.045), s * H.w);
  }

  /* a tyre on the Y axis at (0, yc, 0): lugged cross-country tread, disc wheel, eight studs */
  function tyre(VB, rt, tw, yc, s, ph, HUBC) {
    var N = 24, hw = tw / 2, prof = [[0.56, -1.0, 0], [0.70, -1.0, 0], [0.86, -0.97, 0], [0.96, -0.80, 0], [1.0, -0.42, 1],
                                     [1.0, 0.42, 2], [0.96, 0.80, 0], [0.86, 0.97, 0], [0.70, 1.0, 0], [0.56, 1.0, 0]];
    var V = [], F = [], i, j, k, m = prof.length, r, a;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = prof[i][0] * rt;
      if (prof[i][2] && ((j + prof[i][2]) % 2)) r -= 0.035;
      a = (j + ph) / N * TAU;
      V.push([r * Math.cos(a), yc + prof[i][1] * hw, r * Math.sin(a)]);
    }
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N; var i2 = (i + 1) % m;
      F.push([i * N + j, i * N + k, i2 * N + k], [i * N + j, i2 * N + k, i2 * N + j]);
    }
    VB.col = RUB;
    solid(VB, V, F, true);
    VB.col = HUBC;
    var yf = yc + s * hw * 0.78;
    cyl(VB, [0, yf, 0], [0, yc - s * hw * 0.78, 0], 0.565 * rt, 0.565 * rt, 18);
    cyl(VB, [0, yf, 0], [0, yf + s * 0.02, 0], 0.50 * rt, 0.44 * rt, 18);
    cyl(VB, [0, yf, 0], [0, yf + s * 0.07, 0], 0.22 * rt, 0.18 * rt, 12);
    VB.col = NUT;
    cyl(VB, [0, yf + s * 0.07, 0], [0, yf + s * 0.10, 0], 0.12 * rt, 0.09 * rt, 10);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      cyl(VB, [0.30 * rt * Math.cos(a), yf, 0.30 * rt * Math.sin(a)], [0.30 * rt * Math.cos(a), yf + s * 0.03, 0.30 * rt * Math.sin(a)], 0.02, 0.02, 6);
    }
  }
  function vGeo(THREE, VB) {
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(VB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(VB.N), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VB.C), 3));
    return geo;
  }
  /* two axle groups named "roadwheel" (local Y the axle, both tyres in each), as the BTR heroes do, and the
     four belly wheels drawn retracted, static, just showing under the belly between the axles */
  function wheels(THREE, g, T, H, HUBC) {
    var i, VB, wg, s;
    for (i = 0; i < 2; i++) {
      VB = new VBin(T.wheel);
      tyre(VB, H.rt, H.tw, H.trk, 1, 0, HUBC);
      tyre(VB, H.rt, H.tw, -H.trk, -1, 0.5, HUBC);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(i ? H.xr : H.xf, 0, H.rt);
      wg.add(new THREE.Mesh(vGeo(THREE, VB), T.wheel));
      g.add(wg);
    }
    VB = new VBin(T.wheel);
    for (i = 0; i < H.belly.length; i++) for (s = -1; s <= 1; s += 2) {
      var ox = H.belly[i], oz = H.bz, tmp = new VBin(T.wheel), j;
      tyre(tmp, H.br, 0.20, s * H.by, s, 0.25, HUBC);
      for (j = 0; j < tmp.P.length; j += 3) VB.P.push(tmp.P[j] + ox, tmp.P[j + 1], tmp.P[j + 2] + oz);
      for (j = 0; j < tmp.N.length; j++) { VB.N.push(tmp.N[j]); VB.C.push(tmp.C[j]); }
      /* the swing arm the chain drive lowers it on, up into the belly */
      box(B_ARM, ox - 0.05, ox + 0.05, s * H.by - 0.05, s * H.by + 0.05, oz, H.zbelly + 0.12);
    }
    g.add(new THREE.Mesh(vGeo(THREE, VB), T.wheel));
  }
  var B_ARM = null;

  /* a headlamp facing forward with its rim; a guard hoop of tube round the outer ones */
  function lamp(B, x, y, z, r, guard) {
    cylX(B.dark, x - 0.16, x - 0.02, y, z, r * 1.05, 12);
    cylX(B.lamp, x - 0.02, x, y, z, r * 0.9, 12);
    cylZ(B.dark, x - 0.10, y, z - 0.16, z - r * 0.8, 0.025, 6);
    if (guard) {
      bar(B.dark, [x + 0.06, y - r - 0.05, z - 0.14], [x + 0.06, y - r - 0.05, z + r + 0.04], 0.018);
      bar(B.dark, [x + 0.06, y + r + 0.05, z - 0.14], [x + 0.06, y + r + 0.05, z + r + 0.04], 0.018);
      bar(B.dark, [x + 0.06, y - r - 0.05, z + r + 0.04], [x + 0.06, y + r + 0.05, z + r + 0.04], 0.018);
      bar(B.dark, [x + 0.06, y - r - 0.05, z + r + 0.04], [x - 0.14, y - r - 0.05, z + r + 0.04], 0.018);
      bar(B.dark, [x + 0.06, y + r + 0.05, z + r + 0.04], [x - 0.14, y + r + 0.05, z + r + 0.04], 0.018);
    }
  }
  /* a flat panel lying on the plane through three points (a hatch, a cover, the trim vane) */
  function onPlane(bin, A, Bp, Cp, out, u0, u1, w0, w1, h0, h1) {
    var U = unit(sub(Bp, A)), Wv = unit(sub(Cp, A)), N = unit(cross(U, Wv));
    if (dot(N, out) < 0) N = [-N[0], -N[1], -N[2]];
    Wv = cross(N, U);
    planeBox(bin, A, U, Wv, N, u0, u1, w0, w1, h0, h1);
  }
  /* the side step ribs pressed low into each flank, between the arches (all side photographs) */
  function ribs(B, w, list) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < list.length; i++)
      box(B.paint, list[i][0], list[i][1], s * w, s * (w + 0.012), list[i][2], list[i][2] + 0.045);
  }

  /* ================================================================= BRDM-1 (and the 9P110 on its hull) */
  /* stations from the square side photograph [S1] (171 px a metre on the 2.80 m wheelbase), overhangs
     taken to the published 5.70 m; widths from the head-on photograph [F1] */
  var H1 = {
    xb: -2.65, xs: 3.05, xf: 1.40, xr: -1.40, ar: 0.66, az: 0.50, rt: 0.53, tw: 0.30, trk: 0.80,
    w: 1.125, wc: 1.095, n: 0.60, ch: 0.30, zsill: 0.42, zbelly: 0.33,
    zb: [[-2.65, 0.70], [-2.25, 0.40], [-2.06, 0.33], [2.06, 0.33], [2.28, 0.44], [3.05, 1.20]],
    zt: [[-2.65, 1.42], [1.30, 1.46], [3.05, 1.28]],
    stations: [-2.65, -2.45, -2.25, -2.06, -0.74, 0.0, 0.74, 2.06, 2.28, 2.70, 3.05],
    sideLow: [[-2.25, 0.45], [-2.06, 0.47]],
    sideBow: [[2.06, 0.47], [2.28, 0.50], [3.05, 1.20]],
    deck: [[-2.65, 1.42], [1.30, 1.46], [3.05, 1.28]],
    br: 0.27, by: 0.86, bz: 0.50, belly: [0.38, -0.40]
  };
  H1.xr0 = H1.xr - H1.ar; H1.xr1 = H1.xr + H1.ar; H1.xf0 = H1.xf - H1.ar; H1.xf1 = H1.xf + H1.ar;

  function brdm1Body(B, td) {
    var s, i, x, z, d = function (xx) { return tab(H1.zt, xx); };
    hull(B, H1);
    ribs(B, H1.w, [[-0.62, 0.62, 0.72], [-0.62, -0.06, 0.56], [0.06, 0.62, 0.56]]);
    /* the crew compartment: raked front plate, flat roof, flanks leaning in [S1][F1][O]; on the 9P110 it stops
       at the launcher bay */
    var rings = [trapRing(0.62, 1.00, 1.44, 0.92, 1.50), trapRing(0.12, 1.06, 1.44, 0.74, 1.86)];
    if (td) rings.push(trapRing(-0.55, 1.06, 1.42, 0.76, 1.86));
    else rings.push(trapRing(-1.32, 1.06, 1.42, 0.78, 1.86), trapRing(-1.66, 1.04, 1.42, 0.94, 1.47));
    loft(B.paint, rings, false);
    /* the two front vision hatches in the raked plate, armoured lids shut, each with a slit [F1][O] */
    var fA = [0.62, 0, 1.50], fB = [0.12, 0, 1.86];
    for (s = -1; s <= 1; s += 2) {
      onPlane(B.paint, fA, fB, [0.62, 1, 1.50], [1, 0, 1], 0.10, 0.50, s > 0 ? 0.08 : -0.50, s > 0 ? 0.50 : -0.08, 0, 0.035);
      onPlane(B.glass, fA, fB, [0.62, 1, 1.50], [1, 0, 1], 0.40, 0.44, s > 0 ? 0.14 : -0.44, s > 0 ? 0.44 : -0.14, 0.035, 0.05);
      cylZ(B.dark, 0.06, s * 0.30, 1.86, 1.92, 0.07, 10);                         /* periscope heads on the roof */
    }
    /* roof hatches over the crew compartment */
    for (s = -1; s <= 1; s += 2) { cylZ(B.paint, -0.25, s * 0.36, 1.86, 1.89, 0.22, 16); cylZ(B.dark, -0.25, s * 0.36, 1.89, 1.905, 0.05, 8); }
    for (s = -1; s <= 1; s += 2) {
      /* round vision ports in the flanks of the compartment [S1] */
      var lean = (1.06 - 0.76) / (1.86 - 1.42), zp = 1.66, yp = 1.06 - (zp - 1.42) * lean;
      cyl(B.glass, [-0.30, s * (yp - 0.01), zp], [-0.30, s * (yp + 0.025), zp + 0.025 * lean], 0.07, 0.07, 10);
      if (!td) cyl(B.glass, [-1.05, s * (yp - 0.01), zp], [-1.05, s * (yp + 0.025), zp + 0.025 * lean], 0.07, 0.07, 10);
    }
    /* the front deck over the engine: two radiator grilles ahead of the compartment [F1][O], the comb of
       louvre fins along each deck edge [S1][O], the filler caps, the bow bollard [F1] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.70, 1.02, s * 0.06, s * 0.42, d(0.86) - 0.005, d(0.86) + 0.02);
      for (i = 0; i < 4; i++) box(B.paint, 0.73 + i * 0.075, 0.76 + i * 0.075, s * 0.07, s * 0.41, d(0.86) + 0.02, d(0.86) + 0.05);
      for (i = 0; i < 8; i++) {
        x = 0.62 + i * 0.12; z = d(x);
        planeBox(B.paint, [x, s * 0.92, z], [0.6, 0, 0.8], [0, s, 0], [-0.8, 0, 0.6], 0, 0.12, -0.13, 0.13, -0.02, 0.02);
      }
      cylZ(B.paint, 1.70, s * 0.42, d(1.70), d(1.70) + 0.04, 0.14, 12);
    }
    for (i = 0; i < 2; i++) for (x = 0; x < 4; x++) box(B.dark, 1.45 + x * 0.10, 1.52 + x * 0.10, 0.08 + i * 0.16, 0.20 + i * 0.16, d(1.6) - 0.005, d(1.6) + 0.012);
    cylZ(B.dark, 2.55, 0, d(2.55) - 0.02, d(2.55) + 0.14, 0.055, 10);
    cylZ(B.dark, 2.55, 0, d(2.55) + 0.12, d(2.55) + 0.16, 0.085, 10);
    /* lamps: the headlamp inboard on the deck, the outer lamp in its guard at the corner [F1][P] */
    for (s = -1; s <= 1; s += 2) { lamp(B, 2.52, s * 0.72, d(2.52) + 0.17, 0.10, false); lamp(B, 2.70, s * 0.97, d(2.70) + 0.16, 0.085, true); }
    /* the trim vane folded flat on the lower bow plate, its tube frame [F1][P] */
    onPlane(B.paint, [2.28, 0, 0.44], [3.05, 0, 1.20], [2.28, 1, 0.44], [1, 0, -0.6], 0.18, 0.92, -0.86, 0.86, 0, 0.03);
    onPlane(B.dark, [2.28, 0, 0.44], [3.05, 0, 1.20], [2.28, 1, 0.44], [1, 0, -0.6], 0.20, 0.26, -0.90, 0.90, 0.03, 0.07);
    for (s = -1; s <= 1; s += 2) onPlane(B.dark, [2.28, 0, 0.44], [3.05, 0, 1.20], [2.28, 1, 0.44], [1, 0, -0.6], 0.20, 0.80, s * 0.86 - 0.025, s * 0.86 + 0.025, 0.03, 0.07);
    /* tow hooks low on the bow */
    for (s = -1; s <= 1; s += 2) box(B.dark, 2.30, 2.42, s * 0.62 - 0.04, s * 0.62 + 0.04, 0.40, 0.48);
    if (!td) {
      /* the rear deck: the round drum on the starboard quarter [S1], two grab handles at the stern [S1] */
      cylY(B.dark, -1.82, -0.78, -0.46, 1.62, 0.17, 14);
      cylY(B.paint, -1.82, -0.80, -0.78, 1.62, 0.15, 14);
      for (s = -1; s <= 1; s += 2) {
        bar(B.dark, [-2.10, s * 0.88, 1.42], [-2.18, s * 0.88, 1.66], 0.03);
        bar(B.dark, [-2.18, s * 0.88, 1.66], [-2.46, s * 0.88, 1.66], 0.03);
        bar(B.dark, [-2.46, s * 0.88, 1.66], [-2.54, s * 0.88, 1.42], 0.03);
      }
      for (s = -1; s <= 1; s += 2) box(B.team, -2.50, -1.98, s * 0.66, s * 0.80, 1.42, 1.445);
    } else {
      td9p110(B);
    }
    /* tail lamps */
    for (s = -1; s <= 1; s += 2) box(B.lamp, -2.67, -2.64, s * 0.86 - 0.05, s * 0.86 + 0.05, 1.28, 1.34);
  }

  /* ---- the 9P110 launcher bay and its six-rail launcher, raised ----
     The bay behind the crew compartment is boxed up to roof height [M1][M2]; in travel order its armoured lid
     closes it flush.  Raised [A1], the lid rides up on top of the launcher with the six 9M14 on their rails
     under it, pointing forward. */
  function td9p110(B) {
    var s, i, y, xb0 = -2.62, xb1 = -0.55, zt = 1.84;
    /* the bay walls, vertical over the hull flanks, and its rear plate */
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.paint, [xb0, s * 1.125, 1.40], [1, 0, 0], [0, -s * 0.10, 1], [0, s, 0.10], 0, xb1 - xb0, 0, zt - 1.40, -0.05, 0);
      box(B.dark, xb0 + 0.06, xb1 - 0.02, s * 1.00, s * 1.03, 1.45, zt - 0.02);
    }
    box(B.paint, xb0, xb0 + 0.06, -1.08, 1.08, 1.42, zt);
    box(B.paint, xb1 - 0.04, xb1, -0.98, 0.98, 1.42, 1.86);
    box(B.dark, xb0 + 0.06, xb1 - 0.04, -1.03, 1.03, 1.42, 1.45);                       /* the bay floor, in shadow */
    /* the lift: two columns on the bay floor carrying the launcher frame */
    box(B.dark, -1.98, -1.84, -0.08, 0.08, 1.45, 2.30);
    box(B.dark, -1.16, -1.02, -0.08, 0.08, 1.45, 2.30);
    box(B.dark, -2.30, -0.98, -0.10, 0.10, 2.28, 2.33);
    for (i = 0; i < 2; i++) box(B.dark, i ? -1.06 : -2.04, i ? -0.98 : -1.96, -0.80, 0.80, 2.28, 2.34);
    /* the lid, now the launcher's roof [A1]: chamfered at the front corners */
    var L = [[-2.44, -0.86], [-1.06, -0.86], [-0.92, -0.70], [-0.92, 0.70], [-1.06, 0.86], [-2.44, 0.86]];
    var V = [], F = [], n = L.length;
    for (i = 0; i < n; i++) V.push([L[i][0], L[i][1], 2.34]);
    for (i = 0; i < n; i++) V.push([L[i][0], L[i][1], 2.39]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { var k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(B.paint, V, F);
    for (i = 0; i < 6; i++) cylZ(B.dark, -2.30 + (i % 3) * 0.55, (i < 3 ? -0.6 : 0.6), 2.39, 2.40, 0.025, 6);   /* rivet bosses */
    /* six rails and six 9M14 Malyutka under them: 0.86 m long, 125 mm body, four wings in an X, 393 mm span */
    for (i = 0; i < 6; i++) {
      y = -0.70 + i * 0.28;
      box(B.dark, -2.36, -1.20, y - 0.02, y + 0.02, 2.25, 2.34);
      var zc = 2.17, xt = -2.30, xn = -1.44;
      cyl(B.paint, [xt, y, zc], [xn - 0.10, y, zc], 0.0625, 0.0625, 10);
      cyl(B.paint, [xn - 0.10, y, zc], [xn, y, zc], 0.0625, 0.025, 10);
      cylX(B.dark, xt - 0.05, xt, y, zc, 0.04, 8);
      for (s = 0; s < 4; s++) {
        var a = (s + 0.5) * Math.PI / 2, dy = Math.cos(a), dz = Math.sin(a);
        planeBox(B.paint, [xt, y + dy * 0.06, zc + dz * 0.06], [1, 0, 0], [0, dy, dz], [0, -dz, dy], 0.02, 0.17, 0, 0.135, -0.004, 0.004);
      }
    }
    /* C.team: two short strips on the raised lid, facing up */
    for (s = -1; s <= 1; s += 2) box(B.team, -2.38, -1.78, s * 0.64, s * 0.78, 2.39, 2.405);
  }

  /* the SGMB on the pintle at the front of the crew compartment [S1] (BRDM-1 obr. 1959 on: en.wikipedia),
     local origin on the socket, gun along +X */
  function sgmb(B) {
    cylZ(B.dark, 0, 0, -0.04, 0.30, 0.045, 10);                         /* pedestal post      */
    cylZ(B.dark, 0, 0, 0.26, 0.36, 0.06, 10);                           /* swivel             */
    box(B.dark, -0.07, 0.07, -0.075, 0.075, 0.36, 0.44);                /* yoke               */
    cylY(B.dark, 0, -0.085, 0.085, 0.47, 0.03, 8);                      /* trunnion           */
    box(B.dark, -0.18, 0.20, -0.05, 0.05, 0.44, 0.56);                  /* receiver           */
    box(B.dark, -0.04, 0.16, -0.055, 0.055, 0.56, 0.59);                /* feed cover         */
    cylX(B.dark, 0.20, 0.80, 0, 0.50, 0.032, 10);                       /* fluted barrel      */
    cylX(B.dark, 0.80, 0.88, 0, 0.50, 0.022, 8);                        /* muzzle             */
    cylX(B.dark, 0.20, 0.60, 0, 0.45, 0.013, 6);                        /* gas cylinder       */
    box(B.dark, 0.74, 0.77, -0.008, 0.008, 0.53, 0.58);                 /* foresight          */
    bar(B.dark, [0.34, 0, 0.55], [0.40, 0, 0.62], 0.02);                /* barrel handle      */
    bar(B.dark, [0.40, 0, 0.62], [0.56, 0, 0.62], 0.02);
    bar(B.dark, [0.56, 0, 0.62], [0.60, 0, 0.55], 0.02);
    box(B.dark, -0.21, -0.18, -0.07, 0.07, 0.44, 0.56);                 /* back plate         */
    cylZ(B.dark, -0.25, 0.06, 0.45, 0.56, 0.016, 6);                    /* spade grips        */
    cylZ(B.dark, -0.25, -0.06, 0.45, 0.56, 0.016, 6);
    box(B.paint, -0.04, 0.18, -0.22, -0.07, 0.36, 0.55);                /* belt box, feed right */
  }

  /* ================================================================= BRDM-2 */
  /* stations from the side photographs [S2] [K2] scaled to the published 3.10 m wheelbase and 5.75 m
     length; widths from the head-on photograph [F2] (287 px a metre on the 2.35 m beam) */
  var H2 = {
    xb: -2.78, xs: 2.93, xf: 1.55, xr: -1.55, ar: 0.72, az: 0.55, rt: 0.545, tw: 0.33, trk: 0.92,
    w: 1.175, wc: 1.145, n: 0.70, ch: 0.30, zsill: 0.49, zbelly: 0.43,
    zb: [[-2.78, 0.80], [-2.40, 0.48], [-2.27, 0.43], [2.27, 0.43], [2.40, 0.50], [2.93, 1.04]],
    zt: [[-2.78, 1.40], [-1.45, 1.42], [2.40, 1.42], [2.93, 1.10]],
    stations: [-2.78, -2.60, -2.40, -2.27, -0.83, 0.0, 0.83, 2.27, 2.40, 2.65, 2.93],
    sideLow: [[-2.40, 0.52], [-2.27, 0.53]],
    sideBow: [[2.27, 0.56], [2.40, 0.74], [2.65, 1.03], [2.93, 1.07], [2.93, 1.10]],   /* the slab stops at the bow chine [F2][K2'] */
    deck: [[-2.78, 1.40], [-1.45, 1.42], [2.40, 1.42]],
    br: 0.27, by: 0.80, bz: 0.58, belly: [0.20, -0.45],
    chT: [[2.27, 0.30], [2.40, 0.45], [2.65, 0.55], [2.93, 0.45]]   /* [F2]: the lower bow plate narrows to 1.55 m at its foot */
  };
  H2.xr0 = H2.xr - H2.ar; H2.xr1 = H2.xr + H2.ar; H2.xf0 = H2.xf - H2.ar; H2.xf1 = H2.xf + H2.ar;
  var ZR2 = 1.92, XTUR2 = -0.10;

  function brdm2Body(B) {
    var s, i, x;
    hull(B, H2);
    ribs(B, H2.w, [[-0.70, 0.70, 0.78], [-0.70, -0.08, 0.62], [0.08, 0.70, 0.62]]);
    /* the crew compartment: the raked windscreen plate with cut front corners, flanks leaning in hard, flat
       roof, the rear plate down to the engine deck [S2][F2][K2] */
    loft(B.paint, [trapRing(2.20, 0.86, 1.41, 0.80, 1.46), trapRing(1.75, 1.10, 1.41, 0.68, ZR2),
                   trapRing(-1.05, 1.12, 1.41, 0.70, ZR2), trapRing(-1.45, 1.10, 1.41, 0.96, 1.46)], false);
    var wsA = [2.20, 0, 1.46], wsB = [1.75, 0, ZR2];
    for (s = -1; s <= 1; s += 2) {
      /* the two windscreen windows and their armoured covers, raised [F2][K2] */
      onPlane(B.glass, wsA, wsB, [2.20, 1, 1.46], [1, 0, 1], 0.12, 0.50, s > 0 ? 0.08 : -0.54, s > 0 ? 0.54 : -0.08, 0.010, 0.026);
      planeBox(B.paint, [1.75, s * 0.32, ZR2], [0.5, 0, 0.866], [0, 1, 0], [0.866, 0, -0.5], 0.0, 0.34, -0.27, 0.27, -0.035, 0.0);
      /* commander's and driver's roof hatches behind the windscreen */
      cylZ(B.paint, 1.40, s * 0.36, ZR2, ZR2 + 0.035, 0.23, 16);
      cylZ(B.dark, 1.40, s * 0.36, ZR2 + 0.035, ZR2 + 0.05, 0.05, 8);
      /* vision blocks and the oval firing port in the leaning flank [S2][K2] */
      var lean = (1.12 - 0.70) / (ZR2 - 1.41), fl = function (z) { return 1.12 - (z - 1.41) * lean; };
      var pts = [[1.30, 1.74, 0.20], [0.75, 1.70, 0.16], [-0.62, 1.70, 0.16]];
      for (i = 0; i < pts.length; i++) {
        var zz = pts[i][1], yy = fl(zz);
        planeBox(B.glass, [pts[i][0], s * yy, zz], [1, 0, 0], [0, -s * lean, 1], [0, s, lean], -pts[i][2] / 2, pts[i][2] / 2, -0.04, 0.04, -0.01, 0.025);
        planeBox(B.dark, [pts[i][0], s * yy, zz], [1, 0, 0], [0, -s * lean, 1], [0, s, lean], -pts[i][2] / 2 - 0.03, pts[i][2] / 2 + 0.03, 0.04, 0.07, -0.01, 0.04);
      }
      var zo = 1.62, yo = fl(zo);
      cyl(B.paint, [0.05, s * (yo - 0.02), zo], [0.05, s * (yo + 0.035), zo + 0.035 * lean], 0.11, 0.10, 12);
      cyl(B.dark, [0.05, s * (yo + 0.035), zo + 0.035 * lean], [0.05, s * (yo + 0.05), zo + 0.05 * lean], 0.03, 0.03, 6);
    }
    /* lamps on the bow deck: the outer one in its guard, the headlamp inboard [F2][K2] */
    for (s = -1; s <= 1; s += 2) { lamp(B, 2.44, s * 0.98, 1.60, 0.10, true); lamp(B, 2.36, s * 0.72, 1.59, 0.10, false); }
    /* the upper bow plate: maintenance hatch, tow eyes; lower bow plate: trim vane folded flat [K2] */
    onPlane(B.paint, [2.40, 0, 1.42], [2.93, 0, 1.10], [2.40, 1, 1.42], [0.5, 0, 1], 0.10, 0.42, -0.36, 0.36, 0, 0.025);
    onPlane(B.paint, [2.40, 0, 0.50], [2.93, 0, 1.04], [2.40, 1, 0.50], [1, 0, -0.6], 0.16, 0.70, -0.62, 0.62, 0, 0.03);
    onPlane(B.dark, [2.40, 0, 0.50], [2.93, 0, 1.04], [2.40, 1, 0.50], [1, 0, -0.6], 0.20, 0.26, -0.66, 0.66, 0.03, 0.07);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 2.80, 2.92, s * 0.50 - 0.04, s * 0.50 + 0.04, 0.94, 1.02);
      box(B.dark, 2.40, 2.52, s * 0.66 - 0.04, s * 0.66 + 0.04, 0.42, 0.50);
    }
    /* the engine deck: a low hood with the two louvred intakes and the access hatch, the exhaust stub [S2][K2] */
    loft(B.paint, [trapRing(-1.40, 1.02, 1.41, 0.86, 1.56), trapRing(-2.45, 1.02, 1.41, 0.86, 1.56), trapRing(-2.62, 1.00, 1.40, 0.92, 1.45)], false);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.30, -1.62, s * 0.30, s * 0.78, 1.555, 1.57);
      for (i = 0; i < 7; i++) box(B.paint, -2.27 + i * 0.095, -2.23 + i * 0.095, s * 0.32, s * 0.76, 1.57, 1.60);
      box(B.team, -2.44, -2.34, s * 0.30, s * 0.80, 1.56, 1.575);
    }
    box(B.paint, -1.58, -1.44, -0.30, 0.30, 1.56, 1.59);
    /* the stern: the water-jet's triangular armoured shutter low in the centre, tail lamps, tow hooks [S2] */
    var sx = -2.78;
    var tri = [[-0.32, 0.86], [0.32, 0.86], [0, 1.24]], V = [], F = [[0, 1, 2], [3, 5, 4], [0, 3, 4], [0, 4, 1], [1, 4, 5], [1, 5, 2], [2, 5, 3], [2, 3, 0]];
    for (i = 0; i < 3; i++) V.push([sx + 0.005, tri[i][0], tri[i][1]]);
    for (i = 0; i < 3; i++) V.push([sx - 0.04, tri[i][0] * 0.92, tri[i][1] - (tri[i][1] - 0.99) * 0.08]);
    solid(B.paint, V, F);
    for (s = -1; s <= 1; s += 2) {
      box(B.lamp, sx - 0.02, sx + 0.01, s * 0.92 - 0.05, s * 0.92 + 0.05, 1.26, 1.33);
      box(B.dark, sx - 0.04, sx + 0.02, s * 0.62 - 0.04, s * 0.62 + 0.04, 0.84, 0.92);
    }
  }

  /* the BPU-1: the low truncated cone with no hatch (en.wikipedia; the BTR-60PB / 70 hero), KPVT with the PKT
     beside it, the PP-61AM sight head; local origin on the ring centre on the roof, guns along +X */
  function bpuTurret(B) {
    lathe(B.paint, [[0.0, 0.62], [0.08, 0.61], [0.29, 0.45], [0.345, 0.38], [0.36, 0.32]], 0, 0, 24, true);
    box(B.paint, 0.40, 0.68, -0.24, 0.26, 0.06, 0.29);                                       /* mantlet */
    cylX(B.dark, 0.64, 1.12, 0.09, 0.18, 0.062, 12);                                         /* KPVT jacket */
    cylX(B.dark, 1.12, 1.76, 0.09, 0.18, 0.033, 10);                                         /* KPVT barrel */
    cylX(B.dark, 1.76, 1.83, 0.09, 0.18, 0.042, 10);                                         /* flash hider */
    cylX(B.dark, 0.64, 0.98, -0.13, 0.15, 0.02, 8);                                          /* PKT */
    box(B.paint, 0.06, 0.24, -0.34, -0.16, 0.29, 0.38);                                      /* PP-61AM sight head */
    box(B.glass, 0.24, 0.25, -0.31, -0.19, 0.31, 0.36);
    box(B.glass, -0.22, -0.10, 0.14, 0.24, 0.33, 0.38);                                      /* vision block */
  }

  /* ---------------------------------------------------------------- paint and materials */
  /* Soviet protective green as the BTR-60PB / BTR-152 heroes have it (the St Petersburg 9P110 [M2] and the
     Kubinka BRDM-2 [K2] under museum light agree in hue); the later Russian rows the duller present-day green
     of the Russian parade BRDM-1 [P] (sampled 100, 104, 96 in sun, taken to about 0.75 and kept a touch green) */
  var PAINTS = {
    sov: { base: "#535b3c", blots: ["#4a5235", "#5c6444", "#4f5739"], seed: 57 },
    ru: { base: "#4b5143", blots: ["#43493c", "#545a4b", "#474d40"], seed: 62 }
  };
  var HUBS = { sov: lin(0x4c5436), ru: lin(0x454b3e) }, RUB = lin(0x1d1d1b), NUT = lin(0x30352a);

  function materials(THREE, C, pk) {
    var T = {}, P = PAINTS[pk], tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2b2d27, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2630, roughness: 0.15, metalness: 0.4 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd2ccb0, roughness: 0.3, metalness: 0.2, emissive: 0x1a1810 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.9, metalness: 0.04 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             lamp: new Bin(T.lamp, false), team: new Bin(T.team, false) };
  }

  /* ---------------------------------------------------------------- builders */
  function buildBrdm1(THREE, M, C, td) {
    var T = materials(THREE, C, "sov"), g = new THREE.Group(), B = bins(T);
    g.name = td ? "ru_9p110" : "ru_brdm1";
    B_ARM = B.dark;
    brdm1Body(B, td);
    wheels(THREE, g, T, H1, HUBS.sov);
    flush(THREE, g, B);
    if (!td) {
      var TB = bins(T), tg = new THREE.Group();
      sgmb(TB);
      tg.name = "turret";
      tg.position.set(0.45, 0, 1.64);
      flush(THREE, tg, TB);
      g.add(tg);
    }
    return g;
  }
  function buildBrdm2(THREE, M, C, pk) {
    var T = materials(THREE, C, pk), g = new THREE.Group(), B = bins(T);
    g.name = "ru_brdm2";
    B_ARM = B.dark;
    brdm2Body(B);
    wheels(THREE, g, T, H2, HUBS[pk]);
    flush(THREE, g, B);
    var TB = bins(T), tg = new THREE.Group();
    bpuTurret(TB);
    tg.name = "turret";
    tg.position.set(XTUR2, 0, ZR2);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { brdm1: function (t, m, c) { return buildBrdm1(t, m, c, false); },
           td: function (t, m, c) { return buildBrdm1(t, m, c, true); },
           brdm2: function (t, m, c) { return buildBrdm2(t, m, c, "sov"); },
           brdm2ru: function (t, m, c) { return buildBrdm2(t, m, c, "ru"); } };
})();

/* len is the measured X extent of each model: bow (trim-vane frame) to the stern (tail lamps, the water-jet shutter) */
UNIT_MODELS["pact_e50_recon"] = { len: 5.72, build: HeroRuBrdm.brdm1 };
UNIT_MODELS["pact_e60_tankdestroyer"] = { len: 5.72, build: HeroRuBrdm.td };
["pact_e60_recon", "pact_e80_recon", "pact_e90_recon"].forEach(function (k) {
  UNIT_MODELS[k] = { len: 5.75, build: HeroRuBrdm.brdm2 };
});
["pact_e00_recon", "recon_p"].forEach(function (k) {
  UNIT_MODELS[k] = { len: 5.75, build: HeroRuBrdm.brdm2ru };
});
