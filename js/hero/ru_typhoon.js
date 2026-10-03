/* ============ ru_typhoon.js -- HERO model: Project 941 Akula / Typhoon SSBN, TK-208 (pact_e80_ssbn) ============
   The largest submarine ever built, TK-208 as completed in 1981 (the row's "(TK-208)"), not as rebuilt
   into Dmitry Donskoy (941UM, 2002): the 1980s fit with the R-39 tubes, no Bulava, no refit.
   References (Wikimedia Commons, fetched small into scratchpad/typhoon_ref):
     - "Typhoon class SSBN.svg" (a.png, side elevation, 1920 px = 172.8 m, 11.1 px/m): THE source for
       the vertical stations. Casing crown flat from 50 m abaft the bow to 20 m from the nose, bow
       rounded over the last 20 m; casing crown about 16.7 m over the keel (draught 12.2 m, Jane's, so the crown
       is 4.5 m over the water line; the drawing's boot line is 7-8.7 m under the crown, the photograph lower freeboard); the long taper aft, top line falling to the tail from 38 m
       forward of the stern, the keel line rising from 55 m forward of the stern; the central-hull
       fairing (the control-room hump) 9.2 m over the water from 33 m to 8 m abaft/ahead of amidships and
       the sail on it, 27.6 m long, flat reinforced roof 14.5 m over the water (drawing: 25.9 m keel to
       sail roof, the published 26 m); the ten pairs of missile hatch lids on the flat crown from 12 to 50 m
       forward of amidships; ten masts and the radome ball on the sail roof (tops read as 18-21.5 m);
       the retracted bow-plane slot on the side 64-73 m forward; the tall upper rudder (dark, 10 m
       chord at the base, top 10.6 m over the water) and the ventral fin below, the tail bulb, the shrouded
       screw and the stern plane in profile; limber slots in rows along the side; black over a red-brown boot.
     - "Typhoon class Schema.svg" (b.png, plan and sections): the casing is parallel-sided, 23.3 m wide
       from the stern to 20 m from the nose and then rounds in plan; the sail 10 m wide on the central hull;
       twenty missile tubes in two rows of ten at +-2.3 m, 3.9 m pitch, between the two pressure hulls and
       forward of the sail; the bow planes (shown extended 3.7 m in the plan, not drawn so);
       the two shafts at +-6.3 m ending in shrouded (ducted) screws, 6.4 m across the shroud;
       a flat broad stern with the two stern planes (5.4 x 5.8 m) at its after edge, and the central tail bulb.
     - US DoD photograph "Akula (Typhoon) class submarine DD-ST-85-06625" (c.jpg, 1980s, starboard
       quarter, surfaced): black hull, flat broad casing with the rounded after fairing, the tall
       sail with a flat roof and the mast group, the upper fin with a rounded top.
   Dimensions: 172.8 m x 23.3 m, draught 12.2 m (published figures; the drawing agrees within 1 %).
   Hull is lofted from stations read off the drawings, black above a boot line and red-brown under it,
   merged per material (9 draw calls, 9 materials). Model space +X bow, +Y port, +Z up, metres; water line
   z = 0. render3d scales a submarine by UNIT_MODELS[key].len, which is the true 172.8 m.
   Not confirmed and so not drawn: no hull number, no flag, no rails, no anechoic-tile pattern, no
   rigging; the mast types are not named by my sources (generic tubes, one thick mast, the pale radome
   ball) and the drawing shows ten. The bow planes are housed (the plan shows them extended, the photographs of the
   surfaced boat do not): only their slot on the casing side is drawn, so the beam is the hull's 23.3 m.
   The towed-array pod on the head of the upper fin is a plain cylinder on the fin top as the photograph
   and the drawing's stepped fin top suggest; its exact size is estimated. The screw has seven blades
   (the commonly published count; my drawings show the blade count only roughly). The row is not
   turret:true, so nothing is named "turret". ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTyphoon941 = (function () {
  "use strict";

  var PI = Math.PI;
  var HLEN = 172.8, XBOW = 86.4, XTAIL = -86.4;
  var E = 0.60;                       /* superellipse exponent of the casing section */
  var WL = 0.7;                       /* the water line sits 4.5 m under the casing crown (draught 12.2 m, Jane's;
                                         the drawing shows the crown 7-8.7 m over its boot line and the DoD photograph
                                         shows the boat lower still); every part is built in drawing coordinates and
                                         lowered by WL in the merge, so z = 0 is the water line */
  var ZB = WL;                        /* boot line = water line: black above it, red-brown below */

  /* [x, crown z, keel z, half width] - read off the elevation and the plan.
     Tail wedge, taper, parallel body; the bow is added from the plan ellipse below. */
  var TAB = [
    [-83.0, -1.2, -4.6, 9.4], [-80.0, -0.9, -5.2, 10.0], [-76.0, -0.5, -5.7, 10.6],
    [-72.0, 0.1, -6.2, 11.0], [-68.0, 0.9, -6.9, 11.3], [-64.0, 1.7, -7.6, 11.5],
    [-60.0, 2.5, -8.4, 11.6], [-56.0, 3.2, -9.0, 11.65], [-52.0, 3.8, -9.6, 11.65],
    [-48.0, 4.4, -10.1, 11.65], [-44.0, 4.8, -10.5, 11.65], [-38.0, 5.1, -11.0, 11.65],
    [-30.0, 5.2, -11.4, 11.65], [60.0, 5.2, -11.4, 11.65], [66.6, 5.2, -11.3, 11.65]
  ];
  function bowStation(x) {
    var t = (x - 66.6) / 19.8;
    var w = 11.65 * Math.sqrt(Math.max(0, 1 - t * t));
    var top = x < 70 ? 5.2 : 5.2 - 5.2 * Math.pow((x - 70) / 16.4, 2.2);
    var bot = -11.3 + 8.3 * Math.pow(Math.max(0, (x - 62) / 24.4), 2.0);
    return [x, top, bot, w];
  }
  function stationAt(x) {
    var i, a, b, t;
    if (x >= 66.6) return bowStation(Math.min(x, 86.3));
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
  /* z of the casing surface at (x, y), from the superellipse section */
  function surfZ(x, y, upper) {
    var s = stationAt(x), zc = (s[1] + s[2]) / 2, h = (s[1] - s[2]) / 2, w = s[3];
    var c = Math.min(1, Math.abs(y) / w), cs = Math.pow(c, 1 / E);
    var sn = Math.sqrt(Math.max(0, 1 - cs * cs));
    return zc + (upper ? 1 : -1) * h * Math.pow(sn, E);
  }
  /* y of the casing side at height z */
  function sideY(x, z) {
    var s = stationAt(x), zc = (s[1] + s[2]) / 2, h = (s[1] - s[2]) / 2, w = s[3];
    var v = Math.min(0.999, Math.abs(z - zc) / h), sn = Math.pow(v, 1 / E);
    return w * Math.pow(Math.sqrt(Math.max(0, 1 - sn * sn)), E);
  }

  /* hull stations: dense through the bow and the tail wedge */
  function hullXs() {
    var xs = [], x;
    for (x = -83.0; x < 66.0; x += 3.2) xs.push(x);
    var bw = [66.6, 70.0, 73.0, 76.0, 78.6, 80.8, 82.6, 84.0, 85.0, 85.8, 86.25];
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
    var R1 = rng(9411), i, x, s, zc, h, t1, sb, ya, yb;
    g.fillStyle = "#4a2c24"; g.fillRect(0, 0, W, H);                 /* red-brown anti-fouling below */
    for (i = 0; i < 1600; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      x = X0 + (i + 0.5) / W * (X1 - X0);
      s = stationAt(x); zc = (s[1] + s[2]) / 2; h = (s[1] - s[2]) / 2;
      sb = (ZB - zc) / h;
      if (sb >= 1) continue;
      sb = sb <= -1 ? -1 : (sb < 0 ? -Math.pow(-sb, 1 / E) : Math.pow(sb, 1 / E));
      t1 = Math.asin(sb) / (PI * 2);                                  /* v of the boot line, may be < 0 */
      ya = (1 - (0.5 - t1)) * H; yb = (1 - t1) * H;
      g.fillStyle = "#2a2d2f";
      g.fillRect(i, ya, 1, yb - ya);
      g.fillRect(i, ya - H, 1, yb - ya); g.fillRect(i, ya + H, 1, yb - ya);   /* wrapped copies */
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1;               /* plate seams */
    for (i = 0; i < W; i += 31) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
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
      deck:  new THREE.MeshStandardMaterial({ color: 0x1f2325, roughness: 0.95, metalness: 0.04, side: THREE.DoubleSide }),
      sail:  std(0x25292c, 0.88, 0.06),     /* sail, fins, planes: black */
      red:   std(0x4a2c24, 0.92, 0.04),     /* ventral fin below the water */
      dark:  std(0x0d0f10, 0.80, 0.20),     /* hatch lids, limber slots, recesses */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, shafts, shrouds */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      cap:   std(0xb9bfc2, 0.70, 0.10),     /* pale radome ball and mast heads */
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
    var i, x, k, sg, z;
    var SEG = 44;

    /* ---- casing hull ---- */
    var xs = hullXs(), secs = [];
    for (i = 0; i < xs.length; i++) {
      var s = stationAt(xs[i]);
      secs.push({ x: xs[i], w: s[3], h: (s[1] - s[2]) / 2, zc: (s[1] + s[2]) / 2, sq: E });
    }
    var T = materials(THREE, C || {}, secs[0].x, secs[secs.length - 1].x);
    A.add("skin", body(THREE, M, secs, SEG), 0, 0, 0);
    A.add("deck", cap(THREE, secs[0], SEG, -1), 0, 0, 0);                  /* the flat broad stern */
    A.add("deck", cap(THREE, secs[secs.length - 1], SEG, 1), 0, 0, 0);     /* bow tip */

    /* ---- central-hull fairing under the sail ---- */
    var HT = [[-36.0, 5.0, 2.0], [-33.0, 5.7, 4.0], [-29.0, 6.9, 5.4], [-24.0, 8.5, 6.0], [-18.0, 9.2, 6.0],
              [0.0, 9.2, 6.0], [4.5, 9.0, 5.9], [7.0, 8.1, 5.2], [8.4, 6.5, 3.5], [9.0, 5.1, 2.0]];
    var hs = [];
    for (i = 0; i < HT.length; i++) hs.push({ x: HT[i][0], w: HT[i][2], h: (HT[i][1] - 3.5) / 2, zc: (HT[i][1] + 3.5) / 2, sq: 0.8 });
    A.add("sail", body(THREE, M, hs, 28), 0, 0, 0);

    /* ---- sail: vertical walls, flat reinforced roof ---- */
    var SX0 = -23.1, SX1 = 4.5, SW = 4.9, SZ0 = 7.4, SZT = 14.3;
    var rings = [];
    var zl = [SZ0, 9.0, 11.5, 13.6, SZT], inset = [0.0, 0.0, 0.0, 0.1, 0.3];
    for (i = 0; i < zl.length; i++) {
      rings.push({ z: zl[i], pts: rrect(SX0 + inset[i], SX1 - inset[i], SW - inset[i] * 0.6, 2.6, 28) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    /* ice-breaking roof plate: a slab a little proud of the walls */
    var roof = [];
    var rp = rrect(SX0 - 0.15, SX1 + 0.15, SW + 0.15, 2.7, 28);
    for (i = 0; i < rp.length; i++) roof.push(rp[i]);
    A.add("deck", ext(THREE, roof, 0.34), 0, 0, SZT - 0.04);
    var SR = SZT + 0.30;                                                    /* roof top = 14.6 */
    /* recesses and hatches on the sail sides and roof (the drawing's small panels) */
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(1.0, 0.10, 1.1), -13.0, sg * (SW + 0.02), 10.6);
      A.add("dark", new THREE.BoxGeometry(1.0, 0.10, 1.1), -9.8, sg * (SW + 0.02), 10.6);
      A.add("dark", new THREE.BoxGeometry(0.8, 0.10, 1.6), 2.6, sg * (SW - 0.25), 12.0);
    }
    A.add("dark", new THREE.CylinderGeometry(0.9, 0.9, 0.10, 14), -17.5, 0, SR + 0.04, PI / 2 - PI / 2);

    /* ---- masts, radome ball and mast heads on the roof (positions read from the elevation) ---- */
    var MS = [  /* x, y, top z, radius */
      [-14.9, 0.9, 20.1, 0.16], [-13.5, -0.8, 21.2, 0.14], [-12.4, 0.9, 20.1, 0.15],
      [-11.3, -0.9, 18.3, 0.20], [-0.3, 1.2, 18.9, 0.15], [1.2, -1.2, 18.3, 0.13]
    ];
    for (k = 0; k < MS.length; k++) {
      strut(THREE, A, "metal", MS[k][3], [MS[k][0], MS[k][1], SR - 0.1], [MS[k][0], MS[k][1], MS[k][2]], 8);
      A.add("cap", new THREE.SphereGeometry(MS[k][3] * 1.5, 8, 6), MS[k][0], MS[k][1], MS[k][2] + 0.05);
    }
    strut(THREE, A, "metal", 0.28, [-8.8, 0.0, SR - 0.1], [-8.8, 0.0, 20.2], 10);     /* the thick mast */
    cylX(THREE, A, "cap", 0.45, 0.45, 1.3, 12, -8.8, 0.0, 20.9);
    A.add("cap", new THREE.SphereGeometry(0.45, 10, 6), -8.8, 0.0, 21.5);
    strut(THREE, A, "metal", 0.35, [-6.0, 0.0, SR - 0.1], [-6.0, 0.0, 16.9], 10);     /* radome pedestal */
    A.add("cap", new THREE.SphereGeometry(1.05, 16, 12), -6.0, 0.0, 18.0);
    A.add("sail", new THREE.CylinderGeometry(1.0, 1.2, 0.5, 16), -6.0, 0.0, SR + 0.2, PI / 2, 0, 0);

    /* ---- twenty missile hatch lids: two rows of ten, 3.9 m pitch, +-2.3 m, forward of the sail ---- */
    for (k = 0; k < 10; k++) {
      for (sg = -1; sg <= 1; sg += 2) {
        x = 13.6 + k * 3.87;
        z = surfZ(x, 2.3, true);
        A.add("dark", new THREE.CylinderGeometry(1.7, 1.7, 0.16, 16), x, sg * 2.3, z - 0.02, PI / 2, 0, 0);
      }
    }

    /* ---- limber slots in rows along the casing side, both sides ---- */
    var ssx = -60.0, ix = 0;
    for (x = -60.0; x < 46.0; x += 2.3) {
      ix++;
      if (ix % 7 === 0 || (x > -34 && x < -24 && ix % 2)) continue;
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.BoxGeometry(0.62, 0.14, 0.26), x, sg * (sideY(x, -0.2) - 0.03), -0.2);
      }
    }
    for (x = 8.0; x < 34.0; x += 1.3) {
      if (((x * 10) | 0) % 5 === 0) continue;
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.BoxGeometry(0.46, 0.14, 0.2), x, sg * (sideY(x, -1.3) - 0.03), -1.3);
      }
    }
    for (k = 0; k < 7; k++) {          /* the square vents above the boot line abaft the hatches */
      x = 37.0 + k * 2.4;
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.BoxGeometry(0.5, 0.14, 0.5), x, sg * (sideY(x, 1.6) - 0.03), 1.6);
      }
    }

    /* ---- bow planes: housed, only the slot on the casing side shows (as the photographs of the surfaced boat) ---- */
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(8.6, 0.16, 0.9), 68.6, sg * (sideY(68.6, 1.8) - 0.03), 1.8);
    }

    /* ---- stern: upper fin and rudder, ventral fin, tail bulb, stern planes ---- */
    var ru = [[-78.1, -2.0], [-78.1, 10.2], [-70.3, 10.6], [-67.2, 0.4], [-67.2, -2.0]];
    A.add("sail", ext(THREE, ru, 1.0, true), 0, 0.5, 0);
    cylX(THREE, A, "sail", 0.55, 0.55, 5.6, 12, -73.6, 0, 10.9);                  /* towed-array pod on the fin head */
    A.add("sail", new THREE.SphereGeometry(0.55, 10, 6), -76.4, 0, 10.9);
    var vf = [[-84.1, -3.5], [-71.5, -4.6], [-73.8, -11.3], [-84.1, -11.3]];
    A.add("red", ext(THREE, vf, 0.9, true), 0, 0.45, 0);
    cylX(THREE, A, "red", 0.9, 0.35, 4.2, 12, -84.4, 0, -3.1);                    /* tail bulb */
    A.add("deck", new THREE.CylinderGeometry(0.9, 0.9, 0.05, 12), -82.3, 0, -3.1, 0, 0, PI / 2);

    for (sg = -1; sg <= 1; sg += 2) {
      A.add("sail", new THREE.BoxGeometry(5.4, 5.8, 0.45), -83.7, sg * 6.3, -0.9);   /* stern planes */
    }

    /* ---- twin shafts, shrouded seven-blade screws ---- */
    var blade = [[-0.15, 0.45], [-0.55, 1.0], [-0.60, 1.7], [-0.30, 2.45], [0.10, 2.70], [0.40, 2.20], [0.45, 1.30], [0.20, 0.60]];
    for (sg = -1; sg <= 1; sg += 2) {
      var py = sg * 6.3, pz = -3.3;
      var lp = [];
      lp.push(new THREE.Vector2(2.82, -2.1)); lp.push(new THREE.Vector2(3.18, -2.1));
      lp.push(new THREE.Vector2(3.18, 1.2)); lp.push(new THREE.Vector2(2.95, 2.1));
      lp.push(new THREE.Vector2(2.82, 1.0)); lp.push(new THREE.Vector2(2.82, -2.1));
      /* profile wound outward as listed */
      A.add("deck", new THREE.LatheGeometry(lp, 28), -84.3, py, pz, 0, 0, -PI / 2);   /* the duct */
      cylX(THREE, A, "metal", 0.30, 0.30, 3.4, 8, -82.6, py, pz);                      /* shaft */
      cylX(THREE, A, "screw", 0.55, 0.30, 1.6, 12, -84.8, py, pz);                     /* hub */
      A.add("screw", new THREE.SphereGeometry(0.30, 10, 6), -85.75, py, pz);
      for (i = 0; i < 7; i++) {
        var gb = ext(THREE, blade, 0.07);
        gb.translate(0, 0, -0.035);
        gb.rotateY(0.6);
        A.add("screw", gb, -84.9, py, pz, i * 2 * PI / 7, 0, 0);
      }
      /* struts from the duct to the stern face */
      strut(THREE, A, "metal", 0.16, [-83.2, py + sg * 2.9, pz], [-82.8, py + sg * 2.0, pz + 0.0], 6);
    }

    /* ---- modest team strips on the casing ---- */
    var tx = -43.0, m = (crown(tx + 1) - crown(tx - 1)) / 2;
    A.add("team", new THREE.BoxGeometry(4.5, 1.3, 0.04), tx, 0, crown(tx) + 0.04, 0, -Math.atan(m), 0);
    A.add("team", new THREE.BoxGeometry(4.5, 1.3, 0.04), 59.0, 0, 5.2 + 0.04);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 172.8 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e80_ssbn"] = {
  len: 172.8,
  build: function (THREE, M, C) { return HeroTyphoon941.build(THREE, M, C); }
};
