/* ============ ru_buk.js - HERO models: the Buk TELAR family ============
   The Soviet / Russian 9K37 / 9K317 Buk medium-range surface-to-air system,
   the self-propelled launcher-radar vehicle (TELAR) in three guises:
     pact_e80_buk     9A310M1 TELAR of the 9K37M1 Buk-M1 (SA-11 Gadfly)  (1980s-90s)
     pact_e00_buk     9A317 TELAR of the 9K317 Buk-M2 (SA-17 Grizzly)    (2000s)
     pact_e00_buk_m3  9A317M TELAR of the 9K317M Buk-M3 (SA-27 Gollum)    (2010s)

   What each feature rests on (references fetched from Wikimedia Commons):
     - Vitaly Kuzmin's photograph of a 9A310 TELAR of the Buk-M1-2 family
       (File:9A310 self-propelled launch vehicle for Buk-M1-2 Air defence
       system.jpg, a rear three-quarter view): the GM-569 hull, a flat deck
       with a skirt ledge over SIX single rubber-tyred steel-disc road wheels
       (the idler raised at the front, the toothed sprocket raised at the
       rear), side stowage boxes in a row along the hull, a mesh intake
       grille low on the hull side, a vertical rear plate with stowage; on
       it the launcher: a turret base with hinged hatch panels on the leaning
       sides, the big rounded-top Fire Dome (9S35) radar housing with a flat
       face, the missiles lying on rails along the roof - ONE ABOVE ANOTHER
       on each side, FOUR in all, white nose cones, small tail wings - the
       rails and a hoop handrail overhanging the hull, a servo sight on a
       pedestal beside the radar.
     - File:9A317 Buk-M2 - parade-rehearsal (without missiles).jpg (a flat
       side view of two 9A317, used for the hull proportions and the M2
       turret): a taller, flatter-sided turret with two rows of hatch panels,
       a narrower rounded radar housing at one end, hoop handrails and the
       sight on the roof, the hull as the 9A310's (dark Russian green).  The
       missiles are absent in the photograph; the game row is armed, so the
       four 9M317 lie on the same rails as the M1's.
     - File:9A317M Armia2018.jpg (a side view of a 9A317M at the exhibition):
       the same hull, a turret with a long run of side hatch panels, a
       large rounded-OCTAGON radar housing with a second, smaller housing on
       its roof, and SIX sealed transport-launch containers, pale grey-blue
       with red end caps, in a bundle of 3 x 2 on a raised cradle with a lift
       cylinder.  The photograph shows them raised; the model draws them raised
       at 30 degrees (the elevation the photograph's height gives for the
       container length assumed below) on the turret, pointing forward.
   CHECK-AND-FIX CHANGES (second pass):
     - Hull length: the published 9A310M1 length is 9.3 m; the first pass drew a 7.5 m
       hull. Scaled to 9.3 m (six wheels 0.93 m apart, wheel diameter 0.70 m, as the
       side photographs of the 9A317M and 9A317 give against a 9.3 m hull); the
       turret ring sits 5.9 m from the rear. Missile tails no longer overhang the hull.
     - Launcher: rails with their rounds (M1, M2) or the container bundle (M3) are the
       group "podelev" inside "turret", hinged at its own pivot, LEVEL at rest (the
       9A317 parade photograph shows the rounds lying level on the roof); userData.el
       is the firing elevation (1.05 rad M1/M2, 1.31 rad M3) and userData.cells the
       round noses (mouth x, y, z, rear x) in the group frame. The elevations are read
       off photographs (the 9A310M1 front view, the 9A317M side view at about 75
       degrees), NOT published figures. The rounds are drawn pointing along the
       turret's forward (dome side), the arrangement of every photograph; the real
       march order has the turret turned round, which the game does not draw.
     - M3: containers drawn level, no longer raised; their length (5.2 m) and
       diameter (0.5 m) remain fitted, not published. Red end caps kept: the 2020
       Moscow parade photograph (in-service 9A317M) shows them red.
     - M2: the 9A317 photographs (side view without missiles, parade view with them)
       show a long flat-sided turret with a short rounded end cap, not a Fire Dome:
       the turret is now a ~7 m box with a 0.45 m rounded end, rails and four
       round pairs at the tail end; no mast or antenna drawn (not seen).
     - Paint: plain Soviet green on all three (the three-tone scheme of the 9A310M1
       display photograph is a later repaint; parade photographs show plain green).
     - Wheels: vertex colours written as authored sRGB/255 as ru_t72.js does; bigger
       steel disc, dished ring and hub, readable in the sheet.
   Scale: hull 9.3 m, width 3.31 m (published 3.25), height 3.87 m M1 with the
   handrail (published 3.8), 35 t.  9M38M1 length 5.55 m, diameter 0.40 m
   (published; the 9M317 is drawn the same size).
   No tactical markings, no tail numbers.

   Materials: PAINT (textured), DARK (track, rails, grilles), GLASS (sight
   and periscopes), the plain C.team (a plate on the glacis and a plate on the
   turret roof), WHEEL (vertex-coloured: rubber and steel discs, so a road
   wheel group is one draw call) and LIGHT (missile nose cones, containers),
   RED (container caps, M3 only).  Named nodes: "turret" (at the ring centre,
   0.20 m behind mid-hull; radar and missiles forward along +X) and six
   "roadwheel" groups (both sides of each station).

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBuk = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    M1: { paint: { base: "#4a5935", blots: ["#46543a", "#4f5d3a"], seed: 11 },
          mis: 4, bx: [-2.00, 1.20], XN: 1.12, pvx: -3.55, loaf: { x0: 1.20, x1: 3.55, z0: 2.10, z1: 3.50, rF: 0.62, rR: 0.16, wa: 1.12, wb: 0.92 }, top: 2.98, slope: 0.25 },
    M2: { paint: { base: "#434d37", blots: ["#3e4833", "#47523a"], seed: 23 },
          mis: 4, bx: [-3.40, 3.50], XN: 2.05, pvx: -3.15, loaf: { x0: 3.50, x1: 3.95, z0: 2.10, z1: 3.15, rF: 0.45, rR: 0.10, wa: 1.30, wb: 1.28 }, top: 3.15, slope: 0.05 },
    M3: { paint: { base: "#58653e", blots: ["#55623c", "#5e6c42"], seed: 31 },
          mis: 6, oct: true, top: 3.05, slope: 0.12 }
  };

  /* running gear: single rubber-tyred steel-disc wheels, measured off the
     side photographs (hull length 7.5 m) */
  var XW = [-2.30, -1.37, -0.43, 0.50, 1.40, 2.30], RW = 0.35, ZW = 0.44;
  var TY = 1.38, TH = 0.22;               /* track centre line and half width */
  var XI = 3.93, ZI = 0.63, RI = 0.30;    /* idler, front, raised */
  var XS = -3.04, ZS = 0.63, RS = 0.31;   /* sprocket, rear, raised */
  var XR = [], ZR = 9, RR = 0.09;         /* no return rollers (skirt covers the run) */
  var DZ = 1.90;                          /* hull deck */
  var HX = 1.20;                          /* turret ring centre */
  var K = 1.21;                           /* hull length scale: the 9.3 m hull */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lin(hex) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex;
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }

  function raw(hex, k) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex; k = k || 1;
    return [Math.min(1, ((n >> 16) & 255) / 255 * k), Math.min(1, ((n >> 8) & 255) / 255 * k), Math.min(1, (n & 255) / 255 * k)];
  }
  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so camouflage never stretches;
     the wheel bin carries a vertex colour (bin.col) instead */
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
  /* a flat quad wound so that its normal points along "want" */
  function quad(bin, a, b, c, d, want) {
    var f = cross(sub(b, a), sub(c, a));
    if (dot(f, want) >= 0) { bin.tri(a, b, c); bin.tri(a, c, d); }
    else { bin.tri(a, c, b); bin.tri(a, d, c); }
  }

  /* a closed solid: whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not */
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
  var boxRaw = box;
  /* a view of a vertex-coloured bin that paints every triangle in one colour */
  function vcView(bin, col) { return { tri: function (a, b, c, na, nb, nc) { bin.col = col; bin.tri(a, b, c, na, nb, nc); } }; }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
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

  /* a prism: convex outline in the XZ plane, from y0 to y1 */
  function prism(bin, pts, y0, y1) { taper(bin, pts, -1, 1, 0, 1, y0, y1); }
  /* a convex XZ outline whose side faces lean in: half width wa at z = za,
     wb at z = zb (planar side faces, since the width is linear in z); with
     y0 / y1 given it is a straight prism between them instead */
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

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 34;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.07)" : "rgba(240,236,215,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 30, 2 + R() * 18);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  /* five materials: PAINT (textured), DARK (track, guns, grilles), GLASS,
     the team colour exactly as handed in (so the era kit can leave it alone
  /* materials: PAINT (textured), DARK, GLASS, the team colour exactly as
     handed in, WHEEL (vertex colours), LIGHT (nose cones, containers), RED */
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0.08 });
    /* vertex colours are written the way ru_t72.js writes them: the authored sRGB value / 255 */
    T.steel = raw(V.paint.base, 1.1);
    T.rubber = raw(0x262726);
    T.hubc = raw(0x5d6054);
    T.railc = raw(0x2c2e30);
    T.nose = raw(0xcfd0c6);
    T.cont = raw(V.mis === 6 ? 0x56604c : 0x56604c);
    T.cap = raw(0x8a2f26);
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
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
  /* ------------------------------------------------------------- the track */
  /* the track's centre line: the convex hull of idler, sprocket and end
     road wheels, each grown by half the track thickness, its top run then
     let down onto the return rollers;
     returned counter-clockwise in (x, z) */
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
    /* the top run sags onto the return rollers: replace the long straight
       top segment (idler to sprocket, running nose to tail) by a line
       through the roller tops */
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

  /* the track band round the line (thickness 0.08) and its shoe grousers */
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
    /* grousers every 0.3 m round the loop */
    var acc = 0.1, seg, t;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; seg = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
      t = acc;
      while (t < seg) {
        var px = L[i][0] + e[0] * t / seg, pz = L[i][1] + e[1] * t / seg;
        planeBox(D, [px, 0, pz], [e[0] / seg, 0, e[1] / seg], [0, 1, 0], [NS[i][0], 0, NS[i][1]],
                 -0.035, 0.035, y0 - 0.008, y1 + 0.008, h - 0.01, h + 0.03);
        t += 0.62;
      }
      acc = t - seg;
    }
  }

  /* ----------------------------------------------------------- hull + tracks */
  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, x, L = trackLine(), ys;
    /* the hull is drawn at the 7.5 m the first pass measured and stretched to the
       published 9.3 m: boxes and outlines take K along X, round things do not */
    var box = function (b, x0, x1, y0, y1, z0, z1) { boxRaw(b, x0 * K, x1 * K, y0, y1, z0, z1); };
    var prism = function (b, pts, y0, y1) {
      var q = [], j; for (j = 0; j < pts.length; j++) q.push([pts[j][0] * K, pts[j][1]]);
      taper(b, q, -1, 1, 0, 1, y0, y1);
    };
    /* lower hull between the tracks, upper hull above the skirt, flat deck,
       a steep short glacis */
    prism(P, [[-3.70, 0.45], [3.40, 0.45], [3.76, 0.95], [3.76, 1.10], [-3.76, 1.10]], -1.17, 1.17);
    prism(P, [[-3.76, 1.08], [3.62, 1.08], [3.76, 1.25], [3.76, 1.55], [3.40, DZ], [-3.76, DZ]], -1.50, 1.50);
    /* skirt ledge over the track runs, a thin dark lip below it */
    for (s = -1; s <= 1; s += 2) {
      box(P, -3.84, 3.60, s * 1.50, s * 1.64, 0.94, 1.08);
      box(P, -3.84, 3.60, s * 1.62, s * 1.65, 0.86, 0.94);
      box(D, -3.84, 3.60, s * 1.64, s * 1.655, 0.93, 0.955);
      /* front mudguard curl over the idler */
      planeBox(P, [3.60 * K, s * 1.57, 1.01], unit([1, 0, -0.35]), [0, 1, 0], unit([0.35, 0, 1]), 0, 0.30, -0.07, 0.07, -0.02, 0.02);
    }
    /* glacis: team plate, lamps, tow hooks */
    var GU = unit([-0.36, 0, 0.35]), GN = unit([0.35, 0, 0.36]);
    planeBox(T, [3.76 * K, 0, 1.55], GU, [0, 1, 0], GN, 0.06, 0.34, -0.40, 0.40, -0.01, 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(P, 3.70, 3.84, s * 1.15, s * 1.40, 1.26, 1.46);
      box(G, 3.84, 3.855, s * 1.20, s * 1.35, 1.32, 1.40);
      box(D, 3.72, 3.88, s * 0.62, s * 0.78, 1.00, 1.12);
      /* rear plate: tow eyes, lamp clusters, jacks */
      box(D, -3.80, -3.84, s * 0.50, s * 0.68, 1.20, 1.34);
      box(D, -3.78, -3.86, s * 0.55, s * 0.62, 1.34, 1.52);
      box(D, -3.78, -3.84, s * 1.05, s * 1.35, 1.58, 1.80);
      box(G, -3.84, -3.855, s * 1.10, s * 1.20, 1.62, 1.74);
      box(P, -3.76, -3.86, s * 0.20, s * 0.45, 1.58, 1.82);
    }
    /* driver's hatch, front left, with three periscopes; engine deck louvres at the rear */
    cylZ(P, 3.45, 0.70, DZ - 0.02, DZ + 0.07, 0.28, 18);
    cylZ(P, 3.45, 0.70, DZ + 0.07, DZ + 0.10, 0.22, 18);
    for (i = 0; i < 3; i++) box(G, 3.45 / K + 0.27, 3.45 / K + 0.33, 0.44 + i * 0.19, 0.57 + i * 0.19, DZ - 0.01, DZ + 0.06);
    box(D, -3.70, -2.30, -1.20, 1.20, DZ - 0.01, DZ + 0.015);
    for (x = -3.66; x < -2.35; x += 0.16) box(P, x, x + 0.05, -1.18, 1.18, DZ - 0.01, DZ + 0.04);
    box(P, 1.55, 2.35, -0.50, 0.50, DZ - 0.01, DZ + 0.035);
    for (s = -1; s <= 1; s += 2) {
      ys = s * 1.50;
      /* the side stowage boxes in a row, latched lids, and the mesh intake
         grille low on the hull side */
      var SB = [[-3.60, -2.78], [-2.70, -2.05], [-1.95, -1.15], [-0.95, -0.10], [1.40, 2.20], [2.30, 3.00]];
      for (i = 0; i < SB.length; i++) {
        box(P, SB[i][0], SB[i][1], ys, s * 1.575, 1.14, 1.80);
        box(D, (SB[i][0] + SB[i][1]) / 2 - 0.05, (SB[i][0] + SB[i][1]) / 2 + 0.05, s * 1.575, s * 1.595, 1.40, 1.50);
        box(D, SB[i][0] + 0.06, SB[i][0] + 0.12, s * 1.575, s * 1.590, 1.62, 1.74);
      }
      box(D, -0.05, 1.30, ys, s * 1.53, 1.14, 1.50);
      for (x = -0.02; x < 1.28; x += 0.14) box(P, x, x + 0.04, ys, s * 1.55, 1.14, 1.50);
      box(P, -0.05, 1.30, s * 1.50, s * 1.57, 1.50, 1.80);
      cylY(P, 0.55, ys, s * 1.60, 1.66, 0.07, 12);
      cylY(P, 0.85, ys, s * 1.60, 1.66, 0.07, 12);

      /* the track: band and grousers round idler, wheels, sprocket */
      addTrack(D, L, s * TY - TH, s * TY + TH);
      /* idler: steel disc with a hub */
      cylY(P, XI, s * (TY - 0.12), s * (TY + 0.12), ZI, RI - 0.02, 16);
      cylY(D, XI, s * (TY + 0.12), s * (TY + 0.15), ZI, 0.13, 10);
      cylY(P, XI, s * (TY + 0.15), s * (TY + 0.19), ZI, 0.09, 10);
      /* sprocket: hub, two toothed rings */
      cylY(P, XS, s * (TY - 0.17), s * (TY + 0.17), ZS, RS - 0.06, 18);
      cylY(P, XS, s * (TY + 0.17), s * (TY + 0.22), ZS, 0.12, 10);
      for (i = 0; i < 12; i++) {
        var a = i / 12 * TAU, cx = XS + Math.cos(a) * (RS - 0.02), cz = ZS + Math.sin(a) * (RS - 0.02);
        planeBox(D, [cx, 0, cz], [-Math.sin(a), 0, Math.cos(a)], [0, 1, 0], [Math.cos(a), 0, Math.sin(a)],
                 -0.035, 0.035, s * TY - 0.17, s * TY + 0.17, -0.04, 0.06);
      }
      /* road-wheel swing arms from the lower hull */
      for (i = 0; i < XW.length; i++)
        planeBox(D, [XW[i], 0, ZW], unit([0.30, 0, 0.14]), [0, 1, 0], unit([-0.14, 0, 0.30]), 0, 0.30, s * 1.17, s * 1.27, -0.05, 0.05);
    }
  }

  /* one road wheel, built about its axle (local origin), both sides */
  function wheelStation(W, T) {
    var s, c;
    for (s = -1; s <= 1; s += 2) {
      c = s * TY;
      W.col = T.rubber;
      cyl(W, [0, c - s * 0.11, 0], [0, c + s * 0.11, 0], RW, RW, 16);
      W.col = T.steel;
      cyl(W, [0, c + s * 0.10, 0], [0, c + s * 0.14, 0], 0.295, 0.295, 20);
      cyl(W, [0, c + s * 0.14, 0], [0, c + s * 0.17, 0], 0.20, 0.18, 14);
      W.col = T.hubc;
      cyl(W, [0, c + s * 0.17, 0], [0, c + s * 0.215, 0], 0.095, 0.075, 10);
    }
  }

  /* ---------------------------------------------------------------- turret */
  /* a rounded-rectangle outline in (x, z), counter-clockwise, radii per
     corner [rear-bottom, front-bottom, front-top, rear-top] */
  function loafPts(x0, x1, z0, z1, R, n) {
    var pts = [], C = [[x0, z0, 1, 1, 180], [x1, z0, -1, 1, 270], [x1, z1, -1, -1, 0], [x0, z1, 1, -1, 90]], c, k, r, a, cx, cz;
    for (c = 0; c < 4; c++) {
      r = R[c];
      if (r < 0.03) { pts.push([C[c][0], C[c][1]]); continue; }
      cx = C[c][0] + C[c][2] * r; cz = C[c][1] + C[c][3] * r;
      for (k = 0; k <= n; k++) {
        a = (C[c][4] + 90 * k / n) * Math.PI / 180;
        pts.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
      }
    }
    return pts;
  }
  /* an octagon-ish outline: chamfered corners */
  function octPts(x0, x1, z0, z1, ch) {
    return [[x0 + ch, z0], [x1 - ch, z0], [x1, z0 + ch], [x1, z1 - ch], [x1 - ch, z1], [x0 + ch, z1], [x0, z1 - ch], [x0, z0 + ch]];
  }

  /* a missile along d from its tail point Tp: body, nozzle, white ogive nose,
     four tail wings and four mid-body strakes */
  function missile(B, Tp, d, L, r) {
    var P = B.paint, D = B.dark, W = B.light, at = function (t) { return [Tp[0] + d[0] * t, Tp[1], Tp[2] + d[2] * t]; };
    var n = [-d[2], 0, d[0]], k, phi, w, N, wv;
    cyl(D, at(0), at(0.22), 0.15, r - 0.02, 12);
    cyl(P, at(0.22), at(L - 1.05), r, r, 14);
    cyl(W, at(L - 1.05), at(L - 0.55), r, 0.165, 14);
    cyl(W, at(L - 0.55), at(L - 0.12), 0.165, 0.075, 12);
    cyl(W, at(L - 0.12), at(L), 0.075, 0.015, 8);
    for (k = 0; k < 4; k++) {
      phi = (k + 0.5) * Math.PI / 2;
      w = [0, Math.cos(phi), 0]; N = [0, 0, 0];
      /* the fin plane contains d and the radial direction; its normal is d x radial */
      wv = [d[0] * 0, Math.cos(phi), 0];
      var rad = [n[0] * Math.sin(phi), Math.cos(phi), n[2] * Math.sin(phi)];
      var nn = unit(cross(d, rad));
      planeBox(P, at(0.25), d, rad, nn, 0, 0.60, r - 0.02, r + 0.17, -0.012, 0.012);
      planeBox(P, at(L * 0.50), d, rad, nn, 0, 0.75, r - 0.02, r + 0.11, -0.010, 0.010);
    }
  }

  function strapAt(D, Tp, d, t, r, y) {
    cyl(D, [Tp[0] + d[0] * (t - 0.03), y, Tp[2] + d[2] * (t - 0.03)], [Tp[0] + d[0] * (t + 0.03), y, Tp[2] + d[2] * (t + 0.03)], r + 0.025, r + 0.025, 10);
  }

  /* built about the ring centre (the node sits at x = HX) */
  function addTurret(B, PB, which) {
    var V = VARIANTS[which], P = B.paint, D = B.dark, G = B.glass, T = B.team;
    var s, i, j, k, x, y, top = V.top, tp;
    /* turret base on the deck, its rim bevelled */
    cylZ(P, 0, 0, DZ - 0.02, 2.06, 1.50, 24);
    cyl(P, [0, 0, 2.06], [0, 0, 2.12], 1.50, 1.42, 24);
    /* main body: leaning sides, hinged hatch panels on them */
    var wa = 1.32, wb = wa - V.slope * (top - 2.05) / 0.93;
    var bx0 = V.oct ? -2.00 : V.bx[0], bx1 = V.oct ? 1.20 : V.bx[1];
    taper(P, [[bx0, 2.05], [bx1, 2.05], [bx1, top - 0.12], [bx1 - 0.12, top], [bx0 + 0.10, top], [bx0, top - 0.10]], wa, wb, 2.05, top);
    var sl = Math.atan2(wa - wb, top - 2.05), cs = Math.cos(sl), sn = Math.sin(sl), hh = (top - 2.05) / cs;
    var PAN = (which === "M2") ? [] : [[-1.92, -1.30], [-1.20, -0.55], [-0.45, 0.15], [0.25, 0.70], [0.78, 1.14]];
    if (which === "M2") for (i = 0; i < 7; i++) PAN.push([bx0 + 0.10 + i * 0.98, bx0 + 0.98 + i * 0.98 - 0.02 * 0]);
    for (s = -1; s <= 1; s += 2) {
      var U = [1, 0, 0], Wv = unit([0, -s * sn, cs]), N = unit([0, s * cs, sn]), P0 = [0, s * wa, 2.05];
      for (i = 0; i < PAN.length; i++) {
        planeBox(P, P0, U, Wv, N, PAN[i][0], PAN[i][1], 0.08, hh * 0.92, 0, 0.035);
        /* hinge barrels and a latch on each panel */
        planeBox(D, P0, U, Wv, N, PAN[i][0] + 0.04, PAN[i][0] + 0.10, 0.06, 0.22, 0, 0.06);
        planeBox(D, P0, U, Wv, N, (PAN[i][0] + PAN[i][1]) / 2 - 0.05, (PAN[i][0] + PAN[i][1]) / 2 + 0.05, hh * 0.48, hh * 0.58, 0.035, 0.07);
      }
    }
    /* roof: servo sight on a pedestal, team plate, hatch rims */
    box(T, -1.70, -1.10, -0.42, 0.42, top - 0.01, top + 0.012);
    cylZ(P, -0.25, 0.55, top - 0.02, top + 0.10, 0.26, 16);
    cylZ(P, -0.25, 0.55, top + 0.10, top + 0.14, 0.21, 16);
    box(P, 0.78, 1.10, -0.70, -0.38, top - 0.01, top + 0.30);
    box(D, 0.70, 1.15, -0.76, -0.32, top + 0.30, top + 0.55);
    box(G, 1.15, 1.17, -0.68, -0.40, top + 0.36, top + 0.50);
    cylY(D, 0.92, -0.80, -0.30, top + 0.43, 0.045, 8);

    /* the radar housing at the front of the turret */
    if (V.oct) {
      /* 9A317M: a large rounded octagon in side view, a second housing on its roof */
      taper(P, octPts(1.00, 3.60, 2.06, 3.50, 0.55), 1.14, 1.00, 2.06, 3.50);
      box(P, 1.00, 3.00, -1.10, 1.10, 2.04, 2.60);
      taper(P, octPts(1.70, 2.95, 3.46, 3.78, 0.14), 0.62, 0.55, 3.46, 3.78);
      box(G, 1.66, 1.70, -0.45, 0.45, 3.52, 3.70);
      cylZ(P, 1.45, 0.38, 3.40, 3.62, 0.10, 10);
      box(D, 1.40, 1.44, -0.50, 0.50, 2.55, 3.05);
      for (s = -1; s <= 1; s += 2) {
        box(D, 1.36, 1.40, s * 0.55, s * 0.62, 2.20, 3.35);
        box(D, 3.00, 3.12, s * 0.50, s * 0.70, 2.80, 3.20);
      }
    } else {
      var Lf = V.loaf;
      tp = loafPts(Lf.x0, Lf.x1, Lf.z0, Lf.z1, [0.04, 0.34, Lf.rF, Lf.rR], 7);
      taper(P, tp, Lf.wa, Lf.wb, Lf.z0, Lf.z1);
      /* the flat rear face of the radar housing: hinge brackets, latch strip, cable box */
      box(D, Lf.x0 - 0.06, Lf.x0, -0.35, 0.35, Lf.z0 + 0.25, Lf.z0 + 0.45);
      for (s = -1; s <= 1; s += 2) {
        box(D, Lf.x0 - 0.08, Lf.x0 + 0.02, s * 0.80, s * 0.90, Lf.z0 + 0.20, Lf.z1 - 0.40);
        box(D, Lf.x0 - 0.06, Lf.x0, s * 0.45, s * 0.55, Lf.z0 + 0.30, Lf.z1 - 0.60);
        /* seam bands round the housing sides */
        if (Lf.x0 + 1.5 < Lf.x1) {
          box(D, Lf.x0 + 0.80, Lf.x0 + 0.88, s * (Lf.wa - 0.01), s * (Lf.wa + 0.01), Lf.z0 + 0.10, Lf.z0 + 0.85);
          box(D, Lf.x0 + 1.50, Lf.x0 + 1.58, s * (Lf.wa - 0.01), s * (Lf.wa + 0.01), Lf.z0 + 0.10, Lf.z0 + 0.85);
        }
      }
    }

    /* ---- the launcher: rails with their rounds (M1, M2) or the container bundle
       (M3) are the group "podelev", hinged at the pivot PV (turret frame) and
       level at rest; render3d lays it to userData.el while the unit fires.
       What does not travel with it - the rear stand and the rest pads - is
       drawn on the turret.  The pod's parts are built in the turret frame and
       moved back by the pivot when the group is made. ---- */
    var Dv = vcView(PB.vc, PB.T.railc), Wv = vcView(PB.vc, PB.T.nose), Cv = vcView(PB.vc, PB.T.cont), Rv = vcView(PB.vc, PB.T.cap);
    var PV, cells = [], EL;
    if (!V.oct) {
      var L = 5.55, r = 0.20, d = [1, 0, 1 - 1], Mb = { paint: PB.paint, dark: Dv, light: Wv };
      var YY = [0.50, 1.04], ZN = [top + 0.50, top + 0.32], XN = V.XN, TX = XN - L, Zr = ZN[1] - 0.24, Zu = ZN[0] - 0.24;
      d = [1, 0, 0];
      PV = [V.pvx, (ZN[0] + ZN[1]) / 2];
      EL = 1.05;
      for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
        var Tp = [TX, s * YY[k], ZN[k]];
        missile(Mb, Tp, d, L, r);
        strapAt(Dv, Tp, d, 1.5, r, s * YY[k]); strapAt(Dv, Tp, d, 2.7, r, s * YY[k]); strapAt(Dv, Tp, d, 3.9, r, s * YY[k]);
        /* rail below the missile */
        cyl(Dv, [TX + 0.1, s * YY[k], ZN[k] - 0.24], [XN - 0.9, s * YY[k], ZN[k] - 0.24], 0.035, 0.035, 6);
        cells.push([XN - PV[0], s * YY[k], ZN[k] - PV[1], TX - PV[0]]);
      }
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i < 3; i++) {
          x = [XN - 1.92, TX + 1.73, TX + 0.33][i];
          box(Dv, x - 0.04, x + 0.04, s * 0.45, s * (i === 1 ? 1.22 : 1.10), Zr - 0.03, Zu + 0.03);
        }
        /* a fixed rest pad on the roof under the front cross-beam, and the pivot stand behind */
        box(D, XN - 2.00, XN - 1.84, s * 0.50, s * 0.58, top - 0.01, Zr - 0.03);
        box(D, XN - 2.00, XN - 1.84, s * 1.00, s * 1.08, top - 0.01, Zr - 0.03);
      }
      /* the two hoop handrails over the rails */
      for (j = 0; j < 2; j++) {
        x = j ? TX + 1.38 : XN - 2.02;
        var hz = top + 0.85, hb = j ? Zr - 0.03 : top + 0.08;
        var HP = [[-1.22, hb], [-1.22, hz - 0.30], [-1.06, hz], [1.06, hz], [1.22, hz - 0.30], [1.22, hb]];
        for (i = 0; i < HP.length - 1; i++) cyl(Dv, [x, HP[i][0], HP[i][1]], [x, HP[i + 1][0], HP[i + 1][1]], 0.022, 0.022, 6);
      }
      cylY(Dv, PV[0], -1.15, 1.15, PV[1] - 0.12, 0.05, 8);
      /* the fixed stand the rails hinge on, over the engine deck */
      for (s = -1; s <= 1; s += 2) {
        box(D, PV[0] - 0.22, PV[0] + 0.22, s * 0.40, s * 0.62, DZ + 0.05, PV[1] - 0.10);
        box(D, PV[0] - 0.22, PV[0] + 0.22, s * 0.98, s * 1.18, DZ + 0.05, PV[1] - 0.10);
      }
      box(P, PV[0] - 0.30, PV[0] + 0.30, -1.20, 1.20, DZ + 0.05, DZ + 0.75);
    } else {
      /* 9A317M: six containers, 3 x 2; level at rest, lying along the turret roof */
      var CL = 5.2, cr = 0.25, Cz = 3.50, Ct = -3.90;
      PV = [-3.50, Cz];
      EL = 1.31;
      for (s = 0; s < 3; s++) for (k = 0; k < 2; k++) {
        var yc = (s - 1) * 0.56, zc = Cz + k * 0.54, mid = Ct + CL;
        cyl(Cv, [Ct, yc, zc], [mid, yc, zc], cr, cr, 14);
        for (j = 0; j < 4; j++) {
          var t0 = Ct + 0.5 + j * 1.35;
          cyl(Cv, [t0, yc, zc], [t0 + 0.07, yc, zc], cr + 0.014, cr + 0.014, 14);
        }
        cyl(Rv, [mid, yc, zc], [mid + 0.03, yc, zc], cr - 0.02, cr - 0.02, 14);
        cyl(Dv, [Ct - 0.04, yc, zc], [Ct, yc, zc], cr - 0.04, cr - 0.04, 10);
        cells.push([mid - PV[0], yc, zc - PV[1], Ct - PV[0]]);
      }
      /* the cradle frames across the bundle and the hinge pin */
      box(Dv, -1.50, -1.30, -0.92, 0.92, Cz - 0.32, Cz + 0.88);
      box(Dv, -3.50, -3.30, -0.92, 0.92, Cz - 0.32, Cz + 0.88);
      cylY(Dv, PV[0], -1.10, 1.10, Cz - 0.32, 0.05, 8);
      /* fixed: the hinge stand over the engine deck, two rest pads on the roof, the lift-cylinder bosses */
      for (s = -1; s <= 1; s += 2) {
        box(D, PV[0] - 0.25, PV[0] + 0.25, s * 0.86, s * 1.02, DZ + 0.05, Cz - 0.30);
        box(D, -1.60, -1.20, s * 0.30, s * 0.55, top - 0.01, Cz - 0.33);
        cylZ(D, -1.40, s * 0.75, top - 0.01, top + 0.10, 0.07, 8);
      }
      box(P, PV[0] - 0.30, PV[0] + 0.30, -1.20, 1.20, DZ + 0.05, DZ + 0.75);
    }
    return { pv: PV, cells: cells, el: EL };
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.M1, Tm = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(Tm), TB = bins(Tm), i, wg, W;
    addHull(HB);
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
    var PB = { paint: new Bin(Tm.paint, true), vc: new Bin(Tm.wheel, false, true), T: Tm };
    var pod = addTurret(TB, PB, which), E = new THREE.Group();
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(HX, 0, 0);
    flush(THREE, wg, TB);
    /* the pod: its meshes are offset back by the pivot so the group turns about it */
    E.name = "podelev";
    E.position.set(pod.pv[0], 0, pod.pv[1]);
    flush(THREE, E, { paint: PB.paint, vc: PB.vc });
    for (i = 0; i < E.children.length; i++) E.children[i].position.set(-pod.pv[0], 0, -pod.pv[1]);
    E.userData.el = pod.el;
    E.userData.cells = pod.cells;
    wg.add(E);
    g.add(wg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_buk"]    = { len: 9.42, build: function (THREE, M, C) { return HeroBuk.build(THREE, M, C, "M1"); } };
UNIT_MODELS["pact_e00_buk"]    = { len: 9.82, build: function (THREE, M, C) { return HeroBuk.build(THREE, M, C, "M2"); } };
UNIT_MODELS["pact_e00_buk_m3"] = { len: 9.47, build: function (THREE, M, C) { return HeroBuk.build(THREE, M, C, "M3"); } };
