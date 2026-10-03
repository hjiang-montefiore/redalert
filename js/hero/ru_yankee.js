/* ============ ru_yankee.js -- HERO model: Project 667A Navaga / Yankee I (pact_e60_ssbn) ============
   First Soviet 16-tube ballistic missile submarine, K-137 of 1967 as the row says.
   References (Wikimedia Commons, fetched small into scratchpad/yankee_ref):
     - "Yankee class SSBN.svg" (a_w.png): side elevation, the main source. 1400 px = 129.8 m
       (10.8 px/m). Gives the long round hull with a blunt bow and a long taper aft, the
       fairwater 24.6-42.6 m abaft the bow with a flat top about 6 m over the casing and vertical
       ends, the fairwater planes mounted on the fairwater (not on the bow), the raised
       flat missile deck abaft the fairwater from 42.6 to 65 m with eight hatch panels shown
       per side and a ramp aft, the six masts and periscope tubes on the after half of the fairwater
       (tops about 13-16 m over the water), the tail with an upper and a lower rudder and
       the screw, the casing limber slots. Surfaced trim: casing about 3.4 m over the
       waterline, keel about 8.3 m under it, upper rudder to about 3.9 m over, lower rudder
       to about 7.7 m under.
     - US Navy aerial photograph of K-219 (c.jpg, 1986 file K219-DN-SN-87-07255): hull and
       fairwater read BLACK, a low freeboard, the raised missile-deck hatches in a row, rounded
       fairwater top with pale caps on two of the masts and a long thin mast, planes on
       the fairwater side.
   Dimensions: 129.8 m long, 11.7 m beam (the hull is a circle of 5.85 m radius here).
   Not confirmed and so not drawn: no hull number, no flag, no waterline stripe, no rigging,
   no rails; the screw blade count is not given by my sources (four drawn); the exact
   mast types are not named (generic tubes with pale caps and a thin whip). The two screws
   are drawn on short shaft fairings: the drawing shows a single screw in profile, the
   twin-screw layout is the class layout. The row is not turret:true, so nothing is named
   "turret". Model space +X bow, +Y port, +Z up, metres; waterline z = 0; render3d scales a
   submarine by UNIT_MODELS[key].len, which is the true 129.8 m. Merged per material.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYankee667A = (function () {
  "use strict";

  var PI = Math.PI;
  var HL = 129.2, XB = 64.6;
  var R = 5.85, TOP = 3.4, ZA = TOP - R;
  var CAS_END = 0.74;

  /* [s from the bow, radius]: blunt bow, parallel body, long taper to the tail */
  var STA = [
    [0.000, 0.60], [0.003, 2.20], [0.009, 3.40], [0.020, 4.40], [0.035, 5.05],
    [0.055, 5.50], [0.080, 5.75], [0.110, 5.85], [0.740, 5.85],
    [0.780, 5.62], [0.820, 5.10], [0.860, 4.45], [0.900, 3.65], [0.935, 2.90],
    [0.965, 2.20], [0.985, 1.65], [1.000, 1.30]
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
    return 1.3;
  }
  /* crown: flat to s = 0.74 then falls to the waterline at the tail, as the drawing's top line does */
  function topAt(x) {
    var s = (XB - x) / HL;
    if (s <= CAS_END) return TOP;
    return TOP + (-0.3 - TOP) * Math.min(1, (s - CAS_END) / (1 - CAS_END));
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
    var R1 = rng(6671), i, x, r, wl, ya, yb;
    g.fillStyle = "#4a2c24"; g.fillRect(0, 0, W, H);                 /* red-brown anti-fouling below */
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
      g.fillStyle = "#2b2e30"; g.fillRect(i, ya, 1, yb - ya);          /* black above the water */
    }
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1;               /* plate seams */
    for (i = 0; i < W; i += 29) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
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
      deck:  std(0x1f2325, 0.95, 0.04),     /* hull ends, casing, matt black */
      sail:  std(0x25292c, 0.88, 0.06),     /* fairwater, fins, planes: black */
      dark:  std(0x0d0f10, 0.80, 0.20),     /* limber slots, hatch panels */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, shafts */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      cap:   std(0xb9bfc2, 0.70, 0.10),     /* pale mast caps as the K-219 photograph shows */
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

    /* ---- pressure hull ---- */
    var xs = [], secs = [];
    for (i = 0; i < STA.length; i++) xs.push(XB - STA[i][0] * HL);
    for (x = XB - 0.11 * HL - 6.0; x > XB - CAS_END * HL + 3.0; x -= 6.5) xs.push(x);
    xs.sort(function (p, q) { return p - q; });          /* tail to bow, as M.loft wants */
    for (i = 0; i < xs.length; i++) {
      secs.push({ x: xs[i], w: hullR(xs[i]), h: hullR(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 56), 0, 0, 0);
    A.add("deck", new THREE.SphereGeometry(0.62, 12, 8), XB - 0.3, 0, zcAt(XB));
    A.add("sail", new THREE.CircleGeometry(1.34, 16), -XB, 0, zcAt(-XB), 0, -PI / 2, 0);

    /* ---- casing limber slots, rows as the drawing's dashes ---- */
    var rows = [[2.9, 0.55, 1.9], [0.9, 0.45, 2.4], [-1.6, 0.40, 3.0]];
    for (var rw = 0; rw < rows.length; rw++) {
      var zr = rows[rw][0];
      for (x = XB - 6.0; x > -XB + 12.0; x -= rows[rw][2]) {
        if (x > XB - 43.0 && x < XB - 24.0) continue;          /* under the fairwater */
        if (rw === 0 && x > XB - 76.0 && x < XB - 42.0) continue;   /* under the missile deck */
        if (((x + 100) / rows[rw][2] | 0) % 4 === 3) continue;
        for (k = -1; k <= 1; k += 2) {
          A.add("dark", new THREE.BoxGeometry(rows[rw][1], 0.14, 0.15), x, k * (sideY(x, zr) - 0.03), zr);
        }
      }
    }

    /* ---- raised missile deck abaft the fairwater, ramp aft ---- */
    var MX1 = XB - 42.6, rings = [];
    var mz = [TOP - 1.0, TOP + 0.1, TOP + 1.0, TOP + 1.2];
    var mx0 = [XB - 75.5, XB - 70.5, XB - 66.5, XB - 65.4], mhw = [3.00, 3.20, 3.30, 3.30];
    for (i = 0; i < mz.length; i++) rings.push({ z: mz[i], pts: rrect(mx0[i], MX1, mhw[i], 0.5, 28) });
    A.add("deck", shell(THREE, rings), 0, 0, 0);
    /* sixteen hatch panels, two rows of eight, flat on the deck top */
    var hx0 = XB - 64.4, hp = 2.62;
    for (k = 0; k < 8; k++) {
      for (var sg = -1; sg <= 1; sg += 2) {
        var hxc = hx0 + 1.3 + k * hp;
        A.add("dark", new THREE.BoxGeometry(2.2, 2.4, 0.06), MX1 - 1.4 - k * hp + 0.0, sg * 1.55, TOP + 1.24);
      }
    }
    /* raised coaming ribs between the two rows */
    A.add("sail", new THREE.BoxGeometry(21.0, 0.30, 0.10), XB - 53.6, 0, TOP + 1.25);

    /* ---- fairwater: vertical ends, flat top ---- */
    rings = [];
    var zl = [TOP - 1.0, TOP + 0.4, TOP + 2.5, TOP + 4.8, TOP + 5.8, TOP + 6.2];
    var sx0 = XB - 42.6, sx1 = XB - 24.6;
    var ax0 = [sx0 - 0.4, sx0, sx0, sx0, sx0 + 0.15, sx0 + 0.5];
    var ax1 = [sx1 + 1.8, sx1 + 0.6, sx1, sx1, sx1 - 0.15, sx1 - 0.6];
    var shw = [3.00, 2.60, 2.50, 2.45, 2.35, 2.10];
    for (i = 0; i < zl.length; i++) rings.push({ z: zl[i], pts: rrect(ax0[i], ax1[i], shw[i], 0.9, 28) });
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    var STOP = TOP + 6.2;
    A.add("dark", new THREE.BoxGeometry(2.4, 0.08, 0.9), XB - 33.0, 2.47, TOP + 3.6);     /* side panel recess */
    A.add("dark", new THREE.BoxGeometry(2.4, 0.08, 0.9), XB - 33.0, -2.47, TOP + 3.6);
    A.add("dark", new THREE.BoxGeometry(1.4, 0.10, 0.6), XB - 38.0, 2.50, TOP + 3.8);
    A.add("dark", new THREE.BoxGeometry(1.4, 0.10, 0.6), XB - 38.0, -2.50, TOP + 3.8);

    /* ---- fairwater planes: a lens-section plate through the fairwater at 6.5 m over the water ---- */
    var pl = [[1.6, 0.0], [1.0, 3.0], [-1.2, 3.0], [-1.7, 0.0], [-1.2, -3.0], [1.0, -3.0]];
    var plz = 6.5;
    var plg = ext(THREE, [[1.6, 0.0], [1.0, 4.9], [-1.0, 4.9], [-1.7, 0.0]], 0.22);
    A.add("sail", plg, XB - 28.6, 0, plz);
    var plg2 = ext(THREE, [[1.6, 0.0], [-1.7, 0.0], [-1.0, -4.9], [1.0, -4.9]], 0.22);
    A.add("sail", plg2, XB - 28.6, 0, plz);

    /* ---- masts and periscope tubes on the after half, heights read off the drawing ---- */
    var mxs = [41.0, 40.0, 30.8, 29.9], mt = [15.2, 13.2, 13.6, 14.5], mr = [0.22, 0.20, 0.20, 0.18];
    for (k = 0; k < mxs.length; k++) {
      var mxp = XB - mxs[k], my = (k % 2 ? -0.7 : 0.7);
      strut(THREE, A, "metal", mr[k] * 0.55, [mxp, my, STOP - 0.1], [mxp, my, mt[k] - 0.8], 8);
      cylZ(THREE, A, "cap", mr[k], mr[k], 1.5, 10, mxp, my, mt[k] - 0.75);
      A.add("cap", new THREE.SphereGeometry(mr[k], 10, 6), mxp, my, mt[k]);
    }
    strut(THREE, A, "metal", 0.06, [XB - 39.1, 0.4, STOP - 0.1], [XB - 39.1, 0.4, 15.8], 6);      /* thin whip */
    strut(THREE, A, "metal", 0.05, [XB - 32.6, -0.3, STOP - 0.1], [XB - 32.9, -0.3, 16.4], 6);    /* long raked mast */
    A.add("metal", new THREE.BoxGeometry(0.6, 0.4, 0.4), XB - 35.2, 0, STOP + 0.2);               /* hatch bump */

    /* ---- stern: upper rudder, lower rudder, stern planes; each rooted on the hull ---- */
    var xr0 = -XB + 0.4, xr1 = -XB + 14.0;
    var upz = zcAt(xr1) + 0.3, up0 = zcAt(xr0) - 0.1;
    var up = [[xr1, upz], [-XB + 10.5, 3.9], [-XB + 3.4, 3.9], [xr0, up0 + 0.9], [xr0, up0 - 0.2], [xr1, upz - 0.3]];
    /* keep the polygon simple: root along the hull axis, free edge above */
    up = [[xr1, zcAt(xr1)], [-XB + 10.5, 3.9], [-XB + 3.4, 3.9], [xr0, up0 + 0.2], [xr0, up0]];
    A.add("sail", ext(THREE, up, 0.42, true), 0, 0.21, 0);
    var lo = [[xr1, zcAt(xr1)], [xr0, zcAt(xr0)], [-XB + 3.0, -7.7], [-XB + 10.0, -7.7]];
    A.add("sail", ext(THREE, lo, 0.42, true), 0, 0.21, 0);
    var spz = zcAt(-XB + 6.0);
    var sp = [[-XB + 15.0, 1.4], [-XB + 11.5, 5.2], [-XB + 5.0, 5.2], [-XB + 1.0, 1.4], [-XB + 1.0, -1.4], [-XB + 5.0, -5.2], [-XB + 11.5, -5.2], [-XB + 15.0, -1.4]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.20), 0, 0, spz - 0.10);

    /* ---- twin shafts in fairings, with the screws ---- */
    var bl = [[-0.10, 0.20], [-0.34, 0.60], [-0.42, 1.10], [-0.24, 1.45], [0.14, 1.47], [0.34, 1.10], [0.30, 0.60], [0.10, 0.20]];
    var pxs = -XB + 0.47;
    for (k = -1; k <= 1; k += 2) {
      var py = k * 1.9, pz = zcAt(-XB) - 0.2;
      A.add("deck", new THREE.SphereGeometry(1, 14, 8), -XB + 5.3, py, pz, 0, 0, 0, [5.2, 0.60, 0.60]);
      cylX(THREE, A, "metal", 0.20, 0.20, 1.2, 10, pxs + 0.6, py, pz);                        /* shaft */
      cylX(THREE, A, "screw", 0.30, 0.22, 0.80, 12, pxs - 0.15, py, pz);                      /* boss */
      A.add("screw", new THREE.SphereGeometry(0.22, 10, 6), pxs - 0.55, py, pz);
      for (i = 0; i < 4; i++) {
        var gb = ext(THREE, bl, 0.05);
        gb.translate(0, 0, -0.025);
        A.add("screw", gb, pxs - 0.2, py, pz, i * PI / 2 + PI / 4, 0, 0);
      }
    }

    /* ---- modest team strips on the casing ---- */
    A.add("team", new THREE.BoxGeometry(4.0, 1.20, 0.04), XB - 14.0, 0, TOP + 0.01);
    A.add("team", new THREE.BoxGeometry(4.0, 1.20, 0.04), -XB + 30.0, 0, TOP + 0.01);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 129.8 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e60_ssbn"] = {
  len: 129.8,
  build: function (THREE, M, C) { return HeroYankee667A.build(THREE, M, C); }
};
