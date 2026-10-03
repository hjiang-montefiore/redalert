/* ============ ru_bmp12.js - HERO models: the BMP-1 and BMP-2 infantry fighting vehicles ============
   Two rows, one hull, two turrets:
     pact_e60_ifv   BMP-1  (1966)  one-man turret, 73 mm 2A28 Grom low-pressure smoothbore, the
                                   9M14 Malyutka (Sagger) on a rail above the gun, whip aerial
     pact_e80_ifv   BMP-2  (1980)  two-man turret, 30 mm 2A42 cannon, coaxial machine gun, the
                                   9M113 Konkurs launcher on the turret roof

   References (Wikimedia Commons):
     "BMP1graphic1.gif"      three-view line drawing of the BMP-1: side, front, three-quarter
     "BMP21981graphic1.gif"  three-view line drawing of the BMP-2 (1981 pattern)
     "BMP-1 Kiev.jpg", "BMP-2 Kiev.jpg"   museum exhibits, starboard three-quarter (hull, bow)
   What each feature rests on:
     - low boat hull, flat roof, a shallow glacis ending in a sharply pointed bow whose side
       flanks sweep down over the front sprocket: both drawings and the Kiev photographs
     - SIX road wheels a side on about 0.72 m centres (radial-ribbed discs), a high front
       drive sprocket under the bow, a rear idler, three small return rollers: both side views
     - turret ring slightly behind the middle of the hull (about 0.58 of the length from the
       bow): both side drawings
     - BMP-1 turret: low, one man, gun low on the front with the Malyutka rail and missile
       above it, periscope sight head on the roof front, the whip aerial at the rear right
       of the hull roof: BMP-1 drawing
     - BMP-2 turret: larger faceted turret, long 30 mm gun reaching about 3.2 m ahead of the
       ring, the Konkurs launcher on a pedestal on the turret roof, tilted up forward, whole
       vehicle about 2.45 m tall: BMP-2 drawing
     - rear troop doors (the fuel tanks), firing ports with periscope blocks on the upper
       hull sides, driver's hatch front left, engine deck front right: three-quarter views
   Check-and-fix additions: four firing ports a side on both hulls (a larger rounded block and
   three ball ports, counted on the Kiev photographs); the BMP-1 row of small raised plates and
   the curved ribs on its bow flanks (drawing and photograph); the three long ribbed hull-side
   panels of the BMP-2 drawing; the BMP-2 902V smoke launchers, three tubes on each side of the
   turret rear (photograph shows the starboard group, the port group is assumed to match);
   sponson widths set per variant to the published widths.
   NOT CONFIRMED and therefore only roughed in or left off: the left/right position of the
   turret hatches and of the launcher (BMP-2 launcher drawn on the centre line), side stowage,
   the snorkel and the unditching log.

   Published figures (model 2.98 / 3.15 m wide): BMP-1 6.74 m long, 2.94 m wide, 2.07 m high; BMP-2 6.72 m, 3.15 m, 2.45 m.
   Five materials (paint, dark, glass, team, wheel); team colour exactly C.team on the turret
   hatch lids and two roof hatches.  Named nodes: "turret" (ring centre on the hull roof, gun
   along +X) and six "roadwheel" groups (Y axle, both sides in one mesh).  Model space +X bow,
   +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBMP12 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: 0x4d5a3b, bmp2: false, sw: 1.47 },
    B: { paint: 0x4a5838, bmp2: true, sw: 1.575 }
  };
  var XW = [1.60, 0.88, 0.16, -0.56, -1.28, -2.00], ZW = 0.315, RW = 0.285;
  var TYC = 1.30;            /* track centre line, each side */
  var ROOF = 1.38;           /* roof of the troop compartment */
  var IDL = [-2.72, 0.50, 0.30], SPR = [2.30, 0.50, 0.27];   /* x, z, radius */
  var ROLL = [1.25, -0.10, -1.65];

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

  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      group.add(new THREE.Mesh(geo, b.mat));
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


  function materials(THREE, C, V) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: V.paint, roughness: 0.9, metalness: 0.05 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0x3e4733, roughness: 0.88, metalness: 0.12 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team) };
  }

  /* the track loop: convex hull of the idler, sprocket and road wheels (x, z) */
  function trackLoop() {
    var pts = [], i, k, c, a, circ = [[IDL[0], IDL[1], IDL[2] + 0.03], [SPR[0], SPR[1], SPR[2] + 0.03]];
    for (i = 0; i < XW.length; i++) circ.push([XW[i], ZW, RW + 0.03]);
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
    var H = trackLoop(), n = H.length, len = [], tot = 0, i, j, a, b, d, nl, p, t, pos, seg, ang, cx, cz, hl, th = 0.04;
    for (i = 0; i < n; i++) { a = H[i]; b = H[(i + 1) % n]; d = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])); len.push(d); tot += d; }
    nl = Math.round(tot / 0.13); p = tot / nl;
    var ya = Math.min(side * (TYC - 0.18), side * (TYC + 0.18)), yb = Math.max(side * (TYC - 0.18), side * (TYC + 0.18));
    for (j = 0; j < nl; j++) {
      pos = (j + 0.5) * p; seg = 0;
      while (seg < n - 1 && pos > len[seg]) { pos -= len[seg]; seg++; }
      a = H[seg]; b = H[(seg + 1) % n]; t = pos / len[seg];
      cx = a[0] + (b[0] - a[0]) * t; cz = a[1] + (b[1] - a[1]) * t;
      if (cz > 0.70 && cx > -2.45 && cx < 2.15) continue;     /* the top run is hidden under the sponson */
      ang = Math.atan2(b[1] - a[1], b[0] - a[0]); hl = p / 2 - 0.007;
      var ux = Math.cos(ang), uz = Math.sin(ang), nx = -uz * th / 2, nz = ux * th / 2;
      var ox = cx + nx, oz = cz + nz;
      solid(B, [[ox - ux * hl - nx, ya, oz - uz * hl - nz], [ox + ux * hl - nx, ya, oz + uz * hl - nz], [ox + ux * hl - nx, yb, oz + uz * hl - nz], [ox - ux * hl - nx, yb, oz - uz * hl - nz],
                [ox - ux * hl + nx, ya, oz - uz * hl + nz], [ox + ux * hl + nx, ya, oz + uz * hl + nz], [ox + ux * hl + nx, yb, oz + uz * hl + nz], [ox - ux * hl + nx, yb, oz - uz * hl + nz]], HEXF);
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* station: x, bottom z, bottom half width, mid (sponson) z, mid half width, roof z, roof half width */
  var ST = [
    [-3.37, 0.46, 0.96, 0.86, 1.16, ROOF, 1.14],
    [-2.90, 0.38, 1.00, 0.84, 1.26, ROOF, 1.20],
    [-1.00, 0.38, 1.00, 0.84, 1.28, ROOF, 1.22],
    [0.90, 0.38, 1.00, 0.84, 1.28, ROOF, 1.22],
    [1.90, 0.38, 1.00, 0.84, 1.26, 1.30, 1.20],
    [2.35, 0.44, 0.90, 0.82, 1.10, 1.22, 1.00],
    [2.85, 0.55, 0.64, 0.78, 0.78, 1.02, 0.66],
    [3.20, 0.65, 0.32, 0.76, 0.36, 0.86, 0.30],
    [3.37, 0.70, 0.10, 0.76, 0.12, 0.80, 0.10]
  ];
  function roofZ(x) {
    var i, a, b, t;
    for (i = 0; i + 1 < ST.length; i++) {
      a = ST[i]; b = ST[i + 1];
      if (x <= b[0]) { t = (x - a[0]) / (b[0] - a[0]); return a[5] + (b[5] - a[5]) * t; }
    }
    return ST[ST.length - 1][5];
  }
  function roofW(x) {
    var i, a, b, t;
    for (i = 0; i + 1 < ST.length; i++) {
      a = ST[i]; b = ST[i + 1];
      if (x <= b[0]) { t = (x - a[0]) / (b[0] - a[0]); return a[6] + (b[6] - a[6]) * t; }
    }
    return ST[ST.length - 1][6];
  }
  /* half width of the hull flank at (x, z), from the stations */
  function flankY(x, z) {
    var i, a, b, t, zb, yb, zm, ym, zr, yr, f;
    for (i = 0; i + 2 < ST.length && x > ST[i + 1][0]; i++) { }
    a = ST[i]; b = ST[i + 1]; t = Math.max(0, Math.min(1, (x - a[0]) / (b[0] - a[0])));
    function mix(p, q) { return p + (q - p) * t; }
    zb = mix(a[1], b[1]); yb = mix(a[2], b[2]); zm = mix(a[3], b[3]); ym = mix(a[4], b[4]); zr = mix(a[5], b[5]); yr = mix(a[6], b[6]);
    if (z <= zm) { f = (z - zb) / (zm - zb); return yb + (ym - yb) * Math.max(0, Math.min(1, f)); }
    f = (z - zm) / (zr - zm);
    return ym + (yr - ym) * Math.max(0, Math.min(1, f));
  }
  function sg(side, a, b) { return side > 0 ? [a, b] : [-b, -a]; }
  function addHull(V, B) {
    var rings = [], i, s, side, x, k, yy, z, w;
    for (i = 0; i < ST.length; i++) {
      s = ST[i];
      rings.push([[s[0], -s[2], s[1]], [s[0], s[2], s[1]], [s[0], s[4], s[3]],
                  [s[0], s[6], s[5]], [s[0], -s[6], s[5]], [s[0], -s[4], s[3]]]);
    }
    loftS(B.paint, rings);

    /* bow: folded trim vane on the glacis with its hinge blocks, four low transverse ribs, towing eyes */
    belt(B.paint, 2.28, roofZ(2.28) + 0.03, 2.90, roofZ(2.90) + 0.03, -0.40, 0.40, 0.035);
    box(B.dark, 2.86, 2.94, -0.30, -0.14, roofZ(2.9) + 0.02, roofZ(2.9) + 0.08);
    box(B.dark, 2.86, 2.94, 0.14, 0.30, roofZ(2.9) + 0.02, roofZ(2.9) + 0.08);
    for (k = 0; k < 4; k++) {
      x = 2.45 + k * 0.17; w = roofW(x) * 0.78;
      if (k < 2) continue;
      belt(B.paint, x - 0.04, roofZ(x - 0.04) + 0.02, x + 0.04, roofZ(x + 0.04) + 0.02, -w, w, 0.03);
    }
    for (side = -1; side <= 1; side += 2) {
      cylX(B.dark, 3.25, 3.36, side * 0.12, 0.62, 0.05, 0.05, 8);
    }
    /* driver's hatch front left and three periscopes ahead of it */
    cylZ(B.paint, 2.00, 0.42, ROOF - 0.08, ROOF - 0.0, 0.19, 14);
    cylZ(B.dark, 2.00, 0.42, ROOF - 0.0, ROOF + 0.03, 0.16, 14);
    box(B.paint, 2.20, 2.40, 0.24, 0.60, 1.26, 1.34);
    box(B.glass, 2.40, 2.42, 0.26, 0.34, 1.28, 1.33);
    box(B.glass, 2.40, 2.42, 0.40, 0.46, 1.28, 1.33);
    box(B.glass, 2.40, 2.42, 0.52, 0.58, 1.28, 1.33);
    /* engine deck front right: louvred grille */
    box(B.dark, 0.95, 1.85, -0.92, -0.18, 1.30, 1.335);
    for (k = 0; k < 7; k++) box(B.paint, 1.0 + k * 0.125, 1.04 + k * 0.125, -0.92, -0.18, 1.335, 1.355);
    box(B.paint, 1.85, 2.15, -0.80, -0.30, 1.22, 1.25);
    if (!V.bmp2) {
      /* the troop commander's hatch behind the driver, left */
      cylZ(B.paint, 1.20, 0.50, ROOF - 0.04, ROOF + 0.06, 0.17, 14);
      cylZ(B.dark, 1.20, 0.50, ROOF + 0.06, ROOF + 0.085, 0.13, 12);
      box(B.glass, 1.30, 1.34, 0.44, 0.56, ROOF + 0.02, ROOF + 0.08);
    }
    /* roof troop hatches behind the turret, two of them in team colour */
    for (k = 0; k < 2; k++) {
      box(B.paint, -1.75 - k * 0.95, -1.00 - k * 0.95, -0.58, -0.08, ROOF, ROOF + 0.03);
      box(B.paint, -1.75 - k * 0.95, -1.00 - k * 0.95, 0.08, 0.58, ROOF, ROOF + 0.03);
    }
    box(B.team, -2.60, -2.05, -0.50, -0.16, ROOF + 0.03, ROOF + 0.045);
    box(B.team, -2.60, -2.05, 0.16, 0.50, ROOF + 0.03, ROOF + 0.045);
    box(B.dark, -3.10, -2.70, -0.50, 0.50, ROOF, ROOF + 0.025);    /* stern exhaust and vent cover */
    for (k = 0; k < 4; k++) box(B.paint, -3.06 + k * 0.10, -3.0 + k * 0.10, -0.50, 0.50, ROOF + 0.025, ROOF + 0.04);
    if (!V.bmp2) {
      /* whip aerial: base on the roof at the rear right and a thin rod */
      cylZ(B.dark, -3.00, -0.90, ROOF, ROOF + 0.10, 0.045, 8);
      cylZ(B.dark, -3.00, -0.90, ROOF + 0.10, ROOF + 0.70, 0.012, 6);
    }
    for (side = -1; side <= 1; side += 2) {
      /* sponson over the tracks, front mudguard sloping to the bow, rear guard */
      yy = sg(side, 1.20, V.sw);
      box(B.paint, -3.00, 2.45, yy[0], yy[1], 0.82, 0.86);
      belt(B.paint, 2.45, 0.86, 3.02, 0.64, side > 0 ? 0.90 : -V.sw, side > 0 ? V.sw : -0.90, 0.04);
      for (k = 0; k < 4; k++) {
        x = 2.56 + k * 0.12; z = 0.86 - (x - 2.45) * 0.38;
        box(B.paint, x - 0.02, x + 0.02, side > 0 ? 0.90 : -V.sw, side > 0 ? V.sw : -0.90, z + 0.01, z + 0.06);
      }
      belt(B.paint, -3.00, 0.84, -3.30, 0.70, yy[0], yy[1], 0.04);
      /* upper side: four firing ports a side (photographs of both vehicles): a larger rounded
         block forward, then three ball ports at about 0.4 m pitch; periscope block above each */
      for (k = 0; k < 4; k++) {
        x = [-1.15, -1.95, -2.38, -2.81][k];
        if (k === 0) {
          box(B.paint, x - 0.15, x + 0.15, side * 1.262 - 0.012, side * 1.262 + 0.012, 1.08, 1.30);
          box(B.dark, x - 0.10, x + 0.10, side * 1.262 - 0.015, side * 1.262 + 0.015, 1.14, 1.24);
        } else {
          cylY(B.dark, x, side * 1.215, side * 1.30, 1.18, 0.06, 10);
          cylY(B.paint, x, side * 1.20, side * 1.235, 1.18, 0.09, 10);
        }
        box(B.glass, x - 0.07, x + 0.07, side * 1.20 - 0.01, side * 1.20 + 0.01, 1.30, 1.34);
      }
      if (V.bmp2) {
        /* the long ribbed hull-side panels the BMP-2 drawing shows: three, with horizontal ribs */
        for (k = 0; k < 3; k++) {
          var px0 = -2.90 + k * 1.55, px1 = px0 + 1.45, r;
          box(B.paint, px0, px1, side * 1.268 - 0.0, side * 1.268 + 0.014 * side - 0.0 + (side > 0 ? 0 : 0), 0.93, 1.13);
          for (r = 0; r < 4; r++) box(B.dark, px0 + 0.04, px1 - 0.04, side * 1.28 - 0.005, side * 1.28 + 0.01, 0.96 + r * 0.045, 0.975 + r * 0.045);
        }
      } else {
        /* the row of small raised plates along the BMP-1 hull side (drawing and photograph) */
        for (k = 0; k < 14; k++) {
          x = -2.88 + k * 0.345;
          box(B.paint, x, x + 0.29, side * 1.268 - 0.0, side * 1.268 + 0.016 * side, 0.93, 1.07);
        }
        /* curved ribs on the bow flank, arcs about the sprocket axis (photograph) */
        var rr, aa, a0, a1, p0, p1;
        for (rr = 0; rr < 3; rr++) {
          for (aa = 0; aa < 9; aa++) {
            a0 = (0.15 + aa * 0.14) * 1; a1 = a0 + 0.14;
            p0 = [SPR[0] + (0.55 + rr * 0.20) * Math.cos(a0), 0, 0.55 + (0.55 + rr * 0.20) * Math.sin(a0)];
            p1 = [SPR[0] + (0.55 + rr * 0.20) * Math.cos(a1), 0, 0.55 + (0.55 + rr * 0.20) * Math.sin(a1)];
            if (p0[0] < 2.30 || p1[0] > 3.30 || p0[2] > roofZ(p0[0]) - 0.05 || p1[2] > roofZ(p1[0]) - 0.05 || p0[2] < 0.62 || p1[2] < 0.62) continue;
            p0[1] = side * (flankY(p0[0], p0[2]) + 0.006); p1[1] = side * (flankY(p1[0], p1[2]) + 0.006);
            cyl(B.paint, p0, p1, 0.016, 0.016, 5);
          }
        }
      }
      /* hull side belt line and the upper side stiffener */
      box(B.paint, -3.0, 2.0, side * 1.285 - 0.008, side * 1.285 + 0.012, 0.97, 1.0);
      /* tracks, return rollers, idler and sprocket */
      addTrack(B.dark, side);
      for (k = 0; k < 3; k++) {
        cylY(B.dark, ROLL[k], side * (TYC - 0.07), side * (TYC + 0.07), 0.69, 0.065, 10);
      }
      cylY(B.dark, IDL[0], side * (TYC - 0.12), side * (TYC + 0.12), IDL[1], IDL[2] - 0.02, 18);
      cylY(B.dark, IDL[0], side * (TYC + 0.11), side * (TYC + 0.17), IDL[1], 0.15, 12);
      cylY(B.paint, IDL[0], side * (TYC + 0.16), side * (TYC + 0.19), IDL[1], 0.07, 10);
      cylY(B.dark, SPR[0], side * (TYC - 0.13), side * (TYC + 0.13), SPR[1], SPR[2] - 0.05, 18);
      for (k = 0; k < 14; k++) {
        x = k / 14 * TAU;
        solid(B.dark, (function (cx, cz, ang) {
          var c = Math.cos(ang), sn = Math.sin(ang), r0 = SPR[2] - 0.06, r1 = SPR[2] + 0.015, w = 0.04, ya = side * (TYC - 0.10), yb = side * (TYC + 0.10), q = [], dd, e;
          for (dd = 0; dd < 2; dd++) { e = dd ? yb : ya; q.push([cx + r0 * c + sn * w, e, cz + r0 * sn - c * w], [cx + r1 * c + sn * w * 0.5, e, cz + r1 * sn - c * w * 0.5], [cx + r1 * c - sn * w * 0.5, e, cz + r1 * sn + c * w * 0.5], [cx + r0 * c - sn * w, e, cz + r0 * sn + c * w]); }
          return [q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7]];
        })(SPR[0], SPR[1], x), HEXF);
      }
    }
    /* stern plate: two troop doors that are also the fuel tanks, hinges, handles, filler caps */
    for (side = -1; side <= 1; side += 2) {
      yy = sg(side, 0.08, 0.64);
      box(B.paint, -3.42, -3.37, yy[0], yy[1], 0.50, 1.32);
      box(B.dark, -3.44, -3.42, yy[0] + 0.05 * (side > 0 ? 1 : -1) - 0.0, yy[1] - 0.05 * (side > 0 ? 1 : -1), 0.56, 0.60);
      box(B.dark, -3.44, -3.42, yy[0] + 0.05 * (side > 0 ? 1 : -1), yy[1] - 0.05 * (side > 0 ? 1 : -1), 1.22, 1.26);
      cylX(B.dark, -3.44, -3.42, side * 0.14, 0.92, 0.03, 0.03, 8);
      cylZ(B.dark, -3.40, side * 0.62, 0.55, 1.28, 0.02, 6);
      cylX(B.dark, -3.44, -3.42, side * 0.50, 1.15, 0.045, 0.045, 10);
    }
    box(B.paint, -3.42, -3.37, -0.08, 0.08, 0.50, 1.32);
    box(B.dark, -3.40, -3.37, -0.9, 0.9, 0.44, 0.50);
    box(B.dark, -3.40, -3.37, -0.9, 0.9, 1.32, 1.38);
  }
  function addWheel(Bw, side) {
    var s = side, k, ya = s * (TYC - 0.13), yb = s * (TYC + 0.13), yf = s * (TYC + 0.145), yc = s * (TYC + 0.175);
    cylY(Bw, 0, ya, yb, 0, RW, 18);
    cylY(Bw, 0, s * (TYC + 0.10), yf, 0, 0.215, 18);
    cylY(Bw, 0, s * (TYC + 0.13), yc, 0, 0.065, 10);
    for (k = 0; k < 8; k++) rib(Bw, s > 0 ? yf - 0.002 : yf - 0.012, k / 8 * TAU, 0.07, 0.205, 0.035, 0.012, 0);
  }

  /* -------------------------------------------------------------- turret */
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
  function addTurret1(V, B) {
    var N = 24, i, R = [
      [-0.04, 0.86, 0.86, 0.82, 0.00, 2.2],
      [0.02, 0.86, 0.86, 0.82, 0.00, 2.2],
      [0.14, 0.84, 0.80, 0.78, -0.02, 2.2],
      [0.26, 0.70, 0.74, 0.68, -0.04, 2.3],
      [0.36, 0.52, 0.64, 0.54, -0.06, 2.4],
      [0.40, 0.46, 0.58, 0.48, -0.07, 2.4]
    ], rings = [], zg = 0.20;
    for (i = 0; i < R.length; i++) rings.push(tring(R[i], N));
    loftS(B.paint, rings);
    /* cast mantlet block in the front slope */
    box(B.paint, 0.58, 0.96, -0.30, 0.30, 0.03, 0.38);
    cylX(B.dark, 0.94, 1.02, 0, zg, 0.115, 0.10, 14);
    /* 73 mm 2A28: breech jacket then the smoothbore tube */
    cylX(B.dark, 0.98, 1.70, 0, zg, 0.085, 0.062, 14);
    cylX(B.dark, 1.70, 2.40, 0, zg, 0.045, 0.040, 12);
    cylX(B.dark, 1.68, 1.74, 0, zg, 0.068, 0.068, 12);
    cylX(B.dark, 0.90, 1.35, -0.20, zg - 0.02, 0.022, 0.020, 6);    /* coaxial machine gun */
    /* Malyutka rail above the gun on two posts, the missile on it */
    box(B.dark, 0.78, 0.86, -0.04, 0.04, zg + 0.08, zg + 0.24);
    box(B.dark, 1.46, 1.52, -0.04, 0.04, zg + 0.08, zg + 0.24);
    box(B.dark, 0.74, 1.70, -0.025, 0.025, zg + 0.22, zg + 0.265);
    cylX(B.paint, 0.78, 1.52, 0, zg + 0.34, 0.058, 0.058, 12);
    cylX(B.paint, 1.52, 1.66, 0, zg + 0.34, 0.058, 0.012, 12);
    box(B.dark, 0.78, 0.90, -0.14, 0.14, zg + 0.335, zg + 0.345);
    box(B.dark, 0.78, 0.90, -0.005, 0.005, zg + 0.20, zg + 0.48);
    /* periscope sight head on the roof, front left, with its armoured cover */
    box(B.paint, 0.18, 0.52, 0.22, 0.54, 0.34, 0.50);
    box(B.glass, 0.52, 0.55, 0.26, 0.50, 0.38, 0.46);
    box(B.paint, 0.30, 0.44, 0.30, 0.46, 0.50, 0.62);
    box(B.glass, 0.44, 0.46, 0.33, 0.43, 0.54, 0.60);
    /* gunner's hatch left rear, ventilator and periscopes */
    cylZ(B.paint, -0.22, 0.28, 0.28, 0.38, 0.22, 16);
    cylZ(B.team, -0.22, 0.28, 0.38, 0.41, 0.18, 16);
    box(B.dark, -0.46, -0.40, 0.22, 0.34, 0.36, 0.40);
    box(B.paint, -0.52, -0.30, -0.30, -0.06, 0.34, 0.44);
    box(B.dark, -0.54, -0.50, -0.26, -0.10, 0.36, 0.42);
    box(B.glass, -0.04, 0.04, -0.20, -0.10, 0.34, 0.42);
    box(B.dark, 0.0, 0.10, -0.34, -0.20, 0.30, 0.36);
  }
  function addTurret2(V, B) {
    var N = 28, i, R = [
      [-0.04, 1.00, 0.96, 0.92, 0.00, 2.4],
      [0.04, 1.00, 0.96, 0.92, 0.00, 2.4],
      [0.20, 0.94, 0.92, 0.88, -0.02, 2.7],
      [0.36, 0.78, 0.86, 0.78, -0.04, 3.0],
      [0.50, 0.60, 0.76, 0.64, -0.07, 3.0],
      [0.56, 0.56, 0.72, 0.58, -0.08, 3.0]
    ], rings = [], zg = 0.28;
    for (i = 0; i < R.length; i++) rings.push(tring(R[i], N));
    loftS(B.paint, rings);
    /* gun mount and shield in the front slope */
    box(B.paint, 0.66, 1.04, -0.34, 0.34, 0.08, 0.50);
    cylX(B.dark, 1.02, 1.12, 0, zg, 0.13, 0.11, 14);
    /* 30 mm 2A42: jacket, tube, flash hider */
    cylX(B.dark, 1.10, 1.70, 0, zg, 0.075, 0.062, 14);
    cylX(B.dark, 1.70, 3.00, 0, zg, 0.036, 0.034, 12);
    cylX(B.dark, 3.00, 3.22, 0, zg, 0.052, 0.046, 12);
    cylX(B.dark, 1.64, 1.72, 0, zg, 0.072, 0.072, 12);
    cylX(B.dark, 1.00, 1.55, -0.20, zg - 0.04, 0.024, 0.022, 6);    /* coaxial 7.62 mm */
    box(B.glass, 1.04, 1.08, 0.14, 0.26, zg - 0.08, zg + 0.04);
    /* gunner's sight head left front on the roof */
    box(B.paint, 0.22, 0.58, 0.28, 0.62, 0.50, 0.64);
    box(B.glass, 0.58, 0.61, 0.32, 0.58, 0.54, 0.62);
    /* gunner's hatch left, commander's cupola right with four periscopes */
    cylZ(B.paint, -0.14, 0.40, 0.52, 0.60, 0.22, 16);
    cylZ(B.team, -0.14, 0.40, 0.60, 0.625, 0.18, 16);
    cylZ(B.paint, -0.14, -0.42, 0.50, 0.68, 0.24, 16);
    for (i = 0; i < 4; i++) box(B.glass, -0.14 + 0.24 * Math.cos(i * TAU / 4 + 0.6) - 0.035, -0.14 + 0.24 * Math.cos(i * TAU / 4 + 0.6) + 0.035,
                                -0.42 + 0.24 * Math.sin(i * TAU / 4 + 0.6) - 0.035, -0.42 + 0.24 * Math.sin(i * TAU / 4 + 0.6) + 0.035, 0.60, 0.66);
    cylZ(B.team, -0.14, -0.42, 0.68, 0.705, 0.19, 16);
    /* 9M113 Konkurs: pedestal, cradle and the missile container tilted up forward */
    cylZ(B.dark, -0.28, 0.0, 0.54, 0.70, 0.075, 10);
    box(B.dark, -0.48, -0.10, -0.12, 0.12, 0.66, 0.72);
    cyl(B.dark, [-0.52, 0.0, 0.80], [0.58, 0.0, 0.99], 0.082, 0.082, 14);
    cyl(B.paint, [0.55, 0.0, 0.985], [0.64, 0.0, 1.00], 0.082, 0.050, 12);
    cyl(B.dark, [-0.52, 0.0, 0.80], [-0.58, 0.0, 0.81], 0.092, 0.092, 14);
    box(B.dark, -0.22, -0.12, -0.12, 0.12, 0.72, 0.84);
    box(B.dark, 0.20, 0.30, -0.12, 0.12, 0.76, 0.90);
    box(B.glass, 0.30, 0.33, -0.08, 0.08, 0.78, 0.88);
    /* 902V smoke grenade launchers: three tubes a side on the turret rear (the Kiev photograph
       shows the starboard group; the same group is drawn on the port side) */
    for (i = -1; i <= 1; i += 2) {
      box(B.dark, -0.84, -0.46, i * 0.70 - 0.03, i * 0.70 + 0.03, 0.34, 0.42);
      for (var q = 0; q < 3; q++) {
        cyl(B.dark, [-0.80 + q * 0.14, i * 0.70, 0.40], [-0.76 + q * 0.14, i * 0.78, 0.60], 0.036, 0.036, 8);
        cyl(B.paint, [-0.76 + q * 0.14, i * 0.78, 0.60], [-0.755 + q * 0.14, i * 0.785, 0.62], 0.034, 0.024, 8);
      }
    }
    /* roof rear: ventilator, stowage rail */
    box(B.paint, -0.74, -0.52, -0.14, 0.14, 0.44, 0.52);
    box(B.dark, -0.98, -0.92, -0.60, 0.60, 0.22, 0.26);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.B, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB, tx = V.bmp2 ? -0.60 : -0.50;
    addHull(V, HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel);
      addWheel(WB, -1); addWheel(WB, 1);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (V.bmp2) addTurret2(V, TB); else addTurret1(V, TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(tx, 0, ROOF);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e60_ifv"] = {
  len: 6.74,
  build: function (THREE, M, C) { return HeroBMP12.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e80_ifv"] = {
  len: 6.74,
  build: function (THREE, M, C) { return HeroBMP12.build(THREE, M, C, "B"); }
};
