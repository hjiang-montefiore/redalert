/* ============ ru_borei.js -- HERO model: Project 955A Borei-A SSBN, Knyaz Vladimir onward (ssbn_p) ============
   The present-day boat the row names ("Project 955A Borei-A", Knyaz Vladimir, commissioned 2020): sixteen Bulava
   tubes in two rows of eight under flush lids on the long casing abaft the sail, the boxy short sail, the tall
   vertical rudder, the pump-jet in its shroud.
   References (Wikimedia Commons, fetched small into scratchpad/borei_ref):
     - "Borey-A class SSBN.svg" (a.png, side elevation, 1920 px = 170 m, 11.29 px/m): THE source for the stations.
       Hull top flat at 160 px from 640 to 1200 px; keel flat at 331 px; the white boot line at 218 px (keel 10 m under
       it = the published draught); the sail 1228-1462 px (20.7 m long, 108.8 m from the stern), top 118 px (8.9 m over
       the water), vertical fore wall, squarer after end; eight lid panels in a row 818-1133 px; the long dark slot
       above the water line (540-1440 px) with the pale panel strips either side of it, the long dark flank slot low
       on the hull (710-1370 px, 5.5-6.8 m under the water); the tall rectangular fin 112-175 px (top 6.5 m over the
       water, ventral edge 10.8 m under it); the pump-jet shroud on the axis at the tail tip; the rounded bow. No
       sail planes are drawn (the Borey carries retractable bow planes in the hull: a hatch is drawn forward at 1620 px).
     - "Borey class SSBN.svg" (b.png, the first three Project 955 boats, same sheet scale): used to find the
       955 / 955A differences below.
     - "Russian Navy SSBN Generalissimus Suvorov.jpg" (c.jpg) and "A Borei class submarine at sea.jpg" (d.jpg),
       colour photographs: black hull, the wide flat casing, the box sail with rounded top corners and a flat top,
       the square vertical rudder, the rounded bow.
   955A against 955 as the two drawings show it: the 955A sail is shorter (20.7 m against 22.9 m) and boxier, with a
   vertical fore wall and a stubby after end, where the 955 sail is longer with a sloping aft fairing; the 955 casing
   is a long raised hump that swells over the mid body into the sail, the 955A casing is flat-topped and flush with
   the hull crown; the 955 fin is swept back with a curved leading edge and a long upper pod, the 955A fin is
   squarer, upright and shorter in chord; the 955 has a red anti-fouling patch on the bow sonar fairing that the
   955A drawing does not show.
   Dimensions: 170 m long overall (published 170 m), 13.5 m beam (published; hull section is a squarish ellipse
   13.5 m wide and 15.1 m high), draught 10 m.
   Not confirmed and so not drawn: no hull number, no flag, no rails, no bridge screen, no anechoic-tile pattern; the
   stern plane span (+-5.6 m) and the exact sail width (5.8 m) are NOT in the side drawing and are estimates from the
   photographs; masts are generic tubes with the pods the drawing shows; the pump-jet rotor and stator blade counts
   are read from no reference (nine rotor blades, seven stator vanes are illustrative). The drawing's boot line puts the
   crown 5.05 m over the water; photographs of surfaced boats (Generalissimus Suvorov alongside, Knyaz Vladimir at sea
   trials) show about 2.5-4 m, so the whole boat is lowered 1.0 m (SHIFT): crown 4.05 m over z = 0, hull keel 11.0 m under it
   (the published draught of 10 m is a nominal figure; the compromise between drawing and photographs is an estimate).
   Paint: the hull texture is black above the waterline and red-brown below, boundary computed from the lofted section.
   The row is not turret:true, so nothing is named "turret". Model space +X bow, +Y port, +Z up, metres; waterline
   z = 0; render3d scales a submarine by UNIT_MODELS[key].len, which is the true length. Merged per material.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBorei955A = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 11.29, XB = 85.0;
  /* the drawing's boot line is SHIFT m above the waterline used here: photographs of surfaced boats (Generalissimus
     Suvorov alongside, Knyaz Vladimir at sea) show 2.5-4 m of hull over the water, the drawing 5.05 m; every part is
     lowered by SHIFT in Acc, so the hull crown stands 4.05 m over z = 0 and the keel 11.0 m under it */
  var SHIFT = 1.0;
  function X(px) { return (px - 1) / PXM - XB; }
  function Z(py) { return (218 - py) / PXM; }

  /* [px from the stern, half-height, centre z] */
  var STA = [
    [20, 1.3, -3.05], [70, 2.0, -3.05], [80, 2.08, -3.05], [140, 3.6, -3.06], [200, 5.0, -3.06], [240, 5.62, -3.06],
    [280, 6.11, -3.0], [320, 6.51, -2.93], [400, 7.0, -2.83], [480, 7.31, -2.7], [560, 7.44, -2.57], [640, 7.53, -2.48],
    [1160, 7.53, -2.48], [1480, 7.49, -2.53], [1560, 7.40, -2.61], [1640, 7.22, -2.76], [1720, 7.04, -2.97],
    [1800, 6.55, -3.1], [1840, 5.93, -3.1], [1880, 4.6, -3.1], [1895, 3.4, -3.1], [1908, 2.3, -3.1],
    [1914, 1.3, -3.1], [1918, 0.3, -3.1]
  ];
  function tab(px, k) {
    var i;
    if (px <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (px <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (px - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return STA[STA.length - 1][k];
  }
  function hh(x) { return tab((x + XB) * PXM + 1, 1); }
  function hw(x) { return Math.min(hh(x), 6.75); }
  function zc(x) { return tab((x + XB) * PXM + 1, 2); }
  function sq(x) { var h = hh(x); return 1 + 0.1 * Math.max(0, Math.min(1, (h - 6) / 1.5)); }
  /* surface height at lateral offset y (body() lofts |cos|^e, |sin|^e, i.e. the 2/e superellipse) */
  function surfZ(x, y) {
    var w = hw(x), e = sq(x), r = Math.min(Math.abs(y) / w, 0.999);
    return zc(x) + hh(x) * Math.pow(1 - Math.pow(r, 2 / e), e / 2);
  }
  /* lateral half-width of the hull at height z */
  function sideY(x, z) {
    var h = hh(x), e = sq(x), r = Math.min(Math.abs(z - zc(x)) / h, 0.999);
    return hw(x) * Math.pow(1 - Math.pow(r, 2 / e), e / 2);
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
    var R1 = rng(9551), i, x, wl, ya, yb;
    g.fillStyle = "#4a2c24"; g.fillRect(0, 0, W, H);                 /* red-brown anti-fouling below */
    for (i = 0; i < 900; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    var x0 = X(STA[0][0]), x1 = X(STA[STA.length - 1][0]);
    for (i = 0; i < W; i++) {
      x = x0 + (i + 0.5) / W * (x1 - x0);
      var s = (SHIFT - zc(x)) / hh(x);
      if (s >= 1) continue;
      wl = Math.asin(Math.pow(s, 1 / sq(x))) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;
      g.fillStyle = "#26292b"; g.fillRect(i, ya, 1, yb - ya);          /* black above the water */
    }
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1;
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
        p.set(x || 0, y || 0, (z || 0) - SHIFT);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z - SHIFT), quat, s.set(1, 1, 1));
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


  /* a panel laid on the hull crown: a strip grid that follows surfZ, 4 cm proud, upward normals */
  function patch(THREE, x0, x1, y0, y1, ny) {
    var pos = [], idx = [], j, xx, yy;
    for (j = 0; j <= ny; j++) {
      yy = y0 + (y1 - y0) * j / ny;
      for (xx = 0; xx < 2; xx++) { var px = xx ? x1 : x0; pos.push(px, yy, surfZ(px, yy) + 0.04); }
    }
    for (j = 0; j < ny; j++) {
      var q = j * 2;
      if (y1 > y0) idx.push(q, q + 1, q + 2, q + 1, q + 3, q + 2); else idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function flip(g) {
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
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
      deck:  std(0x1c1f21, 0.95, 0.04),     /* lid panels, casing strips */
      sail:  std(0x23272a, 0.88, 0.06),     /* fairwater, fins, planes */
      dark:  std(0x0b0d0e, 0.80, 0.20),     /* slots, hatches, windows */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, shroud, rotor */
      cap:   std(0xb9bfc2, 0.70, 0.10),     /* pale mast pods */
      team:  std(team, 0.86, 0.06)
    };
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, x, k, sg;

    /* ---- pressure hull + casing, one lofted body ---- */
    var xs = [], secs = [], px;
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 100; px < 1900; px += 40) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    for (i = 0; i < xs.length; i++) {
      if (i && xs[i] - xs[i - 1] < 0.25) continue;
      secs.push({ x: xs[i], w: hw(xs[i]), h: hh(xs[i]), zc: zc(xs[i]), sq: sq(xs[i]) });
    }
    A.add("skin", body(THREE, M, secs, 64), 0, 0, 0);

    /* ---- limber slot above the water line, the low flank slot, small hatches ---- */
    for (x = X(540); x < X(1440); x += 6.0) {
      for (sg = -1; sg <= 1; sg += 2) A.add("dark", new THREE.BoxGeometry(5.6, 0.12, 0.14), x + 2.8, sg * (sideY(x + 2.8, 1.7) - 0.02), 1.7);
    }
    for (x = X(710); x < X(1370); x += 6.0) {
      for (sg = -1; sg <= 1; sg += 2) A.add("dark", new THREE.BoxGeometry(5.6, 0.12, 0.45), x + 2.8, sg * (sideY(x + 2.8, -6.1) - 0.02), -6.1);
    }
    var hat = [[365, 2.5], [392, 2.5], [1530, 2.5], [1615, 2.5], [1700, 2.5], [1810, 1.8]];
    for (k = 0; k < hat.length; k++) {
      for (sg = -1; sg <= 1; sg += 2) A.add("dark", new THREE.BoxGeometry(1.5, 0.12, 0.4), X(hat[k][0]), sg * (sideY(X(hat[k][0]), hat[k][1]) - 0.02), hat[k][1]);
    }
    for (sg = -1; sg <= 1; sg += 2) {                                   /* bow plane hatch */
      A.add("dark", new THREE.BoxGeometry(2.4, 0.1, 3.0), X(1620), sg * (sideY(X(1620), -1.6) - 0.02), -1.6);
    }

    /* ---- sixteen lid panels, two rows of eight; the pale strips beside the slot ---- */
    var lx0 = X(818), lw = (1133 - 818) / PXM / 8;
    for (k = 0; k < 8; k++) {
      for (sg = -1; sg <= 1; sg += 2) A.add("deck", patch(THREE, lx0 + k * lw + 0.06, lx0 + (k + 1) * lw - 0.06, sg * 0.22, sg * 2.7, 4), 0, 0, 0);
    }
    A.add("sail", new THREE.BoxGeometry(28.0, 0.30, 0.06), lx0 + 14.0, 0, surfZ(lx0 + 14.0, 0) + 0.02);

    /* ---- the sail: vertical fore wall, boxy, flat top, rounded corners ---- */
    var rings = [], sx0 = X(1228), sx1 = X(1462);
    var zl = [3.2, 4.0, 8.2, 8.62, 8.86];
    var ax0 = [sx0 - 0.1, sx0, sx0, sx0 + 0.25, sx0 + 0.8], ax1 = [sx1 + 0.9, sx1 + 0.3, sx1, sx1 - 0.2, sx1 - 0.8];
    var shw = [3.0, 2.95, 2.9, 2.75, 2.4];
    for (i = 0; i < zl.length; i++) rings.push({ z: zl[i], pts: rrect(ax0[i], ax1[i], shw[i], 1.3, 28) });
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    var STOP = 8.86;
    for (sg = -1; sg <= 1; sg += 2) {
      for (k = 0; k < 4; k++) A.add("dark", new THREE.BoxGeometry(0.55, 0.08, 0.30), sx0 + 3.6 + k * 1.0, sg * 2.93, 6.9);
      A.add("dark", new THREE.BoxGeometry(2.2, 0.08, 0.8), sx1 - 3.5, sg * 2.95, 4.9);
    }
    A.add("dark", new THREE.BoxGeometry(1.2, 0.8, 0.1), sx0 + 0.6, 0, STOP + 0.02);           /* top hatch */

    /* ---- masts on the sail ---- */
    var ms = [
      [1272, 0.9, 15.1, 0.12, "tube"], [1313, -0.7, 19.0, 0.04, "whip"], [1335, 0.0, 13.1, 0.30, "pod"],
      [1357, -1.2, 11.0, 0.10, "tube"], [1408, 1.1, 12.9, 0.16, "head"]
    ];
    for (k = 0; k < ms.length; k++) {
      var mx = X(ms[k][0]), my = ms[k][1], mt = ms[k][2], mr = ms[k][3], kd = ms[k][4];
      strut(THREE, A, "metal", mr, [mx, my, STOP - 0.1], [mx, my, mt], 8);
      if (kd === "pod") {
        cylZ(THREE, A, "cap", 0.50, 0.50, 2.2, 12, mx, my, mt - 0.2);
        A.add("cap", new THREE.CylinderGeometry(0.012, 0.50, 0.8, 12), mx, my, mt + 1.3, PI / 2, 0, 0);
      } else if (kd === "head") {
        A.add("dark", new THREE.BoxGeometry(0.6, 0.5, 0.5), mx, my, mt + 0.25);
      } else if (kd === "tube") {
        A.add("metal", new THREE.SphereGeometry(mr * 1.5, 8, 6), mx, my, mt + 0.05);
      }
    }

    /* ---- tail: rudder, ventral fin, stern planes, flank fairings, pump-jet ---- */
    var up = [[X(112), Z(145)], [X(160), Z(145)], [X(176), Z(196)], [X(215), Z(222)], [X(112), Z(222)]];
    A.add("sail", ext(THREE, up, 0.8, true), 0, 0.4, 0);
    var lo = [[X(100), Z(340)], [X(172), Z(340)], [X(184), Z(300)], [X(215), Z(274)], [X(100), Z(274)]];
    A.add("sail", ext(THREE, lo, 0.8, true), 0, 0.4, 0);
    var sz = Z(252);
    var sp = [[X(190), 0.0], [X(160), 5.6], [X(125), 5.6], [X(112), 0.0], [X(125), -5.6], [X(160), -5.6]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.24), 0, 0, sz - 0.12);
    for (sg = -1; sg <= 1; sg += 2) {                                   /* streamlined pod on each flank, as drawn */
      A.add("sail", new THREE.SphereGeometry(1, 12, 8), X(165), sg * (sideY(X(165), -3.05) - 0.1), -3.05, 0, 0, 0, [4.2, 0.45, 0.55]);
    }
    /* pump-jet: shroud around the tail tip, hub, nine rotor blades, seven stator vanes */
    var sx = X(40), sr = 3.05, szc = -3.05;
    var shr = new THREE.CylinderGeometry(3.0, 3.1, 6.2, 28, 1, true);
    shr.rotateZ(PI / 2); shr.translate(sx + 0.0, 0, szc);
    var ix = shr.getIndex();
    if (ix) A.add("metal", shr, 0, 0, 0);
    var shi = flip(new THREE.CylinderGeometry(2.8, 2.9, 6.1, 28, 1, true));
    shi.rotateZ(PI / 2); shi.translate(sx, 0, szc);
    A.add("dark", shi, 0, 0, 0);
    var lip = new THREE.TorusGeometry(2.95, 0.12, 6, 28);
    A.add("metal", lip, sx - 3.1, 0, szc, 0, PI / 2, 0);
    cylX(THREE, A, "metal", 0.9, 1.3, 2.4, 14, sx - 0.9, 0, szc);
    A.add("metal", new THREE.SphereGeometry(0.9, 12, 8), sx - 2.2, 0, szc);
    var bl = [[0.0, 0.0], [0.5, 0.2], [0.9, 1.4], [0.5, 2.7], [-0.3, 2.7], [-0.7, 1.3]];
    for (i = 0; i < 9; i++) {
      var gb = ext(THREE, bl, 0.05); gb.translate(0, 0.0, -0.025);
      A.add("metal", gb, sx - 1.7, 0, szc, i * 2 * PI / 9, 0, 0);
    }
    for (i = 0; i < 7; i++) {
      var vn = new THREE.BoxGeometry(1.1, 0.06, 1.35);
      vn.translate(0, 0, 1.0 + 0.0);
      A.add("metal", vn, sx + 1.6, 0, szc, i * 2 * PI / 7 + 0.2, 0, 0);
    }

    /* ---- modest team strips: forward on the casing and aft of the lids ---- */
    A.add("team", new THREE.BoxGeometry(4.0, 1.2, 0.04), X(1700), 0, surfZ(X(1700), 0) + 0.03);
    A.add("team", new THREE.BoxGeometry(3.0, 1.0, 0.04), X(430), 0, surfZ(X(430), 0) + 0.03);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 170 m: render3d scales a submarine by it. */
UNIT_MODELS["ssbn_p"] = {
  len: 170,
  build: function (THREE, M, C) { return HeroBorei955A.build(THREE, M, C); }
};
