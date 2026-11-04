/* ============================================================================
   fr_jaguar.js  --  HERO model: SEPECAT Jaguar A (French single-seat strike)
                     fra_e60_cas "Jaguar A", fra_e80_cas "Jaguar A (AS.30L)",
                     fra_e80_sead / fra_e90_sead "Jaguar A / ARMAT".
                     One builder, VARIANTS below.
   ----------------------------------------------------------------------------
   Full-quality hero model, 2026-11-04. No Jaguar model existed in js/hero
   (the four rows borrowed the A-10 "bomber_n" and the "sead_n" stand-ins);
   this one is new, built on the kit of pla_q5.js.

   References (Wikimedia Commons, fetched at 960 px, cached in the
   scratchpad q_jaguar_ref folder):
     D  "SEPECAT Jaguar 3-view line drawing.png" (574 x 385 px). The SIDE
        and PLAN tables are read off it on a pixel grid. Its nose is the
        RAF chisel nose; everything aft of the windscreen is the common
        airframe. Side: nose tip px 227, tail px 541 = 15.52 m (the
        published 16.83 m less the 1.31 m probe) -> 0.0494 m/px;
        X = 7.72 - (px - 227) * 0.0494, Z = (300 - py) * 0.0494. Plan:
        nose tip py 32 to tailplane tip py 348 = 15.52 m (0.0491 m/px),
        wing tips px 32 to 212 = the published 8.69 m span (0.0483 m/px
        across); the plan scale agrees with the side to 0.6 %. Front
        view: the wing droops about 6 px over 88 px (3.5 deg).
     A  "Sepecat Jaguar A, France - Air Force AN1857484.jpg" - Jaguar A
        A115 (11-RH) from starboard, taxiing: the French A's long conical
        nose with its pitot boom and the small fairing under the nose
        behind the tip, the side intake, the cylindrical fairing low on
        the forward fuselage, the tall stalky gear with twin side-by-side
        main wheels, the single nose wheel on a long leg, the twin jet
        pipes under the tail cone, the drooping tailerons, the fin's dark
        tip and the bar across the fin.
     Y  "SEPECAT Jaguar A 'A91 YG' (53432215884).jpg" - Jaguar A A91 in
        the Musee de l'Air, starboard: the nose and pitot boom in close-up
        (thick conical base, long thin boom), the chin fairing, the
        canopy, NO refuelling probe on the nose side (also none on A).
     G  "Sepecat Jaguar A, France - Air Force AN1722407.jpg" - Jaguar A
        A36 from port, 3/4 front: the European camouflage (dark green and
        blue-grey disruptive upper surfaces, light grey under the nose
        and belly), the rectangular intake with rounded corners standing
        off the fuselage, the fin-tip cap and the antenna bar, the main
        gear and doors, the open perforated airbrake.
     S  "Sepecat Jaguar A, France - Air Force AN1163046.jpg" - Jaguar A
        A123 from port: the canopy hinged at the rear, the nose leg door,
        the main gear with its twin wheels; used to check D's fin height
        against the ground (fin top over jet-pipe bottom, divided by the
        height: S 0.76, D with the published 4.89 m 0.78).
     F  "French Jaguar A of EC 1-7 Provence in flight over the Adriatic
        Sea, 8 April 2003 (DF-SD-05-05511).jpg" - a late Jaguar A from
        above: the shoulder wing with its anhedral, the anhedral
        tailerons, the wraparound dark green / grey camouflage of the
        late aircraft, the long pitot boom, and the in-flight refuelling
        probe on the STARBOARD side ahead of the windscreen.
     K  "KC-135 refuels SEPECAT Jaguar at Aviano Air Base Italy.jpg" - a
        French Jaguar A refuelling: the probe beside the starboard side of
        the cockpit in the basket.
     M  "AS-37 Martel profile view drawing.svg" (960 px render) - the
        Martel airframe that ARMAT is built on: ogive nose, cylindrical
        body, cruciform delta wings with square trailing edges at about
        0.51 to 0.78 of the length, small cruciform tail fins at the
        back, a cable duct along the side.
     en.wikipedia "SEPECAT Jaguar": length 16.83 m (A and S, with the
        probe), span 8.69 m, height 4.89 m, wing area 24.18 m2; two Adour
        Mk.102; seven hardpoints (four under the wings, two over-wing,
        one centreline; the French aircraft never had the over-wing
        pair); 1200 L drop tanks on the inboard and centreline pylons;
        AS-30L and ATLIS II; the Martel (AS.37) anti-radar missile on
        French Jaguars. en.wikipedia "Martel (missile)": 4.18 m, 0.40 m
        across, 1.2 m span, 550 kg; the Jaguar carried two; on 7 January
        1987 four Jaguars took off carrying one each; ARMAT was the French
        development of the anti-radar Martel. en.wikipedia "AS-30":
        AS-30L 3.65 m, 0.34 m across, 1.0 m span; a Jaguar test-firing an
        AS-30L "with laser homing pod located on center-line pylon".

   Recognition list (each shows in the model; source in brackets):
     1. Shoulder wing swept about 49 deg at the leading edge, 3.5 deg
        anhedral, the trailing edge straight across the flaps and swept
        outboard of them; slat line along the leading edge (D, F).
     2. Slab tailerons set low on the tail cone, 10 deg anhedral (F, A, G).
     3. Rectangular side intakes with rounded corners standing off the
        fuselage behind the cockpit, the trunks merging into a broad rear
        fuselage over the two engines (D, A, G).
     4. The French A's long conical nose with a long pitot boom and the
        small rangefinder fairing under the nose behind the tip (A, Y, F),
        not the RAF's chisel nose.
     5. Twin Adour jet pipes side by side under the tail cone, well ahead
        of the tailplane trailing edge; the tail cone running on above
        them (D, A, Y).
     6. Tall swept fin with a dark tip cap and an antenna bar across it
        near the top projecting ahead of the leading edge (D, A, G, S).
     7. Twin canted ventral fins under the rear fuselage (D front and
        side views).
     8. Tall, stalky landing gear: a single nose wheel on a long leg, twin
        side-by-side main wheels (A, S, G).
     9. Pylons: two a wing (inboard at 2.17 m, outboard at 3.09 m from
        the centreline, D) and one on the centreline (published; A shows a
        store on it).
    10. fra_e90_sead only: the fixed in-flight refuelling probe on the
        starboard side ahead of the windscreen (F, K).

   Stores (each variant only what a reference supports):
     fra_e60_cas: none. No photograph of a Jaguar A carrying the row's
        SNEB pods was found; the pylons are drawn bare.
     fra_e80_cas: one AS-30L, see NOT CONFIRMED. The ATLIS II pod is NOT
        drawn: no picture of it was found, only the published caption
        that puts it on the centreline pylon.
     fra_e80_sead, fra_e90_sead: one ARMAT under the port inboard pylon,
        shaped off M at the published Martel dimensions.

   NOT CONFIRMED (estimated, or taken from a related airframe):
     - The nose. D draws the RAF chisel nose; the French A's conical nose
       is shaped over D's nose length from A and Y (tip about a third of
       the depth up from the belly, as both show) with the 1.31 m pitot
       boom the published lengths imply (16.83 m with, 15.52 m without).
     - Gear positions: nose wheel x 3.35, main wheels x -2.34 on a 2.40 m
       track (5.69 m wheelbase); estimated from A, S and Y, which are all
       oblique, and agreeing with the commonly quoted figures, which were
       not fetched. Tyre sizes (0.50 m nose, 0.62 m main) are estimated
       from the photographs; the leg geometry and doors are approximate.
     - The tailplane anhedral (10 deg) is read off photographs F, A and G
       (no front view shows it in D); the fin-bar's height is D's.
     - Wing area: D's planform gives about 25 m2 against the published
       24.18 m2; D is kept.
     - The fairing low on each side of the forward fuselage (A, Y) is
       taken to be the DEFA 553 gun fairing; its muzzle is drawn as a dark
       ring at its front. Not confirmed from a reference that names it.
     - The ventral fins' cant (35 deg) is read off D's small front view.
     - Camouflage: G and F show the colours; the blob pattern itself is
       stylised, not copied from any airframe. The light underside is G's
       (fra_e60_cas, fra_e80_*); the wraparound is F's (fra_e90_sead).
       When the wraparound scheme came in was not found.
     - The refuelling probe: shown in F (2003) and K, absent in A and Y;
       drawn on fra_e90_sead only. Its length and angle are estimated
       from F's oblique view.
     - The missile stations: the port inboard pylon is assumed (the
       pylon that carries the 1200 L tank, the only one sized for a
       520-550 kg store); no photograph of a Jaguar with ARMAT or AS-30L
       was found. Missile paint (light grey) is assumed.
     - The AS-30L shape: no drawing could be fetched (Commons refused
       with HTTP 429); it is drawn as a plain ogive-nosed cylinder at the
       published 3.65 m x 0.34 m with cruciform rear wings of the
       published 1.0 m span.
     Not drawn: national markings, codes and unit badges (forbidden), the
     ATLIS II pod, the SNEB pods, drop tanks, the open airbrakes.

   Paint: G's blue-grey sampled ~(144,153,167) and dark green ~(62,72,63),
   F's olive-green ~(72,66,51) and grey ~(123,124,129); taken a little
   lighter for the ACES pass: grey #7d8790, green #4f5644, underside
   #a9afb3.

   Materials: body, wing, fin (canvas-textured skin), team, metal, hot,
   ink, glass, store; the gear group adds its own (ink, metal, body).
   Nodes: "gear" (landing gear; the engine hides it in flight).
   Model space: +X nose, +Y port, +Z up, metres; z = 0 is D's datum (the
   windscreen base), the wheels on z = -1.78 (fin top 3.11: 4.89 m).
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJaguar = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;

  var PAL = { grey: "#7d8790", green: "#4f5644", under: "#a9afb3", soot: "rgba(34,32,28," };
  var SKIN_R = 0.80, SKIN_M = 0.10;

  /* wrap: wraparound camouflage (F) instead of G's light underside;
     probe: the starboard refuelling probe (F, K); store: what hangs on
     the port inboard pylon. */
  var VARIANTS = {
    a73:    { wrap: false, probe: false, store: null },
    as30l:  { wrap: false, probe: false, store: "as30l" },
    armat:  { wrap: false, probe: false, store: "armat" },
    armat9: { wrap: true,  probe: true,  store: "armat" },
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
  /* the two-tone disruptive pattern: a grey field with large soft-edged
     green blobs (stylised: G and F show the colours, not a pattern to
     copy). Blobs wrap across the canvas edges so seams do not show. */
  function camo(g, x0, y0, W, H, R, n, sc) {
    g.fillStyle = PAL.grey; g.fillRect(x0, y0, W, H);
    g.fillStyle = PAL.green;
    for (var i = 0; i < n; i++) {
      var cx = x0 + R() * W, cy = y0 + R() * H, rx = (50 + R() * 90) * sc, ry = (26 + R() * 50) * sc;
      g.beginPath();
      for (var k = 0; k <= 14; k++) {
        var a = k / 14 * PI * 2, w = 0.75 + R() * 0.4;
        var px = cx + Math.cos(a) * rx * w, py = cy + Math.sin(a) * ry * w;
        if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
      }
      g.closePath(); g.fill();
    }
  }
  function seams(g, x0, y0, W, H, R, n) {
    var i;
    g.strokeStyle = "rgba(18,20,18,0.22)"; g.lineWidth = 1.2;
    for (i = 0; i < n; i++) {
      var px = x0 + R() * W, py = y0 + R() * H, L = 30 + R() * 110;
      g.beginPath();
      if (R() < 0.6) { g.moveTo(px, py); g.lineTo(Math.min(x0 + W, px + L), py); }
      else { g.moveTo(px, py); g.lineTo(px, Math.min(y0 + H, py + L * 0.5)); }
      g.stroke();
    }
    g.strokeStyle = "rgba(18,20,18,0.26)";
    for (i = 0; i < 14; i++) g.strokeRect(x0 + R() * W * 0.95, y0 + R() * H * 0.95, 10 + R() * 26, 8 + R() * 14);
  }

  /* ============================================================ textures ==
     Fuselage: u = (7.72 - x) / 15.6 nose first; v = 0 port, 0.25 top, 0.5
     starboard, 0.75 belly. After flipY: port at canvas row H (and 0), top
     0.75H, starboard 0.5H, belly 0.25H. */
  var BODY_X0 = 7.72, BODY_L = 15.6;
  function bu(x) { return (BODY_X0 - x) / BODY_L; }
  var _bd = {};
  function bodySheet(THREE, wrap) {
    var key = wrap ? "w" : "u";
    if (_bd[key] !== undefined) return _bd[key];
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(7311);
      camo(g, 0, 0, W, H, R, 26, 1.0);
      if (!wrap) {
        /* G: light grey belly and lower sides, a soft wavy demarcation a
           little below the mid-side; the whole nose cone grey (G, A). */
        g.fillStyle = PAL.under;
        g.beginPath(); g.moveTo(0, H * 0.06);
        for (var x = 0; x <= W; x += 32) g.lineTo(x, H * (0.07 + 0.02 * Math.sin(x * 0.03)));
        for (x = W; x >= 0; x -= 32) g.lineTo(x, H * (0.43 - 0.02 * Math.sin(x * 0.027)));
        g.closePath(); g.fill();
      }
      g.fillStyle = PAL.grey; g.fillRect(0, 0, bu(5.9) * W, H);
      seams(g, 0, 0, W, H, R, 70);
      /* production breaks: nose cone, cockpit, intake station, the wing
         box frames, the rear-fuselage joint */
      g.strokeStyle = "rgba(16,18,16,0.46)"; g.lineWidth = 2.0;
      [bu(5.9), bu(4.6), bu(2.65), bu(1.0), bu(-1.6), bu(-3.3), bu(-5.0)].forEach(function (u) {
        g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke();
      });
      /* the two airbrakes under the belly ahead of the main gear (G shows
         them open), drawn closed: v 0.25 is the belly */
      g.strokeStyle = "rgba(12,14,12,0.62)"; g.lineWidth = 2.4;
      g.strokeRect(bu(-1.05) * W, H * 0.17, (bu(-2.0) - bu(-1.05)) * W, H * 0.06);
      g.strokeRect(bu(-1.05) * W, H * 0.27, (bu(-2.0) - bu(-1.05)) * W, H * 0.06);
      /* engine-bay panels on the rear flanks */
      g.strokeStyle = "rgba(16,18,16,0.40)"; g.lineWidth = 1.8;
      g.strokeRect(bu(-2.1) * W, H * 0.40, (bu(-4.3) - bu(-2.1)) * W, H * 0.08);
      g.strokeRect(bu(-2.1) * W, H * 0.52, (bu(-4.3) - bu(-2.1)) * W, H * 0.08);
      g.strokeRect(bu(-2.1) * W, H * 0.90, (bu(-4.3) - bu(-2.1)) * W, H * 0.08);
      g.strokeRect(bu(-2.1) * W, H * 0.02, (bu(-4.3) - bu(-2.1)) * W, H * 0.08);
      /* heat staining over the last metre before the pipes, and under
         the tail cone */
      var s = g.createLinearGradient(bu(-4.0) * W, 0, bu(-5.1) * W, 0);
      s.addColorStop(0, PAL.soot + "0)"); s.addColorStop(1, PAL.soot + "0.40)");
      g.fillStyle = s; g.fillRect(bu(-4.0) * W, 0, (bu(-5.1) - bu(-4.0)) * W, H * 0.5);
      /* a clean spot for small parts (pinUV) */
      g.fillStyle = wrap ? PAL.green : PAL.under; g.fillRect(W * 0.975, H * 0.94, W * 0.025, H * 0.06);
      _bd[key] = texOf(THREE, cv);
    } catch (e) { _bd[key] = null; }
    return _bd[key];
  }

  /* wings and tailerons: planform UVs, u along x over [WX0, WX1]; the
     upper surface in the top half of the sheet (v 0.5-1), the lower in
     the bottom half, so the underside can be painted apart (G). */
  var WX0 = -8.0, WX1 = 1.8, WS1 = 4.40;
  var _wg = {};
  function wingSheet(THREE, wrap) {
    var key = wrap ? "w" : "u";
    if (_wg[key] !== undefined) return _wg[key];
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(6127);
      /* canvas rows: v = 1 at row 0. Upper surface v 0.5..1 -> rows 0..H/2 */
      function U(x) { return (x - WX0) / (WX1 - WX0) * W; }
      function VU(y) { return (1 - (0.5 + 0.5 * y / WS1)) * H; }
      function VL(y) { return (1 - 0.5 * y / WS1) * H; }
      camo(g, 0, 0, W, H / 2, R, 16, 0.9);
      if (wrap) camo(g, 0, H / 2, W, H / 2, R, 16, 0.9);
      else { g.fillStyle = PAL.under; g.fillRect(0, H / 2, W, H / 2); }
      seams(g, 0, 0, W, H, R, 40);
      [VU, VL].forEach(function (V) {
        /* flaps inboard (y 0.95 to 2.22) and the outer trailing edge (y
           2.22 to 4.2), hinge lines a fifth of the chord ahead; the slat
           line along the leading edge (D) */
        g.strokeStyle = "rgba(14,16,14,0.55)"; g.lineWidth = 2.4;
        g.beginPath(); g.moveTo(U(-2.55), V(0.95)); g.lineTo(U(-2.55), V(2.22)); g.lineTo(U(-3.04), V(4.10)); g.stroke();
        g.beginPath(); g.moveTo(U(-2.55), V(2.22)); g.lineTo(U(-3.18), V(2.22)); g.stroke();
        g.strokeStyle = "rgba(14,16,14,0.35)"; g.lineWidth = 1.6;
        g.beginPath(); g.moveTo(U(0.62), V(1.30)); g.lineTo(U(-2.62), V(4.10)); g.stroke();
        /* tailerons (the same sheet; their x range lies aft of the wing):
           a spar line */
        g.beginPath(); g.moveTo(U(-6.0), V(0.6)); g.lineTo(U(-7.35), V(2.1)); g.stroke();
      });
      _wg[key] = texOf(THREE, cv);
    } catch (e) { _wg[key] = null; }
    return _wg[key];
  }

  /* fin: u along x over [FX0, FX1], v up z over [FZ0, FZ1] */
  var FX0 = -8.0, FX1 = -4.5, FZ0 = 0.6, FZ1 = 3.2;
  var _fn = {};
  function finSheet(THREE, wrap) {
    var key = wrap ? "w" : "u";
    if (_fn[key] !== undefined) return _fn[key];
    try {
      var W = 512, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(4421);
      function U(x) { return (x - FX0) / (FX1 - FX0) * W; }
      function V(z) { return (1 - (z - FZ0) / (FZ1 - FZ0)) * H; }
      camo(g, 0, 0, W, H, R, 7, 0.9);
      seams(g, 0, 0, W, H, R, 18);
      /* rudder hinge (D) and the dark tip cap (G, S, A) */
      g.strokeStyle = "rgba(14,16,14,0.58)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-6.95), V(0.95)); g.lineTo(U(-7.20), V(2.35)); g.stroke();
      g.fillStyle = "#2f3330"; g.fillRect(0, 0, W, V(2.86));
      _fn[key] = texOf(THREE, cv);
    } catch (e) { _fn[key] = null; }
    return _fn[key];
  }

  /* ============================================================ materials */
  function materials(THREE, C, wrap) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    return {
      body: sk(bodySheet(THREE, wrap), PAL.grey),
      wing: sk(wingSheet(THREE, wrap), PAL.grey),
      fin: sk(finSheet(THREE, wrap), PAL.grey),
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0xd03f3f),
        roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x666b6e, roughness: 0.50, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({
        color: 0x3b3733, roughness: 0.58, metalness: 0.50, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({
        color: 0x08090a, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x2a3a40, roughness: 0.12, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.80, side: THREE.DoubleSide }),
      store: new THREE.MeshStandardMaterial({
        color: 0xc9ccc9, roughness: 0.62, metalness: 0.12, side: THREE.DoubleSide }),
    };
  }

  /* ================================================================ loft ==
     Sections {x, w, zt, zb, zw, e, yc}: half width w at height zw, the top
     at zt and the bottom at zb, each half a superellipse of exponent e.
     Nose first; u along the loft, v round the section from port. */
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
  /* small parts in the body paint take one clean spot of the sheet */
  function pinUV(geo) {
    var u = geo.attributes.uv;
    if (u) for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
    return geo;
  }
  function S(x, zt, zb, w, zw, e) { return { x: x, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }
  function O(x, r, zc, yc) { return { x: x, w: r, zt: zc + r, zb: zc - r, zw: zc, e: 1, yc: yc || 0 }; }
  function Y(x, yc, w, zt, zb, zw, e) { return { x: x, yc: yc, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }

  /* ===================================================== lifting surfaces ==
     An aerofoil lofted spanwise through stations {s, le, te, t, h}; thin
     rounded-nose section; planform UVs fitted to the box (split: the
     upper surface in v 0.5-1, the lower in 0-0.5). vert: span along +Z.
     mirror: Y -> -Y. Tip capped. */
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
        var X = st.le - xc * (st.le - st.te);
        var Sp = st.s, Z = st.h + ht;
        var v = (Math.abs(Sp) - box.s0) / (box.s1 - box.s0);
        if (opt.split) v = up ? 0.5 + 0.5 * v : 0.5 * v;
        uv.push((X - box.x0) / (box.x1 - box.x0), v);
        if (opt.vert) pos.push(X, -Z, Sp); else pos.push(X, Sp, Z);
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
     BODY -- side (zt, zb) off D aft of the windscreen; the French A's
     conical nose ahead of it from A and Y; half widths off D's plan.
     Ends at the jet-pipe plane (x -5.05); the tail cone above the pipes
     is a loft of its own. */
  var BODY = [
    S( 7.72, -0.505, -0.535, 0.012, -0.52),
    S( 7.60, -0.450, -0.610, 0.090, -0.53),
    S( 7.35, -0.380, -0.690, 0.190, -0.54),
    S( 7.00, -0.290, -0.760, 0.290, -0.54),
    S( 6.55, -0.180, -0.810, 0.380, -0.52),
    S( 6.05, -0.075, -0.835, 0.445, -0.48),
    S( 5.55,  0.030, -0.840, 0.480, -0.42, 0.95),
    S( 5.00,  0.200, -0.840, 0.485, -0.36, 0.92),
    S( 4.40,  0.330, -0.840, 0.490, -0.30, 0.90),
    S( 3.90,  0.400, -0.840, 0.495, -0.26, 0.88),
    S( 3.40,  0.480, -0.840, 0.530, -0.22, 0.86),
    S( 2.80,  0.600, -0.840, 0.570, -0.18, 0.85),
    S( 2.30,  0.740, -0.840, 0.600, -0.15, 0.85),
    S( 1.50,  0.820, -0.840, 0.700, -0.12, 0.85),
    S( 0.50,  0.800, -0.830, 0.820, -0.10, 0.84),
    S(-0.50,  0.790, -0.820, 0.880, -0.08, 0.84),
    S(-1.50,  0.790, -0.800, 0.910, -0.08, 0.84),
    S(-2.50,  0.800, -0.780, 0.920, -0.08, 0.84),
    S(-3.50,  0.850, -0.750, 0.900, -0.06, 0.84),
    S(-4.20,  0.900, -0.705, 0.830, -0.05, 0.85),
    S(-4.80,  0.930, -0.680, 0.760, -0.02, 0.86),
    S(-5.05,  0.920, -0.670, 0.730,  0.00, 0.86),
  ];
  /* TAIL CONE -- above and behind the pipes (D side: bottom z 0.0 to 0.05,
     top falling from the fin root to z 0.54 at the end; plan: 0.58 half
     width at the pipes to a point at -7.6) */
  var CONE = [
    S(-4.95, 0.925, -0.10, 0.62, 0.40, 0.88),
    S(-5.40, 0.900, -0.02, 0.52, 0.42, 0.90),
    S(-6.00, 0.830,  0.02, 0.40, 0.42, 0.92),
    S(-6.60, 0.740,  0.04, 0.28, 0.40, 0.94),
    S(-7.10, 0.640,  0.05, 0.19, 0.36),
    S(-7.50, 0.560,  0.06, 0.12, 0.32),
    S(-7.62, 0.500,  0.10, 0.07, 0.30),
  ];
  /* the twin Adour pipes at the body's end (D: exit x -5.05, centre z
     -0.32, 0.72 m across) */
  var PIPE_X = -5.05, PIPE_Y = 0.37, PIPE_Z = -0.32, PIPE_R = 0.35;

  /* CANOPY -- D side: windscreen base x 5.55 z 0.03 rising to the frame at
     x 4.15 (z 0.82); the hood's crown 0.94 from 3.67 to 3.07, falling into
     the spine at x 2.35. 0.70 m across. */
  var CANOPY = [
    S( 5.55, 0.05, 0.00, 0.10, 0.02, 0.92),
    S( 5.20, 0.30, 0.02, 0.30, 0.08, 0.90),
    S( 4.70, 0.58, 0.10, 0.36, 0.20, 0.88),
    S( 4.15, 0.82, 0.20, 0.36, 0.30, 0.88),
    S( 3.67, 0.94, 0.26, 0.355, 0.36, 0.88),
    S( 3.07, 0.94, 0.32, 0.35, 0.42, 0.88),
    S( 2.68, 0.89, 0.45, 0.30, 0.52, 0.90),
    S( 2.35, 0.82, 0.62, 0.16, 0.66, 0.92),
  ];

  /* WING -- plan off D: leading edge x = 1.04 - 1.165 (y - 0.92) (49 deg);
     trailing edge straight across at -3.18 to y 2.22, then swept to
     -3.80 at the tip (y 4.345, span 8.69); chord plane z 0.62 at the root
     (shoulder, D side), 3.5 deg anhedral (D front); t/c 6 %. */
  var WZ = 0.62, TAN_ANH = Math.tan(3.5 * D2R), SEMI = 4.345;
  function wle(y) { return 1.04 - 1.165 * (y - 0.92); }
  function wte(y) { return y <= 2.22 ? -3.18 : -3.18 - 0.291 * (y - 2.22); }
  function wz(y) { return WZ - Math.abs(y) * TAN_ANH; }
  var WING_Y = [0.55, 0.92, 1.40, 2.22, 2.80, 3.40, 3.90, 4.20, 4.345];
  function wingStations() {
    return WING_Y.map(function (y) {
      var le = Math.min(1.45, wle(y)), te = wte(y);
      if (y > 4.2) le -= 0.06 * (y - 4.2) / 0.145;   /* rounded tip corner */
      return { s: y, le: le, te: te, t: (le - te) * 0.06, h: wz(y) };
    });
  }
  /* TAILERONS -- plan off D: leading edge from (y 0.53, x -5.19) to the
     tip (2.22, -6.96); trailing edge from -7.26 at y 0.5 to -7.80 at the
     tip (D's most aft point). Root on the tail cone at z 0.42 (D side),
     10 deg anhedral (F, A, G). */
  var TZ = 0.42, TAN_TANH = Math.tan(10 * D2R);
  var TAIL = [[0.35, -5.00, -7.21], [0.53, -5.19, -7.27], [1.20, -5.89, -7.48],
              [1.80, -6.52, -7.67], [2.12, -6.85, -7.77], [2.22, -6.98, -7.80]];
  /* FIN -- D side: leading edge (-4.83, 0.99) to (-7.10, 3.06); the top
     flat at 3.11 to -7.75; trailing edge down to (-7.40, 0.94). The
     root is buried in the tail cone. */
  var FIN = [[0.70, -4.40, -7.38], [0.99, -4.83, -7.40], [1.60, -5.50, -7.47], [2.30, -6.27, -7.56],
             [2.80, -6.82, -7.66], [3.06, -7.10, -7.72], [3.11, -7.18, -7.75]];

  var GROUND = -1.78;     /* fin top 3.11 - published height 4.89 */

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
  /* a tube along X: r0 at the front end, r1 at the back */
  function xtube(g, mat, r0, r1, xf, xb, y, z, seg, open) {
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r1, r0, xf - xb, seg, 1, !!open), mat);
    m.rotation.z = HALF_PI;   /* local +Y -> world -X: the "top" radius is aft */
    m.position.set((xf + xb) / 2, y, z);
    g.add(m);
    return m;
  }
  /* a flat plate in the XZ plane at y, outline pts [[x, z]...], with a
     twin dy inboard for thickness; UVs pinned to a clean spot */
  function plate(g, mat, pts, y, dy) {
    var shp = new THREE_.Shape();
    shp.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) shp.lineTo(pts[i][0], pts[i][1]);
    shp.lineTo(pts[0][0], pts[0][1]);
    [0, dy].forEach(function (o) {
      var fg = new THREE_.ShapeGeometry(shp);
      fg.rotateX(HALF_PI);
      var u = fg.attributes.uv;
      for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
      add(g, fg, mat, 0, y + o, 0);
    });
  }

  function build(THREE, M, C, vk) {
    THREE_ = THREE;
    var V = VARIANTS[vk] || VARIANTS.a73;
    var T = materials(THREE, C, V.wrap);
    var g = new THREE.Group();
    addBody(THREE, g, T);
    addIntakes(THREE, g, T);
    addCockpit(THREE, g, T, V);
    addWings(THREE, g, T);
    addTail(THREE, g, T);
    addPylons(THREE, g, T);
    addStores(THREE, g, T, V);
    addGear(THREE, g, T);
    addTeam(THREE, g, T);
    var out = mergeByMaterial(THREE, g);
    out.name = "jaguar";
    return out;
  }

  /* ------------------------------- fuselage, nose, pipes, tail cone -- */
  function addBody(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, BODY, 40, true), T.body));
    g.add(new THREE.Mesh(loft(THREE, CONE, 32, true), T.body));
    /* the dark bulkhead between and round the pipes */
    var L = BODY[BODY.length - 1];
    g.add(new THREE.Mesh(loft(THREE, [L, S(-5.02, 0.30, -0.40, 0.05, -0.05)], 32), T.hot));
    /* the brake-chute cap at the end of the tail cone */
    g.add(new THREE.Mesh(loft(THREE, [CONE[CONE.length - 1], S(-7.70, 0.36, 0.24, 0.02, 0.30)], 16), T.hot));
    /* the pitot boom: a thick conical root, then the thin boom to the
       published overall length (Y, F) */
    xtube(g, T.metal, 0.012, 0.030, 9.03, 8.30, 0, -0.52, 8);
    xtube(g, T.body, 0.030, 0.062, 8.30, 7.66, 0, -0.52, 12);
    /* the rangefinder fairing under the nose behind the tip (A, Y), its
       window facing forward and down */
    g.add(new THREE.Mesh(loft(THREE, [
      S(7.32, -0.70, -0.71, 0.02, -0.705), S(7.18, -0.66, -0.79, 0.07, -0.72),
      S(6.80, -0.64, -0.86, 0.09, -0.74), S(6.45, -0.68, -0.84, 0.08, -0.75),
      S(6.20, -0.74, -0.80, 0.03, -0.77)], 14), T.body));
    add(g, new THREE.BoxGeometry(0.02, 0.10, 0.08), T.ink, 7.24, 0, -0.76).rotation.y = -0.6;
    /* the twin jet pipes: heat-darkened lip rings proud of the bulkhead,
       the dark pipe inside, the flame holder deep in each (A, Y) */
    for (var s = -1; s <= 1; s += 2) {
      var py = s * PIPE_Y;
      g.add(new THREE.Mesh(loft(THREE, [
        O(-4.85, PIPE_R + 0.01, PIPE_Z, py), O(PIPE_X - 0.08, PIPE_R, PIPE_Z, py),
        O(PIPE_X - 0.11, PIPE_R - 0.03, PIPE_Z, py), O(PIPE_X + 0.02, PIPE_R - 0.05, PIPE_Z, py)], 24), T.hot));
      xtube(g, T.ink, PIPE_R - 0.05, PIPE_R - 0.10, PIPE_X + 0.02, -4.40, py, PIPE_Z, 22, true);
      var fh = add(g, new THREE.TorusGeometry(0.17, 0.02, 6, 18), T.hot, -4.65, py, PIPE_Z);
      fh.rotation.y = HALF_PI;
      add(g, new THREE.CylinderGeometry(0.08, 0.11, 0.22, 12), T.hot, -4.55, py, PIPE_Z).rotation.z = HALF_PI;
    }
    /* the twin ventral fins under the rear fuselage, canted out 35 deg
       (D side: x -3.65 to -4.64, 0.25 m below the belly; D front) */
    for (s = -1; s <= 1; s += 2) {
      var vf = new THREE.Group();
      vf.position.set(0, s * 0.32, -0.70);
      vf.rotation.x = s * 35 * D2R;
      g.add(vf);
      var ks = [{ s: 0.02, le: -3.55, te: -4.70, t: 0.05, h: 0 }, { s: -0.42, le: -4.10, te: -4.62, t: 0.03, h: 0 }];
      var kg = surf(THREE, ks, { vert: true, box: { x0: FX0, x1: FX1, s0: 0, s1: 3 } });
      pinUV(kg);
      vf.add(new THREE.Mesh(kg, T.body));
    }
    /* the fairing low on each side of the forward fuselage (A, Y), taken
       to be the gun fairing, a dark muzzle ring at its front */
    for (s = -1; s <= 1; s += 2) {
      g.add(new THREE.Mesh(loft(THREE, [
        O(4.45, 0.04, -0.70, s * 0.43), O(4.30, 0.09, -0.70, s * 0.44), O(3.90, 0.10, -0.70, s * 0.45),
        O(2.40, 0.10, -0.70, s * 0.47), O(2.00, 0.03, -0.70, s * 0.47)], 12, true), T.body));
      xtube(g, T.ink, 0.035, 0.035, 4.47, 4.30, s * 0.43, -0.70, 10);
    }
  }

  /* ------------------------------------------------ intakes, trunks --
     D: the lip at x 2.65, outer face 1.03 from the centreline; G and A:
     rectangular with rounded corners, 0.72 m tall (z 0.56 to -0.16),
     standing off the fuselage on a splitter. The trunk fairs aft into the
     broad rear fuselage over the wing root. */
  var INTAKE = [
    Y( 2.65, 0.800, 0.230, 0.560, -0.160, 0.20, 0.62),
    Y( 2.30, 0.790, 0.250, 0.600, -0.240, 0.18, 0.66),
    Y( 1.40, 0.740, 0.280, 0.680, -0.420, 0.14, 0.72),
    Y( 0.40, 0.640, 0.320, 0.700, -0.580, 0.08, 0.78),
    Y(-0.80, 0.500, 0.400, 0.680, -0.680, 0.02, 0.82),
  ];
  function addIntakes(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var sec = INTAKE.map(function (q) { var c = {}; for (var k in q) c[k] = q[k]; c.yc = s * q.yc; return c; });
      g.add(new THREE.Mesh(loft(THREE, sec, 28, true), T.body));
      var a = sec[0];
      /* the lip, rolled in, and the dark duct behind it */
      g.add(new THREE.Mesh(loft(THREE, [
        Y(2.59, a.yc, a.w - 0.035, a.zt - 0.035, a.zb + 0.035, a.zw, a.e),
        Y(2.68, a.yc, a.w - 0.012, a.zt - 0.012, a.zb + 0.012, a.zw, a.e),
        Y(2.65, a.yc, a.w, a.zt, a.zb, a.zw, a.e)], 28, true), T.body));
      g.add(new THREE.Mesh(loft(THREE, [
        Y(2.59, a.yc, a.w - 0.035, a.zt - 0.035, a.zb + 0.035, a.zw, a.e),
        Y(2.10, s * 0.74, 0.17, 0.48, -0.12, 0.18, 0.66),
        Y(1.80, s * 0.70, 0.01, 0.20, 0.16, 0.18)], 24), T.ink));
      /* the splitter plate between the inner lip and the fuselage side */
      plate(g, T.body, [[2.82, 0.56], [2.82, -0.16], [2.20, -0.24], [2.20, 0.62]], s * 0.565, -s * 0.015);
    }
  }

  /* ---------------------------------------------- canopy, cockpit, probe -- */
  function addCockpit(THREE, g, T, V) {
    g.add(new THREE.Mesh(loft(THREE, CANOPY, 28), T.glass));
    /* coaming, sight head, seat and headrest through the glass */
    add(g, new THREE.BoxGeometry(0.40, 0.56, 0.12), T.ink, 4.55, 0, 0.26);
    add(g, new THREE.BoxGeometry(0.10, 0.12, 0.14), T.metal, 4.48, 0, 0.38);
    add(g, new THREE.BoxGeometry(0.45, 0.46, 0.34), T.ink, 3.20, 0, 0.40);
    add(g, new THREE.BoxGeometry(0.16, 0.32, 0.30), T.ink, 2.95, 0, 0.66);
    /* windscreen frame (the arch at x 4.15 and its posts) and the sills;
       the hood's rear frame (it hinges at the back, S) */
    var arch = add(g, new THREE.TorusGeometry(0.33, 0.022, 5, 20, PI), T.metal, 4.15, 0, 0.42);
    arch.rotation.set(HALF_PI, HALF_PI, 0);
    arch.scale.set(1.08, 1.21, 1.0);
    for (var s = -1; s <= 1; s += 2) {
      rod(g, T.metal, 0.016, [5.50, s * 0.10, 0.05], [4.16, s * 0.34, 0.42]);
      add(g, new THREE.BoxGeometry(2.0, 0.035, 0.05), T.metal, 3.40, s * 0.36, 0.30);
    }
    var rs = add(g, new THREE.TorusGeometry(0.28, 0.018, 4, 16, PI), T.metal, 2.62, 0, 0.55);
    rs.rotation.set(HALF_PI, HALF_PI, 0);
    rs.scale.set(1.1, 1.25, 1.0);
    /* the starboard refuelling probe ahead of the windscreen (F, K) */
    if (V.probe) {
      rod(g, T.metal, 0.045, [4.80, -0.47, 0.05], [5.20, -0.52, 0.14], 10);
      rod(g, T.metal, 0.035, [5.20, -0.52, 0.14], [6.15, -0.56, 0.24], 10);
      xtube(g, T.ink, 0.05, 0.035, 6.28, 6.12, -0.56, 0.245, 10);
    }
  }

  /* -------------------------------------------------------------- wings -- */
  function addWings(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    var st = wingStations();
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, split: true }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, split: true, mirror: true }), T.wing));
  }

  /* --------------------------------------------------- fin, tailerons -- */
  function addTail(THREE, g, T) {
    var fs = [];
    for (var i = 0; i < FIN.length; i++) {
      var z = FIN[i][0], le = FIN[i][1], te = FIN[i][2];
      fs.push({ s: z, le: le, te: te, t: Math.max(0.04, (le - te) * 0.06), h: 0 });
    }
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: FX0, x1: FX1, s0: 2 * FZ0 - FZ1, s1: FZ1 } }), T.fin));
    /* the antenna bar across the fin near the top, its nose ahead of the
       leading edge (D, A, G, S) */
    g.add(new THREE.Mesh(loft(THREE, [
      O(-6.05, 0.01, 2.48), O(-6.18, 0.050, 2.48), O(-6.50, 0.060, 2.48), O(-7.60, 0.055, 2.48),
      O(-7.72, 0.010, 2.48)], 10), T.fin));
    var ts = [];
    for (i = 0; i < TAIL.length; i++) {
      var y = TAIL[i][0], l2 = TAIL[i][1], t2 = TAIL[i][2];
      ts.push({ s: y, le: l2, te: t2, t: (l2 - t2) * 0.05, h: TZ - (y - 0.35) * TAN_TANH });
    }
    var TB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 };
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, split: true }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, split: true, mirror: true }), T.wing));
  }

  /* -------------------------------------------------------------- pylons --
     D plan: inboard at y 2.17 (x -0.28 to -2.35), outboard at y 3.09 (x
     -1.17 to -2.74); the centreline pylon (published) under the belly. */
  var PYL_IN = { y: 2.17, x0: -0.28, x1: -2.35 }, PYL_OUT = { y: 3.09, x0: -1.17, x1: -2.74 };
  function addPylons(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      [PYL_IN, PYL_OUT].forEach(function (p) {
        var h = wz(p.y) - 0.03;
        plate(g, T.wing, [[p.x0, h], [p.x0 - 0.30, h - 0.32], [p.x1 + 0.12, h - 0.32], [p.x1, h]], s * p.y + s * 0.04, -s * 0.08);
        add(g, new THREE.BoxGeometry((p.x0 - p.x1) * 0.7, 0.06, 0.03), T.metal, (p.x0 + p.x1) / 2 - 0.1, s * p.y, h - 0.33);
      });
    }
    add(g, pinUV(new THREE.BoxGeometry(2.0, 0.10, 0.20)), T.body, -0.55, 0, -0.92);
    add(g, new THREE.BoxGeometry(1.4, 0.05, 0.04), T.metal, -0.55, 0, -1.03);
  }

  /* -------------------------------------------------------------- stores --
     ARMAT: the Martel airframe off M at the published 4.18 m x 0.40 m,
     1.2 m span: ogive nose 0.22 of the length, cruciform deltas from 0.51
     to 0.78 of the length (square trailing edge), small cruciform tail
     fins 0.79-0.86, a cable duct along the side. AS-30L: the published
     3.65 m x 0.34 m, 1.0 m span (shape not confirmed, see header). Both
     hang from the port inboard pylon, fins in the X position. */
  function missile(THREE, g, T, kind) {
    var L = kind === "armat" ? 4.18 : 3.65, R = kind === "armat" ? 0.20 : 0.17;
    var span = kind === "armat" ? 1.2 : 1.0;
    var p = PYL_IN, h = wz(p.y) - 0.35 - R - 0.01;
    var xn = (p.x0 + p.x1) / 2 + L * 0.48;          /* the nose */
    var mg = new THREE.Group();
    mg.position.set(xn, p.y, h);
    g.add(mg);
    function X(f) { return -f * L; }
    var nose = kind === "armat" ? 0.22 : 0.18, secs = [], i;
    for (i = 0; i <= 8; i++) {
      var f = i / 8, r = R * Math.sqrt(1 - Math.pow(1 - f, 2));
      secs.push(O(X(f * nose), Math.max(0.006, r), 0));
    }
    secs.push(O(X(0.94), R, 0), O(X(0.99), R * 0.88, 0), O(X(1.0), R * 0.70, 0));
    mg.add(new THREE.Mesh(loft(THREE, secs, 18), T.store));
    if (kind === "armat") {
      /* seeker window and the rear nozzle */
      xtube(mg, T.ink, R * 0.70, R * 0.55, X(1.0) + 0.02, X(1.0) - 0.03, 0, 0, 14);
      /* cable duct along the port side */
      xtube(mg, T.store, 0.035, 0.035, X(0.24), X(0.90), R * 0.98, 0, 8);
    } else {
      add(mg, new THREE.SphereGeometry(0.05, 10, 8), T.ink, 0.0, 0, 0);
      xtube(mg, T.ink, R * 0.70, R * 0.55, X(1.0) + 0.02, X(1.0) - 0.03, 0, 0, 14);
    }
    var w0 = kind === "armat" ? 0.51 : 0.62, w1 = kind === "armat" ? 0.78 : 0.90;
    var wt = span / 2 - R;
    for (var k = 0; k < 4; k++) {
      var a = (45 + 90 * k) * D2R, cy = Math.cos(a), cz = Math.sin(a);
      var fin = [[X(w0), 0], [X(w1), wt], [X(w1), 0]];
      var fins = [fin];
      if (kind === "armat") fins.push([[X(0.79), 0], [X(0.82), 0.20], [X(0.86), 0.20], [X(0.86), 0]]);
      fins.forEach(function (pts) {
        var shp = new THREE_.Shape();
        shp.moveTo(pts[0][0], pts[0][1] + R * 0.9);
        for (var q = 1; q < pts.length; q++) shp.lineTo(pts[q][0], pts[q][1] + R * 0.9);
        shp.closePath();
        var fg = new THREE_.ShapeGeometry(shp);
        var m = new THREE_.Mesh(fg, T.store);
        m.rotation.x = Math.atan2(cz, cy);
        mg.add(m);
      });
    }
    /* the lug pair up to the pylon */
    add(mg, new THREE.BoxGeometry(0.08, 0.06, 0.05), T.metal, X(0.36), 0, R + 0.01);
    add(mg, new THREE.BoxGeometry(0.08, 0.06, 0.05), T.metal, X(0.60), 0, R + 0.01);
  }
  function addStores(THREE, g, T, V) {
    if (V.store) missile(THREE, g, T, V.store);
  }

  /* --------------------------------------------------------------- gear --
     Nose leg: a single 0.50 m wheel at x 3.35 on a long leg (A, S, Y),
     the leg door ahead of it. Main legs: twin side-by-side 0.62 m wheels
     at x -2.34, track 2.40 m, on tall legs out of the fuselage sides with
     a trailing arm (A, G, S); the leg door outboard. Tyres on -1.78. */
  function addGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 3.35, nr = 0.25, nz = GROUND + nr;
    rod(gr, T.metal, 0.055, [3.45, 0, -0.82], [3.42, 0, nz + 0.28], 8);
    rod(gr, T.metal, 0.042, [3.42, 0, nz + 0.30], [NX, 0, nz], 8);
    rod(gr, T.metal, 0.028, [3.05, 0, -0.84], [3.42, 0, nz + 0.60], 6);
    for (var f = -1; f <= 1; f += 2) rod(gr, T.metal, 0.025, [3.42, f * 0.10, nz + 0.20], [NX, f * 0.10, nz], 6);
    add(gr, new THREE.CylinderGeometry(nr, nr, 0.17, 18), T.ink, NX, 0, nz);
    add(gr, new THREE.CylinderGeometry(0.12, 0.12, 0.18, 10), T.metal, NX, 0, nz);
    /* the nose-leg door on the leg (S) and the bay doors */
    plate(gr, T.body, [[3.70, -0.86], [3.30, -0.86], [3.28, -1.32], [3.62, -1.32]], -0.08, 0.016);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(1.10, 0.02, 0.32)), T.body, 3.85, d * 0.20, -0.98);
      nd.rotation.x = d * 0.18;
    }
    var MX = -2.34, mr = 0.31, mz = GROUND + mr, TR = 1.20;
    for (var s = -1; s <= 1; s += 2) {
      /* the oleo from the fuselage side down to the trailing arm */
      rod(gr, T.metal, 0.070, [MX + 0.55, s * 0.82, -0.62], [MX + 0.40, s * TR, mz + 0.30], 8);
      rod(gr, T.metal, 0.050, [MX + 0.40, s * TR, mz + 0.30], [MX, s * TR, mz], 8);
      rod(gr, T.metal, 0.034, [MX - 0.30, s * 0.80, -0.70], [MX + 0.40, s * (TR - 0.02), mz + 0.50], 6);
      rod(gr, T.metal, 0.045, [MX, s * (TR - 0.24), mz], [MX, s * (TR + 0.24), mz], 6);
      [TR - 0.15, TR + 0.15].forEach(function (wy) {
        add(gr, new THREE.CylinderGeometry(mr, mr, 0.19, 20), T.ink, MX, s * wy, mz);
        add(gr, new THREE.CylinderGeometry(0.16, 0.16, 0.20, 12), T.metal, MX, s * wy, mz);
      });
      /* the leg door outboard of the oleo (G) and the bay door hanging
         below the fuselage side */
      plate(gr, T.body, [[MX + 0.95, -0.70], [MX + 0.25, -0.72], [MX + 0.15, -1.15], [MX + 0.65, -1.15]], s * (TR - 0.30), -s * 0.02);
      var bd = add(gr, pinUV(new THREE.BoxGeometry(1.50, 0.02, 0.42)), T.body, MX + 0.30, s * 0.66, -0.98);
      bd.rotation.x = s * 0.35;
    }
  }

  /* --------------------------------------------------------- team flash --
     Modest and exactly C.team: a chordwise band over each upper wing
     outboard of the outer pylon, 2 cm proud of the skin. */
  function addTeam(THREE, g, T) {
    var WB = { x0: WX0, x1: WX1, s0: 0, s1: WS1 }, band = [];
    [3.55, 3.85].forEach(function (y) {
      var le = wle(y), te = wte(y);
      band.push({ s: y, le: le + 0.03, te: te - 0.02, t: (le - te) * 0.06, pad: 0.016, h: wz(y) });
    });
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB }), T.team));
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB, mirror: true }), T.team));
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
    a73: function (THREE, M, C) { return build(THREE, M, C, "a73"); },
    as30l: function (THREE, M, C) { return build(THREE, M, C, "as30l"); },
    armat: function (THREE, M, C) { return build(THREE, M, C, "armat"); },
    armat9: function (THREE, M, C) { return build(THREE, M, C, "armat9"); },
  };
})();

/* len: the measured X extent, pitot tip (9.03) to the taileron tips
   (-7.80): 16.83 m, the published length with the probe */
UNIT_MODELS["fra_e60_cas"] = { len: 16.83, build: HeroJaguar.a73 };
UNIT_MODELS["fra_e80_cas"] = { len: 16.83, build: HeroJaguar.as30l };
UNIT_MODELS["fra_e80_sead"] = { len: 16.83, build: HeroJaguar.armat };
UNIT_MODELS["fra_e90_sead"] = { len: 16.83, build: HeroJaguar.armat9 };
