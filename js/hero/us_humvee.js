/* ===== us_humvee.js - HERO models: the AM General HMMWV and the vehicles built on it ============
   Full-quality redo (owner 2026-10-24, the US ground set).  Six keys, kept, one builder:
     nato_e80_recon  "HMMWV", e80, service 1985, turret:true, M2 .50 (js/eras.js).  The row's name is the
                     M998, but the armed member of the M998 series with a roof-mounted M2 is the M1025
                     armament carrier: DoD captions use "M998" for the whole family - [P4] is captioned
                     an M998 and is an M1025 slant-back with the ring and M2.  So the M1025 is drawn.
     nato_e90_recon  "M1025/M1026 Armament Carrier HMMWV", e90: the same truck (it did not change).
     nato_e00_recon  "M1151 HMMWV Expanded Capacity Armament Carrier", service 2005: the armoured body
                     with the gunner's shield (GPK) over the ring.
     recon_n         "M1151 HMMWV (armed)", present day: the same body with the enclosed box turret
                     (OGPK) and a second whip.
     nato_e90_spaag  "M1097 Avenger Pedestal Mounted Stinger", e90, service 1990.
     nato_e90_ewveh  "AN/TLQ-17A TRAFFIC JAM on the HMMWV", e90, service 1991.
   Build names kept: HeroHumvee.make, read by nothing else.

   Published (kept from the old header, confirmed): M998 15 ft x 7 ft 1 in x 6 ft (4.57 x 2.16 x 1.83 m),
     wheelbase 130 in (3.30 m), track 71.5 in, 36 x 12.5R16.5 tyres (en.wikipedia Humvee); M1114/M1151
     about 4.9 x 2.3 x 1.9 m on 37 in tyres, 5.5 t (AM General); Avenger 4.95 x 2.18 x 2.64 m, 3,900 kg,
     two Stinger pods of four, the FN M3P, the FLIR, on the M1097 heavy HMMWV (en.wikipedia Avenger).
   TRAFFIC JAM (GlobalSecurity "AN/TLQ-17A(V), TRAFFICJAM" [G]): the (V)1 was two M151 jeeps and trailers;
     the (V)3 "housed the electronics in an S-250 shelter" on the CUCV, and the CUCV was replaced by the
     HMMWV (fielding FY90-92; deployed to Desert Storm; 66 systems).  Its photograph [G1] shows the
     antenna: a log-periodic array of about fourteen VERTICAL dipoles on a horizontal boom, longest at
     one end, on one mast.

   References (Wikimedia Commons at width 960 unless noted; cached in the scratchpad q_humvee_ref):
     [D1] "M1151.png" - side drawing of the M1151 (nose left, used mirrored): the STATION SOURCE.
          110.9 px a metre on the 3.30 m wheelbase; bumper 2.21, tail -2.48, pintle -2.63 (axles at
          +-1.65), bonnet 1.14 m at the nose and 1.34 at the cowl, roof 1.87, sill 0.44, door foot 0.63,
          armour windows 1.31-1.58, the slant from x -1.19 to the tail at 1.33, louvres -1.42..-2.14.
     [D2] "HMMWV SECM.png" - side drawing of a two-door shelter carrier: the cab and the box on the bed.
     [P1] "A left front view of a US Army M998 High-Mobility Multipurpose Wheeled Vehicle" (DoD, DPLA) -
          front-left, NATO three-colour: the front clip, nine-slot grille, round headlamps, amber lamps.
     [P2] "HMMWV armament carrier M1025.jpg" - square side, three-colour: the slant-back, four doors with
          the pressed X, the raked windshield; the profile of the first-generation body.
     [P3] "M1151 HMMWV.jpg" (2015, tan) - front-left: armoured doors and glass, the GPK shield.
     [P4] "An airman mans the M-2 .50-caliber machine gun mounted atop an M998 ..." (DoD, DPLA) - an
          M1025 with the roof ring and the M2, three-colour.
     [P5] "A view of an Avenger air defense system ... during Operation Desert Shield" (DoD, DPLA, 1990) -
          the M1097 Avenger from the side in three-colour: the two-door hard cab, the housing behind it.
     [P6] "HMMWV uparmoured M1114.jpg" - the up-armoured body from the front-left.
     [P7] "M1097 Avenger AA-System.jpg" (USMC) - front: the housing, both pods, the FLIR under the left pod.
     [G1] globalsecurity.org/military/systems/ground/images/an-tlq-17-s.jpg - the TRAFFIC JAM antenna.

   Recognition list (what each rests on; where it is in the code):
     1. Low and wide on four big tyres standing out at the corners, axles 3.30 m apart [D1][P2]: XF/XR, tyreGeo.
     2. The one-piece front clip: bonnet sloping 1.34 -> 1.14 m to the nose, full-width fenders with chamfered
        outer top edges, the bonnet centre a little proud, the black vent on its rear [D1][P1][P3]: BON, frontClip.
     3. The grille face: nine vertical slots, a round headlamp either side, amber lamps outboard [P1][P3][P7].
     4. The square-topped front wheel opening, the fender's trailing edge sweeping down to the sill [D1][P2].
     5. The deep black bumper with the two tow shackles; the pintle hook behind [P1][P7][D1]: frontClip, rearEnd.
     6. The slant-back: flat roof to behind the rear doors, then the long slope to the tail [D1][P2][P4].
     7. The doors: four with the pressed X and big windows on the M1025 [P1][P2]; thick flat armoured doors
        with small windows and outside hinges on the M1151 [D1][P3]: door().
     8. The windshield: raked two-pane on the M1025 [P2]; near-upright armoured on the M1151 [D1][P3].
     9. The M1151's louvred panel on the slant-back side and the intake stack at the right of the cowl [D1].
    10. The weapon station: the M1025's roof ring with the M2 [P4]; the GPK shield [P3]; the OGPK box.
    11. The geared hubs: the wheel face with eight nuts and the hub cap, which turn with the tyre [D1][P1].
    12. Avenger: two-door hard cab, the turret on the bed - housing with the raked glass front, a pod of four
        each side (2 x 2 mouths), the M3P low on the right, the FLIR on the left, two whips [P5][P7].
    13. TRAFFIC JAM: the S-250 shelter on the bed [G][D2] and the vertical-element log-periodic array [G1].
   Paint (from dated photographs): NATO three-colour CARC for every 1980s-90s row ([P1][P2][P4], and the
     Avenger in Desert Shield, 1990 [P5]); sampled off [P2] green #697761, brown #665845, black #353a39,
     drawn at about 0.8.  Desert tan for the armoured pair, as [P3] shows (door in sun #bbb29e, drawn
     #a1977a).  No markings, numbers, bumper codes or plates ([P3]'s and [P7]'s are not drawn).

   CORRECTED against the old file: the old body was one slab at one width with a box for a bonnet; the front
     clip is now lofted from [D1]'s bonnet line and [P1]'s section, the fenders stand full width over the
     tyres and the doors are inset.  The old TRAFFIC JAM antenna was a horizontal Yagi, a guess; [G1] shows
     a log-periodic array with vertical elements, now drawn.  The old e80 was in MERDC woodland and the old
     e90 in tan: the 1985-1990 photographs found all show the NATO three-colour.  The old M1151 carried a
     spare wheel on the tail and a wire-cutter post: neither is in [D1] or [P3], both removed.  The armoured
     turret ring moves forward to x -0.35, over the rear doors as [D1] draws it.
   NOT confirmed (drawn as stated): where the TRAFFIC JAM mast stands and how tall it is (on the shelter
     roof, the array 1.25 m above it); the shelter's size (read off [D2]'s proportions on this cab); the
     Avenger's 4.95 m is met with the rear overhang read long (the split is not published); the OGPK box
     (kept from the old file's M1165A1 photograph, not re-checked); the M3P position (under the right pod).
   DATA NOTES (reported, not changed): armour_specs nato_e80_recon says turret "none" and height 1.8 while
     eras.js gives turret:true and an M2; armour_specs nato_e90_recon says camo "desert".

   Meshes: everything fixed is baked, one merged mesh per material (8 materials: skin with the canvas paint,
     dark, tyre, glass, team, white, amber and red lamps); the four tyres are "roadwheel" groups (axle on
     local Y); the weapon station, the Avenger turret and the TRAFFIC JAM array are the named "turret"
     (origin on the ring or mast, along +X).  12-14 draw calls, 6,400-6,600 triangles.  The team material
     is exactly C.team, on a top-facing roof (or shelter) panel.
   Model space: +X nose, +Y left, +Z up, real metres, tyres on z = 0.  Colours authored in sRGB and left to
   prepModel() to linearise.  ASCII only.
   DETAIL PASS 2 (the owner: the models looked plainer than the old ones): hvDetail() on every body (dpKit through the Baker, no new material); the skin takes dpWeather.
     e80 / e90 6608 -> 7664 tris (12 draw calls), e00 6552 -> 7624 (14), n 6620 -> 7692 (14), av 6484 -> 7316
     (14), tj 6584 -> 7416 (12).  make() and its keys unchanged.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHumvee = (function () {
  "use strict";

  /* ------------------------------------------------------------ variants */
  /* Stations off the M1151 side drawing [D1] (110.9 px a metre on the 3.30 m wheelbase; the
     axles at +-1.65) and, for the first-generation body, the M1025 side photograph [P2].
     R: tyre radius (36 in first generation, 37 in on the armoured family); nose: grille face;
     bump: bumper face; tail: rear body face; pint: the pintle hook; hwF: half width over the
     front clip; hwS: half width of the body sides (the doors); roof: roof top. */
  var XF = 1.65, XR = -1.65;
  var VAR = {
    e80: { kind: "slant", paint: "nato", R: 0.457, nose: 2.16, bump: 2.21, tail: -2.28, pint: -2.36,
           hwF: 1.08, hwS: 1.03, roof: 1.83 },
    e90: { kind: "slant", paint: "nato", R: 0.457, nose: 2.16, bump: 2.21, tail: -2.28, pint: -2.36,
           hwF: 1.08, hwS: 1.03, roof: 1.83 },
    e00: { kind: "arm", paint: "tan", R: 0.470, nose: 2.19, bump: 2.245, tail: -2.48, pint: -2.62,
           hwF: 1.15, hwS: 1.12, roof: 1.87, turret: "gpk" },
    n:   { kind: "arm", paint: "tan2", R: 0.470, nose: 2.19, bump: 2.245, tail: -2.48, pint: -2.62,
           hwF: 1.15, hwS: 1.12, roof: 1.87, turret: "ogpk" },
    /* the M1097 heavy HMMWV with the Avenger: 4.95 m on the fact sheet, so its tail is longer
       than the M1025's (read off [P5], the rear bumper about 0.75 m behind the rear axle) */
    av:  { kind: "avenger", paint: "nato", R: 0.457, nose: 2.21, bump: 2.26, tail: -2.45, pint: -2.62,
           hwF: 1.08, hwS: 1.03, roof: 1.83 },
    /* the shelter carrier of the TRAFFIC JAM (the M998-family two-door cab) */
    tj:  { kind: "jam", paint: "nato", R: 0.457, nose: 2.16, bump: 2.21, tail: -2.28, pint: -2.36,
           hwF: 1.08, hwS: 1.03, roof: 1.83 }
  };
  var TW = 0.318;          /* 12.5 in section width */
  var HALF_TRACK = 0.908;  /* 71.5 in track */

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* --------------------------------------------------------------- paint */
  /* Cached per paint kind: build() runs once per key, team and era.  The skin is mapped by
     world position (4.6 m to the canvas), so the pattern runs on from a door into the fender.
     "nato": the NATO three-colour CARC of [P1][P2][P4][P5] - green, brown and black in big
     hard-edged patches.  Sampled off [P2] in daylight: green #697761, brown #665845, black
     #353a39; drawn at about 0.8 of that (#515c45, #54473a, #262a29).
     "tan": CARC desert tan as [P3][P6] show (door in sun #bbb29e, drawn #a1977a), with dust. */
  var _cv = {};
  function blob(q, R, cx, cy, rad, sx, n) {
    var i, a, r, px, py;
    q.beginPath();
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2 + R() * 0.3; r = rad * (0.6 + R() * 0.6);
      px = cx + Math.cos(a) * r * sx; py = cy + Math.sin(a) * r;
      if (i === 0) q.moveTo(px, py); else q.lineTo(px, py);
    }
    q.closePath(); q.fill();
  }
  function paint(kind) {
    if (_cv[kind]) return _cv[kind];
    var R = rng(kind === "nato" ? 8801 : (kind === "tan" ? 9902 : 7703)), W = 256, H = 256, i, k, gr, x, y;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    if (kind === "nato") {
      q.fillStyle = "#515c45"; q.fillRect(0, 0, W, H);
      /* brown first, black over it: the pattern's black runs as narrower bands across the
         brown and green fields; drawn three times shifted so the canvas tiles */
      var cols = ["#54473a", "#54473a", "#262a29"];
      for (i = 0; i < 21; i++) {
        q.fillStyle = cols[i % 3];
        x = R() * W; y = R() * H;
        var rad = (i % 3 === 2) ? 16 + R() * 12 : 24 + R() * 22, sx = 1.3 + R() * 0.9;
        for (k = 0; k < 9; k++) {
          var ox = ((k % 3) - 1) * W, oy = (Math.floor(k / 3) - 1) * H;
          blob(q, rng(i * 977 + 13), x + ox, y + oy, rad, sx, 7);
        }
      }
    } else {
      q.fillStyle = (kind === "tan") ? "#a1977a" : "#a69c7e"; q.fillRect(0, 0, W, H);
      for (i = 0; i < 26; i++) {
        q.fillStyle = (i % 2) ? "rgba(236,222,186,0.10)" : "rgba(96,76,44,0.09)";
        q.fillRect(R() * W, R() * H, 20 + R() * 70, 12 + R() * 40);
      }
    }
    /* rubbed paint, rain streaks and grime */
    for (i = 0; i < 40; i++) {
      q.fillStyle = (i % 3) ? "rgba(20,20,14,0.07)" : "rgba(170,160,130,0.06)";
      q.fillRect(R() * W, R() * H, 1 + R() * 2, 20 + R() * 60);
    }
    q.fillStyle = "rgba(20,18,12,0.30)";
    for (i = 0; i < 40; i++) q.fillRect(R() * W, R() * H, 2, 2);
    /* road dust on the lowest part of every side */
    gr = q.createLinearGradient(0, H * 0.78, 0, H);
    gr.addColorStop(0, "rgba(150,126,92,0.00)");
    gr.addColorStop(1, "rgba(150,126,92,0.45)");
    q.fillStyle = gr; q.fillRect(0, H * 0.78, W, H * 0.22);
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
  /* skin (painted aluminium and steel), dark (black steel, seats, bezels, guns), rub (tyres),
     glass, team, lamp (white), lampA (amber), lampR (tail).  Eight. */
  function makeMats(THREE, C, V) {
    var T = {};
    var st = canvasTex(THREE, paint(V.paint));
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (st) T.skin.map = st; else T.skin.color.setHex(V.paint === "nato" ? 0x515c45 : 0xa1977a);
    T.skin.userData.worldUV = 4.6;
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24261f, roughness: 0.78, metalness: 0.22 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x181817, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.12, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xcfc9ac, roughness: 0.3, metalness: 0.1,
                                              emissive: 0x2a2814, emissiveIntensity: 0.7 });
    T.lampA = new THREE.MeshStandardMaterial({ color: 0xc87a1a, roughness: 0.35, metalness: 0.1,
                                               emissive: 0x3a2206, emissiveIntensity: 0.7 });
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

  /* A loft through convex rings of [x, y, z] (same count, all wound the same way), fan-capped
     at both ends; the faces are turned outward by the signed volume, as ru_kamaz.js does. */
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

  /* ------------------------------------------------------------ the tyre */
  /* 36 x 12.5R16.5 (37 in on the armoured family): a lathe about the local Y axle (bead,
     bulging sidewall, shoulder, flat crown) with twenty block lugs on the crown, so the tyre
     notches its own outline and a turning wheel shows.  On the outer face, the parts that turn
     with it: the eight wheel nuts and the hub cap over the geared hub [D1][P1]. */
  function tyreGeo(THREE, R, side) {
    var S = { p: [], n: [] }, seg = 20, h = TW / 2, rc = R - 0.026, i, j, k = R / 0.457;
    var prof = [[0.215, -0.095], [0.262, -0.146], [0.336, -h], [0.405 * k, -0.150], [0.438 * k, -0.126], [rc, -0.105],
                [rc, 0.105], [0.438 * k, 0.126], [0.405 * k, 0.150], [0.336, h], [0.262, 0.146], [0.215, 0.095]];
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
    var parts = [geoFrom(THREE, S)], lug = 20, g, m;
    function put(geo, x, y, z, ry) {
      geo.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)), new THREE.Vector3(1, 1, 1)));
      parts.push(geo.index ? geo.toNonIndexed() : geo);
    }
    for (j = 0; j < lug; j++) {
      var a = (j + 0.5) / lug * Math.PI * 2;
      put(new THREE.BoxGeometry(0.034, 0.225, 0.062), Math.cos(a) * (rc + 0.010), 0, Math.sin(a) * (rc + 0.010), -a);
    }
    /* outer face (local +Y is outboard on the port wheels, -Y on the starboard ones) */
    var sy = side;
    for (j = 0; j < 8; j++) {
      var b = j / 8 * Math.PI * 2;
      put(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 6), Math.cos(b) * 0.135, sy * 0.112, Math.sin(b) * 0.135);
    }
    put(new THREE.CylinderGeometry(0.07, 0.085, 0.05, 10), 0, sy * 0.118, 0);
    /* DETAIL PASS 3: the two-piece rim's bolt ring that clamps the run-flat insert (twelve bolts on
       the outer rim half), the rim flange, the geared hub's cover bolts round the cap and the CTIS
       valve stem and its hose to the hub (nuts, flange and stem turn with the tyre) */
    for (j = 0; j < 12; j++) {
      var bb2 = (j + 0.5) / 12 * Math.PI * 2;
      put(new THREE.CylinderGeometry(0.011, 0.011, 0.024, 4), Math.cos(bb2) * 0.195, sy * 0.104, Math.sin(bb2) * 0.195);
    }
    g = new THREE.TorusGeometry(0.212, 0.009, 4, 24); g.rotateX(Math.PI / 2); g.translate(0, sy * 0.098, 0); parts.push(g.toNonIndexed());
    for (j = 0; j < 6; j++) {
      var bc = j / 6 * Math.PI * 2 + 0.26;
      put(new THREE.CylinderGeometry(0.009, 0.009, 0.02, 5), Math.cos(bc) * 0.092, sy * 0.142, Math.sin(bc) * 0.092);
    }
    put(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 5), 0.16, sy * 0.12, 0.02, Math.PI / 2);
    m = new THREE.CylinderGeometry(0.006, 0.006, 0.13, 4); m.rotateZ(Math.PI / 2); m.translate(0.095, sy * 0.135, 0.02); parts.push(m.toNonIndexed());
    var n = 0, o = 0, q;
    for (q = 0; q < parts.length; q++) n += parts[q].attributes.position.count;
    var P = new Float32Array(n * 3), N = new Float32Array(n * 3);
    for (q = 0; q < parts.length; q++) {
      P.set(parts[q].attributes.position.array, o * 3);
      N.set(parts[q].attributes.normal.array, o * 3);
      o += parts[q].attributes.position.count;
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

  /* the windshield: two panes either side of the centre post, in its frame */
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
  /* ------------------------------------------------------- shared chassis */
  /* belly pan (16 in ground clearance), axle beams, the differentials, the geared hub-reduction
     housings at each wheel, the shafts, the exhaust; the painted rims stand still, the nuts and
     hub caps turn with the tyre */
  function chassis(K, T, V) {
    var R = V.R, ax, s, i, ys = [XF, XR];
    K.bb(T.dark, XR - 0.35, XF + 0.35, -0.62, 0.62, 0.41, 0.52);
    for (i = 0; i < 2; i++) {
      ax = ys[i];
      K.cyl(T.dark, 0.045, 1.55, 8, ax, 0, R, "y");
      K.bb(T.dark, ax - 0.20, ax + 0.20, -0.22, 0.22, 0.42, 0.62);
      for (s = -1; s <= 1; s += 2) {
        K.bb(T.dark, ax - 0.13, ax + 0.13, s * 0.60, s * 0.74, R - 0.12, R + 0.16);
        K.cyl(T.skin, 0.222, 0.20, 12, ax, s * HALF_TRACK, R, "y");
        K.cyl(T.skin, 0.17, 0.012, 12, ax, s * (HALF_TRACK + 0.102), R, "y");
      }
    }
    K.rod(T.dark, 0.03, [XR, 0, 0.50], [XF, 0, 0.50], 6);
    K.rod(T.dark, 0.035, [XR - 0.1, -0.40, 0.46], [XR + 0.9, -0.40, 0.46], 6);
  }

  /* ------------------------------------------------------- the front clip */
  /* The one-piece tilting bonnet and fenders.  The top is lofted through the stations below:
     the bonnet line off [D1] (1.14 m at the nose, 1.34 at the cowl), the section off the front
     photographs [P1][P3] - full width, the outer top edges chamfered, the bonnet centre a little
     proud of the fender tops, the black vent at its rear.  Under it: the grille face with the
     two round headlamps either side of the vertical-slot grille, amber lamps outboard on the
     fender fronts, and the fender sides with the square-topped wheel opening and the trailing
     edge that sweeps down and back to the sill [D1][P2]. */
  var BON = [   /* back from the nose (m), bonnet centre z, fender top z */
    [0.00, 1.075, 1.055], [0.05, 1.140, 1.110], [0.45, 1.190, 1.155],
    [0.85, 1.250, 1.205], [1.25, 1.335, 1.280]
  ];
  var ZCLIP = 0.98;          /* underside of the clip over the tyres */
  function frontClip(K, T, V) {
    var nose = V.nose, hw = V.hwF, R = V.R, i, s, st, x, Rg = [];
    for (i = 0; i < BON.length; i++) {
      st = BON[i]; x = nose - st[0];
      Rg.push([[x, -hw, ZCLIP], [x, hw, ZCLIP], [x, hw, st[2] - 0.08], [x, hw - 0.08, st[2]], [x, 0.50, st[2]],
               [x, 0.42, st[1]], [x, -0.42, st[1]], [x, -0.50, st[2]], [x, -hw + 0.08, st[2]], [x, -hw, st[2] - 0.08]]);
    }
    K.loft(T.skin, Rg);
    var cowl = nose - 1.25;
    function zb(x) { var t = (nose - x) / 1.25; return BON[0][1] + (BON[4][1] - BON[0][1]) * Math.max(0, Math.min(1, t)) + 0.004; }
    /* the black vent on the rear of the bonnet [P1][P3] */
    K.plate(T.dark, cowl + 0.10, zb(cowl + 0.10) + 0.004, cowl + 0.55, zb(cowl + 0.55) + 0.004, 0.012, -0.36, 0.36, "up");
    for (i = 0; i < 6; i++) {
      x = cowl + 0.14 + i * 0.07;
      K.bb(T.skin, x - 0.008, x + 0.008, -0.34, 0.34, zb(x) + 0.004, zb(x) + 0.022);
    }
    /* fender sides: ahead of the wheel a sliver down to the bumper, behind it the trailing
       edge to the sill; the opening between them is square-topped at the clip's underside */
    var d = 0.60, xa = Math.sqrt(d * d - (ZCLIP - R) * (ZCLIP - R));
    var fr = [[nose, ZCLIP], [XF + xa, ZCLIP]], rr = [[XF - xa, ZCLIP]];
    for (i = 1; i <= 4; i++) {
      var zz = ZCLIP - i * (ZCLIP - 0.62) / 4, dx = Math.sqrt(Math.max(0, d * d - (zz - R) * (zz - R)));
      if (XF + dx < nose) fr.push([XF + dx, zz]);
      rr.push([XF - dx, zz]);
    }
    fr.push([nose, Math.max(0.62, R + Math.sqrt(Math.max(0, d * d - (nose - XF) * (nose - XF))))]);
    rr.push([XF - d + 0.02, 0.52], [0.80, 0.45], [cowl - 0.02, 0.98]);
    for (s = -1; s <= 1; s += 2) {
      K.prism(T.skin, fr, s > 0 ? hw - 0.035 : -hw, s > 0 ? hw : -hw + 0.035);
      K.prism(T.skin, rr, s > 0 ? hw - 0.035 : -hw, s > 0 ? hw : -hw + 0.035);
      /* the fender's front face outboard of the headlamps, with the amber lamp */
      K.bb(T.skin, nose - 0.04, nose, s * 0.60, s * hw, fr[fr.length - 1][1], ZCLIP);
      K.bb(T.lampA, nose, nose + 0.012, s * (hw - 0.30), s * (hw - 0.16), 0.86, 0.94);
      /* black wheel-well liner, seen through the opening */
      K.bb(T.dark, XF - 0.62, nose - 0.002, s * 0.58, s * 0.72, 0.52, ZCLIP);
    }
    /* the radiator block between the wells and the grille face */
    K.bb(T.dark, cowl, nose - 0.02, -0.58, 0.58, 0.50, ZCLIP);
    K.bb(T.skin, nose - 0.02, nose, -0.60, 0.60, 0.62, ZCLIP + 0.02);
    /* the grille: nine slots between the bars [P1][P3] */
    K.bb(T.dark, nose, nose + 0.010, -0.37, 0.37, 0.66, 0.97);
    for (i = -4; i <= 4; i++) K.bb(T.skin, nose + 0.010, nose + 0.024, i * 0.082 - 0.018, i * 0.082 + 0.018, 0.68, 0.95);
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.105, 0.03, 16, nose + 0.005, s * 0.485, 0.84, "x");
      K.cyl(T.lamp, 0.085, 0.034, 16, nose + 0.012, s * 0.485, 0.84, "x");
    }
    /* bumper: a deep channel, its ends turned back, two tow shackles; the lifting eyes */
    K.bb(T.dark, nose - 0.04, V.bump, -(hw - 0.10), hw - 0.10, 0.50, 0.68);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, nose - 0.20, nose - 0.04, s * (hw - 0.22), s * (hw - 0.10), 0.52, 0.66);
      K.torus(T.dark, 0.045, 0.012, V.bump + 0.02, s * 0.62, 0.58, 4, 10);
    }
  }

  /* ------------------------------------------- the body sides: one profile */
  /* the whole side of the body as one extrusion: windshield, roof and slant-back (or the cab
     back and the bed) and the rear wheel opening cut through; door glass and seams on top */
  function rearArch(V, zs, tail) {
    var a = arch(XR, V.R, 0.60, zs, tail), out = [], i;
    for (i = a.length - 1; i >= 0; i--) out.push(a[i]);
    return out;   /* front to back */
  }
  function sideProfile(V, top) {
    var pts = [[V.nose - 1.27, 0.98]], a = rearArch(V, 0.52, V.tail), i;
    for (i = 0; i < top.length; i++) pts.push(top[i]);
    pts.push([V.tail, 0.62]);
    for (i = a.length - 1; i >= 0; i--) pts.push(a[i]);
    pts.push([0.82, 0.45]);
    return pts;
  }
  function sideSkin(K, T, V, pts) {
    K.prism(T.skin, pts, -V.hwS, V.hwS);
    /* the rear wheel houses, black, closing the openings the profile cuts through */
    K.bb(T.dark, XR - 0.62, XR + 0.62, -0.72, 0.72, 0.50, 1.12);
  }
  /* door: seams, the glass (an armour window on the M1151), the handle, the pressed X of the
     first-generation door [P1][P2] */
  function door(K, T, V, x0, x1, zw0, zw1, xw0, xw1, zTop, pressX) {
    var y = V.hwS, s;
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * y, y1 = s * (y + 0.010);
      K.bb(T.dark, x0 - 0.006, x0 + 0.006, y0, y1, 0.60, zTop);
      K.bb(T.dark, x1 - 0.006, x1 + 0.006, y0, y1, 0.60, zTop);
      K.bb(T.dark, x1, x0, y0, y1, 0.60, 0.612);
      K.bb(T.glass, xw1, xw0, y0, s * (y + 0.012), zw0, zw1);
      K.bb(T.dark, x1 + 0.10, x1 + 0.22, y0, s * (y + 0.025), zw0 - 0.17, zw0 - 0.14);
      if (pressX) {
        K.rod(T.dark, 0.009, [x0 - 0.07, s * (y + 0.006), 0.68], [x1 + 0.07, s * (y + 0.006), zw0 - 0.08], 4);
        K.rod(T.dark, 0.009, [x1 + 0.07, s * (y + 0.006), 0.68], [x0 - 0.07, s * (y + 0.006), zw0 - 0.08], 4);
      }
    }
  }
  function windshieldAt(K, T, V, xf, zf, xh, zh, dark) {
    windshield(K, T, xf + 0.01, zf, xh + 0.01, zh, V.hwS - 0.06, dark);
  }
  function mirrors(K, T, V, x, z) {
    for (var s = -1; s <= 1; s += 2) {
      K.rod(T.dark, 0.013, [x, s * V.hwS, z], [x, s * (V.hwS + 0.12), z + 0.12], 5);
      K.bb(T.dark, x - 0.03, x + 0.03, s * (V.hwS + 0.07), s * (V.hwS + 0.19), z + 0.04, z + 0.32);
    }
  }
  function rearEnd(K, T, V) {
    var s, tail = V.tail;
    K.bb(T.dark, tail - 0.10, tail + 0.04, -(V.hwS - 0.05), V.hwS - 0.05, 0.50, 0.66);
    K.bb(T.dark, V.pint, tail - 0.10, -0.06, 0.06, 0.53, 0.62);
    K.torus(T.dark, 0.05, 0.014, V.pint + 0.03, 0, 0.58, 4, 10);
    for (s = -1; s <= 1; s += 2) K.bb(T.lampR, tail - 0.012, tail, s * (V.hwS - 0.20), s * (V.hwS - 0.06), 0.74, 0.90);
  }

  /* --------------------------------------------- the M1025 slant-back */
  /* [P2][P4]: the raked windshield in its frame, a flat roof to behind the rear doors, the
     slant-back down to the tailgate; four doors with the pressed X; the roof ring and hatch */
  var RING_SLANT = -0.60;
  function bodySlant(K, T, V) {
    var zr = V.roof;
    frontClip(K, T, V);
    var top = [[V.nose - 1.25, 1.30], [0.68, 1.79], [0.62, zr], [-1.08, zr], [-1.16, zr - 0.04], [V.tail + 0.04, 1.22], [V.tail, 1.18]];
    sideSkin(K, T, V, sideProfile(V, top));
    windshieldAt(K, T, V, V.nose - 1.25, 1.31, 0.68, 1.79, false);
    door(K, T, V, 0.86, -0.06, 1.36, 1.72, 0.72, 0.06, 1.80, true);
    door(K, T, V, -0.06, -0.92, 1.36, 1.72, -0.16, -0.84, 1.80, true);
    mirrors(K, T, V, 0.84, 1.36);
    rearEnd(K, T, V);
    /* the tailgate's two hinges and the rear lid's seam */
    K.bb(T.dark, V.tail - 0.012, V.tail, -0.80, 0.80, 1.10, 1.12);
    /* team panel on the roof's front half */
    K.bb(T.team, 0.05, 0.55, -0.45, 0.45, zr, zr + 0.013);
    /* roof ring: the hoop on its posts around the hatch */
    K.cyl(T.dark, 0.40, 0.004, 14, RING_SLANT, 0, zr + 0.002, "z");
    K.torus(T.dark, 0.45, 0.02, RING_SLANT, 0, zr + 0.16, 5, 20);
    for (var i = 0; i < 4; i++) {
      var a = i * Math.PI / 2 + Math.PI / 4;
      K.rod(T.dark, 0.016, [RING_SLANT + 0.45 * Math.cos(a), 0.45 * Math.sin(a), zr], [RING_SLANT + 0.45 * Math.cos(a), 0.45 * Math.sin(a), zr + 0.16], 5);
    }
    /* the radio whip on its mount at the right rear [P2][P4] */
    K.bb(T.dark, -1.30, -1.14, -(V.hwS - 0.18), -(V.hwS - 0.02), 1.42, 1.52);
    K.rod(T.dark, 0.007, [-1.22, -(V.hwS - 0.10), 1.52], [-1.30, -(V.hwS - 0.10), 3.00], 4);
  }

  /* ---------------------------------------------- the M1151 armoured body */
  /* [D1][P3][P6]: the near-upright armoured windshield, thick flat doors with small armour
     windows, the slant-back with the louvred panel on its side, the air intake stack at the
     right of the cowl, the turret ring over the rear doors */
  var RING_ARM = -0.35;
  function bodyArm(K, T, V) {
    var zr = V.roof, isN = V.turret === "ogpk", i, s;
    frontClip(K, T, V);
    var top = [[V.nose - 1.25, 1.33], [0.82, 1.82], [0.78, zr], [-1.19, zr], [-1.24, zr - 0.04], [V.tail + 0.05, 1.36], [V.tail, 1.32]];
    sideSkin(K, T, V, sideProfile(V, top));
    windshieldAt(K, T, V, V.nose - 1.25, 1.36, 0.82, 1.80, true);
    door(K, T, V, 0.74, -0.29, 1.31, 1.58, 0.55, 0.05, 1.82, false);
    door(K, T, V, -0.29, -1.24, 1.31, 1.58, -0.44, -0.94, 1.82, false);
    mirrors(K, T, V, 0.80, 1.40);
    rearEnd(K, T, V);
    for (s = -1; s <= 1; s += 2) {
      /* the louvred panel on the slant-back side [D1] */
      K.bb(T.dark, -2.14, -1.42, s * V.hwS, s * (V.hwS + 0.008), 1.31, 1.50);
      for (i = 0; i < 7; i++) K.bb(T.skin, -2.10 + i * 0.10, -2.06 + i * 0.10, s * V.hwS, s * (V.hwS + 0.016), 1.32, 1.49);
      /* the door hinges, outside on the armoured doors */
      K.bb(T.dark, 0.70, 0.76, s * V.hwS, s * (V.hwS + 0.03), 1.05, 1.12);
      K.bb(T.dark, -0.33, -0.27, s * V.hwS, s * (V.hwS + 0.03), 1.05, 1.12);
    }
    /* the intake stack at the right of the cowl [D1] */
    K.cyl(T.skin, 0.065, 0.95, 10, 0.88, -(V.hwS - 0.10), 1.43, "z");
    K.cyl(T.dark, 0.08, 0.10, 10, 0.88, -(V.hwS - 0.10), 1.93, "z");
    K.bb(T.team, 0.10, 0.62, -0.45, 0.45, zr, zr + 0.013);
    /* the turret ring around the hatch */
    K.cyl(T.dark, 0.48, 0.03, 18, RING_ARM, 0, zr + 0.015, "z");
    /* radio whip at the right rear; the present-day truck carries a second one at the left */
    K.bb(T.dark, -1.18, -1.02, -(V.hwS - 0.18), -(V.hwS - 0.02), zr - 0.02, zr + 0.06);
    K.rod(T.dark, 0.007, [-1.10, -(V.hwS - 0.10), zr + 0.06], [-1.18, -(V.hwS - 0.10), 3.30], 4);
    if (isN) {
      K.bb(T.dark, -1.18, -1.02, V.hwS - 0.18, V.hwS - 0.02, zr - 0.02, zr + 0.06);
      K.rod(T.dark, 0.007, [-1.10, V.hwS - 0.10, zr + 0.06], [-1.16, V.hwS - 0.10, 3.00], 4);
    }
  }

  /* ------------------------------------------------ the two-door hard cab */
  /* the M1097 and the shelter carrier: the cab to behind the front doors, then the bed walls */
  var CAB_BACK = -0.30;
  function bodyCab(K, T, V) {
    var zr = V.roof;
    frontClip(K, T, V);
    var top = [[V.nose - 1.25, 1.30], [0.68, 1.79], [0.62, zr], [CAB_BACK, zr], [CAB_BACK, 1.12], [V.tail, 1.12]];
    sideSkin(K, T, V, sideProfile(V, top));
    windshieldAt(K, T, V, V.nose - 1.25, 1.31, 0.68, 1.79, false);
    door(K, T, V, 0.86, -0.22, 1.36, 1.72, 0.72, -0.10, 1.80, true);
    mirrors(K, T, V, 0.84, 1.36);
    rearEnd(K, T, V);
    /* the cab's back window */
    K.bb(T.glass, CAB_BACK - 0.012, CAB_BACK, -0.60, 0.60, 1.42, 1.70);
    K.bb(T.team, 0.00, 0.50, -0.45, 0.45, zr, zr + 0.013);
  }

  /* ------------------------------------------------- the M1097 Avenger */
  var AV_X = -1.25, AV_Z = 1.12;        /* slew ring centre on the bed */
  function bodyAvenger(K, T, V) {
    bodyCab(K, T, V);
    K.cyl(T.dark, 0.60, 0.04, 16, AV_X, 0, 1.12, "z");
    /* the gunner's step and the rear-quarter grab handles [P5] */
    K.bb(T.dark, V.tail - 0.02, V.tail + 0.10, -0.40, 0.40, 0.70, 0.74);
  }

  /* ----------------------------------------------- weapon stations */
  function turretRing(THREE, T, g, roof) {
    /* M1025: the gun rides the ring on a swinging arm; it trains about the
       ring's centre, so the arm sweeps the hoop */
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(RING_SLANT, 0, roof);
    K.cyl(T.dark, 0.05, 0.20, 8, 0, 0, 0.10, "z");
    K.bb(T.dark, -0.05, 0.45, -0.035, 0.035, 0.17, 0.215);
    K.cyl(T.dark, 0.04, 0.34, 8, 0.40, 0, 0.34, "z");
    K.bb(T.dark, 0.30, 0.50, -0.07, 0.07, 0.47, 0.55);
    m2(K, T, 0.38, 0.62);
    /* DETAIL PASS 3: the cradle's pintle and elevation lock, the belt, the sights; the ring's
       bolts and its traverse lock */
    m2Detail(K, T, 0.38, 0.62);
    K.cyl(T.dark, 0.03, 0.06, 8, 0.40, 0, 0.53, "z");
    K.rod(T.dark, 0.01, [0.40, 0.05, 0.50], [0.30, 0.10, 0.45], 4);
    ringDetail(K, T, 0.45, 0.0, 12);
    K.flush(tg);
    g.add(tg);
  }
  function turretGpk(THREE, T, g, roof) {
    /* the 2005 gunner's shield: a flat front plate with a glass slit either
       side of the gun, two side plates, open behind and above */
    var tg = new THREE.Group(), K = new Baker(THREE);
    tg.name = "turret";
    tg.position.set(RING_ARM, 0, roof);
    K.bb(T.skin, 0.40, 0.46, -0.56, 0.56, 0.04, 0.78);
    K.bbm(T.skin, -0.02, 0.46, 0.53, 0.59, 0.04, 0.78);   /* short side wings [P3][P6] */
    K.bbm(T.glass, 0.46, 0.47, 0.08, 0.46, 0.46, 0.68);
    K.bb(T.skin, -0.36, 0.40, -0.56, 0.56, 0.04, 0.10);
    K.cyl(T.dark, 0.04, 0.34, 8, 0.10, 0, 0.22, "z");
    K.bb(T.dark, 0.0, 0.22, -0.07, 0.07, 0.38, 0.45);
    m2(K, T, 0.22, 0.56);
    /* DETAIL PASS 3: the ring's bolts, traverse lock and handle; the shield's bolt rows and the
       frames of its glass blocks, the gun's shield plate, the belt and sights, a brass bag */
    m2Detail(K, T, 0.22, 0.56);
    ringDetail(K, T, 0.45, 0.04, 16);
    for (var bi = 0; bi < 9; bi++) {
      var by = -0.50 + bi * 0.125;
      K.bb(T.dark, 0.455, 0.47, by - 0.012, by + 0.012, 0.74, 0.76);
      K.bb(T.dark, 0.455, 0.47, by - 0.012, by + 0.012, 0.08, 0.10);
    }
    K.bbm(T.dark, 0.455, 0.475, 0.06, 0.48, 0.44, 0.46);
    K.bbm(T.dark, 0.455, 0.475, 0.06, 0.48, 0.68, 0.70);
    K.bbm(T.dark, 0.455, 0.475, 0.06, 0.08, 0.46, 0.68);
    K.bbm(T.dark, 0.455, 0.475, 0.46, 0.48, 0.46, 0.68);
    K.bb(T.skin, 0.40, 0.55, -0.16, 0.16, 0.44, 0.47);
    K.bb(T.dark, 0.10, 0.26, -0.20, -0.08, 0.40, 0.50);
    K.flush(tg);
    g.add(tg);
  }
  function turretOgpk(THREE, T, g, roof) {
    /* the enclosed box turret: armoured lower walls, glass bands in four
       corner posts, a roof over the front half, the gun out of the front */
    var tg = new THREE.Group(), K = new Baker(THREE), s, sx;
    tg.name = "turret";
    tg.position.set(RING_ARM, 0, roof);
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
    /* DETAIL PASS 3: the ring's bolts and traverse handle, the corner posts' bolts, the roof's
       grab handles and its hatch hinge, the glass blocks' frames, the belt and sights */
    m2Detail(K, T, 0.60, 0.40);
    ringDetail(K, T, 0.46, 0.04, 16);
    for (sx = -1; sx <= 1; sx += 2) for (s = -1; s <= 1; s += 2) for (var bz = 0; bz < 3; bz++)
      K.bb(T.dark, sx * 0.54 - 0.012, sx * 0.54 + 0.012, s * 0.64 - 0.012, s * 0.64 + 0.012, 0.34 + bz * 0.12, 0.36 + bz * 0.12);
    for (s = -1; s <= 1; s += 2) K.rod(T.dark, 0.011, [0.10, s * 0.30, 0.72], [0.40, s * 0.30, 0.72], 4);
    K.cyl(T.dark, 0.018, 1.10, 8, -0.04, 0, 0.72, "y");
    K.bbm(T.dark, 0.508, 0.518, 0.06, 0.53, 0.31, 0.33);
    K.bbm(T.dark, 0.508, 0.518, 0.06, 0.53, 0.61, 0.63);
    K.bbm(T.dark, -0.43, 0.43, 0.61, 0.62, 0.31, 0.33);
    K.bbm(T.dark, -0.43, 0.43, 0.61, 0.62, 0.61, 0.63);
    K.flush(tg);
    g.add(tg);
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
  /* GlobalSecurity [G]: the AN/TLQ-17A(V)3 housed its electronics in an S-250 shelter, first on
     the CUCV and from FY90-92 on the HMMWV; its photograph [G1] shows the antenna - a
     log-periodic array of about fourteen VERTICAL elements on a horizontal boom, the longest at
     one end, on a single mast.  The shelter on the bed and the array on its mast are drawn; where
     the mast stands on the vehicle is not shown in any source found, so it stands on the shelter
     roof (the trained node: the array turns to its target). */
  var JAM_X = -1.30, JAM_Z = 2.65;
  function bodyJam(K, T, V) {
    bodyCab(K, T, V);
    /* the S-250-type shelter: on the bed from the cab back to the tail, 2.0 m wide; skid rails,
       the door on the back with its hinges and handle, the lifting eyes at the roof corners */
    var x0 = CAB_BACK - 0.04, x1 = V.tail, s, i;
    K.bb(T.skin, x1, x0, -1.00, 1.00, 1.12, 2.65);
    K.bb(T.dark, x1, x0, -0.95, -0.85, 1.06, 1.12);
    K.bb(T.dark, x1, x0, 0.85, 0.95, 1.06, 1.12);
    K.bb(T.dark, x1 - 0.012, x1, -0.40, 0.40, 1.22, 2.50);
    K.bb(T.skin, x1 - 0.020, x1 - 0.012, -0.37, 0.37, 1.25, 2.47);
    K.bb(T.dark, x1 - 0.04, x1 - 0.02, 0.20, 0.30, 1.80, 1.84);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) K.torus(T.dark, 0.04, 0.012, i ? x1 + 0.06 : x0 - 0.06, s * 0.94, 2.69, 4, 10);
      /* the corner posts the shelter's sides are framed by */
      K.bb(T.skin, x0 - 0.03, x0 + 0.005, s * 0.97, s * 1.005, 1.12, 2.65);
      K.bb(T.skin, x1 - 0.005, x1 + 0.03, s * 0.97, s * 1.005, 1.12, 2.65);
    }
    K.bb(T.team, -0.95, -0.42, -0.60, 0.60, 2.65, 2.663);
    K.cyl(T.dark, 0.10, 0.04, 10, JAM_X, 0, 2.67, "z");
  }
  function mastJam(THREE, T, g) {
    var tg = new THREE.Group(), K = new Baker(THREE), i, n = 14;
    tg.name = "turret";
    tg.position.set(JAM_X, 0, JAM_Z);
    K.cyl(T.dark, 0.035, 1.25, 8, 0, 0, 0.625, "z");                 /* the mast */
    K.cyl(T.dark, 0.022, 1.70, 6, 0, 0, 1.25, "x");                  /* the boom */
    for (i = 0; i < n; i++) {                                         /* vertical dipoles, longest at the back */
      var x = -0.80 + i * 1.60 / (n - 1), hl = 0.62 - i * (0.62 - 0.32) / (n - 1);
      K.cyl(T.dark, 0.008, hl * 2, 4, x, 0, 1.25, "z");
    }
    K.bb(T.dark, -0.06, 0.06, -0.05, 0.05, 1.18, 1.31);               /* the clamp on the mast head */
    K.flush(tg);
    g.add(tg);
  }

  /* ---------------------------------------------------------------- DETAIL PASS 2: the fittings kit
     Built on this module's own box(bin, x0, x1, y0, y1, z0, z1) and cyl(bin, A, B, r0, r1, seg); every
     part lands in the bin it is handed, so the draw calls do not grow.  s = +1 the left (+Y) side, a
     part on a side face stands off the face y = ys outward.  Sizes are by proportion (NOT CONFIRMED):
     the 20 l jerrycan 0.345 x 0.165 x 0.47 m, tool handles 0.03-0.04 m, tow cable 0.028 m. */
  function dpKit(box, cyl) {
    var TAU = 2 * Math.PI;
    function oy(s, ys, t0, t1) { return s > 0 ? [ys + t0, ys + t1] : [ys - t1, ys - t0]; }
    function bar(b, A, B, r, seg) { cyl(b, A, B, r, r, seg || 6); }
    var D = {
      bar: bar, oy: oy,
      /* a bolt row along X on the side face ys */
      bolts: function (b, x0, x1, n, ys, z, s, r) {
        r = r || 0.013; var i, x, q = oy(s, ys, -0.004, r * 1.1);
        for (i = 0; i < n; i++) { x = n > 1 ? x0 + (x1 - x0) * i / (n - 1) : x0; box(b, x - r, x + r, q[0], q[1], z - r, z + r); }
      },
      /* a bolt row along X on a top face z, or along Y when y1 is given */
      boltsTop: function (b, x0, x1, n, y0, y1, z, r) {
        r = r || 0.013; var i, t;
        for (i = 0; i < n; i++) { t = n > 1 ? i / (n - 1) : 0; var x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t; box(b, x - r, x + r, y - r, y + r, z - 0.004, z + r * 1.1); }
      },
      /* a door hinge on a side face: the barrel up the face and its two leaves */
      hinge: function (b, x, ys, z0, z1, s) {
        var q = oy(s, ys, 0, 0.022);
        cyl(b, [x, (q[0] + q[1]) / 2, z0], [x, (q[0] + q[1]) / 2, z1], 0.02, 0.02, 8);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.15, z0 + (z1 - z0) * 0.35);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.65, z0 + (z1 - z0) * 0.85);
      },
      /* a hatch hinge on a roof: the barrel along X or Y */
      hingeTop: function (b, x0, x1, y0, y1, z) { cyl(b, [x0, y0, z + 0.02], [x1, y1, z + 0.02], 0.022, 0.022, 8); },
      /* a U grab handle standing off the side face ys, along X */
      grab: function (b, s, ys, x0, x1, z) {
        var q = oy(s, ys, 0, 0.055), yf = s > 0 ? q[1] - 0.012 : q[0] + 0.012;
        bar(b, [x0, ys, z], [x0, yf, z], 0.011, 5); bar(b, [x1, ys, z], [x1, yf, z], 0.011, 5);
        bar(b, [x0, yf, z], [x1, yf, z], 0.011, 5);
      },
      /* a U grab handle on a top face z, along X (or Y with y1) */
      grabTop: function (b, x0, x1, y0, y1, z) {
        bar(b, [x0, y0, z], [x0, y0, z + 0.055], 0.011, 5); bar(b, [x1, y1, z], [x1, y1, z + 0.055], 0.011, 5);
        bar(b, [x0, y0, z + 0.055], [x1, y1, z + 0.055], 0.011, 5);
      },
      /* a U grab handle on a face across X (front or rear), dir = +1 the face looks to +X */
      grabX: function (b, xs, dir, y0, y1, z) {
        var xf = xs + dir * 0.05;
        bar(b, [xs, y0, z], [xf, y0, z], 0.011, 5); bar(b, [xs, y1, z], [xf, y1, z], 0.011, 5);
        bar(b, [xf, y0, z], [xf, y1, z], 0.011, 5);
      },
      /* a wire guard over a lamp on a face across X (dir +1 looks forward): three bars and two hoops */
      guard: function (b, x, y, z, r, dir) {
        var i, xf = x + dir * (r * 0.9);
        for (i = -1; i <= 1; i++) bar(b, [x, y + i * r * 0.65, z + r * 1.2], [xf, y + i * r * 0.65, z], 0.008, 4);
        for (i = -1; i <= 1; i++) bar(b, [xf, y + i * r * 0.65, z], [x, y + i * r * 0.65, z - r * 1.2], 0.008, 4);
        bar(b, [x, y - r * 1.25, z + r * 1.2], [x, y + r * 1.25, z + r * 1.2], 0.009, 4);
        bar(b, [x, y - r * 1.25, z - r * 1.2], [x, y + r * 1.25, z - r * 1.2], 0.009, 4);
        bar(b, [xf, y - r * 0.7, z], [xf, y + r * 0.7, z], 0.008, 4);
      },
      /* a 20 l jerrycan standing in its bracket against the side face ys (x its centre, z0 its foot) */
      jerry: function (bP, bD, x, ys, z0, s) {
        var q = oy(s, ys, 0.012, 0.177), yf = s > 0 ? q[1] : q[0];
        box(bP, x - 0.172, x + 0.172, q[0], q[1], z0, z0 + 0.47);
        /* the pressed X on its face and the rim */
        var yr = s > 0 ? [yf, yf + 0.006] : [yf - 0.006, yf];
        bar(bP, [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        bar(bP, [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        /* the three handles and the spout on top */
        var yc = (q[0] + q[1]) / 2, i;
        for (i = -1; i <= 1; i++) box(bD, x + i * 0.07 - 0.012, x + i * 0.07 + 0.012, yc - 0.05, yc + 0.05, z0 + 0.47, z0 + 0.50);
        cyl(bD, [x + 0.13, yc, z0 + 0.47], [x + 0.13, yc, z0 + 0.52], 0.022, 0.022, 6);
        /* the bracket: a foot tray and the strap round it */
        box(bD, x - 0.19, x + 0.19, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z0 - 0.025, z0);
        box(bD, x - 0.19, x + 0.19, s > 0 ? q[1] : q[0] - 0.008, s > 0 ? q[1] + 0.008 : q[0], z0 + 0.30, z0 + 0.33);
      },
      /* a pioneer tool clipped along X on the side face ys (kind: "shovel", "pick", "axe", "bar") */
      tool: function (bH, bM, kind, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.06), y = (q[0] + q[1]) / 2, L = x1 - x0, dir = L > 0 ? 1 : -1;
        bar(bH, [x0, y, z], [x1, y, z], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.008, y + 0.008, z - 0.11, z + 0.11);
          bar(bH, [x0, y, z - 0.06], [x0, y, z + 0.06], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y, z - 0.30], [x1, y, z + 0.30], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.012, y + 0.012, z - 0.04, z + 0.15);
        }
        /* the clamps */
        var c, qa = oy(s, ys, 0, 0.07);
        for (c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, qa[0], qa[1], z - 0.035, z + 0.035); }
      },
      /* the same lying flat on a top face z, the handle along X at y (the blade and the pick head flat) */
      toolTop: function (bH, bM, kind, x0, x1, y, z) {
        var L = x1 - x0, dir = L > 0 ? 1 : -1, zc = z + 0.022;
        bar(bH, [x0, y, zc], [x1, y, zc], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.11, y + 0.11, z + 0.004, z + 0.02);
          bar(bH, [x0, y - 0.06, zc], [x0, y + 0.06, zc], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y - 0.30, zc], [x1, y + 0.30, zc], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.04, y + 0.15, z + 0.01, z + 0.034);
        }
        for (var c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, y - 0.035, y + 0.035, z, z + 0.05); }
      },
      /* a tow cable along X on the side face ys: two strands, the eyes and three clips */
      cable: function (b, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.07), y = (q[0] + q[1]) / 2, i, a, k;
        bar(b, [x0 + 0.08, y, z + 0.025], [x1 - 0.08, y, z + 0.025], 0.016, 6);
        bar(b, [x0 + 0.08, y, z - 0.025], [x1 - 0.08, y, z - 0.025], 0.016, 6);
        for (k = 0; k < 2; k++) {
          var xe = k ? x1 - 0.06 : x0 + 0.06;
          for (i = 0; i < 6; i++) { a = i / 6 * TAU; var b2 = (i + 1) / 6 * TAU;
            bar(b, [xe + Math.cos(a) * 0.06, y, z + Math.sin(a) * 0.06], [xe + Math.cos(b2) * 0.06, y, z + Math.sin(b2) * 0.06], 0.014, 4); }
        }
        for (i = 1; i <= 3; i++) { var xc = x0 + (x1 - x0) * i / 4; box(b, xc - 0.03, xc + 0.03, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z - 0.06, z + 0.06); }
      },
      /* a stowage bin: the box, its lid's lip, the hinge along the top and two latches on the face s */
      stow: function (bP, bD, x0, x1, y0, y1, z0, z1, s) {
        box(bP, x0, x1, y0, y1, z0, z1);
        box(bP, x0 - 0.015, x1 + 0.015, y0 - 0.015, y1 + 0.015, z1 - 0.035, z1 + 0.012);
        var yi = s > 0 ? y0 : y1, yf = s > 0 ? y1 : y0, k;
        cyl(bD, [x0 + 0.05, yi, z1 + 0.012], [x1 - 0.05, yi, z1 + 0.012], 0.018, 0.018, 6);
        for (k = 0; k < 2; k++) { var xl = x0 + (x1 - x0) * (0.25 + k * 0.5);
          box(bD, xl - 0.025, xl + 0.025, s > 0 ? yf : yf - 0.02, s > 0 ? yf + 0.02 : yf, z1 - 0.13, z1 - 0.04); }
      },
      /* a rolled tarpaulin or camouflage net along X, with three straps */
      roll: function (bP, bD, x0, x1, y, z, r) {
        cyl(bP, [x0, y, z], [x1, y, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var x = x0 + (x1 - x0) * (0.15 + i * 0.35); cyl(bD, [x - 0.025, y, z], [x + 0.025, y, z], r + 0.012, r + 0.012, 12); }
      },
      /* the same rolled across Y */
      rollY: function (bP, bD, x, y0, y1, z, r) {
        cyl(bP, [x, y0, z], [x, y1, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var y = y0 + (y1 - y0) * (0.15 + i * 0.35); cyl(bD, [x, y - 0.025, z], [x, y + 0.025, z], r + 0.012, r + 0.012, 12); }
      },
      /* an aerial base: the mount, the spring and the stub of the mast (h, at most 0.5 m: the
         engine's era kit and sling clearances read the model's height, so no full-length whip) */
      whip: function (b, x, y, z, h) {
        h = Math.min(h || 0.4, 0.5);
        cyl(b, [x, y, z], [x, y, z + 0.09], 0.05, 0.042, 8);
        cyl(b, [x, y, z + 0.09], [x, y, z + 0.22], 0.024, 0.024, 6);
        cyl(b, [x, y, z + 0.22], [x, y, z + h], 0.011, 0.008, 4);
      },
      /* a mudflap hanging across X behind a wheel */
      flap: function (b, x, y0, y1, z0, z1) { box(b, x - 0.008, x + 0.008, y0, y1, z0, z1); },
      /* hub nuts round a wheel centre on the outer face y (axis along Y), ring radius R */
      nuts: function (b, x, y, z, R, n, s, r) {
        r = r || 0.018; var i, a;
        for (i = 0; i < n; i++) { a = i / n * TAU; cyl(b, [x + Math.cos(a) * R, y, z + Math.sin(a) * R], [x + Math.cos(a) * R, y + s * 0.025, z + Math.sin(a) * R], r, r, 6); }
      },
      /* grille slats across a top face, n of them along X */
      slats: function (b, x0, x1, y0, y1, z, n) {
        for (var i = 0; i < n; i++) { var x = x0 + (x1 - x0) * (i + 0.5) / n; box(b, x - 0.012, x + 0.012, y0, y1, z, z + 0.025); }
        box(b, x0 - 0.02, x1 + 0.02, y0 - 0.02, y0, z, z + 0.03); box(b, x0 - 0.02, x1 + 0.02, y1, y1 + 0.02, z, z + 0.03);
      },
      /* louvres on a side face ys: n slats along Z */
      louvres: function (b, x0, x1, ys, z0, z1, n, s) {
        var q = oy(s, ys, 0, 0.022);
        for (var i = 0; i < n; i++) { var z = z0 + (z1 - z0) * (i + 0.5) / n; box(b, x0, x1, q[0], q[1], z - 0.012, z + 0.012); }
        box(b, x0 - 0.02, x0, q[0], q[1], z0, z1); box(b, x1, x1 + 0.02, q[0], q[1], z0, z1);
      },
      /* a round hatch on a roof: the lid, the hinge and the handle */
      hatch: function (bP, bD, x, y, z, r, hy) {
        cyl(bP, [x, y, z], [x, y, z + 0.045], r, r * 0.97, 16);
        cyl(bD, [x, y, z + 0.045], [x, y, z + 0.055], r * 0.55, r * 0.5, 12);
        var h = hy || 1;
        cyl(bD, [x - r * 0.5, y + h * (r + 0.02), z + 0.03], [x + r * 0.5, y + h * (r + 0.02), z + 0.03], 0.028, 0.028, 8);
        bar(bD, [x - r * 0.3, y - h * r * 0.3, z + 0.06], [x + r * 0.3, y - h * r * 0.3, z + 0.06], 0.012, 5);
      },
      /* a periscope / vision block on a roof looking along dir (+1 forward): body and glass */
      vblock: function (bD, bG, x, y, z, w, dir) {
        box(bD, x - 0.07, x + 0.07, y - w / 2, y + w / 2, z, z + 0.09);
        var xf = x + dir * 0.07;
        box(bG, Math.min(xf, xf + dir * 0.008), Math.max(xf, xf + dir * 0.008), y - w / 2 + 0.015, y + w / 2 - 0.015, z + 0.02, z + 0.07);
        box(bD, x - 0.09, x + 0.09, y - w / 2 - 0.01, y + w / 2 + 0.01, z + 0.09, z + 0.11);
      },
      /* a towing hook or pintle on a face across X (dir +1 looks forward) */
      /* (L, default 0.19 m, the reach in front of the face; kept inside the model's old length) */
      hook: function (b, xs, y, z, dir, L) {
        var k = (L || 0.19) / 0.19;
        box(b, Math.min(xs, xs + dir * 0.05 * k), Math.max(xs, xs + dir * 0.05 * k), y - 0.09, y + 0.09, z - 0.10, z + 0.10);
        cyl(b, [xs + dir * 0.05 * k, y, z], [xs + dir * 0.16 * k, y, z], 0.035, 0.035, 8);
        cyl(b, [xs + dir * 0.16 * k, y, z - 0.07], [xs + dir * 0.16 * k, y, z + 0.05], 0.03, 0.03, 8);
        cyl(b, [xs + dir * 0.12 * k, y - 0.05, z + 0.06], [xs + dir * 0.12 * k, y + 0.05, z + 0.06], 0.015, 0.015, 5);
      },
      /* a lifting eye on a top face */
      eye: function (b, x, y, z, alongY) {
        if (alongY) box(b, x - 0.012, x + 0.012, y - 0.04, y + 0.04, z - 0.005, z + 0.06);
        else box(b, x - 0.04, x + 0.04, y - 0.012, y + 0.012, z - 0.005, z + 0.06);
      },
      /* an exhaust: the pipe from A to B with its silencer drum part way and a cap */
      exhaust: function (b, A, B, r, at) {
        var t = at === undefined ? 0.5 : at, M = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t];
        cyl(b, A, B, r, r, 8);
        var d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), k = Math.min(0.2, l * 0.25) / l;
        cyl(b, [M[0] - d[0] * k, M[1] - d[1] * k, M[2] - d[2] * k], [M[0] + d[0] * k, M[1] + d[1] * k, M[2] + d[2] * k], r * 2.1, r * 2.1, 10);
        cyl(b, B, [B[0] + d[0] / l * 0.03, B[1] + d[1] / l * 0.03, B[2] + d[2] / l * 0.03], r * 1.3, r * 1.3, 8);
      },
      /* a rack of rails standing on a top face: frame posts and two rails (a basket) */
      basket: function (b, x0, x1, y0, y1, z0, h) {
        var i, n = Math.max(2, Math.round((x1 - x0) / 0.3) + 1), x;
        for (i = 0; i < n; i++) { x = x0 + (x1 - x0) * i / (n - 1);
          bar(b, [x, y0, z0], [x, y0, z0 + h], 0.012, 4); bar(b, [x, y1, z0], [x, y1, z0 + h], 0.012, 4); }
        bar(b, [x0, y0, z0 + h], [x1, y0, z0 + h], 0.013, 4); bar(b, [x0, y1, z0 + h], [x1, y1, z0 + h], 0.013, 4);
        bar(b, [x0, y0, z0 + h * 0.5], [x1, y0, z0 + h * 0.5], 0.01, 4); bar(b, [x0, y1, z0 + h * 0.5], [x1, y1, z0 + h * 0.5], 0.01, 4);
        bar(b, [x0, y0, z0 + h], [x0, y1, z0 + h], 0.013, 4); bar(b, [x1, y0, z0 + h], [x1, y1, z0 + h], 0.013, 4);
      },
      /* kit bags / rucksacks stowed in a basket: lumpy boxes, strapped */
      bags: function (bP, bD, x0, x1, y0, y1, z0, h, seed) {
        var r = (seed || 7) >>> 0, n = Math.max(2, Math.round((x1 - x0) / 0.45)), i;
        function R() { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; return r / 4294967296; }
        for (i = 0; i < n; i++) {
          var a = x0 + (x1 - x0) * i / n + 0.02, c = x0 + (x1 - x0) * (i + 1) / n - 0.02, hh = h * (0.6 + R() * 0.4), w = (y1 - y0) * (0.75 + R() * 0.2), yc = (y0 + y1) / 2 + (R() - 0.5) * 0.06;
          box(bP, a, c, yc - w / 2, yc + w / 2, z0, z0 + hh);
          box(bD, (a + c) / 2 - 0.02, (a + c) / 2 + 0.02, yc - w / 2 - 0.006, yc + w / 2 + 0.006, z0, z0 + hh + 0.006);
        }
      }
    };
    return D;
  }
  /* DETAIL PASS 2: the weathered paint.  The module's own paint canvas (or a flat base colour) drawn
     onto a 512 px tile, then plate seams with a lit edge, bolt rows along some of them, access-panel
     outlines with corner screws, rain streaks, grime and dust, chipped paint and oil spots.  Plain
     paint: no markings, numbers or camouflage.  Cached per source. */
  var __DPW = {};
  function dpWeather(THREE, src, base, seed) {
    var key = (src && src.uuid ? src.uuid : "flat") + "|" + base + "|" + seed;
    if (__DPW[key] !== undefined) return __DPW[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, i, k, x, y, w, h, n, xs = [];
      var rs = (seed * 7 + 13) >>> 0, R = function () { rs = (Math.imul(rs, 1664525) + 1013904223) >>> 0; return rs / 4294967296; };
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = base || "#555544"; q.fillRect(0, 0, S, S);
      if (src && src.image) { try { q.drawImage(src.image, 0, 0, S, S); } catch (e) { /* flat base */ } }
      /* plate seams: four vertical butts, horizontal seams staggered between them, a bolt row on some */
      for (i = 0; i < 4; i++) xs.push(Math.floor(i * 128 + 20 + R() * 80) + 0.5);
      for (i = 0; i < 4; i++) {
        q.globalAlpha = 1; q.strokeStyle = "rgba(14,15,10,0.42)"; q.lineWidth = 2;
        q.beginPath(); q.moveTo(xs[i], 0); q.lineTo(xs[i], S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.12)"; q.lineWidth = 1;
        q.beginPath(); q.moveTo(xs[i] + 2, 0); q.lineTo(xs[i] + 2, S); q.stroke();
        y = Math.floor(60 + R() * 120) + 0.5;
        for (k = 0; k < 2; k++) {
          var xa = xs[i], xb = i < 3 ? xs[i + 1] : xs[0] + S;
          q.strokeStyle = "rgba(14,15,10,0.38)"; q.lineWidth = 2;
          q.beginPath(); q.moveTo(xa, y); q.lineTo(xb, y); q.stroke();
          q.beginPath(); q.moveTo(xa - S, y); q.lineTo(xb - S, y); q.stroke();
          q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1;
          q.beginPath(); q.moveTo(xa, y + 2); q.lineTo(xb, y + 2); q.stroke();
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      /* rain streaks, grime and dust, chips and scratches, oil spots */
      for (i = 0; i < 260; i++) { q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)"; q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54); }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, 2 * Math.PI); q.fill();
      }
      for (i = 0; i < 180; i++) { q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)"; n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n); }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      for (i = 0; i < 8; i++) { q.fillStyle = "rgba(12,10,6,0.16)"; q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, 2 * Math.PI); q.fill(); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (src && src.repeat && t.repeat) t.repeat.copy(src.repeat);
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    __DPW[key] = t;
    return t;
  }
  /* ------------------------------------------------------------ DETAIL PASS 2
     The fittings the first pass left out, on every body (classes [P1]-[P6] show; places and sizes by
     proportion, NOT CONFIRMED): the bonnet's four rubber T-latches, the lifting shackles at the bonnet's
     front corners, the side marker lamps, the wipers, the mudflaps behind all four wheels, the hinges of
     the doors, the rain gutter along the roof, the tailgate's hinges, the rear bumperettes, the guards
     over the tail lamps, the tie-down rings; the kit bags strapped on the slant-back of the armoured
     trucks.  Built on the kit's fittings (dpKit) through the Baker; no new material. */
  function dpFor(K) {
    var THREE = K.T;
    return dpKit(function (m, x0, x1, y0, y1, z0, z1) { K.bb(m, x0, x1, y0, y1, z0, z1); },
      function (m, A, B, r0, r1, seg) {
        var d = new THREE.Vector3(B[0] - A[0], B[1] - A[1], B[2] - A[2]), len = d.length();
        if (len < 1e-6) return;
        d.normalize();
        var g = new THREE.CylinderGeometry(r1, r0, len, seg || 6);
        g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3((A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2),
          new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d), new THREE.Vector3(1, 1, 1)));
        K.add(m, g);
      });
  }
  function hvDetail(K, T, V) {
    var DP = dpFor(K), D = T.dark, S = T.skin, s, i, nose = V.nose, cowl = nose - 1.25, hw = V.hwF, ys = V.hwS;
    var zr = V.kind === "slant" || V.kind === "arm" ? V.roof : null;
    for (s = -1; s <= 1; s += 2) {
      /* the bonnet's T-latches on the fender sides, the lifting shackles at its front corners */
      K.bb(D, nose - 0.30, nose - 0.24, s * hw, s * (hw + 0.025), 1.00, 1.08);
      K.bb(D, cowl + 0.10, cowl + 0.16, s * hw, s * (hw + 0.025), 0.98, 1.06);
      K.torus(D, 0.035, 0.010, nose - 0.10, s * (hw - 0.14), 1.11, 4, 8);
      /* the side marker lamp on the fender */
      K.bb(T.lampA, nose - 0.45, nose - 0.37, s * hw, s * (hw + 0.012), 0.90, 0.94);
      /* the wiper on the windscreen */
      DP.bar(D, [nose - 1.22, s * 0.15, 1.37], [nose - 1.30, s * 0.55, 1.62], 0.009, 4);
      /* the mudflaps behind the four wheels */
      DP.flap(D, XF - 0.62, s > 0 ? 0.74 : -hw + 0.02, s > 0 ? hw - 0.02 : -0.74, 0.30, 0.64);
      DP.flap(D, XR - 0.64, s > 0 ? 0.74 : -ys + 0.02, s > 0 ? ys - 0.02 : -0.74, 0.30, 0.60);
      /* the rear bumperettes, the guards over the tail lamps, tie-down rings at the corners */
      K.bb(D, V.tail - 0.06, V.tail + 0.10, s * (ys - 0.22), s * (ys - 0.04), 0.46, 0.52);
      DP.guard(D, V.tail + 0.02, s * (ys - 0.13), 0.82, 0.07, -1);
      K.torus(D, 0.035, 0.010, V.tail + 0.15, s * (ys + 0.012), 0.70, 4, 8);
      /* the rain gutter along the roof edge */
      if (zr) K.bb(D, V.kind === "slant" ? -1.08 : -1.19, V.kind === "slant" ? 0.62 : 0.78, s * (ys - 0.012), s * (ys + 0.012), zr - 0.04, zr - 0.02);
      /* the door hinges of the first-generation doors */
      if (V.kind !== "arm") {
        DP.hinge(D, 0.88, s * ys, 0.90, 1.70, s);
        if (V.kind === "slant") DP.hinge(D, -0.04, s * ys, 0.90, 1.70, s);
      }
    }
    if (V.kind === "slant") {
      /* the tailgate's hinges and the lid's handles */
      for (s = -1; s <= 1; s += 2) { DP.hingeTop(D, V.tail + 0.02, V.tail + 0.02, s * 0.45, s * 0.75, 1.13); K.bb(D, V.tail - 0.02, V.tail, s * 0.30 - 0.06, s * 0.30 + 0.06, 0.95, 0.99); }
    }
    if (V.kind === "arm") {
      /* the kit bags and a camouflage net strapped on the slant-back, the tailgate's hinges */
      var a = Math.atan2(1.36 - V.roof, (V.tail + 0.05) - (-1.24)), xm = -1.75, zm = V.roof + (xm + 1.24) * Math.tan(a);
      for (i = 0; i < 3; i++) {
        var xb = -1.45 - i * 0.30, zb = V.roof + (xb + 1.24) * Math.tan(a);
        K.bb(T.skin, xb - 0.13, xb + 0.13, -0.85 + i * 0.12, 0.05 + i * 0.12, zb - 0.02, zb + 0.22 - i * 0.04);
        K.bb(D, xb - 0.02, xb + 0.02, -0.87 + i * 0.12, 0.07 + i * 0.12, zb - 0.02, zb + 0.23 - i * 0.04);
      }
      DP.rollY(S, D, xm - 0.05, 0.20, 0.95, zm + 0.11, 0.10);
      for (s = -1; s <= 1; s += 2) DP.hingeTop(D, V.tail + 0.03, V.tail + 0.03, s * 0.45, s * 0.75, 1.32);
    }
  }
  /* ------------------------------------------------------------ DETAIL PASS 3 (2026-11, POLICY 10)
     The fittings still missing after pass 2, on every body ([P1]-[P7] show the classes; places and
     sizes by proportion, NOT CONFIRMED): paddle door handles with their lock barrels, the second
     (upper) outside hinge and the hinge pins of the armoured doors; mirror glass and a lower brace
     on each mirror arm; the black-out drive lamp in its guard on the left fender and the black-out
     markers beside the headlamps; the grille's surround and centre bar, the bonnet's hinge pins
     and hold-down hooks; the front tow brackets behind the shackles with their bolts, the rear
     lifting shackles; the fuel filler on the right rear quarter, the trailer socket; the muffler
     and tail pipe under the right side; a spring and tuner box at each whip mount; ammunition cans
     strapped by the M1025's roof ring.  No new material, so the draw calls do not grow. */
  function hvDetail3(K, T, V) {
    var DP = dpFor(K), D = T.dark, s, i, nose = V.nose, hw = V.hwF, ys = V.hwS, zr = V.roof;
    var doors = V.kind === "slant" ? [[0.86, -0.06], [-0.06, -0.92]] : V.kind === "arm" ? [[0.74, -0.29], [-0.29, -1.24]] : [[0.86, -0.22]];
    var zh = V.kind === "arm" ? 1.16 : 1.22;
    for (s = -1; s <= 1; s += 2) {
      doors.forEach(function (d) {
        var x1 = d[1], q = DP.oy(s, ys, 0.012, 0.045);
        /* the paddle handle in its recess and the lock barrel beside it */
        K.bb(D, x1 + 0.08, x1 + 0.24, s * ys, s * (ys + 0.008), zh - 0.035, zh + 0.035);
        K.bb(D, x1 + 0.10, x1 + 0.22, q[0], q[1], zh - 0.015, zh + 0.012);
        K.cyl(D, 0.014, 0.025, 8, x1 + 0.29, s * (ys + 0.012), zh, "y");
        if (V.kind === "arm") {
          /* the second, upper hinge and both hinge pins */
          K.bb(D, d[0] - 0.04, d[0] + 0.02, s * ys, s * (ys + 0.03), 1.48, 1.55);
          K.cyl(D, 0.016, 0.12, 8, d[0] + 0.005, s * (ys + 0.034), 1.085, "z");
          K.cyl(D, 0.016, 0.12, 8, d[0] + 0.005, s * (ys + 0.034), 1.515, "z");
        }
      });
      /* the mirror glass and a lower brace */
      var mx = V.kind === "arm" ? 0.80 : 0.84, mz = V.kind === "arm" ? 1.40 : 1.36;
      K.bb(T.glass, mx + 0.031, mx + 0.036, s * (V.hwS + 0.08), s * (V.hwS + 0.18), mz + 0.06, mz + 0.30);
      K.rod(D, 0.009, [mx, s * V.hwS, mz - 0.10], [mx, s * (V.hwS + 0.13), mz + 0.05], 4);
      /* the black-out markers beside the headlamps */
      K.bb(T.lampA, nose, nose + 0.012, s * 0.62, s * 0.68, 0.70, 0.75);
      /* the front tow brackets behind the shackles, four bolts each; the rear lifting shackles */
      K.bb(D, V.bump - 0.03, V.bump + 0.012, s * 0.56, s * 0.68, 0.53, 0.65);
      DP.boltsTop(D, V.bump + 0.012, V.bump + 0.012, 2, s * 0.58, s * 0.66, 0.635, 0.009);
      DP.boltsTop(D, V.bump + 0.012, V.bump + 0.012, 2, s * 0.58, s * 0.66, 0.545, 0.009);
      K.torus(D, 0.04, 0.011, V.tail - 0.03, s * (ys - 0.13), 0.45, 4, 10);
      /* the bonnet's hinge pins at the nose and its hold-down hooks at the cowl */
      K.cyl(D, 0.016, 0.10, 8, nose - 0.06, s * 0.50, 1.07, "y");
      K.bb(D, nose - 1.21, nose - 1.17, s * (hw - 0.04), s * (hw + 0.015), 1.12, 1.24);
    }
    /* the black-out drive lamp on the left fender top, in its guard */
    K.bb(T.lamp, nose - 0.10, nose - 0.04, hw - 0.26, hw - 0.12, 1.08, 1.14);
    K.bb(D, nose - 0.16, nose - 0.10, hw - 0.27, hw - 0.11, 1.06, 1.15);
    DP.guard(D, nose - 0.08, hw - 0.19, 1.11, 0.05, 1);
    /* the grille's surround and its centre bar */
    K.bb(D, nose + 0.010, nose + 0.030, -0.40, 0.40, 0.955, 0.975);
    K.bb(D, nose + 0.010, nose + 0.030, -0.40, 0.40, 0.655, 0.675);
    K.bb(D, nose + 0.010, nose + 0.030, -0.40, -0.38, 0.66, 0.97);
    K.bb(D, nose + 0.010, nose + 0.030, 0.38, 0.40, 0.66, 0.97);
    K.bb(T.skin, nose + 0.024, nose + 0.034, -0.37, 0.37, 0.805, 0.825);
    /* the fuel filler on the right rear quarter and the trailer socket on the tail */
    K.cyl(D, 0.05, 0.02, 12, -1.20, -(ys + 0.01), 1.02, "y");
    K.bb(D, -1.27, -1.13, -(ys + 0.004), -ys, 0.95, 1.09);
    K.cyl(D, 0.035, 0.06, 10, V.tail - 0.02, -0.30, 0.60, "x");
    /* the muffler and the tail pipe, under the right side */
    K.cyl(D, 0.075, 0.42, 10, XR + 0.55, -0.40, 0.46, "x");
    K.rod(D, 0.028, [XR - 0.10, -0.40, 0.46], [V.tail + 0.10, -0.55, 0.47], 6);
    K.cyl(D, 0.032, 0.05, 8, V.tail + 0.08, -0.55, 0.47, "x");
    /* a spring and a tuner box at each whip mount */
    var wy = -(ys - 0.10), wx = V.kind === "slant" ? -1.22 : -1.10, wz = V.kind === "slant" ? 1.52 : zr + 0.06;
    if (V.kind === "slant" || V.kind === "arm") {
      K.cyl(D, 0.022, 0.12, 8, wx, wy, wz + 0.06, "z");
      K.bb(D, wx - 0.20, wx - 0.06, wy - 0.06, wy + 0.06, wz - 0.12, wz - 0.02);
      if (V.turret === "ogpk") { K.cyl(D, 0.022, 0.12, 8, wx, -wy, wz + 0.06, "z"); K.bb(D, wx - 0.20, wx - 0.06, -wy - 0.06, -wy + 0.06, wz - 0.12, wz - 0.02); }
    }
    if (V.kind === "slant") {
      /* two ammunition cans strapped on the roof behind the ring */
      for (i = 0; i < 2; i++) {
        var ax = RING_SLANT - 0.62 - i * 0.16;
        K.bb(D, ax - 0.06, ax + 0.06, 0.18, 0.46, zr, zr + 0.18);
        K.bb(D, ax - 0.065, ax + 0.065, 0.28, 0.36, zr + 0.18, zr + 0.20);
      }
      K.bb(D, RING_SLANT - 0.92, RING_SLANT - 0.56, 0.31, 0.33, zr, zr + 0.19);
    }
  }
  /* turret details shared by the weapon stations: the ring's bolts, its traverse lock and handle */
  function ringDetail(K, T, r, z, n) {
    var i, a;
    for (i = 0; i < n; i++) { a = (i + 0.5) / n * Math.PI * 2; K.bb(T.dark, Math.cos(a) * r - 0.014, Math.cos(a) * r + 0.014, Math.sin(a) * r - 0.014, Math.sin(a) * r + 0.014, z, z + 0.02); }
    K.bb(T.dark, -r - 0.04, -r + 0.06, -0.05, 0.05, z, z + 0.06);
    K.rod(T.dark, 0.012, [-r + 0.02, 0.04, z + 0.06], [-r - 0.10, 0.10, z + 0.20], 5);
    K.cyl(T.dark, 0.018, 0.08, 6, -r - 0.10, 0.10, z + 0.24, "z");
  }
  /* the M2's ammunition belt from the can to the feed tray, its rear sight and the front post */
  function m2Detail(K, T, x0, z0) {
    K.bb(T.dark, x0 - 0.02, x0 + 0.06, 0.055, 0.12, z0 + 0.02, z0 + 0.035);
    K.bb(T.dark, x0 - 0.17, x0 - 0.14, -0.012, 0.012, z0 + 0.075, z0 + 0.12);
    K.bb(T.dark, x0 + 0.33, x0 + 0.35, -0.008, 0.008, z0 + 0.035, z0 + 0.075);
  }

  /* --------------------------------------------------------------- build */
  function make(key) {
    return function (THREE, M, C) {
      var V = VAR[key], T = makeMats(THREE, C, V);
      var dw = dpWeather(THREE, T.skin.map, V.paint === "nato" ? "#515c45" : "#a1977a", key.length * 977 + 13);
      if (dw) T.skin.map = dw;
      var g = new THREE.Group();
      g.name = "humvee_" + key;
      var K = new Baker(THREE);
      chassis(K, T, V);
      if (V.kind === "slant") bodySlant(K, T, V);
      else if (V.kind === "avenger") bodyAvenger(K, T, V);
      else if (V.kind === "jam") bodyJam(K, T, V);
      else bodyArm(K, T, V);
      hvDetail(K, T, V);
      hvDetail3(K, T, V);
      K.flush(g);
      var tgL = tyreGeo(THREE, V.R, 1), tgR = tyreGeo(THREE, V.R, -1), s, i, axs = [XF, XR];
      for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
        var w = new THREE.Group();
        w.name = "roadwheel";
        w.position.set(axs[i], s * HALF_TRACK, V.R);
        w.add(new THREE.Mesh(s > 0 ? tgL : tgR, T.rub));
        g.add(w);
      }
      if (V.kind === "slant") turretRing(THREE, T, g, V.roof);
      else if (V.kind === "avenger") turretAvenger(THREE, T, g);
      else if (V.kind === "jam") mastJam(THREE, T, g);
      else if (V.turret === "gpk") turretGpk(THREE, T, g, V.roof);
      else turretOgpk(THREE, T, g, V.roof);
      g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      return g;
    };
  }

  return { make: make };
})();

/* len is the MEASURED x extent (the front tow shackles to the pintle hook); render3d.js normalises on
   the measurement */
UNIT_MODELS["nato_e80_recon"] = { len: 4.68, build: HeroHumvee.make("e80") };
UNIT_MODELS["nato_e90_recon"] = { len: 4.68, build: HeroHumvee.make("e90") };
UNIT_MODELS["nato_e00_recon"] = { len: 4.98, build: HeroHumvee.make("e00") };
UNIT_MODELS["recon_n"] = { len: 4.98, build: HeroHumvee.make("n") };
UNIT_MODELS["nato_e90_spaag"] = { len: 4.99, build: HeroHumvee.make("av") };
UNIT_MODELS["nato_e90_ewveh"] = { len: 4.68, build: HeroHumvee.make("tj") };
