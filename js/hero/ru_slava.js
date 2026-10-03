/* ==================== js/hero/ru_slava.js ===============================
   HERO MODEL -- Project 1164 "Atlant" (Slava class) guided-missile cruiser,
   lead ship as completed (Slava / Moskva, 1982).
   Keys: pact_e80_cruiser (the lead ship as completed), pact_e00_cruiser and
   cruiser_p (same build, see "PERIODS").
   Length overall 186.4 m, beam 20.8 m (js/warship_specs.js len 186.4 beam
   20.8), draught about 7.6 m (published figure, not from a fetched source).

   REFERENCES (Wikimedia Commons, fetched small; what each feature rests on):
     - "Slava class cruiser profile 1986.png" (recognition profile): every
       station and height below was scaled off it at 4.23 px/m with the
       waterline at the hull bottom - the deck at about 5 m aft rising to
       7.4 m forward and 8.8 m at the stem, the raked stem, the aft deckhouse
       at 9.9 m with the dome over it (top 16.8 m), the central box (top
       17.3 m), the main mast with the Top Pair at its head (29.5 m), the
       tapering foremast with the Top Steer at its top (36.4 m) and the low
       forward block under the twin gun (turret top 10 m at x = +64).
     - "Cruiser Slava aerial starboard 1983.jpg" and "Cruiser Slava elevated
       port view 1984.jpg" (USN, both from above): the plan - the round
       helicopter pad with its ring at the stern (about 23 m long), the aft
       deckhouse with the dome, the two oval groups of four flush hatches of
       the S-300F revolver launchers at 50 m from the stern, the two boats
       beside the central box, the big dark-roofed central box, the eight
       pairs of P-500 tubes (four pairs per side, about 12.4 m apart, each
       tube about 11.7 m, raised forward about 20 degrees) over rectangular
       dark openings in the hull side, the pyramid foremast, the bridge with
       its round top, the low forward block, the twin AK-130 in its round
       dome with the barrels forward.
     - "Project 1164 Moskva 2012 G2.jpg" (Sevastopol, port quarter) and
       "The Varyag (011) Cruiser - Side View.jpg" (Manila): the big Top Dome
       sphere on its block over the aft deckhouse, the lattice dishes of
       the Top Pair on the mast, the flat Top Steer panel at the head of
       the foremast, the round hatches and radomes on the bridge block, the
       boat and its davit beside the central box, the scuttle rows.
     - PAINT: sampled from the 2012 colour photograph - hull 0x888d95,
       superstructure 0x989fa9, Top Dome 0x949d9e; the deck, boot topping and
       anti-fouling kept dark and plain.
   PERIODS: pact_e00_cruiser ("unchanged apart from partial refits") and
   cruiser_p are registered to this build. Compared with the 1983-84 photographs,
   the 2009-2012 photographs of Moskva and Varyag show the same plan and the
   same masts, mounts and launchers at game scale; a post-refit photograph of
   Marshal Ustinov (2018-2020, bow and bridge views) shows the same tube banks,
   AK-130, forward block, tower and Top Pair mast as 1983; only antenna panel
   detail below about 3 m differs, and no photograph I read dates it. So no
   variant is drawn: one build for all three keys.
   CHECK-AND-FIX NOTES: the Top Pair is two dishes back to back leaning aft
   about 26 degrees (profile and 2012 photograph) over a pedestal; the long
   stay runs from the central box roof to the tower (profile), not from the
   mast head; the keel-point sliver in the hull cap was removed.
   NOT CONFIRMED and therefore not drawn or drawn plainly: the RBU-6000 (the
   photographs I read do not show where they stand - not drawn), the exact
   positions of the six AK-630 and their Bass Tilt directors (drawn at the
   plausible corners of the blocks), the Osa-M bins (drawn stowed as two round
   hatches on the forward block roof), the rudders, the hangar below the pad
   (only the dark door in the deckhouse face is drawn; there is no ramp or
   lift modelled), the antennas smaller than the Top Pair and Top Steer.
   No hull number, name or ensign.

   TRAINED MOUNT: the twin AK-130 forward is the group named "turret"
   (at rest pointing forward); everything else is baked.
   HELICOPTER PAD: one clean flat plate (x = -93.2 to -69.5, top z = 5.04)
   with only its painted ring; nothing stands on it and no rail runs round
   it. render3d's deckOf reads it from the aft eighth of the plan.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Every part
   is merged into one mesh per material (10 materials).
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSlava = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -93.2, XB = 93.2;
  var PADX0 = -93.2, PADX1 = -69.5, PADC = -81.6;

  var HW = [[-93.2, 5.8], [-86, 7.8], [-75, 9.0], [-55, 9.4], [30, 9.4], [45, 9.0], [58, 8.2],
            [68, 6.8], [76, 5.0], [84, 2.6], [90, 1.0], [93.2, 0.0]];
  var HD = [[-93.2, 7.0], [-90, 8.4], [-80, 9.8], [-65, 10.3], [-50, 10.4], [40, 10.4], [52, 10.0],
            [62, 9.2], [72, 7.4], [80, 5.4], [86, 3.4], [91, 1.5], [93.2, 0.3]];
  var KZ = [[-93.2, -3.2], [-85, -5.4], [-75, -7.2], [-62, -7.6], [93.2, -7.6]];
  var BP = [[-93.2, 1.8], [-70, 2.6], [-40, 3.2], [30, 3.2], [60, 2.4], [80, 1.6], [93.2, 1.3]];
  var FL = [[-93.2, 2.0], [0, 1.6], [40, 1.4], [93.2, 1.2]];
  var DZT = [[-93.2, 5.0], [-30, 5.0], [-10, 6.2], [8, 7.4], [50, 7.6], [75, 8.2], [93.2, 8.8]];
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
    if (z >= 0) return 82.0 + 11.2 * Math.min(1, z / 8.8);
    return 82.0 - 9.0 * Math.pow(Math.min(1, -z / 7.6), 1.5);
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
    var g = cv.getContext("2d"), R = rng(1164), i;
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
  var PADW = 8.6;
  function padTex(THREE) {
    if (TEX.pad) return TEX.pad;
    var W = 512, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(2024), i;
    var sx = W / (PADX1 - PADX0), sy = H / (2 * PADW);
    var px = function (X) { return (X - PADX0) * sx; };
    var py = function (Y) { return (1 - (Y + PADW) / (2 * PADW)) * H; };
    g.fillStyle = "#7b8285"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (i = -8; i <= 8; i += 2) { g.beginPath(); g.moveTo(0, py(i)); g.lineTo(W, py(i)); g.stroke(); }
    g.globalAlpha = 0.07;
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 50, 6 + R() * 24);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "#e4e6e0"; g.lineWidth = 5;
    g.beginPath(); g.arc(px(PADC), py(0), 5.0 * sx, 0, PI * 2); g.stroke();
    g.beginPath(); g.arc(px(PADC), py(0), 1.0 * sx, 0, PI * 2); g.stroke();
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
      hull:  skin(0x888d95, plateTex(THREE, [16, 1.2]), 0.86),
      boot:  skin(0x1b1f22, plateTex(THREE, [16, 1]), 0.9),
      under: skin(0x3f2622, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(0x989fa9, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(0x6c7173, plateTex(THREE, [12, 1.5]), 0.95),
      hatch: skin(0x4d5254, plateTex(THREE, [1, 1]), 0.9),
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

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, j, x, z;

    /* ---------------- hull */
    var xs = [-93.2, -90, -85, -78, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 48, 55, 62, 68,
              74, 79, 83, 86.5, 89, 91, 92.4, 93.2];
    hullPiece(THREE, g, T, xs);
    /* deck: the pad plate aft, the deck proper forward of it */
    var px = [], dx = [];
    for (x = PADX0; x < PADX1; x += 3) px.push(x);
    px.push(PADX1);
    g.add(ribbon(THREE, T.pad, px, function (xn) { return deckZ(xn) + 0.04; }, 0.02, 8,
      function (X, Y) { return [(X - PADX0) / (PADX1 - PADX0), (Y + PADW) / (2 * PADW)]; }));
    for (x = PADX1; x < 92.4; x += 3) dx.push(x);
    dx.push(92.4, 93.1);
    g.add(ribbon(THREE, T.deck, dx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 4));

    /* scuttle rows and the hawse pipes */
    for (x = -88; x <= 86; x += 4.0) {
      if (x > 4 && x < 59) continue;
      for (s = -1; s <= 1; s += 2) {
        var zz = deckZ(x) - 1.5;
        box(THREE, g, 0.34, 0.06, 0.34, T.dark, xAt(x, zz), s * (sideY(x, zz) + 0.03), zz);
      }
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.1, 0.9, T.dark, xAt(86.0, 6.6), s * (sideY(86.0, 6.6) + 0.02), 6.6);

    /* ---------------- aft deckhouse and the Top Dome */
    hexa(THREE, g, T.sup, -69.5, -48.5, 7.4, 4.8, -69.5, -48.5, 6.6, 9.9);
    hexa(THREE, g, T.sup, -64.0, -52.0, 5.4, 9.9, -63.5, -53.0, 4.8, 11.5);
    cylZ(THREE, g, 2.4, 2.6, 1.6, 16, T.sup, -58.5, 0, 12.3);
    var tdg = new THREE.SphereGeometry(3.0, 16, 10); tdg.rotateX(PI / 2);
    var td = new THREE.Mesh(tdg, T.sup); td.position.set(-58.5, 0, 13.7); g.add(td);
    /* the hangar door in the aft face, and windows */
    box(THREE, g, 0.12, 8.0, 3.4, T.dark, -69.56, 0, 6.7);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, -66.0 + i * 3.8, s * 6.97, 8.4);
      box(THREE, g, 0.12, 1.6, 1.0, T.dark, -69.56, s * 5.6, 8.5);
    }
    /* two AK-630 on the roof, aimed aft */
    for (s = -1; s <= 1; s += 2) {
      var a1 = new THREE.Group(); a1.position.set(-51.0, s * 5.7, 9.9); a1.rotation.z = PI; ak630(THREE, a1, T); g.add(a1);
    }

    /* ---------------- S-300F: two oval groups of four flush revolver hatches */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 15.2, 3.9, 0.06, T.hatch, -42.7, s * 2.35, 5.05 + 0.03);
      for (i = 0; i < 4; i++) {
        var hx = -42.7 + (i - 1.5) * 3.6;
        cylZ(THREE, g, 1.55, 1.55, 0.05, 16, T.dark, hx, s * 2.35, 5.11);
        box(THREE, g, 2.4, 0.1, 0.03, T.metal, hx, s * 2.35, 5.15);
        box(THREE, g, 0.1, 2.4, 0.03, T.metal, hx, s * 2.35, 5.15);
      }
    }

    /* boats and davits beside the central box */
    for (s = -1; s <= 1; s += 2) {
      tprism(THREE, g, 8.4, 2.0, 9.2, 2.6, 1.1, T.sup, -28.5, s * 8.7, 6.7);
      box(THREE, g, 3.0, 1.8, 0.9, T.sup, -29.5, s * 8.7, 7.7);
      for (i = -1; i <= 1; i += 2) box(THREE, g, 0.4, 2.2, 0.8, T.metal, -28.5 + i * 2.8, s * 8.7, 5.5);
      strut(THREE, g, T.metal, -33.8, s * 9.4, 5.1, -33.8, s * 9.4, 10.6, 0.17, 6);
      strut(THREE, g, T.metal, -33.8, s * 9.4, 10.6, -29.6, s * 9.3, 8.6, 0.11, 5);
    }

    /* ---------------- central box with its two uptake openings */
    hexa(THREE, g, T.sup, -31.0, -12.5, 6.8, 5.0, -31.0, -12.5, 6.4, 11.8);
    hexa(THREE, g, T.sup, -26.0, -14.5, 5.2, 11.8, -26.0, -14.5, 4.9, 17.2);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.6, 3.6, 0.05, T.dark, -20.2, s * 2.55, 17.22);
      box(THREE, g, 4.8, 0.2, 0.3, T.metal, -20.2, s * 4.4, 17.35);
      box(THREE, g, 4.8, 0.2, 0.3, T.metal, -20.2, s * 0.75, 17.35);
    }
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      box(THREE, g, 1.2, 0.08, 0.7, T.dark, -24.5 + i * 3.6, s * 5.22, 14.4);
      box(THREE, g, 1.0, 0.08, 0.6, T.dark, -29.0 + i * 4.2, s * 6.85, 8.8);
    }

    /* ---------------- central deckhouse and the main mast with the Top Pair */
    hexa(THREE, g, T.sup, -12.5, 8.5, 7.8, 5.8, -12.5, 8.5, 7.0, 11.0);
    hexa(THREE, g, T.sup, -10.5, -4.5, 3.0, 11.0, -9.0, -6.0, 1.4, 24.5);
    strut(THREE, g, T.metal, -7.5, 0, 24.5, -7.5, 0, 31.2, 0.2, 6);
    /* the Top Pair: two lattice dishes back to back, leaning aft about 26 degrees
       as the profile and the 2012 photograph show (a slab seen from the side) */
    for (s = -1; s <= 1; s += 2) {
      var dg = new THREE.Group(); dg.rotation.y = -0.45;
      dg.position.set(-7.5 + s * 0.65 * Math.cos(0.45), 0, 26.0 + s * 0.65 * Math.sin(0.45));
      lattice(THREE, dg, T, 7.4, 5.0, 0.6); g.add(dg);
    }
    box(THREE, g, 0.3, 6.0, 0.2, T.metal, -7.5, 0, 24.7);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -7.5, s * 2.6, 24.7, -7.5, s * 1.2, 27.0, 0.07, 4);
    [14.0, 18.0, 21.5].forEach(function (zq, k) {
      var f = (zq - 11.0) / 13.5, hy = 3.0 + (1.4 - 3.0) * f + 0.5, hx = 3.0 - f * 1.5;
      box(THREE, g, 2 * hx + 1.0, 2 * hy, 0.2, T.sup, -7.5, 0, zq);
    });
    /* two Bass Tilt style directors and two AK-630 on the deckhouse roof */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.7, 0.75, 0.9, 10, T.sup, 4.0, s * 5.2, 11.45);
      var sd = new THREE.SphereGeometry(0.7, 10, 5, 0, PI * 2, 0, PI / 2); sd.rotateX(PI / 2);
      var sm = new THREE.Mesh(sd, T.sup); sm.position.set(4.0, s * 5.2, 11.9); g.add(sm);
      var a2 = new THREE.Group(); a2.position.set(-1.0, s * 6.0, 11.0); a2.rotation.z = PI; ak630(THREE, a2, T); g.add(a2);
    }

    /* windows along the central deckhouse sides */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 9; i++) {
      box(THREE, g, 1.0, 0.08, 0.6, T.dark, -10.8 + i * 2.3, s * 7.15, 7.9);
      box(THREE, g, 1.0, 0.08, 0.6, T.dark, -10.8 + i * 2.3, s * 7.15, 9.5);
    }
    /* the long stay from the central box roof up to the tower (profile) */
    strut(THREE, g, T.metal, -14.5, 0, 17.4, 10.0, 0, 25.7, 0.05, 3);

    /* ---------------- bridge block and the pyramid foremast */
    hexa(THREE, g, T.sup, 8.0, 33.0, 8.4, 7.2, 8.0, 33.0, 7.4, 11.4);
    hexa(THREE, g, T.sup, 12.0, 33.0, 6.4, 11.4, 12.0, 31.5, 6.0, 15.2);
    cylZ(THREE, g, 2.7, 2.8, 1.3, 12, T.sup, 27.0, 0, 15.85);
    var kd = new THREE.SphereGeometry(1.3, 10, 6, 0, PI * 2, 0, PI / 2); kd.rotateX(PI / 2);
    var km = new THREE.Mesh(kd, T.sup); km.position.set(27.0, 0, 16.5); g.add(km);
    box(THREE, g, 0.12, 11.0, 0.95, T.dark, 32.55, 0, 13.4);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 8.0, 0.12, 0.85, T.dark, 24.0, s * 6.04, 13.4);
      for (i = 0; i < 5; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, 12.0 + i * 4.4, s * 7.45, 9.4);
    }
    /* bridge wings */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 5.0, 2.4, 0.16, T.sup, 27.5, s * 7.6, 14.9);
      box(THREE, g, 5.0, 0.06, 0.9, T.metal, 27.5, s * 8.75, 15.4);
      box(THREE, g, 0.06, 2.4, 0.9, T.metal, 30.0, s * 7.6, 15.4);
      for (i = 0; i < 4; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, 17.0 + i * 3.4, s * 6.45, 13.4);
    }
    /* the tower: tapering, the Top Steer at its head */
    hexa(THREE, g, T.sup, 9.0, 24.0, 5.0, 11.4, 11.5, 19.0, 1.8, 29.0);
    [[4.0, 19.0], [6.0, 22.0], [6.0, 26.0]].forEach(function (q) {
      var f = (q[1] - 11.4) / 17.6, w = 5.0 + (1.8 - 5.0) * f;
      box(THREE, g, q[0], 2 * w + 1.4, 0.18, T.sup, 14.5, 0, q[1]);
    });
    for (s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 6), T.sup);
      rd.position.set(11.5, s * 3.6, 19.0); g.add(rd);
      var rd2 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 6), T.sup);
      rd2.position.set(14.0, s * 3.0, 22.5); g.add(rd2);
    }
    strut(THREE, g, T.metal, 14.8, 0, 29.0, 14.5, 0, 36.4, 0.13, 5);
    box(THREE, g, 0.4, 3.2, 2.3, T.metal, 16.2, 0, 31.2, -0.15);
    box(THREE, g, 0.6, 0.4, 2.3, T.metal, 15.7, 0, 31.2);
    strut(THREE, g, T.metal, 14.6, -3.6, 33.2, 14.6, 3.6, 33.2, 0.06, 4);
    strut(THREE, g, T.metal, 14.6, -2.0, 35.0, 14.6, 2.0, 35.0, 0.05, 4);
    box(THREE, g, 1.0, 1.0, 0.3, T.metal, 14.5, 0, 36.5);

    /* ---------------- forward block with the tube banks */
    hexa(THREE, g, T.sup, 32.0, 58.7, 8.4, 7.2, 33.0, 58.0, 7.4, 11.0);
    for (s = -1; s <= 1; s += 2) {
      /* the gallery wall under each bank, dark openings in its face */
      box(THREE, g, 52.0, 1.9, 1.7, T.sup, 32.5, s * 9.35, 8.15);
      for (i = 0; i < 4; i++) {
        var xc = 12.3 + 12.4 * i;
        box(THREE, g, 2.8, 0.1, 1.2, T.dark, xc + 0.5, s * 10.32, 8.2);
        /* two tubes a pair, side by side, 11.7 m, raised forward 20 degrees */
        var tl = 20 * PI / 180, dxl = Math.cos(tl), dzl = Math.sin(tl);
        for (j = 0; j < 2; j++) {
          var ty = s * (8.45 + j * 1.15), tz = 11.0 + (j === 0 ? 0.35 : 0);
          tubeAx(THREE, g, T.sup, xc, ty, tz, 11.7, 0.6, 14, tl);
          tubeAx(THREE, g, T.dark, xc + dxl * 5.88, ty, tz + dzl * 5.88, 0.08, 0.56, 14, tl);
          tubeAx(THREE, g, T.metal, xc - dxl * 5.4, ty, tz - dzl * 5.4, 0.5, 0.64, 14, tl);
          tubeAx(THREE, g, T.metal, xc + dxl * 5.4, ty, tz + dzl * 5.4, 0.5, 0.64, 14, tl);
        }
        /* saddles */
        [-3.5, 3.5].forEach(function (tq) {
          var tzq = 11.0 + tq * dzl - 0.6;
          box(THREE, g, 0.9, 2.5, Math.max(0.2, tzq - 8.9), T.sup, xc + tq * dxl, s * 9.1, 8.9 + Math.max(0.2, tzq - 8.9) / 2);
        });
      }
    }
    /* Osa-M bins stowed as two round hatches, two AK-630 on the block roof */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 1.4, 1.5, 0.6, 14, T.sup, 47.5, s * 4.2, 11.3);
      cylZ(THREE, g, 1.0, 1.0, 0.06, 12, T.dark, 47.5, s * 4.2, 11.63);
      var a3 = new THREE.Group(); a3.position.set(38.0, s * 5.0, 11.0); ak630(THREE, a3, T); g.add(a3);
    }
    /* working light-rails of the forecastle: capstans, bollards, jackstaff, anchors */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.55, 0.65, 0.7, 12, T.metal, 80.5, s * 1.9, deckZ(80.5) + 0.35);
      for (i = 0; i < 3; i++) cylZ(THREE, g, 0.22, 0.22, 0.6, 8, T.metal, 62 + i * 8, s * (sideY(62 + i * 8, deckZ(62 + i * 8)) - 1.0), deckZ(62 + i * 8) + 0.3);
      box(THREE, g, 1.4, 0.8, 0.5, T.metal, 83.5, s * 1.8, deckZ(83.5) + 0.25);
    }
    cylZ(THREE, g, 0.8, 0.8, 0.5, 10, T.metal, 76.0, 0, deckZ(76.0) + 0.25);
    strut(THREE, g, T.metal, 92.9, 0, deckZ(92.9), 92.9, 0, deckZ(92.9) + 3.0, 0.05, 4);

    /* ---------------- railings: waist and forecastle edges (not at the pad) */
    function railRun(x0, x1) {
      for (var sg = -1; sg <= 1; sg += 2) {
        var prev = null, xq;
        for (xq = x0; xq <= x1; xq += 3.6) {
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
    railRun(-68.0, -49.0);
    railRun(-34.0, 5.0);
    railRun(59.0, 91.0);

    /* ---------------- underwater: two shafts and screws */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.32, 0.32, 18.0, 8, T.metal, -82.0, s * 3.8, -4.6);
      strut(THREE, g, T.metal, -86.0, s * 3.8, -4.6, -86.0, s * 2.4, -2.6, 0.14, 4);
      cylX(THREE, g, 0.45, 0.6, 0.9, 8, T.metal, -91.8, s * 3.8, -4.6);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 1.7), T.metal);
        bl.position.set(-91.8, s * 3.8, -4.6); bl.rotation.x = i * PI / 2 + 0.4;
        bl.translateZ(1.0); bl.rotation.y = 0.45; g.add(bl);
      }
    }

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.2, 4.0, 0.04, T.team, 41.0, 0, 11.02);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -67.0, 0, 9.92);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -28.6, 0, 11.82);

    /* ---------------- trained mount: the twin AK-130 */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(63.7, 0, deckZ(63.7)); ak130(THREE, tw, T);

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

["pact_e80_cruiser", "pact_e00_cruiser", "cruiser_p"].forEach(function (k) {
  UNIT_MODELS[k] = {
    len: 186.4,
    build: function (THREE, M, C) { return HeroSlava.build(THREE, M, C); }
  };
});
