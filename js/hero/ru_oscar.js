/* ============ ru_oscar.js -- HERO model: Project 949A Antey (NATO Oscar II) SSGN (ssgn_p) ============
   The 949A as built from 1986 (K-173 Krasnoyarsk onward), the boat of the row's "from e80": the
   twenty-four P-700 Granit tubes. The modernised 949AM refits (Oniks/Kalibr, 2010s) are NOT drawn.
   References (Wikimedia Commons, fetched small into scratchpad/oscar_ref):
     - "Oscar II class SSGN.svg" (a.png, side elevation, 1920 px = 154 m, 12.47 px/m): THE source for the
       stations: casing crown about 13.2 m over the keel (draught 9.2 m published, so the crown is 4.0 m
       over the water line; the white line on the drawing is the water line), the central hull a little
       higher over the sail, the long bow rounded over the last 15 m, the tail tapering from 40 m abaft
       amidships; the sail 28 m long, 17.8-46.1 m forward of amidships, flat roof 9 m over the water, rear
       edge raked, front rounded; six hatch panels per side (each two tubes) from 9 to 52 m forward of
       amidships (12 tubes a side, 24 in all), the retractable bow-plane housing forward of them; the tall
       upper fin with the towed-array pod across its head; the ventral fin to the keel line; seven-blade
       screw; black above the boot line, red-brown under it; the mast group on the sail roof (eight masts
       and the grey radome, x and tops read off the drawing).
     - Photographs "Oscar class submarine 2.JPG" (b.jpg, bow quarter, surfaced) and "Oscar class submarine 3.jpg"
       (c.jpg, US Navy, aerial): very wide flat-topped casing, the tall rounded-front sail sitting well
       forward, the long outward-sloping hatch panels either side of the centreline, dark rubber-tiled skin,
       upper fin with its pod aft.
   Dimensions: 154 m x 18.2 m, draught 9.2 m (published figures; the drawing agrees within 1 %).
   The hull is lofted from stations (superellipse section, E 0.75), merged per material (9 draw calls,
   9 materials). Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len, which is the true 154 m.
   Not confirmed and so not drawn: no hull number, flag or rigging; the mast types are not named by my sources
   (generic tubes and the radome); the tile pattern is a faint texture only. Estimated, not read: the beam
   of the sail (8 m), the tilt of the hatch panels (follows the casing shoulder), the span of the stern planes
   (about 13 m), the twin screw tail extensions (the drawing shows only one screw in profile; the class has
   two shafts). The row is not turret:true, so nothing is named "turret". ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOscar949A = (function () {
  "use strict";

  var PI = Math.PI;
  var WL = 0;
  var E = 0.75;                       /* superellipse exponent of the casing section */
  var ZB = -2.5;                      /* the drawing's black / red-brown boundary */
  var XBOW = 76.7, BW = 9.1, XT = 62.0;

  /* [x, crown z, keel z, half width] - read off the elevation (z over the water line) */
  var TAB = [
    [-74.0, -3.0, -4.6, 3.0], [-72.0, -2.4, -5.1, 3.9], [-70.0, -1.7, -5.8, 4.8],
    [-67.0, -0.6, -6.7, 6.0], [-64.0, 0.6, -7.6, 7.0], [-60.0, 1.8, -8.2, 7.8],
    [-55.0, 2.8, -8.7, 8.4], [-50.0, 3.2, -9.0, 8.8], [-40.0, 3.6, -9.2, 9.0],
    [-25.0, 4.3, -9.2, 9.1], [-10.0, 5.0, -9.2, 9.1], [8.0, 5.0, -9.2, 9.1],
    [14.0, 4.3, -9.2, 9.1], [20.0, 4.0, -9.2, 9.1], [XT, 4.0, -9.2, 9.1]
  ];
  function bowStation(x) {
    var t = (x - XT) / (XBOW - XT);
    var w = BW * Math.sqrt(Math.max(0, 1 - t * t));
    var top = 4.0 - 4.4 * Math.pow(Math.max(0, (x - 64.0) / 12.7), 2.2);
    var bot = -9.2 + 5.9 * Math.pow(Math.max(0, (x - 58.0) / 18.7), 2.0);
    return [x, top, bot, w];
  }
  function stationAt(x) {
    var i, a, b, t;
    if (x >= XT) return bowStation(Math.min(x, XBOW - 0.1));
    if (x <= TAB[0][0]) return TAB[0].slice();
    for (i = 1; i < TAB.length; i++) {
      if (x <= TAB[i][0]) {
        a = TAB[i - 1]; b = TAB[i]; t = (x - a[0]) / (b[0] - a[0]);
        return [x, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t];
      }
    }
    return TAB[TAB.length - 1].slice();
  }
  function crown(x) { return stationAt(x)[1]; }
  function surfZ(x, y, upper) {
    var s = stationAt(x), zc = (s[1] + s[2]) / 2, h = (s[1] - s[2]) / 2, w = s[3];
    var c = Math.min(1, Math.abs(y) / w), cs = Math.pow(c, 1 / E);
    var sn = Math.sqrt(Math.max(0, 1 - cs * cs));
    return zc + (upper ? 1 : -1) * h * Math.pow(sn, E);
  }
  function sideY(x, z) {
    var s = stationAt(x), zc = (s[1] + s[2]) / 2, h = (s[1] - s[2]) / 2, w = s[3];
    var v = Math.min(0.999, Math.abs(z - zc) / h), sn = Math.pow(v, 1 / E);
    return w * Math.pow(Math.sqrt(Math.max(0, 1 - sn * sn)), E);
  }

  function hullXs() {
    var xs = [], x;
    for (x = -74.0; x < 61.0; x += 2.2) xs.push(x);
    var bw = [62.0, 64.0, 66.0, 68.0, 70.0, 72.0, 73.6, 74.8, 75.7, 76.3, 76.6];
    for (x = 0; x < bw.length; x++) xs.push(bw[x]);
    return xs;
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  var _tex = null;
  function hullTex(THREE, X0, X1) {
    if (_tex) return _tex;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(9491), i, x, s, zc, h, t1, sb, ya, yb;
    g.fillStyle = "#4a2c24"; g.fillRect(0, 0, W, H);                 /* red-brown below */
    for (i = 0; i < 1400; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i += 4) {
      x = X0 + (i + 2) / W * (X1 - X0);
      s = stationAt(x); zc = (s[1] + s[2]) / 2; h = (s[1] - s[2]) / 2;
      sb = (ZB - zc) / h;
      if (sb >= 1) continue;
      sb = sb <= -1 ? -1 : (sb < 0 ? -Math.pow(-sb, 1 / E) : Math.pow(sb, 1 / E));
      t1 = Math.asin(sb) / (PI * 2);
      ya = (1 - (0.5 - t1)) * H; yb = (1 - t1) * H;
      g.fillStyle = "#26292b";
      g.fillRect(i, ya, 4, yb - ya);
      g.fillRect(i, ya - H, 4, yb - ya); g.fillRect(i, ya + H, 4, yb - ya);
    }
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;               /* anechoic tile joints */
    for (i = 0; i < W; i += 9) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    for (i = 0; i < H; i += 7) { g.beginPath(); g.moveTo(0, i); g.lineTo(W, i); g.stroke(); }
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
        p.set(x || 0, y || 0, (z || 0) - WL);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z - WL), quat, s.set(1, 1, 1));
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

  /* lofted body with the winding flipped so FrontSide faces outward (sections run tail to bow) */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }
  /* flat cap for a loft section: fan from the centre; dir +1 faces +X, -1 faces -X */
  function cap(THREE, sec, segs, dir) {
    var pos = [], uv = [], idx = [], j, e = sec.sq || 1;
    pos.push(sec.x, 0, sec.zc || 0); uv.push(0, 0);
    for (j = 0; j < segs; j++) {
      var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t);
      pos.push(sec.x, sec.w * Math.sign(cy) * Math.pow(Math.abs(cy), e),
               (sec.zc || 0) + sec.h * Math.sign(sz) * Math.pow(Math.abs(sz), e));
      uv.push(0, 0);
    }
    for (j = 0; j < segs; j++) {
      var a = 1 + j, b = 1 + (j + 1) % segs;
      if (dir > 0) idx.push(0, a, b); else idx.push(0, b, a);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
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
    var base = pos.length / 3, cx = 0, cy = 0, k;
    for (k = 0; k < N; k++) { cx += rings[L - 1].pts[k][0]; cy += rings[L - 1].pts[k][1]; }
    cx /= N; cy /= N;
    pos.push(cx, cy, rings[L - 1].z); uv.push(0, 0);
    for (k = 0; k < N; k++) { p = rings[L - 1].pts[k]; pos.push(p[0], p[1], rings[L - 1].z); uv.push(0, 0); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* flat extrusion of an outline: z from 0 to depth; xz turns the outline into the XZ plane (thickness toward -y) */
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

  function materials(THREE, C, X0, X1) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, X0, X1), roughness: 0.9, metalness: 0.05 }),
      deck:  new THREE.MeshStandardMaterial({ color: 0x23272a, roughness: 0.95, metalness: 0.04, side: THREE.DoubleSide }),
      sail:  std(0x25292c, 0.88, 0.06),
      red:   std(0x4a2c24, 0.92, 0.04),
      dark:  std(0x0d0f10, 0.80, 0.20),
      metal: std(0x3a4147, 0.55, 0.50),
      screw: std(0x6a5a34, 0.50, 0.60),
      cap:   std(0xb9bfc2, 0.70, 0.10),
      team:  std(team, 0.86, 0.06)
    };
  }

  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var A = Acc(THREE);
    var i, x, k, sg, z, s;
    var SEG = 44;

    /* ---- casing hull ---- */
    var xs = hullXs(), secs = [];
    for (i = 0; i < xs.length; i++) {
      s = stationAt(xs[i]);
      secs.push({ x: xs[i], w: s[3], h: (s[1] - s[2]) / 2, zc: (s[1] + s[2]) / 2, sq: E });
    }
    var T = materials(THREE, C || {}, secs[0].x, secs[secs.length - 1].x);
    A.add("skin", body(THREE, M, secs, SEG), 0, 0, 0);
    A.add("deck", cap(THREE, secs[0], SEG, -1), 0, 0, 0);
    A.add("deck", cap(THREE, secs[secs.length - 1], SEG, 1), 0, 0, 0);

    /* ---- sail: 17.8-46.1 m forward of amidships, rear edge raked, rounded front, flat roof 9 m over the water ---- */
    var SX0 = 17.8, SX1 = 46.1, SW = 4.0, SZ0 = 2.0, SZT = 8.8;
    var rings = [], zl = [SZ0, 4.0, 6.0, 7.8, SZT], r0 = [0.0, 0.0, 0.5, 1.4, 1.8], r1 = [0.0, 0.0, 0.0, 0.2, 0.5];
    for (i = 0; i < zl.length; i++) {
      rings.push({ z: zl[i], pts: rrect(SX0 + r0[i], SX1 - r1[i], SW - r1[i] * 0.4, 3.0, 28) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    var roof = rrect(SX0 + 1.65, SX1 - 0.4, SW - 0.1, 3.0, 28);
    A.add("deck", ext(THREE, roof, 0.30), 0, 0, SZT - 0.02);
    var SR = SZT + 0.28;
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(1.4, 0.10, 0.9), 26.0, sg * (SW + 0.01), 6.0);
      A.add("dark", new THREE.BoxGeometry(1.4, 0.10, 0.9), 29.5, sg * (SW + 0.01), 6.0);
      A.add("dark", new THREE.BoxGeometry(1.0, 0.10, 0.7), 40.0, sg * (SW - 0.55), 6.6);
    }
    A.add("dark", new THREE.CylinderGeometry(0.8, 0.8, 0.10, 14), 36.0, 0, SR + 0.04, PI / 2, 0, 0);
    A.add("dark", new THREE.CylinderGeometry(0.7, 0.7, 0.10, 14), 42.5, 0, SR + 0.04, PI / 2, 0, 0);

    /* ---- masts and the radome (x and tops read off the drawing) ---- */
    var MS = [  /* x, y, top z, radius */
      [22.9, 0.7, 14.3, 0.14], [24.2, -0.6, 12.6, 0.12], [25.7, 0.8, 15.7, 0.13], [27.5, -0.5, 14.4, 0.14],
      [29.4, 0.5, 12.8, 0.12], [39.1, -0.6, 11.4, 0.12], [41.7, 0.5, 10.6, 0.11]
    ];
    for (k = 0; k < MS.length; k++) {
      strut(THREE, A, "metal", MS[k][3], [MS[k][0], MS[k][1], SR - 0.1], [MS[k][0], MS[k][1], MS[k][2]], 8);
      A.add("cap", new THREE.SphereGeometry(MS[k][3] * 1.6, 8, 6), MS[k][0], MS[k][1], MS[k][2] + 0.05);
    }
    A.add("cap", new THREE.CylinderGeometry(1.4, 1.4, 2.6, 18), 32.6, 0.0, SR + 1.3, PI / 2, 0, 0);
    A.add("cap", new THREE.SphereGeometry(1.4, 18, 10), 32.6, 0.0, SR + 2.6, 0, 0, 0, [1, 1, 0.8]);
    A.add("metal", new THREE.CylinderGeometry(0.3, 0.3, 0.7, 8), 32.6, 0.0, SR + 0.3, PI / 2, 0, 0);

    /* ---- twenty-four P-700 hatch panels: six a side (two tubes each), 9-52 m forward of amidships,
            lying on the casing shoulder and following its slope ---- */
    var PY = 5.5, PL = 6.9, PP = 7.15, p0 = 12.7, dz;
    for (k = 0; k < 6; k++) {
      x = p0 + k * PP;
      for (sg = -1; sg <= 1; sg += 2) {
        dz = (surfZ(x, PY + 0.25, true) - surfZ(x, PY - 0.25, true)) / 0.5;      /* d z / d y, negative outboard */
        z = surfZ(x, PY, true);
        var tilt = Math.atan(dz) * sg * -1 * -1;
        A.add("deck", new THREE.BoxGeometry(PL, 2.7, 0.16), x, sg * PY, z + 0.04, sg > 0 ? Math.atan(dz) : -Math.atan(dz), 0, 0);
        for (i = -1; i <= 1; i += 2) {
          A.add("dark", new THREE.CylinderGeometry(0.95, 0.95, 0.06, 14), x + i * 1.7, sg * PY, z + 0.14 - Math.abs(dz) * 0.02,
                sg > 0 ? Math.atan(dz) + PI / 2 - PI / 2 : -Math.atan(dz), 0, 0);
        }
      }
    }
    /* the flat housing of the retractable bow planes forward of the panels: a slot on each side */
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(4.6, 0.16, 0.8), 60.0, sg * (sideY(60.0, 1.2) - 0.03), 1.2);
      A.add("dark", new THREE.BoxGeometry(5.6, 0.12, 1.0), 31.0, sg * (sideY(31.0, -0.4) - 0.02), -0.4);
    }

    /* ---- limber slots along the casing side ---- */
    var ix = 0;
    for (x = -52.0; x < 55.0; x += 2.4) {
      ix++;
      if (ix % 5 === 0) continue;
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.BoxGeometry(0.6, 0.14, 0.26), x, sg * (sideY(x, 0.4) - 0.03), 0.4);
      }
    }

    /* ---- stern: upper fin with the towed-array pod, ventral fin, stern planes ---- */
    var fin = [[-67.2, -1.5], [-67.2, 5.5], [-62.2, 5.5], [-52.0, 3.6], [-50.0, 0.0]];
    A.add("sail", ext(THREE, fin, 0.9, true), 0, 0.45, 0);
    cylX(THREE, A, "sail", 0.5, 0.5, 7.4, 12, -63.6, 0, 5.95);
    A.add("sail", new THREE.SphereGeometry(0.5, 10, 6), -67.3, 0, 5.95);
    A.add("sail", new THREE.SphereGeometry(0.5, 10, 6), -59.9, 0, 5.95);
    var vf = [[-69.0, -4.8], [-60.5, -7.4], [-62.5, -9.2], [-68.5, -9.2]];
    A.add("red", ext(THREE, vf, 0.8, true), 0, 0.4, 0);
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("sail", new THREE.BoxGeometry(4.2, 5.0, 0.4), -68.2, sg * 6.4, -3.3);          /* stern planes */
    }

    /* ---- twin shafts and seven-blade screws ---- */
    var blade = [[-0.12, 0.35], [-0.45, 0.8], [-0.50, 1.4], [-0.25, 2.0], [0.08, 2.25], [0.34, 1.8], [0.38, 1.1], [0.16, 0.5]];
    for (sg = -1; sg <= 1; sg += 2) {
      var py = sg * 3.3, pz = -3.8;
      cylX(THREE, A, "red", 1.1, 0.55, 3.2, 14, -73.4, py, pz);                            /* shaft fairing */
      cylX(THREE, A, "metal", 0.28, 0.28, 2.6, 8, -75.3, py, pz);
      cylX(THREE, A, "screw", 0.48, 0.26, 1.4, 12, -76.4, py, pz);
      A.add("screw", new THREE.SphereGeometry(0.26, 10, 6), -77.15, py, pz);
      for (i = 0; i < 7; i++) {
        var gb = ext(THREE, blade, 0.07);
        gb.translate(0, 0, -0.035);
        gb.rotateY(0.6);
        A.add("screw", gb, -76.5, py, pz, i * 2 * PI / 7 + (sg > 0 ? 0.2 : 0), 0, 0);
      }
    }

    /* ---- modest team strips on the casing ---- */
    var tx = -40.0, m = (crown(tx + 1) - crown(tx - 1)) / 2;
    A.add("team", new THREE.BoxGeometry(4.5, 1.3, 0.04), tx, 0, crown(tx) + 0.04, 0, -Math.atan(m), 0);
    A.add("team", new THREE.BoxGeometry(4.5, 1.3, 0.04), 56.0, 0, crown(56.0) + 0.04);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 154 m: render3d scales a submarine by it. */
UNIT_MODELS["ssgn_p"] = {
  len: 154,
  build: function (THREE, M, C) { return HeroOscar949A.build(THREE, M, C); }
};
