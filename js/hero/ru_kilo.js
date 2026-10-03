/* ============ ru_kilo.js -- HERO model: Kilo class, Project 877 Paltus / 636 / 636.3 ============
   Soviet / Russian diesel-electric attack submarine, one shaft, 1982- (Project 877),
   1990s export and 2014- Russian Navy (Project 636 / 636.3 Varshavyanka).
   Registered for pact_e80_sub (877, 72.6 m), pact_e90_sub (636, 73.8 m),
   pact_e00_sub (636.3, 73.8 m, drawn as the 636: sub_specs.js says the two are
   alike externally to within a metre and Kalibr fires from the torpedo tubes, so
   nothing shows) and sub_p (the present-day Kilo SSK, drawn as the 636.3).
   Each key carries its own true length: render3d scales a submarine by it.

   References (Wikimedia Commons, fetched small into scratchpad/kilo_ref):
     - "Kilo class SS.svg" (k877): colour side elevation of the 877, 1920 px for
       72.6 m (26.45 px/m). Source of EVERY hull station (casing line and keel line
       read column by column), the fin (about 13.9 m long, 4.95 m above the casing,
       vertical flat sides, square top, the forward edge upright), the five thin
       masts and the whip antenna, the dark limber slots along the casing, the bow
       torpedo-port ovals, the retractable bow-plane slot high on the forward hull,
       the ventral rudder box, the stern-plane fairing and the six-blade screw.
       Red anti-fouling below, black above.
     - "Improved Kilo class SS.svg" (k636): the 636 elevation, 1920 px for 73.8 m
       (26.0 px/m). The same hull with the 1.2 m plug between fin and stern (fin
       the same distance from the bow, as sub_specs.js says), a seven-blade screw,
       two thick black tubes at the aft end of the fin where the 877 has a thin
       mast, a different mast row, and a hull painted black all over.
     - MOD / Ministry photograph of a Russian Kilo underway (ph2): all matt black,
       casing low and awash, the fin a plain upright flat-sided box, the bow planes
       retracted flush into the forward hull, wide flat casing with a row of dark
       limber slots, nothing on the casing but hatches.
   Skin: matt black anechoic tiles (a faint tile grid only; no shine, no seams).
   The 877 shows a red-brown anti-fouling below the waterline in its drawing (the paint
   split here sits at the in-game water level, 1.2 m over z = 0, so no red shows
   above water, as in surfaced photographs); the 636 is black all over.
   Waterline: the drawings give no waterline (the red/black line sits high). The
   casing is drawn 2.6 m over z = 0 and the keel 6.9 m under it (published surfaced
   draught about 6.2-6.6 m; the photograph shows the casing awash, so the figure is
   a compromise -- flagged, not confirmed).
   Not confirmed and so not drawn / drawn generally: fin width (about 2.8 m, measured against the hull beam
   in a head-on photograph, DoD 1996 Kilo; not published); the span and planform of the stern planes (the
   side view shows only a lens); the plan arrangement of the masts (all drawn on
   the centreline); the Strela stowage, the grey hatch patch and the flank sonar
   array outlines (not named in the references). No hull number, flag, wires or
   rails. Variant choice: pact_e00_sub and sub_p are both the 636 hull.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. The row is not
   turret:true, so nothing here is named "turret". Merged per material (one draw
   call each). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKilo = (function () {
  "use strict";

  var PI = Math.PI;
  var PXS = 26.45;                 /* px per metre of the 877 elevation */
  var ZC0 = 2.6;                   /* casing line height over the waterline */
  var PXC = 386;                   /* casing line, px, in the elevation */

  /* [metres from the screw, casing line px, keel line px] read off the 877
     elevation (hull only: fin, masts and rudder box are skipped) */
  var TB = [
    [1.2, 527, 543], [2.0, 522, 547], [3.0, 513, 552], [4.0, 506, 557], [6.0, 491, 565],
    [8.0, 468, 573], [10.0, 445, 580], [12.0, 431, 588], [15.0, 417, 599], [18.0, 407, 607],
    [22.0, 397, 618], [26.0, 393, 626], [30.0, 389, 632], [34.0, 386, 637], [38.0, 386, 638],
    [63.0, 388, 638], [66.0, 397, 631], [68.0, 409, 618], [70.0, 430, 596], [71.5, 457, 569],
    [72.3, 480, 540], [72.6, 495, 515]
  ];
  var LONG = 72.6;

  var _sx = 0.9;                   /* section roundness: a little fuller than an ellipse */
  function tabPx(u, k) {
    var i;
    if (u <= TB[0][0]) return TB[0][k];
    for (i = 1; i < TB.length; i++) {
      if (u <= TB[i][0]) {
        var a = TB[i - 1], b = TB[i], t = (u - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return TB[TB.length - 1][k];
  }
  function ctop(u) { return ZC0 - (tabPx(u, 1) - PXC) / PXS; }
  function keel(u) { return ZC0 - (tabPx(u, 2) - PXC) / PXS; }
  function sec(u) {
    var top = ctop(u) - 0.12, bot = keel(u), h = (top - bot) / 2;
    return { w: Math.min(4.95, h * 1.04), h: h, zc: (top + bot) / 2 };
  }
  /* half-width of the hull at height z (for fittings on the flank) */
  function hullY(u, z) {
    var q = sec(u), v = Math.abs((z - q.zc) / q.h);
    if (v >= 1) return 0;
    return q.w * Math.pow(1 - Math.pow(v, 2 / _sx), _sx / 2);
  }
  /* the 636 plug: 1.2 m of parallel body between fin and stern (877 metres in) */
  function mapX(u, is636) { return is636 ? u + 1.2 * Math.max(0, Math.min(1, (u - 20) / 2)) : u; }
  function unmapX(a, is636) { return !is636 ? a : (a <= 20 ? a : (a >= 23.2 ? a - 1.2 : (a + 12) / 1.6)); }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ---------------------------------------------------------- hull paint
     u runs stern..bow, v runs round the girth (crown at v = 0.25). Black above
     the waterline; the 877 drawing is red-brown anti-fouling below it, the 636
     drawing black. A faint tile grid carries the anechoic skin. */
  var _tex = {};
  function hullTex(THREE, is636) {
    var key = is636 ? 1 : 0, L = is636 ? 73.8 : 72.6;
    if (_tex[key]) return _tex[key];
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(877 + key), i, x, wl, ya, yb, s, u, q;
    g.fillStyle = is636 ? "#17191b" : "#3b211d"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 900; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.06)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      u = unmapX((i + 0.5) / W * (L - 1.2) + 1.2, is636);
      q = sec(Math.max(1.2, Math.min(72.4, u)));
      s = Math.pow(Math.min(0.999, Math.max(0, (1.2 - q.zc) / q.h)), 1 / _sx);   /* split at the in-game water level (subs are drawn 1.2 m lower) */
      wl = Math.asin(s) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;
      g.fillStyle = "#1b1e21"; g.fillRect(i, ya, 1, yb - ya);
      g.fillStyle = "rgba(8,9,10,0.85)";
      g.fillRect(i, yb, 1, 4); g.fillRect(i, ya - 4, 1, 4);
    }
    g.strokeStyle = "rgba(120,130,140,0.07)"; g.lineWidth = 1;        /* tile grid */
    for (i = 0; i < W; i += 11) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    for (i = 0; i < H; i += 9) { g.beginPath(); g.moveTo(0, i); g.lineTo(W, i); g.stroke(); }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex[key] = t;
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

  function materials(THREE, C, is636) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, is636), roughness: 0.93, metalness: 0.03 }),
      deck:   std(0x1f2326, 0.95, 0.03),    /* casing, matt black */
      sail:   std(0x23282c, 0.90, 0.04),    /* fin and tail surfaces */
      dark:   std(0x0c0e10, 0.85, 0.10),    /* limber slots, ports, hatches */
      metal:  std(0x2c3238, 0.55, 0.45),    /* black masts */
      mastlt: std(0xaeb3b6, 0.50, 0.40),    /* bright periscope / antenna masts */
      screw:  std(0x8a7140, 0.45, 0.65),    /* bronze */
      team:   std(team, 0.86, 0.06)
    };
  }

  /* masts: [xs px, top px, radius, material, head] in the drawing of the variant */
  var MAST877 = [
    [1141, 100, 0.07, "metal"], [1128, 178, 0.10, "mastlt", "dome"], [1160, 150, 0.08, "mastlt"],
    [1222, 195, 0.22, "mastlt", "box"], [1245, 0, 0.018, "mastlt"], [1258, 165, 0.06, "metal"],
    [1290, 160, 0.06, "metal"]
  ];
  var MAST636 = [
    [1105, 85, 0.36, "metal", "round"], [1132, 85, 0.36, "metal", "round"],
    [1168, 165, 0.10, "mastlt", "dome"], [1180, 135, 0.09, "mastlt"],
    [1245, 190, 0.28, "metal", "box"], [1265, 0, 0.018, "mastlt"], [1275, 150, 0.06, "metal"],
    [1305, 140, 0.25, "metal", "point"]
  ];

  function build(THREE, M, C, is636) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {}, is636);
    var A = Acc(THREE);
    var LEN = is636 ? 73.8 : 72.6, ox = LEN / 2;
    var PXV = is636 ? 26.02 : 26.45;
    var i, x, k, z, j;
    function X(u) { return mapX(u, is636) - ox; }
    function ctopX(xm) { return ctop(unmapX(xm + ox, is636)); }
    function hullYX(xm, zz) { return hullY(unmapX(xm + ox, is636), zz); }

    /* ---- hull: sections finer toward the ends ---- */
    var us = [1.2], u = 1.2;
    while (u < 72.6) {
      u += (u < 14 || u > 62) ? 1.2 : 2.6;
      if (u > 72.55) u = 72.6;
      us.push(u);
    }
    var secs = [];
    for (i = 0; i < us.length; i++) {
      var qa = sec(Math.min(us[i], 72.5));
      if (i === us.length - 1) qa.w = 0.12;
      secs.push({ x: X(us[i]), w: qa.w, h: qa.h, zc: qa.zc, sq: _sx });
    }
    secs.unshift({ x: X(0.9), w: 0.10, h: 0.10, zc: secs[0].zc, sq: _sx });
    A.add("skin", body(THREE, M, secs, 44), 0, 0, 0);

    /* ---- wide flat casing, narrowing to both ends ---- */
    function dw(uu) {
      return Math.max(0.12, Math.min(2.4, 0.5 * sec(uu).w) * Math.min(1, (uu - 8.5) / 4, (70.8 - uu) / 4));
    }
    var cs = [], uc;
    for (uc = 9.0; uc <= 70.6; uc += 3.1) {
      cs.push({ x: X(uc), w: dw(uc), h: 0.5, zc: ctop(uc) - 0.5, sq: 0.3 });
    }
    A.add("deck", body(THREE, M, cs, 16), 0, 0, 0);

    /* ---- limber slots: dark dashes along the casing flank, as drawn ---- */
    var rows877 = [[450, 480], [515, 545], [618, 645], [697, 725], [760, 790], [855, 880], [1060, 1090],
                   [1122, 1152], [1195, 1222], [1250, 1280], [1282, 1310], [1497, 1525], [1545, 1570],
                   [1590, 1618], [1655, 1680]];
    for (k = 0; k < rows877.length; k++) {
      var ua = rows877[k][0] / PXS, ub = rows877[k][1] / PXS, uq = (ua + ub) / 2;
      var xm = X(uq), zc2 = ctop(uq) - 0.35, wy = dw(uq) + 0.01;
      for (i = -1; i <= 1; i += 2)
        box(THREE, A, "dark", (ub - ua) * 0.95, 0.07, 0.17, xm, i * wy, zc2);
    }

    /* ---- bow planes housed: a long slot high on the forward hull each side ---- */
    for (i = -1; i <= 1; i += 2) {
      var bu = 53.3, bz = ctop(bu) - 0.62, by = hullY(bu, bz);
      A.add("dark", new THREE.SphereGeometry(1.0, 12, 6), X(bu), i * (by - 0.03), bz, 0, 0, 0.0, [2.5, 0.12, 0.12]);
    }
    /* bow torpedo-tube ports: the three ovals the drawing shows on the stem */
    var ports = [[70.45, -1.2], [71.4, -0.4], [71.4, -1.45]];
    for (k = 0; k < ports.length; k++) {
      var pu = ports[k][0], pz = ports[k][1], py = hullY(pu, pz);
      for (i = -1; i <= 1; i += 2)
        A.add("dark", new THREE.SphereGeometry(1.0, 10, 6), X(pu), i * (py - 0.02), pz, 0, 0, 0, [0.33, 0.12, 0.28]);
    }

    /* ---- fin: a plain flat-sided box a third back, forward edge upright ---- */
    var fu0 = 38.0, fu1 = 51.9, ftop = ZC0 + (is636 ? 4.8 : 4.95);
    var fx0 = X(fu0), fx1 = X(fu1), hw = 1.4, zb = ctop(45) - 1.6;
    var rings = [], lv = [zb, zb + 1.2, 3.3, 4.8, 6.2, ftop - 0.35, ftop - 0.12, ftop];
    for (i = 0; i < lv.length; i++) {
      var zz = lv[i], tp = Math.max(0, zz - (ftop - 0.4)) / 0.4;      /* top edge eased in */
      var xa = fx0 + 0.30 * Math.max(0, (zz - ZC0) / (ftop - ZC0)) + tp * 0.12;
      rings.push({ z: zz, pts: rrect(xa, fx1 - tp * 0.12, hw - tp * 0.12, 0.55, 32) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    for (i = -1; i <= 1; i += 2) {
      /* the oval access door low on the side, four small windows at the forward top */
      box(THREE, A, "dark", 0.85, 0.05, 1.5, X(43.9), i * (hw + 0.01), ZC0 + 0.85);
      for (k = 0; k < 3; k++) box(THREE, A, "dark", 0.40, 0.05, 0.30, X(50.6 + k * 0.5), i * (hw - 0.02), ftop - 1.1);
      box(THREE, A, "dark", 0.50, 0.05, 0.40, X(40.4), i * (hw - 0.0), ftop - 1.55);
      box(THREE, A, "dark", 0.45, 0.05, 0.60, X(42.0), i * (hw - 0.0), ZC0 + 1.8);
    }
    box(THREE, A, "dark", 2.2, 1.2, 0.05, X(46.5), 0, ftop + 0.02);       /* top hatch */

    /* ---- masts and antennas, per the elevation of the variant ---- */
    var ML = is636 ? MAST636 : MAST877, FTP = is636 ? 248 : 255, mb = ftop - 0.05;
    for (k = 0; k < ML.length; k++) {
      var m = ML[k], mx = X(m[0] / PXV), mt = ftop + (FTP - m[1]) / PXV;
      strut(THREE, A, m[3], m[2], [mx, 0, mb], [mx, 0, mt], 10);
      if (m[4] === "round" || m[4] === "point")
        A.add(m[3], new THREE.SphereGeometry(m[2], 10, 6), mx, 0, mt, 0, 0, 0, [1, 1, m[4] === "point" ? 2.0 : 1.2]);
      if (m[4] === "dome") {                                   /* periscope head */
        cylZ(THREE, A, "dark", 0.34, 0.34, 0.60, 12, mx, 0, mt + 0.3);
        A.add("dark", new THREE.SphereGeometry(0.34, 12, 6), mx, 0, mt + 0.6);
      }
      if (m[4] === "box") box(THREE, A, "dark", 1.35, 0.55, 1.0, mx + 0.1, 0, mt - 0.5);
    }

    /* ---- stern: cone, ventral rudder box, dorsal nub, stern planes, one big screw ---- */
    var sx0 = X(3.6), sx1 = X(7.0), kz = keel(3.6);
    var vr = [[sx0, -2.4], [sx1, -2.6], [sx1 + 0.1, -7.3], [sx0 - 0.1, -7.3]];
    var vg = ext(THREE, vr, 0.34, true); vg.translate(0, 0.17, 0);
    A.add("sail", vg, 0, 0, 0);
    box(THREE, A, "sail", 1.3, 0.22, 0.9, X(8.65), 0, ctop(8.65) + 0.2);
    var sp = [[X(4.0), 0.0], [X(7.6), 0.0], [X(6.8), 3.4], [X(5.4), 3.4]];
    var spg = ext(THREE, sp, 0.16); spg.translate(0, 0, -2.62);
    A.add("sail", spg, 0, 0, 0);
    var spm = [[X(4.0), 0.0], [X(7.6), 0.0], [X(6.8), -3.4], [X(5.4), -3.4]];
    var spq = ext(THREE, spm, 0.16); spq.translate(0, 0, -2.62);
    A.add("sail", spq, 0, 0, 0);
    for (i = -1; i <= 1; i += 2)
      A.add("sail", new THREE.SphereGeometry(1.0, 12, 8), X(6.0), i * 0.35, -2.54, 0, 0, 0, [2.6, 0.55, 0.40]);

    var nb = is636 ? 7 : 6, pr = is636 ? 1.2 : 1.4, pz0 = -3.04, px = X(0.0);
    var bl = [[-0.10, 0.18], [-0.30, 0.45], [-0.38, 0.75], [-0.22, 0.95], [0.12, 0.96], [0.30, 0.75], [0.26, 0.45], [0.09, 0.18]];
    cylX(THREE, A, "screw", 0.34, 0.14, 1.1, 14, X(0.55), 0, pz0);          /* hub cone */
    A.add("screw", new THREE.SphereGeometry(0.15, 10, 6), X(0.0), 0, pz0);
    for (i = 0; i < nb; i++) {
      var gb = ext(THREE, bl.map(function (p) { return [p[0] * pr, p[1] * pr]; }), 0.05);
      gb.translate(0, 0, -0.025);
      gb.rotateY(1.0);
      A.add("screw", gb, X(0.3), 0, pz0, i * 2 * PI / nb, 0, 0);
    }

    /* ---- modest team strips: two flat panels on the casing, 2 cm up ---- */
    box(THREE, A, "team", 3.00, 0.90, 0.04, X(58.0), 0, ctop(58.0) + 0.02);
    box(THREE, A, "team", 3.00, 0.90, 0.04, X(16.0), 0, ctop(16.0) + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is each boat's true length: render3d scales a submarine by it. */
UNIT_MODELS["pact_e80_sub"] = { len: 72.6, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, false); } };
UNIT_MODELS["pact_e90_sub"] = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, true); } };
UNIT_MODELS["pact_e00_sub"] = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, true); } };
UNIT_MODELS["sub_p"]        = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, true); } };
