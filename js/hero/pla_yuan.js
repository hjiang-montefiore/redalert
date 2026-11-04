/* ============ pla_yuan.js -- HERO model: Type 039A / 039B Yuan class (AIP attack submarine) ============
   PLA Navy diesel-electric / Stirling-AIP attack submarine, one shaft. Full-quality redo, 2026-11-04.
   Row (eras.js / sub_specs.js): pla_e00_sub "Type 039A/B Yuan" (service 2006).

   References (Wikimedia Commons, scratchpad/q_yuan_ref):
     d39  "Yuan class 039B mod SS.svg" (the Wikipedia infobox profile of the upgraded 039B), side
          elevation, fetched 1920 px wide: screw tip x 2 to bow x 1917 = 77.6 m, 24.68 px/m. Its
          draught marks put the long waterline tick at y 393 and the keel at y 564: 6.9 m draught.
          Everything in the hull, sail, mast, rudder and plane tables below is read off it.
     p_mul "Mike Mullen departs the Chinese Navy submarine Yuan at the Zhoushan Naval Base.jpg"
          (US Navy, 039A alongside, 960 px): black tiles all over the sail and casing (sampled 44-54
          grey), the louvred vent grille high on the aft end of the sail, the bucket-shaped snorkel
          head, small fairwater planes low on the fore end of the sail, flat tiled casing.
     Wikipedia "Type 039A/B/C submarine" (raw, 2026-11): 77.6 m, beam 8.4 m, draught 6.7 m,
          3,600 t submerged (USNI 2015); teardrop hull with an angled hump casing; "upper and lower
          rudders and sternplanes with a single propeller shaft" (cruciform, not X); a pair of
          fairwater planes on the sail; anechoic tiles; seven-blade skewed screw; 039B flank array
          on the lower hull; 039B (upgraded) sail with small root extensions fore and aft.
   Published vs drawn: length 77.6 m (the scale), beam 8.4 m (the loft is capped at it), draught
   6.7 m published / 6.9 m on d39 (the d39 waterline is used). The 5.3 m draught in the task
   note matches neither source, so it is not used.

   Recognition list (where it shows):
     1 teardrop hull with a full round bulbous bow and a long straight stern cone (station table TB,
       d39, top and keel line every 1-2 m; the cone from its two straight edges, hub to 12 m).
     2 the hump casing: the deck line climbs from 2.1 m (20 m from the screw) to 2.9 m over the
       waterline amidships and falls into the bow (d39); its sloping side band ends at the panel
       line 1.3 m under the deck (d39 y 353), the limber-slot groups run along that line (d39).
     3 the tall sail well forward (46.5-60.1 m from the screw), 5.1 m over the deck, flat top with
       round corners, both edges leaning in toward the top and the small root fillets fore and aft
       of the upgraded 039B (SAIL table, d39 row by row); vent grille aft high (d39, p_mul), two
       long strakes along the top, the low strake, the side door, small bridge windows forward (d39).
     4 the fairwater planes low on the fore end of the sail (d39 outline 56.0-58.8 m, 4.6-5.5 m up;
       p_mul shows them small).
     5 the masts as d39 raises them: the snorkel with its bucket head, two tall masts with dark
       heads over bright lower tubes, the short hooked mast, the tall whip, a small dome on the top.
     6 cruciform stern: upper and lower rudders with their forward fillets running onto the cone and
       the movable-rudder hinge lines (d39), stern planes on the shaft axis (d39 root-fairing outline).
     7 ONE seven-blade skewed screw, 2.7 m across as d39 draws it.
     8 three torpedo-tube shutters a side high on the bow (d39 ovals) and the stepped bow-sonar
       panel line (d39), the long flank-array fairing low on the hull 26-68 m (d39, the 039B).
     9 anechoic tiles: staggered tile grid painted on hull, casing and sail, matt black (p_mul).
    10 red-brown anti-fouling under the boot line, which d39 runs from 0.3 m over the waterline aft
       to 0.7 m under it at the bow (d39; never seen in surfaced photographs).

   Waterline and the game: as ru_kilo.js, z = 0 is the surfaced waterline (d39's tick), the deck
   2.9 m above it amidships. render3d draws a submarine at periscope depth, so in game the casing
   runs awash and the sail and masts stand clear.
   NOT CONFIRMED (no plan, section or head-on reference; estimated from proportions):
     - sail width 2.6 m (p_mul is oblique; nothing head-on), and the fillets' plan width;
     - casing deck width (3.2 m flat top, the Kilo's proportions) and the hull section (a superellipse
       capped at the published beam; d39's 9.4 m depth below the deck gives a slightly tall section);
     - fairwater-plane span (tips 2.0 m out from the sail side) and planform;
     - stern-plane span (taken equal to the rudders', 5.0 m from the axis) and planform; rudder and
       plane thickness (0.45 m); the screw's blade outline and skew (the Kilo's, 7 blades);
     - the flank-array fairing's relief (drawn 6 cm proud); tile size (0.9 x 0.6 m painted).
   No hull number, flag, ensign, star, text, rails or pennants.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. The row is not turret:true, so
   nothing is named "turret". Merged per material (one draw call each). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYuan = (function () {
  "use strict";

  var PI = Math.PI;
  var LEN = 77.6;
  var NSE = 2.15;                  /* hull section: a superellipse a shade fuller than a circle */
  var BEAM = 4.2;                  /* half of the published 8.4 m */
  var ZAX = -2.15;                 /* shaft axis (d39: hub and cone centre) */

  /* [metres from the screw tip, top line z, keel line z] off d39 (z over the d39 waterline).
     Top is the casing deck where the casing runs, else the hull; sail, rudders and fillets skipped.
     1.5-12 m: the cone's two straight edges, (38,437)-(300,370) and (38,455)-(300,518) px. */
  var TB = [
    [1.46, -1.78, -2.51], [2.0, -1.64, -2.65], [3.0, -1.38, -2.89], [4.0, -1.13, -3.12],
    [6.0, -0.62, -3.60], [8.0, -0.11, -4.09], [10.0, 0.40, -4.58], [12.0, 0.93, -5.07],
    [14.0, 1.30, -5.47], [16.0, 1.58, -5.79], [18.0, 1.82, -6.12], [20.0, 2.07, -6.36],
    [22.0, 2.23, -6.61], [24.0, 2.39, -6.81], [26.0, 2.55, -6.93], [28.0, 2.67, -6.93],
    [30.0, 2.76, -6.93], [33.0, 2.84, -6.93], [36.0, 2.88, -6.93], [40.0, 2.92, -6.93],
    [64.0, 2.92, -6.93], [66.0, 2.88, -6.93], [68.0, 2.71, -6.93], [69.0, 2.59, -6.93],
    [70.0, 2.47, -6.89], [71.0, 2.27, -6.81], [72.0, 2.07, -6.69], [73.0, 1.78, -6.52],
    [74.0, 1.46, -6.28], [75.0, 1.05, -5.88], [76.0, 0.45, -5.31], [76.5, 0.04, -4.86],
    [77.0, -0.45, -4.30], [77.3, -0.97, -3.69], [77.5, -1.50, -3.04], [77.6, -2.05, -2.55]
  ];
  /* sail outline, d39 row by row: [z, aft edge u, fore edge u] (fillets at the foot) */
  var SAIL = [
    [2.40, 46.30, 60.30], [2.96, 46.52, 60.05], [3.08, 46.68, 59.93], [3.20, 46.80, 59.81],
    [3.36, 46.92, 59.69], [3.57, 47.05, 59.53], [3.77, 47.13, 59.45], [4.17, 47.21, 59.37],
    [5.39, 47.49, 59.20], [6.20, 47.69, 59.12], [7.01, 47.86, 58.96], [7.33, 47.94, 58.84],
    [7.54, 48.02, 58.76], [7.70, 48.14, 58.64], [7.82, 48.30, 58.51], [7.90, 48.42, 58.39],
    [7.98, 48.63, 58.23], [8.02, 48.79, 58.11]
  ];
  var DECK = 2.92, STOP = 8.02, SHW = 1.3;   /* deck amidships, sail top, sail half-width (est.) */

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function tab(T, u, k) {
    var i;
    if (u <= T[0][0]) return T[0][k];
    for (i = 1; i < T.length; i++) {
      if (u <= T[i][0]) {
        var a = T[i - 1], b = T[i], t = (u - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return T[T.length - 1][k];
  }
  function ctop(u) { return tab(TB, u, 1); }
  function keel(u) { return tab(TB, u, 2); }
  /* the hull crown under the casing deck: 0.55 m amidships, nothing on the cone or the bow dome */
  function crownDrop(u) { return 0.55 * clamp((u - 13.0) / 4.0, 0, 1) * clamp((74.0 - u) / 3.0, 0, 1); }
  function sec(u) {
    var top = ctop(u) - crownDrop(u), bot = keel(u), h = (top - bot) / 2;
    return { w: Math.min(BEAM, h * 1.0), h: h, zc: (top + bot) / 2 };
  }
  function spow(c, e) { return (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e); }
  function hullY(u, z) {
    var q = sec(u), v = Math.abs((z - q.zc) / q.h);
    if (v >= 1) return 0;
    return q.w * Math.pow(1 - Math.pow(v, NSE), 1 / NSE);
  }
  function hullNA(u, z) {
    var q = sec(u), y = Math.max(0.01, hullY(u, z)), dz = z - q.zc;
    var gy = Math.pow(y / q.w, NSE - 1) / q.w, gz = spow(dz / q.h, 1) * Math.pow(Math.abs(dz / q.h), NSE - 2) / q.h;
    return Math.atan2(gz, gy);
  }
  /* girth v (0 keel, 0.25 port, 0.5 crown, 0.75 starboard) of height z at station u: [port, stbd] */
  function vOf(u, z) {
    var q = sec(clamp(u, 1.5, 77.5)), s0 = clamp((z - q.zc) / q.h, -1, 1), t0 = Math.asin(spow(s0, NSE / 2));
    return [(t0 + PI / 2) / (2 * PI), (PI - t0 + PI / 2) / (2 * PI)];
  }
  function bootZ(u) { return 0.32 - 1.05 * (u - 3.0) / 74.0; }   /* d39 boot line, y 385 aft to 411 fwd */

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function hex(c) { var s = c.toString(16); while (s.length < 6) s = "0" + s; return "#" + s; }

  /* ---------------------------------------------------------------- paint
     p_mul tiles sampled 44-54 grey, taken to 0.7 of their level as ru_kilo.js does (ACES lifts mid
     tones); d39's anti-fouling (115,65,45) to 0.7 likewise. */
  var PAINT = { hull: 0x2a2b2d, below: 0x502d1f, seam: "rgba(0,0,0,0.42)" };

  /* hull canvas: u = metres from the screw / length; v = girth from the keel. Tiles 0.9 m, 40 rows. */
  /* one sheet per colour: the loft is split on the boot line, black tiles above, anti-fouling below */
  var _tex = {};
  function hullTex(THREE, base) {
    if (_tex[base]) return _tex[base];
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(39), i, r, x, vv;
    function col(uu) { return Math.round(uu / LEN * W); }
    g.fillStyle = hex(base); g.fillRect(0, 0, W, H);
    var tl = 0.9 / LEN * W, rows = 40, rh = H / rows;
    for (r = 0; r < rows; r++) {
      var off = (r & 1) ? tl / 2 : 0;
      for (x = -off; x < W; x += tl) {
        var k = R1();
        g.fillStyle = k < 0.5 ? "rgba(255,255,255," + (k * 0.06).toFixed(3) + ")" : "rgba(0,0,0," + ((k - 0.5) * 0.12).toFixed(3) + ")";
        g.fillRect(x, r * rh, tl, rh);
      }
    }
    g.fillStyle = PAINT.seam;
    for (r = 0; r < rows; r++) {
      g.fillRect(0, r * rh, W, 1);
      for (x = (r & 1) ? tl / 2 : 0; x < W; x += tl) g.fillRect(Math.round(x), r * rh, 1, rh);
    }
    /* panel lines (d39): horizontal runs at fixed z, vertical runs at fixed u */
    g.fillStyle = "rgba(0,0,0,0.6)";
    function hline(z, ua, ub) {
      for (i = col(ua); i <= col(ub); i++) { vv = vOf((i + 0.5) / W * LEN, z); g.fillRect(i, vv[0] * H - 1, 1, 2); g.fillRect(i, vv[1] * H - 1, 1, 2); }
    }
    function vline(u0, za, zb) {
      var a = vOf(u0, za), b = vOf(u0, zb), c0 = col(u0) - 1;
      g.fillRect(c0, Math.min(a[0], b[0]) * H, 2, Math.abs(a[0] - b[0]) * H);
      g.fillRect(c0, Math.min(a[1], b[1]) * H, 2, Math.abs(a[1] - b[1]) * H);
    }
    /* stepped bow-sonar panel: 68.9 m down to the keel, z -2.88 to 73.5, up to -1.58, on to 75.0, up to -0.69 */
    vline(68.9, -2.88, -6.93); hline(-2.88, 68.9, 73.5); vline(73.5, -2.88, -1.58);
    hline(-1.58, 73.5, 75.0); vline(75.0, -1.58, -0.69);
    /* the casing-edge panel line, 1.3 m under the deck (d39 y 353, 15.5-68.8 m) is modelled; the
       flank-array outline 26.1-68.35 m, z -4.42 / -5.23 */
    hline(-4.42, 26.1, 68.35); hline(-5.23, 26.1, 68.35); vline(26.1, -4.42, -5.23); vline(68.35, -4.42, -5.23);
    var t = new THREE.CanvasTexture(cv);
    t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex[base] = t;
    return t;
  }
  /* repeat tile for casing, sail and appendages: 4 x 4 m, tiles 1.0 x 0.5 m staggered */
  var _tt = null;
  function tileTex(THREE) {
    if (_tt) return _tt;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(3939), r, x;
    g.fillStyle = hex(PAINT.hull); g.fillRect(0, 0, W, H);
    for (r = 0; r < 8; r++) {
      for (x = (r & 1) ? -32 : 0; x < W; x += 64) {
        var k = R1();
        g.fillStyle = k < 0.5 ? "rgba(255,255,255," + (k * 0.06).toFixed(3) + ")" : "rgba(0,0,0," + ((k - 0.5) * 0.12).toFixed(3) + ")";
        g.fillRect(x, r * 32, 64, 32);
      }
    }
    g.fillStyle = PAINT.seam;
    for (r = 0; r < 8; r++) {
      g.fillRect(0, r * 32, W, 1);
      for (x = (r & 1) ? 32 : 0; x < W; x += 64) g.fillRect(x, r * 32, 1, 32);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tt = t;
    return t;
  }

  /* ------------------------------------------------------ merge machinery (ru_kilo.js) */
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

  /* rings of [y, z] points at increasing x, wound outward; uv per point; optional fan caps */
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
  /* sail plan: round nose forward (radius = half-width), flat sides, rounded aft corners; CCW */
  function finPlan(x0, x1, hw, ra) {
    var pts = [], i, a, n1 = 14, n2 = 5;
    for (i = 0; i <= n1; i++) { a = -PI / 2 + PI * i / n1; pts.push([x1 - hw + hw * Math.cos(a), hw * Math.sin(a)]); }
    for (i = 0; i <= n2; i++) { a = PI / 2 + (PI / 2) * i / n2; pts.push([x0 + ra + ra * Math.cos(a), hw - ra + ra * Math.sin(a)]); }
    for (i = 0; i <= n2; i++) { a = PI + (PI / 2) * i / n2; pts.push([x0 + ra + ra * Math.cos(a), -hw + ra + ra * Math.sin(a)]); }
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

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, PAINT.hull), roughness: 0.94, metalness: 0.02 }),
      skinlo: new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, PAINT.below), roughness: 0.94, metalness: 0.02 }),
      tile:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.92, metalness: 0.02 }),
      anti:   std(PAINT.below, 0.90, 0.03),   /* the flank-array fairing, under the boot line */
      dark:   std(0x0b0c0d, 0.85, 0.10),      /* limber slots, shutters, windows, grille, lines */
      metal:  std(0x26292c, 0.55, 0.40),      /* dark mast heads, snorkel head */
      mastlt: std(0x9a9ea2, 0.45, 0.45),      /* bright lower mast tubes (d39 draws them light) */
      screw:  std(0x8a7140, 0.42, 0.70),      /* bronze (d39 draws the screw buff) */
      team:   std(team, 0.86, 0.06)
    };
  }

  /* masts off d39: [u, top z, radius, lower bright tube up to z, head] */
  var MASTS = [
    [51.62, 11.67, 0.12, 9.77, "head"], [52.70, 9.85, 0.10, 9.60, "hook"],
    [53.00, 10.30, 0.11, 10.30, "whip"], [53.77, 11.67, 0.12, 9.77, "head"]
  ];
  /* limber-slot groups along the casing edge, d39 px at 1920 (y 355-358) */
  var SLOTS = [[440, 468], [529, 557], [618, 647], [678, 708], [890, 919], [966, 981], [997, 1027],
               [1042, 1072], [1135, 1162], [1180, 1298], [1332, 1543], [1560, 1588], [1605, 1620],
               [1676, 1697], [1742, 1781]];
  var PXS = 1915 / 77.6;

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var ox = LEN / 2, i, k, j, u, q;
    function X(uu) { return uu - ox; }

    /* ---- hull loft, stations finer toward the ends. Each ring is cut on the d39 boot line: the
       upper arc (port boot point over the crown to starboard) in black tile, the lower arc (round
       under the keel) in anti-fouling, so the colour change is an edge, not a texel row ---- */
    var us = [1.46], NU = 30, NL = 14;
    u = 1.8;
    while (u < 77.6) { us.push(u); u += (u < 14 || u > 68) ? (u > 75.5 ? 0.25 : 0.7) : 2.0; }
    us.push(77.6);
    var rUp = [], rLo = [];
    function ringPt(qq, w, h, t) { return [w * spow(Math.cos(t), 2 / NSE), qq.zc + h * spow(Math.sin(t), 2 / NSE)]; }
    function vOfT(t) { return (t + PI / 2) / (2 * PI); }
    for (i = 0; i < us.length; i++) {
      q = sec(Math.min(us[i], 77.58));
      var w = q.w, h = q.h;
      if (i === us.length - 1) { w = 0.12; h = 0.12; }
      var tb = Math.asin(spow(clamp((bootZ(us[i]) - q.zc) / q.h, -0.98, 0.98), NSE / 2));
      var pu = [], vu = [], pl = [], vl = [], uu = us[i] / LEN, tt;
      for (j = 0; j <= NU; j++) { tt = tb + (PI - 2 * tb) * j / NU; pu.push(ringPt(q, w, h, tt)); vu.push([uu, vOfT(tt)]); }
      for (j = 0; j <= NL * 2; j++) {
        tt = PI - tb + (PI + 2 * tb) * j / (NL * 2);
        pl.push(ringPt(q, w, h, tt));
        vl.push([uu, (tt + PI / 2) / (2 * PI)]);          /* runs past 1 under the keel: wrapT repeats */
      }
      rUp.push({ x: X(us[i]), pts: pu, uv: vu });
      rLo.push({ x: X(us[i]), pts: pl, uv: vl });
    }
    A.add("skin", ringLoft(THREE, rUp, false, false), 0, 0, 0);
    A.add("skinlo", ringLoft(THREE, rLo, false, false), 0, 0, 0);

    /* ---- casing: flat deck (half-width 1.6 m, est.) and a sloping side band down to the d39
       panel line 1.3 m under the deck; 13-73.5 m, fairing to nothing at both ends ---- */
    var ua = 13.0, ub = 73.5;
    function dw(uu) {
      var a = Math.min(Math.sqrt(clamp((uu - ua) / 5.0, 0, 1)), Math.sqrt(clamp((ub - uu) / 4.0, 0, 1)));
      return Math.max(0.10, 1.6 * a);
    }
    var crs = [], uc = ua;
    while (true) {
      var top = ctop(uc), hw = dw(uc), drop = 1.3;
      var bw = Math.max(hw + 0.05, hullY(uc, top - drop) - 0.04);
      var P = [[0, top - drop - 0.6], [-bw * 0.6, top - drop - 0.5], [-bw, top - drop], [-hw - 0.05, top - 0.08],
               [-hw + 0.05, top], [hw - 0.05, top], [hw + 0.05, top - 0.08], [bw, top - drop], [bw * 0.6, top - drop - 0.5],
               [0, top - drop - 0.6]];
      var UV = [], arc = 0;
      for (j = 0; j < P.length; j++) {
        if (j > 0) arc += Math.hypot(P[j][0] - P[j - 1][0], P[j][1] - P[j - 1][1]);
        UV.push([uc / 4, arc / 4]);
      }
      crs.push({ x: X(uc), pts: P.map(function (p) { return [-p[0], p[1]]; }), uv: UV });
      if (uc >= ub) break;
      uc = Math.min(ub, uc + ((uc < ua + 5 || uc > ub - 5) ? 0.6 : 2.4));
    }
    A.add("tile", ringLoft(THREE, crs, true, true), 0, 0, 0);

    /* ---- limber slots on the casing band just over its lower edge (d39 y 355-358, z 1.5) ---- */
    for (k = 0; k < SLOTS.length; k++) {
      var sa = (SLOTS[k][0] - 2) / PXS, sb = (SLOTS[k][1] - 2) / PXS, sq = (sa + sb) / 2;
      var zs = ctop(sq) - 1.45, ys = hullY(sq, zs), na = hullNA(sq, zs);
      var nseg = Math.max(1, Math.round((sb - sa) / 0.36)), sl = (sb - sa) / nseg;
      for (j = 0; j < nseg; j++)
        for (i = -1; i <= 1; i += 2)
          box(THREE, A, "dark", sl * 0.7, 0.06, 0.16, X(sa + sl * (j + 0.5)), i * (ys + 0.005), zs, i * na);
    }

    /* ---- flank-array fairing, both sides: 26.1-68.35 m, z -4.42 to -5.23 (d39), 6 cm proud ---- */
    function patch(mat, side, u0, u1, z0, z1, off, nu, nz) {
      var pp = [], ix = [], a, b, uu2, zz;
      for (a = 0; a <= nu; a++) for (b = 0; b <= nz; b++) {
        uu2 = u0 + (u1 - u0) * a / nu; zz = z0 + (z1 - z0) * b / nz;
        var e2 = Math.min(1, Math.min(uu2 - u0, u1 - uu2) / 0.4);
        pp.push(X(uu2), side * (hullY(uu2, zz) + off * e2), zz);
      }
      for (a = 0; a < nu; a++) for (b = 0; b < nz; b++) {
        var p0 = a * (nz + 1) + b, p1 = p0 + nz + 1;
        if (side > 0) ix.push(p0, p1, p0 + 1, p0 + 1, p1, p1 + 1); else ix.push(p0, p0 + 1, p1, p0 + 1, p1 + 1, p1);
      }
      var pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.Float32BufferAttribute(pp, 3));
      pg.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pp.length / 3 * 2).fill(0), 2));
      pg.setIndex(ix); pg.computeVertexNormals();
      A.add(mat, pg, 0, 0, 0);
    }
    for (i = -1; i <= 1; i += 2) patch("anti", i, 26.1, 68.35, -5.23, -4.42, 0.06, 24, 3);

    /* ---- torpedo-tube shutters, three a side high on the bow (d39 ovals) ---- */
    var PORTS = [[75.65, 0.42, 0.55, 0.38], [75.75, -0.51, 0.55, 0.38], [76.75, -0.51, 0.42, 0.36]];
    for (k = 0; k < PORTS.length; k++) {
      var pu = PORTS[k][0], pz = PORTS[k][1], py = hullY(pu, pz), pn = hullNA(pu, pz);
      for (i = -1; i <= 1; i += 2)
        A.add("dark", new THREE.SphereGeometry(1.0, 10, 6), X(pu), i * (py - 0.03), pz, i * pn, 0, -i * 0.5, [PORTS[k][2], 0.10, PORTS[k][3]]);
    }

    /* ---- sail: d39 outline row by row, plan width 2.6 m (est.), widening 0.35 m in the root fillet ---- */
    var frs = [];
    for (i = 0; i < SAIL.length; i++) {
      var zl = SAIL[i][0], fw = SHW + 0.35 * clamp((3.4 - zl) / 1.0, 0, 1);
      var e2 = Math.max(0, zl - 7.7) / 0.32;
      frs.push({ z: zl, pts: finPlan(X(SAIL[i][1]), X(SAIL[i][2]), fw - e2 * 0.12, 0.7) });
    }
    A.add("tile", shell(THREE, frs), 0, 0, 0);
    for (i = -1; i <= 1; i += 2) {
      var sy = i * (SHW + 0.01);
      /* vent grille aft high: 48.1-49.15 m, z 6.8-7.33 (d39 dot block; p_mul louvres) */
      for (k = 0; k < 6; k++) box(THREE, A, "dark", 0.09, 0.04, 0.50, X(48.2 + k * 0.18), sy, 7.06);
      /* two long strakes along the top (d39 y 205, 213) and the low strake (y 290) */
      box(THREE, A, "dark", 9.2, 0.04, 0.06, X(53.3), sy, 7.62);
      box(THREE, A, "dark", 7.0, 0.04, 0.06, X(53.3), sy, 7.29);
      box(THREE, A, "dark", 11.2, 0.04, 0.06, X(53.3), i * (SHW + 0.012), 4.17);
      /* side door (53.6-54.66 m, z 3.04-4.82) and the small windows forward (d39) */
      box(THREE, A, "dark", 1.0, 0.04, 1.7, X(54.13), sy, 3.95);
      box(THREE, A, "dark", 0.30, 0.04, 0.22, X(57.65), sy, 6.88);
      box(THREE, A, "dark", 0.30, 0.04, 0.22, X(58.15), sy, 6.88);
      box(THREE, A, "dark", 0.40, 0.04, 0.18, X(58.55), i * (SHW - 0.08), 7.35);
    }

    /* ---- fairwater planes low on the fore end (d39 root 56.0-58.75 m at z 5.05; span est.) ---- */
    for (i = -1; i <= 1; i += 2) {
      A.add("tile", new THREE.SphereGeometry(1.0, 12, 6), X(57.35), i * SHW, 5.05, 0, 0, 0, [1.40, 0.18, 0.42]);
      var fp = [[X(56.0), i * SHW], [X(58.75), i * SHW], [X(58.15), i * (SHW + 2.0)], [X(56.75), i * (SHW + 2.0)]];
      if (i < 0) fp.reverse();
      var fpg = ext(THREE, fp, 0.26); fpg.translate(0, 0, 4.92);
      A.add("tile", fpg, 0, 0, 0);
      box(THREE, A, "dark", 0.04, 1.8, 0.27, X(56.5), i * (SHW + 1.0), 5.05);    /* hinge line */
    }

    /* ---- masts and snorkel as d39 raises them ---- */
    /* snorkel: stem 50.45-50.97 m, tapered neck, bucket head 1.1 m across, z 9.40-10.29 */
    cylZ(THREE, A, "mastlt", 0.27, 0.27, 0.9, 12, X(50.71), 0, STOP + 0.40);
    cylZ(THREE, A, "metal", 0.55, 0.28, 0.55, 14, X(50.71), 0, 9.12);
    cylZ(THREE, A, "metal", 0.55, 0.55, 0.89, 14, X(50.71), 0, 9.85);
    for (k = 0; k < MASTS.length; k++) {
      var m = MASTS[k], mx = X(m[0]);
      strut(THREE, A, "mastlt", m[2], [mx, 0, STOP - 0.05], [mx, 0, m[3]], 10);
      if (m[4] === "head") {
        strut(THREE, A, "metal", m[2] * 0.85, [mx, 0, m[3]], [mx, 0, m[1] - 0.5], 10);
        cylZ(THREE, A, "metal", 0.15, 0.15, 0.45, 10, mx, 0, m[1] - 0.28);
        strut(THREE, A, "metal", 0.04, [mx, 0, m[1] - 0.05], [mx, 0, m[1] + 0.12], 6, 0.02);
      } else if (m[4] === "hook") {
        A.add("metal", new THREE.SphereGeometry(0.2, 10, 6), mx, 0, m[1] - 0.15);
        strut(THREE, A, "metal", 0.06, [mx, 0, m[1] - 0.1], [mx - 0.22, 0, m[1] + 0.12], 6);
      } else if (m[4] === "whip") {
        strut(THREE, A, "mastlt", 0.035, [mx, 0, m[1]], [mx, 0, 15.8], 6, 0.015);
      }
    }
    A.add("metal", new THREE.SphereGeometry(0.2, 10, 5, 0, 2 * PI, 0, PI / 2), X(56.4), 0, STOP, PI / 2, 0, 0);

    /* ---- cruciform stern (d39): upper and lower rudders, their fillets onto the cone ---- */
    var UR = [[3.36, ZAX], [3.36, 2.95], [3.50, 3.08], [7.10, 3.08], [7.29, 2.90], [7.82, 0.93], [10.45, 0.55], [10.45, ZAX]];
    var LR = [[3.36, ZAX], [10.45, ZAX], [10.45, -4.90], [7.82, -5.11], [7.29, -7.00], [7.10, -7.21], [3.50, -7.21], [3.36, -7.08]];
    var rT = 0.45;
    [UR, LR].forEach(function (R) {
      var rg = ext(THREE, R.map(function (p) { return [X(p[0]), p[1]]; }), rT, true); rg.translate(0, rT / 2, 0);
      A.add("tile", rg, 0, 0, 0);
    });
    for (i = -1; i <= 1; i += 2) {
      var ry = i * (rT / 2 + 0.01);
      /* movable rudder outlines: 3.36-5.92 m, z -0.41..2.47 and -6.6..-3.85 (d39 boxes) */
      box(THREE, A, "dark", 0.05, 0.03, 2.88, X(5.92), ry, 1.03);
      box(THREE, A, "dark", 2.56, 0.03, 0.05, X(4.64), ry, 2.47);
      box(THREE, A, "dark", 2.56, 0.03, 0.05, X(4.64), ry, -0.41);
      box(THREE, A, "dark", 0.05, 0.03, 2.75, X(5.92), ry, -5.23);
      box(THREE, A, "dark", 2.56, 0.03, 0.05, X(4.64), ry, -3.85);
      box(THREE, A, "dark", 2.56, 0.03, 0.05, X(4.64), ry, -6.60);
    }
    /* stern planes on the axis: root fairing lens 3.36-8.1 m (d39), planes out to 5.0 m (est.) */
    for (i = -1; i <= 1; i += 2) {
      A.add("tile", new THREE.SphereGeometry(1.0, 14, 8), X(5.9), i * 0.45, ZAX, 0, 0, 0, [2.5, 0.55, 0.33]);
      var sp = [[X(3.36), 0], [X(8.1), 0], [X(7.29), i * 5.0], [X(3.5), i * 5.0]];
      if (i < 0) sp.reverse();
      var spg = ext(THREE, sp, rT); spg.translate(0, 0, ZAX - rT / 2);
      A.add("tile", spg, 0, 0, 0);
      box(THREE, A, "dark", 0.05, 4.0, rT + 0.02, X(5.92), i * 2.9, ZAX);           /* hinge line */
    }

    /* ---- one seven-blade skewed screw, 2.7 m across (d39), hub 1.46 m to the tip cap ---- */
    var nbl = 7, pr = 1.36;
    cylX(THREE, A, "screw", 0.37, 0.20, 1.20, 16, X(0.86), 0, ZAX);
    A.add("screw", new THREE.SphereGeometry(0.2, 10, 6), X(0.26), 0, ZAX);
    var bl = [[-0.10, 0.20], [-0.26, 0.45], [-0.36, 0.72], [-0.26, 0.93], [0.02, 1.0], [0.22, 0.86], [0.24, 0.58], [0.10, 0.22]];
    for (i = 0; i < nbl; i++) {
      var gb = ext(THREE, bl.map(function (p) { return [p[0] * pr, p[1] * pr]; }), 0.05);
      gb.translate(0, 0, -0.025);
      gb.rotateY(0.9);
      A.add("screw", gb, X(0.93), 0, ZAX, i * 2 * PI / nbl + 0.3, 0, 0);
    }

    /* ---- modest team strips: two flat panels on the casing deck, 2 cm up ---- */
    box(THREE, A, "team", 2.4, 0.8, 0.04, X(66.0), 0, ctop(66.0) + 0.02);
    box(THREE, A, "team", 2.4, 0.8, 0.04, X(24.0), 0, ctop(24.0) + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the boat's true length: render3d scales a submarine by it. */
UNIT_MODELS["pla_e00_sub"] = { len: 77.6, build: function (THREE, M, C) { return HeroYuan.build(THREE, M, C); } };
