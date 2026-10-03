/* ==================== js/hero/ru_kotlin.js ===============================
   HERO MODEL -- Project 56 "Kotlin" class destroyer AS BUILT (1955-58),
   Soviet name Spokoynyy type. Registered for the row pact_e50_destroyer
   ("Project 56 Kotlin"). Not the 56-PLO, 56-K, 56-A or 56-M conversions.

   WHAT EACH FEATURE RESTS ON (and what could not be confirmed):
   - LAYOUT (rework pass): the as-built layout is built from the most
     authoritative as-built drawing found, the Navypedia standard-scale
     side and plan drawing "Spravedlivyy 1960" (ship 709 before her 1970
     conversion to 56AE; navypedia.org, Spokoynyy destroyers page). NO
     PHOTOGRAPH OF AN UNCONVERTED SHIP'S AFTER HALF WAS FOUND (Commons has
     only conversions and distant views), so the after half follows that
     drawing. The ru.wikipedia ship article "Eskadrennye minonostsy
     proekta 56" confirms it in words: three superstructures (bow, middle,
     after) carrying the four 45 mm mounts "in a rhombus"; mount No. 1 on
     the bow superstructure on the centreline (the 56-PLO text puts its
     RBU-2500s "left and right of the bow 45 mm mount"); mounts No. 2 and
     3 "on the sides of the middle superstructure"; the yawl on the middle
     superstructure to port abaft the 45 mm; the command launch on the
     upper deck to starboard of the bow superstructure and the motor
     launch to port; life rafts on the funnel casings and beside mount
     No. 1; and the 56-K text lists what lay abaft the FORWARD tubes:
     after tubes, after 45 mm, mounts No. 2 and 3, after 130 mm turret
     and the mainmast. Positions read off the drawing (metres from
     amidships, +forward): turret 41, bow house 25-35.5 with mount No. 1
     at 29.6, bridge 13-25, foremast 12.4, funnel No. 1 7-11.5, forward
     tubes -1 to 6, middle house -18.8 to -0.7 with funnel No. 2 at -16.4,
     mounts No. 2/3 at -5.4, a lattice mainmast at -4.4 and a director
     pedestal at -8.8, after tubes -26 to -19, after house -33 to -26.3
     with mount No. 4 and a small director tower at -34, after 130 mm
     twin on the quarterdeck at -40.5, a low house at -51.5 to -47.5, the
     throwers right aft, mine rails along both sides.
   - Principal dimensions: ru.wikipedia ship card: 126.1 m overall,
     12.76 m beam, 4.26 m draught, 34.5 m overall height from the
     baseline (mast top about 30.3 m over the waterline).
   - Armament as built (same card; Navypedia agrees): 2 x 2 130 mm
     SM-2-1, 4 x 4 45 mm SM-20-ZIF, 2 x 5 533 mm PTA-53-56, 6 BMB-2
     throwers and two UNDER-DECK depth charge droppers (so no deck racks:
     only their transom hatches are drawn), mine rails (36-50 mines).
     Navypedia lists 2 x Fut-B radars: drawn as the two small director
     antennas the drawing shows (middle superstructure, after tower).
   - Foremast tripod with the Slim Net (Fut-N) array as js/eras.js names
     it, bridge tiers, funnel shape and hull lines: as before, from the
     photographs (Vyderzhannyy c1973, the c1973 Mediterranean view) and
     the Spokoynyy-class profile, re-placed to the drawing's stations.
     Funnel tops lowered to about the bridge roof level, as the drawing
     and the c1973 photographs show (about 13.6 and 12.6 m).
   - Mainmast antenna: the drawing shows a small antenna at the masthead;
     its type is NOT identified, so it is drawn generic. The low house on
     the quarterdeck is in the drawing; its use is NOT identified.
   - Paint: period mid-to-light grey, as the photographs read and as the
     Sverdlov hero uses (hull 0xaeb6ba, superstructure 0xa2aaae, deck
     0x7a8084); black funnel caps. No hull numbers, names, ensigns or
     markings (team colour carries the owner): three small flat strips.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. The group
   named "turret" is the forward 130 mm twin mount; everything else baked.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKotlin = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 126.1;

  /* station table, stern to stem: x, half beam, deck height, keel height,
     topsides squareness, underbody squareness */
  var STA = [
    [-63.0, 3.50, 4.02, -0.95, 0.20, 0.62],
    [-60.0, 4.90, 4.05, -2.35, 0.20, 0.60],
    [-54.0, 5.75, 4.12, -3.70, 0.19, 0.57],
    [-44.0, 6.25, 4.25, -4.12, 0.18, 0.53],
    [-30.0, 6.38, 4.45, -4.20, 0.17, 0.50],
    [-14.0, 6.38, 4.60, -4.20, 0.17, 0.50],
    [  0.0, 6.36, 4.76, -4.20, 0.17, 0.50],
    [ 14.0, 6.22, 5.00, -4.15, 0.18, 0.54],
    [ 26.0, 5.80, 5.38, -4.00, 0.22, 0.62],
    [ 38.0, 5.00, 5.95, -3.60, 0.30, 0.78],
    [ 48.0, 3.90, 6.55, -2.90, 0.40, 0.96],
    [ 55.0, 2.60, 7.05, -1.90, 0.52, 1.14],
    [ 60.0, 1.30, 7.45, -0.95, 0.70, 1.32],
    [ 63.0, 0.30, 7.75, -0.20, 0.92, 1.50]
  ];
  var Z_TOP = 1.10;

  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pickC(x, 2); }
  function halfB(x) { return pickC(x, 1); }

  /* ------------------------------------------------------------ textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  function sideElevation() {
    var W = 1024, H = 128, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(5521), i, y;
    g.fillStyle = hx(0xaeb6ba); g.fillRect(0, 0, W, H);
    for (i = 0; i < 110; i++) {
      g.globalAlpha = 0.03 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 26 + R() * 110, 6 + R() * 14);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(20,26,30,0.34)"; g.lineWidth = 1.2;
    for (i = 1; i < 10; i++) {
      y = i * H / 10;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    /* scuttles and a few freeing ports, small enough to be paint */
    g.fillStyle = "rgba(14,18,22,0.55)";
    for (i = 0; i < 30; i++) {
      g.beginPath(); g.arc(150 + i * 25, 52 + (i % 2) * 9, 2.0, 0, 6.3); g.fill();
    }
    g.fillStyle = "rgba(60,36,22,0.30)";
    for (i = 0; i < 24; i++) g.fillRect(160 + i * 31, 56, 1.6, 22 + R() * 14);
    /* boot topping and anti-fouling bands */
    g.fillStyle = hx(0x0a0c0e); g.fillRect(0, H - 15, W, 15);
    g.fillStyle = hx(0x2a1410); g.fillRect(0, H - 5, W, 5);
    return cv;
  }
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var side = sideElevation(), W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    g.fillStyle = hx(0x14181b); g.fillRect(0, 0, W, H);
    g.drawImage(side, 0, 64);
    g.save(); g.translate(0, 64); g.scale(1, -1); g.drawImage(side, 0, 0); g.restore();
    g.save(); g.translate(0, 320); g.scale(1, -1); g.drawImage(side, 0, 0); g.restore();
    TEX.hull = finish(THREE, cv); return TEX.hull;
  }
  function underTex(THREE) {
    if (TEX.under) return TEX.under;
    var W = 128, H = 128, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(77), i;
    g.fillStyle = hx(0x3a1a12); g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.08 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#5a2c20" : "#150a08";
      g.fillRect(R() * W, R() * H, 10 + R() * 40, 6 + R() * 20);
    }
    TEX.under = finish(THREE, cv, [6, 3]); return TEX.under;
  }
  function plateTex(THREE) {
    if (TEX.plate) return TEX.plate;
    var W = 128, H = 128, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(2287), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.07;
    for (i = 0; i < 20; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 10 + R() * 30, 6 + R() * 20);
    }
    g.globalAlpha = 0.25; g.fillStyle = "#000000";
    for (i = 0; i < 6; i++) g.fillRect(R() * W, R() * H, 6, 11);
    g.globalAlpha = 1;
    TEX.plate = finish(THREE, cv, [2, 2]); return TEX.plate;
  }
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 128, H = 128, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(6151), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.22; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
    for (i = 1; i < 5; i++) {
      g.beginPath(); g.moveTo(0, i * H / 5); g.lineTo(W, i * H / 5); g.stroke();
      g.beginPath(); g.moveTo(i * W / 5, 0); g.lineTo(i * W / 5, H); g.stroke();
    }
    g.globalAlpha = 0.28; g.fillStyle = "#000000";
    for (i = 0; i < 500; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv, [1, 1]); return TEX.deck;
  }

  /* ten materials: hull, under, deck, sup, sup2, dark, team, metal, gun, glass */
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    var M = {
      hull:  skin(0xffffff, hullTex(THREE), 0.86),
      under: skin(0xffffff, underTex(THREE), 0.90),
      deck:  skin(0x7a8084, deckTex(THREE), 0.95),
      sup:   skin(0xa2aaae, plateTex(THREE), 0.86),
      sup2:  skin(0x8c9498, plateTex(THREE), 0.88),
      dark:  skin(0x070809, plateTex(THREE), 0.90),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5a6268, 0.52, 0.50),
      gun:   metal(0x3a4146, 0.50, 0.55),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x05090b, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.84
      })
    };
    for (var k in M) {
      if (!M.hasOwnProperty(k)) continue;
      M[k].userData = M[k].userData || {};
      M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ------------------------------------------------------------- helpers */
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z);
    if (ry) b.rotation.y = ry;
    p.add(b); return b;
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
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
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

  /* ---------------------------------------------------------------- hull */
  /* the table resampled every ~3.2 m (smoothstep between stations) so the
     sheer, the flare and the bow lines come out as curves, not as chords */
  function pickC(x, k) {   /* Catmull-Rom through the stations */
    var i = 1, a, b, c, d, t, t2, t3;
    while (i < STA.length - 1 && x > STA[i][0]) i++;
    b = STA[i - 1]; c = STA[i];
    a = STA[Math.max(0, i - 2)]; d = STA[Math.min(STA.length - 1, i + 1)];
    t = (x - b[0]) / (c[0] - b[0]); t2 = t * t; t3 = t2 * t;
    var v = 0.5 * ((2 * b[k]) + (-a[k] + c[k]) * t +
      (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * t2 + (-a[k] + 3 * b[k] - 3 * c[k] + d[k]) * t3);
    var lo = Math.min(b[k], c[k]), hi = Math.max(b[k], c[k]);
    return Math.max(lo - 0.15 * (hi - lo), Math.min(hi + 0.15 * (hi - lo), v));
  }
  var DENSE = (function () {
    var out = [], x, k, N = 34, r, i;
    for (i = 0; i <= N; i++) {
      /* finer toward the bow, where the shapes change fastest */
      x = STA[0][0] + (STA[STA.length - 1][0] - STA[0][0]) * (1 - Math.pow(1 - i / N, 1.25));
      r = [x];
      for (k = 1; k < 6; k++) r.push(pickC(x, k));
      out.push(r);
    }
    return out;
  })();
  function hullSections(kind) {
    var A = [], i;
    for (i = 0; i < DENSE.length; i++) {
      var s = DENSE[i], x = s[0], w = s[1], dz = s[2], kz = s[3], rake = 0;
      if (kind !== "top" && x > 26)
        rake = (kind === "low" ? 2.9 : 1.9) * Math.pow((x - 26) / 37, 1.6);
      var xx = x - rake;
      if (kind === "top")
        A.push({ x: xx, w: w + 0.06, h: (dz - Z_TOP) * 0.5, zc: (dz + Z_TOP) * 0.5, sq: s[4] });
      else if (kind === "boot")
        A.push({ x: xx, w: w + 0.03, h: 0.62, zc: 0.46, sq: 0.17 });
      else
        A.push({ x: xx, w: w, h: (0.16 - kz) * 0.5, zc: (0.16 + kz) * 0.5, sq: s[5] });
    }
    return A;
  }
  function deckRibbon(THREE, m, x0, x1, inset, dz) {
    var xs = [x0], i, j, NC = 3, pos = [], uv = [], idx = [];
    for (i = 0; i < DENSE.length; i++)
      if (DENSE[i][0] > x0 + 0.1 && DENSE[i][0] < x1 - 0.1) xs.push(DENSE[i][0]);
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
  function railRun(THREE, g, T, x0, x1, step, hgt, inset) {
    var s, x, n = Math.max(2, Math.round((x1 - x0) / step)), i, prev;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n;
        var y = s * (halfB(x) - inset), z = deckZ(x) + 0.04;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.026, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.50, x, y, z + hgt * 0.50, 0.022, 3);
        }
        prev = [x, y, z];
      }
    }
  }

  /* ----------------------------------------------------- 130 mm SM-2-1 twin
     The renderer trains the group this is built into; barrels point +X. */
  function sm21(THREE, g, T) {
    var s;
    cylZ(THREE, g, 2.05, 2.25, 0.60, 14, T.sup2, 0, 0, 0.30);
    /* flat sided welded house with a sloped roof and a forward mantlet */
    tprism(THREE, g, 5.0, 4.5, 4.3, 3.9, 1.55, T.sup, -0.15, 0, 1.38);
    tprism(THREE, g, 4.3, 3.9, 3.2, 3.0, 0.55, T.sup, -0.30, 0, 2.43);
    tprism(THREE, g, 1.4, 2.6, 1.0, 2.2, 1.35, T.sup2, 2.45, 0, 1.55);
    /* rangefinder ears on the sides of the roof */
    for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.9, 0.35, 0.45, T.sup2, -0.9, s * 1.75, 2.15);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.085, 0.095, 6.4, 8, T.gun, 5.60, s * 0.52, 1.60, true);
      cylX(THREE, g, 0.115, 0.115, 0.55, 8, T.gun, 2.95, s * 0.52, 1.60);
      cylX(THREE, g, 0.115, 0.115, 0.30, 8, T.gun, 8.65, s * 0.52, 1.60);
    }
    return g;
  }

  /* ------------------------------------------- 45 mm SM-20-ZIF quadruple */
  function quad45(THREE, g, T) {
    var i, j;
    cylZ(THREE, g, 0.62, 0.72, 0.55, 10, T.sup2, 0, 0, 0.27);
    tprism(THREE, g, 1.55, 1.9, 1.25, 1.6, 0.80, T.sup, -0.10, 0, 0.95);
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      var yy = (i - 0.5) * 0.52, zz = 1.05 + j * 0.26;
      cylX(THREE, g, 0.035, 0.045, 1.70, 6, T.gun, 1.35, yy, zz, true);
      cylX(THREE, g, 0.06, 0.06, 0.16, 6, T.gun, 2.22, yy, zz);
    }
    return g;
  }

  /* --------------------------------- 5-tube 533 mm PTA-53-56 on its stand */
  function tt5(THREE, g, T) {
    var i, j;
    cylZ(THREE, g, 1.15, 1.30, 0.50, 10, T.sup2, 0, 0, 0.25);
    tprism(THREE, g, 3.0, 1.9, 2.6, 1.7, 0.40, T.sup2, 0, 0, 0.70);
    for (i = 0; i < 3; i++)
      cylX(THREE, g, 0.30, 0.30, 7.2, 10, T.sup, 0.3, (i - 1) * 0.66, 1.25, true);
    for (i = 0; i < 2; i++)
      cylX(THREE, g, 0.30, 0.30, 7.2, 10, T.sup, 0.3, (i - 0.5) * 0.66, 1.88, true);
    for (j = 0; j < 5; j++)
      cylX(THREE, g, 0.32, 0.32, 0.14, 10, T.dark, 3.90,
           j < 3 ? (j - 1) * 0.66 : (j - 3.5) * 0.66, j < 3 ? 1.25 : 1.88);
    return g;
  }

  /* -------------------------------------------- Slim Net curved lattice */
  function slimNet(THREE, g, T, x, y, z, span, hgt) {
    var u = new THREE.Group(), N = 8, i, f, yy, xx, top = [], bot = [];
    u.position.set(x, y, z); g.add(u);
    for (i = 0; i <= N; i++) {
      f = i / N - 0.5; yy = f * span; xx = -Math.pow(f * 2, 2) * 0.55;
      top.push([xx, yy, hgt * 0.5]); bot.push([xx, yy, -hgt * 0.5]);
      strut(THREE, u, T.metal, xx, yy, -hgt * 0.5, xx, yy, hgt * 0.5, 0.05, 3);
    }
    for (i = 0; i < N; i++) {
      strut(THREE, u, T.metal, top[i][0], top[i][1], top[i][2], top[i + 1][0], top[i + 1][1], top[i + 1][2], 0.06, 3);
      strut(THREE, u, T.metal, bot[i][0], bot[i][1], bot[i][2], bot[i + 1][0], bot[i + 1][1], bot[i + 1][2], 0.06, 3);
    }
    box(THREE, u, 0.45, 0.45, 0.8, T.sup2, 0.2, 0, -hgt * 0.5 - 0.35);
    return u;
  }

  /* funnel: oval, raked aft, black cap */
  function funnel(THREE, g, T, x, z0, z1, fl, fw, rake) {
    var f = new THREE.Group(), fh = z1 - z0;
    f.position.set(x, 0, z0); f.rotation.y = -rake; g.add(f);
    tprism(THREE, f, fl, fw, fl * 0.86, fw * 0.88, fh, T.sup, 0, 0, fh * 0.5);
    tprism(THREE, f, fl * 0.90, fw * 0.92, fl * 0.84, fw * 0.86, 1.10, T.dark, 0, 0, fh + 0.35);
    cylZ(THREE, f, fl * 0.20, fl * 0.20, 0.25, 8, T.dark, 0, fw * 0.22, fh + 0.95);
    cylZ(THREE, f, fl * 0.20, fl * 0.20, 0.25, 8, T.dark, 0, -fw * 0.22, fh + 0.95);
    strut(THREE, f, T.metal, -fl * 0.46, 0.8, 0.4, -fl * 0.46, 0.8, fh + 0.8, 0.07, 4);
    return f;
  }

  function quadAt(THREE, g, T, x, y, z, yaw) {
    var q = new THREE.Group();
    q.position.set(x, y, z); q.rotation.z = yaw || 0;
    quad45(THREE, q, T); g.add(q); return q;
  }

  /* house with a trapezoid plan: aft end at xa (half width wa), fore end
     at xb (half width wb), from z0 up h; the roof edge set in by l */
  function trap(THREE, p, xa, wa, xb, wb, z0, h, m, l) {
    l = (l === undefined) ? 0.10 : l;
    var V = [[xa, -wa, z0], [xb, -wb, z0], [xb, wb, z0], [xa, wa, z0],
             [xa + l, -(wa - l), z0 + h], [xb - l, -(wb - l), z0 + h],
             [xb - l, wb - l, z0 + h], [xa + l, wa - l, z0 + h]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7],
             [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5],
             [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]];
      pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i === 6 || i === 7 || i >= 10) uv.push(v[1] * 0.16, v[2] * 0.16);
      else uv.push(v[0] * 0.16, v[2] * 0.16);
    }
    var gg = new THREE.BufferGeometry();
    gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    gg.computeVertexNormals();
    var mm = new THREE.Mesh(gg, m); p.add(mm); return mm;
  }

  /* small boat hull on chocks */
  function boat(THREE, M, g, T, x, y, z, len, bw, h) {
    var sec = [], k;
    for (k = 0; k <= 6; k++) {
      var tt = k / 6;
      sec.push({ x: -len * 0.5 + tt * len, w: Math.max(0.08, bw * Math.sin(PI * Math.pow(tt, 0.75)) + 0.10),
                 h: h, zc: 0, sq: 0.55 });
    }
    var bt = loftMesh(THREE, M, sec, 8, T.sup2);
    bt.position.set(x, y, z); g.add(bt);
    for (k = -1; k <= 1; k += 2)
      box(THREE, g, 0.25, bw * 1.6, 0.35, T.metal, x + k * len * 0.3, y, z - h - 0.12);
    return bt;
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group(), T = makeMats(THREE, C), s, i, k, x, z;

    /* hull: three coaxial shells and a square transom */
    g.add(loftMesh(THREE, M, hullSections("top"), 20, T.hull));
    g.add(loftMesh(THREE, M, hullSections("boot"), 12, T.hull));
    g.add(loftMesh(THREE, M, hullSections("low"), 14, T.under));
    tprism(THREE, g, 0.5, 6.6, 0.4, 5.6, 4.6, T.hull, -62.9, 0, 1.9);
    g.add(deckRibbon(THREE, T.deck, -62.6, 62.6, -0.07, 0.03));

    /* forecastle bulwark (a low plated rail forward of the turret) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) {
        var xa = 48.0 + i * 3.0, xb = xa + 3.0;
        var ya = s * (halfB(xa) - 0.10), yb = s * (halfB(xb) - 0.10);
        var za = deckZ(xa), zb = deckZ(xb);
        var mid = new THREE.Mesh(new THREE.BoxGeometry(
          Math.sqrt((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya)), 0.12, 0.95), T.hull);
        mid.position.set((xa + xb) * 0.5, (ya + yb) * 0.5, (za + zb) * 0.5 + 0.47);
        mid.rotation.z = Math.atan2(yb - ya, xb - xa);
        g.add(mid);
      }
    }

    /* ------------------------------------------------- 130 mm SM-2-1 twins */
    /* forward twin: the trained group */
    var tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(41.0, 0, deckZ(41.0) - 0.05);
    sm21(THREE, tw, T);
    g.add(tw);
    /* after twin on the quarterdeck at deck level, trained astern, baked
       (Spravedlivyy 1960 drawing: house about x -44 to -37) */
    var aft = new THREE.Group();
    aft.position.set(-40.5, 0, deckZ(-40.5) - 0.05);
    aft.rotation.z = PI;
    sm21(THREE, aft, T);
    g.add(aft);

    /* ------------------------------------------- bow superstructure (fore) */
    /* pointed house x 24.8-35.6 carrying 45 mm mount No. 1 on the centreline
       with life rafts beside it */
    var zb0 = deckZ(24.8) - 0.10, zbr = deckZ(35.6) + 2.30;
    trap(THREE, g, 24.8, 4.9, 35.6, 1.1, zb0, zbr - zb0, T.sup);
    cylZ(THREE, g, 1.05, 1.15, 0.36, 12, T.sup2, 29.6, 0, zbr + 0.18);
    quadAt(THREE, g, T, 29.6, 0, zbr + 0.36, 0);
    for (s = -1; s <= 1; s += 2)
      for (k = 0; k < 2; k++)
        cylX(THREE, g, 0.34, 0.34, 1.2, 8, T.sup2, 26.0 + k * 1.3, s * (3.15 - k * 0.35), zbr + 0.36);

    /* bridge: narrow aft part over the boats, full forward part */
    var zl = deckZ(25.0) + 2.50;           /* lower bridge level */
    trap(THREE, g, 13.0, 2.9, 19.0, 2.9, deckZ(13) - 0.10, zl - deckZ(13) + 0.10, T.sup, 0.05);
    trap(THREE, g, 19.0, 4.0, 25.0, 4.9, deckZ(19) - 0.10, zl - deckZ(19) + 0.10, T.sup, 0.05);
    /* wheelhouse */
    tprism(THREE, g, 8.4, 6.4, 8.0, 6.0, 2.60, T.sup, 19.6, 0, zl + 1.30);
    var zt1 = zl + 2.60;                   /* open bridge on its roof */
    box(THREE, g, 0.22, 5.6, 0.80, T.glass, 23.82, 0, zl + 1.75);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 5.0, 0.20, 0.80, T.glass, 20.6, s * 3.22, zl + 1.75);
      /* bridge wings with a plated breastwork */
      box(THREE, g, 3.0, 1.6, 0.18, T.sup2, 21.6, s * 3.9, zt1 - 0.09);
      box(THREE, g, 3.0, 0.10, 0.95, T.sup, 21.6, s * 4.65, zt1 + 0.45);
    }
    box(THREE, g, 0.12, 6.2, 1.00, T.sup, 23.70, 0, zt1 + 0.50);
    box(THREE, g, 1.2, 6.2, 0.12, T.sup2, 24.2, 0, zl + 2.30);
    /* director tower on the bridge roof: stabilised sight post, rangefinder
       arms and a small fire control radar */
    tprism(THREE, g, 4.6, 4.2, 4.2, 3.8, 1.50, T.sup, 18.6, 0, zt1 + 0.75);
    var zt2 = zt1 + 1.50;
    cylZ(THREE, g, 1.10, 1.25, 1.10, 12, T.sup2, 19.2, 0, zt2 + 0.55);
    box(THREE, g, 0.6, 3.6, 0.45, T.sup2, 19.2, 0, zt2 + 1.25);
    box(THREE, g, 1.6, 0.9, 0.50, T.sup2, 19.4, 0, zt2 + 1.75);
    cylX(THREE, g, 0.10, 0.10, 2.2, 6, T.gun, 20.6, 0.40, zt2 + 1.35);
    /* navigation radar on a small platform at the after end of the tower */
    box(THREE, g, 1.0, 1.0, 0.2, T.sup2, 16.9, 1.0, zt2 + 0.10);
    box(THREE, g, 1.7, 0.12, 0.34, T.metal, 16.9, 1.0, zt2 + 0.55);
    /* signal lamps and flag lockers */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.22, 0.22, 0.45, 8, T.metal, 22.6, s * 4.4, zt1 + 0.30);
      box(THREE, g, 1.0, 0.8, 0.9, T.sup2, 16.2, s * 2.6, zt1 + 0.45);
    }
    /* ladders up the forward part of the bridge */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 19.25, s * 4.10, deckZ(19) + 0.1, 19.25, s * 4.10, zl - 0.05, 0.04, 3);
      strut(THREE, g, T.metal, 19.55, s * 4.12, deckZ(19) + 0.1, 19.55, s * 4.12, zl - 0.05, 0.04, 3);
      for (i = 0; i < 4; i++)
        strut(THREE, g, T.metal, 19.25, s * 4.10, deckZ(19) + 0.4 + i * 0.65, 19.55, s * 4.12, deckZ(19) + 0.4 + i * 0.65, 0.025, 3);
    }

    /* ship's boats on the upper deck either side of the bridge (command
       launch to starboard, motor launch to port), with their cargo booms */
    boat(THREE, M, g, T, 15.8, -4.55, deckZ(16) + 1.05, 6.0, 0.85, 0.55);
    boat(THREE, M, g, T, 15.8, 4.55, deckZ(16) + 1.05, 6.4, 0.90, 0.60);
    for (s = -1; s <= 1; s += 2)
      strut(THREE, g, T.metal, 12.6, s * 2.9, deckZ(12.6) + 2.4, 16.8, s * 4.5, deckZ(16) + 5.6, 0.07, 4);

    /* funnel casing and funnel No. 1 (x about 7-11.5) */
    var zc1 = deckZ(10) + 2.50;
    trap(THREE, g, 6.3, 3.1, 13.0, 3.1, deckZ(6.3) - 0.10, zc1 - deckZ(6.3) + 0.10, T.sup, 0.05);
    funnel(THREE, g, T, 9.2, zc1, 12.70, 4.6, 4.2, 0.10);
    box(THREE, g, 5.0, 4.6, 0.20, T.sup2, 9.25, 0, zc1 + 2.6);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.33, 0.33, 1.2, 8, T.sup2, 7.6, s * 2.65, zc1 + 0.36);
      cylX(THREE, g, 0.33, 0.33, 1.2, 8, T.sup2, 10.6, s * 2.65, zc1 + 0.36);
      strut(THREE, g, T.metal, 11.62, s * 0.8, zc1, 11.10, s * 0.8, zc1 + 5.0, 0.03, 3);
    }

    /* tripod foremast between the bridge and funnel No. 1: two legs on the
       lower bridge roof, one on the casing; Slim Net array and topmast */
    var apx = 12.4, apz = 23.3;
    var legs = [[14.6, 2.6, zl], [14.6, -2.6, zl], [12.0, 0.0, zc1]];
    for (i = 0; i < 3; i++)
      strut(THREE, g, T.metal, legs[i][0], legs[i][1], legs[i][2], apx, 0, apz, 0.14, 5);
    var lp = [], fb = 0.36;
    for (i = 0; i < 3; i++)
      lp.push([legs[i][0] + (apx - legs[i][0]) * fb, legs[i][1] * (1 - fb), legs[i][2] + (apz - legs[i][2]) * fb]);
    strut(THREE, g, T.metal, lp[0][0], lp[0][1], lp[0][2], lp[1][0], lp[1][1], lp[1][2], 0.07, 3);
    strut(THREE, g, T.metal, lp[0][0], lp[0][1], lp[0][2], lp[2][0], lp[2][1], lp[2][2], 0.06, 3);
    strut(THREE, g, T.metal, lp[1][0], lp[1][1], lp[1][2], lp[2][0], lp[2][1], lp[2][2], 0.06, 3);
    strut(THREE, g, T.metal, apx, 0, apz, apx, 0, 30.3, 0.09, 5);
    box(THREE, g, 1.6, 1.6, 0.18, T.sup2, apx, 0, apz - 0.8);
    slimNet(THREE, g, T, apx - 0.6, 0, apz + 1.7, 6.2, 1.5);
    strut(THREE, g, T.metal, apx, -2.6, apz + 4.4, apx, 2.6, apz + 4.4, 0.05, 3);
    strut(THREE, g, T.metal, apx - 0.2, 0, 30.3, apx - 0.7, 0, 31.3, 0.04, 3);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, apx, 0, 30.0, 4.0, s * 3.6, deckZ(4) + 0.1, 0.025, 3);
      strut(THREE, g, T.metal, apx, 0, 29.0, 23.0, s * 2.6, zt1 + 0.9, 0.025, 3);
    }

    /* forward quintuple 533 mm tubes on the main deck abaft funnel No. 1 */
    var ttA = new THREE.Group(); ttA.position.set(2.2, 0, deckZ(2.2)); tt5(THREE, ttA, T); g.add(ttA);

    /* ---------------------------------------------- middle superstructure */
    /* x -18.8 to -0.7 with funnel No. 2 on its after part, sponsons for 45 mm
       mounts No. 2 and 3 abreast, the mainmast between them, a director
       pedestal and the yawl to port */
    var zm = deckZ(-10) + 2.80;
    trap(THREE, g, -18.8, 3.6, -0.7, 3.2, deckZ(-0.7) - 0.10 - 0.25, zm - deckZ(-0.7) + 0.35, T.sup);
    trap(THREE, g, -9.6, 3.5, -6.6, 5.4, deckZ(-6) - 0.25, zm - deckZ(-6) + 0.25, T.sup, 0.05);
    trap(THREE, g, -6.6, 5.4, -4.2, 5.4, deckZ(-6) - 0.25, zm - deckZ(-6) + 0.25, T.sup, 0.05);
    trap(THREE, g, -4.2, 5.4, -1.6, 3.3, deckZ(-4) - 0.25, zm - deckZ(-4) + 0.25, T.sup, 0.05);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 1.05, 1.15, 0.36, 12, T.sup2, -5.4, s * 3.95, zm + 0.18);
      quadAt(THREE, g, T, -5.4, s * 3.95, zm + 0.36, 0);
    }
    funnel(THREE, g, T, -16.4, zm, 11.70, 4.6, 4.2, 0.10);
    box(THREE, g, 5.0, 4.6, 0.20, T.sup2, -16.35, 0, zm + 2.2);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.33, 0.33, 1.2, 8, T.sup2, -17.6, s * 2.85, zm + 0.36);
      cylX(THREE, g, 0.33, 0.33, 1.2, 8, T.sup2, -15.2, s * 2.85, zm + 0.36);
    }
    /* director pedestal (45 mm fire control) */
    cylZ(THREE, g, 0.55, 0.65, 2.6, 10, T.sup, -8.8, 0, zm + 1.3);
    cylZ(THREE, g, 0.75, 0.75, 0.70, 10, T.sup2, -8.8, 0, zm + 2.95);
    box(THREE, g, 0.45, 1.5, 0.70, T.metal, -8.5, 0, zm + 3.65);
    /* lattice tripod mainmast */
    var mx = -4.4, mz = zm + 8.6;
    var ml = [[-2.9, 1.6], [-2.9, -1.6], [-6.1, 0.0]];
    for (i = 0; i < 3; i++)
      strut(THREE, g, T.metal, ml[i][0], ml[i][1], zm, mx, 0, mz, 0.12, 5);
    for (k = 1; k <= 2; k++) {
      var f = k / 3, zz = zm + 8.6 * f;
      var p0 = [-2.9 + (mx + 2.9) * f, 1.6 * (1 - f)], p1 = [-2.9 + (mx + 2.9) * f, -1.6 * (1 - f)],
          p2 = [-6.1 + (mx + 6.1) * f, 0];
      strut(THREE, g, T.metal, p0[0], p0[1], zz, p1[0], p1[1], zz, 0.05, 3);
      strut(THREE, g, T.metal, p0[0], p0[1], zz, p2[0], p2[1], zz, 0.05, 3);
      strut(THREE, g, T.metal, p1[0], p1[1], zz, p2[0], p2[1], zz, 0.05, 3);
    }
    strut(THREE, g, T.metal, mx, 0, mz, mx, 0, 21.0, 0.09, 5);
    box(THREE, g, 2.0, 2.0, 0.16, T.sup2, mx, 0, mz);
    /* small radar antenna at the masthead as the drawing shows */
    box(THREE, g, 0.6, 0.6, 0.6, T.sup2, mx, 0, 18.4);
    box(THREE, g, 0.9, 2.6, 0.6, T.metal, mx + 0.1, 0, 19.1);
    strut(THREE, g, T.metal, mx, -2.2, 17.2, mx, 2.2, 17.2, 0.05, 3);
    strut(THREE, g, T.metal, mx, 0, 21.0, mx - 0.5, 0, 22.4, 0.04, 3);
    /* six-oar yawl on the roof to port, abaft mount No. 2 */
    boat(THREE, M, g, T, -10.9, 2.45, zm + 0.62, 6.0, 0.80, 0.42);

    /* after quintuple tubes on the main deck abaft funnel No. 2 */
    var ttB = new THREE.Group(); ttB.position.set(-22.9, 0, deckZ(-22.9)); tt5(THREE, ttB, T); g.add(ttB);

    /* ------------------------------------------------ after superstructure */
    /* house x -33.0 to -26.3 with 45 mm mount No. 4 on a tub on the
       centreline, and a small tower abaft it with the second director */
    var za = deckZ(-30) + 2.90;
    trap(THREE, g, -33.0, 3.1, -26.3, 3.1, deckZ(-26.3) - 0.10, za - deckZ(-26.3) + 0.10, T.sup);
    cylZ(THREE, g, 1.05, 1.15, 0.36, 12, T.sup2, -29.4, 0, za + 0.18);
    quadAt(THREE, g, T, -29.4, 0, za + 0.36, PI);
    var ztw = deckZ(-34) + 4.0;
    trap(THREE, g, -35.4, 1.3, -33.0, 1.3, deckZ(-33) - 0.10, ztw - deckZ(-33) + 0.10, T.sup, 0.05);
    cylZ(THREE, g, 0.70, 0.70, 0.60, 10, T.sup2, -34.2, 0, ztw + 0.30);
    box(THREE, g, 0.45, 1.4, 0.65, T.metal, -34.5, 0, ztw + 0.92);

    /* low house on the quarterdeck abaft the after turret (as drawn) */
    var zq = deckZ(-49.5) + 1.30;
    trap(THREE, g, -51.5, 1.8, -47.5, 1.6, deckZ(-47.5) - 0.10, zq - deckZ(-47.5) + 0.10, T.sup, 0.05);

    /* six BMB-2 depth charge throwers right aft, three a side */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var bx = -54.6 - i * 1.6;
        var bm = new THREE.Group();
        bm.position.set(bx, s * 2.8, deckZ(bx) + 0.04); bm.rotation.z = s * 0.20; g.add(bm);
        cylZ(THREE, bm, 0.34, 0.40, 0.45, 8, T.sup2, 0, 0, 0.22);
        var br = cylZ(THREE, bm, 0.15, 0.15, 1.4, 6, T.gun, 0, 0, 0.95, true);
        br.rotation.x = -s * 0.38;
      }
      /* hatch of the under-deck depth charge dropper at the transom */
      box(THREE, g, 1.4, 0.9, 0.06, T.dark, -61.6, s * 1.7, deckZ(-61.6) + 0.04);
      /* mine rails along both sides, two per side, funnel 2 to the stern */
      var rx0, rx1, q, ins;
      for (q = 0; q < 2; q++) {
        ins = q ? 1.55 : 0.95;
        for (i = 0; i < 15; i++) {
          rx0 = -17.0 - i * 3.0; rx1 = rx0 - 3.0;
          if (rx1 < -61.6) rx1 = -61.6;
          strut(THREE, g, T.metal, rx0, s * (halfB(rx0) - ins), deckZ(rx0) + 0.07,
                rx1, s * (halfB(rx1) - ins), deckZ(rx1) + 0.07, 0.05, 3);
        }
      }
    }

    /* capstans, hawse anchors, jackstaff and ensign staff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.45, 0.60, 0.65, 8, T.metal, 56.0, s * 1.1, deckZ(56) + 0.33);
      var an = new THREE.Group();
      an.position.set(55.0, s * (halfB(55.0) + 0.02), deckZ(55.0) - 1.40);
      g.add(an);
      box(THREE, an, 1.6, 0.14, 0.30, T.gun, 0, 0, 0.45);
      box(THREE, an, 0.30, 0.14, 1.30, T.gun, 0, 0, -0.20);
      box(THREE, an, 0.80, 0.12, 0.28, T.gun, 0, 0, -0.80);
    }
    cylZ(THREE, g, 0.04, 0.07, 2.6, 6, T.metal, 62.0, 0, deckZ(62) + 1.3);
    cylZ(THREE, g, 0.04, 0.07, 3.2, 6, T.metal, -62.0, 0, deckZ(-62) + 1.6);
    /* whip aerials: bridge sides and the middle superstructure */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 20.4, s * 3.0, zt1, 20.0, s * 3.4, zt1 + 8.0, 0.04, 3);
      strut(THREE, g, T.metal, -14.2, s * 3.2, zm, -14.6, s * 3.6, zm + 8.0, 0.04, 3);
    }

    /* underwater gear: shafts on bossings, two propellers, one rudder */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.32, 0.32, 8.0, 8, T.metal, -57.0, s * 3.2, -3.60, true);
      strut(THREE, g, T.metal, -58.5, s * 3.2, -3.55, -61.0, s * 4.4, -2.0, 0.20, 5);
      cylX(THREE, g, 0.45, 0.70, 0.9, 8, T.metal, -61.2, s * 3.2, -3.55);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 1.20), T.metal);
        bl.position.set(-61.2, s * 3.2, -3.55);
        bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.80);
        bl.rotation.y = 0.45;
        g.add(bl);
      }
    }
    box(THREE, g, 2.8, 0.30, 3.2, T.metal, -62.2, 0, -2.40);

    /* guard rails along the weather deck, broken for the forward turret */
    railRun(THREE, g, T, -62.0, 47.5, 4.1, 1.05, 0.22);

    /* ------------------------------------------------- fittings and detail */
    function roofRail(x0, x1, hw, zr0, hgt, ends) {
      var q, sd, n = Math.max(2, Math.round((x1 - x0) / 1.4)), xx, pv;
      for (sd = -1; sd <= 1; sd += 2) {
        pv = null;
        for (q = 0; q <= n; q++) {
          xx = x0 + (x1 - x0) * q / n;
          strut(THREE, g, T.metal, xx, sd * hw, zr0, xx, sd * hw, zr0 + hgt, 0.035, 3);
          if (pv !== null) {
            strut(THREE, g, T.metal, pv, sd * hw, zr0 + hgt * 0.97, xx, sd * hw, zr0 + hgt * 0.97, 0.024, 3);
            strut(THREE, g, T.metal, pv, sd * hw, zr0 + hgt * 0.5, xx, sd * hw, zr0 + hgt * 0.5, 0.02, 3);
          }
          pv = xx;
        }
      }
      if (ends) {
        strut(THREE, g, T.metal, x1, -hw, zr0 + hgt * 0.97, x1, hw, zr0 + hgt * 0.97, 0.024, 3);
        strut(THREE, g, T.metal, x0, -hw, zr0 + hgt * 0.97, x0, hw, zr0 + hgt * 0.97, 0.024, 3);
      }
    }
    roofRail(-13.8, -9.8, 3.45, zm, 0.90, false);
    roofRail(-32.8, -26.5, 2.95, za, 0.90, true);
    roofRail(19.2, 24.8, 4.0, zl, 0.90, false);

    /* mushroom vents on the weather deck */
    var ventSpots = [[52.0, 2.4], [52.0, -2.4], [36.0, 3.9], [36.0, -3.9], [-12.0, 4.9], [-12.0, -4.9],
                     [-36.6, 3.0], [-36.6, -3.0], [-49.5, 3.0], [-49.5, -3.0], [4.8, 4.6], [4.8, -4.6]];
    for (i = 0; i < ventSpots.length; i++) {
      var vx = ventSpots[i][0], vy = ventSpots[i][1], vz = deckZ(vx);
      cylZ(THREE, g, 0.20, 0.20, 0.70, 8, T.sup2, vx, vy, vz + 0.35);
      cylZ(THREE, g, 0.40, 0.20, 0.30, 8, T.sup2, vx, vy, vz + 0.80);
    }
    for (i = 0; i < 4; i++)
      box(THREE, g, 1.3, 1.0, 0.22, T.sup2, 46.5 + (i % 2) * 3.0, (i < 2 ? 1 : -1) * 2.0, deckZ(48) + 0.12);
    /* mooring bitts and hawse pipes */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) {
        var bxx = -58 + i * 14;
        if (bxx > 56) continue;
        cylZ(THREE, g, 0.17, 0.17, 0.45, 8, T.metal, bxx, s * (halfB(bxx) - 0.50), deckZ(bxx) + 0.25);
        cylZ(THREE, g, 0.24, 0.17, 0.12, 8, T.metal, bxx, s * (halfB(bxx) - 0.50), deckZ(bxx) + 0.52);
      }
      cylY(THREE, g, 0.26, 0.26, 0.40, 8, T.dark, 56.5, s * (halfB(56.5) - 0.14), deckZ(56.5) - 1.10);
    }

    /* team strips: three small flat panels on roofs */
    box(THREE, g, 2.4, 1.0, 0.04, T.team, 32.8, 0, zbr + 0.02);
    box(THREE, g, 3.0, 1.0, 0.04, T.team, -12.0, -1.6, zm + 0.02);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -49.5, 0, zq + 0.02);

    return mergeAll(THREE, g, tw);
  }

  /* render3d draws every mesh as its own call, so everything static is
     baked into ONE mesh per material; the trained turret group keeps its
     own small per-material set (matrices relative to the turret). */
  function mergeAll(THREE, root, turret) {
    function collect(top, skip) {
      var buckets = [], list = [];
      top.updateMatrixWorld(true);
      var inv = new THREE.Matrix4().copy(top.matrixWorld).invert();
      top.traverse(function (o) {
        if (!o.isMesh) return;
        if (skip) { var q = o, in_ = false; while (q) { if (q === skip) { in_ = true; break; } q = q.parent; } if (in_) return; }
        list.push(o);
      });
      list.forEach(function (o) {
        var m = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
        var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        if (!geo.getAttribute("normal")) geo.computeVertexNormals();
        geo.applyMatrix4(m);
        var b = null, i;
        for (i = 0; i < buckets.length; i++) if (buckets[i].m === o.material) { b = buckets[i]; break; }
        if (!b) { b = { m: o.material, p: [], n: [], u: [] }; buckets.push(b); }
        var P = geo.getAttribute("position"), N = geo.getAttribute("normal"), U = geo.getAttribute("uv");
        for (i = 0; i < P.count; i++) {
          b.p.push(P.getX(i), P.getY(i), P.getZ(i));
          b.n.push(N.getX(i), N.getY(i), N.getZ(i));
          if (U) b.u.push(U.getX(i), U.getY(i)); else b.u.push(0, 0);
        }
      });
      return { buckets: buckets, list: list };
    }
    function emit(parent, buckets) {
      buckets.forEach(function (b) {
        var g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(b.p, 3));
        g.setAttribute("normal", new THREE.Float32BufferAttribute(b.n, 3));
        g.setAttribute("uv", new THREE.Float32BufferAttribute(b.u, 2));
        var me = new THREE.Mesh(g, b.m);
        me.castShadow = true; me.receiveShadow = true;
        parent.add(me);
      });
    }
    var tc = collect(turret, null);
    var rc = collect(root, turret);
    tc.list.forEach(function (o) { o.parent.remove(o); });
    rc.list.forEach(function (o) { o.parent.remove(o); });
    emit(turret, tc.buckets);
    emit(root, rc.buckets);
    return root;
  }

  function cylY(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open), m);
    c.position.set(x, y, z); p.add(c); return c;
  }

  return { build: build };
})();

/* Registration: len is the true overall length, 126.1 m. */
UNIT_MODELS["pact_e50_destroyer"] = {
  len: 126.1,
  build: function (THREE, M, C) { return HeroKotlin.build(THREE, M, C); }
};
