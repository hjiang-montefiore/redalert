/* ======= fr_helos.js - HERO models: the French Army's transport helicopters =======
   Four defs, three airframes, one builder per type:
     fra_e60_transport  "Aerospatiale SA 330B Puma"  (1970)   -> HeroPuma.e60
     fra_e80_transport  "Aerospatiale SA 330Ba Puma" (1970)   -> HeroPuma.e80
     fra_e90_transport  "Eurocopter AS 532UL Cougar" (1990)   -> HeroCougar.e90
     fra_e00_transport  "NHIndustries NH90 TTH Caiman" (2011) -> HeroNH90.e00
   Until this file the four rows had no model of their own: render3d.js
   modelKeyFor fell back to the first transport peer with one, trans_n, and
   drew a UH-60M Black Hawk (19.77 x 16.36 x 5.14 m, four-blade rotor, canted
   tail rotor to starboard, fixed tailwheel gear) for all of them. There was
   no Puma, Super Puma, Cougar or NH90 model anywhere in js/hero/ to build on
   (grep -i "puma|cougar|nh90|caiman": only the Puma director of
   ru_steregushchiy.js and the F9F Cougar jet), so all three are new, written
   in the conventions of pla_z8.js (the Super Frelon, the other Sud
   transport: kit, station tables, rotor mounts) and fr_gazelle.js (the
   ALAT's paint schemes and the Centre-Europe band painter).

   REFERENCES (Commons, through commons.wikimedia.org/w/thumb.php; cached in
   scratchpad/q_frhelo_ref)
     D1 "Aerospatiale SA 330 Puma Drawing.svg" (1600 px render): plan from
        above, front, side from the PORT side. Scale 60.0 px/m on the side
        view, the scale that makes nose tip (px 661) to the back of the tail
        rotor gearbox fairing (px 1505) the published 14.06 m fuselage.
        Every Puma station below was read off it on a pixel grid
        (frh_tools/ink.py, a scan of the line work per 20 px). The plan is
        drawn at 59 px/m (nose to gearbox 830 px); widths come from it at
        its own scale. Its front view is at about 56.5 px/m and is used for
        the track and the shapes only. Its blades are drawn short (13.9 m),
        so the disc is the published one.
     P1 "Aerospatiale SA-330 B Puma France - Army, LFQP Phalsbourg-Bourscheid,
        France PP1253263672.jpg" - an ALAT SA 330B on the ground, from the
        starboard side nearly square on: the Centre-Europe green / brown /
        black, the five-blade tail rotor on the STARBOARD side, twin main
        wheels on a short leg under the sponson, the sliding door with two
        windows and a window either side of it, the cockpit door, the two
        round intake fairings at the front of the cowl, and the round
        exhaust outlet on the cowl side (red blanking cap on) with the
        engines' soot streaking aft from it.
     P2 "SA330B Puma - RIAT 2013 (9501449125).jpg" - head-on in the hover:
        the two round intakes side by side over the windscreen, twin nose
        wheels, the sponsons with twin main wheels on legs, the stabiliser
        on the PORT side high on the fin, Centre-Europe paint.
     P3 "French Aerospatiale SA 330 Puma helicopters in Beirut 1983.jpg" -
        two ALAT Pumas in flight in 1983, in one even dark tone with no
        disruptive pattern: vert armee before the three tones.
     D2 "Eurocopter AS332 Super Puma Line Drawing.svg" (1600 px render):
        the STRETCHED Super Puma (two windows ahead of the sliding door and
        two behind it, against the Puma's one and one), side from port,
        with the radome nose, the ventral fin and the tail skid. Scale
        56.1 px/m, the scale that makes nose tip (px 654) to the back of the
        gearbox fairing (px 1525) the published 15.53 m. Checked against D1:
        the sliding door is 1.39 m wide on D2 and 1.33 on D1; door to tail
        9.64 m against the Puma's 9.12, nose to door 4.49 against 3.62:
        +0.52 and +0.87 m, which add up to the published difference between
        the two fuselages (15.53 - 14.06 = 1.47 m). Plan at 53.3 px/m.
     C1 "Eurocopter AS-532UL Cougar, France - Army AN0633007.jpg" - an ALAT
        AS 532UL in flight from the port side: three-tone paint, black
        radome, two windows ahead of the door and two behind (as D2), the
        ventral fin, the sponson with its upper fairing running up into the
        cabin side and the single main wheel half out under it (gear up),
        the round exhaust outlet on the cowl side.
     C2 "Eurocopter AS-532UL Cougar, France - Army AN0323259.jpg" - an ALAT
        Cougar on the ground, front right: the two big round intake
        fairings at the front of the cowl, the black radome, the starboard
        sliding door, the tail rotor to starboard.
     D3 "NHIndustries NH90 orthographical image.svg" (1800 px render): plan
        from above, front, side from port. Scale 57.5 px/m, the scale that
        makes nose tip (px 808) to the fin's top trailing corner (px 1735)
        the published 16.13 m. It puts the tail rotor's top tip 5.32 m up
        (published height 5.23 m) and the rotor head's dome 4.17 m. Plan
        at 57 px/m, front at 60.4 px/m.
     N1 "NHIndustries NH90 TTH French Army Air Corps EAD PAS 2013 03.jpg" -
        a French Army Caiman at the 2013 Paris show from starboard, a
        stitched panorama: the three-tone camouflage (green, brown, dark
        grey), the black radome, the cabin window ahead of the open
        sliding door and one behind it, the sponson with the single main
        wheel, the underside sweeping up to the tail (the ramp), the tall
        swept fin and the four-blade tail rotor on its far (PORT) side, the
        engine intake grille on the cowl side.
     N2 "NHIndustries NH90 TTH French Army Air Corps EAD PAS 2013 02.jpg" -
        the same machine's nose: the black radome, the big flat windscreen
        and cockpit door window, twin nose wheels under the chin.
     Published (en.wikipedia, fetched): SA 330 Puma (Jane's 1976-77): length
        18.15 m rotors turning, rotor 15.00 m, height 5.14 m, two Turmo IVC,
        "retractable tricycle landing gear", sixteen troops; the fuselage
        length 14.06 m is the brief's. AS 532 Cougar (Brassey's 1999):
        length 15.53 m, height 4.92 m, rotor 15.6 m, two Makila 1A1; the
        AS 532UL "the long version". NH90 (AgustaWestland, Airbus): length
        16.13 m, four composite main blades, "large sliding doors on either
        side ... or via a rear ramp"; rotor 16.30 m and height 5.23 m are
        the brief's.

   SETTLED FROM PHOTOGRAPHS (where a drawing and a figure disagree; ratios
   taken at one station, so perspective cancels)
     - Puma wheelbase. D1 gives 4.50 m (wheel centres px 746 and 1016). A
       wheelbase of about 4.05 m is sometimes quoted but no fetched source
       gives one. In P1, nearly square on, wheelbase over cabin depth at the
       sliding door is 320 / 143 px = 2.24; D1 gives 270 / 130 = 2.08; a
       4.05 m wheelbase would need 1.87. The drawing's is kept.
     - Puma tail rotor. D1 draws it 2.60 m across. In P1 its radius over the
       tail boom's depth is 89 / 70 px = 1.27 (the boom measured a little
       nearer the camera, so the true ratio is a little more); D1 gives
       78 / 61 = 1.28. Kept at 2.60 m.
     - Puma wheels. D1 draws them 0.45 m across. In P1 the main wheel's
       height over the sponson's depth at the same station is 32 / 40 px =
       0.80; D1 gives 0.68. The wheels are drawn 0.54 m across (0.80 x
       D1's 0.67 m sponson) and the airframe stands 0.09 m higher on them
       than D1 draws it, which puts the tail rotor's top at 5.11 m against
       the published 5.14.
     - NH90 wheels. N1 gives a main wheel 0.87 of the sponson's depth
       (47 / 54 px), D3 0.63. N1 is a stitched panorama and the larger
       wheel would raise the airframe 0.2 m past the published height,
       which D3 already meets, so D3's wheels are kept (NOT CONFIRMED).

   RECOGNITION LIST (and where each shows)
     Puma   1 boxy cabin with a rounded glazed nose, the windscreen and the
              chin windows                                       (D1, P1, P2)
            2 the engine cowl on the roof: two round intake fairings at its
              front, the round exhaust outlet each side ahead of the mast,
              the mast fairing                                   (D1, P1, P2)
            3 four-blade rotor under a domed head                (D1, P1, P2)
            4 sponsons each side of the cabin's rear half, twin main wheels
              under them; twin nose wheels                       (D1, P1, P2)
            5 long boom, swept pylon, five-blade tail rotor to STARBOARD,
              the stabiliser to PORT high on the fin             (D1, P1, P2)
            6 the sliding door with two windows, one window either side (D1, P1)
     Cougar the Puma's layout stretched (two windows either side of the
            door), the black radome nose, the longer cowl with the Makila
            intake fairings further forward and the grilles on the cowl's
            front top, the sponson's upper fairing, the ventral fin and tail
            skid, single main wheels                          (D2, C1, C2)
     NH90   the angular composite fuselage with flat sides, the wide cowl
            continuous with the cabin sides, the broad blunt nose with the
            black radome, four-blade rotor with swept tips, sponsons, the
            underside sweeping up into the rear ramp, the tall swept fin
            with the tail rotor (four blades) to PORT and the long
            stabiliser to starboard                          (D3, N1, N2)

   PAINT (no national markings, serials, unit badges or "armee de TERRE"
   titles; the hexes sit darker than the photographs because the renderer's
   ACES pass lifts mid tones, as fr_gazelle.js explains)
     e60 Puma   vert armee, one army green (P3; fr_gazelle.js's VA)
     e80 Puma   Centre-Europe green / brown / black in broad slanting bands
                (P1, P2; the ALAT scheme from 1985, fr_gazelle.js's CE)
     e90 Cougar Centre-Europe (C1, C2)
     e00 NH90   the French Army's later three tones off N1: a lighter
                green, brown and a dark grey
     Radomes black (C1, C2, N1, N2).

   NOT DRAWN, and why: door guns, the hoist, the Cougar's Horizon radar and
   weapon fits, the NH90's EuroFLIR and fuel tanks (no reference shows them
   on the rows' machines in their period); P1's external tanks (they stand
   on the ground beside it); wire cutters; the many antennas; the blades'
   individual cuffs and tabs.

   NOT CONFIRMED (estimated, not measured or published):
     - all section shapes (how round the corners are) off the front views'
       proportions; half-widths off the plans at their own scales (Puma
       cabin 2.04 m wide, Cougar 2.18 m: the two drawings disagree by 7 %
       for what is the same fuselage section, and each is kept);
     - Puma overall length with rotors turning: 18.38 m here against the
       published 18.15 m. D1's mast (4.28 m behind the nose) and tail rotor
       (2.60 m, hub 9.62 m behind the mast) give it; the published figure
       would need the tail rotor 0.26 m further forward or smaller, which
       P1 does not support;
     - NH90 height: D3 puts the tail rotor hub on the fin top 4.00 m up and
       draws the rotor 3.1 m across, so its top blade reaches 5.43 m at D3's
       blade phase (31 deg off vertical; 5.60 m turning) against the
       published 5.23 m. Nothing fetched says what the published figure is
       measured to; the hub is left where D3 draws it, not lowered to meet it;
     - Cougar: 18.82 m long with rotors turning and 4.94 m high to the tail
       rotor's top (published height 4.92 m); no overall length was fetched;
     - mast tilts off the drawings' blade lines (Puma 3.0, Cougar 2.8, NH90
       0 deg) - coning and drawing error are in them;
     - blade chords off the plans (Puma and Cougar 0.42 m, NH90 0.58 m);
       blade root positions and the heads' parts are proportions of P1, C2;
     - every turning sense: all three heads turn clockwise from above, as
       Sud / Aerospatiale rotors do; for the NH90 that is assumed;
     - the intake fairings' size (0.50-0.54 m across, off P2 and C2 against
       the cabin width); whether the 1970s Pumas had these fairings or the
       plainer intakes D1 draws - both Puma rows carry P1's;
     - the exhaust outlets' size (D1, D2 circles); the NH90's exhaust and
       intake grille positions (D3's top fairing, N1's grille);
     - the stabilisers' positions (the plans and front views disagree by
       up to 0.5 m in height on the Puma) and the tail skids;
     - the NH90 ramp: its seam is drawn where D3's underside starts to
       sweep up (2.2 m behind the mast) to the boom (5.1 m); no photograph
       shows it lowered;
     - Cougar and NH90 main wheels are single, Puma twin (front views, P2,
       C1, N1); tyre sizes and the gear legs' shapes;
     - wheel tracks off the front views: Puma 2.80, Cougar 3.15, NH90 3.08 m;
     - every paint colour; the camouflage is a pattern of slanting bands
       in the photographs' shares, not any one airframe's.

   NAMED NODES (each model)
     rotor      fr_gazelle.js / pla_z8.js mount: -PI/2 about X inside a group
                leaning the shaft, so the node's local +Y points DOWN the mast
                and the head turns clockwise from above (render3d.js
                rotorShafts()).
     rotordisc  inside the rotor, transparent, depthWrite:false.
     tailrotor  ru_mi8.js's mounts: -PI/2 about X for the starboard rotor
                (Puma, Cougar), +PI/2 for the port one (NH90); local -Z is
                outboard. Blades parked as the drawings show them: one
                straight up on the Puma and the Cougar (D1, D2), 31 deg
                forward of vertical on the NH90 (D3).
     gear       the retractable undercarriage (published for all three),
                which render3d.js hides in flight: nose leg and wheels, the
                main legs and wheels. The sponsons stay with the airframe.
   Model space: +X nose, +Y port, +Z up, metres; origin under the mast,
   2.0 m above the wheels' contact plane. len is the measured X extent with
   the rotors turning (disc front to the aftmost of the tail rotor's disc
   and the fin). Materials: SKIN (one canvas texture per scheme and type),
   METAL, DARK, BLADE, RUBBER, GLASS, TEAM (exactly C.team: strips on the
   sponsons and the stabiliser), DISC. ASCII only.                        */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ======================================================================
   The shared kit: geometry (pla_z8.js's), the skin sheet, the paint
   schemes, the rotor and tail rotor, the materials. One factory per build,
   bound to that build's THREE and its height datum.                      */
var FrHeloKit = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;

  /* the ALAT's colours (fr_gazelle.js, taken darker than the chips for the
     renderer's ACES lift) and the NH90's off N1 */
  var PAINT = {
    va:  { base: "#3d4331", lite: "#474e3a", dark: "#333928", seed: 3301 },
    ce:  { base: "#3e4930", seq: [["#523c29", 0.35], ["#3e4930", 0.24], ["#1e1f1b", 0.19], ["#3e4930", 0.22]], seed: 3305 },
    nh:  { base: "#4c5536", seq: [["#5a3f2d", 0.30], ["#4c5536", 0.26], ["#2b2b2f", 0.22], ["#4c5536", 0.22]], seed: 3309 }
  };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function make(V, Z) {
    var K = {};
    K.Z = Z;
    function place(geo, x, y, z, rx, ry, rz) {
      if (rx || ry || rz)
        geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
      if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
      return geo;
    }
    K.place = place;
    K.box = function (sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); };
    K.cyl = function (r0, r1, len, seg, axis, x, y, z, open) {
      var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
      if (axis === "x") g.rotateZ(-PI / 2); else if (axis === "z") g.rotateX(PI / 2);
      return place(g, x, y, z);
    };
    K.sph = function (r, ws, hs, x, y, z, sx, sy, sz) {
      var g = new V.SphereGeometry(r, ws, hs);
      g.scale(sx || 1, sy || 1, sz || 1);
      return place(g, x, y, z);
    };
    K.bar = function (p, q, r, seg, capped) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
      g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
      g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      return g;
    };
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
    K.mirrorY = mirrorY;
    K.both = function (list, geo) { list.push(geo); list.push(mirrorY(geo)); };
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
    K.mesh = function (parent, list, mat, name, uvFn) {
      if (!list.length) return null;
      var geo = merge(list);
      if (uvFn) uvFn(geo);
      var m = new V.Mesh(geo, mat);
      if (name) m.name = name;
      parent.add(m);
      return m;
    };
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
    /* two matching outlines joined side to side: a slab (fin, stabiliser) */
    K.solid = function (A, B) {
      var faces = [A.slice(), B.slice()], i, n = A.length;
      for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
      return convex(faces);
    };
    /* a slab of a side-view outline pts [[x, h]], half-thickness t, at y0 */
    K.slab = function (pts, t, y0) {
      var A = pts.map(function (p) { return [p[0], (y0 || 0) + t, Z(p[1])]; });
      var B = pts.map(function (p) { return [p[0], (y0 || 0) - t, Z(p[1])]; });
      return K.solid(A, B);
    };
    /* a station: x, belly / crown / widest heights (above the ground), the
       half-widths at the belly, the widest line and the crown, and the
       superellipse exponent (pla_z8.js) */
    K.sec = function (x, zb, zt, zm, wb, wm, wt, e) {
      return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e };
    };
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
    K.loft = function (secs, n, noseDx, tailDx, yOff) {
      var pos = [], idx = [], rl = 2 * n, i, j, yo = yOff || 0;
      for (i = 0; i < secs.length; i++) {
        var r = ringOf(secs[i], n);
        for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0] + yo, r[j][1]);
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
        var o = [s.x + dx, cy / rl + yo, cz / rl];
        for (j = 0; j < rl; j++) {
          var p0 = [s.x, r[j][0] + yo, r[j][1]], p1 = [s.x, r[(j + 1) % rl][0] + yo, r[(j + 1) % rl][1]];
          if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
        }
        out.push(tris(t));
      }
      if (noseDx !== null) cap(0, noseDx, true);
      if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
      return out;
    };
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
    function thAt(s, z) {
      if (z >= s.zm) {
        var u = Math.min(1, (z - s.zm) / Math.max(0.01, s.zt - s.zm));
        return Math.asin(Math.pow(u, 1 / s.e));
      }
      var l = Math.min(1, (s.zm - z) / Math.max(0.01, s.zm - s.zb));
      return -Math.asin(Math.pow(l, 1 / s.e));
    }
    /* the half-width of the loft at x and absolute height z, on the facets
       as the loft joins its stations */
    K.sideY = function (secs, x, z) {
      var s = secAt(secs, x), th = thAt(s, z), br = bracket(secs, x);
      var pa = ringPt(br[0], th), pb = ringPt(br[1], th);
      return pa[0] + (pb[0] - pa[0]) * br[2];
    };
    /* a skin-following patch over x0..x1 and heights h0..h1 (above the
       ground) on one side (sgn), stood `off` metres proud: glazing, frames */
    K.patch = function (secs, sgn, x0, x1, h0, h1, nx, nz, off) {
      var P = [], N = [], i, j, out = [];
      for (i = 0; i <= nx; i++) {
        var x = x0 + (x1 - x0) * i / nx, s = secAt(secs, x), row = [], nrow = [], br = bracket(secs, x);
        for (j = 0; j <= nz; j++) {
          var th = thAt(s, Z(h0 + (h1 - h0) * j / nz));
          var pa = ringPt(br[0], th), pb = ringPt(br[1], th);
          var p = [pa[0] + (pb[0] - pa[0]) * br[2], pa[1] + (pb[1] - pa[1]) * br[2]];
          var dxs = br[0].x - br[1].x, sl = 0;
          if (dxs > 0.01) sl = (Math.hypot(pa[0], pa[1] - br[0].zm) - Math.hypot(pb[0], pb[1] - br[1].zm)) / dxs;
          var nn = Math.sqrt(1 + sl * sl);
          var ny = Math.cos(th) / nn, nz2 = Math.sin(th) / nn;
          row.push([x - off * sl / nn, sgn * (p[0] + off * ny), p[1] + off * nz2]);
          nrow.push([-sl / nn, sgn * ny, nz2]);
        }
        P.push(row); N.push(nrow);
      }
      for (i = 0; i < nx; i++) for (j = 0; j < nz; j++) {
        var a = P[i][j], b = P[i + 1][j], c = P[i + 1][j + 1], d = P[i][j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx2 = uy * vz - uz * vy, ny2 = uz * vx - ux * vz, nzz = ux * vy - uy * vx;
        /* wound to face along the skin's own outward normal there */
        var on = N[i][j], o = nx2 * on[0] + ny2 * on[1] + nzz * on[2];
        if (o >= 0) out.push(a, b, c, a, c, d); else out.push(a, c, b, a, d, c);
      }
      return tris(out);
    };
    /* a square-cornered window pane on the skin at x, height h (one side) */
    K.windowAt = function (secs, x, h, w, t, sgn, glass, dark) {
      glass.push(K.patch(secs, sgn, x - w / 2, x + w / 2, h - t / 2, h + t / 2, 2, 2, 0.045));
      dark.push(K.patch(secs, sgn, x - w / 2 - 0.05, x + w / 2 + 0.05, h - t / 2 - 0.05, h + t / 2 + 0.05, 2, 2, 0.030));
    };

    /* ---------------- the skin sheet ----------------
       One 1024 x 1024 canvas in four 256-pixel bands, model metres: 0 TOP
       (x, y), 1 PORT side (x, z), 2 STARBOARD (x, z), 3 BELLY (x, y). */
    K.sheet = function (UX0, UX1, QY, QZ0, QZ1) {
      var TW = 1024, BAND = 256, SH = {};
      SH.TW = TW; SH.BAND = BAND;
      SH.SX = TW / (UX1 - UX0); SH.SZ = BAND / (QZ1 - QZ0); SH.SQ = BAND / (2 * QY);
      SH.UX0 = UX0; SH.UX1 = UX1;
      SH.pxX = function (x) { return (x - UX0) * SH.SX; };
      SH.pyTop = function (y) { return (QY - y) / (2 * QY) * BAND; };
      SH.pySide = function (z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; };
      SH.pyH = function (h, b) { return SH.pySide(Z(h), b); };
      SH.pyBelly = function (y) { return 3 * BAND + (QY - y) / (2 * QY) * BAND; };
      SH.projUV = function (geo) {
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
            if (band === 0) { U = SH.pxX(x); W = SH.pyTop(y); }
            else if (band === 3) { U = SH.pxX(x); W = SH.pyBelly(y); }
            else { U = SH.pxX(endOn ? x + Math.abs(y) * 0.5 : x); W = SH.pySide(z, band); }
            U = Math.max(2, Math.min(TW - 2, U));
            W = Math.max(lo, Math.min(hi, W));
            uv[(t / 3 + k) * 2] = U / TW;
            uv[(t / 3 + k) * 2 + 1] = 1 - W / TW;
          }
        }
        geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
        return geo;
      };
      return SH;
    };

    /* the paint: a scheme's ground, then (bands) the disruptive pattern in
       slanting bands that repeat every 1.7-2.8 m in the scheme's order and
       shares, sprayed band by band so the sides are not mirror images
       (fr_gazelle.js's Centre-Europe painter); then grime, sun, and the
       type's own seams through drawSeams(g). */
    K.paint = function (SH, scheme, seedAdd, drawSeams) {
      var cv = document.createElement("canvas");
      cv.width = SH.TW; cv.height = SH.TW;
      var g = cv.getContext("2d");
      var PS = PAINT[scheme], R = rngFor(PS.seed + (seedAdd || 0)), i, b;
      var TW = SH.TW, BAND = SH.BAND, NV = 9;
      g.fillStyle = PS.base; g.fillRect(0, 0, TW, TW);
      if (PS.seq) {
        for (b = 0; b < 4; b++) {
          var sy = (b === 0 || b === 3) ? SH.SQ : SH.SZ, hM = BAND / sy;
          var tilt = (b & 1 ? 1 : -1) * (0.35 + R() * 0.35);
          var edge = function (u0, amp, after) {
            var t2 = tilt + (R() - 0.5) * 0.9, out = [];
            for (var q = 0; q < NV; q++) {
              var e2 = u0 + t2 * (q / (NV - 1) - 0.5) * hM + (R() - 0.5) * 2 * amp;
              out.push(after ? Math.max(e2, after[q] + 0.10) : e2);
            }
            return out;
          };
          g.save();
          g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
          var u = SH.UX0 - 1.2 - R() * 1.5, prev = edge(u, 0.10, null), si = Math.floor(R() * 4);
          while (u < SH.UX1 + 1.2) {
            var P = 1.7 + R() * 1.1, st2 = PS.seq[si % 4], w2 = P * st2[1];
            u += w2;
            var next = edge(u, Math.min(0.30, w2 * 0.45), prev);
            if (st2[0] !== PS.base) {
              g.fillStyle = st2[0];
              g.beginPath();
              for (var q2 = 0; q2 < NV; q2++) {
                var yy2 = b * BAND + BAND * q2 / (NV - 1);
                if (q2) g.lineTo(SH.pxX(prev[q2]), yy2); else g.moveTo(SH.pxX(prev[q2]), yy2);
              }
              for (q2 = NV - 1; q2 >= 0; q2--) g.lineTo(SH.pxX(next[q2]), b * BAND + BAND * q2 / (NV - 1));
              g.closePath(); g.fill();
            }
            prev = next; si++;
          }
          g.restore();
        }
      } else {
        /* one flat army green; repainted panels a shade off */
        for (i = 0; i < 120; i++) {
          g.fillStyle = (i & 1) ? PS.lite : PS.dark;
          g.globalAlpha = 0.22 + R() * 0.30;
          g.fillRect(R() * TW, R() * TW, (0.3 + R() * 1.0) * SH.SX, 10 + R() * 30);
        }
        g.globalAlpha = 1;
      }
      g.fillStyle = "rgba(255,255,236,0.045)"; g.fillRect(0, 0, TW, BAND);
      for (i = 0; i < 150; i++) {
        g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.07).toFixed(3) + ")";
        g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 8 + R() * 36);
      }
      for (i = 0; i < 80; i++) {
        g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
        g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 80, 6 + R() * 18);
      }
      if (drawSeams) drawSeams(g);
      return cv;
    };
    /* helpers for the seams: frames across every band, a rectangle on a
       side band, a soot gradient running aft */
    K.frames = function (g, SH, xs) {
      g.lineWidth = 1.4;
      xs.forEach(function (x0) {
        var x = SH.pxX(x0);
        g.strokeStyle = "rgba(0,0,0,0.26)"; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, SH.TW); g.stroke();
        g.fillStyle = "rgba(0,0,0,0.20)";
        for (var y = 3; y < SH.TW; y += 7) g.fillRect(x - 4, y, 1.4, 1.4);
      });
    };
    K.rectSide = function (g, SH, b, x0, x1, h0, h1, w, a) {
      g.strokeStyle = "rgba(0,0,0," + (a || 0.58) + ")"; g.lineWidth = w || 2.2;
      g.strokeRect(SH.pxX(x1), SH.pyH(h1, b), SH.pxX(x0) - SH.pxX(x1), SH.pyH(h0, b) - SH.pyH(h1, b));
    };
    K.lineSide = function (g, SH, b, x0, h0, x1, h1, w, a) {
      g.strokeStyle = "rgba(0,0,0," + (a || 0.5) + ")"; g.lineWidth = w || 2;
      g.beginPath(); g.moveTo(SH.pxX(x0), SH.pyH(h0, b)); g.lineTo(SH.pxX(x1), SH.pyH(h1, b)); g.stroke();
    };
    K.soot = function (g, SH, b, x0, len, h0, h1, a) {
      var sg = g.createLinearGradient(SH.pxX(x0), 0, SH.pxX(x0 - len), 0);
      sg.addColorStop(0, "rgba(16,15,13," + (a || 0.5) + ")"); sg.addColorStop(1, "rgba(16,15,13,0)");
      g.fillStyle = sg;
      g.fillRect(SH.pxX(x0 - len), SH.pyH(h1, b), SH.pxX(x0) - SH.pxX(x0 - len), SH.pyH(h0, b) - SH.pyH(h1, b));
    };
    K.texture = function (cache, key, makeCanvas) {
      if (cache[key] !== undefined) return cache[key];
      try {
        var t = new V.CanvasTexture(makeCanvas());
        t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
        t.anisotropy = 4;
        if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
        cache[key] = t;
      } catch (e) { cache[key] = false; }
      return cache[key];
    };

    K.mats = function (C, tex, base) {
      var m = {};
      m.skin   = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
      if (tex) m.skin.map = tex; else m.skin.color.set(base);
      m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
      m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.30 });
      m.blade  = new V.MeshStandardMaterial({ color: 0x2c302e, roughness: 0.78, metalness: 0.14 });
      m.rubber = new V.MeshStandardMaterial({ color: 0x0e0f0f, roughness: 0.95, metalness: 0.02 });
      m.glass  = new V.MeshPhysicalMaterial({ color: 0x1b262b, roughness: 0.08, metalness: 0.20,
                                              clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
      /* the skin-following patches (glazing, frames) are thin shells stood
         off the skin, so both their faces are drawn */
      m.dark.side = V.DoubleSide;
      var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
      m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                              emissive: new V.Color(tc), emissiveIntensity: 0.10 });
      m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                              transparent: true, opacity: 0.05, depthWrite: false });
      return m;
    };

    /* ---------------- the main rotor ----------------
       The Sud mount (pla_z8.js, fr_gazelle.js): a group leaning the shaft
       `tilt` forward at the hub, inside it -PI/2 about X, so the "rotor"
       node's local +Y points DOWN the mast and the head turns clockwise
       from above; a +PI/2 group inside puts the head back in model axes.
       o: hubZ (absolute), R, chord, n, tilt, root (blade root radius),
       tipSweep (m the tip's leading edge is cut back), head: "dome" |
       "star", rootAng (deg of the first blade). */
    K.rotor = function (g, T, o) {
      var tilt = new V.Group();
      tilt.position.set(0, 0, o.hubZ);
      tilt.rotation.y = o.tilt;
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
      var hubM = [], hubD = [], blades = [], k, i;
      if (o.head === "star") {
        /* a flat elastomeric star under a low dome */
        hubM.push(K.cyl(0.42, 0.46, 0.18, 20, "z", 0, 0, 0));
        hubM.push(K.sph(0.40, 18, 8, 0, 0, 0.08, 1, 1, 0.45));
        hubM.push(K.cyl(0.40, 0.40, 0.06, 20, "z", 0, 0, -0.20));
      } else {
        /* the Puma head: hub plate, the cap on its spider over it (D1, D2) */
        hubM.push(K.cyl(0.30, 0.34, 0.28, 16, "z", 0, 0, 0));
        hubM.push(K.cyl(0.08, 0.08, 0.30, 8, "z", 0, 0, 0.26));
        hubM.push(K.sph(0.50, 20, 8, 0, 0, 0.40, 1, 1, 0.34));
        hubM.push(K.cyl(0.38, 0.38, 0.06, 20, "z", 0, 0, -0.22));
      }
      var LE = -o.chord / 4, TE = LE + o.chord, RT = o.R, SW = o.tipSweep || 0;
      var BP = [[o.root, LE + 0.04], [o.root + 0.30, LE], [RT - SW - 0.05, LE], [RT, LE + SW * 0.5 + 0.03],
                [RT, TE], [o.root + 0.30, TE], [o.root, TE - 0.06]];
      for (k = 0; k < o.n; k++) {
        var a = ((o.rootAng || 45) + 360 / o.n * k) * D2R;
        var bl = K.solid(BP.map(function (q) { return [q[0], q[1], -0.04]; }),
                         BP.map(function (q) { return [q[0], q[1], -0.005]; }));
        bl.rotateZ(a);
        blades.push(bl);
        var parts = [[K.box(o.root - 0.15, 0.20, 0.15, (o.root + 0.15) / 2, 0, 0), hubM],
                     [K.cyl(0.075, 0.07, 0.40, 8, "x", o.root - 0.05, 0, -0.02), hubM],
                     [K.cyl(0.045, 0.045, 0.50, 6, "x", o.root * 0.55, 0.19, 0.04), hubD],
                     [K.box(0.09, 0.06, 0.20, 0.40, -0.15, -0.12), hubD]];
        for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
      }
      K.mesh(head, hubM, T.metal, "hub");
      K.mesh(head, hubD, T.dark, "hub_dampers");
      K.mesh(head, blades, T.blade, "blades");
      K.mesh(head, [place(new V.CircleGeometry(o.R, 48), 0, 0, 0.03)], T.disc, "rotordisc");
      /* the mast and the swashplate ring under the head, leaned with it */
      var tiltM = new V.Matrix4().makeRotationY(o.tilt).premultiply(new V.Matrix4().makeTranslation(0, 0, o.hubZ));
      var ms = [K.cyl(0.17, 0.20, o.mast, 14, "z", 0, 0, -o.mast / 2 - 0.10), K.cyl(0.38, 0.38, 0.06, 20, "z", 0, 0, -0.30)];
      ms.forEach(function (q) { q.applyMatrix4(tiltM); });
      return ms;
    };

    /* ---------------- the tail rotor ----------------
       ru_mi8.js's mounts: -PI/2 about X on the starboard side, +PI/2 on
       the port side; local -Z is outboard either way. o: x, y, z, R, n,
       chord. */
    K.tailRotor = function (g, T, o) {
      var tm = new V.Group();
      tm.position.set(o.x, o.y, o.z);
      tm.rotation.x = o.y > 0 ? PI / 2 : -PI / 2;
      g.add(tm);
      var trot = new V.Group();
      trot.name = "tailrotor";
      tm.add(trot);
      var trB = [K.cyl(0.14, 0.14, 0.20, 12, "z", 0, 0, 0), K.cyl(0.10, 0.03, 0.16, 10, "z", 0, 0, -0.18)];
      for (var k = 0; k < o.n; k++) {
        var ang = ((o.phase !== undefined ? o.phase : (o.y > 0 ? 90 : 270)) + 360 / o.n * k) * D2R;
        var tb = K.box(o.R - 0.24, o.chord, 0.035, 0.24 + (o.R - 0.24) / 2, 0, 0);
        tb.rotateX(8 * D2R);
        tb.rotateZ(ang);
        tb.translate(0, 0, -0.04);
        trB.push(tb);
        var cuff = K.box(0.28, o.chord * 0.5, 0.09, 0.19, 0, 0);
        cuff.rotateZ(ang); cuff.translate(0, 0, -0.04);
        trB.push(cuff);
      }
      K.mesh(trot, trB, T.blade, "tailrotor_blades");
    };

    /* ---------------- wheels ----------------
       a wheel on an axle along Y: tyre to rubber, hub to metal */
    K.wheel = function (rub, met, x, y, z, R, W) {
      rub.push(K.cyl(R, R, W, 20, "y", x, y, z));
      met.push(K.cyl(R * 0.58, R * 0.58, W + 0.012, 12, "y", x, y, z));
    };
    return K;
  }

  return { make: make, PAINT: PAINT, D2R: D2R };
})();


