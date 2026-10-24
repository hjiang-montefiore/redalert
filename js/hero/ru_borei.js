/* ============ ru_borei.js -- HERO model: Project 955A Borei-A SSBN (ssbn_p) ============
   The boat the row names: "Project 955A Borei-A" (Knyaz Vladimir, K-549, commissioned 12 June 2020; the
   row's service year 2013 is the class's first boat, Yuriy Dolgorukiy, a Project 955). Sixteen Bulava tubes in
   two rows of eight abaft the sail, the box sail set well forward, no sail planes (retractable bow planes in the
   hull), the cruciform stern with END PLATES on the stern planes, the pump-jet in its shroud, black anechoic
   tiles all over.

   References (Wikimedia Commons, width=960 renders, in scratchpad/q_borei_ref):
     - "Borey-A class SSBN.svg" (a_boreyA.png, port profile, bow right; read at 2x = 1920 px for 170 m,
       11.29 px/m, the same scale the earlier model used): THE source for every station. Read off it: hull top
       flat at row 160 from 640 to 1200 px and falling to 174 at 1760 px; keel flat at row 330; the boot line
       at row 218; the sail 1228-1462 px, top row 118, a vertical after wall, a vertical fore wall with a small
       foot fillet to 1476 px; five masts (1272, 1313, 1326, 1336 with the pale head, 1408); eight lid panels in a
       row 817-1133 px; the dark slot at row 209 (540-1440 px) with the pale dashed strips over it (300-507,
       567-863, 1020-1440, 1595-1880 px); the long low slot 713-1367 px, rows 280-293; three grilles 363-397 px,
       rows 273-290; the round grate at 473 px, row 270, 0.9 m radius; the hatch pairs at row 191; the slanted
       bow grille 1827-1863 px; the dome seam at 1763 px; the upper rudder 116-170 px, top row 144, trailing
       edge upright, leading edge curving down to the hull; the lower rudder 100-172 px to row 340; the stern-plane
       END PLATE seen edge-on, 120-175 px, rows 233-270, with the plane's root fairing forward to 210 px; the
       pump-jet shroud 12-66 px, 3.19 m radius, and the hub cone 0-12 px.
     - "Borey class SSBN.svg" (b_borey.png, the first three Project 955 boats): checked for the 955 / 955A
       differences (the 955's longer sloping sail, humped casing, swept fin and red bow patch are NOT drawn).
     - "Submarine Knyaz Pozharskiy launching ceremony 01.jpg" (a Borei-A in the building hall, 2022): the stern
       plane with its END PLATE standing above and below the tip, the long plane root, the shroud (netted), the
       three tall flank grilles and the round grate, the matte black tiles, the white dashes along the shoulder;
       the hull black to the keel (no red anti-fouling).
     - "K-549 Knyaz Vladimir submarine (2020-06-12) 01.jpg" (mil.ru, alongside): the sail's rounded fore top
       corner and fore foot, the flat-topped broad casing, the tile courses; paint sampled here.
     - "K-549 Knyaz Vladimir at sea trials (2019).jpg": the long low hull, the sail well forward, the upper
       rudder alone showing aft, the trim.
     - "Russian Navy SSBN Imperator Aleksandr III.jpg" and "...(2020-06-12) 05.jpg": the broad flat deck.

   RECOGNITION (each one shows on the final sheets):
     1. The very long, parallel black hull with a flat-topped casing (drawing rows 160 / 330; Imperator
        Aleksandr III; trials 2019).
     2. The box sail set well forward (fore wall 40.4 m abaft the bow), upright after wall, rounded fore top
        corner, flat top (drawing; Knyaz Vladimir 2020).
     3. NO sail planes: the bow planes retract into the hull, their hatch drawn forward (drawing 1620 px).
     4. The long missile deck abaft the sail: sixteen lids, two rows of eight, a walkway between
        (drawing 817-1133 px).
     5. Five masts on the sail, one with the pale head (drawing).
     6. The tall square upper rudder and the lower rudder below the keel line (drawing; trials 2019).
     7. Horizontal stern planes with END PLATES standing above and below the tips (drawing; Pozharskiy 2022).
     8. The pump-jet shroud on the tail tip with the hub cone (drawing; Pozharskiy 2022).
     9. Anechoic coating: matte black tile courses with a tonal patchwork, hull and sail (Knyaz Vladimir 2020;
        Pozharskiy 2022).
    10. The flank details: the dark slot and pale dashed strips along the shoulder, the long low slot, the
        three grilles and round grate aft (drawing; Pozharskiy 2022).
    11. The bow: the slanted grille on the bow top, the dome seam, small deck hatches (drawing).

   Dimensions: 170 m overall (published 170 m), 13.5 m beam (published), the drawing's depth 15.1 m keel to
   deck. Trim: the drawing's boot line puts the deck 5.1 m over the water; the photographs of surfaced boats
   show less, so the whole boat is lowered 1.0 m (SHIFT): deck 4.1 m over z = 0, keel 11.0 m under it (the
   published draught is 10 m; between drawing and photographs this is an estimate, kept from the earlier model).
   ESTIMATED, not measured (side drawing only, no plan view found): the sail's width (5.8 m) and its plan
   rounding; the casing's flat-topped cross-section (a superellipse fitted to the profile and the photographs);
   the lids' plan shape and their offset (+-1.75 m; the profile gives their length, 3.5 m pitch); the stern-plane
   span (end plates 5.6 m out from the axis); the masts' lateral positions; the pump-jet stator vane count
   (seven drawn; the rotor sits inside the shroud and is not drawn).
   NOT DRAWN: hull numbers, names, flags, rails, the sail's name boards, any red anti-fouling (the 955 drawing
   has a red bow patch; the 955A drawing and the 2022 photograph show the hull black to the keel).
   Paint: the sail in shade on the 2020 photograph samples (50,45,45); taken to ~0.9 for the ACES lift that is
   the #2e2b2b tile base. The row is not turret:true, so nothing is named "turret"; the lids are flush and merged
   (render3d opens none; combat.js launches an SLBM from the unit's position, not from a hatch).
   Model space +X bow, +Y port, +Z up, metres; water line z = 0; render3d scales a submarine by
   UNIT_MODELS[key].len, set to the measured X extent. Merged per material. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBorei955A = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 11.29, XB = 85.0;
  /* every part is built in the drawing's own heights (boot line z = 0) and lowered SHIFT in Acc */
  var SHIFT = 1.0;
  function X(px) { return (px - 1) / PXM - XB; }
  function Z(py) { return (218 - py) / PXM; }

  /* [px from the stern, half-height, centre z] off the profile; 72-112 px is the tail cone between
     the shroud and the rudders, 112-200 px is interpolated under the fins */
  var STA = [
    [64, 1.75, -3.05], [72, 1.86, -3.05], [80, 2.13, -3.05], [88, 2.30, -3.05], [96, 2.48, -3.05],
    [112, 2.85, -3.05], [140, 3.6, -3.05], [170, 4.35, -3.05], [200, 4.96, -3.01], [240, 5.67, -3.01],
    [280, 6.11, -2.92], [320, 6.47, -2.92], [360, 6.73, -2.83], [400, 7.0, -2.75], [440, 7.17, -2.75],
    [480, 7.26, -2.66], [520, 7.35, -2.57], [560, 7.44, -2.48], [640, 7.53, -2.39],
    [1200, 7.53, -2.39], [1480, 7.44, -2.48], [1560, 7.35, -2.57], [1640, 7.17, -2.75], [1720, 6.99, -2.92],
    [1760, 6.91, -3.01], [1800, 6.55, -3.10], [1820, 6.29, -3.10], [1840, 5.93, -3.10], [1860, 5.43, -3.10],
    [1880, 4.6, -3.10], [1895, 3.65, -3.10], [1905, 2.75, -3.10], [1911, 1.95, -3.10], [1915, 1.2, -3.10],
    [1918, 0.3, -3.10]
  ];
  function tab(px, k) {
    var i;
    if (px <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (px <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (px - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return STA[STA.length - 1][k];
  }
  function PX(x) { return (x + XB) * PXM + 1; }
  function hh(x) { return tab(PX(x), 1); }
  function hw(x) { return Math.min(hh(x), 6.75); }
  function zc(x) { return tab(PX(x), 2); }
  /* upper exponent: a flat-topped casing over the parallel body, round at the ends */
  function pU(x) { return 2 + 0.75 * Math.max(0, Math.min(1, (hh(x) - 6.2) / 1.2)); }
  var XS = X(64), XE = X(1918);

  /* upper surface at lateral offset y, and the half-breadth at height z (drawing heights) */
  function topAt(x, y) {
    var w = hw(x), p = pU(x), u = Math.min(Math.abs(y) / w, 0.9999);
    return zc(x) + hh(x) * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  function sideY(x, z) {
    var d = z - zc(x), h = hh(x), w = hw(x);
    if (d < 0) { var r = Math.min(-d / h, 0.9999); return w * Math.sqrt(1 - r * r); }
    var p = pU(x), u = Math.min(d / h, 0.9999);
    return w * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  /* girth fraction (0 port beam, 0.25 crown, 0.5 starboard beam, 0.75 keel) of height z on the port side */
  function girthV(x, z) {
    var d = (z - zc(x)) / hh(x);
    if (d >= 1) return 0.25;
    if (d >= 0) return Math.asin(Math.pow(d, pU(x) / 2)) / (2 * PI);
    return -Math.asin(Math.min(1, -d)) / (2 * PI);
  }

  /* ---------------------------------------------------------------- textures */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var _tex = {};

  /* hull skin: u stern to bow over XS..XE, v round the girth; rectangular tiles in courses with
     a patchwork of replaced tiles, the dark slot and pale dashes on the shoulders, the dome seam */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(95501), i, j, s;
    var L = XE - XS;
    g.fillStyle = "#2e2b2b"; g.fillRect(0, 0, W, H);
    var NC = 40, tw = 1.5 / L * W, th = H / NC;           /* ~1.5 m tiles, ~1.15 m courses */
    for (j = 0; j < NC; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < W; i++) {
        var x0 = i * tw + off;
        var v = R1();
        g.fillStyle = v < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.022).toFixed(3) + ")"
                              : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(x0 + 0.5, j * th + 0.5, tw - 1.0, th - 1.0);
      }
    }
    for (i = 0; i < 80; i++) {
      var bx = R1() * W, by = R1() * H, bw = tw * (2 + Math.floor(R1() * 6)), bh = th * (1 + Math.floor(R1() * 3));
      g.fillStyle = R1() < 0.55 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.10)";
      g.fillRect(bx, by, bw, bh);
    }
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1;
    for (j = 0; j <= NC; j++) { g.beginPath(); g.moveTo(0, j * th); g.lineTo(W, j * th); g.stroke(); }
    for (j = 0; j < NC; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < W; i++) {
        g.beginPath(); g.moveTo(i * tw + o2, j * th); g.lineTo(i * tw + o2, (j + 1) * th); g.stroke();
      }
    }
    function col(px) { return (X(px) - XS) / L * W; }
    /* the shoulder lines, both sides: dark slot (row 209) and pale dashes (row 206) */
    var DASH = [[300, 507], [567, 863], [1020, 1440], [1595, 1880]];
    for (i = 0; i < W; i++) {
      var x = XS + (i + 0.5) / W * L, px = PX(x);
      for (s = 0; s < 2; s++) {
        var vd = girthV(x, Z(209)), vp = girthV(x, Z(205.5));
        if (s) { vd = 0.5 - vd; vp = 0.5 - vp; }
        vd = 1 - vd; vp = 1 - vp;                     /* the canvas is flipped (flipY): row = (1 - v) H */
        if (px >= 540 && px <= 1440) { g.fillStyle = "rgba(0,0,0,0.85)"; g.fillRect(i, vd * H - 1, 1, 2); }
        for (j = 0; j < DASH.length; j++) {
          if (px >= DASH[j][0] && px <= DASH[j][1] && (Math.floor(px / 6) % 2) === 0) {
            g.fillStyle = "rgba(205,205,200,0.55)"; g.fillRect(i, vp * H - 0.5, 1, 1.4);
          }
        }
      }
    }
    /* the bow-dome seam (1763 px) and the faint one ahead of it (1740 px) */
    g.fillStyle = "rgba(0,0,0,0.6)"; g.fillRect(col(1763) - 1, 0, 2, H);
    g.fillStyle = "rgba(0,0,0,0.3)"; g.fillRect(col(1740), 0, 1, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }

  /* 2 m tile patch for the parts with metre UVs: the sail, fins, planes, shroud */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(9552), i, j;
    g.fillStyle = "#2c2a2a"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 3; j++) {
      for (i = 0; i < 2; i++) {
        var o = (j % 2) ? 32 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.010 + R1() * 0.026).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect((i * 64 + o) % S + 1, j * 43 + 1, 62, 41);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.2;
    for (j = 0; j <= 3; j++) { g.beginPath(); g.moveTo(0, j * 43); g.lineTo(S, j * 43); g.stroke(); }
    for (j = 0; j < 3; j++) {
      var oo = (j % 2) ? 32 : 0;
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * 64 + oo, j * 43); g.lineTo(i * 64 + oo, (j + 1) * 43); g.stroke(); }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(0.5, 0.5);
    t.anisotropy = 4;
    _tex.tile = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.92, metalness: 0.04 }),
      tile:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.92, metalness: 0.04 }),
      dark:  std(0x0d0e0f, 0.80, 0.20),     /* slots, grilles, rims, the shroud's bore */
      panel: std(0x3a3838, 0.85, 0.10),     /* missile lids, hatch covers */
      metal: std(0x3a4045, 0.55, 0.45),     /* masts, hub, vanes */
      cap:   std(0xa9adb0, 0.70, 0.10),     /* the pale mast head */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function push(mat, geo) {
      if (geo.index) geo = geo.toNonIndexed();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, (z || 0) - SHIFT);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        push(mat, geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z - SHIFT), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        push(mat, geo);
      },
      done: function (T, g) {
        var k;
        for (k in by) {
          var list = by[k], n = 0, i, j;
          for (i = 0; i < list.length; i++) n += list[i].attributes.position.count;
          var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { P[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) U[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(P, 3));
          G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
          G.setAttribute("uv", new THREE.BufferAttribute(U, 2));
          var mesh = new THREE.Mesh(G, T[k]);
          mesh.name = "m_" + k;
          mesh.castShadow = true; mesh.receiveShadow = true;
          g.add(mesh);
        }
      }
    };
  }

  /* flip a closed indexed body to wind outward if its signed volume is negative */
  function outward(g) {
    var P = g.attributes.position.array, ix = g.getIndex(), a = ix.array, v = 0, i;
    for (i = 0; i < a.length; i += 3) {
      var i0 = a[i] * 3, i1 = a[i + 1] * 3, i2 = a[i + 2] * 3;
      var ax = P[i0], ay = P[i0 + 1], az = P[i0 + 2], bx = P[i1], by = P[i1 + 1], bz = P[i1 + 2];
      var cx = P[i2], cy = P[i2 + 1], cz = P[i2 + 2];
      v += ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx);
    }
    if (v < 0) {
      for (i = 0; i < a.length; i += 3) { var t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
    }
    g.computeVertexNormals();
    return g;
  }

  /* the hull loft: lower half an ellipse, upper half the flat-topped superellipse; closed at the bow
     tip, open at the tail where the shroud's hub takes over */
  function hullGeo(THREE, xs, segs) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = hw(x), h = hh(x), c0 = zc(x), p = pU(x);
      for (j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, c = Math.cos(t), sn = Math.sin(t);
        var up = sn >= 0, e = up ? 2 / p : 1;
        var y = w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);
        var z = c0 + h * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e);
        pos.push(x, y, z);
        uv.push((x - XS) / (XE - XS), j / segs);
      }
    }
    var ring = segs + 1;
    for (i = 0; i < xs.length - 1; i++) {
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, cc = a + ring, d = cc + 1;
        idx.push(a, b, cc, b, d, cc);
      }
    }
    /* bow tip fan */
    var tip = pos.length / 3, L = xs.length - 1;
    pos.push(X(1919.5), 0, zc(xs[L])); uv.push(1, 0.5);
    for (j = 0; j < segs; j++) idx.push(L * ring + j, L * ring + j + 1, tip);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    /* the signed-volume test needs a closed body: the tail end is open, so orient by the first face */
    var P = pos, a0 = idx[0] * 3, a1 = idx[1] * 3, a2 = idx[2] * 3;
    var ux = P[a1] - P[a0], uy = P[a1 + 1] - P[a0 + 1], uz = P[a1 + 2] - P[a0 + 2];
    var vx = P[a2] - P[a0], vy = P[a2 + 1] - P[a0 + 1], vz = P[a2 + 2] - P[a0 + 2];
    var ny = uz * vx - ux * vz;                         /* y of the face normal at girth 0 (port beam) */
    if (ny < 0) {
      for (i = 0; i < idx.length; i += 3) { var tt = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = tt; }
      g.setIndex(idx);
    }
    g.computeVertexNormals();
    return g;
  }

  /* closed stack of horizontal outlines (counter-clockwise from above), metre UVs, top cap */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      var run = 0, prev = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prev[0]) * (p[0] - prev[0]) + (p[1] - prev[1]) * (p[1] - prev[1]));
        prev = p;
        pos.push(p[0], p[1], rings[i].z); uv.push(run, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    var top = rings[L - 1], base = pos.length / 3, cx = 0, cy = 0, k;
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    cx /= N; cy /= N;
    pos.push(cx, cy, top.z); uv.push(cx, cy);
    for (k = 0; k < N; k++) { pos.push(top.pts[k][0], top.pts[k][1], top.z); uv.push(top.pts[k][0], top.pts[k][1]); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* spanwise loft of elliptic sections: st = [[span, x of mid chord, chord, thickness]]; axis "y"
     for a horizontal plane (thickness along z, about c0), "z" for an upright fin (along y); capped */
  function foil(THREE, st, axis, c0, n) {
    var pos = [], uv = [], idx = [], i, j, L = st.length, ring = n + 1;
    for (i = 0; i < L; i++) {
      var sp = st[i][0], xm = st[i][1], ch = st[i][2], th = st[i][3];
      for (j = 0; j <= n; j++) {
        var f = j / n * PI * 2, cf = Math.cos(f);
        /* a blunter leading edge (forward, +x) than trailing edge */
        var ax = xm + ch / 2 * cf, at = th / 2 * Math.sin(f) * (cf > 0 ? 1 : 0.6 + 0.4 * (1 + cf));
        if (axis === "y") pos.push(ax, sp, c0 + at); else pos.push(ax, c0 + at, sp);
        uv.push(ax, sp + at);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < n; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var ends = [0, L - 1], e;
    for (e = 0; e < 2; e++) {
      var si = ends[e], ci = pos.length / 3, sx = st[si][1], ss = st[si][0];
      if (axis === "y") pos.push(sx, ss, c0); else pos.push(sx, c0, ss);
      uv.push(sx, ss);
      for (j = 0; j < n; j++) {
        if (e === 0) idx.push(ci, si * ring + j + 1, si * ring + j);
        else idx.push(ci, si * ring + j, si * ring + j + 1);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return outward(g);
  }

  /* thin patch on the hull flank: x0..x1, z0..z1 (z may be a function of x), 'off' proud */
  function sidePatch(THREE, sign, x0, x1, z0, z1, off, nx) {
    nx = nx || 6;
    var nz = 2, pos = [], idx = [], i, j, x, z;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx;
        var zb = typeof z0 === "function" ? z0(x) : z0, zt = typeof z1 === "function" ? z1(x) : z1;
        z = zb + (zt - zb) * j / nz;
        pos.push(x, sign * (sideY(x, z) + off), z);
      }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        if (sign > 0) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* thin patch on the crown: x0..x1, y0..y1 (y0 < y1), 'off' proud, normals up */
  function crownPatch(THREE, x0, x1, y0, y1, off, nx, ny) {
    var pos = [], idx = [], i, j, x, y;
    for (j = 0; j <= ny; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; y = y0 + (y1 - y0) * j / ny;
        pos.push(x, y, topAt(x, y) + off);
      }
    }
    for (j = 0; j < ny; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a rounded-rectangle ring (or disc when ri = 0) laid on the crown; outline from rr() */
  function rr(cx, cy, hx, hy, rc, n) {
    var pts = [], per = n / 4, k, i;
    var cs = [[cx + hx - rc, cy + hy - rc, 0], [cx - hx + rc, cy + hy - rc, 0.5 * PI],
              [cx - hx + rc, cy - hy + rc, PI], [cx + hx - rc, cy - hy + rc, 1.5 * PI]];
    for (k = 0; k < 4; k++) {
      for (i = 0; i < per; i++) {
        var a = cs[k][2] + (i / (per - 1)) * 0.5 * PI;
        pts.push([cs[k][0] + rc * Math.cos(a), cs[k][1] + rc * Math.sin(a)]);
      }
    }
    return pts;
  }
  function crownRing(THREE, outer, inner, off) {
    var pos = [], idx = [], k, n = outer.length;
    for (k = 0; k < n; k++) {
      var o = outer[k], ii = inner ? inner[k] : null;
      pos.push(o[0], o[1], topAt(o[0], o[1]) + off);
      if (ii) pos.push(ii[0], ii[1], topAt(ii[0], ii[1]) + off);
    }
    if (inner) {
      for (k = 0; k < n; k++) {
        var a = k * 2, b = ((k + 1) % n) * 2;
        idx.push(a, b, a + 1, a + 1, b, b + 1);
      }
    } else {
      var cx = 0, cy = 0;
      for (k = 0; k < n; k++) { cx += outer[k][0]; cy += outer[k][1]; }
      cx /= n; cy /= n;
      var ci = pos.length / 3;
      pos.push(cx, cy, topAt(cx, cy) + off);
      for (k = 0; k < n; k++) idx.push(k, (k + 1) % n, ci);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function strut(THREE, A, mat, r0, r1, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r1, r0, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function lathe(THREE, prof, seg) {
    var pp = [], i;
    for (i = 0; i < prof.length; i++) pp.push(new THREE.Vector2(prof[i][1], prof[i][0]));
    var g = new THREE.LatheGeometry(pp, seg);
    g.rotateZ(-PI / 2);                              /* lathe axis y -> x */
    return g;
  }

  /* sail plan: aft corners rc0, the rounded fore end rc1; x0 aft, x1 fore, half-width w */
  function sailPlan(x0, x1, w, rc0, rc1, n) {
    var pts = [], k, a, q = n / 4;
    for (k = 0; k < q; k++) { a = k / (q - 1) * PI / 2; pts.push([x1 - rc1 + rc1 * Math.cos(a), w - rc1 + rc1 * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = PI / 2 + k / (q - 1) * PI / 2; pts.push([x0 + rc0 + rc0 * Math.cos(a), w - rc0 + rc0 * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = PI + k / (q - 1) * PI / 2; pts.push([x0 + rc0 + rc0 * Math.cos(a), -w + rc0 + rc0 * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = 1.5 * PI + k / (q - 1) * PI / 2; pts.push([x1 - rc1 + rc1 * Math.cos(a), -w + rc1 + rc1 * Math.sin(a)]); }
    return pts;
  }

  var SX0 = X(1228), SX1 = X(1462), SHW = 2.9, ZT = Z(118);

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, s, x, z;

    /* ---- hull: one lofted body from the tail cone in the shroud to the bow ---- */
    var xs = [], px;
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 80; px < 1900; px += 32) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    var xs2 = [];
    for (i = 0; i < xs.length; i++) if (!i || xs[i] - xs2[xs2.length - 1] > 0.6) xs2.push(xs[i]);
    A.add("skin", hullGeo(THREE, xs2, 48), 0, 0, 0);

    /* ---- the flank: the long low slot (713-1367 px, rows 280-293), three grilles (363-397 px,
       rows 273-290) and the round grate (473 px, row 270), small hatches ---- */
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", sidePatch(THREE, s, X(716), X(1364), Z(292), Z(281), 0.05, 40), 0, 0, 0);
      /* rounded ends of the slot */
      A.add("dark", sidePatch(THREE, s, X(713), X(716), Z(290), Z(283), 0.05, 1), 0, 0, 0);
      A.add("dark", sidePatch(THREE, s, X(1364), X(1367), Z(290), Z(283), 0.05, 1), 0, 0, 0);
      for (k = 0; k < 3; k++) {
        var gx0 = X(364 + k * 11.5), gx1 = gx0 + 0.78;
        A.add("dark", sidePatch(THREE, s, gx0, gx1, Z(290), Z(273), 0.05, 1), 0, 0, 0);
        for (i = 1; i < 5; i++) {                          /* the grille bars */
          var gz = Z(290) + (Z(273) - Z(290)) * i / 5;
          A.add("panel", sidePatch(THREE, s, gx0 + 0.04, gx1 - 0.04, gz - 0.05, gz + 0.05, 0.08, 1), 0, 0, 0);
        }
      }
      /* the round grate: a pale rim and the dark mesh inside, set in the curved flank */
      var rx = X(473), rz = Z(270), ry = sideY(rx, rz);
      A.add("panel", new THREE.RingGeometry(0.72, 0.9, 20), rx, s * (ry + 0.13), rz, -s * PI / 2, 0, 0);
      A.add("dark", new THREE.CircleGeometry(0.72, 20), rx, s * (ry + 0.12), rz, -s * PI / 2, 0, 0);
      /* the bow-plane hatch (1620 px, the planes retract into the hull) */
      A.add("dark", sidePatch(THREE, s, X(1607), X(1633), Z(236), Z(234), 0.05, 2), 0, 0, 0);
      A.add("dark", sidePatch(THREE, s, X(1607), X(1609), Z(254), Z(234), 0.05, 1), 0, 0, 0);
      A.add("dark", sidePatch(THREE, s, X(1631), X(1633), Z(254), Z(234), 0.05, 1), 0, 0, 0);
      A.add("dark", sidePatch(THREE, s, X(1607), X(1633), Z(254), Z(252), 0.05, 2), 0, 0, 0);
    }
    /* small deck hatches at row 191: a pair aft (363-400 px) and three forward (1531, 1620, 1702 px),
       and the hatch at 1809 px, row 209; drawn on both sides of the crown */
    var HT = [[368, 191], [392, 191], [1531, 191], [1620, 191], [1702, 191]];
    for (k = 0; k < HT.length; k++) {
      x = X(HT[k][0]);
      var hy = sideY(x, Z(HT[k][1]));
      for (s = -1; s <= 1; s += 2) {
        A.add("dark", crownRing(THREE, rr(x, s * hy * 0.9, 0.8, 0.45, 0.15, 12), null, 0.05), 0, 0, 0);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", sidePatch(THREE, s, X(1804), X(1814), Z(211), Z(207), 0.05, 1), 0, 0, 0);
    }
    /* the slanted grille on the bow top (1827-1863 px): six bars each side */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 6; k++) {
        var bx0 = X(1829 + k * 6);
        A.add("dark", sidePatch(THREE, s, bx0, bx0 + 0.32, function (xx) { return Z(203) + (xx - X(1829)) * -0.08; },
                                function (xx) { return Z(187) + (xx - X(1829)) * -0.08; }, 0.05, 1), 0, 0, 0);
      }
    }

    /* ---- sixteen missile lids, two rows of eight (817-1133 px), a walkway between ---- */
    var LX0 = X(817), LP = (1133 - 817) / PXM / 8, LY = 1.75;
    for (k = 0; k < 8; k++) {
      x = LX0 + (k + 0.5) * LP;
      for (s = -1; s <= 1; s += 2) {
        var outer = rr(x, s * LY, 1.62, 1.42, 0.55, 24), inner = rr(x, s * LY, 1.45, 1.25, 0.45, 24);
        A.add("dark", crownRing(THREE, outer, inner, 0.08), 0, 0, 0);
        A.add("panel", crownRing(THREE, inner, null, 0.07), 0, 0, 0);
        /* the hinge fairing outboard of each lid */
        A.add("dark", crownPatch(THREE, x - 0.55, x + 0.55, s > 0 ? LY + 1.45 : -LY - 1.75, s > 0 ? LY + 1.75 : -LY - 1.45, 0.08, 2, 1), 0, 0, 0);
      }
    }
    A.add("dark", crownPatch(THREE, LX0 - 0.5, LX0 + 8 * LP + 0.5, -0.14, 0.14, 0.06, 16, 1), 0, 0, 0);
    /* the lid band's edge seams along the casing (the profile's panel line at row 172) */
    for (s = -1; s <= 1; s += 2) {
      var yb = s > 0 ? [3.55, 3.68] : [-3.68, -3.55];
      A.add("dark", crownPatch(THREE, LX0 - 0.5, LX0 + 8 * LP + 0.5, yb[0], yb[1], 0.05, 16, 1), 0, 0, 0);
    }

    /* ---- the sail: upright after wall, upright fore wall with a foot fillet (1462-1476 px), a
       small round on the top edge, a rounded fore end in plan; flat top at row 118 ---- */
    var rings = [], ZD = Z(160);
    var zl = [ZD - 0.9, ZD - 0.2, ZD + 0.15, ZD + 0.5, ZD + 1.1, ZT - 0.6, ZT - 0.3, ZT - 0.1, ZT];
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var fil = Math.max(0, 1 - Math.max(0, z - ZD) / 0.55);          /* 0..1 at the foot */
      var e2 = Math.max(0, z - (ZT - 0.6)) / 0.6, rd = 0.6 * (1 - Math.sqrt(Math.max(0, 1 - e2 * e2)));
      rings.push({ z: z, pts: sailPlan(SX0 - 0.25 * fil + rd * 0.6, SX1 + 1.25 * fil * fil - rd,
                                       SHW + 0.35 * fil * fil - rd * 0.8, 0.9, 2.4, 64) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* sail fittings off the profile: the bridge cockpit on the top fore end, a hatch aft on the top,
       the windows and hatches on the sides, the horizontal seam low on the sail */
    A.add("dark", new THREE.BoxGeometry(1.6, 1.5, 0.05), SX1 - 2.0, 0, ZT + 0.02);
    A.add("dark", new THREE.BoxGeometry(1.0, 0.9, 0.05), SX0 + 2.0, 0, ZT + 0.02);
    for (s = -1; s <= 1; s += 2) {
      var sy = s * (SHW + 0.01);
      A.add("dark", new THREE.BoxGeometry(0.75, 0.04, 0.3), X(1250), sy, Z(127));
      A.add("dark", new THREE.BoxGeometry(0.75, 0.04, 0.75), X(1310), sy, Z(140));
      A.add("dark", new THREE.BoxGeometry(0.55, 0.04, 0.55), X(1356), sy, Z(140));
      A.add("dark", new THREE.BoxGeometry(0.8, 0.04, 0.6), X(1440), sy, Z(150));
      A.add("dark", new THREE.BoxGeometry(1.0, 0.04, 1.6), X(1270), sy, Z(146));       /* side door */
      A.add("dark", new THREE.BoxGeometry(SX1 - SX0 - 2.2, 0.03, 0.06), (SX0 + SX1) / 2 - 0.3, sy, Z(150));
    }

    /* ---- masts off the profile: [px, lateral (estimated), top row, radius, kind] ---- */
    var MS = [[1272, 0.6, 47, 0.14, "rod"], [1313, -0.5, 6, 0.05, "whip"], [1326, 0.55, 80, 0.32, "fat"],
              [1336, -0.45, 64, 0.20, "pod"], [1408, 0.0, 72, 0.18, "knob"]];
    for (k = 0; k < MS.length; k++) {
      var mx = X(MS[k][0]), my = MS[k][1], mt = Z(MS[k][2]), mr = MS[k][3], kd = MS[k][4];
      if (kd === "pod") {
        strut(THREE, A, "metal", mr * 1.2, mr, [mx, my, ZT - 0.1], [mx, my, mt - 1.6], 10);
        A.add("cap", new THREE.CylinderGeometry(0.36, 0.40, 1.3, 14), mx, my, mt - 0.95, PI / 2, 0, 0);
        A.add("cap", new THREE.SphereGeometry(0.36, 12, 6, 0, PI * 2, 0, PI / 2), mx, my, mt - 0.3, PI / 2, 0, 0);
      } else if (kd === "fat") {
        strut(THREE, A, "metal", mr * 1.1, mr, [mx, my, ZT - 0.1], [mx, my, mt - 0.15], 12);
        A.add("metal", new THREE.CylinderGeometry(mr * 0.9, mr, 0.3, 12), mx, my, mt - 0.1, PI / 2, 0, 0);
      } else if (kd === "knob") {
        strut(THREE, A, "metal", mr * 1.2, mr, [mx, my, ZT - 0.1], [mx, my, mt - 0.5], 10);
        A.add("metal", new THREE.SphereGeometry(mr * 1.6, 10, 8), mx, my, mt - 0.3, 0, 0, 0, [1, 1, 1.3]);
      } else if (kd === "rod") {
        strut(THREE, A, "metal", mr * 1.4, mr, [mx, my, ZT - 0.1], [mx, my, mt - 0.3], 8);
        A.add("metal", new THREE.CylinderGeometry(mr * 1.5, mr * 1.5, 0.6, 8), mx, my, mt - 0.3, PI / 2, 0, 0);
      } else {
        strut(THREE, A, "metal", 0.12, mr, [mx, my, ZT - 0.1], [mx, my, mt], 6);
      }
    }

    /* ---- the stern off the profile ---- */
    var ZA = -3.05;
    /* upper rudder: trailing edge upright at 116 px, top row 144, leading edge 152 px at the top
       curving down to the hull at 170 px */
    var ur = [[Z(228), 144, 0.95], [Z(204), 142, 0.95], [Z(192), 140, 0.9], [Z(176), 138, 0.85],
              [Z(160), 136, 0.8], [Z(150), 134.5, 0.72], [Z(145.5), 134, 0.55], [Z(144), 134, 0.3]];
    var urc = [56, 52, 48, 44, 40, 37, 35, 30], st = [];
    for (i = 0; i < ur.length; i++) st.push([ur[i][0], X(116 + urc[i] / 2), urc[i] / PXM, ur[i][2]]);
    A.add("tile", foil(THREE, st, "z", 0, 14), 0, 0, 0);
    /* lower rudder: trailing edge at 100 px, to row 340 under the keel, leading edge 172-164 px */
    var lr = [[Z(268), 74], [Z(300), 72], [Z(320), 68], [Z(334), 66], [Z(339), 63], [Z(340), 58]];
    var lt = [0.95, 0.95, 0.9, 0.85, 0.6, 0.3];
    st = [];
    for (i = 0; i < lr.length; i++) st.push([lr[i][0], X(100 + lr[i][1] / 2), lr[i][1] / PXM, lt[i]]);
    A.add("tile", foil(THREE, st, "z", 0, 14), 0, 0, 0);
    /* stern planes: root fairing forward to 210 px, the tip between the END PLATES (120-175 px) */
    var EY = 5.6, ec = (175 - 120) / PXM, exm = X((120 + 175) / 2);
    for (s = -1; s <= 1; s += 2) {
      var spl = [[1.0 * s, X((116 + 210) / 2), (210 - 116) / PXM, 0.75], [3.6 * s, X((118 + 192) / 2), (192 - 118) / PXM, 0.62],
                 [4.6 * s, X((119 + 180) / 2), (180 - 119) / PXM, 0.52], [EY * s, exm, ec, 0.45]];
      if (s < 0) spl.reverse();
      A.add("tile", foil(THREE, spl, "y", ZA, 14), 0, 0, 0);
      /* the end plate: an upright slab rows 233-270, rounded corners via thin end sections */
      var epl = [[Z(270), exm + 0.1, ec - 0.6, 0.18], [Z(268.5), exm, ec - 0.1, 0.34], [Z(252), exm, ec, 0.40],
                 [Z(234.5), exm, ec - 0.1, 0.34], [Z(233), exm + 0.1, ec - 0.6, 0.18]];
      A.add("tile", foil(THREE, epl, "z", s * (EY + 0.05), 14), 0, 0, 0);
    }
    /* pump-jet: the shroud 12-66 px (outer radius 3.19 m at 48-60 px), its dark bore, the hub cone
       0-12 px and the stator vanes (seven: count not confirmed) */
    var shO = [[X(10), 2.42], [X(16), 2.62], [X(24), 2.86], [X(34), 3.04], [X(46), 3.17], [X(56), 3.19],
               [X(62), 3.12], [X(65), 3.0], [X(66.5), 2.82]];
    var sh = lathe(THREE, shO, 36);
    A.add("tile", outwardLathe(sh, 1), 0, 0, ZA);
    var shI = [[X(10), 2.36], [X(20), 2.46], [X(40), 2.58], [X(60), 2.70], [X(66.5), 2.80]];
    var si = lathe(THREE, shI, 36);
    A.add("dark", outwardLathe(si, -1), 0, 0, ZA);
    /* the lip ring at the exit */
    A.add("tile", new THREE.TorusGeometry(2.39, 0.05, 4, 36), X(10), 0, ZA, 0, PI / 2, 0);
    /* hub: the tail cone runs on inside the shroud to the hub tip at 0 px */
    var hub = lathe(THREE, [[X(0), 0.03], [X(1), 0.22], [X(4), 0.62], [X(8), 0.86], [X(14), 1.0], [X(30), 1.2],
                            [X(50), 1.45], [X(64.5), 1.74]], 20);
    A.add("metal", outwardLathe(hub, 1), 0, 0, ZA);
    for (k = 0; k < 7; k++) {
      var va = k * 2 * PI / 7 + 0.22;
      var v0 = [X(52), Math.cos(va) * 1.5, Math.sin(va) * 1.5 + ZA], v1 = [X(54), Math.cos(va) * 2.66, Math.sin(va) * 2.66 + ZA];
      var vg = new THREE.BoxGeometry(2.0, 0.09, 1.2);
      var qv = new THREE.Quaternion().setFromEuler(new THREE.Euler(va - PI / 2, 0, 0, "XYZ"));
      A.addQ("metal", vg, (v0[0] + v1[0]) / 2, (v0[1] + v1[1]) / 2, (v0[2] + v1[2]) / 2, qv);
    }

    /* ---- modest team strips: on the casing fore and aft of the missile deck, and the sail top ---- */
    A.add("team", crownPatch(THREE, X(1560), X(1600), -0.6, 0.6, 0.05, 2, 2), 0, 0, 0);
    A.add("team", crownPatch(THREE, X(560), X(600), -0.6, 0.6, 0.05, 2, 2), 0, 0, 0);
    A.add("team", new THREE.BoxGeometry(1.4, 1.4, 0.04), (SX0 + SX1) / 2, 0, ZT + 0.02);

    A.done(T, g);
    return g;
  }

  /* a lathe about +x (built about y then turned): sgn +1 faces out, -1 faces the axis */
  function outwardLathe(g, sgn) {
    g.computeVertexNormals();
    var P = g.attributes.position.array, N = g.attributes.normal.array, i, dot = 0;
    for (i = 0; i < P.length; i += 3) dot += P[i + 1] * N[i + 1] + P[i + 2] * N[i + 2];
    if ((dot < 0) === (sgn > 0)) {
      var ix = g.getIndex(), a = ix.array, t;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
      g.computeVertexNormals();
    }
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (hub tip to bow): render3d scales a submarine by it. */
UNIT_MODELS["ssbn_p"] = {
  len: 170.02,
  build: function (THREE, M, C) { return HeroBorei955A.build(THREE, M, C); }
};
