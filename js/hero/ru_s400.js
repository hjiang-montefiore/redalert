/* ============ ru_s400.js - HERO model: the S-400 Triumf 5P85TE2 launcher, a semi-trailer behind a BAZ-64022 6x6 tractor ============
   One row (rules.js, deploy:true, rounds 4, present day): sam_p "S-400 Triumf, 5P85TE2 TEL" (from e20). The row text says
   "eight-wheeled tractor"; every photograph shows the 5P85TE2 as a SEMI-TRAILER behind a three-axle 6x6 BAZ-64022 cab-over
   tractor (the 5P85SE2 on the eight-wheel BAZ-6909 is a different launcher, not drawn). Reported as a data wording problem;
   nothing edited.  Redone 2026-10-24 to the full-quality standard (lofted cab, measured layout, photo-compared).

   Recognition list, each with the photograph it rests on (Wikimedia Commons, cached in the scratchpad q_s400_ref):
     1. The flat-faced BAZ-64022 cab standing wholly AHEAD of the front axle, the cab's rear wall over the front tyre's leading
        edge ("ParkPatriot2015part8-02", side; "BAZ-64022 truck", side; "S-400 Triumf-34", front 3/4).
     2. Two big, nearly square windscreen panes on a slightly raked upper face, the lower face with the slotted grille band
        and round badge, a heavy full-width bumper with round headlamps and amber lamps above them at the outer ends
        ("ParkPatriot2015part12-45", "S-400 Triumf-34", "ParkPatriot2015part8-01").
     3. Amber marker lamps along the roof's front edge and a spotlight on a post on the roof; big mirrors on arms ("-34", "8-01").
     4. Behind the cab on the starboard side: the upright spare wheel over the front axle, the boarding ladder outboard of
        it, and two drum-shaped cylinders behind it ("8-02", "8-01", "BAZ-64022 truck").
     5. A tandem of rear tractor axles under the gooseneck with the fifth wheel between them; front axle to the first rear
        axle about three tyre diameters ("BAZ-64022 truck", "S-400 Triumf launch vehicle").
     6. The launcher equipment unit fixed on the gooseneck: a tall box with a sloped front, louvred side panels and a cable
        reel at its starboard rear; it stays put when the canisters rise ("8-02", "-34", "BAZ-64022 truck").
     7. Four ribbed canisters 2 x 2, lying level from just behind that unit to past the trailer's rear, about 7.8 m long and a
        metre across, rounded caps at the FRONT (missile nose) end, ring ribs about 0.7 m apart ("-34", "launch vehicle").
     8. The low main trailer deck with ribbed equipment boxes along both sides ahead of a close two-axle bogie; trailer tyres
        smaller than the tractor's ("-34", "8-02", "launch vehicle").
     9. Four levelling jacks, their big round foot pads stowed upright on the trailer sides (ahead of the bogie and at the
        rear corners), let down on inclined legs when set up ("-34" stowed; "8-01", "8-02" down).
    10. Set up: the block stood vertical at the trailer's rear, the rear row's tails near the ground, a lattice spine and a
        cross frame on its front face, two erector rams from the trailer deck ("8-01", "8-02").
    11. Plain Russian green all over (2013 onwards); the 2009-2010 parade camouflage is NOT drawn ("-34", "8-01", "8-02").

   Station table (metres back from the bumper; photo-scaled, total 15.3 m from the 1:35 kit, Hobby Boss 85517, 437 mm):
       0.00 bumper face          0.20/0.32 cab lower/upper face   2.20 cab rear wall      2.90 front axle (tyre 1.40 m)
       2.95 spare wheel centre   3.85/4.42 the two drums           5.30 equipment unit front 6.85 canister caps (front)
       7.15/8.55 tractor tandem  7.85 fifth wheel                  9.35 tractor rear       9.75 gooseneck step
      10.30-11.95 side boxes     11.65 front jacks                 12.60/13.88 trailer bogie (tyre 1.24 m)
      14.60 trailer rear end     14.85 canister tails              15.30 rear jack pads (stowed)
     Heights: roof 3.36, windscreen 2.18-3.16, bumper 0.80-1.22, main deck 1.75, gooseneck 2.05, canisters lying 2.05-4.09,
     equipment unit top 3.78; set up, the canisters stand 0.40-8.45.  Cab width 2.95 m, overall width 3.3 m with mirrors.
   Published: no maker figure was found for the rig (as before); the length is the kit's 15.3 m (generations.js keeps
     15.3 x 3.3). Tyres, axle spacing and heights are scaled from "S-400 Triumf launch vehicle" (side on, least perspective)
     and checked against the three Park Patriot photographs. The earlier header's 1.6 m tractor tyres are corrected to about
     1.40 m (the side photograph gives 82 px tyres on an 883 px rig), the trailer's 1.1 m to about 1.24 m.
   Deliberate departure: the photographs put the erected block wholly BEHIND the trailer (its rear row about 2.4 m past the
     deck end). render3d scales by the box of BOTH poses, so a hidden block there would shrink the whole rig by about 14%.
     The block stands instead with its rear face at the travel length (0.2 m past it, within the 2% tolerance): its rear
     row on a foot frame near the ground behind the trailer, its front row down between the bogie's side rails.
   NOT confirmed and not drawn: any marking (no star, no numbers), the whip antenna, the cable runs, the inside of the
     equipment unit, the exact jack geometry (four legs drawn), the erector's hidden parts.

   Poses (render3d finds them by name, shows one from e.deployed): "travelpose" = canisters lying level, the rear deck
   plate under their tails, jack pads stowed upright; "deploypose" = canisters stood vertical at the rear with the foot
   frame, rams and lattice, jacks down on inclined legs.  The tractor, the trailer and the five "roadwheel" axle groups (a
   tyre each side) stay outside both.  Nothing is named "turret" (the block never traverses).
   Paint: sampled off "ParkPatriot2015part8-01" (lit side 138,137,110; shade 71,68,55) and "-34" (overcast 58,61,60),
   taken to about 0.75 of the lit level: base #5d5e47.
   Materials (6): paint (canvas texture), dark, glass, tyre, lamp, C.team (two small up-facing strips on the cab roof).
   +X nose, +Y left (port), +Z up, metres, tyres on z = 0. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroS400 = (function () {
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


  /* --------------------------------------------------------------- layout */
  /* every station is given in metres BACK from the bumper face (the header's table); X() turns it into model x */
  var XF = 7.65;
  function X(d) { return XF - d; }
  var AXD = [2.90, 7.15, 8.55, 12.60, 13.88];               /* axles: tractor front, tandem; trailer bogie */
  var RT = 0.70, RR = 0.62, TYT = 1.10, TYR = 1.15;         /* tyre radii (1.40 m, 1.24 m) and half tracks */
  var CL = 7.80, CR = 0.48, CRIB = 0.505, CSY = 0.51, CSZ = 0.52;   /* canister body length, radius, rib, column/row half offsets */
  var LOW = 0.25;                                           /* the lower row sits 0.25 m further aft than the upper */
  var TRZ = 3.07, TAILD = 14.85;                            /* travel: block axis height, upper-row tail station */
  var DPX = X(13.95) - CSZ, DPZ = 0.50;                     /* set up: block centre plane x, upper-row tail height */

  var PAINT = { base: "#5d5e47", blots: ["#52543f", "#676952", "#585a43"], seed: 40041 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x2c2e2a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.12, metalness: 0.4 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1d1e1f, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xc98a2a, roughness: 0.4, metalness: 0.1, emissive: 0x2a1600 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  /* a lugged cross-country tyre on the Y axis centred at (cx, yc, cz): chevron lugs a half step apart, dished wheel.
     sc scales the radius (1 = 0.75 m), wk the width (1 = 0.60 m) */
  function tyre(bin, cx, yc, cz, ph, hub, sc, wk) {
    var N = 18, R = [[-0.30, 0.52, 0, 0], [-0.30, 0.66, 0, 0], [-0.22, 0.75, 1, 0], [-0.03, 0.75, 1, 0],
                     [0.03, 0.75, 1, 1], [0.22, 0.75, 1, 1], [0.30, 0.66, 0, 0], [0.30, 0.52, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1] * sc;
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.035;
      a = (j + ph) / N * TAU;
      V.push([cx + r * Math.cos(a), yc + R[i][0] * wk, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([cx, yc + R[0][0] * wk, cz], [cx, yc + R[m - 1][0] * wk, cz]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    if (hub) for (k = -1; k <= 1; k += 2) {
      cyl(hub, [cx, yc + k * 0.27 * wk, cz], [cx, yc + k * 0.31 * wk, cz], 0.40 * sc, 0.40 * sc, 12);
      cyl(hub, [cx, yc + k * 0.31 * wk, cz], [cx, yc + k * 0.37 * wk, cz], 0.15 * sc, 0.12 * sc, 8);
    }
  }

  /* ------------------------------------------------------------------ cab */
  /* cross-section rings: the lower body (face at station dl) and the cabin above the windscreen sill, its face raked
     back to du at the roof, with chamfered roof edges.  Two lofts, so each front plate is a true plane. */
  function cabLow(dl, hw, zb, zw) { return [[X(dl), -hw, zb], [X(dl), -hw, zw], [X(dl), hw, zw], [X(dl), hw, zb]]; }
  function cabUp(dl, du, hw, zw, zt) {
    return [[X(dl), -hw, zw], [X(du), -hw + 0.03, zt - 0.15], [X(du), -hw + 0.18, zt],
            [X(du), hw - 0.18, zt], [X(du), hw - 0.03, zt - 0.15], [X(dl), hw, zw]];
  }
  var CAB = [  /* dl,   du,   half width, bottom, windscreen sill, roof */
    [0.20, 0.34, 1.30, 1.24, 2.18, 3.22],
    [0.27, 0.40, 1.43, 1.18, 2.18, 3.31],
    [0.36, 0.46, 1.475, 1.15, 2.18, 3.35],
    [2.20, 2.20, 1.475, 1.15, 2.18, 3.36]];

  function addCab(B) {
    var i, s, k, y, lo = [], up = [], c;
    for (i = 0; i < CAB.length; i++) {
      c = CAB[i];
      lo.push(cabLow(c[0], c[2], c[3], c[4]));
      up.push(cabUp(c[0] + (i ? 0 : 0.08), c[1] + (i ? 0 : 0.08), c[2], c[4], c[5]));   /* the cabin face sits behind the screen slab */
    }
    loft(B.paint, lo, false);
    loft(B.paint, up, false);
    /* the raked upper face: windscreen panes in a dark frame slab that forms the face, centre post, wipers */
    var P0 = [X(0.20), 0, 2.18], U = unit([-0.14, 0, 0.89]), W = [0, 1, 0], N = unit([0.89, 0, 0.14]);
    for (s = -1; s <= 1; s += 2) {
      planeBox(B.dark, P0, U, W, N, 0.0, 0.98, s > 0 ? 0.04 : -1.29, s > 0 ? 1.29 : -0.04, -0.10, 0.015);
      planeBox(B.glass, P0, U, W, N, 0.10, 0.93, s > 0 ? 0.09 : -1.19, s > 0 ? 1.19 : -0.09, -0.02, 0.025);
      for (k = 0; k < 2; k++) {
        y = s * (0.30 + k * 0.52);
        bar(B.dark, [X(0.205) + 0.03, y, 2.24], [X(0.25) + 0.03, y + s * 0.08, 2.62], 0.03);
      }
    }
    /* lower face: the grille band with its slots, the round badge, the corner turn lamps */
    for (k = 0; k < 4; k++) box(B.dark, X(0.23), X(0.20) + 0.02, -0.92, 0.92, 1.42 + k * 0.10 + (k > 1 ? 0.22 : 0), 1.47 + k * 0.10 + (k > 1 ? 0.22 : 0));
    cylX(B.dark, X(0.23), X(0.20) + 0.025, 0, 1.73, 0.10, 12);
    for (s = -1; s <= 1; s += 2) {
      box(B.lamp, X(0.25), X(0.20) + 0.025, s * 1.08, s * 1.24, 1.30, 1.40);
      box(B.dark, X(0.23), X(0.20) + 0.015, s * 1.00, s * 1.24, 1.98, 2.04);          /* sill trim */
    }
    /* roof: marker lamps on the front edge, spotlight on its post, a roof hatch, team strips */
    for (s = -1; s <= 1; s += 2) {
      box(B.lamp, X(0.52), X(0.40), s * 0.88, s * 1.06, 3.34, 3.42);
      box(B.team, X(1.95), X(1.00), s * 0.70, s * 1.10, 3.36, 3.38);
    }
    box(B.lamp, X(0.52), X(0.40), -0.07, 0.07, 3.35, 3.42);
    cylZ(B.dark, X(0.62), 0.20, 3.35, 3.55, 0.04, 6);
    cylX(B.dark, X(0.70), X(0.50), 0.20, 3.62, 0.11, 12);
    cylX(B.glass, X(0.50), X(0.49), 0.20, 3.62, 0.085, 12);
    box(B.dark, X(1.55), X(1.05), -0.40, 0.40, 3.36, 3.40);
    /* sides: doors with their windows and seams, handles, the rear quarter window, mirrors on arms */
    for (s = -1; s <= 1; s += 2) {
      y = s * 1.475;
      box(B.glass, X(1.62), X(0.62), y - s * 0.02, y + s * 0.02, 2.28, 3.08);
      box(B.dark, X(1.66), X(0.58), y - s * 0.02, y + s * 0.012, 2.24, 2.28);
      box(B.dark, X(1.70), X(1.67), y - s * 0.02, y + s * 0.015, 1.25, 3.18);                  /* door seams */
      box(B.dark, X(0.55), X(0.52), y - s * 0.02, y + s * 0.015, 1.25, 3.18);
      box(B.dark, X(1.52), X(1.32), y - s * 0.02, y + s * 0.04, 2.05, 2.10);                   /* handle */
      box(B.glass, X(2.10), X(1.82), y - s * 0.02, y + s * 0.02, 2.55, 3.05);                  /* rear quarter window */
      /* steps under the door */
      box(B.dark, X(1.45), X(0.70), s * 1.30, s * 1.45, 0.66, 0.70);
      box(B.dark, X(1.45), X(0.70), s * 1.20, s * 1.36, 0.98, 1.02);
      box(B.dark, X(1.47), X(1.43), s * 1.20, s * 1.45, 0.66, 1.15);
      box(B.dark, X(0.72), X(0.68), s * 1.20, s * 1.45, 0.66, 1.15);
      /* mirror arms from the front corner, big and small mirror heads */
      bar(B.dark, [X(0.45), s * 1.47, 2.95], [X(0.18), s * 1.61, 2.98], 0.04);
      bar(B.dark, [X(0.45), s * 1.47, 2.25], [X(0.18), s * 1.61, 2.30], 0.04);
      box(B.dark, X(0.24), X(0.13), s * 1.58, s * 1.65, 2.30, 2.98);
      box(B.dark, X(0.30), X(0.20), s * 1.56, s * 1.62, 2.02, 2.22);
    }
    /* bumper: the heavy full-width beam, headlamps in its ends, tow hooks and a centre step */
    box(B.paint, X(0.32), X(0.0), -1.43, 1.43, 0.80, 1.22);
    box(B.dark, X(0.03), X(0.0) + 0.01, -1.40, 1.40, 1.12, 1.15);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(0.03), X(0.0) + 0.01, s * 1.00, s * 1.38, 0.86, 1.10);
      cylX(B.glass, X(0.02), X(0.0) + 0.02, s * 1.20, 0.98, 0.09, 12);
      box(B.lamp, X(0.02), X(0.0) + 0.02, s * 1.04, s * 1.10, 0.92, 1.04);
      box(B.dark, X(0.05), X(0.0) + 0.03, s * 0.42 - 0.07, s * 0.42 + 0.07, 0.72, 0.84);   /* tow hooks */
    }
    box(B.dark, X(0.04), X(0.0) + 0.01, -0.35, 0.35, 0.84, 1.08);                  /* number plate recess, left blank */
  }

  /* ------------------------------------------------------------- tractor */
  function addTractor(B) {
    var i, s, k, x;
    /* frame rails, cross members, axle beams and differentials */
    for (s = -1; s <= 1; s += 2) box(B.dark, X(9.35), X(0.35), s * 0.40, s * 0.58, 0.95, 1.35);
    for (k = 0; k < 6; k++) { x = X(0.6 + k * 1.70); box(B.dark, x - 0.06, x + 0.06, -0.58, 0.58, 1.00, 1.28); }
    for (i = 0; i < 3; i++) {
      x = X(AXD[i]);
      cylY(B.dark, x, -0.85, 0.85, RT, 0.11, 8);
      cylY(B.dark, x, -0.28, 0.28, RT, 0.26, 10);
      box(B.dark, x - 0.45, x + 0.45, -0.62, -0.50, RT + 0.12, RT + 0.22);        /* springs */
      box(B.dark, x - 0.45, x + 0.45, 0.50, 0.62, RT + 0.12, RT + 0.22);
    }
    /* front mudguard (the tyre stands just behind the cab) and the tandem guards */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, X(3.62), X(2.22), s * 0.80, s * 1.47, 1.48, 1.54);
      box(B.paint, X(3.68), X(3.58), s * 0.80, s * 1.47, 1.10, 1.54);
      box(B.paint, X(9.32), X(6.38), s * 0.78, s * 1.47, 1.50, 1.56);
      box(B.dark, X(9.30), X(9.24), s * 0.80, s * 1.45, 0.95, 1.50);                 /* rear mud flaps */
      box(B.dark, X(7.88), X(7.82), s * 0.80, s * 1.45, 1.10, 1.50);
    }
    /* behind the cab, starboard: the upright spare wheel over the front axle, its carrier, the ladder outboard */
    tyre(B.tyre, X(2.95), -1.18, 2.55, 0, B.dark, 0.72 / 0.75, 0.75);
    box(B.dark, X(3.20), X(2.70), -0.98, -0.90, 1.40, 3.20);
    box(B.dark, X(3.75), X(2.25), -0.98, -0.88, 1.40, 1.50);
    for (k = 0; k < 2; k++) box(B.dark, X(2.55 + k * 0.80) - 0.03, X(2.55 + k * 0.80) + 0.03, -1.53, -1.47, 1.20, 3.00);
    for (k = 0; k < 6; k++) box(B.dark, X(3.33), X(2.57), -1.53, -1.47, 1.30 + k * 0.29, 1.34 + k * 0.29);
    bar(B.dark, [X(2.55), -1.50, 3.00], [X(2.30), -1.40, 3.30], 0.04);
    /* the two drums behind it on their platform, cross-wise, with their caps */
    box(B.paint, X(4.85), X(3.45), -1.30, 0.05, 1.40, 2.42);
    box(B.dark, X(4.85), X(3.45), -1.31, -1.29, 1.90, 1.93);
    box(B.dark, X(4.20), X(4.16), -1.31, -1.29, 1.45, 2.38);
    for (k = 0; k < 2; k++) {
      x = X(3.82 + k * 0.64);
      cylY(B.paint, x, -1.14, -0.50, 2.75, 0.30, 16);
      cyl(B.paint, [x, -1.14, 2.75], [x, -1.24, 2.75], 0.30, 0.18, 16);
      cylY(B.dark, x, -0.86, -0.80, 2.75, 0.315, 16);
      cylZ(B.dark, x, -0.84, 3.02, 3.14, 0.08, 8);
      box(B.dark, x - 0.06, x + 0.06, -1.10, -0.55, 2.40, 2.47);
    }
    /* port side behind the cab: equipment box with its doors, the air intake pipe */
    box(B.paint, X(3.55), X(2.28), 0.25, 1.32, 1.40, 2.40);
    box(B.dark, X(2.93), X(2.90), 1.32, 1.335, 1.48, 2.32);
    box(B.dark, X(3.40), X(3.20), 1.32, 1.35, 1.90, 1.95);
    cylZ(B.dark, X(2.36), 1.10, 1.50, 3.40, 0.10, 10);
    cyl(B.dark, [X(2.36), 1.10, 3.40], [X(2.36), 1.10, 3.52], 0.17, 0.12, 10);
    /* tanks on the frame sides: fuel (starboard) with straps, air (port) */
    box(B.paint, X(6.10), X(4.80), -1.38, -0.62, 0.82, 1.36);
    for (k = 0; k < 2; k++) box(B.dark, X(5.10 + k * 0.70) - 0.04, X(5.10 + k * 0.70) + 0.04, -1.40, -0.62, 0.80, 1.38);
    /* port side under the gooseneck front: the trailer's own spare wheel (smaller, as "S-400 Triumf launch vehicle"
       and "S-400 Triumf SAM" show it) in its cradle, an air tank under it */
    tyre(B.tyre, X(5.45), 1.17, 1.45, 0, B.dark, RR / 0.75, 0.75);
    box(B.dark, X(5.80), X(5.10), 0.80, 0.90, 0.95, 2.05);
    box(B.dark, X(6.10), X(4.80), 0.58, 1.00, 0.95, 1.02);
    cylX(B.paint, X(6.30), X(4.75), 0.80, 0.70, 0.16, 10);
    /* the fifth wheel between the tandem axles, the rear cross beam with its lamps */
    cylZ(B.dark, X(7.85), 0, 1.35, 1.50, 0.62, 18);
    box(B.dark, X(9.38), X(9.25), -1.25, 1.25, 0.92, 1.15);
    for (s = -1; s <= 1; s += 2) box(B.lamp, X(9.40), X(9.37), s * 0.95, s * 1.18, 0.97, 1.10);
  }

  /* ------------------------------------------------------------- trailer */
  function addTrailer(B) {
    var i, s, k, x, y;
    /* gooseneck over the fifth wheel, the step down, the main deck */
    box(B.paint, X(9.75), X(5.30), -1.15, 1.15, 1.58, 2.05);
    box(B.dark, X(9.75), X(5.30), -1.16, 1.16, 1.86, 1.89);
    box(B.dark, X(8.60), X(7.10), -0.70, 0.70, 1.50, 1.58);
    profY(B.paint, [[X(10.40), 1.05], [X(9.60), 1.50], [X(9.60), 2.05], [X(10.40), 1.75]], -1.15, 1.15);
    box(B.paint, X(13.35), X(10.30), -1.02, 1.02, 1.05, 1.75);
    for (s = -1; s <= 1; s += 2) {
      /* side rails to the rear end (the block stands between them when set up) */
      box(B.paint, X(14.60), X(10.30), s * 1.02, s * 1.30, 1.36, 1.75);
      box(B.dark, X(14.60), X(10.30), s * 1.30, s * 1.315, 1.62, 1.66);
      /* the ribbed equipment boxes ahead of the bogie */
      box(B.paint, X(11.95), X(10.30), s * 0.95, s * 1.42, 1.00, 1.74);
      for (k = 0; k < 6; k++) { x = X(10.42 + k * 0.30); box(B.dark, x - 0.03, x + 0.03, s * 1.40, s * 1.45, 1.02, 1.72); }
      box(B.dark, X(11.95), X(10.30), s * 1.42, s * 1.45, 1.36, 1.39);
      box(B.dark, X(11.70), X(10.55), s * 1.42, s * 1.46, 1.52, 1.55);
      /* bogie mudguards, the flap between the tyres, stub axles */
      box(B.paint, X(14.55), X(11.95), s * 0.90, s * 1.42, 1.36, 1.41);
      box(B.dark, X(13.27), X(13.21), s * 0.92, s * 1.40, 0.70, 1.36);
      for (i = 3; i < 5; i++) cylY(B.dark, X(AXD[i]), s * 0.82, s * 0.92, RR, 0.13, 8);
      /* jack housings: ahead of the bogie and at the rear corners */
      box(B.dark, X(11.80), X(11.50), s * 1.30, s * 1.46, 1.10, 1.76);
      box(B.dark, X(14.60), X(14.30), s * 1.30, s * 1.46, 1.10, 1.76);
      /* rear end of the rails: lamps */
      box(B.lamp, X(14.62), X(14.59), s * 1.06, s * 1.24, 1.42, 1.52);
      /* hand rails along the gooseneck */
      box(B.dark, X(9.60), X(5.40), s * 1.12, s * 1.15, 2.05, 2.30);
    }
    /* the launcher equipment unit on the gooseneck: sloped front, louvred sides, top box, connector panel */
    profY(B.paint, [[X(5.30), 2.05], [X(6.80), 2.05], [X(6.80), 3.30], [X(6.55), 3.78], [X(5.85), 3.78], [X(5.30), 3.05]], -1.15, 1.15);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 7; k++) box(B.dark, X(6.60), X(5.95), s * 1.13, s * 1.175, 2.40 + k * 0.11, 2.44 + k * 0.11);
      box(B.dark, X(6.78), X(6.74), s * 1.13, s * 1.17, 2.10, 3.25);
      box(B.dark, X(5.90), X(5.86), s * 1.13, s * 1.17, 2.10, 3.70);
    }
    box(B.paint, X(6.45), X(5.95), -0.62, 0.62, 3.78, 4.02);
    box(B.dark, X(6.45), X(5.95), -0.63, 0.63, 3.88, 3.90);
    planeBox(B.dark, [X(5.30), 0, 3.05], unit([-0.55, 0, 0.73]), [0, 1, 0], unit([0.73, 0, 0.55]), 0.12, 0.80, -0.80, 0.80, -0.03, 0.07);
    /* cable reel at the unit's starboard rear, its face outboard */
    cylY(B.dark, X(7.15), -1.20, -1.24, 2.62, 0.34, 16);
    cylY(B.dark, X(7.15), -1.52, -1.56, 2.62, 0.34, 16);
    cylY(B.paint, X(7.15), -1.52, -1.20, 2.62, 0.24, 14);
    box(B.dark, X(7.30), X(7.00), -1.18, -1.05, 2.05, 2.70);
    /* the saddle that carries the lower canisters' noses */
    box(B.dark, X(7.15), X(6.80), -1.02, 1.02, 2.05, 2.40);
  }

  /* -------------------------------------------------------------- canisters */
  /* the block in its own frame: tails at x = 0 (upper row) and -LOW (lower row), noses toward +x; columns along y,
     rows along z (+z the upper row).  The erector lattice is on the -z face, the side that faces the vehicle when set up. */
  function addBlock(B) {
    var r, c, k, y, z, o, rb, x;
    for (r = -1; r <= 1; r += 2) for (c = -1; c <= 1; c += 2) {
      y = c * CSY; z = r * CSZ; o = r > 0 ? 0 : -LOW;
      cyl(B.paint, [o + 0.10, y, z], [o + CL, y, z], CR, CR, 16);
      for (k = 0; k < 10; k++) {
        rb = o + 0.80 + k * 0.68;
        cyl(B.paint, [rb, y, z], [rb + 0.06, y, z], CRIB, CRIB, 16, true, true);
      }
      cyl(B.paint, [o + 0.22, y, z], [o + 0.44, y, z], CRIB + 0.01, CRIB + 0.01, 16);            /* tail band */
      cyl(B.paint, [o + CL - 0.50, y, z], [o + CL - 0.30, y, z], CRIB + 0.01, CRIB + 0.01, 16);  /* head band */
      cyl(B.paint, [o + CL, y, z], [o + CL + 0.12, y, z], CR, CR - 0.08, 16, true, true);       /* the rounded nose cap */
      cyl(B.paint, [o + CL + 0.12, y, z], [o + CL + 0.20, y, z], CR - 0.08, CR - 0.22, 16, true);
      cyl(B.dark, [o, y, z], [o + 0.10, y, z], CR - 0.04, CR - 0.04, 14);                       /* tail ring */
    }
    /* frames round the block, the long beams on the lattice side, the spine lattice, the wide cross frame */
    for (k = 0; k < 3; k++) {
      x = [0.62, 3.75, 6.95][k];
      for (c = -1; c <= 1; c += 2) {
        box(B.paint, x - 0.05, x + 0.05, -CSY - CRIB, CSY + CRIB, c * (CSZ + CRIB) - 0.03, c * (CSZ + CRIB) + 0.04);
        box(B.paint, x - 0.05, x + 0.05, c * (CSY + CRIB) - 0.03, c * (CSY + CRIB) + 0.03, -CSZ - CRIB, CSZ + CRIB);
      }
    }
    z = -CSZ - CRIB - 0.04;
    for (c = -1; c <= 1; c += 2) box(B.dark, -LOW, 6.30, c * 0.32 - 0.05, c * 0.32 + 0.05, z - 0.09, z);
    for (k = 0; k < 9; k++) {
      x = -0.05 + k * 0.70;
      bar(B.dark, [x, -0.32, z - 0.05], [x + 0.70, 0.32, z - 0.05], 0.05);
      bar(B.dark, [x + 0.35, -0.32, z - 0.05], [x + 0.35, 0.32, z - 0.05], 0.04);
    }
    box(B.dark, 3.30, 3.42, -1.30, 1.30, z - 0.12, z);
    for (c = -1; c <= 1; c += 2) bar(B.dark, [2.55, c * (CSY + CRIB), z - 0.06], [3.36, c * 1.28, z - 0.06], 0.05);
  }

  /* copy a bin into another turned about Y by ang and moved to (px, 0, pz) */
  function bake(from, to, px, pz, ang) {
    var c = Math.cos(ang), sn = Math.sin(ang), k, x, z;
    for (k = 0; k < from.P.length; k += 3) {
      x = from.P[k]; z = from.P[k + 2];
      to.P.push(px + x * c + z * sn, from.P[k + 1], pz - x * sn + z * c);
      x = from.N[k]; z = from.N[k + 2];
      to.N.push(x * c + z * sn, from.N[k + 1], -x * sn + z * c);
      if (to.U) to.U.push(from.U[k / 3 * 2], from.U[k / 3 * 2 + 1]);
    }
  }

  /* levelling jacks: stowed, a short leg and the big round pad upright on the side; down, an inclined leg and the pad
     flat on the ground */
  function addJacks(B, down) {
    var s, i, d, hy, px, py;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      d = i ? 14.45 : 11.65; hy = s * 1.42;
      if (down) {
        px = X(i ? 14.80 : 11.65); py = s * (i ? 1.80 : 1.92);
        cyl(B.dark, [X(d), hy, 1.70], [px, py, 0.10], 0.075, 0.06, 8);
        cyl(B.dark, [X(d), hy, 1.20], [X(d) + (px - X(d)) * 0.5, hy + (py - hy) * 0.5, 0.85], 0.04, 0.04, 6);
        cylZ(B.paint, px, py, 0.0, 0.08, 0.30, 16);
        cylZ(B.dark, px, py, 0.08, 0.16, 0.10, 8);
      } else {
        cyl(B.dark, [X(d), hy, 1.70], [X(d), hy, 1.05], 0.075, 0.075, 8);
        px = X(i ? 14.95 : 11.65);
        cylY(B.paint, px, s * 1.47, s * 1.55, i ? 1.42 : 1.20, i ? 0.33 : 0.30, 16);
        cylY(B.dark, px, s * 1.44, s * 1.47, i ? 1.42 : 1.20, 0.10, 8);
        if (i) box(B.dark, X(14.95), X(14.55), s * 1.40, s * 1.47, 1.36, 1.48);
      }
    }
  }

  function bins(T, all) {
    var b = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (all) { b.glass = new Bin(T.glass, false); b.tyre = new Bin(T.tyre, false); b.lamp = new Bin(T.lamp, false); b.team = new Bin(T.team, false); }
    return b;
  }

  function build(THREE, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T, true), i, s, wg, geo, TB, BK, TV, DP, trv, dep, x, rr;
    addCab(HB);
    addTractor(HB);
    addTrailer(HB);
    flush(THREE, g, HB);
    /* five turning axle groups outside both poses: a tyre each side (one mesh per axle, lugs a phase apart) */
    for (i = 0; i < AXD.length; i++) {
      rr = i < 3 ? RT : RR;
      TB = new Bin(T.tyre, false);
      s = i < 3 ? TYT : TYR;
      tyre(TB, 0, -s, 0, 0, TB, rr / 0.75, i < 3 ? 1.0 : 0.78);
      tyre(TB, 0, s, 0, 0.5, TB, rr / 0.75, i < 3 ? 1.0 : 0.78);
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(X(AXD[i]), 0, rr);
      wg.add(new THREE.Mesh(geo, T.tyre));
      g.add(wg);
    }
    BK = bins(T, false);
    addBlock(BK);
    /* travel: the block lying level, the upper row's tail at station 14.85, the rear deck plate under the tails */
    TV = bins(T, false);
    bake(BK.paint, TV.paint, X(TAILD), TRZ, 0); bake(BK.dark, TV.dark, X(TAILD), TRZ, 0);
    box(TV.paint, X(14.60), X(13.35), -1.02, 1.02, 1.45, 1.75);
    box(TV.dark, X(14.60), X(14.45), -1.02, 1.02, 1.05, 1.45);
    for (s = -1; s <= 1; s += 2) {
      box(TV.dark, X(14.40), X(7.40), s * 0.28, s * 0.42, 1.75, TRZ - CSZ - CRIB - 0.04);        /* cradle rails under the block */
      box(TV.dark, X(13.10), X(12.80), s * 0.70, s * 0.90, 1.75, 2.05);
    }
    addJacks(TV, false);
    trv = new THREE.Group(); trv.name = "travelpose";
    flush(THREE, trv, TV);
    /* set up: the block stood vertical (local +x up, the upper row aft), the foot frame under its tails, two short steep
       rams from the rear of the deck to the lattice face ("8-01", "8-02"), struts from the rail ends, jacks down */
    DP = bins(T, false);
    bake(BK.paint, DP.paint, DPX, DPZ, -Math.PI / 2); bake(BK.dark, DP.dark, DPX, DPZ, -Math.PI / 2);
    x = DPX + CSZ + CRIB + 0.13;                                     /* the lattice face, x */
    box(DP.dark, DPX - CSZ - CRIB, x, -1.05, 1.05, 0.04, DPZ - LOW - 0.10);
    for (s = -1; s <= 1; s += 2) {
      box(DP.paint, DPX - 0.9, DPX + 0.9, s * 1.05, s * 1.25, 0.0, 0.10);
      cyl(DP.dark, [X(12.95), s * 0.55, 1.80], [x + 0.08, s * 0.55, 2.75], 0.11, 0.11, 10);
      cyl(DP.dark, [x + 0.08, s * 0.55, 2.75], [x, s * 0.55, 3.45], 0.065, 0.065, 8);
      box(DP.dark, X(13.10), X(12.80), s * 0.42, s * 0.68, 1.72, 1.86);
      bar(DP.dark, [X(14.50), s * 1.16, 1.40], [DPX + 0.2, s * 1.05, 0.12], 0.07);
      bar(DP.dark, [X(13.30), s * 1.10, 1.74], [x, s * 0.90, 2.30], 0.06);
    }
    addJacks(DP, true);
    dep = new THREE.Group(); dep.name = "deploypose";
    flush(THREE, dep, DP);
    dep.visible = false;
    g.add(trv); g.add(dep);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the bumper face to the stowed rear jack pads */
UNIT_MODELS["sam_p"] = { len: 15.3, build: function (THREE, M, C) { return HeroS400.build(THREE, C); } };