/* ======================================================================
   AEROSPATIALE SA 330 PUMA - fra_e60_transport, fra_e80_transport.
   Stations off D1 at 60.0 px/m: x = (918 - px) / 60 from the mast,
   h = (908 - py) / 60 above D1's wheel line; the airframe stands 0.09 m
   higher on the photograph's wheels (see SETTLED above), so the contact
   plane is h = -0.09 and Z(h) = h - 1.91 puts it at z = -2.00.          */
var HeroPuma = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180, V = null;
  var LIFT = 0.09;
  function Z(h) { return h + LIFT - 2.0; }
  var HUB_H = 4.10, ROTOR_R = 7.50, CHORD = 0.42, MAST_TILT = 3.0 * D2R;
  var TR_X = -9.62, TR_H = 3.72, TR_R = 1.30, TR_Y = -0.48;
  var NW_X = 2.87, NW_R = 0.25, NW_Y = 0.17;
  var MW_X = -1.63, MW_R = 0.27, MW_Y0 = 1.24, MW_Y1 = 1.56;
  var GR = -LIFT;                                       /* the contact plane */
  var EX_X = 0.17, EX_H = 2.93, EX_R = 0.30;            /* exhaust outlets   */
  var WIN = [1.30, 0.33, -0.25, -1.62], WIN_H = 1.83;   /* cabin windows     */
  var DOOR = { x0: 0.67, x1: -0.67, h0: 0.63, h1: 2.23 };

  var VARIANTS = {
    e60: { key: "e60", scheme: "va" },
    e80: { key: "e80", scheme: "ce" }
  };

  var _tex = {};
  function skin(K, VR) {
    var SH = K.sheet(-11.2, 4.6, 2.0, Z(0.3), Z(4.0));
    var tex = K.texture(_tex, VR.scheme, function () {
      return K.paint(SH, VR.scheme, 0, function (g) {
        var b;
        K.frames(g, SH, [3.60, 2.37, 1.75, 0.67, -0.67, -1.37, -2.70, -4.03, -5.40, -6.80, -8.10]);
        for (b = 1; b <= 2; b++) {
          /* the sliding door and its rail; the cockpit door (D1, P1) */
          K.rectSide(g, SH, b, DOOR.x0, DOOR.x1, DOOR.h0, DOOR.h1);
          K.lineSide(g, SH, b, DOOR.x0, 2.32, -2.10, 2.32, 3, 0.5);
          K.rectSide(g, SH, b, 2.95, 2.37, 0.70, 2.55, 2.0, 0.5);
          /* the stringer along the cabin's upper corner (D1's line at 2.57) */
          K.lineSide(g, SH, b, 2.6, 2.57, -8.0, 2.57, 1.2, 0.25);
          /* the exhausts' soot streaking aft along the cowl and the boom top
             (P1) */
          K.soot(g, SH, b, EX_X - 0.2, 5.5, 2.55, 3.35, 0.55);
        }
        /* soot over the top behind the cowl */
        var sg = g.createLinearGradient(SH.pxX(-1.5), 0, SH.pxX(-6.5), 0);
        sg.addColorStop(0, "rgba(16,15,13,0.45)"); sg.addColorStop(1, "rgba(16,15,13,0)");
        g.fillStyle = sg; g.fillRect(SH.pxX(-6.5), SH.pyTop(0.6), SH.pxX(-1.5) - SH.pxX(-6.5), SH.pyTop(-0.6) - SH.pyTop(0.6));
      });
    });
    return { SH: SH, tex: tex };
  }

  function build(THREE, M, C, VR) {
    V = THREE;
    var K = FrHeloKit.make(V, Z);
    var S = K.sec;
    var sk = skin(K, VR);
    var T = K.mats(C, sk.tex, FrHeloKit.PAINT[VR.scheme].base);
    var g = new V.Group();
    g.name = "puma_" + VR.key;
    var i, sg;
    var skinL = [], dark = [], metal = [], team = [], glass = [];

    /* ------------------------------------------------- the fuselage ----
       STATION TABLE (D1 side, top / bottom; plan half-widths at 59 px/m:
       x = 4.32 - (py - 70) / 59). Nose tip at x 4.28, h 1.17; the roof at
       2.75 from the windscreen to the pylon; the belly at 0.55 to x -1.4,
       sweeping up to 1.82 at the pylon; the cabin 2.03 m wide from x 2.46
       to -0.6, then narrowing in plan to 0.88 m at x -4.4 and 0.44 m at
       the pylon. */
    var fus = [
      S( 4.28, 1.12, 1.22, 1.17, 0.03, 0.05, 0.03, 1.00),
      S( 4.18, 0.86, 1.50, 1.17, 0.26, 0.42, 0.24, 0.85),
      S( 3.97, 0.70, 1.72, 1.20, 0.42, 0.59, 0.36, 0.72),
      S( 3.63, 0.58, 2.00, 1.25, 0.60, 0.77, 0.47, 0.62),
      S( 3.30, 0.55, 2.40, 1.35, 0.72, 0.88, 0.56, 0.55),
      S( 2.97, 0.55, 2.67, 1.42, 0.80, 0.96, 0.66, 0.50),
      S( 2.63, 0.55, 2.75, 1.45, 0.84, 0.99, 0.78, 0.47),
      S( 2.30, 0.55, 2.75, 1.45, 0.86, 1.02, 0.84, 0.45),
      S(-0.70, 0.55, 2.75, 1.45, 0.86, 1.02, 0.84, 0.45),
      S(-1.37, 0.55, 2.75, 1.50, 0.82, 0.96, 0.80, 0.45),
      S(-2.03, 0.58, 2.75, 1.60, 0.72, 0.89, 0.74, 0.47),
      S(-2.70, 0.80, 2.75, 1.75, 0.58, 0.78, 0.65, 0.50),
      S(-3.37, 1.10, 2.75, 1.90, 0.44, 0.62, 0.54, 0.55),
      S(-4.03, 1.50, 2.75, 2.12, 0.33, 0.47, 0.42, 0.62),
      S(-5.00, 1.65, 2.75, 2.20, 0.29, 0.41, 0.37, 0.65),
      S(-6.44, 1.71, 2.75, 2.23, 0.24, 0.33, 0.30, 0.68),
      S(-8.10, 1.82, 2.75, 2.28, 0.17, 0.24, 0.21, 0.72),
      S(-8.60, 1.86, 2.72, 2.29, 0.15, 0.21, 0.18, 0.75)
    ];
    K.loft(fus, 18, 0.03, 0.02).forEach(function (q) { skinL.push(q); });

    /* ---------------------------------------------------- glazing ----
       D1's side and front views, P2 head-on: the big windscreen panes
       over the nose, the side windows over the cockpit doors, the chin
       windows low on the nose either side of the centre post. */
    [1, -1].forEach(function (s) {
      glass.push(K.patch(fus, s, 3.32, 4.02, 1.40, 2.25, 10, 10, 0.06));
      glass.push(K.patch(fus, s, 2.62, 3.24, 1.70, 2.62, 9, 10, 0.06));
      glass.push(K.patch(fus, s, 3.78, 4.18, 0.85, 1.30, 4, 4, 0.06));
      glass.push(K.patch(fus, s, 2.45, 2.80, 1.22, 1.55, 3, 3, 0.06));
      dark.push(K.patch(fus, s, 3.24, 3.32, 1.38, 2.62, 1, 5, 0.08));
      dark.push(K.patch(fus, s, 2.55, 3.30, 2.62, 2.69, 6, 1, 0.08));
      dark.push(K.patch(fus, s, 3.30, 4.04, 1.33, 1.40, 6, 1, 0.08));
      dark.push(K.patch(fus, s, 2.55, 2.62, 1.66, 2.66, 1, 4, 0.08));
    });
    dark.push(K.box(0.10, 0.10, 0.90, 3.72, 0, Z(1.85), 0, -0.85, 0));
    /* cabin windows, both sides alike (D1 port, P1 starboard): one ahead of
       the sliding door, two in it, one behind */
    for (i = 0; i < WIN.length; i++) {
      K.windowAt(fus, WIN[i], WIN_H, 0.52, 0.40, 1, glass, dark);
      K.windowAt(fus, WIN[i], WIN_H, 0.52, 0.40, -1, glass, dark);
    }

    /* ------------------------------------------------- the cowl ----
       D1: the engine cowl's front at x 2.47, its top at 3.20 back to the
       mast fairing's front at x 1.18, the fairing 3.63 from 0.97 to -1.10,
       falling to the boom top at x -2.75. Half-widths off the plan (the
       deck lines 0.57-0.60 m out) and the front view (1.33 m over the
       engines). Base inside the roof. */
    var cowl = [
      S( 2.47, 2.55, 3.10, 2.90, 0.62, 0.64, 0.44, 0.70),
      S( 2.30, 2.55, 3.20, 2.92, 0.70, 0.70, 0.50, 0.62),
      S( 1.30, 2.55, 3.22, 2.92, 0.72, 0.72, 0.52, 0.60),
      S( 1.18, 2.55, 3.55, 3.00, 0.72, 0.72, 0.46, 0.60),
      S( 0.90, 2.55, 3.63, 3.00, 0.72, 0.72, 0.44, 0.60),
      S(-1.10, 2.55, 3.58, 3.00, 0.70, 0.70, 0.42, 0.60),
      S(-1.70, 2.55, 3.40, 2.95, 0.60, 0.62, 0.38, 0.62),
      S(-2.37, 2.55, 2.97, 2.82, 0.40, 0.42, 0.30, 0.70),
      S(-2.80, 2.60, 2.80, 2.74, 0.18, 0.20, 0.14, 0.80)
    ];
    K.loft(cowl, 14, 0.03, 0.05).forEach(function (q) { skinL.push(q); });
    [1, -1].forEach(function (s) {
      /* the two round intake fairings at the cowl's front (P1, P2: about
         0.54 m across against the 2.03 m cabin, centres 0.59 m apart),
         with the centre bullet; a grille ring (D1's front view) */
      var iy = s * 0.30, iz = Z(2.95);
      skinL.push(K.cyl(0.25, 0.27, 0.40, 20, "x", 2.62, iy, iz));
      skinL.push(K.sph(0.25, 18, 8, 2.82, iy, iz, 0.35, 1, 1));
      dark.push(K.place(new V.CircleGeometry(0.20, 18), 2.92, iy, iz, 0, PI / 2, 0));
      metal.push(K.cyl(0.21, 0.21, 0.04, 18, "x", 2.90, iy, iz, true));
      metal.push(K.sph(0.08, 10, 6, 2.94, iy, iz, 1.4, 1, 1));
      /* the round exhaust outlet each side ahead of the mast (D1's circle,
         P1's capped outlet): a lipped ring and the dark pipe */
      var oy = K.sideY(cowl, EX_X, Z(EX_H));
      metal.push(K.place(new V.TorusGeometry(EX_R, 0.04, 6, 20), EX_X, s * (oy + 0.01), Z(EX_H), PI / 2, 0, 0));
      dark.push(K.cyl(EX_R - 0.02, EX_R - 0.02, 0.10, 18, "y", EX_X, s * (oy - 0.03), Z(EX_H)));
      /* cowl louvres (D1's marks at x 1.7-1.0) */
      for (i = 0; i < 6; i++) dark.push(K.box(0.03, 0.02, 0.12, 1.75 - i * 0.07, s * (K.sideY(cowl, 1.6, Z(3.06)) + 0.005), Z(3.06)));
    });
    /* the mast and swashplate (with the rotor) */

    /* ---------------------------------------------------- sponsons ----
       D1 side: blunt front at x -0.95, pointed tail at -3.03, h 0.50-1.17;
       plan: out to 1.69 m. A pod centred 1.18 m out, its inner half inside
       the cabin side. */
    [1, -1].forEach(function (s) {
      var sp = [
        S(-0.88, 0.70, 0.98, 0.84, 0.18, 0.24, 0.18, 0.90),
        S(-1.05, 0.54, 1.12, 0.84, 0.40, 0.48, 0.40, 0.70),
        S(-1.40, 0.50, 1.17, 0.84, 0.44, 0.51, 0.44, 0.65),
        S(-2.40, 0.50, 1.17, 0.85, 0.42, 0.50, 0.42, 0.65),
        S(-2.85, 0.66, 1.08, 0.88, 0.22, 0.30, 0.20, 0.75),
        S(-3.05, 0.86, 0.96, 0.91, 0.03, 0.04, 0.03, 1.00)
      ];
      K.loft(sp, 12, 0.03, null, s * 1.18).forEach(function (q) { skinL.push(q); });
      team.push(K.box(1.10, 0.28, 0.02, -1.85, s * 1.25, Z(1.175)));
    });

    /* --------------------------------- pylon, stabiliser, tail rotor --
       D1: the pylon's leading edge from the boom top at x -8.10 up to the
       gearbox at -9.53, 3.87 m; trailing edge from -9.70, 3.27 down to
       -8.53, 1.82. The stabiliser on the PORT side high on the fin (P2,
       D1's plan and front views): 0.9 m chord, 2.40 m out. */
    skinL.push(K.slab([[-8.10, 2.74], [-9.05, 3.63], [-9.53, 3.87], [-9.78, 3.63], [-9.70, 3.27],
                       [-8.53, 1.82], [-8.17, 1.82]], 0.15, 0));
    metal.push(K.sph(0.24, 14, 8, TR_X, 0, Z(TR_H), 1.5, 1.0, 1.0));
    metal.push(K.bar([TR_X, -0.10, Z(TR_H)], [TR_X, TR_Y + 0.10, Z(TR_H)], 0.08, 10, true));
    var stz = Z(3.45);
    skinL.push(K.solid([[-8.78, 0.12, stz + 0.05], [-8.95, 2.40, stz + 0.05], [-9.68, 2.40, stz + 0.05], [-9.66, 0.12, stz + 0.05]],
                       [[-8.78, 0.12, stz - 0.05], [-8.95, 2.40, stz - 0.05], [-9.68, 2.40, stz - 0.05], [-9.66, 0.12, stz - 0.05]]));
    team.push(K.box(0.55, 0.80, 0.012, -9.30, 1.85, stz + 0.056));
    /* tail bumper under the pylon (D1) */
    metal.push(K.bar([-8.45, 0, Z(1.86)], [-8.80, 0, Z(1.55)], 0.04, 6, true));
    metal.push(K.box(0.30, 0.16, 0.04, -8.82, 0, Z(1.53)));
    /* antennas: a blade on the boom, a whip under the cabin */
    metal.push(K.box(0.24, 0.03, 0.16, -5.6, 0, Z(2.83)));
    metal.push(K.bar([0.8, 0, Z(0.56)], [0.3, 0, Z(0.30)], 0.012, 4, true));

    /* -------------------------------------------------------- gear ----
       Retractable (published), so "gear": twin nose wheels on one leg under
       the cockpit at x 2.87; twin main wheels each side on a short leg out
       of the sponson's underside at x -1.63 (P1, P2), track 2.80 m. */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var gM = [], gR = [];
    [NW_Y, -NW_Y].forEach(function (y) { K.wheel(gR, gM, NW_X, y, Z(GR + NW_R), NW_R, 0.17); });
    gM.push(K.cyl(0.04, 0.04, 2 * NW_Y + 0.12, 8, "y", NW_X, 0, Z(GR + NW_R)));
    gM.push(K.bar([NW_X + 0.08, 0, Z(0.58)], [NW_X, 0, Z(GR + NW_R)], 0.065, 8, true));
    gM.push(K.bar([NW_X - 0.25, 0, Z(0.58)], [NW_X - 0.02, 0, Z(GR + NW_R + 0.12)], 0.03, 6, true));
    [1, -1].forEach(function (s) {
      [MW_Y0, MW_Y1].forEach(function (y) { K.wheel(gR, gM, MW_X, s * y, Z(GR + MW_R), MW_R, 0.19); });
      gM.push(K.cyl(0.045, 0.045, MW_Y1 - MW_Y0 + 0.24, 8, "y", MW_X, s * (MW_Y0 + MW_Y1) / 2, Z(GR + MW_R)));
      gM.push(K.bar([MW_X, s * 1.40, Z(GR + MW_R)], [MW_X + 0.05, s * 1.36, Z(0.62)], 0.07, 8, true));
      gM.push(K.bar([MW_X, s * 1.40, Z(GR + MW_R + 0.05)], [MW_X + 0.45, s * 1.28, Z(0.60)], 0.035, 6, true));
    });
    K.mesh(gear, gM, T.metal, "gear_struts");
    K.mesh(gear, gR, T.rubber, "tyres");

    /* ======================================================= rotors ==
       Four blades, 15.00 m (published); D1's blade plane 4.10 m up and its
       3 deg forward lean; the head's cap (D1). Five-blade tail rotor on the
       STARBOARD side (P1, P2, D1's plan), 2.60 m (see SETTLED). */
    K.rotor(g, T, { hubZ: Z(HUB_H), R: ROTOR_R, chord: CHORD, n: 4, tilt: MAST_TILT, root: 1.00,
                    head: "dome", mast: 0.75, rootAng: 45 }).forEach(function (q) { metal.push(q); });
    K.tailRotor(g, T, { x: TR_X, y: TR_Y, z: Z(TR_H), R: TR_R, n: 5, chord: 0.20 });

    K.mesh(g, skinL, T.skin, "airframe", sk.SH.projUV);
    K.mesh(g, glass, T.glass, "glass");
    K.mesh(g, dark, T.dark, "fittings_dark");
    K.mesh(g, metal, T.metal, "fittings");
    K.mesh(g, team, T.team, "team");
    g.traverse(function (o) { if (o.isMesh && o.material !== T.disc) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return {
    e60: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.e60); },
    e80: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.e80); },
    VARIANTS: VARIANTS
  };
})();


