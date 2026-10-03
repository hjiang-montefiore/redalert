/* ==================== js/hero/ru_sverdlov.js ============================
   HERO REFERENCE MODEL -- Project 68bis "Sverdlov" class gun cruiser as
   completed in the early 1950s (key pact_e50_cruiser).

   WHAT EACH FEATURE RESTS ON (references fetched for this model):
     - Profile drawing "Sverdlov-class cruiser profile 1986" (Wikimedia
       Commons): station of the four triple turrets (two forward, two aft),
       the tower bridge, the two funnels and the long quarterdeck. It is a
       LATER drawing, so only hull layout and gun positions were taken from
       it; the later lattice mast, the 1960s-80s radar fits and the missile
       conversions were NOT drawn.
     - Photograph "Sverdlov at the Coronation Naval Review 1953" (IWM A
       32576, Commons): 1950s state - flush deck with sheer, raked stem,
       pale-grey hull, tower bridge with pole foremast and a round director
       on top, forward funnel close abaft the tower, long boat deck, pole
       mainmast right ahead of the second funnel, raked black funnel caps.
     - Photographs of Sverdlov passing the Hoek van Holland, 1956 (Nationaal
       Archief, Commons): the same layout seen from the beam; superfiring
       turret pairs at both ends.
     - The row's own data (warship_specs.js: len 210, beam 22, two funnels,
       four triple 152 mm guns fore and aft, 100 mm in the waist, no
       helicopter) and published class figures: 210 m overall, 22 m beam,
       about 6.9 m draught.

   NOT CONFIRMED FROM THE REFERENCES (drawn generic, marked approximate):
     the exact radar types (a plain lattice air search array on the
     foremast head and a small array on the mainmast stand for the period
     sets), the exact count/positions of the 37 mm twins, the positions of
     the six 100 mm twins and the two torpedo tube groups along the waist,
     and the director housings on the tower. No pennant number, name,
     ensign or war marking is painted.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline at z = 0.
   The group named "turret" is the forward A turret (triple 152 mm B-38);
   everything else is baked. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSverdlov = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 210.0;

  /* Station table, stern to stem: x, half beam, deck height (sheer),
     keel height, topsides loft exponent, underbody loft exponent. */
  var STA = [
    [-105.0, 3.20, 5.70, -1.20, 0.20, 0.62],
    [-102.0, 5.00, 5.70, -3.00, 0.20, 0.60],
    [ -96.0, 7.00, 5.66, -5.00, 0.19, 0.58],
    [ -88.0, 8.70, 5.62, -6.10, 0.18, 0.55],
    [ -75.0, 10.00, 5.60, -6.70, 0.17, 0.52],
    [ -55.0, 10.80, 5.68, -6.90, 0.17, 0.50],
    [ -30.0, 11.00, 5.84, -6.90, 0.17, 0.50],
    [   0.0, 11.00, 6.04, -6.90, 0.17, 0.50],
    [  25.0, 10.80, 6.40, -6.88, 0.18, 0.52],
    [  45.0, 10.20, 6.90, -6.60, 0.22, 0.60],
    [  62.0,  9.00, 7.50, -6.00, 0.30, 0.76],
    [  75.0,  7.40, 8.20, -5.20, 0.40, 0.94],
    [  86.0,  5.50, 8.90, -4.00, 0.52, 1.12],
    [  95.0,  3.30, 9.50, -2.60, 0.66, 1.30],
    [ 101.0,  1.50, 9.95, -1.30, 0.80, 1.44],
    [ 105.0,  0.30, 10.20, -0.30, 0.94, 1.55]
  ];
  var Z_BOOT = 1.26, Z_TOP = 1.12;

  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i];
        var f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pick(x, 2); }
  function halfB(x) { return pick(x, 1); }

  /* ============================================================ textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* hull side: plating strakes and butts, a few freeing ports, weeping rust.
     No numbers, names or marks. u runs stern to stem, hf bottom to deck. */
  function sideElevation() {
    var W = 1024, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(5417), i, x, y;
    g.fillStyle = hx(0xaeb6ba); g.fillRect(0, 0, W, H);
    for (i = 0; i < 110; i++) {
      g.globalAlpha = R() < 0.5 ? 0.010 + R() * 0.020 : 0.04 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 26 + R() * 120, 7 + R() * 16);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(14,18,22,0.36)";
    for (i = 1; i < 10; i++) {
      g.lineWidth = (i === 4 || i === 7) ? 1.8 : 1.1;
      y = i * H / 10;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    g.lineWidth = 1.0; g.strokeStyle = "rgba(14,18,22,0.26)";
    for (i = 0; i < 10; i++) {
      var y0 = i * H / 10, y1 = (i + 1) * H / 10, off = (i % 2) * 13;
      for (x = off; x < W; x += 26) {
        g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
      }
    }
    g.fillStyle = "rgba(10,13,16,0.50)";
    for (i = 0; i < 24; i++) g.fillRect(110 + i * 36, 18 + (i % 3) * 3, 9, 4);
    for (i = 0; i < 40; i++) {
      var sx = 40 + i * 24, sy = 70 + (i % 2) * 14;
      g.beginPath(); g.arc(sx, sy, 2.1, 0, 6.3); g.fill();
      var g2 = g.createLinearGradient(0, sy, 0, sy + 30);
      g2.addColorStop(0, "rgba(62,34,18,0.34)");
      g2.addColorStop(1, "rgba(62,34,18,0.0)");
      g.fillStyle = g2; g.fillRect(sx - 1, sy, 1.5 + R() * 1.2, 36);
      g.fillStyle = "rgba(10,13,16,0.50)";
    }
    /* exhaust staining abaft the two funnels */
    [0.60, 0.45].forEach(function (u) {
      var ex = u * W;
      var g4 = g.createLinearGradient(ex, 0, ex - 140, 0);
      g4.addColorStop(0, "rgba(28,26,24,0.26)");
      g4.addColorStop(1, "rgba(28,26,24,0.0)");
      g.fillStyle = g4; g.fillRect(ex - 140, 0, 140, 36);
    });
    g.fillStyle = hx(0x050607); g.fillRect(0, H - 15, W, 15);
    g.fillStyle = hx(0x180d0a); g.fillRect(0, H - 5, W, 5);
    return cv;
  }
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var side = sideElevation();
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    g.fillStyle = hx(0x2a3035); g.fillRect(0, 0, W, H);
    g.drawImage(side, 0, 64);
    g.save(); g.translate(0, 64); g.scale(1, -1); g.drawImage(side, 0, 0); g.restore();
    g.save(); g.translate(0, 320); g.scale(1, -1); g.drawImage(side, 0, 0); g.restore();
    TEX.hull = finish(THREE, cv); return TEX.hull;
  }
  function underTex(THREE) {
    if (TEX.under) return TEX.under;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(3313), i;
    g.fillStyle = hx(0x0e0705); g.fillRect(0, 0, W, H);
    for (i = 0; i < 80; i++) {
      g.globalAlpha = 0.05 + R() * 0.09;
      g.fillStyle = R() < 0.5 ? "#2c1912" : "#0a0605";
      g.fillRect(R() * W, R() * H, 14 + R() * 60, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    TEX.under = finish(THREE, cv, [6, 3]); return TEX.under;
  }
  function plateTex(THREE) {
    if (TEX.plate) return TEX.plate;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(2287), i, x, y;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.18; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 7; i++) {
      g.beginPath(); g.moveTo(0, i * H / 7); g.lineTo(W, i * H / 7); g.stroke();
      g.beginPath(); g.moveTo(i * W / 7, 0); g.lineTo(i * W / 7, H); g.stroke();
    }
    g.globalAlpha = 0.08;
    for (i = 0; i < 30; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 58, 10 + R() * 38);
    }
    g.globalAlpha = 0.26; g.fillStyle = "#000000";
    for (i = 0; i < 9; i++) {
      x = R() * W; y = R() * H;
      g.fillRect(x, y, 11, 20);
      g.beginPath(); g.arc(x + 40 + R() * 30, y + 8, 2.6, 0, 6.3); g.fill();
    }
    g.globalAlpha = 0.14; g.fillStyle = "#141312";
    for (i = 0; i < 14; i++) g.fillRect(R() * W, 0, 3 + R() * 5, 20 + R() * 60);
    g.globalAlpha = 1;
    TEX.plate = finish(THREE, cv, [2, 2]); return TEX.plate;
  }
  /* weather deck: dark plating with grit (laid linoleum/non-skid read) */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(6151), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 22 + R() * 76, 16 + R() * 56);
    }
    g.globalAlpha = 0.24; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.28; g.fillStyle = "#000000";
    for (i = 0; i < 1200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv, [1, 1]); return TEX.deck;
  }

  /* ========================================================== materials
     Ten materials. Colours are final (sealed against prepModel's sRGB->
     linear pass, as the other ship heroes do). */
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({
        color: col, map: tex, roughness: r === undefined ? 0.87 : r, metalness: 0.06
      });
    };
    var M = {
      hull:  skin(0xffffff, hullTex(THREE), 0.86),
      boot:  skin(0x23272b, underTex(THREE), 0.88),
      under: skin(0xffffff, underTex(THREE), 0.90),
      sup:   skin(0xa2aaae, plateTex(THREE), 0.86),
      deck:  skin(0x7a8084, deckTex(THREE), 0.95),
      dark:  skin(0x070809, plateTex(THREE), 0.90),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: new THREE.MeshStandardMaterial({ color: 0x5a6268, roughness: 0.52, metalness: 0.50 }),
      mesh:  new THREE.MeshStandardMaterial({
        color: 0x3a4146, map: plateTex(THREE), roughness: 0.90,
        metalness: 0.10, side: THREE.DoubleSide
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x05090b, roughness: 0.10, metalness: 0.0,
        transparent: true, opacity: 0.84
      })
    };
    /* aliases so the shared helper vocabulary stays short (same objects) */
    M.sup2 = M.sup; M.canvas = M.sup; M.steel = M.metal; M.gun = M.metal; M.brass = M.metal;
    return M;
  }
  function sealMats(M) {
    for (var k in M) {
      if (!M.hasOwnProperty(k) || !M[k]) continue;
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ================================================== geometry helpers */
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z);
    if (ry) b.rotation.y = ry;
    p.add(b); return b;
  }
  function tbox(THREE, p, lx, ly, lz, top, m, x, y, z) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    var b = new THREE.Mesh(g, m); b.position.set(x, y, z); p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open);
    g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var g = new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true);
    var s = new THREE.Mesh(g, m);
    s.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* M.loft winds inward; flip it so single sided materials shade right */
  function loftMesh(THREE, M, secs, segs, m) {
    var g = M.loft(THREE, secs, segs), idx = g.getIndex(), i, t;
    if (idx) {
      var a = idx.array;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  /* a box that tapers independently in x and y: deckhouses, funnels */
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var ax = lx0 * 0.5, ay = ly0 * 0.5, bx = lx1 * 0.5, by = ly1 * 0.5, hz = lz * 0.5;
    var V = [[-ax, -ay, -hz], [ax, -ay, -hz], [ax, ay, -hz], [-ax, ay, -hz],
             [-bx, -by, hz], [bx, -by, hz], [bx, by, hz], [-bx, by, hz]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7],
             [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5],
             [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]];
      pos.push(v[0], v[1], v[2]);
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

  /* ================================================================ hull
     Three coaxial lofts (topsides, boot topping, anti-fouling) so the
     waterline knuckle is crisp; the lower two are pulled aft toward the
     stem, which gives the raked stem. */
  function hullSections(kind) {
    var A = [], i;
    for (i = 0; i < STA.length; i++) {
      var s = STA[i], x = s[0], w = s[1], dz = s[2], kz = s[3], rake = 0;
      if (kind !== "top" && x > 70)
        rake = (kind === "low" ? 3.0 : 1.9) * Math.pow((x - 70) / 35, 1.6);
      var xx = x - rake;
      if (kind === "top")
        A.push({ x: xx, w: w + 0.07, h: (dz - Z_TOP) * 0.5, zc: (dz + Z_TOP) * 0.5, sq: s[4] });
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.035, h: 0.72, zc: 0.54, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.18 - kz) * 0.5, zc: (0.18 + kz) * 0.5, sq: s[5] });
    }
    return A;
  }
  function buildHull(THREE, M, g, T) {
    g.add(loftMesh(THREE, M, hullSections("top"), 24, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 16, T.boot));
    g.add(loftMesh(THREE, M, hullSections("low"), 18, T.under));
    /* counter stern: cut off under the quarterdeck */
    tbox(THREE, g, 0.5, 6.6, 6.9, 0.86, T.hull, -104.9, 0, 2.25);
  }

  function deckRibbon(THREE, m, x0, x1, inset, dz) {
    var xs = [x0], i, j, NC = 3, pos = [], uv = [], idx = [];
    for (i = 0; i < STA.length; i++)
      if (STA[i][0] > x0 + 0.4 && STA[i][0] < x1 - 0.4) xs.push(STA[i][0]);
    for (i = 0; i < 4; i++) {
      var xe = x1 - (x1 - x0) * 0.04 * (i + 1);
      if (xe > x0 + 0.4) xs.push(xe);
    }
    xs.push(x1);
    xs.sort(function (a, b) { return a - b; });
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = Math.max(0.06, halfB(x) - inset), z = deckZ(x) + dz;
      for (j = 0; j <= NC; j++) {
        pos.push(x, w * (1 - 2 * j / NC), z);
        uv.push((x - x0) / 11.0, (w * 2) * (j / NC) / 11.0);
      }
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

  /* guardrails down both deck edges */
  function railRun(THREE, g, T, x0, x1, step, hgt, inset) {
    var s, x, n = Math.max(2, Math.round((x1 - x0) / step)), i, prev;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n;
        var y = s * (halfB(x) - inset), z = deckZ(x) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.045, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98,
                x, y, z + hgt * 0.98, 0.028, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.52,
                x, y, z + hgt * 0.52, 0.024, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  /* rail round a flat roof/platform rectangle (constant z) */
  function railBox(THREE, g, T, cx, cy, hl, hw, z, hgt) {
    var c = [[cx + hl, cy + hw], [cx + hl, cy - hw], [cx - hl, cy - hw], [cx - hl, cy + hw]];
    var i, j, n, a, b, t;
    for (i = 0; i < 4; i++) {
      a = c[i]; b = c[(i + 1) % 4];
      n = Math.max(2, Math.round(Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])) / 2.2));
      for (j = 0; j < n; j++) {
        t = j / n;
        strut(THREE, g, T.metal, a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z,
              a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z + hgt, 0.04, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt * 0.96, b[0], b[1], z + hgt * 0.96, 0.026, 3);
    }
  }

  /* ======================================== B-38 triple 152 mm turret
     Built about its ring centre, guns at +X. `tw` carries the whole house
     so the renderer can train it; the barbette is added fixed by the
     caller. */
  function turret152(THREE, g0, T) {
    var s, i;
    var g = new THREE.Group();     /* 12 percent up on the first pass: the B-38 house is some 10 m across */
    g.scale.set(1.12, 1.12, 1.12);
    g0.add(g);
    /* roller path ring (trains with the house) */
    cylZ(THREE, g, 4.5, 4.5, 0.25, 16, T.dark, 0, 0, 0.12);
    /* the house: sloped front, raked sides, flat roof */
    tprism(THREE, g, 8.4, 7.8, 6.8, 6.8, 3.0, T.sup, -0.5, 0, 1.75);
    tprism(THREE, g, 2.0, 6.6, 1.2, 5.6, 2.5, T.sup, 3.55, 0, 1.55);
    /* rear counterweight bulge */
    tprism(THREE, g, 2.0, 6.0, 1.6, 5.2, 2.6, T.sup, -5.0, 0, 1.60);
    /* roof hatches and the sighting hoods */
    box(THREE, g, 1.1, 1.0, 0.16, T.metal, -0.8, 1.8, 3.34);
    box(THREE, g, 1.1, 1.0, 0.16, T.metal, -0.8, -1.8, 3.34);
    box(THREE, g, 0.9, 0.7, 0.55, T.sup, 1.6, 2.6, 3.52);
    box(THREE, g, 0.9, 0.7, 0.55, T.sup, 1.6, -2.6, 3.52);
    /* guns, raised a little together */
    var e = new THREE.Group();
    e.position.set(0, 0, 1.9); e.rotation.y = -0.05;
    g.add(e);
    for (i = -1; i <= 1; i++) {
      var y = i * 1.60;
      cylX(THREE, e, 0.40, 0.46, 1.3, 8, T.metal, 4.45, y, 0.0);     /* blast bag/sleeve */
      cylX(THREE, e, 0.15, 0.21, 6.4, 8, T.metal, 7.5, y, 0.0, true); /* barrel */
      cylX(THREE, e, 0.19, 0.19, 0.30, 8, T.metal, 10.62, y, 0.0);    /* muzzle swell */
    }
    box(THREE, e, 0.5, 5.6, 0.34, T.dark, 3.85, 0, 0.0);
    return g0;
  }
  function barbette(THREE, g, T, x, h) {
    var z0 = deckZ(x);
    cylZ(THREE, g, 5.1, 5.5, h + 0.5, 16, T.sup, x, 0, z0 + h * 0.5 - 0.25);
  }

  /* ===================================== SM-5-1 twin 100 mm (shielded) */
  function sm5(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.25, 1.40, 0.45, 10, T.sup, 0, 0, 0.22);
    cylZ(THREE, g, 1.25, 1.35, 1.7, 10, T.sup, 0, 0, 1.25);
    var d = new THREE.SphereGeometry(1.25, 10, 3, 0, PI * 2, 0, PI * 0.42);
    d.scale(1, 1, 0.5);
    var dm = new THREE.Mesh(d, T.sup);
    dm.rotation.x = PI / 2; dm.position.set(0, 0, 2.1); g.add(dm);
    tprism(THREE, g, 1.1, 2.3, 0.8, 1.8, 1.2, T.sup, 1.2, 0, 1.4);
    var e = new THREE.Group();
    e.position.set(0, 0, 1.45); e.rotation.y = -0.22; g.add(e);
    for (s = -1; s <= 1; s += 2)
      cylX(THREE, e, 0.09, 0.12, 3.5, 6, T.metal, 2.9, s * 0.48, 0, true);
    return g;
  }
  /* ===================================== V-11 twin 37 mm (open shield) */
  function v11(THREE, g, T) {
    var s;
    cylZ(THREE, g, 0.45, 0.60, 0.8, 8, T.sup, 0, 0, 0.4);
    tprism(THREE, g, 1.6, 1.8, 1.3, 1.5, 0.9, T.sup, 0, 0, 1.2);
    box(THREE, g, 0.45, 1.6, 0.9, T.sup, 0.9, 0, 1.55);
    var e = new THREE.Group();
    e.position.set(0.4, 0, 1.45); e.rotation.y = -0.2; g.add(e);
    for (s = -1; s <= 1; s += 2)
      cylX(THREE, e, 0.045, 0.06, 2.3, 5, T.metal, 1.3, s * 0.38, 0, true);
    return g;
  }
  /* ===================================== quintuple 533 mm torpedo tubes */
  function ttube(THREE, g, T) {
    var i, rows = [[-0.62, 0.72], [0.0, 0.72], [0.62, 0.72], [-0.31, 1.32], [0.31, 1.32]];
    tprism(THREE, g, 7.4, 2.9, 7.0, 2.6, 0.5, T.sup, 0, 0, 0.25);
    for (i = 0; i < 5; i++)
      cylX(THREE, g, 0.30, 0.30, 7.8, 8, T.sup, 0.2, rows[i][0], 0.5 + rows[i][1], true);
    cylX(THREE, g, 0.10, 0.34, 0.6, 8, T.metal, 4.3, 0, 1.0);
    box(THREE, g, 1.2, 1.5, 0.7, T.metal, -2.2, 0, 2.1);
    return g;
  }
  /* ================================================ lattice radar array */
  function latticeArray(THREE, g, T, x, y, z, span, hgt, yaw) {
    var u = new THREE.Group();
    u.position.set(x, y, z); u.rotation.z = yaw || 0;
    g.add(u);
    var N = 6, i;
    box(THREE, u, 0.10, span, hgt, T.mesh, 0, 0, 0);
    box(THREE, u, 0.20, span + 0.2, 0.14, T.metal, 0, 0, hgt * 0.5);
    box(THREE, u, 0.20, span + 0.2, 0.14, T.metal, 0, 0, -hgt * 0.5);
    for (i = 0; i <= N; i++)
      box(THREE, u, 0.18, 0.10, hgt, T.metal, 0, (i / N - 0.5) * span, 0);
    box(THREE, u, 0.40, 0.5, 0.9, T.sup, -0.30, 0, -hgt * 0.5 - 0.4);
    return u;
  }
  /* round director drum with its rangefinder bar */
  function directorDrum(THREE, g, T, x, y, z, r, bar) {
    cylZ(THREE, g, r * 0.62, r * 0.80, 0.6, 12, T.sup, x, y, z + 0.3);
    cylZ(THREE, g, r, r, 1.5, 14, T.sup, x, y, z + 1.35);
    var d = new THREE.SphereGeometry(r, 14, 3, 0, PI * 2, 0, PI * 0.40);
    d.scale(1, 1, 0.45);
    var dm = new THREE.Mesh(d, T.sup);
    dm.rotation.x = PI / 2; dm.position.set(x, y, z + 2.1); g.add(dm);
    if (bar) {
      cylY(THREE, g, 0.18, 0.18, bar, 6, T.metal, x - 0.2, y, z + 2.45);
      box(THREE, g, 0.7, 0.6, 0.5, T.sup, x - 0.2, y + bar * 0.5, z + 2.45);
      box(THREE, g, 0.7, 0.6, 0.5, T.sup, x - 0.2, y - bar * 0.5, z + 2.45);
    }
  }
  function cylY(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open), m);
    c.position.set(x, y, z); p.add(c); return c;
  }

  /* ============================================================ funnel
     Oval-ish plated funnel, raked aft, black raked cap, steam pipe up the
     after face. */
  function funnel(THREE, g, T, x, z0, ht, l, w) {
    var f = new THREE.Group();
    f.position.set(x, 0, z0);
    f.rotation.y = -0.10;
    g.add(f);
    tprism(THREE, f, l, w, l * 0.84, w * 0.86, ht, T.sup, 0, 0, ht * 0.5);
    tprism(THREE, f, l * 1.04, w * 1.02, l * 0.94, w * 0.94, 2.0, T.dark, 0, 0, ht + 0.05);
    cylZ(THREE, f, l * 0.18, l * 0.18, 0.25, 10, T.dark, 0, w * 0.22, ht + 1.12);
    cylZ(THREE, f, l * 0.18, l * 0.18, 0.25, 10, T.dark, 0, -w * 0.22, ht + 1.12);
    strut(THREE, f, T.metal, -l * 0.44, 0.8, 0.5, -l * 0.44, 0.8, ht + 1.2, 0.08, 5);
    /* a gallery ring and the siren/steam pipes */
    tprism(THREE, f, l * 1.2, w * 1.2, l * 1.2, w * 1.2, 0.22, T.sup, 0, 0, ht * 0.62);
    return f;
  }

  /* pole mast with yardarms and a top mast whip */
  function poleMast(THREE, g, T, x, z0, z1, yard) {
    strut(THREE, g, T.metal, x, 0, z0, x, 0, z1, 0.24, 6);
    strut(THREE, g, T.metal, x - 1.6, 0.5, z0 + 0.3, x, 0, z0 + (z1 - z0) * 0.55, 0.12, 4);
    strut(THREE, g, T.metal, x - 1.6, -0.5, z0 + 0.3, x, 0, z0 + (z1 - z0) * 0.55, 0.12, 4);
    strut(THREE, g, T.metal, x - 0.2, -yard, z0 + (z1 - z0) * 0.72, x - 0.2, yard, z0 + (z1 - z0) * 0.72, 0.07, 4);
    strut(THREE, g, T.metal, x, 0, z1, x - 0.3, 0, z1 + 4.5, 0.06, 4);
    cylZ(THREE, g, 0.55, 0.55, 0.5, 8, T.sup, x, 0, z0 + (z1 - z0) * 0.88);
  }

  /* ---------------------------------------------------- draw-call merge
     render3d does not merge meshes: every mesh is a draw call per ship.
     Bake every mesh under `root` (not under a node in `skip`) into ONE
     mesh per material, in root's own frame. */
  function mergeInto(THREE, root, skip) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var buckets = [], list = [], mtx = new THREE.Matrix4();
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var a = o.parent;
      while (a && a !== root) { if (skip && skip.indexOf(a) >= 0) return; a = a.parent; }
      list.push(o);
    });
    list.forEach(function (o) {
      var b = null, i;
      for (i = 0; i < buckets.length; i++) if (buckets[i].m === o.material) { b = buckets[i]; break; }
      if (!b) { b = { m: o.material, p: [], n: [], u: [] }; buckets.push(b); }
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      mtx.multiplyMatrices(inv, o.matrixWorld);
      geo.applyMatrix4(mtx);
      var P = geo.getAttribute("position"), N = geo.getAttribute("normal"), U = geo.getAttribute("uv");
      if (!N) { geo.computeVertexNormals(); N = geo.getAttribute("normal"); }
      for (i = 0; i < P.count; i++) {
        b.p.push(P.getX(i), P.getY(i), P.getZ(i));
        b.n.push(N.getX(i), N.getY(i), N.getZ(i));
        if (U) b.u.push(U.getX(i), U.getY(i)); else b.u.push(0, 0);
      }
      o.parent.remove(o);
      o.geometry.dispose();
    });
    buckets.forEach(function (b) {
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.p, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.n, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.u, 2));
      var m = new THREE.Mesh(g, b.m);
      m.castShadow = true; m.receiveShadow = true;
      root.add(m);
    });
  }

  /* ================================================================ BUILD */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z, k;

    buildHull(THREE, M, g, T);
    g.add(deckRibbon(THREE, T.deck, -104.4, 104.4, 0.02, 0.04));

    /* ---------------------------------------------- main armament */
    /* positions from the profile drawing: A +67, B +54 (superfiring),
       X -51 (superfiring), Y -66. */
    barbette(THREE, g, T, 67.0, 0.9);
    barbette(THREE, g, T, 54.0, 3.4);
    barbette(THREE, g, T, -51.0, 3.4);
    barbette(THREE, g, T, -66.0, 0.9);

    var tw = new THREE.Group();            /* the trained "turret": A */
    tw.name = "turret";
    tw.position.set(67.0, 0, deckZ(67.0) + 0.9);
    turret152(THREE, tw, T);
    g.add(tw);

    var tB = new THREE.Group();
    tB.position.set(54.0, 0, deckZ(54.0) + 3.4);
    turret152(THREE, tB, T); g.add(tB);
    var tX = new THREE.Group();
    tX.position.set(-51.0, 0, deckZ(-51.0) + 3.4); tX.rotation.z = PI;
    turret152(THREE, tX, T); g.add(tX);
    var tY = new THREE.Group();
    tY.position.set(-66.0, 0, deckZ(-66.0) + 0.9); tY.rotation.z = PI;
    turret152(THREE, tY, T); g.add(tY);

    /* ------------------------------------------- superstructure */
    var z01 = deckZ(10) + 3.0;             /* roof of the 01 house */
    /* 01 deck house: long, from the tower to the after control position */
    tprism(THREE, g, 70.0, 14.0, 69.0, 13.4, 3.0, T.sup, 5.0, 0, z01 - 1.5);
    tprism(THREE, g, 19.0, 11.0, 18.4, 10.5, 3.0, T.sup, -38.5, 0, z01 - 1.5);
    /* 02 level amidships: the boat-deck house between the tower and the after funnel */
    var z02 = z01 + 2.8;
    tprism(THREE, g, 44.0, 11.4, 43.0, 10.8, 2.8, T.sup, 0.0, 0, z01 + 1.4);
    /* the tower bridge, in four tiers */
    tprism(THREE, g, 17.0, 11.6, 16.2, 11.0, 3.0, T.sup, 31.5, 0, z01 + 1.5);   /* to +3.0  */
    tprism(THREE, g, 13.0, 9.6, 12.4, 9.0, 3.2, T.sup, 31.5, 0, z01 + 4.6);     /* to +6.2  */
    tprism(THREE, g, 9.0, 7.4, 8.4, 6.8, 3.0, T.sup, 30.5, 0, z01 + 7.7);       /* to +9.2  */
    tprism(THREE, g, 6.0, 5.6, 5.4, 5.0, 2.4, T.sup, 30.0, 0, z01 + 10.4);      /* to +11.6 */
    /* bridge front: eyebrow and glazing on the pilothouse tiers */
    box(THREE, g, 0.35, 8.6, 1.2, T.glass, 37.9, 0, z01 + 4.9);
    box(THREE, g, 1.4, 9.4, 0.22, T.sup, 38.4, 0, z01 + 6.3);
    box(THREE, g, 0.35, 5.8, 1.0, T.glass, 34.9, 0, z01 + 7.9);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 5.0, 0.35, 1.0, T.glass, 33.5, s * 4.9, z01 + 4.9);
      /* open bridge wings at the second tier floor */
      box(THREE, g, 7.0, 3.2, 0.22, T.sup, 33.0, s * 7.2, z01 + 3.0);
      box(THREE, g, 7.0, 0.14, 1.0, T.sup, 33.0, s * 8.7, z01 + 3.6);
      box(THREE, g, 0.14, 3.0, 1.0, T.sup, 36.5, s * 7.2, z01 + 3.6);
      cylZ(THREE, g, 0.45, 0.45, 0.8, 10, T.sup, 31.0, s * 8.0, z01 + 3.5);
      var m37 = new THREE.Group();
      m37.position.set(36.0, s * 6.3, z01 + 3.1); m37.rotation.z = s * 0.25;
      v11(THREE, m37, T); g.add(m37);
    }
    /* round director on the tower top (period gunnery director) */
    directorDrum(THREE, g, T, 31.2, 0, z01 + 11.6, 1.8, 5.4);
    railBox(THREE, g, T, 31.5, 0, 6.0, 4.6, z01 + 6.2, 1.0);

    /* foremast: plain pole with a yard (no radar set is drawn: the 1950s photographs are too small to name one) */
    poleMast(THREE, g, T, 28.2, z01 + 11.6, z01 + 28.0, 3.2);
    box(THREE, g, 1.4, 0.6, 0.5, T.sup, 28.0, 1.3, z01 + 20.5);

    /* funnels */
    funnel(THREE, g, T, 8.0, z01, 11.5, 7.0, 7.0);
    funnel(THREE, g, T, -24.5, z01, 10.5, 7.0, 7.0);

    /* mainmast, just ahead of the second funnel */
    poleMast(THREE, g, T, -15.5, z02, z01 + 25.0, 2.6);

    /* ----------------------------- boats and davits on the boat deck */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        var bsec = [], q, bx0 = -2.0 - k * 9.4;
        for (q = 0; q <= 6; q++) {
          var t = q / 6, bwid = 0.95 * Math.sin(PI * Math.pow(t, 0.75)) + 0.18;
          bsec.push({ x: bx0 - 4.2 + t * 8.4, w: Math.max(0.10, bwid), h: 0.68, zc: 0, sq: 0.55 });
        }
        var bt = loftMesh(THREE, M, bsec, 10, T.sup);
        bt.position.set(0, s * 6.7, z01 + 0.9); g.add(bt);
        for (q = -1; q <= 1; q += 2) {
          strut(THREE, g, T.metal, bx0 + q * 3.3, s * 5.2, z01 + 0.1, bx0 + q * 3.3, s * 7.3, z01 + 2.4, 0.15, 5);
          strut(THREE, g, T.metal, bx0 + q * 3.3, s * 7.3, z01 + 2.4, bx0 + q * 3.3, s * 6.7, z01 + 1.5, 0.09, 4);
        }
      }
      /* life-raft canisters inboard of the boats */
      for (i = 0; i < 4; i++)
        cylX(THREE, g, 0.36, 0.36, 1.3, 8, T.sup, -3.0 - i * 4.4, s * 4.9, z02 + 0.5);
    }
    /* ------------------------------------------------ 100 mm in the waist */
    var xs100 = [29.0, -2.0, -36.0];
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) {
      var m100 = new THREE.Group();
      m100.position.set(xs100[i], s * 8.4, deckZ(xs100[i]) + 0.05);
      sm5(THREE, m100, T); g.add(m100);
    }
    /* 37 mm twins: abaft the funnels and on the after house roof */
    var p37 = [[-7.0, 2.6, z02], [-31.0, 4.0, z01], [-46.5, 3.2, z01],
               [-56.0, 7.0, deckZ(-56.0)]];
    for (s = -1; s <= 1; s += 2) for (i = 0; i < p37.length; i++) {
      var mm = new THREE.Group();
      mm.position.set(p37[i][0], s * p37[i][1], p37[i][2]);
      mm.rotation.z = (p37[i][0] < -40) ? PI + s * 0.25 : 0;
      v11(THREE, mm, T); g.add(mm);
    }
    /* after house: roof and director */
    tprism(THREE, g, 6.0, 7.0, 5.4, 6.4, 2.6, T.sup, -40.0, 0, z01 + 1.3);
    directorDrum(THREE, g, T, -40.0, 0, z01 + 2.6, 1.1, 0);
    /* torpedo tubes: two quintuple banks (positions approximate) */
    for (s = -1; s <= 1; s += 2) {
      var tb = new THREE.Group();
      tb.position.set(-34.0, s * 7.3, deckZ(-34) + 0.05);
      ttube(THREE, tb, T); g.add(tb);
    }

    /* ----------------------------------------------- deck fittings */
    for (s = -1; s <= 1; s += 2) {
      /* ventilator cowls along the 01 house roof */
      for (i = 0; i < 5; i++) {
        var vx = 20.0 - i * 5.0;
        cylZ(THREE, g, 0.30, 0.30, 0.9, 8, T.sup, vx, s * 4.2, z02 + 0.45);
        cylZ(THREE, g, 0.48, 0.30, 0.3, 8, T.sup, vx, s * 4.2, z02 + 1.05);
      }
      /* capstans and bollards on the forecastle, hawse anchors */
      cylZ(THREE, g, 0.50, 0.65, 0.7, 10, T.metal, 92.0, s * 1.6, deckZ(92) + 0.35);
      var an = new THREE.Group();
      an.position.set(95.0, s * (halfB(95.0) + 0.02), deckZ(95.0) - 2.0);
      g.add(an);
      box(THREE, an, 2.6, 0.16, 0.40, T.metal, 0, 0, 0.55);
      box(THREE, an, 0.40, 0.16, 1.9, T.metal, 0, 0, -0.35);
      box(THREE, an, 1.0, 0.14, 0.44, T.metal, -0.7, 0, -1.2, 0.42);
      box(THREE, an, 1.0, 0.14, 0.44, T.metal, 0.7, 0, -1.2, -0.42);
      /* lockers on the forecastle and quarterdeck */
      box(THREE, g, 2.2, 1.1, 1.0, T.sup, 80.0, s * 3.4, deckZ(80) + 0.5);
      box(THREE, g, 2.2, 1.1, 1.0, T.sup, -84.0, s * 3.6, deckZ(-84) + 0.5);
    }
    cylZ(THREE, g, 0.55, 0.70, 0.7, 10, T.metal, -90.0, 0, deckZ(-90) + 0.35);
    strut(THREE, g, T.metal, 103.0, 0, deckZ(103), 103.0, 0, deckZ(103) + 3.0, 0.07, 5);
    strut(THREE, g, T.metal, -103.0, 0, deckZ(-103), -103.0, 0, deckZ(-103) + 3.6, 0.07, 5);
    for (s = -1; s <= 1; s += 2)
      strut(THREE, g, T.metal, -23.0, s * 5.0, z01, -24.6, s * 5.6, z01 + 7.0, 0.05, 3);

    /* ---------------------------------------- underwater gear */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.40, 0.40, 14.0, 8, T.metal, -83.0, s * 4.6, -4.8, true);
      strut(THREE, g, T.metal, -91.0, s * 4.6, -4.8, -93.0, s * 6.6, -2.6, 0.28, 5);
      strut(THREE, g, T.metal, -91.0, s * 4.6, -4.8, -93.2, s * 3.0, -2.9, 0.28, 5);
      cylX(THREE, g, 0.62, 0.95, 1.2, 10, T.metal, -92.4, s * 4.6, -4.5);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.6, 1.6), T.metal);
        bl.position.set(-92.4, s * 4.6, -4.5);
        bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(1.05);
        bl.rotation.y = 0.45;
        g.add(bl);
      }
    }
    box(THREE, g, 3.6, 0.40, 4.8, T.metal, -102.0, 0, -2.6);

    /* ---------------------------------------------------- railings */
    railRun(THREE, g, T, -102.0, -72.0, 5.4, 1.10, 0.22);
    railRun(THREE, g, T, -22.0, 20.0, 6.0, 1.10, 0.22);
    railRun(THREE, g, T, 38.0, 62.0, 5.6, 1.10, 0.22);
    railRun(THREE, g, T, 74.0, 100.0, 5.6, 1.10, 0.22);

    /* ------------------------------- team: three small flat strips */
    box(THREE, g, 4.0, 1.0, 0.04, T.team, 16.0, 0, z02 + 0.03);
    box(THREE, g, 4.0, 1.0, 0.04, T.team, -9.0, 0, z02 + 0.03);
    box(THREE, g, 4.0, 1.0, 0.04, T.team, -86.0, 0, deckZ(-86) + 0.03);

    mergeInto(THREE, tw, null);
    mergeInto(THREE, g, [tw]);
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e50_cruiser"] = {
  len: 210.0,
  build: function (THREE, M, C) { return HeroSverdlov.build(THREE, M, C); }
};
