/* ======== gb_misc2.js - HERO models: the Sea King HC4 and the two British landing ships ========
   Rows and what draws them:
     gbr_e80_seaking4  Westland Sea King HC4 (Commando)       NEW   HeroGbSeaKing.hc4
     gbr_e50_lst       LST (3), as LST 3035 stood in 1945-50  NEW   HeroGbAmphib.lst3
     gbr_e60_lst       Round Table class LSL, as built         NEW   HeroGbAmphib.lsl
   This file calls nothing outside itself (and the M.slab helper every builder is handed): it may
   load anywhere after three.js.

   ROWS LOOKED AT AND NOT REGISTERED HERE (their generic models stand; see the report):
     gbr_e60_mlrs (Honest John, 24 Missile Regiment RA).  HeroUsEarlyRockets.buildHJ draws the
       M289 launcher: the open cab and the long rail running out past the bumper.  The only
       British-service references found, the IWM Duxford launcher ("International Harvester
       M386 TEL with an Honest John Nuclear Missile (5781692428).jpg" and "(5781143913).jpg",
       2011), show the M386: a CLOSED cab and a SHORT rail with the round's nose standing over
       the cab, in green with black disruptive bands.  Not the same launcher, so it is not
       called.
     gbr_e80_mlrs, gbr_e90_mlrs (M270).  HeroUsMlrs draws the vehicle; its paint keys are
       merdc (four colours), nato3 (green / brown / black) and carc (plain green).  The one
       period British photograph found, "M270 at RIAT 1998.jpg" (1998-07-26, a 39 Regiment RA
       launcher with its Royal Artillery display board), shows dark green with BLACK
       disruptive bands and no brown: none of the module's keys.  No 1989-91 photograph of a
       British M270 was found (the IWM Gulf War frame GLF855 is a US launcher at night).
     gbr_e00_mlrs (M270B1).  "MLRS (Multiple Launch Rocket System) Vehicles at Camp Bastion,
       Afghanistan MOD 45148148.jpg" (39 Regiment RA, sand): the B1 armoured cab is a
       different, taller box with small windows, plus bar armour and a weapon station; not a
       small change, and HeroUsMlrs cannot draw it without being edited.
     gbr_e80_spg (M109A2).  HeroPaladin "e80" draws an M109A2 (NATO three-colour); no
       photograph of a British M109 of any period was found on Commons, so the paint cannot be
       settled.

   ===================================================================== SEA KING HC4
   REFERENCES (Commons through thumb.php; cached in scratchpad/q_gbm2_ref):
     [D]  "Westland Sea King drawing.svg" (en.wikipedia's orthographic three-view of the
          SH-3 / Sea King), rendered at 1600 px: THE MEASURING DRAWING.  Its side view is the
          port side, nose left.  Scale: the published fuselage length 54 ft 9 in (16.69 m,
          en.wikipedia "Sikorsky SH-3 Sea King") over the 767 px from the nose to the end of
          the tail pylon: 46.0 px/m.  The top view agrees within 1% (the 62 ft rotor's blades
          read 45.6 px/m).  Ground line: the wheel bottoms, row 890.
     [P1] "Westland Sea King HC4, UK - Navy AN1410891.jpg" (a line of 845/846 NAS HC4s in
          flight, starboard side): the HC4's olive (sampled), NO dorsal radome hump, NO float
          sponsons: a short stub sponson carrying a single leg with the main wheel, the
          starboard cargo door open just ahead of the mast, the tail wheel at the step, the
          tail rotor on the starboard side of the pylon, round engine exhausts ahead of the
          mast.  Main wheel: 0.74 m ahead of the hub (20 px at the 27 px/m of the nose-to-hub
          4.93 m in this frame).
     Text: en.wikipedia "Westland Sea King" (Commando / HC4: "deletion of the side floats,
          the main undercarriage being carried on stub sponsons", 28 troops, first flight 26
          September 1979; HAS.5 length 55 ft 10 in, height 16 ft 10 in, rotor 62 ft) and
          "Sikorsky SH-3 Sea King" (fuselage 54 ft 9 in, height 16 ft 10 in "tail rotor at
          high position", rotor 62 ft 0 in).
   STATION TABLE off [D] (x metres ahead of the main hub, heights above the ground):
     nose tip x 4.93 at 1.57; windscreen foot x 3.9 at 3.0; cabin roof 3.85 from x 3.3 to
     0.3; the engine fairing rising to 4.57 between x -0.2 and -1.9, closing at x -2.8 onto
     the aft roof at 3.52; the boat-hull keel 0.61 from x 3.9 aft to the step at x -5.9,
     where the tail cone's underside starts at 1.48 and climbs (1.85 at x -7.8, 2.24 at
     x -9.4) into the pylon; pylon top 4.35 at x -11.1; tail rotor hub x -11.63 at 4.20;
     main rotor blade plane 4.83, the head's dome 5.33; cabin windows 2.17 to 2.72 high at
     x 0.1..0.87, -0.33..-0.98 and -4.0..-4.7 (port side; mirrored, NOT confirmed for the
     starboard side); the port crew door x 1.85..2.8; the round exhaust at x 0.8, 3.65 up.
     Fuselage width 2.04 m over the cabin (top view), the boom 0.55 m at x -8.
   RECOGNITION LIST:
     1. boat hull: deep cabin, flat sides, V keel from the nose to the step [D] - loft FUS
     2. glazed nose with the stepped windscreen and side windows [D][P1] - glass
     3. the two-engine fairing high on the roof, ahead of and around the mast, with a round
        exhaust each side [D][P1] - loft COWL, exhausts
     4. five-blade main rotor, its domed head [D]
     5. the long tapering tail cone sweeping up into a tall pylon, six-blade tail rotor on the
        starboard side, the tailplane on the port side of the pylon [D][P1]
     6. HC4: no radome, no floats; stub sponsons with a single leg and wheel, the tail wheel
        at the step [P1] (the HAS floats of [D] are NOT drawn)
     7. cabin windows, the starboard cargo door ahead of the mast [D][P1]
   PAINT: the HC4 olive of [P1] (98, 98, 78 sampled, taken to 0.85): #535342 all over; black
     walkways are not drawn.  No roundels, no ROYAL NAVY titles, no serials.
   NOT CONFIRMED: the HC4 main gear track (3.65 m, the [D] front view's wheel spacing for the
     HAS floats) and the stub sponson's size (from [P1]'s proportions); the starboard window
     places (the port ones mirrored); the tail rotor's blade count (six, as [D]); its sense of
     turn; the mast tilt (none drawn: [D] draws the blades level).  HEIGHT: measured 5.33 m
     to the rotor dome and 5.78 m to the top tail rotor tip, against the published 16 ft 10 in
     (5.13 m) "tail rotor at high position": [D] draws the pylon and the tail rotor higher than
     that figure allows; the drawing is kept (P1, a flying frame, puts the tail rotor hub level
     with the cabin roof, as [D] does), nothing is squashed.
   NAMED NODES: "rotor" (Lynx convention: +PI/2 about X mount, counter-clockwise from above, as
     Sikorsky rotors turn), "rotordisc" inside it, "tailrotor" (hub axis local Z, the mount
     turned +PI/2 about X), "undercarriage" (fixed gear: NOT named "gear", which render3d
     hides in flight).  len is the measured X extent with the rotors turning.
   Model space: +X nose, +Y port, +Z up, metres; origin under the hub, 2.00 m above the wheels.

   ===================================================================== LST (3)
   REFERENCES:
     [L1] "Lst (3) 3035 FL7209.jpg" (IWM FL 7209, LST 3035 at anchor, starboard bow): the
          bluff flat-sided hull with the bow door seams, the raised gun platform over the bow
          with its two tubs, the long open upper deck with ventilator cowls along the sides,
          the derrick post ahead of the bridge, the pole mast with its yard, the boats in
          davits aft, the square stern.
     [L2] "British tank landing ship HMS Messina (L112).jpg" (starboard beam, nearly square
          on, stern left): THE MEASURING PHOTOGRAPH.  Scale: 347 ft (105.8 m) over the 1162 px
          from the stern to the stem head: 10.98 px/m.  Messina carried LCM (7)s on her deck
          (en.wikipedia "LST Mk.3": only she and Narvik); those and her 30-ton derrick are NOT
          drawn: the standard ship of [L1] is.
     Text: en.wikipedia "LST Mk.3": 347 ft o/a, 55 ft 2 in beam, draught loaded 4 ft 7 in
          forward and 11 ft 6 in aft (the 1 in 50 keel slope), twin screws, two 15-ton
          derricks the standard fit.
   STATIONS off [L2] (x from amidships, + forward; z above the waterline): stern -52.9, stem
     head +52.9 (the stem 2.5 m raked); deck at the side 5.5 aft, 5.0 amidships, 6.1 at the
     bow; the after deckhouse from the stern to x -7 (roof 7.7); the bridge block x -36..-14
     (roof 10.3, bridge 12.5); the funnel centre x -29.3 (top 15.9); the pole mast x -22.9 (top
     26.6); the derrick post x -11.9 (top 18.4).  Keel 1.4 m below the waterline forward and
     3.5 m aft (text).  The bow gun platform x 38..50, 2.6 m over the deck [L1].
   NOT CONFIRMED: the platform's guns (row: "8x 20 mm Oerlikon on some ships": only the tubs
     are drawn), the boats' number (two a side drawn, [L1] shows the starboard pair), the
     bow's plan form (from [L1]'s 3/4 view), the paint (B/W photographs: RN light grey drawn,
     the dark patch on [L1]'s hull is not), the ventilator count.

   ===================================================================== ROUND TABLE LSL
   REFERENCES:
     [R1] "RFA Sir Geraint (L3027), Akrotiri Mole 1977.jpg" (port beam, bow left, bow doors
          open): THE MEASURING PHOTOGRAPH, small (5.33 px/m): 413 ft (125.9 m) over the 670 px
          from the stem to the stern.
     [R2] "Galahad82.jpg" (Sir Galahad, 1982, starboard bow): the high forecastle with the
          two tapered kingposts at its after end and a pole mast forward, the long hull with
          the row of openings along the upper vehicle deck, the four-deck superstructure aft,
          the crane at its forward end, the mast with its yard, the helicopter deck aft on
          supports past the stern.
     [R3] "RFA Sir Percivale L3036.jpg" (from above, starboard bow): the plan: the kingposts
          staggered (port forward, starboard aft), the open upper deck with vehicles, the round
          funnel abaft the mast, two boats on the starboard side, the after helicopter deck.
     Text: en.wikipedia "Round Table-class landing ship logistics": 413 ft, 59 ft beam, 13 ft
          draught, 3,270 tons; bow and stern doors; helicopter decks; 2 x 20 mm.
   STATIONS off [R1] (metres from the bow, then x = 62.95 - that; z above the waterline):
     forecastle deck 13.3, its break 28.5 aft (x 34.5); the hull top 9.9 amidships, 12.4 under
     the superstructure; superstructure front 77.9 (x -14.95), its levels 15.6, 18.4, 19.9;
     the mast 86.7 (x -23.75, top 30.4); the funnel 92.3..98.9 (top 20.6); the crane pedestal
     75.4 (x -12.5) with its boom head 64 m aft of the bow at 21 m; the helicopter deck from
     104.5 (x -41.5) to the stern, 0.45 m past the transom (the hull's transom is put at
     x -62.5 so that the 413 ft is over the stem and the deck's after edge, as [R1] measures); the kingposts 21.0 (port) and 27.6 (starboard), tops
     17.5; the forecastle pole mast 14.0, top 24.8.
   NOT CONFIRMED: every height (one small photograph at 5.33 px/m, about +-0.4 m); the
     superstructure's plan (from [R3]'s oblique view); the hull's bow flare; the 20 mm guns
     (not seen: not drawn); the boats on the port side (mirrored from [R3]'s starboard pair).
     Drawn as built (1964-67), so none of the post-1982 rebuilds.
   PAINT: RFA grey sampled off [R3] (127, 131, 140, taken to 0.85), decks dark grey, the
     helicopter deck's light grey; no pennant numbers, names or flags.

   DRAWN (dump.js), against the published figures:
     Sea King HC4  22.66 m over the turning rotors (fuselage 16.69 m as scaled; 18.90 m disc);
                   bbox height 5.62 m (rotor dome 5.33, see above; published 5.13)
                   3456 tris, 13 draw calls
     LST (3)       105.85 x 16.80 m (347 ft = 105.8, 55 ft 2 in = 16.8), mast top 26.6 m over
                   the waterline, keel 3.5 m under it aft     5284 tris, 10 draw calls
     Round Table   125.98 x 18.12 m over the hawses (413 ft = 125.9, 59 ft = 18.0), draught 4.0
                   (13 ft), mast top 30.4 m                    6708 tris, 11 draw calls
   Ships: +X bow, +Y port, +Z up, metres, WATERLINE z = 0.  No "turret" (the rows carry no
   weapons).  Every ship part is baked into one mesh per material.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ============================================================== Sea King HC4 */
