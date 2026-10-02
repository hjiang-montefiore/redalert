/* ============ pact_e90_fighter -- MiG-29S Fulcrum-C (HERO MODEL) ============

   Hand-built style and period anchor for the e90 Pact air roster. Everything
   here is measured off photographs rather than scaled off a generic fighter:

     mig29_a.jpg     side, gear down, chute out (Polish 105)
     mig29_c.jpg     three-quarter from above (Slovak 6728) -- LERX and fins
     mig29_riat.jpg  underside planform -- tunnels, intakes, stabilators
     mig29_b.jpg     side silhouette in flight, pair

   The three shapes that make a Fulcrum a Fulcrum, and which every parametric
   e90 Pact airframe should be tuned against:

     1. LEADING-EDGE ROOT EXTENSIONS. Not a strake -- a deeply curved ogival
        sheet that starts as a needle beside the windscreen, hugs the
        fuselage, then flares hard outboard and arrives at the wing leading
        edge exactly tangent to its 42 degree sweep. The curve is generated,
        not eyeballed: y = y0 + dy * (0.18 t + 0.82 t^2.483), and the exponent
        is solved so dy/dx at the blend equals the wing sweep. Get that wrong
        and you have an F-16 glove.

     2. WIDELY SPACED ENGINE TUNNELS. The two ducts hang well below a centre
        body whose underside is deliberately lifted, so from beneath the
        aircraft is two tubes and a recessed floor, not one fat body. The
        centre-body floor sits about half a metre above the duct bottoms;
        that gap is the whole reason the type looks the way it does.

     3. TWIN FINS ON BOOMS EITHER SIDE OF A HUMPED SPINE. The fins do not grow
        out of the fuselage; they sit on separate booms that ride the outer
        shoulder of each nacelle, and the dorsal spine stands proud between
        them. That is the head-on and three-quarter signature.

     Plus the intakes: rectangular, slung under the wing root behind a
     boundary-layer splitter slot you can see daylight through, with the
     louvred auxiliary doors on the LERX upper surface that feed the engines
     when the mains are blanked off on a dirty strip.

   Proportion check against published figures (17.32 m long, 11.36 m span,
   4.73 m high on the gear, 7.78 m tailplane span): this model measures
   17.28 / 11.36 / 4.46 / 7.90. Height runs a little short because the gear
   is drawn with more ground clearance than the real thing, which sits almost
   on its belly and reads as a bug at RTS zoom.

   Model space: +X nose, +Y left, +Z up, real metres.
   Colour: PAINT.darkgrey from js/air3d_era.js (0x4f575d), the Soviet
   grey-on-grey the type wore, with that table's own two disruptive tones.

   VARIANTS. build(THREE, M, C, which) draws this one airframe as each row
   that flies it (VARIANTS below). Called without `which` it is the hero:

     "9.13S"  pact_e90_fighter and fighter_p. Both rows are the MiG-29S
              (eras.js calls the one "the game's fighter_p exactly").
     "9.12"   pact_e80_fighter, the 1983 Fulcrum-A: a slim spine, the small
              ventral fins of the first batches, Soviet blue-grey.
     "9.12G"  deu_e90_mig29, the ex-NVA MiG-29G of JG 73: slim spine, no
              ventral fins, Luftwaffe light grey.
     "9.12K"  kpa_e00_fighter, the KPAF MiG-29: slim spine, no ventral fins,
              the bluegrey air_specs gives the row.

   The 9.13 raised the spine into a hump about 0.2 m over the fuselage roof
   between the fins (SPINE below); the 9.12 keeps a third of that rise
   (slimSpine). The ventral fins under the tunnels were deleted when the fin
   chord was extended in the mid-1980s, before the 9.13 was built, so only
   the early 9.12 has them. The hero carried them too until the 9.13SE
   photograph below showed them gone. Everything else is shared.

   Photographs for the variants (Wikimedia Commons):
     Luftwaffe MiG-29G 29+03, Gatow museum, Andre Gerwing Collection
       IDs 012003 / 012005 / 012007 / 021818: port side from aft and nose
       three-quarter. Nothing hangs under the nozzles, so the late 9.12 has
       no ventral fins; light grey overall; an R-27 on the inboard pylon.
     Polish 105 (MiG-29A, ILA Berlin 2016): the 9.12 from above, in a bank.
     Bangladesh Air Force MiG-29SE 36507, side on at take-off ("36507
       Mikoyan-Gurevich MiG-29SE Fulcrum-C Bangladesh Air Force 2960536507
       VGHS.jpg"): the 9.13 hump, and nothing under the nozzles.
     A KPAF MiG-29 photographed from a P-3 Orion in 2003 ("DPRK MiG-29",
       409 px wide): a low spine running straight back from the canopy to
       the fins, so the row is a 9.12, and eras.js gives it the 1983 N019
       (radarGen e80) too. Thin evidence. The aircraft is backlit against a
       bright sky, so the still says nothing about its paint.

   The whole airframe is baked into one mesh per material before it is
   returned (mergeByMaterial): 180 draw calls became 10.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var MiG29Hero = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var HALF_PI = Math.PI / 2;

  /* --- paint, taken from the PAINT table at the top of js/air3d_era.js --- */
  var BASE = 0x4f575d;            /* PAINT.darkgrey.c                        */
  var TONE_A = "#3f464b";         /* its SCHEME.darkgrey tones               */
  var TONE_B = "#616a70";
  var SKIN_R = 0.87, SKIN_M = 0.06;

  /* The other rows wear other entries of the same table: bluegrey, the
     Soviet blue-grey of the 1980s (air_specs gives it to both the e80 and
     the KPAF row), and seagrey, its light grey, here the Luftwaffe's. This
     sheet's soot, seams and belly dirt cost a light paint about a sixth of
     its brightness against a twelfth on the dark grey, so those two are the
     table's colours lifted by a tenth to come out where the table puts
     them. */
  var PAL = {
    darkgrey: { id: "darkgrey", base: BASE,     a: TONE_A,    b: TONE_B },
    bluegrey: { id: "bluegrey", base: 0x8799aa, a: "#75899c", b: "#a2b4c4" },
    seagrey:  { id: "seagrey",  base: 0xabb5bb, a: "#9aa4ab", b: "#bec7cd" },
  };

  /* ---------------------------------------------------------------- rng -- */
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  /* ============================================================== texture ==
     One sheet serves the whole airframe. On a lofted body the UVs run u=0 at
     the TAIL to u=1 at the NOSE, with v=0.25 along the spine and v=0.75 along
     the belly -- so exhaust soot belongs at low u, and once the texture's
     flipY has had its say the belly lands at canvas row 0.25H.              */
  var _sheets = {};
  function sheet(THREE, pal) {
    if (_sheets[pal.id] !== undefined) return _sheets[pal.id];
    try {
      var W = 1024, H = 512;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rngFor(290913);
      var i, k, x, y, n;

      /* 1. base camouflage: field grey, then the two disruptive tones as the
            soft-edged blotches the type actually wore */
      g.fillStyle = hex(pal.base); g.fillRect(0, 0, W, H);
      for (i = 0; i < 30; i++) {
        g.globalAlpha = 0.45;
        g.fillStyle = (i & 1) ? pal.a : pal.b;
        g.beginPath();
        g.ellipse(R() * W, R() * H, 50 + R() * 150, 26 + R() * 78, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;

      /* the underside is always lighter than the top: v 0.62..0.90 */
      var belly = g.createLinearGradient(0, H * 0.06, 0, H * 0.44);
      belly.addColorStop(0.00, "rgba(150,158,164,0.00)");
      belly.addColorStop(0.30, "rgba(150,158,164,0.42)");
      belly.addColorStop(0.70, "rgba(150,158,164,0.42)");
      belly.addColorStop(1.00, "rgba(150,158,164,0.00)");
      g.fillStyle = belly; g.fillRect(0, H * 0.06, W, H * 0.38);

      /* 2. panel and plate seams: a few long runs plus many short ones */
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 1.7;
      x = 0;
      while (x < W) { x += 24 + R() * 66; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      y = 0;
      while (y < H) { y += 30 + R() * 70; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      g.strokeStyle = "rgba(0,0,0,0.19)"; g.lineWidth = 1;
      for (i = 0; i < 52; i++) {
        x = R() * W; y = R() * H; n = 40 + R() * 160;
        g.beginPath();
        if (R() < 0.5) { g.moveTo(x, y); g.lineTo(x + n, y); }
        else { g.moveTo(x, y); g.lineTo(x, y + n * 0.6); }
        g.stroke();
      }

      /* 3. bolt and rivet rows following the frames */
      g.fillStyle = "rgba(0,0,0,0.24)";
      for (i = 0; i < 40; i++) {
        y = R() * H; x = R() * W * 0.75; n = 18 + ((R() * 44) | 0);
        for (k = 0; k < n; k++) g.fillRect(x + k * 7, y, 1.7, 1.7);
      }
      g.fillStyle = "rgba(255,255,255,0.07)";
      for (i = 0; i < 22; i++) {
        y = R() * H; x = R() * W * 0.75; n = 14 + ((R() * 30) | 0);
        for (k = 0; k < n; k++) g.fillRect(x + k * 9 + 1, y + 1, 1.4, 1.4);
      }

      /* access hatches and inspection panels */
      g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.3;
      for (i = 0; i < 22; i++) {
        x = R() * W; y = R() * H;
        var hw = 14 + R() * 38, hh = 10 + R() * 24;
        g.strokeRect(x, y, hw, hh);
        g.globalAlpha = 0.11; g.fillStyle = "#000"; g.fillRect(x, y, hw, hh);
        g.globalAlpha = 1;
      }

      /* 4a. weathering BEHIND THE EXHAUSTS: u near 0 is the tail */
      var soot = g.createLinearGradient(0, 0, W * 0.42, 0);
      soot.addColorStop(0, "rgba(17,15,14,0.48)");
      soot.addColorStop(1, "rgba(17,15,14,0)");
      g.fillStyle = soot; g.fillRect(0, 0, W * 0.42, H);
      g.fillStyle = "rgba(38,30,26,0.32)"; g.fillRect(0, 0, W * 0.055, H);

      /* 4b. weathering HEAVIER LOW DOWN: belly band at canvas row 0.25H */
      var dirt = g.createLinearGradient(0, H * 0.04, 0, H * 0.46);
      dirt.addColorStop(0.00, "rgba(26,23,20,0.00)");
      dirt.addColorStop(0.45, "rgba(26,23,20,0.28)");
      dirt.addColorStop(1.00, "rgba(26,23,20,0.00)");
      g.fillStyle = dirt; g.fillRect(0, H * 0.04, W, H * 0.42);
      for (i = 0; i < 54; i++) {
        var sy = H * 0.06 + R() * H * 0.36;
        g.fillStyle = "rgba(22,19,17," + (0.08 + R() * 0.16).toFixed(3) + ")";
        g.fillRect(R() * W, sy, 26 + R() * 120, 2 + R() * 5);
      }
      for (i = 0; i < 26; i++) {
        g.fillStyle = "rgba(30,26,23,0.10)";
        g.fillRect(R() * W * 0.34, R() * H, 20 + R() * 90, 3 + R() * 9);
      }

      /* 5. stencilling that reads at zoom: walkway dashes and warning bands */
      g.strokeStyle = "rgba(18,18,18,0.48)"; g.lineWidth = 3;
      g.setLineDash([9, 8]);
      g.beginPath(); g.moveTo(W * 0.24, H * 0.70); g.lineTo(W * 0.70, H * 0.70); g.stroke();
      g.beginPath(); g.moveTo(W * 0.24, H * 0.80); g.lineTo(W * 0.70, H * 0.80); g.stroke();
      g.setLineDash([]);
      g.fillStyle = "rgba(178,42,32,0.55)";
      g.fillRect(W * 0.30, H * 0.60, 54, 4);
      g.fillRect(W * 0.52, H * 0.36, 44, 4);
      g.fillStyle = "rgba(214,206,190,0.30)";
      for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 10 + R() * 22, 3);

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      _sheets[pal.id] = t;
    } catch (e) { _sheets[pal.id] = null; }
    return _sheets[pal.id];
  }

  /* ------------------------------------------------------ linear colour ---
     This build of three.js predates colour management: renderer.outputEncoding
     encodes the final frame, but a flat material colour is handed to the
     shader as if it were ALREADY linear. A CanvasTexture carries an encoding
     flag and is decoded properly, so the painted skin is right while every
     untextured part renders about three stops too light -- 0x0e1012, chosen
     as a black duct interior, measured #585d60 on screen and the intakes read
     as plates rather than holes. That is why the untextured tiers below are
     given such dark values.

     The team flash is the exception: it is exactly C.team, as on the other
     heroes, so eraPaint's team test leaves it alone. It used to go through
     an HSL boost and an sRGB-to-linear step that both read the colour as a
     number, but the game passes C.team as a "#rrggbb" string, and every
     side came out the same near-black, #0a0303.                             */

  /* ============================================================ materials ==
     Three tiers only. SKIN is the painted surface and carries the canvas
     sheet (skin for lofts, panel for extrusions, team for the flashes).
     METAL covers fittings, nozzles, gear -- plus, at roughness 0.95, the
     rubber and the flat-black duct and cockpit interiors. GLASS is the
     canopy, the HUD and the IRST ball.                                      */
  function materials(THREE, C, pal) {
    var tex = sheet(THREE, pal);

    /* SKIN on lofted bodies: cylindrical UVs already cover 0..1 */
    var skin = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
    if (tex) skin.map = tex; else skin.color.setHex(pal.base);

    /* SKIN on extruded surfaces: their UVs are raw metres, so the sheet has
       to be shrunk or a 5 m wing tiles the panel lines into corduroy */
    var panel = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
    if (tex) {
      var c = tex.clone(); c.needsUpdate = true;
      c.wrapS = c.wrapT = THREE.RepeatWrapping;
      c.repeat.set(0.074, 0.074);
      c.offset.set(0.44, 0.40);
      panel.map = c;
    } else panel.color.setHex(pal.base);

    /* team colour flash: painted surface, so it lives in the SKIN tier, and
       exactly C.team (see the note on linear colour above) */
    var team = new THREE.MeshStandardMaterial({
      color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
      roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });

    /* METAL. These hex values look far too dark to be metal and that is
       deliberate -- see the note on linear colour above. Measured off the
       render: 0x474d52 lands at about #a4a9ad, a light alloy fitting, and
       0x060708 lands at about #2b2e30, which is as near a hole as a lit
       surface gets. The first cut used honest-looking sRGB values and the
       exhausts came out as white plugs and the intakes as grey plates. */
    var metal = new THREE.MeshStandardMaterial({
      color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide });
    /* The nozzle needs to sit DARKER than the airframe. At metalness 0.44 on
       a warm base the tinted specular ran away with it and the exhausts
       rendered as light tan plugs against a grey aeroplane; dropping the
       metalness and taking the warmth out of the base leaves the burnt-steel
       reading to the bright actuator and lip rings around it. */
    var hot = new THREE.MeshStandardMaterial({
      color: 0x191a1a, roughness: 0.65, metalness: 0.36, side: THREE.DoubleSide });
    /* rubber, and the flat-black inside of a duct or a wheel well, count as
       METAL at high roughness and no metalness */
    var ink = new THREE.MeshStandardMaterial({
      color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide });
    var tyre = new THREE.MeshStandardMaterial({
      color: 0x070809, roughness: 0.95, metalness: 0.04 });

    /* GLASS. A canopy photographs DARK from outside with one hard highlight
       running along the bow; the first cut of this model used a pale blue at
       clearcoat 1 and, rendered double-sided, the two layers stacked to an
       opaque white egg. Dark tint, softer clearcoat, and the frames carry the
       shape instead. */
    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
      transparent: true, opacity: 0.83, side: THREE.DoubleSide });

    return { skin: skin, panel: panel, team: team, metal: metal, hot: hot,
             ink: ink, tyre: tyre, glass: glass };
  }

  function mirrorY(pts) {
    var o = [];
    for (var i = 0; i < pts.length; i++) o.push([pts[i][0], -pts[i][1]]);
    return o;
  }

  /* ============================================================== LERX =====
     Ogival root extension. t runs from the needle apex beside the windscreen
     to the point where it becomes the wing leading edge. The exponent is
     chosen so the tangent there is exactly the wing's 42 degree sweep.       */
  var LERX_X0 = 4.75, LERX_Y0 = 0.42;   /* apex, buried a little in the side */
  var BLEND_X = 1.60, BLEND_Y = 2.00;   /* where it becomes the wing LE      */
  var LERX_LIN = 0.18, LERX_P = 2.483;

  function lerxPoints(n) {
    var pts = [], dx = BLEND_X - LERX_X0, dy = BLEND_Y - LERX_Y0;
    for (var i = 0; i <= n; i++) {
      var t = i / n;
      var f = LERX_LIN * t + (1 - LERX_LIN) * Math.pow(t, LERX_P);
      pts.push([LERX_X0 + dx * t, LERX_Y0 + dy * f]);
    }
    return pts;
  }

  /* wing planform, from the blend outboard */
  var TIP_LE_X = -1.71, TIP_Y = 5.68, TIP_TE_X = -2.66;
  var ROOT_TE_X = -2.74;
  var WING_Z = 0.10, WING_T = 0.17, ANHEDRAL = 2.0;
  var SIN_ANH = Math.sin(ANHEDRAL * D2R);

  function glovePoints() {
    var p = lerxPoints(12);
    p.push([TIP_LE_X, TIP_Y]);
    p.push([TIP_TE_X, TIP_Y]);
    p.push([ROOT_TE_X, 2.05]);
    p.push([-2.60, 1.30]);
    p.push([-1.30, 0.98]);
    p.push([0.50, 0.82]);
    p.push([2.20, 0.66]);
    p.push([3.60, 0.50]);
    return p;
  }
  /* local chord of the wing at a spanwise station, for placing markings */
  function chordAt(y) {
    if (y <= BLEND_Y || y >= TIP_Y) return null;
    var f = (y - BLEND_Y) / (TIP_Y - BLEND_Y);
    return [BLEND_X + (TIP_LE_X - BLEND_X) * f,
            ROOT_TE_X + (TIP_TE_X - ROOT_TE_X) * f];
  }
  /* height of the wing upper and lower surface at a spanwise station */
  function wingTop(y) { return WING_Z + WING_T * 0.5 - Math.abs(y) * SIN_ANH; }
  function wingBot(y) { return WING_Z - WING_T * 0.5 - Math.abs(y) * SIN_ANH; }

  /* ============================================================ fuselage ==
     Slim drooped radome, a cockpit that barely widens, then a broad flat
     engine deck aft. sq below 1 squares the section off: the tail deck wants
     to be a slab, the radome a flattened cone.

     Note the zc/h pairing from x = 0.8 aft. The TOP line is held while the
     BOTTOM is lifted, so the centre body thins into a lifting floor and the
     two ducts are left hanging below it. That gap is cue 2 and it is the one
     thing a parametric "wide fuselage" table cannot fake.                    */
  var FUS = [
    { x: -8.30, w: 0.36, h: 0.16, zc:  0.00, sq: 0.44 },
    { x: -7.90, w: 0.45, h: 0.19, zc:  0.00, sq: 0.44 },
    { x: -6.80, w: 0.62, h: 0.26, zc:  0.02, sq: 0.46 },
    { x: -5.40, w: 0.80, h: 0.32, zc:  0.06, sq: 0.44 },
    { x: -3.80, w: 0.92, h: 0.38, zc:  0.10, sq: 0.42 },
    { x: -2.20, w: 0.97, h: 0.44, zc:  0.12, sq: 0.40 },
    { x: -0.60, w: 0.95, h: 0.50, zc:  0.14, sq: 0.42 },
    { x:  0.80, w: 0.86, h: 0.62, zc:  0.08, sq: 0.50 },
    { x:  1.90, w: 0.76, h: 0.60, zc:  0.08, sq: 0.58 },
    { x:  2.90, w: 0.63, h: 0.55, zc:  0.07, sq: 0.66 },
    { x:  3.80, w: 0.55, h: 0.49, zc:  0.04, sq: 0.70 },
    { x:  4.60, w: 0.47, h: 0.43, zc:  0.00, sq: 0.72 },
    { x:  5.50, w: 0.38, h: 0.35, zc: -0.05, sq: 0.80 },
    { x:  6.40, w: 0.26, h: 0.24, zc: -0.11, sq: 0.86 },
    { x:  7.10, w: 0.14, h: 0.13, zc: -0.17, sq: 0.92 },
    { x:  7.62, w: 0.03, h: 0.03, zc: -0.21, sq: 1.00 },
  ];

  /* the humped dorsal spine the twin fins stand either side of */
  var SPINE = [
    { x: -5.90, w: 0.05, h: 0.02, zc: 0.34, sq: 0.80 },
    { x: -5.60, w: 0.14, h: 0.05, zc: 0.35, sq: 0.75 },
    { x: -4.30, w: 0.26, h: 0.12, zc: 0.44, sq: 0.70 },
    { x: -3.00, w: 0.36, h: 0.17, zc: 0.55, sq: 0.66 },
    { x: -1.60, w: 0.44, h: 0.21, zc: 0.65, sq: 0.64 },
    { x: -0.30, w: 0.48, h: 0.23, zc: 0.71, sq: 0.64 },
    { x:  0.80, w: 0.48, h: 0.21, zc: 0.71, sq: 0.66 },
    { x:  1.60, w: 0.42, h: 0.15, zc: 0.64, sq: 0.72 },
    { x:  2.05, w: 0.34, h: 0.08, zc: 0.57, sq: 0.80 },
  ];

  /* Engine tunnel. Round at the nozzle, squaring off as it runs forward
     until the mouth is a 1.04 x 0.74 m rectangle slung under the wing root.
     The duct also DROPS as it goes forward -- zc walks from -0.20 at the
     nozzle to -0.52 at the mouth -- which is what opens the splitter slot
     between the duct roof and the LERX underside.                           */
  var NAC_Y = 1.28;
  var NAC = [
    { x: -7.98, w: 0.48, h: 0.48, zc: -0.20, sq: 1.00 },
    { x: -7.60, w: 0.52, h: 0.52, zc: -0.21, sq: 1.00 },
    { x: -6.80, w: 0.57, h: 0.57, zc: -0.22, sq: 1.00 },
    { x: -5.60, w: 0.60, h: 0.60, zc: -0.24, sq: 0.98 },
    { x: -4.00, w: 0.62, h: 0.60, zc: -0.27, sq: 0.90 },
    { x: -2.40, w: 0.62, h: 0.57, zc: -0.31, sq: 0.76 },
    { x: -1.00, w: 0.60, h: 0.52, zc: -0.36, sq: 0.58 },
    { x:  0.30, w: 0.56, h: 0.45, zc: -0.42, sq: 0.44 },
    { x:  1.30, w: 0.53, h: 0.40, zc: -0.47, sq: 0.34 },
    { x:  2.05, w: 0.52, h: 0.38, zc: -0.51, sq: 0.28 },
    { x:  2.44, w: 0.52, h: 0.37, zc: -0.52, sq: 0.24 },
  ];
  var MOUTH_X = 2.44, MOUTH_Z = -0.52, MOUTH_W = 0.52, MOUTH_H = 0.37;

  /* the boom each fin stands on, riding the outer shoulder of the nacelle */
  var BOOM_Y = 1.68;
  var BOOM = [
    { x: -7.85, w: 0.04, h: 0.03, zc: 0.14, sq: 0.80 },
    { x: -7.70, w: 0.16, h: 0.10, zc: 0.17, sq: 0.60 },
    { x: -7.10, w: 0.22, h: 0.16, zc: 0.21, sq: 0.50 },
    { x: -6.20, w: 0.26, h: 0.20, zc: 0.23, sq: 0.45 },
    { x: -5.00, w: 0.28, h: 0.22, zc: 0.23, sq: 0.45 },
    { x: -3.80, w: 0.27, h: 0.21, zc: 0.21, sq: 0.50 },
    { x: -2.80, w: 0.24, h: 0.17, zc: 0.17, sq: 0.60 },
    { x: -2.00, w: 0.14, h: 0.09, zc: 0.11, sq: 0.80 },
    { x: -1.55, w: 0.04, h: 0.02, zc: 0.07, sq: 0.90 },
  ];

  /* brake-chute container: the squared box that closes the top of the tail */
  var CHUTE = [
    { x: -8.30, w: 0.22, h: 0.16, zc: 0.10, sq: 0.45 },
    { x: -7.90, w: 0.28, h: 0.22, zc: 0.14, sq: 0.42 },
    { x: -7.10, w: 0.31, h: 0.24, zc: 0.19, sq: 0.42 },
    { x: -6.40, w: 0.28, h: 0.21, zc: 0.23, sq: 0.48 },
    { x: -5.80, w: 0.20, h: 0.13, zc: 0.26, sq: 0.60 },
    { x: -5.40, w: 0.09, h: 0.05, zc: 0.28, sq: 0.75 },
  ];

  var GROUND = -1.58;   /* wheels touch here; fin tip 2.88 -> 4.46 m high    */

  /* ============================================================ variants ==
     slim: the 9.12 spine against the 9.13 hump. ventral: the small fins
     under the tunnels, early 9.12 only. fit: which stores hang on the
     pylons. pal: the paint.                                                 */
  var VARIANTS = {
    "9.13S": { slim: false, ventral: false, fit: "e90", pal: PAL.darkgrey },
    "9.12":  { slim: true,  ventral: true,  fit: "e90", pal: PAL.bluegrey },
    "9.12G": { slim: true,  ventral: false, fit: "e90", pal: PAL.seagrey },
    "9.12K": { slim: true,  ventral: false, fit: "k",   pal: PAL.bluegrey },
  };
  function variantOf(v) {
    return (typeof v === "string" ? VARIANTS[v] : v) || VARIANTS["9.13S"];
  }

  /* roof height of a section list at x, held flat beyond its ends */
  function topAt(secs, x) {
    var n = secs.length - 1, a, b, t;
    if (x <= secs[0].x) return secs[0].zc + secs[0].h;
    for (var i = 1; i <= n; i++) {
      if (x <= secs[i].x) {
        a = secs[i - 1]; b = secs[i]; t = (x - a.x) / (b.x - a.x);
        return (a.zc + a.h) + ((b.zc + b.h) - (a.zc + a.h)) * t;
      }
    }
    return secs[n].zc + secs[n].h;
  }

  /* The 9.12 spine: the hump's rise over the fuselage roof cut to a third,
     the bottom left where it was (it is buried in the roof anyway) and the
     width trimmed. Where the hump is already below the roof, as at its last
     station, it is left alone. */
  var _slim = null;
  function slimSpine() {
    if (_slim) return _slim;
    _slim = [];
    for (var i = 0; i < SPINE.length; i++) {
      var s = SPINE[i], bot = s.zc - s.h, top = s.zc + s.h, roof = topAt(FUS, s.x);
      var nt = top > roof ? roof + (top - roof) * 0.34 : top;
      _slim.push({ x: s.x, w: s.w * 0.86, h: (nt - bot) * 0.5, zc: (nt + bot) * 0.5, sq: s.sq });
    }
    return _slim;
  }
  function spineFor(V) { return V.slim ? slimSpine() : SPINE; }
  /* how far the 9.12 spine top lies below the 9.13 hump at x: everything
     that sits on the spine is placed at its 9.13 height minus this */
  function spineDrop(V, x) {
    return V.slim ? topAt(SPINE, x) - topAt(slimSpine(), x) : 0;
  }

  /* ---------------------------------------------------------- store fits --
     Stations a side, inboard to outboard. e90 is the load the hero always
     carried, an R-27 inboard and R-73s on the middle and outer rails; it is
     the "R-27R and R-73" generations.js gives the MiG-29S, and the Gatow
     29+03 photographs show the Luftwaffe's R-27 on that inboard pylon. The
     KPAF row's weapon is the R-27R (eras.js), so it carries that inboard
     and one R-73 on the outer rail: a typical load, as no photograph of a
     KPAF loading was found. */
  var R27 = { len: 4.05, rad: 0.120, fc: 0.55, fs: 0.42, cn: true };
  var R73 = { len: 2.86, rad: 0.088, fc: 0.40, fs: 0.30, cn: true };
  function fitRacks(kind) {
    var IN = { y: 2.60, cx: -0.95 }, MID = { y: 3.72, cx: -1.30 }, OUT = { y: 4.76, cx: -1.62 };
    var pick = {
      e90: [[IN, R27], [MID, R73], [OUT, R73]],
      k:   [[IN, R27], [OUT, R73]],
    }[kind] || [];
    var o = [];
    for (var i = 0; i < pick.length; i++) {
      var st = pick[i][0], w = pick[i][1];
      o.push({ y: st.y, len: w.len, rad: w.rad, fc: w.fc, fs: w.fs, cn: w.cn, cx: st.cx });
    }
    return o;
  }

  /* ============================================================== merge ==
     Every part used to be a Mesh of its own: 180 draw calls, and 180 more
     for the shadow pass, per aircraft on screen. Each mesh is baked into
     the frame of the model and meshes sharing a material become one
     geometry. The "gear" group stays a group of its own, or the renderer
     could not stow it; its parts are merged inside it. Vertices, colours,
     UVs and materials are the same ones as before, so the look is too. */
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

  /* ================================================================ build == */
  function build(THREE, M, C, which) {
    var V = variantOf(which);
    var T = materials(THREE, C, V.pal);
    var g = new THREE.Group();

    addBody(THREE, M, g, T, V);
    addTunnels(THREE, M, g, T);
    addWings(THREE, M, g, T);
    addIntakes(THREE, M, g, T);
    addTail(THREE, M, g, T, V);
    addCockpit(THREE, M, g, T);
    addNoseKit(THREE, M, g, T);
    addSpineKit(THREE, M, g, T, V);
    addStores(THREE, M, g, T, V);
    addGear(THREE, M, g, T);
    addTeamFlash(THREE, M, g, T, V);
    return mergeByMaterial(THREE, g);
  }

  /* --------------------------------------------------------- central body */
  function addBody(THREE, M, g, T, V) {
    g.add(new THREE.Mesh(M.loft(THREE, FUS, 40), T.skin));
    g.add(new THREE.Mesh(M.loft(THREE, spineFor(V), 24), T.skin));
    g.add(new THREE.Mesh(M.loft(THREE, CHUTE, 18), T.skin));
    /* the chute door closing the aft face of the container */
    var door = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.40, 0.30), T.ink);
    door.position.set(-8.32, 0, 0.10);
    g.add(door);
    /* aft face of the tail deck between the nozzles */
    var deck = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.70, 0.30), T.panel);
    deck.position.set(-8.31, 0, 0.00);
    g.add(deck);
  }

  /* ------------------------------------ engine tunnels, booms, nozzles ----
     The nozzle is built as four rings rather than one cylinder because the
     step where the shroud leaves the nacelle, and the dark hole behind the
     lip, are what stop an exhaust reading as a plug bunged in the back.     */
  function addTunnels(THREE, M, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var nac = new THREE.Mesh(M.loft(THREE, NAC, 28), T.skin);
      nac.position.y = s * NAC_Y;
      g.add(nac);

      var boom = new THREE.Mesh(M.loft(THREE, BOOM, 20), T.skin);
      boom.position.y = s * BOOM_Y;
      g.add(boom);

      /* Actuator ring where the shroud bolts to the nacelle: a bright step,
         and the thing that stops the exhaust reading as one long tube. */
      var act = new THREE.Mesh(
        new THREE.CylinderGeometry(0.565, 0.565, 0.14, 18, 1, true), T.metal);
      act.rotation.z = HALF_PI;
      act.position.set(-8.03, s * NAC_Y, -0.20);
      g.add(act);

      /* The RD-33 nozzle is convergent-divergent, so the profile is a cone
         that necks down and then flares again over the last hand's breadth.
         Sixteen facets so the petals read as petals at zoom. rotation.z has
         already been applied by the time these are placed, and it puts
         radiusTop at the -X end, so radiusTop is the AFT radius: the shroud
         narrows going aft, the skirt widens again. A single cylinder with a
         nine per cent taper -- the first cut -- rendered as a plug bunged in
         the back of the aeroplane. */
      var noz = new THREE.Mesh(
        new THREE.CylinderGeometry(0.425, 0.555, 0.46, 16, 1, true), T.hot);
      noz.rotation.z = HALF_PI;
      noz.position.set(-8.30, s * NAC_Y, -0.20);
      g.add(noz);
      var skirt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.470, 0.425, 0.13, 16, 1, true), T.hot);
      skirt.rotation.z = HALF_PI;
      skirt.position.set(-8.595, s * NAC_Y, -0.20);
      g.add(skirt);

      /* bright lip ring at the exit plane */
      var lip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.470, 0.478, 0.045, 16, 1, true), T.metal);
      lip.rotation.z = HALF_PI;
      lip.position.set(-8.66, s * NAC_Y, -0.20);
      g.add(lip);

      /* the hole: a dark cone receding forward, capped so no daylight shows
         through the far side of the aircraft */
      var thr = new THREE.Mesh(
        new THREE.CylinderGeometry(0.450, 0.25, 0.78, 16, 1, true), T.ink);
      thr.rotation.z = HALF_PI;
      thr.position.set(-8.26, s * NAC_Y, -0.20);
      g.add(thr);
      var plug = new THREE.Mesh(
        new THREE.CylinderGeometry(0.255, 0.255, 0.05, 14), T.ink);
      plug.rotation.z = HALF_PI;
      plug.position.set(-7.86, s * NAC_Y, -0.20);
      g.add(plug);
    }
  }

  /* ---------------------------------------------------- wings and gloves */
  function addWings(THREE, M, g, T) {
    var right = glovePoints();
    var left = mirrorY(right);
    for (var i = 0; i < 2; i++) {
      var s = i ? -1 : 1;
      var w = new THREE.Mesh(M.slab(THREE, i ? left : right, WING_T), T.panel);
      w.position.z = WING_Z - WING_T * 0.5;
      w.rotation.x = -s * ANHEDRAL * D2R;
      g.add(w);

      /* squared wingtip with the chaff/ECM fairing the S carried */
      var tf = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.11, 0.19), T.panel);
      tf.position.set(-2.16, s * (TIP_Y + 0.03), wingTop(TIP_Y) - WING_T * 0.5);
      g.add(tf);

      /* LOUVRED AUXILIARY INTAKE DOORS on the LERX upper surface. On the real
         aircraft these open when the main intakes are blanked off on a dirty
         strip; the slats sit in a recessed frame and from three-quarters they
         are the thing that says Fulcrum rather than Flanker. */
      var lz = wingTop(1.30);
      var frame = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.88, 0.06), T.ink);
      frame.position.set(1.52, s * 1.30, lz - 0.012);
      g.add(frame);
      for (var k = 0; k < 6; k++) {
        var sl = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.80, 0.14), T.panel);
        sl.position.set(2.06 - k * 0.235, s * 1.30, lz + 0.040);
        sl.rotation.y = -0.46;
        g.add(sl);
      }

      /* flap-track actuator fairings under the trailing edge */
      var fa = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.17, 0.14), T.panel);
      fa.position.set(-2.52, s * 3.05, wingBot(3.05) - 0.06);
      g.add(fa);
      var fb = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.16, 0.13), T.panel);
      fb.position.set(-2.60, s * 4.40, wingBot(4.40) - 0.06);
      g.add(fb);
    }

    /* the GSh-30-1 blast port, PORT LERX root: Fulcrums are asymmetric here */
    var port = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.20, 0.15), T.ink);
    port.position.set(2.86, 0.70, WING_Z + 0.13);
    g.add(port);
    var pan = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.27, 0.05), T.panel);
    pan.position.set(2.38, 0.70, WING_Z + 0.14);
    g.add(pan);
  }

  /* ----------------------------------------------------------- intakes ---
     The duct loft already ends in the right rectangle, so the mouth is made
     by what goes AROUND and BEHIND it: a flared rim so the edge catches
     light, a lower lip carried forward so the mouth is raked, a black box
     inside so it reads as a hole, and the splitter webs that hold the duct
     roof a hand's breadth below the LERX with daylight in between.          */
  function addIntakes(THREE, M, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      /* black interior, front face just inside the mouth plane */
      var thr = new THREE.Mesh(new THREE.BoxGeometry(0.90, 0.96, 0.68), T.ink);
      thr.position.set(1.96, s * NAC_Y, MOUTH_Z);
      g.add(thr);

      /* flared rim */
      var rim = new THREE.Mesh(M.loft(THREE, [
        { x: MOUTH_X - 0.02, w: MOUTH_W + 0.005, h: MOUTH_H + 0.005, zc: MOUTH_Z, sq: 0.24 },
        { x: MOUTH_X + 0.09, w: MOUTH_W + 0.045, h: MOUTH_H + 0.045, zc: MOUTH_Z - 0.01, sq: 0.24 },
      ], 24), T.skin);
      rim.position.y = s * NAC_Y;
      g.add(rim);

      /* lower lip carried forward: this is the rake */
      var low = new THREE.Mesh(new THREE.BoxGeometry(0.40, 1.09, 0.10), T.panel);
      low.position.set(MOUTH_X + 0.20, s * NAC_Y, MOUTH_Z - MOUTH_H - 0.01);
      g.add(low);
      var wedge = new THREE.Mesh(M.slab(THREE, [
        [MOUTH_X + 0.40, MOUTH_Z - MOUTH_H - 0.03],
        [MOUTH_X + 0.05, MOUTH_Z - MOUTH_H + 0.09],
        [MOUTH_X - 0.30, MOUTH_Z - MOUTH_H + 0.06],
        [MOUTH_X - 0.30, MOUTH_Z - MOUTH_H - 0.06],
      ], 1.02, "xz"), T.panel);
      wedge.position.y = s * NAC_Y + 0.51;
      g.add(wedge);

      /* boundary-layer splitter webs: two thin walls in the slot, leaving
         open slices either side that daylight comes through */
      for (var d = -1; d <= 1; d += 2) {
        var sp = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.05, 0.16), T.panel);
        sp.position.set(1.66, s * (NAC_Y + d * 0.44), -0.09);
        g.add(sp);
      }
    }
  }

  /* ------------------------------------------------- fins and stabilators */
  function addTail(THREE, M, g, T, V) {
    /* Fin: a low forward root fillet along the boom, then a 46 degree
       leading edge to a squared tip 2.58 m up. Canted 7 degrees outboard.
       Root chord 4.65 m, tip chord 1.28 m -- close to the real 4.3 / 1.35. */
    var finPts = [
      [-2.45, 0.00], [-3.62, 0.55], [-5.70, 2.58], [-6.98, 2.58], [-7.10, 0.00],
    ];
    /* a band, not a panel: the first cut used a slab half the fin high and it
       read as a lit window rather than a marking */
    var bandPts = [
      [-5.06, 1.90], [-5.52, 2.35], [-7.00, 2.35], [-7.02, 1.90],
    ];
    /* stabilator with the leading-edge sawtooth two thirds outboard */
    var stabR = [
      [-4.55, 1.55], [-6.02, 2.92], [-5.86, 3.06], [-6.98, 3.95],
      [-7.92, 3.95], [-6.95, 1.55],
    ];
    var ventR = [
      [-5.30, 0.00], [-6.24, -0.52], [-7.02, -0.52], [-6.96, 0.00],
    ];

    for (var s = -1; s <= 1; s += 2) {
      /* slab("xz") extrudes toward -y, so the offset is +thickness/2 either
         side or the port fin sits a whole skin thickness too far outboard */
      var fin = new THREE.Mesh(M.slab(THREE, finPts, 0.11, "xz"), T.panel);
      fin.rotation.x = -s * 7 * D2R;
      fin.position.set(0, s * BOOM_Y + 0.055, 0.30);
      g.add(fin);

      /* 0.24 against the fin's 0.11 leaves 6 cm proud on each face. At the
         2 cm the first cut allowed, the band lost the depth test to the fin
         across almost its whole area and only a sliver showed at the TE. */
      var bd = new THREE.Mesh(M.slab(THREE, bandPts, 0.24, "xz"), T.team);
      bd.rotation.x = -s * 7 * D2R;
      bd.position.set(0, s * BOOM_Y + 0.12, 0.30);
      g.add(bd);

      /* fin cap antenna fairing, at the new tip */
      var cap = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.14, 0.11), T.panel);
      cap.rotation.x = -s * 7 * D2R;
      cap.position.set(-6.34, s * (BOOM_Y + 0.35), 2.86);
      g.add(cap);

      /* all-moving stabilator on the boom, slight anhedral */
      var st = new THREE.Mesh(
        M.slab(THREE, s > 0 ? stabR : mirrorY(stabR), 0.14), T.panel);
      st.position.z = -0.14;
      st.rotation.x = -s * 3.5 * D2R;
      g.add(st);

      /* ventral fin under each tunnel: early 9.12s only (see the header) */
      if (V.ventral) {
        var vf = new THREE.Mesh(M.slab(THREE, ventR, 0.07, "xz"), T.panel);
        vf.position.set(0, s * 1.52 + 0.035, -0.78);
        g.add(vf);
      }
    }
  }

  /* --------------------------------------------------- canopy and cockpit
     A canopy is read from its FRAMES and from the darkness inside it, not
     from the glass. Tub and seat first, then a bubble that clears the spine
     by nearly half a metre, then a bow frame and two rails.                 */
  function addCockpit(THREE, M, g, T) {
    var tub = new THREE.Mesh(new THREE.BoxGeometry(1.60, 0.74, 0.52), T.ink);
    tub.position.set(3.05, 0, 0.50);
    g.add(tub);
    var seat = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.54, 0.70), T.ink);
    seat.position.set(2.68, 0, 0.62);
    g.add(seat);
    var head = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.26), T.ink);
    head.position.set(2.62, 0, 0.94);
    g.add(head);
    var coam = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.62, 0.22), T.ink);
    coam.position.set(3.66, 0, 0.66);
    g.add(coam);
    var hud = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.28), T.glass);
    hud.position.set(3.58, 0, 0.84);
    g.add(hud);

    /* the bubble. Top at z = 1.10, about 0.46 m clear of the fuselage deck,
       which is what the side photographs show. */
    var can = [
      { x: 1.66, w: 0.24, h: 0.06, zc: 0.72, sq: 0.85 },
      { x: 2.08, w: 0.42, h: 0.25, zc: 0.70, sq: 1.00 },
      { x: 2.58, w: 0.50, h: 0.40, zc: 0.68, sq: 1.08 },
      { x: 3.08, w: 0.52, h: 0.44, zc: 0.66, sq: 1.12 },
      { x: 3.52, w: 0.50, h: 0.41, zc: 0.63, sq: 1.10 },
      { x: 3.96, w: 0.44, h: 0.33, zc: 0.58, sq: 1.04 },
      { x: 4.36, w: 0.33, h: 0.20, zc: 0.50, sq: 0.98 },
      { x: 4.64, w: 0.13, h: 0.05, zc: 0.42, sq: 0.92 },
    ];
    g.add(new THREE.Mesh(M.loft(THREE, can, 22), T.glass));

    /* the bow frame at the windscreen joint: a two-section loft just outside
       the glass follows the section, which an arc of a circle does not */
    g.add(new THREE.Mesh(M.loft(THREE, [
      { x: 3.86, w: 0.462, h: 0.352, zc: 0.598, sq: 1.06 },
      { x: 3.98, w: 0.456, h: 0.344, zc: 0.590, sq: 1.05 },
    ], 22), T.metal));
    for (var s = -1; s <= 1; s += 2) {
      var rail = new THREE.Mesh(new THREE.BoxGeometry(2.30, 0.05, 0.08), T.panel);
      rail.position.set(2.86, s * 0.46, 0.60);
      g.add(rail);
    }
    /* aft canopy fairing where the glass runs into the spine */
    var fair = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.50, 0.24), T.panel);
    fair.position.set(1.62, 0, 0.70);
    g.add(fair);
  }

  /* ---------------------------------------------------- nose fit and IRST */
  function addNoseKit(THREE, M, g, T) {
    /* the KOLS infra-red search ball, offset to STARBOARD of the centreline */
    var ball = new THREE.Mesh(new THREE.SphereGeometry(0.145, 14, 9), T.glass);
    ball.position.set(4.72, -0.20, 0.36);
    g.add(ball);
    var collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.155, 0.17, 0.20, 12), T.metal);
    collar.position.set(4.72, -0.20, 0.24);
    g.add(collar);

    /* nose probe: 1.1 m clear of the radome, no more */
    var pit = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.044, 1.06, 8), T.metal);
    pit.rotation.z = HALF_PI;
    pit.position.set(7.98, 0, -0.215);
    g.add(pit);
    var tipc = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.026, 0.22, 8), T.metal);
    tipc.rotation.z = HALF_PI;
    tipc.position.set(8.60, 0, -0.215);
    g.add(tipc);

    /* angle-of-attack vanes and the radome dielectric joint band */
    for (var s = -1; s <= 1; s += 2) {
      var v = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.17), T.metal);
      v.position.set(6.05, s * 0.29, -0.10);
      g.add(v);
    }
    g.add(new THREE.Mesh(M.loft(THREE, [
      { x: 6.42, w: 0.266, h: 0.246, zc: -0.112, sq: 0.86 },
      { x: 6.56, w: 0.246, h: 0.229, zc: -0.122, sq: 0.86 },
    ], 20), T.ink));
  }

  /* ------------------------------------------------- spine kit, airbrake --
     The dorsal airbrake is hinged at its FORWARD edge, so the plate has to be
     modelled about that hinge and then rotated: build it in world coordinates
     and rotate about the group origin and it swings into the fuselage.       */
  function addSpineKit(THREE, M, g, T, V) {
    var ab = new THREE.Mesh(M.slab(THREE, [
      [0.00, 0.34], [-1.65, 0.30], [-1.65, -0.30], [0.00, -0.34],
    ], 0.05), T.panel);
    ab.position.set(-2.90, 0, 0.69 - spineDrop(V, -2.90));
    ab.rotation.y = 0.16;
    g.add(ab);
    var well = new THREE.Mesh(new THREE.BoxGeometry(1.60, 0.62, 0.05), T.ink);
    well.position.set(-3.72, 0, 0.605 - spineDrop(V, -3.72));
    g.add(well);

    /* blade aerials: one on the spine, one under the tunnel */
    var b1 = new THREE.Mesh(M.slab(THREE, [
      [-1.05, 0.00], [-1.32, 0.30], [-1.62, 0.30], [-1.55, 0.00],
    ], 0.05, "xz"), T.panel);
    b1.position.set(0, 0.025, 0.90 - spineDrop(V, -1.30));
    g.add(b1);
    var b2 = new THREE.Mesh(M.slab(THREE, [
      [0.60, 0.00], [0.37, -0.26], [0.07, -0.26], [0.13, 0.00],
    ], 0.05, "xz"), T.panel);
    b2.position.set(0, 0.025, -0.32);
    g.add(b2);

    /* chaff/flare dispenser fairings on the spine shoulders, and the
       formation-light strips */
    for (var s = -1; s <= 1; s += 2) {
      var disp = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.20, 0.11), T.panel);
      disp.position.set(-3.30, s * 0.40, 0.56);
      g.add(disp);
      var fl = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.04, 0.09), T.metal);
      fl.position.set(-1.4, s * 0.47, 0.60);
      g.add(fl);
    }
  }

  /* ------------------------------------------------------ pylons + stores */
  function missile(THREE, M, T, len, rad, finC, finS, canard) {
    var grp = new THREE.Group();
    var secs = [
      { x: -len * 0.500, w: rad * 0.80, h: rad * 0.80, zc: 0, sq: 1 },
      { x: -len * 0.430, w: rad, h: rad, zc: 0, sq: 1 },
      { x:  len * 0.240, w: rad, h: rad, zc: 0, sq: 1 },
      { x:  len * 0.370, w: rad * 0.88, h: rad * 0.88, zc: 0, sq: 1 },
      { x:  len * 0.460, w: rad * 0.56, h: rad * 0.56, zc: 0, sq: 1 },
      { x:  len * 0.500, w: rad * 0.09, h: rad * 0.09, zc: 0, sq: 1 },
    ];
    grp.add(new THREE.Mesh(M.loft(THREE, secs, 12), T.metal));
    var cap = new THREE.Mesh(
      new THREE.CylinderGeometry(rad * 0.80, rad * 0.80, 0.03, 10), T.ink);
    cap.rotation.z = HALF_PI;
    cap.position.x = -len * 0.505;
    grp.add(cap);

    var k, f, pv;
    for (k = 0; k < 4; k++) {
      f = new THREE.Mesh(new THREE.BoxGeometry(finC, finS, 0.02), T.metal);
      f.position.set(-len * 0.40, rad + finS * 0.5, 0);
      pv = new THREE.Group(); pv.add(f);
      pv.rotation.x = k * HALF_PI + Math.PI / 4;
      grp.add(pv);
    }
    if (canard) {
      for (k = 0; k < 4; k++) {
        f = new THREE.Mesh(new THREE.BoxGeometry(finC * 0.55, finS * 0.62, 0.02), T.metal);
        f.position.set(len * 0.24, rad + finS * 0.31, 0);
        pv = new THREE.Group(); pv.add(f);
        pv.rotation.x = k * HALF_PI + Math.PI / 4;
        grp.add(pv);
      }
    }
    return grp;
  }

  /* three stations a side; what hangs on them is the variant's fit (fitRacks) */
  function addStores(THREE, M, g, T, V) {
    var racks = fitRacks(V.fit);
    for (var i = 0; i < racks.length; i++) {
      var r = racks[i];
      for (var s = -1; s <= 1; s += 2) {
        var wz = wingBot(r.y);
        var py = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.10, 0.34), T.panel);
        py.position.set(r.cx + 0.45, s * r.y, wz - 0.16);
        g.add(py);
        var ms = missile(THREE, M, T, r.len, r.rad, r.fc, r.fs, r.cn);
        ms.position.set(r.cx, s * r.y, wz - 0.44);
        g.add(ms);
      }
    }
  }

  /* ---------------------------------------------------------------- gear --
     The renderer stows this group in cruise, so it MUST be named "gear".
     A CylinderGeometry runs along +Y, so every leg needs rotation.x = PI/2
     before it is a leg rather than an axle. A wheel is the other way about:
     left along +Y its axle already runs across the aircraft and it stands
     on its tread. The wheels were once given the legs' turn as well, which
     laid every tyre flat, 0.2 m above GROUND.                                */
  function addGear(THREE, M, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);

    /* nose unit: twin wheels, forward-raked leg, and the debris mudguard the
       type carries because it was built for unpaved strips */
    var nz = GROUND + 0.275;
    var nleg = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.072, 1.02, 8), T.metal);
    nleg.rotation.x = HALF_PI;
    nleg.rotation.z = 0.10;
    nleg.position.set(3.02, 0, -0.82);
    gr.add(nleg);
    for (var w = -1; w <= 1; w += 2) {
      var nw = new THREE.Mesh(new THREE.CylinderGeometry(0.275, 0.275, 0.145, 14), T.tyre);
      nw.position.set(2.94, w * 0.115, nz);
      gr.add(nw);
      var nh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.155, 10), T.metal);
      nh.position.set(2.94, w * 0.115, nz);
      gr.add(nh);
    }
    var mud = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.44, 0.06), T.metal);
    mud.rotation.y = 0.16;
    mud.position.set(2.98, 0, nz + 0.31);
    gr.add(mud);
    var ndoor = new THREE.Mesh(new THREE.BoxGeometry(1.10, 0.06, 0.46), T.panel);
    ndoor.rotation.x = 0.44;
    ndoor.position.set(3.36, 0.30, -0.56);
    gr.add(ndoor);

    /* main units: single big wheel each, leg splayed outboard, retracting
       forward into the wing root */
    var mz = GROUND + 0.42;
    for (var s = -1; s <= 1; s += 2) {
      var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.088, 0.96, 8), T.metal);
      leg.rotation.x = HALF_PI + s * 0.18;
      leg.position.set(-0.52, s * 1.52, -0.78);
      gr.add(leg);
      var brace = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.07, 0.09), T.metal);
      brace.rotation.y = -0.72;
      brace.position.set(-0.10, s * 1.44, -0.62);
      gr.add(brace);
      var mw = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 16), T.tyre);
      mw.position.set(-0.50, s * 1.68, mz);
      gr.add(mw);
      var hb = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.17, 12), T.metal);
      hb.position.set(-0.50, s * 1.68, mz);
      gr.add(hb);
      var md = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.06, 0.50), T.panel);
      md.rotation.x = s * 0.34;
      md.position.set(0.30, s * 1.28, -0.66);
      gr.add(md);
    }
  }

  /* ----------------------------------------------------------- team flash
     Four places, chosen so ownership reads from any camera angle the game
     can put on the unit: the fin bands (with the fins), a band across each
     wing, a chevron on each side of the nose, and a stripe over the spine
     for the straight-down view.                                             */
  function addTeamFlash(THREE, M, g, T, V) {
    var ch = chordAt(3.40);
    if (ch) {
      var cx = (ch[0] + ch[1]) * 0.5;
      for (var s = -1; s <= 1; s += 2) {
        var band = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.80, 0.05), T.team);
        band.rotation.x = -s * ANHEDRAL * D2R;
        /* models3d's slab bevels its caps out by 0.4 of the thickness, so
           the wing's upper skin is WING_T * 0.4 above wingTop(); at
           wingTop() itself the band lay 3 cm under the skin and never
           showed */
        band.position.set(cx, s * 3.40, wingTop(3.40) + WING_T * 0.4 + 0.012);
        g.add(band);
      }
    }
    for (var t = -1; t <= 1; t += 2) {
      var ny = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.05, 0.22), T.team);
      ny.rotation.z = t * 0.10;
      ny.position.set(4.30, t * 0.47, 0.08);
      g.add(ny);
    }
    var sp = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.78, 0.07), T.team);
    sp.position.set(-0.60, 0, 0.90 - spineDrop(V, -0.60));
    g.add(sp);
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e90_fighter"] = {
  len: 17.30,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C); },
};

/* The other MiG-29 rows are this airframe in their own guise. len is the
   measured X extent of the model (pitot to lip ring), the same for all. */
UNIT_MODELS["fighter_p"] = {
  len: 17.39,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.13S"); },
};
UNIT_MODELS["pact_e80_fighter"] = {
  len: 17.39,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.12"); },
};
UNIT_MODELS["deu_e90_mig29"] = {
  len: 17.39,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.12G"); },
};
UNIT_MODELS["kpa_e00_fighter"] = {
  len: 17.39,
  build: function (THREE, M, C) { return MiG29Hero.build(THREE, M, C, "9.12K"); },
};