/* ======================================================================
   EUROCOPTER AS 532UL COUGAR - fra_e90_transport.
   Stations off D2 at 56.1 px/m: x = (954 - px) / 56.1 from the mast,
   h = (930 - py) / 56.1 above the wheels; Z(h) = h - 2.0.                */
var HeroCougar = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180, V = null;
  function Z(h) { return h - 2.0; }
  var HUB_H = 4.28, ROTOR_R = 7.80, CHORD = 0.42, MAST_TILT = 2.8 * D2R;
  var TR_X = -9.52, TR_H = 3.39, TR_R = 1.55, TR_Y = -0.57;
  var NW_X = 3.55, NW_R = 0.23, NW_Y = 0.17;
  var MW_X = -1.64, MW_R = 0.30, MW_Y = 1.58;
  var EX_X = 0.25, EX_H = 3.00, EX_R = 0.29;
  var WIN = [1.22, 0.59, -0.03, -1.45, -2.79], WIN_H = 1.87;
  var DOOR = { x0: 0.86, x1: -0.53, h0: 0.89, h1: 2.32 };
  var _tex = {};

  function skin(K) {
    var SH = K.sheet(-11.6, 5.6, 2.1, Z(0.3), Z(4.0));
    var tex = K.texture(_tex, "ce", function () {
      return K.paint(SH, "ce", 17, function (g) {
        var b;
        K.frames(g, SH, [4.85, 3.40, 2.55, 1.55, 0.86, -0.53, -2.20, -3.50, -5.00, -6.50, -7.83]);
        for (b = 1; b <= 2; b++) {
          K.rectSide(g, SH, b, DOOR.x0, DOOR.x1, DOOR.h0, DOOR.h1);
          K.lineSide(g, SH, b, DOOR.x0, 2.40, -2.40, 2.40, 3, 0.5);
          K.rectSide(g, SH, b, 3.25, 2.55, 0.70, 2.65, 2.0, 0.5);
          K.lineSide(g, SH, b, 3.2, 2.53, -7.8, 2.66, 1.2, 0.25);
          K.soot(g, SH, b, EX_X - 0.2, 5.5, 2.65, 3.40, 0.55);
        }
        var sg = g.createLinearGradient(SH.pxX(-1.6), 0, SH.pxX(-6.8), 0);
        sg.addColorStop(0, "rgba(16,15,13,0.45)"); sg.addColorStop(1, "rgba(16,15,13,0)");
        g.fillStyle = sg; g.fillRect(SH.pxX(-6.8), SH.pyTop(0.6), SH.pxX(-1.6) - SH.pxX(-6.8), SH.pyTop(-0.6) - SH.pyTop(0.6));
      });
    });
    return { SH: SH, tex: tex };
  }

  function build(THREE, M, C) {
    V = THREE;
    var K = FrHeloKit.make(V, Z);
    var S = K.sec;
    var sk = skin(K);
    var T = K.mats(C, sk.tex, FrHeloKit.PAINT.ce.base);
    var g = new V.Group();
    g.name = "cougar_e90";
    var i;
    var skinL = [], dark = [], metal = [], team = [], glass = [];

    /* ------------------------------------------------- the fuselage ----
       STATION TABLE (D2 side; plan half-widths at 53.3 px/m, x = 5.35 -
       (py - 107) / 53.3). The radome nose ahead of x 4.85 is black and its
       own loft; nose tip at x 5.35, h 1.25; roof 2.90; belly 0.53 to x
       -1.7, sweeping up to 1.75 at the pylon; the boom top falling from
       2.91 to 2.66. Cabin 2.18 m across from x 2.8 to 0. */
    var nose = [
      S( 5.35, 1.20, 1.30, 1.25, 0.03, 0.05, 0.03, 1.00),
      S( 5.20, 1.04, 1.47, 1.25, 0.28, 0.36, 0.26, 0.85),
      S( 5.06, 0.96, 1.55, 1.25, 0.38, 0.45, 0.35, 0.80),
      S( 4.85, 0.85, 1.67, 1.25, 0.48, 0.58, 0.44, 0.75)
    ];
    var fus = [
      S( 4.85, 0.85, 1.67, 1.25, 0.48, 0.58, 0.44, 0.75),
      S( 4.71, 0.73, 1.75, 1.25, 0.55, 0.66, 0.48, 0.70),
      S( 4.35, 0.70, 2.05, 1.30, 0.70, 0.84, 0.55, 0.62),
      S( 3.99, 0.57, 2.44, 1.38, 0.80, 0.97, 0.64, 0.55),
      S( 3.64, 0.53, 2.78, 1.45, 0.86, 1.04, 0.74, 0.50),
      S( 3.28, 0.53, 2.88, 1.48, 0.89, 1.08, 0.82, 0.47),
      S( 2.76, 0.53, 2.90, 1.50, 0.90, 1.10, 0.86, 0.45),
      S(-0.05, 0.53, 2.90, 1.50, 0.90, 1.09, 0.86, 0.45),
      S(-0.99, 0.53, 2.90, 1.55, 0.86, 1.04, 0.82, 0.45),
      S(-1.93, 0.55, 2.91, 1.62, 0.78, 0.95, 0.76, 0.47),
      S(-2.42, 0.71, 2.91, 1.72, 0.70, 0.88, 0.70, 0.49),
      S(-2.87, 0.88, 2.90, 1.82, 0.60, 0.77, 0.62, 0.51),
      S(-3.34, 1.07, 2.88, 1.94, 0.50, 0.66, 0.54, 0.55),
      S(-3.81, 1.27, 2.86, 2.05, 0.41, 0.54, 0.46, 0.60),
      S(-4.27, 1.44, 2.83, 2.12, 0.37, 0.49, 0.43, 0.62),
      S(-5.28, 1.57, 2.78, 2.18, 0.31, 0.42, 0.38, 0.65),
      S(-6.62, 1.67, 2.72, 2.20, 0.27, 0.36, 0.33, 0.68),
      S(-7.83, 1.75, 2.66, 2.20, 0.22, 0.30, 0.27, 0.72),
      S(-8.40, 1.79, 2.64, 2.22, 0.19, 0.26, 0.23, 0.75)
    ];
    K.loft(fus, 18, null, 0.02).forEach(function (q) { skinL.push(q); });
    K.loft(nose, 16, 0.03, null).forEach(function (q) { dark.push(q); });

    /* glazing (D2's side and front views; C1, C2) */
    [1, -1].forEach(function (s) {
      glass.push(K.patch(fus, s, 3.98, 4.62, 1.80, 2.48, 9, 9, 0.06));
      glass.push(K.patch(fus, s, 3.32, 3.92, 1.85, 2.78, 9, 10, 0.06));
      glass.push(K.patch(fus, s, 4.30, 4.78, 1.00, 1.62, 4, 4, 0.06));
      glass.push(K.patch(fus, s, 2.62, 3.10, 1.20, 1.55, 3, 3, 0.06));
      dark.push(K.patch(fus, s, 3.92, 3.98, 1.78, 2.72, 1, 4, 0.08));
      dark.push(K.patch(fus, s, 3.25, 3.32, 1.80, 2.82, 1, 4, 0.08));
      dark.push(K.patch(fus, s, 3.30, 4.66, 1.73, 1.80, 6, 1, 0.08));
    });
    dark.push(K.box(0.10, 0.10, 0.80, 4.30, 0, Z(2.12), 0, -0.80, 0));
    /* the larger window ahead of the others (D2), then two, the door's two,
       two behind (D2 port, C1) */
    [1, -1].forEach(function (s) {
      K.windowAt(fus, 1.84, 1.92, 0.53, 0.60, s, glass, dark);
      for (i = 0; i < WIN.length; i++) K.windowAt(fus, WIN[i], WIN_H, 0.46, 0.36, s, glass, dark);
    });

    /* ------------------------------------------------- the cowl ----
       D2: front face at x 3.28 over the cockpit roof, top 3.37 to x 1.1,
       the mast fairing 3.67 from 0.78 to -1.71, down to the boom by -2.78.
       Over the front the two grilled intakes (D2's hatched panels, plan
       0.05-0.46 m each side) and the two round intake fairings (C2). */
    var cowl = [
      S( 3.28, 2.70, 3.18, 3.00, 0.60, 0.62, 0.42, 0.70),
      S( 2.95, 2.70, 3.33, 3.02, 0.70, 0.72, 0.50, 0.62),
      S( 1.10, 2.70, 3.37, 3.02, 0.74, 0.75, 0.52, 0.60),
      S( 0.90, 2.70, 3.62, 3.10, 0.74, 0.75, 0.46, 0.60),
      S(-1.71, 2.70, 3.55, 3.08, 0.72, 0.72, 0.44, 0.60),
      S(-2.07, 2.70, 3.42, 3.02, 0.64, 0.66, 0.40, 0.62),
      S(-2.42, 2.70, 3.14, 2.95, 0.48, 0.50, 0.34, 0.68),
      S(-2.85, 2.76, 2.96, 2.88, 0.20, 0.22, 0.16, 0.80)
    ];
    K.loft(cowl, 14, 0.03, 0.05).forEach(function (q) { skinL.push(q); });
    [1, -1].forEach(function (s) {
      var iy = s * 0.31, iz = Z(3.10);
      skinL.push(K.cyl(0.25, 0.27, 0.42, 20, "x", 3.40, iy, iz));
      skinL.push(K.sph(0.25, 18, 8, 3.61, iy, iz, 0.35, 1, 1));
      dark.push(K.place(new V.CircleGeometry(0.20, 18), 3.71, iy, iz, 0, PI / 2, 0));
      metal.push(K.cyl(0.21, 0.21, 0.04, 18, "x", 3.69, iy, iz, true));
      metal.push(K.sph(0.08, 10, 6, 3.73, iy, iz, 1.4, 1, 1));
      /* grilles on the cowl's front top (D2 plan) */
      dark.push(K.box(0.60, 0.36, 0.02, 2.70, s * 0.26, Z(3.345)));
      var oy = K.sideY(cowl, EX_X, Z(EX_H));
      metal.push(K.place(new V.TorusGeometry(EX_R, 0.04, 6, 20), EX_X, s * (oy + 0.01), Z(EX_H), PI / 2, 0, 0));
      dark.push(K.cyl(EX_R - 0.02, EX_R - 0.02, 0.10, 18, "y", EX_X, s * (oy - 0.03), Z(EX_H)));
    });

    /* ---------------------------------------------------- sponsons ----
       D2: the body from x -0.87 to an aft point at -4.03, h 0.53-1.16;
       plan out to 1.80 m; its upper fairing from x -1.7 to -2.8 rising to
       1.93 m against the cabin side (D2, C1). */
    [1, -1].forEach(function (s) {
      var sp = [
        S(-0.80, 0.68, 1.00, 0.84, 0.18, 0.24, 0.18, 0.90),
        S(-1.00, 0.55, 1.12, 0.84, 0.40, 0.48, 0.40, 0.70),
        S(-1.40, 0.53, 1.16, 0.84, 0.44, 0.52, 0.44, 0.65),
        S(-2.90, 0.55, 1.16, 0.86, 0.42, 0.50, 0.42, 0.65),
        S(-3.60, 0.75, 1.10, 0.92, 0.22, 0.28, 0.20, 0.75),
        S(-4.03, 0.95, 1.05, 1.00, 0.03, 0.04, 0.03, 1.00)
      ];
      K.loft(sp, 12, 0.03, null, s * 1.30).forEach(function (q) { skinL.push(q); });
      var fy = K.sideY(fus, -2.2, Z(1.9)) - 0.05;
      var fA = [[-1.55, fy, Z(1.12)], [-1.85, fy, Z(1.94)], [-2.55, fy, Z(1.94)], [-3.05, fy, Z(1.12)]];
      var fB = [[-1.65, 1.60, Z(1.12)], [-1.95, fy + 0.18, Z(1.80)], [-2.50, fy + 0.18, Z(1.80)], [-2.90, 1.60, Z(1.12)]];
      var fl = K.solid(fA, fB);
      skinL.push(s > 0 ? fl : K.mirrorY(fl));
      team.push(K.box(1.10, 0.28, 0.02, -3.10, s * 1.36, Z(1.16)));
    });

    /* ------------------------- pylon, ventral fin, stabiliser, tail rotor --
       D2: leading edge from the boom top at -7.83 up past a kink at -8.31
       to the gearbox fairing at -9.55, 3.74; trailing edge -9.96, 3.12 to
       -8.81, 1.78. The ventral fin and the tail skid under it (D2, C1). The
       stabiliser to PORT at 3.2 m, 0.9 m chord, 2.58 m out (D2 plan). */
    skinL.push(K.slab([[-7.83, 2.66], [-8.31, 2.82], [-9.07, 3.42], [-9.55, 3.74], [-10.18, 3.44],
                       [-9.96, 3.12], [-8.81, 1.78], [-8.16, 1.78]], 0.15, 0));
    skinL.push(K.slab([[-7.24, 1.70], [-8.07, 1.19], [-9.07, 1.37], [-8.72, 1.80]], 0.06, 0));
    metal.push(K.bar([-8.72, 0, Z(1.62)], [-9.45, 0, Z(1.27)], 0.035, 6, true));
    metal.push(K.box(0.30, 0.10, 0.04, -9.55, 0, Z(1.25)));
    metal.push(K.sph(0.24, 14, 8, TR_X, 0, Z(TR_H), 1.5, 1.0, 1.0));
    metal.push(K.bar([TR_X, -0.10, Z(TR_H)], [TR_X, TR_Y + 0.10, Z(TR_H)], 0.08, 10, true));
    var stz = Z(3.20);
    skinL.push(K.solid([[-8.85, 0.12, stz + 0.05], [-8.95, 2.58, stz + 0.05], [-9.72, 2.58, stz + 0.05], [-9.72, 0.12, stz + 0.05]],
                       [[-8.85, 0.12, stz - 0.05], [-8.95, 2.58, stz - 0.05], [-9.72, 2.58, stz - 0.05], [-9.72, 0.12, stz - 0.05]]));
    team.push(K.box(0.55, 0.80, 0.012, -9.33, 2.00, stz + 0.056));
    metal.push(K.box(0.28, 0.03, 0.28, -5.8, 0, Z(2.86)));

    /* -------------------------------------------------------- gear ----
       Retractable: twin nose wheels at x 3.55; a single main wheel each side
       (D2 front view, C1) at x -1.64, track 3.15 m, its leg out of the
       sponson. */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var gM = [], gR = [];
    [NW_Y, -NW_Y].forEach(function (y) { K.wheel(gR, gM, NW_X, y, Z(NW_R), NW_R, 0.16); });
    gM.push(K.cyl(0.04, 0.04, 2 * NW_Y + 0.12, 8, "y", NW_X, 0, Z(NW_R)));
    gM.push(K.bar([NW_X + 0.06, 0, Z(0.58)], [NW_X, 0, Z(NW_R)], 0.065, 8, true));
    [1, -1].forEach(function (s) {
      K.wheel(gR, gM, MW_X, s * MW_Y, Z(MW_R), MW_R, 0.24);
      gM.push(K.bar([MW_X, s * (MW_Y - 0.16), Z(MW_R)], [MW_X + 0.05, s * 1.30, Z(0.62)], 0.07, 8, true));
      gM.push(K.cyl(0.05, 0.05, 0.20, 8, "y", MW_X, s * (MW_Y - 0.12), Z(MW_R)));
    });
    K.mesh(gear, gM, T.metal, "gear_struts");
    K.mesh(gear, gR, T.rubber, "tyres");

    /* rotors: four blades, 15.60 m (published); five-blade tail rotor to
       STARBOARD (C2), 3.10 m on D2 */
    K.rotor(g, T, { hubZ: Z(HUB_H), R: ROTOR_R, chord: CHORD, n: 4, tilt: MAST_TILT, root: 1.05,
                    head: "dome", mast: 0.62, rootAng: 45 }).forEach(function (q) { metal.push(q); });
    K.tailRotor(g, T, { x: TR_X, y: TR_Y, z: Z(TR_H), R: TR_R, n: 5, chord: 0.22 });

    K.mesh(g, skinL, T.skin, "airframe", sk.SH.projUV);
    K.mesh(g, glass, T.glass, "glass");
    K.mesh(g, dark, T.dark, "fittings_dark");
    K.mesh(g, metal, T.metal, "fittings");
    K.mesh(g, team, T.team, "team");
    g.traverse(function (o) { if (o.isMesh && o.material !== T.disc) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { e90: function (THREE, M, C) { return build(THREE, M, C); } };
})();


/* ======================================================================
   NHINDUSTRIES NH90 TTH CAIMAN - fra_e00_transport.
   Stations off D3 at 57.5 px/m: x = (1122 - px) / 57.5 from the mast,
   h = (958 - py) / 57.5 above the wheels; plan at 57 px/m, x = 5.46 -
   (py - 140) / 57; Z(h) = h - 2.0.                                        */
/* DETAIL PASS (2026-11), the NH90 only (the Puma, the Cougar and FrHeloKit untouched, so
   eu_naval_air.js's NFH gets the same API): wipers, side pitot probes, cockpit-door hinges, handles
   and steps, the cabin door's rail and handles, the sponson step, sponson position lamps (red /
   green material), intake rails and screens, exhaust rims, cowl latches, boom hinges, gear doors,
   oleo pistons, torque links and hub caps, the starboard rescue hoist, fin and belly beacons, the
   white tail lamp, the nose lamp, roof, boom and belly aerials, the tail-rotor gearbox seam; on the
   head (an extra "hub_links" mesh inside it) blade bolts, pitch horns and links, dampers and tip
   caps. The paint gains fastener rows, cowl and access panels, oil streaks, sill scuffing,
   walkways and the ramp's fasteners. Sizes NOT measured. fra_e00_transport 6062 -> 8458 tris,
   12 -> 15 draw calls; extents and len unchanged. */
var HeroNH90 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180, V = null;
  function Z(h) { return h - 2.0; }
  var HUB_H = 3.76, ROTOR_R = 8.15, CHORD = 0.58;
  var TR_X = -9.95, TR_H = 4.00, TR_R = 1.60, TR_Y = 0.64;
  var NW_X = 4.56, NW_R = 0.22, NW_Y = 0.16;
  var MW_X = -1.67, MW_R = 0.25, MW_Y = 1.54;
  var WIN = [1.30, 0.10, -2.08], WIN_H = 1.65;
  var DOOR = { x0: 0.96, x1: -0.70, h0: 0.63, h1: 2.40 };
  var RAMP = { x0: -2.20, x1: -5.07 };
  var _tex = {};

  function skin(K) {
    var SH = K.sheet(-11.0, 5.7, 2.0, Z(0.2), Z(4.2));
    var tex = K.texture(_tex, "nh", function () {
      return K.paint(SH, "nh", 0, function (g) {
        var b;
        K.frames(g, SH, [5.00, 3.30, 2.40, 0.96, -0.70, -2.20, -3.62, -5.07, -6.60, -8.30]);
        for (b = 1; b <= 2; b++) {
          K.rectSide(g, SH, b, DOOR.x0, DOOR.x1, DOOR.h0, DOOR.h1);
          K.lineSide(g, SH, b, DOOR.x0, 2.47, -3.10, 2.47, 3, 0.5);
          K.rectSide(g, SH, b, 3.05, 2.30, 0.60, 2.40, 2.0, 0.5);
          /* the cabin's upper corner line and the cowl joint (D3 815-821) */
          K.lineSide(g, SH, b, 3.0, 2.45, -3.6, 2.45, 1.4, 0.30);
          /* the rear ramp's side seams (D3's upsweep; N1) */
          K.lineSide(g, SH, b, RAMP.x0, 0.45, RAMP.x1, 1.92, 2.6, 0.6);
          K.lineSide(g, SH, b, RAMP.x0, 0.45, RAMP.x0 + 0.05, 0.75, 2.2, 0.5);
          K.soot(g, SH, b, -2.4, 5.0, 2.70, 3.15, 0.40);
          /* detail pass: fastener rows along the cabin's stringers and the
             boom's, the cowl doors and the access panels down each side
             (D3, N1), oil and hydraulic streaks off the transmission deck,
             scuffing along the sponson tops and the door sill */
          g.fillStyle = "rgba(0,0,0,0.22)";
          [0.62, 1.30, 2.10, 2.70].forEach(function (h) {
            for (var xx = SH.pxX(-2.2); xx < SH.pxX(3.0); xx += 5) g.fillRect(xx, SH.pyH(h, b), 1.2, 1.2);
          });
          [2.20, 2.40, 2.62].forEach(function (h) {
            for (var xx = SH.pxX(-9.3); xx < SH.pxX(-5.1); xx += 5) g.fillRect(xx, SH.pyH(h, b), 1.2, 1.2);
          });
          K.rectSide(g, SH, b, -0.20, -1.60, 2.62, 3.05, 1.4, 0.40);
          K.rectSide(g, SH, b, -1.70, -3.20, 2.62, 3.05, 1.4, 0.40);
          K.rectSide(g, SH, b, 2.20, 1.40, 2.55, 2.95, 1.2, 0.35);
          K.rectSide(g, SH, b, -3.70, -4.40, 2.30, 2.65, 1.2, 0.35);
          K.rectSide(g, SH, b, -5.60, -6.10, 2.25, 2.60, 1.2, 0.35);
          K.rectSide(g, SH, b, 4.40, 3.80, 0.55, 1.10, 1.2, 0.35);
          K.rectSide(g, SH, b, -2.40, -2.90, 0.50, 0.95, 1.2, 0.35);
          var R2 = function (k) { return ((k * 2654435761) >>> 0) / 4294967296; };
          for (var q = 0; q < 14; q++) {
            g.fillStyle = "rgba(22,18,12," + (0.10 + R2(q * 7 + b) * 0.10).toFixed(3) + ")";
            g.fillRect(SH.pxX(-3.2 + R2(q + b * 31) * 3.6), SH.pyH(2.92, b), 1.5 + R2(q * 3) * 1.5, 10 + R2(q * 5 + b) * 34);
          }
          g.fillStyle = "rgba(120,112,92,0.16)";
          g.fillRect(SH.pxX(DOOR.x0), SH.pyH(0.68, b), SH.pxX(DOOR.x1) - SH.pxX(DOOR.x0), 4);
        }
        /* the walkways either side of the mast fairing, the cowl doors'
           hinges, the ramp's fasteners on the belly */
        g.fillStyle = "rgba(0,0,0,0.12)";
        g.fillRect(SH.pxX(-3.2), SH.pyTop(1.05), SH.pxX(1.4) - SH.pxX(-3.2), SH.pyTop(0.75) - SH.pyTop(1.05));
        g.fillRect(SH.pxX(-3.2), SH.pyTop(-0.75), SH.pxX(1.4) - SH.pxX(-3.2), SH.pyTop(-1.05) - SH.pyTop(-0.75));
        g.fillStyle = "rgba(0,0,0,0.24)";
        [0.4, 0.0, -0.4].forEach(function (y) {
          for (var xx = SH.pxX(-2.1); xx < SH.pxX(4.4); xx += 5) g.fillRect(xx, SH.pyBelly(y), 1.2, 1.2);
        });
        /* the ramp's hinge across the belly */
        g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 2.6;
        g.beginPath(); g.moveTo(SH.pxX(RAMP.x0), SH.pyBelly(1.0)); g.lineTo(SH.pxX(RAMP.x0), SH.pyBelly(-1.0)); g.stroke();
        g.beginPath(); g.moveTo(SH.pxX(RAMP.x0), SH.pyBelly(1.0)); g.lineTo(SH.pxX(RAMP.x1), SH.pyBelly(0.8)); g.stroke();
        g.beginPath(); g.moveTo(SH.pxX(RAMP.x0), SH.pyBelly(-1.0)); g.lineTo(SH.pxX(RAMP.x1), SH.pyBelly(-0.8)); g.stroke();
      });
    });
    return { SH: SH, tex: tex };
  }

  function build(THREE, M, C) {
    V = THREE;
    var K = FrHeloKit.make(V, Z);
    var S = K.sec;
    var sk = skin(K);
    var T = K.mats(C, sk.tex, FrHeloKit.PAINT.nh.base);
    var g = new V.Group();
    g.name = "nh90_e00";
    var i;
    var skinL = [], dark = [], metal = [], team = [], glass = [];

    /* ------------------------------------------------- the fuselage ----
       STATION TABLE (D3). The NH90 is angular: flat near-vertical sides
       (superellipse exponent 0.30), a flat floor, chamfered upper corners
       (D3's front view). Nose tip x 5.46, h 0.83, its broad U plan (1.38 m
       across 0.44 m behind the tip); the roofline climbs from the
       windscreen into the cowl top, 3.10 at x 1.6, which is as wide as the
       cabin (front view: 2.40 m over the cowl, 2.48 over the cabin); the
       belly 0.33 to x -2.2, then the ramp's upsweep to the boom bottom at
       1.90 by x -5.07; boom top 2.78. The radome ahead of x 5.00 is black. */
    var nose = [
      S( 5.46, 0.80, 0.86, 0.83, 0.02, 0.03, 0.02, 1.00),
      S( 5.30, 0.58, 1.10, 0.84, 0.30, 0.45, 0.28, 0.80),
      S( 5.00, 0.48, 1.33, 0.86, 0.52, 0.72, 0.42, 0.58)
    ];
    var fus = [
      S( 5.00, 0.48, 1.33, 0.86, 0.52, 0.72, 0.42, 0.58),
      S( 4.73, 0.40, 1.50, 0.90, 0.70, 0.88, 0.55, 0.50),
      S( 4.38, 0.35, 1.74, 0.95, 0.85, 1.02, 0.65, 0.42),
      S( 4.03, 0.33, 2.02, 1.05, 0.95, 1.10, 0.72, 0.38),
      S( 3.69, 0.33, 2.33, 1.15, 1.02, 1.17, 0.78, 0.35),
      S( 3.34, 0.33, 2.49, 1.25, 1.05, 1.21, 0.84, 0.33),
      S( 2.99, 0.33, 2.63, 1.30, 1.08, 1.24, 0.90, 0.32),
      S( 2.64, 0.33, 2.82, 1.35, 1.10, 1.25, 0.95, 0.30),
      S( 2.30, 0.33, 2.92, 1.40, 1.12, 1.25, 1.10, 0.26),
      S( 1.95, 0.33, 3.01, 1.40, 1.12, 1.25, 1.14, 0.24),
      S( 1.60, 0.33, 3.10, 1.40, 1.12, 1.26, 1.16, 0.24),
      S(-0.14, 0.33, 3.10, 1.40, 1.12, 1.27, 1.16, 0.24),
      S(-1.40, 0.33, 3.14, 1.40, 1.12, 1.27, 1.16, 0.24),
      S(-2.20, 0.36, 3.18, 1.45, 1.08, 1.26, 1.14, 0.24),
      S(-2.60, 0.45, 3.18, 1.50, 1.04, 1.24, 1.12, 0.25),
      S(-2.95, 0.54, 3.15, 1.60, 1.00, 1.22, 1.08, 0.26),
      S(-3.30, 0.68, 3.10, 1.75, 0.94, 1.18, 0.95, 0.31),
      S(-3.62, 0.82, 2.83, 1.85, 0.90, 1.13, 0.90, 0.32),
      S(-4.00, 1.04, 2.78, 1.95, 0.86, 1.08, 0.86, 0.33),
      S(-4.35, 1.32, 2.78, 2.05, 0.82, 1.05, 0.82, 0.34),
      S(-4.70, 1.63, 2.78, 2.20, 0.78, 1.03, 0.80, 0.35),
      S(-5.07, 1.90, 2.78, 2.34, 0.76, 1.02, 0.78, 0.36),
      S(-5.94, 1.92, 2.78, 2.35, 0.62, 0.83, 0.65, 0.38),
      S(-7.26, 1.96, 2.78, 2.37, 0.40, 0.54, 0.44, 0.40),
      S(-8.57, 2.00, 2.78, 2.39, 0.21, 0.28, 0.24, 0.45),
      S(-9.40, 2.03, 2.78, 2.40, 0.15, 0.20, 0.17, 0.50)
    ];
    K.loft(fus, 18, null, 0.02).forEach(function (q) { skinL.push(q); });
    K.loft(nose, 16, 0.03, null).forEach(function (q) { dark.push(q); });

    /* glazing: N2's big flat windscreen and the cockpit door windows, D3's
       chin window low on each side of the nose */
    [1, -1].forEach(function (s) {
      glass.push(K.patch(fus, s, 3.72, 4.62, 1.38, 2.25, 10, 10, 0.06));
      glass.push(K.patch(fus, s, 3.12, 3.66, 1.35, 2.40, 8, 10, 0.06));
      glass.push(K.patch(fus, s, 4.20, 4.62, 0.62, 1.12, 3, 3, 0.06));
      dark.push(K.patch(fus, s, 3.66, 3.72, 1.30, 2.36, 1, 4, 0.08));
      dark.push(K.patch(fus, s, 3.10, 4.66, 1.30, 1.36, 6, 1, 0.08));
    });
    dark.push(K.box(0.08, 0.08, 0.95, 4.20, 0, Z(1.85), 0, -0.70, 0));
    /* cabin windows (D3 port, N1 starboard): ahead of the door, in it, and
       one behind */
    [1, -1].forEach(function (s) {
      for (i = 0; i < WIN.length; i++) K.windowAt(fus, WIN[i], WIN_H, 0.50, 0.62, s, glass, dark);
    });

    /* ------------------------------------------ cowl top, mast fairing --
       D3: the mast fairing 3.10-3.27 from x -0.14 to -1.6; the exhaust
       fairing on the rear cowl top from -1.74 to -3.27 (D3), its outlets
       dark; the engine intake grille on each cowl side (N1). */
    var mf = [
      S( 0.05, 2.95, 3.12, 3.05, 0.70, 0.72, 0.50, 0.60),
      S(-0.20, 2.95, 3.25, 3.08, 0.66, 0.68, 0.44, 0.60),
      S(-1.40, 2.95, 3.27, 3.08, 0.62, 0.64, 0.42, 0.60),
      S(-1.80, 2.95, 3.12, 3.05, 0.50, 0.52, 0.36, 0.65)
    ];
    K.loft(mf, 12, 0.02, 0.03).forEach(function (q) { skinL.push(q); });
    [1, -1].forEach(function (s) {
      var ex = [
        S(-1.74, 2.95, 3.12, 3.05, 0.14, 0.18, 0.12, 0.70),
        S(-2.10, 2.95, 3.22, 3.08, 0.26, 0.30, 0.22, 0.60),
        S(-3.00, 2.95, 3.20, 3.07, 0.26, 0.30, 0.22, 0.60),
        S(-3.27, 2.95, 3.14, 3.05, 0.22, 0.26, 0.18, 0.65)
      ];
      K.loft(ex, 10, 0.02, null, s * 0.62).forEach(function (q) { skinL.push(q); });
      dark.push(K.place(new V.CircleGeometry(0.17, 14), -3.275, s * 0.62, Z(3.07), 0, -PI / 2, 0));
      var gy = K.sideY(fus, -0.55, Z(2.95));
      dark.push(K.box(0.62, 0.02, 0.30, -0.55, s * (gy + 0.012), Z(2.95)));
    });

    /* ---------------------------------------------------- sponsons ----
       D3: x -0.70 to -3.36, h 0.40-1.20, plan out to 1.79 m (N1: a big
       rounded pod) */
    [1, -1].forEach(function (s) {
      var sp = [
        S(-0.62, 0.62, 1.00, 0.80, 0.14, 0.20, 0.14, 0.90),
        S(-0.85, 0.44, 1.15, 0.80, 0.36, 0.44, 0.36, 0.70),
        S(-1.30, 0.40, 1.20, 0.80, 0.40, 0.47, 0.40, 0.65),
        S(-2.60, 0.42, 1.18, 0.82, 0.38, 0.45, 0.38, 0.65),
        S(-3.10, 0.60, 1.08, 0.86, 0.22, 0.28, 0.20, 0.75),
        S(-3.36, 0.82, 0.94, 0.88, 0.03, 0.04, 0.03, 1.00)
      ];
      K.loft(sp, 12, 0.03, null, s * 1.32).forEach(function (q) { skinL.push(q); });
      team.push(K.box(1.10, 0.28, 0.02, -2.05, s * 1.40, Z(1.205)));
    });

    /* --------------------------------- fin, stabiliser, tail rotor --
       D3: the tall swept fin from the boom top at -8.54 through -9.18, 3.39
       to its top 4.02-4.10 at -10.1..-10.66, trailing edge down to -9.97,
       2.52 and -10.14, 2.05. Tail rotor to PORT, four blades, 3.2 m (D3,
       N1). The long stabiliser to STARBOARD at the boom's height, 0.8 m
       chord, 3.48 m out (D3 plan and front view). */
    skinL.push(K.slab([[-8.54, 2.78], [-9.18, 3.39], [-9.70, 3.92], [-10.10, 4.10], [-10.66, 4.02],
                       [-9.97, 2.52], [-10.14, 2.05], [-9.30, 2.03]], 0.15, 0));
    metal.push(K.sph(0.24, 14, 8, TR_X, 0, Z(TR_H), 1.4, 1.0, 1.0));
    metal.push(K.bar([TR_X, 0.10, Z(TR_H)], [TR_X, TR_Y - 0.10, Z(TR_H)], 0.08, 10, true));
    var stz = Z(2.25);
    skinL.push(K.solid([[-9.50, -0.14, stz + 0.05], [-9.62, -3.48, stz + 0.05], [-10.36, -3.48, stz + 0.05], [-10.30, -0.14, stz + 0.05]],
                       [[-9.50, -0.14, stz - 0.05], [-9.62, -3.48, stz - 0.05], [-10.36, -3.48, stz - 0.05], [-10.30, -0.14, stz - 0.05]]));
    skinL.push(K.box(0.34, 0.06, 0.55, -10.20, -3.48, stz + 0.05));
    team.push(K.box(0.50, 0.90, 0.012, -9.95, -2.60, stz + 0.056));
    metal.push(K.box(0.28, 0.03, 0.26, -6.2, 0, Z(2.91)));
    /* the ramp's hinge fairing across the belly */
    dark.push(K.box(0.06, 1.70, 0.04, RAMP.x0, 0, Z(0.37)));

    /* -------------------------------------------------------- gear ----
       Retractable (published): twin nose wheels at x 4.56; a single main
       wheel each side out of the sponson at x -1.67 (D3, N1), track 3.08 m */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var gM = [], gR = [];
    [NW_Y, -NW_Y].forEach(function (y) { K.wheel(gR, gM, NW_X, y, Z(NW_R), NW_R, 0.15); });
    gM.push(K.cyl(0.04, 0.04, 2 * NW_Y + 0.12, 8, "y", NW_X, 0, Z(NW_R)));
    gM.push(K.bar([NW_X + 0.04, 0, Z(0.40)], [NW_X, 0, Z(NW_R)], 0.06, 8, true));
    [1, -1].forEach(function (s) {
      K.wheel(gR, gM, MW_X, s * MW_Y, Z(MW_R), MW_R, 0.22);
      gM.push(K.bar([MW_X, s * (MW_Y - 0.15), Z(MW_R)], [MW_X + 0.04, s * 1.36, Z(0.46)], 0.07, 8, true));
      gM.push(K.cyl(0.05, 0.05, 0.20, 8, "y", MW_X, s * (MW_Y - 0.12), Z(MW_R)));
    });
    K.mesh(gear, gM, T.metal, "gear_struts");
    K.mesh(gear, gR, T.rubber, "tyres");

    /* ================================================= DETAIL PASS ======
       The fittings the first pass left out, placed off D3, N1 and N2: their
       sizes are read through those references' scale and perspective, NOT
       measured. */
    var lampR = [], lampG = [], hubX = [];
    function sy(x, h) { return K.sideY(fus, x, Z(h)); }
    /* the windscreen wipers, parked upright on the screen (N2) */
    [1, -1].forEach(function (s) {
      dark.push(K.bar([4.58, s * 0.55, Z(1.45)], [4.20, s * 0.45, Z(2.05)], 0.012, 4, true));
      /* the pitot probes on the nose's upper sides, ahead of the screen
         (D3 draws a probe each side) */
      var py = sy(4.90, 1.20);
      metal.push(K.bar([4.90, s * (py - 0.02), Z(1.20)], [4.90, s * (py + 0.12), Z(1.24)], 0.014, 5, true));
      metal.push(K.bar([4.90, s * (py + 0.12), Z(1.24)], [5.22, s * (py + 0.12), Z(1.24)], 0.011, 5, true));
      /* the cockpit door's hinges, handle and the step under it */
      [1.55, 2.20].forEach(function (h) { dark.push(K.box(0.05, 0.03, 0.07, 3.68, s * (sy(3.68, h) + 0.02), Z(h))); });
      metal.push(K.box(0.14, 0.03, 0.03, 3.25, s * (sy(3.25, 1.30) + 0.03), Z(1.30)));
      metal.push(K.box(0.30, 0.18, 0.025, 3.40, s * (sy(3.40, 0.60) + 0.09), Z(0.55)));
      /* the sliding cabin door's top rail and its handles (D3's line at
         2.47 m, N1) and the step on the sponson's nose */
      metal.push(K.bar([DOOR.x0 + 0.05, s * (sy(0.0, 2.47) + 0.03), Z(2.47)], [-3.0, s * (sy(-3.0, 2.47) + 0.03), Z(2.47)], 0.018, 5, true));
      metal.push(K.box(0.04, 0.03, 0.18, DOOR.x0 - 0.15, s * (sy(0.8, 1.40) + 0.03), Z(1.40)));
      metal.push(K.box(0.04, 0.03, 0.18, DOOR.x1 + 0.15, s * (sy(-0.5, 1.40) + 0.03), Z(1.40)));
      metal.push(K.box(0.40, 0.22, 0.03, 0.20, s * (sy(0.20, 0.45) + 0.10), Z(0.42)));
      /* position lamps on the sponsons' tops, port red and starboard green;
         the formation strip along the sponson (N1) */
      (s > 0 ? lampR : lampG).push(K.sph(0.04, 8, 6, -1.10, s * 1.70, Z(1.16), 1.5, 0.8, 0.8));
      /* the engine intakes' screens and lips, the exhaust outlets' bright
         rims (N1) */
      var gy = K.sideY(fus, -0.55, Z(2.95));
      metal.push(K.box(0.66, 0.012, 0.03, -0.55, s * (gy + 0.022), Z(3.11)));
      metal.push(K.box(0.66, 0.012, 0.03, -0.55, s * (gy + 0.022), Z(2.79)));
      for (i = 0; i < 6; i++) dark.push(K.box(0.012, 0.03, 0.30, -0.80 + i * 0.10, s * (gy + 0.02), Z(2.95)));
      metal.push(K.place(new V.TorusGeometry(0.175, 0.018, 6, 14), -3.27, s * 0.62, Z(3.07), 0, PI / 2, 0));
      /* cowl latches down each side of the engine bay */
      [-0.10, -0.70, -1.30, -1.90, -2.50].forEach(function (xl) {
        dark.push(K.box(0.07, 0.02, 0.03, xl, s * (sy(xl, 2.75) + 0.012), Z(2.75)));
      });
      /* the boom's drive-shaft cover hinges and the stabiliser-root fairing */
      [-5.5, -6.5, -7.5].forEach(function (xh) { dark.push(K.box(0.10, 0.02, 0.05, xh, s * (sy(xh, 2.62) + 0.01), Z(2.62))); });
      /* the main gear doors folded against the sponson's underside, the
         oleo's bright piston, the torque link and the hub caps */
      gM.push(K.box(0.62, 0.02, 0.36, MW_X + 0.02, s * (MW_Y - 0.36), Z(0.36)));
      gM.push(K.bar([MW_X + 0.04, s * 1.42, Z(0.40)], [MW_X + 0.02, s * 1.42, Z(0.30)], 0.05, 8, true));
      gM.push(K.bar([MW_X + 0.14, s * 1.42, Z(0.44)], [MW_X + 0.18, s * 1.42, Z(0.32)], 0.014, 4, true));
      gM.push(K.cyl(0.08, 0.08, 0.02, 10, "y", MW_X, s * (MW_Y + 0.12), Z(MW_R)));
      gM.push(K.cyl(0.025, 0.025, 0.03, 6, "y", MW_X, s * (MW_Y + 0.135), Z(MW_R)));
    });
    /* the nose gear's doors and the torque link, the hub caps */
    [1, -1].forEach(function (s) {
      gM.push(K.box(0.70, 0.02, 0.18, NW_X - 0.15, s * 0.27, Z(0.30)));
      gM.push(K.cyl(0.06, 0.06, 0.02, 10, "y", NW_X, s * (NW_Y + 0.085), Z(NW_R)));
    });
    gM.push(K.bar([NW_X + 0.12, 0, Z(0.36)], [NW_X + 0.14, 0, Z(0.26)], 0.012, 4, true));
    /* the rescue hoist over the starboard cabin door (French Caiman TTH,
       N1's side), its arm and the hook block */
    var hy = -(sy(0.6, 3.0) + 0.05);
    metal.push(K.box(0.70, 0.22, 0.22, 0.50, hy - 0.08, Z(3.02)));
    metal.push(K.bar([0.85, hy - 0.08, Z(3.02)], [1.00, hy - 0.55, Z(3.00)], 0.04, 6, true));
    dark.push(K.cyl(0.05, 0.05, 0.10, 8, "z", 1.00, hy - 0.55, Z(2.90)));
    /* anti-collision beacons on the fin's top and under the belly; the
       white tail lamp on the fin's trailing edge; a landing / search lamp
       under the nose */
    dark.push(K.cyl(0.06, 0.065, 0.04, 10, "z", -10.30, 0, Z(4.08)));
    lampR.push(K.sph(0.05, 10, 6, -10.30, 0, Z(4.10), 1, 1, 0.5));
    dark.push(K.cyl(0.06, 0.065, 0.04, 10, "z", -0.60, 0, Z(0.31)));
    lampR.push(K.sph(0.05, 10, 6, -0.60, 0, Z(0.29), 1, 1, 0.8));
    metal.push(K.sph(0.03, 8, 5, -10.12, 0, Z(2.20), 1.3, 0.8, 1.0));
    metal.push(K.cyl(0.10, 0.10, 0.06, 12, "z", 4.30, 0.30, Z(0.36)));
    glass.push(K.cyl(0.085, 0.085, 0.012, 12, "z", 4.30, 0.30, Z(0.328)));
    /* aerials: a blade on the roof ahead of the mast and one on the boom,
       two blades and a whip under the cabin and the ramp (D3, N1) */
    dark.push(K.box(0.36, 0.02, 0.26, 2.20, 0, Z(3.13), 0, -0.25, 0));
    dark.push(K.box(0.30, 0.02, 0.22, -6.80, 0, Z(2.89), 0, -0.25, 0));
    dark.push(K.box(0.32, 0.02, 0.22, 2.80, 0.30, Z(0.22), 0, 0.25, 0));
    dark.push(K.box(0.28, 0.02, 0.20, -1.40, -0.30, Z(0.22), 0, 0.25, 0));
    dark.push(K.bar([-4.40, 0, Z(1.25)], [-4.90, 0, Z(0.75)], 0.008, 4, true));
    /* the tail-rotor gearbox's fairing seam and the stabiliser's tip
       fairing lamp mount */
    metal.push(K.cyl(0.26, 0.26, 0.02, 14, "y", TR_X, 0.34, Z(TR_H)));

    /* rotors: four composite blades with swept tips (D3's plan), 16.30 m,
       an upright mast (D3) under a low dome on a flat star */
    K.rotor(g, T, { hubZ: Z(HUB_H), R: ROTOR_R, chord: CHORD, n: 4, tilt: 0, root: 0.95,
                    tipSweep: 0.55, head: "star", mast: 0.55, rootAng: 30 }).forEach(function (q) { metal.push(q); });
    K.tailRotor(g, T, { x: TR_X, y: TR_Y, z: Z(TR_H), R: TR_R, n: 4, chord: 0.24, phase: 59 });

    K.mesh(g, skinL, T.skin, "airframe", sk.SH.projUV);
    K.mesh(g, glass, T.glass, "glass");
    K.mesh(g, dark, T.dark, "fittings_dark");
    K.mesh(g, metal, T.metal, "fittings");
    K.mesh(g, team, T.team, "team");
    var LR = new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 });
    var LG = new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 });
    K.mesh(g, lampR, LR, "lamp_red");
    K.mesh(g, lampG, LG, "lamp_green");
    /* the rotor head's detail, in the head's own frame (blades from 30
       degrees, four of them): the blade cuffs' bolts, the pitch horns and
       links down to the swashplate, the lead-lag dampers (N2) */
    var rh = g.getObjectByName("rotor"), hd = rh && rh.children[0];
    if (hd) {
      for (i = 0; i < 4; i++) {
        var ang = (30 + 90 * i) * D2R, pr = [];
        pr.push(K.cyl(0.03, 0.03, 0.22, 8, "z", 0.80, 0.06, -0.02), K.cyl(0.03, 0.03, 0.22, 8, "z", 0.80, -0.06, -0.02));
        pr.push(K.box(0.12, 0.10, 0.05, 0.55, -0.16, -0.10));
        pr.push(K.bar([0.55, -0.19, -0.12], [0.55, -0.22, -0.44], 0.018, 5, true));
        pr.push(K.bar([0.30, 0.16, 0.02], [0.78, 0.13, 0.00], 0.035, 6, true));
        pr.push(K.box(0.20, CHORD, 0.05, ROTOR_R - 0.20, -CHORD / 4 + CHORD / 2, -0.022));
        pr.forEach(function (q) { q.rotateZ(ang); hubX.push(q); });
      }
      hubX.push(K.cyl(0.10, 0.12, 0.08, 10, "z", 0, 0, 0.22));
      K.mesh(hd, hubX, T.metal, "hub_links");
    }
    g.traverse(function (o) { if (o.isMesh && o.material !== T.disc) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { e00: function (THREE, M, C) { return build(THREE, M, C); } };
})();

UNIT_MODELS["fra_e60_transport"] = { len: 18.38, build: HeroPuma.e60 };
UNIT_MODELS["fra_e80_transport"] = { len: 18.38, build: HeroPuma.e80 };
UNIT_MODELS["fra_e90_transport"] = { len: 18.82, build: HeroCougar.e90 };
UNIT_MODELS["fra_e00_transport"] = { len: 19.53, build: HeroNH90.e00 };
