/* ======= ru_ka50.js - HERO model: Kamov Ka-50 Black Shark =======
   The single-seat coaxial attack helicopter, for
     pact_e90_gunship  "Ka-50 Black Shark" / "Kamov Ka-50" (service 1995)
   No other row uses this key as its own model; modelKeyFor lends it to
   stand-ins of ROLES.gunship (rotor_specs.js: config "coaxial", 3 blades,
   stubs, retractable wheels, camo "black"; generations.js: the 2A42
   30 mm cannon and the 9K121 Vikhr).

   REDO, 2026-10-24 (full-quality procedure). References:
     drawing   Commons "Kamov Ka-50 Hokum graphic.gif" (US Army three-view,
               public domain; the three-view of the Russian Wikipedia
               article): side, top and front. Its side and top views share
               one scale, 22.4 px/m when the fuselage is the published
               13.5 m, and that scale also gives the published 15.6 m with
               the rotors turning (mast 5.25 m behind the nose, 8.25 m to
               the fin trailing edge, rotor radius 7.22 m). Every station
               below comes from it. Its blades are drawn short and its gear
               is drawn retracted, so neither is measured off it.
               "Hokum drawing.png" (1986 US Army sketch) is NOT used: it
               was drawn before the type was seen.
     photos    Commons: "Ka-50 NTW 7 8 93" (Le Bourget 1993, the black
               "021"/"H317", starboard three-quarter, colour), "KA-50a/c
               MAKS93" (the same black machine, port side), "Russian Air
               Force Kamov Ka-50" (2005, "25", starboard, in flight),
               "Kamov Ka-50 in Moscow" (2007, starboard three-quarter on
               the ground), "KA50 weapons" (front three-quarter: intake,
               stores, the gun), "Kamov Ka-50, Torzhok-1" (2013, from
               above), "Ka-50 Heck" (the fin), "HeliRussia 2009 (197-27)"
               (Kamov's display model of the black H317, from above).
     text      Russian Wikipedia "Ka-50" (Mazepov et al. 1997): length
               15.60 m with the rotors turning, rotor 14.45 m, wing span
               7.34 m, height 4.90 m; tricycle gear RETRACTING in flight,
               nose leg with two 400 x 150 mm wheels into a niche in the
               nose, main legs with 700 x 250 mm wheels folding back
               against the sides of the rear fuselage, track 2600 mm,
               wheelbase 4910 mm; stabiliser, fin, large rudder and TWO
               side fins; UV-26 dispensers on the wing tips; four pylons
               (six Vikhr on the UPP-800 launcher, 20 S-8 in a B-8V20A).

   Recognition list, each with the reference it rests on:
     1  the coaxial pair of three-blade rotors on a tall mast, the upper
        head 1.3 m over the lower, swept blade tips (all photos; the 2013
        overhead view for the tips)
     2  the long, drooping armoured nose ending in a blunt face with the
        Shkval sight window, an air-data boom with vanes ahead of it
        (Le Bourget 1993, 2005 flight, HeliRussia model)
     3  the single-seat cockpit: a raked flat windscreen, a quarter pane
        and a big door pane each side, an opaque armoured roof
        (MAKS93 port side, Le Bourget 1993)
     4  the slim fuselage widening behind the cockpit into the engine bay,
        then tapering into a long deep tail boom whose underside rises to
        the fin (three-view side and top)
     5  the two TV3-117VMA nacelles high on the shoulders, each with a big
        round intake and its dome standing in it (2005 flight, "KA50
        weapons"), and the exhaust turned out to the flank at the back
        (three-view top, 2005 flight, 2013 overhead)
     6  the 2A42 30 mm cannon on the STARBOARD flank, low, under the
        engine intake, the barrel running forward along the side
        (2005 flight, "KA50 weapons")
     7  straight stub wings of 7.34 m, trailing edge swept, at mid height
        (three-view front and top)
     8  four pylons: B-8V20A pods inboard, the six-tube Vikhr launcher
        outboard, two tubes over four (three-view, "KA50 weapons")
     9  the boxy UV-26 countermeasure pods on the wing tips (HeliRussia
        model, three-view)
     10 the swept fin with its big rudder, the stabiliser through the boom
        and its two end-plate fins (three-view, 2005 flight, "Ka-50 Heck")
     11 retractable tricycle gear, twin nose wheels, mains on legs from the
        rear fuselage sides (Russian Wikipedia, Moscow 2007, Le Bourget)
     12 the black paint the name comes from (Le Bourget and MAKS 1993)

   CORRECTED in this redo:
     - the old build was 15.0 m long (nose 6.38 to fin -8.55) against the
       published 13.5 m; the nose is now 5.25 m ahead of the mast and the
       fin trailing edge 8.25 m behind it, so the rotors-turning length
       is 15.48 m (published 15.60).
     - rotor 14.45 m (Russian Wikipedia), was 14.50.
     - heads: lower 3.42 m, upper 4.72 m above ground, hub cap 4.90 m
       (published height); they were 3.54 and 4.68.
     - the stores were swapped: the three-view and "KA50 weapons" put the
       B-8V20 pod INBOARD and the Vikhr launcher OUTBOARD, two tubes over
       four, not three over three.
     - the gear: track 2.60 m and wheelbase 4.91 m (were 2.56 and 5.05).
     - the twin-boom engine nacelles were laid ON the roof; the photos put
       them on the shoulders either side, the intakes facing forward with
       the dome in them and the exhausts turned outboard.
     - the stabiliser end plates hang mostly BELOW the stabiliser.
     - paint: see PAINT. The old build was a plain dark green taken from
       the 2005 scheme, which is not of the row's period.

   PAINT. The row is the 1990s Ka-50 (service 1995). Every Commons photo
   of the 1990s (Le Bourget 1993 in colour, MAKS 1993) shows the gloss-
   black "Black Shark" scheme the name comes from, and rotor_specs.js
   gives the key camo "black"; the camouflage photos are of 2005 and
   later. Sampled off the lit nose side at Le Bourget: #29292a; taken to
   about 0.88 of that: #242526, satin, so the shape still reads from the
   light. No bort number, no badge, no lettering. NOT CONFIRMED: no dated
   colour photograph of a Torzhok service machine of 1995-2000 is on
   Commons, so it is not known whether those were black too. The black
   machines carry no red star in any of the 1993 photographs (a small
   flag, on the starboard boom only, is the only national mark seen), so
   no national insignia is drawn rather than invent one.

   Not modelled: the K-37-800 ejection seat's roof jettison lines, the
   blade-tip lights, the gun's elevation (the mount is drawn level).

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   the rotor mast axis; z = 0 is 2.30 m above the wheel contact plane.
   render3d.js stands the model up with rotation.x = -PI/2 and rescales it
   by the measured X extent: the lower rotor disc's front edge (+7.22) to
   the fin trailing edge (-8.25), 15.48 m.

   NAMED NODES:
     rotor      TWO, one per head, both on the one mast, mounted as in
                pact_ka27_helix.js: the mount is turned +PI/2 about X so
                each node's local +Y runs up the mast, and an inner group
                turned -PI/2 puts the head back into model axes.
                render3d.js turns the second "rotor" head the other way,
                which is what the contra-rotating pair does.
     rotordisc  one inside each head, its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     gear       the RETRACTABLE tricycle undercarriage (Russian Wikipedia:
                "retracting in flight"), drawn extended; the renderer hides
                it above 18 m. It is the lowest opaque part.
     There is no "tailrotor" and no "turret": the gun is fixed to the
     side and the row has no def.turret.

   Materials: SKIN (one CanvasTexture), GLASS, DARK fittings, STORES,
   METAL struts, RUBBER, ROTOR (hubs and blades), TEAM flash, DISC: nine,
   in eleven draw calls. The skin UVs are projected from model space by
   face normal (top, port, starboard and belly bands of one sheet), as in
   the Mi-28N hero.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKa50 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ datums */
  var GROUND  = -2.30;                      /* wheel contact plane         */
  function Z(h) { return GROUND + h; }      /* height above ground -> z    */
  var ROTOR_R = 7.225;                      /* 14.45 m discs               */
  var CHORD   = 0.52;                       /* blade chord, photo scale    */
  var H_LO = 3.42, H_UP = 4.72;             /* head centres; cap top 4.90  */
  var X_NOSE  = 5.30;                       /* the Shkval window face      */
  /* engine nacelles: centreline, height, intake face, back end */
  var NAC_Y = 0.98, NAC_H = 2.42, NAC_X0 = 0.78, NAC_X1 = -1.05;
  /* wing: mid-plane height, root and tip stations, pylons, pod centre */
  var WING_H = 1.78, W_ROOT = 0.62, W_TIP = 3.36;
  var PYL_IN = 1.95, PYL_OUT = 2.62, POD_Y = 3.50;
  /* tail: stabiliser height, half span, end plates */
  var STAB_H = 2.25, STAB_Y = 1.42;
  /* gear: nose leg station, main axle station, track, tyres */
  var NG_X = 2.86, MG_X = -2.05, MG_Y = 1.30, MW_R = 0.35, MW_W = 0.25, NW_R = 0.20, NW_W = 0.15;

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band                     */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -8.7, UX1 = 6.5;
  var QY = 3.9;
  var QZ0 = -1.75, QZ1 = 2.35;
  var SX = TW / (UX1 - UX0);
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  var PAINT = { base: "#242526", seed: 5050 };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function skinCanvas(pv) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(pv.seed);
    var i, b, x, y;
    g.fillStyle = pv.base; g.fillRect(0, 0, TW, TH);

    /* satin black weathers unevenly: faint lighter mottling where the
       paint has chalked in the sun, heavier on the top band */
    for (b = 0; b < 4; b++) {
      for (i = 0; i < 70; i++) {
        var a = (b === 0 ? 0.035 : 0.022) + R() * 0.03;
        g.fillStyle = "rgba(150,152,150," + a.toFixed(3) + ")";
        var w = 20 + R() * 90, h = 8 + R() * 30;
        g.fillRect(R() * TW, b * BAND + R() * BAND, w, h);
      }
    }
    /* ---- panel seams: frames across the airframe at real stations, a
       light edge beside a dark line, as seams catch the light on black */
    var frames = [5.05, 4.55, 4.00, 3.35, 2.90, 2.20, 1.45, 0.80, 0.20, -0.45,
                  -1.10, -1.70, -2.40, -3.10, -3.90, -4.70, -5.50, -6.30, -7.10];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.55)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(170,175,178,0.16)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(160,165,168,0.12)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    /* stringers along the sides at real heights, and either side of the
       spine on the top band */
    [1.10, 1.50, 1.95, 2.40].forEach(function (hh) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(hh), bb);
        g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.3;
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
        g.strokeStyle = "rgba(170,175,178,0.10)";
        g.beginPath(); g.moveTo(0, yy + 2); g.lineTo(TW, yy + 2); g.stroke();
      }
    });
    [-0.40, 0.40, -0.98, 0.98].forEach(function (q) {
      var yy = pyTop(q);
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
    });
    /* access hatches, the big equipment bays on the nose and behind the
       cockpit drawn where the three-view has them */
    g.lineWidth = 1.4;
    for (i = 0; i < 64; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 12 + R() * 34, hh2 = 10 + R() * 22;
      g.strokeStyle = "rgba(0,0,0,0.5)"; g.strokeRect(hx, hy, hw, hh2);
      g.strokeStyle = "rgba(170,175,178,0.10)"; g.strokeRect(hx + 1.5, hy + 1.5, hw, hh2);
    }
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 2.2;
      /* nose avionics doors (three-view side: 4.6 to 3.4 m) */
      g.strokeRect(pxX(4.65), pySide(Z(1.88), b), pxX(3.45) - pxX(4.65), pySide(Z(1.12), b) - pySide(Z(1.88), b));
      /* the bay doors behind the cockpit, under the wing root */
      g.strokeRect(pxX(1.35), pySide(Z(2.45), b), pxX(0.55) - pxX(1.35), pySide(Z(1.95), b) - pySide(Z(2.45), b));
      g.strokeRect(pxX(-1.45), pySide(Z(1.62), b), pxX(-3.25) - pxX(-1.45), pySide(Z(1.22), b) - pySide(Z(1.62), b));
      /* the rudder hinge line on the fin, and the rudder trailing panel */
      g.strokeStyle = "rgba(0,0,0,0.7)"; g.lineWidth = 2.6;
      g.beginPath(); g.moveTo(pxX(-7.12), pySide(Z(2.30), b)); g.lineTo(pxX(-7.80), pySide(Z(4.40), b)); g.stroke();
      g.strokeStyle = "rgba(170,175,178,0.18)"; g.lineWidth = 1.2;
      g.beginPath(); g.moveTo(pxX(-7.16), pySide(Z(2.30), b)); g.lineTo(pxX(-7.84), pySide(Z(4.40), b)); g.stroke();
    }
    /* soot behind the exhausts: brown-grey deposits show on black */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(pxX(-1.2), 0, pxX(-4.6), 0);
      sg.addColorStop(0, "rgba(70,62,54,0.30)");
      sg.addColorStop(1, "rgba(70,62,54,0)");
      g.fillStyle = sg;
      g.fillRect(pxX(-4.6), pySide(Z(2.75), b), pxX(-1.2) - pxX(-4.6), pySide(Z(2.05), b) - pySide(Z(2.75), b));
    }
    /* the walkway either side of the mast, worn lighter by boots */
    g.fillStyle = "rgba(120,122,120,0.10)";
    g.fillRect(pxX(1.2), pyTop(0.62), pxX(-1.0) - pxX(1.2), pyTop(-0.62) - pyTop(0.62));
    return cv;
  }

  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    var t = false;
    try {
      t = new V.CanvasTexture(skinCanvas(PAINT));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex = t;
    return t;
  }

  /* face-normal projection into the four bands (the Mi-28N hero's) */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0)      { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else                 { U = pxX(endOn ? x + y : x); W = pySide(z, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials == */
  function makeMats(C) {
    var tex = skinTexture();
    var m = {};
    /* satin black: a little sheen so the light shapes it */
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.52, metalness: 0.18 });
    if (tex) m.skin.map = tex; else m.skin.color.set(PAINT.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1a1c1d, roughness: 0.62, metalness: 0.35 });
    /* hubs and blades: the heads are painted black like the airframe and
       the composite blades weather to a dark charcoal (Le Bourget 1993) */
    m.rotor  = new V.MeshStandardMaterial({ color: 0x2b2d2e, roughness: 0.70, metalness: 0.20 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* B-8V20A pods and the Vikhr containers: ordnance grey-olive */
    m.store  = new V.MeshStandardMaterial({ color: 0x4d5446, roughness: 0.78, metalness: 0.12 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1d2e33, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05,
                                            polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ====================================================== geometry kit == */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  /* the starboard twin of a port part (corners swapped back so it is not
     inside out) */
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var u = g.attributes.uv ? g.attributes.uv.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) {
      for (k = 0; k < 3; k++) {
        tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
        if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
      }
      if (u) for (k = 0; k < 2; k++) { tmp = u[t * 6 + 2 + k]; u[t * 6 + 2 + k] = u[t * 6 + 4 + k]; u[t * 6 + 4 + k] = tmp; }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a convex solid from its faces, each wound outward from the centre */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        if ((a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* a six-cornered aerofoil: le/te are [x, z] in the chord plane, the
     thickness t along the plane's normal; at() maps to model space */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft: superelliptic sections, heights ABOVE GROUND ---- */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var th = -PI / 2 + PI * i / n, c = Math.cos(th), sn = Math.sin(th);
      var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
      var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
      var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
      pts.push([W * Math.pow(Math.abs(c), s.e), z]);
    }
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    for (i = 0; i < pts.length; i++) pts[i][0] += s.yc;
    return pts;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], rl = 2 * n, i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], r = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += r[j][0]; cz += r[j][1]; }
      var o = [s.x + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function secAt(S, x) {
    for (var q = 0; q < S.length - 1; q++) {
      var A = S[q], B = S[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return null;
  }

  /* ---- conformal glazing: rays against the loft triangles ---- */
  function triList(geo) {
    var p = geo.attributes.position.array, ix = geo.index ? geo.index.array : null;
    var n = ix ? ix.length : p.length / 3, out = [], i, a, b, c;
    for (i = 0; i < n; i += 3) {
      a = 3 * (ix ? ix[i] : i); b = 3 * (ix ? ix[i + 1] : i + 1); c = 3 * (ix ? ix[i + 2] : i + 2);
      out.push([p[a], p[a + 1], p[a + 2], p[b], p[b + 1], p[b + 2], p[c], p[c + 1], p[c + 2]]);
    }
    return out;
  }
  function cast(tl, o, d) {
    var best = null, i;
    for (i = 0; i < tl.length; i++) {
      var T = tl[i];
      var ax = T[3] - T[0], ay = T[4] - T[1], az = T[5] - T[2];
      var bx = T[6] - T[0], by = T[7] - T[1], bz = T[8] - T[2];
      var px = d[1] * bz - d[2] * by, py = d[2] * bx - d[0] * bz, pz = d[0] * by - d[1] * bx;
      var det = ax * px + ay * py + az * pz;
      if (Math.abs(det) < 1e-12) continue;
      var inv = 1 / det, tx = o[0] - T[0], ty = o[1] - T[1], tz = o[2] - T[2];
      var u = (tx * px + ty * py + tz * pz) * inv;
      if (u < 0 || u > 1) continue;
      var qx = ty * az - tz * ay, qy = tz * ax - tx * az, qz = tx * ay - ty * ax;
      var v = (d[0] * qx + d[1] * qy + d[2] * qz) * inv;
      if (v < 0 || u + v > 1) continue;
      var t = (bx * qx + by * qy + bz * qz) * inv;
      if (t > 0 && (!best || t < best.t)) {
        var nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        if (nx * d[0] + ny * d[1] + nz * d[2] > 0) nl = -nl;
        best = { t: t, n: [nx / nl, ny / nl, nz / nl] };
      }
    }
    return best;
  }
  /* a pane laid on the skin: ray(u, v) gives an origin and a direction
     for each grid point; the pane follows the skin "lift" metres proud */
  function pane(tl, nu, nv, ray, lift) {
    var P = [], pts = [], i, j;
    for (j = 0; j <= nv; j++) for (i = 0; i <= nu; i++) {
      var r = ray(i / nu, j / nv), o = r[0], d = r[1], h = cast(tl, o, d);
      if (!h) return null;
      P.push([o[0] + d[0] * h.t + h.n[0] * lift, o[1] + d[1] * h.t + h.n[1] * lift,
              o[2] + d[2] * h.t + h.n[2] * lift, h.n]);
    }
    function at(a, b) { return P[b * (nu + 1) + a]; }
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2], m = a[3];
      if ((uy * vz - uz * vy) * m[0] + (uz * vx - ux * vz) * m[1] + (ux * vy - uy * vx) * m[2] < 0) pts.push(a, c, b);
      else pts.push(a, b, c);
    }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      tri(at(i, j), at(i + 1, j), at(i + 1, j + 1));
      tri(at(i, j), at(i + 1, j + 1), at(i, j + 1));
    }
    return { geo: tris(pts), P: P, nu: nu, nv: nv };
  }
  /* the frame round a pane: one bar along each edge, corner to corner,
     just proud of it (the armoured panes are flat) */
  function frameOf(pn, r, list) {
    if (!pn) return;
    var P = pn.P, nu = pn.nu, nv = pn.nv;
    function at(a, b) { var q = P[b * (nu + 1) + a]; return [q[0] + q[3][0] * 0.01, q[1] + q[3][1] * 0.01, q[2] + q[3][2] * 0.01]; }
    list.push(bar(at(0, 0), at(nu, 0), r, 4)); list.push(bar(at(0, nv), at(nu, nv), r, 4));
    list.push(bar(at(0, 0), at(0, nv), r, 4)); list.push(bar(at(nu, 0), at(nu, nv), r, 4));
  }
  /* a flat disc facing +x: a tube mouth or a duct face */
  function discX(r, seg, x, y, z) { return place(new V.CircleGeometry(r, seg), x, y, z, 0, PI / 2, 0); }

  /* ========================================================= the build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "ka50";
    var i, k, s, a;
    var skin = [], glass = [], dark = [], store = [], team = [];

    /* --------------------------------------------------- the fuselage ----
       Stations off the three-view (x from the mast, heights above ground,
       half widths). The nose is a long armoured box drooping to the blunt
       Shkval face; the cockpit rises behind a raked windscreen to an
       opaque roof at 2.78 m; behind it the body widens over the engine bay
       to 1.6 m and the top climbs to the gearbox fairing under the mast;
       aft of the engine bay the boom tapers in plan and in depth, its
       underside rising from 0.85 m to 2.0 m at the fin.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 5.30, 1.24, 1.76, 1.50, 0.22, 0.27, 0.19, 0.55),
      sec( 5.20, 1.14, 1.85, 1.48, 0.30, 0.35, 0.26, 0.48),
      sec( 4.95, 1.04, 1.93, 1.46, 0.37, 0.42, 0.31, 0.44),
      sec( 4.50, 0.96, 1.99, 1.44, 0.42, 0.46, 0.35, 0.42),
      sec( 4.00, 0.90, 2.02, 1.44, 0.45, 0.49, 0.37, 0.38),
      sec( 3.40, 0.86, 2.05, 1.44, 0.47, 0.51, 0.39, 0.36),
      sec( 3.18, 0.85, 2.22, 1.46, 0.48, 0.52, 0.40, 0.35),
      sec( 2.90, 0.84, 2.52, 1.48, 0.50, 0.54, 0.41, 0.34),
      sec( 2.62, 0.83, 2.74, 1.50, 0.55, 0.59, 0.42, 0.34),
      sec( 2.30, 0.82, 2.78, 1.52, 0.62, 0.68, 0.42, 0.35),
      sec( 1.70, 0.81, 2.80, 1.54, 0.70, 0.77, 0.42, 0.36),
      sec( 1.15, 0.81, 2.86, 1.56, 0.74, 0.81, 0.44, 0.38),
      sec( 0.55, 0.82, 2.95, 1.58, 0.75, 0.82, 0.46, 0.40),
      sec(-0.40, 0.85, 2.94, 1.60, 0.74, 0.81, 0.46, 0.42),
      sec(-1.10, 0.90, 2.80, 1.63, 0.70, 0.79, 0.44, 0.44),
      sec(-1.90, 1.00, 2.72, 1.68, 0.64, 0.75, 0.42, 0.48),
      sec(-2.60, 1.12, 2.66, 1.76, 0.56, 0.68, 0.38, 0.52),
      sec(-3.40, 1.26, 2.61, 1.86, 0.46, 0.58, 0.33, 0.56),
      sec(-4.20, 1.38, 2.55, 1.94, 0.37, 0.47, 0.28, 0.60),
      sec(-5.00, 1.52, 2.48, 2.00, 0.30, 0.38, 0.23, 0.64),
      sec(-6.00, 1.65, 2.33, 2.00, 0.21, 0.27, 0.17, 0.68),
      sec(-7.00, 1.82, 2.15, 1.98, 0.13, 0.17, 0.11, 0.72),
      sec(-7.90, 1.97, 2.07, 2.02, 0.05, 0.06, 0.04, 0.80)
    ];
    var fus = loft(FUS, 16, 0.10, 0.12);
    var tl = triList(fus[0]);
    for (i = 0; i < fus.length; i++) skin.push(fus[i]);
    function fAt(x) { return secAt(FUS, x); }

    /* ---------------------------------------------- engine nacelles ----
       On the shoulders either side of the gearbox, 1.96 m between their
       centres (three-view front), from just ahead of the mast to 1.05 m
       behind it. Each has a big round intake facing forward with its dome
       standing in it, and is faired down into the body. */
    var NAC = [
      sec(NAC_X0,        2.06, 2.78, 2.42, 0.33, 0.36, 0.32, 0.90, NAC_Y),
      sec(NAC_X0 - 0.20, 2.00, 2.84, 2.42, 0.38, 0.41, 0.36, 0.78, NAC_Y),
      sec(-0.20,         2.00, 2.86, 2.43, 0.38, 0.41, 0.36, 0.66, NAC_Y),
      sec(-0.70,         2.04, 2.82, 2.43, 0.35, 0.38, 0.33, 0.68, NAC_Y),
      sec(NAC_X1,        2.10, 2.74, 2.43, 0.29, 0.32, 0.27, 0.80, NAC_Y)
    ];
    var nac = loft(NAC, 10, null, 0.04);
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    /* the fairing that marries each nacelle to the body side */
    both(skin, box(1.70, 0.36, 0.42, -0.10, 0.70, Z(2.30)));
    /* intake lip, dark duct face, and the dome in it (KA50 weapons) */
    both(skin, place(new V.TorusGeometry(0.325, 0.045, 6, 20), NAC_X0, NAC_Y, Z(NAC_H), 0, PI / 2, 0));
    both(dark, cyl(0.33, 0.33, 0.03, 20, "x", NAC_X0 - 0.06, NAC_Y, Z(NAC_H)));
    both(dark, sph(0.28, 12, 8, NAC_X0 + 0.02, NAC_Y, Z(NAC_H), 1.10, 1, 1));
    /* Exhaust: a short duct leaving the back of the nacelle and turned
       out to the flank, about 45 degrees off the axis (three-view top),
       its louvred outlet facing outboard and aft (2005 flight, 2013
       overhead). Built along +Y at the origin, then turned. */
    var exA = 45 * D2R;
    function exPart(geo) { geo.rotateZ(exA); geo.translate(-1.12, NAC_Y + 0.12, Z(NAC_H + 0.02)); return geo; }
    var duct = new V.CylinderGeometry(0.33, 0.29, 0.62, 16, 1, false);
    duct.translate(0, 0.16, 0);
    both(skin, exPart(duct));
    both(skin, exPart(new V.TorusGeometry(0.33, 0.035, 5, 16).rotateX(PI / 2).translate(0, 0.47, 0)));
    both(dark, exPart(cyl(0.30, 0.30, 0.02, 16, "y", 0, 0.475, 0)));
    for (k = 0; k < 2; k++)
      both(skin, exPart(new V.TorusGeometry(0.22 - k * 0.09, 0.018, 3, 12).rotateX(PI / 2).translate(0, 0.49, 0)));

    /* -------------------------------------------- gearbox and the mast ---
       a low fairing round the mast foot over the gearbox, then the fixed
       mast column, the swashplates and the upper head's pitch rods */
    skin.push(cyl(0.44, 0.56, 0.22, 20, "z", 0, 0, Z(3.03)));
    dark.push(cyl(0.17, 0.17, H_UP - 3.05, 14, "z", 0, 0, Z((H_UP + 3.05) / 2)));
    dark.push(cyl(0.40, 0.40, 0.07, 20, "z", 0, 0, Z(3.18)));
    dark.push(cyl(0.30, 0.34, 0.16, 18, "z", 0, 0, Z(3.26)));
    dark.push(cyl(0.30, 0.30, 0.07, 18, "z", 0, 0, Z(H_LO + 0.40)));
    dark.push(cyl(0.22, 0.26, 0.20, 16, "z", 0, 0, Z(H_LO + 0.52)));
    for (k = 0; k < 3; k++) {
      a = k * PI * 2 / 3 + 0.5;
      dark.push(bar([Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(H_LO + 0.42)],
                    [Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(H_UP - 0.14)], 0.024, 5));
    }

    /* ---------------------------------------------------- the cockpit ----
       flat armoured glass laid on the loft: the windscreen (one pane each
       side of the centre post), the quarter pane and the door pane each
       side, and the frames round them in the skin colour */
    var frames = [];
    var ws1 = pane(tl, 3, 4, function (u, v) { return [[8, 0.03 + u * 0.36, Z(2.10 + v * 0.60)], [-1, 0, 0]]; }, 0.012);
    var ws2 = pane(tl, 3, 4, function (u, v) { return [[8, -0.03 - u * 0.36, Z(2.10 + v * 0.60)], [-1, 0, 0]]; }, 0.012);
    [ws1, ws2].forEach(function (p) { if (p) { glass.push(p.geo); frameOf(p, 0.028, frames); } });
    for (s = -1; s <= 1; s += 2) {
      /* quarter pane: its top edge follows the windscreen frame */
      var qp = pane(tl, 3, 3, function (u, v) {
        var x = 3.06 - u * 0.44, top = 2.10 + (3.06 - x) * 1.10;
        return [[x, s * 3, Z(2.02 + v * (top - 2.02))], [0, -s, 0]];
      }, 0.012);
      /* door pane, 0.72 x 0.64 m: nearly the whole side of the cockpit
         (MAKS93 port side) */
      var dp = pane(tl, 4, 3, function (u, v) { return [[2.56 - u * 0.72, s * 3, Z(2.02 + v * 0.64)], [0, -s, 0]]; }, 0.012);
      [qp, dp].forEach(function (p) { if (p) { glass.push(p.geo); frameOf(p, 0.026, frames); } });
    }
    for (i = 0; i < frames.length; i++) skin.push(frames[i]);
    /* the Shkval-V window in the nose face and the air-data boom with its
       two vanes ahead of the nose */
    glass.push(box(0.03, 0.30, 0.20, X_NOSE + 0.07, 0, Z(1.47)));
    dark.push(box(0.05, 0.36, 0.26, X_NOSE + 0.05, 0, Z(1.47)));
    dark.push(bar([X_NOSE - 0.10, 0, Z(1.70)], [X_NOSE + 0.92, 0, Z(1.71)], 0.022, 6));
    dark.push(box(0.10, 0.16, 0.012, X_NOSE + 0.72, 0, Z(1.71)));
    dark.push(box(0.10, 0.012, 0.16, X_NOSE + 0.60, 0, Z(1.71)));

    /* ------------------------------------------------- the 2A42 cannon --
       The NPPU-80 mount on the STARBOARD flank, low, under the engine
       intake: a recessed bay, the receiver in it, the 2.4 m barrel running
       forward along the side under the cockpit (2005 flight; KA50 weapons). */
    var GY = -0.83, GH = 1.10;
    dark.push(box(1.30, 0.10, 0.46, 0.35, GY + 0.08, Z(GH + 0.02)));
    skin.push(box(1.40, 0.12, 0.08, 0.35, GY + 0.04, Z(GH + 0.29)));
    skin.push(box(1.40, 0.12, 0.08, 0.35, GY + 0.04, Z(GH - 0.25)));
    dark.push(box(1.05, 0.20, 0.24, 0.35, GY, Z(GH)));
    dark.push(cyl(0.075, 0.075, 0.36, 12, "x", 1.05, GY, Z(GH)));
    dark.push(cyl(0.040, 0.040, 2.40, 10, "x", 2.42, GY, Z(GH)));
    dark.push(cyl(0.062, 0.062, 0.20, 10, "x", 3.62, GY, Z(GH)));
    /* the ammunition chute from the bay up into the body */
    dark.push(box(0.30, 0.10, 0.30, -0.15, GY + 0.12, Z(GH + 0.22)));

    /* --------------------------------------------------- stub wings ----
       7.34 m over the tip pods. Straight leading edge, trailing edge swept
       forward so the chord falls from 1.60 m at the root to 0.95 m at the
       tip; set at mid height, no dihedral (three-view front). */
    function wAt(y) { return function (x, z, kk) { return [x, y, Z(WING_H) + kk]; }; }
    var wRoot = foil([0.50, 0], [-1.10, 0], 0.22, wAt(W_ROOT));
    var wTip = foil([0.48, 0], [-0.47, 0], 0.13, wAt(W_TIP));
    both(skin, solid(wRoot, wTip));
    function wLE(y) { return 0.50 + (0.48 - 0.50) * (y - W_ROOT) / (W_TIP - W_ROOT); }
    function wTE(y) { return -1.10 + (-0.47 + 1.10) * (y - W_ROOT) / (W_TIP - W_ROOT); }
    function wT(y) { return 0.22 + (0.13 - 0.22) * (y - W_ROOT) / (W_TIP - W_ROOT); }
    /* UV-26 pods: flat-sided boxes with a chamfered nose (HeliRussia
       model, three-view), 1.5 m long */
    var POD = [
      sec( 0.62, 1.70, 1.86, 1.78, 0.06, 0.08, 0.06, 0.50, POD_Y),
      sec( 0.48, 1.62, 1.94, 1.78, 0.13, 0.15, 0.12, 0.30, POD_Y),
      sec( 0.25, 1.60, 1.96, 1.78, 0.15, 0.16, 0.14, 0.25, POD_Y),
      sec(-0.75, 1.60, 1.96, 1.78, 0.15, 0.16, 0.14, 0.25, POD_Y),
      sec(-0.90, 1.66, 1.90, 1.78, 0.11, 0.12, 0.10, 0.35, POD_Y)
    ];
    var pod = loft(POD, 8, 0.03, 0.02);
    for (i = 0; i < pod.length; i++) both(skin, pod[i]);
    both(dark, box(0.05, 0.22, 0.26, -0.93, POD_Y, Z(1.78)));
    /* pylons, square under the wing at their stations */
    var WB = WING_H - 0.10;
    both(skin, box(0.90, 0.08, 0.20, -0.25, PYL_IN, Z(WB - 0.08)));
    both(skin, box(0.95, 0.08, 0.20, -0.25, PYL_OUT, Z(WB - 0.08)));

    /* inboard: B-8V20A, twenty 80 mm S-8 rockets, 2.0 m by 0.52 m */
    var podH = WB - 0.18 - 0.26;
    var prof = [[0.001, -1.06], [0.12, -1.02], [0.21, -0.88], [0.26, -0.64], [0.26, 0.82],
                [0.245, 0.94], [0.22, 0.97], [0.001, 0.97]];
    var lp = [];
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(prof[i][0], prof[i][1]));
    var bpod = new V.LatheGeometry(lp, 14);
    bpod.rotateZ(-PI / 2);
    bpod.translate(-0.30, PYL_IN, Z(podH));
    both(store, bpod);
    both(dark, discX(0.215, 16, 0.672, PYL_IN, Z(podH)));
    both(dark, cyl(0.265, 0.265, 0.05, 14, "x", 0.35, PYL_IN, Z(podH), true));
    both(dark, cyl(0.265, 0.265, 0.05, 14, "x", -0.85, PYL_IN, Z(podH), true));

    /* outboard: the six-round Vikhr launcher, two containers over four
       (KA50 weapons), 2.6 m long, on a beam under the pylon */
    var beamH = WB - 0.18 - 0.06;
    both(dark, box(1.60, 0.10, 0.12, -0.25, PYL_OUT, Z(beamH)));
    var VR = 0.080, VL = 2.60;
    var vik = [[-0.17, -0.16], [0.17, -0.16], [-0.27, -0.36], [-0.09, -0.36], [0.09, -0.36], [0.27, -0.36]];
    for (k = 0; k < vik.length; k++) {
      var vy = PYL_OUT + vik[k][0], vz = Z(beamH) + vik[k][1];
      both(store, cyl(VR, VR, VL, 10, "x", -0.05, vy, vz));
      both(dark, discX(VR * 0.8, 8, -0.05 + VL / 2 + 0.004, vy, vz));
    }
    for (k = -1; k <= 1; k += 2)
      both(store, box(0.08, 0.66, 0.36, -0.05 + k * 0.80, PYL_OUT, Z(beamH) - 0.24));

    /* ------------------------------------------------ fin and stabiliser --
       The fin: leading edge swept about 34 degrees, trailing edge nearly
       upright, a square tip at 4.45 m; the root chord lies on the boom from
       6.1 to 8.3 m behind the mast (three-view side). The rudder is the
       big after part, its hinge line painted on. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var finRoot = foil([-6.10, Z(2.34)], [-8.30, Z(2.05)], 0.18, finAt);
    var finTip = foil([-7.63, Z(4.45)], [-8.08, Z(4.45)], 0.09, finAt);
    skin.push(solid(finRoot, finTip));
    /* the stabiliser straight through the boom, 2.84 m span, and the two
       end-plate side fins, which hang mostly below it (2005 flight) */
    function stAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    both(skin, solid(foil([-4.55, 0], [-5.58, 0], 0.11, stAt(0)), foil([-4.62, 0], [-5.48, 0], 0.08, stAt(STAB_Y))));
    function epAt(z) { return function (x, zz, kk) { return [x, STAB_Y + 0.03 + kk, Z(z)]; }; }
    both(skin, solid(foil([-4.72, 0], [-5.44, 0], 0.06, epAt(STAB_H - 0.72)), foil([-4.58, 0], [-5.38, 0], 0.06, epAt(STAB_H + 0.36))));
    /* tail bumper under the boom end and the tail light */
    dark.push(box(0.30, 0.10, 0.10, -7.55, 0, Z(1.86)));
    dark.push(sph(0.05, 8, 6, -8.31, 0, Z(2.10)));

    /* ------------------------------------------------------ small kit ---- */
    /* the round port either side of the boom root, 2.4 m behind the mast
       (three-view port side, 2005 flight starboard) */
    var ap = fAt(-2.45);
    both(skin, cyl(0.13, 0.13, 0.08, 14, "y", -2.45, ap.wm * 0.80, Z(2.25)));
    both(dark, cyl(0.10, 0.10, 0.02, 14, "y", -2.45, ap.wm * 0.80 + 0.04, Z(2.25)));
    /* blade aerial on the spine (2005 flight), the spike on the boom
       (three-view), the blade under the boom root (2005 flight) */
    var t1 = fAt(-3.0).zt, t2 = fAt(-4.4).zt;
    dark.push(box(0.36, 0.03, 0.24, -3.0, 0, t1 + 0.10, 0, 0.30, 0));
    dark.push(bar([-4.4, 0, t2 - 0.02], [-4.7, 0, t2 + 0.55], 0.012, 4));
    dark.push(box(0.26, 0.03, 0.18, -2.3, 0, fAt(-2.3).zb - 0.08));

    /* ------------------------------------------------- team flashes ----
       the outer wing panels' upper faces, laid 1 cm clear of the aerofoil,
       and a band round the tail boom cut from its own sections 3% big */
    function flash(y0, y1) {
      function top(f, y, kk) {
        var x = wLE(y) + (wTE(y) - wLE(y)) * f;
        return [x, y, Z(WING_H) + wT(y) * (0.5 - 0.12 * (f - 0.15) / 0.6) + kk];
      }
      var lo = [top(0.18, y0, 0.010), top(0.72, y0, 0.010), top(0.72, y1, 0.010), top(0.18, y1, 0.010)];
      var hi = [top(0.18, y0, 0.024), top(0.72, y0, 0.024), top(0.72, y1, 0.024), top(0.18, y1, 0.024)];
      return solid(lo, hi);
    }
    both(team, flash(2.20, 3.20));
    var bandSecs = [], bx = [-5.45, -6.05];
    for (i = 0; i < 2; i++) {
      var B0 = fAt(bx[i]), zm = B0.zm;
      bandSecs.push({ x: bx[i], zm: zm, zb: zm - (zm - B0.zb) * 1.03, zt: zm + (B0.zt - zm) * 1.03,
                      wb: B0.wb * 1.03, wm: B0.wm * 1.03, wt: B0.wt * 1.03, e: B0.e, yc: 0 });
    }
    team.push(loft(bandSecs, 16, null, null)[0]);

    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");

    /* ------------------------------------------------- undercarriage ----
       RETRACTABLE tricycle (Russian Wikipedia): twin 400 x 150 nose wheels
       on a castoring leg under the cockpit, folding forward into the nose;
       700 x 250 mains on legs hung from the rear fuselage sides, folding
       back against them. Track 2.60 m, wheelbase 4.91 m. Drawn extended. */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var legs = [], tyres = [];
    var nzb = fAt(NG_X).zb;
    legs.push(bar([NG_X + 0.05, 0, nzb + 0.05], [NG_X - 0.06, 0, Z(NW_R + 0.10)], 0.060, 8));
    legs.push(bar([NG_X - 0.06, 0, Z(NW_R + 0.12)], [NG_X - 0.12, 0, Z(NW_R)], 0.045, 8));
    legs.push(cyl(0.035, 0.035, 0.42, 8, "y", NG_X - 0.12, 0, Z(NW_R)));
    legs.push(bar([NG_X + 0.55, 0, nzb + 0.04], [NG_X - 0.02, 0, Z(0.62)], 0.030, 6));
    for (s = -1; s <= 1; s += 2) {
      tyres.push(cyl(NW_R, NW_R, NW_W, 18, "y", NG_X - 0.12, s * 0.12, Z(NW_R)));
      legs.push(cyl(0.11, 0.11, NW_W + 0.01, 10, "y", NG_X - 0.12, s * 0.12, Z(NW_R)));
    }
    var msec = fAt(MG_X + 0.45);
    for (s = -1; s <= 1; s += 2) {
      var hingeY = msec.wm * 0.92;
      /* the oleo leg from the body side down and out to the axle, the
         drag strut back to the body, the axle stub, the wheel */
      legs.push(bar([MG_X + 0.45, s * hingeY, Z(1.45)], [MG_X + 0.02, s * (MG_Y - 0.18), Z(MW_R + 0.10)], 0.075, 8));
      legs.push(bar([MG_X - 0.55, s * (hingeY - 0.10), Z(1.40)], [MG_X - 0.02, s * (MG_Y - 0.20), Z(MW_R + 0.30)], 0.040, 6));
      legs.push(cyl(0.05, 0.05, 0.22, 8, "y", MG_X, s * (MG_Y - 0.11), Z(MW_R)));
      tyres.push(cyl(MW_R, MW_R, MW_W, 22, "y", MG_X, s * MG_Y, Z(MW_R)));
      legs.push(cyl(0.18, 0.18, MW_W + 0.01, 12, "y", MG_X, s * MG_Y, Z(MW_R)));
    }
    mesh(gear, legs, T.metal, "gear_legs");
    mesh(gear, tyres, T.rubber, "tyres");

    /* ======================================================== the heads ==
       The pact_ka27_helix.js mount: +PI/2 about X points the node's local
       +Y up the mast, and the inner group turned -PI/2 puts the head back
       into model axes. render3d.js turns the second "rotor" head the
       other way. Blades from 1.05 m to the tip, 0.52 m chord, the leading
       edge swept back over the last 0.45 m (2013 overhead). */
    function head(h, upper, azs) {
      var mnt = new V.Group();
      mnt.position.set(0, 0, Z(h));
      mnt.rotation.x = PI / 2;
      g.add(mnt);
      var rotor = new V.Group();
      rotor.name = "rotor";
      mnt.add(rotor);
      var hd = new V.Group();
      hd.rotation.x = -PI / 2;
      rotor.add(hd);
      var parts = [], j;
      parts.push(cyl(0.26, 0.30, 0.30, 20, "z", 0, 0, 0));
      parts.push(cyl(0.36, 0.36, 0.05, 20, "z", 0, 0, -0.18));
      if (upper) parts.push(cyl(0.10, 0.22, 0.06, 16, "z", 0, 0, 0.15));    /* cap: top at 4.90 m */
      else parts.push(cyl(0.22, 0.22, 0.05, 16, "z", 0, 0, 0.18));
      var BP = [[1.05, -0.20], [ROTOR_R - 0.45, -CHORD / 2], [ROTOR_R, -CHORD / 2 + 0.30],
                [ROTOR_R, CHORD / 2], [1.05, CHORD / 2 - 0.06]];
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        var bl = M.slab(V, BP, 0.045);
        bl.translate(0, 0, -0.0225);
        bl.rotateZ(a);
        parts.push(bl);
        /* sleeve, hinge housing, lag damper, pitch horn and link */
        var hp = [box(0.80, 0.22, 0.15, 0.66, 0, 0),
                  box(0.34, 0.30, 0.17, 0.30, 0, -0.02),
                  cyl(0.045, 0.045, 0.52, 8, "x", 0.62, 0.20, 0.05),
                  box(0.10, 0.20, 0.05, 0.82, -0.22, -0.04),
                  bar([0.86, -0.24, -0.06], [0.30, -0.22, -0.26], 0.022, 5)];
        for (i = 0; i < hp.length; i++) { hp[i].rotateZ(a); parts.push(hp[i]); }
      }
      mesh(hd, parts, T.rotor, "hub_blades");
      mesh(hd, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");
    }
    head(H_LO, false, [40, 160, 280]);
    head(H_UP, true, [100, 220, 340]);
    return g;
  }
  return { build: build };
})();

/* len is the MEASURED x extent: the rotor disc's front edge to the fin
   trailing edge; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["pact_e90_gunship"] = { len: 15.48, build: function (THREE, M, C) { return HeroKa50.build(THREE, M, C); } };
