/* ==========================================================================
   tel3d.js -- ROAD-MOBILE BALLISTIC MISSILE LAUNCHERS (role "tel")

   SIXTEEN vehicles. Four are the hand-finished present-day tier: "tel_p"
   (9K720 Iskander-M, 9P78-1 TEL), "tel_c" (DF-16 on a 10x10 transporter-
   erector-launcher), "tel_k" (KN-23 / Hwasong-11Ga on the TRACKED launcher)
   and "tel_n" (M142 HIMARS carrying a two-round PrSM pod). Twelve are the
   era rosters, registered under their own def ids at the bottom of the file
   together with three honest aliases, so that all fifteen ids in the "tel"
   role have a model of their own and none of them borrows a peer's:

     1955  nato_e50_tel  MGM-5 Corporal on its erector trailer, M52 6x6
     1957  pact_e50_tel  R-11 Scud-A on the 8U218 TRACKED erector
     1967  nato_e60_tel  Pershing 1a, M790 EL trailer, Ford M757 8x8
     1967  pact_e60_tel  R-17 Scud-B on the 9P117 Uragan, MAZ-543P 8x8
     1983  nato_e80_tel  Pershing II, the rebuilt M790 as M1003, MAN M1001
     1976  pact_e80_tel  OTR-21 Tochka, 9P129 on the amphibious BAZ-5921
     1985  kpa_e80_tel   Hwasong-5, the Scud-B copy, on a MAZ-543 copy
     1989  pact_e90_tel  OTR-21 Tochka-U, 9P129M-1: the same vehicle again
     1991  pla_e90_tel   DF-15 / M-9 on a WS2400, the PLA's own MAZ-543
     1991  kpa_e90_tel   Hwasong-6: the same launcher, the same round
     2006  pla_e00_tel   DF-15B, biconic finned manoeuvring re-entry vehicle
     2007  kpa_e00_tel   KN-02 Toksa, a Tochka copy
   plus  pact_e00_tel IS tel_p, nato_e00_tel IS tel_n, and nato_e90_tel is
   the M270 under ATACMS, which is mlrs_n in js/units3d.js.

   WHAT THE SILHOUETTE HAS TO SAY, and in what order.

   1. LOW AND LONG. This is the whole job. The era that gets these launchers
      also gets the new mobile area SAM, and that vehicle is a set of tall
      canisters stood on end. If a player cannot tell the two apart at forty
      screen pixels the feature has failed, so everything here is horizontal:
      one long shrouded deck, nothing standing up, nothing above the crown of
      the cover. It is also the truth. A TEL spends its entire service life
      lying down and erects for the sixty seconds before a launch; the fifty
      years of Western air planning that went into hunting them went into
      hunting a shape that looks like a covered lorry.

   2. IT IS CARRYING MISSILES, NOT FUEL. A plain clamshell cover on a big
      chassis is a tanker. So the cover stops short and the ROUNDS SHOW: two
      ogives past the front collar on the Russian and the Korean vehicles,
      one fatter one on the Chinese, and on the HIMARS the pod is open at the
      face with two launch mouths in it. That gap between the collar and the
      cab is the single most valuable half metre on the model.

   3. IT IS AN ERECTOR. The cover is not bolted to the deck: it sits in a
      cradle hinged on lugs at the tail, with a pair of hydraulic rams under
      it and the whole assembly raked a few degrees nose-up so the hinge line
      reads and the shadow has something to fall across. Heavy screw jacks go
      down at the back, because a thirty-tonne round leaving the rails would
      otherwise put the launcher on its side.

   4. IT IS NOT ARMED. No turret, no gun, no cupola with a machine gun on it,
      and NOTHING IN THIS FILE IS NAMED "turret". Every def in this family
      carries turret:false, so entities.js turns the whole hull to the target
      and the missiles point where they are aimed. A group named "turret" on
      a def without the flag would simply never move, and a def with the flag
      and no group would let a launcher fire without facing anything.

   The four present-day vehicles differ by exactly the things a player can
   actually see:
      tel_p  8x8, stepped cab plus a second crew cabin behind it, two rounds
      tel_c  10x10 - five axles, longer deck, full-width forward-control cab,
             ONE larger round. Chinese launchers are longer and carry more
             axles than the Soviet vehicles they descend from, and that is the
             only difference anyone can read at this zoom, so it is worth the
             extra axle.
      tel_k  the same deck on TRACKS, seven road wheels a side, sprocket
             forward. The KN-23 has a documented tracked launcher as well as a
             wheeled one and nothing else in the roster is a tracked missile
             transporter, so it is built as the tracked one.
      tel_n  a different animal entirely and meant to be: a five-ton 6x6 truck
             with an armoured cab and one pod on the back. The United States
             has had no dedicated ballistic erector since INF took Pershing II
             in 1988 and fires its rounds out of the rocket launcher it
             already owns; the model should say that at a glance.

   THE TWELVE ERA LAUNCHERS ARE SORTED BY THREE THINGS AND NO OTHERS, because
   at forty pixels there is nothing else to see:
     COVER OR NO COVER. Six of them carry the round in the OPEN, on a boom,
       with a cruciform tail hanging off the back and eleven metres of pale
       grey running the length of a green hull: both 1950s vehicles, all three
       Scuds and the two Pershings. Six carry it under a clamshell like the
       present-day tier. That is the largest possible difference between two
       vehicles of the same size and it is entirely real - it is the whole of
       what separates 1957 from 2006.
     ONE HULL OR TWO. Three of them are ARTICULATED, a tractor towing an
       erector-launcher semitrailer, because the United States never built a
       monolithic TEL of the Soviet pattern; it hitched the launcher to a
       lorry and left it hitched. Nothing else in the roster is a tractor and
       a trailer except the Patriot in sam3d.js, and that answers the question
       by standing its canisters up at 38 degrees.
     LENGTH AND AXLE COUNT. 9.5 m on three axles (Tochka), 11.4 on four
       (DF-15), 13.4 on four with a split cab (Scud), 17.7 on a tractor and a
       trailer (Corporal), and one tracked hull 6.8 m long with a 10.5 m round
       lying over it. The Tochka is two thirds the length of the Scud beside
       it in the same tech tree, and the Corporal is nearly twice it.

   CONVENTIONS, all verified against js/mine_veh_layer.js before writing:
     - Model space is +X nose, +Y left, +Z up, real metres, tyres and jack
       pads on z = 0. render3d.js stands the model up with rotation.x = -PI/2
       and rescales by MEASURED extent, so `len` below is metadata only.
     - Because the pads and the tyres both reach z = 0 the belly-snap at
       js/render3d.js:484 is a no-op, which is the intent.
     - A cylinder's own axis is +Y. That IS a road-wheel axle, so a wheel
       takes no rotation at all; an upright tube needs rotation.x = PI/2 and
       a fore-and-aft tube rotation.z = PI/2. A strut raked in elevation must
       take the z first and the y second - three's XYZ Euler applies Z, then
       Y, then X - or rotation.y merely spins the tube about its own axis and
       moves nothing.
     - Road wheels are GROUPS named "roadwheel"; render3d.js spins those about
       their local y at the vehicle's real speed. A smooth cylinder turning
       about its own axis shows nothing, so each one carries a bolt ring, and
       a truck tyre a proud tread band as well, exactly as armour3d.js:925
       explains. Road wheels running inside a belt skip the band: at fourteen
       wheels on the tracked launcher that is 670 triangles for nothing.
     - M.loft winds its quads (a, c, b), i.e. normals point INWARD, so every
       lofted body here goes through body() which flips the winding and
       recomputes normals. DoubleSide would paper over it and double the
       shading cost for nothing.
     - C.team arrives as a CSS hex STRING ("#4b8fe0"). It goes straight into a
       material and no arithmetic may be done on it. It is used on small
       marking panels only: eraPaint (js/render3d.js) skips any material
       within 0.12 RGB of the team colour, so a team-coloured cover would be
       permanently exempt from the desert and tan era finishes, and it is the
       largest surface on the vehicle.

   THE MEASURED COMPROMISE, stated rather than hidden, and it is now measured
   four times over. The rake was authored at six degrees. On a 6.5 m cradle
   that lifts the front of the cover 0.72 m, which put the crown at 4.11 m on
   a vehicle whose real travel height is 3.42 m - the model was then taller
   than the SAM it has to be distinguished from, which is precisely backwards.
   The rake is 3.7 degrees (0.065 rad) on the heavy launchers and 4.3 on the
   HIMARS: still enough to read as a hinged erector and to catch the light
   along the cover, and it holds the real dimension. THREE OF THE NEW
   VEHICLES DO NOT USE IT, and in every case the deviation is forced by
   arithmetic rather than chosen:
     the three Scuds run 0.7 degrees (0.012 rad). The R-17's fins span 1.81 m
       and are clocked in an X, so the top fin tips sit above the missile's
       own crown and the published 3.33 m travel height is measured to a fin
       tip. That pins the round's centreline at 2.67 m, and the nose then has
       a hard ceiling: pivotZ + missZ + missNoseX*sin(e) + missR <= 3.33. At
       0.065 that comes to 3.74 m on a 3.33 m vehicle - worse than the 4.11
       this file already threw out - and even 0.038 does not fit. A Scud lies
       FLAT, and it loses nothing by it, because it is the one vehicle here
       that does not need a rake to read as an erector: you can see the whole
       mechanism. Do not "restore" 0.065 there.
     the Tochka runs 2.75 degrees (0.048). On its 5.55 m cover the family
       rake lifts the crown 0.36 m, which on a 2.375 m vehicle is a seventh of
       its height. 0.048 holds the crown at 2.48 and, more to the point, holds
       a height-to-length ratio of 0.259 against tel_p's 0.264 - so the model
       renders LOWER for its length than the Iskander, which is the way round
       the real vehicles are. At 0.065 that inverts.
     the Corporal runs 1.4 degrees (0.025). Over a 13.8 m round even that
       lifts the ogive 0.34 m; at 0.065 it would lift it 0.88 and put the
       round through the cab roof.

   MEASURED, on the finished models, with THREE.Box3().setFromObject over
   the built group and an index-count triangle walk - the same measure that
   produced the four figures above it:
     tel_p         13.13 x 3.56 x 3.46   4,804      tel_c 14.17 x 3.60 x 3.64  5,108
     tel_k         12.76 x 3.52 x 3.38   4,724      tel_n  7.01 x 2.72 x 3.31  2,900
     nato_e50_tel  17.65 x 2.83 x 2.96   4,906
     pact_e50_tel  11.90 x 3.28 x 3.43   4,714
     nato_e60_tel  13.34 x 2.91 x 3.40   5,082
     pact_e60_tel  13.36 x 3.52 x 3.34   4,814
     nato_e80_tel  14.56 x 2.99 x 3.41   5,256
     pact_e80_tel   9.56 x 3.16 x 2.48   4,480   (and pact_e90, kpa_e00)
     kpa_e80_tel   13.36 x 3.52 x 3.34   4,814   (and kpa_e90)
     pla_e90_tel   11.89 x 3.44 x 3.54   4,696
     pla_e00_tel   11.89 x 3.44 x 3.50   4,876
   Read those heights the way the four originals are written: Box3 takes a
   cone's or a frustum's FULL radius down its whole length, so a vehicle whose
   tallest thing is an exposed warhead measures a little over its own crown.
   The true crowns are lower - pla_e90's cover tops out at 3.39 and its round
   at 3.44, pact_e50's round at 3.36, the Pershings' at 3.28 and 3.31.
   The measured band for hand-finished support vehicles in this project is the
   minelayer's 4,464 and the mine clearer's 5,460; all sixteen are inside it
   except tel_n, which is a five-ton truck and always was.

   ONE RENDERER FACT THAT CHANGES WHAT THESE VEHICLES LOOK LIKE. render3d.js
   computes K = (ERA_KIT[era] && key !== def.id) ? ERA_KIT[era] : null, so the
   era finish and the era kit fire ONLY for a model that is a borrowed
   stand-in. Every id below is registered under its own def id, so ERA_KIT
   never runs on any of them: the paint in each parameter object IS the final
   paint, and that is why each carries a period palette rather than the family
   green. It cuts this file's way too - the e50 and e60 kit is a searchlight
   drum plus a whip antenna at zTop + H*0.40, which would otherwise have been
   bolted to the crown of a launcher whose first rule is that nothing stands
   above the cover. sam3d.js:1074 already does the same thing for the same
   reason: its 2K11 Krug carries paint 0x47523a, the literal e60 tint.

   ASCII only. A stray byte inside a hex literal has broken this repo before.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var PI = Math.PI;

  /* ============================================================ primitives */

  function box(THREE, w, d, h, mtl, x, y, z, ry) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    if (ry) m.rotation.y = ry;
    return m;
  }
  /* axis +Y: this is the axle case and takes no rotation */
  function cylY(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylZ(THREE, r1, r2, h, seg, mtl, x, y, z) {   /* upright */
    var m = cylY(THREE, r1, r2, h, seg, mtl, x, y, z);
    m.rotation.x = PI / 2;
    return m;
  }
  function cylX(THREE, r1, r2, h, seg, mtl, x, y, z) {   /* fore and aft */
    var m = cylY(THREE, r1, r2, h, seg, mtl, x, y, z);
    m.rotation.z = PI / 2;
    return m;
  }
  /* a cone pointing +X: ConeGeometry grows along +Y, so it is the cylinder
     case with the same rotation.z, and the TIP ends up at -X. Rotating a
     further PI about z would flip the taper the wrong way round, so the cone
     is built base-first and turned by PI/2 the other way instead. */
  function coneX(THREE, r, h, seg, mtl, xBase, y, z) {
    var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mtl);
    m.rotation.z = -PI / 2;
    m.position.set(xBase + h * 0.5, y || 0, z || 0);
    return m;
  }
  /* a strut between two points in the xz plane, at a given y. The rake goes
     on rotation.y and the lay-down on rotation.z, in that order, because
     three applies Z before Y. */
  function strut(THREE, r, seg, mtl, x0, z0, x1, z1, y) {
    var dx = x1 - x0, dz = z1 - z0;
    var len = Math.sqrt(dx * dx + dz * dz);
    var m = cylX(THREE, r, r, len, seg, mtl,
                 (x0 + x1) * 0.5, y || 0, (z0 + z1) * 0.5);
    m.rotation.y = -Math.atan2(dz, dx);
    return m;
  }
  /* a FIN: a thin plate standing off a round body, rolled about the missile's
     own axis. It takes rotation.x and nothing else - the box's +Z (its span)
     turns into the yz plane and its +X (the chord) is left alone - so the
     Z-then-Y ordering the header warns about never arises here. Every set in
     this file is rolled to an X rather than a plus, because in a plus the two
     horizontal fins present their edges to this game's 49-degree camera and
     vanish while the bottom one goes through the cradle. It is also what the
     R-17's published 3.33 m travel height proves: a plus pattern would put
     the top fin tip at 2.69 + 0.905 = 3.60 m, and 45 degrees gives 3.33 to
     the centimetre. */
  function fin(THREE, chord, thick, span, mtl, x, mz, r0, roll) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(chord, thick, span), mtl);
    var d = r0 + span * 0.5;
    m.rotation.x = roll;
    m.position.set(x, -Math.sin(roll) * d, mz + Math.cos(roll) * d);
    return m;
  }

  /* M.loft normals point inward - flip the winding rather than reach for
     DoubleSide (see the header). */
  function body(THREE, M, secs, segs) {
    var geo = M.loft(THREE, secs, segs || 16);
    var ix = geo.getIndex ? geo.getIndex() : null;
    if (ix && ix.array) {
      var a = ix.array, i, t;
      for (i = 0; i + 2 < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
      geo.computeVertexNormals();
    }
    return geo;
  }

  /* ============================================================= materials
     Three tiers and no more, as everywhere else in this project. SKIN is the
     painted body and carries a procedural canvas; METAL is running gear,
     frames, rams and jacks; GLASS is the cab. Plus one round-grey for the
     missiles themselves, which must NOT be the hull colour or the whole
     point of showing the ogives is lost. */

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  var texCache = {};
  function skinTex(THREE, key, base, tones, seed) {
    if (texCache[key] !== undefined) return texCache[key];
    texCache[key] = null;
    try {
      var W = 512, H = 512, i;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rngFor(seed);

      g.fillStyle = base; g.fillRect(0, 0, W, H);

      /* Disruptive blotches. A launcher lives under camouflage netting in a
         wood line for weeks at a time and is repainted by its own crew, so
         the tonal variation is coarser than on a tank. */
      for (i = 0; i < 26; i++) {
        g.globalAlpha = 0.42; g.fillStyle = tones[i % tones.length];
        g.beginPath();
        g.ellipse(R() * W, R() * H, 40 + R() * 110, 24 + R() * 62, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;

      /* long welds along the frame, with a highlight above each so the plate
         reads proud instead of scratched */
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.6;
      for (i = 0; i < 22; i++) {
        var x = R() * W, y = R() * H, l = 80 + R() * 220;
        g.beginPath();
        if (R() < 0.66) { g.moveTo(x, y); g.lineTo(x + l, y + (R() - 0.5) * 10); }
        else { g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 10, y + l); }
        g.stroke();
      }
      g.strokeStyle = "rgba(255,255,255,0.06)"; g.lineWidth = 1.2;
      for (i = 0; i < 16; i++) {
        var hx = R() * W, hy = R() * H, hl = 70 + R() * 180;
        g.beginPath(); g.moveTo(hx, hy - 2); g.lineTo(hx + hl, hy - 2); g.stroke();
      }

      /* bolt runs, and the rivet clusters round the cradle bearings */
      g.fillStyle = "rgba(0,0,0,0.24)";
      for (i = 0; i < 30; i++) {
        var bx = R() * W, by = R() * H, n = 4 + ((R() * 10) | 0);
        for (var q = 0; q < n; q++) g.fillRect(bx + q * 6, by, 2, 2);
      }

      /* chipping, then road dirt thrown up the flanks and nothing on top */
      for (i = 0; i < 95; i++) {
        g.fillStyle = R() < 0.5 ? "rgba(128,118,98,0.28)" : "rgba(34,31,26,0.26)";
        g.fillRect(R() * W, R() * H, 2 + R() * 6, 2 + R() * 4);
      }
      var dust = g.createLinearGradient(0, H * 0.52, 0, H);
      dust.addColorStop(0, "rgba(156,143,112,0.00)");
      dust.addColorStop(1, "rgba(156,143,112,0.42)");
      g.fillStyle = dust; g.fillRect(0, H * 0.52, W, H * 0.48);
      g.fillStyle = "rgba(22,20,18,0.14)";
      for (i = 0; i < 30; i++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 20 + R() * 60);

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148 ships SRGBColorSpace but Texture.colorSpace is inert until r152,
         so the only field that does anything here is the old encoding one */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      texCache[key] = t;
    } catch (e) { texCache[key] = null; }
    return texCache[key];
  }

  function mats(THREE, P) {
    var skin = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.90, metalness: 0.05 });
    var t = skinTex(THREE, P.id, P.base, P.tones, P.seed);
    if (t) skin.map = t; else skin.color.setHex(P.paint);

    return {
      skin: skin,
      /* Steel a stop brighter than this and every ram, frame and jack came
         out white against the green under ACES with a 1.4 key. */
      steel: new THREE.MeshStandardMaterial({ color: 0x2f3438, roughness: 0.62, metalness: 0.42 }),
      dark:  new THREE.MeshStandardMaterial({ color: 0x1d2124, roughness: 0.82, metalness: 0.18 }),
      rub:   new THREE.MeshStandardMaterial({ color: 0x16181a, roughness: 0.96, metalness: 0.04 }),
      tread: new THREE.MeshStandardMaterial({ color: 0x1f2224, roughness: 0.99, metalness: 0.02 }),
      chrome: new THREE.MeshStandardMaterial({ color: 0x9aa1a6, roughness: 0.30, metalness: 0.62 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x2b3a44, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.82 }),
      lamp:  new THREE.MeshStandardMaterial({
        color: 0xb9a878, roughness: 0.22, metalness: 0.30, emissive: 0x2a1f0c, emissiveIntensity: 0.4 }),
      /* the round: pale grey-green, deliberately unlike the hull, with a
         darker nose section - that contrast IS the recognition cue */
      miss:  new THREE.MeshStandardMaterial({ color: 0x8d9184, roughness: 0.55, metalness: 0.12 }),
      missN: new THREE.MeshStandardMaterial({ color: 0x50565a, roughness: 0.48, metalness: 0.20 }),
      canvas: new THREE.MeshStandardMaterial({ color: 0x4a4a37, roughness: 0.97, metalness: 0.02 }),
    };
  }

  /* =========================================================== road wheels
     A group, because the renderer spins the GROUP; the bolt ring and the
     proud tread band inside it are what make that rotation visible. */
  function roadWheel(THREE, r, w, M2, road) {
    var G = new THREE.Group();
    G.name = "roadwheel";
    var seg = road ? 10 : 12, n = road ? 4 : 5, i;
    G.add(cylY(THREE, r * 0.93, r * 0.93, w, seg, M2.rub, 0, 0, 0));
    /* the proud tread band is a truck tyre's; a road wheel running inside a
       belt has a plain rubber rim, and skipping it saves 48 triangles a
       wheel on a vehicle that carries fourteen of them */
    if (!road) G.add(cylY(THREE, r, r, w * 0.74, seg, M2.tread, 0, 0, 0));
    G.add(cylY(THREE, r * 0.55, r * 0.55, w * 1.02, 8, M2.steel, 0, 0, 0));
    if (!road) G.add(cylY(THREE, r * 0.20, r * 0.20, w * 1.10, 6, M2.dark, 0, 0, 0));
    for (i = 0; i < n; i++) {
      var a = i * (2 * PI / n) + 0.3;
      G.add(box(THREE, 0.07, w * 1.12, 0.07, M2.dark,
                Math.cos(a) * r * 0.38, 0, Math.sin(a) * r * 0.38));
    }
    return G;
  }

  /* ======================================================== wheeled chassis
     Frame rails, a low body tub between them, mudguards over every axle and
     the kit that hangs off a heavy tractor: air reservoirs, a fuel tank, a
     battery locker, an exhaust stack and the crew's stowage. Without that
     clutter the flank is a painted wall four metres long. */
  function wheeledChassis(THREE, g, P, M2) {
    var i, s, x;

    /* the two frame rails, visible between the wheels under the tub */
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, P.X_NOSE - P.X_TAIL - 0.30, 0.16, P.frameZ1 - P.frameZ0,
                M2.steel, (P.X_NOSE + P.X_TAIL) * 0.5, s * 0.74,
                (P.frameZ0 + P.frameZ1) * 0.5));
    /* cross members, one per axle bay */
    for (i = 0; i < P.axleX.length; i++)
      g.add(box(THREE, 0.14, 1.60, 0.16, M2.steel, P.axleX[i], 0, P.frameZ0 + 0.10));

    /* the body tub: everything from the back of the cab to the tail plate */
    var tubX0 = P.X_TAIL + 0.12, tubX1 = P.cab.x0 + 0.06;
    g.add(box(THREE, tubX1 - tubX0, P.hw * 2, P.deckZ - P.frameZ1,
              M2.skin, (tubX0 + tubX1) * 0.5, 0, (P.frameZ1 + P.deckZ) * 0.5));
    /* the deck plate proper, carried out past the tub so the plan view is a
       rectangle - a body left to itself reads as a loaf from overhead */
    g.add(box(THREE, tubX1 - tubX0 + 0.10, P.hw * 2 + 0.14, 0.10,
              M2.skin, (tubX0 + tubX1) * 0.5, 0, P.deckZ - 0.05));
    /* tail plate with towing eyes */
    g.add(box(THREE, 0.14, P.hw * 2, P.deckZ - P.frameZ0 - 0.10,
              M2.skin, P.X_TAIL + 0.07, 0, (P.frameZ0 + P.deckZ) * 0.5 + 0.05));
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, 0.22, 0.10, 0.22, M2.steel, P.X_TAIL - 0.02, s * 0.72, P.frameZ0 + 0.24));

    /* mudguards and flaps. Wheel arches are the cheapest thing on the model
       and the one that stops eight tyres reading as eight black discs.
       guardLift defaults to the 0.46 the Iskander was authored with; a
       chassis on 1.5 m tyres says so, or the arch ends up a third of the way
       down inside its own wheel. It also has to stay clear of markings()'s
       deck-skirt panel, which sits at deckZ - 0.60 and is the one team flash
       in the three-quarter rear view: wheelR + guardLift + 0.045 must come
       out below deckZ - 0.665. */
    var gLift = (P.guardLift !== undefined) ? P.guardLift : 0.46;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < P.axleX.length; i++) {
        g.add(box(THREE, P.wheelR * 2.35, P.wheelW + 0.20, 0.09, M2.skin,
                  P.axleX[i], s * P.wheelY, P.wheelR + gLift));
        g.add(box(THREE, 0.06, P.wheelW + 0.20, 0.30, M2.dark,
                  P.axleX[i] - P.wheelR * 1.14, s * P.wheelY, P.wheelR + gLift - 0.16));
      }
      /* a running board the crew get up on, between the two axle groups */
      var gapX = (P.axleX[1] + P.axleX[2]) * 0.5;
      g.add(box(THREE, Math.abs(P.axleX[1] - P.axleX[2]) - 0.9, 0.34, 0.07,
                M2.steel, gapX, s * (P.hw - 0.10), P.frameZ1 + 0.06));

      /* side lockers under the deck overhang: cable drums, jack feet, the
         crew's kit. Three a side, banded dark so they have an outline. */
      var at = [P.cab.x0 - 1.05, P.cab.x0 - 2.30, P.X_TAIL + 1.30];
      for (i = 0; i < at.length; i++) {
        g.add(box(THREE, 0.92, 0.30, 0.44, M2.skin, at[i], s * (P.hw + 0.02), P.deckZ - 0.36));
        g.add(box(THREE, 0.96, 0.34, 0.05, M2.dark, at[i], s * (P.hw + 0.02), P.deckZ - 0.14));
        g.add(box(THREE, 0.06, 0.34, 0.44, M2.dark, at[i] - 0.30, s * (P.hw + 0.02), P.deckZ - 0.36));
      }
      /* air reservoirs slung off the rail, and a fuel tank on the near side */
      g.add(cylX(THREE, 0.17, 0.17, 0.78, 10, M2.chrome,
                 P.axleX[1] - 1.05, s * 0.96, P.frameZ0 + 0.06));
    }
    /* Fuel tank, right side only, because a symmetrical vehicle is a toy.
       Default where the Iskander wants it; a chassis whose axle groups fall
       elsewhere says so, because 1.70 m of tank laid on the wrong stretch of
       rail runs straight through a tyre that spins. */
    var tankX = (P.tankX !== undefined) ? P.tankX : P.cab.x0 - 1.60;
    g.add(cylX(THREE, 0.30, 0.30, 1.70, 12, M2.steel,
               tankX, -(P.hw - 0.16), P.frameZ1 + 0.10));
    /* Exhaust stack up the back of the cab, left side. Switchable, because
       two of the chassis in this file genuinely do not have one: a MAZ-543
       exhausts low through mufflers out to the side from the bay between its
       cab pods, and a sealed amphibian vents at the hull rear. */
    if (P.stack !== false) {
      g.add(cylZ(THREE, 0.09, 0.09, 1.05, 8, M2.dark, P.cab.x0 - 0.14, P.hw - 0.28, P.deckZ + 0.52));
      g.add(cylZ(THREE, 0.12, 0.09, 0.16, 8, M2.dark, P.cab.x0 - 0.14, P.hw - 0.28, P.deckZ + 1.10));
    }
  }

  /* ======================================================== tracked chassis
     Same deck, different legs. The belt is drawn as its two RUNS: as one
     solid slab it fills the space between the wheels and swallows them. */
  function trackedChassis(THREE, g, P, M2) {
    var s, i;
    var tubX0 = P.X_TAIL + 0.35, tubX1 = P.cab.x0 + 0.06;

    /* Math.abs, and it is load-bearing: the 1957 launcher drives from the
       REAR, so sprocketX is behind idlerX and all three of these widths go
       negative. A BoxGeometry with a negative width does not error and does
       not vanish from the bounding box - it mirrors, which inverts the
       winding, so both belt runs and the sponson skirt render inside-out and
       are back-face culled to nothing. You get a launcher with road wheels
       and no track. (P.sprocketX + P.idlerX) * 0.5 is already sign-agnostic.
       Verified a no-op on tel_k, whose 5.40 / -5.45 is unchanged by it. */
    var beltL = Math.abs(P.sprocketX - P.idlerX);
    /* the drive and idler wheels, at whatever size the era wants them. The
       modern launcher's 0.46 m sprocket on a 550 mm-wheel IS-2 hull stands
       10 cm proud through the top of its own belt, which is exactly the place
       a viewer is being asked to look on a rear-drive vehicle. */
    var spR = (P.sprocketR !== undefined) ? P.sprocketR : 0.46;
    var spZ = (P.sprocketZ !== undefined) ? P.sprocketZ : 0.62;
    var idR = (P.idlerR !== undefined) ? P.idlerR : 0.40;
    var idZ = (P.idlerZ !== undefined) ? P.idlerZ : 0.56;
    for (s = -1; s <= 1; s += 2) {
      var ty = s * P.trackY;
      g.add(box(THREE, beltL + 0.90, P.trackW, 0.11,
                M2.dark, (P.sprocketX + P.idlerX) * 0.5, ty, 0.055));
      g.add(box(THREE, beltL + 0.90, P.trackW, 0.11,
                M2.dark, (P.sprocketX + P.idlerX) * 0.5, ty, P.trackTop - 0.055));
      for (i = 0; i < P.roadX.length; i++) {
        var w = roadWheel(THREE, P.roadR, P.trackW * 0.82, M2, true);
        w.position.set(P.roadX[i], ty, P.roadR);
        g.add(w);
      }
      /* drive sprocket and idler, at whichever end the parameters put them -
         forward on the modern launcher, aft on the 1957 one, which is IS-2
         practice - both up clear of the ground */
      g.add(cylY(THREE, spR, spR, P.trackW * 0.72, 12, M2.steel, P.sprocketX, ty, spZ));
      g.add(cylY(THREE, idR, idR, P.trackW * 0.72, 12, M2.dark, P.idlerX, ty, idZ));
      for (i = 0; i < P.rollX.length; i++)
        g.add(cylY(THREE, 0.13, 0.13, P.trackW * 0.5, 8, M2.dark,
                   P.rollX[i], ty, P.trackTop - 0.24));
      /* the sponson skirt over the top run: this is what makes a tracked
         hull read as armour rather than as a trolley */
      g.add(box(THREE, beltL + 0.60, 0.10, 0.34, M2.skin,
                (P.sprocketX + P.idlerX) * 0.5, s * (P.trackY + P.trackW * 0.55),
                P.trackTop + 0.24));
    }

    /* hull tub and deck */
    g.add(box(THREE, tubX1 - tubX0, P.hw * 2, P.deckZ - P.hullZ0, M2.skin,
              (tubX0 + tubX1) * 0.5, 0, (P.hullZ0 + P.deckZ) * 0.5));
    g.add(box(THREE, tubX1 - tubX0 + 0.14, P.hw * 2 + 0.20, 0.10, M2.skin,
              (tubX0 + tubX1) * 0.5, 0, P.deckZ - 0.05));
    /* glacis, so the front of a tracked vehicle is not a wall */
    var gl = box(THREE, 1.30, P.hw * 2 - 0.08, 0.12, M2.skin,
                 P.cab.x0 + 0.55, 0, P.hullZ0 + 0.62, -0.55);
    g.add(gl);
    g.add(box(THREE, 0.14, P.hw * 2, P.deckZ - P.hullZ0 - 0.10, M2.skin,
              P.X_TAIL + 0.42, 0, (P.hullZ0 + P.deckZ) * 0.5));

    /* a Korean vehicle lives under netting and carries everything it owns on
       the outside, which is also how you tell it from its Soviet ancestor */
    for (s = -1; s <= 1; s += 2) {
      var at = [P.cab.x0 - 1.20, P.X_TAIL + 1.60];
      for (i = 0; i < at.length; i++) {
        g.add(box(THREE, 1.00, 0.28, 0.42, M2.skin, at[i], s * (P.hw + 0.04), P.deckZ - 0.34));
        g.add(box(THREE, 1.04, 0.32, 0.05, M2.dark, at[i], s * (P.hw + 0.04), P.deckZ - 0.12));
      }
      g.add(cylX(THREE, 0.16, 0.16, 1.40, 8, M2.canvas,
                 P.cab.x0 - 2.60, s * (P.hw + 0.02), P.deckZ - 0.28));
      for (i = 0; i < 4; i++)
        g.add(box(THREE, 0.05, 0.36, 0.05, M2.dark,
                  P.cab.x0 - 3.15 + i * 0.36, s * (P.hw + 0.02), P.deckZ - 0.28));
    }
  }

  /* ================================================================== cabs
     Three shapes, one function. "stepped" is the Russian pattern - a low
     forward control cab with the windscreen set back under a brow and
     hinged armour shutters folded up over it. "full" is the Chinese one, a
     single full-width forward-control box. "box" is the tracked launcher's,
     which is armour with vision blocks rather than a lorry cab. */
  function cabBlock(THREE, g, P, M2) {
    var c = P.cab, s, i;
    var xm = (c.x0 + c.x1) * 0.5, zm = (c.z0 + c.z1) * 0.5;

    g.add(box(THREE, c.x1 - c.x0, c.hw * 2, c.z1 - c.z0, M2.skin, xm, 0, zm));
    /* the roof plate, proud, so the cab has a hard top edge */
    g.add(box(THREE, c.x1 - c.x0 + 0.10, c.hw * 2 + 0.10, 0.08, M2.skin, xm, 0, c.z1 + 0.02));

    /* windscreen: a raked panel let into the front face, under a brow */
    var wsZ = c.z1 - (c.style === "box" ? 0.52 : 0.48);
    var wsH = c.style === "box" ? 0.34 : 0.62;
    var ws = box(THREE, 0.09, c.hw * 1.62, wsH, M2.glass, c.x1 + 0.015, 0, wsZ, 0.20);
    g.add(ws);
    /* the centre pillar, because one unbroken pane reads as a bus */
    g.add(box(THREE, 0.12, 0.10, wsH + 0.06, M2.skin, c.x1 + 0.02, 0, wsZ, 0.20));
    g.add(box(THREE, 0.26, c.hw * 2 + 0.06, 0.09, M2.skin, c.x1 - 0.08, 0, c.z1 - 0.06));

    /* "casemate" is the 1957 tracked launcher's: armour with vision blocks,
       and NONE of the lorry furniture below it. An ISU-152 has its radiator
       at the back, so a grille in the front plate is a lie; mirror arms on a
       1957 tracked hull are an anachronism; and the door step lands inside
       the track run. The rest of the file is untouched - tel_k stays "box"
       and keeps everything it has today. */
    var lorry = (c.style !== "casemate");
    if (c.style !== "box" && c.style !== "casemate") {
      /* hinged armour shutters, folded UP against the brow. Nothing else on
         a launcher says "this vehicle expects to be shot at while driving". */
      for (s = -1; s <= 1; s += 2) {
        var sh = box(THREE, 0.07, c.hw * 0.76, 0.56, M2.skin,
                     c.x1 - 0.02, s * c.hw * 0.42, c.z1 + 0.24, -0.42);
        g.add(sh);
        g.add(box(THREE, 0.05, c.hw * 0.80, 0.05, M2.dark, c.x1 - 0.10, s * c.hw * 0.42, c.z1 + 0.02));
      }
    } else {
      /* vision blocks instead of a windscreen brow */
      for (i = -1; i <= 1; i++)
        g.add(box(THREE, 0.07, 0.26, 0.14, M2.glass, c.x1 + 0.02, i * 0.52, c.z1 - 0.22));
    }

    /* side windows and a door line each side */
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.62, 0.06, 0.44, M2.glass, xm + 0.32, s * (c.hw + 0.01), c.z1 - 0.44));
      g.add(box(THREE, 0.05, 0.05, c.z1 - c.z0 - 0.24, M2.dark, xm - 0.16, s * (c.hw + 0.02), zm));
      g.add(box(THREE, 0.05, 0.05, c.z1 - c.z0 - 0.24, M2.dark, xm + 0.86, s * (c.hw + 0.02), zm));
      if (lorry) {
        /* mirror arms: tiny, and the strongest "this is a road vehicle" cue */
        g.add(box(THREE, 0.05, 0.24, 0.05, M2.dark, c.x1 - 0.18, s * (c.hw + 0.13), c.z1 - 0.16));
        g.add(box(THREE, 0.06, 0.05, 0.32, M2.dark, c.x1 - 0.18, s * (c.hw + 0.24), c.z1 - 0.30));
        /* grab rail and a step up to the door */
        g.add(box(THREE, 0.46, 0.20, 0.06, M2.steel, xm - 0.20, s * (c.hw + 0.10), c.z0 - 0.30));
      }
    }

    /* bumper, headlamps in guards, tow shackles */
    if (lorry) {
      g.add(box(THREE, 0.18, c.hw * 2 + 0.12, 0.30, M2.dark, c.x1 + 0.14, 0, c.z0 + 0.18));
      for (s = -1; s <= 1; s += 2) {
        g.add(cylX(THREE, 0.13, 0.13, 0.16, 10, M2.dark, c.x1 + 0.12, s * (c.hw - 0.28), c.z0 + 0.62));
        g.add(cylX(THREE, 0.11, 0.11, 0.05, 10, M2.lamp, c.x1 + 0.21, s * (c.hw - 0.28), c.z0 + 0.62));
        g.add(box(THREE, 0.05, 0.32, 0.05, M2.steel, c.x1 + 0.24, s * (c.hw - 0.28), c.z0 + 0.78));
        g.add(box(THREE, 0.05, 0.32, 0.05, M2.steel, c.x1 + 0.24, s * (c.hw - 0.28), c.z0 + 0.46));
        g.add(box(THREE, 0.24, 0.12, 0.20, M2.steel, c.x1 + 0.20, s * 0.48, c.z0 + 0.12));
      }
      /* radiator louvres under the screen */
      for (i = 0; i < 5; i++)
        g.add(box(THREE, 0.05, c.hw * 1.30, 0.06, M2.dark, c.x1 + 0.05, 0, c.z0 + 0.42 + i * 0.13));
    }

    /* the second crew cabin behind the cab, where the launch crew ride and
       the firing computer lives. It is what makes the Russian vehicle two
       blocks and not one, at a glance. */
    if (P.cabin2) {
      var k = P.cabin2;
      g.add(box(THREE, k.x1 - k.x0, k.hw * 2, k.z1 - k.z0, M2.skin,
                (k.x0 + k.x1) * 0.5, 0, (k.z0 + k.z1) * 0.5));
      g.add(box(THREE, k.x1 - k.x0 + 0.08, k.hw * 2 + 0.08, 0.07, M2.skin,
                (k.x0 + k.x1) * 0.5, 0, k.z1 + 0.02));
      for (s = -1; s <= 1; s += 2) {
        g.add(box(THREE, 0.34, 0.06, 0.30, M2.glass, (k.x0 + k.x1) * 0.5 + 0.24,
                  s * (k.hw + 0.01), k.z1 - 0.34));
        g.add(box(THREE, 0.05, 0.05, k.z1 - k.z0 - 0.12, M2.dark,
                  (k.x0 + k.x1) * 0.5 - 0.30, s * (k.hw + 0.02), (k.z0 + k.z1) * 0.5));
      }
      /* air conditioner and the aerial base on the cabin roof */
      g.add(box(THREE, 0.44, 0.52, 0.16, M2.skin, k.x0 + 0.34, -0.36, k.z1 + 0.12));
      /* A whip long enough to be right - and they are two metres - put the
         model's crown at 4.05 m, taller than the area SAM this vehicle has
         to be told apart from, which is exactly backwards. It is drawn
         stowed, folded down along its bracket, which is how a launcher
         actually drives under trees. */
      g.add(box(THREE, 0.12, 0.12, 0.10, M2.dark, k.x0 + 0.24, 0.52, k.z1 + 0.09));
      g.add(cylZ(THREE, 0.022, 0.014, 0.52, 6, M2.steel, k.x0 + 0.24, 0.52, k.z1 + 0.36));
    }
  }


  /* =========================================================== split cab
     The MAZ-543 signature, and the one thing that identifies every vehicle
     in that lineage: TWO glass-fibre crew pods, two men in each, with the
     D12A V-12 in the bay between them. It is shared by the three 9P117-class
     Scud launchers and by the Chinese WS2400, which is a reverse-engineered
     MAZ-543 and inherits the cab with the chassis.

     Why it cannot be a cabBlock() parameter: cabBlock draws exactly ONE box
     centred on y = 0. There is no value of {x0,x1,hw,z0,z1} that puts a hole
     down the middle of it, and the hole is the whole point - 0.9 m of notch
     on a 3 m vehicle, at the nose, where nothing occludes it.

     Not a clash with sam3d.js:422, which has a "split" cab of its own on the
     same real chassis: that is the same ancestry, not a collision, and it
     does not cost either vehicle its read. The S-300 stands four canisters
     on end at 74.5 degrees and these lie a round flat. The split cab says
     "MAZ 8x8"; what is on the deck says which MAZ 8x8.

     Deliberately NOT inherited from cabBlock: the folded armour shutters and
     the radiator louvres. Those belong to the 9P78 and the MZKT-7930. A
     9P117 cab is plain GRP with plain glass and a round roof hatch, and the
     radiator is in the bay between the pods, not in the cab face. */
  function splitCab(THREE, g, P, M2) {
    var c = P.cab, s, i;
    var L = c.x1 - c.x0, xm = (c.x0 + c.x1) * 0.5;
    var H = c.z1 - c.z0, zm = (c.z0 + c.z1) * 0.5;
    var cw = c.hw - c.gapHW;              /* one pod across the beam */
    var cy = (c.hw + c.gapHW) * 0.5;      /* its centreline           */

    for (s = -1; s <= 1; s += 2) {
      var y = s * cy, oy = s * c.hw;      /* c.hw IS the pod's outer face */
      g.add(box(THREE, L, cw, H, M2.skin, xm, y, zm));
      g.add(box(THREE, L + 0.09, cw + 0.09, 0.07, M2.skin, xm, y, c.z1 + 0.02));
      /* one raked pane per pod. The real screen is two; at this size a second
         mullion on a one-metre cab is a smear, and the mirror arm is already
         doing the "road vehicle" work. */
      g.add(box(THREE, 0.08, cw * 0.80, H * 0.44, M2.glass, c.x1 + 0.015, y, c.z1 - 0.34, 0.18));
      g.add(box(THREE, 0.24, cw + 0.06, 0.08, M2.skin, c.x1 - 0.07, y, c.z1 - 0.05));
      /* the round roof hatch: from an RTS camera the roof IS the cab */
      g.add(cylZ(THREE, 0.24, 0.24, 0.07, 8, M2.dark, xm - 0.34, y, c.z1 + 0.09));
      /* outer face only - door, glass, pillars, step, mirror. The inner face
         looks into the engine bay and nothing there can ever be seen. */
      g.add(box(THREE, L * 0.42, 0.05, 0.32, M2.glass, xm + 0.16, oy, c.z1 - 0.38));
      g.add(box(THREE, 0.05, 0.05, H - 0.16, M2.dark, xm - 0.24, oy + s * 0.02, zm));
      g.add(box(THREE, 0.05, 0.05, H - 0.16, M2.dark, xm + 0.72, oy + s * 0.02, zm));
      g.add(box(THREE, 0.42, 0.18, 0.06, M2.steel, xm - 0.10, oy + s * 0.09, c.z0 - 0.26));
      g.add(box(THREE, 0.05, 0.22, 0.05, M2.dark, c.x1 - 0.20, oy + s * 0.12, c.z1 - 0.18));
      g.add(box(THREE, 0.06, 0.05, 0.30, M2.dark, c.x1 - 0.20, oy + s * 0.22, c.z1 - 0.32));
      /* two headlamps per pod in guards, which is what the vehicle carries */
      for (i = -1; i <= 1; i += 2) {
        g.add(cylX(THREE, 0.12, 0.12, 0.15, 8, M2.dark, c.x1 + 0.10, y + i * cw * 0.27, c.z0 + 0.26));
        g.add(cylX(THREE, 0.10, 0.10, 0.05, 8, M2.lamp, c.x1 + 0.18, y + i * cw * 0.27, c.z0 + 0.26));
      }
    }

    /* ---- the bay between the pods ----
       Kept LOW on purpose. The notch is as wide as the missile is thick and
       as deep as the pods are tall, and it is the recognition cue from the
       front and from directly overhead; fill it to cab height and the vehicle
       is a wide-cab lorry again. */
    var eL = L - 0.52;
    g.add(box(THREE, eL, c.gapHW * 2, P.engZ - P.frameZ1, M2.skin,
              c.x0 + eL * 0.5, 0, (P.frameZ1 + P.engZ) * 0.5));
    for (i = 0; i < 4; i++)                        /* cooling louvres, let in */
      g.add(box(THREE, 0.09, c.gapHW * 1.7, 0.05, M2.dark,
                c.x0 + 0.40 + i * 0.34, 0, P.engZ));
    /* the radiator nose forward of the engine, lower still, with its grille */
    g.add(box(THREE, 0.52, c.gapHW * 2, 0.50, M2.skin, c.x1 - 0.26, 0, P.frameZ1 + 0.22));
    for (i = 0; i < 3; i++)
      g.add(box(THREE, 0.05, c.gapHW * 1.6, 0.07, M2.dark,
                c.x1 - 0.01, 0, P.frameZ1 + 0.10 + i * 0.14));

    /* frame horns, bumper and shackles under the pods: without them there is
       a metre of daylight between the front tyre and the cab front */
    g.add(box(THREE, 0.92, 2.40, 0.24, M2.steel, c.x1 - 0.36, 0, P.frameZ0 + 0.16));
    g.add(box(THREE, 0.18, c.hw * 1.92, 0.30, M2.dark, c.x1 + 0.13, 0, P.frameZ0 + 0.18));
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, 0.24, 0.12, 0.20, M2.steel, c.x1 + 0.20, s * 0.52, P.frameZ0 + 0.16));
  }

  /* one cab call for every assembler in the file, so a launcher family that
     wants the split pods says so in its parameter object and nowhere else */
  function cabFor(THREE, g, P, M2) {
    if (P.cab.style === "split") splitCab(THREE, g, P, M2);
    else cabBlock(THREE, g, P, M2);
  }

  /* ================================================================= jacks
     Screw jacks on outriggers. A launcher fires them down before the round
     goes and the model is drawn in that state, which is also convenient:
     the pads reach z = 0 with the tyres, so render3d's belly-snap does
     nothing and the vehicle sits flat on the terrain. */
  function jacks(THREE, g, P, M2) {
    for (var i = 0; i < P.jackX.length; i++)
      for (var s = -1; s <= 1; s += 2) {
        var x = P.jackX[i], y = s * P.jackY;
        /* the outrigger arm, out from the frame */
        g.add(box(THREE, 0.30, P.jackY - 0.60, 0.20, M2.steel, x, s * (P.jackY * 0.5 + 0.28),
                  P.frameTop - 0.14));
        /* the leg: an outer tube with a bright screw inside it */
        g.add(cylZ(THREE, 0.15, 0.15, P.frameTop - 0.50, 10, M2.steel,
                   x, y, (P.frameTop - 0.14) - (P.frameTop - 0.50) * 0.5));
        g.add(cylZ(THREE, 0.085, 0.085, 0.60, 8, M2.chrome, x, y, 0.36));
        /* the pad, flat on the ground */
        g.add(cylZ(THREE, 0.34, 0.30, 0.12, 10, M2.dark, x, y, 0.06));
        g.add(box(THREE, 0.16, 0.16, 0.10, M2.steel, x, y, 0.17));
      }
  }

  /* =============================================================== erector
     The cradle. Hinged on lugs at the tail, raked a few degrees nose-up,
     carrying the clamshell cover, the rounds inside it, and the ram gear.
     Built in its OWN frame - origin at the hinge pin, +X forward, z = 0 at
     the top of the launch beams - so nothing here is trigonometry. */
  function erector(THREE, M, P, M2) {
    var E = new THREE.Group();
    E.position.set(P.pivotX, 0, P.pivotZ);
    E.rotation.y = -P.elev;
    var i, s;

    /* launch beams, one under each round, tied by cross members */
    for (i = 0; i < P.missY.length; i++)
      E.add(box(THREE, P.beamX1 - P.beamX0, 0.34, 0.18, M2.steel,
                (P.beamX0 + P.beamX1) * 0.5, P.missY[i], -0.09));
    for (i = 0; i < 5; i++)
      E.add(box(THREE, 0.14, P.shroudHW * 1.9, 0.14, M2.steel,
                P.beamX0 + 0.4 + i * (P.beamX1 - P.beamX0 - 0.8) / 4, 0, -0.09));

    /* ---- the cover ----
       A lofted clamshell. sq is kept low: the exponent acts in normalised
       space, so a section this wide and shallow at the value armour3d
       recommends comes out as a rounded shoulder and the cover reads as a
       fuel bowser again. */
    var secs = [
      { x: P.shroudX0,        w: P.shroudHW * 0.97, h: P.shroudTop * 0.50, zc: P.shroudTop * 0.50, sq: 0.22 },
      { x: P.shroudX0 + 0.34, w: P.shroudHW,        h: P.shroudTop * 0.52, zc: P.shroudTop * 0.49, sq: 0.22 },
      { x: P.shroudX1 - 1.90, w: P.shroudHW,        h: P.shroudTop * 0.52, zc: P.shroudTop * 0.49, sq: 0.22 },
      { x: P.shroudX1 - 0.70, w: P.shroudHW * 0.95, h: P.shroudTop * 0.49, zc: P.shroudTop * 0.48, sq: 0.24 },
      { x: P.shroudX1,        w: P.shroudHW * 0.80, h: P.shroudTop * 0.42, zc: P.shroudTop * 0.46, sq: 0.26 },
    ];
    E.add(new THREE.Mesh(body(THREE, M, secs, 16), M2.skin));

    /* aft bulkhead: the cover is closed at the back, which is why no missile
       geometry is modelled behind the collar - none of it can ever be seen */
    E.add(box(THREE, 0.10, P.shroudHW * 1.90, P.shroudTop * 0.94, M2.skin,
              P.shroudX0 - 0.04, 0, P.shroudTop * 0.50));
    /* the clamshell split down the crown, and the transverse ribs */
    E.add(box(THREE, P.shroudX1 - P.shroudX0, 0.10, 0.08, M2.dark,
              (P.shroudX0 + P.shroudX1) * 0.5, 0, P.shroudTop + 0.01));
    for (i = 0; i < 5; i++) {
      var rx = P.shroudX0 + 0.65 + i * (P.shroudX1 - P.shroudX0 - 1.35) / 4;
      E.add(box(THREE, 0.10, P.shroudHW * 2.02, P.shroudTop * 0.98, M2.skin,
                rx, 0, P.shroudTop * 0.50));
      /* latch clips down each flank, at the split line of the shell */
      for (s = -1; s <= 1; s += 2)
        E.add(box(THREE, 0.14, 0.08, 0.16, M2.dark, rx, s * (P.shroudHW + 0.03), P.shroudTop * 0.48));
    }
    /* the front collar the rounds come out through */
    E.add(box(THREE, 0.14, P.shroudHW * 1.70, 0.12, M2.steel, P.shroudX1, 0, P.shroudTop * 0.90));
    E.add(box(THREE, 0.14, P.shroudHW * 1.70, 0.12, M2.steel, P.shroudX1, 0, 0.02));
    for (s = -1; s <= 1; s += 2)
      E.add(box(THREE, 0.14, 0.12, P.shroudTop * 0.92, M2.steel,
                P.shroudX1, s * P.shroudHW * 0.85, P.shroudTop * 0.46));

    /* ---- the rounds ----
       Only the section forward of the collar exists. Everything behind it is
       inside a closed cover and would be geometry nobody ever sees. */
    var cyl0 = P.shroudX1 - 0.30;
    for (i = 0; i < P.missY.length; i++) {
      var my = P.missY[i], mz = P.missZ;
      E.add(cylX(THREE, P.missR, P.missR, P.missNoseX - cyl0, 12, M2.miss,
                 (cyl0 + P.missNoseX) * 0.5, my, mz));
      E.add(coneX(THREE, P.missR, P.missTipX - P.missNoseX, 12, M2.missN,
                  P.missNoseX, my, mz));
      /* a banded joint ring and the fairing strakes: without them the round
         is a grey sausage and reads as a pipe */
      E.add(cylX(THREE, P.missR * 1.05, P.missR * 1.05, 0.07, 12, M2.dark,
                 P.missNoseX - 0.12, my, mz));
      for (s = -1; s <= 1; s += 2)
        E.add(box(THREE, P.missNoseX - cyl0 - 0.2, 0.05, 0.11, M2.dark,
                  (cyl0 + P.missNoseX) * 0.5, my + s * P.missR * 0.72, mz + P.missR * 0.62));
      /* the rail shoe under each round, on the beam */
      E.add(box(THREE, 0.40, 0.26, 0.22, M2.steel, cyl0 + 0.10, my, mz - P.missR - 0.11));
    }

    /* hinge lugs and the pin, drawn in the cradle frame so they stay put */
    for (s = -1; s <= 1; s += 2) {
      E.add(box(THREE, 0.46, 0.14, 0.44, M2.steel, 0.02, s * (P.shroudHW * 0.72), -0.20));
      E.add(cylY(THREE, 0.11, 0.11, 0.24, 10, M2.chrome, -0.02, s * (P.shroudHW * 0.72), -0.26));
    }
    /* a hook for family fittings that have to travel with the cover: the
       cradle frame is fully determined by pivotX, pivotZ and elev, so a kit
       drawn in here is welded to the cover for good and needs no trigonometry
       and no second mats() call */
    if (P.cradleExtra) P.cradleExtra(THREE, E, P, M2);
    return E;
  }

  /* the rams live in the HULL frame, because they connect a thing that turns
     to a thing that does not; the geometry above them is the cradle's. */
  function erectorRams(THREE, g, P, M2) {
    var x0 = P.pivotX + P.ramFoot, z0 = P.deckZ + 0.06;
    var x1 = P.pivotX + P.ramHead * Math.cos(P.elev);
    var z1 = P.pivotZ + P.ramHead * Math.sin(P.elev) - 0.16;
    for (var s = -1; s <= 1; s += 2) {
      var y = s * (P.shroudHW * 0.78);
      g.add(strut(THREE, 0.13, 10, M2.steel, x0, z0, (x0 + x1) * 0.5, (z0 + z1) * 0.5, y));
      g.add(strut(THREE, 0.085, 8, M2.chrome, (x0 + x1) * 0.5, (z0 + z1) * 0.5, x1, z1, y));
      /* the trunnion the ram foot sits in */
      g.add(box(THREE, 0.30, 0.24, 0.26, M2.steel, x0, y, P.deckZ + 0.10));
    }
  }

  /* ============================================================== markings
     C.team is a CSS hex STRING. Small panels only, and never on the cover:
     eraPaint skips anything within 0.12 RGB of the team colour, so a
     team-painted cover would sit out every era finish in the game. */
  function markings(THREE, g, P, C, M2) {
    if (!C || !C.team) return;
    var team = new THREE.MeshStandardMaterial({
      color: C.team, roughness: 0.58, metalness: 0.18 });
    var c = P.cab;
    for (var s = -1; s <= 1; s += 2) {
      /* on the cab door, where nothing can cover it */
      g.add(box(THREE, 0.54, 0.04, 0.16, team, (c.x0 + c.x1) * 0.5 - 0.36,
                s * (c.hw + 0.03), c.z0 + 0.42));
      /* and on the deck skirt, which is the three-quarter rear view */
      g.add(box(THREE, 0.78, 0.04, 0.13, team, P.X_TAIL + 2.55,
                s * (P.hw + 0.09), P.deckZ - 0.60));
    }
    /* One on the tail plate for the view from directly behind. wheeledChassis
       puts its tail plate at X_TAIL + 0.07 and trackedChassis puts its rear
       plate at X_TAIL + 0.42, so on a tracked hull a panel at X_TAIL + 0.02
       hangs 0.33 m astern of the vehicle in open air - which it has been
       doing on tel_k. The panel is small, so this moves nothing measurable. */
    g.add(box(THREE, 0.05, 0.62, 0.14, team,
              P.X_TAIL + (P.tracked ? 0.49 : 0.02), 0, P.deckZ - 0.42));
  }

  /* ========================================================= the assembler */
  function buildHeavy(P) {
    return function (THREE, M, C) {
      var M2 = mats(THREE, P);
      var g = new THREE.Group();

      if (P.tracked) trackedChassis(THREE, g, P, M2);
      else {
        wheeledChassis(THREE, g, P, M2);
        for (var i = 0; i < P.axleX.length; i++)
          for (var s = -1; s <= 1; s += 2) {
            var w = roadWheel(THREE, P.wheelR, P.wheelW, M2, false);
            w.position.set(P.axleX[i], s * P.wheelY, P.wheelR);
            g.add(w);
          }
      }
      cabFor(THREE, g, P, M2);
      jacks(THREE, g, P, M2);
      erectorRams(THREE, g, P, M2);
      g.add(erector(THREE, M, P, M2));
      markings(THREE, g, P, C, M2);
      /* family-specific clutter, in the HULL frame. buildHeavy is the file's
         designed extension point and this keeps it that way, instead of a
         second assembler that has to be kept in step with this one for ever. */
      if (P.extra) P.extra(THREE, g, P, M2);
      return g;
    };
  }

  /* ================================================================ tel_p
     9P78-1. The reference build: 13.10 x 3.10 m over the tyres, deck at
     1.86, two rounds under one cover. */
  var TEL_P = {
    id: "tel_p", base: "#49533b", paint: 0x49533b,
    tones: ["#3a422e", "#59614a", "#434b36"], seed: 91021,
    tracked: false,
    X_NOSE: 6.34, X_TAIL: -6.34,
    hw: 1.52, frameZ0: 1.00, frameZ1: 1.32, frameTop: 1.32, deckZ: 1.86,
    wheelR: 0.66, wheelW: 0.50, wheelY: 1.36,
    axleX: [4.92, 3.42, -2.42, -3.98],
    cab:    { x0: 3.86, x1: 6.34, hw: 1.44, z0: 1.24, z1: 2.90, style: "stepped" },
    cabin2: { x0: 2.42, x1: 3.70, hw: 1.32, z0: 1.86, z1: 2.78 },
    jackX: [-5.05, -6.02], jackY: 1.44,
    pivotX: -5.62, pivotZ: 1.94, elev: 0.065,
    beamX0: -0.40, beamX1: 7.05,
    shroudX0: 0.00, shroudX1: 6.55, shroudHW: 1.20, shroudTop: 1.05,
    missY: [0.62, -0.62], missR: 0.45, missZ: 0.52,
    missNoseX: 7.02, missTipX: 7.92,
    ramFoot: 1.30, ramHead: 3.60,
  };

  /* ================================================================ tel_c
     DF-16 on a 10x10. Five axles and one bigger round: the two changes that
     are legible at RTS zoom, and both of them are real. */
  var TEL_C = {
    id: "tel_c", base: "#414c34", paint: 0x414c34,
    tones: ["#333d29", "#515c41", "#3b4530"], seed: 33517,
    tracked: false,
    X_NOSE: 6.90, X_TAIL: -6.82,
    hw: 1.55, frameZ0: 1.02, frameZ1: 1.36, frameTop: 1.36, deckZ: 1.90,
    wheelR: 0.66, wheelW: 0.50, wheelY: 1.40,
    axleX: [5.52, 4.02, -1.12, -3.36, -4.86],
    cab:    { x0: 4.35, x1: 6.90, hw: 1.52, z0: 1.26, z1: 3.00, style: "full" },
    cabin2: { x0: 3.05, x1: 4.20, hw: 1.36, z0: 1.90, z1: 2.82 },
    jackX: [-5.50, -6.50], jackY: 1.46,
    pivotX: -6.10, pivotZ: 1.98, elev: 0.060,
    beamX0: -0.40, beamX1: 7.45,
    shroudX0: 0.00, shroudX1: 6.95, shroudHW: 0.98, shroudTop: 1.20,
    missY: [0], missR: 0.53, missZ: 0.60,
    missNoseX: 7.45, missTipX: 8.55,
    ramFoot: 1.40, ramHead: 3.90,
  };

  /* ================================================================ tel_k
     KN-23 on the tracked launcher. Same deck, same cover, same two rounds -
     and running gear nothing else in the roster has. */
  var TEL_K = {
    id: "tel_k", base: "#4b503a", paint: 0x4b503a,
    tones: ["#3c412e", "#5a5f47", "#454a34"], seed: 70413,
    tracked: true,
    X_NOSE: 6.30, X_TAIL: -6.10,
    hw: 1.46, hullZ0: 0.62, frameTop: 1.60, deckZ: 1.80,
    trackY: 1.36, trackW: 0.58, trackTop: 1.08, roadR: 0.42,
    roadX: [-4.60, -3.10, -1.60, -0.10, 1.40, 2.90, 4.40],
    rollX: [-3.60, -1.40, 0.90, 3.10],
    sprocketX: 5.40, idlerX: -5.45,
    cab:    { x0: 3.50, x1: 5.90, hw: 1.44, z0: 1.24, z1: 2.86, style: "box" },
    cabin2: null,
    jackX: [-5.35, -6.20], jackY: 1.42,
    pivotX: -5.30, pivotZ: 1.88, elev: 0.065,
    beamX0: -0.40, beamX1: 6.95,
    shroudX0: 0.00, shroudX1: 6.45, shroudHW: 1.18, shroudTop: 1.03,
    missY: [0.60, -0.60], missR: 0.44, missZ: 0.51,
    missNoseX: 6.90, missTipX: 7.78,
    ramFoot: 1.30, ramHead: 3.50,
  };

  /* ================================================================ tel_n
     M142 HIMARS with one PrSM pod. Deliberately a different animal: a
     five-ton 6x6 with an armoured cab and a pod cage on the back, drawn at
     a quarter of the mass of the others. The two launch mouths in the face
     of the pod are the entire "these are missiles" argument, because there
     is no ogive showing anywhere on this vehicle. */
  var TEL_N = {
    id: "tel_n", base: "#4c5236", paint: 0x4c5236,
    tones: ["#3d4229", "#5c6144", "#454a30"], seed: 51907,
    X_NOSE: 3.50, X_TAIL: -3.50,
    hw: 1.14, frameZ0: 0.86, frameZ1: 1.16, deckZ: 1.55,
    wheelR: 0.60, wheelW: 0.42, wheelY: 1.06,
    axleX: [2.22, -1.15, -2.50],
    cab: { x0: 1.10, x1: 3.29, hw: 1.12, z0: 1.12, z1: 2.72 },
    /* The module is trunnioned at its FORWARD end and elevates rear-up,
       because an M270 and a HIMARS fire backwards over their own tail: for
       the round to go up, the muzzle end of the pod has to be the high end.
       Built the other way round - pod face forward, front end rising - the
       mouths ended up 0.36 m inside the back of the cab and could not be
       seen from any angle a player ever gets, which threw away the only
       thing on this vehicle that says "missiles". Hence rotation.y = +elev
       here and -elev on the heavy launchers. */
    baseX: -1.50, pivotX: 0.55, pivotZ: 1.72, elev: 0.075,
    podX0: -3.85, podX1: -0.10, podHW: 0.78, podZ0: 0.04, podZ1: 1.24,
    mouthY: 0.38, mouthR: 0.34,
  };

  function buildHimars(THREE, M, C) {
    var P = TEL_N, M2 = mats(THREE, P), i, s;
    var g = new THREE.Group();

    /* ---- chassis ---- */
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, P.X_NOSE - P.X_TAIL - 0.40, 0.14, P.frameZ1 - P.frameZ0,
                M2.steel, 0, s * 0.56, (P.frameZ0 + P.frameZ1) * 0.5));
    for (i = 0; i < P.axleX.length; i++) {
      g.add(box(THREE, 0.12, 1.20, 0.14, M2.steel, P.axleX[i], 0, P.frameZ0 + 0.08));
      for (s = -1; s <= 1; s += 2) {
        var w = roadWheel(THREE, P.wheelR, P.wheelW, M2, false);
        w.position.set(P.axleX[i], s * P.wheelY, P.wheelR);
        g.add(w);
        g.add(box(THREE, P.wheelR * 2.30, P.wheelW + 0.18, 0.08, M2.skin,
                  P.axleX[i], s * P.wheelY, P.wheelR + 0.42));
      }
    }
    /* the flat load bed, the whole point of a HIMARS: it is a lorry */
    g.add(box(THREE, P.cab.x0 - P.X_TAIL - 0.10, P.hw * 2, 0.30, M2.skin,
              (P.cab.x0 + P.X_TAIL) * 0.5, 0, P.deckZ - 0.15));
    g.add(box(THREE, P.cab.x0 - P.X_TAIL, P.hw * 2 + 0.14, 0.08, M2.skin,
              (P.cab.x0 + P.X_TAIL) * 0.5, 0, P.deckZ + 0.03));
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 1.20, 0.26, 0.36, M2.skin, 0.10, s * (P.hw + 0.02), P.deckZ - 0.28));
      g.add(box(THREE, 1.24, 0.30, 0.05, M2.dark, 0.10, s * (P.hw + 0.02), P.deckZ - 0.08));
      /* the rear step and light cluster */
      g.add(box(THREE, 0.16, 0.34, 0.06, M2.steel, P.X_TAIL + 0.10, s * 0.78, P.frameZ0 - 0.12));
      g.add(box(THREE, 0.06, 0.16, 0.16, M2.lamp, P.X_TAIL + 0.05, s * 0.86, P.deckZ - 0.18));
    }
    g.add(box(THREE, 0.14, P.hw * 2, 0.62, M2.skin, P.X_TAIL + 0.06, 0, P.deckZ - 0.30));
    g.add(cylX(THREE, 0.24, 0.24, 1.10, 10, M2.steel, -0.30, -(P.hw - 0.16), P.frameZ1 - 0.02));

    /* ---- armoured cab ----
       Small, square, and the windows are ports rather than a windscreen.
       Since 2004 this is what an American gun crew rides in. */
    var c = P.cab, xm = (c.x0 + c.x1) * 0.5, zm = (c.z0 + c.z1) * 0.5;
    g.add(box(THREE, c.x1 - c.x0, c.hw * 2, c.z1 - c.z0, M2.skin, xm, 0, zm));
    g.add(box(THREE, c.x1 - c.x0 + 0.10, c.hw * 2 + 0.10, 0.08, M2.skin, xm, 0, c.z1 + 0.02));
    g.add(box(THREE, 0.09, c.hw * 1.55, 0.52, M2.glass, c.x1 + 0.02, 0, c.z1 - 0.44, 0.24));
    g.add(box(THREE, 0.12, 0.10, 0.58, M2.skin, c.x1 + 0.03, 0, c.z1 - 0.44, 0.24));
    g.add(box(THREE, 0.26, c.hw * 2 + 0.06, 0.09, M2.skin, c.x1 - 0.10, 0, c.z1 - 0.06));
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.42, 0.06, 0.34, M2.glass, xm + 0.42, s * (c.hw + 0.01), c.z1 - 0.46));
      g.add(box(THREE, 0.05, 0.05, c.z1 - c.z0 - 0.20, M2.dark, xm - 0.10, s * (c.hw + 0.02), zm));
      g.add(box(THREE, 0.05, 0.22, 0.05, M2.dark, c.x1 - 0.16, s * (c.hw + 0.12), c.z1 - 0.14));
      g.add(box(THREE, 0.06, 0.05, 0.30, M2.dark, c.x1 - 0.16, s * (c.hw + 0.21), c.z1 - 0.28));
      g.add(cylX(THREE, 0.12, 0.12, 0.14, 10, M2.dark, c.x1 + 0.10, s * (c.hw - 0.26), c.z0 + 0.52));
      g.add(cylX(THREE, 0.10, 0.10, 0.05, 10, M2.lamp, c.x1 + 0.18, s * (c.hw - 0.26), c.z0 + 0.52));
      g.add(box(THREE, 0.40, 0.18, 0.06, M2.steel, xm - 0.30, s * (c.hw + 0.09), c.z0 - 0.28));
    }
    g.add(box(THREE, 0.18, c.hw * 2 + 0.10, 0.26, M2.dark, c.x1 + 0.12, 0, c.z0 + 0.14));
    for (i = 0; i < 4; i++)
      g.add(box(THREE, 0.05, c.hw * 1.20, 0.06, M2.dark, c.x1 + 0.04, 0, c.z0 + 0.34 + i * 0.12));
    /* the roof hatch ring: on a HIMARS the crew fight the truck, not the pod */
    g.add(cylZ(THREE, 0.30, 0.30, 0.08, 12, M2.skin, xm + 0.10, 0.30, c.z1 + 0.08));

    /* ---- traverse base and launcher module ----
       The module IS the launcher: it trains on a ring under the load bed and
       elevates as one piece. Nothing here is named "turret" - tel_n carries
       turret:false like the rest of the family, so the hull turns. */
    g.add(cylZ(THREE, 0.82, 0.82, 0.16, 14, M2.steel, P.baseX, 0, P.deckZ + 0.11));
    /* the base plate stops short of the tail plate: run out to the module's
       full length it became the aftmost thing on the vehicle and pushed the
       measured extent 0.58 m past the seven metres this truck actually is */
    g.add(box(THREE, 3.86, 1.86, 0.14, M2.skin, P.baseX + 0.10, 0, P.deckZ + 0.24));
    for (s = -1; s <= 1; s += 2) {
      /* the trunnion posts, at the FORWARD end of the base plate */
      g.add(box(THREE, 0.24, 0.20, 0.46, M2.steel, P.pivotX - 0.06, s * 0.74, P.deckZ + 0.50));
      g.add(cylY(THREE, 0.10, 0.10, 0.22, 10, M2.chrome, P.pivotX, s * 0.74, P.pivotZ));
    }

    var E = new THREE.Group();
    E.position.set(P.pivotX, 0, P.pivotZ);
    E.rotation.y = P.elev;              /* +ve: the AFT end of the module rises */

    /* The pod in its cage: side frames, cross ties and a floor beam. Drawn as
       a plain solid box the launcher read as a skip on a lorry. */
    var pxm = (P.podX0 + P.podX1) * 0.5, pzm = (P.podZ0 + P.podZ1) * 0.5;
    var pLen = P.podX1 - P.podX0;
    E.add(box(THREE, pLen, P.podHW * 2, P.podZ1 - P.podZ0, M2.skin, pxm, 0, pzm));
    for (s = -1; s <= 1; s += 2) {
      E.add(box(THREE, pLen + 0.20, 0.10, 0.16, M2.steel,
                pxm + 0.06, s * (P.podHW + 0.07), P.podZ0 + 0.04));
      E.add(box(THREE, pLen + 0.20, 0.10, 0.16, M2.steel,
                pxm + 0.06, s * (P.podHW + 0.07), P.podZ1 - 0.06));
      for (i = 0; i < 4; i++)
        E.add(box(THREE, 0.12, 0.10, P.podZ1 - P.podZ0, M2.steel,
                  P.podX1 - 0.20 - i * (pLen - 0.55) / 3,
                  s * (P.podHW + 0.07), pzm));
    }
    /* the closed forward end, up against the trunnion */
    E.add(box(THREE, 0.16, P.podHW * 2 + 0.16, P.podZ1 - P.podZ0, M2.skin,
              P.podX1 + 0.06, 0, pzm));
    /* THE FACE, at the tail, and the two mouths in it. This is the whole
       read: there is no ogive anywhere on this vehicle, so the mouths carry
       the entire "these are missiles and not rockets" argument. */
    E.add(box(THREE, 0.12, P.podHW * 2 + 0.06, P.podZ1 - P.podZ0 + 0.06, M2.steel,
              P.podX0 - 0.05, 0, pzm));
    for (s = -1; s <= 1; s += 2) {
      E.add(cylX(THREE, P.mouthR, P.mouthR, 0.34, 14, M2.dark, P.podX0 - 0.04, s * P.mouthY, pzm));
      E.add(cylX(THREE, P.mouthR * 0.78, P.mouthR * 0.78, 0.40, 14, M2.rub,
                 P.podX0 - 0.02, s * P.mouthY, pzm));
      E.add(cylX(THREE, P.mouthR * 1.12, P.mouthR * 1.12, 0.07, 14, M2.steel,
                 P.podX0 - 0.13, s * P.mouthY, pzm));
    }
    /* lifting eyes on the crown: the pod is changed in the field by crane,
       which is the whole logistical argument for the vehicle */
    for (i = 0; i < 2; i++)
      E.add(box(THREE, 0.14, 0.34, 0.10, M2.dark,
                P.podX0 + 0.7 + i * (pLen - 1.4), 0, P.podZ1 + 0.06));
    g.add(E);

    /* The elevation rams push UP on the module behind the trunnion, which is
       the only place they can go once the hinge is at the front. Short and
       stubby at this elevation, and that is honest: a launcher at four
       degrees has barely broken its cradle. */
    var rx1 = P.pivotX - 2.30 * Math.cos(P.elev);
    var rz1 = P.pivotZ + 2.30 * Math.sin(P.elev) + 0.06;
    for (s = -1; s <= 1; s += 2) {
      g.add(strut(THREE, 0.11, 10, M2.steel, rx1 + 0.62, P.deckZ + 0.32, rx1, rz1, s * 0.66));
      g.add(box(THREE, 0.24, 0.20, 0.22, M2.steel, rx1 + 0.62, s * 0.66, P.deckZ + 0.36));
    }

    /* markings: cab door and load bed, never the pod */
    if (C && C.team) {
      var team = new THREE.MeshStandardMaterial({
        color: C.team, roughness: 0.58, metalness: 0.18 });
      for (s = -1; s <= 1; s += 2) {
        g.add(box(THREE, 0.44, 0.04, 0.14, team, xm - 0.28, s * (c.hw + 0.03), c.z0 + 0.38));
        g.add(box(THREE, 0.60, 0.04, 0.12, team, -1.90, s * (P.hw + 0.06), P.deckZ - 0.34));
      }
      g.add(box(THREE, 0.05, 0.50, 0.12, team, P.X_TAIL + 0.06, 0, P.deckZ - 0.36));
    }
    return g;
  }


  /* ==========================================================================
     THE OPEN ERECTOR

     Seven of the twelve new launchers carry their round in the OPEN, on a
     boom, with nothing over it: the three MAZ-543 Scuds, the tracked 8U218
     that fathered them, and all three American tractor-and-trailer erectors.
     erector() above cannot express any of them, and the reason is structural
     rather than decorative: it UNCONDITIONALLY lofts a clamshell, an aft
     bulkhead, five ribs, a crown split and a front collar, and then draws
     only the 30 cm of round forward of that collar, on the sound argument
     that the rest is inside a closed cover. Degenerate the shroud to nothing
     and you get a collapsed loft, five orphaned rib slabs and a collar in mid
     air, and still no tail.

     So this is the same design argument with a different answer. Rule 2 of
     the header says the rounds must show; a clamshell answers it by stopping
     short, and an open boom answers it by showing the whole round - eleven
     metres of pale grey against a green hull, with a cruciform tail off the
     back. That is a bigger difference between two vehicles of the same size
     than anything else available, and it is entirely real: cover versus no
     cover is what separates 1957 and 1965 from 2006.

     Written in the cradle's own frame exactly as erector() is - origin on the
     hinge pin, +X forward, z = 0 at the CROWN of the boom - so nothing in
     here is trigonometry and erectorRams() drops straight on unmodified.
     body()/M.loft is deliberately not used: a ballistic round is a body of
     revolution, so a 14-sided cylinder and a cone are both cheaper and more
     correct, and loft exists in this file for the clamshell there is not one
     of here.                                                              */

  /* the boom. A welded box girder on the modern vehicles; on the 1951
     Corporal a RIVETED LATTICE twice as deep, which is what 1951 structural
     engineering looks like and the one piece of it a 49-degree camera can
     see. The depth is not decoration - the diagonals are kept inside it,
     because drawn across a 20 cm rail they came out through the deck. */
  function openBoom(THREE, E, P, M2) {
    var i, s, x;
    var bl = P.beamX1 - P.beamX0, bm = (P.beamX0 + P.beamX1) * 0.5;
    var dep = P.beamDep, bw = P.beamW || 0.16;

    for (s = -1; s <= 1; s += 2) {
      if (P.lattice) {
        E.add(box(THREE, bl, bw + 0.04, 0.13, M2.steel, bm, s * P.beamHW, -0.065));
        E.add(box(THREE, bl, bw, 0.12, M2.steel, bm, s * P.beamHW, -dep + 0.06));
      } else {
        E.add(box(THREE, bl, bw, dep, M2.steel, bm, s * P.beamHW, -dep * 0.5));
      }
    }
    if (!P.lattice)
      E.add(box(THREE, bl, P.beamHW * 2, 0.09, M2.steel, bm, 0, -dep + 0.045));
    for (i = 0; i < 6; i++)
      E.add(box(THREE, 0.12, P.beamHW * 2 - 0.14, dep - 0.10, M2.steel,
                P.beamX0 + 0.55 + i * (bl - 1.10) / 5, 0, -dep * 0.5));
    if (P.lattice)
      for (i = 0; i < 8; i++) {
        x = P.beamX0 + 0.55 + i * (bl - 1.10) / 7;
        E.add(box(THREE, dep * 1.70, 0.08, 0.08, M2.steel, x, 0, -dep * 0.5,
                  (i % 2 ? 1 : -1) * 0.52));
      }

    /* saddles. Hinged clamp bands amidships and an open roller saddle at the
       front: the arms curling up round the round are what say "clamped down"
       rather than "lying on", and the mixed rhythm is what stops the straps
       reading as a fuel bowser's hoops. Every station is on FULL-DIAMETER
       body - a saddle sized from missR under a tapering warhead hangs in mid
       air, which is the one thing an eye picks up instantly. */
    for (i = 0; i < P.saddleX.length; i++) {
      x = P.saddleX[i];
      E.add(box(THREE, 0.30, P.beamHW * 2 + 0.12, 0.12, M2.steel, x, 0, 0.02));
      for (s = -1; s <= 1; s += 2)
        E.add(box(THREE, 0.20, 0.09, P.missR * 1.20, M2.steel,
                  x, s * (P.missR + 0.06), P.missZ - P.missR * 0.30));
      if (i < P.saddleX.length - 1)
        E.add(box(THREE, 0.20, (P.missR + 0.06) * 2, 0.09, M2.steel,
                  x, 0, P.missZ + P.missR + 0.05));
    }
  }

  /* the round, ALL of it, in the cradle frame. P.nose picks the warhead:
     "cone" is a plain separating re-entry body and "marv" is the Pershing
     II's blunt radar one, which tapers only to 0.62 of body radius and then
     caps, because the area-correlation set that took the CEP to thirty
     metres looks out through that nose. A pointed cone there would be a
     Pershing 1a, and that pair of shapes is the honest difference between
     1969 and 1983 at forty pixels. */
  function openRound(THREE, E, P, M2) {
    var i, a, mr = P.missR, mz = P.missZ;

    E.add(cylX(THREE, mr, mr, P.missNoseX - P.missTailX, 14, M2.miss,
               (P.missTailX + P.missNoseX) * 0.5, 0, mz));
    if (P.nose === "marv") {
      /* cylX turns rotation.z = +PI/2, which sends the cylinder's +Y end to
         -X: r1 is therefore the AFT radius and r2 the forward one, and a
         nose written the other way round comes out as a funnel. */
      E.add(cylX(THREE, mr, mr * 0.62, P.missTipX - P.missNoseX - 0.26, 12, M2.missN,
                 (P.missNoseX + P.missTipX - 0.26) * 0.5, 0, mz));
      E.add(cylX(THREE, mr * 0.62, mr * 0.44, 0.26, 8, M2.missN, P.missTipX - 0.13, 0, mz));
      for (i = 0; i < 4; i++)
        E.add(fin(THREE, 0.50, 0.05, 0.26, M2.missN, P.missNoseX + 0.52, mz,
                  mr * 0.88, PI * 0.25 + i * PI * 0.5));
    } else {
      E.add(coneX(THREE, mr, P.missTipX - P.missNoseX, 14, M2.missN, P.missNoseX, 0, mz));
    }
    /* the warhead joint, the tank band seams and the cable raceway down the
       spine. Without them a ten-metre grey cylinder is a drainpipe. */
    E.add(cylX(THREE, mr * 1.05, mr * 1.05, 0.08, 12, M2.dark, P.missNoseX - 0.11, 0, mz));
    for (i = 0; i < P.bandX.length; i++)
      E.add(cylX(THREE, mr * 1.04, mr * 1.04, 0.07, 12, M2.dark, P.bandX[i], 0, mz));
    E.add(box(THREE, (P.missNoseX - P.missTailX) * 0.86, 0.13, 0.09, M2.dark,
              (P.missTailX + P.missNoseX) * 0.5, 0, mz + mr * 0.94));
    /* motor skirt and the nozzle in the base */
    E.add(cylX(THREE, mr * 0.96, mr * 0.96, 0.20, 12, M2.dark, P.missTailX + 0.10, 0, mz));
    E.add(cylX(THREE, mr * 0.58, mr * 0.44, 0.26, 10, M2.dark, P.missTailX - 0.13, 0, mz));

    /* the fins. Two boxes each, BOTH rooted at the trailing edge, so the
       leading edge sweeps back and the trailing edge stays flush with the
       base of the missile - which is what an R-17 stabiliser actually does.
       P.finSpan is the EXPOSED half-span, body surface to tip. */
    for (i = 0; i < 4; i++) {
      a = PI * 0.25 + i * PI * 0.5;
      E.add(fin(THREE, P.finChord, P.finT, P.finSpan * 0.62, M2.steel,
                P.finRootX + P.finChord * 0.50, mz, mr, a));
      E.add(fin(THREE, P.finChord * 0.60, P.finT, P.finSpan * 0.38, M2.steel,
                P.finRootX + P.finChord * 0.30, mz, mr + P.finSpan * 0.62, a));
      /* the graphite jet vane, clocked with its fin and AFT of the nozzle
         exit, where astern - the one view in which a launcher and a tanker
         are otherwise identical - can actually see it */
      if (P.vanes)
        E.add(fin(THREE, 0.10, 0.05, 0.14, M2.dark, P.missTailX - 0.33, mz, 0.06, a));
    }
  }

  /* the launch table, stowed on end at the aft end of the boom. On the whole
     Scud family, from the 8U218 through to the 9P117, the table rides on the
     erector and swings down with it: the boom goes up, the table arrives at
     the bottom of it and is lowered onto the ground, and the round stands on
     THAT and not on the vehicle. So it lives in the cradle frame, and at a
     metre tall on a 3.3 m vehicle it breaks the rear silhouette without ever
     approaching the crown. */
  function launchTable(THREE, E, P, M2) {
    var s, x = P.tableX;
    E.add(box(THREE, 0.14, 1.44, 1.02, M2.steel, x, 0, 0.36));
    E.add(cylX(THREE, 0.42, 0.42, 0.12, 12, M2.dark, x + 0.11, 0, 0.36));
    for (s = -1; s <= 1; s += 2) {
      E.add(box(THREE, 0.10, 0.12, 0.86, M2.steel, x + 0.10, s * 0.62, 0.34));
      E.add(box(THREE, 0.12, 0.14, 0.92, M2.steel, x + 0.24, s * 0.86, 0.30));
    }
  }

  function openErector(THREE, P, M2) {
    var E = new THREE.Group(), s;
    E.position.set(P.pivotX, 0, P.pivotZ);
    E.rotation.y = -P.elev;
    openBoom(THREE, E, P, M2);
    openRound(THREE, E, P, M2);
    if (P.tableX !== undefined) launchTable(THREE, E, P, M2);
    /* hinge lugs and the pin, in the cradle frame as erector() has them, and
       outboard of the girders so nothing drives up through the boom floor */
    for (s = -1; s <= 1; s += 2) {
      E.add(box(THREE, 0.50, 0.16, 0.46, M2.steel, 0.06, s * (P.beamHW + 0.15), -0.22));
      E.add(cylY(THREE, 0.12, 0.12, 0.26, 10, M2.chrome, 0.00, s * (P.beamHW + 0.15), -0.26));
    }
    if (P.cradleExtra) P.cradleExtra(THREE, E, P, M2);
    return E;
  }

  /* buildHeavy's twin: same call order, openErector in place of erector, and
     the cab chosen by the parameter object. Used by the three MAZ-543 Scuds
     and by the tracked 8U218. */
  function buildOpen(P) {
    return function (THREE, M, C) {
      var M2 = mats(THREE, P);
      var g = new THREE.Group(), i, s, w;
      if (P.tracked) trackedChassis(THREE, g, P, M2);
      else {
        wheeledChassis(THREE, g, P, M2);
        for (i = 0; i < P.axleX.length; i++)
          for (s = -1; s <= 1; s += 2) {
            w = roadWheel(THREE, P.wheelR, P.wheelW, M2, false);
            w.position.set(P.axleX[i], s * P.wheelY, P.wheelR);
            g.add(w);
          }
      }
      cabFor(THREE, g, P, M2);
      jacks(THREE, g, P, M2);
      erectorRams(THREE, g, P, M2);
      g.add(openErector(THREE, P, M2));
      markings(THREE, g, P, C, M2);
      if (P.extra) P.extra(THREE, g, P, M2);
      return g;
    };
  }

  /* ==========================================================================
     THE NATO ERECTOR-LAUNCHER LINE

     nato_e50_tel (MGM-5 Corporal, 1955), nato_e60_tel (Pershing 1a, 1969) and
     nato_e80_tel (Pershing II, 1983): the only ballistic launchers the West
     ever fielded before ATACMS, and one builder for all three, because all
     three really are the same machine - A TRACTOR TOWING AN ERECTOR-LAUNCHER
     SEMITRAILER WITH THE ROUND LYING IN THE OPEN ON IT. The United States
     never built a monolithic TEL of the Soviet pattern; it hitched the
     launcher to a lorry and left it hitched.

     The two Pershings share ONE TRAILER, and that is not a shortcut: because
     of SALT II no new launchers were built for Pershing II, so the M1003 IS a
     rebuilt M790. Every trailer number below is therefore identical between
     TEL_E60N and TEL_E80N, and the whole of the difference is spent where the
     difference really was - the tractor (a Ford M656/M757 8x8 against a MAN
     KAT1 M1001 with an Atlas AK4300 crane and a 30 kW generator), the round
     (a slender separating cone against a blunt finned biconic radar RV) and
     the paint (plain drab against the 1984 NATO three-tone).

     WHY THIS CANNOT BE A buildHeavy() PARAMETER SET, stated as the brief asks.
     wheeledChassis() builds ONE rigid frame carrying a body tub from the back
     of the cab to the tail plate. These three are ARTICULATED: cab, fifth
     wheel, a four-metre hole, then a trailer bogie. No field in the reference
     parameter object can put a hole in the middle of a chassis, and that break
     in the plan view is the strongest single thing this family has to say -
     nothing else in the roster is a tractor and a trailer except the Patriot
     in sam3d.js, which answers it by standing its canisters up at 38 degrees.
     The cradle, the round and the fins are NOT forked: all three go through
     openErector() with the Scuds.

     THE FIELD THAT LOOKS WRONG AND IS NOT: shroudHW. erectorRams() reads it
     to space the two rams either side of the boom and nothing else does.
     There is no shroud anywhere in this line.                              */

  function elTractor(THREE, g, P, M2) {
    var i, s, ax = P.axleX, w;

    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, P.X_NOSE - P.tailX - 0.34, 0.15, P.frameZ1 - P.frameZ0,
                M2.steel, (P.X_NOSE + P.tailX) * 0.5, s * 0.62,
                (P.frameZ0 + P.frameZ1) * 0.5));

    for (i = 0; i < ax.length; i++) {
      g.add(box(THREE, 0.13, 1.36, 0.15, M2.steel, ax[i], 0, P.frameZ0 + 0.08));
      for (s = -1; s <= 1; s += 2) {
        w = roadWheel(THREE, P.wheelR, P.axleW[i], M2, false);
        w.position.set(ax[i], s * P.wheelY, P.wheelR);
        g.add(w);
        g.add(box(THREE, P.wheelR * 2.30, P.axleW[i] + 0.18, 0.09, M2.skin,
                  ax[i], s * P.wheelY, P.wheelR + 0.40));
        g.add(box(THREE, 0.06, P.axleW[i] + 0.18, 0.28, M2.dark,
                  ax[i] - P.wheelR * 1.12, s * P.wheelY, P.wheelR + 0.26));
      }
    }

    /* the fifth wheel: one plate, and it is the entire articulation argument.
       Everything forward of it steers and everything aft of it is dragged. */
    g.add(box(THREE, 1.24, 1.30, 0.10, M2.steel, P.fifthX, 0, P.fifthZ - 0.11));
    g.add(cylZ(THREE, 0.44, 0.44, 0.10, 10, M2.chrome, P.fifthX, 0, P.fifthZ - 0.03));
    g.add(box(THREE, 0.60, 1.06, 0.07, M2.steel, P.fifthX - 0.70, 0, P.fifthZ - 0.13, 0.24));

    g.add(box(THREE, 0.14, 1.46, 0.32, M2.skin, P.tailX + 0.07, 0, P.frameZ1 - 0.10));
    g.add(cylX(THREE, 0.09, 0.09, 0.20, 8, M2.dark, P.tailX - 0.06, 0, P.frameZ0 + 0.14));

    /* Fuel tank slung off the near rail and air reservoirs ACROSS the frame.
       Transverse, because a bottle laid along the rail fouls a tyre at some
       axle spacing and a bottle across the frame never can. */
    g.add(cylX(THREE, 0.28, 0.28, 1.30, 12, M2.steel,
               P.tankX, -(P.cab.hw - 0.34), P.frameZ0 + 0.02));
    for (i = 0; i < 2; i++)
      g.add(cylY(THREE, 0.16, 0.16, 1.10, 8, M2.chrome,
                 P.airX - i * 0.46, 0, P.frameZ0 + 0.02));

    if (P.stack === false) {
      /* the M39-series petrol truck exhausts DOWN and out under the body
         ahead of the right rear wheels; the upright stack with an air cleaner
         is the later multifuel lorry and would be wrong on a 1951 tractor */
      g.add(cylX(THREE, 0.09, 0.09, 1.10, 8, M2.dark,
                 ax[0] - 1.20, -(P.cab.hw - 0.20), P.frameZ0 - 0.06));
    } else {
      /* the stack is held to 6 cm above the cab roof INCLUDING its rain cap:
         drawn its real height it became the crown of the vehicle, and on this
         family nothing may stand above the load */
      var exH = P.cab.z1 - 0.09 - P.frameZ1;
      g.add(cylZ(THREE, 0.08, 0.08, exH, 8, M2.dark,
                 P.cab.x0 + 0.22, P.cab.hw + 0.09, P.frameZ1 + exH * 0.5));
      g.add(cylZ(THREE, 0.11, 0.08, 0.16, 8, M2.dark,
                 P.cab.x0 + 0.22, P.cab.hw + 0.09, P.frameZ1 + exH - 0.02));
    }
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, 0.34, 0.22, 0.07, M2.steel,
                P.cab.x0 + 0.30, s * (P.cab.hw + 0.10), P.cab.z0 - 0.24));
  }

  /* Three real cabs, and they date the vehicle harder than anything else on
     it. "bonnet" is the M52 of 1951 - the engine is IN FRONT of the crew, a
     hood between two standing wings, a nearly upright two-pane screen and a
     canvas roof panel. "coe" is the Ford M656 of 1968, low, wide and FLAT
     fronted, built to be flown in a C-130. "kat" is the MAN KAT1 of 1976:
     full-width forward control with a rounded roof crown, and the crane
     behind it that is the fastest way to tell a Pershing II from a 1a. */
  function elCab(THREE, g, P, M2) {
    var c = P.cab, s, i;
    var xm = (c.x0 + c.x1) * 0.5, zm = (c.z0 + c.z1) * 0.5;
    var fx  = P.bonnet ? P.bonnet.x1 : c.x1;
    var fhw = P.bonnet ? P.bonnet.hw * 1.86 * 0.5 : c.hw;
    var fz  = P.bonnet ? P.bonnet.z0 + 0.18 : c.z0 + 0.56;

    g.add(box(THREE, c.x1 - c.x0, c.hw * 2, c.z1 - c.z0, M2.skin, xm, 0, zm));
    g.add(box(THREE, c.x1 - c.x0 + 0.10, c.hw * 2 + 0.10, 0.08, M2.skin, xm, 0, c.z1 + 0.02));

    var rake = c.style === "bonnet" ? 0.07 : 0.12;
    var wsH  = c.style === "bonnet" ? 0.54 : 0.74;
    var wsZ  = c.z1 - wsH * 0.5 - 0.14;
    g.add(box(THREE, 0.09, c.hw * 1.66, wsH, M2.glass, c.x1 + 0.015, 0, wsZ, rake));
    g.add(box(THREE, 0.12, 0.09, wsH + 0.06, M2.skin, c.x1 + 0.02, 0, wsZ, rake));
    g.add(box(THREE, 0.24, c.hw * 2 + 0.06, 0.09, M2.skin, c.x1 - 0.08, 0, c.z1 - 0.05));

    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.58, 0.06, 0.42, M2.glass, xm + 0.20, s * (c.hw + 0.01), c.z1 - 0.46));
      g.add(box(THREE, 0.05, 0.05, c.z1 - c.z0 - 0.22, M2.dark, xm - 0.24, s * (c.hw + 0.02), zm));
      g.add(box(THREE, 0.05, 0.05, c.z1 - c.z0 - 0.22, M2.dark, xm + 0.62, s * (c.hw + 0.02), zm));
      g.add(box(THREE, 0.05, 0.22, 0.05, M2.dark, c.x1 - 0.16, s * (c.hw + 0.13), c.z1 - 0.14));
      g.add(box(THREE, 0.06, 0.05, 0.30, M2.dark, c.x1 - 0.16, s * (c.hw + 0.23), c.z1 - 0.28));
      g.add(box(THREE, 0.44, 0.18, 0.06, M2.steel, xm - 0.10, s * (c.hw + 0.09), c.z0 - 0.26));
      g.add(cylX(THREE, 0.13, 0.13, 0.14, 8, M2.dark, fx + 0.10, s * (fhw - 0.14), fz));
      g.add(cylX(THREE, 0.11, 0.11, 0.05, 8, M2.lamp, fx + 0.18, s * (fhw - 0.14), fz));
      g.add(box(THREE, 0.22, 0.12, 0.18, M2.steel, fx + 0.16, s * 0.44, fz - 0.30));
    }
    g.add(box(THREE, 0.18, (P.bonnet ? fhw : c.hw) * 2, 0.28, M2.dark, fx + 0.14, 0, fz - 0.34));

    if (c.style === "bonnet") {
      var b = P.bonnet;
      g.add(box(THREE, b.x1 - b.x0, b.hw * 2, b.z1 - b.z0, M2.skin,
                (b.x0 + b.x1) * 0.5, 0, (b.z0 + b.z1) * 0.5));
      g.add(box(THREE, 0.34, b.hw * 1.86, b.z1 - b.z0 - 0.14, M2.skin,
                b.x1 + 0.14, 0, (b.z0 + b.z1) * 0.5 + 0.03));
      g.add(box(THREE, 0.10, b.hw * 1.70, b.z1 - b.z0 - 0.20, M2.dark,
                b.x1 + 0.30, 0, (b.z0 + b.z1) * 0.5 + 0.02));
      for (i = 0; i < 3; i++)
        g.add(box(THREE, 0.05, b.hw * 1.62, 0.05, M2.chrome,
                  b.x1 + 0.36, 0, b.z0 + 0.20 + i * 0.16));
      /* canvas roof panel over the cab: a 1950s truck is half a tent */
      g.add(box(THREE, c.x1 - c.x0 - 0.16, c.hw * 1.84, 0.06, M2.canvas,
                xm - 0.04, 0, c.z1 + 0.09));
    } else if (c.style === "coe") {
      /* the M656 is a flat slab with a brush guard across the screen and the
         pioneer kit on the frame: it has no bonnet to put anything on and no
         room behind the cab either */
      g.add(box(THREE, 0.07, c.hw * 1.70, 0.06, M2.steel, c.x1 + 0.10, 0, c.z1 - 0.20));
      g.add(box(THREE, 0.90, 0.14, 0.10, M2.dark, xm + 0.10, c.hw + 0.06, c.z0 - 0.10));
      g.add(box(THREE, 0.70, 0.12, 0.09, M2.dark, xm - 0.30, -(c.hw + 0.06), c.z0 - 0.10));
    } else {
      /* KAT1: a rounded roof crown, which is the one line that separates a
         German cab from an American box at this zoom */
      g.add(cylX(THREE, 0.30, 0.30, c.x1 - c.x0 - 0.30, 8, M2.skin, xm, 0, c.z1 - 0.14));
      /* the Atlas AK4300 crane. It handles the warhead section and the
         reload, it is the reason the M1001 exists in this role, and folded
         along the frame it is the fastest way to tell this vehicle from the
         Pershing 1a from any angle. Drawn STOWED, and its height is measured
         rather than chosen: the boom lies flat under the belly of the round
         it must not touch and under the front of the launch beam. */
      var k = P.crane;
      g.add(box(THREE, 0.46, 0.72, k.top - P.frameZ1, M2.skin,
                k.x1, 0.22, (P.frameZ1 + k.top) * 0.5));
      g.add(cylZ(THREE, 0.22, 0.22, 0.20, 8, M2.steel, k.x1, 0.22, k.top + 0.08));
      g.add(box(THREE, k.x1 - k.x0, 0.26, 0.18, M2.steel,
                (k.x0 + k.x1) * 0.5, 0.22, k.top + 0.09));
      g.add(box(THREE, (k.x1 - k.x0) * 0.62, 0.20, 0.14, M2.steel,
                k.x0 + (k.x1 - k.x0) * 0.34, -0.26, k.top + 0.05));
      /* the 30 kW generator that powers the erector, on the other rail */
      g.add(box(THREE, 0.86, 0.60, 0.52, M2.skin, k.x0 + 0.40, -0.44, P.frameZ1 + 0.12));
      g.add(box(THREE, 0.90, 0.06, 0.06, M2.dark, k.x0 + 0.40, -0.74, P.frameZ1 + 0.30));
    }
  }

  /* the low-boy. The neck rides high over the fifth wheel and the deck DROPS
     behind the tractor's tail, which is the only reason a ten-metre round can
     sit at chest height on a truck whose own frame is at 1.4 m. The main
     rails run INBOARD of the bogie tyres and the deck passes over their
     crowns, which is how a low-boy is actually built. */
  function elTrailer(THREE, g, P, M2) {
    var i, s, w;
    var deckLen = P.neckX - P.X_TAIL;

    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, deckLen, 0.16, 0.26, M2.steel,
                (P.neckX + P.X_TAIL) * 0.5, s * 0.72, P.frameTop - 0.13));
    for (i = 0; i < 5; i++)
      g.add(box(THREE, 0.13, 1.60, 0.14, M2.steel,
                P.X_TAIL + 0.5 + i * (deckLen - 1.0) / 4, 0, P.frameTop - 0.20));
    g.add(box(THREE, deckLen, P.hw * 2, 0.10, M2.skin,
              (P.neckX + P.X_TAIL) * 0.5, 0, P.deckZ - 0.05));

    g.add(box(THREE, P.noseX - P.neckX, P.hw * 1.50, 0.26, M2.skin,
              (P.noseX + P.neckX) * 0.5, 0, P.neckTop - 0.13));
    g.add(box(THREE, 0.62, P.hw * 1.50, 0.34, M2.skin,
              P.neckX + 0.10, 0, (P.neckTop + P.frameTop) * 0.5 - 0.10, 0.55));
    g.add(cylZ(THREE, 0.09, 0.09, 0.22, 8, M2.chrome, P.fifthX, 0, P.neckTop - 0.34));
    /* landing legs, stowed up, and AFT of the kingpin where they cannot foul
       the tractor's swing - which is also where a low-boy carries them */
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, 0.16, 0.16, 0.54, M2.steel, P.legX, s * 0.80, P.neckTop - 0.42));

    /* The bogie tyres take roadWheel's PLAIN rim - the same trade the file
       already makes for a wheel running inside a belt. Four of them sit in a
       row under one long fender at the far end of a fourteen-metre model; the
       proud tread band is 92 triangles apiece there for something no camera
       in this game resolves, and it is 368 triangles that buy the Pershing II
       its whole crane and its radar warhead instead. The tractor keeps real
       truck tyres, which is where the size contrast has to read. */
    for (i = 0; i < P.trAxleX.length; i++) {
      g.add(box(THREE, 0.13, 1.44, 0.14, M2.steel, P.trAxleX[i], 0, P.trWheelR + 0.02));
      for (s = -1; s <= 1; s += 2) {
        w = roadWheel(THREE, P.trWheelR, P.trWheelW, M2, true);
        w.position.set(P.trAxleX[i], s * P.trWheelY, P.trWheelR);
        g.add(w);
      }
    }
    var b0 = P.trAxleX[P.trAxleX.length - 1], b1 = P.trAxleX[0];
    for (s = -1; s <= 1; s += 2) {
      /* one long fender per side over the pair, which is what a tandem wears
         and 96 triangles cheaper than four separate arches */
      g.add(box(THREE, (b1 - b0) + P.trWheelR * 2.2, P.trWheelW + 0.20, 0.09, M2.skin,
                (b0 + b1) * 0.5, s * P.trWheelY, P.trWheelR + 0.40));
      g.add(box(THREE, 0.06, P.trWheelW + 0.20, 0.30, M2.dark,
                b0 - P.trWheelR * 1.10, s * P.trWheelY, P.trWheelR + 0.24));
      g.add(box(THREE, 1.10, 0.30, 0.40, M2.skin, b1 + 1.60, s * (P.hw - 0.06), P.deckZ - 0.34));
      g.add(box(THREE, 1.14, 0.34, 0.05, M2.dark, b1 + 1.60, s * (P.hw - 0.06), P.deckZ - 0.12));
    }
    /* the cable trunk that carries the tractor's power back to the erector -
       the same "this thing cannot shoot until it is plugged in" cue sam3d
       uses, and on a Pershing it is literally the 30 kW set doing the work */
    g.add(cylX(THREE, 0.07, 0.07, deckLen * 0.70, 8, M2.dark,
               (P.neckX + P.X_TAIL) * 0.5, P.hw - 0.14, P.deckZ + 0.03));

    if (P.tailPlat) {
      /* the Pershing launch platform, its corner posts and the blast
         deflector the motor fires across. An erector-launcher that had
         nothing at the back would be a flatbed with a pipe on it. */
      g.add(box(THREE, 0.60, P.hw * 1.90, 0.16, M2.steel, P.X_TAIL + 0.30, 0, P.frameTop - 0.06));
      for (s = -1; s <= 1; s += 2)
        g.add(box(THREE, 0.16, 0.16, 0.44, M2.steel, P.X_TAIL + 0.16, s * (P.hw - 0.22), P.frameTop + 0.20));
      g.add(box(THREE, 0.66, P.hw * 1.70, 0.10, M2.dark, P.X_TAIL + 0.30, 0, P.frameTop - 0.36, -0.62));
    } else {
      /* the Corporal has NO launch platform on its trailer and must not be
         given one: the round was lifted off by a separate self-propelled
         erector and stood on a firing PEDESTAL on the ground, with four
         movable arms, a split level for uneven ground and a V-2-derived
         exhaust pyramid in the middle. So the trailer ends in a plain
         riveted cross member, and the pedestal's split level rides stowed
         flat on the deck where the battery actually carried it. */
      g.add(box(THREE, 0.16, P.hw * 1.90, 0.30, M2.steel, P.X_TAIL + 0.10, 0, P.frameTop - 0.10));
      for (i = 0; i < 4; i++)
        g.add(box(THREE, 0.07, 0.07, 0.07, M2.dark, P.X_TAIL + 0.18, (i - 1.5) * 0.44, P.frameTop + 0.02));
      g.add(box(THREE, 1.00, 0.60, 0.09, M2.steel, P.X_TAIL + 1.15, -0.88, P.deckZ + 0.02));
      g.add(cylZ(THREE, 0.28, 0.28, 0.10, 10, M2.dark, P.X_TAIL + 1.15, -0.88, P.deckZ + 0.10));
      for (i = 0; i < 2; i++)
        g.add(box(THREE, 0.88, 0.14, 0.08, M2.steel,
                  P.X_TAIL + 1.15, -0.88 + (i ? 0.32 : -0.32), P.deckZ + 0.11));
    }
  }

  /* markings() hangs its deck panel on the flank of a body tub at
     X_TAIL + 2.55; an erector-launcher has no tub there, only an open frame
     and a bogie, so the panels go on the cab door, the trailer locker face
     and the tail cross member instead. The rule is unchanged and is the
     reason this is five small boxes: C.team is a CSS STRING, it goes into a
     material untouched, and it never goes near the round. */
  function elMarkings(THREE, g, P, C, M2) {
    if (!C || !C.team) return;
    var team = new THREE.MeshStandardMaterial({
      color: C.team, roughness: 0.58, metalness: 0.18 });
    var c = P.cab, s;
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.50, 0.04, 0.15, team, (c.x0 + c.x1) * 0.5 - 0.26,
                s * (c.hw + 0.03), c.z0 + 0.40));
      g.add(box(THREE, 0.72, 0.04, 0.12, team, P.trAxleX[0] + 1.60,
                s * (P.hw + 0.11), P.deckZ - 0.30));
    }
    g.add(box(THREE, 0.05, 0.56, 0.13, team, P.X_TAIL + 0.02, 0, P.frameTop - 0.12));
  }

  function buildEL(P) {
    return function (THREE, M, C) {
      var M2 = mats(THREE, P);
      /* rules.js calls the Corporal "a slim white finned rocket" and that is
         the game's own canon, so it gets a material. The truth behind it is
         worth one line: WHITE with a black roll pattern is the White Sands
         test and display livery; a service round in Germany was olive drab
         with a bright motor section and white stencilling. The pale round is
         kept because it is the loudest thing the 1950s tier owns and because
         a round the colour of its own lorry throws rule 2 away. */
      if (P.roundPaint)
        M2.miss = new THREE.MeshStandardMaterial({
          color: P.roundPaint, roughness: 0.52, metalness: 0.10 });
      var g = new THREE.Group();
      elTractor(THREE, g, P, M2);
      elCab(THREE, g, P, M2);
      elTrailer(THREE, g, P, M2);
      jacks(THREE, g, P, M2);
      erectorRams(THREE, g, P, M2);
      g.add(openErector(THREE, P, M2));
      elMarkings(THREE, g, P, C, M2);
      return g;
    };
  }

  /* ======================================================== family fittings
     Three small hull- or cradle-frame kits, hung on the two hooks added to
     buildHeavy() and erector(). They exist so that a family that needs a
     dozen boxes of its own does not need a second assembler kept in step
     with the shared one for ever. */

  /* ---- the Chinese line, in the CRADLE frame -----------------------------
     Two things buildHeavy cannot express, and both of them are the whole of
     what separates the two DF-15 launchers at RTS zoom:

       - the umbilical trunking down the flank of the cover. On a five-metre
         painted shell it is the only thing that gives the side view a line to
         follow. The run stops before the loft's forward taper, because the
         last two sections pull the shell in to 0.95 and 0.80 of shroudHW and
         a duct carried past that point hangs in open air at the collar, which
         is exactly where the eye goes.
       - the DF-15B's separating biconic finned MaRV: a slimmer body growing
         out of a fatter one. erector() draws one cylinder at missR and one
         cone from missR to a point; there is no parameter that necks a round
         down. So missTipX on the e00 is NOT the tip of the missile, it is the
         apex of the SHOULDER cap, deliberately short so the slim body grows
         out through it, and P.marv carries the real tip.                   */
  function chineseKit(THREE, E, P, M2) {
    var i;
    var dz = P.shroudTop * 0.70;
    var dy = -(P.shroudHW + 0.06);
    var dx0 = P.shroudX0 + 0.55, dx1 = P.shroudX1 - 0.75;
    E.add(box(THREE, dx1 - dx0, 0.14, 0.16, M2.dark, (dx0 + dx1) * 0.5, dy, dz));
    for (i = 0; i < 5; i++)
      E.add(box(THREE, 0.10, 0.22, 0.24, M2.steel,
                dx0 + 0.20 + i * (dx1 - dx0 - 0.40) / 4, dy, dz));
    /* the disconnect box: the umbilical is pulled here and nowhere else, so
       this is where the trunking has to end - and it is set back to
       shroudX1 - 0.90, where the shell is still at full width and the box
       buries 7 cm into it instead of floating off the taper */
    E.add(box(THREE, 0.30, 0.26, 0.38, M2.skin, P.shroudX1 - 0.90, dy, dz - 0.04));
    E.add(box(THREE, 0.05, 0.30, 0.32, M2.dark, P.shroudX1 - 0.76, dy, dz - 0.04));

    if (!P.marv) return;
    var R = P.marv, mz = P.missZ;
    var span = R.x1 - R.x0, drop = R.r1 - R.r0;
    E.add(cylX(THREE, R.r0, R.r1, span, 12, M2.miss, (R.x0 + R.x1) * 0.5, 0, mz));
    E.add(coneX(THREE, R.r1, R.tipX - R.x1, 12, M2.missN, R.x1, 0, mz));
    /* the separation joint, sized off the frustum rather than given its own
       number so it cannot drift away from the body it is meant to band */
    var bandR = (R.r0 + (R.bandX - R.x0) / span * drop) * 1.06;
    E.add(cylX(THREE, bandR, bandR, 0.05, 12, M2.dark, R.bandX, 0, mz));
    var fr = R.r0 + (R.finX - R.x0) / span * drop;
    for (i = 0; i < 4; i++)
      E.add(fin(THREE, 0.34, 0.04, R.finSpan, M2.missN, R.finX, mz, fr,
                PI * 0.25 + i * PI * 0.5));
  }

  /* ---- the 8U218's own kit, in the HULL frame ---------------------------
     A 1957 launcher is not a clean vehicle and must not be drawn as one, and
     this one is an ISU-152 with its casemate cut off. What cabBlock cannot
     give it is the thing that identifies an IS hull from the front: a heavy
     two-plate pointed nose with a steeply raked upper glacis and the driver's
     vision port on the centreline. (trackedChassis draws a glacis of its own
     at cab.x0 + 0.55, which on every def in this file lands INSIDE the cab
     box and has never been visible; it is left alone rather than changed,
     because changing it would move tel_k.)

     Also here: the spare track links, which on an IS hull go on the LOWER
     FRONT PLATE and not along the sponson tops - that is a T-34 habit - and
     the two things that say LIQUID FUEL, which is the entire character of a
     1957 launcher and the reason it took hours to get away. The fuel and
     oxidiser umbilical trough runs from the tail of the boom forward along
     the hull side to a junction box, and the firing-cable reel sits on the
     rear deck. No fuel drums: on the real vehicle the rear plate carries the
     erector hinge, the boom and the table, and there is nowhere to put them. */
  function e50Extras(THREE, g, P, M2) {
    var s, i;

    /* the pointed nose: raked upper glacis, lower plate, vision port */
    g.add(box(THREE, 1.05, P.hw * 2 - 0.10, 0.13, M2.skin,
              P.cab.x1 + 0.30, 0, P.cab.z0 + 0.30, -0.62));
    g.add(box(THREE, 0.72, P.hw * 2 - 0.14, 0.12, M2.skin,
              P.cab.x1 + 0.34, 0, P.hullZ0 + 0.44, 0.55));
    g.add(box(THREE, 0.09, 0.34, 0.16, M2.glass, P.cab.x1 + 0.44, 0, P.cab.z0 + 0.50, -0.62));
    /* spare track links across the lower front, which is where an IS-2 and an
       ISU-152 carry them, and they break up the one flat face on the vehicle */
    for (i = 0; i < 6; i++)
      g.add(box(THREE, 0.26, 0.30, 0.09, M2.steel,
                P.cab.x1 + 0.30, (i - 2.5) * 0.34, P.hullZ0 + 0.28));
    for (s = -1; s <= 1; s += 2) {
      g.add(cylX(THREE, 0.13, 0.13, 0.16, 8, M2.dark, P.cab.x1 + 0.46, s * 0.86, P.cab.z0 + 0.66));
      g.add(cylX(THREE, 0.11, 0.11, 0.05, 8, M2.lamp, P.cab.x1 + 0.54, s * 0.86, P.cab.z0 + 0.66));
      g.add(box(THREE, 0.06, 0.06, 0.34, M2.steel, P.cab.x1 + 0.56, s * 0.86, P.cab.z0 + 0.66));
      /* the propellant umbilical trough down the hull side, and its junction
         box: this is what a liquid-fuelled round needs and a solid one does
         not, and it is the cheapest thing on the model that says 1957 */
      g.add(box(THREE, 2.60, 0.10, 0.14, M2.dark, -0.20, s * (P.hw + 0.05), P.deckZ - 0.20));
      g.add(box(THREE, 0.34, 0.22, 0.30, M2.skin, 1.30, s * (P.hw + 0.06), P.deckZ - 0.22));
    }
    /* the firing-cable reel on the rear deck, off-centre because a
       symmetrical vehicle is a toy */
    g.add(cylY(THREE, 0.26, 0.26, 0.30, 10, M2.dark, P.X_TAIL + 1.15, -0.86, P.deckZ + 0.28));
    g.add(cylY(THREE, 0.10, 0.10, 0.38, 6, M2.steel, P.X_TAIL + 1.15, -0.86, P.deckZ + 0.28));
    /* the blast shield across the rear plate. The R-11 lights its engine on a
       table two metres behind the vehicle and the 8U218's rear structure is
       built to survive that. TWO panels and not one, because the hinge lugs
       and the pin live on the centreline between them - a single plate across
       the full beam swallows the whole hinge, which is the one piece of
       mechanism this vehicle exists to show. */
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.10, 0.56, 0.62, M2.steel, P.X_TAIL + 0.52, s * 0.95, P.deckZ - 0.16));
      for (i = 0; i < 4; i++)
        g.add(box(THREE, 0.05, 0.48, 0.06, M2.dark,
                  P.X_TAIL + 0.58, s * 0.95, P.deckZ - 0.40 + i * 0.16));
    }
    /* the driver's hatch ring on the compartment roof, and the grab rails a
       crew that has to walk along a live missile actually needs */
    g.add(cylZ(THREE, 0.28, 0.28, 0.07, 10, M2.skin, P.cab.x0 + 0.55, -0.42, P.cab.z1 + 0.09));
    g.add(cylZ(THREE, 0.24, 0.24, 0.05, 8, M2.dark, P.cab.x0 + 0.55, -0.42, P.cab.z1 + 0.14));
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 3; i++)
        g.add(box(THREE, 0.05, 0.05, 0.20, M2.dark,
                  P.X_TAIL + 1.10 + i * 1.30, s * (P.hw + 0.02), P.deckZ + 0.12));
  }

  /* ---- the Tochka's amphibian kit, in the HULL frame ---------------------
     The BAZ-5921 is a boat, and wheeledChassis is not. Four things buy that
     back for about a hundred and fifty triangles: the raked bow plate and its
     folding trim vane (which is the leading edge of the silhouette and the
     part of a shape read first), a fairing over each front wheel arch so the
     top of a 1.2 m tyre is not buried in a flat cab wall, the snorkel that
     armour_specs.js already lists in this unit's extras, and the two water
     jet outlets in the tail plate. The exhaust stack is switched OFF in the
     parameter object for the same reason: a sealed amphibian vents low at the
     hull rear and does not carry a pipe up the back of the cab. */
  function tochkaExtras(THREE, g, P, M2) {
    var s, i, c = P.cab;
    /* the raked bow plate and the folding trim vane on it. This is the
       leading edge of the silhouette and the part of a shape read first, and
       it is 1.2-1.5 m of the real vehicle rather than the "front metre" it is
       tempting to write off. */
    g.add(box(THREE, 0.86, P.hw * 1.66, 0.11, M2.skin, c.x1 - 0.16, 0, c.z0 - 0.26, -0.62));
    g.add(box(THREE, 0.44, P.hw * 1.50, 0.08, M2.skin, c.x1 + 0.10, 0, c.z0 - 0.02, 0.34));
    g.add(box(THREE, 0.10, P.hw * 1.54, 0.09, M2.dark, c.x1 + 0.26, 0, c.z0 - 0.12));
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.30, 0.09, 0.09, M2.steel, c.x1 - 0.02, s * 0.70, c.z0 - 0.10, 0.34));
      g.add(box(THREE, 0.16, 0.14, 0.16, M2.steel, c.x1 - 0.20, s * 0.94, P.frameZ1 + 0.10));
      /* the wheel-arch fairing on the cab flank over the front tyre: without
         it the top half of a 1.2 m wheel is buried in a flat wall */
      g.add(box(THREE, P.wheelR * 2.10, 0.26, 0.10, M2.skin,
                P.axleX[0], s * (c.hw + 0.13), P.wheelR + 0.52));
      g.add(box(THREE, 0.09, 0.26, 0.42, M2.skin,
                P.axleX[0] - P.wheelR * 1.02, s * (c.hw + 0.13), P.wheelR + 0.30));
      /* the hull chine, the line a boat hull has and a lorry does not */
      g.add(box(THREE, P.cab.x0 - P.X_TAIL - 0.30, 0.10, 0.09, M2.skin,
                (P.cab.x0 + P.X_TAIL) * 0.5, s * (P.hw + 0.04), P.frameZ1 + 0.06));
      /* the water jet outlet in the tail plate */
      g.add(cylX(THREE, 0.20, 0.20, 0.16, 10, M2.dark, P.X_TAIL + 0.02, s * 0.62, P.frameZ1 + 0.14));
      g.add(cylX(THREE, 0.15, 0.15, 0.06, 10, M2.rub, P.X_TAIL - 0.05, s * 0.62, P.frameZ1 + 0.14));
      /* deck hatches over the launch-control bay, and a lifting eye */
      g.add(box(THREE, 0.62, 0.54, 0.06, M2.skin, P.X_TAIL + 1.90, s * 0.78, P.deckZ + 0.03));
      g.add(box(THREE, 0.10, 0.24, 0.09, M2.dark, P.X_TAIL + 0.60, s * 1.04, P.deckZ + 0.05));
    }
    /* the snorkel, stowed upright on the after deck and deliberately short:
       nothing on this vehicle may stand above the cover crown. armour_specs
       already lists "snorkel" in this unit's extras, so it is in-repo kit. */
    g.add(cylZ(THREE, 0.09, 0.09, 0.80, 8, M2.dark, P.X_TAIL + 0.55, -(P.hw + 0.02), P.deckZ + 0.42));
    g.add(cylZ(THREE, 0.12, 0.09, 0.12, 8, M2.dark, P.X_TAIL + 0.55, -(P.hw + 0.02), P.deckZ + 0.88));
    /* the stern water deflector under the tail plate */
    g.add(box(THREE, 0.36, P.hw * 1.50, 0.09, M2.skin, P.X_TAIL + 0.22, 0, P.frameZ1 - 0.06, 0.42));
    for (i = 0; i < 3; i++)
      g.add(box(THREE, 0.05, 0.44, 0.05, M2.dark, P.X_TAIL + 2.90, (i - 1) * 0.50, P.deckZ + 0.04));
  }

  /* the 9M79's four small forward control fins, in the CRADLE frame at the
     root of the exposed nose. They are the one identifying detail at the only
     place on this vehicle where the round is visible, and they cost 48
     triangles. */
  function tochkaKit(THREE, E, P, M2) {
    for (var i = 0; i < 4; i++)
      E.add(fin(THREE, 0.30, 0.04, 0.16, M2.missN, P.missNoseX + 0.26, P.missZ,
                P.missR * 0.80, PI * 0.25 + i * PI * 0.5));
  }

  /* The three Tochkas are ONE vehicle, so the geometry is written once and
     the finish is layered on. P.id keys skinTex's texture cache, so it MUST
     differ per variant or all three share one canvas and the separate
     palettes do nothing. Nothing in this file ever mutates a P after build,
     so the shared cab, axle and jack arrays are safe by reference. */
  function variant(BASE, id, base, paint, tones, seed, over) {
    var Q = {}, k;
    for (k in BASE) if (Object.prototype.hasOwnProperty.call(BASE, k)) Q[k] = BASE[k];
    Q.id = id; Q.base = base; Q.paint = paint; Q.tones = tones; Q.seed = seed;
    if (over) for (k in over) if (Object.prototype.hasOwnProperty.call(over, k)) Q[k] = over[k];
    return Q;
  }

  /* ==================================================== the MAZ-543 Scuds
     pact_e60_tel (R-17 Elbrus on the 9P117 Uragan), kpa_e80_tel (Hwasong-5)
     and kpa_e90_tel (Hwasong-6). One chassis, one boom, three finishes and
     two missile lengths, because that is what the three vehicles are.

     THE VEHICLE. 9P117 Uragan on a MAZ-543P special wheeled chassis - not a
     lengthened cargo truck, a purpose-built member of the family - accepted
     into service in 1967. The R-17 itself dates from 1962 and rode the
     TRACKED 2P19 until the wheeled launcher replaced it, which is exactly the
     transition pact_e50_tel below shows the other end of. Published chassis
     numbers, all held here: wheelbase 2200/3300/2200 = 7700 mm, track 2375,
     tyres 1500x600-635 (0.75 m radius), base truck 11.465 x 3.07 m, launcher
     13.36 x 3.02 x 3.33 m.

     ON THE RAKE, because this is the header's measured compromise re-derived
     and the answer comes out different. Nothing about the derivation is
     taste. The R-17's fins span 1.81 m; clocked in the X the boom needs, the
     top fin tips sit 0.20 m ABOVE the missile's own crown, so the published
     3.33 m travel height is measured to a fin tip and that pins the round's
     centreline at 2.67 m. The nose then has a hard ceiling:
         pivotZ + missZ + missNoseX*sin(e) + missR  <=  3.33
     At the header's 0.065 rad that comes to 3.74 m on a 3.33 m vehicle -
     worse than the 4.11 m the header threw out - and even 0.038 does not fit.
     The rake here is 0.012 rad, 0.7 degrees, and it is the truth: a Scud lies
     FLAT. It costs nothing, because this is the one vehicle in the file that
     does not need a rake to read as an erector. You can see the whole
     mechanism - open boom, hinge lugs and pin at the tail, two-stage rams
     underneath, launch table stowed on end off the back. tel_p has to imply
     all of that with a wedge of shadow under a closed cover; this one shows
     you. Do not "restore" 0.065 here.

     Fields carried ONLY because a shared function reads them: shroudHW, which
     erectorRams() alone uses as the half-gauge the rams sit at. There is no
     shroud on this vehicle and the name is inherited from the function.     */
  var SCUD_B = {
    id: "scud_b",
    /* ERA_KIT is switched OFF the moment a model is registered under its own
       def id (render3d.js: K is null when key === def.id), so the era finish
       has to be IN the parameter object. This is the e60 tint, 0x47523a,
       exactly as sam3d.js bakes it into its own 1960s launcher. */
    base: "#47523a", paint: 0x47523a,
    tones: ["#39422e", "#556047", "#414b36"], seed: 65117,
    tracked: false,
    X_NOSE: 6.36, X_TAIL: -6.55,
    hw: 1.51, frameZ0: 1.12, frameZ1: 1.44, frameTop: 1.44, deckZ: 1.98,
    /* 1500x600-635 is a 0.75 m radius tyre and those tyres are half of what
       people recognise. guardLift is raised with them so the arch keeps the
       same relation to the tyre crown that a 0.66 m wheel has on tel_p. */
    wheelR: 0.75, wheelW: 0.60, wheelY: 1.19, guardLift: 0.51,
    axleX: [4.46, 2.26, -1.04, -3.24],       /* 1.90 nose, 2.20/3.30/2.20 */
    /* cab.hw is the pod pair's OUTER half-width and gapHW the inner face, so
       each pod is 1.00 m across on a centreline 0.96 m out and the notch
       between them is 0.92 m. That notch is set by the D12A bay, not by the
       missile - the same chassis carries the 9P113 Luna-M, the 9A52 Smerch,
       the 5P85 and plain tankers - but it happens to be exactly wide enough
       for the R-17's nose to pass through, which is the shot this model
       exists to give you. cab.hw 1.46 finishes the pods just inside the tyre
       outer faces at 1.49, which is where they sit on the real truck. */
    cab: { x0: 4.14, x1: 6.36, hw: 1.46, gapHW: 0.46, z0: 1.46, z1: 2.62, style: "split" },
    cabin2: null, engZ: 2.20,
    /* the MAZ-543 has no upright exhaust stack: the D12A sits between the
       pods and vents low through mufflers out to the side. And the fuel tank
       goes where this chassis has a clear rail, between the second and third
       axles, instead of through the second tyre. */
    stack: false, tankX: 0.60,
    jackX: [-4.90, -5.90], jackY: 1.42,
    pivotX: -6.05, pivotZ: 2.20, elev: 0.012,
    shroudHW: 0.80,
    beamX0: -0.40, beamX1: 9.30, beamHW: 0.40, beamDep: 0.22, beamW: 0.16,
    saddleX: [2.20, 5.00, 8.20],
    tableX: -0.42,
    /* 11.25 m of R-17: tail 0.06, ogive from 9.41, tip 11.31. missZ 0.47 sets
       the belly 0.03 above the boom crown, where the saddles bridge it. */
    missR: 0.44, missZ: 0.47, nose: "cone", vanes: true,
    missTailX: 0.06, missNoseX: 9.41, missTipX: 11.31,
    bandX: [3.16, 6.36],
    finRootX: 0.10, finChord: 1.42, finSpan: 0.465, finT: 0.06,
    ramFoot: 1.72, ramHead: 4.60,
  };

  /* Hwasong-5, 1985. A Scud-B copied by an army that could not copy the
     transporter either, so it copied that too. There is no honest way to make
     this vehicle a different shape, because it is not one: same chassis, same
     split cab, same boom, same clamps, same table. The one real difference is
     sourced - CSIS gives the Hwasong-5 and Hwasong-6 both as 10.94 m against
     the R-17's 11.25, so the Korean round is 0.31 m shorter and its tip stops
     that much further back in the notch. The boom is deliberately NOT
     shortened to match: it is the same launcher carrying a shorter round, and
     the forward saddle now sits under the tank/warhead joint rather than just
     behind it, which is what happens when you do that. Everything else that
     separates it from the Soviet vehicle is the e80 finish, baked in. */
  var HWASONG_5 = variant(SCUD_B, "hwasong_5", "#51553f", 0x51553f,
                          ["#424635", "#5f634c", "#4a4e39"], 85021,
                          { missNoseX: 9.10, missTipX: 11.00, bandX: [3.10, 6.20] });

  /* Hwasong-6, 1991, and the honest answer first: it is the Hwasong-5. CSIS
     gives both as 10.94 x 0.88 m and says so in as many words - same
     launcher, same chassis, same boom, same round length. The 12 m figure
     that floats around is not supported and is not used. Nor is the "longer,
     finer ogive" story: a Scud-C buys its range from MORE propellant as well
     as a lighter warhead, so growing the nose inside a fixed overall length
     would model the change that REDUCES range. The two Korean rounds are
     therefore identical, and they are separated the way this game separates a
     T-54 from a T-90 - by finish. ERA_KIT would have painted this vehicle
     desert tan, which is nonsense for a KPA launcher in Korea; what it wears
     instead is the KPA disruptive scheme, a dark olive ground with broad
     brown and near-black bands, and against the Hwasong-5's flat single green
     that is three colours against one at forty pixels. The two never appear
     on the same side in any case. */
  var HWASONG_6 = variant(HWASONG_5, "hwasong_6", "#3f4a30", 0x3f4a30,
                          ["#6a5b39", "#242a1e", "#4d5a3a"], 91621, null);

  /* ============================================ pact_e50_tel, R-11 Scud-A
     The R-11M (8K11) on the 8U218 tracked erector, the oldest vehicle in the
     file, and it has to look it. The R-11 was accepted in 1955 and the
     nuclear-capable R-11M in 1958; the launcher is a Kirov Plant chassis on
     IS-2 / ISU-152 running gear with the casemate cut off, which is also what
     armour_specs.js:37 already says - hull "ww2", six wheels, torsion bars,
     sprocketFront FALSE.

     Three things carry the age, and all three are the real vehicle.

     THE ROUND IS BARE. There is no cover on an 8U218 of any kind - the round
     travelled clamped to the boom for its whole length, with at most a canvas
     tilt over it. So the entire 10.5 m of missile is drawn: seven metres of
     it runs forward over a 1.4 m driver's compartment and four metres of it
     hangs out past the nose of a 6.77 m hull. Rule 2 of the header asks for
     half a metre of ogive past the collar; this vehicle gives it everything.

     THE HULL IS A WARTIME ASSAULT GUN. Six 550 mm road wheels on 0.82 m
     centres, three return rollers, the drive sprocket at the REAR and the
     idler at the front - IS-2 practice, and the exact reverse of tel_k's
     seven 840 mm wheels with the sprocket forward. trackedChassis had to be
     taught that |sprocketX - idlerX| is a LENGTH before a rear sprocket would
     draw at all (see the shared-code notes), and its hard-coded 0.46 m
     sprocket had to become a parameter, because at 0.46 on a 550 mm-wheel
     hull the drive wheel stands 10 cm proud through the top of its own track.

     IT IS SHORT. An 11.9 m model against tel_k's 12.76 and tel_c's 14.17, on
     a 6.77 m hull, with a 10.5 m missile lying over it. The proportion -
     enormous round, stubby tank - is the joke the real thing tells.        */
  var SCUD_A = {
    id: "scud_a",
    /* the e50 tint, 0x4f5a35, baked in for the same reason as above */
    base: "#4f5a35", paint: 0x4f5a35,
    tones: ["#414a2a", "#5e6944", "#485232"], seed: 82181,
    tracked: true,
    X_NOSE: 3.60, X_TAIL: -3.17,             /* 6.77 m, the ISU-152 hull */
    hw: 1.40, hullZ0: 0.47, frameTop: 1.52, deckZ: 1.66,
    /* 0.65 m track on 2.42 m centres is 3.07 m over the tracks, the real
       figure. 550 mm road wheels: roadR 0.275, against armour_specs' 0.42,
       which is a T-34 wheel and wrong for an IS hull - the same file gives
       the T-10, which shares this running gear, 0.30. */
    trackY: 1.21, trackW: 0.65, trackTop: 0.98, roadR: 0.275,
    roadX: [-2.05, -1.23, -0.41, 0.41, 1.23, 2.05],
    rollX: [-1.55, 0.10, 1.75],
    sprocketX: -2.70, idlerX: 3.05,
    sprocketR: 0.36, sprocketZ: 0.55, idlerR: 0.30, idlerZ: 0.38,
    /* the driver's compartment, "casemate": armour with vision blocks, and
       none of the lorry furniture cabBlock hangs on a forward-control cab.
       An ISU-152 has its radiator at the BACK, so a grille in the front plate
       would be a lie, and mirror arms on a 1957 tracked launcher are an
       anachronism. Pulled back to x1 2.95 so e50Extras can put a real pointed
       nose in front of it. */
    /* The driver's compartment sits LOW and forward, and its roof height is
       not a free choice: the boom passes straight over it, and its underside
       at the front face of the compartment comes to 1.95 m. A roof plate at
       1.92 leaves 3 cm, and 2.05 - which is what a casual reading of the
       vehicle suggests - drives the boom floor through it for the whole
       length of the cab. That the missile grazes the crew's roof is not a
       compromise, it is the vehicle. */
    cab: { x0: 1.70, x1: 3.10, hw: 1.34, z0: 1.15, z1: 1.86, style: "casemate" },
    cabin2: null,
    /* both jack stations behind the rearmost road wheel (-2.05), behind the
       drive sprocket (-2.70) and behind the end of the belt (-3.15), so no
       leg comes down through a track */
    jackX: [-3.30, -3.86], jackY: 1.30,
    pivotX: -2.72, pivotZ: 1.96, elev: 0.052,
    shroudHW: 0.84,
    beamX0: -0.40, beamX1: 8.20, beamHW: 0.42, beamDep: 0.24, beamW: 0.16,
    saddleX: [1.60, 4.40, 7.30],
    tableX: -0.45,
    /* 10.5 m of R-11M on a 0.88 m body. The fin span is usually given as
       about 1.5 m, smaller than the R-17's 1.81, which is one more thing
       separating this tail from the one three eras later. */
    missR: 0.44, missZ: 0.49, nose: "cone", vanes: true,
    missTailX: -0.05, missNoseX: 8.55, missTipX: 10.45,
    bandX: [2.60, 5.60],
    finRootX: -0.01, finChord: 1.20, finSpan: 0.31, finT: 0.06,
    ramFoot: 1.40, ramHead: 3.60,
    extra: e50Extras,
  };

  /* ======================================================== the Tochka line
     pact_e80_tel (9K79 Tochka, 9P129, 1976), pact_e90_tel (9K79-1 Tochka-U,
     9P129M-1, 1989) and kpa_e00_tel (KN-02 Toksa, about 2007). ONE vehicle
     and one geometry, because that is the truth: the Tochka-U's launcher is
     the same BAZ-5921 hull with new electronics in it, both rounds are 6.4 m
     long, and the Toksa is a copy. Writing the numbers three times would only
     invite them to drift.

     WHAT THIS VEHICLE HAS TO SAY, and it is not what the Scud says. The 9P129
     is 9.5 m long against the Iskander's 13.1, on THREE axles, with wheels
     1.20 m tall on a vehicle 2.38 m tall - half its own height, against 38
     per cent on the 9P78-1. Short, squat, six big tyres and one small cab.
     Note what that is worth and what it is not: render3d.js normalises by
     MEASURED extent against def.r, and def.r is 16 here against 17 on the
     Iskander, so the absolute metres are argued away on screen and only the
     PROPORTIONS survive. Every number below protects the proportions.

     THE COVER IS BROAD AND FLAT, and that is the correction that matters
     most. On the real 9P129 the missile bay is INTEGRAL to the boat hull:
     the roof is part of the hull top, it spans essentially the full 2.78 m
     beam and it opens as two doors hinged at the hull sides. A narrow deep
     barrel raised on beams above a deck is the 9P78-1's architecture at 72
     per cent scale, and a Tochka-literate player would call it a small
     Iskander. So shroudHW is 1.22 - 2.44 m across on a 2.78 m hull, near
     flush with the sides - against shroudTop 0.66. The centreline split
     erector() already draws IS the door line, and on a broad flat lid it
     sits on top where the light is rather than on the shoulder of a barrel.

     THE RAKE is 0.048 rad, 2.75 degrees, not the family's 0.065. On a 5.55 m
     cover the file's heavy-launcher rake lifts the crown 0.36 m, which on a
     2.375 m vehicle is a seventh of its height; 0.048 lifts it 0.27 and holds
     the measured crown at 2.48 m. That is +4.2 per cent on the real travel
     height and, more to the point, a height-to-length ratio of 0.259 against
     tel_p's 0.264 - so the Tochka renders LOWER for its length than the
     Iskander, which is the way round the real vehicles are. At 0.065 the
     crown goes to 2.57 and that inverts.

     THE EXHAUST STACK IS OFF. A sealed amphibian vents low at the hull rear;
     it does not carry a pipe up the back of the cab. It was also the thing
     that used to set this vehicle's crown height, so switching it off is what
     let the rake come down to the real figure rather than up to clear a pipe.

     WHAT IS STILL INHERITED AND STILL WRONG FOR A BOAT, said rather than
     hidden: the front bumper, the headlamp guards and the five radiator
     louvres cabBlock hangs on the cab face (this bow is a sloped plate and
     the 5D20B is at the REAR), and the frame rails and air reservoirs under
     the tub. frameZ0 is pulled up to 0.66 so those live in a 0.10 m band
     immediately under the hull and read as hull shadow rather than as gear
     slung below a waterline. What has NOT been given up is the bow: see
     tochkaExtras above.                                                    */
  var TOCHKA = {
    tracked: false,
    X_NOSE: 4.68, X_TAIL: -4.66,
    /* 2.78 m over the hull is the bare BAZ chassis width to the centimetre */
    hw: 1.39,
    frameZ0: 0.66, frameZ1: 0.76, frameTop: 0.86, deckZ: 1.30,
    /* 1200x500-508: 1.20 m tall, half this vehicle's height, and the single
       most distinctive thing about the silhouette. wheelY 1.15 puts the tyre
       outer faces flush with the hull line at 1.39, which is where they sit
       on the real vehicle - tucked 0.11 m inboard, as this family was first
       drawn, every mudguard and flap disappears inside the tub and the model
       ends up with no wheel arches at all. */
    wheelR: 0.60, wheelW: 0.48, wheelY: 1.15,
    axleX: [3.15, 0.20, -2.35],
    /* the fuel tank goes between the front and middle axles; left at the
       default it runs straight through the middle tyre on this wheelbase */
    stack: false, tankX: 1.72,
    /* forward control over the front axle, roof at 1.94 - the bare BAZ hull
       is published at 1.948 m and that IS this cab. z0 0.92 and not lower:
       markings() puts the team flash at z0 + 0.42, and on a cab floor at 0.70
       three quarters of it is inside a 1.20 m tyre. "stepped" for the folded
       shutters, which is the sealed-amphibian family idiom (BRDM-2, BTR-70)
       and medium confidence; "box" would have been certainly wrong, since it
       swaps armour vision blocks for a lorry windscreen. */
    cab: { x0: 2.65, x1: 4.45, hw: 1.12, z0: 0.92, z1: 1.94, style: "stepped" },
    /* no second cabin: the crew rides in the one cab and the firing set is
       inside the hull. Two blocks would make this an Iskander. */
    cabin2: null,
    /* one pair, at the tail, and stunted - an 18-tonne vehicle with 0.42 m of
       ground clearance has nowhere to put a real screw jack, and the contrast
       with the Iskander's 0.82 m legs is the point rather than a defect. The
       outrigger arm emerges from the hull SIDE rather than tucking under it,
       which is also more right for a boat. */
    jackX: [-3.45, -4.30], jackY: 1.15,
    pivotX: -4.15, pivotZ: 1.50, elev: 0.048,
    beamX0: -0.40, beamX1: 6.05,
    shroudX0: 0.00, shroudX1: 5.55, shroudHW: 1.22, shroudTop: 0.66,
    /* One round on the centreline, 0.65 m body. The 9P129's cover fully
       encloses it in travel - no ogive shows - and rule 2 of the header
       overrides that, as it does on every launcher in this file: the collar
       is at 5.55 and the round runs on to 6.55, so 1.00 m of nose is in the
       open, 10.5 per cent of overall length, the same fraction tel_p shows.
       A 0.95 m ogive at 19 degrees, not the 30-degree stub this was first
       drawn with: the 9M79's nose is long and slender and a blunt cone there
       reads as a Scud warhead. */
    missY: [0], missR: 0.325, missZ: 0.34,
    missNoseX: 5.60, missTipX: 6.55,
    ramFoot: 1.05, ramHead: 2.90,
    extra: tochkaExtras, cradleExtra: tochkaKit,
  };

  /* 9P129, 1976. Plain Soviet protective green, one colour, the three tones
     near neighbours of the base so skinTex's blotches read as weathering
     rather than as a scheme. That flatness is the period. */
  var TOCHKA_80 = variant(TOCHKA, "tochka80", "#51553f", 0x51553f,
                          ["#454937", "#5d6149", "#4b4f3a"], 76129, null);
  /* 9P129M-1, 1989, and it is the SAME VEHICLE - same hull, same cover, and
     a round three centimetres longer that this model does not draw. What did
     change by 1989 is the finish: the late-Soviet disruptive scheme, green
     ground with broad brown and near-black bands, which at 26 blotches and
     0.42 alpha comes out as three colours rather than as weathering. Plain
     green beside mottled green is the whole difference between the e80 and
     e90 launcher, and it is the whole difference between the real ones too.
     It is also more truthful than the alternative: ERA_KIT.e90 would have
     painted a Group of Soviet Forces launcher desert tan. */
  var TOCHKA_90 = variant(TOCHKA, "tochka90", "#4a5238", 0x4a5238,
                          ["#6b5a3a", "#2c3126", "#3f4930"], 89131, null);
  /* KN-02 Toksa, about 2007, and it is a COPY - nobody outside the country
     has measured one, the hull was not redesigned, and the honest model of a
     copy is the same model. No invented aerials, no invented bulges. What it
     gets is KPA paint: darker, flatter and greyer, laid on plain. It never
     stands next to a Tochka in any case - it is reachable only by a KPA
     player on the e00 branch, where everything around it is a 13.4 m Scud. */
  var TOCHKA_KN = variant(TOCHKA, "toksa", "#3d4733", 0x3d4733,
                          ["#343e2a", "#495340", "#2f382a"], 20076, null);

  /* ======================================================= the Chinese line
     pla_e90_tel (DF-15 / M-9, the round fired into the sea off Keelung and
     Kaohsiung in 1995-96) and pla_e00_tel (DF-15B, first flight-tested 2006
     and in service by the early 2010s). rules.js says these share a launcher
     - "the same launcher as 1995 with a completely different weapon on it" -
     so every chassis, cab, jack and cradle number is copied rather than
     re-invented, and the whole of the difference is spent in the half metre
     the header calls the most valuable on the model.

     THE CHASSIS, and the one call that had to be made. rules.js and
     armour_specs.js both say WS2400, and the def's own naming is canon here;
     most open sources put the DF-15 on the Taian TA5450 and give the WS2400
     to the DF-11. Both are four-axle 8x8s within 0.6 m of each other, so the
     silhouette does not turn on it - but the CAB does, and a WS2400 is a
     reverse-engineered MAZ-543, which means SPLIT PODS. So this vehicle gets
     splitCab() and the same notch the Scuds have. That is not a cost, it is
     free differentiation from tel_p (an MZKT-7930, which genuinely does have
     one full-width four-door cab) at exactly the zoom where counting ogives
     is hardest, and from tel_c (a Taian 10x10, which is full-width and has
     five axles). If the attribution is ever corrected to the Taian, the cab
     is the line to change and nothing else.

     THE COVER IS WIDE AND LOW (2.24 x 1.06) where tel_c's is narrow and tall
     (1.96 x 1.20). That is legibility engineering and is stated as such, not
     dressed up as a consequence of missile calibre: both real vehicles carry
     their round in a near-full-width box shelter, and if anything the e90's
     2.24 m is the more truthful of the two. From directly overhead, which is
     most of the time, that ratio against the hull is the second thing a
     player reads after the axle count.

     THE STANDING FICTION, stated once for the family: a real DF-15 TEL of
     either mark carries its 9.1 m round in a shelter running from behind the
     cab nearly to the tail, and NO ogive shows in travel. The modelled cover
     is 5.30 m, about 40 per cent short, exactly as tel_p and tel_c are short,
     because rule 2 of the header says the rounds must show.                */
  var DF15 = {
    id: "df15",
    /* Second Artillery green of the 1990s: plain, dark, one colour. ERA_KIT
       does not run on a model registered under its own def id, and its e90
       entry is desert tan, which is not what a launcher in Fujian wore. */
    base: "#3f4a30", paint: 0x3f4a30,
    tones: ["#344027", "#4b5640", "#3a452c"], seed: 19951,
    tracked: false,
    /* 5.76 - (-5.68) = 11.44 m, the WS2400's real OVERALL length (bumper
       included). The modelled bumper and towing eyes then carry the MEASURED
       extent about 0.45 m past it, the same overrun tel_p carries. */
    X_NOSE: 5.76, X_TAIL: -5.68,
    hw: 1.50, frameZ0: 1.06, frameZ1: 1.34, frameTop: 1.34, deckZ: 1.88,
    /* the MAZ-543 family runs 1500x600-635; this file authors that class at
       0.66 and sam3d.js authors the same Chinese 8x8s at 0.70, which is what
       is used here - outsized tyres are themselves a MAZ-543 cue and they
       widen the gap against tel_p's 0.66 */
    wheelR: 0.70, wheelW: 0.52, wheelY: 1.18,
    axleX: [3.86, 1.66, -1.64, -3.84],       /* 1.90 nose, 2.20/3.30/2.20 */
    cab: { x0: 3.54, x1: 5.76, hw: 1.42, gapHW: 0.46, z0: 1.36, z1: 2.66, style: "split" },
    cabin2: null, engZ: 2.12,
    stack: false, tankX: 0.00,
    jackX: [-4.80, -5.46], jackY: 1.38,
    pivotX: -5.00, pivotZ: 1.96, elev: 0.065,
    beamX0: -0.40, beamX1: 5.80,             /* shroudX1 + 0.50, the family
                                                rule: the last cross tie then
                                                lands 0.10 m past the collar
                                                instead of hanging 0.86 m in
                                                front of it in open air */
    shroudX0: 0.00, shroudX1: 5.30, shroudHW: 1.12, shroudTop: 1.06,
    /* one round and it is fat: 9.1 m by 1.00 m body, so missR 0.50. A 1.50 m
       cone at 18 degrees - the DF-15 has had a SEPARATING re-entry body since
       the baseline round, so what changes on the B model is not separation
       but manoeuvre, and the shape that says so is a plain slender cone here
       against a finned biconic there. */
    missY: [0], missR: 0.50, missZ: 0.56,
    missNoseX: 6.50, missTipX: 8.00,
    ramFoot: 1.30, ramHead: 3.40,
    marv: null,
    cradleExtra: chineseKit,
  };

  /* DF-15B. The chassis is bit-for-bit the e90's. The difference is the
     round: a separating biconic finned MaRV with a radar-correlation seeker
     behind it, which is how the miss distance goes from hundreds of metres to
     tens. missTipX below is NOT the tip of the missile - it is the apex of
     the SHOULDER cap, deliberately short at 0.40 m so the slim body grows out
     through it, and marv.tipX carries the real tip 1.27 m further on. The
     cover also runs 0.75 m further forward and a low equipment box sits
     behind the cab; that box is UNDOCUMENTED and is here because the two
     vehicles are otherwise identical below the cover, not because the later
     launcher is known to have grown one. Between them the open deck goes from
     3.29 m to 1.42 m, so the 1991 vehicle shows a long fat grey bar and this
     one a short one and a needle - and the finish goes from plain green to
     the 2010s three-tone disruptive scheme. */
  var DF15B = variant(DF15, "df15b", "#4a5140", 0x4a5140,
                      ["#6a5f42", "#282d24", "#3e4636"], 20063, {
    cabin2: { x0: 2.42, x1: 3.20, hw: 1.28, z0: 1.88, z1: 2.52 },
    beamX1: 6.55, shroudX1: 6.05,
    missNoseX: 6.95, missTipX: 7.35,
    /* the MaRV, in cradle coordinates like everything else in this frame.
       x0/r0 to x1/r1 is the aft cone as a frustum (cylX turns rotation.z by
       +PI/2, so r1 is the AFT radius); x1 to tipX is the forward cone; bandX
       is the separation joint, drawn at 7.30 where the slim body has already
       emerged from the shoulder cap at 7.11 so it can actually be seen. Every
       radius the kit needs beyond these is interpolated, because a field the
       code can derive is a field that can be got wrong. */
    marv: { x0: 7.00, r0: 0.30, x1: 7.72, r1: 0.19, tipX: 8.32,
            bandX: 7.30, finX: 7.55, finSpan: 0.20 },
  });

  /* ==================================================== the NATO parameters
     The Corporal's tractor is an M52 5-ton 6x6 (wheelbase 4.24 m, 2.46 m
     wide, about 6.9 m long); its bogie runs DUALS, and roadWheel() draws one
     wheel, so the rear tyres are 0.56 m wide against the front's 0.30 - that
     is the pair's real span, and four more wheel groups would have cost 848
     triangles for a rim groove nobody can see at forty pixels. Stated as the
     compromise it is.

     THE PRICE OF THE CORPORAL, signed off rather than hidden. render3d.js
     scales by measured extent and nato_e50_tel carries r:16, so a 17.5 m
     model draws at the same screen length as the 13.10 m Iskander and every
     detail on it comes out about a quarter smaller. That is real and it is
     accepted, because the round is 45 ft 4 in long on a body 30 in thick - an
     18:1 needle - and there is no way to draw it honestly and short: the
     round was pulled as far forward as the cab roof allows and the vehicle is
     still 17.5 m. The slenderness is itself the recognition cue, and nothing
     else in this game owns it. The cheap real fix is one number in rules.js:
     nato_e50_tel r:16 -> 18. That is a balance file and not this one, so it
     is flagged and not made.

     The launcher is drawn EMPLACED - jacks down, rams out - like every other
     vehicle in this file. In march order a Pershing's warhead section rode in
     a separate carrier and was mated with a davit after the launcher was
     emplaced, which is also why the M1001 carries a crane at all.          */
  var TEL_E50N = {
    id: "el_corporal",
    /* the e50 tint on the lorry. The ROUND is pale, because rules.js calls
       it "a slim white finned rocket" and that is the game's own canon; the
       truth is that white-with-a-black-roll-pattern is the White Sands test
       livery and a service round in Germany was olive drab with a bright
       motor section. Kept, because a round the colour of its own lorry
       throws rule 2 away and this is the loudest thing the 1950s tier owns. */
    base: "#4f5a35", paint: 0x4f5a35,
    tones: ["#414a2a", "#5e6944", "#485232"], seed: 19551,
    roundPaint: 0xd9d7cc,
    X_NOSE: 8.82, tailX: 1.95, frameZ0: 0.90, frameZ1: 1.18,
    /* front axle under the BONNET, bogie behind the cab: 7.70 to 3.44 is
       4.26 m against the M52's real 4.24, bogie spacing 1.40 m */
    axleX: [7.70, 4.14, 2.74], axleW: [0.30, 0.56, 0.56],
    wheelR: 0.545, wheelY: 0.96,
    fifthX: 3.44, fifthZ: 1.28, tankX: 5.90, airX: 4.60,
    /* the M39-series petrol lorry exhausts DOWN, out under the body ahead of
       the right rear wheels; the upright stack belongs to the later multifuel
       trucks and is switched off here */
    stack: false,
    cab:    { x0: 5.45, x1: 7.10, hw: 1.16, z0: 1.20, z1: 2.74, style: "bonnet" },
    bonnet: { x0: 7.10, x1: 8.42, hw: 0.62, z0: 1.50, z1: 2.14 },
    crane: null,
    noseX: 4.75, neckX: 1.70, neckTop: 1.52, legX: 1.95,
    X_TAIL: -7.55, hw: 1.20, deckZ: 1.30, frameTop: 1.20,
    tailPlat: false,
    trAxleX: [-4.55, -5.95], trWheelR: 0.545, trWheelW: 0.32, trWheelY: 1.06,
    jackX: [-6.55, -7.25], jackY: 1.06,
    /* 1.4 degrees, not the 3.7 the heavy launchers use. Over a 13.8 m round
       even this lifts the ogive 0.34 m; at 0.065 it would lift it 0.88 and
       put the round through the cab roof. */
    pivotX: -7.40, pivotZ: 1.74, elev: 0.025,
    ramFoot: 3.40, ramHead: 5.60, shroudHW: 0.78,
    beamX0: -0.20, beamX1: 11.60, beamHW: 0.42, beamDep: 0.40, beamW: 0.20,
    lattice: true,
    saddleX: [0.60, 3.80, 7.20, 10.40],
    missR: 0.38, missZ: 0.46, nose: "cone", vanes: true,
    missTailX: -1.05, missNoseX: 11.25, missTipX: 12.87,
    bandX: [2.80, 6.60],
    finRootX: -1.01, finChord: 1.15, finSpan: 0.685, finT: 0.05,
  };

  /* Pershing 1a on the M790, towed by a Ford M757 8x8 - built low to be flown
     in a C-130, and the flattest, widest cab in the roster. */
  var TEL_E60N = {
    id: "el_pershing1",
    base: "#47523a", paint: 0x47523a,
    tones: ["#38432c", "#556047", "#414b34"], seed: 19692,
    roundPaint: 0,
    X_NOSE: 6.55, tailX: -0.51, frameZ0: 0.86, frameZ1: 1.14,
    /* 8x8: two front axles 1.30 apart under the cab, a 3.10 m gap, two rear
       axles 1.30 apart. 1.00 + 5.70 + 0.36 = 7.06 m, the M656's 278 inches. */
    axleX: [5.55, 4.25, 1.15, -0.15], axleW: [0.44, 0.44, 0.44, 0.44],
    wheelR: 0.62, wheelY: 1.00,
    fifthX: 0.50, fifthZ: 1.30, tankX: 2.80, airX: 2.20,
    cab:    { x0: 4.70, x1: 6.30, hw: 1.20, z0: 1.02, z1: 2.48, style: "coe" },
    bonnet: null, crane: null,
    /* ---- the M790 trailer, shared verbatim with the Pershing II below ----
       Because of SALT II no new launchers were built for Pershing II: the
       M1003 IS a rebuilt M790. Every field from here to ramHead is therefore
       identical on the two defs, offset only by the difference in the two
       tractors' fifth wheels (0.50 against 0.06), and the fifth-wheel HEIGHT
       is the same 1.30 on both because one trailer has to couple to both. */
    noseX: 3.20, neckX: -1.10, neckTop: 1.64, legX: -0.95,
    X_TAIL: -6.55, hw: 1.22, deckZ: 1.40, frameTop: 1.30,
    tailPlat: true,
    trAxleX: [-3.90, -5.20], trWheelR: 0.58, trWheelW: 0.40, trWheelY: 1.08,
    jackX: [-5.90, -6.45], jackY: 1.08,
    pivotX: -6.20, pivotZ: 1.62, elev: 0.065,
    ramFoot: 2.80, ramHead: 4.60, shroudHW: 0.78,
    beamX0: -0.25, beamX1: 9.10, beamHW: 0.42, beamDep: 0.20, beamW: 0.22,
    lattice: false,
    saddleX: [0.80, 4.20, 7.60],
    /* 10.5 m on a 1.00 m body, tail square over the hinge because this cradle
       really does stand the round up on its own tail. A 2.34 m SLENDER CONE:
       that shape against the Pershing II's blunt radar nose is the honest
       difference between 1969 and 1983 at forty pixels. */
    missR: 0.50, missZ: 0.60, nose: "cone", vanes: false,
    missTailX: 0.04, missNoseX: 8.20, missTipX: 10.54,
    bandX: [2.60, 6.20],
    finRootX: 0.08, finChord: 1.10, finSpan: 0.50, finT: 0.05,
  };

  /* Pershing II on the M1003 - the rebuilt M790 - towed by the M1001, a MAN
     KAT1 8x8 with an Atlas AK4300 crane and a 30 kW generator. (US-based
     batteries towed the same trailer with an M983 HEMTT and a Hiab; the
     German-based majority used the MAN, which is what is drawn.) */
  var TEL_E80N = {
    id: "el_pershing2",
    /* the 1984 NATO three-tone, and the tones array really does produce it:
       green ground, brown blotches, black shadow. armour_specs.js calls this
       vehicle "twotone" and it is the only launcher in the family that is not
       plain drab. */
    base: "#4a5140", paint: 0x4a5140,
    tones: ["#6a5a3c", "#26291f", "#3c4433"], seed: 19833,
    roundPaint: 0,
    X_NOSE: 7.33, tailX: -1.07, frameZ0: 0.94, frameZ1: 1.22,
    axleX: [5.95, 4.55, 0.75, -0.65], axleW: [0.40, 0.40, 0.40, 0.40],
    wheelR: 0.65, wheelY: 1.03,
    fifthX: 0.06, fifthZ: 1.30, tankX: 2.60, airX: 2.00,
    cab:   { x0: 5.08, x1: 7.08, hw: 1.24, z0: 1.30, z1: 2.90, style: "kat" },
    bonnet: null,
    /* the Atlas crane, stowed along the frame between the cab and the nose of
       the round, and the fastest way to tell this vehicle from a Pershing 1a
       from any angle. The boom crown at 2.04 m is measured, not chosen: it
       lies half a metre under the belly of the round it must not touch and
       under the front of the launch beam. */
    crane: { x0: 3.30, x1: 4.86, top: 1.86 },
    noseX: 2.76, neckX: -1.54, neckTop: 1.64, legX: -1.39,
    X_TAIL: -6.99, hw: 1.22, deckZ: 1.40, frameTop: 1.30,
    tailPlat: true,
    trAxleX: [-4.34, -5.64], trWheelR: 0.58, trWheelW: 0.40, trWheelY: 1.08,
    jackX: [-6.34, -6.89], jackY: 1.08,
    pivotX: -6.64, pivotZ: 1.62, elev: 0.065,
    ramFoot: 2.80, ramHead: 4.60, shroudHW: 0.78,
    beamX0: -0.25, beamX1: 9.10, beamHW: 0.42, beamDep: 0.20, beamW: 0.22,
    lattice: false,
    saddleX: [0.80, 4.00, 7.20],
    /* 10.61 m on a 1.02 m body. nose "marv": the re-entry vehicle is BLUNT,
       tapering only to 0.62 of body radius and then capped, with four control
       vanes at its root, because the area-correlation radar that took the CEP
       to thirty metres looks out through that nose. A pointed cone here would
       be the Pershing 1a. */
    missR: 0.51, missZ: 0.61, nose: "marv", vanes: false,
    missTailX: 0.05, missNoseX: 8.06, missTipX: 10.66,
    bandX: [2.40, 5.60],
    finRootX: 0.09, finChord: 1.05, finSpan: 0.46, finT: 0.05,
  };

  /* ==================================================================== the
     registrations. Fifteen ids carry the "tel" role and every one of them is
     named here: twelve models and three honest aliases.

     ON REGISTERING UNDER THE DEF ID, because it changes what these vehicles
     look like and it is not obvious. render3d.js modelKeyFor() tries def.id
     first, so these keys are the ones that get hit, and getModel() then
     computes K = (ERA_KIT[era] && key !== def.id) ? ERA_KIT[era] : null - the
     era finish and the era kit fire ONLY for a model that is a borrowed
     stand-in. From the moment these lines land, ERA_KIT stops running on all
     fifteen ids and the paint in each parameter object above is the FINAL
     paint. That is why every def above carries a period palette rather than
     the family green, and it is what sam3d.js:1074 already does - its 2K11
     Krug is registered as pact_e60_sam with paint 0x47523a, which is the
     literal e60 tint. It cuts the other way too, in this file's favour: the
     e50 and e60 kit is a searchlight drum plus a whip antenna at
     zTop + H*0.40, and that would have been bolted to the crown of a launcher
     whose first rule is that nothing stands above the cover.

     ON THE THREE ALIASES. pact_e00_tel IS tel_p and nato_e00_tel IS tel_n -
     the same vehicle under a roster id, so they take the build function
     directly. nato_e90_tel is the M270 carrying ATACMS instead of rockets,
     and that launcher is mlrs_n, which is defined in js/units3d.js. Today
     index.html sources units3d.js at line 261 and this file at line 291, so
     mlrs_n exists by the time this runs - but the alias must not depend on
     that, so it resolves its delegate at BUILD time rather than at load time.
     Build calls come from render3d.js long after every script has loaded, so
     the lookup cannot lose a race whatever the order becomes, and if mlrs_n
     ever moves or disappears the alias falls back to this file's own HIMARS
     instead of throwing inside getModel's try block and dropping the unit to
     the generated fallback mesh. */
  function aliasTo(key, len, target, fallback) {
    UNIT_MODELS[key] = {
      len: len,
      build: function (THREE, M, C) {
        var d = UNIT_MODELS[target];
        return (d && d.build) ? d.build(THREE, M, C) : fallback(THREE, M, C);
      },
    };
  }

  /* -- the hand-finished present-day tier, unchanged ---------------------- */
  UNIT_MODELS["tel_p"] = { len: 13.10, build: buildHeavy(TEL_P) };
  UNIT_MODELS["tel_c"] = { len: 14.20, build: buildHeavy(TEL_C) };
  UNIT_MODELS["tel_k"] = { len: 12.80, build: buildHeavy(TEL_K) };
  UNIT_MODELS["tel_n"] = { len: 7.00,  build: buildHimars };

  /* -- 1950s: the first generation, and both of them are crude ------------ */
  UNIT_MODELS["nato_e50_tel"] = { len: 17.65, build: buildEL(TEL_E50N) };
  UNIT_MODELS["pact_e50_tel"] = { len: 11.90, build: buildOpen(SCUD_A) };

  /* -- 1960s: the wheeled launcher arrives on both sides ------------------ */
  UNIT_MODELS["nato_e60_tel"] = { len: 13.34, build: buildEL(TEL_E60N) };
  UNIT_MODELS["pact_e60_tel"] = { len: 13.36, build: buildOpen(SCUD_B) };

  /* -- 1980s ------------------------------------------------------------- */
  UNIT_MODELS["nato_e80_tel"] = { len: 14.56, build: buildEL(TEL_E80N) };
  UNIT_MODELS["pact_e80_tel"] = { len: 9.49,  build: buildHeavy(TOCHKA_80) };
  UNIT_MODELS["kpa_e80_tel"]  = { len: 13.36, build: buildOpen(HWASONG_5) };

  /* -- 1990s ------------------------------------------------------------- */
  UNIT_MODELS["pact_e90_tel"] = { len: 9.49,  build: buildHeavy(TOCHKA_90) };
  UNIT_MODELS["pla_e90_tel"]  = { len: 11.89, build: buildHeavy(DF15) };
  UNIT_MODELS["kpa_e90_tel"]  = { len: 13.36, build: buildOpen(HWASONG_6) };

  /* -- 2000s ------------------------------------------------------------- */
  UNIT_MODELS["pla_e00_tel"]  = { len: 11.89, build: buildHeavy(DF15B) };
  UNIT_MODELS["kpa_e00_tel"]  = { len: 9.49,  build: buildHeavy(TOCHKA_KN) };

  /* -- the three aliases -------------------------------------------------- */
  UNIT_MODELS["pact_e00_tel"] = { len: 13.10, build: UNIT_MODELS["tel_p"].build };
  UNIT_MODELS["nato_e00_tel"] = { len: 7.00,  build: UNIT_MODELS["tel_n"].build };
  aliasTo("nato_e90_tel", 6.85, "mlrs_n", buildHimars);
})();
