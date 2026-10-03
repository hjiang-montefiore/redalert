/* ==================== js/hero/ru_kashin.js ==============================
   HERO MODEL -- Project 61 "Kashin" class large anti-submarine ship (BPK),
   as built 1962-72 (the first all-gas-turbine major warship), NOT the later
   61-M / Kashin-Mod refit.  Key: pact_e60_destroyer.
   Length overall 144 m, beam 15.8 m, draught 4.7 m (published figures; the
   row in js/warship_specs.js says 144 / 15.8).

   REFERENCES (what each feature rests on):
     - Commons "Kashin-class destroyer profile 1987.png" (recognition
       profile, 914 px = 144 m): stations of every feature below were scaled
       off it - flush deck with sheer rising to a raked stem, bow twin 76 mm,
       forward SA-N-1 launcher, bridge block, two lattice masts, two
       slanted uptake casings, aft tower, aft 76 mm mount on a low house,
       aft SA-N-1 launcher, low flat quarterdeck.
     - Commons "UH-2B of HC-2 over Soviet Kashin class destroyer c1968.jpg"
       (port beam, 1968): two big trapezoid uptake casings, the lattice main
       mast with a Head Net crowning it, the second mast carrying a large
       mesh dish, the Peel Group director on the bridge roof, light grey hull.
     - Commons "Kashin class DDG in the Med 1967.jpg" and "Soviet Kashin-class
       destroyer seen from USS Franklin D. Roosevelt ... 1967.jpg" (bow
       quarter views): rakish stem, forecastle with the bow 76 mm, house
       sides with doors and scuttles, pale hull in the FDR photograph.
     - Armament counts (2 x twin SA-N-1, 2 x twin 76 mm AK-726, 1 x 5 tube
       533 mm, 2 x RBU-6000) are the published figures for the Project 61.
     - PAINT: mid grey hull, lighter superstructure as the 1960s photographs
       show; boot topping and anti-fouling dark.
   CHECK-AND-FIX REFERENCES (additional): Commons "49KashinClassDestroyerMediterraneanJan1970.jpg"
   (stern quarter, Jan 1970: low flat quarterdeck, tall lattice mast with a flat mesh antenna and the
   shorter mast with a round mesh dish between the casings), "27KashinClassRefuellingOffMoroccoJan1970.jpg"
   (distant side, 1970: forecastle guns, two masts, quarterdeck), "Obraztsovyy1982.jpg" (high bow
   quarter view of an unmodified Kashin: bow 76 mm and SA-N-1 on the forecastle, the long house, two
   casings with the aft tower and second lattice mast between them, aft SA-N-1 and aft 76 mm, a painted
   circle on the quarterdeck in 1982 - NOT drawn because the 1960s photographs here do not show it).
   NOT CONFIRMED: the torpedo mount position (placed from published weights); the Head Net / Big Net
   assignment is as the 1968 UH-2B photograph shows it (Head Net crowning the main mast, mesh dish
   on the second mast).
   NOT CONFIRMED and therefore not drawn: any helicopter pad or hangar (the
   as-built ship is not shown with one in 1960s photographs; the row says
   "pad" - the quarterdeck is left a bare flat deck, nothing marked on it),
   the Kashin-Mod fit (Ka-27, AK-630, SS-N-2), hull numbers.  The torpedo
   tube mount abaft the main mast, the RBU-6000 stations and the sonar dome
   size are placed from the profile and published weights, approximately.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The forward
   SA-N-1 launcher is the group named "turret"; everything else is baked.
   Every static part is merged into one mesh per material.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKashin = (function () {
  "use strict";
  var PI = Math.PI;
  var XA = -72.0, XB = 74.0;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-72.0, 6.20, 3.50, -1.30, 0.20, 0.62],
    [-68.0, 7.00, 3.55, -2.90, 0.20, 0.60],
    [-60.0, 7.60, 3.65, -4.20, 0.19, 0.56],
    [-45.0, 7.90, 3.85, -4.70, 0.18, 0.52],
    [-20.0, 7.90, 4.05, -4.80, 0.17, 0.50],
    [  0.0, 7.90, 4.20, -4.80, 0.17, 0.50],
    [ 18.0, 7.80, 4.50, -4.75, 0.18, 0.54],
    [ 30.0, 7.40, 5.20, -4.60, 0.22, 0.64],
    [ 42.0, 6.30, 6.00, -4.10, 0.30, 0.80],
    [ 52.0, 4.90, 6.75, -3.30, 0.40, 1.00],
    [ 63.0, 3.00, 7.40, -2.10, 0.55, 1.25],
    [ 71.0, 1.20, 7.85, -0.90, 0.75, 1.50],
    [ 74.0, 0.30, 8.05, -0.25, 0.85, 1.55]
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
      /* DoubleSide: rails, lattice bars and barrels are open thin tubes */
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(0x8a9399, plateTex(THREE, [18, 1.2]), 0.86),
      boot:  skin(0x0d0f11, plateTex(THREE, [18, 1]), 0.9),
      under: skin(0x180d0a, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(0x9aa3a9, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x5b6267, plateTex(THREE, [14, 1.5]), 0.95),
      dark:  skin(0x050607, plateTex(THREE, [2, 2]), 0.9),
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
  function bowRake(x, k) { return x > 50 ? k * Math.pow((x - 50) / 24, 1.6) : 0; }
  function hullSections(kind) {
    var A = [], i, XS = [];
    for (i = 0; i < 38; i++) XS.push(XA + (XB - XA) * (i / 37));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3);
      var xx = x - bowRake(x, kind === "low" ? 4.2 : 2.6);
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
    for (x = 52; x < x1 - 0.3; x += 1.5) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      x = xs[i]; var xo = x, k;
      for (k = 0; k < 4; k++) xo = x + bowRake(xo, 2.6);
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
    var xo = x, k; for (k = 0; k < 4; k++) xo = x + bowRake(xo, 2.6);
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

  /* twin 76 mm AK-726 in its enclosed oval shield, at rest pointing +X */
  function ak726(THREE, g, T) {
    cylZ(THREE, g, 1.55, 1.7, 0.7, 14, T.sup, 0, 0, 0.35);
    hexa(THREE, g, T.sup, [
      [-1.9, -1.55, 0.7], [1.5, -1.45, 0.7], [1.5, 1.45, 0.7], [-1.9, 1.55, 0.7],
      [-1.5, -1.2, 2.3], [1.0, -1.1, 2.1], [1.0, 1.1, 2.1], [-1.5, 1.2, 2.3]]);
    var s;
    box(THREE, g, 0.4, 2.4, 0.7, T.dark, 1.5, 0, 1.45);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.17, 0.17, 1.0, 8, T.gun, 1.7, s * 0.55, 1.5);
      cylX(THREE, g, 0.075, 0.075, 3.6, 8, T.gun, 3.6, s * 0.55, 1.5, true);
    }
    return g;
  }
  /* twin-arm SA-N-1 (M-1 Volna) launcher: base, trainer, two beam rails each
     with a V-600 missile, raised a few degrees; at rest pointing +X */
  function volna(THREE, g, T) {
    cylZ(THREE, g, 1.9, 2.1, 0.9, 16, T.sup, 0, 0, 0.45);
    hexa(THREE, g, T.sup, [
      [-1.8, -1.9, 0.9], [1.8, -1.9, 0.9], [1.8, 1.9, 0.9], [-1.8, 1.9, 0.9],
      [-1.4, -1.5, 2.0], [1.4, -1.5, 2.0], [1.4, 1.5, 2.0], [-1.4, 1.5, 2.0]]);
    box(THREE, g, 0.6, 3.6, 0.5, T.metal, 0.4, 0, 2.2);
    var arms = new THREE.Group(); arms.position.set(0.3, 0, 2.5); arms.rotation.y = -0.14;
    var s, k;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, arms, 7.2, 0.28, 0.32, T.metal, 2.2, s * 1.2, -0.05);
      box(THREE, arms, 0.4, 0.28, 0.9, T.metal, -1.0, s * 1.2, 0.2);
      cylX(THREE, arms, 0.27, 0.27, 5.0, 10, T.sup, 2.4, s * 1.2, 0.42);
      cylX(THREE, arms, 0.0, 0.27, 0.9, 10, T.sup, 5.35, s * 1.2, 0.42);
      for (k = 0; k < 4; k++) {
        var f = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.55), T.sup);
        f.position.set(0.6, s * 1.2, 0.42); f.rotation.x = k * PI / 2 + PI / 4;
        f.translateZ(0.3); arms.add(f);
      }
    }
    g.add(arms);
    return g;
  }
  /* RBU-6000: twelve-barrel ASW rocket launcher on a small trainer */
  function rbu(THREE, g, T) {
    var i, a;
    cylZ(THREE, g, 0.55, 0.65, 0.5, 10, T.sup, 0, 0, 0.25);
    box(THREE, g, 1.7, 1.9, 0.3, T.sup, 0, 0, 0.8);
    var cl = new THREE.Group(); cl.position.set(0.2, 0, 1.2); cl.rotation.y = -0.5;
    for (i = 0; i < 12; i++) {
      a = i * PI / 6;
      cylX(THREE, cl, 0.09, 0.09, 1.7, 6, T.gun, 0, Math.cos(a) * 0.58, Math.sin(a) * 0.3, true);
    }
    cylX(THREE, cl, 0.5, 0.5, 0.3, 10, T.dark, -0.7, 0, 0);
    g.add(cl);
    return g;
  }
  /* five-tube 533 mm mount, trained on the beam, at rest across the deck */
  function tubes5(THREE, g, T) {
    var P = [[0, 0.62], [-0.62, 0.2], [0.62, 0.2], [-0.4, -0.45], [0.4, -0.45]], i;
    cylZ(THREE, g, 1.0, 1.1, 0.4, 12, T.sup, 0, 0, 0.2);
    box(THREE, g, 2.0, 2.0, 0.3, T.sup, 0, 0, 0.55);
    for (i = 0; i < 5; i++) {
      cylY2(THREE, g, 0.28, 7.4, T.metal, P[i][0], 0, P[i][1] + 1.05);
      cylY2(THREE, g, 0.29, 0.25, T.dark, P[i][0], 3.7, P[i][1] + 1.05);
    }
    box(THREE, g, 2.4, 0.2, 0.15, T.gun, 0, 1.6, 0.8);
    box(THREE, g, 2.4, 0.2, 0.15, T.gun, 0, -1.6, 0.8);
    return g;
  }
  function cylY2(THREE, p, r, len, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12, 1, len > 1), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  /* quad of thin bars: curved Head Net (Top Sail-type bow-tie array) */
  function headNet(THREE, g, T, x, z) {
    var i, n = 9;
    for (i = 0; i < n; i++) {
      var f = i / (n - 1) * 2 - 1, y = f * 3.6, ang = f * 0.5;
      var b = box(THREE, g, 0.18, 0.5, 2.8, T.metal, x - 0.8 * f * f, y, z + 1.4);
      b.rotation.z = -ang * 0.4;
    }
    box(THREE, g, 0.2, 7.6, 0.14, T.metal, x - 0.1, 0, z + 0.05);
    box(THREE, g, 0.2, 7.6, 0.14, T.metal, x - 0.1, 0, z + 2.8);
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

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* hull: three coaxial shells, transom, deck */
    g.add(loftMesh(THREE, M, hullSections("top"), 22, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 14, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 20, T.under));
    tprism(THREE, g, 0.4, 12.4, 0.4, 11.6, 3.5, T.hull, -71.85, 0, 1.2);
    g.add(deckRibbon(THREE, T.deck, -71.8, 71.2));

    /* sonar dome under the forefoot */
    var dg = new THREE.SphereGeometry(1, 16, 10); dg.scale(4.6, 1.9, 1.7);
    var dm = new THREE.Mesh(dg, T.under); dm.position.set(55.5, 0, -3.3); g.add(dm);

    /* scuttles along the sides, hawse pipes */
    for (i = 0; i < 28; i++) {
      x = -64 + i * 3.8;
      for (s = -1; s <= 1; s += 2)
        box(THREE, g, 0.3, 0.05, 0.3, T.dark, x, s * (halfB(x) + 0.09), deckZ(x) - 1.3);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.55, 0.08, 0.55, T.dark, 56.5, s * (halfB(54.5) - 0.2), deckZ(56) - 1.2);

    /* long midship house, then the lower aft house */
    tprism(THREE, g, 65.0, 11.2, 63.6, 10.2, 2.9, T.sup, -1.5, 0, 5.45);
    tprism(THREE, g, 12.0, 10.4, 11.2, 9.6, 1.9, T.sup, -38.0, 0, 4.8);
    for (i = 0; i < 22; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.7, 0.05, 0.9, T.dark, -32 + i * 2.8, s * 5.28, 5.2);
    for (i = 0; i < 5; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.7, 0.05, 0.5, T.dark, -43 + i * 2.4, s * 5.1, 4.9);

    /* bridge block, wheelhouse, glass, wings */
    tprism(THREE, g, 14.0, 9.8, 12.6, 8.8, 3.3, T.sup, 24.0, 0, 8.55);
    tprism(THREE, g, 9.0, 8.0, 8.4, 7.4, 1.6, T.sup, 24.5, 0, 11.0);
    box(THREE, g, 0.1, 6.8, 0.8, T.glass, 28.95, 0, 11.0);
    box(THREE, g, 9.4, 0.1, 0.8, T.glass, 24.2, 0, 11.0);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.0, 0.1, 0.8, T.glass, 27.0, s * 3.95, 11.0);
      box(THREE, g, 3.0, 2.2, 0.16, T.sup, 26.5, s * 5.2, 9.8);
      box(THREE, g, 3.0, 0.1, 0.5, T.sup, 26.5, s * 6.2, 10.1);
      for (i = 0; i < 5; i++) box(THREE, g, 0.8, 0.05, 0.55, T.dark, 18.5 + i * 2.2, s * 4.98, 9.0);
    }
    box(THREE, g, 9.4, 8.4, 0.12, T.sup, 24.5, 0, 11.86);
    /* Peel Group director on the bridge roof (pedestal, drum, two dishes) */
    box(THREE, g, 1.4, 1.4, 1.2, T.sup, 27.0, 0, 12.5);
    cylZ(THREE, g, 0.9, 1.1, 0.9, 12, T.sup, 27.0, 0, 13.55);
    dish(THREE, g, T.metal, 0.95, 27.8, 1.2, 14.2, 0.2);
    dish(THREE, g, T.metal, 0.95, 27.8, -1.2, 14.2, 0.2);
    box(THREE, g, 0.3, 1.4, 0.1, T.metal, 26.3, 0, 14.4);
    /* small round director (Drum Tilt style housing) on the roof aft */
    cylZ(THREE, g, 0.8, 0.9, 1.0, 12, T.sup, 20.5, -2.6, 12.4);
    dish(THREE, g, T.metal, 0.8, 21.0, -2.6, 13.1, 0.3);

    /* two slanted uptake casings, each with its pair of angled stacks */
    casing(THREE, g, T.sup, -31.5, -20.5, 4.6, 3.8, 6.9, 12.0, 10.4, 1.0);
    casing(THREE, g, T.sup, 2.5, 10.0, 4.4, 3.6, 6.9, 12.2, 10.7, 0.9);
    [-26.0, 6.4].forEach(function (cx) {
      for (s = -1; s <= 1; s += 2) {
        var st = new THREE.Group(); st.position.set(cx - 1.2, s * 1.7, 11.0); st.rotation.y = 0.35; g.add(st);
        cylZ(THREE, st, 1.15, 1.35, 1.8, 14, T.sup, 0, 0, 0.9);
        cylZ(THREE, st, 1.0, 1.0, 0.1, 14, T.dark, 0, 0, 1.82);
      }
    });
    /* louvres on the casing sides */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      box(THREE, g, 1.0, 0.05, 1.6, T.dark, -29.5 + i * 2.5, s * 4.25, 8.8);
      box(THREE, g, 1.0, 0.05, 1.4, T.dark, 4.0 + i * 1.6, s * 4.05, 8.8);
    }

    /* aft tower with its director */
    tprism(THREE, g, 4.8, 4.2, 2.4, 2.6, 8.8, T.sup, -14.0, 0, 11.3);
    box(THREE, g, 3.0, 3.4, 0.16, T.metal, -14.0, 0, 15.8);
    cylZ(THREE, g, 0.8, 0.9, 1.0, 12, T.sup, -14.0, 0, 16.4);
    dish(THREE, g, T.metal, 1.0, -13.2, 0.0, 17.2, 0.1);
    strut(THREE, g, T.metal, -14.5, 0, 16.0, -14.5, 0, 20.0, 0.06, 4);
    box(THREE, g, 0.1, 2.4, 0.1, T.metal, -14.5, 0, 19.0);

    /* second lattice mast carrying the large mesh dish */
    lattice(THREE, g, T, 0.2, 1.7, 1.7, 0.7, 0.7, 6.9, 18.0, 5, 0.09);
    box(THREE, g, 2.2, 2.2, 0.12, T.metal, 0.2, 0, 18.0);
    strut(THREE, g, T.metal, 0.2, 0, 18.0, 0.2, 0, 22.0, 0.07, 4);
    box(THREE, g, 0.5, 0.5, 2.6, T.metal, 0.5, 0, 19.3);
    dish(THREE, g, T.metal, 2.8, 1.3, 0, 20.4, 0.55);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 0.4, 0, 19.0, 1.5, s * 1.6, 20.8, 0.025, 3);

    /* main lattice mast with Head Net crowning it */
    lattice(THREE, g, T, 13.6, 2.0, 2.2, 0.9, 0.9, 6.9, 16.5, 5, 0.1);
    lattice(THREE, g, T, 13.6, 0.9, 0.9, 0.5, 0.5, 16.5, 22.0, 3, 0.07);
    box(THREE, g, 3.6, 3.6, 0.12, T.metal, 13.6, 0, 16.5);
    box(THREE, g, 1.8, 2.0, 0.1, T.metal, 13.6, 0, 22.0);
    headNet(THREE, g, T, 13.6, 22.1);
    strut(THREE, g, T.metal, 13.6, 0, 22.0, 13.6, 0, 27.0, 0.05, 4);
    box(THREE, g, 0.1, 2.6, 0.1, T.metal, 13.6, 0, 25.0);
    box(THREE, g, 1.4, 0.15, 0.9, T.metal, 13.6, 2.2, 16.9);
    cylZ(THREE, g, 0.5, 0.5, 0.9, 10, T.sup, 14.6, -1.8, 17.0);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 13.6, 0, 26.5, 7.0, s * 1.0, 11.9, 0.012, 3);
      strut(THREE, g, T.metal, 13.6, 0, 26.5, 22.0, s * 1.0, 12.0, 0.012, 3);
    }

    /* torpedo tubes (five-tube mount) on the house roof, boats, rafts */
    var tt = new THREE.Group(); tt.position.set(-7.0, 0, 6.9); tt.rotation.z = -PI / 2;
    tubes5(THREE, tt, T); g.add(tt);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.0, 1.7, 0.8, T.sup, -18.5, s * 4.1, 7.4);
      tprism(THREE, g, 6.0, 1.7, 4.8, 1.2, 0.6, T.sup, -18.5, s * 4.1, 8.1);
      for (i = 0; i < 3; i++) cylX(THREE, g, 0.32, 0.32, 1.3, 12, T.metal, 17.0 + i * 1.5, s * 4.6, 8.6);
      for (i = 0; i < 6; i++) strut(THREE, g, T.metal, 19.0 + i * 1.8, s * 5.28, 4.8, 19.0 + i * 1.8, s * 5.28, 7.4, 0.03, 5);
    }
    /* forecastle: RBU-6000 pair, windlass, bollards */
    for (s = -1; s <= 1; s += 2) {
      var rb = new THREE.Group(); rb.position.set(34.5, s * 3.6, deckZ(34.5)); rbu(THREE, rb, T); g.add(rb);
    }
    cylZ(THREE, g, 0.6, 0.6, 0.7, 10, T.metal, 44.5, 0, deckZ(44.5) + 0.35);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, 36.0, s * 3.2, deckZ(36) + 0.25);
    box(THREE, g, 1.4, 0.5, 0.2, T.metal, 37.5, 0, deckZ(37.5) + 0.1);
    for (i = 0; i < 3; i++) strut(THREE, g, T.metal, -52 + i * 2.0, 0, 3.6, -52 + i * 2.0, 0, 4.5, 0.06, 4);

    /* guns and aft launcher */
    var bow = new THREE.Group(); bow.position.set(53.0, 0, deckZ(53.0)); ak726(THREE, bow, T); g.add(bow);
    var ag = new THREE.Group(); ag.position.set(-38.0, 0, 5.75); ag.rotation.z = PI; ak726(THREE, ag, T); g.add(ag);
    var al = new THREE.Group(); al.position.set(-49.0, 0, deckZ(-49.0)); al.rotation.z = PI; volna(THREE, al, T); g.add(al);

    /* underwater gear: two shafts on A-brackets, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.22, 0.22, 7.0, 8, T.metal, -65.5, s * 3.0, -2.2);
      strut(THREE, g, T.metal, -67.5, s * 3.0, -2.2, -67.5, s * 4.4, -0.8, 0.14, 4);
      cylX(THREE, g, 0.35, 0.5, 0.8, 8, T.metal, -69.2, s * 3.0, -2.2);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 1.2), T.metal);
        bl.position.set(-69.2, s * 3.0, -2.2); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.8); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.0, 0.2, 2.4, T.metal, -70.5, s * 1.0, -1.4);
    }

    railRun(THREE, g, T, -71.0, -54.0, 3.4, 1.0);
    railRun(THREE, g, T, -54.0, 45.0, 4.5, 1.0);
    railRun(THREE, g, T, 45.0, 67.0, 4.0, 1.0);

    /* team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -43.5, 0, 5.77);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 22.0, 0, 11.92);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -62.0, 0, deckZ(-62.0) + 0.06);

    /* trained mount: forward SA-N-1 launcher */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(40.0, 0, deckZ(40.0)); volna(THREE, tw, T);

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

UNIT_MODELS["pact_e60_destroyer"] = {
  len: 144,
  build: function (THREE, M, C) { return HeroKashin.build(THREE, M, C); }
};
