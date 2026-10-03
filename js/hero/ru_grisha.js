/* ==================== js/hero/ru_grisha.js ===============================
   HERO MODEL -- Project 1124 "Grisha" small anti-submarine ship (MPK), two rows.
   Keys: pact_e60_corvette (Grisha I) and pact_e90_corvette (Grisha V, 1124M).
   Length overall 71.2 m; beam 9.8 m (e60 row) / 10.2 m (e90 row) as
   js/warship_specs.js gives them; draught about 3.7 m.

   REFERENCES (what each feature rests on):
     - Commons "Grisha-class corvette profile 1987.png" (recognition profile,
       Grisha I / II / III): short hull, raised forecastle over about the
       forward two thirds with a steep break to a low quarterdeck, bridge
       block with a stout mast, funnel behind it, the after house and a round
       gun shield at the stern on Grisha I and III. Stations scaled off it.
     - Commons "Corvette Grisha I.jpg" (aerial, ship 061), "Project1124-1983-5.jpg"
       (Grisha III, 194): the round SA-N-4 hatch on the forecastle, the pair
       of RBU-6000 launchers abaft it, bridge block with raft canisters on its
       side, torpedo tubes on the quarterdeck beside the house, the after house
       with a dome and a mast pole, the shielded 57 mm twin at the stern.
       The darker band aft in the B&W prints is shadow, not paint.
     - Commons "Corvette Grisha V.jpg" (071) and "Project1124M-1990-1.jpg"
       (374, colour): the Grisha V keeps the SA-N-4 hatch and RBU-6000s, has
       a rounded long-barrelled turret (the 76 mm AK-176) at the STERN, not
       forward, and an AK-630 with its fire-control drum on the after house;
       the mast carries a slab radar on a pole with an aft lattice.
     - Armament counts are the published figures: Grisha I: 1 x SA-N-4 twin
       launcher, 2 x RBU-6000, 1 x twin 57 mm AK-725 aft, 2 x twin 533 mm
       tubes; Grisha V: the same with a 76 mm AK-176 aft and an AK-630.
     - PAINT: light grey topsides and house (the 1990 colour print), dark grey
       boot and anti-fouling; Grisha V in blue-grey (bluegrey row camo).
     - FIXES (check pass): one hull colour (Suzdalets 071 colour photos show
       no two-tone hull); raked and flared stem sheared in after lofting;
       boats and depth charge racks not in any reference, not drawn.
   NOT CONFIRMED and therefore not drawn: named radar fits beyond a generic
   slab radar on the mast, boats, depth charge racks, the sonar dome, hull
   numbers. The e90 row's warship_specs entry says gunPos "fore" but the
   photographs put the 76 mm aft (reported as a data problem). The position of
   the funnel, the rafts and the minor fittings is approximate.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. The stern
   gun (57 mm on the Grisha I, 76 mm on the Grisha V) is the group named
   "turret"; everything else is baked, one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGrisha = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 71.2;
  var BEAM = 9.8;   /* hull table is for 9.8 m; build() rescales */

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-35.6, 3.30, 2.30, -1.00, 0.20, 0.62],
    [-33.0, 4.00, 2.30, -2.20, 0.19, 0.58],
    [-28.0, 4.50, 2.30, -3.00, 0.18, 0.54],
    [-20.0, 4.80, 2.30, -3.40, 0.17, 0.50],
    [-10.0, 4.90, 2.35, -3.60, 0.17, 0.50],
    [ -4.1, 4.90, 2.40, -3.70, 0.17, 0.50],
    [ -3.9, 4.90, 3.90, -3.70, 0.17, 0.50],
    [  4.0, 4.90, 3.90, -3.70, 0.17, 0.50],
    [ 14.0, 4.70, 4.05, -3.50, 0.19, 0.54],
    [ 22.0, 4.10, 4.30, -3.10, 0.24, 0.66],
    [ 28.0, 3.50, 4.55, -2.60, 0.30, 0.80],
    [ 33.0, 2.60, 4.80, -2.00, 0.40, 1.00],
    [ 38.0, 1.35, 4.95, -1.20, 0.55, 1.20],
    [ 43.0, 0.10, 5.05, -0.50, 0.80, 1.50]
  ];
  var BS = 1;
  function pick(x, k) {
    var i, v;
    if (x <= STA[0][0]) v = STA[0][k];
    else if (x >= STA[STA.length - 1][0]) v = STA[STA.length - 1][k];
    else for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
      var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
      v = a[k] + (b[k] - a[k]) * f; break;
    }
    return k === 1 ? v * BS : v;
  }
  function deckZ(x) { return pick(x, 2); }
  function halfB(x) { return pick(x, 1); }
  function bowRake(x, f) { return x > 20 ? f * Math.pow((x - 20) / 19.3, 1.6) : 0; }
  /* raked, flared stem: every hull ring is planar, so after the lofts are built
     the bow region is sheared forward with height above the waterline and
     widened a little (flare). xr is the ring's own x (station minus the
     waterline cut-away). */
  var RAKE = 9.0, SHEAR = 0.8, FLARE = 0.035;
  function bowW(xr) { var t = (xr - 14) / 17.1; return t <= 0 ? 0 : Math.pow(Math.min(t, 1), 1.5); }
  function shearX(xr, z) { return SHEAR * Math.max(z, 0) * bowW(xr); }
  function flareY(xr, z) { return 1 + FLARE * Math.max(z, 0) * bowW(xr); }

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
    var g = cv.getContext("2d"), R = rng(4411), i;
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


  function makeMats(THREE, C, blue) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  skin(blue ? 0x838f97 : 0x9ba3a7, plateTex(THREE, [10, 1.0]), 0.86),
      boot:  skin(0x0d0f11, plateTex(THREE, [10, 1]), 0.9),
      under: skin(0x2a1612, plateTex(THREE, [6, 2]), 0.9),
      sup:   skin(blue ? 0xa0aaaf : 0xaab1b4, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x666d72, plateTex(THREE, [8, 1.5]), 0.95),
      dark:  skin(0x060708, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x5b6167, 0.52, 0.55),
      gun:   metal(0x3b4146, 0.48, 0.60)
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
    idx.needsUpdate = true;
    var pa = g.attributes.position.array, xr;
    for (i = 0; i < pa.length; i += 3) {
      xr = pa[i]; if (xr < 14) continue;
      pa[i] = xr + shearX(xr, pa[i + 2]); pa[i + 1] *= flareY(xr, pa[i + 2]);
    }
    g.attributes.position.needsUpdate = true; g.computeVertexNormals();
    return new THREE.Mesh(g, m);
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


  function xsRange(x0, x1, n) {
    var xs = [], i;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.2 && STA[i][0] < x1 - 0.2) xs.push(STA[i][0]);
    for (i = 0; i <= n; i++) xs.push(x0 + (x1 - x0) * i / n);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.3; });
  }
  function hullSections(kind, x0, x1, n) {
    var XS = xsRange(x0, x1, n), A = [], i;
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3);
      var xx = x - bowRake(x, RAKE);
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
    for (x = 20.5; x < x1 - 0.3; x += 1.0) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      var xo = xs[i], z = deckZ(xo) + 0.04, xr = xo - bowRake(xo, RAKE);
      x = xr + shearX(xr, z);
      var w = Math.max(0.06, halfB(xo) * flareY(xr, z) - 0.02);
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
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z, xo, k;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        xo = x0 + (x1 - x0) * i / n; z = deckZ(xo) + 0.04;
        var xr = xo - bowRake(xo, RAKE);
        x = xr + shearX(xr, z);
        y = s * (halfB(xo) * flareY(xr, z) - 0.2);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  function sphereHalf(THREE, p, r, sy, sz, m, x, y, z, rz) {
    var g = new THREE.SphereGeometry(r, 16, 6, 0, PI * 2, 0, PI / 2); g.rotateX(PI / 2);
    var s = new THREE.Mesh(g, m); s.scale.set(1, sy, sz); s.position.set(x, y, z);
    if (rz) s.rotation.z = rz; p.add(s); return s;
  }

  /* ------------------------------------------------------------- weapons */
  /* twin 57 mm AK-725 in its round shield, at rest pointing +X */
  function ak725(THREE, g, T) {
    sphereHalf(THREE, g, 1.45, 1, 0.95, T.sup, 0, 0, 0.45);
    cylZ(THREE, g, 1.45, 1.5, 0.5, 16, T.sup, 0, 0, 0.25);
    var s;
    box(THREE, g, 0.5, 1.5, 0.9, T.dark, 1.3, 0, 0.95);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.10, 0.10, 0.9, 8, T.gun, 1.7, s * 0.30, 1.0);
      cylX(THREE, g, 0.058, 0.058, 2.7, 8, T.gun, 3.2, s * 0.30, 1.0, true);
    }
    return g;
  }
  /* 76 mm AK-176: rounded turret, one long barrel */
  function ak176(THREE, g, T) {
    cylZ(THREE, g, 1.3, 1.35, 0.5, 14, T.sup, 0, 0, 0.25);
    sphereHalf(THREE, g, 1.3, 0.9, 1.0, T.sup, -0.05, 0, 0.5);
    tprism(THREE, g, 1.2, 1.5, 0.9, 1.1, 0.8, T.sup, 1.0, 0, 0.95);
    box(THREE, g, 0.3, 0.6, 0.45, T.dark, 1.65, 0, 0.95);
    cylX(THREE, g, 0.14, 0.14, 0.9, 10, T.gun, 1.9, 0, 0.95);
    cylX(THREE, g, 0.075, 0.075, 3.4, 8, T.gun, 3.6, 0, 0.95, true);
    cylX(THREE, g, 0.11, 0.11, 0.35, 8, T.gun, 5.2, 0, 0.95);
    return g;
  }
  /* AK-630: drum, round shield, six-barrel cluster */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.7, 0.75, 0.5, 12, T.sup, 0, 0, 0.25);
    sphereHalf(THREE, g, 0.62, 1, 1.0, T.sup, -0.05, 0, 0.5);
    cylX(THREE, g, 0.18, 0.18, 1.0, 8, T.gun, 0.95, 0, 0.8);
    cylX(THREE, g, 0.12, 0.12, 1.2, 8, T.gun, 1.6, 0, 0.8);
    var k, a;
    for (k = 0; k < 6; k++) { a = k * PI / 3;
      cylX(THREE, g, 0.025, 0.025, 1.0, 4, T.dark, 1.9, Math.cos(a) * 0.10, 0.8 + Math.sin(a) * 0.10); }
    return g;
  }
  /* RBU-6000: 12 tubes in a tilted rack */
  function rbu(THREE, g, T) {
    cylZ(THREE, g, 0.55, 0.62, 0.5, 12, T.sup, 0, 0, 0.25);
    box(THREE, g, 1.9, 1.5, 0.35, T.sup, 0, 0, 0.67);
    var rk = new THREE.Group(); rk.position.set(0, 0, 0.9); rk.rotation.y = 0.5; g.add(rk);
    var i, j;
    for (i = 0; i < 3; i++) for (j = 0; j < 4; j++) {
      cylZ(THREE, rk, 0.1, 0.1, 1.5, 6, T.gun, -0.3 + i * 0.3, -0.45 + j * 0.3, 0.75);
    }
    box(THREE, rk, 1.1, 1.4, 0.1, T.metal, 0, 0, 0.05);
    return g;
  }
  /* twin 533 mm torpedo tubes on a training base, pointing +X at rest */
  function ttubes(THREE, g, T) {
    cylZ(THREE, g, 0.55, 0.65, 0.4, 10, T.sup, 0, 0, 0.2);
    var s;
    box(THREE, g, 3.4, 0.9, 0.25, T.sup, 0, 0, 0.5);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.29, 0.29, 5.0, 14, T.metal, 0, s * 0.36, 1.0, true);
      cylX(THREE, g, 0.30, 0.30, 0.22, 10, T.dark, 2.5, s * 0.36, 1.0);
      cylX(THREE, g, 0.31, 0.31, 0.12, 10, T.gun, -1.5, s * 0.36, 1.0);
      cylX(THREE, g, 0.31, 0.31, 0.12, 10, T.gun, 0.8, s * 0.36, 1.0);
    }
    box(THREE, g, 0.2, 1.4, 0.1, T.gun, -2.4, 0, 1.25);
    return g;
  }

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C, V.beam > 10));
    var s, i, x, z, k;
    BS = V.beam / BEAM;

    /* hull shells: quarterdeck (dark topsides), forecastle (grey), boot, bottom */
    g.add(loftMesh(THREE, M, hullSections("top", -35.6, -4.1, 8), 28, T.hull));
    g.add(loftMesh(THREE, M, hullSections("top", -3.9, 43.0, 26), 28, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot", -35.6, 43.0, 24), 16, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low", -35.6, 43.0, 26), 22, T.under));
    tprism(THREE, g, 0.4, 2 * halfB(-35.5) - 0.3, 0.4, 2 * halfB(-35.5) - 0.6, 1.9, T.hull, -35.5, 0, 1.2);
    box(THREE, g, 0.2, 2 * halfB(-4) - 0.1, 1.56, T.hull, -4.0, 0, 3.12);   /* break of the forecastle */
    g.add(deckRibbon(THREE, T.deck, -35.5, -4.15));
    g.add(deckRibbon(THREE, T.deck, -3.85, 42.6));

    /* scuttles */
    for (i = 0; i < 12; i++) {
      x = -26 + i * 3.4;
      for (s = -1; s <= 1; s += 2)
        box(THREE, g, 0.26, 0.05, 0.26, T.dark, x, s * (halfB(x) + 0.09), x < -4 ? 1.35 : 2.1);
    }
    box(THREE, g, 0.4, 0.05, 0.4, T.dark, 1, halfB(1) + 0.09, 2.1);

    /* forecastle: SA-N-4 hatch, two RBU-6000, windlass, bollards */
    var hz = deckZ(24.5) + 0.04;
    cylZ(THREE, g, 1.45, 1.5, 0.10, 20, T.dark, 24.5, 0, hz + 0.05);
    cylZ(THREE, g, 1.35, 1.35, 0.18, 20, T.metal, 24.5, 0, hz + 0.09);
    box(THREE, g, 2.7, 0.06, 0.02, T.dark, 24.5, 0, hz + 0.19);
    box(THREE, g, 0.06, 2.7, 0.02, T.dark, 24.5, 0, hz + 0.19);
    for (s = -1; s <= 1; s += 2) {
      var rg = new THREE.Group(); rg.position.set(18.5, s * 1.75, deckZ(18.5) + 0.04); rbu(THREE, rg, T); g.add(rg);
    }
    cylZ(THREE, g, 0.5, 0.5, 0.6, 10, T.metal, 29.5, 0, deckZ(29.5) + 0.3);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.17, 0.17, 0.5, 6, T.metal, 27.5, s * 1.9, deckZ(27.5) + 0.25);
      cylZ(THREE, g, 0.17, 0.17, 0.5, 6, T.metal, 12.5, s * 4.3, deckZ(12.5) + 0.25);
    }
    box(THREE, g, 0.5, 0.5, 0.4, T.dark, 31.0, 0, deckZ(31) + 0.2);

    /* main house: bridge block, funnel and mast */
    tprism(THREE, g, 19.8, 7.0, 18.6, 6.4, 4.7, T.sup, 2.25, 0, 4.65);
    for (i = 0; i < 9; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.6, 0.05, 0.45, T.dark, -5.0 + i * 1.8, s * 3.42, 5.4);
    box(THREE, g, 0.05, 4.8, 0.5, T.dark, 12.05, 0, 5.5);
    /* wheelhouse, windows, roof */
    tprism(THREE, g, 9.2, 6.4, 8.4, 5.8, 2.0, T.sup, 6.0, 0, 8.0);
    box(THREE, g, 0.1, 5.2, 0.7, T.dark, 10.4, 0, 8.3);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 5.4, 0.05, 0.6, T.dark, 6.5, s * 3.05, 8.3);
    box(THREE, g, 8.4, 5.8, 0.12, T.sup, 6.0, 0, 9.06);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.6, 1.5, 0.14, T.sup, 8.2, s * 3.9, 7.9);
      box(THREE, g, 2.6, 0.08, 0.5, T.sup, 8.2, s * 4.65, 8.2);
      box(THREE, g, 2.6, 0.08, 0.5, T.sup, 8.2, s * 3.9 + s * 0.0, 7.9);
      for (i = 0; i < 4; i++) cylX(THREE, g, 0.3, 0.3, 1.1, 10, T.metal, -2.0 + i * 1.5, s * 3.72, 5.5 + (i % 2) * 0.0 - 0.0);
    }
    /* funnel */
    var fg = new THREE.Group(); fg.position.set(-3.8, 0, 7.0); fg.rotation.y = -0.1; g.add(fg);
    tprism(THREE, fg, 3.6, 3.8, 2.9, 3.0, 2.9, T.sup, 0, 0, 1.45);
    tprism(THREE, fg, 3.0, 3.1, 3.0, 3.1, 0.14, T.gun, 0, 0, 2.95);
    box(THREE, fg, 2.2, 0.12, 0.7, T.metal, 0, 0, 3.4);
    /* mast: stout base, pole, slab radar, yards and the aft lattice */
    tprism(THREE, g, 1.5, 1.5, 0.9, 0.9, 3.0, T.sup, 3.8, 0, 10.6);
    strut(THREE, g, T.metal, 3.8, 0, 12.1, 3.8, 0, 16.2, 0.1, 6);
    box(THREE, g, 0.2, 3.0, 0.14, T.metal, 3.8, 0, 14.0);
    var rd = box(THREE, g, 0.3, 3.2, 1.7, T.metal, 3.9, 0, 15.3); rd.rotation.y = -0.18;
    cylZ(THREE, g, 0.28, 0.28, 0.6, 8, T.sup, 3.8, 0, 12.7);
    box(THREE, g, 0.1, 2.4, 0.1, T.metal, 3.8, 0, 16.0);
    [[0.6], [-0.6]].forEach(function (q) {
      strut(THREE, g, T.metal, 2.4, q[0] * 1.0, 9.1, 1.8, q[0] * 0.2, 15.0, 0.05, 4);
    });
    for (i = 1; i < 5; i++) {
      z = 9.1 + i * 1.2; var f = i / 5.0;
      strut(THREE, g, T.metal, 2.4 - 0.6 * f, -0.6 * (1 - f) - 0.1, z, 2.4 - 0.6 * f, 0.6 * (1 - f) + 0.1, z, 0.03, 3);
    }
    strut(THREE, g, T.metal, 3.8, 0, 16.2, 7.0, 0, 9.1, 0.012, 3);
    strut(THREE, g, T.metal, 3.8, 0, 16.2, -1.0, 0, 7.0, 0.012, 3);
    /* signal lamps, antennas on the wheelhouse roof */
    cylZ(THREE, g, 0.2, 0.2, 0.5, 8, T.metal, 8.5, 1.8, 9.4);
    cylZ(THREE, g, 0.2, 0.2, 0.5, 8, T.metal, 8.5, -1.8, 9.4);
    strut(THREE, g, T.metal, 1.0, 2.4, 9.1, 1.0, 2.4, 12.2, 0.03, 4);
    strut(THREE, g, T.metal, 1.0, -2.4, 9.1, 1.0, -2.4, 12.2, 0.03, 4);

    /* torpedo tubes: a twin mount each side of the quarterdeck, abaft the house */
    for (s = -1; s <= 1; s += 2) {
      var tt = new THREE.Group(); tt.position.set(-9.8, s * 2.6, deckZ(-9.8) + 0.04); ttubes(THREE, tt, T); g.add(tt);
    }

    /* after house, upper block, dome / radar, AK-630 on the Grisha V */
    tprism(THREE, g, 11.6, 6.4, 10.6, 5.8, 3.5, T.sup, -17.8, 0, 4.05);
    for (i = 0; i < 5; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.55, 0.05, 0.42, T.dark, -22.0 + i * 2.2, s * 3.08, 4.3);
    box(THREE, g, 0.05, 4.0, 0.45, T.dark, -11.95, 0, 4.4);
    tprism(THREE, g, 5.6, 4.4, 5.0, 3.9, 1.2, T.sup, -15.8, 0, 6.4);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 3.4, 0.05, 0.4, T.dark, -15.8, s * 2.2, 6.4);
    box(THREE, g, 5.0, 3.9, 0.1, T.sup, -15.8, 0, 7.05);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, -22.2, 0, 5.87);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, 6.0, 0, 9.14);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, -31.0, 0, deckZ(-31) + 0.06);
    if (V.ak630) {
      /* Bass Tilt style fire-control drum on a pedestal, AK-630 on the roof aft */
      cylZ(THREE, g, 0.26, 0.3, 2.0, 8, T.sup, -15.4, 0, 8.05);
      cylZ(THREE, g, 0.85, 0.85, 0.8, 14, T.sup, -15.4, 0, 9.4);
      sphereHalf(THREE, g, 0.85, 1, 0.55, T.sup, -15.4, 0, 9.8);
      var a6 = new THREE.Group(); a6.position.set(-21.2, 0, 5.85); a6.rotation.z = PI; ak630(THREE, a6, T); g.add(a6);
      sphereHalf(THREE, g, 0.95, 1, 1.0, T.sup, -12.9, 0, 5.8);
      strut(THREE, g, T.metal, -17.5, 1.4, 7.1, -17.5, 1.4, 10.2, 0.03, 4);
    } else {
      cylZ(THREE, g, 0.55, 0.6, 0.6, 12, T.sup, -16.2, 0, 7.35);
      sphereHalf(THREE, g, 1.15, 1, 0.95, T.sup, -16.2, 0, 7.65);
      strut(THREE, g, T.metal, -13.8, 1.5, 7.1, -13.8, 1.5, 10.4, 0.04, 4);
      cylZ(THREE, g, 0.3, 0.3, 0.5, 8, T.sup, -13.8, 1.5, 10.2);
      strut(THREE, g, T.metal, -19.8, -1.5, 7.1, -19.8, -1.5, 9.8, 0.03, 4);
    }
    /* ventilators, rafts on the house side, mooring fittings */
    [[-9.0, 3.9], [-9.0, -3.9], [-25.5, 3.2], [-25.5, -3.2], [-30, 2.8], [-30, -2.8]].forEach(function (q) {
      cylZ(THREE, g, 0.24, 0.30, 0.8, 10, T.sup, q[0], q[1], deckZ(q[0]) + 0.45);
      cylZ(THREE, g, 0.38, 0.24, 0.3, 10, T.dark, q[0], q[1], deckZ(q[0]) + 0.95);
    });
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++)
      cylX(THREE, g, 0.3, 0.3, 1.2, 10, T.metal, -22.0 + i * 1.4 + 0.0, s * 3.3, 5.0 + 0.0 + (V.ak630 ? 0 : 0) - 0.0 + 0.0);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++)
      cylX(THREE, g, 0.32, 0.32, 1.3, 12, T.metal, 3.0 + i * 1.5, s * 3.26, 6.6);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.16, 0.16, 0.5, 6, T.metal, -33.4, s * 2.7, 2.55);
      cylZ(THREE, g, 0.16, 0.16, 0.5, 6, T.metal, -27.0, s * 4.2, 2.55);
    }
    box(THREE, g, 0.9, 1.2, 0.9, T.metal, -33.2, 0, 2.75);

    /* underwater gear: two shafts, struts, propellers, two rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.17, 0.17, 5.0, 8, T.metal, -32.0, s * 2.0, -1.9);
      strut(THREE, g, T.metal, -33.4, s * 2.0, -1.9, -33.4, s * 3.0, -0.8, 0.1, 4);
      cylX(THREE, g, 0.28, 0.4, 0.6, 8, T.metal, -34.8, s * 2.0, -1.9);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.9), T.metal);
        bl.position.set(-34.8, s * 2.0, -1.9); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.6); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 1.4, 0.18, 1.8, T.metal, -35.0, s * 1.0, -0.9);
    }

    railRun(THREE, g, T, -35.0, -4.8, 3.0, 1.0);
    railRun(THREE, g, T, -3.0, 40.5, 3.4, 1.0);

    /* trained mount: the stern gun */
    var tw = new THREE.Group(); tw.name = "turret";
    var tz = deckZ(-26.0) + 0.04;
    cylZ(THREE, g, V.gun === 76 ? 1.5 : 1.6, V.gun === 76 ? 1.6 : 1.7, 0.8, 16, T.sup, -26.0, 0, tz + 0.4);
    tw.position.set(-26.0, 0, tz + 0.8);
    if (V.gun === 76) ak176(THREE, tw, T); else ak725(THREE, tw, T);

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

UNIT_MODELS["pact_e60_corvette"] = {
  len: 71.2,
  build: function (THREE, M, C) { return HeroGrisha.build(THREE, M, C, { beam: 9.8, gun: 57, ak630: false }); }
};
UNIT_MODELS["pact_e90_corvette"] = {
  len: 71.2,
  build: function (THREE, M, C) { return HeroGrisha.build(THREE, M, C, { beam: 10.2, gun: 76, ak630: true }); }
};
