/* ============ ru_il10.js -- ILYUSHIN Il-10M SHTURMOVIK (HERO MODEL) ============

   One 1950s row flies it:
     pact_e50_cas   "Il-10M", Ilyushin Il-10M Shturmovik (1951-): the post-war
                    development of the Il-10 (first flight 2 July 1951, 146
                    built by works No. 168 and No. 47, 1952-54), made after the
                    Korean War experience. The pla_e50_cas and kpa_e50_cas rows
                    are plain Il-10 rows with their own keys; they are not
                    changed here (they still resolve as before).

   SOURCES
     A  Commons "Dreiseitenansicht Iljuschin IL10" (SVG three-view of the
        Il-10). The side, plan (from below) and front views were measured
        pixel by pixel into the tables below. The drawing's own scale is
        uniform but its length/span ratio (0.89) is long against the
        published 11.12 / 13.40 m (0.83), so the fuselage is taken at the
        side view's scale (580 px = 11.12 m) and the span at the published
        figure.
     B  Commons "Ilyushin Il-10 3-view silhouette" (check of A).
     C  Commons "Ilyushin Il-10M Soviet AF Monino 29.08.94" and the Monino
        Il-10M photographs on Commons (Flickr 17768837884, 18205277359,
        18203666378, 51565843858): port side, front three-quarter, rear
        three-quarter of the one preserved Il-10M.
     D  Commons "Ilyushin Il-10M (ID unknown)" 38325258964 / 38325263384 and
        "Ил-10M pic1" (an Il-10M indoors, Patriot park; the paint there is a
        wartime-style repaint and is not used).
     E  Commons "Avia B.33 MLP 05" (Krakow): the wing-root radiator intake,
        the six exhaust stubs, the long pointed spinner, close up.
     F  airwar.ru "Il-10M" (after Perov and Rastrenin): span 14.00 m, length
        11.87 m, height 4.24 m, wing area 33.0 m2; new outer wing panels with a
        Clark YH section and SQUARE-CUT tips; slotted flaps in place of the
        Schrenk flap; nose lengthened 250 mm and the tail 500 mm; the
        tailplane of a new planform raised 75 mm; all control surfaces
        enlarged; the tailwheel moved 700 mm aft (frame 12 to 14); new main
        gear without camber or toe, wheels 900 x 300 (were 800 x 260); four
        NR-23 in pairs in the wings; VU-9M turret with a B-20EN cannon; the
        ventral strake ("podfyuzelyazhny greben") fitted to every series
        Il-10M after the 1953 trials.
     G  Russian Wikipedia "Il-10": AM-42 V-12 under the long cowl, the
        three-blade left-hand AV-5L-24 propeller 3.6 m across, root section
        NACA 0018, the main legs folding aft through 89 deg while the wheel
        turns 86 deg to lie flat in the wing; the Il-10M slightly longer, more
        span, bigger control surfaces, false keel, thinner wing.

   RECOGNITION LIST (where each rests, and where it shows)
     1. Long slim cowl over the inline AM-42 tapering to a long pointed red
        spinner (A side view; C, E) -- the nose.
     2. Deep slab-sided armoured body ("tub") from the cowl to behind the
        gunner, the cowl top higher than the cockpit sill (A side) -- body.
     3. Six exhaust stubs a side along the cowl (E; A plan) -- black stubs.
     4. Radiator intakes in the wing-root leading edges either side of the
        belly (E), the ventral radiator fairing between them (A, from below).
     5. Two-seat hood: the pilot's flat-topped canopy and the gunner's hood
        behind it ending in the turret, B-20EN barrel aft (A, C, F).
     6. Low wing: a flat centre section 4.0 m across with the two gear
        fairings beneath, outer panels with about 6.5 deg dihedral (A front,
        C front three-quarter).
     7. Il-10M outer panels: 14.0 m span, 33 m2, square-cut tips (F; C rear
        three-quarter) -- the tips. Drawn: 33.0 m2 gross (root chord 2.71,
        joint 2.66, tip 1.80 m).
     8. Main gear: long single legs ahead of the fairings, big 900 x 300
        wheels, door plates beside them; the legs fold aft and the wheels turn
        flat into the wing (F, G; C) -- the "gear" group.
     9. Tall fin with a straight raked leading edge and round top, low
        tailplane, the ventral strake under the rear fuselage, tailwheel well
        aft (A, C, F).
    10. Three-blade propeller, 3.6 m (G; C).
    11. Two NR-23 barrels a side on the wing leading edge (F; C).
    12. Paint: olive green over light blue, the line high on the nose and
        low on the rear fuselage, red stars with a white border on the fin,
        rear fuselage and upper wings (C). Sampled off C (#7e7343 olive in
        sun, the blue in shade) and taken to about 0.8.

   STRETCH. Every station is measured on drawing A (an Il-10) and passed
   through ilm(), which adds F's 250 mm to the nose ahead of the wing and
   500 mm to the rear fuselage: 11.12 + 0.75 = 11.87 m, F's Il-10M length.

   NOT CONFIRMED: the Il-10M tailplane's new outline (F gives no figures; A's
   Il-10 outline is used, raised 75 mm and lengthened with the tail), the
   strake's outline (read off C), the outer-panel planform (A's leading edge
   kept, the chord set so the wing area is F's 33 m2 with the tip square), the
   leg length (the model sits level like the other taildragger heroes, so the
   main legs are about 0.4 m short of the 4.24 m height and the tailwheel leg
   long). The underwing items in C are not clearly racks or rails, so none are
   drawn. The red spinner is what every Il-10M photograph shows (museum
   aircraft).
   Marking: Soviet stars only, as the other Russian heroes; no bort numbers.
   Team colour (C.team): a small strip on the top of each wing near the tip.
   Undercarriage: it retracts (G), so it hangs in the "gear" group, lowest.
   Model space +X nose, +Y port, +Z up, metres, the thrust line level (z 0).
   ================================================================== */
