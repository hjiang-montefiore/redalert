/* ============ ru_foxtrot.js -- HERO model: Project 641 Foxtrot (pact_e60_sub) ============
   Soviet long-range diesel-electric attack submarine, three shafts, 1958-
   (sub_specs.js: 91.3 m, beam 7.4 m, three screws, no deck gun, black).
   Registered for pact_e60_sub. No other row borrows that key (grep of js/ and
   the html: only eras.js and sub_specs.js name it; no other navy has a Foxtrot row).

   References (Wikimedia Commons, fetched small into scratchpad/foxtrot_ref):
     - "Foxtrot class SS.svg" (svg.png): side elevation, the main source. The
       hull is 1905 px for 91.3 m (20.9 px/m). Gives the long flat casing,
       high forward and falling gently aft of the fairwater, the tall
       streamlined fairwater (raked after edge, upright rounded forward edge,
       a low step at the top aft for the bridge), the mast cluster (one very
       tall slender mast at the after edge, five thin periscope / aerial
       masts and a thick snorkel head), the rows of limber (free-flood) holes
       along the casing flank, the small open frame on the casing abaft
       amidships, the tall fitting on the upper bow, the keel line, the
       three screws and long shaft fairings at the tail, and the light bow
       housings.
     - USN photographs of a Cuban Foxtrot underway (sb.jpg, pb.jpg): hull,
       casing and fairwater read black, the casing is a wide flat deck with
       rust-brown weathering, the fairwater is a rounded-nosed upright box
       with a sharp after edge and an open bridge at the top, casing nearly
       awash underway; the boot top is reddish below black.
     - B-39 at San Diego (b39.jpg): the rounded squarish fairwater, the low
       smooth casing, the rails (museum fit, not drawn), black finish.
   Waterline: the drawing's white waterline puts the casing 2.3 m high; the
   photographs show the boat trimmed lower, so the casing is drawn 1.7 m over
   the waterline and the keel 5.7 m under it (published surfaced draught
   about 5 m is not confirmed here; the compromise is flagged).
   Not confirmed and so not drawn: no hull number, flag or rigging wires; the
   exact stern-plane and rudder shape (the drawing shows the tail only as a
   sloping end with shaft fairings, so a small pair of planes and a rudder are
   modelled in a general way); the blade count of the screws (four-blade
   drawn); the use of the tall bow fitting (drawn as the drawing shows it).
   Variant: the base Project 641 (no 641B / 641K refits drawn).

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. render3d draws
   a submarine low and scales it by UNIT_MODELS[key].len (the true 91.3 m). The
   row is not turret:true, so nothing here is named "turret".
   Geometry is merged per material (one draw call each). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroFoxtrot641 = (function () {
  "use strict";

  var PI = Math.PI;
  var XS = -45.65, XB = 45.65;     /* hull from stern to bow, caps add a little */

  /* [x, half-beam, casing top, keel] -- read off the side elevation, then
     lowered 0.6 m to the surfaced trim the photographs show. */
  var ST = [
    [-45.65, 0.12, 0.00, -2.30], [-44.50, 0.65, 0.05, -2.60], [-42.00, 1.40, 0.10, -3.20],
    [-38.00, 2.30, 0.20, -4.00], [-33.00, 3.05, 0.30, -4.80], [-28.00, 3.55, 0.50, -5.50],
    [-20.00, 3.70, 0.80, -5.70], [-12.00, 3.70, 1.15, -5.70], [1.00, 3.70, 1.65, -5.70],
    [14.00, 3.70, 1.75, -5.70], [36.00, 3.70, 1.85, -5.70], [38.50, 3.58, 1.90, -5.45],
    [41.00, 3.20, 1.95, -4.80], [43.00, 2.50, 1.98, -3.90], [44.50, 1.50, 2.00, -3.10],
    [45.30, 0.70, 2.00, -2.50], [45.65, 0.12, 2.00, -2.10]
  ];
  var SQ = 1.6;                    /* boxy double hull: flat top, rounded flank */
  function tab(x, k) {
    var i;
    if (x <= ST[0][0]) return ST[0][k];
    for (i = 1; i < ST.length; i++) {
      if (x <= ST[i][0]) {
        var a = ST[i - 1], b = ST[i], t = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return ST[ST.length - 1][k];
  }
  function ctop(x) { return tab(x, 2); }
  function sec(x) {
    var w = tab(x, 1), top = ctop(x) - 0.12, bot = tab(x, 3);
    return { w: w, h: (top - bot) / 2, zc: (top + bot) / 2 };
  }
  /* half-width of the hull at height z (for fittings on the flank) */
  function hullY(x, z) {
    var q = sec(x), u = Math.abs((z - q.zc) / q.h);
    if (u >= 1) return 0;
    return q.w * Math.pow(1 - Math.pow(u, SQ), 1 / SQ);
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }


  /* ---------------------------------------------------------- hull paint
     u runs stern..bow, v runs round the girth (t / 2 pi; crown at v = 0.25).
     The boot top is where the section crosses z = 0, solved per column for
     the superellipse. Black above, reddish anti-fouling below. */
  var _tex = null;
  function hullTex(THREE) {
    if (_tex) return _tex;
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(6411), i, x, wl, ya, yb, s;
    g.fillStyle = "#4a2a24"; g.fillRect(0, 0, W, H);                 /* anti-fouling */
    for (i = 0; i < 1100; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 5 + R1() * 22, 2 + R1() * 4);
    }
    for (i = 0; i < W; i++) {
      x = XS + (i + 0.5) / W * (XB - XS);
      var q = sec(x);
      if (-q.zc >= q.h) continue;                                    /* all under water */
      s = Math.pow(Math.min(1, Math.max(0, -q.zc / q.h)), 1 / SQ);
      wl = (q.zc >= 0) ? 0.25 : Math.asin(s) / (PI * 2);
      if (q.zc > 0) wl = -Math.asin(Math.min(1, Math.pow(q.zc / q.h, 1 / SQ))) / (PI * 2);
      ya = (0.5 + wl) * H; yb = (1 - wl) * H;                        /* above water */
      g.fillStyle = "#1f2327"; g.fillRect(i, ya, 1, yb - ya);
      g.fillStyle = "rgba(10,11,13,0.8)";                             /* boot top */
      g.fillRect(i, yb, 1, 5); g.fillRect(i, ya - 5, 1, 5);
    }
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;              /* frame seams */
    for (i = 0; i < W; i += 29) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
    for (i = 0; i < 90; i++) {                                         /* rust streaks, as photographed */
      g.fillStyle = "rgba(110,62,36," + (0.05 + R1() * 0.08).toFixed(3) + ")";
      g.fillRect(30 + R1() * 450, R1() < 0.5 ? 0.16 * H : 0.84 * H, 1.5, 6 + R1() * 16);
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

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      deck:  std(0x25282b, 0.95, 0.04),     /* casing paint, matt black-grey */
      sail:  std(0x2a2f33, 0.88, 0.06),     /* fairwater */
      dark:  std(0x121416, 0.80, 0.20),     /* limber holes, hatches, glass */
      metal: std(0x3a4147, 0.55, 0.50),     /* masts, fittings */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      team:  std(team, 0.86, 0.06)
    };
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, x, k, z;

    /* ---- hull, finer sections toward the ends ---- */
    var xs = [], j;
    for (i = 0; i < ST.length - 1; i++) {
      var d = ST[i + 1][0] - ST[i][0], n = Math.max(1, Math.round(d / 2.6));
      for (j = 0; j < n; j++) xs.push(ST[i][0] + d * j / n);
    }
    xs.push(XB);
    var secs = [];
    for (i = 0; i < xs.length; i++) {
      var qa = sec(xs[i]);
      secs.push({ x: xs[i], w: qa.w, h: qa.h, zc: qa.zc, sq: SQ });
    }
    A.add("skin", body(THREE, M, secs, 36), 0, 0, 0);

    /* ---- flat casing the length of the boat ---- */
    function caseW(x) { return Math.max(0.3, Math.min(2.7, tab(x, 1) * 0.72)); }
    var cs = [];
    for (x = -44.0; x <= 45.0; x += 3.0) {
      var ch = 0.30;
      cs.push({ x: x, w: caseW(x), h: ch, zc: ctop(x) - ch, sq: 0.30 });
    }
    cs.push({ x: 45.0, w: 0.15, h: 0.12, zc: ctop(45.0) - 0.12, sq: 0.30 });   /* close the bow end */
    cs.unshift({ x: -44.6, w: 0.10, h: 0.10, zc: ctop(-44.6) - 0.10, sq: 0.30 }); /* and the stern end */
    A.add("deck", body(THREE, M, cs, 16), 0, 0, 0);

    /* ---- limber (free-flood) holes in rows along the casing flank ---- */
    var rows = [[-30.6, -29.2], [-27.0, -25.3], [-23.6, -22.0], [-19.0, -15.7], [-13.6, -12.1],
                [-7.6, -4.2], [-2.5, 0.3], [3.9, 7.5], [8.5, 11.8], [16.6, 18.0], [19.5, 21.4], [27.7, 32.2]];
    for (k = 0; k < rows.length; k++) {
      for (x = rows[k][0]; x <= rows[k][1]; x += 0.70) {
        z = Math.min(0.55, ctop(x) - 0.50);
        for (i = -1; i <= 1; i += 2)
          box(THREE, A, "dark", 0.46, 0.06, 0.13, x, i * (hullY(x, z) - 0.01), z);
      }
    }

    /* ---- casing fittings: hatches, vents, small frame abaft amidships ---- */
    box(THREE, A, "dark", 2.20, 1.00, 0.08, 24.0, 0, ctop(24.0) + 0.04);      /* loading hatch */
    box(THREE, A, "deck", 2.50, 1.30, 0.05, 24.0, 0, ctop(24.0) + 0.02);
    for (k = 0; k < 4; k++) {
      x = [-17.5, -3.5, 33.5, 20.0][k];
      cylZ(THREE, A, "dark", 0.50, 0.50, 0.08, 14, x, 0, ctop(x) + 0.05);     /* round hatches */
    }
    for (k = -1; k <= 1; k += 2) {                                             /* the small open frame, x -11.9..-9.2 */
      strut(THREE, A, "metal", 0.04, [-11.9, k * 0.9, ctop(-11.9)], [-11.9, k * 0.9, ctop(-11.9) + 0.55], 6);
      strut(THREE, A, "metal", 0.04, [-9.2, k * 0.9, ctop(-9.2)], [-9.2, k * 0.9, ctop(-9.2) + 0.55], 6);
      strut(THREE, A, "metal", 0.04, [-11.9, k * 0.9, ctop(-11.9) + 0.55], [-9.2, k * 0.9, ctop(-9.2) + 0.55], 6);
    }
    for (k = 0; k < 4; k++) {                                                  /* mooring bollards */
      x = [40.0, 37.5, -33.0, -35.5][k];
      for (i = -1; i <= 1; i += 2) box(THREE, A, "metal", 0.45, 0.20, 0.20, x, i * Math.min(1.6, caseW(x) - 0.4), ctop(x) + 0.06);
    }

    /* ---- the tall fitting on the upper bow, as the drawing shows it ---- */
    /* unidentified: the elevation draws a low raked-top housing here (about 2 m);
       not named in any caption, drawn at that size and no taller */
    A.add("sail", new THREE.CylinderGeometry(0.40, 0.62, 1.9, 12), 41.9, 0, ctop(41.9) + 0.9, PI / 2, 0, 0);

    /* ---- bow plane housings, retracted, light flat lenses on the upper bow ---- */
    for (k = -1; k <= 1; k += 2) {
      var bz = 0.7, by = hullY(42.6, bz);
      A.add("sail", new THREE.SphereGeometry(1.0, 10, 6), 42.6, k * (by - 0.02), bz, 0, 0, 0, [2.0, 0.15, 0.35]);
    }

    /* ---- fairwater: streamlined, upright rounded nose, raked after edge ---- */
    var rings = [], hz = [0.2, 1.2, 2.2, 3.4, 4.6, 5.6, 6.1, 6.3];
    for (i = 0; i < hz.length; i++) {
      var z0 = hz[i], x0 = -1.0 + (z0 - 1.7) * 0.91, x1 = 14.0, hw = 1.75;
      if (z0 > 5.9) { x1 = z0 > 6.2 ? 13.2 : 13.8; hw = z0 > 6.2 ? 1.55 : 1.68; x0 += 0.0; }
      rings.push({ z: z0, pts: rrect(x0, x1, hw, 1.40, 32) });
    }
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    /* bridge screen: the low step at the top aft, with an open cockpit */
    box(THREE, A, "sail", 3.30, 2.30, 0.55, 4.90, 0, 6.55);
    box(THREE, A, "dark", 2.40, 1.60, 0.06, 5.10, 0, 6.85);
    /* limber slots and small windows on the fairwater flank, as drawn */
    for (i = -1; i <= 1; i += 2) {
      for (k = 0; k < 3; k++) box(THREE, A, "dark", 0.14, 0.05, 0.62, 5.7 + k * 0.35, i * 1.60, 5.0);
      for (k = 0; k < 2; k++) box(THREE, A, "dark", 0.50, 0.05, 0.50, 11.8 + k * 0.62, i * 1.74, 3.4);
    }

    /* ---- mast cluster, as the elevation draws it ---- */
    var zt = 6.3;
    strut(THREE, A, "metal", 0.10, [2.9, 0, zt - 0.5], [2.9, 0, 11.0], 6);          /* very tall slender mast, after edge */
    var ms = [[6.2, 9.3, 0.04], [7.0, 8.4, 0.07], [8.1, 8.7, 0.08], [10.3, 9.6, 0.04], [10.4, 8.8, 0.05], [11.6, 8.9, 0.05]];
    for (k = 0; k < ms.length; k++) strut(THREE, A, "metal", ms[k][2], [ms[k][0], 0, zt - 0.3], [ms[k][0], 0, ms[k][1]], 6);
    A.add("metal", new THREE.SphereGeometry(0.14, 8, 6), 8.1, 0, 8.7);               /* periscope head */
    box(THREE, A, "dark", 0.22, 0.16, 0.30, 7.0, 0, 8.25);
    cylZ(THREE, A, "metal", 0.30, 0.30, 3.6, 12, 9.4, 0, zt + 1.6);                    /* snorkel head */
    box(THREE, A, "dark", 0.80, 0.55, 0.55, 9.5, 0, zt + 3.7);
    box(THREE, A, "metal", 0.80, 0.55, 0.12, 9.5, 0, zt + 3.55);

    /* ---- stern: tail cone, small planes and rudder, three shafts and screws ---- */
    /* cruciform tail: horizontal planes at the tail's mid-height, one upright
       fin pair (upper and lower rudder) in the centreline; shapes are general */
    var sp = [[-42.0, 0.0], [-44.0, 3.0], [-44.8, 3.0], [-44.8, -3.0], [-44.0, -3.0]];
    var spg = ext(THREE, sp, 0.14); spg.translate(0, 0, -1.27);
    A.add("sail", spg, 0, 0, 0);
    var rp = [[-42.3, -1.2], [-43.6, -3.9], [-44.8, -3.9], [-44.8, 0.7], [-44.2, 0.7]];
    A.add("sail", ext(THREE, rp, 0.24, true), 0, 0.12, 0);

    var bl = [[-0.08, 0.20], [-0.27, 0.45], [-0.32, 0.75], [-0.18, 0.95], [0.10, 0.96], [0.27, 0.75], [0.24, 0.45], [0.08, 0.20]];
    var props = [[-38.6, 2.75, -3.0], [-38.6, -2.75, -3.0], [-45.15, 0, -1.4]];
    for (k = 0; k < props.length; k++) {
      var px = props[k][0], py = props[k][1], pz = props[k][2];
      if (k < 2) {                        /* long fairing from the flank to the screw */
        var fa = [-29.0, Math.sign(py) * (hullY(-29.0, pz) - 0.25), pz], fb = [px + 0.6, py, pz];
        var fd = new THREE.Vector3(fb[0] - fa[0], fb[1] - fa[1], 0), fl = fd.length(), fq = new THREE.Quaternion();
        fq.setFromUnitVectors(new THREE.Vector3(0, 1, 0), fd.clone().normalize());
        A.addQ("metal", new THREE.CylinderGeometry(0.12, 0.40, fl, 12), (fa[0] + fb[0]) / 2, (fa[1] + fb[1]) / 2, pz, fq);
      }
      cylX(THREE, A, "metal", 0.13, 0.13, 1.2, 10, px + 0.5, py, pz);
      cylX(THREE, A, "screw", 0.26, 0.20, 0.60, 12, px + 0.1, py, pz);
      A.add("screw", new THREE.SphereGeometry(0.20, 10, 6), px - 0.28, py, pz);
      for (i = 0; i < 4; i++) {
        var gb = ext(THREE, bl, 0.035);
        gb.translate(0, 0, -0.0175);
        A.add("screw", gb, px, py, pz, i * PI / 2 + 0.4, 0.0, 0.0);
      }
    }

    /* ---- modest team strips: two flat panels on the casing, 2 cm up ---- */
    box(THREE, A, "team", 3.00, 0.90, 0.04, 29.0, 0, ctop(29.0) + 0.32);
    box(THREE, A, "team", 3.00, 0.90, 0.04, -20.0, 0, ctop(-20.0) + 0.32);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length of 91.3 m: render3d scales a submarine by it. */
UNIT_MODELS["pact_e60_sub"] = {
  len: 91.3,
  build: function (THREE, M, C) { return HeroFoxtrot641.build(THREE, M, C); }
};
