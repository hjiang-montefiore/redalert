/* ============ us_seawolf_ssn.js -- HERO model: USS Seawolf (SSN-21), Seawolf class SSN (nato_e90_sub) ============
   The boat as commissioned on 19 July 1997: the original 107.6 m Seawolf, NOT Jimmy Carter's 30 m
   multi-mission plug.

   References (Wikimedia Commons, fetched small into scratchpad/q_seawolf_ref):
     - "SSN21.svg" (silhouette of the class, port elevation, bow right; rasterised here to 2600 px):
       THE source for every station. Shroud end to stem 2593 px = the published 107.6 m, so 24.10 px/m.
       Its hull depth reads 12.12 m against the published 12.2 m beam, which squares the scale. Heights
       below are over ITS water line (the model floats 0.72 m higher, see LIFT). It gives:
       the round section (axis 4.27 m under its water line, crown 1.76 m over it, keel 10.4 m under it);
       the hull held at full diameter from 36 m to 89.5 m abaft the shroud, a long straight-sided cone aft
       of that down to 1.43 m at the shroud, and a blunt 18 m bow; the sail 76.4-85.9 m abaft the shroud,
       its top 7.0 m (aft) to 7.4 m (fore) over the water with rounded corners, its after edge vertical and
       the leading-edge FILLET sweeping from 4.4 m over the water down to the crown 2.9 m ahead of the
       sail; six masts over the sail; the pump-jet shroud (4.45 m long, 5.76 m across, square inlet face,
       rounded after end); the tall upper rudder (top 2.66 m over the water), the lower rudder (to the hull
       diameter), the horizontal stern-plane root at the axis, and a canted fin below it each side whose
       outline at 45 degrees matches the drawing to 0.05 m (root on the hull at 45 deg, tip 6.1 m out);
       three wide-aperture-array panels on each flank, 8.1 m x 2.9 m, 5.8-8.7 m under the water;
       four torpedo-tube shutters each side, stepped, abaft the bow; the bow-plane housing; flood grilles,
       cleats, hatches and the crown walking strip.
     - "960916-V-0000B-009 USS Seawolf at Sea.jpg" and NARA 330-CFD-DN-SD-99-04062 (SSN-21 on Bravo sea
       trials, 16 Sep 1996, port bow from above): the fillet in the light, the flat-topped sail, the black
       hull nearly awash, the upper rudder standing clear aft. No sail planes.
     - NARA 330-CFD-DN-SD-99-04057 (the same day, the sail from aft-starboard looking forward): the sail
       top in plan -- broad rounded nose where the bridge is, tapering to a narrow after edge -- with the
       housed mast openings and the bridge well.
     - "US Navy 070615-N-1595E-005 ... Seawolf ... past downtown New London.jpg" (port side, 2007) and
       "US Navy 091117-N-1644H-162 ... Connecticut (SSN 22) ... Pacific Ocean.jpg" (bow quarter from above,
       2009): the long flat hull, three or four masts raised. The 2007 broadside sets the trim: upper
       rudder 3.4 m clear of the water, about 2.5 m of hull showing, the crown going under 18 m ahead of
       the shroud end -- the drawn hull floated 0.72 m up gives exactly that (crown 2.55 m, 17.3 m).
     - "USS Seawolf (SSN-21) construction.jpg" (Electric Boat): the bluff bow dome.
   Recognition list (each is drawn; the reference it rests on in brackets):
     1. the FAT hull: 12.2 m round section on 107.6 m, L/B 8.8 [SSN21.svg; published beam]
     2. the blunt, almost hemispherical bow [SSN21.svg; construction photograph]
     3. the sail well forward (centre 26 per cent aft of the stem), flat-topped, a broad round nose and a
        narrow after edge [SSN21.svg; the 1996 aerials]
     4. the leading-edge fillet that ramps the sail's nose down into the crown [SSN21.svg; 1996 photos]
     5. NO sail planes; the retractable bow planes are housed -- their housing shows on the bow
        [SSN21.svg; every photograph]
     6. the masts: four raised (box-head mast, two periscopes, the ball radome), two housed [SSN21.svg;
        2007/2009 photographs show three or four up]
     7. the six-fin stern: upper and lower rudders, the two stern planes, two canted fins below them
        [SSN21.svg]
     8. the pump-jet shroud [SSN21.svg]
     9. three wide-aperture-array panels on each flank [SSN21.svg]
    10. the anechoic finish: matte black rubber, a faint tile grid and patchwork [all photographs]
   Not confirmed and so estimated or left out: the stern-plane span (+-6.0 m, tip chord 2.1 m) is not in
   a side view; the sail width (3.6 m, 3.3 m at the top) is judged from the 1996 photographs; the
   bow planes are drawn housed (no reference gives their extended planform); the stator-vane count (7)
   is illustrative and the rotor is not drawn (hidden in the duct); no hull number, name, draft marks or
   flag. The row is not turret:true, so nothing is named "turret". The towed-array fairing is not drawn
   (not in the references).
   Paint: US boats are black all over, so nothing is sampled off a photograph: matte near-black anechoic
   coat (#26292c over the water, #1f2124 under it) with a faint 1 m tile grid, tonal patchwork and frame
   bands in the canvas texture; the WAA panels a slightly lighter #3a3e42 so they read through the sea.
   Model space +X bow, +Y port, +Z up, metres, water line z = 0. render3d draws subs 1.2 m lower and scales
   them by UNIT_MODELS[key].len, which is the measured X extent (107.6 m). Merged per material: 7 meshes.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSeawolfSSN21 = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 107.6;                       /* shroud end to stem                                   */
  var XS = -LOA / 2;                     /* model x of the shroud end (d = 0)                     */
  var ZA = -4.27;                        /* hull axis under the DRAWING's water line              */
  /* Every height below is read off the drawing, whose water line puts the crown 1.76 m up. The
     2007 New London photograph (broadside, harbour trim) shows the upper rudder 3.4 m clear and about
     2.5 m of hull over the water, so the whole boat is floated up by LIFT in Acc: axis 3.55 m under
     z = 0, crown 2.55 m over it. */
  var LIFT = 0.72;
  var RS = 6.10 / 6.08;                  /* drawing radii to the published 12.2 m beam            */
  function X(d) { return XS + d; }       /* d: metres FORWARD of the shroud end -> model x          */

  /* Station table [d, r]: d metres forward of the shroud end, r the drawn radius (24.10 px/m). */
  var STA = [
    [0.60, 0.30], [0.90, 0.62], [1.30, 0.86], [2.00, 1.05], [3.00, 1.22], [4.00, 1.34], [4.65, 1.43],
    [5.31, 1.56], [6.51, 1.81], [7.34, 1.95], [8.50, 2.16], [10.00, 2.44], [11.50, 2.73], [12.32, 2.90],
    [13.15, 3.07], [14.81, 3.40], [16.47, 3.72], [18.13, 4.05], [19.79, 4.38], [21.45, 4.67],
    [23.11, 4.95], [24.77, 5.17], [26.43, 5.37], [28.09, 5.55], [29.75, 5.71], [31.41, 5.85],
    [33.07, 5.95], [34.73, 6.01], [36.40, 6.06], [38.00, 6.08], [89.50, 6.08], [90.84, 6.04],
    [92.16, 5.95], [93.49, 5.83], [94.82, 5.70],
    [96.15, 5.54], [97.47, 5.37], [98.80, 5.16],
    [100.13, 4.95], [101.46, 4.74], [102.79, 4.45],
    [103.45, 4.24], [104.11, 4.03], [104.78, 3.83], [105.44, 3.48], [106.11, 3.07], [106.44, 2.82],
    [106.77, 2.49], [107.10, 2.02], [107.27, 1.69], [107.43, 1.28], [107.60, 0.12]
  ];
  function rAtD(d) {
    var i;
    if (d <= STA[0][0]) return STA[0][1] * RS;
    for (i = 1; i < STA.length; i++) {
      if (d <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (d - a[0]) / (b[0] - a[0]);
        return (a[1] + (b[1] - a[1]) * t) * RS;
      }
    }
    return STA[STA.length - 1][1] * RS;
  }
  function hullR(x) { return rAtD(x - XS); }
  function crown(x) { return ZA + hullR(x); }
  /* half-breadth of the hull at height z, and the surface height at offset y */
  function sideY(x, z) { var r = hullR(x), dz = z - ZA; return Math.sqrt(Math.max(0.0025, r * r - dz * dz)); }
  function surfZ(x, y) { var r = hullR(x); return ZA + Math.sqrt(Math.max(0.0025, r * r - y * y)); }

  /* ---- the sail, off the drawing ---- */
  var SA = X(76.40);                     /* after edge (vertical)                                 */
  var SF = X(85.94);                     /* leading edge above the fillet                         */
  var ZT = 7.00;                         /* top at the after edge; the top rises 0.42 m to the fore */
  /* fillet: [z over the water, leading edge d] read row by row off the drawing */
  var FIL = [[4.38, 85.98], [4.13, 86.06], [3.88, 86.19], [3.63, 86.35], [3.38, 86.56], [3.13, 86.77],
             [2.88, 87.06], [2.64, 87.35], [2.39, 87.76], [2.14, 88.22], [1.89, 88.80], [1.60, 89.45]];
  function sailHW(z) {                   /* 3.6 m wide low down, 3.3 m at the top (1996 photographs) */
    var t = Math.max(0, Math.min(1, (z - 4.4) / (ZT - 4.4)));
    return 1.80 - 0.15 * t;
  }
  function sailTopZ(x) { return ZT + 0.42 * Math.max(0, Math.min(1, (x - SA) / (SF - SA))); }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ============================================================= textures */
  var _tex = {};
  /* hull skin: u = shroud end .. stem, v around the girth with v = 0.25 at the crown. CanvasTexture
     flips Y, so canvas row y is v = 1 - y / H: the crown is row 0.75 H. */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(21021), i, j, d, r, wl, ya, yb;
    var D0 = STA[0][0], D1 = STA[STA.length - 1][0];
    g.fillStyle = "#1f2124"; g.fillRect(0, 0, W, H);            /* under the water line              */
    for (i = 0; i < W; i++) {
      d = D0 + (i + 0.5) / W * (D1 - D0); r = rAtD(d);
      if (r <= -(ZA + LIFT)) continue;
      wl = Math.asin(-(ZA + LIFT) / r) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;
      g.fillStyle = "#26292c"; g.fillRect(i, ya, 1, yb - ya);   /* the band over the water           */
      g.fillStyle = "rgba(8,9,10,0.55)";                        /* the wet line itself               */
      g.fillRect(i, ya - 3, 1, 3); g.fillRect(i, yb, 1, 3);
    }
    /* tonal patchwork: replaced tiles never match their neighbours */
    for (i = 0; i < 260; i++) {
      g.globalAlpha = 0.015 + R1() * 0.035;
      g.fillStyle = R1() < 0.55 ? "#ffffff" : "#000000";
      g.fillRect(R1() * W, R1() * H, 10 + R1() * 60, 8 + R1() * 26);
    }
    g.globalAlpha = 1;
    /* the tile grid, about 1 m square (10 px along, 13 px around), staggered by half a tile */
    var tw = 10, th = 13;
    for (j = 0; j < H; j += th) {
      for (i = 0; i < W; i += tw) {
        var off = ((j / th) | 0) % 2 ? tw * 0.5 : 0;
        g.fillStyle = "rgba(255,255,255," + (0.006 + R1() * 0.016).toFixed(3) + ")";
        g.fillRect(i + off + 1, j + 1, tw - 2, th - 2);
        if (R1() < 0.010) { g.fillStyle = "rgba(96,90,80,0.20)"; g.fillRect(i + off + 1, j + 1, tw - 2, th - 2); }
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;
    for (j = 0; j <= H; j += th) { g.beginPath(); g.moveTo(0, j); g.lineTo(W, j); g.stroke(); }
    for (i = 0; i <= W; i += tw) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    /* frame bands every 6 m that do read in the photographs */
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.6;
    for (i = 0; i < W; i += 57) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    /* salt wash heavier aft, where the stern runs wet */
    var gr = g.createLinearGradient(0, 0, W, 0);
    gr.addColorStop(0, "rgba(70,74,76,0.10)"); gr.addColorStop(0.4, "rgba(70,74,76,0.0)");
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    _tex.hull = t;
    return t;
  }
  /* a seamless 2.8 m tile patch for the metre-UV parts: sail, fins, shroud, walking strip */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(7713), i, j;
    g.fillStyle = "#222528"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 3; j++) {
      for (i = 0; i < 3; i++) {
        g.fillStyle = "rgba(255,255,255," + (0.008 + R1() * 0.020).toFixed(3) + ")";
        g.fillRect(i * 43 + 1, j * 43 + 1, 41, 41);
      }
    }
    for (i = 0; i < 900; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.05)";
      g.fillRect(R1() * S, R1() * S, 2, 2);
    }
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 0; i <= S; i += 43) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, S); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(S, i); g.stroke();
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(1 / 2.8, 1 / 2.8);
    t.anisotropy = 8;
    _tex.tile = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.90, metalness: 0.05 }),
      fin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.88, metalness: 0.06 }),
      panel: std(0x3a3e42, 0.84, 0.10),     /* the wide-aperture-array panels                     */
      dark:  std(0x0c0e0f, 0.80, 0.20),     /* slots, shutters, recesses, inside the duct         */
      metal: std(0x3a4147, 0.55, 0.50),     /* mast tubes                                         */
      cap:   std(0x55503e, 0.70, 0.20),     /* the GRP antenna heads the drawing colours          */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery (as ru_akula.js) */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, (z || 0) + LIFT);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        if (!geo.attributes.normal) geo.computeVertexNormals();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z + LIFT), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      done: function (T, g) {
        var k;
        for (k in by) {
          var list = by[k], n = 0, i, j;
          for (i = 0; i < list.length; i++) n += list[i].attributes.position.count;
          var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { P[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) U[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(P, 3));
          G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
          G.setAttribute("uv", new THREE.BufferAttribute(U, 2));
          var mesh = new THREE.Mesh(G, T[k]);
          mesh.name = "m_" + k;
          mesh.castShadow = true; mesh.receiveShadow = true;
          g.add(mesh);
        }
      }
    };
  }

  /* lofted body with the winding flipped so FrontSide faces outward (sections in increasing x) */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }
  function flip(g) {
    var ix = g.getIndex(), a, i, t;
    if (!ix) {
      var p = g.attributes.position.array, u = g.attributes.uv ? g.attributes.uv.array : null, k, tmp;
      for (i = 0; i < p.length; i += 9) {
        for (k = 0; k < 3; k++) { tmp = p[i + 3 + k]; p[i + 3 + k] = p[i + 6 + k]; p[i + 6 + k] = tmp; }
      }
      if (u) for (i = 0; i < u.length; i += 6) {
        for (k = 0; k < 2; k++) { tmp = u[i + 2 + k]; u[i + 2 + k] = u[i + 4 + k]; u[i + 4 + k] = tmp; }
      }
      g.attributes.position.needsUpdate = true;
    } else {
      a = ix.array;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
    }
    g.computeVertexNormals();
    return g;
  }

  /* stacked horizontal rings -> closed shell (top capped), outward normals, UVs in metres */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      var run = 0, prev = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prev[0]) * (p[0] - prev[0]) + (p[1] - prev[1]) * (p[1] - prev[1]));
        prev = p;
        pos.push(p[0], p[1], rings[i].z); uv.push(run, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    var base = pos.length / 3, cx = 0, cy = 0, k, top = rings[L - 1];
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    cx /= N; cy /= N;
    pos.push(cx, cy, top.z); uv.push(cx, cy);
    for (k = 0; k < N; k++) { pos.push(top.pts[k][0], top.pts[k][1], top.z); uv.push(top.pts[k][0], top.pts[k][1]); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* sail plan: round nose of length ln, near-parallel sides, tapering to a narrow after edge */
  function sailHalf(s, L, hw, ln) {
    var v;
    if (s <= 0) return 0;
    if (s < ln) { v = (ln - s) / ln; return hw * Math.sqrt(Math.max(0, 1 - v * v)); }
    v = Math.min(1, (s - ln) / (L - ln));
    return hw * (1 - 0.80 * Math.pow(v, 1.6));
  }
  function sailRing(xa, xf, hw, ln, M) {
    var pts = [], L = xf - xa, k, s;
    for (k = 0; k <= M; k++) { s = L * Math.pow(k / M, 1.5); pts.push([xf - s, sailHalf(s, L, hw, ln)]); }
    for (k = M; k >= 1; k--) { s = L * Math.pow(k / M, 1.5); pts.push([xf - s, -sailHalf(s, L, hw, ln)]); }
    return pts;
  }

  /* flat extrusion of an outline: thickness 'depth' toward +z (or toward -y when xz) */
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);
    g.computeVertexNormals();
    return g;
  }

  /* thin patch on the flank (sign +1 port) following the round hull, lifted 'off' */
  function patch(THREE, sign, x0, x1, z0, z1, off, nx, nz) {
    nx = nx || 6; nz = nz || 4;
    var pos = [], uv = [], idx = [], i, j, x, z;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; z = z0 + (z1 - z0) * j / nz;
        var r = hullR(x), dz = z - ZA, y = Math.sqrt(Math.max(0.01, r * r - dz * dz));
        var k = (r + off) / r;                         /* lift along the section normal */
        pos.push(x, sign * y * k, ZA + dz * k);
        uv.push(x, z);
      }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        if (sign > 0) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* strip on the crown, |y| <= hw, following the hull, lifted 'off' */
  function crownStrip(THREE, x0, x1, hw, off, nx, ny) {
    var pos = [], uv = [], idx = [], i, j, x, y;
    for (j = 0; j <= ny; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx;
        var w = Math.min(hw, hullR(x) * 0.5);
        y = -w + 2 * w * j / ny;
        pos.push(x, y, surfZ(x, y) + off); uv.push(x, y);
      }
    }
    for (j = 0; j < ny; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function strut(THREE, A, mat, r, a, b, seg) {
    var dv = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = dv.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dv.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  /* =============================================================== build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, x, z, sg, d;

    /* ---- hull: one lofted body of revolution, shroud hub to stem ---- */
    var ds = [];
    for (i = 0; i < STA.length; i++) ds.push(STA[i][0]);
    for (d = 40; d < 89; d += 7) ds.push(d);
    ds.sort(function (p, q) { return p - q; });
    var secs = [];
    for (i = 0; i < ds.length; i++) {
      if (i && ds[i] - ds[i - 1] < 0.08) continue;
      secs.push({ x: X(ds[i]), w: rAtD(ds[i]), h: rAtD(ds[i]), zc: ZA, sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 40), 0, 0, 0);
    A.add("dark", new THREE.SphereGeometry(0.30, 10, 6), X(0.62), 0, ZA);          /* hub cap        */
    A.add("fin", new THREE.SphereGeometry(0.16, 8, 6), X(107.44), 0, ZA);          /* stem pin-hole  */

    /* ---- walking strip along the crown (drawing: 19.7 m to the fillet), cleats, flush hatches ---- */
    A.add("fin", crownStrip(THREE, X(20.0), X(88.6), 0.80, 0.025, 34, 2), 0, 0, 0);
    var CL = [27.8, 31.0, 44.5, 46.1, 67.5, 69.2];                                /* drawn mushrooms */
    for (k = 0; k < CL.length; k++) {
      x = X(CL[k]);
      cylZ(THREE, A, "dark", 0.10, 0.10, 0.34, 8, x, 0, crown(x) + 0.17);
      cylZ(THREE, A, "dark", 0.30, 0.22, 0.10, 10, x, 0, crown(x) + 0.36);
    }
    var HT = [[35.2, 37.0], [63.1, 65.2]];
    for (k = 0; k < HT.length; k++) {
      x = X((HT[k][0] + HT[k][1]) / 2);
      A.add("dark", crownStrip(THREE, X(HT[k][0]), X(HT[k][1]), 0.62, 0.045, 3, 2), 0, 0, 0);
    }

    /* ---- wide-aperture array: three panels each flank, a dark frame round each (drawing) ---- */
    var WAA = [[27.3, 35.4], [56.1, 64.2], [80.1, 88.2]];
    for (k = 0; k < WAA.length; k++) {
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", patch(THREE, sg, X(WAA[k][0] - 0.45), X(WAA[k][1] + 0.45), -9.00, -5.42, 0.035, 6, 3), 0, 0, 0);
        A.add("panel", patch(THREE, sg, X(WAA[k][0]), X(WAA[k][1]), -8.73, -5.79, 0.075, 8, 4), 0, 0, 0);
      }
    }

    /* ---- torpedo-tube shutters, four each side, stepped (drawing), and the bow-plane housing ---- */
    var TT = [[93.4, 96.8, -3.95], [92.9, 96.3, -5.30], [91.0, 94.6, -6.65], [90.8, 94.4, -8.05]];
    for (k = 0; k < TT.length; k++) {
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", patch(THREE, sg, X(TT[k][0]), X(TT[k][1]), TT[k][2] - 0.48, TT[k][2] + 0.48, 0.04, 3, 1), 0, 0, 0);
      }
    }
    var bx = X(91.15), bz = -2.40, ang = Math.atan2(bz - ZA, sideY(bx, bz));
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.SphereGeometry(1, 12, 5), bx, sg * (sideY(bx, bz) - 0.04), bz, sg * ang, 0, 0, [1.30, 0.10, 0.34]);
    }
    /* the small fairing under the forefoot (drawing) */
    A.add("fin", new THREE.SphereGeometry(1, 10, 6), X(96.3), 0, ZA - hullR(X(96.3)) + 0.12, 0, 0, 0, [0.75, 0.45, 0.40]);

    /* ---- flood grilles low on the hull (drawing), dark slots in short runs at a fixed angle
            under the axis, so they stay on the skin as the hull narrows ---- */
    var FG = [[14.2, 17.0, -0.98], [20.3, 23.6, -1.10], [70.0, 72.4, -1.02], [93.0, 95.0, -1.05], [97.0, 99.6, -1.10]];
    for (k = 0; k < FG.length; k++) {
      for (d = FG[k][0]; d < FG[k][1]; d += 0.82) {
        x = X(d + 0.3);
        var ra = hullR(x) + 0.01, an = FG[k][2];
        for (sg = -1; sg <= 1; sg += 2) {
          A.add("dark", new THREE.BoxGeometry(0.62, 0.10, 0.26), x, sg * ra * Math.cos(an), ZA + ra * Math.sin(an), sg * an, 0, 0);
        }
      }
    }

    /* ---- the sail: lofted horizontal rings, round nose, fillet, narrow after edge ---- */
    var rings = [], zl = [1.00], fx = [];
    for (i = FIL.length - 1; i >= 0; i--) { zl.push(FIL[i][0]); }
    zl.push(4.9, 5.6, 6.2);
    var RT = 0.55, tops = [0.40, 0.70, 0.90, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(ZT - RT + RT * tops[k]);
    function foreAt(zz) {
      var j;
      if (zz >= FIL[0][0]) return SF;
      for (j = 1; j < FIL.length; j++) {
        if (zz >= FIL[j][0]) {
          var a = FIL[j - 1], b = FIL[j], t = (zz - b[0]) / (a[0] - b[0]);
          return X(b[1] + (a[1] - b[1]) * t);
        }
      }
      return X(FIL[FIL.length - 1][1]);
    }
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var e = Math.max(0, z - (ZT - RT)) / RT;
      var sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e * e)));
      var xf = foreAt(z), hw = sailHW(z) - sh;
      var ln = hw + (xf - SF);                         /* the fillet stretches the nose forward */
      rings.push({ z: z, pts: sailRing(SA + sh, xf - sh, hw, ln, 22) });
    }
    var sail = shell(THREE, rings);
    /* the top rises 0.42 m from the after edge to the leading edge (drawing): shear by height */
    var sp = sail.attributes.position;
    for (i = 0; i < sp.count; i++) {
      var px = sp.getX(i), pz = sp.getZ(i);
      var fh = Math.max(0, Math.min(1, (pz - 1.6) / (ZT - 1.6)));
      sp.setZ(i, pz + 0.42 * Math.max(0, Math.min(1, (px - SA) / (SF - SA))) * fh);
    }
    sp.needsUpdate = true; sail.computeVertexNormals();
    A.add("fin", sail, 0, 0, 0);

    /* the long slot high on the after part of each sail side (drawing; the 1996 starboard aerial) */
    function sailY(xx, zz) { var hw0 = sailHW(zz); return sailHalf(SF - xx, SF - SA, hw0, hw0); }
    for (sg = -1; sg <= 1; sg += 2) {
      var sx0 = X(76.7), sx1 = X(78.5), szz = 6.15;
      var sxa = (sx0 + sx1) / 2, yaw = Math.atan2(sailY(sx1, szz) - sailY(sx0, szz), sx1 - sx0);
      A.add("dark", new THREE.BoxGeometry(sx1 - sx0, 0.06, 0.14), sxa, sg * (sailY(sxa, szz) + 0.005), szz + 0.42 * (sxa - SA) / (SF - SA) * (szz - 1.6) / (ZT - 1.6), 0, 0, sg * yaw);
    }

    /* sail top: the bridge well at the fore end, housed-mast openings, two raised and housed */
    var xb = SF - 1.55;
    A.add("dark", new THREE.BoxGeometry(1.60, 1.30, 0.20), xb, 0, sailTopZ(xb) - 0.03);
    A.add("dark", new THREE.BoxGeometry(0.06, 1.34, 0.38), xb - 0.85, 0, sailTopZ(xb) + 0.12);   /* bridge coaming */
    /* masts, off the drawing (x d, radius, top z, head): four raised, two housed */
    var MS = [
      [79.40, 0.30, 10.93, "box"],     /* the box-head mast at the after end               */
      [80.55, 0.26, 0, "housed"],
      [81.30, 0.14, 0, "housed"],
      [82.06, 0.21, 14.60, "scope"],   /* periscope, run right up                          */
      [82.90, 0.22, 12.10, "ball"],    /* the ball radome                                  */
      [83.68, 0.21, 14.60, "scope"]    /* the second periscope                             */
    ];
    for (k = 0; k < MS.length; k++) {
      x = X(MS[k][0]);
      var zt0 = sailTopZ(x), mr = MS[k][1], mt = MS[k][2], kd = MS[k][3];
      if (kd === "housed") {
        cylZ(THREE, A, "dark", mr + 0.10, mr + 0.10, 0.06, 12, x, 0, zt0 + 0.02);
        continue;
      }
      cylZ(THREE, A, "dark", mr + 0.12, mr + 0.12, 0.06, 12, x, 0, zt0 + 0.02);
      strut(THREE, A, "metal", mr, [x, 0, zt0 - 0.3], [x, 0, mt - (kd === "scope" ? 0.9 : 0.4)], 10);
      if (kd === "box") {
        A.add("cap", new THREE.BoxGeometry(1.10, 0.62, 1.30), x, 0, mt - 0.65);
        A.add("metal", new THREE.BoxGeometry(0.50, 0.30, 0.25), x + 0.1, 0, mt + 0.10);
      } else if (kd === "scope") {
        cylZ(THREE, A, "metal", mr * 0.62, mr, 0.90, 10, x, 0, mt - 0.45);
        A.add("dark", new THREE.BoxGeometry(0.10, 0.16, 0.18), x + mr * 0.62, 0, mt - 0.32);
      } else if (kd === "ball") {
        cylZ(THREE, A, "cap", mr * 1.6, mr * 1.6, 1.10, 12, x, 0, mt - 0.85);
        A.add("cap", new THREE.SphereGeometry(0.46, 14, 10), x, 0, mt);
      }
    }

    /* ---- stern: upper and lower rudders, stern planes, two canted fins, pump-jet ---- */
    var ur = [[X(7.76), ZA], [X(7.76), 2.66], [X(10.77), 2.66], [X(11.80), -1.45], [X(12.10), ZA]];
    A.add("fin", ext(THREE, ur, 0.56, true), 0, 0.28, 0);
    var lr = [[X(7.76), ZA], [X(12.10), ZA], [X(11.73), ZA - 2.60], [X(10.87), ZA - 6.04], [X(7.76), ZA - 6.04]];
    A.add("fin", ext(THREE, lr, 0.56, true), 0, 0.28, 0);
    /* stern planes across the axis: root chord off the drawing, span ESTIMATED (+-6.0 m) */
    var spn = [[X(7.34), -6.00], [X(9.40), -6.00], [X(12.43), -2.00], [X(12.43), 2.00], [X(9.40), 6.00], [X(7.34), 6.00]];
    A.add("fin", ext(THREE, spn, 0.40), 0, 0, ZA - 0.20);
    /* canted fins at 45 deg below the planes: outline in (d, rho) off the drawing */
    var cf = [[X(14.90), 2.20], [X(14.90), 3.30], [X(13.60), 4.80], [X(13.40), 5.50], [X(12.90), 6.10],
              [X(10.40), 6.10], [X(9.30), 5.50], [X(10.35), 4.80], [X(10.35), 2.20]];
    for (sg = -1; sg <= 1; sg += 2) {
      var fg = ext(THREE, cf.slice().reverse(), 0.34);
      fg.translate(0, 0, -0.17);
      A.add("fin", fg, 0, 0, ZA, sg > 0 ? -PI / 4 : -3 * PI / 4, 0, 0);
    }

    /* pump-jet shroud: lathe of the drawn outline, outer then the duct inside, closed */
    var prof = [[2.84, 4.45], [2.88, 3.80], [2.86, 3.00], [2.80, 2.20], [2.70, 1.50], [2.55, 0.90],
                [2.36, 0.42], [2.16, 0.13], [2.00, 0.00], [1.86, 0.06], [1.84, 0.42], [1.92, 1.50],
                [2.10, 2.60], [2.30, 3.60], [2.46, 4.30], [2.58, 4.45], [2.84, 4.45]];
    var lp = [];
    for (i = 0; i < prof.length; i++) lp.push(new THREE.Vector2(prof[i][0] * RS, prof[i][1]));
    var shr = flip(new THREE.LatheGeometry(lp, 32));
    shr.rotateZ(-PI / 2);
    A.add("fin", shr, XS, 0, ZA);
    /* a dark lining just inside the duct so the bore reads black from astern */
    var lin = [];
    var inner = [[1.80, 0.10], [1.79, 0.45], [1.87, 1.50], [2.05, 2.60], [2.25, 3.60], [2.40, 4.30]];
    for (i = 0; i < inner.length; i++) lin.push(new THREE.Vector2(inner[i][0] * RS, inner[i][1]));
    var lg = flip(new THREE.LatheGeometry(lin, 24));
    lg.rotateZ(-PI / 2);
    A.add("dark", lg, XS, 0, ZA);
    /* stator vanes in the inlet (count illustrative) */
    for (i = 0; i < 7; i++) {
      var vg = new THREE.BoxGeometry(0.85, 0.08, 1.10);
      vg.translate(0, 0, 1.92);
      A.add("dark", vg, XS + 3.85, 0, ZA, i * 2 * PI / 7 + 0.22, 0, 0);
    }

    /* ---- modest team strips on the crown, fore and aft of the sail ---- */
    x = X(96.0); A.add("team", new THREE.BoxGeometry(2.8, 0.9, 0.05), x, 0, crown(x) + 0.03);
    x = X(46.0); A.add("team", new THREE.BoxGeometry(2.8, 0.9, 0.05), x, 0, crown(x) + 0.06);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent, shroud end to stem: render3d scales a submarine by it. */
UNIT_MODELS["nato_e90_sub"] = {
  len: 107.6,
  build: function (THREE, M, C) { return HeroSeawolfSSN21.build(THREE, M, C); }
};
