/* ===== us_prophet.js - HERO model: AN/MLQ-44 Prophet Enhanced on the Oshkosh M-ATV ==============
   Full-quality redo (owner 2026-10-24, the US ground set).  One key, kept:
     ewv_n  "Prophet EW", full "AN/MLQ-44 Prophet" (rules.js, from e00, covering e00 and e20;
            turret:true, tturn 0.9, NOT deploy:true, no weapons).
   Build name kept: HeroProphet.build, read by nothing else.

   WHAT THE SOURCES SAY (kept from the old header, re-checked):
   - AN/MLQ-44 is the Prophet Enhanced (PE).  The Army's PM EW&C page lists the PE and its upgrade path
     (AN/MLQ-44A to 44B, then the ESP AN/MLQ-44E(V)1), "fielded on a variety of ground vehicles" (General
     Dynamics).  Deagel says the PE was first integrated on the Medium Mine Protected Vehicle (2009).  The
     older AN/MLQ-40(V)3 Prophet Block I rode a HMMWV: a different designation, so no Humvee is drawn.
   - BOTH dated photographs of the system show it on the Oshkosh M-ATV (M1240 with the OGPK turret), so the
     M-ATV is drawn, as the row's name and the old file say.
   References (fetched for this redo at width 960; cached in the scratchpad q_prophet_ref; nothing copied):
     [P1] Commons "Prophet system on M-ATV.jpg" (US Army, Capt. Kevin Sandell, Fort Hood, 1 Sept 2015, PD):
          front-right three-quarter, close.  The M-ATV body, the doors, steps, mirrors, the open rear bay
          with its frame and side rail, the OGPK; the 2015 antenna fit (a white mast tube with a small dish).
     [P2] DVIDS 9468268 "PM EW&C - Prophet Enhanced (PE)" (Brian Cooper, CPE-IEW&S, posted 5 Jan 2026, PD):
          front, slightly right, on the move.  The PE's current head: a white housing at the rear STARBOARD
          corner, a platform ring with small elements, the dark-blue cylindrical radome, a whip, a stub.
     [P3] Commons "M153 CROWS mounted on a U.S. Army M-ATV.jpg" (PEO Soldier, 2011, PD): the front clip,
          three-panel grille, lamps, bumper, TAK-4 coil springs, the tubular step.
     [P4] Commons "M-ATV at checkpoint.jpg" (US Navy for the Army, Afghanistan, March 2011, PD): front and
          REAR of two M-ATVs - the tail, the spare wheel on its carrier, the rear bay walls, the mud flaps.
     [D1] Commons "M-ATV.png" (A. Proietti, 2022, CC BY-SA): side drawing, nose left, with the OGPK - the
          STATION SOURCE.  Scaled by the axles (466 px for the 3.93 m wheelbase, 118.6 px a metre).
     [D2] Commons "M-ATV WOGPK.png" (same author): the same side, cross-check.
   Published: M-ATV 246.8 x 98.1 x 105 in (6.27 x 2.49 x 2.67 m), 395/85R20 tyres (1.18 m), TAK-4
     independent coil-sprung suspension, 4 + 1 gunner (en.wikipedia Oshkosh M-ATV); wheelbase 3.93 m and
     375 mm under the hull (spec-sheet aggregator, kept from the old file; [D1] gives 3.84-3.99).
   Measured off [D1] (z off the tyre at 1.18 m) and checked on [P1][P2]: bumper tip +3.00, grille face
     +2.80, cowl (windscreen foot) +1.25 at 1.90 m, windscreen head +0.70, roof 2.45 m, cab back -1.22,
     tail -2.78 (spare wheel outer face -3.25), door feet 1.24 m, front door +0.78..-0.20, rear door
     -0.24..-1.18; OGPK ring at -0.62, 1.2 m long, walls 0.72 m; off [P2] (scaled on the rear tyre, about
     220 px a metre at the crop): housing from 0.95 m to the platform at 2.72-2.82 m, platform 0.72 m
     across, radome 0.52 m across, top 3.42 m, whip to about 4.0 m.

   PERIOD AND FIT: the row covers e00 and e20 and armour_specs dates it e20.  [P1] (2015) shows an
     earlier antenna fit (white mast tube carrying a small dish, a grey box and whip on the right A-pillar,
     a black case on the roof); [P2] (2026) is the Program Manager's own photograph of the PE, so its head
     is drawn.  [P1] supplies the vehicle (the same M-ATV build) where [P2] cannot show it.  The [P1]-only
     antenna items are not drawn.  No photograph found shows the mast raised, so it is drawn as
     photographed; the row is not deploy:true, so render3d has no pose to swap anyway.

   RECOGNITION LIST (what each rests on; where it is in the code):
     1. Big 395/85R20 tyres with chevron tread on black wheels, far out at the corners, 3.93 m apart, with
        TAK-4 wishbones and coil springs behind them [P1][P3][D1]: tyreGeo, chassis.
     2. The V-hull under the body, dark, its keel 0.40 m up [D1][P3]: chassis.
     3. The front clip: broad bonnet rising to the cowl, the full-width rounded fenders with deep wheel
        openings and black liners [P1][P2][P3]: frontClip.
     4. The face: three mesh grille panels (two wide, one narrow), round headlamps either side, amber
        lamps above and outboard, the deep bumper with the winch and two shackles, the tube guard under it
        [P2][P3]: frontFace.
     5. The armoured cab: lower sides upright, upper sides leaning in, the raked two-pane windscreen,
        four doors with small armour windows and the red egress handles at the B-pillar [P1][D1]: cab.
     6. The big black mirrors on arms at the front of the cab, the work lamps on the roof corners [P1][P2].
     7. The tubular two-rung steps under the doors [P1][P3]: steps.
     8. The open rear bay: low walls, tall corner posts and a top rail, the side rail of horizontal bars
        in the opening, the black flare over the rear wheel [P1][P2][D1]: rearBay.
     9. The tail: the spare wheel on its carrier, lamps, mud flaps [P4][D1][D2]: tail.
    10. The OGPK turret: side walls with two armour windows a side, the two front plates with windows
        either side of the gun slot, open behind; no gun (none in [P1] or [P2]): buildTurret ("turret").
    11. The tall tan tube behind the turret on the right [P1]: cab.
    12. The PE head at the rear starboard corner: tall white housing braced to the bay, the platform ring
        with its small elements, the dark-blue radome, the whip and the outboard stub [P2]: buildMast.
   Paint: desert tan CARC in both dated photographs ([P1] 2015, [P2] 2026).  Sampled [P1] door #aa988b and
     [P2] bonnet #a5998c (flat light), drawn at about 0.93 with the hue of the 686A tan of [P3]: #a2927c.
     Housing #c2bfb6 (white in [P2], #968c89 in its dust), radome #303b58 ([P2] #3c4151).  No markings,
     bumper codes, stencils or numbers ([P1]'s "163RD" and the door stencil are not drawn).

   CORRECTED against the old file: the old body was three boxes and a wedge; it is now lofted from [D1]'s
     stations with the upper sides leaning in as [P2] shows them.  The old radome top stood at 3.1 m; [P2]
     puts it clearly above the OGPK, at about 3.4 m.  The old OGPK was a wedge with two flaps; [P2]'s front
     plates with their windows, the side windows of [P1] and the open back are drawn.  Added from the
     references: the rear bay and its rail, the flares, the spare wheel, the steps, the springs, the
     grille panels and lamps, the intake tube.
   NOT confirmed (drawn as stated): the housing's fore-and-aft depth (0.30 m; both photographs see only its
     face); what is on the platform's far side; the spare wheel on the Prophet carrier (standard on the
     M-ATV [P4][D1][D2], hidden in both Prophet views); the wheelbase (aggregator figure).

   Model space: +X nose, +Y port, +Z up, metres, tyres on z = 0.  Nodes: "turret" (the OGPK on its roof
     ring, origin on the ring centre, front plates toward +X; render3d trains it with rotation.z for the
     row's turret:true), four "roadwheel" groups (axle on local Y).  The mast is hull, as photographed.
   Materials (7): skin (canvas paint, world-mapped UVs), dark, glass, white, blue, team (exactly C.team, a
     roof panel), vc (vertex colours: tyres, lamps, red handles).  14 draw calls (7 baked hull meshes, 4
     wheels, 3 turret), 11,640 triangles (five tyres are 5,100 of them; the Krasukha-4 peer is 12,056).
     Measured 6.31 x 3.27 x 4.00 m (L x W x H): the winch to the spare wheel 6.31 m against the published
     6.27; the width is over the mirrors and the PE stub, the height to the whip.  Colours authored in sRGB
     and left to prepModel() to linearise; vertex colours are linear.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroProphet = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var XF = 1.965, XR = -1.965;          /* axles, 3.93 m apart                            */
  var TR = 0.59, TY = 1.05;             /* tyre radius (395/85R20); half track            */
  var NOSE = 2.80, BUMP = 3.00;         /* grille face; bumper/winch tip                   */
  var XC = 1.25, ZC = 1.90;             /* cowl: the windscreen foot                       */
  var XW = 0.70, ROOF = 2.45;           /* windscreen head; roof                           */
  var XCB = -1.22, XT = -2.78;          /* back of the crew cab; tail of the rear bay      */
  var HW = 1.17, HWR = 0.97;            /* half width at the doors; at the roof edge       */
  var ZB = 1.86, ZS = 0.98, ZD = 1.24;  /* belt line; body sill; door feet                 */
  var ZBED = 1.30;                      /* rear bay floor                                  */
  var GX = -0.62;                       /* OGPK ring centre                                */
  var MX = -2.60, MY = -1.22;           /* the PE housing's axis                           */

  /* linear vertex colours (the vc material) */
  var VC = {
    rub: [0.011, 0.011, 0.012], rim: [0.030, 0.031, 0.033], hub: [0.055, 0.057, 0.060],
    lamp: [0.80, 0.80, 0.74], amber: [0.75, 0.30, 0.03], red: [0.55, 0.03, 0.02], tail: [0.40, 0.02, 0.01]
  };

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ paint */
  /* desert tan CARC with weathering: soft mottling, rain streaks, grime
     specks, road dust on the lowest part of every side (v is height on the
     sides, so the dust band at the bottom of the canvas lands low). */
  var _cv = null;
  function skinCanvas() {
    if (_cv) return _cv;
    var R = rng(44017), W = 256, H = 256, i, g;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#a2927c"; q.fillRect(0, 0, W, H);
    for (i = 0; i < 44; i++) {
      q.fillStyle = (i % 2) ? "rgba(232,218,184,0.09)" : "rgba(92,76,52,0.08)";
      q.fillRect(R() * W, R() * H, 20 + R() * 80, 12 + R() * 50);
    }
    for (i = 0; i < 46; i++) {
      q.fillStyle = (i % 3) ? "rgba(40,34,24,0.07)" : "rgba(196,184,156,0.07)";
      q.fillRect(R() * W, R() * H, 1 + R() * 2, 18 + R() * 60);
    }
    q.fillStyle = "rgba(30,26,18,0.28)";
    for (i = 0; i < 40; i++) q.fillRect(R() * W, R() * H, 2, 2);
    g = q.createLinearGradient(0, H * 0.70, 0, H);
    g.addColorStop(0, "rgba(150,128,96,0)"); g.addColorStop(1, "rgba(150,128,96,0.50)");
    q.fillStyle = g; q.fillRect(0, H * 0.70, W, H * 0.30);
    _cv = cv;
    return cv;
  }
  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  function makeMats(THREE, C) {
    var T = {}, st = null;
    try { st = canvasTex(THREE, skinCanvas()); } catch (e) { st = null; }
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    if (st) T.skin.map = st; else T.skin.color.setHex(0xa2927c);
    T.skin.userData.worldUV = 3.6;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x262622, roughness: 0.80, metalness: 0.20 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2a32, roughness: 0.12, metalness: 0.35 });
    T.white = new THREE.MeshStandardMaterial({ color: 0xc2bfb6, roughness: 0.62, metalness: 0.06 });
    T.blue = new THREE.MeshStandardMaterial({ color: 0x303b58, roughness: 0.45, metalness: 0.05 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.vc = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.90, metalness: 0.04,
                                            vertexColors: true });
    return T;
  }

  /* ------------------------------------------------------- geometry kit */
  function earclip(pts) {
    var n = pts.length, idx = [], i, area = 0, guard = 0, tris = [];
    for (i = 0; i < n; i++) { idx.push(i); area += pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1]; }
    if (area < 0) idx.reverse();
    function cross(a, b, c) { return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); }
    while (idx.length > 3 && guard++ < 4000) {
      var found = false, m = idx.length;
      for (i = 0; i < m; i++) {
        var i0 = idx[(i + m - 1) % m], i1 = idx[i], i2 = idx[(i + 1) % m];
        var a = pts[i0], b = pts[i1], c = pts[i2];
        if (cross(a, b, c) <= 1e-12) continue;
        var ok = true;
        for (var k = 0; k < m; k++) {
          var q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          var p = pts[q];
          if (cross(a, b, p) > 1e-9 && cross(b, c, p) > 1e-9 && cross(c, a, p) > 1e-9) { ok = false; break; }
        }
        if (!ok) continue;
        tris.push([i0, i1, i2]); idx.splice(i, 1); found = true; break;
      }
      if (!found) break;
    }
    if (idx.length === 3) tris.push([idx[0], idx[1], idx[2]]);
    return tris;
  }
  /* flat triangle wound to the given outward normal */
  function addTri(S, a, b, c, n) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz < 1e-14) return;
    if (cx * n[0] + cy * n[1] + cz * n[2] < 0) { var t = b; b = c; c = t; }
    S.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    S.n.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
  }
  /* smooth triangle, winding by the vertex normals */
  function triN(S, a, b, c, na, nb, nc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-18) return;
    if (nx * (na[0] + nb[0] + nc[0]) + ny * (na[1] + nb[1] + nc[1]) + nz * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t;
    }
    S.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    S.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
  }
  function geoFrom(THREE, S) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(S.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(S.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(S.p.length / 3 * 2).fill(0), 2));
    if (S.c) g.setAttribute("color", new THREE.Float32BufferAttribute(S.c, 3));
    return g;
  }
  /* points of a wheel-arch circle from the sill on the front, over the top,
     down to the sill behind (x falling) */
  function arch(cx, cz, r, zs, n) {
    var a = Math.asin(Math.max(-1, Math.min(1, (zs - cz) / r))), out = [], i, th;
    for (i = 0; i <= n; i++) {
      th = a + (Math.PI - 2 * a) * i / n;
      out.push([cx + r * Math.cos(th), cz + r * Math.sin(th)]);
    }
    return out;
  }

  /* ------------------------------------------------------------- Baker */
  /* one merged geometry per material; the vc material carries a colour per
     piece (geo.userData.rgb) unless the piece brings its own colours */
  function Baker(THREE) { this.T = THREE; this.by = []; this.rgb = null; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (mat.vertexColors && !g.attributes.color) {
      var n = g.attributes.position.count, c = new Float32Array(n * 3), k = this.rgb || VC.lamp;
      for (var i = 0; i < n; i++) { c[i * 3] = k[0]; c[i * 3 + 1] = k[1]; c[i * 3 + 2] = k[2]; }
      g.setAttribute("color", new this.T.BufferAttribute(c, 3));
    }
    for (var j = 0; j < this.by.length; j++) if (this.by[j].mat === mat) { this.by[j].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var THREE = this.T, m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.put(mat, new this.T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* the same box both sides: y0..y1 given for the port side */
  Baker.prototype.bbm = function (mat, x0, x1, y0, y1, z0, z1) {
    this.bb(mat, x0, x1, y0, y1, z0, z1);
    this.bb(mat, x0, x1, -y1, -y0, z0, z1);
  };
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 6);
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1)));
    this.add(mat, g);
  };
  Baker.prototype.torus = function (mat, R, r, x, y, z, rx, ry, rz, rs, ts) {
    this.put(mat, new this.T.TorusGeometry(R, r, rs || 5, ts || 16), x, y, z, rx, ry, rz);
  };
  /* extrude an (x, z) polygon across y0..y1, flat shaded */
  Baker.prototype.prism = function (mat, pts0, y0, y1) {
    var pts = [], i, n, S = { p: [], n: [] };
    for (i = 0; i < pts0.length; i++) {
      var q = pts0[i], l = pts[pts.length - 1];
      if (!l || Math.abs(q[0] - l[0]) + Math.abs(q[1] - l[1]) > 1e-6) pts.push(q);
    }
    n = pts.length;
    if (n > 1 && Math.abs(pts[0][0] - pts[n - 1][0]) + Math.abs(pts[0][1] - pts[n - 1][1]) < 1e-6) { pts.pop(); n--; }
    var tris = earclip(pts), area = 0;
    for (i = 0; i < tris.length; i++) {
      var t = tris[i], a = pts[t[0]], b = pts[t[1]], c = pts[t[2]];
      addTri(S, [a[0], y1, a[1]], [b[0], y1, b[1]], [c[0], y1, c[1]], [0, 1, 0]);
      addTri(S, [a[0], y0, a[1]], [b[0], y0, b[1]], [c[0], y0, c[1]], [0, -1, 0]);
    }
    for (i = 0; i < n; i++) area += pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1];
    var sg = area > 0 ? 1 : -1;
    for (i = 0; i < n; i++) {
      var p = pts[i], r = pts[(i + 1) % n];
      var dx = r[0] - p[0], dz = r[1] - p[1], L = Math.sqrt(dx * dx + dz * dz);
      if (L < 1e-9) continue;
      var nn = [sg * dz / L, 0, -sg * dx / L];
      addTri(S, [p[0], y0, p[1]], [r[0], y0, r[1]], [r[0], y1, r[1]], nn);
      addTri(S, [p[0], y0, p[1]], [r[0], y1, r[1]], [p[0], y1, p[1]], nn);
    }
    this.add(mat, geoFrom(this.T, S));
  };
  /* a thin plate on the segment a-b of the (x, z) plane, th thick toward
     "up" or "fwd", spanning y0..y1 */
  Baker.prototype.plate = function (mat, ax, az, bx, bz, th, y0, y1, dir) {
    var dx = bx - ax, dz = bz - az, L = Math.sqrt(dx * dx + dz * dz);
    var nx = dz / L, nz = -dx / L;
    if (dir === "fwd" ? nx < 0 : nz < 0) { nx = -nx; nz = -nz; }
    this.prism(mat, [[ax, az], [bx, bz], [bx + nx * th, bz + nz * th], [ax + nx * th, az + nz * th]], y0, y1);
  };
  /* a convex solid from 8 corners: 0-3 one ring, 4-7 the next, same order */
  var HEXF = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
  Baker.prototype.hex = function (mat, P) {
    var S = { p: [], n: [] }, i, c = [0, 0, 0];
    for (i = 0; i < 8; i++) { c[0] += P[i][0] / 8; c[1] += P[i][1] / 8; c[2] += P[i][2] / 8; }
    for (i = 0; i < 6; i++) {
      var f = HEXF[i], a = P[f[0]], b = P[f[1]], cc = P[f[2]], d = P[f[3]];
      var ux = cc[0] - a[0], uy = cc[1] - a[1], uz = cc[2] - a[2];
      var vx = d[0] - b[0], vy = d[1] - b[1], vz = d[2] - b[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var L = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (L < 1e-12) continue;
      nx /= L; ny /= L; nz /= L;
      var mx = (a[0] + cc[0]) / 2 - c[0], my = (a[1] + cc[1]) / 2 - c[1], mz = (a[2] + cc[2]) / 2 - c[2];
      if (nx * mx + ny * my + nz * mz < 0) { nx = -nx; ny = -ny; nz = -nz; }
      addTri(S, a, b, cc, [nx, ny, nz]); addTri(S, a, cc, d, [nx, ny, nz]);
    }
    this.add(mat, geoFrom(this.T, S));
  };
  /* a loft through rings of [x, y, z] (same count, same winding), fan-capped;
     faces turned outward by the signed volume */
  Baker.prototype.loft = function (mat, Rg) {
    var V = [], F = [], m = Rg.length, n = Rg[0].length, i, j, k, c, b0, f, vol = 0, S = { p: [], n: [] };
    function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(Rg[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (i = 0; i < 2; i++) {
      var ring = Rg[i ? m - 1 : 0], ctr = [0, 0, 0];
      for (j = 0; j < n; j++) { ctr[0] += ring[j][0] / n; ctr[1] += ring[j][1] / n; ctr[2] += ring[j][2] / n; }
      b0 = i ? (m - 1) * n : 0; V.push(ctr); c = V.length - 1;
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push(i ? [c, b0 + j, b0 + k] : [c, b0 + k, b0 + j]); }
    }
    for (i = 0; i < F.length; i++) { f = F[i]; var q = cr(V[f[1]], V[f[2]]); vol += V[f[0]][0] * q[0] + V[f[0]][1] * q[1] + V[f[0]][2] * q[2]; }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var a = V[f[0]], b = vol < 0 ? V[f[2]] : V[f[1]], cc = vol < 0 ? V[f[1]] : V[f[2]];
      var nn = cr([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [cc[0] - a[0], cc[1] - a[1], cc[2] - a[2]]);
      var L = Math.sqrt(nn[0] * nn[0] + nn[1] * nn[1] + nn[2] * nn[2]);
      if (L < 1e-12) continue;
      addTri(S, a, b, cc, [nn[0] / L, nn[1] / L, nn[2] / L]);
    }
    this.add(mat, geoFrom(this.T, S));
  };
  Baker.prototype.flush = function (group, ox, oy, oz) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j, vc = !!e.mat.vertexColors;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      var Cc = vc ? new Float32Array(n * 3) : null;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        if (vc) Cc.set(g.attributes.color.array, o * 3);
        o += c;
      }
      var S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S, ox || 0, oy || 0, oz || 0);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      if (vc) geo.setAttribute("color", new THREE.BufferAttribute(Cc, 3));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };
  /* box projection by each triangle's facing; sides take (along, height), so
     the dust band lands low; the offset keeps the turret's paint in step */
  function worldUV(P, U, S, ox, oy, oz) {
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3] + ox, y = P[o + k * 3 + 1] + oy, z = P[o + k * 3 + 2] + oz, u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = y / S + 0.35; }
        else if (nx >= ny) { u = y / S; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* ------------------------------------------------------------- tyre */
  /* 395/85R20: 1.18 m over the lugs, 0.395 m section.  A carcass of
     revolution about the local Y axle, 16 pairs of chevron blocks (the
     XZL-type tread of [P1][P3]) and, on each face, the black wheel with its
     ring of ten nuts and the raised hub of the tyre-inflation system. */
  function tyreGeo(THREE) {
    var S = { p: [], n: [], c: [] }, N = 28, i, k, sd;
    function col(k3, cnt) { for (var q = 0; q < cnt; q++) S.c.push(k3[0], k3[1], k3[2]); }
    function tri(a, b, c, k3) {
      var l0 = S.p.length;
      var cx = (a[0] + b[0] + c[0]) / 3, cy = (a[1] + b[1] + c[1]) / 3, cz = (a[2] + b[2] + c[2]) / 3;
      addTri(S, a, b, c, outN(a, b, c, [cx, cy, cz]));
      col(k3, (S.p.length - l0) / 3);
    }
    /* outward = away from the axle centre, or away from the mid-plane on
       the flat faces */
    function outN(a, b, c, m) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= L; ny /= L; nz /= L;
      if (nx * m[0] + ny * m[1] + nz * m[2] < 0) { nx = -nx; ny = -ny; nz = -nz; }
      return [nx, ny, nz];
    }
    var half = [[0.300, 0.17], [0.44, 0.2025], [0.53, 0.19], [0.565, 0.15]];
    var prof = half.slice();
    for (i = half.length - 1; i >= 0; i--) prof.push([half[i][0], -half[i][1]]);
    for (k = 0; k < N; k++) {
      var a0 = k * TAU / N, a1 = (k + 1) * TAU / N;
      var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      for (i = 0; i < prof.length - 1; i++) {
        var p = prof[i], q = prof[i + 1];
        var A = [p[0] * c0, p[1], p[0] * s0], B = [p[0] * c1, p[1], p[0] * s1];
        var Cq = [q[0] * c1, q[1], q[0] * s1], D = [q[0] * c0, q[1], q[0] * s0];
        tri(A, B, Cq, VC.rub); tri(A, Cq, D, VC.rub);
      }
    }
    /* chevron blocks: tangential 0.10, across 0.17, 0.05 proud, yawed 24 deg */
    var LN = 16, LR = 0.565, cs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (k = 0; k < LN; k++) {
      for (sd = -1; sd <= 1; sd += 2) {
        var an = (k + (sd > 0 ? 0 : 0.5)) * TAU / LN, ca = Math.cos(an), sa = Math.sin(an);
        var vc = sd * 0.10, phi = sd * 0.42, cp = Math.cos(phi), sp = Math.sin(phi);
        var P = [], lv;
        for (lv = 0; lv < 2; lv++) {
          for (i = 0; i < 4; i++) {
            var du = cs[i][0] * 0.05, dv = cs[i][1] * 0.085;
            var u = du * cp - dv * sp, v = du * sp + dv * cp, rr = LR + (lv ? 0.025 : -0.02);
            P.push([rr * ca - u * sa, vc + v, rr * sa + u * ca]);
          }
        }
        var F = [[4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
        for (i = 0; i < F.length; i++) {
          var f = F[i];
          var m = [(P[f[0]][0] + P[f[2]][0]) / 2, (P[f[0]][1] + P[f[2]][1]) / 2 - vc, (P[f[0]][2] + P[f[2]][2]) / 2];
          var nrm = outN(P[f[0]], P[f[1]], P[f[2]], i === 0 ? [ca, 0, sa] : m);
          var l0 = S.p.length;
          addTri(S, P[f[0]], P[f[1]], P[f[2]], nrm); addTri(S, P[f[0]], P[f[2]], P[f[3]], nrm);
          col(VC.rub, (S.p.length - l0) / 3);
        }
      }
    }
    /* the wheel on each face: a dished disc, ten nuts on their circle, the
       raised CTIS hub */
    var N2 = 20;
    for (sd = -1; sd <= 1; sd += 2) {
      var yd = sd * 0.165, yb = sd * 0.215, ny = [0, sd, 0];
      for (k = 0; k < N2; k++) {
        var b0 = k * TAU / N2, b1 = (k + 1) * TAU / N2;
        var e0 = Math.cos(b0), f0 = Math.sin(b0), e1 = Math.cos(b1), f1 = Math.sin(b1);
        var l1 = S.p.length;
        addTri(S, [0.15 * e0, yd, 0.15 * f0], [0.30 * e0, sd * 0.17, 0.30 * f0], [0.30 * e1, sd * 0.17, 0.30 * f1], ny);
        addTri(S, [0.15 * e0, yd, 0.15 * f0], [0.30 * e1, sd * 0.17, 0.30 * f1], [0.15 * e1, yd, 0.15 * f1], ny);
        addTri(S, [0, yd, 0], [0.15 * e0, yd, 0.15 * f0], [0.15 * e1, yd, 0.15 * f1], ny);
        col(VC.rim, (S.p.length - l1) / 3);
        var l2 = S.p.length;
        triN(S, [0.10 * e0, yd, 0.10 * f0], [0.10 * e1, yd, 0.10 * f1], [0.08 * e1, yb, 0.08 * f1], [e0, 0, f0], [e1, 0, f1], [e1, 0, f1]);
        triN(S, [0.10 * e0, yd, 0.10 * f0], [0.08 * e1, yb, 0.08 * f1], [0.08 * e0, yb, 0.08 * f0], [e0, 0, f0], [e1, 0, f1], [e0, 0, f0]);
        addTri(S, [0, yb, 0], [0.08 * e0, yb, 0.08 * f0], [0.08 * e1, yb, 0.08 * f1], ny);
        col(VC.hub, (S.p.length - l2) / 3);
      }
      for (k = 0; k < 10; k++) {
        var bn = k * TAU / 10, nx0 = 0.20 * Math.cos(bn), nz0 = 0.20 * Math.sin(bn), y0 = sd * 0.168, y1 = sd * 0.19;
        var l3 = S.p.length, d = 0.018;
        addTri(S, [nx0 - d, y1, nz0 - d], [nx0 + d, y1, nz0 - d], [nx0 + d, y1, nz0 + d], ny);
        addTri(S, [nx0 - d, y1, nz0 - d], [nx0 + d, y1, nz0 + d], [nx0 - d, y1, nz0 + d], ny);
        addTri(S, [nx0 - d, y0, nz0 - d], [nx0 - d, y1, nz0 - d], [nx0 - d, y1, nz0 + d], [-1, 0, 0]);
        addTri(S, [nx0 + d, y0, nz0 - d], [nx0 + d, y1, nz0 + d], [nx0 + d, y1, nz0 - d], [1, 0, 0]);
        col(VC.hub, (S.p.length - l3) / 3);
      }
    }
    return geoFrom(THREE, S);
  }

  /* ------------------------------------------------------------ chassis */
  /* the V-hull (keel 0.40 m up, rising at both ends), the TAK-4 wishbones
     and coil springs at each wheel [P3], the wheel hubs, drive shafts */
  function chassis(K, T) {
    var rings = [], st = [[2.55, 0.78], [1.80, 0.42], [-1.60, 0.40], [-2.45, 0.62]], i, s, ax;
    for (i = 0; i < st.length; i++) {
      var x = st[i][0], kz = st[i][1];
      rings.push([[x, -0.88, 1.02], [x, -0.88, kz + 0.42], [x, -0.18, kz], [x, 0.18, kz], [x, 0.88, kz + 0.42], [x, 0.88, 1.02]]);
    }
    K.loft(T.dark, rings);
    var axs = [XF, XR];
    for (i = 0; i < 2; i++) {
      ax = axs[i];
      for (s = -1; s <= 1; s += 2) {
        /* hub carrier on the wheel's inner face */
        K.cyl(T.dark, 0.17, 0.20, 12, ax, s * (TY - 0.30), TR, "y");
        /* lower and upper wishbones from the hull to the carrier */
        K.rod(T.dark, 0.035, [ax + 0.28, s * 0.55, 0.50], [ax, s * (TY - 0.36), TR - 0.12], 5);
        K.rod(T.dark, 0.035, [ax - 0.28, s * 0.55, 0.50], [ax, s * (TY - 0.36), TR - 0.12], 5);
        K.rod(T.dark, 0.03, [ax + 0.22, s * 0.62, 0.92], [ax, s * (TY - 0.36), TR + 0.16], 5);
        K.rod(T.dark, 0.03, [ax - 0.22, s * 0.62, 0.92], [ax, s * (TY - 0.36), TR + 0.16], 5);
        /* the coil spring and its damper, as [P3] shows them, standing by the hull */
        K.cyl(T.dark, 0.10, 0.48, 10, ax - 0.30, s * 0.66, 0.86, "z");
        K.cyl(T.dark, 0.11, 0.03, 10, ax - 0.30, s * 0.66, 0.64, "z");
        K.cyl(T.dark, 0.11, 0.03, 10, ax - 0.30, s * 0.66, 1.08, "z");
        /* half shaft */
        K.rod(T.dark, 0.035, [ax, s * 0.30, TR], [ax, s * (TY - 0.40), TR], 6);
      }
      K.bb(T.dark, ax - 0.25, ax + 0.25, -0.30, 0.30, 0.42, 0.78);
    }
  }

  /* --------------------------------------------------------- front clip */
  /* The bonnet and fenders, lofted through stations measured off [D1] and
     shaped to the front views [P2][P3]: a broad bonnet with a raised centre,
     the full-width fenders rounded down at their outer edges, all rising to
     the cowl.  [d back from the grille face, bonnet crown z, fender crown z,
     half width] */
  var BON = [[0.00, 1.52, 1.47, 1.06], [0.06, 1.57, 1.53, 1.13], [0.40, 1.64, 1.59, 1.19],
             [0.90, 1.75, 1.68, 1.21], [1.30, 1.84, 1.76, 1.20], [1.55, 1.90, 1.82, 1.18]];
  var ZCL = 1.34;                    /* clip underside over the front tyres */
  var RA = 0.70;                     /* front wheel opening radius           */
  function frontClip(K, T) {
    var i, s, Rg = [];
    for (i = 0; i < BON.length; i++) {
      var b = BON[i], x = NOSE - b[0], zh = b[1], zf = b[2], hw = b[3];
      Rg.push([[x, -hw, ZCL], [x, -hw, zf - 0.14], [x, -hw + 0.07, zf - 0.035], [x, -hw + 0.22, zf],
               [x, -0.66, zf - 0.02], [x, -0.56, zh - 0.05], [x, -0.36, zh], [x, 0.36, zh], [x, 0.56, zh - 0.05], [x, 0.66, zf - 0.02],
               [x, hw - 0.22, zf], [x, hw - 0.07, zf - 0.035], [x, hw, zf - 0.14], [x, hw, ZCL]]);
    }
    K.loft(T.skin, Rg);
    /* the two pressed ridges on the bonnet [P2] */
    function zAt(d) {
      for (var j = 1; j < BON.length; j++) if (d <= BON[j][0]) {
        var t = (d - BON[j - 1][0]) / (BON[j][0] - BON[j - 1][0]);
        return BON[j - 1][1] + (BON[j][1] - BON[j - 1][1]) * t;
      }
      return BON[BON.length - 1][1];
    }
    for (s = -1; s <= 1; s += 2) {
      K.rod(T.skin, 0.018, [NOSE - 0.10, s * 0.34, zAt(0.10) - 0.005], [NOSE - 1.45, s * 0.34, zAt(1.45) - 0.005], 5);
    }
    /* fender skirts with the deep round wheel opening; the trailing edge runs
       down to the step [P1] */
    var a = arch(XF, TR, RA, 0.95, 12), pts = [[NOSE, ZCL], [NOSE, 0.95]];
    for (i = 0; i < a.length; i++) pts.push(a[i]);
    pts.push([XC - 0.06, 0.95], [XC - 0.06, ZCL]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.19;
      K.prism(T.skin, pts, s > 0 ? yo - 0.05 : yo, s > 0 ? yo : yo + 0.05);
      /* the thick rolled edge round the opening */
      for (i = 0; i < a.length - 1; i++)
        K.rod(T.skin, 0.035, [a[i][0], yo, a[i][1]], [a[i + 1][0], yo, a[i + 1][1]], 5);
      /* the black wheel-well liner seen through the opening */
      K.bb(T.dark, XF - RA, XF + RA, s * 0.66, s * 1.14, 0.95, ZCL);
    }
  }

  /* ---------------------------------------------------------- the face */
  /* [P2][P3]: the face block between the fenders, three mesh panels (two
     wide, one narrow) under the bonnet edge, the round headlamps, the amber
     lamps above and outboard, the deep bumper with the winch and two
     shackles, the tube guard under it */
  function frontFace(K, T) {
    var s, i;
    K.bb(T.skin, NOSE - 0.30, NOSE, -1.06, 1.06, 0.95, ZCL + 0.02);
    var pan = [[-0.62, -0.17], [-0.12, 0.12], [0.17, 0.62]];
    for (i = 0; i < 3; i++) {
      K.bb(T.dark, NOSE - 0.02, NOSE + 0.012, pan[i][0], pan[i][1], 1.10, 1.46);
      /* the mesh frame: a tan rim proud of the black mesh */
      K.bb(T.skin, NOSE + 0.012, NOSE + 0.03, pan[i][0] - 0.03, pan[i][1] + 0.03, 1.07, 1.10);
      K.bb(T.skin, NOSE + 0.012, NOSE + 0.03, pan[i][0] - 0.03, pan[i][1] + 0.03, 1.46, 1.49);
    }
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.11, 0.04, 16, NOSE + 0.01, s * 0.82, 1.28, "x");
      K.rgb = VC.lamp; K.cyl(T.vc, 0.085, 0.045, 16, NOSE + 0.015, s * 0.82, 1.28, "x");
      K.rgb = VC.amber; K.bb(T.vc, NOSE, NOSE + 0.02, s * 0.94, s * 1.04, 1.38, 1.46);
    }
    K.rgb = null;
    /* bumper: a deep beam full width, ends turned back */
    K.bb(T.skin, NOSE, BUMP - 0.06, -1.13, 1.13, 0.80, 1.08);
    for (s = -1; s <= 1; s += 2) K.bb(T.skin, NOSE - 0.25, NOSE, s * 0.95, s * 1.13, 0.80, 1.08);
    /* the winch in its recess, the shackles either side */
    K.bb(T.dark, BUMP - 0.10, BUMP, -0.32, 0.32, 0.84, 1.02);
    K.cyl(T.dark, 0.07, 0.50, 10, BUMP - 0.05, 0, 0.93, "y");
    for (s = -1; s <= 1; s += 2) K.torus(T.dark, 0.05, 0.016, BUMP - 0.04, s * 0.52, 0.86, 0, Math.PI / 2, 0, 5, 12);
    /* the tube guard under the bumper [P2] */
    K.bb(T.dark, NOSE - 0.05, BUMP - 0.10, -0.78, 0.78, 0.60, 0.66);
    for (i = -3; i <= 3; i++) K.bb(T.dark, BUMP - 0.16, BUMP - 0.10, i * 0.22 - 0.02, i * 0.22 + 0.02, 0.60, 0.80);
  }

  /* --------------------------------------------------------- the cab */
  /* Lofted: the lower sides upright to the belt line, the upper sides
     leaning in to the roof [P2]; the windscreen slope from the cowl to the
     roof [D1].  Four doors with small armour windows, the red egress
     handles either side of the B-pillar, the mirrors, the work lamps, the
     tan intake tube behind the turret [P1]. */
  function yUp(z) { return HW - (HW - HWR) * (z - ZB) / (ROOF - ZB); }
  function cab(K, T) {
    var s, i, rings = [];
    /* the top corners lie on the leaning side's plane, so that face stays flat */
    function ring(x, zt) { var w = yUp(zt); return [[x, -HW, ZS], [x, HW, ZS], [x, HW, ZB], [x, w, zt], [x, -w, zt], [x, -HW, ZB]]; }
    rings.push(ring(XC, ZC), ring(XW, ROOF), ring(XCB, ROOF));
    K.loft(T.skin, rings);
    /* the windscreen: two panes on the slope, the centre post, the heavy frame */
    var dx = XW - XC, dz = ROOF - ZC, L = Math.sqrt(dx * dx + dz * dz), ux = dx / L, uz = dz / L;
    var nx = uz, nz = -ux; if (nz < 0) { nx = -nx; nz = -nz; }
    var a0 = [XC + ux * 0.10, ZC + uz * 0.10], a1 = [XC + ux * (L - 0.08), ZC + uz * (L - 0.08)];
    K.plate(T.glass, a0[0] + nx * 0.02, a0[1] + nz * 0.02, a1[0] + nx * 0.02, a1[1] + nz * 0.02, 0.015, 0.05, HWR - 0.10, "up");
    K.plate(T.glass, a0[0] + nx * 0.02, a0[1] + nz * 0.02, a1[0] + nx * 0.02, a1[1] + nz * 0.02, 0.015, -(HWR - 0.10), -0.05, "up");
    /* the heavy frame: the two side posts, the centre post, head and foot rails */
    for (s = -1; s <= 1; s += 2) K.rod(T.skin, 0.035, [XC + nx * 0.02, s * (HWR - 0.04), ZC + nz * 0.02], [XW + nx * 0.02, s * (HWR - 0.04), ROOF + nz * 0.02], 6);
    K.rod(T.skin, 0.025, [XC + ux * 0.10 + nx * 0.025, 0, ZC + uz * 0.10 + nz * 0.025], [XW - ux * 0.08 + nx * 0.025, 0, ROOF - uz * 0.08 + nz * 0.025], 6);
    K.rod(T.skin, 0.03, [XW + nx * 0.02, -(HWR - 0.04), ROOF - 0.01], [XW + nx * 0.02, HWR - 0.04, ROOF - 0.01], 6);
    /* wipers */
    for (s = -1; s <= 1; s += 2) K.rod(T.dark, 0.008, [a0[0] + nx * 0.045, s * 0.15, a0[1] + nz * 0.045], [a0[0] + ux * 0.40 + nx * 0.045, s * 0.45, a0[1] + uz * 0.40 + nz * 0.045], 4);
    /* the doors: seams up the upright side and on up the leaning side */
    var seams = [0.84, -0.20, -0.24, -1.18];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < seams.length; i++) {
        var xs = seams[i];
        K.bb(T.dark, xs - 0.008, xs + 0.008, s * HW, s * (HW + 0.008), ZD, ZB);
        var xt = i === 0 ? 0.70 : xs;        /* the front door's edge leans back under the slope [D1] */
        K.rod(T.dark, 0.008, [xs, s * (HW + 0.002), ZB], [xt, s * (yUp(ROOF - 0.05) + 0.002), ROOF - 0.05], 4);
      }
      /* door feet, with the cut rear-lower corners of [D1] */
      K.bb(T.dark, -0.20, 0.80, s * HW, s * (HW + 0.008), ZD, ZD + 0.016);
      K.bb(T.dark, -1.18, -0.24, s * HW, s * (HW + 0.008), ZD, ZD + 0.016);
      K.rod(T.dark, 0.008, [-0.05, s * (HW + 0.004), ZD], [-0.20, s * (HW + 0.004), ZD + 0.15], 4);
      K.rod(T.dark, 0.008, [-1.03, s * (HW + 0.004), ZD], [-1.18, s * (HW + 0.004), ZD + 0.15], 4);
      /* the sill band under the doors: a raised strip */
      K.bb(T.skin, -1.22, XC - 0.06, s * HW, s * (HW + 0.025), ZS, ZS + 0.08);
      /* hinges: three a door at the front edge [P1] */
      for (i = 0; i < 2; i++) {
        K.bb(T.dark, 0.70, 0.80, s * HW, s * (HW + 0.03), 1.36 + i * 0.36, 1.44 + i * 0.36);
        K.bb(T.dark, -0.34, -0.24, s * HW, s * (HW + 0.03), 1.36 + i * 0.36, 1.44 + i * 0.36);
      }
      /* armour windows on the leaning side: the front door's with its cut
         lower-front corner, the rear door's smaller [D1][P1] */
      winOnSlope(K, T, s, [[0.60, 1.98], [0.44, 2.30], [0.02, 2.30], [0.02, 1.98]]);
      winOnSlope(K, T, s, [[-0.42, 2.04], [-0.42, 2.30], [-0.86, 2.30], [-0.86, 2.04]]);
      /* the red egress handles either side of the B-pillar [P1] */
      K.rgb = VC.red;
      K.bb(T.vc, -0.12, -0.04, s * HW, s * (HW + 0.04), 1.60, 1.68);
      K.bb(T.vc, -0.40, -0.32, s * HW, s * (HW + 0.04), 1.60, 1.68);
      K.rgb = null;
      /* mirrors: the arm out of the A-pillar, the tall head, the small
         convex glass under it [P1][P2] */
      K.rod(T.dark, 0.018, [0.92, s * (HW - 0.02), 2.02], [0.98, s * (HW + 0.22), 2.06], 5);
      K.rod(T.dark, 0.014, [0.80, s * (HW - 0.01), 1.62], [0.98, s * (HW + 0.22), 1.86], 5);
      K.bb(T.dark, 0.95, 1.01, s * (HW + 0.17), s * (HW + 0.34), 1.78, 2.20);
      K.bb(T.dark, 0.95, 1.01, s * (HW + 0.18), s * (HW + 0.30), 1.62, 1.76);
      /* the work lamp on its post at the front corner of the roof [P2] */
      K.cyl(T.dark, 0.02, 0.14, 6, XW - 0.06, s * (HWR - 0.08), ROOF + 0.07, "z");
      K.bb(T.dark, XW - 0.12, XW + 0.02, s * (HWR - 0.16), s * (HWR - 0.00), ROOF + 0.14, ROOF + 0.24);
    }
    /* the roof: the turret ring, the team panel ahead of it */
    K.cyl(T.dark, 0.74, 0.04, 28, GX, 0, ROOF + 0.015, "z");
    K.bb(T.team, 0.12, 0.60, -0.46, 0.46, ROOF, ROOF + 0.013);
    /* the tall tan intake tube behind the turret on the right [P1] */
    K.cyl(T.skin, 0.12, 0.92, 14, -1.06, -0.80, ROOF + 0.46, "z");
    K.cyl(T.dark, 0.125, 0.04, 14, -1.06, -0.80, ROOF + 0.92, "z");
  }
  function winOnSlope(K, T, s, pts) {
    var i, P = [];
    /* a thin glass slab following the leaning upper side; pts are (x, z),
       taken round the outline; split into two quads so it stays convex */
    function at(p, off) { return [p[0], s * (yUp(p[1]) + off), p[1]]; }
    var q = [pts[0], pts[1], pts[2], pts[3]];
    P = [at(q[0], 0.018), at(q[1], 0.018), at(q[2], 0.018), at(q[3], 0.018),
         at(q[0], 0.032), at(q[1], 0.032), at(q[2], 0.032), at(q[3], 0.032)];
    K.hex(T.glass, P);
    /* the black frame round the pane */
    for (i = 0; i < 4; i++) {
      var a = q[i], b = q[(i + 1) % 4];
      K.rod(T.dark, 0.018, at(a, 0.026), at(b, 0.026), 4);
    }
  }

  /* --------------------------------------------------- tubular steps */
  function steps(K, T) {
    for (var s = -1; s <= 1; s += 2) {
      var y = s * (HW + 0.06);
      K.rod(T.dark, 0.024, [0.96, y, 0.60], [-1.08, y, 0.60], 6);
      K.rod(T.dark, 0.022, [0.84, s * (HW + 0.03), 0.82], [-0.96, s * (HW + 0.03), 0.82], 6);
      var xs = [0.96, 0.40, -0.10, -0.60, -1.08];
      for (var i = 0; i < xs.length; i++) {
        K.rod(T.dark, 0.02, [xs[i], y, 0.60], [xs[i] + (i % 2 ? 0.12 : -0.12), s * HW, ZS], 5);
      }
      /* the rungs' tread plates */
      K.bb(T.dark, -1.00, 0.88, y - s * 0.10, y + s * 0.03, 0.585, 0.605);
    }
  }

  /* ----------------------------------------------------- the rear bay */
  /* [P1][D1][P2]: behind the crew cab an open bay - floor, low walls, tall
     corner posts with a top rail at roof height, and in each side opening a
     rail of horizontal bars; the lower body over and behind the rear
     wheels with the black flares */
  function rearBay(K, T) {
    var s, i, rA = 0.68;
    /* the lower body: from the cab back to the tail, cut by the rear wheel */
    var a = arch(XR, TR, rA, 0.98, 12), pts = [[XCB, ZBED], [XCB, 0.98]];
    for (i = 0; i < a.length; i++) pts.push(a[i]);
    pts.push([XT, 0.98], [XT, ZBED]);
    K.prism(T.skin, pts, -HW, HW);
    K.bb(T.dark, XR - rA, XR + rA, -1.10, 1.10, 0.98, ZBED - 0.02);      /* the wheel houses */
    K.bb(T.skin, XT, XCB, -HW, HW, ZBED - 0.02, ZBED + 0.04);              /* the floor        */
    for (s = -1; s <= 1; s += 2) {
      /* low walls, the tall posts, the top rail */
      K.bb(T.skin, XT, XCB, s * (HW - 0.06), s * HW, ZBED, 1.80);
      K.bb(T.skin, XCB - 0.22, XCB, s * (HW - 0.12), s * HW, 1.80, ROOF);
      K.bb(T.skin, XT, XT + 0.20, s * (HW - 0.12), s * HW, 1.80, ROOF);
      K.bb(T.skin, XT, XCB, s * (HW - 0.12), s * HW, ROOF - 0.10, ROOF);
      /* the gussets in the upper corners of the opening [D1] */
      K.prism(T.skin, [[XCB - 0.22, ROOF - 0.10], [XCB - 0.42, ROOF - 0.10], [XCB - 0.22, ROOF - 0.30]],
              s > 0 ? HW - 0.10 : -HW, s > 0 ? HW : -HW + 0.10);
      K.prism(T.skin, [[XT + 0.20, ROOF - 0.10], [XT + 0.40, ROOF - 0.10], [XT + 0.20, ROOF - 0.30]],
              s > 0 ? HW - 0.10 : -HW, s > 0 ? HW : -HW + 0.10);
      /* the rail of bars in the opening [P1][P2] */
      for (i = 0; i < 4; i++) {
        var zr = 1.88 + i * 0.12;
        K.rod(T.skin, 0.018, [XCB - 0.22, s * (HW - 0.03), zr], [XT + 0.20, s * (HW - 0.03), zr], 5);
      }
      for (i = 1; i < 4; i++) {
        var xr = XCB - 0.22 + (XT + 0.20 - (XCB - 0.22)) * i / 4;
        K.rod(T.skin, 0.016, [xr, s * (HW - 0.03), 1.80], [xr, s * (HW - 0.03), 2.24], 5);
      }
      /* the black flare over the rear wheel, a wide band round the opening */
      var fl = arch(XR, TR, rA + 0.04, 1.00, 12), band = [];
      for (i = 0; i < fl.length; i++) band.push(fl[i]);
      var fo = arch(XR, TR, rA + 0.18, 1.00, 12);
      for (i = fo.length - 1; i >= 0; i--) band.push(fo[i]);
      K.prism(T.dark, band, s > 0 ? HW - 0.02 : -HW - 0.08, s > 0 ? HW + 0.08 : -HW + 0.02);
      /* the bay's inner floor-to-cab bulkhead step */
    }
    /* the cross rail at the back of the top */
    K.bb(T.skin, XT, XT + 0.10, -HW, HW, ROOF - 0.10, ROOF);
    /* the cab's back wall face, a darker door into the bay */
    K.bb(T.dark, XCB - 0.01, XCB, -0.40, 0.40, ZBED + 0.10, 2.20);
  }

  /* ------------------------------------------------------------ tail */
  /* [P4][D1][D2]: the tailgate with the spare wheel on its carrier, the
     lamp clusters, the mud flaps, the pintle */
  function tail(K, T, tg) {
    var s;
    K.bb(T.skin, XT - 0.02, XT + 0.04, -HW, HW, 0.98, 1.84);
    K.bb(T.dark, XT - 0.03, XT - 0.02, -0.60, 0.60, 1.00, 1.80);
    K.bb(T.skin, XT - 0.04, XT - 0.03, -0.56, 0.56, 1.04, 1.76);
    /* the spare on its carrier, axle along X */
    K.bb(T.dark, XT - 0.10, XT - 0.02, -0.20, 0.20, 1.20, 1.60);
    var sp = tg.clone();
    sp.applyMatrix4(new K.T.Matrix4().makeRotationZ(Math.PI / 2));
    K.put(T.vc, sp, XT - 0.30, 0.0, 1.42);
    for (s = -1; s <= 1; s += 2) {
      K.rgb = VC.tail; K.bb(T.vc, XT - 0.05, XT - 0.02, s * 0.78, s * 1.02, 1.08, 1.18);
      K.rgb = VC.amber; K.bb(T.vc, XT - 0.05, XT - 0.02, s * 0.78, s * 1.02, 1.20, 1.26);
      K.rgb = null;
      /* mud flaps behind the rear wheels [P4] */
      K.bb(T.dark, XR - 0.84, XR - 0.80, s * 0.78, s * 1.20, 0.30, 0.98);
    }
    K.bb(T.dark, XT - 0.16, XT, -0.10, 0.10, 0.62, 0.74);
    K.torus(T.dark, 0.05, 0.015, XT - 0.20, 0, 0.68, 0, 0, 0, 4, 10);
    K.bb(T.dark, XT - 0.06, XT, -1.00, 1.00, 0.86, 0.98);
  }

  /* -------------------------------------------------- the PE head [P2] */
  /* A tall white housing at the rear starboard corner, braced to the bay;
     on top a flat platform ring with a row of small elements round its
     edge, the dark-blue cylindrical radome on the ring, a whip rising on its
     outboard side and a short stub standing out sideways. */
  function buildMast(K, T) {
    var i, a;
    K.bb(T.white, MX - 0.15, MX + 0.15, MY - 0.10, MY + 0.10, 0.95, 2.72);
    /* its brackets to the bay's rear post and top rail */
    K.bb(T.dark, MX - 0.06, MX + 0.06, MY + 0.10, -HW + 0.06, 1.62, 1.70);
    K.bb(T.dark, MX - 0.06, MX + 0.06, MY + 0.10, -HW + 0.06, 2.30, 2.38);
    /* the platform: a white plate, a dark ring band with its elements */
    K.cyl(T.white, 0.36, 0.04, 24, MX, MY, 2.74, "z");
    K.cyl(T.dark, 0.34, 0.07, 24, MX, MY, 2.795, "z");
    for (i = 0; i < 10; i++) {
      a = (i + 0.5) * TAU / 10;
      K.put(T.white, new K.T.BoxGeometry(0.05, 0.09, 0.05), MX + 0.345 * Math.cos(a), MY + 0.345 * Math.sin(a), 2.795, 0, 0, a);
    }
    /* the radome, a touch narrower at the top, its cap */
    K.cyl(T.blue, 0.26, 0.58, 24, MX, MY, 3.12, "z", 0.245);
    K.cyl(T.dark, 0.235, 0.025, 24, MX, MY, 3.42, "z");
    /* the whip on the outboard side, the stub standing out */
    K.cyl(T.dark, 0.03, 0.08, 8, MX - 0.05, MY - 0.30, 2.87, "z");
    K.rod(T.dark, 0.010, [MX - 0.05, MY - 0.30, 2.90], [MX - 0.05, MY - 0.30, 4.00], 5);
    K.rod(T.dark, 0.012, [MX + 0.02, MY - 0.34, 2.79], [MX + 0.02, MY - 0.54, 2.80], 5);
  }

  /* ------------------------------------------------------------- turret */
  /* The OGPK on the roof ring [P1][P2][D1]: a box of armour walls, two
     armour windows in each side, the two front plates standing a little
     taller either side of the gun slot, each with its window, the low back
     wall; open on top and behind; no weapon.  Origin: the ring centre. */
  function buildTurret(THREE, T) {
    var t = new THREE.Group(), K = new Baker(THREE), s;
    t.name = "turret";
    t.position.set(GX, 0, ROOF);
    /* the floor ring and the side walls */
    K.cyl(T.dark, 0.72, 0.05, 28, 0, 0, 0.045, "z");
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -0.62, 0.46, s * 0.70, s * 0.76, 0.02, 0.72);
      K.bb(T.glass, -0.42, -0.12, s * 0.765, s * 0.78, 0.40, 0.62);
      K.bb(T.glass, 0.00, 0.30, s * 0.765, s * 0.78, 0.40, 0.62);
      /* the front plates, each with its window, flanking the slot */
      K.bb(T.skin, 0.46, 0.54, s * 0.09, s * 0.76, 0.02, 0.86);
      K.bb(T.glass, 0.545, 0.56, s * 0.22, s * 0.62, 0.50, 0.78);
      /* the top lip of each plate, bent back */
      K.bb(T.skin, 0.36, 0.54, s * 0.09, s * 0.76, 0.86, 0.90);
      /* the corner bevel between side and front */
      K.hex(T.skin, [[0.40, s * 0.76, 0.02], [0.54, s * 0.76, 0.02], [0.50, s * 0.79, 0.02], [0.40, s * 0.79, 0.02],
                     [0.40, s * 0.76, 0.86], [0.54, s * 0.76, 0.86], [0.50, s * 0.79, 0.86], [0.40, s * 0.79, 0.86]]);
    }
    /* the lower plate under the gun slot, the empty mount behind it */
    K.bb(T.skin, 0.46, 0.54, -0.09, 0.09, 0.02, 0.36);
    K.cyl(T.dark, 0.04, 0.30, 8, 0.24, 0, 0.20, "z");
    K.bb(T.dark, 0.18, 0.34, -0.06, 0.06, 0.34, 0.40);
    /* the low back wall */
    K.bb(T.skin, -0.68, -0.62, -0.76, 0.76, 0.02, 0.40);
    K.flush(t, GX, 0, ROOF);
    return t;
  }

  /* ========================================================== ASSEMBLY */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "prophet_matv";
    var K = new Baker(THREE), tg = tyreGeo(THREE), i, s;
    chassis(K, T);
    frontClip(K, T);
    frontFace(K, T);
    cab(K, T);
    steps(K, T);
    rearBay(K, T);
    tail(K, T, tg);
    buildMast(K, T);
    K.flush(g, 0, 0, 0);
    g.add(buildTurret(THREE, T));
    var xs = [XF, XR];
    for (i = 0; i < 2; i++) {
      for (s = -1; s <= 1; s += 2) {
        var w = new THREE.Group();
        w.name = "roadwheel";
        w.position.set(xs[i], s * TY, TR);
        w.add(new THREE.Mesh(tg, T.vc));
        g.add(w);
      }
    }
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent, the winch at the bumper to the spare wheel's
   outer face; render3d.js normalises on the measurement.  Heroes load after
   the parametric layers, so this replaces the Stryker-hull Prophet in
   units3d_ew.js. */
UNIT_MODELS["ewv_n"] = { len: 6.31, build: HeroProphet.build };
