/* ============ ru_kilo.js -- HERO model: Kilo class, Project 877 Paltus / 636 / 636.3 ============
   Soviet / Russian diesel-electric attack submarine, one shaft. Full-quality redo, 2026-10-24.
   Rows (eras.js / rules.js), each drawn as the variant it names:
     pact_e80_sub  "Project 877 Kilo" (service 1982)        -> Project 877, 72.6 m, six-blade screw,
                   Soviet finish: matt black tiles, red-brown anti-fouling under the drawing's boot
                   line 2.47 m below the waterline (the 877 drawing; never seen in surfaced photos).
     pact_e90_sub  "Project 636 Kilo" (1997, an export-era 636) -> Project 636, 73.8 m, seven-blade
                   screw, the 636 mast row, black all over (the 636 drawing).
     pact_e00_sub  "Project 636.3 Varshavyanka" (2014)    -> the 636 hull and fin; outside it is the
                   636 (sub_specs.js; Kalibr leaves from the torpedo tubes, so nothing shows). Paint is
                   the brown-black weathered tile seen on Russian 636.3 boats in photographs.
     sub_p         "Kilo SSK / Project 636 Kilo", present-day -> drawn as the 636.3, as before.
   Each key carries its own true length: render3d scales a submarine by UNIT_MODELS[key].len.

   References (Wikimedia Commons, fetched at width 960 into scratchpad/q_kilo_ref):
     d877  "Kilo class SS.svg"           side elevation of the 877, 72.6 m over 955 px (13.15 px/m).
     d636  "Improved Kilo class SS.svg"  side elevation of the 636, 73.8 m over 953 px (12.91 px/m).
     p_sov "An elevated starboard bow view of a Soviet Kilo class patrol submarine underway" (US Navy,
           1980s; overhead: wide flat casing, the two white escape-hatch rings, fin a third back).
     p_dod "Kilo Submarine DN-SC-96-00528.jpg" (1996, head-on: fin width 2.8 m against the 9.9 m
           beam, nose of the fin round, bridge windows across its front, masts staggered abreast).
     p_kron "Kronstadt Kilo class submarine (Project 877 Paltus)" (surfaced 877: casing ~2-2.5 m out).
     p_877 "DPL proekta 877.jpg" (877 underway, Russian Navy era, four windows forward on the fin).
     p_kra "Krasnodar.jpg", p_nov "Novorossiysk.jpg", "Kilo-Class Russian Submarine MOD 45165129.jpg"
           (636.3: brown-black matt tiles, the 636 mast row, limber slots, forward hatch ring).
     p_alg "Algerian Improved Kilo St Petersburg.JPG" (636 in primer: the limber-slot row and casing).

   Recognition list (where it shows):
     1 short fat teardrop, 9.9 m on 72.6 / 73.8 m, the blunt round bow and long stern cone
       (hull station table TB from d877, column by column) -- the hull loft.
     2 the wide flat casing with a sloping side band, ending in a squared step aft on the 636
       (d636 at 11.7 m from the screw) and fairing away into a small light housing on the 877 (d877).
     3 the fin a third back: 13.9 m long, 4.95 m (877) / 4.8 m (636) over the casing, flat sides,
       round nose, upright fore edge, aft edge raked 0.25 m (d877/d636; p_dod for the round nose).
     4 bridge windows high on the fin, three a side (d877, d636), five round the nose (p_dod).
     5 the mast row from each drawing: 877 -- dome-headed mast, tall periscope with the loop
       aerial, hook-headed mast, the thick snorkel with its head valve, whip mast, two thin masts;
       636 -- the two thick black tubes aft, then dome, hook, snorkel, whip, thin and capped masts.
       Abreast positions on the 877 from p_dod; the 636 masts stand on the centreline.
     6 bow planes housed flat against the forward hull, high, 54-57 m from the screw (d877 panel).
     7 three torpedo-tube shutters a side on the stem (d877 ovals), the bow sonar window outline
       low on the bow (d877 panel line, painted).
     8 the stern as both drawings give it: the deep box rudder under the cone with its hinge line,
       the stern-plane fairing and planes, the grilled intake behind them, ONE screw -- six blades
       on the 877, seven on the 636 (d877, d636, sub_specs.js).
     9 anechoic tiles: a staggered tile grid painted on hull, casing and fin, matt.
    10 the white escape-hatch rings on the casing fore and aft of the fin (p_sov, p_dod, p_mod).
    11 limber slots in a row just under the casing edge (d877 positions; p_alg, p_kra).

   Waterline and the game: surfaced trim, z = 0 is the surfaced waterline, the casing 2.6 m above
   it (p_kron / p_kra give 2.0-2.7 m; the published 6.2 m draught would give 3.3 m -- a
   compromise, flagged). render3d always draws a submarine at y -1.2 under a 0.35 sea (no
   surfaced state), which with the length scaling puts the sea at about z = +2.9 here: in game
   the casing runs awash and the fin and masts stand clear, as at periscope depth.
   Not confirmed, so drawn plainly: an upper rudder (neither drawing shows one above the cone;
   only the lower box rudder and the stern planes are drawn, though sub_specs.js calls the tail
   cruciform); the stern-plane span (side views only: 3.4 m from the axis); the screw diameter
   (2.6 m as drawn); the 636.3's anti-fouling below water (no photograph; black as d636);
   tile size (0.9 x 0.6 m painted, not measured). No hull number, flag, ensign, text or rails.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. The row is not turret:true, so
   nothing here is named "turret". Merged per material (one draw call each). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKilo = (function () {
  "use strict";

  var PI = Math.PI;
  var PXS = 26.45;                 /* px per metre of the 877 elevation at 1920 px */
  var ZC0 = 2.6;                   /* casing line over the waterline at the fin */
  var PXC = 386;                   /* casing line, px, in the 1920 px elevation */
  var NSE = 2.15;                  /* hull section: a superellipse a shade fuller than a circle */
  var BEAM = 4.95;                 /* half of the published 9.9 m */

  /* [metres from the screw, casing line px, keel line px] read off the 877 elevation at 1920 px
     (hull only: fin, masts and rudder skipped). Checked against the 960 px copy: same to 1 px. */
  var TB = [
    [1.2, 527, 543], [2.0, 522, 547], [3.0, 513, 552], [4.0, 506, 557], [6.0, 491, 565],
    [8.0, 468, 573], [10.0, 445, 580], [12.0, 431, 588], [15.0, 417, 599], [18.0, 407, 607],
    [22.0, 397, 618], [26.0, 393, 626], [30.0, 389, 632], [34.0, 386, 637], [38.0, 386, 638],
    [63.0, 388, 638], [66.0, 397, 631], [68.0, 409, 618], [70.0, 430, 596], [71.5, 457, 569],
    [72.3, 480, 540], [72.6, 495, 515]
  ];

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function tabPx(u, k) {
    var i;
    if (u <= TB[0][0]) return TB[0][k];
    for (i = 1; i < TB.length; i++) {
      if (u <= TB[i][0]) {
        var a = TB[i - 1], b = TB[i], t = (u - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return TB[TB.length - 1][k];
  }
  function ctop(u) { return ZC0 - (tabPx(u, 1) - PXC) / PXS; }
  function keel(u) { return ZC0 - (tabPx(u, 2) - PXC) / PXS; }

  /* how far the hull crown sits under the casing line. Mid-body the casing is a 0.3 m deck over
     the crown; it fairs into the bow dome forward. Aft, the 877's casing line runs down into the
     cone (d877), while the 636's casing stops in a 0.85 m step at 11.7 m and the hull aft of it
     runs straight down to the screw (d636), up to 0.9 m under the 877's line. */
  function crownDrop(u, is636) {
    var d = 0.3;
    if (u > 63) d = 0.3 * clamp((70.5 - u) / 7.5, 0, 1);
    if (u < 14) {
      if (is636) d = u >= 11.7 ? 0.3 + 0.6 * clamp((14 - u) / 2.3, 0, 1) : 0.9 * clamp((u - 3.0) / 8.7, 0, 1);
      else d = 0.3 * clamp((u - 8.0) / 6.0, 0, 1);
    }
    return d;
  }
  function sec(u, is636) {
    var top = ctop(u) - crownDrop(u, is636), bot = keel(u), h = (top - bot) / 2;
    return { w: Math.min(BEAM, h * 1.12), h: h, zc: (top + bot) / 2 };
  }
  function spow(c, e) { return (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e); }
  /* half-width of the hull at height z, and the outward normal angle there */
  function hullY(u, z, is636) {
    var q = sec(u, is636), v = Math.abs((z - q.zc) / q.h);
    if (v >= 1) return 0;
    return q.w * Math.pow(1 - Math.pow(v, NSE), 1 / NSE);
  }
  function hullNA(u, z, is636) {
    var q = sec(u, is636), y = Math.max(0.01, hullY(u, z, is636)), dz = z - q.zc;
    var gy = Math.pow(y / q.w, NSE - 1) / q.w, gz = spow(dz / q.h, 1) * Math.pow(Math.abs(dz / q.h), NSE - 2) / q.h;
    return Math.atan2(gz, gy);
  }
  /* the 636 plug: 1.2 m of parallel body between fin and stern (877 metres in) */
  function mapX(u, is636) { return is636 ? u + 1.2 * clamp((u - 20) / 2, 0, 1) : u; }
  function unmapX(a, is636) { return !is636 ? a : (a <= 20 ? a : (a >= 23.2 ? a - 1.2 : (a + 12) / 1.6)); }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function hex(c) { var s = c.toString(16); while (s.length < 6) s = "0" + s; return "#" + s; }


  /* ---------------------------------------------------------------- paint by period
     Sampled off the photographs and taken to 0.7 of their level (the ACES pass lifts mid tones):
     p_kron 877 hull (66,65,69), p_877 fin (52,53,66); 636.3 p_mod (83,69,66), p_kra (82,79,80).
     The 877 drawing's anti-fouling (82,48,29) under the waterline; the 636 drawing black all over. */
  var PAINT = {
    k877:  { hull: 0x2d2e31, below: 0x3a2219, seam: "rgba(0,0,0,0.42)" },
    k636:  { hull: 0x2b2c2f, below: 0x2b2c2f, seam: "rgba(0,0,0,0.42)" },
    k6363: { hull: 0x36312f, below: 0x36312f, seam: "rgba(0,0,0,0.40)" }
  };

  /* hull canvas: u = metres from the screw / length, v = girth from the keel (0) through port
     (0.25), crown (0.5) and starboard (0.75). Tiles 0.9 m long, 40 rows round, staggered. */
  var _tex = {};
  function hullTex(THREE, V) {
    if (_tex[V.id]) return _tex[V.id];
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), P = V.paint;
    var R1 = rng(V.seed), L = V.L, i, r, x, u, q, s0, t0, va, vb;
    g.fillStyle = hex(P.hull); g.fillRect(0, 0, W, H);
    /* anti-fouling under the boot line the 877 drawing paints, flat at 2.47 m under the surfaced
       waterline (d877 y 260 of 326, bow to stern); column by column off the lofted section */
    if (P.below !== P.hull) {
      g.fillStyle = hex(P.below);
      for (i = 0; i < W; i++) {
        u = unmapX((i + 0.5) / W * L, V.is636);
        q = sec(clamp(u, 0.9, 72.5), V.is636);
        s0 = clamp((-2.47 - q.zc) / q.h, -1, 1);
        t0 = Math.asin(spow(s0, NSE / 2));
        va = (t0 + PI / 2) / (2 * PI); vb = (PI - t0 + PI / 2) / (2 * PI);
        g.fillRect(i, 0, 1, va * H); g.fillRect(i, vb * H, 1, H - vb * H);
      }
    }
    /* tiles: a faint tone per tile, then the seams */
    var tl = 0.9 / L * W, rows = 40, rh = H / rows;
    for (r = 0; r < rows; r++) {
      var off = (r & 1) ? tl / 2 : 0;
      for (x = -off; x < W; x += tl) {
        var k = R1();
        g.fillStyle = k < 0.5 ? "rgba(255,255,255," + (k * 0.06).toFixed(3) + ")" : "rgba(0,0,0," + ((k - 0.5) * 0.12).toFixed(3) + ")";
        g.fillRect(x, r * rh, tl, rh);
      }
    }
    g.fillStyle = P.seam;
    for (r = 0; r < rows; r++) {
      g.fillRect(0, r * rh, W, 1);
      for (x = (r & 1) ? tl / 2 : 0; x < W; x += tl) g.fillRect(Math.round(x), r * rh, 1, rh);
    }
    /* the bow sonar window outline: a panel line 2.1 m under the waterline forward of 60.8 m and
       the line closing it aft (d877; the same on d636) */
    g.fillStyle = "rgba(0,0,0,0.55)";
    for (i = 0; i < W; i++) {
      u = unmapX((i + 0.5) / W * L, V.is636);
      if (u < 60.8 || u > 72.4) continue;
      q = sec(u, V.is636);
      s0 = clamp((-2.1 - q.zc) / q.h, -1, 1);
      t0 = Math.asin(spow(s0, NSE / 2));
      va = (t0 + PI / 2) / (2 * PI); vb = (PI - t0 + PI / 2) / (2 * PI);
      g.fillRect(i, va * H - 1, 1, 2); g.fillRect(i, vb * H - 1, 1, 2);
      if (u < 61.0) { g.fillRect(i - 1, 0, 2, va * H); g.fillRect(i - 1, vb * H, 2, H - vb * H); }
    }
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex[V.id] = t;
    return t;
  }
  /* repeat tile for casing and fin: 4 x 4 m, tiles 1.0 x 0.5 m staggered */
  var _tt = {};
  function tileTex(THREE, V) {
    if (_tt[V.id]) return _tt[V.id];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(V.seed + 31), r, x;
    g.fillStyle = hex(V.paint.hull); g.fillRect(0, 0, W, H);
    for (r = 0; r < 8; r++) {
      for (x = (r & 1) ? -32 : 0; x < W; x += 64) {
        var k = R1();
        g.fillStyle = k < 0.5 ? "rgba(255,255,255," + (k * 0.06).toFixed(3) + ")" : "rgba(0,0,0," + ((k - 0.5) * 0.12).toFixed(3) + ")";
        g.fillRect(x, r * 32, 64, 32);
      }
    }
    g.fillStyle = V.paint.seam;
    for (r = 0; r < 8; r++) {
      g.fillRect(0, r * 32, W, 1);
      for (x = (r & 1) ? 32 : 0; x < W; x += 64) g.fillRect(x, r * 32, 1, 32);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tt[V.id] = t;
    return t;
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function put(mat, geo) {
      if (geo.index) geo = geo.toNonIndexed();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        put(mat, geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        put(mat, geo);
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

  /* rings of [y, z] points at increasing x, wound outward; uv given per point.
     Optional end caps fan from the ring centroid. */
  function ringLoft(THREE, rings, capA, capB) {
    var N = rings[0].pts.length, pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < rings.length; i++)
      for (j = 0; j < N; j++) {
        pos.push(rings[i].x, rings[i].pts[j][0], rings[i].pts[j][1]);
        uv.push(rings[i].uv[j][0], rings[i].uv[j][1]);
      }
    for (i = 0; i < rings.length - 1; i++)
      for (j = 0; j < N - 1; j++) {
        var a = i * N + j, b = a + N, c = a + 1, d = b + 1;
        idx.push(a, c, b, c, d, b);
      }
    function cap(ri, fwd) {
      var base = pos.length / 3, cy = 0, cz = 0, k, R = rings[ri];
      for (k = 0; k < N - 1; k++) { cy += R.pts[k][0]; cz += R.pts[k][1]; }
      pos.push(R.x, cy / (N - 1), cz / (N - 1)); uv.push(0, 0);
      for (k = 0; k < N; k++) { pos.push(R.x, R.pts[k][0], R.pts[k][1]); uv.push(R.pts[k][0] / 4, R.pts[k][1] / 4); }
      for (k = 0; k < N - 1; k++) {
        if (fwd) idx.push(base, base + 1 + k, base + 2 + k); else idx.push(base, base + 2 + k, base + 1 + k);
      }
    }
    if (capA) cap(0, false);
    if (capB) cap(rings.length - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* vertical shell over plan outlines (CCW from above), top capped; uv in 4 m tiles */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      var arc = 0;
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        if (j > 0) { var o = rings[i].pts[j - 1]; arc += Math.hypot(p[0] - o[0], p[1] - o[1]); }
        pos.push(p[0], p[1], rings[i].z); uv.push(arc / 4, rings[i].z / 4);
      }
    }
    for (i = 0; i < L - 1; i++)
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    var base = pos.length / 3, cx = 0, cy = 0, k, top = rings[L - 1];
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    pos.push(cx / N, cy / N, top.z); uv.push(cx / N / 4, cy / N / 4);
    for (k = 0; k < N; k++) { p = top.pts[k]; pos.push(p[0], p[1], top.z); uv.push(p[0] / 4, p[1] / 4); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* fin plan: round nose (radius = half-width), flat sides, rounded aft corners; CCW from above */
  function finPlan(x0, x1, hw, ra) {
    var pts = [], i, a, n1 = 14, n2 = 5;
    for (i = 0; i <= n1; i++) {                       /* nose, starboard -> port */
      a = -PI / 2 + PI * i / n1;
      pts.push([x1 - hw + hw * Math.cos(a), hw * Math.sin(a)]);
    }
    for (i = 0; i <= n2; i++) {                       /* aft port corner */
      a = PI / 2 + (PI / 2) * i / n2;
      pts.push([x0 + ra + ra * Math.cos(a), hw - ra + ra * Math.sin(a)]);
    }
    for (i = 0; i <= n2; i++) {                       /* aft starboard corner */
      a = PI + (PI / 2) * i / n2;
      pts.push([x0 + ra + ra * Math.cos(a), -hw + ra + ra * Math.sin(a)]);
    }
    return pts;
  }
  /* flat extrusion of an outline: z from 0 to depth; xz turns it to stand in the XZ plane */
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
  function strut(THREE, A, mat, r, a, b, seg, r2) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg || 8, 1, false), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function box(THREE, A, mat, sx, sy, sz, x, y, z, rx, rz) {
    A.add(mat, new THREE.BoxGeometry(sx, sy, sz), x, y, z, rx || 0, 0, rz || 0);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  function materials(THREE, C, V) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, V), roughness: 0.94, metalness: 0.02 }),
      tile:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, V), roughness: 0.92, metalness: 0.02 }),
      dark:   std(0x0b0c0d, 0.85, 0.10),    /* limber slots, shutters, windows, hatch wells */
      metal:  std(0x26292c, 0.55, 0.40),    /* black masts, the housed planes */
      mastlt: std(0x8c9195, 0.45, 0.45),    /* bright periscope and aerial masts (d877) */
      screw:  std(0x8a7140, 0.42, 0.70),    /* bronze */
      white:  std(0xb9bcbd, 0.80, 0.05),    /* escape-hatch rings */
      team:   std(team, 0.86, 0.06)
    };
  }

  /* masts: [u from the screw in the variant's own drawing, offset abreast (+ port), height of the
     top over the fin top, radius, material, head]. 877 from d877 at 13.15 px/m, abreast from p_dod;
     636 from d636 at 12.91 px/m, all on the centreline. */
  var MAST877 = [
    [42.6, -0.35, 4.23, 0.11, "mastlt", "dome"], [43.2, -0.95, 5.95, 0.10, "mastlt", "scope"],
    [44.0, 0.30, 3.92, 0.08, "mastlt", "hook"], [46.4, 0.0, 3.47, 0.31, "mastlt", "snort"],
    [47.1, 0.50, 5.06, 0.09, "mastlt", "whip"], [47.6, 0.0, 3.67, 0.07, "metal", "tip"],
    [48.8, -0.30, 3.67, 0.07, "metal", "tip"]
  ];
  var MAST636 = [
    [42.4, 0.0, 6.30, 0.28, "metal", "tube"], [43.5, 0.0, 6.30, 0.28, "metal", "tube"],
    [44.7, 0.0, 4.18, 0.10, "mastlt", "dome"], [45.4, 0.0, 3.80, 0.08, "mastlt", "hook"],
    [47.6, 0.0, 3.50, 0.30, "mastlt", "snort"], [48.5, 0.0, 4.10, 0.09, "mastlt", "whip"],
    [49.0, 0.0, 3.65, 0.07, "metal", "tip"], [50.1, 0.0, 4.10, 0.25, "metal", "cap"]
  ];
  /* limber-slot groups along the 877 casing edge, px at 1920 (d877) */
  var SLOTS = [[450, 480], [515, 545], [618, 645], [697, 725], [760, 790], [855, 880], [1060, 1090],
               [1122, 1152], [1195, 1222], [1250, 1280], [1282, 1310], [1497, 1525], [1545, 1570],
               [1590, 1618], [1655, 1680]];

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {}, V);
    var A = Acc(THREE);
    var is636 = V.is636, LEN = V.L, ox = LEN / 2;
    var i, k, j, u, q;
    function X(uu) { return mapX(uu, is636) - ox; }
    function hy(uu, z) { return hullY(uu, z, is636); }

    /* ---- hull loft: stations finer toward the ends, keel-to-keel girth, seam on the keel ---- */
    var us = [0.9], NS = 56;
    u = 1.2;
    while (u < 72.6) {
      us.push(u);
      u += (u < 14 || u > 64) ? (u > 70.5 ? 0.3 : 0.7) : 2.0;
    }
    us.push(72.6);
    var rings = [];
    for (i = 0; i < us.length; i++) {
      q = sec(Math.min(us[i], 72.55), is636);
      var w = q.w, h = q.h;
      if (i === 0) { w = 0.12; h = 0.12; }
      if (i === us.length - 1) { w = 0.10; h = 0.10; }
      var pts = [], uvs = [], uu = mapX(us[i], is636) / LEN;
      for (j = 0; j <= NS; j++) {
        var t = -PI / 2 + 2 * PI * j / NS;
        pts.push([w * spow(Math.cos(t), 2 / NSE), q.zc + h * spow(Math.sin(t), 2 / NSE)]);
        uvs.push([uu, j / NS]);
      }
      rings.push({ x: X(us[i]), pts: pts, uv: uvs });
    }
    A.add("skin", ringLoft(THREE, rings, true, true), 0, 0, 0);

    /* ---- casing: flat deck, sloping side band about 1 m deep, sunk into the crown ----
       877 fairs away aft at 8 m into the light housing; 636 ends in its 0.85 m step at 11.7 m */
    var ua = is636 ? 11.7 : 8.2, ub = 70.2;
    /* plan: tapering aft (p_alr1), blunt and rounded forward where it runs onto the bow dome (p_sov) */
    function dw(uu) {
      var a = Math.min(1, (uu - ua) / (is636 ? 1.2 : 5.0) + (is636 ? 0.55 : 0.08), Math.sqrt(clamp((ub - uu) / 4.5, 0, 1)) + 0.04);
      return Math.max(0.12, 2.1 * a);
    }
    var crs = [], uc = ua;
    while (uc <= ub + 0.01) {
      var top = ctop(uc), hw = dw(uc), drop = Math.max(0.35, crownDrop(uc, is636)) + 0.75;
      var bw = Math.min(hw + 0.75, Math.max(hw, hy(uc, top - drop) - 0.04));
      var P = [[0, top - drop - 0.6], [-bw * 0.6, top - drop - 0.5], [-bw, top - drop], [-hw - 0.05, top - 0.08],
               [-hw + 0.05, top], [hw - 0.05, top], [hw + 0.05, top - 0.08], [bw, top - drop], [bw * 0.6, top - drop - 0.5],
               [0, top - drop - 0.6]];
      var UV = [], arc = 0;
      for (j = 0; j < P.length; j++) {
        if (j > 0) arc += Math.hypot(P[j][0] - P[j - 1][0], P[j][1] - P[j - 1][1]);
        UV.push([mapX(uc, is636) / 4, arc / 4]);
      }
      /* wind outward: keel -> port -> deck -> starboard, as the hull rings run */
      crs.push({ x: X(uc), pts: P.map(function (p) { return [-p[0], p[1]]; }), uv: UV });
      uc = Math.min(ub, uc + ((uc < ua + 4 || uc > ub - 6) ? (uc > ub - 2 ? 0.4 : 0.8) : 2.4)); if (uc >= ub && crs.length && crs[crs.length - 1].x >= X(ub) - 1e-6) break;
    }
    A.add("tile", ringLoft(THREE, crs, true, true), 0, 0, 0);

    /* ---- 877: the light housing where the casing ends aft (d877, 7.7-9.0 m, top 0.63 m) ---- */
    if (!is636) {
      var nb = ext(THREE, [[X(7.7), -0.2], [X(9.0), -0.2], [X(9.0), 0.63], [X(7.9), 0.63]], 0.5, true);
      nb.translate(0, 0.25, 0);
      A.add("tile", nb, 0, 0, 0);
    }

    /* ---- limber slots: on the hull just under the casing edge, 1.2 m under the deck (d877) ---- */
    for (k = 0; k < SLOTS.length; k++) {
      var sa = SLOTS[k][0] / PXS, sb = SLOTS[k][1] / PXS, sq = (sa + sb) / 2;
      var zs = ctop(sq) - 1.2, ys = hy(sq, zs), na = hullNA(sq, zs, is636);
      var nseg = Math.max(2, Math.round((sb - sa) / 0.36)), sl = (sb - sa) / nseg;
      for (j = 0; j < nseg; j++)
        for (i = -1; i <= 1; i += 2)
          box(THREE, A, "dark", sl * 0.7, 0.06, 0.20, X(sa + sl * (j + 0.5)), i * (ys + 0.005), zs, i * na);
    }

    /* ---- escape-hatch rings on the casing, fore and aft of the fin (p_sov, p_dod, p_mod) ---- */
    var RU = [22.5, 57.5];
    for (k = 0; k < RU.length; k++) {
      var zr = ctop(RU[k]) + 0.02;
      A.add("white", new THREE.RingGeometry(0.72, 0.98, 28), X(RU[k]), 0, zr);
      A.add("dark", new THREE.CircleGeometry(0.52, 20), X(RU[k]), 0, zr + 0.01);
    }

    /* ---- bow planes housed flat against the hull, high on the bow (d877 panel: lower edge
       55.2-56.7 m, upper edge 54.2-55.7 m, from -0.14 to +1.58 m) over a dark slot rim ---- */
    function patch(mat, side, xa0, xb0, lean, z0, z1, off, nz) {
      var pp = [], ix = [], jj, zq, fq, xa1, xb1;
      for (jj = 0; jj <= nz; jj++) {
        fq = jj / nz; zq = z0 + (z1 - z0) * fq; xa1 = xa0 - lean * fq; xb1 = xb0 - lean * fq;
        pp.push(X(xa1), side * (hy(xa1, zq) + off), zq, X(xb1), side * (hy(xb1, zq) + off), zq);
      }
      for (jj = 0; jj < nz; jj++) {
        var a0 = jj * 2;
        if (side > 0) ix.push(a0, a0 + 2, a0 + 1, a0 + 1, a0 + 2, a0 + 3);
        else ix.push(a0, a0 + 1, a0 + 2, a0 + 1, a0 + 3, a0 + 2);
      }
      var pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.Float32BufferAttribute(pp, 3));
      pg.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pp.length / 3 * 2).fill(0), 2));
      pg.setIndex(ix); pg.computeVertexNormals();
      A.add(mat, pg, 0, 0, 0);
    }
    for (i = -1; i <= 1; i += 2) {
      patch("dark", i, 55.08, 56.84, 1.0, -0.26, 1.70, 0.03, 8);
      patch("metal", i, 55.2, 56.7, 1.0, -0.14, 1.58, 0.12, 8);
    }

    /* ---- torpedo-tube shutters on the stem, three a side (d877 ovals) ---- */
    var PORTS = [[71.05, -0.45, 0.50, 0.30], [71.05, -1.15, 0.45, 0.36], [72.05, -1.15, 0.30, 0.34]];
    for (k = 0; k < PORTS.length; k++) {
      var pu = PORTS[k][0], pz = PORTS[k][1], py = hy(pu, pz);
      for (i = -1; i <= 1; i += 2)
        A.add("dark", new THREE.SphereGeometry(1.0, 10, 6), X(pu), i * (py - 0.03), pz, 0, 0, 0, [PORTS[k][2], 0.10, PORTS[k][3]]);
    }

    /* ---- fin: round nose, flat sides, upright fore edge, aft edge raked 0.25 m ---- */
    var fu0 = 38.0, fu1 = 51.9, fh = is636 ? 4.82 : 4.95, ftop = ZC0 + fh;
    var fx0 = X(fu0), fx1 = X(fu1), fw = 1.4, zb = ZC0 - 0.6;
    var lv = [zb, ZC0 + 0.4, ZC0 + 1.5, ZC0 + 2.6, ZC0 + 3.6, ftop - 0.30, ftop - 0.12, ftop - 0.03, ftop];
    var frs = [];
    for (i = 0; i < lv.length; i++) {
      var zl = lv[i], e2 = Math.max(0, zl - (ftop - 0.30)) / 0.30, ee = 1 - Math.sqrt(Math.max(0, 1 - e2 * e2));
      var xa2 = fx0 + 0.25 * clamp((zl - ZC0) / fh, 0, 1) + ee * 0.14;
      frs.push({ z: zl, pts: finPlan(xa2, fx1 - ee * 0.14, fw - ee * 0.14, 0.75) });
    }
    A.add("tile", shell(THREE, frs), 0, 0, 0);
    /* the bridge well at the fore end of the top, and its lip (p_dod, p_sov: men stand in it) */
    box(THREE, A, "dark", 2.3, 1.7, 0.05, fx1 - 1.75, 0, ftop + 0.01);
    for (i = -1; i <= 1; i += 2) {
      /* three windows a side forward, high (d877/d636) */
      for (k = 0; k < 3; k++) box(THREE, A, "dark", 0.34, 0.05, 0.26, X(50.45 + k * 0.48), i * (fw + 0.005), ftop - 0.72);
      /* the oval door low on the side, the light recess, the grille, the rubbing strake */
      box(THREE, A, "dark", 0.82, 0.05, 1.45, X(44.05), i * (fw + 0.005), ZC0 + 1.0);
      box(THREE, A, "dark", 1.55, 0.05, 0.55, X(46.0), i * (fw + 0.005), ftop - 2.1);
      for (k = 0; k < 4; k++) box(THREE, A, "dark", 0.08, 0.05, 0.62, X(41.85 + k * 0.15), i * (fw + 0.005), ftop - 1.25);
      box(THREE, A, "dark", fu1 - fu0 - 1.6, 0.04, 0.05, X((fu0 + fu1) / 2 - 0.3), i * (fw + 0.01), ZC0 + 1.0);
    }
    /* five windows round the nose (p_dod) */
    for (k = -2; k <= 2; k++) {
      var an = k * 0.42, wx = fx1 - fw + (fw + 0.005) * Math.cos(an), wy = (fw + 0.005) * Math.sin(an);
      A.add("dark", new THREE.BoxGeometry(0.05, 0.30, 0.24), wx, wy, ftop - 0.72, 0, 0, an);
    }

    /* ---- masts, each from its own drawing ---- */
    var ML = is636 ? MAST636 : MAST877, fin0 = is636 ? 39.4 : fu0;      /* fin aft end in that drawing */
    for (k = 0; k < ML.length; k++) {
      var m = ML[k], mx = fx0 + (m[0] - fin0), my = m[1], mt = ftop + m[2], mr = m[3], mm = m[4], hd = m[5];
      if (hd === "tube") {                                    /* 636: thick black tube, slimmer above */
        strut(THREE, A, mm, mr, [mx, my, ftop - 0.05], [mx, my, mt - 2.2], 12);
        strut(THREE, A, mm, mr * 0.62, [mx, my, mt - 2.2], [mx, my, mt - 0.15], 12);
        A.add(mm, new THREE.SphereGeometry(mr * 0.62, 10, 5, 0, 2 * PI, 0, PI / 2), mx, my, mt - 0.15, PI / 2, 0, 0);
        continue;
      }
      strut(THREE, A, mm, mr, [mx, my, ftop - 0.05], [mx, my, mt], 10);
      if (hd === "dome") {                                    /* capsule head 0.56 m across, 1.1 m tall */
        cylZ(THREE, A, "metal", 0.28, 0.28, 0.8, 12, mx, my, mt + 0.4);
        A.add("metal", new THREE.SphereGeometry(0.28, 12, 6), mx, my, mt + 0.8);
      } else if (hd === "scope") {                            /* tapered tip and the loop aerial */
        strut(THREE, A, mm, 0.05, [mx, my, mt], [mx, my, mt + 0.6], 8, 0.02);
        A.add(mm, new THREE.TorusGeometry(0.46, 0.035, 6, 18), mx, my, ftop + 2.43, PI / 2, 0, 0);
      } else if (hd === "hook") {
        strut(THREE, A, mm, 0.06, [mx, my, mt], [mx + 0.25, my, mt + 0.25], 6);
      } else if (hd === "snort") {                            /* snorkel head valve and its fore slab */
        box(THREE, A, "metal", 1.05, 0.62, 1.0, mx + 0.12, my, mt - 0.05);
        box(THREE, A, "metal", 0.38, 0.5, 2.0, mx + 0.6, my, mt - 1.35);
      } else if (hd === "whip") {
        strut(THREE, A, "mastlt", 0.025, [mx, my, mt], [mx - 0.32, my, ftop + 9.6], 5, 0.012);
      } else if (hd === "cap") {
        A.add("dark", new THREE.SphereGeometry(mr, 10, 5), mx, my, mt, 0, 0, 0, [1, 1, 1.6]);
      } else {
        strut(THREE, A, mm, 0.035, [mx, my, mt], [mx, my, mt + 0.25], 6, 0.015);
      }
    }
    A.add("metal", new THREE.SphereGeometry(0.16, 10, 5, 0, 2 * PI, 0, PI / 2), X(48.4), 0, ftop, PI / 2, 0, 0);

    /* ---- stern: deep box rudder under the cone (d877 3.4-9.1 m, foot at -7.34 m) ---- */
    var SO = is636 ? 0.4 : 0;     /* d636 puts the rudder 0.4 m further from the screw (3.78-9.49 m) */
    var RD = [[3.38, -3.70], [3.38, -7.34], [7.95, -7.34], [9.09, -4.73], [8.6, -4.2], [6.0, -3.9]];
    var rdp = RD.map(function (p) { return [X(p[0] + SO), p[1]]; });
    var rg = ext(THREE, rdp, 0.40, true); rg.translate(0, 0.20, 0);
    A.add("tile", rg, 0, 0, 0);
    for (i = -1; i <= 1; i += 2) {
      box(THREE, A, "dark", 0.05, 0.03, 3.3, X(5.55 + SO), i * 0.215, -5.65);     /* the rudder hinge line */
      box(THREE, A, "dark", 2.2, 0.03, 0.05, X(4.45 + SO), i * 0.215, -7.0);
    }
    /* stern planes: the fairing lens on the cone (d877 3.3-8.4 m) and the planes (span assumed) */
    for (i = -1; i <= 1; i += 2) {
      A.add("tile", new THREE.SphereGeometry(1.0, 14, 8), X(5.9 + SO), i * 0.55, -2.5, 0, 0, 0, [2.6, 0.75, 0.42]);
      var sp = [[X(3.9 + SO), 0], [X(7.6 + SO), 0], [X(6.9 + SO), i * 3.4], [X(5.0 + SO), i * 3.4]];
      if (i < 0) sp.reverse();
      var spg = ext(THREE, sp, 0.18); spg.translate(0, 0, -2.59);
      A.add("tile", spg, 0, 0, 0);
      box(THREE, A, "dark", 0.04, 2.6, 0.2, X(4.75 + SO), i * 1.95, -2.5);         /* plane hinge line */
      /* the grilled intake under the fairing (d877 5.5-7.4 m) and the port aft of the rudder */
      var gz = -3.4, gy = hy(6.45 + SO, gz);
      A.add("dark", new THREE.SphereGeometry(1.0, 10, 6), X(6.45 + SO), i * (gy - 0.02), gz, 0, 0, 0, [0.95, 0.10, 0.34]);
      var oz = -3.7;
      A.add("dark", new THREE.SphereGeometry(1.0, 8, 6), X(11.25), i * (hy(11.25, oz) - 0.02), oz, 0, 0, 0, [0.45, 0.10, 0.30]);
    }

    /* ---- one screw: 6 blades (877) / 7 (636), 2.6 m across as drawn, skewed blades ---- */
    var nbl = V.blades, pr = V.prop, pz0 = -3.03;
    cylX(THREE, A, "screw", 0.36, 0.16, 1.0, 16, X(0.6), 0, pz0);
    A.add("screw", new THREE.SphereGeometry(0.17, 10, 6), X(0.1), 0, pz0);
    var bl = [[-0.10, 0.20], [-0.26, 0.45], [-0.36, 0.72], [-0.26, 0.93], [0.02, 1.0], [0.22, 0.86], [0.24, 0.58], [0.10, 0.22]];
    for (i = 0; i < nbl; i++) {
      var gb = ext(THREE, bl.map(function (p) { return [p[0] * pr, p[1] * pr]; }), 0.05);
      gb.translate(0, 0, -0.025);
      gb.rotateY(0.9);
      A.add("screw", gb, X(0.45), 0, pz0, i * 2 * PI / nbl + 0.3, 0, 0);
    }

    /* ---- modest team strips: two flat panels on the casing, 2 cm up ---- */
    box(THREE, A, "team", 2.4, 0.8, 0.04, X(62.0), 0, ctop(62.0) + 0.02);
    box(THREE, A, "team", 2.4, 0.8, 0.04, X(16.5), 0, ctop(16.5) + 0.02);

    A.done(T, g);
    return g;
  }

  var VAR = {
    k877:  { id: "k877",  is636: false, L: 72.6, blades: 6, prop: 1.31, seed: 877, paint: PAINT.k877 },
    k636:  { id: "k636",  is636: true,  L: 73.8, blades: 7, prop: 1.20, seed: 636, paint: PAINT.k636 },
    k6363: { id: "k6363", is636: true,  L: 73.8, blades: 7, prop: 1.20, seed: 6363, paint: PAINT.k6363 }
  };
  return { build: function (THREE, M, C, which) { return build(THREE, M, C, VAR[which]); } };
})();

/* len is each boat's true length: render3d scales a submarine by it. */
UNIT_MODELS["pact_e80_sub"] = { len: 72.6, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, "k877"); } };
UNIT_MODELS["pact_e90_sub"] = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, "k636"); } };
UNIT_MODELS["pact_e00_sub"] = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, "k6363"); } };
UNIT_MODELS["sub_p"]        = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, "k6363"); } };

/* The PLA bought Kilos from Russia from 1995 (row: 877EKM and 636); most were 636s, so
   the row takes the 636 hull.  No markings drawn. */
UNIT_MODELS["pla_e90_sub"]  = { len: 73.8, build: function (THREE, M, C) { return HeroKilo.build(THREE, M, C, "k636"); } };
