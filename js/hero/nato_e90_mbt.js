/* ============ nato_e90_mbt.js - HERO family: General Dynamics M1 Abrams ====
   One hull and one turret, five rows, told apart by a variant table. The file
   keeps its old name because the M1A2 (nato_e90_mbt) is the model every other
   row grew out of; it now registers all five keys:

     nato_e80_mbt  M1A1 Abrams, 1985      120 mm M256, no CITV. The first
                                          Abrams with the German-designed gun;
                                          1980s NATO three-tone paint.
     nato_e90_mbt  M1A2 Abrams, 1992      + the commander's independent thermal
                                          viewer (CITV) forward and left of the
                                          cupola. The model this file began as.
     nato_e00_mbt  M1A2 SEP, 2001         + the thermal management unit on the
                                          rear of the turret (the SEP's added
                                          cooling for its extra electronics).
     mbt_n         M1A2 SEPv3, 2020       + CROWS-LP, the remote weapon station
                                          that replaces the .50 on the
                                          commander's ring.
     hvy_n         M1A2C with Trophy      + the two Trophy launchers on the
                                          rear flanks of the turret.

   Each row adds only what the real tank added, and nothing else. Not drawn,
   because nothing about them shows from outside or no photograph here
   shows them: the M1A2C's ammunition data link, the under-armour auxiliary
   power unit in the left rear sponson, the armour packages, the compressor
   half of the thermal management system (forward of the gunner's sight) and
   Trophy's four flat radar panels. The SEP is drawn as the 2001 SEP (the .50
   still on its ring); CROWS comes with the SEPv2 of 2008 and the TUSK kit,
   neither of which is drawn.

   Sources: Wikimedia Commons photographs "M1A2 SEPv2 Abrams with Trophy
   launcher mock-ups" (MSPO 2021: side and front views, which place the
   launchers on the turret rear flanks and show the CITV and CROWS), "M1A2 SEP
   V3 Abrams" and "Cav. M1A2 SEPv3" (Fort Hood, 2020: CROWS-LP on its riser),
   "M1A1 Trophy Technology Demonstrator" (the launcher box on the turret rear
   flank, tubes at its forward end, a large oval cover on its side). Position
   of the thermal management unit: the program description puts the SEP's air
   handling unit "in the left side of the turret bustle". Published figures:
   hull 7.92 m, overall 9.83 m gun forward, width 3.66 m, height 2.44 m, 635 mm
   track.

   Built to the project's hero conventions: every static part is merged into
   ONE mesh per material, hull and turret each, so a variant is 11 to 12 draw
   calls and 6 to 7 materials (the old M1A2 hero was 386 meshes, the parametric
   rows 173 to 190). The turret is the group named "turret", origin on the ring
   centre, gun along +X, so it still trains and recoils. The team material is
   exactly C.team, because era repaints of other armies' rows that borrow these
   keys look for the team colour to leave it alone. Road wheels do not spin:
   fourteen wheel groups would cost fourteen draw calls on their own, and the
   other tank heroes leave them still too.

   The M1A2 row is the same geometry as before, triangle for triangle (8,236),
   to within a millimetre, bar one tuck: the heavy front skirt sections and the
   hull-side team plates sit 3 cm further in, so the tank is 3.72 m wide
   instead of 3.77 m (published 3.66 m). What else changed is the paint (one
   flat-shaded material for the lofts and the boxes alike) and that the team
   flash is no longer darkened.

   REWORK 2026-11 (the owner's visual review: "plain hull sides" at the game
   camera). Geometry reworked against photographs, every key, builder,
   signature, the "turret" node and len 9.77 kept:
     [P1] Commons "Cav. M1A2 SEPv3.jpg" (Fort Hood, starboard side, gun
          forward): measured at 141 px a metre off the 7.93 m hull - the
          skirt panel layout, the turret's side bevel and undercut, roof
          2.41 m, turret floor 1.49 m, the bustle and its kit, CROWS-LP.
     [P2] Commons "07.10 ...-54645274900.jpg" (ROC Presidential Office,
          2025, M1A2T head-on; cached for js/hero/variants_skirmish.js): the
          cheek faces with their lower chamfer, the smoke banks on the front
          corners, the gunner's sight window and its frame, the CITV head,
          the loader's M240, headlamp guards and nose shackles.
     - turret: the squared loft is replaced by a faceted solid (facets()):
       eight-corner sections give the upper side bevel, the vertical flank
       and the undercut along the whole turret, the cheeks are two flat faces
       swept about 30 degrees, the roof drops toward them [P1][P2];
     - skirts: six light panels of the photographed widths, the high panel
       over the sprocket, the heavy front section with its rising lower edge
       and angled front, a hinge block and a catch at every joint, bolt
       rows, lip and rubber strip [P1];
     - fittings: GPS window frame and its two ballistic doors (drawn open,
       NOT CONFIRMED angle), CITV drum and frame, CROWS-LP cradle, sensors,
       barrel jacket and feed, the .50's ammunition tray, the loader's M240
       butt and can, M250 smoke banks of six on the front corners [P2],
       vision-block surrounds, gunner's hatch, grab handles, bolt rows, the
       blowout panels' bolts, the gun's shroud clamps and muzzle sensor;
       hull: the rear grille's frame, louvres and stiffeners, its hinges, the
       pintle, tail lamp guards, tow eyes and shackles, the infantry phone
       box, framed engine-deck grille doors with hinges and handles, fuel
       caps, tow cables on the deck edges (NOT CONFIRMED stowage), driver's
       hatch hinge and periscope hoods, headlamp brush guards [P2], nose
       shackles, ribbed mudflaps, the rear sponson boxes with lids and hasps
       (the old forward pair sat under the bustle and fouled its traverse),
       road-wheel nut rings;
     - the crew's kit in the bustle rack (bags, tarpaulin, ration box, water
       cans) on every row but "sepv3", in one untextured canvas material
       (+1 draw call). "sepv3" is what js/hero/variants_skirmish.js builds for
       hvy_r, which loads its own kit into the rack; mbt_n moved to the new
       "sepv3n" row, the same tank with the kit.
   NOT drawn, as before: TUSK (no row here is a TUSK tank), the loader's
   armoured gun shield (hvy_r draws its own), Trophy's radar panels.
   NOT CONFIRMED: the cheek sweep (read off [P2] head-on, no plan view); the
   bag sizes; the GPS door opening. Tris 8.1-8.9k -> 18.1-18.9k, draw calls
   11-12 -> 13-14 (hvy_r 14 -> 15). Measured 9.77 x 3.73 x 3.56 m (aerials;
   published 9.83 x 3.66 x 2.44 to the roof: roof measured 2.42 m).

   The notes below are from the original M1A2 pass and still apply.

   What has to read at a glance, from the reference photographs:
     - SEVEN road wheels per side, evenly spaced, with the drive sprocket at
       the REAR and a smaller compensating idler at the front. Every earlier
       pass at this vehicle put the sprocket at the front, which is the single
       fastest way to make an Abrams read as a Leopard.
     - A very long, very low wedge hull: the glacis is one uninterrupted
       shallow ramp running most of the vehicle's length down to a nose that
       sits barely above wheel-hub height.
     - A flat-faced faceted turret. The front is two big planar cheeks that
       sweep back and out to the widest point behind the sights; the sides are
       near-vertical slabs; the roof is one flat plane carried all the way
       back over a deep stowage bustle.
     - The 120 mm M256 smoothbore: thick thermal shroud off the mantlet, a
       step down to the bare tube, a bore evacuator two thirds out.
     - Segmented side skirts, with a deeper heavy section over the front pair
       of wheels whose bottom edge drops away toward the nose.
     - The M1A2 tell: the commander's independent thermal viewer standing
       proud of the turret roof on its pedestal, forward and left of the
       cupola.

   Model space: +X nose/front, +Y left, +Z up. Real metres, ground at z = 0.
   Materials are the house three tiers only - SKIN (textured paint), METAL
   (bare fittings, tracks, rubber), GLASS (vision blocks and sight windows).
   ASCII only: a stray byte in a hex literal has broken this project before.

   Two things measured on the renderer while building this, both of which the
   parametric armour will want when it is tuned to match:

   1. M.loft winds its quads (a, c, b), which puts the face normal radially
      INWARD. Under a default FrontSide material the outer skin is therefore
      culled and you are looking at the far inner wall of the body: a solid
      turret rendered with the ring plate underneath it plainly visible, and
      the shading came out inverted, which is most of why lofted armour in
      this project has always read as a soft blob. Every lofted body here goes
      through body() below, which flips the winding and recomputes normals.
      (The aircraft files sidestep this by using DoubleSide everywhere;
      armour3d.js does not, so its hulls are almost certainly inside out.)

   2. sq does NOT square a section off the way the number suggests once the
      section is wide and shallow. The exponent acts in normalised space, so a
      hull station 3.44 m wide and 0.58 m tall at the recommended sq 0.34 gets
      a corner chamfer 0.40 m across - a quarter of the half-width - and reads
      as a rounded shoulder. Measured on this hull, sq 0.09 gives a 0.20 m
      bevel and a crisp deck edge; the turret uses 0.08. Wide flat sections
      want a far lower exponent than a square one does. The lofted bodies also
      take flatShading, because averaged normals put the rounding back. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAbrams = (function () {
  "use strict";

  /* ------------------------------------------------------------ geometry */
  /* Everything below is in metres and every number that two parts have to
     agree about lives here, so the running gear, the skirts and the hull
     cannot drift apart the way they did when each was tuned by eye. */
  var L        = 7.93;    /* hull length, nose to tail plate                */
  var X_NOSE   =  3.965;
  var X_TAIL   = -3.965;
  var HW       = 1.72;    /* hull half width over the sponsons              */
  var Z_DECK   = 1.48;    /* flat hull roof                                 */
  var Z_SPON   = 0.90;    /* sponson floor, just clear of the top track run */
  var Z_BELLY  = 0.48;    /* ground clearance                               */

  var WR       = 0.32;    /* road wheel radius (0.635 m wheel)              */
  var TT       = 0.115;   /* track belt thickness, pad included             */
  var WZ       = TT + WR; /* road wheel centre height                       */
  var BW       = 0.63;    /* track width                                    */
  var TY       = 1.40;    /* track centreline offset from the hull centre   */
  var N_WHEEL  = 7;       /* the period cue                                 */
  var WX0      =  2.42;   /* first (front) road wheel                       */
  var WX1      = -2.42;   /* last (rear) road wheel                         */

  var SPR      = { x: -3.18, z: 0.62, r: 0.275, tr: 0.345 };  /* REAR drive */
  var IDL      = { x:  3.12, z: 0.50, r: 0.300 };             /* front idler*/

  var SK_Y     = 1.755;   /* skirt inner face                               */
  var SK_TH    = 0.055;
  var SK_TOP   = 1.34;
  var SK_BOT   = 0.50;

  var TUR      = { x: 0.15, z: Z_DECK };   /* turret ring centre            */
  var GUN_TIP  = 5.555;                    /* turret-local muzzle x         */

  /* ------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ variants */
  /* What each row adds. paint picks the canvas; the rest are switches the
     turret builder reads. Keep this table honest: a switch is only ever true
     where the real tank had the feature. */
  /* REWORK 2026-11: stow is the crew's kit in the bustle rack (canvas
     material, one draw call). "sepv3" is left without it: the M1A2T row
     (js/hero/variants_skirmish.js buildM1A2T) builds "sepv3" and loads its
     own kit into the same rack. mbt_n is the "sepv3n" row, the same tank
     with the kit. */
  var VARIANTS = {
    m1a1:   { paint: "nato",   citv: false, tms: false, crows: false, trophy: false, stow: true  },
    m1a2:   { paint: "desert", citv: true,  tms: false, crows: false, trophy: false, stow: true  },
    sep:    { paint: "desert", citv: true,  tms: true,  crows: false, trophy: false, stow: true  },
    sepv3:  { paint: "desert", citv: true,  tms: true,  crows: true,  trophy: false, stow: false },
    sepv3n: { paint: "desert", citv: true,  tms: true,  crows: true,  trophy: false, stow: true  },
    m1a2c:  { paint: "desert", citv: true,  tms: true,  crows: true,  trophy: true,  stow: true  }
  };


  /* ------------------------------------------------------------ SKIN tex */
  /* One 1024 canvas carries the whole paint job: NATO desert base from the
     armour3d PAINT table, disruptive blotches in that table's secondary
     tones, a real plate layout in seams, bolt rows along the seams, and
     grime that is heaviest low down and behind the exhaust.
     u = 0 is the hull TAIL on the lofted body, so the exhaust smear is
     painted into the low-u band and lands where the grille actually is.  */
  var _cv = {};   /* one canvas per paint scheme, built once per page */
  function paintCanvas(scheme) {
    if (_cv[scheme]) return _cv[scheme];
    var W = 1024, H = 1024, i, j, x, y, n, q;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    /* "nato" is the 1980s three-tone: dark green with hard-edged brown and
       black patches. Everything later is plain desert tan. */
    var nato = (scheme === "nato");
    var R = rng(nato ? 19851 : 19902);

    /* Base coat is PAINT.desert (0xb0a07c) from armour3d.js, pulled down and
       warmed to 0x9c8759. That is deliberate: this renderer runs ACES tone
       mapping under a 1.4 key light and the table value came back off the
       screen as pale cream with no desert in it at all. The darker source
       lands on the value the table is asking for. */
    g.fillStyle = nato ? "#4a5833" : "#9c8759"; g.fillRect(0, 0, W, H);

    /* disruptive camouflage */
    var tones = nato ? ["#66512f", "#2a2d1f", "#566a3a", "#725b37"]
                     : ["#87764c", "#b09a69", "#7b6c47", "#a89263"];
    for (i = 0; i < (nato ? 34 : 46); i++) {
      g.globalAlpha = (nato ? 0.78 : 0.34) + R() * 0.22;
      g.fillStyle = tones[i % tones.length];
      g.beginPath();
      g.ellipse(R() * W, R() * H, (nato ? 70 : 46) + R() * 130, (nato ? 46 : 30) + R() * 84, R() * 3.1416, 0, 6.2832);
      g.fill();
    }
    g.globalAlpha = 1;

    /* --- plate layout: horizontal deck joins and vertical plate ends --- */
    var seams = [];
    g.lineWidth = 2.0;
    for (i = 0; i < 9; i++) {
      y = (i + 0.5) * (H / 9) + (R() - 0.5) * 26;
      g.strokeStyle = "rgba(28,26,22,0.34)";
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      /* a thin highlight under each seam reads as a raised plate lip */
      g.strokeStyle = "rgba(232,224,198,0.16)";
      g.beginPath(); g.moveTo(0, y + 2.5); g.lineTo(W, y + 2.5); g.stroke();
      seams.push(y);
    }
    for (i = 0; i < 22; i++) {
      x = R() * W;
      var ya = R() * H, yb = ya + 90 + R() * 260;
      g.strokeStyle = "rgba(28,26,22,0.30)";
      g.beginPath(); g.moveTo(x, ya); g.lineTo(x + (R() - 0.5) * 10, yb); g.stroke();
    }

    /* --- bolt and rivet rows, tracking the horizontal seams --- */
    for (i = 0; i < seams.length; i++) {
      y = seams[i] - 9;
      n = 40 + ((R() * 20) | 0);
      for (j = 0; j < n; j++) {
        x = (j + 0.5) * (W / n) + (R() - 0.5) * 4;
        g.fillStyle = "rgba(30,27,22,0.42)";
        g.beginPath(); g.arc(x, y, 2.3, 0, 6.2832); g.fill();
        g.fillStyle = "rgba(238,230,206,0.22)";
        g.beginPath(); g.arc(x - 0.8, y - 0.9, 1.1, 0, 6.2832); g.fill();
      }
    }
    /* short bolted patches away from the seams: hatch rings, box mounts */
    for (i = 0; i < 26; i++) {
      var bx = R() * W, by = R() * H;
      n = 5 + ((R() * 9) | 0);
      for (j = 0; j < n; j++) {
        g.fillStyle = "rgba(30,27,22,0.38)";
        g.beginPath(); g.arc(bx + j * 9, by, 2.0, 0, 6.2832); g.fill();
      }
    }

    /* --- weathering: grime heaviest low down --------------------------- */
    var low = g.createLinearGradient(0, H * 0.56, 0, H);
    low.addColorStop(0.0, "rgba(122,108,80,0.00)");
    low.addColorStop(0.6, "rgba(112,99,72,0.24)");
    low.addColorStop(1.0, "rgba(84,74,54,0.48)");
    g.fillStyle = low; g.fillRect(0, H * 0.56, W, H * 0.44);
    /* the lofted body wraps v so the far side band also sits low: dirty it */
    var low2 = g.createLinearGradient(0, 0, 0, H * 0.13);
    low2.addColorStop(0.0, "rgba(96,85,62,0.34)");
    low2.addColorStop(1.0, "rgba(96,85,62,0.00)");
    g.fillStyle = low2; g.fillRect(0, 0, W, H * 0.13);

    /* dust and rain streaks running down the plates */
    for (i = 0; i < 150; i++) {
      x = R() * W; y = H * (0.30 + R() * 0.62);
      g.fillStyle = R() < 0.55 ? "rgba(70,62,46,0.14)" : "rgba(178,166,136,0.13)";
      g.fillRect(x, y, 1.6 + R() * 3.4, 26 + R() * 130);
    }
    /* chipped paint down to primer on the plate edges */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(58,54,44,0.30)";
      g.fillRect(R() * W, seams[(R() * seams.length) | 0] + (R() - 0.5) * 12,
                 3 + R() * 12, 2 + R() * 4);
    }

    /* --- exhaust staining, painted into the tail band of the loft ------ */
    for (q = 0; q < 3; q++) {
      var eg = g.createLinearGradient(0, 0, W * 0.26, 0);
      eg.addColorStop(0.0, "rgba(26,23,20,0.50)");
      eg.addColorStop(0.5, "rgba(34,30,26,0.26)");
      eg.addColorStop(1.0, "rgba(34,30,26,0.00)");
      g.fillStyle = eg;
      g.fillRect(0, H * (0.30 + q * 0.22), W * 0.26, H * 0.20);
    }
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(22,20,18,0.20)";
      g.fillRect(R() * W * 0.24, R() * H, 2 + R() * 7, 14 + R() * 80);
    }
    _cv[scheme] = cv;
    return cv;
  }

  function skinTex(THREE, scheme, rx, ry) {
    try {
      var t = new THREE.CanvasTexture(paintCanvas(scheme));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      t.repeat.set(rx, ry);
      return t;
    } catch (e) { return null; }
  }


  /* ---------------------------------------------------------- materials */
  /* The house three tiers: SKIN (the textured paint), METAL (fittings, gun,
     running gear, rubber) and GLASS, plus the team flash. The build ends by
     merging every mesh that shares a material, so a variant costs one draw
     call per material for the hull and again for the turret. skinS is not a
     material of its own: it stands for the same paint zoomed in three times,
     and the merge folds it into skin by scaling the UVs of the parts that
     asked for it. The lofted bodies and the boxes share one flat-shaded
     paint: averaged normals turned the squared-off sections back into a soft
     cast dome, and an Abrams is nothing but plates. */
  function makeMats(THREE, C, V) {
    var T = {};
    var tex = skinTex(THREE, V.paint, 1, 1);
    T.skin = new THREE.MeshStandardMaterial(
      { color: 0xffffff, roughness: 0.90, metalness: 0.05, flatShading: true });
    if (tex) T.skin.map = tex; else T.skin.color.setHex(V.paint === "nato" ? 0x4a5636 : 0xb0a07c);
    T.skinL = T.skin;
    T.skinS = T.skin.clone();
    T.skinS.userData = { into: T.skin, uvs: 0.34 };

    T.metal = new THREE.MeshStandardMaterial(
      { color: 0x5d6165, roughness: 0.55, metalness: 0.50 });
    T.dark  = new THREE.MeshStandardMaterial(
      { color: 0x3a3d40, roughness: 0.60, metalness: 0.45 });
    /* rubber and track pads: matt and non-metallic */
    T.rub   = new THREE.MeshStandardMaterial(
      { color: 0x1b1d1e, roughness: 0.95, metalness: 0.04 });
    T.glass = new THREE.MeshStandardMaterial({
      color: 0x2b3a44, roughness: 0.10, metalness: 0.10,
      transparent: true, opacity: 0.84 });

    /* Team flash: exactly C.team as handed in. Era repaints of other armies'
       rows that borrow these keys test for the team colour to leave it be,
       and a darkened copy would be repainted with the rest of the hull. */
    T.team = new THREE.MeshStandardMaterial(
      { color: (C && C.team) || 0x3f7fd0, roughness: 0.84, metalness: 0.06 });

    /* the Trophy launchers: olive drab, as on the photographed mock-ups */
    /* the crew's kit in the bustle rack: weathered canvas, untextured, so
       repaints that swap the one textured paint leave it be */
    if (V.stow)
      T.kit = new THREE.MeshStandardMaterial({ color: 0x6b6246, roughness: 0.96, metalness: 0.02, flatShading: true });
    if (V.trophy)
      T.olive = new THREE.MeshStandardMaterial({ color: 0x4d5a38, roughness: 0.88, metalness: 0.06 });
    return T;
  }


  /* ------------------------------------------------------- lofted bodies */
  /* M.loft emits its quads wound (a, c, b) which, for the section walk it
     uses, puts the face normal radially INWARD: with the default FrontSide
     material the outer skin is culled and you look straight through the body
     at its own far wall - which is how a solid turret came to show the ring
     plate lying underneath it, and why every lofted hull in this project has
     read as a soft blob no matter what sq it was given. Flipping the winding
     here and recomputing normals costs nothing, keeps FrontSide (so the
     silhouette stays crisp and shadows stay right) and finally lets the
     squared-off sections read as flat plates. */
  function body(THREE, M, secs, segs) {
    var geo = M.loft(THREE, secs, segs);
    var ix = geo.getIndex ? geo.getIndex() : null;
    if (ix && ix.array) {
      var a = ix.array, i, t;
      for (i = 0; i + 2 < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
      geo.computeVertexNormals();
    }
    return geo;
  }

  /* --------------------------------------------------------- primitives */
  function box(THREE, p, w, d, h, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m);
    b.position.set(x, y, z);
    if (ry) b.rotation.y = ry;
    p.add(b);
    return b;
  }
  /* a cylinder's own axis is +Y, which for a road wheel IS the axle: do not
     roll it a quarter turn or the vehicle ends up standing on flat discs. */
  function wheelCyl(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), m);
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +X: for gun tubes and anything pointing forward */
  function tube(THREE, p, r1, r2, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.z = Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +Z: masts, pedestals, hatch rings */
  function post(THREE, p, r1, r2, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.x = Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }


  /* An XZ outline extruded across the vehicle and centred on y = yc: for
     boxes with a sloped face. No bevel, so the edges stay hard. */
  function prism(THREE, p, pts, depth, m, yc) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var geo = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false, steps: 1 });
    geo.rotateX(Math.PI / 2);          /* shape y -> world z; the depth runs toward -y */
    geo.computeVertexNormals();
    var b = new THREE.Mesh(geo, m);
    b.position.set(0, yc + depth / 2, 0);
    p.add(b);
    return b;
  }


  /* REWORK 2026-11 helpers --------------------------------------------- */
  /* A faceted solid through a station table [[x, [[y, z]...]]...]: every
     section a convex ring with the same point count, the whole convex, so
     each face is turned away from the solid's centroid and there is no
     winding to get wrong. Flat normals (an Abrams is plates); UVs are a box
     projection at uvs tiles a metre, so the paint's seams land on the
     plates at about the spacing they have on the lofted hull. */
  function facets(THREE, st, uvs) {
    var P = [], N = [], U = [], i, j, k, m = st.length, n = st[0][1].length;
    var V = [], cx = 0, cy = 0, cz = 0, c = 0;
    for (i = 0; i < m; i++) {
      V.push([]);
      for (j = 0; j < n; j++) {
        var q = [st[i][0], st[i][1][j][0], st[i][1][j][1]];
        V[i].push(q); cx += q[0]; cy += q[1]; cz += q[2]; c++;
      }
    }
    var ce = [cx / c, cy / c, cz / c];
    function tri(a, b, d) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (l < 1e-9) return;
      nx /= l; ny /= l; nz /= l;
      var ox = (a[0] + b[0] + d[0]) / 3 - ce[0], oy = (a[1] + b[1] + d[1]) / 3 - ce[1], oz = (a[2] + b[2] + d[2]) / 3 - ce[2];
      if (nx * ox + ny * oy + nz * oz < 0) { var t = b; b = d; d = t; nx = -nx; ny = -ny; nz = -nz; }
      var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz), v3 = [a, b, d];
      for (var e = 0; e < 3; e++) {
        var p = v3[e];
        P.push(p[0], p[1], p[2]); N.push(nx, ny, nz);
        if (az >= ax && az >= ay) U.push(p[0] * uvs, p[1] * uvs);
        else if (ay >= ax) U.push(p[0] * uvs, p[2] * uvs);
        else U.push(p[1] * uvs, p[2] * uvs);
      }
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      tri(V[i][j], V[i][k], V[i + 1][k]); tri(V[i][j], V[i + 1][k], V[i + 1][j]);
    }
    for (i = 0; i < m; i += m - 1) {
      var cc = [0, 0, 0];
      for (j = 0; j < n; j++) { cc[0] += V[i][j][0] / n; cc[1] += V[i][j][1] / n; cc[2] += V[i][j][2] / n; }
      for (j = 0; j < n; j++) tri(cc, V[i][j], V[i][(j + 1) % n]);
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
    return geo;
  }
  /* a symmetric section from its port half, listed roof edge down to the
     floor edge: [[y, z]...] -> the full ring */
  function ring(half) {
    var out = [], i;
    for (i = 0; i < half.length; i++) out.push([half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) out.push([-half[i][0], half[i][1]]);
    return out;
  }
  /* a round bar from a to b (tow cables, grab handles, rails) */
  function bar(THREE, p, a, b, r, seg, m) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-6) return null;
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 6), m);
    c.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
    p.add(c);
    return c;
  }
  /* a bent bar through a list of points (a grab handle, a cable run) */
  function rod(THREE, p, pts, r, seg, m) {
    for (var i = 0; i < pts.length - 1; i++) bar(THREE, p, pts[i], pts[i + 1], r, seg, m);
  }
  /* a U-shaped grab handle standing off a face whose outward normal is
     +Y (s = 1) or -Y (s = -1), along X at height z */
  function handleY(THREE, p, x, y, z, w, s, m) {
    rod(THREE, p, [[x - w / 2, y, z], [x - w / 2, y + s * 0.07, z], [x + w / 2, y + s * 0.07, z], [x + w / 2, y, z]], 0.014, 5, m);
  }

  /* ============================================================== HULL   */
  function buildHull(THREE, M, g, T) {
    var i, s;

    /* The lofted upper hull. Stations are written as (x, halfWidth, top,
       bottom) and converted, because a plate layout is easier to reason
       about than a centre-and-half-height. Repeated stations are creases:
       the zero-area quad between the twin rings contributes no normal, so
       computeVertexNormals stops averaging the deck into the glacis and the
       break comes out hard instead of as a rounded shoulder.
       sq is BELOW 1 so the section squares off - above 1 pinches it in and
       gives the rounded blob this project has produced before. */
    var st = [
      [X_TAIL,      1.62, 1.46, 0.98],
      [-3.800,      1.72, 1.48, 0.90],
      [-3.780,      1.72, 1.48, 0.90],   /* crease: tail plate break       */
      [ 0.300,      1.72, 1.48, 0.90],
      [ 0.320,      1.72, 1.48, 0.90],   /* crease: glacis break           */
      [ 2.100,      1.71, 1.09, 0.86],
      [ 3.200,      1.66, 0.85, 0.70],
      [ 3.800,      1.52, 0.70, 0.60],
      [X_NOSE,      1.34, 0.62, 0.58],
    ];
    var secs = [];
    for (i = 0; i < st.length; i++) {
      secs.push({ x: st[i][0], w: st[i][1],
                  h: (st[i][2] - st[i][3]) * 0.5,
                  zc: (st[i][2] + st[i][3]) * 0.5, sq: 0.09 });
    }
    g.add(new THREE.Mesh(body(THREE, M, secs, 32), T.skinL));

    /* lower tub between the tracks - the loft is the sponson box only, so
       without this the hull is hollow from the belly to the sponson floor */
    box(THREE, g, 7.15, 2.12, 0.48, T.skin, -0.30, 0, Z_BELLY + 0.24);

    /* nose underside: closes the wedge and gives the lower front plate */
    var np = new THREE.Mesh(M.slab(THREE,
      [[3.20, 0.46], [X_NOSE, 0.575], [X_NOSE, 0.74], [3.20, 0.80]], 2.60, "xz"),
      T.skin);
    np.position.y = 1.30;
    g.add(np);

    /* ---- REWORK 2026-11: the tail. The whole upper rear plate is the
       exhaust and cooling-air grille [P1 rear quarter, P3]: a framed recess
       with a heavy outer frame, eleven horizontal louvres and three vertical
       stiffeners across it; below it the lower tail plate with the towing
       pintle, the two tow eyes, the infantry telephone box at the right rear
       corner and the tail lamp clusters in their guards at the upper corners. */
    box(THREE, g, 0.09, 3.30, 0.62, T.skin, X_TAIL, 0, 1.17);
    box(THREE, g, 0.09, 2.20, 0.44, T.skin, X_TAIL + 0.01, 0, 0.72);
    box(THREE, g, 0.07, 2.02, 0.54, T.dark, X_TAIL - 0.02, 0, 1.15);
    box(THREE, g, 0.10, 2.14, 0.05, T.skinS, X_TAIL - 0.04, 0, 1.445);    /* frame: top    */
    box(THREE, g, 0.10, 2.14, 0.05, T.skinS, X_TAIL - 0.04, 0, 0.855);    /* bottom        */
    for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.10, 0.06, 0.64, T.skinS, X_TAIL - 0.04, s * 1.04, 1.15);
    for (i = 0; i < 11; i++)
      box(THREE, g, 0.05, 1.98, 0.022, T.metal, X_TAIL - 0.05, 0, 0.90 + i * 0.05, 0);
    for (i = -1; i <= 1; i++)
      box(THREE, g, 0.05, 0.035, 0.56, T.dark, X_TAIL - 0.07, i * 0.50, 1.15);
    /* hinges along the grille door's top edge */
    for (i = -2; i <= 2; i++)
      wheelCyl(THREE, g, 0.03, 0.14, 8, T.metal, X_TAIL - 0.06, i * 0.42, 1.47);
    box(THREE, g, 0.14, 0.26, 0.20, T.metal, X_TAIL - 0.03, 0, 0.64);     /* pintle body  */
    box(THREE, g, 0.05, 0.10, 0.08, T.metal, X_TAIL - 0.075, 0, 0.76);    /* pintle latch */
    for (s = -1; s <= 1; s += 2) {
      /* tail lamp clusters with their guard bars */
      box(THREE, g, 0.10, 0.22, 0.20, T.dark, X_TAIL - 0.005, s * 1.46, 1.34);
      box(THREE, g, 0.04, 0.16, 0.14, T.glass, X_TAIL - 0.055, s * 1.46, 1.34);
      rod(THREE, g, [[X_TAIL - 0.02, s * 1.33, 1.24], [X_TAIL - 0.085, s * 1.33, 1.24],
                     [X_TAIL - 0.085, s * 1.33, 1.46], [X_TAIL - 0.02, s * 1.33, 1.46]], 0.014, 5, T.metal);
      rod(THREE, g, [[X_TAIL - 0.02, s * 1.59, 1.24], [X_TAIL - 0.085, s * 1.59, 1.24],
                     [X_TAIL - 0.085, s * 1.59, 1.46], [X_TAIL - 0.02, s * 1.59, 1.46]], 0.014, 5, T.metal);
      bar(THREE, g, [X_TAIL - 0.085, s * 1.33, 1.46], [X_TAIL - 0.085, s * 1.59, 1.46], 0.014, 5, T.metal);
      /* tow eyes either side of the pintle, with the shackle hanging in each */
      box(THREE, g, 0.14, 0.10, 0.22, T.metal, X_TAIL + 0.02, s * 0.86, 0.80);
      var te = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 5, 10), T.metal);
      te.position.set(X_TAIL - 0.075, s * 0.86, 0.72); te.rotation.y = Math.PI / 2; g.add(te);
      /* the rear grab handles on the tail plate's upper corners */
      rod(THREE, g, [[X_TAIL - 0.01, s * 1.20, 1.06], [X_TAIL - 0.08, s * 1.20, 1.06],
                     [X_TAIL - 0.08, s * 1.40, 1.06], [X_TAIL - 0.01, s * 1.40, 1.06]], 0.014, 5, T.metal);
    }
    /* infantry telephone box, right rear corner */
    box(THREE, g, 0.12, 0.26, 0.30, T.skinS, X_TAIL - 0.04, -1.30, 0.80);
    box(THREE, g, 0.02, 0.20, 0.22, T.dark,  X_TAIL - 0.09, -1.30, 0.80);

    /* ---- engine deck: two pairs of louvred grille doors behind the turret
       [P1][P3], each a dark recess in a raised frame with eight slats, the
       hinges on the outboard edge and a lifting handle at the inner corner -- */
    for (i = 0; i < 2; i++) {
      var gx = -1.95 - i * 1.30;
      box(THREE, g, 1.18, 2.70, 0.06, T.dark, gx, 0, Z_DECK - 0.03);
      box(THREE, g, 1.22, 0.05, 0.05, T.skinS, gx, 0, Z_DECK + 0.025);              /* centre join */
      for (s = -1; s <= 1; s += 2) {
        box(THREE, g, 1.22, 0.06, 0.05, T.skinS, gx, s * 1.36, Z_DECK + 0.025);     /* side frames */
        box(THREE, g, 0.05, 1.36, 0.05, T.skinS, gx + 0.60, s * 0.68, Z_DECK + 0.025);
        box(THREE, g, 0.05, 1.36, 0.05, T.skinS, gx - 0.60, s * 0.68, Z_DECK + 0.025);
        for (var k = 0; k < 8; k++)
          box(THREE, g, 0.085, 1.26, 0.035, T.metal, gx - 0.50 + k * 0.143, s * 0.68, Z_DECK + 0.012, 0);
        for (k = 0; k < 3; k++)
          wheelCyl(THREE, g, 0.028, 0.10, 8, T.metal, gx - 0.42 + k * 0.42, s * 1.40, Z_DECK + 0.05);
        handleY(THREE, g, gx + 0.40, s * 0.10, Z_DECK + 0.05, 0.16, s, T.metal);
      }
    }
    /* deck edge rails, and the fuel filler caps that break the flat top */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.86, 0.10, 0.07, T.skinS, -2.48, s * 1.58, Z_DECK + 0.035);
      post(THREE, g, 0.17, 0.17, 0.05, 10, T.skinS, -1.25, s * 1.05, Z_DECK + 0.03);
      post(THREE, g, 0.11, 0.11, 0.04, 10, T.metal, -1.25, s * 1.05, Z_DECK + 0.07);
      box(THREE, g, 0.04, 0.16, 0.03, T.metal, -1.25, s * 1.05, Z_DECK + 0.10);
    }
    /* the two tow cables, coiled along the deck edges outboard of the grille
       doors: each a run of round bar ending in its thimble eye at the front
       (NOT CONFIRMED: their stowage is drawn as on the TUSK photographs) */
    for (s = -1; s <= 1; s += 2) {
      var cy0 = s * 1.48;
      rod(THREE, g, [[-1.30, cy0, Z_DECK + 0.10], [-3.55, cy0, Z_DECK + 0.10],
                     [-3.65, s * 1.40, Z_DECK + 0.10], [-3.55, s * 1.33, Z_DECK + 0.10],
                     [-1.40, s * 1.33, Z_DECK + 0.10]], 0.022, 6, T.dark);
      var ey = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 5, 10), T.metal);
      ey.position.set(-1.22, cy0, Z_DECK + 0.10); g.add(ey);
      ey = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 5, 10), T.metal);
      ey.position.set(-1.32, s * 1.33, Z_DECK + 0.10); g.add(ey);
      for (k = 0; k < 3; k++) box(THREE, g, 0.05, 0.24, 0.04, T.dark, -1.9 - k * 0.7, s * 1.41, Z_DECK + 0.13);
    }

    /* ---- glacis fittings ---- */
    /* driver's hatch, on the centreline, with its three periscopes, their
       armoured hoods and the hatch's hinge and handle */
    post(THREE, g, 0.30, 0.30, 0.055, 14, T.skinS, 2.62, 0, 0.985);
    post(THREE, g, 0.24, 0.24, 0.03, 14, T.skinS, 2.62, 0, 1.02);
    box(THREE, g, 0.12, 0.40, 0.08, T.metal, 2.32, 0, 1.03);
    handleY(THREE, g, 2.70, -0.10, 1.04, 0.14, -1, T.metal);
    for (i = -1; i <= 1; i++) {
      box(THREE, g, 0.11, 0.20, 0.075, T.dark, 2.86, i * 0.30, 1.02);
      box(THREE, g, 0.03, 0.16, 0.055, T.glass, 2.81, i * 0.30, 1.025);
      box(THREE, g, 0.16, 0.24, 0.025, T.skinS, 2.88, i * 0.30, 1.07);
    }
    /* the glacis plate's lifting eyes and the two front grab handles */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.12, 0.06, 0.10, T.metal, 2.30, s * 1.30, 1.12);
      box(THREE, g, 0.12, 0.06, 0.10, T.metal, 3.30, s * 1.10, 0.86);
      rod(THREE, g, [[2.95, s * 0.80, 0.84], [3.00, s * 0.80, 0.92], [3.20, s * 0.80, 0.84], [3.25, s * 0.80, 0.76]], 0.014, 5, T.metal);
    }
    /* headlight clusters in their brush guards, one each side of the nose:
       the lamp box, a guard of three bars over it [P2] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.20, 0.30, 0.22, T.skinS, 3.53, s * 1.16, 0.70);
      box(THREE, g, 0.04, 0.12, 0.11, T.glass, 3.64, s * 1.23, 0.73);
      box(THREE, g, 0.04, 0.11, 0.09, T.glass, 3.64, s * 1.08, 0.67);
      box(THREE, g, 0.22, 0.04, 0.24, T.metal, 3.55, s * 1.32, 0.70);
      box(THREE, g, 0.22, 0.04, 0.24, T.metal, 3.55, s * 1.00, 0.70);
      rod(THREE, g, [[3.48, s * 1.00, 0.84], [3.70, s * 1.00, 0.84], [3.70, s * 1.32, 0.84], [3.48, s * 1.32, 0.84]], 0.016, 5, T.metal);
      bar(THREE, g, [3.70, s * 1.00, 0.84], [3.70, s * 1.00, 0.58], 0.016, 5, T.metal);
      bar(THREE, g, [3.70, s * 1.32, 0.84], [3.70, s * 1.32, 0.58], 0.016, 5, T.metal);
      bar(THREE, g, [3.70, s * 1.16, 0.84], [3.70, s * 1.16, 0.58], 0.012, 5, T.metal);
    }
    /* tow shackles on the nose: the lug and the hanging U-shackle [P2] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.30, 0.13, 0.16, T.metal, 3.86, s * 0.52, 0.70);
      var sh = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.022, 5, 10, Math.PI), T.metal);
      sh.position.set(4.02, s * 0.52, 0.66); sh.rotation.set(Math.PI / 2, 0, 0); sh.rotation.y = Math.PI / 2;
      g.add(sh);
    }

    /* ---- front fenders: thin plates over the front of the track, raked to
       lie along the glacis instead of floating clear of it at the nose ---- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.42, 0.60, 0.22, T.skinS, 2.92, s * 1.50, 0.86, 0.219);
      box(THREE, g, 0.06, 0.60, 0.26, T.skinS, 2.23, s * 1.50, 1.09);
      /* rear mudflap behind the sprocket, ribbed, on its bracket, and the
         front skirt flap */
      box(THREE, g, 0.06, 0.60, 0.46, T.rub, -3.62, s * 1.44, 0.42);
      for (k = 0; k < 4; k++) box(THREE, g, 0.02, 0.56, 0.025, T.rub, -3.66, s * 1.44, 0.26 + k * 0.10);
      box(THREE, g, 0.10, 0.62, 0.05, T.metal, -3.60, s * 1.44, 0.665);
      box(THREE, g, 0.05, 0.30, 0.34, T.rub, 3.46, s * 1.69, 0.42);
    }

    /* ---- hull side stowage boxes on the rear sponsons, behind the bustle
       (the old forward pair sat under the bustle and fouled its traverse):
       lid, hinge line, two hasps each ---- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.70, 0.38, 0.26, T.skinS, -3.30, s * 1.24, 1.61);
      box(THREE, g, 0.74, 0.42, 0.03, T.skinS, -3.30, s * 1.24, 1.755);
      bar(THREE, g, [-3.64, s * 1.44, 1.74], [-2.96, s * 1.44, 1.74], 0.015, 6, T.metal);
      box(THREE, g, 0.04, 0.02, 0.08, T.metal, -3.45, s * 1.05, 1.70);
      box(THREE, g, 0.04, 0.02, 0.08, T.metal, -3.15, s * 1.05, 1.70);
    }
  }

  /* ====================================================== RUNNING GEAR   */
  function buildRunningGear(THREE, g, T) {
    var s, i, j;
    var dx = (WX0 - WX1) / (N_WHEEL - 1);

    /* the belt path in side profile, walked as a closed loop. Writing it as
       a path rather than as two straight slabs is what puts the track UP and
       OVER the raised rear sprocket, which is most of how the rear-drive
       layout reads at a glance. */
    var P = [
      [-2.95, 0.085], [ 2.95, 0.085],
      [ 3.30, 0.28], [ 3.46, 0.52], [ 3.24, 0.83],
      [ 2.55, 0.87], [-2.55, 0.95],
      [-3.05, 1.00], [-3.48, 0.80], [-3.55, 0.50], [-3.24, 0.18]
    ];

    for (s = -1; s <= 1; s += 2) {
      var y = s * TY;

      /* --- belt: one box per path segment, plus pads walked along it --- */
      for (i = 0; i < P.length; i++) {
        var a = P[i], b = P[(i + 1) % P.length];
        var ddx = b[0] - a[0], ddz = b[1] - a[1];
        var len = Math.sqrt(ddx * ddx + ddz * ddz);
        if (len < 1e-4) continue;
        var th = Math.atan2(ddz, ddx);
        box(THREE, g, len + TT * 0.6, BW, TT, T.rub,
            (a[0] + b[0]) * 0.5, y, (a[1] + b[1]) * 0.5, -th);
        /* track pads: the link pattern is the strongest read on a track and
           METAL carries no texture, so it has to be geometry */
        var np = Math.max(1, Math.round(len / 0.34));
        for (j = 0; j < np; j++) {
          var t = (j + 0.5) / np;
          var px = a[0] + ddx * t, pz = a[1] + ddz * t;
          /* the loop is walked counter-clockwise in XZ, so the OUTWARD
             normal is the tangent turned -90 degrees. Getting this backwards
             put the ground pads on top of the belt. */
          var nx = Math.sin(th), nz = -Math.cos(th);
          box(THREE, g, 0.20, BW * 1.04, 0.05, T.dark,
              px + nx * TT * 0.52, y, pz + nz * TT * 0.52, -th);
        }
      }

      /* --- seven road wheels --- */
      for (i = 0; i < N_WHEEL; i++) {
        var wx = WX0 - i * dx;
        wheelCyl(THREE, g, WR, BW * 0.88, 14, T.rub, wx, y, WZ);
        /* the dished aluminium disc, proud of the tyre on the outer face */
        wheelCyl(THREE, g, WR * 0.62, BW * 0.96, 12, T.dark, wx, y, WZ);
        wheelCyl(THREE, g, WR * 0.22, BW * 1.02, 8, T.metal, wx, y, WZ);
        /* REWORK: the hub's nut ring on the outer face */
        for (j = 0; j < 8; j++) {
          var na = j * Math.PI / 4 + 0.2;
          box(THREE, g, 0.035, 0.03, 0.035, T.metal, wx + Math.cos(na) * WR * 0.40,
              y + s * BW * 0.50, WZ + Math.sin(na) * WR * 0.40);
        }
        /* torsion-bar arm anchor, so the suspension is not a bare cylinder */
        box(THREE, g, 0.30, 0.10, 0.16, T.dark, wx + 0.22, s * (TY - 0.34), WZ + 0.10);
      }

      /* --- REAR drive sprocket: hub plus real teeth --- */
      wheelCyl(THREE, g, SPR.r, BW * 0.66, 14, T.dark, SPR.x, y, SPR.z);
      wheelCyl(THREE, g, SPR.r * 0.42, BW * 0.90, 10, T.metal, SPR.x, y, SPR.z);
      for (i = 0; i < 12; i++) {
        var ang = i * Math.PI * 2 / 12;
        box(THREE, g, 0.13, BW * 0.60, 0.15, T.metal,
            SPR.x + Math.cos(ang) * SPR.tr, y, SPR.z + Math.sin(ang) * SPR.tr, -ang);
      }
      /* final drive housing where the sprocket meets the hull */
      wheelCyl(THREE, g, 0.30, 0.22, 12, T.skinS, SPR.x, s * (TY - 0.42), SPR.z);

      /* --- front compensating idler --- */
      wheelCyl(THREE, g, IDL.r, BW * 0.80, 14, T.rub, IDL.x, y, IDL.z);
      wheelCyl(THREE, g, IDL.r * 0.52, BW * 0.94, 10, T.dark, IDL.x, y, IDL.z);

      /* --- two return rollers carrying the top run --- */
      for (i = 0; i < 2; i++)
        wheelCyl(THREE, g, 0.115, BW * 0.50, 10, T.dark,
                 1.15 - i * 2.30, y, 0.80);
    }
  }

  /* =========================================================== SKIRTS    */
  /* REWORK 2026-11, off the SEPv3 side photograph [P1] (141 px a metre on
     the 7.93 m hull): the skirt is NOT eight equal plates. From the tail:
     a short panel over the sprocket whose lower edge stands high (0.92 m)
     so the sprocket shows under it; five light panels with their joints at
     -2.90, -1.69, -1.09, -0.21 and +0.50 m; a sixth to +1.32; then the
     heavy front section, one long armour panel to the nose whose lower
     edge climbs from the wheel tops to 0.82 m at its angled front end.
     Every joint carries a hinge block at the top and a catch half way
     down [P1]; the top edge is a folded lip; a rubber strip hangs from the
     light panels' lower edge. */
  function buildSkirts(THREE, M, g, T) {
    var s, i, k;
    var J = [-3.82, -2.90, -1.69, -1.09, -0.21, 0.50, 1.32];
    for (s = -1; s <= 1; s += 2) {
      var yc = s * (SK_Y + SK_TH * 0.5);
      var yo = s * (SK_Y + SK_TH + 0.012);          /* proud of the outer face */
      /* the hanger rail and folded top lip running the whole band */
      box(THREE, g, J[J.length - 1] - J[0] + 0.10, SK_TH * 1.6, 0.09, T.skinS,
          (J[0] + J[J.length - 1]) * 0.5, yc, SK_TOP - 0.02);
      box(THREE, g, J[J.length - 1] - J[0] + 0.10, 0.10, 0.025, T.skinS,
          (J[0] + J[J.length - 1]) * 0.5, s * (SK_Y + 0.02), SK_TOP + 0.03);
      for (i = 0; i < J.length - 1; i++) {
        var x0 = J[i] + 0.009, x1 = J[i + 1] - 0.009, bot = i === 0 ? 0.92 : SK_BOT;
        var h = SK_TOP - 0.09 - bot;
        box(THREE, g, x1 - x0, SK_TH, h, T.skinS, (x0 + x1) * 0.5, yc, bot + h * 0.5);
        /* a stiffening flange along the lower edge, and the rubber strip */
        box(THREE, g, x1 - x0, SK_TH * 1.5, 0.05, T.skinS, (x0 + x1) * 0.5, yc + s * 0.01, bot + 0.03);
        if (i > 0) box(THREE, g, x1 - x0, 0.02, 0.07, T.rub, (x0 + x1) * 0.5, s * (SK_Y + 0.01), bot - 0.035);
        /* two lightening-panel recesses outlined on the bigger plates */
        if (x1 - x0 > 0.80) {
          box(THREE, g, x1 - x0 - 0.20, 0.008, 0.02, T.dark, (x0 + x1) * 0.5, yo, SK_TOP - 0.20);
          box(THREE, g, x1 - x0 - 0.20, 0.008, 0.02, T.dark, (x0 + x1) * 0.5, yo, bot + 0.16);
        }
        /* bolt heads along the top, through the hanger rail */
        for (k = 0; k < Math.max(2, Math.round((x1 - x0) / 0.22)); k++)
          box(THREE, g, 0.03, 0.02, 0.03, T.metal, x0 + 0.08 + k * 0.22, yo, SK_TOP - 0.06);
      }
      /* the joints: a dark gap strip, the top hinge block, the mid catch */
      for (i = 1; i < J.length; i++) {
        var bj = i === 1 ? 0.92 : SK_BOT;
        box(THREE, g, 0.022, SK_TH * 1.9, SK_TOP - 0.09 - bj, T.dark, J[i], yc, (SK_TOP - 0.09 + bj) * 0.5);
        box(THREE, g, 0.10, 0.05, 0.09, T.metal, J[i], s * (SK_Y + SK_TH + 0.02), SK_TOP - 0.10);
        wheelCyl(THREE, g, 0.02, 0.05, 6, T.metal, J[i], s * (SK_Y + SK_TH + 0.03), SK_TOP - 0.10);
        box(THREE, g, 0.06, 0.04, 0.12, T.metal, J[i], s * (SK_Y + SK_TH + 0.015), (SK_TOP + bj) * 0.5 - 0.05);
      }

      /* the heavy front section: thicker, its bottom edge rising toward the
         angled front end [P1]; three bolt rows and a handle on its face */
      var hp = [[1.32, SK_BOT - 0.06], [2.90, 0.40], [3.40, 0.56], [3.62, 0.82],
                [3.40, SK_TOP], [1.32, SK_TOP]];
      var hm = new THREE.Mesh(M.slab(THREE, hp, SK_TH * 1.5, "xz"), T.skinS);
      /* 0.03 m inboard of where it first sat, so the hull is 3.68 m over the
         skirts, the published 3.66 m, and not 3.74 m */
      hm.position.y = s > 0 ? SK_Y + SK_TH * 1.5 - 0.03 : -SK_Y + 0.03;
      g.add(hm);
      var yh = s * (SK_Y + SK_TH * 1.5 - 0.03 + 0.008);
      for (k = 0; k < 10; k++) box(THREE, g, 0.035, 0.02, 0.035, T.metal, 1.45 + k * 0.20, yh, SK_TOP - 0.07);
      for (k = 0; k < 8; k++) box(THREE, g, 0.035, 0.02, 0.035, T.metal, 1.45 + k * 0.20, yh, 0.58 + k * 0.004);
      box(THREE, g, 1.70, 0.012, 0.022, T.dark, 2.22, yh, 0.98);
      box(THREE, g, 0.022, 0.012, 0.66, T.dark, 2.40, yh, 0.92);
    }
  }


  /* =========================================================== TURRET    */
  function buildTurret(THREE, M, T, V) {
    var t = new THREE.Group();
    t.name = "turret";                 /* the renderer rotates this by name */
    t.position.set(TUR.x, 0, TUR.z);
    var i, j, k, s;

    /* REWORK 2026-11: the faceted body. The old pass lofted a squared
       ellipse, which gave a soft pillow; the photographs [P1][P2] show plates.
       Each station is now a ring of eight corners (port half listed): the roof
       edge, the break where the upper side bevel meets the vertical side, the
       break where the side turns under, and the floor edge - so the turret
       carries its upper bevel, its vertical flank and the undercut below it
       along its whole length. The front corner station at x 1.50 and the
       mantlet station at 2.05 make the two cheek faces, swept back about
       30 degrees, the roof dropping toward the front [P2]. Off [P1]: roof
       2.41 m, turret floor 1.49 m, cheek front top 0.70 m above the deck. */
    var st = [
      [-2.55, ring([[1.28, 0.88], [1.44, 0.68], [1.44, 0.34], [1.34, 0.17]])],
      [-1.50, ring([[1.42, 0.94], [1.62, 0.72], [1.62, 0.28], [1.46, 0.03]])],
      [ 0.50, ring([[1.44, 0.94], [1.66, 0.72], [1.66, 0.22], [1.48, -0.02]])],
      [ 1.50, ring([[1.26, 0.90], [1.50, 0.70], [1.52, 0.22], [1.36, 0.00]])],
      [ 2.05, ring([[0.44, 0.72], [0.56, 0.64], [0.58, 0.22], [0.50, 0.10]])]
    ];
    t.add(new THREE.Mesh(facets(THREE, st, 0.30), T.skin));

    /* bustle rear plate and its welded edge strips */
    box(THREE, t, 0.06, 2.80, 0.66, T.skinL, -2.565, 0, 0.53);
    /* turret ring skirt, so the bustle does not float over the deck */
    post(THREE, t, 0.94, 0.94, 0.12, 16, T.dark, -0.05, 0, -0.05);
    /* the weld seams where the cheek armour modules meet the roof, and the
       two big bolted cheek-armour access plates on the roof front [P2] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, t, 0.80, 0.70, 0.025, T.skinS, 1.12, s * 0.98, 0.915, 0);
      for (k = 0; k < 4; k++) box(THREE, t, 0.035, 0.035, 0.02, T.metal, 0.80 + k * 0.21, s * 0.70, 0.935);
      for (k = 0; k < 4; k++) box(THREE, t, 0.035, 0.035, 0.02, T.metal, 0.80 + k * 0.21, s * 1.26, 0.935);
    }

    /* ---- mantlet and the 120 mm M256 smoothbore ---- */
    box(THREE, t, 0.34, 1.02, 0.62, T.skin, 2.10, 0, 0.44);
    box(THREE, t, 0.06, 0.86, 0.50, T.dark, 2.28, 0, 0.44);              /* the gun shield's face */
    tube(THREE, t, 0.20, 0.20, 0.30, 12, T.metal, 2.24, 0, 0.44);
    tube(THREE, t, 0.23, 0.20, 0.10, 12, T.rub,   2.36, 0, 0.44);        /* the dust boot */
    /* coaxial M240 port and the gunner's auxiliary sight port beside it */
    box(THREE, t, 0.06, 0.12, 0.10, T.dark, 2.29, 0.32, 0.56);
    tube(THREE, t, 0.022, 0.022, 0.16, 6, T.metal, 2.36, 0.32, 0.56);
    box(THREE, t, 0.06, 0.12, 0.12, T.dark, 2.29, -0.33, 0.60);
    /* thermal shroud in its clamped sections, the step down to the bare
       tube, the bore evacuator, the muzzle reference sensor on the muzzle */
    tube(THREE, t, 0.135, 0.135, 1.70, 16, T.metal, 3.20, 0, 0.44);
    for (k = 0; k < 4; k++) tube(THREE, t, 0.145, 0.145, 0.04, 16, T.dark, 2.50 + k * 0.45, 0, 0.44);
    tube(THREE, t, 0.080, 0.080, 3.05, 14, T.metal, 4.03, 0, 0.44);
    tube(THREE, t, 0.142, 0.142, 0.66, 14, T.metal, 4.42, 0, 0.44);
    tube(THREE, t, 0.150, 0.150, 0.04, 14, T.dark, 4.10, 0, 0.44);
    tube(THREE, t, 0.150, 0.150, 0.04, 14, T.dark, 4.74, 0, 0.44);
    tube(THREE, t, 0.093, 0.093, 0.20, 12, T.metal, GUN_TIP - 0.10, 0, 0.44);
    box(THREE, t, 0.12, 0.08, 0.07, T.dark, GUN_TIP - 0.16, 0, 0.56);
    box(THREE, t, 0.06, 0.06, 0.06, T.metal, 2.40, 0, 0.66);              /* MRS collimator */

    /* ---- the M1A2 tell: commander's independent thermal viewer, standing
       proud of the roof on its pedestal, forward and LEFT of the cupola.
       The M1A1 has bare roof here. The head is the drum-backed box seen in
       [P2]: the armoured head, its window frame, the rear drum and the
       sun hood. ---- */
    if (V.citv) {
      post(THREE, t, 0.19, 0.22, 0.10, 12, T.skinS, 0.52, 0.46, 0.99);
      post(THREE, t, 0.16, 0.19, 0.22, 12, T.metal, 0.52, 0.46, 1.10);
      box(THREE, t, 0.40, 0.36, 0.34, T.skinS, 0.52, 0.46, 1.33);
      wheelCyl(THREE, t, 0.17, 0.38, 14, T.skinS, 0.36, 0.46, 1.33);       /* rear drum      */
      box(THREE, t, 0.07, 0.30, 0.22, T.dark,   0.73, 0.46, 1.34);
      box(THREE, t, 0.03, 0.24, 0.17, T.glass,  0.77, 0.46, 1.34);
      box(THREE, t, 0.05, 0.36, 0.04, T.skinS,  0.76, 0.46, 1.47);         /* frame: top     */
      box(THREE, t, 0.05, 0.36, 0.04, T.skinS,  0.76, 0.46, 1.21);         /* frame: bottom  */
      box(THREE, t, 0.46, 0.40, 0.05, T.skinS,  0.53, 0.46, 1.52);         /* sun hood       */
      for (k = 0; k < 3; k++) box(THREE, t, 0.03, 0.02, 0.03, T.metal, 0.40 + k * 0.12, 0.66, 1.40);
    }

    /* ---- gunner's primary sight, armoured hood on the roof front right,
       its two ballistic doors folded open up and out from the window [P2] -- */
    box(THREE, t, 0.52, 0.46, 0.30, T.skinS, 0.92, -0.52, 1.09);
    box(THREE, t, 0.06, 0.34, 0.24, T.dark,  1.20, -0.52, 1.10);
    box(THREE, t, 0.03, 0.28, 0.19, T.glass, 1.24, -0.52, 1.10);
    box(THREE, t, 0.08, 0.46, 0.04, T.skinS, 1.20, -0.52, 1.245);          /* window frame   */
    box(THREE, t, 0.08, 0.46, 0.04, T.skinS, 1.20, -0.52, 0.965);
    for (s = -1; s <= 1; s += 2) {
      var dr = new THREE.Group();
      dr.position.set(1.20, -0.52 + s * 0.23, 1.10);
      dr.rotation.z = s * 0.95;                                            /* hinged at the side */
      box(THREE, dr, 0.05, 0.20, 0.28, T.skinS, 0.03, s * 0.10, 0);
      box(THREE, dr, 0.02, 0.14, 0.04, T.metal, 0.06, s * 0.12, 0.06);
      t.add(dr);
      wheelCyl(THREE, t, 0.022, 0.06, 6, T.metal, 1.20, -0.52 + s * 0.23, 1.03);
      wheelCyl(THREE, t, 0.022, 0.06, 6, T.metal, 1.20, -0.52 + s * 0.23, 1.17);
    }
    /* the gunner's hatch behind the sight, with its hinge */
    post(THREE, t, 0.24, 0.24, 0.04, 12, T.skinS, 0.30, -0.40, 0.955);
    box(THREE, t, 0.08, 0.30, 0.05, T.metal, 0.08, -0.40, 0.97);
    /* the gunner's auxiliary sight port beside it */
    box(THREE, t, 0.18, 0.16, 0.14, T.dark,  1.34, -0.16, 1.00);

    /* ---- commander's cupola, right of the centreline: ring, hatch, six
       vision blocks in their armoured surrounds ---- */
    var cx = -0.30, cy = -0.74;
    post(THREE, t, 0.50, 0.50, 0.20, 16, T.skinS, cx, cy, 1.03);
    post(THREE, t, 0.40, 0.40, 0.09, 12, T.skinS, cx, cy, 1.17);
    for (i = 0; i < 6; i++) {
      var a = i * Math.PI * 2 / 6 + 0.4;
      box(THREE, t, 0.16, 0.13, 0.11, T.glass,
          cx + Math.cos(a) * 0.47, cy + Math.sin(a) * 0.47, 1.05, -a);
      box(THREE, t, 0.04, 0.17, 0.03, T.skinS,
          cx + Math.cos(a) * 0.50, cy + Math.sin(a) * 0.50, 1.125, -a);
    }
    if (V.crows) {
      /* CROWS-LP: the .50 and its day and thermal sensors in an armoured
         head on a short riser, fired from under armour. It replaces the
         ring-mounted M2. Riser, turntable, the cradle's two side plates, the
         M2 with its barrel jacket and the ammunition box on the left, the
         sensor box with its two windows on the right [P1][P2]. */
      box(THREE, t, 0.44, 0.44, 0.22, T.skinS, cx, cy, 1.31);                /* riser over the ring  */
      post(THREE, t, 0.24, 0.24, 0.06, 14, T.metal, cx, cy, 1.45);           /* turntable            */
      box(THREE, t, 0.60, 0.38, 0.28, T.skinS, cx + 0.04, cy, 1.53);         /* head                 */
      for (s = -1; s <= 1; s += 2)
        box(THREE, t, 0.42, 0.04, 0.30, T.skinS, cx + 0.16, cy + 0.12 + s * 0.11, 1.74);  /* cradle plates */
      box(THREE, t, 0.20, 0.28, 0.20, T.dark,  cx + 0.30, cy - 0.10, 1.53);  /* sensor housing       */
      box(THREE, t, 0.03, 0.10, 0.10, T.glass, cx + 0.405, cy - 0.16, 1.55); /* day camera           */
      box(THREE, t, 0.03, 0.10, 0.10, T.glass, cx + 0.405, cy - 0.04, 1.55); /* thermal              */
      box(THREE, t, 0.08, 0.30, 0.04, T.skinS, cx + 0.33, cy - 0.10, 1.65);  /* its sun shade        */
      box(THREE, t, 0.46, 0.12, 0.14, T.metal, cx + 0.34, cy + 0.12, 1.74);  /* M2 receiver          */
      box(THREE, t, 0.10, 0.10, 0.10, T.metal, cx + 0.05, cy + 0.12, 1.74);  /* back plate           */
      tube(THREE, t, 0.036, 0.036, 0.78, 8, T.metal, cx + 0.95, cy + 0.12, 1.74);  /* barrel          */
      tube(THREE, t, 0.050, 0.050, 0.28, 8, T.dark,  cx + 0.70, cy + 0.12, 1.74);  /* barrel jacket   */
      box(THREE, t, 0.26, 0.16, 0.18, T.dark,  cx - 0.06, cy + 0.30, 1.58);  /* ammunition box       */
      box(THREE, t, 0.10, 0.10, 0.06, T.metal, cx + 0.12, cy + 0.24, 1.70);  /* feed chute           */
    } else {
      /* the .50 cal on its ring mount, the ammunition box on its tray */
      box(THREE, t, 0.14, 0.14, 0.24, T.metal, cx + 0.30, cy, 1.32);
      box(THREE, t, 0.62, 0.14, 0.16, T.metal, cx + 0.46, cy, 1.46);
      tube(THREE, t, 0.045, 0.045, 0.80, 8, T.metal, cx + 1.10, cy, 1.47);
      tube(THREE, t, 0.060, 0.060, 0.22, 8, T.dark,  cx + 0.86, cy, 1.47);
      box(THREE, t, 0.20, 0.26, 0.22, T.dark,   cx + 0.20, cy - 0.16, 1.40);
      box(THREE, t, 0.34, 0.06, 0.30, T.metal,  cx + 0.62, cy + 0.14, 1.52);
      rod(THREE, t, [[cx + 0.16, cy - 0.06, 1.46], [cx + 0.06, cy - 0.06, 1.52], [cx + 0.06, cy + 0.06, 1.52], [cx + 0.16, cy + 0.06, 1.46]], 0.014, 5, T.metal);
    }

    /* ---- loader's hatch and skate-mounted M240, left of the centreline:
       the hatch on its hinge, the skate ring round it, the pintle, the M240
       with its butt, ammunition can and folded bipod [P2] ---- */
    var lx = -0.18, ly = 0.76;
    post(THREE, t, 0.36, 0.36, 0.07, 14, T.skinS, lx, ly, 0.98);
    post(THREE, t, 0.44, 0.44, 0.05, 12, T.metal, lx, ly, 0.96);
    box(THREE, t, 0.10, 0.34, 0.06, T.metal, lx - 0.36, ly, 1.00);         /* hatch hinge */
    handleY(THREE, t, lx + 0.10, ly - 0.05, 1.03, 0.14, -1, T.metal);
    box(THREE, t, 0.12, 0.12, 0.26, T.metal, lx + 0.40, ly + 0.10, 1.10);
    box(THREE, t, 0.44, 0.10, 0.12, T.metal, lx + 0.56, ly + 0.10, 1.26);
    box(THREE, t, 0.20, 0.06, 0.10, T.metal, lx + 0.26, ly + 0.10, 1.24);   /* butt */
    tube(THREE, t, 0.032, 0.032, 0.50, 8, T.metal, lx + 0.98, ly + 0.10, 1.26);
    box(THREE, t, 0.16, 0.10, 0.12, T.dark, lx + 0.52, ly + 0.20, 1.20);    /* ammo can */
    box(THREE, t, 0.04, 0.10, 0.03, T.metal, lx + 0.52, ly + 0.20, 1.27);

    /* ---- smoke grenade launchers: an M250 bank of six on each turret
       flank just behind the front corner, aimed forward, out and up [P2]:
       the mounting plate, the tubes in two rows, their caps ---- */
    for (s = -1; s <= 1; s += 2) {
      var bank = new THREE.Group();
      bank.position.set(1.36, s * 1.56, 0.80);
      bank.rotation.z = -s * 0.45;      /* toe out */
      var tilt = new THREE.Group();
      tilt.rotation.y = -0.35;          /* muzzles up */
      bank.add(tilt);
      box(THREE, tilt, 0.10, 0.42, 0.30, T.skinS, -0.04, 0, 0);
      for (i = 0; i < 6; i++) {
        var by = -0.14 + (i % 3) * 0.14, bz = (i < 3 ? -0.075 : 0.075);
        tube(THREE, tilt, 0.055, 0.055, 0.26, 8, T.dark, 0.12, by, bz);
        tube(THREE, tilt, 0.060, 0.060, 0.02, 8, T.rub, 0.25, by, bz);
      }
      box(THREE, tilt, 0.06, 0.46, 0.04, T.metal, 0.06, 0, -0.17);
      t.add(bank);
      /* the bracket back to the turret side */
      box(THREE, t, 0.26, 0.10, 0.16, T.skinS, 1.24, s * 1.50, 0.80);
    }

    /* ---- the deep stowage bustle rack: an open tubular basket on the
       tail, its top and bottom rails round three sides, uprights every
       0.40 m, the mesh panels inside, and (where the row has it) the crew's
       kit loaded in it: duffel bags, a rolled tarpaulin, ration boxes and
       two water cans [P1][P3] ---- */
    var RX0 = -2.60, RX1 = -3.06, RY = 1.36, RZ0 = 0.28, RZ1 = 0.87;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, t, 0.05, 0.05, 0.64, T.metal, -2.63, s * RY, 0.56);
      box(THREE, t, 0.05, 0.05, 0.64, T.metal, RX1 + 0.04, s * 1.14, 0.56);
      box(THREE, t, 0.45, 0.05, 0.05, T.metal, -2.83, s * 1.25, RZ1);
      box(THREE, t, 0.45, 0.05, 0.05, T.metal, -2.83, s * 1.25, RZ0);
      box(THREE, t, 0.45, 0.05, 0.04, T.metal, -2.83, s * 1.25, (RZ0 + RZ1) / 2);
      box(THREE, t, 0.04, 0.04, 0.60, T.metal, -2.83, s * 1.25, 0.58);     /* side upright */
      /* side stowage box carried on the turret flank (the Trophy launchers
         take this place on the M1A2C): lid, hinge bar, two hasps, and the
         stowage rails over it [P1] */
      if (!V.trophy) {
        box(THREE, t, 1.30, 0.24, 0.44, T.skinS, -1.10, s * 1.71, 0.60);
        box(THREE, t, 1.34, 0.28, 0.03, T.skinS, -1.10, s * 1.71, 0.835);
        bar(THREE, t, [-1.75, s * 1.84, 0.82], [-0.45, s * 1.84, 0.82], 0.016, 6, T.metal);
        for (k = -1; k <= 1; k += 2) box(THREE, t, 0.05, 0.03, 0.09, T.metal, -1.10 + k * 0.40, s * 1.84, 0.74);
        for (k = 0; k < 4; k++) box(THREE, t, 0.04, 0.10, 0.04, T.metal, -1.62 + k * 0.35, s * 1.62, 0.82);
      }
    }
    for (i = 0; i < 3; i++)
      box(THREE, t, 0.05, 2.42, 0.05, T.metal, RX1 + 0.04, 0, 0.30 + i * 0.29);
    for (i = -2; i <= 2; i++)
      box(THREE, t, 0.04, 0.04, 0.60, T.metal, RX1 + 0.04, i * 0.48, 0.58);
    box(THREE, t, 0.42, 2.46, 0.04, T.dark, -2.83, 0, 0.28);            /* rack floor */
    if (V.stow) {
      var bags = [[-0.86, 0.66], [-0.44, 0.74], [-0.02, 0.62], [0.42, 0.72], [0.86, 0.64]];
      for (i = 0; i < bags.length; i++) {
        box(THREE, t, 0.36, 0.40, bags[i][1], T.kit, -2.83, bags[i][0], 0.30 + bags[i][1] / 2);
        box(THREE, t, 0.38, 0.05, bags[i][1] + 0.01, T.dark, -2.83, bags[i][0] + 0.12, 0.30 + bags[i][1] / 2);
      }
      wheelCyl(THREE, t, 0.13, 2.30, 12, T.kit, -2.70, 0, 1.05);           /* rolled tarpaulin */
      for (k = -1; k <= 1; k++) wheelCyl(THREE, t, 0.14, 0.05, 12, T.dark, -2.70, k * 0.80, 1.05);
      box(THREE, t, 0.30, 0.16, 0.44, T.skinS, -2.80, -1.22, 0.52);         /* water can */
      box(THREE, t, 0.10, 0.06, 0.04, T.metal, -2.80, -1.22, 0.76);
      box(THREE, t, 0.30, 0.16, 0.44, T.skinS, -2.80, 1.22, 0.52);         /* water can */
      box(THREE, t, 0.10, 0.06, 0.04, T.metal, -2.80, 1.22, 0.76);
      box(THREE, t, 0.24, 0.16, 0.20, T.kit, -2.80, -1.22, 0.88);          /* ration box on the can */
    }

    /* ---- roof furniture: blowout panel lids with their bolt rows, lifting
       eyes, grab handles, aerials ----- */
    for (s = -1; s <= 1; s += 2) {
      /* the two ammunition blowout panels, the whole rear half of the roof */
      box(THREE, t, 1.30, 0.66, 0.06, T.skinS, -1.80, s * 0.66, 0.95);
      for (k = 0; k < 6; k++) {
        box(THREE, t, 0.03, 0.03, 0.02, T.metal, -2.38 + k * 0.23, s * 0.36, 0.985);
        box(THREE, t, 0.03, 0.03, 0.02, T.metal, -2.38 + k * 0.23, s * 0.96, 0.985);
      }
      box(THREE, t, 0.14, 0.10, 0.16, T.metal, 0.40, s * 1.42, 1.00);
      box(THREE, t, 0.14, 0.10, 0.16, T.metal, -2.30, s * 1.24, 0.96);
      /* grab handles along the upper side bevel */
      handleY(THREE, t, -0.30, s * 1.56, 0.80, 0.22, s, T.metal);
      handleY(THREE, t, 0.20, s * 1.56, 0.80, 0.22, s, T.metal);
      /* whip aerial at the bustle corner on its armoured base */
      box(THREE, t, 0.13, 0.13, 0.16, T.dark, -2.34, s * 1.38, 1.00);
      post(THREE, t, 0.04, 0.05, 0.10, 8, T.metal, -2.34, s * 1.38, 1.13);
      post(THREE, t, 0.019, 0.010, 1.00, 6, T.dark, -2.34, s * 1.38, 1.58);
    }
    /* wind sensor mast on the bustle roof */
    post(THREE, t, 0.030, 0.030, 0.44, 6, T.metal, -1.10, 0, 1.16);
    box(THREE, t, 0.22, 0.12, 0.10, T.dark, -1.10, 0, 1.42);
    box(THREE, t, 0.16, 0.16, 0.05, T.skinS, -1.10, 0, 0.965);
    /* the GPS / intercom junction box and the crosswind sensor's guard */
    box(THREE, t, 0.24, 0.30, 0.12, T.skinS, -0.60, 0.10, 1.00);

    /* ---- the SEP's thermal management unit. Its air handling unit is
       mounted in the left side of the turret bustle, so the part that shows
       is drawn as a louvred casing on the roof at the left rear corner of the
       bustle, grille to the rear. The SEP added computers and a second
       generation thermal imager, and this is the cooling that came with them. */
    if (V.tms) {
      box(THREE, t, 0.50, 0.74, 0.28, T.skinS, -2.35, 0.73, 1.07);
      box(THREE, t, 0.40, 0.60, 0.03, T.dark,  -2.33, 0.73, 1.225);        /* top grille   */
      for (i = 0; i < 6; i++)
        box(THREE, t, 0.035, 0.58, 0.03, T.metal, -2.50 + i * 0.07, 0.73, 1.245);
      box(THREE, t, 0.03, 0.62, 0.18, T.dark,  -2.61, 0.73, 1.07);         /* rear grille  */
      for (i = 0; i < 4; i++)
        box(THREE, t, 0.02, 0.60, 0.02, T.metal, -2.625, 0.73, 1.00 + i * 0.045);
    }

    /* ---- Trophy: a launcher box on each rear flank of the turret, tall at
       the back and sloping down to the front, with a large oval cover on its
       outer side and a block of countermeasure tubes pointing outboard at its
       forward end. Placed from the photographs of the Abrams launcher
       mock-ups and of the M1A1 demonstrator; the radar panels are not drawn. */
    if (V.trophy) {
      for (s = -1; s <= 1; s += 2) {
        var ly0 = s * 1.68;
        prism(THREE, t, [[-2.58, 0.44], [-1.12, 0.44], [-1.08, 0.64],
                         [-1.34, 0.94], [-2.58, 1.08]], 0.40, T.olive, ly0);
        var cov = wheelCyl(THREE, t, 0.17, 0.05, 14, T.dark, -2.05, s * 1.905, 0.72);
        cov.scale.x = 1.8;                                                      /* oval access cover */
        for (i = 0; i < 3; i++)
          for (j = 0; j < 3; j++)
            wheelCyl(THREE, t, 0.04, 0.09, 6, T.dark, -1.26 - i * 0.12, s * 1.90, 0.58 + j * 0.12);
        box(THREE, t, 0.46, 0.22, 0.03, T.team, -1.95, ly0, 1.025, 0.112);     /* team flash on top */
      }
    }

    /* ---- team flashes, so ownership reads on a busy map ---- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, t, 0.62, 0.05, 0.17, T.team, -0.30, s * 1.67, 0.47);
      if (!V.trophy)
        box(THREE, t, 0.46, 0.05, 0.15, T.team, -1.10, s * 1.835, 0.60);
    }
    box(THREE, t, 0.07, 0.74, 0.17, T.team, -2.60, 0, 0.74);
    return t;
  }

  /* ===================================================== merge by material */
  /* Each mesh costs a draw call, and one more for the shadow pass, per tank
     on screen: everything that shares a material becomes one geometry. The
     turret keeps a group of its own (the renderer trains and recoils it by
     name), merged on its own in turret-local space. Parts that were given
     skinS fold into skin with their UVs scaled by the factor on the alias. */
  function mergeByMaterial(THREE, root) {
    var hullB = { order: [], by: {} }, turB = { order: [], by: {} }, tur = null;
    function take(bucket, c, m) {
      var mat = c.material, ud = mat.userData || {};
      var tgt = ud.into || mat, us = ud.uvs || 1, key = tgt.uuid;
      if (!bucket.by[key]) { bucket.by[key] = { mat: tgt, parts: [] }; bucket.order.push(key); }
      var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
      geo.applyMatrix4(m);
      if (us !== 1 && geo.attributes.uv) {
        var u = geo.attributes.uv.array;
        for (var i = 0; i < u.length; i++) u[i] *= us;
      }
      bucket.by[key].parts.push(geo);
    }
    function walk(node, pm, bucket) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        if (c.isMesh) take(bucket, c, pm.clone().multiply(c.matrix));
        else if (c.name === "turret") { tur = c; walk(c, new THREE.Matrix4(), turB); }
        else walk(c, pm.clone().multiply(c.matrix), bucket);
      }
    }
    walk(root, new THREE.Matrix4(), hullB);

    function emit(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var at = e.parts[k].attributes;
          P.set(at.position.array, o * 3);
          N.set(at.normal.array, o * 3);
          if (at.uv) U.set(at.uv.array, o * 2);
          o += at.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var res = new THREE.Group();
    emit(hullB, res);
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.copy(tur.position);
    emit(turB, tg);
    res.add(tg);
    return res;
  }

  /* ============================================================ BUILD    */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.m1a2;
    var g = new THREE.Group();
    var T = makeMats(THREE, C, V);

    buildHull(THREE, M, g, T);
    buildRunningGear(THREE, g, T);
    buildSkirts(THREE, M, g, T);
    g.add(buildTurret(THREE, M, T, V));

    /* hull team flashes: front and rear so the owner reads from any bearing */
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.62, 0.05, 0.17, T.team, 2.55, s * 1.835, 0.72);   /* half sunk in the front skirt */
      box(THREE, g, 0.48, 0.05, 0.15, T.team, -3.05, s * 1.76, 1.30);
    }
    box(THREE, g, 0.06, 0.62, 0.15, T.team, X_TAIL - 0.02, 0, 1.40);

    var out = mergeByMaterial(THREE, g);
    out.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return out;
  }

  return { build: build, variants: VARIANTS };
})();

/* Registration. Overwrite unconditionally: a hero model is meant to replace
   whatever parametric version already claimed these ids. All five rows draw
   the one hull; len is the real overall extent, gun forward (measured: 9.77 m,
   the same for every variant, because nothing a row adds reaches past it). */
(function () {
  var rows = [
    ["nato_e80_mbt", "m1a1"],     /* M1A1 Abrams                */
    ["nato_e90_mbt", "m1a2"],     /* M1A2 Abrams                */
    ["nato_e00_mbt", "sep"],      /* M1A2 SEP                   */
    ["mbt_n",        "sepv3n"],   /* M1A2 SEPv3 (with the kit)  */
    ["hvy_n",        "m1a2c"]     /* M1A2C with Trophy          */
  ];
  rows.forEach(function (r) {
    UNIT_MODELS[r[0]] = {
      len: 9.77,
      build: function (THREE, M, C) { return HeroAbrams.build(THREE, M, C, r[1]); }
    };
  });
})();
