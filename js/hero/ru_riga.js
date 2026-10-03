/* ==================== js/hero/ru_riga.js ===============================
   HERO MODEL -- Project 50 "Riga" class patrol escort (SKR), 1950s.
   Key: pact_e50_corvette.  Length overall 91.5 m, beam 10.2 m, draught 3.2 m.

   REFERENCES (what each feature rests on):
     - Commons "Riga-class frigate profile 1988.png" (recognition profile):
       flush deck with sheer rising to a raked stem, two 100 mm forward with
       the after one raised, tall bridge block, raked funnel, tripod-and-pole
       mast with one rotating air-search antenna, triple torpedo tubes
       between funnel and aft house, aft deckhouse, one 100 mm aft. Stations
       were scaled off that profile.
     - Commons "Soviet Riga class frigate.JPEG" (aerial port/starboard
       photograph): director drum on the bridge roof, boat abaft the bridge,
       aft deckhouse with a round-shielded gun on its roof, stern gun.
     - Armament counts (3 x 100 mm B-34, 4 x 37 mm in two twins, 3 x 533 mm
       tubes, two depth-charge racks) are the published figures.
     - Commons "Soviet frigate SKR-61 underway in the 1970s.jpg", "SH-3D of
       HS-4 over Soviet Riga class frigate 1971.jpg" and a 1983 USN photo
       of Riga 369: station of the mast (aft of the bridge), funnel (aft of
       the mast), boat, tubes abaft the funnel, aft house and the low aft
       gun; no ASW rocket launcher is visible on the 1970s photographs.
       Pre-1965 photographs of a Riga were NOT found on Commons, so the
       layout rests on 1970s ships and the 1988 recognition profile.
     - PAINT: mid-to-light grey hull and lighter superstructure as the 1953
       Sverdlov (Coronation Review) and 1970s Riga photographs show; boot
       topping and anti-fouling kept dark.
   NOT CONFIRMED and therefore not drawn: ASW rocket launchers (a later
   refit, not shown on the 1950s profile), named radar fits beyond a generic
   rotating air-search antenna and a roof director, hull numbers. Positions
   of the two 37 mm twins, the single rudder and the shaft layout are
   approximate. The 1980s photo is of a refitted ship; only its layout was used.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. The forward
   100 mm mount is the group named "turret"; everything else is baked.
   Every static part is merged into one mesh per material.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRiga = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 91.5;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-45.7, 3.40, 2.70, -0.80, 0.20, 0.62],
    [-43.0, 4.20, 2.70, -2.00, 0.20, 0.60],
    [-38.0, 4.70, 2.70, -2.90, 0.19, 0.56],
    [-30.0, 5.00, 2.66, -3.30, 0.18, 0.52],
    [-15.0, 5.10, 2.60, -3.40, 0.17, 0.50],
    [  0.0, 5.10, 2.60, -3.40, 0.17, 0.50],
    [ 15.0, 5.00, 3.00, -3.35, 0.18, 0.54],
    [ 25.0, 4.60, 3.60, -3.10, 0.22, 0.64],
    [ 33.0, 3.80, 4.20, -2.60, 0.30, 0.82],
    [ 39.0, 2.80, 4.80, -1.90, 0.42, 1.04],
    [ 43.0, 1.60, 5.30, -1.00, 0.60, 1.30],
    [ 45.3, 0.50, 5.60, -0.30, 0.80, 1.50]
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
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  skin(0x737c83, plateTex(THREE, [14, 1.2]), 0.86),
      boot:  skin(0x0d0f11, plateTex(THREE, [14, 1]), 0.9),
      under: skin(0x180d0a, plateTex(THREE, [8, 2]), 0.9),
      sup:   skin(0x838c93, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x4a5055, plateTex(THREE, [10, 1.5]), 0.95),
      dark:  skin(0x050607, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x555b61, 0.52, 0.55),
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
  function hullSections(kind) {
    var A = [], i, XS = [];
    for (i = 0; i < 40; i++) XS.push(-45.7 + 91.0 * Math.pow(i / 39, 1.0) + (i > 30 ? 0 : 0));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3), s = [0, 0, 0, 0, pick(x, 4), pick(x, 5)], rake = 0;
      if (kind !== "top" && x > 26)
        rake = (kind === "low" ? 2.5 : 1.6) * Math.pow((x - 26) / 20, 1.6);
      var xx = x - rake;
      if (kind === "top")
        A.push({ x: xx, w: w + 0.06, h: (dz - 0.7) / 2, zc: (dz + 0.5) / 2, sq: s[4] }); /* top 0.1 m under the deck ribbon: no z-fighting */
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.03, h: 0.45, zc: 0.30, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.12 - kz) / 2, zc: (0.12 + kz) / 2, sq: s[5] });
    }
    return A;
  }
  function bowRake(x) { return x > 26 ? 1.6 * Math.pow((x - 26) / 20, 1.6) : 0; }
  function deckRibbon(THREE, m, x0, x1) {
    var xs = [x0, x1], i, j, NC = 3, pos = [], uv = [], idx = [], x;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.3 && STA[i][0] < x1 - 0.3) xs.push(STA[i][0]);
    for (x = 28.5; x < x1 - 0.3; x += 1.0) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      /* the bow rake shifts the hull top aft: find the station that sits under world x */
      x = xs[i]; var xo = x, k;
      for (k = 0; k < 4; k++) xo = x + bowRake(xo);
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
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * (halfB(x) - 0.2); z = deckZ(x) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
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

  /* ------------------------------------------------------------- weapons */
  /* 100 mm B-34 in the USM-A enclosed shield, at rest pointing +X */
  function b34(THREE, g, T) {
    cylZ(THREE, g, 1.45, 1.55, 0.6, 14, T.sup, 0, 0, 0.3);
    tprism(THREE, g, 3.2, 3.0, 2.5, 2.5, 1.5, T.sup, -0.1, 0, 1.35);
    tprism(THREE, g, 1.3, 2.4, 1.0, 2.0, 1.2, T.sup, -1.7, 0, 1.35);
    box(THREE, g, 0.5, 1.0, 0.8, T.dark, 1.5, 0, 1.6);
    cylX(THREE, g, 0.20, 0.20, 1.5, 8, T.gun, 2.3, 0, 1.6);
    cylX(THREE, g, 0.105, 0.105, 4.0, 8, T.gun, 4.2, 0, 1.6, true);
    return g;
  }
  /* twin 37 mm 70-K, trained forward */
  function k37(THREE, g, T) {
    cylZ(THREE, g, 0.38, 0.45, 0.9, 10, T.sup, 0, 0, 0.45);
    tprism(THREE, g, 1.5, 1.7, 1.2, 1.4, 0.9, T.sup, 0, 0, 1.35);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.045, 0.045, 2.2, 6, T.gun, 1.5, s * 0.30, 1.45, true);
      cylX(THREE, g, 0.07, 0.07, 0.35, 6, T.gun, 0.5, s * 0.30, 1.45);
    }
    return g;
  }
  function tubes(THREE, g, T) {
    var P = [[-0.62, 1.0], [0.62, 1.0], [0, 1.58]], i, k;
    cylZ(THREE, g, 1.0, 1.1, 0.6, 12, T.sup, 0, 0, 0.3);
    box(THREE, g, 1.4, 2.2, 0.25, T.sup, 0, 0, 0.72);
    for (i = 0; i < 3; i++) {
      cylX(THREE, g, 0.30, 0.30, 7.4, 16, T.metal, 0, P[i][0], P[i][1] + 0.1, true);
      cylX(THREE, g, 0.31, 0.31, 0.25, 10, T.dark, 3.7, P[i][0], P[i][1] + 0.1);
    }
    for (k = -1; k <= 1; k++) box(THREE, g, 0.18, 1.8, 0.14, T.gun, k * 2.4, 0, 1.0);
    return g;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* hull: three coaxial shells, transom */
    g.add(loftMesh(THREE, M, hullSections("top"), 40, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 24, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 30, T.under));
    tprism(THREE, g, 0.4, 7.0, 0.4, 6.6, 3.5, T.hull, -45.55, 0, 1.0);
    g.add(deckRibbon(THREE, T.deck, -45.5, 43.6));

    /* scuttles along the sides */
    for (i = 0; i < 18; i++) {
      x = -33 + i * 3.6;
      for (s = -1; s <= 1; s += 2)
        box(THREE, g, 0.28, 0.05, 0.28, T.dark, x, s * (halfB(x) + 0.09), 1.7);
    }
    /* hawse pipes */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.5, 0.08, 0.5, T.dark, 41.0, s * (halfB(41) + 0.0), 3.4);

    /* aft deckhouse and its two twin 37 mm */
    tprism(THREE, g, 7.4, 5.4, 6.6, 4.6, 3.4, T.sup, -20.8, 0, 4.3);
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.05, 0.5, 1.1, T.dark, -20.8 + (i - 1.5) * 1.6, s * 2.72, 4.2);
    strut(THREE, g, T.metal, -22.5, 0, 6.0, -22.5, 0, 8.0, 0.07, 4);
    box(THREE, g, 1.6, 0.12, 1.4, T.deck, -19.0, 0, 6.06);
    for (s = -1; s <= 1; s += 2) {
      var k = new THREE.Group(); k.position.set(-20.8, s * 1.5, 6.0); k37(THREE, k, T); g.add(k);
    }

    /* torpedo tubes between the aft house and the funnel */
    var tt = new THREE.Group(); tt.position.set(-12.6, 0, deckZ(-12.6)); tubes(THREE, tt, T); g.add(tt);

    /* main house under funnel and mast */
    tprism(THREE, g, 11.0, 6.8, 10.2, 6.2, 3.4, T.sup, -3.5, 0, 4.3);
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.6, 0.05, 0.45, T.dark, -7.5 + i * 1.7, s * 3.35, 4.0);

    /* funnel: oval stack leaning aft */
    var fg = new THREE.Group(); fg.position.set(-5.3, 0, 6.0); fg.rotation.y = -0.15; g.add(fg);
    tprism(THREE, fg, 5.8, 4.2, 4.8, 3.4, 4.6, T.sup, 0, 0, 2.3);
    tprism(THREE, fg, 4.9, 3.5, 4.9, 3.5, 0.15, T.dark, 0, 0, 4.65);
    box(THREE, fg, 4.0, 0.12, 1.0, T.metal, 0, 0, 5.2).rotation.y = 0;

    /* bridge block, wheelhouse, glass, wings */
    tprism(THREE, g, 10.5, 7.2, 9.4, 6.4, 5.6, T.sup, 7.25, 0, 5.4);
    tprism(THREE, g, 5.8, 5.4, 5.4, 5.0, 1.3, T.sup, 7.2, 0, 8.85);
    box(THREE, g, 0.1, 4.8, 0.7, T.glass, 10.15, 0, 8.9);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.4, 0.1, 0.65, T.glass, 7.5, s * 2.72, 8.9);
      box(THREE, g, 2.4, 1.8, 0.14, T.sup, 9.4, s * 4.1, 8.1);
      box(THREE, g, 2.4, 0.1, 0.5, T.sup, 9.4, s * 5.0, 8.4);
      for (i = 0; i < 5; i++) box(THREE, g, 0.55, 0.05, 0.42, T.dark, 3.5 + i * 1.7, s * 3.66, 5.8);
    }
    box(THREE, g, 5.8, 5.4, 0.12, T.sup, 7.2, 0, 9.56);
    /* roof director: drum, dome, dish */
    cylZ(THREE, g, 1.1, 1.3, 1.1, 14, T.sup, 6.2, 0, 10.2);
    var dg = new THREE.SphereGeometry(1.0, 16, 6, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2);
    var dome = new THREE.Mesh(dg, T.sup); dome.position.set(6.2, 0, 10.75); g.add(dome);
    box(THREE, g, 0.2, 2.0, 1.4, T.metal, 7.3, 0, 11.2, -0.25);

    /* tripod-and-pole mast */
    var mx = -0.5, zb = 6.0, zt = 13.4;
    [[-2.6, -1.7], [-2.6, 1.7], [1.6, -1.7], [1.6, 1.7]].forEach(function (p) {
      strut(THREE, g, T.metal, p[0], p[1], zb, mx + (p[0] < 0 ? -0.3 : 0.3), p[1] * 0.15, zt, 0.07, 4);
    });
    [0.25, 0.5, 0.75].forEach(function (f) {
      var zz = zb + (zt - zb) * f, k = 1 - f * 0.85, xa = mx - 2.1 * k - 0.1, xb = mx + 2.1 * k + 0.1;
      strut(THREE, g, T.metal, xa, -1.7 * k, zz, xb, -1.7 * k, zz, 0.04, 3);
      strut(THREE, g, T.metal, xa, 1.7 * k, zz, xb, 1.7 * k, zz, 0.04, 3);
      strut(THREE, g, T.metal, xa, -1.7 * k, zz, xa, 1.7 * k, zz, 0.04, 3);
      strut(THREE, g, T.metal, xb, -1.7 * k, zz, xb, 1.7 * k, zz, 0.04, 3);
    });
    strut(THREE, g, T.metal, -2.6, -1.7, zb, 1.6, 1.7, zb + 3.7, 0.035, 3);
    strut(THREE, g, T.metal, 1.6, -1.7, zb, -2.6, 1.7, zb + 3.7, 0.035, 3);
    box(THREE, g, 1.8, 1.8, 0.1, T.metal, mx, 0, zt);
    strut(THREE, g, T.metal, mx, 0, zt, mx, 0, 23.0, 0.09, 6);
    cylZ(THREE, g, 0.2, 0.3, 0.7, 8, T.sup, mx, 0, zt + 0.5);
    box(THREE, g, 0.25, 3.4, 1.3, T.metal, mx, 0, zt + 1.7);
    box(THREE, g, 0.1, 3.6, 0.1, T.metal, mx, 0, 19.0);
    strut(THREE, g, T.metal, mx, 0, 21.0, mx - 3.5, 0, 14.5, 0.012, 3);
    strut(THREE, g, T.metal, mx, 0, 21.0, mx + 3.5, 0, 14.5, 0.012, 3);

    /* B boat on the starboard side abaft the bridge */
    box(THREE, g, 5.0, 1.4, 0.7, T.sup, -2.0, -4.0, deckZ(-2) + 0.55);
    tprism(THREE, g, 5.0, 1.4, 4.2, 1.1, 0.5, T.sup, -2.0, -4.0, deckZ(-2) + 1.15);

    /* ventilators, life rafts, signal lamps, ladders */
    [[-14.5, 3.6], [-14.5, -3.6], [-9.5, 3.3], [-9.5, -3.3]].forEach(function (q) {
      cylZ(THREE, g, 0.28, 0.34, 0.9, 12, T.sup, q[0], q[1], deckZ(q[0]) + 0.45);
      cylZ(THREE, g, 0.42, 0.28, 0.35, 12, T.dark, q[0], q[1], deckZ(q[0]) + 1.05);
    });
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) cylX(THREE, g, 0.32, 0.32, 1.3, 12, T.metal, -6.0 + i * 1.5, s * 2.8, 6.55);
      cylX(THREE, g, 0.08, 0.08, 5.0, 8, T.metal, 7.0, s * 3.9, 3.9, true);
      for (i = 0; i < 6; i++) strut(THREE, g, T.metal, 3.5 + i * 1.0, s * 3.62, 2.7, 3.5 + i * 1.0, s * 3.62, 5.4, 0.03, 5);
      cylZ(THREE, g, 0.16, 0.16, 0.5, 10, T.metal, 9.0, s * 4.6, 8.9);
    }
    for (i = 0; i < 8; i++) box(THREE, g, 0.07, 0.1, 5.1, T.metal, 4.8 + i * 0.7, 0, 8.9);
    for (i = 0; i < 6; i++) {
      strut(THREE, g, T.metal, 11.4, -2.2 + i * 0.9, 5.4, 11.4, -2.2 + i * 0.9, 8.9, 0.03, 5);
    }
    for (i = 0; i < 4; i++) cylX(THREE, g, 0.45, 0.45, 0.3, 14, T.dark, -3.0 + i * 1.7, 0, 6.2);
    /* windlass, forecastle fittings */
    cylZ(THREE, g, 0.5, 0.5, 0.6, 10, T.metal, 35.5, 0, deckZ(35.5) + 0.3);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 31, s * 2.0, deckZ(31) + 0.25);

    /* two depth-charge racks, stern */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.4, 0.5, 0.18, T.metal, -41.2, s * 1.6, 2.85);
      for (i = 0; i < 5; i++) cylY(THREE, g, T.gun, -42.6 + i * 0.7, s * 1.6, 3.15);
    }

    /* after 100 mm, trained aft */
    var aft = new THREE.Group(); aft.position.set(-32.0, 0, deckZ(-32.0)); aft.rotation.z = PI;
    b34(THREE, aft, T); g.add(aft);
    /* B gun on its plinth */
    var bg = new THREE.Group(); bg.position.set(19.0, 0, deckZ(19.0));
    cylZ(THREE, bg, 2.2, 2.4, 0.9, 14, T.sup, 0, 0, 0.45);
    var bb = new THREE.Group(); bb.position.z = 0.9; b34(THREE, bb, T); bg.add(bb); g.add(bg);

    /* underwater gear */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.2, 0.2, 5.0, 8, T.metal, -42.0, s * 1.9, -1.8);
      strut(THREE, g, T.metal, -43.8, s * 1.9, -1.8, -43.8, s * 3.0, -0.6, 0.12, 4);
      cylX(THREE, g, 0.3, 0.45, 0.7, 8, T.metal, -44.8, s * 1.9, -1.8);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 1.0), T.metal);
        bl.position.set(-44.8, s * 1.9, -1.8); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.7); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    box(THREE, g, 1.8, 0.22, 2.0, T.metal, -45.0, 0, -1.3);

    railRun(THREE, g, T, -44.5, -35.0, 3.2, 1.0);
    railRun(THREE, g, T, -9.0, 28.0, 3.4, 1.0);
    railRun(THREE, g, T, 29.0, 43.0, 3.5, 1.0);

    /* team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -22.0, 0, 6.14);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 8.6, 0, 9.64);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -37.0, 0, 2.76);

    /* trained mount: forward 100 mm */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(27.0, 0, deckZ(27.0)); b34(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g, []);
    var tb = bake(THREE, tw, []);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  function cylY(THREE, p, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.6, 8), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e50_corvette"] = {
  len: 91.5,
  build: function (THREE, M, C) { return HeroRiga.build(THREE, M, C); }
};
