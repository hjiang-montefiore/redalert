/* ============ ru_november.js -- HERO model: Project 627A November (pact_e50_ssn) ============
   K-3 Leninsky Komsomol, the first Soviet nuclear submarine (Project 627), 1958 as the row says.
   CHECK-AND-FIX: the fairwater, its slope and mast heights follow the Project 627 drawing
   (b.png: fairwater 27-43 m from the bow, flat top, vertical fore end, gentle long
   after slope, top about 3.7 m over the casing, masts to about 8.9 m over it); the
   627A drawing has a shorter, steeper sail. Hull colour sampled from the K-3 photograph.
   NO waterline stripe: the only photograph of K-3 is the restored museum boat, no
   period photograph was found, so a white stripe is not drawn.

   References (Wikimedia Commons, fetched small into scratchpad/nov_ref):
     - "November class SSN 627A project.svg" (a.png): side elevation of 627A, the
       main source. 1397 px = 107.4 m (13.0 px/m). Gives the long cylindrical hull
       with the rounded bow, the free-flood casing with rows of limber holes, the
       round and rectangular casing hatches (torpedo loading hatch forward),
       the stepped fairwater (sail) 27-40 m abaft the bow with its long sloped
       after end and flat top about 3.4 m over the casing, six masts and
       periscope tubes rising 7 m above it, the bow plane stub on the casing,
       the tail that stays high and carries the upper rudder, the long
       streamlined shaft fairings aft with the screw, the lower rudder.
     - "November submarine.svg" (b.png, 627): same layout, shows the stern
       planes and the ventral rudder rectangle at the stern.
     - K-3 in the Kronshtadt museum photograph (k3.jpg): hull reads BLACK above the
       white boot line, a large light-grey sonar window and dark round ports on
       the bow, bow planes (retracted into the casing in service, shown run out
       in the museum, so NOT drawn out here), very round blunt bow.
   Dimensions: 107.4 m long, 7.9 m beam (sub_specs.js and the drawing agree);
   the hull is a circle of 3.95 m radius with its axis 1.9 m under the waterline
   (the drawing puts the casing about 1.9 m above the water and the keel about 5.8 m under).
   Not confirmed and so not drawn: no hull number, no flag, no rigging, no
   guard rails; the propeller blade count is not given by my sources (four drawn);
   the exact mast types are not named in the sources (generic tubes and a loop).
   The row is not turret:true, so nothing is named "turret".
   Model space +X bow, +Y port, +Z up, metres; waterline z = 0. render3d scales
   a submarine by UNIT_MODELS[key].len, which is the true 107.4 m.
   Merged per material (8 draw calls). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNovember627 = (function () {
  "use strict";

  var PI = Math.PI;
  var HL = 106.2, XB = 53.1;
  var R = 3.95, ZA = -1.9, TOP = ZA + R;

  /* [s from the bow, radius]: very round bow, parallel body, fine tail */
  var STA = [
    [0.000, 0.55], [0.004, 1.40], [0.010, 2.00], [0.020, 2.62], [0.035, 3.12],
    [0.055, 3.50], [0.080, 3.76], [0.110, 3.90], [0.150, 3.95], [0.760, 3.95],
    [0.800, 3.88], [0.840, 3.66], [0.880, 3.30], [0.920, 2.80], [0.950, 2.30],
    [0.975, 1.90], [1.000, 1.55]
  ];
  function hullR(x) {
    var s = (XB - x) / HL, i;
    if (s <= 0) return STA[0][1];
    if (s >= 1) return STA[STA.length - 1][1];
    for (i = 1; i < STA.length; i++) {
      if (s <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (s - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return 1.55;
  }
  /* crown height: stays at 2.05 to s = 0.78 then settles to 1.5 at the tail
     (the drawing keeps the tail high so the upper rudder stands on it) */
  function topAt(x) {
    var s = (XB - x) / HL;
    if (s <= 0.78) return TOP;
    return TOP + (1.5 - TOP) * Math.min(1, (s - 0.78) / 0.22);
  }
  function zcAt(x) { return topAt(x) - hullR(x); }
  function sideY(x, z) {
    var r = hullR(x), dz = z - zcAt(x), v = r * r - dz * dz;
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
    var R1 = rng(6271), i, x, r, wl, ya, yb;
    g.fillStyle = "#4a2c24"; g.fillRect(0, 0, W, H);                 /* red-brown anti-fouling */
    for (i = 0; i < 1000; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      x = -XB + (i + 0.5) / W * HL;
      r = hullR(x);
      var zc = zcAt(x);
      if (r <= -zc) continue;
      wl = Math.asin(-zc / r) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;
      g.fillStyle = "#3a3a3b"; g.fillRect(i, ya, 1, yb - ya);          /* black above the water, photograph reads 4d4948 under museum light */
    }
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1;               /* frame seams */
    for (i = 0; i < W; i += 29) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(90,60,40," + (0.05 + R1() * 0.07).toFixed(3) + ")";
      g.fillRect(40 + R1() * 440, R1() < 0.5 ? 0.14 * H : 0.86 * H, 1.5, 6 + R1() * 14);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex = t;
    return t;
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

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x1f2427, 0.95, 0.04),     /* hull ends, casing, matt black */
      sail:  std(0x2b3135, 0.88, 0.06),     /* fairwater, fins, grey-black */
      dark:  std(0x111416, 0.80, 0.20),     /* limber holes, hatches */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, shafts */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      sonar: std(0x8b9399, 0.70, 0.10),     /* bow sonar window, light grey in the photograph */
      team:  std(team, 0.86, 0.06)
    };
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
    var i, x, k, z;

    /* ---- pressure hull: rounded bow, long parallel body, fine tail ---- */
    var xs = [], secs = [];
    for (i = 0; i < STA.length; i++) xs.push(XB - STA[i][0] * HL);
    for (x = XB - 6.0; x > -XB + 3.0; x -= 3.0) if (x < XB - 10.5 && x > -XB + 12.0) xs.push(x);
    xs.sort(function (p, q) { return p - q; });          /* tail to bow, as M.loft wants */
    for (i = 0; i < xs.length; i++) {
      secs.push({ x: xs[i], w: hullR(xs[i]), h: hullR(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 56), 0, 0, 0);
    A.add("deck", new THREE.SphereGeometry(0.56, 12, 8), XB - 0.25, 0, zcAt(XB));
    A.add("sail", new THREE.CircleGeometry(1.56, 16), -XB, 0, zcAt(-XB), 0, -PI / 2, 0);

    /* ---- bow sonar window and dark ports (museum photograph) ---- */
    A.add("sonar", patch(THREE, 1, 48.6, 51.4, -1.7, -0.55, 0.07), 0, 0, 0);
    A.add("sonar", patch(THREE, -1, 48.6, 51.4, -1.7, -0.55, 0.07), 0, 0, 0);
    A.add("dark", patch(THREE, 1, 50.0, 51.6, -0.1, 0.9, 0.07), 0, 0, 0);
    A.add("dark", patch(THREE, -1, 50.0, 51.6, -0.1, 0.9, 0.07), 0, 0, 0);
    A.add("dark", patch(THREE, 1, 50.4, 51.7, -2.6, -1.9, 0.07), 0, 0, 0);
    A.add("dark", patch(THREE, -1, 50.4, 51.7, -2.6, -1.9, 0.07), 0, 0, 0);

    /* ---- free-flood limber holes, rows as drawn ---- */
    for (x = -46.0; x <= 46.0; x += 2.2) {
      if (x > 8.5 && x < 27.0) continue;                      /* under the fairwater */
      if (x > 34.0 && x < 43.0) continue;                      /* torpedo loading hatch */
      for (k = -1; k <= 1; k += 2) {
        A.add("dark", new THREE.BoxGeometry(0.55, 0.14, 0.15), x, k * (sideY(x, 1.45) - 0.03), 1.45);
      }
    }
    for (x = -47.0; x <= 40.0; x += 3.1) {
      if (((x + 47.0) / 3.1 | 0) % 4 === 3) continue;          /* the drawing leaves gaps */
      for (k = -1; k <= 1; k += 2) {
        A.add("dark", new THREE.BoxGeometry(0.40, 0.14, 0.14), x, k * (sideY(x, -0.4) - 0.03), -0.4);
      }
    }
    for (x = -20.0; x <= 28.0; x += 2.4) {                      /* low row near the keel, sparse */
      if (((x + 20.0) / 2.4 | 0) % 3 === 2) continue;
      for (k = -1; k <= 1; k += 2) {
        A.add("dark", new THREE.BoxGeometry(0.40, 0.14, 0.14), x, k * (sideY(x, -3.9) - 0.03), -3.9);
      }
    }

    /* ---- casing hatches on the crown ---- */
    var zc2 = TOP + 0.02;
    A.add("dark", new THREE.BoxGeometry(4.4, 1.30, 0.12), 38.5, 0, zc2 - 0.05);      /* torpedo loading hatch */
    A.add("sail", new THREE.BoxGeometry(4.9, 1.7, 0.08), 38.5, 0, zc2 - 0.09);       /* coaming */
    var hx = [-29.0, -18.8, -14.6, -4.6, 30.3, 6.5, -38.0];
    for (k = 0; k < hx.length; k++) cylZ(THREE, A, "dark", 0.50, 0.50, 0.10, 14, hx[k], 0, zc2 + 0.02);
    var vx = [-33.0, -31.8, -30.2, -26.0, -24.6, -22.0, -21.4];
    for (k = 0; k < vx.length; k++) {                            /* vents and cleats on the tail casing */
      A.add("deck", new THREE.BoxGeometry(0.40, 0.30, 0.34), vx[k], (k % 2 ? 0.7 : -0.7), zc2 + 0.12);
    }
    /* bow plane slots: the planes are housed in the casing, run out only on the museum boat */
    for (k = -1; k <= 1; k += 2) {
      A.add("dark", new THREE.BoxGeometry(2.0, 0.22, 0.40), 34.6, k * (sideY(34.6, 1.25) - 0.02), 1.25);
      A.add("sail", new THREE.BoxGeometry(0.5, 0.30, 0.46), 35.8, k * (sideY(35.8, 1.25) - 0.02), 1.25);
    }

    /* ---- fairwater: long sloped after end, flat top, as drawn ---- */
    var rings = [], zl = [1.2, 2.05, 2.45, 3.25, 4.65, 5.25, 5.8];
    var x0 = [9.4, 9.8, 12.2, 13.6, 15.5, 17.4, 20.0], x1 = [25.8, 25.8, 25.8, 25.7, 25.5, 25.3, 25.0];
    var hw = [1.90, 1.86, 1.78, 1.70, 1.56, 1.46, 1.40];
    for (i = 0; i < zl.length; i++) rings.push({ z: zl[i], pts: rrect(x0[i], x1[i], hw[i], 0.8, 28) });
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    A.add("sail", new THREE.BoxGeometry(0.9, 0.14, 0.34), 24.2, 0, 5.96);               /* hatch bump */
    A.add("dark", new THREE.BoxGeometry(2.4, 0.10, 0.05), 21.8, hw[4] + 0.0, 4.2);      /* side panel recess */
    A.add("dark", new THREE.BoxGeometry(2.4, 0.10, 0.05), 21.8, -hw[4] - 0.0, 4.2);

    /* ---- masts and periscope tubes (heights read off the drawing) ---- */
    var zt = 5.5;
    strut(THREE, A, "metal", 0.07, [14.4, 0, 3.7], [13.2, 0, 6.0], 6);      /* raked aerial mast, 627 drawing */
    var mx = [17.3, 18.1, 19.1, 20.2, 21.0], mt = [10.9, 10.6, 10.0, 9.5, 8.0], mr = [0.11, 0.12, 0.10, 0.09, 0.08];
    for (k = 0; k < mx.length; k++) strut(THREE, A, "metal", mr[k], [mx[k], 0, zt], [mx[k], 0, mt[k]], 8);
    A.add("dark", new THREE.BoxGeometry(0.34, 0.26, 0.5), 18.1, 0, 10.35);
    A.add("dark", new THREE.BoxGeometry(0.34, 0.26, 0.5), 17.3, 0, 10.65);
    A.add("dark", new THREE.BoxGeometry(0.30, 0.24, 0.45), 19.1, 0, 9.75);
    strut(THREE, A, "metal", 0.06, [16.4, 0, 4.4], [16.4, 0, 6.8], 6);      /* open frame antenna */
    A.add("dark", new THREE.BoxGeometry(0.5, 0.3, 1.1), 16.4, 0, 7.3);
    strut(THREE, A, "metal", 0.06, [22.6, 0, zt], [22.6, 0, 7.0], 6);      /* direction-finder loop */
    A.add("metal", new THREE.TorusGeometry(0.34, 0.035, 6, 14), 22.6, 0, 7.25, PI / 2, 0, 0);

    /* ---- stern: upper rudder, ventral rudder, stern planes ---- */
    var up = [[-47.2, 1.4], [-48.6, 2.8], [-53.4, 2.8], [-53.8, 1.4]];
    A.add("sail", ext(THREE, up, 0.30, true), 0, 0.15, 0);
    var lo = [[-51.2, -1.4], [-53.9, -1.4], [-53.9, -5.0], [-52.2, -5.0]];
    A.add("sail", ext(THREE, lo, 0.28, true), 0, 0.14, 0);
    var sp = [[-48.0, 1.2], [-49.8, 4.3], [-53.0, 4.3], [-53.8, 1.2], [-53.8, -1.2], [-53.0, -4.3], [-49.8, -4.3], [-48.0, -1.2]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.16), 0, 0, -0.35);

    /* ---- twin shafts in long streamlined fairings, with the screws ---- */
    var bl = [[-0.10, 0.18], [-0.30, 0.50], [-0.36, 0.95], [-0.20, 1.22], [0.12, 1.24], [0.30, 0.95], [0.26, 0.50], [0.10, 0.18]];
    for (k = -1; k <= 1; k += 2) {
      var py = k * 2.35, pz = -3.0, px = -53.9;
      A.add("deck", new THREE.SphereGeometry(1, 14, 8), -44.8, py, pz, 0, 0, 0, [8.6, 0.95, 0.95]);
      strut(THREE, A, "metal", 0.12, [-52.0, k * 0.9, -1.2], [-51.2, py, pz + 0.2], 6);       /* bracket to the tail */
      strut(THREE, A, "metal", 0.12, [-48.0, k * 1.3, -2.0], [-47.5, py, pz + 0.3], 6);
      cylX(THREE, A, "metal", 0.20, 0.20, 1.7, 10, -52.9, py, pz);                            /* shaft */
      cylX(THREE, A, "screw", 0.26, 0.20, 0.70, 12, px + 0.30, py, pz);                       /* boss */
      A.add("screw", new THREE.SphereGeometry(0.20, 10, 6), px - 0.12, py, pz);
      for (i = 0; i < 4; i++) {
        var gb = ext(THREE, bl, 0.04);
        gb.translate(0, 0, -0.02);
        A.add("screw", gb, px, py, pz, i * PI / 2, 0, 0);
      }
    }

    /* ---- modest team strips on the crown ---- */
    A.add("team", new THREE.BoxGeometry(3.0, 0.90, 0.04), 44.0, 0, TOP + 0.01);
    A.add("team", new THREE.BoxGeometry(3.0, 0.90, 0.04), -12.0, 0, TOP + 0.01);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 107.4 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e50_ssn"] = {
  len: 107.4,
  build: function (THREE, M, C) { return HeroNovember627.build(THREE, M, C); }
};
