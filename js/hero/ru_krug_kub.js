/* ============ ru_krug_kub.js - HERO models: 2K11 Krug (2P24) and 2K12 Kub (2P25), tracked SAM launchers ============
   Two rows:  pact_e60_sam  "2K11 Krug, 2P24 launcher" (1965, GM-123 chassis, two 3M8 ramjet rounds)
              pact_e60_kub  "2K12 Kub (SA-6 Gainful), 2P25 launcher and 1S91 radar" (1967, GM-578 chassis, three 3M9)
   Soviet green of the 1960s, no markings, no camouflage pattern.

   What each feature rests on (Wikimedia Commons photographs fetched for this model):
     r0  "2K11 Krug TEL.jpg" (Sofia museum, left-front three-quarter): two large rounds side by side on the
         launcher, ramjet body with the long intake cone and a ring lip behind it, mid-body wings, tail fins,
         low tracked hull with a sloped nose, seven road wheels a side.
     r1  "ZRK Krug 2016 G1.jpg" (Russian museum, starboard side): the rounds lie nose-forward over the hull with
         the nose overhanging the bow by about a metre; two thin strap-on booster tubes at the diagonals beside
         each round (four a round on the 3M8), tubular A-frame cradles under each round, seven road wheels,
         sprocket at the FRONT, plain wheel at the rear, side stowage boxes along the hull.
     r2  "2K12 Kub pic1.JPG" (Czech museum, from the rear starboard, launcher empty and raised): the long
         flat-topped hull with a sloped bow, hull-wide side boxes over the tracks, six road wheels, the
         turntable at mid-hull, three rail stations with upright lugs and a tubular guard frame.
     r3  "Polish 2K12 Kub pic1.JPG" (Polish museum, front three-quarter, launcher raised): sloped glacis with a
         flared mudguard each side, disc road wheels, the elevating frame with its tubular rails.
     r4  "ZiL-157V with a 9T22 transporter vehicle of 2K12 Kub ... pic3.jpg": the 3M9 round itself - dark ogive
         nose, olive body, narrower aft section, four small mid wings, four tail fins, intake ducts along the waist.
   Published figures used: Krug 2P24 length about 9.5 m, width 3.2 m, travel height 3.3 m (armour_specs row;
   this model is 9.46 x 3.74 x 4.38 m (published: 9.46 m long with missiles, 4.47 m high with missiles, en.wikipedia 2K11 Krug) because the wings and rounds are drawn at full span and the rounds ride
   a little above the stated height); 3M8 about 8.8 m long, 0.86 m body; 3M9 5.8 m long, 0.33 m body.
   Kub hull about 7.0 m long and 3.15 m over the tracks.
   NOT confirmed and not drawn: the 1S91 Straight Flush radar (a SEPARATE tracked vehicle; the row's unit is the
   2P25 launcher, so no radar is drawn on it); any antenna, lamp or stowage item not visible in r0-r4; markings.
   NOT confirmed in numbers: hull length and track width of the two chassis (taken from the photographs and
   from sam3d.js/armour_specs), the exact position of the hinge and the launch elevation.
   CHECK-AND-FIX: Kub drive sprocket is at the REAR (Czech museum photograph, toothed wheel beside the rear plate), Krug at the FRONT;
   the Kub guard frames are the two tubular loops at the ends of the elevating frame (both museum photographs); hinge heights raised
   (Krug 3.00, Kub 2.60) so the raised tail clears the deck; Kub rail spacing 0.90 m and mid-wing span 1.245 m (3M9, en.wikipedia).
   The missile colour is a plain light grey (Krug) and olive (Kub); museum red nose tips are not drawn.

   Launcher: node "turret" (the whole launcher on its turntable, trained by render3d on the turret:true rows),
   with the child group "podelev" (beam + rounds, hinged at the trunnion; render3d poseLauncher raises it to
   userData.el - Krug 0.785 rad (45 deg, the launch elevation en.wikipedia 2K11 gives), Kub 0.61 rad (a choice, not published) - while the unit holds a target).
   Stowed (level, nose forward) is the real travel pose, so no separate travel pose group is needed.
   userData.cells puts the motor flash at the tail of each round.  The rounds stay drawn after launch.
   Nodes: seven (Krug) or six (Kub) "roadwheel" groups (axle on local Y), "turret", "podelev".
   Materials: paint (patchy single-coat green canvas), dark, msl, plain C.team (up-facing strips on the deck and
   on the launcher slab).  Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.
   The old sam3d.js builders for these two keys stay untouched; this file registers over them by load order
   (index.html loads it after sam3d.js; cmp.html loads sam3d.js after the hero files, as for every hero file).  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKrugKub = (function () {
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
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box turned about Z: centre (cx, cy), half sizes hx (along ang), hy */
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
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
  /* a convex outline in plan, thickened between z0 and z1 */
  function prism(bin, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
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

  /* a toothed wheel standing on the Y axis: nt teeth between radii rr and rt */
  function gear(bin, cx, y0, y1, cz, rr, rt, nt) {
    var n = nt * 4, V = [], F = [], i, t, step = TAU / nt, a, r, kk, ph = [0.05, 0.30, 0.55, 0.80], rd = [rr, rt, rt, rr];
    for (i = 0; i < n; i++) {
      t = (i / 4) | 0; kk = i % 4; a = (t + ph[kk]) * step; r = rd[kk];
      V.push([cx + r * Math.cos(a), y0, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < n; i++) V.push([V[i][0], y1, V[i][2]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (i = 0; i < n; i++) {
      t = (i + 1) % n;
      F.push([i, n + i, t], [t, n + i, n + t], [2 * n, i, t], [2 * n + 1, n + t, n + i]);
    }
    solid(bin, V, F);
  }

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
      /* a single flat coat gone patchy with weather: low-contrast drift, no pattern */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 12; i++) {
          x = R() * 256; y = R() * 256; rr = 18 + R() * 40;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.07)" : "rgba(240,236,215,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 30, 2 + R() * 18);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function flush(THREE, group, B, dx, dz) {
    var k, b, geo, P, i;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      P = b.P.slice();
      if (dx || dz) for (i = 0; i < P.length; i += 3) { P[i] -= (dx || 0); P[i + 2] -= (dz || 0); }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  function pickTangent(C, r, P, arrive) {
    var vx = P[0] - C.x, vz = P[1] - C.z, d = Math.sqrt(vx * vx + vz * vz), phi = Math.atan2(vz, vx), al = Math.acos(r / d);
    var cand = [phi + al, phi - al], i, th, tx, tz, dx, dz;
    for (i = 0; i < 2; i++) {
      th = cand[i]; tx = -Math.sin(th); tz = Math.cos(th);
      dx = arrive ? (C.x + r * Math.cos(th) - P[0]) : (P[0] - (C.x + r * Math.cos(th)));
      dz = arrive ? (C.z + r * Math.sin(th) - P[1]) : (P[1] - (C.z + r * Math.sin(th)));
      if (dx * tx + dz * tz > 0) return th;
    }
    return cand[0];
  }
  function beltGeometry() {
    var zb = 0.055, ri = IDL.r + 0.045, rs = SPR.r + 0.045;
    var Pf = [XW[NW - 1], zb], Pr = [XW[0], zb];
    var t1 = pickTangent(IDL, ri, Pf, true), t2 = pickTangent(SPR, rs, Pr, false);
    var Lx = SPR.x - IDL.x, Lz = SPR.z - IDL.z, L = Math.sqrt(Lx * Lx + Lz * Lz), phi = Math.atan2(Lz, Lx);
    var al = Math.acos((ri - rs) / L), psi = Math.sin(phi + al) > Math.sin(phi - al) ? phi + al : phi - al;
    while (psi < t1) psi += TAU;
    while (t2 < psi) t2 += TAU;
    var p = [], i, n, a, f, T1, T2, Q1, Q2;
    function line(A, B) {
      var l = Math.sqrt((B[0] - A[0]) * (B[0] - A[0]) + (B[1] - A[1]) * (B[1] - A[1])), k, nn = Math.max(1, Math.ceil(l / 0.38));
      for (k = 1; k <= nn; k++) p.push([A[0] + (B[0] - A[0]) * k / nn, A[1] + (B[1] - A[1]) * k / nn]);
    }
    function arc(C, r, a0, a1) {
      var k, nn = Math.max(2, Math.ceil(r * (a1 - a0) / 0.27)), ang;
      for (k = 1; k <= nn; k++) { ang = a0 + (a1 - a0) * k / nn; p.push([C.x + r * Math.cos(ang), C.z + r * Math.sin(ang)]); }
    }
    p.push([Pr[0], Pr[1]]);
    line(Pr, Pf);
    T1 = [IDL.x + ri * Math.cos(t1), IDL.z + ri * Math.sin(t1)];
    line(Pf, T1);
    arc(IDL, ri, t1, psi);
    Q1 = [IDL.x + ri * Math.cos(psi), IDL.z + ri * Math.sin(psi)];
    Q2 = [SPR.x + rs * Math.cos(psi), SPR.z + rs * Math.sin(psi)];
    line(Q1, Q2);
    arc(SPR, rs, psi, t2);
    T2 = [SPR.x + rs * Math.cos(t2), SPR.z + rs * Math.sin(t2)];
    line(T2, Pr);
    p.pop();                                        /* the closing point repeats the first */
    return { path: p, top: [Q1, Q2], nrm: [Math.cos(psi), Math.sin(psi)] };
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.04, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;                    /* outward normal of a counter-clockwise loop */
      to = (i % 2) ? 0.022 : 0.060;
      V.push([b[0] + nx * to, y1, b[1] + nz * to], [b[0] + nx * to, y0, b[1] + nz * to],
             [b[0] - nx * ti, y0, b[1] - nz * ti], [b[0] - nx * ti, y1, b[1] - nz * ti]);
    }
    for (i = 0; i < n; i++) {
      A = i * 4; B = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        a0 = A + k; a1 = A + (k + 1) % 4; b0 = B + k; b1 = B + (k + 1) % 4;
        F.push([a0, b0, a1], [a1, b0, b1]);
      }
    }
    solid(bin, V, F);
  }


  /* a convex side profile [x, z] extruded across y0..y1 */
  function profY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* a body of revolution about the line through (x, y, z) along X: profile [[x, r]...] */
  function revolve(bin, prof, y, z, seg) {
    var V = [], F = [], i, j, k, a, m = prof.length;
    for (i = 0; i < m; i++) for (j = 0; j < seg; j++) {
      a = j / seg * TAU;
      V.push([prof[i][0], y + prof[i][1] * Math.cos(a), z + prof[i][1] * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < seg; j++) {
      k = (j + 1) % seg;
      F.push([i * seg + j, i * seg + k, (i + 1) * seg + k], [i * seg + j, (i + 1) * seg + k, (i + 1) * seg + j]);
    }
    /* end caps (fans on a centre vertex) */
    V.push([prof[0][0], y, z]); V.push([prof[m - 1][0], y, z]);
    for (j = 0; j < seg; j++) { k = (j + 1) % seg; F.push([m * seg, k, j]); F.push([m * seg + 1, (m - 1) * seg + j, (m - 1) * seg + k]); }
    solid(bin, V, F, true);
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

  /* ------------------------------------------------------------- the two rows */
  /* All numbers are metres in model space.  Everything below is written in WORLD (model)
     coordinates; flush() moves the turret and elevating groups to their own frames. */
  var KRUG = {
    key: "pact_e60_sam", seed: 211, wheels: 7,
    XT: -4.00, XN: 3.70, TY: 1.28, TH: 0.31, RW: 0.31,
    XW: [-3.00, -2.12, -1.24, -0.36, 0.52, 1.40, 2.28],
    SPR: { x: -3.58, z: 0.46, r: 0.32 }, IDL: { x: 3.20, z: 0.55, r: 0.38 },
    XROLL: [-2.7, -1.05, 0.6, 2.2], deck: 1.75,
    TX: -2.30, HZ: 3.00, EL: 0.785, sprFront: true
  };
  var KUB = {
    key: "pact_e60_kub", seed: 212, wheels: 6,
    XT: -3.50, XN: 3.55, TY: 1.30, TH: 0.28, RW: 0.30,
    XW: [-2.55, -1.65, -0.75, 0.15, 1.05, 1.95],
    SPR: { x: -3.10, z: 0.42, r: 0.30 }, IDL: { x: 2.95, z: 0.50, r: 0.36 },
    XROLL: [-2.2, -0.2, 1.6], deck: 1.62,
    TX: -0.90, HZ: 2.60, EL: 0.61, sprFront: false
  };
  var XT, XN, TY, TH, ZW, RW, NW, XW, SPR, IDL, XROLL, NROLL, RR = 0.10;

  function setup(V) {
    XT = V.XT; XN = V.XN; TY = V.TY; TH = V.TH; RW = V.RW; ZW = V.RW + 0.055;
    XW = V.XW; NW = XW.length; SPR = V.SPR; IDL = V.IDL; XROLL = V.XROLL; NROLL = XROLL.length;
  }

  function materials(THREE, C, V) {
    var T = {}, P = { base: "#4e5a37", blots: ["#424d2b", "#5c6842", "#485430"], seed: V.seed }, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.msl = new THREE.MeshStandardMaterial({ color: V.key === "pact_e60_sam" ? 0x9a9d90 : 0x6f7a55, roughness: 0.5, metalness: 0.28 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, names) {
    var B = {}, i;
    for (i = 0; i < names.length; i++) B[names[i]] = new Bin(T[names[i]], names[i] === "paint");
    return B;
  }

  /* an arc of bar segments round the Y-Z section of a round at x: angles a0..a1 (0 = +Z up, towards +Y) */
  function hoop(bin, x, y, z, r, a0, a1, n, w) {
    var k, p0, p1, A, B;
    for (k = 0; k < n; k++) {
      A = a0 + (a1 - a0) * k / n; B = a0 + (a1 - a0) * (k + 1) / n;
      bar(bin, [x, y + r * Math.sin(A), z + r * Math.cos(A)], [x, y + r * Math.sin(B), z + r * Math.cos(B)], w);
    }
  }
  /* a flat fin: planform pts [x, radial] swept out at angle ang about the X axis through (y, z), thickness th */
  function fin(bin, pts, y, z, ang, th) {
    var ca = Math.sin(ang), sa = Math.cos(ang), V = [], k, q, hh, ty = Math.cos(ang), tz = -Math.sin(ang);
    /* radial direction (rd) and the thickness direction (tn) in the Y-Z plane */
    var rdY = Math.sin(ang), rdZ = Math.cos(ang), tnY = Math.cos(ang), tnZ = -Math.sin(ang);
    for (k = 0; k < 8; k++) {
      q = pts[k % 4]; hh = k < 4 ? -th : th;
      V.push([q[0], y + q[1] * rdY + hh * tnY, z + q[1] * rdZ + hh * tnZ]);
    }
    hexa(bin, V);
  }

  /* ---------------------------------------------------------------- running gear */
  function addRunning(B, WB, V) {
    var s, k, i, yy, y, b, bg = beltGeometry(), TO = V.sprFront ? IDL : SPR, PL = V.sprFront ? SPR : IDL, nrm = bg.nrm, Q1 = bg.top[0], Q2 = bg.top[1], f, xr, zr;
    for (s = -1; s <= 1; s += 2) {
      belt(B.dark, bg.path, s * TY - TH, s * TY + TH);
      /* the toothed drive sprocket: at the FRONT on the Krug (GM-123; sprocketFront in armour_specs, seen on the
         Russian-museum photograph), at the REAR on the Kub (GM-578, the ZSU-23-4 family; seen on the Czech
         museum photograph of the 2P25); the other end carries the plain idler */
      gear(B.paint, TO.x, s * TY - 0.20, s * TY - 0.12, TO.z, TO.r - 0.10, TO.r - 0.015, 12);
      gear(B.paint, TO.x, s * TY + 0.12, s * TY + 0.20, TO.z, TO.r - 0.10, TO.r - 0.015, 12);
      cylY(B.dark, TO.x, s * TY - 0.23, s * TY + 0.23, TO.z, 0.17, 12);
      cylY(B.dark, PL.x, s * TY - 0.22, s * TY - 0.04, PL.z, PL.r, 16);
      cylY(B.dark, PL.x, s * TY + 0.04, s * TY + 0.22, PL.z, PL.r, 16);
      cylY(B.paint, PL.x, s * TY - 0.25, s * TY + 0.25, PL.z, 0.14, 10);
      for (k = 0; k < NROLL; k++) {
        f = (XROLL[k] - Q1[0]) / (Q2[0] - Q1[0]);
        xr = XROLL[k]; zr = Q1[1] + (Q2[1] - Q1[1]) * f;
        xr -= nrm[0] * (0.04 + RR); zr -= nrm[1] * (0.04 + RR);
        cylY(B.dark, xr, s * TY - 0.10, s * TY + 0.10, zr, RR, 10);
        cylY(B.paint, xr, s * TY - 0.115, s * TY + 0.115, zr, 0.04, 6);
      }
    }
    /* road wheels: two tyre rings with discs, hubs and a ring of bolts, both sides of an axle in one node */
    for (i = 0; i < NW; i++) for (s = -1; s <= 1; s += 2) {
      b = WB[i].bin;
      for (yy = -1; yy <= 1; yy += 2) {
        y = s * TY + yy * 0.155;
        cylY(b, 0, y - 0.06, y + 0.06, 0, RW, 11, yy > 0, yy < 0);
        cylY(b, 0, y - 0.075, y + 0.075, 0, RW - 0.09, 8, yy > 0, yy < 0);
        cylY(b, 0, y - 0.09, y + 0.09, 0, 0.075, 6, yy > 0, yy < 0);
        if (s * yy > 0) for (k = 0; k < 5; k++) {
          cylY(b, Math.cos(k * TAU / 5) * (RW - 0.15), y + yy * 0.07, y + yy * 0.10, Math.sin(k * TAU / 5) * (RW - 0.15), 0.02, 3, false, true);
        }
      }
    }
  }

  /* ------------------------------------------------------------------- hulls */
  function addHullCommon(B, V, deck, nose) {
    var s, k, x, fo = V.TY + V.TH + 0.02;
    /* lower hull between the tracks with the sloped nose */
    profY(B.paint, [[XT, 0.50], [XN - 0.40, 0.50], [XN, 0.80], [XN, 1.05], [XN - 0.55, deck - 0.15], [XN - 0.85, deck], [XT, deck]], -(V.TY - V.TH + 0.03), V.TY - V.TH + 0.03);
    /* tail plate: tow hooks, hatch plate and two exhausts */
    box(B.dark, XT - 0.04, XT, -0.60, 0.60, 0.70, 1.20);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XT - 0.09, XT, s * 0.98 - 0.07, s * 0.98 + 0.07, 0.62, 0.72);
      cylX(B.dark, XT - 0.16, XT, s * 0.35, deck - 0.40, 0.065, 10);
    }
    for (s = -1; s <= 1; s += 2) box(B.dark, XN - 0.02, XN + 0.12, s * 0.42 - 0.05, s * 0.42 + 0.05, 0.62, 0.76);
    for (s = -1; s <= 1; s += 2) {
      /* sponson boxes over the tracks, with a sloped front and the side lip */
      var yi = V.TY - V.TH + 0.03, x1 = nose.sponX;
      profY(B.paint, [[XT + 0.08, 1.12], [x1 + 0.45, 1.12], [x1 + 0.45, deck - 0.20], [x1 + 0.10, deck], [XT + 0.08, deck]], s > 0 ? yi : -fo, s > 0 ? fo : -yi);
      /* mudguard in front of the sponson, flared */
      prism(B.paint, [[x1 + 0.45, s * yi], [x1 + 0.45, s * fo], [XN - 0.50, s * (fo + 0.03)], [XN - 0.15, s * (fo - 0.12)], [XN - 0.15, s * yi]], 1.14, 1.19);
      /* side detail: stowage lids, lifting eyes, tow cable along the hull side */
      for (k = 0; k < 3; k++) {
        x = nose.lidX[k];
        box(B.dark, x - 0.38, x + 0.38, s > 0 ? fo : -fo - 0.03, s > 0 ? fo + 0.03 : -fo, 1.30, deck - 0.30);
        box(B.dark, x - 0.04, x + 0.04, s > 0 ? fo + 0.03 : -fo - 0.06, s > 0 ? fo + 0.06 : -fo - 0.03, 1.46, 1.56);
      }
      cylX(B.dark, XT + 0.25, x1 + 0.25, s * (fo + 0.04), deck - 0.18, 0.025, 6);
      /* headlamp in a wire guard on the glacis */
      cylX(B.dark, XN - 0.78, XN - 0.60, s * 0.88, deck - 0.12, 0.085, 10);
      cylX(B.dark, XN - 0.60, XN - 0.585, s * 0.88, deck - 0.12, 0.06, 10);
      /* engine-deck filler cap and louvre bank */
      cylZ(B.paint, XT + 1.20, s * 0.75, deck, deck + 0.07, 0.13, 12);
      /* team strip on each side of the deck, up-facing */
      box(B.team, nose.teamX0, nose.teamX1, s > 0 ? 0.62 : -0.86, s > 0 ? 0.86 : -0.62, deck + 0.002, deck + 0.022);
    }
    for (k = 0; k < 7; k++) box(B.dark, XT + 0.40 + k * 0.17, XT + 0.45 + k * 0.17, -0.55, 0.55, deck, deck + 0.025);
    /* driver: hatch and two vision blocks in the sloped nose */
    cylZ(B.paint, XN - 1.25, nose.driverY, deck, deck + 0.10, 0.22, 16);
    cylZ(B.dark, XN - 1.25, nose.driverY, deck + 0.10, deck + 0.115, 0.15, 12);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.dark, [XN - 0.58, s * 0.40, deck - 0.26], [0.70, 0, 0.71], [0, 1, 0], [0.71, 0, -0.70], 0, 0.02, -0.17, 0.17, 0, 0.12);
      planeBox(B.dark, [XN - 0.62, s * 0.40, deck - 0.20], [0.70, 0, 0.71], [0, 1, 0], [0.71, 0, -0.70], -0.02, 0.0, -0.22, 0.22, -0.08, 0.20);
    }
  }

  function addLaunchBase(B, V, deck, R, SL) {
    /* turntable: ring, slab, team plate, rear equipment box, trunnion lugs, ram sleeves.  World coordinates. */
    var s, TX = V.TX, HX = V.HX, HZ = V.HZ, k;
    cylZ(B.dark, TX, 0, deck - 0.02, deck + 0.01, R + 0.04, 24);
    cylZ(B.paint, TX, 0, deck + 0.01, deck + 0.10, R, 24);
    var top = deck + 0.10 + SL.h;
    prism(B.paint, SL.pts, deck + 0.10, top);
    for (k = 0; k < SL.pts.length; k++) {
      var a = SL.pts[k], b = SL.pts[(k + 1) % SL.pts.length];
      bar(B.dark, [a[0], a[1], top], [b[0], b[1], top], 0.035);
    }
    box(B.team, SL.teamX0, SL.teamX1, -SL.teamHY, SL.teamHY, top + 0.002, top + 0.022);
    for (s = -1; s <= 1; s += 2) {
      /* trunnion lug plates */
      profY(B.paint, [[HX - 0.32, top - 0.02], [HX + 0.34, top - 0.02], [HX + 0.20, HZ + 0.12], [HX - 0.20, HZ + 0.17]], s * V.lugY - 0.06, s * V.lugY + 0.06);
      cylY(B.dark, HX, s * V.lugY - 0.09, s * V.lugY + 0.09, HZ, 0.10, 12);
      /* elevating ram sleeve: lower body, the rod goes up into the beam underside */
      cyl(B.dark, [HX + V.ramX0, s * V.ramY, top], [HX + V.ramX1, s * V.ramY, V.ramZ], 0.09, 0.075, 10);
      cyl(B.paint, [HX + V.ramX0 - 0.02, s * V.ramY, top], [HX + V.ramX0 + 0.02, s * V.ramY, top + 0.14], 0.12, 0.12, 10);
    }
    if (SL.rearBox) {
      var rb = SL.rearBox;
      box(B.paint, rb[0], rb[1], rb[2], rb[3], top, rb[4]);
      for (k = 0; k < 4; k++) box(B.dark, rb[0] - 0.01, rb[0] + 0.01, rb[2] + 0.08, rb[3] - 0.08, top + 0.1 + k * 0.1, top + 0.14 + k * 0.1);
      box(B.dark, rb[0], rb[1], rb[2], rb[3], rb[4], rb[4] + 0.02);
    }
    return top;
  }

  /* ---------------------------------------------------------------- missiles */
  function addKrugMissile(B, y, z, x0, tip, side) {
    var k, a, bx, i, ca;
    /* ramjet body: nozzle, cylinder, intake lip, long cone with the spike */
    revolve(B.msl, [[x0, 0.30], [x0 + 0.08, 0.40], [x0 + 0.30, 0.43], [tip - 2.55, 0.43], [tip - 2.55, 0.335],
                    [tip - 1.80, 0.27], [tip - 1.00, 0.16], [tip - 0.35, 0.065], [tip, 0]], y, z, 18);
    /* mid rings and the ring joint behind the intake */
    for (i = 0; i < 3; i++) cylX(B.msl, [x0 + 2.1, x0 + 4.0, tip - 2.62][i], [x0 + 2.1, x0 + 4.0, tip - 2.62][i] + 0.07, y, z, 0.445, 16);
    /* four strap-on boosters at the diagonals, each with a nose cone and a nozzle; struts to the body */
    for (k = 0; k < 4; k++) {
      a = Math.PI / 4 + k * Math.PI / 2;
      bx = [y + 0.57 * Math.cos(a), z + 0.57 * Math.sin(a)];
      revolve(B.msl, [[x0 + 0.05, 0.10], [x0 + 0.12, 0.15], [x0 + 2.80, 0.15], [x0 + 3.15, 0.07], [x0 + 3.25, 0]], bx[0], bx[1], 8);
      for (i = 0; i < 2; i++) bar(B.dark, [x0 + 0.9 + i * 1.6, y + 0.40 * Math.cos(a), z + 0.40 * Math.sin(a)], [x0 + 0.9 + i * 1.6, bx[0], bx[1]], 0.045);
    }
    /* four mid wings (swept, at the diagonals) and four tail fins (cruciform) */
    for (k = 0; k < 4; k++) {
      fin(B.msl, [[x0 + 5.40, 0.42], [x0 + 6.65, 0.42], [x0 + 6.25, 1.00], [x0 + 5.85, 1.00]], y, z, Math.PI / 4 + k * Math.PI / 2, 0.022);
      fin(B.msl, [[x0 + 0.05, 0.42], [x0 + 1.05, 0.42], [x0 + 0.85, 0.92], [x0 + 0.38, 0.92]], y, z, k * Math.PI / 2, 0.022);
    }
  }
  function addKubMissile(B, y, z, x0, tip) {
    var k, a, i;
    revolve(B.msl, [[x0, 0.10], [x0 + 0.06, 0.135], [x0 + 0.40, 0.14], [x0 + 3.00, 0.14], [x0 + 3.02, 0.165], [tip - 1.05, 0.165], [tip - 0.75, 0.15]], y, z, 18);
    revolve(B.dark, [[tip - 1.05, 0.165], [tip - 0.75, 0.155], [tip - 0.35, 0.115], [tip - 0.10, 0.05], [tip, 0]], y, z, 18);
    /* four intake ducts along the waist, at the diagonals */
    for (k = 0; k < 4; k++) {
      a = Math.PI / 4 + k * Math.PI / 2;
      cylX(B.msl, x0 + 1.4, x0 + 3.0, y + 0.165 * Math.cos(a) * 1.02, z + 0.165 * Math.sin(a) * 1.02, 0.045, 6);
      fin(B.msl, [[x0 + 3.12, 0.15], [x0 + 3.95, 0.15], [x0 + 3.78, 0.62], [x0 + 3.40, 0.62]], y, z, a, 0.014);
      fin(B.msl, [[x0 + 0.04, 0.12], [x0 + 0.60, 0.12], [x0 + 0.45, 0.43], [x0 + 0.20, 0.43]], y, z, k * Math.PI / 2, 0.014);
    }
    cylX(B.dark, x0 + 3.00, x0 + 3.06, y, z, 0.17, 18);
  }

  /* ---------------------------------------------------------------- Krug launcher */
  function addKrugLauncher(B, V) {
    var s, i, k, ys = [0.95, -0.95], X0 = V.HX - 1.2, tipX = 5.30;
    /* beam under the rounds, from just behind the hinge to past the cradles */
    box(B.paint, V.HX - 0.25, V.HX + 6.50, -0.42, 0.42, V.HZ - 0.10, V.HZ + 0.14);
    box(B.dark, V.HX - 0.25, V.HX + 6.50, -0.30, 0.30, V.HZ - 0.12, V.HZ - 0.10);
    cylY(B.dark, V.HX, -0.62, 0.62, V.HZ, 0.11, 12);
    box(B.paint, V.HX - 0.45, V.HX - 0.25, -1.30, 1.30, V.HZ - 0.12, V.HZ + 0.50);
    for (i = 0; i < 4; i++) {
      var cx = V.HX + [1.0, 2.7, 4.4, 6.0][i];
      box(B.paint, cx - 0.12, cx + 0.12, -1.40, 1.40, V.HZ - 0.06, V.HZ + 0.10);
    }
    for (s = 0; s < 2; s++) {
      var y = ys[s], z = V.HZ + 0.45, sg = y > 0 ? 1 : -1;
      addKrugMissile(B, y, z, X0, tipX);
      /* A-frame cradles under each round at two stations, and saddle hoops */
      for (i = 0; i < 3; i++) {
        var cx2 = V.HX + [1.0, 3.7, 5.6][i];
        bar(B.paint, [cx2, y - 0.62 * sg * 0.5 + 0.0, V.HZ + 0.10], [cx2, y - 0.38, z - 0.28], 0.07);
        bar(B.paint, [cx2, y + 0.62, V.HZ + 0.10], [cx2, y + 0.38, z - 0.28], 0.07);
        bar(B.paint, [cx2, y - 0.60, V.HZ + 0.10], [cx2, y + 0.60, V.HZ + 0.10], 0.06);
        hoop(B.paint, cx2, y, z, 0.50, -Math.PI * 0.70, Math.PI * 0.70, 6, 0.05);
        hoop(B.dark, cx2 + 0.05, y, z, 0.485, -Math.PI * 0.70, Math.PI * 0.70, 6, 0.03);
      }
      /* guide rail under the round */
      cylX(B.dark, V.HX - 0.05, V.HX + 6.4, y, z - 0.46, 0.04, 6);
    }
    /* centre brace between the two rounds */
    for (i = 0; i < 3; i++) box(B.dark, V.HX + [1.0, 3.7, 5.6][i] - 0.05, V.HX + [1.0, 3.7, 5.6][i] + 0.05, -0.50, 0.50, V.HZ + 0.30, V.HZ + 0.36);
  }

  /* ---------------------------------------------------------------- Kub launcher */
  function addKubLauncher(B, V) {
    var s, i, k, ys = [0.90, 0, -0.90], z = V.HZ + 0.40, X0 = V.HX - 1.0, tip = X0 + 5.80;
    box(B.paint, V.HX - 0.30, V.HX + 5.0, -0.45, 0.45, V.HZ - 0.12, V.HZ + 0.10);
    box(B.dark, V.HX - 0.30, V.HX + 5.0, -0.30, 0.30, V.HZ - 0.14, V.HZ - 0.12);
    cylY(B.dark, V.HX, -0.70, 0.70, V.HZ, 0.10, 12);
    for (i = 0; i < 3; i++) {
      var cx = V.HX + [0.4, 2.0, 3.8][i];
      /* a cross girder and a pair of upright guide lugs per station, with their X-braced plate */
      box(B.paint, cx - 0.14, cx + 0.14, -1.45, 1.45, V.HZ - 0.06, V.HZ + 0.10);
      for (s = -1; s <= 1; s += 2) {
        box(B.paint, cx - 0.09, cx + 0.09, s * 1.42 - 0.05, s * 1.42 + 0.05, V.HZ + 0.08, V.HZ + 0.52);
        bar(B.dark, [cx - 0.10, s * 1.42, V.HZ + 0.10], [cx + 0.10, s * 1.42, V.HZ + 0.50], 0.03);
      }
    }
    for (k = 0; k < 3; k++) {
      var y = ys[k];
      addKubMissile(B, y, z, X0, tip);
      /* rail channel and saddles under each round */
      cylX(B.dark, V.HX - 0.25, V.HX + 4.9, y, z - 0.19, 0.035, 6);
      for (i = 0; i < 3; i++) {
        var cx3 = V.HX + [0.4, 2.0, 3.8][i];
        box(B.paint, cx3 - 0.10, cx3 + 0.10, y - 0.10, y + 0.10, V.HZ + 0.10, z - 0.17);
        hoop(B.dark, cx3, y, z, 0.19, -Math.PI * 0.65, Math.PI * 0.65, 6, 0.03);
      }
    }
    /* the tubular guard frames seen on the raised 2P25 in the Czech and Polish museum photographs: a flat
       rectangular loop across the whole launcher at each end of the elevating frame, the legs rising from the
       cross girders, the top corners bent in.  Heights are judged from the photographs, not published. */
    for (i = 0; i < 2; i++) {
      var hx = V.HX + [0.4, 3.8][i], hh = [0.78, 0.98][i];
      for (s = -1; s <= 1; s += 2) {
        bar(B.paint, [hx, s * 1.42, V.HZ + 0.10], [hx, s * 1.42, V.HZ + hh - 0.18], 0.05);
        bar(B.paint, [hx, s * 1.42, V.HZ + hh - 0.18], [hx, s * 1.24, V.HZ + hh], 0.05);
      }
      bar(B.paint, [hx, -1.24, V.HZ + hh], [hx, 1.24, V.HZ + hh], 0.05);
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C, V) {
    var T = materials(THREE, C, V), g = new THREE.Group(), HB = bins(T, ["paint", "dark", "team"]), WB = [], i, wg, TB, EB, tg, eg, deck = V.deck, top;
    setup(V);
    for (i = 0; i < NW; i++) WB.push({ bin: new Bin(T.dark, false) });
    var isK = V.key === "pact_e60_sam";
    addHullCommon(HB, V, deck, isK
      ? { sponX: -0.40, lidX: [-3.1, -1.7, -0.3], teamX0: -3.7, teamX1: -2.7, driverY: -0.45 }
      : { sponX: -0.10, lidX: [-2.6, -1.3, 0.0], teamX0: -3.2, teamX1: -2.4, driverY: -0.45 });
    addRunning(HB, WB, V);
    flush(THREE, g, HB);
    for (i = 0; i < NW; i++) {
      wg = new THREE.Group(); wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { dark: WB[i].bin });
      g.add(wg);
    }
    TB = bins(T, ["paint", "dark", "team"]);
    EB = bins(T, ["paint", "dark", "msl"]);
    if (isK) {
      V.HX = V.TX; V.lugY = 0.55; V.ramX0 = 0.45; V.ramX1 = 1.75; V.ramY = 0.85; V.ramZ = V.HZ - 0.14;
      top = addLaunchBase(TB, V, deck, 1.12, {
        h: 0.20, pts: [[V.TX - 1.55, -0.55], [V.TX - 1.55, 0.55], [V.TX - 0.90, 1.30], [V.TX + 0.70, 1.30], [V.TX + 1.20, 0.80], [V.TX + 1.20, -0.80], [V.TX + 0.70, -1.30], [V.TX - 0.90, -1.30]],
        teamX0: V.TX - 0.80, teamX1: V.TX - 0.10, teamHY: 0.45,
        rearBox: [V.TX - 1.50, V.TX - 0.85, 0.45, 1.20, deck + 0.10 + 0.20 + 0.22]
      });
      addKrugLauncher(EB, V);
    } else {
      V.HX = V.TX; V.lugY = 0.60; V.ramX0 = 0.40; V.ramX1 = 1.30; V.ramY = 0.80; V.ramZ = V.HZ - 0.15;
      top = addLaunchBase(TB, V, deck, 1.05, {
        h: 0.20, pts: [[V.TX - 1.30, -0.80], [V.TX - 1.30, 0.80], [V.TX - 0.70, 1.20], [V.TX + 0.80, 1.20], [V.TX + 1.15, 0.70], [V.TX + 1.15, -0.70], [V.TX + 0.80, -1.20], [V.TX - 0.70, -1.20]],
        teamX0: V.TX - 0.60, teamX1: V.TX + 0.10, teamHY: 0.40,
        rearBox: [V.TX - 1.25, V.TX - 0.60, 0.35, 1.05, deck + 0.10 + 0.20 + 0.15]
      });
      addKubLauncher(EB, V);
    }
    tg = new THREE.Group(); tg.name = "turret"; tg.position.set(V.TX, 0, 0);
    flush(THREE, tg, TB, V.TX, 0);
    eg = new THREE.Group(); eg.name = "podelev"; eg.position.set(V.HX - V.TX, 0, V.HZ);
    flush(THREE, eg, EB, V.HX, V.HZ);
    eg.userData.el = V.EL;
    /* mouth x, y, z and the rear x, in this group's frame: the motor lights at the tail of the round */
    eg.userData.cells = isK ? [[-0.90, 0.95, 0.45, -1.30], [-0.90, -0.95, 0.45, -1.30]]
                            : [[-0.70, 0.90, 0.40, -1.00], [-0.70, 0, 0.40, -1.00], [-0.70, -0.90, 0.40, -1.00]];
    tg.add(eg);
    g.add(tg);
    g.name = V.key;
    return g;
  }

  return { build: build, KRUG: KRUG, KUB: KUB };
})();

UNIT_MODELS["pact_e60_sam"] = { len: 9.46, build: function (THREE, M, C) { return HeroKrugKub.build(THREE, M, C, HeroKrugKub.KRUG); } };
UNIT_MODELS["pact_e60_kub"] = { len: 7.76, build: function (THREE, M, C) { return HeroKrugKub.build(THREE, M, C, HeroKrugKub.KUB); } };
