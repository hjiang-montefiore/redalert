/* ============ ru_akula.js -- HERO model: Project 971 Shchuka-B / Akula I SSN (pact_e80_ssn)
   and the lengthened Project 971U Akula II (pact_e90_ssn) ============
   Soviet third-generation nuclear attack submarine, K-284 Akula, 1984 as the row says;
   the e90 row is K-157 Vepr (971U).

   References (Wikimedia Commons, fetched small; drawings in scratchpad/akula_ref,
   photographs in scratchpad/akula2_ref):
     - "AkulaProjekt971U right.png" (colour side elevation of the 971U, bow right):
       THE source for every station. Bow to tail cone end 1225 px; with the screw
       that is the 971U's 113.3 m, so 11.0 px/m. Gives the long almost cylindrical
       hull (full section 12-63 m abaft the bow, very round blunt bow, long fine tail
       cone), the low streamlined sail (raked fore edge, flat top 4.05 m over the
       crown, long convex ramp aft to the casing at 63.5 m), the mast columns, the
       pod on the upper rudder, the cruciform tail, the root fairing of the stern
       planes, the single screw (3.4 m), the sonar covers and the flood openings.
     - "AkulaProjekt971klein.png" (Alexpl 2008, after Apalkov 2003 and Ilyin and
       Kolesnikov 2006): port elevations of the 1st-flight Akula I, the 2nd flight
       and the two 971U-family boats to one scale. Measured: bow-to-sail stations
       are identical in the 971U and the Akula I; the 971U is 33 px (3.2 m) longer
       and the difference lies abaft the sail (its note "longer hull" spans the after
       body). So the 3 m plug is drawn in the after body, 74 m abaft the bow (the
       Akula I is the drawing less that plug). Its notes also give the one external
       difference drawn here: the 1st-flight boats have the early water intake "as
       used on Typhoon" (a long lozenge low on each side, drawn on the e80) and the
       later boats the modified intake "as used on Oscar-2" (a flat-topped fairing,
       drawn on the e90). Not drawn: the "SOKS" sensors the notes mention (not
       confirmed for K-284 in 1984) and the drawing's different flood-hole pattern.
     - US DoD photographs of surfaced Akula I boats: "Akula class submarine
       starboard quarter view.JPEG", "Akula submarine DN-SN-91-00616.JPG", "Akula
       class submarine stern view.jpg", "Akula class submarine.JPG" (K-322): two
       masts raised on the sail, the rest housed, plain grey heads; the pod on the
       upper rudder is round in section (stern view); the sail narrows strongly to
       a rounded top and ends aft in a sharp knife edge; broad low hull.
     - K-157 Vepr (971U): "Submarine Vepr by Ilya Kurganov crop.jpg", "K-157 Vepr,
       Anno 2015.jpg": the same silhouette and pod; the raised mast carries the
       orange head (drawn on the e90 only).
     - INS Chakra (ex K-152, 971 family): "INS Chakra.jpg" (bow-on, measured: the
       sail about 4.4-4.6 m wide low down, 2.6-3.1 m high up, about 2 m at the
       rounded top, against the hull), "Indian Navy's TROPEX-2014 (8).JPG" (plan
       form of the sail: rounded nose, widest in its fore third, tapering aft),
       "Model of INS Chakra (S71).jpg" (pod about 2.2-2.4 m deep, screw about 3.5 m).
     - "Eksponaty muzeya Marinesko, modeli podlodok 09.jpg" (museum model of
       Project 971, the only reference found that shows the stern planes, which
       are under water in every photograph of a surfaced boat): long tapered
       planes on the tail cone just ahead of the screw, no end plates; measured
       against its screw, each plane reaches about 7-8 m out from the tail cone,
       so the tips are drawn at +-9.5 m (19 m span), root chord 4.9 m (drawing),
       tip chord 2.8 m. ESTIMATED from a museum model in perspective.
   Dimensions: e80 110.3 m, e90 113.3 m, beam 13.6 m (sub_specs.js). Draught: the
   crown is 2.4 m over the water line (the photographs show the boat very low).
   Not confirmed and so not drawn: no hull number, no flag, no rails, no SOKS, the
   housed masts (only the two raised ones), the bow planes (housed: only the slot).
   The sub_specs row says sailLen 17 / sailH 6.4; the drawing gives the fin about
   28 m long at the casing and 4.05 m over the crown (data mismatch reported, not
   edited). Row is not turret:true, so nothing is named "turret". ASCII only.
   Paint: dark grey rubber coat above the water line, red-brown below, per station
   in the hull texture (the model3d sheet shows a texture's MEAN colour, so the hull
   reads red-brown there; the game draws the boot line).
   Model space +X bow, +Y port, +Z up, metres; water line z = 0.
   render3d scales a submarine by UNIT_MODELS[key].len, the true length.
   Merged per material (8-9 draw calls). */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAkula971 = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 11.0;                      /* drawing pixels per metre (the 971U drawing at 113.3 m) */
  var XP = 1255;                       /* bow tip, drawing px */
  var PL = 3.0;                        /* the 971U's extra length, taken out of the drawing for the Akula I */
  var PLUG_AT = 74.0;                  /* where it sits: m abaft the bow, in the after body abaft the sail */
  var CZ = -3.96;                      /* axis height: crown 2.4 m over the water line */
  var HLEN = 1225 / PXM - PL;          /* Akula I hull to the tail cone end (108.36); the screw takes the rest */
  var SCR = 1.94;                      /* screw and hub cap abaft the tail cone end */
  var P = 0;                           /* current plug length (set per build) */

  function zOf(y) { return (268.5 - y) / PXM + CZ; }     /* drawing row -> metres over the water line */
  /* drawing column -> Akula I design distance abaft the bow (the 971U plug taken out) */
  function dOf(x) {
    var d = (XP - x) / PXM;
    return d <= PLUG_AT ? d : (d <= PLUG_AT + PL ? PLUG_AT : d - PL);
  }
  function ph(d) { return d > PLUG_AT ? d + P : d; }      /* design distance -> physical distance */
  function td(dp) { return dp <= PLUG_AT ? dp : (dp <= PLUG_AT + P ? PLUG_AT : dp - P); }

  /* [drawing column, centre row, radius px] sampled from the silhouette */
  var TABPX = [
    [1255, 268, 4], [1250, 268, 16], [1240, 268.5, 31.5], [1200, 268, 56], [1160, 268.5, 67.5],
    [1120, 268.8, 70.5], [560, 269, 70.5], [520, 271, 67], [480, 271, 65], [440, 271.5, 63.5],
    [400, 271.5, 61.5], [360, 271, 59], [320, 271.5, 54.5], [280, 271, 49], [240, 271, 43],
    [200, 271.5, 36.5], [160, 271.5, 30], [120, 271.5, 22], [80, 271.5, 15], [40, 271.5, 8.5],
    [30, 271.5, 7]
  ];
  var TAB = [], ti;
  for (ti = 0; ti < TABPX.length; ti++) TAB.push([dOf(TABPX[ti][0]), TABPX[ti][1], TABPX[ti][2]]);

  function lookup(d) {
    var i;
    if (d <= 0) return TAB[0];
    for (i = 1; i < TAB.length; i++) {
      if (d <= TAB[i][0]) {
        var a = TAB[i - 1], b = TAB[i], t = (d - a[0]) / (b[0] - a[0]);
        t = t * t * (3 - 2 * t) * 0.5 + t * 0.5;
        return [d, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      }
    }
    return TAB[TAB.length - 1];
  }
  /* x is model x; XB (half length) is set per build */
  var XB = 55.15;
  function dd(x) { return td(XB - x); }
  function hullH(x) { return lookup(dd(x))[2] / PXM; }
  /* the body is lofted at 1.02 x this: 13.6 m beam over the 12.8 m deep round section */
  function hullW(x) { var h = hullH(x); return h * (1.0 + 0.040 * Math.min(1, h / 6.2)); }
  function zcAt(x) { return zOf(lookup(dd(x))[1]); }
  function topAt(x) { return zcAt(x) + hullH(x); }
  function sideY(x, z) {
    var h = hullH(x) * 1.02, w = hullW(x) * 1.02, dz = (z - zcAt(x)) * 1.02;
    var v = 1 - (dz * dz) / (h * h);
    return w * Math.sqrt(Math.max(v, 0.01));
  }
  function X(px) { return XB - ph(dOf(px)); }              /* drawing column -> model x */

  /* ---- the sail, read off the elevation: [row, column] of its after and fore outline ---- */
  var SB = 2.4, ST = zOf(154);                             /* casing crown, flat top (4.05 m over) */
  var S_AFT = [[154, 745], [159, 700], [167, 660], [179, 620], [193, 580], [200, 560], [204, 545]];
  var S_FORE = [[154, 843], [159, 850], [163, 860], [190, 870], [198, 880]];
  function colAt(tab, z) {
    var r = 268.5 - (z - CZ) * PXM, i;
    if (r <= tab[0][0]) return tab[0][1];
    for (i = 1; i < tab.length; i++) {
      if (r <= tab[i][0]) {
        var a = tab[i - 1], b = tab[i];
        return a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
      }
    }
    return tab[tab.length - 1][1];
  }
  /* half-width over the height: 4.6 m low down to 2.9 m at the top (INS Chakra bow-on photograph) */
  function sailHW(z) { var t = Math.max(0, Math.min(1, (z - SB) / (ST - SB))); return 2.3 - 0.85 * t; }
  /* plan form: rounded nose, widest in the fore third, tapering to a narrow after edge */
  function sailHalf(s, L, hw) {
    var Ln = Math.min(hw * 1.5, 0.3 * L), v;
    if (s <= 0) return 0;
    if (s < Ln) { v = (Ln - s) / Ln; return hw * Math.sqrt(Math.max(0, 1 - v * v)); }
    v = Math.min(1, (s - Ln) / (L - Ln));
    return hw * (1 - 0.80 * Math.pow(v, 1.6));
  }
  function sailRing(x0, x1, hw, M) {
    var pts = [], L = x1 - x0, k, s;
    for (k = 0; k <= M; k++) { s = L * Math.pow(k / M, 1.5); pts.push([x1 - s, sailHalf(s, L, hw)]); }
    for (k = M; k >= 1; k--) { s = L * Math.pow(k / M, 1.5); pts.push([x1 - s, -sailHalf(s, L, hw)]); }
    return pts;
  }
  function sailW(x, z) {
    var x0 = X(colAt(S_AFT, z)), x1 = X(colAt(S_FORE, z));
    return sailHalf(x1 - x, x1 - x0, sailHW(z));
  }
  /* thin patch on the sail side (sign +1 port) */
  function sailPatch(THREE, sign, x0, x1, z0, z1, off) {
    var nx = 6, nz = 3, pos = [], idx = [], i, j, x, z;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; z = z0 + (z1 - z0) * j / nz;
        pos.push(x, sign * (sailW(x, z) + off), z);
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
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  var _tex = {};
  function hullTex(THREE) {
    if (_tex[P]) return _tex[P];
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(9711), i, j, wl, ya, yb, r, zc;
    g.fillStyle = "#5e3226"; g.fillRect(0, 0, W, H);                 /* red-brown anti-fouling below the line */
    for (i = 0; i < 700; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      var dm = td((1 - (i + 0.5) / W) * (HLEN + P));
      var L = lookup(dm); r = L[2] / PXM; zc = zOf(L[1]);
      if (r <= -zc) continue;
      wl = Math.asin(Math.max(-1, Math.min(1, -zc / r))) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;
      g.fillStyle = "#33373a"; g.fillRect(i, ya, 1, yb - ya);          /* dark grey rubber coat above the line */
    }
    /* faint anechoic tile joints on the dark upper hull */
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;
    for (i = 0; i < W; i += 9) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    for (j = 0; j < H; j += 8) { g.beginPath(); g.moveTo(0, j); g.lineTo(W, j); g.stroke(); }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex[P] = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x26292b, 0.95, 0.04),     /* tail end, hull caps, matt black */
      sail:  std(0x303538, 0.88, 0.06),     /* fin, rudders, planes, pod */
      dark:  std(0x0e1113, 0.80, 0.20),     /* flood openings, slots */
      panel: std(0x464b4e, 0.85, 0.10),     /* the large sonar covers */
      metal: std(0x3a4147, 0.55, 0.50),     /* mast tubes, shaft */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      cap:   std(0xb86a22, 0.60, 0.30),     /* the orange mast heads in the drawing */
      team:  std(team, 0.86, 0.06)
    };
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


  /* thin patch that follows the hull side: x0..x1, z0..z1, lifted off by 'off' (sign +1 port) */
  function patch(THREE, sign, x0, x1, z0, z1, off) {
    var nx = 6, nz = 4, pos = [], idx = [], i, j, x, z, y;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; z = z0 + (z1 - z0) * j / nz;
        y = sideY(x, z) + off;
        pos.push(x, sign * y, z);
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
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
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



  function build(THREE, M, C, plug) {
    var g = new THREE.Group();
    P = plug || 0;
    var u2 = P > 0;                                        /* the 971U */
    XB = (HLEN + SCR + P) / 2;
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, x, d, s;

    /* ---- hull: sections from the tail cone end to the bow ---- */
    var pds = [], xs = [], secs = [];
    for (i = 0; i < TAB.length; i++) pds.push(ph(TAB[i][0]));
    for (d = 1.2; d < HLEN + P - 0.5; d += 2.8) pds.push(d);
    pds.push(PLUG_AT + 0.01); pds.push(PLUG_AT + P + 0.01);
    for (i = 0; i < pds.length; i++) xs.push(XB - pds[i]);
    xs.sort(function (p, q) { return p - q; });
    for (i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] < 0.05) { xs.splice(i, 1); i--; }
    for (i = 0; i < xs.length; i++) {
      secs.push({ x: xs[i], w: hullW(xs[i]) * 1.02, h: hullH(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    A.add("skin", body(THREE, M, secs, 44), 0, 0, 0);
    var xbow = XB, xtail = XB - (HLEN + P);
    A.add("deck", new THREE.SphereGeometry(0.4, 10, 8), xbow - 0.4, 0, zcAt(xbow));
    A.add("deck", new THREE.CircleGeometry(hullH(xtail) + 0.02, 12), xtail, 0, zcAt(xtail), 0, -PI / 2, 0);

    /* ---- hydro-acoustic covers, bow-plane slot, water intakes ---- */
    var xi = X(468), zi = zOf(322);
    var Wi = hullW(xi) * 1.02, Hi = hullH(xi), yi = sideY(xi, zi), dzi = zi - zcAt(xi);
    var ai = Math.atan2(-dzi / (Hi * Hi), yi / (Wi * Wi));    /* the bilge surface faces out and down */
    for (i = -1; i <= 1; i += 2) {
      A.add("panel", patch(THREE, i, X(945), X(1035), zOf(322), zOf(208), 0.03), 0, 0, 0);
      A.add("dark", new THREE.BoxGeometry(1.8, 0.10, 0.16), X(1100), i * (sideY(X(1100), zOf(265)) - 0.02), zOf(265));
      /* water intake on the bilge: the 1st flight's early slim lozenge (klein drawing note 1, 7.8 x 1.3 m)
         or the later boats' modified, deeper fairing (note 5, 7.2 x 2.0 m) */
      A.add("sail", new THREE.SphereGeometry(1, 14, 8), xi, i * (yi - 0.08), zi, -i * ai, 0, 0,
            u2 ? [3.6, 0.32, 1.0] : [3.9, 0.30, 0.65]);
    }
    /* ---- flood openings (drawing) ---- */
    var up = [[350, 222], [420, 222], [430, 222], [495, 226], [525, 226], [556, 209], [566, 209],
              [630, 213], [634, 227], [663, 222], [708, 222], [745, 212], [775, 212], [810, 210],
              [838, 210], [868, 215], [870, 228], [908, 226], [1060, 218], [1135, 233], [1175, 233],
              [1090, 243], [1100, 243]];
    var lo = [];
    for (k = 0; k < 8; k++) lo.push([720 + k * 17, 323]);
    for (k = 0; k < 4; k++) lo.push([560 + k * 14, 331]);
    for (k = 0; k < 6; k++) lo.push([925 + k * 22, 330]);
    lo.push([880, 305]); lo.push([862, 305]); lo.push([620, 335]); lo.push([690, 335]);
    var all = up.concat(lo);
    for (k = 0; k < all.length; k++) {
      var fx = X(all[k][0]), fz = zOf(all[k][1]), lower = all[k][1] > 300;
      for (i = -1; i <= 1; i += 2) {
        A.add("dark", new THREE.BoxGeometry(lower ? 1.1 : 0.55, 0.14, lower ? 0.2 : 0.42), fx, i * (sideY(fx, fz) - 0.03), fz);
      }
    }

    /* ---- the sail: low and long, raked rounded nose, sides narrowing to a rounded top,
            convex ramp aft ending in a knife edge on the casing ---- */
    var rings = [], zl = [1.4, SB], z, sh, x0, x1, hw, RT = 0.6;
    for (k = 1; k <= 5; k++) zl.push(SB + (ST - RT - SB) * k / 5);
    var tops = [0.35, 0.6, 0.8, 0.93, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(ST - RT + RT * tops[k]);
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var e = Math.max(0, z - (ST - RT)) / RT;
      sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e * e)));
      x0 = X(colAt(S_AFT, z)) + sh; x1 = X(colAt(S_FORE, z)) - sh;
      hw = sailHW(z) - sh;
      rings.push({ z: z, pts: sailRing(x0, x1, hw, 18) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    /* escape-pod hatch outline on each side (drawing) and an opening on the ramp */
    for (i = -1; i <= 1; i += 2) {
      A.add("panel", sailPatch(THREE, i, X(762) - 1.55, X(762) + 1.55, 3.75, 5.85, 0.03), 0, 0, 0);
      A.add("dark", sailPatch(THREE, i, X(668) - 0.4, X(668) + 0.4, 3.5, 3.95, 0.03), 0, 0, 0);
    }

    /* ---- masts: as surfaced boats are photographed, two raised and the rest housed ---- */
    function ztop(px) {                                     /* sail top height at a drawing column */
      var i2, a, b2;
      if (px >= S_AFT[0][1]) return ST;
      for (i2 = 1; i2 < S_AFT.length; i2++) {
        if (px >= S_AFT[i2][1]) {
          a = S_AFT[i2 - 1]; b2 = S_AFT[i2];
          return zOf(a[0] + (b2[0] - a[0]) * (a[1] - px) / (a[1] - b2[1]));
        }
      }
      return SB;
    }
    var masts = [[727, 105, 0.17, 88], [712, 106, 0.20, 0]];
    for (k = 0; k < masts.length; k++) {
      var mx = X(masts[k][0]);
      strut(THREE, A, "metal", masts[k][2], [mx, 0, ztop(masts[k][0]) - 0.5], [mx, 0, zOf(masts[k][1])], 8);
      if (masts[k][3]) {
        var tipz = zOf(masts[k][3]);
        /* mast head: orange on the 971U (Vepr photograph), plain grey on the Akula I (DoD photographs) */
        cylZ(THREE, A, u2 ? "cap" : "metal", masts[k][2] * 1.15, masts[k][2] * 1.15, tipz - zOf(masts[k][1]), 10,
             mx, 0, (tipz + zOf(masts[k][1])) / 2);
      }
    }

    /* ---- cruciform stern with the towed-array pod on the upper rudder ---- */
    function pt(px, py) { return [X(px), zOf(py)]; }
    var ur = [pt(104, 262), pt(104, 190), pt(132, 190), pt(136, 215), pt(150, 232), pt(168, 246), pt(168, 262)];
    A.add("sail", ext(THREE, ur, 0.5, true), 0, 0.25, 0);
    var lr = [pt(104, 262), pt(104, 342), pt(130, 342), pt(158, 296), pt(158, 262)];
    A.add("sail", ext(THREE, lr, 0.5, true), 0, 0.25, 0);
    /* the pod: round in section (DoD stern-view photograph), 9.9 m long, 2.6 m across */
    var pod = [[72, 0.12], [85, 0.45], [100, 0.80], [120, 1.00], [145, 1.10], [165, 1.10], [178, 0.80], [182, 0.30]], psec = [];
    for (i = 0; i < pod.length; i++) psec.push({ x: X(pod[i][0]), w: 1.2 * pod[i][1], h: 1.2 * pod[i][1], zc: zOf(181), sq: 1.0 });
    A.add("sail", body(THREE, M, psec, 18), 0, 0, 0);
    var tz = zOf(271.5);
    A.add("sail", new THREE.SphereGeometry(1, 14, 8), X(138), 0, tz, 0, 0, 0, [2.6, 0.62, 0.62]);
    /* stern planes: long tapered planes just ahead of the screw (Project 971 museum model) */
    var xle = X(160), xte = X(106), SPY = 9.5;
    var sp = [[xle, 0.8], [xle - 1.6, SPY], [xle - 4.4, SPY], [xte, 0.8],
              [xte, -0.8], [xle - 4.4, -SPY], [xle - 1.6, -SPY], [xle, -0.8]];
    A.add("sail", ext(THREE, sp, 0.30), 0, 0, tz - 0.15);

    /* ---- single screw: shaft boss, hub cap, seven blades ---- */
    var px = xtail - (SCR - 0.65);
    A.add("deck", new THREE.CylinderGeometry(0.30, 0.22, 1.5, 10), xtail - 0.6, 0, tz, 0, 0, -PI / 2);
    A.add("screw", new THREE.CylinderGeometry(0.46, 0.34, 0.8, 12), px + 0.1, 0, tz, 0, 0, PI / 2);
    A.add("screw", new THREE.CylinderGeometry(0.06, 0.34, 0.6, 12), px - 0.35, 0, tz, 0, 0, PI / 2);
    var bl = [[-0.10, 0.34], [-0.45, 0.80], [-0.62, 1.30], [-0.40, 1.65], [0.05, 1.72], [0.34, 1.45], [0.40, 0.90], [0.18, 0.34]];
    for (i = 0; i < 7; i++) {
      var gb = ext(THREE, bl, 0.05);
      gb.translate(0, 0, -0.025);
      gb.rotateY(0.5);
      A.add("screw", gb, px, 0, tz, i * 2 * PI / 7, 0, 0);
    }

    /* ---- modest team strips on the casing crown ---- */
    A.add("team", new THREE.BoxGeometry(2.8, 0.9, 0.05), X(1060), 0, topAt(X(1060)) + 0.025);
    A.add("team", new THREE.BoxGeometry(2.8, 0.9, 0.05), X(500), 0, topAt(X(500)) + 0.03);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length: render3d scales a submarine by it. 971U per sub_specs.js 113.3 m. */
UNIT_MODELS["pact_e80_ssn"] = {
  len: 110.3,
  build: function (THREE, M, C) { return HeroAkula971.build(THREE, M, C, 0); }
};
UNIT_MODELS["pact_e90_ssn"] = {
  len: 113.3,
  build: function (THREE, M, C) { return HeroAkula971.build(THREE, M, C, 3.0); }
};
