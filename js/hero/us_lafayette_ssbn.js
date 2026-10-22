/* ============ us_lafayette_ssbn.js -- HERO model: SSBN-616 Lafayette class, 1960s Polaris fit (nato_e60_ssbn) ============
   The row is "SSBN-616 Lafayette class", service 1963, era e60-e80, armed with slbm_polaris (named "Polaris A3" by
   rules.js). So this is the boat as built and as photographed in 1963-64: sixteen Polaris tubes, black overall. The
   later Poseidon conversion changed the tubes inside the hull, not the outside, so the silhouette is the same; what
   is drawn is the 1960s finish and masts.

   References (Wikimedia Commons, fetched small into scratchpad/q_lafayette_ref):
     - "Plan of SSBN 616.png" (d1, inboard profile, 1280 px wide). THE source for lengths. Its 100 px pressure hull in
       the missile section is the published 33 ft beam, which gives 9.9 px/m, and its 1280 px are 129 m: the published
       425 ft (129.5 m), so the drawing is to scale both ways. Read off it: the hull of revolution (bottom line), the
       sail 32.5-45.3 m abaft the stem with its top 12.45 m over the hull axis, the eight tube pairs at a 2.62 m pitch
       from 48.3 to 66.7 m, the raised casing over the missile section, the cruciform tail with the upper rudder 8.9 m
       over the axis (trailing edge 125.1 m, leading edge 119.6 m at the root, 121.1 m at the tip), the single screw
       of 2.73 m radius abaft the control surfaces, four masts (two aft, two forward) partly raised.
     - "USS Andrew Jackson (SSBN-619) underway.jpg" (p1, 4 June 1963, broadside): flat-topped sail with the planes,
       long low hull, the raised deck abaft the sail, the upper rudder standing clear at the stern.
     - "USS John Adams (SSBN-620).jpg" (p2, April 1964, broadside, colour): black overall; the deck abaft the sail is
       1.2-1.3 m higher than the casing forward of it (photographs show this step; the drawing does not); sail chord
       about 13.5 m; upper rudder top 4.9 m over the water.
     - "Woodrow Wilson sub.jpg" (p3, 3 January 1964, bow-on from above): narrow sail about 3.1 m wide, planes high on
       the sail spanning about the 10 m beam, round bow, black.
     - "USS Lafayette (SSBN-616) at Port Canaveral.jpg" (p4, c.1974, starboard quarter from above): the raised missile
       deck ends in a short rounded step, a lower casing runs on aft, the swept upper rudder, flat sail top.
     - "USS Woodrow Wilson (SSBN-624) - NARA - 100311043.jpg" (p5, 1977, colour): hatch lids right abaft the sail, the
       turtleback's flat top and steep plated sides, sail planes at 64 per cent of the sail height, semi-gloss black.
     - "USS Woodrow Wilson (SSBN-624) - NARA - 100311045.jpg" (p6, 1977, from astern above): the flat-topped missile
       deck about two thirds of the beam wide with a centre seam, narrower than the hull aft of its step.
   Dimensions: 129.5 m (425 ft) overall, 10.06 m (33 ft) beam, 8.69 m (28 ft 6 in) draught -- Wikipedia infobox,
   citing FAS and Friedman, "U.S. Submarines Since 1945". One shaft (same source).

   RECOGNITION (each with its reference, and where it shows in the model):
     1. Long, slim cigar hull, 12.9:1, a fine ogive bow and a long run aft (d1 bottom line) -- STA table, hull loft.
     2. The raised flat MISSILE DECK abaft the sail, 6.4 m wide, 1.1 m above the forward casing (p2, p4, p6) --
        casing loft, profile().
     3. SIXTEEN hatches in two rows of eight on it, the first right behind the sail (d1 tubes, p5, p6) -- hatches.
     4. The short rounded step at the deck's after end and the lower casing beyond it (p4) -- profile() aft ramp.
     5. A tall, narrow, flat-topped SAIL set well forward, 25 per cent of the length from the stem (d1, p1, p2) --
        sail shell.
     6. SAIL PLANES high on the sail, about 10 m tip to tip (p3, p5) -- planes.
     7. MASTS: two pairs, partly raised, two with whips (d1) -- masts.
     8. CRUCIFORM STERN, the upper rudder swept on its leading edge with a vertical trailing edge (d1, p4) -- stern.
     9. ONE SCREW abaft the control surfaces (d1; one shaft, infobox) -- screw.
    10. PERIOD FINISH: black overall, painted steel with a sheen, no anechoic tiles (p2, p3, p5) -- materials.

   Not confirmed, so drawn plainly or not at all: no hull number, name, flag or draft marks; no rails or jackstaff (a
   small fitting at the stem shows in p2 and p4 but I could not identify it, so it is left out); no limber holes
   (none I could see in these photographs); the underwater colour is not shown by them, so the hull is black all
   round; the lower rudder is clipped by the drawing's frame, so it is drawn to 6.2 m under the axis, smaller than
   the upper; the stern-plane span is not in any reference (drawn 7 m each side of the axis); the screw's blade count
   is not shown (four drawn); the mast types are not named (generic tubes as the drawing draws them). The row is
   not turret:true, so nothing is named "turret"; the hatch lids are static flat panels, as ru_yankee.js draws its
   hatches, because render3d.js animates no hatch.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0. The hull axis sits at z = -3.66 so the keel draws the
   published 8.69 m; only the casing, the sail and the top of the rudder stand above z = 0. render3d draws a submarine
   at -1.2 and scales it by UNIT_MODELS[key].len, set below to the measured X extent. Merged per material: 7 meshes.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLafayette616 = (function () {
  "use strict";

  var PI = Math.PI;
  var HL = 129.5, XB = 64.75;          /* stem at +64.75, screw tip at -64.65                       */
  var R = 5.03, ZA = -3.66;             /* 33 ft hull; keel at -8.69 = the 28 ft 6 in draught         */
  var Z_MD = 2.92;                      /* missile deck top: 6.58 m over the axis (d1)                */
  var Z_ST = 8.79;                      /* sail top: 12.45 m over the axis (d1)                       */

  /* Station table [s metres abaft the stem, radius], the hull of revolution read off d1's bottom line at
     9.884 px/m and normalised to the 5.03 m radius. Fine ogive bow, parallel body 31-89 m, long run aft. */
  var STA = [
    [0.0, 0.12], [0.5, 0.62], [1.0, 0.95], [2.0, 1.50], [3.0, 1.95], [4.0, 2.30], [6.0, 2.82],
    [8.0, 3.18], [10.0, 3.48], [12.0, 3.74], [14.0, 3.96], [16.0, 4.16], [18.0, 4.34], [20.0, 4.50],
    [22.0, 4.64], [24.0, 4.78], [26.0, 4.90], [28.5, 4.99], [31.0, 5.03], [89.0, 5.03], [92.0, 5.00],
    [95.0, 4.95], [97.2, 4.89], [99.2, 4.80], [101.2, 4.65], [103.2, 4.45], [105.2, 4.22], [107.2, 3.98],
    [109.2, 3.72], [111.3, 3.47], [113.3, 3.22], [115.3, 2.92], [117.3, 2.60], [119.3, 2.26], [121.4, 1.90],
    [123.4, 1.48], [125.2, 1.04], [126.4, 0.78]
  ];
  var S_END = 126.4;

  function hullR(x) {
    var s = XB - x, i;
    if (s <= 0) return STA[0][1];
    if (s >= S_END) return STA[STA.length - 1][1];
    for (i = 1; i < STA.length; i++) {
      if (s <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (s - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return STA[STA.length - 1][1];
  }
  /* d1's tail cone sits 0.3 m low: the screw centre is 5 px under the midbody axis */
  function zcAt(x) {
    var s = XB - x;
    if (s <= 100) return ZA;
    return ZA - 0.30 * Math.min(1, (s - 100) / (S_END - 100));
  }
  function crown(x) { return zcAt(x) + hullR(x); }
  function hullZ(x, y) {
    var r = hullR(x), v = r * r - y * y;
    return zcAt(x) + Math.sqrt(Math.max(v, 0));
  }

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function smooth(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

  /* ------------------------------------------------ casing profile along the boat
     Forward casing: 0.45 m over the crown and 3 m wide at the sail, a fuller rounded top toward the bow.
     Forward ramp beside the sail (31.5 -> 27.0): up to the missile deck.
     Missile deck (27.0 -> s 82.5 m): flat top at 2.92, 6.4 m wide, steep plated sides down to the waterline.
     Aft step (s 82.5 -> 87.5 m): the short rounded drop p4 shows, where d1's top line drops and p1/p2 put it.
     Aft casing (s 87.5 -> 106 m): low and narrow again, fading into the run aft. */
  var XF0 = XB - 1.2, XF1 = 31.5, XM0 = 27.0, XM1 = XB - 82.5, XA0 = XB - 87.5, XA1 = XB - 106.0;
  /* rise of the forward casing over the round hull: the drawing's fuller bow top (0.8-0.9 m over the
     bottom line's circle forward of 12 m), held to the photographs' 0.45 m at the sail */
  var FRISE = [[1.2, -0.05], [2.5, 0.55], [4.0, 0.85], [8.0, 0.78], [12.0, 0.72], [16.0, 0.62],
               [20.0, 0.55], [26.0, 0.47], [33.25, 0.45]];
  function tab(T, s) {
    var i;
    if (s <= T[0][0]) return T[0][1];
    for (i = 1; i < T.length; i++) {
      if (s <= T[i][0]) return T[i - 1][1] + (T[i][1] - T[i - 1][1]) * (s - T[i - 1][0]) / (T[i][0] - T[i - 1][0]);
    }
    return T[T.length - 1][1];
  }
  function fwdCasing(x) {
    var s = XB - x, r = hullR(x), b = smooth((s - 12.0) / 14.0);
    var hw = 0.72 * r + (1.50 - 0.72 * r) * b;
    return { zt: crown(x) + tab(FRISE, s), hw: hw, rc: 0.5 * hw + (0.40 - 0.5 * hw) * b };
  }
  function aftCasing(x) {
    var t = (x - XA1) / (XA0 - XA1);
    return { zt: crown(x) - 0.10 + 0.42 * smooth(t / 0.30), hw: 0.40 + 1.00 * smooth(t), rc: 0.40 };
  }
  var MD = { zt: Z_MD, hw: 3.20, rc: 0.60 };
  function mix(a, b, e) {
    return { zt: a.zt + (b.zt - a.zt) * e, hw: a.hw + (b.hw - a.hw) * e, rc: a.rc + (b.rc - a.rc) * e };
  }
  function profile(x) {
    if (x >= XF1) return fwdCasing(x);
    if (x > XM0) return mix(fwdCasing(XF1), MD, smooth((XF1 - x) / (XF1 - XM0)));
    if (x >= XM1) return MD;
    if (x > XA0) {
      /* the step: the deck holds its height, then rolls over and drops -- an eased curve, not a ramp */
      var u = (XM1 - x) / (XM1 - XA0), m = mix(MD, aftCasing(XA0), Math.pow(smooth(u), 0.85));
      /* p6: the deck keeps its full width to a square-cut after edge, so the width goes late */
      m.hw = MD.hw + (aftCasing(XA0).hw - MD.hw) * Math.pow(smooth(u), 2.2);
      return m;
    }
    return aftCasing(x);
  }
  /* one arch across the casing, starboard (buried) -> over the top -> port (buried) */
  function arch(x) {
    var p = profile(x), r = hullR(x);
    var hw = Math.min(p.hw, 0.80 * r), rc = Math.min(p.rc, hw * 0.5);
    var yb = Math.min(hw + 0.45, 0.93 * r);
    var zb = hullZ(x, yb) - 0.30;
    var cz = p.zt - rc, pts = [], k, f, a;
    var side = function (sg) {
      var out = [];
      for (k = 1; k <= 3; k++) {
        f = k / 4;
        out.push([sg * (yb + (hw - yb) * f + 0.10 * Math.sin(PI * f)), zb + (cz - zb) * f]);
      }
      return out;
    };
    pts.push([-yb, zb]);
    pts = pts.concat(side(-1));
    for (k = 0; k < 4; k++) { a = PI - k * PI / 8; pts.push([-(hw - rc) + rc * Math.cos(a), cz + rc * Math.sin(a)]); }
    for (k = 0; k <= 6; k++) pts.push([-(hw - rc) + 2 * (hw - rc) * k / 6, p.zt]);
    for (k = 3; k >= 0; k--) { a = k * PI / 8; pts.push([(hw - rc) + rc * Math.cos(a), cz + rc * Math.sin(a)]); }
    pts = pts.concat(side(1).reverse());
    pts.push([yb, zb]);
    return pts;
  }

  /* ------------------------------------------------------------- textures */
  var TEX = {};
  /* hull skin: u = tail..stem along the loft, v = round the girth (0 port side, 0.25 crown) */
  function hullTex(THREE, x0, x1) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(6161), i, x, r, zc, wl, ya, yb;
    g.fillStyle = "#1f2224"; g.fillRect(0, 0, W, H);                       /* under water: black too    */
    for (i = 0; i < W; i++) {
      x = x0 + (i + 0.5) / W * (x1 - x0);
      r = hullR(x); zc = zcAt(x);
      if (r <= -zc) continue;
      wl = Math.asin(-zc / r) / (PI * 2);
      ya = wl * H; yb = (0.5 - wl) * H;
      g.fillStyle = "#2a2d30"; g.fillRect(i, ya, 1, yb - ya);              /* above water: painted black */
      g.fillStyle = "rgba(120,118,110,0.10)";                              /* faint salt line at the water */
      g.fillRect(i, ya, 1, 3); g.fillRect(i, yb - 3, 1, 3);
    }
    for (i = 0; i < 900; i++) {                                            /* paint tone, touch-ups      */
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.06)";
      g.fillRect(R1() * W, R1() * H, 6 + R1() * 30, 2 + R1() * 6);
    }
    /* plate seams: frames every 3.2 m and strakes along the girth, faint as on p5 */
    var px = W / (x1 - x0);
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;
    for (x = 0; x < W; x += 3.2 * px) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    var strakes = [0.07, 0.15, 0.20, 0.30, 0.35, 0.43, 0.60, 0.68, 0.82, 0.90];
    for (i = 0; i < strakes.length; i++) {
      g.beginPath(); g.moveTo(0, strakes[i] * H); g.lineTo(W, strakes[i] * H); g.stroke();
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX.hull = t;
    return t;
  }
  /* casing: u = XA1..XF0 along the boat, v = 0..1 across the arch (0.5 = centreline) */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(6162), i, x;
    var U = function (xm) { return (xm - XA1) / (XF0 - XA1) * W; };
    g.fillStyle = "#2b2e31"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 9000; i++) {                                           /* non-skid grit on the walking deck */
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.09)";
      g.fillRect(R1() * W, H * (0.25 + R1() * 0.5), 1.5, 1.5);
    }
    for (i = 0; i < 260; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.05)";
      g.fillRect(R1() * W, R1() * H, 10 + R1() * 40, 3 + R1() * 10);
    }
    /* the turtleback's side plating: vertical butts every 2.62 m on the missile section (p5), wider elsewhere */
    g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1.2;
    for (x = XA1; x < XF0; x += (x > XM1 - 1 && x < XM0 + 1) ? 2.62 : 4.0) {
      g.beginPath(); g.moveTo(U(x), 0); g.lineTo(U(x), H * 0.22); g.stroke();
      g.beginPath(); g.moveTo(U(x), H * 0.78); g.lineTo(U(x), H); g.stroke();
    }
    /* a strake seam along each side and the deck-edge seam */
    var vs = [0.10, 0.21, 0.79, 0.90];
    for (i = 0; i < vs.length; i++) { g.beginPath(); g.moveTo(0, vs[i] * H); g.lineTo(W, vs[i] * H); g.stroke(); }
    /* the centre seam down the missile deck, plain on p6 */
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 1.6;
    g.beginPath(); g.moveTo(U(XM1 - 3), H * 0.5); g.lineTo(U(XM0 + 2), H * 0.5); g.stroke();
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX.deck = t;
    return t;
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        m.compose(p.set(x || 0, y || 0, z || 0), q, s.set(1, 1, 1));
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

  /* lofted body with the winding flipped so FrontSide faces outward (sections in increasing x) */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }

  /* the casing: rings of arch() in increasing x, outward winding, UVs normalised for deckTex */
  function casing(THREE) {
    var xs = [], x, i, j;
    var spans = [[XA1, XA0, 3.0], [XA0, XM1, 0.6], [XM1, XM0, 3.0], [XM0, XF1, 0.6], [XF1, XF0, 2.5]];
    for (i = 0; i < spans.length; i++) {
      var n = Math.max(1, Math.round((spans[i][1] - spans[i][0]) / spans[i][2]));
      for (j = 0; j < n; j++) xs.push(spans[i][0] + (spans[i][1] - spans[i][0]) * j / n);
    }
    xs.push(XF0);
    var pos = [], uv = [], idx = [], N = 0;
    for (i = 0; i < xs.length; i++) {
      var pts = arch(xs[i]), L = 0, run = [0];
      N = pts.length;
      for (j = 1; j < N; j++) {
        L += Math.sqrt(Math.pow(pts[j][0] - pts[j - 1][0], 2) + Math.pow(pts[j][1] - pts[j - 1][1], 2));
        run.push(L);
      }
      for (j = 0; j < N; j++) {
        pos.push(xs[i], pts[j][0], pts[j][1]);
        uv.push((xs[i] - XA1) / (XF0 - XA1), run[j] / L);
      }
    }
    for (i = 0; i < xs.length - 1; i++) {
      for (j = 0; j < N - 1; j++) {
        var a = i * N + j, b = a + N, c = a + 1, d = b + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* stacked-ring shell (sail): outlines counter-clockwise from above, metre UVs, capped both ends */
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
    function cap(level, up) {
      var base = pos.length / 3, cx = 0, cy = 0, k;
      for (k = 0; k < N; k++) { cx += rings[level].pts[k][0]; cy += rings[level].pts[k][1]; }
      cx /= N; cy /= N;
      pos.push(cx, cy, rings[level].z); uv.push(cx, cy);
      for (k = 0; k < N; k++) { p = rings[level].pts[k]; pos.push(p[0], p[1], rings[level].z); uv.push(p[0], p[1]); }
      for (k = 0; k < N; k++) {
        var m = base + 1 + k, n = base + 1 + ((k + 1) % N);
        if (up) idx.push(base, m, n); else idx.push(base, n, m);
      }
    }
    cap(L - 1, true);
    cap(0, false);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* sail plan: full round nose of radius hw, parallel walls, a tighter rounded tail; CCW from above */
  function sailPlan(xf, xa, hw, ta) {
    var pts = [], k, a, ra = hw * ta, nN = 12, nT = 8, nW = 4;
    var cxN = xf - hw, cxT = xa + ra;
    for (k = 0; k < nN; k++) { a = -PI / 2 + PI * k / nN; pts.push([cxN + hw * Math.cos(a), hw * Math.sin(a)]); }
    for (k = 0; k < nW; k++) { var f = k / nW; pts.push([cxN + (cxT - cxN) * f, hw + (ra - hw) * f * f]); }
    for (k = 0; k < nT; k++) { a = PI / 2 + PI * k / nT; pts.push([cxT + ra * Math.cos(a), ra * Math.sin(a)]); }
    for (k = 0; k < nW; k++) { var h = k / nW; pts.push([cxT + (cxN - cxT) * h, -(hw + (ra - hw) * (1 - h) * (1 - h))]); }
    return pts;
  }
  /* flat extrusion of an outline, z 0..depth; xz turns it upright with the thickness toward -y */
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
  function rrShape(THREE, hx, hy, r) {
    var s = new THREE.Shape();
    s.moveTo(-hx + r, -hy); s.lineTo(hx - r, -hy); s.quadraticCurveTo(hx, -hy, hx, -hy + r);
    s.lineTo(hx, hy - r); s.quadraticCurveTo(hx, hy, hx - r, hy);
    s.lineTo(-hx + r, hy); s.quadraticCurveTo(-hx, hy, -hx, hy - r);
    s.lineTo(-hx, -hy + r); s.quadraticCurveTo(-hx, -hy, -hx + r, -hy);
    return s;
  }
  function strut(THREE, A, mat, r1, r2, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r2, r1, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }

  function materials(THREE, C, x0, x1) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    /* Painted steel, not rubber: p5 shows the sky in the deck, so a lower roughness than the tiled boats. */
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, x0, x1), roughness: 0.72, metalness: 0.10 }),
      deck:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.80, metalness: 0.08 }),
      sail:  std(0x25282b, 0.70, 0.10),     /* sail, planes, rudders: the same black                     */
      dark:  std(0x0c0e0f, 0.80, 0.20),     /* hatch seams, bridge well, mast windows                    */
      metal: std(0x34393d, 0.55, 0.45),     /* masts and periscopes                                      */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze                                                    */
      team:  std(team, 0.86, 0.06)
    };
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var i, k, x, sg;

    /* ---------------- hull of revolution, tail to stem ---------------- */
    var secs = [];
    for (i = STA.length - 1; i >= 0; i--) {
      x = XB - STA[i][0];
      secs.push({ x: x, w: STA[i][1], h: STA[i][1], zc: zcAt(x), sq: 1.0 });
    }
    var T = materials(THREE, C || {}, secs[0].x, secs[secs.length - 1].x);
    var A = Acc(THREE);
    A.add("skin", body(THREE, M, secs, 56), 0, 0, 0);
    A.add("sail", new THREE.SphereGeometry(0.16, 8, 6), XB - 0.05, 0, ZA);         /* seal the stem point */

    /* ---------------- casing: forward casing, missile deck, step, aft casing ---------------- */
    A.add("deck", casing(THREE), 0, 0, 0);

    /* ---------------- sixteen missile hatches, two rows of eight (d1 tube pitch) ----------------
       A dark seam plate under each lid so the outline reads, lids flush and flat: static, as ru_yankee.js. */
    for (k = 0; k < 8; k++) {
      x = XB - (48.31 + 2.62 * k);
      for (sg = -1; sg <= 1; sg += 2) {
        A.add("dark", new THREE.ShapeGeometry(rrShape(THREE, 1.21, 1.24, 0.52), 3), x, sg * 1.45, Z_MD + 0.04);
        var lid = new THREE.ExtrudeGeometry(rrShape(THREE, 1.00, 1.03, 0.40), { depth: 0.08, bevelEnabled: false, curveSegments: 3 });
        A.add("sail", lid, x, sg * 1.45, Z_MD + 0.04);
        A.add("dark", new THREE.BoxGeometry(0.34, 0.20, 0.06), x, sg * 2.49, Z_MD + 0.10);      /* outboard hinge */
      }
    }

    /* ---------------- the sail: flat top, near-vertical leading edge, trailing edge raked 1.2 m ---------------- */
    var lv = [
      [0.80, 32.85, 18.30, 1.78, 0.80],
      [2.10, 32.65, 18.85, 1.62, 0.74],
      [3.40, 32.57, 19.35, 1.56, 0.70],
      [5.20, 32.55, 19.80, 1.55, 0.70],
      [7.20, 32.50, 20.20, 1.53, 0.70],
      [8.40, 32.40, 20.45, 1.50, 0.70],
      [8.68, 32.18, 20.62, 1.40, 0.70],
      [Z_ST, 31.85, 20.85, 1.20, 0.72]
    ];
    var rings = [];
    for (i = 0; i < lv.length; i++) rings.push({ z: lv[i][0], pts: sailPlan(lv[i][1], lv[i][2], lv[i][3], lv[i][4]) });
    A.add("sail", shell(THREE, rings), 0, 0, 0);
    /* the open bridge well at the fore end of the sail top, where the 1964 photographs show men standing */
    A.add("dark", new THREE.ShapeGeometry(rrShape(THREE, 0.95, 0.72, 0.40), 3), 30.55, 0, Z_ST + 0.02);
    A.add("sail", new THREE.BoxGeometry(0.10, 1.30, 0.35), 31.42, 0, Z_ST + 0.17);               /* bridge screen lip */

    /* ---------------- sail planes: high on the sail, 10 m tip to tip (p3), 0.6 m abaft the sail's stem ---------------- */
    var plz = 6.40, pth = 0.32;
    var pl = [[31.95, 0.0], [31.85, 4.70], [31.55, 5.00], [29.20, 5.00], [28.95, 4.75], [28.35, 0.0],
              [28.95, -4.75], [29.20, -5.00], [31.55, -5.00], [31.85, -4.70]];
    A.add("sail", ext(THREE, pl, pth), 0, 0, plz - pth / 2);

    /* ---------------- masts: two pairs off d1, partly raised; whips on the taller of each pair ---------------- */
    var MST = [  /* x, y, radius, top z, whip top (0 = none), head */
      [21.25, -0.30, 0.15, 11.20, 0, "tube"],
      [22.10,  0.30, 0.24, 10.80, 14.00, "box"],
      [27.50, -0.30, 0.20,  9.80, 0, "scope"],
      [29.45,  0.30, 0.20, 11.10, 14.00, "scope"]
    ];
    for (i = 0; i < MST.length; i++) {
      var mx = MST[i][0], my = MST[i][1], mr = MST[i][2], mt = MST[i][3];
      strut(THREE, A, "metal", mr * 1.15, mr, [mx, my, Z_ST - 0.2], [mx, my, mt], 10);
      if (MST[i][5] === "box") {
        A.add("metal", new THREE.BoxGeometry(0.62, 0.42, 0.80), mx, my, mt - 0.25);
        A.add("dark", new THREE.BoxGeometry(0.64, 0.30, 0.16), mx, my, mt - 0.10);
      } else if (MST[i][5] === "scope") {
        strut(THREE, A, "metal", mr * 0.85, mr * 0.55, [mx, my, mt], [mx, my, mt + 0.75], 10);
        A.add("dark", new THREE.BoxGeometry(0.10, 0.16, 0.18), mx + mr * 0.55, my, mt + 0.45);   /* head window */
      } else {
        A.add("metal", new THREE.SphereGeometry(mr, 10, 6), mx, my, mt);
      }
      if (MST[i][4]) strut(THREE, A, "metal", 0.06, 0.035, [mx, my, mt], [mx, my, MST[i][4]], 6);
    }
    /* the low fairing the after pair rises from */
    A.add("sail", new THREE.BoxGeometry(2.0, 1.05, 0.30), 21.90, 0, Z_ST + 0.10);

    /* ---------------- cruciform tail ---------------- */
    var xte = XB - 125.1, xleT = XB - 121.1, xleR = XB - 119.0;
    var zc0 = zcAt(xleR), zc1 = zcAt(xte);
    var up = [[xleR, zc0], [xleT, zc1 + 8.60], [xleT - 0.35, zc1 + 8.90], [xte, zc1 + 8.90], [xte, zc1]];
    A.add("sail", ext(THREE, up, 0.46, true), 0, 0.23, 0);
    var lo = [[xleR, zc0], [xte, zc1], [xte, zc1 - 6.20], [xleT + 0.6, zc1 - 6.20], [xleT + 0.95, zc1 - 5.90]];
    A.add("sail", ext(THREE, lo, 0.46, true), 0, 0.23, 0);
    var sp = [[xleR, 0], [xleT + 0.30, 6.70], [xleT, 7.00], [xte, 7.00], [xte, -7.00], [xleT, -7.00], [xleT + 0.30, -6.70]];
    A.add("sail", ext(THREE, sp, 0.40), 0, 0, zc1 - 0.20);

    /* ---------------- the single screw, abaft the control surfaces ---------------- */
    var zs = zcAt(XB - S_END), xh0 = XB - S_END + 0.05;
    A.add("screw", new THREE.CylinderGeometry(0.80, 0.70, 1.0, 16), xh0 - 0.45, 0, zs, 0, 0, -PI / 2);
    A.add("screw", new THREE.CylinderGeometry(0.70, 0.22, 2.0, 16), xh0 - 1.95, 0, zs, 0, 0, -PI / 2);
    A.add("screw", new THREE.SphereGeometry(0.22, 10, 6), xh0 - 2.95, 0, zs);
    var bl = [[-0.30, 0.55], [-0.80, 1.20], [-0.95, 1.95], [-0.62, 2.55], [0.05, 2.73], [0.62, 2.20], [0.70, 1.30], [0.32, 0.55]];
    for (i = 0; i < 4; i++) {
      var bg = ext(THREE, bl, 0.09);
      bg.translate(0, 0, -0.045);
      bg.rotateY(PI / 2 - 0.62);                 /* blade face mostly in the disc, pitched */
      bg.rotateX(i * PI / 2 + PI / 4);
      A.add("screw", bg, xh0 - 1.25, 0, zs);
    }

    /* ---------------- modest team flashes on deck surfaces that face the camera ---------------- */
    x = 36.5;  A.add("team", new THREE.BoxGeometry(2.8, 1.0, 0.08), x, 0, profile(x).zt + 0.03);
    x = -30.0; A.add("team", new THREE.BoxGeometry(3.6, 1.0, 0.08), x, 0, profile(x).zt + 0.03);
    A.add("team", new THREE.BoxGeometry(1.6, 1.1, 0.05), 24.8, 0, Z_ST + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (129.63 m, stem to the screw boss): render3d scales a submarine by it. */
UNIT_MODELS["nato_e60_ssbn"] = {
  len: 129.63,
  build: function (THREE, M, C) { return HeroLafayette616.build(THREE, M, C); }
};
