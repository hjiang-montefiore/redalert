/* ============ us_m41.js - HERO models: the M41 Walker Bulldog and the vehicles built on its parts ============
   The 1950s US Army's light-armour family, three rows of the e50 roster:
     nato_e50_lighttank   M41A1 Walker Bulldog  (1953)  76 mm light tank, the base chassis
     nato_e50_spaag       M42A1 Duster          (1953)  twin 40 mm in an open turret on the M41 hull
     nato_e50_spg         M44 155 mm SPH        (1953)  open-topped howitzer compartment on a hull of M41 parts

   What has to read at a glance (reference photographs: the M41 at Fort Meade and
   an ARVN M41A3 in the field, side on; an M42 in Vietnam, 1968, and one head-on at
   a MACV compound; an M44 front-lateral, another at the Texas Military Forces
   Museum, and the T99E1 prototype drawing of the same hull; the Wikipedia
   description of the M41 and the infobox figures of all three):
     - M41: a long LOW hull with a horizontal roof and ONE well sloped glacis, the
       driver front LEFT, the turret set a little forward of the hull middle, a
       LONG 76 mm gun that sticks out ahead of the nose by about 2.3 m and ends in
       a fat muzzle brake / fume extractor.  Five big dual road wheels a side under
       three return rollers, the idler at the FRONT and the drive sprocket at the
       REAR (the engine and cross-drive sit at the back; the text says it plainly
       and the old parametric row, with a front sprocket, had it backwards).  Big
       exhaust pipes on each side of the upper hull rear.  Turret: rounded cast,
       vertical slightly sloped sides, a stowage-box bustle, the commander's cupola
       with five vision blocks on the RIGHT carrying the .50 in US service, the
       coaxial .30 on the LEFT of the gun.
     - M42: the same hull with the roof turret ring carrying a big open-topped,
       many-sided turret, twin 40 mm barrels each ending in a slotted flash hider,
       the gun cradle in the middle of the sloped front, a pintle machine gun on
       the left wall.  No roof, so the floor of the turret shows from above.
     - M44: a different hull altogether - a LOW engine deck and the driver at the
       FRONT (left), a tall flat-sided OPEN-TOPPED fighting compartment over the
       rear two thirds, SIX road wheels a side (the M41 has five), the drive
       sprocket at the front, and the fat 155 mm howitzer poking out of the
       compartment's front face through a thick cylindrical cradle and a shield.

   Published figures used (length x width x height, hull, m):
     M41   5.81 x 3.19 x 2.72, ground clearance 0.45 (Jane's, as the Wikipedia infobox has it); Hunnicutt's
           table: 8.09 / 8.12 m over the gun (early / later muzzle brake), 3.20 wide, 118.8 in = 3.02 m
           high, which I read as over the cupola machine gun.  Built: 8.13 x 3.22, 2.72 over the
           cupola and 2.99 over the .50
     M42   5.82 x 3.23 x 2.85; over the guns 6.36 m.  Built: 6.43 x 3.22 x 2.86
     M44   6.16 x 3.24 x 3.11, M45 howitzer L/23, elevation -5..+65 deg, traverse 30 deg.
           Built: 6.23 x 3.22 x 3.08

   Proportions of the M41 and M42 hull were checked against the ARVN M41 side
   photograph, scaled by the 5.81 m hull and the 0.66 m road wheels (both agree
   with Hunnicutt's 3.02 m over the machine gun): the road wheel pitch is about
   0.82 m (the first build had 0.67 and the tyres almost touched), the idler sits
   up under the nose at x 2.5, the upper track run is about 1.2 m up, the fender
   line about 1.3 m and the hull deck about 1.58 m (the first build had 0.95 / 0.89
   / 1.30 and was 0.28 m too low).  The M44 hull length was trimmed from 6.31 to
   6.23 m to sit within 2 % of the published 6.16 m.

   Judgement calls, and what could not be confirmed (nothing below is invented
   to balance the set; where a source was silent the feature is left out):
     - M44 "turret": the node render3d trains is ONLY the howitzer with its
       cradle, breech, pivot pedestal and shield.  The compartment, walls and
       hull never swing, because the real mount traverses 30 degrees inside a
       fixed compartment.  render3d trains it through any bearing, so a gun
       turned far off the nose will pass through a wall; that is the price of
       keeping the superstructure still.
     - M41A1 / M42A1 against the base M41 / M42: the differences found (hydraulic
       traverse, the fuel-injected engine) are inside; no exterior change could
       be confirmed, so each row has one model and none is dressed as a later mark.
     - Not drawn because the sources do not settle them: the M41's roof ventilator
       dome and turret basket (the text says "some models"), the M44's .50 mount
       (the infobox names the M2HB, not where it stood), radio masts, and any
       infrared searchlight.  The M44's driver is placed on the left like the M41's
       from the photographs; the M41 exhaust pipes follow the text ("large exhaust
       pipes on each side of the upper hull rear") and their exact shape is a guess.
     - The old parametric rows drew the M41 and M42 with the drive sprocket at
       the front (armour_specs.js sprocketFront:true).  The M41 description puts
       the sprocket at the REAR; the M44, whose engine is in the front, has it forward.

   Built from a handful of primitives per MATERIAL: the hull, each pair of road
   wheels and the turret are separate nodes ("roadwheel" groups that spin about
   their own Y, one "turret" group on its ring), every node carries one mesh per
   material.  Team colour is the plain C.team material, on upward-facing panels
   (rear deck, turret roof, open-turret and compartment floors).

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM41 = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var TY = 1.33, TW = 0.52;     /* track centre line and width, each side  */
  var PAINT = { base: "#4a5236", blots: ["#41492f", "#555c3d"], seed: 53 };   /* PAINT.olive of armour3d.js */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so the paint never stretches */
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

  /* a convex plan outline extruded from z0 to z1, the top shrunk about the
     outline's centre by k1 (the bottom by k0): cast turrets with sloped sides */
  function prism(bin, pts, z0, z1, k0, k1) {
    var n = pts.length, cx = 0, cy = 0, i, a, b, V = [], F = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) V.push([cx + (pts[i][0] - cx) * k0, cy + (pts[i][1] - cy) * k0, z0]);
    for (i = 0; i < n; i++) V.push([cx + (pts[i][0] - cx) * k1, cy + (pts[i][1] - cy) * k1, z1]);
    for (i = 0; i < n; i++) { a = i; b = (i + 1) % n; F.push([a, b, n + b], [a, n + b, n + a]); }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    solid(bin, V, F);
  }

  /* a wall run: thin upright slabs along a polyline of (x, y), the corners
     overlapping by a little so there is never a crack where two meet */
  function walls(bin, pts, closed, th, z0, z1) {
    var i, n = pts.length, m = closed ? n : n - 1, p, q, dx, dy, l;
    for (i = 0; i < m; i++) {
      p = pts[i]; q = pts[(i + 1) % n]; dx = q[0] - p[0]; dy = q[1] - p[1]; l = Math.sqrt(dx * dx + dy * dy);
      rbox(bin, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, l / 2 + th * 0.6, th / 2, Math.atan2(dy, dx), z0, z1);
    }
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
      /* 1950s olive drab was one flat coat: only a soft weathered mottle, no pattern */
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

  /* four materials and no more: PAINT (textured), DARK (track, rubber, gun,
     grilles), GLASS (periscopes, sights) and the team colour, exactly as
     handed in, so the era kit can leave it alone when this hull stands in */
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------- running gear */
  /* wx: road wheel stations (axle x), wz: axle height, wr: tyre radius.
     F and R are the front and rear wheels the track wraps (idler or sprocket,
     teeth: true on the sprocket), rl the return rollers, zUp the height of the
     upper run, loF / loR where the flat lower run starts and ends. */
  var G41 = {
    wx: [1.83, 1.01, 0.20, -0.63, -1.47], wz: 0.40, wr: 0.33,
    F: { x: 2.50, z: 0.60, r: 0.32, teeth: false },    /* idler, front, up under the glacis */
    R: { x: -2.17, z: 0.74, r: 0.33, teeth: true },    /* sprocket, rear */
    rl: [-1.12, -0.13, 1.33], zUp: 1.17, loF: 2.15, loR: -1.80
  };
  var G44 = {
    wx: [1.81, 1.10, 0.38, -0.33, -1.05, -1.76], wz: 0.40, wr: 0.33,
    F: { x: 2.50, z: 0.74, r: 0.33, teeth: true },     /* sprocket, front */
    R: { x: -2.45, z: 0.60, r: 0.32, teeth: false },   /* idler, rear     */
    rl: [-1.55, -0.15, 1.30], zUp: 1.17, loF: 2.15, loR: -2.09
  };

  /* the closed track path, as (x, z) points on the belt's centre line */
  function trackPts(G) {
    var P = [], i, a, n = 6, F = G.F, R = G.R;
    for (i = 0; i <= n; i++) { a = -Math.PI / 2 + Math.PI * i / n; P.push([F.x + Math.cos(a) * F.r, F.z + Math.sin(a) * F.r]); }
    P.push([F.x - 0.85, G.zUp]); P.push([0, G.zUp]); P.push([R.x + 0.85, G.zUp]);
    for (i = 0; i <= n; i++) { a = Math.PI / 2 + Math.PI * i / n; P.push([R.x + Math.cos(a) * R.r, R.z + Math.sin(a) * R.r]); }
    P.push([G.loR, 0.035]); P.push([G.loF, 0.035]);
    return P;
  }

  function wheelAt(bin, W, yc, s) {
    cylY(bin, W.x, yc - 0.19, yc + 0.19, W.z, W.r - 0.03, 18);
    cylY(bin, W.x, yc + s * 0.17, yc + s * 0.24, W.z, W.r * 0.45, 12);
    if (W.teeth) {
      for (var i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, tx = W.x + Math.cos(ta) * (W.r + 0.01), tz = W.z + Math.sin(ta) * (W.r + 0.01);
        box(bin, tx - 0.04, tx + 0.04, yc - 0.17, yc + 0.17, tz - 0.04, tz + 0.04);
      }
    }
  }

  /* tracks, idler, sprocket and return rollers go in the hull's dark bin; each
     road wheel station (both sides together) is its own spinning node's bin */
  function addRunning(B, WB, G) {
    var s, i, yc, ya, yb, P = trackPts(G), p, q, rx, st = (G.loF - G.loR - 0.10) / 21;
    for (s = -1; s <= 1; s += 2) {
      yc = s * TY; ya = yc - TW / 2; yb = yc + TW / 2;
      for (i = 0; i < P.length; i++) {
        p = P[i]; q = P[(i + 1) % P.length];
        belt(B.dark, p[0], p[1], q[0], q[1], ya, yb, 0.07);
      }
      /* track shoes: ribs on the outer edge of the lower run so it reads as a track, not a slab */
      for (i = 0; i < 22; i++) {
        rx = G.loR + 0.05 + i * st;
        box(B.dark, rx, rx + 0.07, s > 0 ? yb : ya - 0.02, s > 0 ? yb + 0.02 : ya, 0.0, 0.10);
      }
      wheelAt(B.dark, G.F, yc, s);
      wheelAt(B.dark, G.R, yc, s);
      for (i = 0; i < G.rl.length; i++) cylY(B.dark, G.rl[i], yc - 0.13, yc + 0.13, G.zUp - 0.14, 0.105, 10);
      for (i = 0; i < G.wx.length; i++) {
        /* dual tyres with a hub cap on the outside; local axes: the node sits on the axle */
        cylY(WB[i], 0, yc - 0.245, yc - 0.03, 0, G.wr, 16);
        cylY(WB[i], 0, yc + 0.03, yc + 0.245, 0, G.wr, 16);
        cylY(WB[i], 0, yc + s * 0.24, yc + s * 0.265, 0, G.wr * 0.42, 10);
      }
    }
  }

  /* ---------------------------------------------------------------- hulls */
  /* A hull is ONE loft of ten-point cross sections, nose and tail capped.  Each
     station gives the right-hand half as five (y, z) corners a..e: the belly
     corner, the foot of the hull side between the tracks, the outer edge of the
     fender shelf over the tracks, the top of the vertical side, the roof edge. */
  function loft(bin, st) {
    var Vt = [], F = [], i, k, n = 10, rg, k1, a0, a1, b0, b1;
    function ring(S) {
      return [[S.x, S.a[0], S.a[1]], [S.x, S.b[0], S.b[1]], [S.x, S.c[0], S.c[1]], [S.x, S.d[0], S.d[1]], [S.x, S.e[0], S.e[1]],
              [S.x, -S.e[0], S.e[1]], [S.x, -S.d[0], S.d[1]], [S.x, -S.c[0], S.c[1]], [S.x, -S.b[0], S.b[1]], [S.x, -S.a[0], S.a[1]]];
    }
    for (i = 0; i < st.length; i++) { rg = ring(st[i]); for (k = 0; k < n; k++) Vt.push(rg[k]); }
    for (i = 0; i + 1 < st.length; i++) {
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n; a0 = i * n + k; a1 = i * n + k1; b0 = (i + 1) * n + k; b1 = (i + 1) * n + k1;
        F.push([a0, a1, b1], [a0, b1, b0]);
      }
    }
    function cap(base, idx, dir) {
      var ids = idx.map(function (q) { return base + q; }), j;
      var nv = cross(sub(Vt[ids[1]], Vt[ids[0]]), sub(Vt[ids[2]], Vt[ids[0]]));
      if (nv[0] * dir < 0) ids.reverse();
      for (j = 1; j + 1 < ids.length; j++) F.push([ids[0], ids[j], ids[j + 1]]);
    }
    cap(0, [0, 1, 8, 9], -1); cap(0, [4, 5, 6, 7, 8, 1, 2, 3], -1);
    cap((st.length - 1) * n, [0, 1, 8, 9], 1); cap((st.length - 1) * n, [4, 5, 6, 7, 8, 1, 2, 3], 1);
    solid(bin, Vt, F);
  }

  /* M41 / M42: flat roof RZ = 1.58 m up from the tail to x = 1.85, then the glacis
     (about 33 degrees) down to the nose; the rear deck slopes down over the engine.
     The ARVN M41 side photograph puts the deck at about 1.6 m, the fender line over
     the track at about 1.3 m and the upper track run at about 1.2 m (road wheel
     diameter 0.66 m and the 5.81 m hull as the scale); the first build had them
     0.3 m too low, which squashed the hull against the wheels. */
  var RZ = 1.58;
  var ST41 = [
    { x: -2.905, a: [0.85, 0.60], b: [1.00, 1.30], c: [1.58, 1.30], d: [1.58, 1.44], e: [1.36, 1.47] },
    { x: -2.30,  a: [0.90, 0.46], b: [1.05, 1.30], c: [1.59, 1.30], d: [1.59, 1.54], e: [1.38, 1.58] },
    { x: 1.85,   a: [0.90, 0.46], b: [1.05, 1.30], c: [1.59, 1.30], d: [1.59, 1.54], e: [1.38, 1.58] },
    { x: 2.78,   a: [0.80, 0.56], b: [0.95, 0.94], c: [1.45, 0.94], d: [1.45, 0.96], e: [1.25, 0.985] },
    { x: 2.905,  a: [0.78, 0.62], b: [0.90, 0.86], c: [1.30, 0.86], d: [1.30, 0.88], e: [1.20, 0.905] }
  ];
  function glacis41(x) { return RZ - (x - 1.85) * 0.64; }   /* roof height on the glacis plane */
  function fender41(x) { return 1.30 - (x - 1.85) * 0.387; }   /* the track guard falling away to the nose */

  function addHull41(B) {
    var s, i, x, y;
    loft(B.paint, ST41);

    /* the driver sits front LEFT: a single-piece hatch, three periscopes forward of it
       and one to its left, as the M41 description has it */
    cylZ(B.paint, 1.62, 0.72, RZ - 0.02, RZ + 0.06, 0.23, 14);
    cylZ(B.dark, 1.62, 0.72, RZ + 0.06, RZ + 0.075, 0.17, 12);
    for (i = 0; i < 3; i++) {
      y = 0.50 + i * 0.22; x = 1.98;
      box(B.dark, x - 0.05, x + 0.05, y - 0.06, y + 0.06, glacis41(x) - 0.03, glacis41(x) + 0.10);
      box(B.glass, x + 0.05, x + 0.062, y - 0.045, y + 0.045, glacis41(x) + 0.02, glacis41(x) + 0.08);
    }
    box(B.dark, 1.57, 1.67, 1.00, 1.12, RZ - 0.02, RZ + 0.08);
    /* tow eyes in the nose, headlight lugs at the fender corners */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 2.86, 2.95, s * 0.52 - 0.05, s * 0.52 + 0.05, 0.68, 0.78);
      box(B.dark, 2.46, 2.60, s * 1.18 - 0.07, s * 1.18 + 0.07, fender41(2.55), fender41(2.55) + 0.12);
      box(B.glass, 2.60, 2.615, s * 1.18 - 0.05, s * 1.18 + 0.05, fender41(2.55) + 0.02, fender41(2.55) + 0.10);
    }

    /* the engine deck: a hatch on the middle, a louvred grille either side */
    box(B.paint, -2.25, -1.35, -0.55, 0.55, RZ, RZ + 0.035);
    box(B.team, -2.05, -1.55, -0.40, 0.40, RZ + 0.035, RZ + 0.047);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.25, -1.35, s > 0 ? 0.62 : -1.18, s > 0 ? 1.18 : -0.62, RZ, RZ + 0.025);
      for (i = 0; i < 5; i++) {
        x = -2.20 + i * 0.19;
        box(B.paint, x, x + 0.05, s > 0 ? 0.64 : -1.16, s > 0 ? 1.16 : -0.64, RZ + 0.025, RZ + 0.055);
      }
      /* the large exhaust pipes on each side of the upper hull rear */
      cyl(B.dark, [-1.95, s * 1.27, RZ + 0.10], [-2.93, s * 1.27, RZ], 0.10, 0.10, 10);
      cyl(B.dark, [-2.93, s * 1.27, RZ], [-2.97, s * 1.27, RZ], 0.075, 0.075, 8);
    }
    /* the tail: a tow pintle and the two pairs of rear lamps */
    box(B.dark, -2.98, -2.90, -0.12, 0.12, 0.70, 0.84);
    for (s = -1; s <= 1; s += 2) box(B.dark, -2.93, -2.89, s * 1.10 - 0.06, s * 1.10 + 0.06, 0.82, 0.92);
  }

  /* M44 hull: it runs on the same torsion-bar gear as the M41 (the T99E1 took the
     T41E1's parts), so the track guard sits at the same 1.30 m: the compartment floor
     FZ = 1.34 m the whole way back, the engine deck DZ = 1.68 m forward of x = 0.70,
     then a 30 degree glacis.  The Texas museum photograph puts the fender line about
     1.4 m up and the compartment top about 3 m; the first build had the floor at 1.00 m
     over a track run that had come up to 1.17 m.  The six road wheels sit 0.71 m apart
     (the same end gaps as the M41), which also agrees with the T99E1 drawing. */
  var FZ = 1.34, DZ = 1.68;
  var ST44 = [
    { x: -3.00, a: [0.85, 0.62], b: [1.00, 1.30], c: [1.60, 1.30], d: [1.60, 1.33], e: [1.50, 1.34] },
    { x: 0.66,  a: [0.90, 0.46], b: [1.05, 1.30], c: [1.60, 1.30], d: [1.60, 1.33], e: [1.50, 1.34] },
    { x: 0.70,  a: [0.90, 0.46], b: [1.05, 1.30], c: [1.60, 1.30], d: [1.60, 1.60], e: [1.42, 1.68] },
    { x: 2.30,  a: [0.90, 0.46], b: [1.05, 1.30], c: [1.60, 1.30], d: [1.60, 1.60], e: [1.42, 1.68] },
    { x: 3.08,  a: [0.80, 0.75], b: [1.00, 1.15], c: [1.50, 1.15], d: [1.50, 1.19], e: [1.30, 1.22] }
  ];
  function glacis44(x) { return DZ - (x - 2.30) * 0.59; }

  function addHull44(B) {
    var s, i, x, y;
    loft(B.paint, ST44);

    /* the open-topped fighting compartment: four plain slab walls, no roof */
    box(B.paint, -3.00, 0.70, 1.50, 1.58, FZ - 0.01, 3.08);
    box(B.paint, -3.00, 0.70, -1.58, -1.50, FZ - 0.01, 3.08);
    box(B.paint, -3.06, -2.98, -1.58, 1.58, FZ - 0.01, 3.08);
    box(B.paint, 0.62, 0.70, -1.58, 1.58, FZ - 0.01, 3.08);
    /* the rear door, as a frame and a hinge strip on the outside of the tail wall */
    box(B.dark, -3.09, -3.06, -1.20, 1.20, FZ + 0.12, FZ + 0.18);
    box(B.dark, -3.09, -3.06, -1.20, 1.20, 2.64, 2.70);
    box(B.dark, -3.09, -3.06, -1.20, -1.14, FZ + 0.12, 2.70);
    box(B.dark, -3.09, -3.06, 1.14, 1.20, FZ + 0.12, 2.70);
    /* inside: shell racks down both walls, the floor panel (team colour) between them */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.95, -0.55, s > 0 ? 1.18 : -1.50, s > 0 ? 1.50 : -1.18, FZ, FZ + 0.60);
      for (i = 0; i < 6; i++) cylZ(B.paint, -2.75 + i * 0.36, s * 1.34, FZ + 0.60, FZ + 0.78, 0.075, 8);
    }
    box(B.team, -2.55, -0.45, -0.90, 0.90, FZ, FZ + 0.012);

    /* the engine deck: louvres on the right, the driver's hatch front left, periscopes on the glacis lip */
    box(B.dark, 0.90, 2.20, -1.20, -0.10, DZ, DZ + 0.02);
    for (i = 0; i < 6; i++) { x = 0.98 + i * 0.21; box(B.paint, x, x + 0.06, -1.18, -0.12, DZ + 0.02, DZ + 0.06); }
    box(B.team, 0.85, 1.40, 0.35, 1.15, DZ, DZ + 0.012);
    cylZ(B.paint, 1.85, 0.72, DZ, DZ + 0.10, 0.27, 14);
    cylZ(B.dark, 1.85, 0.72, DZ + 0.10, DZ + 0.12, 0.20, 12);
    for (i = 0; i < 3; i++) {
      y = 0.45 + i * 0.27; x = 2.40;
      box(B.dark, x - 0.05, x + 0.05, y - 0.06, y + 0.06, glacis44(x) - 0.02, glacis44(x) + 0.10);
      box(B.glass, x + 0.05, x + 0.062, y - 0.045, y + 0.045, glacis44(x) + 0.02, glacis44(x) + 0.08);
    }
    /* tow shackles on the nose, lamp lugs at the corners of the glacis */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.06, 3.14, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.88, 0.98);
      box(B.dark, 2.62, 2.76, s * 1.20 - 0.07, s * 1.20 + 0.07, 1.22, 1.34);
    }
  }

  /* -------------------------------------------------------------- turrets */
  /* M41: group origin on the turret ring (x 0.35, hull roof RZ = 1.58 m); the gun is
     level, 0.44 m above the ring, and sticks out 4.80 m ahead of the ring centre */
  var T41 = [0.35, 0, RZ];
  function addTurret41(TB) {
    var i, a, cx = -0.85, cy = -0.50;
    /* the cast body, vertical but slightly sloped sides, and the stowage-box bustle behind it.
       The ARVN side photograph puts the roof at about 2.45 m, the bustle box nearly as high,
       the cast body running from about 1.25 m behind the ring to 1.3 m ahead of it, and the
       commander's cupola well back on the right (the first build had it level with the ring) */
    prism(TB.paint, [[1.28, 0.55], [1.05, 0.98], [0.40, 1.12], [-0.30, 1.13], [-0.95, 1.03],
                     [-0.95, -1.03], [-0.30, -1.13], [0.40, -1.12], [1.05, -0.98], [1.28, -0.55]], 0.0, 0.86, 1.0, 0.90);
    prism(TB.paint, [[-0.85, 0.95], [-1.80, 0.95], [-2.00, 0.70], [-2.00, -0.70], [-1.80, -0.95], [-0.85, -0.95]],
          0.04, 0.78, 1.0, 0.96);
    /* mantlet, gun with its bore evacuator and the fat muzzle brake, coaxial .30 on the LEFT */
    box(TB.paint, 1.15, 1.50, -0.42, 0.42, 0.14, 0.66);
    cyl(TB.dark, [1.46, 0, 0.44], [4.26, 0, 0.44], 0.082, 0.060, 14);
    cylX(TB.dark, 2.95, 3.50, 0, 0.44, 0.098, 12);
    cylX(TB.dark, 4.24, 4.80, 0, 0.44, 0.115, 14);
    cylX(TB.dark, 4.36, 4.41, 0, 0.44, 0.132, 14);
    cylX(TB.dark, 4.56, 4.61, 0, 0.44, 0.132, 14);
    cylX(TB.dark, 1.50, 1.70, 0.24, 0.44, 0.028, 8);
    box(TB.glass, 1.50, 1.52, -0.34, -0.20, 0.50, 0.60);
    /* commander's cupola on the RIGHT, five vision blocks, the hatch, the .50 on a post in front of it */
    cylZ(TB.paint, cx, cy, 0.76, 0.96, 0.30, 16);
    cylZ(TB.paint, cx, cy, 0.96, 1.00, 0.27, 14);
    for (i = 0; i < 5; i++) {
      a = (-120 + i * 60) * Math.PI / 180;
      rbox(TB.glass, cx + Math.cos(a) * 0.30, cy + Math.sin(a) * 0.30, 0.03, 0.055, a, 0.84, 0.94);
    }
    cylZ(TB.dark, -0.12, cy, 0.84, 1.33, 0.045, 8);
    box(TB.dark, -0.38, 0.14, cy - 0.05, cy + 0.05, 1.33, 1.45);
    cylX(TB.dark, 0.14, 1.12, cy, 1.39, 0.022, 8);
    /* loader's hatch and periscope on the LEFT */
    cylZ(TB.paint, -0.55, 0.50, 0.82, 0.92, 0.26, 14);
    box(TB.glass, -0.20, -0.14, 0.42, 0.58, 0.90, 0.98);
    /* team colour on the roof and the bustle top */
    box(TB.team, 0.12, 0.72, -0.34, 0.34, 0.86, 0.872);
    box(TB.team, -1.60, -1.00, -0.55, 0.55, 0.78, 0.792);
  }

  /* M42: the same ring, an open many-sided turret.  The twin 40 mm barrels
     lie 4 degrees up, 0.70 m above the floor, a slotted flash hider on each */
  var T42 = [0.35, 0, RZ];
  function addTurret42(TB) {
    var el = 4 * Math.PI / 180, tn = Math.tan(el), i, s, z0 = 0.70;
    function gz(x) { return z0 + (x - 1.0) * tn; }
    var ring = [[1.00, 0.62], [0.62, 1.04], [-0.20, 1.10], [-0.85, 1.04], [-1.15, 0.55],
                [-1.15, -0.55], [-0.85, -1.04], [-0.20, -1.10], [0.62, -1.04], [1.00, -0.62]];
    /* the walls: all round, with a gap in the sloped front for the gun cradle */
    walls(TB.paint, [ring[1], ring[2], ring[3], ring[4], ring[5], ring[6], ring[7], ring[8], ring[9]], false, 0.07, 0.0, 1.02);
    walls(TB.paint, [[1.00, 0.62], [1.00, 0.34]], false, 0.07, 0.0, 1.12);
    walls(TB.paint, [[1.00, -0.62], [1.00, -0.34]], false, 0.07, 0.0, 1.12);
    walls(TB.paint, [ring[0], ring[1]], false, 0.07, 0.0, 1.07);
    /* the floor of the turret, seen from above */
    cylZ(TB.team, 0, 0, 0.0, 0.05, 0.97, 24);
    /* the cast gun mount and the two guns */
    box(TB.paint, 0.55, 1.12, -0.38, 0.38, 0.28, 1.00);
    box(TB.dark, 1.10, 1.20, -0.30, 0.30, 0.46, 0.92);
    for (s = -1; s <= 1; s += 2) {
      cyl(TB.dark, [1.12, s * 0.21, gz(1.12)], [1.78, s * 0.21, gz(1.78)], 0.088, 0.088, 12);
      cyl(TB.dark, [1.78, s * 0.21, gz(1.78)], [2.72, s * 0.21, gz(2.72)], 0.058, 0.046, 10);
      cyl(TB.dark, [2.72, s * 0.21, gz(2.72)], [3.10, s * 0.21, gz(3.10)], 0.064, 0.064, 10);
      cyl(TB.dark, [2.93, s * 0.21, gz(2.93)], [3.00, s * 0.21, gz(3.00)], 0.076, 0.076, 10);
      /* the receivers behind the mount and the clip guides on top of them */
      box(TB.dark, -0.40, 0.55, s * 0.21 - 0.11, s * 0.21 + 0.11, 0.46, 0.86);
      box(TB.paint, 0.05, 0.62, s * 0.21 - 0.09, s * 0.21 + 0.09, 0.98, 1.10);
    }
    /* the gunners' seats and the pintle machine gun on the left wall */
    box(TB.dark, -0.95, -0.55, -0.80, -0.45, 0.05, 0.38);
    box(TB.dark, -0.95, -0.55, 0.45, 0.80, 0.05, 0.38);
    cylZ(TB.dark, 0.20, 0.97, 1.02, 1.18, 0.035, 8);
    box(TB.dark, 0.05, 0.40, 0.93, 1.01, 1.18, 1.28);
    cylX(TB.dark, 0.40, 0.95, 0.97, 1.23, 0.016, 8);
  }

  /* M44: the trained part is the HOWITZER and its shield only.  The group sits
     on the gun's pivot just behind the compartment's front face (x 0.55, floor
     FZ = 1.34 m up); the superstructure stays put, because the real mount traverses
     30 degrees inside a fixed compartment.  Barrel +5 degrees, muzzle at x 3.05. */
  var T44 = [0.55, 0, FZ];
  function addHowitzer(TB) {
    var el = 5 * Math.PI / 180, tn = Math.tan(el), h0 = 0.85;
    function ax(x) { return h0 + x * tn; }
    /* pivot pedestal and the trunnion cheeks */
    cylZ(TB.paint, 0, 0, 0.0, 0.62, 0.30, 14);
    box(TB.paint, -0.30, 0.30, 0.26, 0.38, 0.45, 1.30);
    box(TB.paint, -0.30, 0.30, -0.38, -0.26, 0.45, 1.30);
    /* the thick cradle, the 155 mm barrel, the muzzle collar, the breech behind the pivot */
    cyl(TB.paint, [-0.20, 0, ax(-0.20)], [0.78, 0, ax(0.78)], 0.22, 0.22, 16);
    cyl(TB.dark, [0.78, 0, ax(0.78)], [2.50, 0, ax(2.50)], 0.140, 0.115, 14);
    cyl(TB.dark, [2.34, 0, ax(2.34)], [2.50, 0, ax(2.50)], 0.130, 0.130, 14);
    box(TB.dark, -1.05, -0.20, -0.20, 0.20, ax(-0.6) - 0.24, ax(-0.6) + 0.26);
    /* the shield over the opening in the compartment's front face, hard against the wall */
    box(TB.paint, 0.17, 0.31, -0.58, 0.58, 0.30, 1.40);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var T = materials(THREE, C), g = new THREE.Group(), G = which === "M44" ? G44 : G41;
    var HB = bins(T), TB = bins(T), WB = [], i, wg, tg, P;
    for (i = 0; i < G.wx.length; i++) WB.push(new Bin(T.dark, false));
    if (which === "M44") addHull44(HB); else addHull41(HB);
    addRunning(HB, WB, G);
    flush(THREE, g, HB);
    for (i = 0; i < G.wx.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.wx[i], 0, G.wz);
      flush(THREE, wg, { dark: WB[i] });
      g.add(wg);
    }
    if (which === "M41") { addTurret41(TB); P = T41; }
    else if (which === "M42") { addTurret42(TB); P = T42; }
    else { addHowitzer(TB); P = T44; }
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(P[0], P[1], P[2]);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return { build: build };
})();

/* len is the measured X extent of each guise */
UNIT_MODELS["nato_e50_lighttank"] = {
  len: 8.1,
  build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M41"); }
};
UNIT_MODELS["nato_e50_spaag"] = {
  len: 6.4,
  build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M42"); }
};
UNIT_MODELS["nato_e50_spg"] = {
  len: 6.2,
  build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M44"); }
};
