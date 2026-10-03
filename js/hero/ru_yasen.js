/* ============ ru_yasen.js -- HERO model: Project 885 Yasen (K-560 Severodvinsk, pact_e00_ssn)
   and Project 885M Yasen-M (K-561 Kazan, ssn_p) ============
   Russian fourth-generation nuclear cruise-missile submarine (SSGN).

   References (Wikimedia Commons, fetched small; cached in scratchpad/yasen_ref):
     - "Graney class SSN.svg" (Project 885) and "Graney class SSN 885M variant.svg" (885M):
       colour side elevations, bow right, both drawn to 1917 px overall. THE source for the
       hull stations (read pixel by pixel: top and bottom edge every 40 px), the white
       boot line, the sail outline (long concave aft ramp, flat top 4.9 m over the casing,
       short raked fore edge), the casing hatch layout (four hatch groups abaft the sail,
       the VLS block), the cruciform tail with the tall vertical fins, the lozenge
       fairings on the tail cone, the bow flood openings (4 ellipses on the 885, 3 on the
       885M), the long flank slot, the masts and radomes as drawn raised, and (885M only)
       the small black flood slots on the upper flank. Overall lengths: 885 139.2 m
       (sub_specs.js, published about 139 m) so 0.0726 m/px; 885M 130 m so 0.0678 m/px.
       The 885M is drawn ~9.8 m shorter: bow-to-sail 26.0 m (885) against 22.9 m (885M),
       sail-to-tail 83 m against 77 m; the sail, hatches and masts differ as drawn.
     - "Kazan 1.jpg" (float-out, stern seen from below): the stern is a shrouded pump-jet
       (here under a cover) behind the cone, and the horizontal stern planes are very
       large slabs, nearly the size of the vertical fins. Plane span is ESTIMATED from
       that perspective view (+-7.4 m).
     - Severodvinsk photograph at Severomorsk (surfaced, starboard bow quarter): the
       fairwater is tall and slab-sided with a rounded fore edge and rounded top edges,
       a row of small dark windows high on its fore face, two masts raised, the whole
       boat dark grey-black with a very low casing. Sail width (about 6 m) is ESTIMATED
       from this photograph against the hull.
   Dimensions: 885 139.2 m, 885M 130.0 m, beam 13.0 m (sub_specs.js); crown 3.4 m over
   the water line as the boot line of the drawings gives.
   Pump-jet: the drawings show a small open rotor behind the cone; the Kazan photograph
   shows a shroud, and the 885 is a pump-jet boat (sub_specs): a ducted rotor is drawn,
   duct radius about 2.5 m (blade tip radius 2.4 m in the drawing).
   Check-and-fix: only the two masts the Severodvinsk photograph shows raised (a short arrow-tipped
   mast and a plain thin one) are drawn, not the drawn full mast suite and no 18 m whip; no raised
   bow-array cover (a sonar window is flush: only the outline of it appears in the drawings, so it is
   not drawn); eight VLS hatches (four groups, one per side) with 3 (885) / 4 (885M) cell joints.
   Not confirmed and so not drawn: no hull number, no flag, no rails, no torpedo-tube
   shutters (tubes are angled amidships, internal), no towed-array pod on the fin (the
   drawings show none; only the lozenge fairings on the cone, mirrored on the far side
   as an assumption), no bow-plane geometry (housed: only the casing slot).
   Row is not turret:true, so nothing is named "turret". ASCII only.
   Paint: black-grey anechoic rubber above the water line, a touch darker brown-black
   below (drawing and photographs show an all-dark boat); faint tile joints.
   Model space +X bow, +Y port, +Z up, metres; water line z = 0.
   render3d scales a submarine by UNIT_MODELS[key].len, the true length.
   Merged per material (10 draw calls). */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYasen = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---- per-variant data read off the two drawings (px = drawing pixels) ---- */
  var V885 = {
    len: 139.2, pxm: 139.2 / 1917, wl: 251, beam: 13.0, tail: 35, bowc: 1918,
    /* [column, centre row, radius px] */
    tab: [[1918, 298, 2], [1900, 296, 36], [1880, 295, 50], [1840, 295.5, 62.5], [1800, 296, 70],
      [1760, 296, 75], [1720, 296, 79], [1680, 295, 82], [1640, 294.5, 83.5], [1600, 293, 85],
      [1500, 291, 87], [640, 291, 87], [600, 292, 86], [560, 293, 85], [520, 294, 83], [480, 295, 81],
      [440, 296, 78], [400, 296.5, 73.5], [360, 295, 70], [320, 293.5, 65.5], [280, 293.5, 59.5],
      [240, 294, 53], [200, 293, 47], [160, 293.5, 40], [120, 294, 33], [90, 295, 24], [35, 295.5, 10]],
    rmax: 87, cells: 3,
    aft: [[137, 1300], [138, 1280], [150, 1240], [174, 1200], [200, 1160], [204, 1150], [216, 1118]],
    fore: [[137, 1510], [145, 1522], [178, 1540], [205, 1558], [216, 1563]],
    crown: 204, top: 137,
    ur: [[92, 263], [92, 163], [143, 163], [147, 200], [160, 225], [185, 243], [200, 252], [200, 263]],
    lr: [[92, 262], [92, 380], [160, 380], [172, 350], [190, 338], [200, 330], [200, 262]],
    hatch: [[762, 805], [806, 849], [850, 893], [893, 935]],
    slot: [985, 1410, 266],
    ell: [[1578, 262], [1578, 284], [1578, 306], [1578, 327]], ellw: 80,
    flood: [],
    grate: [[515, 630, 243], [740, 777, 232], [850, 880, 233], [1000, 1035, 232], [1087, 1125, 232], [1317, 1360, 233]],
    /* [column, top row, radius m, kind] kind: 0 plain, 1 arrow, 2 radome, 3 black, 4 orange head, 5 whip */
    masts: [[1273, 52, 0.16, 1], [1308, 50, 0.10, 0]],
    lozen: [155, 299]
  };
  var V885M = {
    len: 130.0, pxm: 130.0 / 1917, wl: 257, beam: 13.0, tail: 35, bowc: 1918,
    tab: [[1918, 306, 3], [1900, 304.5, 38.5], [1880, 304, 52], [1840, 304, 65], [1800, 303, 73],
      [1760, 302.5, 78.5], [1720, 302, 83], [1680, 301, 86], [1640, 300, 87], [1600, 298.5, 88.5],
      [1500, 297, 90], [640, 297.5, 89.5], [600, 298.5, 88.5], [560, 300, 87], [520, 301.5, 85.5],
      [480, 302.5, 82.5], [440, 303, 79], [400, 302.5, 74.5], [360, 301, 71], [320, 300.5, 66.5],
      [280, 300, 60], [240, 301, 53], [200, 298, 48], [160, 298, 40], [120, 299, 31], [90, 300, 24],
      [35, 302.5, 10]],
    rmax: 90, cells: 4,
    aft: [[138, 1300], [139, 1280], [146, 1240], [165, 1200], [193, 1160], [207, 1130], [219, 1100]],
    fore: [[138, 1520], [145, 1540], [174, 1560], [207, 1580], [219, 1586]],
    crown: 207, top: 138,
    ur: [[92, 272], [92, 164], [143, 164], [147, 205], [160, 230], [185, 248], [200, 258], [200, 272]],
    lr: [[92, 272], [92, 390], [160, 390], [172, 360], [190, 347], [200, 340], [200, 272]],
    hatch: [[790, 833], [834, 877], [880, 923], [925, 968]],
    slot: [1017, 1414, 270],
    ell: [[1607, 285], [1607, 307], [1607, 329]], ellw: 83,
    flood: [500, 600, 690, 1130, 1180, 1320, 1415, 1470],
    grate: [[490, 530, 238], [590, 630, 238], [690, 735, 238], [1115, 1190, 237], [1320, 1355, 238]],
    masts: [[1260, 52, 0.16, 1], [1322, 70, 0.10, 0]],
    lozen: [155, 308]
  };

  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

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
  /* stacked rings (each {z, pts:[[x,y]..]}) with a flat cap on the last; outward normals */
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
    for (k = 0; k < N; k++) { idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N)); }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
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
  function gridGeo(THREE, nx, nz, fn, flip) {
    var pos = [], idx = [], i, j, a, b, c, d, v;
    for (j = 0; j <= nz; j++) for (i = 0; i <= nx; i++) { v = fn(i / nx, j / nz); pos.push(v[0], v[1], v[2]); }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        a = j * (nx + 1) + i; b = a + 1; c = a + nx + 1; d = c + 1;
        if (flip) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var PXM = V.pxm, WL = V.wl, HL = V.len / 2;
    var A = Acc(THREE);
    var T, i, j, k, x, sg;
    function X(col) { return HL - (V.bowc - col) * PXM; }
    function zOf(row) { return (WL - row) * PXM; }
    var TAB = V.tab.slice().reverse();                       /* ascending columns */
    function look(col) {
      var n, a, b, t;
      if (col <= TAB[0][0]) return TAB[0];
      for (n = 1; n < TAB.length; n++) {
        if (col <= TAB[n][0]) {
          a = TAB[n - 1]; b = TAB[n]; t = (col - a[0]) / (b[0] - a[0]);
          t = t * t * (3 - 2 * t) * 0.5 + t * 0.5;
          return [col, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
        }
      }
      return TAB[TAB.length - 1];
    }
    function cOf(x0) { return V.bowc - (HL - x0) / PXM; }
    function hullH(x0) { return look(cOf(x0))[2] * PXM; }
    function hullW(x0) { return hullH(x0) * (V.beam / 2 / (V.rmax * PXM)); }
    function zcAt(x0) { return zOf(look(cOf(x0))[1]); }
    function topAt(x0) { return zcAt(x0) + hullH(x0); }
    function sideY(x0, z) {
      var h = hullH(x0), w = hullW(x0), dz = z - zcAt(x0);
      return w * Math.sqrt(Math.max(1 - (dz * dz) / (h * h), 0.01));
    }
    function topZ(x0, y) {
      var h = hullH(x0), w = hullW(x0);
      return zcAt(x0) + h * Math.sqrt(Math.max(1 - (y * y) / (w * w), 0.01));
    }

    /* ---- materials: the hull texture carries the boot line per station ---- */
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    var W = 512, H = 256, cv = cvs(W, H), cx = cv.getContext("2d");
    var R1 = rng(885), wlf, ya, yb, rr, zc, LL, col;
    cx.fillStyle = "#2b2527"; cx.fillRect(0, 0, W, H);
    for (i = 0; i < 600; i++) {
      cx.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.07)";
      cx.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      col = V.tail + ((i + 0.5) / W) * (V.bowc - V.tail);             /* u runs tail -> bow */
      LL = look(col); rr = LL[2] * PXM; zc = zOf(LL[1]);
      if (rr <= -zc) continue;
      wlf = Math.asin(Math.max(-1, Math.min(1, -zc / rr))) / (PI * 2);
      ya = (0.5 + wlf) * H; yb = (1 - wlf) * H;
      cx.fillStyle = "#34383b"; cx.fillRect(i, ya, 1, yb - ya);
    }
    cx.strokeStyle = "rgba(0,0,0,0.20)"; cx.lineWidth = 1;
    for (i = 0; i < W; i += 9) { cx.beginPath(); cx.moveTo(i, 0); cx.lineTo(i, H); cx.stroke(); }
    for (j = 0; j < H; j += 8) { cx.beginPath(); cx.moveTo(0, j); cx.lineTo(W, j); cx.stroke(); }
    var tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;
    T = {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tex, roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x222527, 0.95, 0.04),
      sail:  std(0x2f3437, 0.88, 0.06),
      dark:  std(0x0d1012, 0.80, 0.20),
      panel: std(0x464b4e, 0.85, 0.10),
      metal: std(0x3a4147, 0.55, 0.50),
      screw: std(0x6a5a34, 0.50, 0.60),
      cap:   std(0xb86a22, 0.60, 0.30),
      white: std(0xcfd3d4, 0.70, 0.10),
      team:  std(team, 0.86, 0.06)
    };

    /* ---- hull ---- */
    var xs = [], secs = [], xt = X(V.tail), xb = X(V.bowc);
    for (i = 0; i < V.tab.length; i++) xs.push(X(V.tab[i][0]));
    for (x = xt + 1.2; x < xb - 0.5; x += 2.6) xs.push(x);
    xs.sort(function (p, q) { return p - q; });
    for (i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] < 0.05) { xs.splice(i, 1); i--; }
    for (i = 0; i < xs.length; i++) {
      secs.push({ x: xs[i], w: hullW(xs[i]), h: hullH(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 44), 0, 0, 0);
    A.add("deck", new THREE.SphereGeometry(0.3, 10, 8), xb - 0.3, 0, zcAt(xb));
    A.add("deck", new THREE.CircleGeometry(hullH(xt) + 0.02, 14), xt, 0, zcAt(xt), 0, -PI / 2, 0);

    /* ---- conformal patches on the side and on the casing top ---- */
    function side(s, x0, x1, z0, z1, off, nx, nz) {
      return gridGeo(THREE, nx || 6, nz || 4, function (u, v) {
        var xx = x0 + (x1 - x0) * u, zz = z0 + (z1 - z0) * v;
        return [xx, s * (sideY(xx, zz) + off), zz];
      }, s > 0);
    }
    function sideF(s, x0, x1, f0, f1, off, nx, nz) {
      return gridGeo(THREE, nx, nz, function (u, v) {
        var xx = x0 + (x1 - x0) * u, zz = zcAt(xx) + (f0 + (f1 - f0) * v) * hullH(xx);
        return [xx, s * (sideY(xx, zz) + off), zz];
      }, s > 0);
    }
    function topP(x0, x1, y0, y1, off) {
      return gridGeo(THREE, 4, 3, function (u, v) {
        var xx = x0 + (x1 - x0) * u, yy = y0 + (y1 - y0) * v;
        return [xx, yy, topZ(xx, yy) + off];
      }, y1 < y0);
    }
    for (sg = -1; sg <= 1; sg += 2) {
      /* the bow flood openings (drawing); the sonar window outline is not raised */
      for (k = 0; k < V.ell.length; k++) {
        var ex = X(V.ell[k][0]), ez = zOf(V.ell[k][1]);
        A.add("dark", new THREE.SphereGeometry(1, 12, 4, 0, 2 * PI, 0, PI / 2), ex, sg * (sideY(ex, ez) - 0.05), ez, sg < 0 ? PI : 0, 0, 0,
              [V.ellw * PXM / 2, 0.12, 0.45]);
      }
      /* the long flank slot */
      A.add("dark", side(sg, X(V.slot[0]), X(V.slot[1]), zOf(V.slot[2]) - 0.06, zOf(V.slot[2]) + 0.06, 0.03, 10, 1), 0, 0, 0);
      /* small black flood slots high on the flank (885M drawing) */
      for (k = 0; k < V.flood.length; k++) {
        var fx = X(V.flood[k]), fz = zOf(WL - 30);
        A.add("dark", new THREE.BoxGeometry(1.2, 0.16, 0.45), fx, sg * (sideY(fx, fz) - 0.03), fz);
      }
      /* flush VLS hatches abaft the sail: four groups, a port and a starboard hatch each */
      for (k = 0; k < V.hatch.length; k++) {
        A.add("panel", topP(X(V.hatch[k][0]) + 0.1, X(V.hatch[k][1]) - 0.1, sg * 0.25, sg * 2.7, 0.08), 0, 0, 0);
        /* thin joints between the silo cells (3 on the 885, 4 on the 885M: published cell counts) */
        for (j = 1; j < V.cells; j++) {
          var hx = X(V.hatch[k][0]) + 0.1 + (X(V.hatch[k][1]) - X(V.hatch[k][0]) - 0.2) * j / V.cells;
          A.add("dark", topP(hx - 0.04, hx + 0.04, sg * 0.25, sg * 2.7, 0.10), 0, 0, 0);
        }
      }
      /* casing gratings drawn as lighter strips */
      for (k = 0; k < V.grate.length; k++) {
        A.add("panel", topP(X(V.grate[k][0]), X(V.grate[k][1]), sg * 0.8, sg * 1.3, 0.07), 0, 0, 0);
      }
    }

    /* ---- the sail: tall, slab-sided, rounded nose and top edges, long concave aft ramp ---- */
    var ST = zOf(V.top), SB = zOf(V.crown) - 1.0, RT = 0.8, HWB = 3.0, HWT = 2.6;
    function colAt(tab, z) {
      var r = WL - z / PXM, n;
      if (r <= tab[0][0]) return tab[0][1];
      for (n = 1; n < tab.length; n++) {
        if (r <= tab[n][0]) {
          var a = tab[n - 1], b = tab[n];
          return a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
        }
      }
      return tab[tab.length - 1][1];
    }
    function half(s, L, hw) {
      var rn = Math.min(hw * 1.3, 0.3 * L), ra = Math.min(hw * 1.5, 0.25 * L), v;
      if (s <= 0 || s >= L) return 0.0;
      if (s < rn) { v = (rn - s) / rn; return hw * Math.sqrt(Math.max(0, 1 - v * v)); }
      if (s > L - ra) { v = (s - (L - ra)) / ra; return hw * Math.sqrt(Math.max(0.05, 1 - v * v * 0.8)); }
      return hw;
    }
    function ringPts(x0, x1, hw, Mn) {
      var pts = [], L = x1 - x0, kk, s;
      for (kk = 0; kk <= Mn; kk++) { s = L * Math.pow(kk / Mn, 1.4); pts.push([x1 - s, half(s, L, hw)]); }
      for (kk = Mn - 1; kk >= 1; kk--) { s = L * Math.pow(kk / Mn, 1.4); pts.push([x1 - s, -half(s, L, hw)]); }
      return pts;
    }
    var zl = [SB, SB + 0.5], z, e, sh, hw, rings = [];
    for (k = 1; k <= 5; k++) zl.push(SB + 0.5 + (ST - RT - SB - 0.5) * k / 5);
    var tops = [0.35, 0.6, 0.8, 0.93, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(ST - RT + RT * tops[k]);
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      e = Math.max(0, z - (ST - RT)) / RT;
      sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e * e)));
      hw = HWB + (HWT - HWB) * Math.max(0, Math.min(1, (z - SB) / (ST - SB))) - sh;
      rings.push({ z: z, pts: ringPts(X(colAt(V.aft, z)) + sh, X(colAt(V.fore, z)) - sh, hw, 14) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    /* dark windows high on the fore face (Severodvinsk photograph) */
    var fx1 = X(colAt(V.fore, ST - 1.2));
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(0.7, 0.9, 0.45), fx1 - 1.4, sg * (HWT - 0.9), ST - 0.9, 0, 0, 0.5 * sg);
    }

    /* ---- masts and radomes as drawn ---- */
    for (k = 0; k < V.masts.length; k++) {
      var mc = V.masts[k], mx = X(mc[0]), tz = zOf(mc[1]), r0 = mc[2], kind = mc[3];
      strut(THREE, A, kind === 3 ? "deck" : "metal", r0, [mx, 0, ST - 0.6], [mx, 0, tz], kind === 3 ? 12 : 8);
      if (kind === 1) A.add("deck", new THREE.CylinderGeometry(0.01, r0 * 2.2, 0.8, 8), mx, 0, tz + 0.3, PI / 2, 0, 0);
      if (kind === 2) A.add("white", new THREE.SphereGeometry(0.95, 14, 10), mx, 0, tz - 0.4);
      if (kind === 4) A.add("cap", new THREE.CylinderGeometry(r0 * 1.15, r0 * 1.15, 1.6, 10), mx, 0, tz - 0.8, PI / 2, 0, 0);
    }

    /* ---- cruciform tail ---- */
    function pt(p) { return [X(p[0]), zOf(p[1])]; }
    A.add("sail", ext(THREE, V.ur.map(pt), 0.55, true), 0, 0.275, 0);
    A.add("sail", ext(THREE, V.lr.map(pt), 0.55, true), 0, 0.275, 0);
    var xle = X(200), xte = X(92), SPY = 7.4, zpl = zOf(V.tab[V.tab.length - 3][1]);
    var pl = [[xle, 0.9], [xle - 1.8, SPY], [xle - 4.8, SPY], [xte, 0.9], [xte, -0.9], [xle - 4.8, -SPY], [xle - 1.8, -SPY], [xle, -0.9]];
    A.add("sail", ext(THREE, pl, 0.35), 0, 0, zpl - 0.175);
    /* lozenge fairings on the tail cone flanks (drawing) */
    var lx = X(V.lozen[0]), lz = zOf(V.lozen[1]);
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("sail", new THREE.SphereGeometry(1, 14, 5, 0, 2 * PI, 0, PI / 2), lx, sg * (sideY(lx, lz) - 0.35), lz, sg < 0 ? PI : 0, 0, 0, [4.2, 0.6, 0.6]);
    }

    /* ---- pump-jet: duct, hub, rotor, stator ---- */
    var pz = zOf(V.tab[V.tab.length - 1][1]), xr = xt - 0.1;
    var DR = 2.5, DL = 2.3;
    var prof = [new THREE.Vector2(DR - 0.18, -DL / 2), new THREE.Vector2(DR + 0.05, -DL / 2), new THREE.Vector2(DR + 0.12, -DL * 0.2),
                new THREE.Vector2(DR - 0.05, DL / 2), new THREE.Vector2(DR - 0.30, DL / 2), new THREE.Vector2(DR - 0.30, -DL / 2 + 0.2)];
    A.add("deck", new THREE.LatheGeometry(prof, 28), xr - DL / 2 - 0.1, 0, pz, 0, 0, -PI / 2);
    A.add("metal", new THREE.CylinderGeometry(0.45, 0.62, 1.8, 12), xr - 0.9, 0, pz, 0, 0, PI / 2);
    A.add("screw", new THREE.CylinderGeometry(0.30, 0.55, 0.9, 12), xr - 2.0, 0, pz, 0, 0, PI / 2);
    var bl = [[-0.5, 0.45], [-0.8, 1.2], [-0.7, 2.15], [-0.1, 2.25], [0.5, 1.8], [0.55, 0.9], [0.3, 0.45]];
    for (i = 0; i < 9; i++) {
      var gb = ext(THREE, bl, 0.05);
      gb.translate(0, 0, -0.025); gb.rotateY(0.45);
      A.add("screw", gb, xr - 1.7, 0, pz, i * 2 * PI / 9, 0, 0);
    }
    for (i = 0; i < 7; i++) {
      var gs = ext(THREE, [[-0.3, 0.55], [-0.3, 2.3], [0.3, 2.3], [0.3, 0.55]], 0.06);
      gs.translate(0, 0, -0.03);
      A.add("metal", gs, xr - 0.6, 0, pz, (i + 0.5) * 2 * PI / 7, 0, 0);
    }

    /* ---- modest team strips on the casing crown ---- */
    A.add("team", new THREE.BoxGeometry(2.8, 0.9, 0.05), X(1700), 0, topAt(X(1700)) + 0.025);
    A.add("team", new THREE.BoxGeometry(2.8, 0.9, 0.05), X(480), 0, topAt(X(480)) + 0.03);

    A.done(T, g);
    return g;
  }
  return { build: build, V885: V885, V885M: V885M };
})();

/* len is the true length: render3d scales a submarine by it (sub_specs.js 139.2 / 130.0). */
UNIT_MODELS["pact_e00_ssn"] = {
  len: 139.2,
  build: function (THREE, M, C) { return HeroYasen.build(THREE, M, C, HeroYasen.V885); }
};
UNIT_MODELS["ssn_p"] = {
  len: 130.0,
  build: function (THREE, M, C) { return HeroYasen.build(THREE, M, C, HeroYasen.V885M); }
};
