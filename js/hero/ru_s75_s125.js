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
     "travelpose"  the launcher on the march behind its tractor, unloaded,
                   rail(s) run down level and turned to the rear; its
                   traversing part is a group "launcher", NOT "turret", so
                   the renderer never trains it. The wheels (tractor and
                   carriage) are "roadwheel" groups. Shown in the template:
                   a unit is built and moves packed up.
   SCALE: the travel convoy is drawn at k of its true scale (k = deployed
   length / convoy length: 0.600 for the S-75's KrAZ-214 and SM-63, 0.456
   for the S-125's AT-S and 5P73), centred on the deployed launcher, so
   that both poses fill the unit's footprint and the deployed launcher -
   the unit's identity - is drawn full size. len is the deployed pose's
   length. A choice made for the look; the owner may reverse it (drop
   fitTravel and len goes back to the convoy's, 17.24 m and 12.31 m).

   References:
     Commons "ZRK S-75 2007 G1" and "DVINA SA-75 SAM-2 launcher system downed
       4 x F4S" (SM-63 with V-750): the cruciform ground frame with four
       jack pads, the turntable, the louvred housing, the A-frame and
       trunnion, the rail beam with shoe clamps, the missile and its paint.
     Commons "Forward view of"/"Rear view of S-125 launcher 5P73 in Perm":
       four rails in a row on one lateral frame with cross-bracing, four
       V-600; the launcher STANDS ON A ROUND BASE ON THE GROUND (an eight-
       sided plate, the skirted pedestal, levelling jacks round the rim) -
       no wheels in the firing position.
     Commons "S-125 launcher 5P73 desc table in Perm": 10,957 kg, 4 rails,
       towing speed 60 km/h, loaded by the PR-14M transporter-loader.
     pvo.guns.ru S-75 history: the launchers were moved "set on detachable
       wheel carriages" (otdelyaemye kolesnye khoda) and towed by KrAZ-214
       trucks, 40 km/h on roads, 10 km/h off them (AT-S-59 tracked tractors
       in northern and desert battalions); the missiles travel on PR-11
       transporter-loaders (ZiL-151/157 semitrailer), so the launcher
       marches empty; travel to fire 2 h 20 min.
     pvo.guns.ru S-125 history: launcher towing "in desert conditions" by
       AT-S tractors added to the battalions (the only tractor named for the
       5P73); carrying four missiles on the 5P73 on the march "showed the
       need for serious modification and weight" - it marches empty, the
       rounds ride the PR-14 loaders (ZiL-157, later ZiL-131).
     Ru-wiki KrAZ-214 infobox and the Togliatti museum truck on Commons
       ("KrAZ-214 in Technical museum Togliatti"); Ru-wiki AT-S infobox and
       Commons "Artillery tractor AT-S" - see the tractor functions.
   NOT CONFIRMED and therefore chosen plainly: the resting elevations
   (22 deg SM-63, 25 deg 5P73), the form of the SM-63's wheel carriages
   (one twin-tyre axle under each end of the long beam, a drawbar on the
   front one), whether its side outriggers fold for the road (left as they
   stand), the 5P73's march carriage (drawn as a two-axle carriage with its
   jacks wound up, under the ring), that both rails travel level and turned
   to the rear, the AT-S for the S-125 outside the desert (the only tractor
   the sources name for it), the paint (1950s-60s Soviet olive green), the
   lateral spacing of the 5P73 rails, and the red missile bands the museum
   S-125 wears (left off). No radar, cables or markings are drawn.
   ======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroS75S125 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---------- merging: every part goes into a bin per material ---------- */
  function Col(THREE) {
    this.T = THREE; this.bins = {}; this.st = [new THREE.Matrix4()];
  }
  Col.prototype.push = function (m) {
    this.st.push(this.st[this.st.length - 1].clone().multiply(m));
  };
  Col.prototype.pop = function () { this.st.pop(); };
  Col.prototype.add = function (key, g) {
    var b = this.bins[key] || (this.bins[key] = { P: [], N: [] });
    g.applyMatrix4(this.st[this.st.length - 1]);
    if (g.index) g = g.toNonIndexed();
    var p = g.attributes.position.array, n = g.attributes.normal.array, i;
    for (i = 0; i < p.length; i++) { b.P.push(p[i]); b.N.push(n[i]); }
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
      group.add(new T.Mesh(geo, mats[k]));
    }
  };

  function tri(Col_) { var n = 0, k; for (k in Col_.bins) n += Col_.bins[k].P.length / 9; return n; }

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

  /* ---------- the missiles (axis along X, tail at x0, drawn at origin) ---- */
  /* V-750 of the S-75 */
  function v750(c, h, x0) {
    var i, a, seg = 36;
    c.push(h.T(x0, 0, 0));
    /* booster: nozzle, cylinder, cone to the sustainer */
    c.add("steel", h.lathe([[0, 0.20], [0.10, 0.27], [0.32, 0.24], [0.34, 0.22]], seg));
    c.add("steel", h.lathe([[0.30, 0.24], [0.55, 0.34], [0.60, 0.34]], seg));
    c.add("mWhite", h.lathe([[0.60, 0.33], [1.6, 0.33], [3.0, 0.33], [3.14, 0.332], [3.20, 0.33]], seg));
    c.add("mWhite", h.lathe([[3.20, 0.33], [3.45, 0.30], [3.65, 0.25]], seg));
    /* booster band rings */
    for (i = 0; i < 4; i++) c.add("steel", h.lathe([[0.9 + i * 0.62, 0.337], [0.93 + i * 0.62, 0.337]], seg));
    /* sustainer: grey, then white, then the dark ogive */
    c.add("mBody", h.lathe([[3.55, 0.25], [4.6, 0.25], [6.2, 0.25], [6.4, 0.252], [7.9, 0.252]], seg));
    c.add("mWhite", h.lathe([[7.9, 0.252], [8.0, 0.254], [9.0, 0.254], [9.55, 0.254]], seg));
    c.add("mDark", h.lathe([[9.55, 0.254], [9.80, 0.235], [10.2, 0.16], [10.55, 0.07], [10.80, 0.012]], seg));
    /* panel seams and the radome joint ring */
    for (i = 0; i < 6; i++) c.add("steel", h.lathe([[4.0 + i * 0.75, 0.254], [4.02 + i * 0.75, 0.254]], seg));
    c.add("steel", h.lathe([[9.5, 0.256], [9.56, 0.256]], seg));
    /* booster fins (four, swept back, rolled 45 degrees) */
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("mBody", h.fin([[0.0, 0.30], [1.9, 0.30], [0.9, 1.20], [0.0, 1.20]], 0.045, a));
    }
    /* mid-body wings (large delta) */
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("mBody", h.fin([[5.0, 0.24], [7.0, 0.24], [6.5, 1.05], [5.7, 1.05]], 0.04, a));
    }
    /* sustainer-rear control fins (small, in the plus position) */
    for (i = 0; i < 4; i++) {
      a = i * Math.PI / 2;
      c.add("mWhite", h.fin([[3.55, 0.24], [4.35, 0.24], [4.1, 0.62], [3.8, 0.62]], 0.035, a));
    }
    /* small nose fins */
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("mDark", h.fin([[9.65, 0.22], [10.05, 0.17], [9.95, 0.46], [9.8, 0.46]], 0.03, a));
    }
    c.pop();
  }

  /* V-600 of the S-125 */
  function v600(c, h, x0) {
    var i, a, seg = 12;
    c.push(h.T(x0, 0, 0));
    c.add("steel", h.lathe([[0, 0.13], [0.07, 0.18], [0.20, 0.17]], seg));
    c.add("mWhite", h.lathe([[0.20, 0.26], [0.40, 0.26], [1.6, 0.26], [1.74, 0.262], [1.80, 0.26]], seg));
    c.add("mWhite", h.lathe([[1.80, 0.26], [1.95, 0.22], [2.10, 0.19]], seg));
    c.add("mBody", h.lathe([[2.0, 0.19], [3.0, 0.19], [4.2, 0.19], [4.3, 0.192], [5.2, 0.192]], seg));
    c.add("mDark", h.lathe([[5.2, 0.192], [5.4, 0.18], [5.65, 0.11], [5.85, 0.04], [5.9, 0.008]], seg));
    for (i = 0; i < 3; i++) c.add("steel", h.lathe([[2.5 + i * 0.9, 0.194], [2.52 + i * 0.9, 0.194]], seg));
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("mBody", h.fin([[0.0, 0.24], [1.3, 0.24], [0.6, 0.86], [0.0, 0.86]], 0.035, a));
    }
    for (i = 0; i < 4; i++) {
      a = Math.PI / 4 + i * Math.PI / 2;
      c.add("mBody", h.fin([[3.5, 0.18], [4.5, 0.18], [4.2, 0.68], [3.8, 0.68]], 0.03, a));
    }
    for (i = 0; i < 4; i++) {
      a = i * Math.PI / 2;
      c.add("mDark", h.fin([[5.05, 0.19], [5.4, 0.17], [5.3, 0.36], [5.2, 0.36]], 0.025, a));
    }
    c.pop();
  }

  function materials(THREE, C) {
    function std(col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); }
    return {
      paint: std(0x4d5636, 0.88, 0.05),
      steel: std(0x30353a, 0.66, 0.36),
      rubber: std(0x1b1c1d, 0.92, 0.02),
      mBody: std(0xa4a69b, 0.78, 0.12),
      mWhite: std(0xd6d4c8, 0.8, 0.08),
      mDark: std(0x2a2d30, 0.62, 0.28),
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
  /* the traversing part about the ring centre: turntable, platform, housing,
     A-frames, cradle and rail at ELEV; the V-750 on it when loaded */
  function sm63Swing(tur, h, THREE, ELEV, loaded) {
    var i, j, s, x, y, HZ = 1.95;
    tur.add("steel", h.cylZ(0, 0.14, 1.25, 1.25, 28, 0, 0));
    tur.add("paint", h.cylZ(0.14, 0.22, 1.12, 1.12, 28, 0, 0));
    for (i = 0; i < 12; i++) {
      s = i * TAU / 12;
      tur.add("steel", h.cylZ(0.14, 0.2, 0.045, 0.045, 6, Math.cos(s) * 1.18, Math.sin(s) * 1.18));
    }
    tur.add("paint", h.box(-1.9, 1.0, -1.0, 1.0, 0.22, 0.42));
    tur.add("steel", h.box(-1.9, 1.0, -1.02, 1.02, 0.40, 0.44));
    tur.add("paint", h.box(-1.85, -0.35, -0.85, 0.85, 0.44, 0.74));
    tur.add("paint", h.box(-1.7, -0.5, -0.78, 0.78, 0.74, 0.80));
    for (i = 0; i < 12; i++) {
      x = -1.66 + i * 0.1;
      tur.add("steel", h.box(x, x + 0.06, -0.72, 0.72, 0.80, 0.84));
    }
    for (i = 0; i < 5; i++) {
      tur.add("steel", h.box(-1.5 + i * 0.28, -1.43 + i * 0.28, 0.85, 0.89, 0.50, 0.70));
      tur.add("steel", h.box(-1.5 + i * 0.28, -1.43 + i * 0.28, -0.89, -0.85, 0.50, 0.70));
    }
    tur.add("steel", h.cylY(0.85, 0.95, 0.05, 8, -1.3, 0.6));
    tur.add("steel", h.cylY(-0.95, -0.85, 0.05, 8, -1.3, 0.6));
    tur.add("team", h.box(-1.5, -0.7, -0.4, 0.4, 0.84, 0.855));
    for (j = -1; j <= 1; j += 2) {
      y = j * 0.72;
      tur.add("paint", h.between(new THREE.Vector3(-0.85, y, 0.42), new THREE.Vector3(0, y, HZ), 0.10, 10));
      tur.add("paint", h.between(new THREE.Vector3(0.85, y, 0.42), new THREE.Vector3(0, y, HZ), 0.10, 10));
      tur.add("steel", h.between(new THREE.Vector3(-0.6, y, 0.9), new THREE.Vector3(0.6, y, 0.9), 0.04, 6));
      tur.add("paint", h.box(-0.28, 0.28, y - 0.09, y + 0.09, HZ - 0.28, HZ + 0.26));
      tur.add("steel", h.box(-0.3, 0.3, y - 0.11, y + 0.11, HZ - 0.06, HZ + 0.06));
      tur.add("paint", h.box(-1.05, -0.65, y - 0.1, y + 0.1, 0.42, 0.52));
      tur.add("paint", h.box(0.65, 1.05, y - 0.1, y + 0.1, 0.42, 0.52));
    }
    tur.add("steel", h.cylY(-0.98, 0.98, 0.09, 14, 0, HZ));
    tur.add("steel", h.cylY(0.74, 0.92, 0.13, 14, 0, HZ));
    tur.add("steel", h.cylY(-0.92, -0.74, 0.13, 14, 0, HZ));
    var Mc = h.T(0, 0, HZ).multiply(h.Ry(-ELEV));
    tur.push(Mc);
    tur.add("paint", h.box(-3.5, 3.9, -0.17, 0.17, -0.17, 0.17));
    tur.add("steel", h.box(-3.5, 3.9, -0.12, 0.12, 0.17, 0.21));
    tur.add("paint", h.box(-0.35, 0.35, -0.7, 0.7, -0.22, 0.12));
    for (i = 0; i < 14; i++) {
      x = -3.2 + i * 0.5;
      tur.add("steel", h.box(x, x + 0.05, -0.22, 0.22, -0.2, 0.0));
    }
    var shoe = [-3.1, -1.7, 1.7, 3.3];
    for (i = 0; i < 4; i++) {
      x = shoe[i];
      tur.add("steel", h.box(x - 0.25, x + 0.25, -0.2, 0.2, 0.21, i < 2 ? 0.25 : 0.33));
      tur.add("steel", h.box(x - 0.25, x + 0.25, -0.3, -0.25, 0.21, 0.55));
      tur.add("steel", h.box(x - 0.25, x + 0.25, 0.25, 0.3, 0.21, 0.55));
      tur.add("steel", h.cylY(-0.3, 0.3, 0.025, 6, x, 0.56));
    }
    tur.add("steel", h.cylX(-3.5, 3.9, 0.025, 0.025, 6, 0.2, 0.0));
    tur.add("steel", h.box(-3.55, -3.5, -0.3, 0.3, -0.1, 0.55));
    if (loaded) {
      tur.push(h.T(0, 0, 0.55));
      v750(tur, h, -3.8);
      tur.pop();
    }
    tur.pop();
    for (j = -1; j <= 1; j += 2) {
      var pa = new THREE.Vector3(-1.5, j * 0.45, 0.74);
      var pb = new THREE.Vector3(-1.9, j * 0.45, -0.2).applyMatrix4(Mc);
      var pm = pa.clone().lerp(pb, 0.5);
      tur.add("steel", h.between(pa, pm, 0.07, 12));
      tur.add("paint", h.between(pm, pb, 0.05, 12));
      tur.add("steel", h.between(pa.clone().add(new THREE.Vector3(0, -0.06, 0)), pa.clone().add(new THREE.Vector3(0, 0.06, 0)), 0.07, 8));
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

  function buildSM63(THREE, C) {
    var h = G(THREE), M = materials(THREE, C), root = new THREE.Group();
    var RZ = 0.62, i;
    /* ---- set up: the launcher on its ground frame, V-750 on the rail ---- */
    var dep = new THREE.Group(), base = new Col(THREE), tur = new Col(THREE), OX = -1.2;
    dep.name = "deploypose";
    base.push(h.T(OX, 0, 0)); sm63Frame(base, h, THREE, 0); base.pop();
    sm63Swing(tur, h, THREE, 22 * Math.PI / 180, true);
    base.flush(dep, M);
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(OX, 0, RZ);
    tur.flush(tg, M);
    dep.add(tg);
    dep.visible = false;
    /* ---- on the march: on its two wheel carriages behind a KrAZ-214,
       rail run down level and turned to the rear, no missile (the round
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
    sm63Swing(tt, h, THREE, 0, false);
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
    root._tris = { deploy: tri(base) + tri(tur), travel: tri(tb) + tri(tt) + wt };
    return root;
  }

  /* ---------------- the S-125 5P73 ---------------- */
  /* the traversing launcher about the ring centre, beams at ELEV, four
     V-600 on them when loaded */
  function p73Swing(tur, h, THREE, ELEV, loaded) {
    var i, j, s, x, y, HZ = 1.55, V = THREE.Vector3;
    tur.add("steel", h.cylZ(0, 0.12, 1.0, 1.0, 28, 0, 0));
    tur.add("paint", h.cylZ(0.12, 0.22, 0.88, 0.88, 28, 0, 0));
    for (i = 0; i < 10; i++) {
      s = i * TAU / 10;
      tur.add("steel", h.cylZ(0.12, 0.18, 0.04, 0.04, 5, Math.cos(s) * 0.94, Math.sin(s) * 0.94));
    }
    tur.add("paint", h.box(-0.55, 0.55, -0.5, 0.5, 0.22, 0.62));
    tur.add("paint", h.box(-0.4, 0.4, -0.5, 0.5, 0.62, 0.70));
    for (i = 0; i < 6; i++) tur.add("steel", h.box(-0.5 + i * 0.18, -0.46 + i * 0.18, -0.52, -0.5, 0.3, 0.58));
    for (j = -1; j <= 1; j += 2) {
      y = j * 0.46;
      tur.add("paint", h.between(new V(-0.45, y, 0.65), new V(0, y, HZ), 0.075, 10));
      tur.add("paint", h.between(new V(0.45, y, 0.65), new V(0, y, HZ), 0.075, 10));
      tur.add("paint", h.box(-0.2, 0.2, y - 0.07, y + 0.07, HZ - 0.2, HZ + 0.2));
    }
    tur.add("steel", h.cylY(-0.62, 0.62, 0.075, 12, 0, HZ));
    var Mc = h.T(0, 0, HZ).multiply(h.Ry(-ELEV));
    tur.push(Mc);
    tur.add("paint", h.box(-0.2, 0.2, -2.15, 2.15, -0.14, 0.14));
    tur.add("steel", h.box(-0.18, 0.18, -2.15, 2.15, 0.14, 0.17));
    var RY = [-1.35, -0.45, 0.45, 1.35];
    for (i = 0; i < 4; i++) {
      y = RY[i];
      tur.add("paint", h.box(-2.1, 1.6, y - 0.075, y + 0.075, -0.1, 0.1));
      tur.add("steel", h.box(-2.1, 1.6, y - 0.05, y + 0.05, 0.1, 0.13));
      var sh = [-1.5, -0.2, 0.9];
      for (j = 0; j < 3; j++) {
        x = sh[j];
        tur.add("steel", h.box(x - 0.14, x + 0.14, y - 0.1, y + 0.1, 0.13, 0.19));
        tur.add("steel", h.box(x - 0.14, x + 0.14, y - 0.16, y - 0.1, 0.13, 0.36));
        tur.add("steel", h.box(x - 0.14, x + 0.14, y + 0.1, y + 0.16, 0.13, 0.36));
      }
      tur.add("steel", h.box(-2.15, -2.1, y - 0.12, y + 0.12, -0.05, 0.3));
      if (loaded) {
        tur.push(h.T(0, y, 0.34));
        v600(tur, h, -2.05);
        tur.pop();
      }
    }
    for (i = 0; i < 3; i++) {
      for (x = -1.4; x <= 0.9; x += 0.7) {
        tur.add("paint", h.between(new V(x, RY[i], 0.0), new V(x + 0.7, RY[i + 1], 0.0), 0.028, 6));
        tur.add("paint", h.between(new V(x + 0.7, RY[i], 0.0), new V(x, RY[i + 1], 0.0), 0.028, 6));
      }
    }
    for (x = -1.4; x <= 1.0; x += 0.7) tur.add("paint", h.cylY(-1.45, 1.45, 0.03, 6, x, -0.05));
    tur.pop();
    for (j = -1; j <= 1; j += 2) {
      var pa = new V(-0.4, j * 0.46, 0.5);
      var pb = new V(-1.3, j * 0.46, -0.1).applyMatrix4(Mc);
      var pm = pa.clone().lerp(pb, 0.5);
      tur.add("steel", h.between(pa, pm, 0.06, 12));
      tur.add("paint", h.between(pm, pb, 0.045, 12));
    }
    tur.add("team", h.box(-0.35, 0.35, -0.38, 0.38, 0.70, 0.715));
  }

  /* set up: the round base on the ground, as the Perm launcher stands -
     an eight-sided plate, the skirted pedestal, the roller path, levelling
     jacks round the rim */
  function p73Ground(c, h, THREE) {
    var i, s, x, y;
    c.add("paint", h.cylZ(0, 0.2, 1.85, 1.85, 8, 0, 0).rotateZ(Math.PI / 8));
    c.add("steel", h.cylZ(0.2, 0.24, 1.7, 1.7, 8, 0, 0).rotateZ(Math.PI / 8));
    c.add("paint", h.cylZ(0.24, 0.62, 1.35, 1.05, 24, 0, 0));
    c.add("steel", h.cylZ(0.62, 0.72, 1.0, 1.0, 28, 0, 0));
    for (i = 0; i < 12; i++) {
      s = i * TAU / 12;
      c.add("steel", h.cylZ(0.72, 0.76, 0.04, 0.04, 5, Math.cos(s) * 0.92, Math.sin(s) * 0.92));
    }
    for (i = 0; i < 8; i++) {
      s = (i + 0.5) * TAU / 8;
      x = Math.cos(s) * 1.62; y = Math.sin(s) * 1.62;
      c.add("steel", h.cylZ(0, 0.06, 0.2, 0.22, 10, x * 1.08, y * 1.08));
      c.add("steel", h.cylZ(0.06, 0.36, 0.05, 0.05, 8, x * 1.08, y * 1.08));
      c.add("paint", h.cylZ(0.2, 0.42, 0.09, 0.09, 8, x * 1.08, y * 1.08));
      /* a stiffening rib from the pedestal skirt to each jack */
      c.add("paint", h.between(new THREE.Vector3(x * 0.72, y * 0.72, 0.5), new THREE.Vector3(x, y, 0.22), 0.05, 6));
    }
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
    var ELEV = 25 * Math.PI / 180;
    /* ---- set up ---- */
    var dep = new THREE.Group(), base = new Col(THREE), tur = new Col(THREE);
    dep.name = "deploypose";
    p73Ground(base, h, THREE);
    p73Swing(tur, h, THREE, ELEV, true);
    base.flush(dep, M);
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(0, 0, 0.76);
    tur.flush(tg, M);
    dep.add(tg);
    dep.visible = false;
    /* ---- on the march: on the carriage behind an AT-S, beams level and
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
    p73Swing(tt, h, THREE, 0, false);
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
    root._tris = { deploy: tri(base) + tri(tur), travel: tri(tb) + tri(tt) + wt };
    return root;
  }

  return { sm63: buildSM63, p73: buildP73 };
})();

UNIT_MODELS["pact_e50_s75"] = {
  len: 10.34,
  build: function (THREE, M, C) { return HeroS75S125.sm63(THREE, C); }
};
UNIT_MODELS["pact_e60_s125"] = {
  len: 5.61,
  build: function (THREE, M, C) { return HeroS75S125.p73(THREE, C); }
};
