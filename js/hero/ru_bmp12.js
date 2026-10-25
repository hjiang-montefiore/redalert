/* ============ ru_bmp12.js - HERO models: the BMP-1 and BMP-2 infantry fighting vehicles ============
   Two rows, one hull (Object 765 / Object 675), two turrets:
     pact_e60_ifv   BMP-1 (1966)  one-man cone turret, 73 mm 2A28 Grom low-pressure smoothbore, the
                                  9M14 Malyutka on its rail over the gun; commander's cupola with the
                                  OU-3GA2 searchlight behind the driver; four roof hatches; no smoke
                                  launchers (they came with the later BMP-1P)
     pact_e80_ifv   BMP-2 (1980)  two-man welded turret, 30 mm 2A42 with the FG-126 lamp beside it,
                                  the 9P135M launcher for Konkurs / Fagot on the turret roof, the
                                  OU-3GA2 on the commander's (right) position, three 902V smoke tubes
                                  each side of the turret rear; two roof hatches; ribbed side bins

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960, cached in
   scratchpad/q_bmp12_ref:
     D1  "BMP1graphic1.gif" - BMP-1 side, front and 3/4 line drawing (bow left): hull profile, the
         long shallow glacis, road-wheel spacing, front sprocket and raised rear idler, turret
         position and length, the whip aerial at the rear of the roof. Scaled to the 6.735 m hull;
         its vertical scale runs about 9 per cent tall, so heights are taken from the published
         figures (ru.wikipedia) and the drawing's ratios.
     D2  "BMP21981graphic1.gif" - BMP-2 side, front, 3/4 (bow left): the bigger turret further
         back, gun reaching about 3 m ahead of the ring, ribbed side bins.
     P1  "Soviet BMP-1 Infantry Fighting Vehicle (28073857593).jpg" - port rear 3/4: rear doors,
         inward-raked upper side with its round firing ports, the long flat side panel.
     P2  "Soviet BMP-1 Infantry Fighting Vehicle (28073859403).jpg" - stern: the two door fuel
         tanks, the Malyutka on its rail, the idler.
     P3  "BMP-1, Bovington Tank Museum 2.jpg" - head on: the folded trim vane on the front of the
         glacis, the ribbed glacis panel behind it, the steep lower glacis, the headlamp in its
         guard at each front corner, the OU-3GA2 on the commander's cupola left of the turret.
     P4  "BMP-1 01.JPG" - port front 3/4: the trim vane, ribs, the big curved front mudguard over
         the front sprocket, six ribbed road wheels, three return rollers, turret and missile.
     Q1  "BMP-2 NVA.JPG" - East German BMP-2 (delivered 1986-87), starboard front 3/4: the
         turret, the 2A42, the FG-126 lamp right of the gun, the OU-3GA2 high on the commander's
         position, the bare 9P135M bracket, three smoke tubes at the turret rear raked forward,
         the aerial at the turret rear, the ribbed side bins, mudguard, glacis.
     Q2  "Ukrainian BMP-2 turret.jpg", Q3 "BMP-2 military parade rehearsal.jpg" - turret roof
         layout and the gun from the other side (paint not used: Q3 is the later camouflage).
   Published figures (ru.wikipedia): BMP-1 6.735 m long, 2.94 m wide, 1.924 m to the turret roof,
   2.068 m to the sight's armoured cap, wheel base 3.66 m, track centres 2.55 m, 300 mm track,
   0.37 m clearance. BMP-2 6.735 x 3.15 m, 2.25 m to the sights, 2.45 m to the searchlight,
   base 3.60 m, clearance 0.42 m. en.wikipedia: four firing ports a side on the BMP-1, three on
   the BMP-2's troop compartment plus one for the man behind the driver; BMP-2 two roof hatches
   instead of four; commander right, gunner left in the BMP-2 turret.

   CORRECTIONS against the previous model: the hull roof stood at 1.38 m (turret roof 1.78 m
   against the published 1.924 m): now 1.50 m and 1.924 m; the upper hull sides now rake inward
   from a knuckle at 1.22 m over a tall flat side panel (P1, P3, Q1), the old box sides did not; the bow is a long shallow
   glacis (knee at x 1.55) to a nose at 1.12 m over a steep lower glacis (D1, P3, P4); the trim vane lies
   on the front of the glacis (P3, P4); the front mudguard is the big curved cover over the
   sprocket (P4, Q1); the commander's cupola carries its OU-3GA2 lamp (P3, en.wikipedia); the
   BMP-2 has two roof hatches (en.wikipedia), its own firing-port count, the FG-126 lamp and the
   OU-3GA2 (Q1); the rear doors are the bulged fuel tanks (P1, P2).

   Recognition list (what makes it read at game zoom, and its source):
     1. very low hull, long shallow ribbed glacis to a sharp nose, steep lower glacis - D1, P3, P4
     2. folded trim vane across the front of the glacis - P3, P4, Q1
     3. upper hull sides raked inward over a flat vertical side panel - P1, P3, Q1
     4. six road wheels with radial ribs, three return rollers, front sprocket high under
        the big curved mudguard, raised rear idler - D1, P4, Q1
     5. BMP-1: small low cone turret near mid-length, short thick 73 mm, the Malyutka on its
        rail over the gun - D1, P2, P4
     6. BMP-1: commander's cupola with the round OU-3GA2 lamp behind the driver - P3
     7. BMP-2: larger faceted turret, long thin 30 mm barrel - D2, Q1
     8. BMP-2: 9P135M launcher on the roof, OU-3GA2 high on the right, smoke tubes each side
        of the turret rear raked forward - Q1, Q2
     9. BMP-2: ribbed horizontal side bins along the whole side - D2, Q1, Q3
    10. two tall bulged rear doors (fuel tanks) - P1, P2
    11. round firing ports with periscopes along the upper side - P1, en.wikipedia
    12. headlamps in guards at the front corners - P3, Q1
   Paint (sampled, then taken to about 0.85 of level for the ACES pass): P2's door #566857 is
   blue-cast by an overcast forest, Q1 is East German paint; drawn as the Soviet protective
   green of the T-62 redo family, #4e5a3c (1960s) and #4b563a (1980s). No numbers, roundels,
   flags or parade stripes (Q1 and Q3 carry them, not drawn).
   NOT CONFIRMED, drawn plain or left off: the exact firing-port x stations (spacing from P1,
   perspective-corrected by eye); the BMP-1 whip aerial position (D1 shows it at the rear of the
   roof, drawn on the right); the BMP-2 aerial side (Q1 shows it at the turret rear, drawn to
   the right); hatch outlines on the roof (drawn as plain lids); the Konkurs tube on the
   launcher (Q1 shows the bare bracket; a container is drawn as in service photographs); the
   Malyutka loading hatch; stowage boxes on the side panels (drawn as plain lids, D1).
   Triangles 16,408 (BMP-1) / 16,716 (BMP-2); 14 draw calls (hull 4, turret 4, six wheels); 5 materials.
   X extent 6.755 m both (hull 6.735 m published; the door filler caps add 2 cm); W 2.95 / 3.18 m.
   Materials: PAINT (canvas texture, metre UVs: base, mottling, plate seams, bolt rows, grime),
   DARK (track, fittings, guns), GLASS, WHEEL (vertex colours), and the team colour exactly as
   handed in (C.team) on two 0.14 x 0.8 m strips on the rear roof and the gunner's hatch lid.  Nodes: "turret" (ring centre
   on the roof, gun along +X at rest) and six "roadwheel" groups (axle on local Y, both sides in
   one mesh).  Model space +X bow, +Y left (port), +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBMP12 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { bmp2: false, paint: { base: "#4e5a3c", seed: 1966, us: 0.34 }, tx: -0.48, sw: 1.455 },   /* BMP-1 */
    B: { bmp2: true, paint: { base: "#4b563a", seed: 1980, us: 0.34 }, tx: -0.60, sw: 1.575 }     /* BMP-2 */
  };

  /* running gear (D1; base 3.66 m, ru.wikipedia): six wheels at 0.732 m, front sprocket, rear idler */
  var XW = [1.65, 0.918, 0.186, -0.546, -1.278, -2.01], ZW = 0.365, RW = 0.315;
  var TY = 1.275, TW = 0.15;                                 /* 2.55 m track centres, 300 mm track */
  var SPR = { x: 2.30, z: 0.56, r: 0.26 }, IDL = { x: -2.74, z: 0.50, r: 0.27 };
  var XR = [1.28, -0.18, -1.64], ZR = 0.73, RR = 0.06;     /* return rollers */
  var ROOF = 1.50, ZS = 0.87, ZK = 1.22, ZP = 0.74, XST = -3.25;   /* ZP: lower edge of the side panel */        /* roof, sponson underside, knuckle, stern plate */

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
  function ringAt(H, z, dx) {
    var Q = [], i;
    dx = dx || 0;
    for (i = 0; i < H.length; i++) Q.push([H[i][0] + dx, H[i][1], z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0] + dx, -H[i][1], z]);
    return Q;
  }
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
  }
  /* a rounded rectangle ring in the y-z plane at x: centre (yc, zc), half sizes hy, hz, corner r */
  function rrect(x, yc, zc, hy, hz, r, n) {
    var Q = [], k, i, a, cx, cz, C = [[hy - r, hz - r], [-(hy - r), hz - r], [-(hy - r), -(hz - r)], [hy - r, -(hz - r)]];
    for (k = 0; k < 4; k++) for (i = 0; i <= n; i++) {
      a = (k + i / n) * TAU / 4; cx = C[k][0]; cz = C[k][1];
      Q.push([x, yc + cx + Math.cos(a) * r, zc + cz + Math.sin(a) * r]);
    }
    return Q;
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
  function blob(q, S, R, cx, cy, rx, ry, col) {
    var k, n = 9, pts = [], a, r, ox, oy;
    for (k = 0; k < n; k++) { a = k / n * TAU; r = 0.65 + R() * 0.5; pts.push([Math.cos(a) * rx * r, Math.sin(a) * ry * r]); }
    q.fillStyle = col;
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      q.beginPath();
      for (k = 0; k < n; k++) q[k ? "lineTo" : "moveTo"](cx + ox + pts[k][0], cy + oy + pts[k][1]);
      q.closePath(); q.fill();
    }
  }
  /* Soviet protective green, one tile 1 / 0.34 = 2.9 m: soft mottling of the brushed paint, plate
     seams with bolt rows (the welded aluminium-steel hull, P1, P4, Q1), rain streaks and grime */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "bmp12" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 26; i++) { q.globalAlpha = 0.16 + R() * 0.18; blob(q, S, R, R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, i % 2 ? "#414b31" : "#5d6a48"); }
      q.globalAlpha = 1;
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.40)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
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
  /* side profile (D1, bow left, 0.0214 m a pixel; heights from the published figures): roof flat
     at 1.50 to the glacis knee at x 1.15, the long shallow glacis (about 12 deg) to the nose at
     1.01 m; the lower glacis falls at about 34 deg to the belly at 0.38 m (0.37 m clearance); the
     stern plate stands at x -3.25 with the door tanks proud of it */
  var TOP = [[XST, 1.46], [XST + 0.04, 1.50], [1.55, 1.50], [3.27, 1.14], [3.37, 1.12]];
  var UB = [[XST, ZS], [3.10, ZS], [3.37, 1.095]];
  /* plan half widths (P3, Q1): side panel 1.44, narrowing to the 2.56 m nose; roof edge 1.05 */
  var WSD = [[XST, 1.41], [XST + 0.04, 1.44], [2.30, 1.44], [3.37, 1.28]];
  var WRD = [[XST, 1.05], [XST + 0.04, 1.08], [1.55, 1.08], [3.37, 1.22]];
  var UXS = [XST, XST + 0.04, -2.5, -1.0, 0.5, 1.15, 1.55, 2.1, 2.3, 2.6, 2.9, 3.1, 3.2, 3.28, 3.37];
  function upperRing(x) {
    var zt = pwl(TOP, x), zb = pwl(UB, x), ws = pwl(WSD, x), wr = Math.min(pwl(WRD, x), ws - 0.02);
    var zk = Math.max(zb + 0.006, Math.min(ZK, zt - 0.07));
    return [[x, ws, zb], [x, ws, zk], [x, wr, zt], [x, -wr, zt], [x, -ws, zk], [x, -ws, zb]];
  }
  /* the inward-raked upper side (P1, P3): point on it at height z, and its outward normal */
  function sideY(x, z) {
    var ws = pwl(WSD, x), wr = Math.min(pwl(WRD, x), ws - 0.02), zt = pwl(TOP, x), zk = Math.min(ZK, zt - 0.07);
    return ws + (wr - ws) * (z - zk) / (zt - zk);
  }
  var BOT = [[XST, 0.62], [XST + 0.07, 0.46], [XST + 0.20, 0.38], [2.45, 0.38], [3.26, 1.00]];
  var LXS = [XST, XST + 0.07, XST + 0.20, 2.45, 2.85, 3.26];
  function lowerRing(x) {
    var zb = pwl(BOT, x), w = 1.10, zt = Math.max(ZS + 0.03, zb + 0.08);
    return [[x, w - 0.05, zb], [x, w, zb + 0.05], [x, w, zt], [x, -w, zt], [x, -w, zb + 0.05], [x, -(w - 0.05), zb]];
  }
  function glacisPt(x, y, lift) { return [x, y, pwl(TOP, x) + (lift || 0)]; }
  var GN = unit([0.2093, 0, 1]);                                /* glacis outward normal */
  var GU = unit([1, 0, -0.2093]);                               /* down the glacis */

  function addHull(B, V) {
    var R = [], i, k, s, x, y, z, w, n, c;
    for (i = 0; i < UXS.length; i++) R.push(upperRing(UXS[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < LXS.length; i++) R.push(lowerRing(LXS[i]));
    loftN(B.paint, R);

    /* the ribbed glacis panel (P3: about ten transverse ribs on a raised panel) and the folded
       trim vane lying on the front of the glacis, its lip at the nose (P3, P4, Q1) */
    c = glacisPt(2.08, 0, 0.012);
    slab(B.paint, c, GU, [0, 1, 0], GN, 0.52, 0.86, 0.014);
    for (k = 0; k < 10; k++) {
      x = 1.62 + k * 0.10;
      slab(B.paint, glacisPt(x, 0, 0.045), GU, [0, 1, 0], GN, 0.022, 0.84, 0.022);
    }
    slab(B.paint, glacisPt(2.95, 0, 0.035), GU, [0, 1, 0], GN, 0.38, 1.12, 0.018);
    slab(B.paint, glacisPt(3.31, 0, 0.05), GU, [0, 1, 0], GN, 0.045, 1.13, 0.03);
    slab(B.dark, glacisPt(2.585, 0, 0.05), GU, [0, 1, 0], GN, 0.03, 1.05, 0.02);
    for (s = -1; s <= 1; s += 2) {
      slab(B.dark, glacisPt(2.62, s * 0.60, 0.07), GU, [0, 1, 0], GN, 0.06, 0.07, 0.04);   /* vane hinges */
      /* headlamp group in its guard at each front corner (P3, Q1) */
      z = pwl(TOP, 3.00);
      box(B.dark, 2.92, 3.08, s * 1.06 - 0.08, s * 1.06 + 0.08, z, z + 0.05);
      cylX(B.dark, 2.95, 3.07, s * 1.06, z + 0.13, 0.065, 0.07, 12);
      cylX(B.glass, 3.07, 3.08, s * 1.06, z + 0.13, 0.058, 0.058, 12);
      belt(B.dark, 2.93, z, 2.93, z + 0.23, s * 1.06 - 0.11, s * 1.06 - 0.09, 0.02);
      belt(B.dark, 2.93, z, 2.93, z + 0.23, s * 1.06 + 0.09, s * 1.06 + 0.11, 0.02);
      belt(B.dark, 2.93, z + 0.22, 3.12, z + 0.20, s * 1.06 - 0.11, s * 1.06 + 0.11, 0.02);
      /* tow hooks under the nose */
      cylX(B.dark, 3.14, 3.30, s * 0.45, 0.86, 0.045, 0.045, 8);
      cylY(B.dark, 3.27, s * 0.40, s * 0.50, 0.86, 0.06, 8);
    }

    /* driver's hatch front left at the glacis knee, three periscopes ahead of it */
    cylZ(B.paint, 1.28, 0.55, ROOF - 0.02, ROOF + 0.07, 0.26, 18);
    cylZ(B.dark, 1.28, 0.55, ROOF + 0.07, ROOF + 0.085, 0.22, 16);
    box(B.paint, 1.54, 1.70, 0.30, 0.80, pwl(TOP, 1.62) - 0.03, pwl(TOP, 1.62) + 0.08);
    for (k = -1; k <= 1; k++) box(B.glass, 1.70, 1.715, 0.55 + k * 0.16 - 0.06, 0.55 + k * 0.16 + 0.06, pwl(TOP, 1.70) + 0.0, pwl(TOP, 1.70) + 0.06);
    /* behind him: the BMP-1 commander's cupola with the OU-3GA2 lamp on its front (P3), on the
       BMP-2 the plain hatch of the man behind the driver (en.wikipedia) */
    if (!V.bmp2) {
      cylZ(B.paint, 0.72, 0.55, ROOF - 0.02, ROOF + 0.12, 0.29, 18);
      cylZ(B.paint, 0.72, 0.55, ROOF + 0.12, ROOF + 0.17, 0.24, 18);
      cylZ(B.dark, 0.72, 0.55, ROOF + 0.17, ROOF + 0.185, 0.20, 14);
      for (k = 0; k < 2; k++) box(B.glass, 0.90, 0.96, 0.55 + (k ? 0.12 : -0.12) - 0.05, 0.55 + (k ? 0.12 : -0.12) + 0.05, ROOF + 0.06, ROOF + 0.11);
      box(B.dark, 0.92, 1.04, 0.49, 0.61, ROOF + 0.12, ROOF + 0.20);
      cylX(B.dark, 0.90, 1.14, 0.55, ROOF + 0.31, 0.12, 0.125, 14);
      cylX(B.glass, 1.14, 1.15, 0.55, ROOF + 0.31, 0.10, 0.10, 14);
    } else {
      cylZ(B.paint, 0.72, 0.55, ROOF - 0.02, ROOF + 0.07, 0.25, 18);
      cylZ(B.dark, 0.72, 0.55, ROOF + 0.07, ROOF + 0.085, 0.21, 16);
      box(B.glass, 0.94, 1.00, 0.50, 0.60, ROOF + 0.0, ROOF + 0.06);
    }
    /* engine air louvres on the roof front right, ahead of the turret */
    box(B.dark, 0.62, 1.40, -0.98, -0.22, ROOF - 0.01, ROOF + 0.012);
    for (k = 0; k < 8; k++) box(B.paint, 0.67 + k * 0.095, 0.71 + k * 0.095, -0.96, -0.24, ROOF + 0.012, ROOF + 0.03);

    /* troop roof hatches: four on the BMP-1, two long ones on the BMP-2 (en.wikipedia) */
    var HT = V.bmp2 ? [[-2.25, 0.62]] : [[-1.80, 0.40], [-2.70, 0.40]];
    for (k = 0; k < HT.length; k++) for (s = -1; s <= 1; s += 2) {
      x = HT[k][0]; w = HT[k][1]; y = s * 0.50;
      box(B.paint, x - w, x + w, y - 0.30, y + 0.30, ROOF - 0.01, ROOF + 0.035);
      box(B.dark, x - w + 0.03, x + w - 0.03, y - 0.27, y + 0.27, ROOF + 0.035, ROOF + 0.043);
      box(B.paint, x - w + 0.05, x + w - 0.05, y - 0.25, y + 0.25, ROOF + 0.043, ROOF + 0.058);
      box(B.dark, x - 0.10, x + 0.10, y + (s > 0 ? -0.31 : 0.25), y + (s > 0 ? -0.25 : 0.31), ROOF + 0.03, ROOF + 0.08);
    }
    box(B.team, -3.20, -3.06, -0.92, -0.12, ROOF + 0.003, ROOF + 0.016);
    box(B.team, -3.20, -3.06, 0.12, 0.92, ROOF + 0.003, ROOF + 0.016);
    if (!V.bmp2) {   /* whip aerial at the rear of the roof (D1), base and rod */
      cylZ(B.dark, -2.98, -0.86, ROOF, ROOF + 0.10, 0.045, 8);
      cylZ(B.dark, -2.98, -0.86, ROOF + 0.10, ROOF + 1.10, 0.009, 6);
    }

    for (s = -1; s <= 1; s += 2) {
      /* firing ports in ball mounts on the raked side with a periscope above each (P1; BMP-1 four a
         side, BMP-2 three on the troop compartment and one behind the driver on the left) */
      var PX = V.bmp2 ? (s > 0 ? [-1.80, -2.42, -3.02, 0.40] : [-1.80, -2.42, -3.02]) : [-1.22, -1.85, -2.40, -2.95];
      n = unit([0, s * 0.28, 0.36]);
      for (k = 0; k < PX.length; k++) {
        x = PX[k]; z = 1.36; y = s * sideY(x, z);
        cyl(B.paint, [x, y - n[1] * 0.02, z - n[2] * 0.02], [x, y + n[1] * 0.035, z + n[2] * 0.035], 0.10, 0.09, 12);
        cyl(B.dark, [x, y + n[1] * 0.03, z + n[2] * 0.03], [x, y + n[1] * 0.05, z + n[2] * 0.05], 0.05, 0.045, 10);
        y = s * sideY(x, 1.47);
        box(B.paint, x - 0.08, x + 0.08, Math.min(y, y + s * 0.07), Math.max(y, y + s * 0.07), 1.45, 1.53);
        box(B.glass, x - 0.06, x + 0.06, s > 0 ? y + 0.07 : y - 0.075, s > 0 ? y + 0.075 : y - 0.07, 1.465, 1.515);
      }
      /* the flat side panel: a top lip, plate joints and stowage lids (P1, P4, D1) */
      w = 1.44;
      box(B.paint, XST + 0.05, 2.25, s > 0 ? w - 0.01 : -w - 0.025, s > 0 ? w + 0.025 : -w + 0.01, ZK - 0.03, ZK);
      box(B.paint, XST + 0.04, 2.02, s > 0 ? w - 0.02 : -w, s > 0 ? w : -w + 0.02, ZP, ZS + 0.01);
      box(B.dark, XST + 0.04, 2.02, s > 0 ? w - 0.025 : -w - 0.004, s > 0 ? w + 0.004 : -w + 0.025, ZP, ZP + 0.025);
      if (V.bmp2) {
        /* the ribbed side bins (D2, Q1, Q3): four sections, three ribs each */
        var BX = [[XST + 0.06, -1.86], [-1.80, -0.36], [-0.30, 1.12], [1.18, 2.22]];
        for (k = 0; k < BX.length; k++) {
          box(B.paint, BX[k][0], BX[k][1], s > 0 ? w : -V.sw + 0.015, s > 0 ? V.sw - 0.015 : -w, ZP + 0.03, ZK - 0.02);
          for (i = 0; i < 4; i++) box(B.paint, BX[k][0] + 0.03, BX[k][1] - 0.03, s > 0 ? V.sw - 0.02 : -V.sw, s > 0 ? V.sw : -V.sw + 0.02, ZP + 0.09 + i * 0.09, ZP + 0.115 + i * 0.09);
          box(B.dark, BX[k][1] - 0.05, BX[k][1] - 0.01, s > 0 ? V.sw - 0.03 : -V.sw - 0.005, s > 0 ? V.sw + 0.005 : -V.sw + 0.03, ZP + 0.18, ZP + 0.26);
        }
      } else {
        var LX = [[XST + 0.10, -2.15], [-2.05, -0.75], [-0.65, 0.75], [0.85, 2.15]];
        for (k = 0; k < LX.length; k++) {
          box(B.paint, LX[k][0], LX[k][1], s > 0 ? w : -V.sw, s > 0 ? V.sw : -w, ZS + 0.06, ZK - 0.06);
          box(B.dark, LX[k][1] - 0.012, LX[k][1] + 0.012, s > 0 ? w : -V.sw - 0.004, s > 0 ? V.sw + 0.004 : -w, ZS + 0.06, ZK - 0.06);
          box(B.dark, (LX[k][0] + LX[k][1]) / 2 - 0.05, (LX[k][0] + LX[k][1]) / 2 + 0.05, s > 0 ? V.sw : -V.sw - 0.012, s > 0 ? V.sw + 0.012 : -V.sw, ZS + 0.13, ZS + 0.17);
        }
      }
      /* the big curved front mudguard over the sprocket (P4, Q1): a rounded shell and its cheek */
      var arc = [], a, ra = 0.60, yi = s * 1.12, yo = s * V.sw;
      R = [];
      for (k = 0; k <= 10; k++) {
        a = (96 - k * 9.8) * Math.PI / 180;
        var cx = SPR.x + Math.cos(a) * ra, cz = SPR.z + Math.sin(a) * ra, ox = Math.cos(a) * 0.035, oz = Math.sin(a) * 0.035;
        R.push([[cx, yi, cz], [cx + ox, yi, cz + oz], [cx + ox, yo, cz + oz], [cx, yo, cz]]);
        arc.push([cx, cz]);
      }
      loftN(B.paint, R);
      var cheek = [], cheek2 = [];
      for (k = 0; k < arc.length; k++) { cheek.push([arc[k][0], yo - s * 0.03, arc[k][1]]); cheek2.push([arc[k][0], yo, arc[k][1]]); }
      cheek.push([2.30, yo - s * 0.03, SPR.z - 0.03], [2.05, yo - s * 0.03, SPR.z + 0.12], [2.05, yo - s * 0.03, ZK - 0.06]);
      cheek2.push([2.30, yo, SPR.z - 0.03], [2.05, yo, SPR.z + 0.12], [2.05, yo, ZK - 0.06]);
      loftN(B.paint, [cheek, cheek2]);
      /* a bead round its edge */
      for (k = 0; k + 1 < arc.length; k++) cyl(B.paint, [arc[k][0], yo, arc[k][1]], [arc[k + 1][0], yo, arc[k + 1][1]], 0.016, 0.016, 5, true);
      /* rear mudflap behind the idler */
      belt(B.paint, XST + 0.02, ZS + 0.01, XST - 0.04, ZS - 0.20, s * 1.13, s * 1.43, 0.025);
      /* tracks, sprocket, idler, rollers */
      addTrack(B, s);
    }

    /* stern (P1, P2): the two tall doors are the fuel tanks: bulged, round-cornered shells with
       hinges on the outer edge, a handle and a filler cap each; the left door's firing port */
    box(B.dark, XST - 0.015, XST, -0.80, 0.80, 0.47, 1.47);
    for (s = -1; s <= 1; s += 2) {
      R = [rrect(XST - 0.01, s * 0.405, 0.97, 0.365, 0.48, 0.10, 3), rrect(XST - 0.07, s * 0.405, 0.97, 0.355, 0.47, 0.12, 3), rrect(XST - 0.12, s * 0.405, 0.97, 0.30, 0.42, 0.15, 3)];
      loftN(B.paint, R);
      slab(B.paint, [XST - 0.115, s * 0.405, 0.97], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.012, 0.012, 0.38);
      for (k = 0; k < 2; k++) box(B.dark, XST - 0.06, XST - 0.01, s * 0.79 - 0.04, s * 0.79 + 0.04, 0.66 + k * 0.56, 0.80 + k * 0.56);
      box(B.dark, XST - 0.135, XST - 0.11, s * 0.16 - 0.02, s * 0.16 + 0.02, 0.88, 1.10);
      cylX(B.dark, XST - 0.135, XST - 0.10, s * 0.52, 1.25, 0.05, 0.05, 10);
      /* tail lamp and tow hook at the corners */
      box(B.dark, XST - 0.06, XST, s * 1.15 - 0.07, s * 1.15 + 0.07, 1.30, 1.40);
      cylX(B.dark, XST - 0.12, XST, s * 0.90, 0.58, 0.04, 0.04, 8);
    }
    cylX(B.dark, XST - 0.135, XST - 0.11, 0.30, 0.86, 0.045, 0.045, 10);
  }

  /* ------------------------------------------------------- running gear */
  function hull2(P) {
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
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.03]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.035]);
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
    var L = trackLoop(), segs = L.segs, n = segs.length, cnt = Math.round(L.tot / 0.14), step = L.tot / cnt;
    var y = s * TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.045);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      if (pz > 0.70 && px > -2.6 && px < 2.0) continue;          /* the top run under the side panel */
      belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - TW - 0.005, y + TW + 0.005, 0.065);
    }
    /* front drive sprocket: hub disc and teeth (P4, Q1) */
    cylY(B.dark, SPR.x, y - 0.14, y + 0.14, SPR.z, SPR.r - 0.03, 16);
    for (k = 0; k < 14; k++) {
      t = k / 14 * TAU;
      slab(B.dark, [SPR.x + Math.cos(t) * (SPR.r - 0.01), y, SPR.z + Math.sin(t) * (SPR.r - 0.01)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.04, 0.10, 0.028);
    }
    cylY(B.paint, SPR.x, y + s * 0.13, y + s * 0.17, SPR.z, 0.17, 14);
    cylY(B.dark, SPR.x, y + s * 0.17, y + s * 0.19, SPR.z, 0.07, 10);
    /* rear idler: a spoked wheel (P2, D1) */
    cylY(B.dark, IDL.x, y - 0.14, y + 0.14, IDL.z, IDL.r, 18);
    cylY(B.paint, IDL.x, y + s * 0.13, y + s * 0.16, IDL.z, IDL.r - 0.05, 16);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU; cylY(B.dark, IDL.x + Math.cos(t) * 0.14, y + s * 0.155, y + s * 0.165, IDL.z + Math.sin(t) * 0.14, 0.055, 8); }
    cylY(B.dark, IDL.x, y + s * 0.16, y + s * 0.19, IDL.z, 0.06, 10);
    for (k = 0; k < XR.length; k++) cylY(B.dark, XR[k], y - 0.09, y + 0.09, ZR, RR, 10);
    /* torsion-bar arms between the wheels and the hull */
    for (k = 0; k < XW.length; k++) slab(B.dark, [XW[k] - 0.18, s * (TY - 0.22), ZW + 0.12], unit([1, 0, -0.45]), [0, 1, 0], unit([0.45, 0, 1]), 0.20, 0.035, 0.04);
  }

  /* road wheel (P4, Q1): twin dished discs with radial ribs on a rubber tyre, hub cap and nuts */
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.1, gg * 1.1, bb * 1.1];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y - 0.09, 0, RW, 20);
      cylY(W, 0, y + 0.09, y + 0.15, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.09, y + 0.09, 0, RW - 0.04, 18);
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.165, 0], RW - 0.035, 0.12, 18);
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        slab(W, [Math.cos(a) * 0.18, y + s * 0.158, Math.sin(a) * 0.18], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.08, 0.014, 0.016);
      }
      cylY(W, 0, y + s * 0.16, y + s * 0.185, 0, 0.09, 12);
      W.col = NUT;
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; cylY(W, Math.cos(a) * 0.065, y + s * 0.18, y + s * 0.195, Math.sin(a) * 0.065, 0.014, 6); }
      cylY(W, 0, y + s * 0.185, y + s * 0.20, 0, 0.035, 8);
    }
  }

  /* --------------------------------------------------------------- turrets */
  /* BMP-1: a low cast cone, base about 1.64 m across and the roof 0.42 m over the hull roof
     (1.924 m published), the roof circle set a little aft (D1 side, D1 front) */
  function ringC(r, z, cx, n) { var Q = [], k, a; for (k = 0; k < n; k++) { a = k / n * TAU; Q.push([cx + Math.cos(a) * r, Math.sin(a) * r, z]); } return Q; }
  function addTurret1(V, B) {
    var N = 28, s, k, GZ = 0.20;
    loftN(B.paint, [ringC(0.84, -0.03, 0, N), ringC(0.83, 0.05, 0, N), ringC(0.74, 0.20, -0.03, N), ringC(0.60, 0.36, -0.07, N), ringC(0.52, 0.415, -0.09, N), ringC(0.46, 0.424, -0.10, N)]);
    /* gun mount in the front slope, the 73 mm 2A28: thick jacket, tube, the muzzle (P2, P3, P4) */
    box(B.paint, 0.56, 0.86, -0.20, 0.20, 0.06, 0.34);
    cylX(B.dark, 0.84, 1.00, 0, GZ, 0.12, 0.11, 14);
    cylX(B.dark, 1.00, 1.42, 0, GZ, 0.085, 0.075, 14);
    cylX(B.dark, 1.42, 2.22, 0, GZ, 0.056, 0.052, 12);
    cylX(B.dark, 2.22, 2.30, 0, GZ, 0.062, 0.062, 12);
    cylX(B.dark, 0.80, 1.10, -0.17, GZ - 0.05, 0.02, 0.018, 6);           /* coaxial PKT */
    /* the 9M14 Malyutka on its launch rail over the gun: two posts, the rail, the missile with
       its four folded wings and the nose (P2, P3, P4) */
    box(B.dark, 0.70, 0.78, -0.035, 0.035, GZ + 0.07, GZ + 0.24);
    box(B.dark, 1.18, 1.24, -0.03, 0.03, GZ + 0.07, GZ + 0.24);
    box(B.dark, 0.66, 1.44, -0.03, 0.03, GZ + 0.235, GZ + 0.27);
    cylX(B.paint, 0.74, 1.40, 0, GZ + 0.33, 0.063, 0.063, 12);
    cylX(B.paint, 1.40, 1.56, 0, GZ + 0.33, 0.063, 0.02, 12);
    cylX(B.dark, 1.56, 1.62, 0, GZ + 0.33, 0.02, 0.008, 6);
    for (k = 0; k < 4; k++) {
      var a = (k + 0.5) / 4 * TAU;
      slab(B.dark, [0.82, Math.cos(a) * 0.12, GZ + 0.33 + Math.sin(a) * 0.12], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.08, 0.07, 0.006);
    }
    /* gunner's 1PN22M1 sight head front left of the roof, its armoured cap to 2.068 m (ru.wiki) */
    box(B.paint, 0.04, 0.38, 0.14, 0.42, 0.34, 0.47);
    box(B.paint, 0.12, 0.34, 0.18, 0.38, 0.47, 0.57);
    box(B.glass, 0.34, 0.36, 0.20, 0.36, 0.49, 0.55);
    /* OU-3GK searchlight on the right of the gun (P3) */
    box(B.dark, 0.46, 0.60, -0.40, -0.30, 0.22, 0.30);
    cylX(B.dark, 0.48, 0.66, -0.35, 0.38, 0.075, 0.08, 12);
    cylX(B.glass, 0.66, 0.67, -0.35, 0.38, 0.065, 0.065, 12);
    /* gunner's hatch (team colour lid), periscopes, ventilator */
    cylZ(B.paint, -0.24, 0.12, 0.40, 0.46, 0.25, 18);
    cylZ(B.team, -0.24, 0.12, 0.46, 0.475, 0.21, 16);
    for (k = 0; k < 4; k++) box(B.glass, -0.04 + (k % 2) * 0.0, 0.0, -0.32 + k * 0.08, -0.26 + k * 0.08, 0.37, 0.43);
    cylZ(B.paint, -0.36, -0.24, 0.40, 0.47, 0.09, 10);
    box(B.dark, -0.62, -0.56, -0.40, 0.40, 0.08, 0.12);
  }

  /* BMP-2: welded faceted turret; plan from D2 (about 1.9 m long) and Q1, roof 0.52 m over the
     hull roof, the sights to 2.25 m and the searchlight to 2.45 m (ru.wikipedia) */
  var TPL2 = [
    { z: -0.03, H: [[0.92, 0.30], [0.68, 0.72], [0.22, 0.97], [-0.70, 0.95], [-0.96, 0.70], [-1.02, 0.30]] },
    { z: 0.30, H: [[0.86, 0.28], [0.62, 0.68], [0.18, 0.91], [-0.70, 0.90], [-0.93, 0.66], [-0.98, 0.28]] },
    { z: 0.56, H: [[0.52, 0.30], [0.42, 0.58], [0.10, 0.72], [-0.64, 0.72], [-0.82, 0.55], [-0.86, 0.25]] }
  ];
  function addTurret2(V, B) {
    var R = [], i, s, q, x, k, GZ = 0.38;
    for (i = 0; i < TPL2.length; i++) R.push(ringAt(TPL2[i].H, TPL2[i].z));
    loftN(B.paint, R);
    /* gun mount in its slot, the 2A42: recoil sleeve, long thin barrel, muzzle device (Q1, D2) */
    box(B.paint, 0.62, 0.98, -0.22, 0.22, 0.16, 0.54);
    cylX(B.dark, 0.96, 1.10, 0, GZ, 0.11, 0.10, 14);
    cylX(B.dark, 1.10, 1.62, 0, GZ, 0.062, 0.055, 12);
    cylX(B.dark, 1.62, 2.92, 0, GZ, 0.033, 0.031, 10);
    cylX(B.dark, 2.92, 3.08, 0, GZ, 0.045, 0.042, 10);
    cylX(B.dark, 0.94, 1.18, 0.16, GZ - 0.06, 0.02, 0.018, 6);            /* coaxial PKT */
    /* FG-126 lamp coaxial to the right of the gun (Q1) */
    box(B.dark, 0.80, 0.94, -0.38, -0.24, 0.26, 0.36);
    cylX(B.dark, 0.80, 1.00, -0.31, 0.45, 0.10, 0.105, 14);
    cylX(B.glass, 1.00, 1.01, -0.31, 0.45, 0.088, 0.088, 14);
    /* gunner's BPK-1-42 sight head on the left front of the roof, his smaller hatch (en.wiki, Q1) */
    box(B.paint, 0.08, 0.44, 0.30, 0.58, 0.50, 0.66);
    cylY(B.paint, 0.26, 0.28, 0.60, 0.68, 0.13, 12);
    box(B.glass, 0.44, 0.45, 0.34, 0.54, 0.56, 0.64);
    box(B.paint, -0.52, -0.12, 0.22, 0.60, 0.50, 0.57);
    box(B.team, -0.48, -0.16, 0.26, 0.56, 0.57, 0.585);
    /* commander on the right: cupola, TKN-3 sight box and the OU-3GA2 lamp on top to 2.45 m,
       1PZ-3 sight ahead of it (Q1, en.wikipedia) */
    cylZ(B.paint, -0.30, -0.44, 0.50, 0.62, 0.27, 18);
    cylZ(B.dark, -0.30, -0.44, 0.62, 0.635, 0.22, 16);
    for (k = 0; k < 3; k++) box(B.glass, -0.30 + 0.25 * Math.cos(k * 0.8 - 0.8) - 0.03, -0.30 + 0.25 * Math.cos(k * 0.8 - 0.8) + 0.03, -0.44 + 0.25 * Math.sin(k * 0.8 - 0.8) - 0.05, -0.44 + 0.25 * Math.sin(k * 0.8 - 0.8) + 0.05, 0.55, 0.61);
    box(B.paint, -0.12, 0.12, -0.56, -0.30, 0.50, 0.74);
    box(B.glass, 0.12, 0.13, -0.52, -0.34, 0.64, 0.71);
    box(B.dark, -0.06, 0.06, -0.48, -0.38, 0.74, 0.79);
    cylX(B.dark, -0.12, 0.10, -0.43, 0.87, 0.10, 0.11, 14);
    cylX(B.glass, 0.10, 0.11, -0.43, 0.87, 0.09, 0.09, 14);
    box(B.paint, 0.18, 0.40, -0.66, -0.46, 0.46, 0.62);
    box(B.glass, 0.40, 0.41, -0.62, -0.50, 0.54, 0.60);
    /* 9P135M launcher on the roof between the hatches: pedestal, cradle with its guidance box
       and a Konkurs container tilted a little up at the front */
    cylZ(B.dark, -0.18, 0.04, 0.50, 0.68, 0.07, 10);
    box(B.dark, -0.32, -0.04, -0.10, 0.18, 0.66, 0.73);
    box(B.dark, -0.30, -0.06, 0.12, 0.24, 0.62, 0.78);
    box(B.glass, -0.06, -0.05, 0.14, 0.22, 0.68, 0.75);
    cyl(B.paint, [-0.62, 0.04, 0.77], [0.62, 0.04, 0.83], 0.068, 0.068, 12);
    cyl(B.dark, [-0.64, 0.04, 0.77], [-0.62, 0.04, 0.77], 0.074, 0.074, 12);
    cyl(B.dark, [0.62, 0.04, 0.83], [0.64, 0.04, 0.83], 0.074, 0.074, 12);
    /* 902V smoke tubes: three a side on the turret rear, raked up and forward (Q1) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.86, -0.50, s * 0.80 - 0.05, s * 0.80 + 0.05, 0.30, 0.38);
      for (q = 0; q < 3; q++) {
        x = -0.82 + q * 0.13;
        cyl(B.dark, [x, s * 0.80, 0.36], [x + 0.10, s * 0.85, 0.58], 0.043, 0.043, 10);
        cyl(B.paint, [x + 0.10, s * 0.85, 0.58], [x + 0.104, s * 0.852, 0.59], 0.047, 0.047, 10);
      }
    }
    /* aerial at the turret rear (Q1), a stowage rail */
    cylZ(B.dark, -0.80, -0.30, 0.50, 0.60, 0.045, 8);
    cylZ(B.dark, -0.80, -0.30, 0.60, 1.70, 0.009, 6);
    box(B.dark, -1.04, -0.98, -0.60, 0.60, 0.14, 0.19);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.B, T = materials(THREE, C, V), g = new THREE.Group();
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
    if (V.bmp2) addTurret2(V, TB); else addTurret1(V, TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(V.tx, 0, ROOF);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention): 6.755 m, the 6.735 m published
   length plus the door filler caps at the stern */
UNIT_MODELS["pact_e60_ifv"] = {
  len: 6.755,
  build: function (THREE, M, C) { return HeroBMP12.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e80_ifv"] = {
  len: 6.755,
  build: function (THREE, M, C) { return HeroBMP12.build(THREE, M, C, "B"); }
};
