/* ============ ru_tor.js - HERO models: the 9K330 Tor family ============
   The Soviet / Russian short-range air-defence system (NATO SA-15 Gauntlet)
   in three guises, each drawn as the vehicle its row names:
     pact_e80_tor     9K330 Tor, 9A330 on the GM-355         (1986)
     pact_e90_tor     9K331 Tor-M1, 9A331 on the GM-355      (1991)
     pact_e00_tor_m2  9K332 Tor-M2, 9A331M                   (2016)

   References (Wikimedia Commons, fetched once each at 960 px):
     A "9A330 ... Military-historical Museum ... Saint-Petersburg"  9A330,
        turret turned aft, search radar raised: the mesh reflector on its
        lattice frame with the flat feed panel in front and the blade aerial
        on a side arm; the rear wall of the turret; ribbed missile panels;
        cable coil, lamps and tow eyes on the glacis; seven road wheels.
     B "9A330 TEL 9K330 Tor system Rear View 2017-12-24"  the hull rear plate,
        rear deck, tow eyes.
     C "9K330 Tor, Kyiv 2018, 43"  9A330 front three-quarter: driver's station
        left of centre, louvred box on the right front deck, cable coil on the
        upper glacis, lamps on the deck corners (Ukrainian camouflage: NOT used).
     D "9A331 Tor-M1 - Engineering technologies 2012 (1)"  Tor-M1 starboard
        three-quarter, the main photograph: square tracking-radar housing with
        the round cream face on the turret front, sphere on its left top
        corner, TV-optical sight box on its right, two rows of four panels a
        side on the turret (sloped lids above a ribbed band), search radar
        raised on the turret rear, dark rubber fender band, tall whips forward.
     E "TOR-2M (27053439667)"  Tor-M2 at a Moscow parade rehearsal, port side:
        the station table was measured off it (wheel diameter 0.68 m as the
        scale, 75 px): fender 1.03-1.21 m, centre superstructure top 2.29 m,
        rear deck 1.89 m, turret roof 3.6 m; seven road wheels, plain idler in
        FRONT and toothed drive sprocket at the REAR (zoomed), return rollers
        above; glazed driver's cab; flat search array folded; the tilted
        tracking-radar box.
     F "SAM Tor-2M on exercises in Transbaikalia"  Tor-M2 with the search
        radar raised: a flat rectangular array with a curved lattice array on
        its top edge, on a short mast; the tracking radar a rectangular box
        leaning back on the turret front, sphere beside it; 4 x 2 panels.
     G "Tor-M2 02"  Tor-M2 head-on: the two-window cab, louvred box on the
        right front, coil on the glacis, lamps at the corners.
     ru.wikipedia "Tor (zenitnyi raketnyi kompleks)": chassis "Object 355"
        (GM-355); the 9A331M2 is 8.9 x 3.5 m, 5.3 m high in action and 3.6 m
        travelling; 16 9M338K for the Tor-M2.
   Published figures (row data): hull 7.5 m x 3.3 m, 34 t.  The Tor-M2's
   8.9 m (ru.wikipedia) is not drawn: photographs E-G show the same
   seven-wheel hull, and the extra length is not visible on them.

   Recognition list (each drawn; reference in brackets):
     1  long box hull on seven closely spaced road wheels a side, idler in
        front, toothed sprocket at the rear [D, E zoomed]
     2  a raised centre superstructure under the turret with big side doors,
        a lower rear deck behind it and a short front deck [D, E]
     3  two-plane nose: shallow upper glacis carrying a coiled cable, steep
        lower glacis with tow eyes, lamps on the deck corners [A, C, G]
     4  driver's station front left; louvred box front right [C, G]; the
        Tor-M2 has a glazed two-window cab there [E, G]
     5  fender band the full length, turned down over the idler [D, E]
     6  the big turret: vertical ribbed lower band, sloped upper planes with
        four lids a side over the vertical missile cells, narrow flat roof [D, E, F]
     7  tracking radar on the turret front: Tor / Tor-M1 a square housing
        with a round face [D]; Tor-M2 a rectangular box leaning back [E, F]
     8  search radar on the turret rear, raised: Tor / Tor-M1 the curved mesh
        reflector on a lattice frame with a flat feed panel [A, D]; Tor-M2 a
        flat array with a curved lattice on top [F]
     9  sphere beside the tracking radar, TV-optical sight box [D, F]
    10  whip aerials on the front deck [D, E]
   Paint (photo-sampled, taken to about 0.8): Tor-M1 lit glacis #646758 ->
   #505246 with the dark rubber band; Tor-M2 parade side #686653 and
   Transbaikalia #404731 -> #4c5140; the Tor-M1 tracking face cream #cbc9b3 ->
   #a3a18f.  The 9A330 photographs are a museum repaint in warm sun (#9f8f67)
   and Ukrainian camouflage, so the 1986 row takes the Soviet green the other
   Soviet heroes use (ru_t72 #4f5a3a).  No numbers, stripes or stars.
   Corrections to the old file: the turret ring sits at the hull middle on a
   raised superstructure (the old turret sat on the rear deck); the radars
   are drawn in action, as photographs A, D and F show them.
   NOT confirmed and therefore not invented: any outward difference between
   the 9A330 and the 9A331 launcher beyond paint (the TV-optical sight is on
   both, ru.wikipedia); a separate lid for each of the Tor-M2's sixteen
   rounds (it keeps the eight lids its photographs show); the colour of the
   9A330's tracking-radar face (drawn in the hull paint).

   Nodes: "turret" (trained, rests forward, ring at TX) and seven
   "roadwheel" groups (the road-wheel discs; the tyres are rings of revolution
   and stay in the hull).  Team colour is the plain C.team material on two
   up-facing strips on the rear deck corners.  Model space +X nose, +Y left,
   +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTor = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    T80: { gen: 0, midAft: -2.00, darkBand: false, face: null,
           paint: { base: "#4f5a3a", tone: ["#566141", "#475233"], seed: 5 } },
    M1:  { gen: 1, midAft: -2.00, darkBand: true, face: "#a3a18f",
           paint: { base: "#505246", tone: ["#585a4d", "#484a3f"], seed: 17 } },
    M2:  { gen: 2, midAft: -1.25, darkBand: false, face: null,
           paint: { base: "#4c5140", tone: ["#545947", "#444939"], seed: 29 } }
  };

  /* station table, side elevation (photograph E scaled on the 0.68 m road wheel) */
  var XW = [2.25, 1.45, 0.65, -0.15, -0.95, -1.75, -2.55], ZW = 0.42, RW = 0.34;
  var TY = 1.27, TW = 0.23;          /* track centre line and half width */
  var XI = 3.05, ZI = 0.58, RI = 0.30;   /* idler, front */
  var XS = -3.25, ZS = 0.62, RS = 0.33;  /* drive sprocket, rear */
  var ZSP = 1.03, ZFD = 1.66, ZMID = 2.29, ZRD = 1.92;
  var TX = 0.0, TZ = ZMID;         /* turret ring on the centre superstructure */

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
  /* hull paint: one Russian green per period, soft tonal patches where the
     paint has been touched up, plate seams, and rain streaks; one tile is
     2.94 m of surface */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "tor" + P.base + P.seed, function (q) {
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
  /* the search reflector is a wire mesh: a grid over the paint colour */
  function meshTex(THREE, base) {
    return canvasTex(THREE, "tormesh" + base, function (q) {
      var i;
      q.fillStyle = "#2c2f2a"; q.fillRect(0, 0, 256, 256);
      q.strokeStyle = base; q.lineWidth = 5;
      for (i = 0; i <= 8; i++) {
        q.beginPath(); q.moveTo(i * 32, 0); q.lineTo(i * 32, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 32); q.lineTo(256, i * 32); q.stroke();
      }
    });
  }

  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), mt = meshTex(THREE, V.paint.base);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.mesh = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.25, side: THREE.DoubleSide });
    if (mt) T.mesh.map = mt; else T.mesh.color.set(0x3c4036);
    T.face = new THREE.MeshStandardMaterial({ color: V.face || V.paint.base, roughness: 0.7, metalness: 0.05 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             team: new Bin(T.team, false), mesh: new Bin(T.mesh, true, 2.0), face: new Bin(T.face, false) };
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

  /* ---------------------------------------------------------------- hull */
  /* one hull cross-section: narrow belly between the tracks (wl), sponsons
     out over the tracks from zs, full width wu up to the top zt, chamfer ch */
  function hsec(x, zb, zs, zt, ch) {
    var wl = 1.02, wu = 1.50;
    return { x: x, c: [0, zs + 0.02], p: [[-wl, zb], [wl, zb], [wl, zs], [wu, zs], [wu, zt - ch], [wu - ch, zt],
                                          [-(wu - ch), zt], [-wu, zt - ch], [-wu, zs], [-wl, zs]] };
  }
  function addHull(V, B) {
    var Pn = B.paint, D = B.dark, G = B.glass, Tm = B.team, i, s, k, a = V.midAft;
    /* the station table, nose to tail (photograph E; nose from A, C, G) */
    loft(Pn, [
      hsec(3.78, 0.98, ZSP, 1.10, 0.02),       /* nose edge where the two glacis plates meet */
      hsec(3.55, 0.78, ZSP, 1.24, 0.03),
      hsec(3.15, 0.45, ZSP, 1.48, 0.04),
      hsec(2.85, 0.45, ZSP, ZFD, 0.05),        /* top of the upper glacis: front deck */
      hsec(2.42, 0.45, ZSP, ZFD, 0.05),
      hsec(2.40, 0.45, ZSP, ZMID, 0.07),       /* face of the centre superstructure */
      hsec(a + 0.02, 0.45, ZSP, ZMID, 0.07),
      hsec(a, 0.45, ZSP, ZRD, 0.05),           /* step down to the rear deck */
      hsec(-3.40, 0.45, ZSP, ZRD, 0.05),
      hsec(-3.72, 0.62, ZSP, ZRD, 0.05),
      hsec(-3.78, 0.70, ZSP, ZRD - 0.08, 0.02) /* rear plate */
    ]);

    /* ---- nose: cable coil on the upper glacis, lamps, tow eyes ---- */
    var gl0 = [3.78, 1.10], gl1 = [2.85, ZFD], gdx = gl1[0] - gl0[0], gdz = gl1[1] - gl0[1];
    var gl = Math.sqrt(gdx * gdx + gdz * gdz), gu = [gdx / gl, gdz / gl], gn = [-gu[1], gu[0]];
    if (gn[1] < 0) gn = [-gn[0], -gn[1]];
    for (k = 0; k < 2; k++) {
      var cx0 = gl0[0] + gu[0] * (0.55 + k * 0.08), cz0 = gl0[1] + gu[1] * (0.55 + k * 0.08), prev = null;
      for (i = 0; i <= 16; i++) {
        var an = i / 16 * TAU, ry = 0.98 - k * 0.07, rr = 0.20 - k * 0.03;
        var px = cx0 + gu[0] * Math.sin(an) * rr + gn[0] * 0.05, pz = cz0 + gu[1] * Math.sin(an) * rr + gn[1] * 0.05;
        var p = [px, Math.cos(an) * ry, pz];
        if (prev) cyl(D, prev, p, 0.032, 0.032, 6, true);
        prev = p;
      }
    }
    for (s = -1; s <= 1; s += 2) {
      /* lamp housings on the front deck corners, glass forward */
      box(Pn, 2.62, 2.92, s * 1.18 - 0.14, s * 1.18 + 0.14, ZFD, ZFD + 0.22);
      cylX(G, 2.92, 2.95, s * 1.18, ZFD + 0.11, 0.075, 12);
      box(D, 2.60, 2.95, s * 1.18 - 0.16, s * 1.18 + 0.16, ZFD + 0.22, ZFD + 0.24);
      /* tow eyes on the lower glacis */
      for (k = 0; k < 2; k++) {
        var ty = s * (0.35 + k * 0.45), tz = 0.80;
        box(D, 3.56, 3.70, ty - 0.10, ty - 0.05, tz - 0.05, tz + 0.05);
        box(D, 3.56, 3.70, ty + 0.05, ty + 0.10, tz - 0.05, tz + 0.05);
        box(D, 3.66, 3.72, ty - 0.10, ty + 0.10, tz - 0.05, tz + 0.05);
      }
    }
    /* louvred box on the right front deck (A, C, G) */
    box(Pn, 2.45, 2.82, -1.42, -0.62, ZFD, ZFD + 0.36);
    for (i = 0; i < 6; i++) box(D, 2.82, 2.85, -1.36, -0.68, ZFD + 0.05 + i * 0.05, ZFD + 0.075 + i * 0.05);
    if (V.gen === 2) {
      /* Tor-M2: the glazed driver's cab, two windows forward (E, G) */
      box(Pn, 2.40, 2.84, -0.45, 1.10, ZFD, ZFD + 0.46);
      box(G, 2.84, 2.86, -0.38, 0.28, ZFD + 0.14, ZFD + 0.40);
      box(G, 2.84, 2.86, 0.36, 1.02, ZFD + 0.14, ZFD + 0.40);
      box(Pn, 2.84, 2.87, 0.28, 0.36, ZFD + 0.10, ZFD + 0.44);
      box(D, 2.40, 2.90, -0.47, 1.12, ZFD + 0.46, ZFD + 0.49);
    } else {
      /* Tor / Tor-M1: the driver's hatch left of centre, vision blocks (C) */
      cylZ(Pn, 2.62, 0.48, ZFD, ZFD + 0.12, 0.27, 16);
      cylZ(D, 2.62, 0.48, ZFD + 0.12, ZFD + 0.15, 0.21, 14);
      for (i = 0; i < 3; i++) box(G, 2.86, 2.89, 0.22 + i * 0.2, 0.36 + i * 0.2, ZFD + 0.02, ZFD + 0.10);
      box(Pn, 2.80, 2.86, 0.18, 0.80, ZFD, ZFD + 0.13);
    }

    /* ---- centre superstructure: big side doors, handles, steps ---- */
    for (s = -1; s <= 1; s += 2) {
      var ys = s * 1.50, yo = s * 1.53, nd = V.gen === 2 ? 5 : 4, dl = (2.25 - (a + 0.12)) / nd;
      for (i = 0; i < nd; i++) {
        var dx0 = a + 0.12 + i * dl, dx1 = dx0 + dl - 0.06;
        box(Pn, dx0, dx1, Math.min(ys, yo), Math.max(ys, yo), 1.32, 2.14);
        box(D, dx0 + dl * 0.42, dx0 + dl * 0.58, s > 0 ? 1.53 : -1.56, s > 0 ? 1.56 : -1.53, 1.70, 1.74);
        box(D, dx1, dx1 + 0.06, s > 0 ? 1.50 : -1.515, s > 0 ? 1.515 : -1.50, 1.30, 2.16);
      }
      /* the long hinge rail along the top of the doors */
      box(D, a + 0.10, 2.30, s > 0 ? 1.50 : -1.535, s > 0 ? 1.535 : -1.50, 2.17, 2.20);
      /* fender band: the full length, turned down over the idler */
      var fb = V.darkBand ? D : Pn, y0 = s > 0 ? 1.48 : -1.66, y1 = s > 0 ? 1.66 : -1.48;
      box(fb, -3.72, 2.90, y0, y1, ZSP, 1.21);
      hexa(fb, [[2.90, y0, ZSP], [3.62, y0, 0.86], [3.62, y1, 0.86], [2.90, y1, ZSP],
                [2.90, y0, 1.21], [3.66, y0, 1.02], [3.66, y1, 1.02], [2.90, y1, 1.21]]);
      /* whip aerials on the front deck (D, E) */
      cylZ(D, 2.50, s * 1.36, ZFD, ZFD + 0.12, 0.05, 8);
      cylZ(D, 2.50, s * 1.36, ZFD + 0.12, ZFD + 3.2, 0.011, 4);
    }
    /* team: two small up-facing strips on the rear deck corners */
    box2(Tm, -3.25, -2.85, 1.14, 1.40, ZRD, ZRD + 0.012);

    /* ---- rear deck / rear box ---- */
    if (V.gen === 2) {
      /* Tor-M2: a louvre strip along the foot of the rear box (E) */
      for (s = -1; s <= 1; s += 2) box(D, -3.55, a - 0.10, s > 0 ? 1.50 : -1.52, s > 0 ? 1.52 : -1.50, 1.25, 1.36);
      box(Pn, -3.30, a - 0.25, -0.90, 0.90, ZRD, ZRD + 0.06);
    } else {
      /* engine grilles on the rear deck (B, D) */
      box(D, -3.55, -2.45, -1.05, 1.05, ZRD, ZRD + 0.015);
      for (i = 0; i < 8; i++) box(Pn, -3.52 + i * 0.135, -3.47 + i * 0.135, -1.0, 1.0, ZRD + 0.015, ZRD + 0.05);
    }
    /* rear plate: tow eyes, lamps, the exhaust louvre */
    for (s = -1; s <= 1; s += 2) {
      box(D, -3.84, -3.78, s * 0.95 - 0.08, s * 0.95 + 0.08, 0.95, 1.05);
      box(D, -3.82, -3.77, s * 1.30 - 0.10, s * 1.30 + 0.10, 1.55, 1.68);
      box(G, -3.83, -3.82, s * 1.30 - 0.06, s * 1.30 + 0.06, 1.58, 1.65);
    }
    box(D, -3.80, -3.77, -0.70, 0.70, 1.20, 1.45);
    for (i = 0; i < 4; i++) box(Pn, -3.83, -3.79, -0.66, 0.66, 1.22 + i * 0.06, 1.245 + i * 0.06);
  }

  /* ------------------------------------------------- running gear (both sides) */
  function addRunning(B, WB) {
    var D = B.dark, i, s, k;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * TY, ya = yc - TW, yb = yc + TW;
      /* the track: ground run, round the sprocket, top run over the rollers, round the idler */
      var path = [], an;
      path.push([XI, 0.045]);
      path.push([XS + 0.25, 0.045]);
      for (k = 0; k <= 8; k++) { an = -Math.PI * 0.62 - k / 8 * Math.PI * 0.88; path.push([XS + Math.cos(an) * (RS + 0.045), ZS + Math.sin(an) * (RS + 0.045)]); }
      for (k = 0; k <= 7; k++) { an = Math.PI * 0.5 - k / 7 * Math.PI * 1.15; path.push([XI + Math.cos(an) * (RI + 0.045), ZI + Math.sin(an) * (RI + 0.045)]); }
      path[path.length - 1] = path[path.length - 1];
      for (i = 0; i + 1 < path.length; i++) belt(D, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], ya, yb, 0.09);
      belt(D, path[path.length - 1][0], path[path.length - 1][1], path[0][0], path[0][1], ya, yb, 0.09);
      /* shoes with their grousers along the ground run */
      for (i = 0; i < 40; i++) {
        var rx = XS + 0.25 + i * 0.148;
        if (rx > XI) break;
        box(D, rx, rx + 0.07, ya - 0.012, yb + 0.012, 0.0, 0.03);
      }
      /* drive sprocket at the rear (E zoomed): toothed ring, hub */
      cylY(D, XS, yc - 0.20, yc + 0.20, ZS, RS - 0.03, 22);
      cylY(D, XS, yc - 0.25, yc + 0.25, ZS, 0.13, 12);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU;
        cyl(D, [XS + Math.cos(ta) * (RS - 0.04), yc - 0.17, ZS + Math.sin(ta) * (RS - 0.04)],
               [XS + Math.cos(ta) * (RS - 0.04), yc + 0.17, ZS + Math.sin(ta) * (RS - 0.04)], 0.045, 0.045, 5);
      }
      /* plain dished idler in front */
      cylY(D, XI, yc - 0.20, yc + 0.20, ZI, RI, 20);
      cylY(B.paint, XI, yc + s * 0.20, yc + s * 0.215, ZI, RI - 0.05, 18);
      cylY(D, XI, yc - 0.24, yc + 0.24, ZI, 0.10, 10);
      /* return rollers under the fender */
      for (i = 0; i < 3; i++) cylY(D, 1.35 - i * 1.6, yc - 0.13, yc + 0.13, 0.86, 0.09, 10);
      /* rubber tyres of the road wheels: rings of revolution, so they stay here */
      for (i = 0; i < XW.length; i++) {
        cylY(D, XW[i], yc - 0.215, yc - 0.03, ZW, RW, 20);
        cylY(D, XW[i], yc + 0.03, yc + 0.215, ZW, RW, 20);
      }
    }
    /* the road-wheel discs and hubs: one group a wheel station, both sides */
    for (i = 0; i < XW.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TY, wb = WB[i];
        cylY(wb, 0, y0 - 0.222, y0 - 0.025, 0, RW - 0.06, 18);
        cylY(wb, 0, y0 + 0.025, y0 + 0.222, 0, RW - 0.06, 18);
        cylY(wb, 0, y0 + s * 0.222, y0 + s * 0.262, 0, 0.11, 10);
        for (k = 0; k < 6; k++) {
          var ba = k / 6 * TAU + 0.3, bx = Math.cos(ba) * 0.075, bz = Math.sin(ba) * 0.075;
          box(wb, bx - 0.017, bx + 0.017, s > 0 ? y0 + 0.262 : y0 - 0.282, s > 0 ? y0 + 0.282 : y0 - 0.262, bz - 0.017, bz + 0.017);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* Local frame: origin on the ring, z = 0 on the superstructure top, +X the
     tracking radar.  Section from D and E: a short skirt, a vertical ribbed
     band, sloped upper planes carrying the lids, a narrow flat roof. */
  var TB0 = 0.13, TB1 = 0.62, TW0 = 1.47, TR = 0.66, TRZ = 1.22, TTOP = 1.30;
  function tsec(x, sh) {
    var w = TW0 - sh, r = TR - sh * 0.5, zt = TTOP - sh * 0.6;
    return { x: x, c: [0, 0.6], p: [[-1.28, 0], [1.28, 0], [1.28, 0.10], [w, TB0], [w, TB1], [r, TRZ - sh * 0.6], [r - 0.06, zt],
                                    [-(r - 0.06), zt], [-r, TRZ - sh * 0.6], [-w, TB1], [-w, TB0], [-1.28, 0.10]] };
  }
  function addTurret(V, B) {
    var P = B.paint, D = B.dark, G = B.glass, M = B.mesh, Fc = B.face, gen = V.gen, i, s, k;
    var XR = -1.95, XF = 1.75;
    loft(P, [tsec(XR, 0.08), tsec(XR + 0.08, 0), tsec(XF - 0.06, 0), tsec(XF, 0.05)]);
    /* sloped planes: four lids a side over the vertical missile cells (D, E, F) */
    var dy = TW0 - TR, dz = TRZ - TB1, sl = Math.sqrt(dy * dy + dz * dz), wy = dy / sl, wz = dz / sl;
    var lx0 = XR + 0.12, lw = 0.54;
    for (s = -1; s <= 1; s += 2) {
      var P0 = [0, s * TW0, TB1], U = [1, 0, 0], W = [0, -s * wy, wz], N = [0, s * wz, wy];
      for (i = 0; i < 4; i++) {
        var x0 = lx0 + i * lw;
        planeBox(D, P0, U, W, N, x0, x0 + lw - 0.01, 0.04, sl - 0.04, -0.01, 0.012);
        planeBox(P, P0, U, W, N, x0 + 0.02, x0 + lw - 0.03, 0.06, sl - 0.06, 0.0, 0.035);
        /* stiffening ribs across each lid */
        for (k = 0; k < (gen === 2 ? 4 : 3); k++) {
          var w0 = 0.16 + k * (gen === 2 ? 0.18 : 0.24);
          planeBox(P, P0, U, W, N, x0 + 0.05, x0 + lw - 0.06, w0, w0 + 0.035, 0.035, 0.06);
        }
      }
      /* the vertical band below: four ribbed panels a side, then the sight bay */
      var yb = s * TW0;
      for (i = 0; i < 4; i++) {
        var bx0 = lx0 + i * lw;
        box(P, bx0 + 0.02, bx0 + lw - 0.03, s > 0 ? yb : yb - 0.03, s > 0 ? yb + 0.03 : yb, TB0 + 0.04, TB1 - 0.03);
        for (k = 0; k < (gen === 2 ? 6 : 4); k++) {
          var rz = TB0 + 0.08 + k * (gen === 2 ? 0.065 : 0.1);
          box(P, bx0 + 0.04, bx0 + lw - 0.05, s > 0 ? yb + 0.03 : yb - 0.05, s > 0 ? yb + 0.05 : yb - 0.03, rz, rz + 0.025);
        }
      }
      /* M2: a mesh grille at the rear end of the band (E) */
      if (gen === 2) box(D, XR + 0.02, lx0 - 0.02, s > 0 ? yb : yb - 0.02, s > 0 ? yb + 0.02 : yb, TB0 + 0.05, TB1 - 0.05);
      /* forward bay: equipment boxes on the band ahead of the lids */
      box(P, lx0 + 4 * lw + 0.05, XF - 0.25, s > 0 ? yb : yb - 0.10, s > 0 ? yb + 0.10 : yb, TB0 + 0.08, TB1 - 0.08);
    }
    /* roof: a walkway plate and hatches along the narrow top */
    box(D, lx0, lx0 + 4 * lw, -0.50, 0.50, TTOP, TTOP + 0.012);
    for (i = 0; i < 4; i++) box(P, lx0 + 0.05 + i * lw, lx0 + lw - 0.05 + i * lw, -0.44, 0.44, TTOP + 0.012, TTOP + 0.04);
    /* rear wall equipment (A) */
    box(P, XR - 0.22, XR, -0.95, 0.95, 0.18, 0.88);
    box(D, XR - 0.24, XR - 0.22, -0.85, 0.85, 0.30, 0.34);
    box(D, XR - 0.24, XR - 0.22, -0.85, 0.85, 0.62, 0.66);
    for (s = -1; s <= 1; s += 2) cylZ(D, XR - 0.12, s * 0.70, 0.88, 1.02, 0.06, 8);

    /* ---- tracking radar on the turret front ---- */
    if (gen === 2) {
      /* Tor-M2: a rectangular box leaning back (E, F) */
      var t = 0.42, ct = Math.cos(t), st = Math.sin(t);
      var Pb = [XF + 0.50, 0, 0.30], Ub = [0, 1, 0], Wb = [-st, 0, ct], Nb = [ct, 0, st];
      planeBox(P, Pb, Ub, Wb, Nb, -0.62, 0.62, 0, 1.58, -0.42, 0);
      planeBox(P, Pb, Ub, Wb, Nb, -0.56, 0.56, 0.08, 1.50, 0, 0.015);
      planeBox(P, Pb, Ub, Wb, Nb, -0.64, 0.64, 1.52, 1.60, -0.46, 0.02);
      /* the trunnion block it leans from */
      box(P, XF - 0.10, XF + 0.36, -0.42, 0.42, 0.10, 0.62);
      box(D, XF + 0.10, XF + 0.30, -0.62, 0.62, 0.26, 0.40);
    } else {
      /* Tor / Tor-M1: the square housing with the round face (D) */
      box(P, XF - 0.20, XF + 0.24, -0.70, 0.70, 0.36, 1.80);
      box(D, XF + 0.24, XF + 0.26, -0.66, 0.66, 0.40, 1.76);
      cylX(Fc, XF + 0.26, XF + 0.29, 0, 1.08, 0.64, 32);
      cyl(Fc, [XF + 0.29, 0, 1.08], [XF + 0.33, 0, 1.08], 0.62, 0.46, 32);
      /* hinge brackets on the turret front */
      for (s = -1; s <= 1; s += 2) box(D, XF - 0.30, XF + 0.10, s * 0.74 - 0.05, s * 0.74 + 0.05, 0.30, 0.90);
    }
    /* sphere on the left top corner (D, F), on a short stalk */
    cylZ(D, XF - 0.05, 0.86, 1.30, 1.62, 0.05, 8);
    sphere(P, XF - 0.05, 0.86, 1.70, 0.17, 14, 9);
    /* TV-optical sight box on the right of the radar, lens forward (D) */
    box(P, XF - 0.42, XF + 0.12, -1.10, -0.74, 0.55, 0.98);
    cylX(D, XF + 0.12, XF + 0.20, -0.92, 0.80, 0.12, 14);
    cylX(G, XF + 0.20, XF + 0.21, -0.92, 0.80, 0.095, 14);
    box(D, XF - 0.40, XF + 0.10, -1.12, -0.72, 0.98, 1.01);

    /* ---- search radar on the turret rear, raised ---- */
    var MX = -1.30;
    cylZ(P, MX, 0, TTOP, TTOP + 0.22, 0.30, 18);
    cylZ(D, MX, 0, TTOP + 0.22, TTOP + 0.30, 0.24, 16);
    cylZ(P, MX, 0, TTOP + 0.30, TTOP + 0.62, 0.13, 12);
    if (gen === 2) {
      /* Tor-M2: flat array on a yoke, curved lattice array on its top edge (F) */
      var az0 = 1.86, az1 = 2.70, tl = 0.10;
      for (s = -1; s <= 1; s += 2) box(P, MX - 0.08, MX + 0.08, s * 0.32 - 0.05, s * 0.32 + 0.05, TTOP + 0.55, az0 + 0.25);
      box(P, MX - 0.10, MX + 0.10, -0.38, 0.38, TTOP + 0.55, TTOP + 0.66);
      hexa(P, [[MX - 0.10, -1.00, az0], [MX + 0.06, -1.00, az0], [MX + 0.06, 1.00, az0], [MX - 0.10, 1.00, az0],
               [MX - 0.10 - tl, -1.00, az1], [MX + 0.06 - tl, -1.00, az1], [MX + 0.06 - tl, 1.00, az1], [MX - 0.10 - tl, 1.00, az1]]);
      hexa(P, [[MX + 0.06, -0.95, az0 + 0.04], [MX + 0.075, -0.95, az0 + 0.04], [MX + 0.075, 0.95, az0 + 0.04], [MX + 0.06, 0.95, az0 + 0.04],
               [MX + 0.06 - tl, -0.95, az1 - 0.04], [MX + 0.075 - tl, -0.95, az1 - 0.04], [MX + 0.075 - tl, 0.95, az1 - 0.04], [MX + 0.06 - tl, 0.95, az1 - 0.04]]);
      /* the lattice on top: a curved mesh strip on struts */
      sheet(M, MX - 0.12, az1 + 0.16, 0.66, 0.15, 0.10, 12, 2);
      for (s = -1; s <= 1; s += 2) box(D, MX - 0.14, MX - 0.10, s * 0.45 - 0.02, s * 0.45 + 0.02, az1, az1 + 0.06);
    } else {
      /* Tor / Tor-M1: curved mesh reflector on a lattice frame, the flat feed
         panel in front of it, the blade aerial on a side arm (A, D) */
      var rc = 2.08, rh = 1.10, rw = 0.86;
      for (s = -1; s <= 1; s += 2) box(P, MX - 0.07, MX + 0.07, s * 0.26 - 0.05, s * 0.26 + 0.05, TTOP + 0.55, rc);
      box(P, MX - 0.09, MX + 0.09, -0.32, 0.32, TTOP + 0.55, TTOP + 0.66);
      sheet(M, MX + 0.05, rc, rw, rh / 2, 0.22, 14, 6, 0.16);
      /* lattice frame behind the reflector */
      for (k = -2; k <= 2; k++) {
        var fy = k * rw / 2.2, dep = 0.22 * (fy * fy) / (rw * rw);
        cyl(D, [MX + 0.05 - dep - 0.02, fy, rc - rh / 2], [MX + 0.05 - dep - 0.02, fy, rc + rh / 2], 0.014, 0.014, 4, true);
        cyl(D, [MX + 0.05 - dep - 0.02, fy, rc - rh / 2], [MX - 0.32, 0, rc], 0.012, 0.012, 4, true);
        cyl(D, [MX + 0.05 - dep - 0.02, fy, rc + rh / 2], [MX - 0.32, 0, rc], 0.012, 0.012, 4, true);
      }
      for (k = -1; k <= 1; k++) cyl(D, [MX + 0.03 - 0.22, -rw, rc + k * rh / 2], [MX + 0.03 - 0.22, rw, rc + k * rh / 2], 0.014, 0.014, 4, true);
      box(D, MX - 0.36, MX - 0.28, -0.08, 0.08, rc - 0.5, rc + 0.5);
      /* the flat feed panel ahead of the reflector, on two struts */
      box(P, MX + 0.38, MX + 0.46, -0.26, 0.26, rc - 0.40, rc + 0.42);
      for (s = -1; s <= 1; s += 2) cyl(D, [MX + 0.38, s * 0.2, rc - 0.36], [MX + 0.06, s * 0.6, rc - 0.50], 0.018, 0.018, 5, true);
      /* the top bar over the reflector (D) */
      box(P, MX - 0.10, MX + 0.12, -0.80, 0.80, rc + rh / 2 + 0.02, rc + rh / 2 + 0.16);
      /* the blade aerial on its arm (A) */
      cyl(D, [MX - 0.05, -0.30, TTOP + 0.70], [MX + 0.10, -1.05, TTOP + 0.95], 0.03, 0.03, 6, true);
      hexa(P, [[MX + 0.02, -1.05, TTOP + 0.85], [MX + 0.18, -1.05, TTOP + 0.85], [MX + 0.18, -1.08, TTOP + 0.85], [MX + 0.02, -1.08, TTOP + 0.85],
               [MX + 0.30, -1.05, TTOP + 1.52], [MX + 0.36, -1.05, TTOP + 1.52], [MX + 0.36, -1.08, TTOP + 1.52], [MX + 0.30, -1.08, TTOP + 1.52]]);
    }
  }
  /* a curved sheet (the mesh reflector, the lattice strip): centre (x, zc),
     half width hw, half height hh, dish depth dd at the edges, facing +X,
     the top laid back by lean (photograph A: the reflector looks up a little) */
  function sheet(bin, x, zc, hw, hh, dd, nu, nv, lean) {
    var i, j, P = [];
    for (j = 0; j <= nv; j++) {
      var row = [], v = -1 + 2 * j / nv;
      for (i = 0; i <= nu; i++) {
        var u = -1 + 2 * i / nu;
        row.push([x - dd * (u * u + 0.3 * v * v) - (lean || 0) * v, u * hw, zc + v * hh]);
      }
      P.push(row);
    }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      bin.tri(P[j][i], P[j][i + 1], P[j + 1][i + 1]);
      bin.tri(P[j][i], P[j + 1][i + 1], P[j + 1][i]);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.M2, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, TB = bins(T);
    for (i = 0; i < XW.length; i++) WB.push(new Bin(T.paint, true));
    addHull(V, HB);
    addRunning(HB, WB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { paint: WB[i] });
      g.add(wg);
    }
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, TZ);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_tor"] = { len: 7.62, build: function (THREE, M, C) { return HeroTor.build(THREE, M, C, "T80"); } };
UNIT_MODELS["pact_e90_tor"] = { len: 7.62, build: function (THREE, M, C) { return HeroTor.build(THREE, M, C, "M1"); } };
UNIT_MODELS["pact_e00_tor_m2"] = { len: 7.62, build: function (THREE, M, C) { return HeroTor.build(THREE, M, C, "M2"); } };
