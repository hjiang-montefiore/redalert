/* ================= gb_harrier1.js  -  HERO MODEL =================
   The FIRST-generation Harrier, one airframe in two guises:
       gbr_e60_cas        Hawker Siddeley Harrier GR.1 (RAF, 1969)
       gbr_e80_cfighter   BAe Sea Harrier FRS.1 (Fleet Air Arm, 1980)
   The row gbr_e60_cas is the GR.1 (eras.js: name "Harrier GR.1", service
   1969): NO laser-ranger "thimble" nose and NO fin RWR, which came with
   the GR.3. The second generation (AV-8B, GR5/7/9) is
   hero/harrier2_family.js; its kit (bridge, foil, seRing, the nozzle
   code, the paint sheet, the build-then-pitch idea) is copied here, but
   none of its airframe tables.

   Model space: +X nose, +Y left (port), +Z up, metres; tyres on z = 0.
   s: metres aft of the FRS.1's radome tip; hd: metres above the belly
   line at the intake lip, both in the profile drawing's frame (P1). The
   airframe is built at x = XN - s, z = hd and then pitched once (PITCH).

   REFERENCES
     P1 "Sea Harrier.svg" (Commons, rendered 960 x 742): a side profile of
        an FRS.1 (ZA176), gear up. Read by a pixel scan at 65.3 px/m: probe
        tip (x 5) to tail-cone end (x 952) = the published 14.50 m. s =
        (px - 40) / 65.3, hd = (470 - py) / 65.3. Everything marked "P1"
        is from it: forebody and radome, canopy, intake lip, spine and
        belly lines, fin, tail cone, tailplane height, nozzle stations,
        gun-pod outline, outrigger fairing, the fin RWR pod.
     P2 "P1127 Kestrel and Harrier GR3.png" (Commons, 1280 px plan
        silhouette). The GR.3 plan at 50.8 px/m (tip to tip 391 px = the
        published 7.70 m span), lengthwise aligned on the intake lip
        (row 705 = s 3.90 of P1): s = 3.90 + (row - 705) / 51.0. Its tail
        lands at s 14.02 against P1's 13.97, so the two agree aft of the
        lip. "P2" marks: wing planform, cowl widths, aft body widths,
        tailplane planform, outrigger track 6.72 m, pylon stations (the
        tanks and Sidewinders hang at 1.98 and 2.82 m out).
     P3 "Sea Harrier FRS1 and Big Wing SHAR.png" (Commons, 1280 px plan
        silhouette), 65.8 px/m on its span: FRS.1 forebody widths, cowl
        widths, pylons at 1.99 and 2.84 m (agrees with P2).
     P4 "BAe Harrier GR3, RAF Museum Hendon.jpg" (Commons photograph, 1280
        px, port side, gear down on a stand; perspective, so read locally
        about the intake: 103.5 px/m along, 90.5 px/m up, calibrated on the
        lip-to-laser-tip length and the lip height of P1). "P4" marks: the
        GR forebody and canopy profile, the GR.3's fin-top fairing, the
        paint. Not used for the gear or the stance (it is on a stand).
     Text: en.wikipedia "Hawker Siddeley Harrier" and "British Aerospace
        Sea Harrier" (raw wikitext): four vectoring nozzles, two cold and
        two hot; reaction nozzles in nose, tail and wingtips; two fuselage
        gear units and an outrigger near each tip; auxiliary blow-in doors;
        four wing pylons and one under the fuselage; two 30 mm ADEN pods
        under the fuselage; wing area 18.68 m2; GR.3 (Jane's) 14.27 x 7.75
        x 3.63 m with the laser nose; Sea Harrier: raised cockpit, bubble
        canopy, forward fuselage extended for Blue Fox.
     Published figures (task): GR.1 13.91 x 7.70 x 3.45 m; FRS.1 14.50 x
        7.70 x 3.71 m.

   LENGTHS. P1 aft of the intake lip is 10.07 m and agrees with P2 (10.12
   m). Both published lengths are taken as overall, to the probe tip (P1
   shows the FRS.1's probe; P2 and P4 show the GR.3's): FRS.1 14.50 =
   0.54 probe + 3.90 forebody + 10.07. GR.1 13.91 - 0.54 - 10.07 = 3.30 m
   nose tip to lip, 0.60 m shorter than the FRS.1 (Wikipedia: "extended
   forward fuselage"). P4's GR.3 laser tip lies 3.67 m ahead of the lip
   = 3.30 + the 0.36 m the laser nose adds (14.27 - 13.91): it agrees.
   The plan silhouettes' forebodies run 0.5 m short of both and are used
   for widths only.

   STANCE, FROM THE GEAR (not fitted to any height).
     P5 "British Aerospace Sea Harrier FRS1, UK - Navy AN1972606.jpg"
        (Commons, 960 px): an FRS.1 side-on in the hover, gear down and
        unloaded. Mapped onto P1 by its radome tip and tail-cone end (0.0177
        m/px; it lands P1's fin top at 3.41 against 3.45, canopy 1.90
        against 1.87, spine 1.71 against 1.73). Nose wheel centre s 4.65,
        main 8.26, outrigger 9.7; tyre radii 0.33 / 0.37 / 0.18 m. With
        the oleos fully extended the tyre bottoms sit at hd -1.46 (nose)
        and -1.15 (main): a ground line 4.9 deg nose-up of P1's datum,
        1.19 m below the belly at the main gear.
     P6 "SeaHarrier 800 Sqn parked on USS Eisenhower (CVN-69) 1984.JPEG"
        (Commons, 960 px): an FRS.1 standing on its own wheels on a deck,
        near side-on. The line from radome tip (897, 281) to tail-cone end
        (11, 325) runs 0.15 deg off the line through the nose and main tyre
        contacts (645, 430) and (432, 440); in P1 that line is 4.0 deg
        tail-high, so standing, P1's datum is 3.9 deg nose-up (+-1.2 deg,
        3 px on the contacts). The belly at the main gear stands 47 px =
        0.74 m (+-0.1) off the deck: the static oleos are about 0.45 m
        shorter than P5's extended ones, and the angle agrees with P5's 4.9
        deg within the error. The model stands at P6's static stance: 3.9
        deg nose-up about the main contact (s 8.26), belly 0.74 m up. The
        stand photograph (P4) is not used for the stance.
   RESULTING HEIGHT: 3.81 m to the fin top for both rows (one airframe:
   P1-P6 show no difference aft of the cockpit; nothing stands above the
   fin tip in P1, P5 or P6 - the FRS.1's RWR pod is on the fin's leading
   edge, 0.5 m below the top, and is drawn). On P5's extended oleos it
   would be 4.17 m. Published: GR.1 3.45, GR.3 3.63 (Jane's), FRS.1 3.71.
   Nothing is adjusted to meet them; see NOT CONFIRMED.

   RECOGNITION FEATURES (each drawn; where it rests)
     1. Shoulder wing on top of the body: LE 40 deg (P2: 6.65 m at 1.55
        out to 8.02 at 3.16), a rounded tip 3.85 m out, TE swept 14 deg
        (8.85 + 0.25 y, P2); 12 deg anhedral (published; P1's tip reads
        about 15 deg, an outline too coarse to overrule it).
     2. Outrigger fairing under each tip at 3.36 m (P2 track 6.72 m), from
        s 8.8 to 10.15 (P1, P2), its wheel at s 9.7 down to the ground
        (P5, P6).
     3. Bicycle gear: nose unit at s 4.65, twin main wheels at s 8.26 (P5),
        tyres 0.32 / 0.36 / 0.18 m radius (P5, P6). Group "gear".
     4. Four nozzles: cold s 5.59-6.20, centre hd 0.73; hot s 7.73-8.35,
        centre hd 0.61 (P1); parked pointing aft.
     5. Big D intakes, mouth 1.70 m tall from the belly line to the spine
        (P1), cowls 1.02 m out at the lip widening to 1.20 (P2, P3), a
        row of blow-in doors round the lip (P1 side, P2/P3 top).
     6. Two ADEN pods under the belly, s 4.90-8.19, 0.40 m deep (P1).
     7. Fin: LE fillet from s 10.1, top 3.45 hd at s 13.17, TE near-
        vertical (P1); tail cone to s 13.97 (P1); tailplane LE 36 deg from
        11.74 at 0.40 m out to the tip at 2.06 m, TE about 13.15 (P2),
        root 1.10 hd and 10 deg anhedral (P1).
     8. GR.1: forebody and low canopy (P4, aft of the laser nose), canopy
        top 1.87 hd. FRS.1: deeper nose and raised floor, windscreen base
        1.15 hd at s 1.91 against the GR's 1.07, bubble canopy (P1), the
        Blue Fox radome tip drooped to 0.35 hd with the probe above it
        (P1), and the RWR pod on the fin leading edge (P1).
   Paint: FRS.1 grey (P1, #656d70) over light grey-white (P1, #a9a69a);
   GR.1 wraparound dark green (P4, #4f5040) - P4 is the only GR in colour.
   No roundels, fin flashes, serials or codes.

   NOT CONFIRMED (no reference settles it):
     the GR.1's own nose ahead of s 1.0 (only the GR.3's laser nose is
     shown; drawn as a plain cone to the published length) and the probe
     on it (shown on the GR.3, P2/P4); the lateral position of the ADEN
     pods and nozzles (the plans cannot see under the wing); the body's
     section shape between the drawn outlines; the main-gear clearance
     (P6, +-0.1 m) and the stance angle (+-1.2 deg); the canopy's width.
     HEIGHTS: the model stands 3.81 m against the published GR.1 3.45,
     GR.3 3.63 and FRS.1 3.71. The 0.18 m between the GR.1 and GR.3 figures
     may be partly the GR.3's fin-top RWR fairing (P4 shows a fairing at
     the GR.3's fin top); it is not drawn, a GR.1 has none, and no
     reference shows one on the FRS.1 (P1, P5, P6). The rest of the spread
     (published figures for parked aircraft, oleo extension, P1's fin
     outline) is not settled by these references.
   NOT drawn: the GR.3's laser nose and fin and tail RWR (not on a GR.1),
   wingtip reaction-nozzle fairings, aerials, the ventral fairing lights,
   the FRS.1's nose-fold hinge, stores (P2/P3 show tanks and Sidewinders:
   only their pylons are drawn), ferry tips.

   Merged: one mesh per material (skin, team, hot, ink, dark, metal,
   glass) and the gear one named group of three: 10 draw calls. The team
   colour is exactly C.team.
   ================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHarrier1 = (function () {
  "use strict";

  var V = null;
  var D2R = Math.PI / 180;
  /* the stance (P6, checked against P5's gear): nose-up about the main
     gear (s 8.26, belly hd 0.04), the belly there CLR above the ground */
  var XN = 7.00, SP_ = 8.26, HP = 0.04, CLR = 0.74, PITCH = 3.9 * D2R;
  var CP = Math.cos(PITCH), SN = Math.sin(PITCH);
  function X(s) { return XN - s; }
  /* where a drawing point (s, hd) lands after the pitch: [x, z] */
  function T(s, hd) {
    var px = SP_ - s, pz = hd - HP;
    return [X(SP_) + px * CP - pz * SN, CLR + px * SN + pz * CP];
  }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pl(p, k) {
    var n = p.length, i;
    if (k <= p[0][0]) return p[0][1];
    for (i = 1; i < n; i++) {
      if (k <= p[i][0]) return p[i - 1][1] + (k - p[i - 1][0]) * (p[i][1] - p[i - 1][1]) / (p[i][0] - p[i - 1][0]);
    }
    return p[n - 1][1];
  }

  var VARIANTS = {
    GR1:  { id: "GR1",  sea: false, up: "#4f5040", lo: "#4f5040" },
    FRS1: { id: "FRS1", sea: true,  up: "#656d70", lo: "#a9a69a" }
  };

  /* ========================================================= stations ==
     Superellipse sections [s, half-width, hd of max width, top, bottom].
     AFT: P1's spine (1.72-1.75 hd to s 7.9, 1.61-1.64 to the fin, 1.50 at
     the tail) and belly (-0.08 under the cowls, rising 0.05/0.14/0.18/
     0.25/0.21/0.15 at 8.3/9.3/10.1/10.9/11.6/12.4, then sweeping up to the
     tail cone at 12.86-13.17); P2's widths aft of the wing (0.69, 0.54,
     0.45, 0.35 at 9.19, 10.37, 10.96, 11.55; tail cone 0.17). */
  var AFT = [
    [4.20, 0.50, 0.85, 1.73, -0.07],
    [5.00, 0.58, 0.85, 1.74, -0.08],
    [6.00, 0.62, 0.85, 1.74, -0.08],
    [7.00, 0.65, 0.85, 1.73, -0.06],
    [8.00, 0.66, 0.85, 1.72, -0.02],
    [9.00, 0.68, 0.88, 1.64, 0.10],
    [10.0, 0.58, 0.90, 1.62, 0.18],
    [10.9, 0.46, 0.92, 1.60, 0.24],
    [11.6, 0.36, 0.95, 1.58, 0.21],
    [12.4, 0.27, 1.00, 1.56, 0.17],
    [12.75, 0.24, 1.10, 1.55, 0.26],
    [13.00, 0.21, 1.25, 1.53, 0.80],
    [13.17, 0.18, 1.33, 1.51, 1.13],
    [13.60, 0.17, 1.33, 1.50, 1.17],
    [13.97, 0.12, 1.33, 1.45, 1.22]
  ];
  /* FRS.1 forebody (P1 profile; P3 widths): the radome tip drooped to hd
     0.35, its joint at s 0.95 (0.90 / 0.20), windscreen base 1.15 at 1.91 */
  var FORE_SEA = [
    [0.00, 0.02, 0.35, 0.37, 0.33],
    [0.25, 0.12, 0.40, 0.55, 0.27],
    [0.60, 0.22, 0.48, 0.76, 0.22],
    [0.95, 0.28, 0.52, 0.90, 0.19],
    [1.23, 0.33, 0.52, 0.93, 0.12],
    [1.53, 0.36, 0.55, 1.03, 0.09],
    [1.91, 0.39, 0.58, 1.15, 0.05],
    [2.50, 0.42, 0.62, 1.32, 0.00],
    [3.00, 0.43, 0.66, 1.42, -0.03],
    [3.50, 0.44, 0.72, 1.55, -0.06]
  ];
  /* GR.1 forebody (P4, the GR.3 aft of its laser nose; P2 widths): top
     0.74 / 0.93 / 1.07 at s 1.15 / 1.77 / 1.97 (windscreen base), belly
     0.05 / 0.04 / 0.03 / -0.09; ahead of s 1.0 a plain cone to the tip
     at s 0.60 (NOT CONFIRMED) */
  var FORE_GR = [
    [0.60, 0.02, 0.40, 0.42, 0.38],
    [0.80, 0.12, 0.42, 0.55, 0.27],
    [1.15, 0.24, 0.42, 0.74, 0.07],
    [1.50, 0.32, 0.45, 0.86, 0.05],
    [1.97, 0.39, 0.50, 1.07, 0.03],
    [2.50, 0.42, 0.56, 1.22, -0.03],
    [2.93, 0.43, 0.62, 1.32, -0.09],
    [3.50, 0.44, 0.72, 1.48, -0.06]
  ];
  var PROBE = [[-0.54, 0.66], [0.95, 0.90]];      /* P1: tip to its root on the radome top */

  /* ============================================================ helpers == */
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
      + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++) {
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c], tab[Math.min(m - 1, k + 2)][c], t));
      }
      out.push(row);
    }
    return out;
  }
  function bridge(rings, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    var lim = open ? N - 1 : N;
    for (i = 0; i < nr - 1; i++) {
      for (j = 0; j < lim; j++) {
        var a = i * N + j, b = i * N + (j + 1) % N, c = a + N, d = b + N;
        idx.push(a, c, b, b, c, d);
      }
    }
    function cap(r, first) {
      var cx = 0, cy = 0, cz = 0, base = pos.length / 3, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) pos.push(r[k][0], r[k][1], r[k][2]);
      for (k = 0; k < N; k++) {
        var p = base + 1 + k, q = base + 1 + (k + 1) % N;
        if (first) idx.push(base, p, q); else idx.push(base, q, p);
      }
    }
    if (capA) cap(rings[0], true);
    if (capB) cap(rings[nr - 1], false);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function orient(g) {
    var p = g.attributes.position.array, ix = g.index.array, v = 0, t;
    for (t = 0; t < ix.length; t += 3) {
      var a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
         - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
         + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
    }
    if (v < 0) {
      for (t = 0; t < ix.length; t += 3) { var s = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = s; }
      g.index.needsUpdate = true;
      g.computeVertexNormals();
    }
    return g;
  }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring at span station y, chord plane at height zm */
  function foil(sLE, sTE, y, zm, tc, m, grow) {
    var p = [], i, f, chord = sTE - sLE, g = grow || 0, pad = g ? 0.02 : 0;
    var xl = X(sLE) + g, c = chord + 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm + yt(f, tc) * c + (i === 0 ? 0.004 : 0) + pad]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm - yt(f, tc) * c - pad]);
    }
    return p;
  }
  /* aerofoil ring in a horizontal plane (fin, pylons): thickness along y */
  function foilH(sLE, sTE, z, yc, tc, m, grow) {
    var p = [], i, f, g = grow || 0, c = sTE - sLE + 2 * g, xl = X(sLE) + g, th;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      th = Math.max(yt(f, tc) * c, 0.004) + (g ? 0.02 : 0);
      p.push([xl - f * c, yc + th, z]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      th = Math.max(yt(f, tc) * c, 0.004) + (g ? 0.02 : 0);
      p.push([xl - f * c, yc - th, z]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  function seRing(x, yc, zw, w, zt, zb, n, eu, el) {
    var p = [], i, a, c, s, e;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      e = s >= 0 ? eu : el;
      p.push([x, yc + w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e),
              zw + (s >= 0 ? (zt - zw) : (zw - zb)) * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), 2 / e)]);
    }
    return p;
  }
  function circ(x, yc, zc, r, n) { return seRing(x, yc, zc, r, zc + r, zc - r, n, 2, 2); }
  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function tube(path, r, seg) {
    var rings = [], i, k, n = path.length;
    for (i = 0; i < n; i++) {
      var a = path[Math.max(0, i - 1)], b = path[Math.min(n - 1, i + 1)];
      var tx = b[0] - a[0], ty = b[1] - a[1], tz = b[2] - a[2], tl = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1;
      tx /= tl; ty /= tl; tz /= tl;
      var ax = Math.abs(tx) < 0.7 ? [1, 0, 0] : [0, 0, 1];
      var ux = ty * ax[2] - tz * ax[1], uy = tz * ax[0] - tx * ax[2], uz = tx * ax[1] - ty * ax[0];
      var ul = Math.sqrt(ux * ux + uy * uy + uz * uz) || 1; ux /= ul; uy /= ul; uz /= ul;
      var wx = ty * uz - tz * uy, wy = tz * ux - tx * uz, wz = tx * uy - ty * ux, ring = [];
      for (k = 0; k < seg; k++) {
        var c = Math.cos(k / seg * Math.PI * 2) * r, s = Math.sin(k / seg * Math.PI * 2) * r;
        ring.push([path[i][0] + ux * c + wx * s, path[i][1] + uy * c + wy * s, path[i][2] + uz * c + wz * s]);
      }
      rings.push(ring);
    }
    return bridge(rings, false, false);
  }
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }

  /* ============================================================== paint ==
     One sheet, four plan views at 56 px to the metre (as harrier2): from
     above, from port, from starboard, from below; skin UVs by projection
     into the band the triangle's normal faces, in final (pitched) metres.
     Panel lines, the blow-in doors, exhaust staining. No markings. */
  var PXM = 56, XMIN = -7.6, TW = 1024;
  var YMAX = 4.30, TOPH = 482, ZTOP = 3.90, SIDEH = 220;
  var TH = TOPH * 2 + SIDEH * 2, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  function cu(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZTOP - z) * PXM, 1, SIDEH - 1); }
  var LINE = "rgba(28,32,34,0.50)";
  var _tex = {};

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function trace(g, pts, col, lw) {
    var i;
    g.strokeStyle = col; g.lineWidth = lw;
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.stroke();
  }
  function disc(g, u, v, r, col) {
    g.fillStyle = col; g.beginPath(); g.arc(u, v, r, 0, Math.PI * 2); g.closePath(); g.fill();
  }

  function paintSheet(v) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(5100 + v.id.length * 13);
    var i, k, sd, ys, y, band;
    /* plan views: (s, y) of a wing or spine point; sides: (s, hd) */
    function tp(s, yy, bot) { return [cu(T(s, bot ? 0.0 : 1.5)[0]), bot ? rBot(yy) : rTop(yy)]; }
    function sp(s, hd, stbd) { var q = T(s, hd); return [cu(q[0]), rSide(q[1], stbd)]; }

    g.fillStyle = v.up; g.fillRect(0, 0, TW, B_BOT);
    g.fillStyle = v.lo; g.fillRect(0, B_BOT, TW, TOPH);
    /* FRS.1 (P1): the light underside comes up the sides to about the
       belly line plus 0.35 m, a straight demarcation (no pattern) */
    if (v.up !== v.lo) {
      for (k = 0; k < 2; k++) {
        var top0 = k ? B_STBD : B_PORT;
        g.fillStyle = v.lo;
        g.beginPath();
        for (i = 0; i <= 30; i++) {
          var s0 = -0.6 + i * 0.5, q = sp(s0, 0.35 + 0.10 * clamp(s0 - 10.5, 0, 2.5), k === 1);
          if (i === 0) g.moveTo(q[0], q[1]); else g.lineTo(q[0], q[1]);
        }
        g.lineTo(TW, top0 + SIDEH); g.lineTo(0, top0 + SIDEH); g.closePath(); g.fill();
      }
    }
    var bands = [[0, TOPH], [B_PORT, SIDEH], [B_STBD, SIDEH], [B_BOT, TOPH]];
    for (k = 0; k < 4; k++) {
      for (i = 0; i < (k === 0 || k === 3 ? 24 : 10); i++) {
        disc(g, R() * TW, bands[k][0] + R() * bands[k][1], 12 + R() * 30,
             R() < 0.5 ? "rgba(40,44,40,0.08)" : "rgba(170,176,170,0.06)");
      }
    }
    /* wing: LE line, flap and aileron lines, both faces */
    for (band = 0; band < 2; band++) {
      for (sd = -1; sd <= 1; sd += 2) {
        ys = []; for (y = 1.3; y <= 3.6; y += 0.2) ys.push(y);
        trace(g, ys.map(function (yy) { return tp(wLE(yy) + 0.12, sd * yy, band); }), LINE, 1.1);
        trace(g, ys.filter(function (yy) { return yy <= 2.20; }).map(function (yy) {
          return tp(wTE(yy) - 0.50, sd * yy, band); }), LINE, 1.3);
        trace(g, ys.filter(function (yy) { return yy >= 2.20; }).map(function (yy) {
          return tp(wTE(yy) - 0.36, sd * yy, band); }), LINE, 1.3);
        trace(g, [tp(wTE(2.2) - 0.50, sd * 2.2, band), tp(wTE(2.2), sd * 2.2, band)], LINE, 1.2);
      }
    }
    /* top: engine-access panel, and P2/P3's row of three blow-in doors
       on each cowl top behind the lip */
    g.strokeStyle = LINE; g.lineWidth = 1.2;
    var a0 = tp(7.4, 0.32, 0), a1 = tp(5.0, -0.32, 0);
    g.strokeRect(Math.min(a0[0], a1[0]), Math.min(a0[1], a1[1]), Math.abs(a1[0] - a0[0]), Math.abs(a1[1] - a0[1]));
    g.fillStyle = "rgba(18,22,24,0.80)";
    for (sd = -1; sd <= 1; sd += 2) {
      for (i = 0; i < 3; i++) {
        var dt = tp(4.15, sd * (0.62 + i * 0.16), 0);
        g.fillRect(dt[0] - 6, dt[1] - 4, 12, 8);
      }
    }
    /* bottom: gear bays */
    g.strokeStyle = LINE; g.lineWidth = 1.4;
    a0 = tp(5.5, 0.22, 1); a1 = tp(4.3, -0.22, 1);
    g.strokeRect(Math.min(a0[0], a1[0]), Math.min(a0[1], a1[1]), Math.abs(a1[0] - a0[0]), Math.abs(a1[1] - a0[1]));
    a0 = tp(9.4, 0.28, 1); a1 = tp(8.0, -0.28, 1);
    g.strokeRect(Math.min(a0[0], a1[0]), Math.min(a0[1], a1[1]), Math.abs(a1[0] - a0[0]), Math.abs(a1[1] - a0[1]));
    /* the sides */
    for (k = 0; k < 2; k++) {
      var sg = k === 1;
      /* P1: the blow-in doors in a column just behind the lip */
      g.fillStyle = "rgba(18,22,24,0.80)";
      for (i = 0; i < 6; i++) {
        var dq = sp(4.08, 1.55 - i * 0.26, sg);
        g.fillRect(dq[0] - 4, dq[1] - 6, 8, 12);
      }
      trace(g, [sp(v.sea ? 0.95 : 1.15, 0.20, sg), sp(v.sea ? 0.95 : 1.15, 0.88, sg)], LINE, 1.1);
      trace(g, [sp(4.70, 1.70, sg), sp(4.70, 0.00, sg)], LINE, 0.9);
      trace(g, [sp(9.4, 1.55, sg), sp(13.0, 1.45, sg)], LINE, 0.9);
      trace(g, [sp(10.8, 1.58, sg), sp(10.8, 0.30, sg)], LINE, 0.9);
      trace(g, [sp(12.3, 1.55, sg), sp(12.3, 0.25, sg)], LINE, 0.9);
      for (i = 0; i < 7; i++) {
        var hq = sp(8.4 + i * 0.25, 0.60 + i * 0.03, sg);
        disc(g, hq[0], hq[1], 14 - i, "rgba(30,28,24," + (0.20 - i * 0.022).toFixed(3) + ")");
      }
    }
    var tex = new V.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;
    return tex;
  }
  function sheet(v) {
    if (_tex[v.id] !== undefined) return _tex[v.id];
    try { _tex[v.id] = paintSheet(v); } catch (e) { _tex[v.id] = false; }
    return _tex[v.id];
  }
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > 0.8;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + yy : x);
        if (band === 0) Rr = rTop(yy);
        else if (band === 3) Rr = rBot(yy);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, v) {
    var tex = sheet(v), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(v.up);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.hot = new V.MeshStandardMaterial({ color: 0x45403a, roughness: 0.60, metalness: 0.45, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.dark = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2a3640, roughness: 0.10, metalness: 0.55,
                                           transparent: true, opacity: 0.80, side: V.DoubleSide });
    return m;
  }

  /* ============================================================ the wing ==
     P2 plan: LE 6.65 at 1.55 m out, 8.02 at 3.16 (40 deg), then the
     rounded tip (8.21/8.41/8.61/8.80/9.00/9.19/9.40 at 3.35/3.49/3.59/
     3.69/3.73/3.78/3.80 m); TE 9.19/9.39/9.59/9.78 at 1.36/2.17/2.97/3.75
     m (8.85 + 0.25 y); tip 3.85 m out (span 7.70). Root upper surface on
     P1's spine (1.74 hd), 12 deg anhedral outboard of the cowl top. */
  var WLE = [[0.00, 5.33], [1.55, 6.65], [3.16, 8.02], [3.35, 8.21], [3.49, 8.41], [3.59, 8.61],
             [3.69, 8.80], [3.73, 9.00], [3.78, 9.19], [3.85, 9.45]];
  function wLE(y) { return pl(WLE, Math.abs(y)); }
  function wTE(y) { return 8.85 + 0.25 * Math.abs(y); }
  var ANH = 12 * D2R, WZ0 = 1.57, YB = 0.62;
  function wz(y) { return WZ0 - Math.max(0, Math.abs(y) - YB) * Math.tan(ANH); }
  function wtc(y) { return Math.max(0.100 - 0.067 * clamp(Math.abs(y) / 3.85, 0, 1), 0.045); }
  var WY = [0.00, 0.40, 0.80, 1.20, 1.55, 2.00, 2.50, 3.00, 3.16, 3.35, 3.49, 3.59, 3.69, 3.76];
  function addWings(K) {
    var r = [], i, y;
    for (i = 0; i < WY.length; i++) {
      y = WY[i];
      r.push(foil(wLE(y), wTE(y), y, wz(y), wtc(y), 10));
    }
    r.push(foil(9.40, 9.78, 3.85, wz(3.85), 0.05, 10));
    K.skin.push(orient(bridge(r, false, true)));
    K.skin.push(orient(bridge(mirrorRings(r), false, true)));
  }
  function wingLow(y, s) {
    var le = wLE(y), te = wTE(y), c = te - le, f = clamp((s - le) / c, 0.02, 0.98);
    return wz(y) - yt(f, wtc(y)) * c;
  }

  /* tail: P2 tailplane LE from 11.74 at 0.40 m out to 12.92 at 2.00 (36
     deg), tip 2.06 m, TE about 13.15; P1 root chord plane 1.10 hd, tip
     0.80 (10 deg anhedral). P1 fin: LE fillet from 10.10, 10.87/11.49/
     12.10/12.56/12.86 at 1.84/2.27/2.83/3.25/3.37 hd, top 3.45 at 13.17,
     TE 13.06 at the root to 13.17 at the top. */
  function addTail(K, v) {
    var ys = [0.15, 0.40, 0.90, 1.40, 1.80, 2.00, 2.06], r = [], i, y, th = 10 * D2R;
    for (i = 0; i < ys.length; i++) {
      y = ys[i];
      var le = 11.74 + Math.max(0, y - 0.40) * 0.737, te = 13.15 + Math.max(0, y - 0.40) * 0.05;
      if (y > 2.03) { le = 12.99; te = 13.24; }
      r.push(foil(le, te, y, 1.10 - Math.max(0, y - 0.20) * Math.tan(th), 0.06, 8));
    }
    K.skin.push(orient(bridge(r, true, true)));
    K.skin.push(orient(bridge(mirrorRings(r), true, true)));

    var FL = [[1.45, 9.95], [1.62, 10.10], [1.84, 10.87], [2.27, 11.49], [2.83, 12.10], [3.25, 12.56], [3.37, 12.86], [3.45, 13.06]];
    function fLE(h) { return pl(FL, h); }
    function fTE(h) { return 13.06 + clamp(h - 1.62, 0, 2) * 0.06; }
    var hs = [1.45, 1.62, 1.84, 2.27, 2.83, 3.25, 3.37, 3.44], fr = [];
    for (i = 0; i < hs.length; i++) {
      var h = hs[i], a = fLE(h), b = Math.max(fTE(h), a + 0.12);
      fr.push(foilH(a, b, h, 0, h < 1.9 ? 0.07 : 0.055, 8));
    }
    K.skin.push(orient(bridge(fr, true, true)));
    /* team colour: a band round the fin near the top */
    var tr = [];
    [3.05, 3.20].forEach(function (h) { tr.push(foilH(fLE(h), fTE(h), h, 0, 0.055, 8, 0.015)); });
    K.team.push(orient(bridge(tr, true, true)));
    /* FRS.1: the RWR pod on the fin's leading edge (P1: s 11.87-12.33,
       hd 2.76-2.95, a coloured tip), not on the GR.1 */
    if (v.sea) {
      var pr = [[11.87, 0.015], [11.93, 0.05], [12.02, 0.07], [12.40, 0.07], [12.55, 0.05]].map(function (q) {
        return circ(X(q[0]), 0, 2.86, q[1], 10);
      });
      K.skin.push(orient(bridge(pr, true, true)));
      var tip = new V.SphereGeometry(0.05, 8, 6);
      tip.scale(1.2, 1, 1); tip.translate(X(11.92), 0, 2.86);
      K.dark.push(tip);
    }
  }

  /* ============================================================ the body = */
  function addBody(K, v) {
    var i, rings = [], tab = (v.sea ? FORE_SEA : FORE_GR).concat(AFT);
    var sec = resample(tab, 46);
    for (i = 0; i < sec.length; i++) {
      var q = sec[i], eu = q[0] < 1.3 ? 2.0 : 2.4, el = q[0] < 1.3 ? 2.0 : 2.5;
      rings.push(seRing(X(q[0]), 0, q[2], Math.max(q[1], 0.01), q[3], q[4], 24, eu, el));
    }
    K.skin.push(orient(bridge(rings, true, false)));
    /* the tail cone's reaction nozzle (Wikipedia): a dark disc on the end */
    var last = AFT[AFT.length - 1];
    var cap = new V.CylinderGeometry(last[1] * 0.85, last[1] * 0.85, 0.02, 12);
    cap.rotateZ(Math.PI / 2); cap.translate(X(last[0]) - 0.005, 0, last[2]);
    K.ink.push(cap);
    /* the nose probe: P1 (FRS.1) from the radome top; the GR.1's from its
       tip, as P2/P4 show it on the GR.3 (NOT CONFIRMED on a GR.1) */
    if (v.sea) {
      K.metal.push(rod([X(PROBE[0][0]), 0, PROBE[0][1]], [X(PROBE[1][0]), 0, PROBE[1][1] - 0.03], 0.018, 6));
      /* the radome joint (P1: s 0.95) */
      var jr = seRing(X(0.95), 0, 0.52, 0.29, 0.91, 0.18, 20, 2, 2); jr.push(jr[0]);
      K.dark.push(tube(jr, 0.012, 4));
    } else {
      K.metal.push(rod([X(0.06), 0, 0.40], [X(0.64), 0, 0.40], 0.018, 6));
    }

    /* the intake cowls: P2/P3 outer line 1.02 at the lip (s 3.90) to 1.20
       at 6.1, P1 mouth from the belly line to the spine; blending into the
       body under the wing */
    var COWL = [[3.90, 0.40], [4.20, 0.45], [5.00, 0.52], [5.60, 0.56], [6.10, 0.58], [7.00, 0.48],
                [7.80, 0.28], [8.40, 0.08]];
    for (var sd = -1; sd <= 1; sd += 2) {
      var cr = COWL.map(function (c) {
        var tp = c[0] < 7 ? 1.74 : 1.74 - (c[0] - 7) * 0.30, bt = c[0] < 7 ? -0.04 : -0.04 + (c[0] - 7) * 0.30;
        return seRing(X(c[0]), sd * 0.62, (tp + bt) / 2, c[1], tp, bt, 20, 2.4, 2.4);
      });
      K.skin.push(orient(bridge(cr, false, true)));
      /* the duct face and the fan spinner seen down it */
      K.ink.push(bridge([seRing(X(3.93), sd * 0.62, 0.86, 0.38, 1.70, 0.02, 20, 2.4, 2.4),
                         seRing(X(4.35), sd * 0.60, 0.86, 0.34, 1.66, 0.06, 20, 2.4, 2.4)], false, true));
      var spn = new V.SphereGeometry(0.18, 10, 6);
      spn.scale(0.6, 1, 1); spn.translate(X(4.30), sd * 0.52, 0.86);
      K.metal.push(spn);
      /* the thick D lip */
      var lip = [], k;
      for (k = 0; k <= 16; k++) {
        var b2 = -Math.PI / 2 + Math.PI * k / 16;
        lip.push([X(3.90), sd * (0.45 + 0.57 * Math.cos(b2)), 0.86 + 0.87 * Math.sin(b2)]);
      }
      K.skin.push(tube(lip, 0.05, 7));
    }

    /* ventral: the two ADEN pods (P1: s 4.90-8.19, bottom -0.40 hd; the
       lateral spacing NOT CONFIRMED) and the fuselage pylon (Wikipedia) */
    for (sd = -1; sd <= 1; sd += 2) {
      var pod = [[4.90, 0.03, 0.03], [5.05, 0.12, 0.12], [5.35, 0.165, 0.165], [6.20, 0.17, 0.17],
                 [7.70, 0.17, 0.17], [8.05, 0.13, 0.12], [8.19, 0.05, 0.05]];
      var prs = pod.map(function (p) {
        return seRing(X(p[0]), sd * 0.38, -0.23, p[1], -0.23 + p[2] + 0.02, -0.23 - p[2], 14, 2.2, 2.2);
      });
      K.skin.push(orient(bridge(prs, true, true)));
      var mz = new V.CylinderGeometry(0.035, 0.035, 0.16, 8);
      mz.rotateZ(Math.PI / 2); mz.translate(X(4.86), sd * 0.38, -0.24);
      K.dark.push(mz);
    }
    K.skin.push(orient(bridge([foilH(5.9, 7.3, -0.03, 0, 0.05, 6), foilH(6.0, 7.2, -0.20, 0, 0.05, 6)], true, true)));
  }

  /* ====================================================== the canopy ===
     [s, half-width, sill hd, top hd]. FRS.1 (P1): windscreen base 1.15 at
     s 1.91, the bubble's top 1.87 at 3.3, back into the spine by 4.35.
     GR.1 (P4): windscreen base 1.07 at 1.97, top 1.87 near 3.2, blending at
     3.8-4.0. Widths from P2/P3 (cockpit 0.43 m half). */
  var CAN_GR = [
    [1.97, 0.30, 1.07, 1.09], [2.20, 0.36, 1.12, 1.38], [2.50, 0.40, 1.20, 1.62], [2.90, 0.42, 1.30, 1.80],
    [3.20, 0.42, 1.40, 1.87], [3.50, 0.40, 1.50, 1.85], [3.80, 0.34, 1.60, 1.76], [4.00, 0.24, 1.66, 1.71]
  ];
  var CAN_SEA = [
    [1.91, 0.30, 1.15, 1.17], [2.10, 0.37, 1.22, 1.42], [2.30, 0.41, 1.28, 1.58], [2.60, 0.43, 1.36, 1.78],
    [2.90, 0.44, 1.43, 1.85], [3.30, 0.44, 1.52, 1.87], [3.70, 0.42, 1.60, 1.84], [4.00, 0.36, 1.65, 1.81],
    [4.35, 0.22, 1.70, 1.75]
  ];
  function arcRing(st, n) {
    var p = [], k, a;
    for (k = 0; k <= n; k++) {
      a = Math.PI * k / n;
      p.push([X(st[0]), st[1] * Math.cos(a), st[2] + (st[3] - st[2]) * Math.pow(Math.sin(a), 0.80)]);
    }
    return p;
  }
  function addCanopy(K, v) {
    var CAN = v.sea ? CAN_SEA : CAN_GR, i, r = [];
    var sec = resample(CAN, 16);
    for (i = 0; i < sec.length; i++) r.push(arcRing(sec[i], 14));
    K.glass.push(bridge(r, false, false, true));
    /* the windscreen frame (P1, P4) and the sill rails */
    var wa = sec[3];
    K.skin.push(tube(arcRing([wa[0], wa[1] + 0.01, wa[2], wa[3] + 0.02], 10), 0.035, 6));
    for (var sd = -1; sd <= 1; sd += 2) {
      K.skin.push(tube(sec.map(function (q) { return [X(q[0]), sd * q[1], q[2]]; }), 0.03, 5));
    }
    /* the cockpit: coaming, seat, helmet */
    var z0 = CAN[0][2];
    K.dark.push(boxG(0.30, 0.50, 0.12, X(CAN[0][0] + 0.35), 0, z0 + 0.02));
    K.dark.push(boxG(0.18, 0.46, 0.50, X(CAN[0][0] + 1.55), 0, CAN[5][2] + 0.10));
    var helm = new V.SphereGeometry(0.14, 10, 7);
    helm.translate(X(CAN[0][0] + 1.30), 0, CAN[4][2] + 0.25);
    K.metal.push(helm);
  }

  /* ===================================================== the nozzles ====
     Four (Wikipedia), parked pointing aft; harrier2_family.js's code. */
  function nozzle(K, sd, s0, s1, yc, hc, rr, hot) {
    var st = [[s0, 0.55, 0.70], [s0 + 0.12, 0.85, 0.95], [s0 + 0.35, 1.0, 1.0],
              [s1 - 0.25, 0.98, 0.94], [s1, 0.92, 0.86]];
    var rings = st.map(function (q) {
      return seRing(X(q[0]), sd * yc, hc, rr * q[1], hc + rr * q[2], hc - rr * q[2], 14, 2.6, 2.6);
    });
    (hot ? K.hot : K.skin).push(bridge(rings, true, false));
    var col = new V.CylinderGeometry(rr * 1.06, rr * 1.12, 0.16, 14);
    col.translate(X(s0 + 0.35), sd * (yc - rr * 0.90), hc);
    K.dark.push(col);
    K.dark.push(bridge([seRing(X(s0 + 0.52), sd * yc, hc, rr * 1.03, hc + rr * 1.03, hc - rr * 1.03, 14, 2.6, 2.6),
                        seRing(X(s0 + 0.58), sd * yc, hc, rr * 1.03, hc + rr * 1.03, hc - rr * 1.03, 14, 2.6, 2.6)], false, false));
    var ex = seRing(X(s1 - 0.02), sd * yc, hc, rr * 0.84, hc + rr * 0.78, hc - rr * 0.78, 14, 2.6, 2.6);
    var ex2 = seRing(X(s1 - 0.40), sd * yc, hc, rr * 0.70, hc + rr * 0.64, hc - rr * 0.64, 14, 2.6, 2.6);
    K.ink.push(bridge([ex, ex2], false, true));
    if (!hot) {
      for (var k = -1; k <= 1; k++) {
        K.metal.push(boxG(0.16, rr * 1.60, 0.025, X(s1 - 0.08), sd * yc, hc + k * rr * 0.42));
      }
    }
  }
  /* P1: cold pair s 5.59-6.20 centre 0.73 hd, hot pair 7.73-8.35 centre
     0.61; the cold pair stands on the cowl (1.18 m out), the hot under the
     wing root (0.88; lateral NOT CONFIRMED) */
  function addNozzles(K) {
    for (var sd = -1; sd <= 1; sd += 2) {
      nozzle(K, sd, 5.59, 6.20, 1.18, 0.73, 0.30, false);
      nozzle(K, sd, 7.73, 8.35, 0.88, 0.61, 0.27, true);
    }
  }

  /* ================================================= pylons, outriggers ==
     P2/P3: stores hang at 1.98 and 2.83 m out (pylons only drawn); the
     outrigger fairing at 3.36 m (P2 track 6.72 m), s 8.80-10.15 (P1, P2),
     0.20 m wide (P2) and 0.54 m deep (P1). */
  var PYL = [[1.98, 7.30, 8.70, 0.25], [2.83, 7.95, 9.00, 0.20]];
  var OUT_Y = 3.36, OUT_S = [8.80, 10.15];
  function addStores(K) {
    for (var sd = -1; sd <= 1; sd += 2) {
      PYL.forEach(function (p) {
        var top = wingLow(p[0], (p[1] + p[2]) / 2) + 0.05, r = [];
        r.push(foilH(p[1] + 0.25, p[2], top - p[3], sd * p[0], 0.05, 6));
        r.push(foilH(p[1] + 0.05, p[2], top - p[3] * 0.55, sd * p[0], 0.05, 6));
        r.push(foilH(p[1], p[2] + 0.05, top, sd * p[0], 0.05, 6));
        K.skin.push(orient(bridge(r, true, true)));
      });
      var a = OUT_S[0], b = OUT_S[1], top = wingLow(OUT_Y, 9.4) + 0.04;
      var of = [[a, 0.03, 0.04], [a + 0.20, 0.08, 0.18], [a + 0.55, 0.10, 0.27], [b - 0.55, 0.10, 0.27],
                [b - 0.20, 0.08, 0.18], [b, 0.03, 0.05]];
      var rs = of.map(function (q) {
        return seRing(X(q[0]), sd * OUT_Y, top - q[2], q[1], top + 0.03, top - 2 * q[2], 14, 2.2, 2.2);
      });
      K.skin.push(orient(bridge(rs, true, true)));
    }
  }

  /* team colour: a band round each wing inboard of the tip */
  function addFlash(K) {
    var r = [], ys = [3.00, 3.30], i;
    for (i = 0; i < ys.length; i++) r.push(foil(wLE(ys[i]), wTE(ys[i]), ys[i], wz(ys[i]), wtc(ys[i]) * 1.08, 10, 0.02));
    K.team.push(orient(bridge(r, true, true)));
    K.team.push(orient(bridge(mirrorRings(r), true, true)));
  }

  /* =============================================================== gear ==
     P5: the nose unit at s 4.65, the twin mains at s 8.26, the outriggers
     at s 9.7 from their fairings; tyres 0.32 / 0.36 / 0.18 m radius (P5,
     P6). Legs at P6's static length: they reach the ground at the stance.
     Built in the final (pitched) frame. */
  function addGear(G) {
    var n = T(4.65, -0.08), m = T(8.26, 0.04), sd;
    var nr = 0.32, mr = 0.36, orr = 0.18, nx = n[0], mx = m[0];
    G.metal.push(rod([nx + 0.05, 0, n[1] + 0.05], [nx, 0, nr + 0.22], 0.075, 8));
    G.metal.push(rod([nx, 0.13, nr + 0.26], [nx, 0.13, nr], 0.035, 6));
    G.metal.push(rod([nx, -0.13, nr + 0.26], [nx, -0.13, nr], 0.035, 6));
    G.metal.push(boxG(0.12, 0.30, 0.08, nx, 0, nr + 0.28));
    G.metal.push(rod([nx + 0.50, 0, T(4.15, -0.08)[1]], [nx + 0.02, 0, nr + 0.55], 0.035, 6));
    G.tyre.push(wheelG(nr, 0.19, nx, 0, nr, 18));
    G.metal.push(wheelG(0.13, 0.21, nx, 0, nr, 10));
    var nd = T(4.35, -0.08);
    for (sd = -1; sd <= 1; sd += 2) G.skin.push(boxG(0.90, 0.03, 0.24, nd[0], sd * 0.22, nd[1] - 0.11));
    G.metal.push(rod([mx + 0.10, 0, m[1] + 0.05], [mx, 0, mr + 0.12], 0.10, 8));
    G.metal.push(rod([mx - 0.45, 0, T(8.71, 0.10)[1] + 0.03], [mx, 0, mr + 0.20], 0.045, 6));
    G.metal.push(rod([mx, -0.30, mr], [mx, 0.30, mr], 0.055, 8));
    for (sd = -1; sd <= 1; sd += 2) {
      G.tyre.push(wheelG(mr, 0.20, mx, sd * 0.17, mr, 20));
      G.metal.push(wheelG(0.16, 0.22, mx, sd * 0.17, mr, 12));
      var dd = T(8.8, 0.10);
      G.skin.push(boxG(1.30, 0.03, 0.22, dd[0], sd * 0.30, dd[1] - 0.10));
    }
    for (sd = -1; sd <= 1; sd += 2) {
      var o = T(9.70, wingLow(OUT_Y, 9.7) - 0.40), ox = o[0];
      G.metal.push(rod([ox + 0.04, sd * OUT_Y, o[1] + 0.05], [ox - 0.04, sd * (OUT_Y + 0.05), orr + 0.10], 0.045, 6));
      G.metal.push(rod([ox + 0.30, sd * OUT_Y, o[1]], [ox - 0.02, sd * (OUT_Y + 0.04), orr + 0.50], 0.025, 5));
      G.tyre.push(wheelG(orr, 0.10, ox - 0.04, sd * (OUT_Y + 0.06), orr, 14));
      G.metal.push(wheelG(0.07, 0.11, ox - 0.04, sd * (OUT_Y + 0.06), orr, 8));
    }
  }

  /* ============================================================== build == */
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
  function emit(parent, lists, mats, order, pitch) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      var geo = merge(lists[key]);
      if (pitch) geo.applyMatrix4(pitch);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  function build(THREE, M, C, which) {
    V = THREE;
    var v = VARIANTS[which];
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: [], team: [], hot: [], ink: [], dark: [], metal: [], glass: [] };
    var G = { skin: [], metal: [], tyre: [] };
    addBody(K, v);
    addCanopy(K, v);
    addWings(K);
    addTail(K, v);
    addNozzles(K);
    addStores(K);
    addFlash(K);
    addGear(G);
    /* the pitch: nose-up about the main-gear contact, then lifted so it
       stands CLR above the ground (T() is the same map) */
    var px = X(SP_);
    var pitch = new V.Matrix4().makeTranslation(px, 0, CLR)
      .multiply(new V.Matrix4().makeRotationY(-PITCH))
      .multiply(new V.Matrix4().makeTranslation(-px, 0, -HP));
    var mats = makeMats(C, v);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "hot", "ink", "dark", "metal", "glass"], pitch);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["skin", "metal", "tyre"], null);
    root.add(gear);
    return root;
  }

  return { build: build, VARIANTS: VARIANTS };
})();

/* len: the measured X extent of the pitched airframe, probe tip to the
   tail cone (13.91 / 14.50 m along the drawing datum; the pitch adds the
   tail cone's drop) */
UNIT_MODELS["gbr_e60_cas"]      = { len: 13.96, build: function (T, M, C) { return HeroHarrier1.build(T, M, C, "GR1"); } };
UNIT_MODELS["gbr_e80_cfighter"] = { len: 14.55, build: function (T, M, C) { return HeroHarrier1.build(T, M, C, "FRS1"); } };
