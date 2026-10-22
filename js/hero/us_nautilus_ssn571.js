/* ============ us_nautilus_ssn571.js -- HERO model: USS Nautilus (SSN-571), 1950s fit ============
   The first nuclear-powered submarine (nato_e50_sub): commissioned 1954, under the
   North Pole August 1958. Drawn as the 1955-58 photographs show her, not as the
   museum boat at Groton.

   References (Wikimedia Commons, fetched small into scratchpad/q_nautilus_ref):
     - "USS Nautilus SSN-571 - 0857108.jpg" (p2b, USN 25 Aug 1958, New York, after
       the Pole): a near-true starboard broadside, the main source for the profile.
       Measured at 21.6 px/m: casing deck 3.0 m over the water, the knuckle where
       the casing side meets the ballast-tank hull 2.1 m under the deck, the sail
       leading edge 32 m abaft the stem, sail 6.5-7.0 m tall over the casing (drawn
       6.8; the EB model gives 6.3) with a vertical leading edge, a raked after edge and a low step at the after top
       corner; the tall mast, short tube and two whips on the sail; the domed deck
       fairing 17-21.5 m abaft the stem; the bow plane folded up against the casing;
       the anchor recess; the blunt bow.
     - "SS-571-Nautilus-trials.gif" (p1, Jan 1955) and "330-ps-8316" (p9, 1957), aerial
       3/4 views: the flat deck wider than the sail, rounded at the bow and tapering
       aft, the row of limber slots low on the casing side the whole length, the
       folded bow plane, the bridge cockpit and windows at the forward top of the
       sail, the lit ledge of the step at the after top corner.
     - "USS Nautilus (SSN-571) underway at sea in November 1955.jpg" (p3, colour): the
       finish -- black hull, casing and sail; sampled lit hull side #2a2520, sail
       #171210, hull taken to about 0.9 of the sample as the brief asks.
     - "Argonaute ... model of the US nuclear submarine Nautilus.jpg" (p7, Electric
       Boat model, 1954): the parts under water -- the bluff bow with the tube
       shutters, keel line, the tail rising to the stern, the upper and lower rudder,
       the twin screws with the stern planes ABAFT them (fleet-boat practice) and
       the horizontal shaft skegs. 19.1 px/m over 98.7 m.
     - "USS Nautilus at launch.jpg" (p4, Jan 1954): the round blunt stem seen from ahead.
     - "USS Natilus (SSN 571) Propellers.jpg" (p10, the 1954-1980 screws at Groton):
       two five-bladed screws with broad round blades and a conical boss.
     - "330-ps-8455" (p6, 1957, the after deck from the sail): flat casing deck.
     - "Technical drawing ... SSN-571 1955.jpg" (d1, USN cutaway): six round hatch
       trunks along the casing; the tall rudder at the very end of the tail.
   Dimensions (sub_specs.js row, as published): 98.7 m long, 8.43 m beam (27 ft 8 in),
   about 6.7 m draught surfaced.

   RECOGNITION (each one rests on the photographs above):
     1. GUPPY-style hull: round ballast-tank hull, a sharp knuckle 0.9 m over the
        water and a nearly upright casing side above it (p2b, p1).
     2. Flat-topped casing deck 4 m wide, rounded at the bow and tapering aft, ending
        13 m short of the tail (p7, p9, p6).
     3. Free-flooding casing: a row of limber slots low on its side, stem to stern
        (p1, p9, p7), the bow flood ports (p2b).
     4. The sail: tall slab set 32-45 m abaft the stem, 6.8 m over the deck, rounded vertical leading
        edge, raked after edge, step down at the after top corner (p2b, p1).
     5. The bridge cockpit and windows at the forward top of the sail (p1, p2b).
     6. The 1958 masts: one tall mast with a whip, a short tube, two thin whips (p2b).
     7. The bluff bow with six torpedo-tube shutters, three each side (p7, p4).
     8. The bow planes folded up against the casing, the anchor recess (p2b, p1).
     9. The domed deck fairing forward of the sail, as photographed in 1958 (p2b).
    10. The stern: tail rising to the end, upper and lower rudder, stern planes abaft
        TWO five-bladed bronze screws on horizontal skegs (p7, p10).
    11. The 1950s finish: black overall, a slightly lighter weathered deck (p3, p1).

   Not confirmed and so not drawn: hull numbers ("571" on sail and bow), draft
   marks, flags, staffs, guard lines; what the domed deck fairing housed; mast
   identities (drawn as photographed, not named); exact hatch positions (the six
   trunks follow the cutaway); the plan shape of the sail's after end (rounded is
   drawn); the shaft spacing (2.2 m each side of the centreline, as the model looks).
   The screw diameter (2.3 m) is estimated from the museum display. The upper rudder
   follows the EB model and the cutaway (top about level with the casing end); the
   1955-58 photographs show the stern only in spray or out of frame, so its height
   over the water is not confirmed (drawn 1.5 m).
   The row is not turret:true, so nothing here is named "turret".

   Model space +X bow, +Y port, +Z up, metres; waterline z = 0. The hull axis lies
   2.5 m under the water, so only the casing and the sail stand above z = 0.
   render3d draws subs at -1.2 and scales them by UNIT_MODELS[key].len, which is the
   measured X extent, 98.7 m (stem to stern-plane trailing edge).
   Merged per material, 7 draw calls. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNautilus571 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var LOA = 98.7, XB = 49.35;                 /* stem at x = +49.35, stern planes end at -49.35 */
  var Z0 = -7.0, Z1 = 3.4;                    /* side-projection texture span */
  function X(s) { return XB - s; }            /* s = metres abaft the stem */

  /* ----------------------------------------------------------- station table
     [s, zD deck top, wD deck half-width, zK knuckle, w hull half-beam, zM height of
      that beam, zKeel, e]  e = 1 where there is no casing (stem tip, tail).
     Bow and midbody off p2b and p7 (the bow is nearly upright: rounded top corner,
     upright stem, tight forefoot); tail off p7. */
  var KEY = [
    [0.00, 1.40, 0.00, 0.90, 0.00, -1.75, -5.60, 1],
    [0.25, 2.00, 0.55, 0.90, 1.10, -1.90, -6.10, 0],
    [0.60, 2.40, 0.88, 0.90, 1.70, -2.00, -6.40, 0],
    [1.10, 2.70, 1.15, 0.90, 2.20, -2.10, -6.58, 0],
    [1.80, 2.92, 1.40, 0.90, 2.70, -2.20, -6.66, 0],
    [2.80, 3.06, 1.60, 0.90, 3.15, -2.30, -6.70, 0],
    [4.20, 3.15, 1.78, 0.90, 3.55, -2.38, -6.70, 0],
    [6.00, 3.15, 1.90, 0.90, 3.85, -2.43, -6.70, 0],
    [8.50, 3.15, 1.97, 0.90, 4.07, -2.47, -6.70, 0],
    [11.5, 3.13, 2.00, 0.90, 4.17, -2.49, -6.70, 0],
    [15.0, 3.10, 2.00, 0.90, 4.215, -2.49, -6.70, 0],
    [40.0, 3.00, 2.00, 0.90, 4.215, -2.49, -6.70, 0],
    [62.0, 3.00, 2.00, 0.90, 4.215, -2.49, -6.70, 0],
    [70.0, 2.92, 1.90, 0.85, 4.08, -2.47, -6.67, 0],
    [75.4, 2.80, 1.72, 0.80, 3.88, -2.45, -6.45, 0],
    [80.0, 2.62, 1.52, 0.70, 3.55, -2.40, -6.05, 0],
    [83.2, 2.42, 1.45, 0.60, 3.30, -2.30, -5.70, 0],
    [85.0, 2.20, 1.30, 0.55, 3.10, -2.22, -5.42, 0],
    [86.0, 1.75, 1.00, 0.50, 2.98, -2.18, -5.28, 0],
    [86.8, 0.90, 0.00, 0.00, 2.90, -2.15, -5.20, 1],
    [89.5, 0.40, 0.00, 0.00, 2.30, -2.00, -4.40, 1],
    [92.1, -0.15, 0.00, 0.00, 1.62, -1.83, -3.51, 1],
    [94.5, -0.60, 0.00, 0.00, 1.08, -1.73, -2.86, 1],
    [95.8, -0.90, 0.00, 0.00, 0.72, -1.65, -2.40, 1],
    [96.6, -1.25, 0.00, 0.00, 0.32, -1.60, -1.92, 1]
  ];
  function keyAt(s) {
    var i, a, b, t, k, r = [];
    if (s <= KEY[0][0]) return KEY[0].slice();
    for (i = 1; i < KEY.length; i++) {
      if (s <= KEY[i][0]) {
        a = KEY[i - 1]; b = KEY[i]; t = (s - a[0]) / (b[0] - a[0]);
        for (k = 0; k < 8; k++) r.push(a[k] + (b[k] - a[k]) * t);
        r[7] = (a[7] && b[7]) ? 1 : 0;
        return r;
      }
    }
    return KEY[KEY.length - 1].slice();
  }

  var NA = 16, NB = 6;      /* segments: ballast-tank hull keel..knuckle; casing side + deck-edge round */
  /* port half-section from the keel up to the inner end of the deck-edge round.
     Returns {a: [[y,z]...NA+1], b: [[y,z]...NB+1], deckY, deckZ} */
  function section(p) {
    var zD = p[1], wD = p[2], zK = p[3], w = p[4], zM = p[5], hB = zM - p[6], e = p[7];
    var a = [], b = [], i, t, tK, hT;
    if (e) {
      tK = 60 * D2R; hT = zD - zM;
      for (i = 0; i <= NA; i++) {
        t = -PI / 2 + (tK + PI / 2) * i / NA;
        a.push([w * Math.cos(t), zM + (t < 0 ? hB : hT) * Math.sin(t)]);
      }
      for (i = 0; i <= NB; i++) {
        t = tK + (PI / 2 - tK) * i / NB;
        b.push([w * Math.cos(t), zM + hT * Math.sin(t)]);
      }
      b[NB][0] = 0;
      return { a: a, b: b, deckY: 0, deckZ: b[NB][1] };
    }
    var rc = Math.min(0.35, wD * 0.4);
    var wK = Math.min(w * 0.985, wD + 0.45);
    tK = Math.acos(wK / w);
    hT = (zK - zM) / Math.sin(tK);
    for (i = 0; i <= NA; i++) {
      t = -PI / 2 + (tK + PI / 2) * i / NA;
      a.push([w * Math.cos(t), zM + (t < 0 ? hB : hT) * Math.sin(t)]);
    }
    /* casing side: knuckle straight up to the deck-edge round (3 segments), then the round (3) */
    var y3 = wD, z3 = zD - rc;
    for (i = 0; i <= 3; i++) b.push([wK + (y3 - wK) * i / 3, zK + (z3 - zK) * i / 3]);
    for (i = 1; i <= 3; i++) {
      t = (PI / 2) * i / 3;
      b.push([wD - rc + rc * Math.cos(t), zD - rc + rc * Math.sin(t)]);
    }
    return { a: a, b: b, deckY: wD - rc, deckZ: zD };
  }
  /* half-width of the outside at height z, station s (for fittings on the side) */
  function surfY(s, z) {
    var q = section(keyAt(s)), pts = q.a.concat(q.b.slice(1)), i, p0, p1, t;
    for (i = 0; i < pts.length - 1; i++) {
      p0 = pts[i]; p1 = pts[i + 1];
      if ((z >= p0[1] && z <= p1[1]) || (z <= p0[1] && z >= p1[1])) {
        t = (p1[1] === p0[1]) ? 0 : (z - p0[1]) / (p1[1] - p0[1]);
        return p0[0] + (p1[0] - p0[0]) * t;
      }
    }
    return 0;
  }

  /* --------------------------------------------------------------- textures */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* hull and casing side, side projection: u = (x + XB) / LOA, v = (z - Z0) / (Z1 - Z0).
     Both sides map the same way, so the slots and seams land on port and starboard. */
  var _hull = null;
  function hullTex(THREE) {
    if (_hull) return _hull;
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(5711), i, s, x;
    function px(s) { return (X(s) + XB) / LOA * W; }
    function py(z) { return (1 - (z - Z0) / (Z1 - Z0)) * H; }
    g.fillStyle = "#2c2e30"; g.fillRect(0, 0, W, H);                       /* black, lit p3 side #2a2520 x 0.9 */
    g.fillStyle = "#262728"; g.fillRect(0, py(-0.4), W, H - py(-0.4));       /* wet hull under the water, same black */
    for (i = 0; i < 1400; i++) {                                             /* tonal patchwork of repainting */
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.06)";
      g.fillRect(R1() * W, R1() * H, 6 + R1() * 30, 2 + R1() * 5);
    }
    g.fillStyle = "rgba(0,0,0,0.35)";                                        /* plating butts */
    for (s = 3; s < 96; s += 6.1) g.fillRect(px(s), 0, 1, H);
    g.fillRect(0, py(-2.5), W, 1);
    g.fillStyle = "rgba(0,0,0,0.55)"; g.fillRect(0, py(0.9) - 1, W, 3);      /* the knuckle */
    g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(0, py(0.9) - 4, W, 3);
    /* limber slots, low on the casing side the whole length: upright slots about
       0.35 x 0.55 m every 2.4 m (p1, p9, p7) */
    g.fillStyle = "#0b0c0d";
    for (s = 11.6; s < 84.5; s += 2.4) {
      g.fillRect(px(s) - 0.175 / LOA * W, py(1.75), 0.35 / LOA * W, py(1.2) - py(1.75));
    }
    /* bow flood ports (p2b) */
    for (s = 2.2; s < 5.2; s += 0.5) g.fillRect(px(s) - 3, py(0.62), 6, py(0.32) - py(0.62));
    g.beginPath(); g.arc(px(19.4), py(2.1), 2.2, 0, 2 * PI); g.fill();       /* the small round port (p2b) */
    /* anchor recess (p2b): s 8.25-9.55, z 0.25-1.6 */
    g.fillStyle = "#08090a"; g.fillRect(px(9.55), py(1.6), px(8.25) - px(9.55), py(0.25) - py(1.6));
    g.strokeStyle = "rgba(255,255,255,0.10)"; g.lineWidth = 2;
    g.strokeRect(px(9.6), py(1.65), px(8.2) - px(9.6), py(0.2) - py(1.65));
    /* salt and rust streaks running down from the slots, as the 1958 photograph shows them */
    for (i = 0; i < 160; i++) {
      x = R1() * W;
      g.fillStyle = "rgba(120,110,95," + (0.04 + R1() * 0.06).toFixed(3) + ")";
      g.fillRect(x, py(1.25), 1.5, 4 + R1() * 16);
    }
    _hull = finish(THREE, cv);
    return _hull;
  }

  /* casing deck, top projection: u = (x + XB) / LOA, v = (y + 2.2) / 4.4 */
  var _deck = null;
  function deckTex(THREE) {
    if (_deck) return _deck;
    var W = 2048, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(1954), i, s, k;
    function px(s) { return (X(s) + XB) / LOA * W; }
    function py(y) { return (1 - (y + 2.2) / 4.4) * H; }
    g.fillStyle = "#383c40"; g.fillRect(0, 0, W, H);                       /* weathered black deck, lighter than the side (p1, p3) */
    for (i = 0; i < 1600; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.07)";
      g.fillRect(R1() * W, R1() * H, 4 + R1() * 26, 1 + R1() * 4);
    }
    g.fillStyle = "rgba(0,0,0,0.38)";                                        /* deck plating */
    for (s = 1; s < 87; s += 2.05) g.fillRect(px(s), 0, 1, H);
    g.fillRect(0, py(0.95), W, 1); g.fillRect(0, py(-0.95), W, 1);
    /* flood holes in rows along both deck edges (p6) */
    g.fillStyle = "rgba(8,9,10,0.85)";
    for (s = 3; s < 85; s += 0.9) {
      if (s > 31.5 && s < 45.5) continue;
      g.fillRect(px(s), py(1.62), 3, 3); g.fillRect(px(s), py(-1.62) - 3, 3, 3);
    }
    /* round hatch trunks along the casing (d1 cutaway): s 8.7, 16.9, 27.0, 61.2, 74.9; the
       sixth, 77.6, is the light oval below */
    var hs = [8.7, 16.9, 27.0, 61.2, 74.9];
    for (k = 0; k < hs.length; k++) {
      g.fillStyle = "#1a1c1e"; g.beginPath(); g.ellipse(px(hs[k]), py(0), 0.5 / LOA * W, 0.5 / 4.4 * H, 0, 0, 2 * PI); g.fill();
      g.strokeStyle = "rgba(160,165,170,0.45)"; g.lineWidth = 2; g.stroke();
    }
    /* the two light oval hatches, forward at s 13-14 and aft near the casing end (p1, p9) */
    var ov = [13.5, 77.6];
    for (k = 0; k < ov.length; k++) {
      g.fillStyle = "#5a5f63"; g.beginPath(); g.ellipse(px(ov[k]), py(0), 1.1 / LOA * W, 0.62 / 4.4 * H, 0, 0, 2 * PI); g.fill();
      g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2; g.stroke();
    }
    _deck = finish(THREE, cv);
    return _deck;
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

  /* grid of rows (stations) x columns (points round the section) into an indexed
     mesh; flip picks the winding so FrontSide faces outward; uvf(x,y,z) gives the UV.
     Triangles that collapse to a line (stem tip, tail cone) are left out. */
  function grid(THREE, rows, flip, uvf) {
    var pos = [], uv = [], idx = [], R = rows.length, C = rows[0].length, i, j;
    for (i = 0; i < R; i++) for (j = 0; j < C; j++) {
      var p = rows[i][j]; pos.push(p[0], p[1], p[2]);
      var u = uvf(p[0], p[1], p[2]); uv.push(u[0], u[1]);
    }
    function area2(a, b, c) {
      var ax = pos[b * 3] - pos[a * 3], ay = pos[b * 3 + 1] - pos[a * 3 + 1], az = pos[b * 3 + 2] - pos[a * 3 + 2];
      var bx = pos[c * 3] - pos[a * 3], by = pos[c * 3 + 1] - pos[a * 3 + 1], bz = pos[c * 3 + 2] - pos[a * 3 + 2];
      var cx = ay * bz - az * by, cy = az * bx - ax * bz, cz = ax * by - ay * bx;
      return cx * cx + cy * cy + cz * cz;
    }
    function tri(a, b, c) {
      if (area2(a, b, c) < 1e-8) return;
      if (flip) idx.push(a, c, b); else idx.push(a, b, c);
    }
    for (i = 0; i < R - 1; i++) for (j = 0; j < C - 1; j++) {
      var a = i * C + j, b = a + 1, c = a + C, d = c + 1;
      tri(a, b, c); tri(b, d, c);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function uvSide(x, y, z) { return [(x + XB) / LOA, (z - Z0) / (Z1 - Z0)]; }
  function uvDeck(x, y, z) { return [(x + XB) / LOA, (y + 2.2) / 4.4]; }
  function uvNone() { return [0.5, 0.5]; }

  /* flat extrusion of an outline: z from 0 to depth; xz turns it upright (y -> z) */
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
  /* cylinder between two points */
  function strut(THREE, A, mat, r1, r2, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r2, r1, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  /* thin panel that follows the casing side: corners in (s, z), lifted 'off' (sign +1 port) */
  function sidePanel(THREE, sign, c, off) {
    var n = 5, pos = [], idx = [], i, j;
    for (j = 0; j <= n; j++) for (i = 0; i <= n; i++) {
      var u = i / n, v = j / n;
      var s0 = c[0][0] + (c[1][0] - c[0][0]) * u, z0 = c[0][1] + (c[1][1] - c[0][1]) * u;
      var s1 = c[3][0] + (c[2][0] - c[3][0]) * u, z1 = c[3][1] + (c[2][1] - c[3][1]) * u;
      var s = s0 + (s1 - s0) * v, z = z0 + (z1 - z0) * v;
      pos.push(X(s), sign * (surfY(s, z) + off), z);
    }
    for (j = 0; j < n; j++) for (i = 0; i < n; i++) {
      var a = j * (n + 1) + i, b = a + 1, cc = a + n + 1, d = cc + 1;
      if (sign > 0) idx.push(a, cc, b, b, cc, d); else idx.push(a, b, cc, b, d, cc);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0.5), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.88, metalness: 0.06 }),
      deck:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.93, metalness: 0.04 }),
      sail:  std(0x26292c, 0.86, 0.06),     /* sail, fins, fairings: black, p3 sail #171210 lifted for the ACES pass */
      dark:  std(0x0d0f10, 0.80, 0.15),     /* cockpit, windows, shutters, slots */
      metal: std(0x3c4247, 0.55, 0.45),     /* masts, shafts, struts */
      screw: std(0x8a7444, 0.45, 0.65),     /* bronze screws (p10) */
      team:  std(team, 0.86, 0.06)
    };
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, j, k, s, x, z;

    /* ---- stations: dense at the bow and tail, every 2.5 m along the parallel body ---- */
    var ss = [0, 0.08, 0.25, 0.42, 0.6, 0.85, 1.1, 1.45, 1.8, 2.3, 2.8, 3.5, 4.2, 5.1, 6.0, 7.2, 8.5, 10.0, 11.5, 13.2, 15.0];
    for (s = 17.5; s < 61; s += 2.5) ss.push(s);
    ss.push(62, 66, 70, 72.7, 75.4, 77.7, 80, 81.6, 83.2, 84.1, 85.0, 85.5, 86.0, 86.4, 86.8, 88.1, 89.5, 90.8, 92.1, 93.3, 94.5, 95.2, 95.8, 96.2, 96.6);
    var secs = [];
    for (i = 0; i < ss.length; i++) secs.push(section(keyAt(ss[i])));

    /* ---- hull: ballast-tank strip (keel..knuckle) and casing strip (knuckle..deck edge),
       separate so the knuckle stays a crisp crease; port and starboard ---- */
    for (k = -1; k <= 1; k += 2) {
      var ra = [], rb = [], rowA, rowB;
      for (i = 0; i < ss.length; i++) {
        x = X(ss[i]); rowA = []; rowB = [];
        for (j = 0; j <= NA; j++) rowA.push([x, k * secs[i].a[j][0], secs[i].a[j][1]]);
        for (j = 0; j <= NB; j++) rowB.push([x, k * secs[i].b[j][0], secs[i].b[j][1]]);
        ra.push(rowA); rb.push(rowB);
      }
      A.add("hull", grid(THREE, ra, k > 0, uvSide), 0, 0, 0);
      A.add("hull", grid(THREE, rb, k > 0, uvSide), 0, 0, 0);
    }
    /* ---- the flat casing deck between the deck-edge rounds ---- */
    var rd = [];
    for (i = 0; i < ss.length; i++) {
      if (ss[i] > 86.8) break;
      var dy = secs[i].deckY, dz = secs[i].deckZ, row = [];
      for (j = 0; j <= 4; j++) row.push([X(ss[i]), dy * (1 - j / 2), dz]);
      rd.push(row);
    }
    A.add("deck", grid(THREE, rd, true, uvDeck), 0, 0, 0);
    /* close the tail cone */
    var last = secs[secs.length - 1], xl = X(ss[ss.length - 1]), cap = [], ring = [];
    for (j = 0; j <= NA; j++) ring.push([last.a[j][0], last.a[j][1]]);
    for (j = 1; j <= NB; j++) ring.push([last.b[j][0], last.b[j][1]]);
    for (j = ring.length - 2; j >= 1; j--) ring.push([-ring[j][0], ring[j][1]]);
    var zc = 0;
    for (j = 0; j < ring.length; j++) zc += ring[j][1];
    zc /= ring.length;
    cap.push([[xl, 0, zc]]);
    var pos = [xl - 0.15, 0, zc], ix = [];
    for (j = 0; j < ring.length; j++) pos.push(xl, ring[j][0], ring[j][1]);
    for (j = 0; j < ring.length; j++) ix.push(0, 1 + ((j + 1) % ring.length), 1 + j);
    var gc = new THREE.BufferGeometry();
    gc.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    gc.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0.1), 2));
    gc.setIndex(ix); gc.computeVertexNormals();
    A.add("hull", gc, 0, 0, 0);

    /* ---- six bow torpedo-tube shutters, three each side of the stem (p7, p4) ---- */
    var tz = [-2.55, -3.65, -4.75];
    for (k = -1; k <= 1; k += 2) {
      for (i = 0; i < 3; i++) {
        var st = 0.95, zz = tz[i];
        var y0 = surfY(st, zz), ya = surfY(st - 0.2, zz), yb = surfY(st + 0.2, zz);
        var slope = (yb - ya) / 0.4;                 /* dy per metre aft */
        var nrm = new THREE.Vector3(slope, k, 0).normalize();   /* outward: forward and out */
        var qq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), nrm);
        var disc = new THREE.CylinderGeometry(0.42, 0.42, 0.05, 14);
        disc.scale(1, 1, 0.78);
        A.addQ("dark", disc, X(st), k * (y0 + 0.02), zz, qq);
      }
    }

    /* ---- bow planes, folded up against the casing (p2b corners), and the casing slots
       they leave; anchor recess is painted ---- */
    var bp = [[7.64, 0.75], [5.46, 0.75], [6.25, 2.80], [7.87, 2.80]];
    for (k = -1; k <= 1; k += 2) A.add("sail", sidePanel(THREE, k, bp, 0.16), 0, 0, 0);
    for (k = -1; k <= 1; k += 2) {
      for (i = 0; i < 4; i++) {                       /* the panel's edges, so it reads as a plate */
        var c0 = bp[i], c1 = bp[(i + 1) % 4];
        var sm = (c0[0] + c1[0]) / 2, zm = (c0[1] + c1[1]) / 2;
        var ln = Math.sqrt(Math.pow(c1[0] - c0[0], 2) + Math.pow(c1[1] - c0[1], 2));
        var ang = Math.atan2(-(c1[1] - c0[1]), -(c1[0] - c0[0]));
        A.add("sail", new THREE.BoxGeometry(ln, 0.17, 0.07), X(sm), k * (surfY(sm, zm) + 0.08), zm, 0, ang, 0);
      }
    }

    /* ---- the domed fairing on the forward deck, 1958 (p2b): s 17.1-21.5, 0.75 m high,
       with a dark hood on its after half 1.5 m over the deck ---- */
    var dz0 = keyAt(19.3)[1];
    A.add("sail", new THREE.SphereGeometry(1, 18, 8, 0, 2 * PI, 0, PI / 2), X(19.3), 0, dz0 - 0.02, PI / 2, 0, 0, [2.2, 0.78, 0.95]);
    A.add("dark", new THREE.CylinderGeometry(0.70, 0.70, 0.90, 16), X(19.8), 0, dz0 + 0.75);

    /* ---- the sail: rounded upright leading edge at s 32.0, raked after edge from
       s 45.0 at the casing to 44.3 at the top, 6.5 m over the deck; the after top
       corner steps down 0.35 m over its last 1.8 m (p2b, p1) ---- */
    var zs0 = keyAt(38)[1];                       /* 3.03: the deck under the sail */
    var zTop = zs0 + 6.8, zStep = zTop - 0.35;
    function sailRing(z, xa, xf, hw, ra, n) {
      /* outline: front semicircle (radius hw) at xf, after rounds of radius ra at xa */
      var pts = [], m = n / 2, t, q;
      for (q = 0; q <= m; q++) {                  /* front: port -> starboard over the nose */
        t = PI / 2 - PI * q / m;
        pts.push([xf - hw + hw * Math.cos(t), hw * Math.sin(t)]);
      }
      for (q = 0; q <= m; q++) {                  /* after end: starboard -> port, elliptic */
        t = -PI / 2 - PI * q / m;
        pts.push([xa + ra + ra * Math.cos(t), hw * Math.sin(t)]);
      }
      return pts;
    }
    function aftX(z) { return X(45.0) + (X(44.3) - X(45.0)) * (z - zs0) / (zTop - zs0); }
    var XF = X(32.0);
    function shellRings(levels, xaf, hwf, raf, n) {
      var rows = [], L, q, z2, ring2;
      for (L = 0; L < levels.length; L++) {
        z2 = levels[L];
        ring2 = sailRing(z2, xaf(z2), XF, hwf(z2), raf, n);
        var r3 = [];
        for (q = 0; q < ring2.length; q++) r3.push([ring2[q][0], ring2[q][1], z2]);
        r3.push(r3[0]);
        rows.push(r3);
      }
      return rows;
    }
    function hwAt(z) { return 1.45 - 0.08 * (z - zs0) / 6.8; }
    var lv = [zs0 - 0.25, zs0, zs0 + 0.6, zs0 + 1.2, zs0 + 2.4, zs0 + 3.8, zs0 + 5.2, zStep];
    var sh = shellRings(lv, aftX, hwAt, 0.75, 28);
    A.add("sail", grid(THREE, sh, true, uvNone), 0, 0, 0);
    var top2 = shellRings([zStep - 0.02, zTop], function () { return X(42.5); }, hwAt, 0.45, 28);
    A.add("sail", grid(THREE, top2, true, uvNone), 0, 0, 0);
    function capRing(rows, z2, up, mat) {
      var r = rows[rows.length - 1], cx = 0, cy = 0, q, P = [], I = [];
      for (q = 0; q < r.length - 1; q++) { cx += r[q][0]; cy += r[q][1]; }
      cx /= (r.length - 1); cy /= (r.length - 1);
      P.push(cx, cy, z2);
      for (q = 0; q < r.length - 1; q++) P.push(r[q][0], r[q][1], z2);
      var n2 = r.length - 1;
      for (q = 0; q < n2; q++) { if (up) I.push(0, 1 + (q + 1) % n2, 1 + q); else I.push(0, 1 + q, 1 + (q + 1) % n2); }
      var gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      gg.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(P.length / 3 * 2).fill(0.5), 2));
      gg.setIndex(I); gg.computeVertexNormals();
      A.add(mat, gg, 0, 0, 0);
    }
    capRing(sh, zStep, true, "sail");
    capRing(top2, zTop, true, "sail");

    /* bridge cockpit at the forward top (p1, p2b): a dark well 2.5 m long */
    var ck = [];
    for (i = 0; i <= 12; i++) { var tt = PI / 2 - PI * i / 12; ck.push([XF - 1.0 + 0.95 * Math.cos(tt), 0.95 * Math.sin(tt)]); }
    ck.push([XF - 2.6, -0.95]); ck.push([XF - 2.6, 0.95]);
    A.add("dark", ext(THREE, ck, 0.04), 0, 0, zTop + 0.005);
    /* windows on the rounded leading edge: pairs near the top and at mid-height (p1) */
    var wz = [zTop - 0.75, zTop - 2.8];
    for (i = 0; i < wz.length; i++) {
      for (k = -1; k <= 1; k += 2) {
        var aw = 38 * D2R, hw0 = hwAt(wz[i]);
        A.add("dark", new THREE.BoxGeometry(0.06, 0.34, 0.26),
          XF - hw0 + (hw0 + 0.02) * Math.cos(aw), k * (hw0 + 0.02) * Math.sin(aw), wz[i], 0, 0, k * aw);
      }
    }
    /* foot ledge round the sail sides, 1.2 m over the deck (p2b seam, p7 rail) */
    for (k = -1; k <= 1; k += 2) {
      A.add("sail", new THREE.BoxGeometry(10.6, 0.10, 0.10), X(38.6), k * (hwAt(zs0 + 1.2) + 0.04), zs0 + 1.2);
    }

    /* ---- masts, as photographed in 1958 (p2b): the tall mast 3.6-4.2 m abaft the
       leading edge, 2.6 m over the sail with a whip to 3.5 m; a short thick tube just
       abaft it; two thin whips at mid-length ---- */
    strut(THREE, A, "metal", 0.30, 0.20, [X(35.9), 0, zTop - 0.1], [X(35.9), 0, zTop + 2.6], 8);
    strut(THREE, A, "metal", 0.05, 0.03, [X(35.9), 0, zTop + 2.6], [X(35.9), 0, zTop + 3.5], 5);
    A.add("metal", new THREE.BoxGeometry(0.62, 0.48, 0.30), X(35.9), 0, zTop + 1.9);          /* head of the mast */
    strut(THREE, A, "metal", 0.24, 0.22, [X(36.55), 0, zTop - 0.1], [X(36.55), 0, zTop + 1.3], 8);
    strut(THREE, A, "metal", 0.05, 0.035, [X(38.35), 0.25, zTop - 0.1], [X(38.35), 0.25, zTop + 1.6], 5);
    strut(THREE, A, "metal", 0.05, 0.035, [X(38.75), -0.25, zTop - 0.1], [X(38.75), -0.25, zTop + 1.6], 5);

    /* ---- the stern (p7): upper and lower rudder at the end of the tail, horizontal
       shaft skegs, twin shafts, stern planes ABAFT the screws ---- */
    var up = [[X(92.9), -0.6], [X(93.4), 1.5], [X(96.3), 1.5], [X(96.45), -1.3]];
    A.add("sail", ext(THREE, up, 0.30, true), 0, 0.15, 0);
    var lo = [[X(92.3), -2.4], [X(92.6), -5.6], [X(95.9), -5.6], [X(95.95), -2.1]];
    A.add("sail", ext(THREE, lo, 0.30, true), 0, 0.15, 0);
    var sp = [[X(95.0), 0.0], [X(96.6), 3.55], [X(98.45), 3.55], [X(98.7), 0.0], [X(98.45), -3.55], [X(96.6), -3.55]];
    sp.reverse();
    A.add("sail", ext(THREE, sp, 0.16), 0, 0, -2.83);
    for (k = -1; k <= 1; k += 2) {
      var sk = [[X(86.0), 0], [X(89.0), k * 2.55], [X(94.0), k * 2.55], [X(94.3), 0]];
      if (k < 0) sk.reverse();
      A.add("sail", ext(THREE, sk, 0.12), 0, 0, -3.02);
      var py = k * 2.2, pz = -2.75;
      strut(THREE, A, "metal", 0.17, 0.17, [X(87.5), py, pz], [X(94.4), py, pz], 10);        /* shaft */
      strut(THREE, A, "metal", 0.08, 0.08, [X(92.6), py * 0.55, -1.9], [X(92.6), py, pz], 6); /* strut to the tail */
      /* screw: five broad round blades on a conical boss (p10), 2.3 m across */
      var px2 = X(94.85);
      strut(THREE, A, "screw", 0.36, 0.30, [px2 + 0.35, py, pz], [px2 - 0.25, py, pz], 12);
      strut(THREE, A, "screw", 0.30, 0.04, [px2 - 0.25, py, pz], [px2 - 0.85, py, pz], 12);
      var bl = [[-0.10, 0.22], [-0.30, 0.45], [-0.36, 0.75], [-0.25, 1.02], [0.02, 1.15], [0.28, 1.0], [0.34, 0.7], [0.24, 0.42], [0.10, 0.22]];
      for (i = 0; i < 5; i++) {
        var gb = ext(THREE, bl, 0.05);
        gb.translate(0, 0, -0.025);
        gb.rotateY(k * 0.62);                         /* blade pitch */
        gb.rotateX(i * 2 * PI / 5 + (k > 0 ? 0 : 0.6));
        A.add("screw", gb, px2, py, pz);
      }
    }

    /* ---- modest team panels on the deck, fore and aft of the sail ---- */
    A.add("team", new THREE.BoxGeometry(3.0, 0.9, 0.04), X(25.0), 0, keyAt(25)[1] + 0.02);
    A.add("team", new THREE.BoxGeometry(3.0, 0.9, 0.04), X(58.0), 0, keyAt(58)[1] + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build, section: section, keyAt: keyAt, surfY: surfY };
})();

/* len is the measured X extent, 98.7 m: render3d scales a submarine by it. */
UNIT_MODELS["nato_e50_sub"] = {
  len: 98.7,
  build: function (THREE, M, C) { return HeroNautilus571.build(THREE, M, C); }
};
