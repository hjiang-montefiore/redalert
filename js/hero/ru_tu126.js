/* ================= ru_tu126.js  -  HERO MODEL =================
   Tupolev Tu-126 "Moss" airborne early-warning aircraft (pact_e60_awacs,
   "Tu-126 Moss", in service 1965; the only row that uses this key). The
   Tu-114 airliner's airframe: a round 4.2 m fuselage sitting on a low wing
   swept about 35 degrees, four Kuznetsov NK-12 turboprops with eight-blade
   contra-rotating propellers (two four-blade rows each), the main gear
   retracting aft into the long inner nacelles, the 11 m rotodome on a broad
   pylon over the rear fuselage, the refuelling probe over the nose, and a
   ventral fin under the tail. Nine were built.

   PUBLISHED FIGURES (Russian and English Wikipedia, "Tu-126", "Tu-114"):
   length 55.2 m, span 51.2 m, height 16.05 m (the Tu-114: 54.1 m, 51.1 m,
   15.5 m), fuselage 4.2 m across, rotodome 11 m across, AV-60 propellers
   5.6 m across. js/air_specs.js has the same 55.2 m and 51.2 m.

   REFERENCES (Wikimedia Commons, fetched once each at width=960 with a
   generic user agent, cached in the scratchpad q_tu126_ref folder):
     DRAWING - "Tupolev Tu-95 3-view line drawing.png". The Tu-114 and Tu-126
       fly the Tu-95's wing, nacelles and tailplane (only the fuselage and
       the wing's height on it differ), so the plan view gives, as fractions
       of the half span scaled to 25.6 m:
       - the wing: leading edge 0.725 aft per metre out (36 deg), trailing
         edge 0.446 (24 deg), 10.5 m of chord at the root and 3.4 m at the
         rounded tip; the front view shows the wing flat (no dihedral that
         one pixel can show);
       - the nacelles: inner at 6.8 m out, its spinner 6.0 m ahead of the
         leading edge and its gear pod running 4.0 m behind the trailing
         edge; outer at 13.3 m, spinner 6.5 m ahead, ending under the wing;
         about 1.9 m across;
       - the tailplane: 8.0 m a side, leading edge swept 40 deg, 4.2 m of
         root chord and 2.1 m at the tip, its tips level with the tail end;
       - the fin: leading edge 42-45 deg, trailing edge 14-18 deg.
       No Tu-126 or Tu-114 three-view is on Commons (searched both).
     PHOTOGRAPHS (all black and white; the type was scrapped by 1990):
       P1 "Tu-126.jpg" (in flight, starboard side, from slightly below) and
       P2 "Tu-126 in flight 1977.JPEG" (starboard side, banked): measured at
         16.8-17.1 px/m off the 55.2 m length, they give
         - the probe on the nose top, 2.4 m ahead of the blunt nose;
         - the stepped windscreen and the flat flight-deck roof;
         - a low dorsal blister 7.9-10.4 m aft of the probe tip and an
           aerial mast ahead of it;
         - round portholes at 9.7, 19.9, 27.0, 29.6, 32.5 and 38.2 m;
         - the rotodome centred 34.7 m aft, 11 m across, its mid-plane
           4.4 m above the fuselage axis; the pylon 30.8-38.9 m at its base
           and 31.6-37.9 m under the dome;
         - an oval blister (38.9-40.7 m) and a small dark square (41.2-41.7 m)
           low on the starboard side of the rear fuselage, and two round blisters
           under the belly at 37.1-38.8 m and 39.8-41.6 m;
         - the ventral fin under the tail, 42.4-51.4 m, deepening aft;
         - the fin: tip 8.4 m above the axis, tip chord 2.7-2.9 m with its
           trailing edge over the tail end, a long dorsal fillet from 43 m;
         - the pale fin and the red star on it, nothing on the wings.
       P3 "Tupolev Tu-126, Zokniai, Siauliai, Lithuanian SSR.jpg" and
       P4 "Tupolev Tu-126 in the parking, Zokniai, ..." (on the ground):
         the tall stance, nose up: in P3 the inner nacelles stand about
         2.4 m off the ground over the main bogies and the belly about
         6.5 m up at the nose leg (the nose needs a tall ladder); the
         four-wheel main bogies under the inner nacelles, the twin nose
         wheels on a long leg, the stopped propellers, the glazed nose tip
         under the probe. The model is drawn level (it flies level), so its
         gear splits the two: the belly 4.1 m up, the inner nacelles 3.5 m.
         That puts the fin top 14.6 m up against the published 16.05 m,
         which the nose-up attitude would raise; not confirmed further.
   PAINT: polished natural metal. The photographs are monochrome, so only
     the tone is sampled: the lit fuselage side reads 0.67 and the fin and
     dome 0.77 of white; both are taken to 0.9 of that (the skin 0x9b9fa3,
     the fin, ventral fin and dome 0xb0b3b5), with a neutral aluminium hue.
   CORRECTED from the old model: the stance (belly 2.75 m up, now 4.1 m:
     the ground photographs), the fin (its tip 0.4 m too high and its
     trailing edge 0.8 m short of the tail end; now P2's 42 and 16 deg
     sweeps and the long dorsal fillet), the portholes (eleven evenly spaced; the
     photographs show six, unevenly), the props (blur discs; now the
     stopped eight blades), the nacelle stations (6.7/12.6 m out, now
     6.8/13.3 m off the Tu-95 plan), the wing (it had 2 deg of dihedral;
     the drawing shows none), and the missing ventral fin and blisters.
   NOT CONFIRMED and so not drawn: the exhaust pipes, flap and aileron
     breaks (painted panel lines only), any wing fence, gear doors, a
     port rear-fuselage blister (only the starboard side is photographed:
     P1 to P3 all show the starboard side, nose right),
     the white border of the fin star, any wing or fuselage star, lettering,
     bort numbers, the propeller blade colour (drawn dark grey).
   RECOGNITION LIST (and where it shows):
     1 the long round airliner fuselage high on a low swept wing (FUS, addWings);
     2 the 11 m rotodome on its broad pylon aft of the wing (addDome);
     3 four NK-12 nacelles hung well ahead of the wing, the inner pair long,
       running into the gear pods behind the trailing edge (addEngines);
     4 eight-blade contra-rotating propellers, 5.6 m, stopped (addProps);
     5 the probe over the blunt glazed nose (addNose);
     6 the swept fin with its long dorsal fillet and the red star (addTail);
     7 the ventral fin under the tail (addTail);
     8 the tall stance: the long legs, four-wheel bogies and twin nose
       wheels (addGear);
     9 the low dorsal blister, the portholes, the rear blisters (addDetails);
    10 the natural-metal skin with a paler fin and dome, panelled on a
       canvas texture (skinSheet).
   Team colour (C.team exactly): one small flat strip on the upper skin of
   each wingtip; nothing else.
   Model space: +X nose, +Y port, +Z up, metres; s is metres aft of the
   probe tip, the fuselage axis is z = 0 and the ground z = -6.2. One mesh
   per material; the gear (it retracts: the mains aft into the inner
   nacelles, the nose leg into the nose, P1/P2 show none of it in flight)
   is the group "gear" and the lowest opaque part. Nothing is named "rotor":
   the game does not turn propellers.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTu126 = (function () {
  "use strict";

  var L = 55.2, NOSE = L / 2, ZG = -6.2, D2R = Math.PI / 180;
  function X(s) { return NOSE - s; }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cr(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  /* Catmull-Rom through a table's rows: rows[i][0] is the station */
  function tab(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    var t = (s - b[0]) / (c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(cr(a[k], b[k], c[k], d[k], t));
    return out;
  }

  /* ---------------------------------------------------------- tables
     FUS: s, half-width, top z, bottom z (off P1 and P2 at 16.8-17.1 px/m;
     the body is the Tu-114's round 4.2 m section). The nose is blunt with
     its tip a little below the axis; the tail tapers to a point over the
     ventral fin. */
  var FUS = [
    [2.44, 0.06, -0.10, -0.32], [2.62, 0.55, 0.22, -0.68], [3.00, 0.95, 0.55, -1.00],
    [3.60, 1.32, 0.95, -1.36], [4.30, 1.62, 1.38, -1.63], [5.10, 1.86, 1.82, -1.83],
    [6.00, 2.00, 2.02, -1.96], [7.50, 2.08, 2.09, -2.06], [9.00, 2.10, 2.10, -2.10],
    [36.0, 2.10, 2.10, -2.10], [40.0, 2.03, 2.06, -1.92], [44.0, 1.76, 1.86, -1.48],
    [48.0, 1.30, 1.56, -0.98], [51.0, 0.90, 1.24, -0.60], [53.5, 0.50, 0.86, -0.28],
    [55.0, 0.14, 0.40, 0.00], [55.2, 0.04, 0.22, 0.10]
  ];
  /* wing (Tu-95 plan, scaled to 25.6 m a side): flat, chord line at z -1.45 */
  var S0 = 16.0, SPAN = 25.6, WZ = -1.45;
  function wLE(y) { return S0 + 0.725 * y; }
  function wTE(y) { return S0 + 10.52 + 0.446 * y; }
  function wtc(y) { return 0.15 - 0.05 * Math.min(1, y / SPAN); }
  var WSTA = [1.0, 2.1, 4.0, 6.8, 10.0, 13.3, 17.0, 21.0, 24.2, 24.9, 25.4, 25.6];
  /* nacelles: centre y, spinner tip ahead of the leading edge, length past the spinner tip */
  var NAC = [
    { y: 6.8, ahead: 6.0, pod: 4.0 },
    { y: 13.3, ahead: 6.5, pod: -1.0 }
  ];
  var NZ = WZ - 0.25, PROPR = 2.8;
  /* fin: h, s of leading edge, s of trailing edge, half thickness (P2 sweeps) */
  var FIN = [
    [1.20, 42.6, 52.95, 0.25], [1.70, 43.6, 53.08, 0.36], [2.30, 45.3, 53.25, 0.38],
    [3.00, 47.46, 53.45, 0.36], [5.50, 49.70, 54.17, 0.27], [8.00, 51.94, 54.88, 0.17],
    [8.40, 52.30, 55.00, 0.10]
  ];
  /* ventral fin: h, s LE, s TE, half thickness (P1, P3) */
  var VFIN = [[-0.50, 41.6, 51.4, 0.14], [-1.80, 42.9, 51.35, 0.14], [-2.35, 44.2, 51.2, 0.11]];
  /* tailplane: y, s LE, s TE (Tu-95 plan); at z -0.3 */
  var STAB = [[0.5, 46.68, 51.04], [1.2, 47.27, 51.40], [4.5, 50.0, 53.15], [7.5, 52.48, 54.74], [8.0, 52.9, 55.0]];
  var STABZ = -0.3;

  /* ---------------------------------------------------------- texture
     One canvas of natural-metal panelling: near-white so the material
     colour sets the tone (skin and the paler fin and dome share it).
     Frames every 1.6 m, stringers every 0.8 m, panels a shade apart. */
  var _sheet;
  function skinSheet(THREE) {
    if (_sheet !== undefined) return _sheet;
    var tex = null;
    try {
      var S = 1024, PM = S / 32, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(1265), i, k;
      g.fillStyle = "#f0f1f2"; g.fillRect(0, 0, S, S);
      for (k = 0; k < 260; k++) {
        var c = 228 + Math.floor(R() * 27);
        g.fillStyle = "rgb(" + c + "," + (c + 1) + "," + (c + 2) + ")";
        var px = Math.floor(R() * 20) * 1.6 * PM, py = Math.floor(R() * 40) * 0.8 * PM;
        g.fillRect(px, py, (1 + Math.floor(R() * 3)) * 1.6 * PM, (1 + Math.floor(R() * 2)) * 0.8 * PM);
      }
      g.strokeStyle = "rgba(40,44,48,0.32)"; g.lineWidth = 1.2;
      for (i = 0; i < S; i += 1.6 * PM) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      g.strokeStyle = "rgba(40,44,48,0.20)"; g.lineWidth = 1;
      for (i = 0; i < S; i += 0.8 * PM) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
      g.fillStyle = "rgba(30,34,38,0.16)";
      for (i = 0; i < S; i += 1.6 * PM) for (k = 0; k < S; k += 6) g.fillRect(i + 3, k, 1, 1);
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheet = tex;
    return tex;
  }

  /* ---------------------------------------------------------- geometry helpers */
  function geoFrom(THREE, pos, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }
  function gridGeo(THREE, rings, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j, M = open ? N - 1 : N;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < nr - 1; i++) for (j = 0; j < M; j++) {
      var a = i * N + j, b = i * N + (j + 1) % N, c = (i + 1) * N + j, d = (i + 1) * N + (j + 1) % N;
      idx.push(a, c, b, b, c, d);
    }
    function cap(r, base, flip) {
      var cx = 0, cy = 0, cz = 0, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      var ci = pos.length / 3;
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) {
        var a = base + k, b = base + (k + 1) % N;
        if (flip) idx.push(ci, b, a); else idx.push(ci, a, b);
      }
    }
    if (capA) cap(rings[0], 0, false);
    if (capB) cap(rings[nr - 1], (nr - 1) * N, true);
    return geoFrom(THREE, pos, idx);
  }
  /* wind a closed part outward by its signed volume */
  function outward(g) {
    var p = g.attributes.position.array, ix = g.index.array, n = p.length / 3, cx = 0, cy = 0, cz = 0, i, v = 0;
    for (i = 0; i < n; i++) { cx += p[3 * i]; cy += p[3 * i + 1]; cz += p[3 * i + 2]; }
    cx /= n; cy /= n; cz /= n;
    for (i = 0; i < ix.length; i += 3) {
      var a = 3 * ix[i], b = 3 * ix[i + 1], c = 3 * ix[i + 2];
      var ax = p[a] - cx, ay = p[a + 1] - cy, az = p[a + 2] - cz;
      var bx = p[b] - cx, by = p[b + 1] - cy, bz = p[b + 2] - cz;
      var qx = p[c] - cx, qy = p[c + 1] - cy, qz = p[c + 2] - cz;
      v += ax * (by * qz - bz * qy) + ay * (bz * qx - bx * qz) + az * (bx * qy - by * qx);
    }
    if (v < 0) for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    return g;
  }
  /* metre UVs: the canvas covers 32 m, so its panels land at their real size */
  function planarUV(THREE, g) {
    var p = g.attributes.position.array, n = p.length / 3, uv = new Float32Array(n * 2), i;
    for (i = 0; i < n; i++) { uv[2 * i] = p[3 * i] / 32; uv[2 * i + 1] = (p[3 * i + 1] + 0.7 * p[3 * i + 2]) / 32; }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  }
  function part(THREE, grp, g, mat, closed) {
    if (closed) outward(g);
    g.computeVertexNormals();
    planarUV(THREE, g);
    grp.add(new THREE.Mesh(g, mat));
  }
  function taper(THREE, mat, a, b, r0, r1, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], Ln = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, Ln, seg || 8, 1), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / Ln, dy / Ln, dz / Ln));
    return m;
  }
  function egg(THREE, mat, rx, ry, rz, x, y, z, ws, hs) {
    var geo = new THREE.SphereGeometry(1, ws || 12, hs || 8);
    geo.scale(rx, ry, rz);
    geo.translate(x, y, z);
    planarUV(THREE, geo);
    return new THREE.Mesh(geo, mat);
  }
  function naca(x, tc) {
    return 5 * tc * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1036 * x * x * x * x);
  }
  /* closed foil outline, chord 0..1 from the leading edge */
  function foil(n, tc, cam) {
    var pts = [], i, x;
    for (i = 0; i < n; i++) {
      x = 0.5 * (1 + Math.cos(Math.PI * i / (n - 1)));
      pts.push([x, cam * 4 * x * (1 - x) + naca(x, tc)]);
    }
    for (i = n - 2; i >= 1; i--) {
      x = 0.5 * (1 + Math.cos(Math.PI * i / (n - 1)));
      pts.push([x, cam * 4 * x * (1 - x) - naca(x, tc)]);
    }
    return pts;
  }
  /* a body of revolution along X: prof rows [distance aft of x0, radius] */
  /* prof rows may carry a third value: how much deeper the lower half is */
  function lathe(THREE, prof, N, x0, yc, zc, capA, capB) {
    var rings = [], i, j;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004), kb = prof[i][2] || 1, r = [];
      for (j = 0; j < N; j++) {
        var t = j / N * Math.PI * 2, sn = Math.sin(t);
        r.push([x0 - prof[i][0], yc + w * Math.cos(t), zc + w * sn * (sn < 0 ? kb : 1)]);
      }
      rings.push(r);
    }
    return gridGeo(THREE, rings, capA, capB);
  }

  /* ---------------------------------------------------------- fuselage */
  function fusAt(s) { return tab(FUS, s); }
  /* a point on the fuselage: a = angle from the top, + to port */
  function fusPt(s, a, off) {
    var f = fusAt(s), zc = (f[1] + f[2]) / 2, hz = (f[1] - f[2]) / 2;
    return [X(s), (f[0] + off) * Math.sin(a), zc + (hz + off) * Math.cos(a)];
  }
  function addFuselage(THREE, g, T) {
    var rings = [], i, j, N = 24, ss = [];
    for (i = 0; i <= 14; i++) ss.push(2.44 + (9.0 - 2.44) * Math.pow(i / 14, 1.5));
    for (i = 1; i <= 8; i++) ss.push(9.0 + 27.0 * i / 8);
    for (i = 1; i <= 16; i++) ss.push(36.0 + (L - 36.0) * i / 16);
    for (i = 0; i < ss.length; i++) {
      var ring = [];
      for (j = 0; j < N; j++) ring.push(fusPt(ss[i], j / N * Math.PI * 2, 0));
      rings.push(ring);
    }
    part(THREE, g, gridGeo(THREE, rings, true, true), T.skin, true);
  }
  /* a patch lying on the fuselage skin, a little proud of it */
  function patch(THREE, g, mat, s0, s1, a0, a1, off, ns, na) {
    var rings = [], i, j;
    ns = ns || 4; na = na || 4;
    for (i = 0; i <= ns; i++) {
      var r = [];
      for (j = 0; j <= na; j++) r.push(fusPt(s0 + (s1 - s0) * i / ns, a0 + (a1 - a0) * j / na, off));
      rings.push(r);
    }
    var pos = [], idx = [], N = na + 1;
    for (i = 0; i <= ns; i++) for (j = 0; j <= na; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < ns; i++) for (j = 0; j < na; j++) {
      var a = i * N + j, b = a + 1, c = a + N, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    part(THREE, g, geoFrom(THREE, pos, idx), mat, false);
  }
  function addNose(THREE, g, T) {
    var s;
    /* the refuelling probe along the nose top, 2.4 m ahead of the nose (P1, P2) */
    g.add(taper(THREE, T.metal, [X(0.0), 0, 0.80], [X(4.6), 0, 1.30], 0.09, 0.17, 10));
    g.add(taper(THREE, T.ink, [X(0.0), 0, 0.80], [X(0.25), 0, 0.81], 0.06, 0.10, 8));
    /* the glazed nose tip under the probe (P3 close up) */
    patch(THREE, g, T.glass, 2.47, 3.05, -1.0, 1.0, 0.06, 3, 6);
    /* the windscreen high on the nose slope, either side of the probe root,
       and the flight-deck side windows behind it, one frame bar a side (P1, P3) */
    patch(THREE, g, T.glass, 4.05, 4.95, -0.80, 0.80, 0.06, 3, 6);
    for (s = -1; s <= 1; s += 2) {
      patch(THREE, g, T.glass, 4.85, 6.05, s * 0.78, s * 1.08, 0.06, 3, 2);
      patch(THREE, g, T.skin, 4.02, 4.98, s * 0.40 - 0.035, s * 0.40 + 0.035, 0.09, 2, 1);
    }
  }
  function addDetails(THREE, g, T) {
    var s, i;
    /* the low dorsal blister behind the flight deck and the mast ahead of it (P1, P2) */
    g.add(egg(THREE, T.skin, 1.25, 0.55, 0.36, X(9.15), 0, 2.06, 14, 8));
    var mast = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.75), T.metal);
    mast.position.set(X(6.55), 0, 2.30); mast.rotation.y = 28 * D2R;
    g.add(mast);
    /* round portholes at the stations P1 and P2 show, both sides */
    var PH = [9.7, 19.9, 27.0, 29.6, 32.5, 38.2];
    for (s = -1; s <= 1; s += 2) for (i = 0; i < PH.length; i++) {
      var f = fusAt(PH[i]), w = new THREE.CircleGeometry(0.2, 8);
      w.rotateX(-s * Math.PI / 2);
      var z = 0.35, y = Math.sqrt(Math.max(0, 1 - z * z / (f[1] * f[1]))) * f[0];
      w.translate(X(PH[i]), s * (y + 0.05), z);
      g.add(new THREE.Mesh(w, T.ink));
    }
    /* starboard side of the rear fuselage: the oval blister and the dark square (P1, P2) */
    var fb = fusAt(39.8), zb = -0.8, yb = Math.sqrt(1 - zb * zb / 4.0) * fb[0];
    g.add(egg(THREE, T.glass, 0.9, 0.2, 0.38, X(39.8), -yb, zb, 12, 6));
    patch(THREE, g, T.ink, 41.2, 41.7, -2.18, -1.95, 0.05, 1, 1);
    /* two round blisters under the rear belly (P1, P2) */
    g.add(egg(THREE, T.metal, 0.85, 0.62, 0.42, X(37.95), 0, -2.06, 12, 7));
    g.add(egg(THREE, T.metal, 0.9, 0.62, 0.42, X(40.7), 0, fusAt(40.7)[2] + 0.04, 12, 7));
  }
  /* the rotodome and its pylon (P1, P2: 11 m, centre 34.7 m aft, mid-plane 4.4 m up) */
  function addDome(THREE, g, T) {
    var P = [[0.001, -0.74], [1.5, -0.73], [3.0, -0.66], [4.2, -0.52], [5.0, -0.34], [5.38, -0.16],
             [5.5, 0.0], [5.38, 0.17], [5.0, 0.38], [4.2, 0.58], [3.0, 0.74], [1.5, 0.83], [0.001, 0.85]];
    /* rings about the vertical axis, closed by one centre point top and
       bottom (a lathe pole would leave a star of bad normals on the roof) */
    var rings = [], i, j, N = 36;
    for (i = 1; i < P.length - 1; i++) {
      var r = [];
      for (j = 0; j < N; j++) {
        var t = j / N * Math.PI * 2;
        r.push([X(34.7) + P[i][0] * Math.cos(t), P[i][0] * Math.sin(t), 4.4 + P[i][1]]);
      }
      rings.push(r);
    }
    part(THREE, g, gridGeo(THREE, rings, true, true), T.pale, true);
    /* the pylon: a thick faired foil, flaring into the fuselage roof */
    var PY = [[1.70, 30.5, 39.3, 1.35], [2.15, 30.8, 38.9, 1.15], [2.9, 31.2, 38.4, 0.95], [3.75, 31.6, 37.9, 0.85]];
    rings = PY.map(function (r) {
      var c = r[2] - r[1];
      return foil(11, 2 * r[3] / c, 0).map(function (p) { return [X(r[1] + p[0] * c), p[1] * c, r[0]]; });
    });
    part(THREE, g, gridGeo(THREE, rings, true, true), T.skin, true);
  }

  /* ---------------------------------------------------------- tail */
  function star(THREE, g, mat, sC, yS, zC, r) {
    var pos = [X(sC), yS, zC], idx = [], k;
    for (k = 0; k < 10; k++) {
      var rr = (k & 1) ? r * 0.4 : r, a = Math.PI / 2 + k * Math.PI / 5;
      pos.push(X(sC) - rr * Math.cos(a), yS, zC + rr * Math.sin(a));
    }
    for (k = 0; k < 10; k++) idx.push(0, 1 + k, 1 + (k + 1) % 10);
    var sg = geoFrom(THREE, pos, idx);
    sg.computeVertexNormals();
    g.add(new THREE.Mesh(sg, mat));
  }
  function vSurf(THREE, g, mat, rows, n) {
    var rings = rows.map(function (f) {
      var c = f[2] - f[1], tc = 2 * f[3] / c;
      return foil(n, tc, 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; });
    });
    part(THREE, g, gridGeo(THREE, rings, true, true), mat, true);
  }
  function addTail(THREE, g, T) {
    var s;
    vSurf(THREE, g, T.pale, FIN, 13);
    vSurf(THREE, g, T.pale, VFIN, 9);
    for (s = -1; s <= 1; s += 2) {
      var sr = STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], tc = 0.11 - 0.03 * Math.min(1, y / 8);
        return foil(11, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, STABZ + p[1] * c]; });
      });
      part(THREE, g, gridGeo(THREE, sr, true, true), T.skin, true);
    }
    /* the red star on both sides of the fin, about 4.3 m above the axis (P1, P2) */
    var h = 4.6, f = tab(FIN.map(function (r) { return [r[0], r[1], r[2], r[3]]; }), h);
    var sc = f[0] + 0.42 * (f[1] - f[0]), hy = naca(0.42, 2 * f[2] / (f[1] - f[0])) * (f[1] - f[0]) + 0.02;
    for (s = -1; s <= 1; s += 2) star(THREE, g, T.red, sc, s * hy, h, 0.7);
  }

  /* ---------------------------------------------------------- wings */
  function chordAt(y) {
    var le = wLE(y), te = wTE(y);
    if (y > 24.2) {
      var u = Math.min(1, (y - 24.2) / 1.4), k = 0.25 + 0.75 * Math.sqrt(Math.max(0, 1 - u * u)), m = (le + te) / 2;
      le = m - (m - le) * k; te = m + (te - m) * k * 0.92;
    }
    return [le, te];
  }
  function addWings(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = WSTA.map(function (y) {
        var c = chordAt(y), ch = c[1] - c[0];
        return foil(13, wtc(y), 0.012).map(function (p) { return [X(c[0] + p[0] * ch), s * y, WZ + p[1] * ch]; });
      });
      part(THREE, g, gridGeo(THREE, rings, true, true), T.skin, true);
      /* the team strip: a small flat plate on the upper skin near the tip */
      var y0 = 21.6, y1 = 23.9, f0 = 0.2, f1 = 0.6, pos = [], idx = [], i, j, NY = 3, NF = 3;
      for (i = 0; i <= NY; i++) for (j = 0; j <= NF; j++) {
        var y = y0 + (y1 - y0) * i / NY, f = f0 + (f1 - f0) * j / NF, c = chordAt(y), ch = c[1] - c[0];
        pos.push(X(c[0] + f * ch), s * y, WZ + (0.012 * 4 * f * (1 - f) + naca(f, wtc(y))) * ch + 0.025);
      }
      for (i = 0; i < NY; i++) for (j = 0; j < NF; j++) {
        var a = i * (NF + 1) + j, b = a + 1, c2 = a + NF + 1, d2 = c2 + 1;
        idx.push(a, b, c2, b, d2, c2);
      }
      var tg = geoFrom(THREE, pos, idx);
      tg.computeVertexNormals();
      g.add(new THREE.Mesh(tg, T.team));
      /* the flap and aileron hinge line at 0.72 chord and the breaks the
         Tu-95 plan draws across it at 9.9, 15.9 and 19.1 m out */
      wingLine(THREE, g, T.ink, s, 2.3, 24.3, 0.72, 0.72);
      [9.9, 15.9, 19.1].forEach(function (yb) { wingLine(THREE, g, T.ink, s, yb, yb, 0.72, 0.995); });
    }
  }
  /* a thin dark line lying on the upper skin: from (ya, fa) to (yb, fb) */
  function wingLine(THREE, g, mat, s, ya, yb, fa, fb) {
    var pos = [], idx = [], n = 8, i, w = 0.035;
    for (i = 0; i <= n; i++) {
      var t = i / n, y = ya + (yb - ya) * t, f = fa + (fb - fa) * t, c = chordAt(y), ch = c[1] - c[0];
      var z = WZ + (0.012 * 4 * f * (1 - f) + naca(f, wtc(y))) * ch + 0.045, x = X(c[0] + f * ch);
      if (ya === yb) { pos.push(x, s * (y - w), z, x, s * (y + w), z); }
      else { pos.push(x + w, s * y, z, x - w, s * y, z); }
    }
    for (i = 0; i < n; i++) idx.push(2 * i, 2 * i + 2, 2 * i + 1, 2 * i + 1, 2 * i + 2, 2 * i + 3);
    var lg = geoFrom(THREE, pos, idx);
    lg.computeVertexNormals();
    g.add(new THREE.Mesh(lg, mat));
  }

  /* ---------------------------------------------------------- engines, props
     NK-12 nacelle: the big two-piece spinner carrying both propeller rows,
     the annular intake behind it, the deep cowl with the oil-cooler scoop
     under it, then the nacelle under the wing (and, inboard, the gear pod
     past the trailing edge). Distances aft of the spinner tip. */
  var FRONT = [[0.0, 0.0], [0.18, 0.26], [0.45, 0.44], [0.85, 0.56], [1.25, 0.62], [1.70, 0.68], [1.86, 0.70]];
  var PROP_U = [0.95, 1.55];
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) NAC.forEach(function (n) {
      var yc = s * n.y, x0s = wLE(n.y) - n.ahead, te = wTE(n.y), len = (te + n.pod) - x0s;
      /* the cowl is deeper than wide: the oil cooler and gearbox under it (P3, P4) */
      var cowl = [[1.88, 0.82, 1.05], [2.3, 0.95, 1.18], [3.0, 1.02, 1.25], [4.2, 1.04, 1.22], [5.6, 1.0, 1.15]];
      var aft = n.pod > 0
        ? [[len - 5.5, 0.92, 1.1], [len - 3.0, 0.82, 1.05], [len - 1.4, 0.60], [len - 0.4, 0.30], [len, 0.06]]
        : [[len - 3.5, 0.82, 1.08], [len - 1.6, 0.55], [len - 0.5, 0.30], [len, 0.08]];
      var prof = FRONT.concat(cowl, aft);
      part(THREE, g, lathe(THREE, prof, 16, X(x0s), yc, NZ, false, true), T.skin, true);
      /* the dark annular intake ring between spinner and cowl */
      part(THREE, g, lathe(THREE, [[1.84, 0.71], [1.90, 0.79]], 16, X(x0s), yc, NZ, false, false), T.ink, false);
      /* the oil-cooler scoop under the cowl: a faired box with a dark mouth */
      var sc = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.62, 0.42), T.skin);
      sc.position.set(X(x0s + 3.3), yc, NZ - 1.12);
      g.add(sc);
      var mo = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.3), T.ink);
      mo.position.set(X(x0s + 2.18), yc, NZ - 1.12);
      g.add(mo);
      addProps(THREE, g, T, X(x0s), yc, s);
    });
  }
  /* two four-blade rows turning opposite ways, stopped; the AV-60, 5.6 m */
  function addProps(THREE, g, T, xTip, yc, side) {
    var R = [0.62, 1.0, 1.6, 2.2, 2.6, PROPR], CH = [0.36, 0.54, 0.62, 0.58, 0.46, 0.24];
    var PIT = [62, 52, 42, 34, 30, 28];
    PROP_U.forEach(function (u, row) {
      var xp = xTip - u, hand = row ? -1 : 1, ph = (row ? 0 : 45) * D2R + side * 8 * D2R;
      for (var b = 0; b < 4; b++) {
        var phi = ph + b * Math.PI / 2, pos = [], idx = [], i;
        var dy = Math.cos(phi), dz = Math.sin(phi), ty = -dz, tz = dy;
        for (i = 0; i < R.length; i++) {
          var be = PIT[i] * D2R, c = CH[i];
          var cx = Math.sin(be) * hand, ct = Math.cos(be);
          var lx = -0.35 * c * cx, lt = -0.35 * c * ct, rx = 0.65 * c * cx, rt = 0.65 * c * ct;
          pos.push(xp + lx, yc + R[i] * dy + lt * ty, NZ + R[i] * dz + lt * tz);
          pos.push(xp + rx, yc + R[i] * dy + rt * ty, NZ + R[i] * dz + rt * tz);
        }
        for (i = 0; i < R.length - 1; i++) idx.push(2 * i, 2 * i + 2, 2 * i + 1, 2 * i + 1, 2 * i + 2, 2 * i + 3);
        var bg = geoFrom(THREE, pos, idx);
        bg.computeVertexNormals();
        g.add(new THREE.Mesh(bg, T.blade));
      }
    });
  }

  /* ---------------------------------------------------------- gear
     Tall: the belly 4.1 m up (P3, P4; see the header). Mains: a four-wheel bogie on a
     long leg under each inner nacelle, retracting aft into the pod; nose:
     twin wheels on a long leg behind the flight deck. */
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), s, o, q;
    gear.name = "gear";
    function wheel(R, W, x, y, z) {
      gear.add(new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 18, 1).translate(x, y, z), T.tyre));
      gear.add(new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.04, 10, 1).translate(x, y, z), T.metal));
    }
    var nzA = ZG + 0.57, ns = 9.9;
    for (s = -1; s <= 1; s += 2) wheel(0.57, 0.34, X(ns), s * 0.3, nzA);
    gear.add(taper(THREE, T.metal, [X(ns - 0.25), 0, -1.9], [X(ns), 0, nzA + 0.1], 0.17, 0.12, 8));
    gear.add(taper(THREE, T.metal, [X(ns - 0.4), -0.15, nzA], [X(ns - 0.4), 0.15, nzA], 0.06, 0.06, 6));
    gear.add(taper(THREE, T.metal, [X(ns - 2.2), 0, -1.95], [X(ns - 0.15), 0, ZG + 2.4], 0.08, 0.07, 6));
    var yi = NAC[0].y, ms = wTE(yi) - 1.6, maA = ZG + 0.75, top = NZ - 1.0;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * yi;
      for (o = -1; o <= 1; o += 2) for (q = -1; q <= 1; q += 2) wheel(0.75, 0.42, X(ms + o * 0.85), yc + q * 0.36, maA);
      gear.add(taper(THREE, T.metal, [X(ms - 1.15), yc, maA + 0.12], [X(ms + 1.15), yc, maA + 0.12], 0.11, 0.11, 6));
      gear.add(taper(THREE, T.metal, [X(ms - 0.3), yc, top], [X(ms), yc, maA + 0.2], 0.22, 0.16, 8));
      gear.add(taper(THREE, T.metal, [X(ms - 2.4), yc, top], [X(ms - 0.1), yc, maA + 1.6], 0.09, 0.08, 6));
    }
    g.add(gear);
  }

  function mergeByMaterial(THREE, root) {
    var main = { order: [], by: {} }, gear = { order: [], by: {} };
    (function walk(node, pm, inGear) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        var m = pm.clone().multiply(c.matrix);
        var ing = inGear || c.name === "gear";
        if (c.isMesh) {
          var b = ing ? gear : main, key = c.material.uuid;
          if (!b.by[key]) { b.by[key] = { mat: c.material, parts: [] }; b.order.push(key); }
          var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
          if (!geo.attributes.normal) geo.computeVertexNormals();
          geo.applyMatrix4(m);
          b.by[key].parts.push(geo);
        } else walk(c, m, ing);
      }
    })(root, new THREE.Matrix4(), false);
    function out(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var a = e.parts[k].attributes;
          P.set(a.position.array, o * 3);
          N.set(a.normal.array, o * 3);
          if (a.uv) U.set(a.uv.array, o * 2);
          o += a.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var res = new THREE.Group();
    out(main, res);
    var gr = new THREE.Group();
    gr.name = "gear";
    out(gear, gr);
    res.add(gr);
    return res;
  }

  function materials(THREE, C) {
    var t = skinSheet(THREE);
    function sk(hex) {
      var m = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.62, metalness: 0.10, side: THREE.DoubleSide });
      if (t) m.map = t;
      return m;
    }
    return {
      skin: sk(0x9b9fa3),
      pale: sk(0xb0b3b5),
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x4a5055, roughness: 0.55, metalness: 0.45, side: THREE.DoubleSide }),
      blade: new THREE.MeshStandardMaterial({ color: 0x2a2e31, roughness: 0.6, metalness: 0.3, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x0b0d0f, roughness: 0.9, metalness: 0.05, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x0a0b0c, roughness: 0.95, metalness: 0.03 }),
      red: new THREE.MeshStandardMaterial({ color: 0xb8161c, roughness: 0.7, metalness: 0.02, side: THREE.DoubleSide }),
      glass: new THREE.MeshStandardMaterial({ color: 0x1d2a31, roughness: 0.15, metalness: 0.4, side: THREE.DoubleSide })
    };
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addFuselage(THREE, g, T);
    addNose(THREE, g, T);
    addDetails(THREE, g, T);
    addDome(THREE, g, T);
    addTail(THREE, g, T);
    addWings(THREE, g, T);
    addEngines(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }
  return { build: build };
})();

/* len: the X extent, probe tip to the tail */
UNIT_MODELS["pact_e60_awacs"] = {
  len: 55.21,
  build: function (THREE, M, C) { return HeroTu126.build(THREE, M, C); }
};
