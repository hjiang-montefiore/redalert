/* ============ armour3d.js -- parametric armoured vehicles ============
   Same problem the aircraft had. Every ground vehicle in the game borrowed a
   present-day model, so a T-34-85 rolled onto the map as a T-90A and an SU-100
   -- a casemate assault gun with no turret at all -- was drawn with one.

   What identifies armour at a glance is the running gear (huge Christie road
   wheels almost touching, versus small torsion-bar wheels under return
   rollers), the hull (a sharply sloped WW2 glacis versus a low modern wedge),
   and the turret (a rounded cast dome, a welded slab, or a faceted box with a
   long bustle) -- or the absence of one.

   Model space follows models3d.js: +X nose, +Y left, +Z up. Real metres.
   The spec table lives in armour_specs.js, keyed by unit id.               */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof ARMOUR === "undefined") { var ARMOUR = {}; }

var Armour3D = (function () {
  "use strict";

  var PAINT = {
    olive:    { c: 0x4a5236, r: 0.90, m: 0.05 },
    green:    { c: 0x3d4a30, r: 0.90, m: 0.05 },
    desert:   { c: 0xb0a07c, r: 0.92, m: 0.04 },
    sand:     { c: 0xc0b48e, r: 0.92, m: 0.04 },
    twotone:  { c: 0x6b6f63, r: 0.88, m: 0.06 },
    darkgrey: { c: 0x4e5257, r: 0.86, m: 0.08 },
    bluegrey: { c: 0x5f6a6f, r: 0.86, m: 0.08 },
    white:    { c: 0xcfd3d4, r: 0.88, m: 0.05 },
  };

  function mat(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({
      color: c, roughness: r === undefined ? 0.88 : r,
      metalness: m === undefined ? 0.06 : m });
  }

  /* Glazing. A lorry's cab is read by its windscreen more than by anything
     else on it, and a windscreen painted as flat steel is just a panel. */
  function glassOf(THREE) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x0a1a24, roughness: 0.09, metalness: 0.0,
      clearcoat: 0.55, clearcoatRoughness: 0.08,
      transparent: true, opacity: 0.82 });
  }

  /* --------------------------------------------------------------- paint */
  var texCache = {};
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  function skinTex(camo) {
    if (texCache[camo] !== undefined) return texCache[camo];
    try {
      var W = 512, H = 512;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var p = PAINT[camo] || PAINT.olive;
      var R = rngFor(camo.length * 7717 + 91);
      g.fillStyle = hex(p.c); g.fillRect(0, 0, W, H);
      /* disruptive blotches for the schemes that carry them */
      var SEC = { twotone: ["#4d5148", "#7d8377"], green: ["#2c3826", "#6b5f38"],
                  desert: ["#9d8f6c", "#c8bc99"], darkgrey: ["#3c4045", "#61666c"],
                  olive: ["#39412c", "#5d6742"] };
      var tones = SEC[camo];
      if (tones) {
        for (var b = 0; b < 20; b++) {
          g.globalAlpha = 0.45; g.fillStyle = tones[b % tones.length];
          g.beginPath();
          g.ellipse(R() * W, R() * H, 40 + R() * 90, 24 + R() * 55, R() * 3.14, 0, 6.29);
          g.fill();
        }
        g.globalAlpha = 1;
      }
      /* weld seams and plate joins */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
      for (var i = 0; i < 18; i++) {
        var x = R() * W, y = R() * H, l = 60 + R() * 190;
        g.beginPath();
        if (R() < 0.5) { g.moveTo(x, y); g.lineTo(x + l, y + (R() - 0.5) * 14); }
        else { g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 14, y + l); }
        g.stroke();
      }
      /* bolt heads and grab handles */
      g.fillStyle = "rgba(0,0,0,0.26)";
      for (var k = 0; k < 26; k++) {
        var bx = R() * W, by = R() * H, n = 4 + ((R() * 10) | 0);
        for (var q = 0; q < n; q++) g.fillRect(bx + q * 6, by, 2, 2);
      }
      /* dust and exhaust staining low down */
      var dust = g.createLinearGradient(0, H * 0.55, 0, H);
      dust.addColorStop(0, "rgba(150,138,110,0)");
      dust.addColorStop(1, "rgba(150,138,110,0.35)");
      g.fillStyle = dust; g.fillRect(0, H * 0.55, W, H * 0.45);
      g.fillStyle = "rgba(24,22,20,0.16)";
      for (var s2 = 0; s2 < 30; s2++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 18 + R() * 60);

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      texCache[camo] = t;
    } catch (e) { texCache[camo] = null; }
    return texCache[camo];
  }

  function skinOf(THREE, P) {
    var p = PAINT[P.camo] || PAINT.olive;
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: p.r, metalness: p.m });
    var t = skinTex(P.camo || "olive");
    if (t) m.map = t; else m.color.setHex(p.c);
    return m;
  }

  /* ---------------------------------------------------------------- hull */
  /* Longitudinal sections as [x, halfWidth, halfHeight, zCentre, crease].
     x is a fraction of hull length; the width column is relative (the widest
     station is normalised to the body's half beam) and the two vertical
     columns run 0 at the belly to 1 at the deck, mapped onto base..roof.

     These tables used to describe a smooth loaf: every station had its own
     width AND its own deck height, so the roof rose and fell along the hull
     and the glacis arrived as a curve. They are now written as a real plate
     layout instead -- a dead flat deck of constant width from the glacis
     break all the way to the tail, a belly line that is flat between the
     nose and the tail plate, and exactly two stations spanning the glacis so
     that the surface between them is one plane.

     The fifth column marks a plate join. buildHull emits that station twice;
     the zero-area quad between the twin rings contributes no normal, so
     computeVertexNormals stops averaging the deck into the glacis and the
     join comes out as a hard crease instead of a smooth shoulder. */
  var HULLS = {
    /* wartime: a long sharply sloped glacis meeting the deck a fifth of the
       way down the hull, and a nose beak with the lower plate under it */
    ww2: [
      [ 0.500, 0.900, 0.090, 0.430],
      [ 0.410, 0.945, 0.358, 0.378, 1],
      [ 0.300, 1.000, 0.500, 0.500, 1],
      [-0.360, 1.000, 0.500, 0.500, 1],
      [-0.470, 0.990, 0.460, 0.520],
      [-0.500, 0.930, 0.330, 0.530],
    ],
    /* modern: one very long shallow glacis off an almost ground-level nose */
    modern: [
      [ 0.500, 0.880, 0.090, 0.250],
      [ 0.420, 0.907, 0.246, 0.246, 1],
      [ 0.150, 1.000, 0.500, 0.500, 1],
      [-0.400, 1.000, 0.500, 0.500, 1],
      [-0.480, 1.000, 0.475, 0.495],
      [-0.500, 0.950, 0.400, 0.500],
    ],
    /* carrier box: upright front plate, short glacis, slab sides */
    boxy: [
      [ 0.500, 0.920, 0.260, 0.360],
      [ 0.430, 0.971, 0.431, 0.431, 1],
      [ 0.390, 1.000, 0.500, 0.500, 1],
      [-0.400, 1.000, 0.500, 0.500, 1],
      [-0.480, 1.000, 0.485, 0.505],
      [-0.500, 0.950, 0.410, 0.510],
    ],
    /* an amphibian carries a boat prow and a trim vane */
    boat: [
      [ 0.500, 0.240, 0.130, 0.430],
      [ 0.400, 0.550, 0.338, 0.398],
      [ 0.300, 0.880, 0.456, 0.456, 1],
      [ 0.250, 1.000, 0.500, 0.500, 1],
      [-0.380, 1.000, 0.500, 0.500, 1],
      [-0.480, 0.980, 0.480, 0.500],
      [-0.500, 0.920, 0.410, 0.510],
    ],
  };

  function hullTable(P) { return HULLS[P.hull] || HULLS.modern; }

  /* Ground is z = 0 and the track run stands on it, so the hull has to be
     lifted to sit ON the running gear rather than sunk through it. These two
     helpers are the single source of truth for that vertical arrangement --
     everything mounted on the hull reads its roof height from hullTopZ. */
  function wheelR(P, L) { return P.wheelR || L * 0.055; }
  function trackTop(P, L) { return P.track ? wheelR(P, L) * 2.05 : (P.wheelR || L * 0.05) * 2.0; }
  /* A tracked hull skirts the top of the belt. A wheeled one has its own
     arithmetic entirely -- a lorry's arrangement is set by its chassis rail,
     an armoured car's by its ground clearance -- so both of these delegate
     to wheelFrame() and there is still exactly one answer per vehicle. */
  function hullBase(P, L) {
    if (!P.track) return wheelFrame(P, L, P.width || 3.0).base;
    return trackTop(P, L) * 0.58;
  }
  function hullTopZ(P, L) {
    /* the roof a turret and the fittings sit on; for a lorry, the bed floor */
    if (!P.track) return wheelFrame(P, L, P.width || 3.0).top;
    /* the roof: the vehicle's real height less whatever the turret adds */
    var h = P.height || L * 0.42;
    /* a launcher truck wears its pack like a turret, so the hull may not have
       the whole vehicle's height to itself */
    var turretShare = P.kind === "rocket" ? 0.45
                    : ((!P.turret || P.turret === "none") ? 0.16 : 0.34);
    return Math.max(hullBase(P, L) + L * 0.03, h * (1 - turretShare));
  }

  /* the belt width, and therefore how much of the beam the hull body gets */
  /* A real tank track is about as wide as its road wheels are tall: a T-34's
     is half a metre. Drawn much thinner they read as rails beside the hull
     rather than as the thing the vehicle stands on. */
  function beltW(P, L) { return P.track ? wheelR(P, L) * 1.15 : 0; }

  /* Everything that has to agree about where the hull's plates are -- the
     loft, the deck, the glacis fittings and the engine louvres -- reads it
     from here, so there is one arithmetic for the whole vehicle. */
  function hullFrame(P, L, W) {
    var tbl = hullTable(P), i, s;
    var maxW = 1e-6, lo = 1e9, hi = -1e9;
    for (i = 0; i < tbl.length; i++) {
      maxW = Math.max(maxW, tbl[i][1]);
      lo = Math.min(lo, tbl[i][3] - tbl[i][2]);
      hi = Math.max(hi, tbl[i][3] + tbl[i][2]);
    }
    /* A tank's hull body is narrower than the vehicle: the tracks make up the
       rest of the beam. Scaling the body to the FULL width buried the near
       track inside it, so only one belt was ever visible -- but holding it a
       whole belt clear left the hull as a narrow loaf with two rails parked
       beside it. Real armour overhangs its tracks, so the sides come down
       just inboard of the beam and the belt shows below the sponson. */
    var bodyHalf = Math.max(W * 0.18, W * 0.5 - beltW(P, L) * 0.42);
    var base = hullBase(P, L), roof = hullTopZ(P, L);
    var zScale = (roof - base) / Math.max(1e-4, hi - lo);
    var frontX = -1e9, backX = 1e9, noseX = -1e9, noseV = 0, tailX = 1e9;
    /* the flat run of the deck: every station whose roof is within a whisker
       of the highest one. Past it the hull is already sloping away, and a
       deck plate carried out that far hangs in the air as a shelf. */
    var flat = hi - (hi - lo) * 0.05;
    for (i = 0; i < tbl.length; i++) {
      s = tbl[i];
      if (s[3] + s[2] >= flat) {
        frontX = Math.max(frontX, s[0]);
        backX = Math.min(backX, s[0]);
      }
      if (s[0] > noseX) { noseX = s[0]; noseV = s[3] + s[2]; }
      tailX = Math.min(tailX, s[0]);
    }
    return {
      tbl: tbl, maxW: maxW, lo: lo, base: base, roof: roof, zScale: zScale,
      bodyHalf: bodyHalf,
      /* the roof plate runs out over the tracks to the vehicle's own beam */
      deckHalf: P.track ? W * 0.495 : bodyHalf * 0.99,
      frontX: frontX * L, backX: backX * L, tailX: tailX * L, noseX: noseX * L,
      noseZ: base + (noseV - lo) * zScale,
    };
  }
  function hullY(F, w) { return w / F.maxW * F.bodyHalf; }
  function hullZ(F, v) { return F.base + (v - F.lo) * F.zScale; }

  function buildHull(THREE, M, P, L, W, skin) {
    var G = new THREE.Group();
    var F = hullFrame(P, L, W), tbl = F.tbl, secs = [], i, s, sec;
    for (i = 0; i < tbl.length; i++) {
      s = tbl[i];
      sec = { x: s[0] * L, w: hullY(F, s[1]), h: s[2] * F.zScale,
              /* loft() raises |cos| to this power: BELOW one squares the
                 section off, above one pinches it inward. A tank hull is a
                 box, so it wants a low exponent -- at 2.6 the sides were
                 being sucked in away from the tracks. */
              zc: hullZ(F, s[3]), sq: 0.22 };
      secs.push(sec);
      /* a repeated ring hardens the plate join: see the note on HULLS */
      if (s[4]) secs.push({ x: sec.x, w: sec.w, h: sec.h, zc: sec.zc, sq: sec.sq });
    }
    secs.reverse();
    G.add(new THREE.Mesh(M.loft(THREE, secs, 20), skin));
    deckPlate(THREE, M, G, P, L, W, skin, F);
    glacisPlate(THREE, G, P, L, W, skin, F);
    engineDeck(THREE, G, P, L, W, skin, F);
    return G;
  }

  /* The roof, as one flat plate carried out to the full beam. A lofted
     section can only be widest at its own mid-height, so left to itself the
     hull's roof corners droop away and the thing reads as a loaf from
     overhead. The plate is what makes the top-down silhouette a rectangle,
     and it gives every roof fitting one height to sit at. */
  function deckPlate(THREE, M, G, P, L, W, skin, F) {
    /* Deep enough to reach down to where the lofted section is at its full
       width. A thin sheet at the roof line overhangs the shoulder the loft
       has already started to round away, and reads as a wing bolted to the
       hull; this thickness is the sponson side. */
    var t = Math.max(L * 0.014, (F.roof - F.base) * 0.115);
    var x0 = F.frontX, x1 = F.backX, hw = F.deckHalf, nose = F.bodyHalf * 0.96;
    var cut = Math.min(L * 0.055, (x0 - x1) * 0.20);
    var pts = [
      [x0, nose], [x0 - cut, hw], [x1 + cut * 0.5, hw], [x1, hw * 0.88],
      [x1, -hw * 0.88], [x1 + cut * 0.5, -hw], [x0 - cut, -hw], [x0, -nose],
    ];
    var pl = new THREE.Mesh(M.slab(THREE, pts, t), skin);
    pl.position.z = F.roof - t;
    G.add(pl);
  }

  /* the glacis, as a line the fittings can be hung on */
  function glacisLine(F) {
    var dx = F.frontX - F.noseX, dz = F.roof - F.noseZ;
    var run = Math.sqrt(dx * dx + dz * dz);
    if (run < 1e-4) return null;
    return { ux: dx / run, uz: dz / run, run: run,
             /* rotation.y that lays a box flat on the plate, its local +Z
                standing on the plate's outward normal */
             ang: Math.atan2(dz / run, -dx / run) };
  }
  /* a point a fraction f up the glacis from the nose, lifted out of the
     plate by `up` along its own normal */
  function onGlacis(F, gl, f, up) {
    var nx = gl.uz, nz = -gl.ux;
    return { x: F.noseX + gl.ux * gl.run * f + nx * up,
             z: F.noseZ + gl.uz * gl.run * f + nz * up };
  }

  /* Towing eyes and the driver's hatch. Two jobs: they date the vehicle, and
     from directly overhead they are the only thing that tells you where the
     front of the tank is. */
  function glacisPlate(THREE, G, P, L, W, skin, F) {
    var gl = glacisLine(F);
    if (!gl || gl.run < L * 0.06) return;
    var dark = mat(THREE, 0x2b2f27, 0.92, 0.10);
    var steel = mat(THREE, 0x50555a, 0.60, 0.45);
    var s, p, eye, pin, i;

    if (P.track) {
      for (s = -1; s <= 1; s += 2) {
        p = onGlacis(F, gl, 0.15, L * 0.012);
        eye = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.055, L * 0.030, L * 0.026), skin);
        eye.rotation.y = gl.ang;
        eye.position.set(p.x, s * F.bodyHalf * 0.60, p.z);
        G.add(eye);
        pin = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.011, L * 0.011, L * 0.040, 8), steel);
        pin.rotation.x = Math.PI / 2;
        pin.position.set(p.x + L * 0.014, s * F.bodyHalf * 0.60, p.z + L * 0.008);
        G.add(pin);
      }
    }
    /* driver's hatch, offset to one side of the centreline */
    if (gl.run > L * 0.13) {
      p = onGlacis(F, gl, 0.66, L * 0.008);
      var hx = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.085, W * 0.17, L * 0.018), skin);
      hx.rotation.y = gl.ang;
      hx.position.set(p.x, F.bodyHalf * 0.38, p.z);
      G.add(hx);
      var per = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.016, W * 0.055, L * 0.014), dark);
      per.rotation.y = gl.ang;
      per.position.set(p.x + L * 0.030, F.bodyHalf * 0.38, p.z + L * 0.016);
      G.add(per);
    }
  }

  /* The engine deck: a raised panel with louvres across it and a pair of
     exhaust cowls. Nothing else on a tank reads as clearly from straight
     above, and it is what tells the rear of the hull from the front. */
  function engineDeck(THREE, G, P, L, W, skin, F) {
    var dark = mat(THREE, 0x23261f, 0.94, 0.12);
    var soot = mat(THREE, 0x2e2b26, 0.95, 0.10);
    var top = F.roof, hw = F.deckHalf, i;
    var at = (P.turretAt || 0) * L, obsR, obsF;
    if (P.turret && P.turret !== "none") { obsR = at - L * 0.27; obsF = at + L * 0.27; }
    else if (P.kind === "casemate") { obsR = -L * 0.26; obsF = L * 0.30; }
    else if (P.kind === "rocket") { obsR = -L * 0.34; obsF = L * 0.20; }
    else { obsR = -L * 0.14; obsF = L * 0.16; }
    /* a gun mounted right at the back means the power pack is up front, and
       a rocket truck carries its engine under a bonnet ahead of the bed */
    var fwd = P.kind === "rocket" || P.kind === "truck" || (P.turretAt || 0) < -0.10;
    var x0, x1;
    if (fwd) {
      x0 = Math.max(L * 0.08, obsF);
      x1 = Math.min(F.frontX - L * 0.025, x0 + L * 0.30);
    } else {
      x1 = Math.min(-L * 0.10, obsR);
      x0 = Math.max(F.backX + L * 0.015, x1 - L * 0.30);
    }
    if (x1 - x0 < L * 0.08) x0 = x1 - L * 0.08;

    var t = L * 0.014;
    var pan = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, hw * 1.70, t), skin);
    pan.position.set((x0 + x1) * 0.5, 0, top + t * 0.5);
    G.add(pan);
    var n = 6, gap = (x1 - x0) / n;
    for (i = 0; i < n; i++) {
      var bar = new THREE.Mesh(
        new THREE.BoxGeometry(gap * 0.44, hw * 1.52, t * 1.05), dark);
      bar.position.set(x0 + gap * (i + 0.5), 0, top + t * 1.05);
      G.add(bar);
    }
    var ex = fwd ? x1 - L * 0.03 : x0 + L * 0.03;
    for (i = -1; i <= 1; i += 2) {
      var cowl = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.055, L * 0.045, L * 0.032), soot);
      cowl.position.set(ex, i * hw * 0.74, top + L * 0.016);
      G.add(cowl);
    }
  }

  /* -------------------------------------------------------- running gear */
  function runningGear(THREE, g, P, L, W, skin) {
    var dark = mat(THREE, 0x1c1e20, 0.95, 0.03);
    var rub  = mat(THREE, 0x17191a, 0.96, 0.02);
    var steel = mat(THREE, 0x54595d, 0.7, 0.35);
    var s, i;

    if (!P.track) { wheeledGear(THREE, g, P, L, W, skin); return; }

    /* tracked */
    var n = Math.max(3, P.wheels || 6);
    var r = wheelR(P, L);
    var christie = P.susp === "christie";
    var bogie = P.susp === "bogie";
    /* the belt's outer face is the vehicle's beam */
    var bw = beltW(P, L);
    var ty = W * 0.5 - bw * 0.5;
    var span = L * 0.78;
    var x0 = -span * 0.5, dx = span / (n - 1);

    var rt = r * 0.32;
    for (s = -1; s <= 1; s += 2) {
      /* The belt is its two runs, not one solid slab. Drawn solid it filled
         the whole space between the wheels and swallowed them, which is why
         the running gear only read at all while the wheels were lying flat. */
      for (i = 0; i < 2; i++) {
        var run = new THREE.Mesh(new THREE.BoxGeometry(L * 0.92, bw, rt), dark);
        run.position.set(0, s * ty, i ? r * 2.02 - rt * 0.5 : rt * 0.5);
        g.add(run);
      }

      for (i = 0; i < n; i++) {
        var wx = x0 + i * dx;
        var rad = christie ? r : (bogie ? r * 0.78 : r);
        /* Each wheel is its own group so the renderer can turn it. A smooth
           cylinder rotating about its own axis shows nothing at all, and a
           concentric hub shows nothing either, so the wheel carries a ring of
           bolts off the axis - that is the only part of this the eye can
           actually see going round. */
        var wheel = new THREE.Group();
        wheel.name = "roadwheel";
        wheel.position.set(wx, s * ty, rad + r * 0.06);
        /* no rotation: a cylinder's axis is already +Y, which is the axle */
        var wl = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, bw * 0.86, 14), dark);
        wheel.add(wl);
        /* a pale hub picks the wheel out against the track */
        var hub = new THREE.Mesh(
          new THREE.CylinderGeometry(rad * 0.44, rad * 0.44, bw * 0.94, 10), steel);
        wheel.add(hub);
        var nb = 5, bi;
        for (bi = 0; bi < nb; bi++) {
          var ba = (bi / nb) * Math.PI * 2;
          var bolt = new THREE.Mesh(
            new THREE.CylinderGeometry(rad * 0.075, rad * 0.075, bw * 1.02, 6), steel);
          bolt.position.set(Math.cos(ba) * rad * 0.62, 0, Math.sin(ba) * rad * 0.62);
          wheel.add(bolt);
        }
        g.add(wheel);
      }

      /* drive sprocket and idler, one at each end and raised clear */
      var sx = P.sprocketFront ? span * 0.56 : -span * 0.56;
      var ix = -sx;
      var spg = new THREE.Group();
      spg.name = "roadwheel";
      spg.position.set(sx, s * ty, r * 1.10);
      var sp = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.80, r * 0.80, bw * 0.70, 12), steel);
      spg.add(sp);
      /* sprocket teeth, which is what makes the drive wheel read as turning */
      var tn = 8, ti;
      for (ti = 0; ti < tn; ti++) {
        var ta = (ti / tn) * Math.PI * 2;
        var tooth = new THREE.Mesh(
          new THREE.BoxGeometry(r * 0.16, bw * 0.74, r * 0.16), dark);
        tooth.position.set(Math.cos(ta) * r * 0.84, 0, Math.sin(ta) * r * 0.84);
        spg.add(tooth);
      }
      g.add(spg);
      var id = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.70, r * 0.70, bw * 0.70, 12), dark);
      id.position.set(ix, s * ty, r * 1.02);
      g.add(id);

      /* return rollers ride the upper track run; Christie suspension has none */
      var rr = christie ? 0 : Math.max(0, P.rollers || 0);
      for (i = 0; i < rr; i++) {
        var rx = -span * 0.40 + (i + 0.5) * (span * 0.80 / rr);
        var rl = new THREE.Mesh(
          new THREE.CylinderGeometry(r * 0.26, r * 0.26, bw * 0.52, 8), dark);
        rl.position.set(rx, s * ty, r * 2.02 - rt - r * 0.24);
        g.add(rl);
      }
    }
  }

  /* -------------------------------------------------------------- skirts */
  function addSkirts(THREE, g, P, L, W, skin) {
    if (!P.track || P.skirts === "none" || !P.skirts) return;
    var dark = mat(THREE, 0x30352c, 0.9, 0.08);
    var z = hullTopZ(P, L) * 0.52;
    var h = L * 0.070;
    var y = W * 0.5 + L * 0.004;
    if (P.skirts === "full") {
      for (var s = -1; s <= 1; s += 2) {
        var pl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.80, L * 0.008, h), skin);
        pl.position.set(0, s * y, z);
        g.add(pl);
      }
      return;
    }
    var segN = 6, segW = (L * 0.80) / segN;
    for (var s2 = -1; s2 <= 1; s2 += 2) {
      for (var i = 0; i < segN; i++) {
        var sx = -L * 0.40 + segW * (i + 0.5);
        var p2 = new THREE.Mesh(new THREE.BoxGeometry(segW * 0.92, L * 0.008, h), skin);
        p2.position.set(sx, s2 * y, z);
        g.add(p2);
        var hg = new THREE.Mesh(new THREE.BoxGeometry(segW * 0.92, L * 0.012, L * 0.008), dark);
        hg.position.set(sx, s2 * y, z + h * 0.5);
        g.add(hg);
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* How much height the turret is allowed. The spec table gives the whole
     vehicle's height and hullTopZ has already spent the hull's share of it,
     so the rest is the turret -- which is what stops a cast dome from being
     drawn a metre and a half tall on a tank that is 2.7 m over all. */
  function turretH(P, L) {
    var h = P.height || L * 0.42;
    return Math.max(L * 0.045, h - hullTopZ(P, L));
  }

  /* a roof hatch: rim, lid and the periscope block in front of it. Small,
     but from a top-down camera it is most of what a turret roof IS. */
  function roofHatch(THREE, T, skin, dark, x, y, z, r) {
    var rim = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 1.22, r * 1.22, r * 0.20, 14), dark);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(x, y, z + r * 0.04);
    T.add(rim);
    var lid = new THREE.Mesh(new THREE.CylinderGeometry(r, r, r * 0.30, 14), skin);
    lid.rotation.x = Math.PI / 2;
    lid.position.set(x, y, z + r * 0.14);
    T.add(lid);
    var per = new THREE.Mesh(
      new THREE.BoxGeometry(r * 0.36, r * 0.60, r * 0.34), dark);
    per.position.set(x + r * 1.30, y, z + r * 0.16);
    T.add(per);
  }

  function buildTurret(THREE, M, P, L, W, skin) {
    var T = new THREE.Group();
    T.name = "turret";
    var dark = mat(THREE, 0x2c3029, 0.9, 0.08);
    var steel = mat(THREE, 0x4a4f52, 0.62, 0.42);
    /* th is now the turret's REAL height above the deck, not a length-derived
       guess, so every branch below is written as a fraction of it and the
       finished vehicle comes out at the height its spec row claims. */
    var tw = W * 0.36, tl = L * 0.30, th = turretH(P, L);
    /* where the gun hangs, and how big the roof is for hatch placement */
    var mount = { x: tl * 0.60, z: th * 0.42 };
    var roof = null;

    if (P.turret === "cast") {
      /* A cast turret is a lathed shape, not a ball: near-vertical sides, a
         slight overhang above the ring, and a flat roof plate. Drawn as a
         scaled sphere it came out bulbous and half a hull long. */
      var R = W * 0.30;
      var prof = [
        [0.00, -0.24], [0.86, -0.24], [0.96, -0.02], [1.00, 0.22],
        [1.00, 0.55], [0.95, 0.82], [0.86, 0.955], [0.78, 1.00], [0.00, 1.00],
      ], pts = [], pi;
      for (pi = 0; pi < prof.length; pi++)
        pts.push(new THREE.Vector2(R * prof[pi][0], th * prof[pi][1]));
      var geo = new THREE.LatheGeometry(pts, 22);
      geo.rotateX(Math.PI / 2);
      var dome = new THREE.Mesh(geo, skin);
      dome.scale.set(1.24, 1, 1);
      T.add(dome);
      mount = { x: R * 1.06, z: th * 0.42 };
      roof = { z: th, x: R * 1.24 * 0.78, y: R * 0.78, r: R * 0.26, n: 2 };
    } else if (P.turret === "welded") {
      /* flat plates with a visible join line down each side */
      var box = new THREE.Mesh(new THREE.BoxGeometry(tl * 1.7, tw * 1.9, th * 0.90), skin);
      box.position.z = th * 0.45;
      T.add(box);
      var face = new THREE.Mesh(new THREE.BoxGeometry(tl * 0.22, tw * 1.85, th * 0.84), skin);
      face.position.set(tl * 0.82, 0, th * 0.45);
      face.rotation.y = -0.32;
      T.add(face);
      mount = { x: tl * 0.82, z: th * 0.44 };
      roof = { z: th * 0.90, x: tl * 0.85, y: tw * 0.95, r: tw * 0.24, n: 2 };
    } else if (P.turret === "wedge") {
      /* modern faceted box with a long stowage bustle behind it */
      var body = new THREE.Mesh(new THREE.BoxGeometry(tl * 1.5, tw * 2.0, th * 0.82), skin);
      body.position.set(-tl * 0.10, 0, th * 0.41);
      T.add(body);
      var cheek = new THREE.Mesh(new THREE.BoxGeometry(tl * 0.70, tw * 1.92, th * 0.76), skin);
      cheek.position.set(tl * 0.70, 0, th * 0.39);
      cheek.rotation.y = -0.20;
      T.add(cheek);
      var bustle = new THREE.Mesh(new THREE.BoxGeometry(tl * 0.62, tw * 1.72, th * 0.60), skin);
      bustle.position.set(-tl * 0.95, 0, th * 0.36);
      T.add(bustle);
      for (var bi = -1; bi <= 1; bi++) {
        var bar = new THREE.Mesh(new THREE.BoxGeometry(tl * 0.60, tw * 0.05, th * 0.05), dark);
        bar.position.set(-tl * 0.95, bi * tw * 0.55, th * 0.67);
        T.add(bar);
      }
      mount = { x: tl * 0.86, z: th * 0.40 };
      roof = { z: th * 0.82, x: tl * 0.60, y: tw * 0.98, r: tw * 0.22, n: 2 };
    } else if (P.turret === "small") {
      var sb = new THREE.Mesh(new THREE.BoxGeometry(tl * 0.92, tw * 1.20, th * 0.88), skin);
      sb.position.z = th * 0.44;
      T.add(sb);
      var sf = new THREE.Mesh(new THREE.BoxGeometry(tl * 0.20, tw * 1.16, th * 0.80), skin);
      sf.position.set(tl * 0.50, 0, th * 0.44);
      sf.rotation.y = -0.30;
      T.add(sf);
      mount = { x: tl * 0.50, z: th * 0.44 };
      roof = { z: th * 0.88, x: tl * 0.20, y: tw * 0.30, r: tw * 0.26, n: 1 };
    } else if (P.turret === "opentop") {
      /* a tub with open sides: the crew and the mount are visible */
      for (var q = 0; q < 4; q++) {
        var a = q * Math.PI / 2;
        var wall = new THREE.Mesh(
          new THREE.BoxGeometry(q % 2 ? tw * 1.7 : L * 0.012, q % 2 ? L * 0.012 : tw * 1.7, th * 0.78),
          skin);
        wall.position.set(Math.cos(a) * tw * 0.85, Math.sin(a) * tw * 0.85, th * 0.39);
        T.add(wall);
      }
      var floor = new THREE.Mesh(new THREE.BoxGeometry(tw * 1.7, tw * 1.7, L * 0.010), skin);
      T.add(floor);
      mount = { x: 0, z: th * 0.52 };
    }

    if (roof) {
      roofHatch(THREE, T, skin, dark, -roof.x * 0.28, roof.y * 0.42, roof.z, roof.r);
      if (roof.n > 1)
        roofHatch(THREE, T, skin, dark, roof.x * 0.16, -roof.y * 0.44, roof.z, roof.r * 0.88);
    }
    T.userData.mountX = mount.x;
    T.userData.mountZ = mount.z;
    return T;
  }

  /* gun barrel with the period's fittings. mx/mz are where the trunnion sits
     in the turret's own space -- a gun laid on the deck line, which is what
     the default used to be, looks like it is firing out of the hull roof. */
  function addGun(THREE, T, P, L, W, mx, mz) {
    if (!P.gunCal) return;
    var steel = mat(THREE, 0x3e4348, 0.62, 0.45);
    var r = Math.max(L * 0.010, (P.gunCal / 1000) * 0.55);
    var len = P.gunLen || L * 0.55;
    var x0 = mx === undefined ? L * 0.14 : mx;
    var z0 = mz === undefined ? 0 : mz;
    /* a mantlet is sized by the turret it is let into, not by the bore */
    var mr = Math.max(r * 3.2, turretH(P, L) * 0.40);

    if (P.mantlet === "cast") {
      var mk = new THREE.Mesh(new THREE.SphereGeometry(mr, 12, 9), steel);
      mk.scale.set(0.55, 1.15, 0.95);
      mk.position.set(x0, 0, z0);
      T.add(mk);
    } else if (P.mantlet === "slab") {
      var ms = new THREE.Mesh(
        new THREE.BoxGeometry(mr * 0.52, mr * 2.05, mr * 1.60), steel);
      ms.position.set(x0, 0, z0);
      T.add(ms);
    }
    var bar = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.06, len, 12), steel);
    bar.rotation.z = -Math.PI / 2;
    bar.position.set(x0 + len * 0.5, 0, z0);
    T.add(bar);
    if (P.evac) {
      /* the bore evacuator bulge, roughly two-thirds out */
      var ev = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.9, r * 1.9, len * 0.16, 12), steel);
      ev.rotation.z = -Math.PI / 2;
      ev.position.set(x0 + len * 0.62, 0, z0);
      T.add(ev);
    }
    if (P.brake) {
      var mb = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.7, r * 1.7, len * 0.10, 10), steel);
      mb.rotation.z = -Math.PI / 2;
      mb.position.set(x0 + len * 0.97, 0, z0);
      T.add(mb);
      for (var s = -1; s <= 1; s += 2) {
        var port = new THREE.Mesh(new THREE.BoxGeometry(len * 0.05, r * 0.7, r * 2.4), steel);
        port.position.set(x0 + len * 0.97, s * r * 1.5, z0);
        T.add(port);
      }
    }
  }

  /* ------------------------------------------------------------- fittings */
  function addExtras(THREE, g, T, P, L, W, skin) {
    var ex = P.extras || [];
    var dark = mat(THREE, 0x131610, 0.9, 0.08);
    var steel = mat(THREE, 0x24282b, 0.62, 0.42);
    var top = hullTopZ(P, L);
    /* turret fittings used to be placed at fractions of the hull LENGTH, which
       only ever agreed with the old length-derived turret height. They hang
       off the real turret height now, so a cupola still lands on the roof. */
    var th = turretH(P, L);
    function has(k) { return ex.indexOf(k) >= 0; }

    if (has("cupola") && T) {
      var cu = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.11, W * 0.12, L * 0.038, 12), skin);
      cu.rotation.x = Math.PI / 2;
      cu.position.set(-L * 0.02, W * 0.13, th * 1.00);
      T.add(cu);
    }
    if (has("irlight") && T) {
      /* the big infrared searchlight beside the gun: pure Cold War */
      var dr = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.030, L * 0.030, L * 0.026, 12), dark);
      dr.rotation.z = Math.PI / 2;
      dr.position.set(L * 0.10, -W * 0.16, th * 0.86);
      T.add(dr);
    }
    if (has("aaMg") && T) {
      var mg = new THREE.Mesh(new THREE.CylinderGeometry(L * 0.005, L * 0.005, L * 0.10, 6), steel);
      mg.rotation.z = Math.PI / 2;
      mg.position.set(L * 0.03, W * 0.13, th + L * 0.030);
      T.add(mg);
    }
    if (has("smoke") && T) {
      for (var s = -1; s <= 1; s += 2) {
        for (var i = 0; i < 4; i++) {
          var tu = new THREE.Mesh(
            new THREE.CylinderGeometry(L * 0.008, L * 0.008, L * 0.030, 6), dark);
          tu.rotation.z = Math.PI / 2;
          tu.position.set(L * 0.10 - i * L * 0.016, s * W * 0.30, th * 0.80);
          T.add(tu);
        }
      }
    }
    if (has("era") && T) {
      /* explosive reactive armour: a visible brick pattern on the front */
      for (var bx = 0; bx < 3; bx++) for (var by = -1; by <= 1; by++) {
        var br = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.030, W * 0.10, L * 0.020), skin);
        br.position.set(L * (0.10 - bx * 0.022), by * W * 0.12, th * (0.60 + bx * 0.19));
        T.add(br);
      }
    }
    if (has("stowage") && T) {
      var bskt = new THREE.Mesh(new THREE.BoxGeometry(L * 0.14, W * 0.42, L * 0.030), dark);
      bskt.position.set(-L * 0.17, 0, th * 0.93);
      T.add(bskt);
    }
    if (has("trimvane")) {
      var tv = new THREE.Mesh(new THREE.BoxGeometry(L * 0.012, W * 0.86, L * 0.055), skin);
      tv.position.set(L * 0.47, 0, top * 0.62);
      tv.rotation.y = 0.9;
      g.add(tv);
    }
    if (has("fueldrums")) {
      for (var d = -1; d <= 1; d += 2) {
        var dm = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.030, L * 0.030, L * 0.10, 12), skin);
        dm.rotation.z = Math.PI / 2;
        dm.position.set(-L * 0.44, d * (W * 0.5 - L * 0.036), top + L * 0.032);
        g.add(dm);
      }
    }
    if (has("spareTrack")) {
      var st = new THREE.Mesh(new THREE.BoxGeometry(L * 0.10, W * 0.30, L * 0.014), dark);
      st.position.set(L * 0.36, 0, top + L * 0.010);
      g.add(st);
    }
    if (has("slat")) {
      for (var s3 = -1; s3 <= 1; s3 += 2) {
        for (var j = 0; j < 5; j++) {
          var sb = new THREE.Mesh(new THREE.BoxGeometry(L * 0.42, L * 0.008, L * 0.010), dark);
          sb.position.set(-L * 0.05, s3 * (W * 0.5 + L * 0.045), top * (0.5 + j * 0.16));
          g.add(sb);
        }
      }
    }
  }

  /* the casemate superstructure of an assault gun */
  function casemate(THREE, g, P, L, W, skin) {
    var top = hullTopZ(P, L);
    var h = L * 0.090;
    var box = new THREE.Mesh(new THREE.BoxGeometry(L * 0.50, W * 0.88, h), skin);
    box.position.set(L * 0.02, 0, top + h * 0.42);
    g.add(box);
    /* the sloped front plate the gun comes through */
    var face = new THREE.Mesh(new THREE.BoxGeometry(L * 0.10, W * 0.86, h * 1.16), skin);
    face.position.set(L * 0.27, 0, top + h * 0.40);
    face.rotation.y = -0.42;
    g.add(face);
    /* a casemate roof is otherwise a blank plate from overhead */
    roofHatch(THREE, g, skin, mat(THREE, 0x2c3029, 0.9, 0.08),
              -L * 0.14, W * 0.20, top + h * 0.92, W * 0.085);
    return { z: top + h * 0.35, x: L * 0.24 };
  }

  /* ==================================================================
     WHEELED VEHICLES

     A wheeled vehicle is not a low-detail tank, and it used to be built as
     one: runningGear() bailed out after laying four cylinders under the
     lofted hull, so a supply truck arrived as a slab on tyres with no cab,
     no bonnet, no chassis and no load bed at all.

     Everything that identifies a wheeled vehicle is the part the tank
     builder does not have. A lorry is a CHASSIS with three separate bodies
     bolted to it -- bonnet, cab, load bed -- and you read it by the gap
     between them. An armoured car is a faceted monocoque with a vision
     block over the driver and a spare wheel on the flank. A BTR is a boat
     with firing ports down the side and a door in the back.

     So there are three bodies here, chosen from the spec row's kind and
     role, and they all stand on the same running gear.
     ================================================================== */

  var ERA_RANK = { e40: 0, e50: 1, e60: 2, e70: 3, e80: 4, e90: 5,
                   e00: 6, e10: 7, e20: 8 };
  function eraR(P) {
    var r = ERA_RANK[P.era];
    return r === undefined ? 4 : r;
  }
  function hasEx(P, k) {
    var ex = P.extras || [];
    return ex.indexOf(k) >= 0;
  }

  /* which body the spec row is asking for */
  function wheelBody(P) {
    var role = P.role || "", ax = Math.max(2, P.wheels || 2), L = P.len || 6;
    if (P.kind === "truck" || P.kind === "rocket") return "truck";
    if (role === "supply" || role === "radarv" || role === "mlrs" ||
        role === "ewveh") return "truck";
    if (P.kind === "apc" || role === "ifv" || role === "spaag" ||
        role === "atgmv" || role === "tankdestroyer" || role === "lighttank")
      return (ax <= 2 && L < 5.4) ? "car" : "apc";
    /* a scout car on three or four axles is an eight-wheeled hull, not a jeep */
    return (ax >= 3 && L >= 6.0) ? "apc" : "car";
  }

  /* Where the axles sit. A lorry hangs its steering axle right under the
     bonnet and bunches the drive axles under the bed; an armoured hull
     spreads them evenly so the belly clears a ditch between any two. */
  function axleSpots(body, ax, L) {
    var f;
    if (body === "truck") {
      f = ax <= 2 ? [0.33, -0.29]
        : ax === 3 ? [0.35, -0.16, -0.34]
        : ax === 4 ? [0.37, 0.19, -0.19, -0.36]
        : [0.37, 0.21, -0.02, -0.22, -0.38];
    } else {
      f = ax <= 2 ? [0.30, -0.30]
        : ax === 3 ? [0.33, 0.00, -0.32]
        : ax === 4 ? [0.35, 0.14, -0.14, -0.35]
        : [0.36, 0.18, 0.00, -0.18, -0.36];
    }
    var o = [], i;
    for (i = 0; i < f.length; i++) o.push(f[i] * L);
    return o;
  }

  /* The single source of truth for a wheeled vehicle's vertical and
     longitudinal arrangement. hullBase/hullTopZ delegate to it, so the
     turret, the extras and the mission load all agree with the chassis. */
  function wheelFrame(P, L, W) {
    var body = wheelBody(P), er = eraR(P);
    var ax = Math.max(2, Math.min(5, P.wheels || 2));
    var r = P.wheelR || W * 0.20;
    /* a fifties lorry runs on narrow high-pressure crossplies; a modern
       eight-wheeler on fat run-flats that fill the arch */
    var tw = r * (er <= 1 ? 0.44 : er <= 3 ? 0.52 : er <= 5 ? 0.60 : 0.68);
    var hy = Math.max(W * 0.24, W * 0.5 - tw * 0.5 - W * 0.012);
    var xs = axleSpots(body, ax, L);
    var h = P.height || L * 0.42;
    var F = { body: body, era: er, ax: ax, r: r, tw: tw, hy: hy, xs: xs,
              nw: xs.length * 2, L: L, W: W };
    if (body === "truck") {
      F.railT = Math.max(0.055, r * 0.28);
      F.railZ = r * 1.55;
      F.base = F.railZ - F.railT * 0.5;
      /* the load floor clears the tyres it sits over */
      F.bedZ = Math.max(F.railZ + F.railT * 0.5 + r * 0.10, r * 1.95);
      /* a cab is about a metre and a half from its floor to its roof
         whatever the lorry under it weighs */
      F.cabH = Math.max(0.92, Math.min(Math.max(1.05, Math.min(L * 0.20, 1.55)),
                                       h - F.bedZ));
      F.roof = F.bedZ + F.cabH;
      /* forward control -- the flat front that puts the driver over the
         wheel -- is what the heavy lorries went to; a five-tonner still
         carries its engine in a bonnet ahead of the screen */
      F.cabOver = L >= 9.0;
      F.jeep = L < 4.6;
      F.bonnet = F.cabOver ? 0 : Math.max(L * 0.13, Math.min(L * 0.22, 1.35));
      F.cabLen = Math.max(L * 0.155, Math.min(L * 0.26, 1.95));
      F.cabF = L * 0.5 - F.bonnet;
      F.cabB = F.cabF - F.cabLen;
      F.bedF = F.cabB - L * 0.022;
      F.bedB = -L * 0.5 + L * 0.020;
      F.bedHW = W * 0.5 * 0.94;
      F.top = F.bedZ;
    } else {
      F.base = r * 0.80;
      var share = (!P.turret || P.turret === "none") ? 0.07
                : (P.turret === "opentop" ? 0.26 : 0.22);
      F.roof = Math.max(F.base + Math.max(0.38, r * 0.95), h * (1 - share));
      F.belt = F.base + (F.roof - F.base) * 0.46;
      F.top = F.roof;
    }
    return F;
  }

  /* ------------------------------------------------------------- wheels */
  /* A wheel the eye can actually see turning. The renderer spins any group
     named "roadwheel" at the vehicle's real speed, and a smooth cylinder
     rotating about its own axis shows NOTHING -- so the wheel carries a
     ring of five bolts well off the axle, a tread band proud of the
     carcass and a sidewall bulge, and it is those that read as rotation.
     A cylinder's own axis is +Y, which IS the axle: never rotate it. */
  function roadWheel(THREE, r, w, lod, rub, tread, steel) {
    var G = new THREE.Group();
    G.name = "roadwheel";
    var seg = lod >= 2 ? 18 : (lod === 1 ? 16 : 12);
    G.add(new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.93, r * 0.93, w * 1.00, seg), rub));
    /* the tread band stands proud of the carcass and is narrower than it */
    G.add(new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, w * 0.74, seg), tread));
    /* sidewall bulge: a wheel without one reads as a plain disc */
    var s, wall;
    for (s = (lod >= 2 ? -1 : 1); s <= 1; s += 2) {
      wall = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.84, r * 0.96, w * 0.18, seg), rub);
      wall.position.y = s * w * 0.41;
      G.add(wall);
    }
    /* the rim flange inside the tyre, then the hub and its cap */
    if (lod >= 2)
      G.add(new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.58, r * 0.58, w * 0.90, seg), steel));
    G.add(new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.44, r * 0.44, w * 1.04, lod ? 10 : 8), steel));
    if (lod >= 1)
      G.add(new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.15, r * 0.15, w * 1.20, 8), steel));
    var b, a, bolt;
    for (b = 0; b < 5; b++) {
      a = (b / 5) * Math.PI * 2 + 0.31;
      bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.075, r * 0.075, w * 1.12, lod ? 8 : 6), steel);
      bolt.position.set(Math.cos(a) * r * 0.60, 0, Math.sin(a) * r * 0.60);
      G.add(bolt);
    }
    return G;
  }

  /* running gear: wheels, axle beams, springs, mudguards, side fenders */
  function wheeledGear(THREE, g, P, L, W, skin) {
    var F = wheelFrame(P, L, W);
    var rub = mat(THREE, 0x141618, 0.95, 0.02);
    var tread = mat(THREE, 0x0d0e10, 0.97, 0.02);
    var steel = mat(THREE, 0x1b1f22, 0.64, 0.42);
    /* the hub and its bolt ring are the only things on a turning wheel the
       eye can lock onto, so they stay light against the black tyre */
    var hubM = mat(THREE, 0x4a5054, 0.58, 0.40);
    var lod = F.nw <= 4 ? 2 : (F.nw <= 6 ? 1 : 0);
    var nG = F.nw >= 6 ? 2 : 4;
    /* the hub and its bolts are what the eye tracks when the wheel turns, so
       they stay a stop brighter than the tyre and a stop darker than paint */
    var truck = F.body === "truck";
    var guardT = Math.max(0.022, F.r * 0.055);
    var i, s, k, ax, tt, R;

    for (i = 0; i < F.xs.length; i++) {
      ax = F.xs[i];
      /* the axle beam and its differential, visible under the belly --
         without them the wheels hang off nothing */
      var beam = new THREE.Mesh(
        new THREE.CylinderGeometry(F.r * 0.14, F.r * 0.14, F.hy * 1.74, 8), steel);
      beam.position.set(ax, 0, F.r);
      g.add(beam);
      if (F.nw < 8) {
        var diff = new THREE.Mesh(new THREE.SphereGeometry(F.r * 0.30, 6, 4), steel);
        diff.position.set(ax, -F.hy * 0.14, F.r);
        g.add(diff);
      }

      for (s = -1; s <= 1; s += 2) {
        var wh = roadWheel(THREE, F.r, F.tw, lod, rub, tread, hubM);
        wh.position.set(ax, s * F.hy, F.r);
        g.add(wh);
        if (F.nw <= 4) {
          if (truck && F.era <= 4) {
            /* leaf pack */
            var leaf = new THREE.Mesh(
              new THREE.BoxGeometry(F.r * 1.55, F.r * 0.17, F.r * 0.13), steel);
            leaf.position.set(ax, s * F.hy * 0.70, F.r * 1.26);
            g.add(leaf);
          } else {
            var strut = new THREE.Mesh(
              new THREE.CylinderGeometry(F.r * 0.11, F.r * 0.09, F.r * 0.95, 7), steel);
            /* a cylinder's own axis is +Y -- across the vehicle. A damper
               stands on end, so it is turned a quarter about X first and
               only then leaned in toward the chassis. */
            strut.rotation.x = Math.PI / 2 + s * 0.22;
            strut.position.set(ax, s * F.hy * 0.66, F.r * 1.34);
            g.add(strut);
          }
        }
        /* the mudguard: an arch in segments, so it curves over the tyre.
           On a lorry it has to stay under the load floor. */
        R = truck ? F.r * 1.05 : F.r * 1.30;
        for (k = 0; k < nG; k++) {
          tt = Math.PI * (0.19 + 0.62 * (k + 0.5) / nG);
          var seg = new THREE.Mesh(
            new THREE.BoxGeometry(R * (nG === 2 ? 1.08 : 0.74), F.tw * 1.70, guardT), skin);
          seg.rotation.y = -(tt + Math.PI / 2);
          seg.position.set(ax + Math.cos(tt) * R, s * (F.hy + F.tw * (truck ? 0.04 : 0.12)),
                           F.r + Math.sin(tt) * R);
          g.add(seg);
        }
      }
    }
    /* a running board tying the arches together down each flank */
    if (F.xs.length >= 2) {
      var x0 = F.xs[F.xs.length - 1], x1 = F.xs[0];
      for (s = -1; s <= 1; s += 2) {
        var fend = new THREE.Mesh(
          new THREE.BoxGeometry((x1 - x0) * 0.99, F.tw * 1.32, guardT), skin);
        fend.position.set((x0 + x1) * 0.5, s * F.hy,
                          truck ? F.r * 1.34 : F.r * 2.16);
        g.add(fend);
      }
    }
    return F;
  }

  /* ------------------------------------------------------- plate helpers */
  function plate(THREE, g, m, lx, ly, lz, x, y, z, ry, rx) {
    var p = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    p.position.set(x, y, z);
    if (ry) p.rotation.y = ry;
    if (rx) p.rotation.x = rx;
    g.add(p);
    return p;
  }
  /* a plate spanning two points in the XZ profile: the length and the pitch
     both come out of the span, so the plate really joins them */
  function spanPlate(THREE, g, m, x0, z0, x1, z1, wide, thick, over) {
    var dx = x1 - x0, dz = z1 - z0;
    var len = Math.sqrt(dx * dx + dz * dz) * (over || 1.0);
    var p = new THREE.Mesh(new THREE.BoxGeometry(len, wide, thick), m);
    p.rotation.y = -Math.atan2(dz, dx);
    p.position.set((x0 + x1) * 0.5, 0, (z0 + z1) * 0.5);
    g.add(p);
    return p;
  }
  /* a riveted seam, a welded bead, or bolt-on applique -- the one detail
     that dates a hull at a glance */
  function seam(THREE, g, F, skin, dark, x0, x1, y, z, n) {
    var i, x, d;
    if (F.era <= 2) {
      for (i = 0; i < n; i++) {
        x = x0 + (x1 - x0) * ((i + 0.5) / n);
        d = new THREE.Mesh(
          new THREE.BoxGeometry(F.L * 0.011, F.L * 0.009, F.L * 0.011), dark);
        d.position.set(x, y, z);
        g.add(d);
      }
    } else if (F.era <= 5) {
      d = new THREE.Mesh(
        new THREE.BoxGeometry(Math.abs(x1 - x0), F.L * 0.006, F.L * 0.010), dark);
      d.position.set((x0 + x1) * 0.5, y, z);
      g.add(d);
    } else {
      var m = Math.max(2, n >> 1);
      for (i = 0; i < m; i++) {
        x = x0 + (x1 - x0) * ((i + 0.5) / m);
        d = new THREE.Mesh(
          new THREE.BoxGeometry(Math.abs(x1 - x0) / m * 0.86, F.L * 0.012,
                                F.L * 0.045), skin);
        d.position.set(x, y, z);
        g.add(d);
      }
    }
  }
  /* a lamp with its brush guard */
  function headLamp(THREE, g, skin, steel, glass, x, y, z, r) {
    var pot = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.86, r * 1.1, 10), steel);
    pot.rotation.z = Math.PI / 2;
    pot.position.set(x - r * 0.4, y, z);
    g.add(pot);
    var lens = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.86, r * 0.86, r * 0.22, 10), glass);
    lens.rotation.z = Math.PI / 2;
    lens.position.set(x + r * 0.2, y, z);
    g.add(lens);
    var i;
    for (i = 0; i < 2; i++) {
      var bar = new THREE.Mesh(
        new THREE.BoxGeometry(r * 0.16, r * 0.10, r * 2.5), steel);
      bar.rotation.x = i ? 1.05 : -1.05;
      bar.position.set(x + r * 0.26, y, z);
      g.add(bar);
    }
  }
  /* a spare wheel on a bracket. NOT named roadwheel -- it does not turn. */
  function spareWheel(THREE, g, r, w, rub, tread, steel, x, y, z, flat) {
    var t = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.93, r * 0.93, w, 12), rub);
    var b = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w * 0.72, 12), tread);
    var h = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.42, r * 0.42, w * 1.06, 8), steel);
    var k = new THREE.Mesh(new THREE.BoxGeometry(r * 0.22, w * 1.5, r * 1.7), steel);
    var i, ms = [t, b, h];
    for (i = 0; i < 3; i++) {
      if (flat) ms[i].rotation.x = Math.PI / 2;
      ms[i].position.set(x, y, z);
      g.add(ms[i]);
    }
    k.position.set(x - r * 0.3, y, z);
    if (flat) { k.rotation.x = Math.PI / 2; k.position.set(x, y, z - r * 0.2); }
    g.add(k);
  }

  /* ============================================ armoured monocoque body */
  /* A faceted hull: a floor, two lower flanks tucked in under the
     beltline, two upper flanks raked back in above it, a bow that slopes
     in both planes, a rear plate and a roof. It is the plate ANGLES that
     read as armour -- a smooth loaf reads as a bar of soap. */
  function armouredHull(THREE, g, P, L, W, skin, F, o) {
    var dark = mat(THREE, 0x111417, 0.92, 0.10);
    var t = Math.max(0.045, L * 0.016);
    /* inboard of the tyres, so the running gear shows beside the hull */
    var hb = Math.max(W * 0.30, W * 0.5 - F.tw * 0.62);
    var zb = F.base, zr = F.roof, zm = F.belt;
    var lowH = Math.max(0.14, zm - zb), upH = Math.max(0.14, zr - zm);
    var nose = L * 0.5, tail = -L * 0.5;
    var bowRun = L * o.bow;                 /* how far back the bow rake goes */
    var bodyF = nose - bowRun;
    var bodyB = tail + L * 0.045;
    var hwB = hb * 0.84, hwM = hb, hwR = hb * o.top;
    var a1 = Math.atan2(hwM - hwB, lowH);
    var a2 = Math.atan2(hwM - hwR, upH);
    var s, i;

    /* belly */
    plate(THREE, g, skin, L * 0.94, hwB * 2, t, -L * 0.01, 0, zb + t * 0.5);
    /* lower flanks, leaning outward as they rise */
    for (s = -1; s <= 1; s += 2) {
      plate(THREE, g, skin, bodyF - bodyB, t, lowH / Math.cos(a1) * 1.04,
            (bodyF + bodyB) * 0.5, s * (hwB + hwM) * 0.5, (zb + zm) * 0.5,
            0, -s * a1);
      plate(THREE, g, skin, bodyF - bodyB, t, upH / Math.cos(a2) * 1.04,
            (bodyF + bodyB) * 0.5, s * (hwM + hwR) * 0.5, (zm + zr) * 0.5,
            0, s * a2);
    }
    /* roof */
    plate(THREE, g, skin, bodyF - bodyB + bowRun * 0.30, hwR * 2, t,
          (bodyF + bodyB) * 0.5 + bowRun * 0.15, 0, zr - t * 0.5);
    /* the bow, in two plates: the lower one rakes forward off the belly,
       the glacis rakes back up to the roof */
    spanPlate(THREE, g, skin, bodyF - L * 0.01, zb, nose - t * 0.6, zm, hwB * 1.95, t, 1.01);
    var gx = nose - bowRun * o.glacis;
    spanPlate(THREE, g, skin, nose - t * 0.6, zm, gx, zr, hwM * 1.92, t, 1.02);
    spanPlate(THREE, g, skin, bodyF - L * 0.02, zb, nose - t * 0.6,
              zb + lowH * 0.34, hwB * 1.90, t, 1.02);
    /* bow cheeks: the plan-view taper that makes a boat hull a boat */
    if (o.cheek > 0.01) {
      var cz = (zm + zr) * 0.5;
      for (s = -1; s <= 1; s += 2) {
        var ch = new THREE.Mesh(
          new THREE.BoxGeometry(bowRun * 1.05, t, (zr - zm) * 1.05), skin);
        ch.rotation.z = -s * o.cheek;
        ch.position.set(nose - bowRun * 0.5, s * hwM * 0.72, cz);
        g.add(ch);
        var cl = new THREE.Mesh(
          new THREE.BoxGeometry(bowRun * 1.05, t, (zm - zb) * 1.05), skin);
        cl.rotation.z = -s * o.cheek * 0.7;
        cl.position.set(nose - bowRun * 0.5, s * hwB * 0.74, (zb + zm) * 0.5);
        g.add(cl);
      }
    }
    /* rear plate, raked in a little */
    spanPlate(THREE, g, skin, bodyB, zb, tail, zr * 0.98, hwM * 1.92, t, 1.04);
    return { hwB: hwB, hwM: hwM, hwR: hwR, bodyF: bodyF, bodyB: bodyB,
             gx: gx, t: t, dark: dark };
  }

  /* the fittings that turn a faceted box into a vehicle */
  function armourDetail(THREE, g, P, L, W, skin, F, H, o) {
    var dark = mat(THREE, 0x101315, 0.93, 0.09);
    var steel = mat(THREE, 0x1b1f22, 0.64, 0.42);
    var glass = glassOf(THREE);
    var rub = mat(THREE, 0x141618, 0.95, 0.02);
    var tread = mat(THREE, 0x0d0e10, 0.97, 0.02);
    var zr = F.roof, zm = F.belt, zb = F.base;
    var nose = L * 0.5, tail = -L * 0.5;
    var s, i, x;

    /* the driver's vision block, let into the glacis and offset to one side */
    var vx = (nose + H.gx) * 0.5, vz = (zm + zr) * 0.5 + (zr - zm) * 0.12;
    for (s = -1; s <= 1; s += 2) {
      var vb = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.055, W * 0.15, (zr - zm) * 0.34), skin);
      vb.position.set(vx, s * W * 0.17, vz);
      g.add(vb);
      var vg = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.016, W * 0.125, (zr - zm) * 0.24),
        F.era >= 4 ? glass : dark);
      vg.position.set(vx + L * 0.028, s * W * 0.17, vz);
      g.add(vg);
    }
    /* periscopes on the roof ahead of the turret ring */
    for (s = -1; s <= 1; s += 2) {
      var pr = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.030, W * 0.07, L * 0.022), dark);
      pr.position.set(H.gx - L * 0.04, s * W * 0.16, zr + L * 0.012);
      g.add(pr);
    }
    /* vision blocks or firing ports down each flank */
    var nP = o.ports, px0 = H.bodyF - L * 0.10, px1 = H.bodyB + L * 0.08;
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < nP; i++) {
        x = px0 + (px1 - px0) * ((i + 0.5) / nP);
        var pf = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.048, L * 0.020, (zr - zm) * 0.36), skin);
        pf.position.set(x, s * H.hwM * 0.97, (zm + zr) * 0.52);
        g.add(pf);
        var pp = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.030, L * 0.016, (zr - zm) * 0.24),
          i % 2 && F.era >= 3 ? glass : dark);
        pp.position.set(x, s * H.hwM * 1.02, (zm + zr) * 0.52);
        g.add(pp);
      }
      /* grab rail down the flank */
      var gr = new THREE.Mesh(
        new THREE.BoxGeometry((px1 - px0) * 0.72, L * 0.007, L * 0.007), dark);
      gr.position.set((px0 + px1) * 0.5, s * H.hwM * 1.02, zm + (zr - zm) * 0.86);
      g.add(gr);
    }
    /* seams: rivets early, a weld bead in the middle years, applique later */
    for (s = -1; s <= 1; s += 2)
      seam(THREE, g, F, skin, dark, px0, px1, s * H.hwM * 1.01, zm + L * 0.006, 7);

    /* the rear door -- two leaves, hinges and a handle */
    var dw = H.hwM * (o.doors > 1 ? 0.80 : 1.40);
    for (i = 0; i < o.doors; i++) {
      var sy = o.doors > 1 ? (i ? 1 : -1) : 0;
      var dr = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.020, dw, (zr - zb) * 0.62), skin);
      dr.position.set(tail + L * 0.020, sy * H.hwM * 0.46, zb + (zr - zb) * 0.40);
      g.add(dr);
      var hd = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.026, L * 0.030, L * 0.030), steel);
      hd.position.set(tail + L * 0.034, sy * H.hwM * 0.46 + (o.doors > 1 ? -sy * dw * 0.36 : dw * 0.34),
                      zb + (zr - zb) * 0.42);
      g.add(hd);
      var vp = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.014, dw * 0.34, (zr - zb) * 0.14),
        F.era >= 4 ? glass : dark);
      vp.position.set(tail + L * 0.032, sy * H.hwM * 0.46, zb + (zr - zb) * 0.60);
      g.add(vp);
    }
    /* tail lamps and a towing pintle */
    for (s = -1; s <= 1; s += 2) {
      var tl = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.020, L * 0.026, L * 0.026), dark);
      tl.position.set(tail + L * 0.012, s * H.hwM * 0.86, zb + (zr - zb) * 0.70);
      g.add(tl);
    }
    var pt = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.014, L * 0.014, L * 0.05, 8), steel);
    pt.rotation.z = Math.PI / 2;
    pt.position.set(tail - L * 0.012, 0, zb + (zr - zb) * 0.16);
    g.add(pt);

    /* roof hatches */
    var hr = Math.min(W * 0.115, L * 0.075);
    roofHatch(THREE, g, skin, dark, H.gx - L * 0.05, W * 0.20, zr, hr);
    if (o.hatches > 1)
      roofHatch(THREE, g, skin, dark, tail + L * 0.24, -W * 0.16, zr, hr * 0.94);
    if (o.hatches > 2 && F.nw < 8)
      roofHatch(THREE, g, skin, dark, tail + L * 0.24, W * 0.18, zr, hr * 0.94);

    /* headlamps in the bow, shrouded from the eighties on */
    var lr = Math.min(L * 0.024, W * 0.055);
    for (s = -1; s <= 1; s += 2)
      headLamp(THREE, g, skin, steel, glass,
               nose - L * 0.03, s * H.hwM * 0.68, zm + (zr - zm) * 0.30, lr);

    /* stowage bins on the flanks */
    for (s = -1; s <= 1; s += 2) {
      var bn = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.20, L * 0.026, (zr - zm) * 0.52), skin);
      bn.position.set(tail + L * 0.30, s * (H.hwM + L * 0.011), zm + (zr - zm) * 0.44);
      g.add(bn);
      if (F.nw < 8) {
        var bl = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.20, L * 0.010, L * 0.010), dark);
        bl.position.set(tail + L * 0.30, s * (H.hwM + L * 0.022), zm + (zr - zm) * 0.62);
        g.add(bl);
      }
    }
    /* the spare wheel on the hull side -- an armoured car's own signature */
    if (o.spare)
      spareWheel(THREE, g, F.r * 0.86, F.tw * 0.9, rub, tread, steel,
                 tail + L * 0.16, -(H.hwM + F.tw * 0.6), zm + (zr - zm) * 0.55, false);
    /* jerricans and towing shackles: a scout car lives off what is
       strapped to the outside of it */
    if (o.kit) {
      for (i = 0; i < 2; i++) {
        var jc = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.055, L * 0.030, (zr - zm) * 0.44), dark);
        jc.position.set(tail + L * (0.09 + i * 0.075), H.hwM * 0.62,
                        zr + (zr - zm) * 0.20);
        g.add(jc);
      }
      for (s = -1; s <= 1; s += 2) {
        var shk = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.010, L * 0.010, L * 0.030, 8), steel);
        shk.rotation.z = Math.PI / 2;
        shk.position.set(nose - L * 0.012, s * H.hwB * 0.62, zb + (zm - zb) * 0.42);
        g.add(shk);
      }
    }
    /* exhaust down one flank */
    var ex = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.019, L * 0.019, L * 0.26, 8),
      mat(THREE, 0x16140f, 0.95, 0.12));
    ex.rotation.z = Math.PI / 2;
    ex.position.set(tail + L * 0.16, H.hwM * 0.90, zm - (zm - zb) * 0.30);
    g.add(ex);
    /* aerials */
    for (i = 0; i < 2; i++) {
      var bs = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.016, L * 0.018, L * 0.020, 8), dark);
      bs.rotation.x = Math.PI / 2;
      bs.position.set(tail + L * (0.16 + i * 0.10), (i ? 1 : -1) * H.hwR * 0.80, zr + L * 0.010);
      g.add(bs);
      /* a whip stands UP: turned a quarter about X off the cylinder's own
         +Y axis, then raked back a little */
      var mL = Math.min(L * 0.075, 0.46) * (1 + i * 0.22);
      var mst = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.0035, L * 0.006, mL, 5), dark);
      mst.rotation.x = Math.PI / 2;
      mst.rotation.z = (i ? 1 : -1) * 0.10;
      mst.position.set(tail + L * (0.16 + i * 0.10), (i ? 1 : -1) * H.hwR * 0.80,
                       zr + mL * 0.50);
      g.add(mst);
    }
    /* slat cages went onto wheeled hulls after 2003 */
    if (F.era >= 6 && !hasEx(P, "slat") && P.role !== "spaag" && P.role !== "radarv") {
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i < (F.nw >= 8 ? 3 : 4); i++) {
          var sl = new THREE.Mesh(
            new THREE.BoxGeometry((px1 - px0) * 0.86, L * 0.008, L * 0.009), dark);
          sl.position.set((px0 + px1) * 0.5, s * (H.hwM + L * 0.036),
                          zm + (zr - zm) * (0.18 + i * 0.24));
          g.add(sl);
        }
        for (i = 0; i < 2; i++) {
          var sp = new THREE.Mesh(
            new THREE.BoxGeometry(L * 0.010, L * 0.048, (zr - zm) * 0.80), dark);
          sp.position.set(px0 - (px1 - px0) * (i ? 0.40 : -0.40),
                          s * (H.hwM + L * 0.019), zm + (zr - zm) * 0.50);
          g.add(sp);
        }
      }
    }
  }

  /* ==================================================== the lorry chassis */
  function truckBody(THREE, M, g, P, L, W, skin, F) {
    var dark = mat(THREE, 0x101315, 0.93, 0.09);
    var steel = mat(THREE, 0x1b1f22, 0.64, 0.42);
    var soot = mat(THREE, 0x16140f, 0.95, 0.12);
    var glass = glassOf(THREE);
    var rub = mat(THREE, 0x141618, 0.95, 0.02);
    var tread = mat(THREE, 0x0d0e10, 0.97, 0.02);
    var nose = L * 0.5, tail = -L * 0.5;
    var railHW = Math.max(W * 0.14, W * 0.5 - F.tw * 1.9);
    var t = Math.max(0.04, L * 0.014);
    var s, i, x;

    /* ---- the chassis: two rails the whole length, and its crossmembers.
       This is the part that was missing entirely: with no rail between the
       wheels the body appeared to hover. */
    for (s = -1; s <= 1; s += 2) {
      var rail = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.96, F.railT * 0.55, F.railT), steel);
      rail.position.set(-L * 0.005, s * railHW, F.railZ);
      g.add(rail);
    }
    var nX = F.nw >= 8 ? 3 : 4;
    for (i = 0; i < nX; i++) {
      x = -L * 0.40 + (L * 0.80) * (i / (nX - 1));
      var cm = new THREE.Mesh(
        new THREE.BoxGeometry(F.railT * 0.5, railHW * 1.9, F.railT * 0.72), steel);
      cm.position.set(x, 0, F.railZ);
      g.add(cm);
    }
    /* propshaft */
    if (F.nw < 8) {
      var ps = new THREE.Mesh(
        new THREE.CylinderGeometry(F.r * 0.055, F.r * 0.055, L * 0.52, 6), steel);
      ps.rotation.z = Math.PI / 2;
      ps.position.set(-L * 0.05, 0, F.railZ - F.railT * 0.30);
      g.add(ps);
    }

    /* ---- the front: bumper, grille, lamps ---- */
    var frontZ = F.bedZ + F.cabH * (F.cabOver ? 0.50 : 0.24);
    var iron = mat(THREE, 0x191d20, 0.80, 0.18);
    var bump = new THREE.Mesh(
      new THREE.BoxGeometry(L * 0.020, W * 0.82, Math.max(0.08, L * 0.024)), skin);
    bump.position.set(nose - L * 0.004, 0, F.railZ + F.railT * 0.2);
    g.add(bump);
    for (s = -1; s <= 1; s += 2) {
      var te = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.040, L * 0.018, L * 0.024), skin);
      te.position.set(nose - L * 0.015, s * W * 0.22, F.railZ + F.railT * 0.2);
      g.add(te);
    }

    var cabFrontZ0 = F.railZ + F.railT * 0.4;
    if (!F.cabOver) {
      /* a bonnet ahead of the screen, with the radiator under its nose */
      var bl = F.bonnet, bz0 = F.bedZ + F.cabH * 0.06, bz1 = F.bedZ + F.cabH * 0.42;
      var bhw = W * 0.5 * 0.62;
      plate(THREE, g, skin, bl * 0.94, bhw * 2, t, nose - bl * 0.5, 0, bz1);
      for (s = -1; s <= 1; s += 2)
        plate(THREE, g, skin, bl * 0.94, t, (bz1 - bz0) * 1.10,
              nose - bl * 0.5, s * bhw, (bz0 + bz1) * 0.5, 0, s * 0.14);
      /* the grille and its shell */
      var grl = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.018, bhw * 1.80, (bz1 - bz0) * 0.98), dark);
      grl.position.set(nose - bl * 0.04, 0, (bz0 + bz1) * 0.5);
      g.add(grl);
      for (i = 0; i < 4; i++) {
        var sv = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.020, bhw * 1.84, (bz1 - bz0) * 0.075), steel);
        sv.position.set(nose - bl * 0.04, 0, bz0 + (bz1 - bz0) * (0.18 + i * 0.22));
        g.add(sv);
      }
      var lampZ = (bz0 + bz1) * 0.5 + (bz1 - bz0) * 0.24;
      var lampY = bhw * 1.20;
      var lr = Math.min(L * 0.022, W * 0.052);
      for (s = -1; s <= 1; s += 2) {
        headLamp(THREE, g, skin, steel, glass, nose - bl * 0.16, s * lampY, lampZ, lr);
        var stk = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.008, L * 0.008, lr * 1.2, 6), steel);
        stk.rotation.x = Math.PI / 2;
        stk.position.set(nose - bl * 0.18, s * (lampY - lr * 0.6), lampZ);
        g.add(stk);
      }
      /* wing panels either side of the bonnet */
      for (s = -1; s <= 1; s += 2)
        plate(THREE, g, skin, bl * 0.80, W * 0.5 - bhw, t * 1.2,
              nose - bl * 0.52, s * (bhw + (W * 0.5 - bhw) * 0.5), bz0 + (bz1 - bz0) * 0.36);
      cabFrontZ0 = bz1;
    } else {
      /* forward control: the screen is the front of the vehicle */
      var fhw = W * 0.5 * 0.94;
      plate(THREE, g, skin, t * 1.4, fhw * 2, F.cabH * 0.40,
            nose - t, 0, F.bedZ + F.cabH * 0.22);
      var lr2 = Math.min(L * 0.018, W * 0.048);
      for (s = -1; s <= 1; s += 2)
        headLamp(THREE, g, skin, steel, glass, nose - L * 0.006, s * fhw * 0.68,
                 F.bedZ + F.cabH * 0.13, lr2);
      for (i = 0; i < 3; i++) {
        var lv = new THREE.Mesh(
          new THREE.BoxGeometry(L * 0.012, fhw * 1.0, F.cabH * 0.045), dark);
        lv.position.set(nose - t * 0.2, 0, F.bedZ + F.cabH * (0.30 + i * 0.055));
        g.add(lv);
      }
    }

    /* ---- the cab ---- */
    var chw = W * 0.5 * 0.93;
    var cz0 = F.bedZ, cz1 = F.roof;
    var glz0 = F.bedZ + F.cabH * (F.cabOver ? 0.44 : 0.46);
    var open = F.jeep && F.era <= 3;      /* a fifties jeep has no hard top */
    /* cab floor and back panel */
    plate(THREE, g, skin, F.cabLen, chw * 2, t, (F.cabF + F.cabB) * 0.5, 0, cz0 + t * 0.5);
    plate(THREE, g, skin, t * 1.3, chw * 2, F.cabH, F.cabB + t, 0, (cz0 + cz1) * 0.5);
    /* lower cab sides and doors */
    for (s = -1; s <= 1; s += 2) {
      plate(THREE, g, skin, F.cabLen, t, (glz0 - cz0),
            (F.cabF + F.cabB) * 0.5, s * chw, (cz0 + glz0) * 0.5);
      var dl = new THREE.Mesh(
        new THREE.BoxGeometry(F.cabLen * 0.60, t * 0.9, (glz0 - cz0) * 0.86), skin);
      dl.position.set((F.cabF + F.cabB) * 0.5 - F.cabLen * 0.06, s * (chw + t * 0.6),
                      (cz0 + glz0) * 0.5);
      g.add(dl);
      var hnd = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.030, L * 0.014, L * 0.012), dark);
      hnd.position.set((F.cabF + F.cabB) * 0.5 - F.cabLen * 0.24, s * (chw + t * 1.1),
                       (cz0 + glz0) * 0.5 + (glz0 - cz0) * 0.22);
      g.add(hnd);
      /* the step under the door */
      var st = new THREE.Mesh(
        new THREE.BoxGeometry(F.cabLen * 0.38, F.tw * 0.95, t * 1.1), skin);
      st.position.set((F.cabF + F.cabB) * 0.5 - F.cabLen * 0.10, s * (chw + F.tw * 0.35),
                      cz0 - (cz0 - F.railZ) * 0.55);
      g.add(st);
      var sh = new THREE.Mesh(
        new THREE.BoxGeometry(t, t, (cz0 - F.railZ) * 0.8), skin);
      sh.position.set((F.cabF + F.cabB) * 0.5 - F.cabLen * 0.10, s * (chw + F.tw * 0.6),
                      cz0 - (cz0 - F.railZ) * 0.30);
      g.add(sh);
    }
    if (!open) {
      /* roof, screen header, pillars and glass */
      plate(THREE, g, skin, F.cabLen * 1.02, chw * 2 * 1.01, t,
            (F.cabF + F.cabB) * 0.5, 0, cz1 - t * 0.5);
      for (s = -1; s <= 1; s += 2) {
        plate(THREE, g, skin, F.cabLen, t, (cz1 - glz0) * 0.20,
              (F.cabF + F.cabB) * 0.5, s * chw, cz1 - (cz1 - glz0) * 0.10);
        /* A pillar */
        var ap = new THREE.Mesh(
          new THREE.BoxGeometry(t * 2.4, t * 1.6, (cz1 - glz0) * 1.02), skin);
        ap.position.set(F.cabF - t, s * chw * 0.96, (glz0 + cz1) * 0.5);
        g.add(ap);
        /* side glass */
        var sg = new THREE.Mesh(
          new THREE.BoxGeometry(F.cabLen * 0.70, t * 0.5, (cz1 - glz0) * 0.76), glass);
        sg.position.set((F.cabF + F.cabB) * 0.5 - F.cabLen * 0.04, s * chw,
                        (glz0 + cz1) * 0.5 - (cz1 - glz0) * 0.06);
        g.add(sg);
        /* the B pillar between door glass and quarter light */
        var bp = new THREE.Mesh(
          new THREE.BoxGeometry(t * 1.6, t * 1.4, (cz1 - glz0) * 0.92), skin);
        bp.position.set((F.cabF + F.cabB) * 0.5 - F.cabLen * 0.20, s * chw,
                        (glz0 + cz1) * 0.5);
        g.add(bp);
        /* mirror */
        var ma = new THREE.Mesh(
          new THREE.BoxGeometry(t, W * 0.070, t), steel);
        ma.position.set(F.cabF - L * 0.012, s * (chw + W * 0.035), cz1 - (cz1 - glz0) * 0.30);
        g.add(ma);
        var mg = new THREE.Mesh(
          new THREE.BoxGeometry(t * 1.2, Math.min(L * 0.020, W * 0.045),
                                (cz1 - glz0) * 0.42), dark);
        mg.position.set(F.cabF - L * 0.012, s * (chw + W * 0.068),
                        cz1 - (cz1 - glz0) * 0.42);
        g.add(mg);
      }
    }
    /* the windscreen: raked back on a bonneted lorry, near upright on a
       forward-control cab */
    var wsRake = F.cabOver ? 0.16 : 0.30;
    var wsTop = open ? cz0 + F.cabH * 0.86 : cz1 - t;
    var ws = new THREE.Mesh(
      new THREE.BoxGeometry(t * 1.1, chw * 1.88, (wsTop - glz0) / Math.cos(wsRake)), glass);
    ws.rotation.y = -wsRake;
    ws.position.set(F.cabF - (wsTop - glz0) * Math.tan(wsRake) * 0.5, 0,
                    (glz0 + wsTop) * 0.5);
    g.add(ws);
    var wsf = new THREE.Mesh(
      new THREE.BoxGeometry(t * 2.0, chw * 1.96, t * 2.2), skin);
    wsf.position.set(F.cabF - (wsTop - glz0) * Math.tan(wsRake), 0, wsTop - t);
    g.add(wsf);
    /* the centre division and the two wipers: a screen without them is a
       painted panel with the light on it */
    var wsm = new THREE.Mesh(
      new THREE.BoxGeometry(t * 1.9, t * 1.5, (wsTop - glz0) / Math.cos(wsRake)), skin);
    wsm.rotation.y = -wsRake;
    wsm.position.set(F.cabF - (wsTop - glz0) * Math.tan(wsRake) * 0.5, 0,
                     (glz0 + wsTop) * 0.5);
    g.add(wsm);
    for (s = -1; s <= 1; s += 2) {
      var wip = new THREE.Mesh(
        new THREE.BoxGeometry(t * 0.7, chw * 0.62, t * 0.7), dark);
      wip.rotation.x = s * 0.35;
      wip.position.set(F.cabF - (wsTop - glz0) * Math.tan(wsRake) * 0.92 - t,
                       s * chw * 0.46, glz0 + (wsTop - glz0) * 0.18);
      g.add(wip);
    }
    if (open) {
      for (s = -1; s <= 1; s += 2) {
        var wp = new THREE.Mesh(
          new THREE.BoxGeometry(t * 1.6, t * 1.6, (wsTop - glz0) * 1.05), skin);
        wp.rotation.y = -wsRake;
        wp.position.set(F.cabF - (wsTop - glz0) * Math.tan(wsRake) * 0.5, s * chw * 0.94,
                        (glz0 + wsTop) * 0.5);
        g.add(wp);
      }
    }
    /* exhaust stack */
    if (F.cabOver || L > 7) {
      var stkR = Math.min(L * 0.014, W * 0.035);
      var st2 = new THREE.Mesh(
        new THREE.CylinderGeometry(stkR, stkR, F.cabH * 0.92, 8), soot);
      st2.rotation.x = Math.PI / 2;
      st2.position.set(F.cabB + L * 0.010, chw + stkR * 1.3, cz0 + F.cabH * 0.50);
      g.add(st2);
      var stc = new THREE.Mesh(
        new THREE.CylinderGeometry(stkR * 1.4, stkR * 1.15, L * 0.030, 8), soot);
      stc.rotation.x = Math.PI / 2;
      stc.position.set(F.cabB + L * 0.010, chw + stkR * 1.3, cz0 + F.cabH * 0.98);
      g.add(stc);
    } else {
      var ex2 = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.015, L * 0.015, L * 0.34, 6), soot);
      ex2.rotation.z = Math.PI / 2;
      ex2.position.set(-L * 0.05, -railHW * 1.2, F.railZ - F.railT * 0.6);
      g.add(ex2);
    }

    /* ---- the load bed ---- */
    var bl2 = F.bedF - F.bedB, bcx = (F.bedF + F.bedB) * 0.5;
    var bhw2 = F.bedHW;
    var sideH = Math.max(L * 0.045, Math.min(F.cabH * 0.42, W * 0.30));
    plate(THREE, g, skin, bl2, bhw2 * 2, t * 1.3, bcx, 0, F.bedZ + t * 0.65);
    /* dropside panels, tailgate and headboard */
    for (s = -1; s <= 1; s += 2) {
      plate(THREE, g, skin, bl2, t * 1.2, sideH, bcx, s * bhw2, F.bedZ + sideH * 0.5 + t);
      /* the rub rail along the top of the dropside */
      var rr = new THREE.Mesh(
        new THREE.BoxGeometry(bl2, t * 2.2, t * 1.6), skin);
      rr.position.set(bcx, s * bhw2, F.bedZ + sideH + t);
      g.add(rr);
      /* stake posts */
      var nSt = F.nw >= 6 ? 3 : 4;
      for (i = 0; i < nSt; i++) {
        var sp2 = new THREE.Mesh(
          new THREE.BoxGeometry(t * 2.0, t * 2.2, sideH * 1.04), skin);
        sp2.position.set(F.bedB + bl2 * (0.12 + i * (0.76 / (nSt - 1))),
                         s * bhw2, F.bedZ + sideH * 0.5 + t);
        g.add(sp2);
      }
    }
    plate(THREE, g, skin, t * 1.4, bhw2 * 2, sideH, F.bedB + t, 0, F.bedZ + sideH * 0.5 + t);
    plate(THREE, g, skin, t * 1.4, bhw2 * 2, sideH * 1.25, F.bedF - t, 0,
          F.bedZ + sideH * 0.62 + t);

    /* fuel tank and spare wheel slung under the bed */
    var ft = new THREE.Mesh(
      new THREE.CylinderGeometry(F.r * 0.44, F.r * 0.44, bl2 * 0.30, 10), steel);
    ft.rotation.z = Math.PI / 2;
    ft.position.set(bcx + bl2 * 0.16, railHW + F.r * 0.5, F.railZ + F.railT * 0.1);
    g.add(ft);
    for (i = 0; i < 2; i++) {
      var bd = new THREE.Mesh(
        new THREE.BoxGeometry(t * 1.4, F.r * 1.0, F.r * 1.0), steel);
      bd.position.set(bcx + bl2 * (0.06 + i * 0.20), railHW + F.r * 0.5, F.railZ + F.railT * 0.1);
      g.add(bd);
    }
    spareWheel(THREE, g, F.r * 0.88, F.tw * 0.92, rub, tread, steel,
               bcx - bl2 * 0.10, -(railHW + F.r * 0.45), F.railZ - F.r * 0.10, true);
    /* toolbox on the other flank */
    if (F.nw < 8) {
      var tb = new THREE.Mesh(
        new THREE.BoxGeometry(bl2 * 0.20, F.r * 0.55, F.r * 0.70), skin);
      tb.position.set(bcx - bl2 * 0.30, railHW + F.r * 0.34, F.railZ + F.railT * 0.1);
      g.add(tb);
    }
    if (F.jeep) {
      spareWheel(THREE, g, F.r * 0.92, F.tw * 0.95, rub, tread, steel,
                 F.bedB - F.r * 0.30, 0, F.bedZ + F.r * 0.85, false);
      for (i = 0; i < 2; i++) {
        var jc2 = new THREE.Mesh(
          new THREE.BoxGeometry(bl2 * 0.16, F.r * 0.34, sideH * 0.80), dark);
        jc2.position.set(F.bedB + bl2 * 0.14, (i ? 1 : -1) * bhw2 * 0.62,
                         F.bedZ + sideH * 0.46);
        g.add(jc2);
      }
    }
    /* mud flaps behind the last axle */
    for (s = -1; s <= 1; s += 2) {
      var mf = new THREE.Mesh(
        new THREE.BoxGeometry(t, F.tw * 1.4, F.r * 0.62), iron);
      mf.position.set(F.xs[F.xs.length - 1] - F.r * 1.15, s * F.hy, F.r * 0.55);
      g.add(mf);
      var tl2 = new THREE.Mesh(
        new THREE.BoxGeometry(t * 1.6, L * 0.026, L * 0.026), dark);
      tl2.position.set(F.bedB, s * bhw2 * 0.86, F.bedZ + sideH * 0.30);
      g.add(tl2);
    }
    return { bedZ: F.bedZ + t * 1.3, bedX: bcx, bedHW: bhw2 * 0.94,
             bedLen: bl2 * 0.94, sideH: sideH, dark: dark, steel: steel };
  }

  /* ------------------------------------------------------- mission loads */
  /* the tarpaulined cargo of a supply lorry */
  function cargoLoad(THREE, g, P, L, W, skin, B) {
    var dark = mat(THREE, 0x1a1a14, 0.95, 0.04);
    var h = Math.min(B.bedHW * 1.15, W * 0.62);
    var i;
    var tarp = new THREE.Mesh(
      new THREE.CylinderGeometry(h * 0.5, h * 0.5, B.bedLen * 0.92, 12), skin);
    tarp.rotation.z = Math.PI / 2;
    tarp.rotation.x = Math.PI / 2;
    tarp.position.set(B.bedX, 0, B.bedZ + B.sideH * 0.9);
    g.add(tarp);
    var side = new THREE.Mesh(
      new THREE.BoxGeometry(B.bedLen * 0.92, h * 1.0, B.sideH * 0.9), skin);
    side.position.set(B.bedX, 0, B.bedZ + B.sideH * 0.45);
    g.add(side);
    for (i = 0; i < 5; i++) {
      var hoop = new THREE.Mesh(
        new THREE.TorusGeometry(h * 0.5, L * 0.006, 4, 10, Math.PI), dark);
      hoop.rotation.y = Math.PI / 2;
      hoop.position.set(B.bedX - B.bedLen * 0.42 + B.bedLen * 0.21 * i, 0,
                        B.bedZ + B.sideH * 0.9);
      g.add(hoop);
    }
    for (i = 0; i < 3; i++) {
      var cr = new THREE.Mesh(
        new THREE.BoxGeometry(B.bedLen * 0.16, B.bedHW * 0.7, B.sideH * 0.55),
        mat(THREE, 0x2c2718, 0.94, 0.03));
      cr.position.set(B.bedX - B.bedLen * 0.36, (i - 1) * B.bedHW * 0.72,
                      B.bedZ + B.sideH * 0.30);
      g.add(cr);
    }
  }

  /* a counter-battery radar: the panel, its raising frame and the plant */
  function radarLoad(THREE, g, P, L, W, skin, B, F) {
    var dark = mat(THREE, 0x101315, 0.93, 0.09);
    var steel = mat(THREE, 0x1b1f22, 0.64, 0.42);
    var h = P.height || L * 0.5;
    var i, s;
    /* the operator shelter forward on the bed */
    var sh = new THREE.Mesh(
      new THREE.BoxGeometry(B.bedLen * 0.34, B.bedHW * 1.86, B.sideH * 1.9), skin);
    sh.position.set(B.bedX + B.bedLen * 0.31, 0, B.bedZ + B.sideH * 0.95);
    g.add(sh);
    for (s = -1; s <= 1; s += 2) {
      var vent = new THREE.Mesh(
        new THREE.BoxGeometry(B.bedLen * 0.10, L * 0.014, B.sideH * 0.9), dark);
      vent.position.set(B.bedX + B.bedLen * 0.22, s * B.bedHW * 0.94, B.bedZ + B.sideH * 1.0);
      g.add(vent);
    }
    /* generator set aft of it */
    var gen = new THREE.Mesh(
      new THREE.BoxGeometry(B.bedLen * 0.18, B.bedHW * 1.3, B.sideH * 1.2), skin);
    gen.position.set(B.bedX + B.bedLen * 0.06, 0, B.bedZ + B.sideH * 0.6);
    g.add(gen);
    /* the turntable and the two trunnion posts */
    var tt = new THREE.Mesh(
      new THREE.CylinderGeometry(B.bedHW * 0.62, B.bedHW * 0.70, B.sideH * 0.42, 12), steel);
    tt.rotation.x = Math.PI / 2;
    tt.position.set(B.bedX - B.bedLen * 0.24, 0, B.bedZ + B.sideH * 0.21);
    g.add(tt);
    var arrH = Math.max(L * 0.20, h - (B.bedZ + B.sideH * 0.42) - L * 0.05);
    for (s = -1; s <= 1; s += 2) {
      var post = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.028, L * 0.030, arrH * 0.52), steel);
      post.position.set(B.bedX - B.bedLen * 0.24, s * B.bedHW * 0.66,
                        B.bedZ + B.sideH * 0.42 + arrH * 0.26);
      g.add(post);
      var ram = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.012, L * 0.012, arrH * 0.55, 7), steel);
      ram.rotation.z = Math.PI / 2;
      ram.rotation.y = -0.85;
      ram.position.set(B.bedX - B.bedLen * 0.06, s * B.bedHW * 0.50,
                       B.bedZ + B.sideH * 0.42 + arrH * 0.25);
      g.add(ram);
    }
    /* the array itself, raked back, with its frame and radiating facets */
    var arr = new THREE.Group();
    arr.rotation.y = 0.42;
    arr.position.set(B.bedX - B.bedLen * 0.24, 0, B.bedZ + B.sideH * 0.42 + arrH * 0.52);
    var face = new THREE.Mesh(
      new THREE.BoxGeometry(L * 0.045, B.bedHW * 1.84, arrH * 0.94),
      mat(THREE, 0x1d2126, 0.72, 0.28));
    arr.add(face);
    for (i = 0; i < 5; i++) {
      var row = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.016, B.bedHW * 1.70, arrH * 0.13), dark);
      row.position.set(L * 0.030, 0, (i - 2) * arrH * 0.18);
      arr.add(row);
    }
    for (s = -1; s <= 1; s += 2) {
      var edge = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.055, L * 0.030, arrH * 1.00), skin);
      edge.position.set(0, s * B.bedHW * 0.94, 0);
      arr.add(edge);
    }
    var cap = new THREE.Mesh(
      new THREE.BoxGeometry(L * 0.055, B.bedHW * 1.94, L * 0.030), skin);
    cap.position.set(0, 0, arrH * 0.48);
    arr.add(cap);
    g.add(arr);
  }

  /* the rocket pack, on its cradle. It is the vehicle's whole identity, so
     it is sized to the bed it stands on and to whatever height the spec row
     has left above the bed. */
  function rocketPack(THREE, g, P, L, W, skin, mnt) {
    var pack = new THREE.Group();
    pack.name = "turret";
    var tube = skin;
    var steel = mat(THREE, 0x1b1f22, 0.64, 0.42);
    var er = eraR(P);
    var rows = er <= 2 ? 2 : 4, cols = er <= 2 ? 8 : 5, tilt = 0.10;
    var tubeL = Math.min(mnt.len, L * 0.46);
    var room = Math.max(L * 0.05, mnt.room);
    var stack = Math.max(L * 0.03, room - tubeL * 0.5 * Math.sin(tilt));
    var tr = Math.min(stack / (2.25 * (rows - 1) + 2),
                      mnt.halfW * 2 / (2.25 * (cols - 1) + 2));
    var r2, c2, i, s;
    for (r2 = 0; r2 < rows; r2++) for (c2 = 0; c2 < cols; c2++) {
      var tb = new THREE.Mesh(new THREE.CylinderGeometry(tr, tr, tubeL, 8), tube);
      tb.rotation.z = Math.PI / 2;
      tb.position.set(0, (c2 - (cols - 1) / 2) * tr * 2.25,
                      (r2 - (rows - 1) / 2) * tr * 2.25);
      pack.add(tb);
    }
    /* the frame that holds them together */
    for (i = -1; i <= 1; i += 2) {
      var end = new THREE.Mesh(
        new THREE.BoxGeometry(tr * 0.5, cols * tr * 2.35, rows * tr * 2.35), skin);
      end.position.set(i * tubeL * 0.44, 0, 0);
      pack.add(end);
    }
    var packH = rows * tr * 2.25;
    /* a wide shallow rail pack is limited by the bed's WIDTH, not by the
       height it is allowed, so the cradle lifts it to fill what is left */
    var riser = mnt.riser + Math.max(0, room - packH) * 0.42;
    pack.rotation.y = -tilt;
    pack.position.set(mnt.x, 0, mnt.z + packH * 0.5 + riser);
    g.add(pack);
    /* the cradle it sits in: a turntable and two trunnion arms */
    var tt = new THREE.Mesh(
      new THREE.CylinderGeometry(mnt.halfW * 0.72, mnt.halfW * 0.80, riser * 0.55, 12), steel);
    tt.rotation.x = Math.PI / 2;
    tt.position.set(mnt.x, 0, mnt.z + riser * 0.28);
    g.add(tt);
    for (s = -1; s <= 1; s += 2) {
      var arm = new THREE.Mesh(
        new THREE.BoxGeometry(tubeL * 0.20, tr * 0.9, riser * 0.9 + packH * 0.60), skin);
      arm.position.set(mnt.x, s * Math.min(cols * tr * 1.22, mnt.halfW * 0.94),
                       mnt.z + (riser + packH * 0.60) * 0.5);
      g.add(arm);
      var ram = new THREE.Mesh(
        new THREE.CylinderGeometry(tr * 0.34, tr * 0.30, tubeL * 0.46, 7), steel);
      /* laid along +X first, then pitched up: turning a cylinder about its
         OWN axis, which is what rotation.y alone does, moves nothing */
      ram.rotation.z = Math.PI / 2;
      ram.rotation.y = 0.85;
      ram.position.set(mnt.x + tubeL * 0.20, s * Math.min(cols * tr * 1.10, mnt.halfW * 0.82),
                       mnt.z + riser * 0.9);
      g.add(ram);
    }
    /* the spade legs that steady it in action */
    for (s = mnt.legs ? -1 : 3; s <= 1; s += 2) {
      var leg = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.030, L * 0.024, mnt.z * 0.55), steel);
      leg.position.set(mnt.x - tubeL * 0.30, s * mnt.halfW * 0.98, mnt.z * 0.72);
      g.add(leg);
    }
  }

  /* --------------------------------------------------- wheeled assembly */
  function wheeledChassis(THREE, M, g, P, L, W, skin) {
    var F = wheeledGear(THREE, g, P, L, W, skin);
    var B = null, H;
    if (F.body === "truck") {
      B = truckBody(THREE, M, g, P, L, W, skin, F);
    } else if (F.body === "apc") {
      /* a boat-shaped armoured hull: a long sloped bow, firing ports down
         the flanks, a door in the back */
      H = armouredHull(THREE, g, P, L, W, skin, F,
        { bow: P.hull === "boat" ? 0.24 : 0.16, glacis: 0.62,
          top: 0.86, cheek: P.hull === "boat" ? 0.30 : 0.14 });
      armourDetail(THREE, g, P, L, W, skin, F, H,
        { ports: F.nw >= 8 ? 3 : 4, doors: 2, hatches: 3, spare: false });
    } else {
      /* an armoured car: a shorter monocoque, a spare wheel on the flank */
      H = armouredHull(THREE, g, P, L, W, skin, F,
        { bow: P.hull === "boat" ? 0.22 : 0.14, glacis: 0.70,
          top: 0.80, cheek: P.hull === "boat" ? 0.34 : 0.20 });
      armourDetail(THREE, g, P, L, W, skin, F, H,
        { ports: 3, doors: 1, hatches: 2, spare: true, kit: true });
    }
    F.bed = B;
    return F;
  }

  /* ------------------------------------------------------------- assembly */
  function build(THREE, M, C, P) {
    var L = P.len || 6.5, W = P.width || 3.0;
    var skin = skinOf(THREE, P);
    var g = new THREE.Group();
    /* a wheeled vehicle gets a real chassis, not the tank hull on tyres */
    var F = null;

    if (P.track) {
      g.add(buildHull(THREE, M, P, L, W, skin));
      runningGear(THREE, g, P, L, W, skin);
      addSkirts(THREE, g, P, L, W, skin);
    } else {
      F = wheeledChassis(THREE, M, g, P, L, W, skin);
    }

    var T = null;
    if (P.turret && P.turret !== "none") {
      T = buildTurret(THREE, M, P, L, W, skin);
      addGun(THREE, T, P, L, W, T.userData.mountX, T.userData.mountZ);
      /* a turret on a lorry stands on the bed, not on the bed FLOOR line */
      var tz = hullTopZ(P, L);
      if (F && F.bed) tz = F.bed.bedZ;
      T.position.set((P.turretAt || 0) * L, 0, tz);
      g.add(T);
    } else if (P.kind === "casemate") {
      var cm = casemate(THREE, g, P, L, W, skin);
      /* the gun is fixed in the hull, so it hangs off the group, not a turret */
      var fake = new THREE.Group();
      fake.position.set(cm.x, 0, cm.z);
      addGun(THREE, fake, P, L, W);
      g.add(fake);
    }

    /* ---- what the vehicle is carrying. On a lorry these ride ON the load
       bed the chassis has just built, on the cradle that comes with them,
       rather than floating at a fraction of the hull height. ---- */
    var h = P.height || L * 0.42;
    if (P.kind === "rocket" || P.role === "mlrs") {
      var mnt;
      if (F && F.bed) {
        mnt = { x: F.bed.bedX - F.bed.bedLen * 0.06, z: F.bed.bedZ,
                halfW: F.bed.bedHW, len: F.bed.bedLen, legs: F.nw < 8,
                riser: Math.max(L * 0.02, F.bed.sideH * 0.55) };
      } else {
        mnt = { x: -L * 0.06, z: hullTopZ(P, L), halfW: W * 0.36,
                len: L * 0.44, riser: L * 0.02, legs: true };
      }
      mnt.room = Math.max(L * 0.05, h - mnt.z - mnt.riser);
      rocketPack(THREE, g, P, L, W, skin, mnt);
    } else if (F && F.bed && (P.role === "radarv" || P.role === "ewveh")) {
      radarLoad(THREE, g, P, L, W, skin, F.bed, F);
    } else if (F && F.bed && P.role === "supply") {
      cargoLoad(THREE, g, P, L, W, skin, F.bed);
    }

    addExtras(THREE, g, T, P, L, W, skin);

    /* team flash so ownership still reads on a busy map */
    if (C && C.team) {
      var team = mat(THREE, C.team, 0.6, 0.2);
      var fy = W * 0.5 + L * 0.004, fz = hullTopZ(P, L) * 0.62, fx = -L * 0.24;
      if (F) {
        /* on a lorry the flash goes on the cab door, on an armoured hull it
           sits above the beltline where the fittings are */
        fy = W * 0.5 * 0.95;
        fz = F.body === "truck" ? F.bedZ + F.cabH * 0.24
                                : F.belt + (F.roof - F.belt) * 0.30;
        fx = F.body === "truck" ? (F.cabF + F.cabB) * 0.5 - F.cabLen * 0.30
                                : -L * 0.22;
      }
      for (var s = -1; s <= 1; s += 2) {
        var fl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.11, L * 0.006, L * 0.030), team);
        fl.position.set(fx, s * fy, fz);
        g.add(fl);
      }
    }
    return g;
  }

  /* Hand-finished meshes already in UNIT_MODELS win unless they are marked
     crude; this layer exists to give the era rosters their own vehicles. */
  function registerAll(override) {
    var made = 0, kept = 0;
    for (var id in ARMOUR) {
      if (!Object.prototype.hasOwnProperty.call(ARMOUR, id)) continue;
      if (!override && UNIT_MODELS[id] && !UNIT_MODELS[id].crude) { kept++; continue; }
      (function (Q, key) {
        UNIT_MODELS[key] = {
          len: Q.len || 6.5,
          build: function (THREE, M, C) { return build(THREE, M, C, Q); },
        };
      })(ARMOUR[id], id);
      made++;
    }
    return { made: made, kept: kept };
  }

  return { build: build, registerAll: registerAll, HULLS: HULLS, PAINT: PAINT };
})();
