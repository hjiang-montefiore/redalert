/* ========== deu_ifv.js - HERO models: Schuetzenpanzer Marder 1 family and Puma ==========
   One file, two modules:
     HeroMarder  one Marder hull and turret with a VARIANTS table:
       deu_e60_ifv  "m1"  Marder 1 (1971): no MILAN, the remote rear MG3 pod on the rear deck,
                          two firing ports a side, the four-panel skirts with V lower edges,
                          plain olive.
       deu_e80_ifv  "a2"  Marder 1A2: + the MILAN on the turret's right, the rear MG pod gone
                          (en.wiki: the pod was on vehicles "up to and including 1A1"), the
                          ports kept (1A1 and 1A2), Bundeswehr three-colour.
       deu_e90_ifv  "a3"  Marder 1A3 (1988): + the spaced add-on armour (glacis plate with its
                          tile grid, the slightly bulkier turret body), the stowage bins over
                          the upper hull sides with the rail on top, the straight-edged
                          armoured skirt, the ports plated over; three-colour.
     HeroPuma
       deu_e00_ifv        Schuetzenpanzer Puma, protection level C, S1 (Spike launcher).

   References, Wikimedia Commons, cached in scratchpad/q_deuifv_ref:
     D1  "Marder A1.JPG" - a scale side line drawing of a Marder 1A1 from the LEFT (nose left),
         10000 px wide, read at 1800 px: six road wheels, the toothed sprocket in FRONT raised,
         the spoked idler at the rear, the skirts in four panels (joints px 507, 900, 1290; the
         lower edges V-shaped, 0.84 m at the joints, 0.73 m mid-panel), the long glacis, the
         turret body with its vision blocks, the external 20 mm gun housing with the trunnion
         drum, the sight box on its left, the six smoke dischargers, the two round firing
         ports, the tools on the rear hull side, the remote MG pod on the rear deck, the rear
         roof overhang and the ramp leaning in at its top.  SCALE 250 px/m from the published
         6.79 m (nose px 47 to rear plate px 1745); it gives 3.03 m to the sight box top
         against the published 2.98 m.  X = (896 - px)/250, Z = (952 - py)/250.
     P1  "SPz Marder, PzGrenBtl 362 Walldurn, in Lauda, 1973 (3).jpg" - an early Marder dead
         side-on from the left: no MILAN, the rear MG pod, the ports, the skirts, period paint.
     P2  "ILU der Bundeswehr am 24.09.2012 -- Marder AT (cropped).jpg" - a 1A3 near side-on
         from the left: the bins band (Z 1.32-1.88) and the armoured skirt (0.85-1.32), the
         MILAN on the turret, three-colour.
     P3  "ILU der Bundeswehr am 24.09.2012 -- Marder vorne.jpg" - a 1A3 from the front right:
         the glacis tile grid, the driver's hatch front LEFT, the headlamps in guards, the
         MILAN on the turret's RIGHT, the sight box on its left, the roof-edge bins.
     P4  "Schuetzenpanzer Marder 1 A3 von hinten.jpg" - a 1A3 head-on from behind: the ramp
         (about 1.1 m wide), the radiator grilles either side of it, the rear lamps.
     P5  "Marder Turm.jpg" (museum turret: the gun housing, smoke dischargers, MILAN), P6
         "BW 1984 HamburgUebung 001.jpg" (1984: MILAN on the turret's right by the
         commander, the V-edged skirts, the driver's hatch front left, plain paint), P7
         "Munster 2022 - Panzermuseum - Marder IFV - by-RaBoe 111.jpg" (1A3, three-colour).
     Q1  "Schuetzenpanzer Puma (49919690567).jpg" (Bundeswehr 2020) - Puma side-on from the
         LEFT: hull 7.37 m nose to the side modules' end at 112 px/m, turret box X -0.02 to
         -3.13, roof 3.10 m, the PERI head 3.56 m, the module bands (2.24 / 1.64 / 1.13 / 0.84
         / 0.55 m), the rear baskets, the eight-hole gun jacket, the smoke dischargers.
     Q2  "Puma, first series.jpg" - front left 3/4: the boat bow, the driver's hatch front left,
         the engine grille at the front right, the lamp guards, three-colour.
     Q3  "IFV Puma 2015 (19727694195).jpg" - right front 3/4: six road wheels, the raised front
         sprocket, the louvred engine grille on the right front side, the dischargers.
     Q4  "Schuetzenpanzer Puma (49918888598).jpg" - side-on from the RIGHT: the grille from X
         0.59 to 2.09, the deck falling in two slopes to the nose, the gun cradle standing
         ahead of the turret box.
     Q5  "Puma (48072698536).jpg" - head-on (far): the turret's middle 0.57 m LEFT of the
         hull's, the gun on the turret's right on the centre line, the 0.5 m tracks.
     Q6  "Schuetzenpanzer Puma.jpg" (mobility test hull, no armour): six wheels, front sprocket.
     P8  "MELLS launcher on PUMA 1.jpg" - the Spike launcher box on its post at the turret side.
   Published: en.wiki "Marder (infantry fighting vehicle)": 6.79 x 3.24 x 2.98 m; six road
   wheels, FRONT sprocket, rear idler, three return rollers; driver front left, engine on his
   right; two-man turret, commander right; six 76 mm smoke dischargers; the remote rear MG3
   to the 1A1; MILAN fitted 1977-79; ports on 1A1/1A2 only, plated over on the 1A3 with the
   outside stowage boxes; ramp, radiators either side of it.  en.wiki "Puma (German infantry
   fighting vehicle)": 7.4 m (KNDS), 3.7 m base / 4.0 m up-armoured, 3.1 m turret roof, 3.6 m
   optics; six road wheels, 500 mm track, engine at the front; turret on the LEFT, the cannon
   on its right on the hull axis; Spike LR mounts on the turret's right.  The brief's 7.6 m /
   3.9 m (level C) / 3.6 m.
   Evidence on the Puma's length (settled at one station): Q1 at the vertical scale that puts
   its roof at the published 3.1 m (112 px/m, the ground fixed from the side-module bands'
   ratio to the ground in Q3 at one station) gives the hull 7.37 m and the PERI 3.56 m (pub.
   3.6): so the hull is KNDS's 7.4 m and the rear baskets (Q1, Q4) take it to the 7.6 m.
   Evidence on the Marder road wheel: D1 draws it 0.645 m on a 0.785 m pitch (ratio 0.82);
   at the wheel row P1 gives 103 / 117 px = 0.88 and P2 115 / 123 = 0.93; the pitch agrees
   with the hull length in D1 and P1 (8.66 and 8.46 pitches), so the pitch stands and the
   wheel is drawn 0.70 m from P1's ratio.
   CORRECTIONS against the generic models: the Marder was a slab box with a flat front and
   seven small wheels per side, it is now D1's long glacis, the six wheels with front
   sprocket and rear idler, the external gun housing and the period parts per row; the Puma
   was the same box, it is now the boat bow, the module bands, the left-hand turret with the
   gun on the centre line, the engine grille right front and the rear baskets.

   Recognition list (each drawn; source):
     1. long shallow glacis, flat roof, six wheels, raised front sprocket - D1, P1, P2
     2. Marder 1/1A2: four skirt panels with V lower edges, the two round ports - D1, P1
     3. Marder 1: the remote MG pod on the rear deck - D1, P1; 1A2/1A3: the MILAN - P2, P3, P6
     4. 1A3: the bins band, the straight armoured skirt, the glacis tile grid - P2, P3, P7
     5. the low turret body, the tall external gun housing, the sight box left - D1, P5
     6. Puma: the boat bow, the riveted module bands, the skirt rails - Q1-Q4
     7. Puma: the turret box on the left, the gun on the centre line, the PERI - Q1, Q5
     8. Puma: the engine grille right front, the rear baskets, the Spike box - Q3, Q4, P8
   Paint: Marder 1 plain Gelboliv (P1 and P6 are monochrome prints with no patch edges; the
   hue as the Leopard 1 hero takes it, #4c4b36).  1A2 and 1A3 and the Puma in the
   Bundeswehr three-colour, drawn as the Leopard 2 hero draws it (green #4f5a3e, brown
   #5d4636, black #23261f; P2, P3, P7, Q1-Q4 all show it).  No crosses, numbers or plates.
   NOT CONFIRMED (proportion or judgement, no drawing or figure):
     - the 1A2 paint: no 1A2 photograph was reachable; P6 (1984, MILAN, probably a 1A1) is
       plain; three-colour is drawn because the 1A2 programme ran into the three-colour years;
     - the Marder widths: hull 3.12 m, skirts 3.24 (published), the 1A3 3.38 m over the bins
       and skirts; the turret body (1.7 m at the foot, 1.4 m at the roof) from P3's ratio;
       the turret on the centre line (P3 hints 0.2 m right, too weak to draw);
     - the rear MG pod's place across the deck (centre line), the hatch layout on the roof,
       the 1A3 bins' height above the roof (to 1.95 m), the 1A3 turret armour (+0.06 m);
     - the Marder return rollers (published three; behind the skirts, placed over the gaps);
     - Puma: the core hull width (3.44 m) inside the 3.9 m modules, the turret's widths (Q5,
       far), the turret ring at X -1.45, the Spike box's size and its post (P8 shows no
       turret context; drawn on the right per en.wiki), the sprocket and idler stations, the
       0.74 m wheels, no return rollers drawn; the gun: Q1 read raw puts the muzzle 1.7 m
       ahead of the hull centre, Q4 about 2.4 m (Q4 shows the cradle 0.85 m ahead of the
       box, Q1 not); drawn 2.2 m with the cradle 0.55 m ahead of the box.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the rear deck and the turret roof.  Nodes: "turret" (origin on the ring at the
   roof, gun along +X; the Puma's ring 0.55 m left of the centre line) and six "roadwheel"
   groups (axle along local Y, both sides).
   Drawn: Marder 1 6.94 x 3.25 x 3.01 m (the MG pod's barrel aft; hull 6.79), 1A2 6.88 x
   3.25 x 3.20 (MILAN top), 1A3 6.88 x 3.39 x 3.20; Puma 7.60 x 3.95 x 3.56 m (hull 7.40).
   Draw calls 14 each: hull 3 + running gear 2 + 6 wheels + turret 3.
   Engine: the Marder and the Puma carry it at the FRONT, which is damage3d.js's default
   for role "ifv"; no ENGINE_AT entry is needed.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMarder = (function () {
  "use strict";
  var TAU = Math.PI * 2;

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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
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
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* PAINTS: plain Gelboliv (the Leopard 1 hero's RAL 6014), or the Bundeswehr three-colour
     drawn as the Leopard 2 hero draws it (large hard-edged brown and black patches) */
  var PAINTS = {
    olive: { key: "olive", base: "#4c4b36", blots: ["#55543c", "#44432f"], seed: 1971 },
    flecktarn3: { key: "flecktarn3", base: "#4f5a3e", brown: "#5d4636", black: "#23261f", seed: 1988 },
    puma3: { key: "puma3", base: "#4f5a3e", brown: "#5d4636", black: "#23261f", seed: 2015 }
  };
  var _tex = {};
  function paintTex(THREE, P) {
    if (_tex[P.key] !== undefined) return _tex[P.key];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      if (P.brown) {
        var patch = function (col, cx, cy, rx, ry, rr) {
          var j, a, px, py;
          q.fillStyle = col; q.beginPath();
          for (j = 0; j < rr.length; j++) {
            a = j / rr.length * TAU; px = cx + Math.cos(a) * rx * rr[j]; py = cy + Math.sin(a) * ry * rr[j];
            if (j === 0) q.moveTo(px, py); else q.lineTo(px, py);
          }
          q.closePath(); q.fill();
        };
        /* each patch is drawn at the tile wraps too, so the pattern repeats without seams */
        var cols = [P.brown, P.black, P.brown, P.black, P.black, P.brown, P.black];
        for (i = 0; i < 7; i++) {
          var cx = R() * S, cy = R() * S, rx = 70 + R() * 70, ry = 38 + R() * 46, dx, dy, rr = [], n = 7 + ((R() * 4) | 0);
          for (k = 0; k < n; k++) rr.push(0.65 + R() * 0.45);
          for (dx = -1; dx <= 1; dx++) for (dy = -1; dy <= 1; dy++) patch(cols[i], cx + dx * S, cy + dy * S, rx, ry, rr);
        }
      } else {
        for (k = 0; k < P.blots.length; k++) {
          q.fillStyle = P.blots[k];
          for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
        }
        q.globalAlpha = 1;
      }
      for (i = 0; i < 6; i++) {                 /* weld seams and plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(18,20,14,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
      }
      for (i = 0; i < 120; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(220,210,180,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 34, 2 + R() * 22);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.key] = t;
    return t;
  }
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
  /* f(x, y, z) -> [x, y, z] remaps every vertex before upload (the turret onto its ring) */
  function flush(THREE, group, B, f) {
    var k, b, geo, j, q;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (f) for (j = 0; j < b.P.length; j += 3) { q = f(b.P[j], b.P[j + 1], b.P[j + 2]); b.P[j] = q[0]; b.P[j + 1] = q[1]; b.P[j + 2] = q[2]; }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* a box on side s (+1 left, -1 right) between the distances a and b from the centre line */
  function sbox(bin, x0, x1, s, a, b, z0, z1) { box(bin, x0, x1, Math.min(s * a, s * b), Math.max(s * a, s * b), z0, z1); }

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
  /* the track belt round the wheels, the FRONT drive sprocket, the rear idler, the return
     rollers (if any) and the swing-arm bosses; G holds one vehicle's running-gear stations */
  function addRunning(B, G) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], TO = 0.035;
    for (i = 0; i < G.XW.length; i++) C.push([G.XW[i], G.ZW, G.RW + TO]);
    for (i = 0; i < G.RR.length; i++) C.push([G.RR[i], G.RRZ, G.RRR + TO]);
    C.push([G.IDL.x, G.IDL.z, G.IDL.r + TO], [G.SPR.x, G.SPR.z, G.SPR.r + TO]);
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
    cnt = Math.round(tot / G.LINK); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - G.TW, y + G.TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the shoes with their rubber pads, the end connectors, the centre guide horns */
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - G.TW - 0.01, y + G.TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.03 - dz * 0.06, pz - dz * 0.03 + dx * 0.06, px + dx * 0.03 - dz * 0.06, pz + dz * 0.03 + dx * 0.06, y - 0.03, y + 0.03, 0.05);
      }
      /* the toothed drive sprocket at the FRONT, raised (D1, P1, Q3, Q6) */
      cylY(B.dark, G.SPR.x, y - 0.12, y + 0.12, G.SPR.z, G.SPR.r - 0.05, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [G.SPR.x + ca * (G.SPR.r - 0.02), y, G.SPR.z + sa * (G.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.045, 0.11, 0.03);
      }
      cylY(B.paint, G.SPR.x, y + s * 0.12, y + s * 0.18, G.SPR.z, 0.16, 14);
      cylY(B.dark, G.SPR.x, y + s * 0.18, y + s * 0.21, G.SPR.z, 0.07, 10);
      /* the idler at the rear: twin discs with the lightening holes (D1) */
      [-0.11, 0.11].forEach(function (dy) { cylY(B.paint, G.IDL.x, y + dy - 0.07, y + dy + 0.07, G.IDL.z, G.IDL.r, 18); });
      cylY(B.dark, G.IDL.x, y - 0.05, y + 0.05, G.IDL.z, G.IDL.r - 0.06, 14);
      cylY(B.dark, G.IDL.x, y + s * 0.18, y + s * 0.22, G.IDL.z, 0.09, 10);
      for (i = 0; i < G.RR.length; i++) {
        cylY(B.paint, G.RR[i], y - 0.16, y + 0.16, G.RRZ, G.RRR, 12);
        cylY(B.dark, G.RR[i], y + s * 0.16, y + s * 0.20, G.RRZ, 0.04, 8);
      }
      /* the hull's swing-arm bosses ahead of each wheel (the arms trail) */
      for (i = 0; i < G.XW.length; i++) cylY(B.dark, G.XW[i] + 0.24, s * (G.LW - 0.02), s * (G.LW + 0.08), G.ZW + 0.10, 0.08, 8);
    }
  }
  /* road wheel: dual rubber-tyred discs, the dished face with its bolt circle and the hub;
     axle along Y, both sides; coloured through vertex colours (tyre, painted disc, holes) */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addWheel(W, G, P) {
    var s, y, i, a, dy, c = P.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3], off = G.TW * 0.5, hw = G.TW * 0.32, R = G.RW;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (dy = -1; dy <= 1; dy += 2) {
        var yc = y + dy * off;
        W.col = TYRE;
        cylY(W, 0, yc - hw, yc + hw, 0, R, 20);
        W.col = BODY;
        cylY(W, 0, yc - hw - 0.005, yc + hw + 0.005, 0, R - 0.055, 20);
      }
      var yf = y + s * (off + hw + 0.005);
      W.col = BODY;
      cyl(W, [0, yf, 0], [0, yf + s * 0.025, 0], R - 0.055, 0.17, 22);
      W.col = HOLE;
      for (i = 0; i < 10; i++) {
        a = i / 10 * TAU;
        box(W, Math.cos(a) * (R * 0.58) - 0.014, Math.cos(a) * (R * 0.58) + 0.014, Math.min(yf + s * 0.015, yf + s * 0.027), Math.max(yf + s * 0.015, yf + s * 0.027), Math.sin(a) * (R * 0.58) - 0.014, Math.sin(a) * (R * 0.58) + 0.014);
      }
      W.col = RIB;
      cylY(W, 0, yf + s * 0.02, yf + s * 0.055, 0, 0.11, 12);
      W.col = HOLE;
      cylY(W, 0, yf + s * 0.055, yf + s * 0.07, 0, 0.045, 8);
    }
  }
  function addGearGroups(THREE, g, T, G, P) {
    var RB = bins(T), i, WB, wg;
    addRunning(RB, G);
    flush(THREE, g, RB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, G, P);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.XW[i], 0, G.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
  }

  /* =================================================================== MARDER */
  /* VARIANTS: mark 0 Marder 1 (1971), 1 Marder 1A2, 2 Marder 1A3 */
  var VARIANTS = {
    m1:  { mark: 0, pod: true,  ports: true,  milan: false, a3: false, paint: "olive" },
    a2:  { mark: 1, pod: false, ports: true,  milan: true,  a3: false, paint: "flecktarn3" },
    a3:  { mark: 2, pod: false, ports: false, milan: true,  a3: true,  paint: "flecktarn3" }
  };
  /* running gear (D1 at 250 px/m, wheel size from P1/P2): six wheels at an even 0.785 m pitch,
     the sprocket in FRONT raised, the idler at the rear, three return rollers behind the skirts */
  var MG = { TY: 1.32, TW: 0.225, LW: 1.08, XW: [2.032, 1.248, 0.464, -0.320, -1.108, -1.892], ZW: 0.44, RW: 0.35,
             SPR: { x: 2.88, z: 0.736, r: 0.25 }, IDL: { x: -2.708, z: 0.736, r: 0.30 },
             RR: [1.64, 0.072, -1.50], RRZ: 0.87, RRR: 0.09, LINK: 0.16 };
  /* hull (D1): nose apex, roof, sponson floor, upper hull and lower hull half widths, belly */
  var MN = 3.392, MROOF = 1.876, MSB = 1.10, MHW = 1.56, MLW = 1.08, MBELLY = 0.45, MSK = 1.62, MSK3 = 1.69;
  var MTX = -0.05;              /* turret ring centre (D1: midway along the turret body's foot) */
  function mgz(x) { return MROOF - (x - 0.764) * (0.5 / 2.30); }     /* the upper glacis */

  function addMarderHull(B, V) {
    var P = B.paint, D = B.dark, s, i, x, y, z, k;
    /* lower hull between the tracks: belly 0.45 m (published clearance), the lower nose plate */
    prismY(P, [[-3.18, MSB], [-3.36, 0.62], [-3.10, MBELLY], [2.60, MBELLY], [3.00, 0.70], [MN, 1.04], [3.36, MSB]], -MLW, MLW);
    /* upper hull over the tracks: the long upper glacis from the nose plate to the roof at
       X 0.76 (D1 px 130-705), the flat roof, the rear plate's upper part (D1) */
    prismY(P, [[-3.18, MSB], [-3.18, MROOF], [0.764, MROOF], [3.064, 1.376], [3.336, 1.136], [3.36, MSB]], -MHW, MHW);
    /* the rear roof overhang, leaning out above the ramp (D1 px 1690-1745) */
    prismY(P, [[-3.18, 1.27], [-3.18, MROOF], [-3.30, MROOF], [-3.40, 1.63]], -MHW, MHW);
    /* the ramp, hinged low and leaning in at its top (D1; P4 head-on: 1.1 m wide) */
    var ru = unit([0.22, 0, 0.64]), rw = unit([-0.64, 0, 0.22]);
    slab(P, [-3.31, 0, 0.94], ru, [0, 1, 0], rw, 0.335, 0.56, 0.03);
    slab(D, [-3.335, 0, 0.94], ru, [0, 1, 0], rw, 0.30, 0.60, 0.012);
    cylY(D, -3.40, -0.50, 0.50, 0.62, 0.05, 10);
    /* the cooling radiator grilles either side of the ramp (en.wiki; P4) */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 6; k++) {
        z = 0.72 + k * 0.09;
        x = -3.40 + (z - 0.62) * 0.22 / 0.64;
        sbox(D, x - 0.035, x + 0.005, s, 0.66, 1.06, z, z + 0.035);
      }
      /* rear lamp clusters at the top corners (D1, P4) */
      sbox(D, -3.47, -3.38, s, 1.20, 1.46, 1.42, 1.60);
      /* towing hooks at the rear foot */
      sbox(D, -3.48, -3.30, s, 0.80, 0.92, 0.62, 0.74);
    }
    /* the driver's hatch on the glacis, front LEFT (en.wiki), with its three periscopes (D1) */
    var gu = unit([2.30, 0, -0.5]), gw = unit([0.5, 0, 2.30]);
    slab(P, [1.98, 0.78, mgz(1.98) + 0.03], gu, [0, 1, 0], gw, 0.30, 0.28, 0.03);
    box(D, 2.22, 2.28, 0.58, 0.98, mgz(2.25) + 0.02, mgz(2.25) + 0.10);
    if (V.a3) {
      /* 1A3: the spaced add-on plate over the glacis with its tile grid (P3) */
      slab(P, [1.95, 0, mgz(1.95) + 0.05], gu, [0, 1, 0], gw, 1.02, 1.42, 0.035);
      for (k = 0; k < 6; k++) {
        x = 1.05 + k * 0.36;
        slab(D, [x, 0, mgz(x) + 0.088], gu, [0, 1, 0], gw, 0.012, 1.40, 0.004);
      }
      for (k = -3; k <= 3; k++) {
        if (Math.abs(k * 0.40 - 0.78) < 0.30) continue;   /* the driver's hatch */
        slab(D, [1.95, k * 0.40, mgz(1.95) + 0.088], gu, [0, 1, 0], gw, 1.0, 0.012, 0.004);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      /* headlamps in their guards at the glacis foot corners (P3, P5) */
      var hx = 3.02, hy = s * 1.24, hz = mgz(hx) + 0.02;
      cyl(P, [hx - 0.08, hy, hz + 0.10], [hx + 0.04, hy, hz + 0.10], 0.075, 0.08, 12);
      cyl(D, [hx + 0.04, hy, hz + 0.10], [hx + 0.05, hy, hz + 0.10], 0.065, 0.065, 12);
      box(D, hx - 0.10, hx + 0.08, hy - 0.13, hy - 0.11, hz, hz + 0.20);
      box(D, hx - 0.10, hx + 0.08, hy + 0.11, hy + 0.13, hz, hz + 0.20);
      box(D, hx + 0.06, hx + 0.08, hy - 0.13, hy + 0.13, hz + 0.18, hz + 0.20);
      /* towing eyes on the nose (D1) */
      sbox(D, 3.28, 3.40, s, 0.68, 0.80, 0.90, 1.00);
      y = s * MHW;
      if (!V.a3) {
        /* Marder 1 / 1A2: the skirts in four panels, each lower edge a shallow V, top rail at
           1.30 m, joints at D1 px 507, 900, 1290; outer face at 3.24 m published */
        var J = [3.124, 1.556, -0.016, -1.576, -3.148];
        for (k = 0; k < 4; k++) {
          var xa = J[k], xb = J[k + 1], xm = (xa + xb) / 2;
          prismY(P, [[xa, 0.84], [xm, 0.73], [xm, 1.30], [xa, 1.30]], s > 0 ? MHW : -MSK, s > 0 ? MSK : -MHW);
          prismY(P, [[xm, 0.73], [xb, 0.84], [xb, 1.30], [xm, 1.30]], s > 0 ? MHW : -MSK, s > 0 ? MSK : -MHW);
          if (k > 0) sbox(D, xa - 0.012, xa + 0.012, s, MSK - 0.004, MSK + 0.004, 0.85, 1.28);
        }
        sbox(P, -3.16, 3.14, s, MHW - 0.02, MSK, 1.28, 1.31);
        /* the bolt row along the top of the skirts (D1) */
        for (x = 3.0; x > -3.1; x -= 0.52) sbox(D, x - 0.02, x + 0.02, s, MSK, MSK + 0.005, 1.23, 1.26);
        /* the tow cable along the hull side over the skirts (D1 hatched band) */
        cyl(D, [2.25, s * (MHW + 0.03), 1.36], [-2.95, s * (MHW + 0.03), 1.36], 0.024, 0.024, 6);
        /* the tools on the rear hull side: the long-handled tools in their clamps (D1) */
        cyl(D, [-1.95, s * (MHW + 0.03), 1.73], [-3.12, s * (MHW + 0.03), 1.73], 0.025, 0.025, 6);
        sbox(P, -2.95, -3.15, s, MHW, MHW + 0.06, 1.60, 1.82);
        cyl(D, [-1.95, s * (MHW + 0.03), 1.55], [-3.00, s * (MHW + 0.03), 1.55], 0.03, 0.03, 6);
        sbox(P, -1.95, -2.25, s, MHW, MHW + 0.06, 1.48, 1.62);
      } else {
        /* 1A3: the stowage bins over the upper hull side, their front edge following the
           glacis, the lid lines and the rail on top (P2, P3), the straight-edged armoured
           skirt below (P2); 3.38 m over them (NOT CONFIRMED) */
        prismY(P, [[-3.20, 1.32], [2.95, 1.32], [2.95, 1.46], [0.70, 1.95], [-3.20, 1.95]], s > 0 ? MHW : -MSK3, s > 0 ? MSK3 : -MHW);
        sbox(D, -3.18, 2.0, s, MSK3, MSK3 + 0.006, 1.60, 1.625);
        sbox(D, -3.18, 0.85, s, MSK3, MSK3 + 0.006, 1.84, 1.86);
        for (x = 1.75; x > -3.2; x -= 0.95) sbox(D, x - 0.01, x + 0.01, s, MSK3, MSK3 + 0.006, 1.33, Math.min(1.94, 1.94 - (x - 0.70) * 0.49 / 2.25));
        sbox(D, -3.15, 0.70, s, MSK3 - 0.10, MSK3 - 0.06, 1.95, 2.01);
        box(P, -3.20, 3.10, s > 0 ? MHW : -MSK3, s > 0 ? MSK3 : -MHW, 0.85, 1.32);
        for (x = 1.556; x > -3.0; x -= 1.572) sbox(D, x - 0.012, x + 0.012, s, MSK3, MSK3 + 0.005, 0.86, 1.31);
        sbox(D, -3.20, 3.10, s, MSK3, MSK3 + 0.005, 1.29, 1.32);
      }
      /* the firing ports, two a side on the rear hull (D1, P1; Marder 1 to 1A2, en.wiki) */
      if (V.ports) {
        [-1.228, -1.688].forEach(function (px) {
          cylY(P, px, y, y + s * 0.04, 1.59, 0.09, 16);
          cylY(D, px, y + s * 0.04, y + s * 0.06, 1.59, 0.05, 10);
        });
      }
    }
    /* the rear troop hatches on the roof (D1 handles) */
    [[-1.02, -1.62], [-1.72, -2.28]].forEach(function (h) {
      for (s = -1; s <= 1; s += 2) {
        sbox(P, h[1], h[0], s, 0.15, 0.90, MROOF, MROOF + 0.03);
        sbox(D, (h[0] + h[1]) / 2 - 0.08, (h[0] + h[1]) / 2 + 0.08, s, 0.70, 0.74, MROOF + 0.03, MROOF + 0.07);
      }
    });
    if (V.pod) {
      /* Marder 1: the remote rear MG3 in its pod on the rear deck, firing aft (en.wiki; D1
         px 1460-1780, P1): the mount on its hatch, the pivot arm, the pod, the barrel */
      box(P, -3.22, -2.32, -0.42, 0.42, MROOF, 1.97);
      box(P, -2.86, -2.70, -0.09, 0.09, 1.97, 2.30);
      prismY(P, [[-2.26, 2.30], [-2.36, 2.44], [-3.10, 2.45], [-3.22, 2.38], [-3.22, 2.29], [-2.40, 2.27]], -0.16, 0.16);
      box(D, -2.60, -2.40, -0.17, -0.16, 2.33, 2.42);
      cylX(D, -3.22, -3.48, 0, 2.36, 0.022, 0.022, 8);
      cylX(D, -3.48, -3.54, 0, 2.36, 0.032, 0.032, 8);
    }
    /* team colour: two strips on the rear deck */
    for (s = -1; s <= 1; s += 2) sbox(B.team, -2.95, -2.50, s, 0.55, 1.15, MROOF, MROOF + 0.015);
  }

  /* the Marder turret: built in model coordinates, moved onto the ring at flush */
  function addMarderTurret(B, V) {
    var P = B.paint, D = B.dark, s, i, k, b = V.a3 ? 0.06 : 0, GY = -0.04, GZ = 2.61;
    /* the low armoured body (D1 px 705-1100, roof 2.24 m; width from P3's ratio) */
    function ring(z, xf, xc, xr, hwf, hw, hwr) {
      return [[xf, -hwf, z], [xc, -hw, z], [-0.70, -hw, z], [xr, -hwr, z], [xr, hwr, z], [-0.70, hw, z], [xc, hw, z], [xf, hwf, z]];
    }
    loftN(P, [ring(MROOF, 0.70 + b, 0.42, -0.80 - b, 0.55, 0.85 + b, 0.62), ring(2.24, 0.42 + b, 0.22, -0.80 - b, 0.45, 0.70 + b, 0.52)]);
    /* vision blocks round the body (D1 px 820-960) */
    for (s = -1; s <= 1; s += 2) {
      [0.24, 0.04, -0.20].forEach(function (vx) { sbox(D, vx - 0.06, vx + 0.06, s, 0.71 + b, 0.79 + b, 2.10, 2.18); });
    }
    /* the gunner's periscope housing front left (D1 px 840-930) */
    box(P, -0.14, 0.22, 0.10, 0.55, 2.24, 2.40);
    box(D, 0.22, 0.23, 0.14, 0.51, 2.28, 2.36);
    /* the commander's hatch on the right with its periscope ring (en.wiki) */
    cylZ(P, -0.38, -0.45, 2.24, 2.30, 0.27, 18);
    for (i = 0; i < 8; i++) {
      var pa = i / 8 * TAU;
      box(D, -0.38 + Math.cos(pa) * 0.27 - 0.035, -0.38 + Math.cos(pa) * 0.27 + 0.035, -0.45 + Math.sin(pa) * 0.27 - 0.035, -0.45 + Math.sin(pa) * 0.27 + 0.035, 2.26, 2.32);
    }
    cylZ(P, -0.38, -0.45, 2.30, 2.34, 0.20, 14);
    /* the external gun housing on top: its upright front behind the smoke dischargers, the
       trunnion drum's round cover on the left, the feed bulge at the rear (D1 px 930-1170) */
    prismY(P, [[-0.14, 2.24], [-0.27, 2.45], [-0.27, 2.93], [-0.62, 2.96], [-1.10, 2.85], [-1.08, 2.49], [-0.80, 2.24]], GY - 0.26, GY + 0.26);
    cylY(D, -0.58, GY + 0.26, GY + 0.28, 2.57, 0.24, 20);
    cylY(P, -0.58, GY + 0.28, GY + 0.30, 2.57, 0.20, 18);
    for (i = 0; i < 6; i++) {
      var ba = i / 6 * TAU + 0.3;
      cylY(D, -0.58 + Math.cos(ba) * 0.15, GY + 0.30, GY + 0.31, 2.57 + Math.sin(ba) * 0.15, 0.02, 6);
    }
    /* the sight box on the left of the housing (D1 px 965-1060, P1, P3) */
    box(P, -0.656, -0.276, GY + 0.27, GY + 0.66, 2.61, 3.03);
    box(D, -0.276, -0.266, GY + 0.33, GY + 0.60, 2.86, 2.98);
    box(D, -0.66, -0.27, GY + 0.27, GY + 0.66, 2.74, 2.755);
    /* the 20 mm Rh 202: recoil sleeve, the long thin barrel, the muzzle brake (D1 px 481-870) */
    cylX(D, -0.27, 0.12, GY, GZ, 0.07, 0.065, 12);
    cylX(D, 0.12, 1.54, GY, GZ, 0.03, 0.028, 10);
    cylX(D, 1.54, 1.66, GY, GZ, 0.042, 0.042, 10);
    box(D, 1.57, 1.63, GY - 0.045, GY + 0.045, GZ - 0.012, GZ + 0.012);
    /* the six smoke dischargers, three each side of the gun on the housing front, firing
       forward and up (en.wiki: six 76 mm; D1 px 850-950) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var sz = 2.42 + i * 0.15, sy = GY + s * 0.20, sx = -0.20 - i * 0.02;
        cyl(D, [sx, sy, sz], [sx + 0.17, sy + s * 0.05, sz + 0.11], 0.045, 0.045, 8);
      }
      box(D, -0.27, -0.10, Math.min(GY + s * 0.14, GY + s * 0.27), Math.max(GY + s * 0.14, GY + s * 0.27), 2.36, 2.42);
    }
    if (V.milan) {
      /* the MILAN on its post on the turret's right, by the commander's hatch (en.wiki; P2:
         the tube 3.14 m up, from 0.29 to 1.38 m ahead of the hull centre; P6) */
      var my = -0.74;
      box(D, -0.06, 0.06, my - 0.03, my + 0.03, 2.24, 2.84);
      box(P, -0.12, 0.22, my - 0.13, my + 0.11, 2.84, 3.06);
      box(D, -0.13, -0.12, my - 0.09, my + 0.07, 2.90, 3.00);
      cylX(P, 0.29, 1.34, my, 3.14, 0.06, 0.06, 12);
      cylX(P, 1.34, 1.40, my, 3.14, 0.075, 0.075, 12);
      cylX(D, 0.24, 0.29, my, 3.14, 0.07, 0.07, 12);
      box(D, 0.10, 0.18, my - 0.02, my + 0.02, 3.06, 3.10);
    }
    /* team colour: strips on the turret roof's rear corners */
    box(B.team, -0.79, -0.70, GY + 0.30, 0.66, 2.24, 2.255);
    box(B.team, -0.79, -0.70, -0.62, GY - 0.30, 2.24, 2.255);
  }

  function buildMarder(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.a3, P = PAINTS[V.paint], T = materials(THREE, C, P), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), tg;
    addMarderHull(HB, V);
    flush(THREE, g, HB);
    addGearGroups(THREE, g, T, MG, P);
    addMarderTurret(TB, V);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(MTX, 0, MROOF);
    flush(THREE, tg, TB, function (x, y, z) { return [x - MTX, y, z - MROOF]; });
    g.add(tg);
    return g;
  }

  /* ===================================================================== PUMA */
  /* running gear (Q1 at 112 px/m; Q3, Q4): six wheels at 0.77 m, the sprocket in front
     raised, the idler at the rear low; no return rollers seen (the skirts hide the top run) */
  var PG = { TY: 1.33, TW: 0.25, LW: 1.10, XW: [1.57, 0.80, 0.03, -0.74, -1.51, -2.28], ZW: 0.44, RW: 0.37,
             SPR: { x: 2.62, z: 0.82, r: 0.28 }, IDL: { x: -3.15, z: 0.55, r: 0.30 },
             RR: [], RRZ: 0, RRR: 0, LINK: 0.17 };
  /* hull (Q1, Q2): nose, rear plate, roof, sponson floor, hull and lower hull half widths,
     the level-C side modules' outer face (3.9 m published) */
  var PN = 3.70, PRE = -3.70, PROOF = 2.24, PSB = 1.18, PHW = 1.72, PLW = 1.10, PAW = 1.95;
  /* turret ring: on the LEFT of the hull (en.wiki), the gun on the turret's right on the
     centre line; Q5 head-on puts the turret's middle 0.57 m left of the hull's */
  var PTX = -1.45, PTY = 0.55;
  function pgz(x) { return x < 0.60 ? PROOF : x < 2.09 ? PROOF - (x - 0.60) * 0.32 / 1.49 : 1.92 - (x - 2.09) * 0.36 / 1.61; }

  function addPumaHull(B) {
    var P = B.paint, D = B.dark, s, i, k, x, y, z;
    /* lower hull: the long lower glacis (the boat bow, Q2), the belly, the rear plate */
    prismY(P, [[PRE, PSB], [PRE, 0.75], [-3.45, 0.48], [2.40, 0.48], [3.05, 0.90], [3.31, PSB]], -PLW, PLW);
    /* upper hull: the roof to X 0.6, the engine deck falling to the nose (Q2), the nose tip */
    prismY(P, [[PRE, PROOF], [0.60, PROOF], [2.09, 1.92], [PN, 1.56], [3.31, PSB], [PRE, PSB]], -PHW, PHW);
    /* the level-C roof armour: a raised plate over the crew compartment with its seams (en.wiki) */
    box(P, -3.55, 0.45, -1.62, 1.62, PROOF, PROOF + 0.05);
    for (x = -3.05; x < 0.4; x += 0.70) box(D, x - 0.01, x + 0.01, -1.60, 1.60, PROOF + 0.05, PROOF + 0.055);
    /* the driver's hatch front LEFT with its periscopes (Q2) */
    var gu = unit([1.61, 0, -0.36]), gw = unit([0.36, 0, 1.61]);
    slab(P, [2.55, 0.85, pgz(2.55) + 0.04], gu, [0, 1, 0], gw, 0.30, 0.30, 0.04);
    box(D, 2.78, 2.84, 0.62, 1.08, pgz(2.81) + 0.03, pgz(2.81) + 0.12);
    /* the engine air grille across the front right of the deck (Q2) */
    slab(D, [3.30, -0.85, pgz(3.30) + 0.012], gu, [0, 1, 0], gw, 0.24, 0.62, 0.012);
    for (k = 0; k < 6; k++) {
      x = 3.10 + k * 0.08;
      slab(P, [x, -0.85, pgz(x) + 0.03], gu, [0, 1, 0], gw, 0.012, 0.62, 0.012);
    }
    for (s = -1; s <= 1; s += 2) {
      /* the lamp clusters in their guards on the nose corners (Q2, Q3) */
      sbox(P, 3.38, 3.58, s, 1.40, 1.66, 1.42, 1.62);
      sbox(D, 3.58, 3.60, s, 1.45, 1.61, 1.47, 1.58);
      sbox(D, 3.36, 3.62, s, 1.38, 1.40, 1.40, 1.66);
      /* the towing eyes on the lower glacis */
      sbox(D, 3.10, 3.30, s, 0.70, 0.82, 1.00, 1.12);
      y = s * PHW;
      /* the side armour modules: the riveted upper band (0.36 m modules), the plain middle
         band, both following the deck down to the nose (Q1, Q3, Q4) */
      prismY(P, [[PRE + 0.02, 1.13], [3.25, 1.13], [3.62, 1.52], [2.09, 1.88], [0.60, 2.20], [PRE + 0.02, 2.20]],
             s > 0 ? PHW : -PAW, s > 0 ? PAW : -PHW);
      var xe = s > 0 ? 1.67 : 0.59;                 /* the right side has the engine grille there */
      sbox(D, PRE + 0.04, xe, s, PAW, PAW + 0.006, 1.63, 1.655);
      for (x = PRE + 0.38; x < xe; x += 0.36) {
        sbox(D, x - 0.008, x + 0.008, s, PAW, PAW + 0.006, 1.655, Math.min(2.19, pgz(x) - 0.05));
        for (k = 0; k < 2; k++) {
          z = 1.78 + k * 0.22;
          if (z < pgz(x) - 0.08) { sbox(D, x - 0.06, x - 0.03, s, PAW, PAW + 0.015, z, z + 0.03); sbox(D, x + 0.03, x + 0.06, s, PAW, PAW + 0.015, z, z + 0.03); }
        }
      }
      /* the row of lifting points along the module tops (Q1: the paired loops) */
      for (x = PRE + 0.38; x < xe; x += 0.72) sbox(D, x - 0.05, x + 0.05, s, PAW - 0.04, PAW, 2.20, 2.25);
      /* the lower skirt with the stowage rails on it (Q1, Q3) */
      box(P, PRE + 0.02, 3.00, s > 0 ? PHW : -PAW + 0.08, s > 0 ? PAW - 0.08 : -PHW, 0.55, 1.13);
      [0.90, 1.04].forEach(function (rz) { sbox(D, PRE + 0.10, 2.90, s, PAW - 0.02, PAW + 0.01, rz - 0.015, rz + 0.015); });
      for (x = PRE + 0.15; x < 2.95; x += 1.10) sbox(D, x - 0.03, x + 0.03, s, PAW - 0.08, PAW + 0.01, 0.84, 1.12);
      sbox(D, PRE + 0.02, 3.00, s, PAW - 0.08, PAW - 0.075, 0.55, 0.84);
      /* the rear stowage baskets on the corners beside the ramp (Q1, Q3): frames of bar */
      for (k = 0; k < 3; k++) sbox(D, -3.90, PRE, s, 0.95, 1.90, 1.25 + k * 0.45, 1.28 + k * 0.45);
      [0.95, 1.42, 1.90].forEach(function (by) {
        sbox(D, -3.90, -3.87, s, by - 0.015, by + 0.015, 1.25, 2.18);
        sbox(D, -3.90, PRE, s, by - 0.015, by + 0.015, 1.25, 1.28);
      });
      sbox(P, -3.88, PRE, s, 0.98, 1.88, 1.28, 1.40);
      /* rear lamps */
      sbox(D, PRE - 0.06, PRE, s, 0.80, 0.92, 1.85, 2.00);
    }
    /* the engine grille on the RIGHT front side, louvres falling with the deck (Q3, Q4) */
    box(D, 0.62, 2.07, -PAW - 0.006, -PAW + 0.02, 1.66, 2.08);
    for (k = 0; k < 7; k++) {
      z = 1.69 + k * 0.065;
      var x1 = Math.min(2.05, 0.60 + (2.20 - z - 0.04) * 1.49 / 0.32);
      if (x1 > 0.66) box(P, 0.64, x1, -PAW - 0.03, -PAW, z, z + 0.022);
    }
    /* the rear ramp, closed (Q1 shows it lowered), its frame and hinge */
    box(P, PRE - 0.05, PRE, -0.78, 0.78, 0.62, 2.06);
    box(D, PRE - 0.06, PRE - 0.05, -0.70, 0.70, 0.70, 0.73);
    box(D, PRE - 0.06, PRE - 0.05, -0.70, 0.70, 1.96, 1.99);
    cylY(D, PRE - 0.04, -0.70, 0.70, 0.62, 0.05, 10);
    /* team colour: two strips on the rear roof */
    for (s = -1; s <= 1; s += 2) sbox(B.team, -3.40, -3.00, s, 0.75, 1.40, PROOF + 0.05, PROOF + 0.065);
  }

  /* the unmanned turret: built in model coordinates, moved onto its ring at flush (Q1 at
     112 px/m: X -0.02 to -3.13, box from 2.42 to the 3.10 m roof; Q5 the widths) */
  function addPumaTurret(B) {
    var P = B.paint, D = B.dark, s, i, k, x, GZ = 2.75;
    /* the pedestal and basket under the overhanging box */
    box(P, -2.80, -0.40, -0.05, 1.15, PROOF + 0.05, 2.44);
    /* the main box on the left: chamfered roof edges */
    function rg(x, y0, y1, z0, z1, c) {
      return [[x, y0, z0], [x, y1, z0], [x, y1, z1 - c], [x, y1 - c, z1], [x, y0 + c, z1], [x, y0, z1 - c]];
    }
    loftN(P, [rg(-0.02, 0.20, 1.45, 2.42, 3.04, 0.06), rg(-0.14, 0.20, 1.45, 2.42, 3.10, 0.06), rg(-3.13, 0.20, 1.45, 2.42, 3.10, 0.06)]);
    /* the lower gun housing on the right (Q5: the right part stands lower) */
    loftN(P, [rg(0.08, -0.32, 0.22, 2.42, 2.90, 0.05), rg(-2.70, -0.32, 0.22, 2.42, 2.96, 0.05)]);
    /* the add-on plates' bolt rows on the box sides (Q1, Q4) */
    for (x = -0.40; x > -3.0; x -= 0.52) {
      for (k = 0; k < 2; k++) {
        box(D, x - 0.02, x + 0.02, 1.45, 1.465, 2.62 + k * 0.28, 2.66 + k * 0.28);
        box(D, x - 0.02, x + 0.02, -0.335, -0.32, 2.58 + k * 0.24, 2.62 + k * 0.24);
      }
    }
    /* the gunner's sight window in the box face, the MUSS sensor heads on its corners (Q2, Q5) */
    box(D, -0.03, -0.01, 0.62, 0.98, 2.70, 2.90);
    box(D, -0.06, 0.02, 1.32, 1.46, 2.94, 3.06);
    box(D, 0.06, 0.12, -0.30, -0.18, 2.78, 2.88);
    /* the 30 mm MK30-2: the cradle standing ahead of the box (Q4), the perforated jacket (eight
       holes, Q1, Q4), the barrel and the muzzle device; muzzle 2.2 m ahead of the hull centre
       (Q1 and Q4 disagree: 1.7 and 2.4 m read raw; see NOT CONFIRMED) */
    box(P, -0.02, 0.55, -0.16, 0.16, 2.58, 2.92);
    cylX(P, 0.55, 1.62, 0, GZ, 0.085, 0.075, 14);
    for (i = 0; i < 8; i++) {
      var hx = 0.64 + i * 0.12, hr = 0.036 - i * 0.002;
      cylY(D, hx, -0.09, 0.09, GZ, hr, 8);
    }
    cylX(D, 1.62, 2.08, 0, GZ, 0.042, 0.042, 10);
    cylX(D, 2.08, 2.20, 0, GZ, 0.07, 0.07, 12);
    cylX(D, 2.00, 2.08, 0, GZ, 0.05, 0.05, 10);
    /* the commander's PERI RTWL on the roof, its head to the published 3.6 m (Q1, Q4) */
    box(P, -2.10, -1.55, 0.45, 0.95, 3.10, 3.40);
    box(P, -2.02, -1.62, 0.50, 0.90, 3.40, 3.56);
    box(D, -1.62, -1.60, 0.55, 0.85, 3.43, 3.53);
    /* the smoke dischargers: a column of four on each rear flank (Q1, Q3, Q4) */
    for (s = -1; s <= 1; s += 2) {
      var yb = s > 0 ? 1.45 : -0.32;
      box(D, -2.48, -2.22, Math.min(yb, yb + s * 0.06), Math.max(yb, yb + s * 0.06), 2.48, 3.02);
      for (k = 0; k < 4; k++) {
        var tz = 2.56 + k * 0.13;
        cyl(D, [-2.35, yb + s * 0.06, tz], [-2.30, yb + s * 0.16, tz + 0.02], 0.05, 0.05, 8);
      }
    }
    /* the Spike LR (MELLS) launcher box on its post on the turret's right (en.wiki; P8) */
    box(D, -1.95, -1.65, -0.48, -0.32, 2.48, 2.62);
    prismY(P, [[-1.15, 2.62], [-2.55, 2.62], [-2.55, 3.02], [-1.32, 3.02], [-1.15, 2.86]], -0.92, -0.48);
    box(D, -2.30, -1.55, -0.925, -0.92, 2.70, 2.92);
    /* team colour: strips on the turret roof */
    box(B.team, -2.95, -2.65, 0.30, 1.35, 3.10, 3.115);
    box(B.team, -0.75, -0.45, 0.30, 1.35, 3.10, 3.115);
  }

  function buildPuma(THREE, M, C) {
    var P = PAINTS.puma3, T = materials(THREE, C, P), g = new THREE.Group(), HB = bins(T), TB = bins(T), tg;
    addPumaHull(HB);
    flush(THREE, g, HB);
    addGearGroups(THREE, g, T, PG, P);
    addPumaTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(PTX, PTY, PROOF);
    flush(THREE, tg, TB, function (x, y, z) { return [x - PTX, y - PTY, z - PROOF]; });
    g.add(tg);
    return g;
  }

  return {
    build: function (THREE, M, C) { return buildMarder(THREE, M, C, "a3"); },
    _build: buildMarder, _puma: buildPuma, variants: VARIANTS
  };
})();

var HeroPuma = (function () {
  "use strict";
  return { build: function (THREE, M, C) { return HeroMarder._puma(THREE, M, C); } };
})();

/* len: the measured X extent of each build */
UNIT_MODELS["deu_e60_ifv"] = { len: 6.94, build: function (THREE, M, C) { return HeroMarder._build(THREE, M, C, "m1"); } };
UNIT_MODELS["deu_e80_ifv"] = { len: 6.88, build: function (THREE, M, C) { return HeroMarder._build(THREE, M, C, "a2"); } };
UNIT_MODELS["deu_e90_ifv"] = { len: 6.88, build: function (THREE, M, C) { return HeroMarder._build(THREE, M, C, "a3"); } };
UNIT_MODELS["deu_e00_ifv"] = { len: 7.60, build: HeroPuma.build };
