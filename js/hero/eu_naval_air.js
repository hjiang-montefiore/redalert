/* ============ eu_naval_air.js - British, French and German naval and support aircraft ============
   Rows that had no model of their own and drew another army's aircraft (render3d.js
   modelKeyFor: the first same-role peer, an MH-60R, an F/A-18E, an E-2C, a KC-46...).
   Every row gets its own model here; most REUSE an existing hero, called as its own
   registration calls it, with the variant's differences ADDED around it.

   ROW (name)                       DRAWN AS                          HOW
   gbr_e80_aswhelo Sea King HAS.5   HeroGbSeaKing.hc4 + HAS fit       reuse: floats, HAS gear, dorsal radome, grey
   gbr_e80/e90_cawacs AEW.2/2A      HeroGbSeaKing.hc4 + AEW fit       reuse: floats, HAS gear, Searchwater drum (stowed)
   gbr_e00_cawacs Sea King ASaC.7   the same, the drum black          reuse
   gbr_e50_aswhelo Whirlwind HAS.7  HeroWhirlwind.build, repainted    reuse (HAR.3 airframe; see NOT CONFIRMED)
   gbr_e60_aswhelo Wessex HAS.1     HeroS58.build, own variant record reuse: turbine nose, RN grey
   cfighter_f, fra_e00_cfighter     HeroRafale.fighter + naval fit    reuse: hook and fairing, launch bar, probe point
     Rafale M
   sead_g Tornado ECR               HeroTornado.build, VARIANTS row   reuse: no guns, Luftwaffe splinter, tanks, + 2 HARM
   gbr_e60_cfighter Phantom FG.1    HeroF4.f4b + Spey shells, repaint reuse: larger intakes and nozzles around the J79's
   gbr_e50_cawacs Skyraider AEW.1   HeroSkyraider "AD4" + APS-20      reuse: the belly radome
   gbr_e90_cfighter Sea Harrier FA2 HeroHarrier1 "FRS1" + Blue Vixen  reuse: blunt radome around the FRS.1's, grey
   asw_helo_f, fra_e00_aswhelo      HeroNH90.e00 + NFH fit, repaint   reuse: belly radome, FLIR ball, plain grey
     NH90 NFH Caiman
   ew_b Airseeker R.1               HeroTankers "R" (KC-135R) + RC fit reuse: boom off, hog nose, cheeks, aerials
   tanker_g, tanker_f, tanker_b     a330mrtt() on EuBigKit            NEW (no A330 hero; eu_big_aircraft.js has the
     A330 MRTT, Phenix, Voyager KC3                                      A310 MRTT): boom on MMF/Phenix, FRU on Voyager
   awacs_b E-7 Wedgetail AEW1       wedgetail() on EuBigKit           NEW (no 737 hero)
   gbr_e90_aswhelo Lynx HMA.8;      navalLynx() + LYNX_V              NEW: gb_lynx.js is the army Lynx with skids and
     fra_e80/e90 Lynx Mk4 (+MLU);                                        AAC camouflage/roundels baked into its sheet,
     deu_e80 Sea Lynx Mk88;                                              no wheeled or plain option
     deu_e90/e00, asw_helo_g Mk88A
   asw_helo_b, gbr_e00_aswhelo      merlin()                          NEW (no AW101 hero)
     Merlin HM2 / HM1; cawacs_b Crowsnest (the HM2 with the pod)
   gbr_e50_cfighter Sea Hawk FGA.6  seaHawk()                         NEW (no Sea Hawk hero)
   HELD (registration left out, the borrowed model stands; see the foot of the file):
     gbr_e60_cawacs Gannet AEW.3, fra_e50_cfighter Aquilon, ew_f Archange (Falcon 8X).

   REFERENCES (Wikimedia Commons / en.wikipedia files, fetched for this file at 960 px;
   scratchpad q_ena_ref/):
     [D]   "Westland Sea King drawing.svg" (gb_misc2.js's [D], a Westland HAS three-view with the
           floats): float sponsons, struts, twin main wheels, measured at 46.0 px/m.
     [SK1] "Royal Navy, XV666, Westland Sea King HAS5 (30416432618)": the HAS.5 dorsal radome.
     [SK2] "SeaKing AEW 849Sqn CVN-73 1998": the AEW.2 drum stowed on the starboard arm, the grey.
     [SK3] "Westland WS-61 Sea King ASaC7, UK - Navy AN1290600": the ASaC.7, its drum black.
     [WW1] "Westland WS-55-2 Whirlwind HAS7, UK - Navy AN1934255"; [WX1] "Westland Wessex at the
           Fleet Air Arm Museum February 2015".
     [RM1] "A Rafale Marine of the French navy lands ... USS George H.W. Bush (41385978054)".
     [TE1] "Tornado ECR (26565457453)".
     [PH1] "McDonnell Douglas F-4K Phantom FG1, UK - Air Force AN1137267".
     [SKY] "Skyraider AEW1 778 RNAS Culdrose" (four AEW.1s in flight).
     [SH2] "British Aerospace Sea Harrier FA.2 ZH810 Pima Air and Space Museum".
     [NF1] "NH Industries NH90-NFH 'RN-02' (cropped)".
     [RC1] "RC-135 Rivet Joint in flight".
     [A1]  "Airbus A330 family v1.1.png" (J. Scavini, dimensioned A330-200); [A2] "Airbus A330 MRTT
           F-UJCG - French Air Force"; [A3] "Yoyager-underwing-cobham-pod".
     [E1]  "B737 AEW&C Wedgetail (cropped).PNG" (side view); [E2] "RAF Wedgetail in flight".
     [LX1] "Westland Lynx AH.1 3-view line drawing.png"; [LX2] "Westland WG-13 Super Lynx Mk88a (code
           83+25) of the German Navy at RIAT Fairford 17July2017 arp"; [LX3] "Royal Navy Lynx 318";
           [LX4] "WG-13 Lynx decking on Latouche-Treville".
     [ME1] "AW EH101.png" (three-view); [ME2] "Royal Navy Melin Mk 2 Helicopters on HMS Illustrious MOD
           45157435"; [ME3] "Royal Navy Merlin HM2 Crowsnest ASaC".
     [SH1] "Hawker Sea Hawk 3-view line drawing.svg"; [SH3] "Hawker Sea Hawk FGA.6 WV828 AWk Hurn".
     Text: en.wikipedia "Westland Lynx", "AgustaWestland AW101", "Hawker Sea Hawk", "Boeing E-7
     Wedgetail", "Boeing RC-135", "Airbus A330 MRTT", "Airbus A330" (published figures below).

   MEASURED vs PUBLISHED (X extent as the renderer scales it; heights to the highest part):
     Sea King marks 22.66 x 5.62 m (the HC4 source; published 22.15 m rotors turning, 5.13 m).
     Lynx naval 15.23 x 3.73 m (published 15.24 with rotors turning, 3.67 m).
     Merlin 23.10 x 7.21 m (published 22.81, 6.62): [ME1]'s tail rotor hub (5.21 m up) with the
       published 4.01 m tail rotor; [ME1] is a 700 px drawing whose plan and side disagree (see merlin()).
     Sea Hawk 12.42 (to the hook; 11.92 to the fin) x 2.64 m (published 12.09, 2.64).
     A330 MRTT 60.2 m with the stowed boom (58.80 airliner), span 60.0 (60.3), fin 17.83 (17.40).
     Voyager 59.0 m; E-7 34.6 x 34.3 x 12.47 m (33.6 / 34.3 / 12.5, the ground set from the last).
     Airseeker 42.4 m (the KC-135R without its boom, plus the hog nose).
     Reused builds keep their source's measured size.

   NOT CONFIRMED (estimated, or a single oblique view):
     - Sea King: the HAS.5 shown in the AEW grey of [SK2] (no 1980s colour photo of a dark sea grey
       HAS.5 was fetched); the AEW drum's size and arm position (one oblique photo, [SK2]); the
       drum is drawn STOWED (the ASaC.7 of [SK3] lowers it in flight; the model has one pose).
     - Whirlwind HAS.7: drawn on the HAR.3 airframe of HeroWhirlwind: the HAS.7's 3 deg boom droop
       and its Leonides Major nose are NOT drawn (the builder cannot reshape).
     - Wessex HAS.1: the HU.5's twin-Gnome turbine nose of HeroS58 stands for the HAS.1's Gazelle.
     - Rafale M: the M's longer nose leg and stronger main gear are not drawn (the C's gear kept).
     - Tornado ECR: HARM placement on the shoulder pylons; the ECR's ELS antennas not drawn.
     - Phantom FG.1: the Spey intake 10 per cent larger each way (from the published 20 per cent area)
       and the nozzle length; the extended nose leg not drawn.
     - Skyraider AEW.1: the radome held 0.25 m off the ground (see skyraiderAEW1); the AD-4's wing
       cannon remain (the module cannot remove them).
     - Sea Harrier FA2: the 0.35 m plug aft of the wing and AMRAAM not drawn.
     - NH90 NFH: the French Navy grey; the radome depth (held to the TTH gear's ground clearance).
     - Airseeker: the hog-nose length and the RAF paint (the KC-135R grey kept).
     - A330: the pod station (y 21.5 m), the boom and ruddevator sizes, the winglet cant.
     - E-7: the wing, tailplane and gear from the 737-700's published figures (no plan view found);
       the MESA plank and array body widths.
     - Lynx: the naval gear track (2.78 m) and the splay of the mains (25 deg); the Mk88's nose (no
       photograph of an un-upgraded Mk88 was found: drawn plain, without the Mk88A's chin radome);
       the Mk4's black nose radome length.
     - Merlin: the sense of rotation of the main rotor (drawn anti-clockwise from above); the ventral
       radome and Crowsnest pod sizes; the stabiliser side.
     - Sea Hawk: the main gear track (3.6 m); the Sky under-colour line.

   PAINT: plain, no national markings, numbers or titles. This file's own coats are a canvas sheet
   (panel joints, rivet rows, faded panels and grime streaks) multiplied by each coat's colour and
   box-projected; a reused build keeps its own sheet unless its row's scheme differs (then its
   skin triangles are split onto this file's coats). Team colour exactly C.team in small strips.

   REFUELLING: aar_probe on the Rafale M, Phantom FG.1, Sea Harrier FA2; aar_recept on the
   E-7, the Airseeker and the two MRTTs; the tankers carry aar_pod_l / aar_pod_r, the MMF and
   Phenix aar_boom / aar_boomtip and the stowed boom group aar_boomstow, the Voyager aar_ctr.

   Model space: +X nose, +Y port, +Z up, metres, each in its source's frame where reused.
   Helicopters: "rotor" (with "rotordisc") and "tailrotor" as gb_lynx.js / gb_misc2.js mount them
   (main heads anti-clockwise from above); "gear" groups the renderer hides in flight.

   LOAD ORDER: after js/hero/gb_misc2.js, early_helos.js, fr_rafale.js, gb_tornado.js,
   us_f4_phantom.js, us_skyraider.js, gb_harrier1.js, fr_helos.js, us_tankers.js and
   eu_big_aircraft.js (EuBigKit). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEuNavalAir = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;

  /* =================================================================== kit ==
     A small geometry kit of this file's own: every part is a BufferGeometry
     in model metres, pushed into a list per material and merged at the end
     into one mesh per material per group. */
  /* per-triangle box projection: each face takes the plane its normal
     is nearest to; u, v in tiles of `tile` metres (the paint repeats) */
  function triUV(p, tile) {
    var uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t + 8 < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], i = (t / 3 + k) * 2;
        if (nz >= nx && nz >= ny) { uv[i] = x / tile; uv[i + 1] = y / tile; }
        else if (ny >= nx) { uv[i] = x / tile; uv[i + 1] = z / tile; }
        else { uv[i] = y / tile; uv[i + 1] = z / tile; }
      }
    }
    return uv;
  }
  /* the paint sheet: a white 4 m tile multiplied by each coat's colour -
     panel joints (a 1.0 x 0.67 m grid with staggered butts), rivet rows,
     faded and repainted panels, exhaust and oil grime streaks running aft */
  var _sheet = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function paintSheet(V, key, seed) {
    if (_sheet[key] !== undefined) return _sheet[key];
    var t = null;
    try {
      var W = 512, cv = document.createElement("canvas");
      cv.width = W; cv.height = W;
      var g = cv.getContext("2d"), R = rng(seed || 101), i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, W);
      /* repainted and faded panels */
      for (i = 0; i < 70; i++) {
        g.globalAlpha = 0.05 + R() * 0.07;
        g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
        g.fillRect(Math.floor(R() * 4) * W / 4, Math.floor(R() * 6) * W / 6, W / 4, W / 6);
      }
      /* streaks */
      for (i = 0; i < 90; i++) {
        g.globalAlpha = 0.04 + R() * 0.06;
        g.fillStyle = "#1a1712";
        g.fillRect(R() * W, R() * W, 30 + R() * 110, 2 + R() * 6);
      }
      /* panel joints */
      g.globalAlpha = 0.30; g.strokeStyle = "#000000"; g.lineWidth = 1.3;
      for (i = 0; i <= 6; i++) { g.beginPath(); g.moveTo(0, i * W / 6 + 0.5); g.lineTo(W, i * W / 6 + 0.5); g.stroke(); }
      for (j = 0; j < 6; j++) for (i = 0; i < 4; i++) {
        var x = i * W / 4 + (j % 2) * W / 8 + 0.5;
        g.beginPath(); g.moveTo(x, j * W / 6); g.lineTo(x, (j + 1) * W / 6); g.stroke();
      }
      /* rivet rows beside the joints */
      g.globalAlpha = 0.22; g.fillStyle = "#000000";
      for (j = 0; j <= 6; j++) for (i = 0; i < W; i += 6) g.fillRect(i, j * W / 6 + 4, 1.4, 1.4);
      g.globalAlpha = 1;
      t = new V.CanvasTexture(cv);
      t.wrapS = t.wrapT = V.RepeatWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = null; }
    _sheet[key] = t;
    return t;
  }

  function Kit(V) {
    var K = { V: V };
    function place(geo, x, y, z, rx, ry, rz) {
      if (rx || ry || rz) geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0, "XYZ")));
      if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
      return geo;
    }
    K.place = place;
    K.box = function (sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); };
    /* a tapered tube from p (radius r0) to q (radius r1) */
    K.tube = function (p, q, r0, r1, seg, open) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-4;
      var g = new V.CylinderGeometry(r1, r0, L, seg || 10, 1, !!open);
      g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
      g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      return g;
    };
    K.bar = function (p, q, r, seg) { return K.tube(p, q, r, r, seg || 6); };
    /* a wheel: axle along Y */
    K.wheel = function (x, y, z, R, W, seg) {
      var g = new V.CylinderGeometry(R, R, W, seg || 16, 1);
      return place(g, x, y, z);
    };
    K.sph = function (r, x, y, z, sx, sy, sz, ws, hs) {
      var g = new V.SphereGeometry(r, ws || 14, hs || 8);
      g.scale(sx || 1, sy || 1, sz || 1);
      return place(g, x, y, z);
    };
    function geo(pos, idx) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      if (idx) g.setIndex(idx);
      return g;
    }
    function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
    /* rings joined into a closed skin; each ring the same point count */
    K.rings = function (R, capA, capB) {
      var n = R[0].length, pos = [], idx = [], i, j;
      for (i = 0; i < R.length; i++) for (j = 0; j < n; j++) pos.push(R[i][j][0], R[i][j][1], R[i][j][2]);
      for (i = 0; i < R.length - 1; i++) for (j = 0; j < n; j++) {
        var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
        idx.push(a, c, b, b, c, d);
      }
      function cap(k, flip) {
        var r = R[k], cx = 0, cy = 0, cz = 0, q;
        for (q = 0; q < n; q++) { cx += r[q][0]; cy += r[q][1]; cz += r[q][2]; }
        var ci = pos.length / 3;
        pos.push(cx / n, cy / n, cz / n);
        for (q = 0; q < n; q++) { var a = k * n + q, b = k * n + (q + 1) % n; if (flip) idx.push(ci, a, b); else idx.push(ci, b, a); }
      }
      if (capA) cap(0, false);
      if (capB) cap(R.length - 1, true);
      var g = geo(pos, idx);
      g.computeVertexNormals();
      return g;
    };
    /* superellipse section ring at x: centre yc, half width w, top zt,
       bottom zb, widest at zm, exponent e (1 = ellipse, < 1 boxier) */
    K.ring = function (x, yc, w, zt, zb, zm, e, n) {
      var r = [], j;
      if (zm === undefined || zm === null) zm = (zt + zb) / 2;
      for (j = 0; j < n; j++) {
        var t = j / n * 2 * PI, c = Math.cos(t), s = Math.sin(t);
        var z = s >= 0 ? zm + (zt - zm) * sgp(s, e) : zm + (zm - zb) * sgp(s, e);
        r.push([x, yc + w * sgp(c, e), z]);
      }
      return r;
    };
    /* a body from a station table: rows [x, half width, top z, bottom z, e, (zm)] */
    K.body = function (rows, n, yc, capA, capB) {
      return K.rings(rows.map(function (s) {
        return K.ring(s[0], yc || 0, Math.max(s[1], 0.003), s[2], s[3], s[5], s[4] || 1, n || 20);
      }), capA !== false, capB !== false);
    };
    /* a body of revolution along X: prof [[x, r]], axis at (yc, zc) */
    K.lathe = function (prof, n, yc, zc, capA, capB) {
      return K.rings(prof.map(function (p) {
        var r = Math.max(p[1], 0.003);
        return K.ring(p[0], yc, r, zc + r, zc - r, zc, 1, n || 14);
      }), capA !== false, capB !== false);
    };
    /* convex outline extruded: in XZ about y0 (a fin), or in XY about z0 */
    function prism(pts, t) {
      var n = pts.length, pos = [], idx = [], i;
      for (i = 0; i < n; i++) pos.push(pts[i][0][0], pts[i][0][1], pts[i][0][2]);
      for (i = 0; i < n; i++) pos.push(pts[i][1][0], pts[i][1][1], pts[i][1][2]);
      for (i = 1; i < n - 1; i++) { idx.push(0, i + 1, i); idx.push(n, n + i, n + i + 1); }
      for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, j, n + i, j, n + j, n + i); }
      var g = geo(pos, idx);
      g = g.toNonIndexed();
      g.computeVertexNormals();
      return g;
    }
    K.finXZ = function (ol, y0, t) {
      return prism(ol.map(function (p) { return [[p[0], y0 + t, p[1]], [p[0], y0 - t, p[1]]]; }));
    };
    K.plateXY = function (ol, z0, t) {
      return prism(ol.map(function (p) { return [[p[0], p[1], z0 + t], [p[0], p[1], z0 - t]]; }));
    };
    /* an aerofoil section: chord points from the LE (0) to the TE (1) */
    function foil(n, tc) {
      var u = [], l = [], i;
      for (i = 0; i <= n; i++) {
        var x = 0.5 * (1 - Math.cos(PI * i / n));
        var y = 5 * tc * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1036 * x * x * x * x);
        u.push([x, y]); l.push([x, -y]);
      }
      var r = u.slice();
      for (i = n - 1; i >= 1; i--) r.push(l[i]);
      return r;
    }
    /* a lifting surface from span stations [y, xLE, xTE, z, t/c] (the
       surface's chord runs from xLE back to xTE, both in model X) */
    K.wing = function (st, n) {
      var F0 = foil(n || 8, 0.1);
      return K.rings(st.map(function (s) {
        var F = foil(n || 8, s[4]), c = s[1] - s[2];
        return F.map(function (p) { return [s[1] - p[0] * c, s[0], s[3] + p[1] * c]; });
      }), true, true);
    };
    /* a fin from height stations [z, xLE, xTE, t/c] about y0 */
    K.vfin = function (st, y0, n) {
      return K.rings(st.map(function (s) {
        var F = foil(n || 8, s[3]), c = s[1] - s[2];
        return F.map(function (p) { return [s[1] - p[0] * c, (y0 || 0) + p[1] * c, s[0]]; });
      }), true, true);
    };
    /* a station table made finer: each interval split into n by a
       Catmull-Rom spline through the rows (every column) */
    K.dense = function (tab, n) {
      var out = [], i, k, c;
      function cr(p0, p1, p2, p3, t) {
        return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
      }
      for (i = 0; i < tab.length - 1; i++) for (k = 0; k < n; k++) {
        var t = k / n, a = tab[Math.max(0, i - 1)], b = tab[i], d = tab[i + 1], e = tab[Math.min(tab.length - 1, i + 2)], r = [];
        for (c = 0; c < b.length; c++) r.push(c === 4 && b.length > 5 ? b[c] : cr(a[c], b[c], d[c], e[c], t));
        out.push(r);
      }
      out.push(tab[tab.length - 1].slice());
      return out;
    };
    K.mirrorY = function (g0) {
      var g = g0.index ? g0.toNonIndexed() : g0.clone(), p = g.attributes.position.array, i, k, t;
      for (i = 0; i < p.length; i += 3) p[i + 1] = -p[i + 1];
      for (t = 0; t < p.length; t += 9) for (k = 0; k < 3; k++) {
        var a = p[t + 3 + k]; p[t + 3 + k] = p[t + 6 + k]; p[t + 6 + k] = a;
      }
      g.computeVertexNormals();
      return g;
    };
    K.both = function (list, g) { list.push(g); list.push(K.mirrorY(g)); };
    /* merge a list into one non-indexed geometry with normals */
    K.merge = function (list) {
      var pos = [], nor = [], i, j;
      for (i = 0; i < list.length; i++) {
        var g = list[i].index ? list[i].toNonIndexed() : list[i];
        if (!g.attributes.normal) g.computeVertexNormals();
        var p = g.attributes.position.array, q = g.attributes.normal.array;
        for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(q[j]); }
      }
      var out = new V.BufferGeometry();
      out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      out.setAttribute("uv", new V.Float32BufferAttribute(triUV(pos, 4.0), 2));
      return out;
    };
    /* buckets { key: [geometries] } to one mesh per key in parent */
    K.emit = function (parent, B, T) {
      for (var k in B) if (B.hasOwnProperty(k) && B[k].length) {
        var m = new V.Mesh(K.merge(B[k]), T[k]);
        m.name = "ena_" + k;
        parent.add(m);
      }
      return parent;
    };
    return K;
  }

  /* ============================================================ materials ==
     Flat paint, no textures: the renderer lifts a flat hex two to three
     stops, so the values are set darker than the chips. The team colour is
     exactly C.team. */
  function mats(V, C, P) {
    function std(hex, r, m, ds) {
      return new V.MeshStandardMaterial({ color: new V.Color(hex), roughness: r, metalness: m,
                                           side: ds === false ? V.FrontSide : V.DoubleSide });
    }
    function coat(hex, seed) {
      var m = std(hex, 0.82, 0.08), tx = paintSheet(V, "coat" + seed, seed);
      if (tx) m.map = tx;
      return m;
    }
    var tc = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    var T0 = {
      top: coat(P.top, 101), low: coat(P.low || P.top, 102), alt: coat(P.alt || P.top, 103),
      dark: std(0x1b1e20, 0.66, 0.28), metal: std(0x5a6064, 0.48, 0.58), hot: std(0x242322, 0.6, 0.4),
      tyre: std(0x0c0d0d, 0.95, 0.02, false), blade: std(P.blade || 0x26292a, 0.74, 0.18),
      radome: coat(P.radome || P.top, 104),
      glass: new V.MeshPhysicalMaterial({ color: 0x1d2a31, roughness: 0.1, metalness: 0.25, clearcoat: 0.6,
                                          transparent: true, opacity: 0.86, side: V.DoubleSide }),
      team: new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.6, metalness: 0.12,
                                         emissive: new V.Color(tc), emissiveIntensity: 0.08, side: V.DoubleSide }),
      disc: new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.4, metalness: 0.05,
                                         transparent: true, opacity: 0.06, depthWrite: false, side: V.DoubleSide }),
      blur: new V.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
                                         transparent: true, opacity: 0.11, depthWrite: false, side: V.DoubleSide })
    };
    for (var k in T0) if (T0.hasOwnProperty(k) && k !== "disc") T0[k].userData.ena = true;
    return T0;
  }

  /* ======================================================= post-processing ==
     The reused builders are called as their own registrations call them and
     left whole; this file only REPAINTS their skin (splitting its triangles
     between the coats of the row's scheme) and ADDS the parts the row's
     variant has and the source does not. */
  function allMeshes(root, pick) {
    var out = [];
    root.updateMatrixWorld(true);
    root.traverse(function (o) { if (o.isMesh && pick(o)) out.push(o); });
    return out;
  }
  /* replace each picked mesh by one mesh per coat: rule(x, y, z, nx, ny,
     nz) in the ROOT's frame gives the coat key of a triangle */
  function repaint(V, root, pick, rule, T) {
    var inv = new V.Matrix4().copy(root.matrixWorld).invert();
    allMeshes(root, pick).forEach(function (m) {
      var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry;
      var M = new V.Matrix4().multiplyMatrices(inv, m.matrixWorld);
      var p = g.attributes.position.array, nA = g.attributes.normal ? g.attributes.normal.array : null;
      var out = {}, t, k, a = new V.Vector3(), b = new V.Vector3(), c = new V.Vector3();
      for (t = 0; t < p.length; t += 9) {
        a.set(p[t], p[t + 1], p[t + 2]).applyMatrix4(M);
        b.set(p[t + 3], p[t + 4], p[t + 5]).applyMatrix4(M);
        c.set(p[t + 6], p[t + 7], p[t + 8]).applyMatrix4(M);
        var ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z, vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        var key = rule((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3, (a.z + b.z + c.z) / 3, nx / l, ny / l, nz / l);
        if (!out[key]) out[key] = { p: [], n: [] };
        for (k = 0; k < 9; k++) { out[key].p.push(p[t + k]); out[key].n.push(nA ? nA[t + k] : 0); }
      }
      var par = m.parent;
      Object.keys(out).forEach(function (key) {
        var ng = new V.BufferGeometry();
        ng.setAttribute("position", new V.Float32BufferAttribute(out[key].p, 3));
        if (nA) ng.setAttribute("normal", new V.Float32BufferAttribute(out[key].n, 3)); else ng.computeVertexNormals();
        ng.setAttribute("uv", new V.Float32BufferAttribute(triUV(out[key].p, 4.0), 2));
        var nm = new V.Mesh(ng, T[key]);
        nm.name = (m.name || "skin") + "_" + key;
        nm.position.copy(m.position); nm.quaternion.copy(m.quaternion); nm.scale.copy(m.scale);
        par.add(nm);
      });
      par.remove(m);
    });
  }
  function byName(re) { return function (m) { return re.test(m.name || ""); }; }
  function hasMap(m) { return !!(m.material && m.material.map); }
  function findNode(root, name) { var f = null; root.traverse(function (o) { if (!f && o.name === name) f = o; }); return f; }
  /* an empty named point (refuelling attach points) */
  function point(V, root, name, x, y, z) {
    var o = new V.Object3D();
    o.name = name;
    o.position.set(x, y, z);
    root.add(o);
  }
  /* the extra parts, one mesh per material, in a group of their own (or in
     the source's "gear" group for parts of the undercarriage) */
  function addParts(V, K, parent, B, T, name) {
    K.emit(parent, B, T);
    return parent;
  }
  /* this file's untextured parts join a sibling mesh of the source build
     whose material is the same flat colour (within a few levels): one
     draw call for both */
  function absorb(V, root) {
    var parents = [];
    root.traverse(function (o) { if (o.children && o.children.length) parents.push(o); });
    function near(a, b) {
      if (a.map || b.map || a.transparent || b.transparent || a.type !== b.type) return false;
      var d = Math.abs(a.color.r - b.color.r) + Math.abs(a.color.g - b.color.g) + Math.abs(a.color.b - b.color.b);
      return d < 0.06;
    }
    function flat(m) {
      m.updateMatrix();
      var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
      g.applyMatrix4(m.matrix);
      if (!g.attributes.normal) g.computeVertexNormals();
      return g;
    }
    parents.forEach(function (par) {
      var own = par.children.filter(function (c) { return c.isMesh && c.material && c.material.userData.ena; });
      var src = par.children.filter(function (c) { return c.isMesh && c.material && !c.material.userData.ena; });
      own.forEach(function (m) {
        var t = null;
        src.forEach(function (q) { if (!t && near(m.material, q.material)) t = q; });
        if (!t) return;
        var a = flat(t), b = flat(m), keys = ["position", "normal"], ng = new V.BufferGeometry();
        if (a.attributes.uv && b.attributes.uv) keys.push("uv");
        keys.forEach(function (k) {
          var A = a.attributes[k].array, Bb = b.attributes[k].array, out = new Float32Array(A.length + Bb.length);
          out.set(A, 0); out.set(Bb, A.length);
          ng.setAttribute(k, new V.BufferAttribute(out, a.attributes[k].itemSize));
        });
        t.geometry = ng;
        t.position.set(0, 0, 0); t.quaternion.set(0, 0, 0, 1); t.scale.set(1, 1, 1);
        par.remove(m);
      });
    });
  }
  /* one mesh per material: this file's meshes that share a parent and a
     material (a repainted skin and the parts added to it) are baked into
     one geometry */
  function mergeOwn(V, root) {
    absorb(V, root);
    var parents = [];
    root.traverse(function (o) { if (o.children && o.children.length) parents.push(o); });
    parents.forEach(function (par) {
      var by = {}, order = [];
      par.children.slice().forEach(function (c) {
        if (!c.isMesh || !c.material || !c.material.userData.ena) return;
        var k = c.material.uuid;
        if (!by[k]) { by[k] = []; order.push(k); }
        by[k].push(c);
      });
      order.forEach(function (k) {
        var list = by[k];
        if (list.length < 2) return;
        var pos = [], nor = [], uv = [];
        list.forEach(function (m) {
          m.updateMatrix();
          var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
          g.applyMatrix4(m.matrix);
          if (!g.attributes.normal) g.computeVertexNormals();
          var P = g.attributes.position.array, N = g.attributes.normal.array, U = g.attributes.uv ? g.attributes.uv.array : null, i;
          for (i = 0; i < P.length; i++) { pos.push(P[i]); nor.push(N[i]); }
          for (i = 0; i < P.length / 3 * 2; i++) uv.push(U ? U[i] : 0);
          par.remove(m);
        });
        var ng = new V.BufferGeometry();
        ng.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
        ng.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
        ng.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
        var nm = new V.Mesh(ng, list[0].material);
        nm.name = list[0].name;
        par.add(nm);
      });
    });
    return root;
  }


  /* =========================================================== SEA KING ==
     HeroGbSeaKing.hc4 (gb_misc2.js), the Commando HC4, is the same Westland
     WS-61 airframe the anti-submarine and airborne-early-warning marks are.
     Its HC4-only parts are the stub sponsons and fixed single-wheel legs;
     the HAS / AEW marks carry the big float sponsons of [D] and retract
     their twin main wheels into them. So the HC4 is called whole, its olive
     skin repainted, its undercarriage group replaced by the HAS one, and the
     float sponsons, their bracing struts and each mark's radome added.
     Stations as gb_misc2.js: x metres ahead of the main hub, h above the
     ground (Z(h) = h - 2.00). */
  var SK = {
    GROUND: -2.00,
    /* the float sponson off [D] side and front views (46.0 px/m, the hub at
       px 995, the ground at row 890): x, centre height h, half depth */
    FLOAT: [[1.81, 1.42, 0.06], [1.72, 1.42, 0.30], [1.50, 1.40, 0.37], [0.90, 1.24, 0.35], [-0.11, 1.08, 0.31],
            [-0.90, 0.95, 0.31], [-1.41, 0.85, 0.31]],
    FLOAT_Y: 1.81, FLOAT_W: 0.40,
    /* main gear [D]: twin wheels 0.24 m under each float at x 1.30, y 1.60
       and 1.88 (front view); the tail wheel stays at the HC4's -5.93 */
    MW: { x: 1.30, y0: 1.60, y1: 1.88, R: 0.24, W: 0.12 },
    TW: { x: -5.93, R: 0.20 }
  };
  var SK_PAINT = {
    has5: { top: "#70777c", radome: "#70777c" },
    aew:  { top: "#70777c", radome: "#8b8e90" },
    asac: { top: "#70777c", radome: "#24272a" }
  };
  /* the AEW radome, stowed ([SK2]: a 849 NAS AEW.2 on deck, 1998): the
     Searchwater "kettle drum", its axis athwartships, on a horizontal arm
     out of the STARBOARD cabin side aft of the float, its centre about as
     high as the cabin's mid line. Sizes off [SK2] against the float's 0.80
     m width (NOT CONFIRMED: one oblique photograph): drum 1.80 m across,
     0.90 m deep, its inboard face 2.2 m off the centreline. */
  var SK_AEW = { px: -2.05, ph: 1.95, y0: 1.05, y1: 2.20, dr: 0.90, dd: 0.90 };
  function seaKingBase(THREE, M, C, P) {
    var V = THREE, K = Kit(V), g = HeroGbSeaKing.hc4(THREE, M, C), T = mats(V, C, P), s;
    function Z(h) { return SK.GROUND + h; }
    /* the repaint: the whole airframe one grey (no national markings) */
    repaint(V, g, byName(/^airframe$/), function () { return "top"; }, T);
    /* the HC4's fixed legs and single wheels give way to the HAS gear */
    var und = findNode(g, "undercarriage");
    if (und && und.parent) und.parent.remove(und);
    var B = { top: [], dark: [], team: [], metal: [] }, G = { metal: [], tyre: [] }, F = { metal: [], tyre: [] };
    for (s = -1; s <= 1; s += 2) {
      var R = SK.FLOAT.map(function (q) {
        return K.ring(q[0], s * SK.FLOAT_Y, Math.min(SK.FLOAT_W, q[2] * 1.4), Z(q[1] + q[2]), Z(q[1] - q[2]), null, 0.9, 18);
      });
      B.top.push(K.rings(R, true, true));
      /* the bracing strut from the float's top up to the cabin side [D] */
      B.top.push(K.tube([1.16, s * 1.62, Z(1.72)], [1.16, s * 1.02, Z(2.85)], 0.075, 0.075, 8));
      /* main gear: a leg out of the float and the twin wheels [D] */
      var yc = (SK.MW.y0 + SK.MW.y1) / 2;
      G.metal.push(K.bar([SK.MW.x, s * yc, Z(0.95)], [SK.MW.x, s * yc, Z(SK.MW.R)], 0.07, 8));
      G.metal.push(K.bar([SK.MW.x + 0.55, s * yc, Z(0.98)], [SK.MW.x, s * yc, Z(0.50)], 0.035, 6));
      G.metal.push(K.bar([SK.MW.x, s * SK.MW.y0, Z(SK.MW.R)], [SK.MW.x, s * SK.MW.y1, Z(SK.MW.R)], 0.04, 6));
      [SK.MW.y0, SK.MW.y1].forEach(function (y) {
        G.tyre.push(K.wheel(SK.MW.x, s * y, Z(SK.MW.R), SK.MW.R, SK.MW.W, 16));
        G.metal.push(K.wheel(SK.MW.x, s * y, Z(SK.MW.R), SK.MW.R * 0.55, SK.MW.W + 0.01, 10));
      });
    }
    /* the tail wheel on its trailing leg at the step (fixed) [D] */
    F.metal.push(K.bar([-5.78, 0, Z(0.70)], [SK.TW.x, 0, Z(SK.TW.R + 0.05)], 0.06, 8));
    F.tyre.push(K.wheel(SK.TW.x, 0, Z(SK.TW.R), SK.TW.R, 0.14, 14));
    F.metal.push(K.wheel(SK.TW.x, 0, Z(SK.TW.R), SK.TW.R * 0.55, 0.15, 10));
    /* the fixed tail wheel rides in the same group (the renderer hides it
       with the mains in flight: one pair of draw calls, not two) */
    G.metal = G.metal.concat(F.metal); G.tyre = G.tyre.concat(F.tyre);
    var gear = new V.Group();
    gear.name = "gear";
    K.emit(gear, G, T);
    g.add(gear);
    return { g: g, K: K, T: T, B: B, Z: Z };
  }


  /* ============================================== helicopter rotor heads ==
     The Lynx / Sea King mount (gb_lynx.js, gb_misc2.js): a group leaning
     the shaft `tilt` forward at the hub, inside it +PI/2 about X, the
     "rotor" node, and inside that -PI/2 to put the head back into model
     axes: the renderer turns "rotor" positively about its own axis along
     the mast, which makes the head turn anti-clockwise seen from above.
     o: x, z (hub), R, chord, n, root, tilt (rad, forward), phase (deg of
     the first blade), hubR, droop (rad), tipSweep. Returns the mast parts
     (model axes) for the caller's metal list. */
  function rotorACW(V, K, g, T, o) {
    var lean = new V.Group();
    lean.position.set(o.x || 0, 0, o.z);
    lean.rotation.y = o.tilt || 0;
    g.add(lean);
    var mnt = new V.Group();
    mnt.rotation.x = PI / 2;
    lean.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);
    var hub = [], bl = [], k;
    var hr = o.hubR || 0.35;
    hub.push(K.tube([0, 0, -0.12], [0, 0, 0.10], hr, hr * 0.9, 16));
    hub.push(K.sph(hr * 0.8, 0, 0, 0.14, 1, 1, 0.5, 14, 6));
    var LE = 0.25 * o.chord, TE = LE - o.chord, SW = o.tipSweep || 0;
    for (k = 0; k < o.n; k++) {
      var a = ((o.phase !== undefined ? o.phase : 45) + 360 / o.n * k) * D2R;
      var pts = [[o.root, TE], [o.R - SW, TE], [o.R, TE + o.chord * 0.35], [o.R, LE - SW * 0.3], [o.root, LE]];
      var b = K.plateXY(pts, 0, 0.025);
      b.rotateX(-(o.pitch || 6) * D2R);
      b.translate(0, 0, 0.02);
      b.rotateY(-(o.droop || 0));
      b.rotateZ(a);
      bl.push(b);
      var arm = K.box(o.root, 0.16, 0.12, o.root / 2, 0, 0.0);
      arm.rotateZ(a);
      hub.push(arm);
    }
    K.emit(head, { metal: hub, blade: bl }, T);
    var disc = new V.Mesh(K.place(new V.CircleGeometry(o.R, 48), 0, 0, 0.05), T.disc);
    disc.name = "rotordisc";
    head.add(disc);
    var tiltM = new V.Matrix4().makeRotationY(o.tilt || 0).premultiply(new V.Matrix4().makeTranslation(o.x || 0, 0, o.z));
    var ms = [K.tube([0, 0, -(o.mast || 0.5) - 0.1], [0, 0, -0.1], 0.18, 0.16, 12)];
    ms.forEach(function (q) { q.applyMatrix4(tiltM); });
    return ms;
  }
  /* a tail rotor: the Sea King mount (+PI/2 about X, hub axis local Z, so
     local +Z points to starboard; on a port-side rotor local Z is still the
     shaft). o: x, y, z, R, chord, n, phase (deg), sense (+1 / -1: -1 turns
     the mount the other way round, which reverses the spin the renderer
     gives it, as gb_lynx.js does for the AH.1). */
  function tailRotor(V, K, g, T, o) {
    var tm = new V.Group();
    tm.position.set(o.x, o.y, o.z);
    tm.rotation.x = (o.sense || 1) > 0 ? PI / 2 : -PI / 2;
    g.add(tm);
    var tr = new V.Group();
    tr.name = "tailrotor";
    tm.add(tr);
    var hub = [K.tube([0, 0, -0.10], [0, 0, 0.10], 0.10, 0.10, 12)], bl = [], k;
    for (k = 0; k < o.n; k++) {
      var a = ((o.phase || 0) + 360 / o.n * k) * D2R;
      var b = K.box(o.R - 0.18, o.chord, 0.03, 0.18 + (o.R - 0.18) / 2, 0, 0);
      b.rotateX(8 * D2R);
      b.rotateZ(a);
      bl.push(b);
    }
    K.emit(tr, { metal: hub, blade: bl }, T);
    return tm;
  }


  /* ========================================================= SEA HAWK ==
     gbr_e50_cfighter, Hawker Sea Hawk FGA.6. NEW: no hero draws a Sea Hawk
     (grep -i "sea hawk" js/hero: only us_f9f_cougar.js's note that it is
     another aeroplane). Measured off [SH1] "Hawker Sea Hawk 3-view line
     drawing.svg" (Commons, rendered 1920 px) by a pixel scan, one scale for
     every view: 103.4 px/m, the published span 39 ft 0 in (11.89 m) over
     the plan's 1229 px. At that scale the side view is 11.92 m from the
     nose to the fin's trailing edge against the published 39 ft 8 in
     (12.09 m): -1.4 %, kept as drawn. Side: X = (654.5 - col) / 103.4,
     Z = (260 - row) / 103.4; plan: Y = (1017 - row) / 103.4. */
  function shX(c) { return (654.5 - c) / 103.4; }
  function shZ(r) { return (260 - r) / 103.4; }
  function shW(px) { return px / 103.4; }
  /* side top / bottom rows and plan half widths (px) per column */
  var SH_FUS = [
    [40, 252, 262, 6.5], [50, 243, 271, 12], [70, 232, 282, 26], [90, 224, 295, 32], [115, 216, 298, 40],
    [140, 207, 304, 46.5], [165, 203, 308, 52], [190, 200, 313, 56], [240, 194, 321, 63], [290, 190, 326, 68],
    [340, 186, 330, 71.5], [390, 183, 333, 74], [450, 181, 333, 75], [550, 181, 334, 69], [650, 180, 331, 65],
    [750, 182, 325, 63], [850, 186, 314, 61], [900, 188, 307, 52], [940, 190, 300, 36.5], [990, 192, 293, 30.5],
    [1040, 197, 285, 24], [1090, 203, 276, 18], [1140, 212, 266, 12], [1190, 222, 256, 8], [1240, 232, 247, 4],
    [1268, 237, 242, 2]
  ];
  /* wing (plan): [Y m, LE col, TE col]; the root fillet with its intake */
  var SH_WING = [[0.62, 400, 812], [0.99, 416, 801], [1.28, 436, 748], [1.57, 451, 734], [3.02, 470, 698],
                 [4.47, 488, 662], [5.63, 502, 633], [5.92, 517, 624]];
  var SH_STAB = [[0.20, 1088, 1226], [0.94, 1110, 1216], [1.52, 1118, 1209], [1.91, 1128, 1204], [2.02, 1140, 1198]];
  var SH_FIN = [[210, 1060, 1264], [195, 1010, 1264], [150, 1034, 1258], [105, 1117, 1249], [75, 1146, 1235], [56, 1175, 1222]];
  function seaHawk(THREE, M, C) {
    var V = THREE, K = Kit(V), s, i;
    var T = mats(V, C, { top: "#3a4045", low: "#9ea594", alt: "#2f3439" });
    var B = { top: [], low: [], dark: [], metal: [], glass: [], team: [], hot: [] }, G = { metal: [], tyre: [], low: [] };
    /* fuselage: superellipse sections, the upper coat above the widest line */
    var rows = K.dense(SH_FUS.map(function (q) { return [shX(q[0]), shW(q[3]), shZ(q[1]), shZ(q[2]), 0.92]; }), 3);
    var body = K.body(rows, 40, 0, true, true);
    /* split the coats: the Sky underside below the fuselage's mid line */
    var up = [], lo = [];
    (function () {
      var g = body.toNonIndexed(), p = g.attributes.position.array, t;
      for (t = 0; t < p.length; t += 9) {
        var zc = (p[t + 2] + p[t + 5] + p[t + 8]) / 3;
        (zc > -0.30 ? up : lo).push(p.slice(t, t + 9));
      }
    })();
    function tri(list) { var a = []; list.forEach(function (q) { for (var k = 0; k < 9; k++) a.push(q[k]); });
      var g = new V.BufferGeometry(); g.setAttribute("position", new V.Float32BufferAttribute(a, 3)); g.computeVertexNormals(); return g; }
    B.top.push(tri(up)); B.low.push(tri(lo));
    /* the canopy [SH1 side 134-374, plan 0.42 m half width] and its frames */
    var cn = [[150, 201, 213, 0.18], [190, 173, 214, 0.34], [230, 159, 212, 0.40], [270, 157, 208, 0.42],
              [310, 161, 204, 0.41], [350, 173, 199, 0.34], [374, 182, 195, 0.20]];
    B.glass.push(K.body(cn.map(function (q) { return [shX(q[0]), q[3], shZ(q[1]), shZ(q[2]) - 0.05, 0.85]; }), 18, 0, true, true));
    B.dark.push(K.box(0.05, 0.62, 0.05, shX(190), 0, shZ(176)));
    B.dark.push(K.box(0.05, 0.80, 0.05, shX(300), 0, shZ(162)));
    B.dark.push(K.box(0.45, 0.30, 0.35, shX(260), 0, shZ(200)));       /* seat head */
    /* wings, low on the fuselage with 4 deg of dihedral (front view) */
    function wz(y) { return shZ(300) + (y - 0.62) * 0.07; }
    for (s = -1; s <= 1; s += 2) {
      var st = SH_WING.map(function (w) { return [s * w[0], shX(w[1]), shX(w[2]), wz(w[0]), w[0] < 1.3 ? 0.13 : 0.10 - 0.02 * w[0] / 6]; });
      if (s < 0) st.reverse();
      var wg = K.wing(K.dense(st, 2), 14), wp = wg.toNonIndexed().attributes.position.array, wu = [], wl = [], t2;
      for (t2 = 0; t2 < wp.length; t2 += 9) {
        var cz = (wp[t2 + 2] + wp[t2 + 5] + wp[t2 + 8]) / 3, cy = Math.abs(wp[t2 + 1] + wp[t2 + 4] + wp[t2 + 7]) / 3;
        (cz >= wz(cy) ? wu : wl).push(wp.slice(t2, t2 + 9));
      }
      B.top.push(tri(wu)); B.low.push(tri(wl));
      /* the bifurcated intake in the root fillet's leading edge, and the jet
         pipe exhausting at the root trailing edge each side [SH1 plan] */
      B.dark.push(K.box(0.05, 0.40, 0.20, shX(404), s * 0.82, wz(0.82) + 0.02));
      B.metal.push(K.lathe([[shX(888), 0.20], [shX(905), 0.19]], 14, s * 0.72, wz(0.72) + 0.06, false, false));
      B.hot.push(K.lathe([[shX(903), 0.17], [shX(906), 0.17]], 14, s * 0.72, wz(0.72) + 0.06, true, true));
      /* team: a strip across each wing tip; navigation light at the tip */
      B.team.push(K.box(1.2, 0.30, 0.03, (shX(502) + shX(633)) / 2, s * 5.55, wz(5.55) + 0.06));
      B.dark.push(K.box(0.6, 0.02, 0.02, (shX(488) + shX(662)) / 2 + 0.3, s * 4.47, wz(4.47) + 0.08));   /* fold hinge */
      /* flap / aileron joints */
      B.dark.push(K.box(0.02, 3.0, 0.02, shX(650), s * 3.5, wz(3.5) + 0.07, 0, 0, s * 0.12));
    }
    /* tailplane on the fin, its bullet at the junction [SH1 side] */
    for (s = -1; s <= 1; s += 2) {
      var ts = SH_STAB.map(function (w) { return [s * w[0], shX(w[1]), shX(w[2]), shZ(148), 0.08]; });
      if (s < 0) ts.reverse();
      B.top.push(K.wing(ts, 6));
    }
    B.top.push(K.lathe([[shX(1040), 0.02], [shX(1070), 0.09], [shX(1130), 0.11], [shX(1200), 0.09], [shX(1215), 0.03]], 12, 0, shZ(148)));
    B.top.push(K.vfin(SH_FIN.map(function (f) { return [shZ(f[0]), shX(f[1]), shX(f[2]), f[0] > 180 ? 0.10 : 0.08]; }), 0, 6));
    B.team.push(K.box(0.42, 0.20, 0.06, shX(1198), 0, shZ(58)));
    /* hook under the tail cone [SH1 side] */
    B.metal.push(K.bar([shX(1150), 0, shZ(246)], [shX(1322), 0, shZ(240)], 0.03, 6));
    B.dark.push(K.box(0.08, 0.06, 0.08, shX(1322), 0, shZ(240)));
    /* aerials on the spine [SH1 side], the gun troughs under the nose */
    B.dark.push(K.bar([shX(683), 0, shZ(181)], [shX(690), 0, shZ(130)], 0.015, 5));
    B.dark.push(K.bar([shX(830), 0, shZ(186)], [shX(850), 0, shZ(130)], 0.012, 5));
    for (s = -1; s <= 1; s += 2) B.dark.push(K.box(0.55, 0.06, 0.05, shX(200), s * 0.40, shZ(306) + 0.02));
    B.dark.push(K.box(0.02, 1.2, 0.02, shX(400), 0, shZ(181) + 0.01));              /* panel joint */
    /* gear: the wheels where [SH1] draws them, the legs up into the wing and
       the nose bay; doors beside them. Main track NOT CONFIRMED (3.6 m). */
    var NW = { x: shX(163), z: shZ(384), r: 0.22 }, MW = { x: shX(576), z: shZ(342), r: 0.32, y: 1.80 };
    G.tyre.push(K.wheel(NW.x, 0, NW.z, NW.r, 0.14, 16));
    G.metal.push(K.wheel(NW.x, 0, NW.z, NW.r * 0.55, 0.15, 10));
    G.metal.push(K.bar([NW.x + 0.10, 0, shZ(308)], [NW.x, 0, NW.z], 0.05, 8));
    G.low.push(K.box(0.9, 0.02, 0.35, NW.x + 0.1, 0.16, shZ(318)));
    G.low.push(K.box(0.9, 0.02, 0.35, NW.x + 0.1, -0.16, shZ(318)));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(K.wheel(MW.x, s * MW.y, MW.z, MW.r, 0.20, 18));
      G.metal.push(K.wheel(MW.x, s * MW.y, MW.z, MW.r * 0.55, 0.21, 10));
      G.metal.push(K.bar([MW.x - 0.05, s * (MW.y - 0.12), wz(MW.y)], [MW.x, s * (MW.y - 0.12), MW.z], 0.06, 8));
      G.low.push(K.box(0.9, 0.02, 0.6, MW.x, s * (MW.y + 0.16), (wz(MW.y) + MW.z) / 2 + 0.1));
    }
    /* the stance: [SH1]'s wheels put the datum 4.4 deg nose up about the
       main wheels' contact; the whole airframe is turned so both touch */
    var root = new V.Group(), stance = new V.Group(), inner = new V.Group();
    var mx = MW.x, mz = MW.z - MW.r, nzc = NW.z - NW.r, ang = Math.atan2(nzc - mz, NW.x - mx);
    stance.position.set(mx, 0, mz);
    stance.rotation.y = ang;
    inner.position.set(-mx, 0, -mz);
    root.add(stance); stance.add(inner);
    K.emit(inner, B, T);
    var gear = new V.Group(); gear.name = "gear";
    K.emit(gear, G, T);
    inner.add(gear);
    root.name = "seahawk_fga6";
    return root;
  }


  /* HAS.5: the dorsal radome, as [SK1] (XV666, side-on at 62 px/m off the
     4.93 m from the nose to the hub): centred 2.98 m aft of the hub on the
     cabin roof, 0.97 m long, its rounded top 0.77 m over the roof (4.30 m
     up); [D]'s smaller dome of the earlier marks sits 1 m further aft. */
  function seaKingHAS5(THREE, M, C) {
    var b = seaKingBase(THREE, M, C, SK_PAINT.has5), K = b.K, Z = b.Z, B = b.B;
    B.top.push(K.tube([-2.98, 0, Z(3.50)], [-2.98, 0, Z(3.92)], 0.50, 0.49, 24));
    B.radome = [K.sph(0.49, -2.98, 0, Z(3.92), 1, 1, 0.78, 24, 10)];
    B.dark.push(K.tube([-2.98, 0, Z(3.60)], [-2.98, 0, Z(3.63)], 0.505, 0.505, 24));
    addParts(THREE, K, b.g, B, b.T);
    b.g.name = "seaking_has5";
    return b.g;
  }
  /* AEW.2 / AEW.2A / ASaC.7: the radome on its swing arm (see SK_AEW) */
  function seaKingAEW(THREE, M, C, P) {
    var b = seaKingBase(THREE, M, C, P), K = b.K, Z = b.Z, B = b.B, A = SK_AEW;
    /* the arm's root fairing on the starboard cabin side, the arm, the
       drum with its slightly domed faces and the drive housing */
    B.top.push(K.tube([A.px, -A.y0 + 0.05, Z(A.ph)], [A.px, -A.y0 - 0.25, Z(A.ph)], 0.32, 0.20, 16));
    B.metal.push(K.tube([A.px, -A.y0 - 0.2, Z(A.ph)], [A.px, -A.y1 - 0.05, Z(A.ph)], 0.12, 0.12, 12));
    B.radome = [K.tube([A.px, -A.y1, Z(A.ph)], [A.px, -A.y1 - A.dd, Z(A.ph)], A.dr, A.dr, 40),
                K.sph(A.dr, A.px, -A.y1, Z(A.ph), 1, 0.10, 1, 32, 8),
                K.sph(A.dr, A.px, -A.y1 - A.dd, Z(A.ph), 1, 0.10, 1, 32, 8)];
    B.dark.push(K.tube([A.px, -A.y1 + 0.01, Z(A.ph)], [A.px, -A.y1 - 0.12, Z(A.ph)], 0.28, 0.28, 16));
    for (var i = 0; i < 3; i++) B.dark.push(K.tube([A.px, -A.y1 - 0.2 - i * 0.25, Z(A.ph)], [A.px, -A.y1 - 0.215 - i * 0.25, Z(A.ph)], A.dr + 0.012, A.dr + 0.012, 40));
    addParts(THREE, K, b.g, B, b.T);
    b.g.name = "seaking_aew";
    return b.g;
  }

  /* ================================================= WHIRLWIND, WESSEX ==
     early_helos.js draws both airframes. HeroS58.build takes a variant
     record (key, base colour, seed, turbine nose), so the Wessex HAS.1 is
     its own variant there: the turbine nose, the RN grey of [WX1]. The
     Whirlwind builder takes none; it is called whole and its skin
     repainted with this file's sheet in the RN grey of [WW1]. */
  var WESSEX_HAS1 = { key: "wessex_has1", base: "#41484c", seed: 5821, turbine: true };
  function wessexHAS1(THREE, M, C) {
    var g = HeroS58.build(THREE, M, C, WESSEX_HAS1);
    g.name = "wessex_has1";
    return g;
  }
  function whirlwindHAS7(THREE, M, C) {
    var g = HeroWhirlwind.build(THREE, M, C), T = mats(THREE, C, { top: "#41484c" });
    repaint(THREE, g, byName(/^airframe$/), function () { return "top"; }, T);
    g.name = "whirlwind_has7";
    return g;
  }

  /* ========================================================= RAFALE M ==
     HeroRafale.fighter (fr_rafale.js) is the Rafale C, measured off the
     Dassault three-view; the M is the same airframe with the naval fit
     ([RM1]): the arrester hook in its fairing under the tail between the
     nozzles, and the catapult launch bar on the nose leg. Paint: the same
     medium grey ([RM1]); the C build is kept as it is drawn. */
  function rafaleM(THREE, M, C) {
    var V = THREE, K = Kit(V), g = HeroRafale.fighter(THREE, M, C);
    var T = mats(V, C, { top: "#8f959b" });
    var B = { top: [], dark: [], metal: [] };
    /* the hook: its hinge fairing under the aft fuselage, the shank stowed
       aft to the hook point between the nozzles */
    B.top.push(K.body([[-3.9, 0.04, -0.30, -0.38, 0.9], [-4.3, 0.14, -0.30, -0.46, 0.9], [-5.2, 0.13, -0.24, -0.42, 0.9],
                       [-5.9, 0.04, -0.20, -0.30, 0.9]], 12, 0));
    B.metal.push(K.bar([-4.3, 0, -0.44], [-6.25, 0, -0.30], 0.045, 8));
    B.dark.push(K.box(0.18, 0.12, 0.12, -6.30, 0, -0.34));
    addParts(V, K, g, B, T);
    /* the launch bar ahead of the nose leg, folded up against it */
    var gear = findNode(g, "gear");
    if (gear) addParts(V, K, gear, { metal: [K.bar([2.92, 0, -1.30], [3.55, 0, -1.40], 0.035, 6), K.box(0.10, 0.20, 0.06, 3.58, 0, -1.41)] }, T);
    point(V, g, "aar_probe", 6.0, -1.10, 1.27);
    g.name = "rafale_m";
    return g;
  }

  /* ======================================================= TORNADO ECR ==
     HeroTornado (gb_tornado.js) takes its variant by key from its exported
     VARIANTS table, and builds the Luftwaffe IDS with deu_e90_cas. The ECR
     is the IDS airframe with no cannon (both removed), the Luftwaffe
     splinter of the IDS row, the fuselage shoulder pylons and wing tanks of
     that row, and two AGM-88 HARM on the shoulder pylons ([TE1]). A row of
     this file's own is ADDED to the table (no existing row is changed):
     guns [], fit "tanks", paint "deu". The HARMs are added here. */
  var TORNADO_ECR = { adv: false, paint: "deu", fit: "tanks", flir: false, probe: false, guns: [] };
  function tornadoECR(THREE, M, C) {
    if (!HeroTornado.VARIANTS.ena_ecr) HeroTornado.VARIANTS.ena_ecr = TORNADO_ECR;
    var V = THREE, K = Kit(V), g = HeroTornado.build(THREE, M, C, "ena_ecr");
    var T = mats(V, C, { top: "#b9bcba", alt: "#7f8482" });
    var B = { top: [], alt: [], dark: [] }, s, k;
    /* AGM-88: 4.17 m x 0.254 m, the double-delta wings at mid-body (span
       1.12 m) and the clipped tail fins (span 0.64 m); its seeker radome
       the darker grey. On the shoulder pylons, y +-0.55, under the belly. */
    for (s = -1; s <= 1; s += 2) {
      var y = s * 0.55, zc = -1.06 - 0.137, x0 = 0.70 + 2.08, x1 = 0.70 - 2.08;
      B.top.push(K.lathe([[x0 - 0.42, 0.125], [x0 - 1.0, 0.127], [x1 + 0.02, 0.127], [x1, 0.11]], 16, y, zc, false, true));
      B.alt.push(K.lathe([[x0, 0.01], [x0 - 0.12, 0.07], [x0 - 0.42, 0.125]], 16, y, zc, true, false));
      for (k = 0; k < 4; k++) {
        var a = PI / 4 + k * PI / 2;
        var w1 = K.plateXY([[x0 - 1.20, 0.12], [x0 - 2.20, 0.56], [x0 - 2.55, 0.56], [x0 - 2.55, 0.12]], 0, 0.006);
        var w2 = K.plateXY([[x1 + 0.55, 0.12], [x1 + 0.05, 0.32], [x1 + 0.02, 0.32], [x1 + 0.02, 0.12]], 0, 0.006);
        [w1, w2].forEach(function (w) { w.rotateX(a); w.translate(0, y, zc); B.top.push(w); });
      }
      B.dark.push(K.box(0.3, 0.06, 0.08, 0.70, y, -1.07));
    }
    addParts(V, K, g, B, T);
    g.name = "tornado_ecr";
    return g;
  }

  /* ===================================================== PHANTOM FG.1 ==
     HeroF4.f4b (us_f4_phantom.js) is the Navy F-4B: the short nose, the
     folding wing, the Navy gear. The F-4K (Phantom FG.1) is that airframe
     with the Spey 202: 20 per cent more intake area (the intake lips
     visibly deeper), a deeper rear fuselage and the larger, shorter Spey
     nozzles; the retractable probe on the starboard side of the nose. The
     module has no option for those, so the bigger intakes and nozzles are
     added AROUND the F-4B's (each new shell encloses the drawn one) and
     the scheme repainted: Extra Dark Sea Grey above, white below; the
     F-4B's white fin to the grey. */
  function phantomFG1(THREE, M, C) {
    var V = THREE, K = Kit(V), g = HeroF4.f4b(THREE, M, C), s;
    var T = mats(V, C, { top: "#363c42", low: "#c8ccc8" });
    repaint(V, g, byName(/^(skin|skin_fold|fin)$/), function () { return "top"; }, T);
    repaint(V, g, byName(/^skin_belly$/), function () { return "low"; }, T);
    var B = { top: [], low: [], dark: [], metal: [], hot: [] };
    for (s = -1; s <= 1; s += 2) {
      /* the Spey intake: the F-4B's loft (half widths 0.34-0.46, depth
         0.56-0.62) taken 10 per cent larger each way, 20 per cent in area */
      var R = [[3.60, 1.21, 0.38, 0.64], [3.45, 1.22, 0.39, 0.66], [2.0, 1.26, 0.45, 0.68], [-0.5, 1.22, 0.49, 0.69],
               [-3.0, 1.12, 0.50, 0.67]];
      B.top.push(K.body(R.map(function (q) { return [q[0], q[2], -0.20 + q[3], -0.20 - q[3], 0.65]; }), 20, s * 1.22, false, false));
      B.dark.push(K.box(0.05, 0.66, 1.18, 3.43, s * 1.22, -0.20));
      B.metal.push(K.box(1.9, 0.045, 1.14, 2.6, s * 0.80, -0.18));
      /* the Spey nozzle: larger and shorter than the J79's */
      B.metal.push(K.lathe([[-7.55, 0.60], [-8.10, 0.60], [-8.75, 0.56]], 24, s * 0.62, -0.22, false, false));
      B.hot.push(K.lathe([[-8.73, 0.50], [-8.76, 0.50]], 24, s * 0.62, -0.22, true, true));
    }
    /* the retractable refuelling probe, stowed in the starboard nose side */
    B.dark.push(K.box(1.8, 0.03, 0.08, 6.0, -0.66, 0.30));
    addParts(V, K, g, B, T);
    point(V, g, "aar_probe", 7.1, -0.75, 0.45);
    g.name = "phantom_fg1";
    return g;
  }


  /* ======================================================== NAVAL LYNX ==
     gb_lynx.js draws the ARMY Lynx: skids, the AAC olive-and-black
     camouflage and roundels baked into its skin sheet, and two variants
     (ah1, ah7) with no plain or wheeled option, so it cannot draw the
     naval Lynx without being edited. The naval Lynx is built here:
       fuselage  off [LX1] "Westland Lynx AH.1 3-view line drawing.png"
                 (Commons, 574 px): side and front at 24.1 px/m (the
                 published 39 ft 7 in, 12.07 m, nose to tail-rotor hub);
                 the main hub, tail rotor hub, rotor radius, chord and
                 tailplane are the published NASA TM 104000 figures that
                 gb_lynx.js quotes (nose 4.41 m ahead of the hub, which puts
                 [LX1]'s mast 0.26 m forward of NASA's: the drawing is
                 small, NASA is kept);
       naval fit [LX2] "Westland WG-13 Super Lynx Mk88a (code 83+25) ... RIAT
                 Fairford 17July2017" (side-on, 64 px/m on the same 12.07 m):
                 the round chin radome under the nose of the Super Lynx
                 marks (centre 3.67 m ahead of the hub, 0.95 m across), the
                 twin nose wheels 1.80 m ahead of the hub and the main
                 wheels 1.25 m aft of it on short sponsons; [LX3] "Royal
                 Navy Lynx 318" (an HMA.8 from below): the chin radome, the
                 Sea Owl turret on top of the nose, the splayed main wheels,
                 the BERP paddle tips; [LX4] "WG-13 Lynx decking on
                 Latouche-Treville" (a French Lynx): the long black nose
                 radome of the French radar, the light grey.
     VARIANTS: chin radome (super), Sea Owl, French nose, BERP tips, paint. */
  var LX = {
    HUB: 2.947, R: 6.401, CH: 0.395, ROOT: 1.811, TILT: 4 * D2R,
    TR: { x: -7.66, y: 0.50, h: 2.554 },
    /* stations: x ahead of the hub, half width, top and bottom heights
       above the ground (the drawing's skid line; the wheels put the same
       belly height, NOT CONFIRMED), squareness */
    FUS: [[4.41, 0.06, 1.00, 0.90, 1.0], [4.30, 0.30, 1.17, 0.74, 0.8], [4.04, 0.48, 1.22, 0.68, 0.7], [3.50, 0.72, 1.26, 0.60, 0.6],
          [3.04, 0.86, 1.42, 0.50, 0.55], [2.63, 0.92, 1.85, 0.46, 0.45], [2.21, 0.96, 2.32, 0.46, 0.40], [1.21, 0.98, 2.53, 0.46, 0.38],
          [0.0, 0.98, 2.62, 0.46, 0.38], [-0.86, 0.94, 2.70, 0.46, 0.40], [-1.69, 0.84, 2.69, 0.58, 0.42], [-2.27, 0.70, 2.45, 0.75, 0.45],
          [-2.52, 0.58, 2.20, 0.91, 0.5], [-2.93, 0.44, 2.16, 1.16, 0.6], [-3.27, 0.32, 2.16, 1.45, 0.7], [-4.5, 0.27, 2.11, 1.50, 0.75],
          [-6.25, 0.18, 2.00, 1.52, 0.8], [-7.35, 0.12, 1.98, 1.56, 0.85]],
    NW: { x: 1.80, y: 0.16, R: 0.21 }, MW: { x: -1.25, y: 1.39, R: 0.27 }
  };
  var LYNX_V = {
    has2fn: { nose: "fr", chin: false, owl: false, berp: false, trR: 1.105, trS: -1, top: "#8a8f8c", radome: "#141516" },
    mk4mlu: { nose: "fr", chin: false, owl: false, berp: false, trR: 1.105, trS: -1, top: "#8a8f8c", radome: "#141516" },
    mk88:   { nose: "plain", chin: false, owl: false, berp: false, trR: 1.105, trS: -1, top: "#5d6368" },
    mk88a:  { nose: "plain", chin: true, owl: false, berp: true, trR: 1.18, trS: 1, top: "#5d6368" },
    hma8:   { nose: "plain", chin: true, owl: true, berp: true, trR: 1.18, trS: 1, top: "#646e74" }
  };
  function navalLynx(THREE, M, C, VR) {
    var V = THREE, K = Kit(V), s, i;
    var T = mats(V, C, { top: VR.top, radome: VR.radome || VR.top });
    var GR = -0.76;                                  /* the origin as gb_lynx.js: CG 0.76 m up */
    function Z(h) { return GR + h; }
    var B = { top: [], radome: [], dark: [], metal: [], glass: [], team: [], hot: [] }, G = { metal: [], tyre: [] };
    var rows = K.dense(LX.FUS.map(function (q) { return [q[0], q[1], Z(q[2]), Z(q[3]), q[4]]; }), 3);
    B.top.push(K.body(rows, 32, 0, true, true));
    /* the cowl over the cabin roof, the intakes at its sides, the two
       exhausts angled out aft of it ([LX1] side, [LX2]) */
    B.top.push(K.body([[0.75, 0.30, Z(2.62), Z(2.40), 0.8], [0.2, 0.62, Z(2.78), Z(2.40), 0.6], [-1.2, 0.64, Z(2.80), Z(2.40), 0.6],
                       [-2.1, 0.50, Z(2.62), Z(2.35), 0.7], [-2.5, 0.20, Z(2.40), Z(2.25), 0.9]], 20, 0));
    for (s = -1; s <= 1; s += 2) {
      B.dark.push(K.box(0.45, 0.03, 0.28, 0.0, s * 0.64, Z(2.58)));
      B.metal.push(K.tube([-2.0, s * 0.42, Z(2.50)], [-2.55, s * 0.62, Z(2.46)], 0.15, 0.17, 12));
      B.hot.push(K.tube([-2.55, s * 0.62, Z(2.46)], [-2.57, s * 0.63, Z(2.46)], 0.15, 0.15, 12));
    }
    /* glazing: windscreen panes, the cockpit door windows, the cabin door
       windows (one a side, [LX2]); frames dark */
    for (s = -1; s <= 1; s += 2) {
      B.glass.push(K.body([[3.05, 0.02, Z(1.55), Z(1.42), 1], [2.85, 0.40, Z(1.95), Z(1.45), 0.8], [2.35, 0.60, Z(2.36), Z(1.80), 0.8]], 12, s * 0.42, true, true));
      B.glass.push(K.box(0.62, 0.03, 0.55, 2.0, s * 0.975, Z(1.85)));
      B.glass.push(K.box(0.48, 0.03, 0.40, 3.2, s * 0.82, Z(1.00)));
      B.glass.push(K.box(0.55, 0.03, 0.45, 0.55, s * 0.99, Z(1.80)));
      B.dark.push(K.box(0.04, 0.035, 1.25, 1.62, s * 0.985, Z(1.42)));
      B.dark.push(K.box(1.75, 0.035, 0.04, 0.55, s * 0.985, Z(2.20)));          /* sliding door rail */
      B.dark.push(K.box(1.75, 0.035, 0.04, 0.55, s * 0.985, Z(0.62)));
      B.dark.push(K.box(0.04, 0.035, 1.55, -0.32, s * 0.985, Z(1.40)));
    }
    B.dark.push(K.box(0.06, 0.06, 0.9, 2.85, 0, Z(1.95), 0, -0.55, 0));             /* windscreen post */
    /* noses: the French radar radome; the Super Lynx chin radome; Sea Owl */
    if (VR.nose === "fr") B.radome.push(K.lathe([[4.98, 0.05], [4.90, 0.30], [4.70, 0.44], [4.40, 0.48], [4.20, 0.48]], 20, 0, Z(0.95)));
    if (VR.chin) {
      B.radome.push(K.body([[4.15, 0.10, Z(0.70), Z(0.62), 1], [4.0, 0.40, Z(0.74), Z(0.48), 0.9], [3.67, 0.48, Z(0.76), Z(0.42), 0.9],
                            [3.30, 0.40, Z(0.74), Z(0.48), 0.9], [3.18, 0.10, Z(0.70), Z(0.60), 1]], 20, 0));
    }
    if (VR.owl) {
      B.top.push(K.tube([4.0, 0, Z(1.20)], [4.0, 0, Z(1.36)], 0.16, 0.16, 14));
      B.top.push(K.sph(0.24, 4.0, 0, Z(1.52), 1, 1, 1, 16, 10));
      B.glass.push(K.box(0.03, 0.18, 0.14, 4.24, 0, Z(1.52)));
    }
    /* tail: the fin (pylon) swept back, its leading edge from the boom
       ([LX1]); the tailplane on the STARBOARD side at the top (NASA) */
    B.top.push(K.finXZ([[-6.25, Z(1.87)], [-7.33, Z(2.78)], [-8.08, Z(2.78)], [-7.50, Z(1.62)], [-6.9, Z(1.56)]], 0, 0.13));
    B.top.push(K.wing([[-0.16, -7.84, -8.59, Z(2.44), 0.10], [-1.776, -7.92, -8.32, Z(2.44), 0.08]], 8));
    B.team.push(K.box(0.30, 0.6, 0.03, -8.12, -1.2, Z(2.47)));
    B.metal.push(K.tube([LX.TR.x, 0.12, Z(LX.TR.h)], [LX.TR.x, LX.TR.y - 0.08, Z(LX.TR.h)], 0.09, 0.08, 10));
    B.top.push(K.sph(0.22, LX.TR.x + 0.05, 0.02, Z(LX.TR.h), 1.4, 0.8, 1, 14, 8));
    /* aerials, the deck-lock harpoon under the belly, lights, steps */
    B.dark.push(K.bar([-1.8, 0, Z(2.69)], [-2.2, 0, Z(3.05)], 0.012, 5));
    B.dark.push(K.bar([-4.6, 0, Z(1.50)], [-4.5, 0, Z(1.15)], 0.012, 5));
    B.metal.push(K.tube([0.2, 0, Z(0.46)], [0.2, 0, Z(0.30)], 0.10, 0.08, 10));
    B.dark.push(K.box(0.12, 0.12, 0.06, -6.6, 0, Z(1.51)));
    B.team.push(K.box(1.2, 0.03, 0.30, -1.0, 0.57, Z(2.55)));
    B.team.push(K.box(1.2, 0.03, 0.30, -1.0, -0.57, Z(2.55)));
    /* the main gear sponsons aft of the cabin doors ([LX2]) */
    for (s = -1; s <= 1; s += 2)
      B.top.push(K.body([[-0.70, 0.04, Z(0.92), Z(0.62), 0.9], [-1.0, 0.24, Z(0.98), Z(0.55), 0.8], [-1.6, 0.24, Z(0.95), Z(0.58), 0.8],
                         [-1.9, 0.04, Z(0.90), Z(0.70), 0.9]], 12, s * 1.05));
    /* gear: twin castoring nose wheels, the main wheels splayed out 25 deg
       for the deck ([LX3]; the angle NOT CONFIRMED), track 2.78 m (NOT
       CONFIRMED) */
    var NW = LX.NW, MW = LX.MW;
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(K.wheel(NW.x, s * NW.y, Z(NW.R), NW.R, 0.13, 16));
      G.metal.push(K.wheel(NW.x, s * NW.y, Z(NW.R), NW.R * 0.55, 0.14, 10));
      var mw = K.wheel(0, 0, 0, MW.R, 0.18, 18), mh = K.wheel(0, 0, 0, MW.R * 0.55, 0.19, 10);
      [mw, mh].forEach(function (q) { q.rotateZ(s * 25 * D2R); q.translate(MW.x, s * MW.y, Z(MW.R)); });
      G.tyre.push(mw); G.metal.push(mh);
      G.metal.push(K.bar([MW.x, s * 1.12, Z(0.75)], [MW.x, s * (MW.y - 0.10), Z(MW.R)], 0.06, 8));
      G.metal.push(K.bar([MW.x + 0.45, s * 1.0, Z(0.70)], [MW.x, s * (MW.y - 0.10), Z(MW.R + 0.05)], 0.035, 6));
    }
    G.metal.push(K.bar([NW.x, 0, Z(0.50)], [NW.x, 0, Z(NW.R)], 0.06, 8));
    G.metal.push(K.bar([NW.x, -NW.y, Z(NW.R)], [NW.x, NW.y, Z(NW.R)], 0.035, 6));
    var g = new V.Group();
    g.name = "lynx_" + VR.key;
    K.emit(g, B, T);
    var gear = new V.Group(); gear.name = "gear";
    K.emit(gear, G, T);
    g.add(gear);
    /* rotors: anti-clockwise from above (NASA, as gb_lynx.js), the shaft
       4 deg forward; the Super Lynx BERP paddle tips ([LX3]) */
    var mast = rotorACW(V, K, g, T, { x: 0, z: Z(LX.HUB), R: LX.R, chord: LX.CH, n: 4, root: LX.ROOT * 0.45, tilt: LX.TILT,
                                      phase: 45, hubR: 0.32, tipSweep: VR.berp ? 0.55 : 0, mast: 0.35 });
    K.emit(g, { metal: mast }, T);
    tailRotor(V, K, g, T, { x: LX.TR.x, y: LX.TR.y + 0.10, z: Z(LX.TR.h), R: VR.trR, chord: 0.18, n: 4, phase: 0, sense: VR.trS });
    return g;
  }


  /* ============================================================ MERLIN ==
     asw_helo_b (Merlin HM2), gbr_e00_aswhelo (Merlin HM1), cawacs_b
     (Crowsnest: an HM2 with the radar pod). NEW: no hero draws an AW101.
     Measured off [ME1] "AW EH101.png" (Commons, 700 px three-view): side
     view at 20.4 px/m on the published fuselage length, 19.53 m, from the
     nose to the pylon's trailing edge (px 251-650); x = (398 - px) / 20.4
     ahead of the main hub, h = (393.75 - row) / 20.4 above the wheels;
     front view widths at 21.1 px/m (its hub height against the side's).
     [ME1]'s plan view puts the hub 6.24 m behind the nose against the side
     view's 7.19 (its own scale off the 9.30 m blade): NOT RESOLVED, the
     side view is used. Photographs: [ME2] "Royal Navy Melin Mk 2
     Helicopters on HMS Illustrious MOD 45157435" (head-on: the ventral
     radome under the forward fuselage, the sponsons, the twin nose wheels,
     the grey); [ME3] "Royal Navy Merlin HM2 Crowsnest ASaC" (port side:
     the Crowsnest pod stowed on the PORT side over the sponson, black, the
     tail rotor on the port side of the pylon). */
  var ME = {
    HUB: 5.14, R: 9.295, TR: { x: -11.80, y: 0.42, h: 5.21, R: 2.0 },
    FUS: [[7.19, 0.06, 1.30, 1.16, 1.0], [7.0, 0.45, 1.80, 0.92, 0.75], [6.52, 0.80, 2.45, 0.80, 0.6], [6.15, 0.98, 2.76, 0.75, 0.5],
          [5.40, 1.18, 3.15, 0.72, 0.42], [4.80, 1.26, 3.43, 0.71, 0.38], [4.07, 1.30, 3.59, 0.71, 0.36], [2.5, 1.32, 3.95, 0.71, 0.34],
          [1.62, 1.32, 4.12, 0.71, 0.34], [-1.45, 1.32, 4.10, 0.71, 0.34], [-3.0, 1.22, 3.95, 0.85, 0.38], [-4.02, 1.05, 3.81, 1.04, 0.42],
          [-5.74, 0.74, 3.68, 1.53, 0.5], [-8.19, 0.42, 3.50, 2.08, 0.6], [-9.90, 0.30, 3.75, 2.39, 0.7], [-11.2, 0.24, 4.40, 2.55, 0.8],
          [-12.1, 0.16, 4.70, 2.61, 0.85], [-12.45, 0.06, 4.80, 2.70, 1.0]],
    NW: { x: 5.49, y: 0.22, R: 0.30 }, MW: { x: -1.86, y: 2.04, R: 0.43 }
  };
  function merlin(THREE, M, C, VR) {
    var V = THREE, K = Kit(V), s, i;
    var T = mats(V, C, { top: "#6e767b", radome: "#6e767b", alt: "#1f2224" });
    var GR = -2.0;
    function Z(h) { return GR + h; }
    var B = { top: [], radome: [], alt: [], dark: [], metal: [], glass: [], team: [], hot: [] }, G = { metal: [], tyre: [] };
    B.top.push(K.body(K.dense(ME.FUS.map(function (q) { return [q[0], q[1], Z(q[2]), Z(q[3]), q[4]]; }), 3), 36, 0, true, true));
    /* the engine deck: the cowl from the roof up to 4.78 m over x 0.88 to
       -2.40 ([ME1] side), 3.3 m across its two side engines ([ME1] front) */
    B.top.push(K.body([[1.62, 0.90, Z(4.17), Z(3.90), 0.6], [0.88, 1.40, Z(4.70), Z(3.90), 0.45], [-0.6, 1.55, Z(4.78), Z(3.90), 0.45],
                       [-2.40, 1.45, Z(4.74), Z(3.90), 0.45], [-3.41, 0.80, Z(3.98), Z(3.80), 0.7]], 24, 0));
    for (s = -1; s <= 1; s += 2) {
      B.dark.push(K.box(0.06, 0.55, 0.55, 0.95, s * 1.05, Z(4.40)));                    /* side engine intakes */
      B.metal.push(K.tube([-2.2, s * 1.30, Z(4.40)], [-2.9, s * 1.45, Z(4.35)], 0.22, 0.24, 12));
      B.hot.push(K.tube([-2.9, s * 1.45, Z(4.35)], [-2.92, s * 1.455, Z(4.35)], 0.22, 0.22, 12));
      B.dark.push(K.box(0.9, 0.03, 0.20, -0.7, s * 1.56, Z(4.52)));                     /* cowl grilles */
    }
    B.dark.push(K.box(0.06, 0.6, 0.35, 1.0, 0, Z(4.72)));                                  /* centre intake */
    B.metal.push(K.tube([-2.4, 0, Z(4.55)], [-3.1, 0, Z(4.35)], 0.20, 0.22, 12));
    /* sponsons ([ME1] side x -1.45 to -4.02, h 0.67-1.55; out to 2.19 m in
       front view) with the main legs; the ventral radome of the HM1/HM2
       under the forward fuselage ([ME2]; its size NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2)
      B.top.push(K.body([[-1.20, 0.10, Z(1.30), Z(0.95), 0.9], [-1.6, 0.42, Z(1.50), Z(0.70), 0.7], [-3.2, 0.44, Z(1.55), Z(0.67), 0.7],
                         [-4.02, 0.20, Z(1.40), Z(0.90), 0.8], [-4.3, 0.04, Z(1.25), Z(1.05), 1]], 16, s * 1.74));
    B.radome.push(K.body([[4.6, 0.30, Z(0.72), Z(0.65), 1], [4.2, 0.78, Z(0.72), Z(0.42), 0.8], [2.6, 0.82, Z(0.72), Z(0.38), 0.8],
                          [1.2, 0.70, Z(0.72), Z(0.44), 0.8], [0.8, 0.25, Z(0.72), Z(0.64), 1]], 22, 0));
    /* glazing: the big windscreen, the cockpit side windows, the chin
       windows, the cabin windows ([ME1] side; [ME2], [ME3]) */
    for (s = -1; s <= 1; s += 2) {
      B.glass.push(K.body([[6.45, 0.02, Z(2.55), Z(2.25), 1], [6.10, 0.55, Z(2.95), Z(2.25), 0.8], [5.30, 0.92, Z(3.30), Z(2.60), 0.8]], 12, s * 0.48, true, true));
      B.glass.push(K.box(0.95, 0.03, 0.75, 4.75, s * 1.27, Z(2.85)));
      B.glass.push(K.box(0.30, 0.03, 0.38, 5.55, s * 1.05, Z(1.95)));
      B.glass.push(K.box(0.30, 0.03, 0.38, 5.15, s * 1.15, Z(1.95)));
      [2.0, -0.6, -2.2].forEach(function (x) { B.glass.push(K.box(0.42, 0.03, 0.52, x, s * 1.33, Z(2.60))); });
      B.dark.push(K.box(1.3, 0.035, 0.05, 3.15, s * 1.33, Z(3.55)));                    /* door rails */
      B.dark.push(K.box(0.04, 0.035, 2.6, 3.8, s * 1.33, Z(2.15)));
      B.dark.push(K.box(0.04, 0.035, 2.6, 2.5, s * 1.33, Z(2.15)));
      B.dark.push(K.box(0.04, 0.035, 2.8, -4.4, s * 0.95, Z(2.45)));
    }
    B.dark.push(K.box(0.05, 0.07, 1.0, 6.05, 0, Z(2.75), 0, -0.6, 0));
    /* pylon and tail rotor gearbox; the stabiliser on the STARBOARD side
       ([ME1] plan; NOT CONFIRMED from a photograph) */
    B.top.push(K.finXZ([[-8.43, Z(3.49)], [-10.4, Z(4.60)], [-11.3, Z(5.35)], [-12.4, Z(5.35)], [-12.6, Z(4.80)], [-12.3, Z(2.65)], [-10.4, Z(2.40)]], 0, 0.20));
    B.top.push(K.wing([[-0.20, -11.0, -12.05, Z(2.75), 0.12], [-2.10, -11.3, -11.95, Z(2.80), 0.10]], 8));
    B.team.push(K.box(0.5, 0.9, 0.03, -11.6, -1.4, Z(2.85)));
    B.top.push(K.sph(0.35, ME.TR.x, 0.1, Z(ME.TR.h), 1.4, 0.9, 1.0, 14, 8));
    B.metal.push(K.tube([ME.TR.x, 0.2, Z(ME.TR.h)], [ME.TR.x, ME.TR.y - 0.05, Z(ME.TR.h)], 0.12, 0.10, 10));
    B.team.push(K.box(1.2, 0.03, 0.4, -0.8, 1.565, Z(4.30)));
    B.team.push(K.box(1.2, 0.03, 0.4, -0.8, -1.565, Z(4.30)));
    /* aerials and lights */
    B.dark.push(K.bar([-5.0, 0, Z(3.68)], [-5.3, 0, Z(4.15)], 0.015, 5));
    B.dark.push(K.bar([-7.0, 0, Z(2.20)], [-6.9, 0, Z(1.75)], 0.015, 5));
    B.dark.push(K.box(0.16, 0.16, 0.08, -2.5, 0, Z(0.80)));
    if (VR.crowsnest) {
      /* the Crowsnest pod stowed on the port side over the sponson ([ME3]):
         about 2.6 m long, 1.9 m deep, 1.5 m across, black; sizes read off
         [ME3] against the 0.86 m main wheel (NOT CONFIRMED) */
      B.alt.push(K.body([[-1.9, 0.10, Z(1.75), Z(1.55), 1], [-2.15, 0.55, Z(2.45), Z(0.90), 0.8], [-2.6, 0.74, Z(2.62), Z(0.72), 0.75],
                         [-3.8, 0.74, Z(2.62), Z(0.72), 0.75], [-4.3, 0.55, Z(2.45), Z(0.90), 0.8], [-4.55, 0.10, Z(1.75), Z(1.55), 1]], 28, 2.60));
      B.metal.push(K.box(1.0, 0.4, 0.25, -3.2, 1.95, Z(1.65)));
    }
    /* gear: twin nose wheels, one main wheel a side under the sponson */
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(K.wheel(ME.NW.x, s * ME.NW.y, Z(ME.NW.R), ME.NW.R, 0.18, 16));
      G.metal.push(K.wheel(ME.NW.x, s * ME.NW.y, Z(ME.NW.R), ME.NW.R * 0.55, 0.19, 10));
      G.tyre.push(K.wheel(ME.MW.x, s * ME.MW.y, Z(ME.MW.R), ME.MW.R, 0.26, 20));
      G.metal.push(K.wheel(ME.MW.x, s * ME.MW.y, Z(ME.MW.R), ME.MW.R * 0.55, 0.27, 12));
      G.metal.push(K.bar([ME.MW.x, s * 1.90, Z(0.80)], [ME.MW.x, s * (ME.MW.y - 0.15), Z(ME.MW.R)], 0.08, 8));
    }
    G.metal.push(K.bar([ME.NW.x, 0, Z(0.80)], [ME.NW.x, 0, Z(ME.NW.R)], 0.08, 8));
    G.metal.push(K.bar([ME.NW.x, -ME.NW.y, Z(ME.NW.R)], [ME.NW.x, ME.NW.y, Z(ME.NW.R)], 0.04, 6));
    var g = new V.Group();
    g.name = "merlin_" + VR.key;
    K.emit(g, B, T);
    var gear = new V.Group(); gear.name = "gear";
    K.emit(gear, G, T);
    g.add(gear);
    /* rotors: five blades with the BERP paddle tips ([ME1] plan, [ME3]);
       the sense of turn is NOT CONFIRMED (drawn anti-clockwise from above);
       four-blade tail rotor to port ([ME3]) */
    var mast = rotorACW(V, K, g, T, { x: 0, z: Z(ME.HUB), R: ME.R, chord: 0.62, n: 5, root: 0.9, tilt: 0,
                                      phase: 18, hubR: 0.55, tipSweep: 0.75, mast: 0.40 });
    K.emit(g, { metal: mast }, T);
    tailRotor(V, K, g, T, { x: ME.TR.x, y: ME.TR.y + 0.10, z: Z(ME.TR.h), R: ME.TR.R, chord: 0.26, n: 4, phase: 0, sense: 1 });
    return g;
  }


  /* ======================================================= NH90 NFH ==
     HeroNH90.e00 (fr_helos.js) is the NH90 TTH measured off the NH90
     orthographic drawing; the NFH is the same airframe with the naval fit
     ([NF1] "NH Industries NH90-NFH 'RN-02' (cropped)", a Belgian NFH): the
     search radar's flat round radome under the forward cabin, the FLIR
     ball under the nose, no rear ramp. Called whole, the army camouflage
     repainted plain grey with this file's sheet (the French Navy's grey is
     NOT CONFIRMED: [NF1] is white, no Caiman Marine photograph was found),
     which also drops the TTH ramp seams of the source sheet. The radome is
     shallower than [NF1] shows (0.28 m under the belly, its bottom 0.05 m
     off the ground) because the TTH gear stands the belly only 0.33 m up:
     the NFH's taller naval gear is NOT drawn. */
  function nh90NFH(THREE, M, C) {
    var V = THREE, K = Kit(V), g = HeroNH90.e00(THREE, M, C);
    var T = mats(V, C, { top: "#6c7479", radome: "#5d6468" });
    repaint(V, g, byName(/^airframe$/), function () { return "top"; }, T);
    function Z(h) { return h - 2.0; }
    var B = { radome: [], dark: [], glass: [], metal: [] };
    B.radome.push(K.tube([2.7, 0, Z(0.33)], [2.7, 0, Z(0.12)], 0.78, 0.74, 32));
    B.radome.push(K.sph(0.74, 2.7, 0, Z(0.12), 1, 1, 0.09, 32, 6));
    B.metal.push(K.tube([5.15, 0, Z(0.62)], [5.15, 0, Z(0.48)], 0.08, 0.08, 10));
    B.dark.push(K.sph(0.19, 5.15, 0, Z(0.36), 1, 1, 1, 16, 10));
    B.glass.push(K.box(0.03, 0.14, 0.12, 5.34, 0, Z(0.36)));
    addParts(V, K, g, B, T);
    g.name = "nh90_nfh";
    return g;
  }


  /* =================================================== SKYRAIDER AEW.1 ==
     The Fleet Air Arm's AEW.1 was the US Navy's AD-4W. HeroSkyraider
     (us_skyraider.js) draws the AD-4 ("AD4") in the glossy sea blue the
     AEW.1s kept ([SK1] "Skyraider AEW1 778 RNAS Culdrose": four AEW.1s in
     flight, dark overall); it has no AD-4W option, so the AD-4 is called
     whole and the APS-20 radome added under the forward fuselage: off [SK1]
     (61 px/m on the published 11.84 m) it starts 1.6 m behind the spinner
     tip and is 3.5 m long. [SK1] has it hanging 1.3 m under the belly in
     flight; the model stands level on the AD-4's drawn gear (rule 4), so
     its depth is held to leave 0.25 m under it (NOT CONFIRMED: the real
     aircraft sat tail down). The AD-4's wing cannon stay in the source
     build (the AD-4W had none). */
  function skyraiderAEW1(THREE, M, C) {
    var V = THREE, K = Kit(V), g = HeroSkyraider.build(THREE, M, C, "AD4");
    var T = mats(V, C, { top: "#24406c" });
    var B = { top: [], dark: [] };
    B.top.push(K.body(K.dense([[4.05, 0.05, -0.62, -0.80, 1], [3.75, 0.55, -0.68, -1.30, 0.9], [3.2, 0.80, -0.72, -1.62, 0.85],
                               [2.3, 0.84, -0.75, -1.70, 0.85], [1.4, 0.70, -0.78, -1.55, 0.85], [0.8, 0.40, -0.80, -1.15, 0.9],
                               [0.55, 0.05, -0.80, -0.85, 1]], 3), 28, 0));
    B.dark.push(K.box(2.2, 0.03, 0.03, 2.3, 0.70, -1.45));
    B.dark.push(K.box(2.2, 0.03, 0.03, 2.3, -0.70, -1.45));
    addParts(V, K, g, B, T);
    g.name = "skyraider_aew1";
    return g;
  }


  /* ================================================= SEA HARRIER FA2 ==
     HeroHarrier1 "FRS1" (gb_harrier1.js) is the Sea Harrier FRS.1; the FA2
     is the FRS.1 rebuilt with the Blue Vixen radar in a bigger, blunt
     radome ([SH2] "British Aerospace Sea Harrier FA.2 ZH810 Pima Air and
     Space Museum": the black blunt radome as deep as the forward fuselage,
     the overall medium grey), a 0.35 m plug aft of the wing and AMRAAM.
     The module has no FA2 option: the FRS.1 is called whole, repainted the
     overall grey, and the FA2 radome added AROUND the FRS.1's pointed one
     (its tip at the FRS.1's, 6.96 m). The plug is NOT drawn (the module
     cannot stretch), so the model keeps the FRS.1's 14.5 m against the
     FA2's published 14.17 m. */
  function seaHarrierFA2(THREE, M, C) {
    var V = THREE, K = Kit(V), g = HeroHarrier1.build(THREE, M, C, "FRS1");
    var T = mats(V, C, { top: "#6f777b", radome: "#1d1f21" });
    repaint(V, g, hasMap, function () { return "top"; }, T);
    var B = { radome: [], dark: [] };
    B.radome.push(K.lathe([[6.97, 0.04], [6.90, 0.24], [6.72, 0.37], [6.42, 0.45], [6.0, 0.48], [5.5, 0.475], [5.30, 0.47]], 28, 0, 1.74, true, false));
    B.dark.push(K.tube([5.30, 0, 1.74], [5.27, 0, 1.74], 0.48, 0.48, 28));
    addParts(V, K, g, B, T);
    point(V, g, "aar_probe", 7.0, 0.35, 2.05);
    g.name = "sea_harrier_fa2";
    return g;
  }


  /* ===================================================== A330 MRTT ==
     tanker_g (MMF A330 MRTT), tanker_f (A330 MRTT Phenix), tanker_b
     (Voyager KC3). NEW: eu_big_aircraft.js draws the A310 MRTT, the
     TriStar, the VC10 and the A400M, not the A330, so the A330 is built
     here on that file's exported kit (EuBigKit, which is a kit, not a
     model). Measured off [A1] "Airbus A330 family v1.1.png" (Julien
     Scavini, dimensioned A330-200: 58m80, span 60m30, height 17m40,
     fuselage 5m64), fetched at 960 px: side and plan at 9.46 px/m (the
     58.80 m over 556 px; the plan's half span then reads 29.9 m against
     30.15), d = metres aft of the nose, h above the ground line. Photos:
     [A2] "Airbus A330 MRTT F-UJCG - French Air Force" (the winglets, the
     two wing pods under the outer wing, the boom stowed under the tail
     cone, the grey); [A3] "Yoyager-underwing-cobham-pod" (the Voyager's
     Cobham 905E pod on its pylon). The MMF and Phenix carry the boom; the
     Voyager has no boom (aar_specs.js: pods and the fuselage unit). */
  var A33 = {
    HAX: 5.4, DMIN: 0, DMAX: 58.8, NSEC: 60,
    FUS: [[0.0, 0.10, 4.95, 4.70, 1.0], [0.4, 0.80, 5.70, 4.15, 0.98], [1.23, 1.45, 6.10, 3.85, 0.98], [3.0, 2.15, 7.26, 3.10, 0.98],
          [4.76, 2.55, 7.93, 2.55, 0.98], [7.0, 2.80, 8.15, 2.40, 0.98], [10.0, 2.82, 8.21, 2.37, 0.98], [30.0, 2.82, 8.50, 2.60, 0.98],
          [38.0, 2.50, 8.62, 2.95, 0.98], [41.8, 2.10, 8.64, 3.53, 0.98], [47.0, 1.75, 8.66, 4.76, 0.98], [52.3, 1.10, 8.66, 6.17, 0.98],
          [55.0, 0.80, 8.55, 7.00, 1.0], [57.6, 0.40, 8.40, 7.95, 1.0], [58.8, 0.12, 8.25, 8.12, 1.0]],
    WING: [[2.9, 20.35, 30.9], [3.2, 20.53, 30.9], [9.0, 24.1, 31.2], [15.0, 27.8, 33.0], [22.0, 32.1, 35.5], [29.1, 36.5, 38.8], [29.9, 37.0, 38.9]],
    wz: function (y) { return 3.30 + 0.096 * (Math.abs(y) - 2.9); },
    wtc: function (y) { return 0.14 - 0.045 * Math.min(1, Math.abs(y) / 29.9); },
    camber: 0.012, yTeam: 28.3,
    STAB: [[1.0, 51.6, 55.3], [3.0, 52.8, 55.9], [6.0, 54.6, 57.4], [9.25, 56.6, 58.6], [9.8, 57.0, 58.9]],
    sz: function (y) { return 8.20 + 0.11 * (Math.abs(y) - 1.0); },
    stc: function () { return 0.09; },
    FIN: [[8.6, 47.0, 57.3, 0.12], [9.4, 49.4, 57.7, 0.11], [12.0, 51.6, 58.4, 0.10], [15.0, 54.4, 59.0, 0.095], [17.83, 56.8, 58.9, 0.09]],
    finTeam: 16.6,
    nose: { d: 6.7, R: 0.53, W: 0.36, tr: 0.36 },
    main: { y: 5.35, ax: [27.7, 29.6], R: 0.65, W: 0.48, du: 0.70 }
  };
  var A33_PAINT = {
    mmf:     { key: "a330mmf", top: "#8f969b", low: "#878d92", seed: 3301 },
    phenix:  { key: "a330phx", top: "#8f969b", low: "#878d92", seed: 3302 },
    voyager: { key: "a330voy", top: "#80878c", low: "#7a8186", seed: 3303 }
  };
  /* the Trent 772B pod: lip 16.9 m aft of the nose, 3.0 m across, axis
     2.4 m up and 9.2 m out ([A1] side and plan) */
  var A33_ENG = [[0.35, 1.38], [0.0, 1.50], [0.3, 1.56], [1.6, 1.56], [3.9, 1.45], [5.1, 1.10], [5.15, 0.85], [7.2, 0.70], [8.0, 0.45], [8.5, 0.22]];
  var A33_POD = [[0, 0.05], [0.3, 0.30], [0.8, 0.45], [2.9, 0.46], [3.6, 0.36], [3.95, 0.12]];
  function a330mrtt(THREE, M, C, which) {
    var K = EuBigKit, S = A33, V = THREE, s;
    S.NOSE = (S.DMIN + S.DMAX) / 2;
    if (!S.SEC) S.SEC = K.resampleD(S.FUS, S.NSEC);
    var X = function (d) { return K.X(S, d); }, Z = function (h) { return K.Z(S, h); };
    var T = K.materials(THREE, C, A33_PAINT[which]), g = new THREE.Group();
    K.addFuselage(THREE, g, T, S);
    K.addWings(THREE, g, T, S);
    K.addFin(THREE, g, T, S);
    K.addStab(THREE, g, T, S);
    for (s = -1; s <= 1; s += 2) {
      K.fanPod(THREE, g, T, A33_ENG, X(16.9), s * 9.2, Z(2.4), true);
      K.pylon(THREE, g, T, S, s * 9.2, 18.0, 21.8, 3.85, 27.2, 22.4, 0.26);
      /* the Cobham 905E pods under the outer wing (y 21.5 NOT CONFIRMED:
         [A2] read at an angle) */
      K.emit(THREE, g, K.lathe(THREE, A33_POD, 14, X(30.0), s * 21.5, Z(S.wz(21.5) - 1.05), true, true), T, K.engRule);
      K.pylon(THREE, g, T, S, s * 21.5, 30.6, 33.0, S.wz(21.5) - 0.62, 33.8, 31.2, 0.10);
      /* winglets: 2.7 m tall at the tips, canted out ([A1] front, [A2]) */
      var hT = S.wz(29.9);
      K.emit(THREE, g, K.plate(THREE, [[X(36.6), Z(hT)], [X(38.9), Z(hT)], [X(39.6), Z(hT + 2.7)], [X(38.7), Z(hT + 2.7)]], s * 29.95, 0.06),
             T, function () { return "team"; });
    }
    /* glazing: the flight deck windows; the cabin windows as a dark band of
       ports along each side (the door outlines in the sheet) */
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 1.9, 2.9, 40, 140, 3, 8), T.glass));
    for (s = 0; s < 2; s++) {
      var t0 = s ? 150 : 22, t1 = s ? 158 : 30;
      g.add(new THREE.Mesh(K.hullPatch(THREE, S, 8.0, 45.0, t0, t1, 20, 1), T.ink));
    }
    [[6.6, 7.5], [17.0, 17.9], [41.0, 41.9]].forEach(function (dd) {
      [[18, 34], [146, 162]].forEach(function (tt) { g.add(new THREE.Mesh(K.hullPatch(THREE, S, dd[0], dd[1], tt[0], tt[1], 2, 3), T.ink)); });
    });
    /* the belly fairing over the centre section and gear bays */
    g.add(K.egg(THREE, T.low, 8.0, 2.95, 0.70, X(25.5), 0, Z(2.55), 20, 8));
    g.add(K.disc(THREE, T.hot, 0.16, X(58.82), 0, Z(8.18), 10));
    /* aerials on the crown and the belly */
    [12, 20, 34].forEach(function (d) { g.add(K.box(THREE, T.ink, 0.5, 0.05, 0.35, X(d), 0, Z(K.secAt(d, S.SEC)[2] + 0.17))); });
    /* gear */
    var gear = new THREE.Group(), N = S.nose, nz = Z(N.R);
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) K.tyreSet(THREE, gear, T, X(N.d), s * N.tr, nz, N.R, N.W);
    gear.add(K.taper(THREE, T.metal, [X(N.d - 0.1), 0, Z(K.secAt(N.d, S.SEC)[3] + 0.2)], [X(N.d), 0, nz], 0.13, 0.09, 8));
    gear.add(new THREE.Mesh(K.hullPatch(THREE, S, N.d - 1.0, N.d + 1.0, -116, -64, 2, 3), T.ink));
    var Mg = S.main;
    for (s = -1; s <= 1; s += 2) K.truck(THREE, gear, T, S, Mg, s * Mg.y, K.wingH(S, Mg.y, (Mg.ax[0] + Mg.ax[1]) / 2, false) + 0.1);
    g.add(gear);
    var pts = { pod_l: [X(33.95), 21.5, Z(S.wz(21.5) - 1.05)], pod_r: [X(33.95), -21.5, Z(S.wz(21.5) - 1.05)] };
    var stow = null;
    if (which !== "voyager") {
      /* the Airbus boom, stowed under the tail cone, its tip just aft of
         the tail ([A2]); the ruddevators at its end (sizes NOT CONFIRMED) */
      g.add(K.egg(THREE, T.low, 1.6, 0.55, 0.40, X(49.6), 0, Z(4.9), 12, 6));
      stow = new THREE.Group();
      stow.name = "aar_boomstow";
      stow.add(K.taper(THREE, T.low, [X(49.8), 0, Z(4.75)], [X(60.2), 0, Z(6.7)], 0.30, 0.16, 10));
      for (s = -1; s <= 1; s += 2) {
        var rd = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.06), T.low);
        rd.position.set(X(58.6), s * 0.55, Z(6.55));
        rd.rotation.x = s * 42 * EuBigKit.D2R;
        stow.add(rd);
      }
      pts.boom = [X(49.8), 0, Z(4.75)];
      pts.boomtip = [X(60.2), 0, Z(6.7)];
    } else {
      /* the Voyager's fuselage refuelling unit under the rear fuselage */
      g.add(K.egg(THREE, T.low, 2.2, 0.75, 0.50, X(46.5), 0, Z(4.55), 12, 6));
      pts.ctr = [X(48.4), 0, Z(4.2)];
    }
    var res = K.mergeByMaterial(THREE, g);
    if (stow) {
      /* the stowed boom stays a group of its own, which the renderer hides
         while it draws the lowered boom */
      var sg = new THREE.Group();
      sg.name = "aar_boomstow";
      K.mergeByMaterial(THREE, stow).children.slice().forEach(function (c) { if (c.isMesh) sg.add(c); });
      res.add(sg);
    }
    K.aarNodes(THREE, res, pts);
    /* the MRTT's own receptacle over the flight deck; the Voyager has none */
    if (which !== "voyager") point(THREE, res, "aar_recept", X(5.5), 0, Z(8.10));
    return res;
  }


  /* ===================================================== AIRSEEKER R.1 ==
     ew_b: the RAF's RC-135W Rivet Joint. HeroTankers "R" (us_tankers.js) is
     the KC-135R, the same C-135 airframe with the same CFM56 (F108) engines
     the RC-135W flies with. It is called whole; the stowed boom group
     (aar_boomstow) and the boom attach points are taken off (the RC-135 has
     no boom), and the RC-135's own parts added as [RC1] "RC-135 Rivet Joint
     in flight" shows them: the black "hog nose" thimble radome reaching
     about 1.2 m ahead of the KC-135's nose (its length read against the
     4.2 m fuselage depth, NOT CONFIRMED), the long cheek fairings low on
     each side of the forward fuselage, and the rows of blade aerials on
     the spine and the belly. Paint: the KC-135R's light grey is kept (the
     RAF scheme NOT CONFIRMED). The boom fairing under the tail stays in
     the merged source mesh. */
  function airseeker(THREE, M, C) {
    var V = THREE, K = Kit(V), g = HeroTankers.build(THREE, M, C, "R"), s, i;
    ["aar_boomstow", "aar_boom", "aar_boomtip"].forEach(function (n) { var o = findNode(g, n); if (o && o.parent) o.parent.remove(o); });
    var T = mats(V, C, { top: "#747b80", radome: "#151618" });
    var B = { top: [], radome: [], dark: [] };
    B.radome.push(K.lathe([[21.95, 0.05], [21.75, 0.42], [21.25, 0.72], [20.7, 0.90], [20.15, 0.98], [19.95, 0.99]], 28, 0, -0.42, true, true));
    for (s = -1; s <= 1; s += 2) {
      B.top.push(K.body(K.dense([[17.6, 0.05, -0.30, -0.55, 1], [17.0, 0.30, -0.15, -1.20, 0.8], [15.5, 0.40, -0.10, -1.40, 0.75],
                                 [9.0, 0.40, -0.10, -1.40, 0.75], [7.8, 0.25, -0.25, -1.20, 0.8], [7.2, 0.05, -0.55, -0.85, 1]], 2), 18, s * 1.72));
      B.dark.push(K.box(7.0, 0.02, 0.03, 12.3, s * 2.13, -0.75));
    }
    for (i = 0; i < 7; i++) B.dark.push(K.finXZ([[15.0 - i * 2.4, 2.03], [14.55 - i * 2.4, 2.03], [14.45 - i * 2.4, 2.50], [14.7 - i * 2.4, 2.50]], 0, 0.02));
    for (i = 0; i < 5; i++) B.dark.push(K.finXZ([[13.0 - i * 2.6, -1.98], [12.6 - i * 2.6, -1.98], [12.5 - i * 2.6, -2.30], [12.7 - i * 2.6, -2.30]], 0, 0.02));
    addParts(V, K, g, B, T);
    point(V, g, "aar_recept", 15.6, 0, 2.08);
    g.name = "rc135w";
    return g;
  }


  /* ============================================== E-7 WEDGETAIL AEW1 ==
     awacs_b. NEW: no hero draws a 737 (us_e3_sentry.js says so). Built on
     EuBigKit. Measured off [E1] "B737 AEW&C Wedgetail (cropped).PNG"
     (Commons, a 656 px side view): 18.1 px/m on the published 33.6 m from
     the nose to the tail cone (px 6-615), the fuselage axis at row 162. At
     that scale [E1]'s MESA radome reads 10.2 m against the 10.82 m it is
     labelled with, and its "top hat" leans 7 deg nose down, as labelled.
     [E1] has no plan view and no gear: the wing (span 34.3 m without
     winglets, about 25 deg of sweep), the tailplane (14.35 m) and the gear
     (12.6 m wheelbase, 5.72 m track) are the 737-700's published figures,
     and the ground is put 12.5 m (the published height) under [E1]'s fin
     tip, which gives the fuselage the 737's low stance (NOT CONFIRMED in
     detail). [E2] "RAF Wedgetail in flight" (2024): the overall grey, the
     two ventral fins under the tail, the blade aerials on the spine. */
  var E7 = {
    HAX: 3.8, DMIN: 0, DMAX: 33.6, NSEC: 48,
    FUS: [[0.0, 0.08, 3.85, 3.60, 1.0], [0.5, 0.75, 4.35, 3.00, 0.98], [1.3, 1.25, 4.85, 2.40, 0.98], [2.43, 1.62, 5.33, 2.06, 0.98],
          [5.2, 1.86, 5.65, 1.76, 0.98], [7.96, 1.88, 5.98, 1.70, 0.98], [24.5, 1.88, 5.98, 1.76, 0.98], [27.3, 1.70, 6.00, 2.43, 0.98],
          [30.1, 1.25, 6.00, 3.53, 0.98], [32.8, 0.55, 5.95, 4.58, 1.0], [33.6, 0.12, 5.70, 5.30, 1.0]],
    WING: [[1.88, 15.0, 21.3], [6.0, 17.2, 21.8], [12.0, 20.4, 23.4], [17.16, 23.1, 24.4]],
    wz: function (y) { return 2.67 + 0.105 * (Math.abs(y) - 1.88); },
    wtc: function (y) { return 0.13 - 0.03 * Math.min(1, Math.abs(y) / 17.2); },
    camber: 0.012, yTeam: 16.2,
    STAB: [[0.9, 30.0, 33.4], [3.5, 31.6, 33.8], [7.17, 33.0, 34.2]],
    sz: function (y) { return 5.0 + 0.12 * (Math.abs(y) - 0.9); },
    stc: function () { return 0.09; },
    FIN: [[5.9, 24.5, 32.8, 0.12], [7.0, 26.0, 33.0, 0.11], [9.5, 28.8, 33.6, 0.10], [12.47, 32.9, 34.6, 0.09]],
    finTeam: 11.8,
    nose: { d: 5.9, R: 0.35, W: 0.22, tr: 0.24 },
    main: { y: 2.86, ax: [18.5], R: 0.56, W: 0.36, du: 0.42 }
  };
  var E7_ENG = [[0.25, 0.88], [0.0, 0.98], [0.3, 1.02], [1.5, 1.0], [3.4, 0.86], [4.0, 0.62], [4.7, 0.42], [5.1, 0.2]];
  function wedgetail(THREE, M, C) {
    var K = EuBigKit, S = E7, s, i;
    S.NOSE = (S.DMIN + S.DMAX) / 2;
    if (!S.SEC) S.SEC = K.resampleD(S.FUS, S.NSEC);
    var X = function (d) { return K.X(S, d); }, Z = function (h) { return K.Z(S, h); };
    var T = K.materials(THREE, C, { key: "e7raf", top: "#7e8589", low: "#787f83", seed: 7101 }), g = new THREE.Group();
    K.addFuselage(THREE, g, T, S);
    K.addWings(THREE, g, T, S);
    K.addFin(THREE, g, T, S);
    K.addStab(THREE, g, T, S);
    for (s = -1; s <= 1; s += 2) {
      K.fanPod(THREE, g, T, E7_ENG, X(11.8), s * 4.9, Z(2.2), true);
      K.pylon(THREE, g, T, S, s * 4.9, 13.0, 15.4, 3.05, 17.8, 15.6, 0.20);
      /* the ventral fins under the tail cone, canted out ([E2]) */
      var vf = K.plate(THREE, [[X(27.0), Z(2.55)], [X(30.4), Z(3.55)], [X(30.6), Z(3.20)], [X(28.2), Z(2.30)]], 0, 0.04);
      vf.rotateX(s * 0.45); vf.translate(0, s * 0.8, 0);
      K.emit(THREE, g, vf, T, function () { return "low"; });
    }
    /* the MESA radome [E1]: the "top hat" plank 10.2 m long, its front
       end 7 deg lower than its back, on the array body (7.6 m x 1.9 m);
       widths NOT CONFIRMED (plank 2.4 m, body 1.1 m) */
    var hc0 = 3.8 + 3.98, hc1 = 3.8 + 4.90, d0 = (285 - 6) / 18.1, d1 = (470 - 6) / 18.1;
    function hc(d) { return hc0 + (hc1 - hc0) * (d - d0) / (d1 - d0); }
    var plank = [], body = [], n = 9;
    for (i = 0; i < n; i++) {
      var dd = d0 + (d1 - d0) * i / (n - 1), w = (i === 0 || i === n - 1) ? 0.4 : 1.2, t = (i === 0 || i === n - 1) ? 0.12 : 0.30;
      plank.push([dd, w, hc(dd) + t, hc(dd) - t, 0.6]);
    }
    K.addBody(THREE, g, T, S, plank, 0, true, true, function () { return "top"; });
    var bd0 = (305 - 6) / 18.1, bd1 = (442 - 6) / 18.1;
    K.addBody(THREE, g, T, S, [[bd0, 0.25, hc(bd0) - 0.2, 5.9, 0.5], [bd0 + 0.8, 0.55, hc(bd0 + 0.8) - 0.2, 5.9, 0.5],
                                [bd1 - 0.8, 0.55, hc(bd1 - 0.8) - 0.2, 5.9, 0.5], [bd1, 0.25, hc(bd1) - 0.2, 5.9, 0.5]], 0, true, true,
              function () { return "low"; });
    /* glazing, doors, the cabin windows as a dark band */
    g.add(new THREE.Mesh(K.hullPatch(THREE, S, 1.6, 2.4, 42, 138, 3, 8), T.glass));
    for (s = 0; s < 2; s++) g.add(new THREE.Mesh(K.hullPatch(THREE, S, 6.0, 26.0, s ? 154 : 18, s ? 160 : 26, 14, 1), T.ink));
    [[4.2, 5.0], [16.7, 17.3], [27.6, 28.4]].forEach(function (dd) {
      [[14, 32], [148, 166]].forEach(function (tt) { g.add(new THREE.Mesh(K.hullPatch(THREE, S, dd[0], dd[1], tt[0], tt[1], 2, 3), T.ink)); });
    });
    /* blade aerials on the spine and belly ([E1], [E2]) */
    for (i = 0; i < 6; i++) g.add(K.box(THREE, T.ink, 0.30, 0.05, 0.38, X(9.5 + i * 1.3), 0, Z(5.98 + 0.18)));
    for (i = 0; i < 6; i++) g.add(K.box(THREE, T.ink, 0.30, 0.05, 0.36, X(13.5 + i * 2.6), 0, Z(1.70 - 0.16)));
    g.add(K.egg(THREE, T.low, 5.0, 2.0, 0.40, X(18.0), 0, Z(1.78), 16, 8));
    /* gear (737-700 published) */
    var gear = new THREE.Group(), N = S.nose, nz = Z(N.R);
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) K.tyreSet(THREE, gear, T, X(N.d), s * N.tr, nz, N.R, N.W);
    gear.add(K.taper(THREE, T.metal, [X(N.d - 0.1), 0, Z(K.secAt(N.d, S.SEC)[3] + 0.2)], [X(N.d), 0, nz], 0.10, 0.07, 8));
    var Mg = S.main;
    for (s = -1; s <= 1; s += 2) K.truck(THREE, gear, T, S, Mg, s * Mg.y, K.wingH(S, Mg.y, Mg.ax[0], false) + 0.1);
    g.add(gear);
    var res = K.mergeByMaterial(THREE, g);
    point(THREE, res, "aar_recept", X(3.6), 0, Z(5.55));
    return res;
  }


  function W(f) { return function (THREE, M, C) { return mergeOwn(THREE, f(THREE, M, C)); }; }
  return {
    seaKingHAS5: W(seaKingHAS5),
    seaKingAEW2: W(function (THREE, M, C) { return seaKingAEW(THREE, M, C, SK_PAINT.aew); }),
    seaKingASaC7: W(function (THREE, M, C) { return seaKingAEW(THREE, M, C, SK_PAINT.asac); }),
    seaHawk: W(seaHawk),
    wessexHAS1: W(wessexHAS1),
    whirlwindHAS7: W(whirlwindHAS7),
    rafaleM: W(rafaleM),
    tornadoECR: W(tornadoECR),
    phantomFG1: W(phantomFG1),
    lynxHAS2FN: W(function (T, M, C) { return navalLynx(T, M, C, Object.assign({ key: "mk4" }, LYNX_V.has2fn)); }),
    lynxMk4MLU: W(function (T, M, C) { return navalLynx(T, M, C, Object.assign({ key: "mk4mlu" }, LYNX_V.mk4mlu)); }),
    lynxMk88: W(function (T, M, C) { return navalLynx(T, M, C, Object.assign({ key: "mk88" }, LYNX_V.mk88)); }),
    lynxMk88A: W(function (T, M, C) { return navalLynx(T, M, C, Object.assign({ key: "mk88a" }, LYNX_V.mk88a)); }),
    lynxHMA8: W(function (T, M, C) { return navalLynx(T, M, C, Object.assign({ key: "hma8" }, LYNX_V.hma8)); }),
    merlinHM: W(function (T, M, C) { return merlin(T, M, C, { key: "hm" }); }),
    merlinCrowsnest: W(function (T, M, C) { return merlin(T, M, C, { key: "crowsnest", crowsnest: true }); }),
    nh90NFH: W(nh90NFH),
    skyraiderAEW1: W(skyraiderAEW1),
    seaHarrierFA2: W(seaHarrierFA2),
    a330mmf: W(function (T, M, C) { return a330mrtt(T, M, C, "mmf"); }),
    a330phenix: W(function (T, M, C) { return a330mrtt(T, M, C, "phenix"); }),
    voyager: W(function (T, M, C) { return a330mrtt(T, M, C, "voyager"); }),
    airseeker: W(airseeker),
    wedgetail: W(wedgetail),
  };
})();

