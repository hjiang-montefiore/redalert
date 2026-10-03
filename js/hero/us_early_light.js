/* ===== us_early_light.js - HERO models: three early US Army light vehicles ====
   The 1943-1960s end of the Army's light fleet, one builder:
     nato_e50_ifv    M59 Armored Personnel Carrier (FMC, 1954): the tall
                     welded steel box on five road wheels (twin petrol
                     engines), the commander's cupola with its .50 M2HB on
                     the front right of the roof
     nato_e50_recon  M8 Greyhound 6x6 armoured car (Ford, 1943): low sloped
                     nose, open-topped turret with the 37 mm M6 and a coaxial
                     .30, the ring mount for the .50 M2HB, stowage bins over
                     the rear wheels, engine deck at the tail
     nato_e60_recon  M151A1 MUTT quarter-ton truck (Ford, 1964): flat bonnet
                     with a horizontal-slat grille, open body, spare wheel on
                     the tail, 7.00-16 tyres on a 2.16 m wheelbase

   Reference (Wikimedia Commons photographs and the Wikipedia infoboxes).
   M59: "M59 (APC) 3.JPG", a front three-quarter view of a preserved M59
   (lower front plate, steep glacis, the lamp pods on the upper front
   corners, driver's hatch and cupola on the roof) and "M59 APC
   D-cisive.JPG", a side view in a German museum (five road wheels, raised
   idler and front sprocket, three return rollers, the .50 on the cupola).
   Figures from the infobox: 220.9 x 128.3 x 109 in = 5.61 x 3.26 x 2.77 m,
   2 + 10 men, two GMC 302 petrol engines.  The side view gave the stations:
   equal wheel spacing, the sprocket one station ahead of the first wheel,
   the idler about 0.7 behind the last.
   M8: "M8-Greyhound-parade-19480407.jpg" (front three-quarter: sloped nose,
   tow shackles on the lower nose plate, ribbed bins, low turret) and
   "M8 armored car side view.jpg" (a port side view: axles at 0.16 / 0.59 /
   0.86 of the length from the nose, deck about 1.4 m above the ground, the
   nose tip about 0.95 m up, turret plates to about 2.0 m, the ring mount
   hoop about 2.25 m, the whip foot behind the turret).  Published figures
   disagree: the English infobox quotes TM 9-743 as 15 ft 5 in x 7 ft 7 in x
   6 ft 3 in (4.70 x 2.31 x 1.91 m, the height to the turret top), German
   Wikipedia gives 5.00 x 2.54 x 2.64 m, and 2.25 m is the usual height to
   the ring mount.  Drawn: 5.03 long, 2.57 wide (bins), plates to 1.94 m, hoop
   2.24 m, the .50 to 2.58 m; the whip (3.2 m) is not part of any of them.
   M151: "JeepRightTopDownM151.jpg" (a right side view with the canvas top:
   wheel stations, bonnet about 1.05 m, spare standing against the tail, whip
   on the front right fender) and "82d Airborne jeep Urgent Fury 1983.JPEG"
   (a front view of a later, A2-fit truck: round lamps at the fender
   corners).  The Wikipedia article gives the grille as horizontal slats (the
   Jeep seven-slot grille was not used), 132.7 in long (3.37 m), 64.3 in wide
   (1.63 m) and an 85 in wheelbase; the M151A1 had small turn signals on flat
   front fenders (the A2 has the large combination lamps).  The tyres are
   drawn 0.76 m across; the track (1.38 m) is set so that the width over the
   hubs is the published 1.63 m.

   The M151's weapon.  The row names an M60 and turret:true.  A Commons
   photograph, "Gun jeep secures landing zone, Operation Junction City,
   April 1967" (description: a 1/4 ton jeep of Troop F, 17th Cavalry
   Regiment, mounting an M-60 machine gun; categories M60 in US Army service
   and Ford M151 MUTT in the Vietnam War), shows the gun on a tall single
   post standing in the cargo area behind the front seats, the spare wheel on
   the tail and a tall whip: that is what is drawn (a plain post with a
   swivel head; the gun axis about 1.4 m).  The Wikipedia M151 article
   documents pedestal mounts only for the M151A1C (106 mm) and the A2 FAV
   post, so the post's own design, and that the truck in the photograph is an
   A1 rather than the plain M151, are not confirmed; DRAW_M151_MG switches
   the whole weapon off (the "turret" node then stays as an empty group).
   Also not confirmed: which side the M151's spare wheel hangs on (drawn on
   the port half of the tail), the M8's whip side (port), and any M8 or M59
   roof, rear-door or interior detail not seen in the photographs (the M59's
   roof hatches and rear door are not drawn).
   Not drawn on purpose: crews, canvas tops, the M59 trim vane named in the
   old parametric row (no photograph showed one), a bumper bar or a rear
   pintle on the M8 (no photograph shows either), unit markings.

   Meshes.  Everything fixed is baked, one merged mesh per material; each
   axle of road wheels is one "roadwheel" group (both sides, axle on local Y,
   one mesh); the M59 has five, the M8 three, the M151 two.  The weapon is the
   named "turret" (origin on the ring or post centre, gun along +X, one mesh
   per material).  At most 13 draw calls and 7 materials.  The team material
   is exactly C.team, on top-facing panels, so an era stand-in repaints the
   rest and leaves it alone.

   Model space: +X nose, +Y left, +Z up, metres, wheels and tracks on z = 0.
   Nothing but the bodies reaches the ends (the M59 gun and the M8 gun stop
   inside the nose line).  Colours are authored in sRGB and left to
   prepModel() to linearise.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEarlyLight = (function () {
  "use strict";
  var PI = Math.PI;

  /* see the header: the M60 is the row's weapon, its pedestal is unconfirmed */
  var DRAW_M151_MG = true;

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* --------------------------------------------------------------- paint */
  /* Olive drab, three slightly different batches, cached per kind: build()
     runs once per key, team and era.  Mapped by world position (4.6 m to the
     canvas), with road dust on the lowest metre. */
  var BASE = { m59: "#55604a", m8: "#4b5037", m151: "#4e5535" };
  var FB = { m59: 0x55604a, m8: 0x4b5037, m151: 0x4e5535 };
  var SEED = { m59: 5901, m8: 8801, m151: 15101 };
  var _cv = {};
  function paint(kind) {
    if (_cv[kind]) return _cv[kind];
    var R = rng(SEED[kind]), W = 256, H = 256, i, gr;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = BASE[kind]; q.fillRect(0, 0, W, H);
    for (i = 0; i < 30; i++) {
      q.fillStyle = (i % 2) ? "rgba(150,160,120,0.07)" : "rgba(20,24,12,0.10)";
      q.fillRect(R() * W, R() * H, 18 + R() * 70, 10 + R() * 40);
    }
    q.fillStyle = "rgba(24,22,14,0.22)";
    for (i = 0; i < 36; i++) q.fillRect(R() * W, R() * H * 0.8, 5 + R() * 24, 1 + R() * 2);
    q.fillStyle = "rgba(14,14,10,0.35)";
    for (i = 0; i < 40; i++) q.fillRect(R() * W, R() * H, 2, 2);
    gr = q.createLinearGradient(0, H * 0.74, 0, H);
    gr.addColorStop(0, "rgba(130,114,84,0.00)");
    gr.addColorStop(1, "rgba(130,114,84,0.46)");
    q.fillStyle = gr; q.fillRect(0, H * 0.74, W, H * 0.26);
    _cv[kind] = cv;
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

  /* ----------------------------------------------------------- materials */
  /* skin (painted steel), dark (black steel, seats' frames, guns), rub (tyres
     and road wheels), glass, team, lamp, track (rusty steel).  Seven. */
  function mats(THREE, C, kind) {
    var T = {};
    var st = canvasTex(THREE, paint(kind));
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (st) T.skin.map = st; else T.skin.color.setHex(FB[kind]);
    T.skin.userData.worldUV = 4.6;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25271f, roughness: 0.8, metalness: 0.22 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1a1a18, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.12, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xcfc9ac, roughness: 0.3, metalness: 0.1,
                                              emissive: 0x2a2814, emissiveIntensity: 0.7 });
    T.track = new THREE.MeshStandardMaterial({ color: 0x3b3128, roughness: 0.85, metalness: 0.3 });
    return T;
  }

  /* ------------------------------------------------------------ geometry */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function nrm(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* Ear clipping for the side profiles; returns CCW index triples in (x, z) */
  function earclip(pts) {
    var n = pts.length, idx = [], i, area = 0, guard = 0, tris = [];
    for (i = 0; i < n; i++) { idx.push(i); area += pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1]; }
    if (area < 0) idx.reverse();
    function crs(a, b, c) { return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); }
    while (idx.length > 3 && guard++ < 4000) {
      var found = false, m = idx.length;
      for (i = 0; i < m; i++) {
        var i0 = idx[(i + m - 1) % m], i1 = idx[i], i2 = idx[(i + 1) % m];
        var a = pts[i0], b = pts[i1], c = pts[i2];
        if (crs(a, b, c) <= 1e-12) continue;
        var ok = true;
        for (var k = 0; k < m; k++) {
          var q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          var p = pts[q];
          if (crs(a, b, p) > 1e-9 && crs(b, c, p) > 1e-9 && crs(c, a, p) > 1e-9) { ok = false; break; }
        }
        if (!ok) continue;
        tris.push([i0, i1, i2]); idx.splice(i, 1); found = true; break;
      }
      if (!found) break;
    }
    if (idx.length === 3) tris.push([idx[0], idx[1], idx[2]]);
    return tris;
  }
  /* a flat triangle with the given outward normal (winding follows it) */
  function addTri(S, a, b, c, n) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz < 1e-14) return;
    if (cx * n[0] + cy * n[1] + cz * n[2] < 0) { var t = b; b = c; c = t; }
    S.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    S.n.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
  }
  /* smooth triangle: winding follows the supplied vertex normals */
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
    return g;
  }
  /* points of a wheel-arch circle from its left end, over the top, down to
     the right end; where the circle would pass xmax (a nose or tail edge) it
     stops on that edge, so the outline never doubles back on itself */
  function archPts(cx, cz, r, n, xmax) {
    var out = [], i, th, x;
    for (i = 0; i <= n; i++) {
      th = PI - PI * i / n;
      x = cx + r * Math.cos(th);
      if (x > xmax) { out.push([xmax, cz + Math.sqrt(r * r - (xmax - cx) * (xmax - cx))]); break; }
      out.push([x, cz + r * Math.sin(th)]);
    }
    return out;
  }

  /* --------------------------------------------------------------- baker */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
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
  /* the same box on both sides: y0..y1 given for the left, mirrored right */
  Baker.prototype.bbm = function (mat, x0, x1, y0, y1, z0, z1) {
    this.bb(mat, x0, x1, y0, y1, z0, z1);
    this.bb(mat, x0, x1, -y1, -y0, z0, z1);
  };
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 6);
    var m = new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    this.add(mat, g);
  };
  Baker.prototype.torus = function (mat, R, r, x, y, z, rs, ts, rx, ry, rz) {
    this.put(mat, new this.T.TorusGeometry(R, r, rs || 5, ts || 20), x, y, z, rx, ry, rz);
  };
  /* extrude an (x, z) polygon across y0..y1: flat shaded, outward normals */
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
  /* a belt of thickness th along the segment a-b of the (x, z) plane */
  Baker.prototype.belt = function (mat, a, b, th, y0, y1) {
    var dx = b[0] - a[0], dz = b[1] - a[1], L = Math.sqrt(dx * dx + dz * dz);
    var nx = -dz / L * th / 2, nz = dx / L * th / 2;
    this.prism(mat, [[a[0] - nx, a[1] - nz], [b[0] - nx, b[1] - nz], [b[0] + nx, b[1] + nz], [a[0] + nx, a[1] + nz]], y0, y1);
  };
  /* a hexahedron from eight corners (bottom quad 0-3, top quad 4-7 above
     it): each face is wound outward from the centroid */
  Baker.prototype.hexa = function (mat, P) {
    var S = { p: [], n: [] }, c = [0, 0, 0], i, f;
    for (i = 0; i < 8; i++) { c[0] += P[i][0] / 8; c[1] += P[i][1] / 8; c[2] += P[i][2] / 8; }
    var F = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
    for (f = 0; f < 6; f++) {
      var q = F[f], a = P[q[0]], b = P[q[1]], d = P[q[2]], e = P[q[3]];
      var n = nrm(cross(sub(b, a), sub(d, a)));
      var fc = [(a[0] + b[0] + d[0] + e[0]) / 4, (a[1] + b[1] + d[1] + e[1]) / 4, (a[2] + b[2] + d[2] + e[2]) / 4];
      if (dot(n, sub(fc, c)) < 0) n = [-n[0], -n[1], -n[2]];
      addTri(S, a, b, d, n); addTri(S, a, d, e, n);
    }
    this.add(mat, geoFrom(this.T, S));
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };
  /* box projection by each triangle's own facing; sides take (along, height) */
  function worldUV(P, U, S) {
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = y / S + 0.3; }
        else if (nx >= ny) { u = y / S; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* ------------------------------------------------------------ the tyre */
  /* A lathe about the local Y axle (bead, bulging sidewall, shoulder, flat
     crown), a plain disc closing the hub, and lugs standing on the crown
     (none on the M59's smooth road wheels), so a turning wheel shows. */
  function tyreGeo(THREE, R, W, seg, lugs, lugH) {
    var S = { p: [], n: [] }, h = W / 2, rc = R - (lugH || 0), i, j;
    var prof = [[0.50 * R, -0.62 * h], [0.60 * R, -0.96 * h], [0.82 * R, -h], [0.94 * R, -0.80 * h], [rc, -0.62 * h],
                [rc, 0.62 * h], [0.94 * R, 0.80 * h], [0.82 * R, h], [0.60 * R, 0.96 * h], [0.50 * R, 0.62 * h]];
    for (i = 0; i < prof.length - 1; i++) {
      var r0 = prof[i][0], y0 = prof[i][1], r1 = prof[i + 1][0], y1 = prof[i + 1][1];
      var dr = r1 - r0, dy = y1 - y0, l = Math.sqrt(dr * dr + dy * dy), nr = dy / l, ny = -dr / l;
      for (j = 0; j < seg; j++) {
        var a0 = j / seg * PI * 2, a1 = (j + 1) / seg * PI * 2;
        var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
        var A = [r0 * c0, y0, r0 * s0], B = [r0 * c1, y0, r0 * s1];
        var Cc = [r1 * c1, y1, r1 * s1], D = [r1 * c0, y1, r1 * s0];
        var nA = [nr * c0, ny, nr * s0], nB = [nr * c1, ny, nr * s1];
        triN(S, A, B, Cc, nA, nB, nB);
        triN(S, A, Cc, D, nA, nB, nA);
      }
    }
    var parts = [geoFrom(THREE, S), new THREE.CylinderGeometry(0.52 * R, 0.52 * R, 1.24 * h, 12).toNonIndexed()];
    for (j = 0; j < (lugs || 0); j++) {
      var a = (j + 0.5) / lugs * PI * 2, g = new THREE.BoxGeometry(lugH * 1.4, 0.74 * W, PI * 2 * rc / lugs * 0.42);
      var m = new THREE.Matrix4().compose(
        new THREE.Vector3(Math.cos(a) * (rc + lugH * 0.2), 0, Math.sin(a) * (rc + lugH * 0.2)),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -a, 0)),
        new THREE.Vector3(1, 1, 1));
      g.applyMatrix4(m);
      parts.push(g.toNonIndexed());
    }
    var n = 0, o = 0, k;
    for (k = 0; k < parts.length; k++) n += parts[k].attributes.position.count;
    var P = new Float32Array(n * 3), N = new Float32Array(n * 3);
    for (k = 0; k < parts.length; k++) {
      P.set(parts[k].attributes.position.array, o * 3);
      N.set(parts[k].attributes.normal.array, o * 3);
      o += parts[k].attributes.position.count;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
    return geo;
  }
  /* one axle's road wheels as a "roadwheel" group: both sides, one mesh,
     origin on the axle centre so the engine spins them about Y */
  function wheelPair(THREE, T, tg, x, z, yc, nut) {
    var wg = new THREE.Group(), Kw = new Baker(THREE), s;
    wg.name = "roadwheel";
    wg.position.set(x, 0, z);
    for (s = -1; s <= 1; s += 2) {
      Kw.put(T.rub, tg.clone(), 0, s * yc, 0);
      Kw.cyl(T.rub, nut, 0.05, 10, 0, s * (yc + 0.10), 0);
    }
    Kw.flush(wg);
    return wg;
  }

  /* --------------------------------------------------- the M2 .50 cal */
  /* Browning M2HB, receiver centred on (x0, 0, z0), barrel along +X: 1.65 m
     overall, receiver and back plate 0.47, barrel 1.0 as drawn.  Ammunition
     can on the left, as it is fed from the left. */
  function m2(K, T, x0, z0) {
    var d = T.dark;
    K.bb(d, x0 - 0.20, x0 + 0.20, -0.055, 0.055, z0 - 0.07, z0 + 0.075);      /* receiver */
    K.bb(d, x0 - 0.06, x0 + 0.14, -0.045, 0.045, z0 + 0.075, z0 + 0.105);     /* feed cover */
    K.bb(d, x0 - 0.27, x0 - 0.20, -0.05, 0.05, z0 - 0.05, z0 + 0.055);       /* back plate */
    K.bb(d, x0 - 0.31, x0 - 0.27, -0.10, 0.10, z0 - 0.06, z0 - 0.045);       /* spade grips */
    K.cyl(d, 0.027, 0.16, 8, x0 + 0.28, 0, z0 + 0.01, "x");                  /* barrel sleeve */
    K.cyl(d, 0.0155, 1.0, 8, x0 + 0.70, 0, z0 + 0.01, "x");                  /* barrel */
    K.cyl(d, 0.024, 0.10, 8, x0 + 1.17, 0, z0 + 0.01, "x");                  /* flash hider */
    K.bb(d, x0 - 0.10, x0 + 0.12, 0.075, 0.19, z0 - 0.19, z0 - 0.005);        /* ammunition can */
    K.bb(d, x0 - 0.02, x0 + 0.08, 0.055, 0.075, z0 - 0.03, z0 + 0.06);        /* feed throat */
  }

  /* ======================================================================
     M59 Armored Personnel Carrier
     ====================================================================== */
  /* Stations along the track (equal spacing 0.78 m: five road wheels, the
     front sprocket one station ahead of the first, the idler 0.7 behind the
     last, both raised as in the side view); 5.61 m hull, 3.2 m slab. */
  var M59_WX = [1.40, 0.62, -0.16, -0.94, -1.72];
  function m59(THREE, M, C) {
    var T = mats(THREE, C, "m59"), g = new THREE.Group(), K = new Baker(THREE), i, k, s, x, yc;
    g.name = "m59_apc";
    var roof = 2.22, HW = 1.60;
    /* upper hull: the slab sides over the tracks, the steep glacis, the
       lower front and rear plates; the belly box between the tracks */
    K.prism(T.skin, [[-2.62, 1.02], [-2.62, 0.62], [-2.80, 0.62], [-2.80, roof], [2.20, roof], [2.81, 1.22],
                     [2.81, 0.62], [2.62, 0.62], [2.62, 1.02]], -HW, HW);
    K.prism(T.dark, [[-2.62, 0.46], [-2.62, 1.05], [2.62, 1.05], [2.62, 0.62], [2.30, 0.46]], -1.12, 1.12);
    /* the bead along each side, the seams and tow lugs on the front plate */
    K.bbm(T.dark, -2.70, 2.00, HW, HW + 0.014, 1.40, 1.45);
    K.bb(T.dark, 2.805, 2.82, -1.55, 1.55, 0.93, 0.96);
    K.bb(T.dark, 2.78, 2.83, -1.55, 1.55, 1.19, 1.26);
    K.bbm(T.dark, 2.80, 2.84, 0.90, 1.02, 0.72, 0.86);
    /* lamp pods on the upper front corners, each with a headlamp and a
       smaller lamp beside it */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, 2.40, 2.70, s * 1.20, s * 1.54, 1.58, 1.88);
      K.cyl(T.lamp, 0.075, 0.03, 12, 2.705, s * 1.31, 1.73, "x");
      K.cyl(T.lamp, 0.04, 0.03, 10, 2.705, s * 1.46, 1.73, "x");
    }
    /* roof: two top-facing panels in the team colour, the driver's hatch
       (front left) with three periscopes, the cupola ring (front right) */
    K.bb(T.team, -2.15, 0.05, 0.28, 0.94, roof, roof + 0.012);
    K.bb(T.team, -2.15, 0.05, -0.94, -0.28, roof, roof + 0.012);
    K.bb(T.skin, 1.30, 1.84, 0.38, 0.92, roof, roof + 0.07);
    for (i = 0; i < 3; i++) K.bb(T.glass, 1.84, 1.875, 0.42 + i * 0.17, 0.53 + i * 0.17, roof + 0.02, roof + 0.07);
    K.cyl(T.dark, 0.42, 0.04, 16, 1.62, -0.62, roof + 0.02, "z");
    /* running gear, both sides */
    var path = [[-1.72, 0.035], [1.40, 0.035], [2.40, 0.356], [2.525, 0.62], [2.40, 0.884], [2.18, 0.965],
                [-2.24, 0.965], [-2.46, 0.884], [-2.585, 0.62], [-2.46, 0.356]];
    for (s = -1; s <= 1; s += 2) {
      yc = s * 1.30;
      for (i = 0; i < path.length; i++) K.belt(T.track, path[i], path[(i + 1) % path.length], 0.07, yc - 0.20, yc + 0.20);
      for (i = 0; i < 13; i++) { x = -1.62 + i * 0.255; K.bb(T.track, x - 0.035, x + 0.035, yc - 0.212, yc + 0.212, 0.0, 0.09); }
      /* front sprocket, rear idler (both raised), three return rollers */
      K.cyl(T.dark, 0.30, 0.22, 14, 2.18, yc, 0.62);
      K.cyl(T.dark, 0.13, 0.32, 10, 2.18, yc, 0.62);
      K.cyl(T.dark, 0.30, 0.22, 14, -2.24, yc, 0.62);
      K.cyl(T.dark, 0.13, 0.30, 10, -2.24, yc, 0.62);
      for (i = 0; i < 3; i++) K.cyl(T.dark, 0.09, 0.18, 10, [-1.35, -0.10, 1.15][i], yc, 0.84);
    }
    K.flush(g);
    /* five axles of road wheels */
    var tg = tyreGeo(THREE, 0.33, 0.20, 18, 0, 0);
    for (k = 0; k < M59_WX.length; k++) g.add(wheelPair(THREE, T, tg, M59_WX[k], 0.40, 1.30, 0.15));
    /* the cupola and its .50: ring centre on the roof, front right */
    var tt = new THREE.Group(), Kt = new Baker(THREE);
    tt.name = "turret";
    tt.position.set(1.62, -0.62, roof + 0.04);
    Kt.cyl(T.skin, 0.36, 0.20, 16, 0, 0, 0.10, "z");
    Kt.cyl(T.skin, 0.36, 0.08, 16, 0, 0, 0.24, "z", 0.26);
    Kt.torus(T.dark, 0.20, 0.015, 0, 0, 0.285, 5, 14);
    for (i = 0; i < 8; i++) {
      var an = i / 8 * PI * 2 + PI / 8;
      Kt.put(T.dark, new THREE.BoxGeometry(0.03, 0.10, 0.045), Math.cos(an) * 0.36, Math.sin(an) * 0.36, 0.13, 0, 0, an);
    }
    Kt.rod(T.dark, 0.03, [-0.06, 0, 0.27], [-0.06, 0, 0.40], 6);
    Kt.bb(T.dark, -0.26, 0.10, -0.07, 0.07, 0.38, 0.43);
    m2(Kt, T, -0.08, 0.40);
    Kt.flush(tt);
    g.add(tt);
    return g;
  }

  /* ======================================================================
     M8 Greyhound
     ====================================================================== */
  function m8(THREE, M, C) {
    var T = mats(THREE, C, "m8"), g = new THREE.Group(), K = new Baker(THREE), i, j, s;
    g.name = "m8_greyhound";
    var DECK = 1.46, TX = 0.16;
    /* hull: the central body with the sloped nose, the deck, and the wings
       that widen it over the tyres; the bins and mudguards go on after */
    K.prism(T.skin, [[-2.50, 0.30], [-2.50, 1.22], [-2.28, DECK], [1.00, DECK], [1.86, 1.36],
                     [2.45, 0.96], [2.45, 0.42], [2.15, 0.30]], -0.88, 0.88);
    var wing = [[-2.50, 1.00], [-2.50, 1.22], [-2.28, DECK], [1.00, DECK], [1.60, 1.39], [1.60, 1.00]];
    K.prism(T.skin, wing, 0.86, 1.02);
    K.prism(T.skin, wing, -1.02, -0.86);
    /* ribbed stowage bins: one before and one over the tandem rear axles */
    for (s = -1; s <= 1; s += 2) {
      var yi = s > 0 ? 0.86 : -1.27, yo = s > 0 ? 1.27 : -0.86, gy0 = s > 0 ? 1.27 : -1.283, gy1 = s > 0 ? 1.283 : -1.27;
      K.bb(T.skin, 0.06, 1.13, yi, yo, 0.71, 1.42);
      K.bb(T.skin, -2.48, 0.03, yi, yo, 0.71, 1.42);
      for (j = 0; j < 4; j++) {
        K.bb(T.dark, 0.06, 1.13, gy0, gy1, 0.84 + j * 0.15, 0.86 + j * 0.15);
        K.bb(T.dark, -2.48, 0.03, gy0, gy1, 0.84 + j * 0.15, 0.86 + j * 0.15);
      }
      /* front mudguard: a thin arc over the front tyre */
      var pts = [], th, a = 1.69;
      for (i = 0; i <= 10; i++) { th = (160 - 140 * i / 10) * PI / 180; pts.push([a + 0.56 * Math.cos(th), 0.45 + 0.56 * Math.sin(th)]); }
      for (i = 10; i >= 0; i--) { th = (160 - 140 * i / 10) * PI / 180; pts.push([a + 0.52 * Math.cos(th), 0.45 + 0.52 * Math.sin(th)]); }
      K.prism(T.skin, pts, s > 0 ? 0.86 : -1.27, s > 0 ? 1.27 : -0.86);
      /* headlamp on the mudguard */
      K.bb(T.dark, 1.99, 2.03, s * 0.98 - 0.02, s * 0.98 + 0.02, 0.86, 0.95);
      K.cyl(T.dark, 0.06, 0.05, 10, 2.03, s * 0.98, 0.97, "x");
      K.cyl(T.lamp, 0.045, 0.05, 10, 2.06, s * 0.98, 0.97, "x");
      /* driver's and assistant driver's hatches on the nose deck, each with
         a vision slot facing forward */
      K.bb(T.skin, 1.30, 1.82, s * 0.12, s * 0.66, 1.34, 1.50);
      K.bb(T.glass, 1.82, 1.835, s * 0.20, s * 0.58, 1.38, 1.46);
    }
    /* two tow shackles on the lower nose plate (the parade photograph shows
       them and no bumper bar; no photograph shows a rear pintle) */
    K.bbm(T.dark, 2.45, 2.53, 0.36, 0.50, 0.50, 0.64);
    /* engine deck: raised hatch with louvres, the team panel on its front */
    K.bb(T.skin, -2.05, -0.75, -0.62, 0.62, DECK, DECK + 0.05);
    for (i = 0; i < 3; i++) K.bb(T.dark, -2.00 + i * 0.17, -1.93 + i * 0.17, -0.56, 0.56, DECK + 0.05, DECK + 0.058);
    K.bb(T.team, -1.45, -0.85, -0.50, 0.50, DECK + 0.05, DECK + 0.062);
    /* whip antenna on the port deck just behind the turret, where the side
       photograph puts its foot (about 0.65 of the length from the nose) */
    K.bb(T.dark, -0.96, -0.80, 0.72, 0.88, DECK, DECK + 0.06);
    K.rod(T.dark, 0.006, [-0.88, 0.80, DECK + 0.06], [-0.94, 0.80, 3.20], 4);
    K.flush(g);
    /* three axles of tyres, the tandem close together */
    var tg = tyreGeo(THREE, 0.45, 0.24, 20, 18, 0.035), ax = [1.69, -0.44, -1.82];
    for (i = 0; i < 3; i++) g.add(wheelPair(THREE, T, tg, ax[i], 0.45, 1.00, 0.17));
    /* the open-topped turret: eight sloped plates, the ring mount over it */
    var tt = new THREE.Group(), Kt = new Baker(THREE), rb = 0.74, rt = 0.60, H = 0.48, tk = 0.045, an, a0, a1;
    tt.name = "turret";
    tt.position.set(TX, 0, DECK);
    for (i = 0; i < 8; i++) {
      a0 = (22.5 + i * 45) * PI / 180; a1 = (22.5 + (i + 1) * 45) * PI / 180;
      var f = function (r, ang, z) { return [r * Math.cos(ang), r * Math.sin(ang), z]; };
      Kt.hexa(T.skin, [f(rb, a0, 0), f(rb, a1, 0), f(rb - tk, a1, 0), f(rb - tk, a0, 0),
                       f(rt, a0, H), f(rt, a1, H), f(rt - tk, a1, H), f(rt - tk, a0, H)]);
    }
    /* mantlet, 37 mm M6 with its recoil sleeve, coaxial .30 beside it */
    Kt.bb(T.skin, 0.52, 0.80, -0.22, 0.22, 0.14, 0.42);
    Kt.cyl(T.dark, 0.045, 0.30, 10, 0.94, 0, 0.28, "x");
    Kt.cyl(T.dark, 0.022, 1.52, 10, 1.54, 0, 0.28, "x");
    Kt.cyl(T.dark, 0.016, 0.40, 8, 1.00, -0.13, 0.29, "x");
    Kt.bb(T.dark, 0.0, 0.50, -0.14, 0.14, 0.16, 0.36);
    /* ring mount: a hoop on four posts above the plates, the .50 M2HB on it */
    Kt.torus(T.dark, 0.54, 0.018, 0, 0, H + 0.30, 5, 22);
    for (i = 0; i < 4; i++) {
      an = i * PI / 2 + PI / 4;
      Kt.rod(T.dark, 0.016, [0.58 * Math.cos(an), 0.58 * Math.sin(an), H - 0.02], [0.54 * Math.cos(an), 0.54 * Math.sin(an), H + 0.30], 5);
    }
    Kt.bb(T.dark, -0.62, -0.46, -0.07, 0.07, H + 0.28, H + 0.34);
    Kt.rod(T.dark, 0.025, [-0.40, 0, H + 0.34], [-0.40, 0, H + 0.50], 6);
    m2(Kt, T, -0.30, H + 0.54);
    Kt.flush(tt);
    g.add(tt);
    return g;
  }

  /* ======================================================================
     M60 on its post (M151A1)
     ====================================================================== */
  function m60(K, T, x0, z0) {
    var d = T.dark;
    K.bb(d, x0 - 0.12, x0 + 0.22, -0.045, 0.045, z0 - 0.05, z0 + 0.05);      /* receiver */
    K.bb(d, x0 - 0.02, x0 + 0.14, -0.04, 0.04, z0 + 0.05, z0 + 0.075);       /* feed cover */
    K.bb(d, x0 - 0.46, x0 - 0.12, -0.025, 0.025, z0 - 0.045, z0 + 0.03);     /* butt stock */
    K.bb(d, x0 - 0.06, x0 - 0.02, -0.02, 0.02, z0 - 0.11, z0 - 0.05);        /* pistol grip */
    K.cyl(d, 0.012, 0.56, 8, x0 + 0.50, 0, z0 + 0.01, "x");                  /* barrel */
    K.cyl(d, 0.010, 0.36, 6, x0 + 0.40, 0, z0 - 0.025, "x");                 /* gas cylinder */
    K.cyl(d, 0.018, 0.07, 8, x0 + 0.82, 0, z0 + 0.01, "x");                  /* flash hider */
    K.bb(T.skin, x0 + 0.00, x0 + 0.16, 0.05, 0.13, z0 - 0.12, z0 + 0.04);    /* ammunition box */
  }

  /* ======================================================================
     M151A1 MUTT
     ====================================================================== */
  function m151(THREE, M, C) {
    var T = mats(THREE, C, "m151"), g = new THREE.Group(), K = new Baker(THREE), i, s;
    g.name = "m151a1_mutt";
    var XF = 1.30, XR = -0.86, R = 0.38, HWD = 0.79, TR = 0.69;
    /* body sides: one profile with both wheel arches cut, belt line at
       0.86, the bonnet side up to 1.05, the nose edge at 1.66 */
    var pts = [[-1.41, 0.38]], k, ap;
    ap = archPts(XR, 0.38, 0.41, 10, 9);
    for (k = 0; k < ap.length; k++) pts.push(ap[k]);
    ap = archPts(XF, 0.38, 0.41, 10, 1.66);
    for (k = 0; k < ap.length; k++) pts.push(ap[k]);
    pts.push([1.66, 0.96], [1.60, 1.05], [0.77, 1.05], [0.77, 0.86], [-1.41, 0.86]);
    K.prism(T.skin, pts, HWD - 0.04, HWD);
    K.prism(T.skin, pts, -HWD, -HWD + 0.04);
    /* floor, tail panel, cowl and dash, bonnet with its team strip, nose */
    K.bb(T.dark, -1.41, 0.77, -HWD, HWD, 0.38, 0.44);
    K.bb(T.skin, -1.44, -1.41, -HWD, HWD, 0.38, 0.86);
    K.bb(T.skin, 0.70, 0.77, -HWD, HWD, 0.46, 1.02);
    K.bb(T.dark, 0.60, 0.70, -0.74, 0.74, 0.80, 0.98);
    K.bb(T.skin, 0.77, 1.62, -HWD, HWD, 1.02, 1.06);
    K.bb(T.team, 0.95, 1.52, -0.42, 0.42, 1.06, 1.072);
    K.bb(T.skin, 1.62, 1.66, -HWD, HWD, 0.60, 1.05);
    /* grille: a dark recess with horizontal slats, round lamps at the corners */
    K.bb(T.dark, 1.66, 1.68, -0.36, 0.36, 0.62, 0.98);
    for (i = 0; i < 5; i++) K.bb(T.skin, 1.68, 1.69, -0.34, 0.34, 0.66 + i * 0.065, 0.69 + i * 0.065);
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.085, 0.04, 12, 1.675, s * 0.57, 0.80, "x");
      K.cyl(T.lamp, 0.065, 0.04, 12, 1.69, s * 0.57, 0.80, "x");
      /* the A1's addition: a turn-signal lamp on each front fender top */
      K.bb(T.lamp, 1.50, 1.58, s * 0.70 - 0.035, s * 0.70 + 0.035, 1.06, 1.095);
    }
    /* bumpers, tow lugs */
    K.bb(T.dark, 1.66, 1.74, -0.78, 0.78, 0.43, 0.54);
    K.bb(T.dark, -1.50, -1.44, -0.76, 0.76, 0.40, 0.50);
    /* chassis cross-members under the floor at each axle */
    K.bb(T.dark, XF - 0.10, XF + 0.10, -0.50, 0.50, 0.28, 0.40);
    K.bb(T.dark, XR - 0.10, XR + 0.10, -0.50, 0.50, 0.28, 0.40);
    /* seats: two in front, a bench across the tail */
    K.bbm(T.skin, -0.18, 0.32, 0.08, 0.62, 0.44, 0.62);
    K.bbm(T.skin, -0.32, -0.18, 0.08, 0.62, 0.62, 1.04);
    K.bb(T.skin, -1.30, -0.88, -0.62, 0.62, 0.44, 0.60);
    K.bb(T.skin, -1.41, -1.30, -0.62, 0.62, 0.60, 0.98);
    /* steering wheel and column (driver on the left) */
    K.torus(T.dark, 0.17, 0.016, 0.50, 0.37, 0.95, 5, 16, 0, 1.15, 0);
    K.rod(T.dark, 0.016, [0.62, 0.37, 0.80], [0.50, 0.37, 0.95], 5);
    /* windscreen, up: two panes in a frame leaning back from the cowl */
    for (s = -1; s <= 1; s += 2) K.prism(T.glass, [[0.77, 1.03], [0.68, 1.52], [0.675, 1.52], [0.765, 1.03]], s > 0 ? 0.03 : -0.75, s > 0 ? 0.75 : -0.03);
    for (i = -1; i <= 1; i++) K.rod(T.dark, 0.014, [0.77, i * 0.76, 1.03], [0.68, i * 0.76, 1.52], 5);
    K.bb(T.dark, 0.665, 0.70, -0.78, 0.78, 1.49, 1.53);
    /* whip antenna on the front right fender, spare wheel on the tail (port
       half) with its bracket */
    K.bb(T.dark, 1.46, 1.54, -0.74, -0.66, 1.05, 1.10);
    K.rod(T.dark, 0.006, [1.50, -0.70, 1.10], [1.46, -0.70, 2.10], 4);
    K.put(T.rub, tyreGeo(THREE, 0.38, 0.19, 18, 18, 0.03), -1.54, 0.38, 1.00, 0, 0, -PI / 2);
    K.cyl(T.dark, 0.10, 0.05, 10, -1.665, 0.38, 1.00, "x");
    K.bb(T.dark, -1.50, -1.44, 0.30, 0.46, 0.50, 0.66);
    /* the post that carries the weapon, behind the front seats */
    var MX = -0.62, MZ = 1.32;
    K.bb(T.dark, MX - 0.12, MX + 0.12, -0.12, 0.12, 0.44, 0.47);
    if (DRAW_M151_MG) K.cyl(T.dark, 0.035, 0.85, 8, MX, 0, 0.895, "z");
    K.flush(g);
    /* two axles of tyres */
    var tg = tyreGeo(THREE, R, 0.19, 18, 18, 0.03);
    g.add(wheelPair(THREE, T, tg, XF, R, TR, 0.12));
    g.add(wheelPair(THREE, T, tg, XR, R, TR, 0.12));
    /* the weapon: a swivel head and the M60, trained about the post */
    var tt = new THREE.Group(), Kt = new Baker(THREE);
    tt.name = "turret";
    tt.position.set(MX, 0, MZ);
    if (DRAW_M151_MG) {
      Kt.cyl(T.dark, 0.05, 0.08, 8, 0, 0, -0.02, "z");
      Kt.bb(T.dark, -0.08, 0.12, -0.04, 0.04, 0.0, 0.05);
      m60(Kt, T, 0.0, 0.09);
    }
    Kt.flush(tt);
    g.add(tt);
    return g;
  }

  return { m59: m59, m8: m8, m151: m151 };
})();

/* len is the measured X extent of each (see the dump): the M59 from its tail
   plate to the tow lugs, the M8 from the tail plate to the tow shackles, the
   M151 from the spare wheel to the front bumper. */
UNIT_MODELS["nato_e50_ifv"] = { len: 5.64, build: HeroEarlyLight.m59 };
UNIT_MODELS["nato_e50_recon"] = { len: 5.03, build: HeroEarlyLight.m8 };
UNIT_MODELS["nato_e60_recon"] = { len: 3.43, build: HeroEarlyLight.m151 };