var HeroGbSeaKing = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* datums from the station table [D] */
  var GROUND = -2.00;
  function Z(h) { return GROUND + h; }
  var HUB_H = 4.83, ROTOR_R = 9.45, CHORD = 0.46, ROOT_CUT = 1.10;
  var TR_X = -11.63, TR_Y = -0.42, TR_H = 4.20, TR_R = 1.58, TR_CHORD = 0.19;
  var MW_X = 0.74, MW_Y = 1.825, MW_R = 0.29, TW_X = -5.93, TW_R = 0.20;
  var BASE = "#535342";

  /* ---------------------------------------------------------- painted skin
     One 1024 x 1024 sheet in four bands (top, port, starboard, belly), model metres. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -12.5, UX1 = 5.2, QY = 2.2, QZ0 = Z(0.3), QZ1 = Z(5.6);
  var SX = TW / (UX1 - UX0);
  function pxX(x) { return (x - UX0) * SX; }
  function pyTop(y) { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y) { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  var _cv = null, _tex;
  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), R = rngFor(1979), i, b;
    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);
    /* faded panels and weathering, a darker belly */
    for (i = 0; i < 160; i++) {
      g.fillStyle = (i & 1) ? "rgba(255,255,235,0.05)" : "rgba(0,0,0,0.06)";
      g.fillRect(R() * TW, R() * TH, (0.4 + R() * 1.4) * SX, 8 + R() * 28);
    }
    g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(0, 3 * BAND, TW, BAND);
    /* exhaust soot down the roof and the sides aft of the exhausts */
    var sg = g.createLinearGradient(pxX(0.8), 0, pxX(-5.0), 0);
    sg.addColorStop(0, "rgba(16,15,12,0.40)"); sg.addColorStop(1, "rgba(16,15,12,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-5.0), pyTop(1.1), pxX(0.8) - pxX(-5.0), pyTop(-1.1) - pyTop(1.1));
    for (b = 1; b <= 2; b++) g.fillRect(pxX(-5.0), pySide(Z(4.1), b), pxX(0.8) - pxX(-5.0), pySide(Z(3.2), b) - pySide(Z(4.1), b));
    /* frames, the step and the boom joint [D] */
    var frames = [3.9, 3.26, 1.96, 0.95, -0.4, -1.52, -2.8, -4.0, -5.0, -5.9, -7.0, -8.5, -10.0];
    g.lineWidth = 1.3;
    for (i = 0; i < frames.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.20)";
      g.beginPath(); g.moveTo(pxX(frames[i]), 0); g.lineTo(pxX(frames[i]), TH); g.stroke();
    }
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.18)";
      g.beginPath(); g.moveTo(0, pySide(Z(3.20), b)); g.lineTo(TW, pySide(Z(3.20), b)); g.stroke();
      g.beginPath(); g.moveTo(0, pySide(Z(1.30), b)); g.lineTo(TW, pySide(Z(1.30), b)); g.stroke();
    }
    return cv;
  }
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    try {
      if (!_cv) _cv = skinCanvas();
      var t = new V.CanvasTexture(_cv);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex = t;
    } catch (e) { _tex = false; }
    return _tex;
  }
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
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
        if (band === 0) { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else { U = pxX(endOn ? x + y : x); W = pySide(z, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.06 });
    if (tex) m.skin.map = tex; else m.skin.color.set(BASE);
    m.metal = new V.MeshStandardMaterial({ color: 0x585e60, roughness: 0.5, metalness: 0.55 });
    m.dark = new V.MeshStandardMaterial({ color: 0x1c1e1d, roughness: 0.7, metalness: 0.25 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x151515, roughness: 0.95, metalness: 0.0 });
    m.blade = new V.MeshStandardMaterial({ color: 0x2c2f2b, roughness: 0.78, metalness: 0.15 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1e2c33, roughness: 0.08, metalness: 0.2,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.4, metalness: 0.08,
                                          transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ------------------------------------------------- geometry kit (gb_lynx.js) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz) geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2); else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs); g.scale(sx || 1, sy || 1, sz || 1); return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, true);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array, n = g.attributes.normal ? g.attributes.normal.array : null, i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
      if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
    }
    if (g.attributes.uv) g.deleteAttribute("uv");
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array, u = g.attributes.uv ? g.attributes.uv.array : null;
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
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
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
  /* the loft: superelliptic sections, heights given above ground (gb_lynx.js) */
  function sec(x, zb, zt, zm, wb, wm, wt, e) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: 0 };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e) + s.yc, z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([2 * s.yc - pts[i][0], pts[i][1]]);
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
  function secAt(secs, x) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = { x: x, yc: 0 };
        ["zb", "zt", "zm", "wb", "wm", "wt", "e"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return secs[x > secs[0].x ? 0 : secs.length - 1];
  }
  /* the port-side skin y at model height z, station x */
  function sideY(secs, x, z) {
    var s = secAt(secs, x), lo = -PI / 2, hi = PI / 2, i, m;
    for (i = 0; i < 30; i++) { m = (lo + hi) / 2; if (ringPt(s, m)[1] < z) lo = m; else hi = m; }
    return ringPt(s, (lo + hi) / 2)[0];
  }
  /* a flat panel standing off the port skin over x0..x1 (x0 > x1), z0..z1 */
  function sidePanel(secs, x0, x1, z0, z1, off, t) {
    var a = [], b = [], xs = [x0, x1], zs = [z0, z1], i, j;
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      var y = sideY(secs, xs[i], zs[j]) + off;
      a.push([xs[i], y, zs[j]]); b.push([xs[i], y + t, zs[j]]);
    }
    return solid([a[0], a[1], a[3], a[2]], [b[0], b[1], b[3], b[2]]);
  }

  /* --------------------------------------------------------------------- build */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C), g = new V.Group();
    g.name = "seaking_hc4";
    var i, k, s, a;
    var skin = [], dark = [], metal = [], glass = [], team = [], rub = [];

    /* the fuselage: the boat hull from the nose to the step, the tail cone and pylon [D] */
    var FUS = [
      sec( 4.93, 1.55, 1.60, 1.57, 0.05, 0.08, 0.05, 0.8),
      sec( 4.78, 1.20, 2.00, 1.60, 0.20, 0.55, 0.40, 0.7),
      sec( 4.35, 0.85, 2.60, 1.50, 0.30, 0.86, 0.66, 0.6),
      sec( 3.91, 0.65, 3.00, 1.40, 0.34, 0.98, 0.80, 0.5),
      sec( 3.26, 0.61, 3.80, 1.40, 0.36, 1.02, 0.86, 0.45),
      sec( 1.96, 0.61, 3.85, 1.40, 0.36, 1.02, 0.86, 0.4),
      sec(-1.52, 0.61, 3.75, 1.40, 0.36, 1.02, 0.86, 0.4),
      sec(-2.90, 0.61, 3.52, 1.40, 0.36, 1.02, 0.84, 0.4),
      sec(-5.85, 0.61, 3.52, 1.45, 0.36, 1.00, 0.80, 0.4),
      sec(-5.95, 1.48, 3.52, 2.20, 0.50, 0.92, 0.76, 0.5),
      sec(-7.83, 1.85, 3.50, 2.55, 0.32, 0.55, 0.46, 0.6),
      sec(-9.35, 2.24, 3.48, 2.80, 0.20, 0.35, 0.30, 0.7),
      sec(-10.0, 2.50, 3.98, 3.10, 0.16, 0.26, 0.20, 0.7),
      sec(-11.09, 3.50, 4.35, 3.85, 0.12, 0.20, 0.14, 0.7),
      sec(-11.74, 3.82, 4.30, 4.05, 0.08, 0.14, 0.08, 0.8)
    ];
    var L = loft(FUS, 14, -0.04, 0.06);
    for (i = 0; i < L.length; i++) skin.push(L[i]);

    /* the engine fairing on the roof, its intakes at the front, round exhausts each side [D][P1] */
    var COWL = [
      sec( 0.80, 3.80, 3.86, 3.82, 0.60, 0.62, 0.40, 0.6),
      sec( 0.20, 3.78, 4.30, 4.00, 0.70, 0.74, 0.50, 0.5),
      sec(-0.20, 3.76, 4.57, 4.10, 0.72, 0.76, 0.52, 0.5),
      sec(-1.90, 3.70, 4.57, 4.05, 0.72, 0.76, 0.52, 0.5),
      sec(-2.40, 3.62, 4.20, 3.90, 0.62, 0.66, 0.42, 0.5),
      sec(-2.83, 3.50, 3.60, 3.55, 0.50, 0.52, 0.30, 0.6)
    ];
    L = loft(COWL, 10, -0.06, 0.05);
    for (i = 0; i < L.length; i++) skin.push(L[i]);
    both(dark, box(0.06, 0.50, 0.34, 0.83, 0.32, Z(4.02)));                  /* intake faces */
    both(dark, cyl(0.20, 0.20, 0.12, 14, "y", 0.80, 0.79, Z(3.65)));          /* exhaust mouths */
    both(skin, cyl(0.25, 0.25, 0.10, 14, "y", 0.80, 0.74, Z(3.65)));

    /* the glazing: windscreen, the cockpit side windows, the chin windows [D] */
    for (s = -1; s <= 1; s += 2) {
      var wsA = [[4.55, s * 0.08, Z(2.40)], [3.95, s * 0.08, Z(2.95)], [3.90, s * 0.78, Z(2.95)], [4.42, s * 0.74, Z(2.40)]];
      var wsB = wsA.map(function (p) { return [p[0] + 0.03, p[1] * 1.02, p[2] + 0.02]; });
      glass.push(solid(wsA, wsB));
    }
    both(glass, sidePanel(FUS, 3.85, 3.05, Z(2.30), Z(2.95), 0.01, 0.025));
    both(glass, sidePanel(FUS, 4.55, 4.10, Z(1.45), Z(2.05), 0.01, 0.025));
    var WIN = [[0.87, 0.10], [-0.33, -0.98], [-4.0, -4.7]];
    for (i = 0; i < WIN.length; i++) both(glass, sidePanel(FUS, WIN[i][0], WIN[i][1], Z(2.17), Z(2.72), 0.01, 0.02));
    /* the port crew door [D] and the starboard cargo door ahead of the mast [P1]: panel seams */
    skin.push(sidePanel(FUS, 2.80, 1.85, Z(0.95), Z(2.95), 0.0, 0.03));
    glass.push(sidePanel(FUS, 2.65, 2.05, Z(2.35), Z(2.75), 0.03, 0.015));
    skin.push(mirrorY(sidePanel(FUS, 2.70, 0.85, Z(0.85), Z(3.05), 0.0, 0.03)));

    /* stub sponsons and the fixed main gear: one leg, one wheel each side [P1] */
    var undc = [], undm = [];
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 0.95, y1 = s * 1.62;
      skin.push(solid([[1.55, y0, Z(0.95)], [-0.55, y0, Z(0.95)], [-0.55, y0, Z(1.35)], [1.55, y0, Z(1.35)]],
                      [[1.20, y1, Z(1.02)], [-0.25, y1, Z(1.02)], [-0.25, y1, Z(1.28)], [1.20, y1, Z(1.28)]]));
      undm.push(bar([MW_X, s * 1.50, Z(1.05)], [MW_X, s * MW_Y, Z(MW_R)], 0.07, 8));
      undm.push(bar([MW_X, s * 1.10, Z(0.62)], [MW_X, s * (MW_Y - 0.1), Z(MW_R + 0.12)], 0.035, 6));
      undc.push(cyl(MW_R, MW_R, 0.22, 16, "y", MW_X, s * MW_Y, Z(MW_R)));
      undm.push(cyl(0.13, 0.13, 0.24, 10, "y", MW_X, s * MW_Y, Z(MW_R)));
    }
    /* the tail wheel at the step, a fork on a trailing leg [D][P1] */
    undm.push(bar([-5.78, 0, Z(0.70)], [TW_X, 0, Z(TW_R + 0.05)], 0.06, 8));
    undc.push(cyl(TW_R, TW_R, 0.14, 14, "y", TW_X, 0, Z(TW_R)));
    var und = new V.Group();
    und.name = "undercarriage";
    mesh(und, undm, T.metal, "legs");
    mesh(und, undc, T.rubber, "tyres");
    g.add(und);

    /* the tailplane on the port side of the pylon [D top view] */
    skin.push(solid([[-10.95, 0.12, Z(3.92)], [-11.80, 0.12, Z(3.92)], [-11.70, 2.10, Z(3.95)], [-11.20, 2.10, Z(3.95)]],
                    [[-10.95, 0.12, Z(4.06)], [-11.80, 0.12, Z(4.04)], [-11.70, 2.10, Z(4.00)], [-11.20, 2.10, Z(4.01)]]));
    /* the tail rotor gearbox fairing on the pylon's starboard face */
    skin.push(cyl(0.16, 0.20, 0.30, 12, "y", TR_X, -0.20, Z(TR_H)));
    /* aerials, steps, the hoist-less HC4's roof handholds: small and dark */
    dark.push(box(0.05, 0.05, 0.45, -3.2, 0, Z(3.75)));
    dark.push(box(0.30, 0.06, 0.06, 2.4, 0, Z(0.58)));

    /* team: a panel on the cabin roof aft of the cowl and the tailplane's top */
    team.push(box(1.20, 1.10, 0.03, -3.6, 0, Z(3.535)));
    team.push(solid([[-11.10, 0.6, Z(4.065)], [-11.75, 0.6, Z(4.045)], [-11.65, 1.9, Z(4.015)], [-11.25, 1.9, Z(4.02)]],
                    [[-11.10, 0.6, Z(4.085)], [-11.75, 0.6, Z(4.065)], [-11.65, 1.9, Z(4.035)], [-11.25, 1.9, Z(4.04)]]));

    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, team, T.team, "team");

    /* main rotor: the mast and the domed head; five blades [D] */
    var mast = new V.Group();
    mast.position.set(0, 0, Z(HUB_H));
    g.add(mast);
    mesh(mast, [cyl(0.20, 0.24, 0.30, 14, "z", 0, 0, -0.22), cyl(0.42, 0.42, 0.08, 18, "z", 0, 0, -0.30)], T.metal, "mast");
    var mnt = new V.Group();
    mnt.rotation.x = PI / 2;
    mast.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.42, 0.46, 0.22, 18, "z", 0, 0, 0));
    hubM.push(sph(0.44, 16, 6, 0, 0, 0.30, 1, 1, 0.55));
    hubD.push(cyl(0.40, 0.40, 0.18, 18, "z", 0, 0, 0.18));
    var LE = 0.25 * CHORD, TE = LE - CHORD;
    var BP = [[ROOT_CUT - 0.15, TE + 0.08], [ROOT_CUT, TE], [ROTOR_R - 0.05, TE], [ROTOR_R, TE + 0.05],
              [ROTOR_R, LE - 0.03], [ROTOR_R - 0.04, LE], [ROOT_CUT, LE], [ROOT_CUT - 0.15, LE - 0.04]];
    for (k = 0; k < 5; k++) {
      a = (36 + 72 * k) * D2R;
      var bl = M.slab(V, BP, 0.06);
      bl.translate(0, 0, -0.03);
      bl.rotateX(5 * D2R);
      bl.rotateZ(a);
      blades.push(bl);
      var arm = [box(0.70, 0.20, 0.16, 0.65, 0, 0), cyl(0.07, 0.07, 0.40, 8, "x", 1.05, 0, 0)];
      for (i = 0; i < arm.length; i++) { arm[i].rotateZ(a); hubM.push(arm[i]); }
      var dmp = cyl(0.045, 0.045, 0.55, 8, "x", 0.75, -0.18, 0.06);
      dmp.rotateZ(a); hubD.push(dmp);
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.12)], T.disc, "rotordisc");

    /* tail rotor: six blades on the starboard side of the pylon [D][P1]; hub axis local Z, the
       mount turned +PI/2 about X so local Z points to starboard.  One blade points straight aft. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.12, 0.12, 0.18, 12, "z", 0, 0, 0), cyl(0.10, 0.03, 0.12, 10, "z", 0, 0, 0.14)];
    var trB = [];
    for (k = 0; k < 6; k++) {
      var ang = (180 + 60 * k) * D2R;
      var tb = box(TR_R - 0.25, TR_CHORD, 0.03, 0.25 + (TR_R - 0.25) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(ang);
      trB.push(tb);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");
    return g;
  }

  return { hc4: function (THREE, M, C) { return build(THREE, M, C); } };
})();

/* ============================================================ the landing ships */
var HeroGbAmphib = (function () {
  "use strict";
  var PI = Math.PI;

  /* ------------------------------------------------------------- textures (ru_riga.js) */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvasTex(THREE, key, W0, H0, draw) {
    if (TEX[key]) return TEX[key];
    try {
      var cv = document.createElement("canvas"); cv.width = W0; cv.height = H0;
      draw(cv.getContext("2d"), W0, H0);
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      TEX[key] = t;
    } catch (e) { TEX[key] = null; }
    return TEX[key];
  }
  /* hull plating: one tile 24 m x 8 m: strakes, butts, rust streaks */
  function hullTex(THREE) {
    return canvasTex(THREE, "gbamph_hull", 512, 256, function (g, w, h) {
      var R = rng(3035), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 5; i++) { var xx = i * w / 5 + (i % 2) * 18; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 50; i++) { g.fillStyle = R() < 0.6 ? "#3a2a20" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80); }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "gbamph_plate", 256, 256, function (g, w, h) {
      var R = rng(1964), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "gbamph_deck", 256, 256, function (g, w, h) {
      var R = rng(1945), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      g.globalAlpha = 0.09;
      for (i = 0; i < 34; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }

  function makeMats(THREE, C, P) {
    var team = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    function skin(col, tex, r) { return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 }); }
    function metal(col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide }); }
    var M = {
      hull: skin(P.hull, hullTex(THREE), 0.86),
      boot: skin(0x141516, hullTex(THREE), 0.9),
      under: skin(0x3a1612, hullTex(THREE), 0.9),
      sup: skin(P.sup, plateTex(THREE), 0.86),
      deck: skin(P.deck, deckTex(THREE), 0.95),
      pad: skin(P.pad, deckTex(THREE), 0.92),
      dark: metal(0x1c1e1f, 0.85, 0.2),
      soot: metal(0x26282a, 0.7, 0.35),
      metal: metal(0x5c636a, 0.52, 0.55),
      team: skin(team, plateTex(THREE), 0.84),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0, transparent: true, opacity: 0.84 })
    };
    for (var k in M) if (M.hasOwnProperty(k)) { M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true; }
    return M;
  }

  /* ------------------------------------------------------------------ helpers (ru_riga.js) */
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    if (idx) g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (rz) b.rotation.z = rz; p.add(b); return b;
  }
  /* an axis-aligned block given by its extents */
  function blk(THREE, p, m, x0, x1, y0, y1, z0, z1) {
    return box(THREE, p, x1 - x0, y1 - y0, z1 - z0, m, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* box with 8 given corners (bottom 0-3, top 4-7, CCW from above) */
  function hexa(THREE, p, m, Vv) {
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = Vv[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16); else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16); else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  function polyPrism(THREE, p, m, pts, z0, z1) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push(v[k][0] * 0.16 + v[k][1] * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([pts[0][0], pts[0][1], z1], [pts[i][0], pts[i][1], z1], [pts[i + 1][0], pts[i + 1][1], z1], false);
      tri([pts[0][0], pts[0][1], z0], [pts[i + 1][0], pts[i + 1][1], z0], [pts[i][0], pts[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      tri([a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1], true);
      tri([a[0], a[1], z0], [b[0], b[1], z1], [a[0], a[1], z1], true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  function ringLoft(THREE, p, m, xs, rings) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) { pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * 0.2, j / n); }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = a + n, d = b + n;
      idx.push(a, b, c, b, d, c);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); p.add(mm); return mm;
  }
  function superRing(w, h, zc, e, n) {
    var r = [], j, t;
    for (j = 0; j < n; j++) {
      t = j / n * PI * 2;
      var c = Math.cos(t), s = Math.sin(t);
      r.push([w * Math.sign(c) * Math.pow(Math.abs(c), e), zc + h * Math.sign(s) * Math.pow(Math.abs(s), e)]);
    }
    return r;
  }
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      var id = o.material.uuid;
      if (!bins[id]) { bins[id] = { m: o.material, P: [], N: [], U: [] }; order.push(id); }
      var b = bins[id], pa = geo.attributes.position.array, na = geo.attributes.normal.array;
      var ua = geo.attributes.uv ? geo.attributes.uv.array : null, i;
      for (i = 0; i < pa.length; i++) { b.P.push(pa[i]); b.N.push(na[i]); }
      for (i = 0; i < pa.length / 3; i++) b.U.push(ua ? ua[i * 2] : 0, ua ? ua[i * 2 + 1] : 0);
    });
    var out = new THREE.Group();
    order.forEach(function (id) {
      var b = bins[id], g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.N, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.U, 2));
      var me = new THREE.Mesh(g, b.m); me.castShadow = true; me.receiveShadow = true; out.add(me);
    });
    return out;
  }

  /* ------------------------------------------------------------------ the hull
     H: { XS stern, XB stem head, XW stem at the waterline, half: half beam, deck(x),
          keel(x) (below the waterline, negative), bowStart (x where the plan starts to
          close), bowMin (half breadth left at the stem: the door), flare }.
     Wall-sided above the bilge; the bow closes in plan from bowStart; the stem rakes
     from XB at the deck to XW at the waterline. */
  function halfAt(H, x, z) {
    var w = H.half;
    if (x > H.bowStart) {
      var xe = H.XW + (H.XB - H.XW) * Math.max(0, Math.min(1, z / H.deck(H.XB)));
      if (z < 0) xe = H.XW + (z / H.keel(H.XW)) * -1.5;
      var t = Math.min(1, Math.max(0, (x - H.bowStart) / Math.max(0.5, xe - H.bowStart)));
      w = H.bowMin + (H.half - H.bowMin) * Math.sqrt(Math.max(0, 1 - t * t));
      if (z > 0) w += (H.half - w) * H.flare * Math.min(1, z / H.deck(x));
    }
    var zk = H.keel(x);
    if (z < zk + H.bilge) {
      var f = Math.max(0, (z - zk) / H.bilge);
      w *= 0.55 + 0.45 * Math.sqrt(f);
    }
    return w;
  }
  function xsOf(H) {
    var xs = [], x;
    for (x = H.XS; x < H.bowStart; x += 4) xs.push(x);
    for (x = H.bowStart; x < H.XB; x += 0.8) xs.push(x);
    xs.push(H.XB);
    (H.breaks || []).forEach(function (b) { xs.push(b - 0.01, b + 0.01); });
    xs.sort(function (a, b) { return a - b; });
    return xs;
  }
  /* the stem: x where the bow ends at height z */
  function stemX(H, z) {
    if (z >= 0) return H.XW + (H.XB - H.XW) * Math.min(1, z / H.deck(H.XB));
    return H.XW - 1.5 * (z / H.keel(H.XW));
  }
  function shell(THREE, H, m, zlo, zhi, rows) {
    var xs = xsOf(H), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var x = xs[i], zk = H.keel(x), zd = H.deck(x);
        var a = Math.min(Math.max(zlo, zk), zd), b = Math.min(Math.max(zhi, zk), zd);
        for (j = 0; j < NR; j++) {
          var z = a + (b - a) * j / rows, xx = Math.min(x, stemX(H, z));
          pos.push(xx, s * halfAt(H, xx, z), z); uv.push(xx / 24, z / 8);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < rows; j++) {
        var p0 = base + i * NR + j, p1 = p0 + 1, p2 = p0 + NR, p3 = p2 + 1;
        if (s > 0) idx.push(p0, p1, p2, p1, p3, p2); else idx.push(p0, p2, p1, p1, p2, p3);
      }
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* the stem face (the bow doors), the bottom, the transom, the deck: closing plates */
  function closers(THREE, g, H, T) {
    var xs = xsOf(H), pos = [], uv = [], i, j, N = 8;
    /* bottom */
    for (i = 0; i < xs.length - 1; i++) {
      var a = xs[i], b = xs[i + 1], za = H.keel(a), zb = H.keel(b), wa = halfAt(H, a, za), wb = halfAt(H, b, zb);
      pos.push(a, -wa, za, b, wb, zb, a, wa, za, a, -wa, za, b, -wb, zb, b, wb, zb);
      for (j = 0; j < 6; j++) uv.push(0, 0);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.under));
    /* transom */
    pos = []; uv = [];
    var x = H.XS;
    for (j = 0; j < N; j++) {
      var z0 = H.keel(x) + (H.deck(x) - H.keel(x)) * j / N, z1 = H.keel(x) + (H.deck(x) - H.keel(x)) * (j + 1) / N;
      var w0 = halfAt(H, x, z0), w1 = halfAt(H, x, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (i = 0; i < 6; i++) uv.push(pos[pos.length - 18 + i * 3 + 1] / 24, pos[pos.length - 18 + i * 3 + 2] / 8);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.hull));
    /* stem face: the closed bow doors, a strip of width 2*bowMin following the rake */
    pos = []; uv = [];
    var zk = H.keel(H.XW), zt = H.deck(H.XB);
    for (j = 0; j < N; j++) {
      var za2 = zk + (zt - zk) * j / N, zb2 = zk + (zt - zk) * (j + 1) / N;
      var xa = stemX(H, za2), xb = stemX(H, zb2), ya = halfAt(H, xa, za2), yb = halfAt(H, xb, zb2);
      pos.push(xa, ya, za2, xb, -yb, zb2, xa, -ya, za2, xa, ya, za2, xb, yb, zb2, xb, -yb, zb2);
      for (i = 0; i < 6; i++) uv.push(pos[pos.length - 18 + i * 3 + 1] / 24, pos[pos.length - 18 + i * 3 + 2] / 8);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), za2 >= 0 ? T.hull : T.hull));
  }
  /* a deck sheet at deck(x) between xa and xb */
  function deckSheet(THREE, g, H, m, xa, xb, dz) {
    var xs = xsOf(H).filter(function (x) { return x > xa && x < xb; }), pos = [], uv = [], idx = [], i, j, NC = 4;
    xs.unshift(xa); xs.push(xb);
    for (i = 0; i < xs.length; i++) {
      var x = Math.min(xs[i], stemX(H, H.deck(xs[i]))), z = H.deck(x) + (dz || 0), w = halfAt(H, x, z);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv, idx), m));
  }
  function rail(THREE, g, T, H, x0, x1, step, hgt, zf) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; z = zf ? zf(x) : H.deck(x); y = s * (halfAt(H, x, z) - 0.15);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
        if (prev) strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt, x, y, z + hgt, 0.022, 3);
        prev = [x, y, z];
      }
    }
  }
  function boat(THREE, g, T, x, y, z, L, B) {
    var xs = [], rings = [], i, n = 9;
    for (i = 0; i <= n; i++) {
      var t = i / n, xx = x - L / 2 + L * t;
      var wf = t > 0.65 ? Math.max(0.08, 1 - Math.pow((t - 0.65) / 0.35, 1.6)) : (t < 0.08 ? 0.75 + t * 3 : 1);
      xs.push(xx); rings.push(superRing(B / 2 * wf, 0.5, z + 0.5, 0.8, 12).map(function (p) { return [p[0] + y, p[1]]; }));
    }
    ringLoft(THREE, g, T.sup, xs, rings);
    box(THREE, g, L * 0.6, B * 0.7, 0.45, T.sup, x, y, z + 1.15);
  }
  function davits(THREE, g, T, x, y, z0, z1, s) {
    var k;
    for (k = -1; k <= 1; k += 2) {
      strut(THREE, g, T.metal, x + k * 2.6, y - s * 1.2, z0, x + k * 2.6, y - s * 0.6, z1 + 1.6, 0.09, 5);
      strut(THREE, g, T.metal, x + k * 2.6, y - s * 0.6, z1 + 1.6, x + k * 2.6, y + s * 0.2, z1 + 1.9, 0.08, 5);
    }
  }
  function windows(THREE, g, T, x0, x1, y, z, n) {
    var i;
    for (i = 0; i < n; i++) box(THREE, g, 0.9, 0.08, 0.7, T.glass, x0 + (x1 - x0) * (i + 0.5) / n, y, z);
  }
  function mastYard(THREE, g, T, x, z0, zt, zy, yard) {
    strut(THREE, g, T.metal, x, 0, z0, x, 0, zy + 1.0, 0.22, 8);
    strut(THREE, g, T.metal, x, 0, zy + 1.0, x, 0, zt, 0.08, 6);
    strut(THREE, g, T.metal, x, -yard, zy, x, yard, zy, 0.07, 5);
    box(THREE, g, 1.6, 1.6, 0.25, T.metal, x, 0, zy - 2.2);
  }

  /* ================================================================== LST (3) */
  var LST3 = {
    XS: -52.9, XB: 52.9, XW: 50.4, half: 8.4, bowStart: 41.0, bowMin: 2.9, flare: 0.25, bilge: 0.9,
    deck: function (x) { return x < 0 ? 5.0 + 0.5 * (-x / 52.9) : 5.0 + 1.1 * Math.pow(x / 52.9, 2); },
    keel: function (x) { return -2.45 - 1.05 * (-x / 52.9); }
  };
  function lst3(THREE, M, C) {
    var g = new THREE.Group(), H = LST3, s, i, x;
    var T = makeMats(THREE, C, { hull: 0x858b90, sup: 0x8b9196, deck: 0x4f5458, pad: 0x6a6f73 });
    g.add(shell(THREE, H, T.under, -4, -0.3, 3));
    g.add(shell(THREE, H, T.boot, -0.3, 0.45, 1));
    g.add(shell(THREE, H, T.hull, 0.45, 9, 4));
    closers(THREE, g, H, T);
    deckSheet(THREE, g, H, T.deck, H.XS, H.XB, 0);

    /* the bow doors' seams and the ramp hinge line, the hawse, the anchor [L1] */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.dark, stemX(H, 5.9) - 0.6, s * 0.02, 5.9, stemX(H, -1.3) - 0.2, s * 0.02, -1.3, 0.05, 3);
      x = 47.5; box(THREE, g, 1.2, 0.12, 1.0, T.dark, x, s * (halfAt(H, x, 3.6) + 0.03), 3.6);
    }
    /* stern anchor and kedge gear at the transom (beaching) [L2] */
    box(THREE, g, 0.1, 2.2, 1.2, T.dark, H.XS, 0, 3.6);

    /* the bow gun platform on posts, its two tubs and rail [L1] */
    var zp = H.deck(44) + 2.6;
    blk(THREE, g, T.sup, 38.0, 49.0, -6.4, 6.4, zp - 0.3, zp);
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 39 + i * 4.5, s * 5.6, H.deck(39 + i * 4.5), 39 + i * 4.5, s * 5.6, zp - 0.3, 0.16, 6);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 1.25, 1.25, 1.1, 16, T.sup, 45.5, s * 3.6, zp + 0.55);
    blk(THREE, g, T.sup, 39.0, 41.4, -1.4, 1.4, zp, zp + 1.6);
    rail(THREE, g, T, H, 38.2, 48.8, 2.2, 1.0, function () { return zp; });

    /* ventilator cowls and stanchions along the open deck [L1] */
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2) {
      x = -4 + i * 6.5;
      hexa(THREE, g, T.sup, [[x - 0.9, s * 7.1, H.deck(x)], [x + 0.9, s * 7.1, H.deck(x)], [x + 0.9, s * 7.9, H.deck(x)], [x - 0.9, s * 7.9, H.deck(x)],
                             [x - 0.2, s * 7.3, H.deck(x) + 2.2], [x + 0.6, s * 7.3, H.deck(x) + 2.2], [x + 0.6, s * 7.9, H.deck(x) + 2.2], [x - 0.2, s * 7.9, H.deck(x) + 2.2]]);
    }
    rail(THREE, g, T, H, -6, 37.5, 3.0, 1.0);

    /* the after deckhouse from the stern to x -7, roof 7.7 [L2] */
    var z01 = 7.7;
    blk(THREE, g, T.sup, -52.3, -7.0, -7.8, 7.8, H.deck(-30) - 0.3, z01);
    deckSheet(THREE, g, { XS: -52.3, XB: -7.0, XW: -7.0, bowStart: 99, half: 7.8, bowMin: 7.8, flare: 0, bilge: 0.01,
                          deck: function () { return z01; }, keel: function () { return 0; } }, T.deck, -52.3, -7.0, 0.01);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 14; i++) box(THREE, g, 0.4, 0.06, 0.4, T.dark, -50 + i * 3.1, s * 7.83, 6.6);
    }
    /* the bridge block x -36..-14 (roof 10.3), the bridge -26..-16 (12.5) with its windows [L1][L2] */
    blk(THREE, g, T.sup, -36.0, -14.0, -6.0, 6.0, z01, 10.3);
    blk(THREE, g, T.sup, -26.0, -15.0, -4.6, 4.6, 10.3, 12.5);
    blk(THREE, g, T.sup, -17.0, -15.2, -7.2, 7.2, 10.3, 11.3);
    windows(THREE, g, T, -26, -15.4, 4.64, 11.8, 7);
    windows(THREE, g, T, -26, -15.4, -4.64, 11.8, 7);
    for (i = 0; i < 6; i++) box(THREE, g, 0.08, 0.9, 0.7, T.glass, -14.96, -3.6 + i * 1.44, 11.8);
    blk(THREE, g, T.deck, -25.8, -15.2, -4.4, 4.4, 12.5, 12.55);
    /* the funnel, x -29.3, top 15.9 [L2] */
    cylZ(THREE, g, 1.55, 1.65, 15.9 - 10.3 - 0.8, 18, T.sup, -29.3, 0, 10.3 + (15.9 - 10.3 - 0.8) / 2);
    cylZ(THREE, g, 1.58, 1.58, 0.8, 18, T.soot, -29.3, 0, 15.5);
    cylZ(THREE, g, 1.3, 1.3, 0.05, 18, T.dark, -29.3, 0, 15.91);
    /* the pole mast x -22.9 to 26.6 with its yard and platform [L1][L2] */
    mastYard(THREE, g, T, -22.9, 12.5, 26.6, 23.4, 3.2);
    /* the derrick post ahead of the bridge, x -11.9 to 18.4, two booms resting forward [L1] */
    cylZ(THREE, g, 0.35, 0.55, 18.4 - H.deck(-11.9), 12, T.sup, -11.9, 0, (18.4 + H.deck(-11.9)) / 2);
    box(THREE, g, 0.4, 4.0, 0.4, T.metal, -11.9, 0, 15.8);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -11.4, s * 1.6, 6.6, 1.5, s * 3.4, 8.9, 0.18, 6);
      strut(THREE, g, T.metal, -11.9, s * 1.8, 18.0, 1.5, s * 3.4, 9.0, 0.025, 3);
    }
    /* boats in davits aft, two a side [L1] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      x = -46 + i * 8.5;
      boat(THREE, g, T, x, s * 6.6, 9.0, 7.6, 2.3);
      davits(THREE, g, T, x, s * 6.9, z01, 9.0, s);
    }
    rail(THREE, g, T, H, -52.4, -7.2, 3.0, 1.0, function () { return z01; });
    /* the screws, rudders and shafts [text: twin screws] */
    for (s = -1; s <= 1; s += 2) {
      var zs = H.keel(-48) + 1.15;
      strut(THREE, g, T.metal, -40, s * 3.2, H.keel(-40) + 0.9, -49.5, s * 3.2, zs, 0.2, 6);
      cylZ(THREE, g, 1.05, 1.05, 0.2, 12, T.metal, -50.0, s * 3.2, zs).rotation.y = PI / 2;
      box(THREE, g, 2.2, 0.2, 2.8, T.metal, -51.6, s * 3.2, zs + 0.3);
    }
    /* team strips on the deckhouse roof and the platform */
    blk(THREE, g, T.team, -50.0, -47.0, -3.0, 3.0, z01 + 0.01, z01 + 0.05);
    blk(THREE, g, T.team, 41.8, 44.0, -1.5, 1.5, zp + 0.01, zp + 0.05);
    blk(THREE, g, T.team, -24.0, -21.0, -1.2, 1.2, 12.56, 12.6);
    return bake(THREE, g);
  }

  /* ============================================================ Round Table LSL */
  var LSL = {
    XS: -62.5, XB: 62.95, XW: 59.3, half: 9.0, breaks: [34.5, -14.95], bowStart: 46.0, bowMin: 1.4, flare: 0.35, bilge: 1.0,
    deck: function (x) { return x > 34.5 ? 13.3 : (x < -14.95 ? 12.4 : 9.9); },
    keel: function () { return -4.0; }
  };
  function lsl(THREE, M, C) {
    var g = new THREE.Group(), H = LSL, s, i, x;
    var T = makeMats(THREE, C, { hull: 0x6c6f77, sup: 0x74777e, deck: 0x4a4d50, pad: 0x8c8b8f });
    /* hull shell to the highest deck; the parts above the local deck are cut by the deck fn */
    g.add(shell(THREE, H, T.under, -4.5, -0.3, 3));
    g.add(shell(THREE, H, T.boot, -0.3, 0.5, 1));
    g.add(shell(THREE, H, T.hull, 0.5, 14, 6));
    closers(THREE, g, H, T);
    deckSheet(THREE, g, H, T.deck, 34.5, H.XB, 0);
    deckSheet(THREE, g, H, T.deck, -14.95, 34.5, 0);
    deckSheet(THREE, g, H, T.deck, H.XS, -14.95, 0);
    /* the forecastle break and the superstructure's step: bulkheads closing the deck steps */
    blk(THREE, g, T.hull, 34.3, 34.5, -8.95, 8.95, 9.9, 13.3);
    blk(THREE, g, T.hull, -14.95, -14.75, -8.95, 8.95, 9.9, 12.4);

    /* the row of openings along the upper vehicle deck [R2] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) box(THREE, g, 4.0, 0.08, 1.6, T.dark, -12 + i * 5.0, s * 9.02, 8.0);
      for (i = 0; i < 18; i++) box(THREE, g, 0.4, 0.06, 0.4, T.dark, -60 + i * 2.6, s * 9.02, 10.9);
      /* bow door seam and hawse */
      strut(THREE, g, T.dark, stemX(H, 13.0) - 0.4, s * 0.02, 13.0, stemX(H, -1.0) - 0.2, s * 0.02, -1.0, 0.05, 3);
      x = 56.0; box(THREE, g, 1.5, 0.12, 1.2, T.dark, x, s * (halfAt(H, x, 10.4) + 0.03), 10.4);
    }
    /* the forecastle: the pole mast, the staggered tapered kingposts (port forward) and the
       derrick [R1][R2][R3] */
    strut(THREE, g, T.metal, 48.9, 0, 13.3, 48.9, 0, 24.8, 0.18, 8);
    box(THREE, g, 0.2, 3.0, 0.2, T.metal, 48.9, 0, 22.5);
    var KP = [[41.95, 3.2], [35.35, -3.2]];
    for (i = 0; i < 2; i++) {
      var kx = KP[i][0], ky = KP[i][1];
      hexa(THREE, g, T.sup, [[kx - 1.2, ky - 1.0, 13.3], [kx + 1.2, ky - 1.0, 13.3], [kx + 1.2, ky + 1.0, 13.3], [kx - 1.2, ky + 1.0, 13.3],
                             [kx - 0.35, ky - 0.3, 17.5], [kx + 0.35, ky - 0.3, 17.5], [kx + 0.35, ky + 0.3, 17.5], [kx - 0.35, ky + 0.3, 17.5]]);
      strut(THREE, g, T.metal, kx, ky, 17.5, kx, ky, 18.6, 0.08, 5);
      strut(THREE, g, T.metal, kx - 0.6, ky, 14.0, kx - 9.5, ky * 0.6, 15.6, 0.16, 6);
    }
    rail(THREE, g, T, H, 34.8, 60.0, 2.5, 1.0);
    /* the crane at the superstructure's forward end, its boom raised forward [R1][R2] */
    cylZ(THREE, g, 0.8, 1.0, 3.0, 12, T.sup, -12.5, 6.2, 13.9);
    box(THREE, g, 2.2, 1.6, 1.6, T.sup, -12.8, 6.2, 16.0);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -12.0, 6.2 + s * 0.45, 16.2, -1.0, 6.2 + s * 0.2, 21.0, 0.13, 5);
    strut(THREE, g, T.metal, -12.0, 6.2, 16.4, -1.0, 6.2, 21.0, 0.05, 3);
    strut(THREE, g, T.metal, -1.0, 6.2, 21.0, -1.0, 6.2, 17.5, 0.02, 3);

    /* the superstructure aft [R1][R2][R3] */
    blk(THREE, g, T.sup, -45.0, -14.95, -8.2, 8.2, 12.4, 15.6);
    blk(THREE, g, T.sup, -38.0, -15.5, -6.8, 6.8, 15.6, 18.4);
    blk(THREE, g, T.sup, -17.3, -15.5, -8.6, 8.6, 17.3, 18.2);                /* bridge wings */
    blk(THREE, g, T.sup, -27.0, -16.0, -5.0, 5.0, 18.4, 19.9);
    for (s = -1; s <= 1; s += 2) {
      windows(THREE, g, T, -44, -16, s * 8.22, 14.0, 12);
      windows(THREE, g, T, -37, -16, s * 6.82, 17.0, 9);
    }
    for (i = 0; i < 8; i++) box(THREE, g, 0.08, 1.0, 0.8, T.glass, -15.47, -4.6 + i * 1.3, 17.4);
    for (i = 0; i < 9; i++) box(THREE, g, 0.08, 0.8, 0.8, T.glass, -14.92, -7.2 + i * 1.8, 14.0);
    blk(THREE, g, T.deck, -37.8, -15.7, -6.6, 6.6, 18.4, 18.45);
    rail(THREE, g, T, H, -44.8, -15.2, 2.6, 1.0, function () { return 15.6; });
    /* the mast with its yard, the round funnel abaft it [R1][R2][R3] */
    mastYard(THREE, g, T, -23.75, 19.9, 30.4, 26.6, 4.0);
    cylZ(THREE, g, 2.2, 2.4, 3.6, 20, T.sup, -32.6, 0, 18.4 + 1.8);
    cylZ(THREE, g, 2.25, 2.25, 0.8, 20, T.soot, -32.6, 0, 22.2 + 0.4 - 0.4);
    cylZ(THREE, g, 1.9, 1.9, 0.05, 20, T.dark, -32.6, 0, 22.62);
    /* two boats a side on the 01 deck abreast the bridge [R3] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      x = -40 + i * 9;
      boat(THREE, g, T, x, s * 7.6, 16.0, 7.5, 2.4);
      davits(THREE, g, T, x, s * 7.9, 15.6, 16.0, s);
    }
    /* the helicopter deck aft, on posts past the stern [R2][R3] */
    var zh = 13.0;
    blk(THREE, g, T.pad, -62.95, -41.5, -8.7, 8.7, zh - 0.25, zh);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) strut(THREE, g, T.metal, -44 - i * 6, s * 8.4, 12.4, -44 - i * 6, s * 8.4, zh - 0.25, 0.15, 5);
    strut(THREE, g, T.metal, -62.2, 0, 6.0, -62.8, 0, zh - 0.25, 0.25, 6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -62.2, s * 6.5, 7.0, -62.8, s * 7.5, zh - 0.25, 0.2, 6);
    blk(THREE, g, T.dark, -54.0, -52.0, -8.0, 8.0, zh + 0.002, zh + 0.012);       /* the landing circle bar */
    rail(THREE, g, T, H, -62.85, -41.6, 2.5, 0.8, function () { return zh; });
    /* stern door: a dark frame on the transom */
    blk(THREE, g, T.dark, H.XS - 0.1, H.XS + 0.05, -3.5, 3.5, 2.0, 9.4);
    /* screws and rudders */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -48, s * 3.4, -3.1, -59.5, s * 3.4, -2.9, 0.22, 6);
      cylZ(THREE, g, 1.0, 1.0, 0.2, 12, T.metal, -60.0, s * 3.4, -2.9).rotation.y = PI / 2;
      box(THREE, g, 2.4, 0.22, 3.0, T.metal, -61.8, s * 3.4, -2.5);
    }
    /* team strips: the forecastle, the bridge roof, the helicopter deck's edge */
    blk(THREE, g, T.team, 52.0, 55.0, -2.0, 2.0, 13.31, 13.36);
    blk(THREE, g, T.team, -26.0, -22.0, -1.5, 1.5, 19.91, 19.96);
    blk(THREE, g, T.team, -62.6, -59.8, -6.0, 6.0, zh + 0.01, zh + 0.05);
    return bake(THREE, g);
  }

  return { lst3: lst3, lsl: lsl, hulls: { lst3: LST3, lsl: LSL } };
})();

/* len is the measured X extent of each build (dump.js) */
UNIT_MODELS["gbr_e80_seaking4"] = { len: 22.66, build: HeroGbSeaKing.hc4 };
UNIT_MODELS["gbr_e50_lst"] = { len: 105.85, build: function (THREE, M, C) { return HeroGbAmphib.lst3(THREE, M, C); } };
UNIT_MODELS["gbr_e60_lst"] = { len: 125.98, build: function (THREE, M, C) { return HeroGbAmphib.lsl(THREE, M, C); } };