/* len: the measured X extent of each build (the renderer normalises on its own measurement).
   HELD, no registration (their borrowed models stand):
     gbr_e60_cawacs  Gannet AEW.3 - one side view ("Gannet ASW and AEW comparison.png") and
                     photographs only; no plan view of the wing (double-folding) was found.
     fra_e50_cfighter Aquilon (SE.203) - "De Havilland Sea Venom FB20 3-view silhouette.jpg" and one
                     Aquilon 203 photograph: the silhouette's plan and side differ by 8 per cent in
                     scale against the published 13.06 m span and 11.15 m length, not resolved.
     ew_f            Archange (Falcon 8X) - one plan-view photograph from below ("Dassault Falcon 8X,
                     Paris Air Show 2019 (SIAE8602)"); no side view or drawing found. */
UNIT_MODELS['awacs_b'] = { len: 34.6, build: HeroEuNavalAir.wedgetail };
UNIT_MODELS['ew_b'] = { len: 42.4, build: HeroEuNavalAir.airseeker };
UNIT_MODELS['tanker_g'] = { len: 60.2, build: HeroEuNavalAir.a330mmf };
UNIT_MODELS['tanker_f'] = { len: 60.2, build: HeroEuNavalAir.a330phenix };
UNIT_MODELS['tanker_b'] = { len: 58.8, build: HeroEuNavalAir.voyager };
UNIT_MODELS['gbr_e90_cfighter'] = { len: 14.55, build: HeroEuNavalAir.seaHarrierFA2 };
UNIT_MODELS['gbr_e50_cawacs'] = { len: 11.84, build: HeroEuNavalAir.skyraiderAEW1 };
UNIT_MODELS['asw_helo_f'] = { len: 19.53, build: HeroEuNavalAir.nh90NFH };
UNIT_MODELS['fra_e00_aswhelo'] = { len: 19.53, build: HeroEuNavalAir.nh90NFH };
UNIT_MODELS['asw_helo_b'] = { len: 23.0, build: HeroEuNavalAir.merlinHM };
UNIT_MODELS['gbr_e00_aswhelo'] = { len: 23.0, build: HeroEuNavalAir.merlinHM };
UNIT_MODELS['cawacs_b'] = { len: 23.0, build: HeroEuNavalAir.merlinCrowsnest };
UNIT_MODELS['gbr_e90_aswhelo'] = { len: 15.2, build: HeroEuNavalAir.lynxHMA8 };
UNIT_MODELS['fra_e80_aswhelo'] = { len: 15.2, build: HeroEuNavalAir.lynxHAS2FN };
UNIT_MODELS['fra_e90_aswhelo'] = { len: 15.2, build: HeroEuNavalAir.lynxMk4MLU };
UNIT_MODELS['deu_e80_aswhelo'] = { len: 15.2, build: HeroEuNavalAir.lynxMk88 };
UNIT_MODELS['deu_e90_aswhelo'] = { len: 15.2, build: HeroEuNavalAir.lynxMk88A };
UNIT_MODELS['deu_e00_aswhelo'] = { len: 15.2, build: HeroEuNavalAir.lynxMk88A };
UNIT_MODELS['asw_helo_g'] = { len: 15.2, build: HeroEuNavalAir.lynxMk88A };
UNIT_MODELS['cfighter_f'] = { len: 15.27, build: HeroEuNavalAir.rafaleM };
UNIT_MODELS['fra_e00_cfighter'] = { len: 15.27, build: HeroEuNavalAir.rafaleM };
UNIT_MODELS['sead_g'] = { len: 16.72, build: HeroEuNavalAir.tornadoECR };
UNIT_MODELS['gbr_e60_cfighter'] = { len: 17.65, build: HeroEuNavalAir.phantomFG1 };
UNIT_MODELS['gbr_e60_aswhelo'] = { len: 20.037, build: HeroEuNavalAir.wessexHAS1 };
UNIT_MODELS['gbr_e50_aswhelo'] = { len: 18.955, build: HeroEuNavalAir.whirlwindHAS7 };
UNIT_MODELS['gbr_e50_cfighter'] = { len: 12.6, build: HeroEuNavalAir.seaHawk };
UNIT_MODELS['gbr_e80_aswhelo'] = { len: 22.66, build: HeroEuNavalAir.seaKingHAS5 };
UNIT_MODELS['gbr_e80_cawacs'] = { len: 22.66, build: HeroEuNavalAir.seaKingAEW2 };
UNIT_MODELS['gbr_e90_cawacs'] = { len: 22.66, build: HeroEuNavalAir.seaKingAEW2 };
UNIT_MODELS['gbr_e00_cawacs'] = { len: 22.66, build: HeroEuNavalAir.seaKingASaC7 };
