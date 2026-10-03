/* ============ ru_iskander.js - HERO model: 9K720 Iskander-M on the 9P78-1 TEL (MZKT-7930 8x8) ============
   Two rows, one launcher:
     pact_e00_tel   "9K720 Iskander-M, 9P78-1 TEL"   (2006)
     tel_p          "9K720 Iskander-M, 9P78-1 TEL"   (the generic pact row)
   Do NOT confuse with pact_e80_tel / pact_e90_tel (the Tochka, js/hero/ru_tochka.js).

   What each feature rests on (Wikimedia Commons photographs fetched for this model, cached in the scratchpad):
     ra  "9P78-1 TEL Iskander-M.JPG" (high three-quarter from above, Moscow parade, Russian green with a diagonal
         stripe/star marking that is NOT drawn): the long boxy body behind the cab with its roof cover made of
         transverse panels with raised ribs, a mesh vent panel and a round dome on the fixed roof between the cover
         and the cab, the cab roof with hatches and a vent box, a whip antenna, three windscreen panes, an angular
         front bumper with lamps, the fixed rear part of the body, eight big lugged tyres on dished wheels.
     rb  "Iskander demo Army-2016.jpg" (side view, TEL with the round raised, loader crane on a second vehicle, not
         drawn): wheel size (about 1.4 m), axle spacing (pairs 2.0 m apart, a long gap between the second and third
         axle), body behind the cab, cab lower than the body, the round erected about the REAR end of the body
         upright, its tail flush with the rear end of the body, within a degree or two of vertical (userData.el 1.57 rad,
         read off this photograph, not a published figure),
         round colour olive green with a long ogive nose.
     rc  "CombatLaunching2018-07/-27/-05.jpg" (field photographs, plain dark Russian green, no markings): cab with
         three flat windscreen panes, a vertical front, lamps on the bumper, wipers, a lower vent grille, mirrors on
         the front corners, a whip antenna on the cab roof near the centre line between the roof lamps (rc -05/-27; the photographs
         run off the top of the frame, so only a 2 m stub is drawn: 3.2 m high without it, 5.15 m with it), roof lamps, a ladder and a mesh-windowed hatch panel
         on the right side of the body, side panel seams, the upper body wider than the chassis with the wheels
         running under it.
   Dimensions: 12.0 m long, 3.07 m wide over the body (3.4 over the mirrors), 3.2 m to the roof (cab roof 3.13, whip to 5.15).
   Published for the MZKT-7930 chassis (Wikipedia, MZKT-7930): 12.7 m x 3.0 m x 3.29 m; the 9M723 round 7.3 m
   (Wikipedia, 9K720 Iskander).  The model is 5 percent short of the 12.7 m chassis length on purpose: Army-2016 and
   CombatLaunching2018-27 put the axles at 2.0 / 3.4 / 2.0 m, the tail 2.0 m behind the last axle and the bumper 2.5 m
   ahead of the first, which is the 12.0 m drawn; the 12.7 m is the bare chassis figure with its tow gear.
   Round dimensions, tyre (1.5 m) and cab are read off the photographs.
   TWO ROUNDS: the 9P78-1 raises ONE round at a time; the engine puts both on a single group "podelev", so both
   lie in the body side by side and BOTH rise together about one hinge at the rear of the body (the model's one
   limitation; the real launcher erects them singly). userData.cells holds two nozzles (one per round), so
   the launch flash alternates between them.
   Poses: the roof cover is drawn twice, closed in "travelpose" and in "deploypose" with its two leaves (CombatLaunching
   2018-05/-07: low flaps at the wall tops; Army-2016: a bare flat roof with the second round lying in the body, so no
   standing wall) swung out on their outer hinges and down 45 degrees (the angle, and the split into two leaves, are not
   confirmed by any photograph; the row text says one shared hinged cover).  The deploy pose also has the stabiliser
   jacks lowered: two pairs, at the body/cab joint (x = 2.46) and in the gap behind the third axle (x = -3.0); both
   Army-2016 and CombatLaunching2018-07 show a leg at the cab end of the body, only one shows the rearward one, so the
   rear pair is a best reading.  The round(s) stand about the hinge at the tail of the body (Army-2016); the engine
   raises both together (the real launcher erects one).  A round raised before the unit has deployed rises through the
   closed cover (risk).
   NOT confirmed and not drawn: the hoist/loader crane (a separate TZM vehicle), the roof railings seen folded
   in rc, the parade stripes and star, tactical numbers, the antenna mounts beyond one whip, the cab interior,
   the tow rope on the bumper.  Paint: plain dark Russian green.
   Nodes: eight "roadwheel" groups, "podelev", "travelpose", "deploypose"; NOTHING named "turret" (turret:false).
   Budget: 9,584 triangles in travel pose, 9,760 deployed, 16 draw calls at most, 6 materials.
   Materials (6): paint, dark, glass, tyre, missile paint, C.team (two small up-facing strips on the cab roof).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroIskander = (function () {
  "use strict";

  var PAINT = { base: "#48553a", blots: ["#3c472f", "#55623f", "#414d33"], seed: 7930 };
  var AXL = [3.49, 1.43, -2.03, -4.0], TY = 1.27, RT = 0.682, TS = 1.1;   /* axle x, track half, tyre radius, tyre scale */
  var HX = -5.55, HZ = 2.05, EL = 1.57;     /* the rounds' hinge (world) at the rear of the body; 86 degrees from rb */
  var X0 = -6.0, XB = 2.63, XF = 5.55, X1 = 6.0;   /* body rear, body/cab joint, cab front, bumper */
  var HW = 1.535, ZB = 1.40, ZT = 3.0, ZF = 1.5;   /* body half width, tray bottom, wall top, floor */
  var COVER_OPEN = 270 * Math.PI / 180;           /* the cover leaves swung right over to hang down the outside of the body walls: low flaps at the
                                                      wall tops and a bare open roof (CombatLaunching2018-05/-07, Army-2016), never a wall and never
                                                      wings - how far the real leaves swing is not confirmed by any photograph */
  var JX = [-3.0, 2.46];                          /* the stabiliser jacks' x: one pair in each long gap between the axles */
  var RY = 0.72;                                   /* the two rounds at y = +-RY */

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



  /* -------------------------------------------------------------- materials */
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.msl = new THREE.MeshStandardMaterial({ color: 0x6b7a50, roughness: 0.55, metalness: 0.25 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             msl: new Bin(T.msl, false), team: new Bin(T.team, false) };
  }

  /* a lugged cross-country tyre about the Y axis (two lanes of lugs a half step apart), dished wheel face and hub cap */
  /* a 1.25 m lugged cross-country tyre about the Y axis (two lanes of lugs a half step apart), with a
     dished wheel face and a hub cap each side (r1: the wheels are dished with a raised hub) */
  function tyre(bin) {
    var N = 24, R = [[-0.21, 0.37, 0, 0], [-0.21, 0.54, 0, 0], [-0.15, 0.62, 1, 0], [-0.02, 0.62, 1, 0],
                     [0.02, 0.62, 1, 1], [0.15, 0.62, 1, 1], [0.21, 0.54, 0, 0], [0.21, 0.37, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.03;
      a = j / N * TAU;
      V.push([r * Math.cos(a), R[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, R[0][0], 0], [0, R[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    for (k = -1; k <= 1; k += 2) {
      cylY(bin, 0, k * 0.19, k * 0.235, 0, 0.37, 18);
      cylY(bin, 0, k * 0.235, k * 0.285, 0, 0.15, 10);
      for (i = 0; i < 4; i++) {
        a = i / 4 * TAU + 0.4;
        box(bin, 0.26 * Math.cos(a) - 0.025, 0.26 * Math.cos(a) + 0.025, k * 0.235, k * 0.255, 0.26 * Math.sin(a) - 0.025, 0.26 * Math.sin(a) + 0.025);
      }
    }
  }


  /* a ring in (y, z) from half-width/height pairs, one side given from the centre line out; mirrored */
  function sym(x, half) {      /* half: [[y, z]...] right side from the bottom up to the roof; returns a closed ring */
    var r = [], i;
    for (i = 0; i < half.length; i++) r.push([x, half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, -half[i][0], half[i][1]]);
    return r;
  }
  /* the body tray: an open-topped U (side walls 0.135 m, floor at 1.5 m) with a chamfered underside */
  function trayRing(x) {
    return [[x, -1.30, ZB], [x, 1.30, ZB], [x, HW, 1.55], [x, HW, ZT - 0.05], [x, HW - 0.04, ZT], [x, 1.40, ZT],
            [x, 1.40, ZF], [x, -1.40, ZF], [x, -1.40, ZT], [x, -HW + 0.04, ZT], [x, -HW, ZT - 0.05], [x, -HW, 1.55]];
  }
  function cabRing(x, hw) {
    return sym(x, [[1.05, 0.95], [1.05, 1.40], [hw, 1.40], [hw, 2.82], [hw - 0.10, 2.95]]);
  }
  function side(bin, s, x0, x1, z0, z1, y, t) {      /* a thin plate on the side wall at y = s*|y| */
    box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1);
  }

  function addHull(B) {
    var s, i, k, x, a;
    /* body tray, its front wall against the cab, its low rear gate */
    loft(B.paint, [trayRing(X0), trayRing(XB)], false);
    box(B.paint, XB - 0.18, XB, -1.40, 1.40, ZF, ZT);
    box(B.paint, X0, X0 + 0.10, -1.40, 1.40, ZF, 1.85);
    /* the fixed roof plate between cover and cab, with the mesh vent panel and the round dome (ra) */
    box(B.paint, 1.98, XB, -HW + 0.03, HW - 0.03, ZT - 0.02, ZT + 0.03);
    box(B.dark, 2.05, 2.45, 0.35, 1.15, ZT + 0.03, ZT + 0.06);
    for (k = 0; k < 4; k++) box(B.paint, 2.05 + k * 0.1, 2.08 + k * 0.1, 0.35, 1.15, ZT + 0.06, ZT + 0.075);
    cylZ(B.paint, 2.28, -0.85, ZT + 0.03, ZT + 0.22, 0.24, 16);
    cylZ(B.glass, 2.28, -0.85, ZT + 0.22, ZT + 0.235, 0.15, 12);
    /* cover seats along the wall tops, edge frames fore and aft */
    for (s = -1; s <= 1; s += 2) box(B.paint, X0 + 0.1, 1.98, s * 1.40 - 0.05, s * 1.40 + 0.05, ZT, ZT + 0.03);
    /* chassis frame and its fuel tanks, lamps, cross members under the tray */
    box(B.dark, -5.7, 5.40, -1.05, 1.05, 0.62, ZB);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, -1.30, 0.55, s * 1.18, 0.98, 0.30, 14);
      /* the stabiliser jack housings under the tray, one pair behind the second axle gap and one at the body/cab joint
         (CombatLaunching2018-07 and Army-2016 show a leg at the cab end of the body and one further back), and mudguard plates */
      for (i = 0; i < JX.length; i++) {
        box(B.paint, JX[i] - 0.14, JX[i] + 0.14, s * 1.20 - 0.15, s * 1.20 + 0.15, 1.00, ZB);
        box(B.dark, JX[i] - 0.06, JX[i] + 0.06, s * 1.20 - 0.06, s * 1.20 + 0.06, 0.80, 1.00);
      }
      for (i = 0; i < 4; i++) box(B.paint, AXL[i] - 0.52, AXL[i] + 0.52, s * 1.37 - 0.02, s * 1.37 + 0.02, 1.37, 1.40);
    }
    /* body side panel seams (rc), a mesh-windowed hatch panel and the ladder on the starboard side (rc) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) box(B.dark, -4.9 + i * 1.55, -4.88 + i * 1.55, s * HW - (s < 0 ? 0.012 : 0), s * HW + (s > 0 ? 0.012 : 0), 1.62, 2.95);
      box(B.dark, X0 + 0.25, XB - 0.25, s * HW - (s < 0 ? 0.012 : 0), s * HW + (s > 0 ? 0.012 : 0), 2.12, 2.14);
    }
    box(B.dark, -3.3, -2.5, -HW - 0.02, -HW, 1.95, 2.55);
    for (i = 0; i < 3; i++) box(B.paint, -3.22 + i * 0.26, -3.15 + i * 0.26, -HW - 0.035, -HW - 0.01, 2.0, 2.5);
    bar(B.dark, [-1.45, -HW - 0.1, 0.9], [-1.45, -HW - 0.1, 2.8], 0.05);
    bar(B.dark, [-1.05, -HW - 0.1, 0.9], [-1.05, -HW - 0.1, 2.8], 0.05);
    for (i = 0; i < 6; i++) bar(B.dark, [-1.45, -HW - 0.1, 1.15 + i * 0.32], [-1.05, -HW - 0.1, 1.15 + i * 0.32], 0.035);
    /* -- the cab (ra, rc): a vertical front, three flat windscreen panes, roof hatches, vent box, lamps -- */
    loft(B.paint, [cabRing(XB, 1.48), cabRing(XF, 1.48)], false);
    box(B.paint, XF - 0.02, XF + 0.04, -1.40, 1.40, 2.78, 2.95);                              /* the brow over the panes */
    box(B.glass, XF, XF + 0.035, -1.34, -0.55, 2.00, 2.72);
    box(B.glass, XF, XF + 0.035, -0.45, 0.45, 2.00, 2.72);
    box(B.glass, XF, XF + 0.035, 0.55, 1.34, 2.00, 2.72);
    box(B.dark, XF, XF + 0.03, -0.45, 0.45, 1.50, 1.82);                                        /* lower vent grille */
    for (k = 0; k < 4; k++) box(B.paint, XF + 0.03, XF + 0.045, -0.43, 0.43, 1.54 + k * 0.08, 1.57 + k * 0.08);
    for (s = -1; s <= 1; s += 2) {                                                              /* wipers */
      bar(B.dark, [XF + 0.05, s * 0.20, 2.03], [XF + 0.05, s * 0.20 + s * 0.22, 2.60], 0.025);
      bar(B.dark, [XF + 0.05, s * 0.95, 2.03], [XF + 0.05, s * 0.95 + s * 0.22, 2.60], 0.025);
    }
    /* bumper with lamps, tow eyes (rc) */
    box(B.dark, XF, X1, -1.45, 1.45, 0.90, 1.30);
    box(B.dark, XF + 0.1, X1, -1.40, 1.40, 1.30, 1.38);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, X1 - 0.02, X1 + 0.03, s * 1.28 - 0.10, s * 1.28 + 0.10, 1.00, 1.18);
      box(B.glass, X1 - 0.02, X1 + 0.03, s * 0.90 - 0.07, s * 0.90 + 0.07, 1.02, 1.16);
      box(B.dark, X1 - 0.02, X1 + 0.04, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.95, 1.00);
    }
    /* side doors with window, handle, hinge seams, steps, mirrors on the front corners */
    for (s = -1; s <= 1; s += 2) {
      side(B.glass, s, 4.05, 5.00, 1.98, 2.66, 1.48, 0.012);
      side(B.dark, s, 3.95, 3.97, 1.45, 2.78, 1.48, 0.012);
      side(B.dark, s, 5.08, 5.10, 1.45, 2.78, 1.48, 0.012);
      side(B.dark, s, 3.95, 5.10, 1.44, 1.46, 1.48, 0.012);
      side(B.dark, s, 4.15, 4.35, 1.80, 1.86, 1.49, 0.02);
      box(B.dark, 4.10, 5.00, s * 1.20 - 0.20, s * 1.20 + 0.20, 1.02, 1.06);                 /* the cab step */
      bar(B.dark, [5.42, s * 1.50, 2.45], [5.42, s * 1.66, 2.30], 0.04);
      box(B.dark, 5.38, 5.46, s * 1.66 - (s < 0 ? 0.04 : 0), s * 1.66 + (s > 0 ? 0.04 : 0), 1.90, 2.55);
      box(B.glass, 5.46, 5.47, s * 1.66 - (s < 0 ? 0.03 : 0), s * 1.66 + (s > 0 ? 0.03 : 0), 1.95, 2.50);
      box(B.team, 3.10, 4.10, s * 0.98 - 0.125, s * 0.98 + 0.125, 2.95, 2.97);             /* the two small team strips */
    }
    /* cab roof: hatches with handles, the vent box on the rear half, roof lamps, whip antenna on the right (rc) */
    box(B.paint, 3.15, 3.85, 0.30, 0.80, 2.95, 2.99);
    box(B.paint, 3.15, 3.85, -0.80, -0.30, 2.95, 2.99);
    box(B.dark, 3.40, 3.55, 0.45, 0.65, 2.99, 3.02);
    box(B.dark, 3.40, 3.55, -0.65, -0.45, 2.99, 3.02);
    box(B.paint, 2.75, 3.05, -1.20, 1.20, 2.95, 3.12);
    box(B.dark, 2.78, 3.02, -1.0, 1.0, 3.12, 3.13);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 5.10, 5.35, s * 0.42 - 0.12, s * 0.42 + 0.12, 2.95, 3.07);
      box(B.glass, 5.35, 5.37, s * 0.42 - 0.09, s * 0.42 + 0.09, 2.97, 3.05);
    }
    cylZ(B.dark, 4.95, 0.25, 2.95, 3.08, 0.07, 10);
    bar(B.dark, [4.95, 0.25, 3.08], [4.95, 0.25, 5.15], 0.025);
  }

  /* the deployed legs: two stabiliser jack pairs (x = JX) lowered to the ground, their feet pads on z = 0 */
  function addLegs(B) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < JX.length; i++) {
      cylZ(B.dark, JX[i], s * 1.20, 0.10, 0.82, 0.055, 8);
      box(B.dark, JX[i] - 0.22, JX[i] + 0.22, s * 1.20 - 0.22, s * 1.20 + 0.22, 0.0, 0.10);
    }
  }

  /* the roof cover: two halves of transverse panels with ribs, hinged on the outer wall tops (y = s*1.50, z = 3.0), meeting on
     the centre line when shut (ra: panel joints across the cover).  th = rotation from shut about the hinge */
  function cover(B, th) {
    var s, c = Math.cos(th), sn = Math.sin(th), i, hw = th > Math.PI ? 1.60 : 1.50, t = 0.06, w = 1.46, x0 = -5.92, x1 = 1.96;
    function pt(s, u, h, x) {            /* u inward from the hinge, h above the leaf plane */
      var dy = -s * c * u + s * sn * h, dz = sn * u + c * h;
      return [x, s * hw + dy, ZT + 0.03 + dz];
    }
    function slab(s, xa, xb, ua, ub, ha, hb) {
      hexa(B.paint, [pt(s, ua, ha, xa), pt(s, ub, ha, xa), pt(s, ub, ha, xb), pt(s, ua, ha, xb),
                     pt(s, ua, hb, xa), pt(s, ub, hb, xa), pt(s, ub, hb, xb), pt(s, ua, hb, xb)]);
    }
    for (s = -1; s <= 1; s += 2) {
      slab(s, x0, x1, 0, w, 0, t);                                   /* the leaf */
      slab(s, x0, x1, w - 0.05, w, t - 0.01, t + 0.04);                     /* flange rim on the inner edge */
      slab(s, x0, x1, 0, 0.05, t - 0.01, t + 0.04);                         /* and on the hinge edge */
      for (i = 0; i < 7; i++) slab(s, x0 + 0.20 + i * 1.10, x0 + 0.27 + i * 1.10, 0.05, w - 0.05, t - 0.01, t + 0.03);   /* panel ribs */
      for (i = 0; i < 4; i++) slab(s, x0 + 0.1 + i * 1.95, x0 + 1.7 + i * 1.95, -0.05, 0.05, -0.04, 0.05);        /* hinge barrels */
    }
  }

  /* the 9M723 rounds and their cradle, local x along the body from the tail, axis at z = 0 */
  function addRounds(B) {
    var i, k, a, ca, sa, V, q, hh, pts, c, sx, j, xs = [1.0, 3.1, 4.9];
    for (c = -1; c <= 1; c += 2) {
      sx = c * RY;
      revolve(B.msl, [[0.00, 0.34], [0.12, 0.40], [0.45, 0.455], [0.95, 0.475], [5.00, 0.475], [5.50, 0.455], [6.00, 0.40],
                      [6.55, 0.30], [7.00, 0.17], [7.25, 0.06], [7.30, 0.0]], sx, 0, 28);
      for (i = 0; i < 3; i++) revolve(B.dark, [[xs[i] - 0.05, 0.480], [xs[i] + 0.05, 0.480]], sx, 0, 24);
      cyl(B.dark, [-0.12, sx, 0], [0.04, sx, 0], 0.22, 0.30, 14);                                  /* the nozzle */
      for (i = 0; i < 4; i++) {
        a = Math.PI / 4 + i * Math.PI / 2; ca = Math.cos(a); sa = Math.sin(a);
        pts = [[0.05, 0.44], [0.75, 0.47], [0.62, 0.64], [0.22, 0.64]]; V = [];
        for (k = 0; k < 8; k++) {
          q = pts[k % 4]; hh = k < 4 ? -0.02 : 0.02;
          V.push([q[0], sx + q[1] * ca - hh * sa, q[1] * sa + hh * ca]);
        }
        hexa(B.msl, V);
      }
      /* the erector tray under each round and its saddles */
      box(B.dark, 0.05, 5.60, sx - 0.20, sx + 0.20, -0.56, -0.50);
      for (i = 0; i < 3; i++) {
        box(B.dark, xs[i] - 0.14, xs[i] + 0.14, sx - 0.36, sx + 0.36, -0.52, -0.30);
      }
    }
    box(B.dark, -0.12, 0.12, -1.25, 1.25, -0.58, -0.40);          /* the hinge beam across */
    for (c = -1; c <= 1; c += 2) box(B.dark, -0.18, 0.18, c * 1.25 - 0.06, c * 1.25 + 0.06, -0.58, -0.30);
  }

  function build(THREE, M, C, key) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), EB = bins(T), TR = bins(T), DP = bins(T), i, s, wg, wm, geo, E, TB, trg, dpg;
    addHull(HB);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre, false);
    tyre(TB);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < AXL.length; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(AXL[i], s * TY, RT);
        wm = new THREE.Mesh(geo, T.tyre);
        wm.scale.set(TS, TS, TS);
        if (s < 0) wm.rotation.y = Math.PI / 24;
        wg.add(wm);
        g.add(wg);
      }
    }
    cover(TR, 0);
    trg = new THREE.Group(); trg.name = "travelpose";
    flush(THREE, trg, { paint: TR.paint });
    g.add(trg);
    cover(DP, COVER_OPEN);
    addLegs(DP);
    dpg = new THREE.Group(); dpg.name = "deploypose"; dpg.visible = false;
    flush(THREE, dpg, { paint: DP.paint, dark: DP.dark });
    g.add(dpg);
    addRounds(EB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(HX, 0, HZ);
    flush(THREE, E, { dark: EB.dark, msl: EB.msl });
    E.userData.el = EL;
    E.userData.cells = [[0.50, RY, 0, -0.25], [0.50, -RY, 0, -0.25]];
    g.add(E);
    g.name = key;
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: bumper to rear gate */
UNIT_MODELS["pact_e00_tel"] = {
  len: 12.0,
  build: function (THREE, M, C) { return HeroIskander.build(THREE, M, C, "pact_e00_tel"); }
};
UNIT_MODELS["tel_p"] = {
  len: 12.0,
  build: function (THREE, M, C) { return HeroIskander.build(THREE, M, C, "tel_p"); }
};
