/* ============ ru_tor.js - HERO models: the 9K330 Tor family ============
   The Soviet / Russian short-range air-defence system (NATO SA-15 Gauntlet)
   in three guises:
     pact_e80_tor     9K330 Tor, 9A330 on the GM-355         (1986)
     pact_e90_tor     9K331 Tor-M1, 9A331                    (1991)
     pact_e00_tor_m2  9K332 Tor-M2, 9A331M                   (2016)

   References (Wikimedia Commons, fetched once each, read as small sheet):
     "9K330 Tor, Kyiv 2018, 43"   three-quarter front view: the low driver's
        deck at the nose with the hatch on the left, tow gear on the nose, the
        big box turret on the rear two thirds with a row of missile hatches
        down its top, the mesh search dish raised on the turret, track with a
        large wheel at the front and small return rollers, side stowage;
     "Tor-M1 SAM (2)"            front view: the square tracking-radar panel
        standing on the front of the turret roof, folded search radar behind
        it, whip aerials, stowage boxes on the hull side, the grey-green
        three-tone paint (used for the Tor-M1 row);
     "Tor-M2U Army-2016"         dark green 9A331M(U): the tall flat search
        array on the turret (folded flat here), a plainer boxy turret.
   Published figures (row data): hull 7.5 m x 3.3 m, 34 t, height about 3.8 m
   with the radars folded.  Both radars are drawn FOLDED (travelling order).
   Check-and-fix findings from the same three photographs: seven road wheels
   a side on the Tor-M1 and the Tor-M2U (the game row says six: reported, not
   changed); the toothed drive sprocket is at the REAR, the plain idler at the
   front; the turret is a wide lower box (side doors) under an upper body whose
   sloped planes carry four missile lids a side, a square tracking panel with a
   round feed disc on the turret front (the Tor-M2U photograph shows a narrow
   portrait panel on a taller mast, drawn for the M2 row), a round IFF dome
   beside it, the search radar folded on the rear of the roof, tall whip
   aerials at the hull rear corners.  Team colour is four small up-facing
   strips on the turret ledge.
   NOT confirmed and therefore not invented: any visible difference between
   the 9A330 and the Tor-M1 launcher beyond paint; a four-module lid layout for
   the Tor-M2 (the M2 keeps the eight lids of the photographs).

   Nodes: "turret" (trained, rests forward) and seven "roadwheel" groups.
   Team colour is the plain C.team material.  Model space +X nose, +Y left,
   +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTor = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    T80: { gen: 0, paint: { base: "#4a5a37", blots: ["#3b4a2b", "#566244"], seed: 5 } },
    M1:  { gen: 1, paint: { base: "#566348", blots: ["#9ca18d", "#3d4934"], seed: 17 } },
    M2:  { gen: 2, paint: { base: "#46522f", blots: ["#39432a"], seed: 29 } }
  };

  var XW = [2.58, 1.72, 0.86, 0.0, -0.86, -1.72, -2.58], ZW = 0.41, RW = 0.34;
  var TY = 1.27;                  /* track centre line, each side */
  var TX = -1.20, TZ = 1.75;      /* turret ring on the rear deck */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so camouflage never stretches */
  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };

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
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box turned about Z: centre (cx, cy), half sizes hx (along ang), hy */
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
  }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a slab along a line in the XZ plane, thickness th, spanning y0..y1: track runs */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
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

  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  /* a convex prism: profile in the XZ plane extruded across y0..y1 */
  function prism(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
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
  function addHull(V, B, WB) {
    var i, s, k, Pn = B.paint, D = B.dark, G = B.glass, T = B.team;
    /* rear block (under the turret) and the lower front block with the sloped nose */
    box(Pn, -3.75, 0.90, -1.50, 1.50, 0.62, 1.75);
    prism(Pn, [[0.90, 0.62], [3.60, 0.62], [3.75, 0.85], [3.75, 1.10], [3.20, 1.45], [0.90, 1.45]], -1.50, 1.50);
    /* nose: lamps, tow eyes, the cable coil on the glacis (seen in the Kyiv photograph) */
    for (s = -1; s <= 1; s += 2) {
      box(D, 3.62, 3.78, s * 1.15 - 0.12, s * 1.15 + 0.12, 0.88, 1.06);
      box(G, 3.77, 3.795, s * 1.15 - 0.09, s * 1.15 + 0.09, 0.92, 1.02);
      box(D, 3.70, 3.84, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.72, 0.80);
      cylX(D, 3.20, 3.50, s * 0.78, 1.34, 0.055, 8);
    }
    cylZ(D, 3.20, 0.0, 1.45, 1.52, 0.30, 16);
    cylZ(D, 3.20, 0.0, 1.52, 1.58, 0.22, 14);
    /* the driver's deck: hatch on the left, vision blocks, a small right hatch */
    cylZ(Pn, 2.55, 0.65, 1.45, 1.60, 0.26, 14);
    cylZ(D, 2.55, 0.65, 1.60, 1.64, 0.20, 12);
    for (i = 0; i < 3; i++) box(G, 3.00, 3.05, 0.44 + i * 0.17, 0.54 + i * 0.17, 1.33, 1.43);
    cylZ(Pn, 2.40, -0.70, 1.45, 1.54, 0.22, 12);
    cylZ(D, 2.40, -0.70, 1.54, 1.57, 0.17, 10);
    box(D, 1.20, 2.10, -1.20, -0.30, 1.45, 1.47);                 /* front deck grille */
    for (i = 0; i < 5; i++) box(Pn, 1.28 + i * 0.17, 1.34 + i * 0.17, -1.16, -0.34, 1.47, 1.51);
    /* step between the decks: the turret skirt wall */
    box(D, 0.90, 0.94, -1.45, 1.45, 1.45, 1.75);
    /* rear deck: engine grilles, exhaust, hatch, team panel */
    box(D, -3.62, -2.90, -0.95, 0.95, 1.75, 1.77);
    for (i = 0; i < 6; i++) box(Pn, -3.58 + i * 0.12, -3.52 + i * 0.12, -0.92, 0.92, 1.77, 1.82);
    cylZ(D, -3.20, 1.15, 1.75, 1.90, 0.07, 8);
    cylZ(D, -3.20, -1.15, 1.75, 1.90, 0.07, 8);
    box(D, -3.78, -3.74, -0.95, 0.95, 0.90, 1.20);
    box(D, -3.78, -3.74, -0.60, 0.60, 1.30, 1.50);
    /* side stowage boxes and the upper side rail (Tor-M1 photograph) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var bx = -3.40 + i * 1.25;
        box(Pn, bx, bx + 1.10, s > 0 ? 1.50 : -1.62, s > 0 ? 1.62 : -1.50, 1.05, 1.45);
        box(D, bx + 0.45, bx + 0.65, s > 0 ? 1.62 : -1.64, s > 0 ? 1.64 : -1.62, 1.22, 1.28);
      }
      box(D, 0.95, 3.40, s > 0 ? 1.50 : -1.54, s > 0 ? 1.54 : -1.50, 0.70, 0.76);
      /* mudguard over the front run of track and the idler */
      box(Pn, 1.50, 3.65, s > 0 ? 1.20 : -1.62, s > 0 ? 1.62 : -1.20, 1.25, 1.30);
      box(Pn, -3.72, -3.10, s > 0 ? 1.12 : -1.62, s > 0 ? 1.62 : -1.12, 1.20, 1.25);
    }
    /* whip aerials on the hull rear corners */
    for (s = -1; s <= 1; s += 2) {
      cylZ(D, -3.55, s * 1.38, 1.75, 1.85, 0.05, 8);
      cylZ(D, -3.55, s * 1.38, 1.85, 3.30, 0.010, 5);
    }

    /* running gear, both sides: the drive sprocket is at the rear */
    for (s = -1; s <= 1; s += 2) {
      var yc = s * TY, ya = yc - 0.23, yb = yc + 0.23;
      var path = [[3.05, 0.045], [-3.05, 0.045], [-3.62, 0.42], [-3.38, 0.82], [-1.0, 0.90],
                  [2.9, 0.98], [3.62, 0.66], [3.55, 0.42]];
      for (i = 0; i < path.length; i++) {
        var p = path[i], q = path[(i + 1) % path.length];
        belt(D, p[0], p[1], q[0], q[1], ya, yb, 0.09);
      }
      for (i = 0; i < 36; i++) {
        var rx = -3.05 + i * 0.17;
        box(D, rx, rx + 0.08, s > 0 ? yb : ya - 0.02, s > 0 ? yb + 0.02 : ya, 0.0, 0.10);
      }
      /* rear: the toothed drive sprocket; front: the plain idler (seen on the Tor-M1 and
         Tor-M2U photographs: the toothed wheel sits behind the last road wheel) */
      cylY(D, -3.38, yc - 0.20, yc + 0.20, 0.62, 0.36, 22);
      cylY(D, -3.38, yc - 0.24, yc + 0.24, 0.62, 0.15, 12);
      for (i = 0; i < 14; i++) {
        var ta = i / 14 * TAU, tx = -3.38 + Math.cos(ta) * 0.37, tz = 0.62 + Math.sin(ta) * 0.37;
        box(D, tx - 0.035, tx + 0.035, yc - 0.17, yc + 0.17, tz - 0.035, tz + 0.035);
      }
      for (i = 0; i < 3; i++) cylY(D, -1.85 + i * 1.85, yc - 0.15, yc + 0.15, 0.86, 0.095, 10);
      cylY(D, 3.38, yc - 0.20, yc + 0.20, 0.45, 0.30, 20);
      cylY(D, 3.38, yc - 0.24, yc + 0.24, 0.45, 0.13, 12);
    }
    for (i = 0; i < XW.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TY;
        cylY(WB[i], 0, y0 - 0.215, y0 - 0.03, 0, RW, 20);
        cylY(WB[i], 0, y0 + 0.03, y0 + 0.215, 0, RW, 20);
        cylY(WB[i], 0, y0 - 0.235, y0 + 0.235, 0, 0.17, 12);
        for (k = 0; k < 6; k++) {
          var ba = k / 6 * TAU + 0.3, bx2 = Math.cos(ba) * 0.115, bz = Math.sin(ba) * 0.115;
          box(WB[i], bx2 - 0.022, bx2 + 0.022, y0 + s * 0.225, y0 + s * 0.265, bz - 0.022, bz + 0.022);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* Local frame: origin on the ring centre, z = 0 on the rear deck, front +X (the tracking radar).
     Cross-section from the photographs: a wide lower box with doors, a ledge, then the upper body
     narrowing in sloped planes that carry the missile lids (four a side), a flat ridge between. */
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
  function addTurret(V, TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, T = TB.team, gen = V.gen, i, j, s, k;
    /* lower box: vertical sides, vertical rear, raked front */
    prism(P, [[-1.80, 0.0], [1.70, 0.0], [1.78, 0.45], [1.62, 0.75], [-1.74, 0.75], [-1.80, 0.60]], -1.45, 1.45);
    /* upper body: sloped planes up to a flat ridge */
    hexa(P, [[-1.60, -1.20, 0.75], [1.45, -1.20, 0.75], [1.45, 1.20, 0.75], [-1.60, 1.20, 0.75],
             [-1.60, -0.55, 1.30], [1.45, -0.55, 1.30], [1.45, 0.55, 1.30], [-1.60, 0.55, 1.30]]);
    /* side doors on the lower box */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) {
        var px = -1.50 + i * 0.84, y0 = s > 0 ? 1.45 : -1.49, y1 = s > 0 ? 1.49 : -1.45;
        box(P, px, px + 0.76, y0, y1, 0.10, 0.66);
        box(D, px + 0.06, px + 0.70, y0, y1, 0.16, 0.19);
        box(D, px + 0.34, px + 0.42, y0, y1, 0.30, 0.54);
      }
    }
    /* the missile cells: eight hinged lids, four on each sloped plane */
    var sl = Math.sqrt(0.65 * 0.65 + 0.55 * 0.55), wy = 0.65 / sl, wz = 0.55 / sl;
    for (s = -1; s <= 1; s += 2) {
      var P0 = [0, s * 1.20, 0.75], U = [1, 0, 0], W = [0, -s * wy, wz], N = [0, s * wz, wy];
      for (i = 0; i < 4; i++) {
        var lx0 = -0.55 + i * 0.50;
        planeBox(D, P0, U, W, N, lx0 - 0.02, lx0 + 0.46, 0.06, sl - 0.06, -0.01, 0.015);
        planeBox(P, P0, U, W, N, lx0, lx0 + 0.44, 0.08, sl - 0.08, 0.0, 0.04);
        planeBox(D, P0, U, W, N, lx0 + 0.19, lx0 + 0.25, 0.14, sl - 0.14, 0.04, 0.055);
      }
    }
    /* small team strips: up-facing, on the ledge of the lower box beside the upper body */
    for (s = -1; s <= 1; s += 2) box(T, -1.30, -0.75, s > 0 ? 1.22 : -1.42, s > 0 ? 1.42 : -1.22, 0.75, 0.763);
    /* tracking radar neck at the front, then the panel */
    box(P, 0.95, 1.62, -0.50, 0.50, 0.75, 1.30);
    var pz0, pz1, pw, px0 = 1.50;
    if (gen === 2) {
      /* Tor-M2U photograph: a narrow portrait panel on a taller mast */
      pz0 = 1.20; pz1 = 2.05; pw = 0.34;
      box(D, 1.00, 1.30, -0.12, 0.12, 1.30, 1.28 + 0.4);
      box(P, 1.30, 1.50, -0.12, 0.12, 1.30, 1.40);
      px0 = 1.30;
      box(P, px0, px0 + 0.10, -pw, pw, pz0, pz1);
      box(D, px0 + 0.10, px0 + 0.125, -pw + 0.03, pw - 0.03, pz0 + 0.03, pz1 - 0.03);
    } else {
      /* Tor / Tor-M1 photograph: a big square panel with a round feed disc, on side brackets */
      pz0 = 0.95; pz1 = 2.05; pw = 0.64;
      box(P, px0, px0 + 0.22, -pw, pw, pz0, pz1);
      box(D, px0 + 0.22, px0 + 0.245, -pw + 0.03, pw - 0.03, pz0 + 0.03, pz1 - 0.03);
      cylX(D, px0 + 0.245, px0 + 0.257, 0, (pz0 + pz1) / 2 + 0.02, 0.50, 28);
      cylX(P, px0 + 0.257, px0 + 0.272, 0, (pz0 + pz1) / 2 + 0.02, 0.46, 28);
      for (s = -1; s <= 1; s += 2) box(P, 1.10, 1.50, s * (pw + 0.04) - 0.05, s * (pw + 0.04) + 0.05, 1.20, 1.80);
    }
    /* round IFF dome on a stalk beside the panel (seen in the Tor-M1 and Tor-M2U photographs) */
    cylZ(D, 1.25, 0.82, 1.30, 1.76, 0.05, 8);
    sphere(P, 1.25, 0.82, 1.90, 0.15, 12, 8);
    /* optical sensor on the front of the neck */
    box(D, 1.62, 1.70, 0.55, 0.78, 0.82, 1.04);
    box(G, 1.70, 1.72, 0.57, 0.76, 0.85, 1.01);
    /* the search radar, folded flat on the rear of the roof */
    var rz = 1.30;
    box(P, -1.66, -1.30, -0.30, 0.30, 1.0, rz);
    if (gen === 2) {
      box(P, -1.78, -0.72, -0.78, 0.78, rz, rz + 0.12);
      box(D, -1.76, -0.74, -0.74, 0.74, rz + 0.12, rz + 0.135);
      for (i = 0; i < 4; i++) box(D, -1.70 + i * 0.25, -1.66 + i * 0.25, -0.74, 0.74, rz + 0.135, rz + 0.15);
    } else {
      box(D, -1.80, -0.70, -0.82, -0.77, rz, rz + 0.09);
      box(D, -1.80, -0.70, 0.77, 0.82, rz, rz + 0.09);
      box(D, -1.80, -1.75, -0.82, 0.82, rz, rz + 0.09);
      box(D, -0.75, -0.70, -0.82, 0.82, rz, rz + 0.09);
      for (i = 0; i < 9; i++) box(D, -1.75 + i * 0.12, -1.73 + i * 0.12, -0.80, 0.80, rz + 0.04, rz + 0.07);
      for (i = 0; i < 5; i++) box(D, -1.78, -0.72, -0.62 + i * 0.31, -0.60 + i * 0.31, rz + 0.04, rz + 0.07);
      box(P, -1.20, -0.95, -0.12, 0.12, rz + 0.07, rz + 0.20);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.M2, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, TB = bins(T);
    for (i = 0; i < XW.length; i++) WB.push(new Bin(T.dark, false));
    addHull(V, HB, WB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { dark: WB[i] });
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

UNIT_MODELS["pact_e80_tor"] = { len: 7.6, build: function (THREE, M, C) { return HeroTor.build(THREE, M, C, "T80"); } };
UNIT_MODELS["pact_e90_tor"] = { len: 7.6, build: function (THREE, M, C) { return HeroTor.build(THREE, M, C, "M1"); } };
UNIT_MODELS["pact_e00_tor_m2"] = { len: 7.6, build: function (THREE, M, C) { return HeroTor.build(THREE, M, C, "M2"); } };