var HeroIl10 = (function () {
  "use strict";
  var V = null;
  var PI = Math.PI, D2R = PI / 180;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ---- the Il-10M stretch (F): drawing station s (m aft of the spinner tip
     on A) to the Il-10M station; then to model x ---- */
  function ilm(s) {
    if (s <= 0.55) return s;
    if (s <= 2.40) return s + 0.25 * (s - 0.55) / 1.85;
    if (s <= 6.00) return s + 0.25;
    return s + 0.25 + 0.50 * (s - 6.00) / 5.12;
  }
  var XN = 5.80, LEN = 11.87;
  function X(s) { return XN - ilm(s); }       /* drawing station -> model x */
  function XM(sm) { return XN - sm; }         /* Il-10M station -> model x */

  /* ---- paint (C, about 0.8 of the sampled level) ---- */
  var PAL = { top: "#5d6141", topDk: "#4f5336", low: "#7896ad", lowDk: "#6a879d",
              red: "#a8261c", white: "#d9dad4" };

  /* ---- fuselage stations off A's side and plan views: drawing station,
     top z, bottom z, half width, section squareness ---- */
  var FT = {
    s:  [0.55, 0.70, 0.86, 1.05, 1.25, 1.44, 1.82, 2.20, 2.60, 3.00, 3.36, 3.62, 3.85, 4.30, 5.00, 5.50, 5.85, 6.25, 6.60, 7.10, 7.60, 8.20, 8.75, 9.30, 9.80, 10.30, 10.70, 11.00, 11.12],
    zt: [0.37, 0.40, 0.45, 0.51, 0.55, 0.58, 0.64, 0.68, 0.72, 0.74, 0.74, 0.71, 0.66, 0.60, 0.57, 0.555, 0.545, 0.53, 0.51, 0.47, 0.43, 0.39, 0.34, 0.27, 0.20, 0.13, 0.07, 0.02, -0.01],
    zb: [-0.37, -0.39, -0.45, -0.56, -0.62, -0.65, -0.70, -0.73, -0.75, -0.77, -0.78, -0.78, -0.78, -0.78, -0.77, -0.75, -0.73, -0.70, -0.67, -0.63, -0.59, -0.53, -0.47, -0.40, -0.33, -0.25, -0.17, -0.10, -0.05],
    hw: [0.37, 0.38, 0.41, 0.44, 0.47, 0.50, 0.53, 0.55, 0.565, 0.57, 0.57, 0.57, 0.565, 0.555, 0.55, 0.555, 0.56, 0.56, 0.55, 0.52, 0.47, 0.42, 0.36, 0.29, 0.22, 0.15, 0.10, 0.05, 0.02],
    e:  [2.0, 2.0, 2.1, 2.3, 2.5, 2.6, 2.7, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.3, 2.2, 2.2, 2.1, 2.1, 2.0, 2.0, 2.0]
  };
  function tab(key, s) {
    var a = FT.s, i;
    if (s <= a[0]) return FT[key][0];
    for (i = 0; i + 1 < a.length; i++) if (s <= a[i + 1]) return lerp(FT[key][i], FT[key][i + 1], (s - a[i]) / (a[i + 1] - a[i]));
    return FT[key][a.length - 1];
  }
  /* the inverse of ilm on the stretched rear (for placing parts by Il-10M station) */
  function drw(sm) {
    var lo = 0, hi = 11.12, k;
    for (k = 0; k < 40; k++) { var m = (lo + hi) / 2; if (ilm(m) < sm) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }

  /* ---- wing (A plan and front; F): Il-10M station of LE / TE, chord-plane z,
     thickness ratio. Centre section flat to y 2.0, outer panels 6.5 deg up. ---- */
  var HS = 7.0, YJ = 2.0, DIH = Math.tan(6.5 * D2R);
  function wst(y) {
    var le, te, zc, tc, c;
    if (y <= YJ) {
      le = 2.88 + 0.025 * y;
      te = 5.59 + (y < 1.15 ? 0.70 * Math.pow((1.15 - y) / 0.65, 1.6) : 0);   /* the root fillet (A) */
      zc = -0.45; tc = lerp(0.18, 0.14, clamp((y - 0.5) / (YJ - 0.5), 0, 1));
    } else {
      le = 2.93 + 0.194 * (y - YJ);
      c = lerp(2.66, 1.80, (y - YJ) / (HS - YJ));
      te = le + c;
      zc = -0.45 + (y - YJ) * DIH; tc = lerp(0.14, 0.117, (y - YJ) / (HS - YJ));
    }
    c = te - le;
    if (y > HS - 0.12) {                                /* square tip, small radius at the corners */
      var u = (y - (HS - 0.12)) / 0.12;
      le += 0.10 * u * u; te -= 0.06 * u * u; tc *= (1 - 0.35 * u * u);
      c = te - le;
    }
    return { y: y, le: XM(le), te: XM(te), zc: zc, th: tc * c };
  }
  var WY = [0.50, 0.75, 1.0, 1.25, 1.6, 2.0, 2.6, 3.3, 4.0, 4.8, 5.6, 6.3, 6.80, 6.92, 7.0];

  /* ---- small geometry helpers ---- */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* an aerofoil as an OPEN ring: upper TE..LE then lower LE..TE (2m+2 points);
     returns [x, t] with t the thickness offset, and a flag for the lower side */
  function foilOpen(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / Math.max(c, 0.01);
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, yt(f, tc) * c, 0]); }
    for (i = m; i >= 0; i--) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, -yt(f, tc) * c, 1]); }
    return p;
  }
  /* loft rings of points (each point [x, y, z, u, v]); open rings, no wrap.
     Each triangle is turned to face away from its rings' centre line. */
  function loftUV(rings, capStart, capEnd) {
    var n = rings[0].length, pos = [], uv = [], idx = [], r, j;
    var cen = rings.map(function (R) {
      var cx = 0, cy = 0, cz = 0; R.forEach(function (p) { cx += p[0]; cy += p[1]; cz += p[2]; });
      return [cx / R.length, cy / R.length, cz / R.length];
    });
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) {
      var p = rings[r][j]; pos.push(p[0], p[1], p[2]); uv.push(p[3], p[4]);
    }
    function tri(a, b, c, ref) {
      var A = a * 3, B = b * 3, Cc = c * 3;
      var ux = pos[B] - pos[A], uy = pos[B + 1] - pos[A + 1], uz = pos[B + 2] - pos[A + 2];
      var vx = pos[Cc] - pos[A], vy = pos[Cc + 1] - pos[A + 1], vz = pos[Cc + 2] - pos[A + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var mx = (pos[A] + pos[B] + pos[Cc]) / 3 - ref[0], my = (pos[A + 1] + pos[B + 1] + pos[Cc + 1]) / 3 - ref[1],
          mz = (pos[A + 2] + pos[B + 2] + pos[Cc + 2]) / 3 - ref[2];
      if (nx * mx + ny * my + nz * mz < 0) idx.push(a, c, b); else idx.push(a, b, c);
    }
    for (r = 0; r + 1 < rings.length; r++) {
      var ref = [(cen[r][0] + cen[r + 1][0]) / 2, (cen[r][1] + cen[r + 1][1]) / 2, (cen[r][2] + cen[r + 1][2]) / 2];
      for (j = 0; j + 1 < n; j++) {
        var a = r * n + j, b = a + 1, c = a + n, d = c + 1;
        tri(a, b, c, ref); tri(b, d, c, ref);
      }
    }
    function cap(rI, nb) {
      var ci = pos.length / 3, C = cen[rI], O = cen[nb], k;
      pos.push(C[0], C[1], C[2]); uv.push(rings[rI][0][3], rings[rI][0][4]);
      var out = [2 * C[0] - O[0], 2 * C[1] - O[1], 2 * C[2] - O[2]];
      var inv = [2 * O[0] - C[0], 2 * O[1] - C[1], 2 * O[2] - C[2]];
      for (k = 0; k + 1 < n; k++) tri(ci, rI * n + k, rI * n + k + 1, inv);
      void out;
    }
    if (capStart) cap(0, 1);
    if (capEnd) cap(rings.length - 1, rings.length - 2);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  function sub(arr, i, t) {
    var n = arr.length;
    return cr(arr[Math.max(i - 1, 0)], arr[i], arr[Math.min(i + 1, n - 1)], arr[Math.min(i + 2, n - 1)], t);
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylX(r0, r1, len, x, y, z, seg) {   /* r0 at the +X end */
    var g = new V.CylinderGeometry(r0, r1, len, seg || 16);
    g.rotateZ(-PI / 2); g.translate(x, y, z); return g;
  }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, true);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function merge(list) {
    var pos = [], nor = [], uv = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array, u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3; j++) { uv.push(u ? u[j * 2] : 0.5, u ? u[j * 2 + 1] : 0.5); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    order.forEach(function (key) { if (lists[key] && lists[key].length) parent.add(new V.Mesh(merge(lists[key]), mats[key])); });
  }
  /* give a plain geometry fixed uv (a flat colour spot on a sheet) */
  function spot(g, u, v) {
    var n = g.attributes.position.count, a = new Float32Array(n * 2), i;
    for (i = 0; i < n; i++) { a[i * 2] = u; a[i * 2 + 1] = v; }
    g.setAttribute("uv", new V.Float32BufferAttribute(a, 2)); return g;
  }

  /* ============================== textures ============================== */
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvas(W, H) { var cv = document.createElement("canvas"); cv.width = W; cv.height = H; return cv; }
  function texOf(cv) {
    var t = new V.CanvasTexture(cv);
    t.wrapS = t.wrapT = V.RepeatWrapping;
    if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }
  /* a Soviet star: white border then red, centre (cx, cy), radius r px, with
     separate x/y pixel scales (sx, sy) so it lands round on a stretched sheet */
  function star(g, cx, cy, r, sx, sy, rot) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + (rot || 0) + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * r * k * sx, y = cy + Math.sin(a) * q * r * k * sy;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = PAL.white; path(1.0); g.fill();
    g.fillStyle = PAL.red; path(0.84); g.fill();
  }
  function seams(g, W, H, R, n, x0, x1, y0, y1) {
    var i;
    g.strokeStyle = "rgba(20,22,18,0.26)"; g.lineWidth = 1.2;
    for (i = 0; i < n; i++) {
      var px = x0 + R() * (x1 - x0), py = y0 + R() * (y1 - y0), L = 20 + R() * 90;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(px, py); g.lineTo(px + L, py); } else { g.moveTo(px, py); g.lineTo(px, py + L * 0.6); }
      g.stroke();
    }
    g.fillStyle = "rgba(0,0,0,0.16)";
    for (i = 0; i < 24; i++) {
      var ry = y0 + R() * (y1 - y0), rx = x0 + R() * (x1 - x0) * 0.85, m = 10 + ((R() * 24) | 0);
      for (var k = 0; k < m; k++) g.fillRect(rx + k * 6, ry, 1.4, 1.4);
    }
  }
  function mottle(g, W, H, R, col, n, y0, y1) {
    g.fillStyle = col;
    for (var i = 0; i < n; i++) {
      g.globalAlpha = 0.10 + R() * 0.12;
      g.fillRect(R() * W, y0 + R() * (y1 - y0), 30 + R() * 90, 10 + R() * 30);
    }
    g.globalAlpha = 1;
  }

  /* BODY sheet: u = (XN - x) / LEN, nose at u 0; v round the section: 0 port,
     0.25 top, 0.5 starboard, 0.75 belly. After flipY the canvas row is
     (1 - v) H: belly at 0.25 H, top at 0.75 H. */
  function bu(sm) { return 0.1 + 0.9 * sm / LEN; }
  function blueHalf(sm) {        /* half-width of the blue belly band, in v (C) */
    return sm < 1.2 ? lerp(0.23, 0.215, sm / 1.2) : sm < 6.5 ? lerp(0.215, 0.17, (sm - 1.2) / 5.3) : lerp(0.17, 0.12, clamp((sm - 6.5) / 4.0, 0, 1));
  }
  var _sheets = null;
  function sheets() {
    if (_sheets) return _sheets;
    _sheets = {};
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(1044), i;
      g.fillStyle = PAL.top; g.fillRect(0, 0, W, H);
      mottle(g, W, H, R, PAL.topDk, 26, 0, H);
      /* the spinner red lives at u < 0.04 (the fuselage starts at u 0.046) */
      g.fillStyle = PAL.red; g.fillRect(0, 0, 0.085 * W, H);
      /* the blue belly band, its edge a little soft (C: sprayed) */
      g.fillStyle = PAL.low;
      for (i = Math.floor(0.1 * W); i < W; i += 2) {
        var hb = blueHalf((i / W - 0.1) / 0.9 * LEN) * H;
        g.fillRect(i, 0.25 * H - hb, 2, 2 * hb);
      }
      g.fillStyle = "rgba(93,97,65,0.5)";
      for (i = Math.floor(0.1 * W); i < W; i += 2) {
        var hb2 = blueHalf((i / W - 0.1) / 0.9 * LEN) * H;
        g.fillRect(i, 0.25 * H - hb2 - 1.5, 2, 3); g.fillRect(i, 0.25 * H + hb2 - 1.5, 2, 3);
      }
      mottle(g, W, H, R, PAL.lowDk, 8, 0.12 * H, 0.38 * H);
      g.fillStyle = PAL.red; g.fillRect(0, 0, 0.085 * W, H);
      seams(g, W, H, R, 70, 0.10 * W, W, 0, H);
      /* frames: cowl panels, the armour body joint, the tail joint */
      g.strokeStyle = "rgba(18,20,16,0.50)"; g.lineWidth = 2;
      [0.62, 1.40, 2.30, 2.98, 6.35, 8.10].forEach(function (sm) {
        g.beginPath(); g.moveTo(bu(sm) * W, 0); g.lineTo(bu(sm) * W, H); g.stroke();
      });
      /* the cowl side hatch line under the stubs and the louvred vent behind
         them (A side view, C) on both sides (rows 0.95 H port, 0.55 H starboard
         are mid-side; the stubs sit a little above) */
      [[0.93, 0.95], [0.57, 0.55]].forEach(function (q) {
        g.strokeStyle = "rgba(18,20,16,0.45)"; g.lineWidth = 1.6;
        g.strokeRect(bu(1.25) * W, (q[0] - 0.035) * H, (bu(2.75) - bu(1.25)) * W, 0.07 * H);
        g.fillStyle = "rgba(14,15,12,0.75)";
        for (var k = 0; k < 6; k++) g.fillRect((bu(2.82) + k * 0.004) * W, (q[1] - 0.045) * H, 2, 0.05 * H);
      });
      /* exhaust soot aft of the stubs, along both sides */
      [0.90, 0.60].forEach(function (row) {
        var s = g.createLinearGradient(bu(2.6) * W, 0, bu(4.6) * W, 0);
        s.addColorStop(0, "rgba(30,28,24,0.55)"); s.addColorStop(1, "rgba(30,28,24,0)");
        g.fillStyle = s; g.fillRect(bu(2.6) * W, (row - 0.04) * H, (bu(4.6) - bu(2.6)) * W, 0.08 * H);
      });
      /* the star on each side of the rear fuselage (C), at Il-10M station 8.45,
         just above the side line; v scale from the local girth */
      var sm = 8.45, sd = drw(sm), hw = tab("hw", sd), hh = (tab("zt", sd) - tab("zb", sd)) / 2;
      var girth = PI * (3 * (hw + hh) - Math.sqrt((3 * hw + hh) * (hw + 3 * hh)));
      var sx = 0.9 * W / LEN, sy = H / girth, rr = 0.36;
      star(g, bu(sm) * W, 0.985 * H - 0.0 * H, rr, sx, sy);           /* port: v ~ 0.015 */
      star(g, bu(sm) * W, 0.515 * H, rr, sx, -sy);                     /* starboard: v ~ 0.485, point to the top */
      star(g, bu(sm) * W, -0.015 * H, rr, sx, sy);                     /* port star wrapping over row 0 */
      _sheets.body = texOf(cv);
    } catch (e) { _sheets.body = null; }
    try {
      /* WING sheet: u = (WX0 - x) / WSPAN over the chord box, v: lower surface
         0..0.5 (|y| / HS / 2), upper 0.5..1. After flipY upper is the top half. */
      var W2 = 1024, H2 = 512, cv2 = canvas(W2, H2), g2 = cv2.getContext("2d"), R2 = rngFor(733);
      g2.fillStyle = PAL.top; g2.fillRect(0, 0, W2, H2 / 2);
      g2.fillStyle = PAL.low; g2.fillRect(0, H2 / 2, W2, H2 / 2);
      mottle(g2, W2, H2, R2, PAL.topDk, 20, 0, H2 / 2);
      mottle(g2, W2, H2, R2, PAL.lowDk, 8, H2 / 2, H2);
      seams(g2, W2, H2, R2, 70, 0, W2, 0, H2);
      function U(sm) { return (sm - WU0) / (WU1 - WU0) * W2; }
      function Vt(y) { return (1 - (0.5 + 0.5 * y / HS)) * H2; }    /* upper */
      function Vb(y) { return (1 - 0.5 * y / HS) * H2; }            /* lower */
      g2.strokeStyle = "rgba(16,18,14,0.62)"; g2.lineWidth = 2.4;
      [Vt, Vb].forEach(function (Vf) {
        /* slotted flap y 0.6..4.4 and aileron 4.5..6.9, hinge at 75 % chord (F) */
        function hinge(y0, y1, f) {
          var a = wst(y0), b = wst(y1);
          var xa = XN - a.le + f * (a.le - a.te), xb = XN - b.le + f * (b.le - b.te);
          g2.beginPath(); g2.moveTo(U(xa), Vf(y0)); g2.lineTo(U(xb), Vf(y1)); g2.stroke();
          g2.beginPath(); g2.moveTo(U(xa), Vf(y0)); g2.lineTo(U(XN - a.te), Vf(y0)); g2.stroke();
          g2.beginPath(); g2.moveTo(U(xb), Vf(y1)); g2.lineTo(U(XN - b.te), Vf(y1)); g2.stroke();
        }
        hinge(0.65, 4.40, 0.74); hinge(4.50, 6.88, 0.74);
        /* the centre-section joint at y 2.0 */
        g2.lineWidth = 1.8;
        g2.beginPath(); g2.moveTo(U(XN - wst(YJ).le), Vf(YJ)); g2.lineTo(U(XN - wst(YJ).te), Vf(YJ)); g2.stroke();
        g2.lineWidth = 2.4;
      });
      /* the star on each upper wing (C), mid outer panel */
      var wsY = 5.05, wsS = wst(wsY), wsX = XN - (wsS.le + wsS.te) / 2;
      star(g2, U(wsX), Vt(wsY), 0.52, W2 / (WU1 - WU0), H2 / (2 * HS), -PI / 2);   /* a point to the nose */
      _sheets.wing = texOf(cv2);
    } catch (e) { _sheets.wing = null; }
    try {
      /* FIN sheet: planar (x, z) */
      var W3 = 512, H3 = 256, cv3 = canvas(W3, H3), g3 = cv3.getContext("2d"), R3 = rngFor(919);
      function U3(sm) { return (sm - FU0) / (FU1 - FU0) * W3; }
      function V3(z) { return (1 - (z - FZ0) / (FZ1 - FZ0)) * H3; }
      g3.fillStyle = PAL.top; g3.fillRect(0, 0, W3, H3);
      mottle(g3, W3, H3, R3, PAL.topDk, 6, 0, H3);
      seams(g3, W3, H3, R3, 14, 0, W3, 0, H3);
      g3.strokeStyle = "rgba(16,18,14,0.6)"; g3.lineWidth = 2.2;
      g3.beginPath(); g3.moveTo(U3(10.72), V3(0.30)); g3.lineTo(U3(10.72), V3(1.80)); g3.stroke();   /* rudder hinge */
      star(g3, U3(10.62), V3(1.02), 0.46, W3 / (FU1 - FU0), H3 / (FZ1 - FZ0));
      _sheets.fin = texOf(cv3);
    } catch (e) { _sheets.fin = null; }
    return _sheets;
  }
  var WU0 = 1.6, WU1 = 7.0;          /* wing sheet chord box, Il-10M stations (u along) */
  var FU0 = 9.0, FU1 = 12.0, FZ0 = 0.2, FZ1 = 1.95;

  function makeMats(C) {
    var S = sheets(), m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    function sk(tex, fall) {
      var q = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.74, metalness: 0.10, side: V.DoubleSide });
      if (tex) q.map = tex; else q.color.set(fall);
      return q;
    }
    m.body = sk(S.body, PAL.top);
    m.wing = sk(S.wing, PAL.top);
    m.fin = sk(S.fin, PAL.top);
    m.under = new V.MeshStandardMaterial({ color: PAL.low, roughness: 0.72, metalness: 0.10, side: V.DoubleSide });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.62, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x55595b, roughness: 0.50, metalness: 0.55, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x0c0d0d, roughness: 0.92, metalness: 0.05, side: V.DoubleSide });
    m.spin = new V.MeshStandardMaterial({ color: PAL.red, roughness: 0.55, metalness: 0.10, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x41524f, roughness: 0.10, metalness: 0.55, transparent: true, opacity: 0.78, side: V.DoubleSide });
    m.propDisc = new V.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.14,
                                              depthWrite: false, side: V.DoubleSide });
    return m;
  }

  /* ============================== parts ============================== */
  function fuselage() {
    var rings = [], i, s, t, n = FT.s.length, N = 28, PER = 2;
    function ring(sd, zt, zb, hw, e) {
      var p = [], j, x = X(sd), zc = (zt + zb) / 2, b = (zt - zb) / 2, u = bu(ilm(sd));
      for (j = 0; j <= N; j++) {
        var a = j / N * 2 * PI, c = Math.cos(a), sn = Math.sin(a);
        p.push([x, hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e), zc + b * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 2 / e), u, j / N]);
      }
      return p;
    }
    for (i = 0; i + 1 < n; i++) for (s = 0; s < PER; s++) {
      t = s / PER;
      var sd = sub(FT.s, i, t), zt = sub(FT.zt, i, t), zb = sub(FT.zb, i, t), hw = sub(FT.hw, i, t), e = sub(FT.e, i, t);
      rings.push(ring(sd, zt, Math.min(zb, zt - 0.04), Math.max(hw, 0.02), e));
    }
    rings.push(ring(FT.s[n - 1], FT.zt[n - 1], FT.zb[n - 1], FT.hw[n - 1], 2));
    return loftUV(rings, true, true);
  }
  function spinner() {
    /* long pointed spinner (A, E): drawing station, radius */
    var P = [[0.00, 0.02], [0.06, 0.07], [0.14, 0.13], [0.24, 0.20], [0.34, 0.26], [0.44, 0.31], [0.52, 0.345], [0.57, 0.36]];
    var pts = P.map(function (q) { return new V.Vector2(q[1], -q[0]); });
    var g = new V.LatheGeometry(pts, 24);
    g.rotateZ(-PI / 2);                /* lathe axis Y -> X; -y (aft) maps to -x */
    g.translate(XN, 0, 0);
    return g;
  }
  function blade(angle) {
    /* one AV-5L-24 blade, radius 1.80 m (G): chord and twist along the span */
    var rings = [], k, R = 1.80, ST = [0.30, 0.45, 0.70, 0.95, 1.20, 1.45, 1.65, 1.76, 1.80];
    for (k = 0; k < ST.length; k++) {
      var r = ST[k], f = r / R;
      var ch = f < 0.35 ? lerp(0.12, 0.30, (f - 0.17) / 0.18) : f < 0.92 ? lerp(0.30, 0.26, (f - 0.35) / 0.57) : lerp(0.26, 0.08, (f - 0.92) / 0.08);
      var tw = lerp(52, 18, f) * D2R, th = lerp(0.09, 0.012, f);
      var ring = [], m, M = 6;
      for (m = 0; m <= 2 * M + 1; m++) {
        var up = m <= M, i = up ? m : 2 * M + 1 - m, ff = 0.5 * (1 - Math.cos(PI * i / M));
        var cx = (ff - 0.4) * ch, ct = (up ? 1 : -1) * th * 0.5 * Math.sin(PI * ff) * (ff < 0.05 ? 0.4 : 1);
        /* blade frame: span along z', chord in the disc plane (y'), thickness along x' */
        var yb = cx * Math.cos(tw) - ct * Math.sin(tw), xb = cx * Math.sin(tw) + ct * Math.cos(tw);
        var ca = Math.cos(angle), sa = Math.sin(angle);
        ring.push([XN - 0.50 + xb, yb * ca - r * sa, yb * sa + r * ca, 0.5, 0.5]);
      }
      rings.push(ring);
    }
    return loftUV(rings, false, true);
  }
  function canopy() {
    /* the hood over both seats (A): Il-10M station, top z, half width; sill z */
    var CR = [[3.86, 0.66, 0.33], [4.00, 0.86, 0.37], [4.16, 1.00, 0.39], [4.60, 1.02, 0.40], [5.05, 1.02, 0.40], [5.33, 1.00, 0.39], [5.50, 0.94, 0.36], [5.62, 0.84, 0.32], [5.74, 0.66, 0.27]];
    var ZB = 0.54;
    var rings = CR.map(function (q) {
      var p = [], i;
      for (i = 0; i <= 10; i++) { var a = PI * i / 10; p.push([XM(q[0]), q[2] * Math.cos(a), ZB + (q[1] - ZB) * Math.sin(a), 0.5, 0.5]); }
      return p;
    });
    return { geo: loftUV(rings, true, true), CR: CR, ZB: ZB };
  }
  function canopyFrames(cn, out) {
    function at(sm) {
      var r = cn.CR, i = 0;
      while (i + 2 < r.length && sm > r[i + 1][0]) i++;
      var t = clamp((sm - r[i][0]) / (r[i + 1][0] - r[i][0]), 0, 1);
      return [lerp(r[i][1], r[i + 1][1], t), lerp(r[i][2], r[i + 1][2], t)];
    }
    /* hoops at A's frame stations (+0.25 m) and the windscreen frame */
    [4.16, 4.56, 4.81, 5.33].forEach(function (sm) {
      var q = at(sm), prev = null, j;
      for (j = 0; j <= 8; j++) {
        var a = PI * j / 8, pt = [XM(sm), q[1] * 1.03 * Math.cos(a), cn.ZB + (q[0] - cn.ZB) * 1.03 * Math.sin(a)];
        if (prev) out.push(rod(prev, pt, 0.013, 4));
        prev = pt;
      }
    });
    /* the roof rails each side and the windscreen corner posts */
    [-1, 1].forEach(function (sd) {
      var k, prev = null;
      for (k = 0; k <= 8; k++) {
        var sm = lerp(4.10, 5.60, k / 8), q = at(sm), a = 0.62;
        var pt = [XM(sm), sd * q[1] * 1.03 * Math.cos(a), cn.ZB + (q[0] - cn.ZB) * 1.03 * Math.sin(a)];
        if (prev) out.push(rod(prev, pt, 0.015, 4));
        prev = pt;
      }
      var q0 = at(3.90), q1 = at(4.16), aw = 0.95;
      out.push(rod([XM(3.90), sd * q0[1] * 1.03 * Math.cos(aw), cn.ZB + (q0[0] - cn.ZB) * 1.03 * Math.sin(aw)],
                   [XM(4.16), sd * q1[1] * 1.03 * Math.cos(aw), cn.ZB + (q1[0] - cn.ZB) * 1.03 * Math.sin(aw)], 0.016, 4));
    });
  }
  function wingSide(side) {
    var rings = WY.map(function (y) {
      var st = wst(y), m = 12;
      return foilOpen(st.le, st.te, st.th, m).map(function (p) {
        var sm = XN - p[0], u = (sm - WU0) / (WU1 - WU0), v = p[2] ? 0.5 * y / HS : 0.5 + 0.5 * y / HS;
        return [p[0], side * y, st.zc + p[1], u, v];
      });
    });
    return loftUV(rings, false, true);
  }
  function finGeo() {
    /* fin (A side view, stretched with the tail): z, LE / TE Il-10M station, thickness */
    var FS = [[0.00, 10.95, 11.86, 0.10], [0.25, 9.10, 11.86, 0.20], [0.70, 9.55, 11.84, 0.17], [1.10, 9.96, 11.78, 0.13], [1.45, 10.30, 11.68, 0.10],
              [1.65, 10.52, 11.52, 0.07], [1.77, 10.74, 11.30, 0.05], [1.82, 10.95, 11.08, 0.02]];
    var rings = FS.map(function (q) {
      return foilOpen(XM(q[1]), XM(q[2]), q[3], 10).map(function (p) {
        var sm = XN - p[0];
        return [p[0], p[1], q[0], (sm - FU0) / (FU1 - FU0), (q[0] - FZ0) / (FZ1 - FZ0)];
      });
    });
    return loftUV(rings, false, true);
  }
  function tailplaneSide(side) {
    /* tailplane (A plan, the Il-10 outline), raised 75 mm for the Il-10M (F):
       half span y, LE / TE drawing stations, thickness */
    var TP = [[0.15, 8.85, 10.40, 0.15], [0.80, 9.05, 10.40, 0.12], [1.50, 9.27, 10.38, 0.09], [2.00, 9.45, 10.36, 0.07],
              [2.22, 9.62, 10.33, 0.05], [2.34, 9.82, 10.24, 0.03], [2.38, 10.00, 10.10, 0.015]];
    var ZT = 0.07 + 0.075;
    var rings = TP.map(function (q) {
      return foilOpen(X(q[1]), X(q[2]), q[3], 8).map(function (p) {
        var sm = XN - p[0], u = (sm - WU0) / (WU1 - WU0), v = p[2] ? 0.5 * q[0] / HS * 0.25 : 0.5 + 0.5 * q[0] / HS * 0.25;
        return [p[0], side * q[0], ZT + p[1], u, v];
      });
    });
    return loftUV(rings, false, true);
  }
  function strake() {
    /* the Il-10M ventral strake (F; outline off C): Il-10M stations, depth */
    var rings = [], k, S0 = 8.30, S1 = 10.20;
    for (k = 0; k <= 6; k++) {
      var sm = lerp(S0, S1, k / 6), sd = drw(sm), zb = tab("zb", sd);
      var dep = 0.02 + 0.20 * Math.pow(k / 6, 0.8), w = 0.035;
      var p = [], j, N = 8;
      for (j = 0; j <= N; j++) {
        var a = j / N * 2 * PI;
        p.push([XM(sm), w * Math.cos(a), zb + 0.05 - (dep * 0.5 + 0.03) * (1 - Math.sin(a)), bu(sm), 0.75]);
      }
      rings.push(p);
    }
    return loftUV(rings, true, true);
  }
  function podSide(side, list, ink) {
    /* the main-gear fairing under the centre section (A front and plan): a
       tear-drop from Il-10M station 2.63 to 4.65, centred at y 1.42 */
    var rings = [], k, yc = side * 1.42, S0 = 2.63, S1 = 4.65;
    for (k = 0; k <= 8; k++) {
      var t = k / 8, sm = lerp(S0, S1, t), r = 0.21 * Math.pow(Math.sin(PI * Math.min(1, t * 1.6 + 0.02) * 0.5), 0.7) * (t > 0.7 ? lerp(1, 0.75, (t - 0.7) / 0.3) : 1);
      var zc = -0.66 - r * 0.55 + 0.04, p = [], j, N = 14;
      for (j = 0; j <= N; j++) { var a = j / N * 2 * PI; p.push([XM(sm), yc + r * Math.cos(a), zc + r * 1.05 * Math.sin(a), 0.5, 0.25]); }
      rings.push(p);
    }
    list.push(loftUV(rings, true, true));
    /* the wheel-well opening at the back of the fairing (A: the wheel lies
       there half out of the wing when retracted) */
    var disk = new V.CircleGeometry(0.40, 20, 0, PI);
    disk.rotateX(PI); disk.rotateZ(-PI / 2); disk.translate(XM(4.25), yc, -0.685);
    ink.push(disk);
  }

  function build(THREE, M, C) {
    V = THREE;
    var side, k;
    var K = { body: [], wing: [], fin: [], under: [], team: [], metal: [], ink: [], glass: [], spin: [], propDisc: [] };
    var G = { metal: [], ink: [], under: [] };

    K.body.push(fuselage());
    K.body.push(strake());
    K.body.push(spot(spinner(), 0.042, 0.5));
    K.fin.push(finGeo());
    var cn = canopy(); K.glass.push(cn.geo); canopyFrames(cn, K.ink);
    /* the armoured headrest frame between the seats, seen through the glass */
    K.ink.push(box(0.06, 0.62, 0.36, XM(4.95), 0, 0.70));

    /* six exhaust stubs a side along the cowl (E, A) */
    for (side = -1; side <= 1; side += 2) for (k = 0; k < 6; k++) {
      var sd = 1.18 + k * 0.215, smk = ilm(sd), hwk = tab("hw", sd);
      var st = cylX(0.055, 0.065, 0.16, XM(smk), side * (hwk + 0.035), 0.16, 8);
      K.ink.push(st);
    }
    /* the B-20EN barrel of the VU-9M turret pointing aft (A, F) */
    K.metal.push(rod([XM(5.62), 0, 0.86], [XM(6.30), 0, 1.04], 0.028, 6));
    K.metal.push(rod([XM(6.30), 0, 1.04], [XM(6.42), 0, 1.075], 0.040, 6));

    /* propeller: three blades and a faint blur disc (no spin, as the Skyraider) */
    for (k = 0; k < 3; k++) K.ink.push(blade(k * 2 * PI / 3));
    var disc = new V.CircleGeometry(1.80, 48); disc.rotateY(PI / 2); disc.translate(XN - 0.50, 0, 0); K.propDisc.push(disc);

    /* wings */
    for (side = -1; side <= 1; side += 2) {
      K.wing.push(wingSide(side));
      K.wing.push(tailplaneSide(side));
      podSide(side, K.under, K.ink);
      /* the radiator intake in each wing-root leading edge (E) */
      var ri = wst(0.78), ig = new V.CylinderGeometry(0.17, 0.17, 0.10, 16);
      ig.rotateZ(PI / 2); ig.scale(1, 1.0, 0.55); ig.translate(ri.le - 0.03, side * 0.80, ri.zc + 0.02); K.ink.push(ig);
      /* two NR-23 barrels a side, paired (F; C) */
      [2.45, 2.72].forEach(function (yy) {
        var w = wst(yy);
        K.metal.push(cylX(0.026, 0.030, 0.62, w.le + 0.24, side * yy, w.zc - 0.02, 6));
        K.metal.push(cylX(0.055, 0.055, 0.12, w.le - 0.02, side * yy, w.zc - 0.02, 8));
      });
      /* team strip on the top of each wing near the tip (modest) */
      var ws = wst(6.25), cx = ws.le - 0.45 * (ws.le - ws.te);
      var tb = new V.BoxGeometry(0.42, 0.55, 0.02); tb.rotateX(side * 6.5 * D2R);
      tb.translate(cx, side * 6.25, ws.zc + 0.47 * ws.th + 0.012); K.team.push(tb);
    }
    /* the ventral radiator fairing between the wing roots (A, from below) */
    var vr = new V.SphereGeometry(0.5, 14, 8); vr.scale(0.85, 0.30, 0.16); vr.translate(XM(3.20), 0, -0.80); K.under.push(vr);
    K.ink.push(box(0.04, 0.34, 0.10, XM(2.80), 0, -0.80));

    /* ----- undercarriage, the lowest part: retracts (G), so "gear" ----- */
    var ZG = -2.00, RW = 0.45, AX = 2.85;         /* ground line; 900 x 300 wheel (F) */
    for (side = -1; side <= 1; side += 2) {
      var yw = side * 1.42;
      G.metal.push(rod([XM(2.72), yw - side * 0.17, -0.74], [XM(AX), yw - side * 0.17, ZG + RW], 0.075, 8));     /* oleo leg, inboard of the wheel */
      G.metal.push(rod([XM(AX), yw - side * 0.17, ZG + RW], [XM(AX), yw, ZG + RW], 0.05, 6));                     /* stub axle */
      G.metal.push(rod([XM(3.70), yw - side * 0.15, -0.80], [XM(2.78), yw - side * 0.17, -1.20], 0.035, 6));      /* the folding brace, aft */
      var ty = new V.TorusGeometry(RW - 0.13, 0.13, 8, 22); ty.rotateX(PI / 2); ty.translate(XM(AX), yw, ZG + RW); G.ink.push(ty);
      G.metal.push(cylY(0.30, 0.20, XM(AX), yw, ZG + RW, 16));
      /* the door plate outboard of the wheel (C) */
      G.under.push(box(0.74, 0.025, 0.86, XM(AX - 0.02), yw + side * 0.21, -1.17));
    }
    /* tailwheel, 700 mm further aft on the Il-10M (F), its leg long because
       the model sits level */
    var TW = 10.40, twd = drw(TW), zbt = tab("zb", twd);
    G.metal.push(rod([XM(TW - 0.10), 0, zbt + 0.05], [XM(TW + 0.05), 0, ZG + 0.20], 0.045, 6));
    G.metal.push(rod([XM(TW + 0.05), -0.07, ZG + 0.20], [XM(TW + 0.05), 0.07, ZG + 0.20], 0.03, 6));
    var tw = new V.TorusGeometry(0.13, 0.07, 6, 16); tw.rotateX(PI / 2); tw.translate(XM(TW + 0.05), 0, ZG + 0.20); G.ink.push(tw);

    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["body", "wing", "fin", "under", "team", "ink", "metal", "spin", "glass", "propDisc"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["metal", "ink", "under"]);
    root.add(gear);
    return root;
  }
  return { build: build };
})();

/* len: the measured X extent, spinner tip (5.80) to rudder (-6.07) = F's 11.87 m */
UNIT_MODELS["pact_e50_cas"] = { len: 11.87, build: function (THREE, M, C) { return HeroIl10.build(THREE, M, C); } };
