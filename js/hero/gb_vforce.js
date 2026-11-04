/* ============ gb_vforce.js -- the RAF's V-force tankers and the ECM-training Canberra (HERO MODELS) ============

   Three rows, one module per type, sharing one geometry kit:
     gbr_e50_tanker  "Valiant BK.1"    Vickers Valiant B(K).1 tanker, 214 Sqn (js/eras.js; service 1958)
     gbr_e60_tanker  "Victor K.1/K.2"  Handley Page Victor, drawn as the K.2 (see THE VARIANT, Victor)
     gbr_e60_ewair   "Canberra T.17"   English Electric Canberra T.17, 360 Sqn (service 1966)
   All three were drawn before this file by a same-role peer (tanker_n, the KC-46; ew_n), measured
   with render3d's modelKeyFor rules.

   Model space +X nose, +Y port, +Z up, metres; d below is metres aft of the nose; z = 0 is the
   fuselage axis of each type. One mesh per material at the root, the landing gear in a group named
   "gear" (tyres, legs, doors). No roundels, fin flashes, serials, squadron marks or lettering. Team
   colour, exactly C.team: a small panel on each upper wingtip. Paint is plain (the finishes below).
   Spanwise and chordwise figures off each drawing are scaled separately where the drawing's own
   views disagree (the method of js/hero/ru_tu16.js); each case is written down at its type.

   ==========================================================================================
   VICKERS VALIANT B(K).1 (gbr_e50_tanker)
   ------------------------------------------------------------------------------------------
   REFERENCES (Wikimedia Commons, fetched at width 960 through commons thumb.php, cached in the
   scratchpad's q_vforce_ref/)
     VA "Vickers Valiant.svg" (va_svg.png, 960 x 1269): line drawing, side view above a plan view,
        both at one x scale (each spans x 9..947). Side: body nose x 21 (a short probe ahead to x 9),
        tail cone x 947, fin top y 15; the twin nose wheel and the two tandem main wheels drawn
        at the gear stations. Plan: centreline y 772, wingtips y 288 / 1258.
     VB "Vickers Valiant B1 3-view silhouette.jpg" (va_3v.jpg): front view - the wing with no
        dihedral to be measured, the tailplane on the fin a third of the way up it.
     VC "Wikivaliant.jpg" (va_cosford.jpg): XD818 at Cosford in anti-flash white, port side,
        nearly level: the bulbous nose with the probe, the faired cockpit hump with its small
        windows, the wing-root intakes, the stance on the gear.
     VD "Vickers Valiant (27363801724).jpg" (va_front.jpg): XD818, front three-quarter: the
        "spectacle" intake slot along the root leading edge, the chin radome blister, the main
        leg standing just outboard of the intake, white overall.
     Published (en.wikipedia "Vickers Valiant", specifications B.1, after Andrews and Morgan 1988):
        length 108 ft 3 in (32.99 m), span 114 ft 4 in (34.85 m), height 32 ft 2 in (9.80 m),
        wing area 2362 sq ft; 37 deg sweep on the inner third, 21 deg outboard; four Avon RA28 in
        the wing roots; twin-wheel nose gear, tandem-wheel main gear retracting outward into the
        wing; the H2S scanner in the lower half of the nose; the tanker's Hose Drum Unit carried
        on the bomb-bay mountings, the bay doors opened to stream it.
   SCALE: side view 28.07 px/m on the 32.99 m body (x 21..947, probe excluded: with the probe the
     span-to-length ratio misses the published 1.056 by 2 per cent, without it by 0.7). The plan's
     spanwise 971 px is taken as the published span, 27.86 px/m; chordwise figures use 28.07.
   STANCE, from the drawn gear and checked on a photograph at one station: VA draws the wheels'
     bottoms at y 273, 2.95 m under the axis. In VC at the nose-gear station the belly stands
     0.385 of the local fuselage depth above the ground (35 px under a 91 px fuselage); VA gives
     1.29 m under a 3.35 m section there, also 0.385. Ground z = -2.95. That makes the parked
     height 9.20 m to the fin top against the published 9.80 m; the 0.6 m is NOT fitted (the
     published figure may be taken in another attitude; recorded, not reconciled).
   RECOGNITION LIST (each drawn; where it shows)
     1. round 3.3 m fuselage (VA side 3.31 m deep, plan 3.30 m wide), the blunt nose with the H2S
        blister below and a short probe (VA, VC, VD)                     [skin loft, metal]
     2. the faired cockpit hump, 0.45 m proud, glazed at its front (VA, VC)   [skin, glass]
     3. the shoulder wing of compound sweep, root fillet running forward to 7.8 m at the
        fuselage side, planform measured off VA plan; no dihedral (VB)    [skin loft]
     4. the four Avons buried in the roots: one long intake slot per side in the root leading
        edge (VD), two nozzles per side at the root trailing edge (VA plan) [ink, skin, metal]
     5. the tall swept fin with a dorsal fillet, the tailplane through it a third of the way up
        (VA side, VB)                                                     [skin]
     6. a chordwise fence at 10.4 m (VA plan); pitot booms at the tips (VA plan)   [metal]
     7. gear: twin nose wheels at 7.5 m, two tandem wheels a side at 14.4 / 15.6 m (VA side), the
        legs outboard of the intakes (VD)                                  ["gear"]
     8. anti-flash white overall (VC, VD)                                  [canvas paint]
   NOT CONFIRMED (estimated, not measured): the main-gear track (legs at +-4.6 m, placed by eye
     from VD: just outboard of the intake slot); the wing thickness (t/c 12.5 per cent at the root
     to 6 at the tip); the intake slot's height (0.72 m, by proportion off VD); one wheel abreast
     on each main axle (VA draws two wheels in tandem; how many abreast is not shown). The Hose
     Drum Unit is inside the bomb bay behind closed doors on the ground and is NOT drawn; only the
     bay doors' outline is painted. air_specs.js says of the B.1 row that the tailplane sits two
     thirds up the fin: VA and VB both put it a third of the way up, and that is drawn.

   ==========================================================================================
   HANDLEY PAGE VICTOR K.2 (gbr_e60_tanker)
   ------------------------------------------------------------------------------------------
   THE VARIANT. The row is "K.1/K.2", 1965-1993 (e60 to e80). The K.2 is drawn: it served from 1974
     to 1993, three times as long as the K.1/1A, and it is the tanker of the period photographs.
     A K.1 differs in the shorter span (110 ft), the smaller Sapphire intakes and no underwing
     tanks; none of that is drawn here.
   REFERENCES
     VE "Handley Page Victor 3.svg" (vi_svg.png, 960 x 1043): line drawing, side, plan and front
        views of a tanker with the nose probe, underwing tanks, the outer-wing hose pods, the rear
        ventral HDU fairing and the trailing-edge bodies. Side: nose x 27 (a pitot to x 17),
        tail cone x 678, tailplane tip x 748. Plan: centreline y 642.5, tips y 260 / 1025.
     VF "HP Victor K2.png" (vi_k2plan.png): K.2 plan silhouette - span to overall length (nose to
        tailplane tip) 837 : 820 = 1.021 against the published 117 ft / 114 ft 11 in = 1.018; the
        tanks, the hose pods near the tips and the bodies trailing the wing at about 10 m.
     VG "Victor K2 Lusty Lindy (5580797156).jpg" (vi_lindy.jpg): XL231 in hemp, port three-quarter:
        the crescent wing, the tank and the hose pod under the starboard wing, the T-tail.
     VH "Handley Page HP-80 Victor K2 AN1103895.jpg" (vi_head.jpg): head-on, taxiing: the probe on
        the nose top, the band of cockpit windows, the two big crescent intakes, eight-wheel main
        bogies (four abreast, two rows) outboard of them, twin nose wheels, the tailplane with
        strong dihedral, the bullet at the fin top, hemp overall.
     Published (en.wikipedia "Handley Page Victor"): length 114 ft 11 in (35.03 m); K.2 span
        117 ft (the B.2's 120 ft less 18 in off each tip, same article), K.2 height not given
        (30 ft 1.5 in is the B.2 figure quoted in the literature; the article's spec block is the
        B.1's, 28 ft 1.5 in); the K.2's metal nose in place of the bomb aimer's glazing.
   SCALE: VE's side and plan share one x scale (tailplane tip at x 748 in both), but its span to
     length is 765 : 721 = 1.061, against VF's 1.021 and the published 1.018. So VE is read at
     20.58 px/m along the aircraft (nose x 27 to tailplane tip x 748 = 35.03 m, the length VF's
     ratio supports) and at 21.45 px/m across it (765 px = the K.2's 35.66 m).
   TAILPLANE DIHEDRAL: VE's side view gives 1.6 m of rise over the 5.2 m semi-span (17 deg). VH,
     square on to the tailplane, gives a semi-span four times the rise (320 : 80 px): 14 deg.
     Photograph over drawing at one station: 14 deg is drawn.
   STANCE: VE draws the wheels on the line y 200, 2.96 m under the axis; the belly at the nose
     gear stands 0.78 m clear, 0.24 of the fuselage's 3.2 m width; VH gives 67 : 232 px = 0.29
     for the same ratio (a low camera, the wheels nearer it than the widest section; not
     reconciled). The drawn gear is kept: ground z = -2.96, parked height 8.41 m to the tailplane
     tips, against the B.2's 9.18 m in the literature. NOT fitted to the published figure.
   RECOGNITION LIST
     1. the deep forward fuselage and the bulbous nose, the cockpit windows in a band round its
        upper slope, K.2 metal below (VE side, VH)                         [skin loft, glass]
     2. the probe over the nose top (VE side 0.7 to 4.5 m, VH)              [metal]
     3. the crescent wing: leading edge 55 deg at the root, 47 deg mid, 36 deg outboard, measured
        off VE plan; no dihedral on the chord plane (VE front)              [skin loft]
     4. the crescent intakes in the root leading edge, one long slot each side, 0.85 m high
        (VH: 60 px against a 232 px fuselage), out to 4.9 m; the nozzles at the root trailing edge,
        two per side (VE plan)                                              [ink, skin, metal]
     5. the swept fin and the dihedral tailplane on top with its bullet (VE side, VH) [skin]
     6. the K.2's underwing tanks at 7.1 m, the Mk.20B hose pods at 13.5 m, the HDU fairing
        under the rear fuselage, the bodies trailing the wing at 9.1 m and two flap-track fairings
        (VE, VF, VG)                                                         [skin, ink]
     7. gear: twin nose wheels at 8.7 m; eight-wheel bogies, tandem rows at 15.0 / 15.9 m (VE), at
        +-5.15 m (VH: 373 px from the centre at 72.5 px/m)                   ["gear"]
     8. hemp overall (VG, VH, sampled #b9ad90 mid-tone)                     [canvas paint]
   NOT CONFIRMED: the wing thickness (16 per cent at the root to 5 at the tip); the main track
     (VH's head-on perspective may understate it); the tanks' depth (1.36 m off VE plan, 1.2 m off
     VE side, 1.3 drawn); the HDU fairing's width (0.9 m).

   ==========================================================================================
   ENGLISH ELECTRIC CANBERRA T.17 (gbr_e60_ewair)
   ------------------------------------------------------------------------------------------
   REFERENCES
     CA "English Electric Canberra B2 3-view silhouette.jpg" (ca_3v.jpg, 927 x 1281): B.2 plan,
        side and front. Side 42.84 px/m on 19.96 m; plan 40.48 px/m along, 41.98 across (its span
        and length disagree by 3.6 per cent; each is read at the published figure).
     CB "Martin B-57A Canberra 3-view line drawing.png" (ca_b57a.png): dimensioned in inches, the
        licence-built B.2 airframe: tailplane span 336 in, 10 deg tailplane dihedral, wing
        dihedral 2 deg inboard and 4 deg 21 min outboard, track 189.375 in, wing root chord 228 in,
        fuselage depth 78 in, main tyre rolling radius 18.3 in, nose tyre 10.6 in, tip tanks 170.4 in
        long and 32 in across, centred on the 767.42 in tip-to-tip line.
     CC "English Electric Canberra T17, UK - Air Force AN1155605.jpg" (ca_a1.jpg): WH664 of 360 Sqn
        side-on in flight, gear down: the T.17 nose, the cheek fairings, the canopy, tip tanks.
     CD "Canberra T17 360 Sqn at Aviano AB 1989.JPEG" (ca_aviano.jpg): WH646, side-on on the ground.
     CE "EE Canberra T17 WH863 nose (6806456188).jpg" (ca_nose.jpg): the nose close up - the black
        radome cap, a cheek fairing on each side, the small black fairing on the nose top.
     CF "WH740 English Electric Canberra T17 ... 070924.jpg" (ca_side.jpg): tip tanks, nacelle
        intakes with the starter bullet.
     Published (en.wikipedia "English Electric Canberra"): B.2 length 65 ft 6 in (19.96 m), span
        64 ft 0 in (19.51 m), height 15 ft 8 in (4.78 m); T.17: 24 B.2 conversions "with extended
        nose for sensors". No T.17 length is published in the sources fetched.
   THE T.17 NOSE, measured: CC is square on. Its own scale, 44.2 px/m, comes from the B.2's 15.0 m
     from the nacelle lip to the tail tip (663 px), and agrees with its fuselage depth (87 px for
     78 in = 43.9). Nose tip to nacelle lip: 294 px = 6.65 m (the B.2 has 4.95). CD gives the same
     within its resolution. Aft of the lip the B.2 drawing is used, moved back 1.70 m; length
     21.66 m (NOT a published figure). The two photographs put the canopy 3.5 m ahead of the lip,
     CA 2.8 m: the photographs' figure is drawn.
   STANCE: CB's gear and CD agree: the belly clears the ground by 0.68 / 0.70 m at the nose-wheel
     station (CB 32 px under a 78 in fuselage; CD 27 : 78 px). Ground z = -1.66; height to the fin
     top 4.74 m against the published 4.78 m.
   RECOGNITION LIST
     1. the 1.98 m round fuselage, the T.17's long drooped nose with its black radome cap, the cheek
        fairings and the little fairing on top (CC, CE)                    [skin, ink]
     2. the B.2 fighter-type canopy over the cockpit (CC, CD)               [glass]
     3. the straight wing, 5.79 m root chord, constant chord to the nacelles, tapered outboard;
        2 deg / 4.35 deg dihedral (CA plan, CB)                              [skin loft]
     4. the Avon nacelles through the wing at 3.05 m (CA front), the intake ring and starter bullet
        (CF), the jet pipes (CC)                                             [skin, ink, metal]
     5. the tip tanks, 4.33 m by 0.81 m (CB; fitted in CC, CD, CF)          [skin]
     6. the fin with its square top and the tailplane, 10 deg dihedral, low on the tail (CA, CB)
     7. gear: twin nose wheels at 4.7 m, single mains at 9.1 m on a 4.81 m track (CC, CB) ["gear"]
     8. paint: one plain dark sea grey; the 360 Sqn disruptive green is NOT drawn (no camouflage
        patterns); the radome black (CE)                                    [canvas paint]
   NOT CONFIRMED: the T.17's overall length (measured, above); the wing thickness (12 to 8 per cent);
     the nose's plan width (0.7 m half width, from CE by eye); the cheek fairing and top fairing
     sizes; the T.17's jammer aerials, chaff dispensers and the tail-warning radar fairing.
   ========================================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroVForce = (function () {
  "use strict";
  var V = null, PI = Math.PI, NOSE = 0;
  function X(d) { return NOSE - d; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function pl(tab, x, col) {
    var i, c = col || 1;
    if (x <= tab[0][0]) return tab[0][c];
    for (i = 0; i + 1 < tab.length; i++) if (x <= tab[i + 1][0]) {
      return lerp(tab[i][c], tab[i + 1][c], (x - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    }
    return tab[tab.length - 1][c];
  }

  /* ---------------- geometry kit (js/hero/ru_tu16.js) ---------------- */
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
  function at(y, z) { return function () { return [y, z]; }; }
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
  /* a sheet through a grid of points (double-sided materials) */
  function sheet(rows) {
    var pos = [], i, j;
    for (i = 0; i + 1 < rows.length; i++) for (j = 0; j + 1 < rows[i].length; j++) {
      [rows[i][j], rows[i + 1][j], rows[i + 1][j + 1], rows[i][j], rows[i + 1][j + 1], rows[i][j + 1]].forEach(function (p) {
        pos.push(p[0], p[1], p[2]);
      });
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function chain(K, pts, r) { for (var i = 0; i + 1 < pts.length; i++) K.push(rod(pts[i], pts[i + 1], r, 5)); }
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
  function split(g, rule, A, B) {
    var ng = g.index ? g.toNonIndexed() : g, p = ng.attributes.position.array, n = ng.attributes.normal.array;
    var pa = [], na = [], pb = [], nb = [], t, k;
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
  function yt(f, tc) { return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f); }
  function foil(m, tc, cam) {
    var p = [], i, f;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, cam * 4 * f * (1 - f) + yt(f, tc)]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, cam * 4 * f * (1 - f) - yt(f, tc)]); }
    return p;
  }

  /* ---------------- the type-independent parts ---------------- */
  /* fuselage table rows [d, half width, top z, bottom z, superellipse power] */
  function Fus(rows) {
    var T = rows.map(function (r) { return [r[0], r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, (r[2] + r[3]) / 2, r[4] || 2]; });
    function atD(d) {
      var k = 0, q, n = T.length;
      for (q = 0; q < n - 1; q++) if (T[q][0] <= d) k = q;
      var A = T[k], B = T[Math.min(k + 1, n - 1)], t = clamp((d - A[0]) / Math.max(1e-6, B[0] - A[0]), 0, 1);
      var p0 = T[Math.max(0, k - 1)], p3 = T[Math.min(n - 1, k + 2)], r = [d], c;
      for (c = 1; c < 6; c++) r.push(cr1(p0[c], A[c], B[c], p3[c], t));
      r[1] = Math.max(0.03, r[1]); r[2] = Math.max(0.03, r[2]); r[3] = Math.max(0.03, r[3]);
      return r;
    }
    function sg(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
    function pt(s, t) {
      var e = 2 / s[5], c = Math.cos(t), sn = Math.sin(t);
      return [X(s[0]), s[1] * sg(c, e), s[4] + (sn >= 0 ? s[2] : s[3]) * sg(sn, e)];
    }
    var L = T[T.length - 1][0];
    return {
      at: atD, pt: pt, L: L,
      top: function (d) { var s = atD(d); return s[4] + s[2]; },
      bot: function (d) { var s = atD(d); return s[4] - s[3]; },
      hw: function (d) { return atD(d)[1]; },
      geo: function () {
        var D = [], d = 0, N = 28;
        [0, 0.04, 0.1, 0.2, 0.35, 0.55, 0.8, 1.1, 1.45].forEach(function (v) { D.push(v); });
        for (d = 1.9; d < L - 1.2; d += 0.55) D.push(d);
        [L - 1.2, L - 0.8, L - 0.5, L - 0.25, L - 0.1, L].forEach(function (v) { D.push(v); });
        return loft(D.map(function (dd) {
          var s = atD(dd), r = [], j;
          for (j = 0; j < N; j++) r.push(pt(s, j / N * 2 * PI));
          return r;
        }));
      }
    };
  }
  /* wing rows [y, LE d, TE d, t/c]; wz(y) the chord-plane height */
  function Wing(rows, wz, cam) {
    function atY(y) {
      var i, a, b, t; y = Math.abs(y);
      if (y <= rows[0][0]) return rows[0];
      for (i = 1; i < rows.length; i++) if (rows[i][0] >= y) {
        a = rows[i - 1]; b = rows[i]; t = (y - a[0]) / (b[0] - a[0]);
        return [y, lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];
      }
      return rows[rows.length - 1];
    }
    return {
      rows: rows, at: atY, wz: wz, tip: rows[rows.length - 1][0],
      skinZ: function (y, f, up) {
        var w = atY(y), c = w[2] - w[1];
        return wz(y) + ((cam || 0) * 4 * f * (1 - f) + up * yt(f, w[3])) * c;
      },
      geo: function (s) {
        return loft(rows.map(function (st) {
          var c = st[2] - st[1];
          return foil(10, st[3], cam || 0).map(function (p) { return [X(st[1] + p[0] * c), s * st[0], wz(st[0]) + p[1] * c]; });
        }));
      }
    };
  }
  /* a fin: rows [z, LE d, TE d, t/c] */
  function finGeo(rows) {
    return loft(rows.map(function (f) {
      var c = f[2] - f[1];
      return foil(10, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; });
    }));
  }
  /* a tailplane half: rows [y, LE d, TE d], root height z0, dihedral (deg), t/c root and tip */
  function stabGeo(rows, s, z0, dih, tc0, tc1) {
    var tn = Math.tan(dih * PI / 180), y1 = rows[rows.length - 1][0];
    return loft(rows.map(function (st) {
      var c = st[2] - st[1], tc = lerp(tc0, tc1, st[0] / y1);
      return foil(9, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * st[0], z0 + tn * st[0] + p[1] * c]; });
    }));
  }
  /* the team panel on an upper wing near the tip: a 3 x 3 patch a few cm over the skin */
  function teamPanel(K, W, s, y0, y1, f0, f1) {
    var rows = [], i, j;
    for (i = 0; i <= 3; i++) {
      var y = lerp(y0, y1, i / 3), w = W.at(y), c = w[2] - w[1], r = [];
      for (j = 0; j <= 3; j++) { var f = lerp(f0, f1, j / 3); r.push([X(w[1] + f * c), s * y, W.skinZ(y, f, 1) + 0.05]); }
      rows.push(r);
    }
    K.team.push(sheet(rows));
  }
  /* a root intake slot in the leading edge: the dark mouth just ahead of the LE between y0 and y1,
     H high, centred on the chord plane, with a lip round it */
  function intakeSlot(K, W, s, y0, y1, H, dz) {
    var nu = 14, nv = 6, rows = [], top = [], bot = [], i, j;
    for (i = 0; i <= nu; i++) {
      var y = lerp(y0, y1, i / nu), u = 2 * i / nu - 1, h = 0.5 * H * Math.pow(Math.max(0, 1 - Math.pow(Math.abs(u), 4)), 0.25);
      var le = W.at(y)[1], zc = W.wz(y) + (dz || 0), r = [];
      for (j = 0; j <= nv; j++) r.push([X(le - 0.05), s * y, zc - h + 2 * h * j / nv]);
      rows.push(r);
      top.push([X(le - 0.09), s * y, zc + h + 0.02]); bot.push([X(le - 0.09), s * y, zc - h - 0.02]);
    }
    K.ink.push(sheet(rows));
    chain(K.skin, top, 0.06); chain(K.skin, bot, 0.06);
  }
  /* a nozzle at the trailing edge: a short fairing, a metal rim and the dark pipe */
  function nozzle(K, d0, d1, y, z, r) {
    K.skin.push(lathe([[d0, r * 0.6], [d0 + 0.3, r + 0.06], [d1 - 0.1, r + 0.05], [d1, r + 0.02]], 16, at(y, z), 1, true));
    K.metal.push(lathe([[d1 - 0.05, r + 0.03], [d1, r], [d1 + 0.02, r - 0.03]], 16, at(y, z), 1, true));
    K.ink.push(disc(r - 0.02, X(d1 - 0.12), y, z, 16));
  }
  function wheelPair(G, d, y, z, r, w, gap) {
    [1, -1].forEach(function (k) {
      G.tyre.push(cylY(r, w, X(d), y + k * gap, z, 18));
      G.leg.push(cylY(r * 0.55, w + 0.02, X(d), y + k * gap, z, 10));
    });
    G.leg.push(rod([X(d), y - gap - w / 2, z], [X(d), y + gap + w / 2, z], 0.05, 6));
  }

  /* ---------------- paint: a tiled sheet per finish, laid on by the face normal ---------------- */
  var _tex = {};
  function sheetTex(key, base, line, seed) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var S = 256, cv = document.createElement("canvas"); cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), sd = seed, i;
      function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
      g.fillStyle = base; g.fillRect(0, 0, S, S);
      for (i = 0; i < 70; i++) {
        g.fillStyle = (R() < 0.5 ? "rgba(255,255,255," : "rgba(0,0,0,") + (0.02 + R() * 0.04).toFixed(3) + ")";
        g.fillRect(Math.floor(R() * 8) * 32, Math.floor(R() * 16) * 16, 32 + R() * 48, 16);
      }
      g.strokeStyle = line; g.lineWidth = 1;
      for (i = 0; i < S; i += 32) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      for (i = 0; i < S; i += 16) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
      t = new V.CanvasTexture(cv);
      t.wrapS = t.wrapT = V.RepeatWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* 32 px panels = 1.6 m along, 0.8 m across: 1 texture repeat = 8 m */
  function boxUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], a, b;
        if (nz >= nx && nz >= ny) { a = x; b = y; } else if (ny >= nx) { a = x; b = z; } else { a = y; b = z; }
        uv[(t / 3 + k) * 2] = a / 12.8; uv[(t / 3 + k) * 2 + 1] = b / 4.8;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }
  function makeMats(C, F) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0", tex = sheetTex(F.key, F.base, F.line, F.seed);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: tex ? 0xffffff : F.base, map: tex || null, roughness: F.rough,
                                          metalness: F.metal, side: V.DoubleSide });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.82, metalness: 0.06, side: V.DoubleSide,
                                          polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    m.metal = new V.MeshStandardMaterial({ color: 0x55595d, roughness: 0.45, metalness: 0.6, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x0d0e0f, roughness: 0.9, metalness: 0.04, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x24343c, roughness: 0.10, metalness: 0.5, side: V.DoubleSide,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    m.leg = new V.MeshStandardMaterial({ color: F.leg || 0x8a8d90, roughness: 0.45, metalness: 0.5 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x141516, roughness: 0.95, metalness: 0.02 });
    m.door = new V.MeshStandardMaterial({ color: F.door, roughness: 0.5, metalness: 0.1, side: V.DoubleSide });
    return m;
  }
  function assemble(K, G, C, F) {
    var mats = makeMats(C, F), root = new V.Group();
    ["skin", "team", "metal", "ink", "glass"].forEach(function (key) {
      if (!K[key].length) return;
      var geo = merge(K[key]);
      if (key === "skin") boxUV(geo);
      root.add(new V.Mesh(geo, mats[key]));
    });
    var gear = new V.Group(); gear.name = "gear";
    ["leg", "tyre", "door"].forEach(function (key) { if (G[key].length) gear.add(new V.Mesh(merge(G[key]), mats[key])); });
    root.add(gear);
    return root;
  }
  function kits() { return [{ skin: [], team: [], metal: [], ink: [], glass: [] }, { leg: [], tyre: [], door: [] }]; }

  /* ======================================================================================
     VALIANT B(K).1 - VA side 28.07 px/m (z = (190.5 - y) / 28.07), plan 27.86 px/m across
     ====================================================================================== */
  var VAL = (function () {
    var F = Fus([
      [0.00, 0.10, 0.28, -0.30], [0.14, 0.38, 0.34, -0.66], [0.43, 0.62, 0.36, -0.91], [0.71, 0.74, 0.48, -1.06],
      [1.00, 0.88, 0.66, -1.16], [1.39, 1.03, 0.80, -1.27], [2.10, 1.22, 1.05, -1.44], [2.81, 1.36, 1.19, -1.51],
      [3.53, 1.46, 1.44, -1.58], [4.24, 1.54, 1.55, -1.60], [5.00, 1.62, 1.62, -1.63], [6.40, 1.65, 1.66, -1.66],
      [18.0, 1.62, 1.66, -1.66], [19.9, 1.58, 1.55, -1.66], [21.34, 1.54, 1.48, -1.62], [22.76, 1.47, 1.40, -1.55],
      [24.19, 1.36, 1.35, -1.41], [25.61, 1.18, 1.26, -1.19], [27.04, 0.97, 1.13, -1.01], [28.46, 0.80, 0.98, -0.80],
      [29.89, 0.63, 0.87, -0.59], [31.31, 0.42, 0.66, -0.37], [32.03, 0.32, 0.52, -0.27], [32.74, 0.20, 0.30, -0.16],
      [32.99, 0.05, 0.12, 0.02]
    ]);
    /* VA plan: y (x 27.86 px/m), LE and TE d (28.07 px/m); the chord plane at z 0.75, flat (VB) */
    var W = Wing([
      [1.20, 7.80, 18.45, 0.125], [1.65, 7.80, 18.45, 0.125], [2.30, 8.55, 18.45, 0.12], [3.16, 9.30, 18.45, 0.118],
      [4.02, 10.37, 18.45, 0.115], [4.88, 11.22, 18.60, 0.11], [5.74, 12.01, 18.70, 0.105], [6.60, 12.61, 18.85, 0.10],
      [8.76, 13.64, 19.17, 0.095], [10.91, 14.64, 19.49, 0.09], [13.07, 15.68, 19.77, 0.085], [15.22, 16.67, 20.09, 0.08],
      [16.51, 17.28, 20.31, 0.075], [17.10, 17.60, 20.25, 0.07], [17.35, 18.00, 20.00, 0.06], [17.42, 18.60, 19.60, 0.05]
    ], function () { return 0.75; }, 0.01);
    /* fin (VA side): LE 26.3 m at z 2.0 to 29.8 m at the 6.22 m top; the TE nearly upright */
    var FIN = [[0.9, 23.6, 31.85, 0.05], [1.4, 24.9, 31.88, 0.06], [2.0, 26.3, 31.95, 0.075], [4.0, 27.97, 32.05, 0.08],
               [6.0, 29.63, 32.15, 0.07], [6.22, 29.95, 32.1, 0.06]];
    /* tailplane (VA plan), through the fin at z 2.87 (VA side y 110), flat (VB) */
    var STAB = [[0.10, 27.0, 30.8], [1.29, 27.47, 30.89], [2.73, 28.29, 31.21], [4.16, 29.07, 31.53], [5.60, 29.89, 31.85],
                [5.90, 30.10, 31.90], [6.03, 30.6, 31.75]];
    var GROUND = -2.95;

    function build(C) {
      var kk = kits(), K = kk[0], G = kk[1];
      /* fuselage; the cockpit hump; the nose blister is in the loft (the deep lower nose) */
      K.skin.push(F.geo());
      var H = [[3.20, 0.00, 0.40], [3.45, 0.18, 0.62], [3.80, 0.33, 0.72], [4.30, 0.42, 0.76], [4.90, 0.45, 0.76],
               [5.60, 0.40, 0.72], [6.40, 0.25, 0.62], [7.10, 0.10, 0.48], [7.60, 0.0, 0.32]];
      var hump = loft(H.map(function (h) {
        var ring = [], j, n = 14, top = F.top(h[0]);
        for (j = 0; j <= n; j++) { var a = PI * j / n; ring.push([X(h[0]), h[2] * Math.cos(a), top - 0.25 + (h[1] + 0.25) * Math.sin(a)]); }
        ring.push([X(h[0]), -h[2] * 0.7, top - 0.4]); ring.push([X(h[0]), h[2] * 0.7, top - 0.4]);
        return ring;
      }));
      /* the windscreen and the small windows at the hump's front (VA, VC) */
      split(hump, function (x, y, z) { var d = NOSE - x; return d < 4.15 && d > 3.3 && z > F.top(d) + 0.05; }, K.glass, K.skin);
      [3.4, 3.75, 4.12].forEach(function (d) {
        var h = [pl(H, d, 1), pl(H, d, 2)], top = F.top(d), prev = null, j;
        for (j = 1; j < 6; j++) {
          var a = PI * j / 6, p = [X(d), (h[1] + 0.02) * Math.cos(a), top - 0.25 + (h[0] + 0.27) * Math.sin(a)];
          if (prev) K.metal.push(rod(prev, p, 0.025, 4));
          prev = p;
        }
      });
      /* the probe at the nose tip (VA x 9..21, VC) */
      K.metal.push(rod([X(-0.43), 0, 0.23], [X(0.15), 0, 0.23], 0.05, 8));
      K.metal.push(lathe([[-0.47, 0.02], [-0.43, 0.075], [-0.36, 0.065]], 8, at(0, 0.23)));
      /* wings: intakes, nozzles, fence, pitot, team panel */
      [1, -1].forEach(function (s) {
        K.skin.push(W.geo(s));
        intakeSlot(K, W, s, 1.72, 4.30, 0.72, -0.05);
        nozzle(K, 17.9, 18.85, s * 2.65, 0.62, 0.34);
        nozzle(K, 17.9, 18.85, s * 3.60, 0.62, 0.34);
        var y = 10.43, w = W.at(y), c = w[2] - w[1], ol = [], i;
        for (i = 0; i <= 6; i++) { var f = 0.42 * i / 6; ol.push([w[1] + f * c, W.skinZ(y, f, 1) + 0.13 - 0.07 * i / 6]); }
        for (i = 6; i >= 0; i--) { var f2 = 0.42 * i / 6; ol.push([w[1] + f2 * c, W.skinZ(y, f2, 1) - 0.01]); }
        K.metal.push(loft([ol.map(function (q) { return [X(q[0]), s * y + 0.015, q[1]]; }),
                           ol.map(function (q) { return [X(q[0]), s * y - 0.015, q[1]]; })]));
        K.metal.push(rod([X(16.1), s * 17.07, 0.75], [X(17.75), s * 17.07, 0.75], 0.035, 6));
        teamPanel(K, W, s, 15.2, 16.4, 0.3, 0.62);
      });
      /* tail */
      K.skin.push(finGeo(FIN));
      [1, -1].forEach(function (s) { K.skin.push(stabGeo(STAB, s, 2.87, 0, 0.08, 0.06)); });
      /* gear: twin nose wheels at 7.52 m; mains two wheels in tandem at 14.4 / 15.57 m, legs at +-4.6 m */
      var nd = 7.52, nr = 0.45, nz = GROUND + nr;
      wheelPair(G, nd, 0, nz, nr, 0.26, 0.2);
      G.leg.push(rod([X(nd - 0.25), 0, F.bot(nd) + 0.15], [X(nd), 0, nz], 0.1, 8));
      G.leg.push(rod([X(nd - 1.1), 0, F.bot(nd - 1.1) + 0.1], [X(nd - 0.15), 0, nz + 0.7], 0.05, 6));
      [1, -1].forEach(function (k) { G.door.push(box(2.2, 0.03, 0.7, X(nd - 0.3), k * 0.45, F.bot(nd) - 0.3)); });
      [1, -1].forEach(function (s) {
        var yc = s * 4.6, mr = 0.57, mz = GROUND + mr, wl = W.skinZ(4.6, 0.55, -1);
        [14.4, 15.57].forEach(function (d) {
          G.tyre.push(cylY(mr, 0.3, X(d), yc, mz, 18));
          G.leg.push(cylY(mr * 0.55, 0.32, X(d), yc, mz, 10));
          G.leg.push(rod([X(d), yc - 0.22, mz], [X(d), yc + 0.22, mz], 0.05, 6));
        });
        G.leg.push(rod([X(14.4), yc + s * 0.2, mz], [X(15.57), yc + s * 0.2, mz], 0.07, 6));
        G.leg.push(rod([X(14.98), yc + s * 0.2, wl], [X(14.98), yc + s * 0.2, mz + 0.05], 0.13, 10));
        G.leg.push(rod([X(13.8), yc, wl], [X(14.9), yc + s * 0.2, mz + 1.1], 0.06, 6));
        /* the bay door, open, hanging from the bay's outer edge */
        G.door.push(box(2.6, 0.03, 0.9, X(15.0), s * 5.25, wl - 0.45));
      });
      return assemble(K, G, C, { key: "valiant", base: "#e3e3dd", line: "rgba(70,74,78,0.16)", seed: 3301,
                                 rough: 0.4, metal: 0.05, door: 0xdcdcd6, leg: 0x9a9da0 });
    }
    return { build: build };
  })();

  /* ======================================================================================
     VICTOR K.2 - VE side 20.58 px/m along (z = (139 - y) / 20.58), 21.45 px/m across
     ====================================================================================== */
  var VIC = (function () {
    var F = Fus([
      [0.00, 0.07, -0.48, -0.58], [0.50, 0.40, -0.29, -0.78], [1.00, 0.70, -0.05, -0.92], [1.50, 0.87, 0.19, -1.12],
      [2.50, 1.21, 0.68, -1.46], [3.50, 1.42, 1.21, -1.75], [4.30, 1.50, 1.55, -1.94], [5.20, 1.56, 1.60, -2.11],
      [6.50, 1.61, 1.60, -2.21], [8.00, 1.60, 1.60, -2.19], [9.50, 1.58, 1.60, -2.09], [10.8, 1.56, 1.60, -1.75],
      [12.0, 1.55, 1.60, -1.55], [19.0, 1.52, 1.60, -1.55], [24.0, 1.52, 1.60, -1.51], [25.5, 1.42, 1.55, -1.43],
      [27.0, 1.19, 1.41, -1.31], [28.5, 0.85, 1.24, -1.12], [29.6, 0.70, 1.12, -0.87], [30.5, 0.55, 0.87, -0.63],
      [31.2, 0.38, 0.58, -0.34], [31.63, 0.12, 0.29, -0.05]
    ]);
    var WZ = -0.35;
    var W = Wing([
      [1.20, 5.60, 18.60, 0.16], [1.60, 5.60, 18.60, 0.16], [1.98, 6.61, 18.56, 0.16], [2.45, 7.58, 18.60, 0.158],
      [2.91, 8.45, 18.62, 0.155], [3.38, 9.14, 18.64, 0.15], [3.85, 9.62, 18.65, 0.145], [4.31, 9.96, 18.66, 0.14],
      [4.78, 10.35, 18.85, 0.135], [5.24, 10.98, 19.05, 0.13], [6.40, 12.24, 19.55, 0.12], [7.58, 13.51, 20.12, 0.11],
      [8.51, 14.48, 20.51, 0.10], [10.37, 15.84, 21.28, 0.09], [12.24, 17.10, 21.96, 0.085], [14.10, 18.42, 22.64, 0.08],
      [15.97, 19.68, 23.32, 0.075], [16.90, 20.31, 23.66, 0.07], [17.45, 20.85, 23.62, 0.065], [17.75, 21.50, 23.30, 0.06],
      [17.83, 22.10, 22.80, 0.05]
    ], function () { return WZ; }, 0.008);
    /* fin (VE side): LE 26.0 m at z 2.09 to 28.0 m at the 4.1 m top; TE 29.6 m at z 1.12 to 31.9 m */
    var FIN = [[1.0, 25.0, 29.5, 0.08], [2.09, 26.02, 30.37, 0.075], [4.1, 27.96, 31.95, 0.065], [4.25, 28.4, 31.7, 0.06]];
    /* tailplane (VE plan) on the fin top, 14 deg dihedral (VH) */
    var STAB = [[0.15, 28.0, 32.95], [1.61, 30.42, 33.48], [3.01, 32.12, 34.16], [4.41, 33.33, 34.60], [4.97, 34.0, 34.9],
                [5.24, 34.75, 35.03]];
    var GROUND = -2.96;

    function build(C) {
      var kk = kits(), K = kk[0], G = kk[1];
      /* fuselage; the cockpit windows in a band round the upper nose (VH; the K.2's chin is metal) */
      split(F.geo(), function (x, y, z) {
        var d = NOSE - x, s = F.at(d);
        return d > 1.9 && d < 4.35 && z > F.top(d) - 0.62 && z < F.top(d) - 0.08 && Math.abs(y) < s[1] * 0.92;
      }, K.glass, K.skin);
      /* window posts across the band */
      [2.2, 2.75, 3.3, 3.85].forEach(function (d) {
        var s = F.at(d), j, prev = null;
        for (j = 0; j <= 8; j++) {
          var a = lerp(0.12 * PI, 0.88 * PI, j / 8), p = F.pt([d, s[1] + 0.02, s[2] + 0.02, s[3] + 0.02, s[4], s[5]], a);
          if (prev && p[2] > F.top(d) - 0.65) K.metal.push(rod(prev, p, 0.022, 4));
          prev = p;
        }
      });
      /* the probe over the nose top (VE 0.73 to 4.5 m at z 1.31, VH) */
      K.metal.push(rod([X(0.85), 0, 1.31], [X(4.6), 0, 1.45], 0.06, 8));
      K.metal.push(lathe([[0.62, 0.02], [0.70, 0.10], [0.85, 0.08]], 10, at(0, 1.31)));
      K.metal.push(rod([X(4.3), 0, 1.44], [X(4.6), 0, F.top(4.6) - 0.02], 0.08, 6));
      /* the two small air scoops on the spine behind the cockpit (VH) */
      [1, -1].forEach(function (s) {
        K.skin.push(lathe([[5.4, 0.03], [5.6, 0.16], [6.6, 0.18], [7.0, 0.05]], 10, at(s * 0.55, F.top(6.2) - 0.02), 0.9));
        K.ink.push(disc(0.11, X(5.58), s * 0.55, F.top(6.2) + 0.03, 10));
      });
      /* wings, intakes, nozzles, tanks, hose pods, trailing bodies, pitots, team panels */
      [1, -1].forEach(function (s) {
        K.skin.push(W.geo(s));
        intakeSlot(K, W, s, 1.66, 4.9, 0.85, 0);
        nozzle(K, 18.0, 18.95, s * 2.4, WZ - 0.05, 0.40);
        nozzle(K, 18.0, 18.95, s * 3.47, WZ - 0.05, 0.40);
        /* underwing tank (VE plan y 7.1 m, 1.3 m across; VE side d 10.1 to 17.1) on a pylon */
        var tz = W.skinZ(7.1, 0.5, -1) - 0.70;
        K.skin.push(lathe([[10.1, 0.04], [10.3, 0.30], [10.8, 0.52], [11.6, 0.64], [12.6, 0.66], [14.8, 0.64],
                           [16.0, 0.52], [16.8, 0.28], [17.1, 0.05]], 18, at(s * 7.1, tz)));
        K.skin.push(box(3.2, 0.16, 0.5, X(14.6), s * 7.1, W.skinZ(7.1, 0.3, -1) - 0.18));
        /* the Mk.20B hose pod (VE plan y 13.5 m; side d 16.3 to 19.8): pointed nose, the drogue's mouth aft */
        var py = 13.5, pz = W.skinZ(py, 0.4, -1) - 0.45;
        K.skin.push(lathe([[16.25, 0.02], [16.5, 0.16], [17.0, 0.30], [17.6, 0.35], [19.2, 0.35], [19.8, 0.30]], 14, at(s * py, pz), 1, true));
        K.ink.push(disc(0.27, X(19.75), s * py, pz, 14));
        K.metal.push(rod([X(16.0), s * py, pz], [X(16.3), s * py, pz], 0.025, 5));
        K.skin.push(box(1.6, 0.12, 0.3, X(18.2), s * py, pz + 0.38));
        /* the body trailing the wing at 9.1 m (VE plan, VF), and two flap-track fairings */
        K.skin.push(lathe([[18.6, 0.04], [19.4, 0.36], [20.4, 0.52], [21.2, 0.48], [22.6, 0.26], [23.7, 0.03]], 14,
          at(s * 9.1, W.skinZ(9.1, 0.8, -1) + 0.02), 0.6));
        [[5.7, 16.7, 19.3], [7.8, 17.4, 20.1]].forEach(function (q) {
          var w = W.at(q[0]), fz = W.skinZ(q[0], 0.85, -1);
          K.skin.push(lathe([[q[1] + 1.2, 0.03], [q[1] + 1.8, 0.18], [w[2] - 0.2, 0.2], [q[2], 0.03]], 10, at(s * q[0], fz), 0.8));
        });
        K.metal.push(rod([X(18.2), s * 17.1, WZ], [X(20.6), s * 17.1, WZ], 0.04, 6));
        teamPanel(K, W, s, 15.6, 16.8, 0.3, 0.62);
      });
      /* tail: fin, the dihedral tailplane, the fin-top bullet, the tail cone */
      K.skin.push(finGeo(FIN));
      [1, -1].forEach(function (s) { K.skin.push(stabGeo(STAB, s, 4.15, 14, 0.08, 0.06)); });
      K.skin.push(lathe([[27.3, 0.03], [27.7, 0.15], [28.6, 0.24], [31.5, 0.24], [32.6, 0.18], [33.2, 0.04]], 14, at(0, 4.18)));
      /* the HDU fairing under the rear fuselage (VE side d 20.55 to 22.0, 0.4 m deep) */
      K.skin.push(lathe([[20.4, 0.05], [20.7, 0.38], [21.5, 0.45], [22.0, 0.3], [22.25, 0.05]], 14,
        function (d) { return [0, F.bot(d) - 0.02]; }, 0.9));
      K.ink.push(disc(0.18, X(22.15), 0, F.bot(22.1) - 0.15, 12));
      /* gear: twin nose wheels at 8.7 m; eight-wheel bogies at +-5.15 m, tandem rows at 15.0 / 15.9 m */
      var nd = 8.7, nr = 0.33, nz = GROUND + nr;
      wheelPair(G, nd, 0, nz, nr, 0.22, 0.17);
      G.leg.push(rod([X(nd - 0.2), 0, F.bot(nd) + 0.15], [X(nd), 0, nz], 0.09, 8));
      G.leg.push(rod([X(nd - 1.0), 0, F.bot(nd - 1.0) + 0.1], [X(nd - 0.1), 0, nz + 0.5], 0.05, 6));
      [1, -1].forEach(function (k) { G.door.push(box(2.4, 0.03, 0.6, X(nd - 0.2), k * 0.42, F.bot(nd) - 0.26)); });
      [1, -1].forEach(function (s) {
        var yc = s * 5.15, mr = 0.43, mz = GROUND + mr, wl = W.skinZ(5.15, 0.6, -1);
        [15.0, 15.9].forEach(function (d) {
          [-0.45, -0.15, 0.15, 0.45].forEach(function (o) {
            G.tyre.push(cylY(mr, 0.2, X(d), yc + o, mz, 16));
            G.leg.push(cylY(mr * 0.5, 0.21, X(d), yc + o, mz, 8));
          });
          G.leg.push(rod([X(d), yc - 0.58, mz], [X(d), yc + 0.58, mz], 0.05, 6));
        });
        G.leg.push(rod([X(15.0), yc, mz + 0.1], [X(15.9), yc, mz + 0.1], 0.1, 8));
        G.leg.push(rod([X(15.45), yc, wl], [X(15.45), yc, mz + 0.1], 0.14, 10));
        G.leg.push(rod([X(14.2), yc, wl], [X(15.35), yc, mz + 0.9], 0.06, 6));
        G.leg.push(rod([X(15.45), yc - s * 0.1, mz + 1.2], [X(15.45), yc - s * 0.9, wl], 0.05, 6));
        G.door.push(box(2.4, 0.03, 0.8, X(15.4), s * 5.95, wl - 0.4));
      });
      return assemble(K, G, C, { key: "victor", base: "#b9ad90", line: "rgba(60,54,40,0.16)", seed: 5113,
                                 rough: 0.6, metal: 0.04, door: 0xb3a88c, leg: 0x8e8f88 });
    }
    return { build: build };
  })();

  /* ======================================================================================
     CANBERRA T.17 - forward of the nacelle lip CC at 44.2 px/m; aft of it CA (B.2) + 1.70 m
     ====================================================================================== */
  var CAN = (function () {
    var F = Fus([
      [0.00, 0.06, 0.03, -0.13], [0.15, 0.45, 0.40, -0.55], [0.40, 0.62, 0.48, -0.80], [0.80, 0.68, 0.49, -0.88],
      [1.50, 0.71, 0.50, -0.91], [2.00, 0.76, 0.52, -0.93], [2.30, 0.84, 0.66, -0.95], [2.60, 0.90, 0.82, -0.96],
      [3.00, 0.95, 0.94, -0.97], [3.60, 0.99, 0.96, -0.97], [6.65, 1.00, 0.96, -0.97], [9.00, 1.00, 0.97, -0.93],
      [11.6, 0.99, 0.97, -0.87], [13.0, 0.98, 0.97, -0.83], [13.9, 0.96, 0.97, -0.77], [14.8, 0.93, 0.97, -0.67],
      [15.8, 0.87, 0.97, -0.53], [16.7, 0.79, 0.96, -0.36], [17.6, 0.69, 0.95, -0.18], [18.6, 0.56, 0.93, 0.0],
      [19.5, 0.42, 0.91, 0.18], [20.45, 0.30, 0.89, 0.37], [21.0, 0.22, 0.88, 0.50], [21.4, 0.15, 0.86, 0.60],
      [21.66, 0.05, 0.80, 0.70]
    ]);
    var YN = 3.05;
    function wz(y) {
      y = Math.abs(y);
      return 0.10 + Math.tan(2 * PI / 180) * Math.min(y, YN) + Math.tan(4.35 * PI / 180) * Math.max(0, y - YN);
    }
    var W = Wing([
      [0.60, 8.02, 13.80, 0.12], [1.00, 8.02, 13.80, 0.12], [2.40, 8.05, 13.80, 0.12], [3.80, 8.07, 13.66, 0.115],
      [5.00, 8.37, 13.21, 0.11], [6.42, 8.72, 12.72, 0.105], [7.85, 9.06, 12.20, 0.10], [9.04, 9.36, 11.78, 0.095],
      [9.52, 9.53, 11.41, 0.09], [9.75, 9.90, 11.10, 0.08]
    ], wz, 0.01);
    var FIN = [[0.85, 16.8, 20.95, 0.08], [1.45, 17.64, 20.95, 0.08], [2.5, 18.55, 20.92, 0.075], [3.0, 19.0, 20.85, 0.07],
               [3.08, 19.4, 20.6, 0.06]];
    var STAB = [[0.15, 18.47, 21.17], [0.70, 18.47, 21.17], [1.89, 19.02, 21.17], [3.08, 19.58, 21.19], [3.80, 19.93, 21.19],
                [4.15, 20.3, 21.0], [4.27, 20.6, 20.8]];
    var GROUND = -1.66;

    function build(C) {
      var kk = kits(), K = kk[0], G = kk[1];
      /* fuselage; the radome cap black (CE) */
      split(F.geo(), function (x) { return NOSE - x < 0.72; }, K.ink, K.skin);
      /* the B.2 canopy (CC: 2.45 to 3.85 m, its top 0.15 m over the spine) and its rear frame */
      K.glass.push(lathe([[2.45, 0.04], [2.6, 0.24], [2.9, 0.36], [3.3, 0.40], [3.6, 0.36], [3.85, 0.12]], 16, at(0, 0.88), 0.6));
      K.metal.push(lathe([[3.55, 0.37], [3.6, 0.37]], 16, at(0, 0.88), 0.62, true));
      /* the cheek fairings: rounded fronts at 0.72 m tapering aft to 2.2 m (CC, CE) */
      [1, -1].forEach(function (s) {
        var yy = s * (F.hw(1.2) - 0.02);
        K.skin.push(lathe([[0.72, 0.03], [0.78, 0.10], [0.9, 0.14], [1.4, 0.14], [1.9, 0.08], [2.2, 0.02]], 10, at(yy, -0.05)));
      });
      /* the small black fairing on the nose top (CE) */
      K.ink.push(ell(0.42, 0.22, 0.11, X(0.85), 0, F.top(0.85) - 0.01, 10, 6));
      /* wings, nacelles, tip tanks, team panels */
      [1, -1].forEach(function (s) {
        K.skin.push(W.geo(s));
        var zc = wz(YN) + 0.05, cf = at(s * YN, zc);
        K.skin.push(lathe([[6.65, 0.50], [6.8, 0.58], [7.3, 0.62], [9.5, 0.63], [11.5, 0.60], [13.0, 0.52], [14.0, 0.45],
                           [14.27, 0.42]], 20, cf, 1, true));
        K.metal.push(lathe([[6.62, 0.47], [6.66, 0.52], [6.75, 0.55]], 20, cf, 1, true));
        K.ink.push(lathe([[6.66, 0.48], [6.9, 0.45], [7.2, 0.44]], 20, cf, 1, true));
        K.ink.push(disc(0.45, X(7.15), s * YN, zc, 20));
        K.metal.push(lathe([[6.4, 0.02], [6.5, 0.14], [6.7, 0.22], [6.95, 0.24], [7.15, 0.2]], 12, cf));
        K.metal.push(lathe([[14.1, 0.43], [14.27, 0.41], [14.32, 0.37]], 18, cf, 1, true));
        K.ink.push(disc(0.38, X(14.15), s * YN, zc, 18));
        /* tip tank, centred on the tip (CB), from 0.9 m ahead of the tip LE */
        var ty = W.tip, tz = wz(ty);
        K.skin.push(lathe([[9.0, 0.03], [9.2, 0.2], [9.7, 0.36], [10.5, 0.405], [12.0, 0.40], [12.9, 0.3], [13.33, 0.06]], 16,
          at(s * ty, tz)));
        teamPanel(K, W, s, 7.6, 8.6, 0.25, 0.6);
      });
      /* tail */
      K.skin.push(finGeo(FIN));
      [1, -1].forEach(function (s) { K.skin.push(stabGeo(STAB, s, 0.75, 10, 0.09, 0.07)); });
      /* gear: twin nose wheels at 4.7 m (CC); single mains at 9.1 m on the 4.81 m track (CB, CC) */
      var nd = 4.7, nr = 0.29, nz = GROUND + nr;
      wheelPair(G, nd, 0, nz, nr, 0.16, 0.12);
      G.leg.push(rod([X(nd - 0.15), 0, F.bot(nd) + 0.1], [X(nd), 0, nz], 0.06, 8));
      [1, -1].forEach(function (k) { G.door.push(box(1.3, 0.025, 0.45, X(nd - 0.1), k * 0.3, F.bot(nd) - 0.2)); });
      [1, -1].forEach(function (s) {
        var yc = s * 2.405, mr = 0.465, mz = GROUND + mr, top = wz(YN) + 0.05 - 0.5;
        G.tyre.push(cylY(mr, 0.3, X(9.1), yc, mz, 18));
        G.leg.push(cylY(mr * 0.55, 0.32, X(9.1), yc, mz, 10));
        G.leg.push(rod([X(9.1), yc + s * 0.2, mz], [X(9.1), yc + s * 0.2, top], 0.08, 8));
        G.leg.push(rod([X(9.1), yc, mz], [X(9.1), yc + s * 0.24, mz], 0.05, 6));
        G.leg.push(rod([X(8.3), yc + s * 0.2, top], [X(9.05), yc + s * 0.2, mz + 0.5], 0.04, 6));
        G.door.push(box(2.2, 0.025, 0.55, X(9.4), s * (YN - 0.58), top - 0.25));
      });
      return assemble(K, G, C, { key: "canberra", base: "#5f676a", line: "rgba(20,24,26,0.22)", seed: 7121,
                                 rough: 0.75, metal: 0.04, door: 0x5c6467, leg: 0x7e8285 });
    }
    return { build: build };
  })();

  function wrap(T, nose) { return function (THREE, M, C) { V = THREE; NOSE = nose; return T.build(C); }; }
  return { valiant: wrap(VAL, 16.26), victor: wrap(VIC, 17.515), canberra: wrap(CAN, 10.83) };
})();

/* len: each model's measured X extent */
UNIT_MODELS["gbr_e50_tanker"] = { len: 33.46, build: HeroVForce.valiant };   /* probe tip to tail cone */
UNIT_MODELS["gbr_e60_tanker"] = { len: 35.03, build: HeroVForce.victor };    /* nose to tailplane tips */
UNIT_MODELS["gbr_e60_ewair"]  = { len: 21.66, build: HeroVForce.canberra };  /* radome tip to tail cone */
