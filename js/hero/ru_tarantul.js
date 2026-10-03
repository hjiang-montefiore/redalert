/* ==================== js/hero/ru_tarantul.js ===========================
   HERO MODEL -- Project 1241 "Molniya" (NATO Tarantul) missile boat.  Two
   variants of the same hull, 56.1 m x 10.2 m (published figures; the drawing
   below is dimensioned 56,1 m and 10,2 m; draught about 2.5 m):
     variant "termit" -- key pact_e80_missileboat (service 1979, e80-e90):
        the first series, four P-15M Termit launchers, no radome.
     variant "moskit" -- key missileboat_p (present day): the Tarantul III
        (Project 1241.1MP / 12411) with four P-270 Moskit tubes and the
        large Band Stand radome on the bridge roof.
   WHY THESE TWO (reasoning for the row): the row starts in 1979, the year of
   the lead boat, when every Molniya carried Termit; Moskit boats only began to
   be delivered later in the 1980s (the one dated photograph found, Commons
   "R-261.jpg", Vladivostok September 1990, already shows a Soviet Tarantul III
   with the dome and the big tubes - so Moskit is a late 1980s-1990 fit, not the
   1979 one).  The e80 row therefore shows the Termit boat; the present-day row
   shows the Tarantul III.  Row "service" and "to: e90" cannot be split in two
   boats by this game; the Termit boat is the one that matches 1979.

   REFERENCES (what each feature rests on):
     - Commons "Typenblatt-Tarantul-engl.jpg" (dimensioned three-view drawing,
       "Missile corvette - Project 1241 (Tarantul 1 class)", 56,1 m / 10,2 m,
       837 px = 56.1 m): hull sheer and bow, the forecastle with the AK-176 at
       about 14 m from the stem, two launchers a side (one above the other)
       angled forward-up on the beam abaft the bridge, the bridge block, the
       lower aft house with the two AK-630 either side of the centreline and
       the Bass Tilt director between them, exhaust trunks at the transom
       corners, two shafts and rudders, a jackstaff at the stem, the tall
       lattice mast and the dish on the central roof (termit variant).
     - Commons "Okrety-projektu-1241-sylwetka.jpg" (side silhouette): mast
       and superstructure profile, the stepped aft house, whip antennas.
     - Commons "R-261.jpg" (Soviet Tarantul III, Vladivostok, Sept 1990):
       the forward house with the radome on the bridge roof, the tapered tube
       pair on each side angled forward-up, the lattice mast with two round
       radomes, the low aft house with the two AK-630 raised; grey hull with a
       paler house, dark boot stripe.
     - Commons "Zarechny (parade).jpg" and "Project 1241 missile boat of the
       Black Sea Fleet of the Russian Federation.png" (Russian Tarantul IIIs,
       2010s): the big dome on the bridge roof, the four tubes in two stacked
       pairs a side, window row across the bridge face, the mast with the
       platform, the round radome and the two box antennas, the yard and the
       whip; both show the Moskit fit - no Kh-35 Uran refit appeared in the
       photographs found, so the present-day variant is the Moskit boat.
     - Armament counts (4 launchers, one AK-176 forward, two AK-630 aft) are the
       published figures and the data rows' own.
     - PAINT: 1990 photograph reads light grey hull with a paler house and a
       dark red-brown boot stripe; the 2010s photographs read a darker mid
       grey - the termit variant uses the lighter, the moskit variant the darker.
   NOT CONFIRMED and therefore not drawn: any Kh-35 Uran fit, the exact radar
   types (the mast antennas are drawn as the photographs show them: no type
   names asserted), the hull number, flags and ensigns, the small boats and
   davit.  The launcher elevation, the mast rake of the termit variant and the
   window counts are read off the drawing and photographs approximately.
   The AK-176 sits baked in (neither data row carries turret:true), so nothing
   in this model is named "turret".

   CHECK-AND-FIX NOTES: Termit mast redrawn upright (tapered tower, slim side lattice) as
   the Typenblatt drawing shows; the long mast-top stays removed on both variants (neither
   the drawing nor the 1990 photograph "R-261"/"943" shows any; the thin verticals in the
   drawing are whips); the invented small dish on the bridge roof removed; Moskit tube
   elevation eased to 10 deg (photograph).  Moskit date: Project 1241.1MP first boats
   (R-63 etc.) commissioned 1987 (Wikipedia Tarantul-class; secondary source).

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  Every static
   part is merged into one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTarantul = (function () {
  "use strict";
  var PI = Math.PI;
  var XA = -28.05, XB = 29.55;
  var TURRET = false;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-28.05, 4.50, 3.30, -1.90, 0.20, 0.60],
    [-26.0, 4.75, 3.32, -2.30, 0.20, 0.58],
    [-20.0, 4.95, 3.38, -2.50, 0.19, 0.55],
    [-5.0, 5.04, 3.60, -2.55, 0.18, 0.52],
    [8.0, 4.85, 3.85, -2.35, 0.18, 0.52],
    [15.0, 4.30, 4.10, -1.90, 0.22, 0.60],
    [21.4, 3.30, 4.35, -1.20, 0.30, 0.78],
    [25.9, 2.00, 4.60, -0.50, 0.45, 1.00],
    [28.7, 0.70, 4.75, 0.20, 0.65, 1.30],
    [29.55, 0.20, 4.85, 0.50, 0.85, 1.50]
  ];
  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
      var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[k] + (b[k] - a[k]) * f;
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pick(x, 2); }
  function halfB(x) { return pick(x, 1); }

  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function plateTex(THREE, rep) {
    var key = "p" + rep[0] + "_" + rep[1];
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(1241), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.07;
    for (i = 0; i < 26; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 58, 10 + R() * 38);
    }
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rep[0], rep[1]);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }

  function makeMats(THREE, C, v) {
    var team = (C && C.team) || 0x3f7fd0;
    var late = v === "moskit";
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(late ? 0x727a80 : 0x8d979d, plateTex(THREE, [10, 1]), 0.86),
      boot:  skin(0x4a2a22, plateTex(THREE, [10, 1]), 0.9),
      under: skin(0x1c0f0c, plateTex(THREE, [6, 2]), 0.9),
      sup:   skin(late ? 0x7e868b : 0xa3abb0, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x555b60, plateTex(THREE, [8, 1.5]), 0.95),
      dark:  skin(0x070809, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x5d646a, 0.52, 0.55),
      gun:   metal(0x3b4146, 0.48, 0.60),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
                                              transparent: true, opacity: 0.84 })
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ------------------------------------------------------------ helpers */
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (ry) b.rotation.y = ry; p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open); g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var ax = lx0 / 2, ay = ly0 / 2, bx = lx1 / 2, by = ly1 / 2, hz = lz / 2;
    var V = [[-ax, -ay, -hz], [ax, -ay, -hz], [ax, ay, -hz], [-ax, ay, -hz],
             [-bx, -by, hz], [bx, -by, hz], [bx, by, hz], [-bx, by, hz]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); mm.position.set(x, y, z); p.add(mm); return mm;
  }
  function loftMesh(THREE, M, secs, segs, m) {
    var g = M.loft(THREE, secs, segs), idx = g.getIndex(), a = idx.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    idx.needsUpdate = true; g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  function bowRake(x, k) { return x > 17 ? k * Math.pow((x - 17) / 12.55, 1.6) : 0; }
  function hullSections(kind) {
    var A = [], i, XS = [];
    for (i = 0; i < 40; i++) XS.push(XA + (XB - XA) * (i / 39));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3);
      var xx = x - bowRake(x, kind === "low" ? 2.6 : 1.5);
      if (kind === "top")
        A.push({ x: xx, w: w + 0.06, h: (dz - 0.7) / 2, zc: (dz + 0.5) / 2, sq: pick(x, 4) });
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.03, h: 0.45, zc: 0.30, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.12 - kz) / 2, zc: (0.12 + kz) / 2, sq: pick(x, 5) });
    }
    return A;
  }
  function deckRibbon(THREE, m, x0, x1) {
    var xs = [x0, x1], i, j, NC = 3, pos = [], uv = [], idx = [], x;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.3 && STA[i][0] < x1 - 0.3) xs.push(STA[i][0]);
    for (x = 18; x < x1 - 0.3; x += 1.5) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      x = xs[i]; var xo = x, k;
      for (k = 0; k < 4; k++) xo = x + bowRake(xo, 1.5);
      var w = Math.max(0.06, halfB(xo) - 0.02), z = deckZ(xo) + 0.04;
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * 2) * (j / NC) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    var gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    gg.setIndex(idx); gg.computeVertexNormals();
    return new THREE.Mesh(gg, m);
  }
  /* deck edge x shifted for the rake, so rails and fittings sit on the plating */
  function edgeY(x) {
    var xo = x, k; for (k = 0; k < 4; k++) xo = x + bowRake(xo, 1.5);
    return Math.max(0.1, halfB(xo) - 0.2);
  }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  /* box with raked ends / sloped roof: 8 corner points, same face table as tprism */
  function hexa(THREE, p, m, V) {
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  /* uptake casing: bottom rect x0..x1 half width w0 at z0, roof inset w1 and
     sloping from zb (aft edge) to zf (fore edge) */
  function casing(THREE, p, m, x0, x1, w0, w1, z0, zb, zf, inset) {
    return hexa(THREE, p, m, [
      [x0, -w0, z0], [x1, -w0, z0], [x1, w0, z0], [x0, w0, z0],
      [x0 + inset, -w1, zb], [x1 - inset * 0.3, -w1, zf], [x1 - inset * 0.3, w1, zf], [x0 + inset, w1, zb]]);
  }
  /* One mesh per material: bake every mesh under root (except named
     children listed in skip) into merged geometry in root's frame. */
  function bake(THREE, root, skip) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var p = o.parent, bad = false;
      while (p && p !== root) { if (skip.indexOf(p) >= 0) bad = true; p = p.parent; }
      if (bad) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      var id = o.material.uuid;
      if (!bins[id]) { bins[id] = { m: o.material, P: [], N: [], U: [] }; order.push(id); }
      var b = bins[id], pa = geo.attributes.position.array, na = geo.attributes.normal.array;
      var ua = geo.attributes.uv ? geo.attributes.uv.array : null, i;
      for (i = 0; i < pa.length; i++) { b.P.push(pa[i]); b.N.push(na[i]); }
      for (i = 0; i < pa.length / 3; i++) b.U.push(ua ? ua[i * 2] : 0, ua ? ua[i * 2 + 1] : 0);
    });
    var out = new THREE.Group();
    order.forEach(function (id) {
      var b = bins[id], g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.N, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.U, 2));
      var me = new THREE.Mesh(g, b.m); me.castShadow = true; me.receiveShadow = true; out.add(me);
    });
    return out;
  }


  /* four-legged tapering lattice tower: base half sizes (bx, by) at z0 to
     top half sizes (tx, ty) at z1, n bays with rings and X braces */
  function lattice(THREE, g, T, cx, bx, by, tx, ty, z0, z1, n, r) {
    var i, j, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    function pt(k, f) {
      var sx = bx + (tx - bx) * f, sy = by + (ty - by) * f;
      return [cx + c[k][0] * sx, c[k][1] * sy, z0 + (z1 - z0) * f];
    }
    for (j = 0; j < 4; j++) {
      var a = pt(j, 0), b = pt(j, 1);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], r, 4);
    }
    for (i = 0; i <= n; i++) {
      var f = i / n;
      for (j = 0; j < 4; j++) {
        var p = pt(j, f), q = pt((j + 1) % 4, f);
        if (i > 0) strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], r * 0.6, 3);
        if (i < n) {
          var p2 = pt(j, f + 1 / n), q2 = pt((j + 1) % 4, f + 1 / n);
          strut(THREE, g, T.metal, p[0], p[1], p[2], q2[0], q2[1], q2[2], r * 0.4, 3);
        }
      }
    }
  }
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 18, 5, 0, PI * 2, 0, PI / 3.2);
    dg.scale(1, 0.35, 1);
    dg.rotateZ(PI / 2 + tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }

  /* AK-176 76 mm single mount: base, wedge shield, barrel; at rest +X */
  function ak176(THREE, g, T) {
    cylZ(THREE, g, 1.45, 1.55, 0.55, 16, T.sup, 0, 0, 0.27);
    hexa(THREE, g, T.sup, [
      [-1.6, -1.35, 0.5], [1.3, -1.15, 0.5], [1.3, 1.15, 0.5], [-1.6, 1.35, 0.5],
      [-1.2, -1.0, 2.0], [0.6, -0.72, 1.7], [0.6, 0.72, 1.7], [-1.2, 1.0, 2.0]]);
    box(THREE, g, 0.55, 0.55, 0.35, T.sup, -0.5, 0.45, 2.15);
    box(THREE, g, 0.35, 1.3, 0.6, T.dark, 1.28, 0, 1.15);
    cylX(THREE, g, 0.19, 0.19, 1.2, 10, T.gun, 1.7, 0, 1.2);
    cylX(THREE, g, 0.085, 0.085, 3.4, 8, T.gun, 3.5, 0, 1.2, true);
    cylX(THREE, g, 0.14, 0.14, 0.4, 8, T.gun, 5.3, 0, 1.2, true);
    return g;
  }
  /* AK-630 six-barrel 30 mm on its round mount, barrels raised a little */
  function ak630(THREE, g, T) {
    var i, a;
    cylZ(THREE, g, 0.8, 0.9, 0.7, 12, T.sup, 0, 0, 0.35);
    hexa(THREE, g, T.sup, [
      [-0.9, -0.85, 0.7], [0.8, -0.8, 0.7], [0.8, 0.8, 0.7], [-0.9, 0.85, 0.7],
      [-0.7, -0.6, 1.9], [0.5, -0.55, 1.7], [0.5, 0.55, 1.7], [-0.7, 0.6, 1.9]]);
    var gb = new THREE.Group(); gb.position.set(0.6, 0, 1.3); gb.rotation.y = -0.3;
    for (i = 0; i < 6; i++) {
      a = i * PI / 3;
      cylX(THREE, gb, 0.04, 0.04, 1.7, 5, T.gun, 0.8, Math.cos(a) * 0.1, Math.sin(a) * 0.1, true);
    }
    cylX(THREE, gb, 0.14, 0.14, 0.8, 8, T.gun, 0.2, 0, 0);
    g.add(gb);
    return g;
  }
  /* launcher tube pair set: one tube with nose, rear disc and two bands */
  function tube(THREE, g, T, r, len, x, y, z) {
    cylX(THREE, g, r, r, len, 14, T.sup, x, y, z);
    cylX(THREE, g, r * 0.62, r, len * 0.07, 14, T.sup, x + len / 2 + len * 0.035, y, z);
    cylX(THREE, g, r * 0.62, r * 0.62, 0.06, 14, T.dark, x + len / 2 + len * 0.07, y, z);
    cylX(THREE, g, r * 1.02, r * 1.02, 0.1, 14, T.dark, x - len / 2 + 0.05, y, z);
    var i;
    for (i = 0; i < 3; i++) cylX(THREE, g, r * 1.05, r * 1.05, 0.12, 14, T.metal, x - len * 0.32 + i * len * 0.32, y, z);
  }
  function launchers(THREE, g, T, v) {
    var late = v === "moskit";
    var r = late ? 0.62 : 0.7, len = late ? 9.0 : 7.4, tilt = late ? 0.17 : 0.2;
    var xc = -5.2, s, k, pz = 5.8;
    for (s = -1; s <= 1; s += 2) {
      var grp = new THREE.Group(); grp.position.set(xc, 0, pz); grp.rotation.y = -tilt;
      tube(THREE, grp, T, r, len, 0, s * 4.05, 5.05 - pz);
      tube(THREE, grp, T, r, len, 0, s * 3.55, 6.6 - pz);
      /* cradle frames tying the pair together */
      for (k = 0; k < 3; k++) {
        var cx = (k - 1) * len * 0.34;
        box(THREE, grp, 0.3, 0.9, 2.5, T.metal, cx, s * 3.8, 5.8 - pz);
      }
      box(THREE, grp, len * 0.9, 0.18, 0.25, T.metal, 0, s * 4.8, 5.05 - pz);
      g.add(grp);
      /* posts from the deck to the cradle */
      for (k = 0; k < 3; k++) {
        var px = xc + (k - 1) * 3.0;
        box(THREE, g, 0.4, 1.3, 1.5, T.metal, px, s * 4.1, 4.1);
        strut(THREE, g, T.metal, px, s * 4.7, 3.7, px, s * 3.9, 4.8, 0.06, 4);
      }
    }
  }

  function dome(THREE, g, m, rad, hcyl, x, y, z) {
    cylZ(THREE, g, rad, rad, hcyl, 20, m, x, y, z + hcyl / 2);
    var sg = new THREE.SphereGeometry(rad, 20, 8, 0, PI * 2, 0, PI / 2);
    sg.rotateX(PI / 2);
    sg.scale(1, 1, 0.9);
    var d = new THREE.Mesh(sg, m); d.position.set(x, y, z + hcyl); g.add(d);
  }

  function build(THREE, M, C, v) {
    var late = v === "moskit";
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C, v));
    var s, i, x, z;

    /* hull: three coaxial shells, transom, deck */
    g.add(loftMesh(THREE, M, hullSections("top"), 26, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 14, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 20, T.under));
    tprism(THREE, g, 0.3, 9.0, 0.3, 8.6, 5.2, T.hull, -28.0, 0, 0.7);
    g.add(deckRibbon(THREE, T.deck, -27.9, 27.4));

    /* side scuttles and hawse pipes */
    for (i = 0; i < 9; i++) for (s = -1; s <= 1; s += 2) {
      x = -22 + i * 4.2;
      box(THREE, g, 0.28, 0.05, 0.28, T.dark, x, s * (halfB(x) + 0.05), deckZ(x) - 0.9);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.5, 0.08, 0.5, T.dark, 22.5, s * (halfB(22) - 0.1), deckZ(22) - 0.8);

    /* forward house (bridge) and its windows */
    hexa(THREE, g, T.sup, [
      [-0.4, -3.1, 3.7], [6.8, -3.1, 3.7], [6.8, 3.1, 3.7], [-0.4, 3.1, 3.7],
      [-0.4, -2.7, 7.45], [6.0, -2.7, 7.45], [6.0, 2.7, 7.45], [-0.4, 2.7, 7.45]]);
    for (i = 0; i < 7; i++) box(THREE, g, 0.14, 0.58, 0.55, T.glass, 6.2, -2.16 + i * 0.72, 6.65);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) box(THREE, g, 0.55, 0.1, 0.5, T.glass, 0.6 + i * 0.85, s * 2.86, 6.6);
      for (i = 0; i < 3; i++) box(THREE, g, 0.7, 0.08, 1.2, T.dark, 0.9 + i * 1.6, s * 3.06, 4.7);
    }
    box(THREE, g, 6.6, 5.4, 0.1, T.sup, 2.9, 0, 7.5);
    /* roof rim lights and rails */
    box(THREE, g, 0.25, 0.25, 0.3, T.metal, 5.4, -2.5, 7.65);
    box(THREE, g, 0.25, 0.25, 0.3, T.metal, 5.4, 2.5, 7.65);

    /* central house and the stepped block that carries the mast */
    hexa(THREE, g, T.sup, [
      [-11.0, -2.9, 3.5], [-0.4, -2.9, 3.5], [-0.4, 2.9, 3.5], [-11.0, 2.9, 3.5],
      [-10.2, -2.5, 7.0], [-0.4, -2.5, 7.0], [-0.4, 2.5, 7.0], [-10.2, 2.5, 7.0]]);
    hexa(THREE, g, T.sup, [
      [-7.0, -1.8, 7.0], [-1.6, -1.8, 7.0], [-1.6, 1.8, 7.0], [-7.0, 1.8, 7.0],
      [-6.6, -1.6, 8.6], [-2.2, -1.6, 8.6], [-2.2, 1.6, 8.6], [-6.6, 1.6, 8.6]]);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      box(THREE, g, 0.9, 0.05, 0.6, T.dark, -9.2 + i * 2.2, s * (2.72 - 0.0), 6.1);
    }

    /* aft house, two tiers */
    hexa(THREE, g, T.sup, [
      [-21.6, -3.3, 3.3], [-15.5, -3.3, 3.3], [-15.5, 3.3, 3.3], [-21.6, 3.3, 3.3],
      [-21.2, -3.0, 6.3], [-15.5, -3.0, 6.3], [-15.5, 3.0, 6.3], [-21.2, 3.0, 6.3]]);
    hexa(THREE, g, T.sup, [
      [-15.5, -3.0, 3.4], [-11.0, -3.0, 3.4], [-11.0, 3.0, 3.4], [-15.5, 3.0, 3.4],
      [-15.5, -2.8, 5.3], [-11.0, -2.7, 5.3], [-11.0, 2.7, 5.3], [-15.5, 2.8, 5.3]]);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++)
      box(THREE, g, 0.8, 0.05, 0.6, T.dark, -19.8 + i * 1.8, s * 3.17, 5.2);

    /* gas-turbine exhaust trunks at the transom corners */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.9, 1.4, 1.6, T.sup, -26.7, s * 3.7, deckZ(-26.7) + 0.8);
      box(THREE, g, 0.06, 1.1, 0.9, T.dark, -27.68, s * 3.7, deckZ(-26.7) + 0.85);
      box(THREE, g, 1.5, 1.0, 0.05, T.dark, -26.7, s * 3.7, deckZ(-26.7) + 1.62);
    }
    /* quarterdeck fittings */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, -27.2, s * 1.7, deckZ(-27.2) + 0.25);
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, 24.5, s * 1.1, deckZ(24.5) + 0.25);
    }
    box(THREE, g, 1.2, 2.2, 0.5, T.metal, -24.5, 0, deckZ(-24.5) + 0.25);

    /* forecastle: breakwater, windlass, bollards, jackstaff */
    box(THREE, g, 0.1, 2.6, 0.7, T.sup, 17.4, 0, deckZ(17.4) + 0.35);
    for (s = -1; s <= 1; s += 2) {
      var bw = box(THREE, g, 0.1, 1.6, 0.7, T.sup, 16.9, s * 1.9, deckZ(16.9) + 0.35);
      bw.rotation.z = s * 0.7;
    }
    cylZ(THREE, g, 0.45, 0.45, 0.6, 10, T.metal, 20.5, 0, deckZ(20.5) + 0.3);
    box(THREE, g, 1.2, 0.5, 0.2, T.metal, 22.0, 0, deckZ(22) + 0.1);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 18.6, s * 2.5, deckZ(18.6) + 0.25);
    strut(THREE, g, T.metal, 27.0, 0, deckZ(26.5) + 0.05, 27.0, 0, deckZ(26.5) + 3.0, 0.04, 4);

    /* AK-176 forward, baked */
    var fg = new THREE.Group(); fg.position.set(14.0, 0, deckZ(14.0)); ak176(THREE, fg, T); g.add(fg);

    /* two AK-630 aft either side of the centreline, Bass Tilt director between */
    for (s = -1; s <= 1; s += 2) {
      var ag = new THREE.Group(); ag.position.set(-18.0, s * 2.2, 6.3); ag.rotation.z = s * 0.1; ak630(THREE, ag, T); g.add(ag);
    }
    cylZ(THREE, g, 0.45, 0.5, 1.5, 12, T.sup, -16.8, 0, 7.05);
    cylZ(THREE, g, 0.7, 0.7, 0.8, 14, T.sup, -16.8, 0, 8.2);
    dish(THREE, g, T.metal, 0.7, -16.4, 0, 8.7, 0.15);

    /* launchers: four tubes in two stacked pairs a side, angled forward-up */
    launchers(THREE, g, T, v);

    /* radar and masts */
    if (late) {
      /* Band Stand style dome on the bridge roof */
      dome(THREE, g, T.sup, 1.45, 1.7, 3.7, 0, 7.55);
      box(THREE, g, 1.6, 1.0, 0.3, T.sup, 3.7, 0, 7.65);
      /* trunk mast with platform, radomes, box antennas, yard, pole */
      hexa(THREE, g, T.sup, [
        [-3.4, -0.9, 8.6], [-1.4, -0.9, 8.6], [-1.4, 0.9, 8.6], [-3.4, 0.9, 8.6],
        [-3.1, -0.6, 12.4], [-1.9, -0.6, 12.4], [-1.9, 0.6, 12.4], [-3.1, 0.6, 12.4]]);
      box(THREE, g, 2.4, 3.6, 0.1, T.metal, -2.5, 0, 12.4);
      for (s = -1; s <= 1; s += 2) {
        box(THREE, g, 0.7, 0.9, 1.1, T.sup, -2.4, s * 1.55, 13.0);
        strut(THREE, g, T.metal, -1.3, s * 1.8, 12.5, -1.3, s * 1.8, 13.5, 0.025, 3);
      }
      var rs = new THREE.SphereGeometry(0.7, 14, 10); var ra = new THREE.Mesh(rs, T.sup); ra.position.set(-1.7, 0, 13.4); g.add(ra);
      lattice(THREE, g, T, -2.5, 0.55, 0.55, 0.25, 0.25, 12.4, 17.6, 4, 0.05);
      var rb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10), T.sup); rb.position.set(-2.5, 0, 17.4); g.add(rb);
      box(THREE, g, 0.3, 3.6, 0.1, T.metal, -2.5, 0, 15.4);
      for (s = -1; s <= 1; s += 2) {
        box(THREE, g, 0.45, 0.45, 0.6, T.sup, -2.5, s * 1.7, 15.8);
        box(THREE, g, 0.5, 0.35, 0.5, T.sup, -2.8, s * 0.9, 12.9);
      }
      strut(THREE, g, T.metal, -2.5, 0, 17.9, -2.5, 0, 21.5, 0.04, 4);
      box(THREE, g, 0.1, 1.8, 0.1, T.metal, -2.5, 0, 20.0);
    } else {
      /* termit variant (Typenblatt drawing): a tapered plated tower, nearly upright
         (a few degrees aft), on the stepped block, a small rotating antenna bar and
         whip at its head, a slim lattice mast aft of it; no stays are drawn */
      hexa(THREE, g, T.sup, [
        [-6.4, -0.75, 8.6], [-4.2, -0.75, 8.6], [-4.2, 0.75, 8.6], [-6.4, 0.75, 8.6],
        [-6.25, -0.3, 15.2], [-5.55, -0.3, 15.2], [-5.55, 0.3, 15.2], [-6.25, 0.3, 15.2]]);
      box(THREE, g, 0.5, 2.6, 0.12, T.metal, -5.9, 0, 15.5);
      for (s = -1; s <= 1; s += 2) box(THREE, g, 0.4, 0.4, 0.5, T.sup, -5.9, s * 1.4, 15.85);
      strut(THREE, g, T.metal, -5.9, 0, 15.2, -5.9, 0, 17.0, 0.04, 4);
      lattice(THREE, g, T, -7.8, 0.22, 0.22, 0.12, 0.12, 8.6, 16.8, 6, 0.03);
      /* dish on a pedestal on the stepped block, facing forward */
      cylZ(THREE, g, 0.3, 0.4, 1.1, 10, T.sup, -2.0, 0, 9.15);
      dish(THREE, g, T.metal, 0.95, -1.5, 0, 10.0, 0.3);
    }
    /* whips on the aft house and the bridge roof */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -14.0, s * 2.6, 5.3, -14.0, s * 2.6, 13.0, 0.02, 3);
      strut(THREE, g, T.metal, 1.4, s * 2.5, 7.5, 1.4, s * 2.5, 13.5, 0.02, 3);
    }


    /* roof rails round the bridge roof and the aft house roof */
    function roofRail(x0, x1, hw, z, h, skipFront) {
      var xs = [], n = Math.round((x1 - x0) / 0.9), j, y0, p;
      for (j = 0; j <= n; j++) xs.push(x0 + (x1 - x0) * j / n);
      [-1, 1].forEach(function (sd) {
        for (j = 0; j <= n; j++) {
          strut(THREE, g, T.metal, xs[j], sd * hw, z, xs[j], sd * hw, z + h, 0.03, 3);
          if (j) {
            strut(THREE, g, T.metal, xs[j - 1], sd * hw, z + h, xs[j], sd * hw, z + h, 0.02, 3);
            strut(THREE, g, T.metal, xs[j - 1], sd * hw, z + h * 0.5, xs[j], sd * hw, z + h * 0.5, 0.015, 3);
          }
        }
      });
      for (j = 0; j <= 4; j++) {
        y0 = -hw + 2 * hw * j / 4;
        if (!skipFront) strut(THREE, g, T.metal, x1, y0, z, x1, y0, z + h, 0.03, 3);
        strut(THREE, g, T.metal, x0, y0, z, x0, y0, z + h, 0.03, 3);
      }
    }
    roofRail(-21.0, -15.6, 2.85, 6.3, 0.9, false);
    roofRail(-0.2, 5.8, 2.55, 7.45, 0.9, false);
    /* hatches, vents, ladders, sun visors, life-raft canisters */
    for (i = 0; i < 3; i++) box(THREE, g, 0.9, 0.9, 0.12, T.dark, -25.0 + i * 1.6, (i - 1) * 2.0, deckZ(-25) + 0.1);
    box(THREE, g, 0.9, 0.9, 0.12, T.dark, 19.5, 1.6, deckZ(19.5) + 0.08);
    box(THREE, g, 0.9, 0.9, 0.12, T.dark, 19.5, -1.6, deckZ(19.5) + 0.08);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        cylX(THREE, g, 0.3, 0.3, 1.3, 10, T.sup, -20.4 + i * 1.7, s * 2.75, 6.7);
        cylX(THREE, g, 0.32, 0.32, 0.1, 10, T.metal, -20.4 + i * 1.7 - 0.2, s * 2.75, 6.7);
      }
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, 0.4 + i * 0.0, s * 3.12, 3.8 + i * 0.9, 0.4, s * 3.12, 3.8 + i * 0.9, 0.03, 3);
      strut(THREE, g, T.metal, 0.4, s * 3.1, 3.8, 0.4, s * 3.1, 7.4, 0.03, 3);
      strut(THREE, g, T.metal, 1.2, s * 3.1, 3.8, 1.2, s * 3.1, 7.4, 0.03, 3);
      for (i = 0; i < 6; i++) strut(THREE, g, T.metal, 0.4, s * 3.1, 4.2 + i * 0.55, 1.2, s * 3.1, 4.2 + i * 0.55, 0.02, 3);
      box(THREE, g, 0.12, 0.9, 0.4, T.sup, 6.0, -0, 7.2);
      box(THREE, g, 1.0, 0.7, 0.9, T.sup, -12.8, s * 2.3, 5.75);
      box(THREE, g, 0.8, 0.05, 1.5, T.dark, -23.1, s * 3.26, 4.4);
      box(THREE, g, 0.8, 0.05, 1.5, T.dark, -21.9, s * 3.26, 4.4);
    }
    for (i = 0; i < 7; i++) box(THREE, g, 0.3, 0.6, 0.06, T.sup, 6.55 - 0.25, -2.16 + i * 0.72, 7.05);

    /* underwater gear: two shafts, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.14, 0.14, 7.0, 8, T.metal, -23.5, s * 3.0, -2.2);
      strut(THREE, g, T.metal, -25.8, s * 3.0, -2.3, -25.8, s * 3.6, -1.2, 0.1, 4);
      cylX(THREE, g, 0.25, 0.3, 0.6, 8, T.metal, -27.2, s * 3.0, -2.3);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.8), T.metal);
        bl.position.set(-27.2, s * 3.0, -2.3); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.5); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 1.6, 0.14, 2.2, T.metal, -26.6, s * 1.2, -1.5);
    }

    railRun(THREE, g, T, -27.4, -21.8, 2.8, 0.9);
    railRun(THREE, g, T, -21.8, 17.0, 3.9, 0.9);
    railRun(THREE, g, T, 17.0, 26.0, 3.4, 0.9);
    /* stern rail */
    for (i = 0; i < 5; i++) strut(THREE, g, T.metal, -27.5, -3.6 + i * 1.8, 3.4, -27.5, -3.6 + i * 1.8, 4.3, 0.035, 3);

    /* team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.6, 0.6, 0.04, T.team, 0.6, 0, 7.57);
    box(THREE, g, 1.6, 0.6, 0.04, T.team, -20.0, 0, 6.37);
    box(THREE, g, 1.6, 0.6, 0.04, T.team, -22.8, 0, deckZ(-22.8) + 0.08);

    g.updateMatrixWorld(true);
    return bake(THREE, g, []);
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_missileboat"] = {
  len: 56.1,
  build: function (THREE, M, C) { return HeroTarantul.build(THREE, M, C, "termit"); }
};
UNIT_MODELS["missileboat_p"] = {
  len: 56.1,
  build: function (THREE, M, C) { return HeroTarantul.build(THREE, M, C, "moskit"); }
};
