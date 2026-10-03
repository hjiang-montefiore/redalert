/* ============ ru_svetlyak.js - HERO model: Project 10410 "Svetlyak" fast patrol boat ============
   Key: pact_e80_patrol ("Svetlyak", Project 10410 fast patrol boat, in commission from 1988 for the
   Border Guard and the Navy; eras.js e80-e00, turret:true).  facts.js: one 76 mm AK-176M (152 rounds),
   steel hull, aluminium superstructure, NBC protection, 375 t, 56 km/h.
   Published figures used (Wikipedia "Svetlyak-class patrol boat", Project 10410 / 10412 entries):
   length 49.2-49.5 m (drawn 49.5), beam 9.2 m, draught 2.63 m (en.wikipedia infobox; the keel is at
   -2.63 m), three Zvezda M520 diesels on three fixed-pitch propellers (three shafts drawn, generic).

   References (Wikimedia Commons, cached under svet_ref in the scratchpad):
     "Syktyvkar ship 178.JPG"   Border Guard (FSB Coast Guard) boat 178, starboard bow quarter: the
         flared bow and rising sheer, the AK-176M and its fixed shield forward, the house starting
         right behind the gun, the bridge ribbon window, the white radome and the small sphere on the
         bridge roof, the lattice mast with yard 26 m from the stem, four liferaft canisters on the house
         side, a lower aft house with the AK-630 on its roof, a rail round the open stern deck.
     "Vietnam People's Navy Ship 266 (Project 10412 Svetlyak-class).jpg"  port side, Navy-style grey:
         the stepped house (bridge block, taller radar block behind it with a railed roof, lower aft
         house), the grey dome halfway up the mast, the white dome at the bridge-roof rear, the sheer.
     "Svetlyak class Vietnam.jpg", "Patrol boat Triglav side.jpg"  (10412 boats): the flared bow plating,
         the red-brown underwater hull with a thin boot line, the grey topsides, the side doors and
         portholes, the railed bow.
   What each feature rests on: stations (bow 12 m to the gun, 14.5 m to the house front, bridge to 19.8,
   radar block to 31.8, aft house to 42 m from the stem, the AK-630 at 38.3 m, the mast at 26.5 m) were
   scaled off the 178 photograph (stem to transom 49.5 m = 1070 px) and checked on 266; the heights
   (bridge roof about 5.6 m above the deck, mast top about 17.5 m above the deck) likewise.
   Boat 178 and the Vietnamese/Slovenian 10412 boats are later liveries or export variants: 178 wears the
   blue-and-white FSB Coast Guard scheme of the 2000s, not the Border Guard colours of 1988-91, and no
   photograph of a 1988-91 boat was found.  So the model is drawn in the Navy-style grey the 266 and
   Triglav photographs show.  NOT CONFIRMED and therefore NOT drawn: torpedo tubes, Igla/Strela launchers,
   boats on davits (the Vietnamese boats carry a RIB aft, the 178 does not), the exact radars (types
   are not identifiable on the photographs: a white dome and a grey dome and a yard are drawn), pennant
   numbers, names, ensigns, Border Guard stripes.  The AK-630 director: the small sphere on the bridge
   roof is drawn as a generic radome.  Shafts, propellers and rudders under the hull are generic (not seen).
   Only five Commons photographs of the class exist (178, 266, Triglav, Vietnam, a users map); none shows
   a Soviet-era 10410.  Boat 178 IS a 10410 (lattice mast, yard, domes, AK-176M, AK-630M: the same
   as 266, so the 10410 and 10412 match in the points drawn); Triglav (10412, 2010) has a different, plated
   mast and is not followed.  No stays from the mast to the bow or stern are drawn: none is visible.
   The 1988-91 Border Guard paint is not documented by any photograph found; the grey of the export
   photographs is used, no stripes, numbers, names or ensigns.
   Greys: topsides light grey 0x9aa3a8, house 0xa9b1b5, deck 0x6c7478, red-brown bottom 0x6a3a32.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The AK-176M (shield, cradle, barrel) is
   the group named "turret" (ring centre on its barbette, gun along +X); everything else is baked, one mesh
   per material.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSvetlyak = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var L = 49.5, X0 = -L / 2, X1 = L / 2;
  function X(d) { return X1 - d; }       /* x at d metres abaft the stem */
  var TX = X(12.2), BARB = 0.55;

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

  /* ------------------------------------------------------------ hull form */
  function dOf(x) { return X1 - x; }
  /* Each section is one planar slice (tilted aft below the deck edge to give the raked stem).  The lower
     points sit up to 2.6 m aft of the deck point; the shift m(d) falls from 1 at the stem to 0 at 9 m,
     slope at most 2.6 * 2 / 9 = 0.58 < 1, so x stays strictly increasing along every strip and the loft
     cannot fold.  The lower points also close on the centre line and rise (smoothstep) toward the
     stem: a raked stem and a cut-up forefoot. */
  function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }
  function deckZ(x) {
    var d = dOf(x);
    return 2.2 + 0.28 * clamp01((x - X0) / 12) + 1.3 * Math.pow(clamp01(1 - d / 22), 2);
  }
  function halfDeck(x) {
    var d = dOf(x), w = 4.6 * Math.pow(Math.sin(clamp01(d / 21) * Math.PI / 2), 0.85);
    var s = clamp01((-x - 13) / 11.75);
    return w - 0.5 * s * s;
  }
  function halfWl(x) {
    var d = dOf(x), fl = Math.pow(clamp01(1 - d / 20), 1.5), wd = halfDeck(x);
    var s = clamp01((-x - 12) / 12.75);
    return wd * (0.90 - 0.36 * fl) - 0.2 * s;
  }
  function ring(x) {
    var d = dOf(x), wd = halfDeck(x), zd = deckZ(x), q = clamp01(1 - d / 9), xl = x - 2.6 * q * q;
    var sw = smooth((d - 1.0) / 7.5), sz = smooth((d - 1.0) / 10);
    var ww = halfWl(x) * sw, s = clamp01((-x - 10) / 14.75);
    var zk = (-2.63 + 0.3 * s) * sz, w1 = ww * 0.93, w2 = ww * 0.72;
    return [[x, wd, zd], [xl, ww, 0], [xl, w1, -0.85 * sz], [xl, w2, -1.6 * sz], [xl, 0, zk],
            [xl, -w2, -1.6 * sz], [xl, -w1, -0.85 * sz], [xl, -ww, 0], [x, -wd, zd]];
  }
  var XS = [], i0;
  for (i0 = 0; i0 <= 72; i0++) {
    /* dense toward the bow */
    var u = i0 / 72;
    XS.push(X0 + (X1 - X0) * (1 - Math.pow(1 - u, 1.35)));
  }
  var TAGS = ["hull", "bot", "bot", "bot", "bot", "bot", "bot", "hull", "deck"];

  function addHull(B) {
    var V = [], F = [], T = [], s, k, a, b, c, d, n = 9, i, f, vol = 0, r;
    for (s = 0; s < XS.length; s++) { r = ring(XS[s]); for (k = 0; k < n; k++) V.push(r[k]); }
    for (s = 0; s + 1 < XS.length; s++) for (k = 0; k < n; k++) {
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
  /* thin panels on a leaning face (fpan) and on a side face (span) */
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
  /* a dome: hemisphere (axis z) of radius r on base centre c */
  function dome(bin, cx, cy, cz, r, rings, seg, full) {
    var R = [], i, k, a, ring2, top = full ? Math.PI * 0.92 : Math.PI / 2;
    for (i = 0; i <= rings; i++) {
      a = (full ? -Math.PI * 0.45 : 0) + i / rings * (full ? Math.PI * 0.9 : Math.PI / 2 * 0.97);
      ring2 = [];
      for (k = 0; k < seg; k++) ring2.push([cx + Math.cos(a) * r * Math.cos(k / seg * TAU), cy + Math.cos(a) * r * Math.sin(k / seg * TAU), cz + r * (full ? Math.sin(a) + 0 : Math.sin(a))]);
      R.push(ring2);
    }
    loftS(bin, R);
  }

  function materials(THREE, C) {
    var T = {}, mk = function (c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); };
    T.hull = mk(0x9aa3a8, 0.88, 0.05);
    T.bot = mk(0x6a3a32, 0.9, 0.04);
    T.deck = mk(0x6c7478, 0.95, 0.04);
    T.sup = mk(0xa9b1b5, 0.88, 0.05);
    T.dark = mk(0x25282b, 0.8, 0.3);
    T.metal = mk(0x555c60, 0.55, 0.5);
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.buoy = mk(0xc4452d, 0.7, 0.02);
    T.white = mk(0xdfe3e4, 0.6, 0.05);
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  function addShip(B) {
    var i, j, s, x, y, z, k;
    addHull(B);

    /* guard rails round the weather deck: top rail, mid rail and stanchions */
    var rs, xr;
    for (s = -1; s <= 1; s += 2) {
      for (xr = X0 + 0.6; xr < X(1.6) - 0.01; xr += 1.2) {
        var xn = Math.min(xr + 1.2, X(1.6)), y0 = s * (halfDeck(xr) - 0.1), y1 = s * (halfDeck(xn) - 0.1);
        if (Math.abs(y0) < 0.2) continue;
        cyl(B.metal, [xr, y0, deckZ(xr) + 1.02], [xn, y1, deckZ(xn) + 1.02], 0.022, 0.022, 4);
        cyl(B.metal, [xr, y0, deckZ(xr) + 0.55], [xn, y1, deckZ(xn) + 0.55], 0.015, 0.015, 3);
        box(B.metal, xr - 0.02, xr + 0.02, y0 - 0.02, y0 + 0.02, deckZ(xr), deckZ(xr) + 1.02);
      }
    }
    /* transom rail and bow rail */
    box(B.metal, X0 + 0.55, X0 + 0.62, -(halfDeck(X0) - 0.1), halfDeck(X0) - 0.1, deckZ(X0 + 0.6) + 1.0, deckZ(X0 + 0.6) + 1.04);
    box(B.metal, X0 + 0.55, X0 + 0.62, -(halfDeck(X0) - 0.1), halfDeck(X0) - 0.1, deckZ(X0 + 0.6) + 0.55, deckZ(X0 + 0.6) + 0.58);

    /* forecastle: anchor pockets / hawse, windlass, bitts, hatch, barbette */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(2.4) - 0.5, X(2.4) + 0.5, s * (halfDeck(X(2.4)) - 0.45) - 0.18, s * (halfDeck(X(2.4)) - 0.45) + 0.18, deckZ(X(2.4)) - 0.55, deckZ(X(2.4)) - 0.15);
      cylZ(B.metal, X(3.4), s * 0.55, deckZ(X(3.4)), deckZ(X(3.4)) + 0.35, 0.1, 8);
      cylZ(B.metal, X(7.0), s * 1.5, deckZ(X(7.0)), deckZ(X(7.0)) + 0.32, 0.09, 8);
      cylZ(B.metal, X(11.0), s * 3.6, deckZ(X(11.0)), deckZ(X(11.0)) + 0.32, 0.09, 8);
    }
    cylZ(B.sup, X(5.0), 0, deckZ(X(5.0)) - 0.02, deckZ(X(5.0)) + 0.4, 0.45, 14);       /* windlass */
    cylZ(B.dark, X(5.0), 0, deckZ(X(5.0)) + 0.4, deckZ(X(5.0)) + 0.45, 0.4, 14);
    box(B.sup, X(7.5), X(6.4), -0.5, 0.5, deckZ(X(7.0)), deckZ(X(7.0)) + 0.22);       /* hatch */
    box(B.dark, X(7.4), X(6.5), -0.4, 0.4, deckZ(X(7.0)) + 0.22, deckZ(X(7.0)) + 0.25);
    var zg = deckZ(TX);
    cylZ(B.sup, TX, 0, zg - 0.05, zg + BARB, 1.2, 28);
    cylZ(B.dark, TX, 0, zg + BARB - 0.04, zg + BARB, 1.02, 28);

    /* ---- the house: bridge block A, taller radar block B2 on lower block B, lower aft house C ---- */
    var zA = deckZ(X(14.5)) - 0.03, ztA = 8.1, HA = ztA - zA;
    var xfA = function (h) { return X(14.5) - 0.7 * h / HA; }, wsA = function (h) { return 3.9 - 0.35 * h / HA; };
    block(B.sup, X(19.8), X(14.5), 3.9, zA, X(19.5), X(14.5) - 0.7, 3.55, ztA);
    var zB = deckZ(X(25)) - 0.03, ztB = 6.5, HB = ztB - zB;
    var wsB = function (h) { return 3.9 - 0.3 * h / HB; };
    block(B.sup, X(31.8), X(19.8), 3.9, zB, X(31.6), X(19.8), 3.6, ztB);
    var zC = deckZ(X(37)) - 0.03, ztC = 4.8, HC = ztC - zC;
    var wsC = function (h) { return 3.5 - 0.25 * h / HC; };
    block(B.sup, X(42.0), X(31.8), 3.5, zC, X(41.9), X(31.8), 3.25, ztC);
    /* upper radar block B2 over the after bridge roof */
    var zB2 = ztB - 0.03, ztB2 = 9.0, HB2 = ztB2 - zB2;
    var wsB2 = function (h) { return 2.7 - 0.35 * h / HB2; };
    block(B.sup, X(29.0), X(21.4), 2.7, zB2, X(28.8), X(21.6), 2.35, ztB2);
    /* bridge roof between A and B2, with lip */
    box(B.sup, X(21.5), X(14.5) - 0.78, -3.7, 3.7, ztA - 0.02, ztA + 0.12);
    box(B.sup, X(21.4), X(14.5) - 0.9, -3.85, 3.85, ztA + 0.06, ztA + 0.12);

    /* bridge ribbon windows: front, sides */
    for (j = 0; j < 7; j++) {
      y = (j - 3) * 1.0;
      fpan(B.glass, xfA, zA, y - 0.4, y + 0.4, 3.8, 4.75, -0.02, 0.04);
    }
    fpan(B.dark, xfA, zA, -3.6, 3.6, 4.75, 4.95, -0.02, 0.06);       /* visor */
    fpan(B.dark, xfA, zA, -3.6, 3.6, 3.62, 3.8, -0.02, 0.05);       /* sill */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 5; j++) {
        x = X(15.6) - j * 0.95;
        span(B.glass, wsA, zA, s, x - 0.38, x + 0.38, 3.8, 4.75, -0.02, 0.04);
      }
      span(B.dark, wsA, zA, s, X(19.4), X(15.0), 4.75, 4.95, -0.02, 0.05);
      /* side doors and ports on the lower house and radar block */
      span(B.dark, wsB, zB, s, X(22.2), X(21.2), 0.2, 2.1, -0.02, 0.04);                /* door */
      span(B.dark, wsC, zC, s, X(33.8), X(32.8), 0.2, 1.95, -0.02, 0.04);
      span(B.dark, wsA, zA, s, X(17.5), X(16.6), 0.2, 2.0, -0.02, 0.04);
      for (j = 0; j < 4; j++) {
        x = X(23.2) - j * 1.1;
        span(B.glass, wsB, zB, s, x - 0.22, x + 0.22, 2.3, 2.8, -0.02, 0.03);
      }
      for (j = 0; j < 4; j++) {
        x = X(35.2) - j * 1.2;
        span(B.glass, wsC, zC, s, x - 0.2, x + 0.2, 1.4, 1.9, -0.02, 0.03);
      }
      /* B2 windows (a row of small panes) */
      for (j = 0; j < 4; j++) {
        x = X(22.6) - j * 1.5;
        span(B.glass, wsB2, zB2, s, x - 0.3, x + 0.3, 0.9, 1.4, -0.02, 0.03);
      }
    }
    /* four liferaft canisters on each side wall of the radar block, lifebuoys */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 4; j++) {
        x = X(25.0) - j * 0.72;
        cylY(B.white, x, s * (wsB(1.9) + 0.0), s * (wsB(1.9) + 0.7), zB + 1.9, 0.28, 10);
      }
      box(B.metal, X(27.6), X(24.4), s * wsB(1.9) - 0.04 * s - 0.02, s * wsB(1.9) + 0.04, zB + 1.55, zB + 1.6);
      cylY(B.buoy, X(29.4), s * wsB(2.4), s * (wsB(2.4) + 0.1), zB + 2.4, 0.34, 14);
      cylY(B.buoy, X(16.0), s * wsA(4.4), s * (wsA(4.4) + 0.1), zA + 4.6, 0.3, 14);
    }

    /* roof rails of B (aft of B2) and C */
    for (s = -1; s <= 1; s += 2) {
      belt(B.metal, X(31.8), ztB + 1.0, X(21.4), ztB + 1.0, s * 3.45 - 0.02, s * 3.45 + 0.02, 0.04);
      belt(B.metal, X(31.8), ztB + 0.55, X(21.4), ztB + 0.55, s * 3.45 - 0.015, s * 3.45 + 0.015, 0.03);
      belt(B.metal, X(41.9), ztC + 1.0, X(31.8), ztC + 1.0, s * 3.2 - 0.02, s * 3.2 + 0.02, 0.04);
      belt(B.metal, X(41.9), ztC + 0.55, X(31.8), ztC + 0.55, s * 3.2 - 0.015, s * 3.2 + 0.015, 0.03);
      for (x = X(31.6); x > X(41.9); x -= 1.6) box(B.metal, x - 0.02, x + 0.02, s * 3.2 - 0.02, s * 3.2 + 0.02, ztC, ztC + 1.0);
      for (x = X(22.0); x > X(31.6); x -= 1.6) box(B.metal, x - 0.02, x + 0.02, s * 3.45 - 0.02, s * 3.45 + 0.02, ztB, ztB + 1.0);
    }
    box(B.metal, X(41.95), X(41.85), -3.2, 3.2, ztC + 1.0, ztC + 1.04);
    box(B.metal, X(41.95), X(41.85), -3.2, 3.2, ztC + 0.55, ztC + 0.58);
    /* B2 roof rail (round the radar block) */
    box(B.metal, X(28.9), X(28.8), -2.3, 2.3, ztB2 + 0.95, ztB2 + 1.0);
    for (s = -1; s <= 1; s += 2) box(B.metal, X(28.8), X(21.6), s * 2.28 - 0.02, s * 2.28 + 0.02, ztB2 + 0.95, ztB2 + 1.0);

    /* bridge-roof sensors: grey dome pedestal, white radome, small sphere (director-type radome) */
    cylZ(B.metal, X(20.7), 0, ztA + 0.1, ztA + 0.7, 0.35, 12);
    cylZ(B.sup, X(20.7), 0, ztA + 0.7, ztA + 0.78, 0.95, 20);
    dome(B.white, X(20.7), 0, ztA + 0.78, 1.05, 6, 20, false);
    cylZ(B.metal, X(15.9), 0.0, ztA + 0.1, ztA + 0.5, 0.18, 10);
    dome(B.white, X(15.9), 0, ztA + 0.5, 0.52, 5, 16, false);
    box(B.dark, X(16.9), X(16.3), -0.5, 0.5, ztA + 0.12, ztA + 0.38);
    /* team strips: small flat panels on the roofs and the aft deck */
    box(B.team, X(27.6), X(25.6), -0.7, 0.7, ztB2 + 0.0, ztB2 + 0.02);
    box(B.team, X(40.4), X(38.0), -0.9, 0.9, ztC + 0.0, ztC + 0.02);
    box(B.team, X(46.4), X(44.4), -0.8, 0.8, deckZ(X(44.4)) + 0.015, deckZ(X(44.4)) + 0.035);

    /* lattice mast on the radar block: four legs, braces, platforms, grey dome, yard, topmast */
    var mx = X(26.6), mz = ztB2 + 0.0, top = 14.0, leg = [[0.45, 0.45], [0.45, -0.45], [-0.45, -0.45], [-0.45, 0.45]], Bp, f0, f1, tp = 0.4;
    for (i = 0; i < 4; i++) {
      cyl(B.metal, [mx + leg[i][0], leg[i][1], mz], [mx + leg[i][0] * tp, leg[i][1] * tp, top], 0.04, 0.028, 5);
      Bp = (i + 1) % 4;
      for (j = 0; j < 5; j++) {
        f0 = j / 5; f1 = (j + 1) / 5;
        cyl(B.metal, [mx + leg[i][0] * (1 - (1 - tp) * f0), leg[i][1] * (1 - (1 - tp) * f0), mz + (top - mz) * f0],
                     [mx + leg[Bp][0] * (1 - (1 - tp) * f1), leg[Bp][1] * (1 - (1 - tp) * f1), mz + (top - mz) * f1], 0.016, 0.016, 4);
        cyl(B.metal, [mx + leg[i][0] * (1 - (1 - tp) * f1), leg[i][1] * (1 - (1 - tp) * f1), mz + (top - mz) * f1],
                     [mx + leg[Bp][0] * (1 - (1 - tp) * f1), leg[Bp][1] * (1 - (1 - tp) * f1), mz + (top - mz) * f1], 0.014, 0.014, 4);
      }
    }
    cyl(B.metal, [mx, 0, top], [mx, 0, 17.4], 0.06, 0.025, 8);                          /* topmast */
    box(B.metal, mx - 0.8, mx + 0.8, -0.8, 0.8, 11.9, 11.97);                           /* platform */
    box(B.metal, mx - 0.6, mx + 0.6, -0.6, 0.6, 14.0, 14.06);                           /* upper platform */
    box(B.metal, mx - 0.04, mx + 0.04, -2.7, 2.7, 15.2, 15.26);                          /* yard */
    box(B.dark, mx - 0.12, mx + 0.12, -2.9, -2.55, 15.1, 15.4);
    box(B.dark, mx - 0.12, mx + 0.12, 2.55, 2.9, 15.1, 15.4);
    cylZ(B.metal, mx + 0.55, 0, 11.97, 12.6, 0.3, 10);                                  /* pedestal of the grey dome */
    dome(B.sup, mx + 0.55, 0, 12.6, 1.0, 6, 20, false);
    cylZ(B.metal, mx - 0.1, 0, 14.06, 14.5, 0.16, 8);
    box(B.dark, mx - 0.45, mx - 0.35, -0.8, 0.8, 14.5, 15.0);                           /* small antenna plate */
    cyl(B.metal, [mx - 0.05, 0, 15.26], [mx - 0.05, 0, 15.9], 0.03, 0.02, 5);
    /* whip aerials (no stays: the photographs do not show any) */
    [[X(18.0), 2.9, 3.5], [X(18.0), -2.9, 3.5], [X(30.5), 2.9, 4.8], [X(30.5), -2.9, 4.8], [X(36.0), 3.0, 4.6], [X(36.0), -3.0, 4.6]].forEach(function (a) {
      var zb = a[1] > 0 && a[0] < X(25) ? ztB + 0.0 : ztC;
      cyl(B.metal, [a[0], a[1], (a[0] > X(31.8) ? ztB : ztC) - (a[0] > X(31.8) ? 0 : 0)], [a[0] - 0.15, a[1], (a[0] > X(31.8) ? ztB : ztC) + a[2]], 0.012, 0.007, 4);
    });

    /* aft house details: roof boxes, vents */
    box(B.sup, X(40.6), X(39.4), -2.5, -1.2, ztC, ztC + 0.5);
    box(B.sup, X(40.6), X(39.4), 1.2, 2.5, ztC, ztC + 0.5);
    box(B.dark, X(40.6), X(39.4), -2.5, -1.2, ztC + 0.5, ztC + 0.54);
    box(B.dark, X(40.6), X(39.4), 1.2, 2.5, ztC + 0.5, ztC + 0.54);
    cylZ(B.sup, X(35.2), 2.4, ztC, ztC + 0.5, 0.2, 10);
    cylZ(B.sup, X(35.2), -2.4, ztC, ztC + 0.5, 0.2, 10);
    cylZ(B.dark, X(35.2), 2.4, ztC + 0.5, ztC + 0.55, 0.27, 10);
    cylZ(B.dark, X(35.2), -2.4, ztC + 0.5, ztC + 0.55, 0.27, 10);

    /* aft AK-630M: round pedestal, drum body, six barrels raised and pointing aft (stowed) */
    var ax = X(38.3), az = ztC + 0.0;
    cylZ(B.sup, ax, 0, az, az + 0.55, 0.7, 20);
    cylZ(B.dark, ax, 0, az + 0.5, az + 0.58, 0.72, 20);
    block(B.sup, ax - 0.75, ax + 0.7, 0.7, az + 0.58, ax - 0.55, ax + 0.55, 0.55, az + 1.7);
    cylZ(B.sup, ax, 0, az + 1.7, az + 1.8, 0.45, 14);
    var el2 = 0.35, ce = Math.cos(el2), se = Math.sin(el2), bz = az + 1.15;
    for (i = 0; i < 6; i++) {
      var ang = i / 6 * TAU, by = Math.cos(ang) * 0.1, bh = Math.sin(ang) * 0.1;
      cyl(B.metal, [ax - 0.45, by, bz + bh], [ax - 0.45 - 1.35 * ce, by, bz + bh + 1.35 * se], 0.03, 0.03, 6);
    }
    cyl(B.metal, [ax - 0.45, 0, bz], [ax - 0.45 - 0.5 * ce, 0, bz + 0.5 * se], 0.17, 0.17, 12);
    box(B.dark, ax + 0.4, ax + 0.9, -0.5, 0.5, az + 0.7, az + 1.3);         /* ammunition drum side box */
    cylZ(B.metal, ax + 0.3, 0.65, az + 0.62, az + 1.1, 0.1, 8);

    /* aft deck: hatch, bitts, towing gear, fairleads */
    box(B.dark, X(44.0), X(43.0), -0.6, 0.6, deckZ(X(43.5)), deckZ(X(43.5)) + 0.08);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, X(47.5), s * 2.0, deckZ(X(47.5)), deckZ(X(47.5)) + 0.35, 0.1, 8);
      cylZ(B.metal, X(44.5), s * 3.6, deckZ(X(44.5)), deckZ(X(44.5)) + 0.35, 0.1, 8);
      cylZ(B.metal, X(26.5), s * 4.1, deckZ(X(26.5)), deckZ(X(26.5)) + 0.35, 0.1, 8);
      box(B.sup, X0 + 0.0, X0 + 0.5, s * 4.0 - 0.1, s * 4.0 + 0.1, deckZ(X0) - 0.0, deckZ(X0) + 0.3);
    }
    cylZ(B.sup, X(46.2), 0, deckZ(X(46.2)), deckZ(X(46.2)) + 0.5, 0.4, 12);          /* capstan */
    cylZ(B.dark, X(46.2), 0, deckZ(X(46.2)) + 0.5, deckZ(X(46.2)) + 0.54, 0.35, 12);
    /* walkway non-skid beside the house */
    for (s = -1; s <= 1; s += 2) box(B.deck, X(41.5), X(14.8), s * 4.25 - 0.3, s * 4.25 + 0.3, deckZ(X(28)) + 0.0, deckZ(X(28)) + 0.02);

    /* underwater: three shafts (three M520 diesels, three fixed-pitch propellers per the published data), generic props and rudders (not seen in the photographs) */
    for (s = -1; s <= 1; s++) {
      cylX(B.metal, X0 - 0.3, X0 + 5.0, s * 1.7, -1.75, 0.1, 0.1, 8);
      cylX(B.metal, X0 - 0.5, X0 - 0.3, s * 1.7, -1.75, 0.18, 0.08, 8);
      for (k = 0; k < 3; k++) {
        var pa = k / 3 * TAU + 0.5;
        box(B.metal, X0 - 0.5, X0 - 0.38, s * 1.7 - 0.03 + Math.cos(pa) * 0.35 * 0.5, s * 1.7 + 0.03 + Math.cos(pa) * 0.35 * 0.5, -1.75 + Math.sin(pa) * 0.35 * 0.5 - 0.03, -1.75 + Math.sin(pa) * 0.35 * 0.5 + 0.03);
      }
      box(B.metal, X0 + 1.0, X0 + 1.5, s * 1.7 - 0.04, s * 1.7 + 0.04, -2.1, -1.6);   /* strut */
      box(B.metal, X0 + 0.2, X0 + 0.9, s * 1.7 - 0.04, s * 1.7 + 0.04, -2.2, -0.8);   /* rudder */
    }
  }

  function addTurret(B) {
    var i;
    /* AK-176M: a faceted low-radar-signature shield on the barbette, cradle and a 59-calibre 76 mm barrel */
    block(B.paint, -1.3, 1.45, 1.35, -0.06, -0.9, 0.95, 1.0, 1.35);
    box(B.paint, -1.65, -1.3, -1.0, 1.0, 0.0, 1.0);                   /* rear bustle */
    box(B.paint, -1.95, -1.65, -0.8, 0.8, 0.1, 0.85);
    block(B.paint, 1.1, 1.55, 0.95, 0.05, 1.0, 1.4, 0.45, 1.0);       /* forward cheeks */
    box(B.paint, -0.9, 0.95, -0.95, 0.95, 1.35, 1.42);                /* roof plate */
    box(B.dark, 1.42, 1.62, -0.38, 0.38, 0.35, 0.95);                 /* gun port rim */
    cylX(B.dark, 1.45, 2.1, 0, 0.65, 0.25, 0.2, 14);                   /* mantlet sleeve */
    cylX(B.dark, 2.05, 2.55, 0, 0.65, 0.16, 0.12, 14);                 /* recoil jacket */
    cylX(B.metal, 2.5, 5.55, 0, 0.65, 0.085, 0.075, 12);                /* barrel */
    cylX(B.dark, 5.5, 5.75, 0, 0.65, 0.11, 0.09, 12);                   /* muzzle brake */
    box(B.dark, 0.2, 0.75, 0.55, 0.9, 1.4, 1.52);                      /* sight box */
    box(B.glass, 0.74, 0.77, 0.58, 0.87, 1.43, 1.5);
    box(B.dark, -0.4, 0.2, -0.9, -0.5, 1.4, 1.5);                      /* hatch */
    for (i = -1; i <= 1; i += 2) box(B.dark, -1.0, -0.2, i * 1.37 - 0.02 + (i > 0 ? 0.0 : -0.02), i * 1.37 + 0.02 + (i > 0 ? 0.02 : 0.0), 0.3, 0.9);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var HB = bins(T, ["hull", "bot", "deck", "sup", "dark", "metal", "glass", "buoy", "white", "team"]);
    addShip(HB);
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

UNIT_MODELS["pact_e80_patrol"] = {
  len: 49.5,
  build: function (THREE, M, C) { return HeroSvetlyak.build(THREE, M, C); }
};
