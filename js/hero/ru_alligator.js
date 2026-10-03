/* ==================== js/hero/ru_alligator.js ============================
   HERO MODEL -- Project 1171 "Tapir" (NATO Alligator) large landing ship
   (BDK), 1960s fit.  Key: pact_e60_lst.
   Length overall 113.1 m, beam 15.6 m, draught about 3.7 m; the hull is a
   full-form beachable hull with a raised bow (bow door), a long cargo deck
   and the superstructure and funnel-mast pylon in the after third.

   REFERENCES (what each feature rests on):
     - Commons "USN 1144921 Soviet Alligator Class.jpg" (a 1970s USN
       photograph of a Project 1171 underway, bow quarter): high raked and
       flared stem with a round hawse, long flush cargo deck with a crane
       standing forward of the tower and its boom lowered towards the bow,
       a stepped superstructure of three tiers with a broad bridge block,
       a tapering funnel-mast pylon rising from the tower roof with a pole
       mast on it, a boat on the boat-deck roof on the viewer's (port) side
       with a davit, mounts on the front of the lowest deckhouse, a low
       after deck with a signal pole.  Stations of the tower (about 0.65
       of the length from the bow), the deckhouse and the crane were read
       off this photograph.
     - Commons "Saratov2007Sevastopol.jpg" (the lead ship, 2007 side view):
       two cargo cranes with lattice booms standing between bow and tower,
       the tower aft, the sheer rising to the bow, flat transom.  Used for
       the second crane and the side proportions.  Its colours (dark navy
       grey, red-brown cargo boxes) are 2007 paint and NOT used.
     - Published figures (Commons/Wikipedia class article and the game
       facts row): 113 m, 3,400-4,360 t, 14 hulls 1964-75.
     - PAINT: the 1970s black-and-white photograph shows a mid-to-light grey
       hull and a lighter superstructure; the greys follow the Sverdlov and
       Riga heroes.  The 1960s deck colour is not visible, a dull grey is used.
   CHECK-AND-FIX CHANGES: deck raised to about 7.8 m amidships (freeboard
   measured on the 2007 profile and the 1970s photo, 7.8-8 m); ONE crane
   (the 1970s photograph and the 1974 USSR stamp show one; the two-crane
   layout is the 2007 photo); bow made blunt with the bow-door seam drawn
   (Commons 1970s "052" photo and 1974 stamp: high, nearly vertical stem,
   two-leaf bow door, round hawse recess on each side); no stern ramp
   (none in any photograph); hatch coamings removed (unsupported).
   A three-crane first-ship layout could NOT be confirmed.
   NOT CONFIRMED and therefore not drawn: the Grad rocket launcher and the
   SA-N-5 positions (facts say "on some"; later refits), hull numbers, any
   deck cargo, the bow door seams.  The count and exact place of the twin
   57 mm mounts (drawn as two, at the front corners of the lowest deckhouse
   roof), the third crane, the starboard boat and the radar type (a generic
   rotating antenna) are approximations.  No drawing of the class was found
   on Commons, so the hull stations are scaled from the photographs.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row is
   turret:false, so nothing is named "turret"; every part is baked and merged
   into one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAlligator = (function () {
  "use strict";
  var PI = Math.PI;
  var X0 = -56.5, X1 = 56.5;

  /* x, half beam, deck z, keel z, sqTop, sqLow */
  var STA = [
    [-56.5, 6.20, 7.90, -1.40, 0.10, 0.55],
    [-54.0, 7.00, 7.90, -2.60, 0.10, 0.55],
    [-48.0, 7.60, 7.80, -3.50, 0.09, 0.50],
    [-38.0, 7.80, 7.80, -3.70, 0.08, 0.48],
    [-20.0, 7.80, 7.80, -3.70, 0.08, 0.48],
    [  0.0, 7.80, 7.85, -3.70, 0.08, 0.48],
    [ 20.0, 7.75, 8.10, -3.65, 0.09, 0.50],
    [ 32.0, 7.50, 8.50, -3.40, 0.12, 0.58],
    [ 41.0, 6.90, 9.00, -2.90, 0.14, 0.66],
    [ 47.0, 5.90, 9.50, -2.20, 0.16, 0.75],
    [ 51.0, 4.80, 9.90, -1.30, 0.18, 0.85],
    [ 54.0, 3.70, 10.20, 0.40, 0.20, 0.95],
    [ 56.0, 2.80, 10.40, 3.00, 0.22, 1.05],
    [ 56.5, 2.30, 10.50, 4.50, 0.24, 1.10]
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
      hull:  skin(0x7a838a, plateTex(THREE, [16, 1.2]), 0.86),
      boot:  skin(0x0d0f11, plateTex(THREE, [16, 1]), 0.9),
      under: skin(0x2a1410, plateTex(THREE, [8, 2]), 0.9),
      sup:   skin(0x8f989e, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x575d62, plateTex(THREE, [10, 1.5]), 0.95),
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
    var A = [], i, N = 34, XS = [];
    var xmax = kind === "top" ? X1 : 53.0;
    for (i = 0; i < N; i++) XS.push(X0 + (xmax - X0) * i / (N - 1));
    for (i = 0; i < XS.length; i++) {
      var x = XS[i], w = pick(x, 1), dz = pick(x, 2), kz = pick(x, 3);
      if (kind === "top") {
        var lo = Math.min(0.6, kz + 0.1);
        A.push({ x: x, w: w + 0.06, h: (dz - 0.1 - lo) / 2, zc: (dz - 0.1 + lo) / 2, sq: pick(x, 4) });
      } else if (kind === "boot")
        A.push({ x: x, w: w + 0.03, h: 0.45, zc: 0.30, sq: 0.12 });
      else
        A.push({ x: x, w: w, h: (0.12 - kz) / 2, zc: (0.12 + kz) / 2, sq: pick(x, 5) });
    }
    return A;
  }
  function deckRibbon(THREE, m, x0, x1) {
    var xs = [x0, x1], i, j, NC = 4, pos = [], uv = [], idx = [], x;
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 + 0.3 && STA[i][0] < x1 - 0.3) xs.push(STA[i][0]);
    for (x = x0 + 1; x < x1 - 0.3; x += 1.5) xs.push(x);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, n) { return n === 0 || v - xs[n - 1] > 0.05; });
    for (i = 0; i < xs.length; i++) {
      x = xs[i];
      var w = Math.max(0.06, halfB(x) - 0.02), z = deckZ(x) + 0.04;
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

  /* twin 57 mm mount, trained forward (baked; the row has no trained mount) */
  function k57(THREE, g, T) {
    var s;
    cylZ(THREE, g, 0.9, 1.0, 0.7, 12, T.sup, 0, 0, 0.35);
    tprism(THREE, g, 2.8, 2.6, 2.1, 2.1, 1.3, T.sup, -0.1, 0, 1.3);
    box(THREE, g, 0.4, 1.4, 0.5, T.dark, 1.2, 0, 1.3);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.12, 0.12, 0.9, 8, T.gun, 1.5, s * 0.42, 1.35);
      cylX(THREE, g, 0.07, 0.07, 3.0, 8, T.gun, 2.9, s * 0.42, 1.35, true);
    }
  }
  /* lattice crane: pedestal, cab, boom raised toward the bow */
  function crane(THREE, g, T, cx, cy, cz, boomLen, elev) {
    var s, i, ex = cx + 1.2 + Math.cos(elev) * boomLen, ez = cz + 3.2 + Math.sin(elev) * boomLen;
    cylZ(THREE, g, 1.0, 1.2, 3.0, 12, T.sup, cx, cy, cz + 1.5);
    box(THREE, g, 3.2, 2.8, 2.4, T.sup, cx - 0.2, cy, cz + 4.2);
    box(THREE, g, 0.1, 2.0, 0.9, T.glass, cx + 1.4, cy, cz + 4.6);
    box(THREE, g, 1.4, 1.8, 0.4, T.metal, cx - 1.8, cy, cz + 3.4);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, cx + 1.2, cy + s * 0.55, cz + 3.2, ex, cy + s * 0.2, ez, 0.13, 4);
      strut(THREE, g, T.metal, cx + 1.2, cy + s * 0.55, cz + 3.2, cx + 1.2, cy + s * 0.55, cz + 3.2, 0.07, 4);
    }
    for (i = 1; i < 9; i++) {
      var f = i / 9, bx = cx + 1.2 + (ex - cx - 1.2) * f, bz = cz + 3.2 + (ez - cz - 3.2) * f, ww = 0.55 - 0.35 * f;
      strut(THREE, g, T.metal, bx, cy - ww, bz, bx, cy + ww, bz, 0.06, 3);
      if (i > 1) {
        var pf = (i - 1) / 9, px = cx + 1.2 + (ex - cx - 1.2) * pf, pz = cz + 3.2 + (ez - cz - 3.2) * pf, pw = 0.55 - 0.35 * pf;
        strut(THREE, g, T.metal, px, cy - pw, pz, bx, cy + ww, bz, 0.05, 3);
        strut(THREE, g, T.metal, px, cy + pw, pz, bx, cy - ww, bz, 0.05, 3);
      }
    }
    strut(THREE, g, T.metal, cx - 0.2, cy, cz + 5.4, cx - 0.2, cy, cz + 13.0, 0.13, 5);
    strut(THREE, g, T.metal, ex, cy, ez, cx - 0.2, cy, cz + 13.0, 0.03, 3);
    strut(THREE, g, T.metal, cx - 0.2, cy, cz + 13.0, cx - 3.4, cy, cz + 3.4, 0.03, 3);
    strut(THREE, g, T.metal, ex, cy, ez, ex, cy, ez - 2.4, 0.02, 3);
    box(THREE, g, 0.4, 0.4, 0.5, T.metal, ex, cy, ez - 2.6);
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


  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, y, z;

    /* hull: three coaxial shells, transom, deck */
    g.add(loftMesh(THREE, M, hullSections("top"), 24, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 12, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 18, T.under));
    tprism(THREE, g, 0.4, 12.4, 0.4, 11.9, 7.0, T.hull, X0 + 0.05, 0, 3.4);
    g.add(deckRibbon(THREE, T.deck, X0 + 0.1, X1 - 0.2));

    /* scuttles and hawse pipes */
    for (i = 0; i < 28; i++) {
      x = -46 + i * 3.2;
      for (s = -1; s <= 1; s += 2) box(THREE, g, 0.3, 0.05, 0.3, T.dark, x, s * (halfB(x) + 0.09), 4.2);
    }
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.8, 0.8, 0.3, 14, T.dark, 46.0, s * (halfB(46.0) + 0.02), 7.4);
      cylX(THREE, g, 0.3, 0.3, 0.3, 8, T.dark, 56.45, s * 0.9, 9.8);
    }

    /* lashing pads along the cargo deck (no hatch coamings: no reference shows them) */
    for (i = 0; i < 9; i++) for (s = -1; s <= 1; s += 2)
      cylZ(THREE, g, 0.17, 0.17, 0.3, 6, T.metal, 1.0 + i * 5.2, s * 5.3, deckZ(1.0 + i * 5.2) + 0.15);

    /* bow door seam (two leaves meet on the centre line; closed bow of the 1970s photo) */
    box(THREE, g, 0.06, 0.07, 5.4, T.dark, 56.52, 0, 7.8);
    box(THREE, g, 0.06, 2 * halfB(56.4) - 0.3, 0.08, T.dark, 56.52, 0, 8.4);
    strut(THREE, g, T.dark, 54.1, 0, 0.9, 56.5, 0, 4.6, 0.04, 3);
    /* forecastle: windlass, bitts, anchor davit */
    cylZ(THREE, g, 0.6, 0.6, 0.7, 10, T.metal, 45.0, 0, deckZ(45.0) + 0.35);
    box(THREE, g, 1.6, 2.0, 0.5, T.deck, 45.0, 0, deckZ(45.0) + 0.3);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.2, 0.2, 0.6, 6, T.metal, 42.0, s * 3.0, deckZ(42.0) + 0.3);
      cylZ(THREE, g, 0.2, 0.2, 0.6, 6, T.metal, 36.0, s * 5.0, deckZ(36.0) + 0.3);
      cylZ(THREE, g, 0.2, 0.2, 0.6, 6, T.metal, -52.0, s * 4.5, deckZ(-52.0) + 0.3);
    }

    /* the one lattice crane forward of the tower, boom nearly level and pointing at the bow (1970s photograph and 1974 stamp) */
    crane(THREE, g, T, 8.0, 1.6, deckZ(8.0), 17.0, -0.12);

    var S = new THREE.Group(); S.position.z = 1.8; g.add(S);
    /* superstructure: three tiers, bridge block */
    tprism(THREE, S, 36.0, 11.8, 35.0, 11.2, 3.3, T.sup, -26.0, 0, 7.65);
    tprism(THREE, S, 26.0, 9.8, 25.4, 9.4, 3.0, T.sup, -27.5, 0, 10.8);
    tprism(THREE, S, 18.0, 9.2, 17.4, 8.8, 3.4, T.sup, -21.0, 0, 14.0);
    box(THREE, S, 14.0, 8.2, 3.0, T.sup, -21.5, 0, 17.2);
    box(THREE, S, 15.4, 10.6, 0.25, T.sup, -21.5, 0, 18.95);
    box(THREE, S, 0.1, 7.4, 0.8, T.glass, -14.4, 0, 17.6);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, S, 11.0, 0.1, 0.8, T.glass, -21.5, s * 4.15, 17.6);
      box(THREE, S, 2.4, 0.1, 0.5, T.sup, -15.5, s * 5.4, 18.1);
      box(THREE, S, 2.2, 2.0, 0.14, T.sup, -15.5, s * 4.5, 17.5);
    }
    /* window rows */
    for (i = 0; i < 14; i++) for (s = -1; s <= 1; s += 2) {
      box(THREE, S, 0.6, 0.05, 0.5, T.dark, -41.0 + i * 2.35, s * 5.93, 7.9);
      if (i < 10) box(THREE, S, 0.6, 0.05, 0.5, T.dark, -39.0 + i * 2.4, s * 4.93, 11.0);
      if (i < 7) box(THREE, S, 0.6, 0.05, 0.5, T.dark, -29.0 + i * 2.4, s * 4.23, 14.3);
    }
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2) box(THREE, S, 0.5, 0.05, 0.45, T.dark, -37.0 + i * 3.0, s * 5.93, 8.6);
    /* roof of the lowest tier forward edge: rails and doors */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, S, 1.0, 0.05, 2.0, T.dark, -8.1, s * 3.0, 7.4);
      strut(THREE, S, T.metal, -26.0 + 17.4, s * 5.5, 9.3, -26.0 - 17.4, s * 5.5, 9.3, 0.03, 3);
      strut(THREE, S, T.metal, -26.0 + 17.4, s * 5.5, 10.2, -26.0 - 17.4, s * 5.5, 10.2, 0.03, 3);
    }

    /* twin 57 mm at the front corners of the lowest roof (count approximate) */
    for (s = -1; s <= 1; s += 2) {
      var k = new THREE.Group(); k.position.set(-11.0, s * 4.3, 9.3); k57(THREE, k, T); S.add(k);
    }

    /* funnel-mast pylon on the tower roof, tapering, leaning aft */
    var fg = new THREE.Group(); fg.position.set(-26.5, 0, 19.1); fg.rotation.y = 0.08; S.add(fg);
    tprism(THREE, fg, 4.2, 3.6, 1.9, 1.7, 8.0, T.sup, 0, 0, 4.0);
    tprism(THREE, fg, 2.0, 1.8, 2.0, 1.8, 0.2, T.dark, 0, 0, 8.1);
    box(THREE, fg, 1.0, 3.0, 0.2, T.metal, 0.6, 0, 6.0);
    /* pole mast, platform, rotating antenna, whips */
    var mx = -27.2, zt = 25.6;
    strut(THREE, S, T.metal, mx, 0, zt, mx, 0, 31.5, 0.12, 6);
    box(THREE, S, 1.8, 2.4, 0.12, T.metal, mx, 0, zt + 2.0);
    box(THREE, S, 0.3, 2.8, 1.3, T.metal, mx + 0.4, 0, zt + 3.2);
    box(THREE, S, 0.12, 4.4, 0.12, T.metal, mx, 0, zt + 5.4);
    box(THREE, S, 0.5, 1.0, 0.7, T.sup, mx + 0.6, 0, zt + 0.7);
    strut(THREE, S, T.metal, mx, 0, 31.5, mx - 3.0, 0, zt, 0.012, 3);
    strut(THREE, S, T.metal, mx, 0, 31.5, mx + 3.0, 0, zt - 1.0, 0.012, 3);
    strut(THREE, S, T.metal, -18.0, 4.6, 19.1, -18.0, 4.6, 24.0, 0.03, 3);
    strut(THREE, S, T.metal, -18.0, -4.6, 19.1, -18.0, -4.6, 22.5, 0.03, 3);
    box(THREE, S, 0.9, 0.7, 1.6, T.sup, -17.0, 0, 20.0);
    box(THREE, S, 0.2, 0.2, 0.9, T.metal, -17.0, 0, 21.2);

    /* port motor boat on the second-tier roof with its davit */
    tprism(THREE, S, 8.0, 2.3, 6.4, 1.8, 0.9, T.sup, -32.0, 3.2, 12.8);
    tprism(THREE, S, 4.0, 1.7, 3.2, 1.3, 0.6, T.sup, -32.5, 3.2, 13.5);
    box(THREE, S, 1.4, 0.1, 0.4, T.glass, -32.0, 3.2, 13.9);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, S, T.metal, -35.0, 3.2, 12.4, -35.0, 3.2, 14.6, 0.08, 4);
      strut(THREE, S, T.metal, -29.0, 3.2, 12.4, -29.0, 3.2, 14.6, 0.08, 4);
    }
    strut(THREE, S, T.metal, -35.0, 3.2, 14.6, -29.0, 3.2, 14.6, 0.05, 4);
    /* life rafts, ventilators, searchlights */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) cylX(THREE, S, 0.3, 0.3, 1.3, 12, T.metal, -36.0 + i * 1.6, s * 3.7, 12.6);
      cylZ(THREE, S, 0.18, 0.18, 0.5, 10, T.metal, -14.0, s * 5.5, 19.3);
      cylZ(THREE, S, 0.3, 0.38, 0.9, 12, T.sup, -49.0, s * 3.0, deckZ(-49.0) + 0.45);
      cylZ(THREE, S, 0.44, 0.3, 0.3, 12, T.dark, -49.0, s * 3.0, deckZ(-49.0) + 1.05);
    }
    for (i = 0; i < 4; i++) cylX(THREE, S, 0.4, 0.4, 0.3, 12, T.dark, -40.0 + i * 1.8, 0, 9.5);
    /* after deck: winch house, pole mast */
    box(THREE, S, 4.0, 3.2, 1.8, T.sup, -50.0, 0, 6.1 + 0.9);
    strut(THREE, S, T.metal, -52.2, 0, 6.1, -52.2, 0, 14.0, 0.07, 5);
    box(THREE, S, 0.1, 2.4, 0.1, T.metal, -52.2, 0, 12.5);
    strut(THREE, S, T.metal, -52.2, 0, 14.0, -55.5, 0, 6.5, 0.012, 3);

    /* underwater gear: twin screws, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.28, 0.28, 6.0, 8, T.metal, -52.0, s * 3.2, -2.0);
      strut(THREE, g, T.metal, -54.6, s * 3.2, -2.0, -54.6, s * 4.4, -0.8, 0.14, 4);
      cylX(THREE, g, 0.34, 0.5, 0.8, 8, T.metal, -55.4, s * 3.2, -2.0);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 1.2), T.metal);
        bl.position.set(-55.4, s * 3.2, -2.0); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.85); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.0, 0.22, 2.4, T.metal, -56.0, s * 3.2, -1.8);
    }

    railRun(THREE, g, T, -55.0, -44.0, 3.2, 1.0);
    railRun(THREE, g, T, -44.0, 52.0, 3.5, 1.0);

    /* team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -21.5, 0, 20.89);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, -38.0, 0, 11.12);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 38.0, 0, deckZ(38.0) + 0.06);

    g.updateMatrixWorld(true);
    return bake(THREE, g, []);
  }
  return { build: build };
})();

UNIT_MODELS["pact_e60_lst"] = {
  len: 113.1,
  build: function (THREE, M, C) { return HeroAlligator.build(THREE, M, C); }
};
