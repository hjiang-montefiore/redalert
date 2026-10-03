/* ============ ru_victor.js -- HERO model: Project 671 Yorsh / Victor I SSN (pact_e60_ssn) ============
   Soviet nuclear attack submarine, first of the third generation, 1967 as the row says.

   References (Wikimedia Commons, fetched small into scratchpad/victor_ref):
     - "Victor I class SSN.svg" (a.png): the side elevation, THE source for every
       station. 1917 px = 92.5 m (20.7 px/m). Gives the teardrop hull (full round
       section about 10.4 m deep over the middle third, blunt very round bow,
       long fine tail cone), the low faired fairwater 22.8-39.6 m abaft the bow
       (vertical rounded fore end, long convex after slope, flat top about 3.6 m
       over the casing), the four mast tubes and one raked aerial mast and the
       thick capped mast, the cruciform stern (tall upper rudder swept at the
       front, shorter ventral rudder, a streamlined stern-plane fairing 5.8 m
       long on the tail cone), the single screw, the free-flood slot pairs on
       the upper hull side, the long bow-plane slot on the side forward of the
       fairwater, the dark-red anti-fouling below the water line.
     - "Victor I class submarine.jpg" (b.jpg, US Navy photograph, surfaced
       underway): black hull, very low casing, the fairwater a short blunt block
       well forward of the stern, the upper rudder standing clear of the wake.
       Dark colour of the hull and the red under the water line.
     - "Submarine propeller (VF 671-10-20) in B-396 Museum Front" (d.jpg): a
       Project 671 museum screw, about seven broad scimitar blades with a
       pointed hub cap - drawn as seven blades.
   Dimensions: 92.5 m long, 10.6 m beam (sub_specs.js and the drawing agree);
   draught about 7.4 m, so the crown is 3.0 m over the water line (the drawing
   shows about 4 m, the photograph shows the boat lower; the sub_specs row gives
   a draught of about 7.2 m).
   Not confirmed and so not drawn: the two small auxiliary propellers (the
   drawing hints at one small prop on the tail cone, no photograph shows it),
   the retracted bow planes (only their slot), no hull number, no flag, no rails.
   Estimated, not read from a plan view: the fairwater width (3.4 m), the
   stern-plane span (+-4.4 m), the screw diameter (3.6 m, from the drawing).
   The sub_specs row says sailH 5.2; the drawing, measured again, gives about 3.1 m from the
   casing crown to the fairwater top (63 px at 20.7 px/m; the photograph agrees: the fairwater is about as tall
   as the casing freeboard); drawn 3.2 m over the crown. Data mismatch reported, not edited. Rudder roots are
   driven to the hull axis so every fin is embedded in the tail cone. No end-plate fins: no reference shows any. The mast types are not named by my sources (generic tubes).
   Row is not turret:true, so nothing is named "turret". ASCII only.
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales
   a submarine by UNIT_MODELS[key].len, which is the true 92.5 m.
   Merged per material (8 draw calls). */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroVictor671 = (function () {
  "use strict";

  var PI = Math.PI;
  var XB = 46.25, HL = 90.5;          /* hull runs to 90.5 m abaft the bow; the screw takes the rest */
  var SH = 0.96;                       /* trim: drawing boot line raised to the photograph's lower freeboard */

  function zOf(y) { return (325 - y) / 20.7 - SH; }   /* drawing pixel row -> metres over the water line */

  /* [distance from the bow in metres, centre row px, radius px] read off the elevation */
  var TAB = [
    [0.00, 357, 8], [0.55, 357, 35], [1.67, 357, 61], [3.61, 357, 83], [5.55, 357, 95],
    [7.49, 357, 101], [9.44, 356.5, 102.5], [11.4, 355.5, 103.5], [18.5, 351, 108.5],
    [40.0, 351, 108], [46.25, 352.5, 106.5], [53.8, 355.5, 103.5], [59.7, 358, 97],
    [63.5, 359.5, 90.5], [67.3, 361, 82], [71.2, 362.5, 71.5], [75.1, 363.5, 59.5],
    [79.0, 365, 47], [83.4, 366, 33], [86.7, 367, 21], [88.6, 367.5, 14.5], [90.5, 368, 6.5]
  ];
  function lookup(d) {
    var i;
    if (d <= 0) return TAB[0];
    for (i = 1; i < TAB.length; i++) {
      if (d <= TAB[i][0]) {
        var a = TAB[i - 1], b = TAB[i], t = (d - a[0]) / (b[0] - a[0]);
        t = t * t * (3 - 2 * t) * 0.5 + t * 0.5;
        return [d, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      }
    }
    return TAB[TAB.length - 1];
  }
  function hullR(x) { return lookup(XB - x)[2] / 20.7; }
  function zcAt(x) { return zOf(lookup(XB - x)[1]); }
  function topAt(x) { return zcAt(x) + hullR(x); }
  function sideY(x, z) {
    var r = hullR(x) * 1.02, dz = (z - zcAt(x)) * 1.02, v = r * r - dz * dz;
    return Math.sqrt(Math.max(v, 0.04));
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  var _tex = null;
  function hullTex(THREE) {
    if (_tex) return _tex;
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(6711), i, x, r, wl, ya, yb;
    g.fillStyle = "#5a2d23"; g.fillRect(0, 0, W, H);                 /* dark-red anti-fouling */
    for (i = 0; i < 900; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      x = -XB + (i + 0.5) / W * HL;
      r = hullR(x);
      var zc = zcAt(x);
      if (r <= -zc) continue;
      wl = Math.asin(-zc / r) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;
      g.fillStyle = "#2f3234"; g.fillRect(i, ya, 1, yb - ya);          /* black above the water, as the photograph */
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;
    for (i = 0; i < W; i += 31) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x25292b, 0.95, 0.04),     /* tail ends, hull caps, matt black */
      sail:  std(0x2c3134, 0.88, 0.06),     /* fairwater, rudders, planes */
      dark:  std(0x0e1113, 0.80, 0.20),     /* slots, panels */
      metal: std(0x3a4147, 0.55, 0.50),     /* mast tubes, shaft */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      cap:   std(0x8a5c34, 0.60, 0.30),     /* the capped mast head in the drawing */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
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

  /* lofted body with the winding flipped so FrontSide faces outward */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }

  /* stacked-ring shell over rounded-rectangle outlines; outward normals */
  function rrect(x0, x1, hw, rc, n) {
    var pts = [], per = n / 4, k, i, cx, cy, a0;
    var cs = [[x1 - rc, hw - rc, 0], [x0 + rc, hw - rc, 0.5 * PI],
              [x0 + rc, -hw + rc, PI], [x1 - rc, -hw + rc, 1.5 * PI]];
    for (k = 0; k < 4; k++) {
      cx = cs[k][0]; cy = cs[k][1]; a0 = cs[k][2];
      for (i = 0; i < per; i++) {
        var a = a0 + (i / (per - 1)) * 0.5 * PI;
        pts.push([cx + rc * Math.cos(a), cy + rc * Math.sin(a)]);
      }
    }
    return pts;
  }
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        pos.push(p[0], p[1], rings[i].z); uv.push(j / N, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    function cap(level, up) {
      var base = pos.length / 3, cx = 0, cy = 0, k;
      for (k = 0; k < N; k++) { cx += rings[level].pts[k][0]; cy += rings[level].pts[k][1]; }
      cx /= N; cy /= N;
      pos.push(cx, cy, rings[level].z); uv.push(0, 0);
      for (k = 0; k < N; k++) { p = rings[level].pts[k]; pos.push(p[0], p[1], rings[level].z); uv.push(0, 0); }
      for (k = 0; k < N; k++) {
        var m = base + 1 + k, n = base + 1 + ((k + 1) % N);
        if (up) idx.push(base, m, n); else idx.push(base, n, m);
      }
    }
    cap(L - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* flat extrusion of an outline: z from 0 to depth (bevel off, cheap) */
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);                     /* y -> z, thickness toward -y */
    g.computeVertexNormals();
    return g;
  }


  /* thin patch that follows the hull side: x0..x1, z0..z1, lifted off by 'off' (sign +1 port) */
  function patch(THREE, sign, x0, x1, z0, z1, off) {
    var nx = 6, nz = 4, pos = [], idx = [], i, j, x, z, y;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; z = z0 + (z1 - z0) * j / nz;
        y = sideY(x, z) + off;
        pos.push(x, sign * y, z);
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
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* cylinder between two points */
  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function box(THREE, A, mat, sx, sy, sz, x, y, z, rz) {
    A.add(mat, new THREE.BoxGeometry(sx, sy, sz), x, y, z, 0, 0, rz || 0);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }


  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, x, k, d;

    /* ---- hull: sections every 1.5-3 m, dense at the bow and the tail ---- */
    var xs = [], secs = [];
    for (i = 0; i < TAB.length; i++) xs.push(XB - TAB[i][0]);
    for (d = 1.0; d < 90.0; d += 2.4) xs.push(XB - d);
    xs.sort(function (p, q) { return p - q; });
    for (i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] < 0.05) { xs.splice(i, 1); i--; }
    for (i = 0; i < xs.length; i++) {
      secs.push({ x: xs[i], w: hullR(xs[i]) * 1.02, h: hullR(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 52), 0, 0, 0);
    A.add("deck", new THREE.SphereGeometry(0.4, 10, 8), XB - 0.2, 0, zcAt(XB));
    A.add("sail", new THREE.CircleGeometry(hullR(XB - HL) + 0.02, 12), XB - HL, 0, zcAt(XB - HL), 0, -PI / 2, 0);

    /* ---- free-flood slot pairs on the upper hull side (drawing, rows as read) ---- */
    var rows = [
      [530, 1.16], [590, 1.16], [662, 1.16], [780, 1.16], [840, 1.16], [945, 1.16],
      [1045, 1.5], [1062, 1.5], [1078, 1.5], [1094, 1.5], [1175, 1.55], [1255, 0.5], [1272, 0.5], [1289, 0.5]
    ];
    for (k = 0; k < rows.length; k++) {
      var dd = (1397 - rows[k][0]) / 15.08, xx = XB - dd, zz = rows[k][1];
      for (i = -1; i <= 1; i += 2) {
        A.add("dark", new THREE.BoxGeometry(0.95, 0.14, 0.26), xx, i * (sideY(xx, zz) - 0.03), zz);
        if (k < 6) A.add("dark", new THREE.BoxGeometry(0.95, 0.14, 0.26), xx - 1.4, i * (sideY(xx - 1.4, zz) - 0.03), zz);
      }
    }
    for (x = 12.0; x > -4.0; x -= 1.6) {                        /* dashes along the after casing */
      for (i = -1; i <= 1; i += 2) {
        A.add("dark", new THREE.BoxGeometry(0.50, 0.12, 0.14), -x - 12.0, i * (sideY(-x - 12.0, 0.5) - 0.03), 0.5);
      }
    }
    /* bow-plane slot: the planes are housed, only the slot shows */
    for (i = -1; i <= 1; i += 2) {
      A.add("dark", new THREE.BoxGeometry(5.3, 0.12, 0.36), XB - 21.4, i * (sideY(XB - 21.4, 2.5) - 0.02), 2.5);
    }

    /* ---- fairwater: faired block, vertical rounded fore end, long convex after slope ---- */
    var rings = [], zl = [3.1, 3.6, 4.1, 4.6, 5.1, 5.55, 5.9, 6.1, 6.2], hw, aft, fore;
    for (i = 0; i < zl.length; i++) {
      var u = (zl[i] - 3.1) / 3.1;
      aft = 34.2 + 5.4 * Math.pow(Math.max(0, 1 - u), 2.0);
      fore = 22.8 + 1.1 * Math.pow(u, 3);
      hw = 1.72 - 0.12 * u;
      var top = (i === zl.length - 1);
      rings.push({ z: zl[i], pts: rrect(XB - aft + (top ? 0.5 : 0), XB - fore - (top ? 0.4 : 0), hw - (top ? 0.35 : 0), top ? 0.7 : 0.9, 32) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    /* dark panels on the sail side, as drawn (two slot pairs and a small grille) */
    for (i = -1; i <= 1; i += 2) {
      A.add("dark", new THREE.BoxGeometry(0.75, 0.08, 0.26), XB - 29.0, i * 1.58, 6.55);
      A.add("dark", new THREE.BoxGeometry(0.75, 0.08, 0.26), XB - 30.4, i * 1.58, 6.55);
      A.add("dark", new THREE.BoxGeometry(1.1, 0.08, 0.5), XB - 26.0, i * 1.64, 6.3);
    }

    /* ---- masts and tubes (positions and tops read off the drawing; generic tubes) ---- */
    var zt = 6.2;
    function mz(y) { return 6.2 + (131 - y) / 15.08; }
    var tubes = [[889, 65, 0.11], [910, 62, 0.10], [960, 65, 0.09]];
    for (k = 0; k < tubes.length; k++) {
      x = XB - (1397 - tubes[k][0]) / 15.08;
      strut(THREE, A, "metal", tubes[k][2], [x, 0, zt - 0.4], [x, 0, mz(tubes[k][1])], 8);
    }
    x = XB - (1397 - 933) / 15.08;                                           /* thick mast with the brown cap */
    strut(THREE, A, "metal", 0.20, [x, 0, zt - 0.4], [x, 0, mz(58)], 10);
    A.add("cap", new THREE.CylinderGeometry(0.34, 0.30, 1.1, 12), x, 0, mz(49), PI / 2, 0, 0);
    A.add("cap", new THREE.SphereGeometry(0.34, 10, 6), x, 0, mz(49) + 0.55);
    x = XB - (1397 - 903) / 15.08;                                           /* open-frame mast */
    for (i = -1; i <= 1; i += 2) strut(THREE, A, "metal", 0.04, [x, i * 0.28, zt - 0.4], [x, i * 0.28, mz(48)], 5);
    for (k = 0; k < 4; k++) A.add("metal", new THREE.BoxGeometry(0.5, 0.64, 0.04), x, 0, mz(48) + 0.10 + k * 0.35);
    x = XB - (1397 - 884) / 15.08;                                           /* raked whip aerial */
    strut(THREE, A, "metal", 0.04, [x, 0, zt - 0.4], [x - 0.9, 0, mz(3)], 5);

    /* ---- cruciform stern ---- */
    var tz = zOf(367) - 0.1;
    var xa = XB - 85.5;
    var up = [[xa, zOf(366)], [xa, zOf(210)], [xa + 3.3, zOf(210)], [xa + 4.4, zOf(238)], [xa + 5.6, zOf(285)], [xa + 6.6, zOf(318)], [xa + 6.6, zOf(366)]];
    A.add("sail", ext(THREE, up, 0.34, true), 0, 0.17, 0);
    var lo = [[xa, zOf(366)], [xa, zOf(468)], [xa + 3.3, zOf(468)], [xa + 5.0, zOf(408)], [xa + 5.0, zOf(366)]];
    A.add("sail", ext(THREE, lo, 0.34, true), 0, 0.17, 0);
    /* stern-plane fairing on the tail cone, planes through it */
    A.add("sail", new THREE.SphereGeometry(1, 16, 10), XB - 82.6, 0, tz, 0, 0, 0, [2.9, 0.62, 0.62]);
    var sp = [[0.0, 0.5], [-1.6, 4.4], [-3.3, 4.4], [-3.6, 0.5], [-3.6, -0.5], [-3.3, -4.4], [-1.6, -4.4], [0.0, -0.5]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.18), XB - 82.4, 0, tz - 0.09);

    /* ---- single screw: shaft boss, hub cap, seven scimitar blades ---- */
    var px = -XB + 0.65;
    A.add("deck", new THREE.CylinderGeometry(0.30, 0.22, 2.0, 10), -XB + 1.2, 0, tz, 0, 0, -PI / 2 + 0);
    A.add("screw", new THREE.CylinderGeometry(0.46, 0.34, 0.9, 12), px + 0.1, 0, tz, 0, 0, PI / 2);
    A.add("screw", new THREE.ConeGeometry(0.34, 0.6, 12), px - 0.35, 0, tz, 0, 0, PI / 2);
    var bl = [[-0.10, 0.34], [-0.45, 0.80], [-0.62, 1.30], [-0.40, 1.75], [0.05, 1.82], [0.34, 1.50], [0.40, 0.90], [0.18, 0.34]];
    for (i = 0; i < 7; i++) {
      var gb = ext(THREE, bl, 0.05);
      gb.translate(0, 0, -0.025);
      gb.rotateY(0.5);
      A.add("screw", gb, px, 0, tz, i * 2 * PI / 7, 0, 0);
    }

    /* ---- modest team strips on the casing crown ---- */
    A.add("team", new THREE.BoxGeometry(3.0, 0.9, 0.05), XB - 11.0, 0, topAt(XB - 11.0) + 0.025);
    A.add("team", new THREE.BoxGeometry(3.0, 0.9, 0.05), XB - 52.0, 0, topAt(XB - 52.0) + 0.04);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 92.5 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e60_ssn"] = {
  len: 92.5,
  build: function (THREE, M, C) { return HeroVictor671.build(THREE, M, C); }
};
