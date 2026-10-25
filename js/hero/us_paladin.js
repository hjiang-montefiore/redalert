/* ============ us_paladin.js - HERO models: the M109 155 mm self-propelled howitzer
   Five keys, four builds:
     nato_e60_spg  M109 (1963)            the short M126 (23 cal) in the M127 mount
     nato_e80_spg  M109A2 (1979)          the M185 (39 cal), the turret bustle rack
     nato_e90_spg  M109A6 Paladin (1992)  the new Paladin turret, the M284
     nato_e00_spg  M109A7 (2015-17)       the A6 turret on the Bradley-derived hull
     spg_n         present day: rules.js names it "M109A7 Paladin", so the A7
   Redo of 2026-10-24 to the full-quality procedure.

   Sources (Wikimedia Commons, width 960, cached in scratchpad/q_paladin_ref)
     A  "M109 A6.png": a side elevation of the M109A6 after the US Army
        Illustrated Equipment Data sheet, LEFT side, gun forward.  The station
        table below is measured off it at 65.5 px/m: the published hull length
        6.19 m (20.3 ft) gives 64.3 px/m, the road-wheel pitch (seven wheels,
        3.96 m first to last) 65.9.  Its tube is drawn too long (5.75 m
        trunnion to muzzle against the 39-calibre tube's ~5.25 m), so the
        muzzle is placed from the tube, not the sheet.
     B  "Howitzer, Medium, 155 mm, M109.jpg" (US Army, March 1970): an M109
        right front 3/4, the short M126, the large fume extractor just behind
        the double-baffle brake, the travel lock, the louvred grille high on
        the right hull side, the cupola and M2 at the right rear of the roof.
     C  "Dutch M109 155 mm Self-propelled Howitzer Right Side.jpg" (1975-85):
        right front 3/4: turret walls leaning in, the sloped turret face, the
        right side door, the folded travel lock and the headlamp guards.
     D  "M109A2 howitzer Side View 20110813.jpg" (ROC Army M109A2): left rear
        3/4: the bustle rack, the armoured panoramic-sight hood on the left
        front of the roof, the two spades folded up on the hull tail, seven
        road wheels, front sprocket, rear idler, no return rollers.
     E  "An M-109 ... offloaded ... Desert Shield DA-ST-92-06661.jpg" (DoD,
        1990): a US M109A2/A3 head on in NATO three-colour: the glacis, the
        lamp clusters in their guards, the driver front LEFT.
     F  "Right side view of 1-41 FA M109A6 Paladin ... 160904-A-KM292-050.jpg"
        (US Army, 2016): an M109A6 in NATO three-colour, its bustle racks.
     G  "M109A7 Paladin self-propelled howitzer.jpg" (US Army, Alaska, Dec
        2015) and H "Bull Battery M109A7 Paladin ... (7510846).jpg" (US Army,
        Poland, Nov 2022): an M109A7 right front 3/4 and right side, tan: SIX
        road wheels (en.wikipedia: "Roadwheels have been reduced to 6 pairs"),
        the wide Bradley track, the black rubber flaps on the nose corners,
        the stowage bins along the turret sides, two whips.
     en.wikipedia "M109 howitzer": hull 20.3 ft, width 10 ft 4 in (3.15 m),
        height 10 ft 8 in; M126 23 cal in the M127 mount with "a double baffle
        muzzle brake with a large fume extractor just behind it"; M185 39 cal
        (A1 1973, A2 1979: the M178 mount, ballistic protection for the
        panoramic telescope, counterbalanced travel lock, 36 rounds); M284 39
        cal (A5, A6); A6 fielded 1992-94; A7 Bradley engine, transmission and
        tracks, six pairs of road wheels.

   Recognition list (what shows at game zoom, and where it rests)
     1  the flat-topped aluminium box hull, its short sloped glacis to a
        near-upright nose plate, engine and driver at the front [A, B, C, E]
     2  SEVEN road wheels a side on the M109 to A6 (SIX on the A7), the drive
        sprocket at the FRONT, the idler at the rear, no return rollers: the
        top run lies on the wheels [A, D; G, H]
     3  the big box turret over the rear two thirds, walls leaning in, the
        long sloped face [A, B, C]
     4  M109: the short M126, a big fume extractor right behind a fat
        double-baffle brake, the muzzle about level with the nose [B]
     5  A2: the long M185 with its evacuator past the middle and the open
        two-window brake; the bustle rack on the turret tail [C, D]
     6  A6/A7: the M284, the deep gun-mount housing on the face and the long
        armoured bustle overhanging the hull tail [A, F, G, H]
     7  the commander's cupola and its M2 at the right rear of the roof [A, B]
     8  the panoramic-sight hood, left front of the roof (armoured from the
        A2) [B, D]
     9  the two recoil spades folded up on the hull tail either side of the
        rear door [A, D]
    10  the travel lock folded on the glacis, the lamp clusters in their
        guards on the nose corners [C, E]
    11  A7: the wider rubber-padded Bradley track, black rubber flaps on the
        nose corners, side stowage bins on the turret [G, H]

   Side station table (metres; x from the middle of the hull, + forward; z up)
     hull nose plate x 3.04 from z 0.72 to 1.30; glacis to the deck (z 1.69)
     at x 2.08; tail x -3.04; belly z 0.45; hull sides down to z 0.84
     road wheels x 1.83 1.17 0.51 -0.15 -0.81 -1.47 -2.13, centre z 0.40,
     r 0.31; sprocket x 2.64 z 0.58; idler x -2.78 z 0.56
     turret (A6): face foot x 0.98 z 1.78, face top x 0.55, roof z 2.80
     (an overlay of A on the render), body tail x -2.56, bustle to x -3.79,
     its floor z 1.83; gun axis z 2.22 (trunnion taken at x 0.45); the M2 on
     a raised mount 0.35 m over the cupola; ring centre x -1.0.  The M109 and
     A2 turret (B, C, D): the same plan, roof z 2.70, tail flush with the
     hull tail, gun axis z 2.12.
     A7 (G, H): deck 1.80, a tall upright nose plate, six wheels at a 0.70 m
     pitch, r 0.32, the 0.53 m track.
   Lengths (measured X extent, gun level; the trunnion-to-muzzle length of a
   39-calibre tube taken as 5.25 m): M109 6.62 m (B: the brake about level
   with the hull nose; en.wikipedia's "30 ft gun forward" for the M109 does
   not fit a 23-calibre tube and is not used), A2 9.12 m, A6 and A7 9.52 m
   (en.wikipedia gives 32 ft, 9.75 m, gun forward for the A1-A7; A's own tube
   is drawn too long to settle it, so the gap is left and reported).

   Paint, taken to about 0.85 of the sampled level:
     M109 1963: US Army olive drab (B is monochrome; period standard) #4b4e32
     M109A2 1980s: NATO three-colour (E, dated 1990; D samples green #43552a,
       brown #483122, black #25292e): green #46502e, brown #4f3e29, black #232526.
       MERDC was also worn in the early 1980s; no dated US M109A2 photograph in
       it was found, so the three-colour is drawn.
     M109A6 1990s: NATO three-colour (F, 2016; the 1990s home-station scheme)
     M109A7: tan (G, H: sampled #c39e5f in shade) -> #a38c62 / #a69069.
   No bumper codes, numbers or markings ("SPH 8" in G is not drawn).

   Corrections to the old file: the hull and turret are lofted from the
   station table (A); the running gear turns ("roadwheel" groups); the M109's
   brake and fume extractor follow B; the A2 bustle is a rack (D), not stacked
   boxes; the spades are two plates either side of a rear door (D), not one
   slab; the gun is level as the 2S19 hero's (the game lays it).  Kept: six
   wheels on the A7 (G, H confirm it); the sprocket at the front.
   NOT confirmed, so NOT drawn: outer skirts on the A6 (no photograph or the
   sheet shows any), a MERDC scheme, the A7's spades (G and H do not show its
   tail; A and D show them on the A6 and A2), the A7's exact hull height (G
   and H are perspective views: the deck is raised 0.11 m on their evidence),
   the raised travel lock (the game lays the gun: it is drawn folded, C).

   Nodes: "turret" (ring centre, gun along +X), "barrel" (on the trunnion,
   inside the turret), "roadwheel" groups (the wheel discs of a station, both
   sides; the tyres are rings of revolution and stay in the hull).  Team
   colour is the plain C.team material on the turret roof tail and the front
   deck.  Model space +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPaladin = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* hull and running gear: M109 to A6 (A, D) and the A7 (G, H) */
  var HULL_OLD = { XR: -3.04, XN: 3.04, ZD: 1.69, XW: [1.83, 1.17, 0.51, -0.15, -0.81, -1.47, -2.13], ZW: 0.40, RW: 0.31,
                   XS: 2.64, ZS: 0.58, RS: 0.29, XI: -2.78, ZI: 0.52, RI: 0.29, TY: 1.37, TW: 0.19, pitch: 0.152, a7: false };
  var HULL_A7 = { XR: -3.08, XN: 3.08, ZD: 1.80, XW: [1.80, 1.10, 0.40, -0.30, -1.00, -1.70], ZW: 0.41, RW: 0.32,
                  XS: 2.58, ZS: 0.62, RS: 0.29, XI: -2.50, ZI: 0.47, RI: 0.31, TY: 1.31, TW: 0.265, pitch: 0.152, a7: true };

  /* gen 0 M109, 1 M109A2, 2 M109A6, 3 M109A7; L = trunnion to muzzle */
  var VARIANTS = {
    e60: { gen: 0, hull: HULL_OLD, L: 2.95, paint: { kind: "od", base: "#4b4e32", tone: ["#52553a", "#44472d"], seed: 1963 } },
    e80: { gen: 1, hull: HULL_OLD, L: 5.25, paint: { kind: "nato", base: "#46502e", tone: ["#4f3e29", "#232526"], seed: 1979 } },
    e90: { gen: 2, hull: HULL_OLD, L: 5.25, paint: { kind: "nato", base: "#46502e", tone: ["#4f3e29", "#232526"], seed: 1992 } },
    e00: { gen: 3, hull: HULL_A7, L: 5.25, paint: { kind: "tan", base: "#a38c62", tone: ["#aa936a", "#9a835a"], seed: 2017 } },
    e20: { gen: 3, hull: HULL_A7, L: 5.25, paint: { kind: "tan", base: "#a69069", tone: ["#ad9870", "#9c8760"], seed: 2024 } }
  };

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; a painted bin gets planar UVs in
     metres from the dominant axis of each face, so the paint never stretches */
  function Bin(mat, uv, k) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.k = k || 0.30; }
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
  /* a box on either side: y0 < y1 on the +Y side, mirrored to -Y */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  /* a slab along a line in the XZ plane, thickness th, across y0..y1 */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
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
  /* LOFT: cross-sections in the YZ plane at stations along X, each with the
     same number of points, joined in order and capped by a fan */
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
  /* one tile is 3.4 m of surface.  "nato": hard-edged blotches of brown and
     black over the green, each drawn nine times so the tile repeats; "od" and
     "tan": soft tonal patches.  Then plate seams, rain streaks and grime. */
  function blob(q, R, x, y, w, h) {
    var k, n = 9, a, r, pts = [];
    for (k = 0; k < n; k++) {
      a = k / n * TAU; r = 0.65 + R() * 0.45;
      pts.push([x + Math.cos(a) * w * r, y + Math.sin(a) * h * r]);
    }
    var ox, oy;
    for (ox = -256; ox <= 256; ox += 256) for (oy = -256; oy <= 256; oy += 256) {
      q.beginPath(); q.moveTo(pts[0][0] + ox, pts[0][1] + oy);
      for (k = 1; k < n; k++) q.lineTo(pts[k][0] + ox, pts[k][1] + oy);
      q.closePath(); q.fill();
    }
  }
  function paintTex(THREE, P) {
    return canvasTex(THREE, "m109" + P.kind + P.base + P.seed, function (q) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      if (P.kind === "nato") {
        for (k = 0; k < P.tone.length; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < (k ? 5 : 4); i++) {
            x = R() * 256; y = R() * 256; w = (k ? 22 : 36) + R() * (k ? 26 : 40);
            blob(q, R, x, y, w * 1.5, w * (0.55 + R() * 0.3));
          }
        }
      } else {
        for (k = 0; k < P.tone.length; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < 7; i++) {
            x = R() * 256; y = R() * 256; w = 30 + R() * 60;
            q.globalAlpha = 0.45; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
          }
        }
        q.globalAlpha = 1;
      }
      q.strokeStyle = "rgba(18,18,14,0.30)"; q.lineWidth = 1.1;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 0.5, 0); q.lineTo(i * 64 + 0.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 32.5); q.lineTo(256, i * 64 + 32.5); q.stroke();
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.07)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
      for (i = 0; i < 40; i++) {
        q.fillStyle = "rgba(10,10,8,0.16)";
        q.fillRect(R() * 256, R() * 256, 2, 2);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1c1d1e, roughness: 0.95, metalness: 0.03 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rub: new Bin(T.rub, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
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
  function shift(B, dx, dz) {
    var k, b, i;
    for (k in B) {
      b = B[k];
      for (i = 0; i < b.P.length; i += 3) { b.P[i] -= dx; b.P[i + 2] -= dz; }
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* a hull section: the belly between the tracks (half width wl) from zb,
     the side plates out over the tracks (half width wu) from zs to the top */
  function hsec(x, zb, zs, zt, wl, wu, ch) {
    return { x: x, c: [0, (zb + zt) / 2], p: [[-wl, zb], [wl, zb], [wl, zs], [wu, zs], [wu, zt - ch], [wu - ch, zt],
                                              [-(wu - ch), zt], [-wu, zt - ch], [-wu, zs], [-wl, zs]] };
  }
  function addHull(V, B) {
    var H = V.hull, Pn = B.paint, D = B.dark, G = B.glass, Tm = B.team, R = B.rub, gen = V.gen, s, k, x;
    var ZD = H.ZD, XN = H.XN, XR = H.XR, WU = 1.545, WL = H.TY - H.TW - 0.03, ZSD = 0.84, d = H.a7 ? 0.20 : 0;
    /* the station table, nose to tail (A; the nose from B, C, E) */
    if (H.a7) {
      /* the A7 (G, H): a tall upright nose plate and a short glacis */
      loft(Pn, [
        hsec(XN, 0.60, 0.98, 1.50, WL, WU - 0.03, 0.02),
        hsec(XN - 0.08, 0.50, 0.96, 1.56, WL, WU, 0.03),
        hsec(XN - 0.40, 0.45, ZSD, 1.70, WL, WU, 0.04),
        hsec(XN - 0.75, 0.45, ZSD, ZD, WL, WU, 0.05),
        hsec(XR + 0.10, 0.45, ZSD, ZD, WL, WU, 0.05),
        hsec(XR, 0.55, ZSD, ZD - 0.04, WL, WU, 0.03)
      ]);
    } else {
      loft(Pn, [
        hsec(XN, 0.74, 0.98, 1.30, WL, WU - 0.03, 0.02),       /* nose plate top edge */
        hsec(XN - 0.10, 0.58, 0.96, 1.35, WL, WU, 0.03),
        hsec(XN - 0.44, 0.45, ZSD, 1.50, WL, WU, 0.04),
        hsec(XN - 0.96, 0.45, ZSD, ZD, WL, WU, 0.05),         /* top of the glacis */
        hsec(XR + 0.10, 0.45, ZSD, ZD, WL, WU, 0.05),
        hsec(XR, 0.55, ZSD, ZD - 0.04, WL, WU, 0.03)           /* the tail plate */
      ]);
    }
    /* the fender lip along the hull side over the track (B, D) */
    box2(Pn, XR + 0.05, XN - 0.20, WU - 0.01, WU + 0.035, ZSD - 0.02, ZSD + 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* lamp clusters in their brush guards on the nose corners (C, E) */
      var ly = s * 1.20;
      box(D, XN - 0.10, XN + 0.02, ly - 0.16, ly + 0.16, 1.18 + d, 1.40 + d);
      cyl(G, [XN + 0.0, ly, 1.30 + d], [XN + 0.05, ly, 1.30 + d], 0.075, 0.075, 10);
      cyl(D, [XN + 0.10, ly - 0.17, 1.17 + d], [XN + 0.10, ly - 0.17, 1.45 + d], 0.016, 0.016, 5);
      cyl(D, [XN + 0.10, ly + 0.17, 1.17 + d], [XN + 0.10, ly + 0.17, 1.45 + d], 0.016, 0.016, 5);
      cyl(D, [XN + 0.10, ly - 0.17, 1.45 + d], [XN + 0.10, ly + 0.17, 1.45 + d], 0.016, 0.016, 5);
      /* tow eyes and shackles on the nose plate (E, G) */
      box(D, XN - 0.02, XN + 0.07, s * 0.62 - 0.07, s * 0.62 + 0.07, 0.86, 1.00);
      /* tail: lamps and tow pintles */
      box(D, XR - 0.05, XR, s * 1.38 - 0.08, s * 1.38 + 0.08, 1.45, 1.57);
      box(D, XR - 0.07, XR, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.62, 0.74);
    }
    if (H.a7) {
      /* the A7: black rubber flaps over the nose corners (G, H) */
      for (s = -1; s <= 1; s += 2) box(R, XN - 0.80, XN + 0.03, s > 0 ? 1.04 : -1.60, s > 0 ? 1.60 : -1.04, 0.70, 1.02);
      box2(R, XN - 1.70, XN - 0.80, WU + 0.035, WU + 0.05, 0.74, 1.02);
    }
    /* driver's hatch with its periscopes, front LEFT behind the glacis (E) */
    cylZ(Pn, XN - 1.20, 0.72, ZD - 0.01, ZD + 0.07, 0.30, 20);
    cylZ(Pn, XN - 1.20, 0.72, ZD + 0.07, ZD + 0.10, 0.24, 18);
    for (k = -1; k <= 1; k++) box(G, XN - 0.92, XN - 0.86, 0.72 + k * 0.17 - 0.06, 0.72 + k * 0.17 + 0.06, ZD, ZD + 0.08);
    /* engine deck, front RIGHT: grille and its louvres (C) */
    box(D, XN - 2.05, XN - 1.05, -1.40, -0.30, ZD - 0.01, ZD + 0.015);
    for (k = 0; k < 9; k++) box(Pn, XN - 2.02 + k * 0.11, XN - 1.97 + k * 0.11, -1.37, -0.33, ZD + 0.005, ZD + 0.04);
    /* the M109's louvred grille high on the right hull side (B) */
    if (gen === 0) {
      box(D, 0.55, 1.45, -WU - 0.012, -WU + 0.01, 1.30, 1.60);
      for (k = 0; k < 8; k++) box(Pn, 0.58 + k * 0.11, 0.62 + k * 0.11, -WU - 0.02, -WU, 1.31, 1.59);
    }
    /* the travel lock folded flat on the glacis (C): an A-frame and its
       cradle; the game lays the gun, so it is drawn stowed */
    var g0 = H.a7 ? [XN - 0.12, 1.55] : [XN - 0.18, 1.33], g1 = H.a7 ? [XN - 0.70, 1.78] : [XN - 0.88, 1.66];
    belt(D, g0[0], g0[1] + 0.04, g1[0], g1[1] + 0.04, -0.34, -0.28, 0.05);
    belt(D, g0[0], g0[1] + 0.04, g1[0], g1[1] + 0.04, 0.28, 0.34, 0.05);
    belt(D, g1[0] + 0.02, g1[1] + 0.05, g1[0] + 0.16, g1[1] - 0.02, -0.34, 0.34, 0.06);
    box(D, g0[0] - 0.08, g0[0] + 0.04, -0.40, 0.40, g0[1] - 0.06, g0[1] + 0.06);
    /* team flash on the front deck, left of the turret face */
    box(Tm, XN - 1.95, XN - 1.45, 0.25, 0.95, ZD, ZD + 0.012);
    /* turret ring collar */
    cylZ(D, -1.0, 0, ZD - 0.01, ZD + 0.03, 1.15, 32);
    /* the rear: the big door in the middle and the two recoil spades folded
       up either side of it (A, D) */
    box(D, XR - 0.015, XR, -0.46, 0.46, 0.62, ZD - 0.10);
    box(Pn, XR - 0.04, XR - 0.01, -0.42, 0.42, 0.66, ZD - 0.14);
    cylY(D, XR - 0.05, -0.30, -0.10, 1.10, 0.03, 6);
    for (s = -1; s <= 1 && !H.a7; s += 2) {
      var y0 = s * 0.52, y1 = s * 1.48, ya = Math.min(y0, y1), yb = Math.max(y0, y1);
      cylY(D, XR - 0.07, ya, yb, 0.58, 0.06, 10);                    /* hinge tube */
      box(Pn, XR - 0.14, XR - 0.04, ya + 0.02, yb - 0.02, 0.58, 1.58); /* the spade, folded up */
      box(D, XR - 0.15, XR - 0.04, ya + 0.02, yb - 0.02, 1.50, 1.62);  /* its cutting edge */
      box(Pn, XR - 0.18, XR - 0.04, s * 0.98 - 0.04, s * 0.98 + 0.04, 0.66, 1.50);  /* rib */
    }
    /* plate seams along the upper hull side */
    for (s = -1; s <= 1; s += 2) {
      for (x = -2.4; x < 2.0; x += 1.3) box(D, x, x + 0.02, s > 0 ? WU : -WU - 0.005, s > 0 ? WU + 0.005 : -WU, ZSD + 0.06, ZD - 0.05);
    }
  }

  /* --------------------------------------------------------- running gear */
  function addRunning(V, B, WB) {
    var H = V.hull, D = B.dark, R = B.rub, Pn = B.paint, i, s, k, an, yc, ya, yb, XW = H.XW, nw = XW.length;
    var h = 0.035, top = H.ZW + H.RW + h, path = [];
    /* the belt centre line: ground run under the wheels, up round the idler,
       the top run lying on the wheels (no return rollers: A, D, H), round
       the sprocket and down to the front wheel */
    path.push([XW[nw - 1] - 0.05, h]);
    for (k = 0; k <= 10; k++) {
      an = -Math.PI * 0.62 - k / 10 * Math.PI * 0.86;
      path.push([H.XI + Math.cos(an) * (H.RI + h), H.ZI + Math.sin(an) * (H.RI + h)]);
    }
    path.push([XW[nw - 1], top]);
    path.push([XW[0], top]);
    for (k = 0; k <= 10; k++) {
      an = Math.PI * 0.5 - k / 10 * Math.PI * 0.95;
      path.push([H.XS + Math.cos(an) * (H.RS + h), H.ZS + Math.sin(an) * (H.RS + h)]);
    }
    path.push([XW[0] + 0.08, h]);
    for (s = -1; s <= 1; s += 2) {
      yc = s * H.TY; ya = yc - H.TW; yb = yc + H.TW;
      for (i = 0; i < path.length; i++) {
        var p0 = path[i], p1 = path[(i + 1) % path.length];
        belt(D, p0[0], p0[1], p1[0], p1[1], ya, yb, 0.07);
      }
      /* track shoes: rubber pads under the ground run (T136; the A7's
         Bradley track wider), grousers on the top run */
      for (i = 0; i < 60; i++) {
        var gx = XW[nw - 1] - 0.06 + i * H.pitch;
        if (gx > XW[0] + 0.06) break;
        box(R, gx, gx + H.pitch * 0.62, ya + 0.02, yb - 0.02, 0.0, 0.03);
        box(D, gx, gx + 0.05, yc - 0.035, yc + 0.035, 0.06, 0.15);
      }
      for (i = 0; i < 60; i++) {
        var tx = XW[nw - 1] + i * H.pitch;
        if (tx > XW[0]) break;
        box(D, tx, tx + 0.05, ya - 0.01, yb + 0.01, top + 0.03, top + 0.055);
      }
      /* drive sprocket, FRONT: two toothed rings and a hub (A, B, G) */
      cylY(D, H.XS, yc - 0.15, yc + 0.15, H.ZS, H.RS - 0.06, 20);
      cylY(Pn, H.XS, yc + s * 0.15, yc + s * 0.19, H.ZS, 0.15, 14);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU;
        cyl(D, [H.XS + Math.cos(ta) * (H.RS - 0.03), yc - 0.14, H.ZS + Math.sin(ta) * (H.RS - 0.03)],
               [H.XS + Math.cos(ta) * (H.RS - 0.03), yc + 0.14, H.ZS + Math.sin(ta) * (H.RS - 0.03)], 0.035, 0.035, 5);
      }
      /* the final drive housing behind it, on the hull side */
      cylY(D, H.XS, s * 1.12, s * 1.20, H.ZS, 0.20, 14);
      /* idler, REAR: a dished wheel on its crank (A, D) */
      cylY(R, H.XI, yc - 0.15, yc - 0.02, H.ZI, H.RI, 20);
      cylY(R, H.XI, yc + 0.02, yc + 0.15, H.ZI, H.RI, 20);
      cylY(Pn, H.XI, yc + s * 0.15, yc + s * 0.17, H.ZI, H.RI - 0.07, 16);
      cylY(D, H.XI, yc + s * 0.17, yc + s * 0.21, H.ZI, 0.07, 10);
      belt(D, H.XI, H.ZI, H.XI + 0.40, H.ZI + 0.10, s * 1.10, s * 1.16, 0.10);
      /* road-wheel tyres, a pair a station (rings of revolution: they stay) */
      for (i = 0; i < nw; i++) {
        var tw = H.a7 ? 0.17 : 0.13, to = H.a7 ? 0.035 : 0.03;
        cylY(R, XW[i], yc - to - tw, yc - to, H.ZW, H.RW, 22);
        cylY(R, XW[i], yc + to, yc + to + tw, H.ZW, H.RW, 22);
        cylY(D, XW[i], s * (H.TY - H.TW - 0.12), yc, H.ZW, 0.06, 8);
        /* torsion-bar road arm, trailing back to the hull */
        belt(D, XW[i], H.ZW, XW[i] + 0.34, H.ZW + 0.16, s * (H.TY - H.TW - 0.10), s * (H.TY - H.TW - 0.04), 0.09);
      }
    }
    /* the road-wheel discs: a dished plate, its bolt ring and hub, one group
       a station holding both sides (A, D) */
    for (i = 0; i < nw; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * H.TY, wb = WB[i], ro = H.RW - 0.065, e = s * (H.a7 ? 0.21 : 0.165);
        cylY(wb, 0, y0 + e - s * 0.01, y0 + e + s * 0.012, 0, ro, 20);
        cylY(wb, 0, y0 - e - s * 0.012, y0 - e + s * 0.01, 0, ro, 20);
        cylY(wb, 0, y0 + e, y0 + e + s * 0.035, 0, 0.14, 16);
        cylY(wb, 0, y0 + e + s * 0.035, y0 + e + s * 0.07, 0, 0.07, 10);
        for (k = 0; k < 8; k++) {
          var ba = k / 8 * TAU + 0.2, bx = Math.cos(ba) * 0.18, bz = Math.sin(ba) * 0.18;
          box(wb, bx - 0.016, bx + 0.016, s > 0 ? y0 + e : y0 + e - 0.025, s > 0 ? y0 + e + 0.025 : y0 + e, bz - 0.016, bz + 0.016);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* a turret section: walls leaning in from the foot half width hw0 (z0) to
     hw1 at the eave (z1), a small roof chamfer to zt */
  function tsec(x, hw0, hw1, z0, z1, zt) {
    return { x: x, c: [0, (z0 + zt) / 2], p: [[-hw0, z0], [hw0, z0], [hw1, z1], [hw1 - 0.06, zt], [-(hw1 - 0.06), zt], [-hw1, z1]] };
  }
  var TX = -1.0, TRX = 0.45, TRZ = 2.12;
  function addTurret(V, B) {
    var P = B.paint, D = B.dark, G = B.glass, Tm = B.team, R = B.rub, gen = V.gen, ZD = V.hull.ZD, s, k, a, i;
    var dz = ZD - 1.69, rz = gen >= 2 ? 0.10 : 0, Z0 = ZD + 0.03, ZR = 2.70 + dz + rz, ZE = ZR - 0.06, mz = gen >= 2 ? 0.35 : 0;
    var tail = gen >= 2 ? -2.56 : -3.06;
    /* the body: the long sloped face (A, B, C), walls leaning in (C) */
    loft(P, [
      tsec(0.98, 1.30, 1.06, Z0, Z0 + 0.10, Z0 + 0.12),       /* foot of the face */
      tsec(0.90, 1.38, 1.18, Z0, Z0 + 0.30, Z0 + 0.32),
      tsec(0.55, 1.44, 1.32, Z0, ZE, ZR),                      /* the face meets the roof */
      tsec(tail + 0.05, 1.44, 1.32, Z0, ZE, ZR),
      tsec(tail, 1.42, 1.30, Z0 + 0.04, ZE - 0.02, ZR - 0.03)
    ]);
    /* the A6/A7 bustle: the armoured box over the hull tail, its floor at
       z 1.83 (A, F, H), with stowage racks on its tail */
    if (gen >= 2) {
      loft(P, [
        tsec(tail + 0.04, 1.36, 1.30, 1.83 + dz, ZE - 0.02, ZR - 0.02),
        tsec(-3.70, 1.36, 1.30, 1.83 + dz, ZE - 0.02, ZR - 0.02),
        tsec(-3.79, 1.32, 1.26, 1.87 + dz, ZE - 0.06, ZR - 0.06)
      ]);
      for (k = -2; k <= 2; k++) box(D, -3.82, -3.78, k * 0.52 - 0.03, k * 0.52 + 0.03, 1.90 + dz, ZR - 0.10);
      box(D, -3.82, -3.78, -1.30, 1.30, ZR - 0.14, ZR - 0.10);
      box(D, -3.82, -3.78, -1.30, 1.30, 2.10 + dz, 2.14 + dz);
      /* rack rails along the bustle sides (F) */
      for (s = -1; s <= 1; s += 2) {
        cyl(D, [-2.60, s * 1.39, ZR - 0.12], [-3.75, s * 1.39, ZR - 0.12], 0.02, 0.02, 6);
        cyl(D, [-2.60, s * 1.39, 2.05 + dz], [-3.75, s * 1.39, 2.05 + dz], 0.02, 0.02, 6);
        for (k = 0; k < 4; k++) box(D, -2.70 - k * 0.33, -2.68 - k * 0.33, s > 0 ? 1.34 : -1.40, s > 0 ? 1.40 : -1.34, 2.05 + dz, ZR - 0.12);
      }
    } else if (gen === 1) {
      /* the A2's bustle rack on the turret tail, loaded with boxes (D) */
      box(D, -3.40, -3.06, -1.30, 1.30, 1.92, 1.96);
      for (s = -1; s <= 1; s += 2) {
        cyl(D, [-3.40, s * 1.30, 1.94], [-3.40, s * 1.30, 2.52], 0.022, 0.022, 6);
        cyl(D, [-3.40, s * 1.30, 2.52], [-3.06, s * 1.30, 2.52], 0.022, 0.022, 6);
      }
      cyl(D, [-3.40, -1.30, 2.52], [-3.40, 1.30, 2.52], 0.022, 0.022, 6);
      box(P, -3.34, -3.07, -1.20, -0.25, 1.96, 2.40);
      box(P, -3.30, -3.07, 0.05, 1.10, 1.96, 2.30);
      box(D, -3.36, -3.07, -0.20, 0.00, 1.96, 2.46);
    } else {
      /* the M109's small stowage box on the turret tail (B) */
      box(P, -3.22, -3.06, -0.90, 0.90, 2.00, 2.40);
    }
    /* the gun mount in the face: the M127 / M178 mount's shield on the
       M109 and A2 (B, C), the deep Paladin mount housing on the A6/A7 (A) */
    if (gen >= 2) {
      box(P, 0.62, 1.16, -0.56, 0.56, Z0 + 0.06, 2.56 + dz);
      box(P, 0.62, 1.10, -0.50, 0.50, 2.56 + dz, 2.66 + dz);
      cylX(D, 1.15, 1.20, 0, TRZ + dz + rz, 0.30, 20);
    } else {
      box(P, 0.70, 1.03, -0.42, 0.42, 1.88 + dz, 2.36 + dz);
      cylX(D, 1.02, 1.07, 0, TRZ + dz, 0.25, 18);
    }
    /* commander's cupola at the right rear of the roof, with its M2 (A, B) */
    var CX = gen >= 2 ? -1.10 : -1.80, CY = -0.80;
    cylZ(P, CX, CY, ZR - 0.01, ZR + 0.16, 0.38, 22);
    cylZ(D, CX, CY, ZR + 0.16, ZR + 0.19, 0.31, 18);
    cylZ(P, CX, CY, ZR + 0.19, ZR + 0.24, 0.26, 16);
    for (k = 0; k < 6; k++) {
      a = k * Math.PI / 3 + 0.3;
      box(G, CX + Math.cos(a) * 0.385 - 0.04, CX + Math.cos(a) * 0.385 + 0.04, CY + Math.sin(a) * 0.385 - 0.06, CY + Math.sin(a) * 0.385 + 0.06, ZR + 0.06, ZR + 0.13);
    }
    /* the M2: on the cupola ring (B), on a raised mount on the Paladins (A, G) */
    cyl(D, [CX + 0.10, CY, ZR + 0.20], [CX + 0.10, CY, ZR + 0.40 + mz], 0.03, 0.03, 6);      /* pintle */
    if (mz) box(P, CX - 0.05, CX + 0.25, CY - 0.18, CY + 0.18, ZR + 0.20, ZR + 0.30);
    box(D, CX - 0.20, CX + 0.30, CY - 0.07, CY + 0.07, ZR + 0.38 + mz, ZR + 0.52 + mz);     /* receiver */
    cylX(D, CX + 0.30, CX + 1.40, CY, ZR + 0.46 + mz, 0.022, 6);                            /* barrel */
    cylX(D, CX + 0.30, CX + 0.50, CY, ZR + 0.46 + mz, 0.04, 8);
    box(D, CX - 0.12, CX + 0.12, CY + 0.08, CY + 0.24, ZR + 0.30 + mz, ZR + 0.44 + mz);     /* ammunition can */
    /* the panoramic-sight hood, left front of the roof (B; armoured from the A2, D) */
    if (gen >= 1) {
      box(P, -0.15, 0.32, 0.62, 1.10, ZR - 0.01, ZR + 0.28);
      box(G, 0.32, 0.335, 0.70, 1.02, ZR + 0.10, ZR + 0.22);
    } else {
      cylZ(D, 0.10, 0.85, ZR - 0.01, ZR + 0.20, 0.10, 10);
      box(G, 0.13, 0.20, 0.79, 0.91, ZR + 0.12, ZR + 0.19);
    }
    /* loader's hatch, left rear; ventilator */
    cylZ(P, gen >= 2 ? -1.55 : -1.85, 0.72, ZR - 0.01, ZR + 0.06, 0.30, 20);
    cylZ(D, gen >= 2 ? -1.55 : -1.85, 0.72, ZR + 0.06, ZR + 0.08, 0.10, 10);
    cylZ(P, -0.55, 0.0, ZR - 0.01, ZR + 0.12, 0.15, 12);
    cylZ(P, -0.55, 0.0, ZR + 0.12, ZR + 0.15, 0.20, 12);
    if (gen >= 2) {
      /* the Paladin's raised roof plate and the GPS / navigation box (A) */
      box(P, -0.40, 0.25, -0.55, 0.30, ZR - 0.01, ZR + 0.08);
      box(P, -2.40, -1.95, -0.30, 0.20, ZR - 0.01, ZR + 0.18);
    }
    /* whips: one on the M109, two later (A, G) */
    var wx = gen >= 2 ? -3.40 : -2.75;
    cylZ(D, wx, -1.15, ZR - 0.01, ZR + 0.12, 0.05, 8);
    cyl(D, [wx, -1.15, ZR + 0.12], [wx - 0.04, -1.15, ZR + 2.00], 0.012, 0.008, 4);
    if (gen >= 1) {
      cylZ(D, wx, 1.15, ZR - 0.01, ZR + 0.12, 0.05, 8);
      cyl(D, [wx, 1.15, ZR + 0.12], [wx - 0.04, 1.15, ZR + 1.70], 0.012, 0.008, 4);
    }
    /* team flash on the roof tail, facing up */
    box(Tm, gen >= 2 ? -3.10 : -2.55, gen >= 2 ? -2.70 : -2.15, -0.30, 0.30, ZR - 0.005, ZR + 0.008);
    /* the flanks: the big side doors, grab rails, lifting eyes (B, C, D) */
    for (s = -1; s <= 1; s += 2) {
      var wy = s * 1.42, wo = s * 1.445;
      box(D, -1.45, -0.35, Math.min(wy, wo), Math.max(wy, wo), Z0 + 0.20, Z0 + 0.23);
      box(D, -1.45, -0.35, Math.min(wy, wo), Math.max(wy, wo), ZE - 0.22, ZE - 0.19);
      box(D, -1.45, -1.42, Math.min(wy, wo), Math.max(wy, wo), Z0 + 0.20, ZE - 0.19);
      box(D, -0.38, -0.35, Math.min(wy, wo), Math.max(wy, wo), Z0 + 0.20, ZE - 0.19);
      cyl(D, [-1.20, s * 1.47, 2.30 + dz], [-0.60, s * 1.47, 2.30 + dz], 0.018, 0.018, 6);
      cylY(D, 0.30, s * 1.24, s * 1.27, ZR + 0.05, 0.07, 8);
      cylY(D, -2.20, s * 1.24, s * 1.27, ZR + 0.05, 0.07, 8);
      if (gen === 3) {
        /* the A7's stowage bins along the turret sides (G, H) */
        for (i = 0; i < 3; i++) box(P, -0.25 - i * 0.40, 0.05 - i * 0.40, s > 0 ? 1.43 : -1.60, s > 0 ? 1.60 : -1.43, 2.00 + dz, 2.38 + dz);
        box(P, -2.40, -1.55, s > 0 ? 1.37 : -1.54, s > 0 ? 1.54 : -1.37, 2.05 + dz, 2.30 + dz);
      } else if (gen === 2) {
        /* ammunition cans hung on the A6's side rack (F) */
        for (i = 0; i < 3; i++) box(P, -0.20 - i * 0.30, 0.02 - i * 0.30, s > 0 ? 1.44 : -1.57, s > 0 ? 1.57 : -1.44, 2.02 + dz, 2.36 + dz);
      }
    }
    /* turret rear: the ammunition door (B, D) */
    var rx = gen >= 2 ? -3.80 : tail - 0.01;
    if (gen < 2) box(D, rx - 0.01, rx, -0.55, 0.55, Z0 + 0.25, ZE - 0.25);
  }

  /* -------------------------------------------------------------- barrel */
  /* in the barrel frame: origin on the trunnion, +X the bore */
  function addBarrel(V, B) {
    var P = B.paint, D = B.dark, L = V.L, gen = V.gen, s, k;
    if (gen === 0) {
      /* the M126: a short tube, the large fume extractor right behind a fat
         double-baffle brake (B; en.wikipedia) */
      var bs = L - 0.42;
      cylX(P, 0.25, 1.00, 0, 0, 0.21, 22);                     /* recoil sleeve */
      cyl(P, [1.00, 0, 0], [1.10, 0, 0], 0.21, 0.13, 22);
      cyl(P, [1.10, 0, 0], [bs - 0.62, 0, 0], 0.125, 0.115, 20);
      cyl(P, [bs - 0.62, 0, 0], [bs - 0.50, 0, 0], 0.115, 0.19, 20);   /* fume extractor */
      cylX(P, bs - 0.50, bs - 0.15, 0, 0, 0.19, 20);
      cyl(P, [bs - 0.15, 0, 0], [bs - 0.08, 0, 0], 0.19, 0.12, 20);
      cylX(D, bs - 0.08, bs, 0, 0, 0.12, 16);
      cylX(P, bs, L, 0, 0, 0.22, 22);                         /* the brake drum */
      for (s = -1; s <= 1; s += 2) {
        box(D, bs + 0.05, bs + 0.19, s > 0 ? 0.16 : -0.235, s > 0 ? 0.235 : -0.16, -0.10, 0.10);
        box(D, bs + 0.25, bs + 0.37, s > 0 ? 0.16 : -0.235, s > 0 ? 0.235 : -0.16, -0.10, 0.10);
      }
      cylX(D, L - 0.012, L, 0, 0, 0.08, 14);
      return;
    }
    /* the M185 (A2) and M284 (A6, A7): a 39-calibre tube */
    var sl = gen >= 2 ? 1.50 : 1.15, br = gen >= 2 ? 0.20 : 0.17, bl = gen >= 2 ? 0.64 : 0.55, t1 = L - bl;
    if (gen >= 2) {
      cyl(P, [0.40, 0, 0], [sl, 0, 0], 0.30, 0.20, 24);        /* the Paladin's cradle cover */
    } else {
      cylX(P, 0.40, sl, 0, 0, 0.20, 22);
    }
    cyl(P, [sl, 0, 0], [t1, 0, 0], 0.12, 0.095, 22);
    var ev = sl + (gen >= 2 ? 0.50 : 0.55) * (t1 - sl);         /* bore evacuator */
    cyl(P, [ev - 0.40, 0, 0], [ev - 0.30, 0, 0], 0.108, 0.155, 22);
    cylX(P, ev - 0.30, ev + 0.30, 0, 0, 0.155, 22);
    cyl(P, [ev + 0.30, 0, 0], [ev + 0.38, 0, 0], 0.155, 0.103, 22);
    /* the double-baffle brake: a block with a window each side between two
       baffles (C, G) */
    cylX(D, t1 - 0.04, t1 + 0.04, 0, 0, 0.12, 16);
    box(P, t1 + 0.04, t1 + 0.14, -br, br, -br * 0.85, br * 0.85);
    box(P, L - 0.12, L, -br, br, -br * 0.85, br * 0.85);
    box(P, t1 + 0.14, L - 0.12, -br, br, br * 0.55, br * 0.85);
    box(P, t1 + 0.14, L - 0.12, -br, br, -br * 0.85, -br * 0.55);
    cylX(D, t1 + 0.14, L - 0.12, 0, 0, 0.09, 12);
    for (k = 0; k < 2; k++) cylX(D, t1 + 0.13 + k * 0.03, t1 + 0.14 + k * 0.03, 0, 0, br * 0.5, 12);
    cylX(D, L - 0.008, L, 0, 0, 0.08, 14);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.e60, H = V.hull, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, bg, TB = bins(T), BB = bins(T), dz = H.ZD - 1.69;
    g.name = "us_paladin_" + which;
    for (i = 0; i < H.XW.length; i++) WB.push(new Bin(T.paint, true));
    addHull(V, HB);
    addRunning(V, HB, WB);
    var hull = new THREE.Group(); hull.name = "hull";
    flush(THREE, hull, HB);
    g.add(hull);
    for (i = 0; i < H.XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(H.XW[i], 0, H.ZW);
      flush(THREE, wg, { paint: WB[i] });
      g.add(wg);
    }
    addTurret(V, TB);
    shift(TB, TX, H.ZD);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, H.ZD);
    flush(THREE, tg, TB);
    addBarrel(V, BB);
    bg = new THREE.Group();
    bg.name = "barrel";
    bg.position.set(TRX - TX, 0, TRZ + dz + (V.gen >= 2 ? 0.10 : 0) - H.ZD);
    flush(THREE, bg, BB);
    tg.add(bg);
    g.add(tg);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["nato_e60_spg"] = { len: 6.62, build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e60"); } };
UNIT_MODELS["nato_e80_spg"] = { len: 9.12, build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e80"); } };
UNIT_MODELS["nato_e90_spg"] = { len: 9.52, build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e90"); } };
UNIT_MODELS["nato_e00_spg"] = { len: 9.52, build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e00"); } };
UNIT_MODELS["spg_n"] = { len: 9.52, build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e20"); } };
