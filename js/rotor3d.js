/* ============ rotor3d.js - parametric rotorcraft ============
   Same problem the jets had: every helicopter in the game borrowed an
   Apache's mesh, so a 1952 Mi-4 - a piston radial in the nose with the
   cockpit stacked on top of it - flew as a modern gunship.

   What actually identifies a helicopter at a glance is the rotor system
   (how many blades, whether there is a tail rotor at all), the shape of
   the body under it, and what it stands on. Those are the parameters.

   Model space follows models3d.js: +X nose, +Y left, +Z up. Real metres.
   The spec table lives in rotor_specs.js, keyed by unit id.              */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof ROTORCRAFT === "undefined") { var ROTORCRAFT = {}; }

var Rotor3D = (function () {
  "use strict";

  /* The fixed-wing builder owns the master paint table; fall back to a copy of
     it so this file still works if it is loaded on its own. */
  var PAINT = (typeof Airframe3D !== "undefined" && Airframe3D.PAINT) || {
    silver:   { c: 0xc0c5c9, r: 0.42, m: 0.52 },
    olive:    { c: 0x4a5236, r: 0.85, m: 0.06 },
    green:    { c: 0x3f5233, r: 0.84, m: 0.06 },
    seagrey:  { c: 0x99a2a7, r: 0.70, m: 0.14 },
    twotone:  { c: 0x768086, r: 0.72, m: 0.12 },
    darkgrey: { c: 0x4f575d, r: 0.74, m: 0.13 },
    bluegrey: { c: 0x7b8b9b, r: 0.76, m: 0.11 },
    desert:   { c: 0xb3a281, r: 0.86, m: 0.06 },
    white:    { c: 0xd9dcdd, r: 0.62, m: 0.10 },
    black:    { c: 0x26282b, r: 0.55, m: 0.24 },
  };

  function mat(THREE, c, r, m) {
    return new THREE.MeshStandardMaterial({
      color: c, roughness: r === undefined ? 0.76 : r,
      metalness: m === undefined ? 0.14 : m, side: THREE.DoubleSide });
  }

  /* ------------------------------------------------------------ paintwork */
  /* Every rotorcraft in the game was a flat untextured solid while the jets
     next to them carried painted panel lines and weathering, so the two
     families did not look like the same game. This is the same treatment
     air3d_era.js gives a fixed wing, retuned for a machine that weathers
     differently: a helicopter is filthiest where it works. Grease and oil fly
     off the rotor head and streak down the roof and the upper flanks, turbine
     soot lies back along the boom behind the engine deck, and the cabin doors
     wear a halo of boot marks and handprints that no aeroplane has.

     One sheet per camo scheme, painted once and cached, is what it costs. */
  var texCache = {};
  var varCache = {};

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  function skinCanvas(THREE, camo, seed) {
    var W = 1024, H = 512;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var p = PAINT[camo] || PAINT.olive;
    var R = rngFor(seed);
    var i, k;

    /* M.loft lays u along the body and v around it. On a cabin that means
       v = 0.00 and 0.50 are the two flanks, 0.25 is the roof and 0.75 the
       belly; u = 0 is the aft end of the cabin and u = 1 is the nose. Every
       stain below is placed against that map rather than scattered at random,
       which is the whole difference between weathering and noise. */
    var ROOF = H * 0.25, BELLY = H * 0.75;
    var FLANK = [0, H * 0.50, H];
    var DECK = W * 0.34;                 /* engine deck, just ahead of the mast */
    var MAST = W * 0.38;

    g.fillStyle = hex(p.c);
    g.fillRect(0, 0, W, H);

    /* disruptive schemes get their second and third tones as soft blobs, off
       the same table the fixed-wing sheet uses so the colours match exactly */
    var SCHEME = {
      green:    ["#2f3d28", "#6a5b35"],
      twotone:  ["#5f6a72", "#8b959b"],
      darkgrey: ["#3f464b", "#616a70"],
      bluegrey: ["#6a7d8e", "#93a4b2"],
      desert:   ["#9d8c68", "#c2b18b"],
      olive:    ["#3b4230", "#5b6344"],
      seagrey:  ["#8b949a", "#aab3b8"],
      white:    ["#ccd0d2", "#e7eaeb"],
      black:    ["#1e2023", "#33373b"],
    };
    var tones = SCHEME[camo];
    if (tones) {
      g.globalAlpha = 0.5;
      for (i = 0; i < 26; i++) {
        g.fillStyle = tones[i % tones.length];
        g.beginPath();
        g.ellipse(R() * W, R() * H, 55 + R() * 130, 28 + R() * 70, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;
    }

    /* bare metal is a patchwork of slightly different alloy panels */
    if (camo === "silver") {
      for (i = 0; i < 90; i++) {
        g.globalAlpha = 0.05 + R() * 0.08;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#7c828a";
        g.fillRect(R() * W, R() * H, 30 + R() * 110, 20 + R() * 70);
      }
      g.globalAlpha = 1;
    }

    /* panel seams: frame lines around the body, longerons along it */
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.6;
    var x = 0;
    while (x < W) {
      x += 24 + R() * 64;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    var y = 0;
    while (y < H) {
      y += 30 + R() * 72;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    /* the roof joint and the belly keel are continuous seams of their own */
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(0, ROOF); g.lineTo(W, ROOF); g.stroke();
    g.beginPath(); g.moveTo(0, BELLY); g.lineTo(W, BELLY); g.stroke();

    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
    for (i = 0; i < 46; i++) {
      var qx = R() * W, qy = R() * H, ql = 40 + R() * 150;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(qx, qy); g.lineTo(qx + ql, qy); }
      else { g.moveTo(qx, qy); g.lineTo(qx, qy + ql * 0.6); }
      g.stroke();
    }

    /* rivet rows following the frames */
    g.fillStyle = "rgba(0,0,0,0.22)";
    for (i = 0; i < 34; i++) {
      var ry = R() * H, rx0 = R() * W * 0.7, rn = 16 + ((R() * 40) | 0);
      for (k = 0; k < rn; k++) g.fillRect(rx0 + k * 7, ry, 1.6, 1.6);
    }
    /* the heavier quick-release fasteners that hold the engine and gearbox
       cowlings down, which on a helicopter are all on the roof */
    g.fillStyle = "rgba(0,0,0,0.32)";
    for (i = 0; i < 11; i++) {
      var fy = ROOF + (R() - 0.5) * H * 0.24, fx0 = W * (0.08 + R() * 0.56);
      var fn = 12 + ((R() * 22) | 0);
      for (k = 0; k < fn; k++) g.fillRect(fx0 + k * 11, fy, 2.4, 2.4);
    }

    /* access hatches and inspection panels */
    g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = 1.3;
    for (i = 0; i < 18; i++) {
      var hx = R() * W, hy = R() * H, hw = 14 + R() * 34, hh = 10 + R() * 22;
      g.strokeRect(hx, hy, hw, hh);
      g.globalAlpha = 0.10; g.fillStyle = "#000"; g.fillRect(hx, hy, hw, hh);
      g.globalAlpha = 1;
    }

    /* exhaust staining. The turbines sit on the cabin roof and dump aft, and
       aft on this sheet is to the LEFT, so the stain runs from the deck back
       towards u = 0 and is confined to the roof and the upper flanks. */
    var soot = g.createLinearGradient(DECK, 0, 0, 0);
    soot.addColorStop(0, "rgba(18,16,15,0)");
    soot.addColorStop(0.45, "rgba(18,16,15,0.26)");
    soot.addColorStop(1, "rgba(18,16,15,0.42)");
    g.save();
    g.beginPath(); g.rect(0, ROOF - H * 0.21, DECK, H * 0.42); g.clip();
    g.fillStyle = soot; g.fillRect(0, 0, DECK, H);
    g.restore();
    /* the individual sooty streaks inside that wash */
    g.fillStyle = "rgba(20,18,16,0.17)";
    for (i = 0; i < 30; i++) {
      var sx = R() * DECK, sy = ROOF + (R() - 0.5) * H * 0.36;
      g.fillRect(sx, sy, 30 + R() * 150, 2 + R() * 5);
    }
    /* the scorched ring right at the exhaust stub itself */
    g.fillStyle = "rgba(30,25,20,0.30)";
    g.beginPath();
    g.ellipse(DECK * 0.82, ROOF, W * 0.035, H * 0.045, 0, 0, 6.29);
    g.fill();

    /* grime around the rotor head: grease slung off the swashplate and the
       drag hinges, which runs DOWN both flanks from the roof line */
    var halo = g.createRadialGradient(MAST, ROOF, 6, MAST, ROOF, W * 0.16);
    halo.addColorStop(0, "rgba(26,22,18,0.44)");
    halo.addColorStop(0.5, "rgba(26,22,18,0.20)");
    halo.addColorStop(1, "rgba(26,22,18,0)");
    g.fillStyle = halo;
    g.fillRect(MAST - W * 0.16, ROOF - W * 0.16, W * 0.32, W * 0.32);
    g.fillStyle = "rgba(24,20,16,0.21)";
    for (i = 0; i < 36; i++) {
      var gx = MAST + (R() - 0.5) * W * 0.24;
      var gl = 22 + R() * 95;
      var up = R() < 0.5;
      g.fillRect(gx, up ? ROOF - gl : ROOF, 2 + R() * 4, gl);
    }

    /* the cabin doors. Every one of these machines is boarded and unloaded
       through them, so the frame is scuffed, the sill below it is black with
       boot marks and there is a smear of hand grime round the handle. */
    var dx0 = W * 0.42, dw = W * 0.20, dh = H * 0.17;
    for (i = 0; i < FLANK.length; i++) {
      var fy0 = FLANK[i] - dh * 0.5;
      g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 2;
      g.strokeRect(dx0, fy0, dw, dh);
      g.globalAlpha = 0.10; g.fillStyle = "#000";
      g.fillRect(dx0, fy0, dw, dh);
      g.globalAlpha = 1;
      /* the upper and lower rails a sliding door runs on */
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(dx0 - dw * 0.16, fy0 - 5); g.lineTo(dx0 + dw * 1.16, fy0 - 5);
      g.moveTo(dx0 - dw * 0.16, fy0 + dh + 5); g.lineTo(dx0 + dw * 1.16, fy0 + dh + 5);
      g.stroke();
      /* boot marks along the sill */
      g.fillStyle = "rgba(22,19,16,0.18)";
      for (k = 0; k < 26; k++) {
        var bx = dx0 - dw * 0.16 + R() * dw * 1.32;
        var by = fy0 + dh * (0.56 + R() * 0.58);
        g.fillRect(bx, by, 5 + R() * 16, 4 + R() * 11);
      }
      /* hand grime around the latch */
      g.fillStyle = "rgba(22,19,16,0.14)";
      for (k = 0; k < 15; k++) {
        var px = dx0 + dw * (0.60 + R() * 0.34);
        var py = fy0 + dh * (0.18 + R() * 0.44);
        g.fillRect(px, py, 4 + R() * 9, 4 + R() * 9);
      }
    }

    /* the non-slip walkway along the roof, the step under the doors, and the
       red band that warns the ground crew off the turning disc */
    g.strokeStyle = "rgba(20,20,20,0.42)"; g.lineWidth = 3;
    g.setLineDash([9, 7]);
    g.beginPath();
    g.moveTo(W * 0.14, ROOF - H * 0.055); g.lineTo(W * 0.64, ROOF - H * 0.055);
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = "rgba(190,40,30,0.55)";
    g.fillRect(W * 0.10, ROOF - 3, 52, 5);
    g.fillRect(W * 0.10, H * 0.50 - 3, 52, 5);

    /* general run-off under the vents and along the belly */
    g.fillStyle = "rgba(24,22,20,0.11)";
    for (i = 0; i < 30; i++) {
      var vx = R() * W, vy = BELLY - H * 0.10 + R() * H * 0.20;
      g.fillRect(vx, vy, 22 + R() * 90, 2 + R() * 4);
    }

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    /* r148 ships sRGBEncoding and ignores Texture.colorSpace entirely */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function texFor(THREE, camo) {
    var key = camo || "olive";
    if (texCache[key] === undefined) {
      try { texCache[key] = skinCanvas(THREE, key, key.length * 7919 + 137); }
      catch (e) { texCache[key] = null; }
    }
    return texCache[key];
  }

  /* A variant is the same painted sheet with a different repeat or offset.
     Cached alongside the base, because forty-three helicopters each cloning
     their own copy of a 1024x512 sheet is forty-three uploads of the same
     pixels. */
  function texVariant(THREE, camo, tag, rx, ry, ox, oy) {
    var ck = (camo || "olive") + "|" + tag;
    if (varCache[ck] === undefined) {
      var base = texFor(THREE, camo);
      if (!base) { varCache[ck] = null; }
      else {
        var c = base.clone();
        c.needsUpdate = true;
        c.wrapS = c.wrapT = THREE.RepeatWrapping;
        c.repeat.set(rx, ry);
        c.offset.set(ox, oy);
        varCache[ck] = c;
      }
    }
    return varCache[ck];
  }

  /* The textured SKIN tier: the map carries the colour, so the material is
     white underneath it and keeps only the paint's sheen. */
  function paintMat(THREE, P) {
    var p = PAINT[P.camo] || PAINT.olive || { c: 0x4a5236, r: 0.85, m: 0.06 };
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: Math.min(0.94, Math.max(0.82, p.r)),
      metalness: Math.min(0.10, p.m),
      side: THREE.DoubleSide });
  }

  /* the lofted cabin: its UVs already run 0..1 along and around, so the sheet
     wraps the fuselage exactly once and every stain lands where it was painted */
  function skinOf(THREE, P) {
    var m = paintMat(THREE, P);
    var t = texFor(THREE, P.camo);
    if (t) m.map = t;
    else m.color.setHex((PAINT[P.camo] || PAINT.olive).c);
    return m;
  }

  /* The tailboom is lofted tail-first, so its u runs the opposite way to the
     cabin's. Flipping the sheet along the body puts the exhaust stain just
     behind the engine deck on the boom too, instead of at the tail tip. */
  function skinBoom(THREE, P) {
    var m = paintMat(THREE, P);
    var t = texVariant(THREE, P.camo, "flip", -1, 1, 1, 0);
    if (t) m.map = t;
    else m.color.setHex((PAINT[P.camo] || PAINT.olive).c);
    return m;
  }

  /* An extruded slab carries its UVs in model METRES, so left at one repeat a
     two-metre fin would tile the panel lines a dozen times and read as
     corduroy. Scale the sheet so it covers the part about once. */
  function skinPanel(THREE, P, L) {
    var m = paintMat(THREE, P);
    var k = 1 / Math.max(2, L * 0.9);
    var t = texVariant(THREE, P.camo, "panel" + Math.round(L), k, k, 0.30, 0.26);
    if (t) m.map = t;
    else m.color.setHex((PAINT[P.camo] || PAINT.olive).c);
    return m;
  }

  /* ------------------------------------------------------------- fuselage */
  /* [x, halfWidth, halfHeight, zCentre] as fractions of overall length.
     Helicopters are a cabin with a boom behind it, so the tables carry the
     cabin and the boom is drawn separately. */
  var CABIN = {
    /* 1950s: a barrel with the radial engine in the sloped nose and the
       cockpit stacked in a greenhouse above it */
    pod: [
      [ 0.470, 0.062, 0.068, 0.008],
      [ 0.412, 0.074, 0.082, 0.000],
      [ 0.310, 0.079, 0.090,-0.004],
      [ 0.150, 0.078, 0.088,-0.004],
      [ 0.000, 0.070, 0.078, 0.006],
      [-0.110, 0.048, 0.054, 0.030],
    ],
    /* A slab-sided cabin with sliding doors: Huey, Hip, Black Hawk. These
       stations are SEMI-axes, so the previous figures produced a 3.2 m wide,
       3.1 m deep circular tube - a Black Hawk cabin is 2.36 x 2.02 m and
       distinctly square in section. */
    utility: [
      [ 0.480, 0.030, 0.032, 0.008],
      [ 0.430, 0.058, 0.058, 0.000],
      [ 0.330, 0.072, 0.072, 0.000],
      [ 0.140, 0.077, 0.066, 0.000],
      [-0.020, 0.074, 0.062, 0.006],
      [-0.140, 0.052, 0.048, 0.018],
    ],
    /* a metre wide and no more: Cobra, Apache, Hind, Havoc, Z-10 */
    gunship: [
      [ 0.490, 0.020, 0.026, 0.000],
      [ 0.430, 0.036, 0.052, 0.004],
      [ 0.330, 0.046, 0.078, 0.010],
      [ 0.170, 0.050, 0.092, 0.008],
      [ 0.010, 0.050, 0.090, 0.004],
      [-0.130, 0.042, 0.070, 0.012],
    ],
    /* a light scout: an egg on skids */
    compact: [
      [ 0.430, 0.048, 0.056, 0.010],
      [ 0.360, 0.090, 0.100, 0.000],
      [ 0.240, 0.110, 0.124, 0.000],
      [ 0.090, 0.106, 0.120, 0.004],
      [-0.040, 0.078, 0.086, 0.018],
      [-0.130, 0.048, 0.052, 0.030],
    ],
    heavy: [
      [ 0.480, 0.052, 0.060, 0.020],
      [ 0.420, 0.100, 0.108, 0.006],
      [ 0.310, 0.130, 0.140, 0.000],
      [ 0.120, 0.138, 0.146, 0.000],
      [-0.040, 0.130, 0.136, 0.006],
      [-0.160, 0.092, 0.096, 0.022],
    ],
  };

  function bodyOf(P) { return CABIN[P.body] || CABIN.utility; }
  function cabinTop(P, L) { var t = bodyOf(P); return (t[3][2] + t[3][3]) * L; }
  function cabinW(P, L)   { return bodyOf(P)[3][1] * L; }

  function buildCabin(THREE, M, P, L, skin) {
    var tbl = bodyOf(P), secs = [], i;
    for (i = 0; i < tbl.length; i++) {
      secs.push({ x: tbl[i][0] * L, w: tbl[i][1] * L, h: tbl[i][2] * L,
                  zc: tbl[i][3] * L,
                  sq: P.body === "gunship" ? 1.5 : (P.body === "utility" ? 1.6 : 1.2) });
    }
    secs.reverse();
    return new THREE.Mesh(M.loft(THREE, secs, 20), skin);
  }

  function buildBoom(THREE, M, P, L, skin) {
    /* the tailboom, thin and slightly upswept, ending at the fin */
    var x0 = bodyOf(P)[5][0] * L, x1 = -0.500 * L;
    var r0 = bodyOf(P)[5][1] * L * 0.72, r1 = L * 0.020;
    var zc = bodyOf(P)[5][3] * L;
    var secs = [
      { x: x1,                    w: r1,        h: r1 * 1.10, zc: zc + L * 0.030 },
      { x: x1 + (x0 - x1) * 0.45, w: r1 * 1.45, h: r1 * 1.55, zc: zc + L * 0.014 },
      { x: x0,                    w: r0,        h: r0,        zc: zc },
    ];
    return new THREE.Mesh(M.loft(THREE, secs, 14), skin);
  }

  /* ---------------------------------------------------------- rotor system */
  /* The renderer spins whatever part is named "rotor" about that part's LOCAL
     Y axis (render3d.js: rec.rotor.rotation.y += dt * 28). Our models are +Z
     up, so the assembly is built in a Y-up local frame and then given a
     quarter turn about X, which puts local Y along model Z - vertical - and
     lets the disc actually turn. Without the name and that pre-rotation every
     helicopter in the game sat with its blades frozen. */
  function rotorHead(THREE, g, P, L, R, x, z, blades, skin, dark) {
    var rot = new THREE.Group();
    rot.name = "rotor";

    var hub = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.030, L * 0.038, L * 0.038, 12), dark);
    rot.add(hub);                                     /* hub axis is local Y */

    /* the rotor head itself: swashplate, pitch links and drag hinges. It is
       the busiest object on a real helicopter and sits dead centre of a
       top-down view, so it is worth the handful of triangles. */
    var metal = mat(THREE, 0x6f767c, 0.45, 0.65);
    var swash = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.046, L * 0.046, L * 0.012, 14), metal);
    swash.position.y = -L * 0.026;
    rot.add(swash);

    var bladeMat = mat(THREE, 0x2b2e31, 0.88, 0.10);
    var n = Math.max(2, blades || 4), i;
    for (i = 0; i < n; i++) {
      var a = i * Math.PI * 2 / n;
      var bl = new THREE.Mesh(
        new THREE.BoxGeometry(R * 0.94, L * 0.008, L * 0.030), bladeMat);
      bl.position.set(Math.cos(a) * R * 0.49, L * 0.014, Math.sin(a) * R * 0.49);
      bl.rotation.y = -a;
      /* blades droop under their own weight and cone up under load */
      bl.rotation.z = -0.035;
      rot.add(bl);
      /* pitch link and grip from the hub out to the blade root */
      var grip = new THREE.Mesh(
        new THREE.BoxGeometry(R * 0.10, L * 0.014, L * 0.016), metal);
      grip.position.set(Math.cos(a) * R * 0.055, L * 0.010, Math.sin(a) * R * 0.055);
      grip.rotation.y = -a;
      rot.add(grip);
      var link = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.004, L * 0.004, L * 0.038, 5), metal);
      link.position.set(Math.cos(a) * R * 0.048, -L * 0.010, Math.sin(a) * R * 0.048);
      rot.add(link);
    }

    /* the translucent disc a turning rotor reads as from above */
    var disc = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, L * 0.004, 28),
      new THREE.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.4, metalness: 0.1,
                                       transparent: true, opacity: 0.055,
                                       depthWrite: false }));
    disc.name = "rotordisc";
    disc.position.y = L * 0.014;
    rot.add(disc);

    rot.rotation.x = Math.PI / 2;      /* local +Y -> model +Z, i.e. upright */
    rot.position.set(x, 0, z);
    g.add(rot);
    return rot;
  }

  /* The renderer spins "tailrotor" about its LOCAL X, so this assembly is
     built around local X and then turned so that axis lies across the
     aircraft, which is where a tail rotor shaft actually points. */
  function tailRotor(THREE, g, P, L, R, skin, dark) {
    var tr = R * 0.20;
    var x = -L * 0.475, z = cabinTop(P, L) * 0.42 + L * 0.075;
    var rot = new THREE.Group();
    rot.name = "tailrotor";

    var hub = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.012, L * 0.012, L * 0.030, 10), dark);
    hub.rotation.z = Math.PI / 2;                 /* hub axis along local X */
    rot.add(hub);

    var bladeMat = mat(THREE, 0x2b2e31, 0.88, 0.10);
    var n = Math.max(2, P.tblades || 2), i;
    for (i = 0; i < n; i++) {
      var a = i * Math.PI * 2 / n;
      var bl = new THREE.Mesh(
        new THREE.BoxGeometry(L * 0.008, tr * 0.9, L * 0.018), bladeMat);
      bl.position.set(0, Math.cos(a) * tr * 0.48, Math.sin(a) * tr * 0.48);
      bl.rotation.x = a;
      rot.add(bl);
    }
    var disc = new THREE.Mesh(
      new THREE.CylinderGeometry(tr, tr, L * 0.003, 18),
      new THREE.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.4,
                                       transparent: true, opacity: 0.06,
                                       depthWrite: false }));
    disc.name = "rotordisc";
    disc.rotation.z = Math.PI / 2;
    rot.add(disc);

    rot.rotation.z = -Math.PI / 2;     /* local +X -> across the aircraft */
    rot.position.set(x, L * 0.026, z);
    g.add(rot);

    /* the drive shaft and its gearbox fairing running up the fin */
    var shaftM = mat(THREE, 0x4d5358, 0.6, 0.4);
    var shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.007, L * 0.007, L * 0.32, 7), shaftM);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(-L * 0.30, 0, cabinTop(P, L) * 0.30 + L * 0.030);
    g.add(shaft);
    var gearbox = new THREE.Mesh(
      new THREE.BoxGeometry(L * 0.055, L * 0.030, L * 0.050), shaftM);
    gearbox.position.set(x + L * 0.020, 0, z);
    g.add(gearbox);
  }

  function fenestron(THREE, g, P, L, R, skin, dark) {
    /* the shrouded fan buried in the fin: a Gazelle or a Z-9 and nothing else */
    var tr = R * 0.14;
    var x = -L * 0.455, z = cabinTop(P, L) * 0.45 + L * 0.070;
    var shroud = new THREE.Mesh(
      new THREE.TorusGeometry(tr * 1.25, tr * 0.34, 8, 18), skin);
    shroud.rotation.y = Math.PI / 2;
    shroud.position.set(x, 0, z);
    g.add(shroud);
    var fan = new THREE.Mesh(
      new THREE.CylinderGeometry(tr * 1.05, tr * 1.05, L * 0.010, 16), dark);
    fan.rotation.x = Math.PI / 2;
    fan.rotation.z = Math.PI / 2;
    fan.position.set(x, 0, z);
    g.add(fan);
    for (var i = 0; i < (P.tblades || 8); i++) {
      var a = i * Math.PI * 2 / (P.tblades || 8);
      var bl = new THREE.Mesh(new THREE.BoxGeometry(tr * 0.95, L * 0.006, L * 0.012),
                              mat(THREE, 0x33373a, 0.85, 0.12));
      bl.position.set(x, Math.cos(a) * tr * 0.5, z + Math.sin(a) * tr * 0.5);
      bl.rotation.x = a;
      g.add(bl);
    }
  }

  /* ------------------------------------------------------------ empennage */
  function empennage(THREE, M, g, P, L, skin) {
    var zc = bodyOf(P)[5][3] * L;
    var finH = L * 0.155, finC = L * 0.135;
    var thick = L * 0.008;
    function finAt(y, cant) {
      var pts = [[0, 0], [-finH * 0.55, finH], [-finH * 0.55 - finC * 0.42, finH], [-finC, 0]];
      var m = new THREE.Mesh(M.slab(THREE, pts, thick, "xz"), skin);
      m.position.set(-L * 0.415, y, zc + L * 0.028);
      if (cant) m.rotation.x = cant;
      g.add(m);
    }
    if (P.config === "coaxial") {
      /* No tail rotor to counter torque, so a Kamov gets twin endplate fins -
         and they stand at the TIPS of a wide tailplane. Set close together
         they merged into one thick fin at map zoom. */
      finAt( L * 0.150,  0.18);
      finAt(-L * 0.150, -0.18);
    } else {
      finAt(0, 0);
    }
    /* horizontal stabiliser */
    var sp = (P.config === "coaxial") ? L * 0.160 : L * 0.075;
    var spts = [
      [-L * 0.375,  sp], [-L * 0.375, -sp],
      [-L * 0.455, -sp], [-L * 0.455,  sp],
    ];
    var st = new THREE.Mesh(M.slab(THREE, spts, thick), skin);
    st.position.z = zc + L * 0.010;
    g.add(st);
  }

  /* ----------------------------------------------------------- undercarriage */
  function undercarriage(THREE, g, P, L, skin) {
    var tbl = bodyOf(P);
    var bw = tbl[3][1] * L, bz = (tbl[3][3] - tbl[3][2]) * L;
    var tube = mat(THREE, 0x5c6367, 0.6, 0.45);
    var rub = mat(THREE, 0x191b1d, 0.94, 0.03);
    var s, i;
    if (P.gear === "skid") {
      for (s = -1; s <= 1; s += 2) {
        var sk = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.010, L * 0.010, L * 0.46, 8), tube);
        sk.rotation.z = Math.PI / 2;
        sk.position.set(L * 0.10, s * bw * 0.86, bz - L * 0.085);
        g.add(sk);
        for (i = 0; i < 2; i++) {
          var leg = new THREE.Mesh(
            new THREE.CylinderGeometry(L * 0.007, L * 0.007, L * 0.085, 6), tube);
          leg.position.set(L * (i ? -0.03 : 0.24), s * bw * 0.70, bz - L * 0.042);
          leg.rotation.x = -s * 0.34;
          g.add(leg);
        }
      }
      return;
    }
    if (P.gear === "sponson") {
      /* the Hip and the Hind carry their wheels in lozenge sponsons */
      for (s = -1; s <= 1; s += 2) {
        var sp = new THREE.Mesh(new THREE.SphereGeometry(L * 0.055, 12, 8), skin);
        sp.scale.set(2.1, 0.9, 0.72);
        sp.position.set(-L * 0.03, s * bw * 1.02, bz + L * 0.030);
        g.add(sp);
        var w = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.026, L * 0.026, L * 0.018, 12), rub);
        w.rotation.x = Math.PI / 2;
        w.position.set(-L * 0.03, s * bw * 1.02, bz - L * 0.030);
        g.add(w);
      }
      var nw = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.020, L * 0.020, L * 0.014, 10), rub);
      nw.rotation.x = Math.PI / 2;
      nw.position.set(L * 0.31, 0, bz - L * 0.038);
      g.add(nw);
      return;
    }
    /* plain wheels */
    for (s = -1; s <= 1; s += 2) {
      var mw = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.026, L * 0.026, L * 0.018, 12), rub);
      mw.rotation.x = Math.PI / 2;
      mw.position.set(-L * 0.02, s * bw * 0.90, bz - L * 0.045);
      g.add(mw);
      var strut = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.008, L * 0.008, L * 0.055, 6), tube);
      strut.position.set(-L * 0.02, s * bw * 0.90, bz - L * 0.018);
      g.add(strut);
    }
    var fw = new THREE.Mesh(
      new THREE.CylinderGeometry(L * 0.020, L * 0.020, L * 0.014, 10), rub);
    fw.rotation.x = Math.PI / 2;
    fw.position.set(L * 0.33, 0, bz - L * 0.040);
    g.add(fw);
  }

  /* ------------------------------------------------------------- furniture */
  function stubWings(THREE, M, g, P, L, skin, C) {
    var bw = bodyOf(P)[3][1] * L;
    var thick = L * 0.010;
    /* A Hind's stub wings span 6.65 m against a 17.3 m rotor - a bit over a
       third of the disc, not half of it, and they are not paddles. */
    var span = L * 0.190;
    var pts = [
      [ L * 0.050, bw * 0.9], [ L * 0.018, span],
      [-L * 0.052, span],     [-L * 0.068, bw * 0.9],
    ];
    for (var s = -1; s <= 1; s += 2) {
      var q = [], i;
      for (i = 0; i < pts.length; i++) q.push([pts[i][0], pts[i][1] * s]);
      var m = new THREE.Mesh(M.slab(THREE, q, thick), skin);
      m.position.z = bodyOf(P)[3][3] * L - L * 0.010;
      /* the Hind's wings droop hard; everything else sits level */
      m.rotation.x = -s * (P.body === "gunship" ? 0.20 : 0.06);
      g.add(m);
      /* a rocket pod and a missile rail under each */
      var pod = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.024, L * 0.024, L * 0.115, 10),
        mat(THREE, 0x3d4238, 0.85, 0.12));
      pod.rotation.z = Math.PI / 2;
      pod.position.set(-L * 0.005, s * span * 0.70, bodyOf(P)[3][3] * L - L * 0.052);
      g.add(pod);
      var rail = new THREE.Mesh(new THREE.BoxGeometry(L * 0.13, L * 0.014, L * 0.014),
                                mat(THREE, 0x33383a, 0.8, 0.2));
      rail.position.set(-L * 0.005, s * span * 0.96, bodyOf(P)[3][3] * L - L * 0.046);
      g.add(rail);
    }
  }

  function noseKit(THREE, g, P, L, skin, C) {
    var tbl = bodyOf(P);
    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x1b2b33, metalness: 0.35, roughness: 0.13, clearcoat: 1,
      transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    if (P.nose === "glass") {
      /* the greenhouse. On a pod fuselage it sits ON TOP of the engine, which
         is the single thing that dates a Mi-4 or an H-19. */
      var high = P.body === "pod";
      var cp = new THREE.Mesh(new THREE.SphereGeometry(L * 0.070, 14, 10), glass);
      cp.scale.set(1.35, 0.86, 0.80);
      cp.position.set(L * (high ? 0.300 : 0.395),
                      0,
                      high ? (tbl[2][2] + tbl[2][3]) * L * 0.98 : tbl[1][3] * L + L * 0.020);
      g.add(cp);
    } else if (P.nose === "stepped") {
      /* tandem crew: two canopies, the rear one stepped up above the front */
      var f = new THREE.Mesh(new THREE.SphereGeometry(L * 0.042, 12, 9), glass);
      f.scale.set(1.5, 0.95, 0.85);
      f.position.set(L * 0.335, 0, (tbl[2][2] + tbl[2][3]) * L * 0.80);
      g.add(f);
      var r = new THREE.Mesh(new THREE.SphereGeometry(L * 0.044, 12, 9), glass);
      r.scale.set(1.5, 0.95, 0.90);
      r.position.set(L * 0.185, 0, (tbl[3][2] + tbl[3][3]) * L * 0.92);
      g.add(r);
      /* the chin turret that goes with a gunship nose */
      var tur = new THREE.Mesh(new THREE.SphereGeometry(L * 0.030, 10, 8),
                               mat(THREE, 0x33373a, 0.7, 0.3));
      tur.scale.set(1.0, 1.0, 0.8);
      tur.position.set(L * 0.430, 0, (tbl[1][3] - tbl[1][2]) * L - L * 0.010);
      g.add(tur);
      var gun = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.006, L * 0.006, L * 0.085, 8),
        mat(THREE, 0x25282a, 0.6, 0.45));
      gun.rotation.z = Math.PI / 2;
      gun.position.set(L * 0.478, 0, (tbl[1][3] - tbl[1][2]) * L - L * 0.014);
      g.add(gun);
    } else if (P.nose === "radome") {
      var rd = new THREE.Mesh(new THREE.SphereGeometry(L * 0.052, 12, 9),
                              mat(THREE, 0x2f3437, 0.72, 0.14));
      rd.scale.set(1.4, 1.0, 0.9);
      rd.position.set(L * 0.455, 0, tbl[1][3] * L);
      g.add(rd);
      var cp2 = new THREE.Mesh(new THREE.SphereGeometry(L * 0.050, 12, 9), glass);
      cp2.scale.set(1.5, 0.92, 0.8);
      cp2.position.set(L * 0.330, 0, (tbl[2][2] + tbl[2][3]) * L * 0.82);
      g.add(cp2);
    } else {
      var cp3 = new THREE.Mesh(new THREE.SphereGeometry(L * 0.055, 12, 9), glass);
      cp3.scale.set(1.5, 0.92, 0.80);
      cp3.position.set(L * 0.370, 0, (tbl[2][2] + tbl[2][3]) * L * 0.80);
      g.add(cp3);
    }
  }

  function engineDeck(THREE, g, P, L, R, skin) {
    /* turbines sit on the cabin roof either side of the mast; a 1950s piston
       machine has its engine in the nose instead and gets nothing here */
    if (P.engine !== "turbine") return;
    var top = cabinTop(P, L), bw = cabinW(P, L);
    var n = Math.max(1, P.engines || 1), s;
    var dark = mat(THREE, 0x33383b, 0.72, 0.3);
    for (s = -1; s <= 1; s += 2) {
      if (n === 1 && s < 0) continue;
      var nac = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.033, L * 0.030, L * 0.20, 12), skin);
      nac.rotation.z = Math.PI / 2;
      nac.position.set(L * 0.045, n === 1 ? 0 : s * bw * 0.44, top + L * 0.026);
      g.add(nac);
      var ex = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.022, L * 0.022, L * 0.020, 10), dark);
      ex.rotation.z = Math.PI / 2;
      ex.position.set(-L * 0.062, n === 1 ? 0 : s * bw * 0.44, top + L * 0.026);
      g.add(ex);
    }
  }

  function teamFlash(THREE, g, P, L, C) {
    var tbl = bodyOf(P);
    var team = mat(THREE, C.team, 0.55, 0.25);
    var b = new THREE.Mesh(new THREE.BoxGeometry(L * 0.055, L * 0.008, L * 0.055), team);
    b.position.set(-L * 0.44, 0, tbl[5][3] * L + L * 0.090);
    g.add(b);
    for (var s = -1; s <= 1; s += 2) {
      var d = new THREE.Mesh(new THREE.BoxGeometry(L * 0.070, L * 0.006, L * 0.030), team);
      d.position.set(L * 0.05, s * (tbl[3][1] * L + L * 0.004), tbl[3][3] * L + L * 0.020);
      g.add(d);
    }
  }

  /* -------------------------------------------------------------- assembly */
  function build(THREE, M, C, P) {
    var L = P.len || 14;
    var R = (P.rotorD || L) * 0.5;
    var skin = skinOf(THREE, P);
    /* the same sheet, re-fitted: flipped along the body for the tailboom and
       scaled down for the extruded slabs, whose UVs are in metres */
    var boomSkin = skinBoom(THREE, P);
    var panel = skinPanel(THREE, P, L);
    var dark = mat(THREE, 0x33383b, 0.7, 0.32);
    var g = new THREE.Group();

    g.add(buildCabin(THREE, M, P, L, skin));

    if (P.config === "tandem") {
      /* two mains, the rear one on a raised pylon; no tail rotor, no boom */
      var top = cabinTop(P, L);
      var pyl = new THREE.Mesh(new THREE.BoxGeometry(L * 0.13, L * 0.10, L * 0.16), skin);
      pyl.position.set(-L * 0.38, 0, top + L * 0.055);
      g.add(pyl);
      rotorHead(THREE, g, P, L, R, L * 0.28, top + L * 0.075, P.blades, skin, dark);
      rotorHead(THREE, g, P, L, R, -L * 0.38, top + L * 0.145, P.blades, skin, dark);
    } else {
      g.add(buildBoom(THREE, M, P, L, boomSkin));
      empennage(THREE, M, g, P, L, panel);
      var mastZ = cabinTop(P, L) + L * 0.055;
      var mastX = P.body === "pod" ? L * 0.02 : L * 0.05;
      var mast = new THREE.Mesh(
        new THREE.CylinderGeometry(L * 0.016, L * 0.020, L * 0.075, 8), dark);
      mast.position.set(mastX, 0, mastZ - L * 0.035);
      g.add(mast);
      if (P.config === "coaxial") {
        /* two contra-rotating heads stacked on one shaft, and nothing at all
           on the tail: the Kamov signature */
        rotorHead(THREE, g, P, L, R, mastX, mastZ, P.blades, skin, dark);
        rotorHead(THREE, g, P, L, R, mastX, mastZ + L * 0.070, P.blades, skin, dark);
      } else {
        rotorHead(THREE, g, P, L, R, mastX, mastZ, P.blades, skin, dark);
        if (P.config === "fenestron") fenestron(THREE, g, P, L, R, skin, dark);
        else tailRotor(THREE, g, P, L, R, skin, dark);
      }
      if (P.mast) {
        /* the mast-mounted sight: a Longbow or a Night Hunter and nothing else */
        var stalk = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.010, L * 0.010, L * 0.055, 8), dark);
        stalk.position.set(mastX, 0, mastZ + L * 0.048);
        g.add(stalk);
        var ball = new THREE.Mesh(
          new THREE.CylinderGeometry(L * 0.050, L * 0.050, L * 0.048, 14), skin);
        ball.position.set(mastX, 0, mastZ + L * 0.098);
        g.add(ball);
      }
    }

    engineDeck(THREE, g, P, L, R, skin);
    if (P.stubs) stubWings(THREE, M, g, P, L, panel, C);
    undercarriage(THREE, g, P, L, skin);
    noseKit(THREE, g, P, L, skin, C);
    teamFlash(THREE, g, P, L, C && C.team ? C : { team: 0x888888 });
    return g;
  }

  /* Hand-finished meshes already in UNIT_MODELS win; this fills the gaps. */
  function registerAll(override) {
    var made = 0, kept = 0;
    for (var id in ROTORCRAFT) {
      if (!Object.prototype.hasOwnProperty.call(ROTORCRAFT, id)) continue;
      var P = ROTORCRAFT[id];
      if (P.kind === "wing") continue;              /* aeroplane: air3d_era handles it */
      /* a hand-finished mesh wins; an early parametric stand-in does not */
      if (!override && UNIT_MODELS[id] && !UNIT_MODELS[id].crude) { kept++; continue; }
      (function (Q, key) {
        UNIT_MODELS[key] = {
          len: Math.max(Q.len || 14, Q.rotorD || 0),
          build: function (THREE, M, C) { return build(THREE, M, C, Q); },
        };
      })(P, id);
      made++;
    }
    return { made: made, kept: kept };
  }

  return { build: build, registerAll: registerAll, CABIN: CABIN };
})();
