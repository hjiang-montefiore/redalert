/* ==================== js/hero/ru_kuznetsov.js ===========================
   HERO MODEL -- Project 1143.5 heavy aviation cruiser "Admiral Flota Sovetskogo
   Soyuza Kuznetsov" (ex-Tbilisi), drawn per period from photographs.
   Keys: pact_e90_carrier (the 1990s ship), pact_e00_carrier (the 2000s-2010s
   ship) and carrier_p (today's row: see VARIANTS).

   PUBLISHED FIGURES (English and Russian Wikipedia, "Admiral Kuznetsov"):
   length overall 305 m (drawn 305.0), waterline length about 270 m (drawn
   271.5: stem 125.0, stern -146.5 at z = 0), waterline beam 35 m (drawn
   35.0), flight deck beam 72 m (drawn 73.6 at the angled sponson), draught
   10.5 m (drawn), keel to masthead about 65.9 m (drawn 66.5), ski-jump 12
   degrees at the lip (drawn), 12 P-700 Granit cells under the forward
   flight deck, 8 Kashtan (CADS-N-1) modules, 6 AK-630M, two starboard
   deck-edge lifts.

   REFERENCES (Wikimedia Commons, fetched at 960 px, all read):
     D1 "World Navy Aircraft carries in scale.png" - a plan view to a common
        scale (306 m); the deck planform below is traced off it row by row
        (0.91 m a pixel): the wide blunt ski-jump end (about 25 m across),
        the parallel forward deck, the angled sponson to 38.6 m port, the
        island ON THE STARBOARD SPONSON (y -21.3 to -35, x 0 to -65), the
        forward lift at x +9..+28 and the after lift at x -73..-89 (both
        starboard deck edge), the four corner weapons sponsons (red in the
        drawing, below deck level), the angled strip's foul lines at 7.5
        degrees and its landing spots, the two ski-jump take-off runs.
     D2 "Aircraft carrier comparison enh.jpg" - outline plan, 304.5 x 72 m:
        confirms the blunt bow and the step of the angled sponson.
     P1 "HMS Liverpool Escorts Russian Carrier Admiral Kuznetsov MOD
        45153590" (UK MoD, Jan 2017, port broadside): bow overhang 28 m and
        stern overhang 6 m at the waterline, freeboard to the flight deck
        about 19 m, the island's height to the Top Plate, the funnel smoke
        rising from aft of the drum. Hull sampled 0x565657 (overcast).
     P2 "Aircraft carrier "Admiral Kuznetsov" in 1991" (USN, starboard
        side from the air): the island's long low base and its stacked
        tiers, the 1991 blue-grey (hull sampled 0x536069), dark boot-top,
        the dark openings in the starboard side at x -88, -14 and -130.
     P3 "Kuznetsov 960111-N-9085M-001" and "-002" (USN, January 1996):
        port bow from the air and the deck looking aft from the bow: the
        island's forward face (a big flat Mars-Passat face, dishes either
        side, wide gallery, the drum and the Top Plate on top), the yellow
        dash bars of the two take-off runs, the dark slate deck (sampled
        0x907869 in low sun), the deck-edge catwalks.
     P4 "Admiral Kuznetsov aircraft carrier.jpg" (mil.ru, I. Rudenko, 2010s,
        port bow): the bow's concave flare up to the rounded lip of the
        ramp, the red boot-top band, the angled sponson's rounded front,
        the 2010s deck (sampled 0x584f3c - 0x747568) with yellow lines.
     P5 "Admiral Kuznecov 20090820numbered" (2009, starboard bow, Murmansk):
        the island stack (drum, Top Plate, white domes, the flat array
        faces, the yards with ESM spikes, a pole mast), the bow flare.
     P6 "Admiral Kuznetsov in drydock 2021" (D. Gornaev): the refit - the
        deck stripped to red primer, the island in scaffolding.

   RECOGNITION LIST (what makes her at game zoom; where it shows):
     1. the ski-jump: a 12-degree ramp, its lip a broad rounded end about
        25 m wide (D1, P4) - deckZ(), EP/ES tables, the pale lip rim;
     2. the angled deck to port, 7.5 degrees, with its long sponson to
        38.6 m (D1, D2) - EP table, painted foul lines and centreline;
     3. the island far outboard on the starboard sponson, aft of midships
        (D1, P2) - x 0..-65, y -21.3..-34.6;
     4. the tall stacked island: low base, two tiers, the square tower with
        four flat Mars-Passat faces (P3, P5);
     5. the drum on top of the tower and the Top Plate (Fregat-MA) above it
        (P1, P3, P5);
     6. the big concave bow flare from a narrow stem (P4, P5) - HW/HDT/FL;
     7. the 12 Granit hatches flush in the forward deck (published; the
        layout is NOT confirmed - see below) - painted in the deck;
     8. the four corner weapons sponsons below deck level with the Kashtan
        modules in pairs (D1, P4) and the AK-630s;
     9. two deck-edge lifts on the starboard side, either side of the
        island (D1) - painted outlines;
    10. the yellow dash bars of the two ski-jump take-off runs (P3);
    11. period paint: the 1991-96 blue-grey hull and dark boot-top (P2),
        the 2000s-2010s neutral grey with a red boot-top (P4, P1).

   CORRECTED from the previous version of this file (D1, P1, P2 do not bear
   it out): the island stood inboard (y -22.8..-10.4) - it stands on the
   starboard sponson (y -21.3..-34.6); the lifts were at x -7..+11 and
   -128..-110 - they are at +9..+28 and -89..-73; the deck reached 46.4 m to
   port - 38.6 m (D1; 73.6 m deck beam against the published 72 m); the
   ski-jump end was a point - it is about 25 m across; the waterline length
   was 286 m - it is 271.5 (P1's overhangs); four Kashtans - eight.
   The model's width (78.3 m) is the island's yard, 4.6 m outboard.

   VARIANTS (drawn only where photographs show a difference):
     - pact_e90_carrier: 1991-96 - blue-grey hull, dark boot-top, white
       deck markings with the yellow take-off bars (P2, P3).
     - pact_e00_carrier: 2000s-2017 - neutral grey hull, red boot-top,
       darker olive-grey deck with yellow edge and foul lines (P4, P1).
     - carrier_p: today's row. The refit begun in 2017 (dry dock 2018-22,
       P6 shows the deck stripped and the island scaffolded) has no
       photograph of a finished, refitted ship that I could find, so she is
       drawn as last photographed in service (2016-17), identical to the
       e00 row. No refit fit (Pantsir-M or other) is drawn.
     The island, masts and sponsons look the same in the 1991, 1996, 2009
     and 2017 photographs at this scale, so the geometry is shared.

   WHAT I COULD NOT CONFIRM, and so drew plainly or not at all:
     - the Granit hatch layout: 12 flush hatches in two rows of six on the
       centre of the forward deck between the take-off runs (published:
       under the forward flight deck; no photograph fetched shows them);
     - the Kinzhal VLS hatches and the RBU-12000s (not drawn);
     - the exact Kashtan and AK-630 places on the corner sponsons (two
       Kashtans and one AK-630 a sponson, two AK-630s on the port gallery);
     - the lift sizes (19 x 14 m drawn from D1's outlines);
     - the island's smaller radars, aerials and dishes (domes and posts).
   No hull number, name, ensign, star or guards ribbon.

   NO TRAINED MOUNT: no carrier row has turret:true - nothing is named
   "turret"; every weapon is baked at rest, pointing forward.
   FLIGHT DECK: one flat top at z = 19.0 from the stern to x = +90, then the
   ski-jump (parabolic, 12 degrees at the lip, 6.6 m rise). Nothing stands on
   it: markings, lifts and hatches are painted into its texture. The island
   stands on the starboard deck edge.
   PAINT: in sRGB canvases (prepModel converts the plain colours; the
   canvases carry sRGB encoding), sampled values taken to about 0.85.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Static parts
   are merged into one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKuznetsov = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -152.5, XB = 152.5;      /* stern and the ski-jump lip              */
  var FD = 19.0;                    /* flight deck top, aft of the ramp (P1)   */
  var XR0 = 90.0;                   /* the ramp starts here                    */
  var KR = Math.tan(12 * PI / 180) / (XB - XR0);   /* 12 degrees at the lip    */
  var XD0 = -156.0, XD1 = 156.0, YD0 = -40.0, YD1 = 42.0; /* deck texture box */
  var HZ0 = -0.45, HZ1 = 27.0;      /* hull texture's z range: boot-top up     */

  /* PERIOD PAINT (sRGB, sampled and taken to ~0.85; see the header) */
  var PAINT = {
    e90: { hull: "#59656e", sup: "#5f6a72", deck: "#585a5e", boot: "#2a2f33", under: "#6a3a40",
           line: "#dddbd3", edge: "#d6d4cc", foul: "#d6d4cc", bar: "#c8a43c", seed: 1991 },
    e00: { hull: "#6a6e72", sup: "#707478", deck: "#56554f", boot: "#7c2d29", under: "#6a3a40",
           line: "#e0ded6", edge: "#c9a23a", foul: "#c9a23a", bar: "#cfa83c", seed: 2009 }
  };

  /* ------------------------------------------------ station tables (D1, P1) */
  /* waterline half-beam by station (35 m beam) */
  var HW = [[-152.5, 9.0], [-140, 14.5], [-125, 17.0], [-100, 17.5], [20, 17.5], [60, 16.6],
            [90, 14.0], [115, 9.5], [135, 4.0], [150, 0.8], [152.5, 0.0]];
  /* hull top half-width, just under the flight deck (symmetric; forward it is
     the deck edge itself - no overhang ahead of the sponsons) */
  var HDT = [[-152.5, 11.5], [-149, 15.0], [-144, 16.6], [-112, 17.4], [-90, 20.0], [-60, 22.5],
             [40, 22.5], [58, 19.5], [70, 17.2], [88, 16.7], [105, 14.9], [130, 13.3], [146, 12.8],
             [150.5, 11.9], [152.5, 9.4]];
  var KZ = [[-152.5, -2.5], [-135, -6.5], [-110, -9.5], [-80, -10.5], [60, -10.5], [100, -8.5],
            [118, -6.0], [152.5, -3.0]];
  var BP = [[-152.5, 1.6], [-110, 2.6], [-60, 3.2], [60, 3.2], [100, 2.0], [152.5, 1.2]];
  /* flare exponent: > 1 is the concave flare that opens out near the deck (P4) */
  var FL = [[-152.5, 1.5], [-60, 1.8], [0, 1.7], [60, 1.8], [100, 2.1], [152.5, 2.3]];
  /* flight deck edges, port and starboard magnitudes, traced off D1 */
  var EP = [[-152.5, 12.5], [-151, 15.5], [-147.5, 18.0], [-144, 17.2], [-112, 17.7], [-108, 24.0],
            [-104, 33.5], [-100, 35.0], [-72, 35.0], [-69.5, 31.5], [-24, 31.5], [-21, 35.0],
            [14, 35.0], [20, 36.5], [34, 37.0], [38, 38.6], [47, 38.6], [52, 35.5], [56, 30.0],
            [59, 23.0], [61, 17.6], [70, 17.3], [88, 16.8], [105, 15.0], [130, 13.4], [146, 12.9],
            [150.5, 12.0], [152.5, 9.5]];
  var ES = [[-152.5, 12.5], [-151, 15.5], [-147.5, 21.5], [-144, 24.5], [-118, 24.5], [-113, 30.5],
            [-104, 33.5], [-72, 34.0], [-62, 35.0], [5, 35.0], [9, 33.2], [38, 33.0], [42, 30.4],
            [50, 24.0], [58, 22.5], [62, 19.4], [80, 18.4], [88, 17.0], [105, 15.9], [130, 14.1],
            [146, 13.5], [150.5, 12.3], [152.5, 9.5]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  function deckZ(x) {
    if (x <= XR0) return FD;
    var d = Math.min(x, XB) - XR0; return FD + 0.5 * KR * d * d;
  }
  var ZLIP = deckZ(XB) - 0.9;       /* the hull's top at the lip               */
  /* stem: raked, 28 m of overhang above the waterline (P1), forefoot below */
  function xStemAt(z) {
    if (z >= 0) return 125.0 + 27.5 * Math.pow(Math.min(1, z / ZLIP), 0.85);
    return 125.0 - 10.0 * Math.pow(Math.min(1, -z / 10.5), 1.5);
  }
  function xSternAt(z) {
    if (z >= 0) return -146.5 - 6.0 * Math.min(1, z / (FD - 0.9));
    return -146.5 + 12.0 * Math.pow(Math.min(1, -z / 10.5), 1.6);
  }
  function xAt(xn, z) {
    var u = (xn - XS) / (XB - XS), a = xSternAt(z), b = xStemAt(z);
    return a + u * (b - a);
  }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HDT, xn), zr = deckZ(xn) - 0.9;
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }
  function edgeP(x) { return tab(EP, x); }
  function edgeS(x) { return tab(ES, x); }
  /* the angled strip: its centreline and foul lines (D1, 7.5 degrees) */
  function axisA(x) { return 6.8 + 0.132 * (x + 61.8); }

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); }
    else t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }
  /* plain plate in a period colour, seams and a little weathering (island, rims) */
  function plateTex(THREE, col, seed) {
    var key = "s" + col + seed;
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(seed + 7), i;
    g.fillStyle = col; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 4; i++) {
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
    }
    g.globalAlpha = 0.07;
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 12 + R() * 50, 8 + R() * 30);
    }
    g.globalAlpha = 0.10; g.fillStyle = "#2a2018";
    for (i = 0; i < 18; i++) g.fillRect(R() * W, R() * H, 2, 20 + R() * 40);
    g.globalAlpha = 1;
    return (TEX[key] = finish(THREE, cv, [1, 1]));
  }
  /* the hull sides above the boot-top's lower edge, one canvas along her length: boot-top,
     plating seams, the scuttle rows, the round ports forward and the dark
     openings P2 shows in her starboard side. The canvas's top half is the
     starboard side, its lower half the port side. */
  function hullTex(THREE, P) {
    var key = "h" + P.seed;
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 512, HH = H / 2, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(P.seed), i, x, s;
    var px = function (X) { return (X - XS) / (XB - XS) * W; };
    var pz = function (Z, half) { return (half ? 0 : HH) + (1 - (Z - HZ0) / (HZ1 - HZ0)) * HH; };
    var mz = HH / (HZ1 - HZ0), mx = W / (XB - XS);
    for (s = 0; s < 2; s++) {
      var top = s === 0;              /* true: starboard (canvas top half) */
      g.fillStyle = P.hull; g.fillRect(0, pz(HZ1, top), W, pz(0.6, top) - pz(HZ1, top));
      g.fillStyle = P.boot; g.fillRect(0, pz(0.6, top), W, pz(HZ0, top) - pz(0.6, top) + 1);
      g.globalAlpha = 0.13; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (x = -150; x < 152; x += 8.5) { g.beginPath(); g.moveTo(px(x), pz(26, top)); g.lineTo(px(x), pz(0.6, top)); g.stroke(); }
      [3.2, 6.6, 10.4, 15.6, 18.2].forEach(function (zz) {
        g.beginPath(); g.moveTo(0, pz(zz, top)); g.lineTo(W, pz(zz, top)); g.stroke();
      });
      g.globalAlpha = 0.08;
      for (i = 0; i < 70; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * W, pz(4 + R() * 20, top), 20 + R() * 90, 3 + R() * 10);
      }
      g.globalAlpha = 0.16; g.fillStyle = "#3a2a20";
      for (i = 0; i < 50; i++) g.fillRect(R() * W, pz(16 - R() * 8, top), 1.5, 6 + R() * 14);
      g.globalAlpha = 1;
      /* scuttles: two rows, 5 m apart (P2, P4) */
      g.fillStyle = "#16191c";
      for (x = -140; x <= 92; x += 5) {
        g.fillRect(px(x) - 0.2 * mx, pz(13.2, top), 0.42 * mx, 0.36 * mz);
        g.fillRect(px(x + 2.5) - 0.2 * mx, pz(9.8, top), 0.42 * mx, 0.36 * mz);
      }
      /* round ports in the bow flare (P4, P5) */
      for (i = 0; i < 6; i++) {
        var xp = 98 + i * 3.4, zp = 12.0 + (i % 2) * 2.4;
        g.beginPath(); g.arc(px(xp), pz(zp, top), 0.32 * mz, 0, PI * 2); g.fill();
      }
      /* the dark openings P2 shows in the starboard side */
      if (top) [[-92, -84, 12.0, 16.0], [-21, -8, 12.4, 16.2], [-134, -127, 11.5, 15.0]].forEach(function (q) {
        g.fillStyle = "#121416"; g.fillRect(px(q[0]), pz(q[3], true), (q[1] - q[0]) * mx, (q[3] - q[2]) * mz);
      });
    }
    return (TEX[key] = finish(THREE, cv));
  }
  /* the flight deck in plan: weathered plating and P3/P4's markings - the
     angled strip's foul lines, dashed centreline and spots, the wires, the
     yellow dash bars of the two take-off runs, the gas deflectors at their
     starts, the lift outlines, the twelve Granit hatches; no numbers or text */
  function deckTex(THREE, P) {
    var key = "d" + P.seed;
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 540, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(P.seed + 31), i, x;
    var sx = W / (XD1 - XD0), sy = H / (YD1 - YD0);
    var px = function (X) { return (X - XD0) * sx; };
    var py = function (Y) { return (1 - (Y - YD0) / (YD1 - YD0)) * H; };
    g.fillStyle = P.deck; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (x = -150; x < 156; x += 6) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
    for (x = -38; x < 42; x += 3) { g.beginPath(); g.moveTo(0, py(x)); g.lineTo(W, py(x)); g.stroke(); }
    g.globalAlpha = 0.08;
    for (i = 0; i < 300; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#c8bcb4";
      g.fillRect(R() * W, R() * H, 10 + R() * 60, 4 + R() * 16);
    }
    /* tyre and exhaust wear along the landing strip */
    g.globalAlpha = 0.13; g.fillStyle = "#1a1a1a";
    for (i = 0; i < 70; i++) {
      var wx = -140 + R() * 120, wy = axisA(wx) + (R() - 0.5) * 8;
      g.save(); g.translate(px(wx), py(wy)); g.rotate(-0.131);
      g.fillRect(0, -1, (8 + R() * 22) * sx, 1.2 + R() * 2.5); g.restore();
    }
    g.globalAlpha = 1;
    var seg = function (col, x0, y0, x1, y1, w) {
      g.strokeStyle = col; g.lineWidth = w * sx; g.beginPath(); g.moveTo(px(x0), py(y0)); g.lineTo(px(x1), py(y1)); g.stroke();
    };
    /* lifts: forward x +9..+28, after x -89..-73 (D1), a tone and an outline */
    [[9.0, 28.0], [-89.0, -73.0]].forEach(function (q) {
      g.fillStyle = "rgba(0,0,0,0.12)"; g.fillRect(px(q[0]), py(-20.0), (q[1] - q[0]) * sx, 14.5 * sy);
      seg(P.line, q[0], -20.0, q[1], -20.0, 0.3); seg(P.line, q[0], -20.0, q[0], -34.5, 0.3);
      seg(P.line, q[1], -20.0, q[1], -34.5, 0.3);
    });
    /* the angled strip: foul lines, dashed centreline, wires */
    seg(P.foul, -146, axisA(-146) - 14.5, 44, axisA(44) - 14.5, 0.45);
    seg(P.foul, -146, axisA(-146) + 14.5, -2, axisA(-2) + 14.5, 0.45);
    for (x = -146; x < 52; x += 7) seg(P.line, x, axisA(x), x + 4.2, axisA(x + 4.2), 0.5);
    for (i = 0; i < 4; i++) {
      var ax = -112 + i * 9.0;
      seg(P.line, ax, axisA(ax) - 12.5, ax + 1.6, axisA(ax) + 12.5, 0.14);
    }
    /* landing spots off D1 */
    [[82.6, 4.5], [54.4, 4.5], [42.8, 19.3], [19.0, 19.3], [-8.2, 13.6], [-40.9, 13.6], [-137.6, 3.4]].forEach(function (c) {
      g.strokeStyle = P.line; g.lineWidth = 0.4 * sx;
      g.beginPath(); g.ellipse(px(c[0]), py(c[1]), 3.6 * sx, 3.6 * sy, 0, 0, PI * 2); g.stroke();
      seg(P.line, c[0] - 2.4, c[1], c[0] + 2.4, c[1], 0.35);
    });
    /* the two take-off runs to the lip: yellow dash bars (P3) */
    [[38.4, -15.2], [40.2, 6.1]].forEach(function (s0) {
      var x1 = 150.0, y1 = -1.0, L = Math.sqrt((x1 - s0[0]) * (x1 - s0[0]) + (y1 - s0[1]) * (y1 - s0[1]));
      var ang = Math.atan2(y1 - s0[1], x1 - s0[0]), t;
      for (t = 2; t < L - 2; t += 7.0) {
        var cx = s0[0] + Math.cos(ang) * t, cy = s0[1] + Math.sin(ang) * t;
        g.save(); g.translate(px(cx), py(cy)); g.rotate(-ang);
        g.fillStyle = P.bar; g.fillRect(-2.2 * sx, -0.9 * sy, 4.4 * sx, 1.8 * sy); g.restore();
      }
      /* the gas deflector at the run's start */
      g.save(); g.translate(px(s0[0] - 4.0), py(s0[1])); g.rotate(-ang);
      g.fillStyle = "#2e2f31"; g.fillRect(-1.6 * sx, -4.5 * sy, 3.2 * sx, 9.0 * sy);
      g.strokeStyle = P.line; g.lineWidth = 0.2 * sx; g.strokeRect(-1.6 * sx, -4.5 * sy, 3.2 * sx, 9.0 * sy);
      g.restore();
    });
    /* Granit: twelve flush hatches, two rows of six (layout not confirmed) */
    for (i = 0; i < 6; i++) [-6.0, -1.8].forEach(function (yc) {
      var xc = 48 + i * 7.2;
      g.fillStyle = "#38383a"; g.fillRect(px(xc - 2.7), py(yc + 1.7), 5.4 * sx, 3.4 * sy);
      g.strokeStyle = "#9c9890"; g.lineWidth = 0.18 * sx;
      g.strokeRect(px(xc - 2.7), py(yc + 1.7), 5.4 * sx, 3.4 * sy);
    });
    /* deck-edge line, inset 1 m, and a dashed ramp centreline */
    g.strokeStyle = P.edge; g.lineWidth = 0.3 * sx; g.beginPath();
    for (x = -151; x <= 151; x += 1) { var yy = edgeP(x) - 1.0; if (x === -151) g.moveTo(px(x), py(yy)); else g.lineTo(px(x), py(yy)); }
    g.stroke(); g.beginPath();
    for (x = -151; x <= 151; x += 1) { var ys = -edgeS(x) + 1.0; if (x === -151) g.moveTo(px(x), py(ys)); else g.lineTo(px(x), py(ys)); }
    g.stroke();
    for (x = 92; x < 150; x += 6) seg(P.line, x, -1.0, x + 3.0, -1.0, 0.3);
    return (TEX[key] = finish(THREE, cv));
  }

  function makeMats(THREE, C, P) {
    var team = (C && C.team) || 0x3f7fd0;
    var tex = function (map, r) { return new THREE.MeshStandardMaterial({ color: 0xffffff, map: map, roughness: r, metalness: 0.06 }); };
    var flat = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      hull:  tex(hullTex(THREE, P), 0.88),
      sup:   tex(plateTex(THREE, P.sup, P.seed), 0.86),
      under: tex(plateTex(THREE, P.under, 5), 0.9),
      fdeck: tex(deckTex(THREE, P), 0.94),
      dark:  flat(0x1a1d20, 0.9, 0.05),
      metal: flat(0x5d666d, 0.55, 0.5),
      white: flat(0xd3d7d9, 0.62, 0.04),
      team:  flat(team, 0.8, 0.08),
      glass: new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0,
                                              transparent: true, opacity: 0.88 })
    };
  }
  /* ------------------------------------------------------------ helpers */
  function geoMesh(THREE, pos, idx, uv, m) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (ry) b.rotation.z = ry; p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1); g.rotateZ(-PI / 2);
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
  function sphere(THREE, p, m, r, x, y, z, half) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 12, half ? 5 : 8, 0, PI * 2, 0, half ? PI / 2 : PI), m);
    if (half) s.rotation.x = PI / 2;
    s.position.set(x, y, z); p.add(s); return s;
  }
  /* A mesh from points and triangles whose faces are turned to face want(centroid) */
  function orient(THREE, pos, idx, uv, m, want) {
    var i, a, b, c, ux, uy, uz, vx, vy, vz, nx, ny, nz, w, t;
    for (i = 0; i < idx.length; i += 3) {
      a = idx[i] * 3; b = idx[i + 1] * 3; c = idx[i + 2] * 3;
      ux = pos[b] - pos[a]; uy = pos[b + 1] - pos[a + 1]; uz = pos[b + 2] - pos[a + 2];
      vx = pos[c] - pos[a]; vy = pos[c + 1] - pos[a + 1]; vz = pos[c + 2] - pos[a + 2];
      nx = uy * vz - uz * vy; ny = uz * vx - ux * vz; nz = ux * vy - uy * vx;
      w = want((pos[a] + pos[b] + pos[c]) / 3, (pos[a + 1] + pos[b + 1] + pos[c + 1]) / 3, (pos[a + 2] + pos[b + 2] + pos[c + 2]) / 3);
      if (nx * w[0] + ny * w[1] + nz * w[2] < 0) { t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  function ruled(THREE, A, B, m, want, uvf) {
    var pos = [], uv = [], idx = [], i;
    for (i = 0; i < A.length; i++) {
      pos.push(A[i][0], A[i][1], A[i][2], B[i][0], B[i][1], B[i][2]);
      uv.push.apply(uv, uvf(A[i], B[i]));
    }
    for (i = 0; i < A.length - 1; i++) { var a = 2 * i; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    return orient(THREE, pos, idx, uv, m, want);
  }
  /* a closed prism: plan polygon pts (counter-clockwise from above) from z0 to
     z1, the top polygon scaled about its centroid by st (a tapered tier) */
  function prism(THREE, p, m, pts, z0, z1, st, nobot) {
    var n = pts.length, cx = 0, cy = 0, i, pos = [], uv = [], idx = [];
    pts.forEach(function (q) { cx += q[0] / n; cy += q[1] / n; });
    var tp = pts.map(function (q) { return [cx + (q[0] - cx) * (st || 1), cy + (q[1] - cy) * (st || 1)]; });
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n, b = pos.length / 3, a = pts[i], c = pts[j], A = tp[i], Cq = tp[j];
      var L = Math.sqrt((c[0] - a[0]) * (c[0] - a[0]) + (c[1] - a[1]) * (c[1] - a[1]));
      pos.push(a[0], a[1], z0, c[0], c[1], z0, Cq[0], Cq[1], z1, A[0], A[1], z1);
      uv.push(0, z0 * 0.12, L * 0.12, z0 * 0.12, L * 0.12, z1 * 0.12, 0, z1 * 0.12);
      idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
    }
    var tb = pos.length / 3;
    tp.forEach(function (q) { pos.push(q[0], q[1], z1); uv.push(q[0] * 0.12, q[1] * 0.12); });
    for (i = 1; i < n - 1; i++) idx.push(tb, tb + i, tb + i + 1);
    if (!nobot) {
      var bb = pos.length / 3;
      pts.forEach(function (q) { pos.push(q[0], q[1], z0); uv.push(q[0] * 0.12, q[1] * 0.12); });
      for (i = 1; i < n - 1; i++) idx.push(bb, bb + i + 1, bb + i);
    }
    var mm = geoMesh(THREE, pos, idx, uv, m); p.add(mm); return mm;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  /* a rectangle with its corners cut by c (an octagon in plan) */
  function chamf(x0, x1, y0, y1, c) {
    return [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]];
  }
  function blk(THREE, p, m, x0, x1, y0, y1, z0, z1, nobot) { return prism(THREE, p, m, rect(x0, x1, y0, y1), z0, z1, 1, nobot); }

  /* --------------------------------------------------------------- hull */
  function hullUV(x, z, port) {
    var vv = Math.max(0.01, Math.min(0.99, (z - HZ0) / (HZ1 - HZ0)));
    return [(x - XS) / (XB - XS), port ? 0.5 * vv : 0.5 + 0.5 * vv];
  }
  var PLAIN = function (x, port) { return hullUV(x, 22.0, port); };
  function hullStrip(THREE, m, xs, zA, zB, F) {
    var pos = [], uv = [], idx = [], n = F.length, i, j, s, xn, z, base;
    for (s = 0; s < 2; s++) {
      var sg = s === 0 ? 1 : -1;
      base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        xn = xs[i];
        var a = zA(xn), b = zB(xn);
        for (j = 0; j < n; j++) {
          z = a + (b - a) * F[j];
          var xx = xAt(xn, z);
          pos.push(xx, sg * sideY(xn, z), z);
          uv.push.apply(uv, hullUV(xx, z, sg > 0));
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n - 1; j++) {
        var A = base + i * n + j, B = A + 1, Cc = A + n, D = Cc + 1;
        if (sg > 0) idx.push(A, B, Cc, B, D, Cc); else idx.push(A, Cc, B, B, Cc, D);
      }
    }
    /* the transom: a plate across the first station */
    xn = xs[0]; base = pos.length / 3;
    var a0 = zA(xn), b0 = zB(xn);
    for (j = 0; j < n; j++) {
      z = a0 + (b0 - a0) * F[j]; var y = sideY(xn, z), xq = xAt(xn, z);
      pos.push(xq, y, z, xq, -y, z); uv.push.apply(uv, PLAIN(xq, true)); uv.push.apply(uv, PLAIN(xq, false));
    }
    for (j = 0; j < n - 1; j++) {
      var P0 = base + 2 * j, S0 = P0 + 1, P1 = P0 + 2, S1 = P0 + 3;
      if (j === 0 && Math.abs(pos[P0 * 3 + 1]) < 1e-6) idx.push(S0, S1, P1);
      else idx.push(P0, S0, P1, S0, S1, P1);
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  /* rows: keel to the boot-top's lower edge (anti-fouling), and from there to
     the hull top, dense where the flare opens out */
  var FU = [0, 0.06, 0.16, 0.30, 0.48, 0.68, 0.86, 1.0];
  var FH = [0, 0.04, 0.10, 0.20, 0.33, 0.48, 0.63, 0.77, 0.88, 0.95, 1.0];

  /* the flight deck: its top over D1's planform, the rim, the soffits under
     the overhangs and the angled sponson, the deck-edge catwalks forward */
  function flightDeck(THREE, g, T) {
    var xs = [], i, j, x;
    for (x = XS; x < XR0; x += 4) xs.push(x);
    for (x = XR0; x < XB - 0.1; x += 2.5) xs.push(x);
    EP.concat(ES).forEach(function (q) { xs.push(q[0]); });
    xs.push(XB);
    xs.sort(function (p, q) { return p - q; });
    for (i = xs.length - 1; i > 0; i--) if (xs[i] - xs[i - 1] < 0.4) xs.splice(i, 1);
    var NJ = 6, pos = [], uv = [], idx = [];
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], yp = edgeP(xn), ys = -edgeS(xn), zz = deckZ(xn);
      for (j = 0; j <= NJ; j++) {
        var yv = yp + (ys - yp) * j / NJ;
        pos.push(xn, yv, zz);
        uv.push((xn - XD0) / (XD1 - XD0), (yv - YD0) / (YD1 - YD0));
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NJ; j++) {
      var a = i * (NJ + 1) + j, b = a + 1, c = a + NJ + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    g.add(orient(THREE, pos, idx, uv, T.fdeck, function () { return [0, 0, 1]; }));

    /* rim: a pale band 0.9 m deep round the outline (the ramp's lip, P4) */
    var Ptop = [], Pbot = [], Stop = [], Sbot = [];
    xs.forEach(function (xn) {
      var zz = deckZ(xn);
      Ptop.push([xn, edgeP(xn), zz]); Pbot.push([xn, edgeP(xn), zz - 0.9]);
      Stop.push([xn, -edgeS(xn), zz]); Sbot.push([xn, -edgeS(xn), zz - 0.9]);
    });
    var uvr = function (a) { return [a[0] / 6, a[2] / 6, a[0] / 6, a[2] / 6 - 0.15]; };
    g.add(ruled(THREE, Ptop, Pbot, T.sup, function () { return [0, 1, 0]; }, uvr));
    g.add(ruled(THREE, Stop, Sbot, T.sup, function () { return [0, -1, 0]; }, uvr));
    var e0 = [XS, edgeP(XS), FD], e1 = [XS, -edgeS(XS), FD];
    g.add(ruled(THREE, [e0, e1], [[XS, e0[1], FD - 0.9], [XS, e1[1], FD - 0.9]], T.sup,
                function () { return [-1, 0, 0]; }, function (a) { return [a[1] / 6, 0, a[1] / 6, 0.15]; }));
    var l0 = [XB, edgeP(XB), deckZ(XB)], l1 = [XB, -edgeS(XB), deckZ(XB)];
    g.add(ruled(THREE, [l0, l1], [[XB, l0[1], l0[2] - 0.9], [XB, l1[1], l1[2] - 0.9]], T.sup,
                function () { return [1, 0, 0]; }, function (a) { return [a[1] / 6, 0, a[1] / 6, 0.15]; }));

    /* the sponsons where the deck overhangs: an upright outer wall from the
       deck edge down (P2: the side stays upright under the island, with its
       openings), then an underside back to the hull */
    [1, -1].forEach(function (sg) {
      var top = [], wall = [], hull = [];
      xs.forEach(function (xn) {
        var e = sg > 0 ? edgeP(xn) : edgeS(xn), over = Math.max(0, e - tab(HDT, xn));
        var zo = deckZ(xn) - 0.9, zw = zo - Math.min(6.5, 0.55 * over);
        var za = Math.max(5.5, zw - Math.min(3.5, 0.3 * over));
        top.push([xn, sg * e, zo]); wall.push([xn, sg * e, zw]);
        hull.push([xAt(xn, za), sg * sideY(xn, za), za]);
      });
      g.add(ruled(THREE, top, wall, T.hull, function () { return [0, sg, 0]; },
                  function (a, b) { return hullUV(a[0], a[2], sg > 0).concat(hullUV(b[0], b[2], sg > 0)); }));
      g.add(ruled(THREE, wall, hull, T.hull, function () { return [0, sg * 0.4, -1]; },
                  function (a, b) { return PLAIN(a[0], sg > 0).concat(PLAIN(b[0], sg > 0)); }));
    });
    /* braces under the angled sponson and the island sponson */
    for (x = -100; x <= 50; x += 7) [1, -1].forEach(function (sg) {
      var e = sg > 0 ? edgeP(x) : edgeS(x), over = e - tab(HDT, x);
      if (over < 6) return;
      var zw = FD - 0.9 - Math.min(6.5, 0.55 * over), za = Math.max(5.5, zw - Math.min(3.5, 0.3 * over));
      strut(THREE, g, T.metal, xAt(x, za), sg * (sideY(x, za) + 0.2), za + 0.3, x, sg * (e - 0.5), zw - 0.1, 0.22, 5);
    });
    /* deck-edge catwalks along the forward deck, 1.2 m under the edge (P3) */
    [1, -1].forEach(function (sg) {
      var A = [], B = [];
      for (x = 88; x <= 146; x += 4) {
        var e = sg > 0 ? edgeP(x) : edgeS(x), zc = deckZ(x) - 1.3;
        A.push([x, sg * (e - 0.1), zc]); B.push([x, sg * (e + 1.4), zc]);
      }
      g.add(ruled(THREE, A, B, T.metal, function () { return [0, 0, 1]; }, function (a) { return [0, 0, 0.2, 0.2]; }));
      for (var k = 0; k < A.length; k++) strut(THREE, g, T.metal, B[k][0], B[k][1], B[k][2], B[k][0], B[k][1], B[k][2] + 1.0, 0.04, 3);
    });
  }

  /* Kashtan (CADS-N-1) combat module: the base drum, the turning body with
     the radar/optics head, the two six-barrel 30 mm guns, a missile pack of
     four over each gun - barrels forward */
  function kashtan(THREE, g, T) {
    cylZ(THREE, g, 1.6, 1.75, 0.8, 12, T.sup, 0, 0, 0.4);
    prism(THREE, g, T.sup, chamf(-1.3, 1.2, -1.1, 1.1, 0.35), 0.8, 2.2, 0.9);
    blk(THREE, g, T.sup, -0.8, 0.5, -0.6, 0.6, 2.2, 3.0, true);
    box(THREE, g, 0.1, 0.9, 0.5, T.dark, 0.55, 0, 2.6);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.30, 0.30, 2.0, 8, T.metal, 1.5, s * 1.35, 1.35);
      cylX(THREE, g, 0.16, 0.16, 0.6, 6, T.dark, 2.8, s * 1.35, 1.35);
      box(THREE, g, 2.2, 0.75, 0.75, T.sup, 0.2, s * 1.45, 2.15);
      box(THREE, g, 0.06, 0.6, 0.6, T.dark, 1.32, s * 1.45, 2.15);
    }
  }
  /* AK-630M: the low drum turret with a rounded top, one six-barrel 30 mm gun */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 1.05, 1.15, 0.5, 12, T.sup, 0, 0, 0.25);
    cylZ(THREE, g, 0.95, 1.05, 0.8, 12, T.sup, 0, 0, 0.9);
    var d = sphere(THREE, g, T.sup, 0.95, 0, 0, 1.3, true); d.scale.set(1, 0.6, 1);
    cylX(THREE, g, 0.17, 0.17, 1.7, 8, T.metal, 1.6, 0, 1.0);
  }
  /* a dish on a short post, facing forward */
  function dish(THREE, g, T, x, y, z, r, face) {
    var dg = new THREE.CylinderGeometry(r, r * 0.3, 0.4, 12, 1); dg.rotateZ(-PI / 2);
    var dm = new THREE.Mesh(dg, T.white); dm.position.set(x, y, z); dm.rotation.z = face || 0; g.add(dm);
    strut(THREE, g, T.metal, x - 0.6 * Math.cos(face || 0), y - 0.6 * Math.sin(face || 0), z, x, y, z, 0.12, 5);
  }
  /* a Mars-Passat face: a flat octagonal array on its frame, tilted back */
  function marsFace(THREE, g, T, x, y, z, nx, ny) {
    var f = new THREE.CylinderGeometry(3.2, 3.2, 0.35, 8, 1);
    f.rotateY(PI / 8);
    var mm = new THREE.Mesh(f, T.sup), mi = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.75, 0.2, 8, 1).rotateY(PI / 8), T.metal);
    /* the cylinder's axis (local Y) is turned to the face normal, leaning 12 degrees up */
    var n = new THREE.Vector3(nx, ny, 0.21).normalize();
    mm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
    mi.quaternion.copy(mm.quaternion);
    mm.position.set(x, y, z); mi.position.set(x + nx * 0.2, y + ny * 0.2, z + 0.04);
    g.add(mm); g.add(mi);
  }

  function build(THREE, M, C, era) {
    var P = PAINT[era] || PAINT.e00;
    var g = new THREE.Group();
    var T = makeMats(THREE, C, P);
    var s, i, x;

    /* ---------------- hull: lofted from the station tables, top under the deck */
    var mainXs = [-152.5, -150, -147, -143, -138, -132, -124, -114, -102, -88, -72, -56, -40, -24, -8, 8, 24, 40,
                  52, 62, 72, 82, 90, 98, 106, 114, 121, 127, 132, 137, 141, 145, 148.5, 151, 152.5];
    var kz = function (xn) { return tab(KZ, xn); };
    g.add(hullStrip(THREE, T.under, mainXs, kz, function () { return HZ0; }, FU));
    g.add(hullStrip(THREE, T.hull, mainXs, function () { return HZ0; }, function (xn) { return deckZ(xn) - 0.9; }, FH));
    /* the stem: a narrow plate across the last station */
    var bp = [], bs = [], zz;
    for (i = 0; i <= 10; i++) {
      zz = HZ0 + (ZLIP - HZ0) * i / 10;
      bp.push([xAt(XB, zz), sideY(XB, zz), zz]); bs.push([xAt(XB, zz), -sideY(XB, zz), zz]);
    }
    g.add(ruled(THREE, bp, bs, T.hull, function () { return [1, 0, 0]; }, function (a) { return hullUV(a[0], a[2], true).concat(hullUV(a[0], a[2], false)); }));
    flightDeck(THREE, g, T);
    /* hawse pipes high in the bow flare (P4, P5) */
    for (s = -1; s <= 1; s += 2) {
      var hz = 9.0, hx = xAt(122, hz), hy = s * (sideY(122, hz) + 0.05);
      var ha = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.3, 12), T.dark);
      ha.position.set(hx, hy, hz); g.add(ha);
    }

    /* ---------------- the island, on the starboard sponson (D1: x 0..-65, y -21.3..-35) */
    var YO = -34.6, YN = -21.3;
    blk(THREE, g, T.sup, -65.0, 0.0, YO, YN, FD, FD + 6.0, true);            /* the long low base (P2) */
    /* the tower spans x -48..-28 under the drum at -38 (D1's drum oval -33..-47, P2 -38) */
    blk(THREE, g, T.sup, -63.0, -3.0, YO + 0.4, YN - 0.7, FD + 6.0, FD + 11.5, true);
    prism(THREE, g, T.sup, chamf(-58.0, -9.0, YO + 0.8, YN - 1.3, 1.5), FD + 11.5, FD + 16.0, 1, true); /* bridge tier */
    prism(THREE, g, T.sup, chamf(-48.0, -28.0, YO + 1.2, YN - 1.6, 1.6), FD + 16.0, FD + 25.5, 0.97, true); /* the tower */
    /* galleries round the base, the second tier and the bridge (P3: wide) */
    [[-66.0, 1.0, FD + 6.0, YO - 0.2, YN + 1.0], [-64.2, -1.8, FD + 11.5, YO - 0.2, YN + 1.4],
     [-59.5, -7.5, FD + 16.0, YO + 0.2, YN + 0.6]].forEach(function (q) {
      blk(THREE, g, T.sup, q[0], q[1], q[3], q[4], q[2] - 0.3, q[2]);
      var p2;
      for (p2 = q[0] + 0.3; p2 <= q[1] - 0.2; p2 += 2.6) {
        strut(THREE, g, T.metal, p2, q[4] - 0.1, q[2], p2, q[4] - 0.1, q[2] + 1.05, 0.035, 3);
        strut(THREE, g, T.metal, p2, q[3] + 0.1, q[2], p2, q[3] + 0.1, q[2] + 1.05, 0.035, 3);
      }
      strut(THREE, g, T.metal, q[0] + 0.3, q[4] - 0.1, q[2] + 1.05, q[1] - 0.2, q[4] - 0.1, q[2] + 1.05, 0.03, 3);
      strut(THREE, g, T.metal, q[0] + 0.3, q[3] + 0.1, q[2] + 1.05, q[1] - 0.2, q[3] + 0.1, q[2] + 1.05, 0.03, 3);
    });
    /* bridge wings, port side of the bridge (over the deck) and outboard */
    blk(THREE, g, T.sup, -15.0, -9.5, YN - 1.3, YN + 2.2, FD + 14.6, FD + 15.2);
    blk(THREE, g, T.sup, -15.0, -9.5, YO - 1.8, YO + 0.8, FD + 14.6, FD + 15.2);
    /* windows: the bridge band round the forward face, the tiers' rows */
    box(THREE, g, 0.12, (YN - 1.3) - (YO + 0.8) - 3.2, 1.1, T.glass, -8.95, (YO + YN) / 2 - 0.25, FD + 14.8);
    for (i = 0; i < 4; i++) {
      box(THREE, g, 0.1, 1.6, 0.9, T.dark, -2.95, YO + 2.4 + i * 2.6, FD + 8.6);   /* tier 2 forward face */
      box(THREE, g, 0.1, 1.6, 0.9, T.dark, 0.05, YO + 2.4 + i * 2.6, FD + 4.2);    /* base forward face   */
    }
    for (x = -58; x < -8; x += 3.2) {
      box(THREE, g, 1.3, 0.1, 0.8, T.dark, x, YN - 0.65, FD + 8.8);
      box(THREE, g, 1.3, 0.1, 0.8, T.dark, x, YO + 0.35, FD + 8.8);
    }
    for (x = -50; x < -16; x += 3.0) box(THREE, g, 1.3, 0.1, 0.8, T.dark, x, YN - 1.25, FD + 13.4);
    for (i = 0; i < 3; i++) box(THREE, g, 0.1, 2.4, 3.0, T.dark, 0.05, YN - 2.6 - i * 4.0, FD + 1.6);   /* doors in the base's forward face */
    /* the four Mars-Passat faces on the tower: fore, aft, inboard, outboard (P3, P5) */
    var TY = (YO + 1.2 + YN - 1.6) / 2;
    marsFace(THREE, g, T, -27.9, TY, FD + 21.0, 1, 0);
    marsFace(THREE, g, T, -48.1, TY, FD + 21.0, -1, 0);
    marsFace(THREE, g, T, -38.0, YN - 1.5, FD + 21.0, 0, 1);
    marsFace(THREE, g, T, -38.0, YO + 1.1, FD + 21.0, 0, -1);
    /* the drum on the tower roof and the Top Plate (Fregat-MA) above it */
    cylZ(THREE, g, 4.0, 4.0, 6.0, 20, T.sup, -38.0, TY, FD + 28.5);
    cylZ(THREE, g, 4.15, 4.15, 0.35, 20, T.metal, -38.0, TY, FD + 31.6);
    cylZ(THREE, g, 4.15, 4.15, 0.35, 20, T.metal, -38.0, TY, FD + 25.7);
    cylZ(THREE, g, 0.7, 0.9, 1.6, 8, T.metal, -38.0, TY, FD + 32.6);
    blk(THREE, g, T.metal, -38.7, -37.3, TY - 2.5, TY + 2.5, FD + 33.4, FD + 36.4);
    for (i = -2; i <= 2; i++) box(THREE, g, 1.5, 0.08, 2.9, T.dark, -38.0, TY + i * 1.0, FD + 34.9);
    strut(THREE, g, T.metal, -38.0, TY, FD + 36.4, -38.0, TY, FD + 37.0, 0.08, 4);
    /* the funnel uptake at the tower's after face, a dark cap (P1's smoke) */
    prism(THREE, g, T.sup, chamf(-54.5, -47.6, YO + 2.6, YN - 2.8, 1.2), FD + 16.0, FD + 26.0, 0.92, true);
    blk(THREE, g, T.dark, -54.0, -48.1, YO + 3.1, YN - 3.3, FD + 26.0, FD + 26.4, true);
    /* the yards across the tower with their ESM spikes (P3, P5 '9') */
    strut(THREE, g, T.metal, -36.0, YO - 5.0, FD + 24.5, -36.0, YN + 4.5, FD + 24.5, 0.14, 5);
    [YO - 5.0, YO - 3.0, YN + 2.5, YN + 4.5].forEach(function (yy) {
      strut(THREE, g, T.metal, -36.0, yy, FD + 24.5, -36.0, yy, FD + 26.2, 0.05, 3);
      strut(THREE, g, T.metal, -36.0, yy, FD + 24.5, -36.0, yy, FD + 23.2, 0.05, 3);
    });
    /* white domes: a pair at the tower's forward top corners, smaller ones on
       the bridge tier (P5 '3', '6', '7') */
    sphere(THREE, g, T.white, 1.5, -29.8, YN - 2.6, FD + 26.6);
    sphere(THREE, g, T.white, 1.5, -29.8, YO + 2.2, FD + 26.6);
    [[-11.0, YN - 2.4], [-11.0, YO + 2.0], [-57.0, YN - 2.4], [-57.0, YO + 1.6]].forEach(function (q) {
      cylZ(THREE, g, 0.4, 0.5, 1.2, 6, T.sup, q[0], q[1], FD + 16.6);
      sphere(THREE, g, T.white, 0.95, q[0], q[1], FD + 17.9);
    });
    /* dishes either side of the forward face (P3) */
    dish(THREE, g, T, -24.4, YN - 2.0, FD + 18.0, 1.3, 0);
    dish(THREE, g, T, -24.4, YO + 1.6, FD + 18.0, 1.3, 0);
    dish(THREE, g, T, -51.6, YN - 2.0, FD + 18.0, 1.1, PI);
    /* the pole mast forward on the island with its yard (P5 '8') */
    strut(THREE, g, T.metal, -5.0, YO + 3.0, FD + 11.5, -5.0, YO + 3.0, FD + 23.0, 0.18, 6);
    strut(THREE, g, T.metal, -5.0, YO + 0.5, FD + 21.0, -5.0, YO + 5.5, FD + 21.0, 0.07, 4);
    /* fairings and lockers on the tier roofs */
    [[-64.0, YN - 2.0, FD + 6.0], [-1.5, YO + 2.5, FD + 6.0],
     [-61.0, YN - 2.5, FD + 11.5], [-6.0, YO + 2.6, FD + 11.5]].forEach(function (q) {
      blk(THREE, g, T.sup, q[0] - 1.2, q[0] + 1.2, q[1] - 0.8, q[1] + 0.8, q[2], q[2] + 1.4, true);
      cylZ(THREE, g, 0.45, 0.45, 0.8, 8, T.white, q[0], q[1], q[2] + 1.8);
    });

    /* ---------------- the corner weapons sponsons, below deck level (D1 red) */
    var ZS = FD - 3.4;
    var spon = function (x0, x1, y0, y1) {
      blk(THREE, g, T.sup, x0, x1, y0, y1, ZS - 0.7, ZS);
      /* a wedge under it back to the hull */
      var sg = y0 > 0 ? 1 : -1, yi = sg > 0 ? y0 : y1, yo2 = sg > 0 ? y1 : y0;
      g.add(ruled(THREE, [[x0, yo2, ZS - 0.7], [x1, yo2, ZS - 0.7]], [[x0, yi, ZS - 5.5], [x1, yi, ZS - 5.5]], T.hull,
            function () { return [0, sg, -1]; }, function (a) { return PLAIN(a[0], sg > 0).concat(PLAIN(a[0], sg > 0)); }));
      /* rail round the outer edge */
      for (var p2 = x0 + 0.5; p2 <= x1 - 0.4; p2 += 2.4)
        strut(THREE, g, T.metal, p2, yo2 - sg * 0.1, ZS, p2, yo2 - sg * 0.1, ZS + 1.0, 0.035, 3);
      strut(THREE, g, T.metal, x0 + 0.5, yo2 - sg * 0.1, ZS + 1.0, x1 - 0.4, yo2 - sg * 0.1, ZS + 1.0, 0.03, 3);
    };
    var mount = function (fn2, x, y) { var m = new THREE.Group(); m.position.set(x, y, ZS); g.add(m); fn2(THREE, m, T); };
    spon(62.0, 85.0, 15.0, 21.8);       mount(kashtan, 69.5, 19.5); mount(kashtan, 80.0, 19.4); mount(ak630, 64.6, 19.2);
    spon(43.0, 85.0, -30.4, -18.0);     mount(kashtan, 62.0, -26.6); mount(kashtan, 76.0, -22.6); mount(ak630, 48.0, -27.6);
    spon(-143.0, -111.0, 16.4, 25.0);   mount(kashtan, -119.0, 21.4); mount(kashtan, -132.0, 21.4); mount(ak630, -139.5, 20.6);
    spon(-145.0, -117.0, -32.0, -23.6); mount(kashtan, -124.0, -28.4); mount(kashtan, -137.0, -28.2); mount(ak630, -142.0, -27.0);
    /* the port gallery under the angled deck's notch, x -69..-24 (D1), two AK-630s */
    spon(-69.0, -24.0, 30.4, 34.2);     mount(ak630, -35.0, 32.4); mount(ak630, -58.0, 32.4);

    /* rudders and four shafts with their screws */
    for (s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.6, 6.0), T.metal);
      rd.position.set(-140.0, s * 5.0, -3.6); g.add(rd);
    }
    [[-5.0, -4.6], [-10.6, -3.8]].forEach(function (sq) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * sq[0], z2 = sq[1];
        cylX(THREE, g, 0.4, 0.4, 28.0, 8, T.metal, -120.0, y0, z2);
        strut(THREE, g, T.metal, -126.0, y0 * 0.7, z2 + 2.6, -126.0, y0, z2, 0.18, 4);
        cylX(THREE, g, 0.6, 0.75, 1.1, 8, T.metal, -134.6, y0, z2);
        for (i = 0; i < 5; i++) {
          var bl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.9, 2.4), T.metal);
          bl.position.set(-134.6, y0, z2); bl.rotation.x = i * 2 * PI / 5 + 0.4;
          bl.translateZ(1.4); bl.rotation.y = 0.45; g.add(bl);
        }
      }
    });

    /* ---------------- team: three modest strips on up-facing island roofs */
    box(THREE, g, 3.0, 1.2, 0.05, T.team, -6.0, YN - 4.0, FD + 11.53);
    box(THREE, g, 4.0, 1.4, 0.05, T.team, -18.0, TY, FD + 16.03);
    box(THREE, g, 2.0, 1.2, 0.05, T.team, -31.6, TY, FD + 25.53);

    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      if (!geo.attributes.normal) geo.computeVertexNormals();
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
  return { build: build };
})();

UNIT_MODELS["pact_e90_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e90"); }
};
UNIT_MODELS["pact_e00_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e00"); }
};
/* today's row: drawn as last photographed in service (see VARIANTS) */
UNIT_MODELS["carrier_p"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e00"); }
};

/* The PLAN's Type 001 Liaoning is the second Project 1143.5 hull, the ex-Varyag, bought
   unfinished and completed in China (commissioned 2012); the row also names the Type
   002 Shandong, a domestic development of it.  Drawn as this model's 2000s-2010s Kuznetsov
   (variant e00): a STAND-IN.  Not drawn: the Liaoning's island with its Type 346 panel
   arrays, the absence of the Granit cells (flush under the deck here anyway), the
   Shandong's longer island and other differences.  No markings. */
UNIT_MODELS["pla_e00_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e00"); }
};
