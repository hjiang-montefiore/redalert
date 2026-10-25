/* ===== us_hemtt.js - HERO model: the Oshkosh M977A4 HEMTT 8x8 cargo truck, A-kit (soft) cab ========
   Full-quality redo (2026-10-24).  One key, kept: supply_n "HEMTT Supply Truck" (js/rules.js, full "M977 HEMTT";
   its mass note is the M977A4 with the A-kit cab, 69,000 lb laden).  js/armour_specs.js "M977 HEMTT 8x8 Cargo
   Truck".  Build name kept: HeroUsHemtt.build, read by nothing else (us_patriot.js draws its own M983 tractor).
   No era rows exist for supply_n; one model serves every era.

   Variant drawn: the M977A4 CARGO truck (the row's mass note; the drawing [D] is captioned "M977A4 Cargo truck")
   with the integral A-kit cab of the A4 (en.wikipedia: the A4 takes the slightly larger PLS A1 cab, LTAS A-kit
   integral, B-kit add-on).  The B-kit armour is NOT drawn: [F][L] show the A4 soft, and the row says A-kit.
   Paint: tan CARC (686A) as every dated A4 photograph shows [F][L][T][I]; no NATO three-colour A4 was found.

   Sources (Wikimedia Commons at width 960; en.wikipedia "Heavy Expanded Mobility Tactical Truck" infobox and text;
   de.wikipedia "Heavy Expanded Mobility Tactical Truck" data table):
     [D]  "M977A4.jpg" - the published SIDE DRAWING of the M977A4 cargo truck, port side: the station table below.
          Measured at 155.5 px a metre (3x enlargement) off the published axle spacing (1.524 / 3.81 / 1.524 m
          agree to 1 per cent).
     [F]  "HEMTT A4 Cargo 3 HR.jpg" (Oshkosh) - port front three-quarter of the A4 cargo truck: cab, louvred
          radiator box, spare on top, intake head, round fuel tank, drop sides, the stowed crane at the tail.
     [L]  "HEMTT A4 LET 1 HR.jpg" (Oshkosh) - the same A4 cab, port front: headlamp pods, the two amber markers on
          the corner facet, the door's round reflector, mirrors, step ladder, tow clevises, mud flap behind axle 2.
     [T]  "HEMTT in Fort Hood.jpg" - an earlier M977 (A0/A2 cab), starboard side: the Grove crane at the tail
          with its boom raised and its stabiliser leg, the drop-side stake posts, the 10-nut wheels.
     [C]  "M977A4.1.jpg" - drawing of the M977A4 Common Bridge Transporter (chassis rear only).
     [I]  "Regimental Support Squadron Muleskinner 01.jpg", "Fort Irwin National Training Center - HEMTT - 1.jpg"
          - A4s in the field, tan (paint check).
   Published: length 409 in (10.39 m, en.wikipedia A4; de.wikipedia gives the M977 10.19 m / 401 in), width 96 in
     (2.44 m), height 118 in (3.00 m) over the spare tyre, wheelbase 5.33 m (210 in, de.wikipedia), 16.00R20 tyres
     (de.wikipedia, Michelin), 155 US gal fuel, front tandem steers; "a light-duty Grove materials handling crane
     mounted at the rear of the chassis" on the M977 cargo truck (en.wikipedia; de.wikipedia: Grove, 2,500 lb).
   CONFIRMED from the old header: 2.44 m wide, 3.00 m over the spare, 1.524 / 3.81 / 1.524 m axle spacing, the
     16.00R20 single tyres, the louvred box behind the cab with the spare flat on it, the 155 gal round tank under
     the body on the port side, the crane at the REAR, the A4 in tan CARC.
   CORRECTED: the old header put the nose 2.34 m ahead of axle 1 (a perspective fit to [F]); the orthographic
     drawing [D] gives 1.90 m to the headlamp pods, and the cab back wall 0.29 m ahead of axle 1 (old 0.39).  The
     old "engine in the nose" is not supported (the nose is a short faceted cab front over the vent band); the
     old flat-faced nose with a plate bumper is not the A4: [F][L][D] show a vertical face carrying the headlamp
     pods over a chin that slopes back to the tow clevises.  The old crane lay forward along the bed floor; [D][F]
     show it folded UPRIGHT behind the tailgate with a stabiliser leg.  The old louvred box sat 0.39 m into the
     cab; [D] puts it right behind the cab wall, 0.93 m deep.  The old tool box and small tank to starboard are
     not seen on any A4 photograph found and are dropped.
   LENGTH: [D] measures 10.20 m from the headlamp pods to the pintle hook at the published axle spacing (its tyres
     come out 1.24 m, the XZL is 1.27 m); en.wikipedia gives 10.39 m for the A4.  The drawing is followed; the
     difference is reported, not stretched in.

   Recognition list (each rests on; where it is in the code):
     1. 8x8 in two close tandems, 1.524 m within each pair and 3.81 m between them, the cab ahead of axle 1 [D][F]:
        AX.
     2. The wide flat-roofed A4 cab: a vertical face, chamfered corner facets, the chin sloping back below it, the
        rear lower corner cut away over the front tyre [D][F][L]: CAB stations, addCab.
     3. The big two-pane windscreen, raked about 30 degrees, split by a centre post, a brow over it with five amber
        markers [F][L][D]: addCab.
     4. The square headlamp pods at the corners of the face with round lamps, two amber markers on each corner
        facet, the dark vent band (the grille) across the top of the chin [F][L]: addCab.
     5. The long door with its window and diagonal bar, the narrow rear-quarter window and grab rail, the round
        amber reflector low on the door, the hanging step ladder [F][L][D]: addCab.
     6. The mirrors on long forward arms: a round convex head and a tall flat one below [F][L]: addCab.
     7. Behind the cab: the tall louvred radiator box, the spare tyre lying flat on it (3.00 m), the black intake
        head, the air cleaner and the tall hydraulic tank with its filler stack [F][D]: addBehindCab.
     8. The long drop-side cargo body over the rear of axle 2 to past axle 4: three boards a side between double
        stake posts, a stiffener in each, latches, top and foot rails [D][F][T]: addBody.
     9. The Grove materials handling crane folded upright behind the tailgate, its valve bank and stabiliser leg
        [D][F][T]: addCrane.
    10. The big round 155 gal fuel tank under the body on the port side, between the tandems [F][L][D]: addChassis.
    11. The big single 16.00R20 XZL tyres with chunky block lugs on black disc wheels, ten nuts and a hub [F][T]:
        tyre().
    12. Tan CARC over everything but the wheels, frame and intake; black mud flaps behind axle 2 [F][L]: PAINT.
   Paint: tan CARC 686A.  Sampled [F] sunlit cab side #dec8ab and body side #decbb1 (hazy desert sun); drawn
     #ac9a7c, about 0.78 of that level with the warmer hue of 686A.  No markings, numbers or plates; the OSHKOSH
     badge and the CAUTION stencils are not drawn.
   Load: two strapped pallet stacks and six fuel drums, kept from the old model as the game's supply load (the row
     is a "rolling fuel and ammunition point"); it is cargo, not a fitting, and is plainly generic.
   NOT drawn or estimated: the B-kit armour and gun ring; the CTIS lines; the starboard side behind the cab and
     under the body (no A4 photograph from the right was found; only the frame is drawn there); the crane's
     lateral position (drawn on the centre line) and the starboard stabiliser leg (seen on [T], an older truck);
     the suspension (Holland air: drawn as plain axle beams and arms), the radiator box's inboard edge, the spare
     carrier frame (only its outline shows in [D]).

   Mechanisms: eight "roadwheel" groups (render3d spins them about local Y).  No turret, no other named node.
   Materials 7: paint (canvas texture, metre UVs), dark, glass, tyre, lamp (emissive, vertex colours), vc (load
   colours per vertex), C.team (a panel on the cab roof and the headboard cap).  Draw calls 7 + 8 wheels = 15.
   +X nose, +Y port, +Z up, metres, tyres on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsHemtt = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; painted bins get planar metre UVs from each face's dominant axis */
  function Bin(mat, uvk, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uvk ? [] : null; this.k = uvk; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.k;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
    }
  };

  /* a closed solid: the signed volume says whether the faces point out, and they are turned if not */
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
      if (dot(fn, fn) < 1e-16) continue;
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
  /* a capped cylinder or cone between two centres, smooth round the side */
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
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
  /* rings of the same count, lofted and capped with fans on the ring centre (the rings here are convex) */
  function loftRings(bin, R, smooth) {
    var m = R.length, n = R[0].length, V = [], F = [], i, j, k, c;
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (i = 0; i < 2; i++) {
      var ring = R[i ? m - 1 : 0], ctr = [0, 0, 0], b0 = V.length;
      for (j = 0; j < n; j++) { ctr[0] += ring[j][0] / n; ctr[1] += ring[j][1] / n; ctr[2] += ring[j][2] / n; }
      for (j = 0; j < n; j++) V.push(ring[j]);
      V.push(ctr); c = V.length - 1;
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push(i ? [c, b0 + j, b0 + k] : [c, b0 + k, b0 + j]); }
    }
    solid(bin, V, F, smooth);
  }
  function flush(THREE, group, B) {
    var k, b, geo, mesh;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      geo.computeBoundingSphere();
      mesh = new THREE.Mesh(geo, b.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  /* ------------------------------------------------------------ paint */
  /* tan CARC, flat and chalky: low-contrast drift, rain streaks, scuffs, and road dust rising from the foot
     (metre UVs, 0.34 a metre: on the sides v runs with height, so the bottom of the canvas is the lowest metres) */
  var _tex = null;
  function paintTex(THREE) {
    if (_tex !== null) return _tex || null;
    var t = false;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = 977004, i, a, x, y, rr, ang, rd, h;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = PAINT.base; q.fillRect(0, 0, 256, 256);
      for (var k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 9; i++) {
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
      for (i = 0; i < 40; i++) {
        x = R() * 256; h = 20 + R() * 70; y = R() * 256;
        q.fillStyle = (i % 3) ? "rgba(70,56,36,0.07)" : "rgba(235,222,190,0.06)";
        q.fillRect(x, y, 1 + R() * 2, h);
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(60,48,30,0.06)" : "rgba(240,230,205,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 24, 2 + R() * 12);
      }
      /* dust: canvas y 256 is v = 0 (three flips the canvas), so the dust band is at the canvas foot */
      var gr = q.createLinearGradient(0, 150, 0, 256);
      gr.addColorStop(0, "rgba(150,128,96,0)");
      gr.addColorStop(1, "rgba(150,128,96,0.32)");
      q.fillStyle = gr; q.fillRect(0, 150, 256, 106);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = false; }
    _tex = t;
    return t || null;
  }
  var PAINT = { base: "#ac9a7c", blots: ["#a39274", "#b4a385", "#a8977a"] };

  /* sRGB hex -> linear: vertex colours are read raw by three; only material colours are linearised by prepModel */
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  var AMBER = lin(0xffa11a), WHITE = lin(0xfff1c6), RED = lin(0xd4261a);
  var OLIVE = lin(0x5c6644), WOOD = lin(0x8a7350), STRAP = lin(0x2a2a24), DRUM = lin(0x5a6542), BAND = lin(0x3a4430),
      CRATE = lin(0x6b7150);

  function materials(THREE, C) {
    var T = {}, tp = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tp) T.paint.map = tp; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26272a, roughness: 0.8, metalness: 0.28 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1c1d1f, roughness: 0.95, metalness: 0.02 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.35, metalness: 0.1,
                                              emissive: 0x5a4a2a, emissiveIntensity: 0.9 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.86, metalness: 0.05 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, 0.34), dark: new Bin(T.dark), glass: new Bin(T.glass), tyre: new Bin(T.tyre),
             lamp: new Bin(T.lamp, 0, true), vc: new Bin(T.vc, 0, true), team: new Bin(T.team) };
  }

  /* ----------------------------------------------------------- the stations
     Side drawing [D]: 155.5 px a metre at 3x, axle 1 at x = 3.20.  x = 3.20 + (340 - px) / 155.5, z = (503 - py) / 155.5.
     +X nose, +Y port, +Z up, tyres on z = 0. */
  var AX = [3.20, 1.676, -2.134, -3.658];     /* 1.524 + 3.81 + 1.524 m; tandem centres 5.33 m apart        */
  var RT = 0.625, TY = 1.015;                 /* 16.00R20 XZL (1.25 m loaded); outer tyre face at 1.22 m     */
  var XCR = 3.49;                             /* the cab's back wall, 0.29 m ahead of axle 1 [D]             */
  var XBF = 1.50, XBR = -4.08, ZFL = 1.66, ZBT = 2.30, BW = 1.22;   /* body: headboard, tail, floor, rail, half width [D] */
  var XRF = XCR, XRR = 2.56, ZR0 = 1.47, ZR1 = 2.56;                /* radiator box [D]                     */

  /* cab station table (horizontal sections, [D] side and [F][L] front): z, face x, back x, half width,
     corner facet across (y) and deep (x).  The chin slopes back from the face to the cab floor; the back
     wall is cut away below 1.37 m over the front tyre. */
  var CAB = [
    [0.97, 4.42, 3.82, 1.10, 0.30, 0.20],
    [1.22, 4.69, 3.61, 1.20, 0.34, 0.24],
    [1.37, 4.85, XCR, 1.22, 0.36, 0.26],
    [1.50, 4.99, XCR, 1.22, 0.36, 0.26],        /* foot of the vertical face                               */
    [1.86, 4.99, XCR, 1.22, 0.36, 0.26],        /* windscreen foot                                         */
    [2.47, 4.63, XCR, 1.215, 0.30, 0.22],       /* windscreen head: 0.36 m back over 0.61 m, 30 degrees    */
    [2.55, 4.58, 3.50, 1.20, 0.28, 0.20],
    [2.59, 4.55, 3.52, 1.17, 0.26, 0.18]        /* the roof, 2.59 m [D]                                    */
  ];
  function cabRing(st) {
    var z = st[0], xf = st[1], xr = st[2], w = st[3], ch = st[4], cx = st[5], rr = 0.05;
    /* counter-clockwise seen from above, from the front-starboard corner of the face */
    return [[xf, -(w - ch), z], [xf, w - ch, z], [xf - cx, w, z], [xr + rr, w, z],
            [xr, w - rr, z], [xr, -(w - rr), z], [xr + rr, -w, z], [xf - cx, -w, z]];
  }

  /* 16.00R20 XZL: big square lug blocks alternating across the crown, black disc wheel, ten nuts, hub.
     Axle on local Y; centred on (ox, oy, oz). */
  function tyre(bin, ox, oy, oz, bare) {
    var N = 24, HW = 0.205;
    var R = [[-HW, 0.36, 0, 0], [-HW, 0.52, 0, 0], [-0.19, 0.585, 1, 0], [-0.11, RT, 1, 0], [-0.02, RT, 1, 1],
             [0.02, RT, 1, 0], [0.11, RT, 1, 1], [0.19, 0.585, 1, 1], [HW, 0.52, 0, 0], [HW, 0.36, 0, 0]];
    var V = [], F = [], i, j, k, r, a, m = R.length;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = R[i][1];
      if (R[i][2] && ((j + R[i][3]) % 2)) r -= 0.045;
      a = j / N * TAU;
      V.push([ox + r * Math.cos(a), oy + R[i][0], oz + r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    V.push([ox, oy + R[0][0], oz], [ox, oy + R[m - 1][0], oz]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    solid(bin, V, F, true);
    for (k = -1; k <= 1; k += 2) {
      cyl(bin, [ox, oy + k * HW, oz], [ox, oy + k * (HW + 0.012), oz], 0.36, 0.33, 16, true, false);   /* rim flange */
      cyl(bin, [ox, oy + k * (HW - 0.06), oz], [ox, oy + k * (HW + 0.004), oz], 0.30, 0.28, 16, true, false); /* disc */
      if (bare) continue;
      cylY(bin, ox, oy + k * HW, oy + k * (HW + 0.07), oz, 0.12, 12);                                  /* hub      */
      cylY(bin, ox, oy + k * (HW + 0.07), oy + k * (HW + 0.10), oz, 0.06, 8);                          /* CTIS cap */
      for (j = 0; j < 10; j++) {                                                                       /* nuts     */
        a = j / 10 * TAU;
        box(bin, ox + 0.19 * Math.cos(a) - 0.022, ox + 0.19 * Math.cos(a) + 0.022, oy + k * HW, oy + k * (HW + 0.03),
            oz + 0.19 * Math.sin(a) - 0.022, oz + 0.19 * Math.sin(a) + 0.022);
      }
    }
  }

  /* --------------------------------------------------------------- the cab */
  function addCab(B) {
    var R = [], i, s, y0, y1, y2;
    for (i = 0; i < CAB.length; i++) R.push(cabRing(CAB[i]));
    loftRings(B.paint, R, false);
    /* the windscreen plane through its foot and head */
    var A = [CAB[4][1], 0, CAB[4][0]], H = [CAB[5][1], 0, CAB[5][0]];
    var W = unit(sub(H, A)), N = unit([W[2], 0, -W[0]]), U = [0, 1, 0];
    var L = Math.sqrt(dot(sub(H, A), sub(H, A)));
    planeBox(B.dark, A, U, W, N, -0.86, 0.86, 0.02, L - 0.01, -0.02, 0.006);            /* rubber surround        */
    planeBox(B.glass, A, U, W, N, 0.05, 0.82, 0.05, L - 0.04, 0.0, 0.018);              /* port pane              */
    planeBox(B.glass, A, U, W, N, -0.82, -0.05, 0.05, L - 0.04, 0.0, 0.018);            /* starboard pane         */
    planeBox(B.paint, A, U, W, N, -0.05, 0.05, 0.02, L, 0.0, 0.026);                    /* centre post            */
    /* the brow over the glass and its five amber markers [F] */
    box(B.paint, 4.44, 4.64, -1.10, 1.10, 2.585, 2.65);
    B.lamp.col = AMBER;
    for (i = 0; i < 5; i++) box(B.lamp, 4.60, 4.655, -0.84 + i * 0.42 - 0.05, -0.84 + i * 0.42 + 0.05, 2.595, 2.64);
    /* the face: headlamp pods at its corners, round lamps, and the dark vent band at the top of the chin [F][L] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 4.98, 5.10, s * 0.56, s * 0.86, 1.49, 1.79);
      box(B.dark, 5.095, 5.105, s * 0.59, s * 0.83, 1.52, 1.76);
      B.lamp.col = WHITE; cylX(B.lamp, 5.10, 5.115, s * 0.71, 1.64, 0.085, 14);
      B.lamp.col = AMBER;
      /* two amber markers on the corner facet, one over the other [F][L] */
      var fx = CAB[4][1] - CAB[4][5] * 0.5, fy = s * (CAB[4][3] - CAB[4][4] * 0.5);
      planeBox(B.lamp, [fx, fy, 1.66], unit([-0.26, s * 0.36, 0]), [0, 0, 1], unit([0.36, s * 0.26, 0]), -0.04, 0.04, -0.03, 0.03, 0, 0.02);
      planeBox(B.lamp, [fx, fy, 1.48], unit([-0.26, s * 0.36, 0]), [0, 0, 1], unit([0.36, s * 0.26, 0]), -0.04, 0.04, -0.03, 0.03, 0, 0.02);
    }
    var CA = [CAB[0][1], 0, CAB[0][0]], CH = [CAB[3][1], 0, CAB[3][0]];
    var CW = unit(sub(CH, CA)), CN = unit([CW[2], 0, -CW[0]]), CL = Math.sqrt(dot(sub(CH, CA), sub(CH, CA)));
    planeBox(B.dark, CA, U, CW, CN, -0.80, 0.80, CL - 0.24, CL - 0.03, -0.02, 0.004);   /* the vent band          */
    for (i = 0; i < 3; i++) planeBox(B.paint, CA, U, CW, CN, -0.78, 0.78, CL - 0.20 + i * 0.06, CL - 0.18 + i * 0.06, 0.0, 0.02);
    /* tow clevises under the chin [F][L] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 4.36, 4.50, s * 0.50, s * 0.62, 0.86, 0.98);
      bar(B.dark, [4.46, s * 0.56, 0.86], [4.50, s * 0.56, 0.74], 0.04);
    }
    /* the sides: door, its window and diagonal bar, rear-quarter window and grab rail, reflector, seams [F][L][D] */
    for (s = -1; s <= 1; s += 2) {
      y0 = s * 1.215; y1 = s * 1.226; y2 = s * 1.232;
      profY(B.glass, [[3.86, 1.88], [4.70, 1.88], [4.62, 2.36], [3.86, 2.36]], y0, y1);
      profY(B.glass, [[3.57, 1.95], [3.78, 1.95], [3.78, 2.36], [3.57, 2.36]], y0, y1);
      bar(B.dark, [4.60, y2, 1.90], [4.06, y2, 2.34], 0.025);
      box(B.dark, 3.80, 3.84, y0, y2, 1.00, 2.40);                       /* door rear seam        */
      box(B.dark, 3.80, 4.74, y0, y2, 1.10, 1.115);                       /* door foot             */
      box(B.dark, 3.80, 4.62, y0, y2, 2.40, 2.415);                       /* door head             */
      box(B.dark, 3.62, 3.645, y0, s * 1.26, 1.60, 2.30);                 /* grab rail             */
      box(B.dark, 3.62, 3.70, y0, s * 1.26, 1.60, 1.62);
      box(B.dark, 3.62, 3.70, y0, s * 1.26, 2.28, 2.30);
      box(B.dark, 3.95, 4.10, y0, s * 1.245, 1.80, 1.83);                 /* door handle           */
      B.lamp.col = AMBER; cylY(B.lamp, 4.38, y0, s * 1.232, 1.24, 0.045, 10);   /* round reflector  */
      /* the hanging step ladder under the door [F][L] */
      bar(B.dark, [3.92, s * 1.14, 0.97], [3.92, s * 1.14, 0.44], 0.03);
      bar(B.dark, [4.20, s * 1.14, 0.97], [4.20, s * 1.14, 0.44], 0.03);
      box(B.dark, 3.90, 4.22, s * 1.04, s * 1.20, 0.43, 0.46);
      box(B.dark, 3.90, 4.22, s * 1.04, s * 1.20, 0.68, 0.71);
      /* mirrors: a long forward arm off the windscreen head, the round convex head, a tall flat one under it */
      bar(B.dark, [4.62, s * 1.18, 2.44], [5.12, s * 1.42, 2.40], 0.03);
      bar(B.dark, [4.95, s * 1.20, 1.88], [5.08, s * 1.42, 1.92], 0.03);
      bar(B.dark, [5.10, s * 1.42, 1.90], [5.10, s * 1.42, 2.42], 0.025);
      cylX(B.dark, 5.10, 5.16, s * 1.42, 2.33, 0.10, 12);
      box(B.dark, 5.07, 5.12, s * 1.36, s * 1.50, 1.96, 2.24);
      box(B.glass, 5.055, 5.07, s * 1.37, s * 1.49, 1.97, 2.23);
    }
    /* roof: team panel, the camera's view of the owner */
    box(B.team, 3.74, 4.34, -0.62, 0.62, 2.588, 2.602);
  }

  /* --------------------------- behind the cab: radiator box, spare, intake, air cleaner, hydraulic tank [F][D] */
  function addBehindCab(B) {
    var i, k, y;
    /* the deck plate behind the cab, over axle 2, out to the body [F][D] */
    box(B.paint, XBF, XCR, -1.20, 1.20, 1.40, 1.47);
    /* the louvred radiator box, its louvres on the port face: four columns of slats [F][D] */
    box(B.paint, XRR, XRF, -0.30, 1.17, ZR0, ZR1);
    box(B.dark, XRR + 0.08, XRF - 0.08, 1.17, 1.178, ZR0 + 0.10, ZR1 - 0.10);
    for (k = 0; k < 13; k++) box(B.paint, XRR + 0.08, XRF - 0.08, 1.17, 1.19, ZR0 + 0.13 + k * 0.066, ZR0 + 0.155 + k * 0.066);
    for (k = 1; k < 4; k++) box(B.paint, XRR + 0.08 + k * (XRF - XRR - 0.16) / 4 - 0.012, XRR + 0.08 + k * (XRF - XRR - 0.16) / 4 + 0.012,
                                1.17, 1.195, ZR0 + 0.10, ZR1 - 0.10);
    box(B.paint, XRR + 0.06, XRF - 0.06, 1.17, 1.20, ZR1 - 0.10, ZR1 - 0.07);
    cylZ(B.paint, 3.10, 0.95, ZR1, ZR1 + 0.06, 0.07, 10);                 /* filler cap               */
    /* the spare, flat on its carrier over the box and behind it, 3.00 m over the tread [D][F] */
    var SB = new Bin(B.tyre.mat);
    tyre(SB, 0, 0, 0, true);
    var cx = 2.41, cy = 0.30, cz = 3.00 - 0.217;
    for (i = 0; i < SB.P.length; i += 3) {
      B.tyre.P.push(SB.P[i] + cx, -SB.P[i + 2] + cy, SB.P[i + 1] + cz);
      B.tyre.N.push(SB.N[i], -SB.N[i + 2], SB.N[i + 1]);
    }
    /* the carrier: a frame on posts aft of the radiator box */
    box(B.dark, 1.80, XRR, -0.30, 0.90, ZR1 - 0.04, ZR1);
    for (y = -0.26; y <= 0.9; y += 1.12) bar(B.dark, [1.84, y, ZR1 - 0.03], [1.84, y, 1.47], 0.06);
    /* the black intake head at the top behind the box, its short stack [F] */
    box(B.dark, 2.18, XRR, 0.20, 1.05, 2.22, ZR1 - 0.05);
    cylZ(B.dark, 2.30, 0.90, ZR1 - 0.05, 2.70, 0.05, 8);
    /* the air cleaner, a tan drum standing at the port side [F][D] */
    cylZ(B.paint, 2.30, 0.92, 1.56, 2.10, 0.13, 12);
    cylZ(B.dark, 2.30, 0.92, 2.10, 2.16, 0.10, 10);
    /* the tall hydraulic tank on the port side and its filler stack [F][D] */
    box(B.paint, 1.53, 2.14, 0.55, 1.15, 1.47, 2.17);
    box(B.dark, 1.55, 2.12, 1.15, 1.157, 1.60, 1.62);
    cylZ(B.paint, 1.72, 0.80, 2.17, 2.44, 0.08, 10);
    cylZ(B.paint, 1.72, 0.80, 2.44, 2.47, 0.10, 10);
    B.lamp.col = AMBER; box(B.lamp, 1.70, 1.80, 1.15, 1.16, 1.68, 1.74);
    /* the engine enclosure behind the cab, starboard of the box (inboard, estimated: no A4 photograph from the right) */
    box(B.paint, XRR + 0.10, XCR - 0.02, -1.05, -0.30, 1.47, 2.00);
    box(B.dark, XRR + 0.10, XCR - 0.04, -1.055, -1.05, 1.90, 1.93);
    /* the back wall's ribs */
    box(B.dark, XCR - 0.03, XCR, -1.12, -0.32, 2.12, 2.55);
  }

  /* --------------------------------------------------------- the chassis */
  function addChassis(B) {
    var s, i, x;
    /* the frame rails are painted with the truck [F] */
    box(B.paint, -4.80, 4.25, 0.36, 0.48, 1.04, 1.34);
    box(B.paint, -4.80, 4.25, -0.48, -0.36, 1.04, 1.34);
    var CM = [4.10, 2.70, 0.90, -0.60, -1.50, -2.90, -4.30];
    for (i = 0; i < CM.length; i++) box(B.paint, CM[i] - 0.05, CM[i] + 0.05, -0.36, 0.36, 1.10, 1.30);
    /* transmission and transfer case */
    box(B.dark, 2.10, 3.40, -0.34, 0.34, 0.86, 1.26);
    box(B.dark, 0.20, 0.90, -0.32, 0.32, 0.70, 1.04);
    /* axles: beams, differential housings; the tandems on trailing arms each side */
    for (i = 0; i < 4; i++) {
      box(B.dark, AX[i] - 0.07, AX[i] + 0.07, -0.80, 0.80, RT - 0.08, RT + 0.08);
      cylX(B.dark, AX[i] - 0.21, AX[i] + 0.21, 0, RT, 0.22, 12);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, AX[1] - 0.10, AX[0] + 0.10, s * 0.48, s * 0.62, RT + 0.06, RT + 0.20);
      box(B.dark, AX[3] - 0.10, AX[2] + 0.10, s * 0.48, s * 0.62, RT + 0.06, RT + 0.20);
      for (i = 0; i < 4; i++) cylZ(B.dark, AX[i] + (i % 2 ? -0.30 : 0.30), s * 0.55, RT + 0.20, 1.04, 0.13, 10);   /* air springs */
      /* mud flap behind axle 2 [F][L][D] */
      box(B.dark, AX[1] - 0.76, AX[1] - 0.72, s * 0.80, s * 1.22, 0.30, 1.40);
    }
    /* steering tie rods across the front tandem */
    for (i = 0; i < 2; i++) cylY(B.dark, AX[i] - 0.25, -0.85, 0.85, RT, 0.03, 6);
    /* propeller shafts */
    cylX(B.dark, AX[1] + 0.2, 2.10, 0, 0.80, 0.05, 6);
    cylX(B.dark, AX[2] + 0.2, 0.20, 0, 0.80, 0.05, 6);
    cylX(B.dark, AX[3] + 0.2, AX[2] - 0.2, 0, RT + 0.05, 0.05, 6);
    /* the round 155 gal tank, port side between the tandems, on two straps; the step box ahead of it [F][D] */
    cyl(B.paint, [0.30, 0.80, 0.98], [-0.95, 0.80, 0.98], 0.35, 0.35, 18, true, true);
    cyl(B.paint, [0.30, 0.80, 0.98], [0.42, 0.80, 0.98], 0.35, 0.22, 18, true, false);
    cyl(B.paint, [-0.95, 0.80, 0.98], [-1.07, 0.80, 0.98], 0.35, 0.22, 18, true, false);
    for (x = 0.10; x > -1.0; x -= 0.85) cylX(B.dark, x - 0.03, x + 0.03, 0.80, 0.98, 0.362, 18);
    cylZ(B.paint, -0.20, 0.80, 1.30, 1.38, 0.06, 8);
    box(B.paint, 0.46, 0.88, 0.70, 1.15, 0.66, 1.11);
    box(B.dark, 0.48, 0.86, 1.15, 1.16, 0.80, 0.82);
    for (s = -1; s <= 1; s += 2) {
      /* tail: cross beam, red lamps at its ends [D] */
      box(B.dark, -4.95, -4.80, -1.05, 1.05, 0.88, 1.12);
      B.lamp.col = RED; box(B.lamp, -4.96, -4.95, s * 0.80, s * 1.00, 0.94, 1.06);
    }
    /* the pintle hook [D] */
    box(B.dark, -5.08, -4.95, -0.10, 0.10, 0.90, 1.04);
    cylY(B.dark, -5.06, -0.05, 0.05, 0.92, 0.06, 8);
  }

  /* ------------------------------------------------- the drop-side cargo body [D][F][T] */
  /* posts along the side from [D]: the end posts, the double stake posts that split the three boards, and the
     stiffener in the middle of each board */
  var PEND = [XBF - 0.04, XBR + 0.01], PSTAKE = [-0.27, -0.43, -2.10, -2.27], PMID = [0.596, -1.30, -3.13];
  function addBody(B) {
    var s, i, x, y0, y1, ys;
    /* the body's own runners, cross bearers (their ends show under the board) and the floor */
    box(B.paint, XBR + 0.04, XBF - 0.04, 0.36, 0.50, 1.34, 1.52);
    box(B.paint, XBR + 0.04, XBF - 0.04, -0.50, -0.36, 1.34, 1.52);
    for (x = XBF - 0.10; x > XBR; x -= 0.50) box(B.paint, x - 0.04, x + 0.04, -1.19, 1.19, 1.50, 1.60);
    box(B.paint, XBR, XBF, -1.19, 1.19, 1.60, ZFL);
    for (s = -1; s <= 1; s += 2) {
      y0 = s * (BW - 0.04); y1 = s * (BW - 0.02); ys = s * BW;
      /* the board, its foot rail and top rail */
      box(B.paint, XBR, XBF, y0, y1, 1.62, ZBT - 0.03);
      box(B.paint, XBR, XBF, y0, ys, 1.58, 1.69);
      box(B.paint, XBR, XBF, s * (BW - 0.06), ys, ZBT - 0.05, ZBT);
      for (i = 0; i < PEND.length; i++) box(B.paint, PEND[i] - 0.04, PEND[i] + 0.04, y1, ys, 1.58, ZBT);
      for (i = 0; i < PSTAKE.length; i++) box(B.paint, PSTAKE[i] - 0.035, PSTAKE[i] + 0.035, y1, ys, 1.58, ZBT);
      for (i = 0; i < PMID.length; i++) box(B.paint, PMID[i] - 0.02, PMID[i] + 0.02, y1, s * (BW - 0.005), 1.69, ZBT - 0.05);
      /* latches on the stake posts, hinge knuckles along the foot */
      for (i = 0; i < PSTAKE.length; i++) box(B.dark, PSTAKE[i] - 0.05, PSTAKE[i] + 0.05, ys, s * (BW + 0.012), 1.82, 1.90);
      for (i = 0; i < PMID.length; i++) box(B.dark, PMID[i] - 0.03, PMID[i] + 0.03, ys, s * (BW + 0.01), 1.84, 1.89);
      for (x = XBF - 0.30; x > XBR; x -= 0.95) box(B.dark, x - 0.05, x + 0.05, ys, s * (BW + 0.015), 1.585, 1.62);
      B.lamp.col = AMBER; box(B.lamp, XBR + 0.10, XBR + 0.18, ys, s * (BW + 0.01), 1.61, 1.66);
    }
    /* headboard and tailgate */
    box(B.paint, XBF - 0.06, XBF, -BW, BW, 1.58, ZBT);
    box(B.team, XBF - 0.07, XBF + 0.01, -0.90, 0.90, ZBT, ZBT + 0.012);
    box(B.paint, XBR, XBR + 0.05, -BW, BW, 1.58, ZBT);
    for (s = -1; s <= 1; s += 2) box(B.paint, XBR - 0.02, XBR, s * 0.42 - 0.03, s * 0.42 + 0.03, 1.60, ZBT - 0.02);
    box(B.paint, XBR - 0.02, XBR, -1.10, 1.10, 1.95, 1.99);
  }

  /* ------------------------------------- the Grove materials handling crane, stowed at the tail [D][F][T] */
  function addCrane(B) {
    var s;
    /* the frame extension and the pedestal on it */
    box(B.paint, -4.86, -4.20, -0.32, 0.32, 1.08, 1.48);
    /* the slewing column */
    cylZ(B.paint, -4.55, 0, 1.48, 1.86, 0.17, 14);
    cylZ(B.dark, -4.55, 0, 1.86, 1.90, 0.19, 14);
    /* the boom folded upright: inner and outer sections side by side, the knuckle head on top; the head is the
       widest part, as [D] draws it */
    box(B.paint, -4.40, -4.64, -0.15, 0.15, 1.90, 2.18);
    box(B.paint, -4.64, -4.86, -0.13, 0.13, 1.40, 2.18);
    profY(B.paint, [[-4.36, 2.02], [-4.92, 2.02], [-4.90, 2.12], [-4.84, 2.27], [-4.46, 2.27], [-4.38, 2.12]], -0.20, 0.20);
    bar(B.dark, [-4.47, 0.13, 1.55], [-4.47, 0.13, 2.15], 0.05);           /* lift cylinder            */
    cylZ(B.dark, -4.75, 0, 1.30, 1.50, 0.04, 6);                           /* hook block hanging       */
    box(B.dark, -4.80, -4.70, -0.05, 0.05, 1.22, 1.30);
    /* the valve bank on the port side, its levers [D] */
    box(B.paint, -4.66, -5.00, 0.32, 0.72, 0.94, 1.36);
    for (s = 0; s < 4; s++) bar(B.dark, [-4.98, 0.38 + s * 0.09, 1.30], [-5.04, 0.38 + s * 0.09, 1.46], 0.02);
    /* stabiliser legs, stowed: a beam across the tail and a tube down each side [F] (port), [T] (starboard) */
    box(B.paint, -4.42, -4.54, -1.06, 1.06, 1.44, 1.58);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -4.42, -4.56, s * 0.94, s * 1.08, 0.62, 1.58);
      box(B.dark, -4.40, -4.58, s * 0.92, s * 1.10, 0.56, 0.62);
    }
  }

  /* ------------------------------------------------- the load: two strapped pallet stacks forward, six drums */
  function addLoad(B) {
    var s, i, y0, y1, x, top;
    for (s = -1; s <= 1; s += 2) {
      y0 = s > 0 ? 0.20 : -1.12; y1 = s > 0 ? 1.12 : -0.20; top = s > 0 ? 2.52 : 2.30;
      B.vc.col = WOOD; box(B.vc, 0.10, 1.36, y0, y1, ZFL, ZFL + 0.12);
      B.vc.col = s > 0 ? OLIVE : CRATE; box(B.vc, 0.14, 1.32, y0 + 0.02, y1 - 0.02, ZFL + 0.12, top);
      B.vc.col = STRAP;
      box(B.vc, 0.42, 0.47, y0 + 0.005, y1 - 0.005, ZFL + 0.11, top + 0.012);
      box(B.vc, 0.98, 1.03, y0 + 0.005, y1 - 0.005, ZFL + 0.11, top + 0.012);
    }
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      x = -1.00 - i * 0.90;
      B.vc.col = DRUM; cylZ(B.vc, x, s * 0.62, ZFL, ZFL + 0.88, 0.29, 12);
      B.vc.col = BAND; cylZ(B.vc, x, s * 0.62, ZFL + 0.42, ZFL + 0.47, 0.30, 12);
    }
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), i, s, wg, wm, geo, TB;
    g.name = "us_hemtt";
    addCab(HB);
    addBehindCab(HB);
    addChassis(HB);
    addBody(HB);
    addCrane(HB);
    addLoad(HB);
    flush(THREE, g, HB);
    TB = new Bin(T.tyre);
    tyre(TB, 0, 0, 0);
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(TB.N), 3));
    geo.computeBoundingSphere();
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * TY, RT);
      wm = new THREE.Mesh(geo, T.tyre);
      wm.castShadow = true; wm.receiveShadow = true;
      wg.add(wm);
      g.add(wg);
    }
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (dump.js 10.28 m): the pintle pin (-5.12) to the mirror heads (+5.16); the truck
   over its headlamp pods and pintle hook is 10.20 m as [D] draws it */
UNIT_MODELS["supply_n"] = { len: 10.28, build: HeroUsHemtt.build };
