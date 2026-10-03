/* ============ ru_buyan.js - HERO models: Project 21630 "Buyan" and Project 21631 "Buyan-M" ============
   Keys: boat_p (Project 21630 Buyan gunboat, rules.js, turret:true; warship_specs len 62, beam 9.6) and
   pact_e00_missileboat (Project 21631 Buyan-M missile corvette, eras.js, service 2014; warship_specs len 74.1,
   beam 11).  One build() with an option per hull; each key registered with its own true length.
   Published figures (en.wikipedia "Buyan-class corvette" and "Buyan-M-class corvette", infobox): 21630 length 62 m,
   beam 9.6 m, draught 2 m; 21631 length 75 m (74.1 m in warship_specs, used), beam 11 m, draught 2.5 m; both with
   one A-190 100 mm; propulsion listed as CODAD with a PUMPJET: two waterjet outlets are drawn at the transom
   (the underwater hull is not photographed).
   References (Wikimedia Commons, cached under buyan_ref in the scratchpad):
     "Caspian Corvette Astrakhan.jpg" (21630 Astrakhan, port side) and "21630 Silhouette.jpg" (side silhouette):
        gun forward under a faceted stealth shield, flush forecastle deck, bridge house with raked front, tower mast
        carrying a big dome and a pole, a sphere director on the bridge roof ahead of the mast, two small 30 mm
        mounts abaft the house, a small mount (14.5 mm MTPU) beside the aft step, the deck stepping down about
        45 m abaft the stem, a raised wedge-shaped housing and the Grad-M launcher on the after deck, stowed
        elevated and trained aft.  Stations scaled off the silhouette (62 m = 918 px).
     "(Veliky Ustyug).jpg" (Cyrillic title) (21631 Veliky Ustyug, port side), "(Grad Sviyazhsk).jpg" (Cyrillic title) (21631 Grad Sviyazhsk, bow quarter),
     "Orekhovo-Zuyevo corvette.jpg" (21631 bow-on): longer, higher house with a raked front, the bridge block on
        it, the tower mast with a dome and two boxes (ESM) at the platform, a sphere director ahead of the tower,
        a small radome and a dome-topped drum on the long roof, the A-190 shield forward, deck stepping
        down about 52 m abaft the stem to a long low after deck, a twin-barrel mount on a pedestal near the stern.
        Stations scaled off the Veliky Ustyug photograph (74.1 m = 810 px).  Greys sampled from it: hull 0x4a5258,
        house 0xa4a9ab, dome 0xc4c6c8, dark boot topping.
   Check pass (non-oblique profile photographs, Veliky Ustyug and Vyshny Volochek, plus the Astrakhan photograph):
     Buyan-M: the high flush-sided house runs from the gun to d 57 (the upper tier with the bridge to d 48), a lower
     aft deckhouse d 57-67.5 carries the Duet, the stern deck is open d 67.5-74.1; a stowed launcher with two tubes
     pointing aft sits on the aft end of the long roof; gun station d 19.7 measured (19.6 drawn). Buyan: gun d 14.6
     (14.5 drawn), two 30 mm drums abaft the house d 37.5, small mount d 43, Grad-M elevated aft d 52-55.
   NOT CONFIRMED and therefore drawn only as marked: the Buyan's second pair of 30 mm barrels and exact types of the
   small mounts (drawn as one generic AK-630-class drum mount each; the MTPU's barrel count is published as 2 x
   KPV but is not resolvable in the photographs); the 3S14 eight-cell VLS is NOT drawn - no photograph shows its
   hatches, and a cell is about 9 m long, so it sits inside the high midships house, not on the open after deck;
   the stowed launcher's tube count and type; the Duet's barrel direction (not visible in profile; drawn forward);
   the waterjets.
   No pennant numbers, names, ensigns or markings.  Waterline z = 0.
   MODEL SPACE: +X bow, +Y port, +Z up, metres.  The A-190 (shield, cradle, barrel) is the group named "turret";
   everything else is baked, one mesh per material.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBuyan = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var L = 62, X0 = -L / 2, X1 = L / 2, TX = 0, BARB = 0.4, CFG = null;
  function X(d) { return X1 - d; }       /* x at d metres abaft the stem */

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
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  /* ------------------------------------------------------------ the two hulls */
  var HULLS = {
    b20: { L: 62, W: 4.8, D: 2.0, fwdZ: 3.7, aftZ: 2.3, step: 46, bowL: 20, rake: 2.4,
           gun: 14.5, jets: 1.7 },
    b21: { L: 74.1, W: 5.5, D: 2.5, fwdZ: 3.3, aftZ: 2.2, step: 52, bowL: 23, rake: 2.6,
           gun: 19.6, jets: 2.0 }
  };
  function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function dOf(x) { return X1 - x; }
  function deckZ(x) {
    var d = dOf(x), H = CFG;
    var z = H.fwdZ + (H.aftZ - H.fwdZ) * smooth((d - H.step + 0.5) / 1.0);
    return z + 0.45 * Math.pow(clamp01(1 - d / 11), 2) + 0.12 * clamp01((x - X0) / 10) * (d < H.step ? 0 : 0);
  }
  function halfDeck(x) {
    var d = dOf(x), H = CFG, w = H.W * Math.pow(Math.sin(clamp01(d / H.bowL) * Math.PI / 2), 0.85);
    var s = clamp01((-x - (L / 2 - 16)) / 16);
    return w - 0.45 * s * s;
  }
  function halfWl(x) {
    var d = dOf(x), H = CFG, fl = Math.pow(clamp01(1 - d / 21), 1.5), wd = halfDeck(x);
    var s = clamp01((-x - (L / 2 - 17)) / 17);
    return wd * (0.91 - 0.30 * fl) - 0.18 * s;
  }
  function ring(x) {
    var d = dOf(x), H = CFG, wd = halfDeck(x), zd = deckZ(x), q = clamp01(1 - d / 9), xl = x - H.rake * q * q;
    var sw = smooth((d - 1.0) / 7.5), sz = smooth((d - 1.0) / 10);
    var ww = halfWl(x) * sw, s = clamp01((-x - (L / 2 - 22)) / 22);
    var D = H.D, zk = (-D + 0.28 * D * s) * sz;
    return [[x, wd, zd], [xl, ww, 0], [xl, ww * 0.97, -0.42 * D * sz], [xl, ww * 0.84, -0.84 * D * sz],
            [xl, ww * 0.42, zk], [xl, -ww * 0.42, zk], [xl, -ww * 0.84, -0.84 * D * sz],
            [xl, -ww * 0.97, -0.42 * D * sz], [xl, -ww, 0], [x, -wd, zd]];
  }
  var TAGS = ["hull", "bot", "bot", "bot", "bot", "bot", "bot", "bot", "hull", "deck"];

  function addHull(B) {
    var XS = [], i0, u, V = [], F = [], T = [], s, k, a, b, c, d, n = 10, i, f, vol = 0, r, H = CFG;
    for (i0 = 0; i0 <= 76; i0++) { u = i0 / 76; XS.push(X0 + (X1 - X0) * (1 - Math.pow(1 - u, 1.35))); }
    var xs0 = X1 - H.step;
    XS.push(xs0 - 0.5, xs0, xs0 + 0.5, xs0 + 1.0); XS.sort(function (p, q2) { return p - q2; });
    var XU = [XS[0]];
    for (i0 = 1; i0 < XS.length; i0++) if (XS[i0] - XU[XU.length - 1] > 0.05) XU.push(XS[i0]);
    for (s = 0; s < XU.length; s++) { r = ring(XU[s]); for (k = 0; k < n; k++) V.push(r[k]); }
    for (s = 0; s + 1 < XU.length; s++) for (k = 0; k < n; k++) {
      a = s * n + k; b = s * n + (k + 1) % n; c = a + n; d = b + n;
      F.push([a, b, d], [a, d, c]); T.push(TAGS[k], TAGS[k]);
    }
    for (k = 1; k + 1 < n; k++) { F.push([0, k, k + 1]); T.push("hull"); }       /* transom */
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      c = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      if (dot(c, c) < 1e-10) continue;
      if (vol < 0) B[T[i]].tri(V[f[0]], V[f[2]], V[f[1]]); else B[T[i]].tri(V[f[0]], V[f[1]], V[f[2]]);
    }
  }
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function block(bin, x0, x1, w0, z0, x2, x3, w1, z1) {
    hexa(bin, [[x0, -w0, z0], [x1, -w0, z0], [x1, w0, z0], [x0, w0, z0],
               [x2, -w1, z1], [x3, -w1, z1], [x3, w1, z1], [x2, w1, z1]]);
  }
  /* box in an oriented frame: origin P, axes u (along), v (across), w (up-ish) */
  function obox(bin, P, u, v, w, a0, a1, b0, b1, c0, c1) {
    var V = [], A = [a0, a1], Bq = [b0, b1], Cq = [c0, c1], i, j, k, o = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    for (i = 0; i < 8; i++) {
      j = o[i];
      V.push([P[0] + u[0] * A[j[0]] + v[0] * Bq[j[1]] + w[0] * Cq[j[2]],
              P[1] + u[1] * A[j[0]] + v[1] * Bq[j[1]] + w[1] * Cq[j[2]],
              P[2] + u[2] * A[j[0]] + v[2] * Bq[j[1]] + w[2] * Cq[j[2]]]);
    }
    solid(bin, V, HEXF);
  }
  function fpan(bin, xf, zb, y0, y1, h0, h1, o0, o1) {
    var V = [], o = [o0, o1], k;
    for (k = 0; k < 2; k++) V.push([xf(h0) + o[k], y0, zb + h0], [xf(h0) + o[k], y1, zb + h0],
                                   [xf(h1) + o[k], y1, zb + h1], [xf(h1) + o[k], y0, zb + h1]);
    solid(bin, V, HEXF);
  }
  function span(bin, wf, zb, s, x0, x1, h0, h1, o0, o1) {
    var V = [], o = [o0, o1], k;
    for (k = 0; k < 2; k++) V.push([x0, s * (wf(h0) + o[k]), zb + h0], [x1, s * (wf(h0) + o[k]), zb + h0],
                                   [x1, s * (wf(h1) + o[k]), zb + h1], [x0, s * (wf(h1) + o[k]), zb + h1]);
    solid(bin, V, HEXF);
  }
  function dome(bin, cx, cy, cz, r, rings, seg, full) {
    var R = [], i, k, a, ring2;
    for (i = 0; i <= rings; i++) {
      a = (full ? -Math.PI * 0.45 : 0) + i / rings * (full ? Math.PI * 0.9 : Math.PI / 2 * 0.97);
      ring2 = [];
      for (k = 0; k < seg; k++) ring2.push([cx + Math.cos(a) * r * Math.cos(k / seg * TAU), cy + Math.cos(a) * r * Math.sin(k / seg * TAU), cz + r * Math.sin(a)]);
      R.push(ring2);
    }
    loftS(bin, R);
  }

  function materials(THREE, C) {
    var T = {}, mk = function (c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); };
    T.hull = mk(0x4a5258, 0.88, 0.05);
    T.bot = mk(0x2c2623, 0.9, 0.04);
    T.deck = mk(0x6a7074, 0.95, 0.04);
    T.sup = mk(0xa4a9ab, 0.88, 0.05);
    T.dark = mk(0x25282b, 0.8, 0.3);
    T.metal = mk(0x555c60, 0.55, 0.5);
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.buoy = mk(0xc4452d, 0.7, 0.02);
    T.white = mk(0xc4c6c8, 0.6, 0.05);
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* guard rails round the weather deck, the aft deck and the stepped stern */
  function rails(B, xa, xb) {
    var s, xr, xn, y0, y1, z0, z1;
    for (s = -1; s <= 1; s += 2) {
      for (xr = xa; xr < xb - 0.01; xr += 1.2) {
        xn = Math.min(xr + 1.2, xb); y0 = s * (halfDeck(xr) - 0.1); y1 = s * (halfDeck(xn) - 0.1);
        if (Math.abs(y0) < 0.2) continue;
        z0 = deckZ(xr); z1 = deckZ(xn);
        cyl(B.metal, [xr, y0, z0 + 1.02], [xn, y1, z1 + 1.02], 0.022, 0.022, 4);
        cyl(B.metal, [xr, y0, z0 + 0.55], [xn, y1, z1 + 0.55], 0.015, 0.015, 3);
        box(B.metal, xr - 0.02, xr + 0.02, y0 - 0.02, y0 + 0.02, z0, z0 + 1.02);
      }
    }
  }

  /* a 30 mm six-barrel mount (AK-630 class), stowed, barrels pointing along dir (+1 fwd, -1 aft) */
  function mount30(B, ax, ay, az, dir) {
    var i, el = 0.3, ce = Math.cos(el), se = Math.sin(el), bz = az + 1.1;
    cylZ(B.sup, ax, ay, az, az + 0.5, 0.6, 18);
    cylZ(B.dark, ax, ay, az + 0.46, az + 0.54, 0.62, 18);
    block(B.sup, ax - 0.65, ax + 0.6, 0.6, az + 0.54, ax - 0.5, ax + 0.45, 0.48, az + 1.55);
    cylZ(B.sup, ax, ay, az + 1.55, az + 1.63, 0.4, 12);
    for (i = 0; i < 6; i++) {
      var ang = i / 6 * TAU, by = ay + Math.cos(ang) * 0.09, bh = Math.sin(ang) * 0.09;
      cyl(B.metal, [ax + dir * 0.4, by, bz + bh], [ax + dir * (0.4 + 1.25 * ce), by, bz + bh + 1.25 * se], 0.028, 0.028, 5);
    }
    cyl(B.metal, [ax + dir * 0.35, ay, bz], [ax + dir * (0.35 + 0.45 * ce), ay, bz + 0.45 * se], 0.15, 0.15, 10);
    box(B.dark, ax - dir * 0.42 - 0.25, ax - dir * 0.42 + 0.25, ay - 0.45, ay + 0.45, az + 0.7, az + 1.25);
  }

  /* items common to both hulls: bow fittings, aft deck fittings, waterjets */
  function commonFit(B, bowDs) {
    var s, k;
    var xb = [X(2.4), X(3.4), X(7.0), X(11.0)];
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, xb[0] - 0.5, xb[0] + 0.5, s * (halfDeck(xb[0]) - 0.45) - 0.18, s * (halfDeck(xb[0]) - 0.45) + 0.18, deckZ(xb[0]) - 0.55, deckZ(xb[0]) - 0.15);
      cylZ(B.metal, xb[1], s * 0.55, deckZ(xb[1]), deckZ(xb[1]) + 0.35, 0.1, 8);
      cylZ(B.metal, xb[2], s * 1.5, deckZ(xb[2]), deckZ(xb[2]) + 0.32, 0.09, 8);
      cylZ(B.metal, xb[3], s * 3.4, deckZ(xb[3]), deckZ(xb[3]) + 0.32, 0.09, 8);
    }
    cylZ(B.sup, X(5.0), 0, deckZ(X(5.0)) - 0.02, deckZ(X(5.0)) + 0.4, 0.45, 14);       /* windlass */
    cylZ(B.dark, X(5.0), 0, deckZ(X(5.0)) + 0.4, deckZ(X(5.0)) + 0.45, 0.4, 14);
    box(B.sup, X(7.5), X(6.4), -0.5, 0.5, deckZ(X(7.0)), deckZ(X(7.0)) + 0.22);
    box(B.dark, X(7.4), X(6.5), -0.4, 0.4, deckZ(X(7.0)) + 0.22, deckZ(X(7.0)) + 0.25);
    /* transom and bow rails */
    var zt = deckZ(X0 + 0.6);
    box(B.metal, X0 + 0.55, X0 + 0.62, -(halfDeck(X0 + 0.6) - 0.1), halfDeck(X0 + 0.6) - 0.1, zt + 1.0, zt + 1.04);
    box(B.metal, X0 + 0.55, X0 + 0.62, -(halfDeck(X0 + 0.6) - 0.1), halfDeck(X0 + 0.6) - 0.1, zt + 0.55, zt + 0.58);
    for (s = -1; s <= 1; s += 2) {
      box(B.sup, X0 + 0.0, X0 + 0.5, s * (halfDeck(X0 + 0.3) - 0.8) - 0.1, s * (halfDeck(X0 + 0.3) - 0.8) + 0.1, zt - 0.0, zt + 0.3);
      cylZ(B.metal, X0 + 2.2, s * 2.3, deckZ(X0 + 2.2), deckZ(X0 + 2.2) + 0.35, 0.1, 8);
    }
    /* two waterjet (pumpjet) outlets at the transom, below the waterline */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.metal, X0 - 0.15, X0 + 1.4, s * CFG.jets, -0.95, 0.4, 0.46, 12);
      cylX(B.dark, X0 - 0.2, X0 - 0.14, s * CFG.jets, -0.95, 0.33, 0.33, 12);
      box(B.metal, X0 + 0.9, X0 + 1.5, s * CFG.jets - 0.05, s * CFG.jets + 0.05, -1.5, -0.5);
    }
  }

  /* the tower mast: plated tower on the bridge roof, platform, big dome, pole, yard */
  function tower(B, d0, d1, d2, d3, zr, zp, wB, wT, domeR, domeZ, poleD, poleTop) {
    var i;
    block(B.sup, X(d1), X(d0), wB, zr - 0.02, X(d3), X(d2), wT, zp);
    /* platform with a rail */
    box(B.metal, X(d3 + 1.6), X(d2 - 1.6), -wT - 1.0, wT + 1.0, zp, zp + 0.08);
    for (i = -1; i <= 1; i += 2) {
      box(B.metal, X(d3 + 1.6), X(d2 - 1.6), i * (wT + 1.0) - 0.02, i * (wT + 1.0) + 0.02, zp + 0.9, zp + 0.95);
      box(B.metal, X(d3 + 1.6), X(d3 + 1.6) - 0.04, -wT - 1.0, wT + 1.0, zp + 0.9, zp + 0.95);
      box(B.metal, X(d2 - 1.6), X(d2 - 1.6) + 0.04, -wT - 1.0, wT + 1.0, zp + 0.9, zp + 0.95);
    }
    cylZ(B.sup, X((d2 + d3) / 2 - 0.1), 0, zp + 0.08, domeZ - domeR * 0.5, domeR * 0.55, 16);
    dome(B.white, X((d2 + d3) / 2 - 0.1), 0, domeZ - domeR * 0.1, domeR, 8, 24, true);
    cyl(B.metal, [X(poleD), 0, zp], [X(poleD), 0, poleTop], 0.07, 0.025, 8);
    box(B.metal, X(poleD) - 0.04, X(poleD) + 0.04, -1.5, 1.5, poleTop - 2.2, poleTop - 2.14);
  }

  function addShip20(B) {
    var i, j, s, x, y, z, k;
    addHull(B);
    rails(B, X0 + 0.6, X(1.6));
    commonFit(B);
    var zg = deckZ(TX);
    cylZ(B.sup, TX, 0, zg - 0.05, zg + BARB, 1.4, 28);
    cylZ(B.dark, TX, 0, zg + BARB - 0.04, zg + BARB, 1.2, 28);
    /* ---- the house (d 20-32.5 from the stem): raked front, bridge roof 7.1 m above the waterline ---- */
    var zA = deckZ(X(25)) - 0.03, ztA = 7.1, HA = ztA - zA;
    var xfA = function (h) { return X(20.0) - 1.9 * h / HA; }, wsA = function (h) { return 4.2 - 0.6 * h / HA; };
    block(B.sup, X(32.6), X(20.0), 4.2, zA, X(32.0), X(20.0) - 1.9, 3.6, ztA);
    box(B.sup, X(32.0), X(20.0) - 2.0, -3.7, 3.7, ztA - 0.02, ztA + 0.1);
    /* bridge windows: front, sides */
    for (j = 0; j < 7; j++) { y = (j - 3) * 0.95; fpan(B.glass, xfA, zA, y - 0.38, y + 0.38, 2.5, 3.3, -0.02, 0.04); }
    fpan(B.dark, xfA, zA, -3.4, 3.4, 3.3, 3.5, -0.02, 0.06);
    fpan(B.dark, xfA, zA, -3.4, 3.4, 2.34, 2.5, -0.02, 0.05);
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 6; j++) { x = X(22.4) - j * 1.45; span(B.glass, wsA, zA, s, x - 0.5, x + 0.5, 2.5, 3.3, -0.02, 0.04); }
      span(B.dark, wsA, zA, s, X(31.6), X(21.4), 3.3, 3.5, -0.02, 0.05);
      span(B.dark, wsA, zA, s, X(29.0), X(28.0), 0.1, 2.1, -0.02, 0.04);
      for (j = 0; j < 3; j++) { x = X(26.0) - j * 1.3; span(B.glass, wsA, zA, s, x - 0.25, x + 0.25, 1.1, 1.6, -0.02, 0.03); }
      cylY(B.buoy, X(22.8), s * (wsA(2.9) + 0.0), s * (wsA(2.9) + 0.1), zA + 2.9, 0.28, 14);
      for (j = 0; j < 3; j++) cylY(B.white, X(30.6) - j * 0.7, s * wsA(1.4), s * (wsA(1.4) + 0.62), zA + 1.4, 0.26, 10);
      /* roof rail of the bridge house */
      belt(B.metal, X(32.0), ztA + 0.95, X(21.8), ztA + 0.95, s * 3.6 - 0.02, s * 3.6 + 0.02, 0.04);
      for (x = X(21.8); x > X(32.0); x -= 1.4) box(B.metal, x - 0.02, x + 0.02, s * 3.6 - 0.02, s * 3.6 + 0.02, ztA, ztA + 0.95);
    }
    box(B.metal, X(32.05), X(32.0), -3.6, 3.6, ztA + 0.9, ztA + 0.95);
    /* tower with the big dome (d 29-32), dome top about 14.4 m */
    tower(B, 28.6, 32.4, 29.4, 31.8, ztA, 10.8, 2.0, 1.2, 1.5, 12.7, 31.0, 17.0);
    /* sphere director on the bridge roof ahead of the tower */
    cylZ(B.metal, X(24.5), 0, ztA + 0.1, ztA + 1.2, 0.22, 10);
    cylZ(B.sup, X(24.5), 0, ztA + 1.2, ztA + 1.3, 0.55, 14);
    dome(B.white, X(24.5), 0, ztA + 1.3, 0.62, 8, 16, true);
    box(B.dark, X(25.4), X(25.1), -0.35, 0.35, ztA + 1.4, ztA + 1.9);
    /* team strips (small flat panels): bridge roof, aft deck */
    box(B.team, X(27.4), X(26.1), -1.0, 1.0, ztA + 0.1, ztA + 0.12);
    box(B.team, X(58.0), X(56.6), 1.5, 2.6, deckZ(X(57)) + 0.015, deckZ(X(57)) + 0.035);
    /* two 30 mm mounts abaft the house (d 37.5), a small mount on the centre line aft (d 43.8) */
    mount30(B, X(37.6), 1.9, deckZ(X(37.6)), -1);
    mount30(B, X(37.6), -1.9, deckZ(X(37.6)), -1);
    var mz = deckZ(X(43.8));
    cylZ(B.sup, X(43.8), 0, mz, mz + 0.5, 0.35, 12);
    box(B.dark, X(44.1), X(43.5), -0.28, 0.28, mz + 0.5, mz + 0.95);
    cyl(B.metal, [X(43.6), -0.1, mz + 0.8], [X(43.0), -0.1, mz + 1.05], 0.03, 0.03, 5);
    cyl(B.metal, [X(43.6), 0.1, mz + 0.8], [X(43.0), 0.1, mz + 1.05], 0.03, 0.03, 5);
    /* after housing (wedge) and the Grad-M launcher on the stepped after deck */
    var za = deckZ(X(50));
    block(B.sup, X(51.2), X(47.8), 2.0, za, X(50.6), X(48.4), 1.6, za + 1.7);
    box(B.dark, X(48.9), X(48.0), -1.6, 1.6, za + 1.0, za + 1.2);
    box(B.deck, X(51.4), X(46.6), -3.2, 3.2, za + 0.0, za + 0.015);
    var pz = deckZ(X(55.0)), el = 0.55, ue = [-Math.cos(el), 0, Math.sin(el)], ve = [0, 1, 0], we = [Math.sin(el), 0, Math.cos(el)];
    block(B.sup, X(56.2), X(53.8), 1.3, pz, X(55.8), X(54.2), 0.9, pz + 1.15);
    box(B.dark, X(56.0), X(54.0), -0.95, 0.95, pz + 1.15, pz + 1.22);
    var P0 = [X(54.6), 0, pz + 1.55];
    obox(B.dark, P0, ue, ve, we, -0.3, 3.4, -0.7, 0.7, -0.05, 0.0);
    obox(B.dark, P0, ue, ve, we, -0.3, 3.4, -0.7, 0.7, 1.38, 1.43);
    obox(B.dark, P0, ue, ve, we, -0.3, 3.4, -0.72, -0.68, 0.0, 1.38);
    obox(B.dark, P0, ue, ve, we, -0.3, 3.4, 0.68, 0.72, 0.0, 1.38);
    for (j = 0; j < 4; j++) for (k = 0; k < 5; k++) {
      var cA = [P0[0] + ve[0] * ((j - 1.5) * 0.31) + we[0] * (0.14 + k * 0.27), (j - 1.5) * 0.31, P0[2] + we[2] * (0.14 + k * 0.27)];
      cyl(B.metal, [cA[0] - ue[0] * 0.3, cA[1], cA[2] - ue[2] * 0.3], [cA[0] + ue[0] * 3.4, cA[1], cA[2] + ue[2] * 3.4], 0.09, 0.09, 6);
    }
    cyl(B.metal, [X(54.6), -0.7, pz + 1.1], [X(54.6), 0.7, pz + 1.1], 0.09, 0.09, 8);
    /* aft deck rails already by rails(); capstan and bitts */
    cylZ(B.sup, X(60.4), 0, deckZ(X(60.4)), deckZ(X(60.4)) + 0.5, 0.35, 12);
    cylZ(B.dark, X(60.4), 0, deckZ(X(60.4)) + 0.5, deckZ(X(60.4)) + 0.54, 0.3, 12);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, X(58.0), s * 3.4, deckZ(X(58.0)), deckZ(X(58.0)) + 0.35, 0.1, 8);
      cylZ(B.metal, X(40.0), s * 4.2, deckZ(X(40.0)), deckZ(X(40.0)) + 0.35, 0.1, 8);
      box(B.deck, X(46.0), X(33.0), s * 4.1 - 0.3, s * 4.1 + 0.3, deckZ(X(40)) + 0.0, deckZ(X(40)) + 0.02);
    }
    /* step wall in the deck and the ladder at the step */
    /* PK-10 decoy launchers: the published armament lists 2 x 10; none visible in the photographs: not drawn */
  }

  function addShip21(B) {
    var i, j, s, x, y, z, k;
    addHull(B);
    rails(B, X0 + 0.6, X(67.5));
    rails(B, X(57.0), X(1.6));
    commonFit(B);
    var zg = deckZ(TX);
    cylZ(B.sup, TX, 0, zg - 0.05, zg + BARB, 1.4, 28);
    cylZ(B.dark, TX, 0, zg + BARB - 0.04, zg + BARB, 1.2, 28);
    /* ---- long house d 25.5-51.8, roof 6.3 m above the waterline; bridge block on it, top 7.9 m ---- */
    var zL = deckZ(X(30)) - 0.03, ztL = 6.3, HL = ztL - zL;
    var xfL = function (h) { return X(25.5) - 1.5 * h / HL; }, wsL = function (h) { return 4.9 - 0.3 * h / HL; };
    block(B.sup, X(57.0), X(25.5), 4.9, zL, X(56.6), X(25.5) - 1.5, 4.6, ztL);
    box(B.sup, X(56.6), X(25.5) - 1.6, -4.7, 4.7, ztL - 0.02, ztL + 0.08);
    box(B.sup, X(57.0), X(51.0), -4.9, 4.9, deckZ(X(55)) - 0.03, zL + 0.3);       /* the wall runs down to the lower after deck */
    var zB = ztL + 0.06, ztB = 7.9, HB = ztB - zB;
    var xfB = function (h) { return X(27.6) - 1.3 * h / HB; }, wsB = function (h) { return 4.2 - 0.5 * h / HB; };
    block(B.sup, X(48.0), X(27.6), 4.2, zB, X(47.6), X(27.6) - 1.3, 3.7, ztB);
    box(B.sup, X(47.6), X(27.6) - 1.4, -3.8, 3.8, ztB - 0.02, ztB + 0.1);
    /* bridge windows: front ribbon and sides */
    for (j = 0; j < 8; j++) { y = (j - 3.5) * 0.9; fpan(B.glass, xfB, zB, y - 0.36, y + 0.36, 0.45, 1.2, -0.02, 0.04); }
    fpan(B.dark, xfB, zB, -3.5, 3.5, 1.2, 1.38, -0.02, 0.06);
    fpan(B.dark, xfB, zB, -3.5, 3.5, 0.3, 0.45, -0.02, 0.05);
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 6; j++) { x = X(29.2) - j * 1.6; span(B.glass, wsB, zB, s, x - 0.55, x + 0.55, 0.45, 1.2, -0.02, 0.04); }
      span(B.dark, wsB, zB, s, X(47.2), X(28.2), 1.2, 1.38, -0.02, 0.05);
      for (j = 0; j < 4; j++) { x = X(41.0) - j * 1.6; span(B.glass, wsB, zB, s, x - 0.3, x + 0.3, 0.45, 1.0, -0.02, 0.03); }
      span(B.dark, wsB, zB, s, X(44.6), X(43.6), 0.05, 1.1, -0.02, 0.04);
      /* long house side: doors, portholes, life-raft canisters */
      span(B.dark, wsL, zL, s, X(32.2), X(31.2), 0.15, 2.0, -0.02, 0.04);
      span(B.dark, wsL, zL, s, X(46.8), X(45.8), 0.15, 2.0, -0.02, 0.04);
      for (j = 0; j < 6; j++) { x = X(34.0) + -j * 1.5; span(B.glass, wsL, zL, s, x - 0.2, x + 0.2, 1.7, 2.2, -0.02, 0.03); }
      for (j = 0; j < 4; j++) { x = X(41.0) - j * 1.4; span(B.glass, wsL, zL, s, x - 0.2, x + 0.2, 1.7, 2.2, -0.02, 0.03); }
      for (j = 0; j < 4; j++) cylY(B.white, X(48.6) - j * 0.72, s * wsL(1.2), s * (wsL(1.2) + 0.62), zL + 1.2, 0.26, 10);
      cylY(B.buoy, X(29.6), s * wsL(3.0), s * (wsL(3.0) + 0.1), zL + 3.0, 0.28, 14);
      /* roof rails of the long house and the bridge block */
      belt(B.metal, X(56.6), ztL + 0.95, X(48.0), ztL + 0.95, s * 4.5 - 0.02, s * 4.5 + 0.02, 0.04);
      for (x = X(48.2); x > X(56.6); x -= 1.5) box(B.metal, x - 0.02, x + 0.02, s * 4.5 - 0.02, s * 4.5 + 0.02, ztL, ztL + 0.95);
      belt(B.metal, X(47.6), ztB + 0.95, X(28.8), ztB + 0.95, s * 3.55 - 0.02, s * 3.55 + 0.02, 0.04);
      for (x = X(28.8); x > X(47.6); x -= 1.5) box(B.metal, x - 0.02, x + 0.02, s * 3.55 - 0.02, s * 3.55 + 0.02, ztB, ztB + 0.95);
      /* bridge-wing sensors boxes on the tower platform */
    }
    box(B.metal, X(56.65), X(56.6), -4.5, 4.5, ztL + 0.9, ztL + 0.95);
    box(B.metal, X(47.65), X(47.6), -3.55, 3.55, ztB + 0.9, ztB + 0.95);
    /* tower mast on the bridge roof, d 33-37; dome centre 16.7 m, top about 18.3 m; pole to 22 m */
    tower(B, 32.6, 37.4, 33.8, 36.4, ztB, 13.2, 2.1, 1.4, 1.6, 16.8, 37.8, 22.0);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(36.0), X(34.2), s * 1.9 - 0.45, s * 1.9 + 0.45, 13.3, 14.4);
      box(B.sup, X(36.0), X(34.2), s * 1.9 - 0.4, s * 1.9 + 0.4, 14.4, 14.5);
    }
    /* sphere director on a stalk ahead of the tower */
    cylZ(B.metal, X(30.4), 0, ztB + 0.1, ztB + 1.4, 0.24, 10);
    cylZ(B.sup, X(30.4), 0, ztB + 1.4, ztB + 1.5, 0.62, 14);
    dome(B.white, X(30.4), 0, ztB + 1.5, 0.7, 8, 16, true);
    /* small radome (d 44.5), dome-topped drum (d 50) and a pole on the long roof */
    cylZ(B.metal, X(44.5), 0, ztB + 0.08, ztB + 1.3, 0.2, 8);
    dome(B.white, X(44.5), 0, ztB + 1.3, 0.6, 8, 16, true);
    cylZ(B.sup, X(50.0), 0, ztL + 0.08, ztL + 1.3, 0.85, 20);
    cylZ(B.dark, X(50.0), 0, ztL + 1.0, ztL + 1.06, 0.88, 20);
    dome(B.white, X(50.0), 0, ztL + 1.3, 0.85, 6, 20, false);
    cyl(B.metal, [X(48.9), 0.0, ztL + 0.08], [X(48.9), 0, ztL + 2.6], 0.045, 0.02, 6);
    cyl(B.metal, [X(41.5), 0.0, ztB + 0.08], [X(41.5), 0, ztB + 2.2], 0.04, 0.018, 6);
    /* team strips (small flat panels): bridge roof, long roof, aft deck */
    box(B.team, X(33.2), X(31.6), -1.0, 1.0, ztB + 0.1, ztB + 0.12);
    box(B.team, X(46.0), X(44.6), 1.6, 2.8, ztB + 0.1, ztB + 0.12);
    box(B.team, X(70.0), X(68.6), 1.6, 2.7, deckZ(X(69)) + 0.015, deckZ(X(69)) + 0.035);
    /* 3S14 eight-cell VLS: NOT drawn. The class's cells are inside the high midships hull/house (a launch tube is about
       9 m long); no photograph supplied shows hatches, and the after deck is open (checked: Veliky Ustyug, Vyshny Volochek). */
    /* Gibka-type launcher stowed on the aft end of the long roof (d 51-56): pedestal, cradle, two tubes visible in
       profile pointing aft (tube count and type not confirmed) */
    var gx = X(54.0), gzr = ztL + 0.04;
    block(B.sup, gx - 0.8, gx + 0.8, 0.9, gzr, gx - 0.7, gx + 0.7, 0.8, gzr + 0.7);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, gx - 0.5, gx + 0.5, s * 0.5 - 0.3, s * 0.5 + 0.3, gzr + 0.7, gzr + 1.15);
      cyl(B.white, [gx - 0.2, s * 0.5, gzr + 1.0], [gx + 1.5, s * 0.5, gzr + 1.55], 0.13, 0.13, 8);
    }
    /* aft deckhouse d 57-67.5, roof 4.7 m, carrying the Duet; doors and lights on its sides */
    var zH = deckZ(X(62)) - 0.03, ztH = 4.7;
    block(B.sup, X(67.5), X(57.0), 5.0, zH, X(67.2), X(57.2), 4.8, ztH);
    box(B.sup, X(67.2), X(57.2), -4.85, 4.85, ztH - 0.02, ztH + 0.06);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(59.6) - 0.45, X(59.6) + 0.45, s * 4.98 - 0.03, s * 4.98 + 0.03, zH + 0.1, zH + 1.9);
      box(B.dark, X(64.2) - 0.45, X(64.2) + 0.45, s * 4.98 - 0.03, s * 4.98 + 0.03, zH + 0.1, zH + 1.9);
      for (j = 0; j < 3; j++) box(B.glass, X(61.4) - j * 0.8 - 0.2, X(61.4) - j * 0.8 + 0.2, s * 4.98 - 0.03, s * 4.98 + 0.03, zH + 1.5, zH + 1.9);
    }
    /* AK-630M-2 Duet on the aft deckhouse roof (d 61.5), stowed forward (barrel direction not visible in the profile photographs): twin six-barrel clusters */
    var dx = X(61.5), dz = ztH - 0.95;
    cylZ(B.sup, dx, 0, dz, dz + 1.3, 1.0, 22);
    cylZ(B.dark, dx, 0, dz + 1.26, dz + 1.34, 1.02, 22);
    block(B.sup, dx - 0.9, dx + 0.9, 1.15, dz + 1.34, dx - 0.7, dx + 0.65, 0.95, dz + 2.7);
    cylZ(B.sup, dx, 0, dz + 2.7, dz + 2.78, 0.6, 12);
    box(B.dark, dx - 1.25, dx - 0.9, -0.8, 0.8, dz + 1.5, dz + 2.3);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) {
        var an = i / 6 * TAU, by = s * 0.42 + Math.cos(an) * 0.085, bh = Math.sin(an) * 0.085;
        cyl(B.metal, [dx + 0.8, by, dz + 2.0 + bh], [dx + 0.8 + 1.15 * 0.95, by, dz + 2.0 + bh + 1.15 * 0.3], 0.026, 0.026, 5);
      }
      cyl(B.metal, [dx + 0.7, s * 0.42, dz + 2.0], [dx + 1.15, s * 0.42, dz + 2.14], 0.15, 0.15, 10);
    }
    /* capstan, bitts, non-skid beside the house */
    cylZ(B.sup, X(70.0), 0, deckZ(X(70)), deckZ(X(70)) + 0.5, 0.4, 12);
    cylZ(B.dark, X(70.0), 0, deckZ(X(70)) + 0.5, deckZ(X(70)) + 0.54, 0.35, 12);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, X(67.0), s * 3.9, deckZ(X(67.0)), deckZ(X(67.0)) + 0.35, 0.1, 8);
      cylZ(B.metal, X(35.0), s * 5.1, deckZ(X(35.0)), deckZ(X(35.0)) + 0.35, 0.1, 8);
      box(B.deck, X(51.0), X(26.5), s * 5.2 - 0.2, s * 5.2 + 0.2, deckZ(X(40)) + 0.0, deckZ(X(40)) + 0.02);
    }
  }

  function addTurret(B) {
    var i;
    /* A-190 stealth shield: faceted wedge, sloping front and roof, gun port, 59-calibre 100 mm barrel */
    block(B.paint, -2.0, 2.0, 1.55, -0.06, -1.1, 1.0, 1.0, 1.95);
    block(B.paint, 1.5, 2.3, 1.1, 0.0, 1.5, 1.9, 0.62, 1.2);
    box(B.paint, -2.4, -2.0, -1.2, 1.2, 0.1, 1.2);
    box(B.dark, 1.9, 2.1, -0.4, 0.4, 0.55, 1.3);
    cylX(B.dark, 2.0, 2.7, 0, 0.95, 0.28, 0.22, 14);
    cylX(B.dark, 2.65, 3.3, 0, 0.95, 0.18, 0.14, 14);
    cylX(B.metal, 3.2, 7.0, 0, 0.95, 0.085, 0.075, 12);
    cylX(B.dark, 6.95, 7.2, 0, 0.95, 0.11, 0.09, 12);
    box(B.dark, 0.1, 0.8, 0.6, 1.0, 1.9, 2.02);
    box(B.glass, 0.78, 0.82, 0.64, 0.96, 1.93, 2.0);
    box(B.dark, -0.9, -0.2, -0.9, -0.4, 1.94, 2.02);
    for (i = -1; i <= 1; i += 2) box(B.dark, -1.2, -0.3, i * 1.5 - 0.02, i * 1.5 + 0.02, 0.4, 1.2);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C, which) {
    var T = materials(THREE, C), g = new THREE.Group(), v = which === "b21";
    CFG = HULLS[which]; L = CFG.L; X0 = -L / 2; X1 = L / 2;
    TX = X(CFG.gun);
    var HB = bins(T, ["hull", "bot", "deck", "sup", "dark", "metal", "glass", "buoy", "white", "team"]);
    if (v) addShip21(HB); else addShip20(HB);
    flush(THREE, g, HB);
    var TB = { paint: new Bin(T.sup), dark: new Bin(T.dark), metal: new Bin(T.metal), glass: new Bin(T.glass) };
    addTurret(TB);
    var wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, deckZ(TX) + BARB);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["boat_p"] = {
  len: 62,
  build: function (THREE, M, C) { return HeroBuyan.build(THREE, M, C, "b20"); }
};
UNIT_MODELS["pact_e00_missileboat"] = {
  len: 74.1,
  build: function (THREE, M, C) { return HeroBuyan.build(THREE, M, C, "b21"); }
};
