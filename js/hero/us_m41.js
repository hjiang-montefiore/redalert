/* ============ us_m41.js - HERO models: the M41 Walker Bulldog and the vehicles built on its parts ============
   The 1950s US Army's light-armour family, three rows of the e50 roster, each drawn as THAT vehicle:
     nato_e50_lighttank   M41A1 Walker Bulldog  (1953)  76 mm M32 gun, bore evacuator and T-shaped brake
     nato_e50_spaag       M42A1 Duster          (1953)  twin 40 mm M2A1 in an open turret, hull sponsons
     nato_e50_spg         M44 155 mm SPH        (1953)  open-topped rear compartment on a stretched
                                                        M41-parts chassis, engine and sprocket in FRONT

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons, width 960, cached in
   scratchpad/q_m41_ref:
     P1  "M41 Walker Bulldog Side View.jpg" (Philippine Military Academy) - port side, nearly square
         on: low hull, five dual road wheels, raised front IDLER, rear SPROCKET, the angular turret
         with its bustle, the long gun with the fat bore evacuator and the brake at the muzzle.
     P2  "M41 Walker Bulldog - Tancremont - side view.jpg" - starboard side, turret REVERSED for
         display: toothed sprocket raised at the rear, plain idler raised at the front, three return
         rollers, the fender stowage boxes, the overhanging bustle box.
     P3  "... - front view.jpg" - the hull front (turret reversed): the glacis with its horizontal top,
         the twin lamp clusters in guards at the glacis corners, the big tow clevises, the curved
         lower nose with two towing hooks, the angled front fender ends; the bustle box from behind.
     P4  "... - Rear view.jpg" - the rear deck and sloped rear plate with louvred corners, the gun
         travel lock on the rear deck, the cast mantlet with its collar, the tail lamps.
     P5  "Georgia Guardsmen exercises with M41 Fort Stewart July 1961.jpg" (dated, US service) - port
         front 3/4: the commander's .50 on the right cupola, the raised front idler, olive drab.
     P6  "M42 DUSTER - AL POST 713 DEERFIELD OH 12MAY11 (LH).jpg" - port side square on: the M41
         running gear measured here (0.98 px/cm, hull 5.82 m): road wheels 0.865 m apart, 0.65 m
         tyres, idler centre 0.80 m up, sprocket 0.66 m, rollers about 1.0 m, fender 1.34 m, the
         SPONSON boxes to 1.85 m, the open turret 2.1 m long with the tall sight shield at its front.
     P7  "... (RF).jpg" - starboard front 3/4: the sponsons, the rounded open turret, the twin guns in
         one cradle, the glacis access plate, lamp clusters and clevises as on the M41.
     P8  "M42 Duster in 1968.jpg" (Vietnam, dated) - starboard rear 3/4: rear deck, sprocket, the
         sponson boxes, the cone flash hiders, the clip-feed guides over the breeches.
     P9  "M44 - Tancremont - left.jpg" - port rear 3/4: SIX road wheels, FOUR return rollers, the
         toothed SPROCKET raised at the FRONT, the tall slab-sided compartment over the rear two
         thirds with three step brackets and a side door, four bows over it, the low front engine deck.
     P10 "M44 - Tancremont - front.jpg" - head on: the howitzer in its recoil sleeve between a tall
         box on the left (driver) and a lower one on the right, the engine deck and glacis, the
         mufflers on the front fenders.
     P11 "M44 Vista trasera con las santa barbara en posicion de combate.jpg" and P12 "M44 Vista
         trasera.jpg" (Spanish Army museum) - the two rear doors, the hinged rear platform, the ring
         mount at the rear left corner; P12 shows a canvas cover on the bows.
   Text: en.wikipedia "M41 Walker Bulldog" (torsion bars, five road wheels, "drive sprocket at the
   rear and idler towards the front, and three track return rollers"; "well sloped glacis plate with
   a horizontal top"; "large exhaust pipes on each side of the upper hull rear"; the bustle and
   stowage box, the commander's cupola on the RIGHT with five vision blocks, the M32 with bore
   evacuator and blast deflector), "M42 Duster", "M44 self-propelled howitzer" (T99E1 built on T41E1
   parts; open roofless compartment from the T194E1 rework; M45 howitzer; driver in the compartment
   until the Turkish rebuild moved him into the hull).

   Published figures (length x width x height, m) and what is drawn:
     M41A1  hull 5.81 x 3.19 x 2.72 (to the cupola), 8.12 over the gun (Hunnicutt), clearance 0.45.
            Drawn: hull 5.81 between the plates, 3.23 over the fenders, 8.12 from the rear plate to the
            muzzle (8.15 with the mud flaps), cupola roof 2.70, the .50 2.90.
     M42A1  5.82 x 3.23 x 2.85, 6.36 over the guns.  Drawn: 6.36 plate to muzzle (6.46 with the flaps),
            3.24 wide, 2.82 high.
     M44    6.16 x 3.24 x 3.11.  Drawn: 6.08 over the hull plates, 6.23 with the muzzle and the folded
            platform, 3.26 wide, walls 2.67, bows 3.13.

   CORRECTIONS against the previous model (the references do not support it):
     - the M41 turret was a rounded "cast" body; it is the WELDED angular turret of P1-P4 with the
       bustle box hung behind it and a cast mantlet; the gun now ends in the T-shaped brake with the
       fat bore evacuator right behind it (P1), not two rings;
     - the idler stands raised at 0.80 m under the nose, as big as a road wheel (P1, P2, P5, P6);
       the M41/M42 road wheels sit 0.865 m apart (P6), the M44 has FOUR return rollers (P9), not 3;
     - the M42 hull carries the long SPONSON boxes over both tracks to 1.85 m (P6, P7, P8), and the
       turret is rounded at the front with a tall sight shield on its left (P6, P7);
     - the M44 compartment walls stop at 2.67 m; the 3.11 m is the top of the four bows (P9-P12);
       the howitzer sits in a recoil sleeve between a tall left (driver) box and a lower right box
       (P10); the mufflers sit on the front fenders (P10); the ring mount stands at the rear left
       corner (P11); the rear is two doors over a hinged platform (P11, P12).

   Recognition list (what makes each read at game zoom, and its source):
     M41A1
      1. long low hull, flat deck, ONE well sloped glacis with a horizontal top - P1, P3, text
      2. five dual road wheels, three return rollers, raised front idler, raised rear sprocket - P1, P2, text
      3. the angular welded turret set amidships, big bustle box overhanging the deck - P1, P2, P3
      4. the long 76 mm M32 with the fat bore evacuator and the T-shaped brake - P1, text
      5. commander's cupola on the RIGHT with five blocks and the .50 - P5, text
      6. twin lamp clusters in guards on the glacis corners, the big clevises - P3
      7. the big exhaust pipes on the rear fenders, louvred rear plate corners, travel lock - P4, text
      8. fender stowage boxes, angled front fender ends - P2, P3
     M42A1
      1. the M41 hull and running gear - P6, P7
      2. the long sponson boxes over both tracks - P6, P7, P8
      3. the open turret, rounded front, tall angled sight shield on its left - P6, P7
      4. the twin 40 mm barrels side by side, recoil springs, cone flash hiders - P7, P8
      5. the clip-feed guides standing over the breeches - P6, P8
     M44
      1. six road wheels, four return rollers, toothed sprocket raised at the FRONT - P9
      2. the tall slab-sided open compartment over the rear two thirds, step brackets, side door - P9
      3. the four bows over the compartment - P9, P10, P11
      4. the fat 155 mm howitzer in its recoil sleeve out of the compartment front - P9, P10
      5. tall driver's box left, lower box right of the gun, low engine deck and glacis - P10
      6. mufflers on the front fenders - P10
      7. two rear doors over the hinged platform, ring mount at the rear left corner - P11, P12

   Paint: 1950s US olive drab, no pattern.  The dated colour slide (P8, 1968) has faded to magenta and
   is not usable; the museum repaints read #425349 (P6) to #787465 (P2, sunlit).  The base is the FS
   24087 olive drab of the redone M48 (us_m48.js, #545437), the same paint of the same years, about
   0.8 of the museum mean.  No stars, bumper codes, registration numbers or names.
   NOT CONFIRMED, left off: the M44 rear SPADE (no photograph here shows one: P11/P12 show a hinged
   platform, P9 its brackets); the canvas cover (one photograph, P12; the M44 is drawn open with the
   bows as P9-P11 show it); radio masts; the M42 pintle machine gun (P8 shows an M60 of 1968, not the
   1953 row); any infrared searchlight; a turret ventilator dome; M41A1 against M41 differences
   (internal: hydraulic traverse); M42A1 against M42 (internal: the engine).
   Materials: PAINT (canvas texture, metre UVs: olive drab, plate seams, bolt rows, grime), DARK,
   GLASS, WHEEL (vertex colours) and the team colour exactly as handed in (C.team) on small panels:
   two on the rear deck and one on the bustle (M41), on the deck and the turret floor (M42), on the
   engine deck and the compartment floor (M44).  Nodes: "turret" (gun along +X; on the M44 only the howitzer, its sleeve and shield, since
   the mount traverses inside a fixed compartment) and one "roadwheel" group per station, both sides
   in one mesh, axle on local Y.  Model space +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM41 = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var PAINT = { base: "#545437", seed: 1953, us: 0.34 };

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
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through rings of the same count, the end rings capped with fans */
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
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
  }
  /* a convex plan outline extruded z0..z1, the top shrunk about its centre by k1, the bottom by k0 */
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
  /* thin upright slabs along a polyline of (x, y), corners overlapping a little */
  function walls(bin, pts, closed, th, z0, z1) {
    var i, n = pts.length, m = closed ? n : n - 1, p, q, dx, dy, l, a;
    for (i = 0; i < m; i++) {
      p = pts[i]; q = pts[(i + 1) % n]; dx = q[0] - p[0]; dy = q[1] - p[1]; l = Math.sqrt(dx * dx + dy * dy); a = Math.atan2(dy, dx);
      slab(bin, [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (z0 + z1) / 2], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], l / 2 + th * 0.6, th / 2, (z1 - z0) / 2);
    }
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* olive drab, one tile 1 / 0.34 = 2.9 m: the soft mottle of a brushed single coat, welded plate
     seams with bolt rows (P3, P4 show the bolted access plates and the welded seams), dust and
     rain streaks low down (P2, P9) */
  function paintTex(THREE, P) {
    var key = "m41" + P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512;
      cv.width = S; cv.height = S;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 30; i++) {
        q.globalAlpha = 0.12 + R() * 0.14; q.fillStyle = i % 2 ? "#4a4a30" : "#5e5e40";
        q.beginPath(); if (q.ellipse) q.ellipse(R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, R() * 3, 0, TAU); else q.rect(R() * S, R() * S, 60, 40); q.fill();
      }
      q.globalAlpha = 1;
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(22,22,12,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,232,200,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,10,0.40)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(22,20,10,0.07)" : "rgba(235,228,195,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(60,52,36,0.07)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true, false, PAINT.us), dark: new Bin(T.dark, false),
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

  /* ------------------------------------------------------- running gear */
  /* M41 / M42 (P6 at 0.98 px/cm, the text): five dual road wheels 0.865 m apart, 0.65 m tyres; the
     idler raised under the nose, as big as a road wheel; the sprocket raised at the rear; three
     return rollers; 21 in (0.53 m) track on 2.66 m centres.
     M44 (P9): six wheels, four rollers, the sprocket raised at the FRONT, the idler behind the last
     wheel at the rear (the track climbs from it to the top run). */
  var TY = 1.33, TW = 0.265, ZW = 0.36, RW = 0.325;
  var GEAR = {
    M41: { XW: [1.96, 1.10, 0.23, -0.63, -1.50], F: { x: 2.60, z: 0.80, r: 0.31, teeth: false },
           R: { x: -2.42, z: 0.66, r: 0.30, teeth: true }, RL: [1.36, -0.12, -1.22], ZR: 1.00 },
    M44: { XW: [1.85, 1.05, 0.25, -0.55, -1.35, -2.15], F: { x: 2.66, z: 0.74, r: 0.30, teeth: true },
           R: { x: -2.76, z: 0.56, r: 0.28, teeth: false }, RL: [1.45, 0.65, -0.15, -0.95], ZR: 1.00 }
  };
  var _loops = {};
  function trackLoop(G, key) {
    if (_loops[key]) return _loops[key];
    var P = [], i, k, a, n = 10, segs = [], tot = 0, l, b, th = 0.04, F = G.F, R = G.R;
    var rF = F.r + (F.teeth ? 0.02 : th), rR = R.r + (R.teeth ? 0.02 : th), XW = G.XW;
    /* front wheel: from its top, round the front, down to the ground run */
    for (k = 0; k <= n; k++) { a = Math.PI / 2 - k / n * (Math.PI - 0.55); P.push([F.x + Math.cos(a) * rF, F.z + Math.sin(a) * rF]); }
    P.push([XW[0] + 0.12, 0.03]);
    P.push([XW[XW.length - 1] - 0.12, 0.03]);
    /* rear wheel: from the ground run, round the back, to its top */
    for (k = 0; k <= n; k++) { a = (-Math.PI / 2 - 0.55) - k / n * (Math.PI - 0.55); P.push([R.x + Math.cos(a) * rR, R.z + Math.sin(a) * rR]); }
    /* top run over the return rollers */
    for (i = G.RL.length - 1; i >= 0; i--) P.push([G.RL[i], G.ZR + 0.105 + th / 2]);
    for (i = 0; i < P.length; i++) {
      a = P[i]; b = P[(i + 1) % P.length];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    _loops[key] = { segs: segs, tot: tot };
    return _loops[key];
  }
  function endWheel(B, W, y, s) {
    var k, t;
    if (W.teeth) {
      /* sprocket: two toothed rings either side of the track's centre guides, a dished hub (P2, P9) */
      for (var h = -1; h <= 1; h += 2) {
        cylY(B.dark, W.x, y + h * 0.10 - 0.035, y + h * 0.10 + 0.035, W.z, W.r - 0.02, 20);
        for (k = 0; k < 13; k++) {
          t = k / 13 * TAU;
          slab(B.dark, [W.x + Math.cos(t) * W.r, y + h * 0.10, W.z + Math.sin(t) * W.r], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.045, 0.03, 0.03);
        }
      }
      cylY(B.paint, W.x, y + s * 0.14, y + s * 0.18, W.z, W.r - 0.06, 16);
      cylY(B.dark, W.x, y + s * 0.18, y + s * 0.22, W.z, 0.10, 12);
      for (k = 0; k < 8; k++) { t = k / 8 * TAU; cylY(B.dark, W.x + Math.cos(t) * 0.15, y + s * 0.175, y + s * 0.19, W.z + Math.sin(t) * 0.15, 0.022, 6); }
    } else {
      /* idler: a dual disc wheel the size of a road wheel on its crank (P2, P5, P6) */
      cylY(B.dark, W.x, y - 0.15, y - 0.03, W.z, W.r, 18);
      cylY(B.dark, W.x, y + 0.03, y + 0.15, W.z, W.r, 18);
      cylY(B.paint, W.x, y + s * 0.15, y + s * 0.18, W.z, W.r - 0.08, 16);
      cylY(B.dark, W.x, y + s * 0.18, y + s * 0.21, W.z, 0.08, 10);
    }
  }
  function addRunning(B, G, key, hullW) {
    var L = trackLoop(G, key), segs = L.segs, n = segs.length, cnt = 92, step = L.tot / cnt;
    var s, y, i, k, q, rem, d, t, a, b, dx, dz, px, pz;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.02, y + TW - 0.02, 0.03);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the shoe, its end connectors and the centre guide horn between the dual wheels */
        belt(B.dark, px - dx * 0.06, pz - dz * 0.06, px + dx * 0.06, pz + dz * 0.06, y - TW, y + TW, 0.05);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.025 + dz * 0.04, pz - dz * 0.025 - dx * 0.04, px + dx * 0.025 + dz * 0.04, pz + dz * 0.025 - dx * 0.04, y - 0.025, y + 0.025, 0.06);
      }
      endWheel(B, G.F, y, s);
      endWheel(B, G.R, y, s);
      /* return rollers: dual, on stub axles off the hull side */
      for (i = 0; i < G.RL.length; i++) {
        cylY(B.dark, G.RL[i], y - 0.14, y - 0.03, G.ZR, 0.105, 12);
        cylY(B.dark, G.RL[i], y + 0.03, y + 0.14, G.ZR, 0.105, 12);
        cylY(B.dark, G.RL[i], s * hullW, y, G.ZR, 0.04, 8);
      }
      /* torsion-bar arms trailing from the hull to each wheel, shock absorbers on stations 1, 2 and last (text) */
      for (k = 0; k < G.XW.length; k++) slab(B.dark, [G.XW[k] + 0.20 * (key === "M44" ? -1 : 1), s * (TY - 0.27), ZW + 0.10], unit([key === "M44" ? -0.85 : 0.85, 0, 0.53]), [0, 1, 0], unit([key === "M44" ? 0.53 : -0.53, 0, 0.85]), 0.24, 0.05, 0.05);
      var SA = [0, 1, G.XW.length - 1];
      for (k = 0; k < SA.length; k++) { i = SA[k]; cyl(B.dark, [G.XW[i] - 0.05, s * (hullW + 0.02), ZW + 0.14], [G.XW[i] - 0.35, s * (hullW + 0.02), 0.92], 0.04, 0.04, 8); }
    }
  }
  /* road wheel (P1, P2 crops): dual pressed-steel discs with rubber tyres, a hub with ten nuts and a
     cap; the centre guides run between the two discs.  Both sides of the axle in one group. */
  var TYRE = [0.12, 0.125, 0.115], NUT = [0.16, 0.17, 0.15];
  function addWheel(W) {
    var c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.1, gg * 1.1, bb * 1.1], RIM = [rr * 1.25, gg * 1.25, bb * 1.25], s, y, h, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (h = -1; h <= 1; h += 2) {
        W.col = TYRE;
        cylY(W, 0, y + h * 0.03, y + h * 0.15, 0, RW, 18);
        W.col = BODY;
        cylY(W, 0, y + h * 0.025, y + h * 0.155, 0, RW - 0.06, 14);
      }
      W.col = RIM;
      cyl(W, [0, y + s * 0.158, 0], [0, y + s * 0.18, 0], RW - 0.075, 0.13, 18);
      W.col = BODY;
      cylY(W, 0, y + s * 0.175, y + s * 0.20, 0, 0.12, 14);
      W.col = NUT;
      for (i = 0; i < 8; i++) { a = i / 8 * TAU; cylY(W, Math.cos(a) * 0.095, y + s * 0.195, y + s * 0.21, Math.sin(a) * 0.095, 0.015, 5); }
      cylY(W, 0, y + s * 0.20, y + s * 0.225, 0, 0.055, 10);
    }
  }

  /* ---------------------------------------------------------------- hulls */
  /* M41 / M42 hull, side profile from P6 (the M42 shares it) and P1, front and rear from P3, P4:
     the roof flat at RZ = 1.58 m from the engine doors to the glacis knee at x 1.95, the glacis
     falling at 32 degrees to a short nose at 0.96 m; the lower nose plate curving back to the belly
     (0.45 m clearance) at x 2.30; at the rear the sloped engine-door plate from x -2.42 down to
     1.08 m and the vertical lower rear plate.  The upper hull is 2.94 m wide over the tracks, the
     lower hull 2.04 m between them; the sponson floor sits at 1.26 m, over the 1.15 m top run. */
  var RZ = 1.58, KNEE = 1.95, HX = 2.905, WU = 1.47, WLO = 1.02, ZS = 1.26;
  var TOP41 = [[-HX, 1.08], [-2.48, 1.50], [-2.42, RZ], [KNEE, RZ], [HX, 0.96]];
  var BOT41 = [[-HX, 0.66], [-2.72, 0.47], [-2.55, 0.45], [2.30, 0.45], [2.62, 0.56], [2.82, 0.72], [HX, 0.86]];
  var XS41 = [-HX, -2.86, -2.72, -2.55, -2.48, -2.42, -1.2, 0.2, 1.4, KNEE, 2.12, 2.30, 2.45, 2.62, 2.72, 2.82, 2.88, HX];
  function top41(x) { return pwl(TOP41, x); }
  function ring41(x) {
    var zb = pwl(BOT41, x), zt = top41(x), zs = Math.max(Math.min(ZS, zt - 0.04), zb + 0.10), wu = x > 2.80 ? WU - 0.05 : WU, wl = x > 2.75 ? WLO - 0.05 : WLO;
    var R = [[wl - 0.07, zb], [wl, zb + 0.08], [wl, zs], [wu, zs], [wu, zt - 0.035], [wu - 0.035, zt]], out = [], i;
    for (i = 0; i < R.length; i++) out.push([x, R[i][0], R[i][1]]);
    for (i = R.length - 1; i >= 0; i--) out.push([x, -R[i][0], R[i][1]]);
    return out;
  }
  /* the fender over each track: flat from the tail to x 2.30, then angled down to the nose (P3) */
  function fenders41(B, s, x0) {
    var y0 = s * (WU - 0.02), y1 = s * 1.60, ya = Math.min(y0, y1), yb = Math.max(y0, y1);
    box(B.paint, x0, 2.30, ya, yb, ZS + 0.02, ZS + 0.055);
    belt(B.paint, 2.29, ZS + 0.04, 2.98, 1.00, ya, yb, 0.035);
    box(B.paint, 2.95, 2.985, ya, yb, 0.92, 1.03);
    box(B.dark, x0, 2.30, s > 0 ? 1.595 : -1.61, s > 0 ? 1.61 : -1.595, ZS - 0.01, ZS + 0.06);
    /* rear mud flap */
    box(B.paint, x0 - 0.03, x0, ya, yb, 0.98, ZS + 0.05);
  }
  function addHull41(B, isDuster) {
    var R = [], i, k, s, x, y, z;
    for (i = 0; i < XS41.length; i++) R.push(ring41(XS41[i]));
    loftN(B.paint, R);
    var gz = function (xx) { return top41(xx); };

    for (s = -1; s <= 1; s += 2) {
      fenders41(B, s, -2.98);
      /* twin lamp clusters (head and blackout lamps) on the glacis corners inside a bar guard (P3) */
      x = 2.42; z = gz(x); y = s * 1.18;
      box(B.dark, x - 0.10, x + 0.06, y - 0.20, y + 0.20, z - 0.02, z + 0.06);
      for (k = -1; k <= 1; k += 2) {
        cylX(B.dark, x - 0.06, x + 0.08, y + k * 0.095, z + 0.16, 0.085, 0.085, 12);
        cylX(B.glass, x + 0.08, x + 0.09, y + k * 0.095, z + 0.16, 0.07, 0.07, 12);
      }
      belt(B.dark, x + 0.17, z - 0.02, x + 0.17, z + 0.30, y - 0.24, y - 0.21, 0.025);
      belt(B.dark, x + 0.17, z - 0.02, x + 0.17, z + 0.30, y + 0.21, y + 0.24, 0.025);
      belt(B.dark, x - 0.08, z + 0.30, x + 0.17, z + 0.30, y - 0.24, y + 0.24, 0.025);
      /* big tow clevises at the nose corners and the towing hooks on the lower nose plate (P3) */
      cylY(B.dark, 2.96, s * 1.10 - 0.07, s * 1.10 + 0.07, 0.90, 0.05, 8);
      slab(B.dark, [3.00, s * 1.10, 0.80], [0, 0, 1], [0, 1, 0], [1, 0, 0], 0.12, 0.10, 0.025);
      cylX(B.dark, 2.95, 3.06, s * 1.10, 0.68, 0.035, 0.035, 8);
      slab(B.dark, [2.82, s * 0.45, 0.70], unit([0.62, 0, -0.78]), [0, 1, 0], unit([0.78, 0, 0.62]), 0.09, 0.04, 0.05);
      /* the big exhaust pipes on each side of the upper hull rear, over the rear fenders (text, P4) */
      cylX(B.dark, -2.95, -1.62, s * 1.48, ZS + 0.17, 0.11, 0.11, 14);
      cylX(B.dark, -2.98, -2.95, s * 1.48, ZS + 0.17, 0.085, 0.085, 12);
      box(B.paint, -2.85, -1.75, s > 0 ? 1.36 : -1.60, s > 0 ? 1.60 : -1.36, ZS + 0.29, ZS + 0.31);
      for (k = 0; k < 3; k++) { x = -2.70 + k * 0.45; box(B.dark, x - 0.03, x + 0.03, s > 0 ? 1.40 : -1.58, s > 0 ? 1.58 : -1.40, ZS + 0.05, ZS + 0.30); }
      /* louvred grilles at the corners of the sloped rear plate, tail lamps under them (P4) */
      for (k = 0; k < 5; k++) {
        z = 1.16 + k * 0.075; x = -HX + (z - 1.08) / (RZ - 1.08) * (HX - 2.42) - 0.02;
        belt(B.dark, x - 0.02, z - 0.015, x + 0.05, z + 0.03, s > 0 ? 0.95 : -1.38, s > 0 ? 1.38 : -0.95, 0.02);
      }
      box(B.dark, -2.95, -2.905, s * 1.20 - 0.08, s * 1.20 + 0.08, 0.86, 0.98);
      box(B.glass, -2.96, -2.95, s * 1.20 - 0.05, s * 1.20 + 0.05, 0.88, 0.96);
      /* lifting eyes at the deck corners */
      cylY(B.dark, -2.30, s * 1.30, s * 1.40, RZ + 0.05, 0.045, 8);
      cylY(B.dark, KNEE - 0.10, s * 1.30, s * 1.40, RZ + 0.05, 0.045, 8);
    }
    /* rear plate: tow pintle and the two lower tow hooks (P4) */
    box(B.dark, -2.97, -2.905, -0.13, 0.13, 0.62, 0.78);
    cylX(B.dark, -2.98, -2.97, 0, 0.70, 0.05, 0.05, 8);
    for (s = -1; s <= 1; s += 2) slab(B.dark, [-2.94, s * 0.55, 0.78], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.05, 0.05, 0.08);
    /* engine deck: the access doors, a seam between them, team colour on the two door panels */
    box(B.paint, -2.40, -1.20, -0.95, 0.95, RZ, RZ + 0.02);
    box(B.dark, -2.40, -1.20, -0.01, 0.01, RZ + 0.02, RZ + 0.03);
    for (s = -1; s <= 1; s += 2) {
      box(B.team, -2.05, -1.80, s > 0 ? 0.20 : -0.85, s > 0 ? 0.85 : -0.20, RZ + 0.02, RZ + 0.032);
      cylZ(B.dark, -1.40, s * 0.55, RZ + 0.02, RZ + 0.06, 0.07, 10);
    }
    /* glacis access plate with bolt rows (P3, P7) */
    x = 2.20; z = gz(2.20);
    belt(B.paint, 2.02, gz(2.02) + 0.015, 2.62, gz(2.62) + 0.015, -0.70, 0.70, 0.03);
    for (k = 0; k < 8; k++) { y = -0.62 + k * 0.177; box(B.dark, 2.04, 2.07, y - 0.015, y + 0.015, gz(2.05), gz(2.05) + 0.045); }

    if (!isDuster) {
      /* M41: driver front LEFT on the roof edge, his hatch and three periscopes over the glacis (text) */
      cylZ(B.paint, 1.62, 0.66, RZ, RZ + 0.07, 0.26, 16);
      box(B.dark, 1.42, 1.80, 0.64, 0.68, RZ + 0.07, RZ + 0.09);
      for (k = 0; k < 3; k++) {
        y = 0.44 + k * 0.22;
        box(B.dark, 1.86, 1.95, y - 0.07, y + 0.07, RZ - 0.02, RZ + 0.09);
        box(B.glass, 1.95, 1.955, y - 0.05, y + 0.05, RZ + 0.03, RZ + 0.07);
      }
      /* fender stowage boxes ahead of the turret (P2) */
      for (s = -1; s <= 1; s += 2) {
        box(B.paint, 0.35, 1.95, s > 0 ? 1.47 : -1.60, s > 0 ? 1.60 : -1.47, ZS + 0.05, ZS + 0.30);
        box(B.dark, 0.35, 1.95, s > 0 ? 1.60 : -1.605, s > 0 ? 1.605 : -1.60, ZS + 0.27, ZS + 0.285);
        for (k = 0; k < 3; k++) box(B.dark, 0.60 + k * 0.55, 0.66 + k * 0.55, s > 0 ? 1.60 : -1.615, s > 0 ? 1.615 : -1.60, ZS + 0.18, ZS + 0.25);
      }
      /* the gun travel lock folded flat on the rear deck (P4 shows it on the deck, raised) */
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, -2.45, -2.33, s * 0.34 - 0.05, s * 0.34 + 0.05, RZ + 0.02, RZ + 0.12);
        belt(B.dark, -2.38, RZ + 0.08, -1.30, RZ + 0.07, s * 0.34 - 0.03, s * 0.34 + 0.03, 0.05);
      }
      belt(B.dark, -1.36, RZ + 0.07, -1.24, RZ + 0.07, -0.37, 0.37, 0.05);
    }
  }

  /* M42: the M41 hull with the long ammunition SPONSON boxes over both tracks, from just behind the
     glacis knee to the engine deck, 1.85 m high (P6, P7, P8) */
  function addSponsons(B) {
    var s, k, x, ya, yb;
    for (s = -1; s <= 1; s += 2) {
      ya = s > 0 ? 1.10 : -1.60; yb = s > 0 ? 1.60 : -1.10;
      box(B.paint, -0.72, 1.90, ya, yb, ZS + 0.04, 1.85);
      box(B.paint, -0.74, 1.92, s > 0 ? 1.08 : -1.62, s > 0 ? 1.62 : -1.08, 1.85, 1.875);
      /* the lid seams and hinges along the top, lifting rings and latches down the side */
      for (k = 0; k < 4; k++) {
        x = -0.55 + k * 0.65;
        box(B.dark, x - 0.01, x + 0.01, ya, yb, 1.875, 1.885);
        cylY(B.dark, x + 0.30, s * 1.59, s * 1.615, 1.68, 0.03, 8);
        box(B.dark, x + 0.25, x + 0.35, s > 0 ? 1.60 : -1.615, s > 0 ? 1.615 : -1.60, 1.42, 1.50);
      }
      box(B.dark, -0.72, 1.90, s > 0 ? 1.60 : -1.61, s > 0 ? 1.61 : -1.60, 1.30, 1.32);
    }
    /* driver's hatch front left between the sponson and the turret front, three periscopes */
    cylZ(B.paint, 1.70, 0.70, RZ, RZ + 0.07, 0.24, 16);
    for (k = 0; k < 2; k++) { box(B.dark, 1.90, 1.98, 0.50 + k * 0.32 - 0.07, 0.50 + k * 0.32 + 0.07, RZ - 0.02, RZ + 0.09); box(B.glass, 1.98, 1.985, 0.50 + k * 0.32 - 0.05, 0.50 + k * 0.32 + 0.05, RZ + 0.03, RZ + 0.07); }
  }

  /* M44 hull (P9, P10, P11): engine and drive at the FRONT under a low deck (DZ 1.68 m) and a 30
     degree glacis; the fighting compartment over the rear from x -2.97 to 0.62, slab walls standing
     on the fender line out to the full 3.22 m width, open on top; the floor FZ = 1.34 m. */
  var FZ = 1.34, DZ = 1.68, WT = 2.67, CF = 0.62, HX44 = 2.97;
  var TOP44 = [[-HX44, 1.36], [CF, 1.36], [CF + 0.02, DZ], [2.35, DZ], [3.10, 1.18]];
  var BOT44 = [[-HX44, 0.60], [-2.85, 0.46], [2.40, 0.46], [2.80, 0.62], [3.10, 0.92]];
  var XS44 = [-HX44, -2.85, -1.0, CF, CF + 0.02, 1.5, 2.35, 2.40, 2.60, 2.80, 2.95, 3.10];
  function ring44(x) {
    var zb = pwl(BOT44, x), zt = pwl(TOP44, x), zs = Math.max(Math.min(1.28, zt - 0.04), zb + 0.10), wu = x > 2.95 ? 1.42 : 1.50, wl = WLO;
    var R = [[wl - 0.07, zb], [wl, zb + 0.08], [wl, zs], [wu, zs], [wu, zt - 0.03], [wu - 0.03, zt]], out = [], i;
    for (i = 0; i < R.length; i++) out.push([x, R[i][0], R[i][1]]);
    for (i = R.length - 1; i >= 0; i--) out.push([x, -R[i][0], R[i][1]]);
    return out;
  }
  function addHull44(B) {
    var R = [], i, k, s, x, y, z;
    for (i = 0; i < XS44.length; i++) R.push(ring44(XS44[i]));
    loftN(B.paint, R);
    var gz = function (xx) { return pwl(TOP44, xx); };
    /* compartment walls: sides out to 1.61, the rear wall, the front wall each side of the gun port */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -HX44, CF + 0.05, s > 0 ? 1.53 : -1.61, s > 0 ? 1.61 : -1.53, 1.26, WT);
      box(B.paint, -HX44 - 0.01, CF + 0.06, s > 0 ? 1.52 : -1.62, s > 0 ? 1.62 : -1.52, WT - 0.04, WT + 0.01);
      /* fender shelf ahead of the compartment, sloping to the nose (P9, P10) */
      box(B.paint, CF, 2.40, s > 0 ? 1.48 : -1.61, s > 0 ? 1.61 : -1.48, 1.28, 1.31);
      belt(B.paint, 2.39, 1.30, 3.06, 1.06, s > 0 ? 1.40 : -1.61, s > 0 ? 1.61 : -1.40, 0.03);
      /* three step brackets low on the compartment side, the side door at its front (P9) */
      for (k = 0; k < 3; k++) {
        x = -2.55 + k * 0.82;
        box(B.dark, x - 0.10, x + 0.10, s > 0 ? 1.61 : -1.625, s > 0 ? 1.625 : -1.61, 1.52, 1.70);
        box(B.dark, x - 0.08, x + 0.08, s > 0 ? 1.61 : -1.625, s > 0 ? 1.625 : -1.61, 1.70, 1.73);
      }
      box(B.paint, -0.55, 0.30, s > 0 ? 1.61 : -1.625, s > 0 ? 1.625 : -1.61, 1.45, 2.05);
      box(B.dark, -0.55, 0.30, s > 0 ? 1.625 : -1.63, s > 0 ? 1.63 : -1.625, 2.04, 2.06);
      box(B.dark, 0.20, 0.26, s > 0 ? 1.61 : -1.625, s > 0 ? 1.625 : -1.61, 1.70, 1.80);
      /* mufflers on the front fenders (P10) */
      cylX(B.dark, 1.55, 2.45, s * 1.30, 1.45, 0.13, 0.13, 14);
      cylX(B.dark, 2.45, 2.62, s * 1.30, 1.45, 0.06, 0.06, 8);
      box(B.dark, 1.70, 1.78, s * 1.30 - 0.10, s * 1.30 + 0.10, 1.31, 1.34);
      box(B.dark, 2.25, 2.33, s * 1.30 - 0.10, s * 1.30 + 0.10, 1.31, 1.34);
      /* lamp clusters in their guards on the glacis corners, tow shackles on the nose */
      x = 2.62; z = gz(x); y = s * 1.15;
      for (k = -1; k <= 1; k += 2) { cylX(B.dark, x - 0.05, x + 0.08, y + k * 0.09, z + 0.13, 0.075, 0.075, 10); cylX(B.glass, x + 0.08, x + 0.09, y + k * 0.09, z + 0.13, 0.06, 0.06, 10); }
      belt(B.dark, x + 0.15, z - 0.02, x + 0.15, z + 0.26, y - 0.20, y + 0.20, 0.025);
      cylY(B.dark, 3.06, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.95, 0.05, 8);
      slab(B.dark, [3.08, s * 0.60, 0.86], [0, 0, 1], [0, 1, 0], [1, 0, 0], 0.11, 0.09, 0.025);
    }
    box(B.paint, -HX44 - 0.02, -HX44 + 0.06, -1.61, 1.61, 1.26, WT);
    /* front wall: the tall driver's box on the LEFT (to the wall top), the lower box on the right (P10) */
    box(B.paint, CF - 0.02, 1.02, 0.55, 1.61, 1.36, WT);
    box(B.dark, 1.02, 1.03, 0.75, 1.30, 2.30, 2.40);
    box(B.glass, 1.025, 1.035, 0.80, 1.25, 2.32, 2.38);
    box(B.paint, CF - 0.02, 0.98, -1.61, -0.60, 1.36, 2.22);
    box(B.paint, CF - 0.02, CF + 0.06, -0.60, 0.55, 1.36, 1.60);
    /* the rear: two doors with their hinges and handles, the hinged platform folded up under them (P11, P12) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -HX44 - 0.05, -HX44 - 0.02, s > 0 ? 0.04 : -0.95, s > 0 ? 0.95 : -0.04, 1.55, 2.55);
      for (k = 0; k < 2; k++) box(B.dark, -HX44 - 0.07, -HX44 - 0.05, s * 0.93 - 0.04, s * 0.93 + 0.04, 1.70 + k * 0.65, 1.82 + k * 0.65);
      box(B.dark, -HX44 - 0.08, -HX44 - 0.05, s * 0.20 - 0.10, s * 0.20 + 0.10, 2.10, 2.13);
      box(B.dark, -HX44 - 0.06, -HX44 - 0.02, s * 1.38 - 0.07, s * 1.38 + 0.07, 1.58, 1.70);
      box(B.glass, -HX44 - 0.07, -HX44 - 0.06, s * 1.38 - 0.05, s * 1.38 + 0.05, 1.60, 1.68);
    }
    box(B.paint, -HX44 - 0.10, -HX44 - 0.04, -0.98, 0.98, 0.70, 1.52);
    box(B.dark, -HX44 - 0.11, -HX44 - 0.09, -0.98, 0.98, 1.47, 1.53);
    /* inside: shell racks along both walls, the floor (team colour panel) between them */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.90, -0.90, s > 0 ? 1.18 : -1.53, s > 0 ? 1.53 : -1.18, FZ, FZ + 0.70);
      for (i = 0; i < 6; i++) for (k = 0; k < 2; k++) cylX(B.paint, -2.85 + i * 0.32, -2.60 + i * 0.32, s * (1.26 + k * 0.17), FZ + 0.80, 0.075, 0.075, 8);
    }
    box(B.team, -2.45, -2.15, -0.50, 0.50, FZ, FZ + 0.012);
    box(B.paint, -HX44, CF, -1.53, 1.53, FZ - 0.04, FZ);
    /* the four bows over the compartment (P9, P10, P11): uprights at the wall tops, arched across */
    for (k = 0; k < 4; k++) {
      x = -2.92 + k * 1.10;
      var NB = 8, pA = null, pB;
      for (i = 0; i <= NB; i++) {
        var t = i / NB * Math.PI, yy = Math.cos(t) * 1.56, zz = WT + 0.12 + Math.sin(t) * 0.32;
        pB = [yy, zz];
        if (pA) cyl(B.dark, [x, pA[0], pA[1]], [x, pB[0], pB[1]], 0.022, 0.022, 6);
        pA = pB;
      }
      for (s = -1; s <= 1; s += 2) cylZ(B.dark, x, s * 1.56, WT - 0.10, WT + 0.13, 0.022, 6);
    }
    /* the ring mount at the rear left corner on its pedestal (P11) */
    cylZ(B.dark, -2.55, 1.05, WT - 0.20, WT + 0.08, 0.06, 8);
    cyl(B.dark, [-2.55, 1.05, WT + 0.08], [-2.55, 1.05, WT + 0.14], 0.40, 0.40, 20, false);
    cyl(B.paint, [-2.55, 1.05, WT + 0.075], [-2.55, 1.05, WT + 0.145], 0.36, 0.36, 20, false);
    cylZ(B.dark, -2.20, 1.05, WT + 0.14, WT + 0.30, 0.03, 6);
    box(B.dark, -2.40, -2.00, 1.00, 1.10, WT + 0.28, WT + 0.40);
    cylX(B.dark, -2.00, -1.15, 1.05, WT + 0.36, 0.024, 0.024, 8);
    /* engine deck: grille, the access doors and the second team panel */
    box(B.dark, 1.05, 2.25, -1.25, -0.15, DZ, DZ + 0.02);
    for (i = 0; i < 6; i++) { x = 1.12 + i * 0.20; box(B.paint, x, x + 0.06, -1.23, -0.17, DZ + 0.02, DZ + 0.06); }
    box(B.team, 1.30, 1.55, 0.25, 1.05, DZ, DZ + 0.012);
    box(B.dark, 1.10, 2.30, 0.05, 0.07, DZ, DZ + 0.02);
  }

  /* -------------------------------------------------------------- turrets */
  /* M41: the welded angular turret (P1-P4), ring centre at x 0.25 on the roof.  Plan of the main
     body (x forward from the ring, y), 2.35 m across the shoulders; the sides lean in and the base is
     undercut, the front plates slope back; the bustle box hangs behind it with its sloped belly.
     Roof 0.86 m over the deck (P1: 2.44 m), the gun axis 0.42 m up, muzzle 4.89 m ahead of the ring
     (8.12 m over the gun, Hunnicutt). */
  var T41 = [0.25, 0, RZ], GZ41 = 0.42, MUZ41 = 4.89;
  var PLAN41 = [[1.25, -0.42], [1.10, -0.95], [0.45, -1.17], [-0.50, -1.17], [-1.05, -1.04],
                [-1.05, 1.04], [-0.50, 1.17], [0.45, 1.17], [1.10, 0.95], [1.25, 0.42]];
  var RINGS41 = [[0.00, 0.93, 0.97, 0.93], [0.12, 1.0, 1.0, 1.0], [0.50, 0.94, 0.99, 0.965], [0.78, 0.80, 0.965, 0.88], [0.86, 0.72, 0.95, 0.82]];
  function addTurret41(B) {
    var L = [], i, k, s, r, a, x, y, z;
    for (k = 0; k < RINGS41.length; k++) {
      r = RINGS41[k]; L.push([]);
      for (i = 0; i < PLAN41.length; i++) L[k].push([PLAN41[i][0] * (PLAN41[i][0] > 0 ? r[1] : r[2]), PLAN41[i][1] * r[3], r[0]]);
    }
    loftN(B.paint, L);
    var ROOF = 0.86;
    /* the bustle box: sloped belly, sides leaning out a little, the lid and its hasps (P1, P3) */
    prism(B.paint, [[-0.95, 0.98], [-1.80, 0.96], [-1.95, 0.75], [-1.95, -0.75], [-1.80, -0.96], [-0.95, -0.98]], 0.22, 0.82, 0.88, 1.0);
    belt(B.paint, -1.90, 0.24, -1.00, 0.06, -0.85, 0.85, 0.04);
    box(B.dark, -1.97, -1.95, -0.60, 0.60, 0.55, 0.57);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -1.98, -1.95, s * 0.40 - 0.04, s * 0.40 + 0.04, 0.62, 0.74);
      /* the blower / lamp housings on the bustle's rear corners (P3) */
      cyl(B.paint, [-1.80, s * 0.98, 0.62], [-1.92, s * 1.05, 0.62], 0.10, 0.08, 10);
      /* handrails along the turret sides (P1) */
      belt(B.dark, -0.70, 0.62, 0.40, 0.62, s * 1.13, s * 1.16, 0.025);
      belt(B.dark, -0.70, 0.52, -0.70, 0.63, s * 1.10, s * 1.14, 0.025);
      belt(B.dark, 0.40, 0.52, 0.40, 0.63, s * 1.10, s * 1.14, 0.025);
    }
    box(B.team, -1.55, -1.30, -0.45, 0.45, 0.82, 0.832);
    /* the cast mantlet with its gun collar (P4), the coaxial MG port on the LEFT, the sight port right */
    box(B.paint, 1.12, 1.36, -0.48, 0.48, GZ41 - 0.30, GZ41 + 0.26);
    cylY(B.paint, 1.30, -0.48, 0.48, GZ41 - 0.02, 0.26, 18);
    cylX(B.paint, 1.40, 1.66, 0, GZ41, 0.17, 0.14, 16);
    cylX(B.dark, 1.50, 1.58, 0.30, GZ41 + 0.02, 0.035, 0.035, 8);
    box(B.glass, 1.52, 1.54, -0.36, -0.22, GZ41 + 0.08, GZ41 + 0.15);
    /* the 76 mm M32: tube, the fat bore evacuator right behind the brake, the T-shaped brake (P1) */
    cylX(B.dark, 1.66, MUZ41 - 0.86, 0, GZ41, 0.085, 0.07, 16);
    cylX(B.dark, MUZ41 - 0.92, MUZ41 - 0.86, 0, GZ41, 0.07, 0.115, 16);
    cylX(B.dark, MUZ41 - 0.86, MUZ41 - 0.38, 0, GZ41, 0.115, 0.115, 16);
    cylX(B.dark, MUZ41 - 0.38, MUZ41 - 0.34, 0, GZ41, 0.115, 0.075, 16);
    cylX(B.dark, MUZ41 - 0.34, MUZ41 - 0.27, 0, GZ41, 0.075, 0.075, 14);
    cylX(B.dark, MUZ41 - 0.27, MUZ41 - 0.04, 0, GZ41, 0.09, 0.09, 14);
    box(B.dark, MUZ41 - 0.20, MUZ41 - 0.03, -0.20, 0.20, GZ41 - 0.075, GZ41 + 0.075);
    cylX(B.dark, MUZ41 - 0.04, MUZ41, 0, GZ41, 0.11, 0.11, 16);
    for (s = -1; s <= 1; s += 2) box(B.glass, MUZ41 - 0.18, MUZ41 - 0.06, s * 0.20 - 0.005, s * 0.20 + 0.005, GZ41 - 0.05, GZ41 + 0.05);
    /* commander's cupola on the RIGHT: five vision blocks, the hatch hinged to open forward, the .50 (text, P5) */
    var cx = -0.45, cy = -0.58;
    cylZ(B.paint, cx, cy, ROOF - 0.08, ROOF + 0.16, 0.33, 18);
    cyl(B.paint, [cx, cy, ROOF + 0.16], [cx, cy, ROOF + 0.24], 0.30, 0.24, 18);
    for (i = 0; i < 5; i++) {
      a = (-150 + i * 72) * Math.PI / 180 + Math.PI;
      slab(B.glass, [cx + Math.cos(a) * 0.33, cy + Math.sin(a) * 0.33, ROOF + 0.08], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.015, 0.07, 0.035);
    }
    cylZ(B.dark, cx, cy, ROOF + 0.24, ROOF + 0.26, 0.20, 14);
    /* .50 on its cradle at the cupola front */
    cylZ(B.dark, cx + 0.30, cy, ROOF + 0.20, ROOF + 0.36, 0.04, 8);
    box(B.dark, cx + 0.05, cx + 0.50, cy - 0.06, cy + 0.06, ROOF + 0.34, ROOF + 0.46);
    cylX(B.dark, cx + 0.50, cx + 1.62, cy, ROOF + 0.41, 0.028, 0.022, 8);
    cylX(B.dark, cx + 0.50, cx + 0.80, cy, ROOF + 0.41, 0.04, 0.04, 8);
    box(B.dark, cx + 0.15, cx + 0.35, cy + 0.06, cy + 0.20, ROOF + 0.30, ROOF + 0.42);
    /* loader's hatch and periscope on the LEFT, the gunner's periscope hood right front, aerial bases */
    cylZ(B.paint, -0.35, 0.52, ROOF - 0.02, ROOF + 0.07, 0.27, 16);
    box(B.dark, -0.40, -0.30, 0.25, 0.79, ROOF + 0.07, ROOF + 0.09);
    box(B.paint, 0.18, 0.36, 0.40, 0.56, ROOF - 0.03, ROOF + 0.09);
    box(B.glass, 0.36, 0.365, 0.42, 0.54, ROOF + 0.02, ROOF + 0.07);
    box(B.paint, 0.55, 0.80, -0.48, -0.28, ROOF - 0.10, ROOF + 0.10);
    box(B.glass, 0.80, 0.805, -0.46, -0.30, ROOF + 0.02, ROOF + 0.08);
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, -0.95, s * 0.85, ROOF - 0.05, ROOF + 0.06, 0.05, 8);
    /* ventilator-free roof; the welded seam where the front plates meet the roof (P1) */
    box(B.dark, 0.78, 0.80, -0.85, 0.85, ROOF - 0.004, ROOF + 0.006);
  }

  /* M42: the open turret (P6, P7, P8) on a ring at x 0.40: rounded at the front, straight sides
     and rear, walls 0.74 m over the roof (2.32 m), the trunnions 0.77 m ahead of the ring and 0.84 m
     up, the twin barrels 0.46 m apart with cone flash hiders, muzzles 3.05 m ahead of the ring
     (6.36 m over the guns); the tall angled sight shield on the LEFT front (P6). */
  var T42 = [0.40, 0, RZ], TRX = 0.77, TRZ = 0.84, MUZ42 = 3.05, EL42 = 3 * Math.PI / 180;
  function addTurret42(B) {
    var i, s, k, a, pts = [], tn = Math.tan(EL42), WH = 0.74;
    function gz(x) { return TRZ + (x - TRX) * tn; }
    /* plan: an arc across the front, straight sides, the rear wall */
    for (i = 0; i <= 8; i++) { a = -Math.PI / 2 + i / 8 * Math.PI; pts.push([0.25 + Math.cos(a) * 0.81, Math.sin(a) * 1.10]); }
    pts.push([-1.06, 1.10]); pts.push([-1.06, -1.10]);
    /* the walls in front of the cradle stop low to let the guns depress */
    walls(B.paint, pts.slice(0, 3), false, 0.06, 0.0, WH);
    walls(B.paint, pts.slice(6, 9), false, 0.06, 0.0, WH);
    walls(B.paint, pts.slice(2, 4), false, 0.06, 0.0, WH);
    walls(B.paint, pts.slice(5, 7), false, 0.06, 0.0, WH);
    walls(B.paint, pts.slice(3, 6), false, 0.06, 0.0, 0.42);
    walls(B.paint, [pts[8], pts[9], pts[10], pts[0]], false, 0.06, 0.0, WH);
    /* a rolled lip round the wall top */
    for (i = 0; i + 1 < pts.length; i++) if (i < 3 || i > 4) {
      var p = pts[i], q = pts[i + 1];
      cyl(B.paint, [p[0], p[1], WH], [q[0], q[1], WH], 0.035, 0.035, 6);
    }
    cyl(B.paint, [pts[10][0], pts[10][1], WH], [pts[0][0], pts[0][1], WH], 0.035, 0.035, 6);
    /* the floor of the turret, seen from above */
    cylZ(B.paint, -0.10, 0, 0.0, 0.05, 0.95, 24);
    box(B.team, -0.85, -0.60, -0.35, 0.35, 0.05, 0.062);
    /* the gun cradle: a drum on the trunnions across the front, the twin recoil springs, the guns */
    cylY(B.paint, TRX - 0.12, -0.50, 0.50, TRZ - 0.12, 0.40, 20);
    box(B.dark, TRX + 0.20, TRX + 0.30, -0.36, 0.36, TRZ - 0.06, TRZ + 0.06);
    box(B.paint, TRX - 0.55, TRX + 0.05, -0.42, 0.42, 0.20, TRZ - 0.05);
    for (s = -1; s <= 1; s += 2) {
      var yb = s * 0.23;
      cyl(B.dark, [TRX + 0.15, yb, gz(TRX + 0.15)], [TRX + 0.80, yb, gz(TRX + 0.80)], 0.095, 0.095, 14);
      cyl(B.dark, [TRX + 0.80, yb, gz(TRX + 0.80)], [MUZ42 - 0.26, yb, gz(MUZ42 - 0.26)], 0.055, 0.045, 12);
      cyl(B.dark, [MUZ42 - 0.26, yb, gz(MUZ42 - 0.26)], [MUZ42, yb, gz(MUZ42)], 0.045, 0.075, 12);
      /* the breech and the clip-feed guide standing over it (P6, P8) */
      box(B.dark, TRX - 0.85, TRX - 0.05, yb - 0.11, yb + 0.11, TRZ - 0.18, TRZ + 0.14);
      box(B.paint, TRX - 0.62, TRX - 0.32, yb - 0.08, yb + 0.08, TRZ + 0.14, TRZ + 0.34);
      box(B.dark, TRX - 0.60, TRX - 0.34, yb - 0.05, yb + 0.05, TRZ + 0.34, TRZ + 0.36);
    }
    /* the tall angled sight shield on the left front (P6, P7), the lower sight station on the right */
    slab(B.paint, [0.70, 0.72, 0.95], unit([0.45, 0, 0.89]), [0, 1, 0], unit([0.89, 0, -0.45]), 0.32, 0.24, 0.03);
    box(B.paint, 0.35, 0.80, 0.50, 0.96, 0.40, 0.80);
    box(B.glass, 0.62, 0.66, 0.60, 0.84, 1.00, 1.06);
    box(B.paint, 0.35, 0.75, -0.94, -0.52, 0.40, 0.86);
    box(B.glass, 0.75, 0.76, -0.86, -0.60, 0.70, 0.78);
    /* seats, the stowage box on the rear wall (P6), ready-round racks round the inside */
    box(B.dark, -0.30, 0.10, 0.55, 0.85, 0.05, 0.42);
    box(B.dark, -0.30, 0.10, -0.85, -0.55, 0.05, 0.42);
    box(B.paint, -1.20, -1.00, 0.10, 0.70, 0.40, 0.90);
    for (k = 0; k < 5; k++) { box(B.dark, -0.95 + k * 0.22, -0.80 + k * 0.22, 0.88, 1.04, 0.10, 0.55); box(B.dark, -0.95 + k * 0.22, -0.80 + k * 0.22, -1.04, -0.88, 0.10, 0.55); }
  }

  /* M44: the trained part is the HOWITZER only, with its recoil sleeve, the trunnion cheeks and the
     shield that closes the gun port; the pivot sits just behind the compartment front (x 0.45, on
     the floor).  M45 155 mm, L/23: muzzle at x 3.12, barrel +3 degrees; the sleeve 1.0 m long round
     the barrel's rear, its trunnions 2.20 m up, half a metre under the wall tops (P9, P10); no muzzle
     brake (P10). */
  var T44 = [0.45, 0, FZ], EL44 = 3 * Math.PI / 180, H44 = 0.86, MUZ44 = 2.67;
  function addHowitzer(B) {
    var tn = Math.tan(EL44);
    function az(x) { return H44 + x * tn; }
    /* pedestal and trunnion cheeks */
    cylZ(B.paint, -0.10, 0, 0.0, 0.55, 0.32, 16);
    for (var s = -1; s <= 1; s += 2) box(B.paint, -0.30, 0.35, s * 0.30 - 0.06, s * 0.30 + 0.06, 0.45, 1.20);
    /* the shield behind the gun port, hard inside the front wall (P10) */
    box(B.paint, 0.10, 0.17, -0.58, 0.58, 0.26, 1.30);
    box(B.paint, 0.10, 0.62, -0.30, -0.24, 0.55, 1.20);
    box(B.paint, 0.10, 0.62, 0.24, 0.30, 0.55, 1.20);
    /* the recoil sleeve with its top and bottom cylinders, the barrel and the breech ring */
    cyl(B.paint, [-0.35, 0, az(-0.35)], [0.95, 0, az(0.95)], 0.22, 0.22, 18);
    cyl(B.paint, [-0.20, 0, az(-0.20) + 0.25], [0.85, 0, az(0.85) + 0.25], 0.085, 0.085, 10);
    cyl(B.paint, [-0.20, 0, az(-0.20) - 0.25], [0.85, 0, az(0.85) - 0.25], 0.085, 0.085, 10);
    cyl(B.paint, [0.95, 0, az(0.95)], [1.05, 0, az(1.05)], 0.20, 0.16, 16);
    cyl(B.dark, [1.05, 0, az(1.05)], [MUZ44 - 0.10, 0, az(MUZ44 - 0.10)], 0.150, 0.130, 16);
    cyl(B.dark, [MUZ44 - 0.10, 0, az(MUZ44 - 0.10)], [MUZ44, 0, az(MUZ44)], 0.145, 0.145, 16);
    cyl(B.dark, [-0.85, 0, az(-0.85)], [-0.35, 0, az(-0.35)], 0.24, 0.24, 14);
    box(B.dark, -1.05, -0.85, -0.12, 0.12, az(-0.95) - 0.12, az(-0.95) + 0.12);
    /* elevating handwheel and the sight bracket on the left of the cradle */
    cylY(B.dark, -0.10, 0.36, 0.40, 0.85, 0.15, 12);
    box(B.dark, 0.0, 0.30, 0.36, 0.46, 1.10, 1.25);
    box(B.glass, 0.30, 0.31, 0.38, 0.44, 1.13, 1.22);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var T = materials(THREE, C), g = new THREE.Group(), G = which === "M44" ? GEAR.M44 : GEAR.M41;
    var HB = bins(T), TB = bins(T), i, wg, WB, P;
    if (which === "M44") addHull44(HB); else addHull41(HB, which === "M42");
    if (which === "M42") addSponsons(HB);
    addRunning(HB, G, which === "M44" ? "M44" : "M41", WLO);
    flush(THREE, g, HB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (which === "M41") { addTurret41(TB); P = T41; }
    else if (which === "M42") { addTurret42(TB); P = T42; }
    else { addHowitzer(TB); P = T44; }
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(P[0], P[1], P[2]);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

/* len is the measured X extent of each build (dump.js) */
UNIT_MODELS["nato_e50_lighttank"] = {
  len: 8.15,
  build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M41"); }
};
UNIT_MODELS["nato_e50_spaag"] = {
  len: 6.464,
  build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M42"); }
};
UNIT_MODELS["nato_e50_spg"] = {
  len: 6.231,
  build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M44"); }
};
