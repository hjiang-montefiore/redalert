/* ============================================================================
   factory_armour_plant.js -- HERO model: the War Factory as an armoured-
   vehicle final-assembly plant. Registered as BLD_MODELS["factory"], the one
   building def every army builds in every era (rules.js BUILDINGS.factory,
   "Assembles armoured vehicles", 3 x 3 tiles). It replaces the sawtooth shed
   in units3d_salvage.js, whose one tank door faced EAST although game.js
   spawnUnit() puts every new vehicle on the SOUTH side, and which cost 383
   draw calls for a structure 1.6 of which stand in every base.

   What was measured, and where from (Wikimedia Commons unless said):
     - "Chrysler Detroit Tank Plant 1942" (NARA, the presidential visit):
       the Detroit Tank Arsenal, Albert Kahn, 1941. A high-bay hall whose
       walls are glazed almost to the eaves in steel sash, a roofline of
       repeated pitched lights over the side bays and a taller roof,
       glazed down its slope, over the main bay, a rail siding along the
       building, and Shermans running on bare earth in front of it.
     - "M3 tank production LOC fsa.8b00695" and "US Army Detroit Tank Plant"
       (the same plant inside): the column grid with crane rails on the
       columns, a bridge crane across the bay, several assembly lines side
       by side down the bay, and a vehicle door in the end wall at the
       foot of the lines.
     - "M1 Abrams hull at Joint Systems Manufacturing Center-Lima in 2021":
       Lima today, painted hulls on the line under yellow overhead cranes.
     - "Sergey Shoigu on UVZ (2019-08-12)" 02 and 04 (mil.ru): Nizhny Tagil,
       the same language - a high steel-trussed hall with roof glazing,
       orange bridge cranes, hulls already in green paint on the line.
       Uralvagonzavod was built in 1931-36, when Moscow hired American
       firms - Albert Kahn Associates of Detroit above all - to help design
       its big plants on the pattern of Ford's River Rouge, and its design
       followed American practice (en.wikipedia "Uralvagonzavod"). That is
       why a Soviet and an American tank plant look like one building.
     - "Detroit Arsenal Tank Plant" (2014): the modern re-clad hall, metal
       sheeting with a coloured band at the roof line.
     - "DODX 40502" (2022), "Off the rail car 140507-A-SJ786-006", "Combined
       Resolve III 141018-A-IR813-003" and "Duelmen, Bahnhof, Verladerampe
       -- 2019 -- 3337": tanks leave by rail, driven up a concrete end ramp
       at deck height and along the cars; the ramp is a raised concrete
       platform with kerbed edges and a slope down to the yard.
     - The four-axle flat wagon model 13-401, the one armies of the 1520
       mm gauge move tanks on, from the builder's tables as vagon.by and
       agonta.com reproduce them: 13.4 m over the end beams, 14.62 m over
       the couplers, floor 2.87 m wide and 1.31 m over the rail head,
       bogie centres 9.72 m, couplers 1.04-1.08 m up. ru.wikipedia
       "Platforma (vagon)": its end boards fold down to make the bridge a
       vehicle drives over onto it under its own power.

   Corrections to the survey's notes:
     - "hull and turret castings": half right. The turrets of the cast-
       turret generation (T-55 to T-72, M48/M60) are castings; hulls are
       castings on the American side (the M48, and the M60's "cast armor
       turret and hull", en.wikipedia "M60 tank") but welded rolled plate
       on the Soviet one, T-54 to T-90. Whichever, a hull comes to final
       assembly as a finished shell, and in the Lima 2021 and UVZ 2019
       photographs (both upgrade lines) it is already in paint. So the
       laydown carries painted hull SHELLS and dark raw turret castings.
     - the 6 x 6 m door: a door in a 6 m column bay can be no wider than
       the bay, and a tank is 3.5-3.7 m wide and under 3 m tall, so the
       doors here are 5.2 m structural openings, 5.0 m clear inside their
       steel frames, and 5.5 m high: two in the south end wall, one per
       assembly line between its columns, and one in the east side wall
       in a double bay whose middle post is left out.
     - a paint-shop annex is in none of the photographs used here, so it
       is left out rather than guessed at.

   THE LAYOUT, on the 60 x 60 m plot (+X east, +Y north, +Z up, metres).
   render3d does not rescale structures (it multiplies by CFG.BLD_SCALE),
   so everything is real size and stays inside +/-29.8.
     - The assembly hall, x -6..24, y -20..24: one 30 m crane bay, 13 m to
       the eaves, five north-light teeth of 8.8 m rising 3.6 m, the glazed
       faces NORTH, which is also toward the default camera (render3d yaw
       -45 deg puts it over model +X,+Y). Column pilasters every 4.4 m
       down the long walls and 6 m across the ends, a continuous
       clerestory ribbon under the eaves, and the roof-line band in the
       owner's colour, as on the re-clad Detroit hall.
     - The two line doors are in the SOUTH end wall, centred x 3 and 15,
       because game.js spawnUnit() sets every new vehicle down on the
       tile row south of the plot, centred on x 0. The west one stands
       open onto the dark bay; the east one is shut. A third, open, is in
       the EAST side wall onto the run-in track, as the 1942 photograph
       has Shermans running on bare earth along the hall's long face: it
       is the one door the default camera sees.
     - The rail spur runs down the west side to an end-loading ramp at the
       south of the yard; the first wagon, against the ramp, carries a
       finished tank; the second, under the gantry, a hull shell come in.
     - A goliath gantry crane on ground rails straddles the spur and the
       laydown of hull shells and turret castings in the north-west.
     - Down the east side, the run-in track: a churned earth lane from the
       north edge to the wash rack at the south-east corner, where the
       tanks come back to be hosed down before they go to the ramp.
   The east and north walls with the east door, the roof and the north-
   west yard are what the default camera looks at; the line doors, the
   apron and the wash rack are on the far side, where a rotated camera
   finds them.

   Things that shaped it and are not visible:
     - render3d restyle() repaints every material whose LINEAR colour has
       HSL s < 0.22 and 0.12 < l < 0.82 in the faction's wall or roof
       colour. So WALL (light) and ROOF (dark) are flat greys in that band
       under a near-white detail map: they take each army's palette. The
       apron, glazing, steel, crane yellow, armour olive and the team
       colour sit outside the band and keep their own.
     - render3d archFixture() stands the faction's roof kit on the model's
       bounding-box TOP, one piece over the north-east quarter and one
       over the south-west. The ridge flashing is that top (16.7 m; the
       gantry reaches 13.6), the north-east spot lies on the hall roof,
       so the NATO radome and the Pact stack sit on its ridges, and the
       south-west spot is taken by the high-mast light, whose lamp
       platform is exactly as tall: the NATO mast and the present-day
       radome stand on it instead of floating over the apron. eraFixture()
       goes on the tallest broad mesh, which is the roof.
     - damage3d burns fires on broad roofs of 3 m and more and at the foot
       of the hall's wall on the camera side: the five roof slopes, the
       yard east of the hall.
     - Nothing is named: a structure's "turret" is forced round every
       frame and a "tailrotor" spins (render3d), and nothing here moves.

   Every part is merged into ONE mesh per material: eight materials, eight
   draw calls, where the model it replaces drew 383. The paintings depend
   on nothing but the plant, so they are made once per page and shared.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroArmourPlant = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------------------- datums */
  var SLAB = 0.10;                  /* top of the yard slab                    */
  /* the hall */
  var HX0 = -6.0, HX1 = 24.0;       /* 30 m crane bay                          */
  var HY0 = -20.0, HY1 = 24.0;      /* 44 m: five teeth of 8.8 m               */
  var EZ = 13.0;                    /* eaves, and every valley of the roof     */
  var NT = 5, TP = 8.8, TR = 3.6;   /* teeth, pitch, rise: ridge at 16.6 m     */
  var WT = 0.4;                     /* wall thickness                          */
  var GZ0 = 8.4, GZ1 = 11.4;        /* clerestory ribbon                       */
  var BZ0 = 12.2;                   /* roof-line band, to the eaves            */
  /* the two vehicle doors in the south wall, each in a 6 m column bay,
     and the one in the east wall, centred on the post under the second
     ridge (y -6.8), which it replaces: the valley columns either side are
     8.8 m apart */
  var DOORS = [3.0, 15.0], DW = 5.2, DH = 5.5, EDOOR = -6.8;
  /* the personnel doors, east and north: 1.0 m clear in a 0.1 m frame */
  var PD_E = -12.3, PD_N = 21.0;
  /* the rail spur, the ramp and the wagons */
  var RX = -25.5;                   /* track centre                            */
  var RAIL = 0.40;                  /* rail head                               */
  var DECK = RAIL + 1.31;           /* wagon floor, and the ramp top: 1.71     */
  var DOCK_S = -14.0, DOCK_N = -7.8;/* the raised end of the ramp              */
  var RAMP_S = -22.0;               /* foot of the slope: 1 in 5               */
  var WAG_L = 13.4, WAG_W = 2.87;   /* 13-401: over the end beams, floor width */
  var WAG_BASE = 9.72;              /* bogie centres                           */
  /* the gantry crane: ground rails, span 16.2 m, girders at 11-12.2 m */
  var GX0 = -28.6, GX1 = -12.4, GY = 16.0, GRY0 = 5.0, GRY1 = 29.6;
  var GIRD0 = 11.0, GIRD1 = 12.2;

  /* ============================================================== helpers */
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    /* r148: encoding is the switch that works; colorSpace does nothing */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* ------------------------------------------------------------ batching
     Every part lands in one Batch per material and goes out as one mesh.
     Parts are ordinary three.js geometry moved into model space, taken as
     plain triangles, so a box keeps its hard edges and a cylinder its
     smooth sides. UVs by the batch's rule:
       tile  box projection by each triangle's own facing, metres / tile,
             so a cladding seam is one size on every wall and pilaster;
       plan  the yard painting, u = (x + 30) / 60, v = (y + 30) / 60, on
             every face: the sides of a slab or a ramp take the concrete
             of the painting under them;
       keep  the part's own UVs (the glazing, laid out in metres);
       none  no map on the material.                                       */
  function Batch(mode, tile) { this.p = []; this.n = []; this.u = []; this.mode = mode || "none"; this.tile = tile || 1; }
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var i, k = this.tile, mode = this.mode;
    for (i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
    }
    for (i = 0; i < P.count; i += 3) {
      var ax = P.getX(i), ay = P.getY(i), az = P.getZ(i);
      var bx = P.getX(i + 1) - ax, by = P.getY(i + 1) - ay, bz = P.getZ(i + 1) - az;
      var cx = P.getX(i + 2) - ax, cy = P.getY(i + 2) - ay, cz = P.getZ(i + 2) - az;
      var nx = Math.abs(by * cz - bz * cy), ny = Math.abs(bz * cx - bx * cz), nz = Math.abs(bx * cy - by * cx);
      for (var c = 0; c < 3; c++) {
        var px = P.getX(i + c), py = P.getY(i + c), pz = P.getZ(i + c);
        if (mode === "tile") {
          if (nz >= nx && nz >= ny) this.u.push(px / k, py / k);
          else if (ny >= nx) this.u.push(px / k, pz / k);
          else this.u.push(py / k, pz / k);
        } else if (mode === "plan") this.u.push((px + 30) / 60, (py + 30) / 60);
        else if (mode === "keep" && U) this.u.push(U.getX(i + c), U.getY(i + c));
        else this.u.push(0, 0);
      }
    }
    return this;
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    var m = new THREE.Mesh(g, mtl);
    m.castShadow = true; m.receiveShadow = true;
    return m;
  };

  /* geometry placed in model space: rotate (XYZ Euler), then translate */
  var _o = null;
  function place(THREE, geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }
  function box(THREE, sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(THREE, new THREE.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a box from its corners, which may come in either order */
  function bb(THREE, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    return box(THREE, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  }
  /* upright cylinder standing on z0 */
  function cylZ(THREE, rt, rb, h, seg, x, y, z0) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h / 2);
  }
  /* a bar from point a to point b; seg 4 makes a square tube */
  var _v0 = null, _v1 = null;
  function rod(THREE, a, b, r, seg, r2) {
    if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 6);
    if ((seg || 6) === 4) g.rotateY(PI / 4);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize()));
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  /* A convex solid from its faces, each a convex polygon of [x, y, z]
     corners in any order round its edge. Every triangle is turned to face
     away from the solid's centre, so no caller has to get the winding
     right: across the roster 447 of 832 keys carry a mesh wound inside
     out, most of them lofts, and this is how none of these are. */
  function convex(THREE, faces) {
    var c = [0, 0, 0], n = 0, i, j, pos = [];
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
        var fc = [(a[0] + b[0] + d[0]) / 3 - c[0], (a[1] + b[1] + d[1]) / 3 - c[1], (a[2] + b[2] + d[2]) / 3 - c[2]];
        var q = nx * fc[0] + ny * fc[1] + nz * fc[2] >= 0 ? [a, b, d] : [a, d, b];
        for (var k = 0; k < 3; k++) pos.push(q[k][0], q[k][1], q[k][2]);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex polygon in the plane across `axis`, extruded along it from
     a0 to a1. axis "y": pts are [x, z]; axis "x": pts are [y, z]. */
  function prism(THREE, axis, pts, a0, a1) {
    function P(q, a) { return axis === "y" ? [q[0], a, q[1]] : [a, q[0], q[1]]; }
    var faces = [pts.map(function (q) { return P(q, a0); }), pts.map(function (q) { return P(q, a1); })];
    for (var i = 0; i < pts.length; i++) {
      var q0 = pts[i], q1 = pts[(i + 1) % pts.length];
      faces.push([P(q0, a0), P(q1, a0), P(q1, a1), P(q0, a1)]);
    }
    return convex(THREE, faces);
  }
  /* one flat rectangle facing along +/- an axis, with UVs in metres
     (u along it / su, v up it from its foot / sv): the glazing */
  function pane(THREE, axis, sign, at, a0, a1, z0, z1, su, sv) {
    var P = [], U = [];
    function V(a, z) { return axis === "x" ? [at, a, z] : [a, at, z]; }
    var c = [V(a0, z0), V(a1, z0), V(a1, z1), V(a0, z1)];
    var uv = [[a0 / su, 0], [a1 / su, 0], [a1 / su, (z1 - z0) / sv], [a0 / su, (z1 - z0) / sv]];
    /* facing +x runs a from +y round to -y ... wind so the normal is sign*axis */
    var e1 = [c[1][0] - c[0][0], c[1][1] - c[0][1], c[1][2] - c[0][2]];
    var e2 = [c[2][0] - c[0][0], c[2][1] - c[0][1], c[2][2] - c[0][2]];
    var nrm = axis === "x" ? e1[1] * e2[2] - e1[2] * e2[1] : e1[2] * e2[0] - e1[0] * e2[2];
    var order = nrm * sign > 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
    order.forEach(function (k) { P.push(c[k][0], c[k][1], c[k][2]); U.push(uv[k][0], uv[k][1]); });
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
    g.computeVertexNormals();
    return g;
  }

  /* ============================================================ paintings */
  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = { wall: finish(THREE, wallCanvas()), roof: finish(THREE, roofCanvas()),
             glass: finish(THREE, glassCanvas()), yard: finish(THREE, yardCanvas()) };
    _tex.yard.wrapS = _tex.yard.wrapT = THREE.ClampToEdgeWrapping;
    return _tex;
  }

  /* Cladding, one 6 m tile, near white: the faction's wall colour comes
     from the material, this only carries the sheet joints, the lap lines
     and the grime a steel-framed hall collects under its sills. */
  function wallCanvas() {
    var W = 512, cv = mkCv(W, W), g = cv.getContext("2d"), R = rngOf(4411), i;
    var px = W / 6;                                   /* pixels a metre */
    g.fillStyle = "#ecebe6"; g.fillRect(0, 0, W, W);
    for (i = 0; i < 60; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.08)" : "rgba(60,60,52,0.05)";
      g.beginPath(); g.ellipse(R() * W, R() * W, 20 + R() * 70, 12 + R() * 40, 0, 0, PI * 2); g.fill();
    }
    /* sheets 1 m wide, lapped every 3 m up the wall */
    for (i = 0; i < 6; i++) {
      g.fillStyle = "rgba(40,42,40,0.16)"; g.fillRect(i * px, 0, 2, W);
      g.fillStyle = "rgba(255,255,255,0.18)"; g.fillRect(i * px + 2, 0, 1, W);
    }
    for (i = 0; i < 2; i++) { g.fillStyle = "rgba(30,32,30,0.30)"; g.fillRect(0, i * 3 * px, W, 3); }
    /* profile ribs, every 0.25 m, faint */
    for (i = 0; i < 24; i++) { g.fillStyle = "rgba(0,0,0,0.05)"; g.fillRect(i * px / 4, 0, 1, W); }
    /* streaks from the laps */
    for (i = 0; i < 70; i++) {
      var sx = R() * W, sy = (R() < 0.5 ? 0 : 3 * px) + 3, len = 20 + R() * 120;
      var gr = g.createLinearGradient(0, sy, 0, sy + len);
      gr.addColorStop(0, "rgba(58,54,44,0.22)"); gr.addColorStop(1, "rgba(58,54,44,0)");
      g.fillStyle = gr; g.fillRect(sx, sy, 1.5 + R() * 3, len);
    }
    return cv;
  }
  /* Roof sheeting, one 6 m tile: trapezoidal ribs running down the slope
     every 0.3 m, the end laps, and weathering. */
  function roofCanvas() {
    var W = 512, cv = mkCv(W, W), g = cv.getContext("2d"), R = rngOf(7390), i;
    var px = W / 6;
    g.fillStyle = "#e6e6e2"; g.fillRect(0, 0, W, W);
    for (i = 0; i < 20; i++) {
      g.fillStyle = "rgba(0,0,0,0.14)"; g.fillRect(i * 0.3 * px, 0, 3, W);
      g.fillStyle = "rgba(255,255,255,0.20)"; g.fillRect(i * 0.3 * px + 3, 0, 2, W);
    }
    for (i = 0; i < 2; i++) { g.fillStyle = "rgba(0,0,0,0.22)"; g.fillRect(0, i * 3 * px + 40, W, 2); }
    for (i = 0; i < 50; i++) {
      g.fillStyle = R() < 0.4 ? "rgba(92,70,48,0.10)" : "rgba(30,30,30,0.07)";
      g.fillRect(R() * W, R() * W, 30 + R() * 140, 10 + R() * 50);
    }
    return cv;
  }
  /* Steel-sash glazing, one 6 m tile across, the strip's height down it:
     1.5 m bays, three rows of panes, and panes of every shade from sky to
     black, which is how the Chrysler arsenal's walls read in 1942. */
  function glassCanvas() {
    var W = 512, H = 128, cv = mkCv(W, H), g = cv.getContext("2d"), R = rngOf(1942), i, j;
    g.fillStyle = "#c9d6de"; g.fillRect(0, 0, W, H);
    var cw = W / 16, rh = H / 3;
    for (i = 0; i < 16; i++) for (j = 0; j < 3; j++) {
      var t = R(), v = Math.round(150 + t * 90);
      g.fillStyle = t < 0.18 ? "#5d6e7a" : "rgb(" + (v - 22) + "," + (v - 6) + "," + v + ")";
      g.fillRect(i * cw, j * rh, cw, rh);
    }
    g.fillStyle = "#2a3034";
    for (i = 0; i <= 16; i++) g.fillRect(i * cw - (i % 4 === 0 ? 3 : 1), 0, i % 4 === 0 ? 6 : 2, H);
    for (j = 0; j <= 3; j++) g.fillRect(0, j * rh - 2, W, 4);
    return cv;
  }

  /* The yard, in plan: 60 m square, 1024 px (5.9 cm a pixel), sampled by
     every GROUND face at its own x, y. */
  var YPX = 1024 / 60;
  function yx(x) { return (x + 30) * YPX; }
  function yy(y) { return (30 - y) * YPX; }
  function yardCanvas() {
    var W = 1024, cv = mkCv(W, W), g = cv.getContext("2d"), R = rngOf(26026), i, x, y;
    function rect(x0, y0, x1, y1, col) { g.fillStyle = col; g.fillRect(yx(x0), yy(y1), (x1 - x0) * YPX, (y1 - y0) * YPX); }
    /* concrete, in 6 m bays with dark joints */
    rect(-30, -30, 30, 30, "#9d9c95");
    /* each 6 m bay poured on its own day: a shade apart from its neighbours */
    for (x = -30; x < 30; x += 6) for (y = -30; y < 30; y += 6)
      rect(x, y, x + 6, y + 6, R() < 0.5 ? "rgba(255,255,250," + (R() * 0.07).toFixed(3) + ")"
                                         : "rgba(40,38,30," + (R() * 0.06).toFixed(3) + ")");
    for (i = 0; i < 160; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,250,0.025)" : "rgba(40,38,30,0.035)";
      g.beginPath(); g.ellipse(R() * W, R() * W, 20 + R() * 90, 12 + R() * 50, R() * 3, 0, PI * 2); g.fill();
    }
    g.fillStyle = "rgba(38,38,34,0.45)";
    for (i = -30; i <= 30; i += 6) { g.fillRect(yx(i) - 1, 0, 2, W); g.fillRect(0, yy(i) - 1, W, 2); }
    /* under the hall: the shop floor, never seen */
    rect(HX0, HY0, HX1, HY1, "#6f706b");
    /* the plant road along the north edge, asphalt */
    rect(-30, HY1 + 0.6, 30, 30, "#4d4e4b");
    for (i = 0; i < 90; i++) { g.fillStyle = "rgba(20,20,18,0.12)"; g.fillRect(R() * W, yy(30) + R() * 5 * YPX, 20 + R() * 80, 3 + R() * 8); }
    g.fillStyle = "rgba(226,226,214,0.8)"; g.fillRect(yx(-30), yy(HY1 + 1.0) - 2, W, 3);
    /* the laydown: crushed stone between the gantry rails */
    rect(GX0 + 0.8, GRY0, GX1 - 0.8, GRY1, "#7f786b");
    for (i = 0; i < 900; i++) {
      var s = 1 + R() * 2.5, c = 90 + Math.floor(R() * 60);
      g.fillStyle = "rgba(" + c + "," + (c - 6) + "," + (c - 16) + ",0.7)";
      g.fillRect(yx(GX0 + 0.8) + R() * (GX1 - GX0 - 1.6) * YPX, yy(GRY1) + R() * (GRY1 - GRY0) * YPX, s, s);
    }
    /* the crane runway beams the ground rails are laid in */
    rect(GX0 - 0.45, GRY0, GX0 + 0.45, GRY1, "#b3b1a8");
    rect(GX1 - 0.45, GRY0, GX1 + 0.45, GRY1, "#b3b1a8");
    /* ballast and sleepers: 2.6 m sleepers every 0.55 m */
    rect(RX - 2.0, DOCK_N, RX + 2.0, 30, "#5e5850");
    for (i = 0; i < 1400; i++) {
      var sb = 1 + R() * 2, cb = 70 + Math.floor(R() * 50);
      g.fillStyle = "rgba(" + cb + "," + (cb - 5) + "," + (cb - 12) + ",0.8)";
      g.fillRect(yx(RX - 2.0) + R() * 4 * YPX, yy(30) + R() * (30 - DOCK_N) * YPX, sb, sb);
    }
    for (y = DOCK_N + 0.4; y < 30; y += 0.55) rect(RX - 1.3, y, RX + 1.3, y + 0.24, "#4a3b2c");
    /* the run-in track: churned earth down the east side, the two ruts of
       a tank's tracks 2.9 m apart, and its spoil spread onto the concrete */
    rect(HX1 + 0.5, -14.5, 30, 30, "#6e5d47");
    for (i = 0; i < 700; i++) {
      var cs = 70 + Math.floor(R() * 50);
      g.fillStyle = "rgba(" + (cs + 20) + "," + (cs + 4) + "," + (cs - 14) + ",0.35)";
      g.fillRect(yx(HX1 + 0.5) + R() * (29.5 - HX1) * YPX, yy(30) + R() * 44.5 * YPX, 2 + R() * 8, 2 + R() * 6);
    }
    [25.8, 28.7].forEach(function (cx) {
      rect(cx - 0.32, -14.5, cx + 0.32, 30, "rgba(58,46,34,0.75)");
      for (var yy2 = -14.5; yy2 < 30; yy2 += 0.16) rect(cx - 0.3, yy2, cx + 0.3, yy2 + 0.06, "rgba(34,27,20,0.45)");
    });
    /* the wash rack: a darker wet pad, a grated trench down its middle */
    rect(HX1 + 0.6, -27.5, 29.6, -14.5, "#7b7c76");
    rect(HX1 + 0.6, -27.5, 29.6, -14.5, "rgba(40,50,56,0.25)");
    rect(26.6, -27.2, 27.9, -14.8, "#2b2d2c");
    for (y = -27.2; y < -14.8; y += 0.18) rect(26.6, y, 27.9, y + 0.05, "#6d6f6c");
    /* the apron: painted lanes out of both doors, the keep-clear hatching
       in front of them, the lane west to the ramp, tyre and track marks */
    g.fillStyle = "#d7b52c";
    DOORS.forEach(function (dx) {
      rect(dx - DW / 2, -30, dx - DW / 2 + 0.15, HY0, "#d7b52c");
      rect(dx + DW / 2 - 0.15, -30, dx + DW / 2, HY0, "#d7b52c");
      for (var k = 0; k < 9; k++) {
        var hx0 = dx - DW / 2 + k * 0.62;
        g.save(); g.beginPath(); g.rect(yx(dx - DW / 2), yy(HY0), DW * YPX, 3.0 * YPX); g.clip();
        g.fillStyle = "rgba(215,181,44,0.9)";
        g.beginPath(); g.moveTo(yx(hx0), yy(HY0)); g.lineTo(yx(hx0 + 0.3), yy(HY0));
        g.lineTo(yx(hx0 + 3.3), yy(HY0 - 3.0)); g.lineTo(yx(hx0 + 3.0), yy(HY0 - 3.0)); g.closePath(); g.fill();
        g.restore();
      }
    });
    /* the east door opens straight onto the run-in track: a concrete
       threshold across the earth, its edges painted, and the tracks of
       tanks turning out of it both ways along the lane */
    rect(HX1, EDOOR - DW / 2 - 0.6, 29.6, EDOOR + DW / 2 + 0.6, "#8f8e87");
    rect(HX1, EDOOR - DW / 2 - 0.6, 29.6, EDOOR - DW / 2 - 0.45, "#d7b52c");
    rect(HX1, EDOOR + DW / 2 + 0.45, 29.6, EDOOR + DW / 2 + 0.6, "#d7b52c");
    rect(RAMP_S - 1, -26.5, 0.4, -26.35, "#d7b52c");
    rect(RX - 3.0, RAMP_S - 4.5, RX - 2.85, RAMP_S, "#d7b52c");
    /* track marks: two pairs out of each door and a pair round to the ramp */
    g.strokeStyle = "rgba(30,28,24,0.28)"; g.lineWidth = 0.55 * YPX;
    function marks(pts) {
      [-1.45, 1.45].forEach(function (o) {
        g.beginPath();
        pts.forEach(function (p, k) {
          var a = pts[Math.min(k + 1, pts.length - 1)], b = pts[Math.max(k - 1, 0)];
          var dx = a[0] - b[0], dy = a[1] - b[1], l = Math.sqrt(dx * dx + dy * dy) || 1;
          var X = yx(p[0] - dy / l * o), Y = yy(p[1] + dx / l * o);
          if (k) g.lineTo(X, Y); else g.moveTo(X, Y);
        });
        g.stroke();
      });
    }
    marks([[3, -20], [3, -24], [2.4, -27.5], [2, -30]]);
    marks([[15, -20], [15.5, -25], [16, -30]]);
    marks([[3, -21], [0, -25.5], [-10, -26.5], [-20, -25.5], [RX, -23], [RX, RAMP_S + 1]]);
    marks([[27.25, -14.5], [27.25, -22], [26, -26], [20, -28.2], [8, -28.8]]);
    marks([[HX1, EDOOR], [25.4, EDOOR], [27.25, EDOOR + 3.0], [27.25, EDOOR + 9.0]]);
    marks([[HX1, EDOOR], [25.4, EDOOR], [27.25, EDOOR - 3.0], [27.25, EDOOR - 7.7]]);
    /* oil and fuel stains */
    for (i = 0; i < 40; i++) {
      x = -28 + R() * 56; y = -29 + R() * 9;
      g.fillStyle = "rgba(24,22,18," + (0.08 + R() * 0.14).toFixed(3) + ")";
      g.beginPath(); g.ellipse(yx(x), yy(y), (0.3 + R() * 1.2) * YPX, (0.2 + R() * 0.8) * YPX, R() * 3, 0, PI * 2); g.fill();
    }
    /* the ramp and its dock are plain concrete, lighter where tracks wore it */
    rect(RX - 3.0, RAMP_S, RX + 3.0, DOCK_N, "#a7a59c");
    rect(RX - 1.75, RAMP_S, RX - 1.15, DOCK_N, "rgba(60,58,52,0.35)");
    rect(RX + 1.15, RAMP_S, RX + 1.75, DOCK_N, "rgba(60,58,52,0.35)");
    return cv;
  }

  /* ========================================================== the vehicles
     A tank drawn as the class rather than any one model: the plant builds
     whatever its army fields, so this is the common MBT of the cast-turret
     generation onward - a 6.9 m hull 3.5 m over the tracks, 2.9 m of hull
     between them, the deck 1.72 m up, a round cast turret and a gun
     reaching 2.7 m past the nose (T-72 and M60 figures, averaged).
     Local frame: +X forward, track bottoms on z = 0. Parts come back as
     [material key, geometry]. */
  function hullProfile() {
    return [[-3.45, 0.70], [3.0, 0.70], [3.45, 1.0], [1.9, 1.72], [-3.3, 1.72], [-3.45, 1.50]];
  }
  function tankParts(THREE) {
    var P = [], s;
    P.push(["A", prism(THREE, "y", hullProfile(), -1.45, 1.45)]);
    for (s = -1; s <= 1; s += 2) {
      /* the track, its run on the ground shorter than its top run */
      P.push(["S", prism(THREE, "y", [[-2.9, 0], [2.6, 0], [3.25, 0.5], [3.05, 0.82], [-3.3, 0.82], [-3.45, 0.45]],
                         s * 1.15, s * 1.62)]);
      /* six road wheels a side, their lower halves showing under the skirt */
      for (var k = 0; k < 6; k++)
        P.push(["A", place(THREE, new THREE.CylinderGeometry(0.37, 0.37, 0.2, 8), -2.55 + k * 1.0, s * 1.6, 0.4)]);
      /* track guard and the side skirt hung off it */
      P.push(["A", bb(THREE, -3.4, 3.3, s * 1.45, s * 1.78, 1.16, 1.24)]);
      P.push(["A", bb(THREE, -3.2, 2.7, s * 1.74, s * 1.78, 0.58, 1.18)]);
    }
    /* the turret: a round cast shell on its ring, set a little forward */
    P.push(["A", cylZ(THREE, 1.18, 1.22, 0.14, 14, 0.15, 0, 1.72)]);
    var dome = new THREE.SphereGeometry(1, 14, 5, 0, PI * 2, 0, PI / 2);
    dome.rotateX(PI / 2); dome.scale(1.35, 1.18, 0.62);
    P.push(["A", place(THREE, dome, 0.1, 0, 1.84)]);
    P.push(["A", bb(THREE, 1.05, 1.55, -0.42, 0.42, 1.88, 2.3)]);                 /* mantlet */
    P.push(["S", rod(THREE, [1.5, 0, 2.08], [3.9, 0, 2.08], 0.13, 8)]);           /* sleeve  */
    P.push(["S", rod(THREE, [3.9, 0, 2.08], [6.1, 0, 2.08], 0.09, 8)]);           /* tube    */
    P.push(["A", cylZ(THREE, 0.34, 0.38, 0.28, 10, -0.35, 0.42, 2.34)]);         /* cupola  */
    /* the engine grille stands 9 cm proud: at the 1200 m zoom-out one step
       of the 24-bit depth buffer is 4-5 cm, and a thinner plate flickers */
    P.push(["S", bb(THREE, -3.3, -2.2, -1.2, 1.2, 1.72, 1.81)]);                   /* grille  */
    return P;
  }
  /* A hull shell as it comes to the line: finished, painted, no running
     gear, no turret - the bare ring a dark collar on the roof. It is the
     tank's hull dropped by the 0.55 m its tracks would have lifted it, so
     its belly is at SHELL_Z0 in its own frame. The ring and the grille
     stand 9-10 cm proud, clear of the depth steps at the zoom-out. */
  var SHELL_Z0 = 0.15;
  function shellParts(THREE) {
    return [
      ["A", prism(THREE, "y", hullProfile().map(function (q) { return [q[0], q[1] - 0.55]; }), -1.45, 1.45)],
      ["A", bb(THREE, -3.3, 3.2, -1.72, 1.72, 0.58, 0.66)],
      ["S", cylZ(THREE, 1.1, 1.1, 0.1, 16, 0.15, 0, 1.17)],
      ["S", bb(THREE, -3.2, -1.9, -1.1, 1.1, 1.17, 1.26)],
    ];
  }
  /* a raw turret casting on a low stand, gun port open */
  function castingParts(THREE) {
    var dome = new THREE.SphereGeometry(1, 14, 5, 0, PI * 2, 0, PI / 2);
    dome.rotateX(PI / 2); dome.scale(1.35, 1.18, 0.7);
    return [
      ["S", place(THREE, dome, 0, 0, 0.72)],
      ["S", cylZ(THREE, 1.12, 1.16, 0.22, 14, 0, 0, 0.5)],
      ["C", bb(THREE, -0.8, 0.8, -0.8, 0.8, 0, 0.5)],
      ["A", bb(THREE, 1.2, 1.36, -0.34, 0.34, 0.95, 1.35)],
    ];
  }
  /* The 13-401 four-axle flat wagon: 13.4 x 2.87 m at 1.31 m over the
     rail, side sills, end beams and couplers (14.62 m over them), two
     bogies 9.72 m apart on 957 mm wheels. Local frame: +X along the
     track, rail head at z = 0. */
  function wagonParts(THREE) {
    var P = [], s, b, a, L = WAG_L / 2, D = DECK - RAIL;
    P.push(["S", bb(THREE, -L, L, -WAG_W / 2, WAG_W / 2, D - 0.16, D)]);
    for (s = -1; s <= 1; s += 2) {
      P.push(["S", bb(THREE, -L, L, s * (WAG_W / 2 - 0.2), s * (WAG_W / 2 - 0.02), D - 0.62, D - 0.16)]);
      P.push(["S", bb(THREE, s * L - 0.12, s * L + 0.12, -WAG_W / 2, WAG_W / 2, D - 0.62, D - 0.16)]);
      P.push(["C", bb(THREE, s * (L + 0.1), s * (L + 0.61), -0.18, 0.18, 0.93, 1.19)]);
    }
    /* centre sill, deepest over the middle */
    P.push(["S", prism(THREE, "y", [[-L, D - 0.16], [L, D - 0.16], [L, D - 0.5], [2.5, D - 0.72], [-2.5, D - 0.72], [-L, D - 0.5]], -0.28, 0.28)]);
    for (b = -1; b <= 1; b += 2) {
      var bx = b * WAG_BASE / 2;
      P.push(["S", bb(THREE, bx - 0.35, bx + 0.35, -1.25, 1.25, 0.72, D - 0.62)]);          /* bolster */
      for (s = -1; s <= 1; s += 2)
        P.push(["S", bb(THREE, bx - 1.45, bx + 1.45, s * 0.98, s * 1.12, 0.3, 0.78)]);      /* side frame */
      /* each wheelset one drum across the gauge: only its rims show,
         under and over the side frame, so eight sides are plenty */
      for (a = -1; a <= 1; a += 2) {
        var w = new THREE.CylinderGeometry(0.4785, 0.4785, 1.62, 8);
        P.push(["S", place(THREE, w, bx + a * 0.925, 0, 0.4785)]);
      }
    }
    return P;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "armour_plant";
    var TX = textures(THREE);
    var i, j, s, x, y;
    var teamCol = (C && C.team !== undefined) ? C.team : "#4b8fe0";

    /* ---------------------------------------------------- the materials */
    var T = {};
    /* WALL and ROOF are greys inside restyle()'s band (linear l 0.62 and
       0.27), so each army repaints them its own wall and roof colour; the
       maps are near white and only carry the detail. */
    T.W = new THREE.MeshStandardMaterial({ color: 0xcfd2cf, map: TX.wall, roughness: 0.86, metalness: 0.05 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x8c9194, map: TX.roof, roughness: 0.72, metalness: 0.22 });
    /* Glazing: a blue saturated enough (linear s 0.53) that neither the
       faction nor the period restyle takes it for a wall. Every pane sits
       in an opening or 15 cm off the face it is laid on: at BLD_SCALE 1.1
       and the zoom-out limit one step of a 24-bit depth buffer is 4-5 cm,
       so no polygon offset is needed, and none pulls glass through a
       reveal at a grazing angle. */
    T.G = new THREE.MeshStandardMaterial({ color: 0x557594, map: TX.glass, roughness: 0.18, metalness: 0.35 });
    /* the yard painting keeps its own concrete, earth and ballast */
    T.Y = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.yard, roughness: 0.95, metalness: 0.0 });
    /* dark steel: rails, wagons, turret castings, dunnage, masts; under
       linear l 0.08, so no restyle touches it */
    T.S = new THREE.MeshStandardMaterial({ color: 0x3b3f42, roughness: 0.55, metalness: 0.45 });
    /* crane and safety yellow, as at Lima (and UVZ's cranes' orange) */
    T.C = new THREE.MeshStandardMaterial({ color: 0xd9a21b, roughness: 0.6, metalness: 0.2 });
    /* the hulls' green paint */
    T.A = new THREE.MeshStandardMaterial({ color: 0x4d5433, roughness: 0.8, metalness: 0.1 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(teamCol), roughness: 0.55, metalness: 0.12 });
    /* The owner's colour is the owner's even when it is a grey: render3d
       tags it (tagParts) and neither restyle() nor eraRestyle() touches it.
       Germany's field grey no longer rides on a map over white, where the
       period's tint still reached it (42% toward brick in the 1950s). */
    var B = { W: new Batch("tile", 6), R: new Batch("tile", 6), G: new Batch("keep"), Y: new Batch("plan"),
              S: new Batch(), C: new Batch(), A: new Batch(), T: new Batch() };
    function emit(parts, px, py, pz, hdg) {
      parts.forEach(function (pp) {
        place(THREE, pp[1], 0, 0, 0, 0, 0, hdg || 0);
        pp[1].translate(px, py, pz);
        B[pp[0]].add(pp[1]);
      });
    }

    /* -------------------------------------------------------- the yard
       In 6 m squares, one per concrete bay of the painting: the same
       draw, and no triangle 60 m long for a depth sort to get wrong. */
    for (x = -29.8; x < 29.7; x += 59.6 / 10) for (y = -29.8; y < 29.7; y += 59.6 / 10)
      B.Y.add(place(THREE, new THREE.PlaneGeometry(5.96, 5.96), x + 2.98, y + 2.98, SLAB));
    B.Y.add(bb(THREE, -29.8, 29.8, -29.8, -29.78, 0, SLAB));
    B.Y.add(bb(THREE, -29.8, 29.8, 29.78, 29.8, 0, SLAB));
    B.Y.add(bb(THREE, -29.8, -29.78, -29.78, 29.78, 0, SLAB));
    B.Y.add(bb(THREE, 29.78, 29.8, -29.78, 29.78, 0, SLAB));

    /* ======================================================== the hall */
    /* Walls, bay by bay between the columns, each in two lifts with the
       clerestory ribbon between them: a real opening, its glass set 0.1 m
       back in the reveal, so the band reads with a shadow along its head
       and no sheet lies over a wall to fight it for depth. The south wall
       is also cut round its two doors, the east wall round its one. */
    function lifts(x0, x1, y0, y1, zb) {
      B.W.add(bb(THREE, x0, x1, y0, y1, zb, GZ0));
      B.W.add(bb(THREE, x0, x1, y0, y1, GZ1, EZ));
    }
    var e0 = EDOOR - DW / 2, e1 = EDOOR + DW / 2;
    for (i = 0; i < 10; i++) {
      var ya0 = HY0 + i * TP / 2, yb0 = ya0 + TP / 2;
      lifts(HX0, HX0 + WT, ya0, yb0, SLAB);
      if (yb0 <= e0 || ya0 >= e1) { lifts(HX1 - WT, HX1, ya0, yb0, SLAB); continue; }
      /* the two bays of the east door: cut up to its head, whole above */
      if (ya0 < e0) B.W.add(bb(THREE, HX1 - WT, HX1, ya0, e0, SLAB, DH));
      if (yb0 > e1) B.W.add(bb(THREE, HX1 - WT, HX1, e1, yb0, SLAB, DH));
      lifts(HX1 - WT, HX1, ya0, yb0, DH);
    }
    for (x = HX0 + WT; x < HX1 - WT - 0.1; x += 6)
      lifts(x, Math.min(x + 6, HX1 - WT), HY1 - WT, HY1, SLAB);
    var cuts = [HX0 + WT];
    DOORS.forEach(function (dx) { cuts.push(dx - DW / 2, dx + DW / 2); });
    cuts.push(HX1 - WT);
    for (i = 0; i < cuts.length; i += 2) lifts(cuts[i], cuts[i + 1], HY0, HY0 + WT, SLAB);
    DOORS.forEach(function (dx) { lifts(dx - DW / 2, dx + DW / 2, HY0, HY0 + WT, DH); });
    /* The plinth, in the darker roof tone, round the foot. It stops at
       every door, inside the door's frame, so no door is sunk in it. */
    function plinth(a0, a1, gaps, seg) {
      var at = a0;
      gaps.concat([[a1, a1]]).forEach(function (gp) { if (gp[0] > at) B.R.add(seg(at, gp[0])); at = gp[1]; });
    }
    plinth(HY0 - 0.12, HY1 + 0.12, [[PD_E - 0.55, PD_E + 0.55], [e0, e1]],
           function (a, b) { return bb(THREE, HX1, HX1 + 0.12, a, b, SLAB, 1.3); });
    B.R.add(bb(THREE, HX0 - 0.12, HX0, HY0 - 0.12, HY1 + 0.12, SLAB, 1.3));
    plinth(HX0, HX1, [[PD_N - 0.55, PD_N + 0.55]],
           function (a, b) { return bb(THREE, a, b, HY1, HY1 + 0.12, SLAB, 1.3); });
    for (i = 0; i < cuts.length; i += 2) B.R.add(bb(THREE, cuts[i] - (i ? 0 : WT), cuts[i + 1] + (i === cuts.length - 2 ? WT : 0), HY0 - 0.12, HY0, SLAB, 1.3));
    /* column pilasters: 4.4 m down the long walls, under every valley and
       every ridge, bar the ridge post the east door takes the place of;
       6 m across the ends, the doors between them */
    for (i = 0; i <= 10; i++) {
      y = HY0 + i * TP / 2;
      var y0 = Math.max(HY0 - 0.3, y - 0.3), y1 = Math.min(HY1 + 0.3, y + 0.3);
      if (Math.abs(y - EDOOR) > 0.01) B.R.add(bb(THREE, HX1, HX1 + 0.32, y0, y1, 1.3, BZ0));
      B.R.add(bb(THREE, HX0 - 0.32, HX0, y0, y1, 1.3, BZ0));
    }
    for (x = HX0 + 6; x < HX1 - 1; x += 6) {
      B.R.add(bb(THREE, x - 0.3, x + 0.3, HY1, HY1 + 0.32, 1.3, BZ0));
      B.R.add(bb(THREE, x - 0.3, x + 0.3, HY0 - 0.32, HY0, 1.3, BZ0));
    }
    /* the clerestory glazing in its openings, 0.1 m back from the face;
       the four sheets meet on the corners, which would otherwise leave a
       slot the wall's thickness wide open into the hall */
    for (i = 0; i < 10; i++) {
      var ga = Math.max(HY0 + 0.1, HY0 + i * TP / 2), gb = Math.min(HY1 - 0.1, HY0 + (i + 1) * TP / 2);
      B.G.add(pane(THREE, "x", 1, HX1 - 0.1, ga, gb, GZ0, GZ1, 6, GZ1 - GZ0));
      B.G.add(pane(THREE, "x", -1, HX0 + 0.1, ga, gb, GZ0, GZ1, 6, GZ1 - GZ0));
    }
    for (x = HX0 + WT; x < HX1 - WT - 0.1; x += 6) {
      var gx0 = x === HX0 + WT ? HX0 + 0.1 : x, gx1 = x + 6 >= HX1 - WT - 0.1 ? HX1 - 0.1 : x + 6;
      B.G.add(pane(THREE, "y", 1, HY1 - 0.1, gx0, gx1, GZ0, GZ1, 6, GZ1 - GZ0));
      B.G.add(pane(THREE, "y", -1, HY0 + 0.1, gx0, gx1, GZ0, GZ1, 6, GZ1 - GZ0));
    }
    /* the roof-line band in the owner's colour, over the pilaster heads */
    B.T.add(bb(THREE, HX1, HX1 + 0.36, HY0 - 0.36, HY1 + 0.36, BZ0, EZ));
    B.T.add(bb(THREE, HX0 - 0.36, HX0, HY0 - 0.36, HY1 + 0.36, BZ0, EZ));
    B.T.add(bb(THREE, HX0, HX1, HY1, HY1 + 0.36, BZ0, EZ));
    B.T.add(bb(THREE, HX0, HX1, HY0 - 0.36, HY0, BZ0, EZ));
    /* Rainwater: each valley gutter runs out through both gable walls into
       a downpipe beside the pilaster under it, and the south eaves gutter
       into one at each corner. */
    for (i = 0; i <= NT; i++) {
      y = i === NT ? HY1 - 0.9 : HY0 + i * TP + (i ? 0.75 : 0.9);
      for (s = -1; s <= 1; s += 2) {
        var px = s > 0 ? HX1 + 0.5 : HX0 - 0.5;
        B.S.add(cylZ(THREE, 0.11, 0.11, EZ - 0.3 - SLAB, 6, px, y, SLAB));
        B.S.add(bb(THREE, Math.min(px, s > 0 ? HX1 : HX0), Math.max(px, s > 0 ? HX1 : HX0), y - 0.11, y + 0.11, EZ - 0.45, EZ - 0.2));
      }
    }
    /* The caged ladder up the north gable to the roof, near its west end.
       Its bars are 2-6 cm, a tenth of a pixel at the default zoom, so the
       rungs (every 0.3 m) and the hoops (every 1.2 m) are single strips
       facing out from the wall, two triangles where a solid bar takes
       twelve; the stiles and the three cage flats that carry the outline
       are solid. */
    (function () {
      var lx = HX0 + 2.2, ly = HY1 + 0.45, z0 = 2.4, z1 = EZ + 1.1, zz;
      for (s = -1; s <= 1; s += 2) B.S.add(bb(THREE, lx + s * 0.3 - 0.03, lx + s * 0.3 + 0.03, ly - 0.03, ly + 0.03, SLAB, z1));
      for (zz = 0.4; zz < z1; zz += 0.3) B.S.add(pane(THREE, "y", 1, ly, lx - 0.27, lx + 0.27, zz, zz + 0.035, 1, 1));
      for (zz = z0; zz < z1; zz += 1.2) {
        B.S.add(pane(THREE, "y", 1, ly + 0.72, lx - 0.41, lx + 0.41, zz, zz + 0.05, 1, 1));
        B.S.add(pane(THREE, "x", 1, lx + 0.41, ly, ly + 0.72, zz, zz + 0.05, 1, 1));
        B.S.add(pane(THREE, "x", -1, lx - 0.41, ly, ly + 0.72, zz, zz + 0.05, 1, 1));
      }
      [-0.38, 0, 0.38].forEach(function (o) {
        B.S.add(bb(THREE, lx + o - 0.02, lx + o + 0.02, ly + 0.66, ly + 0.7, z0, z1));
      });
    })();

    /* ---------------------------------------------- the north-light roof
       Five teeth. Each rises from its valley at the foot of the one before
       to a ridge 3.6 m up, 8.8 m north, and drops again down its glazed
       north face. The gable ends of each tooth are wall; the last face is
       in the plane of the north wall. */
    var SA = Math.atan2(TR, TP), SL = Math.sqrt(TP * TP + TR * TR);
    for (i = 0; i < NT; i++) {
      var ya = HY0 + i * TP, yb = ya + TP;
      /* the gable triangles, in the thickness of the side walls */
      var tri = [[ya, EZ], [yb, EZ], [yb, EZ + TR]];
      B.W.add(prism(THREE, "x", tri, HX0, HX0 + WT));
      B.W.add(prism(THREE, "x", tri, HX1 - WT, HX1));
      /* the slope: sheeting 0.25 m thick, its top on the line from valley
         to ridge, 0.4 m of eaves past each gable */
      for (j = 0; j < 3; j++) {
        var sw = (HX1 - HX0 + 0.8) / 3, sl = new THREE.BoxGeometry(sw, SL, 0.25);
        sl.translate(0, SL / 2, -0.125);
        sl.rotateX(SA);
        sl.translate(HX0 - 0.4 + sw * (j + 0.5), ya, EZ);
        B.R.add(sl);
      }
      /* the north face: an upstand, the glazing, and the ridge flashing */
      B.R.add(bb(THREE, HX0 + WT, HX1 - WT, yb - 0.3, yb, EZ - 0.05, EZ + 0.45));
      for (x = HX0 + WT; x < HX1 - WT - 0.1; x += 6)
        B.G.add(pane(THREE, "y", 1, yb, x, Math.min(x + 6, HX1 - WT), EZ + 0.45, EZ + TR - 0.3, 6, TR - 0.75));
      B.T.add(bb(THREE, HX0 - 0.4, HX1 + 0.4, yb - 0.42, yb + 0.06, EZ + TR - 0.3, EZ + TR + 0.1));
      /* the valley gutter at the foot of the slope */
      if (i > 0) B.S.add(bb(THREE, HX0 - 0.4, HX1 + 0.4, ya, ya + 0.4, EZ - 0.05, EZ + 0.18));
    }
    B.S.add(bb(THREE, HX0 - 0.4, HX1 + 0.4, HY0 - 0.55, HY0 - 0.2, EZ - 0.35, EZ - 0.05));
    /* roof ventilators on the slopes, clear of the north-east quarter where
       render3d stands the faction's own roof kit */
    [[-1.0, 0], [7.0, 0], [0.5, 1], [8.5, 1], [-1.0, 2], [7.0, 2], [0.5, 3], [8.5, 3], [0.5, 4]].forEach(function (v) {
      var tt = 0.45, vy = HY0 + v[1] * TP + tt * TP, vz = EZ + tt * TR;
      B.S.add(cylZ(THREE, 0.55, 0.55, 0.9, 8, v[0], vy, vz - 0.2));
      B.S.add(cylZ(THREE, 0.75, 0.75, 0.12, 8, v[0], vy, vz + 0.95));
    });

    /* ------------------------------------------------------- the doors
       Each is built in its own frame - the wall's outer face on y = 0,
       the hall toward +y, the opening centred on x = 0 - and turned onto
       its wall: south doors as they are, the east one a quarter turn, the
       north personnel door a half. */
    function vehicleDoor(open) {
      var x0 = -DW / 2, x1 = DW / 2, P = [];
      /* The steel frame lines the reveal: its jambs reach 0.1 m into the
         opening, so their inner faces lie in front of the wall's cut
         faces instead of in the same plane, and 5.0 m stays clear. */
      P.push(["S", bb(THREE, x0 - 0.25, x0 + 0.1, -0.22, WT, SLAB, DH + 0.3)]);
      P.push(["S", bb(THREE, x1 - 0.1, x1 + 0.25, -0.22, WT, SLAB, DH + 0.3)]);
      /* the roller-shutter box over it */
      P.push(["S", bb(THREE, x0 - 0.35, x1 + 0.35, -0.75, 0, DH, DH + 0.8)]);
      /* corner guards in safety yellow */
      P.push(["C", bb(THREE, x0 - 0.62, x0 - 0.3, -0.5, -0.18, SLAB, 1.2)]);
      P.push(["C", bb(THREE, x1 + 0.3, x1 + 0.62, -0.5, -0.18, SLAB, 1.2)]);
      if (open) {
        /* the shutter wound up, the dark bay behind */
        P.push(["S", bb(THREE, x0 + 0.1, x1 - 0.1, 3.0, 3.2, SLAB, DH)]);
        P.push(["S", bb(THREE, x0, x0 + 0.1, WT, 3.0, SLAB, DH)]);
        P.push(["S", bb(THREE, x1 - 0.1, x1, WT, 3.0, SLAB, DH)]);
        P.push(["S", bb(THREE, x0 + 0.1, x1 - 0.1, WT, 3.0, DH - 0.1, DH)]);
      } else {
        P.push(["R", bb(THREE, x0 + 0.1, x1 - 0.1, 0.12, 0.24, SLAB, DH)]);
      }
      return P;
    }
    /* a steel personnel door, 1.0 x 2.2 m clear, its frame 0.16 m proud
       of the cladding and so 4 cm proud of the plinth, which stops at it */
    function personnelDoor() {
      return [
        ["S", bb(THREE, -0.6, -0.5, -0.16, 0, SLAB, 2.3)],
        ["S", bb(THREE, 0.5, 0.6, -0.16, 0, SLAB, 2.3)],
        ["S", bb(THREE, -0.6, 0.6, -0.16, 0, 2.3, 2.4)],
        ["S", bb(THREE, -0.5, 0.5, -0.1, 0, SLAB, 2.3)],
      ];
    }
    DOORS.forEach(function (dx, k) { emit(vehicleDoor(k === 0), dx, HY0, 0, 0); });
    emit(vehicleDoor(true), HX1, EDOOR, 0, PI / 2);
    emit(personnelDoor(), HX1, PD_E, 0, PI / 2);
    emit(personnelDoor(), PD_N, HY1, 0, PI);

    /* ====================================================== the rail spur */
    B.Y.add(bb(THREE, RX - 2.0, RX + 2.0, DOCK_N, 29.8, SLAB, RAIL - 0.16));
    for (s = -1; s <= 1; s += 2) B.S.add(bb(THREE, RX + s * 0.755 - 0.037, RX + s * 0.755 + 0.037, DOCK_N, 29.8, RAIL - 0.16, RAIL));
    /* buffer stop against the ramp face */
    B.C.add(bb(THREE, RX - 1.3, RX + 1.3, DOCK_N, DOCK_N + 0.35, RAIL + 0.55, RAIL + 1.0));
    B.S.add(bb(THREE, RX - 0.9, RX + 0.9, DOCK_N, DOCK_N + 0.3, RAIL - 0.16, RAIL + 0.55));
    /* the end ramp: a raised concrete dock at floor height and the slope
       down to the yard, kerbed both sides */
    B.Y.add(bb(THREE, RX - 3.0, RX + 3.0, DOCK_S, DOCK_N, SLAB, DECK));
    B.Y.add(prism(THREE, "x", [[RAMP_S, SLAB], [DOCK_S, SLAB], [DOCK_S, DECK]], RX - 3.0, RX + 3.0));
    var rampA = Math.atan2(DECK - SLAB, DOCK_S - RAMP_S), rampL = Math.sqrt(Math.pow(DECK - SLAB, 2) + Math.pow(DOCK_S - RAMP_S, 2));
    for (s = -1; s <= 1; s += 2) {
      var kx = RX + s * 2.85;
      B.C.add(bb(THREE, kx - 0.15, kx + 0.15, DOCK_S, DOCK_N, DECK, DECK + 0.25));
      var kb = new THREE.BoxGeometry(0.3, rampL, 0.25);
      kb.translate(0, rampL / 2, 0.125);
      kb.rotateX(rampA);
      kb.translate(kx, RAMP_S, SLAB);
      B.C.add(kb);
    }
    /* the bridging plate from the dock onto the first wagon, 8 cm: any
       thinner and it flickers on the deck at the zoom-out */
    B.S.add(bb(THREE, RX - 1.5, RX + 1.5, DOCK_N - 0.3, DOCK_N + 0.85, DECK, DECK + 0.08));
    /* the wagons: the first against the ramp with a finished tank, the
       second under the gantry with a hull shell come in */
    var w1 = DOCK_N + 0.55 + WAG_L / 2, w2 = w1 + WAG_L + 1.22;
    emit(wagonParts(THREE), RX, w1, RAIL, PI / 2);
    emit(wagonParts(THREE), RX, w2, RAIL, PI / 2);
    emit(tankParts(THREE), RX, w1 - 0.6, DECK, PI / 2);
    emit(shellParts(THREE), RX, w2, DECK + 0.25 - SHELL_Z0, PI / 2);
    for (s = -1; s <= 1; s += 2) B.S.add(bb(THREE, RX - 1.3, RX + 1.3, w2 + s * 2.0 - 0.13, w2 + s * 2.0 + 0.13, DECK, DECK + 0.25));

    /* ================================================== the gantry crane */
    for (s = 0; s < 2; s++) {
      var gx = s ? GX1 : GX0;
      B.S.add(bb(THREE, gx - 0.1, gx + 0.1, GRY0, GRY1, SLAB, SLAB + 0.16));
      /* sill beam on its two end carriages */
      B.C.add(bb(THREE, gx - 0.4, gx + 0.4, GY - 4.0, GY + 4.0, 1.0, 1.7));
      for (j = -1; j <= 1; j += 2) B.C.add(bb(THREE, gx - 0.45, gx + 0.45, GY + j * 3.4 - 0.7, GY + j * 3.4 + 0.7, SLAB + 0.1, 1.0));
      /* the A-frame leg, two tubes meeting under the girders, a tie */
      B.C.add(rod(THREE, [gx, GY - 3.4, 1.7], [gx, GY - 0.7, GIRD0 - 0.4], 0.32, 4));
      B.C.add(rod(THREE, [gx, GY + 3.4, 1.7], [gx, GY + 0.7, GIRD0 - 0.4], 0.32, 4));
      B.C.add(rod(THREE, [gx, GY - 2.2, 5.6], [gx, GY + 2.2, 5.6], 0.16, 4));
      B.C.add(bb(THREE, gx - 0.6, gx + 0.6, GY - 1.2, GY + 1.2, GIRD0 - 0.6, GIRD0));
    }
    /* twin box girders with the end ties over the legs */
    for (s = -1; s <= 1; s += 2) B.C.add(bb(THREE, GX0 - 0.9, GX1 + 0.9, GY + s * 0.95 - 0.28, GY + s * 0.95 + 0.28, GIRD0, GIRD1));
    B.C.add(bb(THREE, GX0 - 0.9, GX0 + 0.3, GY - 1.25, GY + 1.25, GIRD0, GIRD1 + 0.1));
    B.C.add(bb(THREE, GX1 - 0.3, GX1 + 0.9, GY - 1.25, GY + 1.25, GIRD0, GIRD1 + 0.1));
    /* the walkway on the north girder and its rail */
    B.S.add(bb(THREE, GX0 - 0.9, GX1 + 0.9, GY + 1.23, GY + 2.05, GIRD1 - 0.12, GIRD1 - 0.04));
    B.S.add(bb(THREE, GX0 - 0.9, GX1 + 0.9, GY + 1.98, GY + 2.05, GIRD1 + 0.9, GIRD1 + 0.96));
    /* the trolley over the laydown, its hoist and the spreader beam */
    var TRX = -17.2;
    B.C.add(bb(THREE, TRX - 1.3, TRX + 1.3, GY - 1.3, GY + 1.3, GIRD1, GIRD1 + 0.8));
    B.S.add(rod(THREE, [TRX - 0.9, GY, GIRD1 + 1.05], [TRX + 0.9, GY, GIRD1 + 1.05], 0.38, 10));
    for (s = -1; s <= 1; s += 2) B.S.add(bb(THREE, TRX + s * 0.35 - 0.03, TRX + s * 0.35 + 0.03, GY - 0.03, GY + 0.03, 7.6, GIRD0));
    B.C.add(bb(THREE, TRX - 0.5, TRX + 0.5, GY - 0.35, GY + 0.35, 6.9, 7.6));
    B.C.add(bb(THREE, TRX - 2.6, TRX + 2.6, GY - 0.15, GY + 0.15, 6.55, 6.9));
    /* the operator's cab on the east leg, its window to the laydown */
    B.C.add(bb(THREE, GX1 - 0.4 - 1.8, GX1 - 0.4, GY - 1.0, GY + 1.0, 7.0, 9.2));
    B.G.add(pane(THREE, "x", -1, GX1 - 2.35, GY - 0.8, GY + 0.8, 7.9, 9.0, 6, 1.1));

    /* ================================================ the laydown yard */
    [10.0, 15.5, 21.0].forEach(function (ly) {
      emit(shellParts(THREE), -17.2, ly, SLAB + 0.25 - SHELL_Z0, 0);
      for (s = -1; s <= 1; s += 2) B.S.add(bb(THREE, -17.2 + s * 2.1 - 0.13, -17.2 + s * 2.1 + 0.13, ly - 1.9, ly + 1.9, SLAB, SLAB + 0.25));
    });
    [-19.4, -15.0].forEach(function (lx) { emit(castingParts(THREE), lx, 26.3, SLAB, PI / 2); });

    /* ================================================== the wash rack */
    for (s = -1; s <= 1; s += 2) {
      var cxk = 27.25 + s * 2.3;
      B.C.add(bb(THREE, cxk - 0.15, cxk + 0.15, -27.3, -15.0, SLAB, SLAB + 0.3));
    }
    [-24.0, -18.5].forEach(function (fy) {
      for (s = -1; s <= 1; s += 2) B.S.add(rod(THREE, [27.25 + s * 2.45, fy, SLAB], [27.25 + s * 2.45, fy, 4.6], 0.09, 6));
      B.S.add(rod(THREE, [27.25 - 2.45, fy, 4.6], [27.25 + 2.45, fy, 4.6], 0.09, 6));
      B.S.add(rod(THREE, [27.25 - 2.45, fy - 0.35, 0.9], [27.25 - 2.45, fy + 0.35, 0.9], 0.07, 6));
      B.S.add(rod(THREE, [27.25 + 2.45, fy - 0.35, 0.9], [27.25 + 2.45, fy + 0.35, 0.9], 0.07, 6));
    });

    /* ============================================ the high-mast light
       One tapered tower lights the ramp and the apron for loading after
       dark, its lamp bank carried on a frame at the top. It stands where
       render3d puts the faction's south-west roof kit (the NATO mast at
       x -0.28w and the present-day radome at x -0.24w, both at z +0.22d
       in the stood-up wrap, which is model y -13.2), and its head reaches
       exactly the model's top, 16.7 m, so those stand on the lamp frame
       instead of floating over the yard. */
    (function () {
      var mx = -16.8, my = -13.2, top = EZ + TR + 0.1;
      B.Y.add(bb(THREE, mx - 0.9, mx + 0.9, my - 0.9, my + 0.9, SLAB, 0.55));
      B.S.add(cylZ(THREE, 0.2, 0.38, top - 1.2 - 0.55, 8, mx, my, 0.55));
      /* the service platform under the lamp bank, and the bank's frame */
      B.S.add(bb(THREE, -18.1, -13.6, -14.9, -12.5, top - 1.25, top - 1.05));
      B.S.add(bb(THREE, -18.1, -13.6, -14.9, -12.5, top - 0.2, top));
      for (var k = 0; k < 4; k++) {
        var lx = -17.8 + k * 1.3;
        B.S.add(bb(THREE, lx - 0.04, lx + 0.04, -14.85, -14.77, top - 1.05, top - 0.2));
        /* the lamps turned down toward the ramp and the doors, in dark
           housings as a high mast's are, not safety yellow */
        B.S.add(box(THREE, 0.9, 0.35, 0.6, lx + 0.35, -15.1, top - 0.62, 0.5, 0, 0));
      }
    })();

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    return root;
  }

  return { build: build };
})();

/* Registration. factory is the def itself (rules.js BUILDINGS.factory) and
   render3d getBuildingModel() looks the def id up directly, so nothing else
   draws this model; icons3d builds the sidebar icon from it too. */
BLD_MODELS["factory"] = { build: function (THREE, M, C) { return HeroArmourPlant.build(THREE, M, C); } };
