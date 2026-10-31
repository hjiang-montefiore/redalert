/* ========== pla_plz83.js - HERO model: Type 83 (PLZ-83) 152 mm self-propelled howitzer ==========
   pla_e80_spg   "Type 83 (PLZ-83) 152mm self-propelled howitzer", first shown 1 October 1984:
                 the Type 66 (D-20 family) 152 mm gun-howitzer in a fully enclosed turret at
                 the REAR of the front-engined Type 321 tracked chassis - China's answer to the
                 Soviet 2S3, which it resembles.

   References (Wikimedia Commons; cached in scratchpad/q_pla_e80_spg_ref).  No photograph of a
   real Type 83 is on Commons (the category holds only the two model photos below), so the
   shapes come from a well-built 1/35 scale model, and the running gear from the PTZ-89 on the
   same Type 321 chassis:
     P1  "HK ... Hong Kong Scale Modelling Open Competition November 2018 SSG 019 cropped2.jpg"
         (P1_ssg019.jpg) - the scale model from the front left, turret traversed left: the
         turret's sloping front with the angled cheeks and the gun-mount boss, the flat roof,
         the cupola with the 12.7 mm and the round hatch lid; the bow with the rounded front
         corners over the sprockets, the big rectangular mesh grille on the front deck, the
         round driver's hatch; the tube with the thick fume-extractor section and the short
         DOUBLE-BAFFLE muzzle brake (its windows painted red on the model).
     P2  "HK ... SSG 020 cropped2.jpg" (P2_ssg020.jpg) - the same model from the LEFT, nearly
         side-on, gun raised about 12 degrees: MEASURED on a pixel grid (scale: hull 995 px =
         6.50 m, 6.5 mm/px, cross-checked against the turret roof 2.85 m, P2 440 px over the
         ground): the turret over the rear half (front at the hull's middle, tail flush with
         the rear plate), the turret's vertical sides with the chamfered top front edge, the
         big door outline on its left side, the fender stowage (boxes, the long rod tube),
         the raised rear idler and a return roller; the gun sections (sleeve 0.73 m, fume
         extractor about 1.2 m, thin tube, brake about 0.6 m).
     P3  "PTZ-89.jpg" and
     P4  "50th anniversary of PRC 3.jpg" - the PTZ-89 on the same Type 321 chassis at the
         1999 parade, side-on from above (P4 cropped and enlarged 5x): SIX road wheels a side,
         not evenly pitched (wide, close, wide, close, wide gaps from the front), the front
         sprocket, the rear idler; the deep hull side over the track.
   Published (en.wikipedia "Type 83 SPH"): 9.8 x 3.24 x 3.50 m (height "with AAMG"); 30 t;
   152 mm; crew 5; "six wheels on each side, with the engine in the forward hull"; torsion
   bars; 12.7 mm machine gun on the turret; Type 321 chassis; the gun a version of the
   Type 66, the licensed D-20.  Barrel (en.wikipedia "152 mm gun-howitzer D-20", the article
   the Type 66 redirects into): 5.195 m, L/34, WITH the muzzle brake; "the trunnions just
   forward of the breech".  That barrel is drawn at its published length, the breech face
   0.65 m inside the turret face (trunnion just ahead of it, behind the gun-mount boss), so
   the muzzle stands 1.85 m ahead of the nose: 8.43 m overall with the gun level and forward.
   The published 9.8 m IS NOT REACHED and cannot be with this layout: the turret front sits
   at the hull's middle (P1, P2), so 9.8 m would need either a tube about 6.6 m long (1.4 m
   over the published barrel) or the breech outside the turret, or a hull about 8 m long
   (P2's proportions with the published width and height give 6.2-7.0 m).  No published
   hull length was found.  The width and height are met.

   Recognition list (what makes it read at game zoom, and its source):
     1. the big flat-roofed turret over the REAR half, the front deck long and empty - P1, P2
     2. the turret front: sloping face, angled cheeks, the boss round the gun - P1, P2
     3. the 152 mm tube: sleeve, the thick fume extractor, the double-baffle brake - P1, P2
     4. six road wheels in pairs, the front sprocket, the raised rear idler - P2, P4
     5. the cupola with the 12.7 mm on the roof front - P1, P2
     6. the mesh grille and the round driver's hatch on the front deck - P1
   Pose: the gun LEVEL and straight ahead - a choice for the game (P2 has it raised about
   12 degrees).  No travel lock is drawn: none shows on the references.
   Paint: plain PLA green #4f5a38 (the model wears a three-colour scheme, stars and numbers:
   not drawn).
   NOT CONFIRMED, judgement calls (no real photograph or drawing found; the shapes are off a
   scale model): the hull length (6.50 m) and so the scale of every measured part; the overall
   length (8.43 m against the 9.8 m published, see above); the muzzle's place: the scale
   model (P1, P2) puts it under a metre ahead of the nose, about 7.4 m overall, against the
   1.85 m that the published barrel gives - conflicting evidence, the barrel is believed;
   the breech's place inside the turret; the fume extractor's length and place (scaled with
   the tube from P2); the deck (1.55 m) and turret roof (2.85 m)
   heights, the gun axis (2.25 m); the road wheel pitches (0.92/0.70 m) and size (0.62 m), the
   sprocket and idler places, the three return rollers; the nose profile; the turret's plan
   (front face width, cheek angle), its 3.6 m length and the ring place; the cupola on the
   roof's front RIGHT (P2 shows it on the far side); the side door; the brake's exact form;
   the deck hatch, grille, lamp and stowage positions; the
   exhaust (not drawn).
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the turret sides and the roof tail.  Nodes: "turret" (origin on the ring centre
   at deck level, gun along +X; the gun is fixed in it) and six "roadwheel" groups (one per
   station, both sides).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlz83 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4f5a38", blots: ["#465030", "#59643f"], seed: 83 };
  /* running gear (P2, P4): six wheels in pairs (gaps wide, close, wide, close, wide from the
     front), front sprocket, raised rear idler, three return rollers */
  var TY = 1.35, TW = 0.25;
  var XW = [1.96, 1.04, 0.34, -0.58, -1.28, -2.20], ZW = 0.38, RW = 0.31;
  var SPR = { x: 2.80, z: 0.62, r: 0.27 }, IDL = { x: -2.90, z: 0.62, r: 0.27 };
  var RRX = [1.50, -0.12, -1.74], RRZ = 0.78, RRR = 0.07;
  /* hull: nose, rear, belly, sponson floor, deck, start of the nose curve, lower and upper
     half widths, the fender's outer edge */
  var NOSE = 3.25, REAR = -3.25, BELLY = 0.40, SPZ = 0.92, DECK = 1.55, NCX = 2.55, HW = 1.08, SW = 1.50, FW = 1.61;
  /* turret: ring centre, tail, front face, cheek corners, roof, half width; the gun axis */
  var TX = -1.20, TT = -3.05, TF = 0.55, TC = 0.05, TROOF = 2.85, THW = 1.42, GZ = 2.25;
  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
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
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
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
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
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

  /* ----------------------------------------------------------- materials */
  var _tex;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
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

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }

  /* move every vertex of a bin by (dx, dy, dz): the turret is authored in hull space */
  function shift(B, dx, dy, dz) {
    var k, P, i;
    for (k in B) { P = B[k].P; for (i = 0; i < P.length; i += 3) { P[i] += dx; P[i + 1] += dy; P[i + 2] += dz; } }
  }


  /* ---------------------------------------------------------------- hull */
  /* the rounded bow (P1): the deck falls away in a curve from NCX to the nose */
  var NP = [[NCX, DECK], [2.90, 1.46], [3.12, 1.31], [NOSE, 1.08]];
  function nz(x) {
    var i, t;
    if (x <= NP[0][0]) return DECK;
    for (i = 0; i + 1 < NP.length; i++) if (x <= NP[i + 1][0]) { t = (x - NP[i][0]) / (NP[i + 1][0] - NP[i][0]); return NP[i][1] + (NP[i + 1][1] - NP[i][1]) * t; }
    return NP[NP.length - 1][1];
  }
  function addHull(B) {
    var s, i, x, y, ya, yb;
    /* the lower hull between the tracks: belly, the lower nose plate leaning back, the
       rear plate */
    prismY(B.paint, [[REAR, 0.70], [REAR + 0.20, BELLY], [2.85, BELLY], [NOSE, 0.90], [NOSE, SPZ + 0.01], [REAR, SPZ + 0.01]], -HW, HW);
    /* the upper hull over the tracks: a loft of cross-sections with chamfered top edges,
       the flat deck, then the curved bow (P1, P2) */
    function sec(x, top) {
      return [[x, -SW, SPZ], [x, SW, SPZ], [x, SW, top - 0.08], [x, SW - 0.08, top], [x, -SW + 0.08, top], [x, -SW, top - 0.08]];
    }
    var L = [sec(REAR, DECK - 0.06), sec(REAR + 0.06, DECK)];
    for (i = 0; i < NP.length; i++) L.push(sec(NP[i][0], NP[i][1]));
    loftN(B.paint, L);
    for (s = -1; s <= 1; s += 2) {
      ya = Math.min(s * SW, s * FW); yb = Math.max(s * SW, s * FW);
      /* the fender over the track, the full length, turned down at the front corner over
         the sprocket (the rounded corners of P1) and at the tail */
      box(B.paint, REAR + 0.05, 2.70, ya, yb, SPZ, SPZ + 0.03);
      prismY(B.paint, [[2.70, SPZ], [2.70, SPZ + 0.03], [3.05, SPZ - 0.02], [3.28, SPZ - 0.16], [3.30, SPZ - 0.24], [3.24, SPZ - 0.24], [3.20, SPZ - 0.15], [3.02, SPZ - 0.05]], ya, yb);
      box(B.dark, REAR - 0.02, REAR + 0.08, ya, yb, SPZ - 0.28, SPZ);
      /* fender stowage along the hull side (P2): boxes under the turret, the long rod tube,
         a tool box ahead; all inside the track's outer edge */
      var yo = s * (SW + 0.05);
      box(B.paint, -2.85, -2.05, Math.min(s * SW, yo + s * 0.05), Math.max(s * SW, yo + s * 0.05), SPZ + 0.03, SPZ + 0.38);
      box(B.paint, -1.95, -1.15, Math.min(s * SW, yo + s * 0.05), Math.max(s * SW, yo + s * 0.05), SPZ + 0.03, SPZ + 0.30);
      box(B.dark, -2.87, -1.13, s > 0 ? SW + 0.10 : -SW - 0.11, s > 0 ? SW + 0.11 : -SW - 0.10, SPZ + 0.20, SPZ + 0.22);
      cyl(B.paint, [-0.95, yo, SPZ + 0.12], [1.10, yo, SPZ + 0.12], 0.06, 0.06, 10);
      cyl(B.dark, [1.10, yo, SPZ + 0.12], [1.14, yo, SPZ + 0.12], 0.065, 0.065, 10);
      for (x = -0.70; x < 1.0; x += 0.80) box(B.dark, x - 0.03, x + 0.03, Math.min(s * SW, yo + s * 0.07), Math.max(s * SW, yo + s * 0.07), SPZ + 0.03, SPZ + 0.20);
      box(B.paint, 1.35, 2.25, Math.min(s * SW, yo + s * 0.05), Math.max(s * SW, yo + s * 0.05), SPZ + 0.03, SPZ + 0.28);
      box(B.dark, 1.33, 2.27, s > 0 ? SW + 0.10 : -SW - 0.11, s > 0 ? SW + 0.11 : -SW - 0.10, SPZ + 0.16, SPZ + 0.18);
      /* headlamps in guards on the bow corners, towing eyes on the lower nose */
      y = s * 1.22;
      box(B.paint, 2.92, 3.10, y - 0.14, y + 0.14, nz(3.10), nz(2.92) + 0.10);
      cyl(B.paint, [3.04, y, nz(2.92) + 0.05], [3.15, y, nz(2.92) + 0.05], 0.065, 0.065, 12);
      cyl(B.dark, [3.15, y, nz(2.92) + 0.05], [3.16, y, nz(2.92) + 0.05], 0.055, 0.055, 12);
      cyl(B.dark, [NOSE - 0.12, s * 0.72 - 0.08, 0.80], [NOSE - 0.12, s * 0.72 + 0.08, 0.80], 0.06, 0.06, 8);
      box(B.dark, NOSE - 0.26, NOSE - 0.04, s * 0.72 - 0.07, s * 0.72 + 0.07, 0.74, 0.86);
    }
    /* the tow cable across the bow */
    var cab = [[3.14, -1.05, 1.30], [3.24, -0.55, 1.13], [3.27, 0.0, 1.10], [3.24, 0.55, 1.13], [3.14, 1.05, 1.30]];
    for (i = 0; i + 1 < cab.length; i++) cyl(B.dark, cab[i], cab[i + 1], 0.025, 0.025, 6, true);
    /* --- front deck (P1): the round driver's hatch front LEFT with its periscopes, the big
       rectangular mesh grille over the engine right of centre, louvres, filler caps --- */
    cylZ(B.paint, 2.15, 0.80, DECK, DECK + 0.07, 0.30, 16);
    box(B.dark, 2.05, 2.25, 0.72, 0.88, DECK + 0.07, DECK + 0.10);
    for (i = -1; i <= 1; i++) box(B.dark, 2.48, 2.56, 0.80 + i * 0.16 - 0.06, 0.80 + i * 0.16 + 0.06, nz(2.56), nz(2.48) + 0.08);
    box(B.paint, 0.95, 2.30, -1.30, -0.15, DECK, DECK + 0.05);
    box(B.dark, 1.02, 2.23, -1.23, -0.22, DECK + 0.05, DECK + 0.06);
    for (i = 0; i < 6; i++) box(B.paint, 1.06 + i * 0.20, 1.10 + i * 0.20, -1.23, -0.22, DECK + 0.05, DECK + 0.075);
    box(B.paint, 0.35, 0.85, -1.25, -0.25, DECK, DECK + 0.03);
    for (i = 0; i < 5; i++) box(B.dark, 0.40 + i * 0.095, 0.45 + i * 0.095, -1.20, -0.30, DECK + 0.03, DECK + 0.045);
    cylZ(B.dark, 0.60, 1.20, DECK, DECK + 0.05, 0.09, 10);
    cylZ(B.dark, 1.40, 1.20, DECK, DECK + 0.05, 0.09, 10);
    cylZ(B.dark, TX, 0, DECK - 0.01, DECK + 0.03, 1.32, 32);
    /* --- rear plate: tail lamps, towing eyes, two spare track links --- */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, REAR - 0.08, REAR, s * 1.25 - 0.08, s * 1.25 + 0.08, 1.35, 1.48);
      box(B.dark, REAR - 0.08, REAR, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.62, 0.76);
      box(B.dark, REAR - 0.05, REAR, s * 0.40 - 0.22, s * 0.40 + 0.22, 1.00, 1.15);
      box(B.dark, REAR - 0.05, REAR, s * 0.40 - 0.22, s * 0.40 + 0.22, 1.18, 1.33);
    }
  }

  /* ------------------------------------------------------------ running gear */
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    for (i = 0; i < RRX.length; i++) C.push([RRX[i], RRZ, RRR + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
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
    cnt = Math.round(tot / 0.16); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - TW - 0.01, y + TW + 0.01, 0.07);
        /* the single guide horn between the wheel halves */
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.022, y + 0.022, 0.05);
      }
      /* the toothed drive sprocket at the FRONT (engine forward, published) */
      cylY(B.dark, SPR.x, y - 0.19, y + 0.19, SPR.z, SPR.r - 0.06, 18);
      [-0.12, 0.12].forEach(function (oy) {
        for (i = 0; i < 12; i++) {
          var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
          slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y + oy, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.035, 0.028);
        }
      });
      cylY(B.paint, SPR.x, y + s * 0.19, y + s * 0.23, SPR.z, 0.14, 14);
      /* the spoked idler at the rear, raised (P2) */
      cylY(B.paint, IDL.x, y - 0.21, y - 0.05, IDL.z, IDL.r, 18);
      cylY(B.paint, IDL.x, y + 0.05, y + 0.21, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.25, IDL.z, 0.08, 10);
      /* the return rollers */
      for (i = 0; i < RRX.length; i++) {
        cylY(B.dark, RRX[i], y - 0.18, y + 0.18, RRZ, RRR, 12);
        cylY(B.dark, RRX[i], s * (HW - 0.01), y, RRZ, 0.035, 8);
      }
    }
  }
  /* road wheel: dual rubber-tyred discs with a gap for the guide horn, a dished outer disc
     with six recesses and a hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.24, y - 0.03, 0, RW, 20);
      cylY(W, 0, y + 0.03, y + 0.24, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.03, y + 0.03, 0, RW - 0.07, 14);
      cylY(W, 0, s * (HW + 0.02), y - s * 0.24, 0, 0.06, 8);
      cyl(W, [0, y + s * 0.24, 0], [0, y + s * 0.255, 0], RW - 0.05, 0.11, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.18, y + s * 0.250, Math.sin(a) * 0.18], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.05, 0.010, 0.045);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.25, y + s * 0.27, 0, 0.08, 10);
    }
  }

  /* -------------------------------------------------------------- turret */
  /* authored in hull space, then shifted onto the ring centre at deck level */
  function ring(z, xf, xc, tt, hw) {
    return [[xf, -0.55, z], [xf, 0.55, z], [xc, hw, z], [tt + 0.15, hw, z], [tt, hw - 0.15, z],
            [tt, -hw + 0.15, z], [tt + 0.15, -hw, z], [xc, -hw, z]];
  }
  function addTurret(B) {
    var s, i, x, y;
    /* the box (P1, P2): vertical sides, the front a narrow face with angled cheeks, the top
       front edge chamfered back to the flat roof */
    loftN(B.paint, [ring(DECK + 0.03, TF - 0.05, TC - 0.05, TT + 0.05, THW - 0.05), ring(DECK + 0.10, TF, TC, TT, THW),
                    ring(2.40, TF, TC, TT, THW), ring(TROOF - 0.06, TF - 0.40, TC - 0.32, TT, THW - 0.08),
                    ring(TROOF, TF - 0.46, TC - 0.38, TT + 0.04, THW - 0.14)]);
    /* the gun-mount boss on the face round the cradle (P1, P2) */
    box(B.paint, TF - 0.05, TF + 0.22, -0.38, 0.38, GZ - 0.34, GZ + 0.26);
    prismY(B.paint, [[TF - 0.05, GZ + 0.26], [TF + 0.22, GZ + 0.26], [TF + 0.10, GZ + 0.36], [TF - 0.10, GZ + 0.36]], -0.38, 0.38);
    for (s = -1; s <= 1; s += 2) {
      var yi = s * THW, ya = Math.min(yi, s * (THW + 0.03)), yb = Math.max(yi, s * (THW + 0.03));
      /* hand rails along the side top, the team strip */
      box(B.dark, -2.70, -0.40, ya, yb, 2.55, 2.58);
      box(B.team, -1.10, -0.40, s > 0 ? THW : -THW - 0.012, s > 0 ? THW + 0.012 : -THW, 2.18, 2.30);
      /* vision/pistol ports and lifting eyes */
      cyl(B.dark, [-0.40, s * THW, 2.10], [-0.40, s * (THW + 0.04), 2.10], 0.06, 0.06, 10);
      box(B.dark, TC - 0.20, TC - 0.08, s * (THW - 0.30) - 0.04, s * (THW - 0.30) + 0.04, TROOF - 0.02, TROOF + 0.06);
      box(B.dark, TT + 0.25, TT + 0.37, s * (THW - 0.40) - 0.04, s * (THW - 0.40) + 0.04, TROOF - 0.02, TROOF + 0.06);
      /* antenna bases on the roof's rear corners */
      cylZ(B.dark, TT + 0.35, s * 1.05, TROOF, TROOF + 0.15, 0.05, 8);
    }
    /* the big door outline on the LEFT side (P2) */
    y = THW;
    box(B.dark, -2.50, -1.30, y, y + 0.015, 1.75, 1.79);
    box(B.dark, -2.50, -1.30, y, y + 0.015, 2.42, 2.46);
    box(B.dark, -2.50, -2.46, y, y + 0.015, 1.75, 2.46);
    box(B.dark, -1.34, -1.30, y, y + 0.015, 1.75, 2.46);
    box(B.dark, -1.48, -1.40, y, y + 0.04, 2.05, 2.15);
    /* the rear face: the ammunition hatch outline */
    box(B.dark, TT - 0.015, TT, -0.40, 0.40, 1.80, 1.83);
    box(B.dark, TT - 0.015, TT, -0.40, 0.40, 2.40, 2.43);
    box(B.dark, TT - 0.015, TT, -0.40, -0.37, 1.80, 2.43);
    box(B.dark, TT - 0.015, TT, 0.37, 0.40, 1.80, 2.43);
    /* --- roof: the sight box front left, the round hatch left (the white lid of P1, P2),
       the vent, the cupola with the 12.7 mm at the front right, the team strip --- */
    box(B.paint, -0.55, -0.10, 0.62, 0.98, TROOF, TROOF + 0.20);
    box(B.dark, -0.10, -0.08, 0.68, 0.92, TROOF + 0.05, TROOF + 0.16);
    cylZ(B.paint, -1.25, 0.70, TROOF, TROOF + 0.06, 0.34, 16);
    cylZ(B.dark, -1.25, 0.70, TROOF + 0.06, TROOF + 0.08, 0.28, 16);
    cylZ(B.paint, -2.25, 0.10, TROOF, TROOF + 0.12, 0.15, 12);
    cylZ(B.dark, -2.25, 0.10, TROOF + 0.12, TROOF + 0.14, 0.11, 12);
    var CX = -0.85, CY = -0.70;
    cylZ(B.paint, CX, CY, TROOF, TROOF + 0.12, 0.40, 18);
    cylZ(B.paint, CX, CY, TROOF + 0.12, TROOF + 0.18, 0.32, 18);
    for (i = 0; i < 6; i++) {
      var pa = i / 6 * TAU;
      box(B.dark, CX + Math.cos(pa) * 0.38 - 0.04, CX + Math.cos(pa) * 0.38 + 0.04, CY + Math.sin(pa) * 0.38 - 0.04, CY + Math.sin(pa) * 0.38 + 0.04, TROOF + 0.04, TROOF + 0.10);
    }
    /* the 12.7 mm on its mount at the cupola's front edge, along +X, top 3.48 m */
    var MX = CX + 0.22, MZ = 3.36;
    cylZ(B.dark, MX, CY, TROOF + 0.18, MZ - 0.05, 0.035, 8);
    box(B.dark, MX - 0.45, MX + 0.15, CY - 0.06, CY + 0.06, MZ - 0.05, MZ + 0.08);
    cyl(B.dark, [MX + 0.15, CY, MZ + 0.02], [MX + 1.15, CY, MZ + 0.02], 0.025, 0.022, 8);
    cyl(B.dark, [MX + 1.07, CY, MZ + 0.02], [MX + 1.17, CY, MZ + 0.02], 0.04, 0.04, 8);
    box(B.dark, MX - 0.12, MX + 0.10, CY - 0.22, CY - 0.06, MZ - 0.14, MZ + 0.02);
    box(B.paint, MX - 0.05, MX + 0.03, CY - 0.18, CY + 0.18, MZ - 0.05, MZ + 0.12);
    box(B.team, TT + 0.15, TT + 0.55, -0.30, 0.30, TROOF, TROOF + 0.015);

    /* --- the 152 mm, LEVEL (see the header), on the centre line (P1, P2) --- */
    /* the barrel at its published 5.195 m with the brake (D-20 / Type 66): the breech face
       BR inside the turret, behind the boss; the muzzle MZL; the boss front M0 */
    var M0 = TF + 0.22, BR = TF - 0.65, MZL = BR + 5.195, BZ = MZL - 0.58;
    /* the sleeve out of the boss, a dark collar */
    cyl(B.paint, [M0 - 0.05, 0, GZ], [M0 + 0.70, 0, GZ], 0.18, 0.17, 18);
    cyl(B.dark, [M0 + 0.70, 0, GZ], [M0 + 0.78, 0, GZ], 0.15, 0.15, 16);
    cyl(B.paint, [M0 + 0.78, 0, GZ], [M0 + 0.96, 0, GZ], 0.10, 0.10, 14);
    /* the fume extractor, tapered both ends (its share of the tube as on P2) */
    cyl(B.paint, [M0 + 0.96, 0, GZ], [M0 + 1.11, 0, GZ], 0.10, 0.155, 16);
    cyl(B.paint, [M0 + 1.11, 0, GZ], [M0 + 2.52, 0, GZ], 0.155, 0.155, 16);
    cyl(B.paint, [M0 + 2.52, 0, GZ], [M0 + 2.71, 0, GZ], 0.155, 0.095, 16);
    /* the tube */
    cyl(B.paint, [M0 + 2.71, 0, GZ], [BZ, 0, GZ], 0.095, 0.09, 14);
    /* the double-baffle muzzle brake (0.58 m): rear block, two windows, middle and front
       baffles */
    cyl(B.dark, [BZ, 0, GZ], [BZ + 0.56, 0, GZ], 0.10, 0.10, 14);
    cyl(B.paint, [BZ, 0, GZ], [BZ + 0.14, 0, GZ], 0.15, 0.15, 14);
    cyl(B.paint, [BZ + 0.27, 0, GZ], [BZ + 0.37, 0, GZ], 0.155, 0.155, 14);
    cyl(B.paint, [BZ + 0.48, 0, GZ], [MZL, 0, GZ], 0.155, 0.155, 14);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, BZ + 0.14, BZ + 0.27, s > 0 ? 0.09 : -0.15, s > 0 ? 0.15 : -0.09, GZ - 0.11, GZ + 0.11);
      box(B.dark, BZ + 0.37, BZ + 0.48, s > 0 ? 0.09 : -0.15, s > 0 ? 0.15 : -0.09, GZ - 0.11, GZ + 0.11);
    }
    box(B.paint, BZ + 0.14, BZ + 0.48, -0.15, 0.15, GZ + 0.09, GZ + 0.13);
    box(B.paint, BZ + 0.14, BZ + 0.48, -0.15, 0.15, GZ - 0.13, GZ - 0.09);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB);
    shift(TB, -TX, 0, -DECK);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build (the rear plate's lamps -3.33 to the muzzle 5.095) */
UNIT_MODELS["pla_e80_spg"] = { len: 8.43, build: HeroPlz83.build };
