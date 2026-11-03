/* ============ ru_tu16.js -- TUPOLEV Tu-16Z BADGER, wing-to-wing tanker (HERO MODEL) ============

   One row draws it:
     pact_e50_tanker  "Tu-16Z"  (js/eras.js; service 1957, e50 only)
   Also, drawn plain (no star): pla_e90_tanker, the PLAAF's H-6U - see the note at the foot.
   sbomber_c (the H-6N) is drawn in js/models3d_east.js and is not touched here.

   THE VARIANT. The Tu-16Z (Tu-16Yu, "izdeliye NZ") was not a new build: more than a hundred
   Tu-16A bombers were converted to the wing-to-wing system from 1955 (ru.wikipedia "Tu-16",
   modifications), and they kept the bomber role (en.wikipedia "Tupolev Tu-16", variants). So the
   airframe drawn is the Tu-16A's, with the bomber's seven-gun defensive fit. The tanker streamed
   its hose from the STARBOARD wingtip (the row's desc; eras.js notes on the 1955 trials). No
   photograph of a Tu-16Z and no drawing of its wingtip hose outlet turned up on Commons,
   ru.wikipedia or airwar.ru, so NO hose fairing is drawn: the tip is the bomber's tip. (The
   earlier file hung a 6 m pod there and said itself it was unconfirmed; it is taken off.)

   REFERENCES (Wikimedia Commons, fetched for this redo at width 960, generic user agent)
     A "Tupolev Tu-16 3-view line drawing.png" (574 x 385 px): plan, front and side view. Its side
       view gives 8.42 px/m on the published 34.8 m and 10.33 m of height (published 10.355 m);
       its plan and front views are drawn narrower, 30.6 m of span against the published
       32.989 m, so every spanwise figure taken off them is multiplied by 1.077. The drawing is
       of a missile carrier (the KS-1 pylons at 7.9 m out are on it); the pylons are not drawn.
     B "Tu-16 Badger Soviet Air Force (cropped).jpg": upper side in flight: natural metal, the
       glazed nose, canopy and dorsal turret just behind it, the two nacelles running past the
       wing root trailing edge, the gear pods bulging over the wing and trailing it, two fences
       on each wing outboard of the pod, red stars on the upper wings and the fin, the tail
       gunner's glazing and the tail guns.
     C "A left underside view of a Soviet Tu-16 Badger aircraft - DPLA - f45e6555....jpeg": the
       chin radome under the glazed nose, the big round intakes, the pods, the ventral turret
       aft of the bomb bay, the teardrop side blisters near the tail, stars under the wings.
     D "Tupolev Tu-16 "Badger A", Monino, Russia, Sep93 (51584953162).jpg": front three-quarter
       on the ground: the framed nose glazing, the chin radome, the raised canopy, the dorsal
       turret, twin nose wheels set back under the cockpit, the four-wheel main bogies under
       the pods with their long doors open.
     E "Kulbakino Tu-16.jpg": head-on from below: the round intakes beside the fuselage, the
       pods and bogies, the wing's anhedral.
     F "F-14A Tomcat of VF-1 escorting two Tu-16 Badgers in 1984.JPEG": side views in flight
       (later recce variants; used only for the common outline): fin and fillet, the low
       tailplane at the fin root, the side blister, the nozzles at the wing root.
     Published figures (ru.wikipedia "Tu-16", technical data; airwar.ru): length 34.8 m, span
       32.989 m, height 10.355 m, wing area 164.65 sq m, 35 deg sweep at quarter chord, anhedral
       3 deg, track 9.775 m, wheelbase 10.913 m, 1100 x 330 main wheels on four-wheel bogies,
       twin nose wheels; AM-3 nozzles turned 4 deg outward; DT-V7 upper, DT-N7S lower and DK-7
       tail turrets (two AM-23 each) and one fixed AM-23 low on the starboard nose (7 guns);
       the radio operator's two teardrop blisters, about half screened by metal plates; the
       PRS-1 tail-warning radar above the tail gunner's glazing; the RBP-4 radar under the cabin
       floor, in a radome.

   RECOGNITION LIST (each drawn; the reference; where it shows)
     1. the long round cigar fuselage, round at the front and pinched on the sides towards the
        tail (ru.wikipedia), 2.5 m deep (A side view)              [skin loft, 34 stations]
     2. the glazed navigator's nose, framed, and the chin radome behind it (A, C, D)
                                                                     [glass, metal frames, skin]
     3. the raised two-seat canopy with its framing, the dorsal turret just behind it (B, D)
                                                                     [glass, metal, skin]
     4. the swept wing, 35 deg at quarter chord, 3 deg anhedral, planform measured off A,
        two fences a side (B)                                        [skin loft, metal fences]
     5. the AM-3s buried in the wing roots: big round intakes ahead of the leading edge beside
        the fuselage, nacelles running past the root trailing edge to nozzles turned 4 deg out
        (A, B, C, E)                                                 [skin, ink, metal]
     6. the main-gear pods: 6.8 m bodies at the 9.8 m track (14.6 to 21.4 m aft of the nose)
        that bulge over the wing and trail it by 2 m (A plan, B, C, D)  [skin]
     7. the tall swept fin with its dorsal fillet; the flat tailplane on the fin root just above
        the rear fuselage, 1.5 m over the axis (A side and front, B, F)
                                                                     [skin]
     8. the tail gunner's glazed position with the twin-gun DK-7 below it and the PRS-1 bulge
        above; the ventral turret aft of the bomb bay; the side blisters (B, C, F)
                                                                     [glass, skin, metal]
     9. retracting gear: twin nose wheels at 6.3 m, two four-wheel bogies at 17.2 m, pod doors
        open (D, E)                                                  ["gear"]
    10. natural metal, panel to panel, with the Soviet star on the fin and on both faces of
        each wing (B, C, D)                                          [canvas paint]

   CORRECTIONS TO THE EARLIER FILE (references above): the wing had a dihedral; it has a 3 deg
   anhedral. The dorsal turret sat mid-fuselage at 16 m; it is just behind the canopy, about
   7.9 m aft of the nose (B, D, F; ru.wikipedia puts it in the F-3 section over the nose-gear
   bay). The two "fences" are kept and moved out to where B shows them; the gear pods now bulge
   over the wing as B shows. The intakes started 11 m aft of the nose; A puts the lips at 9.9 m,
   and the nozzles at 20.7 m. The star on the rear fuselage is dropped: none of B-E shows one.
   The starboard wingtip pod is dropped (above). Kept as the references confirm: 34.8 m,
   33 m span, 10.36 m height, three turrets, natural metal, stars on fin and wings.

   Parking: tools/jsc/parked3d_check.js measures it; see the hand-back report for whether it
   needs an OVERSIZE entry. Markings: no bort number, no unit mark, no text. Team colour,
   exactly C.team: a small strip on each upper wingtip. Model space +X nose, +Y port, +Z up,
   metres; d below is metres aft of the nose; z = 0 is the fuselage axis, the ground z = -3.35.
   ========================================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTu16Z = (function () {
  "use strict";
  var V = null, PI = Math.PI;
  var NOSE = 17.4, GROUND = -3.35;
  function X(d) { return NOSE - d; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pl(tab, d) {
    var i;
    if (d <= tab[0][0]) return tab[0][1];
    for (i = 0; i + 1 < tab.length; i++) if (d <= tab[i + 1][0]) {
      return lerp(tab[i][1], tab[i + 1][1], (d - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    }
    return tab[tab.length - 1][1];
  }
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }

  /* ---------------- station tables (A, measured; spanwise x 1.077) ---------------- */
  /* fuselage: d, half width, half height above / below the centre, centre z, superellipse power */
  var FUS = [
    [0.00, 0.07, 0.07, 0.07, -0.20, 2.0], [0.25, 0.34, 0.33, 0.36, -0.24, 2.0], [0.70, 0.62, 0.58, 0.64, -0.27, 2.0],
    [1.30, 0.86, 0.80, 0.86, -0.25, 2.0], [2.00, 1.03, 0.98, 1.02, -0.18, 2.0], [2.80, 1.14, 1.12, 1.13, -0.09, 2.0],
    [3.80, 1.21, 1.21, 1.21, -0.03, 2.0], [5.00, 1.25, 1.25, 1.25, 0.00, 2.0], [9.00, 1.25, 1.25, 1.25, 0.00, 2.0],
    [15.0, 1.25, 1.25, 1.25, 0.00, 2.05], [19.0, 1.22, 1.25, 1.24, 0.02, 2.1], [22.0, 1.12, 1.22, 1.19, 0.06, 2.2],
    [25.0, 0.98, 1.15, 1.10, 0.13, 2.3], [27.5, 0.86, 1.08, 1.03, 0.18, 2.35], [30.0, 0.74, 0.98, 0.95, 0.20, 2.35],
    [32.0, 0.62, 0.86, 0.84, 0.30, 2.3], [33.2, 0.50, 0.72, 0.74, 0.34, 2.2], [33.8, 0.36, 0.52, 0.56, 0.36, 2.1],
    [34.05, 0.10, 0.16, 0.18, 0.38, 2.0]
  ];
  var FUS_D = [0, 0.08, 0.2, 0.4, 0.7, 1.0, 1.4, 1.8, 2.15, 2.6, 3.1, 3.7, 4.4, 5.3, 6.5, 8, 10, 12, 14, 16, 18,
               19.8, 21.5, 23, 24.5, 26, 27.5, 29, 30.5, 31.7, 32.6, 33.2, 33.6, 33.85, 34.05];
  /* wing: real y, leading-edge d, trailing-edge d, t/c */
  var WING = [[1.0, 10.63, 18.2, 0.150], [2.68, 12.0, 18.3, 0.145], [4.8, 13.75, 19.4, 0.140], [7.4, 15.86, 20.7, 0.132],
              [9.2, 17.34, 21.6, 0.126], [11.3, 18.9, 22.75, 0.120], [13.4, 20.43, 23.87, 0.115],
              [15.4, 21.9, 24.85, 0.110], [16.2, 22.6, 25.0, 0.105], [16.49, 23.35, 24.75, 0.10]];
  var ANH = Math.tan(3 * PI / 180);
  function wz(y) { return 0.25 - ANH * (Math.abs(y) - 1.0); }
  function wingAt(y) {
    var i, a, b, t; y = Math.abs(y);
    if (y <= WING[0][0]) return WING[0];
    for (i = 1; i < WING.length; i++) if (WING[i][0] >= y) {
      a = WING[i - 1]; b = WING[i]; t = (y - a[0]) / (b[0] - a[0]);
      return [y, lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];
    }
    return WING[WING.length - 1];
  }
  /* tailplane: y, LE d, TE d (A plan x 1.077), flat at z = STZ */
  var STAB = [[0.15, 27.95, 32.55], [1.08, 28.62, 32.31], [2.94, 30.52, 33.49], [4.85, 32.4, 34.3], [5.63, 33.14, 34.75]];
  var STZ = 1.5;
  /* fin: z, LE d, TE d, t/c (A side view: LE 46 deg above the fillet, tip at 6.95 m) */
  var FIN = [[0.9, 24.4, 33.45, 0.06], [1.55, 25.3, 33.5, 0.07], [2.15, 27.4, 33.6, 0.09], [2.7, 28.05, 33.65, 0.10],
             [4.5, 29.85, 33.95, 0.10], [6.35, 31.8, 34.25, 0.09], [6.85, 32.35, 34.33, 0.08], [7.0, 32.9, 34.3, 0.07]];
  /* nacelle: d, radius; centre y from 1.80 to 1.97 (4 deg out), z 0 to 0.05 */
  var ENG = [[9.9, 0.66], [10.15, 0.74], [10.6, 0.81], [11.5, 0.86], [13.5, 0.88], [16.0, 0.85], [18.0, 0.76],
             [19.5, 0.63], [20.6, 0.54]];
  function engC(d) { var t = clamp((d - 9.9) / 10.7, 0, 1); return [1.80 + 0.17 * t * t, 0.05 * t]; }
  /* gear pod: d, radius (height x 1.08) */
  var POD = [[14.6, 0.04], [14.85, 0.28], [15.35, 0.48], [16.1, 0.6], [17.0, 0.64], [19.0, 0.64], [20.0, 0.56],
             [20.7, 0.40], [21.15, 0.20], [21.4, 0.03]];
  var YP = 4.89;
  function podZ() { return wz(YP) - 0.2; }

  /* ---------------- geometry helpers ---------------- */
  function loft(rings, open) {
    var n = rings[0].length, pos = [], idx = [], i, j, r, a, b, c, d;
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) pos.push(rings[r][j][0], rings[r][j][1], rings[r][j][2]);
    for (r = 0; r + 1 < rings.length; r++) for (j = 0; j < n; j++) {
      a = r * n + j; b = r * n + (j + 1) % n; c = (r + 1) * n + j; d = (r + 1) * n + (j + 1) % n;
      idx.push(a, b, c, b, d, c);
    }
    if (!open) [0, rings.length - 1].forEach(function (e) {
      var cx = 0, cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cx += rings[e][j][0]; cy += rings[e][j][1]; cz += rings[e][j][2]; }
      var ci = pos.length / 3; pos.push(cx / n, cy / n, cz / n);
      for (j = 0; j < n; j++) { var p = e * n + j, q = e * n + (j + 1) % n; if (e === 0) idx.push(ci, q, p); else idx.push(ci, p, q); }
    });
    var vol = 0, mx = 0, my = 0, mz = 0, np = pos.length / 3;
    for (i = 0; i < np; i++) { mx += pos[3 * i]; my += pos[3 * i + 1]; mz += pos[3 * i + 2]; }
    mx /= np; my /= np; mz /= np;
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      var ax = pos[A] - mx, ay = pos[A + 1] - my, az = pos[A + 2] - mz;
      var bx = pos[B] - mx, by = pos[B + 1] - my, bz = pos[B + 2] - mz;
      var qx = pos[Cc] - mx, qy = pos[Cc + 1] - my, qz = pos[Cc + 2] - mz;
      vol += ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx);
    }
    if (vol < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a body of revolution along x: prof [d, r], centre (cy(d), cz(d)), height factor k */
  function lathe(prof, N, cfun, k, open) {
    return loft(prof.map(function (q) {
      var c = cfun(q[0]), r = Math.max(q[1], 0.004), ring = [], j;
      for (j = 0; j < N; j++) { var t = j / N * 2 * PI; ring.push([X(q[0]), c[0] + r * Math.cos(t), c[1] + r * (k || 1) * Math.sin(t)]); }
      return ring;
    }), open);
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], Ln = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, Ln, seg || 8, 1, true);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / Ln, dy / Ln, dz / Ln));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function ell(rx, ry, rz, x, y, z, ws, hs) {
    var g = new V.SphereGeometry(1, ws || 14, hs || 9);
    g.scale(rx, ry, rz); g.translate(x, y, z); return g;
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 18, 1); g.translate(x, y, z); return g; }
  function disc(r, x, y, z, n) {
    var g = new V.CircleGeometry(r, n || 18); g.rotateY(PI / 2); g.translate(x, y, z); return g;
  }
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  /* split an indexed geometry's faces between two lists by a rule on the face centre */
  function split(g, rule, A, B) {
    var ng = g.toNonIndexed(), p = ng.attributes.position.array, n = ng.attributes.normal.array, pa = [], na = [], pb = [], nb = [], t, k;
    for (t = 0; t < p.length; t += 9) {
      var cx = (p[t] + p[t + 3] + p[t + 6]) / 3, cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3, cz = (p[t + 2] + p[t + 5] + p[t + 8]) / 3;
      var to = rule(cx, cy, cz) ? [pa, na] : [pb, nb];
      for (k = 0; k < 9; k++) { to[0].push(p[t + k]); to[1].push(n[t + k]); }
    }
    function mk(P, Nn) {
      var o = new V.BufferGeometry();
      o.setAttribute("position", new V.Float32BufferAttribute(P, 3));
      o.setAttribute("normal", new V.Float32BufferAttribute(Nn, 3));
      return o;
    }
    if (pa.length) A.push(mk(pa, na));
    if (pb.length) B.push(mk(pb, nb));
  }
  /* airfoil: [chord fraction, thickness offset] around, LE first */
  function yt(f, tc) { return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f); }
  function foil(m, tc, cam) {
    var p = [], i, f;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, cam * 4 * f * (1 - f) + yt(f, tc)]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, cam * 4 * f * (1 - f) - yt(f, tc)]); }
    return p;
  }

  /* ---------------- fuselage ---------------- */
  function fusAt(d) {
    var k = 0, q, n = FUS.length;
    for (q = 0; q < n - 1; q++) if (FUS[q][0] <= d) k = q;
    var A = FUS[k], B = FUS[Math.min(k + 1, n - 1)], t = clamp((d - A[0]) / Math.max(1e-6, B[0] - A[0]), 0, 1);
    var p0 = FUS[Math.max(0, k - 1)], p3 = FUS[Math.min(n - 1, k + 2)], r = [d], c;
    for (c = 1; c < 6; c++) r.push(cr1(p0[c], A[c], B[c], p3[c], t));
    r[1] = Math.max(0.03, r[1]); r[2] = Math.max(0.03, r[2]); r[3] = Math.max(0.03, r[3]);
    return r;
  }
  function sgnp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function fusPt(s, t) {
    var e = 2 / s[5], c = Math.cos(t), sn = Math.sin(t);
    return [X(s[0]), s[1] * sgnp(c, e), s[4] + (sn >= 0 ? s[2] : s[3]) * sgnp(sn, e)];
  }
  function fusTop(d) { var s = fusAt(d); return s[4] + s[2]; }
  function fusBot(d) { var s = fusAt(d); return s[4] - s[3]; }
  function addFuselage(K) {
    var N = 28, rings = FUS_D.map(function (d) {
      var s = fusAt(d), r = [], j;
      for (j = 0; j < N; j++) r.push(fusPt(s, j / N * 2 * PI));
      return r;
    });
    /* the glazed nose (to 2.15 m, all round but the keel), and the tail gunner's glazing above the DK-7 */
    split(loft(rings), function (x, y, z) {
      var d = NOSE - x, s = fusAt(d);
      if (d < 2.12 && d > 0.05 && z > s[4] - 0.62 * s[3]) return true;
      if (d > 33.25 && z > s[4] - 0.05 && z < s[4] + 0.42) return true;
      return false;
    }, K.glass, K.skin);
    /* frames of the nose glazing: three rings and five longitudinals (D) */
    [0.55, 1.12, 1.66, 2.12].forEach(function (d) {
      var s = fusAt(d), j, a0 = -0.32 * PI, a1 = 1.32 * PI, n = 10, prev = null;
      for (j = 0; j <= n; j++) {
        var p = fusPt([s[0], s[1] + 0.02, s[2] + 0.02, s[3] + 0.02, s[4], s[5]], lerp(a0, a1, j / n));
        if (prev) K.metal.push(rod(prev, p, 0.026, 4));
        prev = p;
      }
    });
    [0.5 * PI, 0.25 * PI, 0.75 * PI, 0, PI].forEach(function (a) {
      var prev = null, d;
      for (d = 0.1; d <= 2.13; d += 0.4) {
        var s = fusAt(d), p = fusPt([d, s[1] + 0.02, s[2] + 0.02, s[3] + 0.02, s[4], s[5]], a);
        if (prev) K.metal.push(rod(prev, p, 0.024, 4));
        prev = p;
      }
    });
    K.metal.push(lathe([[0.0, 0.10], [0.05, 0.13], [0.12, 0.16]], 12, function () { return [0, -0.2]; }));   /* nose cap */
    /* the RBP-4 chin radome (A side view: 0.25 m below the keel, 2.2 to 5.4 m; C, D) */
    K.skin.push(lathe([[2.1, 0.05], [2.4, 0.36], [3.0, 0.56], [3.9, 0.62], [4.7, 0.58], [5.3, 0.38], [5.6, 0.06]], 18,
      function (d) { return [0, fusBot(d) + 0.28]; }, 0.62));
    /* the fixed AM-23 low on the starboard nose (ru.wikipedia) */
    K.skin.push(lathe([[2.2, 0.03], [2.5, 0.11], [3.6, 0.12], [4.1, 0.03]], 8, function () { return [-0.80, -0.78]; }));
    K.metal.push(rod([X(1.75), -0.80, -0.78], [X(2.3), -0.80, -0.78], 0.035, 6));
  }
  function addCanopy(K) {
    /* the pilots' canopy: a hump 0.3 m over the crown from 2.4 to 5.9 m (A, B, D) */
    var H = [[2.3, 0.0, 0.40], [2.55, 0.12, 0.55], [2.9, 0.24, 0.66], [3.4, 0.31, 0.72], [4.3, 0.33, 0.74],
             [5.0, 0.30, 0.70], [5.5, 0.20, 0.6], [5.95, 0.04, 0.45]];
    var rings = H.map(function (h) {
      var ring = [], j, n = 14, top = fusTop(h[0]);
      for (j = 0; j <= n; j++) { var a = PI * j / n; ring.push([X(h[0]), h[2] * Math.cos(a), top - 0.22 + (h[1] + 0.22) * Math.sin(a)]); }
      ring.push([X(h[0]), -h[2] * 0.6, top - 0.35]); ring.push([X(h[0]), h[2] * 0.6, top - 0.35]);
      return ring;
    });
    K.glass.push(loft(rings));
    /* bows and the windscreen frame */
    [2.55, 2.95, 3.6, 4.4, 5.2].forEach(function (d) {
      var h = [pl(H.map(function (q) { return [q[0], q[1]]; }), d), pl(H.map(function (q) { return [q[0], q[2]]; }), d)];
      var top = fusTop(d), prev = null, j, n = 6;
      for (j = 0; j <= n; j++) {
        var a = PI * j / n, p = [X(d), (h[1] + 0.02) * Math.cos(a), top - 0.22 + (h[0] + 0.24) * Math.sin(a)];
        if (prev) K.metal.push(rod(prev, p, 0.03, 4));
        prev = p;
      }
    });
    K.metal.push(rod([X(2.5), 0, fusTop(2.5) + 0.13], [X(5.6), 0, fusTop(5.6) + 0.22], 0.03, 4));
    /* the spine fairing from the canopy back over the dorsal turret ring */
    K.skin.push(lathe([[5.6, 0.05], [6.0, 0.32], [7.0, 0.38], [8.6, 0.38], [9.4, 0.2], [9.9, 0.04]], 12,
      function () { return [0, 1.13]; }, 0.45));
  }

  /* ---------------- wings, fences, team strips ---------------- */
  function wingRing(st, s) {
    var c = st[2] - st[1];
    return foil(10, st[3], 0.012).map(function (p) { return [X(st[1] + p[0] * c), s * st[0], wz(st[0]) + p[1] * c]; });
  }
  function wingSkinZ(y, f, up) {
    var w = wingAt(y), c = w[2] - w[1];
    return wz(y) + (0.012 * 4 * f * (1 - f) + up * yt(f, w[3])) * c;
  }
  function addWings(K) {
    [1, -1].forEach(function (s) {
      K.skin.push(loft(WING.map(function (st) { return wingRing(st, s); })));
      /* two fences over the upper surface, wrapping the leading edge (B) */
      [7.4, 10.6].forEach(function (y) {
        var w = wingAt(y), c = w[2] - w[1], ol = [], i;
        for (i = 0; i <= 8; i++) { var f = 0.85 * i / 8; ol.push([w[1] + f * c, wingSkinZ(y, f, 1) + 0.16 - 0.1 * (i / 8)]); }
        ol.push([w[1] + 0.85 * c, wingSkinZ(y, 0.85, 1) - 0.01]);
        for (i = 8; i >= 0; i--) { var f2 = 0.85 * i / 8; ol.push([w[1] + f2 * c, wingSkinZ(y, f2, 1) - 0.01]); }
        ol.push([w[1] - 0.04, wz(y) - 0.08]);
        var g = loft([ol.map(function (q) { return [X(q[0]), s * y + 0.02, q[1]]; }), ol.map(function (q) { return [X(q[0]), s * y - 0.02, q[1]]; })]);
        K.metal.push(g);
      });
      /* team strip: a small flat panel on the upper wing near the tip */
      var y0 = 14.5, y1 = 15.7, f0 = 0.3, f1 = 0.62, rows = [], i, j;
      for (i = 0; i <= 3; i++) {
        var y = lerp(y0, y1, i / 3), w = wingAt(y), c = w[2] - w[1], r = [];
        for (j = 0; j <= 3; j++) { var f = lerp(f0, f1, j / 3); r.push([X(w[1] + f * c), s * y, wingSkinZ(y, f, 1) + 0.025]); }
        rows.push(r);
      }
      var pos = [], ii;
      for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) {
        var a = rows[i][j], b = rows[i + 1][j], cc = rows[i + 1][j + 1], dd = rows[i][j + 1];
        [a, b, cc, a, cc, dd].forEach(function (p) { pos.push(p[0], p[1], p[2]); });
      }
      var tg = new V.BufferGeometry();
      tg.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      tg.computeVertexNormals();
      var nn = tg.attributes.normal.array;
      if (nn[2] < 0) { for (ii = 0; ii < pos.length; ii += 9) { var t3 = [pos[ii + 3], pos[ii + 4], pos[ii + 5]]; pos[ii + 3] = pos[ii + 6]; pos[ii + 4] = pos[ii + 7]; pos[ii + 5] = pos[ii + 8]; pos[ii + 6] = t3[0]; pos[ii + 7] = t3[1]; pos[ii + 8] = t3[2]; }
        tg.setAttribute("position", new V.Float32BufferAttribute(pos, 3)); tg.computeVertexNormals(); }
      K.team.push(tg);
    });
  }

  /* ---------------- tail ---------------- */
  function addTail(K) {
    K.skin.push(loft(FIN.map(function (f) {
      var c = f[2] - f[1];
      return foil(10, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; });
    })));
    /* rudder hinge strip (skin, slightly proud) left to the paint; the tailplane, flat, on the fin root */
    [1, -1].forEach(function (s) {
      K.skin.push(loft(STAB.map(function (st) {
        var c = st[2] - st[1], tc = 0.09 - 0.025 * st[0] / 5.63;
        return foil(9, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * st[0], STZ + p[1] * c]; });
      })));
    });
    /* the tail gunner's position: PRS-1 bulge above the glazing, DK-7 below with its two guns (ru.wikipedia; B, F) */
    K.skin.push(lathe([[32.75, 0.03], [33.0, 0.2], [33.5, 0.26], [33.85, 0.2], [34.0, 0.03]], 12,
      function (d) { return [0, fusTop(Math.min(d, 33.6)) - 0.08]; }, 0.7));
    K.metal.push(ell(0.36, 0.34, 0.32, X(33.82), 0, 0.02, 12, 8));
    [1, -1].forEach(function (s) {
      K.metal.push(rod([X(33.9), s * 0.13, 0.0], [X(34.8), s * 0.13, 0.0], 0.045, 6));
      K.ink.push(disc(0.03, X(34.81), s * 0.13, 0.0, 6));
    });
    /* the radio operator's teardrop blisters, about half screened (ru.wikipedia; C, F) */
    [1, -1].forEach(function (s) {
      var y = s * (fusAt(31.6)[1] - 0.06);
      K.glass.push(ell(0.75, 0.24, 0.36, X(31.6), y, 0.28, 12, 8));
      K.skin.push(ell(0.78, 0.26, 0.2, X(31.55), y, 0.12, 12, 6));
    });
  }

  /* ---------------- engines, pods, turrets ---------------- */
  function addEngines(K) {
    [1, -1].forEach(function (s) {
      var cf = function (d) { var c = engC(d); return [s * c[0], c[1]]; };
      K.skin.push(lathe(ENG, 22, cf, 1, true));
      /* the lip's inner face and the duct, dark (B, D, E) */
      K.ink.push(lathe([[9.9, 0.66], [10.05, 0.6], [10.8, 0.56]], 22, cf, 1, true));
      K.ink.push(disc(0.57, X(10.8), s * engC(10.8)[0], engC(10.8)[1], 22));
      K.metal.push(lathe([[9.88, 0.67], [9.95, 0.70], [10.05, 0.68]], 22, cf, 1, true));
      /* nozzle: a metal ring and the dark pipe */
      K.metal.push(lathe([[20.2, 0.56], [20.62, 0.53], [20.7, 0.47]], 20, cf, 1, true));
      K.ink.push(disc(0.48, X(20.55), s * engC(20.55)[0], engC(20.55)[1], 20));
      /* the main-gear pod, over and under the wing, trailing it */
      K.skin.push(lathe(POD, 18, function () { return [s * YP, podZ()]; }, 1.08));
    });
  }
  function addTurrets(K) {
    /* DT-V7 upper turret just behind the canopy, guns stowed aft (B, D, F) */
    K.skin.push(ell(0.55, 0.5, 0.32, X(7.9), 0, 1.38, 12, 7));
    K.ink.push(ell(0.4, 0.36, 0.08, X(7.9), 0, 1.66, 10, 4));
    [1, -1].forEach(function (s) { K.metal.push(rod([X(8.1), s * 0.14, 1.52], [X(9.8), s * 0.14, 1.49], 0.04, 6)); });
    /* DT-N7S lower turret aft of the bomb bay (A, C) */
    var zb = fusBot(22.6);
    K.skin.push(ell(0.55, 0.5, 0.3, X(22.6), 0, zb + 0.02, 12, 7));
    [1, -1].forEach(function (s) { K.metal.push(rod([X(22.8), s * 0.14, zb - 0.14], [X(24.4), s * 0.14, zb - 0.12], 0.04, 6)); });
  }

  /* ---------------- gear: retracting; group "gear" ---------------- */
  function addGear(G) {
    var s, o;
    /* nose: twin 900 x 275 wheels under the cockpit, set back of the radome (D) */
    var nd = 6.3, nz = GROUND + 0.45;
    [1, -1].forEach(function (k) {
      G.tyre.push(cylY(0.45, 0.27, X(nd), k * 0.24, nz, 18));
      G.leg.push(cylY(0.25, 0.29, X(nd), k * 0.24, nz, 10));
    });
    G.leg.push(rod([X(nd - 0.15), 0, fusBot(nd) + 0.1], [X(nd), 0, nz], 0.09, 8));
    G.leg.push(rod([X(nd), -0.36, nz], [X(nd), 0.36, nz], 0.05, 6));
    G.leg.push(rod([X(nd - 0.9), 0, fusBot(nd - 0.9) + 0.05], [X(nd - 0.1), 0, nz + 0.9], 0.05, 6));
    [1, -1].forEach(function (k) { G.door.push(box(2.0, 0.03, 0.75, X(nd + 0.1), k * 0.42, fusBot(nd) - 0.3)); });
    /* mains: four-wheel bogies, 1100 x 330, at the 9.775 m track, 10.9 m behind the nose wheels */
    var md = nd + 10.913, mz = GROUND + 0.55, pz = podZ() - 0.64 * 1.08;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * YP;
      for (o = -1; o <= 1; o += 2) [1, -1].forEach(function (k) {
        G.tyre.push(cylY(0.55, 0.33, X(md + o * 0.68), yc + k * 0.3, mz, 16));
        G.leg.push(cylY(0.3, 0.35, X(md + o * 0.68), yc + k * 0.3, mz, 8));
      });
      for (o = -1; o <= 1; o += 2) G.leg.push(rod([X(md + o * 0.68), yc - 0.48, mz], [X(md + o * 0.68), yc + 0.48, mz], 0.06, 6));
      G.leg.push(rod([X(md - 0.8), yc, mz + 0.05], [X(md + 0.8), yc, mz + 0.05], 0.09, 8));
      G.leg.push(rod([X(md - 0.2), yc, pz + 0.15], [X(md), yc, mz + 0.05], 0.13, 10));
      G.leg.push(rod([X(md - 1.6), yc, pz + 0.12], [X(md - 0.15), yc, mz + 0.9], 0.06, 6));
      /* the long pod doors, open (D) */
      [1, -1].forEach(function (k) { G.door.push(box(4.4, 0.03, 0.8, X(md - 0.5), yc + k * 0.42, pz - 0.32)); });
    }
  }

  /* ---------------- paint: canvas in four bands (top, port, starboard, belly) ---------------- */
  var PXM = 24, DMIN = -0.4, TWPX = 864;           /* along the aircraft */
  var PYM = 16, YMAX = 17.0, TOPH = 544;           /* across: top and belly bands */
  var PZM = 18, ZTOP = 7.2, SIDEH = 194;           /* height: side bands */
  var TH = TOPH * 2 + SIDEH * 2;
  function pxD(d) { return clamp((d - DMIN) * PXM, 1, TWPX - 1); }
  function pxY(y) { return clamp((YMAX - y) * PYM, 1, TOPH - 1); }
  function pxZ(z) { return clamp((ZTOP - z) * PZM, 1, SIDEH - 1); }
  function starPath(g, cx, cy, rx, ry, k, rot) {
    g.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = (rot || -PI / 2) + i * PI / 5, q = (i & 1) ? 0.40 : 1;
      var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
  }
  /* the Soviet star of the period photographs: red, a white border and a thin red edge (B, C) */
  function star(g, cx, cy, rx, ry, rot) {
    g.fillStyle = "#9c2a22"; starPath(g, cx, cy, rx, ry, 1.22, rot); g.fill();
    g.fillStyle = "#d8d8d2"; starPath(g, cx, cy, rx, ry, 1.12, rot); g.fill();
    g.fillStyle = "#b02a22"; starPath(g, cx, cy, rx, ry, 1.0, rot); g.fill();
  }
  /* plain: no national marking (the PLA H-6 tanker row, see the foot of the file);
     the painted sheet is cached per marking */
  var _cvBy = {}, _cv = null;
  function paint(plain) {
    var pk = plain ? "plain" : "star";
    if (_cvBy[pk]) return _cvBy[pk];
    var cv = document.createElement("canvas");
    cv.width = TWPX; cv.height = TH;
    var g = cv.getContext("2d"), sd = 4111, i, b, d, y;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    function line(x0, y0, x1, y1) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
    var BY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    /* natural metal: D and E sample #bbb9b5 / #a9b1b1, taken to about 0.85 */
    g.fillStyle = "#aaacad"; g.fillRect(0, 0, TWPX, TH);
    /* panel to panel: bare sheets differ a little in tone (B, D) */
    for (i = 0; i < 420; i++) {
      var v = R(), col = v < 0.5 ? "rgba(188,190,192," : "rgba(120,124,128,";
      g.fillStyle = col + (0.06 + R() * 0.12).toFixed(3) + ")";
      g.fillRect(Math.floor(R() * 36) * PXM, R() * TH, (0.9 + R() * 1.6) * PXM, (0.5 + R() * 1.4) * PYM);
    }
    g.lineWidth = 1;
    /* fuselage frames and stringers on every band */
    for (b = 0; b < 4; b++) {
      var o = BY[b], hh = b === 0 || b === 3 ? TOPH : SIDEH;
      g.strokeStyle = "rgba(46,50,54,0.20)";
      for (d = 2.6; d < 33.6; d += 1.05) {
        if (b === 0 || b === 3) { var hw = fusAt(d)[1] * 0.97; line(pxD(d), o + pxY(hw), pxD(d), o + pxY(-hw)); }
        else line(pxD(d), o + pxZ(fusTop(d) - 0.05), pxD(d), o + pxZ(fusBot(d) + 0.05));
      }
      g.strokeStyle = "rgba(46,50,54,0.11)";
      if (b === 0 || b === 3) { [0.45, -0.45].forEach(function (yy) { line(pxD(2.4), o + pxY(yy), pxD(33), o + pxY(yy * 0.7)); }); }
      else { [0.6, -0.4].forEach(function (zz) { line(pxD(2.4), o + pxZ(zz), pxD(33), o + pxZ(zz * 0.7 + 0.2)); }); }
    }
    /* wings, top and belly: ribs, front and rear spar, the flap and aileron lines (A) */
    [0, 3].forEach(function (bi) {
      var o = BY[bi];
      [1, -1].forEach(function (s) {
        var yy, w, c;
        g.strokeStyle = "rgba(46,50,54,0.22)";
        for (yy = 2.8; yy <= 16.3; yy += 0.9) {
          w = wingAt(yy); c = w[2] - w[1];
          line(pxD(w[1] + 0.08 * c), o + pxY(s * yy), pxD(w[1] + 0.72 * c), o + pxY(s * yy));
        }
        [0.15, 0.62, 0.74].forEach(function (f) {
          var a = wingAt(2.8), e = wingAt(16.2);
          line(pxD(a[1] + f * (a[2] - a[1])), o + pxY(s * 2.8), pxD(e[1] + f * (e[2] - e[1])), o + pxY(s * 16.2));
        });
        g.strokeStyle = "rgba(30,32,36,0.40)";
        [2.9, 7.0, 10.9, 16.0].forEach(function (yb) {                 /* flap / aileron breaks (A) */
          w = wingAt(yb); c = w[2] - w[1];
          line(pxD(w[1] + 0.74 * c), o + pxY(s * yb), pxD(w[2]), o + pxY(s * yb));
        });
        /* tailplane: elevator line */
        var ta = STAB[0], te = STAB[STAB.length - 1];
        line(pxD(ta[1] + 0.7 * (ta[2] - ta[1])), o + pxY(s * 0.6), pxD(te[1] + 0.7 * (te[2] - te[1])), o + pxY(s * 5.5));
      });
    });
    /* the fin's rudder line and a hinge on the side bands (A) */
    [1, 2].forEach(function (bi) {
      var o = BY[bi];
      g.strokeStyle = "rgba(30,32,36,0.40)";
      line(pxD(33.1), o + pxZ(1.6), pxD(33.75), o + pxZ(6.7));
      g.strokeStyle = "rgba(46,50,54,0.2)";
      [2.7, 4.0, 5.4].forEach(function (zz) { line(pxD(pl(FIN.map(function (f) { return [f[0], f[1]]; }), zz) + 0.2), o + pxZ(zz), pxD(33.0), o + pxZ(zz)); });
      /* crew door, the navigator's side windows behind the glazing, the rear crew's side windows */
      g.strokeRect(pxD(9.3), o + pxZ(-0.1), 0.8 * PXM, 0.9 * PZM);
      g.fillStyle = "rgba(24,30,34,0.85)";
      g.fillRect(pxD(2.25), o + pxZ(0.62), 0.32 * PXM, 0.28 * PZM);
      g.fillRect(pxD(2.7), o + pxZ(0.66), 0.32 * PXM, 0.28 * PZM);
      /* exhaust soot along the fuselage side behind the nozzles (F) */
      var gr = g.createLinearGradient(pxD(20.4), 0, pxD(27), 0);
      gr.addColorStop(0, "rgba(58,52,46,0.42)"); gr.addColorStop(1, "rgba(58,52,46,0)");
      g.fillStyle = gr; g.fillRect(pxD(20.4), o + pxZ(0.75), pxD(27) - pxD(20.4), pxZ(-0.85) - pxZ(0.75));
      /* the national star on both sides of the fin (B, C, D) */
      if (!plain) star(g, pxD(31.35), o + pxZ(4.25), 0.62 * PXM, 0.62 * PZM);
    });
    /* belly soot behind the nozzles */
    (function () {
      var gr = g.createLinearGradient(pxD(20.4), 0, pxD(26), 0);
      gr.addColorStop(0, "rgba(58,52,46,0.35)"); gr.addColorStop(1, "rgba(58,52,46,0)");
      g.fillStyle = gr; g.fillRect(pxD(20.4), BY[3] + pxY(1.6), pxD(26) - pxD(20.4), pxY(-1.6) - pxY(1.6));
    })();
    /* stars on both faces of each wing, outboard of the outer fence (B, C) */
    [1, -1].forEach(function (s) {
      var w = wingAt(12.6), c = w[2] - w[1], dc = w[1] + 0.5 * c;
      if (plain) return;
      star(g, pxD(dc), BY[0] + pxY(s * 12.6), 0.85 * PXM, 0.85 * PYM, PI);
      star(g, pxD(dc), BY[3] + pxY(s * 12.6), 0.85 * PXM, 0.85 * PYM, PI);
    });
    /* light grime */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(70,66,60," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TWPX, R() * TH, 6 + R() * 30, 2 + R() * 5);
    }
    _cv = _cvBy[pk] = cv;
    return cv;
  }
  var _texBy = {};
  function skinTexture(plain) {
    var pk = plain ? "plain" : "star";
    if (_texBy[pk] !== undefined) return _texBy[pk];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(plain));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _texBy[pk] = t;
    return t;
  }
  /* each face takes the band its normal looks into; UVs in 0..1 */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1, cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3;
      nz /= nl; ny /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (Math.abs(ny) > 0.05 ? (ny > 0 ? 1 : 2) : (cy >= 0 ? 1 : 2));
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U = pxD(NOSE - x), W;
        if (band === 0) W = pxY(y);
        else if (band === 3) W = TOPH + 2 * SIDEH + pxY(y);
        else W = TOPH + (band - 1) * SIDEH + pxZ(z);
        uv[(t / 3 + k) * 2] = U / TWPX;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, plain) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0", tex = skinTexture(plain);
    m.skin = new V.MeshStandardMaterial({ color: tex ? 0xffffff : 0xaaacad, map: tex || null, roughness: 0.42,
                                          metalness: 0.10, side: V.DoubleSide });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.82, metalness: 0.06, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x55595d, roughness: 0.45, metalness: 0.6, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x0c0d0e, roughness: 0.92, metalness: 0.04, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x2a3a42, roughness: 0.10, metalness: 0.5, side: V.DoubleSide,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    m.leg = new V.MeshStandardMaterial({ color: 0x7c8186, roughness: 0.45, metalness: 0.55 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x141516, roughness: 0.95, metalness: 0.02 });
    m.door = new V.MeshStandardMaterial({ color: 0x9a9c9e, roughness: 0.45, metalness: 0.15, side: V.DoubleSide });
    return m;
  }

  function build(THREE, M, C, plain) {
    V = THREE;
    var K = { skin: [], team: [], metal: [], ink: [], glass: [] }, G = { leg: [], tyre: [], door: [] };
    addFuselage(K);
    addCanopy(K);
    addWings(K);
    addTail(K);
    addEngines(K);
    addTurrets(K);
    addGear(G);
    var mats = makeMats(C, plain), root = new V.Group();
    ["skin", "team", "metal", "ink", "glass"].forEach(function (key) {
      if (!K[key].length) return;
      var geo = merge(K[key]);
      if (key === "skin") projUV(geo);
      root.add(new V.Mesh(geo, mats[key]));
    });
    var gear = new V.Group(); gear.name = "gear";
    ["leg", "tyre", "door"].forEach(function (key) { if (G[key].length) gear.add(new V.Mesh(merge(G[key]), mats[key])); });
    root.add(gear);
    return root;
  }
  return { build: build, plain: function (THREE, M, C) { return build(THREE, M, C, true); } };
})();

/* len: the measured X extent, glazed nose tip to the tail-gun muzzles */
UNIT_MODELS["pact_e50_tanker"] = {
  len: 34.8,
  build: function (THREE, M, C) { return HeroTu16Z.build(THREE, M, C); }
};

/* The PLAAF's HY-6U tanker (row pla_e90_tanker) is a Xi'an H-6, the Tu-16 built under licence
   (en.wikipedia "Xi'an H-6"), so it takes this airframe drawn plain (no star; the PLAAF
   insignia is not drawn).  A STAND-IN: the HY-6U refuels from two underwing pods, not this
   Tu-16Z's wingtip hose, and has a metal nose cone in place of the glazed nose, with the
   PV-23 fire control and the Type 244 radar deleted (the same article, aerial refuelling
   variants); none of that is drawn.  Before this the row had no model and borrowed a
   same-role peer's. */
UNIT_MODELS["pla_e90_tanker"] = {
  len: 34.8,
  build: function (THREE, M, C) { return HeroTu16Z.plain(THREE, M, C); }
};
