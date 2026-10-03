/* ============ ru_khrizantema.js - HERO model: the 9P157-2 Khrizantema-S ATGM tank destroyer ============
   One row, one vehicle:
     atgmv_p   9P157-2 Khrizantema-S (js/armour_specs.js; js/facts.js: 2 ready 9M123 missiles, radar and laser
               beam guidance, BMP-3 chassis, crew 2)   present day, plain Russian green
   References (Wikimedia Commons, generic agent string; photographs 1-3 the Engineering Technologies 2012 exhibit,
   4-5 Oboronexpo 2014 by Vitaly Kuzmin, 6 the 2018 parade; cached under the working directory):
     1 "9P157-2 combat vehicle of 9K123 Khrizantema-S AT system at Engineering Technologies 2012.jpg"  starboard rear
       quarter, launcher raised: louvred vent on the rear starboard wall, shield plates, round gold dish, two tubes
     2 "... 2012 Front.jpg"  front: two side-by-side containers on ONE mast near the centre line, the cylindrical glazed
       housing to starboard with a shield plate each side, the dish and its box to PORT, the folded trim vane, one
       tall whip behind the mast, a periscope cylinder on the front deck to port
     3 "Khrizantema 1.jpg"  front-starboard, raised: tubes about 33 deg up, the mast head about 0.75 m over the roof
     4 "Oboronexpo2014part3-34.jpg"  port side, plain dark green, raised: the sponson shelf and the plain upper wall
       with bolted plates, the dish ahead of the mast facing forward (edge-on), tubes about 17 deg up, trunnion 0.74 m
       over the roof, containers about 2.1-2.3 m
     5 "Oboronexpo2014part3-33.jpg" and "-35.jpg"  front-port and rear-port: the dish on a box on a pedestal, the round
       elevation drum on the head, the sight pod on the head, the flat deck, the stern doors, the lamps at the top
       corners of the front plate
     6 "Military parade 2018 36.jpg"  three-tone vehicle, tubes about 35 deg up
   MEASURED from 4 and 5 (hull length 7.1 m = 1140 px, about 160 px/m): upper hull roof about 1.9 m over the ground;
   the mast axis lies 0.44 of the length from the bow (x about +0.4); the dish about 0.6 m across, gold (photographs
   1-5 all show it brass-coloured), 0.55-0.6 m over the roof.  Elevation: photographs show 12 to 35 deg; the raised
   pose here is the middle, 28.6 deg (EL 0.50 rad).
   What each feature rests on:
     - running gear, rear stern doors: the committed js/hero/ru_bmp3.js (same chassis); NOT carried over: the turret,
       bow machine-gun cheeks, roof hatches, snorkel, the grid-ribbed sponson band and the periscope blocks (photographs
       4 and 5 show a smooth rolled sponson and a plain wall); the roof is a flat plated deck
     - hull body: sponson shelf (1.58 m half width) with a rolled rib, a vertical upper wall (1.2 m half width) from
       1.45 to 1.90 m, a glacis sloping about 36 deg from the roof edge to the bow (photographs 3, 4, 5)
     - starboard louvred vent, rear half of the wall: photographs 1 and 3 (not seen on the port side, photograph 4)
     - round plug on the port wall: photographs 4 and 5
     - launcher: two tubes (0.21 m, 2.2 m long, 0.25 m apart) on a single mast with gimbal head, a round elevation drum
       each side and a sight pod to starboard: photographs 2-6
   Stowed (rest): the whole launcher lies level and wholly under the closed roof (the real launcher folds into the
   hull; no photograph of the stowed deck was found, so only a flat hatch outline marks it).  At rest the pod lies
   within 1.2 m of the mast axis so that the training turret never pushes it through the wall, and its highest point
   is 1.58 m (roof 1.90).  render3d poseLauncher only rotates "podelev" about its local Y by -el; the hinge is VIRTUAL
   (2.6 m behind and 3.03 m above the mast, solved so that the one rotation of 0.50 rad carries the rest-pose gimbal
   (x -0.1, z 1.45) onto (x 0.4, z 2.65), the mast then vertical and the tubes 28.6 deg up; the mast leans back at rest).
   Left as drawn plain: the colour.  The 2012 exhibit and 2018 parade vehicles are three-tone, the 2014 photographs show
   plain dark green; the plain green is drawn.  NOT CONFIRMED and so left off: the unditching log (photographs 1, 3 and
   4/5 put it in different places), the second small aerial, ladder, any marking, the reload missiles stowage.
   Published figures: 7.1 m long (armour_specs.js; 7.3 m with the stern doors and tow eyes), 3.2 m wide (ok), hull height
   2.5 m with housing (roof 1.90 + housing 0.5 = 2.4).
   Six materials (paint, dark, glass, wheel, team, dish); team colour exactly C.team on two flat strips
   (0.25 x 1.0 m) on the rear deck.  Named nodes: "turret" (pivot on the mast axis on the roof, rest pointing
   forward +X) carrying the group "podelev" (userData.el and userData.cells = the two container mouths) and six
   "roadwheel" groups (Y axle).  Model space +X bow, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKhrizantema = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var PAINT = 0x4a5439;
  var XW = [-2.40, -1.50, -0.76, 0.10, 1.05, 1.88], ZW = 0.36, RW = 0.325;
  var TYC = 1.37;                  /* track centre line, each side */
  var ROOF = 1.90;                 /* roof of the hull (photograph: about 3 road-wheel diameters over the ground) */
  var WW = 1.20;                   /* half width of the upper hull wall, above the sponson shelf */
  var SPR = [-3.07, 0.52, 0.31], IDL = [2.90, 0.46, 0.28];   /* x, z, radius */
  var ROLL = [-1.95, -0.30, 1.45];
  var XH = 0.40;                   /* the launcher mast axis, hull x (side photographs: 0.44 of the length from the bow) */
  var EL = 0.50;                   /* the raise angle, rad: tubes 28.6 deg nose-up (the photographs show 12 to 35 deg) */
  var HEAD_UP = 0.75;              /* the gimbal axis stands this far over the roof when raised (two photographs) */
  var PX = XH - 0.50, PZ = 1.45;   /* the gimbal axis at REST: under the closed roof, the tubes level and inside the hull */
  var HX = -2.1998, HZ = 3.0291;   /* the virtual hinge: the single rotation by EL about it carries (PX, PZ) onto (XH, ROOF + HEAD_UP) */
  var TA = -0.60, TB = 1.60, TR = 0.105, TS = 0.125;   /* container ends behind and ahead of the gimbal axis, radius, half spacing */

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


  function materials(THREE, C) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: PAINT, roughness: 0.9, metalness: 0.05 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0x3a4232, roughness: 0.88, metalness: 0.12 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.dish = new THREE.MeshStandardMaterial({ color: 0x9c8648, roughness: 0.6, metalness: 0.3 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team), dish: new Bin(T.dish) };
  }

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
  /* a loft of equal rings, flat caps from the centroid, FLAT shading (hard edges) */
  function loftF(bin, rings) {
    var n = rings[0].length, V = [], F = [], r, k, a, b, c0, c1, i, f, vol = 0, ns, cA = [0, 0, 0], cB = [0, 0, 0], sg;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (k = 0; k < n; k++) for (i = 0; i < 3; i++) { cA[i] += V[k][i] / n; cB[i] += V[ns - n + k][i] / n; }
    for (k = 0; k < n; k++) {
      vol += dot(cA, cross(V[(k + 1) % n], V[k]));
      vol += dot(cB, cross(V[ns - n + k], V[ns - n + (k + 1) % n]));
    }
    sg = vol < 0 ? -1 : 1;
    for (i = 0; i < F.length; i++) { f = F[i]; if (sg > 0) bin.tri(V[f[0]], V[f[1]], V[f[2]]); else bin.tri(V[f[0]], V[f[2]], V[f[1]]); }
    for (k = 0; k < n; k++) {
      a = V[k]; b = V[(k + 1) % n]; c0 = V[ns - n + k]; c1 = V[ns - n + (k + 1) % n];
      if (sg > 0) { bin.tri(cA, b, a); bin.tri(cB, c0, c1); } else { bin.tri(cA, a, b); bin.tri(cB, c1, c0); }
    }
  }
  /* station: x, bottom z, bottom half width, sponson outer half width, sponson underside z, sponson outer top z,
     inner top z of the sponson shelf, wall half width, roof z */
  var ST = [
    [-3.57, 0.50, 0.95, 1.25, 1.06, 1.28, 1.42, WW, ROOF],
    [-3.30, 0.42, 1.00, 1.25, 1.06, 1.28, 1.42, WW, ROOF],
    [-3.12, 0.40, 1.00, 1.58, 1.06, 1.28, 1.44, WW, ROOF],
    [2.30, 0.40, 1.00, 1.58, 1.06, 1.28, 1.44, WW, ROOF],
    [2.62, 0.42, 0.98, 1.54, 1.05, 1.26, 1.42, WW, ROOF],
    [3.25, 0.58, 0.92, 1.44, 1.02, 1.18, 1.30, 1.18, 1.52],
    [3.56, 0.76, 0.90, 1.38, 1.00, 1.10, 1.14, 1.16, 1.22]
  ];
  function lerpST(x, ia) {
    var i, a, b, t;
    for (i = 0; i + 1 < ST.length; i++) {
      a = ST[i]; b = ST[i + 1];
      if (x <= b[0]) { t = Math.max(0, Math.min(1, (x - a[0]) / (b[0] - a[0]))); return a[ia] + (b[ia] - a[ia]) * t; }
    }
    return ST[ST.length - 1][ia];
  }
  function roofZ(x) { return lerpST(x, 8); }
  /*HULL*/
  function addHull(V, B) {
    var rings = [], i, s, side, x, k, z, ww;
    for (i = 0; i < ST.length; i++) {
      s = ST[i]; ww = s[7];
      rings.push([[s[0], -s[2], s[1]], [s[0], s[2], s[1]], [s[0], s[3], s[4]], [s[0], s[3], s[5]], [s[0], ww + 0.04, s[6]],
                  [s[0], ww, s[8]], [s[0], -ww, s[8]], [s[0], -ww - 0.04, s[6]], [s[0], -s[3], s[5]], [s[0], -s[3], s[4]]]);
    }
    loftF(B.paint, rings);

    /* bow: the trim vane folded flat on the glacis with its two hinge blocks (photographs 2 and 3), towing eyes, lamps */
    belt(B.paint, 2.74, roofZ(2.74) + 0.03, 3.46, roofZ(3.46) + 0.03, -0.55, 0.55, 0.035);
    box(B.dark, 2.64, 2.74, -0.42, -0.22, ROOF, ROOF + 0.07);
    box(B.dark, 2.64, 2.74, 0.22, 0.42, ROOF, ROOF + 0.07);
    for (side = -1; side <= 1; side += 2) {
      cylX(B.dark, 3.56, 3.67, side * 0.14, 0.98, 0.05, 0.05, 8);
      cylX(B.dark, 3.50, 3.62, side * 1.00, 1.06, 0.065, 0.065, 10);
      cylX(B.glass, 3.62, 3.635, side * 1.00, 1.06, 0.048, 0.048, 10);
    }
    addDeck(V, B);
    box(B.team, -2.35, -1.35, -1.13, -0.88, ROOF + 0.02, ROOF + 0.032);
    box(B.team, -2.35, -1.35, 0.88, 1.13, ROOF + 0.02, ROOF + 0.032);
    /* starboard wall: the louvred vent, rear half (photographs 1 and 3) */
    box(B.dark, -2.60, -0.60, -(WW + 0.012), -(WW - 0.03), 1.56, 1.80);
    for (k = 0; k < 7; k++) { x = -2.55 + k * 0.30; box(B.paint, x, x + 0.04, -(WW + 0.02), -(WW - 0.02), 1.56, 1.80); }
    box(B.paint, -2.62, -0.58, -(WW + 0.02), -(WW - 0.02), 1.795, 1.825);
    box(B.paint, -2.62, -0.58, -(WW + 0.02), -(WW - 0.02), 1.535, 1.565);
    for (side = -1; side <= 1; side += 2) {
      /* the sponson: a rolled rib along its top edge, the sloping mudguard end at the bow */
      box(B.paint, -3.00, 2.55, side > 0 ? 1.46 : -1.60, side > 0 ? 1.60 : -1.46, 1.255, 1.30);
      belt(B.paint, 2.55, 1.30, 3.15, 1.12, side > 0 ? 1.10 : -1.46, side > 0 ? 1.46 : -1.10, 0.04);
      /* the upper wall: bolted armour plates, the seams between them (photographs 1 and 6) */
      for (k = 0; k < 5; k++) { x = [1.62, 0.70, -0.36, -1.40, -2.50][k]; box(B.dark, x, x + 0.025, side > 0 ? WW - 0.005 : -(WW + 0.02), side > 0 ? WW + 0.02 : -(WW - 0.005), 1.46, ROOF - 0.04); }
      box(B.paint, -3.00, 2.40, side > 0 ? WW - 0.005 : -(WW + 0.018), side > 0 ? WW + 0.018 : -(WW - 0.005), ROOF - 0.07, ROOF - 0.04);
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
    /* port wall: the round plug (photographs 6 and 9) */
    cylY(B.dark, -0.43, WW + 0.0, WW + 0.03, 1.66, 0.10, 14);
    /* stern plate: two rear doors, hinges, handles, a step each side (the BMP-3 rear, kept) */
    box(B.dark, -3.60, -3.57, -0.95, 0.95, 0.62, 1.72);
    box(B.paint, -3.625, -3.60, -0.93, 0.14, 0.66, 1.70);
    box(B.paint, -3.625, -3.60, 0.20, 0.93, 0.66, 1.70);
    for (k = 0; k < 3; k++) { box(B.dark, -3.645, -3.625, -0.95, -0.89, 0.85 + k * 0.34, 0.95 + k * 0.34); box(B.dark, -3.645, -3.625, 0.89, 0.95, 0.85 + k * 0.34, 0.95 + k * 0.34); }
    box(B.dark, -3.645, -3.625, 0.06, 0.12, 1.05, 1.35);
    box(B.dark, -3.645, -3.625, 0.22, 0.28, 1.05, 1.35);
    box(B.dark, -3.64, -3.60, -0.80, -0.20, 0.60, 0.64);
    box(B.dark, -3.64, -3.60, 0.30, 0.80, 0.60, 0.64);
  }
  function addWheel(Bw, side) {
    var s = side, k, ya = s * (TYC - 0.13), yb = s * (TYC + 0.13), yf = s * (TYC + 0.145), yc = s * (TYC + 0.175);
    cylY(Bw, 0, ya, yb, 0, RW, 18);
    cylY(Bw, 0, s * (TYC + 0.10), yf, 0, 0.225, 18);
    cylY(Bw, 0, s * (TYC + 0.13), yc, 0, 0.07, 10);
    for (k = 0; k < 6; k++) rib(Bw, s > 0 ? yf - 0.002 : yf - 0.012, k / 6 * TAU, 0.075, 0.215, 0.04, 0.012, 0);
  }


  /* ---------------------------------------------------------- roof deck */
  function addDeck(V, B) {
    var i, X0 = 1.50, YC = -0.77, RC = 0.26, hz = 0.46;
    /* plate seams across the flat deck (photographs 2, 3 and 8 show a plated, seamed roof) */
    for (i = 0; i < 6; i++) box(B.dark, -3.30 + i * 0.52 + (i > 3 ? 0.4 : 0), -3.28 + i * 0.52 + (i > 3 ? 0.4 : 0), -WW + 0.02, WW - 0.02, ROOF, ROOF + 0.008);
    box(B.dark, -3.30, 2.50, -WW + 0.02, -WW + 0.04, ROOF, ROOF + 0.008);
    box(B.dark, -3.30, 2.50, WW - 0.04, WW - 0.02, ROOF, ROOF + 0.008);
    /* the launcher hatch: a flat plate outlined in dark, collar ring round the mast */
    box(B.dark, XH - 0.46, XH + 0.46, -0.30, 0.30, ROOF, ROOF + 0.010);
    box(B.paint, XH - 0.43, XH + 0.43, -0.27, 0.27, ROOF + 0.010, ROOF + 0.022);
    cylZ(B.dark, XH, 0.0, ROOF + 0.02, ROOF + 0.06, 0.20, 20);
    cylZ(B.paint, XH, 0.0, ROOF + 0.06, ROOF + 0.09, 0.16, 20);
    /* the glazed cylindrical housing on the starboard roof, window to the front (photographs 2, 3, 7, 8) */
    cylZ(B.paint, X0, YC, ROOF, ROOF + hz, RC, 24);
    cylZ(B.dark, X0, YC, ROOF + hz - 0.02, ROOF + hz + 0.025, RC + 0.025, 24);
    cylZ(B.paint, X0, YC, ROOF + hz + 0.025, ROOF + hz + 0.06, RC - 0.02, 24);
    box(B.glass, X0 + RC - 0.015, X0 + RC + 0.01, YC - 0.13, YC + 0.13, ROOF + 0.17, ROOF + 0.35);
    box(B.dark, X0 + RC - 0.02, X0 + RC + 0.005, YC - 0.15, YC + 0.15, ROOF + 0.15, ROOF + 0.17);
    box(B.dark, X0 + RC - 0.02, X0 + RC + 0.005, YC - 0.15, YC + 0.15, ROOF + 0.35, ROOF + 0.37);
    /* a flat shield plate each side of the housing (the 2012 and 2018 vehicles; photographs 2 and 3) */
    box(B.paint, X0 + 0.05, X0 + 0.09, YC - 0.62, YC - 0.30, ROOF + 0.02, ROOF + 0.50);
    box(B.paint, X0 + 0.05, X0 + 0.09, YC + 0.30, YC + 0.52, ROOF + 0.02, ROOF + 0.50);
    /* the radar to port, ahead of the mast: a pedestal, a box, and a gold round dish facing forward, tipped back 15 deg */
    var DX0 = 1.10, DY0 = 0.45, ax = [Math.cos(0.26), 0, Math.sin(0.26)], c = [DX0 + 0.28, DY0 + 0.10, ROOF + 0.62];
    cylZ(B.paint, DX0, DY0, ROOF, ROOF + 0.25, 0.16, 18);
    box(B.paint, DX0 - 0.18, DX0 + 0.18, DY0 - 0.18, DY0 + 0.18, ROOF + 0.25, ROOF + 0.78);
    cyl(B.dark, [DX0 + 0.10, DY0 + 0.06, c[2]], [c[0] - 0.02, c[1], c[2]], 0.05, 0.05, 10);
    cyl(B.dish, [c[0] - ax[0] * 0.03, c[1], c[2] - ax[2] * 0.03], [c[0] + ax[0] * 0.03, c[1], c[2] + ax[2] * 0.03], 0.30, 0.30, 26);
    cyl(B.dish, [c[0] + ax[0] * 0.03, c[1], c[2] + ax[2] * 0.03], [c[0] + ax[0] * 0.07, c[1], c[2] + ax[2] * 0.07], 0.30, 0.10, 26);
    /* a periscope cylinder on the front deck to port (photographs 2 and 8) */
    cylZ(B.paint, 2.00, 0.45, ROOF, ROOF + 0.20, 0.09, 12);
    cylZ(B.dark, 2.00, 0.45, ROOF + 0.20, ROOF + 0.23, 0.11, 12);
    /* the whip aerial behind the mast (photographs 2, 6, 8) */
    cylZ(B.dark, XH - 0.55, 0.30, ROOF, ROOF + 0.20, 0.035, 8);
    cylZ(B.dark, XH - 0.55, 0.30, ROOF + 0.20, ROOF + 1.80, 0.007, 4);
  }

  /* ------------------------------------------------------------ launcher */
  /* The group "podelev" has its origin at the virtual hinge (HX, 0, HZ) in hull coordinates.  Everything is drawn at REST
     in hull coordinates (tubes level, gimbal axis at (PX, PZ) under the closed roof) and then shifted to the hinge. */
  function launcher(B) {
    var k, se = Math.sin(EL), ce = Math.cos(EL), s, i, b, key;
    function along(t) { return [PX - se * t, 0, PZ - ce * t]; }
    for (s = -1; s <= 1; s += 2) {
      var y = s * TS, x0 = PX + TA, x1 = PX + TB;
      /* the container: tube, rear bulge, muzzle collar, front lid, clamps */
      cylX(B.paint, x0, x1, y, PZ, TR, TR, 16);
      cylX(B.paint, x0, x0 + 0.30, y, PZ, TR + 0.012, TR + 0.012, 16);
      cylX(B.dark, x0 - 0.06, x0, y, PZ, TR - 0.01, TR - 0.01, 12);
      cylX(B.paint, x1 - 0.18, x1, y, PZ, TR + 0.015, TR + 0.015, 16);
      cylX(B.dark, x1, x1 + 0.025, y, PZ, TR + 0.02, TR + 0.02, 16);
      for (k = 0; k < 3; k++) cylX(B.dark, x0 + 0.55 + k * 0.50, x0 + 0.59 + k * 0.50, y, PZ, TR + 0.012, TR + 0.012, 12);
    }
    /* the cradle under and between the tubes: end frames, the rail */
    box(B.dark, PX - 0.20, PX + 0.28, -TS - 0.02, TS + 0.02, PZ - TR - 0.05, PZ - TR + 0.01);
    box(B.dark, PX + 0.95, PX + 1.20, -TS - 0.02, TS + 0.02, PZ - TR - 0.05, PZ - TR + 0.01);
    box(B.paint, PX - 0.15, PX + 1.25, -0.04, 0.04, PZ - TR - 0.04, PZ - TR + 0.02);
    /* the gimbal head under the tubes: housing, a round elevation drum each side, the sight pod ahead to starboard */
    box(B.paint, PX - 0.14, PX + 0.14, -0.20, 0.20, PZ - 0.34, PZ - TR - 0.04);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, PX, s * 0.20, s * 0.27, PZ - 0.22, 0.15, 14);
      cylY(B.paint, PX, s * 0.27, s * 0.30, PZ - 0.22, 0.08, 12);
    }
    box(B.paint, PX + 0.12, PX + 0.46, -0.30, -0.06, PZ - 0.36, PZ - 0.14);
    box(B.glass, PX + 0.46, PX + 0.475, -0.27, -0.09, PZ - 0.33, PZ - 0.18);
    cylX(B.dark, PX + 0.12, PX + 0.40, 0.12, PZ - 0.22, 0.05, 0.05, 12);
    cylX(B.glass, PX + 0.40, PX + 0.415, 0.12, PZ - 0.22, 0.04, 0.04, 12);
    /* the mast: tilted at rest so that it stands upright when raised; a collar and a servo box on it */
    cyl(B.paint, along(0.30), along(1.15), 0.075, 0.075, 16);
    cyl(B.dark, along(0.45), along(0.57), 0.105, 0.105, 12);
    cyl(B.dark, along(0.85), along(0.93), 0.095, 0.095, 16);
    /* shift into the hinge frame */
    for (key in B) { b = B[key]; for (i = 0; i < b.P.length; i += 3) { b.P[i] -= HX; b.P[i + 2] -= HZ; } }
    return [[PX + TB + 0.025 - HX, TS, PZ - HZ, PX + TA - 0.06 - HX], [PX + TB + 0.025 - HX, -TS, PZ - HZ, PX + TA - 0.06 - HX]];
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), i, wg, WB, tur, E, cells;
    addHull({}, HB);
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
    cells = launcher(EB);
    tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(XH, 0, ROOF);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX - XH, 0, HZ - ROOF);
    flush(THREE, E, EB);
    E.userData.cells = cells;
    E.userData.el = EL;
    tur.add(E);
    g.add(tur);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["atgmv_p"] = {
  len: 7.14,
  build: function (THREE, M, C) { return HeroKhrizantema.build(THREE, M, C); }
};
