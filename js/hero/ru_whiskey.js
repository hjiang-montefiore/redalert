/* ============ ru_whiskey.js -- HERO model: Project 613 Whiskey (pact_e50_sub) ============
   Soviet medium patrol submarine, 1950s as built. Registered for pact_e50_sub.

   References (all Wikimedia Commons, fetched small into scratchpad/whiskey_ref):
     - "Whiskey I class SS.svg" (i.png): side elevation, the main source. 76 m
       drawn across 1280 px = 16.84 px/m. Gives the long flat-topped casing
       (deck about 1.3 m over the waterline), the stepped boxy fairwater
       (tall after block 0.6..9.5 m aft of amidships, lower forward step with
       the twin 25 mm bulge), the twin 57 mm gun on the casing ABAFT the
       fairwater with its barrels laid aft, the slanted after mast, the
       direction-finder loop, snorkel head and three thin periscope/aerial
       masts, rows of limber (free-flood) slots down the casing edge, the
       torpedo-loading hatch, the retractable bow planes, the stern planes,
       the single rudder and the twin shafts.
     - Whiskey-class underway c1964 (u64.jpg) and the port bow view with the
       number 340 (pb.jpg): hull and fairwater read black-grey, the casing is
       smooth and flat with no rails, the fairwater is a plain rectangular
       box with a squared bridge cockpit; the bow is blunt.
     - Balaklava museum model of Project 613 (bm.jpg): same blunt cigar,
       flat casing, boxy fairwater, red anti-fouling below the boot top.
     - Propeller blade count: NOT confirmed for the Project 613 by any source
       found (the Istanbul museum plaque names a Norwegian yard, so it is not
       taken as a Whiskey screw). A plain four-blade screw, 1.9 m across as
       the drawing scales it, is drawn and the count is flagged as a guess.
     - Variant and guns (en.wikipedia "Whiskey-class submarine"): Whiskey I
       = twin 25 mm on the tower; Whiskey II = twin 57 mm plus twin 25 mm;
       III = guns removed; IV = 25 mm + snorkel; V = no guns. The drawing
       (file name says Whiskey I, but it shows both a gun abaft the fairwater
       and a round tub on the forward step) matches the Whiskey II fit, and
       sub_specs.js gives deckGun:true with "twin 57 mm on the casing", so the
       Whiskey II fit of the early 1950s is drawn.
     - Hull profile, stern and bow are traced from the side elevations
       (i.png, v.png): the stem is raked with the deck line carried to the
       tip, the keel rises to it, the stern keeps almost the full depth to a
       tall blunt end with a full-height rudder, the stern planes sit high
       near the waterline, the bow planes are drawn RETRACTED in lens-shaped
       housings (two a side), the shafts run in long fairings on the lower
       flank, the propeller sits about 2.2 m under the waterline.
   Dimensions: 76 m long, 6.3 m beam (sub_specs.js; the drawing agrees).
   Not confirmed and so not drawn: no hull number, no flag, no rigging wires.
   Whiskey II fit (twin 57 mm aft of the fairwater, twin 25 mm on the
   fairwater step) -- the row's own sub_specs entry says deckGun:true.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. render3d draws
   a submarine low and scales it by UNIT_MODELS[key].len (the true 76 m). The
   row is not turret:true, so nothing here is named "turret".

   Geometry is merged per material (one draw call each).
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroWhiskey613 = (function () {
  "use strict";

  var PI = Math.PI;
  var HL = 75.0, XB = 37.5;        /* hull from x = -37.5 to 37.5, caps add 0.5 */
  var R = 3.15, ZA = -1.85;        /* pressure hull radius, axis below the WL   */
  var ZCASE = 1.35;                /* top of the casing                         */

  /* [s from the bow, radius] -- blunt stem, long parallel body, tail cone.  */
  var STA = [
    [0.000, 0.50], [0.006, 1.00], [0.014, 1.55], [0.028, 2.10], [0.050, 2.55],
    [0.080, 2.88], [0.120, 3.06], [0.170, 3.14], [0.220, 3.15], [0.720, 3.15],
    [0.780, 3.08], [0.830, 2.90], [0.880, 2.60], [0.920, 2.10], [0.945, 1.80],
    [0.965, 1.55], [0.980, 1.30], [0.992, 1.10], [1.000, 1.00]
  ];
  function hullR(x) {
    var s = (XB - x) / HL, i;
    if (s <= 0) return STA[0][1];
    if (s >= 1) return STA[STA.length - 1][1];
    for (i = 1; i < STA.length; i++) {
      if (s <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (s - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return 0.5;
  }

  /* full section at x: half-width w, half-height h, centre height zc. The bow
     carries the deck line to a raked tip; the stern keeps nearly the full depth
     to a tall blunt end (side elevations i.png, v.png). */
  function sec(x) {
    var s = (XB - x) / HL, w = hullR(x), h = w, zc = ZA, u;
    if (s < 0.22) zc = ZA + (R - w) * 0.85;
    else if (s > 0.72) {
      u = Math.min(1, (s - 0.72) / 0.28);
      h = R - u * (R - 2.55);
      zc = ZA + R - u * 0.6 - h;
    }
    return { w: w, h: h, zc: zc };
  }
  function ctop(x) { var q = sec(x); return Math.min(ZCASE, q.zc + q.h - 0.10); }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ---------------------------------------------------------- hull paint
     u runs stern..bow, v runs round the girth with v = 0.25 at the crown and
     0.75 at the keel; canvas row = (1 - v) * H. The waterline is where
     ZA + r sin(t) = 0, solved per column so the boot top follows the hull. */
  var _tex = null;
  function hullTex(THREE) {
    if (_tex) return _tex;
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(6131), i, x, r, wl, ya, yb;
    g.fillStyle = "#2e1f1d"; g.fillRect(0, 0, W, H);                 /* anti-fouling */
    for (i = 0; i < 1100; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      x = -XB + (i + 0.5) / W * HL;
      var q = sec(x);
      if (-q.zc >= q.h) continue;                                    /* all under water */
      wl = (-q.zc <= -q.h) ? 0.25 : Math.asin(-q.zc / q.h) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;                        /* above water */
      g.fillStyle = "#282d31"; g.fillRect(i, ya, 1, yb - ya);
      g.fillStyle = "rgba(10,11,13,0.8)";                             /* boot top */
      g.fillRect(i, yb, 1, 5); g.fillRect(i, ya - 5, 1, 5);
    }
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1;              /* frame seams */
    for (i = 0; i < W; i += 31) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    g.fillStyle = "rgba(0,0,0,0.65)";                                 /* free-flood slots low on the side */
    for (i = 70; i < 440; i += 11) {
      if ((i / 11 | 0) % 7 === 6) continue;
      g.fillRect(i, 0.40 * H, 5, 3); g.fillRect(i, 0.60 * H, 5, 3);
      g.fillRect(i, 0.88 * H, 5, 3); g.fillRect(i, 0.12 * H, 5, 3);
    }
    for (i = 0; i < 70; i++) {                                         /* streaks */
      g.fillStyle = "rgba(90,60,40," + (0.05 + R1() * 0.07).toFixed(3) + ")";
      g.fillRect(40 + R1() * 440, R1() < 0.5 ? 0.14 * H : 0.86 * H, 1.5, 6 + R1() * 14);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex = t;
    return t;
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
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

  /* lofted body with the winding flipped so FrontSide faces outward */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }

  /* stacked-ring shell over rounded-rectangle outlines; outward normals */
  function rrect(x0, x1, hw, rc, n) {
    var pts = [], per = n / 4, k, i, cx, cy, a0;
    var cs = [[x1 - rc, hw - rc, 0], [x0 + rc, hw - rc, 0.5 * PI],
              [x0 + rc, -hw + rc, PI], [x1 - rc, -hw + rc, 1.5 * PI]];
    for (k = 0; k < 4; k++) {
      cx = cs[k][0]; cy = cs[k][1]; a0 = cs[k][2];
      for (i = 0; i < per; i++) {
        var a = a0 + (i / (per - 1)) * 0.5 * PI;
        pts.push([cx + rc * Math.cos(a), cy + rc * Math.sin(a)]);
      }
    }
    return pts;
  }
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        pos.push(p[0], p[1], rings[i].z); uv.push(j / N, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    function cap(level, up) {
      var base = pos.length / 3, cx = 0, cy = 0, k;
      for (k = 0; k < N; k++) { cx += rings[level].pts[k][0]; cy += rings[level].pts[k][1]; }
      cx /= N; cy /= N;
      pos.push(cx, cy, rings[level].z); uv.push(0, 0);
      for (k = 0; k < N; k++) { p = rings[level].pts[k]; pos.push(p[0], p[1], rings[level].z); uv.push(0, 0); }
      for (k = 0; k < N; k++) {
        var m = base + 1 + k, n = base + 1 + ((k + 1) % N);
        if (up) idx.push(base, m, n); else idx.push(base, n, m);
      }
    }
    cap(L - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* flat extrusion of an outline: z from 0 to depth (bevel off, cheap) */
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);                     /* y -> z, thickness toward -y */
    g.computeVertexNormals();
    return g;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x23282c, 0.95, 0.04),     /* casing paint, matt */
      sail:  std(0x2d3338, 0.88, 0.06),     /* fairwater and gun, grey-black */
      dark:  std(0x15181b, 0.80, 0.20),     /* slots, hatches, barrels */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, fittings */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* cylinder between two points */
  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function box(THREE, A, mat, sx, sy, sz, x, y, z, rz) {
    A.add(mat, new THREE.BoxGeometry(sx, sy, sz), x, y, z, 0, 0, rz || 0);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, x, y, k;

    /* ---- pressure hull and its blunt stem and tail ---- */
    var secs = [];
    for (i = STA.length - 1; i >= 0; i--) {
      var qa = sec(XB - STA[i][0] * HL);
      secs.push({ x: XB - STA[i][0] * HL, w: qa.w, h: qa.h, zc: qa.zc, sq: 1.0 });
      if (i > 0) {                       /* a mid-station between each pair, for a smoother run */
        var sm = (STA[i][0] + STA[i - 1][0]) / 2, qm = sec(XB - sm * HL);
        secs.push({ x: XB - sm * HL, w: qm.w, h: qm.h, zc: qm.zc, sq: 1.0 });
      }
    }
    A.add("skin", body(THREE, M, secs, 48), 0, 0, 0);
    A.add("deck", new THREE.SphereGeometry(0.5, 10, 8), XB, 0, sec(XB).zc);
    A.add("deck", new THREE.SphereGeometry(1.0, 10, 8), -XB, 0, ZA, 0, 0, 0, [0.5, 1.0, 2.55]);

    /* ---- flat walking casing, full length, narrowing to the ends ---- */
    function caseW(x) { return Math.min(2.30, hullR(x) * 0.80 + 0.05); }
    var cs = [];
    for (x = -35.5; x <= 36.001; x += 2.5) {
      var ct = ctop(x) ;
      var zt = Math.min(ZCASE, ct), hh = Math.min(0.55, (zt - 0.0) / 2);
      cs.push({ x: x, w: caseW(x), h: Math.max(0.2, hh), zc: zt - Math.max(0.2, hh), sq: 0.22 });
    }
    A.add("deck", body(THREE, M, cs, 16), 0, 0, 0);

    /* ---- limber slots down the casing edge, as drawn in rows ---- */
    for (x = -33.0; x <= 34.0; x += 1.25) {
      if (x > -7.0 && x < 13.2) continue;           /* gun tub and fairwater */
      if (((x + 33) / 1.25 | 0) % 9 === 8) continue; /* the drawing leaves gaps */
      for (k = -1; k <= 1; k += 2) {
        box(THREE, A, "dark", 0.55, 0.08, 0.14, x, k * (caseW(x) - 0.01), Math.min(0.82, ctop(x) - 0.2));
      }
    }
    /* a second, short row of slots higher on the casing flank */
    for (x = -24.0; x <= -8.0; x += 2.0) for (k = -1; k <= 1; k += 2)
      box(THREE, A, "dark", 0.40, 0.08, 0.12, x, k * (caseW(x) - 0.01), Math.min(1.10, ctop(x) - 0.1));

    /* ---- casing hatches ---- */
    box(THREE, A, "dark", 2.60, 1.00, 0.10, 25.8, 0, ZCASE + 0.04);          /* torpedo loading hatch */
    box(THREE, A, "deck", 2.90, 1.30, 0.06, 25.8, 0, ZCASE + 0.02);          /* its coaming */
    for (k = 0; k < 3; k++) {
      x = [15.0, -12.5, -23.0][k];
      cylZ(THREE, A, "dark", 0.55, 0.55, 0.10, 14, x, 0, ZCASE + 0.05);       /* round access hatches */
    }
    for (k = 0; k < 4; k++) {                                                  /* vent mushrooms */
      x = [18.0, 8.0, -16.0, -28.0][k];
      for (i = -1; i <= 1; i += 2) {
        cylZ(THREE, A, "deck", 0.22, 0.22, 0.28, 8, x, i * 1.45, ctop(x) + 0.10);
        cylZ(THREE, A, "dark", 0.30, 0.30, 0.06, 8, x, i * 1.45, ctop(x) + 0.26);
      }
    }
    for (k = 0; k < 6; k++) {                                                  /* mooring bollards fore and aft */
      x = [34.2, 32.2, -31.0, -33.0, 29.0, -29.0][k];
      for (i = -1; i <= 1; i += 2) box(THREE, A, "metal", 0.50, 0.22, 0.20, x, i * Math.min(1.5, caseW(x) - 0.4), ctop(x) + 0.06);
    }

    /* ---- fairwater: tall after block, lower forward step (as drawn) ---- */
    var rings = [], zs = [1.0, 2.6, 4.2, 5.8, 6.10];
    /* base z 1.0 is inside the casing; the high block tops out 3.4 m over it */
    var hz = [1.0, 2.3, 3.6, 4.8, 5.0];
    for (i = 0; i < hz.length; i++) {
      var tap = (hz[i] - 1.0) * 0.045;
      rings.push({ z: hz[i], pts: rrect(0.8 + tap, 9.4 - tap * 0.6, 1.62 - tap, 0.55, 24) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    var fr = [], fz = [1.0, 2.0, 3.0, 3.5];
    for (i = 0; i < fz.length; i++) {
      var tp = (fz[i] - 1.0) * 0.10;
      fr.push({ z: fz[i], pts: rrect(8.6, 12.7 - tp * 1.6, 1.50 - tp * 0.5, 0.60, 24) });
    }
    A.add("sail", shell(THREE, fr), 0, 0, 0);
    /* coaming round the open bridge on the high block's forward edge */
    box(THREE, A, "sail", 0.16, 2.60, 0.34, 9.30, 0, 5.17);
    box(THREE, A, "sail", 3.40, 0.16, 0.30, 7.65, 1.43, 5.15);
    box(THREE, A, "sail", 3.40, 0.16, 0.30, 7.65, -1.43, 5.15);
    box(THREE, A, "dark", 2.60, 1.80, 0.06, 7.55, 0, 5.05);                    /* bridge well */

    /* ---- twin 25 mm on the forward step ---- */
    cylZ(THREE, A, "sail", 0.42, 0.50, 0.32, 14, 11.0, 0, 3.60);
    box(THREE, A, "sail", 1.00, 1.10, 0.52, 11.05, 0, 4.04);
    for (i = -1; i <= 1; i += 2) {
      cylX(THREE, A, "dark", 0.045, 0.045, 1.60, 8, 11.95, i * 0.20, 4.12);
      cylX(THREE, A, "dark", 0.07, 0.07, 0.22, 8, 12.65, i * 0.20, 4.12);
    }

    /* ---- masts and periscopes, as drawn ---- */
    var ztop = 5.0;
    strut(THREE, A, "metal", 0.07, [1.35, 0, ztop], [0.55, 0, 7.7], 6);       /* raked after mast */
    strut(THREE, A, "metal", 0.07, [2.70, 0, ztop], [2.70, 0, 8.2], 6);        /* DF loop mast */
    A.add("metal", new THREE.TorusGeometry(0.42, 0.04, 6, 14), 2.70, 0, 8.55, PI / 2, 0, 0);
    cylZ(THREE, A, "metal", 0.20, 0.20, 2.10, 10, 5.80, 0, ztop + 1.05);       /* snorkel */
    box(THREE, A, "dark", 0.62, 0.48, 0.70, 5.80, 0, ztop + 2.30);             /* its head valve */
    strut(THREE, A, "metal", 0.10, [6.75, 0, ztop], [6.75, 0, 8.6], 8);        /* periscopes and aerials */
    strut(THREE, A, "metal", 0.08, [7.30, 0, ztop], [7.30, 0, 8.3], 8);
    strut(THREE, A, "metal", 0.11, [7.65, 0, ztop], [7.65, 0, 9.8], 8);
    box(THREE, A, "dark", 0.30, 0.22, 0.45, 7.65, 0, 9.75);
    box(THREE, A, "dark", 0.26, 0.20, 0.40, 6.75, 0, 8.50);
    strut(THREE, A, "metal", 0.04, [35.0, 0, ctop(35.0)], [35.0, 0, ctop(35.0) + 1.7], 6);       /* bow and stern flag-staff masts, as drawn */
    strut(THREE, A, "metal", 0.04, [-33.6, 0, ctop(-33.6)], [-33.6, 0, ctop(-33.6) + 1.95], 6);

    /* ---- twin 57 mm abaft the fairwater, barrels laid aft as drawn ---- */
    box(THREE, A, "deck", 4.40, 2.90, 0.24, -2.00, 0, 1.42);                   /* low gun platform */
    cylZ(THREE, A, "sail", 0.60, 0.65, 0.55, 14, -1.20, 0, 1.78);
    box(THREE, A, "sail", 1.70, 1.50, 1.05, -1.20, 0, 2.55);                   /* shield and cradle */
    box(THREE, A, "sail", 0.55, 1.50, 0.50, -0.20, 0, 2.30, 0);
    for (i = -1; i <= 1; i += 2) {
      cylX(THREE, A, "dark", 0.062, 0.062, 3.30, 8, -4.05, i * 0.24, 2.62);
      cylX(THREE, A, "dark", 0.10, 0.10, 0.34, 8, -5.55, i * 0.24, 2.62);
    }
    box(THREE, A, "dark", 0.50, 0.40, 0.30, 0.9, 0, 1.60);                     /* ready-use locker */

    /* ---- bow planes: retracted, as the side elevations draw them -- two
       lens-shaped housings a side on the upper bow (x 34.4..37.0) ---- */
    for (k = -1; k <= 1; k += 2) {
      for (i = 0; i < 2; i++) {
        var bq = sec(35.7), bz = bq.zc + 0.45 - i * 1.0;
        var by = bq.w * Math.sqrt(Math.max(0.1, 1 - Math.pow((bz - bq.zc) / bq.h, 2)));
        A.add("sail", new THREE.SphereGeometry(1.0, 10, 6), 35.7, k * (by - 0.02), bz, 0, 0, 0, [1.3, 0.16, 0.26]);
      }
    }

    /* ---- stern: planes high near the waterline, tall single rudder, twin
       shafts in long flank fairings, four-blade screws ---- */
    var sp = [[-34.0, 0.9], [-34.6, 3.3], [-36.3, 3.3], [-36.9, 0.9], [-36.9, -0.9], [-36.3, -3.3], [-34.6, -3.3], [-34.0, -0.9]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.14), 0, 0, -0.55);
    var rp = [[-35.4, -1.25], [-37.2, 0.05], [-38.0, 0.05], [-38.0, -4.30], [-36.8, -4.30], [-35.4, -2.60]];
    A.add("sail", ext(THREE, rp, 0.26, true), 0, 0.13, 0);

    var bl = [[-0.08, 0.20], [-0.27, 0.45], [-0.32, 0.75], [-0.18, 0.95], [0.10, 0.96], [0.27, 0.75], [0.24, 0.45], [0.08, 0.20]];
    var BPX = -34.0, BPZ = -2.2;
    for (k = -1; k <= 1; k += 2) {
      var py = k * 1.55, pz = BPZ, px = BPX;
      /* shaft fairing: a tapered cone from the flank at x -24.8 down to the shaft at x -33.2 */
      var fa = [-24.8, k * 2.75, pz], fb = [-33.2, k * 1.62, pz];
      var fd = new THREE.Vector3(fb[0] - fa[0], fb[1] - fa[1], 0), fl = fd.length(), fq = new THREE.Quaternion();
      fq.setFromUnitVectors(new THREE.Vector3(0, 1, 0), fd.clone().normalize());
      A.addQ("metal", new THREE.CylinderGeometry(0.12, 0.55, fl, 12), (fa[0] + fb[0]) / 2, (fa[1] + fb[1]) / 2, pz, fq);
      cylX(THREE, A, "metal", 0.13, 0.13, 1.4, 10, -33.9, py, pz);              /* shaft stub */
      cylX(THREE, A, "screw", 0.26, 0.20, 0.60, 12, px + 0.10, py, pz);          /* boss */
      A.add("screw", new THREE.SphereGeometry(0.20, 10, 6), px - 0.28, py, pz);
      for (i = 0; i < 4; i++) {
        var gb = ext(THREE, bl, 0.035);
        gb.translate(0, 0, -0.0175);
        A.add("screw", gb, px, py, pz, i * PI / 2, 0.0, 0.0);
      }
    }

    /* ---- modest team strips: two flat panels on the casing, 2 cm up ---- */
    box(THREE, A, "team", 3.00, 0.90, 0.04, 29.5, 0, ZCASE + 0.02);
    box(THREE, A, "team", 3.00, 0.90, 0.04, -16.5, 0, ZCASE + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 76 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e50_sub"] = {
  len: 76,
  build: function (THREE, M, C) { return HeroWhiskey613.build(THREE, M, C); }
};
