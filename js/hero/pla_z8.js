/* ======= pla_z8.js - HERO model: Aerospatiale SA 321 Super Frelon / Changhe Z-8 =======
   Three defs, one airframe:
     pla_e80_aswhelo    "Aerospatiale SA 321Ja Super Frelon, PLA Navy" (1977)  -> HeroZ8.ja80
     pla_e90_aswhelo    "Changhe Z-8, licence-built Super Frelon" (1989)       -> HeroZ8.z890
     pla_e00_transport  "Changhe Z-8 series; Mi-171; Harbin Z-20" - drawn as
                        the PLA Ground Force Z-8A                              -> HeroZ8.z800

   REFERENCES (Commons at width 960 unless noted, cached in scratchpad/q_z8_ref)
     D1 "Aerospatiale SA 321 Super Frelon 3-view line drawing.png" (574 px wide,
        native): side (port), front, and a plan from BELOW (both nose wheels and
        all four main wheels show). Scale 12.4 px/m, the scale that puts the
        tail rotor at 4.0 m across, the nose-to-tail rotor tip at 20.1 m and
        the main rotor's front tip 3.0 m ahead of the nose: 23.1 m overall
        against the published 23.03, and 6.53 m to the tail rotor top against
        6.66. Every station below is read off it on a pixel grid. Its main
        blades are drawn short (18.5 m), so the disc is the published one.
     P1 "SA321G Super Frelon in 2003.jpg" - French Navy SA 321G, front right
        3/4 on the ground: the boat hull and its chine, the twin nose wheels,
        the float on its stub sponson and strut with twin main wheels under
        it, the two round intakes at the roof's edges with the slot between,
        the dense six-blade head, the starboard sliding door, square windows.
     P2 "PLAGA Z-8A.jpg" - PLA Ground Force Z-8A, front left 3/4: olive green,
        floats kept, the black radome thimble on the nose and a sensor ball
        under it, the hooded exhaust outlets on the cowl side at the mast and
        about 2.8 m aft, the five-blade tail rotor on the PORT side, the
        stabiliser at the top of the pylon. Read through its perspective
        (the far main gear shows 220 px ahead of the near one), its centreline
        stations agree with D1: the mast 0.70 of the wheelbase behind the nose
        wheels (D1 0.69), mast-to-tail-rotor 5.4 times mast-to-main-gear
        (D1 5.6). That check is why D1's stations are trusted.
     P3 "Z8J Chinese Navy (16203585038).jpg" - PLA Navy Z-8J, front right 3/4:
        the PLAN light blue-grey (sampled here for the navy rows), the
        starboard sliding door behind the cockpit, floats.
     P4 "Super Frelon (25001243025).jpg" - SA 321G in flight, front right
        below: the stabiliser near the top of the pylon with a strut under
        it, the head, the hull's underside.
     Published (en.wikipedia "Aerospatiale SA 321 Super Frelon", Jane's 1976-77
        via its infobox): length 23.03 m rotors turning, fuselage 19.40 m,
        height 6.66 m, rotor 18.90 m; three Turmo IIIC, "a pair ... side by
        side at the front and one located aft of the main rotor"; six-blade
        main and five-blade tail rotor (Sikorsky design); hull with bow,
        planing bottom; "lateral stabilising floats fixed to the
        undercarriage"; sliding door forward starboard, hinged emergency door
        aft port; rear loading ramp; the boom hinged ahead of the cranked
        tail; shaft fairing along the boom top. en.wikipedia "Changhe Z-8":
        Z-8A "used by the PLA Ground Force", Z-8B "Floats removed".

   RECOGNITION LIST (and where each shows)
     1 the big boat hull: near-vertical sides, a V planing bottom with a
       chine strake, the half-round nose with the glazing over it   (D1, P1)
     2 floats on stub sponsons and struts, twin main wheels under them (D1, P1-P3)
     3 the engine deck on the roof: two round intakes at the front
       edges, the mast fairing, the hooded exhaust outlets            (P1, P2)
     4 six-blade main rotor on a dense head                          (P1, P4)
     5 long boom cranking up into a swept pylon, five-blade tail rotor
       on the port side, the stabiliser opposite near the top        (D1, P2, P4)
     6 twin nose wheels under the cockpit                            (D1, P1, P2)
     7 Z-8A only: the radome thimble and the sensor ball             (P2)

   VARIANT DECISIONS
     ja80, z890  the same build. No reference fetched shows a PLAN SA 321Ja
                 or an early (1989-99) Z-8, and nothing found says the Z-8
                 differs outside from the Ja, so neither carries anything the
                 other lacks: glazed chin, no radome, PLAN light blue-grey
                 (sampled off P3, a 2010s Z-8J).
     z800        the Z-8A of P2: radome thimble, sensor ball, olive green,
                 floats kept (only the Z-8B is "floats removed").
   NOT DRAWN, and why: the search radar the PLAN Frelon carried (eras.js) -
     no reference shows where it sat on the PLAN aircraft; the SA 321G's
     Exocet-era nose radome (P1, P4) is French and later, so the navy rows do
     not wear it; dipping sonar, sonobuoys, depth charges, Yu-7 torpedoes -
     no PLA photograph of them on this type; the rescue hoist (P1 shows one
     on a French SA 321G, the PLA photographs do not); P3's ladder; stars,
     serials ("6198" in P2), titles.
   NOT CONFIRMED (estimated, not measured or published):
     - the hull's half-widths (1.40 m at the chine, 1.02 at the roof) and the
       chine height: D1's plan and front view at 12.4 px/m, +-1 px = 0.08 m;
     - the fuselage length: 18.3 m nose to pylon end here (D1 at the scale
       that meets the overall length and height), against the published
       19.40 m (whose end points are not stated);
     - the tail rotor hub: set where the published 23.03 m overall and 6.66 m
       height put it (x -11.60, 4.66 m up); D1 draws it 0.3 m higher;
     - the 4.0 deg forward mast tilt and the 4.85 m blade plane (D1), the
       blade chord (0.54 m), the head's parts (P1's proportions);
     - the tail rotor's 4.0 m (D1) and its turning sense (the Mi-8 port
       mount's, not checked against the real machine);
     - the starboard window positions (P1/P3 proportions; the port ones are
       D1's), the exhaust outlets' size and the starboard rear one;
     - wheelbase 6.58 m and track 4.0 m (D1), wheel sizes;
     - the undercarriage is drawn fixed (no reference shows it retracting).
     - both paints: PLAN blue-grey off one overcast photograph of a later
       Z-8J, olive off P2; neither colour is confirmed for the 1970s-90s.

   NAMED NODES
     rotor          -PI/2 about X inside a group leaning the shaft 4 deg
                    forward, so the node's local +Y points DOWN the mast and the
                    head turns clockwise from above, as a Sud rotor does
                    (ru_mi8.js / fr_gazelle.js).
     rotordisc      inside the rotor, transparent, depthWrite:false.
     tailrotor      ru_mi8.js's port mount (+PI/2 about X), five blades.
     undercarriage  the fixed tricycle gear, not "gear" (render3d hides
                    "gear" in flight, as ru_mi8.js explains).
   len is the measured X extent with the rotors turning, main disc front to
   the tail rotor's aft tip: 23.03 m (published 23.03). Model space: +X nose,
   +Y port, +Z up, metres; origin under the mast, 2.40 m above the wheel
   contact plane. Materials: SKIN (canvas texture per scheme), METAL, DARK,
   BLADE, RUBBER, GLASS, TEAM (exactly C.team: strips on the floats and the
   stabiliser), DISC. 12 draw calls. ASCII only.                          */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZ8 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ datums
     x from the main rotor shaft, forward positive; heights above the wheel
     contact plane through Z(). Drawing scale 12.4 px/m: x = (376 - px) / 12.4,
     h = (276 - py) / 12.4 (side view), half-widths off the plan view. */
  var GROUND = -2.40;
  function Z(h) { return GROUND + h; }
  var HUB_H = 4.85, ROTOR_R = 9.45, CHORD = 0.54, MAST_TILT = 4.0 * D2R;
  var TR_X = -11.60, TR_H = 4.66, TR_R = 2.00, TR_Y = 0.62;
  var NW_X = 4.52, NW_R = 0.30, NW_W = 0.20, NW_Y = 0.24;
  var MW_X = -2.06, MW_R = 0.36, MW_W = 0.24, MW_Y0 = 1.86, MW_Y1 = 2.18;
  var FL_X0 = -0.72, FL_X1 = -4.10, FL_Y = 2.10, FL_H = 1.45, FL_R = 0.50;
  var DOOR_S = { x0: 3.25, x1: 2.05 }, DOOR_P = { x0: -2.55, x1: -3.10 };
  var WIN_P = [2.90, 1.05, -0.73], WIN_S = [2.65, 1.05, -0.20, -1.45];
  var WIN_H = 2.46, WIN_W = 0.50, WIN_T = 0.58;
  var EX_F = 0.30, EX_R = -2.50;          /* the exhaust outlets on the cowl sides */

  /* ---- the variants: one airframe, what differs between the rows ---- */
  var VARIANTS = {
    ja80: { key: "ja80", scheme: "navy", radome: false, flir: false },
    z890: { key: "z890", scheme: "navy", radome: false, flir: false },
    z800: { key: "z800", scheme: "army", radome: true,  flir: true }
  };
  var SCHEMES = {
    navy: { key: "navy", base: "#6b7d7e", belly: "#5f6f70", seed: 3211 },
    army: { key: "army", base: "#4b5540", belly: "#434c3a", seed: 3218 }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, model metres:
       band 0 TOP (x across, y down), 1 PORT side (x, z), 2 STARBOARD (x, z),
       3 BELLY (x, y). projUV() picks the band from each face normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -12.2, UX1 = 6.6, QY = 2.8;
  var QZ0 = Z(0.60), QZ1 = Z(4.60);
  var SX = TW / (UX1 - UX0), SZ = BAND / (QZ1 - QZ0);
  function pxX(x) { return (x - UX0) * SX; }
  function pyTop(y) { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y) { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function skinCanvas(SC) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed), i, b, x;
    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);
    g.fillStyle = SC.belly; g.fillRect(0, 3 * BAND, TW, BAND);
    /* the hull below the chine, a shade darker on the sides (sea-water
       staining on the navy machines, mud on the army ones) */
    for (b = 1; b <= 2; b++) {
      g.fillStyle = "rgba(0,0,0,0.10)";
      g.fillRect(0, pySide(Z(1.15), b), TW, pySide(Z(0.6), b) - pySide(Z(1.15), b));
    }
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 160; i++) {
      g.fillStyle = (i & 1) ? "rgba(255,255,240,0.045)" : "rgba(0,0,0,0.055)";
      g.fillRect(R() * TW, R() * TH, (0.4 + R() * 1.4) * SX, 8 + R() * 26);
    }
    /* exhaust soot: down the cowl sides from the front engines' pipes,
       along the boom top from the rear engine's */
    [EX_F, EX_R].forEach(function (ex0) {
      for (b = 1; b <= 2; b++) {
        var sg = g.createLinearGradient(pxX(ex0), 0, pxX(ex0 - 5.0), 0);
        sg.addColorStop(0, "rgba(18,16,14,0.40)"); sg.addColorStop(1, "rgba(18,16,14,0)");
        g.fillStyle = sg;
        g.fillRect(pxX(ex0 - 5.0), pySide(Z(4.25), b), pxX(ex0) - pxX(ex0 - 5.0), pySide(Z(3.45), b) - pySide(Z(4.25), b));
      }
    });
    /* frames and stringers */
    var frames = [4.40, 3.30, 2.40, 1.50, 0.60, -0.30, -1.20, -2.10, -3.00, -3.55, -4.60,
                  -5.60, -6.60, -7.60, -8.60, -9.50];
    g.lineWidth = 1.3;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.24)"; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.fillStyle = "rgba(160,160,150,0.15)";
      for (var yy = 3; yy < TH; yy += 7) g.fillRect(x - 4, yy, 1.4, 1.4);
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    [1.15, 1.75, 2.85, 3.35].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var y = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(-3.4), y); g.lineTo(pxX(4.8), y); g.stroke();
      }
    });
    function rect(b, x0, x1, h0, h1, w) {
      g.strokeStyle = "rgba(0,0,0,0.58)"; g.lineWidth = w || 2.2;
      g.strokeRect(pxX(x1), pySide(Z(h1), b), pxX(x0) - pxX(x1), pySide(Z(h0), b) - pySide(Z(h1), b));
    }
    /* the starboard sliding door just aft of the cockpit, its rail; the
       small hinged emergency door aft on the port side (Stevens 1964 via
       en.wikipedia; the drawing's port view, the 2003 photograph) */
    rect(2, DOOR_S.x0, DOOR_S.x1, 1.05, 3.20);
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 3;
    g.beginPath(); g.moveTo(pxX(DOOR_S.x1), pySide(Z(3.28), 2)); g.lineTo(pxX(-1.6), pySide(Z(3.28), 2)); g.stroke();
    rect(1, DOOR_P.x0, DOOR_P.x1, 1.30, 2.95);
    /* the rear loading ramp: its seam up each side of the tail cone and
       across the belly */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.4;
      g.beginPath();
      g.moveTo(pxX(-3.30), pySide(Z(1.05), b));
      g.lineTo(pxX(-3.45), pySide(Z(2.70), b));
      g.lineTo(pxX(-5.55), pySide(Z(2.70), b));
      g.stroke();
    }
    g.beginPath(); g.moveTo(pxX(-3.30), pyBelly(0.9)); g.lineTo(pxX(-3.30), pyBelly(-0.9)); g.stroke();
    /* cowl hatches */
    g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 1.5;
    [[3.0, 0.9], [-0.9, -3.3]].forEach(function (p) {
      [0.55, -0.55].forEach(function (q) {
        g.beginPath(); g.moveTo(pxX(p[0]), pyTop(q)); g.lineTo(pxX(p[1]), pyTop(q)); g.stroke();
      });
    });
    /* the boom fold hinge line ahead of the cranked tail (Stevens 1964) */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.6;
      g.beginPath(); g.moveTo(pxX(-9.55), pySide(Z(2.4), b)); g.lineTo(pxX(-9.55), pySide(Z(3.7), b)); g.stroke();
    }
    return cv;
  }
  var _cv = {}, _tex = {};
  function skinTexture(SC) {
    var k = SC.key;
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(SC);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[k] = t;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.62 ? 0 : nz < -0.62 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0) { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else { U = pxX(endOn ? x + Math.abs(y) * 0.5 : x); W = pySide(z, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, VR) {
    var SC = SCHEMES[VR.scheme], tex = skinTexture(SC), m = {};
    m.skin   = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.32 });
    m.blade  = new V.MeshStandardMaterial({ color: 0x3a3e3c, roughness: 0.78, metalness: 0.14 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x0e0f0f, roughness: 0.95, metalness: 0.02 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1b262b, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ---------------------------------------------------- geometry kit (ru_mi8.js) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
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
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
      if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
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
  function mesh(parent, list, mat, name, uvFn) {
    if (!list.length) return null;
    var geo = merge(list);
    if (uvFn) uvFn(geo);
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
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* a station: x, belly / crown / widest heights (above the ground), the
     half-widths at the belly, the widest line and the crown, and the
     superellipse exponent */
  function sec(x, zb, zt, zm, wb, wm, wt, e) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e), z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
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
    if (x >= secs[0].x) return secs[0];
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return secs[secs.length - 1];
  }
  function bracket(secs, x) {
    if (x >= secs[0].x) return [secs[0], secs[0], 0];
    for (var q = 0; q < secs.length - 1; q++)
      if (x <= secs[q].x && x >= secs[q + 1].x) return [secs[q], secs[q + 1], (secs[q].x - x) / (secs[q].x - secs[q + 1].x)];
    var L = secs[secs.length - 1];
    return [L, L, 0];
  }
  /* the angle on a station's ring at absolute height z (upper or lower half) */
  function thAt(s, z) {
    if (z >= s.zm) {
      var u = Math.min(1, (z - s.zm) / Math.max(0.01, s.zt - s.zm));
      return Math.asin(Math.pow(u, 1 / s.e));
    }
    var l = Math.min(1, (s.zm - z) / Math.max(0.01, s.zm - s.zb));
    return -Math.asin(Math.pow(l, 1 / s.e));
  }
  function sideY(secs, x, z) { var s = secAt(secs, x); return ringPt(s, thAt(s, z))[0]; }
  /* a skin-following patch over x0..x1 and heights z0..z1 (above the
     ground) on one side
     (sgn), stood `off` metres proud - glazing and its frames */
  function patch(secs, sgn, x0, x1, z0, z1, nx, nz, off) {
    var P = [], i, j, out = [];
    for (i = 0; i <= nx; i++) {
      var x = x0 + (x1 - x0) * i / nx, s = secAt(secs, x), row = [], br = bracket(secs, x);
      for (j = 0; j <= nz; j++) {
        /* on the lofted facets themselves: the same ring angle on the two
           stations either side, blended linearly as the loft joins them */
        var th = thAt(s, Z(z0 + (z1 - z0) * j / nz));
        var pa = ringPt(br[0], th), pb = ringPt(br[1], th);
        var p = [pa[0] + (pb[0] - pa[0]) * br[2], pa[1] + (pb[1] - pa[1]) * br[2]];
        /* stand off along the surface normal, fore-and-aft slope included */
        var dxs = br[0].x - br[1].x, sl = 0;
        if (dxs > 0.01) sl = (Math.hypot(pa[0], pa[1] - br[0].zm) - Math.hypot(pb[0], pb[1] - br[1].zm)) / dxs;
        var nn = Math.sqrt(1 + sl * sl);
        var ny = Math.cos(th) / nn, nz2 = Math.sin(th) / nn;
        row.push([x - off * sl / nn, sgn * (p[0] + off * ny), p[1] + off * nz2]);
      }
      P.push(row);
    }
    for (i = 0; i < nx; i++) for (j = 0; j < nz; j++) {
      var a = P[i][j], b = P[i + 1][j], c = P[i + 1][j + 1], d = P[i][j + 1];
      /* outward: away from the station's centre line */
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
      var nx2 = uy * vz - uz * vy, ny2 = uz * vx - ux * vz, nzz = ux * vy - uy * vx;
      var cz = secAt(secs, a[0]).zm;
      /* outward: away from a point on the axis 1.5 m behind (the nose's
         forward-facing glass included) */
      var o = nx2 * 1.5 + ny2 * a[1] + nzz * (a[2] - cz);
      if (o >= 0) out.push(a, b, c, a, c, d); else out.push(a, c, b, a, d, c);
    }
    return tris(out);
  }

  /* ======================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "z8" + VR.key;
    var i, k, a;
    var skin = [], dark = [], metal = [], team = [], glass = [];
    var gearM = [], gearR = [];

    /* ------------------------------------------------ the boat hull ----
       STATION TABLE off the three-view (side: x = (376 - px) / 12.4,
       h = (276 - py) / 12.4; plan: half-width = px / 24.8). Nose tip 6.37
       at 1.94; cabin roof 3.79 from 4.5 forward to -3.1; keel 0.81 under
       the cabin, the ramp's upsweep from -3.1 (1.20 at -3.55, 1.77 at
       -4.35, 2.34 at -5.40); boom 2.50-3.67 at -7.4 to 2.52-3.55 at -9.2.
       Plan: the nose a half-round of 1.45 m radius, the hull 2.8 m across
       at the chine, the tail cone tapering from -3.7 to 0.4 m wide at
       -9.9. A V planing bottom: the keel on the centreline, the chine at
       about 1.1-1.5 m (the 2003 photograph, the drawing's double belly
       line). */
    var fus = [
      sec( 6.37, 1.86, 2.02, 1.94, 0.05, 0.08, 0.05, 1.0),
      sec( 6.22, 1.42, 2.62, 1.80, 0.40, 0.72, 0.36, 0.92),
      sec( 5.95, 1.22, 3.10, 1.68, 0.62, 1.00, 0.58, 0.82),
      sec( 5.55, 1.08, 3.44, 1.60, 0.76, 1.22, 0.76, 0.70),
      sec( 5.10, 0.96, 3.66, 1.55, 0.84, 1.33, 0.88, 0.58),
      sec( 4.52, 0.86, 3.78, 1.50, 0.88, 1.38, 0.98, 0.50),
      sec( 3.70, 0.81, 3.79, 1.45, 0.90, 1.40, 1.02, 0.45),
      sec(-3.06, 0.81, 3.79, 1.45, 0.90, 1.40, 1.02, 0.45),
      sec(-3.55, 1.20, 3.79, 1.80, 0.80, 1.30, 0.98, 0.48),
      sec(-4.35, 1.77, 3.79, 2.30, 0.64, 1.10, 0.86, 0.55),
      sec(-5.40, 2.34, 3.75, 2.75, 0.46, 0.88, 0.70, 0.65),
      sec(-7.40, 2.50, 3.67, 2.95, 0.33, 0.60, 0.48, 0.80),
      sec(-9.20, 2.54, 3.55, 3.00, 0.20, 0.34, 0.28, 0.90),
      sec(-9.95, 2.70, 3.50, 3.10, 0.15, 0.24, 0.20, 0.95)
    ];
    loft(fus, 18, 0.05, 0.03).forEach(function (q) { skin.push(q); });
    /* the chine strake down each side of the planing bottom */
    [1, -1].forEach(function (sg) {
      var st = [];
      [[5.4, 1.30], [4.5, 1.12], [-3.0, 1.12], [-3.6, 1.45]].forEach(function (p) {
        st.push([p[0], sg * (sideY(fus, p[0], Z(p[1])) + 0.07), Z(p[1])]);
      });
      for (k = 0; k < st.length - 1; k++)
        skin.push(bar(st[k], st[k + 1], 0.06, 6, true));
    });

    /* ------------------------------------------------- the glazing ----
       The 2003 photograph: four big windscreen panes over the nose, the
       cockpit side windows with the pilots' sliding panels, and the
       lower windows each side of the nose; the drawing puts the
       windscreen between 2.0 and 3.6 m. */
    [1, -1].forEach(function (sg) {
      glass.push(patch(fus, sg, 5.33, 5.92, 2.28, 3.02, 5, 6, 0.04));
      glass.push(patch(fus, sg, 4.55, 5.25, 2.28, 3.25, 5, 5, 0.04));
      glass.push(patch(fus, sg, 5.80, 6.24, 1.55, 2.15, 4, 4, 0.04));
      dark.push(patch(fus, sg, 5.25, 5.33, 2.22, 3.30, 1, 4, 0.06));
      dark.push(patch(fus, sg, 4.55, 5.95, 2.20, 2.28, 6, 1, 0.06));
      dark.push(patch(fus, sg, 4.45, 4.55, 2.22, 3.28, 1, 4, 0.06));
      dark.push(patch(fus, sg, 4.88, 4.94, 2.28, 3.25, 1, 3, 0.06));
      dark.push(patch(fus, sg, 5.33, 5.95, 3.00, 3.07, 5, 1, 0.06));
    });
    dark.push(box(0.10, 0.10, 0.80, 5.66, 0, Z(2.95), 0, -0.70, 0));
    /* square cabin windows with rounded corners: three on the port side
       (the drawing) and the emergency door's; the sliding door's and four
       more on the starboard side (the 2003 photograph) */
    function windowAt(x, sgn) {
      var w = sideY(fus, x, Z(WIN_H));
      var d = new V.PlaneGeometry(WIN_W, WIN_T);
      d.rotateX(PI / 2);
      d.translate(x, w + 0.015, Z(WIN_H));
      var rg = box(WIN_W + 0.10, 0.02, WIN_T + 0.10, x, w + 0.004, Z(WIN_H));
      glass.push(sgn > 0 ? d : mirrorY(d));
      dark.push(sgn > 0 ? rg : mirrorY(rg));
    }
    for (i = 0; i < WIN_P.length; i++) windowAt(WIN_P[i], 1);
    windowAt((DOOR_P.x0 + DOOR_P.x1) / 2, 1);
    for (i = 0; i < WIN_S.length; i++) windowAt(WIN_S[i], -1);

    /* -------------------------------------------- the engine deck ----
       Two Turmo side by side ahead of the mast and the third behind it
       (en.wikipedia, Stevens 1964), all under one cowl: the drawing's
       cowl from x 3.15 to -3.4, its top at 4.27 m, the mast fairing to
       4.6. Across, the 2003 photograph puts the two round intakes almost
       at the roof's edges with a small slot between them. */
    var cowl = [
      sec( 3.20, 3.60, 4.10, 3.90, 0.70, 0.82, 0.62, 0.70),
      sec( 2.95, 3.60, 4.25, 3.95, 0.86, 0.94, 0.72, 0.62),
      sec( 1.00, 3.60, 4.28, 3.95, 0.90, 0.96, 0.74, 0.60),
      sec( 0.55, 3.60, 4.62, 4.00, 0.90, 0.96, 0.58, 0.60),
      sec(-0.60, 3.60, 4.62, 4.00, 0.88, 0.94, 0.56, 0.60),
      sec(-1.05, 3.60, 4.28, 3.95, 0.86, 0.92, 0.70, 0.62),
      sec(-3.00, 3.60, 4.20, 3.92, 0.72, 0.80, 0.60, 0.66),
      sec(-3.55, 3.60, 4.00, 3.82, 0.50, 0.56, 0.42, 0.72)
    ];
    loft(cowl, 14, 0.04, 0.06).forEach(function (q) { skin.push(q); });
    /* the two round intakes and the slot between them */
    [1, -1].forEach(function (sg) {
      var iy = sg * 0.50, iz = Z(3.93);
      skin.push(cyl(0.30, 0.30, 0.30, 20, "x", 3.22, iy, iz, true));
      metal.push(cyl(0.31, 0.31, 0.05, 20, "x", 3.37, iy, iz, true));
      dark.push(place(new V.CircleGeometry(0.28, 18), 3.30, iy, iz, 0, PI / 2, 0));
      metal.push(sph(0.10, 10, 6, 3.28, iy, iz, 1.4, 1, 1));
      /* the exhaust outlets: hooded boxes on each cowl side, the front
         pair's at the mast and the rear engine's 2.8 m behind it (the
         Z-8A photograph's port side, the 2003 photograph's starboard) */
      [EX_F, EX_R].forEach(function (ex0) {
        var oy = sideY(cowl, ex0, Z(4.02));
        skin.push(box(0.62, 0.26, 0.40, ex0 - 0.05, sg * (oy + 0.08), Z(4.02)));
        dark.push(box(0.04, 0.20, 0.30, ex0 - 0.37, sg * (oy + 0.10), Z(4.02)));
      });
    });
    dark.push(box(0.05, 0.36, 0.16, 3.22, 0, Z(3.92)));
    /* the drive-shaft fairing along the boom top (Stevens 1964) */
    var shf = [
      sec(-3.60, 3.55, 3.88, 3.70, 0.22, 0.26, 0.20, 0.8),
      sec(-9.60, 3.40, 3.62, 3.52, 0.14, 0.17, 0.13, 0.8)
    ];
    loft(shf, 8, 0.0, 0.02).forEach(function (q) { skin.push(q); });
    /* the mast and its fixed swashplate ring, leaned with the shaft */
    var tiltM = new V.Matrix4().makeRotationY(MAST_TILT).premultiply(new V.Matrix4().makeTranslation(0, 0, Z(HUB_H)));
    [cyl(0.22, 0.26, 0.30, 16, "z", 0, 0, -0.18), cyl(0.42, 0.42, 0.06, 20, "z", 0, 0, -0.28)].forEach(function (q) {
      q.applyMatrix4(tiltM); metal.push(q);
    });
    /* the Z-8A's nose: a black radome thimble ahead of the lower nose and
       a sensor ball under it on the port side (the Z-8A photograph) */
    if (VR.radome) {
      dark.push(sph(0.52, 18, 12, 6.30, 0, Z(1.88), 1.25, 1.0, 0.90));
      dark.push(cyl(0.50, 0.50, 0.30, 18, "x", 6.00, 0, Z(1.88), true));
    }
    if (VR.flir) {
      metal.push(cyl(0.10, 0.10, 0.22, 8, "z", 5.55, 0.48, Z(0.80)));
      dark.push(sph(0.22, 14, 10, 5.55, 0.48, Z(0.60), 1, 1, 1));
    }

    /* --------------------------------------- sponsons and the floats --
       Plan view: the floats 3.2-3.4 m long and 1.0 m across, centred 2.1 m
       out and 2.4 m behind the mast; side view: 1.0 m deep at 1.45 m. The
       2003 photograph: a blunt pod with a flat-ish bottom, on a stub
       sponson from the hull bottom and a strut from the hull side above. */
    [1, -1].forEach(function (sg) {
      var L = FL_X0 - FL_X1, fy = sg * FL_Y, fz = Z(FL_H);
      var fl = [
        sec(FL_X0,          FL_H - 0.08, FL_H + 0.06, FL_H - 0.01, 0.06, 0.08, 0.05, 1.0),
        sec(FL_X0 - 0.25,   FL_H - 0.36, FL_H + 0.34, FL_H - 0.02, 0.32, 0.38, 0.30, 0.85),
        sec(FL_X0 - 0.80,   FL_H - 0.48, FL_H + 0.48, FL_H - 0.04, 0.42, 0.50, 0.40, 0.75),
        sec(FL_X0 - 2.00,   FL_H - 0.46, FL_H + 0.48, FL_H - 0.04, 0.40, 0.48, 0.38, 0.75),
        sec(FL_X1 + 0.35,   FL_H - 0.20, FL_H + 0.30, FL_H + 0.04, 0.18, 0.24, 0.16, 0.85),
        sec(FL_X1,          FL_H + 0.02, FL_H + 0.12, FL_H + 0.07, 0.04, 0.05, 0.03, 1.0)
      ];
      loft(fl, 12, 0.02, 0.02).forEach(function (q) { q.translate(0, fy, 0); skin.push(q); });
      /* the stub sponson: a flat wing from the chine out to the float */
      var hy = sideY(fus, -2.2, Z(1.25)) - 0.05;
      var sA = [[-1.30, sg * hy, Z(1.30)], [-1.90, sg * (FL_Y - 0.25), Z(FL_H + 0.05)],
                [-3.10, sg * (FL_Y - 0.25), Z(FL_H + 0.05)], [-3.40, sg * hy, Z(1.30)]];
      var sB = sA.map(function (p) { return [p[0], p[1], p[2] - 0.16]; });
      skin.push(solid(sA, sB));
      /* the strut from the cabin side down to the float's top */
      metal.push(bar([-1.75, sg * (sideY(fus, -1.75, Z(2.90)) - 0.02), Z(2.90)],
                     [-2.20, sg * (FL_Y - 0.10), Z(FL_H + 0.45)], 0.07, 8, true));
      /* team flash along the top of each float */
      team.push(box(1.20, 0.30, 0.02, -2.05, fy, Z(FL_H + 0.49)));
    });

    /* --------------------------------- pylon, tail rotor, stabiliser --
       The drawing: the boom cranked up at its end into a pylon swept 45
       degrees, leading edge from (-9.4, 3.6) to the tail rotor gearbox;
       trailing edge from (-9.9, 2.6). The rotor hub is set where the
       published 23.03 m overall length and 6.66 m height put it (the
       drawing has it 0.3 m higher). */
    var pyl = [[-9.30, 3.55], [-11.15, TR_H + 0.30], [-11.85, TR_H + 0.25], [-11.95, TR_H - 0.30],
               [-10.20, 2.62], [-9.70, 2.62]];
    var pA = pyl.map(function (p, j) { return [p[0], j < 3 ? 0.17 : 0.13, Z(p[1])]; });
    var pB = pA.map(function (p) { return [p[0], -p[1], p[2]]; });
    skin.push(solid(pA, pB));
    metal.push(sph(0.24, 14, 8, TR_X, 0, Z(TR_H), 1.4, 1.0, 0.9));
    metal.push(bar([TR_X, 0.12, Z(TR_H)], [TR_X, TR_Y - 0.08, Z(TR_H)], 0.08, 10, true));
    /* the stabiliser on the starboard side of the pylon, opposite the
       rotor, a little below the gearbox (plan view: 2.6 m out from the
       pylon, about 0.8 m chord; the Z-8A and the in-flight photographs
       put it near the top of the pylon) */
    var stz = Z(TR_H - 0.55);
    var stab = [[-10.90, -0.12], [-11.05, -2.70], [-11.65, -2.70], [-11.75, -0.12]];
    var tA = stab.map(function (p) { return [p[0], p[1], stz + 0.05]; });
    var tB = stab.map(function (p) { return [p[0], p[1], stz - 0.05]; });
    skin.push(solid(tA, tB));
    team.push(box(0.50, 0.90, 0.012, -11.33, -1.95, stz + 0.056));
    metal.push(bar([-11.25, -0.12, stz - 0.85], [-11.30, -1.40, stz - 0.04], 0.035, 6, true));
    /* tail bumper under the pylon */
    metal.push(bar([-9.9, 0, Z(2.66)], [-10.2, 0, Z(2.05)], 0.05, 8, true));
    metal.push(box(0.36, 0.20, 0.05, -10.2, 0, Z(2.03)));
    /* antennas: whips under the belly and a blade on the boom */
    metal.push(bar([0.5, 0, Z(0.82)], [0.0, 0, Z(0.52)], 0.012, 4, true));
    metal.push(box(0.30, 0.03, 0.30, -6.4, 0, Z(3.78)));

    /* ----------------------------------------------- the undercarriage --
       Fixed (it stays down in flight), so named "undercarriage", not
       "gear", as ru_mi8.js does: twin nose wheels on a short oleo under
       the cockpit; twin main wheels each side straight under the float,
       on an oleo up into it (the 2003 photograph). Wheelbase 6.58 m and
       track 4.0 m off the drawing. */
    var und = new V.Group();
    und.name = "undercarriage";
    g.add(und);
    both(gearR, cyl(NW_R, NW_R, NW_W, 20, "y", NW_X, NW_Y, Z(NW_R)));
    both(gearM, cyl(0.17, 0.17, NW_W + 0.01, 12, "y", NW_X, NW_Y, Z(NW_R)));
    gearM.push(cyl(0.045, 0.045, 2 * NW_Y + 0.12, 8, "y", NW_X, 0, Z(NW_R)));
    gearM.push(bar([NW_X + 0.05, 0, Z(0.90)], [NW_X, 0, Z(NW_R)], 0.07, 8, true));
    gearM.push(box(0.18, 0.26, 0.10, NW_X, 0, Z(NW_R + 0.20)));
    [1, -1].forEach(function (sg) {
      [MW_Y0, MW_Y1].forEach(function (wy) {
        gearR.push(cyl(MW_R, MW_R, MW_W, 22, "y", MW_X, sg * wy, Z(MW_R)));
        gearM.push(cyl(0.21, 0.21, MW_W + 0.01, 14, "y", MW_X, sg * wy, Z(MW_R)));
      });
      gearM.push(cyl(0.05, 0.05, MW_Y1 - MW_Y0 + 0.30, 8, "y", MW_X, sg * (MW_Y0 + MW_Y1) / 2, Z(MW_R)));
      gearM.push(bar([MW_X, sg * (MW_Y0 + MW_Y1) / 2, Z(MW_R)], [MW_X - 0.05, sg * FL_Y, Z(FL_H - 0.30)], 0.08, 10, true));
      gearM.push(bar([MW_X, sg * (MW_Y0 + MW_Y1) / 2, Z(MW_R + 0.05)], [MW_X + 0.55, sg * (FL_Y - 0.30), Z(FL_H - 0.30)], 0.04, 6, true));
    });
    mesh(und, gearM, T.metal, "undercarriage_struts");
    mesh(und, gearR, T.rubber, "tyres");

    /* ------------------------------------------------ airframe meshes -- */
    mesh(g, skin, T.skin, "airframe", projUV);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");

    /* ============================================================ rotor ==
       Six blades (en.wikipedia), 18.90 m, turning clockwise from above as
       every Sud / Aerospatiale rotor does: the Mi-8 / Gazelle mount, -PI/2
       about X inside a group leaning the shaft 4 degrees forward (the
       drawing), so the rotor node's local +Y points DOWN the mast. */
    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    var mnt = new V.Group();
    mnt.rotation.x = -PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);
    var hubM = [], hubD = [], blades = [];
    /* the head: a deep hub plate, six hinged arms with blade sleeves, the
       drag dampers on the trailing side, the pitch links to the turning
       swashplate, a cap on top (the 2003 photograph: a dense, wide head) */
    hubM.push(cyl(0.36, 0.40, 0.30, 18, "z", 0, 0, 0));
    hubM.push(cyl(0.18, 0.22, 0.24, 12, "z", 0, 0, 0.26));
    hubM.push(cyl(0.40, 0.40, 0.06, 20, "z", 0, 0, -0.22));
    /* the blade: leading edge on -Y (clockwise from above), root at 1.1 m */
    var LE = -CHORD / 4, TE = LE + CHORD;
    var BP = [[1.05, LE + 0.04], [1.35, LE], [ROTOR_R - 0.06, LE], [ROTOR_R, LE + 0.03],
              [ROTOR_R, TE], [1.35, TE], [1.05, TE - 0.08]];
    for (k = 0; k < 6; k++) {
      a = (30 + 60 * k) * D2R;
      var bl = solid(BP.map(function (q) { return [q[0], q[1], -0.04]; }),
                     BP.map(function (q) { return [q[0], q[1], -0.005]; }));
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [[box(0.62, 0.20, 0.16, 0.56, 0, 0), hubM],
                   [cyl(0.075, 0.07, 0.42, 8, "x", 1.02, 0, -0.02), hubM],
                   [cyl(0.045, 0.045, 0.55, 6, "x", 0.62, 0.20, 0.05), hubD],
                   [box(0.10, 0.06, 0.20, 0.42, -0.16, -0.12), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       Five blades (en.wikipedia), 4.0 m across on the drawing, on the
       PORT side of the pylon with the stabiliser opposite. ru_mi8.js's
       port mount: +PI/2 about X, local -Z outboard. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trB = [cyl(0.15, 0.15, 0.20, 12, "z", 0, 0, 0), cyl(0.10, 0.03, 0.16, 10, "z", 0, 0, -0.18)];
    for (k = 0; k < 5; k++) {
      var ang = (180 + 72 * k) * D2R;
      var tb = box(TR_R - 0.28, 0.27, 0.035, 0.28 + (TR_R - 0.28) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(ang);
      tb.translate(0, 0, -0.04);
      trB.push(tb);
      var cuff = box(0.30, 0.13, 0.10, 0.20, 0, 0);
      cuff.rotateZ(ang); cuff.translate(0, 0, -0.04);
      trB.push(cuff);
    }
    mesh(trot, trB, T.blade, "tailrotor_blades");

    g.traverse(function (o) { if (o.isMesh && o.material !== T.disc) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return {
    ja80: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.ja80); },
    z890: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.z890); },
    z800: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.z800); },
    VARIANTS: VARIANTS
  };
})();

UNIT_MODELS["pla_e80_aswhelo"]   = { len: 23.03, build: HeroZ8.ja80 };
UNIT_MODELS["pla_e90_aswhelo"]   = { len: 23.03, build: HeroZ8.z890 };
UNIT_MODELS["pla_e00_transport"] = { len: 23.03, build: HeroZ8.z800 };
