/* ============ ru_bmd.js - HERO models: the BMD-2 and BMD-3 airborne combat vehicles ============
   Two rows, two different hulls, one turret family:
     pact_e80_lighttank   BMD-2 (1985)  the small aluminium BMD-1 hull, boat bow with trim vane, five road
                                        wheels, rear sprocket, front idler, return rollers; one-man turret
                                        with the 30 mm 2A42, 7.62 mm coaxial, the 9P135M launcher on the roof
     pact_e90_lighttank   BMD-3 (1990)  the larger, longer, wider new hull (6.0 x 3.13 m): flat blunt bow with
                                        two bow weapon pods, hull sides overhanging the tracks, five road
                                        wheels, rear sprocket; the BMD-2-type turret
   (pact_e00_lighttank, the 2S25 Sprut-SD, is NOT registered here.)

   References (Wikimedia Commons, fetched with a generic agent string):
     "BMD-2.jpg"                    BMD-2 on show, side-on, green, hull and wheels
     "Ukrainian BMD-2 tank (3).JPG" BMD-2 No. 408 in a parade, close three-quarter of the bow and the roof
     "BMD-3 1.jpg", "BMD-3 2.jpg"   BMD-3 side three-quarter and a front three-quarter, three-tone paint
   What each feature rests on (all checked by the check-and-fix pass against the four photographs):
     - BMD-2 (parade No. 408 and the show vehicle with parachute stowage): tall blunt boat bow, flat upper glacis
       with a louvred grille and a folded trim vane across its top, a round headlamp housing on each upper hull
       side near the bow, a flared mudguard step over each front track, lifting eyes along the roof edge, a light
       belt line down the hull side
     - BMD-2 running gear: FIVE disc road wheels with a hole ring, a toothed REAR sprocket (engine is aft), a plain
       front idler; TWO return rollers on the upper run (counted on both photographs: about 0.03 m and -0.78 m on
       the model x axis); armour_specs says rollers:4, the photographs win
     - BMD-2 turret: small rounded one-man turret, 30 mm gun out of the front, sight head, a hatch; the 9P135M launcher
       raised on the turret roof pointing forward, on the centre line ahead of the hatch (parade photograph).  The
       turret is lifted 0.14 m on a riser ring so the roof is about 1.85 m above the ground, as published (about 2.0)
     - BMD-3 (two photographs of a modern Russian vehicle in a three-colour scheme; NOT copied - a 1990s row is
       drawn in plain Russian green): wide flat-sided hull, steep trapezoid glacis over a vertical lower plate,
       a round ball-mount cover on the glacis to starboard and a sack-covered mount to port (the AGS-17 and the
       RPK bow positions; which weapon is which is not shown), a round lamp at each front corner, five road
       wheels, a toothed rear sprocket, NO return rollers visible, two whip aerials behind the turret
     - BMD-3 turret: BMD-2 type, larger; a drum lamp front left, sight head, hatches, a smoke-grenade cluster
       each side of the turret rear; NO launcher is visible on either photograph, so none is drawn
   NOT drawn because no photograph confirms them: BMD-2 snorkel and side machine gun (armour_specs extras), a BMD-3
   launcher, any camouflage.  Hull side rod seen on one BMD-2 photograph is not modelled.
   Published figures (en.wikipedia infobox, fetched with a generic agent string): BMD-2 length 5.91 m gun forward
   (hull 5.4), width 2.63 m, height 1.97 m; BMD-3 length 6.0 m, width 3.13 m, height 2.25 m.  Model: BMD-2 5.44 x
   2.68 x about 2.15 (launcher raised); BMD-3 6.08 x 3.16 x about 2.2 without the whips, about 2.9 with them.
   Five materials (paint, dark, glass, wheel, team); team colour exactly C.team in two small flat strips per vehicle.
   Named nodes: "turret" (ring centre on the hull roof, gun along +X), five "roadwheel" groups (Y axle,
   both sides in one mesh).  Model space +X bow, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBMD = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var CUR = null;      /* the variant being built */

  /* ---- geometry helpers (as in ru_bmp12.js) ---- */
  /* ---- geometry helpers (as in ru_pt76.js) ---- */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i;
    for (i = 0; i < 3; i++) { this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]); }
  };
  /* a closed solid: signed volume says whether the faces point out; turned if not */
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
  function box(bin, x0, x1, y0, y1, z0, z1) {
    solid(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
                [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], HEXF);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    solid(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
                [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]], HEXF);
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 10); }

  /* a loft through sections of the same point count, closed at both ends (flat fans) */
  function loft(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (k = 1; k + 1 < n; k++) F.push([0, k, k + 1]);
    var L = (rings.length - 1) * n;
    for (k = 1; k + 1 < n; k++) F.push([L, L + k, L + k + 1]);
    solid(bin, V, F);
  }


  /* smooth-sided loft: rings of equal point count, flat caps; side normals averaged */
  function loftS(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1, f, vol = 0, ox = 1;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    var ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    /* fans for the caps need the volume of the whole closed solid: close with the centroids */
    var cA = [0, 0, 0], cB = [0, 0, 0];
    for (k = 0; k < n; k++) for (i = 0; i < 3; i++) { cA[i] += V[k][i] / n; cB[i] += V[ns - n + k][i] / n; }
    for (k = 0; k < n; k++) {
      vol += dot(cA, cross(V[(k + 1) % n], V[k]));
      vol += dot(cB, cross(V[ns - n + k], V[ns - n + (k + 1) % n]));
    }
    var sg = vol < 0 ? -1 : 1, Nv = [], t;
    for (i = 0; i < ns; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; t = unit(cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]])));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += t[0] * sg; Nv[f[k]][1] += t[1] * sg; Nv[f[k]][2] += t[2] * sg; }
    }
    for (i = 0; i < ns; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      if (sg > 0) bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
      else bin.tri(V[f[0]], V[f[2]], V[f[1]], Nv[f[0]], Nv[f[2]], Nv[f[1]]);
    }
    for (k = 0; k < n; k++) {
      a = V[k]; b = V[(k + 1) % n]; c0 = V[ns - n + k]; c1 = V[ns - n + (k + 1) % n];
      if (sg > 0) { bin.tri(cA, b, a); bin.tri(cB, c0, c1); } else { bin.tri(cA, a, b); bin.tri(cB, c1, c0); }
    }
  }
  /* a radial rib on a wheel face: centre line from radius r0 to r1 at angle ph, width w */
  function rib(bin, y, ph, r0, r1, w, h, zc) {
    var c = Math.cos(ph), s = Math.sin(ph), tx = -s * w / 2, tz = c * w / 2, y0 = y, y1 = y + h, V = [], P = [[r0, 1], [r1, 1]], i, q, d;
    for (d = 0; d < 2; d++) for (i = 0; i < 2; i++) {
      q = P[i][0];
      V.push([q * c - tx, d ? y1 : y0, zc + q * s - tz], [q * c + tx, d ? y1 : y0, zc + q * s + tz]);
    }
    /* V: 0,1 = inner end (y0); 2,3 = outer end (y0); 4,5 = inner end (y1); 6,7 = outer end (y1) */
    solid(bin, [V[0], V[2], V[3], V[1], V[4], V[6], V[7], V[5]], HEXF);
  }

  /* ring: z, half length forward, half length aft, half width, centre x, squareness exponent */
  function tring(r, n) {
    var pts = [], k, c, s, a, e = r[5] || 2, px, py;
    for (k = 0; k < n; k++) {
      a = k / n * TAU; c = Math.cos(a); s = Math.sin(a);
      px = Math.pow(Math.abs(c), 2 / e) * (c < 0 ? -1 : 1); py = Math.pow(Math.abs(s), 2 / e) * (s < 0 ? -1 : 1);
      pts.push([r[4] + (c >= 0 ? r[1] : r[2]) * px, r[3] * py, r[0]]);
    }
    return pts;
  }

  function flush(THREE, group, B, off, dz) {
    var k, b, geo, cols, i, c, col, f;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (dz) for (i = 2; i < b.P.length; i += 3) {
        f = b.P[i];
        b.P[i] = f <= -0.04 ? f : (f < 0.20 ? f + dz * (f + 0.04) / 0.24 : f + dz);
      }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.camo) {
        cols = new Float32Array(b.P.length);
        for (i = 0; i < b.P.length; i += 3) {
          c = b.camo(b.P[i] + off[0], b.P[i + 1] + off[1], b.P[i + 2] + off[2]);
          cols[i] = c.r; cols[i + 1] = c.g; cols[i + 2] = c.b;
        }
        geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
      }
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  var VARIANTS = {
    /* BMD-2 */
    A: { name: "BMD-2", paint: 0x4c5a38, camo: false, ROOF: 1.22, TYC: 1.15, TH: 0.125,
         XW: [1.30, 0.55, -0.20, -0.95, -1.70], ZW: 0.29, RW: 0.25, IDL: [2.05, 0.34, 0.20], SPR: [-2.40, 0.38, 0.24], TD: 0.14,
         ROLL: [0.03, -0.78], RZ: 0.50, tx: 0.15, pitch: 0.12,
         ST: [[-2.70, 0.50, 0.85, 0.78, 1.05, 1.12, 1.00], [-2.45, 0.40, 0.95, 0.78, 1.14, 1.20, 1.08],
              [-0.50, 0.40, 0.98, 0.78, 1.16, 1.22, 1.10], [1.30, 0.40, 0.98, 0.78, 1.16, 1.22, 1.10],
              [1.85, 0.42, 0.92, 0.76, 1.10, 1.14, 1.00], [2.30, 0.50, 0.74, 0.72, 0.86, 0.94, 0.76],
              [2.62, 0.60, 0.46, 0.70, 0.52, 0.82, 0.44], [2.72, 0.64, 0.24, 0.70, 0.28, 0.78, 0.22]] },
    /* BMD-3 */
    B: { name: "BMD-3", paint: 0x56633f, camo: false, ROOF: 1.38, TYC: 1.30, TH: 0.15,
         XW: [1.55, 0.73, -0.09, -0.91, -1.73], ZW: 0.32, RW: 0.28, IDL: [2.28, 0.36, 0.22], SPR: [-2.65, 0.42, 0.28], TD: 0.12,
         ROLL: [], RZ: 0.5, tx: 0.30, pitch: 0.14,
         ST: [[-3.00, 0.58, 1.00, 0.90, 1.50, 1.30, 1.46], [-2.80, 0.50, 1.10, 0.88, 1.56, 1.38, 1.52],
              [-0.20, 0.50, 1.12, 0.88, 1.57, 1.38, 1.52], [1.80, 0.50, 1.12, 0.88, 1.57, 1.38, 1.52],
              [2.45, 0.54, 1.06, 0.86, 1.52, 1.30, 1.46], [2.85, 0.62, 0.92, 0.84, 1.38, 1.14, 1.28],
              [3.02, 0.70, 0.74, 0.82, 1.12, 1.00, 0.96]] }
  };

  function materials(THREE, C, V) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: V.camo ? 0xffffff : V.paint, roughness: 0.9, metalness: 0.05, vertexColors: !!V.camo });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: V.camo ? 0x3b4334 : 0x3e4733, roughness: 0.88, metalness: 0.12 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, camo) {
    var b = { paint: new Bin(T.paint), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team) };
    if (camo) b.paint.camo = camo;
    return b;
  }

  /* the track loop: convex hull of the idler, sprocket and road wheels (x, z) */
  function trackLoop() {
    var V = CUR, pts = [], i, k, c, a, circ = [[V.IDL[0], V.IDL[1], V.IDL[2] + 0.03], [V.SPR[0], V.SPR[1], V.SPR[2] + 0.03]];
    for (i = 0; i < V.XW.length; i++) circ.push([V.XW[i], V.ZW, V.RW + 0.03]);
    for (i = 0; i < circ.length; i++) for (k = 0; k < 28; k++) {
      a = k / 28 * TAU; c = circ[i];
      pts.push([c[0] + c[2] * Math.cos(a), c[1] + c[2] * Math.sin(a)]);
    }
    pts.sort(function (u, v) { return u[0] - v[0] || u[1] - v[1]; });
    function cr(o, a2, b2) { return (a2[0] - o[0]) * (b2[1] - o[1]) - (a2[1] - o[1]) * (b2[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop(); lo.push(pts[i]); }
    for (i = pts.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop(); up.push(pts[i]); }
    lo.pop(); up.pop();
    return lo.concat(up);
  }
  function addTrack(B, side) {
    var V = CUR, H = trackLoop(), n = H.length, len = [], tot = 0, i, j, a, b, d, nl, p, t, pos, seg, ang, cx, cz, hl, th = 0.04;
    for (i = 0; i < n; i++) { a = H[i]; b = H[(i + 1) % n]; d = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])); len.push(d); tot += d; }
    nl = Math.round(tot / V.pitch); p = tot / nl;
    var ya = Math.min(side * (V.TYC - V.TH), side * (V.TYC + V.TH)), yb = Math.max(side * (V.TYC - V.TH), side * (V.TYC + V.TH));
    for (j = 0; j < nl; j++) {
      pos = (j + 0.5) * p; seg = 0;
      while (seg < n - 1 && pos > len[seg]) { pos -= len[seg]; seg++; }
      a = H[seg]; b = H[(seg + 1) % n]; t = pos / len[seg];
      cx = a[0] + (b[0] - a[0]) * t; cz = a[1] + (b[1] - a[1]) * t;
      ang = Math.atan2(b[1] - a[1], b[0] - a[0]); hl = p / 2 - 0.007;
      var ux = Math.cos(ang), uz = Math.sin(ang), nx = -uz * th / 2, nz = ux * th / 2;
      var ox = cx + nx, oz = cz + nz;
      solid(B, [[ox - ux * hl - nx, ya, oz - uz * hl - nz], [ox + ux * hl - nx, ya, oz + uz * hl - nz], [ox + ux * hl - nx, yb, oz + uz * hl - nz], [ox - ux * hl - nx, yb, oz - uz * hl - nz],
                [ox - ux * hl + nx, ya, oz - uz * hl + nz], [ox + ux * hl + nx, ya, oz + uz * hl + nz], [ox + ux * hl + nx, yb, oz + uz * hl + nz], [ox - ux * hl + nx, yb, oz - uz * hl + nz]], HEXF);
      /* a raised guide horn on every other link */
      if (j % 3 === 0) {
        var gy = side * V.TYC, gx = cx + nx * 2.3, gz = cz + nz * 2.3;
        box(B, gx - 0.02, gx + 0.02, gy - 0.012, gy + 0.012, gz - 0.015, gz + 0.03);
      }
    }
  }

  /* ---------------------------------------------------------------- hull */
  function interp(x, k) {
    var ST = CUR.ST, i, a, b, t;
    for (i = 0; i + 1 < ST.length; i++) {
      a = ST[i]; b = ST[i + 1];
      if (x <= b[0]) { t = Math.max(0, (x - a[0]) / (b[0] - a[0])); return a[k] + (b[k] - a[k]) * t; }
    }
    return ST[ST.length - 1][k];
  }
  function roofZ(x) { return interp(x, 5); }
  function roofW(x) { return interp(x, 6); }
  function midW(x) { return interp(x, 4); }
  function hullLoft(B) {
    var ST = CUR.ST, rings = [], i, s;
    for (i = 0; i < ST.length; i++) {
      s = ST[i];
      rings.push([[s[0], -s[2], s[1]], [s[0], s[2], s[1]], [s[0], s[4], s[3]],
                  [s[0], s[6], s[5]], [s[0], -s[6], s[5]], [s[0], -s[4], s[3]]]);
    }
    loftS(B.paint, rings);
  }
  function runningGear(B) {
    var V = CUR, side, k, x, ang, TYC = V.TYC, I = V.IDL, S = V.SPR;
    for (side = -1; side <= 1; side += 2) {
      addTrack(B.dark, side);
      for (k = 0; k < V.ROLL.length; k++) {
        cylY(B.dark, V.ROLL[k], side * (TYC - 0.07), side * (TYC + 0.07), V.RZ, 0.055, 10);
      }
      /* front idler with its hub and cap */
      cylY(B.dark, I[0], side * (TYC - V.TH + 0.01), side * (TYC + V.TH - 0.01), I[1], I[2] - 0.02, 18);
      cylY(B.paint, I[0], side * (TYC + V.TH - 0.02), side * (TYC + V.TH + 0.015), I[1], I[2] - 0.07, 14);
      cylY(B.dark, I[0], side * (TYC + V.TH), side * (TYC + V.TH + 0.04), I[1], 0.05, 10);
      /* rear drive sprocket: drum with sixteen teeth */
      cylY(B.dark, S[0], side * (TYC - V.TH + 0.01), side * (TYC + V.TH - 0.01), S[1], S[2] - 0.05, 18);
      cylY(B.paint, S[0], side * (TYC + V.TH - 0.02), side * (TYC + V.TH + 0.015), S[1], S[2] - 0.10, 14);
      for (k = 0; k < 16; k++) {
        ang = k / 16 * TAU;
        (function (cx, cz, an) {
          var c = Math.cos(an), sn = Math.sin(an), r0 = S[2] - 0.06, r1 = S[2] + 0.015, w = 0.035, ya = side * (TYC - V.TH * 0.7), yb = side * (TYC + V.TH * 0.7), q = [], dd, e;
          for (dd = 0; dd < 2; dd++) { e = dd ? yb : ya; q.push([cx + r0 * c + sn * w, e, cz + r0 * sn - c * w], [cx + r1 * c + sn * w * 0.5, e, cz + r1 * sn - c * w * 0.5], [cx + r1 * c - sn * w * 0.5, e, cz + r1 * sn + c * w * 0.5], [cx + r0 * c - sn * w, e, cz + r0 * sn + c * w]); }
          solid(B.dark, q, HEXF);
        })(S[0], S[1], ang);
      }
    }
  }
  function addWheel(Bw, side) {
    var V = CUR, s = side, k, TYC = V.TYC, TH = V.TH, RW = V.RW;
    var ya = s * (TYC - TH), yb = s * (TYC + TH), yf = s * (TYC + TH + 0.02), yc = s * (TYC + TH + 0.05);
    cylY(Bw, 0, ya, yb, 0, RW, 18);                              /* tyre */
    cylY(Bw, 0, s * (TYC + TH - 0.03), yf, 0, RW * 0.80, 18);    /* disc */
    cylY(Bw, 0, s * (TYC + TH), yc, 0, RW * 0.28, 12);           /* hub */
    for (k = 0; k < 8; k++) rib(Bw, s > 0 ? yf - 0.002 : yf - 0.012, k / 8 * TAU + 0.2, RW * 0.34, RW * 0.72, 0.03, 0.012, 0);
  }

  /* ---- BMD-2 hull detail ---- */
  function addHull2(B) {
    var V = CUR, ROOF = V.ROOF, k, side, x, yy, z;
    hullLoft(B);
    /* bow: trim vane folded across the top of the glacis with its hinge blocks and a raised splash lip */
    belt(B.paint, 2.12, roofZ(2.12) + 0.03, 2.60, roofZ(2.60) + 0.03, -0.46, 0.46, 0.035);
    box(B.dark, 2.56, 2.64, -0.34, -0.16, roofZ(2.6) + 0.02, roofZ(2.6) + 0.08);
    box(B.dark, 2.56, 2.64, 0.16, 0.34, roofZ(2.6) + 0.02, roofZ(2.6) + 0.08);
    belt(B.paint, 2.02, roofZ(2.02) + 0.02, 2.06, roofZ(2.06) + 0.05, -0.62, 0.62, 0.03);
    /* louvred grille on the front deck beside the trim vane (parade photograph) */
    box(B.dark, 1.40, 1.90, 0.28, 0.80, 1.215, 1.235);
    for (k = 0; k < 6; k++) box(B.paint, 1.44 + k * 0.08, 1.47 + k * 0.08, 0.28, 0.80, 1.235, 1.25);
    /* driver's hatch on the centre line with three periscopes ahead of it */
    cylZ(B.paint, 1.78, 0.0, ROOF - 0.04, ROOF + 0.05, 0.19, 16);
    box(B.paint, 1.96, 2.12, -0.30, 0.30, ROOF - 0.04, ROOF + 0.04);
    for (k = -1; k <= 1; k++) box(B.glass, 2.12, 2.14, k * 0.18 - 0.05, k * 0.18 + 0.05, ROOF - 0.02, ROOF + 0.03);
    /* engine deck behind the turret: two louvred panels and a rear hatch */
    box(B.dark, -1.55, -0.85, -0.82, -0.12, ROOF, ROOF + 0.015);
    box(B.dark, -1.55, -0.85, 0.12, 0.82, ROOF, ROOF + 0.015);
    for (k = 0; k < 6; k++) {
      box(B.paint, -1.52 + k * 0.115, -1.48 + k * 0.115, -0.82, -0.12, ROOF + 0.015, ROOF + 0.03);
      box(B.paint, -1.52 + k * 0.115, -1.48 + k * 0.115, 0.12, 0.82, ROOF + 0.015, ROOF + 0.03);
    }
    box(B.paint, -2.30, -1.70, -0.45, 0.45, ROOF - 0.04, ROOF + 0.02);
    box(B.team, -2.12, -1.88, -0.45, 0.45, ROOF + 0.02, ROOF + 0.035);   /* team strip on the rear hatch lid */
    box(B.team, -0.40, 0.60, 0.80, 1.05, ROOF + 0.015, ROOF + 0.03);     /* team strip on the port deck */
    box(B.dark, -2.55, -2.35, -0.50, 0.50, ROOF - 0.08, ROOF - 0.03);
    for (side = -1; side <= 1; side += 2) {
      /* headlamp housing on the upper hull side near the bow, lens forward (photograph) */
      cylX(B.dark, 1.40, 1.55, side * 1.13, 1.02, 0.07, 0.07, 12);
      cylX(B.glass, 1.55, 1.575, side * 1.13, 1.02, 0.05, 0.05, 12);
      box(B.paint, 1.35, 1.50, side * 1.10 - 0.04, side * 1.10 + 0.04, 0.88, 1.12);
      /* front mudguard step over the track and a lower mudguard strip behind it */
      yy = side > 0 ? [1.00, 1.34] : [-1.34, -1.00];
      belt(B.paint, 1.65, 0.80, 2.25, 0.66, yy[0], yy[1], 0.035);
      box(B.paint, 1.05, 1.65, yy[0], yy[1], 0.795, 0.83);
      /* belt line down the hull side, lifting eyes along the top edge (photographs) */
      box(B.paint, -2.45, 1.30, side * 1.17 - 0.006, side * 1.17 + 0.012, 0.93, 0.965);
      for (k = 0; k < 6; k++) {
        x = -2.2 + k * 0.62;
        box(B.dark, x, x + 0.07, side * 1.115, side * 1.145, 1.13, 1.19);
      }
      /* rear: sprocket housing flare and stern lamps */
      belt(B.paint, -2.30, 0.80, -2.62, 0.62, side > 0 ? 1.00 : -1.30, side > 0 ? 1.30 : -1.00, 0.035);
    }
    box(B.dark, -2.72, -2.69, -0.50, 0.50, 0.50, 1.06);
    runningGear(B);
  }

  /* ---- BMD-3 hull detail ---- */
  function addHull3(B) {
    var V = CUR, ROOF = V.ROOF, k, side, x, z;
    hullLoft(B);
    /* front: shallow glacis, driver's hatch on the centre line with three periscopes, folded trim vane */
    belt(B.paint, 2.45, roofZ(2.45) + 0.03, 2.90, roofZ(2.90) + 0.03, -0.62, 0.62, 0.035);
    belt(B.paint, 2.34, roofZ(2.34) + 0.02, 2.38, roofZ(2.38) + 0.05, -0.80, 0.80, 0.03);
    cylZ(B.paint, 2.05, 0.0, ROOF - 0.06, ROOF + 0.05, 0.2, 16);
    box(B.paint, 2.22, 2.38, -0.34, 0.34, ROOF - 0.10, ROOF - 0.0);
    for (k = -1; k <= 1; k++) box(B.glass, 2.38, 2.40, k * 0.2 - 0.055, k * 0.2 + 0.055, ROOF - 0.08, ROOF - 0.02);
    /* bow weapons on the glacis: round ball-mount cover to starboard, sack-covered mount to port (photograph) */
    cylX(B.dark, 2.80, 2.93, -0.62, 1.12, 0.085, 0.07, 12);
    cylX(B.dark, 2.93, 3.07, -0.62, 1.10, 0.016, 0.014, 6);
    box(B.dark, 2.78, 2.93, 0.50, 0.74, 1.04, 1.18);
    cylX(B.dark, 2.93, 3.05, 0.62, 1.10, 0.02, 0.016, 6);
    for (side = -1; side <= 1; side += 2) {
      /* round lamp at each front corner of the hull (photographs) */
      cylX(B.dark, 2.86, 2.96, side * 1.20, 0.98, 0.075, 0.075, 12);
      cylX(B.glass, 2.96, 2.98, side * 1.20, 0.98, 0.055, 0.055, 12);
      /* side: belt line, lifting eyes along the roof edge, tool brackets, towing eye */
      box(B.paint, -2.75, 2.40, side * 1.545 - 0.006, side * 1.545 + 0.012, 1.04, 1.075);
      for (k = 0; k < 7; k++) {
        x = -2.4 + k * 0.78;
        box(B.dark, x, x + 0.08, side * 1.495, side * 1.53, 1.32, 1.39);
      }
      for (k = 0; k < 3; k++) box(B.paint, -1.9 + k * 1.3, -1.0 + k * 1.3, side * 1.57 - 0.004, side * 1.57 + 0.014, 0.93, 0.98);
      /* rear whip aerial behind the turret: base and a tall thin rod leaning back */
      cylZ(B.dark, -1.55, side * 1.02, ROOF, ROOF + 0.14, 0.05, 8);
      cyl(B.dark, [-1.55, side * 1.02, ROOF + 0.14], [-1.80, side * 1.02, ROOF + 1.50], 0.013, 0.007, 6);
      /* hull-side wing at the stern over the sprocket */
      box(B.dark, -3.01, -2.96, side * 0.78 - 0.20, side * 0.78 + 0.20, 0.62, 1.20);
    }
    /* engine deck: louvred panels, a rear hatch and the cooling grille across the stern */
    box(B.dark, -2.00, -0.95, -0.95, -0.15, ROOF, ROOF + 0.015);
    box(B.dark, -2.00, -0.95, 0.15, 0.95, ROOF, ROOF + 0.015);
    for (k = 0; k < 8; k++) {
      box(B.paint, -1.97 + k * 0.13, -1.93 + k * 0.13, -0.95, -0.15, ROOF + 0.015, ROOF + 0.03);
      box(B.paint, -1.97 + k * 0.13, -1.93 + k * 0.13, 0.15, 0.95, ROOF + 0.015, ROOF + 0.03);
    }
    box(B.paint, -2.75, -2.20, -0.55, 0.55, ROOF - 0.06, ROOF + 0.02);
    box(B.team, -2.60, -2.36, -0.50, 0.50, ROOF + 0.02, ROOF + 0.035);   /* team strip on the rear hatch lid */
    box(B.team, -0.30, 0.70, 0.95, 1.20, ROOF + 0.015, ROOF + 0.03);      /* team strip on the port deck */
    box(B.dark, -3.01, -2.98, -0.70, 0.70, 0.60, 1.10);
    runningGear(B);
  }

  /* -------------------------------------------------------------- turret */
  function launcher(B, raised) {
    /* 9P135M on the turret roof: pedestal, cradle with the guide rail and the missile on it;
       raised: tilted up forward; lowered: lying flat along the roof */
    var zb = 0.40, ang = 0.10;
    var L = 1.05, x0 = -0.52, x1 = x0 + L * Math.cos(ang), z0 = zb + 0.22, z1 = z0 + L * Math.sin(ang);
    cylZ(B.dark, -0.30, 0.0, zb - 0.06, zb + 0.14, 0.07, 10);
    box(B.dark, -0.46, -0.12, -0.11, 0.11, zb + 0.10, zb + 0.16);
    cyl(B.dark, [x0, 0.0, z0], [x1, 0.0, z1], 0.07, 0.07, 14);
    cyl(B.paint, [x1, 0.0, z1], [x1 + 0.07, 0.0, z1 + 0.07 * Math.sin(ang)], 0.07, 0.04, 12);
    cyl(B.dark, [x0, 0.0, z0], [x0 - 0.06, 0.0, z0 - 0.06 * Math.sin(ang)], 0.082, 0.082, 14);
    box(B.dark, -0.16, -0.08, -0.10, 0.10, zb + 0.14, z0 + 0.1 * Math.sin(ang) - 0.05);
    box(B.dark, 0.20, 0.28, -0.10, 0.10, zb + 0.14, z1 - 0.06);
    box(B.glass, 0.28, 0.305, -0.07, 0.07, z1 - 0.10, z1 - 0.01);
  }
  function addTurret2(B) {         /* BMD-2 one-man turret */
    var N = 26, i, R = [
      [-0.04, 0.64, 0.62, 0.60, 0.00, 2.3],
      [0.04, 0.64, 0.62, 0.60, 0.00, 2.3],
      [0.18, 0.62, 0.60, 0.58, 0.00, 2.5],
      [0.32, 0.52, 0.56, 0.52, -0.02, 2.6],
      [0.44, 0.40, 0.48, 0.40, -0.03, 2.6],
      [0.50, 0.36, 0.44, 0.36, -0.03, 2.6]
    ], rings = [], zg = 0.24;
    for (i = 0; i < R.length; i++) rings.push(tring(R[i], N));
    loftS(B.paint, rings);
    /* gun mount and shield in the front slope, the 2A42: jacket, tube, flash hider; coaxial machine gun */
    box(B.paint, 0.56, 0.84, -0.26, 0.26, 0.06, 0.40);
    cylX(B.dark, 0.82, 0.92, 0.0, zg, 0.11, 0.095, 14);
    cylX(B.dark, 0.90, 1.35, 0.0, zg, 0.065, 0.055, 14);
    cylX(B.dark, 1.35, 2.30, 0.0, zg, 0.034, 0.032, 12);
    cylX(B.dark, 2.30, 2.50, 0.0, zg, 0.05, 0.044, 12);
    cylX(B.dark, 1.30, 1.38, 0.0, zg, 0.066, 0.066, 12);
    cylX(B.dark, 0.84, 1.20, -0.17, zg - 0.04, 0.02, 0.018, 6);
    box(B.glass, 0.84, 0.865, 0.10, 0.22, zg - 0.08, zg + 0.04);
    /* gunner's sight head left front on the roof with its glass */
    box(B.paint, 0.18, 0.46, 0.18, 0.46, 0.40, 0.54);
    box(B.glass, 0.46, 0.485, 0.22, 0.42, 0.44, 0.52);
    /* hatch at the rear on the centre line with a ring of periscopes, ventilator, lamp */
    cylZ(B.paint, -0.22, 0.0, 0.34, 0.50, 0.20, 16);
    for (i = 0; i < 5; i++) box(B.glass, -0.22 - 0.20 * Math.cos(i * 0.9 + 0.2) - 0.03, -0.22 - 0.20 * Math.cos(i * 0.9 + 0.2) + 0.03,
                              0.20 * Math.sin(i * 0.9 + 0.2) - 0.03, 0.20 * Math.sin(i * 0.9 + 0.2) + 0.03, 0.44, 0.50);
    cylX(B.dark, 0.0, 0.10, -0.40, 0.46, 0.05, 0.05, 10);
    box(B.paint, -0.56, -0.38, 0.16, 0.38, 0.28, 0.36);
    launcher(B, true);
  }
  function addTurret3(B) {         /* BMD-3, the BMD-2 type turret on the larger hull */
    var N = 28, i, q, R = [
      [-0.04, 0.74, 0.72, 0.70, 0.00, 2.3],
      [0.04, 0.74, 0.72, 0.70, 0.00, 2.3],
      [0.22, 0.72, 0.70, 0.68, 0.00, 2.5],
      [0.38, 0.60, 0.66, 0.60, -0.02, 2.6],
      [0.52, 0.46, 0.58, 0.46, -0.03, 2.7],
      [0.58, 0.42, 0.54, 0.42, -0.03, 2.7]
    ], rings = [], zg = 0.28;
    for (i = 0; i < R.length; i++) rings.push(tring(R[i], N));
    loftS(B.paint, rings);
    box(B.paint, 0.62, 0.92, -0.30, 0.30, 0.08, 0.46);
    cylX(B.dark, 0.90, 1.00, 0.0, zg, 0.12, 0.10, 14);
    cylX(B.dark, 0.98, 1.45, 0.0, zg, 0.07, 0.058, 14);
    cylX(B.dark, 1.45, 2.40, 0.0, zg, 0.036, 0.034, 12);
    cylX(B.dark, 2.40, 2.60, 0.0, zg, 0.052, 0.046, 12);
    cylX(B.dark, 1.40, 1.48, 0.0, zg, 0.07, 0.07, 12);
    cylX(B.dark, 0.92, 1.30, -0.19, zg - 0.05, 0.02, 0.018, 6);
    /* IR drum lamp front left and the sight head beside it */
    cylX(B.dark, 0.58, 0.82, 0.44, 0.50, 0.12, 0.12, 14);
    cylX(B.glass, 0.82, 0.84, 0.44, 0.50, 0.095, 0.095, 14);
    box(B.paint, 0.20, 0.50, -0.10, 0.20, 0.50, 0.66);
    box(B.glass, 0.50, 0.525, -0.06, 0.16, 0.54, 0.62);
    /* commander's hatch rear right with lamp and periscopes, gunner's hatch rear left */
    cylZ(B.paint, -0.26, -0.36, 0.38, 0.55, 0.20, 16);
    for (i = 0; i < 4; i++) box(B.glass, -0.26 + 0.20 * Math.cos(i * 1.4 + 0.3) - 0.03, -0.26 + 0.20 * Math.cos(i * 1.4 + 0.3) + 0.03,
                              -0.36 + 0.20 * Math.sin(i * 1.4 + 0.3) - 0.03, -0.36 + 0.20 * Math.sin(i * 1.4 + 0.3) + 0.03, 0.50, 0.56);
    cylX(B.dark, -0.12, -0.02, -0.56, 0.58, 0.05, 0.05, 10);
    cylZ(B.paint, -0.26, 0.36, 0.38, 0.50, 0.20, 16);
    /* four smoke-grenade tubes in a cluster at the turret rear a side (photograph: left; right assumed) */
    for (q = -1; q <= 1; q += 2) {
      box(B.dark, -0.84, -0.46, q * 0.74 - 0.03, q * 0.74 + 0.03, 0.34, 0.42);
      for (i = 0; i < 4; i++) {
        cyl(B.dark, [-0.80 + i * 0.12, q * 0.74, 0.40], [-0.76 + i * 0.12, q * 0.82, 0.58], 0.035, 0.035, 8);
        cyl(B.paint, [-0.76 + i * 0.12, q * 0.82, 0.58], [-0.755 + i * 0.12, q * 0.825, 0.60], 0.033, 0.024, 8);
      }
    }
    box(B.paint, -0.78, -0.56, -0.12, 0.12, 0.40, 0.48);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var cf = null, HB, TB, i, wg, WB;
    CUR = V;
    HB = bins(T, cf); TB = bins(T, cf);
    if (which === "B") addHull3(HB); else addHull2(HB);
    flush(THREE, g, HB, [0, 0, 0]);
    for (i = 0; i < V.XW.length; i++) {
      WB = new Bin(T.wheel);
      addWheel(WB, -1); addWheel(WB, 1);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(V.XW[i], 0, V.ZW);
      flush(THREE, wg, { wheel: WB }, [0, 0, 0]);
      g.add(wg);
    }
    if (which === "B") addTurret3(TB); else addTurret2(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(V.tx, 0, V.ROOF);
    flush(THREE, wg, TB, [V.tx, 0, V.ROOF], V.TD);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_lighttank"] = {
  len: 5.4,
  build: function (THREE, M, C) { return HeroBMD.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e90_lighttank"] = {
  len: 6.0,
  build: function (THREE, M, C) { return HeroBMD.build(THREE, M, C, "B"); }
};
