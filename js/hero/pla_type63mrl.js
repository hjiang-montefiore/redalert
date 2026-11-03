/* ===== pla_type63mrl.js - HERO model: the Type 63 107 mm 12-tube multiple rocket launcher (towed, on its own carriage) =====
   pla_e60_mlrs "Type 63 107mm 12-tube multiple rocket launcher", in service 1963; turret:true (the launcher trains).

   Which vehicle - a judgement, recorded as asked: the TOWED launcher on its own two-wheeled carriage is drawn, not a
   truck.  en.wikipedia "Type 63 multiple rocket launcher": "a towed, 12-tube, 107mm rocket launcher ... three
   removable rows of four, mounted on a single-axle carriage with rubber tires"; its only PLA self-propelled version
   is "the Chinese Type 81 SPMRL 107mm ... a self-propelled export version, based on the Nanjing NJ-230 truck"
   (Jane's Armour and Artillery 1998-99, as cited there).  Commons was searched for that vehicle ("Type 81 107mm",
   "NJ230", "Nanjing NJ230", "Yuejin NJ230", "Yuejin truck military", "107mm rocket launcher truck", in Chinese
   too): no photograph of an NJ-230, of the Type 81 107 mm, or of any PLA vehicle carrying a Type 63 was found, and
   en.wikipedia has no NJ-230 article (Nanjing Automobile names it only in a production list).  The one
   vehicle-mounted photograph found (P4) is an Iranian Toyota pickup.  A BJ212 or an NJ-230 carrying the pack would
   therefore be a truck drawn from no reference, under a pairing no source shows for the BJ212; that is not honest,
   so the vehicle drawn is the carriage the Chinese museum exhibit (P2) and P1 show, with the published 2.90 x 1.65 x
   0.91 m.  The game unit moves on its own; the carriage's two wheels are its one "roadwheel" group.  It is drawn
   trail aft, tube mouths along +X (the "turret" rest direction); a real one is towed trail first.  (The generic
   model this replaces was a generic 4.6 m light truck with no truck reference behind it.)

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e60_mlrs_ref:
     P1  "Type63 107mm multiple rocket launcher.jpg" (also en.wikipedia's) - a museum launcher head-on from the front,
         pack raised: the twelve mouths in three rows of four in straight columns (pitch about 1.07 tube diameters,
         rows as columns, NOT staggered), the band round the tubes, the rear box below them with its vertical
         divisions, the rectangular frame under the box, the tubular axle with its clamps and a second cross tube,
         the screw jacks with round feet just inboard of the wheels, the two tubular trail legs leaving the axle
         ends and closing together behind, the road-tread tyres (zig-zag, not lugs) on dished steel wheels.
     P2  "Type1963 107mm Rocket Launcher.jpg" - a museum exhibit in China with a Chinese placard, front left 3/4, pack
         raised about 30 degrees: the rear box round the tails with its side plate pierced with two rows of
         lightening holes, the cranks on the port side, the saddle with its cheeks rising to the trunnions at the
         rear box (painted blue by the museum: drawn green), the trunnion low between the wheels (the pack's
         bottom below the tyre tops), the two jacks standing in front of the axle, the closed trail with the towing
         eye and handle at its end.  Its PLACARD (read off the photograph): tube ("dingxiangqi") length 900 mm,
         elevation 0 to +60 degrees, traverse 15 degrees each side, 12 rounds in 7-9 s, range 8500 m, weight 613 kg.
     P3  "IRGC Ground Force Commandos in Pictures-2.jpg" (en.wikipedia's) - a Type 63 pack on a pedestal in a Toyota
         pickup, from the rear: the rear box (about 3.3 tube diameters, 0.40 m, long) with the row of holes along its
         top, the elevating gear wheel with round holes on the side at the trunnion, the gearbox and handwheel
         beside it.  Used for the pack only; the pickup and pedestal are not drawn.
     ru_bm14_bm21.js / pla_phl81.js - the launcher conventions (nodes, userData.el and .cells, the stowed pose).
   Published: en.wikipedia infobox 602 kg, length 2.90 m, width 1.65 m, height 0.91 m, split trail, elevation -3 to
     +57 degrees, traverse 32 degrees, 106.7 mm; P2's placard as above.  Modelled 2.90 x 1.65 x 0.91 m (towing eye to
     mouths; over the tyres; to the top of the level pack's rear box).

   Recognition list (what makes it read at game zoom, and its source):
     1. The square pack of twelve tubes, three rows of four, mouths forward - P1, P2, P3: addPack.
     2. The rear box round the tails with its pierced plates and the gear wheel at the trunnion - P2, P3: addPack.
     3. Two small road wheels either side of the pack, the pack sitting low between them - P1, P2: addAxle.
     4. The long closed split trail, two tubes converging to the towing eye - P1, P2: addCarriage.
     5. The saddle and the screw jacks in front of the axle - P1, P2: addMount, addCarriage.
   Paint: plain PLA green (#525c3a) as the other PLA heroes; P2's olive with a blue saddle is museum paint.  No stars,
   numbers or placards.
   NOT CONFIRMED, judgement calls: the tyre (0.64 m, 0.17 m wide) and its tread, scaled off P1 and P2 against the
   1.65 m width; the tube pitch (0.125 m) and wall (0.118 m outside) from P1's proportions; the trunnion's place
   (0.10 m ahead of the axle, 0.47 m up, set so the level pack reaches the published 0.91 m) and the bottom row 0.10 m
   over it; the rear box's 0.40 m (P3) and the hole counts; the band's place; the saddle's form; the gearbox and
   handwheel on the starboard side and the crank on the port side (sides read from P2/P3, not certain); the jacks'
   place (x 0.16, y 0.56) and that they are drawn raised for the move (P1/P2 show them down); the trail's height at
   its end (0.30 m) and the spades under it; the cross brace between the legs.  THE STOWED POSE: the pack level,
   mouths forward (0 degrees is the bottom of the placard's range).  Elevation drawn when firing: 35 degrees, as
   ru_bm14_bm21.js (the placard gives 0 to +60, no firing figure).  The engine trains the pack all round; the real
   top carriage traverses 15 degrees each side.
   NOT drawn: the pickup and pedestal of P3, the towing vehicle, aiming sight (not seen clearly), rockets, markings.

   Mechanisms (as ru_bm14_bm21.js and pla_phl81.js): "turret" is the top carriage (origin on its pivot over the axle,
   x 0, z 0.37), trained by the engine with the mouths along +X at rest.  Inside it, "podelev" is the pack, hinged at
   the trunnion (x 0.10, z 0.47 on the hull), stowed level at rotation 0; userData.el is the launch elevation and
   userData.cells the 12 mouths [x, y, z, tail x] in the group frame (render3d.js poseLauncher / launchOffset).  One
   "roadwheel" group, the axle with both wheels (axle along local Y, origin on the axle centre, z 0.32).
   Materials 4: paint (canvas texture, metre UVs), dark, wheel (vertex colours: tyres, wheels, hubs), C.team (a strip
   on the rear box's top plate, one along each trail leg).  Draw calls: carriage 3 + wheels 1 + top carriage 2 +
   pack 3 = 9.  Measured: 2.90 x 1.65 x 0.91 m, as published.
   +X mouths (nose), +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType63Mrl = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so the paint never stretches;
     a vertex-coloured bin (the wheels) writes its current colour, col, at each corner */
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

  /* a closed solid.  Whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not.
     smooth: average the face normals at shared corners (cast surfaces) */
  function solid(bin, V, F, smooth) {
    var vol = 0, i, f, a, b, c, N = null, fn, k, q;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var flip = vol < 0;
    if (smooth) {
      N = [];
      for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
        q = [a, b, c];
        for (k = 0; k < 3; k++) { N[q[k]][0] += fn[0]; N[q[k]][1] += fn[1]; N[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < N.length; i++) N[i] = unit(N[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;                  /* a crease slit */
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
    }
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
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
  /* a capped cylinder or cone between two centres, smooth round the side.
     The faces are written outward directly, so a cap can be left off. */
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg, nocapA, nocapB) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocapA, nocapB); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }

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
  /* a convex side profile [x, z] extruded across y0..y1 */
  function profY(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var d = sub(B, A), L = Math.sqrt(dot(d, d)), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }
  /* a side-view polyline [x, z] made into a plate across y0..y1, t thick below the line (a mudguard arch) */
  function ribbon(bin, pts, y0, y1, t) {
    var i, a, b, dx, dz, L, nx, nz;
    for (i = 0; i < pts.length - 1; i++) {
      a = pts[i]; b = pts[i + 1]; dx = b[0] - a[0]; dz = b[1] - a[1]; L = Math.sqrt(dx * dx + dz * dz) || 1;
      nx = -dz / L * t; nz = dx / L * t;
      profY(bin, [[a[0], a[1]], [b[0], b[1]], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]], y0, y1);
    }
  }
  /* a side-face box on the +y (s > 0) or -y face at |y| = yf, standing d proud of it */
  function sideBox(bin, s, yf, d, x0, x1, z0, z1) { box(bin, x0, x1, s * yf, s * (yf + d), z0, z1); }

  var _tex = {};
  /* one flat coat, weathered: low-contrast drift, rain streaks running down, dust and scuffs.
     The painted bin carries metre UVs (0.34 a metre), so the 256 px tile spans about 2.9 m and repeats. */
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd, h;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* streaks: thin, long, faint - the texture's v runs with z on the sides */
      for (i = 0; i < 40; i++) {
        x = R() * 256; h = 20 + R() * 70; y = R() * 256;
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.07)" : "rgba(170,160,130,0.06)";
        q.fillRect(x, y, 1 + R() * 2, h);
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.06)" : "rgba(235,228,200,0.045)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 24, 2 + R() * 12);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }


  /* ----------------------------------------------------------- the stations
     +X the tube mouths (the carriage's front), +Y port, +Z up, metres, tyres on z = 0.  The axle is x = 0.
     Published: tube ("dingxiangqi") length 900 mm (P2's museum placard); overall 2.90 x 1.65 x 0.91 m
     (en.wikipedia infobox).  Everything else is scaled from P1-P3 against those. */
  var RT = 0.32, TW = 0.17, TY = 0.72;               /* tyre radius, tyre width, wheel centre (1.65 m over the tyres) */
  var ZA = RT;                                       /* the axle */
  var RX = 0.0, RZ = 0.37;                           /* the top carriage's pivot on the axle ("turret" origin) */
  var PVX = 0.10, PVZ = 0.10;                        /* the trunnion in the turret frame (0.47 m over the ground) */
  var TP = 0.125, TRR = 0.059, RP = 0.125, Z0 = 0.10;/* column pitch, tube radius, row pitch; bottom row over the trunnion */
  var TX0 = -0.30, TX1 = 0.60;                       /* tube tails and mouths from the trunnion: the 0.90 m tube */
  var BX0 = -0.30, BX1 = 0.10;                       /* the rear box round the tails (0.40 m, P2, P3) */
  var XE = -2.20;                                    /* the trail's end: 2.90 m from the mouths */
  var LAUNCH_EL = 35 * Math.PI / 180;
  var PAINT = { base: "#525c3a", blots: ["#4a5434", "#5a6442", "#4e5737"], seed: 1063 };

  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.1 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.8, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) };
  }

  /* ---------------------------------------------------------------- the wheels
     a 0.64 m road tyre, 0.17 m wide, with the zig-zag road tread of P1 and P2 (NOT a cross-country lug); the
     dished steel wheel painted like the carriage (P1, P2), the hub cap and the nut ring on the outer face */
  var TYRE = [0.10, 0.105, 0.11], RIMC = [0.32, 0.35, 0.24], HUBC = [0.27, 0.30, 0.20], NUT = [0.16, 0.16, 0.15];
  function tyre(W, yc, s) {
    var N = 26, R = [[-0.085, 0.20, 0, 0], [-0.085, 0.27, 0, 0], [-0.07, 0.31, 1, 0], [-0.03, 0.32, 1, 1],
                     [0.0, 0.32, 1, 0], [0.03, 0.32, 1, 1], [0.07, 0.31, 1, 0], [0.085, 0.27, 0, 0], [0.085, 0.20, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.012;
      a = j / N * TAU;
      V.push([r * Math.cos(a), yc + R[i][0], r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([0, yc + R[0][0], 0], [0, yc + R[m - 1][0], 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    W.col = TYRE;
    solid(W, V, F, true);
    W.col = RIMC;
    cyl(W, [0, yc + s * 0.06, 0], [0, yc + s * 0.09, 0], 0.20, 0.15, 16, true, false);      /* the dished wheel */
    W.col = HUBC;
    cylY(W, 0, yc + s * 0.09, yc + s * 0.10, 0, 0.065, 10);                                 /* hub cap */
    W.col = NUT;
    for (j = 0; j < 6; j++) {                                                               /* nut ring */
      a = j / 6 * TAU;
      cylY(W, 0.10 * Math.cos(a), yc + s * 0.09, yc + s * 0.105, 0.10 * Math.sin(a), 0.012, 4);
    }
  }
  /* the one axle: both wheels and the tubular axle between them, origin on the axle centre */
  function addAxle(W) {
    tyre(W, TY, 1);
    tyre(W, -TY, -1);
    W.col = [0.30, 0.33, 0.23];
    cylY(W, 0, -0.66, 0.66, 0, 0.045, 10);
  }

  /* ---------------------------------------------------------------- the carriage (hull)
     P1 (from the front): the tubular axle with its clamps; ahead of it a second cross tube carrying the two screw
     jacks just inboard of the wheels; the two tubular trail legs leaving the axle ends and closing together behind
     the pack.  P2: the legs joined at the rear into the trail end with the towing eye and its handle; the jacks
     standing on round feet in front of the axle; the bracket on the axle under the top carriage. */
  function addCarriage(B) {
    var s, k, y0 = 0.56, y1 = 0.07, z0 = ZA + 0.02, z1 = 0.30;
    /* the axle body's sleeves either side (the wheels' axle tube runs through them: the "roadwheel" group) */
    for (s = -1; s <= 1; s += 2) {
      cylY(B.paint, 0, s * 0.50, s * 0.64, ZA, 0.065, 12);
      box(B.dark, -0.07, 0.07, s * 0.53, s * 0.61, ZA - 0.09, ZA + 0.09);                  /* clamp */
    }
    /* the bracket on the axle under the top carriage, and the pivot boss */
    box(B.paint, -0.16, 0.16, -0.22, 0.22, ZA + 0.03, RZ - 0.02);
    cylY(B.paint, 0, -0.30, 0.30, ZA, 0.06, 12);
    cylZ(B.dark, RX, 0, RZ - 0.03, RZ, 0.13, 16);
    /* the cross tube ahead of the axle with the two screw jacks on round feet (P1, P2), raised for the move */
    cylY(B.paint, 0.16, -0.62, 0.62, ZA + 0.04, 0.035, 10);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.02, 0.20, s * 0.56 - 0.04, s * 0.56 + 0.04, ZA - 0.02, ZA + 0.08);    /* the arm to the axle */
      cylZ(B.paint, 0.16, s * 0.56, 0.12, ZA + 0.12, 0.04, 10);                             /* jack barrel */
      cylZ(B.dark, 0.16, s * 0.56, ZA + 0.12, ZA + 0.20, 0.016, 6);                          /* screw */
      bar(B.dark, [0.10, s * 0.56, ZA + 0.20], [0.22, s * 0.56, ZA + 0.20], 0.018);         /* crank */
      cylZ(B.dark, 0.16, s * 0.56, 0.06, 0.12, 0.022, 6);
      cylZ(B.paint, 0.16, s * 0.56, 0.04, 0.06, 0.085, 12);                                  /* the round foot */
    }
    /* the split trail, closed: two round tubes from the axle ends converging behind the pack (P1, P2) */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.paint, [-0.02, s * y0, z0], [XE + 0.20, s * y1, z1], 0.042, 0.038, 10);
      box(B.paint, -0.10, 0.06, s * y0 - 0.05, s * y0 + 0.05, z0 - 0.06, z0 + 0.06);       /* the hinge on the axle */
      cylZ(B.dark, -0.02, s * y0, z0 - 0.08, z0 + 0.08, 0.025, 8);
      /* a short spade folded under each leg's end */
      box(B.dark, XE + 0.22, XE + 0.40, s * y1 - 0.06, s * y1 + 0.06, z1 - 0.13, z1 - 0.04);
      /* the team strip, on top of each leg */
      cyl(B.team, [-0.75, s * (y0 - (y0 - y1) * 0.75 / 2.0), z0 - (z0 - z1) * 0.75 / 2.0 + 0.036],
                  [-1.15, s * (y0 - (y0 - y1) * 1.15 / 2.0), z0 - (z0 - z1) * 1.15 / 2.0 + 0.032], 0.012, 0.012, 6);
    }
    /* the trail end: the clamp joining the legs, the towing eye, the handle over it (P2) */
    box(B.paint, XE + 0.08, XE + 0.30, -0.13, 0.13, z1 - 0.06, z1 + 0.06);
    box(B.paint, XE + 0.02, XE + 0.08, -0.05, 0.05, z1 - 0.04, z1 + 0.04);
    cyl(B.dark, [XE + 0.035, 0, z1 - 0.012], [XE + 0.035, 0, z1 + 0.012], 0.035, 0.035, 12);
    box(B.dark, XE, XE + 0.03, -0.035, 0.035, z1 - 0.012, z1 + 0.012);
    bar(B.dark, [XE + 0.12, -0.10, z1 + 0.06], [XE + 0.12, -0.10, z1 + 0.18], 0.02);
    bar(B.dark, [XE + 0.12, 0.10, z1 + 0.06], [XE + 0.12, 0.10, z1 + 0.18], 0.02);
    bar(B.dark, [XE + 0.12, -0.11, z1 + 0.18], [XE + 0.12, 0.11, z1 + 0.18], 0.02);
    /* a cross brace between the legs behind the axle */
    k = -0.75;
    bar(B.paint, [k, -(y0 - (y0 - y1) * 0.75 / 2.0), z0 - 0.01], [k, (y0 - (y0 - y1) * 0.75 / 2.0), z0 - 0.01], 0.04);
  }

  /* ---------------------------------------------------------------- the top carriage ("turret")
     the U frame under the pack (P1: the rectangular frame under the tube box; P2: the saddle with its two side
     cheeks rising to the trunnions), the pins, the elevating handwheel and gearbox on the starboard side and the
     traverse crank on the port side (P2, P3) */
  function addMount(B) {
    var s, hw = 1.5 * TP + TRR + 0.04;
    cylZ(B.dark, 0, 0, 0.0, 0.03, 0.12, 16);
    /* the frame: a rectangle of channel round the base */
    box(B.paint, -0.20, 0.26, -hw - 0.05, -hw + 0.01, 0.0, 0.05);
    box(B.paint, -0.20, 0.26, hw - 0.01, hw + 0.05, 0.0, 0.05);
    box(B.paint, 0.20, 0.26, -hw, hw, 0.0, 0.05);
    box(B.paint, -0.20, -0.14, -hw, hw, 0.0, 0.05);
    box(B.paint, -0.08, 0.12, -0.14, 0.14, 0.0, 0.04);
    for (s = -1; s <= 1; s += 2) {
      /* the cheek up to the trunnion, outside the pack's side plate */
      profY(B.paint, [[PVX - 0.20, 0.0], [PVX + 0.18, 0.0], [PVX + 0.10, PVZ + 0.06], [PVX - 0.08, PVZ + 0.06]],
            s * (hw + 0.01), s * (hw + 0.04));
      cylY(B.dark, PVX, s * (hw - 0.01), s * (hw + 0.07), PVZ, 0.035, 10);                  /* the pin */
    }
    /* starboard: the elevating gearbox on the cheek and its handwheel (P2, P3) */
    box(B.dark, PVX - 0.02, PVX + 0.14, -hw - 0.10, -hw - 0.04, 0.02, PVZ - 0.02);
    cylY(B.dark, PVX + 0.10, -hw - 0.10, -hw - 0.16, 0.04, 0.012, 6);
    cylY(B.paint, PVX + 0.10, -hw - 0.16, -hw - 0.18, 0.04, 0.075, 14);
    bar(B.dark, [PVX + 0.10, -hw - 0.19, 0.11], [PVX + 0.10, -hw - 0.24, 0.11], 0.016);
    /* port: the traverse crank (P2) */
    box(B.dark, PVX - 0.18, PVX - 0.06, hw + 0.04, hw + 0.09, 0.0, 0.10);
    bar(B.dark, [PVX - 0.12, hw + 0.09, 0.06], [PVX - 0.12, hw + 0.17, 0.06], 0.018);
    bar(B.dark, [PVX - 0.12, hw + 0.17, 0.06], [PVX - 0.12, hw + 0.17, 0.14], 0.018);
  }

  /* ---------------------------------------------------------------- the pack ("podelev", origin on the trunnion)
     twelve 107 mm tubes, three rows of four in straight columns (P1: the mouths seen head-on), 0.90 m long (placard);
     the rear 0.40 m held in a box of plates: side plates pierced with two rows of lightening holes (P2), a top plate
     with a row of holes (P3), a front frame plate round the tubes where they leave the box (P1); the elevating gear
     wheel with its round holes on the starboard side at the trunnion (P3) */
  function addPack(B, cells) {
    var r, i, y, z, k, hw = 1.5 * TP + TRR + 0.012, zb = Z0 - TRR - 0.012, zt = Z0 + 2 * RP + TRR + 0.012;
    for (r = 0; r < 3; r++) for (i = 0; i < 4; i++) {
      y = (i - 1.5) * TP; z = Z0 + r * RP;
      cyl(B.paint, [BX1 - 0.01, y, z], [TX1, y, z], TRR, TRR, 12, true, true);
      cyl(B.paint, [TX1 - 0.005, y, z], [TX1, y, z], TRR, TRR * 0.92, 12, true, true);    /* the lip */
      cylX(B.dark, TX1 - 0.04, TX1 - 0.03, y, z, TRR * 0.95, 10);                          /* the bore */
      cylX(B.dark, TX0 + 0.002, TX0 + 0.02, y, z, TRR * 0.95, 10);                         /* the tail opening */
      cells.push([TX1 + 0.04, y, z, TX0]);
    }
    /* a band round the tubes half way along the free length (P1: the clamp strip) */
    k = (BX1 + TX1) / 2 + 0.06;
    box(B.paint, k, k + 0.04, -hw + 0.01, hw - 0.01, zt - 0.02, zt);
    box(B.paint, k, k + 0.04, -hw + 0.01, hw - 0.01, zb, zb + 0.02);
    /* the rear box: side, top and bottom plates, the front frame, the tail frame */
    for (y = -1; y <= 1; y += 2) {
      box(B.paint, BX0, BX1, y * hw, y * (hw + 0.012), zb, zt);
      for (k = 0; k < 5; k++) {
        cylY(B.dark, BX0 + 0.05 + k * 0.075, y * (hw + 0.010), y * (hw + 0.016), Z0 + 0.04, 0.022, 8);
        cylY(B.dark, BX0 + 0.05 + k * 0.075, y * (hw + 0.010), y * (hw + 0.016), Z0 + RP + 0.07, 0.022, 8);
      }
    }
    box(B.paint, BX0, BX1, -hw - 0.012, hw + 0.012, zt, zt + 0.012);
    box(B.paint, BX0, BX1, -hw - 0.012, hw + 0.012, zb - 0.012, zb);
    for (k = 0; k < 6; k++) cylZ(B.dark, BX0 + 0.045 + k * 0.06, 0, zt + 0.010, zt + 0.014, 0.018, 8);
    box(B.paint, BX1 - 0.03, BX1, -hw, hw, zb, zb + 0.03);
    box(B.paint, BX1 - 0.03, BX1, -hw, hw, zt - 0.03, zt);
    box(B.paint, BX0, BX0 + 0.025, -hw, hw, zt - 0.025, zt);
    box(B.paint, BX0, BX0 + 0.025, -hw, hw, zb, zb + 0.025);
    /* the tubes' rear lengths inside the box show at the open tail */
    for (r = 0; r < 3; r++) for (i = 0; i < 4; i++) {
      y = (i - 1.5) * TP; z = Z0 + r * RP;
      cyl(B.paint, [TX0, y, z], [BX1, y, z], TRR, TRR, 12, true, true);
    }
    /* the starboard gear wheel at the trunnion: toothed rim, its round holes, the boss */
    cylY(B.paint, 0, -hw - 0.012, -hw - 0.045, 0, 0.095, 24);
    for (k = 0; k < 6; k++) cylY(B.dark, 0.06 * Math.cos(k / 6 * TAU), -hw - 0.044, -hw - 0.048, 0.06 * Math.sin(k / 6 * TAU), 0.016, 6);
    cylY(B.dark, 0, -hw - 0.045, -hw - 0.06, 0, 0.03, 8);
    /* the team strip on the top plate */
    box(B.team, BX0 + 0.06, BX1 - 0.06, -0.10, 0.10, zt + 0.012, zt + 0.022);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), WB, wg;
    addCarriage(HB);
    flush(THREE, g, HB);
    /* the one axle: one "roadwheel" group holding both wheels, origin on the axle centre */
    WB = new Bin(T.wheel, false, true);
    addAxle(WB);
    wg = new THREE.Group();
    wg.name = "roadwheel";
    wg.position.set(0, 0, ZA);
    flush(THREE, wg, { wheel: WB });
    g.add(wg);
    /* the launcher: "turret" (the top carriage, trained on its pivot) holding "podelev" (the pack, elevating on
       the trunnion; level when stowed, raised to userData.el by render3d.js poseLauncher) */
    var tur = new THREE.Group(), MB = bins(T), EB = bins(T), el = new THREE.Group(), cells = [];
    addMount(MB);
    flush(THREE, tur, MB);
    addPack(EB, cells);
    flush(THREE, el, EB);
    el.name = "podelev";
    el.position.set(PVX, 0, PVZ);
    el.userData.el = LAUNCH_EL;
    el.userData.cells = cells;
    tur.add(el);
    tur.name = "turret";
    tur.position.set(RX, 0, RZ);
    g.add(tur);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent: the trail's towing eye to the tube mouths */
UNIT_MODELS["pla_e60_mlrs"] = { len: 2.90, build: HeroType63Mrl.build };
