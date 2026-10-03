/* ============ ru_sprut.js - HERO model: the 2S25 Sprut-SD airborne tank destroyer ============
   Two rows, one model (pact_e00_lighttank, lt_p): the armour_specs and facts rows give the same vehicle (7.1 m
   hull, 3.2 m wide, 125 mm 2A75, seven road wheels, 18 t).  The 2S25M (Sprut-SDM1) differences are NOT drawn:
   no labelled photograph of the SDM1 was read, so the original vehicle stands for both.

   References (Wikimedia Commons, fetched with a generic agent string, cached; all labelled 2S25 Sprut-SD):
     "2S25 Sprut-SD tank destroyer in 2008.JPG", "2008 Moscow Victory Day Parade - 2S25 Sprut-SD (2).jpg",
     "2S25 Sprut-SD, Moscow parade 2009.JPG" (near side, three-quarter front and side), "2S25 Sprut-SD at Army 2016.jpg"
     (front left), "2S25 Sprut-SD in Russia.jpeg" (side, rear of turret), "125-mm ... Sprut-SD ... Armiya 2021" (front)
   What each feature rests on:
     - SEVEN disc road wheels each side (counted on four photographs), a toothed REAR sprocket, a plain front idler,
       NO return rollers visible (armour_specs rollers:4 loses to the photographs); BMD-3 family hull, steep glacis
     - turret: a LOW welded hexagonal-section box, wider at the rear and tapering to the mantlet, its roof sloping down to
       the gun, centred on the hull middle (ring about 0.1 m ahead of mid hull, front plate 1.5 m ahead of mid hull);
       cast mantlet block, 125 mm 2A75 with the bore evacuator about 30-50 per cent of the tube back from the muzzle,
       no muzzle brake; small gunner's sight box on the roof front left, commander's hatch with periscopes and a gun mount
       rear right, a second hatch rear left; smoke dischargers (three tubes each side) on the REAR corners of the turret
     - NOT drawn: the two whip antennas (photographs show them; left off to keep the bounding box), the snorkel and trim
       vane (armour_specs extras, no photograph), the stowage tarp, any marking and the 2S25M changes
     - paint: plain Russian green (the 2008 parade vehicles wear a three-tone scheme; not copied, no markings)
   Published figures (wikipedia infobox): hull 7.15 m, width 3.15 m, gun forward 9.77 m, 18 t.  Model: hull 7.1 m,
   width 3.15 m, gun muzzle 9.7 m, height about 2.4 m to the sight box (published 2.3).
   Materials: paint, dark, glass, wheel, team (C.team exactly, two small flat strips on the rear deck).
   Named nodes: "turret" (ring centre on the hull roof, gun along +X), seven "roadwheel" groups (Y axle, both sides).
   Model space +X bow, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSprut = (function () {
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
    A: { name: "2S25 Sprut-SD", paint: 0x4f5c3a, camo: false, ROOF: 1.45, TYC: 1.30, TH: 0.15,
         XW: [2.15, 1.40, 0.65, -0.10, -0.85, -1.60, -2.35], ZW: 0.335, RW: 0.29, IDL: [2.98, 0.36, 0.22], SPR: [-3.15, 0.42, 0.28], TD: 0,
         ROLL: [], RZ: 0.5, tx: 0.10, pitch: 0.17,
         ST: [[-3.55, 0.58, 1.00, 0.90, 1.50, 1.35, 1.46], [-3.35, 0.50, 1.10, 0.88, 1.56, 1.42, 1.52],
              [-0.20, 0.50, 1.12, 0.88, 1.575, 1.45, 1.53], [2.20, 0.50, 1.12, 0.88, 1.575, 1.45, 1.53],
              [2.85, 0.54, 1.06, 0.86, 1.52, 1.38, 1.46], [3.25, 0.62, 0.92, 0.84, 1.38, 1.20, 1.28],
              [3.55, 0.70, 0.74, 0.82, 1.12, 1.04, 0.96]] }
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

  /* ---- hull detail ---- */
  function addHull(B) {
    var V = CUR, ROOF = V.ROOF, k, side, x, z;
    hullLoft(B);
    /* bow: driver's hatch on the centre line with three periscopes ahead of it */
    cylZ(B.paint, 2.40, 0.0, ROOF - 0.06, ROOF + 0.05, 0.20, 16);
    box(B.paint, 2.58, 2.74, -0.34, 0.34, ROOF - 0.10, ROOF);
    for (k = -1; k <= 1; k++) box(B.glass, 2.74, 2.76, k * 0.2 - 0.055, k * 0.2 + 0.055, ROOF - 0.08, ROOF - 0.02);
    /* faceted glacis edges and a raised splash lip across the deck */
    belt(B.paint, 2.86, roofZ(2.86) + 0.02, 2.90, roofZ(2.90) + 0.05, -0.80, 0.80, 0.03);
    for (side = -1; side <= 1; side += 2) {
      /* round lamp at each front corner of the hull */
      cylX(B.dark, 3.20, 3.30, side * 1.12, 0.98, 0.075, 0.075, 12);
      cylX(B.glass, 3.30, 3.32, side * 1.12, 0.98, 0.055, 0.055, 12);
      /* side: belt line, lifting eyes along the roof edge, towing eye, tool brackets */
      box(B.paint, -3.30, 2.60, side * 1.575 - 0.006, side * 1.575 + 0.012, 1.04, 1.075);
      for (k = 0; k < 8; k++) {
        x = -2.9 + k * 0.82;
        box(B.dark, x, x + 0.08, side * 1.52, side * 1.555, 1.38, 1.45);
      }
      for (k = 0; k < 3; k++) box(B.paint, -2.2 + k * 1.5, -1.3 + k * 1.5, side * 1.59 - 0.004, side * 1.59 + 0.014, 0.93, 0.98);
      /* hull-side wing at the stern over the sprocket */
      box(B.dark, -3.55, -3.50, side * 0.78 - 0.20, side * 0.78 + 0.20, 0.64, 1.24);
      /* front mud flap lip over the track */
      belt(B.paint, 3.00, 0.84, 3.34, 0.74, side > 0 ? 1.00 : -1.57, side > 0 ? 1.57 : -1.00, 0.03);
    }
    /* stern: a plain rear hatch and the stern plate */
    box(B.paint, -3.30, -2.80, -0.55, 0.55, ROOF - 0.06, ROOF + 0.02);
    box(B.team, -3.20, -2.96, -0.50, 0.50, ROOF + 0.02, ROOF + 0.035);   /* team strip on the rear hatch lid */
    box(B.team, -2.70, -1.70, 0.80, 1.05, ROOF + 0.02, ROOF + 0.035);    /* team strip on the port deck behind the turret */
    box(B.dark, -3.58, -3.55, -0.70, 0.70, 0.60, 1.14);
    runningGear(B);
  }

  /* -------------------------------------------------------------- turret */
  /* welded turret, local x forward of the ring centre: a flat-sided hexagonal section, wide at the rear and tapering
     to the mantlet, the roof sloping down toward the gun (side and top photographs) */
  function tsec(x, wb, wt, zt) {
    return [[x, -wb, -0.04], [x, wb, -0.04], [x, wb, 0.30], [x, wt, zt], [x, -wt, zt], [x, -wb, 0.30]];
  }
  function addTurret(B) {
    var i, q, k, zg = 0.50, TR = 0.88, c, sn;
    loft(B.paint, [tsec(-1.40, 1.10, 0.92, 0.88), tsec(-0.30, 1.10, 0.92, 0.88), tsec(0.50, 0.98, 0.78, 0.84),
                   tsec(1.05, 0.82, 0.58, 0.72), tsec(1.38, 0.62, 0.44, 0.64)]);
    /* cast mantlet block in the front plate, rubber boot ahead of it */
    box(B.paint, 1.30, 1.56, -0.36, 0.36, zg - 0.27, zg + 0.27);
    cylX(B.dark, 1.54, 1.70, 0.0, zg, 0.19, 0.15, 18);
    /* 125 mm 2A75: jacket, tube, bore evacuator, muzzle ring (no muzzle brake) */
    cylX(B.dark, 1.66, 2.50, 0.0, zg, 0.115, 0.098, 18);
    cylX(B.dark, 2.50, 6.09, 0.0, zg, 0.086, 0.076, 18);
    cylX(B.dark, 3.90, 4.60, 0.0, zg, 0.125, 0.125, 18);
    cylX(B.dark, 3.90, 3.95, 0.0, zg, 0.134, 0.134, 18);
    cylX(B.dark, 4.55, 4.60, 0.0, zg, 0.134, 0.134, 18);
    cylX(B.dark, 5.94, 6.09, 0.0, zg, 0.088, 0.088, 18);
    cylX(B.dark, 1.66, 2.20, -0.24, zg - 0.05, 0.026, 0.022, 8);    /* coaxial PKT */
    /* gunner's sight box on the roof front left (small box, aperture forward) */
    box(B.paint, 0.46, 0.80, 0.30, 0.68, 0.74, 0.94);
    box(B.glass, 0.80, 0.82, 0.35, 0.63, 0.78, 0.90);
    box(B.dark, 0.54, 0.74, 0.68, 0.74, 0.80, 0.88);
    /* commander's hatch rear right: ring of periscopes, machine-gun mount */
    cylZ(B.paint, -0.55, -0.45, TR - 0.06, TR + 0.12, 0.23, 18);
    for (i = 0; i < 6; i++) {
      c = -0.55 + 0.23 * Math.cos(i + 0.3); sn = -0.45 + 0.23 * Math.sin(i + 0.3);
      box(B.glass, c - 0.03, c + 0.03, sn - 0.03, sn + 0.03, TR + 0.04, TR + 0.12);
    }
    box(B.dark, -0.62, -0.50, -0.80, -0.62, TR - 0.04, TR + 0.04);
    /* gunner's hatch rear left, a flat lid */
    cylZ(B.paint, -0.50, 0.45, TR - 0.06, TR + 0.06, 0.22, 18);
    /* smoke dischargers: a bank of three tubes on each rear corner of the turret */
    for (q = -1; q <= 1; q += 2) {
      box(B.dark, -1.42, -1.12, q * 0.78 - 0.26, q * 0.78 + 0.26, 0.40, 0.52);
      for (i = 0; i < 3; i++) {
        cyl(B.dark, [-1.38 + i * 0.10, q * 0.78 + (i - 1) * 0.15 * 0, 0.50], [-1.40 + i * 0.10, q * (0.62 + i * 0.16), 0.84], 0.032, 0.032, 8);
      }
    }
    /* rear bustle: a stowage rail across the back */
    box(B.paint, -1.50, -1.40, -0.7, 0.7, 0.30, 0.52);
  }

  function build(THREE, M, C) {
    var V = VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var HB, TB, i, wg, WB;
    CUR = V;
    HB = bins(T, null); TB = bins(T, null);
    addHull(HB);
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
    addTurret(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(V.tx, 0, V.ROOF);
    flush(THREE, wg, TB, [V.tx, 0, V.ROOF], 0);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e00_lighttank"] = { len: 7.1, build: function (THREE, M, C) { return HeroSprut.build(THREE, M, C); } };
UNIT_MODELS["lt_p"] = { len: 7.1, build: function (THREE, M, C) { return HeroSprut.build(THREE, M, C); } };

