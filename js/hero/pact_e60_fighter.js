/* ========== pact_e60_fighter -- the MiG-21bis "Fishbed" (HERO MODEL) ==========

   Redrawn 2026-10-24 from a scale three-view and photographs. Every primary
   shape below is a station table measured off the drawing, not a generic
   delta tuned by eye.

   WHICH FISHBED. The row (eras.js) is "MiG-21F-13 / MiG-21bis Fishbed",
   armed (generations.js w_e60_pact_fighter) with a 23 mm GSh-23 and two to
   four R-3S / R-60 missiles. The F-13 carried an NR-30 and two R-3S on two
   pylons and could not take an R-60; the GSh-23, four pylons and the R-60
   belong to the late airframes, and the row names the bis. So this is the
   MiG-21bis (1972) and nothing earlier: the big dorsal spine, the fixed
   windscreen with the starboard-hinged hood, the broad fin with the brake
   chute at its foot, four pylons, the ventral GSh-23L. The old file drew the
   same late spine, so the key does not change type.

   REFERENCES (Wikimedia Commons, fetched at 960 px)
     D  "MiG-21bisD HRZ 3 view.jpg" -- side, plan and head-on of the bis
        airframe (the bisD is a bis with Western avionics; the shape is the
        bis). Plan scale: span 419 px = 7.154 m, so 0.01707 m/px; on that
        scale the side view measures 15.80 m probe to fin tip against the
        published 15.76 m. Head-on view drawn at 0.01499 m/px (span 477 px).
     L  "Mikoyan-Gurevich MiG-21 3-view line drawing.png" -- a late Fishbed
        three-view: the spine running into the fin, four pylons.
     A  "Mikoyan MiG-21bis Fishbed-L N 48 blue (10041307004).jpg" and
     B  "48 Blue Mikoyan Mig-21bis Russian Air Force (7985683801).jpg" and
     C  "MiG-21bis at Central Air Force Museum Monino pic1.JPG": a Soviet bis
        at Monino, starboard side and front three-quarter -- light grey
        overall, dark green shock cone, green dielectric fin cap, red star.
     G  "Mikoyan-Gurevich MiG-21 75021148, Monino - muzei VVS RP1435.jpg":
        a second Monino Fishbed, port side -- the same grey, green fin cap.
     P  "MiG-21 bis MLP 02.jpg", "MiG-21 bis MLP 04.jpg" (Polish bis 9204):
        the upper wing with the wheel-well blister, the cone running into
        the duct, the lip ring, the boom; natural metal (Polish finish,
        used for shape only).
     R  "Back of a MiG-21.JPG": the afterburner nozzle and its petal ring.

   RECOGNITION LIST (each must show at game zoom)
     1. Tailed delta: 57 deg leading edge, straight unswept trailing edge,
        clipped 0.58 m tip chord, 2 deg anhedral (D plan and head-on) -- WING.
     2. Round nose intake with the shock cone: a straight cone of about
        15 deg half angle, 1.0 m proud of the lip and 0.53 m across where it
        enters it, running on into the duct (D side, P) -- CONE, LIP.
     3. The bis dorsal spine: from the hood back the top line holds at
        1.13-1.16 m and runs straight into the fin; no dip behind the
        cockpit (D side, A, G) -- SPINE.
     4. The bis canopy: a fixed windscreen and a low hood hinged to
        starboard, faired into the spine, the periscope on top (D side, A).
     5. The broad fin: 65 deg leading edge, 2.0 m tip chord, trailing edge
        raked forward to the brake-chute housing at its foot; green
        dielectric cap (D side, A, G) -- FIN, CHUTE.
     6. Ventral fin under the rear fuselage, its lower edge rising aft
        (D side, A) -- VENT.
     7. All-moving stabilators on the fuselage axis, swept 53 deg, with the
        anti-flutter rods at the tips (D plan and head-on).
     8. Four underwing pylons at 2.02 and 2.63 m (D head-on and plan), R-3S
        inboard and R-60 outboard -- the row's own weapons.
     9. Pitot boom over the nose, 0.22 m to starboard, 1.0 m past the cone
        tip (D side and plan, A).
    10. Wheel-well blisters on the upper wing roots (P) and two low fences
        per wing at 1.97 and 2.94 m (D head-on).
    11. Paint: Soviet light grey, dark green cone, green fin cap, red star
        with a white edge on both faces of the fin (A, B, G). Heat-stained
        rear fuselage and nozzle ring (R).

   MEASUREMENTS (drawing D against published figures)
     span 7.154 m (published 7.154; model 7.154); length with probe 15.80 m
     (published 15.76; model X extent 15.81); cone tip to nozzle 13.33 m;
     fuselage width 1.15 m (D plan and head-on); main track 2.81 m (D
     head-on; published 2.787); wheelbase 4.61 m (D side); height on the
     wheels 3.92 m to the fin top (D side; published 4.125 m -- the drawing
     stands the aeroplane lower, and the drawing is followed); wing area of
     this planform 23.9 m2 (published 23.0 incl. the body).

   CORRECTED FROM THE OLD FILE
     - its shock cone stood on a flat base 0.15 m proud of the lip filling
       93% of the bore. D and P show a straight cone running into the duct,
       0.53 m across at a 0.85 m lip: about 62%.
     - its fuselage ran 14.4 m from cone tip to jetpipe; D gives 13.33 m,
       with the fin tip overhanging the nozzle by 1.46 m (the old fin did
       not reach past the nozzle at all).
     - its fin root chord was 4.85 m with a 1.64 m tip; D: 3.9 m at the
       spine, 2.0 m at the tip, the trailing edge raked, not upright.
     - the stabilators sat "well below the wing line" at z -0.22; D head-on
       puts them 0.07 m ABOVE the wing root, on the fuselage axis.
     - it fitted a nosewheel mudguard; neither D nor any photograph here
       shows one on the bis, so there is none.
     - its blue-grey mottle came from a parametric paint table; no
       photograph here shows it. Monino's Soviet bis is light grey.
     Kept: the 57 deg delta, 7.154 m span, 2 deg anhedral, the starboard
     pitot a metre past the cone, the GSh-23 pack, four pylons.
     NOT CONFIRMED: no colour photograph of a Soviet bis in squadron service
     in the 1970s was found; the grey is Monino's (A, B, G). The gun pack's
     exact station is drawn from the general arrangement, not a drawing.

   Model space: +X nose, +Y left (port), +Z up, metres; the shock-cone axis
   is z 0 and the ground z -1.46. The gear RETRACTS (nose leg forward, mains
   into the wing roots and fuselage), so its group is "gear". Merged to one
   mesh per material.
   ============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMiG21 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;

  /* ---------------------------------------------------------- paint ------
     Sampled off A (sunlit side #cfd8d4 / #d6e1d4, cone #375b33..#608961,
     fin cap #8fa367) and taken to about 0.8 of their level; the ACES pass
     lifts mid tones. lt: field; bl: belly; cone: the dielectric shock
     cone; cap: the fin-tip dielectric. */
  var PAL = { lt: "#a8b0ab", bl: "#b3bab7", dk: "#8d9590", cone: "#34532f",
              cap: "#6f8158", hot: "#4a4a46" };
  var SKIN_R = 0.84, SKIN_M = 0.10;

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
  function star(g, cx, cy, r) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * r * k, y = cy + Math.sin(a) * q * r * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dad6"; path(1.16); g.fill();
    g.fillStyle = "#a8241c"; path(1.0); g.fill();
  }
  /* panel seams, rivet rows and hatches, light enough to read as a painted
     airframe rather than a quilt */
  function seams(g, W, H, R, n) {
    var i, x = 0;
    g.strokeStyle = "rgba(22,24,24,0.30)"; g.lineWidth = 1.3;
    while (x < W) { x += 28 + R() * 52; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(255,255,255,0.10)"; x = 3;
    while (x < W) { x += 28 + R() * 52; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = "rgba(22,24,24,0.18)"; g.lineWidth = 1;
    for (i = 0; i < n; i++) {
      var px = R() * W, py = R() * H, L = 30 + R() * 120;
      g.beginPath();
      if (R() < 0.55) { g.moveTo(px, py); g.lineTo(px + L, py); }
      else { g.moveTo(px, py); g.lineTo(px, py + L * 0.5); }
      g.stroke();
    }
    g.strokeStyle = "rgba(22,24,24,0.34)";
    for (i = 0; i < 22; i++) g.strokeRect(R() * W, R() * H, 12 + R() * 30, 8 + R() * 18);
    g.fillStyle = "rgba(0,0,0,0.20)";
    for (i = 0; i < 34; i++) {
      var ry = R() * H, rx = R() * W * 0.85, m = 14 + ((R() * 30) | 0);
      for (var k = 0; k < m; k++) g.fillRect(rx + k * 6.5, ry, 1.5, 1.5);
    }
  }

  /* ============================================================ textures ==
     The fuselage loft runs nose first from the lip (x 5.86) to x -5.40, so
     u = (5.86 - x) / 11.26; v = 0 on the port side, 0.25 on top, 0.5 on
     starboard, 0.75 on the belly. After flipY the top lands at canvas row
     0.75H and the belly at 0.25H. */
  var BODY_X0 = 5.86, BODY_L = 11.26;
  function bu(x) { return (BODY_X0 - x) / BODY_L; }
  var _bd = null;
  function bodySheet(THREE) {
    if (_bd !== null) return _bd;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(21071);
      g.fillStyle = PAL.lt; g.fillRect(0, 0, W, H);
      /* a faint second tone: repainted panels on a museum and squadron
         airframe alike (A, G show it) */
      g.fillStyle = PAL.dk;
      for (var i = 0; i < 16; i++) {
        g.globalAlpha = 0.16 + R() * 0.10;
        g.fillRect(R() * W, R() * H, 30 + R() * 90, 14 + R() * 40);
      }
      g.globalAlpha = 1;
      var b = g.createLinearGradient(0, H * 0.05, 0, H * 0.45);
      b.addColorStop(0.0, "rgba(0,0,0,0)"); b.addColorStop(0.3, PAL.bl);
      b.addColorStop(0.7, PAL.bl); b.addColorStop(1.0, "rgba(0,0,0,0)");
      g.globalAlpha = 0.85; g.fillStyle = b; g.fillRect(0, H * 0.05, W, H * 0.40); g.globalAlpha = 1;
      seams(g, W, H, R, 60);
      /* the production breaks: cockpit section, the wing-root frame and the
         detachable tail at frame 28, ahead of the stabilators */
      g.strokeStyle = "rgba(20,22,22,0.55)"; g.lineWidth = 2.2;
      [bu(4.00), bu(2.25), bu(-0.10), bu(-2.60), bu(-4.30)].forEach(function (u) {
        g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke();
      });
      /* the auxiliary intake doors low on each side below the cockpit */
      g.fillStyle = "rgba(16,18,18,0.55)";
      g.fillRect(bu(3.30) * W, H * 0.90, (bu(2.85) - bu(3.30)) * W, H * 0.05);
      g.fillRect(bu(3.30) * W, H * 0.55, (bu(2.85) - bu(3.30)) * W, H * 0.05);
      /* the two forward airbrakes either side of the belly and the rear one
         on the centreline ahead of the ventral fin */
      g.strokeStyle = "rgba(16,18,18,0.60)"; g.lineWidth = 2.4;
      g.strokeRect(bu(1.55) * W, H * 0.13, (bu(0.75) - bu(1.55)) * W, H * 0.07);
      g.strokeRect(bu(1.55) * W, H * 0.30, (bu(0.75) - bu(1.55)) * W, H * 0.07);
      g.strokeRect(bu(-1.90) * W, H * 0.21, (bu(-2.70) - bu(-1.90)) * W, H * 0.08);
      /* oil and soot streaks off the belly panels */
      for (i = 0; i < 40; i++) {
        g.fillStyle = "rgba(40,38,34," + (0.05 + R() * 0.08).toFixed(3) + ")";
        g.fillRect(R() * W, H * (0.12 + R() * 0.28), 30 + R() * 90, 2 + R() * 4);
      }
      /* engine-bay heat and soot over the last fifth (u -> 1 is aft) */
      var s = g.createLinearGradient(W * 0.80, 0, W, 0);
      s.addColorStop(0, "rgba(40,36,32,0)"); s.addColorStop(1, "rgba(40,36,32,0.40)");
      g.fillStyle = s; g.fillRect(W * 0.80, 0, W * 0.20, H);
      _bd = texOf(THREE, cv);
    } catch (e) { _bd = null; }
    return _bd;
  }

  /* wings, stabilators and fences: planform UVs (u along x over WBOX, v
     across |y|), so the hinge lines land where D puts them. */
  var WX0 = -3.45, WX1 = 2.95, WS1 = 3.65;
  var _wg = null;
  function wingSheet(THREE) {
    if (_wg !== null) return _wg;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(7307);
      function U(x) { return (x - WX0) / (WX1 - WX0) * W; }
      function V(y) { return (1 - y / WS1) * H; }
      g.fillStyle = PAL.lt; g.fillRect(0, 0, W, H);
      g.fillStyle = PAL.dk;
      for (var i = 0; i < 10; i++) {
        g.globalAlpha = 0.14 + R() * 0.10;
        g.fillRect(R() * W, R() * H, 40 + R() * 120, 20 + R() * 50);
      }
      g.globalAlpha = 1;
      seams(g, W, H, R, 40);
      /* flap (inboard) and aileron (outboard) hinge lines, the gap between */
      g.strokeStyle = "rgba(16,18,18,0.62)"; g.lineWidth = 2.6;
      g.beginPath(); g.moveTo(U(-2.45), V(0.62)); g.lineTo(U(-2.45), V(1.86)); g.stroke();
      g.beginPath(); g.moveTo(U(-2.45), V(1.86)); g.lineTo(U(-3.29), V(1.86)); g.stroke();
      g.beginPath(); g.moveTo(U(-2.80), V(1.92)); g.lineTo(U(-2.80), V(3.40)); g.stroke();
      g.beginPath(); g.moveTo(U(-2.80), V(3.40)); g.lineTo(U(-3.29), V(3.40)); g.stroke();
      g.beginPath(); g.moveTo(U(-2.80), V(1.92)); g.lineTo(U(-3.29), V(1.92)); g.stroke();
      /* main spar and the integral tank panels between the ribs */
      g.strokeStyle = "rgba(16,18,18,0.30)"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(U(-1.70), V(0.6)); g.lineTo(U(-2.55), V(3.4)); g.stroke();
      g.beginPath(); g.moveTo(U(0.90), V(0.6)); g.lineTo(U(-2.30), V(3.2)); g.stroke();
      for (var r = 0; r < 5; r++) {
        var y = 0.9 + r * 0.5;
        g.strokeRect(U(-1.0 - r * 0.35), V(y + 0.22), U(0.0) - U(0.70), V(y) - V(y + 0.22));
      }
      _wg = texOf(THREE, cv);
    } catch (e) { _wg = null; }
    return _wg;
  }

  /* fin: planform UVs in (x, z); the green dielectric cap over the top
     leading corner and the red star on both faces (A, G) */
  var FX0 = -8.00, FX1 = -2.20, FZ0 = 0.60, FZ1 = 2.60;
  var _fn = null;
  function finSheet(THREE) {
    if (_fn !== null) return _fn;
    try {
      var W = 512, H = 256, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(4431);
      function U(x) { return (x - FX0) / (FX1 - FX0) * W; }
      function V(z) { return (1 - (z - FZ0) / (FZ1 - FZ0)) * H; }
      g.fillStyle = PAL.lt; g.fillRect(0, 0, W, H);
      seams(g, W, H, R, 10);
      /* the rudder, its hinge parallel to the raked trailing edge */
      g.strokeStyle = "rgba(16,18,18,0.60)"; g.lineWidth = 2.2;
      g.beginPath(); g.moveTo(U(-7.25), V(2.18)); g.lineTo(U(-6.05), V(0.92)); g.stroke();
      g.beginPath(); g.moveTo(U(-7.25), V(2.18)); g.lineTo(U(-7.68), V(2.18)); g.stroke();
      g.fillStyle = PAL.cap;
      g.beginPath();
      g.moveTo(U(-5.10), V(2.08)); g.lineTo(U(-5.95), V(2.50)); g.lineTo(U(-7.05), V(2.50));
      g.lineTo(U(-6.90), V(2.08)); g.closePath(); g.fill();
      star(g, U(-5.75), V(1.52), 0.30 / (FZ1 - FZ0) * H);
      _fn = texOf(THREE, cv);
    } catch (e) { _fn = null; }
    return _fn;
  }

  var _cn = null;
  function coneSheet(THREE) {
    if (_cn !== null) return _cn;
    try {
      var W = 64, H = 64, cv = canvas(W, H), g = cv.getContext("2d");
      g.fillStyle = PAL.cone; g.fillRect(0, 0, W, H);
      /* the tip is weathered paler where the paint wears (A, P) */
      g.fillStyle = "rgba(160,170,150,0.22)"; g.fillRect(0, 0, W * 0.12, H);
      _cn = texOf(THREE, cv);
    } catch (e) { _cn = null; }
    return _cn;
  }

  /* ============================================================ materials */
  function materials(THREE, C) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    var cone = sk(coneSheet(THREE), PAL.cone);
    cone.roughness = 0.62;
    return {
      body: sk(bodySheet(THREE), PAL.lt),
      wing: sk(wingSheet(THREE), PAL.lt),
      fin: sk(finSheet(THREE), PAL.lt),
      cone: cone,
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x5a6064, roughness: 0.50, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({
        color: 0x262624, roughness: 0.58, metalness: 0.50, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({
        color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.84, side: THREE.DoubleSide }),
    };
  }

  /* ================================================================ loft ==
     Superellipse sections {x, w, h, zc, sq, yc}, nose first (winds the skin
     outward), u along the loft, v round the section. */
  function loftR(THREE, secs, segs) {
    var pos = [], uv = [], idx = [];
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i], e = s.sq || 1;
      for (var j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t);
        var y = (s.yc || 0) + s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        var dz = s.h * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        pos.push(s.x, y, (s.zc || 0) + dz);
        uv.push(x1 === x0 ? 0 : (s.x - x0) / (x1 - x0), j / segs);
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
  /* a round section helper: top and bottom z, half width */
  function tb(x, top, bot, w, sq) {
    return { x: x, w: w, h: (top - bot) * 0.5, zc: (top + bot) * 0.5, sq: sq || 1 };
  }

  /* ===================================================== lifting surfaces ==
     surf(): an aerofoil lofted spanwise through stations {s, le, te, t, h}
     (s the span coordinate, h the chord plane's offset, t the thickness,
     pad an optional skin added all round, for a band laid over a surface).
     The section is a thin rounded-nose profile, thickest at 43% chord. UVs
     are planform, fitted to the box given. vert: span along +Z (the plane
     is turned +90 deg about X, which keeps the winding). mirror: Y -> -Y.
     Winding is fixed so normals point out whichever way the span runs. */
  function surf(THREE, sts, opt) {
    var K = 9, pos = [], uv = [], idx = [], ring = 2 * K;
    var box = opt.box;
    for (var i = 0; i < sts.length; i++) {
      var st = sts[i];
      for (var k = 0; k < ring; k++) {
        var up = k <= K, kk = up ? k : 2 * K - k;
        var xc = (1 - Math.cos(PI * kk / K)) * 0.5;
        var f = Math.pow(xc, 0.75) * (1 - xc) / 0.3027;
        var ht = (Math.max(0.003, st.t * 0.5 * f) + (st.pad || 0)) * (up ? 1 : -1);
        if (k === 0 || k === K) ht = 0;
        var X = st.le - xc * (st.le - st.te);
        var S = st.s, Z = st.h + ht;
        uv.push((X - box.x0) / (box.x1 - box.x0), (Math.abs(S) - box.s0) / (box.s1 - box.s0));
        if (opt.vert) pos.push(X, -Z, S); else pos.push(X, S, Z);
      }
    }
    /* the ring repeats nothing: k = 0 is the LE, k = K the TE */
    var flip = (sts[sts.length - 1].s < sts[0].s) !== !!opt.mirror;
    function tri(a, b, c) { if (flip) idx.push(a, c, b); else idx.push(a, b, c); }
    for (i = 0; i < sts.length - 1; i++)
      for (k = 0; k < ring; k++) {
        var a = i * ring + k, b = i * ring + (k + 1) % ring;
        var c = a + ring, d = b + ring;
        tri(a, c, b); tri(b, c, d);
      }
    /* tip cap: a fan from the tip section's centre */
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
     Measured off D: x = (465 - px) * 0.01707, z = (515 - py) * 0.01707,
     half widths from the plan (874.5 - py) * 0.01707.

     BODY -- the round tube from the intake lip to the start of the hot
     tail section at x -5.40. Top line under the canopy and spine is the
     tube's own top; the spine and canopy are separate tables. */
  var BODY = [
    tb( 5.86, 0.485, -0.415, 0.452),
    tb( 5.50, 0.530, -0.440, 0.505),
    tb( 5.00, 0.585, -0.455, 0.540),
    tb( 4.50, 0.630, -0.470, 0.552),
    tb( 3.90, 0.700, -0.480, 0.568),
    tb( 3.20, 0.735, -0.485, 0.580),
    tb( 2.30, 0.700, -0.490, 0.590),
    tb( 1.50, 0.670, -0.500, 0.592),
    tb( 0.00, 0.645, -0.510, 0.590),
    tb(-1.50, 0.625, -0.525, 0.586),
    tb(-2.70, 0.600, -0.550, 0.578),
    tb(-3.60, 0.575, -0.540, 0.562),
    tb(-4.40, 0.550, -0.520, 0.548),
    tb(-5.40, 0.500, -0.480, 0.505),
  ];
  /* the heat-stained detachable tail round the afterburner (D, R) */
  var HOT = [
    tb(-5.40, 0.500, -0.480, 0.505),
    tb(-6.00, 0.468, -0.452, 0.472),
    tb(-6.43, 0.448, -0.432, 0.448),
  ];
  /* SPINE -- the bis saddle tank: top 1.15 from the hood back, 1.13 at
     x -0.94, 1.06 at the fin root (x -2.80), then down the fin's foot to
     the chute housing at 0.81. Its sides sink into the tube at z 0.35. */
  var SPINE = [
    tb( 2.55, 1.000, 0.40, 0.200, 0.80),
    tb( 2.30, 1.140, 0.36, 0.315, 0.78),
    tb( 1.90, 1.160, 0.35, 0.335, 0.78),
    tb( 1.10, 1.162, 0.35, 0.345, 0.78),
    tb( 0.20, 1.150, 0.35, 0.345, 0.78),
    tb(-0.94, 1.130, 0.35, 0.335, 0.78),
    tb(-1.70, 1.110, 0.35, 0.318, 0.80),
    tb(-2.40, 1.080, 0.35, 0.292, 0.82),
    tb(-2.90, 1.040, 0.35, 0.262, 0.84),
    tb(-3.80, 0.975, 0.35, 0.215, 0.86),
    tb(-4.80, 0.905, 0.36, 0.178, 0.88),
    tb(-5.50, 0.850, 0.38, 0.150, 0.90),
    tb(-6.05, 0.800, 0.42, 0.120, 0.92),
    tb(-6.15, 0.760, 0.48, 0.060, 0.95),
  ];
  /* CANOPY -- windscreen base x 3.90 (z 0.71), its top frame at 3.38
     (1.05), hood top 1.13-1.15 back to x 2.28 (D side); 0.66 m wide
     (D head-on). */
  var CANOPY = [
    tb( 3.95, 0.700, 0.62, 0.240, 0.90),
    tb( 3.70, 0.840, 0.60, 0.296, 0.86),
    tb( 3.40, 1.040, 0.60, 0.328, 0.84),
    tb( 3.10, 1.120, 0.60, 0.334, 0.84),
    tb( 2.80, 1.148, 0.60, 0.334, 0.84),
    tb( 2.50, 1.152, 0.60, 0.330, 0.84),
    tb( 2.26, 1.150, 0.60, 0.322, 0.84),
  ];
  /* CONE -- tip x 6.88 on the axis; 0.53 m across at the lip (x 5.88),
     on into the duct to its widest, 0.60 m, then closed (D side, P). */
  var CONE_Z = 0.035;
  var CONE = [
    { x: 6.88, w: 0.006, h: 0.006, zc: CONE_Z },
    { x: 6.72, w: 0.042, h: 0.042, zc: CONE_Z },
    { x: 6.45, w: 0.108, h: 0.108, zc: CONE_Z },
    { x: 6.40, w: 0.118, h: 0.118, zc: CONE_Z },
    { x: 6.12, w: 0.190, h: 0.190, zc: CONE_Z },
    { x: 5.88, w: 0.262, h: 0.262, zc: CONE_Z },
    { x: 5.55, w: 0.292, h: 0.292, zc: CONE_Z },
    { x: 5.20, w: 0.298, h: 0.298, zc: CONE_Z },
    { x: 5.00, w: 0.200, h: 0.200, zc: CONE_Z },
    { x: 4.95, w: 0.010, h: 0.010, zc: CONE_Z },
  ];

  /* WING -- LE 2.80 - 1.54 y (57 deg), TE -3.29 straight, tip y 3.577;
     wing plane at z 0.02 at the root, 2 deg anhedral; t/c 5% at the root
     to 4.2% at the tip (S-12 section, published). */
  var SEMI = 3.577, WZ = 0.02, TAN_ANH = Math.tan(2 * D2R);
  function leAt(y) { return 2.80 - 1.54 * y; }
  var TE = -3.29;
  function wz(y) { return WZ - Math.abs(y) * TAN_ANH; }
  function wingStations() {
    var ys = [0.0, 0.60, 1.20, 1.90, 2.60, 3.20, SEMI], o = [];
    for (var i = 0; i < ys.length; i++) {
      var y = ys[i], c = leAt(y) - TE, tc = 0.050 - 0.008 * (y / SEMI);
      o.push({ s: y, le: leAt(y), te: TE, t: c * tc, h: wz(y) });
    }
    return o;
  }
  /* STAB -- root LE -4.44 / TE -6.45 at y 0.52, tip LE -6.19 / TE -7.51
     at y 1.85 (D plan); on the axis at z 0.10 (D side, head-on). */
  var STAB_Z = 0.10;
  function stabStations() {
    var ys = [0.25, 0.52, 1.20, 1.85], o = [];
    for (var i = 0; i < ys.length; i++) {
      var y = ys[i], le = -4.44 - 1.316 * (y - 0.52), te = -6.45 - 0.797 * (y - 0.52);
      o.push({ s: y, le: le, te: te, t: (le - te) * 0.035, h: STAB_Z });
    }
    return o;
  }
  /* FIN -- LE from (-2.80, 1.03) to (-5.89, 2.46); TE raked from
     (-6.53, 0.81) to (-7.90, 2.46) (D side). */
  function finStations() {
    var zs = [0.72, 1.03, 1.60, 2.10, 2.46], o = [];
    for (var i = 0; i < zs.length; i++) {
      var z = zs[i], le = -2.80 - 2.161 * (z - 1.03), te = -6.53 - 0.830 * (z - 0.81);
      o.push({ s: z, le: le, te: te, t: 0.20 - 0.11 * (z - 0.72) / 1.74, h: 0 });
    }
    return o;
  }
  /* VENT -- the ventral fin: LE (-2.99, -0.51) to (-3.46, -0.94), its
     lower edge rising aft to (-5.97, -0.61), the rear edge at -6.0 (D) */
  var VENT = [
    { s: -0.42, le: -2.90, te: -6.06, t: 0.11, h: 0 },
    { s: -0.61, le: -3.10, te: -5.97, t: 0.10, h: 0 },
    { s: -0.80, le: -3.31, te: -4.52, t: 0.08, h: 0 },
    { s: -0.94, le: -3.46, te: -3.64, t: 0.04, h: 0 },
  ];

  var GROUND = -1.46;

  /* =============================================================== build */
  var THREE_ = null;
  function add(g, geo, mat, x, y, z) {
    var m = new THREE_.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    g.add(m);
    return m;
  }
  /* a thin strut between two points */
  function rod(g, mat, r, a, b, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r, r, L, seg || 6), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE_.Vector3(0, 1, 0),
      new THREE_.Vector3(dx / L, dy / L, dz / L));
    g.add(m);
    return m;
  }

  function build(THREE, M, C) {
    THREE_ = THREE;
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addBody(THREE, g, T);
    addIntake(THREE, g, T);
    addCockpit(THREE, g, T);
    addWings(THREE, g, T);
    addTail(THREE, g, T);
    addKit(THREE, g, T);
    addStores(THREE, g, T);
    addGear(THREE, g, T);
    addTeam(THREE, g, T);
    var out = mergeByMaterial(THREE, g);
    out.name = "mig21";
    return out;
  }

  /* ------------------------------------------------ fuselage and spine -- */
  function addBody(THREE, g, T) {
    g.add(new THREE.Mesh(loftR(THREE, BODY, 36), T.body));
    g.add(new THREE.Mesh(loftR(THREE, HOT, 30), T.hot));
    g.add(new THREE.Mesh(loftR(THREE, SPINE, 28), T.body));
    /* the brake-chute housing at the foot of the rudder: a 0.22 m tube from
       x -5.40 to its pointed cap at -7.03, axis z 0.70 (D side) */
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: -5.30, w: 0.06, h: 0.06, zc: 0.70 },
      { x: -5.55, w: 0.112, h: 0.112, zc: 0.70 },
      { x: -6.60, w: 0.112, h: 0.112, zc: 0.70 },
      { x: -6.85, w: 0.085, h: 0.085, zc: 0.70 },
      { x: -7.03, w: 0.012, h: 0.012, zc: 0.70 },
    ], 14), T.body));
    /* wing-root fillets ahead of the leading edge (D plan: the side grows
       from 0.59 to 0.67 between x 2.4 and 1.8) */
    for (var s = -1; s <= 1; s += 2) {
      g.add(new THREE.Mesh(loftR(THREE, [
        { x: 2.45, yc: s * 0.55, w: 0.02, h: 0.02, zc: WZ },
        { x: 2.10, yc: s * 0.57, w: 0.07, h: 0.07, zc: WZ, sq: 0.9 },
        { x: 1.60, yc: s * 0.60, w: 0.12, h: 0.10, zc: WZ, sq: 0.9 },
        { x: 0.60, yc: s * 0.60, w: 0.10, h: 0.08, zc: WZ, sq: 0.9 },
      ], 12), T.body));
    }
    /* the heat-stained jetpipe end: exit ring, the petals' shroud lip, the
       dark throat and the flame-holder ring inside (R) */
    var ring = add(g, new THREE.CylinderGeometry(0.452, 0.448, 0.10, 28, 1, true), T.metal, -6.40, 0, 0.008);
    ring.rotation.z = HALF_PI;
    var thr = add(g, new THREE.CylinderGeometry(0.420, 0.360, 0.75, 24, 1, true), T.ink, -6.06, 0, 0.008);
    thr.rotation.z = HALF_PI;
    var fh = add(g, new THREE.CylinderGeometry(0.30, 0.30, 0.03, 20), T.hot, -5.72, 0, 0.008);
    fh.rotation.z = HALF_PI;
    for (var p = 0; p < 12; p++) {
      var a = p / 12 * PI * 2;
      var sm = add(g, new THREE.BoxGeometry(0.42, 0.025, 0.02), T.ink,
        -6.20, Math.cos(a) * 0.462, 0.008 + Math.sin(a) * 0.462);
      sm.rotation.x = a;
    }
  }

  /* ----------------------------------------------------- intake and cone --
     The lip is a thin rolled ring, 0.85 m inside, 0.90 outside (D side and
     head-on); behind it a black duct; out of it the cone. */
  function addIntake(THREE, g, T) {
    /* inner face first, so both faces wind outward of the ring */
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: 5.78, w: 0.405, h: 0.405, zc: CONE_Z },
      { x: 5.885, w: 0.412, h: 0.412, zc: CONE_Z },
      { x: 5.915, w: 0.428, h: 0.428, zc: CONE_Z },
      { x: 5.885, w: 0.446, h: 0.446, zc: CONE_Z },
      { x: 5.80, w: 0.452, h: 0.452, zc: CONE_Z },
    ], 36), T.metal));
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: 5.80, w: 0.405, h: 0.405, zc: CONE_Z },
      { x: 4.60, w: 0.370, h: 0.370, zc: CONE_Z },
      { x: 4.58, w: 0.010, h: 0.010, zc: CONE_Z },
    ], 28), T.ink));
    g.add(new THREE.Mesh(loftR(THREE, CONE, 30), T.cone));
    /* the joint ring where the fixed cone tip meets the translating part */
    var jr = add(g, new THREE.CylinderGeometry(0.120, 0.120, 0.018, 20, 1, true), T.metal, 6.40, 0, CONE_Z);
    jr.rotation.z = HALF_PI;
  }

  /* ---------------------------------------------------- canopy, cockpit -- */
  function addCockpit(THREE, g, T) {
    g.add(new THREE.Mesh(loftR(THREE, CANOPY, 26), T.glass));
    /* coaming, seat and headrest seen through the glass */
    add(g, new THREE.BoxGeometry(0.30, 0.48, 0.14), T.ink, 3.55, 0, 0.74);
    add(g, new THREE.BoxGeometry(0.42, 0.40, 0.30), T.ink, 2.62, 0, 0.82);
    add(g, new THREE.BoxGeometry(0.16, 0.30, 0.22), T.ink, 2.42, 0, 0.98);
    /* frames: the windscreen arch, its two posts either side of the flat
       armoured centre panel, the hood's rear bow, and the sills */
    var arch = add(g, new THREE.TorusGeometry(0.300, 0.022, 5, 18, PI), T.metal, 3.40, 0, 0.745);
    arch.rotation.set(HALF_PI, HALF_PI, 0);
    arch.scale.set(1.09, 1.0, 1.0);
    for (var s = -1; s <= 1; s += 2) {
      rod(g, T.metal, 0.016, [3.92, s * 0.12, 0.70], [3.42, s * 0.16, 1.03]);
      add(g, new THREE.BoxGeometry(1.70, 0.035, 0.05), T.metal, 3.08, s * 0.318, 0.655);
    }
    var bow = add(g, new THREE.TorusGeometry(0.31, 0.03, 5, 18, PI), T.body, 2.30, 0, 0.84);
    bow.rotation.set(HALF_PI, HALF_PI, 0);
    bow.scale.set(1.0, 1.0, 1.0);
    /* the rear-view periscope on the hood (D side x 2.95, A) */
    add(g, new THREE.BoxGeometry(0.22, 0.10, 0.09), T.metal, 2.98, 0, 1.19);
    add(g, new THREE.BoxGeometry(0.05, 0.11, 0.08), T.ink, 3.10, 0, 1.19);
  }

  /* -------------------------------------------------------------- wings -- */
  function addWings(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    var st = wingStations();
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, mirror: true }), T.wing));
    for (var s = -1; s <= 1; s += 2) {
      /* the main-wheel blister on the upper wing root (P) */
      /* the wing is 0.28 m thick here, so the blister rides on its top */
      var by = 0.80, bz = wz(by) + 0.13;
      g.add(new THREE.Mesh(loftR(THREE, [
        { x: 0.25, yc: s * by, w: 0.03, h: 0.02, zc: bz },
        { x: -0.05, yc: s * by, w: 0.15, h: 0.07, zc: bz, sq: 0.9 },
        { x: -0.60, yc: s * by, w: 0.19, h: 0.09, zc: bz, sq: 0.9 },
        { x: -1.20, yc: s * by, w: 0.16, h: 0.07, zc: bz, sq: 0.9 },
        { x: -1.55, yc: s * by, w: 0.03, h: 0.02, zc: bz },
      ], 14), T.wing));
      /* two low fences per wing at 1.97 and 2.94 m (D head-on) */
      /* each plate rises from the chord plane to 7 cm over the skin */
      var fy = [1.97, 2.94];
      for (var f = 0; f < 2; f++) {
        var y = fy[f], x0 = leAt(y), c = x0 - TE, L = c * 0.62;
        var fh = c * (0.050 - 0.008 * y / SEMI) * 0.5 + 0.07;
        var fe = add(g, new THREE.BoxGeometry(L, 0.022, fh), T.wing,
          x0 - L * 0.5 - 0.02, s * y, wz(y) + fh * 0.5);
        fe.rotation.x = s * 2 * D2R;
      }
    }
  }

  /* ---------------------------------------------- fin, stabs, ventral ---- */
  function addTail(THREE, g, T) {
    g.add(new THREE.Mesh(surf(THREE, finStations(),
      { vert: true, box: { x0: FX0, x1: FX1, s0: FZ0, s1: FZ1 } }), T.fin));
    var VB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    g.add(new THREE.Mesh(surf(THREE, VENT, { vert: true, box: VB }), T.wing));
    var sb = { x0: -7.6, x1: -4.2, s0: 0, s1: 3.6 };
    var st = stabStations();
    g.add(new THREE.Mesh(surf(THREE, st, { box: sb }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: sb, mirror: true }), T.wing));
    for (var s = -1; s <= 1; s += 2) {
      /* anti-flutter rods ahead of the stabilator tips (D plan, head-on) */
      g.add(new THREE.Mesh(loftR(THREE, [
        { x: -5.98, yc: s * 1.82, w: 0.004, h: 0.004, zc: STAB_Z },
        { x: -6.12, yc: s * 1.82, w: 0.032, h: 0.032, zc: STAB_Z },
        { x: -6.80, yc: s * 1.82, w: 0.032, h: 0.032, zc: STAB_Z },
        { x: -6.84, yc: s * 1.82, w: 0.010, h: 0.010, zc: STAB_Z },
      ], 8), T.metal));
      /* the stabilator pivot fairing on the tail section */
      g.add(new THREE.Mesh(loftR(THREE, [
        { x: -4.30, yc: s * 0.50, w: 0.02, h: 0.02, zc: STAB_Z },
        { x: -4.70, yc: s * 0.52, w: 0.07, h: 0.08, zc: STAB_Z, sq: 0.9 },
        { x: -5.60, yc: s * 0.50, w: 0.07, h: 0.08, zc: STAB_Z, sq: 0.9 },
        { x: -6.00, yc: s * 0.47, w: 0.02, h: 0.02, zc: STAB_Z },
      ], 10), T.body));
    }
    /* fin-tip fairing and the rudder's lower hinge fairing */
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: -5.85, w: 0.010, h: 0.010, zc: 2.47 },
      { x: -6.05, w: 0.040, h: 0.030, zc: 2.47 },
      { x: -7.30, w: 0.040, h: 0.030, zc: 2.47 },
      { x: -7.88, w: 0.008, h: 0.008, zc: 2.47 },
    ], 10), T.fin));
  }

  /* ----------------------------------------------- probes, gun, antennas -- */
  function addKit(THREE, g, T) {
    /* PVD-7 pitot boom: 0.22 m to starboard over the nose, its root
       fairing on the nose top, the yaw and pitch vanes at x 7.08 (D) */
    var PY = -0.22, PZ = 0.57;
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: 5.75, yc: PY, w: 0.035, h: 0.035, zc: PZ },
      { x: 5.40, yc: PY, w: 0.075, h: 0.075, zc: PZ - 0.01, sq: 0.9 },
      { x: 4.95, yc: PY, w: 0.075, h: 0.060, zc: PZ - 0.04, sq: 0.9 },
      { x: 4.60, yc: PY, w: 0.030, h: 0.020, zc: PZ - 0.07 },
    ], 10), T.body));
    var boom = add(g, new THREE.CylinderGeometry(0.018, 0.034, 1.99, 8), T.metal, 6.695, PY, PZ);
    boom.rotation.z = -HALF_PI;
    var tip = add(g, new THREE.CylinderGeometry(0.004, 0.016, 0.22, 6), T.metal, 7.80, PY, PZ);
    tip.rotation.z = -HALF_PI;
    add(g, new THREE.BoxGeometry(0.10, 0.012, 0.20), T.metal, 7.08, PY, PZ);
    add(g, new THREE.BoxGeometry(0.10, 0.20, 0.012), T.metal, 7.00, PY, PZ);
    /* GSh-23L ventral pack: a flat gondola under the belly between the
       nose bay and the forward airbrakes, the twin muzzles at its front */
    g.add(new THREE.Mesh(loftR(THREE, [
      { x: 2.20, w: 0.08, h: 0.04, zc: -0.50 },
      { x: 1.95, w: 0.17, h: 0.09, zc: -0.53, sq: 0.8 },
      { x: 1.10, w: 0.18, h: 0.10, zc: -0.54, sq: 0.8 },
      { x: 0.55, w: 0.12, h: 0.06, zc: -0.52, sq: 0.8 },
      { x: 0.30, w: 0.03, h: 0.02, zc: -0.50 },
    ], 14), T.body));
    for (var b = -1; b <= 1; b += 2) {
      var br = add(g, new THREE.CylinderGeometry(0.022, 0.026, 0.26, 8), T.ink, 2.18, b * 0.05, -0.56);
      br.rotation.z = HALF_PI;
    }
    /* blade antenna on the spine (D side x 0.72) and one under the belly */
    var ba = add(g, new THREE.BoxGeometry(0.30, 0.02, 0.12), T.metal, 0.72, 0, 1.21);
    ba.rotation.y = -0.20;
    add(g, new THREE.BoxGeometry(0.26, 0.02, 0.12), T.metal, -0.60, 0, -0.57);
    /* rear-fuselage cooling scoops either side of the tail section */
    for (var s = -1; s <= 1; s += 2) {
      var sc = add(g, new THREE.BoxGeometry(0.42, 0.06, 0.10), T.body, -4.70, s * 0.535, 0.24);
      sc.rotation.x = s * 0.40;
    }
  }

  /* ------------------------------------------------------------- stores --
     Four pylons at 2.02 and 2.63 m (D head-on), their noses standing ahead
     of the leading edge (D plan: x -0.21 and -1.15). R-3S inboard (2.84 m,
     127 mm body, 0.53 m fins), R-60 outboard (2.09 m, 120 mm, 0.39 m). */
  function missile(THREE, g, T, cx, y, z, len, rad, span, canard) {
    var grp = new THREE.Group();
    grp.add(new THREE.Mesh(loftR(THREE, [
      { x: len * 0.50, w: rad * 0.10, h: rad * 0.10 },
      { x: len * 0.46, w: rad * 0.70, h: rad * 0.70 },
      { x: len * 0.40, w: rad, h: rad },
      { x: -len * 0.48, w: rad, h: rad },
      { x: -len * 0.50, w: rad * 0.80, h: rad * 0.80 },
    ], 10), T.body));
    var fs = span * 0.5 - rad;
    for (var k = 0; k < 4; k++) {
      var pv = new THREE.Group();
      var f = new THREE.Mesh(new THREE.BoxGeometry(len * 0.13, fs, 0.012), T.metal);
      f.position.set(-len * 0.42, rad + fs * 0.5, 0);
      pv.add(f);
      var c = new THREE.Mesh(new THREE.BoxGeometry(len * 0.06, canard, 0.012), T.metal);
      c.position.set(len * 0.33, rad + canard * 0.5, 0);
      pv.add(c);
      pv.rotation.x = k * HALF_PI + PI / 4;
      grp.add(pv);
    }
    grp.position.set(cx, y, z);
    g.add(grp);
  }
  function addStores(THREE, g, T) {
    var racks = [
      { y: 2.02, x0: -0.15, len: 1.45, m: [2.84, 0.0635, 0.53, 0.12] },
      { y: 2.63, x0: -1.10, len: 1.20, m: [2.09, 0.060, 0.39, 0.08] },
    ];
    for (var s = -1; s <= 1; s += 2)
      for (var i = 0; i < racks.length; i++) {
        var r = racks[i], y = s * r.y, zb = wz(r.y) - 0.045;
        g.add(new THREE.Mesh(loftR(THREE, [
          { x: r.x0, yc: y, w: 0.02, h: 0.05, zc: zb - 0.07 },
          { x: r.x0 - 0.20, yc: y, w: 0.06, h: 0.10, zc: zb - 0.09, sq: 0.7 },
          { x: r.x0 - r.len + 0.15, yc: y, w: 0.06, h: 0.10, zc: zb - 0.09, sq: 0.7 },
          { x: r.x0 - r.len, yc: y, w: 0.02, h: 0.04, zc: zb - 0.05 },
        ], 10), T.body));
        /* the launch rail under it */
        add(g, new THREE.BoxGeometry(r.len * 0.85, 0.05, 0.05), T.metal,
          r.x0 - r.len * 0.5, y, zb - 0.215);
        missile(THREE, g, T, r.x0 - r.len * 0.5 + 0.05, y, zb - 0.24 - r.m[1],
          r.m[0], r.m[1], r.m[2], r.m[3]);
      }
  }

  /* --------------------------------------------------------------- gear --
     Nose wheel x 3.36, r 0.25; mains x -1.25, r 0.40, track 2.81 m, the
     legs outboard of the wheels at 1.58 m with the big leg door outboard
     of them (D side and head-on). All three tyres touch z -1.46. */
  function addGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 3.36, nr = 0.25, nz = GROUND + nr;
    rod(gr, T.metal, 0.050, [3.46, 0, -0.47], [NX + 0.04, 0, nz + 0.12], 8);
    rod(gr, T.metal, 0.030, [3.80, 0, -0.50], [NX + 0.08, 0, nz + 0.36], 6);
    for (var f = -1; f <= 1; f += 2)
      add(gr, new THREE.BoxGeometry(0.10, 0.03, 0.34), T.metal, NX + 0.03, f * 0.11, nz + 0.12);
    add(gr, new THREE.CylinderGeometry(nr, nr, 0.17, 16), T.ink, NX, 0, nz);
    add(gr, new THREE.CylinderGeometry(0.11, 0.11, 0.18, 10), T.metal, NX, 0, nz);
    /* the nose-bay doors open either side (D side x 4.5-3.55, head-on) */
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, new THREE.BoxGeometry(0.95, 0.03, 0.30), T.body, 4.02, d * 0.22, -0.62);
      nd.rotation.x = d * 0.45;
    }
    var MX = -1.25, mr = 0.40, mz = GROUND + mr, MY = 1.405, LY = 1.58;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.065, [MX + 0.10, s * LY, wz(LY) - 0.04], [MX, s * LY, mz + 0.05], 8);
      rod(gr, T.metal, 0.035, [MX + 0.75, s * 1.05, wz(1.05) - 0.06], [MX + 0.05, s * LY, mz + 0.45], 6);
      rod(gr, T.metal, 0.045, [MX, s * LY, mz], [MX, s * (MY - 0.05), mz], 6);
      add(gr, new THREE.CylinderGeometry(mr, mr, 0.20, 18), T.ink, MX, s * MY, mz);
      add(gr, new THREE.CylinderGeometry(0.17, 0.17, 0.21, 12), T.metal, MX, s * MY, mz);
      /* the leg door, outboard of the leg (D side: x -0.03..-0.94, z -0.09
         ..-0.94) */
      add(gr, new THREE.BoxGeometry(0.92, 0.03, 0.80), T.body, -0.50, s * (LY + 0.08), -0.52);
      /* the fuselage-side bay door hanging below the wing root */
      var bd = add(gr, new THREE.BoxGeometry(1.10, 0.03, 0.40), T.body, -0.70, s * 0.66, -0.36);
      bd.rotation.x = s * 0.30;
    }
  }

  /* --------------------------------------------------------- team flash --
     Modest and exactly C.team: a chordwise band on each upper wing outboard
     of the fences, and a short stripe across the spine for the top view. */
  function addTeam(THREE, g, T) {
    /* the bands wrap the aerofoil, 2 cm proud of it everywhere so the depth
       buffer never has to choose between band and wing */
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 }, band = [];
    [2.98, 3.40].forEach(function (y) {
      var c = leAt(y) - TE, t = c * (0.050 - 0.008 * y / SEMI);
      band.push({ s: y, le: leAt(y) + 0.030, te: TE - 0.022, t: t, pad: 0.018, h: wz(y) });
    });
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB }), T.team));
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB, mirror: true }), T.team));
    /* and a band round the spine, its sections the spine's own grown 2.5 cm */
    var sb = [];
    [-1.35, -1.75].forEach(function (x) {
      var q = null;
      for (var i = 1; i < SPINE.length; i++) {
        var a = SPINE[i - 1], b = SPINE[i];
        if (x <= a.x && x >= b.x) {
          var k = (a.x - x) / (a.x - b.x);
          q = { x: x, w: a.w + (b.w - a.w) * k + 0.025, h: a.h + (b.h - a.h) * k + 0.025,
                zc: a.zc + (b.zc - a.zc) * k, sq: a.sq + (b.sq - a.sq) * k };
        }
      }
      sb.push(q);
    });
    g.add(new THREE.Mesh(loftR(THREE, sb, 28), T.team));
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

  return { build: build };
})();

/* len: the measured X extent, pitot tip (7.91) to fin tip (-7.90) */
UNIT_MODELS["pact_e60_fighter"] = {
  len: 15.8,
  build: function (THREE, M, C) { return HeroMiG21.build(THREE, M, C); },
};
