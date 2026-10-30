/* ========== pla_pgz88.js - HERO model: Type 88 (PGZ-88) twin 37 mm SPAAG ==========
   Key: pla_e80_spaag  "Type 88 (PGZ-88) twin 37mm self-propelled AA gun" (row service 1988,
   turret:true).  Norinco's first fully automatic Chinese SPAAG, shown in 1989, used only for
   PLA evaluation trials and not adopted (en.wiki "PGZ-88"; ru.wiki "Tip 88 (ZSU)").

   CHASSIS.  en.wikipedia: "The vehicle chassis is based on [the] Type 79 tank" (citing
   Military-Today and Sina 2018); a web-search summary of further sites (Military-Today,
   army-guide) agrees: "a Type 74 twin-37mm AAA gun mounted on a tracked chassis of the Type 79
   main battle tank".  The Type 79 (Type 69-III, WZ-121D) is a Type 59 / T-54A development
   that "share[s] almost identical hulls" with the Type 59 (en.wiki "Type 69 tank", Gelbart
   1996).  So the row's own description ("on a Type 80 tank chassis") is NOT followed: the
   Type 80 is a different, six-wheeled tank.  The game's armour_specs row (len 6.3, width 3.3,
   height 3) cites no source.

   START: js/hero/ru_t54.js (HeroT54, the measured T-54A, whose T79 variant is the PLA Type 79
   and is checked against a Type 79 photograph, its P7).  Copied UNCHANGED from it: the
   geometry kit, materials and paint texture (the T79 variant's PLA green), the hull station
   table and every hull number (6.04 m plate to plate, deck 1.42 m, fender shelf 1.08 m, track
   centres 2.64 m, 580 mm track), the fender stowage and box tanks, the mudguards, the
   driver's hatch, headlamp, engine deck, the track, sprocket, idler and the five 830 mm
   "starfish" road wheels.  Comments in that copied code that cite D1, P1-P7 refer to
   ru_t54.js's own references (T-54A drawings and photographs, the Type 79 in P7).
   CHANGED: the stern drums are left off (they are the T-54A's; ru_t54.js notes they were not
   checked on a Type 79, and nothing shows them on the PGZ-88); the dome turret, the gun and
   the 12.7 mm are replaced by the AA turret below.

   REFERENCES.  No photograph or drawing of the PGZ-88 was found that this session could
   reach: Wikimedia Commons has no PGZ-88 file or category (searched "PGZ-88", "PGZ88",
   "Type 88" SPAAG / self-propelled anti-aircraft, "88shi zixing gaoshepao" in Chinese,
   "37mm self-propelled anti-aircraft", the Chinese SPAAG categories: only the Type 63, Type
   80, PGZ-95 and PGZ-09 exist); en.wiki and ru.wiki carry no image; zh/ja.wikipedia,
   Military-Today, ODIN (odin.tradoc.army.mil), tank-afv.com and Sina are not reachable from
   here.  The model therefore rests on TEXT:
     T1  en.wikipedia "PGZ-88": Type 79 chassis; Type 74 twin 37 mm; a surveillance radar,
         an electro-optical sensor, a ballistic computer, IFF; evaluation only.
     T2  ru.wikipedia "Tip 88 (ZSU)" (citing ODIN WEG and Military-Today): 35 t, crew 4,
         2 x 37 mm from the towed Type 74, elevation -5 to +85 deg, range 9.4 km, 1000 rounds,
         50 km/h, an autoloader; a SURVEILLANCE radar (15 km, 3 km altitude), an optical
         sight, an electro-optical director; thin armour against small arms only.
     T3  web-search summary of Military-Today / army-guide / valka.cz (the pages themselves
         not reachable): "a large box-shape turret, with the fire-control radar mounted on
         the turret roof"; another says the box turret mounted twin Type 76 (naval) 37 mm.
     T4  en.wikipedia "37 mm automatic air defense gun M1939 (61-K)": the barrel 2.73 m
         (L/73), the gun the Type 65 / Type 74 copy.
     T5  ru_t54.js and its references for the whole chassis (Type 79 variant, its P7).
   Published: 35 t, crew 4 (T2).  NO published length, width or height was found; the Type
   79's hull 6.24 m and width 3.3 m (en.wiki, quoted in ru_t54.js) bound the chassis.

   Recognition list (what makes it read at game zoom, and its source):
     1. the Type 59 / 69 / 79 hull: five big road wheels, the wide gap behind the first, no
        return rollers, rear sprocket, fender boxes - T1, T5
     2. a large ENCLOSED box turret (not the Type 63's open box) - T3
     3. two 37 mm barrels side by side out of its front - T1, T2, T3
     4. a radar antenna on the turret roof - T1, T2, T3
     5. an electro-optical sensor box - T1, T2
   Pose: the guns are drawn at 15 deg elevation, a CHOICE (the published arc is -5 to +85);
   the radar antenna faces forward.
   Paint: plain PLA green (ru_t54.js's Type 79, #4f5a3a); no stars or numbers.

   NOT CONFIRMED - everything about the turret, since no image was found: its plan (2.45 m
   long, 2.30 m wide at the foot, chamfered front corners), its height (0.95 m above the
   deck: the roof at 2.37 m), the slight slope of its front and sides, its place on the old
   T-54 ring; the guns' trunnion (0.78 m ahead of the ring, 0.52 m above the deck), their
   0.40 m spacing, the single elevating mantlet, the barrel sleeves and flash hiders (drawn
   after the 61-K, T4); the radar's place (roof rear: T3 says "on the turret roof", en.wiki
   only "surveillance radar"), its antenna's shape (a flat 1.4 x 0.45 m rectangle on a
   pedestal, its top at 3.05 m, near the game row's 3 m height) and its tilt; the EO
   sensor's place (roof front left) and box shape.  NOT DRAWN for want of any reference: roof
   hatches, the optical sight's head, periscopes, smoke dischargers, aerials, stowage on the
   turret.  The chassis is assumed unaltered from the Type 79 (fender boxes, engine deck,
   headlamp): not checked on a PGZ-88.

   Materials: PAINT (canvas texture), DARK (track, fittings, bores, radar face), WHEEL (vertex
   colours), and the team colour exactly as handed in (C.team): a right fender box lid and the
   engine-deck plate (copied hull) and a strip on the turret's rear wall.
   Nodes: "turret" (origin on the ring centre at the deck, x 0, z 1.42; guns along +X; the
   guns, radar and EO box are fixed in it) and five "roadwheel" groups (axle along local Y,
   each holding both sides).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPgz88 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* the hull's paint and options as ru_t54.js's T79 variant (PLA green); no stern drums */
  var V88 = { paint: { base: "#4f5a3a", blots: ["#465031", "#58633f"], seed: 88 }, canvas: "#4a4d36", drums: 0 };

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
  /* sc: an optional per-axis scale [sx, sy, sz] applied to the geometry (normals by the
     inverse), for a variant drawn as this model resized (the Type 62) */
  function flush(THREE, group, B, sc) {
    var k, b, geo, i, nx, ny, nz, l;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (sc) {
        for (i = 0; i < b.P.length; i += 3) {
          b.P[i] *= sc[0]; b.P[i + 1] *= sc[1]; b.P[i + 2] *= sc[2];
          nx = b.N[i] / sc[0]; ny = b.N[i + 1] / sc[1]; nz = b.N[i + 2] / sc[2];
          l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          b.N[i] = nx / l; b.N[i + 1] = ny / l; b.N[i + 2] = nz / l;
        }
      }
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
      if (V.wheel === "spoke") {
        /* the Type 62's spoked wheel (P8, P9): ten spokes over a dark open dish */
        W.col = HOLE;
        cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.262, 0], 0.33, 0.33, 18);
        W.col = RIB;
        for (i = 0; i < 10; i++) {
          a = i / 10 * TAU;
          slab(W, [Math.cos(a) * 0.225, y + s * 0.27, Math.sin(a) * 0.225], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.11, 0.014, 0.026);
        }
        W.col = TYRE;
        cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.11, 12);
        continue;
      }
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


  /* --------------------------------------------------------------- turret
     NONE of this is measured: no photograph or drawing of the PGZ-88 could be found (see
     the header).  It follows the published WORDS only: an enclosed, box-shaped welded
     turret (Military-Today via the search summary: "a large box-shape turret"), the twin
     37 mm of the Type 74 towed mount inside it, a surveillance radar on the roof (en.wiki;
     ru.wiki "obzornoy RLS", 15 km), an electro-optical sensor (en.wiki, ru.wiki).  Every
     size and place below is a judgement call and is listed under NOT CONFIRMED.
     Turret frame: origin on the T-54 ring centre at the deck (x 0, z 1.42), gun along +X. */
  var TF = 1.20, TR = -1.25, TWB = 1.15, TWT = 1.08, TH = 0.95, TFT = 1.02;   /* front, rear, half widths foot/top, roof height, front top */
  var CH = 0.30;                                                                   /* front corner chamfer */
  var GT = [0.78, 0, 0.52], GEL = 15 * Math.PI / 180, GY = 0.20;                 /* trunnion, elevation (a CHOICE), half spacing */
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function along(y, t, up) {
    return [GT[0] + Math.cos(GEL) * t - Math.sin(GEL) * (up || 0), y, GT[2] + Math.sin(GEL) * t + Math.cos(GEL) * (up || 0)];
  }
  function ring(xf, xr, w, z) {
    /* plan, CCW from the front centre-right: front face, chamfers, sides, rear */
    return [[xf, -w + CH, z], [xf, w - CH, z], [xf - CH, w, z], [xr, w, z], [xr, -w, z], [xf - CH, -w, z]];
  }
  function addTurret(B) {
    var s, i;
    /* the turret ring's bearing collar under the box */
    cylZ(B.dark, 0, 0, -0.01, 0.06, 0.98, 32);
    /* the welded box: a slightly sloped front plate, the sides leaning in a little */
    loftN(B.paint, [ring(TF, TR, TWB, 0.05), ring(TFT, TR + 0.05, TWT, TH)]);
    /* the roof's welded edge strip and the rear wall's team strip */
    box(B.dark, TR + 0.05, TFT - CH, TWT - 0.04, TWT, TH, TH + 0.015);
    box(B.dark, TR + 0.05, TFT - CH, -TWT, -TWT + 0.04, TH, TH + 0.015);
    box(B.team, TR - 0.012, TR + 0.01, -0.55, 0.55, TH - 0.30, TH - 0.20);

    /* --- the twin 37 mm (Type 74, a 61-K development; 61-K barrel 2.73 m, L/73), at the
       chosen 15 deg; one elevating mantlet across both, out of the front plate --- */
    var E = [Math.cos(GEL), 0, Math.sin(GEL)], W = [0, 1, 0], U = [-Math.sin(GEL), 0, Math.cos(GEL)];
    slab(B.paint, along(0, 0.42), E, W, U, 0.14, GY + 0.20, 0.22);
    for (s = -1; s <= 1; s += 2) {
      var y = s * GY;
      cyl(B.paint, along(y, 0.55), along(y, 1.05), 0.075, 0.068, 14);   /* barrel sleeve */
      cyl(B.paint, along(y, 1.05), along(y, 3.05), 0.038, 0.032, 12);   /* tube */
      cyl(B.paint, along(y, 3.05), along(y, 3.28), 0.040, 0.060, 14);   /* flash hider */
      cyl(B.dark, along(y, 3.275), along(y, 3.285), 0.022, 0.022, 10);
    }

    /* --- the surveillance radar on the roof rear: a pedestal, a flat rectangular antenna
       facing forward, tilted back.  Shape and size NOT CONFIRMED. --- */
    var RX = -0.80, RZ = TH;
    cylZ(B.dark, RX, 0, RZ, RZ + 0.16, 0.16, 14);
    cylZ(B.paint, RX, 0, RZ + 0.16, RZ + 0.22, 0.22, 16);
    var tilt = 15 * Math.PI / 180, AN = [Math.cos(tilt), 0, Math.sin(tilt)], AU = [-Math.sin(tilt), 0, Math.cos(tilt)];
    var AC = [RX + 0.02, 0, RZ + 0.46];
    slab(B.paint, AC, AN, W, AU, 0.04, 0.70, 0.22);
    slab(B.dark, add(AC, mul(AN, 0.045)), AN, W, AU, 0.006, 0.66, 0.19);
    slab(B.dark, add(AC, mul(AN, -0.10)), AN, W, AU, 0.06, 0.08, 0.12);

    /* --- the electro-optical sensor: a box on the roof front left, its window ahead --- */
    box(B.paint, 0.35, 0.72, 0.42, 0.78, TH, TH + 0.30);
    box(B.dark, 0.72, 0.73, 0.48, 0.72, TH + 0.08, TH + 0.24);
    cylZ(B.dark, 0.53, 0.60, TH - 0.02, TH + 0.02, 0.24, 16);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C, V88), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB, V88);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V88);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return { build: build };
})();

/* len: the measured X extent of the build (dump.js), the rear fender ends at -3.10 m to the muzzles at +3.96 m at
   the chosen 15 deg (no published length was found) */
UNIT_MODELS["pla_e80_spaag"] = { len: 7.06, build: HeroPgz88.build };
