/* ============ ru_tunguska.js - HERO models: the 2K22 Tunguska family ============
   The Soviet / Russian gun-and-missile air-defence vehicle (combat vehicle 2S6
   on the GM-352 tracked chassis) in the three guises the rows name:
     pact_e80_spaag   2S6 Tunguska         (2K22, in service 8 Sep 1982; Soviet green)
     pact_e90_spaag   2S6M Tunguska-M      (2K22M, in service 1990; Soviet green)
     spaag_p          2S6M Tunguska        (present day, Russian grey-green)
   Full-quality redo of 2026-10-24.  References (Wikimedia Commons, fetched at
   width 960):
     [S26] 2S6M combat vehicle 2K22M Tunguska-M - TankBiathlon14part2-26.jpg
           (Vitaly V. Kuzmin, CC-BY-SA): the RIGHT side square on.  The six
           road-wheel centres sit at an even 1.0 m pitch in it, so it is the
           orthographic reference: 114 px per metre from the published 7.93 m
           hull length, z from the track's ground line.
     [S29] the same vehicle, -29.jpg, LEFT side.  The old model was measured
           from it, but the hull is turned in it (its wheel pitch falls from
           1.16 m at the nose to 0.74 m at the tail), so every station of the
           old model aft of the nose had crept forward; the redo takes x from
           [S26] and uses [S29] only for the left side's fittings.
     [S25] -25.jpg (right front 3/4) and [S27] -27.jpg (right rear 3/4): the
           tracking-radar drum, the gun mounts, the empty launcher cradles and
           the folded search antenna seen from behind.
     [MUS1], [MUS2] 2K22 Tunguska, SA-19 Grison, Artillery museum,
           Saint-Petersburg pic1 / pic2: a 2S6 with the search antenna raised
           and dummy 9M311 containers in the launchers.
     [AMD] Amd 2s6.jpg and [P08] 2008 Moscow Victory Day Parade - 9K22
           Tunguska.jpg: loaded launchers from the front, four containers a side.
     en.wikipedia "2K22 Tunguska" / ru.wikipedia "Tunguska (ZPRK)": dates,
     GM-352 with six road wheels, rear sprocket and three return rollers,
     the search radar on the turret's rear top, the tracking radar on its front.

   Recognition list (each drawn; where it rests):
     1. Long low GM-352 hull: flat deck at 2.05 m, short upper glacis to a nose
        edge 1.50 m up, a thick fender ledge at 1.24-1.40 m running the whole
        length and turning down at the nose [S26] [S29].
     2. Six dual rubber-tyred road wheels a side at a 1.0 m pitch, the raised
        idler at the FRONT, the raised toothed sprocket at the REAR, three
        return rollers under the ledge [S26], en.wiki.
     3. Hull-side stowage boxes, the vertical louvred grille and small louvre
        on the right [S26]; the horizontal engine grille, the slotted panel
        and two filler caps on the left [S29].
     4. A wide, low turret-base drum, 3.1 m across [S26] [P08].
     5. The tall slab-sided turret body with a flat roof at 3.10 m, rounded at
        its front top edge [S26] [S25].
     6. The round tracking-radar drum on the turret FRONT, offset to the
        RIGHT of the centre line on a pedestal and yoke [S25] [P08] [MUS2].
     7. On each side a 2A38 twin 30 mm gun, barrels one above the other, run
        forward from a big flat-sided round-cornered mount housing (0.81 to
        -0.66 m) to muzzles 2.54 m forward of mid-hull [S26] [S29] [S25].
     8. The 9M311 containers: four a side, 2 x 2, outboard of the guns [AMD]
        [P08].  The 2S6M display vehicle [S26] has empty cradles; the game rows
        are armed, so all three carry them.
     9. The search-radar antenna folded down over the turret rear: a broad
        arched reflector drooping at both ends, with its feed-support ladder
        and drive box over the rear wall [S27] [S26].
    10. The sight head on its stalk and the commander's cupola on the roof [S26].

   Variant differences and what was NOT drawn:
     - en.wikipedia: the first 2K22 / 2S6 of 1982 carried four ready missiles,
       two a side; the 2K22M of 1990 eight.  No photograph found shows how the
       two-a-side launcher looked, and the 1980s 2S6 photographs to hand [AMD]
       [MUS2] show four a side, so the e80 row keeps four a side.  Not
       confirmed: any other 2S6 / 2S6M difference visible from outside, so the
       rows share the geometry.
     - Tunguska-M1 (2K22M1, 2003, GM-5975 chassis) is not a row; not drawn.
     - No whip aerial, no markings or numbers.
   Paint: [S26] lit hull side samples #555953-#575c57 (overcast); spaag_p
   takes that to 0.9 (#4d524c).  [MUS1] museum green #808b61 at 0.7 gives
   the Soviet green of the e80 / e90 rows (#5a6144); the 1990 2S6M kept the
   Soviet green (no 1990s colour photograph found to show otherwise).
   Published: hull 7.93 m, width 3.24 m, height 3.36 m radar folded; drawn
   7.98 x 3.24 x 3.46 m (to the sight head; roof 3.10, cupola 3.24).
   Six materials: PAINT (canvas texture), DARK, GLASS, C.team (a roof plate and
   the glacis plate), WHEEL (vertex colours).  Named nodes: "turret" (ring
   centre, x = 0.47) and six "roadwheel" groups.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTunguska = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    E80: { paint: { base: "#5a6144", dark: "#4b5238", lite: "#666d4f", seed: 5 } },
    E90: { paint: { base: "#576042", dark: "#4a5137", lite: "#636b4d", seed: 17 } },
    P:   { paint: { base: "#4d524c", dark: "#434740", lite: "#585d56", seed: 29 } }
  };

  /* running gear, from [S26] */
  var XW = [2.50, 1.47, 0.45, -0.59, -1.58, -2.51], RW = 0.365, ZW = 0.45;
  var TY = 1.40, TH = 0.19;               /* track centre line and half width */
  var XI = 3.11, ZI = 0.89, RI = 0.31;    /* idler, front, raised */
  var XS = -3.34, ZS = 0.89, RS = 0.31;   /* sprocket, rear, raised */
  var XR = [1.98, -0.07, -2.05], ZR = 1.00, RR = 0.085;  /* return rollers */
  var DZ = 2.05;                          /* hull deck */
  var HX = 0.47;                          /* turret ring centre */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lin(hex) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex;
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }

  /* one bin of triangles per material; the painted bin gets planar UVs from
     the dominant axis of each face (metres x 0.30, the texture repeating),
     the wheel bin a vertex colour (bin.col) instead.  Zero-area triangles,
     which the lofts' clipped stations make, are dropped. */
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (dot(cr, cr) < 1e-12) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.30, q[1] * 0.30);
        else if (ay >= ax) this.U.push(q[0] * 0.30, q[2] * 0.30);
        else this.U.push(q[1] * 0.30, q[2] * 0.30);
      }
    }
  };
  function quad(bin, a, b, c, d, want) {
    var f = cross(sub(b, a), sub(c, a));
    if (dot(f, want) >= 0) { bin.tri(a, b, c); bin.tri(a, c, d); }
    else { bin.tri(a, c, b); bin.tri(a, d, c); }
  }

  /* a closed solid: the signed volume says whether the faces point out */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
    return vol;
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    var t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
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
  function prism(bin, pts, y0, y1) { taper(bin, pts, -1, 1, 0, 1, y0, y1); }
  function taper(bin, pts, wa, wb, za, zb, y0, y1) {
    var n = pts.length, V = [], F = [], i, j, w;
    for (i = 0; i < n; i++) {
      w = wa + (wb - wa) * (pts[i][1] - za) / (zb - za);
      V.push([pts[i][0], y0 !== undefined ? y0 : -w, pts[i][1]]);
    }
    for (i = 0; i < n; i++) {
      w = wa + (wb - wa) * (pts[i][1] - za) / (zb - za);
      V.push([pts[i][0], y1 !== undefined ? y1 : w, pts[i][1]]);
    }
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }
  /* a round-cornered slab in the XZ plane (corner radius r), y0..y1 */
  function slab(bin, x0, x1, z0, z1, r, y0, y1) {
    var pts = [], k, a, cs = [[x1 - r, z1 - r, 0], [x0 + r, z1 - r, 1], [x0 + r, z0 + r, 2], [x1 - r, z0 + r, 3]];
    for (k = 0; k < 4; k++) for (a = 0; a <= 3; a++) {
      var t = (cs[k][2] + a / 3) * Math.PI / 2;
      pts.push([cs[k][0] + Math.cos(t) * r, cs[k][1] + Math.sin(t) * r]);
    }
    prism(bin, pts, y0, y1);
  }

  /* the loft: rings of (y, z) points (same count) at stations along x,
     bridged and capped into one closed solid */
  function loft(bin, X, R) {
    var V = [], F = [], n = R[0].length, m = X.length, i, k, j, c0, c1, cy, cz;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push([X[k], R[k][i][0], R[k][i][1]]);
    for (k = 0; k < m - 1; k++) for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      F.push([k * n + i, (k + 1) * n + j, (k + 1) * n + i], [k * n + i, k * n + j, (k + 1) * n + j]);
    }
    for (k = 0; k < m; k += m - 1) {
      cy = 0; cz = 0;
      for (i = 0; i < n; i++) { cy += R[k][i][0]; cz += R[k][i][1]; }
      V.push([X[k], cy / n, cz / n]); c0 = V.length - 1;
      for (i = 0; i < n; i++) { j = (i + 1) % n; F.push(k ? [c0, k * n + i, k * n + j] : [c0, k * n + j, k * n + i]); }
      if (m === 1) break;
    }
    c1 = solid(bin, V, F);
    return c1;
  }
  /* mirror a half profile (y >= 0, from bottom centre up to top centre) */
  function ring(half) {
    var R = [], i;
    for (i = 0; i < half.length; i++) R.push([half[i][0], half[i][1]]);
    for (i = half.length - 2; i >= 1; i--) R.push([-half[i][0], half[i][1]]);
    return R;
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 512; cv.height = 512;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 512, 512);
      /* faint mottling of the single-colour finish */
      for (k = 0; k < 2; k++) {
        q.fillStyle = k ? P.lite : P.dark;
        q.globalAlpha = 0.35;
        for (i = 0; i < 14; i++) {
          x = R() * 512; y = R() * 512; rr = 24 + R() * 60;
          q.beginPath();
          for (a = 0; a < 8; a++) {
            ang = a / 8 * TAU; rd = rr * (0.6 + R() * 0.6);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.5, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.5, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      q.globalAlpha = 1;
      /* weld seams and plate joints: thin dark lines on a 0.6 m-ish grid */
      q.strokeStyle = "rgba(20,22,18,0.30)"; q.lineWidth = 1.2;
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * 512) + 0.5; q.beginPath(); q.moveTo(x, 0); q.lineTo(x, 512); q.stroke();
        y = Math.floor(R() * 512) + 0.5; q.beginPath(); q.moveTo(0, y); q.lineTo(512, y); q.stroke();
      }
      /* rivet / bolt dots along some seams */
      q.fillStyle = "rgba(18,20,16,0.35)";
      for (i = 0; i < 160; i++) q.fillRect(Math.floor(R() * 64) * 8, Math.floor(R() * 8) * 64 + 3, 2, 2);
      /* dust and wear */
      for (i = 0; i < 120; i++) {
        q.fillStyle = (i % 3) ? "rgba(15,14,10,0.06)" : "rgba(196,186,150,0.07)";
        q.fillRect(R() * 512, R() * 512, 4 + R() * 46, 2 + R() * 10);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x232527, roughness: 0.74, metalness: 0.35 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2833, roughness: 0.12, metalness: 0.4 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0.08 });
    T.steel = lin(V.paint.base);
    T.rubber = lin(0x1d1e1f);
    T.hubc = lin(0x2b2d2b);
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B, dx) {
    var k, b, geo, i;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (dx) for (i = 0; i < b.P.length; i += 3) b.P[i] -= dx;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------------- the track */
  function trackLine() {
    var C = [[XI, ZI, RI], [XW[0], ZW, RW], [XW[5], ZW, RW], [XS, ZS, RS]], pts = [], i, k, a, r;
    for (i = 0; i < C.length; i++) {
      r = C[i][2] + 0.04;
      for (k = 0; k < 28; k++) { a = k / 28 * TAU; pts.push([C[i][0] + Math.cos(a) * r, C[i][1] + Math.sin(a) * r]); }
    }
    pts.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    function cr(o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) {
      while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop();
      lo.push(pts[i]);
    }
    for (i = pts.length - 1; i >= 0; i--) {
      while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop();
      up.push(pts[i]);
    }
    lo.pop(); up.pop();
    var H = lo.concat(up), best = -1, bl = 0, l;
    for (i = 0; i < H.length; i++) {
      k = (i + 1) % H.length;
      l = H[i][0] - H[k][0];
      if (H[i][1] > ZR && H[k][1] > ZR && l > bl) { bl = l; best = i; }
    }
    if (best >= 0) {
      var ins = [];
      for (i = 0; i < XR.length; i++) ins.push([XR[i], ZR + RR + 0.04]);
      ins.sort(function (p, q) { return q[0] - p[0]; });
      H = H.slice(0, best + 1).concat(ins, H.slice(best + 1));
    }
    return H;
  }
  function addTrack(D, L, y0, y1) {
    var n = L.length, i, j, O = [], I = [], NS = [], e, l, nx, nz, h = 0.04;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; l = Math.sqrt(e[0] * e[0] + e[1] * e[1]) || 1;
      NS.push([e[1] / l, -e[0] / l]);
    }
    for (i = 0; i < n; i++) {
      var p = NS[(i - 1 + n) % n], q = NS[i];
      nx = p[0] + q[0]; nz = p[1] + q[1]; l = Math.sqrt(nx * nx + nz * nz) || 1;
      nx /= l; nz /= l;
      var k = 1 / Math.max(0.5, nx * q[0] + nz * q[1]);
      O.push([L[i][0] + nx * h * k, L[i][1] + nz * h * k]);
      I.push([L[i][0] - nx * h * k, L[i][1] - nz * h * k]);
    }
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      var w = [NS[i][0], 0, NS[i][1]];
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [O[j][0], y1, O[j][1]], [O[i][0], y1, O[i][1]], w);
      quad(D, [I[i][0], y0, I[i][1]], [I[j][0], y0, I[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [-w[0], 0, -w[2]]);
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [I[j][0], y0, I[j][1]], [I[i][0], y0, I[i][1]], [0, -1, 0]);
      quad(D, [O[i][0], y1, O[i][1]], [O[j][0], y1, O[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [0, 1, 0]);
    }
    var acc = 0.1, seg, t;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; seg = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
      t = acc;
      while (t < seg) {
        var px = L[i][0] + e[0] * t / seg, pz = L[i][1] + e[1] * t / seg;
        planeBox(D, [px, 0, pz], [e[0] / seg, 0, e[1] / seg], [0, 1, 0], [NS[i][0], 0, NS[i][1]],
                 -0.035, 0.035, y0 - 0.008, y1 + 0.008, h - 0.01, h + 0.03);
        t += 0.25;
      }
      acc = t - seg;
    }
  }

  /* ----------------------------------------------------------- hull + tracks */
  /* hull half-section (y, z) from [S26] and the front view [P08]: the lower
     hull between the tracks, the fender ledge's sloped underside, its outer
     face, the side wall leaning in a little to the deck edge */
  var HULL_HALF = [[0, 0.45], [1.08, 0.45], [1.19, 0.56], [1.19, 1.18], [1.55, 1.24], [1.60, 1.27],
                   [1.60, 1.40], [1.50, 1.42], [1.48, 1.99], [1.45, DZ], [0, DZ]];
  /* station x, deck/glacis top and belly/nose-plate bottom (side profile [S26]) */
  var HULL_ST = [
    [-3.97, DZ - 0.04, 0.95], [-3.88, DZ, 0.80], [-3.60, DZ, 0.50], [-3.40, DZ, 0.45],
    [3.00, DZ, 0.45], [3.38, DZ, 0.98], [3.55, 1.90, 1.11], [3.70, 1.76, 1.23],
    [3.85, 1.62, 1.36], [3.97, 1.50, 1.47]];
  function addHull(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, x, z, ys, L = trackLine();
    var X = [], R = [], k, base = ring(HULL_HALF);
    for (k = 0; k < HULL_ST.length; k++) {
      var st = HULL_ST[k], rr = [];
      for (i = 0; i < base.length; i++) rr.push([base[i][0], Math.max(st[2], Math.min(st[1], base[i][1]))]);
      X.push(st[0]); R.push(rr);
    }
    loft(P, X, R);

    /* glacis: the team plate, two lamp housings, tow hooks at the nose edge */
    var GU = unit([-0.59, 0, DZ - 1.50]), GN = unit([DZ - 1.50, 0, 0.59]);
    planeBox(T, [3.97, 0, 1.50], GU, [0, 1, 0], GN, 0.14, 0.52, -0.42, 0.42, -0.01, 0.012);
    for (s = -1; s <= 1; s += 2) {
      planeBox(P, [3.97, 0, 1.50], GU, [0, 1, 0], GN, 0.56, 0.74, s * 1.10, s * 1.34, -0.01, 0.11);
      planeBox(G, [3.97, 0, 1.50], GU, [0, 1, 0], GN, 0.60, 0.70, s * 1.14, s * 1.30, 0.10, 0.115);
      box(D, 3.86, 3.99, s * 0.62, s * 0.78, 1.40, 1.52);
      /* rear: tow eyes, lamp clusters, the stowage rails */
      box(D, -3.99, -3.95, s * 0.55, s * 0.72, 1.20, 1.34);
      box(D, -3.985, -3.95, s * 1.15, s * 1.38, 1.80, 1.92);
      box(G, -3.99, -3.985, s * 1.18, s * 1.26, 1.82, 1.90);
      box(P, -3.99, -3.95, s * 0.95, s * 1.42, 1.48, 1.54);
    }
    /* rear plate: the round access door (left) and a box (right) [S27] */
    cylX(P, -3.99, -3.95, 0.62, 1.66, 0.27, 18);
    cylX(D, -4.00, -3.99, 0.62, 1.66, 0.05, 8);
    box(P, -3.99, -3.95, -0.95, -0.25, 1.58, 1.92);
    /* driver's hatch (front left) with three periscopes */
    cylZ(P, 2.86, 0.80, DZ - 0.02, DZ + 0.07, 0.29, 18);
    cylZ(P, 2.86, 0.80, DZ + 0.07, DZ + 0.10, 0.23, 18);
    for (i = 0; i < 3; i++) box(G, 3.16, 3.24, 0.52 + i * 0.20, 0.66 + i * 0.20, DZ - 0.01, DZ + 0.07);
    /* the raised plate ahead of the turret [S26] */
    box(P, 2.10, 3.30, -1.30, 0.40, DZ - 0.01, DZ + 0.05);
    /* engine deck: the grille and the two access panels */
    box(D, -3.78, -2.30, -1.02, 1.02, DZ - 0.01, DZ + 0.015);
    for (x = -3.72; x < -2.36; x += 0.17) box(P, x, x + 0.06, -1.00, 1.00, DZ - 0.01, DZ + 0.035);
    box(P, -2.20, -1.62, -0.95, -0.25, DZ - 0.01, DZ + 0.04);
    box(P, -2.20, -1.62, 0.25, 0.95, DZ - 0.01, DZ + 0.04);

    for (s = -1; s <= 1; s += 2) {
      ys = s * 1.48;
      /* the fender ledge's top lip and the skirt strip over the track's top run */
      box(P, -3.95, 3.60, s * 1.58, s * 1.62, 1.26, 1.30);
      for (x = -3.0; x < 3.5; x += 1.62) box(D, x, x + 0.03, s * 1.60, s * 1.618, 1.27, 1.39);
      if (s < 0) {
        /* RIGHT side [S26]: four stowage boxes, the long nose box, the
           vertical louvred grille and the small louvre, handles, a port */
        var RB = [[-3.36, -2.84], [-1.65, -0.90], [-0.75, 0.01], [1.27, 1.84], [2.41, 3.40]];
        for (i = 0; i < RB.length; i++) {
          slab(P, RB[i][0], RB[i][1], 1.42, i === 4 ? 1.88 : 1.92, 0.06, -1.48, -1.545);
          box(D, RB[i][1] - 0.05, RB[i][1] - 0.02, -1.545, -1.56, 1.62, 1.76);
        }
        box(D, -2.33, -1.98, -1.47, -1.50, 1.42, 1.95);
        for (x = -2.30; x < -2.0; x += 0.07) box(P, x, x + 0.025, -1.48, -1.53, 1.45, 1.92);
        box(D, -1.89, -1.70, -1.47, -1.50, 1.46, 1.65);
        for (z = 1.48; z < 1.64; z += 0.04) box(P, -1.88, -1.71, -1.48, -1.515, z, z + 0.015);
        for (i = 0; i < 4; i++) planeBox(D, [0.20 + i * 0.30, -1.50, 1.70], unit([0.3, 0, 1]), [0, 1, 0], [0, -1, 0], -0.10, 0.10, -0.015, 0.015, 0, 0.03);
        cylY(P, 2.01, -1.48, -1.53, 1.75, 0.08, 12);
      } else {
        /* LEFT side [S29], x re-taken at [S26]'s scale */
        var LB = [[1.92, 2.90], [1.06, 1.72], [-0.80, -0.08], [-3.36, -2.84]];
        for (i = 0; i < LB.length; i++) {
          slab(P, LB[i][0], LB[i][1], 1.42, 1.94, 0.06, 1.48, 1.545);
          box(D, LB[i][0] + 0.02, LB[i][0] + 0.05, 1.545, 1.56, 1.62, 1.76);
        }
        /* the long panel with its slot, two filler caps, a lifting eye */
        box(P, 0.05, 1.00, 1.48, 1.52, 1.74, 1.98);
        box(D, 0.20, 0.82, 1.52, 1.525, 1.80, 1.84);
        cylY(P, -0.20, 1.48, 1.53, 1.58, 0.075, 12);
        cylY(P, -0.46, 1.48, 1.53, 1.58, 0.075, 12);
        /* the horizontal engine grille and the small panels above it */
        box(D, -2.70, -1.10, 1.47, 1.50, 1.48, 1.62);
        for (x = -2.66; x < -1.14; x += 0.09) box(P, x, x + 0.03, 1.48, 1.515, 1.49, 1.61);
        for (x = -2.62; x < -1.0; x += 0.33) box(P, x, x + 0.26, 1.48, 1.50, 1.74, 1.90);
      }

      /* the track: band and grousers round idler, wheels, sprocket, rollers */
      addTrack(D, L, s * TY - TH, s * TY + TH);
      cylY(P, XI, s * (TY - 0.17), s * (TY - 0.05), ZI, RI, 16);
      cylY(P, XI, s * (TY + 0.05), s * (TY + 0.17), ZI, RI, 16);
      cylY(D, XI, s * (TY - 0.05), s * (TY + 0.05), ZI, 0.14, 10);
      cylY(P, XI, s * (TY + 0.17), s * (TY + 0.21), ZI, 0.11, 10);
      cylY(P, XS, s * (TY - 0.17), s * (TY + 0.17), ZS, RS - 0.06, 18);
      cylY(P, XS, s * (TY + 0.17), s * (TY + 0.21), ZS, 0.12, 10);
      for (i = 0; i < 12; i++) {
        var a = i / 12 * TAU, cx = XS + Math.cos(a) * (RS - 0.02), cz = ZS + Math.sin(a) * (RS - 0.02);
        planeBox(D, [cx, 0, cz], [-Math.sin(a), 0, Math.cos(a)], [0, 1, 0], [Math.cos(a), 0, Math.sin(a)],
                 -0.035, 0.035, s * TY - 0.15, s * TY + 0.15, -0.04, 0.06);
      }
      for (i = 0; i < XR.length; i++) cylY(P, XR[i], s * (TY - 0.12), s * (TY + 0.12), ZR, RR, 10);
      /* road-wheel arms trailing from their pivots, and the bump stops */
      for (i = 0; i < XW.length; i++) {
        planeBox(D, [XW[i], 0, ZW], unit([0.38, 0, 0.16]), [0, 1, 0], unit([-0.16, 0, 0.38]), 0, 0.42, s * 1.185, s * 1.225, -0.05, 0.05);
        box(D, XW[i] + 0.30, XW[i] + 0.42, s * 1.19, s * 1.22, 0.86, 1.00);
      }
    }
  }

  function wheelStation(W, T) {
    var s, c, k, a;
    for (s = -1; s <= 1; s += 2) {
      c = s * TY;
      W.col = T.rubber;
      cyl(W, [0, c - s * 0.17, 0], [0, c - s * 0.05, 0], RW, RW, 14);
      cyl(W, [0, c + s * 0.05, 0], [0, c + s * 0.17, 0], RW, RW, 16);
      W.col = T.steel;
      cyl(W, [0, c + s * 0.04, 0], [0, c + s * 0.18, 0], 0.29, 0.29, 16);
      cyl(W, [0, c + s * 0.18, 0], [0, c + s * 0.195, 0], 0.21, 0.17, 14);
      W.col = T.hubc;
      cyl(W, [0, c + s * 0.195, 0], [0, c + s * 0.225, 0], 0.085, 0.07, 8);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        cyl(W, [Math.cos(a) * 0.13, c + s * 0.19, Math.sin(a) * 0.13], [Math.cos(a) * 0.13, c + s * 0.205, Math.sin(a) * 0.13], 0.02, 0.02, 6);
      }
    }
  }

  /* ---------------------------------------------------------------- turret */
  /* built in MODEL coordinates (from [S26]); flush() shifts it to the ring */
  var TURRET_HALF = [[0, 2.30], [0.74, 2.30], [0.73, 2.98], [0.70, 3.06], [0.64, 3.10], [0, 3.10]];
  function addTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, j, k, y, zb, x;
    /* the wide, low base drum on the deck, its rim bevelled */
    cylZ(P, HX, 0, DZ - 0.02, 2.26, 1.55, 40);
    cyl(P, [HX, 0, 2.26], [HX, 0, 2.34], 1.55, 1.42, 40);
    /* the body: a loft whose front top edge rounds off, sides a touch in */
    var bx = [-1.16, -1.10, 1.10, 1.30, 1.44, 1.53, 1.58], bR = [], base = ring(TURRET_HALF);
    var topz = [3.06, 3.10, 3.10, 3.06, 2.97, 2.86, 2.74];
    for (k = 0; k < bx.length; k++) {
      var rr = [];
      for (i = 0; i < base.length; i++) {
        var yy = base[i][0] * (k === 0 ? 0.97 : 1), zz = Math.min(base[i][1], topz[k]);
        rr.push([yy, zz]);
      }
      bR.push(rr);
    }
    loft(P, bx, bR);
    box(T, -0.62, -0.26, -0.35, 0.35, 3.095, 3.112);
    /* roof fittings: vents, the hatch hinge lines, the aerial base */
    box(P, -0.95, -0.75, -0.62, -0.40, 3.10, 3.16);
    cylZ(P, -0.88, 0.62, 3.10, 3.24, 0.06, 10);
    cylZ(D, -0.20, -0.62, 3.10, 3.16, 0.05, 8);
    /* rear tower (the antenna drive) and the drive box on top [S26] [S27] */
    taper(P, [[-1.12, 2.36], [-1.12, 3.16], [-1.62, 3.16], [-1.68, 3.08], [-1.68, 2.44]], 0.70, 0.66, 2.36, 3.16);
    box(P, -2.10, -1.56, -0.46, 0.46, 3.00, 3.22);
    for (i = 0; i < 4; i++) box(D, -2.08 + i * 0.12, -2.02 + i * 0.12, -0.47, 0.47, 3.20, 3.24);
    box(P, -2.12, -1.66, -0.50, 0.50, 2.46, 2.96);
    box(D, -2.13, -2.11, -0.36, 0.36, 2.55, 2.90);
    /* the sight head on its stalk (right of centre) and the commander's
       cupola with vision blocks (left of centre) */
    cylZ(P, 0.94, -0.30, 3.10, 3.24, 0.09, 12);
    cyl(P, [0.94, -0.42, 3.33], [0.94, -0.18, 3.33], 0.11, 0.11, 14);
    box(G, 1.04, 1.06, -0.36, -0.24, 3.28, 3.38);
    cylZ(P, 0.44, 0.35, 3.10, 3.19, 0.25, 18);
    cylZ(P, 0.44, 0.35, 3.19, 3.24, 0.21, 18);
    for (i = 0; i < 6; i++) {
      var a = (i / 6 + 0.04) * TAU, cx = 0.44 + Math.cos(a) * 0.245, cy = 0.35 + Math.sin(a) * 0.245;
      planeBox(G, [cx, cy, 3.12], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], [Math.cos(a), Math.sin(a), 0],
               -0.04, 0.04, 0, 0.05, -0.01, 0.015);
    }
    /* front face: the TV sight window left of the drum */
    box(P, 1.50, 1.66, 0.10, 0.42, 2.62, 2.92);
    box(G, 1.66, 1.67, 0.15, 0.37, 2.70, 2.86);

    /* the tracking-radar drum, right of centre on its pedestal and yoke */
    var dy = -0.38, dz = 2.62;
    box(P, 1.50, 1.96, dy - 0.24, dy + 0.24, 2.30, 2.50);
    for (s = -1; s <= 1; s += 2) box(P, 1.80, 2.06, dy + s * 0.38, dy + s * 0.44, 2.40, 2.80);
    cylY(D, 1.98, dy - 0.46, dy + 0.46, dz, 0.05, 10);
    cyl(P, [1.94, dy, dz], [2.20, dy, dz], 0.36, 0.37, 28);
    cyl(P, [2.20, dy, dz], [2.26, dy, dz], 0.37, 0.34, 28);
    cyl(D, [2.26, dy, dz], [2.265, dy, dz], 0.30, 0.30, 24);
    box(P, 1.86, 1.96, dy - 0.10, dy + 0.10, dz - 0.40, dz + 0.40);

    for (s = -1; s <= 1; s += 2) {
      /* the gun mount housing: a round-cornered flat-sided box on the side */
      slab(P, -0.66, 0.81, 2.36, 2.90, 0.10, s * 0.72, s * 1.01);
      box(D, 0.70, 0.82, s * 1.01, s * 1.02, 2.48, 2.78);
      box(P, -0.50, 0.60, s * 1.01, s * 1.025, 2.44, 2.82);
      /* a strut from the housing back to the rear tower [S26] */
      cyl(D, [-0.66, s * 0.92, 2.70], [-1.12, s * 0.62, 2.95], 0.025, 0.025, 6);
      /* the 2A38: receiver, two barrels one above the other, a link and the
         muzzle brakes */
      y = s * 0.87;
      box(D, 0.70, 1.05, y - 0.09, y + 0.09, 2.68, 2.92);
      for (j = 0; j < 2; j++) {
        zb = j ? 2.75 : 2.85;
        cylX(D, 1.05, 1.55, y, zb, 0.055, 10);
        cylX(D, 1.55, 2.38, y, zb, 0.032, 8);
        cylX(D, 2.38, 2.54, y, zb, 0.046, 10);
      }
      box(D, 2.22, 2.30, y - 0.025, y + 0.025, 2.71, 2.89);
      box(D, 1.50, 1.56, y - 0.03, y + 0.03, 2.71, 2.89);

      /* the 9M311 containers: four a side, 2 x 2, outboard of the gun, on the
         launcher cradle with two clamp bands and the rear frame */
      var YC = [s * 1.15, s * 1.42], ZC = [2.34, 2.61], RC = 0.135;
      for (k = 0; k < 2; k++) for (j = 0; j < 2; j++) {
        cyl(P, [-0.24, YC[k], ZC[j]], [2.38, YC[k], ZC[j]], RC, RC, 10);
        cyl(D, [2.38, YC[k], ZC[j]], [2.40, YC[k], ZC[j]], RC - 0.02, RC - 0.02, 10);
      }
      for (k = 0; k < 2; k++) {
        x = k ? 1.70 : 0.30;
        box(P, x - 0.05, x + 0.05, s * 1.00, s * 1.575, 2.19, 2.77);
      }
      box(P, -0.30, -0.18, s * 0.99, s * 1.575, 2.17, 2.79);
      box(D, -0.20, 0.20, s * 1.00, s * 1.02, 2.30, 2.70);
    }

    /* the search-radar reflector folded down over the turret rear: an arch
       across the width drooping at both ends, its upper face carrying the
       dark lightening holes [S27], on its feed-support ladder */
    var NU = 12, NV = 3, hu, hv, th = 0.05, xH = -1.95, zH = 3.24, xT = -2.72, zT = 2.92, HW = 1.15, sag = 0.36;
    function arch(u, v, off) {
      var xx = xH + (xT - xH) * v, zz = zH + (zT - zH) * v - sag * u * u + off;
      return [xx, u * HW, zz];
    }
    for (hu = 0; hu < NU; hu++) for (hv = 0; hv < NV; hv++) {
      var u0 = -1 + 2 * hu / NU, u1 = -1 + 2 * (hu + 1) / NU, v0 = hv / NV, v1 = (hv + 1) / NV;
      hexa(P, [arch(u0, v0, -th), arch(u1, v0, -th), arch(u1, v1, -th), arch(u0, v1, -th),
               arch(u0, v0, 0), arch(u1, v0, 0), arch(u1, v1, 0), arch(u0, v1, 0)]);
    }
    for (hu = 0; hu < 4; hu++) for (hv = 0; hv < 2; hv++) {
      var uc = -0.72 + hu * 0.48, vc = 0.30 + hv * 0.42, du = 0.15, dv = 0.13, A0, A1, A2;
      A0 = arch(uc - du, vc - dv, 0.006); A1 = arch(uc + du, vc - dv, 0.006); A2 = arch(uc, vc + dv, 0.006);
      if (hv) { A0 = arch(uc - du, vc + dv, 0.006); A1 = arch(uc + du, vc + dv, 0.006); A2 = arch(uc, vc - dv, 0.006); }
      quad(D, A0, A1, A2, A2, [0, 0, 1]);
    }
    for (s = -1; s <= 1; s += 2) {
      box(P, -2.04, -1.86, s * 0.30, s * 0.40, 3.14, 3.27);
      cyl(D, [-2.10, s * 0.25, 3.16], [-2.45, s * 0.12, 2.45], 0.02, 0.02, 6);
    }
    for (i = 0; i < 6; i++) box(D, -2.14 - i * 0.055, -2.12 - i * 0.055, -0.20, 0.20, 3.08 - i * 0.11, 3.10 - i * 0.11);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.P, Tm = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(Tm), TB = bins(Tm), i, wg, W;
    addHull(HB, V);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      W = new Bin(Tm.wheel, false, true);
      wheelStation(W, Tm);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    addTurret(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(HX, 0, 0);
    flush(THREE, wg, TB, HX);
    g.add(wg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_spaag"] = { len: 7.9, build: function (THREE, M, C) { return HeroTunguska.build(THREE, M, C, "E80"); } };
UNIT_MODELS["pact_e90_spaag"] = { len: 7.9, build: function (THREE, M, C) { return HeroTunguska.build(THREE, M, C, "E90"); } };
UNIT_MODELS["spaag_p"] = { len: 7.9, build: function (THREE, M, C) { return HeroTunguska.build(THREE, M, C, "P"); } };
