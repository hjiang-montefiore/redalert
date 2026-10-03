/* ===== us_early_rockets.js - HERO models: the 1950s-60s US Army rocket and missile launchers
   nato_e50_mlrs  "MGR-1A Honest John free-flight rocket"  (turret:true)
   nato_e50_tel   "MGM-5 Corporal guided missile"           (turret:false)
   The old models were parametric trucks with the rocket guessed on top.  These are drawn from
   published figures and from photographs (Wikipedia/Wikimedia Commons; the US Army / JPL
   Corporal photographs MGM-5 Corporal 02, 03, 05 and "Corporal mammoth vehicle transporter";
   the Nationaal Archief photographs of the Dutch Army's M139D Honest John launcher and of
   the Dutch vehicle line-up on the Honest John page).

   ---- MGR-1A HONEST JOHN (nato_e50_mlrs) -------------------------------------------------
   Rocket (M31, the MGR-1A): 8.30 m long, 30 in (0.76 m) warhead, 22.9 in (0.58 m) motor,
   fin span 2.77 m (the MGR-1B had small fins, 1.37 m, so it is NOT this one), 5,820 lb with
   the nuclear warhead.  The launcher that goes with it is the M289 "truck, rocket launcher",
   carried on the M139 chassis, the 5-ton 6x6 of the M39 series (Wikipedia, "Support
   vehicles", "M39 series": the M139C/D chassis cab is the largest of the family: wheelbase
   215 in = 5.46 m, length 29 ft 5 in = 8.97 m, width 9 ft 6 in = 2.90 m, 14.00x20 tyres;
   the series' standard dual rear tyres are drawn, the photograph does not settle it).  The
   short-rail M386, also on the M139, is a separate launcher and is not drawn.
   What the Dutch M139D photograph shows and this builds: the M39-series cab (tall flat-roofed
   box, flat two-pane windscreen) behind a long flat-faced hood with a plate bumper and a
   winch roller; the long box-section launch beam on a pedestal at the tail with the rocket
   riding on it, warhead forward, big cruciform fins at the tail; the beam raised (the
   photograph shows about 27 degrees) with its forward end running well past the rocket nose
   and the bumper.  Chosen here: the beam raised 18 degrees, so that the unit reads as a
   launcher from the game camera; it is a posture, not equipment.  The stabiliser jacks the
   photograph shows lowered are drawn raised (travelling).  NOT CONFIRMED: the rail length
   (no published figure found; 10.4 m is drawn, the rocket plus a 1.7 m run beyond its nose);
   the rocket paint (olive drab, no bands drawn).
   The launcher (beam, rams, rocket) is the node "turret", its origin on the beam's own mount
   (the trunnion pin over the tail pedestal), the rocket pointing along +X, so the game's
   training swings the beam about that mount; the truck, the cab, the jacks and the pedestal
   stay with the hull.  The width is the published 2.90 m (deck and tyres).

   ---- MGM-5 CORPORAL (nato_e50_tel) --------------------------------------------------------
   Missile: 45 ft 4 in (13.82 m), 30 in (0.76 m), fin span about 7 ft (2.1 m), 11,000 lb,
   liquid-fuelled; white, with a black aft section (to about 2.25 m from the tail) and one black
   band just ahead of it (about 2.55-3.10 m), as photograph 03 shows (measured on that photograph,
   +-0.2 m); the black rings at about 3.65 m and 10.9 m are the erector boom's clamps.
   The Corporal was erected onto a launch stand from an erector trailer; the references show
   the erector (a long low beam with a big arched casting and a round pivot disc over a single
   big-tyred axle at the rear, the missile on a boom hinged at that disc, tail at the hinge)
   coupled to a heavy truck-tractor with a twin-roof cab on big single tyres (photograph 02
   and the "mammoth vehicle transporter" photograph).  ONE game vehicle is drawn: that tractor
   and that erector with the missile on its boom, nose forward over the tractor, the boom
   raised 24 degrees, as it stands in photograph 02 (which is steeper).  The launch stand
   itself is a separate ground item and is not drawn.
   NOT CONFIRMED: the tractor's designation (the older parametric model said "M52"; the
   photographs show a twin-roof cab that does not look like the single M39-series cab, so no
   designation is written), its axle count (one wheel station is visible under the cab; a
   rear tandem is assumed to carry the trailer), the length of the beam, the exact band
   positions on the missile.  Lengths are scaled so that the missile is the published 13.82 m.  The
   old model was 17.65 m long; this rig is 13.4 m.

   Game use (render3d.js): nato_e50_mlrs trains the node "turret"; nato_e50_tel has none (and
   no node of that name).  Wheels are "roadwheel" groups, one per AXLE (both tyres of the
   axle turn in one mesh, axle on local Y).  Team colour is C.team exactly (cab roofs and
   the trailer beam; the Honest John's deck panels), so the era kit leaves it alone.
   Draw calls: Honest John 8, Corporal 8.  Materials: four (paint, vertex colour, glass, team).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.
   ASCII only.                                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsEarlyRockets = (function () {
  "use strict";

  /* ---------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  /* sRGB hex -> linear triple: a colour ATTRIBUTE is read raw by three, only material colours
     are linearised by prepModel(). */
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var K = {
    rub: lin(0x1b1b19), dkg: lin(0x2e2f2b), frame: lin(0x363730), od: lin(0x4a5a2e), odd: lin(0x3a4825),
    odl: lin(0x5d6c3a), steel: lin(0x7d8082), rim: lin(0x4d4f44), hub: lin(0x6a6c64),
    lamp: lin(0xf2ebc9), white: lin(0xe9e7de), band: lin(0x1d1d1b), warm: lin(0xcfc9b6)
  };

  /* ------------------------------------------------------------- paint tex */
  /* US olive drab, the value the M60A1 hero uses for the same era (armour3d PAINT.olive is
     #4a5236 and the tone map lifts it, so the canvas is a touch greener).  One canvas per page. */
  var _cv = null;
  function paintCanvas() {
    if (_cv) return _cv;
    var R = rng(5051), W = 256, H = 256, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#4a5a2e"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 34; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(51,63,32,0.12)" : "rgba(105,118,60,0.10)";
      q.fillRect(R() * W, R() * H, 20 + R() * 80, 14 + R() * 56);
    }
    q.fillStyle = "rgba(40,46,24,0.18)";
    for (i = 0; i < 24; i++) q.fillRect(R() * W, R() * H * 0.8, 6 + R() * 28, 1 + R() * 2);
    var gr = q.createLinearGradient(0, H * 0.72, 0, H);
    gr.addColorStop(0, "rgba(110,98,70,0.00)");
    gr.addColorStop(1, "rgba(110,98,70,0.42)");
    q.fillStyle = gr; q.fillRect(0, H * 0.72, W, H * 0.28);
    _cv = cv;
    return cv;
  }
  function paintTex(THREE) {
    try {
      var t = new THREE.CanvasTexture(paintCanvas());
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }
  function makeMats(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.90, metalness: 0.04 });
    if (tx) T.paint.map = tx; else T.paint.color.setHex(0x4a5a2e);
    /* everything dark, white or small and coloured: one mesh, colour per vertex */
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.84, metalness: 0.06 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2830, roughness: 0.12, metalness: 0.35 });
    /* the owner's colour exactly, so the era kit leaves it alone */
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    return T;
  }
  /* World-position UVs for the paint: sides take (along, height), tops the cleaner upper part. */
  function worldUV(P) {
    var n = P.length / 9, U = new Float32Array(n * 6), t, k;
    for (t = 0; t < n; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (k = 0; k < 3; k++) {
        var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / 4; v = 0.55 + 0.4 * (y / 4 - Math.floor(y / 4)); }
        else if (ny >= nx) { u = x / 4; v = Math.min(0.999, Math.max(0.001, z / 3.2)); }
        else { u = y / 4 + 0.37; v = Math.min(0.999, Math.max(0.001, z / 3.2)); }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
    return U;
  }

  /* ----------------------------------------------------------------- frame */
  /* A turned frame: u along the beam, v across it (up), w to the left.  p() maps a point,
     d() a direction. */
  function Fr(o, ex, ey, ez) { this.o = o; this.ex = ex; this.ey = ey; this.ez = ez; }
  Fr.prototype.p = function (u, v, w) {
    return [this.o[0] + this.ex[0] * u + this.ey[0] * v + this.ez[0] * w,
            this.o[1] + this.ex[1] * u + this.ey[1] * v + this.ez[1] * w,
            this.o[2] + this.ex[2] * u + this.ey[2] * v + this.ez[2] * w];
  };
  Fr.prototype.d = function (u, v, w) {
    return [this.ex[0] * u + this.ey[0] * v + this.ez[0] * w,
            this.ex[1] * u + this.ey[1] * v + this.ez[1] * w,
            this.ex[2] * u + this.ey[2] * v + this.ez[2] * w];
  };
  function turned(o, ang) {
    var c = Math.cos(ang), s = Math.sin(ang);
    return new Fr(o, [c, 0, s], [-s, 0, c], [0, 1, 0]);
  }

  /* --------------------------------------------------------------- baking */
  /* Triangle soup per material, one mesh per material at the end.  ox shifts everything
     along X as it is stored (the Corporal is drawn from its front axle). */
  function Baker(THREE) { this.T = THREE; this.by = []; this.ox = 0; }
  Baker.prototype.slot = function (mat) {
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) return this.by[i];
    var s = { mat: mat, P: [], N: [], C: [], vc: !!mat.vertexColors };
    this.by.push(s);
    return s;
  };
  Baker.prototype.put = function (mat, a, b, c, na, nb, nc, col) {
    var s = this.slot(mat), ox = this.ox;
    s.P.push(a[0] + ox, a[1], a[2], b[0] + ox, b[1], b[2], c[0] + ox, c[1], c[2]);
    s.N.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
    if (s.vc) { var k = col || K.dkg; s.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]); }
  };
  function crossN(a, b, c) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
  }
  /* flat triangle */
  Baker.prototype.tri = function (mat, a, b, c, col) {
    var n = crossN(a, b, c), l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    if (l < 1e-9) return;
    n = [n[0] / l, n[1] / l, n[2] / l];
    this.put(mat, a, b, c, n, n, n, col);
  };
  /* triangle with given vertex normals; the winding follows the normals */
  Baker.prototype.triN = function (mat, a, b, c, na, nb, nc, col) {
    var g = crossN(a, b, c);
    if (g[0] * g[0] + g[1] * g[1] + g[2] * g[2] < 1e-14) return;
    var d = g[0] * (na[0] + nb[0] + nc[0]) + g[1] * (na[1] + nb[1] + nc[1]) + g[2] * (na[2] + nb[2] + nc[2]);
    if (d < 0) this.put(mat, a, c, b, na, nc, nb, col); else this.put(mat, a, b, c, na, nb, nc, col);
  };
  /* wound so that it faces AWAY from a hint point: exact for any convex part */
  Baker.prototype.triAway = function (mat, a, b, c, hint, col) {
    var n = crossN(a, b, c);
    var mx = (a[0] + b[0] + c[0]) / 3 - hint[0], my = (a[1] + b[1] + c[1]) / 3 - hint[1], mz = (a[2] + b[2] + c[2]) / 3 - hint[2];
    if (n[0] * mx + n[1] * my + n[2] * mz < 0) this.tri(mat, a, c, b, col); else this.tri(mat, a, b, c, col);
  };
  Baker.prototype.quad = function (mat, a, b, c, d, hint, col) {
    this.triAway(mat, a, b, c, hint, col);
    this.triAway(mat, a, c, d, hint, col);
  };
  var BF = [["-z", 0, 3, 2, 1], ["+z", 4, 5, 6, 7], ["-y", 0, 1, 5, 4], ["+y", 3, 7, 6, 2], ["-x", 0, 4, 7, 3], ["+x", 1, 2, 6, 5]];
  /* box from its corners; skip = e.g. "-z" or "-z -x" to leave buried faces off */
  Baker.prototype.box = function (mat, x0, x1, y0, y1, z0, z1, col, skip) {
    var c = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
    var h = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    for (var i = 0; i < 6; i++) {
      if (skip && skip.indexOf(BF[i][0]) >= 0) continue;
      this.quad(mat, c[BF[i][1]], c[BF[i][2]], c[BF[i][3]], c[BF[i][4]], h, col);
    }
  };
  /* the same box in a turned frame (u, v, w) */
  Baker.prototype.obox = function (mat, F, u0, u1, v0, v1, w0, w1, col) {
    var q = [[u0, v0, w0], [u1, v0, w0], [u1, v1, w0], [u0, v1, w0], [u0, v0, w1], [u1, v0, w1], [u1, v1, w1], [u0, v1, w1]], c = [], i;
    for (i = 0; i < 8; i++) c.push(F.p(q[i][0], q[i][1], q[i][2]));
    var h = F.p((u0 + u1) / 2, (v0 + v1) / 2, (w0 + w1) / 2);
    for (i = 0; i < 6; i++) this.quad(mat, c[BF[i][1]], c[BF[i][2]], c[BF[i][3]], c[BF[i][4]], h, col);
  };
  /* smooth-sided cylinder along a world axis ("x", "y" or "z") */
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, col) {
    var THREE = this.T;
    var geo = new THREE.CylinderGeometry(r, r, len, seg, 1, false).toNonIndexed();
    var m = new THREE.Matrix4();
    if (axis === "x") m.makeRotationZ(-Math.PI / 2); else if (axis === "z") m.makeRotationX(Math.PI / 2);
    m.setPosition(x, y, z);
    geo.applyMatrix4(m);
    var p = geo.attributes.position.array, n = geo.attributes.normal.array, s = this.slot(mat), i;
    for (i = 0; i < p.length; i++) { s.P.push(i % 3 === 0 ? p[i] + this.ox : p[i]); s.N.push(n[i]); }
    if (s.vc) { var k = col || K.dkg; for (i = 0; i < p.length / 3; i++) s.C.push(k[0], k[1], k[2]); }
  };
  /* a round rod between two points, with end caps */
  Baker.prototype.rod = function (mat, p1, p2, r, seg, col) {
    var d = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]], l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), k;
    if (l < 1e-6) return;
    d = [d[0] / l, d[1] / l, d[2] / l];
    var up = Math.abs(d[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var e1 = [d[1] * up[2] - d[2] * up[1], d[2] * up[0] - d[0] * up[2], d[0] * up[1] - d[1] * up[0]];
    var l1 = Math.sqrt(e1[0] * e1[0] + e1[1] * e1[1] + e1[2] * e1[2]);
    e1 = [e1[0] / l1, e1[1] / l1, e1[2] / l1];
    var e2 = [d[1] * e1[2] - d[2] * e1[1], d[2] * e1[0] - d[0] * e1[2], d[0] * e1[1] - d[1] * e1[0]];
    var nd = [-d[0], -d[1], -d[2]];
    for (k = 0; k < seg; k++) {
      var t0 = k * 6.283185307 / seg, t1 = (k + 1) * 6.283185307 / seg, c0 = Math.cos(t0), s0 = Math.sin(t0), c1 = Math.cos(t1), s1 = Math.sin(t1);
      var n0 = [e1[0] * c0 + e2[0] * s0, e1[1] * c0 + e2[1] * s0, e1[2] * c0 + e2[2] * s0];
      var n1 = [e1[0] * c1 + e2[0] * s1, e1[1] * c1 + e2[1] * s1, e1[2] * c1 + e2[2] * s1];
      var a = [p1[0] + r * n0[0], p1[1] + r * n0[1], p1[2] + r * n0[2]], b = [p2[0] + r * n0[0], p2[1] + r * n0[1], p2[2] + r * n0[2]];
      var c = [p2[0] + r * n1[0], p2[1] + r * n1[1], p2[2] + r * n1[2]], e = [p1[0] + r * n1[0], p1[1] + r * n1[1], p1[2] + r * n1[2]];
      this.triN(mat, a, b, c, n0, n0, n1, col);
      this.triN(mat, a, c, e, n0, n1, n1, col);
      this.triN(mat, p1, e, a, nd, nd, nd, col);
      this.triN(mat, p2, b, c, d, d, d, col);
    }
  };
  /* A surface of revolution.  pts = [axial, radial, groove] walked from one end of the axis,
     out along the skin and back to the axis at the other end; cols[i] paints segment i.
     pos(t, r, th) and dir(nt, nr, th) map the profile into the model.  A groove value makes
     every second step of the ring that much smaller: the zig-zag is a tyre's lug pattern, and
     it is what shows the wheel turning.  Normals are smooth except across edges sharper than
     about 37 degrees. */
  Baker.prototype.rev = function (mat, pts, cols, N, pos, dir) {
    var n = pts.length, SN = [], i, k;
    for (i = 0; i + 1 < n; i++) {
      var dt = pts[i + 1][0] - pts[i][0], dr = pts[i + 1][1] - pts[i][1], l = Math.sqrt(dt * dt + dr * dr) || 1;
      SN.push([-dr / l, dt / l]);
    }
    function vn(j, end) {
      var a = SN[j], b = SN[end ? j + 1 : j - 1];
      if (!b) return a;
      if (a[0] * b[0] + a[1] * b[1] < 0.80) return a;
      var m0 = a[0] + b[0], m1 = a[1] + b[1], ll = Math.sqrt(m0 * m0 + m1 * m1) || 1;
      return [m0 / ll, m1 / ll];
    }
    for (i = 0; i + 1 < n; i++) {
      var p0 = pts[i], p1 = pts[i + 1], n0 = vn(i, 0), n1 = vn(i, 1), g0 = p0[2] || 0, g1 = p1[2] || 0;
      for (k = 0; k < N; k++) {
        var t0 = k * 6.283185307 / N, t1 = (k + 1) * 6.283185307 / N;
        var o0 = (k & 1) ? 1 : 0, o1 = ((k + 1) & 1) ? 1 : 0;
        var A = pos(p0[0], p0[1] - g0 * o0, t0), Bv = pos(p1[0], p1[1] - g1 * o0, t0);
        var Cv = pos(p1[0], p1[1] - g1 * o1, t1), D = pos(p0[0], p0[1] - g0 * o1, t1);
        var nA = dir(n0[0], n0[1], t0), nB = dir(n1[0], n1[1], t0), nC = dir(n1[0], n1[1], t1), nD = dir(n0[0], n0[1], t1);
        this.triN(mat, A, Bv, Cv, nA, nB, nC, cols[i]);
        this.triN(mat, A, Cv, D, nA, nC, nD, cols[i]);
      }
    }
  };
  /* a thin fin standing off a body axis: poly = [axial, radial] corners, phi = angle round the
     axis from the frame's v, thick = its thickness.  Two faces, edges left open. */
  Baker.prototype.fin = function (mat, F, vOff, phi, poly, thick, col) {
    var cp = Math.cos(phi), sp = Math.sin(phi), h = thick / 2, i, A = [], Bk = [];
    for (i = 0; i < poly.length; i++) {
      var u = poly[i][0], r = poly[i][1];
      A.push(F.p(u, vOff + r * cp - h * sp, r * sp + h * cp));
      Bk.push(F.p(u, vOff + r * cp + h * sp, r * sp - h * cp));
    }
    var na = F.d(0, -sp, cp), nb = F.d(0, sp, -cp);
    for (i = 1; i + 1 < poly.length; i++) {
      this.triN(mat, A[0], A[i], A[i + 1], na, na, na, col);
      this.triN(mat, Bk[0], Bk[i], Bk[i + 1], nb, nb, nb, col);
    }
  };
  Baker.prototype.take = function (mat) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) {
      var e = this.by.splice(i, 1)[0];
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(e.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(e.N), 3));
      if (e.vc) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(e.C), 3));
      geo.computeBoundingSphere();
      return geo;
    }
    return null;
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i];
      var P = new Float32Array(e.P), N = new Float32Array(e.N);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      if (e.mat.map) geo.setAttribute("uv", new THREE.BufferAttribute(worldUV(P), 2));
      if (e.vc) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(e.C), 3));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* ------------------------------------------------------------------ wheels */
  /* One tyre, axle on local Y, centred at y = cy, the outer face (rim and hub) on +Y for
     side = +1 and on -Y for side = -1.  R is the radius over the lugs, W the section width. */
  function tyre(B, mat, cy, R, W, side, N) {
    var y0 = -W / 2, y1 = W / 2, g = 0.035;
    var pts = [[y0, 0, 0], [y0, R * 0.52, 0], [y0 + W * 0.02, R * 0.90, 0], [y0 + W * 0.16, R, g], [y1 - W * 0.16, R, g],
               [y1 - W * 0.02, R * 0.90, 0], [y1 - W * 0.03, R * 0.60, 0], [y1 - W * 0.14, R * 0.58, 0],
               [y1 - W * 0.14, R * 0.22, 0], [y1 - W * 0.04, R * 0.20, 0], [y1 - W * 0.04, 0, 0]];
    var cols = [K.rub, K.rub, K.rub, K.rub, K.rub, K.rub, K.rim, K.hub, K.hub, K.hub];
    if (side < 0) {
      pts = pts.map(function (p) { return [-p[0], p[1], p[2]]; }).reverse();
      cols = cols.slice().reverse();
    }
    B.rev(mat, pts, cols, N,
      function (t, r, th) { return [r * Math.cos(th), cy + t, r * Math.sin(th)]; },
      function (nt, nr, th) { return [nr * Math.cos(th), nt, nr * Math.sin(th)]; });
  }
  /* One axle: a "roadwheel" group at (x, 0, R) whose single mesh holds every tyre on it, so
     the engine spins the whole axle with one rotation.y.  tyres = [[y, side], ...]. */
  function axleGroup(THREE, mat, x, R, W, tyres, N) {
    var B = new Baker(THREE), i;
    for (i = 0; i < tyres.length; i++) tyre(B, mat, tyres[i][0], R, W, tyres[i][1], N);
    var w = new THREE.Group();
    w.name = "roadwheel";
    w.position.set(x, 0, R);
    var wm = new THREE.Mesh(B.take(mat), mat);
    wm.castShadow = true; wm.receiveShadow = true;
    w.add(wm);
    return w;
  }

  /* ======================================================================== */
  /* ===================== MGR-1A HONEST JOHN on the M289 / M139 ============ */
  /* ======================================================================== */
  function buildHJ(THREE, M, C) {
    var T = makeMats(THREE, C), P = T.paint, V = T.vc, GL = T.glass, TM = T.team;
    var g = new THREE.Group();
    g.name = "us_honest_john";
    var B = new Baker(THREE);
    var s, i;

    /* figures: M139C/D chassis cab 8.97 m, wheelbase 5.46 m to the middle of the tandem, 14.00x20 */
    var XF = 3.19, XR = [-1.61, -2.93], R = 0.625, TW = 0.36, YF = 1.15, YR = 1.05, YD = 0.20;
    var ZG = 2.30;                               /* the launcher's ring: beam pivot height */

    /* ---- chassis ---- */
    for (s = -1; s <= 1; s += 2) {
      B.box(V, -4.40, 4.15, s > 0 ? 0.36 : -0.46, s > 0 ? 0.46 : -0.36, 0.90, 1.22, K.frame);
    }
    for (i = 0; i < 5; i++) {
      var cx = [-4.20, -2.30, -0.50, 1.50, 3.40][i];
      B.box(V, cx - 0.07, cx + 0.07, -0.46, 0.46, 0.94, 1.10, K.frame);
    }
    /* axle beams, differentials, springs */
    B.cyl(V, 0.085, 1.96, 8, XF, 0, R, "y", K.dkg);
    B.box(V, XF - 0.20, XF + 0.20, -0.20, 0.20, 0.42, 0.80, K.dkg);
    for (i = 0; i < 2; i++) {
      B.cyl(V, 0.085, 1.70, 8, XR[i], 0, R, "y", K.dkg);
      B.box(V, XR[i] - 0.22, XR[i] + 0.22, -0.22, 0.22, 0.42, 0.84, K.dkg);
    }
    for (s = -1; s <= 1; s += 2) {
      var sy = s > 0 ? 0.52 : -0.68;
      B.box(V, XF - 0.62, XF + 0.62, sy, sy + 0.16, 0.84, 0.92, K.frame);
      B.box(V, XR[0] - 0.62, XR[0] + 0.62, sy, sy + 0.16, 0.84, 0.92, K.frame);
      B.box(V, XR[1] - 0.62, XR[1] + 0.62, sy, sy + 0.16, 0.84, 0.92, K.frame);
      B.box(V, XR[1], XR[0], sy + 0.04, sy + 0.12, 0.80, 0.90, K.frame);
    }

    /* ---- front: bumper with the winch roller, hood, grille, lamps, fenders ---- */
    B.box(V, 4.20, 4.48, -1.20, 1.20, 0.72, 1.02, K.dkg);
    B.cyl(V, 0.07, 1.70, 8, 4.34, 0, 0.88, "y", K.steel);
    B.box(P, 2.40, 3.92, -0.76, 0.76, 1.28, 2.02);
    B.box(V, 3.92, 3.99, -0.62, 0.62, 1.30, 1.96, K.dkg);
    for (s = -1; s <= 1; s += 2) {
      B.box(V, 3.90, 4.00, s > 0 ? 0.68 : -0.84, s > 0 ? 0.84 : -0.68, 1.62, 1.80, K.lamp);
      /* fender over the front tyre, and its front lip */
      B.box(P, 2.52, 4.12, s > 0 ? 0.80 : -1.42, s > 0 ? 1.42 : -0.80, 1.30, 1.37);
      B.box(P, 3.98, 4.12, s > 0 ? 0.80 : -1.42, s > 0 ? 1.42 : -0.80, 1.00, 1.37);
      /* mirror on its arm */
      B.box(V, 2.30, 2.34, s > 0 ? 1.28 : -1.34, s > 0 ? 1.34 : -1.28, 1.94, 2.36, K.dkg);
      B.box(V, 2.20, 2.30, s > 0 ? 1.16 : -1.18, s > 0 ? 1.18 : -1.16, 2.28, 2.32, K.dkg);
    }

    /* ---- cab: tall flat-roofed box, flat two-pane windscreen ---- */
    B.box(P, 0.55, 2.40, -1.14, 1.14, 1.26, 2.70);
    B.box(GL, 2.40, 2.415, -1.04, -0.05, 1.88, 2.52);
    B.box(GL, 2.40, 2.415, 0.05, 1.04, 1.88, 2.52);
    for (s = -1; s <= 1; s += 2) {
      B.box(GL, 1.12, 2.26, s > 0 ? 1.14 : -1.155, s > 0 ? 1.155 : -1.14, 1.88, 2.52);
      B.box(V, 1.10, 1.14, s > 0 ? 1.14 : -1.16, s > 0 ? 1.16 : -1.14, 1.34, 2.60, K.odd);      /* door pillar */
    }
    B.box(GL, 0.535, 0.55, -0.5, 0.5, 1.92, 2.38);
    B.box(TM, 0.88, 2.12, -0.92, 0.92, 2.70, 2.725);

    /* ---- the deck behind the cab, side valances, the launcher's pedestal ---- */
    B.box(P, -4.40, 0.50, -1.45, 1.45, 1.38, 1.47);
    for (s = -1; s <= 1; s += 2) {
      B.box(V, -3.72, -0.78, s > 0 ? 1.37 : -1.45, s > 0 ? 1.45 : -1.37, 1.20, 1.40, K.frame);
      B.box(TM, -3.30, -0.95, s > 0 ? 0.52 : -1.02, s > 0 ? 1.02 : -0.52, 1.47, 1.48);
    }
    B.box(P, -4.12, -3.58, -0.58, 0.58, 1.47, 1.86);
    B.box(V, -3.60, 0.40, -0.40, 0.40, 1.47, 1.56, K.frame);                      /* the sub-frame the mount rides on */
    /* stabiliser jacks, raised: a leg and a pad at each corner */
    for (s = -1; s <= 1; s += 2) {
      var jy = s > 0 ? 1.00 : -1.12;
      B.box(V, 4.24, 4.36, jy, jy + 0.12, 0.64, 1.04, K.dkg);
      B.box(V, 4.12, 4.46, jy - 0.06, jy + 0.18, 0.58, 0.65, K.dkg);
      B.box(V, -4.36, -4.24, jy, jy + 0.12, 0.64, 1.40, K.dkg);
      B.box(V, -4.46, -4.12, jy - 0.06, jy + 0.18, 0.58, 0.65, K.dkg);
    }
    B.flush(g);

    /* ---- six wheels in three turning axle groups; the rear axles carry dual tyres ---- */
    g.add(axleGroup(THREE, V, XF, R, TW, [[YF, 1], [-YF, -1]], 24));
    for (i = 0; i < 2; i++)
      g.add(axleGroup(THREE, V, XR[i], R, TW, [[YR + YD, 1], [YR - YD, 1], [-YR - YD, -1], [-YR + YD, -1]], 24));

    /* ---- the launcher: beam, rams, rocket.  Node "turret", its ring on the tail pedestal ---- */
    /* The game trains the node about its own Z, so the origin is the launcher's own mount (the
       trunnion pin on the pedestal at the tail): the beam then swings round its pedestal and the
       rocket never leaves the truck.  The geometry below is written in truck coordinates and
       stored relative to the ring (TB.ox). */
    var XP = -3.85;
    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(XP, 0, ZG);
    var TB = new Baker(THREE);
    TB.ox = -XP;
    var F = turned([XP, 0, 0], 18 * Math.PI / 180);       /* pivot at the tail pedestal; local z is above ZG */
    /* ears on the pedestal and the trunnion pin */
    TB.box(V, -4.05, -3.65, 0.26, 0.40, 1.47 - ZG, 2.16 - ZG, K.od);
    TB.box(V, -4.05, -3.65, -0.40, -0.26, 1.47 - ZG, 2.16 - ZG, K.od);
    TB.cyl(V, 0.08, 1.00, 10, -3.85, 0, 2.02 - ZG, "y", K.dkg);
    /* beam: box section, then the narrower run beyond the nose */
    TB.obox(V, F, -0.40, 8.80, -0.46, 0.0, -0.26, 0.26, K.od);
    TB.obox(V, F, 8.80, 10.00, -0.34, -0.06, -0.17, 0.17, K.od);
    TB.obox(V, F, -0.40, 10.00, -0.02, 0.05, -0.20, -0.14, K.odd);                /* guide rails along the top */
    TB.obox(V, F, -0.40, 10.00, -0.02, 0.05, 0.14, 0.20, K.odd);
    /* cradle shoes carrying the rocket */
    TB.obox(V, F, 0.90, 1.34, 0.0, 0.32, -0.17, 0.17, K.odd);
    TB.obox(V, F, 3.90, 4.34, 0.0, 0.32, -0.17, 0.17, K.odd);
    TB.obox(V, F, 6.50, 6.94, 0.0, 0.24, -0.17, 0.17, K.odd);
    /* the elevating rams, vertical from the sub-frame to the beam's underside */
    for (s = -1; s <= 1; s += 2) TB.rod(V, [-0.29, s * 0.20, 1.56 - ZG], [-0.29, s * 0.20, 2.96 - ZG], 0.075, 10, K.steel);
    TB.box(V, -0.55, -0.03, -0.36, 0.36, 1.56 - ZG, 1.64 - ZG, K.dkg);
    /* the rocket: nozzle, motor tube, taper to the 30 in warhead, ogive */
    var VO = 0.60;
    var prof = [[0.00, 0.00], [0.00, 0.22], [0.28, 0.27], [0.40, 0.29], [5.35, 0.29], [5.90, 0.38], [6.95, 0.38],
                [7.35, 0.355], [7.70, 0.295], [7.98, 0.21], [8.18, 0.11], [8.28, 0.04], [8.30, 0.00]];
    var pcol = [K.dkg, K.dkg, K.odd, K.odd, K.od, K.od, K.od, K.od, K.od, K.od, K.od, K.od];
    TB.rev(V, prof, pcol, 20,
      function (t, r, th) { return F.p(t + 0.05, VO + r * Math.cos(th), r * Math.sin(th)); },
      function (nt, nr, th) { return F.d(nt, nr * Math.cos(th), nr * Math.sin(th)); });
    /* four fins, crossed at 45 degrees to the beam: 2.77 m span over the tips */
    var fin = [[0.20, 0.27], [1.70, 0.27], [1.10, 1.385], [0.20, 1.385]];
    for (i = 0; i < 4; i++) TB.fin(V, F, VO, Math.PI / 4 + i * Math.PI / 2, fin, 0.045, K.odd);
    TB.flush(tur);
    g.add(tur);
    return g;
  }

  /* ======================================================================== */
  /* ===================== MGM-5 CORPORAL on its erector, with the tractor === */
  /* ======================================================================== */
  function buildCorporal(THREE, M, C) {
    var T = makeMats(THREE, C), P = T.paint, V = T.vc, GL = T.glass, TM = T.team;
    var g = new THREE.Group();
    g.name = "us_corporal";
    var B = new Baker(THREE);
    var XO = 4.55;                                    /* drawn from the front axle, then centred */
    B.ox = XO;
    var s, i;

    /* figures read off the photographs and scaled to the 13.82 m missile; big single tyres */
    var R = 0.66, TW = 0.50, YT = 1.08;
    var AXT = [0.00, -3.50, -4.90];                   /* tractor axles (rear tandem assumed) */
    var XTR = -8.45;                                  /* the trailer's single axle */
    var XH = -10.25, ZH = 2.45;                       /* the erector's pivot hub */
    var ALPHA = 24 * Math.PI / 180;

    /* ---- tractor chassis ---- */
    for (s = -1; s <= 1; s += 2) B.box(V, -5.55, 1.95, s > 0 ? 0.36 : -0.46, s > 0 ? 0.46 : -0.36, 0.92, 1.25, K.frame);
    for (i = 0; i < 5; i++) {
      var cx = [-5.30, -3.90, -2.20, -0.40, 1.50][i];
      B.box(V, cx - 0.07, cx + 0.07, -0.46, 0.46, 0.96, 1.12, K.frame);
    }
    for (i = 0; i < 3; i++) {
      B.cyl(V, 0.09, 2.00, 8, AXT[i], 0, R, "y", K.dkg);
      B.box(V, AXT[i] - 0.24, AXT[i] + 0.24, -0.24, 0.24, 0.44, 0.86, K.dkg);
    }
    B.cyl(V, 0.09, 2.00, 8, XTR, 0, R, "y", K.dkg);
    for (s = -1; s <= 1; s += 2) {
      var sy = s > 0 ? 0.52 : -0.68;
      for (i = 0; i < 3; i++) B.box(V, AXT[i] - 0.64, AXT[i] + 0.64, sy, sy + 0.16, 0.86, 0.94, K.frame);
    }

    /* ---- tractor front: bumper, grille, hood, lamps, fenders ---- */
    B.box(V, 2.00, 2.18, -1.20, 1.20, 0.70, 1.02, K.dkg);
    B.box(P, 0.72, 1.95, -0.98, 0.98, 1.26, 2.08);
    B.box(V, 1.95, 2.01, -0.80, 0.80, 1.30, 1.98, K.dkg);
    for (s = -1; s <= 1; s += 2) {
      B.box(V, 1.93, 2.02, s > 0 ? 0.80 : -0.94, s > 0 ? 0.94 : -0.80, 1.60, 1.78, K.lamp);
      B.box(P, -0.30, 1.85, s > 0 ? 0.82 : -1.44, s > 0 ? 1.44 : -0.82, 1.38, 1.45);
      B.box(P, -5.50, -2.70, s > 0 ? 0.80 : -1.44, s > 0 ? 1.44 : -0.80, 1.38, 1.45);
    }

    /* ---- twin-roof cab on big single tyres ---- */
    B.box(P, -1.62, 0.72, -1.15, 1.15, 1.26, 2.58);
    B.box(P, -0.42, 0.70, -1.05, 1.05, 2.58, 2.84);
    B.box(P, -1.60, -0.46, -1.05, 1.05, 2.58, 2.84);
    B.box(GL, 0.72, 0.735, -1.0, -0.04, 1.86, 2.50);
    B.box(GL, 0.72, 0.735, 0.04, 1.0, 1.86, 2.50);
    for (s = -1; s <= 1; s += 2) {
      B.box(GL, -0.34, 0.62, s > 0 ? 1.15 : -1.165, s > 0 ? 1.165 : -1.15, 1.86, 2.52);
      B.box(GL, -1.54, -0.52, s > 0 ? 1.15 : -1.165, s > 0 ? 1.165 : -1.15, 1.86, 2.52);
    }
    B.box(GL, -1.635, -1.62, -0.6, 0.6, 1.90, 2.40);
    B.box(TM, -0.30, 0.58, -0.80, 0.80, 2.84, 2.865);
    B.box(TM, -1.48, -0.58, -0.80, 0.80, 2.84, 2.865);

    /* ---- fifth wheel and the trailer: a long low beam, an arch over the axle, the hub ---- */
    B.box(V, -4.45, -3.45, -0.60, 0.60, 1.25, 1.38, K.dkg);
    B.box(P, -8.30, -3.70, -0.30, 0.30, 1.38, 1.80);
    B.box(TM, -7.90, -4.60, -0.12, 0.12, 1.80, 1.82);
    for (s = -1; s <= 1; s += 2) {
      B.box(P, XTR - 0.95, XTR + 0.95, s > 0 ? 0.80 : -1.44, s > 0 ? 1.44 : -0.80, 1.40, 1.47);
      B.box(V, XTR - 0.40, XTR + 0.40, s > 0 ? 0.30 : -0.86, s > 0 ? 0.86 : -0.30, 1.00, 1.40, K.frame);   /* spring hangers */
    }
    B.box(P, -9.00, -7.60, -0.55, 0.55, 1.30, 2.05);                      /* the arched casting over the axle */
    B.box(P, -10.60, -8.90, -0.55, 0.55, 1.45, 2.15);
    B.box(P, -10.70, -9.80, -0.62, 0.62, 1.60, 3.05);                     /* the hub housing */
    for (s = -1; s <= 1; s += 2) B.cyl(P, 0.95, 0.14, 24, XH, s * 0.62, ZH, "y");  /* the round pivot discs */
    B.cyl(V, 0.20, 1.50, 12, XH, 0, ZH, "y", K.dkg);                      /* the hinge pin */

    /* ---- the boom, raised, with the missile on it ---- */
    var F = turned([XH, 0, ZH], ALPHA);
    B.obox(P, F, -0.50, 11.90, -0.50, 0.0, -0.25, 0.25);                  /* the boom girder */
    B.obox(V, F, -0.50, 11.90, -0.02, 0.04, -0.17, -0.09, K.odd);          /* its guide rails */
    B.obox(V, F, -0.50, 11.90, -0.02, 0.04, 0.09, 0.17, K.odd);
    B.obox(V, F, 0.30, 0.90, 0.0, 0.34, -0.21, 0.21, K.odd);               /* cradles under the missile */
    B.obox(V, F, 4.10, 4.60, 0.0, 0.34, -0.21, 0.21, K.odd);
    B.obox(V, F, 8.20, 8.70, 0.0, 0.34, -0.21, 0.21, K.odd);
    B.obox(V, F, 11.50, 11.90, 0.0, 0.34, -0.21, 0.21, K.odd);
    /* two rams from the arch up to the boom's underside */
    for (s = -1; s <= 1; s += 2) {
      var q0 = [-8.60, s * 0.36, 1.95], q1 = F.p(4.6, -0.5, s * 0.36);
      B.rod(V, q0, q1, 0.09, 10, K.steel);
    }
    /* the missile: 13.82 m, 0.762 m.  tail at the hinge; black aft section and bands */
    var VO = 0.42;
    /* paint from photograph 03 (the missile erected, near side-on, 30 px per metre): black aft
       section to 2.25 m, a white strip, one black band 2.55-3.10 m, then white to the nose.  The
       photographs show no other black band on the body; the black rings are the boom's clamps. */
    var mp = [[0.00, 0.00], [0.00, 0.30], [0.30, 0.36], [2.25, 0.381], [2.55, 0.381], [3.10, 0.381], [10.55, 0.381],
              [11.05, 0.37], [11.85, 0.335], [12.55, 0.265], [13.10, 0.17], [13.55, 0.075], [13.82, 0.00]];
    var mc = [K.band, K.band, K.band, K.white, K.band, K.white, K.white, K.white, K.white, K.white, K.white, K.white];
    B.rev(V, mp, mc, 20,
      function (t, r, th) { return F.p(t - 0.10, VO + r * Math.cos(th), r * Math.sin(th)); },
      function (nt, nr, th) { return F.d(nt, nr * Math.cos(th), nr * Math.sin(th)); });
    /* four swept fins, crossed at 45 degrees: about 2.1 m across the tips */
    var fin = [[0.00, 0.37], [2.00, 0.37], [1.00, 1.07], [0.00, 1.07]];
    for (i = 0; i < 4; i++) B.fin(V, F, VO, Math.PI / 4 + i * Math.PI / 2, fin, 0.05, K.white);
    /* the boom's two clamp rings, at about 3.65 m and 10.9 m from the tail in photograph 03 (the
       ring is placed on the boom's own axis, 0.10 m ahead of the missile's axial figure) */
    for (i = 0; i < 2; i++) {
      var ru = [3.55, 10.80][i];
      B.rev(V, [[ru - 0.13, 0.376], [ru - 0.13, 0.44], [ru + 0.13, 0.44], [ru + 0.13, 0.376]], [K.band, K.band, K.band], 14,
        function (t, r, th) { return F.p(t, VO + r * Math.cos(th), r * Math.sin(th)); },
        function (nt, nr, th) { return F.d(nt, nr * Math.cos(th), nr * Math.sin(th)); });
    }
    B.flush(g);

    /* ---- eight wheels in four turning axle groups ---- */
    for (i = 0; i < 3; i++) g.add(axleGroup(THREE, V, AXT[i] + XO, R, TW, [[YT, 1], [-YT, -1]], 24));
    g.add(axleGroup(THREE, V, XTR + XO, R, TW, [[YT + 0.02, 1], [-YT - 0.02, -1]], 24));
    return g;
  }

  return { buildHJ: buildHJ, buildCorporal: buildCorporal };
})();

UNIT_MODELS["nato_e50_mlrs"] = { len: 10.23, build: HeroUsEarlyRockets.buildHJ };
UNIT_MODELS["nato_e50_tel"] = { len: 13.38, build: HeroUsEarlyRockets.buildCorporal };
