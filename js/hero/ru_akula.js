/* ============ ru_akula.js -- HERO model: Project 971 Shchuka-B / Akula I SSN (pact_e80_ssn, K-284)
   and the lengthened Project 971U Akula II (pact_e90_ssn, K-157 Vepr) ============
   Soviet third-generation nuclear attack submarine. Full-quality redo, 2026-10-24.

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_akula_ref):
     - "AkulaProjekt971U right.png" (colour side elevation of the 971U, bow right): THE source for
       every station, the sail outline, the masts, the tail and the flood openings. Its columns are
       kept in the 1280 px frame of the first pass (bow tip 1255, tail-cone end 30: 11.0 px/m at
       the 971U's 113.3 m with the screw), which is exactly 4/3 of the 960 px render fetched this
       pass; re-checked at seven stations (bow 1200, body 800, 400, 320, 240, 160, tail 30): the
       top and keel lines agree within 1-2 px of the 960 px render.
     - "AkulaProjekt971klein.png" (Alexpl 2008, after Apalkov 2003 and Ilyin / Kolesnikov 2006):
       the flights to one scale. Measured again this pass at 960 px: the K-157 Vepr row is 877 px
       bow to screw, the 1st-flight row (K-317 / K-461, "laid down to 1988", the K-284 flight)
       852 px (ratio 1.029; 113.3 / 110.3 = 1.027); the top and keel lines are the same column for
       column from the bow to 580 px, then the Vepr's after body runs longer (keel 2-3 px fuller at
       640-720 px, the rudders 20 px further aft). So the 3 m plug is in the after body, 74 m abaft
       the bow, and the Akula I is the 971U drawing less that plug. The drawing's notes give the
       one other external difference drawn: the 1st flight's early bilge water intake "as used on
       Typhoon" (a long slim lozenge) and the later "as used on Oscar-2" (a deeper fairing).
     - US DoD photographs of surfaced Akula I boats, early 1990s: "Akula class submarine starboard
       quarter view.JPEG", "Akula submarine DN-SN-91-00616.JPG", "Akula class submarine.JPG" and
       "Akula class submarine stern view.jpg" (both K-322): the long low hull awash, the long low
       fin with its rounded nose and long ramp blending into the casing, two masts raised, the
       chunky upper rudder with the big pod, round in section with the array outlet at its after
       tip (stern view), rows of flood slots along the casing, and weathered tiles (light patches
       where tiles are worn or lost, starboard quarter view).
     - K-157 Vepr: "Submarine Vepr by Ilya Kurganov crop.jpg" and "K-157 Vepr, Anno 2015.jpg": the
       same silhouette and pod; three masts raised (a short whip forward, the thick mast with the
       orange head, a tall slim mast aft); the white dashed strake along the bow at the water line;
       matte black tiles; paint sampled here.
     - INS Chakra (ex K-152, 971 family): "INS Chakra.jpg" (bow-on: the fin bell-shaped, flaring
       into the hull, about 4.5 m wide low down and 2 m at the rounded top), "Indian Navy's
       TROPEX-2014 (8).JPG" (the torpedo-tube shutter outlines on the bow, the fin's plan form,
       black tiles), "Model of INS Chakra (S71).jpg" (the bow plane EXTENDED, swept, at mid-height
       about an eighth of the length abaft the bow; the rudder panels outlined on both fins).
     - "Eksponaty muzeya Marinesko, modeli podlodok 09.jpg" (museum model of Project 971): the six
       tube shutters round the bow, the long tapered stern planes on the tail cone ahead of the
       screw (no end plates), the seven-bladed skewed bronze screw, black overall.

   RECOGNITION (each one shows on the final sheets):
     1. Very full, almost cylindrical hull, 13.6 m beam, a blunt round bow and a long fine tail
        cone (drawing; Chakra bow-on; DoD photographs).
     2. The long, LOW faired fin: rounded raked nose, flat top 4.05 m over the casing, a long convex
        ramp aft blending into the casing 28 m abaft its nose (drawing; DoD; Vepr).
     3. The fin's bell section: sides narrowing to a rounded top, foot flaring into the hull
        (Chakra bow-on; K-322 stern view).
     4. The big towed-array pod on top of the upper rudder: round, blunt forward, tapering aft to
        the outlet (drawing; DoD stern view and K-322; Vepr).
     5. Cruciform stern: chunky upper rudder under the pod, deep lower rudder, rudder panels hinged
        on both (drawing; Chakra model), long tapered stern planes with the root lens (museum model;
        drawing).
     6. Bow planes, extended, swept, at mid-height forward (Chakra model; the slot on the drawing).
     7. Single seven-bladed skewed bronze screw on a pointed hub (drawing; museum model).
     8. Rows of dark flood slots along the casing and the bilge (drawing; DoD; Vepr).
     9. Torpedo-tube shutter outlines round the bow, four a side (museum model; TROPEX).
    10. Matte black anechoic tile courses all over (Vepr; Chakra; TROPEX); worn light patches on
        the Akula I (DoD starboard quarter view).
    11. Masts as photographed: two plain masts (Akula I, DoD); whip, orange-headed mast and tall
        slim mast (Vepr).
   Akula I vs Akula II, only where the sources show it: the 3 m plug abaft the sail; the bilge
   intake (slim lozenge / deeper fairing); the masts raised; the white dashed bow strake (Vepr
   photographs, 2010s; NOT confirmed for 1996, drawn on the e90 row only).

   CORRECTED from the first pass (ru_akula.js of HEAD):
     - Paint: the first pass painted the drawing's colours (grey over red-brown). No photograph
       shows that; every photograph and both builder's models show the boats black, so the hull is
       black tiles to the keel. Sampled: Vepr's fin in shade (39,49,50), the water's cast taken out
       and taken to ~0.75: #282c2e (e90); TROPEX-2014 hull in daylight (51,47,45) at ~0.85:
       #2b2826 (e80), with the worn patches of the DoD photograph.
     - The fin now flares into the hull (it stood on the casing as a plain extrusion).
     - The bow planes are drawn extended (Chakra model); the first pass drew only the slot.
     - The drawing's light "sonar cover" rectangles are flush outlines in the texture, not lighter
       panels (no photograph shows a lighter panel).
     - The pod's after tip has the array outlet (DoD stern view).
   ESTIMATED, not measured: fin width (Chakra bow-on against the hull); bow plane size (3.6 m root
   chord, 3.0 m out, Chakra model); stern-plane span +-9.5 m (museum model in perspective); mast
   heights over the fin (photographs against the fin height); the tube shutter positions round the
   bow (museum model).
   NOT DRAWN: hull numbers, names, flags, ensigns, rails, the "SOKS" sensors of later boats (not
   confirmed for K-284 in 1984 or K-157), the housed masts, the drawing's red-brown underbody (see
   above), the light sonar window of the museum model's bow (a model finish; no photograph).
   Dimensions: e80 110.3 m, e90 113.3 m (sub_specs.js; the model's X extent is the same figure),
   beam 13.6 m. Draught: the crown is 3.3 m over the water line: the Vepr photographs show the
   white bow strake just above the water, and the drawing puts that strake 36.5 px (3.3 m) under
   the crown (the first pass had 2.4 m, from the DoD photographs of boats underway and awash). The sub_specs row says sailLen 17 / sailH 6.4; the drawing gives the fin about 28 m
   long at the casing and 4.05 m over the crown (data mismatch reported, not edited).
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len and draws a "sub" row at a fixed datum under the surface; it reads no named
   nodes of a submarine, and the row is not turret:true, so nothing is named. Merged per material:
   e80 13,280 triangles, 6 draw calls, 6 materials; e90 13,608, 7 and 7 (the orange mast head);
   2 canvas textures each. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAkula971 = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 11.0;                      /* drawing px per metre (1280 px frame of the 971U elevation) */
  var XP = 1255;                       /* bow tip, drawing px */
  var PL = 3.0;                        /* the 971U's extra length, taken out of the drawing for the Akula I */
  var PLUG_AT = 74.0;                  /* where it sits: m abaft the bow, in the after body */
  var CZ = -3.11;                      /* axis height: crown 3.3 m over the water line */
  var HLEN = 1225 / PXM - PL;          /* Akula I bow to the tail-cone end (108.36); the screw takes the rest */
  var SCR = 1.94;                      /* screw and hub abaft the tail-cone end */
  var P = 0;                           /* current plug length (set per build) */

  /* per-variant data */
  var V80 = {
    id: "e80", plug: 0, paint: "#2b2826", wear: 0.11, intake: "early", strake: false,
    /* [drawing column, radius, height over the fin top, kind]: two plain masts raised (DoD) */
    masts: [[727, 0.17, 3.6, "plain"], [712, 0.20, 2.2, "plain"]]
  };
  var V90 = {
    id: "e90", plug: 3.0, paint: "#282c2e", wear: 0.03, intake: "mod", strake: true,
    /* a short whip forward, the thick orange-headed mast, the tall slim mast (Vepr photographs) */
    masts: [[791, 0.05, 2.4, "whip"], [729, 0.24, 5.2, "orange"], [712, 0.11, 6.0, "slim"]]
  };

  function zOf(y) { return (268.5 - y) / PXM + CZ; }     /* drawing row -> metres over the water line */
  function dOf(x) {                                        /* drawing column -> Akula I design distance */
    var d = (XP - x) / PXM;
    return d <= PLUG_AT ? d : (d <= PLUG_AT + PL ? PLUG_AT : d - PL);
  }
  function ph(d) { return d > PLUG_AT ? d + P : d; }      /* design distance -> physical distance */
  function td(dp) { return dp <= PLUG_AT ? dp : (dp <= PLUG_AT + P ? PLUG_AT : dp - P); }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* [drawing column, centre row, radius px] -- the profile's top and keel lines */
  var TABPX = [
    [1255, 268, 0.4], [1254.4, 268, 5.5], [1250, 268, 16], [1240, 268.5, 31.5], [1220, 268.3, 45.5],
    [1200, 268, 56], [1180, 268.3, 62.5], [1160, 268.5, 67.5], [1120, 268.8, 70.5], [560, 269, 70.5],
    [520, 271, 67], [480, 271, 65], [440, 271.5, 63.5], [400, 271.5, 61.5], [360, 271, 59],
    [320, 271.5, 54.5], [280, 271, 49], [240, 271, 43], [200, 271.5, 36.5], [160, 271.5, 30],
    [120, 271.5, 22], [80, 271.5, 15], [40, 271.5, 8.5], [30, 271.5, 7]
  ];
  var TAB = [], ti;
  for (ti = 0; ti < TABPX.length; ti++) TAB.push([dOf(TABPX[ti][0]), TABPX[ti][1], TABPX[ti][2]]);

  /* station lookup by design distance; in the bow (first 12 m) r^2 runs linear, which follows the
     drawing's round nose instead of faceting it into a cone */
  function lookup(d) {
    var i;
    if (d <= TAB[0][0]) return TAB[0];
    for (i = 1; i < TAB.length; i++) {
      if (d <= TAB[i][0]) {
        var a = TAB[i - 1], b = TAB[i], t = (d - a[0]) / (b[0] - a[0]);
        if (b[0] <= 12.5) {
          return [d, a[1] + (b[1] - a[1]) * t, Math.sqrt(Math.max(0, a[2] * a[2] + (b[2] * b[2] - a[2] * a[2]) * t))];
        }
        t = t * t * (3 - 2 * t) * 0.5 + t * 0.5;
        return [d, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      }
    }
    return TAB[TAB.length - 1];
  }
  var XB = 55.15;                                          /* half length, set per build */
  function dd(x) { return td(XB - x); }
  function hullH(x) { return lookup(dd(x))[2] / PXM; }
  /* lofted 13.6 m wide over the 12.8 m deep round section */
  function hullW(x) { var h = hullH(x); return h * (1.0 + 0.040 * Math.min(1, h / 6.2)) * 1.02; }
  function zcAt(x) { return zOf(lookup(dd(x))[1]); }
  function sideY(x, z) {
    var h = hullH(x), w = hullW(x), dz = z - zcAt(x);
    return w * Math.sqrt(Math.max(1 - (dz * dz) / (h * h), 0.0004));
  }
  function topZ(x, y) {
    var h = hullH(x), w = hullW(x);
    return zcAt(x) + h * Math.sqrt(Math.max(1 - (y * y) / (w * w), 0.0004));
  }
  function X(px) { return XB - ph(dOf(px)); }              /* drawing column -> model x */

  /* ---- the sail, read off the elevation: [row, column] of its after and fore outline ---- */
  var SB = zOf(198.5), ST = zOf(154);                      /* casing crown, flat top (4.05 m over) */
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
  /* half-width over the height: 2.3 m at the casing to 1.65 m under the rounded top (Chakra bow-on:
     about 4.7 m wide over the fillet, 3.4 m near the top, the fillet flaring to about 8 m) */
  function sailHW(z) { var t = clamp((z - SB) / (ST - SB), 0, 1); return 2.3 - 0.65 * t; }
  /* plan form: rounded nose, widest in the fore third, tapering to a narrow after edge (TROPEX) */
  function sailHalf(s, L, hw) {
    var Ln = Math.min(hw * 1.5, 0.3 * L), v;
    if (s <= 0) return 0;
    if (s < Ln) { v = (Ln - s) / Ln; return hw * Math.sqrt(Math.max(0, 1 - v * v)); }
    v = Math.min(1, (s - Ln) / (L - Ln));
    return hw * (1 - 0.80 * Math.pow(v, 1.6));
  }
  /* closed plan ring, nose tip first, aft along port, forward along starboard (counter-clockwise) */
  function sailRing(x0, x1, hw, M) {
    var pts = [], L = x1 - x0, k, s;
    for (k = 0; k <= M; k++) { s = L * Math.pow(k / M, 1.6); pts.push([x1 - s, Math.max(0.02, sailHalf(s, L, hw))]); }
    for (k = M - 1; k >= 1; k--) pts.push([pts[k][0], -pts[k][1]]);
    return pts;
  }
  function sailW(x, z) {
    var x0 = X(colAt(S_AFT, z)), x1 = X(colAt(S_FORE, z));
    return sailHalf(x1 - x, x1 - x0, sailHW(z));
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* 2 m tile patch for the parts with metre UVs: fin, rudders, planes, pod */
  var _tex = {};
  function tileTex(THREE, V) {
    if (_tex["t" + V.id]) return _tex["t" + V.id];
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d"), R1 = rng(9712), i, j;
    g.fillStyle = V.paint; g.fillRect(0, 0, S, S);
    for (j = 0; j < 3; j++) {
      for (i = -1; i < 2; i++) {
        var o = (j % 2) ? 32 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.012 + R1() * 0.03).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.04 + R1() * 0.07).toFixed(3) + ")";
        g.fillRect(i * 64 + o + 1, j * 43 + 1, 62, 41);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.2;
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
    _tex["t" + V.id] = t;
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
          var Pa = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { Pa[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) U[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(Pa, 3));
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
  /* stacked rings (each {z, pts:[[x,y(,z)]..]}, counter-clockwise from above), metre UVs, flat cap
     on the last; a point's own z (third value) overrides the ring's */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p, zz;
    for (i = 0; i < L; i++) {
      var run = 0, prev = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prev[0]) * (p[0] - prev[0]) + (p[1] - prev[1]) * (p[1] - prev[1]));
        prev = p;
        zz = p.length > 2 ? p[2] : rings[i].z;
        pos.push(p[0], p[1], zz); uv.push(run, zz);
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
  /* flat extrusion of an outline; xz: the outline is (x, z), thickness toward -y; metre UVs */
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);
    g.computeVertexNormals();
    return g;
  }
  /* a grid patch; fn(u, v) -> [x, y, z]; metre UVs */
  function gridGeo(THREE, nx, nz, fn, flip) {
    var pos = [], uv = [], idx = [], i, j, a, b, c, d, v;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) { v = fn(i / nx, j / nz); pos.push(v[0], v[1], v[2]); uv.push(v[0], v[2]); }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        a = j * (nx + 1) + i; b = a + 1; c = a + nx + 1; d = c + 1;
        if (flip) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    P = V.plug;
    XB = (HLEN + SCR + P) / 2;
    var A = Acc(THREE);
    var i, j, k, x, d, sg, z;

    /* ---- hull stations: the drawn table, every 2.6 m along, every 0.25 m in the bow's first 3 m ---- */
    var pds = [], xs = [], secs = [];
    for (i = 0; i < TAB.length; i++) pds.push(ph(TAB[i][0]));
    for (d = 1.2; d < HLEN + P - 0.5; d += 2.6) pds.push(d);
    for (d = 0.1; d < 3.0; d += 0.25) pds.push(d);
    pds.push(PLUG_AT + 0.01); pds.push(PLUG_AT + P + 0.01); pds.push(HLEN + P);
    for (i = 0; i < pds.length; i++) if (pds[i] <= HLEN + P + 1e-6) xs.push(XB - pds[i]);
    xs.sort(function (p, q) { return p - q; });
    for (i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] < 0.05) { xs.splice(i, 1); i--; }
    for (i = 0; i < xs.length; i++) secs.push({ x: xs[i], w: hullW(xs[i]), h: hullH(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    var X0 = xs[0], X1 = xs[xs.length - 1], xtail = X0;

    /* ---- hull texture: u stern -> bow over the loft, v round the girth (0 port beam, 0.25 crown,
       0.5 starboard beam); the canvas is flipped on upload, so row = (1 - v) H ---- */
    var TW = 1024, TH = 512, cv = cvs(TW, TH), cx = cv.getContext("2d"), R1 = rng(971 + P * 10);
    var girth = PI * (6.8 + 6.41);
    function uOf(xx) { return (xx - X0) / (X1 - X0) * TW; }
    function rowOf(xx, zz, s) {
      var t = Math.asin(clamp((zz - zcAt(xx)) / hullH(xx), -1, 1)), v;
      v = s > 0 ? t / (2 * PI) : 0.5 - t / (2 * PI);
      if (v < 0) v += 1;
      return (1 - v) * TH;
    }
    cx.fillStyle = V.paint; cx.fillRect(0, 0, TW, TH);
    var tw = 1.1 / (X1 - X0) * TW, th = TH / Math.round(girth / 0.72), nc = Math.round(TH / th);
    for (j = 0; j < nc; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < TW; i++) {
        var r0 = R1();
        cx.fillStyle = r0 < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.024).toFixed(3) + ")"
                                : "rgba(0,0,0," + (0.03 + R1() * 0.07).toFixed(3) + ")";
        cx.fillRect(i * tw + off + 0.5, j * th + 0.5, tw - 1, th - 1);
      }
    }
    for (i = 0; i < 70; i++) {                               /* patches of replaced tiles */
      var bw = tw * (2 + Math.floor(R1() * 6)), bh = th * (1 + Math.floor(R1() * 3));
      cx.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.10)";
      cx.fillRect(R1() * TW, R1() * TH, bw, bh);
    }
    /* worn and lost tiles: light streaks on the upper hull (DoD starboard quarter view, Akula I) */
    for (i = 0; i < Math.round(V.wear * 900); i++) {
      var wv = 0.03 + R1() * 0.44, wc = R1() * TW;
      cx.fillStyle = "rgba(150,150,146," + (0.10 + R1() * 0.16).toFixed(3) + ")";
      cx.fillRect(wc, (1 - wv) * TH, tw * (1 + Math.floor(R1() * 3)), th * (1 + Math.floor(R1() * 2)));
    }
    cx.strokeStyle = "rgba(0,0,0,0.34)"; cx.lineWidth = 1;
    for (j = 0; j <= nc; j++) { cx.beginPath(); cx.moveTo(0, j * th); cx.lineTo(TW, j * th); cx.stroke(); }
    for (j = 0; j < nc; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < TW; i++) { cx.beginPath(); cx.moveTo(i * tw + o2, j * th); cx.lineTo(i * tw + o2, (j + 1) * th); cx.stroke(); }
    }
    /* flush outlines both sides: the drawing's large flank covers and bow window, and the tube
       shutters round the bow (museum model; TROPEX) */
    cx.strokeStyle = "rgba(0,0,0,0.55)"; cx.lineWidth = 1.4;
    function outline(c0, c1, r0w, r1w) {
      for (sg = -1; sg <= 1; sg += 2) {
        var u0 = uOf(X(c1)), u1 = uOf(X(c0)), xm = X((c0 + c1) / 2);
        var y0 = rowOf(xm, zOf(r0w), sg), y1 = rowOf(xm, zOf(r1w), sg);
        cx.strokeRect(Math.min(u0, u1), Math.min(y0, y1), Math.abs(u1 - u0), Math.abs(y1 - y0));
      }
    }
    outline(947, 1033, 210, 321);
    outline(1123, 1236, 261, 319);
    /* the slanted grille on the bow shoulder (drawing) */
    for (sg = -1; sg <= 1; sg += 2) {
      for (k = 0; k < 3; k++) {
        var gx0 = X(1190 + k * 4), gx1 = X(1222), gzr = 214 + k * 5;
        cx.beginPath(); cx.moveTo(uOf(gx0), rowOf(gx0, zOf(gzr + 6), sg)); cx.lineTo(uOf(gx1), rowOf(gx1, zOf(gzr), sg)); cx.stroke();
      }
    }
    for (sg = -1; sg <= 1; sg += 2) {
      var TUBES = [[1.6, 0.62], [3.1, 0.42], [2.1, 0.12], [3.7, 0.02]];
      for (k = 0; k < TUBES.length; k++) {
        var tx = XB - ph(TUBES[k][0]), tz = zcAt(tx) + hullH(tx) * TUBES[k][1];
        var ty = rowOf(tx, tz, sg), tvr = Math.abs(rowOf(tx, tz + 0.5, sg) - ty);
        cx.beginPath(); cx.ellipse(uOf(tx), ty, Math.max(2.5, 0.42 / (X1 - X0) * TW), Math.max(2.5, tvr), 0, 0, 2 * PI); cx.stroke();
      }
    }
    /* hull ring seams (Vepr 2015; museum model) */
    cx.fillStyle = "rgba(0,0,0,0.40)";
    var SEAMS = [9.5, 27.0, 50.5, 86.0];
    for (k = 0; k < SEAMS.length; k++) cx.fillRect(uOf(XB - ph(SEAMS[k])) - 0.7, 0, 1.4, TH);
    /* the white dashed strake at the water line, where the drawing puts it (row 233, columns
       947-1033 and 1143-1236); photographed on the Vepr only */
    if (V.strake) {
      var SK = [[947, 1033], [1143, 1236]];
      for (sg = -1; sg <= 1; sg += 2) {
        for (k = 0; k < SK.length; k++) {
          for (d = SK[k][0]; d < SK[k][1]; d += 7) {
            var sx0 = X(d), sx1 = X(Math.min(d + 5, SK[k][1])), sxm = (sx0 + sx1) / 2;
            var ya = rowOf(sxm, zOf(233) + 0.2, sg), yb = rowOf(sxm, zOf(233) - 0.2, sg);
            cx.fillStyle = "rgba(205,207,208,0.80)";
            cx.fillRect(uOf(sx0), Math.min(ya, yb), uOf(sx1) - uOf(sx0), Math.max(1.5, Math.abs(yb - ya)));
          }
        }
      }
    }
    var tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;

    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    var T = {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tex, roughness: 0.92, metalness: 0.04 }),
      tile:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, V), roughness: 0.92, metalness: 0.04 }),
      dark:   std(0x0c0d0f, 0.80, 0.20),     /* flood slots, outlets, hinge lines */
      metal:  std(0x34383c, 0.55, 0.45),     /* masts, shaft */
      bronze: std(0x6e5c38, 0.45, 0.70),     /* screw (drawing; museum model) */
      cap:    std(0xa8641f, 0.60, 0.30),     /* the orange mast head (Vepr photographs) */
      team:   std(team, 0.86, 0.06)
    };

    /* ---- hull ---- */
    A.add("skin", body(THREE, M, secs, 56), 0, 0, 0);
    A.add("tile", new THREE.CircleGeometry(hullH(xtail) + 0.02, 16), xtail, 0, zcAt(xtail), 0, -PI / 2, 0);

    /* ---- water intakes on the bilge: the 1st flight's slim lozenge or the later deeper fairing ---- */
    var xi = X(468), zi = zOf(322);
    var Wi = hullW(xi), Hi = hullH(xi), yi = sideY(xi, zi), dzi = zi - zcAt(xi);
    var ai = Math.atan2(-dzi / (Hi * Hi), yi / (Wi * Wi));    /* the bilge surface faces out and down */
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("tile", new THREE.SphereGeometry(1, 16, 8), xi, sg * (yi - 0.08), zi, -sg * ai, 0, 0,
            V.intake === "mod" ? [3.6, 0.32, 1.0] : [3.9, 0.30, 0.65]);
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
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.BoxGeometry(lower ? 1.1 : 0.55, 0.14, lower ? 0.2 : 0.42), fx, sg * (sideY(fx, fz) - 0.03), fz);
      }
    }

    /* ---- bow planes, extended, swept, at mid-height (Chakra model; the slot on the drawing) ---- */
    var bpx = X(1100), bpz = zcAt(bpx) + 0.35;
    for (sg = -1; sg <= 1; sg += 2) {
      var y0 = sideY(bpx, bpz) - 0.3, sp = 3.0;
      var bpl = [[bpx + 1.8, sg * y0], [bpx + 0.5, sg * (y0 + sp)], [bpx - 1.4, sg * (y0 + sp)], [bpx - 1.8, sg * y0]];
      var gp = ext(THREE, bpl, 0.34);
      gp.translate(0, 0, -0.17);
      A.add("tile", gp, 0, 0, bpz);
      /* the housing the plane withdraws into */
      A.add("dark", gridGeo(THREE, 3, 1, (function (s1) { return function (u, v) {
        var xx = bpx - 1.95 + 3.9 * u, zz = bpz - 0.3 + 0.6 * v; return [xx, s1 * (sideY(xx, zz) + 0.02), zz]; }; })(sg), sg > 0), 0, 0, 0);
    }

    /* ---- the fin: low and long, raked round nose, bell section flaring into the hull, a long
            convex ramp aft ending on the casing ---- */
    var rings = [], f, zn, hw, xa, xf, pts, NS = 22;
    var FL = [0, 0.1, 0.24, 0.42, 0.64, 0.86, 1.0], FH = 1.5, FW = 1.55, FE = 0.9;
    for (k = 0; k < FL.length; k++) {
      f = FL[k]; zn = SB + FH * f;
      hw = sailHW(zn) + FW * (1 - f) * (1 - f);
      xf = X(colAt(S_FORE, zn)) + FE * (1 - f) * (1 - f);
      xa = X(colAt(S_AFT, zn)) - 1.2 * (1 - f) * (1 - f);
      pts = sailRing(xa, xf, hw, NS);
      for (j = 0; j < pts.length; j++) {
        var zs = topZ(pts[j][0], pts[j][1]) - 0.12;
        pts[j].push((1 - f) * zs + f * Math.max(zn, zs));
      }
      rings.push({ z: zn, pts: pts });
    }
    var RT = 0.6, zl = [];
    for (k = 1; k <= 4; k++) zl.push(SB + FH + (ST - RT - SB - FH) * k / 4);
    var tops = [0.35, 0.62, 0.82, 0.94, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(ST - RT + RT * tops[k]);
    function sailSec(zz) {
      var e = Math.max(0, zz - (ST - RT)) / RT, sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e * e)));
      return { xa: X(colAt(S_AFT, zz)) + sh, xf: X(colAt(S_FORE, zz)) - sh, hw: sailHW(zz) - sh };
    }
    for (k = 0; k < zl.length; k++) {
      var sc = sailSec(zl[k]);
      rings.push({ z: zl[k], pts: sailRing(sc.xa, sc.xf, sc.hw, NS) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* thin strip on the fin side, following its surface (sign +1 port) */
    function finStrip(s1, xa0, xa1, za, zb, wdt) {
      var horiz = (zb - za) === 0;
      return gridGeo(THREE, 4, 1, function (u, v) {
        var xx = xa0 + (xa1 - xa0) * u, zz = za + (zb - za) * u;
        var nz = (zb - za) === 0 ? 1 : 0;
        zz += nz ? (v - 0.5) * wdt : 0;
        xx += nz ? 0 : (v - 0.5) * wdt;
        return [xx, s1 * (sailW(xx, zz) + 0.03), zz];
      }, horiz ? s1 > 0 : s1 < 0);
    }
    /* escape-chamber hatch outline on each side (drawing, 3.1 m x 2.1 m) and the opening on the ramp */
    var hx0 = X(762) - 1.55, hx1 = X(762) + 1.55, hz0 = SB + 1.35, hz1 = SB + 3.45;
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", finStrip(sg, hx0, hx1, hz0, hz0, 0.09), 0, 0, 0);
      A.add("dark", finStrip(sg, hx0, hx1, hz1, hz1, 0.09), 0, 0, 0);
      A.add("dark", finStrip(sg, hx0, hx0, hz0, hz1, 0.09), 0, 0, 0);
      A.add("dark", finStrip(sg, hx1, hx1, hz0, hz1, 0.09), 0, 0, 0);
      A.add("dark", gridGeo(THREE, 2, 2, (function (s1) { return function (u, v) {
        var xx = X(668) - 0.4 + 0.8 * u, zz = SB + 1.1 + 0.45 * v; return [xx, s1 * (sailW(xx, zz) + 0.03), zz]; }; })(sg), sg > 0), 0, 0, 0);
    }

    /* ---- masts as photographed ---- */
    for (k = 0; k < V.masts.length; k++) {
      var mc = V.masts[k], mx = X(mc[0]), mr = mc[1], mh = mc[2], kind = mc[3];
      if (kind === "orange") {
        /* thick mast, the orange head 1.1 m deep under a small lamp (Vepr photographs) */
        A.add("metal", new THREE.CylinderGeometry(mr, mr, mh - 1.2 + 0.6, 12), mx, 0, ST + (mh - 1.2) / 2 - 0.3, PI / 2, 0, 0);
        A.add("cap", new THREE.CylinderGeometry(mr * 1.25, mr * 1.4, 1.1, 14), mx, 0, ST + mh - 0.65, PI / 2, 0, 0);
        A.add("metal", new THREE.CylinderGeometry(mr * 0.5, mr * 0.7, 0.35, 10), mx, 0, ST + mh - 0.05, PI / 2, 0, 0);
        A.add("dark", new THREE.SphereGeometry(mr * 0.5, 10, 6, 0, 2 * PI, 0, PI / 2), mx, 0, ST + mh + 0.12, PI / 2, 0, 0);
      } else if (kind === "whip") {
        strut(THREE, A, "metal", mr, [mx, 0, ST - 0.2], [mx, 0, ST + mh], 6);
        A.add("metal", new THREE.CylinderGeometry(mr * 3, mr * 3, 0.45, 8), mx, 0, ST + 0.2, PI / 2, 0, 0);
      } else {
        /* a plain mast with a slightly slimmer head (DoD photographs) or the tall slim mast (Vepr) */
        A.add("metal", new THREE.CylinderGeometry(mr, mr * 1.05, mh - 0.8 + 0.6, 12), mx, 0, ST + (mh - 0.8) / 2 - 0.3, PI / 2, 0, 0);
        A.add("metal", new THREE.CylinderGeometry(mr * 0.75, mr * 0.95, 0.8, 12), mx, 0, ST + mh - 0.4, PI / 2, 0, 0);
        A.add("dark", new THREE.SphereGeometry(mr * 0.75, 10, 6, 0, 2 * PI, 0, PI / 2), mx, 0, ST + mh, PI / 2, 0, 0);
      }
    }

    /* ---- cruciform stern with the towed-array pod on the upper rudder ---- */
    function pt(px, py) { return [X(px), zOf(py)]; }
    var ur = [pt(104, 266), pt(104, 190), pt(132, 190), pt(136, 215), pt(150, 232), pt(168, 246), pt(176, 256), pt(176, 266)];
    A.add("tile", ext(THREE, ur, 0.6, true), 0, 0.3, 0);
    var lr = [pt(104, 277), pt(104, 342), pt(130, 342), pt(158, 296), pt(166, 284), pt(166, 277)];
    A.add("tile", ext(THREE, lr, 0.6, true), 0, 0.3, 0);
    /* rudder hinge lines on both fins (drawing; Chakra model) */
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(0.1, 0.04, zOf(190) - zOf(258) - 0.3), X(127), sg * 0.31, (zOf(190) + zOf(258)) / 2);
      A.add("dark", new THREE.BoxGeometry(0.1, 0.04, zOf(284) - zOf(342) - 0.3), X(128), sg * 0.31, (zOf(284) + zOf(342)) / 2);
      A.add("dark", new THREE.BoxGeometry(X(127) - X(104), 0.04, 0.1), (X(127) + X(104)) / 2, sg * 0.31, zOf(193));
      A.add("dark", new THREE.BoxGeometry(X(128) - X(104), 0.04, 0.1), (X(128) + X(104)) / 2, sg * 0.31, zOf(339));
    }
    /* the pod: round in section (DoD stern view), 9.9 m long, 2.6 m across, blunt forward,
       tapering aft to the array outlet */
    var pod = [[71, 0.30], [74, 0.42], [85, 0.58], [100, 0.84], [120, 1.02], [140, 1.12], [158, 1.14],
               [168, 1.08], [174, 0.94], [178, 0.74], [181, 0.48], [182.6, 0.18], [183, 0.02]], psec = [];
    var pzc = zOf(181);
    for (i = 0; i < pod.length; i++) psec.push({ x: X(pod[i][0]), w: 1.18 * pod[i][1], h: 1.18 * pod[i][1], zc: pzc, sq: 1.0 });
    A.add("tile", body(THREE, M, psec, 20), 0, 0, 0);
    A.add("dark", new THREE.CircleGeometry(0.30, 12), X(71) - 0.01, 0, pzc, 0, -PI / 2, 0);
    /* stern planes: long tapered planes on the tail cone ahead of the screw (museum model), with the
       root lens on the cone (drawing) */
    var tz = zOf(271.5);
    for (sg = -1; sg <= 1; sg += 2) {
      var lx = X(134);
      A.add("tile", new THREE.SphereGeometry(1, 16, 8), lx, sg * (sideY(lx, tz) - 0.3), tz, 0, 0, 0, [2.6, 0.62, 0.55]);
    }
    var xle = X(160), xte = X(106), SPY = 9.5;
    var spl = [[xle, 0.8], [xle - 1.6, SPY], [xle - 4.4, SPY], [xte, 0.8],
               [xte, -0.8], [xle - 4.4, -SPY], [xle - 1.6, -SPY], [xle, -0.8]];
    A.add("tile", ext(THREE, spl, 0.34), 0, 0, tz - 0.17);
    for (sg = -1; sg <= 1; sg += 2) {
      /* hinge of the moving after part, top and bottom */
      strut(THREE, A, "dark", 0.035, [xte + 2.1, sg * 1.6, tz + 0.18], [xle - 4.4 + 0.6, sg * (SPY - 0.2), tz + 0.18], 4);
      strut(THREE, A, "dark", 0.035, [xte + 2.1, sg * 1.6, tz - 0.18], [xle - 4.4 + 0.6, sg * (SPY - 0.2), tz - 0.18], 4);
    }

    /* ---- single screw: pointed hub, seven skewed blades (drawing; museum model) ---- */
    var rT = hullH(xtail);
    var hubP = [new THREE.Vector2(0.001, xtail - SCR), new THREE.Vector2(0.18, xtail - SCR + 0.35),
                new THREE.Vector2(0.38, xtail - SCR + 0.85), new THREE.Vector2(0.48, xtail - 0.7),
                new THREE.Vector2(rT * 0.9, xtail - 0.1), new THREE.Vector2(rT, xtail + 0.02)];
    var hub = new THREE.LatheGeometry(hubP, 16);
    hub.rotateZ(-PI / 2);
    A.add("bronze", hub, 0, 0, tz);
    var bl = [[-0.18, 0.36], [-0.48, 0.80], [-0.62, 1.30], [-0.42, 1.66], [0.02, 1.74], [0.32, 1.48], [0.38, 0.92], [0.20, 0.36]];
    for (i = 0; i < 7; i++) {
      var gb = ext(THREE, bl, 0.06);
      gb.translate(0, 0, -0.03);
      gb.rotateY(0.5);
      A.add("bronze", gb, xtail - 1.05, 0, tz, i * 2 * PI / 7, 0, 0);
    }

    /* ---- modest team marks on the casing crown, fore and aft ---- */
    function crownPatch(x0, x1) {
      return gridGeo(THREE, 3, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, yy = -0.5 + v; return [xx, yy, topZ(xx, yy) + 0.04];
      }, false);
    }
    A.add("team", crownPatch(X(1060) - 1.4, X(1060) + 1.4), 0, 0, 0);
    A.add("team", crownPatch(X(500) - 1.4, X(500) + 1.4), 0, 0, 0);

    A.done(T, g);
    return g;
  }

  return { build: build, V80: V80, V90: V90 };
})();

/* len is the true length: render3d scales a submarine by it (sub_specs.js 110.3 / 113.3); the
   model's X extent (hub tip to bow) is the same figure. */
UNIT_MODELS["pact_e80_ssn"] = {
  len: 110.3,
  build: function (THREE, M, C) { return HeroAkula971.build(THREE, M, C, HeroAkula971.V80); }
};
UNIT_MODELS["pact_e90_ssn"] = {
  len: 113.3,
  build: function (THREE, M, C) { return HeroAkula971.build(THREE, M, C, HeroAkula971.V90); }
};
