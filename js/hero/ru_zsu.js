/* ============ ru_zsu.js - HERO models: the Soviet self-propelled AA guns ============
   Two vehicles, one file, the gun mount the trained node of each:
     pact_e50_spaag   ZSU-57-2 "Sparka"   (Ob'yekt 500, in service 14 Feb 1955)
     pact_e60_spaag   ZSU-23-4 "Shilka"   (accepted 5 Sep 1962, in troop service 1965)
   Full-quality redo of 2026-10-24.  References (Wikimedia Commons, width 960, cached in
   scratchpad/q_zsu_ref):
     [D57]  "ZSU572graphic1.jpg" - US Army recognition drawing: left side, front, 3/4.  Scale
            from the published 3.84 m track contact (first to last wheel centre, 120 px/m in
            the 3x crop) and the 3.27 m width in the front view.
     [D23]  "ZSU234graphic2.gif" - the same series for the Shilka: left side (radar raised),
            front and 3/4; 35 px/m from the 6.54 m hull.
     [P57a] "ZSU-57-2 Hun 2010 02.jpg" - LEFT side, front 3/4, outdoors: four twin wheels,
            the box turret with its side crease, the run of boxes along the left fender.
     [P57b] "ZSU-57-2.JPG" - Polish museum, left front, guns at 85 deg: the gun cradles in
            the turret front, the spare track links on the glacis, the curved mudguards.
     [P57c] "Parola Tank Museum 078 - ZSU 57-2" - RIGHT side, front 3/4: the headlamp on the
            right front fender, the rounded front of the turret, the turret-side crease.
     [P57d] "ZSU-57-2 MWP 03.jpg" - RIGHT side, rear 3/4: the wire spent-case basket on the
            turret rear, the grab rail, the raised REAR sprocket, the right fender's long
            rounded tank and boxes.
     [P23a] "ZSU 23-4W1 Schilka MHM Dresden seite.jpg" - a ZSU-23-4V1, right side square on:
            six wheels, front idler, rear sprocket, the radar raised.
     [P23b] "ZSU-23-4 Shilka 06.jpg" - left rear 3/4: the rear sprocket, the hull-side round
            plates, the turret's X panel and long ribbed side box, the radar mast.
     [P23c] "ZSU-23-4 Shilka in Soviet service during a parade.JPEG" - Soviet service, left
            front: the same turret side (X panel, ribbed box), commander's hatch left of the
            radar, the dish raised.
     [P23d] "ZSU-23-4 Shilka National Museum of the Great Patriotic War.jpg" (Kyiv) - head on:
            the four barrels in two vertical pairs between the big rounded cheek boxes, the
            driver's raised hatch cover front LEFT, the lamp box front right.
     [P23e] "ZSU-23-4V1 Shilka (1972) pic1.JPG" - right side: no return rollers, the idler.
     en.wikipedia / ru.wikipedia "ZSU-57-2", "ZSU-23-4": dates, the variants, the running
     gear (57-2: four twin rubber-tyred wheels, rear sprocket, track centres 2.64 m, 580 mm
     track; Shilka: six single rubber-tyred wheels, REAR sprocket, 382 mm track), the 57-2's
     open box turret, 1.85 m ring, wire case basket at the rear, 4.365 m barrels.

   CORRECTIONS against the previous model:
     - the Shilka's sprocket is at the REAR (en.wiki "a rear drive sprocket"; ru.wiki "the
       final drives with the drive wheels at the stern"; P23a, P23b), not the front;
     - the Shilka's radar is drawn RAISED on its mast as in service (P23c) and every
       photograph (P23a, P23b, P23e); the old "laid back" pose is in none of them;
     - the 57-2 now has its headlamp, on the RIGHT front as on the T-54 (P57a, P57b, P57c);
       its turret walls are vertical to a crease and lean in above it, the front top rounded
       back (D57, P57c, P57d), with the spent-case basket and grab rails the old model left
       out (P57d, en.wiki);
     - Shilka height: en.wiki gives 2.576 m with the radar stowed and 3.572 m raised (the
       old header's 2.25 m is not supported); deck 1.76 m and roof 2.46 m measured off
       P23a, whose 0.70 m wheel and 6.4 m hull agree on its scale;
     - Shilka barrels: two vertical pairs, left and right (ru.wiki: an upper and a lower
       cradle; P23d), not side by side.
   Kept from the old header (confirmed, en.wiki infoboxes): 57-2 hull 6.22 m (8.46 m over the
   guns), width 3.27 m, height 2.71 m (2.75 m with the tarpaulin), 28.1 t, four wheels a side,
   rear sprocket, no radar; Shilka length 6.535 m, width 3.125 m, 19 t.
   Drawn: 57-2 hull 6.30 m over the fender ends, 3.30 m wide, rails 2.74 m, 8.39 m over the
   guns at 20 deg; Shilka 6.66 m (barrel tips at 10 deg), 3.16 m, turret roof 2.47 m, dish
   top 3.59 m.

   Recognition list (each drawn; where it rests):
     ZSU-57-2
      1. T-54-type hull and nose, fender shelf low over the track, curved front mudguards
         [D57] [P57a] [P57b].
      2. FOUR big twin "starfish" road wheels a side, wide-spaced, no return rollers, rear
         sprocket [D57] [P57d] en.wiki.
      3. The big open-topped box turret: vertical walls to a crease, leaning in above, the
         front top rounded back, open roof with the crew space inside [D57] [P57c] [P57d].
      4. Twin long 57 mm S-68 barrels side by side with the slotted muzzle brakes and the
         thick cradle sleeves at the turret front [D57] [P57a] [P57b].
      5. The wire basket for spent cases on the turret rear [D57] [P57d] en.wiki.
      6. The grab rail over the turret and the fender boxes / tank [D57] [P57a] [P57d].
      7. Spare track links on the glacis, the right headlamp [P57b] [P57c].
     ZSU-23-4
      1. Low GM-575 hull: upper hull sides overhanging the tracks the full length, glacis to
         a sharp nose [D23] [P23a] [P23d].
      2. SIX single road wheels a side, no return rollers, idler raised at the front,
         sprocket at the rear [P23a] [P23b] [P23e].
      3. The wide flat turret with sloping flanks and sloped front [D23] [P23a] [P23d].
      4. The big rounded cheek boxes either side of the guns [P23d] [P23a].
      5. Four 23 mm barrels in two vertical pairs, left and right, with the link brackets
         [P23d] [P23c] [D23].
      6. The RPK-2 dish raised on its mast over the turret rear, the drive box behind it
         [D23] [P23a] [P23b] [P23c].
      7. The turret-side X panel and the long ribbed box [P23b] [P23c].
      8. Hull-side access plates, the driver's raised hatch cover front left, the lamp box
         front right [P23a] [P23b] [P23d].

   Variant notes and what was NOT drawn:
     - pact_e60_spaag names the 1965 ZSU-23-4.  The photographs are of later vehicles
       (P23a / P23e are V1s).  en.wiki: the V (1968) added the commander's guidance sight
       and moved a ventilation case onto the hull, the V1 (1970) put ventilation cases on the
       turret's front cheeks.  So the louvred front-cheek vent cases (P23b) and a separate
       commander's sight are NOT drawn; what every photograph shares is.
     - ZSU-57-2: the guns drawn at 20 deg (the engine trains in azimuth only; the photos
       show anything from 10 to 85 deg); the turret's tarpaulin with its windows is a travel
       cover, not drawn.  The 57-2 never carried a radar.
     - No stowage beyond the boxes, no camouflage (both plain Soviet green), no numbers,
       stars or museum markings.
   Paint: P57a's overcast turret side samples #7f837c (washed grey-green), P57b #afb1a8 (sunlit
   repaint): neither is a period finish.  The 1950s Soviet green
   is that of the T-54A hero, #4c5636, which this file takes for the 57-2.  The Shilka takes
   the Tunguska e80 Soviet green at 0.92 (#535a3f); P23a's #5a5a50 is NVA paint, not used.
   Materials: PAINT (canvas texture), DARK, GLASS, C.team (deck plate, turret strip), WHEEL
   (vertex colours).  Named nodes: "turret" (ring centre, guns along +X) and the "roadwheel"
   groups (axle along local Y).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZsu = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    Z57: { paint: { base: "#4c5636", dark: "#434c2f", lite: "#56603f", seed: 57 }, el: 20 },
    Z23: { paint: { base: "#535a3f", dark: "#474e35", lite: "#5e6549", seed: 23 }, el: 10 }
  };

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lin(hex) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex;
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }

  /* one bin of triangles per material; the painted bin gets planar UVs from
     the dominant axis of each face (metres x 0.30, the texture repeating),
     the wheel bin a vertex colour (bin.col).  Zero-area triangles are dropped. */
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (dot(cr, cr) < 1e-12) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
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
  /* a four-corner face turned to face `want`; the decision uses the diagonals' cross
     product, so a collapsed first corner cannot flip it */
  function quad(bin, a, b, c, d, want) {
    var f = cross(sub(c, a), sub(d, b));
    if (dot(f, f) < 1e-14) f = cross(sub(b, a), sub(c, a));
    if (dot(f, want) >= 0) { bin.tri(a, b, c); bin.tri(a, c, d); }
    else { bin.tri(a, c, b); bin.tri(a, d, c); }
  }
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
    return vol;
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    var t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2, t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, Math.min(y0, y1), z], [x, Math.max(y0, y1), z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  /* a tube along a direction d from P, a..b along it */
  function tube(bin, P, d, a, b, r0, r1, seg) {
    cyl(bin, [P[0] + d[0] * a, P[1] + d[1] * a, P[2] + d[2] * a], [P[0] + d[0] * b, P[1] + d[1] * b, P[2] + d[2] * b], r0, r1, seg);
  }
  function prism(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }
  /* a round-cornered slab in the XZ plane (corner radius r), y0..y1 */
  function slab(bin, x0, x1, z0, z1, r, y0, y1) {
    var pts = [], k, a, cs = [[x1 - r, z1 - r, 0], [x0 + r, z1 - r, 1], [x0 + r, z0 + r, 2], [x1 - r, z0 + r, 3]];
    for (k = 0; k < 4; k++) for (a = 0; a <= 3; a++) {
      var t = (cs[k][2] + a / 3) * Math.PI / 2;
      pts.push([cs[k][0] + Math.cos(t) * r, cs[k][1] + Math.sin(t) * r]);
    }
    prism(bin, pts, Math.min(y0, y1), Math.max(y0, y1));
  }
  /* the loft: rings of (y, z) points (same count) at stations along x, closed and capped */
  function loft(bin, X, R) {
    var V = [], F = [], n = R[0].length, m = X.length, i, k, j, c0, cy, cz;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push([X[k], R[k][i][0], R[k][i][1]]);
    for (k = 0; k < m - 1; k++) for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      F.push([k * n + i, (k + 1) * n + j, (k + 1) * n + i], [k * n + i, k * n + j, (k + 1) * n + j]);
    }
    for (k = 0; k < m; k += m - 1) {
      cy = 0; cz = 0;
      for (i = 0; i < n; i++) { cy += R[k][i][0]; cz += R[k][i][1]; }
      V.push([X[k], cy / n, cz / n]); c0 = V.length - 1;
      for (i = 0; i < n; i++) { j = (i + 1) % n; F.push(k ? [c0, k * n + i, k * n + j] : [c0, k * n + j, k * n + i]); }
    }
    return solid(bin, V, F);
  }
  /* mirror a half profile (y >= 0, from bottom centre up to top centre) */
  function ring(half) {
    var R = [], i;
    for (i = 0; i < half.length; i++) R.push([half[i][0], half[i][1]]);
    for (i = half.length - 2; i >= 1; i--) R.push([-half[i][0], half[i][1]]);
    return R;
  }
  /* loft a half profile through stations [x, top z, bottom z, y scale] */
  function stationLoft(bin, HALF, ST) {
    var base = ring(HALF), X = [], R = [], k, i, st, rr;
    for (k = 0; k < ST.length; k++) {
      st = ST[k]; rr = [];
      for (i = 0; i < base.length; i++) rr.push([base[i][0] * (st[3] || 1), Math.max(st[2], Math.min(st[1], base[i][1]))]);
      X.push(st[0]); R.push(rr);
    }
    loft(bin, X, R);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 512; cv.height = 512;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 512, 512);
      /* faint mottling of the brushed single-colour finish */
      for (k = 0; k < 2; k++) {
        q.fillStyle = k ? P.lite : P.dark;
        q.globalAlpha = 0.35;
        for (i = 0; i < 14; i++) {
          x = R() * 512; y = R() * 512; rr = 24 + R() * 60;
          q.beginPath();
          for (a = 0; a < 8; a++) {
            ang = a / 8 * TAU; rd = rr * (0.6 + R() * 0.6);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.5, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.5, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      q.globalAlpha = 1;
      /* weld seams and plate joints, with the bead's highlight */
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * 512); y = Math.floor(R() * 512); rr = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, rr, 3); else q.fillRect(x, y, 3, rr);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, rr, 1); else q.fillRect(x + 3, y, 1, rr);
      }
      /* bolt heads along some seams, then dust, chipping and rain streaks */
      q.fillStyle = "rgba(18,20,16,0.35)";
      for (i = 0; i < 140; i++) q.fillRect(Math.floor(R() * 64) * 8, Math.floor(R() * 8) * 64 + 3, 2, 2);
      for (i = 0; i < 120; i++) {
        q.fillStyle = (i % 3) ? "rgba(15,14,10,0.06)" : "rgba(196,186,150,0.07)";
        q.fillRect(R() * 512, R() * 512, 4 + R() * 46, 2 + R() * 10);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * 512, R() * 512, 2 + R() * 4, 30 + R() * 90); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x232527, roughness: 0.76, metalness: 0.32 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2833, roughness: 0.12, metalness: 0.4 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.86, metalness: 0.08 });
    T.steel = lin(V.paint.base);
    T.rib = (function () { var c = lin(V.paint.lite); return [c[0] * 1.15, c[1] * 1.15, c[2] * 1.15]; })();
    T.rubber = lin(0x1d1e1f);
    T.hole = lin(0x151614);
    T.hubc = lin(0x2b2d2b);
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B, dx) {
    var k, b, geo, i;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (dx) for (i = 0; i < b.P.length; i += 3) b.P[i] -= dx;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------------- the track */
  /* the convex run round idler, wheels and sprocket (circles [x, z, r]); `tops` are
     points the top run is laid down onto (no return rollers: it rests on the wheels) */
  function trackLine(C, tops) {
    var pts = [], i, k, a, r;
    for (i = 0; i < C.length; i++) {
      r = C[i][2] + 0.04;
      for (k = 0; k < 28; k++) { a = k / 28 * TAU; pts.push([C[i][0] + Math.cos(a) * r, C[i][1] + Math.sin(a) * r]); }
    }
    pts.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    function cr(o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) {
      while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop();
      lo.push(pts[i]);
    }
    for (i = pts.length - 1; i >= 0; i--) {
      while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop();
      up.push(pts[i]);
    }
    lo.pop(); up.pop();
    var H = lo.concat(up), best = -1, bl = 0, l;
    if (tops && tops.length) {
      for (i = 0; i < H.length; i++) {
        k = (i + 1) % H.length; l = H[i][0] - H[k][0];
        if (H[i][1] > C[1][1] && H[k][1] > C[1][1] && l > bl) { bl = l; best = i; }
      }
      if (best >= 0) {
        var ins = tops.slice().sort(function (p, q) { return q[0] - p[0]; });
        H = H.slice(0, best + 1).concat(ins, H.slice(best + 1));
      }
    }
    return H;
  }
  /* band of thickness 2h along the line, y0..y1, with grousers every `pitch` metres */
  function addTrack(D, L, y0, y1, pitch, gw) {
    var n = L.length, i, j, O = [], I = [], NS = [], e, l, nx, nz, h = 0.04;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; l = Math.sqrt(e[0] * e[0] + e[1] * e[1]) || 1;
      NS.push([e[1] / l, -e[0] / l]);
    }
    for (i = 0; i < n; i++) {
      var p = NS[(i - 1 + n) % n], q = NS[i];
      nx = p[0] + q[0]; nz = p[1] + q[1]; l = Math.sqrt(nx * nx + nz * nz) || 1;
      nx /= l; nz /= l;
      var k = 1 / Math.max(0.5, nx * q[0] + nz * q[1]);
      O.push([L[i][0] + nx * h * k, L[i][1] + nz * h * k]);
      I.push([L[i][0] - nx * h * k, L[i][1] - nz * h * k]);
    }
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      var w = [NS[i][0], 0, NS[i][1]];
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [O[j][0], y1, O[j][1]], [O[i][0], y1, O[i][1]], w);
      quad(D, [I[i][0], y0, I[i][1]], [I[j][0], y0, I[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [-w[0], 0, -w[2]]);
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [I[j][0], y0, I[j][1]], [I[i][0], y0, I[i][1]], [0, -1, 0]);
      quad(D, [O[i][0], y1, O[i][1]], [O[j][0], y1, O[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [0, 1, 0]);
    }
    var acc = 0.1, seg, t;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; seg = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
      t = acc;
      while (t < seg) {
        var px = L[i][0] + e[0] * t / seg, pz = L[i][1] + e[1] * t / seg;
        planeBox(D, [px, 0, pz], [e[0] / seg, 0, e[1] / seg], [0, 1, 0], [NS[i][0], 0, NS[i][1]],
                 -gw, gw, y0 - 0.008, y1 + 0.008, h - 0.01, h + 0.03);
        t += pitch;
      }
      acc = t - seg;
    }
  }
  /* a toothed sprocket: hub disc and teeth round the rim, both faces */
  function sprocket(P, D, x, z, r, y0, y1, nT) {
    var i, a, cx, cz, yc = (y0 + y1) / 2, hw = Math.abs(y1 - y0) / 2;
    cylY(D, x, y0, y1, z, r - 0.05, 18);
    for (i = 0; i < nT; i++) {
      a = i / nT * TAU; cx = x + Math.cos(a) * (r - 0.02); cz = z + Math.sin(a) * (r - 0.02);
      planeBox(D, [cx, 0, cz], [-Math.sin(a), 0, Math.cos(a)], [0, 1, 0], [Math.cos(a), 0, Math.sin(a)],
               -0.035, 0.035, yc - hw, yc + hw, -0.04, 0.06);
    }
  }

  /* ================================================================ ZSU-57-2 */
  /* running gear [D57]: four twin wheels at a 1.26 m pitch (3.84 m contact, en.wiki), the
     T-54's 830 mm wheel, track centres 2.64 m and 580 mm track (en.wiki) */
  var A = {
    XW: [1.86, 0.60, -0.66, -1.92], ZW: 0.49, RW: 0.415, TY: 1.32, TW: 0.29,
    IDL: [2.74, 0.58, 0.29], SPR: [-2.82, 0.66, 0.30],
    DECK: 1.42, FZ: 1.10, FW: 1.635, HW: 1.00, HX: -0.15
  };
  /* hull stations: the T-54A hero's table [x, belly half width, belly z, side half width,
     roof z], stretched to the published 6.22 m: the same plates, nose and stern [D57] */
  var HS57 = [
    [-3.00, 0.95, 0.66, 0.99, 1.24], [-2.99, 0.96, 0.57, 1.00, 1.33], [-2.96, 0.97, 0.50, 1.00, 1.39],
    [-2.90, 0.98, 0.455, 1.00, 1.42], [-2.75, 0.98, 0.425, 1.00, 1.42], [-1.60, 0.98, 0.425, 1.00, 1.42],
    [0.80, 0.98, 0.425, 1.00, 1.42], [1.93, 0.98, 0.425, 1.00, 1.42], [2.20, 0.98, 0.425, 1.00, 1.264],
    [2.45, 0.98, 0.425, 1.00, 1.12], [2.60, 0.98, 0.44, 1.00, 1.033], [2.75, 0.975, 0.545, 0.995, 0.946],
    [2.87, 0.97, 0.625, 0.99, 0.876], [2.95, 0.965, 0.685, 0.985, 0.825], [3.00, 0.96, 0.725, 0.98, 0.79],
    [3.03, 0.955, 0.752, 0.975, 0.768]];
  var SX57 = 6.22 / 6.06;
  function g57(x) { return x <= 1.93 * SX57 ? A.DECK : A.DECK - 0.577 * (x - 1.93 * SX57) / SX57; }
  function hull57(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, i, k, s, x, n;
    /* the hull loft: an eight-point ring per station, sides vertical */
    var R = HS57.map(function (S) {
      var x0 = S[0] * SX57, wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
      return [[ws * 0 + wb, zB], [ws, Math.min(zB + 0.10, zT - 2 * e)], [ws, zT - e], [ws - e, zT],
              [-(ws - e), zT], [-ws, zT - e], [-ws, Math.min(zB + 0.10, zT - 2 * e)], [-wb, zB]].map(function (p) { return [x0, p[0], p[1]]; });
    });
    n = R[0].length;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        var k1 = (k + 1) % n, a = R[i][k], b = R[i][k1], c = R[i + 1][k1], d = R[i + 1][k];
        var dy = b[1] - a[1], dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        quad(P, a, b, c, d, [0, dz, -dy]);
      }
    for (k = 1; k + 1 < n; k++) {
      quad(P, R[0][0], R[0][k], R[0][k + 1], R[0][k + 1], [-1, 0, 0]);
      quad(P, R[R.length - 1][0], R[R.length - 1][k], R[R.length - 1][k + 1], R[R.length - 1][k + 1], [1, 0, 0]);
    }
    /* the rounded nose bar where the glacis plates meet */
    cyl(P, [3.075, 0.95, 0.77], [3.075, -0.95, 0.77], 0.045, 0.045, 10);

    for (s = -1; s <= 1; s += 2) {
      var yi = s * A.HW, yo = s * A.FW;
      /* fender shelf low over the track, its turned-down lip [D57] [P57a] */
      box(P, -3.05, 2.36, yi, yo, A.FZ - 0.03, A.FZ);
      box(P, -3.05, 2.36, s * (A.FW - 0.025), yo, A.FZ - 0.08, A.FZ + 0.01);
      /* the big curved front mudguard over the idler [P57b] [P57c] */
      var MG = [];
      for (i = 0; i <= 8; i++) { var tt = i / 8 * Math.PI / 2; MG.push([2.22 + 0.92 * Math.sin(tt), A.FZ + 0.03 - 0.52 * (1 - Math.cos(tt))]); }
      for (i = 0; i + 1 < MG.length; i++) {
        belt(P, MG[i][0], MG[i][1], MG[i + 1][0], MG[i + 1][1], yi, yo, 0.035);
        belt(P, MG[i][0], MG[i][1] - 0.07, MG[i + 1][0], MG[i + 1][1] - 0.07, s * (A.FW - 0.03), s * (A.FW + 0.01), 0.17);
        belt(P, MG[i][0], MG[i][1] - 0.04, MG[i + 1][0], MG[i + 1][1] - 0.04, s * (A.HW + 0.02), s * (A.HW + 0.05), 0.10);
      }
      for (i = 0; i < 2; i++) {
        var yr = s * (1.22 + i * 0.22);
        for (k = 2; k + 1 < MG.length; k++) belt(P, MG[k][0], MG[k][1] + 0.02, MG[k + 1][0], MG[k + 1][1] + 0.02, yr - 0.015, yr + 0.015, 0.03);
      }
      /* rear fender end, turned down */
      belt(P, -3.05, A.FZ, -3.16, A.FZ - 0.16, yi, yo, 0.03);
      box(D, -3.0, 2.0, s * A.HW, s * (A.HW + 0.012), A.FZ, A.FZ + 0.02);
      /* towing hooks on the nose and the stern */
      box(D, 3.05, 3.17, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.66, 0.78);
      box(D, -3.17, -3.06, s * 0.62 - 0.07, s * 0.62 + 0.07, 0.64, 0.76);
    }
    /* fender stowage.  Right [P57d]: boxes and the long rounded tank; left [D57] [P57a]:
       the long run of boxes beside the turret and the exhaust outlet at the rear */
    var yI = A.HW + 0.05, yO = A.FW - 0.06, LB = [[1.40, 2.05, 0.30], [-0.40, 0.30, 0.32], [-1.30, -0.50, 0.30]];
    for (i = 0; i < LB.length; i++) {
      box(P, LB[i][0], LB[i][1], -yI, -yO, A.FZ, A.FZ + LB[i][2]);
      box(D, LB[i][1] - 0.30, LB[i][1] - 0.26, -yO, -yO - 0.006, A.FZ + 0.08, A.FZ + LB[i][2] - 0.06);
    }
    slab(P, 0.40, 1.30, A.FZ, A.FZ + 0.38, 0.12, -yI, -yO);
    for (x = 0.55; x < 1.3; x += 0.6) box(D, x, x + 0.04, -yI + 0.01, -yO - 0.01, A.FZ + 0.36, A.FZ + 0.385);
    box(P, -2.85, -2.05, yI, yO - 0.10, A.FZ, A.FZ + 0.14);
    box(D, -2.80, -2.10, yO - 0.10, yO - 0.06, A.FZ + 0.02, A.FZ + 0.12);
    var RB = [[1.55, 2.10], [0.85, 1.48], [0.15, 0.78], [-0.55, 0.08], [-1.25, -0.62], [-1.95, -1.32]];
    for (i = 0; i < RB.length; i++) {
      box(P, RB[i][0], RB[i][1], yI, yO, A.FZ, A.FZ + 0.30);
      box(D, RB[i][0] + 0.05, RB[i][1] - 0.05, yO + 0.006, yO, A.FZ + 0.22, A.FZ + 0.26);
    }
    box(T, -2.55, -2.15, -1.45, -1.20, A.FZ, A.FZ + 0.015);

    /* glacis: spare track links [P57b] [P57c], the driver's hatch front LEFT with its two
       periscopes, the headlamp in its guard on the RIGHT front [P57a] [P57b] [P57c] */
    var ang = Math.atan(0.577), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    for (k = 0; k < 2; k++) {
      x = 2.42 + k * 0.30;
      planeBox(D, [x, -0.30, g57(x)], u, [0, 1, 0], w, -0.06, 0.06, -0.29, 0.29, 0, 0.05);
      for (i = 0; i < 3; i++) planeBox(D, [x, -0.48 + i * 0.18, g57(x)], u, [0, 1, 0], w, -0.13, 0.13, -0.04, 0.04, 0, 0.07);
    }
    planeBox(D, [2.05, 0, g57(2.05)], u, [0, 1, 0], w, -0.01, 0.01, -0.97, 0.97, 0, 0.006);
    cylZ(P, 1.70, 0.52, A.DECK, A.DECK + 0.06, 0.26, 18);
    cylZ(P, 1.70, 0.52, A.DECK + 0.06, A.DECK + 0.08, 0.20, 14);
    box(G, 1.95, 2.02, 0.38, 0.48, A.DECK, A.DECK + 0.07);
    box(G, 1.95, 2.02, 0.56, 0.66, A.DECK, A.DECK + 0.07);
    cyl(P, [2.10, -1.22, A.FZ + 0.18], [2.24, -1.22, A.FZ + 0.18], 0.095, 0.10, 14);
    cyl(G, [2.24, -1.22, A.FZ + 0.18], [2.255, -1.22, A.FZ + 0.18], 0.085, 0.085, 14);
    box(P, 2.12, 2.18, -1.19, -1.25, A.FZ, A.FZ + 0.09);
    box(D, 2.30, 2.33, -1.06, -1.09, A.FZ, A.FZ + 0.31);
    box(D, 2.30, 2.33, -1.35, -1.38, A.FZ, A.FZ + 0.31);
    box(D, 2.30, 2.33, -1.06, -1.38, A.FZ + 0.28, A.FZ + 0.31);
    box(D, 2.05, 2.33, -1.06, -1.09, A.FZ + 0.28, A.FZ + 0.31);
    box(D, 2.05, 2.33, -1.35, -1.38, A.FZ + 0.28, A.FZ + 0.31);
    /* turret ring guard on the deck */
    cylZ(P, A.HX, 0, A.DECK, A.DECK + 0.05, 1.05, 32);

    /* engine deck: the louvred intake, the radiator grille across the rear, the team plate */
    box(P, -1.60, -1.10, -0.70, 0.70, A.DECK, A.DECK + 0.05);
    for (i = 0; i < 6; i++) box(D, -1.57 + i * 0.08, -1.53 + i * 0.08, -0.62, 0.62, A.DECK + 0.05, A.DECK + 0.06);
    box(D, -2.95, -2.00, -0.85, 0.85, A.DECK - 0.01, A.DECK + 0.012);
    for (i = 0; i < 7; i++) box(P, -2.92 + i * 0.13, -2.87 + i * 0.13, -0.83, 0.83, A.DECK + 0.012, A.DECK + 0.035);
    box(P, -1.95, -1.68, -0.55, 0.55, A.DECK, A.DECK + 0.03);
    box(T, -1.92, -1.71, -0.30, 0.30, A.DECK + 0.03, A.DECK + 0.045);

    /* the track, idler and sprocket */
    var L = trackLine([[A.IDL[0], A.IDL[1], A.IDL[2]], [A.XW[0], A.ZW, A.RW], [A.XW[3], A.ZW, A.RW], [A.SPR[0], A.SPR[1], A.SPR[2]]]);
    for (s = -1; s <= 1; s += 2) {
      var y = s * A.TY;
      addTrack(D, L, y - A.TW, y + A.TW, 0.274, 0.06);
      /* the centre guide horns between the twin wheels */
      sprocket(P, D, A.SPR[0], A.SPR[1], A.SPR[2], y - 0.20, y + 0.20, 13);
      cylY(P, A.SPR[0], y + s * 0.19, y + s * 0.25, A.SPR[1], 0.19, 14);
      cylY(D, A.SPR[0], y + s * 0.25, y + s * 0.30, A.SPR[1], 0.08, 8);
      cylY(P, A.IDL[0], y - 0.21, y + 0.21, A.IDL[1], A.IDL[2], 18);
      cylY(D, A.IDL[0], y + s * 0.20, y + s * 0.27, A.IDL[1], 0.11, 10);
      box(D, A.IDL[0] - 0.32, A.IDL[0], y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, A.IDL[1] - 0.04, A.IDL[1] + 0.04);
    }
  }
  /* the T-54 "starfish" twin wheel: tyres, dished face, eight holes and ribs */
  function wheel57(W, T) {
    var s, y, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * A.TY;
      W.col = T.rubber;
      cylY(W, 0, y - 0.25, y - 0.15, 0, A.RW, 18);
      cylY(W, 0, y + 0.15, y + 0.25, 0, A.RW, 18);
      W.col = T.steel;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.34, 16);
      cyl(W, [0, y + s * 0.25, 0], [0, y + s * 0.28, 0], 0.345, 0.20, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.12, 12);
      W.col = T.hole;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        planeBox(W, [Math.cos(a) * 0.255, y + s * 0.266, Math.sin(a) * 0.255], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], -0.055, 0.055, -0.012, 0.012, -0.045, 0.045);
      }
      W.col = T.rib;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        planeBox(W, [Math.cos(a) * 0.23, y + s * 0.27, Math.sin(a) * 0.23], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], -0.11, 0.11, -0.012, 0.012, -0.018, 0.018);
      }
      W.col = T.hubc;
      cylY(W, 0, y + s * 0.295, y + s * 0.32, 0, 0.055, 8);
    }
  }

  /* the open box turret, lofted UP through plan rings [z, front x, rear x, half width,
     front corner radius] measured off [D57] side and front: walls vertical to the crease
     at 2.20 m, leaning in above it, the front top rounding back to the rim [P57c] [P57d] */
  var TL57 = [[1.47, 1.30, -1.72, 1.36, 0.55], [1.80, 1.31, -1.72, 1.36, 0.55], [2.08, 1.30, -1.72, 1.35, 0.58],
              [2.22, 1.22, -1.71, 1.31, 0.62], [2.38, 1.08, -1.70, 1.21, 0.62], [2.52, 0.90, -1.69, 1.11, 0.60],
              [2.62, 0.68, -1.68, 1.03, 0.55]];
  var KC = 4;
  function planRing(z, fx, rx, hw, rf, off) {
    var pts = [], rr = 0.12, cs, k, a, i;
    fx -= off; rx += off; hw -= off; rf = Math.max(0.05, rf - off); rr = Math.max(0.04, rr - off);
    cs = [[fx - rf, -hw + rf, rf, -Math.PI / 2], [fx - rf, hw - rf, rf, 0], [rx + rr, hw - rr, rr, Math.PI / 2], [rx + rr, -hw + rr, rr, Math.PI]];
    for (i = 0; i < 4; i++) for (k = 0; k <= KC; k++) {
      a = cs[i][3] + k / KC * Math.PI / 2;
      pts.push([cs[i][0] + Math.cos(a) * cs[i][2], cs[i][1] + Math.sin(a) * cs[i][2], z]);
    }
    return pts;
  }
  /* bridge two counter-clockwise plan rings; the face is turned to the edge's outward
     normal in plan (sgn -1 for the inner wall) */
  function bridge(bin, R0, R1, sgn) {
    var n = R0.length, i, j, ex, ey;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      ex = R0[j][0] - R0[i][0] + R1[j][0] - R1[i][0]; ey = R0[j][1] - R0[i][1] + R1[j][1] - R1[i][1];
      quad(bin, R0[i], R0[j], R1[j], R1[i], [ey * sgn, -ex * sgn, 0]);
    }
  }
  function turret57(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, i, k, s, cx = -0.2;
    var O = TL57.map(function (r) { return planRing(r[0], r[1], r[2], r[3], r[4], 0); });
    var I = TL57.map(function (r) { return planRing(r[0], r[1], r[2], r[3], r[4], 0.04); });
    I[0] = planRing(1.53, TL57[0][1], TL57[0][2], TL57[0][3], TL57[0][4], 0.04);
    for (k = 0; k + 1 < O.length; k++) { bridge(P, O[k], O[k + 1], 1); bridge(P, I[k], I[k + 1], -1); }
    /* the rim and the foot */
    var n = O[0].length, top = O.length - 1;
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      quad(P, O[top][i], O[top][j], I[top][j], I[top][i], [0, 0, 1]);
      quad(P, O[0][i], O[0][j], I[0][j], I[0][i], [0, 0, -1]);
    }
    /* the side crease line and the turret floor inside */
    for (s = -1; s <= 1; s += 2) box(D, -1.40, 0.95, s * 1.362, s * 1.372, 2.19, 2.205);
    var F = planRing(1.53, 1.26, -1.68, 1.32, 0.51, 0), Fc = [cx, 0, 1.53];
    for (i = 0; i < F.length; i++) quad(D, Fc, F[i], F[(i + 1) % F.length], F[(i + 1) % F.length], [0, 0, 1]);
    /* the rear wall's removable plate seam and the team strip on its rim, facing up */
    box(T, -1.71, -1.65, -0.70, 0.70, 2.62, 2.635);
    box(D, -1.745, -1.72, -0.95, 0.95, 1.62, 1.64);

    /* the gun mount: twin S-68 on one cradle, trunnions at 2.10 m, x 0.95 [D57]; the guns
       side by side 0.62 m apart [P57b]; barrels 4.365 m with the muzzle brake (en.wiki) */
    var e = V.el * Math.PI / 180, d = [Math.cos(e), 0, Math.sin(e)], up = [-Math.sin(e), 0, Math.cos(e)], Pt;
    box(D, 0.45, 1.05, -0.62, 0.62, 1.53, 1.95);
    cylY(D, 0.95, -0.62, 0.62, 2.10, 0.16, 14);
    for (s = -1; s <= 1; s += 2) {
      Pt = [0.95, s * 0.31, 2.10];
      /* breech and receiver inside, the cradle sleeve through the front, the barrel */
      planeBox(D, Pt, d, [0, 1, 0], up, -1.05, 0.20, -0.12, 0.12, -0.16, 0.14);
      planeBox(P, Pt, d, [0, 1, 0], up, 0.20, 0.62, -0.15, 0.15, -0.17, 0.15);
      tube(P, Pt, d, 0.62, 1.30, 0.105, 0.095, 14);
      tube(D, Pt, d, 1.30, 1.36, 0.115, 0.115, 14);
      tube(D, Pt, d, 1.36, 4.00, 0.050, 0.046, 12);
      /* the slotted muzzle brake: a fat drum with rings of ports, the muzzle 4.45 m ahead
         of the trunnion ([D57]: 8.6 m over the guns laid level; published 8.46 m) */
      tube(D, Pt, d, 4.00, 4.45, 0.085, 0.085, 14);
      for (k = 0; k < 3; k++) {
        var cc = 4.08 + k * 0.12;
        tube(D, Pt, d, cc, cc + 0.05, 0.093, 0.093, 14);
      }
      /* the loaders' clip trays beside each breech */
      planeBox(D, Pt, d, [0, 1, 0], up, -0.60, -0.10, s * 0.13, s * 0.30, 0.05, 0.18);
    }
    planeBox(P, [0.95, 0, 2.10], d, [0, 1, 0], up, 0.28, 0.55, -0.20, 0.20, -0.10, 0.08);
    /* the embrasure in the front plate where the guns pass */
    box(D, 1.20, 1.315, -0.50, 0.50, 1.86, 2.30);
    /* the gunner's reflex sight and its hood (left), the commander's seat (right) */
    box(P, 0.10, 0.45, 0.55, 0.85, 1.53, 2.30);
    box(G, 0.44, 0.47, 0.60, 0.80, 2.18, 2.28);
    box(D, -0.55, -0.15, -0.85, -0.45, 1.53, 1.88);
    box(D, -0.55, -0.15, 0.35, 0.75, 1.53, 1.88);
    /* ready clips stowed round the rear inside wall (en.wiki) */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) box(D, -1.60 + i * 0.26, -1.40 + i * 0.26, s * 1.10, s * 1.28, 1.53, 2.05);
    /* the grab rails standing on the side rims [D57 side and front] [P57d] */
    for (s = -1; s <= 1; s += 2) {
      cyl(D, [-0.42, s * 1.01, 2.62], [-0.45, s * 1.0, 2.72], 0.025, 0.025, 6);
      cyl(D, [-1.32, s * 1.01, 2.62], [-1.29, s * 1.0, 2.72], 0.025, 0.025, 6);
      cyl(D, [-0.45, s * 1.0, 2.72], [-1.29, s * 1.0, 2.72], 0.025, 0.025, 6);
    }
    /* the spent-case basket on the rear wall: a frame wider at the top, wire mesh in a
       grid of thin bars [D57] [P57d] */
    var bz0 = 1.85, bz1 = 2.60, bx0 = -1.73, bxb = -2.12, bxt = -2.32, by = 1.02;
    for (s = -1; s <= 1; s += 2) {
      cyl(D, [bxb, s * by, bz0], [bxt, s * by, bz1], 0.022, 0.022, 6);
      cyl(D, [bx0, s * by, bz0], [bxb, s * by, bz0], 0.022, 0.022, 6);
      cyl(D, [bx0, s * by, bz1], [bxt, s * by, bz1], 0.022, 0.022, 6);
    }
    cyl(D, [bxb, by, bz0], [bxb, -by, bz0], 0.022, 0.022, 6);
    cyl(D, [bxt, by, bz1], [bxt, -by, bz1], 0.022, 0.022, 6);
    for (i = 1; i < 6; i++) {
      var tz = bz0 + (bz1 - bz0) * i / 6, tx = bxb + (bxt - bxb) * i / 6;
      box(D, tx - 0.008, tx + 0.008, -by, by, tz - 0.006, tz + 0.006);
      for (s = -1; s <= 1; s += 2) box(D, bx0, tx, s * by - 0.006, s * by + 0.006, tz - 0.006, tz + 0.006);
    }
    for (i = -4; i <= 4; i++) cyl(D, [bxb, i * 0.22, bz0], [bxt, i * 0.22, bz1], 0.008, 0.008, 4);
    box(D, bx0 - 0.40, bx0, -by, by, bz0 - 0.01, bz0 + 0.01);
    for (i = -4; i <= 4; i++) box(D, bx0 - 0.40, bx0, i * 0.22 - 0.006, i * 0.22 + 0.006, bz0, bz0 + 0.012);
    /* the conveyor's port in the rear wall */
    box(D, -1.75, -1.72, -0.30, 0.30, 2.15, 2.40);
  }

  /* ================================================================ ZSU-23-4 */
  /* running gear [P23a] [D23] [P23e]: six single wheels at a 0.83 m pitch, front idler
     raised, REAR sprocket (en.wiki), 382 mm track */
  var S = {
    XW: [2.16, 1.33, 0.50, -0.33, -1.16, -1.99], ZW: 0.43, RW: 0.35, TY: 1.37, TW: 0.19,
    IDL: [2.92, 0.66, 0.25], SPR: [-2.78, 0.62, 0.28], DECK: 1.76, HX: 0.0
  };
  /* hull half-section [D23 front] [P23d]: belly, the lower hull between the tracks, the
     sponson underside over the track, the vertical upper side, the deck edge */
  var HULL23 = [[0, 0.375], [1.08, 0.375], [1.15, 0.46], [1.15, 1.00], [1.50, 1.02], [1.525, 1.06],
                [1.525, 1.71], [1.50, S.DECK], [0, S.DECK]];
  /* stations [x, deck/glacis top, belly/plate bottom]: x off [D23], z off [P23a] at 101 px/m
     (its 0.70 m wheel and 6.4 m hull agree), clearance 375 mm (en.wiki) */
  var HST23 = [[-3.27, 1.62, 0.78], [-3.22, 1.71, 0.60], [-3.12, S.DECK, 0.40], [-2.95, S.DECK, 0.375],
               [2.70, S.DECK, 0.375], [2.88, 1.62, 0.50], [3.05, 1.47, 0.72], [3.18, 1.37, 0.98],
               [3.27, 1.30, 1.18]];
  function hull23(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, x, k;
    stationLoft(P, HULL23, HST23);
    /* glacis: the driver's raised hatch cover with its window, front LEFT; the lamp box
       with two lamps front RIGHT; the ribbed step plate; tow hooks [P23d] */
    var gu = unit([-(3.27 - 2.70), 0, S.DECK - 1.30]), gn = unit([S.DECK - 1.30, 0, 3.27 - 2.70]);
    planeBox(P, [3.27, 0, 1.30], gu, [0, 1, 0], gn, 0.10, 0.62, 0.20, 0.95, 0, 0.13);
    planeBox(G, [3.27, 0, 1.30], gu, [0, 1, 0], gn, 0.18, 0.40, 0.32, 0.83, 0.13, 0.14);
    planeBox(P, [3.27, 0, 1.30], gu, [0, 1, 0], gn, 0.20, 0.62, -1.46, -0.95, 0, 0.22);
    for (i = 0; i < 2; i++) {
      var lp = [3.27 + gu[0] * 0.40 + gn[0] * 0.22, -1.08 - i * 0.24, 1.30 + gu[2] * 0.40 + gn[2] * 0.22];
      cyl(G, lp, [lp[0] + gn[0] * 0.03, lp[1], lp[2] + gn[2] * 0.03], 0.085, 0.085, 12);
    }
    planeBox(D, [3.27, 0, 1.30], gu, [0, 1, 0], gn, 0.06, 0.30, -0.65, -0.25, 0, 0.03);
    planeBox(T, [3.27, 0, 1.30], gu, [0, 1, 0], gn, 0.10, 0.40, -0.10, 0.12, 0, 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(D, 3.18, 3.30, s * 0.55 - 0.06, s * 0.55 + 0.06, 1.10, 1.22);
      box(D, -3.33, -3.22, s * 0.62 - 0.06, s * 0.62 + 0.06, 1.05, 1.17);
    }
    /* deck: the plate ahead of the turret, the engine deck louvres and the exhaust grille
       across the stern, the team plate */
    box(P, 1.75, 2.62, -1.30, 1.30, S.DECK - 0.01, S.DECK + 0.03);
    box(D, -3.05, -1.75, -1.10, 1.10, S.DECK - 0.01, S.DECK + 0.012);
    for (x = -3.0; x < -1.80; x += 0.13) box(P, x, x + 0.05, -1.08, 1.08, S.DECK + 0.012, S.DECK + 0.035);
    box(P, -1.65, -1.25, -0.90, -0.30, S.DECK - 0.01, S.DECK + 0.04);
    box(T, -1.60, -1.30, 0.35, 0.85, S.DECK, S.DECK + 0.015);
    box(D, -3.30, -3.26, -0.90, 0.90, 1.32, 1.56);
    for (k = 0; k < 5; k++) box(P, -3.31, -3.27, -0.88, 0.88, 1.34 + k * 0.045, 1.355 + k * 0.045);
    /* hull sides.  Right [P23a]: two large access panels and a small one, a filler cap;
       left [P23b]: two round plates, the long grab rail */
    for (s = -1; s <= 1; s += 2) {
      var ys = s * 1.525, yo = s * 1.552;
      if (s < 0) {
        slab(P, -2.70, -1.80, 1.12, 1.62, 0.10, ys, yo);
        slab(P, 0.95, 2.15, 1.12, 1.62, 0.10, ys, yo);
        slab(P, -1.45, -0.60, 1.20, 1.56, 0.06, ys, yo);
        box(D, -1.12, -0.92, yo, yo - 0.01, 1.30, 1.46);
        cylY(P, 0.30, ys, yo, 1.48, 0.08, 12);
      } else {
        cylY(P, 2.55, ys, yo + 0.005, 1.38, 0.20, 18);
        cylY(P, 1.85, ys, yo + 0.005, 1.38, 0.20, 18);
        cylY(P, -2.30, ys, yo, 1.38, 0.16, 16);
        box(D, -1.80, 0.40, yo, yo + 0.012, 1.52, 1.55);
      }
      /* the sponson's lower lip */
      box(D, -3.10, 2.80, s * 1.50, s * 1.53, 1.00, 1.03);
    }
    /* the track, the raised idler at the front, the toothed sprocket at the rear */
    /* the top run sags onto the wheel tops between idler and sprocket [P23a] [P23e] */
    var tops = [], it;
    for (it = 0; it < S.XW.length; it++) tops.push([S.XW[it], S.ZW + S.RW + 0.045]);
    var L = trackLine([[S.IDL[0], S.IDL[1], S.IDL[2]], [S.XW[0], S.ZW, S.RW], [S.XW[5], S.ZW, S.RW], [S.SPR[0], S.SPR[1], S.SPR[2]]], tops);
    for (s = -1; s <= 1; s += 2) {
      var y = s * S.TY;
      addTrack(D, L, y - S.TW, y + S.TW, 0.13, 0.03);
      sprocket(P, D, S.SPR[0], S.SPR[1], S.SPR[2], y - 0.12, y + 0.12, 14);
      cylY(P, S.SPR[0], y + s * 0.12, y + s * 0.16, S.SPR[1], 0.20, 14);
      cylY(D, S.SPR[0], y + s * 0.16, y + s * 0.20, S.SPR[1], 0.07, 8);
      cylY(D, S.IDL[0], y - 0.15, y + 0.15, S.IDL[1], S.IDL[2], 16);
      cylY(P, S.IDL[0], y + s * 0.14, y + s * 0.17, S.IDL[1], S.IDL[2] - 0.04, 16);
      cylY(D, S.IDL[0], y + s * 0.17, y + s * 0.21, S.IDL[1], 0.07, 8);
    }
  }
  /* the single wheel [P23a] [P23b]: rubber tyre, a dished disc with twelve radial ribs, hub */
  function wheel23(W, T) {
    var s, y, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * S.TY;
      W.col = T.rubber;
      cylY(W, 0, y - 0.15, y + 0.15, 0, S.RW, 18);
      W.col = T.steel;
      cylY(W, 0, y - 0.155, y + 0.155, 0, 0.30, 18);
      cyl(W, [0, y + s * 0.155, 0], [0, y + s * 0.19, 0], 0.30, 0.14, 18);
      W.col = T.rib;
      for (i = 0; i < 12; i++) {
        a = i / 12 * TAU;
        planeBox(W, [Math.cos(a) * 0.21, y + s * 0.165, Math.sin(a) * 0.21], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], -0.08, 0.08, -0.014, 0.014, -0.016, 0.016);
      }
      W.col = T.hubc;
      cylY(W, 0, y + s * 0.18, y + s * 0.20, 0, 0.075, 10);
    }
  }
  /* the turret, built in model coordinates [D23] [P23a] [P23d]: a wide body with sloping
     flanks and a sloped front, flat roof at 2.24 m */
  var TUR23 = [[0, 1.53], [1.45, 1.53], [1.45, 1.62], [1.36, 1.98], [1.18, 2.24], [0, 2.24]];
  var TST23 = [[-1.58, 2.14, 1.53, 0.95], [-1.50, 2.24, 1.53, 1.0], [0.95, 2.24, 1.53, 1.0],
               [1.30, 2.02, 1.53, 0.98], [1.64, 1.70, 1.53, 0.93]];
  function turret23(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, k;
    /* built on a 1.53 m base and lifted onto the 1.76 m deck at the end */
    /* the ring band with its bolt heads [D23] */
    cylZ(P, S.HX, 0, 1.52, 1.58, 1.30, 36);
    for (i = 0; i < 24; i++) { var ab = i / 24 * TAU; cylZ(D, S.HX + Math.cos(ab) * 1.31, Math.sin(ab) * 1.31, 1.545, 1.565, 0.02, 5); }
    stationLoft(P, TUR23, TST23);
    /* the big rounded cheek boxes either side of the guns, running past the front [P23d] */
    for (s = -1; s <= 1; s += 2) {
      slab(P, -0.25, 1.80, 1.64, 2.30, 0.17, s * 0.58, s * 1.44);
      slab(P, 1.40, 1.84, 1.60, 1.95, 0.10, s * 0.62, s * 1.40);
      box(D, 0.10, 1.40, s * 1.44, s * 1.445, 2.02, 2.04);
      /* the X panel and the long ribbed box on the flank [P23b] [P23c] */
      planeBox(P, [0.80, s * 1.44, 1.80], [1, 0, 0], [0, 0, 1], [0, s * 1, 0], -0.20, 0.20, -0.15, 0.15, -0.02, 0.03);
      planeBox(D, [0.80, s * 1.47, 1.80], unit([1, 0, 0.75]), unit([-0.75, 0, 1]), [0, s, 0], -0.24, 0.24, -0.015, 0.015, 0, 0.01);
      planeBox(D, [0.80, s * 1.47, 1.80], unit([1, 0, -0.75]), unit([0.75, 0, 1]), [0, s, 0], -0.24, 0.24, -0.015, 0.015, 0, 0.01);
      slab(P, -1.45, 0.55, 1.62, 1.92, 0.08, s * 1.36, s * 1.50);
      for (k = 0; k < 3; k++) box(P, -1.40, 0.50, s * 1.50, s * 1.52, 1.68 + k * 0.08, 1.70 + k * 0.08);
    }
    /* the gun embrasure between the cheek boxes and the four 23 mm guns: an upper and a
       lower cradle (ru.wiki), the barrels in vertical pairs left and right [P23d] */
    box(D, 1.20, 1.66, -0.56, 0.56, 1.62, 2.12);
    var e = V.el * Math.PI / 180, d = [Math.cos(e), 0, Math.sin(e)], up = [-Math.sin(e), 0, Math.cos(e)], Pt, j;
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) {
        Pt = [1.30 + j * 0.10, s * 0.26, j ? 1.82 : 2.04];
        planeBox(D, Pt, d, [0, 1, 0], up, -0.25, 0.40, -0.09, 0.09, -0.08, 0.08);
        tube(P, Pt, d, 0.40, 1.15, 0.065, 0.060, 10);
        tube(D, Pt, d, 1.15, 1.80, 0.030, 0.030, 8);
        tube(D, Pt, d, 1.80, 1.95, 0.045, 0.045, 10);
      }
      /* the link brackets tying each vertical pair */
      planeBox(D, [1.35, s * 0.26, 1.93], d, [0, 1, 0], up, 0.95, 1.02, -0.03, 0.03, -0.14, 0.14);
      planeBox(D, [1.35, s * 0.26, 1.93], d, [0, 1, 0], up, 1.55, 1.60, -0.025, 0.025, -0.13, 0.13);
    }
    /* roof: the commander's hatch and cupola LEFT of the radar [P23c], the gunner's hatch,
       periscope heads, the team plate */
    cylZ(P, -0.35, 0.62, 2.24, 2.34, 0.30, 18);
    cylZ(P, -0.35, 0.62, 2.34, 2.38, 0.25, 18);
    for (i = 0; i < 4; i++) {
      var ap = (i / 4 - 0.1) * Math.PI + Math.PI * 0.1, px = -0.35 + Math.cos(ap) * 0.30, py = 0.62 + Math.sin(ap) * 0.30;
      box(G, px - 0.04, px + 0.04, py - 0.04, py + 0.04, 2.30, 2.35);
    }
    cylZ(P, 0.40, -0.55, 2.24, 2.31, 0.26, 16);
    box(G, 0.66, 0.70, -0.70, -0.45, 2.26, 2.33);
    box(P, 0.58, 0.68, -0.72, -0.43, 2.24, 2.34);
    box(T, -0.10, 0.30, -0.25, 0.25, 2.24, 2.255);
    box(D, 0.80, 1.10, 0.30, 0.50, 2.24, 2.27);
    /* the radar: the drive pedestal over the turret rear, the folding mast, the RPK-2
       dish raised and facing forward, its feed, and the electronics box behind [P23a]
       [P23b] [P23c] [D23] */
    box(P, -1.62, -0.92, -0.42, 0.42, 2.24, 2.40);
    box(P, -1.70, -1.20, -0.30, 0.30, 2.40, 2.62);
    for (s = -1; s <= 1; s += 2) {
      cyl(P, [-1.30, s * 0.22, 2.40], [-1.22, s * 0.20, 2.88], 0.045, 0.040, 8);
      cylY(D, -1.22, s * 0.16, s * 0.27, 2.88, 0.06, 10);
    }
    cylY(P, -1.22, -0.18, 0.18, 2.88, 0.07, 12);
    var dc = [-1.05, 0, 2.90], dn = unit([1, 0, 0.18]);
    cyl(P, [dc[0] - dn[0] * 0.20, 0, dc[2] - dn[2] * 0.20], dc, 0.10, 0.44, 28);
    cyl(D, dc, [dc[0] + dn[0] * 0.012, 0, dc[2] + dn[2] * 0.012], 0.42, 0.42, 28);
    cyl(D, dc, [dc[0] + dn[0] * 0.30, 0, dc[2] + dn[2] * 0.30], 0.018, 0.018, 6);
    cyl(P, [dc[0] + dn[0] * 0.30, 0, dc[2] + dn[2] * 0.30], [dc[0] + dn[0] * 0.36, 0, dc[2] + dn[2] * 0.36], 0.04, 0.03, 8);
    for (s = -1; s <= 1; s += 2) cyl(D, [dc[0] + 0.02, s * 0.30, dc[2] + 0.02], [dc[0] + dn[0] * 0.30, 0, dc[2] + dn[2] * 0.30], 0.008, 0.008, 4);
    box(P, -1.55, -1.24, -0.22, 0.22, 2.70, 3.06);
    box(D, -1.555, -1.54, -0.15, 0.15, 2.78, 2.98);
    var b, j2;
    for (b in B) for (j2 = 2; j2 < B[b].P.length; j2 += 3) B[b].P[j2] += S.DECK - 1.53;
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.Z23, is57 = which === "Z57", Tm = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(Tm), TB = bins(Tm), i, wg, W, R = is57 ? A : S;
    (is57 ? hull57 : hull23)(HB);
    flush(THREE, g, HB);
    for (i = 0; i < R.XW.length; i++) {
      W = new Bin(Tm.wheel, false, true);
      (is57 ? wheel57 : wheel23)(W, Tm);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(R.XW[i], 0, R.ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    (is57 ? turret57 : turret23)(TB, V);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(R.HX, 0, 0);
    flush(THREE, wg, TB, R.HX);
    g.add(wg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e50_spaag"] = { len: 8.39, build: function (THREE, M, C) { return HeroZsu.build(THREE, M, C, "Z57"); } };
UNIT_MODELS["pact_e60_spaag"] = { len: 6.66, build: function (THREE, M, C) { return HeroZsu.build(THREE, M, C, "Z23"); } };
/* the KPA's ZSU-57-2 (row service 1968): the same vehicle, no markings drawn */
UNIT_MODELS["kpa_e60_spaag"] = { len: 8.39, build: function (THREE, M, C) { return HeroZsu.build(THREE, M, C, "Z57"); } };
