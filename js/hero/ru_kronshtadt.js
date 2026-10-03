/* ==================== js/hero/ru_kronshtadt.js =========================
   HERO MODEL -- Project 122bis "Kronshtadt" class large submarine chaser
   (BO-2 / SKA), 1950s.  Key: pact_e50_patrol.
   Length overall 51.8 m (en-wiki 52.24), beam 6.5 m (6.55), draught about 1.9 m, about 290 t.

   REFERENCES (what each feature rests on):
     - Commons "ORP Zawziety 1953.jpg" (Polish ship, port bow quarter, period
       photograph): flush deck with sheer rising to a flared raked stem; the
       85 mm gun on the forecastle well forward of the bridge; a squared
       two-tier bridge block with a roofed wheelhouse and a tall pole mast on
       its roof; a round funnel tower abaft the bridge; a long open waist
       with gun pedestals; a stern with depth-charge racks.  Stations of the
       bridge (about 32-52 % of the length from the bow) and gun (about 22 %)
       were scaled off it.
     - Commons "Project122bis-2007-Pashaliman.jpg" (Albanian ship in a
       mid-grey scheme): the bridge with an open flying bridge and wings, the
       roofed wheelhouse and the round funnel behind it, 37 mm mounts and a
       tarpaulin-covered tub in the waist, the pole mast with a short yard and
       a rotating radar antenna on the bridge roof, rails along the deck and
       the stern depth-charge rack.
     - Commons "Polski scigacz op proj.122bis dok.jpg" (in dock): the bow
       shape (deep flared stem, hawse, anchor pockets), the gun on the
       forecastle ahead of the bridge front, bridge window rows.
     - Commons "37mm 70-K proj.122bis.jpg": the twin 37 mm 70-K on the type.
     - Armament counts: 1 x 85 mm forward (facts.js and en-wiki: 52-K; the shield is a
       generic light one, no close photograph of the mount), 2 twin 37 mm
       (V-11/70-K style, 37mm photo; en-wiki lists 2 single 61-K - flagged),
       12.7 mm: 2 mounts of 3 barrels (en-wiki), drawn on the bridge wings,
       2 depth-charge rails and 2 BMB throwers, THREE shafts (3 diesels).
     - PAINT: mid grey hull and lighter superstructure as the Albanian and
       Polish photographs show; dark boot topping and anti-fouling.
   NOT CONFIRMED and therefore not drawn: any RBU or MBU rocket launcher (a
   later refit, not on the original 1950s ships), named radar fits beyond one
   generic rotating antenna, hull numbers.  The exact number and position of
   the 37 mm and 12.7 mm mounts, the depth-charge throwers and the single
   rudder layout are approximate.
   (Borrowed by pla_e50_patrol "Type 6604" only if render3d falls back to a
   same-category peer; this file registers pact_e50_patrol alone.)

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The forward
   85 mm gun is the group named "turret"; everything else is baked.
   Every static part is merged into one mesh per material.   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKronshtadt = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 51.8, XA = -25.9, XF = 25.9;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-25.9, 2.20, 2.30, -0.50, 0.20, 0.60],
    [-24.0, 2.80, 2.30, -1.20, 0.20, 0.58],
    [-20.0, 3.06, 2.28, -1.75, 0.18, 0.54],
    [-12.0, 3.20, 2.25, -1.90, 0.17, 0.50],
    [  0.0, 3.20, 2.25, -1.90, 0.17, 0.50],
    [  8.0, 3.20, 2.40, -1.88, 0.18, 0.54],
    [ 14.0, 3.00, 2.80, -1.75, 0.22, 0.62],
    [ 19.0, 2.55, 3.20, -1.50, 0.30, 0.80],
    [ 22.5, 1.80, 3.55, -1.00, 0.42, 1.00],
    [ 24.8, 0.95, 3.80, -0.50, 0.60, 1.20],
    [ 25.9, 0.30, 3.95, -0.20, 0.80, 1.40]
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
      hull:  skin(0x8d959a, plateTex(THREE, [14, 1.2]), 0.86),
      boot:  skin(0x0d0f11, plateTex(THREE, [14, 1]), 0.9),
      under: skin(0x180d0a, plateTex(THREE, [8, 2]), 0.9),
      sup:   skin(0x9ba3a8, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x6a7176, plateTex(THREE, [10, 1.5]), 0.95),
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
    for (i = 0; i < 36; i++) XS.push(XA + (XF - XA) * (i / 35));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3), rake = 0;
      if (kind !== "top" && x > 15) rake = (kind === "low" ? 1.6 : 0.9) * Math.pow((x - 15) / 11, 1.6);
      var xx = x - rake;
      if (kind === "top") A.push({ x: xx, w: w + 0.03, h: (dz - 0.5) / 2, zc: (dz + 0.3) / 2, sq: pick(x, 4) });
      else if (kind === "boot") A.push({ x: xx, w: w + 0.03, h: 0.35, zc: 0.22, sq: 0.17 });
      else A.push({ x: xx, w: w, h: (0.12 - kz) / 2, zc: (0.12 + kz) / 2, sq: pick(x, 5) });
    }
    return A;
  }
  function bowRake(x) { return x > 15 ? 0.9 * Math.pow((x - 15) / 11, 1.6) : 0; }
  function deckRibbon(THREE, m, x0, x1) {
    var xs = [x0, x1], i, j, NC = 3, pos = [], uv = [], idx = [], x;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.3 && STA[i][0] < x1 - 0.3) xs.push(STA[i][0]);
    for (x = 15.5; x < x1 - 0.3; x += 1.0) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
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
  /* 85 mm 90-K on its pedestal with a light shield, at rest pointing +X */
  function k85(THREE, g, T) {
    cylZ(THREE, g, 0.95, 1.05, 0.5, 14, T.sup, 0, 0, 0.25);
    cylZ(THREE, g, 0.7, 0.8, 0.5, 12, T.gun, 0, 0, 0.7);
    tprism(THREE, g, 1.6, 1.9, 1.3, 1.6, 1.1, T.sup, -0.05, 0, 1.3);
    box(THREE, g, 0.4, 0.8, 0.5, T.dark, 0.7, 0, 1.4);
    cylX(THREE, g, 0.17, 0.17, 1.2, 8, T.gun, 1.2, 0, 1.4);
    cylX(THREE, g, 0.07, 0.07, 4.2, 8, T.gun, 3.3, 0, 1.4, true);
    cylX(THREE, g, 0.1, 0.1, 0.3, 8, T.gun, 5.35, 0, 1.4);
    box(THREE, g, 0.6, 0.5, 0.5, T.gun, -1.0, 0, 1.2);
    return g;
  }
  /* twin 37 mm 70-K */
  function k37(THREE, g, T) {
    cylZ(THREE, g, 0.34, 0.42, 0.8, 10, T.sup, 0, 0, 0.4);
    tprism(THREE, g, 1.3, 1.5, 1.0, 1.2, 0.8, T.sup, 0, 0, 1.2);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.04, 0.04, 2.0, 6, T.gun, 1.3, s * 0.27, 1.3, true);
      cylX(THREE, g, 0.065, 0.065, 0.3, 6, T.gun, 0.45, s * 0.27, 1.3);
    }
    box(THREE, g, 0.12, 0.7, 0.5, T.gun, -0.7, 0, 1.3);
    return g;
  }
  /* twin 12.7 mm */
  function dshk(THREE, g, T) {
    cylZ(THREE, g, 0.1, 0.14, 0.6, 8, T.gun, 0, 0, 0.3);
    box(THREE, g, 0.4, 0.55, 0.3, T.gun, 0, 0, 0.7);
    var s;
    for (s = -1; s <= 1; s++) cylX(THREE, g, 0.025, 0.025, 1.1, 5, T.gun, 0.6, s * 0.14, 0.8, true);
    return g;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z, q;

    /* hull: three coaxial shells, transom */
    g.add(loftMesh(THREE, M, hullSections("top"), 36, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 20, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 26, T.under));
    tprism(THREE, g, 0.3, 4.2, 0.3, 4.0, 2.4, T.hull, -25.75, 0, 0.9);
    g.add(deckRibbon(THREE, T.deck, -25.7, 25.0));

    /* scuttles and hawse pipes */
    for (i = 0; i < 12; i++) {
      x = -18 + i * 2.6;
      for (s = -1; s <= 1; s += 2) box(THREE, g, 0.22, 0.05, 0.22, T.dark, x, s * (halfB(x) + 0.04), 1.6);
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.4, 0.06, 0.4, T.dark, 21.0, s * (halfB(21.0) + 0.0), 2.6);
      cylX(THREE, g, 0.15, 0.2, 0.5, 8, T.metal, 21.4, s * (halfB(21.4) - 0.1), 2.3);
    }

    /* bridge: lower house, wheelhouse, flying bridge */
    tprism(THREE, g, 9.6, 5.5, 8.8, 5.0, 2.5, T.sup, 4.0, 0, 3.55);
    for (i = 0; i < 5; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.5, 0.05, 0.4, T.dark, 0.0 + i * 1.7, s * 2.62, 3.7);
    tprism(THREE, g, 5.4, 4.4, 4.8, 3.9, 1.9, T.sup, 5.6, 0, 5.75);
    box(THREE, g, 0.1, 4.0, 0.55, T.glass, 8.3, 0, 5.85);
    for (i = 0; i < 6; i++) box(THREE, g, 0.07, 0.38, 0.38, T.dark, 8.32, -1.7 + i * 0.68, 5.55);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.4, 0.1, 0.5, T.glass, 5.8, s * 2.17, 5.85);
      box(THREE, g, 1.8, 0.9, 0.12, T.sup, 5.6, s * 2.78, 4.95);   /* bridge wing */
      for (i = 0; i < 3; i++) box(THREE, g, 0.4, 0.05, 0.35, T.dark, 4.0 + i * 1.2, s * 2.3, 6.0);
    }
    box(THREE, g, 5.8, 4.8, 0.1, T.sup, 5.6, 0, 6.75);
    box(THREE, g, 2.8, 0.06, 0.55, T.metal, 7.4, 0, 7.05);          /* flying-bridge screen */
    cylZ(THREE, g, 0.3, 0.3, 0.45, 10, T.sup, 7.3, 1.2, 7.05);      /* compass / lamp */
    cylZ(THREE, g, 0.28, 0.28, 0.4, 10, T.sup, 7.3, -1.2, 7.05);

    /* funnel: round tower abaft the bridge, leaning aft */
    var fg = new THREE.Group(); fg.position.set(-2.1, 0, 2.3); fg.rotation.y = -0.1; g.add(fg);
    var ft = cylZ(THREE, fg, 1.25, 1.55, 4.4, 18, T.sup, 0, 0, 2.2); ft.scale.y = 0.85;
    var fc = cylZ(THREE, fg, 1.3, 1.3, 0.15, 18, T.dark, 0, 0, 4.45); fc.scale.y = 0.85;
    box(THREE, fg, 0.12, 2.4, 0.12, T.metal, 0, 0, 4.1);
    for (s = -1; s <= 1; s += 2) cylX(THREE, fg, 0.28, 0.28, 0.9, 10, T.metal, 0.2, s * 1.35, 1.5);

    /* pole mast on the wheelhouse roof, yard, radar, stays */
    var mx = 3.4, zb = 6.8, zt = 17.5;
    strut(THREE, g, T.metal, mx, 0, zb, mx, 0, zt, 0.09, 6);
    [[-0.6, -0.9], [-0.6, 0.9], [0.9, 0]].forEach(function (p) {
      strut(THREE, g, T.metal, mx + p[0], p[1], zb, mx, 0, zb + 6.0, 0.04, 4);
    });
    box(THREE, g, 0.1, 3.2, 0.08, T.metal, mx, 0, 14.2);
    strut(THREE, g, T.metal, mx, 0, zt, mx - 4.6, 0, 7.6, 0.012, 3);
    strut(THREE, g, T.metal, mx, 0, zt - 0.6, mx + 4.6, 0, 7.6, 0.012, 3);
    box(THREE, g, 1.0, 1.0, 0.1, T.metal, mx, 0, 10.4);
    cylZ(THREE, g, 0.18, 0.25, 0.5, 8, T.sup, mx, 0, 10.75);
    box(THREE, g, 0.25, 1.9, 0.9, T.metal, mx, 0, 11.4);            /* rotating antenna */
    box(THREE, g, 0.1, 0.1, 0.5, T.metal, mx, 0, zt + 0.25);

    /* waist: two twin 37 mm, aft deckhouse with 12.7 mm, tub */
    [-10.5, -16.0].forEach(function (px) {
      var k = new THREE.Group(); k.position.set(px, 0, deckZ(px)); k37(THREE, k, T); g.add(k);
    });
    tprism(THREE, g, 3.6, 3.8, 3.2, 3.4, 1.3, T.sup, -18.5, 0, 2.9);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++)
      box(THREE, g, 0.4, 0.05, 0.4, T.dark, -19.2 + i * 1.4, s * 1.9, 2.9);
    for (s = -1; s <= 1; s += 2) {
      var d2 = new THREE.Group(); d2.position.set(5.0, s * 2.78, 5.1); dshk(THREE, d2, T); g.add(d2);
    }
    cylZ(THREE, g, 0.6, 0.6, 0.55, 12, T.metal, -3.5, 0, deckZ(-3.5) + 0.3);
    box(THREE, g, 2.2, 1.4, 0.5, T.deck, -10.4, 0.0, deckZ(-10.4) + 0.3);   /* tarpaulin hatch cover */

    /* life rafts, ventilators, ladders, deck gear */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) cylX(THREE, g, 0.3, 0.3, 1.2, 10, T.metal, -6.0 + i * 1.5, s * 2.5, 2.7);
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, -0.5 + i * 0.9, s * 2.78, 2.3, -0.5 + i * 0.9, s * 2.78, 3.0, 0.03, 4);
    }
    [[-15.0, 2.3], [-15.0, -2.3], [-4.5, 2.4], [-4.5, -2.4]].forEach(function (p) {
      cylZ(THREE, g, 0.2, 0.26, 0.7, 10, T.sup, p[0], p[1], deckZ(p[0]) + 0.35);
      cylZ(THREE, g, 0.32, 0.2, 0.28, 10, T.dark, p[0], p[1], deckZ(p[0]) + 0.84);
    });
    cylZ(THREE, g, 0.4, 0.4, 0.5, 10, T.metal, 21.5, 0, deckZ(21.5) + 0.25);   /* windlass */
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.14, 0.14, 0.4, 6, T.metal, 17.5, s * 1.8, deckZ(17.5) + 0.2);

    /* stern: depth-charge racks and throwers */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.2, 0.4, 0.14, T.metal, -23.4, s * 1.1, 2.4);
      for (i = 0; i < 6; i++) cylY(THREE, g, T.gun, -25.1 + i * 0.7, s * 1.1, 2.68);
      cylZ(THREE, g, 0.17, 0.17, 0.5, 8, T.gun, -21.2, s * 2.3, deckZ(-21.2) + 0.3);
    }

    /* rails */
    railRun(THREE, g, T, -25.0, -10.0, 2.5, 0.9);
    railRun(THREE, g, T, -3.0, 10.0, 2.6, 0.9);
    railRun(THREE, g, T, 10.5, 24.0, 2.7, 0.9);

    /* underwater gear: twin shafts, props, rudder */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.12, 0.12, 3.2, 8, T.metal, -24.0, s * 1.5, -1.3);
      strut(THREE, g, T.metal, -25.0, s * 1.5, -1.3, -25.0, s * 2.1, -0.4, 0.08, 4);
      cylX(THREE, g, 0.2, 0.3, 0.5, 8, T.metal, -25.7, s * 1.5, -1.3);
      for (i = 0; i < 3; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.65), T.metal);
        bl.position.set(-25.7, s * 1.5, -1.3); bl.rotation.x = i * 2 * PI / 3 + 0.35;
        bl.translateZ(0.42); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    cylX(THREE, g, 0.12, 0.12, 2.6, 8, T.metal, -23.6, 0, -1.3);
    cylX(THREE, g, 0.2, 0.3, 0.5, 8, T.metal, -25.0, 0, -1.3);
    for (i = 0; i < 3; i++) {
      var bc = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.65), T.metal);
      bc.position.set(-25.0, 0, -1.3); bc.rotation.x = i * 2 * PI / 3 + 0.35;
      bc.translateZ(0.42); bc.rotation.y = 0.45; g.add(bc);
    }
    box(THREE, g, 1.0, 0.16, 1.5, T.metal, -25.6, 0, -0.9);

    /* team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.8, 0.7, 0.04, T.team, 5.6, 0, 6.82);
    box(THREE, g, 1.6, 0.7, 0.04, T.team, -18.5, 0, 3.57);
    box(THREE, g, 1.6, 0.7, 0.04, T.team, 9.8, 0, deckZ(9.8) + 0.06);

    /* trained mount: 85 mm */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(14.0, 0, deckZ(14.0)); k85(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g, []);
    var tb = bake(THREE, tw, []);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  function cylY(THREE, p, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.5, 8), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e50_patrol"] = {
  len: 51.8,
  build: function (THREE, M, C) { return HeroKronshtadt.build(THREE, M, C); }
};
