/* ==========================================================================
   tel3d.js -- ROAD-MOBILE BALLISTIC MISSILE LAUNCHERS (role "tel")

   Four vehicles: "tel_p" (9K720 Iskander-M, 9P78-1 TEL), "tel_c" (DF-16 on a
   10x10 transporter-erector-launcher), "tel_k" (KN-23 / Hwasong-11Ga on the
   TRACKED launcher) and "tel_n" (M142 HIMARS carrying a two-round PrSM pod).

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

   The four differ by exactly the things a player can actually see:
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

   ONE MEASURED COMPROMISE, stated rather than hidden. The rake was authored
   at six degrees. On a 6.5 m cradle that lifts the front of the cover 0.72 m,
   which put the crown at 4.11 m on a vehicle whose real travel height is
   3.42 m - the model was then taller than the SAM it has to be distinguished
   from, which is precisely backwards. The rake here is 3.7 degrees (0.065
   rad) on the heavy launchers and 4.3 on the HIMARS: still enough to read as
   a hinged erector and to catch the light along the cover, and it holds the
   real dimension. Measured, on the finished models: tel_p 13.13 x 3.56 x
   3.46 m and 4,804 triangles, tel_c 14.17 x 3.60 x 3.64 and 5,108, tel_k
   12.74 x 3.52 x 3.38 and 4,724, tel_n 7.01 x 2.72 x 3.31 and 2,900 - the
   measured band for hand-finished support vehicles in this project is the
   minelayer's 4,464 and the mine clearer's 5,460.

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
       and the one that stops eight tyres reading as eight black discs. */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < P.axleX.length; i++) {
        g.add(box(THREE, P.wheelR * 2.35, P.wheelW + 0.20, 0.09, M2.skin,
                  P.axleX[i], s * P.wheelY, P.wheelR + 0.46));
        g.add(box(THREE, 0.06, P.wheelW + 0.20, 0.30, M2.dark,
                  P.axleX[i] - P.wheelR * 1.14, s * P.wheelY, P.wheelR + 0.30));
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
    /* fuel tank, right side only, because a symmetrical vehicle is a toy */
    g.add(cylX(THREE, 0.30, 0.30, 1.70, 12, M2.steel,
               P.cab.x0 - 1.60, -(P.hw - 0.16), P.frameZ1 + 0.10));
    /* exhaust stack up the back of the cab, left side */
    g.add(cylZ(THREE, 0.09, 0.09, 1.05, 8, M2.dark, P.cab.x0 - 0.14, P.hw - 0.28, P.deckZ + 0.52));
    g.add(cylZ(THREE, 0.12, 0.09, 0.16, 8, M2.dark, P.cab.x0 - 0.14, P.hw - 0.28, P.deckZ + 1.10));
  }

  /* ======================================================== tracked chassis
     Same deck, different legs. The belt is drawn as its two RUNS: as one
     solid slab it fills the space between the wheels and swallows them. */
  function trackedChassis(THREE, g, P, M2) {
    var s, i;
    var tubX0 = P.X_TAIL + 0.35, tubX1 = P.cab.x0 + 0.06;

    for (s = -1; s <= 1; s += 2) {
      var ty = s * P.trackY;
      g.add(box(THREE, (P.sprocketX - P.idlerX) + 0.90, P.trackW, 0.11,
                M2.dark, (P.sprocketX + P.idlerX) * 0.5, ty, 0.055));
      g.add(box(THREE, (P.sprocketX - P.idlerX) + 0.90, P.trackW, 0.11,
                M2.dark, (P.sprocketX + P.idlerX) * 0.5, ty, P.trackTop - 0.055));
      for (i = 0; i < P.roadX.length; i++) {
        var w = roadWheel(THREE, P.roadR, P.trackW * 0.82, M2, true);
        w.position.set(P.roadX[i], ty, P.roadR);
        g.add(w);
      }
      /* sprocket forward, idler aft, both up clear of the ground */
      g.add(cylY(THREE, 0.46, 0.46, P.trackW * 0.72, 12, M2.steel, P.sprocketX, ty, 0.62));
      g.add(cylY(THREE, 0.40, 0.40, P.trackW * 0.72, 12, M2.dark, P.idlerX, ty, 0.56));
      for (i = 0; i < P.rollX.length; i++)
        g.add(cylY(THREE, 0.13, 0.13, P.trackW * 0.5, 8, M2.dark,
                   P.rollX[i], ty, P.trackTop - 0.24));
      /* the sponson skirt over the top run: this is what makes a tracked
         hull read as armour rather than as a trolley */
      g.add(box(THREE, (P.sprocketX - P.idlerX) + 0.60, 0.10, 0.34, M2.skin,
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

    if (c.style !== "box") {
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
      /* mirror arms: tiny, and the strongest "this is a road vehicle" cue */
      g.add(box(THREE, 0.05, 0.24, 0.05, M2.dark, c.x1 - 0.18, s * (c.hw + 0.13), c.z1 - 0.16));
      g.add(box(THREE, 0.06, 0.05, 0.32, M2.dark, c.x1 - 0.18, s * (c.hw + 0.24), c.z1 - 0.30));
      /* grab rail and a step up to the door */
      g.add(box(THREE, 0.46, 0.20, 0.06, M2.steel, xm - 0.20, s * (c.hw + 0.10), c.z0 - 0.30));
    }

    /* bumper, headlamps in guards, tow shackles */
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
    /* one on the tail plate for the view from directly behind */
    g.add(box(THREE, 0.05, 0.62, 0.14, team, P.X_TAIL + 0.02, 0, P.deckZ - 0.42));
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
      cabBlock(THREE, g, P, M2);
      jacks(THREE, g, P, M2);
      erectorRams(THREE, g, P, M2);
      g.add(erector(THREE, M, P, M2));
      markings(THREE, g, P, C, M2);
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

  UNIT_MODELS["tel_p"] = { len: 13.10, build: buildHeavy(TEL_P) };
  UNIT_MODELS["tel_c"] = { len: 14.20, build: buildHeavy(TEL_C) };
  UNIT_MODELS["tel_k"] = { len: 12.80, build: buildHeavy(TEL_K) };
  UNIT_MODELS["tel_n"] = { len: 7.00,  build: buildHimars };
})();
