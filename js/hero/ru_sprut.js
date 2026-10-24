/* ============ ru_sprut.js - HERO model: the 2S25 Sprut-SD airborne self-propelled anti-tank gun
   Two keys, both rows named "2S25 Sprut-SD": pact_e00_lighttank (service 2005, the production run of
   2005-2010) and lt_p (the present-day row).  Both are drawn as the 2S25; the 2S25M / Sprut-SDM1 is
   not a row and is not drawn.  The rows differ in paint only (see Paint).  Redo of 2026-10-24 to the
   full-quality procedure.

   Sources (Wikimedia Commons, fetched at width 960 with a generic agent string)
     A  "Army2016demo-022.jpg" (Vitaly V. Kuzmin): LEFT side almost square on, turret turned to the
        right so its rear plate faces the camera.  The side station table is measured off it, scaled on
        the published road-wheel base (4225 mm) and hull length (7085 mm): 117 px/m.  The suspension
        is raised in A (the gap from wheel tops to the upper track run is 0.45 m); the model is drawn
        0.20 m lower, a mid ride height (clearance 0.30 of the published 0.10-0.50).
     B  "2S25 Sprut-SD in Russia.jpeg": right side, early three-tone vehicle: turret length and place.
     C  "Russia Arms Expo 2013 (531-28)" and D "(531-27)" (Kuzmin): front and left front three-quarter:
        the arrowhead turret front, sights, cupola, lamps, the bow.
     E  "2S25 Sprut-SD, Moscow parade 2009.JPG": left rear three-quarter: the stern plate with the two
        water-jet outlets and their flaps.
     F  "2008 Moscow Victory Day Parade - 2S25 Sprut-SD.jpg", "2S25 Sprut-SD tank destroyer in
        2008.JPG", "2S25 Sprut-SD.jpg" (2008 parade): paint, wheels, turret from the right.
     G  "2S25 Sprut-SD at Army 2016.jpg", "125-mm ... Sprut-SD ... Armiya 2021": present-day paint.
     ru.wikipedia "2S25": hull 7085 mm, 9770 mm gun forward, width 3152, height 3050 (at full
        clearance), base 4225, track 2744, clearance 100-500 (hydropneumatic, adjustable); the
        chassis keeps the geometry of the Object 934 light tank (the BMD-3 family); welded aluminium
        hull and turret; driver in the bow centre; seven pairs of single rubber-tyred road wheels and
        SIX pairs of return rollers, sprocket at the rear, idler at the front; ring 2340 mm clear;
        2A75 125 mm, 48 calibres, no muzzle brake (the recoil is taken by a 740 mm stroke);
        two water jets, their shutters in the lower stern plate; two brackets of 902V smoke
        dischargers on the turret REAR plate.
     The Army-2022/2023 "2S25 Mod" photographs (slat armour, a remote weapon station) are a later
     modification no row names; they were read and not drawn.

   Recognition list (what shows at game zoom, and where it rests)
     1  a long low boxy amphibious hull, the turret near the middle and a long engine deck [A, B]
     2  the boat bow: a short shallow upper glacis to a sharp nose, a steep lower bow plate under it,
        the bow overhanging the track by 0.8 m, the front corners cut back in plan [A, C, D]
     3  inward-sloped upper hull sides above vertical track guards [C, D]
     4  SEVEN single rubber-tyred road wheels a side with fluted discs, evenly spaced [A, F]
     5  six small return rollers, the front idler and the toothed rear sprocket both raised [A, ru.wp]
     6  the low wide turret with an ARROWHEAD front: two big plates swept back from a small mantlet,
        the roof dropping toward the gun [B, C, D]
     7  the long 125 mm 2A75 with no muzzle brake, a bore evacuator and a muzzle collar [B, C, D]
     8  the gunner's sight head left of the gun and the raised commander's cupola left rear [C, D]
     9  the turret rear plate: two banks of three smoke dischargers, a round port in the middle and a
        box on each rear corner [A, B, ru.wp]
    10  the stern plate with the two rectangular water-jet outlets and their curved shutters [E]
    11  three crew hatches across the bow deck, lamps at the front corners [A, C, D]
    12  the louvred engine grilles on the rear deck [A]

   Side station table (metres; x from the hull middle, + forward; z above the ground at mid ride)
     nose x 3.54 z 1.44; upper glacis to the deck (z 1.77) at x 2.69; lower bow plate from the nose
     down to the belly (z 0.30) at x 2.44; stern plate x -3.54, vertical from the deck to z 0.55,
     the lower stern swept forward to the belly at x -3.30.  Track guards: bottom z 0.95, outer half
     width 1.576 (the 3152 width), crease z 1.49, roof edge half width 1.40.  Front corners cut back
     from x 2.75 to a half width of 1.30 at the nose.
     road wheels x 1.77 1.07 0.36 -0.34 -1.04 -1.75 -2.45 (base 4225), centre z 0.34, r 0.29
     return rollers x 1.42 0.71 0.01 -0.69 -1.40 -2.10, z 0.75, r 0.08
     idler x 2.45 z 0.60 r 0.26; sprocket x -3.03 z 0.47 r 0.30; track centre half gauge 1.372
     turret: ring centre x 0.00 (B); rear plate -1.55; full width to x 0.10, then the front plates swept
     to the mantlet at x 1.20 (half width 0.42); roof 0.64 above the deck; gun axis 0.32 above the
     deck; muzzle x 6.23 (9.77 overall).
   As built: 9.84 m over the gun and the stern shutters (published 9.77), hull 7.08, width 3.20 over the
   sprocket hubs (published 3.152 over the track guards), height 2.75 to the lamp at mid ride
   (published 3.05 at full clearance: 2.95 measured in A, which stands 0.20 higher).

   Paint (sampled, taken to about 0.8)
     pact_e00_lighttank: the three-tone the 2008-2009 parade and the RAE-2013 vehicles wear [C, D,
       E, F]: a mid green base with pale grey-green and black disruptive patches (pale #8c8d88 ->
       #73776a; mid #6d6d69 -> #59604b, greened as it shows in the sunlit 2008 frames; black #21221e).
     lt_p: the plain green of the 2016 and 2021 vehicles [A, G] (#464b34 sunlit turret, #4b4c48 side
       -> #454b3a).
     No numbers, no VDV emblem, no exhibition stickers.

   Corrections to the old file: the hull was drawn too low and short in the bow (1.45 m deck; it is
   1.77 at mid ride) with no lower bow plate; the return rollers were left off (ru.wikipedia and A
   show six); the turret was a forward-tapering box with the smoke dischargers on its corners - the
   front is an arrowhead of swept plates and the dischargers are on the rear plate; the commander's
   cupola is on the LEFT (C, D), not the right; the mantlet sat 0.3 m too far forward (the muzzle at
   9.7 m overall was right).  NOT drawn: the two whip aerials (bases only), the trim vane
   unfolded, the stowage tarp of the 2016 vehicles, the 2S25M changes, any marking.

   Nodes: "turret" (ring centre on the deck, gun along +X), seven "roadwheel" groups (the wheel discs
   of a station, both sides; the tyres are rings of revolution and stay in the hull).  Team colour is
   the plain C.team material on the turret rear box lids and the front track-guard tops.  Model space
   +X bow, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSprut = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    e00: { name: "2S25 Sprut-SD (2005)", camo: true,
           paint: { base: "#59604b", tone: ["#73776a", "#24251f"], seed: 2005 } },
    e20: { name: "2S25 Sprut-SD (present)", camo: false,
           paint: { base: "#454b3a", tone: ["#4c5240", "#3e4434"], seed: 2016 } }
  };

  /* station table: see the header */
  var XS = -3.54, XN = 3.54, ZD = 1.77, ZB = 0.30, ZG = 0.95, ZC = 1.49, WO = 1.576, WR = 1.30, WB = 1.15;
  var XW = [1.77, 1.07, 0.36, -0.34, -1.04, -1.75, -2.45], ZW = 0.34, RW = 0.29;
  var XR = [1.42, 0.71, 0.01, -0.69, -1.40, -2.10], ZR = 0.75, RR = 0.08;
  var TYC = 1.372, TH = 0.18;
  var IDL = [2.45, 0.60, 0.26], SPR = [-3.03, 0.47, 0.30];
  var TX = 0.0, TZ = ZD, GZ = 0.32, MUZ = 6.23 - TX;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; a painted bin also gets planar UVs in
     metres from the dominant axis of each face, so the paint never stretches */
  function Bin(mat, uv, k) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.k = k || 0.25; this.o = [0, 0, 0]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, k = this.k, o = this.o, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push((q[0] + o[0]) * k, (q[1] + o[1]) * k);
        else if (ay >= ax) this.U.push((q[0] + o[0]) * k, (q[2] + o[2]) * k);
        else this.U.push((q[1] + o[1]) * k, (q[2] + o[2]) * k);
      }
    }
  };
  /* a closed solid: the signed volume says whether the faces point out */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
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
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  /* a slab along a line in the XZ plane, thickness th, across y0..y1 */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 16); }
  /* LOFT: cross-sections in the YZ plane at stations along X, all with the same
     point count, joined in order and capped by a fan from the section centre */
  function loft(bin, S) {
    var V = [], F = [], n = S[0].p.length, m = S.length, i, k, k1, c0, c1;
    for (i = 0; i < m; i++) for (k = 0; k < n; k++) V.push([S[i].x, S[i].p[k][0], S[i].p[k][1]]);
    for (i = 0; i + 1 < m; i++) for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([i * n + k, i * n + k1, (i + 1) * n + k1], [i * n + k, (i + 1) * n + k1, (i + 1) * n + k]);
    }
    c0 = V.length; V.push([S[0].x, S[0].c[0], S[0].c[1]]);
    c1 = V.length; V.push([S[m - 1].x, S[m - 1].c[0], S[m - 1].c[1]]);
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([c0, k1, k]);
      F.push([c1, (m - 1) * n + k, (m - 1) * n + k1]);
    }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      draw(cv.getContext("2d"));
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* a wandering blob: an irregular closed outline round (x, y) */
  function blob(q, R, x, y, rx, ry) {
    var k, a, r, n = 11;
    q.beginPath();
    for (k = 0; k <= n; k++) {
      a = k / n * TAU; r = 0.65 + R() * 0.55;
      if (k === 0) q.moveTo(x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r);
      else q.lineTo(x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r);
    }
    q.closePath(); q.fill();
  }
  /* hull paint; one tile is 4 m of surface.  The three-tone draws the pale and
     black patches as large disruptive shapes, wrapped across the tile edges */
  function paintTex(THREE, V) {
    var P = V.paint;
    return canvasTex(THREE, "sprut" + P.base + P.seed, function (q) {
      var R = rng(P.seed), i, k, x, y, w, dx, dy;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      if (V.camo) {
        for (k = 0; k < 2; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < (k ? 5 : 6); i++) {
            x = R() * 256; y = R() * 256; w = 26 + R() * 30;
            for (dx = -256; dx <= 256; dx += 256) for (dy = -256; dy <= 256; dy += 256) {
              blob(q, rng(P.seed + i * 7 + k * 101), x + dx, y + dy, w * 1.6, w * 0.7);
            }
          }
        }
      } else {
        for (k = 0; k < P.tone.length; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < 7; i++) {
            x = R() * 256; y = R() * 256; w = 30 + R() * 60;
            q.globalAlpha = 0.4; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
          }
        }
        q.globalAlpha = 1;
      }
      /* plate seams and weld lines */
      q.strokeStyle = "rgba(18,20,14,0.30)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 0.5, 0); q.lineTo(i * 64 + 0.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 40.5); q.lineTo(256, i * 64 + 40.5); q.stroke();
      }
      /* bolt heads along the seams */
      q.fillStyle = "rgba(12,12,10,0.35)";
      for (i = 0; i < 64; i++) q.fillRect((i % 16) * 16 + 6, Math.floor(i / 16) * 64 + 38, 2, 2);
      /* dust and rain streaks */
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.07)" : "rgba(220,214,190,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.8, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* move every vertex of a set of bins into a child frame at (dx, 0, dz);
     the painted UVs keep the model-space origin so the paint does not jump */
  function shift(B, dx, dz) {
    var k, b, i;
    for (k in B) {
      b = B[k];
      for (i = 0; i < b.P.length; i += 3) { b.P[i] -= dx; b.P[i + 2] -= dz; }
    }
  }

  /* ---------------------------------------------------------------- hull */
  function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
  /* the hull at station x: belly, track guard, crease, roof edge */
  function hsec(x) {
    var zb = ZB, zt = ZD, zc = ZC, zg = ZG, wo = WO, wr = WR, wb = WB;
    if (x < -3.30) zb = lerp(0.55, ZB, (x - XS) / (-3.30 - XS));          /* lower stern swept forward */
    if (x > 2.44) zb = lerp(ZB, 1.38, (x - 2.44) / (XN - 2.44));          /* lower bow plate */
    if (x > 2.69) zt = lerp(ZD, 1.46, (x - 2.69) / (XN - 2.69));          /* upper glacis */
    if (x > 2.75) { wo = lerp(WO, 1.22, (x - 2.75) / (XN - 2.75)); wr = lerp(WR, 1.00, (x - 2.75) / (XN - 2.75)); }
    zc = Math.min(zc, zt - 0.05);
    zg = Math.max(zg, zb); zc = Math.max(zc, zg + 0.01);
    wb = Math.min(wb, wo - 0.02);
    return { x: x, c: [0, (zb + zt) / 2],
             p: [[-wb, zb], [wb, zb], [wb, zg], [wo, zg], [wo, zc], [wr, zt], [-wr, zt], [-wo, zc], [-wo, zg], [-wb, zg]] };
  }
  function addHull(V, B) {
    var X = [XS, -3.42, -3.30, -2.5, -1.0, 0.5, 2.0, 2.44, 2.69, 2.75, 2.95, 3.15, 3.35, 3.48, XN], S = [], i, s, k, x;
    for (i = 0; i < X.length; i++) S.push(hsec(X[i]));
    loft(B.paint, S);

    /* ---- bow ---- */
    /* plate lying across the upper glacis (C, D) */
    belt(B.paint, 2.78, 1.73, 3.12, 1.62, -0.78, 0.78, 0.04);
    /* towing eyes on the nose and the lower bow plate */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.dark, [3.47, s * 0.85, 1.30], [3.58, s * 0.85, 1.30], 0.05, 0.05, 8);
      box(B.dark, 3.38, 3.50, s * 0.85 - 0.08, s * 0.85 + 0.08, 1.12, 1.20);
      /* lamp housings at the front corners of the deck (C, D) */
      box(B.paint, 2.62, 2.84, s * 1.18 - 0.11, s * 1.18 + 0.11, 1.70, 1.80);
      cylX(B.dark, 2.70, 2.90, s * 1.18, 1.88, 0.085, 0.085, 14);
      cylX(B.glass, 2.90, 2.92, s * 1.18, 1.88, 0.07, 0.07, 14);
      /* front mud flap at the end of the track guard */
      belt(B.paint, 2.76, 0.97, 3.10, 1.12, s > 0 ? 1.20 : -1.52, s > 0 ? 1.52 : -1.20, 0.03);
      /* team colour on the front track-guard tops */
      box(B.team, 2.10, 2.55, s * 1.43 - 0.06, s * 1.43 + 0.06, ZD - 0.01, ZD + 0.012);
    }
    /* three crew hatches across the bow deck: driver on the centre line,
       a hatch each side (ru.wp: commander right, gunner left on the march) */
    cylZ(B.paint, 2.22, 0.0, ZD - 0.04, ZD + 0.07, 0.28, 18);
    cylZ(B.paint, 2.22, 0.0, ZD + 0.07, ZD + 0.10, 0.20, 16);
    box(B.paint, 2.48, 2.64, -0.34, 0.34, ZD - 0.04, ZD + 0.08);
    for (k = -1; k <= 1; k++) box(B.glass, 2.64, 2.66, k * 0.21 - 0.06, k * 0.21 + 0.06, ZD - 0.01, ZD + 0.05);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.paint, 2.00, s * 0.82, ZD - 0.04, ZD + 0.06, 0.26, 18);
      box(B.paint, 2.26, 2.40, s * 0.82 - 0.14, s * 0.82 + 0.14, ZD - 0.04, ZD + 0.07);
      box(B.glass, 2.40, 2.42, s * 0.82 - 0.09, s * 0.82 + 0.09, ZD, ZD + 0.05);
    }

    /* ---- deck and sides ---- */
    /* engine deck: two louvred grille panels and the cover between them (A) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.30, -2.38, s * 0.10, s * 1.20, ZD - 0.02, ZD + 0.03);
      for (k = 0; k < 9; k++) {
        x = -3.24 + k * 0.10;
        box(B.dark, x, x + 0.05, s > 0 ? 0.16 : -1.14, s > 0 ? 1.14 : -0.16, ZD + 0.03, ZD + 0.05);
      }
    }
    box(B.paint, -2.30, -1.75, -0.95, 0.95, ZD - 0.02, ZD + 0.04);       /* access cover behind the turret */
    cylZ(B.paint, -1.55, 0.95, ZD - 0.02, ZD + 0.07, 0.17, 14);          /* filler (A) */
    cylZ(B.dark, -1.55, -0.95, ZD - 0.02, ZD + 0.05, 0.10, 10);
    for (s = -1; s <= 1; s += 2) {
      /* lifting eyes and handles along the upper side */
      for (k = 0; k < 5; k++) {
        x = -2.9 + k * 1.30;
        box(B.dark, x, x + 0.10, s * 1.47 - 0.02, s * 1.47 + 0.02, ZC + 0.05, ZC + 0.14);
      }
      /* the track-guard lip along the bottom of the side */
      box(B.paint, -3.50, 2.75, s * WO - 0.02, s * WO + 0.012, ZG, ZG + 0.05);
    }

    /* ---- stern (E): water-jet outlets with their shutters, door panel, lamps ---- */
    box(B.paint, -3.565, -3.54, -0.30, 0.30, 0.78, 1.60);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.555, -3.53, s * 0.88 - 0.24, s * 0.88 + 0.24, 0.66, 0.92);     /* outlet */
      box(B.paint, -3.575, -3.54, s * 0.88 - 0.28, s * 0.88 + 0.28, 0.92, 0.97);    /* hood over it */
      belt(B.paint, -3.56, 0.64, -3.595, 0.42, s * 0.88 - 0.25, s * 0.88 + 0.25, 0.03); /* shutter */
      box(B.dark, -3.58, -3.54, s * 1.36 - 0.07, s * 1.36 + 0.07, 1.52, 1.66);      /* tail lamp */
      box(B.dark, -3.585, -3.54, s * 0.40 - 0.05, s * 0.40 + 0.05, 0.50, 0.62);      /* tow hook */
      /* rear mud flap */
      box(B.paint, -3.56, -3.42, s > 0 ? 1.20 : -1.55, s > 0 ? 1.55 : -1.20, 0.86, ZG);
    }
  }

  /* ---------------------------------------------------- running gear */
  function trackLoop() {
    var pts = [], i, k, c, a, circ = [[IDL[0], IDL[1], IDL[2] + 0.03], [SPR[0], SPR[1], SPR[2] + 0.03]];
    for (i = 0; i < XW.length; i++) circ.push([XW[i], ZW, RW + 0.03]);
    for (i = 0; i < XR.length; i++) circ.push([XR[i], ZR, RR + 0.03]);
    for (i = 0; i < circ.length; i++) for (k = 0; k < 28; k++) {
      a = k / 28 * TAU; c = circ[i];
      pts.push([c[0] + c[2] * Math.cos(a), c[1] + c[2] * Math.sin(a)]);
    }
    pts.sort(function (u, v) { return u[0] - v[0] || u[1] - v[1]; });
    function cr(o, a2, b2) { return (a2[0] - o[0]) * (b2[1] - o[1]) - (a2[1] - o[1]) * (b2[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop(); lo.push(pts[i]); }
    for (i = pts.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop(); up.push(pts[i]); }
    lo.pop(); up.pop();
    var all = lo.concat(up), out = [];
    for (i = 0; i < all.length; i++) {
      var pv = out.length ? out[out.length - 1] : all[all.length - 1];
      if (Math.abs(all[i][0] - pv[0]) + Math.abs(all[i][1] - pv[1]) > 1e-4) out.push(all[i]);
    }
    return out;
  }
  /* steel links with a guide horn at each edge (ru.wp: double-horn track) */
  function addTrack(B, side) {
    var H = trackLoop(), n = H.length, len = [], tot = 0, i, j, a, b, d, nl, p, t, pos, seg, ang, cx, cz, hl, th = 0.045;
    for (i = 0; i < n; i++) { a = H[i]; b = H[(i + 1) % n]; d = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])); len.push(d); tot += d; }
    nl = Math.round(tot / 0.15); p = tot / nl;
    var ya = side * (TYC - TH), yb = side * (TYC + TH);
    if (ya > yb) { t = ya; ya = yb; yb = t; }
    for (j = 0; j < nl; j++) {
      pos = (j + 0.5) * p; seg = 0;
      while (seg < n - 1 && pos > len[seg]) { pos -= len[seg]; seg++; }
      a = H[seg]; b = H[(seg + 1) % n]; t = pos / len[seg];
      cx = a[0] + (b[0] - a[0]) * t; cz = a[1] + (b[1] - a[1]) * t;
      ang = Math.atan2(b[1] - a[1], b[0] - a[0]); hl = p / 2 - 0.012;
      var ux = Math.cos(ang), uz = Math.sin(ang), nx = -uz * th / 2, nz = ux * th / 2;
      var ox = cx + nx, oz = cz + nz;
      hexa(B, [[ox - ux * hl - nx, ya, oz - uz * hl - nz], [ox + ux * hl - nx, ya, oz + uz * hl - nz], [ox + ux * hl - nx, yb, oz + uz * hl - nz], [ox - ux * hl - nx, yb, oz - uz * hl - nz],
               [ox - ux * hl + nx, ya, oz - uz * hl + nz], [ox + ux * hl + nx, ya, oz + uz * hl + nz], [ox + ux * hl + nx, yb, oz + uz * hl + nz], [ox - ux * hl + nx, yb, oz - uz * hl + nz]]);
      if (j % 2 === 0) {
        var gx = cx + nx * 2.6, gz = cz + nz * 2.6, e;
        for (e = -1; e <= 1; e += 2) {
          var gy = side * (TYC + e * 0.13);
          box(B, gx - 0.025, gx + 0.025, gy - 0.014, gy + 0.014, gz - 0.02, gz + 0.03);
        }
      }
    }
  }
  /* a spoked disc wheel (idler or sprocket face) */
  function spokedDisc(B, x, z, r, side, holes) {
    var k, a, yo = side * (TYC + TH - 0.02), yi = side * (TYC - TH + 0.02);
    cylY(B.dark, x, yi, yo, z, r, 20);
    cylY(B.paint, x, yo, yo + side * 0.03, z, r * 0.78, 18);
    cylY(B.paint, x, yo + side * 0.03, yo + side * 0.07, z, r * 0.30, 12);
    for (k = 0; k < holes; k++) {
      a = k / holes * TAU + 0.3;
      cylY(B.dark, x + Math.cos(a) * r * 0.52, yo + side * 0.025, yo + side * 0.035, z + Math.sin(a) * r * 0.52, r * 0.13, 8);
    }
  }
  function addRunning(V, B, WBins) {
    var side, k, i, a;
    for (side = -1; side <= 1; side += 2) {
      addTrack(B.dark, side);
      /* tyres of the road wheels: rings of revolution, static */
      for (i = 0; i < XW.length; i++) cylY(B.dark, XW[i], side * (TYC - 0.12), side * (TYC + 0.12), ZW, RW, 20);
      /* return rollers on stub axles from the hull side */
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], side * (WB - 0.02), side * (TYC + 0.09), ZR, RR, 12);
        cylY(B.paint, XR[i], side * (TYC + 0.09), side * (TYC + 0.12), ZR, RR * 0.6, 10);
      }
      /* front idler: a holed disc (A) */
      spokedDisc(B, IDL[0], IDL[1], IDL[2] - 0.02, side, 6);
      /* rear sprocket: holed drum with fourteen teeth on two rims */
      spokedDisc(B, SPR[0], SPR[1], SPR[2] - 0.05, side, 6);
      for (k = 0; k < 14; k++) {
        a = k / 14 * TAU;
        (function (cx, cz, an) {
          var c = Math.cos(an), sn = Math.sin(an), r0 = SPR[2] - 0.07, r1 = SPR[2] + 0.02, w = 0.04, q = [], dd, e;
          var ya = side * (TYC - 0.10), yb = side * (TYC + 0.10);
          for (dd = 0; dd < 2; dd++) { e = dd ? yb : ya; q.push([cx + r0 * c + sn * w, e, cz + r0 * sn - c * w], [cx + r1 * c + sn * w * 0.5, e, cz + r1 * sn - c * w * 0.5], [cx + r1 * c - sn * w * 0.5, e, cz + r1 * sn + c * w * 0.5], [cx + r0 * c - sn * w, e, cz + r0 * sn + c * w]); }
          solid(B.dark, q, HEXF);
        })(SPR[0], SPR[1], a);
      }
      /* hydropneumatic suspension arms: a trailing arm inboard of each wheel */
      for (i = 0; i < XW.length; i++) {
        belt(B.dark, XW[i], ZW, XW[i] + 0.34, ZW + 0.22, side > 0 ? WB - 0.02 : -(TYC - 0.13), side > 0 ? TYC - 0.13 : -(WB - 0.02), 0.09);
      }
    }
    /* road-wheel discs, one group per station: a dished disc with ten flutes
       and a hub cap on the outer face (A, F) */
    for (i = 0; i < XW.length; i++) {
      for (side = -1; side <= 1; side += 2) {
        var Bw = WBins[i], yo = side * (TYC + 0.12);
        Bw.o = [XW[i], 0, ZW];
        cyl(Bw, [0, yo, 0], [0, yo + side * 0.05, 0], RW * 0.86, RW * 0.30, 20);
        cylY(Bw, 0, yo + side * 0.04, yo + side * 0.085, 0, RW * 0.24, 12);
        for (k = 0; k < 10; k++) {
          a = k / 10 * TAU + 0.15;
          (function (an) {
            var c = Math.cos(an), sn = Math.sin(an), r0 = RW * 0.32, r1 = RW * 0.80, w = 0.022;
            var y0 = yo + side * 0.045, y1 = yo + side * 0.012, ys = side * 0.02;
            hexa(Bw, [[r0 * c - sn * w, y0, r0 * sn + c * w], [r1 * c - sn * w, y1, r1 * sn + c * w],
                      [r1 * c + sn * w, y1, r1 * sn - c * w], [r0 * c + sn * w, y0, r0 * sn - c * w],
                      [r0 * c - sn * w, y0 + ys, r0 * sn + c * w], [r1 * c - sn * w, y1 + ys, r1 * sn + c * w],
                      [r1 * c + sn * w, y1 + ys, r1 * sn - c * w], [r0 * c + sn * w, y0 + ys, r0 * sn - c * w]]);
          })(a);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* section of the turret at local x: base half width hb, shoulder at zs, roof
     edge half width ht at roof height zr.  The plan is an arrowhead: full width
     to x 0.10, then the two front plates swept back from the mantlet (B, C, D) */
  function tsec(x, hb, zs, ht, zr) {
    return { x: x, c: [0, zr / 2], p: [[-hb, -0.03], [hb, -0.03], [hb, zs], [ht, zr], [-ht, zr], [-hb, zs]] };
  }
  function addTurret(V, B) {
    var s, i, k, a, gy;
    loft(B.paint, [tsec(-1.55, 1.20, 0.34, 1.04, 0.60), tsec(-1.40, 1.26, 0.36, 1.08, 0.64),
                   tsec(0.10, 1.26, 0.36, 1.08, 0.64), tsec(0.40, 1.04, 0.35, 0.86, 0.64),
                   tsec(0.80, 0.74, 0.32, 0.56, 0.54), tsec(1.20, 0.42, 0.28, 0.30, 0.46)]);
    /* mantlet: a small cast block in the nose of the arrowhead, with the
       gun's sleeve boot */
    box(B.paint, 1.12, 1.40, -0.30, 0.30, GZ - 0.20, GZ + 0.17);
    cylX(B.dark, 1.38, 1.52, 0, GZ, 0.17, 0.14, 18);
    /* the 2A75: sleeve, bore evacuator, tube, muzzle collar; no brake */
    cylX(B.dark, 1.50, 3.83, 0, GZ, 0.105, 0.095, 18);
    cylX(B.dark, 3.83, 3.93, 0, GZ, 0.095, 0.125, 18);
    cylX(B.dark, 3.93, 4.45, 0, GZ, 0.125, 0.125, 18);
    cylX(B.dark, 4.45, 4.55, 0, GZ, 0.125, 0.085, 18);
    cylX(B.dark, 4.55, 6.13, 0, GZ, 0.085, 0.080, 16);
    cylX(B.dark, 6.13, MUZ, 0, GZ, 0.097, 0.097, 16);
    cylX(B.dark, 2.40, 2.46, 0, GZ, 0.112, 0.112, 18);   /* sleeve clamp bands */
    cylX(B.dark, 3.20, 3.26, 0, GZ, 0.104, 0.104, 18);
    /* coaxial PKT port and the box right of the gun (C) */
    box(B.paint, 1.02, 1.30, -0.52, -0.32, GZ - 0.08, GZ + 0.10);
    cylX(B.dark, 1.30, 1.44, -0.42, GZ - 0.02, 0.025, 0.025, 8);

    /* gunner's sight head, roof left of the gun, window forward (C, D) */
    box(B.paint, 0.26, 0.62, 0.38, 0.70, 0.60, 0.92);
    box(B.glass, 0.62, 0.64, 0.44, 0.64, 0.72, 0.88);
    cyl(B.paint, [0.40, 0.54, 0.92], [0.40, 0.54, 0.95], 0.19, 0.19, 16);  /* round armoured lid (C, D) */
    /* commander's cupola left rear, raised, with a sight box at its front and
       a lamp on a post beside it (C, D) */
    cylZ(B.paint, -0.55, 0.72, 0.60, 0.78, 0.34, 20);
    cylZ(B.paint, -0.55, 0.72, 0.78, 0.84, 0.27, 18);
    box(B.paint, -0.36, -0.12, 0.60, 0.86, 0.74, 0.96);
    box(B.glass, -0.12, -0.10, 0.65, 0.81, 0.80, 0.92);
    for (i = 0; i < 4; i++) {
      a = Math.PI * (0.55 + i * 0.3);
      box(B.glass, -0.55 + Math.cos(a) * 0.30 - 0.03, -0.55 + Math.cos(a) * 0.30 + 0.03,
          0.72 + Math.sin(a) * 0.30 - 0.03, 0.72 + Math.sin(a) * 0.30 + 0.03, 0.76, 0.82);
    }
    cylZ(B.paint, 0.05, 0.40, 0.62, 0.86, 0.025, 6);
    cylX(B.paint, 0.00, 0.14, 0.40, 0.92, 0.075, 0.075, 12);
    cylX(B.glass, 0.14, 0.15, 0.40, 0.92, 0.06, 0.06, 12);
    /* hatch and periscope on the roof right (C) */
    cylZ(B.paint, -0.55, -0.66, 0.62, 0.70, 0.30, 18);
    box(B.paint, -0.25, -0.05, -0.80, -0.56, 0.62, 0.76);
    box(B.glass, -0.05, -0.04, -0.76, -0.60, 0.66, 0.73);
    /* antenna bases on the roof rear corners (the whips are not drawn) */
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, -1.30, s * 0.95, 0.62, 0.84, 0.04, 8);

    /* rear plate (A, B): round port in the middle, two banks of three 902V
       smoke dischargers, a box on each rear corner */
    cylX(B.paint, -1.60, -1.54, 0, 0.30, 0.18, 0.18, 16);
    cylX(B.dark, -1.62, -1.60, 0, 0.30, 0.12, 0.12, 14);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -1.66, -1.55, s * 0.40 - 0.22, s * 0.40 + 0.22, 0.12, 0.22);
      for (k = 0; k < 3; k++) {
        gy = s * 0.40 + (k - 1) * 0.14;
        cyl(B.dark, [-1.60, gy, 0.20], [-1.72, gy, 0.44], 0.045, 0.045, 10);
        cyl(B.paint, [-1.72, gy, 0.44], [-1.73, gy, 0.46], 0.05, 0.05, 10);
      }
      box(B.paint, -1.70, -0.90, s > 0 ? 0.92 : -1.36, s > 0 ? 1.36 : -0.92, 0.08, 0.54);
      box(B.team, -1.62, -0.98, s > 0 ? 0.98 : -1.30, s > 0 ? 1.30 : -0.98, 0.54, 0.555);
      /* grab rails along the turret sides */
      box(B.dark, -0.70, 0.00, s * 1.28 - 0.015, s * 1.28 + 0.015, 0.44, 0.47);
    }
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.e00, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WBins = [], i, wg, tg, TB = bins(T);
    g.name = "ru_sprut_" + which;
    for (i = 0; i < XW.length; i++) WBins.push(new Bin(T.paint, true));
    addHull(V, HB);
    addRunning(V, HB, WBins);
    var hull = new THREE.Group(); hull.name = "hull";
    flush(THREE, hull, HB);
    g.add(hull);
    for (i = 0; i < XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { paint: WBins[i] });
      g.add(wg);
    }
    TB.paint.o = [TX, 0, TZ];
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, TZ);
    flush(THREE, tg, TB);
    g.add(tg);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e00_lighttank"] = { len: 9.77, build: function (THREE, M, C) { return HeroSprut.build(THREE, M, C, "e00"); } };
UNIT_MODELS["lt_p"] = { len: 9.77, build: function (THREE, M, C) { return HeroSprut.build(THREE, M, C, "e20"); } };
