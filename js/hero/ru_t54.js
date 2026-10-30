/* ========== ru_t54.js - HERO model: T-54A medium tank (pact_e50_mbt) ======
   The Soviet medium tank as built 1955-1957: the T-54A (Object 137G), the T-54-3's cast
   dome turret "without the undercut" carrying the D-10TG gun with its bore evacuator and the
   STP-1 vertical stabiliser (internal: nothing in the outline shows it).  One builder, a
   VARIANTS table, so a T-54B / T-55 row can be added later; build() takes the row name.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_t54_ref:
     D1  "T-54A with KMT-5M.gif" - side line drawing of a T-54A (with a mine plough, ignored):
         five road wheels with the wide gap between the first and second, rear sprocket, no
         return rollers, fender line about a third of a metre under the hull deck, the gun with
         the thick evacuator at the muzzle, the DShK over the turret, two drums across the
         stern seen end-on.  Scale from the 830 mm road wheel (0.032 m a pixel).
     P1  "T-54-batey-haosef-2.jpg" - a T-54 dead side-on (port): wheel pitch 0.87 m and the
         1.08 m front gap, rear sprocket raised, the track lying on the wheel tops, "starfish"
         wheels with eight holes, the fender shelf and the hull side above it.
     P2  "T-54A (Model 1953) Medium Tank '537' (37627885156).jpg" - the Kubinka T-54A from the
         front right: low cast dome, canvas cover over the gun mantlet, the muzzle evacuator,
         one headlamp on the right front, box tanks and boxes on the right fender, the curved
         front mudguards.
     P3  "T-54A in the Kubinka Tank Museum.jpg" - the same tank, closer: the dome's flat top,
         the DShK on the loader's ring mount, the fender shelf just above the track run.
     P4  "T-54A - Kubinka Tank Museum (37265528824).jpg" - a second Kubinka T-54A from the front
         right: the evacuator's tapered rear and front lip, the turret grab rails, the DShK.
         (It also carries an L-2 IR light and IR driving lights: later retrofits, NOT drawn.)
     P5  "T-54A Panzermuseum Thun.jpg" / "Ex-Polish T-54A.jpg" - a Polish-built T-54A from the
         left: the two 200 l drums across the stern, the evacuator, the DShK.
     P6  "T-54A in Prague.jpg" - from the front left above: the driver's hatch left of the
         gun, the headlamp group on the right front, the box tanks on the right fender.
   Published (ru.wikipedia T-54 infobox and text): length 9.00 m gun forward, hull 6.04-6.20 m,
   width 3.27 m, height 2.218 m, track centres 2.64 m, ground clearance 0.425-0.468 m, track
   580 mm, five cast road wheels of 830 mm with rubber tyres a side, rear drive sprockets with
   pin-tooth (lantern) drive, the D-10T family 56 calibres long, the DShK on a ring mount
   over the loader's hatch; T-54A 1955-1957: D-10TG with an ejector (bore evacuator), STP-1,
   TSh-2A-22 sight, TVN-1 driver's night device.

   CORRECTIONS against the previous model (and its header):
   - the fender shelf is about 0.34 m BELOW the hull deck, just clear of the track run (P1,
     P3, D1; not "a third of a metre above the track tops"): fender 1.33 m -> 1.08 m, deck
     1.50 m -> 1.42 m;
   - hull length: the old "6.45 m over the tracks" is not supported; ru.wikipedia gives
     6.04-6.20 m: drawn 6.04 m plate to plate, 6.16 m over the fender ends;
   - the headlamp is on the RIGHT front (P2, P6), not the left fender;
   - track centres 2.69 -> 2.64 m (published), road wheels drawn 0.83 m with the 0.88 m pitch
     and the 1.10 m front gap measured off D1 and P1 (old: 0.85 m pitch, 0.98 m gap);
   - the gun's thick part is a bore evacuator AT the muzzle, 1.1 m long, its rear tapered and
     a lip at the front (P2, P4, P5, D1), not a mid-barrel sleeve with a stub beyond it;
   - the T-54A carried box fuel tanks on the right fender and two drums across the stern
     (D1, P2, P5, P6); the old header left both out;
   - height 2.40 m -> 2.218 m to the turret roof (ru.wikipedia; 2.40 m is the 1946 T-54);
   - the turret dome has no undercut (T-54-3 / T-54A, ru.wikipedia): its widest ring is its
     foot, as P1 and P3 show.

   Recognition list (what makes it read at game zoom, and its source):
     1. five big road wheels a side, the wide gap between the first and second, no return
        rollers, the track lying on the wheel tops - D1, P1
     2. "starfish" wheels: dished face, eight holes, rubber tyres - P1, P3
     3. low hull with the rounded nose where the two glacis plates meet - P2, P6
     4. fender shelf low over the track with boxes and box fuel tanks standing on it against
        the hull side; big curved front mudguards - P1, P2, P6
     5. the low, flat-topped cast dome, widest at its foot, front lower than the rear - P1, P3
     6. the long 100 mm gun with the evacuator at the muzzle and the canvas mantlet cover -
        D1, P2, P4, P5
     7. commander's cupola left, loader's hatch right with the 12.7 mm DShK on its ring - D1,
        P3, P4
     8. the two drums across the stern - D1, P5
     9. raised rear sprocket, front idler - D1, P1
    10. one headlamp on the right front, the driver's hatch front left - P2, P6
   Paint: Soviet green as photographed (P2/P3 hall, lit #60664c, shade #3e452b; mean #595a4a)
   taken to about 0.85 of level for the ACES pass -> base #4c5636.  No numbers, stars, unit
   badges or the museum's white stripes (P2, P6 carry them: not drawn).
   NOT CONFIRMED and so left out: IR searchlights (the L-2 and the commander's OU-3 are the
   T-54B's of 1957, ru.wikipedia; the TVN-1's IR driving light is not in the 1955-standard
   photographs P2/P3), the snorkel, an unditching beam, a radio antenna (D1 shows one; its
   base is drawn, not the whip).  Judgement calls: the count and order of the fender boxes
   (three box tanks then two boxes on the right, boxes and an oil tank on the left), the
   DShK ring's radius, the engine-deck louvres, and the dome's length: P1 measures 2.3 m, D1
   2.8 m and the 3/4 photographs (P2, P4, P5) read longer still; drawn 2.52 m long by 2.32 m
   across, over the 1.825 m turret ring.  The bow MG's port on the glacis (ru.wikipedia) is
   drawn small; no photograph here resolves it.

   Materials: PAINT (canvas texture: base, mottling, weld seams, grime), DARK (track, fittings,
   guns, vision blocks), CANVAS (the mantlet cover, its own texture), WHEEL (tyres, discs and
   holes by vertex colour) and the team colour exactly as handed in (C.team): three small
   strips (rear deck plate, a right fender box lid, the turret roof).
   Nodes: "turret" (trains, origin on the ring centre at the deck, gun along +X), five
   "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 4 + 5 wheels = 12.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT54 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table
     dome: plan radii AF front, AR rear, AY across, front droop, height; evac: the muzzle
     evacuator [start, end] in the turret frame; drums: stern drums */
  var VARIANTS = {
    A: { paint: { base: "#4c5636", blots: ["#434c2f", "#56603f"], seed: 54 }, canvas: "#4a4d36",
         dome: { AF: 1.28, AR: 1.24, AY: 1.16, drop: 0.13, H: 0.74 },
         muz: 6.00, evac: [4.86, 5.95], drums: 2, aaMg: true },
    /* the PLA's Type 79 (WZ-121D, 1984): the Type 59's hull and turret with the 105 mm
       Type 83 (L7) gun, thermal sleeve and fume extractor - see the PLA note at the foot */
    T79: { paint: { base: "#4f5a3a", blots: ["#465031", "#58633f"], seed: 79 }, canvas: "#4a4d36",
           dome: { AF: 1.28, AR: 1.24, AY: 1.16, drop: 0.13, H: 0.74 },
           gun: "l7", muz: 6.45, fume: [2.05, 2.80], drums: 2, aaMg: true }
  };

  /* running gear (D1, P1, published track centres): pitch 0.88 m, front gap 1.10 m */
  var TY = 1.32, TW = 0.29;
  var XW = [1.87, 0.77, -0.11, -0.99, -1.87], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.62, z: 0.56, r: 0.29 }, SPR = { x: -2.68, z: 0.66, r: 0.30 };
  var DECK = 1.42, FZ = 1.08, FW = 1.635, HW = 1.00, TX = 0.0;   /* deck, fender, fender edge, hull side, turret x */

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
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
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through rings of [x, y, z] points (same count, each convex); ends capped */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }
  /* a box with rounded top edges along X (the fender fuel tanks, P2 P6): x0..x1, y0..y1, z0..z1 */
  function roundBox(bin, x0, x1, y0, y1, z0, z1, r) {
    var R = [], a, yc0 = y0 + r, yc1 = y1 - r, zc = z1 - r;
    /* ring order: bottom left, bottom right, right side up over the top to the left side */
    var Q = [[y0, z0], [y1, z0]], k;
    for (k = 0; k <= 3; k++) { a = k / 3 * Math.PI / 2; Q.push([yc1 + Math.cos(a) * r, zc + Math.sin(a) * r]); }
    for (k = 0; k <= 3; k++) { a = Math.PI / 2 + k / 3 * Math.PI / 2; Q.push([yc0 + Math.cos(a) * r, zc + Math.sin(a) * r]); }
    R.push(Q.map(function (p) { return [x0, p[0], p[1]]; }));
    R.push(Q.map(function (p) { return [x1, p[0], p[1]]; }));
    loftN(bin, R);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling of the brushed
     4BO green, weld seams with their bead highlight, rain streaks and grime (P2, P3, P5) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and chipped wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  /* the canvas mantlet cover (P2, P4, P5): olive duck, darker folds and seams; tile 1 m */
  function canvasCover(THREE, base) {
    return canvasTex(THREE, "c" + base, 128, function (q, S) {
      var R = rng(137), i;
      q.fillStyle = base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 18; i++) { q.fillStyle = "rgba(15,16,10," + (0.12 + R() * 0.2) + ")"; q.fillRect(R() * S, R() * S, 2 + R() * 5, 20 + R() * 60); }
      for (i = 0; i < 14; i++) { q.fillStyle = "rgba(230,225,200,0.07)"; q.fillRect(R() * S, R() * S, 3 + R() * 8, 18 + R() * 50); }
      q.fillStyle = "rgba(10,10,6,0.35)"; q.fillRect(0, S / 2, S, 2);
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), tc = canvasCover(THREE, V.canvas);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.canvas = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.97, metalness: 0.0 });
    if (tc) T.canvas.map = tc; else T.canvas.color.set(V.canvas);
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), canvas: new Bin(T.canvas, true, false, 1.0),
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
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* station table, measured off D1 (scale from the 830 mm road wheel) and P1:
     x, belly half width, belly z, side half width, roof z.  The hull sides are vertical from
     the belly to the deck at 1.42 m; the rear plate leans in at the foot; the upper glacis
     falls at 30 deg to the rounded nose at about 0.76 m, the lower glacis runs back at 35 deg
     to the belly by x = 2.58 (P2, P6). */
  var HS = [
    [-3.00, 0.95, 0.66, 0.99, 1.24],
    [-2.99, 0.96, 0.57, 1.00, 1.33],
    [-2.96, 0.97, 0.50, 1.00, 1.39],
    [-2.90, 0.98, 0.455, 1.00, 1.42],
    [-2.75, 0.98, 0.425, 1.00, 1.42],
    [-1.60, 0.98, 0.425, 1.00, 1.42],
    [-0.40, 0.98, 0.425, 1.00, 1.42],
    [ 0.80, 0.98, 0.425, 1.00, 1.42],
    [ 1.93, 0.98, 0.425, 1.00, 1.42],
    [ 2.20, 0.98, 0.425, 1.00, 1.264],
    [ 2.45, 0.98, 0.425, 1.00, 1.12],
    [ 2.60, 0.98, 0.44, 1.00, 1.033],
    [ 2.75, 0.975, 0.545, 0.995, 0.946],
    [ 2.87, 0.97, 0.625, 0.99, 0.876],
    [ 2.95, 0.965, 0.685, 0.985, 0.825],
    [ 3.00, 0.96, 0.725, 0.98, 0.79],
    [ 3.03, 0.955, 0.752, 0.975, 0.768]
  ];
  function glacisZ(x) { return x <= 1.93 ? DECK : DECK - 0.577 * (x - 1.93); }
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }

  function addHull(B, V) {
    var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, p, s, x, n = R[0].length;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    for (k = 1; k + 1 < n; k++) {
      triN(B.paint, R[0][0], R[0][k], R[0][k + 1], [-1, 0, 0]);
      triN(B.paint, R[R.length - 1][0], R[R.length - 1][k], R[R.length - 1][k + 1], [1, 0, 0]);
    }
    /* the rounded nose: a fat round bar where the two glacis plates meet (P2, P6) */
    cyl(B.paint, [2.995, 0.95, 0.77], [2.995, -0.95, 0.77], 0.045, 0.045, 10);

    for (p = -1; p <= 1; p += 2) {
      var yi = p * HW, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf low over the track run (D1, P1, P3), its turned-down outer lip */
      box(B.paint, -2.98, 2.30, ylo, yhi, FZ - 0.03, FZ);
      box(B.paint, -2.98, 2.30, p > 0 ? FW - 0.025 : -FW, p > 0 ? FW : -FW + 0.025, FZ - 0.08, FZ + 0.01);
      /* the big curved front mudguard over the idler (P2, P4, P6) */
      /* a quarter ellipse from the shelf to the nose, clear of the track round the idler */
      var MG = [];
      for (i = 0; i <= 8; i++) { var tt = i / 8 * Math.PI / 2; MG.push([2.15 + 0.93 * Math.sin(tt), FZ + 0.03 - 0.55 * (1 - Math.cos(tt))]); }
      for (i = 0; i + 1 < MG.length; i++) {
        belt(B.paint, MG[i][0], MG[i][1], MG[i + 1][0], MG[i + 1][1], ylo, yhi, 0.035);
        /* the deep turned-down outer lip and the inner one against the hull (P4) */
        belt(B.paint, MG[i][0], MG[i][1] - 0.07, MG[i + 1][0], MG[i + 1][1] - 0.07, p > 0 ? FW - 0.03 : -FW - 0.01, p > 0 ? FW + 0.01 : -FW + 0.03, 0.17);
        belt(B.paint, MG[i][0], MG[i][1] - 0.04, MG[i + 1][0], MG[i + 1][1] - 0.04, p > 0 ? HW + 0.02 : -HW - 0.05, p > 0 ? HW + 0.05 : -HW - 0.02, 0.10);
      }
      /* its stiffening ribs (P2) */
      for (i = 0; i < 2; i++) {
        var yr = p * (1.22 + i * 0.22);
        for (k = 2; k + 1 < MG.length; k++) belt(B.paint, MG[k][0], MG[k][1] + 0.02, MG[k + 1][0], MG[k + 1][1] + 0.02, yr - 0.015, yr + 0.015, 0.03);
      }
      /* rear fender end, turned down, and the mud flap */
      belt(B.paint, -2.98, FZ, -3.08, FZ - 0.16, ylo, yhi, 0.03);
      /* hull side above the shelf: the joint strip */
      box(B.dark, -2.95, 1.93, p > 0 ? HW : -HW - 0.012, p > 0 ? HW + 0.012 : -HW, FZ, FZ + 0.02);
    }

    /* --- glacis -------------------------------------------------------------- */
    var ang = Math.atan(0.577), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    /* the welded joint of the glacis to the deck and the bow MG's small port, right (ru.wiki) */
    slab(B.dark, [1.95, 0, glacisZ(1.95) + 0.004], u, [0, 1, 0], w, 0.012, 0.97, 0.006);
    cyl(B.dark, [2.30, -0.38, glacisZ(2.30) + 0.0], [2.33, -0.38, glacisZ(2.33) + 0.05], 0.035, 0.035, 8);
    /* two towing hooks and the lifting eyes on the nose (P6) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 2.98, 3.10, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.70, 0.80);
      box(B.dark, 3.06, 3.12, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.62, 0.72);
      slab(B.dark, [2.55, s * 0.80, glacisZ(2.55) + 0.04], u, [0, 1, 0], w, 0.05, 0.015, 0.04);
    }
    /* driver's hatch front left with its two periscopes (P6), the hull-roof joint */
    cylZ(B.paint, 1.62, 0.52, DECK, DECK + 0.06, 0.26, 18);
    cylZ(B.paint, 1.62, 0.52, DECK + 0.06, DECK + 0.08, 0.20, 14);
    box(B.dark, 1.86, 1.94, 0.38, 0.48, DECK, DECK + 0.07);
    box(B.dark, 1.86, 1.94, 0.56, 0.66, DECK, DECK + 0.07);
    /* the headlamp in its guard on the right front (P2, P6) */
    cyl(B.paint, [2.06, -1.22, FZ + 0.17], [2.20, -1.22, FZ + 0.17], 0.095, 0.10, 14);
    cyl(B.dark, [2.20, -1.22, FZ + 0.17], [2.215, -1.22, FZ + 0.17], 0.085, 0.085, 14);
    box(B.paint, 2.08, 2.14, -1.25, -1.19, FZ, FZ + 0.08);
    /* its guard: a bent bar frame ahead of the lamp */
    box(B.dark, 2.26, 2.29, -1.38, -1.35, FZ, FZ + 0.30);
    box(B.dark, 2.26, 2.29, -1.09, -1.06, FZ, FZ + 0.30);
    box(B.dark, 2.26, 2.29, -1.38, -1.06, FZ + 0.27, FZ + 0.30);
    box(B.dark, 2.02, 2.29, -1.38, -1.35, FZ + 0.27, FZ + 0.30);
    box(B.dark, 2.02, 2.29, -1.09, -1.06, FZ + 0.27, FZ + 0.30);

    /* --- fender stowage --------------------------------------------------------
       right (P2, P6): three box fuel tanks at the front, two ZIP boxes behind;
       left (P1): long ZIP boxes, the oil tank, the exhaust outlet over the rear */
    var yI = HW + 0.05, yO = FW - 0.06;
    for (i = 0; i < 3; i++) {
      x = 2.02 - i * 0.58;
      roundBox(B.paint, x - 0.54, x, -yO, -yI, FZ, FZ + 0.36, 0.07);
      box(B.dark, x - 0.56, x - 0.54, -yO, -yI, FZ, FZ + 0.30);
      cylZ(B.dark, x - 0.12, -1.30, FZ + 0.36, FZ + 0.40, 0.04, 8);
    }
    box(B.paint, -1.10, 0.20, -yO, -yI, FZ, FZ + 0.30);
    box(B.dark, -0.47, -0.43, -yO - 0.005, -yI, FZ + 0.08, FZ + 0.24);
    box(B.paint, -2.70, -1.30, -yO, -yI, FZ, FZ + 0.27);
    box(B.team, -2.30, -1.70, -1.42, -1.22, FZ + 0.27, FZ + 0.29);
    box(B.paint, 0.40, 2.05, yI, yO, FZ, FZ + 0.30);
    box(B.dark, 1.20, 1.24, yO, yO + 0.005, FZ + 0.08, FZ + 0.22);
    roundBox(B.paint, -0.30, 0.30, yI, yO, FZ, FZ + 0.34, 0.08);
    box(B.paint, -1.65, -0.45, yI, yO, FZ, FZ + 0.28);
    box(B.dark, -1.08, -1.04, yO, yO + 0.005, FZ + 0.06, FZ + 0.22);
    /* exhaust outlet on the left fender rear (P1) */
    box(B.paint, -2.75, -2.05, yI, yO - 0.10, FZ, FZ + 0.14);
    box(B.dark, -2.70, -2.10, yO - 0.10, yO - 0.06, FZ + 0.02, FZ + 0.12);
    /* box straps */
    [1.70, 0.75].forEach(function (xx) { box(B.dark, xx - 0.025, xx + 0.025, yI - 0.01, yO + 0.01, FZ + 0.30, FZ + 0.315); });

    /* --- engine deck: louvred intake, radiator grille across the rear, access hatch ---- */
    box(B.paint, -1.55, -1.05, -0.70, 0.70, DECK, DECK + 0.05);
    for (i = 0; i < 6; i++) box(B.dark, -1.52 + i * 0.08, -1.48 + i * 0.08, -0.62, 0.62, DECK + 0.05, DECK + 0.06);
    box(B.dark, -2.85, -1.95, -0.85, 0.85, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 7; i++) box(B.paint, -2.82 + i * 0.13, -2.77 + i * 0.13, -0.83, 0.83, DECK + 0.012, DECK + 0.035);
    box(B.paint, -1.88, -1.62, -0.55, 0.55, DECK, DECK + 0.03);
    box(B.team, -1.84, -1.66, -0.25, 0.25, DECK + 0.03, DECK + 0.045);
    /* stern: tow hooks */
    box(B.dark, -3.10, -2.99, 0.62, 0.76, 0.64, 0.76);
    box(B.dark, -3.10, -2.99, -0.76, -0.62, 0.64, 0.76);
    /* the two 200 l drums across the stern on their brackets (D1, P5) */
    for (i = 0; i < V.drums; i++) {
      var dyr = i ? -0.47 : 0.47, dxr = -3.24, dzr = 1.32;
      cylY(B.paint, dxr, dyr - 0.44, dyr + 0.44, dzr, 0.29, 18);
      /* the rolled rims and the two rolling hoops (open bands: the painted ends show) */
      cyl(B.dark, [dxr, dyr - 0.44, dzr], [dxr, dyr - 0.40, dzr], 0.296, 0.296, 18, true);
      cyl(B.dark, [dxr, dyr + 0.40, dzr], [dxr, dyr + 0.44, dzr], 0.296, 0.296, 18, true);
      cyl(B.dark, [dxr, dyr - 0.16, dzr], [dxr, dyr - 0.13, dzr], 0.297, 0.297, 18, true);
      cyl(B.dark, [dxr, dyr + 0.13, dzr], [dxr, dyr + 0.16, dzr], 0.297, 0.297, 18, true);
      cylY(B.dark, dxr, dyr + (dyr > 0 ? 0.44 : -0.46), dyr + (dyr > 0 ? 0.46 : -0.44), dzr + 0.17, 0.035, 8);
      box(B.dark, -3.24, -2.99, dyr - 0.32, dyr - 0.28, 1.00, 1.10);
      box(B.dark, -3.24, -2.99, dyr + 0.28, dyr + 0.32, 1.00, 1.10);
      box(B.dark, -3.26, -3.22, dyr - 0.32, dyr - 0.28, 1.00, 1.62);
      box(B.dark, -3.26, -3.22, dyr + 0.28, dyr + 0.32, 1.00, 1.62);
    }
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.04]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.04]);
    pts = [];
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    /* the small-link dry-pin track (ru.wiki): 137 mm links, drawn as every other link */
    cnt = Math.round(tot / 0.274); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.06);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link with its grouser, and the centre guide horn standing inside the run (P1) */
        belt(B.dark, px - dx * 0.06, pz - dz * 0.06, px + dx * 0.06, pz + dz * 0.06, y - TW - 0.01, y + TW + 0.01, 0.08);
        belt(B.dark, px - dx * 0.03 - dz * 0.075, pz - dz * 0.03 + dx * 0.075, px + dx * 0.03 - dz * 0.075, pz + dz * 0.03 + dx * 0.075, y - 0.03, y + 0.03, 0.06);
      }
      /* rear drive sprocket with its two toothed rings (P1, P4), front idler */
      cylY(B.dark, SPR.x, y - 0.20, y + 0.20, SPR.z, SPR.r - 0.04, 18);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y - s * 0.12, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y + s * 0.12, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
      }
      cylY(B.paint, SPR.x, y + s * 0.19, y + s * 0.25, SPR.z, 0.19, 14);
      cylY(B.dark, SPR.x, y + s * 0.25, y + s * 0.30, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.21, y + 0.21, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.20, y + s * 0.27, IDL.z, 0.11, 10);
      box(B.dark, IDL.x - 0.32, IDL.x, y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
    }
  }

  /* road wheel (P1, P3): the cast "starfish" pair, rubber tyres, a dished face with eight
     holes between the ribs, and the hub cap */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.25, y - 0.15, 0, RW, 18);
      cylY(W, 0, y + 0.15, y + 0.25, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.34, 16);
      cyl(W, [0, y + s * 0.25, 0], [0, y + s * 0.28, 0], 0.345, 0.20, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.12, 12);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.255, y + s * 0.266, Math.sin(a) * 0.255], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.055, 0.012, 0.045);
      }
      W.col = RIB;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        slab(W, [Math.cos(a) * 0.23, y + s * 0.27, Math.sin(a) * 0.23], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.11, 0.012, 0.018);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.32, 0, 0.055, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the T-54A's cast dome (the T-54-3 turret, "without the undercut", ru.wiki): its widest ring
     is the foot, the sides curve in to a broad flat top; the front is lower than the rear
     (P1, P3).  Rings of PROF (radius factor, height); plan radii AF forward, AR aft, AY across,
     a superellipse in plan; "drop" lowers the front. */
  var PROF = [[1.00, 0.00], [1.005, 0.06], [1.00, 0.14], [0.975, 0.25], [0.93, 0.36], [0.85, 0.47],
              [0.73, 0.57], [0.56, 0.645], [0.36, 0.69], [0.16, 0.71], [0.0, 0.715]];
  var DP = 2 / 2.3;
  function domeAt(D, a, rf, hz) {
    var c = Math.cos(a), s = Math.sin(a);
    var sx = (c >= 0 ? D.AF : D.AR) * rf * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), DP);
    var sy = D.AY * rf * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), DP);
    /* the front droop grows with the distance ahead of the ring centre, so the crown stays whole */
    var z = hz * (D.H / 0.715) * (1 - D.drop * Math.max(sx, 0) / D.AF);
    return [sx, sy, z];
  }
  function addDome(B, D) {
    var NS = 48, G = [], rI, j, V = [], Nacc = [], tris = [], ctr = [0, 0, 0.05];
    for (rI = 0; rI < PROF.length; rI++) {
      G.push([]);
      for (j = 0; j < NS; j++) { G[rI].push(V.length); V.push(domeAt(D, j / NS * TAU, PROF[rI][0], PROF[rI][1])); Nacc.push([0, 0, 0]); }
    }
    function face(a, b, d) {
      var n = cross(sub(V[b], V[a]), sub(V[d], V[a])), m = [(V[a][0] + V[b][0] + V[d][0]) / 3 - ctr[0], (V[a][1] + V[b][1] + V[d][1]) / 3, (V[a][2] + V[b][2] + V[d][2]) / 3 - ctr[2]];
      if (dot(n, m) < 0) { var t = b; b = d; d = t; n = [-n[0], -n[1], -n[2]]; }
      n = unit(n);
      [a, b, d].forEach(function (i) { Nacc[i][0] += n[0]; Nacc[i][1] += n[1]; Nacc[i][2] += n[2]; });
      tris.push([a, b, d]);
    }
    for (rI = 0; rI + 1 < PROF.length; rI++)
      for (j = 0; j < NS; j++) {
        var j1 = (j + 1) % NS;
        face(G[rI][j], G[rI][j1], G[rI + 1][j1]); face(G[rI][j], G[rI + 1][j1], G[rI + 1][j]);
      }
    var NN = Nacc.map(unit);
    tris.forEach(function (t) {
      var A = V[t[0]], Bv = V[t[1]], Cv = V[t[2]];
      if (cross(sub(Bv, A), sub(Cv, A)).every(function (q) { return Math.abs(q) < 1e-9; })) return;
      B.paint.tri(A, Bv, Cv, NN[t[0]], NN[t[1]], NN[t[2]]);
    });
    /* the cast foot ring where the dome meets the deck */
    for (j = 0; j < NS; j++) {
      var p0 = domeAt(D, j / NS * TAU, 1.01, 0.0), p1 = domeAt(D, (j + 1) / NS * TAU, 1.01, 0.0);
      var mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, ll = Math.sqrt(mx * mx + my * my) || 1;
      slab(B.dark, [mx, my, 0.012], unit([p1[0] - p0[0], p1[1] - p0[1], 0]), [mx / ll, my / ll, 0], [0, 0, 1], Math.sqrt((p1[0] - p0[0]) * (p1[0] - p0[0]) + (p1[1] - p0[1]) * (p1[1] - p0[1])) / 2, 0.012, 0.012);
    }
  }
  /* a point on the dome pushed out (or in) along the plan radius by dr */
  function onDome(D, a, rf, hz, dr) {
    var P = domeAt(D, a, rf, hz), l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
    return [P[0] + P[0] / l * dr, P[1] + P[1] / l * dr, P[2]];
  }

  var GZ = 0.30;                                         /* gun axis above the ring (D1, P1) */
  function addGun(B, V) {
    if (V.gun === "l7") return addL7(B, V);
    var M = V.muz, E0 = V.evac[0], E1 = V.evac[1], X0 = V.dome.AF - 0.25;
    /* the cast gun collar out of the embrasure, under the canvas cover */
    cylX(B.paint, X0, X0 + 0.35, 0, GZ, 0.19, 0.16, 16);
    /* the canvas mantlet cover (P2, P4, P5): a loose boot from the turret face to the barrel */
    var L = [], k, j, xr = [X0 + 0.03, X0 + 0.15, X0 + 0.27, X0 + 0.38, X0 + 0.47], rr = [0.34, 0.31, 0.26, 0.19, 0.13], R = rng(55);
    for (k = 0; k < xr.length; k++) {
      var ring = [];
      for (j = 0; j < 14; j++) {
        var a = j / 14 * TAU, wob = 1 + (k > 0 && k < 4 ? (R() - 0.5) * 0.10 : 0);
        ring.push([xr[k], Math.cos(a) * rr[k] * wob * 1.15, GZ + Math.sin(a) * rr[k] * wob * (k === 0 ? 0.95 : 1)]);
      }
      L.push(ring);
    }
    loftN(B.canvas, L);
    /* the barrel, tapering to the evacuator */
    cylX(B.paint, X0 + 0.35, E0, 0, GZ, 0.118, 0.088, 18);
    /* the bore evacuator at the muzzle (P2, P4, P5, D1): tapered rear, plain body, front lip */
    cylX(B.paint, E0, E0 + 0.16, 0, GZ, 0.088, 0.124, 18);
    cylX(B.paint, E0 + 0.16, E1 - 0.04, 0, GZ, 0.124, 0.124, 18);
    cylX(B.dark, E0 + 0.40, E0 + 0.42, 0, GZ, 0.126, 0.126, 16);
    cylX(B.paint, E1 - 0.04, E1, 0, GZ, 0.124, 0.112, 18);
    cylX(B.paint, E1, M, 0, GZ, 0.104, 0.100, 16);
    cylX(B.dark, M - 0.004, M + 0.002, 0, GZ, 0.052, 0.052, 12);
    /* coaxial MG port right of the gun, the gunner's sight port left (ru.wiki, P6) */
    cylX(B.dark, X0 + 0.07, X0 + 0.27, -0.30, GZ - 0.02, 0.028, 0.028, 8);
    cylX(B.dark, X0 + 0.05, X0 + 0.21, 0.31, GZ + 0.06, 0.05, 0.05, 10);
  }
  /* the Type 79's 105 mm Type 83 (P7): a cast collar out of the embrasure (no canvas
     cover), the thermal sleeve with its clamp bands from the collar to the muzzle, the fume
     extractor about a third of the way out, a short bare muzzle */
  function addL7(B, V) {
    var M = V.muz, X0 = V.dome.AF - 0.25, F0 = X0 + V.fume[0], F1 = X0 + V.fume[1], x;
    cylX(B.paint, X0, X0 + 0.22, 0, GZ, 0.24, 0.20, 18);
    cylX(B.paint, X0 + 0.22, X0 + 0.42, 0, GZ, 0.20, 0.13, 18);
    cylX(B.paint, X0 + 0.42, F0, 0, GZ, 0.112, 0.108, 16);
    cylX(B.paint, F0, F0 + 0.10, 0, GZ, 0.108, 0.150, 16);
    cylX(B.paint, F0 + 0.10, F1 - 0.08, 0, GZ, 0.150, 0.150, 16);
    cylX(B.paint, F1 - 0.08, F1, 0, GZ, 0.150, 0.104, 16);
    cylX(B.paint, F1, M - 0.30, 0, GZ, 0.104, 0.098, 16);
    cylX(B.paint, M - 0.30, M, 0, GZ, 0.082, 0.082, 14);
    cylX(B.dark, M - 0.004, M + 0.002, 0, GZ, 0.050, 0.050, 12);
    /* the sleeve's clamp bands, closer on the inboard run (P7) */
    for (x = X0 + 0.62; x < F0 - 0.05; x += 0.36) cylX(B.dark, x, x + 0.04, 0, GZ, 0.120, 0.120, 14);
    for (x = F1 + 0.30; x < M - 0.45; x += 0.50) cylX(B.dark, x, x + 0.04, 0, GZ, 0.110, 0.110, 14);
    cylX(B.dark, F0 + 0.30, F0 + 0.34, 0, GZ, 0.156, 0.156, 14);
    /* coaxial MG port right of the gun, the gunner's sight port left, as the T-54A */
    cylX(B.dark, X0 + 0.07, X0 + 0.27, -0.30, GZ - 0.02, 0.028, 0.028, 8);
    cylX(B.dark, X0 + 0.05, X0 + 0.21, 0.31, GZ + 0.06, 0.05, 0.05, 10);
  }
  function addTurret(V, B) {
    var D = V.dome, H = D.H, s, i, a, P, Q;
    addDome(B, D);
    addGun(B, V);
    /* the grab rails along the turret sides (P4, P6) */
    for (s = -1; s <= 1; s += 2) {
      [[0.95, 1.55], [1.75, 2.30]].forEach(function (rg) {
        var n = 5, k, A0, A1;
        for (k = 0; k < n; k++) {
          A0 = onDome(D, s * (rg[0] + (rg[1] - rg[0]) * k / n), 0.95, 0.40, 0.07);
          A1 = onDome(D, s * (rg[0] + (rg[1] - rg[0]) * (k + 1) / n), 0.95, 0.40, 0.07);
          cyl(B.dark, A0, A1, 0.018, 0.018, 6, true);
        }
        A0 = onDome(D, s * rg[0], 0.95, 0.40, 0.0); A1 = onDome(D, s * rg[0], 0.95, 0.40, 0.07);
        cyl(B.dark, A0, A1, 0.016, 0.016, 6, true);
        A0 = onDome(D, s * rg[1], 0.95, 0.40, 0.0); A1 = onDome(D, s * rg[1], 0.95, 0.40, 0.07);
        cyl(B.dark, A0, A1, 0.016, 0.016, 6, true);
      });
    }
    /* commander's cupola, left (D1, P3): ring, vision blocks, the domed hatch, his sight */
    var CX = -0.18, CY = 0.50, RZ = H - 0.07;
    cylZ(B.paint, CX, CY, RZ - 0.08, RZ + 0.08, 0.32, 20);
    for (i = 0; i < 5; i++) {
      a = -0.9 + i * 0.45;
      box(B.dark, CX + Math.cos(a) * 0.30 - 0.04, CX + Math.cos(a) * 0.30 + 0.04,
          CY + Math.sin(a) * 0.30 - 0.04, CY + Math.sin(a) * 0.30 + 0.04, RZ + 0.0, RZ + 0.07);
    }
    cyl(B.paint, [CX, CY, RZ + 0.08], [CX, CY, RZ + 0.13], 0.27, 0.22, 18);
    box(B.paint, CX + 0.16, CX + 0.34, CY - 0.08, CY + 0.08, RZ + 0.06, RZ + 0.20);
    box(B.dark, CX + 0.34, CX + 0.35, CY - 0.06, CY + 0.06, RZ + 0.10, RZ + 0.18);
    /* loader's hatch, right, inside the DShK's ring mount (D1, P3, P4, ru.wiki) */
    var LX = -0.20, LY = -0.48;
    cylZ(B.paint, LX, LY, RZ - 0.08, RZ + 0.05, 0.27, 18);
    cyl(B.paint, [LX, LY, RZ + 0.05], [LX, LY, RZ + 0.08], 0.25, 0.20, 16);
    for (i = 0; i < 16; i++) {
      var r0 = 0.40, a0 = i / 16 * TAU, a1 = (i + 1) / 16 * TAU;
      cyl(B.dark, [LX + Math.cos(a0) * r0, LY + Math.sin(a0) * r0, RZ + 0.10], [LX + Math.cos(a1) * r0, LY + Math.sin(a1) * r0, RZ + 0.10], 0.022, 0.022, 6, true);
    }
    for (i = 0; i < 4; i++) {
      a = i / 4 * TAU + 0.4;
      P = [LX + Math.cos(a) * 0.40, LY + Math.sin(a) * 0.40];
      box(B.dark, P[0] - 0.02, P[0] + 0.02, P[1] - 0.02, P[1] + 0.02, RZ - 0.02, RZ + 0.10);
    }
    if (V.aaMg) {
      /* the 12.7 mm DShK on its cradle at the rear of the ring, barrel forward (D1, P4, P5) */
      var GX = LX - 0.36, GY = LY, GZ2 = RZ + 0.40;
      box(B.dark, GX - 0.04, GX + 0.04, GY - 0.04, GY + 0.04, RZ + 0.08, GZ2 - 0.04);
      box(B.dark, GX - 0.10, GX + 0.12, GY - 0.10, GY + 0.10, GZ2 - 0.08, GZ2 - 0.03);
      box(B.dark, GX - 0.25, GX + 0.30, GY - 0.06, GY + 0.06, GZ2 - 0.05, GZ2 + 0.06);
      box(B.dark, GX - 0.05, GX + 0.20, GY + 0.06, GY + 0.20, GZ2 - 0.12, GZ2 + 0.06);
      cylX(B.dark, GX - 0.40, GX - 0.25, GY, GZ2, 0.03, 0.03, 8);
      cylX(B.dark, GX + 0.30, GX + 1.42, GY, GZ2 + 0.01, 0.026, 0.024, 8);
      for (i = 0; i < 4; i++) cylX(B.dark, GX + 0.34 + i * 0.07, GX + 0.37 + i * 0.07, GY, GZ2 + 0.01, 0.04, 0.04, 8);
      cylX(B.dark, GX + 1.36, GX + 1.48, GY, GZ2 + 0.01, 0.042, 0.042, 8);
      box(B.dark, GX + 0.80, GX + 0.84, GY - 0.02, GY + 0.02, GZ2 + 0.02, GZ2 + 0.10);
    }
    /* the mushroom ventilator ahead of the hatches, the antenna base left rear (P3) */
    cylZ(B.paint, 0.38, -0.12, H - 0.10, H + 0.02, 0.06, 10);
    cyl(B.paint, [0.38, -0.12, H + 0.02], [0.38, -0.12, H + 0.07], 0.14, 0.12, 14);
    cylZ(B.dark, -0.70, 0.62, H - 0.24, H - 0.10, 0.05, 8);
    /* the gunner's periscope head ahead of the cupola */
    box(B.paint, 0.40, 0.62, 0.30, 0.48, H - 0.12, H + 0.05);
    box(B.dark, 0.62, 0.63, 0.32, 0.46, H - 0.03, H + 0.03);
    box(B.team, -0.30, 0.08, -0.09, 0.09, H - 0.03, H + 0.004);
    /* lifting eyes */
    for (s = -1; s <= 1; s += 2) {
      P = onDome(D, s * 1.30, 0.70, 0.58, 0.0);
      box(B.dark, P[0] - 0.05, P[0] + 0.05, P[1] - 0.015, P[1] + 0.015, P[2] - 0.01, P[2] + 0.06);
      Q = onDome(D, Math.PI + s * 0.5, 0.75, 0.55, 0.0);
      box(B.dark, Q[0] - 0.05, Q[0] + 0.05, Q[1] - 0.015, Q[1] + 0.015, Q[2] - 0.01, Q[2] + 0.06);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of the build (models3d convention): the stern drums at -3.53 m
   to the muzzle at +6.00 m; the published 9.00 m gun forward runs from the hull's rear plate */
UNIT_MODELS["pact_e50_mbt"] = {
  len: 9.54,
  build: function (THREE, M, C) { return HeroT54.build(THREE, M, C, "A"); }
};

/* The PLA's Type 59 (ZTZ-59, WZ-120) is the T-54A built under licence from 1959: drawn as
   the T-54A, no markings.  NOT checked against Type 59 photographs: later Type 59s carry
   an IR searchlight and other refits that are not drawn here. */
UNIT_MODELS["pla_e60_mbt"] = {
  len: 9.54,
  build: function (THREE, M, C) { return HeroT54.build(THREE, M, C, "A"); }
};

/* ---- PLA: the Type 79 (pla_e80_mbt), drawn on this model (variant T79) ----------------
   The Type 59 is the T-54A built under licence, and the Type 69 and Type 79 "share almost
   identical hulls and turrets with the older Type 59" (en.wikipedia "Type 69 tank", citing
   Gelbart 1996); the Type 79 (Type 69-III, WZ-121D, production 1984) carries the 105 mm Type
   83 (an L7 development) with a replaceable thermal sleeve.  Published: hull 6.24 m, width
   3.3 m, height 2.80 m, 36.7 t.
     P7  "TYPE79-WUHAN-20250929.jpg" (Commons, a Type 79 displayed in Wuhan, 2025, front
         right): the T-54A hull, five road wheels and dome turret; the long gun with the
         sleeve's clamp bands and the fume extractor; a cast collar at the embrasure and NO
         canvas cover; the 12.7 mm gun on the loader's hatch; the fender boxes; no skirts.
   NOT drawn: side skirts (en.wikipedia lists "side-skirt armor" for the Type 79; the
   photographed tank has none), the laser rangefinder housing and any IR light (none
   visible in P7), its museum camouflage and number.  The rear (drums) is the T-54A's, not
   checked against a Type 79.  Paint: PLA green, as the T-54A's, a different mottle. */
UNIT_MODELS["pla_e80_mbt"] = {
  len: 9.99,
  build: function (THREE, M, C) { return HeroT54.build(THREE, M, C, "T79"); }
};
