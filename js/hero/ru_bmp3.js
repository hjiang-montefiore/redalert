/* ============ ru_bmp3.js - HERO model: the BMP-3 infantry fighting vehicle ============
   Three rows, one vehicle (the rows name no different standard, so no add-on armour is drawn):
     pact_e90_ifv   BMP-3 (1987)  1990s, plain Russian/Soviet green
     pact_e00_ifv   BMP-3         2000s, plain green
     ifv_p          BMP-3         present day, plain green
   References (Wikimedia Commons, fetched with a generic agent string):
     "BMP-3 line drawing.gif"          side-view line drawing: hull, wheels, band, turret, sights
     "Bmp-3_scanned_side_view.gif"     scanned side photograph (bow right): turret position, smoke
                                       launchers and the guns side by side on the mount
   What each feature rests on:
     - low boat hull about 7.1 m long, long shallow glacis to a sloped nose with the folded trim
       vane: line drawing and photograph
     - SIX road wheels a side (rim ring and hub), the drive sprocket at the REAR and a small
       idler at the bow (sprocketFront:false in js/armour_specs.js and the drawing's toothed
       rear wheel), a grid-ribbed band along the sponson: line drawing
     - turret ring a little forward of the middle (about 0.10 m ahead of the hull centre), box
       turret with the 100 mm 2A70 and the 30 mm 2A72 side by side in one mount (rows' own
       armament text), smoke launchers on the turret front, a raised sight pillar and the whip
       aerial at the turret rear: drawing and photograph
     - rear engine layout with the troop hatches on the rear roof over the engine deck and a
       louvred cooling grille at the stern, two bow machine-gun cheeks beside the driver's
       hatch (facts.js lists 3 x 7.62 mm PKT)
   Check-and-fix (photographs: "BMP-3 amphibious infantry fighting vehicle.jpg" 2010 parade, port side;
   "BMP-3 (3).jpg" 2008; "BMP-3 Kubinka.jpg" museum; "BMP-3 infantry fighting vehicle at Engineering
   Technologies 2012 01/03.jpg" starboard/rear views):
     - rear: two troop doors with hinges and a step each side (2012 rear view), NOT a louvred grille;
       the roof louvres and the vent housing behind the turret are removed (no photograph shows them)
     - a louvred vent on the starboard hull side, rear half (2012 photographs) on the 2000s and present
       rows only; the 1990s-style line drawing shows none
     - the stowed snorkel along the rear deck only on the 2000s row (2008 and 2010 photographs); the
       2012 vehicles carry none, so the present-day row has none either
     - three roof troop hatches behind the turret (counted from the parade photograph)
     - turret: two round hatch lids, two round sight heads on posts (replacing the invented pillars),
       30 mm barrel to starboard (starboard front view), smoke tubes on both turret sides, whip aerial
       at the turret rear starboard corner (about 1.6 m above the turret roof; 3.34 m overall with it,
       2.26 m without)
     - no row carries ERA or skirts: no photograph shows them on a BMP-3 of any period
       here; paint is plain green (the 2008-2010 parade vehicles wear a three-tone scheme, not drawn)
   NOT CONFIRMED and therefore drawn plain or left off: which side of the turret carries the
   commander and gunner hatches (roughly placed), the exact sights, the snorkel and the
   unditching log (rows list a snorkel; no reference shows it), any add-on armour (the present row
   lists ERA and full skirts; no labelled photograph was fetched), any camouflage scheme.
   Published figures: 7.14 m long over the hull, 3.15 m wide, about 2.3 m high.
   Five materials (paint, dark, glass, wheel, team); team colour exactly C.team on two flat
   strips (0.25 x 1.0 m) on the rear roof.  Named nodes: "turret" (ring centre on the hull roof,
   guns along +X at rest) and six "roadwheel" groups (Y axle, both sides in one mesh).  Model
   space +X bow, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBMP3 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: 0x4d5a3b, snorkel: false, vent: false },   /* 1990s */
    B: { paint: 0x4a5838, snorkel: true, vent: true },   /* 2000s */
    C: { paint: 0x4e5b3d, snorkel: false, vent: true }    /* present day */
  };
  var XW = [-2.40, -1.50, -0.76, 0.10, 1.05, 1.88], ZW = 0.36, RW = 0.325;
  var TYC = 1.37;                  /* track centre line, each side */
  var ROOF = 1.74;                 /* roof of the hull */
  var SPR = [-3.07, 0.52, 0.31], IDL = [2.90, 0.46, 0.28];   /* x, z, radius */
  var ROLL = [-1.95, -0.30, 1.45];
  var TX = 0.10;                   /* turret ring centre */

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
    T.wheel = new THREE.MeshStandardMaterial({ color: 0x3a4232, roughness: 0.88, metalness: 0.12 });
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
    nl = Math.round(tot / 0.14); p = tot / nl;
    var ya = Math.min(side * (TYC - 0.18), side * (TYC + 0.18)), yb = Math.max(side * (TYC - 0.18), side * (TYC + 0.18));
    for (j = 0; j < nl; j++) {
      pos = (j + 0.5) * p; seg = 0;
      while (seg < n - 1 && pos > len[seg]) { pos -= len[seg]; seg++; }
      a = H[seg]; b = H[(seg + 1) % n]; t = pos / len[seg];
      cx = a[0] + (b[0] - a[0]) * t; cz = a[1] + (b[1] - a[1]) * t;
      if (cz > 0.64 && cx > -2.75 && cx < 2.65) continue;     /* the top run is hidden under the sponson */
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
    [-3.57, 0.50, 0.95, 1.08, 1.50, ROOF, 1.28],
    [-3.45, 0.40, 1.00, 1.06, 1.56, ROOF, 1.32],
    [1.50, 0.40, 1.00, 1.06, 1.56, ROOF, 1.32],
    [2.40, 0.42, 0.96, 1.06, 1.52, ROOF, 1.30],
    [3.00, 0.50, 0.85, 1.04, 1.30, 1.58, 1.10],
    [3.40, 0.60, 0.55, 1.00, 0.75, 1.50, 0.60],
    [3.57, 0.78, 0.30, 0.98, 0.35, 1.45, 0.30]
  ];
  function lerpST(x, ia, ib) {
    var i, a, b, t;
    for (i = 0; i + 1 < ST.length; i++) {
      a = ST[i]; b = ST[i + 1];
      if (x <= b[0]) { t = Math.max(0, (x - a[0]) / (b[0] - a[0])); return a[ia] + (b[ia] - a[ia]) * t; }
    }
    return ST[ST.length - 1][ia];
  }
  function roofZ(x) { return lerpST(x, 5); }
  function roofW(x) { return lerpST(x, 6); }
  /* half width of the hull flank at (x, z), from the stations */
  function flankY(x, z) {
    var zb = lerpST(x, 1), yb = lerpST(x, 2), zm = lerpST(x, 3), ym = lerpST(x, 4), zr = lerpST(x, 5), yr = lerpST(x, 6), f;
    if (z <= zm) { f = (z - zb) / (zm - zb); return yb + (ym - yb) * Math.max(0, Math.min(1, f)); }
    f = (z - zm) / (zr - zm);
    return ym + (yr - ym) * Math.max(0, Math.min(1, f));
  }
  function addHull(V, B) {
    var rings = [], i, s, side, x, k, z;
    for (i = 0; i < ST.length; i++) {
      s = ST[i];
      rings.push([[s[0], -s[2], s[1]], [s[0], s[2], s[1]], [s[0], s[4], s[3]],
                  [s[0], s[6], s[5]], [s[0], -s[6], s[5]], [s[0], -s[4], s[3]]]);
    }
    loftS(B.paint, rings);

    /* bow: folded trim vane on the glacis with hinge blocks, towing eyes */
    belt(B.paint, 2.70, roofZ(2.70) + 0.03, 3.40, roofZ(3.40) + 0.03, -0.50, 0.50, 0.035);
    box(B.dark, 2.62, 2.74, -0.40, -0.20, roofZ(2.7) + 0.00, roofZ(2.7) + 0.07);
    box(B.dark, 2.62, 2.74, 0.20, 0.40, roofZ(2.7) + 0.00, roofZ(2.7) + 0.07);
    for (k = 0; k < 3; k++) box(B.paint, 3.05 + k * 0.10, 3.08 + k * 0.10, -0.46, 0.46, roofZ(3.1 + k * 0.1) + 0.045, roofZ(3.1 + k * 0.1) + 0.07);
    for (side = -1; side <= 1; side += 2) cylX(B.dark, 3.50, 3.60, side * 0.14, 0.80, 0.05, 0.05, 8);
    /* driver's hatch centre, a hatch each side for the bow machine gunners, driver's periscopes */
    cylZ(B.paint, 2.52, 0.0, roofZ(2.52) - 0.05, roofZ(2.52) + 0.07, 0.21, 16);
    cylZ(B.dark, 2.52, 0.0, roofZ(2.52) + 0.07, roofZ(2.52) + 0.095, 0.17, 14);
    box(B.paint, 2.74, 2.90, -0.36, 0.36, roofZ(2.8) + 0.00, roofZ(2.8) + 0.10);
    for (k = -1; k <= 1; k++) box(B.glass, 2.90, 2.915, k * 0.20 - 0.07, k * 0.20 + 0.07, roofZ(2.8) + 0.03, roofZ(2.8) + 0.085);
    for (side = -1; side <= 1; side += 2) {
      cylZ(B.paint, 2.40, side * 0.78, roofZ(2.40) - 0.04, roofZ(2.40) + 0.06, 0.16, 14);
      cylZ(B.dark, 2.40, side * 0.78, roofZ(2.40) + 0.06, roofZ(2.40) + 0.082, 0.125, 12);
      /* bow machine-gun cheek: a ball mount on the front corner with the PKT barrel ahead */
      box(B.paint, 2.92, 3.20, side * 0.80 - 0.12, side * 0.80 + 0.12, 1.50, 1.64);
      box(B.dark, 3.20, 3.24, side * 0.80 - 0.05, side * 0.80 + 0.05, 1.54, 1.62);
      cylX(B.dark, 3.24, 3.60, side * 0.80, 1.58, 0.020, 0.018, 8);
      cylX(B.dark, 3.30, 3.42, side * 0.80, 1.58, 0.030, 0.030, 8);
      box(B.glass, 2.96, 2.99, side * 0.80 - 0.06, side * 0.80 + 0.06, 1.58, 1.62);
    }
    /* rear roof: plain deck; three round-cornered troop hatches behind the turret (a pair, and one further aft:
       counted from the parade photograph), lid plates with a dark seam */
    var HT = [[-1.45, -0.50], [-1.45, 0.50], [-2.55, 0.50]];
    for (k = 0; k < 3; k++) {
      box(B.paint, HT[k][0] - 0.34, HT[k][0] + 0.34, HT[k][1] - 0.26, HT[k][1] + 0.26, ROOF, ROOF + 0.035);
      box(B.dark, HT[k][0] - 0.30, HT[k][0] + 0.30, HT[k][1] - 0.22, HT[k][1] + 0.22, ROOF + 0.035, ROOF + 0.043);
      box(B.paint, HT[k][0] - 0.28, HT[k][0] + 0.28, HT[k][1] - 0.20, HT[k][1] + 0.20, ROOF + 0.043, ROOF + 0.052);
    }
    if (V.snorkel) {   /* stowed snorkel tube along the rear deck (2008-2010 photographs) */
      cylX(B.paint, -3.40, -1.00, 0.0, ROOF + 0.17, 0.15, 0.15, 14);
      cylX(B.dark, -2.40, -2.22, 0.0, ROOF + 0.17, 0.16, 0.16, 14);
      box(B.dark, -3.00, -2.94, -0.20, 0.20, ROOF, ROOF + 0.03);
      box(B.dark, -1.60, -1.54, -0.20, 0.20, ROOF, ROOF + 0.03);
    }
    box(B.team, -2.35, -1.35, -1.13, -0.88, ROOF + 0.02, ROOF + 0.032);
    box(B.team, -2.35, -1.35, 0.88, 1.13, ROOF + 0.02, ROOF + 0.032);
    if (V.vent) {   /* starboard hull-side louvred vent, rear half (2012 photographs; the 1990s drawing shows none) */
      var vy = flankY(-2.3, 1.45), vx;
      box(B.dark, -3.00, -1.70, -(vy + 0.004), -(vy - 0.03), 1.30, 1.60);
      for (k = 0; k < 4; k++) { vx = -2.96 + k * 0.325; box(B.paint, vx + 0.26, vx + 0.31, -(vy + 0.02), -(vy - 0.02), 1.30, 1.60); }
      box(B.paint, -3.02, -1.68, -(vy + 0.02), -(vy - 0.02), 1.595, 1.625);
      box(B.paint, -3.02, -1.68, -(vy + 0.02), -(vy - 0.02), 1.275, 1.305);
    }
    for (side = -1; side <= 1; side += 2) {
      /* mudguard sloping down to the bow */
      belt(B.paint, 2.00, 1.07, 3.06, 0.84, side > 0 ? 1.02 : -1.58, side > 0 ? 1.58 : -1.02, 0.04);
      /* the grid-ribbed band along the sponson side: recessed dark panel, then vertical ribs */
      var yo = flankY(0, 1.0) + 0.012, yi = flankY(0, 1.22) - 0.015;
      box(B.dark, -2.50, 2.05, side > 0 ? yi : -yo, side > 0 ? yo : -yi, 1.0, 1.22);
      for (k = 0; k < 37; k++) {
        x = -2.46 + k * 0.1235;
        box(B.paint, x, x + 0.035, side > 0 ? yi : -(yo + 0.016), side > 0 ? yo + 0.016 : -yi, 1.0, 1.22);
      }
      box(B.paint, -2.50, 2.05, side > 0 ? yi : -(yo + 0.016), side > 0 ? yo + 0.016 : -yi, 1.11, 1.125);
      /* upper side wall: two periscope / firing-port blocks and the step behind the bow section */
      for (k = 0; k < 2; k++) {
        x = [-1.18, -0.31][k]; z = 1.50; var fy = flankY(x, z);
        box(B.paint, x - 0.10, x + 0.10, side * fy - 0.012 * 1, side * fy + 0.012 * 1 + (side > 0 ? 0.012 : -0.012) , z - 0.05, z + 0.12);
        box(B.glass, x - 0.06, x + 0.06, side * (fy + 0.02) - 0.004, side * (fy + 0.02) + 0.004, z + 0.00, z + 0.09);
      }
      box(B.paint, 1.49, 1.53, side * (flankY(1.5, 1.45) - 0.01), side * (flankY(1.5, 1.45) + 0.02), 1.22, 1.70);
      /* tracks, return rollers, idler and rear sprocket */
      addTrack(B.dark, side);
      for (k = 0; k < 3; k++) cylY(B.dark, ROLL[k], side * (TYC - 0.07), side * (TYC + 0.07), 0.78, 0.07, 10);
      cylY(B.dark, IDL[0], side * (TYC - 0.12), side * (TYC + 0.12), IDL[1], IDL[2] - 0.02, 18);
      cylY(B.paint, IDL[0], side * (TYC + 0.11), side * (TYC + 0.145), IDL[1], 0.12, 12);
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
    /* stern plate: two rear troop doors (a wide one to starboard, a narrow one to port), hinges, handles, a step each side */
    box(B.dark, -3.60, -3.57, -0.90, 0.90, 0.62, 1.60);
    box(B.paint, -3.625, -3.60, -0.88, 0.14, 0.66, 1.58);
    box(B.paint, -3.625, -3.60, 0.20, 0.88, 0.66, 1.58);
    for (k = 0; k < 3; k++) { box(B.dark, -3.645, -3.625, -0.90, -0.84, 0.80 + k * 0.32, 0.90 + k * 0.32); box(B.dark, -3.645, -3.625, 0.84, 0.90, 0.80 + k * 0.32, 0.90 + k * 0.32); }
    box(B.dark, -3.645, -3.625, 0.06, 0.12, 1.00, 1.28);
    box(B.dark, -3.645, -3.625, 0.22, 0.28, 1.00, 1.28);
    box(B.dark, -3.64, -3.60, -0.80, -0.20, 0.60, 0.64);
    box(B.dark, -3.64, -3.60, 0.30, 0.80, 0.60, 0.64);
    for (side = -1; side <= 1; side += 2) cylX(B.dark, -3.62, -3.57, side * 1.10, 0.70, 0.05, 0.05, 8);
  }
  function addWheel(Bw, side) {
    var s = side, k, ya = s * (TYC - 0.13), yb = s * (TYC + 0.13), yf = s * (TYC + 0.145), yc = s * (TYC + 0.175);
    cylY(Bw, 0, ya, yb, 0, RW, 18);
    cylY(Bw, 0, s * (TYC + 0.10), yf, 0, 0.225, 18);
    cylY(Bw, 0, s * (TYC + 0.13), yc, 0, 0.07, 10);
    for (k = 0; k < 6; k++) rib(Bw, s > 0 ? yf - 0.002 : yf - 0.012, k / 6 * TAU, 0.075, 0.215, 0.04, 0.012, 0);
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
  function addTurret(V, B) {
    var N = 28, i, q, R = [
      [-0.04, 0.82, 0.74, 0.95, 0.00, 2.4],
      [0.05, 0.82, 0.74, 0.95, 0.00, 2.4],
      [0.28, 0.79, 0.72, 0.92, 0.00, 2.6],
      [0.44, 0.66, 0.67, 0.86, -0.03, 3.0],
      [0.52, 0.56, 0.63, 0.80, -0.05, 3.0]
    ], rings = [], zg = 0.28, gy = 0.10;
    for (i = 0; i < R.length; i++) rings.push(tring(R[i], N));
    loftS(B.paint, rings);
    /* gun mount block in the front slope */
    box(B.paint, 0.70, 1.00, -0.44, 0.44, 0.06, 0.44);
    box(B.dark, 0.98, 1.04, -0.38, 0.38, 0.10, 0.40);
    /* 100 mm 2A70: breech sleeve, tube, collar, muzzle */
    cylX(B.dark, 1.02, 1.40, gy, zg, 0.105, 0.088, 16);
    cylX(B.dark, 1.40, 3.50, gy, zg, 0.062, 0.050, 14);
    cylX(B.dark, 1.95, 2.10, gy, zg, 0.076, 0.076, 14);
    cylX(B.dark, 3.38, 3.52, gy, zg, 0.058, 0.058, 14);
    /* 30 mm 2A72 on its right (starboard), 7.62 mm PKT on its left */
    cylX(B.dark, 1.02, 1.30, -0.20, zg - 0.01, 0.060, 0.050, 12);
    cylX(B.dark, 1.30, 2.88, -0.20, zg - 0.01, 0.030, 0.027, 10);
    cylX(B.dark, 2.88, 3.00, -0.20, zg - 0.01, 0.040, 0.036, 10);
    cylX(B.dark, 1.02, 1.55, 0.29, zg - 0.03, 0.019, 0.017, 8);
    box(B.glass, 1.00, 1.03, -0.36, -0.26, zg + 0.08, zg + 0.16);       /* gunner's sight window beside the mount */
    /* two round sight heads on short posts along the roof centre (large aft, small ahead: Army-2012 photographs), the
       gunner's and commander's round hatch lids to port and starboard (parade photograph) */
    cylZ(B.paint, -0.30, -0.12, 0.44, 0.60, 0.05, 8);
    cylZ(B.paint, -0.30, -0.12, 0.60, 0.74, 0.12, 14);
    cylX(B.glass, -0.18, -0.15, -0.12, 0.67, 0.07, 0.07, 12);
    cylZ(B.paint, 0.32, 0.10, 0.44, 0.54, 0.04, 8);
    cylZ(B.paint, 0.32, 0.10, 0.54, 0.64, 0.075, 12);
    cylX(B.glass, 0.39, 0.41, 0.10, 0.59, 0.045, 0.045, 10);
    box(B.paint, 0.40, 0.58, -0.32, -0.04, 0.44, 0.54);
    cylZ(B.paint, -0.22, 0.52, 0.40, 0.50, 0.23, 16);
    cylZ(B.dark, -0.22, 0.52, 0.50, 0.525, 0.19, 14);
    cylZ(B.paint, -0.22, -0.52, 0.40, 0.50, 0.23, 16);
    cylZ(B.dark, -0.22, -0.52, 0.50, 0.525, 0.19, 14);
    /* 902V smoke grenade launchers: three tubes a side on the turret front shoulders */
    for (i = -1; i <= 1; i += 2) {
      box(B.dark, -0.10, 0.28, i * 0.88 - 0.03, i * 0.88 + 0.03, 0.30, 0.38);
      for (q = 0; q < 3; q++) {
        cyl(B.dark, [-0.04 + q * 0.12, i * 0.86, 0.36], [0.02 + q * 0.12, i * 0.93, 0.58], 0.034, 0.034, 8);
        cyl(B.paint, [0.02 + q * 0.12, i * 0.93, 0.58], [0.024 + q * 0.12, i * 0.935, 0.60], 0.032, 0.022, 8);
      }
    }
    /* rear: vent housing, stowage rail, whip aerial on the left */
    box(B.paint, -0.62, -0.40, -0.12, 0.12, 0.40, 0.48);
    box(B.dark, -0.78, -0.72, -0.60, 0.60, 0.20, 0.25);
    cylZ(B.dark, -0.50, -0.62, 0.44, 0.52, 0.04, 8);
    cylZ(B.dark, -0.50, -0.62, 0.52, 1.60, 0.009, 6);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.B, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB;
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
    addTurret(V, TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, ROOF);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e90_ifv"] = {
  len: 7.14,
  build: function (THREE, M, C) { return HeroBMP3.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e00_ifv"] = {
  len: 7.14,
  build: function (THREE, M, C) { return HeroBMP3.build(THREE, M, C, "B"); }
};
UNIT_MODELS["ifv_p"] = {
  len: 7.14,
  build: function (THREE, M, C) { return HeroBMP3.build(THREE, M, C, "C"); }
};
