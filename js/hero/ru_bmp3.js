/* ============ ru_bmp3.js - HERO model: the BMP-3 infantry fighting vehicle ============
   Three rows, one vehicle (Object 688M, in service 1987). Every row is the plain BMP-3; what
   changes by period is the paint and the stowed snorkel tube, as photographs of each period show.
     pact_e90_ifv   BMP-3, 1990s         three-tone green / sand / black, no snorkel tube
     pact_e00_ifv   BMP-3, 2000s         three-tone green / sand / black, snorkel tube on the port deck
     ifv_p          BMP-3, present day   plain Russian green, snorkel tube on the port deck

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960, cached in
   scratchpad/q_bmp3_ref:
     D1  "BMP-3 line drawing.gif" (public domain) - starboard side drawing, bow right: hull profile,
         glacis knee, bow and trim-vane face, road-wheel span, idler and sprocket heights, the
         ribbed side skirt, the long louvred vent on the starboard rear, turret length and roof,
         gun axis and muzzle. Scaled to the 7.14 m hull.
     P1  "BMP-3 in Russian service (2).jpg" (2002) - port side, three-tone paint, no tube on the deck.
     P2  "BMP-3 (3).jpg" (V. Kuzmin, 2008) - port front 3/4: trim vane, front mudguard, bow PKT and
         its ball mount, glacis lamps and handles, snorkel tube on the port deck, three-tone paint.
     P3  "BMP-3 - ETIF-2010 (4).jpg" (V. Kuzmin, 2010) - port side: tube, smoke tubes, sights, aerials.
     P4  "BMP-3 IFV - TankBiathlon14part2-65.jpg" (V. Kuzmin, 2014) - starboard 3/4: segmented
         skirt, starboard rear vent, wheels, plain green.
     P5  "BMP-3.jpg" (Russian MoD, CC BY 4.0, 2018) - front-left 3/4 from above: glacis layout,
         hatches, lamps, sights, smoke tubes, plain green.
     P6  "Captured BMP-3 Ukrainian AF 2022-02.jpg" (2022) - dead ahead: trim-vane board, lamp guards
         at about 0.56 m each side of the centre line, bow PKTs at the corners, smoke tubes.
     P7  "BMP-3 (41204909204).jpg" (D. Fomin, 2018 parade) - port side: tube, wheel spacing, sights.
     P8  "BMP-3 Kubinka.jpg" (2012, museum) - starboard front 3/4: bow ball mount, mudguard, vane arms.
     P9  "BMP-3 infantry fighting vehicle at Engineering Technologies 2012 03.jpg" - starboard rear
         3/4: two rear doors, steps, the vent, the sprocket, the skirt's rounded section.
   Published figures (en/ru Wikipedia): 7.14 m long, 3.15 m wide, 2.3 m to the turret roof, 18.7 t,
   six road wheels and a rear sprocket, 100 mm 2A70 with a coaxial 30 mm 2A72 and a 7.62 mm PKT,
   two bow PKTs (facts.js: 3 x PKT). Kept from the old header; the references agree.

   CORRECTIONS against the previous model:
   - road wheels 0.65 m -> 0.60 m across (D1 and P7 both give wheel / hull length = 0.084) and the
     pitch is uneven: the gap between the second and third wheels from the front is the widest
     (D1, P4, P7), the others about 0.8 m;
   - the hull roof 1.74 m -> 1.78 m and the glacis knee at x 1.05 (D1: roof / turret roof = 0.80);
   - the bow is the folded trim-vane BOARD across the front (P5, P6, P8), not a plate on the glacis;
   - the side skirt is a rounded, segmented section standing out from the hull side over the
     tracks (P4, P7, P9), not a flat ribbed band; the front of it curves down as the mudguard;
   - the starboard rear vent IS on the 1990s row too: D1 shows the long louvred opening there;
   - the snorkel tube is on the PORT deck edge (P2, P3, P7), on the 2000s and present rows; the
     2002 photograph P1 shows none, so the 1990s row has none;
   - bow PKTs are in ball mounts on the front CORNERS of the upper hull (P2, P6, P8);
   - paint: the 1990s and 2000s photographs show the three-tone scheme (P1, P2, P3; P8 is an early
     vehicle in it), 2014 onward plain green (P4, P5, P6, P7).

   Recognition list (what makes it read at game zoom, and its source):
     1. long, low hull with a flat roof and a very long shallow glacis to a sharp bow - D1, P7
     2. the trim-vane board forming the whole bow face, with its side arms - P2, P6, P8
     3. rounded segmented skirt over the track top, curving down at the front - P4, P7, P9
     4. six small road wheels, the widest gap behind the second; raised rear sprocket - D1, P7, P9
     5. turret a little ahead of the middle, faceted, low - D1, P3, P7
     6. stubby thick 100 mm gun with the thin 30 mm alongside to starboard - D1, P2, P9
     7. three smoke tubes on each front cheek of the turret, raked forward - P3, P5, P7
     8. gunner's drum sight on the port front of the roof, commander's sight to starboard - P3, P5, P7
     9. two bow PKTs at the front corners, two lamp guards on the glacis - P2, P6, P8
    10. stern: two tall doors with steps under them - P9
    11. louvred vent on the starboard rear hull side - D1, P4, P9
    12. 2000s / present: the snorkel tube along the port deck edge - P2, P3, P7
   Paint (sampled, then taken to about 0.8 of level for the ACES pass): plain green #5c5f4e (P7)
   -> #4a4d3e; three-tone base green #62684d / sand #a29a7c / black #2a2723 (P1, P3, P8) ->
   #4f543e / #827b63 / #24221e. No numbers, flags or parade stripes (P1, P5, P7 carry them).
   NOT CONFIRMED, drawn plain or left off: the exact hatch outlines of the rear roof (two pairs
   drawn, as the rear doors' roof hatches and the troop hatches), the turret rear stowage, any
   wartime add-on (slat screens, cope cages: no photograph of a row's period here shows one on a
   BMP-3), the IR lamp some early vehicles carry beside the gun (P1 too small to confirm).
   Triangles 15,372 (1990s) / 15,556 (with the tube); 13 draw calls (hull 4, turret 3, six wheels);
   5 materials. X extent 7.30 m (the folded door steps and the 100 mm muzzle; hull 7.14 m).
   Materials: PAINT (canvas texture, metre UVs: base, camouflage, plate seams, bolt rows, grime),
   DARK (track, fittings, gun tubes), GLASS, WHEEL (vertex colours), and the team colour exactly
   as handed in (C.team) on two 0.25 x 1.0 m strips on the rear roof.  Nodes: "turret" (ring
   centre on the roof, guns along +X at rest) and six "roadwheel" groups (axle on local Y, both
   sides in one mesh).  Model space +X bow, +Y left (port), +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBMP3 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    A: { paint: { base: "#4f543e", camo: ["#827b63", "#24221e"], seed: 1990, us: 0.22 }, tube: false },   /* 1990s */
    B: { paint: { base: "#4d523c", camo: ["#7e785f", "#23211d"], seed: 2008, us: 0.22 }, tube: true },    /* 2000s */
    C: { paint: { base: "#4a4d3e", camo: null, seed: 2018, us: 0.34 }, tube: true }                       /* present */
  };

  /* running gear (D1 span, P7 gap ratios): six 0.60 m wheels, the widest gap behind the second */
  var XW = [1.73, 0.92, -0.05, -0.87, -1.65, -2.47], ZW = 0.37, RW = 0.30;
  var TY = 1.37, TW = 0.19;                                   /* track centre and half width (380 mm) */
  var SPR = { x: -3.16, z: 0.66, r: 0.30 }, IDL = { x: 2.72, z: 0.60, r: 0.26 };
  var XR = [1.32, -0.46, -2.06], ZR = 0.80, RR = 0.075;      /* return rollers */
  var ROOF = 1.78, ZS = 0.95, TX = 0.15;                     /* roof, sponson underside, ring centre */

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

  /* a closed solid lofted through LEVELS, each a convex ring of [x, y, z] points with the same
     count; the end rings are capped with fans */
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
  /* half plan [x, y] (y > 0, front to rear) to a full closed ring at height z */
  function ringAt(H, z, dx) {
    var Q = [], i;
    dx = dx || 0;
    for (i = 0; i < H.length; i++) Q.push([H[i][0] + dx, H[i][1], z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0] + dx, -H[i][1], z]);
    return Q;
  }
  /* piecewise-linear lookup in a table of [x, value] rows sorted by x */
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
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
  /* a soft-edged blob drawn nine times so the tile wraps without a seam */
  function blob(q, S, R, cx, cy, rx, ry, col, rot, jit) {
    var k, n = 9, pts = [], a, r, ox, oy, c = Math.cos(rot || 0), sn = Math.sin(rot || 0), px, py;
    for (k = 0; k < n; k++) {
      a = k / n * TAU; r = jit ? 1 - jit / 2 + R() * jit : 0.65 + R() * 0.5; px = Math.cos(a) * rx * r; py = Math.sin(a) * ry * r;
      pts.push([px * c - py * sn, px * sn + py * c]);
    }
    q.fillStyle = col;
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      q.beginPath();
      for (k = 0; k < n; k++) q[k ? "lineTo" : "moveTo"](cx + ox + pts[k][0], cy + oy + pts[k][1]);
      q.closePath(); q.fill();
    }
  }
  /* hull and turret paint. Plain green: one tile is 1 / 0.34 = 2.9 m. Three-tone: one tile is
     1 / 0.22 = 4.5 m, so the sand and black patches come out about a metre across, as in P1-P3.
     Then plate seams with bolt rows, rain streaks and grime (P4, P5, P9). */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "bmp3" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 26; i++) { q.globalAlpha = 0.18 + R() * 0.2; blob(q, S, R, R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, i % 2 ? "#3f4334" : "#5c6049"); }
      q.globalAlpha = 1;
      if (P.camo) {
        /* the Russian three-tone of P1-P3: big sand patches over the green, each edged on one
           side by a long thin black band, and a few black bands on their own, all raked */
        for (i = 0; i < 5; i++) {
          x = R() * S; y = R() * S; w = (R() - 0.5) * 1.2;
          blob(q, S, R, x, y, 75 + R() * 40, 40 + R() * 20, P.camo[0], w);
          k = R() < 0.5 ? -1 : 1;
          blob(q, S, R, x - Math.sin(w) * k * 50, y + Math.cos(w) * k * 50, 90 + R() * 30, 22 + R() * 8, P.camo[1], w, 0.25);
        }
        for (i = 0; i < 2; i++) blob(q, S, R, R() * S, R() * S, 80 + R() * 30, 20 + R() * 8, P.camo[1], (R() - 0.5) * 1.2, 0.25);
      }
      for (i = 0; i < 7; i++) {                 /* plate seams with bolt rows */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.40)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {                /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, V) {
    return { paint: new Bin(T.paint, true, false, V.paint.us), dark: new Bin(T.dark, false),
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
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* side profile measured off D1 (bow right, 0.0181 m a pixel) and checked against P7:
     roof flat at 1.78 to the glacis knee at x 1.05, glacis falling to the bow tip at 1.48; the
     trim-vane face drops from the tip to 0.90 at x 3.31, the lower nose to the belly by x 2.62;
     the belly sits 0.45 m up (published clearance) and turns up into the stern plate. */
  var TOP = [[-3.57, 1.74], [-3.53, 1.78], [1.05, 1.78], [2.00, 1.655], [3.40, 1.49], [3.53, 1.48]];
  var BOT = [[-3.57, 0.62], [-3.45, 0.47], [-3.30, 0.45], [2.62, 0.45], [2.85, 0.50], [3.12, 0.63], [3.31, 0.92]];
  /* plan half widths: upper hull side 1.36 (3.15 m over the skirts less the 0.21 m skirt, P5, P9),
     narrowing to the 1.30 m board at the bow (P6); lower hull between the tracks 1.10 */
  var WS = [[-3.57, 1.34], [-3.50, 1.36], [3.05, 1.36], [3.53, 1.30]];
  var WL = [[-3.57, 1.06], [-3.40, 1.10], [2.62, 1.10], [3.12, 1.04], [3.31, 1.00]];
  /* upper hull: the vane face is its underside where the belly line climbs above the sponson */
  var UXS = [-3.57, -3.53, -3.0, -1.5, 0.0, 1.05, 1.5, 2.0, 2.5, 3.0, 3.05, 3.20, 3.31, 3.40, 3.47, 3.53];
  var FACE = [[3.05, ZS], [3.31, 0.95], [3.53, 1.455]];        /* underside of the bow board */
  function upperRing(x) {
    var zt = pwl(TOP, x), zb = x > 3.05 ? pwl(FACE, x) : ZS, w = pwl(WS, x), e = Math.min(0.03, (zt - zb) / 3);
    return [[x, w, zb], [x, w, zt - e], [x, w - e, zt], [x, -(w - e), zt], [x, -w, zt - e], [x, -w, zb]];
  }
  var LXS = [-3.57, -3.45, -3.30, 2.62, 2.85, 3.12, 3.28];
  function lowerRing(x) {
    var zb = pwl(BOT, x), w = pwl(WL, x), wb = w - 0.06;
    return [[x, wb, zb], [x, w, zb + 0.06], [x, w, ZS + 0.03], [x, -w, ZS + 0.03], [x, -w, zb + 0.06], [x, -wb, zb]];
  }
  /* the rounded skirt section over the track (P4, P7, P9): profile [y out from the hull side, z] */
  var SK = [[0.00, 1.30], [0.09, 1.275], [0.17, 1.21], [0.215, 1.12], [0.205, 1.01], [0.155, 0.945], [0.07, 0.925], [0.00, 0.925]];
  function skirtRing(x, s, dz, sc, grow) {
    var R = [], i, w = pwl(WS, x) - 0.02;
    for (i = 0; i < SK.length; i++) R.push([x, s * (w + SK[i][0] * sc + (i && i < SK.length - 1 ? grow : 0)), SK[i][1] + dz + (grow && (i === 0 || i === SK.length - 1) ? (i ? -grow : grow) : 0)]);
    return R;
  }
  function addHull(B, V) {
    var R = [], i, k, s, x, y, z, w;
    for (i = 0; i < UXS.length; i++) R.push(upperRing(UXS[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < LXS.length; i++) R.push(lowerRing(LXS[i]));
    loftN(B.paint, R);

    /* the trim-vane board (P6, P8, D1): folded, it IS the bow face, 2.6 m wide, from the tip at
       1.46 m down to 0.62 m in front of the lower nose, bent once at 0.93 m; a stiffening lip
       along the top, the bend line, and an arm each side running back to the hull side */
    belt(B.paint, 3.335, 0.935, 3.545, 1.445, -1.30, 1.30, 0.035);
    belt(B.paint, 3.165, 0.62, 3.335, 0.935, -1.30, 1.30, 0.035);
    belt(B.paint, 3.49, 1.47, 3.575, 1.43, -1.31, 1.31, 0.05);
    belt(B.paint, 3.15, 0.60, 3.20, 0.635, -1.31, 1.31, 0.05);
    belt(B.dark, 3.33, 0.92, 3.345, 0.95, -1.27, 1.27, 0.04);
    for (s = -1; s <= 1; s += 2) {
      slab(B.paint, [3.20, s * 1.345, 1.24], unit([0.5, 0, 0.87]), [0, 1, 0], unit([-0.87, 0, 0.5]), 0.30, 0.025, 0.04);
      cylY(B.dark, 3.06, s * 1.30, s * 1.37, 1.06, 0.045, 8);
    }

    /* glacis: driver's hatch on the centre line with three periscopes, a bow gunner's hatch each
       side (P5), the lamp guards about 0.56 m out (P6), handrails (P2) */
    z = pwl(TOP, 2.55);
    cylZ(B.paint, 2.55, 0.0, z - 0.04, z + 0.07, 0.24, 18);
    cylZ(B.dark, 2.55, 0.0, z + 0.07, z + 0.09, 0.20, 16);
    box(B.paint, 2.78, 2.95, -0.32, 0.32, pwl(TOP, 2.86) - 0.03, pwl(TOP, 2.86) + 0.10);
    for (k = -1; k <= 1; k++) box(B.glass, 2.95, 2.965, k * 0.20 - 0.07, k * 0.20 + 0.07, pwl(TOP, 2.95) + 0.02, pwl(TOP, 2.95) + 0.08);
    for (s = -1; s <= 1; s += 2) {
      z = pwl(TOP, 2.30);
      cylZ(B.paint, 2.30, s * 0.80, z - 0.04, z + 0.06, 0.22, 16);
      cylZ(B.dark, 2.30, s * 0.80, z + 0.06, z + 0.08, 0.18, 14);
      box(B.paint, 2.56, 2.70, s * 0.80 - 0.12, s * 0.80 + 0.12, pwl(TOP, 2.63) - 0.02, pwl(TOP, 2.63) + 0.08);
      box(B.glass, 2.70, 2.71, s * 0.80 - 0.08, s * 0.80 + 0.08, pwl(TOP, 2.70) + 0.01, pwl(TOP, 2.70) + 0.06);
      /* lamp in its wire guard */
      z = pwl(TOP, 3.22);
      box(B.dark, 3.16, 3.30, s * 0.56 - 0.07, s * 0.56 + 0.07, z - 0.01, z + 0.03);
      cylX(B.dark, 3.18, 3.30, s * 0.56, z + 0.11, 0.075, 0.08, 12);
      cylX(B.glass, 3.30, 3.31, s * 0.56, z + 0.11, 0.065, 0.065, 12);
      belt(B.dark, 3.14, z, 3.14, z + 0.22, s * 0.56 - 0.13, s * 0.56 - 0.11, 0.02);
      belt(B.dark, 3.14, z, 3.14, z + 0.22, s * 0.56 + 0.11, s * 0.56 + 0.13, 0.02);
      belt(B.dark, 3.14, z + 0.21, 3.38, z + 0.21, s * 0.56 - 0.13, s * 0.56 + 0.13, 0.02);
      /* the bow PKT in its ball mount on the upper hull's front corner (P2, P6, P8) */
      cyl(B.paint, [3.00, s * 1.25, 1.50], [3.18, s * 1.22, 1.50], 0.13, 0.12, 14);
      cyl(B.dark, [3.18, s * 1.22, 1.50], [3.26, s * 1.21, 1.50], 0.08, 0.06, 12);
      cylX(B.dark, 3.26, 3.58, s * 1.21, 1.50, 0.022, 0.02, 8);
      /* handrails along the glacis edge (P2) */
      belt(B.dark, 1.70, pwl(TOP, 1.70) + 0.10, 2.10, pwl(TOP, 2.10) + 0.10, s * 1.24 - 0.012, s * 1.24 + 0.012, 0.025);
      belt(B.dark, 1.70, pwl(TOP, 1.70), 1.70, pwl(TOP, 1.70) + 0.11, s * 1.24 - 0.012, s * 1.24 + 0.012, 0.025);
      belt(B.dark, 2.10, pwl(TOP, 2.10), 2.10, pwl(TOP, 2.10) + 0.11, s * 1.24 - 0.012, s * 1.24 + 0.012, 0.025);
    }

    /* roof behind the turret: two troop hatches, then the two hatches over the rear doors */
    var HT = [[-1.45, -0.48], [-1.45, 0.48], [-3.00, -0.45], [-3.00, 0.45]];
    for (k = 0; k < 4; k++) {
      x = HT[k][0]; y = HT[k][1]; w = k < 2 ? 0.30 : 0.42;
      box(B.paint, x - w, x + w, y - 0.36, y + 0.36, ROOF - 0.01, ROOF + 0.035);
      box(B.dark, x - w + 0.03, x + w - 0.03, y - 0.33, y + 0.33, ROOF + 0.035, ROOF + 0.043);
      box(B.paint, x - w + 0.05, x + w - 0.05, y - 0.31, y + 0.31, ROOF + 0.043, ROOF + 0.06);
      box(B.dark, x - w + 0.08, x - w + 0.20, y + (y > 0 ? -0.36 : 0.30), y + (y > 0 ? -0.30 : 0.36), ROOF + 0.03, ROOF + 0.08);
    }
    box(B.team, -2.30, -2.05, -1.00, -0.12, ROOF + 0.02, ROOF + 0.032);
    box(B.team, -2.30, -2.05, 0.12, 1.00, ROOF + 0.02, ROOF + 0.032);

    if (V.tube) {   /* stowed snorkel tube along the port deck edge on its brackets (P2, P3, P7) */
      cylX(B.paint, -2.55, 0.05, 1.18, ROOF + 0.14, 0.11, 0.11, 14);
      cylX(B.dark, 0.05, 0.09, 1.18, ROOF + 0.14, 0.10, 0.08, 14);
      for (k = 0; k < 3; k++) {
        x = [-2.25, -1.10, -0.20][k];
        box(B.dark, x - 0.04, x + 0.04, 1.06, 1.30, ROOF, ROOF + 0.06);
        box(B.dark, x - 0.025, x + 0.025, 1.05, 1.31, ROOF + 0.06, ROOF + 0.16);
      }
    }

    for (s = -1; s <= 1; s += 2) {
      w = pwl(WS, 0);
      /* firing-port covers and a periscope housing on the upper side (D1 squares) */
      for (k = 0; k < 3; k++) {
        x = [-0.95, -0.40, 1.40][k];
        box(B.paint, x - 0.11, x + 0.11, s * w - 0.01, s * (w + 0.025), 1.40, 1.58);
        box(B.dark, x - 0.04, x + 0.04, s * (w + 0.02), s * (w + 0.035), 1.45, 1.53);
      }
      /* the rounded skirt section, its rubber-jointed segments and the front mudguard (P4, P9) */
      R = [];
      R.push(skirtRing(-3.55, s, -0.26, 0.6, 0), skirtRing(-3.52, s, -0.20, 0.85, 0), skirtRing(-3.45, s, -0.09, 0.97, 0), skirtRing(-3.30, s, 0, 1, 0),
             skirtRing(2.40, s, 0, 1, 0), skirtRing(2.66, s, -0.07, 1, 0), skirtRing(2.88, s, -0.21, 0.98, 0), skirtRing(3.02, s, -0.38, 0.92, 0),
             skirtRing(3.07, s, -0.46, 0.7, 0));
      loftN(B.paint, R);
      for (x = -3.06; x < 2.40; x += 0.34) loftN(B.dark, [skirtRing(x, s, 0, 1, 0.008), skirtRing(x + 0.022, s, 0, 1, 0.008)]);
      /* tracks, sprocket, idler, rollers */
      addTrack(B, s);
    }
    /* starboard rear vent: a frame with five louvred cells (D1, P4, P9) */
    w = pwl(WS, -2.5);
    box(B.paint, -3.36, -1.96, -(w + 0.02), -(w - 0.01), 1.28, 1.56);
    for (k = 0; k < 5; k++) {
      x = -3.31 + k * 0.27;
      box(B.dark, x, x + 0.22, -(w + 0.03), -(w + 0.02), 1.33, 1.51);
      box(B.paint, x, x + 0.22, -(w + 0.045), -(w + 0.03), 1.41, 1.43);
    }

    /* stern (P9): two tall doors with hinges and handles, steps beneath, the water-jet outlets
       low at the corners, tow hooks */
    box(B.dark, -3.585, -3.565, -0.92, 0.92, 0.66, 1.70);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.60, -3.57, s > 0 ? 0.04 : -0.88, s > 0 ? 0.88 : -0.04, 0.68, 1.68);
      box(B.paint, -3.615, -3.60, s * 0.30 - 0.20, s * 0.30 + 0.20, 1.18, 1.52);
      for (k = 0; k < 2; k++) box(B.dark, -3.625, -3.595, s * 0.90 - 0.04, s * 0.90 + 0.04, 0.85 + k * 0.55, 0.97 + k * 0.55);
      box(B.dark, -3.63, -3.60, s * 0.12 - 0.02, s * 0.12 + 0.02, 1.02, 1.24);
      belt(B.dark, -3.58, 0.58, -3.67, 0.50, s * 0.25, s * 0.80, 0.03);
      belt(B.dark, -3.60, 0.45, -3.62, 0.58, s * 0.25, s * 0.27, 0.03);
      belt(B.dark, -3.60, 0.45, -3.62, 0.58, s * 0.78, s * 0.80, 0.03);
      cylX(B.dark, -3.62, -3.57, s * 1.05, 0.66, 0.12, 0.12, 14);
      cylX(B.dark, -3.625, -3.615, s * 1.05, 0.66, 0.09, 0.09, 12);
      cylX(B.dark, -3.62, -3.57, s * 0.62, 0.60, 0.04, 0.04, 8);
    }
    box(B.dark, -3.60, -3.57, -0.92, 0.92, 1.70, 1.74);
  }

  /* ------------------------------------------------------- running gear */
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  var _loop = null;
  function trackLoop() {
    if (_loop) return _loop;
    var C = [], i, k, pts = [], n, a, b, l, segs = [], tot = 0;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.03]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.04]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts); n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    _loop = { segs: segs, tot: tot };
    return _loop;
  }
  function addTrack(B, s) {
    var L = trackLoop(), segs = L.segs, n = segs.length, cnt = Math.round(L.tot / 0.15), step = L.tot / cnt;
    var y = s * TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      if (pz > 0.78 && px > -2.9 && px < 2.45) continue;          /* the top run under the skirt */
      belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.005, y + TW + 0.005, 0.07);
    }
    /* sprocket at the rear with teeth and six lightening holes (P9), idler at the bow, rollers */
    cylY(B.dark, SPR.x, y - 0.17, y + 0.17, SPR.z, SPR.r - 0.02, 18);
    for (k = 0; k < 13; k++) {
      t = k / 13 * TAU;
      slab(B.dark, [SPR.x + Math.cos(t) * SPR.r, y, SPR.z + Math.sin(t) * SPR.r], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.035, 0.12, 0.03);
    }
    cylY(B.paint, SPR.x, y + s * 0.16, y + s * 0.20, SPR.z, 0.24, 16);
    cylY(B.dark, SPR.x, y + s * 0.20, y + s * 0.215, SPR.z, 0.08, 10);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU; cylY(B.dark, SPR.x + Math.cos(t) * 0.155, y + s * 0.19, y + s * 0.205, SPR.z + Math.sin(t) * 0.155, 0.045, 8); }
    cylY(B.dark, IDL.x, y - 0.17, y + 0.17, IDL.z, IDL.r, 16);
    cylY(B.paint, IDL.x, y + s * 0.15, y + s * 0.20, IDL.z, 0.14, 12);
    for (k = 0; k < XR.length; k++) cylY(B.dark, XR[k], y - 0.12, y + 0.12, ZR, RR, 10);
    /* suspension arms between the wheels and the hull (P4, P7) */
    for (k = 0; k < XW.length; k++) slab(B.dark, [XW[k] + 0.20, s * (TY - 0.26), ZW + 0.22], unit([0.55, 0, 0.84]), [0, 1, 0], unit([-0.84, 0, 0.55]), 0.22, 0.04, 0.045);
  }

  /* road wheel (P4, P7, P9): twin dished discs, thin dark tyre, hub cap and a ring of bolts */
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.16, y - 0.09, 0, RW, 20);
      cylY(W, 0, y + 0.09, y + 0.16, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.09, y + 0.09, 0, RW - 0.04, 18);
      cyl(W, [0, y + s * 0.16, 0], [0, y + s * 0.175, 0], RW - 0.03, 0.14, 18);
      cylY(W, 0, y + s * 0.17, y + s * 0.195, 0, 0.10, 12);
      W.col = NUT;
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; cylY(W, Math.cos(a) * 0.075, y + s * 0.19, y + s * 0.205, Math.sin(a) * 0.075, 0.016, 6); }
      cylY(W, 0, y + s * 0.195, y + s * 0.21, 0, 0.04, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* plan half outlines (x, y) from the ring centre, front to rear, measured off D1 (length
     1.8 m; roof 0.46 m over the hull roof, D1 and P7) with the width from P5 and P6; sloped faceted sides */
  var TPL = [
    { z: -0.03, H: [[0.86, 0.34], [0.72, 0.66], [0.40, 0.97], [-0.55, 0.99], [-0.84, 0.76], [-0.90, 0.36]] },
    { z: 0.24, H: [[0.80, 0.34], [0.66, 0.64], [0.36, 0.93], [-0.55, 0.95], [-0.84, 0.74], [-0.90, 0.35]] },
    { z: 0.46, H: [[0.50, 0.28], [0.40, 0.48], [0.18, 0.72], [-0.52, 0.74], [-0.72, 0.58], [-0.76, 0.28]] }
  ];
  var GZ = 0.23;                                             /* gun axis 2.01 m over the ground (D1) */
  function addTurret(V, B) {
    var R = [], i, s, q, x;
    for (i = 0; i < TPL.length; i++) R.push(ringAt(TPL[i].H, TPL[i].z));
    loftN(B.paint, R);
    /* gun mount: the wide mantlet block in the front, with its armoured face (P2, P5, P6) */
    box(B.paint, 0.70, 1.02, -0.44, 0.40, 0.03, 0.40);
    belt(B.paint, 1.02, 0.05, 1.10, 0.37, -0.40, 0.36, 0.06);
    /* 100 mm 2A70: thick jacket, barrel, mid collar, muzzle (P2, P9) */
    cylX(B.dark, 1.08, 1.62, 0.04, GZ, 0.105, 0.095, 16);
    cylX(B.dark, 1.62, 3.47, 0.04, GZ, 0.064, 0.056, 14);
    cylX(B.dark, 2.20, 2.40, 0.04, GZ, 0.074, 0.074, 14);
    cylX(B.dark, 3.32, 3.47, 0.04, GZ, 0.066, 0.066, 14);
    /* 30 mm 2A72 alongside to starboard, its slotted muzzle; the coaxial PKT to port */
    cylX(B.dark, 1.08, 1.40, -0.25, GZ - 0.02, 0.055, 0.045, 12);
    cylX(B.dark, 1.40, 2.80, -0.25, GZ - 0.02, 0.028, 0.026, 10);
    cylX(B.dark, 2.80, 2.97, -0.25, GZ - 0.02, 0.040, 0.040, 10);
    cylX(B.dark, 1.08, 1.45, 0.30, GZ - 0.05, 0.018, 0.016, 8);
    /* gunner's sight on the port front of the roof: box and the round drum head (P3, P5, P7) */
    box(B.paint, 0.00, 0.36, 0.30, 0.62, 0.44, 0.58);
    cylZ(B.paint, 0.16, 0.46, 0.58, 0.66, 0.08, 10);
    cylX(B.paint, 0.02, 0.32, 0.46, 0.76, 0.13, 0.13, 16);
    cylX(B.glass, 0.32, 0.33, 0.46, 0.76, 0.10, 0.10, 14);
    /* commander's sight to starboard: post and round head (P5, P7) */
    cylZ(B.paint, 0.02, -0.40, 0.44, 0.58, 0.11, 12);
    cylZ(B.paint, 0.02, -0.40, 0.58, 0.70, 0.085, 12);
    box(B.glass, 0.09, 0.10, -0.46, -0.34, 0.60, 0.67);
    /* hatches: gunner's to port, commander's to starboard (P7 crew positions) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.paint, -0.38, s * 0.40, 0.42, 0.52, 0.25, 18);
      cylZ(B.dark, -0.38, s * 0.40, 0.52, 0.535, 0.21, 16);
      box(B.dark, -0.66, -0.58, s * 0.40 - 0.10, s * 0.40 + 0.10, 0.50, 0.56);
      /* 902V smoke tubes: three a side on the front cheek, raked forward and up (P3, P5, P7) */
      box(B.paint, 0.18, 0.62, s * 0.86 - 0.05, s * 0.86 + 0.05, 0.26, 0.34);
      for (q = 0; q < 3; q++) {
        x = 0.22 + q * 0.15;
        cyl(B.dark, [x, s * 0.86, 0.32], [x + 0.13, s * 0.90, 0.50], 0.042, 0.042, 10);
        cyl(B.paint, [x + 0.13, s * 0.90, 0.50], [x + 0.135, s * 0.901, 0.51], 0.046, 0.046, 10);
      }
    }
    /* rear: aerial base and whip at the starboard rear corner (P3, P7), a stowage rail */
    cylZ(B.dark, -0.62, -0.50, 0.44, 0.54, 0.045, 8);
    cylZ(B.dark, -0.62, -0.50, 0.54, 1.56, 0.009, 6);
    box(B.dark, -0.94, -0.88, -0.60, 0.60, 0.12, 0.17);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.C, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T, V), TB = bins(T, V), i, wg, WB;
    addHull(HB, V);
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
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, ROOF);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention): hull 7.14 m published; the
   steps behind the doors and the 100 mm muzzle just ahead of the bow add to it */
UNIT_MODELS["pact_e90_ifv"] = {
  len: 7.30,
  build: function (THREE, M, C) { return HeroBMP3.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e00_ifv"] = {
  len: 7.30,
  build: function (THREE, M, C) { return HeroBMP3.build(THREE, M, C, "B"); }
};
UNIT_MODELS["ifv_p"] = {
  len: 7.30,
  build: function (THREE, M, C) { return HeroBMP3.build(THREE, M, C, "C"); }
};
