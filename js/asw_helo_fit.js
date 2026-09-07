/* ==========================================================================
   asw_helo_fit.js -- the anti-submarine helicopters, fitted out as such

   Every ASW helicopter in the roster was coming out of the generic
   rotorcraft builder in rotor3d.js: a grey utility hull with a nose radome
   and nothing else on it. That builder is right about the airframe families
   and wrong about the whole point of these machines. An ASW helicopter is a
   sensor platform that happens to fly - what identifies one at any zoom is
   the kit hung off the cabin, not the cabin:

     - the DIPPING SONAR winch and its transducer dome, starboard side
     - the SONOBUOY launcher, a grid of tubes down the port flank
     - a lightweight TORPEDO on a side pylon
     - a chin or nose RADOME for the surface-search radar
     - a naval rotor head: blade-fold cuffs, hinges and a vibration absorber

   Model space follows the rest of the pack: +X nose, +Y LEFT (port), +Z up,
   real metres, and render3d.js stands the model up with rotation.x = -PI/2.
   Starboard is therefore -Y, which is where the sonar goes.

   Three airframes cover all seven ids:

     h60   Sikorsky H-60 naval Hawk  15.3 m, 16.36 m 4-blade rotor, wheels,
           canted 4-blade tail rotor, folding pylon.  MH-60R Seahawk for
           NATO, S-70C(M) Thunderhawk for the ROC.
     ka27  Kamov Ka-27PL Helix       11.3 m, 15.9 m COAXIAL 3+3 rotors and
           NO tail rotor at all, twin endplate fins, very stubby whale hull,
           four fixed wheels, MAD fairing under the tail.
     z9    Harbin Z-9C               12.1 m, 11.9 m 4-blade rotor and a
           FENESTRON - the shrouded fan buried in the fin.

   Rotor group is named "rotor", tail rotor "tailrotor", undercarriage
   "gear", as the renderer expects.

   ONE THING WORTH WRITING DOWN about those names. render3d.js turns the
   discs with Object3D.rotateOnWorldAxis, and three.js applies that in the
   PARENT's frame - its own source says "method assumes no rotated parent".
   Every model in this game hangs under tpl.rotation.x = -PI/2, so a rotor
   added straight to the model root gets spun about the model's LATERAL
   axis and windmills on its side. Each disc here therefore sits inside a
   mount group turned +PI/2 about X, which cancels the template rotation:
   the scene-up axis the renderer hands in lands back on the model's own +Z
   and the disc turns about its mast. The assemblies inside those mounts are
   built Y-up, exactly as rotor3d.js builds its heads.

   Colours: naval grey, salt-weathered. The base tones are the seagrey and
   bluegrey rows of the shared PAINT table taken down to about 0.60 of their
   level, because this renderer's ACES pass lifts a mid grey by roughly 1.8x
   -- a lesson from the hero warships, where a mid grey came back white.
   ========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var AswHelo3D = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------- palette */
  var PAINT = {
    /* USN light gull grey over a salt-bleached airframe */
    seagrey:  { base: 0x565e64, trim: 0x474e53, seed: 4211 },
    /* ROC navy Thunderhawks are a shade darker and much more worn */
    rocgrey:  { base: 0x4e565c, trim: 0x3f464b, seed: 7717 },
    /* Soviet naval blue-grey */
    bluegrey: { base: 0x4b5763, trim: 0x3d4751, seed: 3301 },
    /* PLAN light grey, low contrast */
    plagrey:  { base: 0x545c60, trim: 0x454c50, seed: 8123 },
  };

  /* ------------------------------------------------------------- helpers */
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function rngOf(seed) {
    var s = (seed >>> 0) || 9;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  var TEX = {}, MATS = {};

  function mkTex(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    /* r148 ships SRGBColorSpace but Texture.colorSpace does nothing until
       r152, so the encoding field is the one that actually works here. */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* --- the painted skin.  u runs tail(0) to nose(1) along a loft, v runs
     around it: 0 and 1 are the PORT flank, 0.25 the roof, 0.5 the starboard
     flank, 0.75 the belly.  Everything below is placed against that. --- */
  function skinCanvas(base, trim, seed) {
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, k, u, v;
    function X(uu) { return uu * W; }
    function Y(vv) { return vv * H; }

    g.fillStyle = hx(base); g.fillRect(0, 0, W, H);

    /* sun-bleached roof, grimy belly.  Dirt is heavier low down, which on a
       shipboard machine is salt haze and hydraulic weep rather than mud. */
    g.fillStyle = "rgba(255,255,255,0.055)"; g.fillRect(0, Y(0.17), W, Y(0.16));
    g.fillStyle = "rgba(0,0,0,0.10)";        g.fillRect(0, Y(0.58), W, Y(0.34));
    g.fillStyle = "rgba(0,0,0,0.06)";        g.fillRect(0, Y(0.92), W, Y(0.08));
    g.fillStyle = "rgba(0,0,0,0.05)";        g.fillRect(0, Y(0.00), W, Y(0.05));

    /* panel patchwork: no two adjacent panels weather to the same tone */
    for (i = 0; i < 230; i++) {
      g.globalAlpha = 0.022 + R() * 0.042;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 26 + R() * 120, 10 + R() * 34);
    }
    g.globalAlpha = 1;

    /* longitudinal seams (stringers) with a lit lip above each */
    [0.055, 0.170, 0.330, 0.445, 0.560, 0.665, 0.830, 0.945].forEach(function (vv) {
      g.fillStyle = "rgba(16,20,24,0.30)"; g.fillRect(0, Y(vv), W, 1.6);
      g.fillStyle = "rgba(255,255,255,0.07)"; g.fillRect(0, Y(vv) - 2, W, 1.4);
    });
    /* transverse station seams */
    for (u = 0.035; u < 0.99; u += 0.0455) {
      g.fillStyle = "rgba(16,20,24,0.26)"; g.fillRect(X(u), 0, 1.5, H);
      g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(X(u) + 2, 0, 1.2, H);
    }

    /* cabin door frames, both flanks (v near 0/1 is port, 0.5 starboard) */
    g.lineWidth = 2.2; g.strokeStyle = "rgba(14,18,22,0.55)";
    [[0.335, 0.545]].forEach(function (d) {
      [0.885, 0.385].forEach(function (vv) {
        g.strokeRect(X(d[0]), Y(vv), X(d[1]) - X(d[0]), Y(0.115));
      });
    });
    /* access hatches and inspection panels */
    for (i = 0; i < 26; i++) {
      u = 0.06 + R() * 0.86; v = R();
      var w2 = 12 + R() * 26, h2 = 9 + R() * 16;
      g.strokeStyle = "rgba(14,18,22,0.36)"; g.lineWidth = 1.3;
      g.strokeRect(X(u), Y(v), w2, h2);
      g.fillStyle = "rgba(255,255,255,0.035)"; g.fillRect(X(u), Y(v), w2, 2);
    }

    /* engine soot streaming AFT (toward u = 0) from the deck exhausts */
    for (i = 0; i < 3; i++) {
      var vv0 = [0.150, 0.230, 0.430][i], hgt = [26, 34, 26][i];
      var eg = g.createLinearGradient(X(0.47), 0, X(0.13), 0);
      eg.addColorStop(0, "rgba(22,20,19,0.30)");
      eg.addColorStop(1, "rgba(22,20,19,0.00)");
      g.fillStyle = eg; g.fillRect(X(0.13), Y(vv0), X(0.47) - X(0.13), hgt);
    }

    /* salt haze and spray scouring: pale streaks running aft, worst along
       the lower flanks where the rotor downwash throws seawater up */
    for (i = 0; i < 90; i++) {
      var sx = R() * W, sy = Y(0.50 + R() * 0.46), sl = 26 + R() * 190;
      var sg = g.createLinearGradient(sx, 0, sx - sl, 0);
      sg.addColorStop(0, "rgba(226,231,234," + (0.05 + R() * 0.10).toFixed(3) + ")");
      sg.addColorStop(1, "rgba(226,231,234,0)");
      g.fillStyle = sg; g.fillRect(sx - sl, sy, sl, 1.6 + R() * 3.4);
    }
    /* and the same on the upper flanks, thinner */
    for (i = 0; i < 46; i++) {
      var tx = R() * W, ty = Y(0.03 + R() * 0.34), tl = 20 + R() * 120;
      var tg = g.createLinearGradient(tx, 0, tx - tl, 0);
      tg.addColorStop(0, "rgba(216,222,226,0.07)");
      tg.addColorStop(1, "rgba(216,222,226,0)");
      g.fillStyle = tg; g.fillRect(tx - tl, ty, tl, 1.4 + R() * 2.2);
    }

    /* hydraulic and gearbox weep running down from the roof and the pylons */
    for (i = 0; i < 22; i++) {
      var wx = R() * W, wy = Y(0.30 + R() * 0.30), wl = 14 + R() * 46;
      var wg = g.createLinearGradient(0, wy, 0, wy + wl);
      wg.addColorStop(0, "rgba(38,32,26,0.34)");
      wg.addColorStop(1, "rgba(38,32,26,0.00)");
      g.fillStyle = wg; g.fillRect(wx, wy, 3 + R() * 4, wl);
    }

    /* walkway / no-step trim along the spine and round the doors */
    g.fillStyle = hx(trim);
    g.fillRect(X(0.30), Y(0.215), X(0.30), Y(0.070));
    g.globalAlpha = 0.55;
    g.fillRect(X(0.33), Y(0.878), X(0.215), 3);
    g.fillRect(X(0.33), Y(0.378), X(0.215), 3);
    g.globalAlpha = 1;

    /* a few stencils.  At RTS zoom they are dashes; up close they are marks */
    g.fillStyle = "rgba(228,232,235,0.55)";
    g.font = "bold 11px monospace";
    g.fillText("RESCUE", X(0.565), Y(0.925));
    g.fillText("RESCUE", X(0.565), Y(0.425));
    g.fillText("NO STEP", X(0.235), Y(0.205));
    g.fillStyle = "rgba(196,72,54,0.60)";
    g.fillRect(X(0.548), Y(0.888), 26, 4);
    g.fillRect(X(0.548), Y(0.388), 26, 4);

    return cv;
  }

  function skin(THREE, camo) {
    var k = "sk_" + camo;
    if (MATS[k]) return MATS[k];
    var P = PAINT[camo] || PAINT.seagrey;
    if (!TEX[k]) TEX[k] = mkTex(THREE, skinCanvas(P.base, P.trim, P.seed));
    MATS[k] = done(new THREE.MeshStandardMaterial({
      color: 0xffffff, map: TEX[k], roughness: 0.88, metalness: 0.06,
      side: THREE.DoubleSide }));
    return MATS[k];
  }

  /* Every material this file makes goes through here.
     render3d.js's prepModel converts each material colour from sRGB to
     linear once and stamps userData._srgbDone so it never does it twice.
     The comparison harness does NOT, so a plain colour that looked right in
     the game came out a full stop lighter in cmp.html and no tone could be
     right in both. Doing the conversion here and stamping the same flag
     settles it: prepModel skips these, and the two renderers agree. */
  function done(m) {
    if (m.color && m.color.convertSRGBToLinear) m.color.convertSRGBToLinear();
    m.userData._srgbDone = true;
    return m;
  }

  /* flat SKIN-tier material for slabs and small fairings, where a lofted
     UV would sample a metre of texture across a 20 cm part */
  function fm(THREE, c, r, m) {
    var k = "f" + c + "_" + r + "_" + m;
    if (!MATS[k]) MATS[k] = done(new THREE.MeshStandardMaterial({
      color: c, roughness: r, metalness: m, side: THREE.DoubleSide }));
    return MATS[k];
  }
  /* A flat material's colour and a colour baked into a CanvasTexture do NOT
     come out of this renderer at the same level: the map is decoded from sRGB
     on the way in, the plain colour is taken as linear, so an unmapped 0x565e64
     lands a full stop lighter than the same grey painted into the skin. Every
     flat tone below is therefore the tone I want, dimmed by DIM, which is what
     it took to make a fin panel sit with the fuselage it is bolted to. */
  function paintOf(THREE, camo) { var P = PAINT[camo] || PAINT.seagrey; return fm(THREE, P.base, 0.88, 0.07); }
  function trimOf(THREE, camo)  { var P = PAINT[camo] || PAINT.seagrey; return fm(THREE, P.trim, 0.86, 0.08); }
  function metalOf(THREE)  { return fm(THREE, 0x6b7278, 0.52, 0.55); }
  function steelOf(THREE)  { return fm(THREE, 0x4b5156, 0.58, 0.45); }
  function darkOf(THREE)   { return fm(THREE, 0x2b2f32, 0.62, 0.38); }
  function bladeOf(THREE)  { return fm(THREE, 0x24272a, 0.90, 0.08); }
  function rubberOf(THREE) { return fm(THREE, 0x141618, 0.94, 0.03); }
  function domeOf(THREE)   { return fm(THREE, 0x3a4145, 0.86, 0.06); }
  function glassOf(THREE) {
    if (!MATS.glass) MATS.glass = done(new THREE.MeshPhysicalMaterial({
      color: 0x1a2830, roughness: 0.12, metalness: 0.28, clearcoat: 1,
      transparent: true, opacity: 0.84, side: THREE.DoubleSide }));
    return MATS.glass;
  }

  /* ------------------------------------------------------ geometry sugar */
  function A(parent, geo, mat, x, y, z, rx, ry, rz) {
    var m = new THREE.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    if (rx) m.rotation.x = rx;
    if (ry) m.rotation.y = ry;
    if (rz) m.rotation.z = rz;
    parent.add(m);
    return m;
  }
  /* THREE and the models3d.js helper set are handed to build() by the
     renderer rather than being globals we can close over at load time, so
     they are bound here on the way in and every helper below reads them.
     Same objects every call; nothing is cached across two different THREE. */
  var THREE = null, MOD = null;
  function box(dx, dy, dz) { return new THREE.BoxGeometry(dx, dy, dz); }
  function cyl(r0, r1, h, seg, axis) {
    var g = new THREE.CylinderGeometry(r0, r1, h, seg);
    if (axis === "x") g.rotateZ(PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return g;
  }
  function sph(r, w, h) { return new THREE.SphereGeometry(r, w, h); }
  function loftM(rows, segs, mat, dy) {
    var s = [], i;
    for (i = 0; i < rows.length; i++)
      s.push({ x: rows[i][0], w: rows[i][1], h: rows[i][2], zc: rows[i][3],
               sq: rows[i][4] === undefined ? 0.9 : rows[i][4] });
    var geo = MOD.loft(THREE, s, segs);
    if (dy) geo.translate(0, dy, 0);
    return new THREE.Mesh(geo, mat);
  }
  /* a vertical surface: pts are [x, z], extruded across the aircraft */
  function finSlab(pts, thick, mat, y0) {
    var m = new THREE.Mesh(MOD.slab(THREE, pts, thick, "xz"), mat);
    m.position.y = (y0 || 0) + thick * 0.5;
    return m;
  }
  /* a horizontal surface: pts are [x, y], extruded upward */
  function plateSlab(pts, thick, mat, z0) {
    var m = new THREE.Mesh(MOD.slab(THREE, pts, thick), mat);
    m.position.z = (z0 || 0) - thick * 0.5;
    return m;
  }

  /* ====================================================== the ASW kit ====
     These four fittings are the reason this file exists. They are shared by
     all three airframes and simply anchored differently on each. Starboard
     is -Y, port is +Y. */

  /* --- 1. DIPPING SONAR.  A reeling machine in a fairing on the starboard
     cabin side, the cable drum under it, and the transducer body stowed up
     against the hull. On an MH-60R this is the AN/AQS-22 ALFS; on a Ka-27PL
     the VGS-3; on a Z-9C the KLC-1's companion dipper. What matters at any
     zoom is that something heavy and round hangs on the right-hand side. */
  function dippingSonar(g, camo, X, Y0, Z, s) {
    var sk = paintOf(THREE, camo), mt = metalOf(THREE), dk = darkOf(THREE);
    var dm = domeOf(THREE), st = steelOf(THREE);
    var yo = Y0 - 0.34 * s;                       /* fairing centreline */
    /* mounting plate against the fuselage */
    A(g, box(1.45 * s, 0.12 * s, 0.66 * s), sk, X, Y0 + 0.05 * s, Z);
    /* the reeling machine fairing */
    A(g, cyl(0.31 * s, 0.31 * s, 1.20 * s, 12, "x"), sk, X, yo, Z);
    var c1 = A(g, sph(0.31 * s, 8, 6), sk, X + 0.60 * s, yo, Z);
    c1.scale.set(0.75, 1, 1);
    var c2 = A(g, sph(0.31 * s, 8, 6), sk, X - 0.60 * s, yo, Z);
    c2.scale.set(0.75, 1, 1);
    /* cable drum, half out of the fairing, and the guide sheave */
    A(g, cyl(0.23 * s, 0.23 * s, 0.52 * s, 10, "x"), mt, X - 0.05 * s, yo - 0.16 * s, Z - 0.22 * s);
    A(g, cyl(0.09 * s, 0.09 * s, 0.10 * s, 8, "x"), st, X + 0.52 * s, yo - 0.18 * s, Z - 0.24 * s);
    /* two struts back to the hull */
    A(g, box(0.10 * s, 0.42 * s, 0.12 * s), st, X + 0.44 * s, Y0 - 0.16 * s, Z - 0.20 * s);
    A(g, box(0.10 * s, 0.42 * s, 0.12 * s), st, X - 0.44 * s, Y0 - 0.16 * s, Z - 0.20 * s);
    /* the cable, and the transducer stowed on the end of it */
    var dz = Z - 0.62 * s;
    A(g, cyl(0.022 * s, 0.022 * s, 0.34 * s, 6, "z"), st, X + 0.05 * s, yo - 0.16 * s, Z - 0.40 * s);
    A(g, cyl(0.29 * s, 0.26 * s, 0.10 * s, 12, "z"), st, X + 0.05 * s, yo - 0.16 * s, dz + 0.02 * s);
    A(g, cyl(0.25 * s, 0.25 * s, 0.42 * s, 12, "z"), dm, X + 0.05 * s, yo - 0.16 * s, dz - 0.22 * s);
    var bl = A(g, sph(0.25 * s, 12, 6), dm, X + 0.05 * s, yo - 0.16 * s, dz - 0.43 * s);
    bl.scale.set(1, 1, 0.72);
    /* the transducer's ring of staves, dark, so the dome reads as sonar */
    A(g, cyl(0.26 * s, 0.26 * s, 0.09 * s, 12, "z"), dk, X + 0.05 * s, yo - 0.16 * s, dz - 0.30 * s);
  }

  /* --- 2. SONOBUOY LAUNCHER.  A pressurised rack of tubes down the port
     flank, tube mouths outboard and slightly aft. Twenty-five on an MH-60R,
     fewer on the smaller machines. Nothing else on a helicopter looks like
     a grid of round holes in a plate. */
  function sonobuoyRack(g, camo, X, Y0, Z, cols, rows, s) {
    var sk = trimOf(THREE, camo), dk = darkOf(THREE), st = steelOf(THREE);
    var pw = cols * 0.40 * s, ph = rows * 0.26 * s;
    A(g, box(pw + 0.14 * s, 0.10 * s, ph + 0.12 * s), sk, X, Y0 + 0.05 * s, Z);
    /* top and bottom rails */
    A(g, box(pw + 0.20 * s, 0.16 * s, 0.07 * s), st, X, Y0 + 0.12 * s, Z + ph * 0.5 + 0.06 * s);
    A(g, box(pw + 0.20 * s, 0.16 * s, 0.07 * s), st, X, Y0 + 0.12 * s, Z - ph * 0.5 - 0.06 * s);
    /* one dark tube per cell: the open mouth is the cylinder's own cap, so
       the grid costs 24 triangles a tube and still reads as a row of holes */
    var i, j, tg = cyl(0.092 * s, 0.092 * s, 0.30 * s, 6, "y");
    for (i = 0; i < cols; i++) {
      for (j = 0; j < rows; j++) {
        var tx = X + (i - (cols - 1) * 0.5) * 0.40 * s;
        var tz = Z + (j - (rows - 1) * 0.5) * 0.26 * s;
        A(g, tg, dk, tx, Y0 + 0.22 * s, tz);
      }
    }
  }

  /* --- 3. LIGHTWEIGHT TORPEDO on its pylon.  Mk 54 (2.72 m), Yu-7 (2.70 m)
     or APR-3 (3.68 m, but carried short). A 324 mm fish is small next to the
     airframe, so the pylon and the sway braces do as much of the reading as
     the weapon does. */
  function torpedo(g, camo, X, Y0, Z, len, kind) {
    var sk = paintOf(THREE, camo), st = steelOf(THREE), dk = darkOf(THREE);
    var body = kind === "apr" ? fm(THREE, 0x555f52, 0.84, 0.10)
                              : fm(THREE, 0x5d6469, 0.80, 0.12);
    var warh = fm(THREE, 0x2a2e31, 0.72, 0.16);
    var band = fm(THREE, 0x8a5a26, 0.82, 0.10);    /* warshot marking band */
    var yo = Y0 - 0.02;
    /* pylon: a strut off the cabin side and the rack beam under it */
    var sgn = Y0 > 0 ? 1 : -1;
    A(g, box(0.46, 0.40, 0.66), sk, X, Y0 - sgn * 0.24, Z + 0.64);
    A(g, box(1.35, 0.16, 0.20), st, X, yo, Z + 0.30);
    A(g, box(0.12, 0.30, 0.24), st, X + 0.40, yo, Z + 0.16);
    A(g, box(0.12, 0.30, 0.24), st, X - 0.40, yo, Z + 0.16);
    /* the fish */
    var r = 0.163, hl = len * 0.5;
    var rows = [
      [-hl,            0.045, 0.045, 0, 1.0],
      [-hl + len*0.10, 0.115, 0.115, 0, 1.0],
      [-hl + len*0.22, 0.150, 0.150, 0, 1.0],
      [-hl + len*0.55, r,     r,     0, 1.0],
      [ hl - len*0.16, r,     r,     0, 1.0],
      [ hl - len*0.05, 0.128, 0.128, 0, 1.0],
      [ hl,            0.040, 0.040, 0, 1.0],
    ];
    var f = loftM(rows, 12, body);
    f.position.set(X, yo, Z);
    g.add(f);
    /* nose cap (sonar transducer) and the warhead band */
    A(g, sph(0.13, 10, 6), warh, X + hl - len * 0.045, yo, Z);
    A(g, cyl(0.168, 0.168, 0.22, 10, "x"), band, X + hl - len * 0.30, yo, Z);
    /* four tail fins in the X pattern, and the shrouded propulsor */
    var i, ang;
    for (i = 0; i < 4; i++) {
      ang = PI * 0.25 + i * PI * 0.5;
      A(g, box(0.44, 0.030, 0.40), dk, X - hl + len * 0.13, yo, Z, ang);
    }
    A(g, cyl(0.105, 0.085, 0.16, 10, "x"), st, X - hl + 0.03, yo, Z);
  }

  /* --- 4. the surface-search RADOME under the nose or the chin. */
  function chinRadome(g, X, Z, len, wid, dep, camo) {
    var dm = fm(THREE, 0x3c4347, 0.84, 0.05);
    var sk = paintOf(THREE, camo);
    var r = A(g, sph(0.5, 14, 9), dm, X, 0, Z);
    r.scale.set(len / 1.0, wid / 1.0, dep / 1.0);
    /* the fairing lip where the radome meets the hull */
    A(g, box(len * 0.92, wid * 0.94, 0.10), sk, X, 0, Z + dep * 0.46);
  }

  /* ================================================== rotor systems ======
     See the header: each disc lives inside a mount group turned +PI/2 about
     X so that the renderer's world-axis spin lands on the mast. Inside the
     mount the assembly is Y-UP: hub axis along local +Y, blades in the
     local XZ plane. */
  function mount(g, x, z, name) {
    var w = new THREE.Group();
    w.position.set(x, 0, z);
    w.rotation.x = PI / 2;
    g.add(w);
    var r = new THREE.Group();
    r.name = name;
    w.add(r);
    return r;
  }

  /* A NAVAL rotor head: elastomeric hub, blade-fold cuffs with their hinge
     pins, pitch links, lag dampers and - on a Hawk - the bifilar absorber
     spinning on top of it all. It is the busiest thing on the aircraft and
     it sits dead centre of the top-down view a player actually gets. */
  function mainRotor(g, x, z, R, n, opt) {
    opt = opt || {};
    /* opt.into builds this head into an existing rotor group instead of
       claiming a mount of its own. A coaxial pair needs that: findPart takes
       the FIRST node called "rotor" and spins only that one, so two separately
       named heads would leave the upper one frozen over a turning lower one.
       Both heads therefore hang off one group and turn together. */
    var rot = opt.into || mount(g, x, z, "rotor");
    var mt = metalOf(THREE), dk = darkOf(THREE), bd = bladeOf(THREE);
    var tip = fm(THREE, opt.tip || 0xd2d7d9, 0.70, 0.10);
    var s = opt.s || 1;

    A(rot, cyl(0.30 * s, 0.36 * s, 0.36 * s, 12), dk, 0, 0, 0);
    A(rot, cyl(0.44 * s, 0.44 * s, 0.09 * s, 14), mt, 0, -0.26 * s, 0);  /* swashplate */
    A(rot, cyl(0.16 * s, 0.16 * s, 0.30 * s, 8), mt, 0, -0.42 * s, 0);   /* stationary scissors */

    var i, a, bg;
    for (i = 0; i < n; i++) {
      a = i * PI * 2 / n;
      /* one group per blade: azimuth on the group, droop on the blade, so
         the coning stays in the blade's own frame at every azimuth */
      bg = new THREE.Group();
      bg.rotation.y = -a;
      rot.add(bg);
      /* fold cuff and hinge pin - the naval giveaway */
      A(bg, box(0.52 * s, 0.22 * s, 0.20 * s), mt, 0.46 * s, 0.02 * s, 0);
      A(bg, cyl(0.055 * s, 0.055 * s, 0.32 * s, 6), dk, 0.66 * s, 0.02 * s, 0);
      /* pitch link down to the swashplate, and the lag damper */
      A(bg, cyl(0.030 * s, 0.030 * s, 0.34 * s, 5), mt, 0.40 * s, -0.16 * s, 0.20 * s);
      A(bg, box(0.30 * s, 0.10 * s, 0.10 * s), dk, 0.34 * s, -0.06 * s, -0.20 * s);
      /* the blade, hung off a droop group hinged at the hub so that the
         whole span falls away together instead of pivoting mid-blade */
      var span = R - 0.80 * s, ch = opt.chord || 0.53;
      var dr = new THREE.Group();
      dr.rotation.z = -0.030;
      bg.add(dr);
      A(dr, box(span, 0.085, ch), bd, 0.80 * s + span * 0.5, 0.02 * s, 0);
      /* painted tip cap: white on a Hawk, red on a Kamov */
      A(dr, box(0.34, 0.088, ch * 0.99), tip, R - 0.14, 0.02 * s, 0);
      /* trailing-edge tab, so the blade is not a plain bar in a still frame */
      A(dr, box(span * 0.55, 0.03, ch * 0.22), dk, 0.80 * s + span * 0.55,
        0.02 * s, -ch * 0.58);
    }

    if (opt.bifilar) {
      /* the H-60's bifilar vibration absorber: four weights on a spider,
         turning above the head. Unmistakable from above. */
      A(rot, cyl(0.20 * s, 0.20 * s, 0.13 * s, 10), mt, 0, 0.30 * s, 0);
      for (i = 0; i < 4; i++) {
        a = i * PI * 0.5 + PI * 0.25;
        A(rot, box(0.44 * s, 0.07 * s, 0.09 * s), mt,
          Math.cos(a) * 0.30 * s, 0.34 * s, -Math.sin(a) * 0.30 * s, 0, -a, 0);
        A(rot, cyl(0.09 * s, 0.09 * s, 0.13 * s, 6), dk,
          Math.cos(a) * 0.52 * s, 0.34 * s, -Math.sin(a) * 0.52 * s);
      }
    }
    if (opt.cap) {                        /* Kamov hub cap over the top head */
      var c = A(rot, sph(0.30 * s, 10, 6), fm(THREE, 0x4a5257, 0.80, 0.12), 0, 0.30 * s, 0);
      c.scale.set(1, 0.7, 1);
    }
    /* the faint disc a turning rotor reads as from above.  A coaxial pair
       stacks two of them, so the upper head goes without. */
    if (!opt.nodisc) {
      /* named so render3d.js can fade it with rotor speed - a parked machine
         must not sit on a grey ellipse */
      var mainDisc = A(rot, cyl(R, R, 0.004, 20), done(new THREE.MeshStandardMaterial({
        color: 0xd6dde3, roughness: 0.4, metalness: 0.08, transparent: true,
        opacity: 0.045, depthWrite: false })), 0, 0.04, 0);
      if (mainDisc) mainDisc.name = "rotordisc";
    }
    return rot;
  }

  /* Tail rotor. The mount is the same +PI/2 group, so inside it the hub axis
     runs along local Z (which lands on the model's lateral axis) and the
     blades sweep the local XY plane. */
  function tailRotor(g, x, y, z, R, n) {
    var w = new THREE.Group();
    w.position.set(x, y, z);
    w.rotation.x = PI / 2;
    g.add(w);
    var rot = new THREE.Group();
    rot.name = "tailrotor";
    w.add(rot);
    var mt = metalOf(THREE), bd = bladeOf(THREE);
    A(rot, cyl(0.13, 0.13, 0.26, 10, "z"), darkOf(THREE), 0, 0, 0);
    A(rot, cyl(0.20, 0.20, 0.07, 10, "z"), mt, 0, 0, 0.13);
    var i, a, span = R - 0.20;
    for (i = 0; i < n; i++) {
      a = i * PI * 2 / n;
      var bgg = new THREE.Group();
      bgg.rotation.z = a;
      rot.add(bgg);
      A(bgg, box(span, 0.185, 0.045), bd, 0.20 + span * 0.5, 0, 0, 0.32);
      A(bgg, box(0.10, 0.20, 0.11), mt, 0.17, 0, 0);
    }
    var tailDisc = A(rot, cyl(R, R, 0.003, 14, "z"), done(new THREE.MeshStandardMaterial({
      color: 0xd6dde3, roughness: 0.4, transparent: true, opacity: 0.05,
      depthWrite: false })), 0, 0, 0.02);
    if (tailDisc) tailDisc.name = "rotordisc";
    return rot;
  }

  /* The fenestron: eleven short blades on a fat hub, buried in a shroud in
     the fin. The whole point is that there is no disc hanging in the air. */
  function fenestron(g, x, z, ro, n, camo) {
    var sk = paintOf(THREE, camo), mt = metalOf(THREE), bd = bladeOf(THREE);
    var ri = ro * 0.80;
    /* the shroud: a torus round the duct, plus the duct wall itself */
    /* the torus is born in the XY plane with its hole along Z; the duct runs
       ACROSS the aircraft, so it turns about X, not about Y */
    var t = A(g, new THREE.TorusGeometry(ro * 0.90, ro * 0.20, 8, 18), sk, x, 0, z, PI / 2, 0, 0);
    A(g, cyl(ri, ri, ro * 0.44, 16, "y"), fm(THREE, 0x373d41, 0.86, 0.10), x, 0, z);
    var w = new THREE.Group();
    w.position.set(x, 0, z);
    w.rotation.x = PI / 2;
    g.add(w);
    var rot = new THREE.Group();
    rot.name = "tailrotor";
    w.add(rot);
    A(rot, cyl(ri * 0.42, ri * 0.42, ro * 0.34, 10, "z"), mt, 0, 0, 0);
    A(rot, sph(ri * 0.36, 8, 6), mt, 0, 0, ro * 0.20);
    var i;
    for (i = 0; i < n; i++) {
      var a = i * PI * 2 / n;
      var bgg = new THREE.Group();
      bgg.rotation.z = a;
      rot.add(bgg);
      A(bgg, box(ri * 0.58, ri * 0.30, 0.035), bd, ri * 0.70, 0, 0, 0.55);
    }
    return t;
  }

  /* ------------------------------------------------------- undercarriage */
  function wheel(gear, x, y, z, r, wid, seg) {
    A(gear, cyl(r, r, wid, seg || 14, "y"), rubberOf(THREE), x, y, z);
    A(gear, cyl(r * 0.45, r * 0.45, wid + 0.03, 8, "y"), metalOf(THREE), x, y, z);
  }

  /* ==================================================================== */
  /*  AIRFRAME 1: the naval H-60 -- MH-60R Seahawk, S-70C(M) Thunderhawk   */
  /*                                                                      */
  /*  15.26 m fuselage, 16.36 m four-blade rotor, 3.35 m canted four-blade */
  /*  tail rotor on the port side of a folding pylon, wide-track wheels    */
  /*  with the tailwheel moved FORWARD for deck landings. Datum x = 0 at   */
  /*  the main rotor mast.                                                 */
  /* ==================================================================== */
  function buildH60(C, S) {
    var g = new THREE.Group(), camo = S.camo;
    var sk = skin(THREE, camo), fl = paintOf(THREE, camo), tr = trimOf(THREE, camo);
    var mt = metalOf(THREE), st = steelOf(THREE), dk = darkOf(THREE), gl = glassOf(THREE);
    var s2;

    /* ---- fuselage: slab-sided cabin (2.36 m across), drooped nose ---- */
    g.add(loftM([
      [-3.20, 0.34, 0.36,  0.34, 0.90],
      [-2.55, 0.62, 0.62,  0.24, 0.72],
      [-1.85, 0.92, 0.85,  0.12, 0.56],
      [-1.00, 1.13, 0.97,  0.03, 0.42],
      [ 0.20, 1.19, 1.02,  0.00, 0.38],
      [ 1.70, 1.19, 1.02,  0.00, 0.38],
      [ 3.10, 1.16, 1.00,  0.00, 0.44],
      [ 4.20, 1.05, 0.92, -0.03, 0.60],
      [ 5.15, 0.86, 0.76, -0.10, 0.72],
      [ 5.95, 0.55, 0.52, -0.22, 0.85],
      [ 6.55, 0.16, 0.20, -0.34, 1.00],
    ], 20, sk));

    /* ---- tail boom, folding pylon, stabilator ---- */
    g.add(loftM([
      [-7.70, 0.17, 0.19, 0.72, 0.90],
      [-6.30, 0.23, 0.25, 0.60, 0.88],
      [-4.80, 0.29, 0.31, 0.48, 0.88],
      [-3.20, 0.34, 0.36, 0.34, 0.90],
    ], 14, sk));
    /* the pylon fold hinge ring - a naval Hawk folds here to fit a hangar */
    A(g, cyl(0.25, 0.25, 0.11, 12, "x"), tr, -6.45, 0, 0.615);
    /* drive shaft covers along the spine of the boom */
    A(g, box(1.00, 0.22, 0.12), tr, -4.30, 0, 0.80);
    A(g, box(1.00, 0.20, 0.11), tr, -5.45, 0, 0.89);
    /* the swept pylon, canted like the real one; see the note on the tail
       rotor below for why the DISC itself is left square to the aircraft */
    g.add(finSlab([
      [-6.40, 0.62], [-7.45, 2.10], [-7.92, 2.52], [-8.58, 2.44],
      [-8.46, 1.45], [-7.28, 0.52],
    ], 0.30, fl, -0.15));
    A(g, box(0.58, 0.56, 0.60), fl, -8.10, 0.14, 2.26, 0, 0, 0);   /* TR gearbox */
    g.add(plateSlab([
      [-7.85, 2.19], [-7.85, -2.19], [-6.98, -2.19], [-6.98, 2.19],
    ], 0.14, fl, 0.74));
    /* stabilator endplate stiffeners, small but they break the slab up */
    A(g, box(0.86, 0.06, 0.24), tr, -7.42,  2.15, 0.84);
    A(g, box(0.86, 0.06, 0.24), tr, -7.42, -2.15, 0.84);

    /* ---- transmission deck and the two T700s ---- */
    A(g, box(1.85, 1.16, 0.54), fl, 0.30, 0, 1.22);
    A(g, cyl(0.19, 0.23, 0.62, 10), dk, 0.35, 0, 1.68);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      g.add(loftM([
        [-0.70, 0.30, 0.30, 1.20, 0.70],
        [ 0.30, 0.43, 0.41, 1.24, 0.60],
        [ 1.55, 0.43, 0.41, 1.24, 0.60],
        [ 2.32, 0.35, 0.34, 1.20, 0.75],
      ], 12, sk, s2 * 0.80));
      /* inlet particle separator, its plenum and the exhaust */
      A(g, cyl(0.35, 0.33, 0.30, 12, "x"), fl, 2.46, s2 * 0.80, 1.21);
      A(g, cyl(0.29, 0.29, 0.05, 12, "x"), dk, 2.60, s2 * 0.80, 1.21);
      A(g, cyl(0.27, 0.24, 0.42, 10, "x"), dk, -0.88, s2 * 0.92, 1.24, 0, 0, s2 * 0.10);
      A(g, box(0.55, 0.30, 0.30), tr, -0.35, s2 * 0.96, 1.30);
    }

    /* ---- main rotor: four blades, bifilar absorber, fold cuffs ---- */
    mainRotor(g, 0.35, 2.00, S.rotorD * 0.5, 4, { bifilar: true, chord: 0.53, tip: 0xd2d7d9 });

    /* ---- tail rotor.  The real one is canted 20 deg, but the renderer
       spins this part about a fixed world axis, so a canted disc would
       tumble instead of turn; the PYLON carries the cant and the disc
       stays square. Nobody can measure it at RTS zoom. ---- */
    tailRotor(g, -8.15, 0.50, 2.26, 1.68, 4);

    /* ---- glazing ---- */
    for (s2 = -1; s2 <= 1; s2 += 2) {
      A(g, box(0.07, 0.74, 1.28), gl, 5.02, s2 * 0.40, 0.16, 0, -0.55, 0);
      A(g, box(0.86, 0.52, 0.07), gl, 5.38, s2 * 0.33, -0.62, 0, 0.30, 0);
      A(g, box(1.05, 0.06, 0.62), gl, 4.42, s2 * 0.92, 0.06);
      A(g, box(1.10, 0.05, 0.62), gl, 0.85, s2 * 1.185, 0.30);
      A(g, box(0.76, 0.05, 0.52), gl, -1.45, s2 * 1.155, 0.32);
    }
    /* windscreen centre post and wipers */
    A(g, box(0.10, 0.10, 1.30), tr, 5.02, 0, 0.16, 0, -0.55, 0);

    /* ---- nose kit: chin radar, FLIR, ESM, wire cutters ---- */
    chinRadome(g, 4.30, -1.06, 1.95, 1.28, 0.58, camo);
    A(g, sph(0.27, 10, 8), dk, 5.62, 0, -0.70);
    A(g, cyl(0.17, 0.17, 0.16, 10), tr, 5.62, 0, -0.50);
    if (S.esm) for (s2 = -1; s2 <= 1; s2 += 2) {
      A(g, cyl(0.17, 0.15, 0.62, 8, "x"), fl, 5.05, s2 * 0.80, -0.30);
      A(g, sph(0.16, 8, 6), fl, 5.36, s2 * 0.80, -0.30);
    }
    g.add(finSlab([[5.25, 0.60], [5.72, 0.63], [5.25, 0.90]], 0.06, dk));
    g.add(finSlab([[5.15, -0.86], [5.60, -0.89], [5.15, -1.12]], 0.06, dk));
    /* pitot booms */
    A(g, cyl(0.035, 0.035, 0.70, 6, "x"), mt, 6.05, 0.62, 0.10);
    A(g, cyl(0.035, 0.035, 0.70, 6, "x"), mt, 6.05, -0.62, 0.10);

    /* ---- rescue hoist over the starboard cabin door ---- */
    A(g, box(0.24, 0.95, 0.22), tr, 1.65, -1.55, 0.88);
    A(g, cyl(0.21, 0.21, 0.44, 10, "x"), mt, 1.65, -1.90, 0.82);
    A(g, cyl(0.05, 0.05, 0.30, 6), st, 1.85, -1.98, 0.60);

    /* ---- undercarriage ---- */
    var gear = new THREE.Group();
    gear.name = "gear";
    g.add(gear);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      wheel(gear, 1.15, s2 * 1.34, -1.94, 0.37, 0.26, 14);
      A(gear, box(0.22, 0.18, 1.15), st, 1.15, s2 * 1.22, -1.36);
      A(gear, box(0.95, 0.14, 0.13), st, 0.72, s2 * 1.16, -1.20, 0, 0.55, 0);
      A(gear, cyl(0.10, 0.10, 0.40, 8, "y"), mt, 1.15, s2 * 1.22, -1.86);
    }
    wheel(gear, -2.70, 0, -2.03, 0.28, 0.20, 12);
    A(gear, box(0.16, 0.60, 0.16), st, -2.70, 0, -1.86);
    A(gear, cyl(0.10, 0.10, 1.30, 8), st, -2.70, 0, -1.22);
    A(gear, box(0.66, 0.12, 0.12), st, -2.38, 0, -1.05, 0, -0.75, 0);

    /* ---- THE ASW KIT ---- */
    dippingSonar(g, camo, 0.10, -1.22, -0.28, 1.0);
    sonobuoyRack(g, camo, -0.75, 1.20, -0.06, S.buoys[0], S.buoys[1], 1.0);
    torpedo(g, camo, 2.05, 1.66, -1.18, S.torpLen, S.torp);
    if (S.mad) {
      /* the towed MAD bird, stowed on its cradle aft on the starboard side */
      A(g, cyl(0.16, 0.16, 1.05, 10, "x"), fm(THREE, 0x63483a, 0.84, 0.10), -1.95, -1.14, -0.46);
      A(g, sph(0.16, 8, 6), fm(THREE, 0x63483a, 0.84, 0.10), -2.48, -1.14, -0.46);
      A(g, box(0.20, 0.26, 0.30), st, -1.55, -1.10, -0.38);
    }

    /* ---- aerials, and the team flash ---- */
    A(g, box(0.30, 0.05, 0.30), dk, -0.60, 0, -1.06);
    A(g, box(0.26, 0.05, 0.26), dk, 3.10, 0, -1.02);
    A(g, box(0.22, 0.05, 0.26), dk, -5.00, 0, 0.98);
    var tm = done(new THREE.MeshStandardMaterial({
      color: new THREE.Color(C && C.team !== undefined ? C.team : 0x7f8c99),
      roughness: 0.58, metalness: 0.22, side: THREE.DoubleSide }));
    A(g, box(0.12, 0.40, 0.62), tm, -8.30, 0, 1.72);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      A(g, box(1.05, 0.05, 0.20), tm, 3.35, s2 * 1.145, 0.42);
      A(g, box(0.50, 0.05, 0.16), tm, -2.30, s2 * 0.78, 0.36);
    }
    return g;
  }

  /* ==================================================================== */
  /*  AIRFRAME 2: Kamov Ka-27PL Helix                                     */
  /*                                                                      */
  /*  11.3 m of fuselage and 15.9 m of rotor: the stubbiest thing in the  */
  /*  air. Two three-blade contra-rotating heads on one mast and NO tail  */
  /*  rotor - the torque is cancelled between them - so the tail carries  */
  /*  twin endplate fins instead. Four fixed wheels, a bulbous chin       */
  /*  radome, and the MAD fairing under the rear fuselage.                */
  /* ==================================================================== */
  function buildKa27(C, S) {
    var g = new THREE.Group(), camo = S.camo;
    var sk = skin(THREE, camo), fl = paintOf(THREE, camo), tr = trimOf(THREE, camo);
    var mt = metalOf(THREE), st = steelOf(THREE), dk = darkOf(THREE), gl = glassOf(THREE);
    var s2, R = S.rotorD * 0.5;

    /* ---- the whale: short, deep and square in section ---- */
    g.add(loftM([
      [-3.40, 0.36, 0.38,  0.40, 0.88],
      [-2.60, 0.66, 0.70,  0.26, 0.62],
      [-1.60, 0.94, 0.98,  0.10, 0.48],
      [-0.40, 1.06, 1.06,  0.02, 0.42],
      [ 1.10, 1.08, 1.08,  0.00, 0.40],
      [ 2.30, 1.06, 1.04,  0.00, 0.44],
      [ 3.20, 0.99, 0.96, -0.04, 0.52],
      [ 3.90, 0.85, 0.82, -0.14, 0.66],
      [ 4.45, 0.58, 0.58, -0.28, 0.82],
      [ 4.80, 0.24, 0.30, -0.40, 1.00],
    ], 20, sk));
    g.add(loftM([
      [-6.10, 0.16, 0.18, 0.80, 0.90],
      [-5.00, 0.23, 0.25, 0.62, 0.88],
      [-3.40, 0.36, 0.38, 0.40, 0.88],
    ], 14, sk));

    /* ---- tailplane with the twin canted endplate fins ---- */
    g.add(plateSlab([
      [-5.70, 1.82], [-5.70, -1.82], [-4.70, -1.82], [-4.70, 1.82],
    ], 0.13, fl, 0.72));
    for (s2 = -1; s2 <= 1; s2 += 2) {
      var fin = finSlab([
        [-4.62, 0.70], [-5.30, 2.25], [-6.05, 2.18], [-5.92, 0.70],
      ], 0.15, fl, s2 * 1.74 - 0.075);
      fin.rotation.x = -s2 * 0.26;                 /* tops leaning outboard */
      g.add(fin);
      /* rudder hinge fairing, so the fin is not a bare slab edge-on */
      A(g, box(0.26, 0.11, 1.30), tr, -5.95, s2 * 1.90, 1.45);
    }
    /* the MAD fairing slung under the rear fuselage - a Helix signature */
    A(g, cyl(0.20, 0.20, 1.30, 10, "x"), fl, -2.95, -0.34, -0.48);
    A(g, sph(0.20, 8, 6), fl, -3.60, -0.34, -0.48);
    A(g, sph(0.20, 8, 6), fl, -2.30, -0.34, -0.48);

    /* ---- the two TV3-117s, side by side on the roof, and the coaxial
       mast standing between the heads ---- */
    A(g, box(2.20, 1.85, 0.52), fl, 1.45, 0, 1.30);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      g.add(loftM([
        [ 0.30, 0.36, 0.34, 1.40, 0.60],
        [ 1.20, 0.45, 0.43, 1.44, 0.55],
        [ 2.35, 0.45, 0.43, 1.44, 0.55],
        [ 2.95, 0.34, 0.34, 1.38, 0.75],
      ], 12, sk, s2 * 0.56));
      A(g, cyl(0.37, 0.34, 0.28, 12, "x"), fl, 3.10, s2 * 0.56, 1.38);
      A(g, cyl(0.30, 0.30, 0.05, 12, "x"), dk, 3.24, s2 * 0.56, 1.38);
      A(g, cyl(0.28, 0.25, 0.40, 10, "x"), dk, 0.05, s2 * 0.76, 1.44, 0, 0, s2 * 0.12);
    }
    /* main gearbox, the tall mast fairing and its control rods */
    A(g, box(1.45, 1.25, 0.60), fl, 0.05, 0, 1.46);
    A(g, cyl(0.30, 0.34, 0.95, 12), fl, 0.05, 0, 2.02);
    A(g, cyl(0.20, 0.20, 1.10, 10), mt, 0.05, 0, 2.62);
    for (s2 = 0; s2 < 4; s2++) {
      var a = s2 * PI * 0.5 + PI * 0.25;
      A(g, cyl(0.035, 0.035, 0.85, 5), mt,
        0.05 + Math.cos(a) * 0.30, Math.sin(a) * 0.30, 2.55);
    }
    /* lower head, and the upper head 1.0 m above it on the same shaft */
    var head = mount(g, 0.05, 2.18, "rotor");
    mainRotor(null, 0, 0, R, 3, { into: head, chord: 0.48, tip: 0xb03a2c, s: 0.92 });
    var upper = new THREE.Group();
    upper.position.y = 1.00;              /* mount-local +Y is the model's +Z */
    head.add(upper);
    mainRotor(null, 0, 0, R, 3, { into: upper, chord: 0.48, tip: 0xb03a2c, s: 0.92,
                                  cap: true, nodisc: true });

    /* ---- glazing: a deep stepped cockpit with big chin windows ---- */
    for (s2 = -1; s2 <= 1; s2 += 2) {
      A(g, box(0.08, 0.66, 1.22), gl, 3.72, s2 * 0.40, 0.30, 0, -0.32, 0);
      A(g, box(0.70, 0.52, 0.08), gl, 4.02, s2 * 0.34, -0.44, 0, 0.42, 0);
      A(g, box(0.90, 0.06, 0.58), gl, 3.10, s2 * 0.94, 0.22);
      A(g, box(0.62, 0.05, 0.56), gl, 1.35, s2 * 1.07, 0.32);
      A(g, box(0.55, 0.05, 0.50), gl, -0.65, s2 * 1.04, 0.34);
    }
    A(g, box(0.11, 0.11, 1.22), tr, 3.72, 0, 0.30, 0, -0.32, 0);

    /* ---- the chin radome: on a Helix it is a fat bulge under the nose --- */
    chinRadome(g, 3.35, -1.04, 1.85, 1.50, 0.86, camo);
    A(g, sph(0.24, 10, 8), dk, 4.30, 0, -0.66);

    /* ---- four fixed wheels ---- */
    var gear = new THREE.Group();
    gear.name = "gear";
    g.add(gear);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      wheel(gear, 2.85, s2 * 0.68, -1.80, 0.26, 0.20, 12);
      A(gear, box(0.16, 0.14, 0.80), st, 2.85, s2 * 0.62, -1.34);
      A(gear, box(0.55, 0.11, 0.11), st, 2.60, s2 * 0.52, -1.20, 0, 0.60, 0);
      wheel(gear, -0.85, s2 * 1.38, -1.72, 0.34, 0.24, 14);
      A(gear, box(0.20, 0.16, 0.95), st, -0.85, s2 * 1.26, -1.20);
      A(gear, box(0.11, 0.85, 0.11), st, -0.85, s2 * 1.20, -1.55, 0.42);
      A(gear, cyl(0.09, 0.09, 0.34, 8, "y"), mt, -0.85, s2 * 1.26, -1.66);
    }

    /* ---- THE ASW KIT ---- */
    dippingSonar(g, camo, -0.35, -1.12, -0.34, 0.94);
    sonobuoyRack(g, camo, -1.55, 1.10, -0.10, S.buoys[0], S.buoys[1], 0.94);
    torpedo(g, camo, 1.45, 1.58, -1.20, S.torpLen, S.torp);

    A(g, box(0.28, 0.05, 0.30), dk, 0.60, 0, -1.08);
    A(g, box(0.24, 0.05, 0.26), dk, -2.30, 0, -0.86);
    A(g, cyl(0.04, 0.04, 0.80, 6, "x"), mt, 4.85, 0.44, -0.10);
    var tm = done(new THREE.MeshStandardMaterial({
      color: new THREE.Color(C && C.team !== undefined ? C.team : 0x7f8c99),
      roughness: 0.58, metalness: 0.22, side: THREE.DoubleSide }));
    for (s2 = -1; s2 <= 1; s2 += 2) {
      A(g, box(0.90, 0.05, 0.20), tm, 2.20, s2 * 1.045, 0.46);
      A(g, box(0.26, 0.12, 0.34), tm, -5.55, s2 * 1.86, 1.90);
    }
    A(g, box(0.55, 0.34, 0.10), tm, -4.30, 0, 0.74);
    return g;
  }

  /* ==================================================================== */
  /*  AIRFRAME 3: Harbin Z-9C                                             */
  /*                                                                      */
  /*  The navalised Dauphin: 12.1 m, an 11.9 m four-blade Starflex head,  */
  /*  and a FENESTRON - eleven short blades shrouded inside the fin, so   */
  /*  there is no tail rotor disc hanging in the air at all. Chin search  */
  /*  radar, and a Yu-7 on the port pylon.                                */
  /* ==================================================================== */
  function buildZ9(C, S) {
    var g = new THREE.Group(), camo = S.camo;
    var sk = skin(THREE, camo), fl = paintOf(THREE, camo), tr = trimOf(THREE, camo);
    var mt = metalOf(THREE), st = steelOf(THREE), dk = darkOf(THREE), gl = glassOf(THREE);
    var s2, R = S.rotorD * 0.5;

    g.add(loftM([
      [-3.30, 0.34, 0.36,  0.28, 0.90],
      [-2.60, 0.53, 0.56,  0.20, 0.75],
      [-1.70, 0.73, 0.76,  0.08, 0.62],
      [-0.60, 0.85, 0.86,  0.02, 0.58],
      [ 0.80, 0.87, 0.87,  0.00, 0.56],
      [ 2.00, 0.85, 0.83, -0.02, 0.62],
      [ 2.95, 0.73, 0.71, -0.08, 0.72],
      [ 3.85, 0.51, 0.51, -0.18, 0.86],
      [ 4.60, 0.16, 0.22, -0.32, 1.00],
    ], 20, sk));
    g.add(loftM([
      [-5.30, 0.22, 0.24, 0.60, 0.90],
      [-4.30, 0.28, 0.30, 0.46, 0.88],
      [-3.30, 0.34, 0.36, 0.28, 0.90],
    ], 14, sk));

    /* ---- fin, fenestron and stabiliser.  The fin is drawn in two pieces
       so the shrouded fan sits in a real gap rather than on a slab. ---- */
    g.add(finSlab([
      [-4.80, 0.42], [-5.72, 2.02], [-6.28, 2.05], [-5.98, 0.40],
    ], 0.26, fl, -0.13));
    g.add(finSlab([
      [-6.24, 1.52], [-6.46, 2.14], [-7.34, 2.05], [-7.22, 1.46],
    ], 0.20, fl, -0.10));
    g.add(finSlab([
      [-6.55, 0.26], [-7.34, 0.30], [-7.16, -0.34],
    ], 0.16, fl, -0.08));
    fenestron(g, -6.66, 0.94, 0.60, 11, camo);
    g.add(plateSlab([
      [-5.35, 1.52], [-5.35, -1.52], [-4.55, -1.52], [-4.55, 1.52],
    ], 0.11, fl, 0.52));
    for (s2 = -1; s2 <= 1; s2 += 2) {
      var ep = finSlab([
        [-4.60, 0.52], [-4.95, 1.20], [-5.42, 1.18], [-5.32, 0.50],
      ], 0.10, fl, s2 * 1.48 - 0.05);
      ep.rotation.x = -s2 * 0.20;
      g.add(ep);
    }

    /* ---- twin Arriels faired into the roof, and the Starflex head ---- */
    A(g, box(1.65, 0.95, 0.44), fl, 0.35, 0, 1.02);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      g.add(loftM([
        [-0.35, 0.24, 0.24, 1.02, 0.65],
        [ 0.45, 0.32, 0.30, 1.06, 0.60],
        [ 1.55, 0.32, 0.30, 1.06, 0.60],
        [ 2.05, 0.25, 0.25, 1.02, 0.80],
      ], 12, sk, s2 * 0.46));
      A(g, cyl(0.25, 0.23, 0.24, 10, "x"), fl, 2.16, s2 * 0.46, 1.04);
      A(g, cyl(0.20, 0.20, 0.05, 10, "x"), dk, 2.26, s2 * 0.46, 1.04);
      A(g, cyl(0.20, 0.18, 0.32, 8, "x"), dk, -0.52, s2 * 0.56, 1.06, 0, 0, s2 * 0.12);
    }
    A(g, cyl(0.16, 0.19, 0.50, 10), dk, 0.30, 0, 1.42);
    mainRotor(g, 0.30, 1.68, R, 4, { chord: 0.40, tip: 0xd2d7d9, s: 0.80 });
    /* the Starflex star plate under the head, a Dauphin trademark */
    A(g, cyl(0.44, 0.44, 0.07, 8), mt, 0.30, 0, 1.52);

    /* ---- glazing ---- */
    for (s2 = -1; s2 <= 1; s2 += 2) {
      A(g, box(0.07, 0.58, 1.00), gl, 3.50, s2 * 0.32, 0.22, 0, -0.50, 0);
      A(g, box(0.72, 0.44, 0.07), gl, 3.80, s2 * 0.28, -0.44, 0, 0.32, 0);
      A(g, box(0.90, 0.05, 0.52), gl, 2.90, s2 * 0.74, 0.14);
      A(g, box(0.85, 0.05, 0.50), gl, 0.90, s2 * 0.875, 0.26);
      A(g, box(0.60, 0.05, 0.44), gl, -0.85, s2 * 0.845, 0.28);
    }
    A(g, box(0.09, 0.09, 1.00), tr, 3.50, 0, 0.22, 0, -0.50, 0);

    chinRadome(g, 3.05, -0.92, 1.55, 1.05, 0.52, camo);
    A(g, sph(0.22, 10, 8), dk, 4.05, 0, -0.62);

    /* ---- undercarriage: tricycle, down ---- */
    var gear = new THREE.Group();
    gear.name = "gear";
    g.add(gear);
    wheel(gear, 3.05, 0, -1.52, 0.24, 0.18, 12);
    A(gear, box(0.15, 0.13, 0.72), st, 3.05, 0, -1.12);
    A(gear, box(0.14, 0.44, 0.14), st, 3.05, 0, -1.36);
    for (s2 = -1; s2 <= 1; s2 += 2) {
      wheel(gear, -0.45, s2 * 1.05, -1.48, 0.30, 0.22, 14);
      A(gear, box(0.18, 0.15, 0.78), st, -0.45, s2 * 0.96, -1.05);
      A(gear, box(0.60, 0.12, 0.12), st, -0.75, s2 * 0.92, -0.95, 0, -0.55, 0);
    }

    /* ---- THE ASW KIT, scaled down to the airframe ---- */
    dippingSonar(g, camo, -0.10, -0.90, -0.28, 0.84);
    sonobuoyRack(g, camo, -1.35, 0.88, -0.06, S.buoys[0], S.buoys[1], 0.84);
    torpedo(g, camo, 1.35, 1.34, -0.96, S.torpLen, S.torp);

    A(g, box(0.24, 0.05, 0.26), dk, 0.20, 0, -0.90);
    A(g, box(0.22, 0.05, 0.24), dk, -2.10, 0, -0.62);
    A(g, cyl(0.035, 0.035, 0.60, 6, "x"), mt, 4.35, 0.34, -0.10);
    var tm = done(new THREE.MeshStandardMaterial({
      color: new THREE.Color(C && C.team !== undefined ? C.team : 0x7f8c99),
      roughness: 0.58, metalness: 0.22, side: THREE.DoubleSide }));
    A(g, box(0.10, 0.30, 0.50), tm, -5.75, 0, 1.55);
    for (s2 = -1; s2 <= 1; s2 += 2)
      A(g, box(0.80, 0.05, 0.18), tm, 2.05, s2 * 0.845, 0.38);
    return g;
  }

  /* ==================================================================== */
  /*  the roster                                                          */
  /*                                                                      */
  /*  Two eras of the same three machines. The e00 NATO/ROC pair and the  */
  /*  e20 pair are the same airframes in the same navies, so they differ  */
  /*  where the fits actually differ rather than in shape: the MH-60R     */
  /*  carries its ALQ-210 ESM pods on the nose and a full 25-tube         */
  /*  launcher, the Thunderhawk carries a towed MAD bird and a sixteen-   */
  /*  tube rack, and the ROC machines are a darker, more worn grey.       */
  /* ==================================================================== */
  var SPECS = {
    /* Sikorsky MH-60R Seahawk, US Navy, in service 2006 */
    asw_helo_n:       { frame: "h60",  camo: "seagrey",  len: 15.3, rotorD: 16.36,
                        buoys: [5, 5], torp: "mk54", torpLen: 2.72, esm: true },
    nato_e00_aswhelo: { frame: "h60",  camo: "seagrey",  len: 15.3, rotorD: 16.36,
                        buoys: [5, 5], torp: "mk54", torpLen: 2.72, esm: true },
    /* Sikorsky S-70C(M)-1/2 Thunderhawk, ROCN, off the Cheng Kung frigates */
    asw_helo_r:       { frame: "h60",  camo: "rocgrey",  len: 15.3, rotorD: 16.36,
                        buoys: [4, 4], torp: "mk46", torpLen: 2.60, mad: true },
    roc_e00_aswhelo:  { frame: "h60",  camo: "rocgrey",  len: 15.3, rotorD: 16.36,
                        buoys: [4, 4], torp: "mk46", torpLen: 2.60, mad: true },
    /* Kamov Ka-27PL Helix-A, coaxial, no tail rotor */
    asw_helo_p:       { frame: "ka27", camo: "bluegrey", len: 11.3, rotorD: 15.9,
                        buoys: [4, 3], torp: "apr",  torpLen: 2.55 },
    pact_e80_aswhelo: { frame: "ka27", camo: "bluegrey", len: 11.3, rotorD: 15.9,
                        buoys: [4, 3], torp: "apr",  torpLen: 2.55 },
    /* Harbin Z-9C, fenestron, off the PLAN frigates */
    asw_helo_c:       { frame: "z9",   camo: "plagrey",  len: 12.1, rotorD: 11.9,
                        buoys: [4, 3], torp: "yu7",  torpLen: 2.70 },
  };

  function build(T, M, C, id) {
    THREE = T; MOD = M;                     /* bind the two injected modules */
    var S = SPECS[id] || SPECS.asw_helo_n;
    var g = S.frame === "ka27" ? buildKa27(C, S)
          : S.frame === "z9"   ? buildZ9(C, S)
          :                      buildH60(C, S);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  function registerAll() {
    var id, n = 0;
    for (id in SPECS) {
      if (!Object.prototype.hasOwnProperty.call(SPECS, id)) continue;
      (function (key, S) {
        UNIT_MODELS[key] = {
          len: Math.max(S.len, S.rotorD),
          build: function (T, M, C) { return build(T, M, C, key); },
        };
      })(id, SPECS[id]);
      n++;
    }
    return n;
  }

  return { build: build, registerAll: registerAll, SPECS: SPECS };
})();

/* later file wins: these ids are claimed back from the generic rotorcraft
   builder in rotor3d.js, which knows the airframes but none of the kit */
AswHelo3D.registerAll();
