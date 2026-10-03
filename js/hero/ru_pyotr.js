/* ==================== js/hero/ru_pyotr.js ===============================
   HERO MODEL -- Project 1144.2 "Orlan" heavy nuclear-powered guided-missile
   cruiser ("battlecruiser") PYOTR VELIKIY (Kirov class, fourth ship,
   commissioned 1998), as photographed in the 2000s.
   Key: pact_e90_cruiser only (see "COVERS").
   Length overall 252 m, beam 28.5 m (js/warship_specs.js len 252 beam 28.5),
   draught about 9.1 m (published figure, not from a fetched source).

   REFERENCES (Wikimedia Commons, fetched small; what each feature rests on):
     - "Kirov-class battlecruiser profile 1986.png" (recognition profile of
       the lead ship): station and height scaling at 4.2 px/m - the long
       forecastle, the low flat quarterdeck, the stepped aft block with the
       Top Dome, the second (aft) lattice mast, the big tower with the
       Top Pair at its head (about 50 m), the bridge block with its dome, the
       low forward block.
     - "Russian Battle Cruiser Pyotr Velikiy.jpg" and RIAN 669522 (Pyotr
       Velikiy under way, 2000s, from the beam): the light grey-green hull
       and light grey superstructure, the long forecastle and the
       superstructure from 0.35 to 0.85 of the length, the second tower aft.
     - RIAN 643176 (Pyotr Velikiy, 2011, close view of the forward block):
       the stepped tower with the large Top Pair lattice on top, the big
       spherical Top Dome radomes on the bridge block, the Kashtan mount on
       the neighbouring block, the red boot topping with a thin white line
       over it, the reddish-brown deck paint.
     - "Battlecruiser Frunze aft section 1985.jpg" (USN, from above): the
       wide flat quarterdeck pad with its ring and cross, the low dome of the
       twin gun mount forward of the pad, the long low box beside it, the
       reddish deck, the clean pad with nothing on it.
     - "ARKR Kalinin bow.jpg" (from above, bow quarter): the red-brown
       forecastle, the field of 20 Granit hatches (4 across x 5 along) with the
       white edge line, the low block with a mount at the forecastle break,
       the two big radomes on the bridge block.
   PYOTR VELIKIY AGAINST THE OTHER KIROVS (what was used and not used):
     - the gun aft is the twin 130 mm AK-130 (Frunze, Kalinin, Pyotr; the
       lead ship Kirov had two single 100 mm guns): a round dome on the
       quarterdeck forward of the pad - this is the trained "turret".
     - Kashtan (Kortik-M) mounts: six - two on the aft block roof, two on
       the midship house abreast the tower, one on each of the two low blocks
       beside the Granit field (the Kalinin bow photograph shows one mount on
       each; the port block aft, the starboard block forward).
   FORECASTLE (corrected after the Kalinin bow photograph and the profile):
     bow to bridge: (not drawn: the RBU gear and anchor fittings at the bow)
     two large low deck hatches, twelve low round S-300F hatches (4 across x
     3 along, approximate positions: the photograph shows only faint low lids),
     a white edge strip, then the 20 Granit hatches in a field of 4 across x 5
     along against the bridge block.
   SUPERSTRUCTURE (read off the profile at 4.2 px/m, bottom of the silhouette
     = waterline): low aft block to 14.5 m, stepped block with the aft Top Dome
     (to 27 m), the aft mast/uptake mack (to 30 m, panel and yard to 37 m),
     midship house 13 m with two boats, the big tower (shoulders to 38 m, a
     narrow shaft above, the Top Pair at about 47 m, head about 50.6 m), the
     bridge block to 24 m with three Top Domes and a short mast, two low
     Kashtan blocks forward. The long stays of the profile drawing are thin
     antenna wires and are not drawn.
   NOT CONFIRMED and therefore not drawn: Kinzhal VLS (Pyotr only; no
   photograph read shows where the modules are); RBU-12000, anchor gear, the
   hangar (below the pad: only the painted lift outline), rudders, antennas
   smaller than the Top Pair and Top Domes, AK-630s. No hull number, name or
   ensign.

   TRAINED MOUNT: the twin AK-130 aft is the group named "turret" (at rest
   pointing forward); everything else is baked, one mesh per material.
   HELICOPTER PAD: one clean flat plate (x = -125.8 to -97, top z = 7.04)
   with the lift outline, ring and cross painted only; nothing stands on it
   and no rail runs round it. render3d's deckOf reads it from the aft eighth.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. 10 materials.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPyotr = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -126.0, XB = 126.0;
  var PADX0 = -125.8, PADX1 = -97.0, PADC = -108.0;

  var HW = [[-126, 9.0], [-118, 10.6], [-100, 11.8], [-60, 12.2], [40, 12.2], [60, 11.8], [80, 10.6],
            [95, 8.4], [108, 5.4], [118, 2.2], [126, 0.0]];
  var HD = [[-126, 11.0], [-118, 12.6], [-100, 13.6], [-60, 14.2], [40, 14.2], [60, 13.8], [80, 12.4],
            [95, 10.2], [108, 6.6], [118, 2.8], [126, 0.3]];
  var KZ = [[-126, -3.2], [-112, -6.4], [-92, -8.8], [-70, -9.1], [126, -9.1]];
  var BP = [[-126, 1.8], [-90, 2.6], [-40, 3.2], [40, 3.2], [90, 2.2], [126, 1.4]];
  var FL = [[-126, 1.8], [0, 1.5], [60, 1.3], [126, 1.2]];
  var DZT = [[-126, 7.0], [-70, 7.0], [-56, 8.6], [40, 9.2], [80, 10.6], [110, 12.0], [126, 12.8]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  function deckZ(x) { return tab(DZT, x); }
  /* the stem: raked above water, a rounded forefoot below */
  function xStem(z) {
    if (z >= 0) return 113.0 + 13.0 * Math.min(1, z / 12.8);
    return 113.0 - 10.0 * Math.pow(Math.min(1, -z / 9.1), 1.5);
  }
  function xAt(xn, z) { var u = (xn - XS) / (XB - XS); return XS + u * (xStem(z) - XS); }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HD, xn), zr = deckZ(xn);
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }

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
    var g = cv.getContext("2d"), R = rng(1144), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.07;
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
  /* the helicopter pad in plan: plating, edge line, the ring and its centre
     mark (painted only - the plate stays flat) */
  var PADW = 10.4;
  function padTex(THREE) {
    if (TEX.pad) return TEX.pad;
    var W = 512, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(2024), i;
    var sx = W / (PADX1 - PADX0), sy = H / (2 * PADW);
    var px = function (X) { return (X - PADX0) * sx; };
    var py = function (Y) { return (1 - (Y + PADW) / (2 * PADW)) * H; };
    g.fillStyle = "#7a483e"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (i = -8; i <= 8; i += 2) { g.beginPath(); g.moveTo(0, py(i)); g.lineTo(W, py(i)); g.stroke(); }
    g.globalAlpha = 0.07;
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 50, 6 + R() * 24);
    }
    g.globalAlpha = 1;
    /* the lift outline (flush), the ring and the cross */
    g.strokeStyle = "#3a2420"; g.lineWidth = 3;
    g.strokeRect(px(-123.8), py(5.4), 17.8 * sx, 10.8 * sy);
    g.strokeStyle = "#e4e2dc"; g.lineWidth = 5;
    g.beginPath(); g.arc(px(PADC), py(0), 4.4 * sx, 0, PI * 2); g.stroke();
    g.beginPath(); g.arc(px(PADC), py(0), 0.9 * sx, 0, PI * 2); g.stroke();
    g.beginPath(); g.moveTo(px(PADC - 7.5), py(0)); g.lineTo(px(PADC + 7.5), py(0)); g.stroke();
    g.beginPath(); g.moveTo(px(PADC), py(-6.5)); g.lineTo(px(PADC), py(6.5)); g.stroke();
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX.pad = t; return t;
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
      hull:  skin(0x90948f, plateTex(THREE, [16, 1.2]), 0.86),
      boot:  skin(0x7c3b30, plateTex(THREE, [16, 1]), 0.9),
      under: skin(0x5e302a, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(0x9fa3a2, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x74443b, plateTex(THREE, [12, 1.5]), 0.95),
      hatch: skin(0x4a3631, plateTex(THREE, [1, 1]), 0.9),
      pad:   skin(0xffffff, padTex(THREE), 0.93),
      dark:  skin(0x0e1114, plateTex(THREE, [2, 2]), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x5f676d, 0.52, 0.55)
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ------------------------------------------------------------ helpers */
  function geoMesh(THREE, pos, idx, uv, m) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
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
  /* a cylinder along +X raised forward by tilt */
  function tubeAx(THREE, p, m, cx, cy, cz, len, r, seg, tilt) {
    var g = new THREE.CylinderGeometry(r, r, len, seg, 1); g.rotateZ(-PI / 2); g.rotateY(-tilt);
    var c = new THREE.Mesh(g, m); c.position.set(cx, cy, cz); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* a block from its bottom rectangle (x0a..x1a, |y| <= ya, z = za) to its
     top rectangle (x0b..x1b, |y| <= yb, z = zb) */
  function hexa(THREE, p, m, x0a, x1a, ya, za, x0b, x1b, yb, zb) {
    var V = [[x0a, -ya, za], [x1a, -ya, za], [x1a, ya, za], [x0a, ya, za],
             [x0b, -yb, zb], [x1b, -yb, zb], [x1b, yb, zb], [x0b, yb, zb]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.12, v[1] * 0.12);
      else if (i < 8) uv.push(v[0] * 0.12, v[2] * 0.12);
      else uv.push(v[1] * 0.12, v[2] * 0.12);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var mm = hexa(THREE, p, m, -lx0 / 2, lx0 / 2, ly0 / 2, -lz / 2, -lx1 / 2, lx1 / 2, ly1 / 2, lz / 2);
    mm.position.set(x, y, z); return mm;
  }

  /* --------------------------------------------------------------- hull */
  function hullStrip(THREE, m, xs, zA, zB, F, cap) {
    var pos = [], uv = [], idx = [], n = F.length, i, j, s, xn, z, base;
    for (s = 0; s < 2; s++) {
      var sg = s === 0 ? 1 : -1;
      base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        xn = xs[i];
        var a = zA(xn), b = zB(xn);
        for (j = 0; j < n; j++) {
          z = a + (b - a) * F[j];
          pos.push(xAt(xn, z), sg * sideY(xn, z), z);
          uv.push(xn / 12, z / 12);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n - 1; j++) {
        var A = base + i * n + j, B = A + 1, Cc = A + n, D = Cc + 1;
        if (sg > 0) idx.push(A, B, Cc, B, D, Cc); else idx.push(A, Cc, B, B, Cc, D);
      }
    }
    if (cap) {
      xn = xs[0]; base = pos.length / 3;
      var a0 = zA(xn), b0 = zB(xn);
      for (j = 0; j < n; j++) {
        z = a0 + (b0 - a0) * F[j]; var y = sideY(xn, z), xx = xAt(xn, z);
        pos.push(xx, y, z, xx, -y, z); uv.push(y / 12, z / 12, -y / 12, z / 12);
      }
      for (j = 0; j < n - 1; j++) {
        var P0 = base + 2 * j, S0 = P0 + 1, P1 = P0 + 2, S1 = P0 + 3;
        if (pos[3 * P0 + 1] === pos[3 * S0 + 1]) idx.push(S0, S1, P1);   /* keel point: no sliver */
        else idx.push(P0, S0, P1, S0, S1, P1);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  var FU = [0, 0.02, 0.06, 0.13, 0.25, 0.42, 0.62, 0.82, 1.0];
  var FB = [0, 1];
  var FT = [0, 0.17, 0.34, 0.5, 0.66, 0.83, 1.0];
  function hullPiece(THREE, g, T, xs) {
    var kz = function (xn) { return tab(KZ, xn); };
    g.add(hullStrip(THREE, T.under, xs, kz, function () { return -0.45; }, FU, true));
    g.add(hullStrip(THREE, T.boot, xs, function () { return -0.45; }, function () { return 0.55; }, FB, true));
    g.add(hullStrip(THREE, T.hull, xs, function () { return 0.55; }, deckZ, FT, true));
  }
  /* a flat deck ribbon over a run of stations at the hull's own edge */
  function ribbon(THREE, m, xs, zf, inset, NC, uvf) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], z = zf(xn), w = Math.max(0.05, sideY(xn, z) - inset), x = xAt(xn, z);
      for (j = 0; j <= NC; j++) {
        var yy = w * (1 - 2 * j / NC);
        pos.push(x, yy, z);
        if (uvf) { var q = uvf(x, yy); uv.push(q[0], q[1]); } else uv.push(x / 10, yy / 10);
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }

  /* ------------------------------------------------------------- weapons */
  /* twin 130 mm AK-130 in its round dome, barrels forward, at rest */
  function ak130(THREE, g, T) {
    cylZ(THREE, g, 3.0, 3.1, 0.5, 20, T.sup, 0, 0, 0.25);
    var dg = new THREE.SphereGeometry(2.7, 20, 8, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.12, 1, 0.95);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.5); g.add(d);
    box(THREE, g, 0.3, 2.0, 1.0, T.dark, 3.0, 0, 1.45);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.14, 0.14, 7.6, 8, T.metal, 6.4, s * 0.6, 1.5, true);
      cylX(THREE, g, 0.27, 0.27, 2.3, 8, T.metal, 3.9, s * 0.6, 1.5);
      box(THREE, g, 0.45, 0.28, 0.28, T.metal, 10.15, s * 0.6, 1.5);
    }
    return g;
  }
  /* AK-630: base, domed housing, the barrel bundle; at rest along +X */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.55, 0.62, 0.7, 10, T.sup, 0, 0, 0.35);
    var dg = new THREE.SphereGeometry(0.62, 10, 5, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.7); g.add(d);
    cylX(THREE, g, 0.17, 0.17, 1.9, 6, T.metal, 1.0, 0, 1.0, true);
    cylX(THREE, g, 0.26, 0.26, 0.5, 6, T.metal, 0.35, 0, 1.0);
    return g;
  }
  /* lattice dish of the Top Pair: frame and bars, in its own plane (x thin) */
  function lattice(THREE, g, T, w, h, thick) {
    var i;
    /* the mesh reads as a dark panel at game scale; the frame and bars stand proud of it */
    box(THREE, g, thick * 0.35, w - 0.2, h - 0.2, T.hatch, 0, 0, 0);
    box(THREE, g, thick, w, 0.14, T.metal, 0, 0, h / 2);
    box(THREE, g, thick, w, 0.14, T.metal, 0, 0, -h / 2);
    box(THREE, g, thick, 0.14, h, T.metal, 0, w / 2, 0);
    box(THREE, g, thick, 0.14, h, T.metal, 0, -w / 2, 0);
    for (i = -2; i <= 2; i++) box(THREE, g, thick * 0.6, 0.07, h, T.metal, 0, i * w / 6, 0);
    for (i = -1; i <= 1; i++) box(THREE, g, thick * 0.6, w, 0.07, T.metal, 0, 0, i * h / 4);
    return g;
  }


  /* Kashtan (Kortik-M) mount, at rest along +X: housing, optics, two 30 mm
     gun bundles, four-missile boxes each side, the radar plate on top */
  function kashtan(THREE, g, T) {
    box(THREE, g, 2.2, 2.0, 0.8, T.sup, 0, 0, 0.4);
    box(THREE, g, 2.4, 2.0, 1.4, T.sup, 0, 0, 1.5);
    box(THREE, g, 0.9, 0.9, 0.7, T.sup, -0.2, 0, 2.55);
    box(THREE, g, 0.08, 0.7, 0.4, T.dark, 0.3, 0, 2.55);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.12, 0.12, 2.0, 6, T.metal, 1.9, s * 0.45, 1.8, true);
      box(THREE, g, 1.5, 0.5, 0.95, T.dark, -0.1, s * 1.32, 1.9);
    }
    box(THREE, g, 0.1, 1.5, 1.0, T.metal, -0.9, 0, 3.3);
    return g;
  }
  /* round flush hatch of the S-300F revolver launcher */
  function s300(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 1.7, 1.7, 0.06, 16, T.hatch, x, y, z + 0.03);
    cylZ(THREE, g, 1.45, 1.45, 0.05, 16, T.dark, x, y, z + 0.08);
    box(THREE, g, 2.8, 0.1, 0.04, T.metal, x, y, z + 0.12);
    box(THREE, g, 0.1, 2.8, 0.04, T.metal, x, y, z + 0.12);
  }
  function windows(THREE, g, T, x0, dx, n, y, z, s) {
    for (var i = 0; i < n; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, x0 + i * dx, s * y, z);
  }
  function dome(THREE, g, m, r, x, y, z, full) {
    var d = new THREE.SphereGeometry(r, 16, 10, 0, PI * 2, 0, full ? PI : PI / 2); d.rotateX(PI / 2);
    var mm = new THREE.Mesh(d, m); mm.position.set(x, y, z); g.add(mm); return mm;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, j, x, z, k;

    /* ---------------- hull */
    var xs = [-126, -122, -116, -108, -98, -86, -72, -56, -40, -24, -8, 8, 24, 40, 54, 66, 78, 88, 97, 105,
              111, 116, 120, 123, 125, 126];
    hullPiece(THREE, g, T, xs);
    /* deck: the pad plate aft, the deck proper forward of it */
    var px = [], dx = [];
    for (x = PADX0; x < PADX1; x += 4.2) px.push(x);
    px.push(PADX1);
    g.add(ribbon(THREE, T.pad, px, function (xn) { return deckZ(xn) + 0.04; }, 0.02, 8,
      function (X, Y) { return [(X - PADX0) / (PADX1 - PADX0), (Y + PADW) / (2 * PADW)]; }));
    for (x = PADX1; x < 124; x += 4) dx.push(x);
    dx.push(124, 125.4);
    g.add(ribbon(THREE, T.deck, dx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 4));

    /* scuttle rows along the hull side, the hawse pipes */
    for (x = -120; x <= 110; x += 4.5) {
      for (s = -1; s <= 1; s += 2) {
        var zz = deckZ(x) - 1.6;
        box(THREE, g, 0.36, 0.06, 0.36, T.dark, xAt(x, zz), s * (sideY(x, zz) + 0.03), zz);
      }
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.0, 0.1, 1.0, T.dark, xAt(113.0, 8.6), s * (sideY(113.0, 8.6) + 0.02), 8.6);

    /* wall half-width of a hexa block at height z (for flush windows) */
    function hwz(ya, za, yb, zb, z) { return ya + (yb - ya) * (z - za) / (zb - za); }
    function wins(x0, dx, n, ya, za, yb, zb, z) {
      for (var sg = -1; sg <= 1; sg += 2) windows(THREE, g, T, x0, dx, n, hwz(ya, za, yb, zb, z) + 0.04, z, sg);
    }

    /* ---------------- aft: low deckhouse beside the gun, the Top Dome block */
    hexa(THREE, g, T.sup, -84.0, -71.0, 8.0, 7.0, -84.0, -71.0, 7.4, 11.4);
    box(THREE, g, 0.12, 6.0, 2.6, T.dark, -84.06, 0, 8.4);
    wins(-82.5, 3.4, 4, 8.0, 7.0, 7.4, 11.4, 9.6);
    /* the low aft block (profile: about 14 m above water) and the stepped block under the Top Dome */
    hexa(THREE, g, T.sup, -73.0, -49.0, 10.6, 7.0, -73.0, -49.0, 10.0, 14.5);
    wins(-70.0, 4.2, 5, 10.6, 7.0, 10.0, 14.5, 11.5);
    hexa(THREE, g, T.sup, -62.0, -44.0, 8.0, 14.5, -61.0, -45.0, 7.2, 18.0);
    wins(-59.0, 4.0, 4, 8.0, 14.5, 7.2, 18.0, 16.2);
    cylZ(THREE, g, 2.3, 2.5, 3.0, 16, T.sup, -52.0, 0, 19.5);
    dome(THREE, g, T.sup, 2.9, -52.0, 0, 24.2, true);
    /* the aft mast of the profile: the tapering uptake mack with the Fregat panel and a yard */
    hexa(THREE, g, T.sup, -47.0, -37.0, 5.0, 18.0, -45.0, -39.0, 2.4, 30.0);
    for (k = 0; k < 3; k++) {
      var zq = 20.5 + k * 3.4, wq = hwz(5.0, 18.0, 2.4, 30.0, zq);
      box(THREE, g, 4.2 - k * 0.5, 2 * wq + 0.8, 0.14, T.sup, -42.0, 0, zq);
    }
    box(THREE, g, 3.4, 2.6, 0.08, T.dark, -42.0, 0, 30.04);
    strut(THREE, g, T.metal, -42.0, 0, 30.0, -42.0, 0, 37.0, 0.14, 5);
    box(THREE, g, 0.3, 5.4, 3.0, T.metal, -43.2, 0, 33.2);
    box(THREE, g, 0.2, 6.0, 0.2, T.metal, -42.0, 0, 36.6);
    /* two Kashtan on the aft block roof */
    for (s = -1; s <= 1; s += 2) {
      var kg = new THREE.Group(); kg.position.set(-66.0, s * 7.0, 14.5); kg.rotation.z = s > 0 ? PI * 0.7 : -PI * 0.7;
      kashtan(THREE, kg, T); g.add(kg);
    }

    /* ---------------- midship house, the boats under their davits */
    hexa(THREE, g, T.sup, -37.0, -9.0, 12.2, 8.4, -37.0, -9.0, 10.8, 13.0);
    wins(-35.0, 3.7, 7, 12.2, 8.4, 10.8, 13.0, 11.0);
    for (s = -1; s <= 1; s += 2) {
      tprism(THREE, g, 9.4, 2.2, 10.2, 2.8, 1.2, T.sup, -20.5, s * 13.0, 11.0);
      box(THREE, g, 3.2, 1.9, 1.0, T.sup, -21.5, s * 13.0, 12.0);
      for (i = -1; i <= 1; i += 2) box(THREE, g, 0.45, 2.4, 1.0, T.metal, -20.5 + i * 3.0, s * 13.0, 10.2);
      strut(THREE, g, T.metal, -26.0, s * 13.2, 9.2, -26.0, s * 13.2, 15.2, 0.17, 6);
      strut(THREE, g, T.metal, -26.0, s * 13.2, 15.2, -22.0, s * 13.1, 13.2, 0.11, 5);
      tprism(THREE, g, 8.0, 2.0, 8.8, 2.6, 1.1, T.sup, -3.0, s * 13.0, 11.0);
    }

    /* ---------------- the big tower with the Top Pair (profile: shoulders to 38 m, a narrow shaft above) */
    hexa(THREE, g, T.sup, -25.5, -9.5, 7.6, 9.0, -24.0, -11.0, 5.8, 30.0);
    hexa(THREE, g, T.sup, -25.0, -12.0, 5.4, 30.0, -24.5, -12.5, 5.0, 38.0);
    hexa(THREE, g, T.sup, -18.5, -12.5, 2.6, 38.0, -17.5, -13.5, 1.8, 47.0);
    for (s = -1; s <= 1; s += 2) {
      dome(THREE, g, T.sup, 1.5, -22.0, s * 5.0, 31.0, false);
      windows(THREE, g, T, -23.0, 3.0, 4, hwz(7.6, 9.0, 5.8, 30.0, 18.0) + 0.04, 18.0, s);
      windows(THREE, g, T, -22.0, 2.6, 4, hwz(5.4, 30.0, 5.0, 38.0, 34.0) + 0.04, 34.0, s);
      windows(THREE, g, T, -22.0, 3.0, 4, hwz(7.6, 9.0, 5.8, 30.0, 25.0) + 0.04, 25.0, s);
    }
    box(THREE, g, 0.12, 8.0, 1.2, T.dark, -25.56, 0, 34.0);
    strut(THREE, g, T.metal, -15.2, 0, 47.0, -15.2, 0, 50.6, 0.18, 6);
    /* Top Pair: two lattice dishes back to back, leaning aft */
    for (s = -1; s <= 1; s += 2) {
      var tg = new THREE.Group(); tg.rotation.y = -0.45;
      tg.position.set(-14.4 + s * 0.65 * Math.cos(0.45), 0, 46.8 + s * 0.65 * Math.sin(0.45));
      lattice(THREE, tg, T, 8.0, 5.4, 0.6); g.add(tg);
    }
    box(THREE, g, 0.3, 6.4, 0.2, T.metal, -15.2, 0, 44.4);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -15.2, s * 2.8, 44.4, -14.8, s * 1.3, 47.2, 0.07, 4);

    /* ---------------- bridge block with the Top Domes (the foremast pyramid of v1 is not in the profile) */
    hexa(THREE, g, T.sup, -9.0, 17.0, 11.8, 8.4, -9.0, 17.0, 10.6, 17.5);
    hexa(THREE, g, T.sup, -9.0, 12.0, 9.6, 17.5, -8.5, 11.5, 8.8, 24.0);
    wins(-6.0, 3.6, 5, 11.8, 8.4, 10.6, 17.5, 12.0);
    wins(-6.0, 3.6, 5, 11.8, 8.4, 10.6, 17.5, 15.0);
    box(THREE, g, 0.12, 13.0, 1.1, T.dark, 17.06, 0, 14.0);
    for (s = -1; s <= 1; s += 2) {
      wins(-6.0, 3.6, 4, 9.6, 17.5, 8.8, 24.0, 20.5);
      /* bridge wings */
      box(THREE, g, 5.0, 2.6, 0.18, T.sup, 6.0, s * 10.0, 17.7);
      box(THREE, g, 5.0, 0.06, 0.9, T.metal, 6.0, s * 11.3, 18.2);
      box(THREE, g, 0.06, 2.6, 0.9, T.metal, 8.5, s * 10.0, 18.2);
      /* the big radome on each corner of the bridge roof (the 2000s photographs) */
      cylZ(THREE, g, 1.7, 1.8, 1.4, 12, T.sup, 9.0, s * 6.6, 24.7);
      dome(THREE, g, T.sup, 1.8, 9.0, s * 6.6, 25.4, false);
    }
    cylZ(THREE, g, 1.8, 2.0, 1.6, 14, T.sup, 2.5, 0, 24.8);
    dome(THREE, g, T.sup, 2.9, 2.5, 0, 26.4, true);
    strut(THREE, g, T.metal, 2.5, 0, 29.0, 2.5, 0, 32.5, 0.12, 5);
    box(THREE, g, 0.3, 2.6, 0.9, T.metal, 2.3, 0, 31.6);
    /* two Kashtan abreast the aft end of the bridge block, on the midship house */
    for (s = -1; s <= 1; s += 2) {
      var kb = new THREE.Group(); kb.position.set(-12.0, s * 9.4, 13.0); kb.rotation.z = s > 0 ? PI * 0.35 : -PI * 0.35;
      kashtan(THREE, kb, T);
      g.add(kb);
    }

    /* ---------------- forecastle (Kalinin bow photograph, from the bow): the 20 Granit
       hatches in a field of 4 across x 5 along against the bridge block, a white edge strip
       across its forward end, the two low blocks with a Kashtan each at its sides (port
       aft, starboard forward), twelve low round S-300F hatches ahead of the strip and two
       large deck hatches forward of them. Kinzhal modules: no photograph read shows them,
       so none are drawn. */
    box(THREE, g, 27.0, 16.0, 0.07, T.hatch, 34.0, 0, deckZ(34.0) + 0.06);
    for (i = 0; i < 5; i++) for (j = 0; j < 4; j++) {
      var gx = 23.6 + i * 4.9, gy = (j - 1.5) * 3.9, gzz = deckZ(gx) + 0.06;
      box(THREE, g, 4.5, 3.6, 0.26, T.deck, gx, gy, gzz + 0.13);
      box(THREE, g, 0.2, 3.3, 0.06, T.dark, gx + 1.8, gy, gzz + 0.29);
    }
    box(THREE, g, 1.0, 16.4, 0.5, T.sup, 47.6, 0, deckZ(47.6) + 0.25);
    tprism(THREE, g, 10.0, 4.2, 9.4, 3.8, 6.5, T.sup, 24.0, 10.6, 12.4);
    tprism(THREE, g, 13.0, 4.4, 12.4, 3.8, 6.5, T.sup, 41.0, -10.6, 12.4);
    var kf = new THREE.Group(); kf.position.set(25.0, 10.6, 15.65); kf.rotation.z = -0.3; kashtan(THREE, kf, T); g.add(kf);
    var kf2 = new THREE.Group(); kf2.position.set(37.5, -10.6, 15.65); kf2.rotation.z = 0.3; kashtan(THREE, kf2, T); g.add(kf2);
    for (i = 0; i < 3; i++) for (j = 0; j < 4; j++) {
      var sx = 54.0 + i * 6.2, sy = (j - 1.5) * 4.5;
      s300(THREE, g, T, sx, sy, deckZ(sx) + 0.04);
    }
    box(THREE, g, 7.0, 4.6, 0.45, T.deck, 77.0, 3.0, deckZ(77.0) + 0.22);
    box(THREE, g, 7.0, 4.6, 0.45, T.deck, 85.0, -4.0, deckZ(85.0) + 0.22);
    /* working gear: capstans, bollards, jackstaff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.6, 0.7, 0.7, 12, T.metal, 106.0, s * 2.4, deckZ(106.0) + 0.35);
      for (i = 0; i < 4; i++) cylZ(THREE, g, 0.24, 0.24, 0.6, 8, T.metal, 66 + i * 12, s * (sideY(66 + i * 12, deckZ(66 + i * 12)) - 1.0), deckZ(66 + i * 12) + 0.3);
      box(THREE, g, 1.6, 0.9, 0.5, T.metal, 112.0, s * 2.0, deckZ(112.0) + 0.25);
    }
    strut(THREE, g, T.metal, 125.4, 0, deckZ(125.4), 125.4, 0, deckZ(125.4) + 3.2, 0.05, 4);

    /* ---------------- railings: waist and forecastle edges (not at the pad) */
    function railRun(x0, x1) {
      for (var sg = -1; sg <= 1; sg += 2) {
        var prev = null, xq;
        for (xq = x0; xq <= x1; xq += 4.0) {
          var zd = deckZ(xq) + 0.04, yd = sg * (sideY(xq, deckZ(xq)) - 0.15), xx = xAt(xq, deckZ(xq));
          strut(THREE, g, T.metal, xx, yd, zd, xx, yd, zd + 1.0, 0.04, 3);
          if (prev) {
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.98, xx, yd, zd + 0.98, 0.025, 3);
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.5, xx, yd, zd + 0.5, 0.02, 3);
          }
          prev = [xx, yd, zd];
        }
      }
    }
    railRun(-72.0, -50.0);
    railRun(40.0, 112.0);

    /* ---------------- underwater: two shafts and screws */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.34, 0.34, 22.0, 8, T.metal, -114.0, s * 4.4, -5.0);
      strut(THREE, g, T.metal, -118.0, s * 4.4, -5.0, -118.0, s * 2.6, -3.4, 0.15, 4);
      cylX(THREE, g, 0.5, 0.65, 1.0, 8, T.metal, -125.0, s * 4.4, -5.0);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.7, 1.9), T.metal);
        bl.position.set(-125.0, s * 4.4, -5.0); bl.rotation.x = i * 2 * PI / 5 + 0.4;
        bl.translateZ(1.1); bl.rotation.y = 0.45; g.add(bl);
      }
    }

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -3.0, 0, 24.02);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -68.0, 0, 14.52);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -31.0, 0, 13.02);

    /* ---------------- trained mount: the twin AK-130 aft of the bridge, forward of the pad */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(-91.0, 0, deckZ(-91.0)); ak130(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }

  /* One mesh per material: bake every mesh under root into merged geometry */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      if (!geo.attributes.normal) geo.computeVertexNormals();
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
  return { build: build };
})();

UNIT_MODELS["pact_e90_cruiser"] = {
  len: 252,
  build: function (THREE, M, C) { return HeroPyotr.build(THREE, M, C); }
};
