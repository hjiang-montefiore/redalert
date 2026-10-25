/* ============ ru_2s3.js - HERO model: the 2S3 Akatsiya 152 mm self-propelled howitzer
   Key: pact_e60_spg  "2S3 Akatsiya 152mm Self-Propelled Howitzer" (row e60, service 1971).
   Drawn as the 2S3 of the 1970s; the 2S3M (1975) changes noted below are left off.
   Redo of 2026-10-24 to the full-quality procedure.

   Sources (Wikimedia Commons, width 960, cached in scratchpad/q_2s3_ref)
     A  "2S3 Akatsiya 2.jpg" (2008): a sand-painted 2S3 square on from the LEFT,
        gun level.  The side station table below is measured off it (3x crop),
        scaled at 65 px/m: the published base 4622 mm (first to last road wheel)
        gives 64.7 px/m and the published 3.05 m height to the PKT 67.5 px/m.
     B  "2S3 Akatsiya 3260.jpg" (2015, Shirokiy Karamysh): left front 3/4 in
        Soviet/Russian green: the nose trough, the round front mudguards, the
        travel lock raised, the stepped tube and the muzzle brake windows.
     C  "2S3 Akatsyia - IWM Duxford (43619100260).jpg": left front 3/4, gun
        level: the hull-side plates, the dark boxes at the rear of the left side,
        the mantlet collar, the recuperator above the tube.
     D  "Samokhodnaya gaubitsa Akatsiya 1972 - panoramio.jpg": right front 3/4:
        the ribbed nose trough, the travel-lock A-frame, the right turret side.
     E  "2S3 Akatsiya.JPEG" (US DoD, public domain, a Soviet-era photograph):
        left front 3/4 in service paint: the PKT on the cupola, the lamp drum.
     F  "2S3 Akatsiya Rear Museum of technique.jpg": right rear 3/4: the turret
        rear overhang and its brackets, the hull rear plate, mudguards, idler.
     G  "2S3 (SO-152) 'Akatsiya' Self-propelled Howitzer (37592027722).jpg"
        (Kubinka): left front 3/4: running gear, travel lock, the drum mantlet.
     ru.wikipedia "2S3": hull 6970 mm, 7765 mm with the gun, width 3250, height
        3050, base 4622, gauge 2720, clearance 450; engine front RIGHT, driver
        front LEFT, fighting compartment middle and rear; welded turret on a ball
        race; commander behind the gunner on the LEFT with a turning cupola (TKN-3A
        sight and OU-3GK lamp) and a 7.62 mm PKT; 2A33 tube joined to the breech,
        bore evacuator in the front part of the tube, muzzle brake on the muzzle;
        running gear a modified SU-100P chassis: SIX pairs of rubber-tyred road
        wheels and FOUR pairs of return rollers, idler at the REAR, drive sprocket
        at the FRONT.  2S3M (series from 1975): the hatches at the rear of the
        hull and turret rearranged, a drum rack, the radio aerial MOVED TO THE
        TURRET ROOF.  en.wikipedia: height 3.05 m (2.615 m without the MG),
        shock absorbers on the 1st and 6th road wheels, Object 303 chassis.

   Recognition list (what shows at game zoom, and where it rests)
     1  the long low hull, front engine: a ribbed trough across the nose, a short
        glacis, a flat deck the full length [A, B, D]
     2  big round front mudguards curling down ahead of the raised drive
        sprocket, which is at the FRONT [A, B, C, G]
     3  six evenly pitched rubber-tyred spoked road wheels, the raised spoked
        idler at the REAR, four return rollers under the top run [A, ru.wiki]
     4  the large flat-sided welded turret over the rear two thirds, sides
        leaning in, sloped front and a chamfer to the roof, the rear overhang
        with its undercut [A, C, F]
     5  the 2A33: round collar mantlet low in the turret face, the recuperator
        above the tube, thick rear tube, bore evacuator, clamp band, thin front
        tube [A, B, C]
     6  the double-baffle muzzle brake with two windows each side, its muzzle
        about level with the mudguard tips [A, B, C]
     7  the commander's cupola on the LEFT of the roof, overhanging the side
        wall on a V-shaped (conical) bracket, the PKT on it [A, C, E]
     8  the V-shaped bulge on the hull side under the turret ring [A]
     9  the gunner's sight box on the left front of the roof [A]
    10  the travel-lock post on the front deck [A, B, D, G]
    11  three access plates on the upper hull side, one with crossed bars, and
        the dark boxes at the rear of the left side [A, C]
    12  the rear: turret doors and stowage brackets, two ammunition hatches in
        the hull rear plate (ru.wiki: two racks fed from the ground through rear
        hatches) [F]

   Side station table (metres; x from the middle of the length, + forward; z up)
     mudguard tips x 3.63 z 0.84 and x -3.63; fender top 1.10; deck 1.60;
     nose trough x 3.05..3.35 z 0.82..1.18; glacis to the deck at x 2.55
     sprocket x 3.27 z 0.64 r 0.30; idler x -2.98 z 0.69 r 0.28
     road wheels x 2.43 1.40 0.40 -0.45 -1.29 -2.17, centre z 0.37, r 0.32
     return rollers x 2.06 0.99 -0.04 -1.68, z 0.85
     turret: face foot x 0.42 z 1.63 (drum front 0.54), face top x 0.17 z 2.35, roof x -0.19 to
     -2.86 at z 2.70, rear slope to x -3.01 z 2.17, tail edge x -3.14 z 2.05,
     undercut to x -2.91 z 1.72; half width 1.42 at the foot, 0.90 at the roof
     ring centre x -1.0 (the centre of the hull-side V bulge [A])
     gun axis z 1.92, trunnion x 0.22; drum mantlet r 0.32 across; tube r 0.125 to
     x 1.25, evacuator r 0.145 to 2.17, band to 2.32, tube r 0.088 to 3.64,
     brake (0.59 m) to the muzzle at 4.23; recuperator z 2.18 x 0.22..0.74
     cupola centre x -1.29 y +0.88, r 0.43, top 2.87; PKT top 3.17
   Lengths: photograph A, scaled on the published base and height (which agree
   within 3%), gives 7.26 m over the mudguards (ru.wiki hull 6.97, en.wiki
   7.765: A lies between).  The gun: A shows the muzzle level with the
   mudguard tips, but both encyclopaedias put it 0.6-0.8 m ahead of the hull
   (ru 7.765 - 6.97; en 8.4 - 7.765), B, D, E and G all show it well forward,
   and the 2A33 shares the D-20's ballistics (tube 28 calibres = 4.26 m plus
   brake and breech).  A's turret is read as slightly traversed, and the
   muzzle is drawn 0.60 m ahead of the mudguard tips: X extent 7.86 m.

   Paint: B samples #62757b (turret) and #596a6a (hull) in sky light, a grey cast
   on a modern repaint; E is monochrome.  Drawn as the period Soviet olive of the
   1960s-70s heroes (T-62 #505a3c, BMP-1 #4e5a3c): #4f5a3b, about 0.8 of a lit
   olive.  No numbers (E's "541" and B's "169" are not drawn), no markings.

   Corrections to the old file: the return rollers (ru.wiki: four pairs; the old
   header said none); the turret roof aerial removed (ru.wiki: the aerial went to
   the turret roof only on the 2S3M; where the 1971 vehicle carried it is not
   confirmed, so none is drawn); the turret redrawn to A's profile (3.56 m long:
   sloped face, roof chamfer, rear slope and undercut; the sides leaning in to a
   roof half the base width) with the cheeks swept back from the transverse drum
   mantlet of B and D (the old file had a flat box mount); one stepped recuperator
   above the tube (the old file had two side by side); the hull-side V bulge and
   the conical cupola bracket; the big round front mudguards; the published
   figures (the old 7.765 m "gun forward" and 3.2 m width replaced by the table
   above and ru.wiki's 3.25 m).
   NOT confirmed, so NOT drawn: the 1971 aerial position, the exact base-2S3
   rear-hatch shapes (drawn as two plain square hatches, F being a later vehicle),
   roof hatches (none is clear in any photograph), engine grille layout (one
   louvred panel on the right front deck where the engine is), side stowage.

   Nodes: "turret" (ring centre, gun along +X), "barrel" (on the trunnion, inside
   the turret), six "roadwheel" groups (the spoked discs of a station, both sides;
   the tyres are rings of revolution and stay in the hull).  Team colour is the
   plain C.team material on the turret roof tail and the front fender tops.
   Model space +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAkatsiya = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    e60: { paint: { base: "#4f5a3b", tone: ["#566141", "#465034"], seed: 1971 } }
  };

  /* station table: see the header */
  var XN = 3.63, XR = -3.63, ZD = 1.60, ZF = 1.10;
  var XW = [2.43, 1.40, 0.40, -0.45, -1.29, -2.17], ZW = 0.37, RW = 0.32;
  var TY = 1.36, TW = 0.20;
  var XS = 3.27, ZS = 0.64, RS = 0.30;
  var XI = -2.98, ZI = 0.69, RI = 0.28;
  var XRR = [2.06, 0.99, -0.04, -1.68], ZRR = 0.85;
  var TX = -1.0, TZ = ZD;
  var TRX = 0.22, TRZ = 1.92, MUZ = 4.23;
  var HW = 1.28, FW = 1.625;
  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; a painted bin also gets planar UVs in
     metres from the dominant axis of each face, so the paint never stretches */
  function Bin(mat, uv, k) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.k = k || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, k = this.k, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };

  /* a closed solid: the signed volume says whether the faces point out */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* mirrored pair of boxes about y = 0 (y0 < y1 on the +Y side) */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  /* a box on a tilted frame: origin P0, axes U, W, N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a slab along a line in the XZ plane, thickness th, across y0..y1 */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function sphere(bin, cx, cy, cz, r, sg, st) {
    var V = [], F = [], i, j, a, b;
    V.push([cx, cy, cz + r]);
    for (j = 1; j < st; j++) for (i = 0; i < sg; i++) {
      a = j / st * Math.PI; b = i / sg * TAU;
      V.push([cx + r * Math.sin(a) * Math.cos(b), cy + r * Math.sin(a) * Math.sin(b), cz + r * Math.cos(a)]);
    }
    V.push([cx, cy, cz - r]);
    var last = V.length - 1;
    for (i = 0; i < sg; i++) {
      F.push([0, 1 + i, 1 + (i + 1) % sg]);
      F.push([last, 1 + (st - 2) * sg + (i + 1) % sg, 1 + (st - 2) * sg + i]);
    }
    for (j = 0; j < st - 2; j++) for (i = 0; i < sg; i++) {
      a = 1 + j * sg + i; b = 1 + j * sg + (i + 1) % sg;
      F.push([a, a + sg, b + sg], [a, b + sg, b]);
    }
    solid(bin, V, F);
  }
  /* LOFT: cross-sections in the YZ plane at stations along X, every section
     the same number of points, joined in order and capped by a fan from its
     centre.  The winding is made consistent here and the signed volume in
     solid() turns the whole skin outward. */
  function loft(bin, S) {
    var V = [], F = [], n = S[0].p.length, m = S.length, i, k, k1, c0, c1;
    for (i = 0; i < m; i++) for (k = 0; k < n; k++) V.push([S[i].x, S[i].p[k][0], S[i].p[k][1]]);
    for (i = 0; i + 1 < m; i++) for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([i * n + k, i * n + k1, (i + 1) * n + k1], [i * n + k, (i + 1) * n + k1, (i + 1) * n + k]);
    }
    c0 = V.length; V.push([S[0].x, S[0].c[0], S[0].c[1]]);
    c1 = V.length; V.push([S[m - 1].x, S[m - 1].c[0], S[m - 1].c[1]]);
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([c0, k1, k]);
      F.push([c1, (m - 1) * n + k, (m - 1) * n + k1]);
    }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      draw(cv.getContext("2d"));
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* hull paint: one green per period, soft tonal patches, plate seams and
     rain streaks; one tile is 2.94 m of surface */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "akats" + P.base + P.seed, function (q) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.tone.length; k++) {
        q.fillStyle = P.tone[k];
        for (i = 0; i < 7; i++) {
          x = R() * 256; y = R() * 256; w = 30 + R() * 60;
          q.globalAlpha = 0.45; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
        }
      }
      q.globalAlpha = 1;
      q.strokeStyle = "rgba(20,22,16,0.35)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 0.5, 0); q.lineTo(i * 64 + 0.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 32.5); q.lineTo(256, i * 64 + 32.5); q.stroke();
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.08)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
      for (i = 0; i < 40; i++) {
        q.fillStyle = "rgba(10,10,8,0.18)";
        q.fillRect(R() * 256, R() * 256, 2, 2);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             team: new Bin(T.team, false) };
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
  /* move every vertex of a set of bins into a child frame at (dx, 0, dz);
     painted UVs stay where they were laid, so the paint does not jump */
  function shift(B, dx, dz) {
    var k, b, i;
    for (k in B) {
      b = B[k];
      for (i = 0; i < b.P.length; i += 3) { b.P[i] -= dx; b.P[i + 2] -= dz; }
    }
  }

  /* an outline in the XZ plane (convex, any winding) made a plate from y0 to y1 */
  function prismXZ(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, k;
    for (k = 0; k < n; k++) { V.push([pts[k][0], y0, pts[k][1]]); V.push([pts[k][0], y1, pts[k][1]]); }
    for (k = 0; k < n; k++) {
      var k1 = (k + 1) % n;
      F.push([2 * k, 2 * k1, 2 * k1 + 1], [2 * k, 2 * k1 + 1, 2 * k + 1]);
    }
    for (k = 1; k + 1 < n; k++) { F.push([0, 2 * k + 2, 2 * k]); F.push([1, 2 * k + 1, 2 * k + 3]); }
    solid(bin, V, F);
  }
  /* a cone from a horizontal circle (centre c, radius r, at height c[2]) to an
     apex: the bracket under an overhanging cupola */
  function obliqueCone(bin, c, r, apex, seg) {
    var V = [], F = [], k;
    for (k = 0; k < seg; k++) V.push([c[0] + Math.cos(k / seg * TAU) * r, c[1] + Math.sin(k / seg * TAU) * r, c[2]]);
    V.push(apex); V.push([c[0], c[1], c[2]]);
    for (k = 0; k < seg; k++) {
      var k1 = (k + 1) % seg;
      F.push([k, k1, seg]); F.push([k1, k, seg + 1]);
    }
    solid(bin, V, F);
  }
  /* the turret side wall leans in: its half width at height z */
  function wallY(z) { return 1.42 - (z - 1.63) * 0.486; }

  /* ---------------------------------------------------------------- hull */
  function hsec(x, zb, zs, zt, ch) {
    var wl = 1.10, wu = HW;
    return { x: x, c: [0, (zb + zt) / 2], p: [[-wl, zb], [wl, zb], [wl, zs], [wu, zs], [wu, zt - ch], [wu - ch, zt],
                                              [-(wu - ch), zt], [-wu, zt - ch], [-wu, zs], [-wl, zs]] };
  }
  function addHull(V, B) {
    var Pn = B.paint, D = B.dark, G = B.glass, Tm = B.team, s, k, x, a, pts;
    loft(Pn, [
      hsec(3.35, 0.82, 0.84, 1.18, 0.02),     /* the nose trough's front face (D) */
      hsec(3.05, 0.62, 1.04, 1.18, 0.02),     /* trough top; the lower nose plate */
      hsec(2.85, 0.45, 1.04, 1.34, 0.03),     /* the glacis */
      hsec(2.55, 0.45, 1.04, ZD, 0.04),       /* top of the glacis, the deck */
      hsec(-2.95, 0.45, 1.04, ZD, 0.04),
      hsec(-3.12, 0.62, 1.04, 1.59, 0.03),
      hsec(-3.15, 0.66, 1.04, 1.57, 0.02)     /* the rear plate */
    ]);
    /* ribs across the trough face and its top lip (B, D) */
    for (k = -4; k <= 4; k++) box(Pn, 3.35, 3.40, k * 0.25 - 0.025, k * 0.25 + 0.025, 0.86, 1.16);
    box(Pn, 3.05, 3.42, -1.20, 1.20, 1.16, 1.20);
    box(D, 3.40, 3.42, -1.18, 1.18, 0.84, 0.86);
    for (s = -1; s <= 1; s += 2) {
      /* fenders the full length (A) */
      box(Pn, -3.30, 3.20, s > 0 ? HW : -FW, s > 0 ? FW : -HW, ZF - 0.03, ZF);
      box(Pn, -3.30, 3.20, s > 0 ? FW - 0.02 : -FW, s > 0 ? FW : -(FW - 0.02), ZF - 0.09, ZF);
      /* the round front mudguard over the sprocket, with its side face (A, B, C) */
      pts = [];
      for (k = 0; k <= 8; k++) {
        a = (95 - k * 70 / 8) * Math.PI / 180;
        pts.push([XS + Math.cos(a) * 0.42, ZS - 0.02 + Math.sin(a) * 0.42]);
      }
      for (k = 0; k < 8; k++) belt(Pn, pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], s > 0 ? 1.12 : -FW, s > 0 ? FW : -1.12, 0.03);
      prismXZ(Pn, pts.concat([[XS + 0.36, 0.70], [XS - 0.05, 0.70]]), s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -(FW - 0.025));
      box(Pn, 3.12, 3.25, s > 0 ? HW : -FW, s > 0 ? FW : -HW, ZF - 0.04, ZF);
      /* rear mudguards behind the idler (A, F) */
      belt(Pn, -3.30, ZF - 0.015, -3.55, 0.80, s > 0 ? 1.12 : -FW, s > 0 ? FW : -1.12, 0.03);
      box(D, -3.63, -3.55, s > 0 ? 1.16 : -FW, s > 0 ? FW : -1.16, 0.62, 0.84);
      prismXZ(Pn, [[-3.30, ZF], [-3.55, 0.80], [-3.55, 0.74], [-3.30, 0.94]], s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -(FW - 0.025));
      /* headlamp in its guard on each glacis corner (A, B) */
      cyl(D, [2.70, s * 1.08, 1.43], [2.86, s * 1.08, 1.43], 0.085, 0.085, 12);
      cyl(G, [2.86, s * 1.08, 1.43], [2.875, s * 1.08, 1.43], 0.065, 0.065, 12);
      belt(D, 2.92, 1.30, 2.92, 1.56, s * 1.08 - 0.12, s * 1.08 + 0.12, 0.02);
      /* tow hooks on the lower nose plate, tow eyes at the tail */
      box(D, 3.18, 3.30, s * 0.72 - 0.06, s * 0.72 + 0.06, 0.66, 0.78);
      box(D, -3.25, -3.14, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.72, 0.84);
      box(D, -3.17, -3.15, s * 1.12 - 0.07, s * 1.12 + 0.07, 1.38, 1.48);          /* tail lamps */
      /* the hull-side access plates (A, C): two plain, one with crossed bars */
      var yo = s * HW, yp = s * (HW + 0.014);
      box(Pn, 1.65, 2.19, Math.min(yo, yp), Math.max(yo, yp), 1.18, 1.48);
      box(Pn, 0.78, 1.50, Math.min(yo, yp), Math.max(yo, yp), 1.14, 1.55);
      box(Pn, 0.06, 0.58, Math.min(yo, yp), Math.max(yo, yp), 1.20, 1.55);
      cyl(D, [0.10, s * (HW + 0.02), 1.24], [0.54, s * (HW + 0.02), 1.51], 0.014, 0.014, 4);
      cyl(D, [0.10, s * (HW + 0.02), 1.51], [0.54, s * (HW + 0.02), 1.24], 0.014, 0.014, 4);
      for (k = 0; k < 4; k++) cylY(D, 0.86 + k * 0.19, yo, s * (HW + 0.025), 1.50, 0.02, 6);
      /* the V bulge under the turret ring (A) */
      solid(Pn, [[-0.29, s * (HW - 0.02), ZD], [-1.68, s * (HW - 0.02), ZD], [-0.985, s * 1.44, ZD], [-1.0, s * (HW - 0.02), 1.20]],
            [[0, 1, 2], [0, 3, 1], [1, 3, 2], [2, 3, 0]]);
      /* plate seams along the upper hull side */
      for (x = -2.6; x < 2.4; x += 1.25) box(D, x, x + 0.02, s > 0 ? HW : -(HW + 0.006), s > 0 ? HW + 0.006 : -HW, ZF + 0.02, ZD - 0.04);
      /* team flash on the front fender tops */
      box(Tm, 2.55, 2.95, s > 0 ? HW + 0.06 : -(FW - 0.05), s > 0 ? FW - 0.05 : -(HW + 0.06), ZF, ZF + 0.01);
    }
    /* the dark boxes at the rear of the left side (A, C) */
    box(D, -1.68, -1.37, HW, HW + 0.12, 1.20, 1.35);
    box(D, -2.19, -1.73, HW, HW + 0.13, 1.25, 1.55);
    box(Pn, -2.17, -1.75, HW + 0.13, HW + 0.14, 1.30, 1.50);
    /* driver's hatch front left with its periscopes (B, C) */
    cylZ(Pn, 2.22, 0.70, ZD - 0.01, ZD + 0.07, 0.29, 20);
    cylZ(D, 2.22, 0.70, ZD + 0.07, ZD + 0.09, 0.10, 10);
    for (k = -1; k <= 1; k++) box(G, 2.52, 2.58, 0.70 + k * 0.16 - 0.05, 0.70 + k * 0.16 + 0.05, ZD - 0.02, ZD + 0.05);
    /* engine compartment, front right: louvred panel and an access plate */
    box(D, 1.15, 2.40, -1.15, -0.30, ZD - 0.01, ZD + 0.012);
    for (k = 0; k < 10; k++) box(Pn, 1.20 + k * 0.12, 1.25 + k * 0.12, -1.12, -0.33, ZD, ZD + 0.035);
    box(Pn, 0.40, 1.05, -1.10, -0.35, ZD - 0.01, ZD + 0.02);
    cylZ(D, 0.72, -0.72, ZD + 0.02, ZD + 0.05, 0.08, 10);
    /* the travel lock post on the front deck, its cradle under the tube (A, B, D, G) */
    cyl(Pn, [2.24, 0.28, ZD], [2.24, 0.03, 1.76], 0.035, 0.035, 8);
    cyl(Pn, [2.24, -0.28, ZD], [2.24, -0.03, 1.76], 0.035, 0.035, 8);
    box(D, 2.20, 2.28, -0.32, -0.24, ZD, ZD + 0.05);
    box(D, 2.20, 2.28, 0.24, 0.32, ZD, ZD + 0.05);
    box(Pn, 2.18, 2.30, -0.12, 0.12, 1.74, 1.79);
    box(D, 2.18, 2.30, -0.12, -0.09, 1.79, 1.86);
    box(D, 2.18, 2.30, 0.09, 0.12, 1.79, 1.86);
    /* the turret ring collar, in the shadow under the turret */
    cylZ(D, TX, 0, ZD - 0.01, 1.64, 1.22, 32);
    /* the rear plate: two ammunition hatches with hinges, a round cap (F) */
    for (s = -1; s <= 1; s += 2) {
      box(Pn, -3.17, -3.15, s > 0 ? 0.22 : -0.82, s > 0 ? 0.82 : -0.22, 0.98, 1.44);
      box(D, -3.18, -3.16, s > 0 ? 0.26 : -0.78, s > 0 ? 0.78 : -0.26, 1.40, 1.43);
      box(D, -3.20, -3.17, s * 0.52 - 0.04, s * 0.52 + 0.04, 1.10, 1.22);
    }
    cylX(D, -3.17, -3.13, 0.0, 0.80, 0.11, 14);
  }

  /* --------------------------------------------------------- running gear */
  function addRunning(V, B, WB) {
    var D = B.dark, Pn = B.paint, i, s, k, an, yc, ya, yb;
    var h = 0.035, path = [];
    /* the belt centre line: ground run back to the last wheel, round the
       raised idler at the REAR, the top run on the return rollers, round the
       sprocket at the FRONT and down to the first wheel (A) */
    path.push([XW[0] + 0.12, h]);
    path.push([XW[5] - 0.10, h]);
    for (k = 0; k <= 10; k++) {
      an = -Math.PI * 0.40 - k / 10 * Math.PI * 1.10;
      path.push([XI + Math.cos(an) * (RI + h), ZI + Math.sin(an) * (RI + h)]);
    }
    for (k = 0; k <= 8; k++) {
      an = Math.PI * 0.5 - k / 8 * Math.PI * 0.80;
      path.push([XS + Math.cos(an) * (RS + h), ZS + Math.sin(an) * (RS + h)]);
    }
    for (s = -1; s <= 1; s += 2) {
      yc = s * TY; ya = yc - TW; yb = yc + TW;
      for (i = 0; i < path.length; i++) {
        var p0 = path[i], p1 = path[(i + 1) % path.length];
        belt(D, p0[0], p0[1], p1[0], p1[1], ya, yb, 0.07);
      }
      /* track shoes and guide horns on the ground run and the top run */
      for (i = 0; i < 40; i++) {
        var gx = XW[5] - 0.08 + i * 0.16;
        if (gx > XW[0] + 0.12) break;
        box(D, gx, gx + 0.09, ya - 0.01, yb + 0.01, 0.0, 0.08);
        box(D, gx, gx + 0.05, yc - 0.03, yc + 0.03, 0.07, 0.16);
      }
      var t0 = [XI, ZI + RI + h], t1 = [XS, ZS + RS + h], tl = Math.sqrt((t1[0] - t0[0]) * (t1[0] - t0[0]) + (t1[1] - t0[1]) * (t1[1] - t0[1]));
      for (i = 0; i < 40; i++) {
        var f = (0.10 + i * 0.16) / tl;
        if (f > 0.98) break;
        var tx = t0[0] + (t1[0] - t0[0]) * f, tz = t0[1] + (t1[1] - t0[1]) * f;
        box(D, tx, tx + 0.09, ya - 0.01, yb + 0.01, tz + 0.01, tz + 0.05);
      }
      /* drive sprocket, FRONT: a toothed ring either side of a dished hub (A, B, G) */
      cylY(D, XS, yc - 0.18, yc + 0.18, ZS, RS - 0.05, 22);
      cylY(Pn, XS, yc + s * 0.18, yc + s * 0.21, ZS, 0.19, 16);
      cylY(D, XS, yc + s * 0.21, yc + s * 0.25, ZS, 0.07, 10);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU;
        cyl(D, [XS + Math.cos(ta) * (RS - 0.03), yc - 0.17, ZS + Math.sin(ta) * (RS - 0.03)],
               [XS + Math.cos(ta) * (RS - 0.03), yc + 0.17, ZS + Math.sin(ta) * (RS - 0.03)], 0.045, 0.045, 5);
      }
      for (i = 0; i < 6; i++) {
        var ha = i / 6 * TAU + 0.3;
        cylY(D, XS + Math.cos(ha) * 0.12, yc + s * 0.205, yc + s * 0.215, ZS + Math.sin(ha) * 0.12, 0.035, 6);
      }
      /* idler, REAR: a six-spoked wheel on its crank (A, F) */
      cylY(D, XI, yc - 0.19, yc + 0.19, ZI, RI, 20);
      cylY(Pn, XI, yc + s * 0.19, yc + s * 0.20, ZI, RI - 0.04, 18);
      for (k = 0; k < 6; k++) {
        var sa = k / 6 * TAU + 0.26;
        box(D, XI + Math.cos(sa) * 0.15 - 0.045, XI + Math.cos(sa) * 0.15 + 0.045,
            s > 0 ? yc + 0.20 : yc - 0.215, s > 0 ? yc + 0.215 : yc - 0.20, ZI + Math.sin(sa) * 0.15 - 0.045, ZI + Math.sin(sa) * 0.15 + 0.045);
      }
      cylY(D, XI, yc + s * 0.20, yc + s * 0.24, ZI, 0.07, 10);
      belt(D, XI, ZI, XI + 0.40, ZI - 0.05, s * 1.10, s * 1.15, 0.10);
      /* four return rollers under the top run (ru.wikipedia, A) */
      for (i = 0; i < XRR.length; i++) {
        cylY(D, XRR[i], yc - 0.14, yc + 0.14, ZRR, 0.09, 12);
        cylY(D, XRR[i], s * 1.10, yc, ZRR, 0.035, 6);
      }
      /* road-wheel tyres (pairs) and the axle arms; shock absorbers on the
         first and sixth stations (en.wikipedia) */
      for (i = 0; i < XW.length; i++) {
        cylY(D, XW[i], yc - 0.20, yc - 0.03, ZW, RW, 22);
        cylY(D, XW[i], yc + 0.03, yc + 0.20, ZW, RW, 22);
        cylY(D, XW[i], s * 1.10, yc, ZW, 0.06, 8);
        belt(D, XW[i], ZW, XW[i] + 0.38, ZW + 0.12, s * 1.10, s * 1.16, 0.09);
        if (i === 0 || i === 5) belt(D, XW[i] + 0.06, ZW + 0.10, XW[i] + 0.30, 0.98, s * 1.11, s * 1.15, 0.07);
      }
    }
    /* the spoked road-wheel discs, one group a station holding both sides (A):
       a dished plate, six dark lightening holes between the spokes, the hub */
    for (i = 0; i < XW.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TY, wb = WB[i];
        cylY(wb, 0, y0 - 0.205, y0 - 0.025, 0, RW - 0.06, 20);
        cylY(wb, 0, y0 + 0.025, y0 + 0.205, 0, RW - 0.06, 20);
        cylY(wb, 0, y0 + s * 0.205, y0 + s * 0.22, 0, 0.10, 12);
        cylY(wb, 0, y0 + s * 0.22, y0 + s * 0.25, 0, 0.05, 8);
        for (k = 0; k < 6; k++) {
          var ba = k / 6 * TAU + 0.26, ca = Math.cos(ba), sn = Math.sin(ba);
          planeBox(wb, [0, y0, 0], [ca, 0, sn], [-sn, 0, ca], [0, s, 0], 0.08, 0.25, -0.03, 0.03, 0.205, 0.222);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* a section: half width hb at the foot z0, the side wall leaning in to ht at
     the roof zt, the roof edge chamfered */
  function tsec(x, hb, z0, ht, zt) {
    var ch = 0.05;
    return { x: x, c: [0, (z0 + zt) / 2], p: [[-hb, z0], [hb, z0], [ht + ch * 0.4, zt - ch], [ht - ch * 0.6, zt],
                                              [-(ht - ch * 0.6), zt], [-(ht + ch * 0.4), zt - ch]] };
  }
  function addTurret(V, B) {
    var P = B.paint, D = B.dark, G = B.glass, Tm = B.team, s, k, a, ZR = 2.70;
    loft(P, [
      tsec(0.42, 0.62, 1.63, 0.60, 1.76),           /* foot of the face, under the drum (A, B, D) */
      tsec(0.17, 0.98, 1.63, 0.70, 2.35),           /* the cheeks sweep back to the sides */
      tsec(-0.19, 1.30, 1.63, 0.82, ZR),            /* and up to the roof (A) */
      tsec(-0.50, 1.42, 1.63, 0.90, ZR),
      tsec(-2.86, 1.42, 1.63, 0.90, ZR),            /* roof to the rear slope */
      tsec(-2.91, 1.40, 1.72, 0.99, 2.52),
      tsec(-3.01, 1.33, 1.88, 1.16, 2.17),          /* the undercut tail (A, F) */
      tsec(-3.14, 1.27, 2.02, 1.21, 2.08)
    ]);
    /* the gunner's sight box, left front of the roof (A) */
    box(P, -0.63, -0.29, 0.35, 0.65, ZR - 0.02, 2.82);
    box(G, -0.29, -0.275, 0.40, 0.60, 2.70, 2.78);
    /* commander's cupola on the left, over the leaning side on a cone (A, C) */
    var CX = -1.29, CY = 0.88;
    obliqueCone(P, [CX, CY, ZR], 0.43, [-1.25, 1.23, 2.00], 22);
    cylZ(P, CX, CY, ZR - 0.01, 2.82, 0.43, 26);
    cylZ(D, CX, CY, 2.82, 2.845, 0.40, 22);
    cylZ(P, CX + 0.04, CY, 2.845, 2.875, 0.32, 20);
    for (k = 0; k < 6; k++) {
      a = -1.6 + k * 0.62;
      box(G, CX + Math.cos(a) * 0.425 - 0.035, CX + Math.cos(a) * 0.425 + 0.035, CY + Math.sin(a) * 0.425 - 0.05, CY + Math.sin(a) * 0.425 + 0.05, 2.74, 2.79);
    }
    box(P, CX + 0.36, CX + 0.48, CY - 0.10, CY + 0.10, 2.72, 2.88);           /* TKN-3A head */
    box(G, CX + 0.48, CX + 0.49, CY - 0.07, CY + 0.07, 2.77, 2.85);
    /* the PKT on its cradle at the front of the cupola (A, E) */
    box(D, CX + 0.18, CX + 0.30, CY + 0.10, CY + 0.20, 2.875, 3.00);
    box(D, CX + 0.06, CX + 0.42, CY + 0.12, CY + 0.20, 3.00, 3.10);
    box(D, CX + 0.12, CX + 0.22, CY + 0.13, CY + 0.19, 3.10, 3.17);
    cylX(D, CX + 0.42, CX + 0.92, CY + 0.16, 3.06, 0.017, 6);
    box(D, CX + 0.08, CX + 0.24, CY + 0.20, CY + 0.32, 2.94, 3.06);           /* ammunition box */
    /* the OU-3GK lamp drum beside the sight (E, B) */
    cylX(D, CX + 0.10, CX + 0.34, CY - 0.24, 2.98, 0.10, 16);
    cylX(G, CX + 0.34, CX + 0.35, CY - 0.24, 2.98, 0.08, 14);
    box(D, CX + 0.17, CX + 0.27, CY - 0.27, CY - 0.21, 2.86, 2.90);
    /* side wall fittings: grab handles and a vision port, both sides (A, D) */
    for (s = -1; s <= 1; s += 2) {
      var w1 = wallY(2.55) + 0.03, w2 = wallY(2.20) + 0.03;
      cyl(D, [-2.17, s * w1, 2.55], [-1.87, s * w1, 2.55], 0.016, 0.016, 5);
      cyl(D, [-2.17, s * w2, 2.20], [-1.87, s * w2, 2.20], 0.016, 0.016, 5);
      cylY(D, -0.55, s * (wallY(2.32) - 0.01), s * (wallY(2.32) + 0.03), 2.32, 0.06, 10);
      cylY(D, -2.55, s * (wallY(2.45) - 0.01), s * (wallY(2.45) + 0.03), 2.45, 0.05, 8);
    }
    /* the rear: two doors on the slope, the three stowage brackets (F) */
    var P0 = [-2.935, 0, 2.435], U = [-0.272, 0, -0.962], W = [0, 1, 0], N = [-0.962, 0, 0.272];
    planeBox(P, P0, U, W, N, -0.22, 0.20, -0.95, -0.06, 0, 0.015);
    planeBox(P, P0, U, W, N, -0.22, 0.20, 0.06, 0.95, 0, 0.015);
    planeBox(D, P0, U, W, N, -0.22, 0.20, -0.04, 0.04, 0, 0.012);
    for (k = -1; k <= 1; k++) planeBox(D, P0, U, W, N, 0.21, 0.27, k * 0.80 - 0.05, k * 0.80 + 0.05, 0, 0.10);
    /* lifting eyes on the roof edge */
    for (s = -1; s <= 1; s += 2) {
      cylZ(D, -0.70, s * 0.80, ZR - 0.01, ZR + 0.05, 0.05, 8);
      cylZ(D, -2.70, s * 0.80, ZR - 0.01, ZR + 0.05, 0.05, 8);
    }
    /* team flash on the roof tail, facing up */
    box(Tm, -2.62, -2.22, -0.40, 0.40, ZR - 0.005, ZR + 0.008);
  }

  /* -------------------------------------------------------------- barrel */
  /* in the barrel frame: origin on the trunnion, +X the bore (A, B, C) */
  function addBarrel(B) {
    var P = B.paint, D = B.dark, L = MUZ - TRX, s, q = L - 0.59;     /* q: rear face of the brake */
    cylY(P, 0, -0.55, 0.55, 0, 0.32, 28);                          /* the drum mantlet, across (B, D) */
    cylY(D, 0, -0.57, -0.55, 0, 0.24, 16);
    cylY(D, 0, 0.55, 0.57, 0, 0.24, 16);
    cylX(P, 0.25, 0.48, 0, 0, 0.15, 22);                           /* the tube's collar */
    cylX(P, 0.48, 1.03, 0, 0, 0.125, 22);                          /* rear tube */
    cyl(P, [1.03, 0, 0], [1.09, 0, 0], 0.125, 0.145, 22);
    cylX(P, 1.09, 1.89, 0, 0, 0.145, 22);                          /* bore evacuator */
    cyl(P, [1.89, 0, 0], [1.95, 0, 0], 0.145, 0.10, 22);
    cylX(P, 1.95, 2.10, 0, 0, 0.105, 20);                          /* clamp band */
    cylX(P, 2.10, q, 0, 0, 0.088, 20);                             /* front tube */
    /* double-baffle muzzle brake: two windows a side (A, B, C) */
    cyl(P, [q, 0, 0], [q + 0.09, 0, 0], 0.10, 0.125, 20);
    cylX(P, q + 0.09, q + 0.14, 0, 0, 0.15, 22);
    cylX(P, q + 0.31, q + 0.37, 0, 0, 0.15, 22);
    cylX(P, q + 0.53, L, 0, 0, 0.15, 22);
    for (s = -1; s <= 1; s += 2) box(P, q + 0.09, L, -0.105, 0.105, s > 0 ? 0.115 : -0.15, s > 0 ? 0.15 : -0.115);
    cylX(D, q + 0.01, L + 0.001, 0, 0, 0.076, 14);
    /* the recuperator above the tube, stepped (A, C) */
    cylX(P, 0.00, 0.32, 0, 0.26, 0.105, 18);
    cylX(P, 0.32, 0.50, 0, 0.26, 0.098, 16);
    cylX(D, 0.50, 0.52, 0, 0.26, 0.06, 10);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.e60, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, bg, TB = bins(T), BB = bins(T);
    g.name = "ru_2s3_" + which;
    for (i = 0; i < XW.length; i++) WB.push(new Bin(T.paint, true));
    addHull(V, HB);
    addRunning(V, HB, WB);
    var hull = new THREE.Group(); hull.name = "hull";
    flush(THREE, hull, HB);
    g.add(hull);
    for (i = 0; i < XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { paint: WB[i] });
      g.add(wg);
    }
    addTurret(V, TB);
    shift(TB, TX, TZ);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, TZ);
    flush(THREE, tg, TB);
    addBarrel(BB);
    bg = new THREE.Group();
    bg.name = "barrel";
    bg.position.set(TRX - TX, 0, TRZ - TZ);
    flush(THREE, bg, BB);
    tg.add(bg);
    g.add(tg);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e60_spg"] = { len: 7.86, build: function (THREE, M, C) { return HeroAkatsiya.build(THREE, M, C, "e60"); } };
