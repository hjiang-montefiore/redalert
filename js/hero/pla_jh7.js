/* ============================================================================
   pla_jh7.js  --  HERO model: Xian JH-7 / JH-7A "Flying Leopard"
   ----------------------------------------------------------------------------
   Registers pla_e90_cas (JH-7), pla_e00_cas (JH-7A) and pla_e00_sead (JH-7A
   carrying two YJ-91 anti-radiation missiles). One builder, VARIANTS below.
   Full-quality redo, 2026-10-30. No three-view of the type exists on
   Wikimedia Commons (Category:Xi'an JH-7 / JH-7A searched); the stations
   below are read off photographs on a pixel grid and scaled from the
   published length, and the wing is held to the published span and area.

   References (Wikimedia Commons unless said; fetched at 955-1600 px):
     B  "Bottom view JH-7.jpg" - a JH-7 (naval grey, dark green radome) in
        flight, seen broadside from below and a little from behind. The
        side-profile tables are read off it: nose tip px 126, rudder top
        px 812 = the published 21.03 m (32.6 px/m along the axis); the axis
        through the nose tip and the nozzle centre slopes 0.053. Heights
        are taken at 0.86 of the raw reading (the view is from below and
        yawed: the factor that makes the fin-to-ground split agree with
        photo A, see GROUND). It also shows the two pylons a wing, the
        wingtip rails, the low anhedral tailplanes and a ventral fin under
        the jet pipes; the tip chord (same on both wings, 2.8 m) and, by
        averaging the near and far tips, the tip stations.
     M  "Haijun bowuguan -- Jianhong-7 II xing feiji.jpg" (the Commons title is
        in Chinese: Navy Museum, JH-7 type II aircraft) - a JH-7 head-on,
        parked: the THREE-PIECE windscreen (flat front panel and two
        framed quarter panels), the two separate canopy hoods, the tall
        rectangular intakes standing off the fuselage on splitter plates,
        twin-wheel nose leg, twin side-by-side main wheels, the pylons, the
        drooped wing and the anhedral tailplane, the gun port low on the
        starboard nose.
     A  "Xian JH-7A fighter bomber.jpg" - a JH-7A rolling out under its
        chute, three-quarter front from port: the ONE-PIECE curved
        windscreen, the front hood, the broad frame, the rear cockpit's
        side window and raised rear hood; THREE pylons a wing; the pylon
        under the intake trunk (a pod on it); the large canted ventral
        fin under the jet pipes; the big main-gear doors; the pale grey
        finish with a dark blue-grey radome and anti-glare band; the
        brake-chute fairing at the fin root; the long nose-gear leg.
     K  "Kh-31P - MAKS-2009 01.jpg" (Commons title in Cyrillic; MAKS 2009) - a Kh-31P, from which the
        YJ-91 derives: the long dark conical radome (about a quarter of the
        length), the bare-metal body, four ramjet ducts in an X round the
        rear half, each with a pointed cone over its mouth, small wings
        and tail fins in the + positions.
     en.wikipedia "Xi'an JH-7": length 22.32 m (with the nose probe), span
        12.8 m, height 6.22 m, wing area 42.2 m2, two Spey Mk 202 / WS-9;
        the JH-7A added two wing hardpoints (4 -> 6) and a one-piece
        windscreen replaced the three-piece one; two more hardpoints under
        the intake trunks for pods. ru.wikipedia "JH-7": 21.03 m without
        the probe (so the probe is 1.29 m), span 12.71 m, height 6.58 m.
        en.wikipedia "Kh-31": Kh-31P 4.7 m long, 360 mm across, 914 mm
        wing span.

   Recognition list (each shows in the model; source in brackets):
     1. Tandem two-seat cockpit under two separate hoods, the rear seat
        raised; the windscreen three-piece on the JH-7, one curved piece
        on the JH-7A (M, A).
     2. Long pointed radome with a 1.29 m pitot probe (B, M, published).
     3. Tall rectangular intakes with rounded corners on splitter plates
        beside the rear cockpit, the trunks merging into a broad, flat-
        sided rear fuselage (B, M, A).
     4. Shoulder-mounted swept wing with a little anhedral and launch rails
        on the tips (B, M, A).
     5. Big single fin, its leading edge swept about 60 deg, with a long
        dorsal fillet running forward along the spine; the chute fairing
        at its root (B, A).
     6. Low-set all-moving tailplanes with marked anhedral (B, M).
     7. Twin Spey jet pipes side by side under the fin (B).
     8. Twin ventral fins, canted out, under the jet pipes (A, B).
     9. Long-legged undercarriage: twin nose wheels, twin side-by-side
        main wheels with big doors (M, A).
    10. Pylons: two a wing on the JH-7, three a wing plus one under each
        intake trunk on the JH-7A (B, A, published hardpoint count).
   Paint: pale grey sampled off A (190,196,200) and B (173,185,188), taken
   to about 0.85 of level: #a3a8ab. Radome: JH-7 dark green-grey (B,
   71,97,105); JH-7A dark blue-grey (A, 55,66,88) with an anti-glare band
   ahead of the windscreen (A). No stars, bars or numbers are drawn (house
   rule).

   NOT CONFIRMED (estimated, not measured off a drawing):
     - The wing planform. B gives a 2.8 m tip chord and tip stations, but
       with a 42 deg leading edge that chord would put the area near 55 m2
       against the published 42.2. The published span and area win: the
       wing is drawn with a 42 deg leading edge (between B's reading and
       the 45 deg quoted in js/air_specs.js), a 2.1 m tip chord and 4.6 m
       centreline chord (gross 42.4 m2).
     - Wing anhedral (3 deg drawn) and tailplane anhedral (10 deg drawn):
       both are visible in M and B but not measurable there.
     - Tailplane span (7.8 m drawn) and its stations, read from B only.
     - Fuselage widths: from M's head-on view only (2.75 m over the
       intakes); the plan view of the fuselage is not photographed.
     - Main-gear station (s 13.6) and track (2.7 m), and the nose leg at s
       4.2: read off A in perspective.
     - Whether the original JH-7 had TWIN ventral fins like the JH-7A: B
       shows a ventral fin there but not how many; both variants are given
       the JH-7A pair.
     - Pylon spanwise stations (B and A in perspective).
     - The YJ-91's exact external shape: drawn as the Kh-31P it derives
       from (four ramjet intakes, cruciform wings and tail fins) at the
       published size, on the inner wing pylons. Which pylons a JH-7A
       uses for the YJ-91 is not shown by any reference fetched.
     - Ground line: height 6.22 m (en) is used; ru gives 6.58 m.

   Model space: +X nose, +Y port, +Z up, metres. Tables are in drawing
   units: s = metres aft of the radome tip, X = 10.50 - s; z is height over
   the line through the nose tip and the nozzle centres (ground at -2.32).
   Merged per material; the undercarriage is the group "gear".
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJh7 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;
  var XN = 10.50;
  function X(s) { return XN - s; }

  var PAL = { lt: "#a3a8ab", dk: "#8e9497", pale: "#b4b8ba", soot: "rgba(36,34,32," };
  var SKIN_R = 0.70, SKIN_M = 0.12;

  var VARIANTS = {
    jh7:  { windscreen: 3, wingPylons: [2.40, 4.00], intakePylons: false, radome: "#47605f", glare: false, yj91: false },
    jh7a: { windscreen: 1, wingPylons: [2.30, 3.90, 5.10], intakePylons: true, radome: "#3a4352", glare: true, yj91: false },
    sead: { windscreen: 1, wingPylons: [2.30, 3.90, 5.10], intakePylons: true, radome: "#3a4352", glare: true, yj91: true },
  };

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvas(W, H) {
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H; return cv;
  }
  function texOf(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }
  /* painted grey: a few slightly different panels, seams, fastener rows.
     Kept quiet so the airframe reads as one pale grey at game zoom. */
  function paintBase(g, W, H, R, n) {
    var i;
    g.fillStyle = PAL.lt; g.fillRect(0, 0, W, H);
    for (i = 0; i < n; i++) {
      g.globalAlpha = 0.08 + R() * 0.10;
      g.fillStyle = (i % 3 === 0) ? PAL.pale : PAL.dk;
      g.fillRect(R() * W, R() * H, 30 + R() * 110, 16 + R() * 50);
    }
    g.globalAlpha = 1;
  }
  function seams(g, W, H, R, n) {
    var i, x = 0;
    g.strokeStyle = "rgba(30,34,36,0.26)"; g.lineWidth = 1.3;
    while (x < W) { x += 34 + R() * 60; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(30,34,36,0.14)"; g.lineWidth = 1;
    for (i = 0; i < n; i++) {
      var px = R() * W, py = R() * H, L = 30 + R() * 110;
      g.beginPath();
      if (R() < 0.6) { g.moveTo(px, py); g.lineTo(px + L, py); } else { g.moveTo(px, py); g.lineTo(px, py + L * 0.5); }
      g.stroke();
    }
    g.strokeStyle = "rgba(30,34,36,0.26)";
    for (i = 0; i < 16; i++) g.strokeRect(R() * W, R() * H, 10 + R() * 28, 8 + R() * 16);
  }

  /* ============================================================ textures ==
     Fuselage loft from s 1.75 (radome joint) to s 19.75: u = (s - 1.75) /
     18.0; v = 0 port, 0.25 top, 0.5 starboard, 0.75 belly. After flipY:
     port at canvas row H (and 0), top 0.75H, starboard 0.5H, belly 0.25H. */
  var BODY_S0 = 1.75, BODY_L = 18.0;
  function bu(x) { return (XN - x - BODY_S0) / BODY_L; }
  function us(s) { return (s - BODY_S0) / BODY_L; }
  var _bd = {};
  function bodySheet(THREE, V) {
    var key = V.glare ? "a" : "o";
    if (_bd[key] !== undefined) return _bd[key];
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(7071);
      paintBase(g, W, H, R, 18);
      seams(g, W, H, R, 60);
      /* production breaks: radome bulkhead, cockpit section, intake face,
         wing-box joint, engine bay, the jet-pipe shroud */
      g.strokeStyle = "rgba(24,28,30,0.50)"; g.lineWidth = 2.2;
      [1.80, 3.60, 7.40, 10.0, 15.4, 18.6].forEach(function (s) {
        g.beginPath(); g.moveTo(us(s) * W, 0); g.lineTo(us(s) * W, H); g.stroke();
      });
      /* the JH-7A's anti-glare band: the radome colour carried back over
         the nose top to the windscreen (A) */
      if (V.glare) {
        g.fillStyle = V.radomeCol || "#3a4352";
        g.beginPath();
        g.moveTo(0, H * 0.62); g.lineTo(us(3.70) * W, H * 0.66);
        g.lineTo(us(3.70) * W, H * 0.84); g.lineTo(0, H * 0.88); g.closePath(); g.fill();
      }
      /* engine-bay access panels on the lower sides, the gun port on the
         starboard lower nose (M) */
      g.strokeStyle = "rgba(24,28,30,0.40)"; g.lineWidth = 1.8;
      for (var k = 0; k < 4; k++) {
        g.strokeRect(us(15.6 + k * 0.7) * W, H * 0.36, 0.55 / BODY_L * W, H * 0.08);
        g.strokeRect(us(15.6 + k * 0.7) * W, H * 0.06, 0.55 / BODY_L * W, H * 0.08);
      }
      g.fillStyle = "rgba(14,16,18,0.85)";
      g.fillRect(us(3.1) * W, H * 0.40, 0.30 / BODY_L * W, H * 0.025);
      /* heat staining over the last two metres, oil streaks under the belly */
      var s = g.createLinearGradient(us(17.6) * W, 0, W, 0);
      s.addColorStop(0, PAL.soot + "0)"); s.addColorStop(1, PAL.soot + "0.40)");
      g.fillStyle = s; g.fillRect(us(17.6) * W, 0, W - us(17.6) * W, H);
      for (var i = 0; i < 30; i++) {
        g.fillStyle = PAL.soot + (0.04 + R() * 0.06).toFixed(3) + ")";
        g.fillRect(us(10) * W + R() * W * 0.45, H * (0.17 + R() * 0.16), 30 + R() * 80, 2 + R() * 3);
      }
      g.fillStyle = PAL.lt; g.fillRect(W * 0.975, 0, W * 0.025, H * 0.06);
      _bd[key] = texOf(THREE, cv);
    } catch (e) { _bd[key] = null; }
    return _bd[key];
  }

  /* wings and tailplanes share one planform sheet: u along s over
     [WS0, WS1] (s grows to the right), v across |y| over [0, WSP]. */
  var WS0 = 8.5, WS1 = 21.5, WSP = 6.6;
  var _wg = null;
  function wingSheet(THREE) {
    if (_wg !== null) return _wg;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(4242);
      function U(s) { return (XN - s - (XN - WS1)) / (WS1 - WS0) * W; }
      function Vv(y) { return (1 - y / WSP) * H; }
      paintBase(g, W, H, R, 12);
      seams(g, W, H, R, 40);
      /* flap inboard, aileron outboard: hinge lines about 0.25 of the chord
         ahead of the trailing edge */
      g.strokeStyle = "rgba(20,24,26,0.55)"; g.lineWidth = 2.4;
      function hinge(y0, y1) {
        var a = wingAt(y0), b = wingAt(y1);
        var sa = a.te - 0.26 * (a.te - a.le), sb = b.te - 0.26 * (b.te - b.le);
        g.beginPath(); g.moveTo(U(a.te), Vv(y0)); g.lineTo(U(sa), Vv(y0)); g.lineTo(U(sb), Vv(y1)); g.lineTo(U(b.te), Vv(y1)); g.stroke();
      }
      hinge(1.40, 4.10); hinge(4.20, 6.10);
      /* the slat line along the leading edge */
      g.strokeStyle = "rgba(20,24,26,0.30)"; g.lineWidth = 1.6;
      var p = wingAt(1.6), q = wingAt(6.1);
      g.beginPath(); g.moveTo(U(p.le + 0.45), Vv(1.6)); g.lineTo(U(q.le + 0.30), Vv(6.1)); g.stroke();
      _wg = texOf(THREE, cv);
    } catch (e) { _wg = null; }
    return _wg;
  }

  /* fin: u along s over [FS0, FS1], v up z over [FZ0, FZ1] */
  var FS0 = 14.0, FS1 = 21.5, FZ0 = 0.6, FZ1 = 4.0;
  var _fn = null;
  function finSheet(THREE) {
    if (_fn !== null) return _fn;
    try {
      var W = 512, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(5151);
      function U(s) { return (XN - s - (XN - FS1)) / (FS1 - FS0) * W; }
      function Vz(z) { return (1 - (z - FZ0) / (FZ1 - FZ0)) * H; }
      paintBase(g, W, H, R, 10);
      seams(g, W, H, R, 20);
      /* the rudder: hinge from over the chute fairing to below the cap (B) */
      g.strokeStyle = "rgba(20,24,26,0.60)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(19.95), Vz(1.55)); g.lineTo(U(20.45), Vz(3.62)); g.lineTo(U(21.0), Vz(3.62)); g.stroke();
      /* the dark dielectric cap on the fin tip (B, A) */
      g.fillStyle = "#4a4f52";
      g.beginPath(); g.moveTo(U(20.20), Vz(3.72)); g.lineTo(U(21.2), Vz(3.72)); g.lineTo(U(21.2), Vz(4.0)); g.lineTo(U(20.2), Vz(4.0)); g.fill();
      _fn = texOf(THREE, cv);
    } catch (e) { _fn = null; }
    return _fn;
  }

  /* ============================================================ materials */
  function materials(THREE, C, V) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    function flat(col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    }
    V.radomeCol = V.radome;
    return {
      body: sk(bodySheet(THREE, V), PAL.lt),
      wing: sk(wingSheet(THREE), PAL.lt),
      fin: sk(finSheet(THREE), PAL.lt),
      radome: flat(new THREE.Color(V.radome), 0.55, 0.10),
      team: flat(new THREE.Color((C && C.team !== undefined) ? C.team : 0xd03f3f), SKIN_R, SKIN_M),
      metal: flat(0x5c6266, 0.50, 0.55),
      hot: flat(0x3a3632, 0.58, 0.50),
      ink: flat(0x070809, 0.95, 0.03),
      store: flat(0x8c9093, 0.45, 0.45),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x2a3b42, roughness: 0.12, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.80, side: THREE.DoubleSide }),
    };
  }

  /* ================================================================ loft ==
     Sections {x, w, zt, zb, zw, e, yc} (x in model X): half width w at
     height zw, top zt, bottom zb, each half a superellipse of exponent e
     (e < 1 squarer). Nose first; u along the loft, v round from port. */
  function loft(THREE, secs, segs, bodyUV) {
    var pos = [], uv = [], idx = [];
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i], e = s.e || 1, zw = s.zw === undefined ? (s.zt + s.zb) / 2 : s.zw;
      for (var j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t);
        var y = (s.yc || 0) + s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        var dz = (sz >= 0 ? (s.zt - zw) : (zw - s.zb)) * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        pos.push(s.x, y, zw + dz);
        uv.push(bodyUV ? bu(s.x) : (x1 === x0 ? 0 : (s.x - x0) / (x1 - x0)), j / segs);
      }
    }
    var ring = segs + 1;
    for (i = 0; i < secs.length - 1; i++)
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function pinUV(geo) {
    var u = geo.attributes.uv;
    if (u) for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
    return geo;
  }
  /* S: a section at station s (drawing units) */
  function S(s, zt, zb, w, zw, e, yc) { return { x: X(s), w: w, zt: zt, zb: zb, zw: zw, e: e || 1, yc: yc || 0 }; }
  /* O: a round section of radius r centred (yc, zc) at station s */
  function O(s, r, zc, yc) { return { x: X(s), w: r, zt: zc + r, zb: zc - r, zw: zc, e: 1, yc: yc || 0 }; }

  /* ===================================================== lifting surfaces ==
     An aerofoil lofted spanwise through stations {s (span), le, te (model
     X), t, h}; rounded-nose section, thickest near 40% chord. vert: span
     along +Z. mirror: Y -> -Y. Tip capped. box: UV box in model X / span. */
  function foil(xc) { return Math.pow(xc, 0.75) * (1 - xc) / 0.3027; }
  function surf(THREE, sts, opt) {
    var K = 10, pos = [], uv = [], idx = [], ring = 2 * K;
    var box = opt.box;
    for (var i = 0; i < sts.length; i++) {
      var st = sts[i];
      for (var k = 0; k < ring; k++) {
        var up = k <= K, kk = up ? k : 2 * K - k;
        var xc = (1 - Math.cos(PI * kk / K)) * 0.5;
        var ht = (Math.max(0.003, st.t * 0.5 * foil(xc)) + (st.pad || 0)) * (up ? 1 : -1);
        if (k === 0 || k === K) ht = 0;
        var Xp = st.le - xc * (st.le - st.te);
        var Sp = st.s, Z = st.h + ht;
        uv.push((Xp - box.x0) / (box.x1 - box.x0), (Math.abs(Sp) - box.s0) / (box.s1 - box.s0));
        if (opt.vert) pos.push(Xp, -Z + (st.yo || 0), Sp); else pos.push(Xp, Sp, Z);
      }
    }
    var flip = (sts[sts.length - 1].s < sts[0].s) !== !!opt.mirror;
    function tri(a, b, c) { if (flip) idx.push(a, c, b); else idx.push(a, b, c); }
    for (i = 0; i < sts.length - 1; i++)
      for (k = 0; k < ring; k++) {
        var a = i * ring + k, b = i * ring + (k + 1) % ring;
        var c = a + ring, d = b + ring;
        tri(a, c, b); tri(b, c, d);
      }
    var last = sts.length - 1, base = last * ring, cx = 0, cy = 0, cz = 0;
    for (k = 0; k < ring; k++) { cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2]; }
    var ci = pos.length / 3;
    pos.push(cx / ring, cy / ring, cz / ring);
    uv.push(uv[base * 2], uv[base * 2 + 1]);
    for (k = 0; k < ring; k++) tri(ci, base + (k + 1) % ring, base + k);
    if (opt.mirror) for (i = 1; i < pos.length; i += 3) pos[i] = -pos[i];
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* ========================================================= station tables
     RADOME and BODY: side profile off B (heights x0.86), widths off M. */
  var RAD_Z = 0.15;
  var RADOME = [
    [0.00, 0.012, 0.10], [0.12, 0.10, 0.11], [0.35, 0.20, 0.12], [0.65, 0.30, 0.13],
    [1.00, 0.39, 0.14], [1.40, 0.46, 0.15], [1.75, 0.52, 0.15]];
  var PROBE_L = 1.29;
  /* s, zt, zb, w, zw, e */
  var BODY = [
    [1.75, 0.67, -0.37, 0.53, 0.15, 1.00],
    [2.30, 0.82, -0.46, 0.57, 0.16, 0.98],
    [3.00, 0.98, -0.53, 0.60, 0.18, 0.95],
    [3.65, 1.08, -0.57, 0.62, 0.22, 0.90],
    [4.50, 1.10, -0.58, 0.63, 0.25, 0.85],
    [5.50, 1.13, -0.60, 0.64, 0.27, 0.82],
    [6.50, 1.20, -0.62, 0.64, 0.30, 0.80],
    [7.50, 1.36, -0.63, 0.70, 0.32, 0.78],
    [9.00, 1.42, -0.63, 0.82, 0.35, 0.72],
    [10.5, 1.42, -0.62, 0.98, 0.38, 0.66],
    [12.0, 1.40, -0.60, 1.12, 0.40, 0.62],
    [13.5, 1.36, -0.58, 1.18, 0.40, 0.62],
    [15.0, 1.30, -0.56, 1.18, 0.38, 0.64],
    [16.5, 1.20, -0.52, 1.13, 0.34, 0.66],
    [18.0, 1.02, -0.48, 1.06, 0.28, 0.70],
    [19.2, 0.82, -0.44, 1.00, 0.20, 0.74],
    [19.75, 0.68, -0.42, 0.98, 0.14, 0.76]];
  /* intake trunks: s, zt, zb, half width, yc (port; mirrored). The lip at
     s 6.47 (B); the mouth 1.25 m tall and 0.70 wide (M: 0.67 of the
     height); the trunk sweeps inboard into the body by s 12 */
  var TRUNK = [
    [6.47, 1.10, -0.18, 0.35, 1.02],
    [7.20, 1.12, -0.24, 0.36, 1.02],
    [8.50, 1.10, -0.34, 0.36, 1.00],
    [10.0, 1.02, -0.44, 0.36, 0.94],
    [11.2, 0.90, -0.50, 0.34, 0.86],
    [12.2, 0.76, -0.52, 0.30, 0.80]];
  var NOZ_Y = 0.52, NOZ_R = 0.40, NOZ_S = 20.30, NOZ_Z = 0.0;

  /* CANOPY: windscreen base s 3.65, front hood peak 1.48, the rear hood
     raised to 1.64 (B), falling into the spine by s 7.4 */
  var CANOPY = [
    [3.65, 1.12, 0.10], [3.90, 1.30, 0.40], [4.20, 1.42, 0.49], [4.60, 1.48, 0.53],
    [5.00, 1.50, 0.53], [5.30, 1.57, 0.53], [5.70, 1.64, 0.52], [6.20, 1.64, 0.50],
    [6.60, 1.58, 0.46], [7.00, 1.49, 0.38], [7.40, 1.40, 0.14]];

  /* WING: published span 12.8 (over the rails) and area 42.2 m2; LE 42
     deg, centreline chord 4.6, tip chord 2.1 at y 6.30; root at z 1.18,
     3 deg anhedral; t/c 6%. */
  var W_LE0 = 9.10, W_C0 = 4.60, W_CT = 2.10, W_TIP = 6.30, W_TANLE = Math.tan(42 * D2R);
  var W_Z = 1.18, TAN_ANH = Math.tan(3 * D2R);
  function wingAt(y) {
    var le = W_LE0 + y * W_TANLE, c = W_C0 + (W_CT - W_C0) * (y / W_TIP);
    return { le: le, te: le + c };
  }
  function wz(y) { return W_Z - Math.max(0, y - 0.9) * TAN_ANH; }
  /* TAIL: low, all-moving, 10 deg anhedral; root at z 0.30 (B, M) */
  var T_Z = 0.30, T_ANH = Math.tan(10 * D2R);
  var TAIL = [[0.6, 16.6, 19.9], [1.1, 16.95, 20.0], [2.5, 18.2, 20.25], [3.9, 19.55, 20.50]];
  /* FIN: z, LE, TE (drawing s), read off B; the dorsal fillet from s 14.6 */
  var FIN = [[1.05, 14.6, 20.70], [1.40, 15.2, 20.72], [1.65, 15.9, 20.75], [1.90, 16.35, 20.78],
             [2.44, 17.6, 20.84], [2.92, 18.6, 20.90], [3.40, 19.45, 20.95], [3.80, 20.15, 21.00],
             [3.90, 20.40, 21.03]];

  var GROUND = -2.32;   /* fin tip 3.90 - published height 6.22 */

  /* =============================================================== build */
  var THREE_ = null;
  function add(g, geo, mat, x, y, z) {
    var m = new THREE_.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    g.add(m);
    return m;
  }
  function rod(g, mat, r, a, b, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r, r, L, seg || 6), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE_.Vector3(0, 1, 0), new THREE_.Vector3(dx / L, dy / L, dz / L));
    g.add(m);
    return m;
  }
  /* a tube along X between stations sf (front) and sb (back) */
  function stube(g, mat, r0, r1, sf, sb, y, z, seg, open) {
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r1, r0, sb - sf, seg, 1, !!open), mat);
    m.rotation.z = HALF_PI;   /* local +Y -> world -X: the "top" radius is aft */
    m.position.set(X((sf + sb) / 2), y, z);
    g.add(m);
    return m;
  }

  function build(THREE, M, C, vk) {
    THREE_ = THREE;
    var V = VARIANTS[vk];
    var T = materials(THREE, C, V);
    var g = new THREE.Group();
    addBody(THREE, g, T);
    addIntakes(THREE, g, T);
    addCockpit(THREE, g, T, V);
    addWings(THREE, g, T, V);
    addTail(THREE, g, T);
    addGear(THREE, g, T);
    addTeam(THREE, g, T);
    if (V.yj91) addYJ91(THREE, g, T, V);
    var out = mergeByMaterial(THREE, g);
    out.name = "jh7";
    return out;
  }

  /* ----------------------------------------- radome, fuselage, jet pipes */
  function addBody(THREE, g, T) {
    var rs = [], i;
    for (i = 0; i < RADOME.length; i++) rs.push(O(RADOME[i][0], RADOME[i][1], RADOME[i][2]));
    g.add(new THREE.Mesh(loft(THREE, rs, 28), T.radome));
    /* the pitot probe: 1.29 m, stepped (B: the banded boom) */
    stube(g, T.metal, 0.012, 0.035, -PROBE_L, -0.25, 0, 0.10, 8);
    stube(g, T.metal, 0.045, 0.045, -0.30, 0.02, 0, 0.10, 8);
    var bs = [];
    for (i = 0; i < BODY.length; i++) {
      var b = BODY[i];
      bs.push(S(b[0], b[1], b[2], b[3], b[4], b[5]));
    }
    g.add(new THREE.Mesh(loft(THREE, bs, 40, true), T.body));
    /* the dorsal spine fairing from the canopy back to the fin fillet */
    g.add(new THREE.Mesh(loft(THREE, [
      S(7.0, 1.36, 1.20, 0.05, 1.25), S(7.6, 1.45, 1.20, 0.22, 1.30, 0.9),
      S(10.0, 1.47, 1.25, 0.26, 1.32, 0.9), S(13.0, 1.46, 1.25, 0.24, 1.32, 0.9),
      S(14.8, 1.42, 1.20, 0.18, 1.28, 0.9), S(15.6, 1.36, 1.15, 0.08, 1.24)], 14, true), T.body));
    /* the two Spey jet pipes: shrouds out of the fuselage end, the dark
       nozzle and a turbine face deep inside (B) */
    for (var sd = -1; sd <= 1; sd += 2) {
      var y = sd * NOZ_Y;
      g.add(new THREE.Mesh(loft(THREE, [
        O(19.3, NOZ_R + 0.02, NOZ_Z, y), O(19.9, NOZ_R + 0.01, NOZ_Z, y),
        O(NOZ_S, NOZ_R - 0.01, NOZ_Z, y), O(NOZ_S + 0.03, NOZ_R - 0.05, NOZ_Z, y)], 24), T.hot));
      stube(g, T.ink, NOZ_R - 0.05, NOZ_R - 0.10, 19.4, NOZ_S + 0.02, y, NOZ_Z, 22, true);
      add(g, new THREE.CylinderGeometry(0.22, 0.30, 0.10, 16), T.hot, X(19.6), y, NOZ_Z).rotation.z = HALF_PI;
    }
    /* the fairing between and above the pipes, carrying the brake-chute
       housing at the fin root (A) */
    g.add(new THREE.Mesh(loft(THREE, [
      S(19.6, 0.72, 0.30, 0.25, 0.52), S(20.4, 0.86, 0.38, 0.22, 0.60),
      S(21.0, 0.86, 0.46, 0.18, 0.64, 0.9), S(21.06, 0.80, 0.52, 0.10, 0.66)], 16, true), T.body));
    /* twin ventral fins under the jet pipes, canted 25 deg out (A, B) */
    for (sd = -1; sd <= 1; sd += 2) {
      var vf = [{ s: 0, le: X(15.3), te: X(18.3), t: 0.06, h: 0 },
                { s: 0.80, le: X(16.4), te: X(18.15), t: 0.05, h: 0 }];
      var vm = add(g, surf(THREE, vf, { vert: true, box: { x0: X(FS1), x1: X(FS0), s0: 0, s1: 1 } }), T.fin, 0, sd * 0.62, -0.48);
      vm.rotation.x = PI + sd * 25 * D2R;
    }
  }

  /* ---------------------------------------------- intakes and splitters --
     The rectangular intakes stand 5 cm off the fuselage on splitter plates
     (M): a lip ring, a pale first half-metre of duct, then dark. */
  function addIntakes(THREE, g, T) {
    for (var sd = -1; sd <= 1; sd += 2) {
      var ts = [], i;
      for (i = 0; i < TRUNK.length; i++) {
        var t = TRUNK[i];
        ts.push(S(t[0], t[1], t[2], t[3], (t[1] + t[2]) / 2, 0.55, sd * t[4]));
      }
      g.add(new THREE.Mesh(loft(THREE, ts, 28, true), T.body));
      var t0 = TRUNK[0], zc = (t0[1] + t0[2]) / 2, yc = sd * t0[4];
      /* lip: rolled forward edge */
      g.add(new THREE.Mesh(loft(THREE, [
        S(t0[0] + 0.12, t0[1] - 0.07, t0[2] + 0.07, t0[3] - 0.07, zc, 0.55, yc),
        S(t0[0] - 0.02, t0[1] - 0.03, t0[2] + 0.03, t0[3] - 0.03, zc, 0.55, yc),
        S(t0[0], t0[1], t0[2], t0[3], zc, 0.55, yc)], 28, true), T.body));
      g.add(new THREE.Mesh(loft(THREE, [
        S(t0[0] + 0.12, t0[1] - 0.07, t0[2] + 0.07, t0[3] - 0.07, zc, 0.55, yc),
        S(t0[0] + 0.90, t0[1] - 0.12, t0[2] + 0.12, t0[3] - 0.11, zc, 0.55, yc * 0.97),
        S(t0[0] + 1.20, 0.02 + zc, zc - 0.02, 0.02, zc, 0.55, yc * 0.95)], 24), T.ink));
      /* the splitter plate: inner wall of the gap, ahead of the lip */
      var sp = add(g, new THREE.BoxGeometry(1.40, 0.03, 1.20), T.body, X(t0[0] + 0.55), sd * 0.665, zc + 0.02);
      pinUV(sp.geometry);
      /* boundary-layer bleed: a dark slot in the gap */
      add(g, new THREE.BoxGeometry(0.80, 0.04, 1.05), T.ink, X(t0[0] + 0.95), sd * 0.655, zc + 0.02);
    }
  }

  /* ---------------------------------------------------- canopy, cockpit -- */
  function addCockpit(THREE, g, T, V) {
    var cs = [];
    for (var i = 0; i < CANOPY.length; i++) cs.push(S(CANOPY[i][0], CANOPY[i][1], 0.98, CANOPY[i][2], 1.04, 0.86));
    g.add(new THREE.Mesh(loft(THREE, cs, 28), T.glass));
    /* seats, headrests and the rear instrument hood seen through the glass */
    add(g, new THREE.BoxGeometry(0.40, 0.46, 0.34), T.ink, X(4.85), 0, 1.12);
    add(g, new THREE.BoxGeometry(0.14, 0.30, 0.24), T.ink, X(5.05), 0, 1.32);
    add(g, new THREE.BoxGeometry(0.40, 0.46, 0.40), T.ink, X(6.25), 0, 1.20);
    add(g, new THREE.BoxGeometry(0.14, 0.30, 0.24), T.ink, X(6.45), 0, 1.44);
    add(g, new THREE.BoxGeometry(0.30, 0.50, 0.18), T.ink, X(4.05), 0, 1.12);
    function arch(s, zt, w, r) {
      var a = add(g, new THREE.TorusGeometry(1, r || 0.025, 5, 22, PI), T.body, X(s), 0, 1.02);
      a.rotation.set(HALF_PI, HALF_PI, 0);
      a.scale.set(w + 0.01, zt - 1.02 + 0.01, 1.0);
      pinUV(a.geometry);
    }
    /* windscreen arch, the broad frame between the hoods (A), the rear
       hood's front bow, the aft frame */
    arch(4.18, 1.43, 0.50, 0.035);
    arch(5.18, 1.53, 0.535, 0.06);
    arch(5.40, 1.59, 0.535, 0.03);
    arch(7.02, 1.49, 0.38, 0.035);
    for (var sd = -1; sd <= 1; sd += 2) {
      /* the sills */
      add(g, pinUV(new THREE.BoxGeometry(3.40, 0.04, 0.05)), T.body, X(5.35), sd * 0.56, 1.02);
      if (V.windscreen === 3) {
        /* JH-7: the two posts of the flat front panel (M) */
        rod(g, T.body, 0.022, [X(3.67), sd * 0.13, 1.12], [X(4.16), sd * 0.24, 1.42]);
      }
      /* JH-7A: the rear cockpit's small side window frame (A) */
      rod(g, T.body, 0.02, [X(5.55), sd * 0.53, 1.05], [X(5.55), sd * 0.50, 1.55]);
    }
    /* the blade aerial on the spine behind the canopy (A) */
    var bl = add(g, pinUV(new THREE.BoxGeometry(0.30, 0.03, 0.34)), T.body, X(8.0), 0, 1.70);
    bl.rotation.y = -0.25;
  }

  /* -------------------------------------------------------------- wings -- */
  function wingStations(y0, y1, pad) {
    var o = [], n = 6;
    for (var i = 0; i <= n; i++) {
      var y = y0 + (y1 - y0) * i / n, w = wingAt(y);
      o.push({ s: y, le: X(w.le), te: X(w.te), t: (w.te - w.le) * (0.065 - 0.015 * y / W_TIP), h: wz(y), pad: pad || 0 });
    }
    return o;
  }
  function addWings(THREE, g, T, V) {
    var WB = { x0: X(WS1), x1: X(WS0), s0: 0, s1: WSP };
    var st = wingStations(0.5, W_TIP);
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, mirror: true }), T.wing));
    for (var sd = -1; sd <= 1; sd += 2) {
      /* the wingtip launch rails (B, M, A) */
      var tp = wingAt(W_TIP), ty = sd * (W_TIP + 0.05), tz = wz(W_TIP) - 0.02;
      stube(g, T.metal, 0.03, 0.05, tp.le - 0.35, tp.le + 1.90, ty, tz, 8);
      add(g, new THREE.BoxGeometry(1.8, 0.03, 0.10), T.wing, X(tp.le + 0.85), sd * (W_TIP + 0.02), tz + 0.02);
      /* underwing pylons */
      for (var p = 0; p < V.wingPylons.length; p++) {
        var py = V.wingPylons[p], w = wingAt(py), c = w.te - w.le, zz = wz(py);
        pylon(g, T, w.le + 0.18 * c, w.le + 0.18 * c + Math.min(1.9, 0.62 * c), sd * py, zz - 0.06, zz - 0.42);
      }
      /* JH-7A: the pylon under each intake trunk (A) */
      if (V.intakePylons) pylon(g, T, 7.6, 9.0, sd * 1.00, -0.30, -0.62);
    }
  }
  /* a pylon: a thin blade with a rounded nose, sway braces at the foot */
  function pylon(g, T, s0, s1, y, zTop, zBot) {
    var L = s1 - s0, zc = (zTop + zBot) / 2, h = zTop - zBot;
    g.add(new THREE_.Mesh(loft(THREE_, [
      S(s0, zc + 0.02, zc - 0.02, 0.01, zc, 1, y), S(s0 + 0.12, zTop, zBot + 0.05, 0.05, zc, 0.8, y),
      S(s0 + L * 0.5, zTop, zBot, 0.06, zc, 0.8, y), S(s1 - 0.10, zTop, zBot + 0.08, 0.05, zc, 0.8, y),
      S(s1, zTop, zTop - h * 0.3, 0.01, zc, 1, y)], 10), T.wing));
    add(g, new THREE_.BoxGeometry(0.08, 0.22, 0.04), T.metal, X(s0 + L * 0.35), y, zBot + 0.01);
    add(g, new THREE_.BoxGeometry(0.08, 0.22, 0.04), T.metal, X(s0 + L * 0.70), y, zBot + 0.01);
  }

  /* ----------------------------------------------- fin and tailplanes ---- */
  function addTail(THREE, g, T) {
    var fs = [];
    for (var i = 0; i < FIN.length; i++) {
      var z = FIN[i][0], le = FIN[i][1], te = FIN[i][2];
      fs.push({ s: z, le: X(le), te: X(te), t: Math.max(0.05, (te - le) * 0.05), h: 0 });
    }
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: X(FS1), x1: X(FS0), s0: FZ0, s1: FZ1 } }), T.fin));
    var WB = { x0: X(WS1), x1: X(WS0), s0: 0, s1: WSP };
    var ts = [];
    for (i = 0; i < TAIL.length; i++) {
      var y = TAIL[i][0], l2 = TAIL[i][1], t2 = TAIL[i][2];
      ts.push({ s: y, le: X(l2), te: X(t2), t: (t2 - l2) * 0.05, h: T_Z - (y - TAIL[0][0]) * T_ANH });
    }
    g.add(new THREE.Mesh(surf(THREE, ts, { box: WB }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: WB, mirror: true }), T.wing));
    /* the pivot fairings where the slabs meet the fuselage sides */
    for (var sd = -1; sd <= 1; sd += 2)
      g.add(new THREE.Mesh(loft(THREE, [
        O(17.0, 0.02, T_Z, sd * 0.95), O(17.4, 0.12, T_Z, sd * 0.97), O(19.0, 0.13, T_Z, sd * 0.97),
        O(19.6, 0.03, T_Z, sd * 0.95)], 10, true), T.body));
  }

  /* --------------------------------------------------------------- gear --
     Long legs (A): twin nose wheels at s 4.2; twin side-by-side main
     wheels at s 13.6 on a 2.7 m track, the legs out of the trunk bottoms,
     the big doors hanging inboard of them. Tyres touch GROUND. */
  function addGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NS = 4.2, nr = 0.30, nz = GROUND + nr;
    rod(gr, T.metal, 0.07, [X(NS - 0.10), 0, -0.55], [X(NS), 0, nz + 0.12], 8);
    rod(gr, T.metal, 0.035, [X(NS - 0.90), 0, -0.55], [X(NS - 0.02), 0, nz + 0.55], 6);
    rod(gr, T.metal, 0.04, [X(NS), -0.24, nz], [X(NS), 0.24, nz], 6);
    for (var w = -1; w <= 1; w += 2) {
      add(gr, new THREE.CylinderGeometry(nr, nr, 0.18, 18), T.ink, X(NS), w * 0.17, nz);
      add(gr, new THREE.CylinderGeometry(0.15, 0.15, 0.19, 12), T.metal, X(NS), w * 0.17, nz);
    }
    /* the landing light on the leg (M, A) */
    add(gr, new THREE.SphereGeometry(0.08, 10, 8), T.glass, X(NS + 0.12), 0, nz + 0.75);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(1.40, 0.025, 0.42)), T.body, X(NS - 0.30), d * 0.30, -0.78);
      nd.rotation.x = d * 0.20;
    }
    var MS = 13.6, mr = 0.45, mz = GROUND + mr, LY = 1.35;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.085, [X(MS + 0.55), s * 1.10, -0.50], [X(MS), s * LY, mz + 0.10], 8);
      rod(gr, T.metal, 0.045, [X(MS - 1.20), s * 0.95, -0.52], [X(MS + 0.20), s * LY, mz + 0.95], 6);
      rod(gr, T.metal, 0.05, [X(MS), s * (LY - 0.25), mz], [X(MS), s * (LY + 0.25), mz], 6);
      for (w = -1; w <= 1; w += 2) {
        add(gr, new THREE.CylinderGeometry(mr, mr, 0.24, 20), T.ink, X(MS), s * LY + w * 0.17, mz);
        add(gr, new THREE.CylinderGeometry(0.22, 0.22, 0.25, 12), T.metal, X(MS), s * LY + w * 0.17, mz);
      }
      /* the big main door hanging under the trunk (A), and the leg door */
      add(gr, pinUV(new THREE.BoxGeometry(1.70, 0.03, 0.95)), T.body, X(MS - 1.15), s * 0.78, -0.98);
      add(gr, pinUV(new THREE.BoxGeometry(0.80, 0.03, 0.80)), T.body, X(MS + 0.20), s * (LY + 0.17), -0.85);
    }
  }

  /* --------------------------------------------------------- team flash --
     Exactly C.team: a chordwise band over each upper wing just inboard of
     the tip, 1.6 cm proud of the skin. */
  function addTeam(THREE, g, T) {
    var WB = { x0: X(WS1), x1: X(WS0), s0: 0, s1: WSP };
    var band = wingStations(5.55, 5.95, 0.016);
    band = [band[0], band[band.length - 1]];
    band.forEach(function (b) { b.le += 0.03; b.te -= 0.02; });
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB }), T.team));
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB, mirror: true }), T.team));
  }

  /* ---------------------------------------------------- YJ-91 (Kh-31P) --
     Published: 4.7 m long, 0.36 m across, 0.914 m wing span. The Kh-31P
     layout: a pointed seeker radome, four ramjet intake ducts in an X
     round the rear half of the body, four small cruciform wings at mid
     length and four tail fins behind the ducts. Carried on the inner wing
     pylons (NOT CONFIRMED: which pylons). */
  function addYJ91(THREE, g, T, V) {
    var py = V.wingPylons[0];
    for (var sd = -1; sd <= 1; sd += 2) {
      var w = wingAt(py), c = w.te - w.le;
      var s0 = w.le + 0.18 * c - 0.90, y = sd * py, zc = wz(py) - 0.42 - 0.20;
      var r = 0.18;
      /* the long dark seeker radome, about a quarter of the length (K) */
      g.add(new THREE.Mesh(loft(THREE, [
        O(s0, 0.01, zc, y), O(s0 + 0.20, 0.06, zc, y), O(s0 + 0.55, 0.12, zc, y), O(s0 + 0.90, 0.16, zc, y),
        O(s0 + 1.15, r, zc, y)], 16), T.radome));
      g.add(new THREE.Mesh(loft(THREE, [
        O(s0 + 1.15, r, zc, y), O(s0 + 4.55, r, zc, y), O(s0 + 4.70, r - 0.05, zc, y),
        O(s0 + 4.71, 0.01, zc, y)], 16), T.store));
      /* the four ramjet intake ducts, at 45 deg round the body */
      for (var k = 0; k < 4; k++) {
        var a = (45 + 90 * k) * D2R, oy = Math.cos(a) * (r + 0.07), oz = Math.sin(a) * (r + 0.07);
        g.add(new THREE.Mesh(loft(THREE, [
          O(s0 + 2.10, 0.075, zc + oz, y + oy), O(s0 + 2.20, 0.085, zc + oz, y + oy),
          O(s0 + 4.15, 0.08, zc + oz * 0.92, y + oy * 0.92), O(s0 + 4.45, 0.02, zc + oz * 0.72, y + oy * 0.72)], 10), T.store));
        /* the pointed cone over each duct mouth (K) */
        stube(g, T.store, 0.005, 0.075, s0 + 1.85, s0 + 2.10, y + oy, zc + oz, 10);
        /* mid wings (in the X between the ducts: + positions) and tail fins */
        var b = (90 * k) * D2R, ny = Math.cos(b), nz = Math.sin(b);
        fin4(g, T, s0 + 1.55, s0 + 2.15, s0 + 1.95, s0 + 2.15, 0.457, y, zc, ny, nz, r);
        fin4(g, T, s0 + 4.25, s0 + 4.66, s0 + 4.50, s0 + 4.68, 0.40, y, zc, ny, nz, r);
      }
    }
  }
  /* a thin trapezoidal fin from the body radius r out to span R along
     the direction (ny, nz): root LE/TE s0/s1, tip LE/TE t0/t1 */
  function fin4(g, T, s0, s1, t0, t1, R, y, zc, ny, nz, r) {
    var pos = [], q = [[s0, r], [s1, r], [t1, R], [t0, R]];
    for (var i = 0; i < 4; i++) pos.push(X(q[i][0]), y + ny * q[i][1], zc + nz * q[i][1]);
    var geo = new THREE_.BufferGeometry();
    geo.setAttribute("position", new THREE_.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE_.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    geo.computeVertexNormals();
    g.add(new THREE_.Mesh(geo, T.store));
  }

  /* --------------------------------------------------------------- merge -- */
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
    function emit(bucket, into) {
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
    var out = new THREE.Group();
    emit(main, out);
    var gr = new THREE.Group();
    gr.name = "gear";
    emit(gear, gr);
    out.add(gr);
    return out;
  }

  return {
    build: build,
    jh7: function (THREE, M, C) { return build(THREE, M, C, "jh7"); },
    jh7a: function (THREE, M, C) { return build(THREE, M, C, "jh7a"); },
    sead: function (THREE, M, C) { return build(THREE, M, C, "sead"); },
  };
})();

/* len: the measured X extent, probe tip (s -1.29) to the chute fairing /
   rudder (s 21.06): 22.35 m against the published 22.32 */
UNIT_MODELS["pla_e90_cas"] = { len: 22.35, build: HeroJh7.jh7 };
UNIT_MODELS["pla_e00_cas"] = { len: 22.35, build: HeroJh7.jh7a };
UNIT_MODELS["pla_e00_sead"] = { len: 22.35, build: HeroJh7.sead };
