/* ========== pla_plz89.js - HERO model: Type 89 (PLZ-89) 122 mm self-propelled howitzer ==========
   pla_e90_spg   "Type 89 (PLZ-89) 122mm self-propelled howitzer", developed in the late 1980s,
                 first shown at the 1 October 1999 parade: a 122 mm howitzer derived from the
                 Type 86 (the licensed D-30) in a fully enclosed turret over the REAR of a
                 front-engined tracked chassis - China's counterpart of the Soviet 2S1.

   References.  NO PHOTOGRAPH OR DRAWING OF A PLZ-89 COULD BE FOUND on Wikimedia Commons (no
   category; searches for "PLZ-89", "PLZ89", "Type 89 howitzer", "Type 89 self-propelled",
   the Chinese name and "122 mm self-propelled howitzer" return nothing of it; the other
   hosts carrying it - military-today, armyrecognition, ODIN, weaponsystems.net - are not
   reachable from here).
   Checked and REJECTED as not this vehicle (cached in scratchpad/q_pla_e90_spg_ref):
     X1  "Self-propelled artillery of PLA.jpg" (2009 parade) and
     X2  "Vostok-2018 military manoeuvres (2018-09-13) 60.jpg" - both the later PLZ-07 122 mm
         on the ZBD-04 family hull (high flat hull sides, boxy turret with smoke dischargers
         on its sides): its successor, not the PLZ-89.
     X3  "50th anniversary of PRC 3.jpg" / "4.jpg" (1999 parade) - PTZ-89s and SPAAGs, the
         PLZ-89 not identifiable at that size ("1", "2" and "5" of the same series could
         not be fetched: Wikimedia rate limit).
   So the model is built from the PUBLISHED TEXT and from the related chassis:
     T1  en.wikipedia "PLZ-89": 20 t; width 3.4 m; height 2 m; crew 5; 122 mm/L32 howitzer
         "derived from the Type 86 (W-86) 122 mm/32-calibre towed howitzer, ... copy of the
         D-30"; 40 rounds in the turret; "roof-mounted electro-optical sighting"; QJC-88
         12.7 mm roof-mounted MG; "2 sets of 4-barrel grenade launchers"; torsion bars;
         chassis developed from the Type 77 amphibious APC; 12V150L12 450 hp diesel;
         traverse 360 degrees.  (Its "length 11 m" cannot be met by a 6.5 m hull and a
         3.9 m barrel with the turret aft: not used.)
     T2  ru.wikipedia "Tip 89 (SAU)" (the Russian article): length 6500 mm, width 3400,
         height 2000; "the engine compartment is at the FRONT of the hull, the driver and
         commander to the LEFT of the engine" (so the fighting compartment and turret are
         at the REAR); crew commander, gunner, two loaders, driver; aluminium armour.
     T3  js/hero/pla_plz83.js (the Type 83, whose chassis this one is related to): the
         running gear (six road wheels in pairs, front sprocket, raised rear idler, three
         return rollers, taken there off the PTZ-89 at the 1999 parade), the rounded bow and
         the deck grille layout are borrowed from it.
   Published figures used: hull length 6.50 m (T2); width 3.40 m over the tracks (T1, T2);
   height 2.00 m (T1, T2), read as the turret roof - the 12.7 mm stands above it; the barrel
   at 122 mm x 32 = 3.90 m (T1), drawn from the breech face to the muzzle, brake included.

   Recognition list (what makes it read at game zoom, and its source):
     1. the low, flat-roofed turret over the REAR half, the front deck long and empty - T2, T1
     2. the short 122 mm tube with its fume extractor and the muzzle brake - T1 (the brief)
     3. six road wheels, the front sprocket (front engine), the rear idler - T2, T3
     4. the cupola with the 12.7 mm on the roof, the sight box on the roof - T1
     5. the two four-tube grenade-launcher banks on the turret front corners - T1
     6. the driver's and commander's hatches front LEFT, the grille front right - T2, T3
   Pose: the gun LEVEL and straight ahead - a choice for the game.
   Paint: plain PLA green #4f5a38 (as the Type 83).  No stars or numbers.
   NOT CONFIRMED - with no picture of the real vehicle, every SHAPE is a judgement call
   within the published figures: the bow profile and deck height (1.35 m, chosen so that a
   0.65 m turret meets the published 2.00 m), the road-wheel count, pitch and size and the
   sprocket, idler and return rollers (borrowed from the Type 83 / PTZ-89, T3); the turret's
   length (3.10 m), plan, sloped faces and the ring place; whether the 3.90 m (L/32) includes
   the brake (the towed D-30 barrel is 4.66 m, L/38: drawn that way the muzzle would stand
   0.76 m further forward); the breech's place inside the turret (0.55 m behind the face);
   the fume extractor's and brake's sizes and form (a D-30-style multi-baffle brake is
   drawn); the cupola's side (right) and the 12.7 mm mount; the sight box, roof hatch and
   grenade-launcher places; the hatch, grille and headlamp layout on the hull.  Nothing
   else (stowage, cables, spare links, doors) is drawn, for want of a reference.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the turret sides and the roof tail.  Nodes: "turret" (origin on the ring centre
   at deck level, gun along +X; the gun is fixed in it) and six "roadwheel" groups (one per
   station, both sides).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlz89 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4f5a38", blots: ["#465030", "#59643f"], seed: 89 };
  /* running gear (T3): six wheels in pairs, front sprocket, raised rear idler, three return
     rollers; the track's outer edges at +-1.70 m, the published 3.40 m width */
  var TY = 1.44, TW = 0.25;
  var XW = [1.96, 1.04, 0.34, -0.58, -1.28, -2.20], ZW = 0.38, RW = 0.31;
  var SPR = { x: 2.80, z: 0.62, r: 0.27 }, IDL = { x: -2.90, z: 0.62, r: 0.27 };
  var RRX = [1.50, -0.12, -1.74], RRZ = 0.78, RRR = 0.07;
  /* hull (published length 6.50 m): nose, rear, belly, sponson floor, deck, start of the nose
     curve, lower and upper half widths, the fender's outer edge */
  var NOSE = 3.25, REAR = -3.25, BELLY = 0.40, SPZ = 0.90, DECK = 1.35, NCX = 2.55, HW = 1.14, SW = 1.58, FW = 1.70;
  /* turret: ring centre, tail, front face at the base, roof (published height 2.00 m), half
     width; the gun axis */
  var TX = -1.55, TT = -3.10, TF = 0.00, TROOF = 2.00, THW = 1.40, GZ = 1.74;
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
  /* the rounded bow of the related Type 83 (T3): the deck falls away in a curve from NCX */
  var NP = [[NCX, DECK], [2.90, 1.27], [3.12, 1.13], [NOSE, 0.93]];
  function nz(x) {
    var i, t;
    if (x <= NP[0][0]) return DECK;
    for (i = 0; i + 1 < NP.length; i++) if (x <= NP[i + 1][0]) { t = (x - NP[i][0]) / (NP[i + 1][0] - NP[i][0]); return NP[i][1] + (NP[i + 1][1] - NP[i][1]) * t; }
    return NP[NP.length - 1][1];
  }
  function addHull(B) {
    var s, i, y, ya, yb;
    /* the lower hull between the tracks: belly, the lower nose plate leaning back, the
       rear plate */
    prismY(B.paint, [[REAR, 0.68], [REAR + 0.20, BELLY], [2.85, BELLY], [NOSE, 0.80], [NOSE, SPZ + 0.01], [REAR, SPZ + 0.01]], -HW, HW);
    /* the upper hull over the tracks: a loft of cross-sections with chamfered top edges,
       the flat deck, then the curved bow */
    function sec(x, top) {
      return [[x, -SW, SPZ], [x, SW, SPZ], [x, SW, top - 0.08], [x, SW - 0.08, top], [x, -SW + 0.08, top], [x, -SW, top - 0.08]];
    }
    var L = [sec(REAR, DECK - 0.06), sec(REAR + 0.06, DECK)];
    for (i = 0; i < NP.length; i++) L.push(sec(NP[i][0], NP[i][1]));
    loftN(B.paint, L);
    for (s = -1; s <= 1; s += 2) {
      ya = Math.min(s * SW, s * FW); yb = Math.max(s * SW, s * FW);
      /* the fender over the track, the full length, turned down over the sprocket */
      box(B.paint, REAR + 0.05, 2.70, ya, yb, SPZ, SPZ + 0.03);
      prismY(B.paint, [[2.70, SPZ], [2.70, SPZ + 0.03], [3.05, SPZ - 0.02], [3.28, SPZ - 0.16], [3.30, SPZ - 0.24], [3.24, SPZ - 0.24], [3.20, SPZ - 0.15], [3.02, SPZ - 0.05]], ya, yb);
      box(B.dark, REAR - 0.02, REAR + 0.08, ya, yb, SPZ - 0.28, SPZ);
      /* headlamps in guards on the bow corners, towing eyes on the lower nose */
      y = s * 1.22;
      box(B.paint, 2.92, 3.10, y - 0.14, y + 0.14, nz(3.10), nz(2.92) + 0.10);
      cyl(B.paint, [3.04, y, nz(2.92) + 0.05], [3.15, y, nz(2.92) + 0.05], 0.065, 0.065, 12);
      cyl(B.dark, [3.15, y, nz(2.92) + 0.05], [3.16, y, nz(2.92) + 0.05], 0.055, 0.055, 12);
      cyl(B.dark, [NOSE - 0.10, s * 0.72 - 0.08, 0.72], [NOSE - 0.10, s * 0.72 + 0.08, 0.72], 0.06, 0.06, 8);
      box(B.dark, NOSE - 0.24, NOSE - 0.03, s * 0.72 - 0.07, s * 0.72 + 0.07, 0.66, 0.78);
    }
    /* --- front deck (T2): the driver's hatch front LEFT and the commander's behind it,
       both left of the engine; the engine grille right of centre (layout as T3) --- */
    cylZ(B.paint, 2.15, 0.85, DECK, DECK + 0.07, 0.30, 16);
    box(B.dark, 2.05, 2.25, 0.77, 0.93, DECK + 0.07, DECK + 0.10);
    for (i = -1; i <= 1; i++) box(B.dark, 2.48, 2.56, 0.85 + i * 0.16 - 0.06, 0.85 + i * 0.16 + 0.06, nz(2.56), nz(2.48) + 0.08);
    cylZ(B.paint, 1.35, 0.85, DECK, DECK + 0.07, 0.30, 16);
    for (i = 0; i < 4; i++) {
      var pa = (i + 0.5) / 4 * TAU;
      box(B.dark, 1.35 + Math.cos(pa) * 0.27 - 0.04, 1.35 + Math.cos(pa) * 0.27 + 0.04, 0.85 + Math.sin(pa) * 0.27 - 0.04, 0.85 + Math.sin(pa) * 0.27 + 0.04, DECK + 0.02, DECK + 0.09);
    }
    box(B.paint, 0.95, 2.30, -1.30, -0.15, DECK, DECK + 0.05);
    box(B.dark, 1.02, 2.23, -1.23, -0.22, DECK + 0.05, DECK + 0.06);
    for (i = 0; i < 6; i++) box(B.paint, 1.06 + i * 0.20, 1.10 + i * 0.20, -1.23, -0.22, DECK + 0.05, DECK + 0.075);
    box(B.paint, 0.35, 0.80, -1.25, -0.25, DECK, DECK + 0.03);
    for (i = 0; i < 5; i++) box(B.dark, 0.40 + i * 0.085, 0.44 + i * 0.085, -1.20, -0.30, DECK + 0.03, DECK + 0.045);
    cylZ(B.dark, TX, 0, DECK - 0.01, DECK + 0.03, 1.32, 32);
    /* --- rear plate: tail lamps and towing eyes --- */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, REAR - 0.08, REAR, s * 1.25 - 0.08, s * 1.25 + 0.08, 1.12, 1.24);
      box(B.dark, REAR - 0.08, REAR, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.58, 0.72);
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
  function ring(z, xf, tt, hw, ch) {
    return [[xf, -hw + ch, z], [xf, hw - ch, z], [xf - ch, hw, z], [tt + 0.12, hw, z], [tt, hw - 0.12, z],
            [tt, -hw + 0.12, z], [tt + 0.12, -hw, z], [xf - ch, -hw, z]];
  }
  function addTurret(B) {
    var s, i, k, y;
    /* the low box (T1, T2: the 2.00 m roof): the front face sloped back, the front corners
       cut, the sides leaning in a little, the flat roof */
    loftN(B.paint, [ring(DECK + 0.03, TF - 0.05, TT + 0.05, THW - 0.05, 0.40), ring(DECK + 0.10, TF, TT, THW, 0.40),
                    ring(1.62, TF - 0.10, TT, THW, 0.40), ring(TROOF, TF - 0.55, TT + 0.04, THW - 0.10, 0.35)]);
    /* the gun mantlet round the cradle */
    box(B.paint, TF - 0.20, TF + 0.18, -0.36, 0.36, GZ - 0.24, GZ + 0.20);
    prismY(B.paint, [[TF - 0.20, GZ + 0.20], [TF + 0.18, GZ + 0.20], [TF + 0.08, GZ + 0.26], [TF - 0.30, GZ + 0.26]], -0.36, 0.36);
    for (s = -1; s <= 1; s += 2) {
      y = s * (THW - 0.02);
      /* the team strip along each side */
      box(B.team, -2.30, -1.10, s > 0 ? y : y - 0.012, s > 0 ? y + 0.012 : y, 1.62, 1.72);
      /* the four-tube grenade-launcher bank on each front corner, firing forward and out
         (T1: "2 sets of 4-barrel grenade launchers"; their place is NOT CONFIRMED) */
      for (k = 0; k < 4; k++) {
        var gx = TF - 0.58 - (k % 2) * 0.16, gz = 1.70 + Math.floor(k / 2) * 0.12, gy = s * (THW - 0.10);
        cyl(B.dark, [gx, gy, gz], [gx + 0.26, gy + s * 0.12, gz + 0.06], 0.045, 0.045, 8);
      }
      box(B.paint, TF - 0.82, TF - 0.50, s * (THW - 0.10) - 0.09, s * (THW - 0.10) + 0.09, 1.60, 1.66);
    }
    /* --- roof (T1): the electro-optical sight box front left, the loaders' round hatch
       left rear, the commander's cupola with the 12.7 mm right, the team strip at the tail --- */
    box(B.paint, -0.85, -0.45, 0.55, 0.90, TROOF, TROOF + 0.22);
    box(B.dark, -0.45, -0.43, 0.60, 0.85, TROOF + 0.06, TROOF + 0.17);
    cylZ(B.paint, -2.10, 0.65, TROOF, TROOF + 0.06, 0.32, 16);
    cylZ(B.dark, -2.10, 0.65, TROOF + 0.06, TROOF + 0.08, 0.26, 16);
    var CX = -1.25, CY = -0.70;
    cylZ(B.paint, CX, CY, TROOF, TROOF + 0.12, 0.40, 18);
    cylZ(B.paint, CX, CY, TROOF + 0.12, TROOF + 0.18, 0.32, 18);
    for (i = 0; i < 6; i++) {
      var pa = i / 6 * TAU;
      box(B.dark, CX + Math.cos(pa) * 0.38 - 0.04, CX + Math.cos(pa) * 0.38 + 0.04, CY + Math.sin(pa) * 0.38 - 0.04, CY + Math.sin(pa) * 0.38 + 0.04, TROOF + 0.04, TROOF + 0.10);
    }
    /* the QJC-88 12.7 mm on its pintle at the cupola's front edge, along +X */
    var MX = CX + 0.22, MZ = TROOF + 0.50;
    cylZ(B.dark, MX, CY, TROOF + 0.18, MZ - 0.05, 0.035, 8);
    box(B.dark, MX - 0.45, MX + 0.15, CY - 0.06, CY + 0.06, MZ - 0.05, MZ + 0.08);
    cyl(B.dark, [MX + 0.15, CY, MZ + 0.02], [MX + 1.15, CY, MZ + 0.02], 0.025, 0.022, 8);
    cyl(B.dark, [MX + 1.07, CY, MZ + 0.02], [MX + 1.17, CY, MZ + 0.02], 0.04, 0.04, 8);
    box(B.dark, MX - 0.12, MX + 0.10, CY - 0.22, CY - 0.06, MZ - 0.14, MZ + 0.02);
    box(B.paint, MX - 0.05, MX + 0.03, CY - 0.18, CY + 0.18, MZ - 0.05, MZ + 0.12);
    box(B.team, TT + 0.15, TT + 0.55, -0.30, 0.30, TROOF, TROOF + 0.015);

    /* --- the 122 mm, LEVEL, on the centre line --- */
    /* the barrel at the published 122 mm x L/32 = 3.90 m (T1), brake included: the breech
       face BR 0.55 m inside the turret face, the muzzle MZL; M0 the mantlet front */
    var M0 = TF + 0.18, BR = TF - 0.55, MZL = BR + 3.90, BZ = MZL - 0.48;
    /* the sleeve out of the mantlet, a dark collar */
    cyl(B.paint, [M0 - 0.05, 0, GZ], [M0 + 0.50, 0, GZ], 0.15, 0.14, 18);
    cyl(B.dark, [M0 + 0.50, 0, GZ], [M0 + 0.56, 0, GZ], 0.12, 0.12, 16);
    cyl(B.paint, [M0 + 0.56, 0, GZ], [M0 + 0.95, 0, GZ], 0.08, 0.078, 14);
    /* the fume extractor, tapered both ends */
    cyl(B.paint, [M0 + 0.95, 0, GZ], [M0 + 1.07, 0, GZ], 0.078, 0.125, 16);
    cyl(B.paint, [M0 + 1.07, 0, GZ], [M0 + 1.85, 0, GZ], 0.125, 0.125, 16);
    cyl(B.paint, [M0 + 1.85, 0, GZ], [M0 + 1.97, 0, GZ], 0.125, 0.075, 16);
    /* the tube */
    cyl(B.paint, [M0 + 1.97, 0, GZ], [BZ, 0, GZ], 0.075, 0.072, 14);
    /* the multi-baffle muzzle brake (D-30 style): a slotted body, four rows of side
       windows */
    cyl(B.dark, [BZ, 0, GZ], [MZL - 0.02, 0, GZ], 0.085, 0.085, 14);
    cyl(B.paint, [BZ, 0, GZ], [BZ + 0.08, 0, GZ], 0.12, 0.12, 14);
    for (k = 0; k < 4; k++) cyl(B.paint, [BZ + 0.15 + k * 0.085, 0, GZ], [BZ + 0.19 + k * 0.085, 0, GZ], 0.12, 0.12, 14);
    cyl(B.paint, [MZL - 0.03, 0, GZ], [MZL, 0, GZ], 0.115, 0.115, 14);
    box(B.paint, BZ + 0.08, MZL - 0.03, -0.12, 0.12, GZ + 0.085, GZ + 0.115);
    box(B.paint, BZ + 0.08, MZL - 0.03, -0.12, 0.12, GZ - 0.115, GZ - 0.085);
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

/* len: the measured X extent of the build (the rear plate's lamps -3.33 to the muzzle 3.35) */
UNIT_MODELS["pla_e90_spg"] = { len: 6.68, build: HeroPlz89.build };
