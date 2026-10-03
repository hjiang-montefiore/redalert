/* ==================== js/hero/ru_nanuchka.js ============================
   HERO MODEL -- Project 1234 "Nanuchka" (NATO Nanuchka I) missile corvette
   (malyy raketnyy korabl), first-series ship as in service from 1970, NOT
   the later Project 1234.1 (Nanuchka III, single 76 mm + AK-630).
   Key: pact_e80_corvette.
   Length 59.3 m, beam 11.8 m (published figures; js/warship_specs.js row
   says 59.3 / 11.8), draught about 2.7-3 m, three shafts.

   ROW CONFLICT (reported): js/eras.js names it "Project 1234 Nanuchka",
   service 1970, js/generations.js gives "twin 57mm AK-725" - all Nanuchka I.
   js/warship_specs.js names it "Project 1234.1", gun 76 mm fore, ciws 1,
   and eras.js lists weapon ciws_ak630 - Nanuchka III items.  This model
   follows the row's own name, date and 57 mm gun: the twin AK-725 aft, NO
   AK-630 and NO 76 mm are drawn.

   REFERENCES (what each feature rests on):
     - Commons "Nanuchka-I DN-SC-88-09637.jpg" (US DoD, aerial port bow
       quarter of a Nanuchka I at speed): long flush deck with sheer rising
       to a high bow, round Osa-M well cover on the forecastle, the two
       triple P-120 Malakhit launchers beside the bridge fixed at about 12
       deg elevation, bridge block under a large Band Stand radome with a
       smaller dome/dish beside it, lattice mast right behind it, low long
       aft deckhouse, a round radar on the aft house and the shielded
       57 mm mount at the stern, reddish-brown deck, dark grey hull, light
       grey superstructure and launchers.
     - Commons "Soviet-Nanuchka-1983.jpg" (starboard bow quarter, alongside):
       the launcher bins (three tubes, domed nose caps) lifted above the
       forecastle on pedestals either side of the bridge, tall raked bridge
       front with wheelhouse windows, Band Stand dome, tall lattice mast with
       crossarms, high stem and flared bow, dark boot topping, red anti-
       fouling, steel-grey hull.
     - Commons "Soviet Nanuchka class guided missile corvette.JPEG" (US
       Navy, starboard bow quarter, Nanuchka I): checked for station
       positions - dome 41% of the length from the bow, launchers beside the
       bridge, long low aft house with a round radar, 57 mm mount at the
       stern; mast top about 20 m above the waterline, dome top about 14 m.
     - Commons "Nanuchka class corvette 617.jpg" (side view, Sevastopol):
       launcher size and tilt, strong sheer and flare at the bow.
     - No published profile drawing was found on Commons.
   NOT CONFIRMED and so approximated: mast antennas (arrangement only
   roughly as photographed), small fittings aft, exact tube spacing of the
   launchers, three-shaft underwater gear (published: three shafts).
   No hull numbers, names, ensigns are drawn.  Hull and house greys sampled
   by eye from the two photographs (hull darker steel grey than 1960s ships).

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The twin
   57 mm AK-725 aft is the group named "turret"; everything else is baked,
   one mesh per material.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNanuchka = (function () {
  "use strict";
  var PI = Math.PI;
  var XA = -29.65, XB = 29.65;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-29.65, 4.60, 3.45, -1.20, 0.20, 0.60],
    [-27.0, 5.40, 3.50, -2.30, 0.20, 0.58],
    [-20.0, 5.80, 3.55, -2.90, 0.19, 0.55],
    [-8.0, 5.80, 3.70, -3.00, 0.18, 0.52],
    [4.0, 5.80, 3.90, -3.00, 0.18, 0.52],
    [12.0, 5.80, 4.30, -2.95, 0.20, 0.58],
    [19.0, 5.20, 4.90, -2.70, 0.26, 0.70],
    [25.0, 3.80, 5.60, -2.10, 0.36, 0.90],
    [28.5, 1.60, 6.10, -1.00, 0.55, 1.20],
    [29.65, 0.30, 6.35, -0.30, 0.70, 1.40]
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

  /* ---------------------------------------------------------- textures */
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
    var g = cv.getContext("2d"), R = rng(2287), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.18; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.08;
    for (i = 0; i < 30; i++) {
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


  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(0x69737b, plateTex(THREE, [10, 1.0]), 0.86),
      under: skin(0x2a1410, plateTex(THREE, [6, 2]), 0.9),
      sup:   skin(0x9ca4aa, plateTex(THREE, [2, 2]), 0.86),
      dome:  skin(0xb4bcc2, plateTex(THREE, [1, 1]), 0.7),
      deck:  skin(0x7c5f52, plateTex(THREE, [8, 1.5]), 0.95),
      dark:  skin(0x08090a, plateTex(THREE, [2, 2]), 0.9),
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

  function cylY2(THREE, p, r, len, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12, 1, len > 1), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  /* quad of thin bars: curved Head Net (Top Sail-type bow-tie array) */
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


  /* ---------- hull ---------- */
  function bowRake(x, k) { return x > 18 ? k * Math.pow((x - 18) / 11.65, 1.6) : 0; }
  function hullSections(kind) {
    var A = [], i, XS = [];
    for (i = 0; i < 34; i++) XS.push(XA + (XB - XA) * (i / 33));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3);
      var xx = x - bowRake(x, kind === "low" ? 2.4 : 1.5);
      if (kind === "top")
        A.push({ x: xx, w: w + 0.06, h: (dz - 0.7) / 2, zc: (dz + 0.5) / 2, sq: pick(x, 4) });
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.03, h: 0.35, zc: 0.25, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.12 - kz) / 2, zc: (0.12 + kz) / 2, sq: pick(x, 5) });
    }
    return A;
  }
  function unrake(X) { var xo = X, k; for (k = 0; k < 4; k++) xo = X + bowRake(xo, 1.5); return xo; }
  function deckRibbon(THREE, m, x0, x1) {
    var xs = [x0, x1], i, j, NC = 3, pos = [], uv = [], idx = [], x;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.3 && STA[i][0] < x1 - 0.3) xs.push(STA[i][0]);
    for (x = x0 + 1; x < x1 - 0.3; x += 1.5) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      x = xs[i]; var xo = unrake(x);
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
  function edgeY(x) { return Math.max(0.1, halfB(unrake(x)) - 0.2); }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(unrake(x)) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.022, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
        }
        prev = [x, y, z];
      }
    }
  }

  /* twin 57 mm AK-725 in its round-topped oval shield, at rest pointing +X */
  function ak725(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.35, 1.5, 0.8, 14, T.sup, 0, 0, 0.4);
    hexa(THREE, g, T.sup, [
      [-1.5, -1.4, 0.8], [1.3, -1.3, 0.8], [1.3, 1.3, 0.8], [-1.5, 1.4, 0.8],
      [-1.2, -1.05, 2.1], [0.8, -0.95, 1.95], [0.8, 0.95, 1.95], [-1.2, 1.05, 2.1]]);
    cylZ(THREE, g, 0.9, 1.0, 0.25, 12, T.sup, -0.2, 0, 2.2);
    box(THREE, g, 0.3, 1.9, 0.6, T.dark, 1.25, 0, 1.4);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.12, 0.12, 0.8, 8, T.gun, 1.5, s * 0.45, 1.4);
      cylX(THREE, g, 0.055, 0.055, 2.4, 8, T.gun, 2.8, s * 0.45, 1.4, true);
    }
    return g;
  }
  /* one fixed triple P-120 Malakhit launcher bin, rear at the origin, nose
     toward +X; the caller tilts it up about 12 deg */
  function bin3(THREE, g, T) {
    var i, P = [[-0.63, -0.45], [0.63, -0.45], [0.0, 0.62]];
    for (i = 0; i < 3; i++) {
      cylX(THREE, g, 0.62, 0.62, 9.0, 12, T.sup, 4.5, P[i][0], P[i][1]);
      cylX(THREE, g, 0.12, 0.58, 0.45, 12, T.dome, 9.2, P[i][0], P[i][1]);
      cylX(THREE, g, 0.64, 0.64, 0.14, 12, T.metal, 0.1, P[i][0], P[i][1]);
      cylX(THREE, g, 0.64, 0.64, 0.1, 12, T.metal, 3.0, P[i][0], P[i][1]);
      cylX(THREE, g, 0.64, 0.64, 0.1, 12, T.metal, 6.5, P[i][0], P[i][1]);
    }
    box(THREE, g, 8.6, 1.0, 0.7, T.sup, 4.4, 0, -0.35);
    box(THREE, g, 8.0, 0.4, 0.6, T.sup, 4.4, 0, 0.25);
    box(THREE, g, 1.4, 2.4, 0.5, T.metal, 0.8, 0, -0.75);
    return g;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* hull shells, transom, deck */
    g.add(loftMesh(THREE, M, hullSections("top"), 22, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 14, T.dark));
    g.add(loftMesh(THREE, M, hullSections("low"), 20, T.under));
    tprism(THREE, g, 0.4, 9.6, 0.4, 9.0, 3.0, T.hull, -29.5, 0, 1.9);
    g.add(deckRibbon(THREE, T.deck, -29.4, 28.6));

    /* scuttles along the topsides, hawse pipes */
    for (i = 0; i < 14; i++) {
      x = -24 + i * 3.6;
      for (s = -1; s <= 1; s += 2)
        box(THREE, g, 0.25, 0.05, 0.25, T.dark, x, s * (halfB(x) + 0.09), deckZ(x) - 1.15);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.5, 0.08, 0.5, T.dark, 26.0, s * (halfB(unrake(26)) - 0.3), deckZ(26) - 1.1);

    /* main house under the bridge, lower aft house */
    tprism(THREE, g, 18.0, 5.8, 17.0, 5.4, 2.9, T.sup, 0.5, 0, 5.3);
    tprism(THREE, g, 14.0, 6.4, 13.0, 5.8, 2.0, T.sup, -15.5, 0, 4.65);
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.6, 0.05, 0.8, T.dark, -7.5 + i * 2.8, s * 2.88, 5.7);
    for (i = 0; i < 5; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.6, 0.05, 0.6, T.dark, -21.0 + i * 2.7, s * 3.18, 4.9);

    /* bridge block: raked front, wheelhouse, glass, wings */
    hexa(THREE, g, T.sup, [
      [-1.0, -2.6, 6.75], [9.2, -2.6, 6.75], [9.2, 2.6, 6.75], [-1.0, 2.6, 6.75],
      [-0.6, -2.4, 9.35], [7.6, -2.4, 9.35], [7.6, 2.4, 9.35], [-0.6, 2.4, 9.35]]);
    tprism(THREE, g, 6.2, 4.6, 5.8, 4.2, 1.4, T.sup, 3.7, 0, 10.05);
    box(THREE, g, 0.08, 4.0, 0.7, T.glass, 6.62, 0, 10.2);
    box(THREE, g, 5.0, 0.08, 0.7, T.glass, 3.7, 2.0, 10.2);
    box(THREE, g, 5.0, 0.08, 0.7, T.glass, 3.7, -2.0, 10.2);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.4, 1.6, 0.14, T.sup, 3.5, s * 3.1, 8.9);
      box(THREE, g, 0.9, 0.05, 0.5, T.dark, 5.0, s * 2.45, 8.6);
      box(THREE, g, 0.9, 0.05, 0.5, T.dark, 2.8, s * 2.45, 8.6);
    }
    box(THREE, g, 6.4, 4.8, 0.1, T.sup, 3.7, 0, 10.8);

    /* Band Stand radome: drum and dome on the bridge roof */
    cylZ(THREE, g, 1.75, 1.8, 1.3, 20, T.dome, 4.5, 0, 11.5);
    var dg = new THREE.SphereGeometry(1.75, 20, 8, 0, PI * 2, 0, PI / 2);
    dg.rotateX(PI / 2);
    var dm = new THREE.Mesh(dg, T.dome); dm.position.set(4.5, 0, 12.15); g.add(dm);
    /* smaller fire control dish pair beside it (Pop Group fit as pictured) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.28, 0.35, 0.9, 8, T.sup, 1.2, s * 1.5, 11.3);
      dish(THREE, g, T.metal, 0.6, 1.6, s * 1.5, 11.9, 0.15);
    }

    /* mast aft of the dome: tapering lattice, crossarms, antennas */
    lattice(THREE, g, T, -1.8, 1.2, 1.1, 0.5, 0.45, 9.35, 18.2, 6, 0.07);
    box(THREE, g, 0.5, 3.4, 0.1, T.metal, -1.8, 0, 15.0);
    box(THREE, g, 0.5, 2.2, 0.1, T.metal, -1.8, 0, 17.0);
    strut(THREE, g, T.metal, -1.8, 0, 18.2, -1.8, 0, 21.0, 0.05, 4);
    box(THREE, g, 0.1, 1.8, 0.1, T.metal, -1.8, 0, 20.2);
    box(THREE, g, 0.25, 1.6, 0.9, T.metal, -2.3, 0, 18.4);
    cylZ(THREE, g, 0.4, 0.4, 0.8, 10, T.sup, -1.2, 1.4, 15.0);
    strut(THREE, g, T.metal, -1.8, 0, 20.8, 7.0, 0.8, 10.8, 0.012, 3);
    strut(THREE, g, T.metal, -1.8, 0, 20.8, 7.0, -0.8, 10.8, 0.012, 3);

    /* aft round radar on a post, deckhouse roof gear */
    box(THREE, g, 1.0, 1.0, 1.0, T.sup, -13.0, 0, 6.2);
    cylZ(THREE, g, 0.85, 0.95, 1.0, 14, T.sup, -13.0, 0, 7.2);
    dish(THREE, g, T.metal, 0.95, -12.2, 0, 8.0, 0.05);
    box(THREE, g, 1.6, 1.4, 0.9, T.sup, -17.5, 2.0, 6.1);
    box(THREE, g, 1.2, 1.2, 0.8, T.sup, -18.5, -2.0, 6.05);
    cylZ(THREE, g, 0.3, 0.3, 0.7, 8, T.metal, -9.6, 2.4, 5.95);

    /* P-120 launcher bins beside the bridge, tilted about 12 deg, on pedestals */
    for (s = -1; s <= 1; s += 2) {
      var ln = new THREE.Group(); ln.position.set(-1.5, s * 4.25, 5.8); ln.rotation.y = -0.21;
      bin3(THREE, ln, T); g.add(ln);
      box(THREE, g, 2.2, 2.0, 1.8, T.sup, 0.2, s * 4.25, deckZ(0.2) + 0.9);
      box(THREE, g, 1.8, 2.0, 2.8, T.sup, 5.5, s * 4.25, deckZ(5.5) + 1.2);
    }

    /* forecastle: Osa-M well cover, windlass, bollards, anchors */
    cylZ(THREE, g, 1.55, 1.6, 0.18, 24, T.sup, 17.5, 0, deckZ(17.5) + 0.09);
    cylZ(THREE, g, 1.3, 1.3, 0.1, 24, T.metal, 17.5, 0, deckZ(17.5) + 0.2);
    box(THREE, g, 2.6, 0.08, 0.04, T.dark, 17.5, 0, deckZ(17.5) + 0.27);
    box(THREE, g, 0.08, 2.6, 0.04, T.dark, 17.5, 0, deckZ(17.5) + 0.27);
    cylZ(THREE, g, 0.5, 0.5, 0.6, 10, T.metal, 24.0, 0, deckZ(24.0) + 0.3);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 21.5, s * 2.6, deckZ(21.5) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 8.0, s * 5.2, deckZ(8.0) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, -26.0, s * 4.4, 3.8);
      box(THREE, g, 1.0, 0.25, 0.5, T.gun, 25.0, s * (halfB(unrake(25)) - 0.9), deckZ(25) - 0.3);
    }
    box(THREE, g, 1.4, 0.5, 0.2, T.metal, 21.0, 0, deckZ(21) + 0.1);

    /* underwater gear: three shafts on struts, props, two rudders */
    var sy = [-2.6, 0.0, 2.6];
    for (i = 0; i < 3; i++) {
      s = sy[i];
      cylX(THREE, g, 0.2, 0.2, 5.0, 8, T.metal, -27.0, s, -1.7);
      cylX(THREE, g, 0.3, 0.45, 0.7, 8, T.metal, -29.9, s, -1.7);
      if (s !== 0) strut(THREE, g, T.metal, -28.2, s, -1.7, -28.2, s * 1.4, -0.7, 0.12, 4);
      var k;
      for (k = 0; k < 4; k++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 1.0), T.metal);
        bl.position.set(-29.9, s, -1.7); bl.rotation.x = k * PI / 2 + 0.35;
        bl.translateZ(0.7); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.6, 0.18, 2.0, T.metal, -29.6, s * 1.3, -1.0);

    railRun(THREE, g, T, -29.0, -8.0, 3.0, 0.95);
    railRun(THREE, g, T, -8.0, 14.0, 4.0, 0.95);
    railRun(THREE, g, T, 14.0, 27.0, 3.5, 0.95);

    /* team: three small up-facing strips, 2 cm proud */
    box(THREE, g, 1.8, 0.8, 0.04, T.team, -20.0, 0, 5.67);
    box(THREE, g, 1.8, 0.8, 0.04, T.team, 3.7, 0, 10.87);
    box(THREE, g, 1.8, 0.8, 0.04, T.team, 22.0, 0, deckZ(22.0) + 0.06);

    /* trained mount: twin 57 mm AK-725 at the stern */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(-25.0, 0, 3.52); ak725(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g, []);
    var tb = bake(THREE, tw, []);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_corvette"] = {
  len: 59.3,
  build: function (THREE, M, C) { return HeroNanuchka.build(THREE, M, C); }
};
