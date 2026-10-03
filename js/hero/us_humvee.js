/* ===== us_humvee.js - HERO models: the AM General HMMWV ====================
   The US Army's scout vehicle in four eras, one builder:
     nato_e80_recon  M1025 armament carrier, 1985: the slant-back hard top
                     with the roof ring mount and an M2, in MERDC woodland
                     (the armed HMMWV of the first production family; no
                     source shows a pedestal gun in an M998's bed then)
     nato_e90_recon  M1025 armament carrier ("slant-back" hard top), the
                     Gulf War truck: roof ring mount, M2, desert tan
     nato_e00_recon  M1114 / M1151 up-armoured, 2005: armoured cab, wire
                     cutter, spare wheel on the tail, gunner's shield (GPK)
                     over the roof ring
     recon_n         the present-day M1151A1: the same armoured body with the
                     box-shaped enclosed gunner's turret (OGPK) and the
                     antenna fit of the 2010s
   The old recon_n drew one box truck for every era.  The wheelbase, track,
   tyre and the whole of the layout change between the first-generation and
   the up-armoured family, so this draws each of them.

   Reference: the Army HMMWV fact file for the M998 (15 ft x 7 ft 1 in x
   6 ft, i.e. 4.57 x 2.16 x 1.83 m; wheelbase 130 in = 3.30 m; track 71.5 in;
   36 x 12.5R16.5 tyres: 0.915 m by 0.318 m), the AM General figures for
   the M1114/M1151 (about 4.9 x 2.3 x 1.9 m on 37 in tyres, 5.5 t), and
   five press photographs from Wikimedia Commons: an M998 four-door
   hard-top (flat bonnet with the black vent plate, vertical-slot grille,
   round lamps in the fender fronts, big rectangular mirrors, pressed X on
   the body panels), a Spanish M966 TOW carrier (slant-back body, roof
   platform), an M1114 with a Kevlar-wrapped turret and an M1165A1 in sand
   paint (spare wheel on the tail, thick flat doors with small armour
   windows, wire-cutter post, box turret about 0.65 m above the roof), and a
   green hard-top with a bumper brush guard.  Where the references leave a
   number open it is read off those photographs against the 3.30 m
   wheelbase.

   TWO MORE ROWS on the same chassis (the 1990s support variants):
     nato_e90_spaag  M1097 Avenger (AN/TWQ-1), woodland: the heavy HMMWV with a
                     hard-top cab and the Boeing turret on the bed - a rivetted
                     housing with a raked glass front, a Stinger pod each side
                     (four rounds a pod, 2 x 2 mouths), the FN M3P .50, the
                     FLIR box and two whips.  The whole turret is the trained node.
     nato_e90_ewveh  AN/TLQ-17A TRAFFIC JAM, desert tan: the HMMWV carrying a
                     shelter box on the bed and a roof mast with a directional
                     antenna head.  The head is the trained node.
   Avenger evidence.  The Wikipedia fact sheet: 4.95 x 2.18 x 2.64 m, 3,900 kg,
   crew 2, two Stinger pods "each capable of firing up to 4" missiles, an FN
   M3P, a Raytheon AN/VLR-1 FLIR, fielded on the M998 and on the M1097 heavy
   HMMWV (the Humvee article lists "M1097 heavy HMMWV Avenger"); the 2005
   up-gun fit moved the gun into the RIGHT POD's place, so in the basic fit
   the gun is not there.  Four press photographs on Wikimedia Commons: a
   woodland-painted Avenger on a HMMWV (hard-top cab with the doors off, the
   housing close behind the cab, the glass front hinged up, pods elevated);
   a Taiwanese vehicle from the front left (flat hard roof, hard doors with
   windows, a dark raked housing front, pods level with the housing top, two
   whips, a sensor cluster under the left pod); a Marine LAAD close-up from
   the front (a gunner in the compartment, a rivetted housing, the FLIR in a
   bracket on the left, a pod each side as tall as the glass); and a launch
   seen from behind.
   The housing (1.2 x 1.1 x 1.35 m) and pods (1.6 x 0.42 x 0.42 m) are read off
   them against the 3.30 m wheelbase.  NOT confirmed: where the M3P sits (the
   up-gun text says only that it was moved into the right pod's place; it is
   drawn low on the right under the pod, a guess) and the exact rake of the
   glass; the pods are drawn level, the travel posture (the 2.64 m stowed
   height).  The FLIR on the left is seen in two photographs.  Size against the
   fact sheet: 4.95 m long (drawn 4.95: the nose 0.09 m and the tail 0.18 m
   longer than the M998 tub's; the tail figure is read off the woodland
   photograph, rear bumper face about 0.75 m behind the rear axle), 2.18 m
   wide (the body is 2.14 m, -1.8 %; the mirrors reach 2.40 m), 2.64 m high
   (pod tops 2.62 m; the two whips stand above that and their height is not
   established).  Woodland,
   because every photograph found is MERDC woodland; a Gulf War vehicle would
   be tan and no photograph of one was found.  Both rows: 7 materials, the
   Avenger 13 draw calls and the TRAFFIC JAM 11, the named "turret" node one
   baked mesh per material.
   TRAFFIC JAM: THE REFERENCES ARE THIN.  The Wikipedia list of US military
   electronics (citing Travis 1988) calls the AN/TLQ-17 a 550 W HF/VHF
   communications countermeasures system carried on the HMMWV, on the M1028
   CUCV and in the EH-60A; the Humvee article lists the M1037 and M1042 S250
   shelter carriers; the row says unarmoured, canvas doors, about five
   tonnes, Desert Storm service.  No photograph or drawing of the AN/TLQ-17A
   was found (a Commons search finds none; the web searches tried, two search
   engines and DVIDS, returned nothing usable), so what is drawn is the
   carrier class and a generic fit: the M998-family cab, an S250-type shelter
   box on the bed (1.8 x 2.0 x 1.5 m, read off the bed length and the vehicle
   width), and on its roof one mast with a broadband directional head (a boom
   and five cross elements).  The
   shelter, the mast and the head are INFERRED, not seen.  The row's turret
   flag trains the head.  The row text says canvas doors; no source for the
   door type of the shelter carrier was found, so the hard cab of the family
   is drawn.  The carrier keeps the M998 tub's 4.68 m (no length is published
   for it).
   What is deliberately NOT drawn: crew, interior beyond the seats, the CROWS
   remote station (the row's gun is a ring-mounted .50 that aims), any
   variant the rows do not name.

   Meshes.  Everything fixed is baked, one merged mesh per material; the four
   tyres are separate "roadwheel" groups (axle on local Y) with a block tread
   so the spin shows; the weapon station is the named "turret" (origin on the
   ring centre, gun along +X, one baked mesh per material).  At most 13 draw
   calls and 8 materials.  The team material is exactly C.team, on the bonnet
   and on a top-facing recognition panel, as an era stand-in repaints
   everything else but leaves it alone.

   Model space: +X nose, +Y left, +Z up, real metres, tyres on z = 0.  The
   renderer scales by the measured X extent; the only thing that sticks out
   along X is the spare wheel on the armoured tail, as on the real vehicle.
   Colours are authored in sRGB and left to prepModel() to linearise.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHumvee = (function () {
  "use strict";

  /* ------------------------------------------------------------ variants */
  /* R: tyre radius (36 in on the first-generation family, 37 in on the armoured one);
     XF/XR: axle stations, 3.30 m apart; nose: grille plane; bump: bumper
     face; tail: rear body face; hw: half width of the body panels. */
  var VAR = {
    e80: { kind: "slant", paint: "wood", fb: 0x4b5a37, R: 0.457, XF: 1.60, XR: -1.70,
           nose: 2.20, bump: 2.285, tail: -2.14, hw: 1.07 },
    e90: { kind: "slant", paint: "tan", fb: 0xb09a6e, R: 0.457, XF: 1.60, XR: -1.70,
           nose: 2.20, bump: 2.285, tail: -2.14, hw: 1.07 },
    e00: { kind: "arm", paint: "tan", fb: 0xad9970, R: 0.470, XF: 1.62, XR: -1.68,
           nose: 2.30, bump: 2.45, tail: -2.28, hw: 1.15, turret: "gpk" },
    n:   { kind: "arm", paint: "tan2", fb: 0xa8946c, R: 0.470, XF: 1.62, XR: -1.68,
           nose: 2.30, bump: 2.45, tail: -2.28, hw: 1.15, turret: "ogpk" },
    /* the M1097 heavy HMMWV (36 in tyres, the M998 body) with the Avenger turret.
       The fact sheet gives 4.95 m overall (16 ft 3 in) against the M998's 4.57 m,
       so the overhangs are longer than the first-generation tub's: 0.09 m at the
       nose and 0.18 m at the tail.  The tail figure is read off the woodland
       photograph (rear bumper face about 0.75 m behind the rear axle); the split
       is a reading, the total is the published length. */
    av:  { kind: "avenger", paint: "wood", fb: 0x4b5a37, R: 0.457, XF: 1.60, XR: -1.70,
           nose: 2.29, bump: 2.375, tail: -2.32, hw: 1.07 },
    /* the unarmoured shelter carrier of the TRAFFIC JAM */
    tj:  { kind: "jam", paint: "tan", fb: 0xb09a6e, R: 0.457, XF: 1.60, XR: -1.70,
           nose: 2.20, bump: 2.285, tail: -2.14, hw: 1.07 }
  };
  var TW = 0.318;          /* 12.5 in section width */
  var HALF_TRACK = 0.908;  /* 71.5 in track */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* --------------------------------------------------------------- paint */
  /* Cached per paint kind: build() runs once per key, team and era.  The
     skin is mapped by world position (4.6 m to the canvas), so the pattern
     runs on from a door into the fender.  "wood" is the MERDC woodland of
     the 1980s (green, brown, black); "tan" is CARC desert tan with dust and
     a little rubbed-through brown; "tan2" the same, a touch lighter. */
  var _cv = {};
  function blob(q, R, cx, cy, rad, sx) {
    var n = 9, i, a, r, px, py;
    q.beginPath();
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; r = rad * (0.55 + R() * 0.75);
      px = cx + Math.cos(a) * r * sx; py = cy + Math.sin(a) * r;
      if (i === 0) q.moveTo(px, py); else q.lineTo(px, py);
    }
    q.closePath(); q.fill();
  }
  function paint(kind) {
    if (_cv[kind]) return _cv[kind];
    var R = rng(kind === "wood" ? 8801 : (kind === "tan" ? 9902 : 7703)), W = 256, H = 256, i, gr;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    if (kind === "wood") {
      q.fillStyle = "#4a5a36"; q.fillRect(0, 0, W, H);
      var cols = ["#5b4a30", "#22251f", "#3b4b2a", "#5b4a30", "#26291f"];
      for (i = 0; i < 30; i++) {
        q.fillStyle = cols[i % cols.length];
        blob(q, R, R() * W, R() * H, 16 + R() * 30, 1.5 + R() * 0.8);
      }
    } else {
      q.fillStyle = (kind === "tan") ? "#b09a6e" : "#b6a27a"; q.fillRect(0, 0, W, H);
      for (i = 0; i < 26; i++) {
        q.fillStyle = (i % 2) ? "rgba(236,222,186,0.10)" : "rgba(96,76,44,0.09)";
        q.fillRect(R() * W, R() * H, 20 + R() * 70, 12 + R() * 40);
      }
    }
    /* rubbed paint and grime */
    q.fillStyle = "rgba(30,26,18,0.20)";
    for (i = 0; i < 34; i++) q.fillRect(R() * W, R() * H * 0.8, 6 + R() * 26, 1 + R() * 2);
    q.fillStyle = "rgba(20,18,12,0.35)";
    for (i = 0; i < 40; i++) q.fillRect(R() * W, R() * H, 2, 2);
    /* road dust on the lowest part of every side */
    gr = q.createLinearGradient(0, H * 0.74, 0, H);
    gr.addColorStop(0, "rgba(150,126,92,0.00)");
    gr.addColorStop(1, "rgba(150,126,92,0.50)");
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
  /* skin (painted steel / aluminium), dark (black steel, seats, bezels, gun),
     rub (tyres), glass, team, lamp, lampR (tail lights).  Seven. */
  function makeMats(THREE, C, V) {
    var T = {};
    var st = canvasTex(THREE, paint(V.paint));
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (st) T.skin.map = st; else T.skin.color.setHex(V.fb);
    T.skin.userData.worldUV = 4.6;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24261f, roughness: 0.78, metalness: 0.22 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x181817, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.12, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xcfc9ac, roughness: 0.3, metalness: 0.1,
                                              emissive: 0x2a2814, emissiveIntensity: 0.7 });
    T.lampR = new THREE.MeshStandardMaterial({ color: 0xa01a10, roughness: 0.35, metalness: 0.1,
                                               emissive: 0x3c0a06, emissiveIntensity: 0.8 });
    return T;
  }

  /* ------------------------------------------------------------ geometry */
  /* Ear clipping for the side profiles (simple polygons, wheel-arch notches
     make them concave).  Returns CCW index triples in the (x, z) plane. */
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

  /* A flat triangle with the given outward normal (winding follows it) */
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

  /* Points of a wheel-arch circle from the sill on its left, over the top,
     down to the sill on its right; clipped where it would pass xmin */
  function arch(cx, cz, r, zs, xmin) {
    var a = Math.asin((zs - cz) / r), th0 = Math.PI - a, th1 = a, out = [], n = 10, i, th;
    if (cx + r * Math.cos(th0) < xmin) th0 = Math.acos((xmin - cx) / r);
    for (i = 0; i <= n; i++) {
      th = th0 + (th1 - th0) * i / n;
      out.push([cx + r * Math.cos(th), cz + r * Math.sin(th)]);
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
  /* box from its corners */
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
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
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
  Baker.prototype.torus = function (mat, R, r, x, y, z, rs, ts) {
    this.put(mat, new this.T.TorusGeometry(R, r, rs || 5, ts || 20), x, y, z);
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
  /* a thin plate lying along the segment a-b of the (x, z) plane, th thick
     towards "up" (hood, roof) or "fwd" (windshield), spanning y0..y1 */
  Baker.prototype.plate = function (mat, ax, az, bx, bz, th, y0, y1, dir) {
    var dx = bx - ax, dz = bz - az, L = Math.sqrt(dx * dx + dz * dz);
    var nx = dz / L, nz = -dx / L;
    if (dir === "fwd" ? nx < 0 : nz < 0) { nx = -nx; nz = -nz; }
    this.prism(mat, [[ax, az], [bx, bz], [bx + nx * th, bz + nz * th], [ax + nx * th, az + nz * th]], y0, y1);
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
  /* 36 x 12.5R16.5 (or 37 in): a lathe about the local Y axle (bead, bulging
     sidewall, shoulder, flat crown) with twenty block lugs standing on the
     crown, so the tyre notches its own outline and a turning wheel shows. */
  function tyreGeo(THREE, R) {
    var S = { p: [], n: [] }, seg = 20, h = TW / 2, rc = R - 0.026, i, j;
    var prof = [[0.215, -0.095], [0.262, -0.146], [0.336, -h], [0.405, -0.150], [0.438, -0.126], [rc, -0.105],
                [rc, 0.105], [0.438, 0.126], [0.405, 0.150], [0.336, h], [0.262, 0.146], [0.215, 0.095]];
    for (i = 0; i < prof.length - 1; i++) {
      var r0 = prof[i][0], y0 = prof[i][1], r1 = prof[i + 1][0], y1 = prof[i + 1][1];
      var dr = r1 - r0, dy = y1 - y0, l = Math.sqrt(dr * dr + dy * dy), nr = dy / l, ny = -dr / l;
      for (j = 0; j < seg; j++) {
        var a0 = j / seg * Math.PI * 2, a1 = (j + 1) / seg * Math.PI * 2;
        var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
        var A = [r0 * c0, y0, r0 * s0], B = [r0 * c1, y0, r0 * s1];
        var Cc = [r1 * c1, y1, r1 * s1], D = [r1 * c0, y1, r1 * s0];
        var nA = [nr * c0, ny, nr * s0], nB = [nr * c1, ny, nr * s1];
        if (r0 > 1e-6) triN(S, A, B, Cc, nA, nB, nB);
        if (r1 > 1e-6) triN(S, A, Cc, D, nA, nB, nA);
      }
    }
    var parts = [geoFrom(THREE, S)], lug = 20;
    for (j = 0; j < lug; j++) {
      var a = (j + 0.5) / lug * Math.PI * 2, g = new THREE.BoxGeometry(0.034, 0.225, 0.062);
      var m = new THREE.Matrix4().compose(
        new THREE.Vector3(Math.cos(a) * (rc + 0.010), 0, Math.sin(a) * (rc + 0.010)),
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

  /* --------------------------------------------------- the M2 .50 cal */
  /* Browning M2HB, receiver centred on (x0, 0, z0), barrel along +X.  The
     real gun is 1.65 m overall: receiver and back plate 0.47, barrel 1.0
     as drawn (the 45 in barrel less what the sleeve covers).  Ammunition
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

  /* ------------------------------------------------------- shared chassis */
  function chassis(K, T, V) {
    var R = V.R, ax, s, i, ys = [V.XF, V.XR];
    /* belly pan, axle beams, differentials, hub-reduction housings, shafts */
    K.bb(T.dark, V.XR - 0.35, V.XF + 0.35, -0.62, 0.62, 0.36, 0.52);
    for (i = 0; i < 2; i++) {
      ax = ys[i];
      K.cyl(T.dark, 0.045, 1.55, 8, ax, 0, R, "y");
      K.bb(T.dark, ax - 0.20, ax + 0.20, -0.22, 0.22, 0.40, 0.62);
      for (s = -1; s <= 1; s += 2) {
        K.bb(T.dark, ax - 0.13, ax + 0.13, s * 0.60, s * 0.74, R - 0.12, R + 0.16);
        /* the rim, a solid disc seen between the beads, and its hub cap */
        K.cyl(T.skin, 0.222, 0.20, 12, ax, s * HALF_TRACK, R, "y");
        K.cyl(T.dark, 0.075, 0.03, 8, ax, s * (HALF_TRACK + 0.105), R, "y");
        K.cyl(T.dark, 0.17, 0.012, 12, ax, s * (HALF_TRACK + 0.102), R, "y");
      }
    }
    K.rod(T.dark, 0.03, [V.XR, 0, 0.50], [V.XF, 0, 0.50], 6);
    K.rod(T.dark, 0.035, [V.XR - 0.1, 0.40, 0.44], [V.XR + 0.9, 0.40, 0.44], 6);   /* exhaust */
  }

  /* ------------------------------------------------ body: the M1025 tub */
  /* The aluminium tub the M1025 shares with the M998: bonnet, grille,
     bumpers, lamps, mirrors; and its windshield */
  function tub(K, T, V) {
    var R = V.R, nose = V.nose, tail = V.tail, hw = V.hw, i, ptsA, ptsB, a, s;
    var zS = 0.50, belt = 1.20, bedTop = 1.16, cowl = 1.05;
    /* side prisms: fender and cab sill, then the bed side, both with the
       wheel arches cut through */
    ptsA = [[-0.30, zS]];
    a = arch(V.XF, R, 0.52, zS, -0.30);
    for (i = 0; i < a.length; i++) ptsA.push(a[i]);
    ptsA.push([nose, zS], [nose, 1.03], [cowl, 1.03], [cowl - 0.05, belt], [-0.30, belt]);
    K.prism(T.skin, ptsA, 0.58, hw);
    K.prism(T.skin, ptsA, -hw, -0.58);
    ptsB = [[tail, bedTop]];
    a = arch(V.XR, R, 0.52, zS, tail);
    for (i = 0; i < a.length; i++) ptsB.push(a[i]);
    ptsB.push([-0.30, zS], [-0.30, bedTop]);
    K.prism(T.skin, ptsB, 0.74, hw);
    K.prism(T.skin, ptsB, -hw, -0.74);
    /* bonnet: the raised centre hump between the fender decks */
    K.bb(T.skin, cowl, nose, -0.58, 0.58, 0.55, 1.12);
    /* the black non-slip plate on the rear half of the bonnet */
    K.bb(T.dark, 1.12, 1.62, -0.38, 0.38, 1.12, 1.134);
    /* team panel on the front half */
    K.bb(T.team, 1.70, 2.12, -0.40, 0.40, 1.12, 1.135);
    /* grille: black slots with seven painted bars */
    K.bb(T.dark, nose, nose + 0.012, -0.50, 0.50, 0.62, 1.02);
    for (i = -3; i <= 3; i++) K.bb(T.skin, nose + 0.012, nose + 0.026, i * 0.135 - 0.016, i * 0.135 + 0.016, 0.64, 1.0);
    /* front bumper, tow hooks; rear bumper, pintle */
    K.bb(T.dark, nose - 0.06, V.bump, -0.98, 0.98, 0.50, 0.70);
    K.bbm(T.dark, nose - 0.04, V.bump + 0.02, 0.50, 0.55, 0.44, 0.52);
    K.bb(T.dark, tail - 0.145, tail + 0.02, -0.98, 0.98, 0.50, 0.68);
    K.cyl(T.dark, 0.035, 0.12, 8, tail - 0.20, 0, 0.62, "z");
    /* lamps: round headlights in the fender fronts, tail lights on the tail */
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.088, 0.03, 12, nose - 0.005, s * 0.82, 0.90, "x");
      K.cyl(T.lamp, 0.07, 0.034, 12, nose + 0.005, s * 0.82, 0.90, "x");
      K.bb(T.lampR, tail - 0.014, tail, s * 0.90 - 0.07, s * 0.90 + 0.07, 0.80, 0.92);
    }
    /* big rectangular mirrors on arms from the A-pillars */
    for (s = -1; s <= 1; s += 2) {
      K.rod(T.dark, 0.012, [0.96, s * 0.92, 1.30], [0.96, s * 1.12, 1.52], 5);
      K.bb(T.dark, 0.93, 0.99, s * 1.12 - 0.08, s * 1.12 + 0.08, 1.46, 1.74);
    }
  }
  function windshield(K, T, x0, z0, x1, z1, hw, dark) {
    var yin = 0.03, yout = hw - 0.05;
    K.plate(T.glass, x0 + 0.006, z0 + 0.04, x1 + 0.006, z1 - 0.04, 0.016, yin, yout, "fwd");
    K.plate(T.glass, x0 + 0.006, z0 + 0.04, x1 + 0.006, z1 - 0.04, 0.016, -yout, -yin, "fwd");
    var f = dark ? T.dark : T.skin;
    K.rod(f, 0.024, [x0, hw - 0.02, z0], [x1, hw - 0.02, z1], 6);
    K.rod(f, 0.024, [x0, -hw + 0.02, z0], [x1, -hw + 0.02, z1], 6);
    K.rod(f, 0.016, [x0, 0, z0], [x1, 0, z1], 6);
    K.rod(f, 0.024, [x1, -hw, z1], [x1, hw, z1], 6);
    K.rod(f, 0.024, [x0, -hw, z0], [x0, hw, z0], 6);
  }

  /* --------------------------------------------- the M1025 slant-back */
  function bodySlant(K, T, V) {
    var tail = V.tail, ringX = -0.65, zr = 1.83, i, a, s;
    tub(K, T, V);
    /* the closed body: cab and rear compartment under one roof that slopes
       away over the tailgate */
    K.prism(T.skin, [[tail, 1.10], [1.04, 1.10], [0.90, zr], [-1.50, zr], [tail, 1.34]], -1.00, 1.00);
    /* the lower body under it, between the wheel wells, so the arches do not
       show the sky through the vehicle */
    K.bb(T.skin, tail, -0.30, -0.78, 0.78, 0.50, 1.10);
    K.bb(T.skin, -0.30, 0.98, -0.60, 0.60, 0.50, 1.10);
    K.bb(T.skin, 0.98, 1.08, -0.62, 0.62, 0.82, 1.14);
    windshield(K, T, 1.0055, 1.28, 0.9096, 1.78, 0.95, false);
    /* side windows: the door glass and the quarter light behind it */
    K.bbm(T.glass, -0.06, 0.80, 1.00, 1.012, 1.36, 1.74);
    K.bbm(T.glass, -0.62, -0.20, 1.00, 1.012, 1.36, 1.74);
    /* door outline and handle; the pressed X of the rear body is a seam pair */
    K.bbm(T.dark, 0.955, 0.965, 1.00, 1.010, 0.82, 1.82);
    K.bbm(T.dark, -0.115, -0.105, 1.00, 1.010, 0.82, 1.82);
    K.bbm(T.dark, -0.10, 0.96, 1.00, 1.010, 0.82, 0.83);
    K.bbm(T.dark, 0.02, 0.12, 1.00, 1.02, 1.12, 1.15);
    /* team recognition panel on the front half of the roof */
    K.bb(T.team, 0.12, 0.72, -0.45, 0.45, zr, zr + 0.013);
    /* roof ring: a hoop on four posts around the open hatch */
    K.cyl(T.dark, 0.40, 0.004, 14, ringX, 0, zr + 0.002, "z");
    K.torus(T.dark, 0.45, 0.02, ringX, 0, zr + 0.16, 5, 20);
    for (i = 0; i < 4; i++) {
      a = i * Math.PI / 2 + Math.PI / 4;
      K.rod(T.dark, 0.016, [ringX + 0.45 * Math.cos(a), 0.45 * Math.sin(a), zr], [ringX + 0.45 * Math.cos(a), 0.45 * Math.sin(a), zr + 0.16], 5);
    }
    /* external jerrycan on the tailgate, the radio whip */
    K.bb(T.skin, tail - 0.12, tail, -0.88, -0.58, 0.62, 1.04);
    K.bb(T.dark, -1.30, -1.14, 0.84, 1.00, 1.18, 1.28);
    K.rod(T.dark, 0.007, [-1.22, 0.92, 1.28], [-1.30, 0.92, 3.00], 4);
  }

  /* ------------------------------------------------- the armoured body */
  function bodyArm(K, T, V) {
    var R = V.R, nose = V.nose, tail = V.tail, hw = V.hw, i, a, s, pts;
    var zS = 0.52, belt = 1.30, roof = 1.88, cowl = 1.15, zNose = 1.04, zCowl = 1.17, cw = 1.08;
    var isN = V.turret === "ogpk";
    /* lower body: one profile, both arches cut through, belt line at 1.30 */
    pts = [[tail, belt]];
    a = arch(V.XR, R, 0.60, zS, tail);
    for (i = 0; i < a.length; i++) pts.push(a[i]);
    a = arch(V.XF, R, 0.58, zS, -9);
    for (i = 0; i < a.length; i++) pts.push(a[i]);
    pts.push([nose, zS], [nose, zNose], [cowl, zCowl], [cowl, belt]);
    K.prism(T.skin, pts, 0.62, hw);
    K.prism(T.skin, pts, -hw, -0.62);
    /* floor between the sills, and the sloping bonnet hump */
    K.bb(T.skin, tail, cowl, -0.62, 0.62, 0.52, 1.20);
    K.prism(T.skin, [[cowl, 0.60], [nose, 0.60], [nose, zNose + 0.05], [cowl, zCowl + 0.05]], -0.62, 0.62);
    /* bonnet: vent plate and the team panel */
    var zb = function (x) { return zCowl + 0.05 + (x - cowl) * (zNose - zCowl) / (nose - cowl); };
    K.plate(T.dark, 1.22, zb(1.22), 1.66, zb(1.66), 0.014, -0.34, 0.34, "up");
    K.plate(T.team, 1.74, zb(1.74), 2.20, zb(2.20), 0.014, -0.40, 0.40, "up");
    /* grille, slats */
    K.bb(T.dark, nose, nose + 0.012, -0.55, 0.55, 0.62, 1.00);
    for (i = -3; i <= 3; i++) K.bb(T.skin, nose + 0.012, nose + 0.026, i * 0.15 - 0.016, i * 0.15 + 0.016, 0.64, 0.98);
    /* armoured front bumper with tow hooks, rear bumper */
    K.bb(T.dark, nose - 0.04, V.bump, -1.05, 1.05, 0.50, 0.72);
    K.bbm(T.dark, nose - 0.02, V.bump + 0.02, 0.52, 0.57, 0.44, 0.52);
    K.bb(T.dark, tail - 0.12, tail + 0.02, -1.05, 1.05, 0.50, 0.70);
    /* lamps */
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.09, 0.03, 12, nose - 0.005, s * 0.90, 0.93, "x");
      K.cyl(T.lamp, 0.072, 0.034, 12, nose + 0.005, s * 0.90, 0.93, "x");
      K.bb(T.lampR, tail - 0.014, tail, s * 1.00 - 0.07, s * 1.00 + 0.07, 0.80, 0.92);
    }
    /* cab: flat roof, near-upright armoured windshield, flat tail */
    K.prism(T.skin, [[tail, 1.20], [cowl, 1.20], [cowl - 0.14, roof], [tail + 0.12, roof], [tail, roof - 0.14]], -cw, cw);
    windshield(K, T, cowl - 0.14 * 0.18 / 0.68, 1.38, cowl - 0.14 * 0.62 / 0.68, 1.82, cw - 0.04, true);
    /* armour windows: front door, rear door, and a slit on the rear body */
    K.bbm(T.glass, 0.30, 0.90, cw, cw + 0.012, 1.44, 1.76);
    K.bbm(T.glass, -0.64, -0.06, cw, cw + 0.012, 1.44, 1.76);
    K.bbm(T.glass, -1.62, -1.30, cw, cw + 0.012, 1.50, 1.70);
    /* thick doors: seams at the A-pillar, between the doors and behind the
       rear door, below and above the belt line */
    for (i = 0; i < 3; i++) {
      var sx = [1.00, 0.18, -0.84][i];
      K.bbm(T.dark, sx - 0.006, sx + 0.006, hw, hw + 0.010, 0.64, belt);
      K.bbm(T.dark, sx - 0.006, sx + 0.006, cw, cw + 0.010, belt, 1.84);
    }
    K.bbm(T.dark, -0.84, 1.00, hw, hw + 0.010, 0.64, 0.655);
    /* doors' handles */
    K.bbm(T.dark, 0.10, 0.20, hw, hw + 0.025, 1.12, 1.15);
    K.bbm(T.dark, -0.92, -0.82, hw, hw + 0.025, 1.12, 1.15);
    /* mirrors */
    for (s = -1; s <= 1; s += 2) {
      K.rod(T.dark, 0.014, [1.04, s * 1.00, 1.50], [1.04, s * 1.20, 1.66], 5);
      K.bb(T.dark, 1.01, 1.07, s * 1.20 - 0.08, s * 1.20 + 0.08, 1.60, 1.88);
    }
    /* roof team panel, front half */
    K.bb(T.team, 0.20, 0.80, -0.45, 0.45, roof, roof + 0.013);
    /* spare wheel on the tail, wire-cutter post on the bumper */
    K.cyl(T.dark, R, 0.31, 14, tail - 0.17, -0.18, 1.12, "x");
    K.cyl(T.skin, 0.20, 0.32, 12, tail - 0.17, -0.18, 1.12, "x");
    K.rod(T.dark, 0.02, [nose + 0.10, -0.30, 0.72], [nose + 0.10, -0.30, 2.18], 6);
    K.rod(T.dark, 0.012, [nose + 0.10, -0.30, 2.18], [nose - 0.12, -0.30, 2.36], 5);
    /* radio whips on the rear roof */
    K.bb(T.dark, tail + 0.10, tail + 0.30, 0.70, 0.90, roof, roof + 0.07);
    K.rod(T.dark, 0.007, [tail + 0.20, 0.80, roof + 0.07], [tail + 0.12, 0.80, 3.30], 4);
    if (isN) {
      /* present-day fit: a second whip and a jammer cluster on the roof,
         and the flat tracker antenna ahead of the turret */
      K.bb(T.dark, tail + 0.10, tail + 0.30, -0.90, -0.70, roof, roof + 0.07);
      K.rod(T.dark, 0.007, [tail + 0.20, -0.80, roof + 0.07], [tail + 0.14, -0.80, 2.90], 4);
      K.bb(T.dark, 0.88, 0.98, -0.30, 0.30, roof, roof + 0.05);
      /* the jammer rods stand behind the turret's swept circle (the box's
         corner reaches 0.78 m from the ring centre at x = -0.50), not under
         its walls, so they show at rest and the box never turns through them */
      for (i = 0; i < 3; i++) K.rod(T.dark, 0.008, [-1.50, -0.55 + i * 0.12, roof], [-1.50, -0.55 + i * 0.12, roof + 0.42 + i * 0.05], 4);
    }
    /* the turret base: a ring on the roof around the hatch */
    K.cyl(T.dark, 0.44, 0.012, 16, -0.50, 0, roof + 0.004, "z");
    K.torus(T.dark, 0.50, 0.025, -0.50, 0, roof + 0.03, 5, 20);
  }

  /* ----------------------------------------------- weapon stations */
  function turretRing(THREE, T, g) {
    /* M1025: the gun rides the ring on a swinging arm; it trains about the
       ring's centre, so the arm sweeps the hoop */
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(-0.65, 0, 1.83);
    K.cyl(T.dark, 0.05, 0.20, 8, 0, 0, 0.10, "z");
    K.bb(T.dark, -0.05, 0.45, -0.035, 0.035, 0.17, 0.215);
    K.cyl(T.dark, 0.04, 0.34, 8, 0.40, 0, 0.34, "z");
    K.bb(T.dark, 0.30, 0.50, -0.07, 0.07, 0.47, 0.55);
    m2(K, T, 0.38, 0.62);
    K.flush(tg);
    g.add(tg);
  }
  function turretGpk(THREE, T, g, roof) {
    /* the 2005 gunner's shield: a flat front plate with a glass slit either
       side of the gun, two side plates, open behind and above */
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(-0.50, 0, roof);
    K.bb(T.skin, 0.40, 0.46, -0.56, 0.56, 0.04, 0.78);
    K.bbm(T.skin, -0.34, 0.46, 0.53, 0.59, 0.04, 0.78);
    K.bbm(T.glass, 0.46, 0.47, 0.08, 0.46, 0.46, 0.68);
    K.bb(T.skin, -0.36, 0.40, -0.56, 0.56, 0.04, 0.10);
    K.cyl(T.dark, 0.04, 0.34, 8, 0.10, 0, 0.22, "z");
    K.bb(T.dark, 0.0, 0.22, -0.07, 0.07, 0.38, 0.45);
    m2(K, T, 0.22, 0.56);
    K.flush(tg);
    g.add(tg);
  }
  function turretOgpk(THREE, T, g, roof) {
    /* the enclosed box turret: armoured lower walls, glass bands in four
       corner posts, a roof over the front half, the gun out of the front */
    var tg = new THREE.Group(), K = new Baker(THREE), s, sx;
    tg.name = "turret";
    tg.position.set(-0.50, 0, roof);
    K.bb(T.skin, -0.50, 0.50, -0.60, 0.60, 0.04, 0.28);
    for (sx = -1; sx <= 1; sx += 2) for (s = -1; s <= 1; s += 2)
      K.bb(T.skin, sx * 0.50 - 0.04, sx * 0.50 + 0.04, s * 0.60 - 0.04, s * 0.60 + 0.04, 0.28, 0.66);
    K.bb(T.skin, -0.04, 0.54, -0.64, 0.64, 0.66, 0.72);
    K.bbm(T.glass, 0.505, 0.512, 0.07, 0.52, 0.32, 0.62);
    K.bbm(T.glass, -0.42, 0.42, 0.605, 0.612, 0.32, 0.62);
    K.bb(T.glass, -0.505, -0.498, -0.52, 0.52, 0.32, 0.62);
    K.bb(T.skin, -0.46, -0.04, -0.62, 0.62, 0.66, 0.70);
    K.bb(T.dark, 0.44, 0.56, -0.12, 0.12, 0.28, 0.54);
    m2(K, T, 0.60, 0.40);
    K.flush(tg);
    g.add(tg);
  }

  /* ------------------------------------------------ the M998-family hard cab */
  /* What the Avenger carrier and the shelter carrier share: the tub (bonnet,
     fenders, grille, bumpers, lamps, mirrors, bed sides), a closed cab block
     from the belt line to a flat roof, the raked windshield, door glass, the
     door seams and the team panel on the roof, and a floor under the bed so
     the arches do not show the sky.  The roof is flat and rigid in the Avenger
     photographs; the doors are drawn closed. */
  function cabHard(K, T, V) {
    var zr = 1.83, hw = V.hw, i, sx;
    tub(K, T, V);
    K.prism(T.skin, [[-0.30, 1.10], [1.04, 1.10], [0.90, zr], [-0.30, zr]], -1.00, 1.00);
    K.bb(T.skin, V.tail, -0.30, -0.78, 0.78, 0.50, 1.10);
    K.bb(T.skin, -0.30, 0.98, -0.60, 0.60, 0.50, 1.10);
    K.bb(T.skin, 0.98, 1.08, -0.62, 0.62, 0.82, 1.14);
    windshield(K, T, 1.0055, 1.28, 0.9096, 1.78, 0.95, false);
    K.bbm(T.glass, -0.06, 0.80, 1.00, 1.012, 1.36, 1.74);
    /* the door: seams ahead and behind it (above and below the belt line), the
       sill seam and the handle */
    for (i = 0; i < 2; i++) {
      sx = [0.96, -0.20][i];
      K.bbm(T.dark, sx - 0.005, sx + 0.005, 1.00, 1.010, 1.10, 1.82);
      K.bbm(T.dark, sx - 0.005, sx + 0.005, hw, hw + 0.010, 0.64, 1.20);
    }
    K.bbm(T.dark, -0.20, 0.96, hw, hw + 0.010, 0.64, 0.655);
    K.bbm(T.dark, 0.02, 0.12, hw, hw + 0.020, 1.12, 1.15);
    /* team recognition panel on the roof, front half */
    K.bb(T.team, 0.12, 0.72, -0.45, 0.45, zr, zr + 0.013);
  }

  /* ------------------------------------------------- the M1097 Avenger */
  var AV_X = -1.18, AV_Z = 1.14;        /* slew ring centre on the bed, floor + ring */
  function bodyAvenger(K, T, V) {
    cabHard(K, T, V);
    /* the slew ring the turret housing turns on */
    K.cyl(T.dark, 0.60, 0.04, 16, AV_X, 0, 1.12, "z");
  }
  /* The Avenger's gun: the FN M3P, the electrically fired .50 (the aircraft
     Browning M3): receiver on (x0, y0, z0), barrel along +X.  About 1.5 m
     overall with the 0.91 m barrel; no ammunition can is drawn, no photograph
     shows it. */
  function m3p(K, T, x0, y0, z0) {
    var d = T.dark;
    K.bb(d, x0 - 0.24, x0 + 0.24, y0 - 0.055, y0 + 0.055, z0 - 0.07, z0 + 0.075);   /* receiver */
    K.bb(d, x0 - 0.30, x0 - 0.24, y0 - 0.05, y0 + 0.05, z0 - 0.05, z0 + 0.05);      /* back plate */
    K.cyl(d, 0.0155, 0.91, 8, x0 + 0.695, y0, z0 + 0.01, "x");                      /* barrel */
    K.cyl(d, 0.022, 0.09, 8, x0 + 1.20, y0, z0 + 0.01, "x");                        /* flash hider */
    K.bb(d, x0 - 0.05, x0 + 0.15, y0 + 0.055, y0 + 0.155, z0 - 0.05, z0 + 0.05);    /* bracket to the housing */
  }
  function turretAvenger(THREE, T, g) {
    /* local origin: the ring centre on the bed; gun and pods point along +X.
       The housing is a rivetted box with a raked glass front, the pods stand on
       its sides, the FLIR is on the left, the gun low on the right. */
    var tg = new THREE.Group(), K = new Baker(THREE), s, i, j;
    tg.name = "turret";
    tg.position.set(AV_X, 0, AV_Z);
    K.prism(T.skin, [[-0.62, 0.0], [0.58, 0.0], [0.58, 0.35], [0.32, 1.30], [-0.62, 1.30]], -0.55, 0.55);
    K.bb(T.skin, -0.66, 0.40, -0.60, 0.60, 1.30, 1.35);                              /* roof */
    K.plate(T.glass, 0.584, 0.35, 0.324, 1.30, 0.016, -0.44, 0.44, "fwd");          /* the glass front */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -0.45, 1.15, s * 0.55, s * 0.97, 1.06, 1.48);                     /* the pod: 1.6 x 0.42 x 0.42 */
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++)                                /* four tube mouths */
        K.cyl(T.dark, 0.07, 0.02, 10, 1.155, s * 0.76 + (i - 0.5) * 0.19, 1.27 + (j - 0.5) * 0.19, "x");
      K.bb(T.dark, -0.56, -0.44, s * 0.40 - 0.06, s * 0.40 + 0.06, 1.35, 1.41);     /* whip base */
      K.rod(T.dark, 0.008, [-0.50, s * 0.40, 1.41], [-0.50, s * 0.40, 2.65], 4);    /* whip */
    }
    K.bb(T.dark, 0.18, 0.50, 0.55, 0.78, 0.46, 0.80);                                /* FLIR / laser box, left */
    K.cyl(T.glass, 0.07, 0.03, 12, 0.515, 0.665, 0.63, "x");                         /* its window */
    m3p(K, T, 0.12, -0.70, 0.84);                                                    /* the .50, right, under the pod */
    K.flush(tg);
    g.add(tg);
  }

  /* --------------------------------------------- the TRAFFIC JAM carrier */
  var JAM_X = -1.45, JAM_Z = 2.69;      /* mast foot on the shelter roof */
  function bodyJam(K, T, V) {
    cabHard(K, T, V);
    /* S250-type shelter on the bed: front on the cab back, rear on the tail
       plane, 2.0 m wide, 1.5 m tall, resting on the bed side walls */
    K.bb(T.skin, V.tail, -0.34, -1.00, 1.00, 1.16, 2.65);
    K.bb(T.team, -0.95, -0.42, -0.60, 0.60, 2.65, 2.663);          /* recognition panel, front half of the roof */
    K.bb(T.dark, JAM_X - 0.16, JAM_X + 0.16, -0.16, 0.16, 2.65, 2.69);   /* the mast foot */
  }
  function mastJam(THREE, T, g) {
    /* A mast and a directional broadband head: a boom along +X with five cross
       elements, longest at the back.  Generic (see the header): the form of the
       real antenna was not found. */
    var tg = new THREE.Group(), K = new Baker(THREE), i;
    var xs = [-0.60, -0.30, 0.0, 0.28, 0.54], ls = [1.50, 1.25, 1.02, 0.84, 0.70];
    tg.name = "turret";
    tg.position.set(JAM_X, 0, JAM_Z);
    K.cyl(T.dark, 0.04, 1.10, 8, 0, 0, 0.55, "z");                  /* the mast */
    K.cyl(T.dark, 0.022, 1.40, 6, 0, 0, 1.12, "x");                  /* the boom */
    for (i = 0; i < 5; i++) K.cyl(T.dark, 0.012, ls[i], 5, xs[i], 0, 1.12, "y");
    K.bb(T.dark, -0.07, 0.07, -0.07, 0.07, 1.06, 1.18);              /* the clamp where the boom meets the mast */
    K.flush(tg);
    g.add(tg);
  }

  /* --------------------------------------------------------------- build */
  function make(key) {
    return function (THREE, M, C) {
      var V = VAR[key], T = makeMats(THREE, C, V);
      var g = new THREE.Group();
      g.name = "humvee_" + key;
      var K = new Baker(THREE);
      chassis(K, T, V);
      var roof = 1.88;
      if (V.kind === "slant") bodySlant(K, T, V);
      else if (V.kind === "avenger") bodyAvenger(K, T, V);
      else if (V.kind === "jam") bodyJam(K, T, V);
      else bodyArm(K, T, V);
      K.flush(g);
      var tg = tyreGeo(THREE, V.R), s, i, axs = [V.XF, V.XR];
      for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
        var w = new THREE.Group();
        w.name = "roadwheel";
        w.position.set(axs[i], s * HALF_TRACK, V.R);
        w.add(new THREE.Mesh(tg, T.rub));
        g.add(w);
      }
      if (V.kind === "slant") turretRing(THREE, T, g);
      else if (V.kind === "avenger") turretAvenger(THREE, T, g);
      else if (V.kind === "jam") mastJam(THREE, T, g);
      else if (V.turret === "gpk") turretGpk(THREE, T, g, roof);
      else turretOgpk(THREE, T, g, roof);
      g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      return g;
    };
  }

  return { make: make };
})();

/* len is the MEASURED x extent (bumper face to tail, spare wheel included on
   the armoured pair); render3d.js normalises on the measurement. */
UNIT_MODELS["nato_e80_recon"] = { len: 4.68, build: HeroHumvee.make("e80") };
UNIT_MODELS["nato_e90_recon"] = { len: 4.68, build: HeroHumvee.make("e90") };
UNIT_MODELS["nato_e00_recon"] = { len: 5.08, build: HeroHumvee.make("e00") };
UNIT_MODELS["recon_n"] = { len: 5.08, build: HeroHumvee.make("n") };
UNIT_MODELS["nato_e90_spaag"] = { len: 4.95, build: HeroHumvee.make("av") };
UNIT_MODELS["nato_e90_ewveh"] = { len: 4.68, build: HeroHumvee.make("tj") };
