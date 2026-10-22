/* ============ us_los_angeles_ssn.js -- HERO model: Los Angeles class SSN, Flight II (nato_e80_sub) ============
   USS Los Angeles (SSN-688) class as the row draws her in the 1980s: the row's weapons carry
   tlam_n_vls, so this is the VERTICAL-LAUNCH boat, the Flight II of SSN-719 Providence (1985)
   to SSN-750 Newport News: twelve vertical Tomahawk tubes in the bow and the diving planes
   still on the sail. NOT the 688I of SSN-751 (1988), which moved the planes to the bow; the
   row's description names the 688I only as what came after, and sub_specs.js gives her
   planes:"sail".

   References (Wikimedia Commons, fetched small into scratchpad/q_la688_ref/dl):
     - "SSN719.svg" (Mike1979, colour starboard elevation of USS Providence SSN-719): THE source
       for every station. 1917 px = 110.3 m (17.38 px/m); its midbody is 176 px = 10.13 m deep,
       which is the published 10.06 m beam, so the drawing is to scale both ways. Gives the hull
       radius table below, the sail (LE 29.92 m and TE 37.97 m abaft the bow, 5.18 m over the
       crown, rounded upper after corner), the sail plane section on the sail 2.9 m over the
       crown, the five masts with their heights, the tall flat-topped upper rudder (6.8 m over
       the axis) and the shorter lower one (5.6 m under it), the stern-plane root fairing, the
       screw (about 5.2 m) and hub, the sonar dome joint 7.5 m abaft the bow, the post on the
       fore casing and the tile grid.
     - "Los Angeles class submarine 3D drawing.svg" (elevation and PLAN with a 20 m scale bar,
       16.7 px/m): the plan forms. Its section is 5 per cent fatter than SSN719 (10.5 m), so its
       transverse figures are taken at 0.955. Gives the sail's lens plan (round nose, fine
       tail), the sail planes (root chord 3.8 m, tip 1.5 m, straight trailing edge, 9.5 m span),
       the stern planes (straight trailing edge, swept leading edge with a strongly swept root
       fillet, 11.7 m span), the TWELVE VLS HATCHES in the 2-4-4-2 pattern (item 2: inner rows
       of four at +-0.86 m, outer rows of two at +-1.98 m, 8.1-11.2 m abaft the bow), the
       towed-array fairing down the starboard shoulder (18.7-94.3 m), the three trunk hatches
       on the centreline (25.6, 44.7, 64.8 m), the cleats and the forward deck fittings.
     - Photographs: "USS Providence SSN-719.jpg" (1985 sea trials, bow-on at speed: sail planes,
       narrow sail); "SH-3H Sea King ... over a Los Angeles-class submarine, circa 1985" (sail
       from the side, a raised periscope in a black-and-white blotch pattern); "US Navy
       110826-N-OV358-098 ... USS Providence (SSN 719) away from the piers" (bow-on: bluff dome,
       sail 1.6 m wide against 9.5 m of planes); "USS Providence (SSN 719) transits Puget Sound
       (51524466279)" (stern quarter, low freeboard); "USS Newport News (SSN-750).jpg" (SSN-750
       bow quarter alongside: TILE GRID on the hull, smooth un-tiled sonar dome, draft marks);
       "USS Newport News SSN-750 Oct04 aft.jpg" (stern-on: thick flat-topped upper rudder with
       the light on top, the sail planes, the starboard fairing ridge, two raised periscopes in
       blotch camouflage); "US Navy 090204-N-8467N-001 USS Pittsburgh (SSN 720)" (SSN-720 bow
       quarter); "USS Greeneville (SSN 772) - dry dock Pearl Harbor (1)" (hull form out of the
       water, dome joint, red anti-fouling up to about the axis).

   Recognition list (what must read at game zoom, and the reference it rests on):
     1. Albacore teardrop: bluff ellipsoidal bow, full 10.06 m section from 17 to 73 m abaft
        the bow, then one long fine run to a slim tail cone (SSN719 stations).
     2. Tall narrow faired sail set well forward, its centre 31 per cent of the length abaft
        the bow; lens plan, rounded after top corner (SSN719 elevation, 3D-drawing plan,
        bow-on photographs).
     3. Diving planes on the sail, 9.5 m span, straight trailing edges (3D-drawing plan,
        SSN719, the 1985 and 2004 photographs).
     4. The masts: five, from aft the radar mast with its box head, the snorkel induction mast,
        the two periscopes in black spots on a pale tube, the attack periscope's housing (SSN719;
        blotches in the c1985 and SSN-750 photographs).
     5. Twelve VLS hatches in the 2-4-4-2 pattern just abaft the dome joint (3D-drawing plan,
        item 2; dots in the Greeneville drydock photograph).
     6. Cruciform stern with the TALLER, flat-topped upper rudder and its light, shorter lower
        rudder, stern planes with swept root fillets (SSN719, 3D-drawing plan, SSN-750 aft).
     7. Single seven-bladed skewed screw on a bronze hub (SSN719 draws a scimitar screw; the
        seven blades are the class's published figure -- the photographs show it shrouded).
     8. Anechoic tile grid over a matte black hull with a smooth sonar dome forward of a joint
        line (SSN719 tile grid, SSN-750 photograph).
     9. Towed-array fairing as a ridge down the starboard shoulder (3D-drawing plan, SSN-750 aft).
    10. Centreline trunk hatches and cleats on the crown, the post on the fore casing (plans).

   Dimensions: 110.3 m overall (SSN719 extent; sub_specs.js), beam 10.06 m, draught 9.4 m to
   the foot of the lower rudder -- which puts the axis 3.70 m under the water line and the
   crown 1.33 m over it, the surfaced trim of the photographs. Sail 8.05 m chord at the
   casing (sub_specs sailLen 8.1), 5.18 m over the crown (sub_specs sailH 5.4).
   Not confirmed and so not drawn: hull numbers, names, flags (none, per the house rule); the
   stern-plane end plates some later boats carry; the bridge windscreen (not rigged in any
   photograph); the masts' exact identities (drawn as the drawing draws them). The two
   drawings disagree on the rudders (the 3D drawing makes them equal at about 5.8 m); SSN719
   is followed because it is the Flight II drawing and it reproduces the published 9.4 m
   draught. The tile grid rests on SSN719 and on SSN-750 as photographed in the 2000s; no
   reference dates the tiles on the Flight II boats in 1985-88.
   Paint: matte black rubber coat (#2b2e31; no photograph sampled lighter than about 0x30),
   brick-red anti-fouling below the axis line as SSN719 and the Greeneville drydock show it
   (all of it under water at this trim).
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine
   by UNIT_MODELS[key].len, set to the measured X extent. Row is not turret:true, so nothing
   is named "turret". Merged per material: 8 draw calls (the hull's two paints are
   separate materials so each half girth keeps its own canvas). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLosAngeles719 = (function () {
  "use strict";

  var PI = Math.PI;
  var XB = 55.15;                 /* bow tip; the hub cap ends at -55.15 (110.3 m overall) */
  var ZA = -3.70;                 /* hull axis: 9.4 m draught to the lower rudder's foot */
  var RMAX = 5.03;                /* 10.06 m beam */
  var D_TAIL = 106.6;             /* end of the tail cone, abaft the bow */
  var D_JOINT = 7.45;             /* sonar dome joint */
  var Z_CROWN = ZA + RMAX;        /* 1.33 */
  var Z_ST = Z_CROWN + 5.18;      /* sail top */
  var S_LE = 29.92, S_TE = 37.97; /* sail leading and trailing edge, m abaft the bow */
  var Z_PL = Z_CROWN + 2.80;      /* sail-plane chord line */

  function X(d) { return XB - d; }

  /* [m abaft the bow, radius m] read off SSN719 (centre row 298, 17.38 px/m) at 0.9935 */
  var STA = [
    [0.00, 0.00], [0.15, 0.74], [0.40, 1.09], [0.80, 1.49], [1.30, 1.89], [2.00, 2.29],
    [3.00, 2.74], [4.00, 3.14], [5.50, 3.60], [7.00, 3.94], [8.50, 4.23], [10.0, 4.46],
    [12.0, 4.69], [14.0, 4.86], [15.5, 4.96], [17.0, 5.03], [73.0, 5.03], [76.0, 4.98],
    [79.0, 4.92], [82.0, 4.80], [85.0, 4.69], [88.0, 4.52], [91.0, 4.23], [94.0, 3.77],
    [97.0, 3.20], [99.0, 2.80], [101.0, 2.40], [103.0, 1.90], [105.0, 1.40], [106.6, 1.00]
  ];
  /* monotone cubic through the table, so the run aft has no facet ridges */
  var MC = (function () {
    var n = STA.length, xs = [], ys = [], m = [], dl = [], i;
    for (i = 0; i < n; i++) { xs.push(STA[i][0]); ys.push(STA[i][1]); }
    for (i = 0; i < n - 1; i++) dl.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
    m.push(dl[0]);
    for (i = 1; i < n - 1; i++) m.push(dl[i - 1] * dl[i] <= 0 ? 0 : (dl[i - 1] + dl[i]) / 2);
    m.push(dl[n - 2]);
    for (i = 0; i < n - 1; i++) {
      if (dl[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
      var a = m[i] / dl[i], b = m[i + 1] / dl[i], s = a * a + b * b;
      if (s > 9) { var t = 3 / Math.sqrt(s); m[i] = t * a * dl[i]; m[i + 1] = t * b * dl[i]; }
    }
    return { xs: xs, ys: ys, m: m };
  })();
  function hullR(d) {
    var xs = MC.xs, ys = MC.ys, m = MC.m, n = xs.length, i;
    if (d <= 0) return 0;
    if (d >= xs[n - 1]) return ys[n - 1];
    for (i = 0; i < n - 1; i++) if (d <= xs[i + 1]) break;
    var h = xs[i + 1] - xs[i], t = (d - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] +
           (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  }
  function crownZ(d) { return ZA + hullR(d); }
  /* outward surface normal of the hull at (d, y) on the upper side */
  function hullN(d, y) {
    var r = hullR(d), sl = (hullR(d + 0.2) - hullR(d - 0.2)) / 0.4;
    var c = Math.sqrt(Math.max(0, r * r - y * y)) / r;
    var nx = sl, ny = y / r, nz = c, l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    return [nx / l, ny / l, nz / l];
  }
  function surfZ(d, y) { var r = hullR(d); return ZA + Math.sqrt(Math.max(0.0001, r * r - y * y)); }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ================================================================ textures */
  var _tex = {};
  /* Hull skin, one canvas per half girth (upper: black rubber; lower: anti-fouling), so each
     half is its own material and the merged mesh keeps one colour per draw call. u runs stern
     (0) to bow (1) over the 106.6 m of hull; v runs across the half girth, 0 and 1 at the axis
     line and 0.5 at the crown (upper) or keel (lower). Canvas row = (1 - v) * H (flipY). */
  function hullTex(THREE, lower) {
    var key = lower ? "lo" : "up";
    if (_tex[key]) return _tex[key];
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(lower ? 41177 : 68871), i, j;
    function colOf(d) { return (1 - d / D_TAIL) * W; }
    function rowOf(v) { return (1 - v) * H; }
    var cj = colOf(D_JOINT);
    /* black rubber coat above the axis line, brick-red anti-fouling below it (SSN719, the
       Greeneville drydock photograph) */
    g.fillStyle = lower ? "#5f281b" : "#2b2e31"; g.fillRect(0, 0, W, H);
    /* tonal patchwork: replacement tiles never match their neighbours */
    for (i = 0; i < 260; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * cj, R1() * H, 17.3 * (1 + ((R1() * 4) | 0)), 9.7 * (1 + ((R1() * 3) | 0)));
    }
    /* the tile grid: 0.9 m along by 0.6 m round, laid in staggered strakes */
    var tw = 17.3, th = 9.7;
    g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1;
    for (j = 0; j * th < H; j++) {
      g.beginPath(); g.moveTo(0, j * th + 0.5); g.lineTo(cj, j * th + 0.5); g.stroke();
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = off; i < cj; i += tw) {
        g.beginPath(); g.moveTo(i + 0.5, j * th); g.lineTo(i + 0.5, j * th + th); g.stroke();
      }
    }
    /* the sonar dome: smooth and un-tiled, dark all round (SSN719); joint line at 7.45 m */
    g.fillStyle = "#27292c"; g.fillRect(cj, 0, W - cj, H);
    g.fillStyle = "rgba(0,0,0,0.75)"; g.fillRect(cj - 2, 0, 3, H);
    g.fillStyle = "rgba(160,166,170,0.20)"; g.fillRect(cj - 4, 0, 1, H);
    if (lower) {
      /* limber holes along the bilges fore and aft (SSN719), under water at this trim */
      var holes = function (d0, d1, v) {
        var c0 = colOf(d1), c1 = colOf(d0), x;
        g.fillStyle = "rgba(0,0,0,0.8)";
        for (x = c0; x < c1; x += 9) g.fillRect(x, rowOf(v), 6, 2);
      };
      holes(1.5, 6.5, 0.36); holes(1.5, 6.5, 0.64); holes(93, 100, 0.36); holes(93, 100, 0.64);
    } else {
      /* draft marks just under the water line, the one white on the hull (SSN-750 photograph) */
      g.fillStyle = "rgba(214,218,220,0.75)"; g.font = "bold 6px sans-serif";
      var marks = ["28", "7", "6", "5", "4"];
      for (i = 0; i < marks.length; i++) {
        g.fillText(marks[i], colOf(8.4), rowOf(0.34 - i * 0.03));
        g.fillText(marks[i], colOf(8.4), rowOf(0.66 + i * 0.03) + 5);
        g.fillText(marks[i], colOf(97.2), rowOf(0.25 - i * 0.03));
        g.fillText(marks[i], colOf(97.2), rowOf(0.75 + i * 0.03) + 5);
      }
    }
    /* wash staining heavier aft, as every photograph of a boat alongside shows */
    var gr = g.createLinearGradient(0, 0, W, 0);
    gr.addColorStop(0, "rgba(10,11,12,0.28)"); gr.addColorStop(1, "rgba(10,11,12,0.0)");
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    _tex[key] = t;
    return t;
  }
  /* seamless 1.2 m patch of 0.6 m tiles for the parts whose UVs are in metres:
     sail, rudders, planes, fairings */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d"), R1 = rng(7193), i, j;
    g.fillStyle = "#2a2d30"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 2; j++) for (i = 0; i < 2; i++) {
      g.fillStyle = "rgba(255,255,255," + (0.012 + R1() * 0.03).toFixed(3) + ")";
      g.fillRect(i * 64 + 2, j * 64 + 2, 60, 60);
    }
    for (i = 0; i < 700; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.06)";
      g.fillRect(R1() * S, R1() * S, 2, 2);
    }
    g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 2;
    for (i = 0; i <= S; i += 64) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, S); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(S, i); g.stroke();
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1 / 1.2, 1 / 1.2);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    _tex.tile = t;
    return t;
  }
  /* the blotches the raised periscopes wear: black spots on a pale tube (c1985 and SSN-750
     photographs) */
  function camoTex(THREE) {
    if (_tex.camo) return _tex.camo;
    var W = 64, H = 128, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(3301), i;
    g.fillStyle = "#b9bdbf"; g.fillRect(0, 0, W, H);
    g.fillStyle = "#1c1e20";
    for (i = 0; i < 30; i++) {
      var x = R1() * W, y = R1() * H, rx = 3 + R1() * 4.5, ry = 4 + R1() * 6;
      g.beginPath(); g.ellipse(x, y, rx, ry, R1() * PI, 0, PI * 2); g.fill();
      g.beginPath(); g.ellipse(x + W, y, rx, ry, 0, 0, PI * 2); g.fill();
      g.beginPath(); g.ellipse(x - W, y, rx, ry, 0, 0, PI * 2); g.fill();
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    _tex.camo = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, false), roughness: 0.88, metalness: 0.05 }),
      afl:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, true), roughness: 0.90, metalness: 0.04 }),
      tile:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.88, metalness: 0.05 }),
      dark:  std(0x0e1113, 0.80, 0.20),     /* hatch covers, openings, the bridge well */
      metal: std(0x3a4147, 0.55, 0.50),     /* mast tubes and housings */
      camo:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: camoTex(THREE), roughness: 0.6, metalness: 0.3 }),
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function push(mat, geo) {
      if (geo.index) geo = geo.toNonIndexed();
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        push(mat, geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
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

  /* indexed geometry from arrays, turned outward by its signed volume about its own centre */
  function mkGeo(THREE, pos, uv, idx) {
    var i, cx = 0, cy = 0, cz = 0, n = pos.length / 3, vol = 0;
    for (i = 0; i < n; i++) { cx += pos[i * 3]; cy += pos[i * 3 + 1]; cz += pos[i * 3 + 2]; }
    cx /= n; cy /= n; cz /= n;
    for (i = 0; i < idx.length; i += 3) {
      var a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
      var ax = pos[a] - cx, ay = pos[a + 1] - cy, az = pos[a + 2] - cz;
      var bx = pos[b] - cx, by = pos[b + 1] - cy, bz = pos[b + 2] - cz;
      var qx = pos[c] - cx, qy = pos[c + 1] - cy, qz = pos[c + 2] - cz;
      vol += ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx);
    }
    if (vol < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* the same outward test for a non-indexed geometry (an extrusion): swap two corners of
     every triangle when the signed volume about the centre comes out negative */
  function fixOut(g) {
    var P = g.attributes.position.array, n = P.length / 3, i, k, cx = 0, cy = 0, cz = 0, vol = 0;
    for (i = 0; i < n; i++) { cx += P[i * 3]; cy += P[i * 3 + 1]; cz += P[i * 3 + 2]; }
    cx /= n; cy /= n; cz /= n;
    for (i = 0; i < n; i += 3) {
      var ax = P[i * 3] - cx, ay = P[i * 3 + 1] - cy, az = P[i * 3 + 2] - cz;
      var bx = P[i * 3 + 3] - cx, by = P[i * 3 + 4] - cy, bz = P[i * 3 + 5] - cz;
      var qx = P[i * 3 + 6] - cx, qy = P[i * 3 + 7] - cy, qz = P[i * 3 + 8] - cz;
      vol += ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx);
    }
    if (vol < 0) {
      var names = ["position", "normal", "uv"], a, it, t;
      for (k = 0; k < names.length; k++) {
        a = g.attributes[names[k]]; if (!a) continue;
        it = a.itemSize;
        for (i = 0; i < a.count; i += 3) for (var c = 0; c < it; c++) {
          t = a.array[(i + 1) * it + c]; a.array[(i + 1) * it + c] = a.array[(i + 2) * it + c]; a.array[(i + 2) * it + c] = t;
        }
      }
    }
    g.computeVertexNormals();
    return g;
  }

  /* body of revolution about an x-parallel axis; secs [{x, r, zc}] in increasing x.
     uvMode "hull": u over the hull length, v round the girth (0.25 = crown); "m": metres. */
  function revolve(THREE, secs, segs, uvMode, uv0, uv1, j0, j1) {
    var pos = [], uv = [], idx = [], i, j, n = secs.length;
    if (j0 === undefined) { j0 = 0; j1 = segs; }
    var nj = j1 - j0, ring = nj + 1;
    for (i = 0; i < n; i++) {
      var s = secs[i];
      for (j = j0; j <= j1; j++) {
        var t = j / segs * PI * 2;
        pos.push(s.x, s.r * Math.cos(t), s.zc + s.r * Math.sin(t));
        if (uvMode === "hull") uv.push((s.x - uv0) / (uv1 - uv0), (j - j0) / nj);
        else uv.push(s.x, j / segs * PI * 2 * Math.max(0.3, s.r));
      }
    }
    for (i = 0; i < n - 1; i++) for (j = 0; j < nj; j++) {
      var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    /* revolve is open at its ends, so its own winding (outward by construction) is kept */
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* symmetric NACA 00xx section, full thickness 1: [chord fraction, half thickness] */
  var AF = (function () {
    var u = [0, 0.015, 0.05, 0.11, 0.2, 0.32, 0.46, 0.62, 0.78, 0.9, 1.0], out = [], i;
    for (i = 0; i < u.length; i++) {
      var x = u[i];
      out.push([x, 5 * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1036 * x * x * x * x)]);
    }
    var loop = [];
    for (i = 0; i < out.length; i++) loop.push([out[i][0], out[i][1]]);
    for (i = out.length - 2; i >= 1; i--) loop.push([out[i][0], -out[i][1]]);
    return loop;
  })();
  /* a closed foil through span stations [{s, le, te, t}] (le/te as model x);
     map(x, s, h) -> [X, Y, Z] places it. Both span ends are capped. */
  function foil(THREE, st, map) {
    var pos = [], uv = [], idx = [], i, k, n = AF.length;
    for (i = 0; i < st.length; i++) {
      for (k = 0; k < n; k++) {
        var x = st[i].le + (st[i].te - st[i].le) * AF[k][0], h = AF[k][1] * st[i].t;
        var p = map(x, st[i].s, h);
        pos.push(p[0], p[1], p[2]); uv.push(x, st[i].s + h);
      }
    }
    for (i = 0; i < st.length - 1; i++) for (k = 0; k < n; k++) {
      var a = i * n + k, b = i * n + (k + 1) % n, c = a + n, d = b + n;
      idx.push(a, b, c, b, d, c);
    }
    /* caps: fans about the mid-chord, consistent with the side winding */
    function cap(si, flip) {
      var base = pos.length / 3, s = st[si], mc = map((s.le + s.te) / 2, s.s, 0);
      pos.push(mc[0], mc[1], mc[2]); uv.push((s.le + s.te) / 2, s.s);
      for (k = 0; k < n; k++) {
        var x = s.le + (s.te - s.le) * AF[k][0], h = AF[k][1] * s.t, p = map(x, s.s, h);
        pos.push(p[0], p[1], p[2]); uv.push(x, s.s + h);
      }
      for (k = 0; k < n; k++) {
        var m1 = base + 1 + k, m2 = base + 1 + (k + 1) % n;
        if (flip) idx.push(base, m1, m2); else idx.push(base, m2, m1);
      }
    }
    cap(0, false); cap(st.length - 1, true);
    return mkGeo(THREE, pos, uv, idx);
  }

  /* stacked horizontal outlines -> closed shell (top capped); uv in metres */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      var run = 0, pv = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - pv[0]) * (p[0] - pv[0]) + (p[1] - pv[1]) * (p[1] - pv[1])); pv = p;
        pos.push(p[0], p[1], rings[i].z); uv.push(run, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) for (j = 0; j < N; j++) {
      var q = i * ring + j;
      idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
    }
    var base = pos.length / 3, cx = 0, cy = 0, top = rings[L - 1], k;
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    cx /= N; cy /= N;
    pos.push(cx, cy, top.z); uv.push(cx, cy);
    for (k = 0; k < N; k++) { pos.push(top.pts[k][0], top.pts[k][1], top.z); uv.push(top.pts[k][0], top.pts[k][1]); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + (k + 1) % N);
    return mkGeo(THREE, pos, uv, idx);
  }

  function cylZ(THREE, A, mat, r1, r2, h, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, h, seg), x, y, z, PI / 2, 0, 0);
  }
  function box(THREE, A, mat, sx, sy, sz, x, y, z) {
    A.add(mat, new THREE.BoxGeometry(sx, sy, sz), x, y, z);
  }
  /* a fitting laid on the hull at (d, y): local +Y of the geometry along the surface normal */
  function onHull(THREE, A, mat, geo, d, y, lift) {
    var n = hullN(d, y), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(n[0], n[1], n[2]));
    var z = surfZ(d, y);
    A.addQ(mat, geo, X(d) + n[0] * lift, y + n[1] * lift, z + n[2] * lift, q);
  }

  /* ---- sail plan: round nose, widest a quarter back, fine tail (3D-drawing plan) ---- */
  function sailRing(le, te, hw, N) {
    var pts = [], c = te - le, k, u, xs = [];
    for (k = 0; k <= N / 2; k++) { u = k / (N / 2); xs.push(0.5 - 0.5 * Math.cos(u * PI)); }
    function half(u) {
      if (u < 0.25) { var v = (0.25 - u) / 0.25; return hw * Math.sqrt(Math.max(0, 1 - v * v)); }
      return hw * (1 - 0.93 * Math.pow((u - 0.25) / 0.75, 1.15));
    }
    /* counter-clockwise from above: nose (u=0, +x) along port to the tail, back along starboard */
    for (k = 0; k < xs.length; k++) pts.push([X(le) - xs[k] * c, half(xs[k])]);
    for (k = xs.length - 2; k >= 1; k--) pts.push([X(le) - xs[k] * c, -half(xs[k])]);
    return pts;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, d, x, y;

    /* ---------------- hull: stations dense at the bow and in the run aft ---------------- */
    var ds = [0, 0.04, 0.12, 0.25, 0.42, 0.65, 0.95, 1.3, 1.75, 2.3, 3.0, 3.8, 4.7, 5.7, 6.8,
              D_JOINT, 8.3, 9.3, 10.4, 11.6, 13.0, 14.5, 16.0, 17.5];
    for (d = 21; d < 72; d += 4) ds.push(d);
    ds.push(73, 75.5, 78, 80.5, 83, 85.5, 88, 90.3, 92.5, 94.6, 96.6, 98.5, 100.3, 102, 103.6, 105.2, D_TAIL);
    var secs = [];
    for (i = ds.length - 1; i >= 0; i--) secs.push({ x: X(ds[i]), r: Math.max(0.0005, hullR(ds[i])), zc: ZA });
    A.add("hull", revolve(THREE, secs, 48, "hull", X(D_TAIL), X(0), 0, 24), 0, 0, 0);
    A.add("afl", revolve(THREE, secs, 48, "hull", X(D_TAIL), X(0), 24, 48), 0, 0, 0);
    /* the tail end disc behind the hub */
    A.add("dark", new THREE.CircleGeometry(1.0, 20), X(D_TAIL) + 0.01, 0, ZA, 0, -PI / 2, 0);

    /* ---------------- screw hub (bronze): shaft boss, hub, cap ---------------- */
    var hub = [[106.55, 1.0], [107.0, 0.80], [107.6, 0.63], [108.0, 0.60], [109.0, 0.58],
               [109.6, 0.46], [110.0, 0.26], [110.3, 0.02]], hs = [];
    for (i = hub.length - 1; i >= 0; i--) hs.push({ x: X(hub[i][0]), r: hub[i][1], zc: ZA });
    A.add("screw", revolve(THREE, hs, 20, "m"), 0, 0, 0);
    /* seven skewed scimitar blades, 2.6 m tip radius, on the hub 108.3 m abaft the bow */
    var bo = [], nb = 9, t, hc, sk;
    for (k = 0; k <= nb; k++) {
      t = k / nb; hc = (0.26 + 0.30 * Math.sin(PI * Math.min(1, t * 1.1))) * Math.sqrt(Math.max(0, 1 - Math.pow(t, 3)));
      sk = -1.15 * t * t + 0.18 * t;
      bo.push([sk + hc, 0.50 + 2.10 * t]);
    }
    for (k = nb - 1; k >= 0; k--) {
      t = k / nb; hc = (0.26 + 0.30 * Math.sin(PI * Math.min(1, t * 1.1))) * Math.sqrt(Math.max(0, 1 - Math.pow(t, 3)));
      sk = -1.15 * t * t + 0.18 * t;
      bo.push([sk - hc, 0.50 + 2.10 * t]);
    }
    var perm = new THREE.Matrix4().set(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1);
    for (i = 0; i < 7; i++) {
      var sh = new THREE.Shape();
      sh.moveTo(bo[0][0], bo[0][1]);
      for (k = 1; k < bo.length; k++) sh.lineTo(bo[k][0], bo[k][1]);
      sh.closePath();
      var bg = new THREE.ExtrudeGeometry(sh, { depth: 0.09, bevelEnabled: false });
      bg.translate(0, 0, -0.045);
      bg.applyMatrix4(perm);                /* chord -> y, radius -> z, thickness -> x */
      bg.rotateZ(0.62);                     /* pitch */
      bg.rotateX(i * 2 * PI / 7 + 0.2);
      fixOut(bg);
      A.add("screw", bg, X(108.3), 0, ZA);
    }

    /* ---------------- sail ---------------- */
    var lv = [0.80, 1.4, 2.2, 3.0, 3.8, 4.6, 5.2, 5.65, 5.95, 6.17, 6.33, 6.43, 6.49, Z_ST];
    var rings = [];
    for (i = 0; i < lv.length; i++) {
      var z = lv[i], f = Math.max(0, Math.min(1, (z - Z_CROWN) / (Z_ST - Z_CROWN)));
      var hw = 0.92 - 0.10 * f;
      /* rounded after top corner (radius 1.05 m) and fore top corner (0.3 m), SSN719 */
      var ra = 1.05, rf = 0.30, rt = 0.22, le = S_LE, te = S_TE, e;
      if (z > Z_ST - ra) { e = z - (Z_ST - ra); te -= ra - Math.sqrt(Math.max(0, ra * ra - e * e)); }
      if (z > Z_ST - rf) { e = z - (Z_ST - rf); le += rf - Math.sqrt(Math.max(0, rf * rf - e * e)); }
      if (z > Z_ST - rt) { e = z - (Z_ST - rt); var ins = rt - Math.sqrt(Math.max(0, rt * rt - e * e)); hw -= ins; le += ins * 0.5; te -= ins * 0.5; }
      rings.push({ z: z, pts: sailRing(le, te, Math.max(0.05, hw), 44) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);

    /* sail planes: one foil through the sail, 9.5 m span, straight trailing edge */
    var sp = [], ys = [-4.75, -4.62, -3.6, -2.4, -0.88, 0, 0.88, 2.4, 3.6, 4.62, 4.75];
    for (i = 0; i < ys.length; i++) {
      var a = Math.abs(ys[i]);
      var leD = a <= 0.88 ? 30.50 : 30.50 + (a - 0.88) * 0.60;
      var teD = 34.30 - Math.max(0, a - 0.88) * 0.013;
      var th = 0.50 - Math.max(0, a - 0.88) * 0.072;
      if (a > 4.7) { leD += 0.20; teD -= 0.25; th *= 0.55; }
      sp.push({ s: ys[i], le: X(leD), te: X(teD), t: th });
    }
    A.add("tile", foil(THREE, sp, function (x, s, h) { return [x, s, Z_PL + h]; }), 0, 0, 0);

    /* bridge well at the fore end of the sail top, and the mast openings */
    box(THREE, A, "dark", 1.15, 0.78, 0.05, X(31.05), 0, Z_ST + 0.02);
    for (i = 0; i < 4; i++) {
      d = [32.95, 33.85, 34.70, 35.65][i];
      A.add("dark", new THREE.CircleGeometry(1, 14), X(d), 0, Z_ST + 0.012, 0, 0, 0, [0.48, 0.34, 1]);
    }
    /* ---------------- masts, as SSN719 draws them (heights over the sail top) ---------------- */
    /* 1. radar mast with its box head, 3.0 m */
    cylZ(THREE, A, "metal", 0.30, 0.30, 2.75, 12, X(35.65), 0, Z_ST + 1.0);
    box(THREE, A, "metal", 0.78, 0.46, 0.42, X(35.65), 0, Z_ST + 2.66);
    box(THREE, A, "dark", 0.80, 0.48, 0.10, X(35.65), 0, Z_ST + 2.80);
    /* 2. snorkel induction mast: housing stub, tube, dark head, 4.5 m */
    box(THREE, A, "metal", 0.62, 0.56, 1.30, X(34.70), 0, Z_ST + 0.55);
    cylZ(THREE, A, "metal", 0.16, 0.16, 2.70, 10, X(34.70), 0, Z_ST + 2.50);
    cylZ(THREE, A, "dark", 0.30, 0.28, 0.85, 12, X(34.70), 0, Z_ST + 4.08);
    /* 3. the tall periscope: 0.65 m barrel, blotched upper part, tapering head to 6.76 m */
    cylZ(THREE, A, "metal", 0.33, 0.33, 2.30, 14, X(33.85), 0, Z_ST + 0.85);
    cylZ(THREE, A, "camo", 0.33, 0.33, 2.50, 14, X(33.85), 0, Z_ST + 3.25);
    cylZ(THREE, A, "camo", 0.13, 0.21, 2.26, 10, X(33.85), 0, Z_ST + 5.63);
    A.add("dark", new THREE.SphereGeometry(0.13, 8, 6), X(33.85), 0, Z_ST + 6.76);
    /* 4. the attack periscope: its 2.2 m housing and the thin blotched tube to 5.8 m */
    box(THREE, A, "metal", 0.66, 0.56, 2.30, X(32.95), 0, Z_ST + 1.0);
    cylZ(THREE, A, "camo", 0.17, 0.17, 3.60, 10, X(32.95), 0, Z_ST + 4.0);
    cylZ(THREE, A, "dark", 0.19, 0.19, 0.22, 10, X(32.95), 0, Z_ST + 5.80);
    /* 5. the small whip at the fore end of the mast group */
    cylZ(THREE, A, "metal", 0.06, 0.06, 2.3, 6, X(32.6), 0, Z_ST + 1.05);

    /* ---------------- cruciform stern (SSN719 elevation, 3D-drawing plan) ---------------- */
    /* upper rudder: trailing edge vertical at 105.75 m, flat top 6.79 m over the axis */
    var ur = [[0.3, 101.3, 0.62], [2.4, 101.95, 0.58], [4.03, 102.42, 0.52], [5.87, 102.94, 0.44], [6.79, 103.22, 0.40]], us = [];
    for (i = 0; i < ur.length; i++) us.push({ s: ur[i][0], le: X(ur[i][1]), te: X(105.75), t: ur[i][2] });
    A.add("tile", foil(THREE, us, function (x, s, h) { return [x, h, ZA + s]; }), 0, 0, 0);
    /* the stern light on the rudder top (SSN719, SSN-750 aft) */
    cylZ(THREE, A, "dark", 0.24, 0.28, 0.34, 12, X(103.75), 0, ZA + 6.79 + 0.17);
    A.add("metal", new THREE.SphereGeometry(0.17, 10, 6), X(103.75), 0, ZA + 7.08);
    /* lower rudder: shorter, flat foot 5.64 m under the axis */
    var lr = [[-0.3, 101.3, 0.62], [-2.42, 102.01, 0.58], [-4.26, 102.59, 0.50], [-5.64, 102.99, 0.42]], ls = [];
    for (i = 0; i < lr.length; i++) ls.push({ s: lr[i][0], le: X(lr[i][1]), te: X(105.75), t: lr[i][2] });
    A.add("tile", foil(THREE, ls, function (x, s, h) { return [x, h, ZA + s]; }), 0, 0, 0);
    /* stern planes: straight trailing edge, swept leading edge, strongly swept root fillet */
    var pl = [[-5.84, 102.5, 0.30], [-3.08, 101.0, 0.52], [-2.75, 99.4, 0.82], [-1.2, 99.0, 0.90],
              [1.2, 99.0, 0.90], [2.75, 99.4, 0.82], [3.08, 101.0, 0.52], [5.84, 102.5, 0.30]], ps = [];
    for (i = 0; i < pl.length; i++) ps.push({ s: pl[i][0], le: X(pl[i][1]), te: X(105.75), t: pl[i][2] });
    A.add("tile", foil(THREE, ps, function (x, s, h) { return [x, s, ZA + h]; }), 0, 0, 0);

    /* ---------------- towed-array fairing down the starboard shoulder ---------------- */
    var fy = -1.52, fs = [];
    for (d = 94.3; d >= 18.7 - 0.01; d -= (d > 90 || d < 23 ? 0.9 : 6.0)) {
      var tt = Math.min(1, Math.min(94.3 - d, d - 18.7) / 2.2);
      var rr = 0.22 * Math.sqrt(Math.max(0.02, tt * (2 - tt)));
      fs.push({ x: X(d), r: rr, zc: surfZ(d, fy) - 0.06 });
    }
    fs.push({ x: X(18.7), r: 0.03, zc: surfZ(18.7, fy) - 0.06 });
    A.add("tile", revolve(THREE, fs, 10, "m"), 0, fy, 0);

    /* ---------------- VLS: twelve hatches, 2-4-4-2 ---------------- */
    var vls = [];
    for (k = 0; k < 4; k++) { vls.push([8.06 + k * 1.053, 0.86]); vls.push([8.06 + k * 1.053, -0.86]); }
    for (k = 2; k < 4; k++) { vls.push([8.06 + k * 1.053, 1.98]); vls.push([8.06 + k * 1.053, -1.98]); }
    for (i = 0; i < vls.length; i++) {
      var hg = new THREE.CylinderGeometry(0.34, 0.34, 0.07, 8, 1, false, PI / 8);
      onHull(THREE, A, "dark", hg, vls[i][0], vls[i][1], 0.02);
      var rg = new THREE.CylinderGeometry(0.40, 0.40, 0.035, 8, 1, false, PI / 8);
      onHull(THREE, A, "tile", rg, vls[i][0], vls[i][1], 0.0);
    }
    /* ---------------- trunk hatches, cleats, fore-casing fittings ---------------- */
    var hat = [[25.6, 0.72], [44.7, 0.87], [64.8, 0.87]];
    for (i = 0; i < hat.length; i++) {
      onHull(THREE, A, "tile", new THREE.CylinderGeometry(hat[i][1] + 0.10, hat[i][1] + 0.12, 0.10, 20), hat[i][0], 0, 0.02);
      onHull(THREE, A, "dark", new THREE.CylinderGeometry(hat[i][1], hat[i][1], 0.06, 20), hat[i][0], 0, 0.08);
    }
    var cl = [39.2, 41.5, 58.5, 60.7, 80.6, 82.9];
    for (i = 0; i < cl.length; i++) {
      onHull(THREE, A, "dark", new THREE.BoxGeometry(0.48, 0.07, 0.30), cl[i], 0, 0.02);
    }
    /* the paired deck plates abaft the VLS (3D-drawing plan) */
    for (i = -1; i <= 1; i += 2) {
      for (k = 0; k < 2; k++) {
        onHull(THREE, A, "dark", new THREE.BoxGeometry(1.45, 0.05, 0.40), 13.6 + k * 1.6, i * 0.76, 0.0);
      }
    }
    /* the post on the fore casing (SSN719 elevation; standing in the SSN-720 photograph) */
    cylZ(THREE, A, "dark", 0.25, 0.28, 0.62, 12, X(14.7), 0, crownZ(14.7) + 0.24);
    A.add("dark", new THREE.SphereGeometry(0.25, 10, 6, 0, PI * 2, 0, PI / 2), X(14.7), 0, crownZ(14.7) + 0.55, PI / 2, 0, 0);

    /* ---------------- modest team strips on the crown ---------------- */
    onHull(THREE, A, "team", new THREE.BoxGeometry(2.8, 0.06, 0.9), 20.8, 0, 0.035);
    onHull(THREE, A, "team", new THREE.BoxGeometry(2.8, 0.06, 0.9), 71.5, 0, 0.035);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent, 110.3 m: render3d scales a submarine by it. */
UNIT_MODELS["nato_e80_sub"] = {
  len: 110.3,
  build: function (THREE, M, C) { return HeroLosAngeles719.build(THREE, M, C); }
};
