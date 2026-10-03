/* ============ ru_delta4.js -- HERO model: Project 667BDRM Delfin / Delta IV SSBN, K-51 (pact_e90_ssbn) ============
   The 1990s fit of the boat the row names ("Delta IV SSBN", K-51 Verkhoturye, 1984): sixteen R-29RM tubes in the
   tall casing abaft the sail, the long towed-array pod on the upper fin. No refit (no Sineva-era change that
   the sources show on the outside).
   References (Wikimedia Commons, fetched small into scratchpad/delta4_ref):
     - "Delta IV class SSBN.svg" (a_w.png, side elevation, 1920 px = 167.4 m, 11.47 px/m): THE source for the
       stations. The white boot line (waterline) is at 185 px; hull top forward of the sail 2.65 m over the water,
       keel 9.1 m under it (draught 8.8 m published), hull a circle of about 5.85 m radius with the centre 3.2 m under
       the water; the missile casing rises from 600 px (52 m from the stern) in a long
       ramp to a flat crown 6.5 m over the water that runs 1015-1355 px, with eight lid panels in a row (16 tubes in
       two rows); the sail 1355-1562 px (18 m long, 31-49 m abaft the bow), top 9.0 m over the water; masts on the
       after two thirds of the sail, tops 10.5-15 m, whips to 16 m; the fairwater planes at 5.7 m over the water
       on the forward half of the sail; a long dark limber slot just above the water line (630-1330 px) and a lower
       row (920-1360 px) at 4.5 m under it; the bow rounded over the last 18 m; the tail taper from 600 px aft;
       the tall upper fin (top 3.8 m over the water, pale pod = the towed-array fitting along its top), the ventral
       fin to keel depth, the stern plane edge-on at 2.8 m under the water, and ONE screw on the axis at the tail tip.
     - "Projekt667BDRM-Sensor-DE.svg" (d_w.png, cutaway of the sail with masts): the sail has a rounded fore end,
       vertical walls, a flat top and a steeper after end; the casing deck is wider than the sail; the planes sit
       at mid height on the sail; the mast group (ESM pod, snorkel, VHF/UHF, radar, optical/periscope heads, whips).
     - "Submarine Delta IV class.jpg" (b.jpg, bow-on starboard quarter, surfaced, 1990s colour photograph): black
       hull, the tall flat-sided casing with a flat top, the sail with the planes at half height, the fin with the pod.
     - "Delta class nuclear-powered ballistic missle submarine.jpg" (c.jpg, aerial): the long ramp of the casing
       blending into the hull abaft, black hull, the sail forward of the casing.
   Dimensions: 167.4 m long overall (to the screw tip), 11.7 m beam (published; the hull is a circle here).
   Not confirmed and so not drawn: no hull number, no flag, no rails, no bridge screen, no anechoic-tile pattern; the
   class has two shafts in published tables but the drawing shows ONE screw on the axis at the tail tip and I had no
   photograph astern, so one four-blade screw is drawn; the stern plane span (4.6 + hull) is read from the drawing's
   chord only, not from a plan view; the exact mast types are generic tubes with the pods the cutaway shows.
   The row is not turret:true, so nothing is named "turret". Model space +X bow, +Y port, +Z up, metres; waterline
   z = 0; render3d scales a submarine by UNIT_MODELS[key].len, which is the true length. Merged per material.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroDelta4_667BDRM = (function () {
  "use strict";

  var PI = Math.PI;
  var HL = 167.4, XB = 83.7, PXM = 11.47;
  function X(px) { return px / PXM - XB; }
  function Z(py) { return (185 - py) / PXM; }
  var TOP = 2.65;

  /* [px from the stern, radius, centre z]: tail cone, parallel body, rounded bow */
  var STA = [
    [17, 0.45, -3.7], [50, 1.1, -3.7], [100, 1.98, -3.7], [150, 3.3, -3.9], [230, 4.97, -3.84],
    [300, 5.4, -3.67], [500, 5.8, -3.3], [640, 5.85, -3.2], [900, 5.85, -3.2], [1200, 5.85, -3.2],
    [1500, 5.85, -3.2], [1700, 5.85, -3.2],
    [1800, 5.85, -3.2], [1830, 5.75, -3.2], [1858, 5.5, -3.2], [1880, 5.05, -3.2], [1897, 4.4, -3.2],
    [1910, 3.4, -3.2], [1916, 2.2, -3.2], [1919, 0.3, -3.2]
  ];
  function tab(x, k) {
    var px = (x + XB) * PXM, i;
    if (px <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (px <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (px - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return STA[STA.length - 1][k];
  }
  function hullR(x) { return tab(x, 1); }
  function zcAt(x) { return tab(x, 2); }
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
    var R1 = rng(6672), i, x, r, wl, ya, yb;
    g.fillStyle = "#4a2c24"; g.fillRect(0, 0, W, H);                 /* red-brown anti-fouling below */
    for (i = 0; i < 1000; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    var x0 = STA[0][0] / PXM - XB, x1 = STA[STA.length - 1][0] / PXM - XB;
    for (i = 0; i < W; i++) {
      x = x0 + (i + 0.5) / W * (x1 - x0);
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


  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x1f2325, 0.95, 0.04),     /* casing, matt black */
      sail:  std(0x25292c, 0.88, 0.06),     /* fairwater, fins, planes */
      dark:  std(0x0d0f10, 0.80, 0.20),     /* limber slots, lid panels, windows */
      keel:  std(0x4a2c24, 0.92, 0.04),     /* ventral fin, anti-fouling red-brown */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, shaft */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      cap:   std(0xb9bfc2, 0.70, 0.10),     /* pale mast pods */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* section outline (y, z), counter-clockwise seen from +x: rounded top, nearly square bottom */
  function ringRect(hw, zb, zt, rt) {
    var pts = [], k, a, rb = 0.2;
    var cs = [[hw - rt, zt - rt, rt, 0], [-hw + rt, zt - rt, rt, 0.5 * PI],
              [-hw + rb, zb + rb, rb, PI], [hw - rb, zb + rb, rb, 1.5 * PI]];
    for (var c = 0; c < 4; c++) {
      for (k = 0; k < 4; k++) {
        a = cs[c][3] + (k / 3) * 0.5 * PI;
        pts.push([cs[c][0] + cs[c][2] * Math.cos(a), cs[c][1] + cs[c][2] * Math.sin(a)]);
      }
    }
    return pts;
  }
  /* stations of equal-length (y, z) rings, increasing x, capped both ends, outward normals */
  function ringLoft(THREE, st) {
    var N = st[0].pts.length, L = st.length, pos = [], idx = [], i, j, k;
    for (i = 0; i < L; i++) for (j = 0; j < N; j++) pos.push(st[i].x, st[i].pts[j][0], st[i].pts[j][1]);
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var a = i * N + j, b = i * N + (j + 1) % N, c = a + N, d = b + N;
        idx.push(a, b, c, b, d, c);
      }
    }
    function cap(lv, fwd) {
      var base = pos.length / 3, cy = 0, cz = 0;
      for (k = 0; k < N; k++) { cy += st[lv].pts[k][0]; cz += st[lv].pts[k][1]; }
      pos.push(st[lv].x, cy / N, cz / N);
      for (k = 0; k < N; k++) pos.push(st[lv].x, st[lv].pts[k][0], st[lv].pts[k][1]);
      for (k = 0; k < N; k++) {
        var m = base + 1 + k, n = base + 1 + (k + 1) % N;
        if (fwd) idx.push(base, m, n); else idx.push(base, n, m);
      }
    }
    cap(L - 1, true); cap(0, false);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function lerpTab(t, v) {
    var i;
    if (v <= t[0][0]) return t[0][1];
    for (i = 1; i < t.length; i++) {
      if (v <= t[i][0]) return t[i - 1][1] + (t[i][1] - t[i - 1][1]) * (v - t[i - 1][0]) / (t[i][0] - t[i - 1][0]);
    }
    return t[t.length - 1][1];
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, x, k, z, sg;

    /* ---- pressure hull ---- */
    var secs = [], xs = [];
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (var px = 320; px < 1800; px += 70) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    for (i = 0; i < xs.length; i++) {
      if (i && xs[i] - xs[i - 1] < 0.2) continue;
      secs.push({ x: xs[i], w: hullR(xs[i]), h: hullR(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 72), 0, 0, 0);
    A.add("deck", new THREE.SphereGeometry(0.62, 12, 8), X(1919) - 0.5, 0, zcAt(X(1919)));
    A.add("sail", new THREE.CircleGeometry(0.45, 12), X(17), 0, zcAt(X(17)), 0, -PI / 2, 0);

    /* ---- limber slots: the long dark slot above the water line and the lower row ---- */
    for (x = X(630); x < X(1330); x += 4.6) {
      for (sg = -1; sg <= 1; sg += 2) A.add("dark", new THREE.BoxGeometry(4.3, 0.14, 0.13), x + 2.2, sg * (sideY(x + 2.2, 0.6) - 0.02), 0.6);
    }
    for (x = X(920); x < X(1360); x += 6.0) {
      for (sg = -1; sg <= 1; sg += 2) A.add("dark", new THREE.BoxGeometry(5.0, 0.12, 0.10), x + 2.5, sg * (sideY(x + 2.5, -4.5) - 0.02), -4.5);
    }
    /* small hole groups along the after casing flank, as the drawing's dots */
    for (k = 0; k < 8; k++) {
      for (sg = -1; sg <= 1; sg += 2) A.add("dark", new THREE.BoxGeometry(0.4, 0.12, 0.2), X(365 + k * 28), sg * (sideY(X(365 + k * 28), Z(163) - 0.9) - 0.02), Z(163) - 0.9);
    }

    /* ---- the tall missile casing: long ramp, flat crown, flat-sided ---- */
    var czt = [[460, 2.5], [530, 2.75], [600, 3.05], [700, 3.95], [800, 4.8], [900, 5.7], [1000, 6.4], [1015, 6.5], [1395, 6.5]];
    var chw = [[460, 0.5], [600, 2.2], [800, 3.6], [1000, 4.3], [1395, 4.3]];
    var stt = [], cp = [460, 530, 600, 700, 800, 900, 1000, 1015, 1200, 1395];
    for (i = 0; i < cp.length; i++) {
      var ztp = lerpTab(czt, cp[i]), hwp = lerpTab(chw, cp[i]);
      stt.push({ x: X(cp[i]), pts: ringRect(hwp, 0.0, ztp, Math.min(0.8, hwp * 0.5)) });
    }
    A.add("deck", ringLoft(THREE, stt), 0, 0, 0);
    var CT = 6.5;
    /* sixteen lid panels, two rows of eight */
    for (k = 0; k < 8; k++) {
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.BoxGeometry(3.1, 2.9, 0.05), X(1030) + 1.7 + k * 3.66, sg * 1.75, CT);
      }
    }
    A.add("sail", new THREE.BoxGeometry(30.0, 0.34, 0.08), X(1015) + 15.6, 0, CT + 0.005);

    /* ---- sail: rounded fore end, vertical walls, flat top ---- */
    var rings = [], sx0 = X(1355), sx1 = X(1562);
    var zl = [1.0, 2.4, 7.8, 8.7, 9.0];
    var ax0 = [sx0 - 0.5, sx0, sx0, sx0 + 0.3, sx0 + 0.8], ax1 = [sx1 + 0.5, sx1 + 0.2, sx1, sx1 - 0.3, sx1 - 0.8];
    var shw = [3.4, 3.25, 3.1, 2.9, 2.5];
    for (i = 0; i < zl.length; i++) rings.push({ z: zl[i], pts: rrect(ax0[i], ax1[i], shw[i], 1.4, 28) });
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    var STOP = 9.0;
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(0.55, 0.08, 0.35), sx1 - 2.6, sg * 3.12, 7.2);       /* small windows, forward */
      A.add("dark", new THREE.BoxGeometry(0.55, 0.08, 0.35), sx1 - 3.6, sg * 3.12, 7.2);
      A.add("dark", new THREE.BoxGeometry(2.0, 0.08, 0.7), sx0 + 4.5, sg * 3.15, 4.2);          /* recessed panel */
    }

    /* ---- fairwater planes at 5.7 m, mid height on the forward half of the sail ---- */
    var pz = 5.55, pxc = X(1514);
    var pl1 = ext(THREE, [[1.7, 0.0], [0.9, 6.4], [-0.7, 6.4], [-1.7, 0.0]], 0.28);
    A.add("sail", pl1, pxc, 0, pz);
    var pl2 = ext(THREE, [[1.7, 0.0], [-1.7, 0.0], [-0.7, -6.4], [0.9, -6.4]], 0.28);
    A.add("sail", pl2, pxc, 0, pz);

    /* ---- masts on the after two thirds of the sail ---- */
    var ms = [
      [1378, 0.7, 11.0, 0.20, "pod", 14.4], [1396, -0.5, 15.9, 0.05, "whip", 0], [1414, 0.5, 12.0, 0.17, "dome", 12.5],
      [1437, -0.8, 11.7, 0.17, "ball", 12.2], [1450, 0.8, 13.2, 0.09, "tip", 13.7], [1478, -0.4, 10.6, 0.19, "head", 11.3],
      [1492, 0.4, 12.6, 0.17, "cone", 14.4], [1503, -0.9, 16.2, 0.04, "whip", 0]
    ];
    for (k = 0; k < ms.length; k++) {
      var mx = X(ms[k][0]), my = ms[k][1], mt = ms[k][2], mr = ms[k][3], kd = ms[k][4];
      strut(THREE, A, "metal", mr, [mx, my, STOP - 0.1], [mx, my, mt], 8);
      if (kd === "pod") {
        cylZ(THREE, A, "cap", 0.55, 0.55, 3.0, 12, mx, my, mt + 1.4);
        A.add("cap", new THREE.CylinderGeometry(0.012, 0.55, 1.0, 12), mx, my, mt + 3.4, PI / 2, 0, 0);
      } else if (kd === "dome") {
        A.add("cap", new THREE.SphereGeometry(0.40, 10, 8), mx, my, mt + 0.1);
      } else if (kd === "ball") {
        A.add("metal", new THREE.SphereGeometry(0.45, 10, 8), mx, my, mt + 0.2);
      } else if (kd === "tip") {
        A.add("cap", new THREE.CylinderGeometry(0.012, 0.18, 0.7, 8), mx, my, mt + 0.3, PI / 2, 0, 0);
      } else if (kd === "head") {
        A.add("dark", new THREE.BoxGeometry(0.7, 0.55, 0.6), mx, my, mt + 0.3);
      } else if (kd === "cone") {
        A.add("cap", new THREE.CylinderGeometry(0.012, 0.34, 1.8, 10), mx, my, mt + 0.9, PI / 2, 0, 0);
      }
    }

    /* ---- tail: upper fin with the towed-array pod, ventral fin, stern planes, screw ---- */
    var up = [[X(235), Z(175)], [X(150), Z(142)], [X(88), Z(142)], [X(88), Z(215)], [X(200), Z(200)]];
    A.add("sail", ext(THREE, up, 0.72, true), 0, 0.36, 0);
    cylX(THREE, A, "cap", 0.44, 0.44, 5.4, 12, X(120), 0, Z(142) + 0.4);
    A.add("cap", new THREE.CylinderGeometry(0.44, 0.1, 0.9, 12), X(86), 0, Z(142) + 0.4, 0, 0, PI / 2);
    var lo = [[X(170), Z(262)], [X(140), Z(289)], [X(80), Z(289)], [X(80), Z(240)], [X(110), Z(235)]];
    A.add("keel", ext(THREE, lo, 0.72, true), 0, 0.36, 0);
    var sz = Z(217);
    var sp = [[X(205), 0.0], [X(180), 5.8], [X(152), 5.8], [X(128), 0.0], [X(152), -5.8], [X(180), -5.8]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.26), 0, 0, sz - 0.13);
    var bl = [[-0.10, 0.20], [-0.34, 0.60], [-0.42, 1.10], [-0.24, 1.45], [0.14, 1.47], [0.34, 1.10], [0.30, 0.60], [0.10, 0.20]];
    /* two shafts on short faired stubs flanking the tail cone, a four-blade screw on each */
    var pxs = -XB + 0.85, pzz = zcAt(-XB + 4.0);
    for (k = -1; k <= 1; k += 2) {
      var py = k * 1.75;
      A.add("keel", new THREE.SphereGeometry(1, 14, 8), -XB + 3.4, py, pzz, 0, 0, 0, [3.6, 0.62, 0.62]);   /* shaft fairing */
      cylX(THREE, A, "metal", 0.20, 0.20, 1.2, 10, pxs + 0.7, py, pzz);                                   /* shaft */
      cylX(THREE, A, "screw", 0.32, 0.22, 0.80, 12, pxs - 0.05, py, pzz);                                 /* boss */
      A.add("screw", new THREE.SphereGeometry(0.22, 10, 6), pxs - 0.45, py, pzz);
      for (i = 0; i < 4; i++) {
        var gb = ext(THREE, bl, 0.05);
        gb.translate(0, 0, -0.025);
        A.add("screw", gb, pxs - 0.1, py, pzz, i * PI / 2 + PI / 4, 0, 0);
      }
    }

    /* ---- modest team strips: forward deck and the after hull top ---- */
    A.add("team", new THREE.BoxGeometry(4.0, 1.20, 0.04), X(1740), 0, zcAt(X(1740)) + hullR(X(1740)) + 0.025);
    A.add("team", new THREE.BoxGeometry(3.0, 1.0, 0.04), X(400), 0, zcAt(X(400)) + hullR(X(400)) + 0.025);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 167.4 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e90_ssbn"] = {
  len: 167.4,
  build: function (THREE, M, C) { return HeroDelta4_667BDRM.build(THREE, M, C); }
};
