/* ===== ru_s75_s125.js - HERO models: S-75 Dvina and S-125 Neva launchers ====
   Two rows, two LAUNCHERS (not sites), each in TWO POSES:
     pact_e50_s75   S-75 Dvina (SA-2 Guideline): the SM-63 single-rail launcher
                    with its V-750 missile (1957).
     pact_e60_s125  S-125 Neva (SA-3 Goa): the 5P73 four-rail launcher with
                    four V-600 missiles (1961 row).
   WHY THE LAUNCHER: both rows are turret:true, deploy:true, rounds 1 and 4,
   and the weapon rows (sam_s75, sam_s125) are the missiles; the row's
   "rounds" count is the rails on the launcher, so the unit that trains,
   deploys and fires is the launcher. The Fan Song / Low Blow radar is a
   separate piece of the site and is not drawn. The old js/sam3d.js drew both
   rows as a missile on a TRACKED hull; neither launcher is self-propelled.

   TWO POSES (render3d shows one by e.deployed, visibility only):
     "deploypose"  the launcher set up at its firing position, loaded, the
                   trained "turret" inside it. Hidden in the template.
                   Inside the turret the rail(s) hang on a "podelev" group
                   (render3d poseLauncher): at rest they lie at the low
                   angle the museum launchers stand at, and while the unit
                   holds a target in reach they are raised by userData.el to
                   the steep angle others stand at; userData.cells are the
                   round noses (mouth x, y, z, tail x in the group's frame),
                   where render3d first draws a round leaving the rail.
                   The resting angle is built into the geometry (a turned
                   node would widen the engine's box), so the group's own
                   axis lies level at rest: render3d's launch flash points
                   along it, el above the horizon, lower than the rail by
                   the resting angle. A picture compromise; the round
                   itself starts at the nose and takes its own path.
     "travelpose"  the launcher on the march behind its tractor, unloaded,
                   rail(s) down (the SM-63's boom on its post, the 5P73's
                   rails level) and turned to the rear; its
                   traversing part is a group "launcher", NOT "turret", so
                   the renderer never trains it. The wheels (tractor and
                   carriage) are "roadwheel" groups. Shown in the template:
                   a unit is built and moves packed up.
   SCALE: the travel convoy is drawn at k of its true scale (k = deployed
   length / convoy length: 0.616 for the S-75's KrAZ-214 and SM-63,
   0.423 for the S-125's AT-S and 5P73; fitTravel measures it),
   centred on the deployed launcher, so that both poses fill the unit's
   footprint and the deployed launcher - the unit's identity - is drawn
   full size. len is the deployed pose's length. A choice made for the
   look; the owner may reverse it (drop fitTravel and len goes back to the
   convoy's).

   REFERENCES (Commons, fetched 2026-11-03 at 960 px; texts from the
   Russian and English Wikipedia articles "S-75" and "S-125"):
     [K]  "ZRK S-75 2007 G1" - the Kyiv SM-63 with a V-750, front-right
          three-quarter, rail at about 17 deg: the low cruciform frame of
          box beams with a jack box at each end, the turntable, the long
          traversing body (a lower front box with two buffer cylinders
          facing forward, the tall equipment housing at the rear with
          ribbed sides and a chamfered, slatted rear top), the boom HINGED
          AT THE REAR on top of the housing and running forward under the
          missile, the post hanging under the boom's front, and the missile:
          dark ogive with four canards, light band, grey sustainer with
          clipped-delta wings and four tail controls, light booster with
          four big cropped-delta fins.
     [P]  "SM-63.jpg" (St Petersburg artillery museum) - the same launcher
          at about 35 deg, the boom rising from the rear of the housing.
     [H]  "DVINA SA-75 SAM-2 launcher system downed 4 x F4S on 240765"
          (Hanoi) - two SM-63 at about 30-35 deg, the slatted housing and
          the jack pads on the cruciform frame.
     [F]  "Forward view of S-125 launcher 5P73 in Perm" and
     [R]  "Rear view of S-125 launcher 5P73 in Perm" - the 5P73: a round
          base plate on the ground with radial gussets and screw-jack lugs
          round the rim, a short pedestal, a box housing set ACROSS the
          firing line with doors and louvred ends, a long tube along its
          top (the elevation axis) ending in a drive box at one end, four
          rail arms fixed on that tube, a lateral truss with X-bracing
          joining the four rails under the missiles, the four V-600 side by
          side on top of the rails at about 50 deg, boosters at the bottom.
     [D]  "S-125 launcher 5P73 desc table in Perm" (as the earlier file):
          10,957 kg, 4 rails, towing speed 60 km/h, PR-14M loader.
     [W]  en.wikipedia "S-75 Dvina": the 1957 V-750 is 10.6 m long, booster
          0.65 m, sustainer 0.5 m in diameter (ru.wikipedia: 10,600 mm,
          first stage 700 mm); the 10.8 m rounds are the later V-750VK.
          en.wikipedia "S-125": V-601 body diameter 375 mm, length 6.09 m;
          ru.wikipedia: S-125 Neva (1961) fired the V-600P (5V24).
     pvo.guns.ru (as the earlier file): SM-63 moved on detachable wheel
          carriages behind KrAZ-214, missiles on PR-11 loaders (launcher
          marches empty); 5P73 towed by AT-S, rounds on PR-14 loaders.
     Ru-wiki KrAZ-214 and AT-S infoboxes, see the tractor functions.

   RECOGNITION (where each shows):
     1. SM-63 cruciform ground frame, jack box at each arm end [K][H]: sm63Frame.
     2. SM-63 long traversing body: lower front box with two forward buffer
        cylinders, tall ribbed housing with chamfered slatted rear top [K][H]: sm63Swing.
     3. Boom hinged at the housing's rear top, running forward under the
        missile, post hanging under its front [K][P]: sm63Boom (podelev).
     4. V-750 at 10.6 m: light booster with four big cropped-delta fins,
        grey sustainer with clipped-delta wings and tail controls, light
        band, dark ogive with canards [K][W]: v750.
     5. Low resting rail (17 deg [K]) raised to 35 deg for the shot [P][H]: podelev.
     6. 5P73 round base plate with radial gussets and rim lugs, short
        pedestal [R][F]: p73Ground.
     7. 5P73 box housing across the firing line, doors, louvred ends, the
        long elevation tube on top with its drive box at one end [R]: p73Swing.
     8. Four rails side by side on arms off the tube, lateral X-braced
        truss under them [F][R]: p73Rails (podelev).
     9. Four V-600: big light booster with cropped-delta fins, slim grey
        sustainer (375 mm), mid wings, canards [F][R][W]: v600.
    10. On the march: launcher empty, rails level and to the rear, on its
        carriages behind a KrAZ-214 / AT-S (pvo.guns.ru): the travel pose.
    11. 1950s-60s Soviet olive on the launchers, weathered, by canvas [P][F][R].

   CONFIRMED / CORRECTED against the earlier file: the SM-63's boom pivots
   at the REAR of the housing [K][P] (the earlier file stood it on an
   A-frame trunnion at mid-length: corrected); the 5P73's rails hang on a
   lateral elevation tube over a housing set across the firing line [R]
   (the earlier file had a small fore-and-aft body: corrected); the V-750
   is 10.6 m for the 1957 row [W] (was 10.8 m, the V-750VK: corrected);
   the V-600 sustainer is 375 mm [W] (was 384 mm). The angles are now
   the photographs' (17 deg at rest [K], 35 deg raised [P][H] for the
   SM-63; 25 deg at rest, unconfirmed, 50 deg raised [F] for the 5P73).
   NOT CONFIRMED and therefore chosen plainly: the published launch
   elevations (the photographs show museum poses, not drill), the form of
   the SM-63's wheel carriages (one twin-tyre axle under each end of the
   long beam, a drawbar on the front one), whether its side outriggers
   fold for the road, the 5P73's march carriage (two axles, jacks wound
   up) and whether its outer rails fold for the road (drawn as they
   stand), that the rails travel down and turned to the rear, the AT-S for
   the S-125 outside the desert (the only tractor the sources name), the
   5P73 rail spacing (1.1 m, set so the booster fins clear) and whether
   the housing sits centred on the pedestal ([R] may show it offset), the
   V-600 booster diameter (0.52 m) and fin span (1.5 m), the V-750 fin
   spans (booster 2.5 m, wings 2.1 m, read off [K]), the form of the
   SM-63's elevating drive (only the boom's front post is drawn), and the
   red bands the museum S-125 rounds wear (left off: museum paint). The
   Kyiv SM-63 is a dark-grey museum repaint; the period olive follows [P]
   and the Perm 5P73. No radar, cables or markings are drawn.
   ======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroS75S125 = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* ---------- merging: every part goes into a bin per material; the
     painted bin also gets planar metre UVs (0.34 a metre, the dominant
     axis of each face) so the canvas paint lands on every surface ---- */
  function Col(THREE) {
    this.T = THREE; this.bins = {}; this.st = [new THREE.Matrix4()];
  }
  Col.prototype.push = function (m) {
    this.st.push(this.st[this.st.length - 1].clone().multiply(m));
  };
  Col.prototype.pop = function () { this.st.pop(); };
  Col.prototype.add = function (key, g) {
    var b = this.bins[key] || (this.bins[key] = { P: [], N: [], U: key === "paint" ? [] : null });
    g.applyMatrix4(this.st[this.st.length - 1]);
    if (g.index) g = g.toNonIndexed();
    var p = g.attributes.position.array, n = g.attributes.normal.array, i, t, ax, ay, az, ux, uy, ex, ey, ez, fx, fy, fz;
    for (i = 0; i < p.length; i++) { b.P.push(p[i]); b.N.push(n[i]); }
    if (b.U) {
      for (t = 0; t + 8 < p.length; t += 9) {
        ex = p[t + 3] - p[t]; ey = p[t + 4] - p[t + 1]; ez = p[t + 5] - p[t + 2];
        fx = p[t + 6] - p[t]; fy = p[t + 7] - p[t + 1]; fz = p[t + 8] - p[t + 2];
        ax = Math.abs(ey * fz - ez * fy); ay = Math.abs(ez * fx - ex * fz); az = Math.abs(ex * fy - ey * fx);
        for (i = 0; i < 3; i++) {
          ux = p[t + i * 3]; uy = p[t + i * 3 + 1];
          if (az >= ax && az >= ay) b.U.push(ux * 0.34, uy * 0.34);
          else if (ay >= ax) b.U.push(ux * 0.34, p[t + i * 3 + 2] * 0.34);
          else b.U.push(uy * 0.34, p[t + i * 3 + 2] * 0.34);
        }
      }
    }
    g.dispose();
  };
  Col.prototype.flush = function (group, mats) {
    var k, b, geo, T = this.T;
    for (k in this.bins) {
      b = this.bins[k];
      if (!b.P.length) continue;
      geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new T.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new T.BufferAttribute(new Float32Array(b.U), 2));
      group.add(new T.Mesh(geo, mats[k]));
    }
  };

  function tri(Col_) { var n = 0, k; for (k in Col_.bins) n += Col_.bins[k].P.length / 9; return n; }

  /* ---------- the paint: one flat coat of period olive, weathered -------
     low-contrast drift, rain streaks running down, dust and scuffs; the
     256 px tile spans about 2.9 m and repeats (as ru_bm14_bm21.js) */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd, h;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 36;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 40; i++) {
        x = R() * 256; h = 20 + R() * 70; y = R() * 256;
        q.fillStyle = (i % 3) ? "rgba(20,20,14,0.07)" : "rgba(170,160,130,0.06)";
        q.fillRect(x, y, 1 + R() * 2, h);
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.06)" : "rgba(235,228,200,0.045)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 24, 2 + R() * 12);
      }
      /* panel seams: faint dark lines every 1.5 m or so */
      q.fillStyle = "rgba(18,18,12,0.10)";
      q.fillRect(0, 127, 256, 2); q.fillRect(127, 0, 2, 256);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* period olive, sampled off the St Petersburg SM-63 [P] and the Perm
     5P73 [F][R] (about #6a7446 and #66713f in daylight) and taken to about
     0.75 of that for the renderer's ACES lift */
  var PAINT = { base: "#4f5734", blots: ["#4a5230", "#565e3a", "#4c5531"], seed: 75125 };

  /* ---------- geometry helpers (all in metres, +X forward) ---------- */
  function G(THREE) {
    var T = THREE, h = {};
    h.T = function (x, y, z) { return new T.Matrix4().makeTranslation(x, y, z); };
    h.Ry = function (a) { return new T.Matrix4().makeRotationY(a); };
    h.Rx = function (a) { return new T.Matrix4().makeRotationX(a); };
    h.box = function (x0, x1, y0, y1, z0, z1) {
      var g = new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
      return g;
    };
    /* a cylinder along X from x0 to x1 (radius r0 at x0, r1 at x1) */
    h.cylX = function (x0, x1, r0, r1, seg, y, z) {
      var g = new T.CylinderGeometry(r1, r0, x1 - x0, seg, 1, false);
      g.rotateZ(-Math.PI / 2);
      g.translate((x0 + x1) / 2, y || 0, z || 0);
      return g;
    };
    h.cylZ = function (z0, z1, r0, r1, seg, x, y) {
      var g = new T.CylinderGeometry(r1, r0, z1 - z0, seg, 1, false);
      g.rotateX(Math.PI / 2);
      g.translate(x || 0, y || 0, (z0 + z1) / 2);
      return g;
    };
    h.cylY = function (y0, y1, r, seg, x, z) {
      if (y1 < y0) { var tq = y0; y0 = y1; y1 = tq; }
      var g = new T.CylinderGeometry(r, r, y1 - y0, seg, 1, false);
      g.translate(x || 0, (y0 + y1) / 2, z || 0);
      return g;
    };
    h.between = function (a, b, r, seg) {
      var d = new T.Vector3().subVectors(b, a), L = d.length();
      var g = new T.CylinderGeometry(r, r, L, seg || 8, 1, false);
      var q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.clone().normalize());
      g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(q));
      g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
      return g;
    };
    /* body of revolution about X: pts = [[x, r], ...] from tail to nose */
    h.lathe = function (pts, seg, y, z) {
      var v = [], i;
      for (i = 0; i < pts.length; i++) v.push(new T.Vector2(Math.max(pts[i][1], 0.0001), pts[i][0]));
      var g = new T.LatheGeometry(v, seg);
      g.rotateZ(-Math.PI / 2);
      g.translate(0, y || 0, z || 0);
      return g;
    };
    /* a thin fin: polygon in the X-R plane, thickness t, rolled about X */
    h.fin = function (poly, t, roll) {
      var s = new T.Shape(), i;
      s.moveTo(poly[0][0], poly[0][1]);
      for (i = 1; i < poly.length; i++) s.lineTo(poly[i][0], poly[i][1]);
      var g = new T.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, steps: 1 });
      g.translate(0, 0, -t / 2);
      g.rotateX(roll);
      return g;
    };
    return h;
  }

  /* a side profile [x, z] (any simple polygon) extruded across y0..y1 */
  function profY(THREE, pts, y0, y1) {
    var s = new THREE.Shape(), i;
    s.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    var g = new THREE.ExtrudeGeometry(s, { depth: y1 - y0, bevelEnabled: false, steps: 1 });
    g.rotateX(Math.PI / 2);
    g.translate(0, y1, 0);
    return g;
  }

  /* ---------- the missiles (axis along X, tail at x0, drawn at origin) ----
     Lofted from station tables [x from the nozzle, radius], read off [K]
     and [R][F] and scaled to the published lengths and diameters [W]. */
  /* V-750 of the 1957 S-75: 10.6 m; booster 0.654 m, sustainer 0.50 m */
  var V750 = {
    noz:  [[0, 0.20], [0.06, 0.25], [0.14, 0.29], [0.18, 0.30]],
    boo:  [[0.16, 0.314], [0.24, 0.327], [1.2, 0.327], [2.55, 0.327], [2.62, 0.329], [2.70, 0.327]],
    cone: [[2.70, 0.327], [2.86, 0.318], [3.06, 0.285], [3.22, 0.255], [3.30, 0.25]],
    sus:  [[3.28, 0.25], [4.2, 0.25], [6.0, 0.25], [7.6, 0.25], [7.98, 0.25]],
    band: [[7.98, 0.251], [8.4, 0.252], [8.95, 0.252], [9.05, 0.25]],
    nose: [[9.05, 0.25], [9.30, 0.243], [9.60, 0.222], [9.90, 0.185], [10.15, 0.140], [10.36, 0.088], [10.50, 0.045], [10.56, 0.022]],
    tip:  [[10.55, 0.012], [10.6, 0.006]]
  };
  function v750(c, h, x0) {
    var i, a, seg = 28, X = Math.PI / 4;
    c.push(h.T(x0, 0, 0));
    c.add("steel", h.lathe(V750.noz, seg));
    c.add("mWhite", h.lathe(V750.boo, seg));
    c.add("mWhite", h.lathe(V750.cone, seg));
    for (i = 0; i < 3; i++) c.add("steel", h.lathe([[0.8 + i * 0.62, 0.331], [0.83 + i * 0.62, 0.331]], seg));
    c.add("mBody", h.lathe(V750.sus, seg));
    c.add("mWhite", h.lathe(V750.band, seg));
    c.add("mDark", h.lathe(V750.nose, seg));
    c.add("steel", h.lathe(V750.tip, 6));
    /* seams, the joint ring and the cable duct along the sustainer [K] */
    for (i = 0; i < 4; i++) c.add("steel", h.lathe([[4.4 + i * 0.9, 0.253], [4.42 + i * 0.9, 0.253]], seg));
    c.add("steel", h.lathe([[7.96, 0.255], [8.0, 0.255]], seg));
    c.add("mBody", h.box(3.4, 7.9, -0.04, 0.04, 0.24, 0.29).applyMatrix4(h.Rx(X / 2)));
    /* booster fins: four big cropped deltas, root 2.0 m, out to r 1.25 */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mWhite", h.fin([[0.05, 0.31], [2.05, 0.31], [0.95, 1.25], [0.12, 1.25]], 0.05, a));
    }
    /* sustainer tail controls: four trapezoids at its rear [K] */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mBody", h.fin([[3.32, 0.24], [4.05, 0.24], [3.85, 0.62], [3.45, 0.62]], 0.035, a));
    }
    /* mid-body wings: four clipped deltas, root 1.9 m, out to r 1.05 */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mBody", h.fin([[5.15, 0.24], [7.05, 0.24], [6.65, 1.05], [5.95, 1.05]], 0.04, a));
    }
    /* nose canards, small swept trapezoids [K] */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mDark", h.fin([[9.55, 0.21], [9.98, 0.17], [9.92, 0.47], [9.76, 0.47]], 0.03, a));
    }
    c.pop();
  }

  /* V-600 of the 1961 S-125: 5.9 m; booster 0.52 m (not confirmed),
     sustainer 0.375 m [W] */
  var V600 = {
    noz:  [[0, 0.15], [0.06, 0.20], [0.12, 0.23]],
    boo:  [[0.10, 0.25], [0.18, 0.26], [1.0, 0.26], [1.72, 0.26], [1.78, 0.262], [1.84, 0.26]],
    cone: [[1.84, 0.26], [1.95, 0.24], [2.06, 0.205], [2.14, 0.19]],
    sus:  [[2.12, 0.1875], [3.0, 0.1875], [4.4, 0.1875], [4.95, 0.1875]],
    nose: [[4.95, 0.1875], [5.12, 0.18], [5.34, 0.155], [5.56, 0.11], [5.74, 0.06], [5.86, 0.022], [5.9, 0.006]]
  };
  function v600(c, h, x0) {
    var i, a, seg = 16, X = Math.PI / 4;
    c.push(h.T(x0, 0, 0));
    c.add("steel", h.lathe(V600.noz, seg));
    c.add("mWhite", h.lathe(V600.boo, seg));
    c.add("mWhite", h.lathe(V600.cone, seg));
    c.add("mBody", h.lathe(V600.sus, seg));
    c.add("mBody", h.lathe(V600.nose, seg));
    c.add("steel", h.lathe([[1.0, 0.264], [1.03, 0.264]], seg));
    for (i = 0; i < 2; i++) c.add("steel", h.lathe([[2.9 + i * 1.0, 0.19], [2.92 + i * 1.0, 0.19]], seg));
    /* booster fins: cropped deltas, span 1.5 m */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mWhite", h.fin([[0.04, 0.25], [1.25, 0.25], [0.62, 0.75], [0.08, 0.75]], 0.035, a));
    }
    /* sustainer wings at its rear [R][F] */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mBody", h.fin([[2.25, 0.18], [3.25, 0.18], [3.0, 0.62], [2.55, 0.62]], 0.03, a));
    }
    /* canards near the nose [R] */
    for (i = 0; i < 4; i++) {
      a = X + i * Math.PI / 2;
      c.add("mBody", h.fin([[4.78, 0.18], [5.1, 0.17], [5.05, 0.36], [4.92, 0.36]], 0.025, a));
    }
    c.pop();
  }

  function materials(THREE, C) {
    function std(col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); }
    var tx = paintTex(THREE, PAINT), paint = std(0xffffff, 0.86, 0.06);
    if (tx) paint.map = tx; else paint.color.set(PAINT.base);
    return {
      paint: paint,
      steel: std(0x2f3329, 0.7, 0.32),
      rubber: std(0x1b1c1d, 0.92, 0.02),
      mBody: std(0x9c9f97, 0.66, 0.18),
      mWhite: std(0xc9c9c0, 0.72, 0.1),
      mDark: std(0x2a2c2e, 0.55, 0.3),
      glass: std(0x26323a, 0.25, 0.5),
      team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 })
    };
  }

  /* ---------- a wheel set the renderer turns ("roadwheel"): the axle along
     local Y, the group's origin on the axle; one tyre at each y in ys ---- */
  function wheelSet(THREE, h, M, x, r, ys, tw, seg, treads, mono) {
    var c = new Col(THREE), i, j, s, y, sg;
    for (j = 0; j < ys.length; j++) {
      y = ys[j]; sg = y >= 0 ? 1 : -1;
      if (mono) {
        /* a small steel road wheel: rim and hub in one material, one mesh */
        c.add(mono, h.cylY(y - tw / 2, y + tw / 2, r, seg, 0, 0));
        c.add(mono, h.cylY(y + sg * (tw / 2), y + sg * (tw / 2 + 0.03), r * 0.45, 8, 0, 0));
        for (i = 0; i < treads; i++) {
          s = i * TAU / treads;
          var tb = new THREE.BoxGeometry(r * 0.3, tw * 0.8, 0.08);
          tb.translate(0, 0, r - 0.02);
          tb.rotateY(s);
          tb.translate(0, y, 0);
          c.add(mono, tb);
        }
        continue;
      }
      var pr = [[-tw / 2, r * 0.6], [-tw / 2 + 0.03, r * 0.9], [-tw / 2 + 0.1, r], [tw / 2 - 0.1, r], [tw / 2 - 0.03, r * 0.9], [tw / 2, r * 0.6]];
      var v = [];
      for (i = 0; i < pr.length; i++) v.push(new THREE.Vector2(pr[i][1], pr[i][0]));
      var tg = new THREE.LatheGeometry(v, seg);
      tg.translate(0, y, 0);
      c.add("rubber", tg);
      for (i = 0; i < treads; i++) {
        s = i * TAU / treads;
        var bl = new THREE.BoxGeometry(r * 0.16, tw - 0.12, 0.04);
        bl.translate(0, 0, r - 0.02);
        bl.rotateY(s);
        bl.translate(0, y, 0);
        c.add("rubber", bl);
      }
      c.add("paint", h.cylY(y - tw / 2 + 0.02, y + tw / 2 - 0.02, r * 0.6, seg, 0, 0));
      c.add("paint", h.cylY(y + sg * (tw / 2 - 0.02), y + sg * (tw / 2 + 0.04), r * 0.24, 8, 0, 0));
    }
    var g = new THREE.Group();
    g.name = "roadwheel";
    g.position.set(x, 0, r);
    c.flush(g, M);
    g._tris = tri(c);
    return g;
  }

  /* ---------- fittings (the detail pass): a polyline of round bar ---------- */
  function rod(c, h, THREE, key, P, r) {
    for (var i = 0; i + 1 < P.length; i++) c.add(key, h.between(new THREE.Vector3(P[i][0], P[i][1], P[i][2]), new THREE.Vector3(P[i + 1][0], P[i + 1][1], P[i + 1][2]), r, 6));
  }
  /* the KrAZ-214's small fittings (the Togliatti truck's and any KrAZ's): mirrors on arms at the windscreen
     pillars, wipers (kept within the 9,000-triangle
     budget a pose has, tools/jsc/deploypose_check.js) */
  function krazFittings(c, h, THREE) {
    var j, y;
    for (j = -1; j <= 1; j += 2) {
      y = j * 1.24;
      rod(c, h, THREE, "steel", [[-2.14, y, 2.30], [-2.10, j * 1.52, 2.30], [-2.10, j * 1.52, 2.10]], 0.015);
      c.add("steel", h.box(-2.16, -2.10, j * 1.52 - 0.08, j * 1.52 + 0.08, 2.08, 2.40));
      c.add("steel", h.box(-2.06, -2.04, j * 0.42 - 0.012, j * 0.42 + 0.012, 2.08, 2.48));
    }
  }
  /* the AT-S's small fittings ("Artillery tractor AT-S.JPG", the same photograph as ru_sopka.js): the
     searchlight on its post at the cab's front right corner, the wipers, the steps on the track guards, the
     door handles */
  function atsFittings(c, h, THREE) {
    var j;
    for (j = -1; j <= 1; j += 2) {
      c.add("steel", h.box(-1.07, -1.05, j * 0.45 - 0.012, j * 0.45 + 0.012, 1.84, 2.28));
      c.add("steel", h.box(-2.70, -1.90, j > 0 ? 1.10 : -1.30, j > 0 ? 1.30 : -1.10, 1.0, 1.03));
      c.add("steel", h.box(-2.95, -2.84, j * 1.29 - 0.01, j * 1.29 + j * 0.025, 1.70, 1.74));
    }
    c.add("steel", h.cylZ(2.42, 2.64, 0.025, 0.025, 6, -1.14, -0.98));
    c.add("steel", h.cylX(-1.24, -1.08, 0.09, 0.09, 10, -0.98, 2.70));
    c.add("glass", h.cylX(-1.08, -1.07, 0.075, 0.075, 10, -0.98, 2.70));
  }
  /* the SM-63's swinging part: the ladder up the housing's left side, handles on the front box's doors, the
     junction box low on the rear deck (NOT CONFIRMED in detail: placed by the housing's form) */
  function sm63Fittings(tur, h, THREE) {
    var i, j, x;
    for (i = 0; i < 5; i++) tur.add("steel", h.box(-0.30, -0.05, 1.03, 1.06, 0.30 + i * 0.30, 0.33 + i * 0.30));
    for (j = 0; j < 2; j++) tur.add("steel", h.box(j ? -0.07 : -0.30, j ? -0.04 : -0.27, 1.00, 1.06, 0.20, 1.80));
    for (j = -1; j <= 1; j += 2) {
      for (i = 0; i < 3; i++) { x = 1.05 + i * 0.64; tur.add("steel", h.box(x + 0.44, x + 0.50, j * 0.635 - 0.01, j * 0.635 + j * 0.03, 0.80, 0.86)); }
      tur.add("paint", h.box(-2.10, -1.70, j * 0.95 - 0.02, j * 0.95 + j * 0.10, 0.35, 0.75));
    }
  }
  /* the 5P73's traversing part: a junction box low on the front face; on the ground plate the handwheels on
     the screw jacks */
  function p73Fittings(tur, h, THREE) {
    tur.add("paint", h.box(0.62, 0.72, 1.10, 1.50, 0.12, 0.40));
  }
  function p73GroundFittings(c, h, THREE) {
    var i, s;
    for (i = 0; i < 8; i++) {
      s = i * TAU / 8;
      c.add("steel", h.cylZ(0.50, 0.53, 0.11, 0.11, 10, Math.cos(s) * 1.5, Math.sin(s) * 1.5));
    }
  }

  /* ---------------- the KrAZ-214 6x6 truck (the S-75 launcher's tractor) ----
     Ru-wiki infobox: 8,575 x 2,700 x 2,880 mm (3,180 over the tilt),
     wheelbase 4,600 + 1,400 mm, track 2,030 mm. Shape from the Togliatti
     museum truck: long flat bonnet with a slatted grille, flat-topped front
     wings, a two-door cab with a two-pane windscreen, a dropside body with
     stakes, single tyres on all three axles. Front bumper at local x = 0. */
  function kraz214(c, h, THREE, M, grp, X) {
    var i, j, y, x, V = THREE.Vector3, R = 0.63, AXL = [-1.12, -5.72, -7.12];
    c.push(h.T(X, 0, 0));
    /* frame, bumper, towing pintle */
    for (j = -1; j <= 1; j += 2) c.add("steel", h.box(-8.45, -0.3, j * 0.42 - 0.06, j * 0.42 + 0.06, 0.72, 0.98));
    c.add("paint", h.box(-0.24, 0, -1.22, 1.22, 0.6, 0.84));
    for (j = -1; j <= 1; j += 2) c.add("steel", h.box(-0.1, 0.06, j * 0.62 - 0.05, j * 0.62 + 0.05, 0.66, 0.78));
    c.add("steel", h.box(-8.6, -8.4, -0.3, 0.3, 0.7, 0.95));
    c.add("steel", h.cylY(-0.08, 0.08, 0.09, 10, -8.66, 0.86));
    /* bonnet, grille with vertical slats, front wings, headlamps */
    c.add("paint", h.box(-2.1, -0.14, -0.56, 0.56, 1.0, 1.86));
    c.add("paint", h.box(-2.1, -0.18, -0.5, 0.5, 1.86, 1.94));
    c.add("steel", h.box(-0.16, -0.1, -0.5, 0.5, 1.06, 1.84));
    for (i = 0; i < 11; i++) c.add("paint", h.box(-0.12, -0.08, -0.46 + i * 0.092, -0.43 + i * 0.092, 1.08, 1.82));
    for (j = -1; j <= 1; j += 2) {
      y = j * 0.98;
      c.add("paint", h.box(-2.05, -0.22, y - 0.38, y + 0.38, 1.42, 1.48));
      c.add("paint", h.box(-0.3, -0.22, y - 0.38, y + 0.38, 0.95, 1.44));
      c.add("paint", h.box(-2.05, -1.95, y - 0.38, y + 0.38, 0.95, 1.44));
      c.add("steel", h.cylX(-0.42, -0.24, 0.12, 0.13, 12, y * 0.82, 1.6));
      c.add("glass", h.cylX(-0.245, -0.23, 0.11, 0.11, 12, y * 0.82, 1.6));
      c.add("steel", h.box(-0.36, -0.3, y * 0.82 - 0.03, y * 0.82 + 0.03, 1.48, 1.56));
    }
    /* cab: body, rounded roof, two-pane windscreen, door windows, steps */
    c.add("paint", h.box(-3.56, -2.06, -1.24, 1.24, 1.28, 2.6));
    c.add("paint", h.box(-3.5, -2.14, -1.16, 1.16, 2.6, 2.84));
    c.add("paint", h.box(-3.53, -2.1, -1.21, 1.21, 2.6, 2.74));
    for (j = -1; j <= 1; j += 2) {
      c.add("glass", h.box(-2.07, -2.04, j > 0 ? 0.06 : -1.08, j > 0 ? 1.08 : -0.06, 2.02, 2.52));
      c.add("glass", h.box(-3.0, -2.3, j * 1.24 - 0.015, j * 1.24 + 0.015, 1.98, 2.5));
      c.add("steel", h.box(-3.08, -3.04, j * 1.245 - 0.01, j * 1.245 + 0.01, 1.32, 2.52));
      c.add("steel", h.box(-2.5, -2.36, j * 1.245 - 0.01, j * 1.245 + 0.012, 1.72, 1.78));
      c.add("steel", h.box(-3.0, -2.3, j * 1.12 - 0.15, j * 1.12 + 0.15, 1.02, 1.06));
      /* fuel tank under the body, behind the cab */
      c.add("paint", h.cylX(-4.85, -3.85, 0.27, 0.27, 14, j * 0.95, 0.88));
      /* the rear bogie's spring beam */
      c.add("steel", h.box(-7.2, -5.64, j * 0.82 - 0.08, j * 0.82 + 0.08, 0.6, 0.76));
    }
    c.add("steel", h.box(-2.075, -2.04, -0.06, 0.06, 2.0, 2.54));
    /* dropside body: floor, sides, front board, tailgate, stakes */
    c.add("paint", h.box(-8.5, -3.75, -1.32, 1.32, 1.3, 1.42));
    c.add("steel", h.box(-8.5, -3.75, -1.3, 1.3, 1.16, 1.3));
    for (j = -1; j <= 1; j += 2) {
      c.add("paint", h.box(-8.5, -3.75, j * 1.29 - 0.03, j * 1.29 + 0.03, 1.42, 1.96));
      for (i = 0; i < 6; i++) {
        x = -4.0 - i * 0.88;
        c.add("steel", h.box(x - 0.05, x + 0.05, j * 1.33 - 0.02, j * 1.33 + 0.02, 1.3, 1.96));
      }
    }
    c.add("paint", h.box(-3.8, -3.72, -1.32, 1.32, 1.42, 2.12));
    c.add("paint", h.box(-8.52, -8.46, -1.32, 1.32, 1.42, 1.96));
    for (i = 0; i < 3; i++) c.add("steel", h.box(-8.55, -8.52, -1.2 + i * 1.2 - 0.05, -1.2 + i * 1.2 + 0.05, 1.45, 1.92));
    /* axles and the rear lamps */
    for (i = 0; i < 3; i++) c.add("steel", h.cylY(-0.88, 0.88, 0.09, 10, AXL[i], R));
    for (j = -1; j <= 1; j += 2) c.add("mDark", h.box(-8.56, -8.5, j * 1.1 - 0.08, j * 1.1 + 0.08, 1.0, 1.1));
    krazFittings(c, h, THREE);
    c.pop();
    for (i = 0; i < 3; i++) grp.add(wheelSet(THREE, h, M, X + AXL[i], R, [-1.015, 1.015], 0.37, 12, 8));
  }

  /* ---------------- the AT-S medium tracked artillery tractor -------------
     (the S-125 launcher's tractor) Ru-wiki: 5,870 x 2,570 x 2,533 mm,
     2,840 mm of track on the ground, 8-14 t towed. Shape from the museum
     tractor on Commons "Artillery tractor AT-S": a low engine nose with a
     slatted grille and two big lamps on top, a full-width boxy cab with two
     flat windscreens, a short stake-sided cargo body behind, small road
     wheels, the drive sprocket at the front. Nose at local x = 0. */
  function ats(c, h, THREE, M, grp, X) {
    var i, j, y, x, RW = 0.27, YT = 0.98, TW = 0.42;
    c.push(h.T(X, 0, 0));
    /* lower hull and track guards */
    c.add("paint", h.box(-5.6, -0.25, -0.76, 0.76, 0.36, 0.98));
    for (j = -1; j <= 1; j += 2) {
      y = j * YT;
      c.add("paint", h.box(-5.85, -0.1, y - TW / 2 - 0.08, y + TW / 2 + 0.08, 0.96, 1.0));
      /* the track: lower run, upper run, the two runs round sprocket and idler */
      c.add("steel", h.box(-4.2, -0.95, y - TW / 2, y + TW / 2, 0, 0.06));
      c.add("steel", h.box(-4.8, -0.55, y - TW / 2, y + TW / 2, 0.84, 0.9));
      c.add("steel", h.box(-0.38, 0.38, y - TW / 2, y + TW / 2, -0.03, 0.03).applyMatrix4(
        new THREE.Matrix4().makeTranslation(-0.6, 0, 0.3).multiply(new THREE.Matrix4().makeRotationY(-0.68))));
      c.add("steel", h.box(-0.4, 0.4, y - TW / 2, y + TW / 2, -0.03, 0.03).applyMatrix4(
        new THREE.Matrix4().makeTranslation(-4.45, 0, 0.45).multiply(new THREE.Matrix4().makeRotationY(1.1))));
      for (i = 0; i < 12; i++) {
        x = -4.1 + i * 0.27;
        c.add("steel", h.box(x, x + 0.06, y - TW / 2, y + TW / 2, -0.0, 0.08));
      }
      /* return rollers */
      for (i = 0; i < 3; i++) c.add("steel", h.cylY(y - 0.12, y + 0.12, 0.09, 8, -1.5 - i * 1.1, 0.78));
    }
    /* engine nose, grille, lamps */
    c.add("paint", h.box(-1.2, -0.02, -1.15, 1.15, 0.98, 1.56));
    c.add("steel", h.box(-0.04, 0.0, -0.42, 0.42, 1.04, 1.5));
    for (i = 0; i < 9; i++) c.add("paint", h.box(-0.02, 0.02, -0.38 + i * 0.094, -0.35 + i * 0.094, 1.06, 1.48));
    for (j = -1; j <= 1; j += 2) {
      c.add("steel", h.cylZ(1.56, 1.66, 0.05, 0.05, 6, -0.25, j * 0.95));
      c.add("steel", h.cylX(-0.42, -0.2, 0.13, 0.15, 12, j * 0.95, 1.78));
      c.add("glass", h.cylX(-0.205, -0.19, 0.13, 0.13, 12, j * 0.95, 1.78));
      c.add("steel", h.box(-0.06, 0.02, j * 0.8 - 0.1, j * 0.8 + 0.1, 1.2, 1.36));
    }
    /* cab: full width, two flat windscreens, door windows, door seams */
    c.add("paint", h.box(-3.1, -1.05, -1.285, 1.285, 0.98, 2.42));
    c.add("paint", h.box(-3.05, -1.12, -1.23, 1.23, 2.42, 2.52));
    for (j = -1; j <= 1; j += 2) {
      c.add("glass", h.box(-1.07, -1.03, j > 0 ? 0.08 : -1.1, j > 0 ? 1.1 : -0.08, 1.78, 2.3));
      c.add("glass", h.box(-1.95, -1.3, j * 1.285 - 0.015, j * 1.285 + 0.015, 1.8, 2.28));
      c.add("glass", h.box(-2.75, -2.15, j * 1.285 - 0.015, j * 1.285 + 0.015, 1.8, 2.28));
      c.add("steel", h.box(-2.05, -2.02, j * 1.29 - 0.01, j * 1.29 + 0.01, 1.05, 2.36));
      c.add("steel", h.box(-1.45, -1.3, j * 1.29 - 0.01, j * 1.29 + 0.012, 1.55, 1.6));
    }
    c.add("steel", h.box(-1.06, -1.03, -0.08, 0.08, 1.76, 2.34));
    /* cargo body: floor, stake sides with a top rail, tailboard */
    c.add("paint", h.box(-5.87, -3.1, -1.25, 1.25, 0.98, 1.08));
    for (j = -1; j <= 1; j += 2) {
      c.add("paint", h.box(-5.87, -3.1, j * 1.25 - 0.03, j * 1.25 + 0.03, 1.08, 1.42));
      c.add("steel", h.box(-5.87, -3.1, j * 1.25 - 0.025, j * 1.25 + 0.025, 1.78, 1.82));
      for (i = 0; i < 6; i++) {
        x = -3.2 - i * 0.52;
        c.add("steel", h.box(x - 0.025, x + 0.025, j * 1.25 - 0.025, j * 1.25 + 0.025, 1.08, 1.8));
      }
    }
    c.add("paint", h.box(-5.87, -5.81, -1.25, 1.25, 1.08, 1.42));
    c.add("steel", h.box(-5.87, -5.83, -1.25, 1.25, 1.78, 1.82));
    /* towing hook */
    c.add("steel", h.box(-6.0, -5.6, -0.2, 0.2, 0.62, 0.86));
    c.add("steel", h.cylY(-0.08, 0.08, 0.09, 10, -6.04, 0.74));
    atsFittings(c, h, THREE);
    c.pop();
    /* six road wheels a side (each pair on one axle group), sprocket, idler */
    for (i = 0; i < 6; i++) grp.add(wheelSet(THREE, h, M, X - 1.2 - i * 0.56, RW, [-YT, YT], 0.18, 12, 0, "steel"));
    grp.add(wheelSet(THREE, h, M, X - 0.55, 0.3, [-YT, YT], 0.16, 12, 12, "steel"));
    grp.children[grp.children.length - 1].position.z = 0.6;
    grp.add(wheelSet(THREE, h, M, X - 4.62, 0.28, [-YT, YT], 0.16, 12, 0, "steel"));
    grp.children[grp.children.length - 1].position.z = 0.5;
  }

  /* ---------------- the S-75 SM-63: fixed frame and traversing part -------- */
  /* the cruciform ground frame; travel = on its detachable wheel carriages */
  function sm63Frame(base, h, THREE, Z) {
    var i, j, s, x, y;
    base.push(h.T(0, 0, Z));
    base.add("paint", h.box(-2.9, 2.9, -0.21, 0.21, 0.16, 0.50));
    base.add("paint", h.box(-0.21, 0.21, -2.3, 2.3, 0.16, 0.50));
    base.add("steel", h.box(-2.9, 2.9, -0.15, 0.15, 0.50, 0.54));
    base.add("steel", h.box(-0.15, 0.15, -2.3, 2.3, 0.50, 0.54));
    var ends = [[2.7, 0], [-2.7, 0], [0, 2.1], [0, -2.1]];
    for (i = 0; i < 4; i++) {
      x = ends[i][0]; y = ends[i][1];
      base.add("steel", h.box(x - 0.42, x + 0.42, y - 0.42, y + 0.42, 0, 0.14));
      base.add("paint", h.cylZ(0.14, 0.62, 0.09, 0.09, 12, x, y));
      base.add("steel", h.cylZ(0.62, 0.72, 0.12, 0.12, 8, x, y));
      for (j = 0; j < 4; j++) base.add("steel", h.cylZ(0.14, 0.17, 0.04, 0.04, 6, x + (j % 2 ? 0.3 : -0.3), y + (j < 2 ? 0.3 : -0.3)));
      base.add("paint", h.box(x - 0.14, x + 0.14, y - 0.14, y + 0.14, 0.50, 0.58));
    }
    for (i = 0; i < 4; i++) {
      var sx = (i & 1) ? 1 : -1, sy = (i & 2) ? 1 : -1;
      base.add("paint", h.between(new THREE.Vector3(sx * 0.3, sy * 0.3, 0.52), new THREE.Vector3(sx * 1.3, sy * 0.3, 0.2), 0.045, 8));
      base.add("paint", h.between(new THREE.Vector3(sx * 0.3, sy * 0.3, 0.52), new THREE.Vector3(sx * 0.3, sy * 1.3, 0.2), 0.045, 8));
    }
    base.add("steel", h.cylZ(0.5, 0.62, 1.15, 1.15, 28, 0, 0));
    base.add("paint", h.cylZ(0.5, 0.58, 1.05, 1.05, 28, 0, 0));
    for (i = 0; i < 12; i++) {
      s = i * TAU / 12;
      base.add("steel", h.cylZ(0.58, 0.62, 0.04, 0.04, 6, Math.cos(s) * 1.1, Math.sin(s) * 1.1));
    }
    for (i = 0; i < 8; i++) {
      base.add("steel", h.box(-2.5 + i * 0.7, -2.4 + i * 0.7, -0.24, -0.21, 0.30, 0.42));
      base.add("steel", h.box(-2.5 + i * 0.7, -2.4 + i * 0.7, 0.21, 0.24, 0.30, 0.42));
    }
    base.pop();
  }
  /* the traversing part about the ring centre [K][H]: the turntable, the
     long body (a low rear deck under the tall equipment housing, a lower
     front box with two buffer cylinders facing forward), the housing with
     ribbed sides and a chamfered, slatted rear top, the trunnion cheeks
     on its top at the rear. The boom is drawn by sm63Boom about PIV. */
  var SM_PIV = [-2.0, 2.4];          /* boom pivot (x, z) in the turret frame */
  function sm63Swing(tur, h, THREE) {
    var i, j, s, x, y;
    tur.add("steel", h.cylZ(0, 0.14, 1.25, 1.25, 28, 0, 0));
    for (i = 0; i < 12; i++) {
      s = i * TAU / 12;
      tur.add("steel", h.cylZ(0.14, 0.2, 0.045, 0.045, 6, Math.cos(s) * 1.18, Math.sin(s) * 1.18));
    }
    /* low rear deck and the lower front box */
    tur.add("paint", h.box(-2.6, 0.9, -0.95, 0.95, 0.14, 0.95));
    tur.add("paint", profY(THREE, [[0.9, 0.14], [3.0, 0.14], [3.0, 1.38], [2.85, 1.55], [0.9, 1.55]], -0.62, 0.62));
    tur.add("steel", h.box(0.95, 2.95, -0.64, 0.64, 1.55, 1.59));
    /* the saddle the boom's post comes down on at rest [K] */
    tur.add("paint", profY(THREE, [[1.95, 1.59], [2.95, 1.59], [2.95, 2.3], [2.05, 2.12]], -0.46, 0.46));
    for (j = -1; j <= 1; j += 2) tur.add("steel", h.box(2.2, 2.75, j * 0.46 - 0.012, j * 0.46 + 0.012, 1.7, 2.05));
    /* the front box's side doors and hinges */
    for (j = -1; j <= 1; j += 2) {
      for (i = 0; i < 3; i++) {
        x = 1.05 + i * 0.64;
        tur.add("paint", h.box(x, x + 0.56, j * 0.62 - 0.012, j * 0.62 + 0.012, 0.32, 1.32));
        tur.add("steel", h.box(x + 0.02, x + 0.05, j * 0.635 - 0.01, j * 0.635 + 0.01, 0.4, 1.24));
      }
      /* the rear deck's side doors */
      for (i = 0; i < 2; i++) {
        x = -0.15 + i * 0.5;
        tur.add("paint", h.box(x, x + 0.44, j * 0.95 - 0.012, j * 0.95 + 0.012, 0.25, 0.85));
      }
    }
    /* two buffer cylinders out of the front box, low [K] */
    for (j = -1; j <= 1; j += 2) {
      tur.add("steel", h.cylX(3.0, 3.42, 0.12, 0.12, 14, j * 0.28, 0.48));
      tur.add("steel", h.cylX(3.42, 3.52, 0.16, 0.16, 14, j * 0.28, 0.48));
      tur.add("paint", h.box(2.98, 3.06, j * 0.28 - 0.2, j * 0.28 + 0.2, 0.26, 0.7));
    }
    /* the equipment housing: chamfered at the rear top [K][H] */
    var HP = [[-2.75, 0.95], [-0.2, 0.95], [-0.2, 1.95], [-1.5, 1.95], [-2.75, 1.38]];
    tur.add("paint", profY(THREE, HP, -1.0, 1.0));
    tur.add("steel", h.box(-1.55, -0.18, -1.02, 1.02, 1.93, 1.97));
    /* slats on the chamfer */
    var ch = Math.atan2(1.95 - 1.38, 2.75 - 1.5);
    for (i = 0; i < 8; i++) {
      var u = (i + 0.6) / 8.6, cx = -2.75 + u * 1.25, cz = 1.38 + u * 0.57;
      tur.push(h.T(cx, 0, cz).multiply(h.Ry(-ch)));
      tur.add("steel", h.box(-0.05, 0.05, -0.86, 0.86, 0.0, 0.04));
      tur.pop();
    }
    /* vertical ribs on the housing sides and its rear face [K] */
    for (j = -1; j <= 1; j += 2) {
      for (i = 0; i < 8; i++) {
        x = -2.62 + i * 0.32;
        var top = x < -1.5 ? 1.38 + (x + 2.75) / 1.25 * 0.57 - 0.04 : 1.91;
        tur.add("steel", h.box(x, x + 0.05, j * 1.0 - 0.025, j * 1.0 + 0.025, 1.0, top));
      }
      tur.add("paint", h.box(-0.95, -0.35, j * 1.0 - 0.012, j * 1.0 + 0.012, 1.1, 1.8));
      tur.add("steel", h.box(-0.42, -0.38, j * 1.015 - 0.01, j * 1.015 + 0.01, 1.4, 1.5));
    }
    for (i = 0; i < 5; i++) tur.add("steel", h.box(-2.77, -2.73, -0.85 + i * 0.42, -0.8 + i * 0.42, 0.98, 1.36));
    /* trunnion cheeks on the housing top at the rear */
    for (j = -1; j <= 1; j += 2) {
      tur.add("paint", profY(THREE, [[-2.35, 1.6], [-1.45, 1.95], [-1.65, 2.62], [-2.35, 2.62]], j > 0 ? 0.31 : -0.43, j > 0 ? 0.43 : -0.31));
      tur.add("steel", h.cylY(j * 0.43, j * 0.5, 0.17, 14, SM_PIV[0], SM_PIV[1]));
    }
    tur.add("steel", h.cylY(-0.52, 0.52, 0.09, 12, SM_PIV[0], SM_PIV[1]));
    /* a handrail and step at the housing's front */
    tur.add("steel", h.box(-0.2, -0.05, -0.6, 0.6, 1.2, 1.24));
    tur.add("steel", h.box(-0.2, 0.25, -0.5, 0.5, 0.95, 0.99));
    /* the side's modest team mark: a small plate on the housing top */
    tur.add("team", h.box(-1.25, -0.55, -0.4, 0.4, 1.97, 1.985));
    sm63Fittings(tur, h, THREE);
  }
  /* the boom in its own frame: origin on the pivot, X along the rail.
     A box girder with stiffeners, the rail with its shoe clamps on top,
     the post hanging under its front [K]; the V-750 rides on it, tail
     just behind the pivot. */
  var SM_AX = 0.67, SM_TAIL = -0.7;       /* missile axis height, tail x */
  function sm63Boom(c, h, THREE, loaded) {
    var i, j, x;
    c.add("paint", profY(THREE, [[-0.45, -0.45], [4.7, -0.45], [5.6, -0.12], [5.6, 0.2], [-0.45, 0.2]], -0.3, 0.3));
    c.add("steel", h.cylY(-0.29, 0.29, 0.2, 14, 0, 0));
    for (i = 0; i < 10; i++) {
      x = -0.25 + i * 0.55;
      for (j = -1; j <= 1; j += 2) c.add("steel", h.box(x, x + 0.05, j * 0.3 - 0.02, j * 0.3 + 0.02, x > 4.7 ? -0.1 : -0.43, 0.18));
    }
    for (j = -1; j <= 1; j += 2) c.add("steel", h.box(-0.45, 4.7, j * 0.3 - 0.03, j * 0.3 + 0.03, -0.47, -0.41));
    c.add("steel", h.box(-0.6, 5.7, -0.11, 0.11, 0.2, 0.26));
    c.add("steel", h.box(-0.6, 5.7, -0.05, 0.05, 0.26, 0.29));
    /* shoe clamps: booster pair at the rear, sustainer pair forward */
    var sh = [[-0.2, 0.34], [1.5, 0.34], [3.9, 0.42], [4.9, 0.42]];
    for (i = 0; i < sh.length; i++) {
      x = sh[i][0];
      c.add("steel", h.box(x - 0.2, x + 0.2, -0.13, 0.13, 0.26, sh[i][1]));
      c.add("steel", h.box(x - 0.2, x + 0.2, -0.17, -0.13, 0.22, sh[i][1] + 0.12));
      c.add("steel", h.box(x - 0.2, x + 0.2, 0.13, 0.17, 0.22, sh[i][1] + 0.12));
    }
    /* the post under the front [K]: a heavy box, ribbed, with a foot that
       comes down on the saddle of the front box at rest */
    c.add("paint", h.box(3.9, 4.6, -0.38, 0.38, -1.3, -0.45));
    for (j = -1; j <= 1; j += 2) for (i = 0; i < 3; i++) c.add("steel", h.box(3.98 + i * 0.25, 4.02 + i * 0.25, j * 0.38 - 0.02, j * 0.38 + 0.02, -1.25, -0.47));
    c.add("steel", h.box(3.82, 4.68, -0.42, 0.42, -1.38, -1.3));
    /* the tail stop at the rear end */
    c.add("steel", h.box(-0.62, -0.56, -0.2, 0.2, -0.15, 0.3));
    if (loaded) {
      c.push(h.T(0, 0, SM_AX));
      v750(c, h, SM_TAIL);
      c.pop();
    }
  }

  /* a detachable wheel carriage under one end of the long beam (travel) */
  function sm63Carriage(c, h, THREE, x, Z, bar) {
    var j, V = THREE.Vector3;
    c.add("paint", h.box(x - 0.45, x + 0.45, -0.7, 0.7, 0.62, 0.78));
    c.add("steel", h.cylY(-0.85, 0.85, 0.07, 10, x, 0.52));
    for (j = -1; j <= 1; j += 2) {
      c.add("steel", h.box(x - 0.35, x + 0.35, j * 0.62 - 0.05, j * 0.62 + 0.05, 0.42, 0.62));
      c.add("paint", h.box(x - 0.55, x + 0.55, j * 1.0 - 0.22, j * 1.0 + 0.22, 1.08, 1.12));
      c.add("paint", h.box(x - 0.55, x - 0.51, j * 1.0 - 0.22, j * 1.0 + 0.22, 0.8, 1.1));
      c.add("paint", h.box(x + 0.51, x + 0.55, j * 1.0 - 0.22, j * 1.0 + 0.22, 0.8, 1.1));
      if (bar) c.add("paint", h.between(new V(x + 0.4, j * 0.55, 0.7), new V(bar, j * 0.06, 0.86), 0.06, 10));
    }
    if (bar) {
      c.add("steel", h.cylZ(0.78, 0.94, 0.12, 0.12, 14, bar, 0));
      c.add("steel", h.box(bar - 0.5, bar - 0.1, -0.14, 0.14, 0.8, 0.9));
    }
  }

  /* The convoy is drawn at k of its true scale, k = deployed length / convoy
     length, and centred on the deployed launcher along X: the game draws a
     unit to its own footprint by the box of the whole model, and the
     deployed launcher is the unit, so it keeps the whole footprint and the
     model's box is the deployed pose's. Scaled about the group's origin at
     z = 0, so the convoy still stands on the ground. */
  function fitTravel(THREE, trv, dep) {
    var bd = new THREE.Box3().setFromObject(dep), bt = new THREE.Box3().setFromObject(trv);
    var k = (bd.max.x - bd.min.x) / (bt.max.x - bt.min.x);
    trv.scale.setScalar(k);
    trv.position.x = (bd.min.x + bd.max.x) / 2 - k * (bt.min.x + bt.max.x) / 2;
    trv.userData.k = k;
  }

  /* the rail(s) on a "podelev" hinged on the pivot: render3d raises it by
     userData.el (rotation.y = -el) while the unit holds a target in reach.
     The resting angle is built into the geometry, not into a turned node:
     the engine sizes a unit by the corners of each mesh's box, and a turned
     node would count wider than it draws (tools/model3d/dump.js). cells:
     the round noses [mouth x, y, z, tail x] in the group's frame. */
  function railGroup(THREE, M, col, piv, el, cells) {
    var pe = new THREE.Group();
    pe.name = "podelev";
    pe.position.set(piv[0], piv[1], piv[2]);
    pe.userData.el = el;
    pe.userData.cells = cells;
    col.flush(pe, M);
    return pe;
  }
  /* a point (x, z) of the rail frame laid at the resting angle */
  function atRest(x, z, rest) { return [x * Math.cos(rest) - z * Math.sin(rest), x * Math.sin(rest) + z * Math.cos(rest)]; }

  function buildSM63(THREE, C) {
    var h = G(THREE), M = materials(THREE, C), root = new THREE.Group();
    var RZ = 0.62, REST = 17 * D2R, FIRE = 35 * D2R;
    /* ---- set up: the launcher on its ground frame, V-750 on the rail ---- */
    var dep = new THREE.Group(), base = new Col(THREE), tur = new Col(THREE), bm = new Col(THREE), OX = -2.0;
    dep.name = "deploypose";
    base.push(h.T(OX, 0, 0)); sm63Frame(base, h, THREE, 0); base.pop();
    sm63Swing(tur, h, THREE);
    bm.push(h.Ry(-REST)); sm63Boom(bm, h, THREE, true); bm.pop();
    base.flush(dep, M);
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(OX, 0, RZ);
    tur.flush(tg, M);
    var mo = atRest(SM_TAIL + 10.6, SM_AX, REST), tl = atRest(SM_TAIL, SM_AX, REST);
    tg.add(railGroup(THREE, M, bm, [SM_PIV[0], 0, SM_PIV[1]], FIRE - REST, [[mo[0], 0, mo[1], tl[0]]]));
    dep.add(tg);
    dep.visible = false;
    /* ---- on the march: on its two wheel carriages behind a KrAZ-214,
       boom down on its post at the resting angle and turned to the rear
       (laid level it would put the post through the front box), no missile (the round
       travels on its PR-11 transporter-loader) ---- */
    var trv = new THREE.Group(), tb = new Col(THREE), tt = new Col(THREE);
    var LX = -4.68, LZ = 0.6, KX = 8.6;
    trv.name = "travelpose";
    tb.push(h.T(LX, 0, 0));
    sm63Frame(tb, h, THREE, LZ);
    sm63Carriage(tb, h, THREE, 1.75, LZ, 4.7);
    sm63Carriage(tb, h, THREE, -1.75, LZ, 0);
    tb.pop();
    kraz214(tb, h, THREE, M, trv, KX);
    trv.add(wheelSet(THREE, h, M, LX + 1.75, 0.52, [-1.0, 1.0], 0.36, 12, 8));
    trv.add(wheelSet(THREE, h, M, LX - 1.75, 0.52, [-1.0, 1.0], 0.36, 12, 8));
    sm63Swing(tt, h, THREE);
    tt.push(h.T(SM_PIV[0], 0, SM_PIV[1]).multiply(h.Ry(-REST)));
    sm63Boom(tt, h, THREE, false);
    tt.pop();
    tb.flush(trv, M);
    var lg = new THREE.Group();
    lg.name = "launcher";
    lg.position.set(LX, 0, LZ + RZ);
    lg.rotation.z = Math.PI;
    tt.flush(lg, M);
    trv.add(lg);
    root.add(trv);
    root.add(dep);
    fitTravel(THREE, trv, dep);
    var wt = 0;
    trv.traverse(function (o) { if (o._tris) wt += o._tris; });
    root._tris = { deploy: tri(base) + tri(tur) + tri(bm), travel: tri(tb) + tri(tt) + wt };
    return root;
  }

  /* ---------------- the S-125 5P73 ---------------- */
  /* set up: the round base plate on the ground [R][F] - radial gussets from
     the raised centre to the rim, lugs and screw jacks round the rim, the
     short pedestal the launcher turns on (top at P73_Z) */
  var P73_Z = 0.85;
  function p73Ground(c, h, THREE) {
    var i, s, x, y, g;
    c.add("paint", h.cylZ(0, 0.12, 1.8, 1.8, 36, 0, 0));
    c.add("steel", h.cylZ(0.12, 0.14, 1.78, 1.7, 36, 0, 0));
    c.add("paint", h.cylZ(0.12, 0.55, 0.78, 0.56, 24, 0, 0));
    c.add("steel", h.cylZ(0.55, 0.6, 0.6, 0.6, 24, 0, 0));
    c.add("paint", h.cylZ(0.6, P73_Z, 0.42, 0.42, 20, 0, 0));
    c.add("steel", h.cylZ(P73_Z - 0.06, P73_Z, 0.5, 0.5, 24, 0, 0));
    for (i = 0; i < 12; i++) {
      s = (i + 0.5) * TAU / 12;
      g = profY(THREE, [[0.62, 0.12], [1.62, 0.12], [1.62, 0.2], [0.62, 0.5]], -0.03, 0.03);
      g.rotateZ(s);
      c.add("paint", g);
    }
    for (i = 0; i < 16; i++) {
      s = i * TAU / 16;
      x = Math.cos(s); y = Math.sin(s);
      g = h.box(1.66, 1.86, -0.08, 0.08, 0.0, 0.2);
      g.rotateZ(s);
      c.add(i % 2 ? "paint" : "steel", g);
    }
    /* eight levelling screw jacks round the rim, wound down */
    for (i = 0; i < 8; i++) {
      s = i * TAU / 8;
      x = Math.cos(s) * 1.5; y = Math.sin(s) * 1.5;
      c.add("steel", h.cylZ(0.12, 0.42, 0.045, 0.045, 8, x, y));
      c.add("paint", h.cylZ(0.3, 0.46, 0.09, 0.09, 8, x, y));
      c.add("steel", h.cylZ(0.46, 0.5, 0.05, 0.05, 6, x, y));
    }
    p73GroundFittings(c, h, THREE);
  }

  /* the traversing part on the pedestal [R]: turntable, the box housing set
     across the firing line (doors front and rear, louvred ends), the
     bearing saddles of the elevation tube on its top, the tube's drive box
     at the right-hand end. The rails are drawn by p73Rails about P73_PIV. */
  var P73_PIV = [0.0, 1.32];
  function p73Swing(tur, h, THREE) {
    var i, j, x, y;
    tur.add("steel", h.cylZ(0, 0.1, 0.62, 0.62, 24, 0, 0));
    for (i = 0; i < 10; i++) {
      var s = i * TAU / 10;
      tur.add("steel", h.cylZ(0.1, 0.15, 0.035, 0.035, 5, Math.cos(s) * 0.56, Math.sin(s) * 0.56));
    }
    tur.add("paint", h.box(-0.72, 0.6, -1.9, 1.9, 0.1, 1.0));
    tur.add("steel", h.box(-0.74, 0.62, -1.92, 1.92, 0.98, 1.02));
    tur.add("paint", h.box(-0.6, 0.48, -1.75, 1.75, 1.02, 1.06));
    /* doors on the front and rear faces, with hinges and catches */
    for (j = -1; j <= 1; j += 2) {
      x = j > 0 ? 0.6 : -0.72;
      for (i = 0; i < 5; i++) {
        y = -1.72 + i * 0.7;
        tur.add("paint", h.box(x - 0.012, x + 0.012, y, y + 0.62, 0.22, 0.9));
        tur.add("steel", h.box(x - (j > 0 ? -0.012 : 0.022), x + (j > 0 ? 0.022 : -0.012), y + 0.04, y + 0.08, 0.3, 0.82));
        tur.add("steel", h.box(x - (j > 0 ? -0.012 : 0.022), x + (j > 0 ? 0.022 : -0.012), y + 0.5, y + 0.56, 0.55, 0.6));
      }
      /* louvred ends */
      y = j * 1.9;
      for (i = 0; i < 6; i++) tur.add("steel", h.box(-0.35, 0.25, y - 0.012, y + 0.012, 0.42 + i * 0.075, 0.45 + i * 0.075));
      tur.add("steel", h.box(-0.6, 0.48, y - 0.008, y + 0.008, 0.15, 0.2));
    }
    /* bearing saddles of the tube */
    for (i = 0; i < 3; i++) {
      y = -1.55 + i * 1.55;
      tur.add("paint", h.box(-0.24, 0.24, y - 0.12, y + 0.12, 1.02, P73_PIV[1]));
      tur.add("steel", h.cylY(y - 0.14, y + 0.14, 0.22, 14, P73_PIV[0], P73_PIV[1]));
    }
    /* the drive box at the right-hand end and its big wheel [R] */
    tur.add("paint", h.box(-0.38, 0.38, -2.5, -2.12, 0.98, 1.66));
    tur.add("steel", h.cylY(-2.62, -2.5, 0.32, 18, P73_PIV[0], P73_PIV[1]));
    tur.add("steel", h.cylY(-2.68, -2.62, 0.12, 10, P73_PIV[0], P73_PIV[1]));
    tur.add("paint", h.box(-0.3, 0.3, -2.12, -1.92, 0.98, 1.2));
    tur.add("team", h.box(-0.5, -0.1, 0.9, 1.5, 1.06, 1.075));
    p73Fittings(tur, h, THREE);
  }
  /* the rails in their own frame: origin on the tube's axis, X along the
     rails. The tube, four rail arms clamped on it, four rails with shoe
     clamps, the lateral X-braced truss under them [F], and the four V-600
     on top, tails at P73_TAIL. Rail spacing 1.1 m (not confirmed). */
  var P73_RY = [-1.65, -0.55, 0.55, 1.65], P73_AX = 0.74, P73_TAIL = -1.8;
  function p73Rails(c, h, THREE, loaded) {
    var i, j, x, y, V = THREE.Vector3;
    c.add("steel", h.cylY(-2.12, 2.0, 0.16, 16, 0, 0));
    for (i = 0; i < 4; i++) {
      y = P73_RY[i];
      /* the arm clamped on the tube, the rail on it */
      c.add("paint", profY(THREE, [[-0.32, -0.2], [0.32, -0.2], [0.55, 0.3], [-0.55, 0.3]], y - 0.09, y + 0.09));
      c.add("paint", profY(THREE, [[-1.7, 0.28], [3.2, 0.28], [3.2, 0.36], [3.05, 0.42], [-1.7, 0.42]], y - 0.07, y + 0.07));
      c.add("steel", h.box(-1.7, 3.15, y - 0.045, y + 0.045, 0.42, 0.45));
      /* the rail's open lattice cradle under it [F]: a lower chord and
         diagonals on both sides */
      c.add("paint", h.box(-1.2, 2.7, y - 0.05, y + 0.05, -0.04, 0.04));
      for (j = 0; j < 6; j++) {
        x = -1.2 + j * 0.65;
        c.add("paint", h.between(new V(x, y - 0.06, 0.0), new V(x + 0.65, y - 0.06, 0.3), 0.025, 4));
        c.add("paint", h.between(new V(x, y + 0.06, 0.3), new V(x + 0.65, y + 0.06, 0.0), 0.025, 4));
      }
      /* the diagonal strut from the tube to the rail's front */
      c.add("paint", h.between(new V(0.15, y, -0.12), new V(1.9, y, 0.3), 0.045, 8));
      var sh = [[-1.25, 0.48], [0.95, 0.55], [2.6, 0.55]];
      for (j = 0; j < 3; j++) {
        x = sh[j][0];
        c.add("steel", h.box(x - 0.12, x + 0.12, y - 0.07, y + 0.07, 0.45, sh[j][1]));
        c.add("steel", h.box(x - 0.12, x + 0.12, y - 0.11, y - 0.07, 0.42, sh[j][1] + 0.09));
        c.add("steel", h.box(x - 0.12, x + 0.12, y + 0.07, y + 0.11, 0.42, sh[j][1] + 0.09));
      }
      c.add("steel", h.box(-1.74, -1.7, y - 0.12, y + 0.12, 0.3, 0.62));
      if (loaded) {
        c.push(h.T(0, y, P73_AX));
        v600(c, h, P73_TAIL);
        c.pop();
      }
    }
    /* the lateral truss under the rails: chords, posts and X-bracing */
    var tx = 0.95, zu = 0.26, zl = -0.32;
    c.add("paint", h.box(tx - 0.07, tx + 0.07, -1.75, 1.75, zu - 0.07, zu + 0.03));
    c.add("paint", h.box(tx - 0.05, tx + 0.05, -1.75, 1.75, zl - 0.05, zl + 0.05));
    for (i = 0; i < 4; i++) c.add("paint", h.box(tx - 0.05, tx + 0.05, P73_RY[i] - 0.05, P73_RY[i] + 0.05, zl, zu));
    for (i = 0; i < 3; i++) {
      c.add("paint", h.between(new V(tx, P73_RY[i], zl), new V(tx, P73_RY[i + 1], zu - 0.04), 0.03, 6));
      c.add("paint", h.between(new V(tx, P73_RY[i], zu - 0.04), new V(tx, P73_RY[i + 1], zl), 0.03, 6));
    }
    c.add("paint", h.between(new V(0.1, -1.6, -0.12), new V(tx, -1.6, zl), 0.035, 6));
    c.add("paint", h.between(new V(0.1, 1.6, -0.12), new V(tx, 1.6, zl), 0.035, 6));
  }

  /* on the march: the two-axle wheeled carriage (jacks up, drawbar) */
  function p73Carriage(c, h, THREE) {
    var i, j, k, x, y, AX = [-1.15, 0.35], WY = 1.14, V = THREE.Vector3;
    for (j = -1; j <= 1; j += 2) {
      c.add("paint", h.box(-2.5, 2.2, j * 0.62 - 0.1, j * 0.62 + 0.1, 0.74, 0.96));
      c.add("steel", h.box(-2.5, 2.2, j * 0.62 - 0.08, j * 0.62 + 0.08, 0.72, 0.74));
    }
    for (i = 0; i < 8; i++) {
      x = -2.3 + i * 0.64;
      c.add("paint", h.box(x, x + 0.1, -0.7, 0.7, 0.76, 0.92));
    }
    c.add("paint", h.box(-2.5, 2.0, -1.05, 1.05, 0.94, 1.00));
    for (i = 0; i < 11; i++) {
      c.add("steel", h.cylZ(1.0, 1.03, 0.025, 0.025, 5, -2.3 + i * 0.4, 1.0));
      c.add("steel", h.cylZ(1.0, 1.03, 0.025, 0.025, 5, -2.3 + i * 0.4, -1.0));
    }
    for (j = -1; j <= 1; j += 2) c.add("paint", h.between(new V(2.0, j * 0.55, 0.86), new V(3.7, j * 0.08, 0.80), 0.07, 10));
    c.add("steel", h.cylZ(0.72, 0.9, 0.13, 0.13, 14, 3.75, 0));
    c.add("steel", h.box(3.3, 3.55, -0.18, 0.18, 0.76, 0.86));
    for (k = 0; k < 2; k++) {
      for (j = -1; j <= 1; j += 2) {
        x = AX[k];
        c.add("paint", h.box(x - 0.62, x + 0.62, j * WY - 0.2, j * WY + 0.2, 1.09, 1.15));
        c.add("paint", h.box(x - 0.62, x + 0.62, j * WY + j * 0.2 - 0.025, j * WY + j * 0.2 + 0.025, 0.82, 1.22));
      }
      c.add("steel", h.cylY(-WY, WY, 0.05, 10, AX[k], 0.55));
    }
    /* the four jacks, wound up for the march */
    var jk = [[1.75, 1.15], [1.75, -1.15], [-2.25, 1.15], [-2.25, -1.15]];
    for (i = 0; i < 4; i++) {
      x = jk[i][0]; y = jk[i][1];
      c.add("paint", h.box(x - 0.16, x + 0.16, y - 0.12, y + 0.12, 0.84, 1.0));
      c.add("paint", h.cylZ(0.5, 0.86, 0.075, 0.075, 10, x, y));
      c.add("steel", h.cylZ(0.42, 0.5, 0.24, 0.26, 10, x, y));
    }
    c.add("steel", h.cylZ(1.0, 1.1, 1.0, 1.0, 28, 0, 0));
    c.add("paint", h.box(1.1, 1.7, -0.9, -0.4, 1.0, 1.28));
    c.add("paint", h.box(1.1, 1.7, 0.4, 0.9, 1.0, 1.28));
  }

  function buildP73(THREE, C) {
    var h = G(THREE), M = materials(THREE, C), root = new THREE.Group();
    var REST = 25 * D2R, FIRE = 50 * D2R, i, cells = [];
    /* ---- set up ---- */
    var dep = new THREE.Group(), base = new Col(THREE), tur = new Col(THREE), rl = new Col(THREE);
    dep.name = "deploypose";
    p73Ground(base, h, THREE);
    p73Swing(tur, h, THREE);
    rl.push(h.Ry(-REST)); p73Rails(rl, h, THREE, true); rl.pop();
    base.flush(dep, M);
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(0, 0, P73_Z);
    tur.flush(tg, M);
    var mo = atRest(P73_TAIL + 5.9, P73_AX, REST), tl = atRest(P73_TAIL, P73_AX, REST);
    for (i = 0; i < 4; i++) cells.push([mo[0], P73_RY[i], mo[1], tl[0]]);
    tg.add(railGroup(THREE, M, rl, [P73_PIV[0], 0, P73_PIV[1]], FIRE - REST, cells));
    dep.add(tg);
    dep.visible = false;
    /* ---- on the march: on the carriage behind an AT-S, rails level and
       turned to the rear, unloaded (the rounds ride the PR-14 loaders) ---- */
    var trv = new THREE.Group(), tb = new Col(THREE), tt = new Col(THREE);
    var LX = -3.64, AX = [-1.15, 0.35];
    trv.name = "travelpose";
    tb.push(h.T(LX, 0, 0));
    p73Carriage(tb, h, THREE);
    tb.pop();
    ats(tb, h, THREE, M, trv, 6.15);
    trv.add(wheelSet(THREE, h, M, LX + AX[0], 0.54, [-1.14, 1.14], 0.3, 12, 8));
    trv.add(wheelSet(THREE, h, M, LX + AX[1], 0.54, [-1.14, 1.14], 0.3, 12, 8));
    p73Swing(tt, h, THREE);
    tt.push(h.T(P73_PIV[0], 0, P73_PIV[1]));
    p73Rails(tt, h, THREE, false);
    tt.pop();
    tb.flush(trv, M);
    var lg = new THREE.Group();
    lg.name = "launcher";
    lg.position.set(LX, 0, 1.1);
    lg.rotation.z = Math.PI;
    tt.flush(lg, M);
    trv.add(lg);
    root.add(trv);
    root.add(dep);
    fitTravel(THREE, trv, dep);
    var wt = 0;
    trv.traverse(function (o) { if (o._tris) wt += o._tris; });
    root._tris = { deploy: tri(base) + tri(tur) + tri(rl), travel: tri(tb) + tri(tt) + wt };
    return root;
  }

  return { sm63: buildSM63, p73: buildP73 };
})();

UNIT_MODELS["pact_e50_s75"] = {
  len: 10.39,
  build: function (THREE, M, C) { return HeroS75S125.sm63(THREE, C); }
};
UNIT_MODELS["pact_e60_s125"] = {
  len: 5.51,
  build: function (THREE, M, C) { return HeroS75S125.p73(THREE, C); }
};
