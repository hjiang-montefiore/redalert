/* ============ kpa_air.js -- KPA AIRCRAFT: An-2 AND HUGHES 500D (HERO MODELS) ============

   Two airframes for the Korean People's Army rows that had none:

     kpa_e60_transport, kpa_e80_transport, kpa_e00_transport
         "An-2 Colt", Antonov An-2 / Nanchang Y-5: HeroKpaAir.an2
     kpa_e80_md500, kpa_e90_md500, kpa_e00_md500
         "MD 500D", Hughes/MD 500D (Model 369D): HeroKpaAir.md500d

   Both drawn PLAIN: no KPAF roundel, no bort or registration number, no
   Air Koryo titles. Team colour (C.team) as small strips only.

   ======================================================================
   1. ANTONOV An-2

   REFERENCES (Wikimedia Commons, fetched at 960/1600 px)
     A  "Antonov An-2 3view.svg" (rendered 1600 px): side, plan (upper wing)
        and head-on views of the An-2 with every panel line. All three views
        share one scale: the upper span is 1079 px (plan) and 1074 px (front),
        the length 742 px (plan) and 745 px (side). The scale is set by the
        published upper span: 18.2 m / 1079 px = 0.01687 m/px. The side view
        draws the fuselage datum LEVEL with the ground line tilted (three-point
        attitude), so heights are read in the level frame, above the main
        wheel bottom.
     B  "Antonov An-2T three-view silhouette.png" (check of A: the same
        layout, struts and wires).
     C  "Antonov AN-2 (cropped).jpg" (Estonian AF An-2 in flight, port side
        from ahead): uniform military green, the X wires between the wings,
        the single I-strut, the tailplane strut, the V main gear, the four
        portholes and the door on the port side.
     D  "An-2 OK-HFL EDST 02.jpg" (port side, front three-quarter, on the
        ground): the I-strut with its forked ends, the four-blade paddle
        propeller, the open cowl front with the engine face, the oil-cooler
        chin intake, the main gear legs to the lower wing root.
   PUBLISHED (en.wikipedia "Antonov An-2", after "Biplanes, Triplanes and
   Seaplanes"): length 12.4 m, upper span 18.2 m, lower span 14.2 m, height
   4.1 m, wing area 71.52 m2, one ASh-62IR, four-blade propeller.

   RECOGNITION LIST (each must show at game zoom)
     1. Unequal-span biplane: the upper wing 18.2 m on the cabin roof, the
        lower 14.2 m at the belly, near-equal chords (A plan, side) -- WINGS.
     2. One I-strut a side between the wings, 5.2 m (lower end) and 5.6 m
        (upper end) out, leaning out at the top (A front; C, D) -- STRUT.
     3. Flying and landing wires crossing between the strut and the fuselage
        (A front, C) -- WIRES, drawn as thin rods.
     4. Deep slab-sided cabin, the stepped glazed cockpit over the long
        cowl (A side) -- FUSELAGE.
     5. Big round cowl with the open engine face and the chin intake (A, D).
     6. Four-blade paddle propeller, 3.6 m across (A front: the dashed disc
        is 214 px = 3.61 m) -- four blades and a faint blur disc. The engine
        does not spin a propeller, so the blades stand still and the disc
        stands for the turning prop, as js/hero/ru_il10.js does.
     7. The tall rounded fin and rudder, the rudder running below the
        fuselage end; the braced tailplane, 7.2 m (A side and plan).
     8. Fixed main gear: oleo leg to the lower wing root and a V of two
        struts to the belly; tailwheel (A side and front, C, D).
     9. Port side: four round portholes and the cargo door with its round
        window (A side, C, D).

   MEASURED (A) AGAINST PUBLISHED
     upper span 18.20 m (set); lower span 14.20 m (A front 838 px = 14.1 m;
     the published figure is used); length spinner to rudder 12.57 m on A's
     scale against the published 12.4 m: A is followed and the length is NOT
     forced to 12.4. Height: the published 4.1 m is the three-point attitude
     on the ground; the model stands level (below), so its fin top is 5.99 m
     over the main wheels' bottom, as A measures it level.
     Chords: upper 2.46 m, lower 2.40 m (A plan, A side); both wings'
     gross area at those chords and rounded tips is about 76 m2 against the
     published 71.52 m2 (which may be net of the fuselage: not resolved).
     Dihedral of the chord planes off A front: upper 2.9 deg, lower 4.0 deg.
     Main wheels 0.78 m, track 3.56 m (A front); tailplane span 7.22 m,
     chord 1.77 m (A plan).

   ATTITUDE. The real An-2 stands tail-down: A's ground line runs from the
   main wheels' bottom to the tailwheel's at 12.8 deg nose up, and the
   published 4.1 m height is taken in that three-point attitude. As modelled
   -- the game's tail-dragger convention (js/hero/ru_il10.js, the Shackleton
   in js/hero/gb_misc_aircraft.js), because the same model flies -- the
   airframe sits LEVEL (fuselage datum horizontal), the main wheels where A
   measures them, and the tailwheel leg LENGTHENED from A's 0.51 m (fuselage
   to hub, hub 1.99 m up in the level frame) to 2.27 m, so the 0.40 m
   tailwheel touches the same ground as the mains. Level, the fin top is
   5.99 m up. The 12.8 deg parked attitude is NOT drawn. The gear is FIXED
   (A, C, D), so it is not in a "gear" group (the engine would hide it in
   flight); the long tail leg therefore also shows in flight.

   NOT CONFIRMED: the KPA paint (no photograph of a KPA An-2 was fetched; a
   uniform military green like C is used); the starboard-side portholes (no
   reference shows the starboard side, so none are drawn there); the
   tailplane strut's spanwise station (C shows the strut, not where it meets
   the tailplane: 1.1 m out is drawn); the blade planform (read off A front's
   projected blades: chord 0.40 m at 60 % radius); the wing thicknesses
   (0.34 m upper, 0.27 m lower, off A front).

   ======================================================================
   2. HUGHES 500D (MODEL 369D)

   REFERENCES
     E  "Hughes OH-6 orthographical image.svg" (rendered 1600 px): side,
        plan and head-on of the OH-6A (Model 369A). The egg-shaped cabin pod,
        the engine fairing behind the mast, the tail boom and the skid gear
        are shared by the civil 500 series (the 500D kept the 500C pod until
        the 500E's pointed nose of 1982: en.wikipedia "MD Helicopters MD
        500"). Scale off the side view's rotor, 752 px = the published 8.03 m
        (0.01068 m/px); the plan view measures on the same scale (nose to fin
        tip 667 px against 665 px in the side view).
     F  "hughes500.g-bioa.arp.jpg" (a Hughes 500D, port side, just off the
        ground): the 500D's T-tail -- the swept upper fin with the small
        horizontal stabiliser on top and its endplates, the swept ventral fin
        with the tail-skid hook, the two-blade tail rotor on the port side.
        Measured against the pod (nose to the exhaust = E's 3.75 m, 0.00913
        m/px) and placed on E's boom by the tail rotor hub.
     G  "MD 500D (HH-6) Tour de Sky 2014-08-09 04.JPG" and "... 05.JPG"
        (Finnish Army 500D in flight): the five-blade main rotor, the T-tail
        from behind and below.
   PUBLISHED (en.wikipedia "MD Helicopters MD 500", "Hughes OH-6 Cayuse",
   from Jane's 1971-72): main rotor 8.03 m (26 ft 4 in); length including
   rotors 9.24 m (30 ft 3.75 in); height to the top of the rotor hub 2.48 m
   (8 ft 1.5 in). The 500D: a T-tail and a five-blade main rotor (same
   article, "Variants").

   RECOGNITION LIST
     1. The "flying egg": a short teardrop pod, glazed all round the nose
        (E side and head-on) -- POD; the glazing is a glass skin laid 3 cm
        over it (skinPatch), so it reads from every side.
     2. Engine fairing behind the mast; the slim tail boom (E).
     3. Five-blade main rotor (G; the article) -- "rotor", "rotordisc".
     4. T-tail with endplates, swept ventral fin, two-blade tail rotor on the
        port side (F, G) -- "tailrotor".
     5. Skid gear on two pairs of splayed legs (E side and head-on).

   MEASURED AGAINST PUBLISHED
     rotor 8.03 m (set); length rotor front to tail rotor tip 9.18 m against
     9.24 m; pod 3.75 m long, 1.54 m wide (E plan), skid track 1.87 m (E
     plan). Height to the hub top: E and F agree with each other (E 2.81 m,
     F's hub-height-to-length ratio within 4 % of E's) and both stand taller
     than the published 2.48 m. E is followed: the model's hub is 2.78 m up.
     Nothing is reshaped to meet the 2.48 m.

   NOT CONFIRMED: the KPA paint (no photograph of a KPA 500 was fetched; a
   dark olive is used); the 500D's own rotor diameter (often quoted as 8.05
   m: not fetched; the 500C's published 8.03 m is used); the stabiliser span
   (1.70 m: F and G show it edge-on and from far behind, so the span is an
   estimate); the blade chord (0.18 m, off E's plan). The armed conversion
   paraded in 2013 (AT-3 Sagger mounts; the source the article cites calls
   those machines 500Es) is NOT drawn: no reference showing the mounts was
   fetched. The rows name the 500D, so the 500D's round nose is drawn.

   ======================================================================
   Model space: +X nose, +Y port, +Z up, metres. One mesh per material.
   ASCII only.
   ============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaAir = (function () {
  "use strict";
  var V = null;
  var PI = Math.PI, D2R = PI / 180;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  /* piecewise-linear lookup in a table of [key, value...] rows */
  function tabL(rows, k, col) {
    var n = rows.length, i;
    if (k <= rows[0][0]) return rows[0][col];
    for (i = 0; i + 1 < n; i++) if (k <= rows[i + 1][0]) return lerp(rows[i][col], rows[i + 1][col], (k - rows[i][0]) / (rows[i + 1][0] - rows[i][0]));
    return rows[n - 1][col];
  }
  /* Catmull-Rom lookup (smooth) */
  function tabC(rows, k, col) {
    var n = rows.length, i = 0;
    if (k <= rows[0][0]) return rows[0][col];
    if (k >= rows[n - 1][0]) return rows[n - 1][col];
    while (rows[i + 1][0] < k) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    return cr(a[col], b[col], c[col], d[col], (k - b[0]) / (c[0] - b[0]));
  }

  /* ============================== geometry kit (after ru_il10.js) ============================== */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* an aerofoil as an OPEN ring: upper TE..LE then lower LE..TE; [x, t, lowerFlag] */
  function foilOpen(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / Math.max(c, 0.01);
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, yt(f, tc) * c, 0]); }
    for (i = m; i >= 0; i--) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, -yt(f, tc) * c, 1]); }
    return p;
  }
  /* loft rings of points [x, y, z, u, v]; each triangle turned to face away
     from its rings' centre line */
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
      var inv = [2 * O[0] - C[0], 2 * O[1] - C[1], 2 * O[2] - C[2]];
      for (k = 0; k + 1 < n; k++) tri(ci, rI * n + k, rI * n + k + 1, inv);
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
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  function cylZ(r0, r1, h, x, y, z, seg) {   /* r0 at the top */
    var g = new V.CylinderGeometry(r0, r1, h, seg || 14); g.rotateX(PI / 2); g.translate(x, y, z); return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, true);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  /* a flattened strut between two points: chord along x, thickness t */
  function flatStrut(a, b, ch, t) {
    var g = rod(a, b, 0.5, 8);
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    g.translate(-(a[0] + b[0]) / 2, -(a[1] + b[1]) / 2, -(a[2] + b[2]) / 2);
    /* squash across the strut: scale in x by the chord and in the lateral
       by the thickness, about the strut's middle (good for near-vertical struts) */
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01, ux = dx / L, uy = dy / L, uz = dz / L;
    var pa = g.attributes.position, i;
    for (i = 0; i < pa.count; i++) {
      var x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i), along = x * ux + y * uy + z * uz;
      var ox = x - along * ux, oy = y - along * uy, oz = z - along * uz;
      pa.setXYZ(i, along * ux + ox * ch, along * uy + oy * t, along * uz + oz * t);
    }
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.computeVertexNormals();
    return g;
  }
  function wheelY(r, w, x, y, z) {
    var t = new V.TorusGeometry(r - w * 0.42, w * 0.42, 8, 22); t.rotateX(PI / 2); t.translate(x, y, z); return t;
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
  /* fixed uv on a plain geometry (a flat colour spot on a sheet) */
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
  /* rotor blade sheet (detail pass): u along the span, root (0) to tip (1);
     the canvas top (v 1) the leading edge. The bare root fitting, the
     leading-edge abrasion strip, the darker trailing edge and its trim tab,
     the tip cap, spanwise grime and chips. Drawn in the blade's own colour
     (the material stays white). */
  function bladeSheet(base, seed) {
    try {
      var W = 512, H = 32, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(seed), i;
      g.fillStyle = base; g.fillRect(0, 0, W, H);
      for (i = 0; i < 70; i++) { g.globalAlpha = 0.05 + R() * 0.08; g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * W, R() * H, 20 + R() * 120, 1 + R() * 2); }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(150,154,156,0.55)"; g.fillRect(W * 0.05, 0, W * 0.91, H * 0.16);
      g.fillStyle = "rgba(0,0,0,0.22)"; g.fillRect(0, H * 0.84, W, H * 0.16);
      g.fillStyle = "rgba(0,0,0,0.30)"; g.fillRect(W * 0.70, H * 0.80, W * 0.08, H * 0.20);
      g.fillStyle = "rgba(96,100,102,0.90)"; g.fillRect(0, 0, W * 0.05, H);
      g.fillStyle = "rgba(176,178,176,0.65)"; g.fillRect(W * 0.965, 0, W * 0.035, H);
      g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach(function (f) { g.beginPath(); g.moveTo(W * f + 0.5, H * 0.16); g.lineTo(W * f + 0.5, H); g.stroke(); });
      for (i = 0; i < 40; i++) { g.globalAlpha = 0.3; g.fillStyle = "#9a9c98"; g.fillRect(W * (0.3 + R() * 0.68), R() * H * 0.3, 1.5, 1.5); }
      g.globalAlpha = 1;
      return texOf(cv);
    } catch (e) { return null; }
  }
  /* lamps (detail pass): the position lights, beacons and landing lamp share
     one material whose map and emissive map are a four-colour palette strip;
     each lamp's UVs sit on its colour, so all the lamps cost one draw call
     (the lampCanvas idea of js/hero/airbase_runway.js) */
  var LAMP_U = { red: 0.125, green: 0.375, white: 0.625, amber: 0.875 }, _lampTex;
  function lampMat() {
    var m = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.1, emissive: 0xffffff, emissiveIntensity: 0.55 });
    try {
      if (!_lampTex) {
        var cv = canvas(64, 4), g = cv.getContext("2d");
        ["#e0281e", "#1fc24a", "#f4f1e2", "#f0a020"].forEach(function (c, i) { g.fillStyle = c; g.fillRect(i * 16, 0, 16, 4); });
        _lampTex = new V.CanvasTexture(cv);
        if (V.sRGBEncoding !== undefined) _lampTex.encoding = V.sRGBEncoding;
      }
      m.map = _lampTex; m.emissiveMap = _lampTex;
    } catch (e) { m.color.set(0xd8d0c0); m.emissive.set(0x000000); }
    return m;
  }
  function lampGeo(p, r, col, sc) {
    var g = new V.SphereGeometry(r, 8, 5), u, i;
    if (sc) g.scale(sc[0], sc[1], sc[2]);
    g.translate(p[0], p[1], p[2]);
    u = g.attributes.uv;
    for (i = 0; i < u.count; i++) u.setXY(i, LAMP_U[col], 0.5);
    return g;
  }
  function texOf(cv) {
    var t = new V.CanvasTexture(cv);
    t.wrapS = t.wrapT = V.RepeatWrapping;
    if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }
  function seams(g, R, n, x0, x1, y0, y1, a) {
    var i;
    g.strokeStyle = "rgba(20,22,18," + (a || 0.24) + ")"; g.lineWidth = 1.2;
    for (i = 0; i < n; i++) {
      var px = x0 + R() * (x1 - x0), py = y0 + R() * (y1 - y0), L = 20 + R() * 90;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(px, py); g.lineTo(px + L, py); } else { g.moveTo(px, py); g.lineTo(px, py + L * 0.6); }
      g.stroke();
    }
  }
  function mottle(g, R, col, n, x0, x1, y0, y1) {
    g.fillStyle = col;
    for (var i = 0; i < n; i++) {
      g.globalAlpha = 0.08 + R() * 0.10;
      g.fillRect(x0 + R() * (x1 - x0), y0 + R() * (y1 - y0), 30 + R() * 90, 10 + R() * 30);
    }
    g.globalAlpha = 1;
  }
  /* a superellipse ring section: angle a from the belly (a = -PI/2) round
     the port side (0), the top (PI/2), starboard (PI); v = (a + PI/2) / 2PI */
  function secPt(hw, zc, hh, e, a) {
    var c = Math.cos(a), sn = Math.sin(a);
    return [hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e), zc + hh * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 2 / e)];
  }
  /* the v (0..1) of a height h on one side of a superellipse section */
  function vAt(h, zc, hh, e, port) {
    var t = clamp((h - zc) / hh, -1, 1), a = Math.asin((t < 0 ? -1 : 1) * Math.pow(Math.abs(t), e / 2));
    if (!port) a = PI - a;
    return (a + PI / 2) / (2 * PI);
  }
  /* the section angle a (as secPt) of height h on the port side */
  function angAt(h, q) {
    var t = clamp((h - q.zc) / q.hh, -1, 1);
    return Math.asin((t < 0 ? -1 : 1) * Math.pow(Math.abs(t), q.e / 2));
  }
  /* a patch of a lofted skin, lifted off it by `lift` metres: stations s0..s1,
     angles rng(q) = [a0, a1] at each station; sec(s) -> {zc, hh, hw, e};
     mx(s), mz(h) map to model x and z. Glazing and the like. Faces are
     wound outward from the section centre. */
  function skinPatch(sec, s0, s1, ns, rng, na, lift, mx, mz) {
    var pos = [], idx = [], i, j, nrm = [];
    for (i = 0; i <= ns; i++) {
      var s = lerp(s0, s1, i / ns), q = sec(s), r = rng(q, s);
      for (j = 0; j <= na; j++) {
        var a = lerp(r[0], r[1], j / na), pt = secPt(q.hw + lift, q.zc, q.hh + lift, q.e, a);
        pos.push(mx(s), pt[0], mz(pt[1]));
        nrm.push(pt[0], pt[1] - q.zc);            /* outward, in the section */
      }
    }
    var n = na + 1;
    for (i = 0; i < ns; i++) for (j = 0; j < na; j++) {
      var A = i * n + j, B = A + 1, Cc = A + n, D = Cc + 1;
      var ax = pos[A * 3], ay = pos[A * 3 + 1], az = pos[A * 3 + 2];
      var ux = pos[Cc * 3] - ax, uy = pos[Cc * 3 + 1] - ay, uz = pos[Cc * 3 + 2] - az;
      var vx = pos[B * 3] - ax, vy = pos[B * 3 + 1] - ay, vz = pos[B * 3 + 2] - az;
      var ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      if (ny * nrm[A * 2] + nz * nrm[A * 2 + 1] >= 0) idx.push(A, Cc, B, B, Cc, D); else idx.push(A, B, Cc, B, D, Cc);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(new Array(pos.length / 3 * 2).fill(0.5), 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* ======================================================================
     An-2
     s = metres aft of the spinner tip (A), h = metres above the main
     wheels' bottom in the level frame. Model x = XA - s, z = h - HA (the
     thrust line at z 0).
     ====================================================================== */
  var XA = 6.30, HA = 2.45, LA = 12.57;
  function AX(s) { return XA - s; }
  function AZ(h) { return h - HA; }
  var A_PAL = { skin: "#5b6440", dk: "#4d5536", glass: "#1d2629", frame: "#4b5334", ink: "#16181a", face: "#2b2d2c" };

  /* fuselage stations off A side and plan: s, top h, bottom h, half width,
     section exponent (2 round, higher boxier) */
  var A_FUS = [
    [0.50, 3.10, 1.80, 0.62, 2.0],
    [0.80, 3.15, 1.75, 0.69, 2.0],
    [1.30, 3.25, 1.66, 0.74, 2.2],
    [1.85, 3.29, 1.62, 0.80, 2.6],
    [2.25, 3.66, 1.58, 0.83, 3.0],
    [2.60, 3.80, 1.55, 0.86, 3.2],
    [3.10, 3.85, 1.53, 0.89, 3.5],
    [4.50, 3.85, 1.53, 0.89, 3.5],
    [5.50, 3.85, 1.54, 0.88, 3.5],
    [6.65, 3.84, 1.65, 0.85, 3.5],
    [7.50, 3.83, 1.79, 0.78, 3.4],
    [8.30, 3.81, 1.89, 0.70, 3.2],
    [9.20, 3.78, 2.04, 0.60, 3.0],
    [10.00, 3.72, 2.24, 0.47, 2.8],
    [10.90, 3.62, 2.55, 0.27, 2.5],
    [11.71, 3.52, 2.70, 0.10, 2.2]
  ];
  function aFus(s, col) { return tabC(A_FUS, s, col); }

  /* wings: half span, chord, LE station, chord-plane h at the root, dihedral,
     root y (where the panel leaves the fuselage), thickness root / tip */
  var A_UW = { hs: 9.10, ch: 2.46, le: 3.06, h0: 3.98, dih: 2.9 * D2R, y0: 0.0, yd: 0.9, t0: 0.34, t1: 0.30, tipR: 0.55 };
  var A_LW = { hs: 7.10, ch: 2.40, le: 3.07, h0: 1.88, dih: 4.0 * D2R, y0: 0.80, yd: 0.80, t0: 0.27, t1: 0.22, tipR: 0.50 };
  function wingH(W, y) { return W.h0 + Math.max(0, y - W.yd) * Math.tan(W.dih); }

  var _aSheets = null;
  function aSheets() {
    if (_aSheets) return _aSheets;
    _aSheets = {};
    try {
      /* BODY: u = s / LA, v round the section from the belly (see secPt) */
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(2027), i;
      function U(s) { return s / LA * W; }
      function Y(v) { return (1 - v) * H; }
      function sec(s) { var zt = aFus(s, 1), zb = aFus(s, 2); return { zc: (zt + zb) / 2, hh: (zt - zb) / 2, e: aFus(s, 4) }; }
      g.fillStyle = A_PAL.skin; g.fillRect(0, 0, W, H);
      mottle(g, R, A_PAL.dk, 30, 0, W, 0, H);
      seams(g, R, 80, U(1.9), W, 0, H);
      /* the engine face inside the cowl front is a separate disc; the cowl
         ring and its panel joints (A) */
      g.strokeStyle = "rgba(16,18,14,0.55)"; g.lineWidth = 2;
      [0.56, 1.25, 1.88, 3.07, 5.53, 9.25].forEach(function (s) { g.beginPath(); g.moveTo(U(s), 0); g.lineTo(U(s), H); g.stroke(); });
      /* the cockpit glazing, portholes and door are geometry (buildAn2);
         the sheet carries the door outline only */
      var qd = sec(6.5), va = vAt(1.84, qd.zc, qd.hh, qd.e, true), vb = vAt(3.44, qd.zc, qd.hh, qd.e, true);
      g.strokeStyle = "rgba(16,18,14,0.75)"; g.lineWidth = 3;
      g.strokeRect(U(5.94), Y(vb), U(7.10) - U(5.94), Y(va) - Y(vb));
      _aSheets.body = texOf(cv);
    } catch (e) { _aSheets.body = null; }
    try {
      /* WING: planar, u by station s over 2.9..5.7, v by |y| / 9.2. Fabric
         rib tapes aft of the spar, the aileron and flap hinge lines and the
         slat line on the upper outer panels (A plan) */
      var W2 = 512, H2 = 512, cv2 = canvas(W2, H2), g2 = cv2.getContext("2d"), R2 = rngFor(4410);
      function U2(s) { return (s - 2.9) / 2.8 * W2; }
      function Y2(y) { return (1 - y / 9.2) * H2; }
      g2.fillStyle = A_PAL.skin; g2.fillRect(0, 0, W2, H2);
      mottle(g2, R2, A_PAL.dk, 24, 0, W2, 0, H2);
      g2.strokeStyle = "rgba(24,26,20,0.30)"; g2.lineWidth = 1.4;
      for (var yy = 0.3; yy < 9.1; yy += 0.30) { g2.beginPath(); g2.moveTo(U2(3.6), Y2(yy)); g2.lineTo(U2(5.6), Y2(yy)); g2.stroke(); }
      g2.strokeStyle = "rgba(16,18,14,0.60)"; g2.lineWidth = 2.4;
      g2.beginPath(); g2.moveTo(U2(4.80), Y2(0.9)); g2.lineTo(U2(4.80), Y2(9.0)); g2.stroke();     /* hinge line */
      [0.9, 3.4, 6.0, 9.0].forEach(function (y) { g2.beginPath(); g2.moveTo(U2(4.80), Y2(y)); g2.lineTo(U2(5.6), Y2(y)); g2.stroke(); });
      g2.beginPath(); g2.moveTo(U2(3.36), Y2(3.4)); g2.lineTo(U2(3.36), Y2(9.0)); g2.stroke();     /* slat line */
      _aSheets.wing = texOf(cv2);
    } catch (e) { _aSheets.wing = null; }
    return _aSheets;
  }

  function aMats(C) {
    var S = aSheets(), m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    function sk(tex) {
      var q = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.08, side: V.DoubleSide });
      if (tex) q.map = tex; else q.color.set(A_PAL.skin);
      return q;
    }
    m.body = sk(S.body);
    m.wing = sk(S.wing);
    m.plain = new V.MeshStandardMaterial({ color: A_PAL.skin, roughness: 0.80, metalness: 0.08, side: V.DoubleSide });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.62, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x55595b, roughness: 0.50, metalness: 0.55, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x141617, roughness: 0.90, metalness: 0.05, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: A_PAL.glass, roughness: 0.12, metalness: 0.45, side: V.DoubleSide });
    m.propDisc = new V.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.14,
                                              depthWrite: false, side: V.DoubleSide });
    return m;
  }

  function aFuselage() {
    var rings = [], N = 28, s, k, NS = 46;
    for (k = 0; k <= NS; k++) {
      s = lerp(0.50, 11.71, Math.pow(k / NS, 1.0));
      var zt = aFus(s, 1), zb = aFus(s, 2), hw = Math.max(aFus(s, 3), 0.04), e = aFus(s, 4);
      var zc = (zt + zb) / 2, hh = (zt - zb) / 2, p = [], j;
      for (j = 0; j <= N; j++) {
        var a = -PI / 2 + 2 * PI * j / N, q = secPt(hw, zc, hh, e, a);
        p.push([AX(s), q[0], AZ(q[1]), s / LA, j / N]);
      }
      rings.push(p);
    }
    return loftUV(rings, false, true);
  }
  /* one wing panel (side +1 port, -1 starboard): rings across the span,
     rounded tip in plan (A) */
  function aWing(W, side) {
    var rings = [], k, NY = 16;
    for (k = 0; k <= NY; k++) {
      var y = lerp(W.y0, W.hs, k / NY), le = W.le, te = W.le + W.ch;
      var dt = y - (W.hs - W.tipR);
      if (dt > 0) {   /* rounded tip: chord shrinks to the tip, centred a little aft */
        var f = Math.sqrt(Math.max(0, 1 - Math.pow(dt / W.tipR, 2)));
        var mid = W.le + W.ch * 0.45;
        le = mid - (mid - W.le) * f; te = mid + (W.le + W.ch - mid) * f;
        if (te - le < 0.04) { le = mid - 0.02; te = mid + 0.02; }
      }
      var th = lerp(W.t0, W.t1, (y - W.y0) / (W.hs - W.y0)) * (te - le) / W.ch;
      var hz = wingH(W, y);
      rings.push(foilOpen(AX(le), AX(te), th, 10).map(function (p) {
        var s = XA - p[0];
        return [p[0], side * y, AZ(hz) + p[1], (s - 2.9) / 2.8, y / 9.2];
      }));
    }
    return loftUV(rings, false, true);
  }
  /* tailplane (A plan and side): h 3.54, LE 10.15, chord 1.77, half span 3.61 */
  function aTailplane(side) {
    var rings = [], k, HS = 3.61, LE = 10.15, CH = 1.77, TR = 0.45;
    for (k = 0; k <= 10; k++) {
      var y = lerp(0.08, HS, k / 10), le = LE, te = LE + CH, dt = y - (HS - TR);
      if (dt > 0) {
        var f = Math.sqrt(Math.max(0, 1 - Math.pow(dt / TR, 2))), mid = LE + CH * 0.45;
        le = mid - (mid - LE) * f; te = mid + (LE + CH - mid) * f;
        if (te - le < 0.04) { le = mid - 0.02; te = mid + 0.02; }
      }
      rings.push(foilOpen(AX(le), AX(te), 0.20 * (te - le) / CH, 8).map(function (p) {
        return [p[0], side * y, AZ(3.54) + p[1], 0.5, 0.5];
      }));
    }
    return loftUV(rings, false, true);
  }
  /* fin and rudder off A's side outline: LE and TE stations by height */
  var A_FIN_LE = [[3.60, 8.95], [3.75, 9.12], [3.93, 9.43], [4.96, 9.93], [5.45, 10.19], [5.75, 10.44], [5.92, 10.69], [5.99, 10.95]];
  var A_FIN_TE = [[3.60, 12.57], [4.06, 12.47], [4.93, 12.21], [5.40, 11.96], [5.70, 11.71], [5.89, 11.45], [5.97, 11.20], [5.99, 10.95]];
  var A_RUD_TE = [[2.72, 11.76], [2.95, 12.15], [3.20, 12.47], [3.45, 12.56], [3.64, 12.57]];
  function aFin() {
    var rings = [], k, NZ = 14;
    for (k = 0; k <= NZ; k++) {
      var h = lerp(3.60, 5.985, k / NZ), le = tabL(A_FIN_LE, h, 1), te = tabL(A_FIN_TE, h, 1);
      var th = Math.min(0.20, 0.10 * (te - le));
      rings.push(foilOpen(AX(le), AX(te), th, 10).map(function (p) { return [p[0], p[1], AZ(h), 0.5, 0.5]; }));
    }
    return loftUV(rings, true, true);
  }
  function aRudderFoot() {
    var rings = [], k;
    for (k = 0; k <= 5; k++) {
      var h = lerp(2.72, 3.64, k / 5), le = 11.55, te = tabL(A_RUD_TE, h, 1);
      rings.push(foilOpen(AX(le), AX(te), 0.10, 8).map(function (p) { return [p[0], p[1], AZ(h), 0.5, 0.5]; }));
    }
    return loftUV(rings, true, true);
  }
  /* one paddle blade of the AV-2, radius 1.80 m; chord off A front */
  function aBlade(angle) {
    var rings = [], k, R = 1.80, ST = [0.22, 0.40, 0.65, 0.90, 1.10, 1.30, 1.50, 1.65, 1.75, 1.80];
    var xp = AX(0.34), zp = AZ(2.45);
    for (k = 0; k < ST.length; k++) {
      var r = ST[k], f = r / R;
      var ch = f < 0.6 ? lerp(0.12, 0.40, (f - 0.12) / 0.48) : f < 0.9 ? lerp(0.40, 0.36, (f - 0.6) / 0.3) : lerp(0.36, 0.10, (f - 0.9) / 0.1);
      var tw = lerp(48, 16, f) * D2R, th = lerp(0.10, 0.015, f);
      var ring = [], m, M = 6;
      for (m = 0; m <= 2 * M + 1; m++) {
        var up = m <= M, i = up ? m : 2 * M + 1 - m, ff = 0.5 * (1 - Math.cos(PI * i / M));
        var cx = (ff - 0.4) * ch, ct = (up ? 1 : -1) * th * 0.5 * Math.sin(PI * ff);
        var yb = cx * Math.cos(tw) - ct * Math.sin(tw), xb = cx * Math.sin(tw) + ct * Math.cos(tw);
        var ca = Math.cos(angle), sa = Math.sin(angle);
        ring.push([xp + xb, yb * ca - r * sa, zp + yb * sa + r * ca, 0.5, 0.5]);
      }
      rings.push(ring);
    }
    return loftUV(rings, false, true);
  }

  function buildAn2(THREE, M, C) {
    V = THREE;
    var K = { body: [], wing: [], plain: [], team: [], metal: [], ink: [], glass: [], propDisc: [] };
    var sd, k;
    K.body.push(aFuselage());
    function aSec(s) { var zt = aFus(s, 1), zb = aFus(s, 2); return { zc: (zt + zb) / 2, hh: (zt - zb) / 2, hw: aFus(s, 3), e: aFus(s, 4) }; }
    function onSkin(s, a, lift) { var q = aSec(s), pt = secPt(q.hw + lift, q.zc, q.hh + lift, q.e, a); return [AX(s), pt[0], AZ(pt[1])]; }
    /* cockpit glazing (A side and plan): everything above h 3.00 from s 1.90
       to 3.05, over the roof; its frames: five hoops and three bars */
    K.glass.push(skinPatch(aSec, 1.90, 3.05, 12, function (q) { var a = angAt(3.00, q); return [a, PI - a]; }, 18, 0.012, AX, AZ));
    [1.90, 2.28, 2.62, 2.85, 3.05].forEach(function (s) {
      var a0 = angAt(3.00, aSec(s)), prev = null, j;
      for (j = 0; j <= 10; j++) { var P = onSkin(s, lerp(a0, PI - a0, j / 10), 0.02); if (prev) K.plain.push(rod(prev, P, 0.022, 4)); prev = P; }
    });
    [0.0, 0.30, 0.50, 0.70, 1.0].forEach(function (f) {
      var prev = null, j;
      for (j = 0; j <= 8; j++) { var s = lerp(1.90, 3.05, j / 8), a0 = angAt(3.00, aSec(s)), P = onSkin(s, lerp(a0, PI - a0, f), 0.02); if (prev) K.plain.push(rod(prev, P, 0.022, 4)); prev = P; }
    });
    /* port side (A side; C, D): four portholes, 0.30 m, at h 2.83, and the
       door's round window (s 6.39, h 2.88). None to starboard (not shown). */
    [[3.74, 2.83, 0.15], [4.20, 2.83, 0.15], [4.66, 2.83, 0.15], [5.13, 2.83, 0.15], [6.39, 2.88, 0.17]].forEach(function (w) {
      var P = onSkin(w[0], angAt(w[1], aSec(w[0])), 0.012), d = new V.CircleGeometry(w[2], 14);
      d.rotateX(-PI / 2); d.translate(P[0], P[1], P[2]); K.glass.push(d);
    });
    /* the cowl front: the engine face recessed in the ring (D), the hub cap */
    var face = new V.CircleGeometry(0.58, 24); face.rotateY(PI / 2); face.translate(AX(0.56), 0, AZ(2.45)); K.ink.push(face);
    /* the hub dome, 0.59 m across, from the spinner tip at s 0 to the cowl
       front at s 0.50 (A side) */
    var hub = new V.SphereGeometry(0.295, 14, 8, 0, 2 * PI, 0, PI / 2); hub.rotateZ(-PI / 2); hub.scale(0.50 / 0.295, 1, 1);
    hub.translate(AX(0.50), 0, AZ(2.45)); K.metal.push(hub);
    var shaft = new V.CylinderGeometry(0.10, 0.10, 0.22, 10); shaft.rotateZ(PI / 2); shaft.translate(AX(0.45), 0, AZ(2.45)); K.metal.push(shaft);
    /* the oil-cooler chin intake under the cowl (A side x 732..770; front) */
    var ci = box(0.66, 0.46, 0.34, AX(1.60), 0, AZ(1.52)); K.plain.push(ci);
    var cf = new V.PlaneGeometry(0.40, 0.26); cf.rotateY(PI / 2); cf.translate(AX(1.265), 0, AZ(1.52)); K.ink.push(cf);
    /* wings */
    for (sd = -1; sd <= 1; sd += 2) {
      K.wing.push(aWing(A_UW, sd));
      K.wing.push(aWing(A_LW, sd));
      K.plain.push(aTailplane(sd));
    }
    K.plain.push(aFin());
    K.plain.push(aRudderFoot());
    /* I-struts (A front: lower end y 5.24, upper end y 5.64, at s 4.17 off
       A side), flat, 0.20 m chord */
    for (sd = -1; sd <= 1; sd += 2) {
      var yl = 5.24, yu = 5.64, s = 4.17;
      var lo = [AX(s), sd * yl, AZ(wingH(A_LW, yl))], up = [AX(s), sd * yu, AZ(wingH(A_UW, yu))];
      K.plain.push(flatStrut(lo, up, 0.20, 0.06));
      /* the wires (A front): from the upper wing at the strut to the lower
         wing root, and from the lower wing at the strut to the upper wing
         over the fuselage side, each doubled fore and aft of the strut */
      [-0.30, 0.30].forEach(function (ds) {
        K.ink.push(rod([AX(s + ds), sd * (yu - 0.05), AZ(wingH(A_UW, yu - 0.05) - 0.12)], [AX(s + ds), sd * 0.95, AZ(wingH(A_LW, 0.95) + 0.10)], 0.012, 4));
        K.ink.push(rod([AX(s + ds), sd * (yl - 0.05), AZ(wingH(A_LW, yl - 0.05) + 0.10)], [AX(s + ds), sd * 0.95, AZ(wingH(A_UW, 0.95) - 0.14)], 0.012, 4));
      });
      /* tailplane strut (A side; C): tailplane underside to the fuselage side */
      K.plain.push(flatStrut([AX(10.95), sd * 1.10, AZ(3.46)], [AX(11.15), sd * 0.24, AZ(2.95)], 0.10, 0.05));
    }
    /* aerial masts (A side): over the upper wing centre and behind it */
    K.metal.push(rod([AX(3.20), 0, AZ(4.12)], [AX(3.05), 0, AZ(4.72)], 0.025, 5));
    K.metal.push(rod([AX(7.10), 0, AZ(3.84)], [AX(7.00), 0, AZ(4.38)], 0.022, 5));
    /* fixed main gear (A side and front; C, D): wheel 0.78 m, track 3.56 m,
       the oleo up to the lower wing root, a V of struts to the belly */
    for (sd = -1; sd <= 1; sd += 2) {
      var ax = [AX(2.93), sd * 1.66, AZ(0.39)];
      K.ink.push(wheelY(0.39, 0.28, AX(2.93), sd * 1.78, AZ(0.39)));
      K.metal.push(cylY(0.17, 0.30, AX(2.93), sd * 1.78, AZ(0.39), 14));
      K.plain.push(rod(ax, [AX(2.98), sd * 1.25, AZ(wingH(A_LW, 1.25) - 0.12)], 0.075, 8));
      K.plain.push(rod(ax, [AX(2.65), sd * 0.35, AZ(1.56)], 0.05, 6));
      K.plain.push(rod(ax, [AX(3.60), sd * 0.35, AZ(1.55)], 0.05, 6));
    }
    /* tailwheel at A's station (s 10.78, 0.40 m), its leg LENGTHENED (the
       tail-dragger convention, see ATTITUDE) so the wheel's bottom is on the
       main wheels' ground: hub h 0.20 instead of A's level-frame 1.99 */
    K.metal.push(rod([AX(10.55), 0, AZ(2.45)], [AX(10.78), 0, AZ(0.20)], 0.05, 6));
    K.metal.push(rod([AX(10.78), -0.07, AZ(0.20)], [AX(10.78), 0.07, AZ(0.20)], 0.03, 6));
    K.ink.push(wheelY(0.20, 0.12, AX(10.78), 0, AZ(0.20)));
    /* propeller: four blades and a faint blur disc (no spin, as ru_il10.js) */
    for (k = 0; k < 4; k++) K.ink.push(aBlade((25 + 90 * k) * D2R));
    var disc = new V.CircleGeometry(1.80, 48); disc.rotateY(PI / 2); disc.translate(AX(0.34), 0, AZ(2.45)); K.propDisc.push(disc);
    /* team: a strip on the top of each upper wing near the tip */
    for (sd = -1; sd <= 1; sd += 2) {
      var yt0 = 7.6, hzt = AZ(wingH(A_UW, yt0) + 0.15);
      K.team.push(box(1.10, 0.40, 0.03, AX(4.10), sd * yt0, hzt));
    }
    var mats = aMats(C);
    var root = new V.Group();
    root.name = "an2";
    emit(root, K, mats, ["body", "wing", "plain", "team", "metal", "ink", "glass", "propDisc"]);
    return root;
  }

  /* ======================================================================
     HUGHES 500D
     s = metres aft of the nose (E), h = metres above the skid bottom.
     Model x = XH - s, z = h - HH.
     ====================================================================== */
  var XH = 3.20, HH = 1.20, LH = 3.75;
  function HX(s) { return XH - s; }
  function HZ(h) { return h - HH; }
  var H_PAL = { skin: "#4a5236", dk: "#3d4430", glass: "#1b2427", frame: "#3a4130" };
  var H_ROTOR_R = 4.015, H_HUB_S = 2.08, H_HUB_H = 2.76;
  var H_TR_S = 6.55, H_TR_H = 1.68, H_TR_R = 0.68;

  /* pod stations (E side and plan): s, top h, bottom h, half width */
  var H_POD = [
    [0.00, 1.29, 1.27, 0.03],
    [0.05, 1.47, 1.09, 0.25],
    [0.14, 1.64, 0.93, 0.42],
    [0.27, 1.81, 0.81, 0.56],
    [0.43, 1.96, 0.71, 0.68],
    [0.75, 2.14, 0.59, 0.76],
    [1.07, 2.23, 0.52, 0.77],
    [1.50, 2.25, 0.50, 0.77],
    [1.92, 2.22, 0.48, 0.73],
    [2.35, 2.18, 0.52, 0.67],
    [2.67, 2.13, 0.57, 0.55],
    [2.99, 2.08, 0.63, 0.51],
    [3.31, 2.03, 0.74, 0.39],
    [3.52, 2.00, 0.83, 0.30],
    [3.75, 1.97, 0.97, 0.20]
  ];
  function hPod(s, c) { return tabC(H_POD, s, c); }
  /* boom (E side and plan): s, centre h, radius */
  var H_BOOM = [[3.40, 1.86, 0.30], [3.75, 1.82, 0.24], [4.22, 1.78, 0.20], [4.70, 1.78, 0.16], [5.23, 1.74, 0.13], [5.77, 1.70, 0.11], [6.35, 1.67, 0.095], [6.62, 1.67, 0.09]];

  var _hSheets = null;
  function hSheets() {
    if (_hSheets) return _hSheets;
    _hSheets = {};
    try {
      /* POD: u = s / LH, v from the belly round the port side (secPt) */
      var W = 512, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(5369);
      function U(s) { return s / LH * W; }
      function Y(v) { return (1 - v) * H; }
      function sec(s) { var zt = hPod(s, 1), zb = hPod(s, 2); return { zc: (zt + zb) / 2, hh: (zt - zb) / 2 }; }
      g.fillStyle = H_PAL.skin; g.fillRect(0, 0, W, H);
      mottle(g, R, H_PAL.dk, 24, 0, W, 0, H);
      seams(g, R, 40, U(1.6), W, 0, H);
      /* the glazing is geometry (buildMD500); the sheet carries the door
         outlines each side (E side) */
      [true, false].forEach(function (pt) {
        var q = sec(1.04);
        g.strokeStyle = "rgba(14,16,12,0.7)"; g.lineWidth = 2;
        var e0 = vAt(0.62, q.zc, q.hh, 2.2, pt), e1 = vAt(2.10, q.zc, q.hh, 2.2, pt);
        g.strokeRect(U(0.58), Math.min(Y(e0), Y(e1)), U(0.98), Math.abs(Y(e0) - Y(e1)));
        g.strokeRect(U(1.56), Math.min(Y(e0), Y(e1)), U(0.86), Math.abs(Y(e0) - Y(e1)));
      });
      /* detail pass: the pod's skin joints - the frame stations aft of the
         windscreen, behind the doors and at the engine bay, the belt seam
         below the doors and the keel seam - with rivet rows beside them; the
         fuel filler and the access panels; grime under the belly and oil
         streaks running aft below the engine bay; chipped door edges */
      g.strokeStyle = "rgba(16,18,12,0.42)"; g.lineWidth = 1.4;
      [0.60, 2.44, 2.86, 3.32].forEach(function (s) { g.beginPath(); g.moveTo(U(s), Y(0.03)); g.lineTo(U(s), Y(0.97)); g.stroke(); });
      [true, false].forEach(function (pt) {
        [0.86, 2.02].forEach(function (h) {
          var y0 = Y(vAt(h, sec(1.5).zc, sec(1.5).hh, 2.2, pt));
          g.beginPath(); g.moveTo(U(0.58), y0); g.lineTo(U(3.70), y0); g.stroke();
          g.fillStyle = "rgba(12,14,10,0.30)";
          for (var r = U(0.62); r < U(3.66); r += 5) g.fillRect(r, y0 + 3, 1.6, 1.6);
        });
      });
      g.fillStyle = "rgba(12,14,10,0.30)";
      [0.60, 2.44, 2.86, 3.32].forEach(function (s) { for (var r = Y(0.97); r < Y(0.03); r += 5) g.fillRect(U(s) + 3, r, 1.6, 1.6); });
      /* access panels on the engine bay sides and the fuel filler (starboard) */
      g.strokeStyle = "rgba(16,18,12,0.45)"; g.lineWidth = 1.2;
      [[2.92, 3.26, 0.30, 0.40], [2.92, 3.26, 0.60, 0.70]].forEach(function (a) { g.strokeRect(U(a[0]), Y(a[3]), U(a[1]) - U(a[0]), Y(a[2]) - Y(a[3])); });
      g.fillStyle = "rgba(10,10,8,0.55)"; g.beginPath(); g.arc(U(2.62), Y(0.70), 5, 0, 2 * PI); g.fill();
      /* belly grime and the oil streaks running aft */
      for (var i = 0; i < 26; i++) {
        g.globalAlpha = 0.06 + R() * 0.08; g.fillStyle = "#0e0f0a";
        var yb = R() < 0.5 ? Y(0.02 + R() * 0.12) : Y(0.86 + R() * 0.12);
        g.fillRect(U(0.6 + R() * 2.6), yb, 40 + R() * 120, 2 + R() * 5);
      }
      for (i = 0; i < 18; i++) { g.globalAlpha = 0.10 + R() * 0.10; g.fillStyle = "#14130e"; g.fillRect(U(2.9 + R() * 0.5), Y(0.15 + R() * 0.7), 30 + R() * 50, 1.5 + R() * 2.5); }
      /* chipped paint along the door edges */
      for (i = 0; i < 60; i++) { g.globalAlpha = 0.20 + R() * 0.20; g.fillStyle = "#8a8c7c"; g.fillRect(U([0.60, 1.56, 2.42][i % 3]) + (R() - 0.5) * 8, Y(0.12 + R() * 0.76), 1.5 + R() * 2, 1.5 + R() * 2); }
      g.globalAlpha = 1;
      _hSheets.pod = texOf(cv);
    } catch (e) { _hSheets.pod = null; }
    /* the boom, fairing and tail skin: a tiling 1.5 m sheet (UVs in metres,
       the texture repeat 1/1.5) - joints every 0.75 m along the boom with
       rivet rows, mottled sun-fade, exhaust soot along the top */
    try {
      var W2 = 256, cv2 = canvas(W2, W2), g2 = cv2.getContext("2d"), R2 = rngFor(5370), j;
      g2.fillStyle = H_PAL.skin; g2.fillRect(0, 0, W2, W2);
      mottle(g2, R2, H_PAL.dk, 14, 0, W2, 0, W2);
      g2.strokeStyle = "rgba(16,18,12,0.40)"; g2.lineWidth = 1.3;
      for (j = 0; j < 2; j++) { g2.beginPath(); g2.moveTo(j * W2 / 2 + 0.5, 0); g2.lineTo(j * W2 / 2 + 0.5, W2); g2.stroke(); }
      g2.beginPath(); g2.moveTo(0, W2 * 0.25); g2.lineTo(W2, W2 * 0.25); g2.stroke();
      g2.fillStyle = "rgba(12,14,10,0.30)";
      for (j = 0; j < 2; j++) for (var r2 = 2; r2 < W2; r2 += 6) { g2.fillRect(j * W2 / 2 + 4, r2, 1.5, 1.5); g2.fillRect(r2, W2 * 0.25 + 4, 1.5, 1.5); }
      for (j = 0; j < 40; j++) { g2.globalAlpha = 0.05 + R2() * 0.07; g2.fillStyle = R2() < 0.7 ? "#0e0f0a" : "#c8c8b0"; g2.fillRect(R2() * W2, R2() * W2, 30 + R2() * 90, 1.5 + R2() * 4); }
      g2.globalAlpha = 1;
      _hSheets.skin = texOf(cv2); _hSheets.skin.repeat.set(1 / 1.5, 1 / 1.5);
    } catch (e) { _hSheets.skin = null; }
    _hSheets.blade = bladeSheet("#2e3130", 5371);
    return _hSheets;
  }
  function hMats(C) {
    var S = hSheets(), m = {}, tc = (C && C.team !== undefined) ? C.team : "#5f7fd6";
    m.pod = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.70, metalness: 0.10, side: V.DoubleSide });
    if (S.pod) m.pod.map = S.pod; else m.pod.color.set(H_PAL.skin);
    m.skin = new V.MeshStandardMaterial({ color: H_PAL.skin, roughness: 0.72, metalness: 0.10, side: V.DoubleSide });
    if (S.skin) { m.skin.map = S.skin; m.skin.color.set(0xffffff); }
    m.metal = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.46, metalness: 0.62 });
    m.dark = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.66, metalness: 0.32 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1e2c33, roughness: 0.06, metalness: 0.20, clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
    m.blade = new V.MeshStandardMaterial({ color: 0x2a2d2c, roughness: 0.75, metalness: 0.10, side: V.DoubleSide });
    if (S.blade) { m.blade.map = S.blade; m.blade.color.set(0xffffff); }
    m.lamp = lampMat();
    m.blade.name = "md_blade"; m.lamp.name = "md_lamp";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                          transparent: true, opacity: 0.05, depthWrite: false, side: V.DoubleSide });
    return m;
  }
  function hPodGeo() {
    var rings = [], N = 28, k, NS = 30;
    for (k = 0; k <= NS; k++) {
      var s = LH * Math.pow(k / NS, 1.35);          /* denser at the nose */
      var zt = hPod(s, 1), zb = hPod(s, 2), hw = Math.max(hPod(s, 3), 0.02), zc = (zt + zb) / 2, hh = Math.max((zt - zb) / 2, 0.01);
      var p = [], j;
      for (j = 0; j <= N; j++) {
        var a = -PI / 2 + 2 * PI * j / N, q = secPt(hw, zc, hh, 2.2, a);
        p.push([HX(s), q[0], HZ(q[1]), s / LH, j / N]);
      }
      rings.push(p);
    }
    return loftUV(rings, true, true);
  }
  function hTube(rows, N) {
    var rings = rows.map(function (r) {
      var p = [], j;
      for (j = 0; j <= N; j++) { var a = 2 * PI * j / N; p.push([HX(r[0]), r[2] * Math.cos(a), HZ(r[1]) + r[2] * Math.sin(a), r[0], a * 0.3]); }
      return p;
    });
    return loftUV(rings, true, true);
  }
  /* the engine fairing behind the mast (E side and plan): s, top h, half width */
  function hFairing() {
    var FR = [[1.78, 2.12, 0.20], [1.88, 2.42, 0.32], [2.10, 2.50, 0.36], [2.70, 2.48, 0.36], [3.10, 2.45, 0.33], [3.42, 2.40, 0.25], [3.52, 2.20, 0.18]];
    var rings = FR.map(function (r) {
      var p = [], j, N = 16, zb = 1.90, zc = (r[1] + zb) / 2, hh = (r[1] - zb) / 2;
      for (j = 0; j <= N; j++) { var a = -PI / 2 + 2 * PI * j / N, q = secPt(r[2], zc, hh, 3.0, a); p.push([HX(r[0]), q[0], HZ(q[1]), r[0], j / N * 1.9]); }
      return p;
    });
    return loftUV(rings, true, true);
  }
  /* a flat surface from an outline in (s, h) with thickness t, in the x-z plane at y */
  function hPlate(pts, t, y) {
    var shape = new V.Shape();
    pts.forEach(function (p, i) { if (i) shape.lineTo(-p[0], p[1]); else shape.moveTo(-p[0], p[1]); });
    var g = new V.ExtrudeGeometry(shape, { depth: t, bevelEnabled: false });
    /* shape x = -s, y = h; extrude along z: map (X, Y, Z) -> (XH + X, y + Z - t/2, Y - HH) */
    var pa = g.attributes.position, i;
    for (i = 0; i < pa.count; i++) {
      var X = pa.getX(i), Y = pa.getY(i), Z = pa.getZ(i);
      pa.setXYZ(i, XH + X, y + Z - t / 2, Y - HH);
    }
    g.computeVertexNormals();
    return g;
  }

  function buildMD500(THREE, M, C) {
    V = THREE;
    var K = { pod: [], skin: [], metal: [], dark: [], team: [], glass: [] }, sd, k;
    K.pod.push(hPodGeo());
    function hSec(s) { var zt = hPod(s, 1), zb = hPod(s, 2); return { zc: (zt + zb) / 2, hh: Math.max((zt - zb) / 2, 0.01), hw: Math.max(hPod(s, 3), 0.02), e: 2.2 }; }
    /* glazing (E side and head-on): the nose above the frame bar at h 1.58
       over the top; below it, each side down to the keel at h 0.82; the roof
       windows back to s 1.66; the two door windows each side */
    K.glass.push(skinPatch(hSec, 0.03, 0.56, 10, function (q) { var a = angAt(Math.min(1.62, q.zc + q.hh * 0.95), q); return [a, PI - a]; }, 16, 0.03, HX, HZ));
    K.glass.push(skinPatch(hSec, 0.03, 0.56, 10, function (q) { return [angAt(0.82, q), angAt(Math.min(1.54, q.zc + q.hh * 0.9), q)]; }, 8, 0.03, HX, HZ));
    K.glass.push(skinPatch(hSec, 0.03, 0.56, 10, function (q) { return [PI - angAt(Math.min(1.54, q.zc + q.hh * 0.9), q), PI - angAt(0.82, q)]; }, 8, 0.03, HX, HZ));
    K.glass.push(skinPatch(hSec, 0.60, 1.66, 10, function () { return [PI / 2 - 0.55, PI / 2 + 0.55]; }, 8, 0.03, HX, HZ));
    [[0.70, 1.40, 1.05, 1.95], [1.62, 2.28, 1.43, 1.94]].forEach(function (w) {
      K.glass.push(skinPatch(hSec, w[0], w[1], 8, function (q) { return [angAt(w[2], q), angAt(w[3], q)]; }, 6, 0.03, HX, HZ));
      K.glass.push(skinPatch(hSec, w[0], w[1], 8, function (q) { return [PI - angAt(w[3], q), PI - angAt(w[2], q)]; }, 6, 0.03, HX, HZ));
    });
    K.skin.push(hFairing());
    K.skin.push(hTube(H_BOOM, 14));
    /* the exhaust on the pod's aft face (E: s 3.75, h 0.97..1.30) */
    var ex = new V.CircleGeometry(0.15, 14); ex.rotateY(-PI / 2); ex.translate(HX(3.76), 0, HZ(1.14)); K.dark.push(ex);
    /* the T-tail (F, placed on E's boom by the tail rotor hub): the swept
       upper fin, the stabiliser on top with its endplates, the ventral fin */
    K.skin.push(hPlate([[6.30, 1.70], [6.74, 2.72], [6.98, 2.72], [6.64, 1.70]], 0.07, 0));
    K.skin.push(hPlate([[6.28, 1.62], [6.42, 0.94], [6.62, 0.94], [6.56, 1.62]], 0.06, 0));
    var st = box(0.36, 1.70, 0.05, HX(6.86), 0, HZ(2.71)); K.skin.push(st);
    for (sd = -1; sd <= 1; sd += 2) {
      K.skin.push(hPlate([[6.97, 2.74], [7.24, 2.74], [7.20, 2.39], [7.02, 2.39]], 0.035, sd * 0.85));
      /* team: a strip on each endplate's outer face */
      K.team.push(hPlate([[7.01, 2.66], [7.21, 2.66], [7.19, 2.50], [7.03, 2.50]], 0.01, sd * 0.875));
    }
    /* the tail-skid hook under the ventral fin (F) */
    K.metal.push(rod([HX(6.55), 0, HZ(0.95)], [HX(6.66), 0, HZ(0.86)], 0.018, 5));
    /* team: a band round the boom ahead of the tail */
    var tb = hTube([[5.55, 1.72, 0.125], [5.80, 1.71, 0.12]], 14); K.team.push(tb);
    /* skid gear (E side and head-on): skid track 1.87 m, two splayed legs
       a side from the pod belly */
    for (sd = -1; sd <= 1; sd += 2) {
      var yS = sd * 0.935;
      K.metal.push(rod([HX(0.10), yS, HZ(0.045)], [HX(2.55), yS, HZ(0.045)], 0.04, 8));
      K.metal.push(rod([HX(0.10), yS, HZ(0.045)], [HX(-0.02), yS, HZ(0.24)], 0.04, 8));
      K.skin.push(rod([HX(1.17), sd * 0.45, HZ(0.62)], [HX(0.91), yS, HZ(0.08)], 0.055, 8));
      K.skin.push(rod([HX(2.46), sd * 0.42, HZ(0.58)], [HX(2.24), yS, HZ(0.08)], 0.055, 8));
    }
    /* the mast from the fairing top to the head */
    K.metal.push(cylZ(0.07, 0.09, 0.30, HX(H_HUB_S), 0, HZ(2.58), 10));

    /* ---- detail pass (POLICY 10): the fittings the photographs show ----
       hOn(s, h, side, lift): a point on the pod skin at height h, port
       (side +1) or starboard (-1), lifted off it */
    function hOn(s, h, sd2, lift) {
      var q = hSec(s), a = angAt(Math.min(h, q.zc + q.hh * 0.98), q), pt = secPt(q.hw + lift, q.zc, q.hh + lift, q.e, sd2 > 0 ? a : PI - a);
      return [HX(s), pt[0], HZ(pt[1])];
    }
    function hChain(list, pts, r) { for (var i = 0; i + 1 < pts.length; i++) list.push(rod(pts[i], pts[i + 1], r, 5)); }
    function hLine(list, s0, h0, s1, h1, sd2, r, n) {
      var pts = [], i; n = n || 3;
      for (i = 0; i <= n; i++) pts.push(hOn(lerp(s0, s1, i / n), lerp(h0, h1, i / n), sd2, 0.03));
      hChain(list, pts, r);
    }
    K.lamp = [];
    for (sd = -1; sd <= 1; sd += 2) {
      /* the windscreen's frame bar at h 1.58 round the nose and the door
         window frames (E side) */
      var fb = [], fs;
      for (fs = 0.56; fs >= 0.09; fs -= 0.0675) fb.push(hOn(fs, 1.58, sd, 0.032));
      hChain(K.dark, fb, 0.016);
      [[0.70, 1.40, 1.05, 1.95], [1.62, 2.28, 1.43, 1.94]].forEach(function (w) {
        hLine(K.dark, w[0], w[2], w[1], w[2], sd, 0.013); hLine(K.dark, w[0], w[3], w[1], w[3], sd, 0.013);
        hLine(K.dark, w[0], w[2], w[0], w[3], sd, 0.013, 2); hLine(K.dark, w[1], w[2], w[1], w[3], sd, 0.013, 2);
      });
      /* door hinges on the front edge of each door, the handles at the aft edge */
      [0.62, 1.60].forEach(function (s0) {
        [1.00, 1.80].forEach(function (h) { var a = hOn(s0, h - 0.06, sd, 0.03), b = hOn(s0, h + 0.06, sd, 0.03); K.metal.push(rod(a, b, 0.02, 6)); });
      });
      [1.48, 2.36].forEach(function (s0) { var a = hOn(s0 - 0.07, 1.30, sd, 0.04), b = hOn(s0 + 0.03, 1.30, sd, 0.04); K.metal.push(rod(a, b, 0.014, 5)); });
      /* the roof window frames */
      var rf = [], ri;
      for (ri = 0; ri <= 4; ri++) { var rs = lerp(0.60, 1.66, ri / 4), rq = hSec(rs), rp = secPt(rq.hw + 0.03, rq.zc, rq.hh + 0.03, rq.e, PI / 2 - sd * 0.55); rf.push([HX(rs), rp[0], HZ(rp[1])]); }
      hChain(K.dark, rf, 0.014);
      /* the engine air inlet grilles on the fairing sides, five bars each */
      for (ri = 0; ri < 5; ri++) K.dark.push(box(0.035, 0.02, 0.20, HX(2.20 + ri * 0.075), sd * 0.355, HZ(2.25)));
      K.dark.push(box(0.40, 0.012, 0.24, HX(2.35), sd * 0.345, HZ(2.25)));
      /* a step on each forward skid leg */
      K.metal.push(box(0.16, 0.20, 0.02, HX(1.05), sd * 0.70, HZ(0.36)));
      /* the position lights on the stabiliser endplates' outer faces: red
         port, green starboard; the skid's tow-wheel lug at the aft end */
      K.lamp.push(lampGeo([HX(7.10), sd * 0.90, HZ(2.60)], 0.035, sd > 0 ? "red" : "green"));
      K.metal.push(box(0.10, 0.04, 0.08, HX(2.30), sd * 0.935, HZ(0.11)));
    }
    /* the pitot on the cabin roof's leading edge, the cargo hook and the
       antennas (two whips under the belly, one under the boom - [ROK2014]) */
    K.metal.push(rod([HX(0.62), 0, HZ(2.17)], [HX(0.42), 0, HZ(2.19)], 0.010, 5));
    K.metal.push(rod([HX(0.70), 0, HZ(2.12)], [HX(0.60), 0, HZ(2.20)], 0.014, 5));
    K.dark.push(box(0.14, 0.10, 0.08, HX(1.55), 0, HZ(0.47)));
    K.dark.push(rod([HX(1.90), 0.10, HZ(0.49)], [HX(2.20), 0.10, HZ(0.10)], 0.006, 4));
    K.dark.push(rod([HX(2.40), -0.12, HZ(0.53)], [HX(2.75), -0.12, HZ(0.20)], 0.006, 4));
    K.dark.push(rod([HX(4.40), 0, HZ(1.58)], [HX(4.95), 0, HZ(1.38)], 0.006, 4));
    K.dark.push(box(0.10, 0.015, 0.12, HX(5.00), 0, HZ(1.56)));
    /* lamps: the landing lamp in the chin, the red beacon under the belly,
       the white tail light at the boom's end */
    K.lamp.push(lampGeo([HX(0.50), 0, HZ(0.80)], 0.07, "white", [1, 1, 0.5]));
    K.lamp.push(lampGeo([HX(2.05), 0, HZ(0.49)], 0.055, "red", [1, 1, 0.7]));
    K.lamp.push(lampGeo([HX(6.66), 0, HZ(1.67)], 0.035, "white"));
    /* the exhaust's tail pipe stub and lip (E) */
    K.dark.push(cylY(0.16, 0.05, 0, 0, 0, 14).rotateZ(PI / 2).translate(HX(3.78), 0, HZ(1.14)));
    /* the tail-rotor gearbox fairing at the boom's end */
    K.skin.push(cylY(0.10, 0.22, HX(H_TR_S), 0.06, HZ(H_TR_H), 12));
    K.metal.push(cylZ(0.05, 0.06, 0.10, HX(H_HUB_S), 0, HZ(2.82), 10));

    var mats = hMats(C);
    var root = new V.Group();
    root.name = "md500d";
    emit(root, K, mats, ["pod", "skin", "metal", "dark", "glass", "team", "lamp"]);

    /* main rotor: an unrotated group, so its local +Z is the mast, pointing
       up, and render3d.js turns it positively about +Z: anticlockwise from
       above, as a Hughes rotor turns. Origin at the hub in the blade plane. */
    var rotor = new V.Group();
    rotor.name = "rotor";
    rotor.position.set(HX(H_HUB_S), 0, HZ(H_HUB_H));
    root.add(rotor);
    var hubM = [], bl = [];
    hubM.push(cylZ(0.20, 0.22, 0.10, 0, 0, 0.0, 14));
    hubM.push(cylZ(0.08, 0.10, 0.10, 0, 0, 0.09, 10));
    for (k = 0; k < 5; k++) {
      var a = (18 + 72 * k) * D2R;
      /* blade 0.18 m chord (E plan), from 0.40 m to the 4.015 m tip; detail pass: lofted through
         a lens section (leading edge at +Y: the head turns anti-clockwise), the root and the tip
         a little thinner, UVs along the span and across the chord for the blade sheet */
      var BS = [[0.5, 0], [0.30, 0.5], [-0.05, 0.42], [-0.5, 0], [-0.05, -0.42], [0.30, -0.5], [0.5, 0]];
      var b = loftUV([[0.40, 0.8], [1.00, 1.0], [3.80, 1.0], [H_ROTOR_R, 0.7]].map(function (st) {
        return BS.map(function (q) { return [st[0], q[0] * 0.18, 0.01 + q[1] * 0.025 * st[1], (st[0] - 0.40) / (H_ROTOR_R - 0.40), 0.5 + q[0]]; });
      }), true, true);
      b.rotateZ(a); bl.push(b);
      var ph = cylY(0.035, 0.22, 0, 0, 0, 8); ph.rotateZ(PI / 2); ph.translate(0.52, 0, 0.01); ph.rotateZ(a); hubM.push(ph);
      var gr = box(0.30, 0.10, 0.07, 0.30, 0, 0.0); gr.rotateZ(a); hubM.push(gr);
      /* detail pass: the pitch link from the swashplate to each grip's horn,
         the droop stop under the grip */
      var pl = rod([0.16, 0.08, -0.16], [0.24, 0.09, -0.01], 0.012, 5); pl.rotateZ(a); hubM.push(pl);
      var ds = box(0.08, 0.06, 0.03, 0.20, 0, -0.05); ds.rotateZ(a); hubM.push(ds);
    }
    hubM.push(cylZ(0.17, 0.19, 0.03, 0, 0, -0.16, 14));
    rotor.add(new V.Mesh(merge(hubM), mats.metal));
    rotor.add(new V.Mesh(merge(bl), mats.blade));
    var dsk = new V.CircleGeometry(H_ROTOR_R, 48); dsk.translate(0, 0, 0.03);
    var rd = new V.Mesh(dsk, mats.disc); rd.name = "rotordisc"; rotor.add(rd);

    /* tail rotor on the port side (F): two blades, 1.36 m (E). Unrotated
       group: its local Y is the model's lateral axis, the shaft. */
    var tr = new V.Group();
    tr.name = "tailrotor";
    tr.position.set(HX(H_TR_S), 0.20, HZ(H_TR_H));
    root.add(tr);
    var trP = [];
    trP.push(cylY(0.06, 0.10, 0, 0, 0, 10));
    /* the two blades as one bar through the hub, in the disc (x-z) plane */
    var tbld = box(0.12, 0.02, H_TR_R * 2, 0, 0.03, 0);
    tbld.rotateY(PI / 4);
    trP.push(tbld);
    tr.add(new V.Mesh(merge(trP), mats.blade));
    return root;
  }

  return { an2: buildAn2, md500d: buildMD500 };
})();

/* len: the measured X extent. An-2: spinner tip (6.30) to rudder (-6.27),
   A's 12.57 m (published 12.4 m). 500D: rotor disc front to the tail
   rotor's tip, 9.18 m (published 9.24 m with rotors). */
(function () {
  var AN2 = ["kpa_e60_transport", "kpa_e80_transport", "kpa_e00_transport"];
  var MD = ["kpa_e80_md500", "kpa_e90_md500", "kpa_e00_md500"];
  AN2.forEach(function (k) { UNIT_MODELS[k] = { len: 12.57, build: function (T, M, C) { return HeroKpaAir.an2(T, M, C); } }; });
  MD.forEach(function (k) { UNIT_MODELS[k] = { len: 9.18, build: function (T, M, C) { return HeroKpaAir.md500d(T, M, C); } }; });
})();
