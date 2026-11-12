/* ===== us_m270_himars.js - HERO models: M270 MLRS and M142 HIMARS ==========
   Full-quality redo (2026-10-24).  Seven rows, two vehicles, every key kept:

   TRACKED, the M270 (the M993 carrier, a Bradley-derived chassis with the
   launcher-loader module, LLM, on its back):
     nato_e80_mlrs  M270, 1983: two six-rocket pods (M26), MERDC paint
     nato_e90_mlrs  M270, 1991: two six-rocket pods (M26), NATO three-colour
     mlrs_n         M270A2, present day: two six-rocket pods (GMLRS), CARC green
     nato_e90_tel   M270 with MGM-140 ATACMS: two ATACMS pods, one missile each
   WHEELED, the M142 HIMARS (the FMTV 6x6 truck, armoured cab, ONE pod):
     nato_e00_mlrs  HIMARS: one six-rocket pod (GMLRS)
     nato_e00_tel   HIMARS / ATACMS: one ATACMS pod (row says rounds: 1)
     tel_n          HIMARS / PrSM: one PrSM pod, two missiles (rounds: 2)
   The NMESIS and Excalibur coastal rows (js/eras.js) borrow tel_n through
   modelAs.  tel3d.js registers tel_n, nato_e00_tel and nato_e90_tel and
   units3d.js mlrs_n; this file loads after both (index.html), so it wins for
   all seven keys, as before; nothing in tel3d.js is needed any more for them.

   References (Wikimedia Commons, US Army / DoD public-domain photographs, at
   width 960; dates from the file pages):
     [R84] "M270 MLRS (1984).JPEG", 1984-08-15, REFORGER '84: port side, pod
           raised - the side stations, the six road wheels and their uneven
           spacing, the sprocket forward and raised, the cab block, the MERDC
           four-colour paint.
     [R85] "MLRS in REFORGER 1985.jpg", 1985-01: the same view; the boom frame
           standing forward over the pod faces, the tube mouths at the FRONT of
           the module, the rear trunnion, the lifting struts.
     [F]   "Multiple Launch Rocket System.jpg" (US Army, undated, White Sands):
           front three-quarter, firing - the three louvred armoured shutters on
           the sloped cab front, the two lamp clusters, the tow eyes, the two
           pods of 3 x 2 tubes in the top of the module face, the open cage
           below them, the boom's two U-frames over them.
     [S]   "MLRS-1.svg" (vector of [F]): the louvre slats.
     [K98] "M-270A1 Multiple Launch Rocket System (MLRS).jpg", 1998-10-15,
           Korea: NATO three-colour on an M270A1, the cab front, shutters up.
     [G19] "M270 MLRS - 190911-A-HE359-0085.jpg", 2019-09-11: M270A1 in plain
           CARC green, port front three-quarter, module stowed - module top a
           little proud of the cab roof, the louvred panel low on the port
           side of the module, the return rollers.
     [A24] "Dynamic Front 25 - M270A2 MLRS (8758660).jpg", 2024-11-17: the
           M270A2 in plain green.
     [D]   "HIMARS.png" (side drawing, 2024, port side): the HIMARS side
           stations - axles, cab, the intake tower and box behind it, the
           module with three access panels and the boom lying on its top.
     [H07] "M142 himars.jpg", 2007-09-20: armoured cab front three-quarter,
           plain green, pod face of 3 x 2 tubes, boom up.
     [H14] "Fire support training 140313-A-DM872-123.jpg", 2014-03-13
           Bagram: starboard front three-quarter, module raised - the cab's
           raked upper front with the two windscreens, chamfered corners,
           lamps, bumper, steps, the boxes behind the cab, the tandem.
     [H22] "HIMARS delivered to Grafenwoehr ... (7088223).jpg", 2022-03-08:
           rear view, plain green, the pod face with its six capped tubes.
     [P]   "Atacms mlrs 01.jpg": the ATACMS round beside a six-rocket pod.
   Published (Lockheed Martin / US Army fact sheets, en.wikipedia): M270 6.85 m
     long, 2.97 m wide over the tracks, 2.57 m high stowed, 6 road wheels a
     side; HIMARS 7.0 x 2.4 x 3.2 m, 6x6, 395/85R20 tyres (1.18 m).

   Recognition list (what each rests on; where it is in the code):
     1. M270: the full-width armoured cab block over the front 2.7 m, its
        upper front sloped back over three LOUVRED SHUTTERS [F][S][K98]:
        buildM270, loft table CAB270.
     2. M270: the two lamp clusters at the outer ends of the vertical band
        under the shutters, tow eyes below [F][G19]: buildM270.
     3. M270: six road wheels a side, paired by uneven spacing, the sprocket
        forward and raised, the idler aft, the green-painted wheel discs, an open
        track loop with its links, two return rollers [R84][R85][G19]: m270Track, WX270.
     4. M270: the LLM, a long box behind the cab whose top stands a little
        proud of the cab roof, hinged at its rear trunnion [G19][R85]: launcher().
     5. Both: the pod faces in the TOP of the module face, 3 x 2 tube mouths
        per rocket pod, the open cage below [F][H07][H22]: launcher().
     6. M270: the boom frame lying forward over the pod faces [R85][F]: launcher(o.boom270).
     7. M270A1/A2: the louvred panel low on the port side of the module [G19]
        (mlrs_n only; not seen on the 1980s module [R85]).
     8. HIMARS: the armoured cab - flat sides, chamfered front corners, the
        raked upper front with two windscreens, vertical lower front with the
        grille, bumper, round lamps [H14][H07][D]: buildHimars, loft table CAB142.
     9. HIMARS: three axles, the tandem close-coupled behind a long gap, big
        lugged tyres [D][H14]: AX142, tyre().
    10. HIMARS: the intake tower and box behind the cab on the port side, the
        boxes on the starboard side, the air tanks under the frame [D][H14].
    11. HIMARS: the module over the tandem with three access panels a side and
        the stowed boom lying on its top [D][H14]: launcher(o.boom142).
    12. Paint by period: MERDC 1984 [R84][R85]; NATO three-colour [K98];
        plain CARC green [G19][A24][H07][H22].

   Paint, by row and why:
     nato_e80_mlrs  MERDC four colours (forest green, field drab, sand, black)
                    as [R84] and [R85] show it in 1984-85.
     nato_e90_mlrs, nato_e90_tel  NATO three-colour CARC (green, brown,
                    black) as the 1998 photograph [K98] shows it.  The old
                    file drew these desert tan for Desert Storm; no dated
                    photograph of a tan M270 was found in this pass, so the
                    period's three-colour is drawn (not confirmed: the 1991
                    desert scheme).
     mlrs_n, HIMARS rows  plain CARC green [G19][A24][H07][H22].  The e00
                    HIMARS rows were drawn tan before; the dated 2007 photograph
                    [H07] is green, and no dated tan HIMARS was fetched.
   Colours are authored at about 0.8 of the standard chips (FS 34079 forest
   green, 30118 field drab, 30277 sand; CARC green 383, brown 383), as the
   ACES pass lifts mid tones.

   THE HIMARS POD FACES FORWARD HERE, and on the real truck it travels with
   the pod face AFT, over the tail lamps [H22][H14][D].  The renderer trains
   a launcher by turning "turret" (or the hull, on the turret:false TEL rows)
   so that the pod group's +X points at the target, and raises the +X end
   (render3d.js poseLauncher; launcher3d_check.js holds the bearing to
   0.16 rad).  A pod drawn aft would fire away from its target.  So the
   module is drawn as it stands traversed 180 degrees, laid over the cab -
   the attitude it fires forward from - with its boom and access panels
   mirrored with it.  Showing the travel stow would need a rest yaw of 180
   degrees on the module in render3d.js (not done here: game logic).

   Elevation: "podelev" (box, pod faces, boom, team stripe) is a child of the
   module hinged at its rear trunnion; render3d raises it to LAUNCH_EL (35
   degrees, as before; no reference gives a firing elevation, [R85] reads
   about 40) and lays it level again.  Its userData.cells holds each round's
   mouth and the pod's rear, in its frame.  The round each row fires (ord,
   per weapon key) is declared here and only here.

   Turret: the module is "turret" on the turret:true rows (all but
   nato_e00_tel and tel_n, which bake it: entities.js turns their hull).
   Road wheels: the M270's six "roadwheel" groups, one an axle with both
   sides' dual wheels; the HIMARS' six tyres, one a group.  Both are one mesh
   with rubber and painted hub told apart by vertex colour (linear).
   Neither vehicle has outriggers or jacks, so no travel/deploy pose is drawn:
   set up, the M270 and HIMARS look as they do on the march.
   NOT drawn: the M270's roof ventilator stack (it stands above the
   published 2.57 m the check holds), the whip antennas, the camouflage nets
   spread on the cab roof [F] (a rolled net is drawn since the 2026-11
   rework), markings, numbers, the cab interiors.  Not confirmed: the ATACMS pod's end face (one
   610 mm mouth is drawn, as before); the exact M270 road-wheel spacing (read
   off two oblique photographs, [R84] and [R85] agree).

   REWORK 2026-11 (the owner's visual review: the cab and launcher module
   "read plain" at the game camera; the geometry was right, so it is kept,
   with every key, row, builder, "turret", "podelev", "roadwheel", cells,
   ord and len). Added, all inside the existing six materials (16 draw
   calls a row, unchanged):
     [RIAT] Commons "M270 at RIAT 1998.jpg" (port side, module raised): the
            module's plain plated sides, longeron, cable run, boom hoist.
     [BST]  Commons "MLRS (Multiple Launch Rocket System) Vehicles at Camp
            Bastion, Afghanistan MOD 4.jpg": the cab front - the shutters'
            heavy frames, lamp boxes, nose tow shackles, the pod faces.
     [HS18] Commons "180614-A-IY962-102 - M142 High Mobility Artillery
            Rocket System (HIMARS) firing during Saber Strike 18 (Image 4 of
            7).jpg": port front three-quarter of the armoured cab - framed
            windscreens, the louvred grilles low on the chamfered corners, the
            door's hinges, long grab handle and window frame, the bolt rows,
            bumper lamps, steps, the front mudguard's raked ends.
     - module (moduleDetail, both vehicles): the lower longeron and the top
       edge rails, proud stiffeners and bolt rows over every panel joint, the
       cable run in its clips, lifting rings, the trunnion bosses, the closed
       rear face with handles and lamp, top rim, transverse ribs, two hinged
       rear lids, the pod faces' frames and corner castings, the boom's hoist
       cables and hook blocks;
     - M270 (m270Detail): the shutters' frame bolts, hinge knuckles and lift
       arms, lamp guards, hanging nose shackles, cab bolt rows, door hinges,
       grab handles, a step, roof grab rails, periscopes round the hatch, a
       rolled camouflage net, the nose access panel and its bolts, tow cables
       and tie-downs on the deck edges, tools (NOT CONFIRMED placement), tail
       lamp guards, rear handles, pintle;
     - HIMARS (himarsDetail): the windscreen frames, bolts and wipers, corner
       grilles, door hinges, handle, window frame and latch, the mirrors on
       their arms (NOT CONFIRMED size: [HS18] shows the arm, not the head),
       corner and roof grab rails, lamp lenses, the hatch hinge, periscope,
       headlamp guards, tow shackles, step hangers, the front mudguard's ends,
       ribbed mudflaps, tail lamp guards, rear tow eyes, pintle, stowage
       behind the cab (NOT CONFIRMED: a tarpaulin and two water cans);
     - paint: the canvas keeps its camouflage and adds mud and dust over the
       bottom metre, rain streaks, panel-joint grime, chips and oil spots.
   mlrs_b (js/hero/eu_land_skirmish.js) lays its M270A2 cab shell over this
   cab, so the cab fittings show there only where they stand clear of it.
   Tris: M270 rows 11.0-11.5k -> 18.3-18.8k; HIMARS 10.3-10.4k -> 15.5-15.6k.

   Draw calls: 16 a row (hull 5 + ring 1 + elevating module 4 + 6 wheel
   groups).  Materials: SKIN (camo canvas, metre UVs), DARK, STEEL, GLASS,
   TEAM (exactly C.team), WHEEL (vertex colours).
   Model space: +X nose, +Y left (port), +Z up, metres; tyres and track on
   z = 0.  ASCII only.  Colours authored in sRGB (prepModel linearises). */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsMlrs = (function () {
  "use strict";

  /* what each registered key carries.  pods: the end-face pattern.  ord:
     the round each weapon of the row is drawn as in flight (js/fx3d.js);
     a weapon not named keeps its old drawing (nato_e90_mlrs' AT2 mine
     rocket).  M26 for the 1983 and 1991 M270s; GMLRS for the present-day
     M270A2 (the M26 family left the US Army's active inventory in June 2009,
     en.wikipedia M270) and for the 2005 HIMARS row (GMLRS introduced 2005);
     ATACMS and PrSM as the rows say. */
  var ROWS = {
    nato_e80_mlrs: { veh: "m270",   paint: "merdc", pods: "rocket", turret: true,  louvre: false, ord: { w_e80_nato_mlrs: "m26" } },
    nato_e90_mlrs: { veh: "m270",   paint: "nato3", pods: "rocket", turret: true,  louvre: false, ord: { w_e90_nato_mlrs: "m26" } },
    mlrs_n:        { veh: "m270",   paint: "carc",  pods: "rocket", turret: true,  louvre: true,  ord: { mlrs: "gmlrs" } },
    nato_e90_tel:  { veh: "m270",   paint: "nato3", pods: "atacms", turret: true,  louvre: false, ord: { srbm_atacms: "atacms" } },
    nato_e00_mlrs: { veh: "himars", paint: "carc",  pods: "rocket", turret: true,  ord: { w_e00_nato_mlrs: "gmlrs" } },
    nato_e00_tel:  { veh: "himars", paint: "carc",  pods: "atacms", turret: false, ord: { srbm_atacms: "atacms" } },
    tel_n:         { veh: "himars", paint: "carc",  pods: "prsm",   turret: false, ord: { srbm_mod: "prsm" } }
  };
  /* the pod's firing elevation: see the header (not a published figure) */
  var LAUNCH_EL = 35 * Math.PI / 180;

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ---------------------------------------------------------------- paint */
  /* base: the field colour; blots: [colour, count, radius px] laid in order;
     the canvas is 256 px over 6 m of surface (worldUV), so 43 px a metre and
     the MERDC and NATO patches come out 1-2.5 m across, as photographed.
     hub: the painted road-wheel / wheel colour (vertex colour, sRGB). */
  var PAINT = {
    merdc: { base: "#4a5537", blots: [["#6b5b40", 9, 34], ["#a7946c", 7, 20], ["#1d1d19", 9, 10]], hub: 0x4a5537 },
    nato3: { base: "#424d2f", blots: [["#4f3e2b", 10, 36], ["#1c1c18", 8, 22]], hub: 0x424d2f },
    carc:  { base: "#4b5442", blots: [["#454e3d", 8, 30], ["#525b48", 8, 26]], hub: 0x4b5442 }
  };
  var _cv = {};

  function paintCanvas(kind) {
    if (_cv[kind] !== undefined) return _cv[kind];
    var P = PAINT[kind], R = rng(kind.length * 7919 + kind.charCodeAt(0) * 131), W = 256, i, k, j, q, cv, x, y, rr, a, rd;
    try {
      cv = document.createElement("canvas"); cv.width = W; cv.height = W;
      q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, W, W);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k][0];
        for (i = 0; i < P.blots[k][1]; i++) {
          x = R() * W; y = R() * W; rr = P.blots[k][2] * (0.7 + R() * 0.6);
          /* an irregular blot, drawn again across each edge it crosses so the tile repeats seamlessly */
          var pts = [];
          for (a = 0; a < 9; a++) { rd = rr * (0.5 + R() * 0.75); pts.push([Math.cos(a / 9 * 6.2832) * rd * 1.5, Math.sin(a / 9 * 6.2832) * rd]); }
          for (j = 0; j < 9; j++) {
            var ox = ((j % 3) - 1) * W, oy = (((j / 3) | 0) - 1) * W;
            q.beginPath();
            for (a = 0; a < 9; a++) { if (a) q.lineTo(x + ox + pts[a][0], y + oy + pts[a][1]); else q.moveTo(x + ox + pts[a][0], y + oy + pts[a][1]); }
            q.closePath(); q.fill();
          }
        }
      }
      /* dust and wear: pale flecks, dark scuffs, faint rain streaks */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i & 1) ? "rgba(214,200,160,0.06)" : "rgba(20,18,12,0.08)";
        q.fillRect(R() * W, R() * W, 3 + R() * 18, 1 + R() * 3);
      }
      for (i = 0; i < 30; i++) { q.fillStyle = "rgba(25,25,18,0.06)"; q.fillRect(R() * W, R() * W, 1 + R() * 2, 20 + R() * 50); }
      /* REWORK 2026-11, the weathering the photographs show [G19][A24][H14]:
         the canvas is laid on 6 m of surface with v up the sides, so its
         bottom rows are the first metre off the ground. Mud and dust thrown
         up by the tracks and tyres, heaviest at the bottom and fading by
         about 1.3 m; rain streaks running down from seams and fittings; the
         grime that collects in plate joints and round bolt heads (a faint
         grid at the panel spacing); chipped paint on edges, and oil spots. */
      var mud = q.createLinearGradient(0, W, 0, W * 0.76);
      mud.addColorStop(0.0, "rgba(92,78,54,0.42)");
      mud.addColorStop(0.45, "rgba(104,90,64,0.20)");
      mud.addColorStop(1.0, "rgba(110,96,70,0.0)");
      q.fillStyle = mud; q.fillRect(0, W * 0.76, W, W * 0.24);
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(84,70,48,0.16)" : "rgba(150,132,98,0.12)";
        x = R() * W; y = W * (0.80 + R() * 0.20);
        q.beginPath(); q.ellipse(x, y, 2 + R() * 9, 1 + R() * 4, 0, 0, 6.2832); q.fill();
      }
      for (i = 0; i < 60; i++) {
        x = R() * W; y = R() * W * 0.8;
        q.fillStyle = (i & 1) ? "rgba(24,24,18,0.10)" : "rgba(190,180,150,0.07)";
        q.fillRect(x, y, 1 + R() * 1.5, 14 + R() * 60);
      }
      q.strokeStyle = "rgba(18,18,12,0.16)"; q.lineWidth = 1;
      for (i = 0; i < 6; i++) {
        x = Math.floor(i * W / 6 + R() * 10) + 0.5;
        q.beginPath(); q.moveTo(x, 0); q.lineTo(x, W); q.stroke();
      }
      for (i = 0; i < 4; i++) {
        y = Math.floor(i * W / 4 + R() * 12) + 0.5;
        q.beginPath(); q.moveTo(0, y); q.lineTo(W, y); q.stroke();
      }
      for (i = 0; i < 120; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,30,24,0.22)" : "rgba(200,192,160,0.16)";
        q.fillRect(R() * W, R() * W, 1 + R() * 3, 1 + R() * 2);
      }
      for (i = 0; i < 7; i++) {
        q.fillStyle = "rgba(14,12,8,0.12)";
        q.beginPath(); q.ellipse(R() * W, R() * W, 3 + R() * 8, 2 + R() * 6, R() * 3, 0, 6.2832); q.fill();
      }
    } catch (e) { cv = null; }
    _cv[kind] = cv;
    return cv;
  }

  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  function makeMats(THREE, C, kind) {
    var T = {}, cv = paintCanvas(kind), tx = cv ? canvasTex(THREE, cv) : null;
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.90, metalness: 0.04 });
    if (tx) T.skin.map = tx; else T.skin.color.setHex(parseInt(PAINT[kind].base.slice(1), 16));
    T.skin.userData.worldUV = 6.0;
    T.dark  = new THREE.MeshStandardMaterial({ color: 0x23241f, roughness: 0.82, metalness: 0.20 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x4a4d4f, roughness: 0.50, metalness: 0.38 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1c2a31, roughness: 0.14, metalness: 0.30 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.92, metalness: 0.04 });
    /* team flash: exactly the owner's colour */
    T.team  = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                               roughness: 0.60, metalness: 0.10 });
    return T;
  }
  /* an sRGB hex as a linear vertex colour (vertex colours are not linearised by prepModel) */
  function lin(hex) {
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255].map(function (c) {
      c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
  }

  /* ------------------------------------------------------------ triangles */
  /* A flat triangle soup that orients every face away from a hint point; for
     a convex part that is its own middle, so there is no winding to get
     wrong.  Everything prismatic and lofted below is convex. */
  function Soup() { this.p = []; this.n = []; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0];
    var cy = (a[1] + b[1] + c[1]) / 3 - away[1];
    var cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(this.p.length / 3 * 2).fill(0), 2));
    return g;
  };

  /* Box projection by each triangle's own facing, 6 m of paint to the
     canvas: a side takes (along, height), a top takes (x, y). */
  function worldUV(P, U, S) {
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = y / S; }
        else if (nx >= ny) { u = y / S + 0.5; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* One merged mesh per material.  `pre` is an optional matrix every part is
     put through on the way in: about(px, pz) takes parts authored in the
     module's frame into the elevating group's, whose origin is the rear
     trunnion; about() clears it.  vc: a linear colour stamped on what is
     added while it is set (the wheel material). */
  function Baker(THREE) { this.T = THREE; this.by = []; this.pre = null; this.vc = null; }
  Baker.prototype.about = function (px, pz) {
    this.pre = px === undefined ? null : new this.T.Matrix4().makeTranslation(-px, 0, -pz);
  };
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (this.pre) g.applyMatrix4(this.pre);
    if (this.vc) {
      var n = g.attributes.position.count, c = new Float32Array(n * 3), i;
      for (i = 0; i < n; i++) { c[i * 3] = this.vc[0]; c[i * 3 + 1] = this.vc[1]; c[i * 3 + 2] = this.vc[2]; }
      g.setAttribute("color", new this.T.BufferAttribute(c, 3));
    }
    for (var j = 0; j < this.by.length; j++) if (this.by[j].mat === mat) { this.by[j].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var T = this.T, m = new T.Matrix4();
    m.compose(new T.Vector3(x, y, z),
              new T.Quaternion().setFromEuler(new T.Euler(rx || 0, ry || 0, rz || 0)),
              new T.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  Baker.prototype.box = function (mat, sx, sy, sz, x, y, z, rx, ry, rz) {
    this.put(mat, new this.T.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  };
  /* box from min/max corners; mirrored callers may hand them swapped */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.box(mat, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* cylinder on a world axis ("x", "y" or "z"); r2 is the far-end radius */
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  /* REWORK 2026-11: a round bar from point a to point b (grab handles,
     guards, cables, mirror arms) and a bar bent through several points */
  Baker.prototype.bar = function (mat, a, b, r, seg) {
    var T = this.T, dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-6) return;
    var g = new T.CylinderGeometry(r, r, L, seg || 6), m = new T.Matrix4();
    m.compose(new T.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
              new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), new T.Vector3(dx / L, dy / L, dz / L)),
              new T.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    this.add(mat, g);
  };
  Baker.prototype.rod = function (mat, pts, r, seg) {
    for (var i = 0; i < pts.length - 1; i++) this.bar(mat, pts[i], pts[i + 1], r, seg);
  };
  /* a ring (a tow eye, a lifting ring, a shackle when arc < 2 pi) */
  Baker.prototype.torus = function (mat, R, r, x, y, z, rx, ry, rz, arc) {
    this.put(mat, new this.T.TorusGeometry(R, r, 5, 10, arc || Math.PI * 2), x, y, z, rx, ry, rz);
  };
  /* a flat disc facing +X (a tube mouth) */
  Baker.prototype.mouth = function (mat, r, seg, x, y, z) {
    this.put(mat, new this.T.CircleGeometry(r, seg), x, y, z, 0, Math.PI / 2, 0);
  };
  /* convex XZ polygon (side profile) extruded across Y from y0 to y1 */
  Baker.prototype.prism = function (mat, pts, y0, y1) {
    var S = new Soup(), n = pts.length, cx = 0, cz = 0, i;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cz += pts[i][1]; }
    cx /= n; cz /= n;
    var away = [cx, (y0 + y1) / 2, cz], c0 = [cx, y0, cz], c1 = [cx, y1, cz];
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var a0 = [a[0], y0, a[1]], b0 = [b[0], y0, b[1]], a1 = [a[0], y1, a[1]], b1 = [b[0], y1, b[1]];
      S.tri(c0, a0, b0, away); S.tri(c1, a1, b1, away);
      S.quad(a0, b0, b1, a1, away);
    }
    this.add(mat, S.geo(this.T));
  };
  /* convex YZ polygon (cross-section) extruded along X from x0 to x1 */
  Baker.prototype.prismYZ = function (mat, pts, x0, x1) {
    this.loft(mat, [[x0, pts], [x1, pts]]);
  };
  /* a lofted solid through a station table: [[x, [[y, z]...]]...], every
     section convex with the same point count and the whole convex (each
     station inside the hull of its neighbours), capped at both ends */
  Baker.prototype.loft = function (mat, st) {
    var S = new Soup(), m = st.length, n = st[0][1].length, i, j, cx = 0, cy = 0, cz = 0, c = 0, P = [];
    for (i = 0; i < m; i++) {
      P.push([]);
      for (j = 0; j < n; j++) { var q = [st[i][0], st[i][1][j][0], st[i][1][j][1]]; P[i].push(q); cx += q[0]; cy += q[1]; cz += q[2]; c++; }
    }
    var away = [cx / c, cy / c, cz / c];
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      var k = (j + 1) % n;
      S.quad(P[i][j], P[i][k], P[i + 1][k], P[i + 1][j], away);
    }
    for (i = 0; i < m; i += m - 1) {
      var ce = [0, 0, 0];
      for (j = 0; j < n; j++) { ce[0] += P[i][j][0] / n; ce[1] += P[i][j][1] / n; ce[2] += P[i][j][2] / n; }
      for (j = 0; j < n; j++) S.tri(ce, P[i][j], P[i][(j + 1) % n], away);
      if (m === 1) break;
    }
    this.add(mat, S.geo(this.T));
  };
  /* a plate on a sloped face: the face runs from F0 to F1 in side view
     ([x, z]); u0..u1 are fractions along it, h0..h1 the stand-off along the
     outward normal, y0..y1 across */
  Baker.prototype.onSlope = function (mat, F0, F1, u0, u1, h0, h1, y0, y1) {
    var dx = F1[0] - F0[0], dz = F1[1] - F0[1], L = Math.sqrt(dx * dx + dz * dz), nx = dz / L, nz = -dx / L;
    if (nx < 0) { nx = -nx; nz = -nz; }                     /* the face looks forward */
    function p(u, h) { return [F0[0] + dx * u + nx * h, F0[1] + dz * u + nz * h]; }
    this.prism(mat, [p(u0, h0), p(u1, h0), p(u1, h1), p(u0, h1)], y0, y1);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j, hasC = false;
      for (j = 0; j < e.g.length; j++) { n += e.g[j].attributes.position.count; if (e.g[j].attributes.color) hasC = true; }
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), Cc = hasC ? new Float32Array(n * 3) : null, o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        if (Cc) { if (g.attributes.color) Cc.set(g.attributes.color.array, o * 3); else Cc.fill(1, o * 3, (o + c) * 3); }
        o += c;
      }
      var S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      if (Cc) geo.setAttribute("color", new THREE.BufferAttribute(Cc, 3));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* ------------------------------------------------------------- the pods */
  /* The launcher-loader module, built about the traverse ring (origin: the
     ring centre on the deck).  o: hw half width, x0/x1 length, z0/z1 height,
     pods [y centres] and kinds [rocket | atacms | prsm, one per pod],
     px/pz the rear trunnion it elevates about.  Each pod face (1.05 x 0.84 m,
     the standard pod's end) sits in the TOP of the module's front face, 0.04
     proud, the open loading cage below it [F][H07][H22]; its mouths stand
     6 and 12 mm beyond, apart so they cannot z-fight.
     Two bakers: KT keeps the cradle, which stays on the traverse ring; KE
     takes everything that elevates, shifted into the trunnion's frame for
     the group "podelev" (elevGroup), and is left in that frame so the caller
     can add its own module parts.  Returns the cells, one per round the
     pods hold: [mouth x, y, z, pod rear x] in that frame. */
  function launcher(KT, KE, T, o) {
    var i, j, k, yc, kind, c = 0.10, zc = o.z1 - 0.06 - 0.42, cells = [], xm = (o.x0 + o.x1) / 2, L = o.x1 - o.x0;
    function cell(y, z) { cells.push([o.x1 + 0.06 - o.px, y, z - o.pz, o.x0 - o.px]); }
    /* the cradle under it, which the traverse ring carries, and the two
       elevating rams lying along it (they show under the raised module [R85]) */
    KT.bb(T.dark, o.x0 + 0.25, o.x1 - 0.30, -o.hw + 0.25, o.hw - 0.25, o.z0 - 0.12, o.z0 + 0.01);
    for (j = -1; j <= 1; j += 2) KT.cyl(T.dark, 0.07, L * 0.42, 10, xm + L * 0.12, j * (o.hw - 0.45), o.z0 - 0.02, "x");
    KE.about(o.px, o.pz);
    /* the module: a box chamfered along its top edges, plated in panels */
    KE.prismYZ(T.skin, [[-o.hw + 0.02, o.z0], [o.hw - 0.02, o.z0], [o.hw, o.z0 + 0.08], [o.hw, o.z1 - c],
                        [o.hw - c, o.z1], [-o.hw + c, o.z1], [-o.hw, o.z1 - c], [-o.hw, o.z0 + 0.08]],
               o.x0, o.x1 - 0.06);
    /* the front frame round the face: top rail, side posts, sill */
    KE.bb(T.skin, o.x1 - 0.06, o.x1, -o.hw, o.hw, o.z1 - 0.06, o.z1 - c * 0.3);
    for (j = -1; j <= 1; j += 2) KE.bb(T.skin, o.x1 - 0.06, o.x1, j * o.hw, j * (o.hw - 0.08), o.z0 + 0.08, o.z1 - 0.06);
    KE.bb(T.skin, o.x1 - 0.06, o.x1, -o.hw + 0.08, o.hw - 0.08, o.z0, o.z0 + 0.10);
    /* the open cage under the pods: the dark interior and its frames [F] */
    KE.bb(T.dark, o.x1 - 0.07, o.x1 - 0.05, -o.hw + 0.08, o.hw - 0.08, o.z0 + 0.10, zc - 0.42);
    for (j = 0; j < 3; j++) KE.bb(T.skin, o.x1 - 0.06, o.x1 - 0.02, -o.hw + 0.08, o.hw - 0.08, o.z0 + 0.22 + j * (zc - 0.42 - o.z0 - 0.22) / 2.4, o.z0 + 0.26 + j * (zc - 0.42 - o.z0 - 0.22) / 2.4);
    for (j = 0; j < o.posts.length; j++) KE.bb(T.skin, o.x1 - 0.06, o.x1 - 0.02, o.posts[j] - 0.04, o.posts[j] + 0.04, o.z0 + 0.10, zc - 0.42);
    /* panel seams down each side and along it, so the box reads as plated */
    for (j = -1; j <= 1; j += 2) {
      for (k = 0; k < 2; k++) KE.box(T.dark, L - 0.3, 0.012, 0.022, xm, j * (o.hw + 0.004), k ? o.z1 - 0.22 : o.z0 + 0.26);
      for (k = 0; k < o.seams.length; k++) KE.box(T.dark, 0.022, 0.012, o.z1 - o.z0 - 0.5, o.x0 + o.seams[k], j * (o.hw + 0.004), (o.z0 + o.z1) / 2);
      /* latches on the access panels */
      for (k = 0; k < o.seams.length - 1; k++) KE.box(T.steel, 0.05, 0.02, 0.07, o.x0 + (o.seams[k] + o.seams[k + 1]) / 2, j * (o.hw + 0.01), o.z1 - 0.40);
    }
    /* the pod end faces and their mouths */
    for (i = 0; i < o.pods.length; i++) {
      yc = o.pods[i]; kind = o.kinds[i];
      KE.bb(T.skin, o.x1 - 0.02, o.x1 + 0.04, yc - 0.525, yc + 0.525, zc - 0.42, zc + 0.42);
      KE.bb(T.dark, o.x1 + 0.04, o.x1 + 0.045, yc - 0.49, yc + 0.49, zc - 0.39, zc + 0.39);
      if (kind === "rocket") {
        for (j = -1; j <= 1; j++) for (k = -1; k <= 1; k += 2)
          { KE.mouth(T.dark, 0.125, 14, o.x1 + 0.052, yc + j * 0.33, zc + k * 0.19);
            KE.mouth(T.steel, 0.150, 14, o.x1 + 0.046, yc + j * 0.33, zc + k * 0.19);
            cell(yc + j * 0.33, zc + k * 0.19); }
      } else if (kind === "atacms") {
        KE.mouth(T.dark, 0.31, 22, o.x1 + 0.052, yc, zc);
        KE.mouth(T.steel, 0.34, 22, o.x1 + 0.046, yc, zc);
        cell(yc, zc);
      } else {
        for (j = -1; j <= 1; j += 2) {
          KE.mouth(T.dark, 0.22, 18, o.x1 + 0.052, yc + j * 0.255, zc);
          KE.mouth(T.steel, 0.24, 18, o.x1 + 0.046, yc + j * 0.255, zc);
          cell(yc + j * 0.255, zc);
        }
      }
    }
    /* the M270's boom frame, stowed: an arm along each top edge of the front
       third and the cross frame standing over the pod faces [R85][F] */
    if (o.boom270) {
      for (j = -1; j <= 1; j += 2) {
        KE.bb(T.skin, o.x1 - 1.30, o.x1 + 0.02, j * (o.hw - 0.10), j * (o.hw - 0.22), o.z1 - 0.01, o.z1 + 0.05);
        KE.bb(T.skin, o.x1 - 0.12, o.x1 + 0.02, j * (o.hw - 0.10), j * (o.hw - 0.22), o.z1 - 0.40, o.z1 + 0.05);
      }
      KE.bb(T.skin, o.x1 - 0.12, o.x1 + 0.02, -(o.hw - 0.10), o.hw - 0.10, o.z1 + 0.0, o.z1 + 0.09);
      KE.bb(T.skin, o.x1 - 1.10, o.x1 - 0.95, -(o.hw - 0.16), o.hw - 0.16, o.z1, o.z1 + 0.04);
    }
    /* the HIMARS boom, stowed: lying on top of the module, its cross frame at
       the end away from the pod face, lifted a little at its head [D] */
    if (o.boom142) {
      for (j = -1; j <= 1; j += 2)
        KE.prism(T.skin, [[o.x0 + 0.25, o.z1 + 0.34], [o.x0 + 0.45, o.z1 + 0.06], [o.x0 + 1.75, o.z1 + 0.04],
                          [o.x0 + 1.75, o.z1 + 0.13], [o.x0 + 0.40, o.z1 + 0.22], [o.x0 + 0.22, o.z1 + 0.40]],
                 j * (o.hw - 0.14) - 0.05, j * (o.hw - 0.14) + 0.05);
      KE.bb(T.skin, o.x0 + 0.18, o.x0 + 0.34, -(o.hw - 0.09), o.hw - 0.09, o.z1 + 0.28, o.z1 + 0.42);
      KE.bb(T.skin, o.x0 + 1.55, o.x0 + 1.80, -(o.hw - 0.20), o.hw - 0.20, o.z1, o.z1 + 0.05);
      for (j = -1; j <= 1; j += 2) KE.bb(T.skin, o.x0 + 1.60, o.x0 + 1.75, j * (o.hw - 0.09), j * (o.hw - 0.19), o.z1, o.z1 + 0.13);
    }
    /* team stripe along the top, facing the RTS camera */
    KE.bb(T.team, xm - L * 0.18, xm + L * 0.12, -0.24, 0.24, o.z1 + 0.0, o.z1 + 0.022);
    return cells;
  }

  /* The elevating part of the module: a group at the trunnion, level at
     rest, which render3d turns about its own Y. */
  function elevGroup(THREE, KE, px, pz, cells) {
    var E = new THREE.Group();
    E.name = "podelev";
    E.position.set(px, 0, pz);
    KE.flush(E);
    KE.about();
    E.userData.cells = cells;
    E.userData.el = LAUNCH_EL;
    return E;
  }

  /* ------------------------------------------- REWORK 2026-11: the fittings */
  /* The module's structure, in the module frame (launcher() leaves KE in it):
     the lower longeron and top edge rail on each side, bolt rows down every
     panel joint, the data and power cable run in its clips along the upper
     side, lifting rings at the four top corners, the trunnion bosses and
     the closed rear face with its panel, handles and lamp; round each pod
     face its cast frame and the four corner castings by which the pod is
     lifted [F][H07][H22][G19][RIAT]. */
  function moduleDetail(KE, T, o) {
    var j, k, xm = (o.x0 + o.x1) / 2, L = o.x1 - o.x0, zc = o.z1 - 0.06 - 0.42, i, yc;
    for (j = -1; j <= 1; j += 2) {
      var yo = j * (o.hw + 0.02);
      KE.bb(T.skin, o.x0 + 0.04, o.x1 - 0.10, j * o.hw, j * (o.hw + 0.035), o.z0 + 0.10, o.z0 + 0.22);
      KE.bb(T.skin, o.x0 + 0.04, o.x1 - 0.10, j * (o.hw - 0.01), j * (o.hw + 0.02), o.z1 - 0.16, o.z1 - 0.11);
      for (k = 0; k < o.seams.length; k++)
        for (i = 0; i < 6; i++)
          KE.box(T.steel, 0.026, 0.02, 0.026, o.x0 + o.seams[k] + 0.04, yo, o.z0 + 0.32 + i * (o.z1 - o.z0 - 0.62) / 5);
      for (i = 0; i < Math.round(L / 0.26); i++)
        KE.box(T.steel, 0.026, 0.02, 0.026, o.x0 + 0.15 + i * 0.26, j * (o.hw + 0.040), o.z0 + 0.16);
      /* the cable run and its clips */
      KE.cyl(T.dark, 0.028, L - 0.60, 8, xm - 0.10, j * (o.hw + 0.03), o.z1 - 0.26, "x");
      for (i = 0; i < 6; i++) KE.box(T.steel, 0.03, 0.05, 0.07, o.x0 + 0.45 + i * (L - 1.0) / 5, j * (o.hw + 0.025), o.z1 - 0.26);
      /* lifting rings at the top corners and the trunnion boss at the rear */
      for (k = 0; k < 2; k++) {
        var xr = k ? o.x1 - 0.22 : o.x0 + 0.18;
        KE.box(T.steel, 0.10, 0.04, 0.08, xr, j * (o.hw + 0.02), o.z1 - 0.06);
        KE.torus(T.steel, 0.05, 0.012, xr, j * (o.hw + 0.05), o.z1 - 0.02, 0, 0, 0);
      }
      KE.cyl(T.steel, 0.11, 0.06, 14, o.px, j * (o.hw + 0.03), o.pz + 0.10, "y");
      KE.cyl(T.dark, 0.06, 0.08, 10, o.px, j * (o.hw + 0.05), o.pz + 0.10, "y");
    }
    /* the rear face: a framed panel, two handles, the module lamp */
    KE.bb(T.skin, o.x0 - 0.025, o.x0, -o.hw + 0.12, o.hw - 0.12, o.z0 + 0.14, o.z1 - 0.14);
    KE.bb(T.dark, o.x0 - 0.03, o.x0 - 0.02, -o.hw + 0.20, o.hw - 0.20, o.z1 - 0.20, o.z1 - 0.18);
    KE.bb(T.dark, o.x0 - 0.03, o.x0 - 0.02, -o.hw + 0.20, o.hw - 0.20, o.z0 + 0.18, o.z0 + 0.20);
    for (j = -1; j <= 1; j += 2) {
      KE.rod(T.steel, [[o.x0 - 0.01, j * 0.55, o.z0 + 0.62], [o.x0 - 0.07, j * 0.55, o.z0 + 0.62],
                       [o.x0 - 0.07, j * 0.55, o.z0 + 0.82], [o.x0 - 0.01, j * 0.55, o.z0 + 0.82]], 0.014, 5);
      KE.bb(T.dark, o.x0 - 0.05, o.x0, j * (o.hw - 0.18), j * (o.hw - 0.32), o.z1 - 0.34, o.z1 - 0.24);
    }
    /* the top: a raised rim along both edges, transverse stiffening ribs
       (clear of the boom and the team stripe), and the two hinged access
       lids at the rear with their hinges and handles; on each side a proud
       stiffener over every panel joint */
    for (j = -1; j <= 1; j += 2) {
      KE.bb(T.skin, o.x0 + 0.05, o.x1 - 0.10, j * (o.hw - 0.12), j * (o.hw - 0.06), o.z1, o.z1 + 0.04);
      for (k = 0; k < o.seams.length; k++)
        KE.bb(T.skin, o.x0 + o.seams[k] - 0.035, o.x0 + o.seams[k] + 0.035, j * o.hw, j * (o.hw + 0.03), o.z0 + 0.22, o.z1 - 0.16);
      KE.bb(T.skin, o.x0 + 0.08, o.x0 + 0.62, j * 0.06, j * 0.62, o.z1, o.z1 + 0.025);
      KE.cyl(T.steel, 0.025, 0.50, 8, o.x0 + 0.66, j * 0.34, o.z1 + 0.02, "y");
      KE.rod(T.steel, [[o.x0 + 0.20, j * 0.30, o.z1 + 0.025], [o.x0 + 0.20, j * 0.30, o.z1 + 0.06],
                       [o.x0 + 0.20, j * 0.44, o.z1 + 0.06], [o.x0 + 0.20, j * 0.44, o.z1 + 0.025]], 0.012, 5);
    }
    for (k = 0; k < o.ribs.length; k++)
      KE.bb(T.skin, o.x0 + o.ribs[k] - 0.03, o.x0 + o.ribs[k] + 0.03, -(o.hw - 0.28), o.hw - 0.28, o.z1, o.z1 + 0.035);
    /* round each pod face: the frame and the four corner castings */
    for (i = 0; i < o.pods.length; i++) {
      yc = o.pods[i];
      for (j = -1; j <= 1; j += 2) {
        KE.bb(T.skin, o.x1 + 0.04, o.x1 + 0.07, yc + j * 0.525, yc + j * 0.475, zc - 0.42, zc + 0.42);
        for (k = -1; k <= 1; k += 2)
          KE.box(T.steel, 0.07, 0.08, 0.08, o.x1 + 0.045, yc + j * 0.49, zc + k * 0.38);
      }
      KE.bb(T.skin, o.x1 + 0.04, o.x1 + 0.065, yc - 0.475, yc + 0.475, zc + 0.39, zc + 0.42);
      KE.bb(T.skin, o.x1 + 0.04, o.x1 + 0.065, yc - 0.475, yc + 0.475, zc - 0.42, zc - 0.39);
    }
    /* the boom's hoist: two cables down from the cross frame to the hook
       blocks, stowed against the frame (M270 [R85][RIAT]; HIMARS [D]) */
    if (o.boom270) {
      for (j = -1; j <= 1; j += 2) {
        KE.bar(T.dark, [o.x1 - 0.05, j * 0.70, o.z1 + 0.04], [o.x1 - 0.05, j * 0.70, o.z1 - 0.30], 0.012, 5);
        KE.box(T.steel, 0.08, 0.10, 0.12, o.x1 - 0.05, j * 0.70, o.z1 - 0.34);
        KE.torus(T.steel, 0.04, 0.012, o.x1 - 0.05, j * 0.70, o.z1 - 0.43, Math.PI / 2, 0, 0);
      }
    }
    if (o.boom142) {
      for (j = -1; j <= 1; j += 2) {
        KE.bar(T.dark, [o.x0 + 0.26, j * 0.60, o.z1 + 0.30], [o.x0 + 1.60, j * 0.60, o.z1 + 0.10], 0.012, 5);
        KE.box(T.steel, 0.12, 0.10, 0.08, o.x0 + 0.50, j * 0.60, o.z1 + 0.27);
      }
    }
  }


  /* ----------------------------------------------------------------- M270 */
  /* Side stations off [R84] and [R85] (76.6 px a metre on the 6.85 m hull),
     +X nose: hull -3.42 .. +3.42; cab 0.70 .. 3.42, roof 2.40; deck 1.08;
     module -3.38 .. 0.62, top 2.46; tracks 0.53 wide, 2.97 m over both. */
  var WX270 = [2.11, 1.37, 0.35, -0.50, -1.49, -2.20], ZW = 0.37, RW = 0.30;
  var XS = 2.96, ZS = 0.62, RS = 0.33, XI = -2.98, ZI = 0.56, RI = 0.30;
  var TI = 0.955, TO = 1.485, TC = 1.22, TT = 0.07;
  /* the cab's cross-section table: station x, then the section [y, z] -
     full width over the tracks, the roof edges chamfered, the front corners
     taken in where the louvred upper front meets the lamp band [F][K98] */
  function sec270(hw, z0, z1, ct) { return [[-hw, z0], [hw, z0], [hw, z1 - ct], [hw - ct, z1], [-hw + ct, z1], [-hw, z1 - ct]]; }
  var CAB270 = [[0.70, sec270(1.45, 1.06, 2.40, 0.06)], [2.92, sec270(1.45, 1.06, 2.40, 0.06)],
                [3.40, sec270(1.40, 1.06, 1.52, 0.02)]];
  var F0 = [3.40, 1.52], F1 = [2.92, 2.40];          /* the sloped upper front, in side view */

  function m270Track(K, T, THREE, s) {
    var i, a, x, pts = [], segs = [], y0 = s * TI, y1 = s * TO;
    /* the loop's outer line: bottom run under the wheels, round the sprocket, the top run on the
       return rollers, round the idler */
    pts.push([WX270[5] - 0.05, 0], [WX270[0] + 0.05, 0]);
    for (i = 0; i <= 8; i++) { a = -Math.PI * 0.62 + Math.PI * 1.12 * i / 8; pts.push([XS + (RS + TT) * Math.cos(a), ZS + (RS + TT) * Math.sin(a)]); }
    for (i = 0; i <= 8; i++) { a = Math.PI / 2 + Math.PI * 0.92 * i / 8; pts.push([XI + (RI + TT) * Math.cos(a), ZI + (RI + TT) * Math.sin(a)]); }
    pts.push([WX270[5] - 0.05, 0]);
    for (i = 0; i < pts.length - 1; i++) {
      var p = pts[i], q = pts[i + 1], dx = q[0] - p[0], dz = q[1] - p[1], L = Math.sqrt(dx * dx + dz * dz);
      if (L < 1e-4) continue;
      var nx = -dz / L * TT, nz = dx / L * TT;                 /* inward (the loop runs anticlockwise) */
      K.prism(T.dark, [[p[0], p[1]], [q[0], q[1]], [q[0] + nx, q[1] + nz], [p[0] + nx, p[1] + nz]], y0, y1);
      /* links: an end connector across the outer face every 0.155 m */
      for (x = 0.08; x < L; x += 0.155) {
        var t = x / L;
        K.box(T.dark, 0.06, 0.03, TT * 0.8, p[0] + dx * t + nx * 0.5, s * (TO + 0.012), p[1] + dz * t + nz * 0.5, 0, -Math.atan2(dz, dx), 0);
      }
    }
    /* sprocket: drum, hub, and the two toothed rings each side of the guide teeth */
    K.cyl(T.dark, RS - 0.02, TO - TI - 0.04, 24, XS, s * TC, ZS, "y");
    K.cyl(T.steel, 0.13, 0.04, 12, XS, s * (TO + 0.005), ZS, "y");
    for (i = 0; i < 11; i++) {
      a = i * Math.PI * 2 / 11;
      K.put(T.steel, new THREE.BoxGeometry(0.07, 0.05, 0.07), XS + (RS - 0.02) * Math.cos(a), s * (TO - 0.02), ZS + (RS - 0.02) * Math.sin(a), 0, -a, 0);
      K.put(T.dark, new THREE.BoxGeometry(0.06, 0.03, 0.06), XS + 0.20 * Math.cos(a + 0.3), s * (TO - 0.005), ZS + 0.20 * Math.sin(a + 0.3), 0, -a, 0);
    }
    /* idler: a dished wheel with six lightening holes, its arm */
    K.cyl(T.dark, RI - 0.01, TO - TI - 0.04, 24, XI, s * TC, ZI, "y");
    K.cyl(T.steel, 0.10, 0.03, 12, XI, s * (TO + 0.0), ZI, "y");
    for (i = 0; i < 6; i++) { a = i * Math.PI / 3; K.cyl(T.steel, 0.045, 0.02, 8, XI + 0.18 * Math.cos(a), s * (TO - 0.005), ZI + 0.18 * Math.sin(a), "y"); }
    /* the return rollers under the top run, over the gaps between the second and third and the
       fourth and fifth road wheels [G19] */
    var RR = [0.86, -1.00];
    for (i = 0; i < 2; i++) {
      var zt = ZI + RI + (ZS + RS - ZI - RI) * (RR[i] - XI) / (XS - XI);
      K.cyl(T.dark, 0.09, TO - TI - 0.1, 12, RR[i], s * TC, zt - 0.09, "y");
      K.cyl(T.steel, 0.05, 0.03, 8, RR[i], s * (TO - 0.04), zt - 0.09, "y");
    }
  }

  /* one road-wheel station: the dual wheels of each side (rubber tyre, painted disc, hub), both
     sides in one mesh, axle on local Y through the group origin */
  function m270Wheel(W, T, hub) {
    var s, k, i, a, yc;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      yc = s * (k ? 1.355 : 1.085);
      W.vc = lin(0x1b1c1a);
      W.cyl(T.wheel, RW, 0.17, k ? 22 : 16, 0, yc, 0, "y");
      W.vc = lin(hub);
      W.cyl(T.wheel, 0.23, 0.18, k ? 16 : 10, 0, yc, 0, "y");
      if (!k) continue;                      /* the inner wheel hides behind the outer and the belt */
      W.vc = lin(0x2a2b27);
      W.cyl(T.wheel, 0.085, 0.20, 8, 0, yc, 0, "y");
      for (i = 0; i < 6; i++) {
        a = i * Math.PI / 3 + 0.26;
        W.box(T.wheel, 0.035, 0.02, 0.035, 0.15 * Math.cos(a), yc + s * 0.095, 0.15 * Math.sin(a), 0, -a, 0);
      }
    }
    W.vc = null;
  }

  /* The M270's own fittings on the hull and cab [F][G19][K98][RIAT][BST]:
     the shutters' armoured frames with their bolts, hinge knuckles and lift
     arms; the lamp clusters' guards; bolt rows and grab handles on the cab;
     the door hinges and the step; on the roof the periscopes round the
     hatch, the grab rails and a rolled camouflage net; the nose plate's
     bolted access panel and the hanging tow shackles; the tow cable, tools
     and tie-downs on the deck edges; the tail lamps' guards, the pintle and
     the rear grab handles. */
  function m270Detail(K, T, HW) {
    var s, i, k, x;
    function sp(u, h) {
      var dx = F1[0] - F0[0], dz = F1[1] - F0[1], L = Math.sqrt(dx * dx + dz * dz), nx = dz / L, nz = -dx / L;
      if (nx < 0) { nx = -nx; nz = -nz; }
      return [F0[0] + dx * u + nx * h, F0[1] + dz * u + nz * h];
    }
    var panes = [[-1.30, -0.48], [-0.38, 0.38], [0.48, 1.30]];
    for (i = 0; i < 3; i++) {
      var p0 = panes[i][0], p1 = panes[i][1], ym = (p0 + p1) / 2;
      /* bolt heads round the frame */
      for (k = 0; k < 6; k++) {
        var yb = p0 + 0.05 + k * (p1 - p0 - 0.10) / 5;
        K.onSlope(T.steel, F0, F1, 0.150, 0.170, 0.06, 0.085, yb - 0.015, yb + 0.015);
        K.onSlope(T.steel, F0, F1, 0.910, 0.930, 0.06, 0.085, yb - 0.015, yb + 0.015);
      }
      /* the hinge knuckles along the top and the two lift arms */
      var hp = sp(0.97, 0.06);
      for (k = 0; k < 3; k++) K.cyl(T.steel, 0.035, 0.14, 8, hp[0], p0 + 0.12 + k * (p1 - p0 - 0.24) / 2, hp[1], "y");
      for (k = -1; k <= 1; k += 2) {
        var a0 = sp(0.30, 0.06), a1 = sp(0.90, 0.10);
        K.bar(T.steel, [a0[0], ym + k * 0.22, a0[1]], [a1[0], ym + k * 0.22, a1[1]], 0.016, 5);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      /* the lamp clusters' guards: a bent bar over each */
      K.rod(T.steel, [[3.40, s * 0.94, 1.48], [3.49, s * 0.94, 1.48], [3.49, s * 1.34, 1.48], [3.40, s * 1.34, 1.48]], 0.014, 5);
      K.bar(T.steel, [3.49, s * 0.94, 1.48], [3.49, s * 0.94, 1.18], 0.014, 5);
      K.bar(T.steel, [3.49, s * 1.34, 1.48], [3.49, s * 1.34, 1.18], 0.014, 5);
      K.bar(T.steel, [3.49, s * 1.14, 1.48], [3.49, s * 1.14, 1.18], 0.010, 5);
      /* the tow shackle hanging in each nose eye */
      K.torus(T.steel, 0.06, 0.015, 3.44, s * 0.625, 0.80, Math.PI / 2, 0, 0, Math.PI);
      /* cab sides: bolt rows along the top and bottom edges, the door
         hinges, a grab handle at the door and one by the front corner, the
         step under the door */
      for (x = 0.82; x < 2.86; x += 0.20) {
        K.box(T.steel, 0.026, 0.02, 0.026, x, s * (HW + 0.006), 1.14);
        K.box(T.steel, 0.026, 0.02, 0.026, x, s * (HW + 0.006), 2.30);
      }
      for (k = 0; k < 2; k++) K.cyl(T.steel, 0.03, 0.16, 8, 2.31, s * (HW + 0.025), 1.42 + k * 0.62, "z");
      K.rod(T.steel, [[2.62, s * HW, 1.62], [2.62, s * (HW + 0.07), 1.62], [2.62, s * (HW + 0.07), 1.98], [2.62, s * HW, 1.98]], 0.014, 5);
      K.rod(T.steel, [[0.80, s * HW, 1.40], [0.80, s * (HW + 0.07), 1.40], [0.80, s * (HW + 0.07), 2.10], [0.80, s * HW, 2.10]], 0.014, 5);
      K.rod(T.steel, [[1.55, s * (HW - 0.04), 1.06], [1.55, s * (HW + 0.02), 0.84], [1.95, s * (HW + 0.02), 0.84], [1.95, s * (HW - 0.04), 1.06]], 0.016, 5);
      /* the roof grab rails on their posts */
      K.bar(T.steel, [0.95, s * 1.28, 2.50], [2.55, s * 1.28, 2.50], 0.016, 6);
      for (k = 0; k < 3; k++) K.bar(T.steel, [1.0 + k * 0.75, s * 1.28, 2.40], [1.0 + k * 0.75, s * 1.28, 2.50], 0.014, 5);
      /* deck edges: the tow cable along each side, its two eyes, and the
         tie-down rings */
      K.cyl(T.dark, 0.025, 3.10, 8, -1.55, s * 1.36, 1.115, "x");
      K.cyl(T.dark, 0.025, 3.10, 8, -1.55, s * 1.30, 1.115, "x");
      K.torus(T.steel, 0.07, 0.02, 0.05, s * 1.33, 1.115, 0, 0, 0);
      K.torus(T.steel, 0.07, 0.02, -3.15, s * 1.33, 1.115, 0, 0, 0);
      for (k = 0; k < 4; k++) K.box(T.steel, 0.05, 0.16, 0.035, -2.70 + k * 0.85, s * 1.33, 1.14);
      /* the tail: lamp guards and the rear grab handles */
      K.rod(T.steel, [[-3.42, s * 1.10, 1.06], [-3.466, s * 1.10, 1.06], [-3.466, s * 1.30, 1.06], [-3.42, s * 1.30, 1.06]], 0.012, 5);
      K.rod(T.steel, [[-3.42, s * 1.10, 0.90], [-3.466, s * 1.10, 0.90], [-3.466, s * 1.30, 0.90], [-3.42, s * 1.30, 0.90]], 0.012, 5);
      K.rod(T.steel, [[-3.42, s * 0.30, 0.92], [-3.466, s * 0.30, 0.92], [-3.466, s * 0.30, 1.04], [-3.42, s * 0.30, 1.04]], 0.012, 5);
    }
    /* tools on the deck edges: a pick and a shovel to port, a crowbar and
       a sledge to starboard, each in its clamps (NOT CONFIRMED: placed by
       the practice of US tracked carriers; no photograph here shows them) */
    K.cyl(T.dark, 0.022, 0.92, 8, -0.80, 1.34, 1.175, "x");
    K.bb(T.steel, -1.36, -1.24, 1.26, 1.42, 1.14, 1.21);
    K.cyl(T.dark, 0.020, 0.80, 8, -2.30, 1.34, 1.175, "x");
    K.bb(T.steel, -1.92, -1.66, 1.27, 1.41, 1.15, 1.19);
    K.cyl(T.steel, 0.018, 1.10, 6, -0.90, -1.34, 1.17, "x");
    K.cyl(T.dark, 0.022, 0.80, 8, -2.40, -1.34, 1.175, "x");
    K.bb(T.steel, -2.92, -2.78, -1.42, -1.26, 1.13, 1.22);
    for (k = 0; k < 3; k++) {
      K.bb(T.dark, -0.55 - k * 0.90, -0.50 - k * 0.90, 1.24, 1.44, 1.10, 1.21);
      K.bb(T.dark, -0.55 - k * 0.90, -0.50 - k * 0.90, -1.44, -1.24, 1.10, 1.21);
    }
    /* the roof: periscopes round the commander's hatch, its hinge, the
       rolled camouflage net strapped across the roof's rear edge [F] */
    for (i = 0; i < 4; i++) {
      var pa = -0.8 + i * 0.55;
      K.box(T.dark, 0.13, 0.11, 0.08, 1.45 + Math.cos(pa) * 0.40, 0.55 + Math.sin(pa) * 0.40, 2.44, 0, 0, pa);
      K.box(T.glass, 0.02, 0.08, 0.05, 1.45 + Math.cos(pa) * 0.465, 0.55 + Math.sin(pa) * 0.465, 2.445, 0, 0, pa);
    }
    K.bb(T.steel, 1.10, 1.18, 0.35, 0.75, 2.40, 2.47);
    K.cyl(T.skin, 0.07, 2.30, 12, 0.88, 0, 2.47, "y");
    for (k = -1; k <= 1; k++) K.cyl(T.dark, 0.075, 0.05, 12, 0.88, k * 0.80, 2.47, "y");
    /* the nose plate's bolted access panel */
    var N0 = [2.75, 0.45], N1 = [3.40, 0.98];
    K.onSlope(T.dark, N0, N1, 0.25, 0.27, 0.0, 0.012, -0.90, 0.90);
    K.onSlope(T.dark, N0, N1, 0.85, 0.87, 0.0, 0.012, -0.90, 0.90);
    for (k = 0; k < 8; k++) {
      var yy = -0.84 + k * 0.24;
      K.onSlope(T.steel, N0, N1, 0.30, 0.33, 0.0, 0.025, yy - 0.015, yy + 0.015);
      K.onSlope(T.steel, N0, N1, 0.80, 0.83, 0.0, 0.025, yy - 0.015, yy + 0.015);
    }
    /* the towing pintle on the tail beam */
    K.bb(T.steel, -3.48, -3.42, -0.10, 0.10, 0.66, 0.80);
  }

  function buildM270(THREE, T, V) {
    var root = new THREE.Group(), K = new Baker(THREE), KT = new Baker(THREE);
    var s, i, x, k, DECK = 1.08, HW = 1.45;

    for (s = -1; s <= 1; s += 2) m270Track(K, T, THREE, s);
    /* the lower hull between the tracks: belly 0.45 m off the ground, the nose
       sloping up to the cab front, the rear plate upright [R84][F] */
    K.prism(T.skin, [[-3.30, 0.45], [2.75, 0.45], [3.40, 0.98], [3.40, 1.06], [-3.42, 1.06], [-3.42, 0.58]], -TI + 0.005, TI - 0.005);
    /* the deck over the tracks behind the cab, with its edge lip [R84] */
    K.bb(T.skin, -3.42, 0.70, -HW, HW, 0.98, DECK);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, -3.40, 0.70, s * (HW - 0.01), s * (HW + 0.025), 0.95, 1.03);
      /* the front fender over the sprocket, ahead of the cab's lower edge */
      K.bb(T.dark, 0.70, 3.36, s * (TI - 0.01), s * (HW + 0.025), 0.98, 1.06);
    }
    /* the cab, lofted from CAB270 */
    K.loft(T.skin, CAB270);
    /* the three louvred armoured shutters on the sloped front, lowered as in
       the firing photographs: a dark recess, the frame, five slats [F][S] */
    var panes = [[-1.30, -0.48], [-0.38, 0.38], [0.48, 1.30]];
    for (i = 0; i < 3; i++) {
      var p0 = panes[i][0], p1 = panes[i][1];
      K.onSlope(T.dark, F0, F1, 0.16, 0.92, -0.01, 0.025, p0, p1);
      K.onSlope(T.skin, F0, F1, 0.14, 0.18, 0.0, 0.06, p0 - 0.03, p1 + 0.03);
      K.onSlope(T.skin, F0, F1, 0.90, 0.94, 0.0, 0.06, p0 - 0.03, p1 + 0.03);
      K.onSlope(T.skin, F0, F1, 0.14, 0.94, 0.0, 0.06, p0 - 0.03, p0);
      K.onSlope(T.skin, F0, F1, 0.14, 0.94, 0.0, 0.06, p1, p1 + 0.03);
      for (k = 0; k < 6; k++) K.onSlope(T.skin, F0, F1, 0.22 + k * 0.115, 0.27 + k * 0.115, 0.01, 0.055, p0, p1);
    }
    /* the lamp band: a cluster at each outer end - guard, two lamps [F][G19] */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, 3.40, 3.46, s * 0.96, s * 1.32, 1.20, 1.44);
      K.mouth(T.glass, 0.055, 12, 3.465, s * 1.06, 1.32);
      K.mouth(T.glass, 0.055, 12, 3.465, s * 1.22, 1.32);
      /* tow eyes and the shackles below them on the nose [F] */
      K.bb(T.steel, 3.36, 3.48, s * 0.55, s * 0.70, 0.94, 1.04);
      K.cyl(T.steel, 0.05, 0.06, 10, 3.47, s * 0.625, 0.88, "y");
      /* rear: tail lamps, tow eyes */
      K.box(T.glass, 0.03, 0.14, 0.10, -3.435, s * 1.20, 0.98);
      K.bb(T.steel, -3.48, -3.40, s * 0.50, s * 0.62, 0.70, 0.82);
      /* cab sides: the door seam, a vision block and handholds; the side of
         the cab block steps in at its lower edge */
      K.box(T.dark, 0.022, 0.02, 1.05, 2.30, s * (HW + 0.002), 1.68);
      K.box(T.dark, 0.022, 0.02, 1.05, 1.20, s * (HW + 0.002), 1.68);
      K.box(T.dark, 1.12, 0.02, 0.022, 1.75, s * (HW + 0.002), 2.21);
      K.box(T.dark, 0.36, 0.024, 0.20, 1.75, s * (HW + 0.004), 2.03);
      K.box(T.glass, 0.30, 0.03, 0.14, 1.75, s * (HW + 0.008), 2.03);
      K.box(T.steel, 0.30, 0.04, 0.03, 1.75, s * (HW + 0.025), 1.55);
      K.box(T.steel, 0.03, 0.04, 0.30, 2.62, s * (HW + 0.025), 1.80);
      /* the roof's rear corners: antenna bases [R84] */
      K.cyl(T.steel, 0.06, 0.10, 8, 0.95, s * 1.20, 2.45, "z");
    }
    /* roof: the commander's hatch and a vision block, the team panel */
    K.cyl(T.steel, 0.30, 0.06, 16, 1.45, 0.55, 2.43, "z");
    K.cyl(T.dark, 0.24, 0.065, 16, 1.45, 0.55, 2.435, "z");
    K.bb(T.dark, 2.40, 2.70, -0.30, 0.30, 2.40, 2.46);
    K.bb(T.team, 1.85, 2.30, -1.05, 0.05, 2.40, 2.42);
    /* the rear plate: a stowage box and the tail beam */
    K.bb(T.dark, -3.46, -3.42, -0.80, 0.80, 0.62, 0.98);

    /* the module on its traverse ring: ring centre -1.30, the module 4.0 m,
       its rear trunnion 0.18 m in from its rear face, front 0.08 m clear of
       the cab's rear wall */
    var RX = -1.30, KE = new Baker(THREE), cells;
    KT.cyl(T.dark, 0.95, 0.10, 26, 0, 0, 0.05, "z");
    var MO = { hw: 1.22, x0: -2.08, x1: 1.92, z0: 0.20, z1: 1.38, pods: [0.585, -0.585],
               kinds: [V.pods, V.pods], px: -1.90, pz: 0.20, boom270: true,
               posts: [-0.585, 0, 0.585], seams: [0.25, 1.35, 2.55, 3.70], ribs: [0.95, 1.35, 2.78, 3.62] };
    cells = launcher(KT, KE, T, MO);
    moduleDetail(KE, T, MO);
    m270Detail(K, T, HW);
    if (V.louvre) {
      /* the louvred panel low on the port side of the module, near its front [G19] */
      KE.bb(T.dark, 0.70, 1.55, 1.222, 1.236, 0.38, 0.92);
      for (i = 0; i < 6; i++) KE.bb(T.steel, 0.72, 1.53, 1.230, 1.248, 0.42 + i * 0.085, 0.45 + i * 0.085);
    }
    K.flush(root);
    var G = new THREE.Group();
    G.position.set(RX, 0, DECK);
    KT.flush(G);
    G.add(elevGroup(THREE, KE, -1.90, 0.20, cells));
    if (V.turret) G.name = "turret";
    root.add(G);

    /* the six road-wheel stations [R84][R85] */
    for (i = 0; i < 6; i++) {
      var W = new Baker(THREE), wg = new THREE.Group();
      m270Wheel(W, T, PAINT[V.paint].hub);
      W.flush(wg);
      wg.name = "roadwheel";
      wg.position.set(WX270[i], 0, ZW);
      root.add(wg);
    }
    return root;
  }

  /* --------------------------------------------------------------- HIMARS */
  /* Side stations off the drawing [D] scaled to the published 7.0 m (105 px a
     metre), heights off [H14] (the 1.18 m tyre as the yardstick, cab roof
     2.98 m) and the published 3.2 m (the roof hatch ring is the top):
     bumper +3.50; cab 1.77 .. 3.38; axles +2.32, -0.92, -2.16; module
     -3.39 .. +0.20, top 2.60; rear -3.50. */
  var AX142 = [2.32, -0.92, -2.16], RT = 0.59, YT = 0.99;
  function sec142(hw, z0, z1, ct) { return [[-hw, z0], [hw, z0], [hw, z1 - ct], [hw - ct, z1], [-hw + ct, z1], [-hw, z1 - ct]]; }
  /* the armoured cab: flat sides, the front corners chamfered in, the upper
     front raked back to the roof [H14][H07][D] */
  var CAB142 = [[1.77, sec142(1.17, 1.22, 2.98, 0.08)], [3.04, sec142(1.17, 1.22, 2.98, 0.08)],
                [3.30, sec142(1.04, 1.24, 2.32, 0.03)], [3.38, sec142(0.96, 1.26, 2.24, 0.02)]];
  var G0 = [3.33, 2.30], G1 = [3.04, 2.98];          /* the raked upper front, in side view */

  /* one 395/85R20 tyre: lugged tread, the painted wheel with its nut ring */
  function tyre(W, T, THREE, hub) {
    var i, a, j;
    W.vc = lin(0x1b1c1a);
    W.cyl(T.wheel, RT - 0.035, 0.38, 32, 0, 0, 0, "y");
    W.cyl(T.wheel, RT - 0.10, 0.40, 24, 0, 0, 0, "y");
    for (i = 0; i < 30; i++) {
      a = i * Math.PI * 2 / 30;
      W.put(T.wheel, new THREE.BoxGeometry(0.055, 0.17, 0.12), (RT - 0.02) * Math.cos(a), (i & 1 ? 0.095 : -0.095), (RT - 0.02) * Math.sin(a), 0, -a, 0);
    }
    W.vc = lin(hub);
    for (j = -1; j <= 1; j += 2) { W.cyl(T.wheel, 0.36, 0.03, 20, 0, j * 0.19, 0, "y"); W.cyl(T.wheel, 0.30, 0.04, 20, 0, j * 0.175, 0, "y"); }
    W.vc = lin(0x2a2b27);
    for (j = -1; j <= 1; j += 2) {
      W.cyl(T.wheel, 0.12, 0.05, 12, 0, j * 0.21, 0, "y");
      for (i = 0; i < 10; i++) { a = i * Math.PI / 5; W.box(T.wheel, 0.04, 0.03, 0.04, 0.20 * Math.cos(a), j * 0.205, 0.20 * Math.sin(a), 0, -a, 0); }
    }
    W.vc = null;
  }

  /* The HIMARS' own fittings [H14][H07][HS18][D]: the windscreens'
     armoured frames, their bolts and wipers; the louvred grilles low on the
     chamfered front corners; the door's hinges, grab handle and armoured
     window frame; the mirrors on their arms; the lenses in the roof marker
     lamps; the headlamp guards, tow shackles and step hangers on the bumper;
     the mudflaps behind the front tyres; the roof grab rails; the tail
     lamps' guards and the pintle; stowage behind the cab. */
  function himarsDetail(K, T, CHW) {
    var s, i, k;
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 0.10, y1 = s * 0.86;
      K.onSlope(T.skin, G0, G1, 0.12, 0.18, 0.0, 0.07, y0, y1);
      K.onSlope(T.skin, G0, G1, 0.76, 0.82, 0.0, 0.07, y0, y1);
      K.onSlope(T.skin, G0, G1, 0.12, 0.82, 0.0, 0.07, y1 - s * 0.05, y1);
      K.onSlope(T.skin, G0, G1, 0.12, 0.82, 0.0, 0.07, y0, y0 + s * 0.05);
      for (k = 0; k < 5; k++) {
        var yb = s * (0.16 + k * 0.165);
        K.onSlope(T.steel, G0, G1, 0.140, 0.160, 0.07, 0.09, yb - 0.014, yb + 0.014);
        K.onSlope(T.steel, G0, G1, 0.780, 0.800, 0.07, 0.09, yb - 0.014, yb + 0.014);
      }
      /* the wiper, parked along the bottom of the pane */
      K.onSlope(T.steel, G0, G1, 0.20, 0.23, 0.04, 0.06, s * 0.20, s * 0.70);
      /* the louvred grille on the chamfered corner panel [HS18] */
      var a = Math.atan2(-0.13 * s, 0.26), nx = 0.13 / 0.29, ny = s * 0.26 / 0.29;
      K.box(T.dark, 0.24, 0.02, 0.22, 3.17 + nx * 0.006, s * 1.105 + ny * 0.006, 1.48, 0, 0, a);
      for (k = 0; k < 4; k++)
        K.box(T.steel, 0.24, 0.025, 0.022, 3.17 + nx * 0.016, s * 1.105 + ny * 0.016, 1.40 + k * 0.055, 0, 0, a);
      K.box(T.skin, 0.28, 0.03, 0.03, 3.17 + nx * 0.012, s * 1.105 + ny * 0.012, 1.605, 0, 0, a);
      K.box(T.skin, 0.28, 0.03, 0.03, 3.17 + nx * 0.012, s * 1.105 + ny * 0.012, 1.355, 0, 0, a);
      /* door: two hinges on the front edge, the long grab handle on the
         rear edge, the armoured frame round the window [HS18] */
      for (k = 0; k < 2; k++) K.cyl(T.steel, 0.03, 0.18, 8, 2.98, s * (CHW + 0.02), 1.55 + k * 0.80, "z");
      K.rod(T.steel, [[2.14, s * CHW, 1.55], [2.14, s * (CHW + 0.07), 1.55], [2.14, s * (CHW + 0.07), 2.45], [2.14, s * CHW, 2.45]], 0.016, 6);
      K.bb(T.skin, 2.53, 2.97, s * CHW, s * (CHW + 0.03), 2.31, 2.35);
      K.bb(T.skin, 2.53, 2.97, s * CHW, s * (CHW + 0.03), 2.65, 2.69);
      K.bb(T.skin, 2.53, 2.57, s * CHW, s * (CHW + 0.03), 2.31, 2.69);
      K.bb(T.skin, 2.93, 2.97, s * CHW, s * (CHW + 0.03), 2.31, 2.69);
      K.bb(T.steel, 2.30, 2.40, s * CHW, s * (CHW + 0.03), 2.00, 2.06);          /* door latch */
      /* the mirror: an arm off the cab's front top corner, the head below it */
      K.rod(T.steel, [[3.02, s * (CHW - 0.02), 2.84], [3.10, s * (CHW + 0.14), 2.86], [3.10, s * (CHW + 0.20), 2.74]], 0.018, 6);
      K.bar(T.steel, [3.04, s * (CHW - 0.02), 2.44], [3.10, s * (CHW + 0.20), 2.52], 0.014, 6);
      K.bb(T.dark, 3.07, 3.13, s * (CHW + 0.12), s * (CHW + 0.28), 2.46, 2.76);
      K.bb(T.glass, 3.055, 3.07, s * (CHW + 0.14), s * (CHW + 0.26), 2.49, 2.73);
      /* the cab front corner grab handle */
      K.rod(T.steel, [[3.06, s * (CHW - 0.02), 1.70], [3.10, s * (CHW + 0.04), 1.70], [3.10, s * (CHW + 0.04), 2.30], [3.06, s * (CHW - 0.02), 2.30]], 0.014, 5);
      /* roof grab rails on their posts */
      K.bar(T.steel, [1.95, s * 1.02, 3.05], [2.95, s * 1.02, 3.05], 0.016, 6);
      for (k = 0; k < 3; k++) K.bar(T.steel, [2.0 + k * 0.45, s * 1.02, 2.98], [2.0 + k * 0.45, s * 1.02, 3.05], 0.014, 5);
      /* bumper: the headlamp guards, the tow shackles, the step hangers */
      K.rod(T.steel, [[3.52, s * 0.52, 0.84], [3.56, s * 0.52, 1.03], [3.56, s * 0.98, 1.03], [3.52, s * 0.98, 0.84]], 0.014, 5);
      K.bar(T.steel, [3.56, s * 0.74, 1.03], [3.54, s * 0.74, 0.84], 0.012, 5);
      K.torus(T.steel, 0.055, 0.015, 3.49, s * 0.36, 0.76, Math.PI / 2, 0, 0, Math.PI);
      K.bar(T.steel, [2.96, s * (CHW + 0.08), 0.60], [2.96, s * (CHW + 0.08), 1.20], 0.016, 5);
      K.bar(T.steel, [3.34, s * (CHW + 0.08), 0.60], [3.34, s * (CHW + 0.08), 1.20], 0.016, 5);
      /* the front mudguard's raked rear and front ends round the tyre [HS18] */
      K.prism(T.skin, [[1.56, 0.98], [1.62, 0.96], [1.80, 1.20], [1.75, 1.25]], s * 0.72, s * 1.20);
      K.prism(T.skin, [[2.95, 1.20], [3.02, 1.25], [3.16, 1.06], [3.10, 1.02]], s * 0.72, s * 1.20);
      /* the mudflap behind the front tyre, ribbed */
      K.bb(T.dark, 1.70, 1.73, s * 0.72, s * 1.18, 0.40, 1.20);
      for (k = 0; k < 3; k++) K.bb(T.dark, 1.68, 1.70, s * 0.74, s * 1.16, 0.50 + k * 0.20, 0.53 + k * 0.20);
      /* the tail: lamp guards, the rear tow eyes */
      K.rod(T.steel, [[-3.45, s * 0.88, 1.20], [-3.48, s * 0.88, 1.20], [-3.48, s * 1.08, 1.20], [-3.45, s * 1.08, 1.20]], 0.012, 5);
      K.torus(T.steel, 0.05, 0.014, -3.42, s * 0.55, 0.88, Math.PI / 2, 0, 0, Math.PI);
    }
    /* lenses in the five roof marker lamps (amber, drawn glass) */
    for (i = 0; i < 5; i++) K.bb(T.glass, 3.08, 3.09, -0.70 + i * 0.35 - 0.04, -0.70 + i * 0.35 + 0.04, 2.96, 3.02);
    /* the gunner's hatch hinge and two periscopes beside it */
    K.bb(T.steel, 1.78, 1.86, 0.10, 0.50, 3.00, 3.07);
    K.bb(T.dark, 2.48, 2.60, 0.62, 0.78, 2.98, 3.06);
    K.bb(T.glass, 2.60, 2.61, 0.64, 0.76, 2.99, 3.05);
    /* the towing pintle */
    K.bb(T.steel, -3.50, -3.42, -0.10, 0.10, 0.88, 1.00);
    /* stowage behind the cab (NOT CONFIRMED: a rolled tarpaulin on the
       starboard locker and two water cans on the port box, as field
       photographs of FMTV cabs commonly show) */
    K.cyl(T.skin, 0.12, 0.56, 12, 1.33, -0.85, 2.67, "y");
    for (k = -1; k <= 1; k += 2) K.cyl(T.dark, 0.125, 0.04, 12, 1.33, -0.85 + k * 0.18, 2.67, "y");
    for (k = 0; k < 2; k++) {
      K.bb(T.skin, 0.62 + k * 0.30, 0.86 + k * 0.30, 0.62, 0.78, 2.28, 2.72);
      K.bb(T.steel, 0.70 + k * 0.30, 0.78 + k * 0.30, 0.66, 0.74, 2.72, 2.76);
    }
  }

  function buildHimars(THREE, T, V) {
    var root = new THREE.Group(), K = new Baker(THREE), KT = new Baker(THREE);
    var s, i, j, DECK = 1.22, CHW = 1.17;

    /* chassis: frame rails, cross members, axle housings, the tandem's walking beams */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, -3.42, 3.30, s * 0.52, s * 0.38, 0.82, 1.08);
    for (i = 0; i < 6; i++) K.bb(T.dark, -3.3 + i * 1.25, -3.3 + i * 1.25 + 0.10, -0.52, 0.52, 0.86, 1.04);
    for (i = 0; i < 3; i++) {
      K.cyl(T.dark, 0.09, 1.70, 10, AX142[i], 0, RT, "y");
      K.box(T.dark, 0.42, 0.36, 0.34, AX142[i], 0, RT);
    }
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, AX142[2] - 0.15, AX142[1] + 0.15, s * 0.62, s * 0.50, 0.50, 0.70);
    /* port, under the frame between the axles: battery box and the three air tanks [D];
       starboard: the fuel tank [H14] */
    K.bb(T.skin, 0.28, 1.18, 0.55, 1.08, 0.66, 1.10);
    for (i = 0; i < 3; i++) K.cyl(T.dark, 0.12, 0.50, 12, -0.10 + i * 0.27, 0.82, 0.62, "y");
    K.bb(T.skin, -0.30, 1.30, -1.08, -0.55, 0.64, 1.10);
    K.bb(T.dark, -0.30, 1.30, -1.09, -1.08, 0.88, 0.90);

    /* the cab, lofted from CAB142 */
    K.loft(T.skin, CAB142);
    /* the two windscreens in the raked upper front, framed [H14][H07] */
    for (s = -1; s <= 1; s += 2) {
      K.onSlope(T.dark, G0, G1, 0.14, 0.80, -0.01, 0.025, s * 0.10, s * 0.86);
      K.onSlope(T.glass, G0, G1, 0.18, 0.76, 0.0, 0.035, s * 0.14, s * 0.82);
    }
    /* lamps along the roof's front edge [H14] */
    for (i = 0; i < 5; i++) K.bb(T.steel, 2.98, 3.08, -0.70 + i * 0.35 - 0.06, -0.70 + i * 0.35 + 0.06, 2.95, 3.03);
    /* the lower front: grille field and bars, the bumper, round lamps, tow shackles [H14][H07] */
    K.bb(T.dark, 3.38, 3.40, -0.62, 0.62, 1.30, 1.64);
    for (i = 0; i < 4; i++) K.bb(T.skin, 3.39, 3.42, -0.58, 0.58, 1.35 + i * 0.08, 1.38 + i * 0.08);
    /* the bolted armour plate of the lower front [H14][H07] */
    for (i = 0; i < 7; i++) for (j = 0; j < 2; j++) K.box(T.steel, 0.02, 0.035, 0.035, 3.385, -0.84 + i * 0.28, 1.78 + j * 0.36);
    K.bb(T.dark, 3.36, 3.52, -1.14, 1.14, 0.78, 1.08);
    for (s = -1; s <= 1; s += 2) {
      K.mouth(T.glass, 0.075, 14, 3.525, s * 0.86, 0.93);
      K.mouth(T.glass, 0.050, 12, 3.525, s * 0.62, 0.93);
      K.bb(T.steel, 3.50, 3.58, s * 0.30, s * 0.42, 0.82, 0.96);
      /* cab sides: door seams, the small high window, handle, steps, bolt rows [H14][D] */
      K.box(T.dark, 0.022, 0.02, 1.30, 2.05, s * (CHW + 0.002), 2.05);
      K.box(T.dark, 0.022, 0.02, 1.30, 3.00, s * (CHW + 0.002), 2.05);
      K.box(T.dark, 0.95, 0.02, 0.022, 2.52, s * (CHW + 0.002), 2.72);
      K.box(T.dark, 0.40, 0.024, 0.32, 2.75, s * (CHW + 0.004), 2.50);
      K.box(T.glass, 0.34, 0.03, 0.26, 2.75, s * (CHW + 0.008), 2.50);
      K.box(T.steel, 0.16, 0.04, 0.035, 2.20, s * (CHW + 0.02), 1.98);
      for (i = 0; i < 2; i++) K.bb(T.dark, 2.95, 3.35, s * (CHW - 0.02), s * (CHW + 0.10), 0.62 + i * 0.30, 0.66 + i * 0.30);
      for (i = 0; i < 6; i++) for (j = 0; j < 3; j++) K.box(T.steel, 0.035, 0.02, 0.035, 1.90 + i * 0.22, s * (CHW + 0.004), 1.40 + j * 0.62);
      /* mirror stubs on the front corners */
      K.bb(T.dark, 3.05, 3.12, s * CHW, s * (CHW + 0.10), 2.55, 2.85);
      /* fenders over the front tyres and the tandem */
      K.bb(T.skin, 1.75, 2.95, s * 0.70, s * 1.20, 1.20, 1.25);
      K.bb(T.skin, -2.88, -0.20, s * 0.70, s * 1.20, 1.20, 1.25);
      K.bb(T.dark, -2.88, -2.84, s * 0.75, s * 1.18, 0.62, 1.20);
      /* rear lamps and the tail beam */
      K.box(T.glass, 0.04, 0.14, 0.12, -3.47, s * 0.98, 1.12);
      K.bb(T.dark, -3.50, -3.36, s * 0.86, s * 1.12, 1.02, 1.25);
    }
    K.bb(T.dark, -3.48, -3.40, -0.95, 0.95, 0.86, 1.00);
    /* roof: the gunner's hatch ring [H14], antenna bases, the team panel */
    K.cyl(T.steel, 0.36, 0.08, 20, 2.15, 0.30, 3.02, "z");
    K.cyl(T.dark, 0.28, 0.085, 20, 2.15, 0.30, 3.025, "z");
    K.cyl(T.steel, 0.05, 0.10, 8, 1.90, -0.90, 3.03, "z");
    K.bb(T.team, 2.30, 2.90, -1.00, -0.10, 2.98, 3.00);
    /* behind the cab, port: the intake tower with its air cleaner drum and the box [D];
       starboard: the tall locker and the box under it [H14] */
    K.bb(T.skin, 1.40, 1.74, 0.62, 1.12, 1.25, 2.96);
    K.cyl(T.skin, 0.24, 0.42, 16, 1.38, 0.87, 2.15, "y");
    K.bb(T.skin, 0.55, 1.30, 0.55, 1.12, 1.55, 2.28);
    K.box(T.dark, 0.60, 0.012, 0.02, 0.925, 1.126, 1.95);
    K.bb(T.skin, 0.95, 1.72, -1.15, -0.55, 1.35, 2.55);
    for (i = 0; i < 2; i++) K.box(T.dark, 0.012, 0.012, 1.0, 1.10 + i * 0.47, -1.156, 1.95);
    K.bb(T.skin, 0.30, 0.92, -1.15, -0.55, 1.25, 1.85);
    /* the rear deck under the module, narrower than the tyres' inner faces */
    K.bb(T.skin, -3.45, 0.30, -0.76, 0.76, 1.06, DECK);

    /* the module over the tandem: ring centre -1.60; the access panels and
       the boom mirrored with it (see the header) */
    var RX = -1.60, KE = new Baker(THREE), cells;
    KT.cyl(T.dark, 0.80, 0.10, 24, 0, 0, 0.05, "z");
    var MO = { hw: 1.07, x0: -1.79, x1: 1.80, z0: 0.20, z1: 1.38, pods: [0],
               kinds: [V.pods], px: -1.60, pz: 0.20, boom142: true,
               posts: [-0.60, 0.60], seams: [0.20, 1.00, 2.10, 3.25], ribs: [2.45, 2.90, 3.35] };
    cells = launcher(KT, KE, T, MO);
    moduleDetail(KE, T, MO);
    himarsDetail(K, T, CHW);
    K.flush(root);
    var G = new THREE.Group();
    G.position.set(RX, 0, DECK);
    KT.flush(G);
    G.add(elevGroup(THREE, KE, -1.60, 0.20, cells));
    if (V.turret) G.name = "turret";
    root.add(G);

    /* six lugged tyres, each a group "roadwheel" with the axle on local Y */
    var W = new Baker(THREE), tmp = new THREE.Group(), wm, wg;
    tyre(W, T, THREE, PAINT[V.paint].hub);
    W.flush(tmp);
    wm = tmp.children[0];
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX142[i], s * YT, RT);
      wg.add(new THREE.Mesh(wm.geometry, wm.material));
      wg.children[0].castShadow = true; wg.children[0].receiveShadow = true;
      root.add(wg);
    }
    return root;
  }

  function build(key, THREE, M, C) {
    var V = ROWS[key], T = makeMats(THREE, C, V.paint);
    var root = V.veh === "m270" ? buildM270(THREE, T, V) : buildHimars(THREE, T, V);
    root.name = key;
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build, rows: ROWS };
})();

(function () {
  var k, rows = HeroUsMlrs.rows;
  /* len: the measured X extent (dump.js), the same in every row of a vehicle */
  function reg(key, len) {
    UNIT_MODELS[key] = { len: len, ord: rows[key].ord,
                         build: function (THREE, M, C) { return HeroUsMlrs.build(key, THREE, M, C); } };
  }
  for (k in rows) if (Object.prototype.hasOwnProperty.call(rows, k)) reg(k, rows[k].veh === "m270" ? 7.00 : 7.08);
})();
